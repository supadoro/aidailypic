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
    <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.055] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)]">
      <p className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-black uppercase tracking-wide text-pink-100/75">
        Admin Login
      </p>
      <h1 className="mt-4 text-3xl font-black text-white">관리자 로그인</h1>
      <p className="mt-2 text-sm leading-6 text-white/52">AIDailyPick 운영 화면은 관리자 계정으로만 접근할 수 있습니다.</p>

      <label className="mt-6 grid gap-2 text-sm font-bold text-white/70">
        아이디
        <input
          className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none focus:border-pink-300/60"
          onChange={(event) => setUser(event.target.value)}
          value={user}
        />
      </label>

      <label className="mt-4 grid gap-2 text-sm font-bold text-white/70">
        비밀번호
        <input
          className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none focus:border-pink-300/60"
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          value={password}
        />
      </label>

      <button className="mt-6 w-full rounded-xl bg-white px-5 py-3 text-sm font-black text-[#111326]" onClick={login} type="button">
        로그인
      </button>

      {notice ? <p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-semibold text-white/70">{notice}</p> : null}
    </div>
  );
}
