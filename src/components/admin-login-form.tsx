"use client";

import { useState } from "react";

export function AdminLoginForm() {
  const [user, setUser] = useState("admin");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");

  const login = async () => {
    setNotice("");
    const response = await fetch("/api/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, password }),
    });

    if (!response.ok) {
      setNotice("로그인 정보를 확인해주세요. 운영 환경에서는 ADMIN_PASSWORD 설정이 필요합니다.");
      return;
    }

    window.location.reload();
  };

  return (
    <div className="admin-login-panel mx-auto w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_8px_24px_rgba(2,32,71,0.05)]">
      <p className="inline-flex rounded-full border border-[#3182f6]/15 bg-[#3182f6]/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-[#3182f6]">
        Admin Login
      </p>
      <h1 className="mt-4 text-3xl font-black text-slate-950">관리자 로그인</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">AIDailyPick 운영 화면은 관리자 계정으로만 접근할 수 있습니다.</p>

      <label className="mt-6 grid gap-2 text-sm font-bold text-slate-700">
        아이디
        <input
          className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-slate-950 outline-none focus:border-[#3182f6] focus:ring-4 focus:ring-[#3182f6]/10"
          onChange={(event) => setUser(event.target.value)}
          value={user}
        />
      </label>

      <label className="mt-4 grid gap-2 text-sm font-bold text-slate-700">
        비밀번호
        <input
          className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-slate-950 outline-none focus:border-[#3182f6] focus:ring-4 focus:ring-[#3182f6]/10"
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          value={password}
        />
      </label>

      <button className="mt-6 w-full rounded-xl bg-[#3182f6] px-5 py-3 text-sm font-black text-white shadow-[0_8px_24px_rgba(49,130,246,0.18)]" onClick={login} type="button">
        로그인
      </button>

      {notice ? <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">{notice}</p> : null}
    </div>
  );
}
