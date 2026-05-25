import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/src/components/json-ld";
import { SlideToolCard } from "@/src/components/slide-tool-card";
import { beginnerPaths, getBeginnerPathToolLinks } from "@/src/data/beginner-paths";
import { allCategoryFilters, hasCompleteReviewFields, saasTools } from "@/src/data/saas-directory";
import { createPageMetadata } from "@/src/data/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AI 자동화 툴과 한국 SaaS 찾기",
  description: "글쓰기, 쇼츠, 마케팅, 이커머스, 노코드, CRM까지 AIDailyPick이 큐레이션한 SaaS 도구를 목적별로 찾아보세요.",
  path: "/tools",
  keywords: ["AI 자동화 툴 추천", "한국 SaaS", "SaaS 디렉토리", "노코드 툴", "마케팅 자동화"],
});

export default function ToolsPage() {
  const reviewedTools = saasTools.filter(hasCompleteReviewFields);
  const priorityPaths = beginnerPaths.slice(0, 3);
  const categoryPreview = allCategoryFilters.slice(0, 9);
  const watchlistPreview = saasTools.filter((tool) => !hasCompleteReviewFields(tool)).slice(0, 6);
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AIDailyPick SaaS Tools",
    description: "한국 사용자를 위한 AI 자동화 툴과 SaaS 큐레이션 목록",
    url: "https://aidailypick.com/tools",
    numberOfItems: saasTools.length,
    itemListElement: saasTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `https://aidailypick.com/tools/${tool.slug}`,
    })),
  };

  return (
    <main className="saas-curation-page bg-[#f8fafc] text-[#111827]">
      <JsonLd data={itemListJsonLd} />

      <section className="mx-auto grid w-full max-w-[1120px] gap-8 px-5 pb-10 pt-10 md:px-6 md:pt-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.7fr)] lg:items-start">
        <div>
          <div className="mb-5 flex flex-wrap gap-2">
            {["목적 우선", "검수 기준", "광고 분리"].map((label) => (
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-500" key={label}>
                {label}
              </span>
            ))}
          </div>
          <h1 className="font-heading max-w-2xl text-4xl font-black leading-tight text-[#111827] md:text-6xl">처음이면 하나만 고르세요</h1>
          <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-slate-500 md:text-lg">
            전체 SaaS 목록부터 보면 금방 지칩니다. 먼저 만들고 싶은 결과물을 고르고, 추천 3개만 보기로 시작하세요.
          </p>
        </div>

        <aside className="rounded-[28px] border border-slate-100 bg-white p-5 shadow-[0_18px_48px_rgba(2,32,71,0.07)]">
          <p className="text-xs font-black uppercase text-[#3182f6]">Review Status</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              [`${reviewedTools.length}`, "검수"],
              [`${watchlistPreview.length}`, "대기"],
              [`${saasTools.length}`, "전체"],
            ].map(([value, label]) => (
              <div className="rounded-2xl bg-slate-50 p-4" key={label}>
                <p className="text-2xl font-black text-slate-950">{value}</p>
                <p className="mt-1 text-xs font-bold text-slate-500">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm font-semibold leading-6 text-slate-500">숫자는 참고만 하세요. 첫 방문에서는 많은 목록보다 맞는 출발점이 더 중요합니다.</p>
        </aside>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 py-8 md:px-6">
        <div className="tools-purpose-finder grid gap-4 md:grid-cols-3">
          {priorityPaths.map((path) => {
            const tools = getBeginnerPathToolLinks(path, saasTools).slice(0, 3);

            return (
              <article className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(2,32,71,0.04)]" key={path.id}>
                <h2 className="text-xl font-black text-slate-950">{path.title}</h2>
                <p className="mt-3 min-h-12 text-sm font-semibold leading-6 text-slate-500">{path.problem}</p>
                <div className="mt-4 grid gap-2">
                  {tools.map((tool) => (
                    <Link className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-3 text-sm font-black text-slate-700 hover:bg-blue-50 hover:text-[#3182f6]" href={tool.reviewUrl} key={tool.slug}>
                      {tool.name}
                      <span className="text-xs">보기</span>
                    </Link>
                  ))}
                </div>
                <Link className="mt-4 inline-flex rounded-2xl bg-[#3182f6] px-4 py-3 text-sm font-black text-white shadow-[0_8px_24px_rgba(49,130,246,0.18)]" href={path.guideHref}>
                  추천 3개만 보기
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 py-8 md:px-6">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-black uppercase text-[#3182f6]">Reviewed</p>
            <h2 className="text-2xl font-black text-slate-950 md:text-3xl">근거가 채워진 후보</h2>
          </div>
          <p className="max-w-xl text-sm font-semibold leading-6 text-slate-500">출처, 첫 사용 장면, 추천 제외 조건, 가격 주의가 있는 툴만 먼저 보여줍니다.</p>
        </div>
        <div className="grid gap-5">
          {reviewedTools.slice(0, 6).map((tool, index) => (
            <SlideToolCard key={tool.id} priority={index === 0} tool={tool} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 py-8 md:px-6">
        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(2,32,71,0.04)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase text-slate-400">Categories</p>
              <h2 className="mt-1 text-xl font-black text-slate-950">더 구체적으로 찾기</h2>
            </div>
            <Link className="w-fit rounded-2xl border border-slate-100 px-4 py-3 text-sm font-black text-slate-600 hover:border-slate-200 hover:text-slate-950" href="/methodology">
              검수 기준
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {categoryPreview.map((item) => (
              <Link className="rounded-full border border-slate-100 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-[#3182f6]" href={`/categories/${item.id}`} key={item.id}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] gap-3 px-5 pb-16 pt-4 md:grid-cols-3 md:px-6">
        <Link className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(2,32,71,0.04)] hover:border-[#3182f6]/30" href="/submit">
          <p className="text-base font-black text-slate-950">내 SaaS 제보하기</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">초기 제품은 광고 문구보다 첫 사용자 관점으로 정리합니다.</p>
        </Link>
        <Link className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(2,32,71,0.04)] hover:border-[#3182f6]/30" href="/launch">
          <p className="text-base font-black text-slate-950">신규 런칭 보기</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">요즘 올라온 한국 SaaS 후보를 확인합니다.</p>
        </Link>
        <Link className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(2,32,71,0.04)] hover:border-[#3182f6]/30" href="/guides">
          <p className="text-base font-black text-slate-950">가이드로 시작하기</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">툴 이름보다 작업 순서를 먼저 봅니다.</p>
        </Link>
      </section>
    </main>
  );
}
