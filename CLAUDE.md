# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Darwin-MFC** is an academic Q1-standard (Nature/Cell level) interactive web application for comparative analysis of population-based screening programs and clinical protocols. It compares **official guidelines** (SUS/Brazil, USPSTF/USA, NHS/UK, NP-NCD/India, WHO) with **Medical Society recommendations** across multiple health domains, and now ships a dedicated **PS (Pronto Socorro / Emergency Room)** module for acute-care decision support.

**Key Characteristics:**

- Academic rigor with inline citations (Vancouver style)
- Dual content mode: Descriptive ↔ Critical Analysis (central architectural decision for APS routes)
- **Dual app mode**: `aps` (Primary Care, default) ↔ `ps` (Emergency Room) — controlled by `psStore`
- **9 languages**: pt (default), en, es, fr, ru, ar (RTL), zh, el, hi
- **3 regions**: BR (Brazil), IN (India), EU (European Union) — independent from locale
- Dark mode as default theme
- Static site generation for GitHub Pages; SSR on Vercel

**Tech stack:** Next.js 16 (App Router) · React 19 · TypeScript 5.9 (strict) · Tailwind CSS 4 · next-intl 4 · Zustand 5 · Supabase · Node 24.x · pnpm workspaces.

**Live Demo:** <https://mfc.agourakis.med.br>

**Companion doc:** `AGENTS.md` mirrors agent-specific conventions; keep both files in sync when changing build/test commands.

## Commands

The project uses **pnpm** as the package manager with pnpm workspaces.

### Development

```bash
pnpm dev                     # Start dev server (localhost:3000)
pnpm build                   # next build (static export only if NODE_ENV=production and no Vercel env)
pnpm build:vercel            # SSR build for Vercel (VERCEL=1)
pnpm build:custom-domain     # Build + scripts/fix-custom-domain-links.js
pnpm start                   # Serve production build locally
pnpm type-check              # Cleans .next types, then `tsc --noEmit`
pnpm verify                  # Integration verification (ontologies, graph, translations)
pnpm test                    # Alias for pnpm verify (tsx scripts/verify-integration.ts)
```

> `pnpm lint` is a stub that prints success — there is no linter configured. Use `pnpm type-check` for validation.

### Testing

```bash
pnpm test:e2e                # Playwright E2E tests
pnpm test:e2e:ui             # Playwright interactive UI mode
pnpm test:e2e:headed         # Playwright with visible browser
pnpm test:e2e:debug          # Playwright step-by-step debug
pnpm test:visual             # Visual regression tests (tests/visual-regression)
pnpm test:lighthouse         # Lighthouse performance/a11y audits
pnpm test:accessibility      # Jest accessibility tests (design system)
pnpm test:all                # tokens + type-check + e2e + visual + lighthouse (uses npm internally)
```

### Content & Tools

```bash
pnpm translate:all           # Translate all content types (orchestrator)
pnpm translate:medications   # Per-content-type translation
pnpm translate:diseases
pnpm translate:clinical-cases
pnpm translate:flashcards
pnpm translate:quizzes
pnpm translate:validate      # Verify translation completeness
pnpm audit:tokens            # Design token audit
pnpm storybook               # Storybook dev server (port 6006)
pnpm build-storybook
pnpm generate-icons          # PWA icon generation
ANALYZE=true pnpm build:vercel  # Bundle size analysis (also: pnpm analyze)
```

### SOTA Services (Docker)

```bash
pnpm sota:start              # Start Elasticsearch, Neo4j, etc. (docker-compose.sota.yml)
pnpm sota:stop / restart / logs
pnpm sota:setup:elasticsearch
pnpm sota:setup:neo4j
pnpm sota:setup:all
pnpm sota:test:clinpgx
pnpm sota:test:integration
pnpm sota:download:clinpgx
```

### Environment Variables

- `USE_BASE_PATH=true` — Build with `/darwin-MFC` basePath for github.io subdirectory
- `VERCEL=1` (or any `VERCEL_ENV`) — Enable SSR mode; **suppresses** static export even in production
- `ANALYZE=true` — Enable `@next/bundle-analyzer`
- `NEXT_PUBLIC_ENABLE_AUTH=false` — Feature flag: authentication
- `NEXT_PUBLIC_ENABLE_COMMUNITY=false` — Feature flag: community features
- `NEXT_PUBLIC_ENABLE_LEARNING=true` — Feature flag: learning paths
- `NEXT_PUBLIC_ENABLE_PWA`, `NEXT_PUBLIC_DEBUG`
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- See `.env.example` for full list (Elasticsearch, Neo4j, PharmGKB, BioBERT, NCBI, OAuth, FHIR, LOINC)

### Build Modes

- **Static export** (default for production GH Pages): `output: "export"` is set when `NODE_ENV=production` **and** no Vercel env markers. Images are unoptimized.
- **Vercel SSR**: When `VERCEL=1` or `VERCEL_ENV` is present, skips static export. Better for 15k+ pages and required for image optimization / `*.supabase.co` remote images.
- **Custom domain**: Default build (no basePath). Set `USE_BASE_PATH=true` for github.io subdirectory.
- **Turbopack alias**: `onnxruntime-web` is aliased to `lib/ai/mocks/onnxruntime-web.js` to keep SSG from breaking on the browser-only ML runtime.

## Monorepo Structure

pnpm workspace with **6 packages** under `packages/`:

| Package           | Name                          | Purpose                                                                                                          |
| ----------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `protocol-runner` | `@darwin-mfc/protocol-runner` | UI-agnostic state machine for clinical flowcharts. Pure JS, no dependencies, no build step. Used by web and mobile. |
| `protocol-data`   | `@darwin-mfc/protocol-data`   | Shared clinical protocol datasets (flowcharts). Re-exports from `medical-data`.                                  |
| `design-tokens`   | `@darwin-mfc/design-tokens`   | Shared design tokens for web (CSS vars) and mobile (RN theme).                                                   |
| `medical-data`    | `@darwin-mfc/medical-data`    | Published NPM package: 1,104 diseases, 5,000+ medications, 14+ protocols with ontology codes. Built with tsup (ESM+CJS). |
| `mobile`          | `darwin-mfc-mobile`           | Expo/React Native mobile app. Shares protocol-runner, protocol-data, and design-tokens with web.                 |
| `ml-training`     | Python workspace              | BioBERT / clinical ML training pipelines. Python (`requirements.txt`), not part of the JS workspace graph.       |

Workspace packages are consumed via `workspace:*` and transpiled by Next.js (`transpilePackages` in `next.config.ts`). Each package owns its own tsconfig — the root `tsconfig.json` **excludes** `packages/` from type-check.

## Architecture & Code Structure

### App Mode: APS vs PS

Two coexisting product surfaces, distinguished by `psStore.mode` (`'aps' | 'ps'`):

- **APS (Primary Care)** — original Darwin-MFC: rastreamentos, doenças, medicamentos, learning paths, community, etc. Uses the Dual Content Architecture below.
- **PS (Emergency Room)** — `app/[locale]/ps/*` routes with their own layout, header, sidebar, mobile nav (`app/components/PS/*`). Built around acute-care protocols (PCR/ACLS, sepse/choque, IOT-RSI), emergency drugs, critical-care scores, and active case sessions.

The PS module ships its own contracts, data, and runtime in `lib/ps/`:

- `lib/ps/contracts.ts` — `ActiveCaseSession`, `CaseEvent`, `PatientContext`, `WeightSource`, `SentinelWorkflow` (`'pcr' | 'sepse_choque' | 'iot_rsi'`), role slots (`leader | compressor | airway | meds_monitor`).
- `lib/ps/protocols.ts` — emergency protocols with stepwise nodes/branches.
- `lib/ps/data/` — ~6k lines of medication monographs: vasoativas, RSI, antídotos, emergência geral, respiratório/metabólico, compatibilidade.
- `lib/ps/scores/` — `cardio-scores.ts`, `neuro-scores.ts`, `critical-supplemental-scores.ts`.
- `lib/ps/handoff*` — Schema/validation/adapter/controllers for exporting and importing handoff envelopes between sessions.
- `lib/ps/useProtocolRuntimeModel.ts`, `useProtocolPresentationState.ts`, `protocolRuntime.ts`, `protocolCaseEvents.ts`, `protocolOverlayActions.ts` — runtime hooks the PS UI binds to.

PS routes live under `app/[locale]/ps/`: `calculadoras/`, `drogas/`, `escalas/`, `protocolos/[slug]/`, `timer/`. The `PCRTimer` and active case session machinery is driven by `psStore.pcrTimer` and `psStore.activeCaseSession`.

### Dual Content Architecture (APS surface)

Every APS page has two content modes toggled globally:

- **Descriptive** (blue): protocols, epidemiology, SUS vs Societies comparison
- **Critical Analysis** (purple): insights, controversies, challenges, systemic implications

Controlled by `contentMode` in `appStore`, toggled via Header button. Wrap pages with `ContentModeWrapper` passing `descriptiveContent` and `criticalAnalysisContent` props. Never mix modes in the same view. (PS pages do not use ContentModeWrapper — they are operational, not editorial.)

### State Management (Zustand)

All stores use Zustand with localStorage persistence via `ssrSafeJSONStorage` (`lib/store/persistStorage.ts`). Location: `lib/store/`.

| Store                  | localStorage Key             | Purpose                                                                      |
| ---------------------- | ---------------------------- | ---------------------------------------------------------------------------- |
| `appStore.ts`          | `rastreamentos-sus-storage`  | Theme, contentMode, viewMode, region, locale, favorites, notes, font size    |
| `psStore.ts`           | (persisted)                  | App mode (`aps`/`ps`), patient context, PCR timer, active case session, favorite scores/drugs, recent team members, sentinel workflow |
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
const mode = usePSStore((state) => state.mode);                       // 'aps' | 'ps'
```

### Internationalization (next-intl)

**Message files** loaded and deep-merged in `i18n/request.ts`:
`common`, `learning`, `community`, `clinical-cases`, `auth`, `regional`, plus per-namespace overlays for `diseases`, `ai`, `accessibility`. Locale folders also include `medications`, `protocols`.

**Fallback strategy:** English (`en`) loaded as the completeness baseline → current locale overlays via deep merge. Missing keys silently fall back to `namespace.key` string via `getMessageFallback` — `MISSING_MESSAGE` errors are swallowed by `onError` so static export never breaks.

**Files:**

- `i18n/config.ts`: Locale definitions, RTL detection (`rtlLocales = ['ar']`)
- `i18n/routing.ts`: next-intl navigation wrappers (`Link`, `useRouter`, `usePathname`, `redirect`)
- `messages/{locale}/`: Translation JSON files (one per namespace)

All routes are locale-prefixed: `/pt/cancer`, `/en/cancer`. The `[locale]` segment in `app/[locale]/` handles routing. Non-localized routes live in `app/` outside `[locale]`.

If you touch `i18n/request.ts`, preserve the static-export-safe fallback behavior — do not throw on missing namespaces or keys.

### Multi-Country Architecture

Region (medical data) is independent from locale (UI language). User can view India data in Portuguese.

- **Auto-detection**: pt→BR, hi→IN, others→EU
- **Regional overlays**: Medications and diseases have region-specific data in `lib/data/regions/{brazil,india,eu}/`
- **Types**: `lib/types/region.ts` — `Region`, `RegionalMedicationOverlay`, `RegionalDiseaseOverlay`
- **Helpers**: `isAvailableInPublicSystem()`, `getRegionalPrevalence()`, `getRegionalGuideline()`

### Protocol Runner

`@darwin-mfc/protocol-runner` — deterministic state machine for clinical decision flowcharts:

- Protocols are graphs: `nodes[]` + `edges[]` (compatible with React Flow / `@xyflow/react`)
- State tracks `activeNodeId` + `history` (visited nodes stack)
- Supports cycles, back navigation, and state serialization
- Key functions: `createInitialRunnerState()`, `chooseOption()`, `goBack()`, `getNextOptions()`, `jumpToNode()`
- Web wrapper: `lib/protocolos/protocol-runner.ts`
- Flowchart viewer: `app/[locale]/protocolos/flowchart/[id]/FlowchartClient.tsx`
- PS uses its own runtime (`lib/ps/protocolRuntime.ts` + presentation hooks) optimized for acute-care step branching, not the generic runner.

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

- XP system with transaction types (`module_complete`, `quiz_pass`, `perfect_quiz`, `streak_bonus`, `daily_login`)
- 10 levels: Novice → Legend
- 13+ badges across 5 categories (learning, explorer, academic, contributor, special)
- Daily challenges with expiration
- Streak tracking (consecutive days)

### Supabase Integration

Consistent pattern across all 13 service files in `lib/supabase/services/` (`forum`, `community`, `mentorship`, `reports`, `notifications`, `progress`, `favorites`, `notes`, `genotypes`, `medicamentos`, `doencas`, `protocolos`, `index`):

```tsx
// Build-safe: never breaks static export
const auth = await getAuthClient();
if (!auth) return { data: null, error: 'Not authenticated' };
if (!isSupabaseConfigured) return { data: null, error: null }; // graceful degradation
```

**16 migrations** in `supabase/migrations/` define: users, preferences, progress, favorites, notes, forum (posts/replies/categories/votes), mentorship (profiles/sessions), reports, notifications, moderation policies, view counters, pharmacogenomics genotypes, forum category accents, forum notifications.

### Design System & Tokens

`@darwin-mfc/design-tokens` package provides shared tokens consumed by both web and mobile:

- **Clinical semantic colors**: critical (red), warning (amber), safe (green), info (blue), medication (purple)
- **DNA-inspired brand palette**: helixNavy, adenineTeal, guanineGreen, cytosineCyan, thymineGold
- **Typography**: System UI (interface), Source Serif 4 (body reading), monospace (code)
- **Motion**: Framer Motion presets in `lib/design-system/animations/`

Web design system: `lib/design-system/` — primitives (Radix UI-based), animations, hooks, personalization. Design tokens compatibility layer: `lib/design-tokens.ts`. PS surfaces have their own Apple-native cockpit styling layered on top.

CSS variables for theme: `app/globals.css`. Dark/light via Tailwind `dark:` variant + `class="dark"` on HTML. Tailwind CSS 4 (via `@tailwindcss/postcss`).

### Type System

**Central types** in `lib/types/` (re-exported via `lib/types/index.ts`):

- `rastreamentos.ts`: `Rastreamento`, `Recommendations`, `ConvergenciaStatus` (`'convergencia' | 'parcial' | 'divergencia' | 'em_disputa'`)
- `analysis.ts`, `analysis-medical.ts`: `CriticalAnalysis`, `Insight` (2nd/3rd order), `Controversy` (A vs B with synthesis)
- `references.ts`: `Citation` (Vancouver style, DOI/PMID)
- `community.ts`: Forum, case, mentorship, moderation types
- `region.ts`: `Region`, regional overlays
- `medicamento.ts`, `doenca.ts`: With regional overlay support and ontology codes
- `ciap2.ts`, `loinc.ts`, `pharmgkb.ts`, `ontologies.ts`, `dsm5.ts`: Ontology types
- `gamification.ts`, `learning.ts`, `study-mode.ts`, `education.ts`: Engagement layer
- `browser-apis.d.ts`: Ambient declarations for browser-only APIs

PS-specific types live in `lib/ps/contracts.ts` and `lib/ps/types.ts` (do not duplicate them under `lib/types/`).

**Ontology codes** (validated by `pnpm verify`):

- Diseases: ICD-10 (`cid10`), ICPC-2 (`ciap2`), LOINC, ORDO, HPO
- Medications: ATC (`atcCode`), PharmGKB

### Data Layer

All APS content is TypeScript constants (no database for core content):

- `lib/data/rastreamentos.ts`: Screening protocols
- `lib/data/analise-critica.ts` / `analise-critica-medica.ts`: Critical analyses (linked by `rastreamentoId`)
- `lib/data/references.ts`: Bibliography database
- `lib/data/medicamentos/` + `medicamentos.ts` + `medicamentos-expanded.ts`: Drug information modules
- `lib/data/doencas/` + `doencas.ts` + `doencas-expanded.ts`: Disease protocols
- `lib/data/regions/`: Regional medication/disease overlays
- `lib/data/protocolos-flowchart.ts`: Protocol flowchart definitions
- `lib/data/casos-clinicos/`, `flashcards/`, `quiz-questions/`, `learning-paths/`, `multimedia/`, `translations/`: Learning content
- `lib/data/ciap2-database.ts`, `loinc/`, `cross-references.ts`, `interacoes-medicamentosas.ts`, `sintomas.ts`: Coded knowledge

### Knowledge Graph

`lib/graph/` — semantic graph connecting medical entities. Node types: `doenca`, `medicamento`, `sintoma`, `exame`, `gene`, `protocolo`. Edge types: `causa`, `diagnostica`, `trata`, `interage`, `metaboliza`, `associado`.

### Search

`lib/search/` — Fuse.js fuzzy search with medical synonym expansion (`semanticSearch()`, `facetedSearch()`). Elasticsearch client (`lib/search/elasticsearch-client.ts`) is excluded from root type-check.

### Clinical Calculators

`lib/calculators/` — **26 validated scoring calculators** (in `lib/calculators/calculators/`):
4Ts-HIT, APACHE II, APFEL, APGAR, ASCVD, Bishop, Centor, CHA₂DS₂-VASc, Child-Pugh, CURB-65, Framingham, GAD-7, GCS, HAS-BLED, HEART score, MELD-Na, MMSE, NEWS2, Ottawa Ankle, PESI, PHQ-9, qSOFA, SOFA, TIMI STEMI, Wells PE.

Add new calculators in `lib/calculators/calculators/` following the `Calculator` interface, then register in `registry.ts`. PS additionally exposes critical-care–specific scores via `lib/ps/scores/` (cardio, neuro, supplemental).

### FHIR & Interoperability

`lib/fhir/` — FHIR R4 resource builders and converters: `patient`, `condition`, `medication`, `observation`, `encounter`, `bundle`, plus utility converters. Used by handoff/export flows. See `lib/fhir/INTEGRATION_GUIDE.md`.

### AI / ML

`lib/ai/` — client-side and server-orchestrated AI: BioBERT inference (`client-inference.ts`), citation extraction, confidence scoring, content generation, MiniMax integration, evaluation harness. The `onnxruntime-web` runtime is aliased to a mock for SSG (see `next.config.ts` → `turbopack.resolveAlias`). Heavy training pipelines live in `packages/ml-training/` (Python).

## TypeScript Configuration

Root `tsconfig.json` is strict, but **intentionally excludes**:

- `mobile/` and `packages/` — each package owns its own tsconfig
- `lib/supabase` — server utilities
- `lib/sync`
- `lib/search/elasticsearch-client.ts`
- `infrastructure`
- `lib/content-generation/**`
- Most `scripts/*.ts` and `scripts/*.js` (translate/extract/generate/integrate/validate/migrate/download/setup/fix/import)
- All test files (`__tests__`, `*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx`)

**Implications:**

- `pnpm type-check` does NOT prove the whole repo is type-safe.
- Workspace packages, mobile, and excluded scripts need manual review or per-package checks.
- `pnpm type-check` runs `node scripts/clean-next-types.js` first to clear stale `.next/types/` definitions.

**Path alias:** `@/*` maps to repository root. Use `@/lib/...`, `@/app/components/...`.

## Development Guidelines

### Adding New Screenings (APS)

1. Define data in `lib/data/rastreamentos.ts` (follow `Rastreamento` interface)
2. Create critical analysis in `lib/data/analise-critica.ts` with matching `rastreamentoId`
3. Add references to `lib/data/references.ts`
4. Create route in `app/[locale]/{category}/page.tsx` using `ContentModeWrapper`
5. Always provide BOTH descriptive and critical analysis content

### Adding New PS Protocols / Drugs / Scores

1. Protocols: add to `lib/ps/protocols.ts` with stepwise nodes; wire the slug under `app/[locale]/ps/protocolos/[slug]/`.
2. Drugs: extend one of `lib/ps/data/drogas-*.ts` (keep monographs in the same category file).
3. Scores: implement in `lib/ps/scores/` and export through `lib/ps/scores/index.ts`.
4. Persist case events through `psStore` so handoff export stays consistent.

### Citations

Every factual claim must have inline citations:

```tsx
<InlineCitation citation="[1], [2]" references={references} />
```

### Responsive Design

Mobile-first. Sidebar hidden on screens < lg (1024px). PS has a separate mobile nav (`PSMobileNav`). Test print styles for PDF export.

### Working Conventions

- Prefer `pnpm` over `npm` for direct commands (test:all uses `npm run` internally but day-to-day use pnpm).
- Do not rely on lint for validation; use `pnpm type-check` or targeted tests.
- When editing localized pages, check whether the route belongs under `app/[locale]/` or plain `app/`.
- When editing translations, keep locale JSON files aligned with the fallback behavior in `i18n/request.ts`.
- When editing build behavior, account for both SSR-on-Vercel and static-export paths.
- When editing workspace package usage, remember the root app transpiles selected packages rather than consuming built artifacts.
- Prefer importing from `lib/design-system/index.ts` and `lib/types/index.ts` over deep paths.

## Strategic Planning

- `ROADMAP.md` — 12-month implementation plan
- `PLANO_SUPERACAO_SOTA_DARWIN.md` — Strategic 6-dimension expansion plan
- `SOTA_COMPETITIVE_ANALYSIS.md` — Competitive analysis vs. UpToDate, Medscape
- `APS_MFC_FOCUS.md` — Primary Care focus repositioning
- `PS_VERTICAL_INDEX.md` — Entry point for all PS (Emergency) docs (spec, UI architecture, safety addendum, wireframes, evaluation, release notes)

## LLM Offload

Use `llm-offload` for bulk generation to save Anthropic tokens:

- `llm-offload -t expand -p local` — Expand outline (free, local Mistral)
- `llm-offload -t paraphrase -p grok` — Rewrite text (Grok)
- `llm-offload -t scaffold -p local` — Code boilerplate
- `llm-offload -t variations -p minimax` — Generate alternatives

**Workflow**: Claude designs → llm-offload expands → Claude critiques
