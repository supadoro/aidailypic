import type { Metadata } from "next";

import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aidailypick.com"),
  title: {
    default: "AIDailyPick",
    template: "%s | AIDailyPick",
  },
  description: "요즘 뜨는 AI 자동화 툴과 한국 SaaS를 목적별로 정리해주는 큐레이션 & 제휴 플랫폼.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AIDailyPick",
    description: "인스타, 스레드, 한국 커뮤니티에서 보이는 AI 자동화 툴과 SaaS를 정리합니다.",
    url: "https://aidailypick.com",
    siteName: "AIDailyPick",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIDailyPick",
    description: "요즘 뜨는 AI 자동화 툴을 대신 찾아보고 정리합니다.",
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
