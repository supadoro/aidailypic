"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { SaasToolCard } from "@/src/components/saas-tool-card";
import {
  categoryFilters,
  filterTools,
  futureCategoryFilters,
  getToolsForAudience,
  popularSearches,
  saasTools,
  type SaasCategory,
} from "@/src/data/saas-directory";

type FilterId = "all" | SaasCategory;

function SectionHeader(props: { eyebrow?: string; title: string; description?: string }) {
  const { eyebrow, title, description } = props;

  return (
    <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? <p className="mb-2 text-xs font-black uppercase text-pink-200/80">{eyebrow}</p> : null}
        <h2 className="text-2xl font-black text-white md:text-3xl">{title}</h2>
      </div>
      {description ? <p className="max-w-xl text-sm leading-6 text-white/55">{description}</p> : null}
    </div>
  );
}

function AdSenseBanner() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-4 backdrop-blur">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase text-white/35">Google AdSense</p>
          <p className="mt-1 text-sm font-semibold text-white/70">반복 업무 자동화 SaaS 스폰서 영역</p>
        </div>
        <Link className="w-fit rounded-xl border border-white/10 px-4 py-2 text-sm font-bold text-white/70 hover:border-orange-200/50" href="#">
          자세히 보기
        </Link>
      </div>
    </section>
  );
}

export function HomeToolDiscovery() {
  const [keyword, setKeyword] = useState("");
  const [activeCategory, setActiveCategory] = useState<FilterId>("all");

  const filteredTools = useMemo(() => filterTools(activeCategory, keyword), [activeCategory, keyword]);
  const featuredTools = filteredTools.filter((tool) => tool.isFeatured || tool.isTested).slice(0, 6);
  const threadTools = saasTools.filter((tool) => tool.sourceSignal.includes("스레드") || tool.tags.includes("요즘 뜸")).slice(0, 4);
  const sellerTools = getToolsForAudience("seller");
  const creatorTools = getToolsForAudience("creator");

  return (
    <main className="overflow-hidden bg-[#070812] text-white">
      <section className="relative mx-auto w-full max-w-[1180px] px-4 pb-16 pt-16 md:px-6 md:pt-20">
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-white/70 backdrop-blur">
              인스타 · 스레드 · 한국 커뮤니티에서 보이는 SaaS를 정리합니다
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">
              요즘 뜨는 AI 자동화 툴,
              <span className="block bg-[linear-gradient(135deg,#FCAF45_0%,#FD1D6C_45%,#A855F7_100%)] bg-clip-text text-transparent">
                대신 찾아봤습니다.
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#C9CAD6] md:text-lg">
              글쓰기, 상세페이지, 릴스, 마케팅, 이커머스, 업무 자동화까지. 광고처럼 보이는 말은 덜어내고 실제로 어디에 쓸 만한지 중심으로 정리합니다.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.07] p-3 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur">
              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  className="min-h-14 flex-1 rounded-xl border border-white/10 bg-[#111326] px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-pink-300/60"
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder="글쓰기, 상세페이지, 릴스, 마케팅 자동화 검색..."
                  value={keyword}
                />
                <button className="min-h-14 rounded-xl bg-[linear-gradient(135deg,#FF7A18_0%,#FF2D95_45%,#8B5CF6_100%)] px-6 text-sm font-black text-white shadow-[0_14px_45px_rgba(255,45,149,0.28)]">
                  툴 찾아보기
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {popularSearches.map((tag) => (
                <button
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold text-white/60 transition hover:border-pink-300/50 hover:text-white"
                  key={tag}
                  onClick={() => setKeyword(tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="border-l border-white/10 pl-5">
            <p className="text-xs font-black uppercase text-white/45">Today Signal</p>
            <div className="mt-5 divide-y divide-white/10">
              {saasTools.slice(0, 4).map((tool, index) => (
                <div className="flex items-center gap-3 py-4" key={tool.id}>
                  <span className="text-lg font-black text-white/25">{String(index + 1).padStart(2, "0")}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xs font-black">{tool.logoText}</div>
                  <div>
                    <p className="text-sm font-black text-white">{tool.name}</p>
                    <p className="text-xs text-white/45">{tool.sourceSignal}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-10 md:px-6">
        <SectionHeader
          description="자동화 툴로 시작하지만, 나중에는 생산성·마케팅·이커머스·크리에이터·노코드 SaaS까지 자연스럽게 확장할 수 있는 필터입니다."
          eyebrow="Browse"
          title="목적별로 먼저 걸러보기"
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {categoryFilters.map((item) => {
            const active = activeCategory === item.id;
            return (
              <button
                className={`rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-pink-300/60 bg-pink-300/10 shadow-[0_18px_60px_rgba(253,29,108,0.16)]"
                    : "border-white/10 bg-white/[0.045] hover:border-white/25"
                }`}
                key={item.id}
                onClick={() => setActiveCategory(item.id)}
                type="button"
              >
                <span className="block text-sm font-black text-white">{item.label}</span>
                <span className="mt-1 block text-xs text-white/45">{item.hint}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {futureCategoryFilters.map((item) => (
            <span
              className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-bold text-white/42"
              key={item.id}
              title={item.hint}
            >
              {item.label}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-10 md:px-6" id="today">
        <SectionHeader eyebrow="Daily Pick" title="오늘의 자동화 픽" description="운영자가 먼저 볼 만하다고 판단한 툴입니다. 과장된 카피보다 사용 목적이 분명한지 위주로 봤습니다." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(featuredTools.length ? featuredTools : filteredTools).slice(0, 6).map((tool) => (
            <SaasToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1180px] px-4 py-4 md:px-6">
        <AdSenseBanner />
      </div>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-10 md:px-6" id="trending">
        <SectionHeader eyebrow="Threads Signal" title="스레드에서 많이 보인 툴" description="요즘 타임라인에서 자주 보이는 툴을 짧게 모았습니다. 아직 검증 중인 툴도 섞여 있습니다." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {threadTools.map((tool) => (
            <SaasToolCard compact key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1180px] gap-8 px-4 py-10 md:px-6 lg:grid-cols-2">
        <div>
          <SectionHeader eyebrow="For Sellers" title="셀러를 위한 추천" description="상세페이지, 리뷰 분석, 상품 설명처럼 바로 업무 시간이 줄어드는 쪽으로 골랐습니다." />
          <div className="grid gap-4">
            {sellerTools.map((tool) => (
              <SaasToolCard compact key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
        <div>
          <SectionHeader eyebrow="For Creators" title="크리에이터를 위한 추천" description="릴스, 쇼츠, 후킹 카피처럼 콘텐츠 제작 루틴에 붙이기 쉬운 툴입니다." />
          <div className="grid gap-4">
            {creatorTools.map((tool) => (
              <SaasToolCard compact key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-12 md:px-6" id="newsletter">
        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,122,24,0.18)_0%,rgba(255,45,149,0.16)_45%,rgba(139,92,246,0.16)_100%)] p-6 backdrop-blur md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_420px] md:items-center">
            <div>
              <p className="text-xs font-black uppercase text-pink-100/75">Newsletter</p>
              <h2 className="mt-2 text-3xl font-black text-white">AI 자동화 트렌드, 놓치지 마세요.</h2>
              <p className="mt-3 text-sm leading-6 text-white/60">주 1회, 요즘 보이는 SaaS와 써볼 만한 자동화 아이디어만 짧게 보내드립니다.</p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row">
              <input className="min-h-12 flex-1 rounded-xl border border-white/10 bg-[#070812]/70 px-4 text-sm text-white outline-none placeholder:text-white/35" placeholder="이메일 주소를 입력해주세요" type="email" />
              <button className="min-h-12 rounded-xl bg-white px-5 text-sm font-black text-[#111326]">구독하기</button>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pb-20 pt-8 md:px-6">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["검증된 툴만 소개", "직접 확인했거나 커뮤니티 반응이 있는 툴부터 올립니다."],
            ["실사용 리뷰 제공", "좋은 점과 아쉬운 점을 같이 남겨 판단하기 쉽게 정리합니다."],
            ["커뮤니티 신호 반영", "인스타, 스레드, 한국 커뮤니티에서 보이는 흐름을 봅니다."],
            ["제휴 혜택 안내", "할인, 무료 체험, 추천 링크가 있으면 한곳에 모읍니다."],
          ].map(([title, description]) => (
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5" key={title}>
              <h3 className="text-base font-black text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/50">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
