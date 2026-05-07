import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/src/components/json-ld";
import { LaunchBoardList } from "@/src/components/launch-board-list";
import { createPageMetadata } from "@/src/data/seo";

export const metadata: Metadata = createPageMetadata({
  title: "바이브코딩 SaaS 런칭 보드",
  description: "바이브코딩으로 만든 AI 툴, 노코드 SaaS, 생산성 도구를 초보자 관점으로 검토하고 소개하는 AIDailyPick 런칭 보드입니다.",
  path: "/launch",
  keywords: ["바이브코딩 SaaS", "SaaS 런칭", "AI 툴 제보", "한국 SaaS 홍보", "노코드 SaaS"],
});

const statusCards = [
  ["런칭 후보", "제보가 접수됐지만 아직 공개 추천으로 판단하지 않은 상태입니다."],
  ["검토 중", "데모, 무료 범위, 첫 사용 흐름, 과장 표현 여부를 확인합니다."],
  ["소개 완료", "초보자 관점 메모와 출처를 붙여 공개 소개 후보로 정리합니다."],
  ["보류", "제품 확인이 어렵거나 광고성 표현이 강하면 공개를 보류합니다."],
];

const eligibleTools = [
  ["AI 툴", "글쓰기, 리서치, 영상, 디자인, 업무 자동화처럼 결과물이 바로 보이는 도구"],
  ["노코드/바이브코딩 SaaS", "Lovable, Cursor, v0, Replit, Bolt 등으로 만든 초기 제품"],
  ["1인 창업 툴", "폼, 예약, 결제, CRM, 뉴스레터, 고객 응대처럼 작은 팀이 쓰는 제품"],
  ["한국 SaaS", "한국어 사용성, 국내 결제/업무 흐름, 로컬 시장 문제를 다루는 제품"],
];

const reviewSteps = [
  ["데모 확인", "실제 링크가 열리는지, 로그인 없이 확인 가능한 화면이 있는지 봅니다."],
  ["초보자 테스트", "처음 쓰는 사람이 어디서 막히는지, 첫 결과물까지 얼마나 걸리는지 봅니다."],
  ["근거 분리", "공식 정보, 직접 테스트, 스폰서 여부를 섞지 않고 따로 표시합니다."],
];

const makerChecklist = [
  ["실제 접속 링크", "랜딩페이지만 있어도 괜찮지만, 사용자가 눌러볼 수 있는 화면이 있어야 합니다."],
  ["타깃 사용자", "누가 왜 쓰는지 한 문장으로 설명할 수 있어야 합니다."],
  ["가격/무료 범위", "무료 체험, 유료 전환 기준, 제한 사항을 숨기지 않는 제품을 우선 검토합니다."],
  ["제품 이미지", "공식 화면, 데모 GIF, 스크린샷처럼 사용자가 제품을 상상할 수 있는 자료가 있으면 좋습니다."],
];

export default function LaunchPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "AIDailyPick 바이브코딩 SaaS 런칭 보드",
    description: "바이브코딩으로 만든 SaaS와 AI 툴을 초보자 관점으로 검토하고 소개하는 런칭 보드",
    url: "https://aidailypick.com/launch",
  };

  return (
    <main className="bg-[#070812] text-white">
      <JsonLd data={jsonLd} />
      <section className="mx-auto w-full max-w-[1180px] px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase text-orange-100/75">
              Launch Board
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              바이브코딩으로 만든 SaaS,
              <span className="block bg-[linear-gradient(135deg,#FCAF45_0%,#FD1D6C_45%,#22D3EE_100%)] bg-clip-text text-transparent">
                첫 사용자 관점으로 소개합니다.
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/60 md:text-lg">
              AIDailyPick은 제품을 광고처럼 올리지 않습니다. 데모가 열리는지, 무료로 어디까지 되는지, 초보자가 어디서 막히는지 확인한 뒤
              소개 후보로 정리합니다.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-[#111326]" href="/submit">
                런칭 제보하기
              </Link>
              <Link className="rounded-2xl border border-white/12 px-5 py-3 text-center text-sm font-black text-white/72 hover:border-white/30 hover:text-white" href="/tools">
                기존 큐레이션 보기
              </Link>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
            <p className="text-xs font-black uppercase text-white/35">Pipeline</p>
            <div className="mt-4 grid gap-3">
              {statusCards.map(([title, description]) => (
                <article className="rounded-2xl border border-white/10 bg-[#070812]/70 p-4" key={title}>
                  <h2 className="text-sm font-black text-white">{title}</h2>
                  <p className="mt-2 text-xs leading-5 text-white/48">{description}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <LaunchBoardList />

      <section className="mx-auto w-full max-w-[1180px] px-4 py-10 md:px-6">
        <div className="mb-6">
          <p className="mb-2 text-xs font-black uppercase text-pink-200/80">Eligible</p>
          <h2 className="text-2xl font-black md:text-3xl">이런 툴을 기다립니다</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {eligibleTools.map(([title, description]) => (
            <article className="rounded-2xl border border-white/10 bg-white/[0.045] p-5" key={title}>
              <h3 className="text-base font-black text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/52">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-10 md:px-6">
        <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/[0.045] p-6 md:p-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase text-cyan-200/80">Maker Readiness</p>
            <h2 className="mt-2 text-3xl font-black leading-tight md:text-4xl">런칭 제보 전 준비하면 좋은 것</h2>
            <p className="mt-4 text-sm leading-7 text-white/58">
              잘 만든 제품도 설명이 흐리면 광고처럼 보입니다. 아래 네 가지가 있으면 초보자 관점의 소개문을 훨씬 더 신뢰 있게 만들 수 있습니다.
            </p>
            <Link className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#111326]" href="/submit">
              런칭 제보 준비하기
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {makerChecklist.map(([title, description]) => (
              <article className="rounded-2xl border border-white/10 bg-[#070812]/65 p-4" key={title}>
                <h3 className="text-sm font-black text-white">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-white/50">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-10 md:px-6">
        <div className="rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(252,175,69,0.13)_0%,rgba(253,29,108,0.12)_45%,rgba(34,211,238,0.10)_100%)] p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase text-orange-100/75">Review Method</p>
              <h2 className="mt-2 text-3xl font-black leading-tight md:text-4xl">소개보다 먼저, 확인 과정을 만듭니다.</h2>
              <p className="mt-4 text-sm leading-7 text-white/58">
                처음 방문한 사용자가 제품을 이해할 수 없다면 홍보 효과도 오래가지 않습니다. 그래서 기능 나열보다 데모, 가격, 첫 결과물, 한계를 먼저 봅니다.
              </p>
            </div>
            <div className="grid gap-3">
              {reviewSteps.map(([title, description], index) => (
                <article className="rounded-2xl border border-white/10 bg-[#070812]/65 p-4" key={title}>
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xs font-black text-white/55">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-base font-black text-white">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-white/52">{description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pb-20 pt-10 md:px-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 text-center md:p-8">
          <p className="text-sm font-black uppercase text-pink-200/80">Submit</p>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">지금 만든 제품을 제보하세요</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/55">
            완성된 대기업 제품이 아니어도 됩니다. 다만 실제 사용자가 열어볼 수 있는 데모, 명확한 타깃, 무료/가격 정보가 있으면 검토가 빨라집니다.
          </p>
          <Link className="mt-6 inline-flex rounded-2xl bg-white px-6 py-3 text-sm font-black text-[#111326]" href="/submit">
            런칭 제보 작성하기
          </Link>
        </div>
      </section>
    </main>
  );
}
