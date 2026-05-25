"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { readToolSubmissions } from "@/src/data/admin-inbox-storage";
import { getToolSubmissionReviewReadiness } from "@/src/data/admin-review-readiness";

type LaunchTool = {
  id: string;
  createdAt: string;
  toolName: string;
  websiteUrl: string;
  category: string;
  audience: string;
  summary: string;
  details: string;
  mediaUrl: string;
  publicConsent: boolean;
};

async function readLaunchTools(): Promise<LaunchTool[]> {
  try {
    const response = await fetch("/api/launch", { cache: "no-store" });
    if (!response.ok) return [];
    const data = (await response.json()) as { ok?: boolean; tools?: LaunchTool[] };
    return data.ok && Array.isArray(data.tools) ? data.tools : [];
  } catch {
    return [];
  }
}

function readLocalLaunchTools(): LaunchTool[] {
  return readToolSubmissions()
    .filter((item) => item.status === "featured" && getToolSubmissionReviewReadiness(item).readyToFeature)
    .map((item) => ({
      id: item.id,
      createdAt: item.createdAt,
      toolName: item.toolName,
      websiteUrl: item.websiteUrl,
      category: item.category,
      audience: item.audience,
      summary: item.summary,
      details: item.details,
      mediaUrl: item.mediaUrl ?? "",
      publicConsent: Boolean(item.publicConsent),
    }));
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
  }).format(new Date(value));
}

export function LaunchBoardList() {
  const [tools, setTools] = useState<LaunchTool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    void readLaunchTools().then((items) => {
      if (!mounted) return;
      setTools(items.length ? items : readLocalLaunchTools());
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="launch-board-summary mx-auto w-full max-w-[1120px] px-4 py-8 md:px-6" id="featured-launches">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase text-slate-400">Featured Launches</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">소개 완료된 런칭 후보</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-500">
          공개 동의, 데모 링크, 가격/무료 범위, 제품 화면이 확인된 항목만 이 보드에 올라옵니다.
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_8px_24px_rgba(2,32,71,0.04)]">
          <p className="text-sm font-bold text-slate-500">런칭 보드를 불러오는 중입니다.</p>
        </div>
      ) : null}

      {!loading && !tools.length ? (
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_8px_24px_rgba(2,32,71,0.04)] md:p-8">
          <p className="text-lg font-black text-slate-950">아직 공개 소개된 런칭 후보가 없습니다.</p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
            제보는 관리자에서 먼저 검토합니다. 데모와 가격, 초보자 사용 흐름을 확인한 뒤 소개 완료 상태가 된 툴만 이곳에 표시됩니다.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["데모 링크", "가격/무료 범위", "공식 이미지"].map((item) => (
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-500" key={item}>
                {item}
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Link className="rounded-2xl bg-[#3182f6] px-5 py-3 text-center text-sm font-black text-white shadow-[0_8px_24px_rgba(49,130,246,0.22)]" href="/submit">
              첫 런칭 후보 제보하기
            </Link>
            <Link className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-black text-slate-700 hover:border-[#3182f6]/40 hover:text-[#3182f6]" href="/methodology">
              공개 기준 보기
            </Link>
          </div>
        </div>
      ) : null}

      {!loading && tools.length ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <article className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(2,32,71,0.05)]" key={tool.id}>
              {tool.mediaUrl ? (
                <div className="mb-4 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={`${tool.toolName} product screenshot`} className="h-40 w-full object-cover" loading="lazy" src={tool.mediaUrl} />
                </div>
              ) : null}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-black text-slate-950">{tool.toolName}</p>
                  <p className="mt-1 text-xs font-bold text-slate-400">{formatDate(tool.createdAt)}</p>
                </div>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-black text-emerald-700">소개 완료</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold text-slate-500">
                  {tool.publicConsent ? "공개 동의 확인" : "공개 동의 확인 필요"}
                </span>
                {tool.mediaUrl ? (
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold text-slate-500">메이커 제공 이미지</span>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{tool.summary}</p>
              <dl className="mt-4 grid gap-2 text-xs text-slate-500">
                <div>카테고리: {tool.category}</div>
                <div>대상: {tool.audience}</div>
              </dl>
              {tool.details ? <p className="mt-4 line-clamp-4 whitespace-pre-wrap text-xs leading-5 text-slate-400">{tool.details}</p> : null}
              {tool.websiteUrl ? (
                <a className="mt-5 inline-flex rounded-xl bg-[#3182f6] px-4 py-3 text-sm font-black text-white" href={tool.websiteUrl} rel="noreferrer" target="_blank">
                  공식 링크 확인
                </a>
              ) : null}
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
