"use client";

import { useCallback, useEffect, useState } from "react";

type HealthCheck = {
  id: string;
  label: string;
  ok: boolean;
  description: string;
};

async function readAdminHealth(): Promise<HealthCheck[] | null> {
  try {
    const response = await fetch("/api/admin-health", { cache: "no-store" });
    if (!response.ok) return null;
    const data = (await response.json()) as { ok?: boolean; checks?: HealthCheck[] };
    return data.ok && Array.isArray(data.checks) ? data.checks : null;
  } catch {
    return null;
  }
}

export function AdminHealthPanel() {
  const [checks, setChecks] = useState<HealthCheck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notice, setNotice] = useState("");

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const nextChecks = await readAdminHealth();
    if (nextChecks) {
      setChecks(nextChecks);
      setNotice("");
    } else {
      setChecks([]);
      setNotice("운영 상태를 읽을 수 없습니다. 다시 로그인했는지 확인하세요.");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void refresh();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [refresh]);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.28)] md:p-7">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-black uppercase tracking-wide text-emerald-100/75">
            Setup Health
          </p>
          <h2 className="mt-3 text-2xl font-black text-white">운영 연결 상태</h2>
          <p className="mt-2 text-sm leading-6 text-white/55">배포 후 관리자 보안과 서버 저장소 연결 여부를 확인합니다.</p>
        </div>
        <button className="rounded-xl border border-white/10 px-4 py-2 text-sm font-bold text-white/65 hover:text-white" onClick={() => void refresh()} type="button">
          다시 확인
        </button>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {checks.length ? (
          checks.map((check) => (
            <div className="rounded-2xl border border-white/10 bg-[#070812]/70 p-4" key={check.id}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-black text-white">{check.label}</h3>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-black ${
                    check.ok ? "border-emerald-200/20 bg-emerald-300/10 text-emerald-100" : "border-amber-200/20 bg-amber-300/10 text-amber-100"
                  }`}
                >
                  {check.ok ? "연결됨" : "확인 필요"}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/50">{check.description}</p>
            </div>
          ))
        ) : (
          <p className="rounded-2xl border border-white/10 bg-[#070812]/70 p-4 text-sm text-white/45">{isLoading ? "운영 상태를 확인하고 있습니다." : notice}</p>
        )}
      </div>
    </section>
  );
}
