import { HomeToolDiscovery } from "@/src/components/home-tool-discovery";
import { JsonLd } from "@/src/components/json-ld";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "AIDailyPick",
            url: "https://aidailypick.com",
            description: "한국인을 위한 AI 자동화 툴과 SaaS 큐레이션 플랫폼",
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "AIDailyPick",
            url: "https://aidailypick.com",
            inLanguage: "ko-KR",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://aidailypick.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
        ]}
      />
      <HomeToolDiscovery />
    </>
  );
}
