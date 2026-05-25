import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

import { getLaunchToolsFromRows } from "@/src/data/launch-tools";

async function getDb() {
  const { env } = await getCloudflareContext({ async: true });
  return env.AIDAILYPICK_DB;
}

function isMissingTableError(error: unknown) {
  return error instanceof Error && error.message.includes("no such table: submissions");
}

export async function GET() {
  const db = await getDb();
  if (!db) {
    return NextResponse.json({ ok: true, tools: [] });
  }

  let result;
  try {
    result = await db
      .prepare(
        `SELECT id, created_at, title, url, category, audience, summary, details, payload_json
         FROM submissions
         WHERE type = 'tool' AND status = 'featured'
         ORDER BY created_at DESC
         LIMIT 24`
      )
      .all<Record<string, unknown>>();
  } catch (error) {
    if (isMissingTableError(error)) {
      return NextResponse.json({ ok: true, tools: [] });
    }
    throw error;
  }

  const rows = (result.results ?? []) as Array<Record<string, unknown>>;
  const tools = getLaunchToolsFromRows(rows);

  return NextResponse.json({ ok: true, tools });
}
