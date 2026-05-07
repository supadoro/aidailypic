import type { Metadata } from "next";

import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { defaultSeoDescription, siteName, siteUrl } from "@/src/data/seo";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - AI 자동화 툴과 한국 SaaS 큐레이션`,
    template: `%s | ${siteName}`,
  },
  description: defaultSeoDescription,
  applicationName: siteName,
  keywords: [
    "AI 자동화 툴",
    "한국 SaaS",
    "SaaS 큐레이션",
    "마케팅 자동화",
    "이커머스 자동화",
    "노코드 툴",
    "생산성 툴",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `${siteName} - AI 자동화 툴과 한국 SaaS 큐레이션`,
    description: defaultSeoDescription,
    url: siteUrl,
    siteName,
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - AI 자동화 툴과 한국 SaaS 큐레이션`,
    description: defaultSeoDescription,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
