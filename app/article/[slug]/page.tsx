import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AdSlot } from "@/src/components/ad-slot";
import { CommentThread } from "@/src/components/comment-thread";
import { MainLayout } from "@/src/components/main-layout";
import { PostCard } from "@/src/components/post-card";
import { SectionTitle } from "@/src/components/section-title";
import { TableOfContents } from "@/src/components/table-of-contents";
import { articleBodySections, comments, feedArticles, featuredArticle } from "@/src/data/mock-content";

function getArticleBySlug(slug: string) {
  return [featuredArticle, ...feedArticles].find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/article/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const tocItems = articleBodySections.map((section) => ({ id: section.id, label: section.heading }));
  const related = feedArticles.filter((item) => item.categorySlug === article.categorySlug && item.slug !== article.slug).slice(0, 2);

  return (
    <MainLayout>
      <article className="space-y-8 rounded-2xl bg-white p-8 shadow-sm">
        <header className="space-y-4">
          <p className="inline-flex rounded-full bg-[#eaeff2] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
            {article.category}
          </p>
          <h1 className="text-4xl font-extrabold leading-tight text-slate-900">{article.title}</h1>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {article.author} / {article.date} / {article.readMinutes} min read
          </p>
        </header>

        <AdSlot heightClassName="h-[90px]" label="Top Article Sponsor" />

        <Image
          alt={article.title}
          className="h-[360px] w-full rounded-xl object-cover"
          height={720}
          sizes="(min-width: 1024px) 720px, 100vw"
          src={article.image}
          width={1280}
        />

        <TableOfContents items={tocItems} />

        <div className="article-prose space-y-8">
          <p className="text-lg leading-8 text-slate-700">
            운영 가능한 AI 콘텐츠 시스템의 핵심은 반복 가능한 구조입니다. 도구가 바뀌어도 브리프, 생성, QA, 배포 루프를
            유지하면 품질과 속도를 동시에 확보할 수 있습니다.
          </p>

          {articleBodySections.map((section, index) => (
            <section id={section.id} key={section.id}>
              <h2 className="mb-3 text-2xl font-bold text-slate-900">{section.heading}</h2>
              <p className="leading-8 text-slate-700">{section.body}</p>
              {index === 1 ? <AdSlot heightClassName="h-40" label="Mid Content Sponsor" /> : null}
            </section>
          ))}
        </div>

        <section>
          <SectionTitle title="Continue Reading" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {(related.length ? related : feedArticles.slice(0, 2)).map((item) => (
              <PostCard article={item} key={item.slug} variant="featured" />
            ))}
          </div>
        </section>

        <AdSlot heightClassName="h-32" label="End of Article Sponsor" />
        <CommentThread comments={comments} />
      </article>
    </MainLayout>
  );
}

