import type { Metadata } from "next";
import Link from "next/link";

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
      description="AIDailyPick은 제휴 수익을 받을 수 있지만, 제휴 가능성을 추천 근거처럼 쓰지 않습니다. 돈의 흐름과 검수 기준을 분리해서 표시합니다."
      title="제휴와 추천은 분리합니다"
    >
      <InfoSection title="제휴 링크 안내">
        <p>사이트의 일부 버튼과 외부 링크는 제휴 링크일 수 있습니다. 사용자가 해당 링크를 통해 가입하거나 결제하면 AIDailyPick이 수수료를 받을 수 있습니다.</p>
        <p>제휴 링크를 사용해도 일반적으로 사용자에게 추가 비용이 발생하지 않습니다.</p>
      </InfoSection>

      <InfoSection title="스폰서 콘텐츠 기준">
        <p>스폰서 툴은 가능한 경우 카드나 상세 페이지에 Sponsored 표시를 붙입니다.</p>
        <p>유료 노출 여부와 관계없이, 데모 링크, 가격/무료 범위, 공식 이미지, 추천하지 않는 경우를 분리해 보여주는 것을 목표로 합니다.</p>
        <p>
          세부 검수 기준은{" "}
          <Link className="font-black text-[#3182f6] hover:underline" href="/methodology">
            검수 기준
          </Link>
          에서 확인할 수 있습니다.
        </p>
      </InfoSection>

      <InfoSection title="추천 기준">
        <p>커뮤니티에서 자주 언급되는지보다, 초보자가 첫 결과물을 얻을 수 있는지와 결제 전 확인할 조건이 명확한지를 먼저 봅니다.</p>
        <p>모든 툴을 직접 장기간 사용했다는 의미는 아니며, 일부 정보는 공식 자료와 제출 정보를 바탕으로 정리될 수 있습니다.</p>
      </InfoSection>

      <InfoSection title="제휴 문의">
        <p>
          툴 등록이나 제휴 제안은{" "}
          <Link className="font-black text-[#3182f6] hover:underline" href="/submit">
            런칭 제보
          </Link>
          로 보내주세요. 제보된 모든 툴을 추천으로 표시하지는 않습니다.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
