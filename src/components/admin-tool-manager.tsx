"use client";

import { useMemo, useState } from "react";

import {
  clearCustomToolsFromStorage,
  deleteToolBySlug,
  getBaseTools,
  getClientTools,
  readDeletedToolSlugsFromStorage,
  restoreBaseToolBySlug,
  upsertCustomTool,
  type ToolFormInput,
} from "@/src/data/admin-tool-storage";
import {
  audienceLabels,
  categoryFilters,
  futureCategoryFilters,
  type AudienceKey,
  type SaasCategory,
  type SaasTool,
} from "@/src/data/saas-directory";

const audienceOptions: AudienceKey[] = ["seller", "creator", "marketer", "solo", "operator"];
const pricingOptions: Array<SaasTool["pricing"]> = ["무료체험", "Freemium", "유료", "문의"];

const categoryOptions = [
  ...categoryFilters.filter((item) => item.id !== "all").map((item) => ({ id: item.id as SaasCategory, label: item.label })),
  ...futureCategoryFilters.map((item) => ({ id: item.id, label: item.label })),
];

const emptyForm: ToolFormInput = {
  name: "",
  logoText: "",
  shortDescription: "",
  category: "writing",
  categoryLabel: "글쓰기 자동화",
  tags: [],
  pricing: "Freemium",
  bestFor: ["solo"],
  sourceSignal: "",
  affiliateUrl: "#",
  isFeatured: false,
  isSponsored: false,
  isTested: false,
  pros: [],
  cons: [],
  useCases: [],
  verdict: "",
};

function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function arrayToLines(value?: string[]): string {
  return value?.join("\n") ?? "";
}

function toolToForm(tool: SaasTool): ToolFormInput {
  return {
    slug: tool.slug,
    name: tool.name,
    logoText: tool.logoText,
    shortDescription: tool.shortDescription,
    category: tool.category,
    categoryLabel: tool.categoryLabel,
    tags: tool.tags,
    pricing: tool.pricing,
    bestFor: tool.bestFor,
    sourceSignal: tool.sourceSignal,
    affiliateUrl: tool.affiliateUrl,
    isFeatured: Boolean(tool.isFeatured),
    isSponsored: Boolean(tool.isSponsored),
    isTested: Boolean(tool.isTested),
    pros: tool.pros ?? [],
    cons: tool.cons ?? [],
    useCases: tool.useCases ?? [],
    verdict: tool.verdict ?? "",
  };
}

export function AdminToolManager() {
  const [form, setForm] = useState<ToolFormInput>(emptyForm);
  const [tagText, setTagText] = useState("");
  const [prosText, setProsText] = useState("");
  const [consText, setConsText] = useState("");
  const [useCasesText, setUseCasesText] = useState("");
  const [notice, setNotice] = useState("");
  const [tools, setTools] = useState(() => getClientTools());
  const [deletedBaseSlugs, setDeletedBaseSlugs] = useState(() => new Set(readDeletedToolSlugsFromStorage()));

  const baseTools = useMemo(() => getBaseTools(), []);
  const customCount = tools.filter((tool) => !baseTools.some((baseTool) => baseTool.slug === tool.slug)).length;

  const refresh = () => {
    setTools(getClientTools());
    setDeletedBaseSlugs(new Set(readDeletedToolSlugsFromStorage()));
  };

  const updateCategory = (category: SaasCategory) => {
    const label = categoryOptions.find((item) => item.id === category)?.label ?? form.categoryLabel;
    setForm((prev) => ({ ...prev, category, categoryLabel: label }));
  };

  const toggleAudience = (audience: AudienceKey) => {
    setForm((prev) => {
      const next = prev.bestFor.includes(audience) ? prev.bestFor.filter((item) => item !== audience) : [...prev.bestFor, audience];
      return { ...prev, bestFor: next };
    });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setTagText("");
    setProsText("");
    setConsText("");
    setUseCasesText("");
  };

  const editTool = (tool: SaasTool) => {
    const next = toolToForm(tool);
    setForm(next);
    setTagText(tool.tags.join(", "));
    setProsText(arrayToLines(tool.pros));
    setConsText(arrayToLines(tool.cons));
    setUseCasesText(arrayToLines(tool.useCases));
    setNotice(`${tool.name} 수정 모드입니다. 저장하면 브라우저 관리자 데이터에 반영됩니다.`);
  };

  const saveTool = () => {
    if (!form.name.trim() || !form.shortDescription.trim() || !form.categoryLabel.trim()) {
      setNotice("툴 이름, 한 줄 설명, 카테고리 라벨은 꼭 입력해주세요.");
      return;
    }

    const saved = upsertCustomTool({
      ...form,
      tags: tagText.split(",").map((item) => item.trim()),
      pros: linesToArray(prosText),
      cons: linesToArray(consText),
      useCases: linesToArray(useCasesText),
    });

    refresh();
    resetForm();
    setNotice(`${saved.name} 저장 완료. 현재 브라우저의 관리자 데이터에 반영됐습니다.`);
  };

  const removeTool = (slug: string) => {
    deleteToolBySlug(slug);
    refresh();
    setNotice("툴을 삭제하거나 기본 목록에서 숨김 처리했습니다.");
  };

  const restoreTool = (slug: string) => {
    restoreBaseToolBySlug(slug);
    refresh();
    setNotice("기본 툴을 복원했습니다.");
  };

  const resetAll = () => {
    clearCustomToolsFromStorage();
    refresh();
    resetForm();
    setNotice("브라우저에 저장된 관리자 툴 데이터를 초기화했습니다.");
  };

  return (
    <section className="admin-tool-manager-panel space-y-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
      <header className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-blue-700">
            SaaS Admin
          </p>
          <h1 className="mt-3 text-3xl font-black text-slate-950">툴 카탈로그 관리</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            DB 연결 전 단계라 브라우저 localStorage에 저장됩니다. 실제 운영 전에는 이 구조를 서버 저장 방식으로 옮기면 됩니다.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-2xl font-black text-slate-950">{tools.length}</p>
            <p className="text-xs font-bold text-slate-500">노출 툴</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-2xl font-black text-slate-950">{customCount}</p>
            <p className="text-xs font-bold text-slate-500">직접 추가</p>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="admin-tool-editor-panel space-y-4 rounded-3xl border border-slate-200 bg-white p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-slate-500">
              툴 이름
              <input className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-slate-950 outline-none focus:border-[#3182f6]" onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} value={form.name} />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-500">
              로고 글자
              <input className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-slate-950 outline-none focus:border-[#3182f6]" onChange={(event) => setForm((prev) => ({ ...prev, logoText: event.target.value }))} placeholder="예: AI" value={form.logoText} />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-500">
              카테고리
              <select className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-slate-950 outline-none focus:border-[#3182f6]" onChange={(event) => updateCategory(event.target.value as SaasCategory)} value={form.category}>
                {categoryOptions.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-500">
              가격
              <select className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-slate-950 outline-none focus:border-[#3182f6]" onChange={(event) => setForm((prev) => ({ ...prev, pricing: event.target.value as SaasTool["pricing"] }))} value={form.pricing}>
                {pricingOptions.map((pricing) => (
                  <option key={pricing}>{pricing}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="grid gap-2 text-sm font-bold text-slate-500">
            한 줄 설명
            <input className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-slate-950 outline-none focus:border-[#3182f6]" onChange={(event) => setForm((prev) => ({ ...prev, shortDescription: event.target.value }))} value={form.shortDescription} />
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-500">
            커뮤니티 신호
            <input className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-slate-950 outline-none focus:border-[#3182f6]" onChange={(event) => setForm((prev) => ({ ...prev, sourceSignal: event.target.value }))} placeholder="예: 스레드에서 자주 언급" value={form.sourceSignal} />
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-500">
            제휴/공식 링크
            <input className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-slate-950 outline-none focus:border-[#3182f6]" onChange={(event) => setForm((prev) => ({ ...prev, affiliateUrl: event.target.value }))} value={form.affiliateUrl} />
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-500">
            태그
            <input className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-slate-950 outline-none focus:border-[#3182f6]" onChange={(event) => setTagText(event.target.value)} placeholder="쉼표로 구분: 인기, 무료체험, 셀러 추천" value={tagText} />
          </label>

          <div className="grid gap-3 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-slate-500">
              좋은 점
              <textarea className="min-h-28 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none focus:border-[#3182f6]" onChange={(event) => setProsText(event.target.value)} placeholder="줄바꿈으로 여러 개 입력" value={prosText} />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-500">
              아쉬운 점
              <textarea className="min-h-28 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none focus:border-[#3182f6]" onChange={(event) => setConsText(event.target.value)} placeholder="줄바꿈으로 여러 개 입력" value={consText} />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-bold text-slate-500">
            사용 사례
            <textarea className="min-h-24 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none focus:border-[#3182f6]" onChange={(event) => setUseCasesText(event.target.value)} placeholder="줄바꿈으로 여러 개 입력" value={useCasesText} />
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-500">
            한 줄 평가
            <textarea className="min-h-24 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none focus:border-[#3182f6]" onChange={(event) => setForm((prev) => ({ ...prev, verdict: event.target.value }))} value={form.verdict} />
          </label>

          <div className="space-y-3">
            <p className="text-sm font-bold text-slate-500">추천 대상</p>
            <div className="flex flex-wrap gap-2">
              {audienceOptions.map((audience) => (
                <button
                  className={`rounded-full border px-3 py-2 text-xs font-bold transition ${form.bestFor.includes(audience) ? "border-blue-200 bg-blue-50 text-slate-950" : "border-slate-200 bg-slate-50 text-slate-500"}`}
                  key={audience}
                  onClick={() => toggleAudience(audience)}
                  type="button"
                >
                  {audienceLabels[audience]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              ["isFeatured", "오늘의 픽"],
              ["isTested", "검증됨"],
              ["isSponsored", "스폰서"],
            ].map(([key, label]) => (
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500" key={key}>
                <input
                  checked={Boolean(form[key as keyof ToolFormInput])}
                  className="h-4 w-4 accent-[#3182f6]"
                  onChange={(event) => setForm((prev) => ({ ...prev, [key]: event.target.checked }))}
                  type="checkbox"
                />
                {label}
              </label>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl bg-[#3182f6] px-5 py-3 text-sm font-black text-white" onClick={saveTool} type="button">
              저장하기
            </button>
            <button className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-500 hover:text-slate-950" onClick={resetForm} type="button">
              입력 초기화
            </button>
            <button className="rounded-xl border border-rose-200 px-5 py-3 text-sm font-bold text-rose-700 hover:text-rose-700" onClick={resetAll} type="button">
              관리자 데이터 초기화
            </button>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-black uppercase text-blue-700">Current Tools</p>
            <div className="mt-4 max-h-[720px] space-y-3 overflow-auto pr-1">
              {tools.map((tool) => (
                <div className="rounded-2xl border border-slate-200 bg-white p-4" key={tool.slug}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-slate-950">{tool.name}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {tool.categoryLabel} / {tool.slug}
                      </p>
                    </div>
                    {tool.isSponsored ? <span className="rounded-full bg-orange-50 px-2 py-1 text-[10px] font-bold text-orange-700">AD</span> : null}
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{tool.shortDescription}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500" onClick={() => editTool(tool)} type="button">
                      수정
                    </button>
                    <button className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700" onClick={() => removeTool(tool.slug)} type="button">
                      삭제/숨김
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-black uppercase text-orange-700">Hidden Base Tools</p>
            <div className="mt-4 space-y-2">
              {baseTools.filter((tool) => deletedBaseSlugs.has(tool.slug)).length ? (
                baseTools
                  .filter((tool) => deletedBaseSlugs.has(tool.slug))
                  .map((tool) => (
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2" key={`hidden-${tool.slug}`}>
                      <span className="text-xs font-bold text-slate-500">{tool.name}</span>
                      <button className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700" onClick={() => restoreTool(tool.slug)} type="button">
                        복원
                      </button>
                    </div>
                  ))
              ) : (
                <p className="text-sm text-slate-500">숨김 처리된 기본 툴이 없습니다.</p>
              )}
            </div>
          </div>
        </aside>
      </div>

      {notice ? <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-500">{notice}</p> : null}
    </section>
  );
}
