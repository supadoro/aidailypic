"use client";

import { useMemo, useState } from "react";

import {
  createCustomArticle,
  deleteArticleBySlug,
  getBaseArticles,
  getClientArticles,
  readDeletedArticleSlugsFromStorage,
  restoreBaseArticleBySlug,
} from "@/src/data/admin-article-storage";
import { toolCategoryLabels, topCategoryLabels } from "@/src/data/mock-content";
import type { ToolCategoryKey, TopCategoryKey } from "@/src/data/content-types";

type ArticleFormState = {
  title: string;
  excerpt: string;
  author: string;
  image: string;
  readMinutes: number;
  topCategorySlug: TopCategoryKey;
  toolCategorySlug: ToolCategoryKey;
};

const initialForm: ArticleFormState = {
  title: "",
  excerpt: "",
  author: "",
  image: "",
  readMinutes: 6,
  topCategorySlug: "guides",
  toolCategorySlug: "kling-ai",
};

export function AdminArticleManager() {
  const [form, setForm] = useState<ArticleFormState>(initialForm);
  const [notice, setNotice] = useState("");
  const [allArticles, setAllArticles] = useState(() => getClientArticles());
  const [deletedBaseSlugs, setDeletedBaseSlugs] = useState(() => new Set(readDeletedArticleSlugsFromStorage()));

  const baseArticles = useMemo(() => getBaseArticles(), []);

  const refresh = () => {
    setAllArticles(getClientArticles());
    setDeletedBaseSlugs(new Set(readDeletedArticleSlugsFromStorage()));
  };

  const handleCreate = () => {
    if (!form.title.trim() || !form.excerpt.trim() || !form.author.trim() || !form.image.trim()) {
      setNotice("제목/요약/작성자/이미지 URL을 모두 입력해주세요.");
      return;
    }

    createCustomArticle(form);
    setForm(initialForm);
    refresh();
    setNotice("새 글을 생성했습니다. 홈/사이드바에서 확인할 수 있어요.");
  };

  const handleDelete = (slug: string) => {
    deleteArticleBySlug(slug);
    refresh();
    setNotice("글을 삭제(또는 숨김) 처리했습니다.");
  };

  const handleRestore = (slug: string) => {
    restoreBaseArticleBySlug(slug);
    refresh();
    setNotice("기본 글을 복원했습니다.");
  };

  return (
    <section className="space-y-8 rounded-2xl bg-white p-8 shadow-sm">
      <header className="space-y-2">
        <p className="inline-flex rounded-full bg-[#eaeff2] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
          Content Admin
        </p>
        <h2 className="text-2xl font-extrabold text-slate-900">글 생성/삭제 관리</h2>
        <p className="text-sm text-slate-600">관리자에서 글을 생성하고, 기존 글을 숨김/복원할 수 있습니다.</p>
      </header>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <input
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          placeholder="제목"
          value={form.title}
        />
        <input
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          onChange={(event) => setForm((prev) => ({ ...prev, author: event.target.value }))}
          placeholder="작성자"
          value={form.author}
        />
        <textarea
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm md:col-span-2"
          onChange={(event) => setForm((prev) => ({ ...prev, excerpt: event.target.value }))}
          placeholder="요약"
          rows={3}
          value={form.excerpt}
        />
        <input
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm md:col-span-2"
          onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))}
          placeholder="이미지 URL (https://...)"
          value={form.image}
        />
        <select
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          onChange={(event) => setForm((prev) => ({ ...prev, topCategorySlug: event.target.value as TopCategoryKey }))}
          value={form.topCategorySlug}
        >
          {Object.entries(topCategoryLabels).map(([slug, label]) => (
            <option key={slug} value={slug}>
              {label}
            </option>
          ))}
        </select>
        <select
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          onChange={(event) => setForm((prev) => ({ ...prev, toolCategorySlug: event.target.value as ToolCategoryKey }))}
          value={form.toolCategorySlug}
        >
          {Object.entries(toolCategoryLabels).map(([slug, label]) => (
            <option key={slug} value={slug}>
              {label}
            </option>
          ))}
        </select>
        <input
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm md:col-span-2"
          min={1}
          onChange={(event) => setForm((prev) => ({ ...prev, readMinutes: Number(event.target.value || 1) }))}
          placeholder="읽기 시간 (분)"
          type="number"
          value={form.readMinutes}
        />
      </div>

      <div className="flex gap-3">
        <button className="rounded-md bg-[#5148d8] px-4 py-2 text-sm font-bold text-white" onClick={handleCreate} type="button">
          글 생성
        </button>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-black uppercase tracking-wide text-slate-700">현재 글 목록</h3>
        {allArticles.map((article) => (
          <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2" key={article.slug}>
            <div>
              <p className="text-sm font-bold text-slate-900">{article.title}</p>
              <p className="text-xs text-slate-500">
                {article.topCategory} / {article.toolCategory} / {article.slug}
              </p>
            </div>
            <button
              className="rounded bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700"
              onClick={() => handleDelete(article.slug)}
              type="button"
            >
              삭제
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-black uppercase tracking-wide text-slate-700">숨김 처리된 기본 글</h3>
        {baseArticles
          .filter((article) => deletedBaseSlugs.has(article.slug))
          .map((article) => (
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2" key={`deleted-${article.slug}`}>
              <div>
                <p className="text-sm font-bold text-slate-900">{article.title}</p>
                <p className="text-xs text-slate-500">{article.slug}</p>
              </div>
              <button
                className="rounded bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700"
                onClick={() => handleRestore(article.slug)}
                type="button"
              >
                복원
              </button>
            </div>
          ))}
      </div>

      {notice ? <p className="rounded-lg bg-[#f0f4f7] px-4 py-3 text-sm font-semibold text-slate-700">{notice}</p> : null}
    </section>
  );
}
