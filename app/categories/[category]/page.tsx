import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/src/components/json-ld";
import { SlideToolCard } from "@/src/components/slide-tool-card";
import { allCategoryFilters, getCategoryBySlug, getToolsByCategory, type SaasCategory } from "@/src/data/saas-directory";
import { createPageMetadata } from "@/src/data/seo";

export function generateStaticParams() {
  return allCategoryFilters.map((category) => ({ category: category.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return { title: "카테고리를 찾을 수 없습니다" };

  return createPageMetadata({
    title: `${category.label} 큐레이션`,
    description: `${category.label}에 맞는 AI/SaaS 툴을 이미지, 핵심 기능, 추천 대상 기준으로 비교합니다.`,
    path: `/categories/${category.id}`,
    keywords: [category.label, category.hint, "AI 툴 추천", "한국 SaaS"],
  });
}

export default async function CategoryAliasPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const tools = getToolsByCategory(category.id as SaasCategory).slice(0, 8);
  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category.label} 큐레이션`,
    description: category.hint,
    url: `https://aidailypick.com/categories/${category.id}`,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `https://aidailypick.com/tools/${tool.slug}`,
    })),
  };

  return (
    <main className="saas-curation-page min-h-screen">
      <JsonLd data={listJsonLd} />
      <section className="mx-auto w-full max-w-[1180px] px-5 py-12 md:px-6 md:py-16">
        <Link className="mb-6 inline-flex text-sm font-bold text-[#4B5563] hover:text-[#111827]" href="/tools">
          ← 툴 찾기로
        </Link>
        <p className="mb-4 inline-flex rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-black text-[#2563EB]">
          Category
        </p>
        <h1 className="font-heading max-w-3xl text-5xl font-black leading-tight text-[#111827] md:text-6xl">{category.label}</h1>
        <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-[#4B5563]">{category.hint} 목적에 맞는 툴을 이미지, 기능, 가격, 추천 대상 기준으로 정리했습니다.</p>
      </section>

      <section className="mx-auto grid w-full max-w-[1180px] gap-5 px-5 pb-20 md:px-6">
        {tools.length ? (
          tools.map((tool, index) => <SlideToolCard key={tool.id} priority={index === 0} tool={tool} />)
        ) : (
          <div className="saas-slide-panel rounded-[28px] p-8 text-center">
            <h2 className="font-heading text-3xl font-black text-[#111827]">아직 정리된 툴이 없습니다</h2>
            <p className="mt-3 text-sm font-semibold text-[#4B5563]">알고 있는 좋은 툴이 있다면 제보해주세요.</p>
            <Link className="mt-6 inline-flex rounded-2xl bg-[#2563EB] px-5 py-3 text-sm font-black text-white" href="/submit">
              툴 제보하기
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
