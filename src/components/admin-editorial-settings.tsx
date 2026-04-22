"use client";

import { useMemo, useState } from "react";

import {
  clearEditorialConfigFromStorage,
  getDefaultEditorialConfig,
  readEditorialConfigFromStorage,
  writeEditorialConfigToStorage,
  type EditorialConfig,
} from "@/src/data/editorial-config";
import { feedArticles, featuredArticle, toolCategoryLabels, type ToolCategoryKey } from "@/src/data/mock-content";

export function AdminEditorialSettings() {
  const allArticles = useMemo(() => [featuredArticle, ...feedArticles], []);
  const defaults = useMemo(() => getDefaultEditorialConfig(), []);

  const initial = useMemo(() => readEditorialConfigFromStorage(), []);

  const [featuredSlug, setFeaturedSlug] = useState<string>(initial.featuredSlug);
  const [pickSlugs, setPickSlugs] = useState<string[]>(initial.pickSlugs.length ? initial.pickSlugs : defaults.pickSlugs);
  const [toolCategoryOrder, setToolCategoryOrder] = useState<ToolCategoryKey[]>(initial.toolCategoryOrder);
  const [hiddenToolCategories, setHiddenToolCategories] = useState<ToolCategoryKey[]>(initial.hiddenToolCategories);
  const [notice, setNotice] = useState<string>("");

  const togglePick = (slug: string) => {
    setPickSlugs((prev) => {
      if (prev.includes(slug)) return prev.filter((item) => item !== slug);
      if (prev.length >= 4) return prev;
      return [...prev, slug];
    });
  };

  const toggleToolVisibility = (slug: ToolCategoryKey) => {
    setHiddenToolCategories((prev) => (prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug]));
  };

  const moveToolCategory = (slug: ToolCategoryKey, direction: "up" | "down") => {
    setToolCategoryOrder((prev) => {
      const index = prev.indexOf(slug);
      if (index < 0) return prev;
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= prev.length) return prev;
      const copy = [...prev];
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy;
    });
  };

  const apply = () => {
    writeEditorialConfigToStorage({
      featuredSlug,
      pickSlugs: pickSlugs.length ? pickSlugs : defaults.pickSlugs,
      toolCategoryOrder,
      hiddenToolCategories,
    });
    setNotice("적용 완료: 홈/헤더/사이드바에 툴 분류 설정이 반영됩니다.");
  };

  const reset = () => {
    clearEditorialConfigFromStorage();
    setFeaturedSlug(defaults.featuredSlug);
    setPickSlugs(defaults.pickSlugs);
    setToolCategoryOrder(defaults.toolCategoryOrder);
    setHiddenToolCategories(defaults.hiddenToolCategories);
    setNotice("초기화 완료: 기본 추천/툴 분류 구성이 복원되었습니다.");
  };

  return (
    <section className="space-y-8 rounded-2xl bg-white p-8 shadow-sm">
      <header className="space-y-2">
        <p className="inline-flex rounded-full bg-[#eaeff2] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
          Editorial Admin
        </p>
        <h1 className="text-3xl font-extrabold text-slate-900">홈 편집 설정</h1>
        <p className="text-sm text-slate-600">
          Featured 카드, Editor&apos;s Picks, 툴 하위 분류 노출/순서를 직접 관리할 수 있습니다.
        </p>
      </header>

      <div className="space-y-4">
        <h2 className="text-sm font-black uppercase tracking-wide text-slate-700">Featured Hero</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {allArticles.map((article) => (
            <label
              className={`flex cursor-pointer items-start gap-3 rounded-xl p-4 transition ${
                featuredSlug === article.slug ? "bg-[#eaeff2]" : "bg-slate-50"
              }`}
              key={article.slug}
            >
              <input
                checked={featuredSlug === article.slug}
                className="mt-1 h-4 w-4 accent-[#5148d8]"
                name="featured"
                onChange={() => setFeaturedSlug(article.slug)}
                type="radio"
              />
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-[#5148d8]">{article.toolCategory}</p>
                <p className="text-sm font-bold text-slate-900">{article.title}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-black uppercase tracking-wide text-slate-700">Editor&apos;s Picks (max 4)</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {allArticles.map((article) => (
            <label
              className={`flex cursor-pointer items-start gap-3 rounded-xl p-4 transition ${
                pickSlugs.includes(article.slug) ? "bg-[#f0f4f7]" : "bg-slate-50"
              }`}
              key={`pick-${article.slug}`}
            >
              <input
                checked={pickSlugs.includes(article.slug)}
                className="mt-1 h-4 w-4 accent-[#5148d8]"
                onChange={() => togglePick(article.slug)}
                type="checkbox"
              />
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-[#5148d8]">{article.topCategory}</p>
                <p className="text-sm font-bold text-slate-900">{article.title}</p>
              </div>
            </label>
          ))}
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{pickSlugs.length}/4 selected</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-black uppercase tracking-wide text-slate-700">Tool Subcategory Visibility & Order</h2>
        <div className="space-y-2 rounded-xl bg-slate-50 p-3">
          {toolCategoryOrder.map((slug, index) => {
            const visible = !hiddenToolCategories.includes(slug);
            return (
              <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2" key={slug}>
                <div>
                  <p className="text-sm font-bold text-slate-900">{toolCategoryLabels[slug]}</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">/{slug}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="rounded bg-slate-200 px-2 py-1 text-xs font-bold text-slate-700 disabled:opacity-40"
                    disabled={index === 0}
                    onClick={() => moveToolCategory(slug, "up")}
                    type="button"
                  >
                    Up
                  </button>
                  <button
                    className="rounded bg-slate-200 px-2 py-1 text-xs font-bold text-slate-700 disabled:opacity-40"
                    disabled={index === toolCategoryOrder.length - 1}
                    onClick={() => moveToolCategory(slug, "down")}
                    type="button"
                  >
                    Down
                  </button>
                  <label className="ml-2 flex items-center gap-1 text-xs font-bold uppercase text-slate-600">
                    <input
                      checked={visible}
                      className="h-4 w-4 accent-[#5148d8]"
                      onChange={() => toggleToolVisibility(slug)}
                      type="checkbox"
                    />
                    Show
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="rounded-md bg-[#5148d8] px-4 py-2 text-sm font-bold text-white" onClick={apply} type="button">
          적용하기
        </button>
        <button className="rounded-md bg-slate-200 px-4 py-2 text-sm font-bold text-slate-700" onClick={reset} type="button">
          기본값 복원
        </button>
      </div>

      {notice ? <p className="rounded-lg bg-[#f0f4f7] px-4 py-3 text-sm font-semibold text-slate-700">{notice}</p> : null}
    </section>
  );
}
