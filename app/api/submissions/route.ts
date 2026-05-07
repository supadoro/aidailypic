import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, getAdminConfigAsync, isValidAdminSession } from "@/src/data/admin-auth";

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

export async function GET() {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);

  const db = await getDb();
  if (!db) return jsonError("AIDAILYPICK_DB 바인딩이 없습니다.", 503);

  const result = await db
    .prepare("SELECT * FROM submissions ORDER BY created_at DESC LIMIT 300")
    .all<Record<string, unknown>>();
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

  return NextResponse.json({ ok: true, id, createdAt });
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);

  const db = await getDb();
  if (!db) return jsonError("AIDAILYPICK_DB 바인딩이 없습니다.", 503);

  const body = (await request.json().catch(() => null)) as { id?: string; status?: SubmissionStatus } | null;
  if (!body?.id || !body.status || !allowedStatuses.includes(body.status)) {
    return jsonError("id와 올바른 status가 필요합니다.");
  }

  await db.prepare("UPDATE submissions SET status = ? WHERE id = ?").bind(body.status, body.id).run();
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!(await requireAdmin())) return jsonError("Unauthorized", 401);

  const db = await getDb();
  if (!db) return jsonError("AIDAILYPICK_DB 바인딩이 없습니다.", 503);

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return jsonError("id가 필요합니다.");

  await db.prepare("DELETE FROM submissions WHERE id = ?").bind(id).run();
  return NextResponse.json({ ok: true });
}
