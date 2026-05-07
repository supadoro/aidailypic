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
      source: "home-newsletter",
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
    <div className="space-y-3">
      <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(event) => event.preventDefault()}>
        <input
          className="min-h-12 flex-1 rounded-xl border border-white/10 bg-[#070812]/70 px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-pink-300/60"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="이메일 주소를 입력해주세요"
          type="email"
          value={email}
        />
        <button className="min-h-12 rounded-xl bg-white px-5 text-sm font-black text-[#111326]" onClick={submit} type="button">
          구독하기
        </button>
      </form>
      <select
        className="min-h-11 w-full rounded-xl border border-white/10 bg-[#070812]/70 px-4 text-sm font-bold text-white/70 outline-none focus:border-pink-300/60"
        onChange={(event) => setInterest(event.target.value)}
        value={interest}
      >
        {interestOptions.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <p className="text-xs leading-5 text-white/42">무료 구독. 실제 메일 발송은 추후 이메일 서비스 연동 후 시작됩니다.</p>
      {notice ? <p className="rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm font-semibold text-white/72">{notice}</p> : null}
    </div>
  );
}
