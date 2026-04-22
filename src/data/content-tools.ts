import type { ToolProfile } from "@/src/data/content-types";

export const toolProfiles: ToolProfile[] = [
  {
    slug: "kling-ai",
    name: "Kling AI",
    tagline: "Cinematic AI video generation for narrative content",
    summary:
      "Kling AI focuses on motion-heavy outputs with scene-level control, making it suitable for creators building ad creatives and story-driven visuals.",
    website: "https://klingai.com",
    strengths: ["Strong motion quality", "Good scene continuity", "Flexible style output"],
    bestFor: ["Video creatives", "Short ads", "Storyboard iteration"],
    relatedArticleSlugs: ["kling-ai-video-direction-playbook", "kling-ai-shot-consistency-guide"],
  },
  {
    slug: "suno-ai",
    name: "Suno AI",
    tagline: "Fast AI music generation from text",
    summary:
      "Suno AI is optimized for generating vocals, hooks, and mood-specific tracks quickly, useful for marketing and creator publishing loops.",
    website: "https://suno.com",
    strengths: ["Rapid song generation", "Genre variety", "Useful prompt controls"],
    bestFor: ["Jingles", "Background tracks", "Creator music drafts"],
    relatedArticleSlugs: ["suno-ai-lyrics-to-hook-method", "suno-vs-kling-content-funnel"],
  },
  {
    slug: "nanobanana-ai",
    name: "Nanobanana AI",
    tagline: "Visual asset production for publishing teams",
    summary:
      "Nanobanana AI helps teams build repeatable visual systems for thumbnails and social cards with scalable workflows.",
    website: "https://example.com/nanobanana-ai",
    strengths: ["Template-friendly output", "Batch operations", "Fast turnaround"],
    bestFor: ["Thumbnail systems", "Campaign visual packs", "Publishing ops"],
    relatedArticleSlugs: ["nanobanana-ai-thumbnail-system"],
  },
  {
    slug: "claud-ai",
    name: "Claud AI",
    tagline: "Long-context writing and research assistance",
    summary:
      "Claud AI is useful for long-document synthesis and policy-aware editing pipelines, especially in editorial and research teams.",
    website: "https://claude.ai",
    strengths: ["Long-context handling", "Clean writing tone", "Research-friendly output"],
    bestFor: ["Briefing docs", "Editorial QA", "Research synthesis"],
    relatedArticleSlugs: ["claud-ai-long-context-research-stack", "claud-vs-gpt-research-workflow"],
  },
];
