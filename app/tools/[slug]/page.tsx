import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AdSlot } from "@/src/components/ad-slot";
import { ContentSection } from "@/src/components/content-section";
import { MainLayout } from "@/src/components/main-layout";
import { PostCard } from "@/src/components/post-card";
import { getArticlesBySlugs, getToolProfileBySlug } from "@/src/data/content-queries";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolProfileBySlug(slug);
  if (!tool) return { title: "Tool Not Found" };

  return {
    title: `${tool.name} Directory`,
    description: tool.summary,
    alternates: {
      canonical: `/tools/${slug}`,
    },
  };
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolProfileBySlug(slug);
  if (!tool) notFound();

  const related = getArticlesBySlugs(tool.relatedArticleSlugs);

  return (
    <MainLayout>
      <div className="space-y-10 rounded-2xl bg-white p-8 shadow-sm">
        <header className="space-y-3">
          <p className="text-xs font-black uppercase tracking-widest text-[#5148d8]">Tool Directory</p>
          <h1 className="text-4xl font-extrabold text-slate-900">{tool.name}</h1>
          <p className="text-lg font-semibold text-slate-600">{tool.tagline}</p>
          <p className="text-sm leading-7 text-slate-600">{tool.summary}</p>
          <Link className="inline-flex text-sm font-bold text-[#5148d8] hover:underline" href={tool.website} rel="noreferrer" target="_blank">
            Official Website
          </Link>
        </header>

        <AdSlot heightClassName="h-[90px]" label="Top Banner" />

        <ContentSection title="Strengths">
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {tool.strengths.map((item) => (
              <li className="rounded-lg bg-[#f0f4f7] px-4 py-3 text-sm font-semibold text-slate-700" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </ContentSection>

        <AdSlot heightClassName="h-28" label="Mid Content Sponsor" />

        <ContentSection title="Best For">
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {tool.bestFor.map((item) => (
              <li className="rounded-lg bg-[#eaeff2] px-4 py-3 text-sm font-semibold text-slate-700" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection title="Related Articles">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {related.map((article) => (
              <PostCard article={article} key={article.slug} variant="featured" />
            ))}
          </div>
        </ContentSection>

        <AdSlot heightClassName="h-28" label="End of Directory Sponsor" />
      </div>
    </MainLayout>
  );
}
