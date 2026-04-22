export type TopCategoryKey = "ai-news" | "tool-reviews" | "guides" | "comparisons" | "prompting";
export type ToolCategoryKey = "kling-ai" | "suno-ai" | "nanobanana-ai" | "claud-ai";

export type ArticleItem = {
  slug: string;
  title: string;
  excerpt: string;
  topCategory: string;
  topCategorySlug: TopCategoryKey;
  toolCategory: string;
  toolCategorySlug: ToolCategoryKey;
  author: string;
  date: string;
  readMinutes: number;
  image: string;
};

export type ToolProfile = {
  slug: ToolCategoryKey;
  name: string;
  tagline: string;
  summary: string;
  website: string;
  strengths: string[];
  bestFor: string[];
  relatedArticleSlugs: string[];
};
