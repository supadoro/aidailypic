"use client";

export type ToolSubmission = {
  id: string;
  type: "tool";
  createdAt: string;
  status: "new" | "reviewing" | "done";
  toolName: string;
  websiteUrl: string;
  category: string;
  audience: string;
  contactEmail: string;
  summary: string;
  details: string;
};

export type ContactSubmission = {
  id: string;
  type: "contact";
  createdAt: string;
  status: "new" | "reviewing" | "done";
  name: string;
  email: string;
  topic: string;
  message: string;
};

const TOOL_SUBMISSIONS_KEY = "aidailypick.tool-submissions";
const CONTACT_SUBMISSIONS_KEY = "aidailypick.contact-submissions";

function safeParseArray<T>(raw: string | null): T[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function readToolSubmissions(): ToolSubmission[] {
  if (typeof window === "undefined") return [];
  return safeParseArray<ToolSubmission>(window.localStorage.getItem(TOOL_SUBMISSIONS_KEY)).filter((item) => item?.id && item?.toolName);
}

export function readContactSubmissions(): ContactSubmission[] {
  if (typeof window === "undefined") return [];
  return safeParseArray<ContactSubmission>(window.localStorage.getItem(CONTACT_SUBMISSIONS_KEY)).filter((item) => item?.id && item?.email);
}

export function createToolSubmission(input: Omit<ToolSubmission, "id" | "type" | "createdAt" | "status">): ToolSubmission {
  const submission: ToolSubmission = {
    ...input,
    id: createId("tool"),
    type: "tool",
    createdAt: new Date().toISOString(),
    status: "new",
  };
  const next = [submission, ...readToolSubmissions()];
  window.localStorage.setItem(TOOL_SUBMISSIONS_KEY, JSON.stringify(next));
  return submission;
}

export function createContactSubmission(input: Omit<ContactSubmission, "id" | "type" | "createdAt" | "status">): ContactSubmission {
  const submission: ContactSubmission = {
    ...input,
    id: createId("contact"),
    type: "contact",
    createdAt: new Date().toISOString(),
    status: "new",
  };
  const next = [submission, ...readContactSubmissions()];
  window.localStorage.setItem(CONTACT_SUBMISSIONS_KEY, JSON.stringify(next));
  return submission;
}

export function updateToolSubmissionStatus(id: string, status: ToolSubmission["status"]): void {
  const next = readToolSubmissions().map((item) => (item.id === id ? { ...item, status } : item));
  window.localStorage.setItem(TOOL_SUBMISSIONS_KEY, JSON.stringify(next));
}

export function updateContactSubmissionStatus(id: string, status: ContactSubmission["status"]): void {
  const next = readContactSubmissions().map((item) => (item.id === id ? { ...item, status } : item));
  window.localStorage.setItem(CONTACT_SUBMISSIONS_KEY, JSON.stringify(next));
}

export function deleteToolSubmission(id: string): void {
  const next = readToolSubmissions().filter((item) => item.id !== id);
  window.localStorage.setItem(TOOL_SUBMISSIONS_KEY, JSON.stringify(next));
}

export function deleteContactSubmission(id: string): void {
  const next = readContactSubmissions().filter((item) => item.id !== id);
  window.localStorage.setItem(CONTACT_SUBMISSIONS_KEY, JSON.stringify(next));
}
