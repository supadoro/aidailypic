import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "툴 홍보하기",
  description: "AIDailyPick에 AI 자동화 툴, 한국 SaaS, 생산성 도구를 제안해보세요.",
  alternates: {
    canonical: "/submit",
  },
};

const submissionTypes = [
  ["가볍게 제보", "잘 맞는 카테고리가 있으면 에디터 기준으로 살펴봅니다."],
  ["Featured Tool", "홈, 디렉토리, 목적별 페이지에서 먼저 보이는 슬롯을 검토합니다."],
  ["Sponsored Review", "사용 목적, 장점, 아쉬운 점, 무료 플랜까지 함께 정리하는 리뷰입니다."],
  ["Newsletter Sponsor", "이번 주 써볼 만한 AI 자동화 툴 메일에 자연스럽게 소개합니다."],
];

const checklist = ["제품명과 공식 URL", "타깃 사용자", "무료 플랜/무료체험 여부", "가장 잘 해결하는 작업", "원하는 노출 방식", "제휴 링크 또는 캠페인 기간"];

export default function SubmitPage() {
  return (
    <main className="app-surface">
      <section className="mx-auto w-full max-w-[1180px] px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.86fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase text-pink-500">내 툴 알리기</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight app-text-primary md:text-5xl">직접 만든 툴이 있다면, 한국 사용자에게 알려보세요.</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 app-text-secondary">
              AI 자동화 툴, 한국 SaaS, 생산성 도구라면 좋습니다. 거창한 소개서보다 누가 쓰면 좋은지, 어떤 시간을 줄여주는지를 먼저 봅니다.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="rounded-2xl bg-[linear-gradient(135deg,#FF7A18_0%,#FF2D95_45%,#8B5CF6_100%)] px-5 py-3 text-sm font-black text-white shadow-[0_10px_28px_rgba(255,45,149,0.22)]" href="#submit-form">
                문의 정보 작성하기
              </Link>
              <Link className="rounded-2xl border border-[#eadfea] bg-white px-5 py-3 text-sm font-black app-text-secondary shadow-sm hover:border-pink-300/60" href="/contact">
                운영 문의하기
              </Link>
            </div>
          </div>

          <aside className="rounded-[28px] border border-[#eadfea] bg-white p-6 shadow-[var(--shadow-card)]">
            <p className="text-xs font-black uppercase text-pink-500">Promotion options</p>
            <div className="mt-4 grid gap-3">
              {submissionTypes.map(([title, description]) => (
                <article className="rounded-2xl border border-[#eadfea] bg-[#fff8fb] px-4 py-3" key={title}>
                  <h2 className="text-sm font-black app-text-primary">{title}</h2>
                  <p className="mt-1 text-xs leading-5 app-text-muted">{description}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>

        <section className="mt-10 rounded-[28px] border border-[#eadfea] bg-white p-6 shadow-[var(--shadow-card)] md:p-8" id="submit-form">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-xs font-black uppercase text-pink-500">Before submit</p>
              <h2 className="mt-2 text-3xl font-black app-text-primary">이 정보가 있으면 검토가 빨라집니다</h2>
              <div className="mt-5 grid gap-2">
                {checklist.map((item) => (
                  <p className="rounded-2xl border border-[#eadfea] bg-[#fff8fb] px-4 py-3 text-sm font-bold app-text-secondary" key={item}>
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <form className="grid gap-4 rounded-[24px] border border-[#eadfea] bg-[#fff8fb] p-4 md:p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold app-text-secondary">
                  툴 이름
                  <input className="min-h-12 rounded-xl border border-[#eadfea] bg-white px-4 app-text-primary outline-none focus:border-pink-300/60" name="toolName" placeholder="예: AI Daily Tool" />
                </label>
                <label className="grid gap-2 text-sm font-bold app-text-secondary">
                  공식 URL
                  <input className="min-h-12 rounded-xl border border-[#eadfea] bg-white px-4 app-text-primary outline-none focus:border-pink-300/60" name="url" placeholder="https://..." type="url" />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-bold app-text-secondary">
                어떤 사람에게 특히 잘 맞나요?
                <textarea className="min-h-28 rounded-xl border border-[#eadfea] bg-white px-4 py-3 app-text-primary outline-none focus:border-pink-300/60" name="bestFor" placeholder="예: 상세페이지 문구를 자주 만드는 셀러, 쇼츠 대본을 빠르게 뽑는 크리에이터" />
              </label>
              <label className="grid gap-2 text-sm font-bold app-text-secondary">
                어떤 작업 시간을 줄여주나요?
                <textarea className="min-h-28 rounded-xl border border-[#eadfea] bg-white px-4 py-3 app-text-primary outline-none focus:border-pink-300/60" name="useCase" placeholder="예: 상품 설명 초안, 고객 문의 답변, 광고 카피 변형, 리포트 요약" />
              </label>
              <button className="min-h-12 rounded-xl bg-[linear-gradient(135deg,#FF7A18_0%,#FF2D95_45%,#8B5CF6_100%)] px-5 text-sm font-black text-white shadow-[0_10px_28px_rgba(255,45,149,0.22)]" type="button">
                문의 정보 확인하기
              </button>
              <p className="text-xs leading-5 app-text-muted">현재는 전송 기능 없이 문의 준비 항목을 확인하는 용도입니다. 실제 문의는 운영 문의 페이지와 함께 확인합니다.</p>
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}
