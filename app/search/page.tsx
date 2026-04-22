import type { Metadata } from "next";

import { AdSlot } from "@/src/components/ad-slot";
import { ContentSection } from "@/src/components/content-section";
import { MainLayout } from "@/src/components/main-layout";
import { Pagination } from "@/src/components/pagination";
import { PageHeader } from "@/src/components/page-header";
import { PostList } from "@/src/components/post-list";
import { searchFeedArticles } from "@/src/data/content-queries";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  const keyword = q || "ai";
  return {
    title: `Search: ${keyword}`,
    description: `${keyword} 관련 튜토리얼, 분석, 운영 가이드를 검색합니다.`,
    alternates: {
      canonical: `/search?q=${encodeURIComponent(keyword)}`,
    },
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page } = await searchParams;
  const keyword = (q || "ai").toLowerCase().trim();
  const results = searchFeedArticles(keyword);

  const currentPage = Math.max(1, Number(page || "1"));
  const pageSize = 4;
  const totalPages = Math.max(1, Math.ceil(results.length / pageSize));
  const normalizedPage = Math.min(currentPage, totalPages);
  const start = (normalizedPage - 1) * pageSize;
  const paged = results.slice(start, start + pageSize);

  return (
    <MainLayout>
      <div className="space-y-10">
        <PageHeader
          badge="Search"
          description={`"${keyword}" 키워드와 관련된 글을 보여줍니다.`}
          meta={`${results.length} result(s)`}
          title={`Results for "${keyword}"`}
        />

        <AdSlot heightClassName="h-[90px]" label="Search Sponsor" />

        <ContentSection title="Search Results">
          <PostList articles={paged} emptyMessage="검색 결과가 없습니다. 다른 키워드로 다시 시도해보세요." />
          <Pagination basePath="/search" currentPage={normalizedPage} query={{ q: keyword }} totalPages={totalPages} />
        </ContentSection>
      </div>
    </MainLayout>
  );
}
