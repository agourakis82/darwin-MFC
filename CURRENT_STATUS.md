# Darwin-MFC Current Status

Last observed update: 2026-05-24

This document is the current operational truth for the repository. Older
roadmaps and status files are useful as historical planning records, but they
may describe features that have since changed, moved, or been superseded.

## Runtime

- App: Next.js 16 App Router with React 19
- Language: TypeScript 5
- Package manager: pnpm
- Declared package manager: `pnpm@11.3.0`
- Node target: `24.x`
- Local validated Node: `v24.16.0`
- Primary runtime target: SSR on Vercel
- Static export: supported only as a deliberate publishing path, not the
  default day-to-day validation path

## Setup

On this machine, source the Beagle project wrapper before running commands:

```bash
source /home/devsounio/projects/darwin-mfc/darwin-mfc-env.sh
```

For a fresh checkout elsewhere:

```bash
corepack enable
corepack prepare pnpm@11.3.0 --activate
pnpm install --frozen-lockfile
```

## Default Validation Gate

Use this for normal agent work:

```bash
pnpm type-check
pnpm test
pnpm build:vercel
```

Focused browser gate for clinical entry friction:

```bash
pnpm test:e2e:entry --project=chromium
```

On the Beagle machine, source the project wrapper first so Playwright can reuse
the Chromium installed for `agent-browser`.

Latest observed results:

- `pnpm install --frozen-lockfile`: passed
- `pnpm type-check`: passed
- `pnpm test`: passed, 13 integration checks, 0 failures, 0 warnings
- `pnpm build:vercel`: passed with Next.js 16.1.6
- browser smoke: passed for `/pt/` and `/pt/doencas/`
- `pnpm test:e2e:entry --project=chromium`: passed, 36 focused serial checks
  covering onboarding sequence, deep-link blockers, desktop shell overflow,
  mobile shell overflow, deep clinical content routes, and core static/PWA
  asset references

## Build Modes

### Vercel SSR

Use:

```bash
pnpm build:vercel
```

This is the primary validated build path. It preserves dynamic API routes and
avoids the large static export artifact.

Latest observed Vercel build:

- 4,800 prerendered pages
- dynamic API routes preserved
- build completed successfully

### Static Export

Plain `pnpm build` runs `next build`. In production without Vercel environment
markers, `next.config.ts` enables `output: "export"`.

This path is expensive. Latest observed static-export attempt:

- generated 16,527 static pages
- reached final export
- was intentionally stopped to protect disk space

Do not run the static export casually on the shared machine. Use it only when
the output target and disk budget are explicit.

## Current Scale

Observed scale:

- 85 route/layout/route-handler files under `app`
- 76 page files
- 6 API route handlers
- 9 locales: `pt`, `en`, `es`, `fr`, `ru`, `ar`, `zh`, `el`, `hi`
- more than 3,200 active app/data/message/doc files under the product surface
- more than 1,400 TypeScript/TSX files across app, components, lib, packages,
  scripts, and tests

Main product surfaces:

- primary care clinical reference
- population screening comparisons
- medication and disease reference
- emergency department / PS mode
- clinical calculators
- protocol flowcharts
- education and study mode
- community, auth, progress, and sync features
- AI/NLP extraction and evaluation
- FHIR/interoperability modules
- PWA/offline support

## Current Verified Data Checks

The integration verifier currently reports:

- LOINC integrated in 35 diseases
- ORDO integrated in 48 diseases
- HPO integrated in 26 diseases
- PharmGKB integrated in 51 medications
- 537 mapped LOINC codes
- 552 GRADE evidence citations
- knowledge graph with 2,678 nodes and 3,426 edges
- 9 configured locales, including RTL support for Arabic
- 368 diseases
- 717 medications
- all diseases have at least CID-10 or CIAP-2
- semantic search function available

## Recently Fixed

- Added missing `common.pwa` translation keys across all 9 locales.
- Split `/[locale]/ps/drogas/[id]` into a server page and client component.
- Added `generateStaticParams()` for emergency-drug detail pages.
- Added metadata generation for emergency-drug detail pages.
- Fixed Turbopack root inference with `turbopack.root`.
- Recorded pnpm native build approvals in `pnpm-workspace.yaml`.
- Reduced first-entry friction: the initial mode chooser now appears only on
  the landing route, not on direct clinical deep links.
- Added `tests/e2e/clinical-entry-friction.spec.ts` to keep clinical deep
  links free of the initial mode blocker.
- Added `allowedDevOrigins` for local `127.0.0.1` / `localhost` browser
  verification so the Next dev loop stays quiet.
- Observed transient Next dev-server `JSON.parse` 500s during concurrent route
  compilation in dev; the focused entry-friction gate is intentionally serial.
  Clean `.next` and rerun the focused gate before treating this as a product
  regression.
- Gave the PS route layout the same `#main-content` semantic landmark used by
  the primary clinical shell, and extended the focused e2e gate to assert it.
- Sequenced first-session onboarding so region selection appears before the
  PS/APS mode chooser; the mode chooser now waits for region onboarding to
  complete instead of stacking modals.
- Made `test:e2e:entry` serial by default to avoid noisy Next dev-server
  failures during concurrent route compilation.
- Disabled eager prefetch on permanent shell navigation links so opening the
  home route no longer asks Next dev to compile many heavy clinical routes at
  once.
- Adjusted the clinical header breakpoint and mobile controls so the shell does
  not overflow horizontally at 1360x860 desktop or 390x844 mobile viewports.
- Aligned app metadata, web manifest, and service-worker icon references with
  the actual icon files under `public/icons`.
- Added `public/favicon.ico` and `tests/e2e/static-assets.spec.ts` so favicon,
  manifest icons, and service-worker icon references are checked by the focused
  browser gate.
- Extended the focused browser gate to cover representative deep routes:
  disease detail, integrated clinical context, medication detail, calculator
  detail, standard/guided protocol flowcharts, and PS drug detail in desktop
  and mobile viewports.
- Removed nested `<main>` landmarks from standard and guided protocol
  flowchart clients so those routes keep a single primary `#main-content`
  landmark from the app shell.

## Workbench Context

Beagle Workbench slug:

```text
darwin-mfc
```

Control-plane docs:

- `/home/devsounio/projects/darwin-mfc/README.md`
- `/home/devsounio/projects/darwin-mfc/PLAN.md`
- `/home/devsounio/projects/darwin-mfc/SCALE_MAP.md`

Latest completed handoff:

- `msg_1779623008251_5757b366`
- `codex -> kimi`
- `Darwin-MFC Phase 3 UI-agent loop`
- completed by `codex` after the entry-friction UI-agent loop checkpoint

Latest open review handoff:

- `msg_darwin_mfc_deep_gate_kimi_review_20260524`
- `codex -> kimi`
- `Darwin-MFC deep clinical browser gate review`
- asks for concrete UX/accessibility blind spots and next high-leverage
  tests/fixes after the 36-check focused gate

## Next Recommended Work

1. Keep docs aligned with observed commands and tests.
2. Decide whether static export remains a first-class target.
3. Read and resolve the open Kimi review handoff against the now-expanded
   clinical browser gate.
4. Inventory AI/NLP/FHIR/Auth features as `live`, `fallback`,
   `experimental`, or `historical`.
