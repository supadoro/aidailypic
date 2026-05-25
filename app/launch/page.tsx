import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/src/components/json-ld";
import { LaunchBoardList } from "@/src/components/launch-board-list";
import { createPageMetadata } from "@/src/data/seo";

export const metadata: Metadata = createPageMetadata({
  title: "바이브코딩 SaaS 런칭 보드",
  description: "바이브코딩으로 만든 AI 툴, 노코드 SaaS, 생산성 도구를 초보자 관점으로 검토하고 소개하는 AIDailyPick 런칭 보드입니다.",
  path: "/launch",
  keywords: ["바이브코딩 SaaS", "SaaS 런칭", "AI 툴 제보", "한국 SaaS 홍보", "노코드 SaaS"],
});

const boardRules = [
  ["검수 전", "접수됐지만 아직 추천으로 판단하지 않은 상태입니다."],
  ["확인 중", "데모, 가격, 첫 사용 흐름, 공식 이미지를 확인합니다."],
  ["소개 완료", "초보자가 볼 수 있는 근거가 채워진 항목만 공개합니다."],
];

const eligibleTools = [
  ["AI 툴", "글쓰기, 리서치, 영상, 디자인, 업무 자동화처럼 결과물이 바로 보이는 도구"],
  ["노코드/바이브코딩 SaaS", "Lovable, Cursor, v0, Replit, Bolt 등으로 만든 초기 제품"],
  ["한국 SaaS", "한국어 사용성, 국내 결제/업무 흐름, 로컬 시장 문제를 다루는 제품"],
];

export default function LaunchPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "AIDailyPick 바이브코딩 SaaS 런칭 보드",
    description: "바이브코딩으로 만든 SaaS와 AI 툴을 초보자 관점으로 검토하고 소개하는 런칭 보드",
    url: "https://aidailypick.com/launch",
  };

  return (
    <main className="toss-clean bg-[#f8fafc] text-slate-950">
      <JsonLd data={jsonLd} />
      <section className="mx-auto w-full max-w-[1120px] px-4 py-12 md:px-6 md:py-16">
        <div className="launch-funnel-hero grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="text-sm font-black text-[#3182f6]">런칭 보드</p>
            <h1 className="mt-3 max-w-3xl text-[2.25rem] font-black leading-tight tracking-normal text-slate-950 md:text-[3.5rem]">
              검수된 런칭 후보만 보여줍니다.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              바이브코딩으로 만든 SaaS를 전부 쌓지 않습니다. 데모, 가격, 제품 화면, 공개 동의가 확인된 항목만 소개 후보로 정리합니다.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link className="rounded-2xl bg-[#3182f6] px-5 py-3 text-center text-sm font-black text-white shadow-[0_8px_24px_rgba(49,130,246,0.22)]" href="/submit">
                내 SaaS 제보하기
              </Link>
              <Link className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-black text-slate-700 hover:border-[#3182f6]/40 hover:text-[#3182f6]" href="/methodology">
                공개 기준 보기
              </Link>
            </div>
          </div>

          <aside className="launch-board-rules rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(2,32,71,0.05)]">
            <p className="text-xs font-black uppercase text-slate-400">Board Rules</p>
            <h2 className="mt-2 text-xl font-black text-slate-950">보드는 이렇게 채웁니다</h2>
            <div className="mt-4 grid gap-3">
              {boardRules.map(([title, description]) => (
                <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4" key={title}>
                  <h3 className="text-sm font-black text-slate-950">{title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <LaunchBoardList />

      <section className="mx-auto w-full max-w-[1120px] px-4 py-10 md:px-6">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase text-slate-400">Eligible</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">이런 툴을 기다립니다</h2>
          </div>
          <Link className="text-sm font-black text-[#3182f6]" href="/submit">
            제보하러 가기
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {eligibleTools.map(([title, description]) => (
            <article className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(2,32,71,0.04)]" key={title}>
              <h3 className="text-base font-black text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
