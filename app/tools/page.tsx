import type { Metadata } from "next";
import Link from "next/link";

import { MainLayout } from "@/src/components/main-layout";
import { PageHeader } from "@/src/components/page-header";
import { SectionTitle } from "@/src/components/section-title";
import { toolProfiles } from "@/src/data/mock-content";

export const metadata: Metadata = {
  title: "AI Tool Directory",
  description: "Kling AI, Suno AI, Nanobanana AI, Claud AI 등 주요 툴의 핵심 정보를 모아둔 디렉토리입니다.",
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsPage() {
  return (
    <MainLayout>
      <div className="space-y-10">
        <PageHeader
          badge="Tool Directory"
          title="AI Tools"
          description="기사형 콘텐츠 외에도 툴별 핵심 정보 페이지를 자산형으로 축적합니다."
          meta={`${toolProfiles.length} tools`}
        />

        <section>
          <SectionTitle title="Tool Profiles" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {toolProfiles.map((tool) => (
              <article className="rounded-xl bg-white p-6 shadow-sm" key={tool.slug}>
                <p className="text-xs font-black uppercase tracking-widest text-[#5148d8]">{tool.slug}</p>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-900">{tool.name}</h2>
                <p className="mt-2 text-sm font-semibold text-slate-600">{tool.tagline}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{tool.summary}</p>
                <Link className="mt-4 inline-flex text-sm font-bold text-[#5148d8] hover:underline" href={`/tools/${tool.slug}`}>
                  Open Profile
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
