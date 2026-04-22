import { feedArticles, featuredArticle } from "@/src/data/mock-content";
import { toolCategoryLabels, topCategoryLabels } from "@/src/data/mock-content";
import type { ArticleItem, ToolCategoryKey, TopCategoryKey } from "@/src/data/content-types";

const CUSTOM_ARTICLES_KEY = "aidailypick.custom-articles";
const DELETED_ARTICLE_SLUGS_KEY = "aidailypick.deleted-article-slugs";

const baseArticles: ArticleItem[] = [featuredArticle, ...feedArticles];
const baseSlugs = new Set(baseArticles.map((article) => article.slug));

function safeParseArray<T>(raw: string | null): T[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function readCustomArticlesFromStorage(): ArticleItem[] {
  if (typeof window === "undefined") return [];
  const items = safeParseArray<ArticleItem>(window.localStorage.getItem(CUSTOM_ARTICLES_KEY));
  return items.filter((item) => Boolean(item?.slug && item?.title));
}

export function writeCustomArticlesToStorage(articles: ArticleItem[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CUSTOM_ARTICLES_KEY, JSON.stringify(articles));
}

export function readDeletedArticleSlugsFromStorage(): string[] {
  if (typeof window === "undefined") return [];
  const slugs = safeParseArray<string>(window.localStorage.getItem(DELETED_ARTICLE_SLUGS_KEY));
  return slugs.filter((slug): slug is string => typeof slug === "string");
}

export function writeDeletedArticleSlugsToStorage(slugs: string[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DELETED_ARTICLE_SLUGS_KEY, JSON.stringify(slugs));
}

export function getClientArticles(): ArticleItem[] {
  const customArticles = readCustomArticlesFromStorage();
  const deletedSlugs = new Set(readDeletedArticleSlugsFromStorage());

  const merged = [...customArticles, ...baseArticles.filter((article) => !deletedSlugs.has(article.slug))];
  const deduped = new Map<string, ArticleItem>();
  for (const item of merged) {
    if (!deduped.has(item.slug)) {
      deduped.set(item.slug, item);
    }
  }
  return [...deduped.values()];
}

export function getCustomArticleBySlugFromStorage(slug: string): ArticleItem | undefined {
  return readCustomArticlesFromStorage().find((item) => item.slug === slug);
}

export function createCustomArticle(input: {
  title: string;
  excerpt: string;
  author: string;
  image: string;
  readMinutes: number;
  topCategorySlug: TopCategoryKey;
  toolCategorySlug: ToolCategoryKey;
}): ArticleItem {
  const now = new Date();
  const article: ArticleItem = {
    slug: `${slugify(input.title)}-${now.getTime()}`,
    title: input.title.trim(),
    excerpt: input.excerpt.trim(),
    topCategorySlug: input.topCategorySlug,
    topCategory: topCategoryLabels[input.topCategorySlug],
    toolCategorySlug: input.toolCategorySlug,
    toolCategory: toolCategoryLabels[input.toolCategorySlug],
    author: input.author.trim(),
    date: now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    readMinutes: Math.max(1, Number(input.readMinutes || 1)),
    image: input.image.trim(),
  };

  const current = readCustomArticlesFromStorage();
  writeCustomArticlesToStorage([article, ...current]);
  return article;
}

export function deleteArticleBySlug(slug: string): void {
  if (baseSlugs.has(slug)) {
    const deleted = new Set(readDeletedArticleSlugsFromStorage());
    deleted.add(slug);
    writeDeletedArticleSlugsToStorage([...deleted]);
    return;
  }

  const nextCustom = readCustomArticlesFromStorage().filter((item) => item.slug !== slug);
  writeCustomArticlesToStorage(nextCustom);
}

export function restoreBaseArticleBySlug(slug: string): void {
  const nextDeleted = readDeletedArticleSlugsFromStorage().filter((item) => item !== slug);
  writeDeletedArticleSlugsToStorage(nextDeleted);
}

export function getBaseArticles(): ArticleItem[] {
  return baseArticles;
}
