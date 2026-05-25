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
  updateToolSubmission,
  updateToolSubmissionStatus,
  type ContactSubmission,
  type NewsletterSubmission,
  type SubmissionStatus,
  type ToolSubmission,
} from "@/src/data/admin-inbox-storage";
import {
  type AdminToolSubmissionOperationQueue,
  type AdminToolSubmissionSortMode,
  filterToolSubmissionsByOperationQueue,
  getAdminToolSubmissionOperationSummary,
  getToolSubmissionEditorialDraft,
  getToolSubmissionFollowUpMailto,
  getToolSubmissionFollowUpMessage,
  getToolSubmissionOperationScore,
  getToolSubmissionReviewReadiness,
  sortToolSubmissionsForAdmin,
} from "@/src/data/admin-review-readiness";
import { createToolSubmissionEditDraft, type ToolSubmissionEditDraft, type ToolSubmissionEditInput } from "@/src/data/tool-submission-editor";
import {
  type AdminContactSubmissionQueue,
  filterContactSubmissionsForAdmin,
  getContactSubmissionOperationSummary,
} from "@/src/data/admin-contact-operations";
import {
  type AdminNewsletterSubmissionQueue,
  filterNewsletterSubmissionsForAdmin,
  getNewsletterSubmissionOperationSummary,
} from "@/src/data/admin-newsletter-operations";
import { getStoredToolSubmissionQualitySummary } from "@/src/data/tool-submission-quality";

const statusLabels: Record<SubmissionStatus, string> = {
  new: "새 제출",
  candidate: "런칭 후보",
  reviewing: "검토 중",
  done: "처리 완료",
  featured: "소개 완료",
  hold: "보류",
};

const statusTone: Record<SubmissionStatus, string> = {
  new: "border-slate-200 bg-slate-50 text-slate-500",
  candidate: "border-sky-200 bg-sky-50 text-sky-700",
  reviewing: "border-orange-200 bg-orange-50 text-orange-700",
  done: "border-emerald-200 bg-emerald-50 text-emerald-700",
  featured: "border-emerald-200 bg-emerald-50 text-emerald-700",
  hold: "border-rose-200 bg-rose-50 text-rose-700",
};

const isDevelopment = process.env.NODE_ENV === "development";

const operationGradeTone = {
  high: "border-emerald-200 bg-emerald-50 text-emerald-700",
  medium: "border-orange-200 bg-orange-50 text-orange-700",
  low: "border-rose-200 bg-rose-50 text-rose-700",
};

const submissionQualityTone = {
  strong: "border-emerald-200 bg-emerald-50 text-emerald-700",
  reviewable: "border-orange-200 bg-orange-50 text-orange-700",
  thin: "border-slate-200 bg-slate-50 text-slate-500",
};

const toolSortOptions: Array<{ mode: AdminToolSubmissionSortMode; label: string; hint: string }> = [
  { mode: "recent", label: "접수순", hint: "최근 들어온 제보부터 확인" },
  { mode: "priority", label: "점수 높은 순", hint: "바로 검토할 제보 우선" },
  { mode: "needsEvidence", label: "보완 필요 순", hint: "자료 요청이 많은 제보 우선" },
];

const operationQueueOptions: Array<{ queue: AdminToolSubmissionOperationQueue; label: string; hint: string; tone: string }> = [
  { queue: "all", label: "전체", hint: "모든 툴 제안", tone: "border-slate-200 bg-slate-50" },
  { queue: "readyToFeature", label: "공개 가능", hint: "검수 게이트를 모두 통과한 제보", tone: "border-emerald-200 bg-emerald-50" },
  { queue: "priorityReview", label: "우선 검토", hint: "점수는 높고 동의 등 마무리만 필요한 제보", tone: "border-sky-200 bg-sky-50" },
  { queue: "needsEvidence", label: "자료 보강", hint: "URL, 가격, 이미지 같은 근거가 필요한 제보", tone: "border-orange-200 bg-orange-50" },
  { queue: "holdOrRequest", label: "보류/요청", hint: "설명과 근거가 부족해 자료 요청이 먼저인 제보", tone: "border-rose-200 bg-rose-50" },
];

const contactQueueOptions: Array<{ queue: AdminContactSubmissionQueue; label: string; hint: string }> = [
  { queue: "all", label: "전체", hint: "모든 문의" },
  { queue: "open", label: "미처리", hint: "새 문의와 검토 중" },
  { queue: "partnership", label: "제휴·광고", hint: "스폰서/협업 가능성" },
  { queue: "support", label: "지원·오류", hint: "오류나 사용 문제" },
  { queue: "done", label: "완료", hint: "처리 완료" },
];

const newsletterQueueOptions: Array<{ queue: AdminNewsletterSubmissionQueue; label: string; hint: string }> = [
  { queue: "all", label: "전체", hint: "모든 구독" },
  { queue: "open", label: "미처리", hint: "새 구독과 확인 중" },
  { queue: "maker", label: "메이커", hint: "1인 창업/런칭 관심" },
  { queue: "koreanSaas", label: "한국 SaaS", hint: "국내 SaaS 관심" },
  { queue: "automation", label: "AI 자동화", hint: "자동화 툴 관심" },
  { queue: "done", label: "완료", hint: "처리 완료" },
];

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

async function updateServerToolSubmission(id: string, tool: ToolSubmissionEditInput): Promise<boolean> {
  try {
    const response = await fetch("/api/submissions", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, tool }),
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
  const [editingToolId, setEditingToolId] = useState<string | null>(null);
  const [toolDrafts, setToolDrafts] = useState<Record<string, ToolSubmissionEditDraft>>({});
  const [toolSortMode, setToolSortMode] = useState<AdminToolSubmissionSortMode>("recent");
  const [operationQueueFilter, setOperationQueueFilter] = useState<AdminToolSubmissionOperationQueue>("all");
  const [contactQueueFilter, setContactQueueFilter] = useState<AdminContactSubmissionQueue>("all");
  const [newsletterQueueFilter, setNewsletterQueueFilter] = useState<AdminNewsletterSubmissionQueue>("all");

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

  const openToolEditor = (item: ToolSubmission) => {
    setEditingToolId(item.id);
    setToolDrafts((prev) => ({
      ...prev,
      [item.id]: createToolSubmissionEditDraft(item),
    }));
  };

  const updateToolDraft = (id: string, key: keyof ToolSubmissionEditDraft, value: string | boolean) => {
    setToolDrafts((prev) => {
      const item = toolSubmissions.find((submission) => submission.id === id);
      const current = prev[id] ?? (item ? createToolSubmissionEditDraft(item) : undefined);
      if (!current) return prev;

      return {
        ...prev,
        [id]: {
          ...current,
          [key]: value,
        },
      };
    });
  };

  const saveToolDraft = async (id: string) => {
    const draft = toolDrafts[id];
    if (!draft) return;

    if (storageMode === "server" && (await updateServerToolSubmission(id, draft))) {
      setEditingToolId(null);
      await refresh();
      return;
    }

    updateToolSubmission(id, draft);
    setEditingToolId(null);
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
  const operationSummary = getAdminToolSubmissionOperationSummary(toolSubmissions);
  const filteredToolSubmissions = filterToolSubmissionsByOperationQueue(toolSubmissions, operationQueueFilter);
  const sortedToolSubmissions = sortToolSubmissionsForAdmin(filteredToolSubmissions, toolSortMode);
  const selectedQueueLabel = operationQueueOptions.find((option) => option.queue === operationQueueFilter)?.label ?? "전체";
  const contactSummary = getContactSubmissionOperationSummary(contactSubmissions);
  const filteredContactSubmissions = filterContactSubmissionsForAdmin(contactSubmissions, contactQueueFilter);
  const selectedContactQueueLabel = contactQueueOptions.find((option) => option.queue === contactQueueFilter)?.label ?? "전체";
  const newsletterSummary = getNewsletterSubmissionOperationSummary(newsletterSubmissions);
  const filteredNewsletterSubmissions = filterNewsletterSubmissionsForAdmin(newsletterSubmissions, newsletterQueueFilter);
  const selectedNewsletterQueueLabel = newsletterQueueOptions.find((option) => option.queue === newsletterQueueFilter)?.label ?? "전체";

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
    <section className="admin-inbox-panel space-y-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
      {isDevelopment ? (
        <div className="fixed right-4 top-20 z-50 flex flex-wrap gap-2 rounded-2xl border border-emerald-200/25 bg-white p-2 shadow-lg backdrop-blur">
          <button
            className="rounded-xl bg-emerald-200 px-3 py-2 text-xs font-black text-[#06120d] hover:bg-emerald-50"
            data-testid="create-dev-launch-sample"
            onClick={createDevSampleLaunch}
            type="button"
          >
            QA 샘플 생성
          </button>
          <a
            className="rounded-xl border border-emerald-200/35 px-3 py-2 text-xs font-black text-emerald-700 hover:bg-emerald-50"
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
          <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-orange-700">
            Inbox
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">제보 검수함</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">바이브코딩 SaaS 제보, 문의, 뉴스레터 신청을 확인합니다.</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-500">
              {storageMode === "server" ? "서버 저장소" : "브라우저 저장소"}
            </span>
            <button className="rounded-full border border-slate-200 px-3 py-1 text-xs font-bold text-slate-500 hover:text-slate-950" onClick={() => void refresh()} type="button">
              새로고침
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-950 disabled:opacity-35" disabled={!toolSubmissions.length} onClick={exportTools} type="button">
              툴 제안 CSV
            </button>
            <button className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-950 disabled:opacity-35" disabled={!contactSubmissions.length} onClick={exportContacts} type="button">
              문의 CSV
            </button>
            <button className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-950 disabled:opacity-35" disabled={!newsletterSubmissions.length} onClick={exportNewsletters} type="button">
              구독 CSV
            </button>
          </div>
          {notice ? <p className="mt-3 text-xs leading-5 text-slate-500">{notice}</p> : null}
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-2xl font-black text-slate-950">{toolSubmissions.length}</p>
            <p className="text-xs font-bold text-slate-500">툴 제안</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-2xl font-black text-slate-950">{contactSubmissions.length}</p>
            <p className="text-xs font-bold text-slate-500">문의</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-2xl font-black text-slate-950">{newsletterSubmissions.length}</p>
            <p className="text-xs font-bold text-slate-500">구독</p>
          </div>
        </div>
      </header>

      {isDevelopment ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Dev QA</p>
              <p className="mt-1 text-sm font-bold text-emerald-700">D1 없이 런칭 보드 공개 흐름을 확인합니다.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className="rounded-xl bg-emerald-200 px-3 py-2 text-xs font-black text-[#06120d] hover:bg-emerald-50"
                data-testid="create-dev-launch-sample-panel"
                onClick={createDevSampleLaunch}
                type="button"
              >
                샘플 공개 제보 생성
              </button>
              <a
                className="rounded-xl border border-emerald-200/35 px-3 py-2 text-xs font-black text-emerald-700 hover:bg-emerald-50"
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
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" key={label}>
            <p className="text-xs font-black text-slate-500">{label}</p>
            <p className="mt-1 text-2xl font-black text-slate-950">{count}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-2 md:grid-cols-5">
        {operationQueueOptions.map((option) => {
          const count = option.queue === "all" ? operationSummary.total : operationSummary[option.queue];
          const active = operationQueueFilter === option.queue;

          return (
            <button
              className={`admin-inbox-queue-card rounded-2xl border px-4 py-3 text-left transition ${option.tone} ${active ? "ring-2 ring-[#3182f6]/20" : "hover:border-slate-300"}`}
              key={option.queue}
              onClick={() => setOperationQueueFilter(option.queue)}
              type="button"
            >
              <p className="text-xs font-black text-slate-500">{option.label}</p>
              <p className="mt-1 text-2xl font-black text-slate-950">{count}</p>
              <p className="mt-1 text-[11px] leading-4 text-slate-500">{option.hint}</p>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-sky-700">Review Gate</p>
            <p className="mt-1 text-sm font-black text-sky-700">소개완료 전 공식 URL, 공개 동의, 초보자 설명, 추천 대상, 가격 근거, 제품 이미지를 확인합니다.</p>
            <p className="mt-2 text-xs leading-5 text-sky-700">
              제보를 바로 광고처럼 올리지 않고, 리뷰 필드(sourceNotes, beginnerScenario, notFor, pricingCaution)를 채울 수 있을 때만 런칭 보드에 공개하세요.
            </p>
          </div>
          <a className="w-fit rounded-xl border border-sky-200/25 px-3 py-2 text-xs font-black text-sky-700 hover:bg-sky-100" href="/methodology" target="_blank" rel="noreferrer">
            검수 기준 보기
          </a>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div>
          <div className="mb-4 flex flex-col gap-3">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h3 className="text-lg font-black text-slate-950">툴 제안</h3>
                <p className="mt-1 text-xs text-slate-500">
                  현재 {selectedQueueLabel} {sortedToolSubmissions.length}개 제보를 {toolSortOptions.find((option) => option.mode === toolSortMode)?.label}으로 보고 있습니다.
                </p>
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {toolSortOptions.map((option) => (
                <button
                  className={`rounded-xl border px-3 py-2 text-left text-xs transition ${
                    toolSortMode === option.mode ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-950"
                  }`}
                  key={option.mode}
                  onClick={() => setToolSortMode(option.mode)}
                  type="button"
                >
                  <span className="block font-black">{option.label}</span>
                  <span className="mt-1 block leading-4 opacity-70">{option.hint}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {sortedToolSubmissions.length ? (
              sortedToolSubmissions.map((item) => {
                const readiness = getToolSubmissionReviewReadiness(item);
                const operationScore = getToolSubmissionOperationScore(item);
                const submissionQuality = getStoredToolSubmissionQualitySummary(item);
                const followUpMessage = getToolSubmissionFollowUpMessage(item);
                const followUpMailto = getToolSubmissionFollowUpMailto(item);
                const editorialDraft = getToolSubmissionEditorialDraft(item);
                const isEditing = editingToolId === item.id;
                const draft = toolDrafts[item.id] ?? createToolSubmissionEditDraft(item);

                return (
                <article className="rounded-2xl border border-slate-200 bg-white p-4" key={item.id}>
                  {item.status === "featured" && item.publicConsent ? (
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2">
                      <span className="text-xs font-black text-emerald-700">런칭 보드 공개중</span>
                      <a className="text-xs font-bold text-emerald-700 hover:text-slate-950" href="/launch" target="_blank" rel="noreferrer">
                        공개 페이지 확인
                      </a>
                    </div>
                  ) : null}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-slate-950">{item.toolName}</p>
                      <p className="mt-1 text-xs text-slate-500">{formatDate(item.createdAt)}</p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusTone[item.status]}`}>
                      {statusLabels[item.status]}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{item.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-bold ${
                        item.publicConsent ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-orange-200 bg-orange-50 text-orange-700"
                      }`}
                    >
                      {item.publicConsent ? "공개 동의 있음" : "공개 동의 확인 필요"}
                    </span>
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-bold ${
                        item.mediaUrl ? "border-sky-200 bg-sky-50 text-sky-700" : "border-slate-200 bg-slate-50 text-slate-500"
                      }`}
                    >
                      {item.mediaUrl ? "이미지 있음" : "이미지 없음"}
                    </span>
                  </div>
                  <dl className="mt-3 grid gap-2 text-xs text-slate-500">
                    <div>카테고리: {item.category}</div>
                    <div>추천 대상: {item.audience}</div>
                    <div>연락처: {item.contactEmail}</div>
                    <div>링크: {item.websiteUrl}</div>
                  </dl>
                  <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-xs font-black uppercase tracking-wide text-cyan-700">Submission Quality</p>
                        <p className="mt-1 text-sm font-black text-slate-950">
                          제보 품질 {submissionQuality.completedCount}/{submissionQuality.totalCount}
                        </p>
                      </div>
                      <span className={`rounded-full border px-3 py-1 text-[11px] font-black ${submissionQualityTone[submissionQuality.grade]}`}>
                        {submissionQuality.grade === "strong" ? "공개 후보 수준" : submissionQuality.grade === "reviewable" ? "검토 가능" : "자료 보강 필요"}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{submissionQuality.headline}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {submissionQuality.checks.map((check) => (
                        <span
                          className={`rounded-full border px-3 py-1 text-[11px] font-bold ${
                            check.ok ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-slate-50 text-slate-500"
                          }`}
                          key={check.id}
                          title={check.hint}
                        >
                          {check.ok ? "확인 " : "필요 "}
                          {check.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-xs font-black uppercase tracking-wide text-orange-700">Operation Score</p>
                        <p className="mt-1 text-sm font-black text-slate-950">
                          운영 점수 {operationScore.totalScore}/{operationScore.maxScore}
                        </p>
                      </div>
                      <span className={`rounded-full border px-3 py-1 text-[11px] font-black ${operationGradeTone[operationScore.grade]}`}>
                        {operationScore.recommendedAction}
                      </span>
                    </div>
                    <div className="mt-3 grid gap-2">
                      {operationScore.dimensions.map((dimension) => (
                        <div className="rounded-xl border border-slate-200 bg-white px-3 py-2" key={dimension.id}>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <p className="text-xs font-black text-slate-500">
                                {dimension.label} {dimension.score}/{dimension.maxScore}
                              </p>
                              <p className="mt-1 text-[11px] leading-4 text-slate-500">{dimension.description}</p>
                            </div>
                            <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-black text-slate-500">
                              {Math.round((dimension.score / dimension.maxScore) * 100)}%
                            </span>
                          </div>
                          {dimension.missing.length ? (
                            <p className="mt-2 text-[11px] leading-4 text-orange-700">보강: {dimension.missing.join(", ")}</p>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 border-t border-slate-200 pt-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-black text-slate-500">검수 준비도 {readiness.completedCount}/{readiness.totalCount}</p>
                      <span
                        className={`rounded-full border px-3 py-1 text-[11px] font-black ${
                          readiness.readyToFeature ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-orange-200 bg-orange-50 text-orange-700"
                        }`}
                      >
                        {readiness.readyToFeature ? "공개 가능" : "보완 필요"}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {readiness.checks.map((check) => (
                        <span
                          className={`rounded-full border px-3 py-1 text-[11px] font-bold ${
                            check.ok ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-slate-50 text-slate-500"
                          }`}
                          key={check.id}
                          title={check.hint}
                        >
                          {check.ok ? "확인 " : "필요 "}
                          {check.label}
                        </span>
                      ))}
                    </div>
                    {!readiness.readyToFeature ? (
                      <p className="mt-3 text-xs leading-5 text-slate-500">부족한 항목을 확인한 뒤 검토 중 또는 보류로 관리하세요. 소개완료는 모든 검수 항목이 채워진 제보만 가능합니다.</p>
                    ) : null}
                    <details className="mt-3">
                      <summary className="cursor-pointer text-xs font-black text-sky-700 hover:text-slate-950">정적 리뷰 필드 초안</summary>
                      <pre className="mt-2 max-h-52 overflow-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-3 text-[11px] leading-5 text-slate-500">{editorialDraft}</pre>
                    </details>
                    <details className="mt-3">
                      <summary className="cursor-pointer text-xs font-black text-orange-700 hover:text-slate-950">메이커 자료 요청문</summary>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <a
                          className={`rounded-lg px-3 py-1.5 text-xs font-black ${
                            item.contactEmail.trim() ? "bg-orange-50 text-orange-700 hover:bg-orange-100" : "pointer-events-none bg-slate-100 text-slate-500"
                          }`}
                          href={followUpMailto}
                        >
                          메일 초안 열기
                        </a>
                        <span className="text-[11px] font-bold text-slate-500">연락처: {item.contactEmail || "미입력"}</span>
                      </div>
                      <pre className="mt-2 max-h-56 overflow-auto whitespace-pre-wrap rounded-xl border border-orange-200 bg-orange-50 p-3 text-[11px] leading-5 text-orange-700">{followUpMessage}</pre>
                    </details>
                  </div>
                  {!item.publicConsent ? (
                    <p className="mt-3 rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-bold leading-5 text-orange-700">
                      공개 소개 동의가 없어 소개완료로 변경할 수 없습니다. 메이커에게 공개 동의를 먼저 확인하세요.
                    </p>
                  ) : null}
                  {item.details ? <p className="mt-3 whitespace-pre-wrap text-xs leading-5 text-slate-500">{item.details}</p> : null}
                  {isEditing ? (
                    <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs font-black uppercase tracking-wide text-blue-700">Edit Submission</p>
                        <button className="text-xs font-bold text-slate-500 hover:text-slate-950" onClick={() => setEditingToolId(null)} type="button">
                          닫기
                        </button>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        <label className="grid gap-1 text-xs font-bold text-slate-500">
                          툴 이름
                          <input className="min-h-10 rounded-xl border border-slate-200 bg-white px-3 text-slate-950 outline-none focus:border-[#3182f6]" onChange={(event) => updateToolDraft(item.id, "toolName", event.target.value)} value={draft.toolName} />
                        </label>
                        <label className="grid gap-1 text-xs font-bold text-slate-500">
                          공식/데모 링크
                          <input className="min-h-10 rounded-xl border border-slate-200 bg-white px-3 text-slate-950 outline-none focus:border-[#3182f6]" onChange={(event) => updateToolDraft(item.id, "websiteUrl", event.target.value)} value={draft.websiteUrl} />
                        </label>
                        <label className="grid gap-1 text-xs font-bold text-slate-500">
                          카테고리
                          <input className="min-h-10 rounded-xl border border-slate-200 bg-white px-3 text-slate-950 outline-none focus:border-[#3182f6]" onChange={(event) => updateToolDraft(item.id, "category", event.target.value)} value={draft.category} />
                        </label>
                        <label className="grid gap-1 text-xs font-bold text-slate-500">
                          추천 대상
                          <input className="min-h-10 rounded-xl border border-slate-200 bg-white px-3 text-slate-950 outline-none focus:border-[#3182f6]" onChange={(event) => updateToolDraft(item.id, "audience", event.target.value)} value={draft.audience} />
                        </label>
                        <label className="grid gap-1 text-xs font-bold text-slate-500">
                          연락 이메일
                          <input className="min-h-10 rounded-xl border border-slate-200 bg-white px-3 text-slate-950 outline-none focus:border-[#3182f6]" onChange={(event) => updateToolDraft(item.id, "contactEmail", event.target.value)} value={draft.contactEmail} />
                        </label>
                        <label className="grid gap-1 text-xs font-bold text-slate-500">
                          이미지/GIF URL
                          <input className="min-h-10 rounded-xl border border-slate-200 bg-white px-3 text-slate-950 outline-none focus:border-[#3182f6]" onChange={(event) => updateToolDraft(item.id, "mediaUrl", event.target.value)} value={draft.mediaUrl ?? ""} />
                        </label>
                      </div>
                      <label className="mt-3 grid gap-1 text-xs font-bold text-slate-500">
                        한 줄 소개
                        <input className="min-h-10 rounded-xl border border-slate-200 bg-white px-3 text-slate-950 outline-none focus:border-[#3182f6]" onChange={(event) => updateToolDraft(item.id, "summary", event.target.value)} value={draft.summary} />
                      </label>
                      <label className="mt-3 grid gap-1 text-xs font-bold text-slate-500">
                        가격/검수 메모
                        <textarea className="min-h-32 rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-950 outline-none focus:border-[#3182f6]" onChange={(event) => updateToolDraft(item.id, "details", event.target.value)} value={draft.details} />
                      </label>
                      <label className="mt-3 flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-3 text-xs font-bold text-slate-500">
                        <input checked={draft.publicConsent} className="mt-0.5 h-4 w-4 accent-[#3182f6]" onChange={(event) => updateToolDraft(item.id, "publicConsent", event.target.checked)} type="checkbox" />
                        런칭 보드 공개 및 제출 이미지 사용 동의 확인
                      </label>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-700" onClick={() => void saveToolDraft(item.id)} type="button">
                          수정 저장
                        </button>
                        <button className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-950" onClick={() => setEditingToolId(null)} type="button">
                          취소
                        </button>
                      </div>
                    </div>
                  ) : null}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700" onClick={() => openToolEditor(item)} type="button">
                      정보 수정
                    </button>
                    <button className="rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-700" onClick={() => setToolStatus(item.id, "candidate")} type="button">
                      후보
                    </button>
                    <button className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500" onClick={() => setToolStatus(item.id, "reviewing")} type="button">
                      검토 중
                    </button>
                    <button
                      className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 disabled:cursor-not-allowed disabled:opacity-35"
                      data-testid={`feature-tool-${item.id}`}
                      disabled={!readiness.readyToFeature}
                      onClick={() => setToolStatus(item.id, "featured")}
                      title={readiness.readyToFeature ? "런칭 보드 공개 가능" : "검수 항목을 모두 채워야 합니다"}
                      type="button"
                    >
                      {readiness.readyToFeature ? "소개완료" : "검수 필요"}
                    </button>
                    <button className="rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700" onClick={() => setToolStatus(item.id, "hold")} type="button">
                      보류
                    </button>
                    <button className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700" onClick={() => removeToolSubmission(item.id)} type="button">
                      삭제
                    </button>
                  </div>
                </article>
                );
              })
            ) : (
              <p className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500">아직 저장된 툴 제안이 없습니다.</p>
            )}
          </div>
        </div>

        <div>
          <div className="mb-4 flex flex-col gap-3">
            <div>
              <h3 className="text-lg font-black text-slate-950">문의</h3>
              <p className="mt-1 text-xs text-slate-500">
                현재 {selectedContactQueueLabel} {filteredContactSubmissions.length}개 문의를 보고 있습니다.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
              {contactQueueOptions.map((option) => {
                const count = option.queue === "all" ? contactSummary.total : contactSummary[option.queue];
                const active = contactQueueFilter === option.queue;

                return (
                  <button
                    className={`rounded-xl border px-3 py-2 text-left text-xs transition ${
                      active ? "border-cyan-200 bg-cyan-50 text-cyan-700" : "border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-950"
                    }`}
                    key={option.queue}
                    onClick={() => setContactQueueFilter(option.queue)}
                    type="button"
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-black">{option.label}</span>
                      <span className="rounded-full border border-slate-200 px-2 py-0.5 text-[11px] font-black text-slate-500">{count}</span>
                    </span>
                    <span className="mt-1 block leading-4 opacity-70">{option.hint}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="space-y-3">
            {filteredContactSubmissions.length ? (
              filteredContactSubmissions.map((item) => (
                <article className="rounded-2xl border border-slate-200 bg-white p-4" key={item.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-slate-950">{item.topic}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.name} / {item.email} / {formatDate(item.createdAt)}
                      </p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusTone[item.status]}`}>
                      {statusLabels[item.status]}
                    </span>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-500">{item.message}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500" onClick={() => setContactStatus(item.id, "reviewing")} type="button">
                      검토 중
                    </button>
                    <button className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700" onClick={() => setContactStatus(item.id, "done")} type="button">
                      완료
                    </button>
                    <button className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700" onClick={() => removeContactSubmission(item.id)} type="button">
                      삭제
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <p className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500">현재 필터에 맞는 문의가 없습니다.</p>
            )}
          </div>
        </div>

        <div>
          <div className="mb-4 flex flex-col gap-3">
            <div>
              <h3 className="text-lg font-black text-slate-950">뉴스레터 구독</h3>
              <p className="mt-1 text-xs text-slate-500">
                현재 {selectedNewsletterQueueLabel} {filteredNewsletterSubmissions.length}개 구독 신청을 보고 있습니다.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
              {newsletterQueueOptions.map((option) => {
                const count = option.queue === "all" ? newsletterSummary.total : newsletterSummary[option.queue];
                const active = newsletterQueueFilter === option.queue;

                return (
                  <button
                    className={`rounded-xl border px-3 py-2 text-left text-xs transition ${
                      active ? "border-violet-200 bg-violet-50 text-violet-700" : "border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-950"
                    }`}
                    key={option.queue}
                    onClick={() => setNewsletterQueueFilter(option.queue)}
                    type="button"
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-black">{option.label}</span>
                      <span className="rounded-full border border-slate-200 px-2 py-0.5 text-[11px] font-black text-slate-500">{count}</span>
                    </span>
                    <span className="mt-1 block leading-4 opacity-70">{option.hint}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="space-y-3">
            {filteredNewsletterSubmissions.length ? (
              filteredNewsletterSubmissions.map((item) => (
                <article className="rounded-2xl border border-slate-200 bg-white p-4" key={item.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-slate-950">{item.email}</p>
                      <p className="mt-1 text-xs text-slate-500">{formatDate(item.createdAt)}</p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusTone[item.status]}`}>
                      {statusLabels[item.status]}
                    </span>
                  </div>
                  <dl className="mt-3 grid gap-2 text-xs text-slate-500">
                    <div>관심사: {item.interest}</div>
                    <div>유입 위치: {item.source}</div>
                  </dl>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500" onClick={() => setNewsletterStatus(item.id, "reviewing")} type="button">
                      확인 중
                    </button>
                    <button className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700" onClick={() => setNewsletterStatus(item.id, "done")} type="button">
                      완료
                    </button>
                    <button className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700" onClick={() => removeNewsletterSubmission(item.id)} type="button">
                      삭제
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <p className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500">현재 필터에 맞는 구독 신청이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
