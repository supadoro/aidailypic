import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/src/components/json-ld";
import { createPageMetadata } from "@/src/data/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AIDailyPick 검수 기준 - 추천, 후보, 스폰서 구분 방식",
  description: "AIDailyPick이 AI 툴과 SaaS를 어떤 기준으로 확인하고, 추천과 후보, 스폰서 노출을 어떻게 구분하는지 정리했습니다.",
  path: "/methodology",
  keywords: ["AIDailyPick 검수 기준", "AI 툴 추천 기준", "SaaS 큐레이션", "바이브코딩 SaaS 제보"],
});

const reviewLevels = [
  ["직접 테스트 기록", "운영자가 실제 흐름을 눌러보고 첫 결과물, 막히는 지점, 가격/제한을 함께 적은 상태입니다."],
  ["공식 정보 확인", "공식 홈페이지, 도움말, 가격표, 제품 화면처럼 확인 가능한 출처를 기준으로 정리한 상태입니다."],
  ["검토 예정", "커뮤니티나 제보로 발견했지만 아직 충분히 확인하지 못한 후보입니다. 추천처럼 단정하지 않습니다."],
];

const sourceRules = [
  ["공식 출처 우선", "가격, 무료 범위, 기능 제한은 공식 페이지와 도움말을 우선합니다."],
  ["첫 사용 장면", "초보자가 처음 무엇을 눌러 어떤 결과물을 얻을 수 있는지 적습니다."],
  ["안 맞는 경우", "좋은 점만 쓰지 않고, 도입하면 안 맞을 상황을 함께 적습니다."],
  ["가격 주의", "플랜, 사용량, 수수료, 라이선스처럼 결제 전 확인할 조건을 분리합니다."],
];

const makerFlow = [
  ["제보 접수", "메이커가 데모 링크, 가격/무료 범위, 타깃 사용자, 공개 동의를 제출합니다."],
  ["초보자 관점 검토", "처음 쓰는 사람이 어디서 막히는지, 첫 결과물이 명확한지 확인합니다."],
  ["공개 여부 결정", "공개 동의가 있고 소개 완료 상태인 툴만 런칭 보드에 노출합니다."],
];

export default function MethodologyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "AIDailyPick 검수 기준",
    url: "https://aidailypick.com/methodology",
    description: "AI 툴과 SaaS 큐레이션의 검수 기준, 출처 기준, 스폰서 구분 방식을 설명하는 페이지",
  };

  return (
    <main className="toss-clean bg-[#f8fafc] text-slate-950">
      <JsonLd data={jsonLd} />
      <section className="methodology-trust-hero mx-auto w-full max-w-[1120px] px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="text-sm font-black text-[#3182f6]">검수 기준</p>
            <h1 className="mt-3 max-w-3xl text-[2.25rem] font-black leading-tight tracking-normal text-slate-950 md:text-[3.5rem]">
              추천과 제휴를 분리합니다.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              AIDailyPick은 툴을 많이 모으는 것보다, 초보자가 결제 전 확인해야 할 조건을 짧고 분명하게 나누는 데 집중합니다.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link className="rounded-2xl bg-[#3182f6] px-5 py-3 text-center text-sm font-black text-white shadow-[0_8px_24px_rgba(49,130,246,0.22)]" href="/tools">
                검수된 툴 보기
              </Link>
              <Link className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-black text-slate-700 hover:border-[#3182f6]/40 hover:text-[#3182f6]" href="/submit">
                만든 툴 제보하기
              </Link>
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(2,32,71,0.05)]">
            <p className="text-xs font-black uppercase text-slate-400">Disclosure</p>
            <h2 className="mt-2 text-xl font-black text-slate-950">돈을 받는 노출은 표시합니다</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              제휴 링크나 스폰서 요청은 추천 근거와 섞지 않습니다. 가격, 환불, 사용량 제한은 항상 공식 페이지 확인을 전제로 안내합니다.
            </p>
            <Link className="mt-4 inline-flex text-sm font-black text-[#3182f6]" href="/affiliate">
              제휴 안내 보기
            </Link>
          </aside>
        </div>
      </section>

      <section className="methodology-levels mx-auto grid w-full max-w-[1120px] gap-3 px-4 py-6 md:grid-cols-3 md:px-6">
        {reviewLevels.map(([title, description]) => (
          <article className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(2,32,71,0.04)]" key={title}>
            <h2 className="text-lg font-black text-slate-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-4 py-8 md:px-6">
        <div className="grid gap-6 rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(2,32,71,0.04)] md:p-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div>
            <p className="text-xs font-black uppercase text-slate-400">Editorial Rules</p>
            <h2 className="mt-2 text-2xl font-black leading-tight text-slate-950">툴 소개에 반드시 넣는 네 가지</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              이 네 가지가 없으면 확신 있는 추천처럼 보이지 않게 유지합니다.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {sourceRules.map(([title, description]) => (
              <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4" key={title}>
                <h3 className="text-base font-black text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-4 py-8 md:px-6">
        <div className="mb-5">
          <p className="text-xs font-black uppercase text-slate-400">Maker Submissions</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">바이브코딩 SaaS 제보는 이렇게 다룹니다</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {makerFlow.map(([title, description], index) => (
            <article className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(2,32,71,0.04)]" key={title}>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3182f6]/10 text-xs font-black text-[#3182f6]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-base font-black text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="methodology-disclosure mx-auto w-full max-w-[1120px] px-4 pb-16 pt-8 md:px-6">
        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(2,32,71,0.04)] md:p-6">
          <p className="text-xs font-black uppercase text-slate-400">Final Rule</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">제휴와 스폰서는 숨기지 않습니다</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
            일부 링크는 제휴 링크일 수 있고, 메이커가 유료 소개를 요청할 수도 있습니다. 다만 제휴 가능성은 툴의 검수 근거가 아니며,
            추천 여부와 스폰서 여부는 페이지 안에서 분리해 표시합니다.
          </p>
        </div>
      </section>
    </main>
  );
}
