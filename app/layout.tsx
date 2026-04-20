import type { Metadata } from "next";

import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aidailypick.com"),
  title: {
    default: "AI Daily Pick",
    template: "%s | AI Daily Pick",
  },
  description: "Kling AI, Suno AI, Nanobanana AI, Claud AI 실전 워크플로우를 다루는 에디토리얼 허브.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI Daily Pick",
    description: "생성형 AI 툴 실전 활용법과 에디토리얼 인사이트를 매일 업데이트합니다.",
    url: "https://aidailypick.com",
    siteName: "AI Daily Pick",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Daily Pick",
    description: "생성형 AI 실전 워크플로우를 다루는 데일리 큐레이션.",
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
