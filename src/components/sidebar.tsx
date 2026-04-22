"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { getClientArticles } from "@/src/data/admin-article-storage";
import {
  getVisibleToolCategoryOrder,
  readEditorialConfigFromStorage,
  type EditorialConfig,
} from "@/src/data/editorial-config";
import { topCategoryLabels, toolCategoryLabels } from "@/src/data/mock-content";

function SidebarAdSlot(props: { heightClassName?: string; label?: string }) {
  const { heightClassName = "h-56", label = "Advertisement" } = props;
  return (
    <section className="rounded-xl bg-[#eaeff2] p-6">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <div
        className={`flex ${heightClassName} items-center justify-center rounded-lg border border-dashed border-slate-400/40 bg-white text-xs font-semibold text-slate-500`}
      >
        SIDEBAR AD SLOT
      </div>
    </section>
  );
}

function SidebarGroup(props: { title: string; links: Array<{ title: string; href: string }> }) {
  const { title, links } = props;
  return (
    <section className="rounded-xl bg-[#f0f4f7] p-6">
      <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wide text-slate-700">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.title}>
            <Link className="text-sm font-medium text-slate-600 hover:text-[#5148d8]" href={link.href}>
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Sidebar() {
  const allArticles = useMemo(() => getClientArticles(), []);

  const [config] = useState<EditorialConfig>(() => {
    return readEditorialConfigFromStorage();
  });

  const visibleToolCategoryOrder = useMemo(() => getVisibleToolCategoryOrder(config), [config]);
  const visibleToolSet = useMemo(() => new Set(visibleToolCategoryOrder), [visibleToolCategoryOrder]);

  const popularLinks = useMemo(
    () =>
      allArticles
        .filter((article) => visibleToolSet.has(article.toolCategorySlug))
        .slice(0, 3)
        .map((article) => ({ title: article.title, href: `/article/${article.slug}` })),
    [allArticles, visibleToolSet]
  );

  const topSectionLinks = useMemo(
    () => Object.entries(topCategoryLabels).map(([slug, label]) => ({ title: label, href: `/section/${slug}` })),
    []
  );

  const toolLinks = useMemo(
    () => visibleToolCategoryOrder.map((slug) => ({ title: toolCategoryLabels[slug], href: `/tools/${slug}` })),
    [visibleToolCategoryOrder]
  );

  return (
    <aside className="space-y-6">
      <form action="/search" className="rounded-xl bg-[#f0f4f7] p-4">
        <input
          aria-label="sidebar-search"
          className="w-full rounded-lg bg-white px-4 py-3 text-sm outline-none ring-[#5148d8]/20 transition focus:ring"
          name="q"
          placeholder="Search articles..."
          type="search"
        />
      </form>

      <SidebarGroup links={popularLinks} title="Popular Posts" />
      <SidebarGroup links={topSectionLinks} title="Top Sections" />
      <SidebarGroup links={toolLinks} title="Tool Subcategories" />

      <section className="rounded-xl bg-[#f0f4f7] p-6">
        <h3 className="mb-4 text-sm font-extrabold uppercase tracking-widest text-slate-700">Trending</h3>
        <ol className="space-y-4">
          {popularLinks.map((item, idx) => (
            <li className="flex gap-3" key={item.title}>
              <span className="text-2xl font-black text-slate-300">{String(idx + 1).padStart(2, "0")}</span>
              <Link className="text-sm font-semibold text-slate-600 hover:text-[#5148d8]" href={item.href}>
                {item.title}
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-xl bg-[#eaeff2] p-6">
        <h3 className="mb-2 text-base font-extrabold text-slate-800">Weekly Intelligence Brief</h3>
        <p className="mb-3 text-sm leading-6 text-slate-600">
          One concise email with top AI stories, tools, and implementation tips.
        </p>
        <button className="w-full rounded-md bg-[#5148d8] px-4 py-2 text-sm font-bold text-white" type="button">
          Subscribe
        </button>
      </section>

      <SidebarAdSlot heightClassName="h-56" label="Sidebar Partner" />
      <SidebarAdSlot heightClassName="h-40" label="Sponsored Placement" />
    </aside>
  );
}
