import {
  feedArticles,
  featuredArticle,
  topCategoryLabels,
} from "@/src/data/mock-content";
import { toolProfiles } from "@/src/data/content-tools";
import type { ArticleItem, ToolProfile, TopCategoryKey } from "@/src/data/content-types";

const articleBySlug = new Map<string, ArticleItem>([featuredArticle, ...feedArticles].map((article) => [article.slug, article]));

export function getAllArticles(): ArticleItem[] {
  return [featuredArticle, ...feedArticles];
}

export function getTopCategoryLabel(slug: string): string {
  return topCategoryLabels[slug as TopCategoryKey] ?? slug;
}

export function getArticlesByTopCategory(slug: string): ArticleItem[] {
  return feedArticles.filter((article) => article.topCategorySlug === slug);
}

export function getArticlesByToolCategory(slug: string): ArticleItem[] {
  return feedArticles.filter((article) => article.toolCategorySlug === slug);
}

export function searchFeedArticles(keyword: string): ArticleItem[] {
  const normalizedKeyword = keyword.toLowerCase().trim();
  return feedArticles.filter(
    (item) =>
      item.title.toLowerCase().includes(normalizedKeyword) ||
      item.excerpt.toLowerCase().includes(normalizedKeyword) ||
      item.topCategory.toLowerCase().includes(normalizedKeyword) ||
      item.topCategorySlug.toLowerCase().includes(normalizedKeyword) ||
      item.toolCategory.toLowerCase().includes(normalizedKeyword) ||
      item.toolCategorySlug.toLowerCase().includes(normalizedKeyword)
  );
}

export function getToolProfileBySlug(slug: string): ToolProfile | undefined {
  return toolProfiles.find((tool) => tool.slug === slug);
}

export function getAllToolProfiles(): ToolProfile[] {
  return toolProfiles;
}

export function getArticlesBySlugs(slugs: string[]): ArticleItem[] {
  return slugs
    .map((slug) => articleBySlug.get(slug))
    .filter((article): article is ArticleItem => Boolean(article));
}

export function getArticleBySlug(slug: string): ArticleItem | undefined {
  return articleBySlug.get(slug);
}
