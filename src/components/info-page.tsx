import type { ReactNode } from "react";
import Link from "next/link";

type InfoPageProps = {
  badge: string;
  title: string;
  description: string;
  updatedAt?: string;
  children: ReactNode;
};

export function InfoPage(props: InfoPageProps) {
  const { badge, title, description, updatedAt = "2026년 5월 18일", children } = props;

  return (
    <main className="info-page-shell toss-clean bg-[#f8fafc] text-slate-950">
      <section className="mx-auto w-full max-w-[920px] px-4 py-12 md:px-6 md:py-16">
        <Link className="mb-6 inline-flex text-sm font-black text-slate-500 hover:text-[#3182f6]" href="/">
          ← 홈으로 돌아가기
        </Link>
        <p className="mb-4 inline-flex rounded-full border border-[#3182f6]/15 bg-[#3182f6]/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#3182f6]">
          {badge}
        </p>
        <h1 className="text-[2.25rem] font-black leading-tight tracking-normal text-slate-950 md:text-[3.25rem]">{title}</h1>
        <p className="mt-5 text-base leading-8 text-slate-600">{description}</p>
        <p className="mt-4 text-xs font-bold text-slate-400">마지막 업데이트: {updatedAt}</p>
      </section>

      <section className="mx-auto w-full max-w-[920px] px-4 pb-16 md:px-6">
        <div className="info-page-content space-y-8 rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_8px_24px_rgba(2,32,71,0.04)] md:p-8">
          {children}
        </div>
      </section>
    </main>
  );
}

export function InfoSection(props: { title: string; children: ReactNode }) {
  return (
    <section className="border-b border-slate-100 pb-7 last:border-b-0 last:pb-0">
      <h2 className="text-xl font-black text-slate-950">{props.title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-600">{props.children}</div>
    </section>
  );
}
