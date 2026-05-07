import type { Metadata } from "next";
import Link from "next/link";

import { SubmitToolForm } from "@/src/components/submit-tool-form";
import { createPageMetadata } from "@/src/data/seo";

export const metadata: Metadata = createPageMetadata({
  title: "바이브코딩 SaaS 런칭 제보",
  description: "바이브코딩으로 만든 AI 툴, 노코드 SaaS, 업무 자동화 서비스를 AIDailyPick에 제보하고 초보자 관점으로 소개받아보세요.",
  path: "/submit",
  keywords: ["바이브코딩 SaaS", "SaaS 홍보", "AI 툴 홍보", "한국 SaaS 등록", "툴 제보"],
});

const submissionTypes = [
  ["무료 제보", "데모와 타깃 사용자가 명확한 툴은 런칭 후보로 검토합니다."],
  ["초보자 테스트 리뷰", "처음 쓰는 사람 기준으로 막히는 지점, 무료 범위, 한계를 같이 정리합니다."],
  ["런칭 스폰서", "홈, 뉴스레터, SNS 소재로 묶어 초기 사용자에게 노출합니다."],
  ["피드백 리포트", "사용자가 처음 만나는 화면, 가격, CTA, 온보딩의 막히는 지점을 정리합니다."],
];

const checklist = [
  "실제로 열리는 데모 URL",
  "누가 쓰면 좋은지 한 문장",
  "무료 플랜/무료체험/가격",
  "바이브코딩에 사용한 도구",
  "첫 사용자가 얻는 결과물/스크린샷",
  "원하는 소개 방식",
];

const reviewRules = [
  ["받고 싶은 툴", "바이브코딩으로 만든 AI 툴, 노코드 SaaS, 업무 자동화, 마케팅/셀러/크리에이터용 작은 제품"],
  ["우선 검토", "로그인 없이 데모를 볼 수 있거나, 가격/무료 범위/타깃 사용자가 명확한 제품"],
  ["보류 가능", "랜딩페이지만 있고 제품이 없거나, 성과 보장/과장 문구가 강하거나, 실제 사용 흐름을 확인하기 어려운 제품"],
];

export default function SubmitPage() {
  return (
    <main className="bg-[#070812] text-white">
      <section className="mx-auto w-full max-w-[1180px] px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.86fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-wide text-pink-100/75">
              Launch Board
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">
              바이브코딩으로 SaaS를 만들었다면,
              <span className="block bg-[linear-gradient(135deg,#FCAF45_0%,#FD1D6C_45%,#A855F7_100%)] bg-clip-text text-transparent">
                첫 사용자에게 보여주세요.
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/60">
              AIDailyPick은 바이브코딩으로 만든 작은 AI/SaaS 툴을 광고 문구처럼 올리지 않습니다. 초보자가 실제로 이해할 수 있게
              용도, 데모 가능 여부, 무료 범위, 막히는 지점을 같이 정리합니다.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="rounded-2xl bg-[linear-gradient(135deg,#FF7A18_0%,#FF2D95_45%,#8B5CF6_100%)] px-5 py-3 text-sm font-black text-white shadow-[0_10px_28px_rgba(255,45,149,0.22)]" href="#submit-form">
                런칭 제보하기
              </Link>
              <Link className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-black text-white/70 hover:border-pink-300/60 hover:text-white" href="/affiliate">
                소개 방식 보기
              </Link>
              <Link className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-black text-white/70 hover:border-pink-300/60 hover:text-white" href="/contact">
                운영 문의하기
              </Link>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)]">
            <p className="text-xs font-black uppercase text-orange-200/80">For Makers</p>
            <div className="mt-4 grid gap-3">
              {submissionTypes.map(([title, description]) => (
                <article className="rounded-2xl border border-white/10 bg-[#070812]/70 px-4 py-3" key={title}>
                  <h2 className="text-sm font-black text-white">{title}</h2>
                  <p className="mt-1 text-xs leading-5 text-white/50">{description}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {reviewRules.map(([title, description]) => (
            <article className="rounded-3xl border border-white/10 bg-white/[0.045] p-5" key={title}>
              <h2 className="text-base font-black text-white">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/52">{description}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]" id="submit-form">
          <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 md:p-7">
            <p className="text-xs font-black uppercase text-pink-200/80">Before Launch</p>
            <h2 className="mt-2 text-3xl font-black text-white">이 정보가 있으면 소개가 훨씬 쉬워집니다</h2>
            <div className="mt-5 grid gap-2">
              {checklist.map((item) => (
                <p className="rounded-2xl border border-white/10 bg-[#070812]/70 px-4 py-3 text-sm font-bold text-white/65" key={item}>
                  {item}
                </p>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
              <p className="text-sm font-black text-cyan-100">신뢰도를 높이는 자료</p>
              <p className="mt-2 text-xs leading-5 text-cyan-100/65">
                공식 스크린샷, 데모 GIF, 가격 페이지, 온보딩 링크가 있으면 소개문을 광고처럼 쓰지 않고 사실 기반으로 정리하기 쉽습니다.
              </p>
            </div>
            <div className="mt-6 rounded-2xl border border-orange-300/20 bg-orange-300/10 p-4">
              <p className="text-sm font-black text-orange-100">MVP 저장 안내</p>
              <p className="mt-2 text-xs leading-5 text-orange-100/65">
                제출 내용은 서버 저장소가 연결되면 관리자 제출함에 저장됩니다. AIDailyPick은 제보된 모든 툴을 추천으로 표시하지 않고, 검토 전 후보로 분리합니다.
              </p>
            </div>
          </div>

          <SubmitToolForm />
        </section>
      </section>
    </main>
  );
}
