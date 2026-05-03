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
    <main className="bg-[#070812] text-white">
      <section className="mx-auto w-full max-w-[1180px] px-4 py-14 md:px-6 md:py-18">
        <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-white/65">
          Search
        </p>
        <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
          {keyword ? `"${keyword}" 검색 결과` : "SaaS를 검색해보세요"}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/60">
          뉴스 글이 아니라 실제로 써볼 만한 AI 자동화 툴과 SaaS를 중심으로 보여줍니다.
        </p>

        <form action="/search" className="mt-8 rounded-2xl border border-white/10 bg-white/[0.07] p-3 backdrop-blur">
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              className="min-h-14 flex-1 rounded-xl border border-white/10 bg-[#111326] px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-pink-300/60"
              defaultValue={keyword}
              name="q"
              placeholder="예: 릴스 자동화, 상세페이지, 마케팅 SaaS"
            />
            <button className="min-h-14 rounded-xl bg-[linear-gradient(135deg,#FF7A18_0%,#FF2D95_45%,#8B5CF6_100%)] px-6 text-sm font-black text-white" type="submit">
              검색하기
            </button>
          </div>
        </form>

        <div className="mt-5 flex flex-wrap gap-2">
          {popularSearches.map((tag) => (
            <Link
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold text-white/60 transition hover:border-pink-300/50 hover:text-white"
              href={`/search?q=${encodeURIComponent(tag)}`}
              key={tag}
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pb-20 md:px-6">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-black uppercase text-pink-200/80">Results</p>
            <h2 className="text-2xl font-black md:text-3xl">{results.length}개 툴을 찾았습니다</h2>
          </div>
          <Link className="text-sm font-bold text-white/55 hover:text-white" href="/tools">
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
          <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-8 text-center">
            <h3 className="text-xl font-black text-white">아직 맞는 툴이 없습니다</h3>
            <p className="mt-2 text-sm leading-6 text-white/50">다른 키워드로 검색하거나, 알고 있는 툴을 직접 제안해주세요.</p>
            <Link className="mt-5 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-black text-[#111326]" href="/submit">
              툴 제안하기
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
