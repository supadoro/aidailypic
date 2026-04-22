"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { getCustomArticleBySlugFromStorage } from "@/src/data/admin-article-storage";

export function CustomArticleFallback(props: { slug: string }) {
  const { slug } = props;
  const article = useMemo(() => getCustomArticleBySlugFromStorage(slug), [slug]);

  if (!article) {
    return (
      <article className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-900">글을 찾을 수 없습니다.</h1>
        <p className="mt-2 text-sm text-slate-600">
          관리자에서 삭제되었거나 존재하지 않는 글입니다. <Link className="font-bold text-[#5148d8]" href="/">홈으로 이동</Link>
        </p>
      </article>
    );
  }

  return (
    <article className="space-y-6 rounded-2xl bg-white p-8 shadow-sm">
      <header className="space-y-3">
        <p className="text-xs font-black uppercase tracking-widest text-[#5148d8]">
          {article.topCategory} / {article.toolCategory}
        </p>
        <h1 className="text-4xl font-extrabold leading-tight text-slate-900">{article.title}</h1>
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          {article.author} / {article.date} / {article.readMinutes} min read
        </p>
      </header>
      <Image
        alt={article.title}
        className="h-[360px] w-full rounded-xl object-cover"
        height={720}
        sizes="(min-width: 1024px) 720px, 100vw"
        src={article.image}
        width={1280}
      />
      <p className="text-base leading-8 text-slate-700">{article.excerpt}</p>
    </article>
  );
}
