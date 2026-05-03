import type { Metadata } from "next";

import { InfoPage, InfoSection } from "@/src/components/info-page";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "AIDailyPick의 개인정보 수집, 이용, 보관 원칙을 안내합니다.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <InfoPage
      badge="Privacy"
      description="AIDailyPick은 한국 사용자를 위한 SaaS 큐레이션 플랫폼입니다. 현재 MVP 단계에서는 회원가입, 결제, 서버 저장형 계정을 운영하지 않습니다."
      title="개인정보처리방침"
    >
      <InfoSection title="수집하는 정보">
        <p>현재 사이트는 회원가입과 결제 기능을 제공하지 않으므로 이름, 비밀번호, 결제정보를 직접 수집하지 않습니다.</p>
        <p>뉴스레터, 문의, 툴 제안 기능을 실제 저장 방식으로 연결하는 경우 이메일 주소, 문의 내용, 제출한 툴 정보가 수집될 수 있습니다.</p>
      </InfoSection>

      <InfoSection title="자동으로 처리될 수 있는 정보">
        <p>Cloudflare, 웹 분석 도구, 광고 플랫폼을 사용하는 경우 IP 주소, 브라우저 정보, 방문 페이지, 쿠키와 같은 기술 정보가 처리될 수 있습니다.</p>
        <p>이 정보는 보안, 트래픽 분석, 서비스 개선, 광고 성과 확인 목적으로 사용될 수 있습니다.</p>
      </InfoSection>

      <InfoSection title="개인정보 이용 목적">
        <p>문의 응대, 제출된 SaaS 검토, 서비스 품질 개선, 부정 이용 방지, 광고 및 제휴 성과 측정을 위해 필요한 범위에서만 정보를 사용합니다.</p>
      </InfoSection>

      <InfoSection title="보관 및 삭제">
        <p>수집 목적이 달성되면 관련 정보를 지체 없이 삭제합니다. 법령상 보관이 필요한 경우에는 해당 기간 동안 별도 보관할 수 있습니다.</p>
      </InfoSection>

      <InfoSection title="문의">
        <p>개인정보 관련 문의는 문의 페이지를 통해 접수할 수 있습니다. 정식 운영 전까지는 사이트 운영자 확인 후 순차적으로 답변합니다.</p>
      </InfoSection>
    </InfoPage>
  );
}
