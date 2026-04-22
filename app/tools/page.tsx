import type { Metadata } from "next";

import { AdSlot } from "@/src/components/ad-slot";
import { ContentSection } from "@/src/components/content-section";
import { MainLayout } from "@/src/components/main-layout";
import { PageHeader } from "@/src/components/page-header";
import { ToolProfileCard } from "@/src/components/tool-profile-card";
import { getAllToolProfiles } from "@/src/data/content-queries";

export const metadata: Metadata = {
  title: "AI Tool Directory",
  description: "Kling AI, Suno AI, Nanobanana AI, Claud AI 등 주요 툴의 핵심 정보를 모아둔 디렉토리입니다.",
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsPage() {
  const toolProfiles = getAllToolProfiles();

  return (
    <MainLayout>
      <div className="space-y-10">
        <PageHeader
          badge="Tool Directory"
          description="기사형 콘텐츠 외에도 툴별 핵심 정보 페이지를 자산형으로 축적합니다."
          meta={`${toolProfiles.length} tools`}
          title="AI Tools"
        />

        <AdSlot heightClassName="h-[90px]" label="Top Banner" />

        <ContentSection title="Tool Profiles">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {toolProfiles.map((tool) => (
              <ToolProfileCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </ContentSection>

        <AdSlot heightClassName="h-28" label="Directory Sponsor" />
      </div>
    </MainLayout>
  );
}
