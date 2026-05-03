import type { Metadata } from "next";

import { InfoPage, InfoSection } from "@/src/components/info-page";

export const metadata: Metadata = {
  title: "면책 고지",
  description: "AIDailyPick의 정보 제공 범위와 이용자 판단 책임을 안내합니다.",
  alternates: {
    canonical: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <InfoPage
      badge="Disclaimer"
      description="AIDailyPick의 콘텐츠는 SaaS 탐색을 돕기 위한 정보입니다. 최종 선택과 결제 판단은 사용자의 책임으로 이루어져야 합니다."
      title="면책 고지"
    >
      <InfoSection title="정보 제공 목적">
        <p>AIDailyPick은 AI 자동화 툴, 한국 SaaS, 생산성 도구를 쉽게 비교하고 탐색할 수 있도록 정보를 정리합니다.</p>
        <p>사이트의 콘텐츠는 투자, 법률, 세무, 의료, 전문 컨설팅 조언이 아닙니다.</p>
      </InfoSection>

      <InfoSection title="정확성에 대한 안내">
        <p>툴의 가격, 기능, 무료체험 조건, 제휴 혜택은 언제든 변경될 수 있습니다.</p>
        <p>중요한 결정을 하기 전에는 반드시 해당 서비스의 공식 페이지에서 최신 정보를 확인해주세요.</p>
      </InfoSection>

      <InfoSection title="외부 링크">
        <p>사이트에는 외부 서비스로 이동하는 링크가 포함될 수 있습니다. 외부 사이트의 콘텐츠, 정책, 결제, 개인정보 처리에 대해서는 해당 서비스의 약관과 정책이 적용됩니다.</p>
      </InfoSection>

      <InfoSection title="사용자 책임">
        <p>툴 도입, 결제, 업무 적용으로 발생하는 결과는 사용자의 판단과 책임에 따릅니다.</p>
        <p>AIDailyPick은 가능한 범위에서 균형 잡힌 정보를 제공하려고 노력하지만, 모든 상황에 대한 적합성을 보장하지 않습니다.</p>
      </InfoSection>
    </InfoPage>
  );
}
