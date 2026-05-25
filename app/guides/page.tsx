import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/src/components/json-ld";
import { guideCurations } from "@/src/data/guide-curations";
import { createPageMetadata } from "@/src/data/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AI/SaaS 추천 가이드",
  description: "셀러, 크리에이터, 마케터, 1인 창업자를 위한 AI 자동화 툴과 SaaS 조합 추천 리스트를 모았습니다.",
  path: "/guides",
  keywords: ["AI 툴 추천", "SaaS 추천", "셀러 자동화", "크리에이터 툴", "1인 창업 툴"],
});

export default function GuidesPage() {
  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AIDailyPick 추천 가이드",
    description: "SNS와 검색 유입을 위한 목적별 SaaS 큐레이션 가이드",
    url: "https://aidailypick.com/guides",
    numberOfItems: guideCurations.length,
    itemListElement: guideCurations.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.title,
      url: `https://aidailypick.com/guides/${guide.slug}`,
    })),
  };

  return (
    <main className="guides-clean-index bg-[#f8fafc] text-slate-950">
      <JsonLd data={listJsonLd} />
      <section className="mx-auto w-full max-w-[1080px] px-4 py-12 md:px-6 md:py-16">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-black uppercase tracking-wide text-[#3182f6]">
            Guides
          </p>
          <h1 className="text-3xl font-black leading-tight md:text-5xl">상황별로 바로 고르는 AI/SaaS 가이드</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            처음 쓰는 사람도 한 번에 너무 많은 툴을 보지 않도록, 목적별로 필요한 조합만 짧게 묶었습니다. 각 가이드는 추천 이유와 주의할 점을 함께 봅니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold text-slate-500">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">목적별 선택</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">초보자 첫 단계</span>
            <Link className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[#3182f6]" href="/methodology">
              검수 기준
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1080px] gap-3 px-4 pb-20 md:grid-cols-2 md:px-6">
        {guideCurations.map((guide) => (
          <Link
            className="group rounded-lg border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#3182f6]/30"
            href={`/guides/${guide.slug}`}
            key={guide.slug}
          >
            <p className="text-xs font-black uppercase text-[#3182f6]">{guide.angle}</p>
            <h2 className="mt-3 text-xl font-black text-slate-950">{guide.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{guide.hook}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {guide.hashtags.slice(0, 4).map((tag) => (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold text-slate-500" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm font-black text-[#3182f6]">{guide.cta}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
