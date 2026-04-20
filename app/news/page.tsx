import type { Metadata } from "next";

import { MainLayout } from "@/src/components/main-layout";
import { PageHeader } from "@/src/components/page-header";
import { PostCard } from "@/src/components/post-card";
import { SectionTitle } from "@/src/components/section-title";
import { feedArticles } from "@/src/data/mock-content";

export const metadata: Metadata = {
  title: "AI News Hub",
  description: "최신 AI 업데이트를 모아보는 뉴스 허브 페이지입니다.",
  alternates: {
    canonical: "/news",
  },
};

export default function NewsPage() {
  const news = feedArticles.filter((article) => article.topCategorySlug === "ai-news");

  return (
    <MainLayout>
      <div className="space-y-10">
        <PageHeader
          badge="AI News"
          title="News Hub"
          description="모델 출시, 정책 변경, 가격 업데이트 등 최신 AI 뉴스를 빠르게 확인하세요."
          meta={`${news.length} stories`}
        />

        <section>
          <SectionTitle title="Latest News" />
          <div className="space-y-5">
            {news.map((article) => (
              <PostCard key={article.slug} article={article} variant="list" />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
