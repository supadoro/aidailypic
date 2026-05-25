import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/src/components/contact-form";
import { InfoPage, InfoSection } from "@/src/components/info-page";
import { NewsletterForm } from "@/src/components/newsletter-form";
import { createPageMetadata } from "@/src/data/seo";

export const metadata: Metadata = createPageMetadata({
  title: "문의",
  description: "AIDailyPick 운영, 제휴, 툴 등록, 콘텐츠 수정 요청 관련 문의를 남겨주세요.",
  path: "/contact",
});

const contactRoutes = [
  ["SaaS를 알리고 싶어요", "바이브코딩 SaaS, AI 툴, 한국 SaaS 제보는 런칭 제보 폼이 가장 빠릅니다."],
  ["정보를 고치고 싶어요", "가격, 기능, 링크, 공식 이미지가 바뀐 경우 근거 링크와 함께 보내주세요."],
  ["제휴를 제안하고 싶어요", "스폰서/제휴 가능성은 추천 근거와 분리해서 검토합니다."],
];

export default function ContactPage() {
  return (
    <InfoPage
      badge="Contact"
      description="툴 제보, 정보 수정, 제휴 문의, 구독 신청을 한곳에서 처리합니다. 추천처럼 보이는 노출과 유료 제휴는 분리해서 확인합니다."
      title="무엇을 도와드릴까요?"
    >
      <section className="contact-trust-funnel grid gap-3 md:grid-cols-3">
        {contactRoutes.map(([title, description]) => (
          <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4" key={title}>
            <h2 className="text-sm font-black text-slate-950">{title}</h2>
            <p className="mt-2 text-xs leading-5 text-slate-500">{description}</p>
          </article>
        ))}
      </section>

      <InfoSection title="툴 등록 및 제휴">
        <p>AI 자동화 툴, 한국 SaaS, 생산성 도구를 소개하고 싶다면 먼저 런칭 제보에서 링크, 가격, 제품 화면을 정리해주세요.</p>
        <Link className="inline-flex rounded-xl bg-[#3182f6] px-4 py-2 text-sm font-black text-white shadow-[0_8px_24px_rgba(49,130,246,0.18)]" href="/submit">
          런칭 제보하기
        </Link>
      </InfoSection>

      <InfoSection title="운영 문의">
        <p>운영 문의, 제휴 문의, 콘텐츠 수정 요청은 아래 폼으로 보내주세요.</p>
        <ContactForm />
      </InfoSection>

      <InfoSection title="새 툴 업데이트 받기">
        <p>AIDailyPick의 새 큐레이션, 한국 SaaS 런칭 후보, 메이커 제보 흐름을 이메일로 받아볼 수 있습니다.</p>
        <NewsletterForm />
      </InfoSection>

      <InfoSection title="개인정보 문의">
        <p>개인정보 처리와 관련된 문의는 개인정보처리방침을 먼저 확인해주세요.</p>
        <Link className="text-sm font-black text-[#3182f6] hover:underline" href="/privacy">
          개인정보처리방침 보기
        </Link>
      </InfoSection>
    </InfoPage>
  );
}
