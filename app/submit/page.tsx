import type { Metadata } from "next";

const submissionTypes = [
  "AI 자동화 툴",
  "한국 SaaS",
  "마케팅 SaaS",
  "크리에이터 툴",
  "생산성 툴",
  "노코드 툴",
];

const reviewSteps = [
  ["1", "기본 정보 확인", "툴 이름, 링크, 카테고리, 한국 사용자가 이해할 만한 설명을 먼저 봅니다."],
  ["2", "사용 맥락 정리", "누가 쓰면 좋은지, 어떤 업무 시간을 줄이는지, 실제 장점과 한계를 나눠봅니다."],
  ["3", "큐레이션 반영", "홈, 툴 디렉토리, 추천 섹션, 제휴 영역 중 어울리는 위치를 골라 노출합니다."],
];

const checklist = [
  "국내 사용자가 가입하거나 써볼 수 있는 링크가 있나요?",
  "가격, 무료체험, 데모 여부를 설명할 수 있나요?",
  "과장된 홍보 문구보다 실제 사용 사례를 말할 수 있나요?",
  "제휴 링크나 할인 코드가 있다면 함께 제공할 수 있나요?",
];

export const metadata: Metadata = {
  title: "툴 홍보하기",
  description: "AIDailyPick에 AI 자동화 툴, 한국 SaaS, 생산성 도구를 제안해보세요.",
  alternates: {
    canonical: "/submit",
  },
};

export default function SubmitToolPage() {
  return (
    <main className="bg-[#070812] text-white">
      <section className="mx-auto grid w-full max-w-[1180px] gap-10 px-4 py-14 md:px-6 md:py-18 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-white/65">
            Submit Tool
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            한국 사용자에게 보여줄
            <span className="block bg-[linear-gradient(135deg,#FCAF45_0%,#FD1D6C_45%,#A855F7_100%)] bg-clip-text text-transparent">
              좋은 SaaS를 찾고 있어요.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/60">
            AIDailyPick은 자동화 툴로 시작하지만, 장기적으로는 한국인이 만든 SaaS와 생산성 도구까지 모으는 큐레이션 플랫폼입니다.
            아직은 더미 폼 단계라 제출 데이터는 저장되지 않지만, 실제 관리자 기능을 붙이기 전 화면 흐름을 먼저 잡아둡니다.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {submissionTypes.map((type) => (
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4" key={type}>
                <p className="text-sm font-black text-white">{type}</p>
                <p className="mt-1 text-xs leading-5 text-white/45">카테고리 확장에 맞춰 등록 가능</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.32)]">
          <p className="text-xs font-black uppercase text-pink-200/80">Creator Friendly</p>
          <h2 className="mt-2 text-2xl font-black text-white">홍보처럼 보이기보다, 쓸 이유가 보이게.</h2>
          <p className="mt-3 text-sm leading-6 text-white/55">
            단순 광고 배너보다 “누가 왜 써야 하는지”가 분명한 툴을 우선 소개합니다.
          </p>
          <div className="mt-5 rounded-2xl border border-white/10 bg-[#070812]/70 p-4">
            <p className="text-[11px] font-bold uppercase text-white/35">Google AdSense</p>
            <p className="mt-1 text-sm font-semibold text-white/65">제출 페이지 사이드 광고 영역</p>
          </div>
        </aside>
      </section>

      <section className="mx-auto grid w-full max-w-[1180px] gap-8 px-4 py-8 md:px-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <form className="rounded-3xl border border-white/10 bg-white/[0.055] p-5 md:p-7">
          <div className="mb-6">
            <p className="text-xs font-black uppercase text-orange-200/80">Tool Form</p>
            <h2 className="mt-2 text-2xl font-black text-white">툴 정보 입력</h2>
            <p className="mt-2 text-sm leading-6 text-white/50">MVP 단계에서는 화면만 준비해두고, 저장/전송 기능은 다음 단계에서 연결합니다.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-white/70">
              툴 이름
              <input className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none placeholder:text-white/30 focus:border-pink-300/60" placeholder="예: MyAutomation" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-white/70">
              공식 링크
              <input className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none placeholder:text-white/30 focus:border-pink-300/60" placeholder="https://example.com" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-white/70">
              카테고리
              <select className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none focus:border-pink-300/60" defaultValue="">
                <option disabled value="">
                  카테고리 선택
                </option>
                {submissionTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-white/70">
              추천 대상
              <select className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none focus:border-pink-300/60" defaultValue="">
                <option disabled value="">
                  가장 잘 맞는 사용자
                </option>
                <option>셀러</option>
                <option>크리에이터</option>
                <option>마케터</option>
                <option>1인 사업자</option>
                <option>운영자</option>
              </select>
            </label>
          </div>

          <label className="mt-4 grid gap-2 text-sm font-bold text-white/70">
            한 줄 소개
            <input className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none placeholder:text-white/30 focus:border-pink-300/60" placeholder="어떤 시간을 줄여주는 툴인지 한 문장으로 적어주세요" />
          </label>

          <label className="mt-4 grid gap-2 text-sm font-bold text-white/70">
            사용 사례와 제휴 정보
            <textarea
              className="min-h-36 rounded-xl border border-white/10 bg-[#111326] px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-pink-300/60"
              placeholder="주요 기능, 무료체험 여부, 할인 코드, 실제 사용 사례를 적어주세요."
            />
          </label>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button className="rounded-xl bg-[linear-gradient(135deg,#FF7A18_0%,#FF2D95_45%,#8B5CF6_100%)] px-6 py-3 text-sm font-black text-white shadow-[0_14px_45px_rgba(255,45,149,0.28)]" type="button">
              제출 화면 미리보기
            </button>
            <p className="text-xs leading-5 text-white/40">실제 제출 저장은 관리자/DB 연결 단계에서 활성화됩니다.</p>
          </div>
        </form>

        <aside className="grid h-fit gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
            <p className="text-xs font-black uppercase text-pink-200/80">Checklist</p>
            <h2 className="mt-2 text-xl font-black text-white">제출 전 확인</h2>
            <div className="mt-4 grid gap-3">
              {checklist.map((item) => (
                <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3" key={item}>
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-300" />
                  <p className="text-sm leading-6 text-white/60">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
            <p className="text-xs font-black uppercase text-orange-200/80">Review Flow</p>
            <div className="mt-4 grid gap-4">
              {reviewSteps.map(([number, title, description]) => (
                <div className="flex gap-3" key={number}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xs font-black text-white">{number}</span>
                  <div>
                    <h3 className="text-sm font-black text-white">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-white/45">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
