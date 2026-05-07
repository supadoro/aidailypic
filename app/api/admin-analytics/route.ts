import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/src/data/admin-auth";

export const dynamic = "force-dynamic";

function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

async function getDb() {
  const { env } = await getCloudflareContext({ async: true });
  return env.AIDAILYPICK_DB;
}

async function requireAdmin() {
  const cookieStore = await cookies();
  return isValidAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function GET() {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);

  const db = await getDb();
  if (!db) return jsonError("AIDAILYPICK_DB 바인딩이 없습니다.", 503);

  const total = await db.prepare("SELECT COUNT(*) AS count FROM outbound_clicks").first<{ count: number }>();
  const clicks24h = await db
    .prepare("SELECT COUNT(*) AS count FROM outbound_clicks WHERE clicked_at >= datetime('now', '-1 day')")
    .first<{ count: number }>();
  const clicks7d = await db
    .prepare("SELECT COUNT(*) AS count FROM outbound_clicks WHERE clicked_at >= datetime('now', '-7 days')")
    .first<{ count: number }>();
  const topTools = await db
    .prepare(
      `SELECT tool_slug AS toolSlug, tool_name AS toolName, COUNT(*) AS count, MAX(clicked_at) AS lastClickedAt
       FROM outbound_clicks
       GROUP BY tool_slug, tool_name
       ORDER BY count DESC, lastClickedAt DESC
       LIMIT 8`
    )
    .all<Record<string, unknown>>();
  const topSources = await db
    .prepare(
      `SELECT COALESCE(source, 'unknown') AS source, COUNT(*) AS count
       FROM outbound_clicks
       GROUP BY COALESCE(source, 'unknown')
       ORDER BY count DESC
       LIMIT 6`
    )
    .all<Record<string, unknown>>();
  const recentClicks = await db
    .prepare(
      `SELECT tool_slug AS toolSlug, tool_name AS toolName, source, clicked_at AS clickedAt
       FROM outbound_clicks
       ORDER BY clicked_at DESC
       LIMIT 10`
    )
    .all<Record<string, unknown>>();
  const exportRows = await db
    .prepare(
      `SELECT tool_slug AS toolSlug, tool_name AS toolName, source, clicked_at AS clickedAt, referrer
       FROM outbound_clicks
       ORDER BY clicked_at DESC
       LIMIT 500`
    )
    .all<Record<string, unknown>>();

  return NextResponse.json({
    ok: true,
    totalClicks: total?.count ?? 0,
    clicks24h: clicks24h?.count ?? 0,
    clicks7d: clicks7d?.count ?? 0,
    topTools: topTools.results ?? [],
    topSources: topSources.results ?? [],
    recentClicks: recentClicks.results ?? [],
    exportRows: exportRows.results ?? [],
  });
}
