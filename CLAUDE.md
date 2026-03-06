# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Darwin-MFC** is an academic Q1-standard (Nature/Cell level) interactive web application for comparative analysis of population-based screening programs and clinical protocols. It compares **official guidelines** (SUS/Brazil, USPSTF/USA, NHS/UK, NP-NCD/India, WHO) with **Medical Society recommendations** across multiple health domains.

**Key Characteristics:**

- Academic rigor with inline citations (Vancouver style)
- Dual content mode: Descriptive ↔ Critical Analysis (central architectural decision)
- **9 languages**: pt (default), en, es, fr, ru, ar (RTL), zh, el, hi
- **3 regions**: BR (Brazil), IN (India), EU (European Union) — independent from locale
- Dark mode as default theme
- Static site generation for GitHub Pages; SSR on Vercel

**Live Demo:** <https://mfc.agourakis.med.br>

## Commands

The project uses **pnpm** as the package manager with pnpm workspaces.

### Development

```bash
pnpm dev                     # Start dev server (localhost:3000)
pnpm build                   # Static export for GitHub Pages
pnpm build:vercel            # SSR build for Vercel (VERCEL=1)
pnpm build:custom-domain     # Build + fix links for custom domain
pnpm start                   # Serve production build locally
pnpm type-check              # TypeScript type checking
pnpm verify                  # Integration verification (ontologies, graph, translations)
```

### Testing

```bash
pnpm test:e2e                # Playwright E2E tests (Chromium + Mobile Chrome locally)
pnpm test:e2e:ui             # Playwright interactive UI mode
pnpm test:e2e:headed         # Playwright with visible browser
pnpm test:e2e:debug          # Playwright step-by-step debug
pnpm test:visual             # Visual regression tests
pnpm test:lighthouse         # Lighthouse performance/a11y audits
pnpm test:accessibility      # Jest accessibility tests (design system)
pnpm test:all                # Full suite: tokens + type-check + e2e + visual + lighthouse
```

### Content & Tools

```bash
pnpm translate:all           # Translate all content types (orchestrator)
pnpm translate:validate      # Verify translation completeness
pnpm audit:tokens            # Design token audit
pnpm storybook               # Storybook dev server (port 6006)
ANALYZE=true pnpm build:vercel  # Bundle size analysis
```

### SOTA Services (Docker)

```bash
pnpm sota:start              # Start Elasticsearch, Neo4j, etc.
pnpm sota:setup:all          # Initialize indices and databases
pnpm sota:test:all           # Run SOTA integration tests
```

### Environment Variables

- `USE_BASE_PATH=true` — Build with `/darwin-MFC` basePath for github.io subdirectory
- `VERCEL=1` — Enable SSR mode (skip static export)
- `ANALYZE=true` — Enable bundle analyzer
- `NEXT_PUBLIC_ENABLE_AUTH=false` — Feature flag: authentication
- `NEXT_PUBLIC_ENABLE_COMMUNITY=false` — Feature flag: community features
- `NEXT_PUBLIC_ENABLE_LEARNING=true` — Feature flag: learning paths
- See `.env.example` for full list (Supabase, Elasticsearch, Neo4j, PharmGKB, HuggingFace)

### Build Modes

- **Static export** (default): `output: "export"` for GitHub Pages. No server runtime.
- **Vercel SSR**: When `VERCEL=1` is set, skips static export. Better for 15k+ pages.
- **Custom domain**: Default build (no basePath). Set `USE_BASE_PATH=true` for github.io subdirectory.

## Monorepo Structure

pnpm workspace with 5 packages under `packages/`:

| Package          | Name                          | Purpose                                                                                                          |
| ---------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `protocol-runner` | `@darwin-mfc/protocol-runner` | UI-agnostic state machine for clinical flowcharts. Pure JS, no dependencies, no build step. Used by web and mobile. |
| `protocol-data`  | `@darwin-mfc/protocol-data`   | Shared clinical protocol datasets (flowcharts). Re-exports from `medical-data`.                                  |
| `design-tokens`  | `@darwin-mfc/design-tokens`   | Shared design tokens for web (CSS vars) and mobile (RN theme).                                                   |
| `medical-data`   | `@darwin-mfc/medical-data`    | Published NPM package: 1,104 diseases, 5,000+ medications, 14+ protocols with ontology codes. Built with tsup (ESM+CJS). |
| `mobile`         | `darwin-mfc-mobile`           | Expo/React Native mobile app. Shares protocol-runner, protocol-data, and design-tokens with web.                 |

Workspace packages are consumed via `workspace:*` in package.json and transpiled by Next.js (`transpilePackages` in `next.config.ts`).

## Architecture & Code Structure

### Dual Content Architecture

The app's central design pattern — every page has two content modes toggled globally:

- **Descriptive** (blue): protocols, epidemiology, SUS vs Societies comparison
- **Critical Analysis** (purple): insights, controversies, challenges, systemic implications

Controlled by `contentMode` in `appStore`, toggled via Header button. Wrap pages with `ContentModeWrapper` passing `descriptiveContent` and `criticalAnalysisContent` props. Never mix modes in the same view.

### State Management (Zustand)

All stores use Zustand with localStorage persistence. Location: `lib/store/`.

| Store                  | localStorage Key             | Purpose                                                                      |
| ---------------------- | ---------------------------- | ---------------------------------------------------------------------------- |
| `appStore.ts`          | `rastreamentos-sus-storage`  | Theme, contentMode, viewMode, region, locale, favorites, notes, font size    |
| `learningStore.ts`     | `darwin-mfc-learning`        | Learning path progress, SM-2 flashcard algorithm, certificates               |
| `studyStore.ts`        | `darwin-mfc-study-storage`   | Spaced repetition, quiz history, streaks, study time                         |
| `gamificationStore.ts` | `darwin-mfc-gamification`    | XP, badges (13+), levels (10 tiers), daily challenges, streaks               |
| `genotypeStore.ts`     | `darwin-mfc-genotype`        | Pharmacogenomics profiles                                                    |
| `notesStore.ts`        | `darwin-mfc-notes`           | User notes                                                                   |
| `userStore.ts`         | —                            | User profile state                                                           |
| `authStore.ts`         | —                            | Authentication state                                                         |
| `syncStore.ts`         | —                            | Cloud sync state                                                             |

Usage pattern:

```tsx
const theme = useAppStore((state) => state.theme);
const contentMode = useAppStore((state) => state.contentMode);
const selectedRegion = useAppStore((state) => state.selectedRegion); // 'BR' | 'IN' | 'EU'
```

### Internationalization (next-intl)

**9 message files per locale** loaded and deep-merged in `i18n/request.ts`:
`common`, `learning`, `community`, `clinical-cases`, `auth`, `regional`, `diseases`, `ai`, `accessibility`

**Fallback strategy:** English loaded as base → current locale overlays via deep merge. Missing keys silently fall back to `namespace.key` string (never breaks static export).

**Files:**

- `i18n/config.ts`: Locale definitions, RTL detection
- `i18n/routing.ts`: next-intl navigation wrappers (Link, useRouter, usePathname)
- `messages/{locale}/`: Translation JSON files

All routes are locale-prefixed: `/pt/cancer`, `/en/cancer`. The `[locale]` segment in `app/[locale]/` handles routing.

### Multi-Country Architecture

Region (medical data) is independent from locale (UI language). User can view India data in Portuguese.

- **Auto-detection**: pt→BR, hi→IN, others→EU
- **Regional overlays**: Medications and diseases have region-specific data in `lib/data/regions/{brazil,india,eu}/`
- **Types**: `lib/types/region.ts` — `Region`, `RegionalMedicationOverlay`, `RegionalDiseaseOverlay`
- **Helpers**: `isAvailableInPublicSystem()`, `getRegionalPrevalence()`, `getRegionalGuideline()`

### Protocol Runner

`@darwin-mfc/protocol-runner` — deterministic state machine for clinical decision flowcharts:

- Protocols are graphs: `nodes[]` + `edges[]` (compatible with React Flow)
- State tracks `activeNodeId` + `history` (visited nodes stack)
- Supports cycles, back navigation, and state serialization
- Key functions: `createInitialRunnerState()`, `chooseOption()`, `goBack()`, `getNextOptions()`, `jumpToNode()`
- Web wrapper: `lib/protocolos/protocol-runner.ts`
- Flowchart viewer: `app/[locale]/protocolos/flowchart/[id]/FlowchartClient.tsx`

### Community System

Forum, clinical cases, mentorship, and moderation — all behind `NEXT_PUBLIC_ENABLE_COMMUNITY` feature flag.

**Types:** `lib/types/community.ts` — `ForumPost`, `ClinicalCasePost`, `MentorProfile`, `MentorshipRequest`

**Supabase services** (`lib/supabase/services/`):

- `forum.ts`: Categories, posts, replies, voting, pinning
- `community.ts`: Clinical case sharing with anonymization workflow
- `mentorship.ts`: Mentor profiles, matching by specialization/language, reviews
- `reports.ts`: Content reporting and moderation resolution
- `notifications.ts`: User notifications with read/unread tracking

**Routes:** `app/[locale]/community/` (cases, forums, mentorship, posts), `app/[locale]/moderation/`, `app/[locale]/notifications/`

### Learning & Gamification

**Learning paths** with structured modules: content, video, quiz, case study, flashcards, interactive exercises.

- SM-2 spaced repetition algorithm for flashcards (ease factor 1.3–2.6, interval scheduling)
- Quiz engine with multiple question types
- Certificate issuance on path completion
- Routes: `app/[locale]/learn/` (paths, progress, certificates)

**Gamification** drives engagement:

- XP system with transaction types (module_complete, quiz_pass, perfect_quiz, streak_bonus, daily_login)
- 10 levels: Novice → Legend
- 13+ badges across 5 categories (learning, explorer, academic, contributor, special)
- Daily challenges with expiration
- Streak tracking (consecutive days)

### Supabase Integration

Consistent pattern across all 13 service files in `lib/supabase/services/`:

```tsx
// Build-safe: never breaks static export
const auth = await getAuthClient();
if (!auth) return { data: null, error: 'Not authenticated' };
if (!isSupabaseConfigured) return { data: null, error: null }; // graceful degradation
```

**16 migrations** in `supabase/migrations/` define: users, preferences, progress, favorites, notes, forum (posts/replies/categories/votes), mentorship (profiles/sessions), reports, notifications, moderation policies, view counters, pharmacogenomics genotypes.

### Design System & Tokens

`@darwin-mfc/design-tokens` package provides shared tokens consumed by both web and mobile:

- **Clinical semantic colors**: critical (red), warning (amber), safe (green), info (blue), medication (purple)
- **DNA-inspired brand palette**: helixNavy, adenineTeal, guanineGreen, cytosineCyan, thymineGold
- **Typography**: System UI (interface), Source Serif 4 (body reading), monospace (code)
- **Motion**: Framer Motion presets in `lib/design-system/animations/`

Web design system: `lib/design-system/` — primitives (Radix UI-based), animations, hooks, personalization. Design tokens compatibility layer: `lib/design-tokens.ts`.

CSS variables for theme: `app/globals.css`. Dark/light via Tailwind `dark:` variant + `class="dark"` on HTML.

### Type System

**Central types** in `lib/types/`:

- `rastreamentos.ts`: `Rastreamento`, `Recommendations`, `ConvergenciaStatus` ('convergencia' | 'parcial' | 'divergencia' | 'em_disputa')
- `analysis.ts`: `CriticalAnalysis`, `Insight` (2nd/3rd order), `Controversy` (A vs B with synthesis)
- `references.ts`: `Citation` (Vancouver style, DOI/PMID)
- `community.ts`: Forum, case, mentorship, moderation types
- `region.ts`: `Region`, regional overlays
- `medicamento.ts`, `doenca.ts`: With regional overlay support and ontology codes

**Ontology codes** (validated by `pnpm verify`):

- Diseases: ICD-10 (`cid10`), ICPC-2 (`ciap2`), LOINC, ORDO, HPO
- Medications: ATC (`atcCode`), PharmGKB

### Data Layer

All content is TypeScript constants (no database for core content):

- `lib/data/rastreamentos.ts`: Screening protocols
- `lib/data/analise-critica.ts`: Critical analyses (linked by `rastreamentoId`)
- `lib/data/references.ts`: Bibliography database
- `lib/data/medicamentos/`: Drug information modules
- `lib/data/doencas/`: Disease protocols
- `lib/data/regions/`: Regional medication/disease overlays
- `lib/data/protocolos-flowchart.ts`: Protocol flowchart definitions

### Knowledge Graph

`lib/graph/` — semantic graph connecting medical entities. Node types: `doenca`, `medicamento`, `sintoma`, `exame`, `gene`, `protocolo`. Edge types: `causa`, `diagnostica`, `trata`, `interage`, `metaboliza`, `associado`.

### Search

`lib/search/` — Fuse.js fuzzy search with medical synonym expansion (`semanticSearch()`, `facetedSearch()`).

### Clinical Calculators

`lib/calculators/` — 25+ validated scoring calculators (APGAR, APACHE II, CHA₂DS₂-VASc, CURB-65, GCS, MELD-Na, PHQ-9, qSOFA, Wells PE, etc.). Add new calculators in `lib/calculators/calculators/` following the `Calculator` interface, then register in `registry.ts`.

## TypeScript Configuration

**Important exclusions** from `tsconfig.json` (type-check will NOT catch errors in these):

- `packages/` — each package has its own tsconfig
- `lib/supabase/` — server utilities
- `lib/content-generation/` — batch generation scripts
- `scripts/` — most script files
- All test files (`__tests__`, `*.test.ts`, `*.spec.ts`)

**Path alias:** `@/*` maps to repository root. Use `@/lib/...`, `@/app/components/...`.

## Development Guidelines

### Adding New Screenings

1. Define data in `lib/data/rastreamentos.ts` (follow `Rastreamento` interface)
2. Create critical analysis in `lib/data/analise-critica.ts` with matching `rastreamentoId`
3. Add references to `lib/data/references.ts`
4. Create route in `app/[locale]/{category}/page.tsx` using `ContentModeWrapper`
5. Always provide BOTH descriptive and critical analysis content

### Citations

Every factual claim must have inline citations:

```tsx
<InlineCitation citation="[1], [2]" references={references} />
```

### Responsive Design

Mobile-first. Sidebar hidden on screens < lg (1024px). Test print styles for PDF export.

## Strategic Planning

- `ROADMAP.md` — 12-month implementation plan
- `PLANO_SUPERACAO_SOTA_DARWIN.md` — Strategic 6-dimension expansion plan
- `SOTA_COMPETITIVE_ANALYSIS.md` — Competitive analysis vs. UpToDate, Medscape
- `APS_MFC_FOCUS.md` — Primary Care focus repositioning

## LLM Offload

Use `llm-offload` for bulk generation to save Anthropic tokens:

- `llm-offload -t expand -p local` — Expand outline (free, local Mistral)
- `llm-offload -t paraphrase -p grok` — Rewrite text (Grok)
- `llm-offload -t scaffold -p local` — Code boilerplate
- `llm-offload -t variations -p minimax` — Generate alternatives

**Workflow**: Claude designs → llm-offload expands → Claude critiques
