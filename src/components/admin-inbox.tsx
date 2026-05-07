"use client";

import { useCallback, useEffect, useState } from "react";

import {
  createToolSubmission,
  deleteContactSubmission,
  deleteNewsletterSubmission,
  deleteToolSubmission,
  readContactSubmissions,
  readNewsletterSubmissions,
  readToolSubmissions,
  updateContactSubmissionStatus,
  updateNewsletterSubmissionStatus,
  updateToolSubmissionStatus,
  type ContactSubmission,
  type NewsletterSubmission,
  type SubmissionStatus,
  type ToolSubmission,
} from "@/src/data/admin-inbox-storage";

const statusLabels: Record<SubmissionStatus, string> = {
  new: "새 제출",
  candidate: "런칭 후보",
  reviewing: "검토 중",
  done: "처리 완료",
  featured: "소개 완료",
  hold: "보류",
};

const statusTone: Record<SubmissionStatus, string> = {
  new: "border-white/10 bg-white/[0.06] text-white/60",
  candidate: "border-sky-300/25 bg-sky-300/10 text-sky-100",
  reviewing: "border-orange-300/25 bg-orange-300/10 text-orange-100",
  done: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  featured: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  hold: "border-rose-300/25 bg-rose-300/10 text-rose-100",
};

const isDevelopment = process.env.NODE_ENV === "development";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function escapeCsv(value: string | number | undefined): string {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function downloadCsv(filename: string, headers: string[], rows: Array<Array<string | number | undefined>>) {
  const csv = [headers, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

type ServerSubmission = ToolSubmission | ContactSubmission | NewsletterSubmission;

async function readServerSubmissions(): Promise<ServerSubmission[] | null> {
  try {
    const response = await fetch("/api/submissions", { cache: "no-store" });
    if (!response.ok) return null;
    const data = (await response.json()) as { ok?: boolean; submissions?: ServerSubmission[] };
    return data.ok && Array.isArray(data.submissions) ? data.submissions : null;
  } catch {
    return null;
  }
}

async function updateServerSubmissionStatus(id: string, status: SubmissionStatus): Promise<boolean> {
  try {
    const response = await fetch("/api/submissions", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function deleteServerSubmission(id: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/submissions?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch {
    return false;
  }
}

export function AdminInbox() {
  const [toolSubmissions, setToolSubmissions] = useState(() => readToolSubmissions());
  const [contactSubmissions, setContactSubmissions] = useState(() => readContactSubmissions());
  const [newsletterSubmissions, setNewsletterSubmissions] = useState(() => readNewsletterSubmissions());
  const [storageMode, setStorageMode] = useState<"server" | "local">("local");
  const [notice, setNotice] = useState("");

  const applySubmissions = (submissions: ServerSubmission[]) => {
    setToolSubmissions(submissions.filter((item): item is ToolSubmission => item.type === "tool"));
    setContactSubmissions(submissions.filter((item): item is ContactSubmission => item.type === "contact"));
    setNewsletterSubmissions(submissions.filter((item): item is NewsletterSubmission => item.type === "newsletter"));
  };

  const refreshLocal = () => {
    setToolSubmissions(readToolSubmissions());
    setContactSubmissions(readContactSubmissions());
    setNewsletterSubmissions(readNewsletterSubmissions());
  };

  const refresh = useCallback(async () => {
    const serverSubmissions = await readServerSubmissions();
    if (serverSubmissions) {
      applySubmissions(serverSubmissions);
      setStorageMode("server");
      setNotice("서버 저장소 데이터를 보고 있습니다.");
      return;
    }

    refreshLocal();
    setStorageMode("local");
    setNotice("서버 저장소를 읽을 수 없어 이 브라우저의 localStorage 데이터를 보고 있습니다.");
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void refresh();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [refresh]);

  const setToolStatus = async (id: string, status: SubmissionStatus) => {
    if (storageMode === "server" && (await updateServerSubmissionStatus(id, status))) {
      await refresh();
      return;
    }
    updateToolSubmissionStatus(id, status);
    refreshLocal();
  };

  const setContactStatus = async (id: string, status: SubmissionStatus) => {
    if (storageMode === "server" && (await updateServerSubmissionStatus(id, status))) {
      await refresh();
      return;
    }
    updateContactSubmissionStatus(id, status);
    refreshLocal();
  };

  const setNewsletterStatus = async (id: string, status: SubmissionStatus) => {
    if (storageMode === "server" && (await updateServerSubmissionStatus(id, status))) {
      await refresh();
      return;
    }
    updateNewsletterSubmissionStatus(id, status);
    refreshLocal();
  };

  const removeToolSubmission = async (id: string) => {
    if (storageMode === "server" && (await deleteServerSubmission(id))) {
      await refresh();
      return;
    }
    deleteToolSubmission(id);
    refreshLocal();
  };

  const removeContactSubmission = async (id: string) => {
    if (storageMode === "server" && (await deleteServerSubmission(id))) {
      await refresh();
      return;
    }
    deleteContactSubmission(id);
    refreshLocal();
  };

  const removeNewsletterSubmission = async (id: string) => {
    if (storageMode === "server" && (await deleteServerSubmission(id))) {
      await refresh();
      return;
    }
    deleteNewsletterSubmission(id);
    refreshLocal();
  };

  const createDevSampleLaunch = () => {
    const sample = createToolSubmission({
      toolName: `QA Launch Sample ${new Date().toLocaleTimeString("ko-KR")}`,
      websiteUrl: "https://example.com/qa-launch-sample",
      category: "노코드 툴",
      audience: "1인 사업자",
      contactEmail: "qa@example.com",
      summary: "로컬 QA에서 런칭 보드 공개 흐름을 확인하기 위한 개발용 샘플입니다.",
      details: "개발 환경에서만 생성하는 샘플입니다. 공개 동의와 이미지가 있는 소개완료 상태로 저장됩니다.",
      mediaUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      publicConsent: true,
    });
    updateToolSubmissionStatus(sample.id, "featured");
    refreshLocal();
  };

  const launchCounts = {
    candidate: toolSubmissions.filter((item) => item.status === "candidate" || item.status === "new").length,
    reviewing: toolSubmissions.filter((item) => item.status === "reviewing").length,
    featured: toolSubmissions.filter((item) => item.status === "featured" || item.status === "done").length,
    hold: toolSubmissions.filter((item) => item.status === "hold").length,
  };

  const exportTools = () => {
    downloadCsv(
      "aidailypick-tool-submissions.csv",
      ["createdAt", "status", "toolName", "websiteUrl", "category", "audience", "contactEmail", "summary", "details"],
      toolSubmissions.map((item) => [item.createdAt, item.status, item.toolName, item.websiteUrl, item.category, item.audience, item.contactEmail, item.summary, item.details])
    );
  };

  const exportContacts = () => {
    downloadCsv(
      "aidailypick-contact-submissions.csv",
      ["createdAt", "status", "name", "email", "topic", "message"],
      contactSubmissions.map((item) => [item.createdAt, item.status, item.name, item.email, item.topic, item.message])
    );
  };

  const exportNewsletters = () => {
    downloadCsv(
      "aidailypick-newsletter-submissions.csv",
      ["createdAt", "status", "email", "interest", "source"],
      newsletterSubmissions.map((item) => [item.createdAt, item.status, item.email, item.interest, item.source])
    );
  };

  return (
    <section className="space-y-8 rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.28)] md:p-7">
      {isDevelopment ? (
        <div className="fixed right-4 top-20 z-50 flex flex-wrap gap-2 rounded-2xl border border-emerald-200/25 bg-[#07140f]/95 p-2 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur">
          <button
            className="rounded-xl bg-emerald-200 px-3 py-2 text-xs font-black text-[#06120d] hover:bg-emerald-100"
            data-testid="create-dev-launch-sample"
            onClick={createDevSampleLaunch}
            type="button"
          >
            QA 샘플 생성
          </button>
          <a
            className="rounded-xl border border-emerald-200/35 px-3 py-2 text-xs font-black text-emerald-50 hover:bg-emerald-200/10"
            data-testid="open-launch-board"
            href="/launch"
            target="_blank"
            rel="noreferrer"
          >
            런칭 보드
          </a>
        </div>
      ) : null}

      <header className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-black uppercase tracking-wide text-orange-100/75">
            Inbox
          </p>
          <h2 className="mt-3 text-3xl font-black text-white">제출함 / 문의함</h2>
          <p className="mt-2 text-sm leading-6 text-white/55">바이브코딩 SaaS 제보, 문의, 뉴스레터 신청을 확인합니다.</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs font-bold text-white/55">
              {storageMode === "server" ? "서버 저장소" : "브라우저 저장소"}
            </span>
            <button className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-white/55 hover:text-white" onClick={() => void refresh()} type="button">
              새로고침
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="rounded-xl border border-white/10 px-3 py-2 text-xs font-bold text-white/60 hover:text-white disabled:opacity-35" disabled={!toolSubmissions.length} onClick={exportTools} type="button">
              툴 제안 CSV
            </button>
            <button className="rounded-xl border border-white/10 px-3 py-2 text-xs font-bold text-white/60 hover:text-white disabled:opacity-35" disabled={!contactSubmissions.length} onClick={exportContacts} type="button">
              문의 CSV
            </button>
            <button className="rounded-xl border border-white/10 px-3 py-2 text-xs font-bold text-white/60 hover:text-white disabled:opacity-35" disabled={!newsletterSubmissions.length} onClick={exportNewsletters} type="button">
              구독 CSV
            </button>
          </div>
          {notice ? <p className="mt-3 text-xs leading-5 text-white/35">{notice}</p> : null}
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3">
            <p className="text-2xl font-black text-white">{toolSubmissions.length}</p>
            <p className="text-xs font-bold text-white/40">툴 제안</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3">
            <p className="text-2xl font-black text-white">{contactSubmissions.length}</p>
            <p className="text-xs font-bold text-white/40">문의</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3">
            <p className="text-2xl font-black text-white">{newsletterSubmissions.length}</p>
            <p className="text-xs font-bold text-white/40">구독</p>
          </div>
        </div>
      </header>

      {isDevelopment ? (
        <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-emerald-100/70">Dev QA</p>
              <p className="mt-1 text-sm font-bold text-emerald-50">D1 없이 런칭 보드 공개 흐름을 확인합니다.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className="rounded-xl bg-emerald-200 px-3 py-2 text-xs font-black text-[#06120d] hover:bg-emerald-100"
                data-testid="create-dev-launch-sample-panel"
                onClick={createDevSampleLaunch}
                type="button"
              >
                샘플 공개 제보 생성
              </button>
              <a
                className="rounded-xl border border-emerald-200/35 px-3 py-2 text-xs font-black text-emerald-50 hover:bg-emerald-200/10"
                data-testid="open-launch-board-panel"
                href="/launch"
                target="_blank"
                rel="noreferrer"
              >
                런칭 보드 열기
              </a>
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid gap-2 md:grid-cols-4">
        {[
          ["런칭 후보", launchCounts.candidate],
          ["검토 중", launchCounts.reviewing],
          ["소개 완료", launchCounts.featured],
          ["보류", launchCounts.hold],
        ].map(([label, count]) => (
          <div className="rounded-2xl border border-white/10 bg-[#070812]/55 px-4 py-3" key={label}>
            <p className="text-xs font-black text-white/35">{label}</p>
            <p className="mt-1 text-2xl font-black text-white">{count}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div>
          <h3 className="mb-4 text-lg font-black text-white">툴 제안</h3>
          <div className="space-y-3">
            {toolSubmissions.length ? (
              toolSubmissions.map((item) => (
                <article className="rounded-2xl border border-white/10 bg-[#070812]/70 p-4" key={item.id}>
                  {item.status === "featured" && item.publicConsent ? (
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-2">
                      <span className="text-xs font-black text-emerald-100">런칭 보드 공개중</span>
                      <a className="text-xs font-bold text-emerald-100/75 hover:text-white" href="/launch" target="_blank" rel="noreferrer">
                        공개 페이지 확인
                      </a>
                    </div>
                  ) : null}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-white">{item.toolName}</p>
                      <p className="mt-1 text-xs text-white/40">{formatDate(item.createdAt)}</p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusTone[item.status]}`}>
                      {statusLabels[item.status]}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/60">{item.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-bold ${
                        item.publicConsent ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100" : "border-orange-300/25 bg-orange-300/10 text-orange-100"
                      }`}
                    >
                      {item.publicConsent ? "공개 동의 있음" : "공개 동의 확인 필요"}
                    </span>
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-bold ${
                        item.mediaUrl ? "border-sky-300/25 bg-sky-300/10 text-sky-100" : "border-white/10 bg-white/[0.045] text-white/42"
                      }`}
                    >
                      {item.mediaUrl ? "이미지 있음" : "이미지 없음"}
                    </span>
                  </div>
                  <dl className="mt-3 grid gap-2 text-xs text-white/45">
                    <div>카테고리: {item.category}</div>
                    <div>추천 대상: {item.audience}</div>
                    <div>연락처: {item.contactEmail}</div>
                    <div>링크: {item.websiteUrl}</div>
                  </dl>
                  {!item.publicConsent ? (
                    <p className="mt-3 rounded-xl border border-orange-300/20 bg-orange-300/10 px-3 py-2 text-xs font-bold leading-5 text-orange-100/80">
                      공개 소개 동의가 없어 소개완료로 변경할 수 없습니다. 메이커에게 공개 동의를 먼저 확인하세요.
                    </p>
                  ) : null}
                  {item.details ? <p className="mt-3 whitespace-pre-wrap text-xs leading-5 text-white/45">{item.details}</p> : null}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="rounded-lg bg-sky-300/10 px-3 py-1.5 text-xs font-bold text-sky-100" onClick={() => setToolStatus(item.id, "candidate")} type="button">
                      후보
                    </button>
                    <button className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold text-white/70" onClick={() => setToolStatus(item.id, "reviewing")} type="button">
                      검토 중
                    </button>
                    <button
                      className="rounded-lg bg-emerald-300/10 px-3 py-1.5 text-xs font-bold text-emerald-100 disabled:cursor-not-allowed disabled:opacity-35"
                      data-testid={`feature-tool-${item.id}`}
                      disabled={!item.publicConsent}
                      onClick={() => setToolStatus(item.id, "featured")}
                      title={item.publicConsent ? "런칭 보드 공개 가능" : "공개 동의가 필요합니다"}
                      type="button"
                    >
                      {item.publicConsent ? "소개완료" : "동의 필요"}
                    </button>
                    <button className="rounded-lg bg-orange-300/10 px-3 py-1.5 text-xs font-bold text-orange-100" onClick={() => setToolStatus(item.id, "hold")} type="button">
                      보류
                    </button>
                    <button className="rounded-lg bg-rose-300/10 px-3 py-1.5 text-xs font-bold text-rose-100/80" onClick={() => removeToolSubmission(item.id)} type="button">
                      삭제
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <p className="rounded-2xl border border-white/10 bg-[#070812]/70 p-4 text-sm text-white/40">아직 저장된 툴 제안이 없습니다.</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-black text-white">문의</h3>
          <div className="space-y-3">
            {contactSubmissions.length ? (
              contactSubmissions.map((item) => (
                <article className="rounded-2xl border border-white/10 bg-[#070812]/70 p-4" key={item.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-white">{item.topic}</p>
                      <p className="mt-1 text-xs text-white/40">
                        {item.name} / {item.email} / {formatDate(item.createdAt)}
                      </p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusTone[item.status]}`}>
                      {statusLabels[item.status]}
                    </span>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white/60">{item.message}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold text-white/70" onClick={() => setContactStatus(item.id, "reviewing")} type="button">
                      검토 중
                    </button>
                    <button className="rounded-lg bg-emerald-300/10 px-3 py-1.5 text-xs font-bold text-emerald-100" onClick={() => setContactStatus(item.id, "done")} type="button">
                      완료
                    </button>
                    <button className="rounded-lg bg-rose-300/10 px-3 py-1.5 text-xs font-bold text-rose-100/80" onClick={() => removeContactSubmission(item.id)} type="button">
                      삭제
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <p className="rounded-2xl border border-white/10 bg-[#070812]/70 p-4 text-sm text-white/40">아직 저장된 문의가 없습니다.</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-black text-white">뉴스레터 구독</h3>
          <div className="space-y-3">
            {newsletterSubmissions.length ? (
              newsletterSubmissions.map((item) => (
                <article className="rounded-2xl border border-white/10 bg-[#070812]/70 p-4" key={item.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-white">{item.email}</p>
                      <p className="mt-1 text-xs text-white/40">{formatDate(item.createdAt)}</p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusTone[item.status]}`}>
                      {statusLabels[item.status]}
                    </span>
                  </div>
                  <dl className="mt-3 grid gap-2 text-xs text-white/45">
                    <div>관심사: {item.interest}</div>
                    <div>유입 위치: {item.source}</div>
                  </dl>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold text-white/70" onClick={() => setNewsletterStatus(item.id, "reviewing")} type="button">
                      확인 중
                    </button>
                    <button className="rounded-lg bg-emerald-300/10 px-3 py-1.5 text-xs font-bold text-emerald-100" onClick={() => setNewsletterStatus(item.id, "done")} type="button">
                      완료
                    </button>
                    <button className="rounded-lg bg-rose-300/10 px-3 py-1.5 text-xs font-bold text-rose-100/80" onClick={() => removeNewsletterSubmission(item.id)} type="button">
                      삭제
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <p className="rounded-2xl border border-white/10 bg-[#070812]/70 p-4 text-sm text-white/40">아직 저장된 구독 신청이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
