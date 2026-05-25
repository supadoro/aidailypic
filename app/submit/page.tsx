import type { Metadata } from "next";
import Link from "next/link";

import { SubmitToolForm } from "@/src/components/submit-tool-form";
import { createPageMetadata } from "@/src/data/seo";

export const metadata: Metadata = createPageMetadata({
  title: "바이브코딩 SaaS 런칭 제보",
  description: "바이브코딩으로 만든 AI 툴, 노코드 SaaS, 업무 자동화 서비스를 AIDailyPick에 제보하고 초보자 관점으로 소개받아보세요.",
  path: "/submit",
  keywords: ["바이브코딩 SaaS", "SaaS 홍보", "AI 툴 홍보", "한국 SaaS 등록", "툴 제보"],
});

const submitChecklist = [
  ["01", "데모 링크", "사용자가 실제로 열어볼 수 있는 공식 페이지나 데모 URL"],
  ["02", "가격/무료 범위", "무료로 가능한 일, 유료 전환 기준, 베타 종료 여부"],
  ["03", "제품 화면", "공식 스크린샷, 데모 GIF, 공개 가능한 이미지"],
];

const reviewRules = [
  ["먼저 봅니다", "링크가 열리는지, 첫 결과물이 보이는지, 가격 정보가 숨겨져 있지 않은지 확인합니다."],
  ["좋게 봅니다", "타깃 사용자가 분명하고, 초보자가 따라 할 수 있는 데모 흐름이 있는 제품을 우선 검토합니다."],
  ["보류합니다", "랜딩만 있고 제품 확인이 어렵거나, 성과 보장 표현이 강하면 공개 후보에서 제외합니다."],
];

const reviewFlow = [
  ["접수", "제출 내용은 검토 전 후보로 들어갑니다."],
  ["확인", "데모, 가격, 제품 화면, 공개 동의를 분리해서 봅니다."],
  ["공개", "소개 완료 상태가 된 항목만 런칭 보드에 노출합니다."],
];

export default function SubmitPage() {
  return (
    <main className="toss-clean bg-[#f8fafc] text-slate-950">
      <section className="mx-auto w-full max-w-[1120px] px-4 py-12 md:px-6 md:py-16">
        <div className="maker-submit-hero grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="text-sm font-black text-[#3182f6]">바이브코딩 SaaS 제보</p>
            <h1 className="mt-3 max-w-3xl text-[2.25rem] font-black leading-tight tracking-normal text-slate-950 md:text-[3.5rem]">
              내 SaaS, 3가지만 보내주세요.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              AIDailyPick은 제보된 툴을 바로 추천처럼 올리지 않습니다. 링크, 가격, 제품 화면을 먼저 확인하고 초보자가 판단할 수 있는 소개로 정리합니다.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link className="rounded-2xl bg-[#3182f6] px-5 py-3 text-center text-sm font-black text-white shadow-[0_8px_24px_rgba(49,130,246,0.22)]" href="#submit-form">
                제보 작성하기
              </Link>
              <Link className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-black text-slate-700 hover:border-[#3182f6]/40 hover:text-[#3182f6]" href="/methodology">
                검수 기준 보기
              </Link>
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(2,32,71,0.05)]">
            <p className="text-xs font-black uppercase text-slate-400">Review Promise</p>
            <h2 className="mt-2 text-xl font-black text-slate-950">광고보다 확인을 먼저 합니다</h2>
            <div className="mt-4 grid gap-3">
              {reviewRules.map(([title, description]) => (
                <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4" key={title}>
                  <h3 className="text-sm font-black text-slate-950">{title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>

        <section className="maker-submit-checklist mt-8 grid gap-3 md:grid-cols-3">
          {submitChecklist.map(([step, title, description]) => (
            <article className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(2,32,71,0.04)]" key={title}>
              <p className="text-xs font-black text-[#3182f6]">{step}</p>
              <h2 className="mt-2 text-lg font-black text-slate-950">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]" id="submit-form">
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(2,32,71,0.04)] md:p-6">
            <p className="text-xs font-black uppercase text-slate-400">Before Submit</p>
            <h2 className="mt-2 text-2xl font-black leading-tight text-slate-950">폼은 짧게, 근거는 분리해서 받습니다</h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              과장된 홍보 문구보다 실제 확인 가능한 자료가 중요합니다. 아래 흐름을 기준으로 공개 후보를 나눕니다.
            </p>
            <div className="mt-5 grid gap-3">
              {reviewFlow.map(([title, description], index) => (
                <article className="grid grid-cols-[2rem_1fr] gap-3 rounded-2xl bg-slate-50 p-4" key={title}>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-black text-[#3182f6] shadow-[0_4px_12px_rgba(2,32,71,0.06)]">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-black text-slate-950">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
                  </div>
                </article>
              ))}
            </div>
            <Link className="mt-5 inline-flex text-sm font-black text-[#3182f6]" href="/launch">
              런칭 보드 보기
            </Link>
          </div>

          <SubmitToolForm />
        </section>
      </section>
    </main>
  );
}
