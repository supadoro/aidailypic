import type { Metadata } from "next";

import { InfoPage, InfoSection } from "@/src/components/info-page";

export const metadata: Metadata = {
  title: "제휴 안내",
  description: "AIDailyPick의 제휴 링크, 스폰서 콘텐츠, 툴 등록 기준을 안내합니다.",
  alternates: {
    canonical: "/affiliate",
  },
};

export default function AffiliatePage() {
  return (
    <InfoPage
      badge="Affiliate"
      description="AIDailyPick은 좋은 SaaS와 사용자를 연결하는 큐레이션 플랫폼입니다. 일부 링크는 제휴 링크이거나 스폰서 노출일 수 있습니다."
      title="제휴 안내"
    >
      <InfoSection title="제휴 링크 안내">
        <p>사이트의 일부 버튼과 외부 링크는 제휴 링크일 수 있습니다. 사용자가 해당 링크를 통해 가입하거나 결제하면 AIDailyPick이 수수료를 받을 수 있습니다.</p>
        <p>제휴 링크를 사용해도 일반적으로 사용자에게 추가 비용이 발생하지 않습니다.</p>
      </InfoSection>

      <InfoSection title="스폰서 콘텐츠 기준">
        <p>스폰서 툴은 가능한 경우 카드나 상세 페이지에 Sponsored 표시를 붙입니다.</p>
        <p>유료 노출 여부와 관계없이, 한국 사용자가 이해하기 쉬운 사용 맥락과 장단점을 함께 제공하는 것을 목표로 합니다.</p>
      </InfoSection>

      <InfoSection title="추천 기준">
        <p>커뮤니티에서 자주 언급되는지, 실제 업무 시간을 줄이는지, 한국 사용자가 접근하기 쉬운지, 무료체험이나 명확한 가격 정보가 있는지를 봅니다.</p>
        <p>모든 툴을 직접 장기간 사용했다는 의미는 아니며, 일부 정보는 공개 자료와 제출 정보를 바탕으로 정리될 수 있습니다.</p>
      </InfoSection>

      <InfoSection title="제휴 문의">
        <p>툴 등록이나 제휴 제안은 툴 홍보하기 페이지 또는 문의 페이지를 통해 전달할 수 있습니다.</p>
      </InfoSection>
    </InfoPage>
  );
}
