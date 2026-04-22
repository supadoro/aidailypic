import type { Metadata } from "next";

import { AdSlot } from "@/src/components/ad-slot";
import { ContentSection } from "@/src/components/content-section";
import { MainLayout } from "@/src/components/main-layout";
import { PageHeader } from "@/src/components/page-header";
import { PostList } from "@/src/components/post-list";
import { getArticlesByTopCategory } from "@/src/data/content-queries";

export const metadata: Metadata = {
  title: "AI News Hub",
  description: "최신 AI 업데이트를 모아보는 뉴스 허브 페이지입니다.",
  alternates: {
    canonical: "/news",
  },
};

export default function NewsPage() {
  const news = getArticlesByTopCategory("ai-news");

  return (
    <MainLayout>
      <div className="space-y-10">
        <PageHeader
          badge="AI News"
          title="News Hub"
          description="모델 출시, 정책 변경, 가격 업데이트 등 최신 AI 뉴스를 빠르게 확인하세요."
          meta={`${news.length} stories`}
        />

        <AdSlot heightClassName="h-[90px]" label="Top Banner" />

        <ContentSection title="Latest News">
          <PostList articles={news} />
        </ContentSection>

        <AdSlot heightClassName="h-28" label="End of News Sponsor" />
      </div>
    </MainLayout>
  );
}
