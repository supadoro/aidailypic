"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { AdSlot } from "@/src/components/ad-slot";
import { PageHeader } from "@/src/components/page-header";
import { PostCard } from "@/src/components/post-card";
import { SectionTitle } from "@/src/components/section-title";
import {
  EDITORIAL_CONFIG_KEY,
  getDefaultEditorialConfig,
  getVisibleToolCategoryOrder,
  normalizeEditorialConfig,
  type EditorialConfig,
} from "@/src/data/editorial-config";
import { feedArticles, featuredArticle, topCategoryLabels, toolCategoryLabels } from "@/src/data/mock-content";

export function HomeFeed() {
  const allArticles = useMemo(() => [featuredArticle, ...feedArticles], []);
  const articleBySlug = useMemo(() => new Map(allArticles.map((article) => [article.slug, article])), [allArticles]);

  const [config] = useState<EditorialConfig>(() => {
    if (typeof window === "undefined") return getDefaultEditorialConfig();
    const raw = window.localStorage.getItem(EDITORIAL_CONFIG_KEY);
    if (!raw) return getDefaultEditorialConfig();

    try {
      return normalizeEditorialConfig(JSON.parse(raw) as Partial<EditorialConfig>);
    } catch {
      return getDefaultEditorialConfig();
    }
  });

  const visibleToolCategoryOrder = getVisibleToolCategoryOrder(config);
  const visibleSet = new Set(visibleToolCategoryOrder);

  const activeFeaturedCandidate = articleBySlug.get(config.featuredSlug) ?? featuredArticle;
  const activeFeatured = visibleSet.has(activeFeaturedCandidate.toolCategorySlug)
    ? activeFeaturedCandidate
    : allArticles.find((article) => visibleSet.has(article.toolCategorySlug)) ?? featuredArticle;

  const selectedPicks = config.pickSlugs
    .map((slug) => articleBySlug.get(slug))
    .filter((article): article is NonNullable<typeof article> => Boolean(article))
    .filter((article) => visibleSet.has(article.toolCategorySlug));

  const filledPicks = [...selectedPicks];
  for (const candidate of feedArticles) {
    if (filledPicks.length >= 4) break;
    if (!visibleSet.has(candidate.toolCategorySlug)) continue;
    if (filledPicks.some((item) => item.slug === candidate.slug)) continue;
    filledPicks.push(candidate);
  }

  const latestFeed = feedArticles.filter((article) => visibleSet.has(article.toolCategorySlug));

  return (
    <div className="space-y-12">
      <PageHeader
        badge="Editorial Intelligence"
        description="AI News, Tool Reviews, Guides, Comparisons, Prompting 위에 Kling AI, Suno AI 같은 툴 하위 분류를 결합한 구조입니다."
        title="AI Daily Pick"
      />

      <AdSlot heightClassName="h-[90px]" label="Leaderboard" />

      <PostCard article={activeFeatured} variant="hero" />

      <section>
        <SectionTitle ctaLabel="All Tools" href="/tools" title="Editor's Picks" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filledPicks.map((article) => (
            <PostCard key={article.slug} article={article} variant="featured" />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Top Sections" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(topCategoryLabels).map(([slug, label]) => (
            <Link
              className="rounded-xl bg-white px-5 py-4 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-[#5148d8]"
              href={`/section/${slug}`}
              key={slug}
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Tool Subcategories" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {visibleToolCategoryOrder.map((slug) => (
            <Link
              className="rounded-xl bg-white px-5 py-4 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-[#5148d8]"
              href={`/tools/${slug}`}
              key={slug}
            >
              {toolCategoryLabels[slug]}
            </Link>
          ))}
        </div>
      </section>

      <AdSlot heightClassName="h-28" label="Mid Feed Sponsor" />

      <section>
        <SectionTitle ctaLabel="News Hub" href="/news" title="The Feed" />
        <div className="space-y-5">
          {latestFeed.map((article) => (
            <PostCard key={article.slug} article={article} variant="list" />
          ))}
        </div>
      </section>

      <AdSlot heightClassName="h-32" label="Sponsored Content" />
    </div>
  );
}
