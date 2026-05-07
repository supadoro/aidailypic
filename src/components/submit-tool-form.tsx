"use client";

import { useState } from "react";

import { createToolSubmission } from "@/src/data/admin-inbox-storage";
import { categoryFilters, futureCategoryFilters } from "@/src/data/saas-directory";
import { submitToServer } from "@/src/data/submission-api";

const submissionTypes = [
  ...categoryFilters.filter((item) => item.id !== "all").map((item) => item.label),
  ...futureCategoryFilters.map((item) => item.label),
];
const audiences = ["셀러", "크리에이터", "마케터", "1인 사업자", "운영자"];
const buildStacks = ["Cursor", "Claude Code", "Lovable", "v0", "Replit", "Bolt", "기타/직접 개발"];
const launchStages = ["아이디어 검증", "MVP 공개", "베타 운영", "유료 고객 있음", "정식 출시"];
const promotionGoals = ["무료 제보", "초보자 테스트 리뷰", "런칭 스폰서", "뉴스레터/SNS 소개", "피드백 리포트 상담"];

function FieldBadge({ children, tone = "optional" }: { children: string; tone?: "required" | "optional" }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[10px] font-black ${
        tone === "required" ? "border-pink-300/30 bg-pink-300/10 text-pink-100" : "border-white/10 bg-white/[0.045] text-white/35"
      }`}
    >
      {children}
    </span>
  );
}

function FormSectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#070812]/55 p-4">
      <p className="text-xs font-black uppercase text-orange-200/70">{eyebrow}</p>
      <h3 className="mt-1 text-lg font-black text-white">{title}</h3>
      <p className="mt-1 text-xs leading-5 text-white/45">{description}</p>
    </div>
  );
}

const initialForm = {
  makerName: "",
  toolName: "",
  websiteUrl: "",
  category: "",
  audience: "",
  buildStack: "",
  launchStage: "",
  promotionGoal: "",
  pricingInfo: "",
  mediaUrl: "",
  publicConsent: "",
  contactEmail: "",
  summary: "",
  details: "",
};

export function SubmitToolForm() {
  const [form, setForm] = useState(initialForm);
  const [notice, setNotice] = useState("");

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async () => {
    if (!form.toolName.trim() || !form.websiteUrl.trim() || !form.category || !form.contactEmail.trim() || !form.summary.trim()) {
      setNotice("툴 이름, 데모/공식 링크, 카테고리, 연락 이메일, 한 줄 소개는 꼭 입력해주세요.");
      return;
    }

    const enrichedDetails = [
      form.makerName.trim() ? `만든 사람/팀: ${form.makerName.trim()}` : "",
      form.buildStack ? `바이브코딩/개발 도구: ${form.buildStack}` : "",
      form.launchStage ? `출시 단계: ${form.launchStage}` : "",
      form.promotionGoal ? `원하는 소개 방식: ${form.promotionGoal}` : "",
      form.pricingInfo.trim() ? `가격/무료 플랜: ${form.pricingInfo.trim()}` : "",
      form.mediaUrl.trim() ? `제품 이미지/스크린샷: ${form.mediaUrl.trim()}` : "",
      form.publicConsent === "yes" ? "공개 소개 동의: 동의" : "공개 소개 동의: 미동의/확인 필요",
      form.details.trim() ? `추가 설명:\n${form.details.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    const payload = {
      type: "tool",
      toolName: form.toolName.trim(),
      websiteUrl: form.websiteUrl.trim(),
      category: form.category,
      audience: form.audience || "미정",
      contactEmail: form.contactEmail.trim(),
      summary: form.summary.trim(),
      details: enrichedDetails,
      mediaUrl: form.mediaUrl.trim(),
      publicConsent: form.publicConsent === "yes",
    };
    const serverSaved = await submitToServer(payload);

    if (!serverSaved) {
      createToolSubmission({
        toolName: payload.toolName,
        websiteUrl: payload.websiteUrl,
        category: payload.category,
        audience: payload.audience,
        contactEmail: payload.contactEmail,
        summary: payload.summary,
        details: payload.details,
        mediaUrl: payload.mediaUrl,
        publicConsent: payload.publicConsent,
      });
    }

    setForm(initialForm);
    setNotice(serverSaved ? "제출됐습니다. 서버 저장소에 접수되었습니다." : "제출됐습니다. 서버 저장소가 없어 현재 브라우저의 관리자 페이지 제출함에 저장했습니다.");
  };

  return (
    <form className="rounded-3xl border border-white/10 bg-white/[0.055] p-5 md:p-7" onSubmit={(event) => event.preventDefault()}>
      <div className="mb-6">
        <p className="text-xs font-black uppercase text-orange-200/80">Launch Submission</p>
        <h2 className="mt-2 text-2xl font-black text-white">바이브코딩 SaaS 제보</h2>
        <p className="mt-2 text-sm leading-6 text-white/50">광고 문구보다 데모 가능 여부, 타깃 사용자, 무료 범위, 실제 사용 시나리오를 먼저 봅니다.</p>
      </div>

      <FormSectionTitle eyebrow="Required" title="제출에 꼭 필요한 정보" description="툴 이름, 링크, 카테고리, 연락처, 한 줄 소개가 있어야 검토를 시작할 수 있습니다." />

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-white/70">
          <span className="flex items-center gap-2">
            툴 이름 <FieldBadge tone="required">필수</FieldBadge>
          </span>
          <input className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none placeholder:text-white/30 focus:border-pink-300/60" onChange={(event) => update("toolName", event.target.value)} placeholder="예: MyAutomation" value={form.toolName} />
        </label>
        <label className="grid gap-2 text-sm font-bold text-white/70">
          <span className="flex items-center gap-2">
            데모/공식 링크 <FieldBadge tone="required">필수</FieldBadge>
          </span>
          <input className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none placeholder:text-white/30 focus:border-pink-300/60" onChange={(event) => update("websiteUrl", event.target.value)} placeholder="https://example.com 또는 데모 URL" value={form.websiteUrl} />
        </label>
        <label className="grid gap-2 text-sm font-bold text-white/70">
          <span className="flex items-center gap-2">
            카테고리 <FieldBadge tone="required">필수</FieldBadge>
          </span>
          <select className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none focus:border-pink-300/60" onChange={(event) => update("category", event.target.value)} value={form.category}>
            <option disabled value="">
              카테고리 선택
            </option>
            {submissionTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-white/70">
          <span className="flex items-center gap-2">
            연락 이메일 <FieldBadge tone="required">필수</FieldBadge>
          </span>
          <input className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none placeholder:text-white/30 focus:border-pink-300/60" onChange={(event) => update("contactEmail", event.target.value)} placeholder="name@example.com" type="email" value={form.contactEmail} />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm font-bold text-white/70">
        <span className="flex items-center gap-2">
          한 줄 소개 <FieldBadge tone="required">필수</FieldBadge>
        </span>
        <input className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none placeholder:text-white/30 focus:border-pink-300/60" onChange={(event) => update("summary", event.target.value)} placeholder="누가 어떤 결과물을 얻는 툴인지 한 문장으로 적어주세요" value={form.summary} />
        <span className="text-xs font-medium leading-5 text-white/38">누가, 무슨 문제를, 어떤 결과물로 해결하는지 한 문장으로 적으면 소개 품질이 좋아집니다.</span>
      </label>

      <FormSectionTitle eyebrow="Review Context" title="소개 품질을 높이는 정보" description="타깃, 만든 도구, 출시 단계, 가격, 이미지가 있으면 광고 문구가 아니라 검토 메모처럼 정리할 수 있습니다." />

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-white/70">
          <span className="flex items-center gap-2">
            만든 사람/팀 <FieldBadge>선택</FieldBadge>
          </span>
          <input className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none placeholder:text-white/30 focus:border-pink-300/60" onChange={(event) => update("makerName", event.target.value)} placeholder="예: 1인 메이커, 팀명, 닉네임" value={form.makerName} />
        </label>
        <label className="grid gap-2 text-sm font-bold text-white/70">
          <span className="flex items-center gap-2">
            추천 대상 <FieldBadge>선택</FieldBadge>
          </span>
          <select className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none focus:border-pink-300/60" onChange={(event) => update("audience", event.target.value)} value={form.audience}>
            <option disabled value="">
              가장 잘 맞는 사용자
            </option>
            {audiences.map((audience) => (
              <option key={audience}>{audience}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-white/70">
          <span className="flex items-center gap-2">
            만든 도구 <FieldBadge>선택</FieldBadge>
          </span>
          <select className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none focus:border-pink-300/60" onChange={(event) => update("buildStack", event.target.value)} value={form.buildStack}>
            <option disabled value="">
              사용한 바이브코딩/개발 도구
            </option>
            {buildStacks.map((stack) => (
              <option key={stack}>{stack}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-white/70">
          <span className="flex items-center gap-2">
            출시 단계 <FieldBadge>선택</FieldBadge>
          </span>
          <select className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none focus:border-pink-300/60" onChange={(event) => update("launchStage", event.target.value)} value={form.launchStage}>
            <option disabled value="">
              현재 상태
            </option>
            {launchStages.map((stage) => (
              <option key={stage}>{stage}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-white/70">
          <span className="flex items-center gap-2">
            원하는 소개 방식 <FieldBadge>선택</FieldBadge>
          </span>
          <select className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none focus:border-pink-300/60" onChange={(event) => update("promotionGoal", event.target.value)} value={form.promotionGoal}>
            <option disabled value="">
              원하는 방식 선택
            </option>
            {promotionGoals.map((goal) => (
              <option key={goal}>{goal}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-white/70">
          <span className="flex items-center gap-2">
            가격/무료 플랜 <FieldBadge>선택</FieldBadge>
          </span>
          <input className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none placeholder:text-white/30 focus:border-pink-300/60" onChange={(event) => update("pricingInfo", event.target.value)} placeholder="예: 무료 플랜 있음, 월 9달러, 베타 무료" value={form.pricingInfo} />
          <span className="text-xs font-medium leading-5 text-white/38">무료 체험 제한, 유료 전환 조건, 베타 종료 예정이 있으면 숨기지 말고 적어주세요.</span>
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm font-bold text-white/70">
        <span className="flex items-center gap-2">
          제품 이미지/스크린샷 URL <FieldBadge>선택</FieldBadge>
        </span>
        <input className="min-h-12 rounded-xl border border-white/10 bg-[#111326] px-4 text-white outline-none placeholder:text-white/30 focus:border-pink-300/60" onChange={(event) => update("mediaUrl", event.target.value)} placeholder="https://... 공개 가능한 제품 화면 이미지" value={form.mediaUrl} />
        <span className="text-xs font-medium leading-5 text-white/38">공식 스크린샷, 데모 GIF, 제품 페이지 이미지, 공개 가능한 Notion/Drive 이미지 링크가 가장 좋습니다.</span>
      </label>

      <label className="mt-4 grid gap-2 text-sm font-bold text-white/70">
        <span className="flex items-center gap-2">
          데모 설명과 원하는 피드백 <FieldBadge>선택</FieldBadge>
        </span>
        <textarea className="min-h-36 rounded-xl border border-white/10 bg-[#111326] px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-pink-300/60" onChange={(event) => update("details", event.target.value)} placeholder="첫 사용자가 무엇을 눌러야 하는지, 테스트 계정이 필요한지, 소개받고 싶은 포인트나 걱정되는 부분을 적어주세요." value={form.details} />
      </label>

      <FormSectionTitle eyebrow="Publish Consent" title="공개 여부" description="동의가 있어야 런칭 보드 공개 후보로 넘길 수 있습니다." />

      <label className="mt-4 flex gap-3 rounded-2xl border border-white/10 bg-[#111326] p-4 text-sm font-bold text-white/70">
        <input checked={form.publicConsent === "yes"} className="mt-1 h-4 w-4 accent-pink-400" onChange={(event) => update("publicConsent", event.target.checked ? "yes" : "")} type="checkbox" />
        <span>
          검토 후 소개 완료로 선정되면 툴 이름, 한 줄 소개, 데모 링크, 제출한 이미지가 AIDailyPick 런칭 보드에 공개될 수 있음에 동의합니다.
          <span className="mt-1 block text-xs font-medium leading-5 text-white/40">체크하지 않아도 내부 검토는 가능하지만, 런칭 보드에 공개하지 않습니다.</span>
        </span>
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button className="rounded-xl bg-[linear-gradient(135deg,#FF7A18_0%,#FF2D95_45%,#8B5CF6_100%)] px-6 py-3 text-sm font-black text-white shadow-[0_14px_45px_rgba(255,45,149,0.28)]" onClick={submit} type="button">
          런칭 제보하기
        </button>
        <p className="text-xs leading-5 text-white/40">제보된 툴은 바로 추천으로 표시하지 않고, 검토 전 후보로 분리합니다.</p>
      </div>

      {notice ? <p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-semibold text-white/70">{notice}</p> : null}
    </form>
  );
}
