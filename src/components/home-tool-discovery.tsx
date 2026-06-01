"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { getToolEvidenceLabel, saasTools, type SaasTool } from "@/src/data/saas-directory";

type PurposeOption = {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  href: string;
  tools: string[];
};

const purposeOptions: PurposeOption[] = [
  {
    id: "purpose-writing",
    label: "글쓰기",
    shortLabel: "블로그, 카피, 답변",
    description: "초안부터 만들고 출처를 확인하는 흐름",
    href: "/guides/marketer-content-research",
    tools: ["chatgpt", "claude", "perplexity"],
  },
  {
    id: "purpose-shortform",
    label: "쇼츠/릴스",
    shortLabel: "자막, 썸네일, 편집",
    description: "템플릿으로 첫 영상 결과물을 빠르게 확인",
    href: "/guides/creator-shortform-kit",
    tools: ["canva", "capcut", "opusclip"],
  },
  {
    id: "purpose-product-page",
    label: "상세페이지",
    shortLabel: "상품 설명, 이미지, 폼",
    description: "판매 페이지에 바로 쓰는 작은 작업부터 시작",
    href: "/guides/seller-automation-stack",
    tools: ["canva", "chatgpt", "tally"],
  },
];

const trustLabels = ["초보자 기준", "공식 근거", "광고 분리"];

function ToolRow(props: { tool: SaasTool }) {
  const { tool } = props;
  const primaryUseCase = tool.useCases?.[0] ?? tool.categoryLabel;
  const reviewLine = tool.reviewVoice ?? tool.beginnerTakeaway ?? tool.verdict ?? tool.shortDescription;

  return (
    <Link
      className="home-visual-pick-card group block overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_10px_30px_rgba(2,32,71,0.06)] transition hover:-translate-y-0.5 hover:border-[#3182f6]/30 hover:shadow-[0_16px_38px_rgba(49,130,246,0.12)]"
      href={tool.reviewUrl}
    >
      <span className="home-tool-row-media relative flex h-32 w-full items-center justify-center overflow-hidden bg-slate-50 text-sm font-black text-slate-700">
        {tool.media ? (
          <Image
            alt={tool.media.imageAlt}
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            fill
            sizes="(min-width: 1024px) 360px, 100vw"
            src={tool.media.imageUrl}
          />
        ) : (
          <span>{tool.logoText}</span>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-black text-[#3182f6] shadow-sm">
          {getToolEvidenceLabel(tool)}
        </span>
      </span>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-lg font-black text-slate-950">{tool.name}</p>
            <p className="mt-0.5 text-xs font-black text-[#3182f6]">{primaryUseCase}</p>
          </div>
          <span className="shrink-0 rounded-full bg-[#3182f6] px-3 py-1.5 text-xs font-black text-white">보기</span>
        </div>
        <p className="mt-3 line-clamp-1 text-sm font-semibold text-slate-500">{reviewLine}</p>
      </div>
    </Link>
  );
}

export function HomeToolDiscovery() {
  const [keyword, setKeyword] = useState("");
  const [selectedPurposeId, setSelectedPurposeId] = useState(purposeOptions[0].id);

  const selectedPurpose = purposeOptions.find((item) => item.id === selectedPurposeId) ?? purposeOptions[0];
  const toolBySlug = useMemo(() => new Map(saasTools.map((tool) => [tool.slug, tool])), []);
  const selectedTools = selectedPurpose.tools.slice(0, 3).map((slug) => toolBySlug.get(slug)).filter((tool): tool is SaasTool => Boolean(tool));
  const searchMatches = useMemo(() => {
    const query = keyword.trim().toLowerCase();
    if (!query) return [];

    return saasTools
      .filter((tool) =>
        [tool.name, tool.shortDescription, tool.categoryLabel, ...tool.tags, ...(tool.useCases ?? [])]
          .join(" ")
          .toLowerCase()
          .includes(query),
      )
      .slice(0, 3);
  }, [keyword]);
  const visibleTools = searchMatches.length ? searchMatches : selectedTools;

  return (
    <main className="toss-clean min-h-screen bg-[#f8fafc] text-slate-950">
      <section className="mx-auto grid w-full max-w-[1120px] gap-8 px-5 pb-8 pt-10 md:px-6 md:pb-12 md:pt-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(400px,0.78fr)] lg:items-start">
        <div className="toss-purpose-selector">
          <div className="mb-5 flex flex-wrap gap-2">
            {trustLabels.map((label) => (
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-500" key={label}>
                {label}
              </span>
            ))}
          </div>

          <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-normal text-slate-950 md:text-6xl">
            오늘 할 일 하나만 고르세요
          </h1>
          <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-slate-500 md:text-lg">
            글쓰기, 쇼츠, 상세페이지 중 하나만 누르면 써볼 만한 툴 3개만 바로 보여드릴게요.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {purposeOptions.map((item) => {
              const active = item.id === selectedPurpose.id;
              return (
                <button
                  className={`min-h-24 rounded-3xl border p-5 text-left transition ${
                    active
                      ? "border-[#3182f6] bg-white shadow-[0_14px_36px_rgba(49,130,246,0.14)]"
                      : "border-slate-100 bg-white/70 shadow-[0_8px_24px_rgba(2,32,71,0.04)] hover:border-slate-200 hover:bg-white"
                  }`}
                  key={item.id}
                  onClick={() => setSelectedPurposeId(item.id)}
                  type="button"
                >
                  <span className={`text-lg font-black ${active ? "text-[#3182f6]" : "text-slate-950"}`}>{item.label}</span>
                  <span className="mt-2 block line-clamp-1 text-sm font-bold text-slate-500">{item.shortLabel}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-3xl border border-slate-100 bg-white p-3 shadow-[0_8px_24px_rgba(2,32,71,0.04)]">
            <input
              className="h-12 w-full rounded-2xl border border-slate-100 bg-slate-50 px-4 text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#3182f6]/40 focus:bg-white"
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="찾는 작업이 있으면 짧게 검색"
              value={keyword}
            />
          </div>
        </div>

        <aside className="rounded-[28px] border border-slate-100 bg-white p-4 shadow-[0_18px_48px_rgba(2,32,71,0.07)] md:p-5">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase text-[#3182f6]">{searchMatches.length ? "Search Result" : "Start Here"}</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">오늘의 3픽</h2>
            </div>
            <Link className="rounded-full bg-slate-50 px-3 py-2 text-xs font-black text-slate-500 hover:bg-blue-50 hover:text-[#3182f6]" href={selectedPurpose.href}>
              가이드
            </Link>
          </div>

          <div className="grid gap-3">
            {visibleTools.map((tool) => (
              <ToolRow key={tool.id} tool={tool} />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <p className="line-clamp-1 text-sm font-black text-slate-950">{selectedPurpose.description}</p>
            <span className="ml-3 shrink-0 text-xs font-black text-slate-400">3개만</span>
          </div>
        </aside>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] gap-3 px-5 pb-16 md:grid-cols-3 md:px-6">
        <Link className="flex items-center justify-between rounded-3xl border border-slate-100 bg-white p-5 text-base font-black text-slate-950 shadow-[0_8px_24px_rgba(2,32,71,0.04)] hover:border-[#3182f6]/30" href="/submit">
          내 SaaS 제보하기 <span className="text-[#3182f6]">→</span>
        </Link>
        <Link className="flex items-center justify-between rounded-3xl border border-slate-100 bg-white p-5 text-base font-black text-slate-950 shadow-[0_8px_24px_rgba(2,32,71,0.04)] hover:border-[#3182f6]/30" href="/tools">
          전체 툴 보기 <span className="text-[#3182f6]">→</span>
        </Link>
        <Link className="flex items-center justify-between rounded-3xl border border-slate-100 bg-white p-5 text-base font-black text-slate-950 shadow-[0_8px_24px_rgba(2,32,71,0.04)] hover:border-[#3182f6]/30" href="/launch">
          신규 런칭 보기 <span className="text-[#3182f6]">→</span>
        </Link>
      </section>
    </main>
  );
}
