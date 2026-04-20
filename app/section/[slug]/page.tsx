import type { Metadata } from "next";

import { MainLayout } from "@/src/components/main-layout";
import { PageHeader } from "@/src/components/page-header";
import { PostCard } from "@/src/components/post-card";
import { SectionTitle } from "@/src/components/section-title";
import { feedArticles, topCategoryLabels, type TopCategoryKey } from "@/src/data/mock-content";

function getSectionLabel(slug: string) {
  return topCategoryLabels[slug as TopCategoryKey] ?? slug;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const section = getSectionLabel(slug);
  return {
    title: section,
    description: `${section} 관련 기사 모음입니다.`,
    alternates: {
      canonical: `/section/${slug}`,
    },
  };
}

export default async function SectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const section = getSectionLabel(slug);
  const articles = feedArticles.filter((article) => article.topCategorySlug === slug);

  return (
    <MainLayout>
      <div className="space-y-10">
        <PageHeader
          badge="Top Section"
          title={section}
          description={`${section} 상위 카테고리 기준으로 최신 글을 모아봤습니다.`}
          meta={`${articles.length} stories`}
        />

        <section>
          <SectionTitle title={`${section} Stories`} />
          <div className="space-y-5">
            {articles.map((article) => (
              <PostCard key={article.slug} article={article} variant="list" />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
