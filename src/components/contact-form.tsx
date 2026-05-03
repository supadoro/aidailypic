"use client";

import { useState } from "react";

import { createContactSubmission } from "@/src/data/admin-inbox-storage";

const initialForm = {
  name: "",
  email: "",
  topic: "운영 문의",
  message: "",
};

const topics = ["운영 문의", "툴 정보 수정", "제휴 문의", "개인정보 문의", "기타"];

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [notice, setNotice] = useState("");

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setNotice("이름, 이메일, 문의 내용을 입력해주세요.");
      return;
    }

    createContactSubmission({
      name: form.name.trim(),
      email: form.email.trim(),
      topic: form.topic,
      message: form.message.trim(),
    });

    setForm(initialForm);
    setNotice("문의가 저장됐습니다. 현재 MVP에서는 이 브라우저의 관리자 페이지 문의함에서 확인할 수 있습니다.");
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#070812]/70 p-5">
      <div className="mb-5">
        <p className="text-xs font-black uppercase text-pink-200/80">Contact Form</p>
        <h2 className="mt-2 text-2xl font-black text-white">문의 남기기</h2>
        <p className="mt-2 text-sm leading-6 text-white/50">서버 저장 전 MVP 단계라 현재 브라우저 관리자 문의함에 저장됩니다.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-white/70">
          이름
          <input className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none placeholder:text-white/30 focus:border-pink-300/60" onChange={(event) => update("name", event.target.value)} value={form.name} />
        </label>
        <label className="grid gap-2 text-sm font-bold text-white/70">
          이메일
          <input className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none placeholder:text-white/30 focus:border-pink-300/60" onChange={(event) => update("email", event.target.value)} type="email" value={form.email} />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm font-bold text-white/70">
        문의 유형
        <select className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none focus:border-pink-300/60" onChange={(event) => update("topic", event.target.value)} value={form.topic}>
          {topics.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </label>

      <label className="mt-4 grid gap-2 text-sm font-bold text-white/70">
        문의 내용
        <textarea className="min-h-36 rounded-xl border border-white/10 bg-[#111326] px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-pink-300/60" onChange={(event) => update("message", event.target.value)} value={form.message} />
      </label>

      <button className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-black text-[#111326]" onClick={submit} type="button">
        문의 저장하기
      </button>

      {notice ? <p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-semibold text-white/70">{notice}</p> : null}
    </div>
  );
}
