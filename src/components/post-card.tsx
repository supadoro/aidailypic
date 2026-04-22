import Image from "next/image";
import Link from "next/link";

import type { ArticleItem } from "@/src/data/content-types";

type CardVariant = "hero" | "featured" | "list";

export function PostCard(props: { article: ArticleItem; variant: CardVariant }) {
  const { article, variant } = props;

  if (variant === "hero") {
    return (
      <article className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <Link className="group block" href={`/article/${article.slug}`}>
          <div className="relative aspect-[21/9] overflow-hidden">
            <Image
              alt={article.title}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              fill
              priority
              sizes="(min-width: 1024px) 720px, 100vw"
              src={article.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="mb-3 inline-flex rounded bg-[#5148d8] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                {article.topCategory}
              </span>
              <h1 className="text-3xl font-extrabold leading-tight text-white md:text-4xl">{article.title}</h1>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "list") {
    return (
      <article className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm transition-transform hover:-translate-y-0.5 md:flex-row">
        <Link className="block md:w-44" href={`/article/${article.slug}`}>
          <Image
            alt={article.title}
            className="h-40 w-full rounded-lg object-cover md:h-28"
            height={160}
            sizes="(min-width: 768px) 176px, 100vw"
            src={article.image}
            width={320}
          />
        </Link>
        <div className="flex-1">
          <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#5148d8]">
            {article.topCategory} / {article.toolCategory}
          </p>
          <Link className="text-xl font-bold text-slate-900 hover:text-[#5148d8]" href={`/article/${article.slug}`}>
            {article.title}
          </Link>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{article.excerpt}</p>
          <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            <span>{article.author}</span>
            <span>/</span>
            <span>{article.date}</span>
            <span>/</span>
            <span>{article.readMinutes} min read</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm transition-transform hover:-translate-y-0.5">
      <Link className="group block" href={`/article/${article.slug}`}>
        <Image
          alt={article.title}
          className="h-44 w-full object-cover"
          height={280}
          sizes="(min-width: 768px) 50vw, 100vw"
          src={article.image}
          width={480}
        />
        <div className="p-5">
          <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-[#5148d8]">
            {article.topCategory} / {article.toolCategory}
          </p>
          <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-[#5148d8]">{article.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{article.excerpt}</p>
          <span className="mt-4 inline-flex text-sm font-bold text-[#5148d8] group-hover:underline">Continue Reading</span>
        </div>
      </Link>
    </article>
  );
}
