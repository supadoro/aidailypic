"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "툴 찾기", href: "/tools", activeStartsWith: "/tools" },
  { label: "비교", href: "/compare", activeStartsWith: "/compare" },
  { label: "가이드", href: "/guides", activeStartsWith: "/guides" },
  { label: "런칭보드", href: "/launch", activeStartsWith: "/launch" },
];

function isActive(pathname: string, activeStartsWith: string) {
  if (activeStartsWith === "/") return pathname === "/";
  return pathname.startsWith(activeStartsWith);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header-simple sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link className="flex items-center gap-3" href="/">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3182f6] text-sm font-black text-white shadow-[0_8px_24px_rgba(49,130,246,0.22)]">
            A
          </span>
          <span className="text-base font-black text-slate-900">AIDailyPick</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.activeStartsWith);
            return (
              <Link
                className={`text-sm font-bold transition ${active ? "text-slate-900" : "text-slate-500 hover:text-slate-900"}`}
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link className="rounded-xl bg-[#3182f6] px-4 py-2 text-sm font-black text-white shadow-[0_8px_24px_rgba(49,130,246,0.20)]" href="/submit">
            제보하기
          </Link>
          <button
            aria-expanded={mobileOpen}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            type="button"
          >
            메뉴
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-2">
            {navItems.map((item) => (
              <Link
                className="rounded-xl px-3 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                href={item.href}
                key={item.label}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link className="rounded-xl px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-50 hover:text-slate-600" href="/admin" onClick={() => setMobileOpen(false)}>
              운영자
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
