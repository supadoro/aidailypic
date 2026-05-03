import type { Metadata } from "next";

import { JsonLd } from "@/src/components/json-ld";
import { SaasToolCard } from "@/src/components/saas-tool-card";
import { categoryFilters, futureCategoryFilters, saasTools } from "@/src/data/saas-directory";

export const metadata: Metadata = {
  title: "툴 찾기",
  description: "AIDailyPick에서 큐레이션한 AI 자동화 툴과 한국 SaaS를 목적별로 찾아보세요.",
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsPage() {
  const featuredTools = saasTools.filter((tool) => tool.isFeatured || tool.isTested);
  const sponsoredTools = saasTools.filter((tool) => tool.isSponsored);
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AIDailyPick SaaS Tool Directory",
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
    <main className="bg-[#070812] text-white">
      <JsonLd data={itemListJsonLd} />
      <section className="mx-auto w-full max-w-[1180px] px-4 py-14 md:px-6 md:py-18">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-white/65">
            Tool Directory
          </p>
          <h1 className="text-4xl font-black leading-tight md:text-6xl">
            지금 써볼 만한 SaaS를
            <span className="block bg-[linear-gradient(135deg,#FCAF45_0%,#FD1D6C_45%,#A855F7_100%)] bg-clip-text text-transparent">
              목적별로 모았습니다.
            </span>
          </h1>
          <p className="mt-5 text-base leading-8 text-white/60">
            자동화 툴로 시작하지만, 한국 SaaS와 생산성 도구까지 확장할 수 있게 카테고리를 열어두었습니다.
            광고 문구보다 “누가 왜 쓰면 좋은지”를 먼저 봅니다.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {categoryFilters.filter((item) => item.id !== "all").map((item) => (
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4" key={item.id}>
              <p className="text-sm font-black text-white">{item.label}</p>
              <p className="mt-1 text-xs text-white/45">{item.hint}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-8 md:px-6">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-black uppercase text-pink-200/80">Featured</p>
            <h2 className="text-2xl font-black md:text-3xl">먼저 보면 좋은 툴</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/55">무료체험, 검증 여부, 커뮤니티 신호를 기준으로 먼저 꺼내둔 리스트입니다.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <SaasToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-8 md:px-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-4">
          <p className="text-[11px] font-bold uppercase text-white/35">Google AdSense</p>
          <p className="mt-1 text-sm font-semibold text-white/70">툴 탐색 흐름을 방해하지 않는 보조 광고 영역</p>
        </div>
      </section>

      {sponsoredTools.length ? (
        <section className="mx-auto w-full max-w-[1180px] px-4 py-8 md:px-6">
          <div className="mb-6">
            <p className="mb-2 text-xs font-black uppercase text-orange-200/80">Sponsored</p>
            <h2 className="text-2xl font-black md:text-3xl">스폰서 툴</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sponsoredTools.map((tool) => (
              <SaasToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto w-full max-w-[1180px] px-4 py-8 md:px-6">
        <div className="mb-6">
          <p className="mb-2 text-xs font-black uppercase text-pink-200/80">All Tools</p>
          <h2 className="text-2xl font-black md:text-3xl">전체 SaaS 목록</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {saasTools.map((tool) => (
            <SaasToolCard compact key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pb-20 pt-8 md:px-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm font-black text-white">곧 넓혀갈 카테고리</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {futureCategoryFilters.map((item) => (
              <span className="rounded-full border border-white/10 px-3 py-2 text-xs font-bold text-white/45" key={item.id}>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
