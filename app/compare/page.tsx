import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/src/components/json-ld";
import { audienceLabels, hasCompleteReviewFields, saasTools } from "@/src/data/saas-directory";
import { createPageMetadata } from "@/src/data/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AI/SaaS 툴 비교",
  description: "대표 AI 툴과 한국 SaaS를 목적, 추천 대상, 가격, 주의점 기준으로 비교합니다.",
  path: "/compare",
  keywords: ["AI 툴 비교", "SaaS 비교", "한국 SaaS", "AI 자동화 툴"],
});

export default function ComparePage() {
  const tools = saasTools.filter((tool) => hasCompleteReviewFields(tool) || tool.isFeatured || tool.isTested).slice(0, 8);
  const compareJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AIDailyPick 툴 비교",
    url: "https://aidailypick.com/compare",
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `https://aidailypick.com/tools/${tool.slug}`,
    })),
  };

  return (
    <main className="saas-curation-page min-h-screen">
      <JsonLd data={compareJsonLd} />
      <section className="mx-auto w-full max-w-[1180px] px-5 py-12 md:px-6 md:py-16">
        <p className="mb-4 inline-flex rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-black text-[#2563EB]">
          Compare
        </p>
        <h1 className="font-heading max-w-3xl text-5xl font-black leading-tight text-[#111827] md:text-6xl">툴 비교표</h1>
        <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-[#4B5563]">
          비슷해 보이는 AI/SaaS 툴을 목적, 추천 대상, 가격, 주의점으로 나눠 빠르게 비교합니다.
        </p>
      </section>

      <section className="compare-tool-matrix mx-auto w-full max-w-[1180px] px-5 pb-20 md:px-6">
        <div className="saas-slide-panel overflow-hidden rounded-[28px]">
          <div className="hidden grid-cols-[1.1fr_1fr_1fr_0.9fr_1.4fr] gap-4 border-b border-[#E5E7EB] bg-[#F4F4F5] px-5 py-4 text-xs font-black uppercase tracking-[0.08em] text-[#6B7280] md:grid">
            <span>툴</span>
            <span>목적</span>
            <span>추천 대상</span>
            <span>가격</span>
            <span>주의점</span>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {tools.map((tool) => (
              <Link className="grid gap-3 px-5 py-5 transition hover:bg-[#F8FAFC] md:grid-cols-[1.1fr_1fr_1fr_0.9fr_1.4fr] md:items-center" href={tool.reviewUrl} key={tool.id}>
                <div>
                  <p className="text-lg font-black text-[#111827]">{tool.name}</p>
                  <p className="mt-1 text-xs font-bold text-[#6B7280]">{tool.categoryLabel}</p>
                </div>
                <p className="text-sm font-semibold text-[#4B5563]">{tool.useCases?.[0] ?? tool.tags[0]}</p>
                <p className="text-sm font-semibold text-[#4B5563]">{tool.bestFor.map((key) => audienceLabels[key]).join(" · ")}</p>
                <p className="text-sm font-black text-[#2563EB]">{tool.pricing}</p>
                <p className="text-sm font-semibold leading-6 text-[#6B7280]">{tool.pricingCaution ?? tool.notFor?.[0] ?? "공식 조건 확인 필요"}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
