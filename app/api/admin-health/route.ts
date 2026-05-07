import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, getAdminConfigAsync, isValidAdminSession } from "@/src/data/admin-auth";

export const dynamic = "force-dynamic";

async function hasD1Binding(): Promise<boolean> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return Boolean(env.AIDAILYPICK_DB);
  } catch {
    return false;
  }
}

export async function GET() {
  const cookieStore = await cookies();
  if (!(await isValidAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const config = await getAdminConfigAsync();
  const checks = [
    {
      id: "admin-password",
      label: "관리자 비밀번호",
      ok: Boolean(config.password),
      description: config.password ? "ADMIN_PASSWORD가 설정되어 있습니다." : "운영 배포 전에 ADMIN_PASSWORD를 설정하세요.",
    },
    {
      id: "admin-session-secret",
      label: "세션 시크릿",
      ok: Boolean(config.secret),
      description: config.secret ? "ADMIN_SESSION_SECRET이 설정되어 있습니다." : "운영 배포 전에 ADMIN_SESSION_SECRET을 설정하세요.",
    },
    {
      id: "d1-binding",
      label: "D1 저장소",
      ok: await hasD1Binding(),
      description: "AIDAILYPICK_DB 바인딩이 연결되면 제출/문의/구독 데이터가 서버에 저장됩니다.",
    },
  ];

  return NextResponse.json({
    ok: true,
    checks,
  });
}
