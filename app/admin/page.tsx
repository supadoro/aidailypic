import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";

import { AdminAnalyticsPanel } from "@/src/components/admin-analytics-panel";
import { AdminHealthPanel } from "@/src/components/admin-health-panel";
import { AdminInbox } from "@/src/components/admin-inbox";
import { AdminLoginForm } from "@/src/components/admin-login-form";
import { AdminLogoutButton } from "@/src/components/admin-logout-button";
import { AdminToolManager } from "@/src/components/admin-tool-manager";
import { ADMIN_SESSION_COOKIE, getAdminConfigAsync, isValidAdminSession } from "@/src/data/admin-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "관리자",
  description: "AIDailyPick 툴 디렉토리 MVP 관리자 화면입니다.",
  alternates: {
    canonical: "/admin",
  },
};

export default async function AdminPage() {
  const config = await getAdminConfigAsync();
  const cookieStore = await cookies();
  const isDevelopmentBypass = process.env.NODE_ENV === "development" && !config.password;
  const isAuthorized = isDevelopmentBypass || (await isValidAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value));
  const launchChecklist = [
    ["저장소 연결", "Cloudflare D1 바인딩 AIDAILYPICK_DB를 연결하면 제출/문의/구독 데이터가 서버에 저장됩니다."],
    ["메일 발송 연결", "뉴스레터 구독 데이터를 Resend, Mailchimp, Beehiiv 같은 이메일 서비스와 연결합니다."],
    ["전환 추적", "써보러 가기 버튼 클릭, 툴 제출, 뉴스레터 구독 이벤트를 분석 도구에 기록합니다."],
    ["관리자 보호", "운영 환경에는 ADMIN_PASSWORD와 ADMIN_SESSION_SECRET을 설정해 HttpOnly 쿠키 로그인을 활성화하세요."],
  ];

  if (!isAuthorized) {
    return (
      <main className="flex min-h-[calc(100vh-160px)] items-center bg-[#f8fafc] px-4 py-16 text-slate-950">
        <AdminLoginForm />
      </main>
    );
  }

  return (
    <main className="admin-operating-shell bg-[#f8fafc] text-slate-950">
      <section className="mx-auto w-full max-w-[1180px] px-4 py-10 md:px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex rounded-full border border-[#3182f6]/15 bg-[#3182f6]/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#3182f6]">
              Admin MVP
            </p>
            <h1 className="mt-4 text-4xl font-black md:text-5xl">AIDailyPick 운영 작업대</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              툴 제안, 문의, 뉴스레터 구독 신청을 확인하고, 툴 데이터를 추가/수정하는 운영 연습용 화면입니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:border-[#3182f6]/40 hover:text-[#3182f6]" href="/tools">
              툴 디렉토리 보기
            </Link>
            <Link className="rounded-xl bg-[#3182f6] px-4 py-2 text-sm font-black text-white shadow-[0_8px_24px_rgba(49,130,246,0.18)]" href="/submit">
              제출 페이지 보기
            </Link>
            {isDevelopmentBypass ? null : <AdminLogoutButton />}
          </div>
        </div>

        <div className="space-y-8">
          <section className="admin-launch-checklist rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(2,32,71,0.04)] md:p-7">
            <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-500">
              Launch Checklist
            </p>
            <h2 className="mt-3 text-2xl font-black text-slate-950">실제 운영 전 꼭 바꿀 것</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {launchChecklist.map(([title, description]) => (
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4" key={title}>
                  <h3 className="text-sm font-black text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
                </div>
              ))}
            </div>
          </section>
          {isDevelopmentBypass ? null : <AdminHealthPanel />}
          {isDevelopmentBypass ? null : <AdminAnalyticsPanel />}
          <AdminInbox />
          <AdminToolManager />
        </div>
      </section>
    </main>
  );
}
