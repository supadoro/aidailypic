import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/src/components/json-ld";
import { SaasToolCard } from "@/src/components/saas-tool-card";
import { allCategoryFilters, saasTools } from "@/src/data/saas-directory";
import { createPageMetadata } from "@/src/data/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AI 자동화 툴과 한국 SaaS 찾기",
  description: "글쓰기, 쇼츠, 마케팅, 이커머스, 노코드, CRM까지 AIDailyPick이 큐레이션한 SaaS 도구를 목적별로 찾아보세요.",
  path: "/tools",
  keywords: ["AI 자동화 툴 추천", "한국 SaaS", "SaaS 디렉토리", "노코드 툴", "마케팅 자동화"],
});

export default function ToolsPage() {
  const featuredTools = saasTools.filter((tool) => tool.isFeatured || tool.isTested);
  const sponsoredTools = saasTools.filter((tool) => tool.isSponsored);
  const categoryCounts = new Map<string, number>();
  for (const tool of saasTools) {
    categoryCounts.set(tool.category, (categoryCounts.get(tool.category) ?? 0) + 1);
  }
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
          {allCategoryFilters.map((item) => (
            <Link className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 transition hover:border-pink-300/45 hover:bg-white/[0.07]" href={`/category/${item.id}`} key={item.id}>
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-black text-white">{item.label}</p>
                <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] font-bold text-white/45">
                  {categoryCounts.get(item.id) ?? 0}
                </span>
              </div>
              <p className="mt-1 text-xs text-white/45">{item.hint}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-8 md:px-6">
        <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-6 md:grid-cols-3">
          {[
            ["어떤 툴을 올리나요?", "자동화, 생산성, 마케팅, 한국 SaaS처럼 실제 업무나 창작 시간을 줄이는 도구를 우선 봅니다."],
            ["스폰서는 어떻게 표시하나요?", "스폰서 툴은 별도 배지와 섹션으로 구분하고, 일반 추천과 섞여도 표시를 숨기지 않습니다."],
            ["목록은 어떻게 확장되나요?", "초기에는 AI 자동화 중심으로 시작하고, 점차 국내 SaaS와 1인 창업 도구까지 넓힙니다."],
          ].map(([title, description]) => (
            <div key={title}>
              <h2 className="text-sm font-black text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/55">{description}</p>
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
        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,122,24,0.14)_0%,rgba(255,45,149,0.13)_45%,rgba(139,92,246,0.14)_100%)] p-6">
          <p className="text-sm font-black text-white">내 툴도 소개하고 싶다면</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">
            AIDailyPick은 초기 SaaS, 바이브코딩 툴, 크리에이터/셀러용 자동화 도구를 받고 있습니다. 스폰서 여부와 관계없이 사용 목적이 분명한 툴을 먼저 검토합니다.
          </p>
          <a className="mt-5 inline-flex rounded-xl bg-white px-4 py-3 text-sm font-black text-[#111326]" href="/submit">
            툴 등록 신청하기
          </a>
          <Link className="ml-3 mt-5 inline-flex rounded-xl border border-white/12 px-4 py-3 text-sm font-black text-white/70 hover:border-white/30 hover:text-white" href="/launch">
            런칭 보드 보기
          </Link>
        </div>
      </section>
    </main>
  );
}
