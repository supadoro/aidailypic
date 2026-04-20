"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import { topCategoryLabels } from "@/src/data/mock-content";

type HeaderNavItem = {
  label: string;
  href: string;
  activeStartsWith: string;
};

function isActive(pathname: string, activeStartsWith: string) {
  if (activeStartsWith === "/") {
    return pathname === "/";
  }
  return pathname.startsWith(activeStartsWith);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = useMemo<HeaderNavItem[]>(() => {
    const sections = Object.entries(topCategoryLabels).map(([slug, label]) => ({
      label,
      href: `/section/${slug}`,
      activeStartsWith: `/section/${slug}`,
    }));

    return [
      { label: "Latest", href: "/", activeStartsWith: "/" },
      { label: "News", href: "/news", activeStartsWith: "/news" },
      ...sections,
      { label: "Tools", href: "/tools", activeStartsWith: "/tools" },
      { label: "Search", href: "/search?q=ai", activeStartsWith: "/search" },
      { label: "Admin", href: "/admin", activeStartsWith: "/admin" },
    ];
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link className="flex items-center gap-2 text-lg font-extrabold tracking-tight" href="/">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#5148d8] text-white">A</span>
          aidailypick.com
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {items.map((item) => {
            const active = isActive(pathname, item.activeStartsWith);
            return (
              <Link
                key={item.label}
                className={`text-xs font-bold uppercase tracking-wide transition-colors ${
                  active ? "text-[#5148d8]" : "text-slate-500 hover:text-[#5148d8]"
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <form action="/search" className="hidden md:block">
            <input
              aria-label="search"
              className="rounded-full bg-slate-100 px-4 py-2 text-sm outline-none ring-[#5148d8]/20 transition focus:ring"
              name="q"
              placeholder="Search..."
              type="search"
            />
          </form>
          <button className="rounded-md bg-[#5148d8] px-4 py-2 text-sm font-bold text-white">Subscribe</button>
          <button
            aria-expanded={mobileOpen}
            className="rounded-md border border-slate-300 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-700 md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            type="button"
          >
            Menu
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <form action="/search" className="mb-3">
            <input
              aria-label="mobile-search"
              className="w-full rounded-lg bg-slate-100 px-3 py-2 text-sm outline-none ring-[#5148d8]/20 transition focus:ring"
              name="q"
              placeholder="Search..."
              type="search"
            />
          </form>
          <div className="flex flex-col gap-2">
            {items.map((item) => {
              const active = isActive(pathname, item.activeStartsWith);
              return (
                <Link
                  className={`rounded-md px-2 py-2 text-sm font-bold uppercase tracking-wide ${
                    active ? "bg-[#eaeff2] text-[#5148d8]" : "text-slate-600"
                  }`}
                  href={item.href}
                  key={item.label}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
