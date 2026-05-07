import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

import { getToolBySlug } from "@/src/data/saas-directory";

export const dynamic = "force-dynamic";

async function getDb() {
  const { env } = await getCloudflareContext({ async: true });
  return env.AIDAILYPICK_DB;
}

function truncate(value: string | null, maxLength: number) {
  if (!value) return null;
  return value.slice(0, maxLength);
}

async function recordClick(request: Request, toolSlug: string, toolName: string, source: string | null) {
  try {
    const db = await getDb();
    if (!db) return;

    const headers = request.headers;
    await db
      .prepare(
        `INSERT INTO outbound_clicks (
          id, tool_slug, tool_name, source, clicked_at, referrer, user_agent
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        `click-${crypto.randomUUID()}`,
        toolSlug,
        toolName,
        truncate(source, 80),
        new Date().toISOString(),
        truncate(headers.get("referer"), 500),
        truncate(headers.get("user-agent"), 500)
      )
      .run();
  } catch {
    // Click tracking must never block outbound navigation.
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool || !tool.affiliateUrl.startsWith("http")) {
    return NextResponse.redirect(new URL("/tools", request.url), 302);
  }

  const { searchParams } = new URL(request.url);
  await recordClick(request, tool.slug, tool.name, searchParams.get("source"));

  return NextResponse.redirect(tool.affiliateUrl, 302);
}
