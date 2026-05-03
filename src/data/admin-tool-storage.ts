"use client";

import { saasTools, type AudienceKey, type SaasCategory, type SaasTool } from "@/src/data/saas-directory";

const CUSTOM_TOOLS_KEY = "aidailypick.custom-tools";
const DELETED_TOOL_SLUGS_KEY = "aidailypick.deleted-tool-slugs";

const baseSlugs = new Set(saasTools.map((tool) => tool.slug));

function safeParseArray<T>(raw: string | null): T[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeList(items: string[]): string[] {
  return items.map((item) => item.trim()).filter(Boolean);
}

export type ToolFormInput = {
  slug?: string;
  name: string;
  logoText: string;
  shortDescription: string;
  category: SaasCategory;
  categoryLabel: string;
  tags: string[];
  pricing: SaasTool["pricing"];
  bestFor: AudienceKey[];
  sourceSignal: string;
  affiliateUrl: string;
  isFeatured: boolean;
  isSponsored: boolean;
  isTested: boolean;
  pros: string[];
  cons: string[];
  useCases: string[];
  verdict: string;
};

export function readCustomToolsFromStorage(): SaasTool[] {
  if (typeof window === "undefined") return [];
  const items = safeParseArray<SaasTool>(window.localStorage.getItem(CUSTOM_TOOLS_KEY));
  return items.filter((item) => Boolean(item?.slug && item?.name));
}

export function writeCustomToolsToStorage(tools: SaasTool[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CUSTOM_TOOLS_KEY, JSON.stringify(tools));
}

export function readDeletedToolSlugsFromStorage(): string[] {
  if (typeof window === "undefined") return [];
  const slugs = safeParseArray<string>(window.localStorage.getItem(DELETED_TOOL_SLUGS_KEY));
  return slugs.filter((slug): slug is string => typeof slug === "string");
}

export function writeDeletedToolSlugsToStorage(slugs: string[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DELETED_TOOL_SLUGS_KEY, JSON.stringify(slugs));
}

export function getBaseTools(): SaasTool[] {
  return saasTools;
}

export function getClientTools(): SaasTool[] {
  const customTools = readCustomToolsFromStorage();
  const deletedSlugs = new Set(readDeletedToolSlugsFromStorage());
  const merged = [...customTools, ...saasTools.filter((tool) => !deletedSlugs.has(tool.slug))];
  const deduped = new Map<string, SaasTool>();

  for (const tool of merged) {
    if (!deduped.has(tool.slug)) {
      deduped.set(tool.slug, tool);
    }
  }

  return [...deduped.values()];
}

export function upsertCustomTool(input: ToolFormInput): SaasTool {
  const slug = input.slug?.trim() || slugify(input.name);
  const safeSlug = slug || `tool-${Date.now()}`;
  const tool: SaasTool = {
    id: safeSlug,
    slug: safeSlug,
    name: input.name.trim(),
    logoText: input.logoText.trim().slice(0, 3).toUpperCase() || input.name.trim().slice(0, 2).toUpperCase(),
    shortDescription: input.shortDescription.trim(),
    category: input.category,
    categoryLabel: input.categoryLabel.trim(),
    tags: normalizeList(input.tags),
    pricing: input.pricing,
    bestFor: input.bestFor.length ? input.bestFor : ["solo"],
    sourceSignal: input.sourceSignal.trim(),
    affiliateUrl: input.affiliateUrl.trim() || "#",
    reviewUrl: `/tools/${safeSlug}`,
    isFeatured: input.isFeatured,
    isSponsored: input.isSponsored,
    isTested: input.isTested,
    pros: normalizeList(input.pros),
    cons: normalizeList(input.cons),
    useCases: normalizeList(input.useCases),
    verdict: input.verdict.trim(),
  };

  const current = readCustomToolsFromStorage();
  const next = [tool, ...current.filter((item) => item.slug !== tool.slug)];
  writeCustomToolsToStorage(next);

  if (baseSlugs.has(tool.slug)) {
    const deleted = readDeletedToolSlugsFromStorage().filter((item) => item !== tool.slug);
    writeDeletedToolSlugsToStorage(deleted);
  }

  return tool;
}

export function deleteToolBySlug(slug: string): void {
  if (baseSlugs.has(slug)) {
    const deleted = new Set(readDeletedToolSlugsFromStorage());
    deleted.add(slug);
    writeDeletedToolSlugsToStorage([...deleted]);
  }

  const nextCustom = readCustomToolsFromStorage().filter((item) => item.slug !== slug);
  writeCustomToolsToStorage(nextCustom);
}

export function restoreBaseToolBySlug(slug: string): void {
  const nextDeleted = readDeletedToolSlugsFromStorage().filter((item) => item !== slug);
  writeDeletedToolSlugsToStorage(nextDeleted);
}

export function clearCustomToolsFromStorage(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CUSTOM_TOOLS_KEY);
  window.localStorage.removeItem(DELETED_TOOL_SLUGS_KEY);
}
