import type { MetadataRoute } from "next";

import { saasTools } from "@/src/data/saas-directory";

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
      url: `${SITE_URL}/tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/submit`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/search?q=SaaS`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  const toolRoutes: MetadataRoute.Sitemap = saasTools.map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: tool.isFeatured ? 0.85 : 0.75,
  }));

  return [...staticRoutes, ...toolRoutes];
}
