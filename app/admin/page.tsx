import type { Metadata } from "next";
import Link from "next/link";

import { AdminToolManager } from "@/src/components/admin-tool-manager";

export const metadata: Metadata = {
  title: "관리자",
  description: "AIDailyPick 툴 디렉토리 MVP 관리자 화면입니다.",
  alternates: {
    canonical: "/admin",
  },
};

export default function AdminPage() {
  return (
    <main className="bg-[#070812] text-white">
      <section className="mx-auto w-full max-w-[1180px] px-4 py-10 md:px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-wide text-white/55">
              Admin MVP
            </p>
            <h1 className="mt-4 text-4xl font-black md:text-5xl">AIDailyPick 운영 관리자</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">
              툴 데이터를 추가하고, 기존 더미 툴을 수정하거나 숨김 처리하는 운영 연습용 화면입니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link className="rounded-xl border border-white/10 px-4 py-2 text-sm font-bold text-white/65 hover:text-white" href="/tools">
              툴 디렉토리 보기
            </Link>
            <Link className="rounded-xl bg-white px-4 py-2 text-sm font-black text-[#111326]" href="/submit">
              제출 페이지 보기
            </Link>
          </div>
        </div>

        <AdminToolManager />
      </section>
    </main>
  );
}
