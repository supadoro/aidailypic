import type { Metadata } from "next";
import Link from "next/link";

import { InfoPage, InfoSection } from "@/src/components/info-page";

export const metadata: Metadata = {
  title: "문의",
  description: "AIDailyPick 운영, 제휴, 툴 등록 관련 문의 방법을 안내합니다.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <InfoPage
      badge="Contact"
      description="서비스 운영, 제휴, 툴 등록, 개인정보 관련 문의를 위한 안내 페이지입니다."
      title="문의"
    >
      <InfoSection title="툴 등록 및 제휴">
        <p>AI 자동화 툴, 한국 SaaS, 생산성 도구를 소개하고 싶다면 먼저 툴 홍보하기 페이지에서 정보를 정리해주세요.</p>
        <Link className="inline-flex rounded-xl bg-white px-4 py-2 text-sm font-black text-[#111326]" href="/submit">
          툴 홍보하기
        </Link>
      </InfoSection>

      <InfoSection title="운영 문의">
        <p>현재는 MVP 단계라 별도 문의 폼 저장 기능은 아직 연결되어 있지 않습니다.</p>
        <p>다음 단계에서 이메일 또는 폼 저장 기능을 붙이면 이 페이지에서 바로 문의를 접수할 수 있게 만들 예정입니다.</p>
      </InfoSection>

      <InfoSection title="콘텐츠 수정 요청">
        <p>툴 정보가 부정확하거나 가격, 기능, 링크가 변경된 경우 수정 요청을 받을 수 있습니다.</p>
        <p>정확한 툴 이름, 공식 링크, 수정이 필요한 내용을 함께 전달하면 더 빠르게 반영할 수 있습니다.</p>
      </InfoSection>

      <InfoSection title="개인정보 문의">
        <p>개인정보 처리와 관련된 문의는 개인정보처리방침을 먼저 확인해주세요.</p>
        <Link className="text-sm font-bold text-pink-100 hover:text-white" href="/privacy">
          개인정보처리방침 보기
        </Link>
      </InfoSection>
    </InfoPage>
  );
}
