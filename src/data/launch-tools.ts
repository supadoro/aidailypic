import { getToolSubmissionReviewReadiness } from "@/src/data/admin-review-readiness";

export type LaunchToolPayload = {
  toolName?: string;
  websiteUrl?: string;
  category?: string;
  audience?: string;
  summary?: string;
  details?: string;
  mediaUrl?: string;
  publicConsent?: boolean;
};

export type LaunchTool = {
  id: string;
  createdAt: string;
  toolName: string;
  websiteUrl: string;
  category: string;
  audience: string;
  summary: string;
  details: string;
  mediaUrl: string;
  publicConsent: boolean;
};

export function safeLaunchToolPayload(value: unknown): LaunchToolPayload {
  try {
    const parsed = JSON.parse(String(value || "{}")) as LaunchToolPayload;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function text(value: unknown, fallback = ""): string {
  return String(value ?? fallback);
}

function rowToLaunchTool(row: Record<string, unknown>): LaunchTool {
  const payload = safeLaunchToolPayload(row.payload_json);

  return {
    id: text(row.id),
    createdAt: text(row.created_at),
    toolName: text(row.title || payload.toolName, "이름 미정"),
    websiteUrl: text(row.url || payload.websiteUrl),
    category: text(row.category || payload.category, "미분류"),
    audience: text(row.audience || payload.audience, "미정"),
    summary: text(row.summary || payload.summary),
    details: text(row.details || payload.details),
    mediaUrl: text(payload.mediaUrl),
    publicConsent: Boolean(payload.publicConsent),
  };
}

export function getLaunchToolsFromRows(rows: Array<Record<string, unknown>>): LaunchTool[] {
  return rows.map(rowToLaunchTool).filter((tool) => {
    const readiness = getToolSubmissionReviewReadiness({
      id: tool.id,
      type: "tool",
      createdAt: tool.createdAt,
      status: "featured",
      toolName: tool.toolName,
      websiteUrl: tool.websiteUrl,
      category: tool.category,
      audience: tool.audience,
      contactEmail: "",
      summary: tool.summary,
      details: tool.details,
      mediaUrl: tool.mediaUrl,
      publicConsent: tool.publicConsent,
    });

    return readiness.readyToFeature;
  });
}
