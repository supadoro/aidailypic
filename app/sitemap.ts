import type { MetadataRoute } from "next";

import { getAllArticles } from "@/src/data/content-queries";
import { topCategoryLabels, toolCategoryLabels } from "@/src/data/mock-content";

const SITE_URL = "https://aidailypick.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/news`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/search?q=ai`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  const sectionRoutes: MetadataRoute.Sitemap = Object.keys(topCategoryLabels).map((slug) => ({
    url: `${SITE_URL}/section/${slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const toolRoutes: MetadataRoute.Sitemap = Object.keys(toolCategoryLabels).map((slug) => ({
    url: `${SITE_URL}/tools/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${SITE_URL}/article/${article.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...sectionRoutes, ...toolRoutes, ...articleRoutes];
}
