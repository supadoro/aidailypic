import type { Metadata } from "next";

export const siteUrl = "https://aidailypick.com";
export const siteName = "AIDailyPick";
export const defaultSeoDescription = "요즘 뜨는 AI 자동화 툴과 한국 SaaS를 목적별로 정리해주는 큐레이션 플랫폼.";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  keywords?: string[];
};

export function createPageMetadata({ title, description, path, type = "website", keywords }: SeoInput): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "ko_KR",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
