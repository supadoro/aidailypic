"use client";

import { useState } from "react";

import {
  deleteContactSubmission,
  deleteToolSubmission,
  readContactSubmissions,
  readToolSubmissions,
  updateContactSubmissionStatus,
  updateToolSubmissionStatus,
  type ContactSubmission,
  type ToolSubmission,
} from "@/src/data/admin-inbox-storage";

const statusLabels: Record<ToolSubmission["status"], string> = {
  new: "새 제출",
  reviewing: "검토 중",
  done: "처리 완료",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function AdminInbox() {
  const [toolSubmissions, setToolSubmissions] = useState(() => readToolSubmissions());
  const [contactSubmissions, setContactSubmissions] = useState(() => readContactSubmissions());

  const refresh = () => {
    setToolSubmissions(readToolSubmissions());
    setContactSubmissions(readContactSubmissions());
  };

  const setToolStatus = (id: string, status: ToolSubmission["status"]) => {
    updateToolSubmissionStatus(id, status);
    refresh();
  };

  const setContactStatus = (id: string, status: ContactSubmission["status"]) => {
    updateContactSubmissionStatus(id, status);
    refresh();
  };

  const removeToolSubmission = (id: string) => {
    deleteToolSubmission(id);
    refresh();
  };

  const removeContactSubmission = (id: string) => {
    deleteContactSubmission(id);
    refresh();
  };

  return (
    <section className="space-y-8 rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.28)] md:p-7">
      <header className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-black uppercase tracking-wide text-orange-100/75">
            Inbox
          </p>
          <h2 className="mt-3 text-3xl font-black text-white">제출함 / 문의함</h2>
          <p className="mt-2 text-sm leading-6 text-white/55">툴 홍보하기와 문의 페이지에서 저장된 내용을 확인합니다.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3">
            <p className="text-2xl font-black text-white">{toolSubmissions.length}</p>
            <p className="text-xs font-bold text-white/40">툴 제안</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3">
            <p className="text-2xl font-black text-white">{contactSubmissions.length}</p>
            <p className="text-xs font-bold text-white/40">문의</p>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 text-lg font-black text-white">툴 제안</h3>
          <div className="space-y-3">
            {toolSubmissions.length ? (
              toolSubmissions.map((item) => (
                <article className="rounded-2xl border border-white/10 bg-[#070812]/70 p-4" key={item.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-white">{item.toolName}</p>
                      <p className="mt-1 text-xs text-white/40">{formatDate(item.createdAt)}</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-bold text-white/60">
                      {statusLabels[item.status]}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/60">{item.summary}</p>
                  <dl className="mt-3 grid gap-2 text-xs text-white/45">
                    <div>카테고리: {item.category}</div>
                    <div>추천 대상: {item.audience}</div>
                    <div>연락처: {item.contactEmail}</div>
                    <div>링크: {item.websiteUrl}</div>
                  </dl>
                  {item.details ? <p className="mt-3 whitespace-pre-wrap text-xs leading-5 text-white/45">{item.details}</p> : null}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold text-white/70" onClick={() => setToolStatus(item.id, "reviewing")} type="button">
                      검토 중
                    </button>
                    <button className="rounded-lg bg-emerald-300/10 px-3 py-1.5 text-xs font-bold text-emerald-100" onClick={() => setToolStatus(item.id, "done")} type="button">
                      완료
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
                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-bold text-white/60">
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
      </div>
    </section>
  );
}
