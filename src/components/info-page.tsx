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
  const { badge, title, description, updatedAt = "2026년 5월 3일", children } = props;

  return (
    <main className="bg-[#070812] text-white">
      <section className="mx-auto w-full max-w-[920px] px-4 py-14 md:px-6 md:py-18">
        <Link className="mb-6 inline-flex text-sm font-bold text-white/50 hover:text-white" href="/">
          ← 홈으로 돌아가기
        </Link>
        <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-wide text-white/60">
          {badge}
        </p>
        <h1 className="text-4xl font-black leading-tight md:text-5xl">{title}</h1>
        <p className="mt-5 text-base leading-8 text-white/60">{description}</p>
        <p className="mt-4 text-xs font-bold text-white/35">마지막 업데이트: {updatedAt}</p>
      </section>

      <section className="mx-auto w-full max-w-[920px] px-4 pb-20 md:px-6">
        <div className="space-y-8 rounded-3xl border border-white/10 bg-white/[0.055] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)] md:p-8">
          {children}
        </div>
      </section>
    </main>
  );
}

export function InfoSection(props: { title: string; children: ReactNode }) {
  return (
    <section className="border-b border-white/10 pb-7 last:border-b-0 last:pb-0">
      <h2 className="text-xl font-black text-white">{props.title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-white/60">{props.children}</div>
    </section>
  );
}
