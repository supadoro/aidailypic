import type { Metadata } from "next";

import { AdSlot } from "@/src/components/ad-slot";
import { ContentSection } from "@/src/components/content-section";
import { MainLayout } from "@/src/components/main-layout";
import { PageHeader } from "@/src/components/page-header";
import { PostList } from "@/src/components/post-list";
import { getArticlesByTopCategory, getTopCategoryLabel } from "@/src/data/content-queries";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const section = getTopCategoryLabel(slug);
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
  const section = getTopCategoryLabel(slug);
  const articles = getArticlesByTopCategory(slug);

  return (
    <MainLayout>
      <div className="space-y-10">
        <PageHeader
          badge="Top Section"
          title={section}
          description={`${section} 상위 카테고리 기준으로 최신 글을 모아봤습니다.`}
          meta={`${articles.length} stories`}
        />

        <AdSlot heightClassName="h-[90px]" label="Top Banner" />

        <ContentSection title={`${section} Stories`}>
          <PostList articles={articles} />
        </ContentSection>

        <AdSlot heightClassName="h-28" label="Section Sponsor" />
      </div>
    </MainLayout>
  );
}
