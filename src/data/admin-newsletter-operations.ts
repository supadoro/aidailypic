import type { NewsletterSubmission } from "@/src/data/admin-inbox-storage";

export type AdminNewsletterSubmissionQueue = "all" | "open" | "maker" | "koreanSaas" | "automation" | "done";

export type AdminNewsletterSubmissionOperationSummary = {
  total: number;
  open: number;
  maker: number;
  koreanSaas: number;
  automation: number;
  done: number;
};

const makerSignals = ["1인", "창업", "메이커", "런칭", "launch", "submit", "maker"];
const koreanSaasSignals = ["한국 SaaS", "국내", "K-SaaS", "korean", "k-saas"];
const automationSignals = ["AI 자동화", "자동화", "AI", "automation"];

function includesAny(text: string, signals: string[]): boolean {
  const normalized = text.toLowerCase();
  return signals.some((signal) => normalized.includes(signal.toLowerCase()));
}

function getNewsletterSearchText(item: NewsletterSubmission): string {
  return [item.interest, item.source, item.email].join("\n");
}

function isOpenNewsletter(item: NewsletterSubmission): boolean {
  return item.status === "new" || item.status === "reviewing";
}

function isDoneNewsletter(item: NewsletterSubmission): boolean {
  return item.status === "done";
}

function isMakerNewsletter(item: NewsletterSubmission): boolean {
  return includesAny(getNewsletterSearchText(item), makerSignals);
}

function isKoreanSaasNewsletter(item: NewsletterSubmission): boolean {
  return includesAny(getNewsletterSearchText(item), koreanSaasSignals);
}

function isAutomationNewsletter(item: NewsletterSubmission): boolean {
  return includesAny(getNewsletterSearchText(item), automationSignals);
}

export function getNewsletterSubmissionOperationSummary(items: NewsletterSubmission[]): AdminNewsletterSubmissionOperationSummary {
  return items.reduce<AdminNewsletterSubmissionOperationSummary>(
    (summary, item) => {
      summary.total += 1;
      if (isOpenNewsletter(item)) summary.open += 1;
      if (isMakerNewsletter(item)) summary.maker += 1;
      if (isKoreanSaasNewsletter(item)) summary.koreanSaas += 1;
      if (isAutomationNewsletter(item)) summary.automation += 1;
      if (isDoneNewsletter(item)) summary.done += 1;
      return summary;
    },
    { total: 0, open: 0, maker: 0, koreanSaas: 0, automation: 0, done: 0 },
  );
}

export function filterNewsletterSubmissionsForAdmin(items: NewsletterSubmission[], queue: AdminNewsletterSubmissionQueue): NewsletterSubmission[] {
  if (queue === "all") return [...items];
  if (queue === "open") return items.filter(isOpenNewsletter);
  if (queue === "maker") return items.filter(isMakerNewsletter);
  if (queue === "koreanSaas") return items.filter(isKoreanSaasNewsletter);
  if (queue === "automation") return items.filter(isAutomationNewsletter);
  return items.filter(isDoneNewsletter);
}
