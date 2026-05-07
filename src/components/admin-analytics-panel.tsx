"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type ClickCount = {
  count: number;
};

type TopTool = ClickCount & {
  toolSlug: string;
  toolName: string;
  lastClickedAt: string;
};

type TopSource = ClickCount & {
  source: string;
};

type RecentClick = {
  toolSlug: string;
  toolName: string;
  source?: string | null;
  clickedAt: string;
  referrer?: string | null;
};

type Analytics = {
  totalClicks: number;
  clicks24h: number;
  clicks7d: number;
  topTools: TopTool[];
  topSources: TopSource[];
  recentClicks: RecentClick[];
  exportRows: RecentClick[];
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function escapeCsv(value: string | number | null | undefined): string {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function downloadCsv(filename: string, headers: string[], rows: Array<Array<string | number | null | undefined>>) {
  const csv = [headers, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

async function readAnalytics(): Promise<Analytics | null> {
  try {
    const response = await fetch("/api/admin-analytics", { cache: "no-store" });
    if (!response.ok) return null;
    const data = (await response.json()) as { ok?: boolean } & Partial<Analytics>;
    if (!data.ok) return null;
    return {
      totalClicks: data.totalClicks ?? 0,
      clicks24h: data.clicks24h ?? 0,
      clicks7d: data.clicks7d ?? 0,
      topTools: data.topTools ?? [],
      topSources: data.topSources ?? [],
      recentClicks: data.recentClicks ?? [],
      exportRows: data.exportRows ?? [],
    };
  } catch {
    return null;
  }
}

export function AdminAnalyticsPanel() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notice, setNotice] = useState("");

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const nextAnalytics = await readAnalytics();
    if (nextAnalytics) {
      setAnalytics(nextAnalytics);
      setNotice("");
    } else {
      setAnalytics(null);
      setNotice("클릭 분석 데이터를 읽을 수 없습니다. D1 바인딩과 outbound_clicks 테이블을 확인하세요.");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void refresh();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [refresh]);

  const exportClicks = () => {
    if (!analytics?.exportRows.length) return;
    downloadCsv(
      "aidailypick-outbound-clicks.csv",
      ["clickedAt", "toolSlug", "toolName", "source", "referrer"],
      analytics.exportRows.map((item) => [item.clickedAt, item.toolSlug, item.toolName, item.source ?? "unknown", item.referrer ?? ""])
    );
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.28)] md:p-7">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-black uppercase tracking-wide text-cyan-100/75">
            Click Analytics
          </p>
          <h2 className="mt-3 text-2xl font-black text-white">써보러 가기 클릭 분석</h2>
          <p className="mt-2 text-sm leading-6 text-white/55">툴 카드와 상세 페이지에서 발생한 외부 이동 클릭을 집계합니다.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-xl border border-white/10 px-4 py-2 text-sm font-bold text-white/65 hover:text-white" onClick={() => void refresh()} type="button">
            새로고침
          </button>
          <button
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-bold text-white/65 hover:text-white disabled:opacity-35"
            disabled={!analytics?.exportRows.length}
            onClick={exportClicks}
            type="button"
          >
            CSV
          </button>
        </div>
      </div>

      {analytics ? (
        <div className="mt-6 space-y-5">
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ["전체 클릭", analytics.totalClicks, "D1에 저장된 전체 외부 이동 클릭 수"],
              ["최근 7일", analytics.clicks7d, "최근 일주일 동안 발생한 클릭 수"],
              ["최근 24시간", analytics.clicks24h, "오늘 반응을 빠르게 보는 지표"],
            ].map(([label, value, description]) => (
              <div className="rounded-2xl border border-white/10 bg-[#070812]/70 p-5" key={label}>
                <p className="text-xs font-black uppercase tracking-wide text-white/35">{label}</p>
                <p className="mt-2 text-4xl font-black text-white">{value}</p>
                <p className="mt-3 text-sm leading-6 text-white/45">{description}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.15fr_1fr]">
            <div className="rounded-2xl border border-white/10 bg-[#070812]/70 p-5">
              <h3 className="text-sm font-black text-white">클릭 TOP 툴</h3>
              <div className="mt-4 space-y-3">
                {analytics.topTools.length ? (
                  analytics.topTools.map((item) => (
                    <div className="grid gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:grid-cols-[1fr_auto] sm:items-center" key={item.toolSlug}>
                      <div>
                        <Link className="text-sm font-black text-white hover:text-pink-100" href={`/tools/${item.toolSlug}`}>
                          {item.toolName}
                        </Link>
                        <p className="mt-1 text-xs text-white/35">최근 클릭: {formatDate(item.lastClickedAt)}</p>
                      </div>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black text-white/65">{item.count}회</span>
                    </div>
                  ))
                ) : (
                  <p className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white/40">아직 클릭 데이터가 없습니다.</p>
                )}
              </div>
            </div>

            <div className="grid gap-5">
              <div className="rounded-2xl border border-white/10 bg-[#070812]/70 p-5">
                <h3 className="text-sm font-black text-white">클릭 위치</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {analytics.topSources.length ? (
                    analytics.topSources.map((item) => (
                      <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-bold text-white/60" key={item.source}>
                        {item.source} · {item.count}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-white/40">유입 위치 데이터가 없습니다.</span>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#070812]/70 p-5">
                <h3 className="text-sm font-black text-white">최근 클릭</h3>
                <div className="mt-4 space-y-2">
                  {analytics.recentClicks.slice(0, 5).map((item) => (
                    <div className="text-xs leading-5 text-white/45" key={`${item.toolSlug}-${item.clickedAt}`}>
                      <span className="font-bold text-white/70">{item.toolName}</span> · {item.source ?? "unknown"} · {formatDate(item.clickedAt)}
                    </div>
                  ))}
                  {!analytics.recentClicks.length ? <p className="text-sm text-white/40">최근 클릭이 없습니다.</p> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-5 rounded-2xl border border-white/10 bg-[#070812]/70 p-4 text-sm text-white/45">
          {isLoading ? "클릭 분석 데이터를 불러오고 있습니다." : notice}
        </p>
      )}
    </section>
  );
}
