"use client";

import { useState } from "react";

import { createToolSubmission } from "@/src/data/admin-inbox-storage";

const submissionTypes = ["AI 자동화 툴", "한국 SaaS", "마케팅 SaaS", "크리에이터 툴", "생산성 툴", "노코드 툴"];
const audiences = ["셀러", "크리에이터", "마케터", "1인 사업자", "운영자"];

const initialForm = {
  toolName: "",
  websiteUrl: "",
  category: "",
  audience: "",
  contactEmail: "",
  summary: "",
  details: "",
};

export function SubmitToolForm() {
  const [form, setForm] = useState(initialForm);
  const [notice, setNotice] = useState("");

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = () => {
    if (!form.toolName.trim() || !form.websiteUrl.trim() || !form.category || !form.contactEmail.trim() || !form.summary.trim()) {
      setNotice("툴 이름, 공식 링크, 카테고리, 연락 이메일, 한 줄 소개는 꼭 입력해주세요.");
      return;
    }

    createToolSubmission({
      toolName: form.toolName.trim(),
      websiteUrl: form.websiteUrl.trim(),
      category: form.category,
      audience: form.audience || "미정",
      contactEmail: form.contactEmail.trim(),
      summary: form.summary.trim(),
      details: form.details.trim(),
    });

    setForm(initialForm);
    setNotice("제출됐습니다. 현재 MVP에서는 이 브라우저의 관리자 페이지 제출함에 저장됩니다.");
  };

  return (
    <form className="rounded-3xl border border-white/10 bg-white/[0.055] p-5 md:p-7" onSubmit={(event) => event.preventDefault()}>
      <div className="mb-6">
        <p className="text-xs font-black uppercase text-orange-200/80">Tool Form</p>
        <h2 className="mt-2 text-2xl font-black text-white">툴 정보 입력</h2>
        <p className="mt-2 text-sm leading-6 text-white/50">제출 내용은 관리자 페이지의 제출함에서 확인할 수 있습니다.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-white/70">
          툴 이름
          <input className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none placeholder:text-white/30 focus:border-pink-300/60" onChange={(event) => update("toolName", event.target.value)} placeholder="예: MyAutomation" value={form.toolName} />
        </label>
        <label className="grid gap-2 text-sm font-bold text-white/70">
          공식 링크
          <input className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none placeholder:text-white/30 focus:border-pink-300/60" onChange={(event) => update("websiteUrl", event.target.value)} placeholder="https://example.com" value={form.websiteUrl} />
        </label>
        <label className="grid gap-2 text-sm font-bold text-white/70">
          카테고리
          <select className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none focus:border-pink-300/60" onChange={(event) => update("category", event.target.value)} value={form.category}>
            <option disabled value="">
              카테고리 선택
            </option>
            {submissionTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-white/70">
          추천 대상
          <select className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none focus:border-pink-300/60" onChange={(event) => update("audience", event.target.value)} value={form.audience}>
            <option disabled value="">
              가장 잘 맞는 사용자
            </option>
            {audiences.map((audience) => (
              <option key={audience}>{audience}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm font-bold text-white/70">
        연락 이메일
        <input className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none placeholder:text-white/30 focus:border-pink-300/60" onChange={(event) => update("contactEmail", event.target.value)} placeholder="name@example.com" type="email" value={form.contactEmail} />
      </label>

      <label className="mt-4 grid gap-2 text-sm font-bold text-white/70">
        한 줄 소개
        <input className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none placeholder:text-white/30 focus:border-pink-300/60" onChange={(event) => update("summary", event.target.value)} placeholder="어떤 시간을 줄여주는 툴인지 한 문장으로 적어주세요" value={form.summary} />
      </label>

      <label className="mt-4 grid gap-2 text-sm font-bold text-white/70">
        사용 사례와 제휴 정보
        <textarea className="min-h-36 rounded-xl border border-white/10 bg-[#111326] px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-pink-300/60" onChange={(event) => update("details", event.target.value)} placeholder="주요 기능, 무료체험 여부, 할인 코드, 실제 사용 사례를 적어주세요." value={form.details} />
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button className="rounded-xl bg-[linear-gradient(135deg,#FF7A18_0%,#FF2D95_45%,#8B5CF6_100%)] px-6 py-3 text-sm font-black text-white shadow-[0_14px_45px_rgba(255,45,149,0.28)]" onClick={submit} type="button">
          제출하기
        </button>
        <p className="text-xs leading-5 text-white/40">서버 저장은 다음 단계에서 Cloudflare Function/DB로 연결할 수 있습니다.</p>
      </div>

      {notice ? <p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-semibold text-white/70">{notice}</p> : null}
    </form>
  );
}
