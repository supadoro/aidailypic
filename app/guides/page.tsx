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
    <main className="bg-[#070812] text-white">
      <JsonLd data={listJsonLd} />
      <section className="mx-auto w-full max-w-[1180px] px-4 py-14 md:px-6 md:py-18">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-wide text-pink-100/75">
            Guides
          </p>
          <h1 className="text-4xl font-black leading-tight md:text-6xl">
            저장해두기 좋은
            <span className="block bg-[linear-gradient(135deg,#FCAF45_0%,#FD1D6C_45%,#A855F7_100%)] bg-clip-text text-transparent">
              AI/SaaS 추천 리스트
            </span>
          </h1>
          <p className="mt-5 text-base leading-8 text-white/60">
            인스타, 스레드, 블로그에서 바로 공유하기 좋은 목적별 큐레이션입니다. 툴을 하나씩 찾기보다 “내 상황”에 맞는 조합으로 먼저 봅니다.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1180px] gap-4 px-4 pb-20 md:grid-cols-2 md:px-6">
        {guideCurations.map((guide) => (
          <Link
            className="group rounded-3xl border border-white/10 bg-white/[0.055] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.24)] transition hover:-translate-y-1 hover:border-pink-300/45"
            href={`/guides/${guide.slug}`}
            key={guide.slug}
          >
            <p className="text-xs font-black uppercase text-orange-200/80">{guide.angle}</p>
            <h2 className="mt-3 text-2xl font-black text-white">{guide.title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/58">{guide.hook}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {guide.hashtags.slice(0, 4).map((tag) => (
                <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-[11px] font-bold text-white/50" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm font-black text-pink-100/80 group-hover:text-white">{guide.cta} →</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
