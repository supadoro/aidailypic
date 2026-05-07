import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

type LaunchToolPayload = {
  toolName?: string;
  websiteUrl?: string;
  category?: string;
  audience?: string;
  summary?: string;
  details?: string;
  mediaUrl?: string;
  publicConsent?: boolean;
};

function safePayload(value: unknown): LaunchToolPayload {
  try {
    const parsed = JSON.parse(String(value || "{}")) as LaunchToolPayload;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

async function getDb() {
  const { env } = await getCloudflareContext({ async: true });
  return env.AIDAILYPICK_DB;
}

export async function GET() {
  const db = await getDb();
  if (!db) {
    return NextResponse.json({ ok: true, tools: [] });
  }

  const result = await db
    .prepare(
      `SELECT id, created_at, title, url, category, audience, summary, details, payload_json
       FROM submissions
       WHERE type = 'tool' AND status = 'featured'
       ORDER BY created_at DESC
       LIMIT 24`
    )
    .all<Record<string, unknown>>();

  const rows = (result.results ?? []) as Array<Record<string, unknown>>;
  const tools = rows.map((row) => {
    const payload = safePayload(row.payload_json);
    return {
      id: String(row.id),
      createdAt: String(row.created_at),
      toolName: String(row.title || payload.toolName || "이름 미정"),
      websiteUrl: String(row.url || payload.websiteUrl || ""),
      category: String(row.category || payload.category || "미분류"),
      audience: String(row.audience || payload.audience || "미정"),
      summary: String(row.summary || payload.summary || ""),
      details: String(row.details || payload.details || ""),
      mediaUrl: String(payload.mediaUrl || ""),
      publicConsent: Boolean(payload.publicConsent),
    };
  }).filter((tool) => tool.publicConsent);

  return NextResponse.json({ ok: true, tools });
}
