import type { Metadata } from "next";

import { AdSlot } from "@/src/components/ad-slot";
import { MainLayout } from "@/src/components/main-layout";
import { Pagination } from "@/src/components/pagination";
import { PageHeader } from "@/src/components/page-header";
import { PostCard } from "@/src/components/post-card";
import { SectionTitle } from "@/src/components/section-title";
import { categoryLabels, feedArticles, type CategoryKey } from "@/src/data/mock-content";

function getCategoryLabel(slug: string) {
  return categoryLabels[slug as CategoryKey] ?? slug;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = getCategoryLabel(slug);
  return {
    title,
    description: `${title} 관련 스토리, 튜토리얼, 운영 가이드를 모아봅니다.`,
    alternates: {
      canonical: `/category/${slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;
  const title = getCategoryLabel(slug);
  const categoryArticles = feedArticles.filter((article) => article.categorySlug === slug);

  const currentPage = Math.max(1, Number(page || "1"));
  const pageSize = 4;
  const totalPages = Math.max(1, Math.ceil(categoryArticles.length / pageSize));
  const normalizedPage = Math.min(currentPage, totalPages);
  const start = (normalizedPage - 1) * pageSize;
  const paged = categoryArticles.slice(start, start + pageSize);

  return (
    <MainLayout>
      <div className="space-y-10">
        <PageHeader
          badge="Category"
          description={`${title} 카테고리의 최신 실전 가이드를 한곳에서 확인하세요.`}
          title={title}
        />

        <AdSlot heightClassName="h-[90px]" label="Category Sponsor" />

        <section>
          <SectionTitle title={`${title} Articles`} />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {paged.map((article) => (
              <PostCard key={article.slug} article={article} variant="featured" />
            ))}
          </div>
          <Pagination basePath={`/category/${slug}`} currentPage={normalizedPage} totalPages={totalPages} />
        </section>

        <section>
          <SectionTitle title="Latest in This Category" />
          <div className="space-y-5">
            {categoryArticles.slice(0, 3).map((article) => (
              <PostCard key={`list-${article.slug}`} article={article} variant="list" />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

