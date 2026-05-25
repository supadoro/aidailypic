import type { ContactSubmission } from "@/src/data/admin-inbox-storage";

export type AdminContactSubmissionQueue = "all" | "open" | "partnership" | "support" | "done";

export type AdminContactSubmissionOperationSummary = {
  total: number;
  open: number;
  partnership: number;
  support: number;
  done: number;
};

const partnershipSignals = ["제휴", "광고", "스폰서", "협업", "입점", "유료", "파트너", "sponsor", "partner"];
const supportSignals = ["오류", "버그", "안됨", "문제", "로그인", "결제", "저장", "수정", "지원", "error", "bug", "support"];

function includesAny(text: string, signals: string[]): boolean {
  const normalized = text.toLowerCase();
  return signals.some((signal) => normalized.includes(signal.toLowerCase()));
}

function getContactSearchText(item: ContactSubmission): string {
  return [item.topic, item.message, item.name, item.email].join("\n");
}

function isOpenContact(item: ContactSubmission): boolean {
  return item.status === "new" || item.status === "reviewing";
}

function isDoneContact(item: ContactSubmission): boolean {
  return item.status === "done";
}

function isPartnershipContact(item: ContactSubmission): boolean {
  return includesAny(getContactSearchText(item), partnershipSignals);
}

function isSupportContact(item: ContactSubmission): boolean {
  return includesAny(getContactSearchText(item), supportSignals);
}

export function getContactSubmissionOperationSummary(items: ContactSubmission[]): AdminContactSubmissionOperationSummary {
  return items.reduce<AdminContactSubmissionOperationSummary>(
    (summary, item) => {
      summary.total += 1;
      if (isOpenContact(item)) summary.open += 1;
      if (isPartnershipContact(item)) summary.partnership += 1;
      if (isSupportContact(item)) summary.support += 1;
      if (isDoneContact(item)) summary.done += 1;
      return summary;
    },
    { total: 0, open: 0, partnership: 0, support: 0, done: 0 },
  );
}

export function filterContactSubmissionsForAdmin(items: ContactSubmission[], queue: AdminContactSubmissionQueue): ContactSubmission[] {
  if (queue === "all") return [...items];
  if (queue === "open") return items.filter(isOpenContact);
  if (queue === "partnership") return items.filter(isPartnershipContact);
  if (queue === "support") return items.filter(isSupportContact);
  return items.filter(isDoneContact);
}
