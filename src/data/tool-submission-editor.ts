import type { ToolSubmission } from "@/src/data/admin-inbox-storage";

export type ToolSubmissionEditInput = Partial<
  Pick<ToolSubmission, "toolName" | "websiteUrl" | "category" | "audience" | "contactEmail" | "summary" | "details" | "mediaUrl" | "publicConsent">
>;

export type ToolSubmissionEditDraft = Pick<ToolSubmission, "toolName" | "websiteUrl" | "category" | "audience" | "contactEmail" | "summary" | "details" | "mediaUrl" | "publicConsent">;

function clean(value: string | undefined): string {
  return value?.trim() ?? "";
}

function editValue(current: string, next: string | undefined): string {
  return next === undefined ? current : clean(next);
}

export function createToolSubmissionEditDraft(item: ToolSubmission): ToolSubmissionEditDraft {
  return {
    toolName: item.toolName,
    websiteUrl: item.websiteUrl,
    category: item.category,
    audience: item.audience,
    contactEmail: item.contactEmail,
    summary: item.summary,
    details: item.details,
    mediaUrl: item.mediaUrl ?? "",
    publicConsent: Boolean(item.publicConsent),
  };
}

export function applyToolSubmissionEdit(item: ToolSubmission, edit: ToolSubmissionEditInput): ToolSubmission {
  return {
    ...item,
    toolName: editValue(item.toolName, edit.toolName),
    websiteUrl: editValue(item.websiteUrl, edit.websiteUrl),
    category: editValue(item.category, edit.category),
    audience: editValue(item.audience, edit.audience),
    contactEmail: editValue(item.contactEmail, edit.contactEmail),
    summary: editValue(item.summary, edit.summary),
    details: editValue(item.details, edit.details),
    mediaUrl: edit.mediaUrl === undefined ? item.mediaUrl : clean(edit.mediaUrl),
    publicConsent: edit.publicConsent === undefined ? Boolean(item.publicConsent) : Boolean(edit.publicConsent),
  };
}
