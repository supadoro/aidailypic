import type { Metadata } from "next";
import Link from "next/link";

import { SaasToolCard } from "@/src/components/saas-tool-card";
import { filterTools, popularSearches } from "@/src/data/saas-directory";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  const keyword = q?.trim() || "SaaS";

  return {
    title: `${keyword} 검색`,
    description: `${keyword} 관련 AI 자동화 툴과 한국 SaaS를 AIDailyPick에서 찾아보세요.`,
    alternates: {
      canonical: `/search?q=${encodeURIComponent(keyword)}`,
    },
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const keyword = q?.trim() || "";
  const results = filterTools("all", keyword);

  return (
    <main className="toss-clean bg-[#f8fafc] text-slate-950">
      <section className="search-finder-hero mx-auto w-full max-w-[1120px] px-4 py-12 md:px-6 md:py-16">
        <p className="text-sm font-black text-[#3182f6]">툴 검색</p>
        <h1 className="mt-3 max-w-3xl text-[2.25rem] font-black leading-tight tracking-normal text-slate-950 md:text-[3.5rem]">
          {keyword ? `"${keyword}" 결과` : "필요한 작업을 검색하세요"}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          뉴스처럼 많이 보여주기보다, 지금 해보려는 작업과 가까운 AI 툴과 SaaS를 먼저 보여줍니다.
        </p>

        <form action="/search" className="search-query-box mt-7 rounded-3xl border border-slate-100 bg-white p-3 shadow-[0_8px_24px_rgba(2,32,71,0.05)]">
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              className="min-h-14 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-[#3182f6] focus:ring-4 focus:ring-[#3182f6]/10"
              defaultValue={keyword}
              name="q"
              placeholder="예: 릴스 자동화, 상세페이지, 마케팅 SaaS"
            />
            <button className="min-h-14 rounded-2xl bg-[#3182f6] px-6 text-sm font-black text-white shadow-[0_8px_24px_rgba(49,130,246,0.22)]" type="submit">
              검색하기
            </button>
          </div>
        </form>

        <div className="mt-5 flex flex-wrap gap-2">
          {popularSearches.map((tag) => (
            <Link
              className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-500 transition hover:border-[#3182f6]/40 hover:text-[#3182f6]"
              href={`/search?q=${encodeURIComponent(tag)}`}
              key={tag}
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      <section className="search-results-panel mx-auto w-full max-w-[1120px] px-4 pb-16 md:px-6">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase text-slate-400">Results</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">{results.length}개 툴을 찾았습니다</h2>
          </div>
          <Link className="text-sm font-black text-[#3182f6]" href="/tools">
            전체 툴 보기
          </Link>
        </div>

        {results.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((tool) => (
              <SaasToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-[0_8px_24px_rgba(2,32,71,0.04)]">
            <h3 className="text-xl font-black text-slate-950">아직 맞는 툴이 없습니다</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">다른 키워드로 검색하거나, 알고 있는 툴을 직접 제안해주세요.</p>
            <Link className="mt-5 inline-flex rounded-xl bg-[#3182f6] px-5 py-3 text-sm font-black text-white" href="/submit">
              툴 제안하기
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
