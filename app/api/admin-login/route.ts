import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, getAdminConfigAsync, getAdminSessionToken } from "@/src/data/admin-auth";

export async function POST(request: Request) {
  const config = await getAdminConfigAsync();
  if (!config.password) {
    return NextResponse.json({ ok: false, error: "ADMIN_PASSWORD is not configured." }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as { user?: string; password?: string } | null;
  if (!body || body.user !== config.user || body.password !== config.password) {
    return NextResponse.json({ ok: false, error: "Invalid credentials." }, { status: 401 });
  }

  const token = await getAdminSessionToken(config);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
