import Link from "next/link";

import { SlideToolCard } from "@/src/components/slide-tool-card";
import { guideCurations } from "@/src/data/guide-curations";
import { allCategoryFilters, hasCompleteReviewFields, saasTools } from "@/src/data/saas-directory";

const heroStats = [
  ["검수 관점", "공식 근거와 가격 주의"],
  ["탐색 방식", "목적별 3개 후보부터"],
  ["메이커 흐름", "한국 SaaS 제보 연결"],
];

const comparisonRows = [
  ["콘텐츠 초안", "ChatGPT", "초안 속도", "출처 확인 필요"],
  ["비주얼 제작", "Canva", "템플릿과 이미지", "상업 이용 조건 확인"],
  ["리서치", "Perplexity", "출처 기반 탐색", "원문 확인 필요"],
];

export function HomeSaasShowcase() {
  const featuredTools = saasTools.filter((tool) => hasCompleteReviewFields(tool) || tool.isFeatured || tool.isTested).slice(0, 4);
  const categoryPills = allCategoryFilters.slice(0, 12);
  const guidePreview = guideCurations.slice(0, 3);

  return (
    <main className="saas-slide-home saas-curation-page">
      <section className="hero-section mx-auto w-full max-w-[1180px] px-5 py-12 md:px-6 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-black text-[#2563EB]">
              Korean SaaS Curation
            </p>
            <h1 className="font-heading max-w-4xl text-5xl font-black leading-[1.05] text-[#111827] md:text-7xl">
              AI 툴과 한국 SaaS를 슬라이드처럼 빠르게 비교하세요
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-[#4B5563]">
              목록을 길게 쌓지 않고, 이미지와 핵심 기능, 추천 대상, 가격 주의를 한 화면에서 판단할 수 있게 정리합니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="rounded-2xl bg-[#2563EB] px-5 py-3 text-sm font-black text-white shadow-[0_14px_36px_rgba(37,99,235,0.24)] hover:bg-[#1D4ED8]" href="/tools">
                툴 둘러보기
              </Link>
              <Link className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-3 text-sm font-black text-[#1F2937] hover:border-[#2563EB]/40 hover:text-[#2563EB]" href="/submit">
                내 SaaS 제보하기
              </Link>
            </div>
          </div>

          <aside className="saas-slide-panel rounded-[28px] p-5">
            <p className="text-xs font-black uppercase tracking-[0.08em] text-[#2563EB]">Today Brief</p>
            <div className="mt-4 grid gap-3">
              {heroStats.map(([label, value]) => (
                <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-4" key={label}>
                  <p className="text-xs font-bold text-[#6B7280]">{label}</p>
                  <p className="mt-1 text-base font-black text-[#111827]">{value}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="category-pills mx-auto w-full max-w-[1180px] px-5 pb-8 md:px-6">
        <div className="flex flex-wrap gap-2">
          {categoryPills.map((category) => (
            <Link className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-bold text-[#4B5563] hover:border-[#2563EB]/40 hover:text-[#2563EB]" href={`/categories/${category.id}`} key={category.id}>
              {category.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="featured-tool-cards mx-auto w-full max-w-[1180px] px-5 py-10 md:px-6">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.08em] text-[#2563EB]">Featured Tools</p>
            <h2 className="font-heading mt-2 text-4xl font-black text-[#111827]">먼저 볼 만한 툴</h2>
          </div>
          <p className="max-w-xl text-sm font-semibold leading-6 text-[#4B5563]">이미지가 들어와도 깨지지 않는 뉴트럴 카드에 기능, 대상, CTA를 나눠 배치했습니다.</p>
        </div>
        <div className="grid gap-5">
          {featuredTools.map((tool, index) => (
            <SlideToolCard key={tool.id} priority={index === 0} tool={tool} />
          ))}
        </div>
      </section>

      <section className="comparison-section mx-auto w-full max-w-[1180px] px-5 py-10 md:px-6">
        <div className="saas-slide-panel overflow-hidden rounded-[28px]">
          <div className="border-b border-[#E5E7EB] p-6 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.08em] text-[#2563EB]">Comparison Section</p>
            <h2 className="font-heading mt-2 text-4xl font-black text-[#111827]">목적별로 빠르게 비교</h2>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-[#4B5563]">처음 방문자는 툴 이름보다 해결하려는 작업 기준으로 비교해야 이탈이 줄어듭니다.</p>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {comparisonRows.map(([job, tool, strength, caution]) => (
              <div className="grid gap-3 p-5 md:grid-cols-[1fr_1fr_1fr_1fr] md:items-center md:p-6" key={job}>
                <p className="text-sm font-black text-[#111827]">{job}</p>
                <p className="text-sm font-bold text-[#2563EB]">{tool}</p>
                <p className="text-sm font-semibold text-[#4B5563]">{strength}</p>
                <p className="text-sm font-semibold text-[#6B7280]">{caution}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-[#E5E7EB] bg-[#F8FAFC] p-5">
            <Link className="text-sm font-black text-[#2563EB]" href="/compare">
              전체 비교표 보기
            </Link>
          </div>
        </div>
      </section>

      <section className="guide-preview-section mx-auto w-full max-w-[1180px] px-5 py-10 pb-20 md:px-6">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.08em] text-[#2563EB]">Guide Preview Section</p>
            <h2 className="font-heading mt-2 text-4xl font-black text-[#111827]">상황별 가이드</h2>
          </div>
          <Link className="text-sm font-black text-[#2563EB]" href="/guides">
            모든 가이드 보기
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {guidePreview.map((guide) => (
            <Link className="saas-slide-panel rounded-[24px] p-6 transition hover:-translate-y-0.5 hover:border-[#2563EB]/40" href={`/guides/${guide.slug}`} key={guide.slug}>
              <p className="text-xs font-black uppercase tracking-[0.08em] text-[#2563EB]">{guide.angle}</p>
              <h3 className="font-heading mt-4 text-2xl font-black leading-tight text-[#111827]">{guide.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#4B5563]">{guide.hook}</p>
              <p className="mt-5 text-sm font-black text-[#2563EB]">{guide.cta}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
