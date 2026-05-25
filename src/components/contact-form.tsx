"use client";

import { useState } from "react";

import { createContactSubmission } from "@/src/data/admin-inbox-storage";
import { submitToServer } from "@/src/data/submission-api";

const initialForm = {
  name: "",
  email: "",
  topic: "운영 문의",
  message: "",
};

const topics = ["운영 문의", "툴 정보 수정", "제휴 문의", "개인정보 문의", "기타"];
const labelClass = "grid gap-2 text-sm font-bold text-slate-700";
const inputClass =
  "min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-slate-950 outline-none placeholder:text-slate-400 focus:border-[#3182f6] focus:ring-4 focus:ring-[#3182f6]/10";

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [notice, setNotice] = useState("");

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setNotice("이름, 이메일, 문의 내용을 입력해주세요.");
      return;
    }

    const payload = {
      type: "contact",
      name: form.name.trim(),
      email: form.email.trim(),
      topic: form.topic,
      message: form.message.trim(),
    };
    const serverSaved = await submitToServer(payload);

    if (!serverSaved) {
      createContactSubmission({
        name: payload.name,
        email: payload.email,
        topic: payload.topic,
        message: payload.message,
      });
    }

    setForm(initialForm);
    setNotice(serverSaved ? "문의가 서버 저장소에 접수되었습니다." : "문의가 저장됐습니다. 서버 저장소가 없어 현재 브라우저의 관리자 페이지 문의함에서 확인할 수 있습니다.");
  };

  return (
    <div className="contact-form-panel rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(2,32,71,0.04)]">
      <div className="mb-5">
        <p className="text-xs font-black uppercase text-slate-400">Contact Form</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">문의 남기기</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">보내주신 내용은 운영자가 검토할 문의함에 저장됩니다.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className={labelClass}>
          이름
          <input className={inputClass} onChange={(event) => update("name", event.target.value)} value={form.name} />
        </label>
        <label className={labelClass}>
          이메일
          <input className={inputClass} onChange={(event) => update("email", event.target.value)} type="email" value={form.email} />
        </label>
      </div>

      <label className={`mt-4 ${labelClass}`}>
        문의 유형
        <select className={inputClass} onChange={(event) => update("topic", event.target.value)} value={form.topic}>
          {topics.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </label>

      <label className={`mt-4 ${labelClass}`}>
        문의 내용
        <textarea className={`${inputClass} min-h-36 py-3`} onChange={(event) => update("message", event.target.value)} value={form.message} />
      </label>

      <button className="mt-5 rounded-xl bg-[#3182f6] px-5 py-3 text-sm font-black text-white shadow-[0_8px_24px_rgba(49,130,246,0.18)]" onClick={submit} type="button">
        문의 저장하기
      </button>

      {notice ? <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">{notice}</p> : null}
    </div>
  );
}
