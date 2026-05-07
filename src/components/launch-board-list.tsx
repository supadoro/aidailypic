"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { readToolSubmissions } from "@/src/data/admin-inbox-storage";

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
    .filter((item) => item.status === "featured" && item.publicConsent)
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
    <section className="mx-auto w-full max-w-[1180px] px-4 py-10 md:px-6" id="featured-launches">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-xs font-black uppercase text-pink-200/80">Featured Launches</p>
          <h2 className="text-2xl font-black md:text-3xl">소개 완료된 런칭 후보</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-white/55">
          공개 동의를 받은 제보 중에서 데모, 가격, 초보자 사용 흐름을 확인한 항목만 노출합니다. 접수된 모든 툴을 자동 게시하지 않습니다.
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6">
          <p className="text-sm font-bold text-white/45">런칭 보드를 불러오는 중입니다.</p>
        </div>
      ) : null}

      {!loading && !tools.length ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 md:p-8">
          <p className="text-lg font-black text-white">아직 공개 소개된 런칭 후보가 없습니다.</p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
            제보는 관리자에서 먼저 검토합니다. 데모와 가격, 초보자 사용 흐름을 확인한 뒤 `소개 완료` 상태가 된 툴만 이곳에 표시됩니다.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["데모 링크", "가격/무료 범위", "공식 이미지"].map((item) => (
              <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs font-bold text-white/48" key={item}>
                {item}
              </span>
            ))}
          </div>
          <Link className="mt-5 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#111326]" href="/submit">
            첫 런칭 후보 제보하기
          </Link>
        </div>
      ) : null}

      {!loading && tools.length ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <article className="rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-[0_18px_70px_rgba(0,0,0,0.22)]" key={tool.id}>
              {tool.mediaUrl ? (
                <div className="mb-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0D1020]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={`${tool.toolName} product screenshot`} className="h-40 w-full object-cover" loading="lazy" src={tool.mediaUrl} />
                </div>
              ) : null}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-black text-white">{tool.toolName}</p>
                  <p className="mt-1 text-xs font-bold text-white/38">{formatDate(tool.createdAt)}</p>
                </div>
                <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-[11px] font-black text-emerald-100">소개 완료</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-[11px] font-bold text-white/45">
                  {tool.publicConsent ? "공개 동의 확인" : "공개 동의 확인 필요"}
                </span>
                {tool.mediaUrl ? (
                  <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-[11px] font-bold text-white/45">메이커 제공 이미지</span>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-6 text-white/62">{tool.summary}</p>
              <dl className="mt-4 grid gap-2 text-xs text-white/45">
                <div>카테고리: {tool.category}</div>
                <div>대상: {tool.audience}</div>
              </dl>
              {tool.details ? <p className="mt-4 line-clamp-4 whitespace-pre-wrap text-xs leading-5 text-white/38">{tool.details}</p> : null}
              {tool.websiteUrl ? (
                <a className="mt-5 inline-flex rounded-xl bg-white px-4 py-3 text-sm font-black text-[#111326]" href={tool.websiteUrl} rel="noreferrer" target="_blank">
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
