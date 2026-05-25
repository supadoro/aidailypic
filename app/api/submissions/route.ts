import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, getAdminConfigAsync, isValidAdminSession } from "@/src/data/admin-auth";
import { applyToolSubmissionEdit, type ToolSubmissionEditInput } from "@/src/data/tool-submission-editor";

type SubmissionType = "tool" | "contact" | "newsletter";
type SubmissionStatus = "new" | "candidate" | "reviewing" | "done" | "featured" | "hold";

const allowedStatuses: SubmissionStatus[] = ["new", "candidate", "reviewing", "done", "featured", "hold"];

type SubmissionPayload = {
  type?: SubmissionType;
  toolName?: string;
  websiteUrl?: string;
  category?: string;
  audience?: string;
  contactEmail?: string;
  summary?: string;
  details?: string;
  mediaUrl?: string;
  publicConsent?: boolean;
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
  source?: string;
  interest?: string;
};

function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

function required(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validate(payload: SubmissionPayload): string | null {
  if (!payload.type) return "제출 유형이 없습니다.";

  if (payload.type === "tool") {
    if (!required(payload.toolName)) return "툴 이름을 입력해주세요.";
    if (!required(payload.websiteUrl)) return "공식 링크를 입력해주세요.";
    if (!required(payload.category)) return "카테고리를 선택해주세요.";
    if (!required(payload.contactEmail)) return "연락 이메일을 입력해주세요.";
    if (!required(payload.summary)) return "한 줄 소개를 입력해주세요.";
  }

  if (payload.type === "contact") {
    if (!required(payload.name)) return "이름을 입력해주세요.";
    if (!required(payload.email)) return "이메일을 입력해주세요.";
    if (!required(payload.message)) return "문의 내용을 입력해주세요.";
  }

  if (payload.type === "newsletter") {
    if (!required(payload.email)) return "이메일을 입력해주세요.";
  }

  return null;
}

function getEmail(payload: SubmissionPayload): string {
  if (payload.type === "tool") return payload.contactEmail?.trim() ?? "";
  return payload.email?.trim() ?? "";
}

function getTitle(payload: SubmissionPayload): string {
  if (payload.type === "tool") return payload.toolName?.trim() ?? "";
  if (payload.type === "contact") return payload.topic?.trim() || "문의";
  return "뉴스레터 구독";
}

async function getDb() {
  const { env } = await getCloudflareContext({ async: true });
  return env.AIDAILYPICK_DB;
}

function isMissingTableError(error: unknown) {
  return error instanceof Error && error.message.includes("no such table: submissions");
}

async function requireAdmin() {
  const config = await getAdminConfigAsync();
  if (process.env.NODE_ENV === "development" && !config.password) return true;

  const cookieStore = await cookies();
  return isValidAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

function rowToSubmission(row: Record<string, unknown>) {
  const payload = JSON.parse(String(row.payload_json || "{}")) as Record<string, unknown>;
  return {
    ...payload,
    id: String(row.id),
    type: row.type,
    status: row.status,
    createdAt: row.created_at,
    email: row.email,
    title: row.title,
  };
}

function rowToToolSubmission(row: Record<string, unknown>) {
  const payload = JSON.parse(String(row.payload_json || "{}")) as Record<string, unknown>;
  return {
    id: String(row.id),
    type: "tool" as const,
    createdAt: String(row.created_at),
    status: row.status as SubmissionStatus,
    toolName: String(row.title || payload.toolName || ""),
    websiteUrl: String(row.url || payload.websiteUrl || ""),
    category: String(row.category || payload.category || ""),
    audience: String(row.audience || payload.audience || ""),
    contactEmail: String(row.email || payload.contactEmail || ""),
    summary: String(row.summary || payload.summary || ""),
    details: String(row.details || payload.details || ""),
    mediaUrl: String(payload.mediaUrl || ""),
    publicConsent: Boolean(payload.publicConsent),
  };
}

export async function GET() {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);

  const db = await getDb();
  if (!db) return jsonError("AIDAILYPICK_DB 바인딩이 없습니다.", 503);

  let result;
  try {
    result = await db.prepare("SELECT * FROM submissions ORDER BY created_at DESC LIMIT 300").all<Record<string, unknown>>();
  } catch (error) {
    if (isMissingTableError(error)) return jsonError("D1 submissions 테이블이 없습니다. docs/d1-schema.sql을 적용해주세요.", 503);
    throw error;
  }
  const submissions = (result.results ?? []).map(rowToSubmission);

  return NextResponse.json({
    ok: true,
    submissions,
  });
}

export async function POST(request: Request) {
  let payload: SubmissionPayload;
  try {
    payload = (await request.json()) as SubmissionPayload;
  } catch {
    return jsonError("JSON 요청만 처리할 수 있습니다.");
  }

  const validationError = validate(payload);
  if (validationError) return jsonError(validationError);

  const db = await getDb();
  if (!db) {
    return jsonError("AIDAILYPICK_DB 바인딩이 없습니다.", 503);
  }

  const id = `${payload.type}-${crypto.randomUUID()}`;
  const createdAt = new Date().toISOString();

  try {
    await db
      .prepare(
        `INSERT INTO submissions (
        id, type, status, created_at, email, name, title, url, category,
        audience, source, interest, summary, details, message, payload_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        id,
        payload.type,
        payload.type === "tool" ? "candidate" : "new",
        createdAt,
        getEmail(payload),
        payload.name?.trim() ?? null,
        getTitle(payload),
        payload.websiteUrl?.trim() ?? null,
        payload.category?.trim() ?? null,
        payload.audience?.trim() ?? null,
        payload.source?.trim() ?? null,
        payload.interest?.trim() ?? null,
        payload.summary?.trim() ?? null,
        payload.details?.trim() ?? null,
        payload.message?.trim() ?? null,
        JSON.stringify(payload)
      )
      .run();
  } catch (error) {
    if (isMissingTableError(error)) return jsonError("D1 submissions 테이블이 없습니다. docs/d1-schema.sql을 적용해주세요.", 503);
    throw error;
  }

  return NextResponse.json({ ok: true, id, createdAt });
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);

  const db = await getDb();
  if (!db) return jsonError("AIDAILYPICK_DB 바인딩이 없습니다.", 503);

  const body = (await request.json().catch(() => null)) as { id?: string; status?: SubmissionStatus; tool?: ToolSubmissionEditInput } | null;
  const hasToolEdit = Boolean(body?.tool && Object.keys(body.tool).length);
  if (!body?.id || (!body.status && !hasToolEdit) || (body.status && !allowedStatuses.includes(body.status))) {
    return jsonError("id와 올바른 status 또는 수정할 tool 정보가 필요합니다.");
  }

  try {
    if (hasToolEdit) {
      const existing = await db.prepare("SELECT * FROM submissions WHERE id = ? AND type = 'tool' LIMIT 1").bind(body.id).first<Record<string, unknown>>();
      if (!existing) return jsonError("수정할 툴 제보를 찾을 수 없습니다.", 404);

      const current = rowToToolSubmission(existing);
      const next = applyToolSubmissionEdit(current, body.tool ?? {});
      const nextStatus = body.status ?? current.status;
      const payload = {
        ...(JSON.parse(String(existing.payload_json || "{}")) as Record<string, unknown>),
        toolName: next.toolName,
        websiteUrl: next.websiteUrl,
        category: next.category,
        audience: next.audience,
        contactEmail: next.contactEmail,
        summary: next.summary,
        details: next.details,
        mediaUrl: next.mediaUrl ?? "",
        publicConsent: Boolean(next.publicConsent),
      };

      await db
        .prepare(
          `UPDATE submissions
           SET status = ?, email = ?, title = ?, url = ?, category = ?, audience = ?, summary = ?, details = ?, payload_json = ?
           WHERE id = ?`
        )
        .bind(nextStatus, next.contactEmail, next.toolName, next.websiteUrl, next.category, next.audience, next.summary, next.details, JSON.stringify(payload), body.id)
        .run();
    } else {
      await db.prepare("UPDATE submissions SET status = ? WHERE id = ?").bind(body.status, body.id).run();
    }
  } catch (error) {
    if (isMissingTableError(error)) return jsonError("D1 submissions 테이블이 없습니다. docs/d1-schema.sql을 적용해주세요.", 503);
    throw error;
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);

  const db = await getDb();
  if (!db) return jsonError("AIDAILYPICK_DB 바인딩이 없습니다.", 503);

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return jsonError("id가 필요합니다.");

  try {
    await db.prepare("DELETE FROM submissions WHERE id = ?").bind(id).run();
  } catch (error) {
    if (isMissingTableError(error)) return jsonError("D1 submissions 테이블이 없습니다. docs/d1-schema.sql을 적용해주세요.", 503);
    throw error;
  }
  return NextResponse.json({ ok: true });
}
