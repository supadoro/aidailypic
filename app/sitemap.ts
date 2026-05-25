import type { MetadataRoute } from "next";

import { allCategoryFilters, saasTools } from "@/src/data/saas-directory";
import { guideCurations } from "@/src/data/guide-curations";
import { siteUrl } from "@/src/data/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/guides`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.82,
    },
    {
      url: `${siteUrl}/compare`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.82,
    },
    {
      url: `${siteUrl}/methodology`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/launch`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/submit`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/affiliate`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/disclaimer`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const toolRoutes: MetadataRoute.Sitemap = saasTools.map((tool) => ({
    url: `${siteUrl}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: tool.isFeatured ? 0.85 : 0.75,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = allCategoryFilters.map((category) => ({
    url: `${siteUrl}/category/${category.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.72,
  }));

  const categoryAliasRoutes: MetadataRoute.Sitemap = allCategoryFilters.map((category) => ({
    url: `${siteUrl}/categories/${category.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.76,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guideCurations.map((guide) => ({
    url: `${siteUrl}/guides/${guide.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.78,
  }));

  return [...staticRoutes, ...categoryRoutes, ...categoryAliasRoutes, ...guideRoutes, ...toolRoutes];
}
