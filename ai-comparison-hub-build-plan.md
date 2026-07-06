# AI Comparison Hub — Claude Code Build Plan (v1 / MVP)

This is a plan to hand to Claude Code to scaffold and build the first working version. Goal: a real, modern-looking, deployable website with **placeholder/seed data** wired into real components — so the second phase is "swap in better data," not "rebuild the app."

---

## 0. Product summary (for context, keep at top of repo as README)

AI Comparison Hub helps people figure out exactly which AI model to use, how to use it well, and how to stop overpaying — combining a benchmark/comparison dashboard (à la Artificial Analysis) with a learning layer (prompt engineering, verification, field-specific playbooks) and a personalized recommender.

---

## 1. Tech stack (optimized for "web now, app later")

- **Framework:** Next.js 14+ (App Router) + TypeScript — SSR/SEO for the comparison pages, and the component logic ports cleanly to React Native/Expo later since it's all React.
- **Styling:** Tailwind CSS + shadcn/ui — fast to make look modern, easy to re-theme.
- **Charts:** Recharts (radar charts, bar charts, scatter/Pareto plots, line charts for timeline) — lightweight, good docs, works in React Native via alternatives later if needed.
- **State/data fetching:** TanStack Query — makes swapping seed JSON for a real API later trivial.
- **Database (v1):** Start with local seed JSON files (`/data/*.json`). Structure them exactly like DB tables so migrating to Postgres is a copy-paste, not a rewrite.
- **Database (v2, when ready):** Supabase (Postgres + auth + storage in one, generous free tier, easy React SDK) — recommended over raw Postgres for speed.
- **Auth (v2, not needed for MVP):** Supabase Auth or Clerk — skip entirely for v1 unless you want accounts from day one.
- **Deployment:** Vercel (zero-config for Next.js, free tier is plenty for MVP).
- **Icons:** lucide-react.
- **Animation:** Framer Motion, used sparingly (page transitions, card hovers) — this is what makes it feel "modern" vs. a spreadsheet-with-a-logo.

Mobile-app path later: this stack (Next.js + Tailwind + React components) reuses ~70-80% of logic in Expo/React Native or you ship the Next.js site inside a WebView/PWA wrapper as a fast first step, then go native if it justifies the investment.

---

## 2. Information architecture (v1 pages)

```
/                     → Landing / hero + quick recommender teaser + top rankings preview
/compare              → Main comparison hub (model grid + filters, artificialanalysis-style)
/compare/[modelId]    → Individual model detail page (scores, pricing, use cases, honest pros/cons)
/rankings             → Full ranking system (tier lists, radar charts, category leaderboards)
/recommend            → The quiz/wizard → "best model for your task + pricing tier"
/learn                → Hub page for education content (grid of guides)
/learn/[slug]         → Individual guide page (prompt engineering, verification, context, etc.)
/learn/fields/[field] → Vertical playbooks (coding, writing, business, education, etc.)
/pricing-tools        → Token cost estimator + subscription tier advisor
/timeline             → AI history timeline + future predictions
/about                → Mission / how we grade / methodology (builds trust, like AA's methodology page)
```

Global: persistent nav + footer, dark-mode-first design (this audience expects it), command-K style search (optional stretch goal).

---

## 3. Data model (seed as JSON now, matches future DB schema)

### `models.json` — one row per AI model
```ts
{
  id: string,               // "claude-sonnet-5"
  name: string,
  provider: string,         // "Anthropic"
  logoUrl: string,
  description: string,
  releaseDate: string,
  modality: string[],       // ["text", "image", "code"]
  scores: {
    coding: number,         // 0-100
    reasoning: number,
    creativity: number,
    speed: number,
    accuracy: number,
    dataAnalysis: number,
    businessUse: number,
    educationUse: number,
  },
  pricing: {
    inputPerMTokens: number,
    outputPerMTokens: number,
    hasFreetier: boolean,
    subscriptionPrice: number | null,
  },
  contextWindow: number,
  strengths: string[],
  weaknesses: string[],
  bestFor: string[],        // ["coding", "long documents", "customer support"]
}
```

### `fields.json` — vertical/industry playbooks
```ts
{
  slug: string,             // "software-development"
  name: string,
  icon: string,
  criteria: string[],       // ["Debugging ability", "Frontend vs Backend", "Algorithm solving", ...]
  recommendedModels: string[], // model ids, ranked
  playbook: string,         // markdown content
  redFlags: string[],       // what NOT to do in this field
}
```

### `guides.json` — learning content
```ts
{
  slug: string,
  title: string,
  category: string,         // "prompt-engineering" | "concepts" | "safety" | "techniques"
  summary: string,
  content: string,          // markdown
  difficulty: "beginner" | "intermediate" | "advanced",
}
```

### `timeline.json` — AI history events
```ts
{ date: string, title: string, description: string, category: string, isPrediction: boolean }
```

### `quizQuestions.json` — recommender logic
```ts
{ id: string, question: string, options: { label: string, weights: Record<modelId, number> }[] }
```

Seed each file with ~15-20 real, hand-written entries (4-6 major models: GPT-5.x, Claude, Gemini, Grok, DeepSeek, Llama) so the app looks populated, not empty. Use current public pricing/benchmark info where you have it; mark anything approximate with a small "estimated" tag in the UI so you're not overclaiming accuracy on day one.

---

## 4. Core components to build

**Comparison & ranking**
- `ModelCard` — logo, name, key scores, price badge, "best for" tags
- `ModelGrid` — filterable/sortable grid of ModelCards (filter by provider, price, modality, use case)
- `ModelDetailPage` — full breakdown, radar chart, pricing table, honest strengths/weaknesses
- `RadarChart` — Recharts radar comparing up to 4 selected models across the 8 score categories
- `TierList` — drag-free S/A/B/C tier display, auto-generated from scores
- `ParetoScatter` — quality (y) vs cost (x) scatter plot with a highlighted "best value" frontier
- `ComparisonTable` — side-by-side spec table for 2-4 selected models (checkbox-select from grid)
- `LeaderboardTable` — sortable table, sticky header, category tabs (coding/reasoning/creativity/etc.)

**Recommender**
- `QuizWizard` — multi-step form (React state machine), one question per screen, progress bar
- `RecommendationResult` — shows winning model + reasoning + runner-up + estimated cost for their use case

**Learning**
- `GuideCard` / `GuideGrid` — browsable learning hub
- `MarkdownRenderer` — renders guide content (use `react-markdown`)
- `FieldPlaybookPage` — industry-specific template (criteria list, recommended models, do's/don'ts)
- `PromptExampleBlock` — good vs. bad prompt side-by-side component (reusable in guides)

**Pricing tools**
- `TokenEstimator` — textarea input → live token count (use `gpt-tokenizer` or `tiktoken` npm package) → cost across models
- `TierAdvisor` — small quiz → "free tier is enough" / "get Pro" / "use the API instead" verdict

**Timeline**
- `TimelineView` — vertical scroll timeline (Framer Motion reveal-on-scroll), toggle "history" vs "predictions"

**Shared**
- `NavBar`, `Footer`, `SearchCommand` (optional cmd-K), `ThemeToggle`, `Badge`, `StatBar` (score bar visual)

---

## 5. Build order (phased — give this to Claude Code as sequential milestones)

**Phase 1 — Scaffold**
1. `npx create-next-app` with TypeScript + Tailwind, install shadcn/ui, Recharts, Framer Motion, TanStack Query, lucide-react.
2. Set up folder structure: `/app`, `/components`, `/data` (seed JSON), `/lib` (types + data-fetch helpers), `/public`.
3. Build global layout: NavBar, Footer, dark theme, design tokens (see frontend-design skill for aesthetic direction — don't default to generic shadcn look).

**Phase 2 — Data layer**
4. Write TypeScript types matching the schema in section 3.
5. Seed `models.json` with 6 real models and honest current-ish data.
6. Seed `fields.json` with 4-5 fields (coding, writing, business, education, healthcare).
7. Seed `guides.json` with 6-8 guides (good vs bad prompts, chain-of-thought, hallucinations, context windows, tokens, data privacy).
8. Seed `timeline.json` with ~15 real milestones + 3-4 labeled predictions.
9. Seed `quizQuestions.json` with 5-6 questions covering task type, budget, speed needs, technical level.
10. Build a small `lib/data.ts` with typed getter functions (`getModels()`, `getModelById()`, etc.) — this is the swap point for a real DB later.

**Phase 3 — Comparison hub (core feature)**
11. Build `ModelGrid` + `ModelCard` + filters on `/compare`.
12. Build `/compare/[modelId]` detail page.
13. Build multi-select comparison → `ComparisonTable` + `RadarChart` (up to 4 models, matches your "4 models" grading conversation).
14. Build `/rankings` with `LeaderboardTable`, category tabs, and `TierList`.
15. Build `ParetoScatter` for quality-vs-cost view.

**Phase 4 — Recommender**
16. Build `QuizWizard` + scoring logic (weighted sum against quiz answers) + `RecommendationResult`.

**Phase 5 — Learning hub**
17. Build `/learn` grid + `/learn/[slug]` guide pages with `MarkdownRenderer`.
18. Build `/learn/fields/[field]` playbook template.
19. Add `PromptExampleBlock` used inside the prompt-engineering guide.

**Phase 6 — Pricing tools**
20. Build `TokenEstimator` (client-side tokenizer + live cost table across models from `models.json` pricing).
21. Build `TierAdvisor` mini-quiz.

**Phase 7 — Timeline + landing polish**
22. Build `/timeline` scroll experience.
23. Build `/` landing page pulling highlights from rankings + recommender teaser + a "start here" CTA.
24. Pass over every page for animation polish, responsive/mobile check, and empty-state handling.

**Phase 8 — Deploy**
25. Push to GitHub, connect to Vercel, deploy, verify on mobile viewport.

---

## 6. Design direction to give Claude Code

- Dark-mode-first, high-contrast, data-dense but not cluttered — closer to a fintech dashboard (Linear, Vercel dashboard, Artificial Analysis itself) than a marketing site.
- One accent color (electric blue, violet, or lime) used sparingly for CTAs and highlighted "best value" badges — not everywhere.
- Real charts, not decorative ones — every chart should encode the 4-metric grading logic already discussed (accuracy, relevance, clarity, cost) or the 8-category scores.
- Motion should be subtle: fade/slide on scroll, hover lift on cards — never distracting.
- Mobile-responsive from the start since this becomes an app later.

---

## 7. What to explicitly tell Claude Code up front

When you start the session, paste this whole plan and add:
- "Build phases sequentially, confirming each phase works before moving to the next."
- "Use seed JSON data now; structure all data access through `lib/data.ts` so it's a single swap point for a real database later."
- "Prioritize a working, deployable app over perfect data accuracy — data gets refined after launch."
- Attach or paste your earlier feature brainstorm doc for anything Phase 1 doesn't cover, so nothing gets lost for v2.

---

## 8. Explicitly deferred to v2 (don't let scope creep into MVP)

- User accounts / saved comparisons / prompt locker
- Live API calls to run real side-by-side model outputs (needs API keys + cost management)
- Community features (voting, forums, prompt battles)
- Browser extension
- Auto-updating benchmark data / scraping pipelines
- Certification/gamification system

This keeps v1 scoped to something Claude Code can actually finish and you can ship this week, while every architectural choice above (data layer, component structure, Next.js) supports bolting v2 features on without a rewrite.
