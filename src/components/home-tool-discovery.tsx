"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { NewsletterForm } from "@/src/components/newsletter-form";
import { SaasToolCard } from "@/src/components/saas-tool-card";
import {
  categoryFilters,
  filterTools,
  futureCategoryFilters,
  getBeginnerStarterTools,
  getToolEvidenceLabel,
  getToolsForAudience,
  popularSearches,
  saasTools,
  type SaasTool,
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

const curationRules = [
  ["직접 테스트와 후보 분리", "직접 써본 기록이 없는 툴은 추천이 아니라 후보로 표시합니다."],
  ["초보자 기준", "기능 수보다 첫 결과물까지 막히는 지점, 무료 범위, 한국어 사용성을 먼저 봅니다."],
  ["광고와 근거 분리", "스폰서/제휴 가능성은 숨기지 않고, 공식 정보와 사용 메모를 분리합니다."],
];

const makerLaunchSteps = [
  ["제보", "데모 링크, 만든 도구, 가격/무료 범위, 타깃 사용자를 남깁니다."],
  ["초보자 검토", "처음 쓰는 사람이 막히는 지점과 첫 결과물까지의 흐름을 확인합니다."],
  ["소개/피드백", "소개 후보, 스폰서, 피드백 리포트 중 맞는 방식으로 연결합니다."],
];

function StarterMediaCard(props: { tool: SaasTool; index: number }) {
  const { tool, index } = props;

  if (!tool.media) {
    return null;
  }

  return (
    <Link className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#0D1020] transition hover:border-pink-300/45" href={tool.reviewUrl}>
      <div className="relative h-32 w-full bg-white/[0.03]">
        <Image
          alt={tool.media.imageAlt}
          className="object-contain p-3 transition duration-300 group-hover:scale-[1.025]"
          fill
          priority={index === 0}
          sizes="(min-width: 1024px) 360px, 100vw"
          src={tool.media.imageUrl}
        />
      </div>
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-black text-white">{tool.name}</p>
          <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-2 py-1 text-[10px] font-black text-sky-100">{getToolEvidenceLabel(tool)}</span>
        </div>
        <p className="mt-2 text-xs leading-5 text-white/45">{tool.useCases?.slice(0, 2).join(" · ")}</p>
      </div>
    </Link>
  );
}

export function HomeToolDiscovery() {
  const [keyword, setKeyword] = useState("");
  const [activeCategory, setActiveCategory] = useState<FilterId>("all");

  const filteredTools = useMemo(() => filterTools(activeCategory, keyword), [activeCategory, keyword]);
  const beginnerTools = getBeginnerStarterTools();
  const featuredTools = filteredTools.filter((tool) => beginnerTools.some((starter) => starter.slug === tool.slug)).slice(0, 6);
  const threadTools = saasTools.filter((tool) => tool.sourceSignal.includes("스레드") || tool.tags.includes("요즘 뜸")).slice(0, 4);
  const sellerTools = getToolsForAudience("seller");
  const creatorTools = getToolsForAudience("creator");
  const newTools = [...saasTools].slice(-4).reverse();
  const officialInfoCount = saasTools.filter((tool) => tool.isTested).length;
  const categoryCount = new Set(saasTools.map((tool) => tool.category)).size;
  const heroMediaTools = ["canva", "capcut", "tally"]
    .map((slug) => beginnerTools.find((tool) => tool.slug === slug))
    .filter((tool): tool is SaasTool => Boolean(tool?.media));

  return (
    <main className="overflow-hidden bg-[#070812] text-white">
      <section className="relative mx-auto w-full max-w-[1180px] px-4 pb-16 pt-16 md:px-6 md:pt-20">
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-white/70 backdrop-blur">
              AI 처음 쓰는 사람을 위한 초보자 기준 정리
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">
              AI 툴을 처음 쓴다면,
              <span className="block bg-[linear-gradient(135deg,#FCAF45_0%,#FD1D6C_45%,#A855F7_100%)] bg-clip-text text-transparent">
                목록보다 시작 순서가 먼저입니다.
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#C9CAD6] md:text-lg">
              툴을 많이 보여주기보다 “처음엔 뭘 눌러야 하는지”, “무료로 어디까지 되는지”, “결제 전 뭘 확인해야 하는지”부터 정리합니다.
              직접 테스트 전인 툴은 추천이 아니라 후보로 분리합니다.
            </p>

            <div className="mt-7 grid max-w-2xl grid-cols-3 gap-3">
              {[
                [`${beginnerTools.length}`, "초보자 시작 후보"],
                [`${officialInfoCount}`, "공식 정보 확인"],
                [`${categoryCount}`, "분류 카테고리"],
              ].map(([value, label]) => (
                <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4" key={label}>
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="mt-1 text-xs font-bold text-white/45">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.07] p-3 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur">
              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  className="min-h-14 flex-1 rounded-xl border border-white/10 bg-[#111326] px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-pink-300/60"
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder="블로그 초안, 쇼츠 자막, 카드뉴스, 문의폼처럼 하고 싶은 작업을 검색..."
                  value={keyword}
                />
                <button className="min-h-14 rounded-xl bg-[linear-gradient(135deg,#FF7A18_0%,#FF2D95_45%,#8B5CF6_100%)] px-6 text-sm font-black text-white shadow-[0_14px_45px_rgba(255,45,149,0.28)]">
                  작업으로 찾기
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

          <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.28)]">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase text-white/45">Official Screens</p>
                <h2 className="mt-2 text-xl font-black text-white">실제 화면이 보이는 시작 후보</h2>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-black text-white/45">공식 출처</span>
            </div>
            <div className="mt-5 grid gap-3">
              {heroMediaTools.map((tool, index) => (
                <StarterMediaCard index={index} key={tool.id} tool={tool} />
              ))}
            </div>
            <Link className="mt-5 inline-flex text-sm font-bold text-pink-100/80 hover:text-white" href="/tools">
              공식 이미지 있는 후보 더 보기 →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-10 md:px-6">
        <SectionHeader
          description="카테고리는 보조입니다. 처음 방문자는 툴 이름보다 하고 싶은 작업을 먼저 고르는 편이 덜 헷갈립니다."
          eyebrow="Browse"
          title="하고 싶은 작업으로 먼저 걸러보기"
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
            <button
              className={`rounded-full border px-3 py-2 text-xs font-bold transition ${
                activeCategory === item.id
                  ? "border-pink-300/60 bg-pink-300/10 text-white"
                  : "border-white/10 bg-white/[0.035] text-white/42 hover:border-white/25 hover:text-white/70"
              }`}
              key={item.id}
              onClick={() => setActiveCategory(item.id)}
              title={item.hint}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-10 md:px-6" id="today">
        <SectionHeader
          eyebrow="Start Here"
          title="처음이라면 이 후보부터 확인하세요"
          description="추천이라고 단정하지 않습니다. 무료로 시작하기 쉽고, 첫 결과물을 만들기 쉬운 후보를 앞에 둡니다."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(featuredTools.length ? featuredTools : filteredTools).slice(0, 6).map((tool) => (
            <SaasToolCard key={tool.id} tool={tool} />
          ))}
        </div>
        {!filteredTools.length ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-8 text-center">
            <p className="text-sm font-bold text-white/70">아직 맞는 툴이 없습니다. 다른 키워드나 카테고리로 다시 찾아보세요.</p>
          </div>
        ) : null}
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

      <section className="mx-auto w-full max-w-[1180px] px-4 py-10 md:px-6" id="new">
        <SectionHeader eyebrow="New Watchlist" title="새로 등록한 툴" description="한국 SaaS와 생산성 도구까지 확장하기 위해 새 후보를 꾸준히 쌓고 있습니다." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {newTools.map((tool) => (
            <SaasToolCard compact key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-10 md:px-6">
        <SectionHeader eyebrow="Trust Standard" title="앞으로의 정리 기준" description="이제 많은 목록보다 근거 있는 초보자 테스트 기록을 우선합니다." />
        <div className="grid gap-4 md:grid-cols-3">
          {curationRules.map(([title, description]) => (
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5" key={title}>
              <h3 className="text-base font-black text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/52">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-10 md:px-6" id="launch">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(252,175,69,0.14)_0%,rgba(253,29,108,0.13)_45%,rgba(34,211,238,0.10)_100%)] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.24)] md:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase text-orange-100/75">For Vibe-Coding Makers</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight text-white md:text-4xl">
                바이브코딩으로 만든 SaaS라면, 광고 말고 첫 사용자 관점으로 보여주세요.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/58">
                AIDailyPick은 “좋다”는 말보다 누가 쓰면 좋은지, 데모가 열리는지, 무료로 어디까지 되는지, 초보자가 어디서 막히는지를 먼저 정리합니다.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link className="rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-[#111326]" href="/submit">
                  런칭 제보하기
                </Link>
                <Link className="rounded-2xl border border-white/12 px-5 py-3 text-center text-sm font-black text-white/72 hover:border-white/30 hover:text-white" href="/affiliate">
                  소개 방식 보기
                </Link>
              </div>
            </div>
            <div className="grid gap-3">
              {makerLaunchSteps.map(([title, description], index) => (
                <article className="rounded-2xl border border-white/10 bg-[#070812]/65 p-4" key={title}>
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xs font-black text-white/55">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-base font-black text-white">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-white/52">{description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
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
            <NewsletterForm />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pb-20 pt-8 md:px-6">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["추천 남발 안 하기", "직접 테스트 전인 툴은 후보로만 표시합니다."],
            ["한계 먼저 적기", "좋은 점보다 초보자가 막히는 지점과 결제 전 확인할 점을 먼저 봅니다."],
            ["공식 정보 분리", "가격, 기능, 무료 범위는 공식 페이지 확인이 필요한 정보로 분리합니다."],
            ["제휴 표시", "제휴 링크와 스폰서 노출은 추천 근거와 섞지 않습니다."],
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
