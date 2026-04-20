export type TopCategoryKey = "ai-news" | "tool-reviews" | "guides" | "comparisons" | "prompting";
export type ToolCategoryKey = "kling-ai" | "suno-ai" | "nanobanana-ai" | "claud-ai";

export type ArticleItem = {
  slug: string;
  title: string;
  excerpt: string;
  topCategory: string;
  topCategorySlug: TopCategoryKey;
  toolCategory: string;
  toolCategorySlug: ToolCategoryKey;
  author: string;
  date: string;
  readMinutes: number;
  image: string;
};

export type ToolProfile = {
  slug: ToolCategoryKey;
  name: string;
  tagline: string;
  summary: string;
  website: string;
  strengths: string[];
  bestFor: string[];
  relatedArticleSlugs: string[];
};

export const topCategoryLabels: Record<TopCategoryKey, string> = {
  "ai-news": "AI News",
  "tool-reviews": "Tool Reviews",
  guides: "Guides",
  comparisons: "Comparisons",
  prompting: "Prompting",
};

export const toolCategoryLabels: Record<ToolCategoryKey, string> = {
  "kling-ai": "Kling AI",
  "suno-ai": "Suno AI",
  "nanobanana-ai": "Nanobanana AI",
  "claud-ai": "Claud AI",
};

export const featuredArticle: ArticleItem = {
  slug: "kling-ai-video-direction-playbook",
  title: "Kling AI Video Direction Playbook for Solo Creators",
  excerpt:
    "A practical editorial playbook to design narrative shots, pacing, and scene continuity inside Kling AI workflows.",
  topCategory: topCategoryLabels.guides,
  topCategorySlug: "guides",
  toolCategory: toolCategoryLabels["kling-ai"],
  toolCategorySlug: "kling-ai",
  author: "Julian Vane",
  date: "Apr 19, 2026",
  readMinutes: 12,
  image:
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=80",
};

export const feedArticles: ArticleItem[] = [
  {
    slug: "openai-google-meta-weekly-brief",
    title: "AI News Weekly: OpenAI, Google, Meta Product Updates",
    excerpt: "A concise weekly recap of major launches, pricing changes, and policy shifts.",
    topCategory: topCategoryLabels["ai-news"],
    topCategorySlug: "ai-news",
    toolCategory: toolCategoryLabels["claud-ai"],
    toolCategorySlug: "claud-ai",
    author: "Mina Song",
    date: "Apr 20, 2026",
    readMinutes: 6,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "kling-ai-shot-consistency-guide",
    title: "Kling AI: Shot Consistency Guide for Multi-Scene Edits",
    excerpt: "Keep character identity and lighting consistent across sequence-level generations.",
    topCategory: topCategoryLabels.guides,
    topCategorySlug: "guides",
    toolCategory: toolCategoryLabels["kling-ai"],
    toolCategorySlug: "kling-ai",
    author: "Sarah Drasner",
    date: "Apr 18, 2026",
    readMinutes: 9,
    image:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "suno-ai-lyrics-to-hook-method",
    title: "Suno AI: Lyrics-to-Hook Method that Converts Faster",
    excerpt: "Structure prompts so verses, chorus, and outro feel intentional instead of random.",
    topCategory: topCategoryLabels.prompting,
    topCategorySlug: "prompting",
    toolCategory: toolCategoryLabels["suno-ai"],
    toolCategorySlug: "suno-ai",
    author: "Marcus Thorne",
    date: "Apr 17, 2026",
    readMinutes: 8,
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "suno-vs-kling-content-funnel",
    title: "Suno vs Kling: Which Converts Better for Short-Form Funnel Assets",
    excerpt: "A practical benchmark comparing watch time, CTR, and production cost.",
    topCategory: topCategoryLabels.comparisons,
    topCategorySlug: "comparisons",
    toolCategory: toolCategoryLabels["suno-ai"],
    toolCategorySlug: "suno-ai",
    author: "Alex Rivers",
    date: "Apr 16, 2026",
    readMinutes: 10,
    image:
      "https://images.unsplash.com/photo-1551281044-8b5bd2a1827c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "nanobanana-ai-thumbnail-system",
    title: "Nanobanana AI Thumbnail System for Daily Publishing",
    excerpt: "Build a reusable thumbnail template language that scales across series content.",
    topCategory: topCategoryLabels["tool-reviews"],
    topCategorySlug: "tool-reviews",
    toolCategory: toolCategoryLabels["nanobanana-ai"],
    toolCategorySlug: "nanobanana-ai",
    author: "Mina Song",
    date: "Apr 15, 2026",
    readMinutes: 10,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "claud-ai-long-context-research-stack",
    title: "Claud AI Long-Context Research Stack for Editorial Teams",
    excerpt: "Turn long PDFs and meeting transcripts into decision-ready publishing briefs.",
    topCategory: topCategoryLabels.guides,
    topCategorySlug: "guides",
    toolCategory: toolCategoryLabels["claud-ai"],
    toolCategorySlug: "claud-ai",
    author: "Noah Park",
    date: "Apr 13, 2026",
    readMinutes: 13,
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "claud-vs-gpt-research-workflow",
    title: "Claud vs GPT for Research Workflows: Depth, Speed, and Cost",
    excerpt: "Side-by-side output quality tests for briefing, synthesis, and fact extraction.",
    topCategory: topCategoryLabels.comparisons,
    topCategorySlug: "comparisons",
    toolCategory: toolCategoryLabels["claud-ai"],
    toolCategorySlug: "claud-ai",
    author: "Yuna Kim",
    date: "Apr 12, 2026",
    readMinutes: 11,
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
  },
];

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

export const articleBodySections = [
  {
    id: "workflow-foundation",
    heading: "Workflow Foundation",
    body: "The best teams define one repeatable flow from idea to publish: concept framing, generation passes, QA checks, and final packaging. This keeps experimentation fast without creating brand inconsistency.",
  },
  {
    id: "prompt-iteration-system",
    heading: "Prompt Iteration System",
    body: "Treat prompts as versioned assets. Keep winning prompt blocks for style, motion, pacing, and call-to-action language so future campaigns are built from proven modules.",
  },
  {
    id: "editorial-scale",
    heading: "Editorial Scale",
    body: "Once your base system is stable, scale with templates and role handoffs. Producers handle concept briefs, operators run generation passes, and editors perform final narrative polish.",
  },
];

export const comments = [
  {
    id: "c1",
    author: "Alex Rivers",
    body: "상위 카테고리와 툴 하위 분류를 분리하니 탐색성이 확실히 좋아졌네요.",
    upvotes: 12,
  },
  {
    id: "c2",
    author: "Sarah Chen",
    body: "툴 디렉토리 페이지가 생기면 검색 유입용 자산 페이지로도 강해질 것 같아요.",
    upvotes: 8,
  },
];
