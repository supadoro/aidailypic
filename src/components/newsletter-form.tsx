"use client";

import { useState } from "react";

import { createNewsletterSubmission } from "@/src/data/admin-inbox-storage";
import { submitToServer } from "@/src/data/submission-api";

const interestOptions = ["AI 자동화 툴", "한국 SaaS", "셀러 자동화", "크리에이터 툴", "1인 창업 툴"];

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState(interestOptions[0]);
  const [notice, setNotice] = useState("");

  const submit = async () => {
    const normalizedEmail = email.trim();
    if (!normalizedEmail || !normalizedEmail.includes("@")) {
      setNotice("받아볼 이메일 주소를 정확히 입력해주세요.");
      return;
    }

    const payload = {
      type: "newsletter",
      email: normalizedEmail,
      source: "contact-newsletter",
      interest,
    };
    const serverSaved = await submitToServer(payload);

    if (!serverSaved) {
      createNewsletterSubmission({
        email: payload.email,
        source: payload.source,
        interest: payload.interest,
      });
    }

    setEmail("");
    setNotice(serverSaved ? "구독 신청이 서버 저장소에 저장됐습니다." : "구독 신청이 저장됐습니다. 서버 저장소가 없어 현재 브라우저의 관리자 페이지 구독함에서 확인할 수 있습니다.");
  };

  return (
    <div className="newsletter-signup-panel rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(2,32,71,0.04)]">
      <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(event) => event.preventDefault()}>
        <input
          className="min-h-12 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-[#3182f6] focus:ring-4 focus:ring-[#3182f6]/10"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="이메일 주소를 입력해주세요"
          type="email"
          value={email}
        />
        <button className="min-h-12 rounded-xl bg-[#3182f6] px-5 text-sm font-black text-white shadow-[0_8px_24px_rgba(49,130,246,0.18)]" onClick={submit} type="button">
          구독하기
        </button>
      </form>
      <label className="mt-3 grid gap-2 text-sm font-bold text-slate-700">
        관심 주제
        <select
          className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none focus:border-[#3182f6] focus:ring-4 focus:ring-[#3182f6]/10"
          onChange={(event) => setInterest(event.target.value)}
          value={interest}
        >
          {interestOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <p className="mt-3 text-xs leading-5 text-slate-500">무료 구독. 실제 메일 발송은 추후 이메일 서비스 연동 후 시작됩니다.</p>
      {notice ? <p className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">{notice}</p> : null}
    </div>
  );
}
