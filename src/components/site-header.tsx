"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "오늘의 픽", href: "/#today", activeStartsWith: "/" },
  { label: "툴 찾기", href: "/tools", activeStartsWith: "/tools" },
  { label: "요즘 뜨는 툴", href: "/#trending", activeStartsWith: "/trending" },
  { label: "새로 나온 툴", href: "/#new", activeStartsWith: "/new" },
  { label: "툴 홍보하기", href: "/submit", activeStartsWith: "/submit" },
  { label: "뉴스레터", href: "/#newsletter", activeStartsWith: "/newsletter" },
];

function isActive(pathname: string, activeStartsWith: string) {
  if (activeStartsWith === "/") return pathname === "/";
  return pathname.startsWith(activeStartsWith);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070812]/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link className="flex items-center gap-3" href="/">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#FCAF45_0%,#FD1D6C_45%,#833AB4_100%)] text-sm font-black text-white shadow-[0_10px_35px_rgba(253,29,108,0.28)]">
            A
          </span>
          <span className="text-base font-black text-white">AIDailyPick</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.activeStartsWith);
            return (
              <Link
                className={`text-sm font-bold transition ${active ? "text-white" : "text-white/50 hover:text-white"}`}
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link className="hidden rounded-xl border border-white/10 px-4 py-2 text-sm font-bold text-white/70 transition hover:border-pink-300/50 hover:text-white md:inline-flex" href="/admin">
            로그인
          </Link>
          <Link className="rounded-xl bg-white px-4 py-2 text-sm font-black text-[#111326]" href="/submit">
            툴 등록하기
          </Link>
          <button
            aria-expanded={mobileOpen}
            className="rounded-xl border border-white/10 px-3 py-2 text-sm font-bold text-white/75 lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            type="button"
          >
            메뉴
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav className="border-t border-white/10 bg-[#070812] px-4 py-3 lg:hidden">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-2">
            {navItems.map((item) => (
              <Link
                className="rounded-xl px-3 py-3 text-sm font-bold text-white/70 hover:bg-white/[0.06] hover:text-white"
                href={item.href}
                key={item.label}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
