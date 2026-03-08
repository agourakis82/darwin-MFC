# AGENTS.md

Guidance for agents working in `/home/demetrios/darwin-MFC`.

## Project Snapshot

- Root app: Next.js 16 App Router with React 19 and `next-intl`
- Package manager: `pnpm`
- Workspace layout: `packages/*`
- Primary runtime target: SSR on Vercel, static export for non-Vercel production builds
- Styling stack: Tailwind CSS 4 plus shared workspace design tokens

## Core Commands

```bash
pnpm dev
pnpm build
pnpm build:vercel
USE_BASE_PATH=true pnpm build
pnpm build:custom-domain
pnpm analyze
pnpm start
```

## Validation Commands

```bash
pnpm type-check
pnpm test
pnpm test:integration
pnpm test:e2e
pnpm test:e2e -- --grep "name"
pnpm test:visual
pnpm test:accessibility
pnpm test:lighthouse
```

Notes:
- `pnpm lint` is a stub that only prints success.
- `pnpm test` and `pnpm test:integration` both run `tsx scripts/verify-integration.ts`.
- `pnpm test:all` uses `npm run ...` internally; do not assume it is the preferred day-to-day entrypoint.

## Storybook and Design Token Utilities

```bash
pnpm storybook
pnpm build-storybook
pnpm storybook:a11y
pnpm audit:tokens
pnpm generate-icons
```

## Translation and Content Pipelines

```bash
pnpm translate:all
pnpm translate:medications
pnpm translate:diseases
pnpm translate:clinical-cases
pnpm translate:flashcards
pnpm translate:quizzes
pnpm translate:validate
```

Most translation and content-generation scripts are intentionally excluded from the root TypeScript project. If you edit them, do not assume `pnpm type-check` covers them.

## SOTA / Search / Graph Commands

```bash
pnpm sota:start
pnpm sota:stop
pnpm sota:restart
pnpm sota:logs
pnpm sota:setup:elasticsearch
pnpm sota:setup:neo4j
pnpm sota:setup:all
pnpm sota:test:clinpgx
pnpm sota:test:integration
pnpm sota:download:clinpgx
```

Infra lives behind `docker-compose.sota.yml` and is separate from the default frontend workflow.

## Workspace Structure

- Root web app: `app/`, `components/`, `lib/`, `messages/`, `public/`
- Localized routes: `app/[locale]/`
- Non-localized root routes: `app/` outside `[locale]`
- Shared packages:
  - `packages/design-tokens` -> `@darwin-mfc/design-tokens`
  - `packages/medical-data` -> `@darwin-mfc/medical-data`
  - `packages/protocol-data` -> `@darwin-mfc/protocol-data`
  - `packages/protocol-runner` -> `@darwin-mfc/protocol-runner`
  - `packages/mobile` -> Expo mobile app

## Build and Deployment Rules

- `pnpm build` runs `next build`.
- Static export happens only when `NODE_ENV=production` and Vercel env markers are absent.
- `pnpm build:vercel` forces the Vercel SSR path with `VERCEL=1`.
- `USE_BASE_PATH=true pnpm build` enables `/darwin-MFC` as `basePath` for GitHub Pages subdirectory hosting.
- `pnpm build:custom-domain` builds and then runs `scripts/fix-custom-domain-links.js`.

Relevant config: `next.config.ts`

Important behavior from config:
- `output: "export"` is enabled only for non-Vercel production builds.
- Image optimization is disabled for static export builds.
- Workspace packages are transpiled through `transpilePackages`.
- `onnxruntime-web` is aliased/externalized to avoid breaking SSG.

## Internationalization

- `next-intl` is configured through `i18n/request.ts`.
- Messages are loaded from `messages/{locale}/*.json`.
- Current locale folders: `ar`, `el`, `en`, `es`, `fr`, `hi`, `pt`, `ru`, `zh`
- Route handling relies on `app/[locale]/`.
- Translation loading uses layered fallback merging. English is used as the completeness fallback when available, even though the default locale is not necessarily English.
- Missing messages are intentionally tolerated during build; fallback keys are rendered instead of throwing.

If you touch message loading, preserve the static-export-safe fallback behavior.

## TypeScript Boundaries

Root `tsconfig.json` is strict, but it intentionally excludes several areas:

- `mobile/`
- `packages/`
- `lib/supabase`
- `lib/sync`
- `lib/search/elasticsearch-client.ts`
- `infrastructure`
- `lib/content-generation/**`
- many `scripts/*.ts` and `scripts/*.js` utility files
- test files under `__tests__`, `*.test.*`, `*.spec.*`

Implications:
- Passing `pnpm type-check` does not prove the whole repo is type-safe.
- Workspace packages and the mobile app may need their own checks.
- Script changes often require manual review because they are outside the main TS program.

## Design System and Shared Imports

- Prefer the central design-system exports from `lib/design-system/index.ts`.
- Shared type re-exports live in `lib/types/index.ts`.
- Shared visual tokens are published from `@darwin-mfc/design-tokens`.
- Protocol logic and datasets are split between `@darwin-mfc/protocol-runner`, `@darwin-mfc/protocol-data`, and `@darwin-mfc/medical-data`.

## Environment Setup

Copy `.env.example` to `.env.local`.

Commonly relevant variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SEARCH_URL`
- `NEXT_PUBLIC_SEARCH_API_KEY`
- `NEXT_PUBLIC_ENABLE_AUTH`
- `NEXT_PUBLIC_ENABLE_COMMUNITY`
- `NEXT_PUBLIC_ENABLE_LEARNING`
- `NEXT_PUBLIC_ENABLE_PWA`
- `NEXT_PUBLIC_DEBUG`

Optional or feature-specific env groups exist for:
- Elasticsearch
- Neo4j
- ClinPGx / PharmGKB
- BioBERT / local ML inference
- NCBI
- Google OAuth
- future FHIR integration
- LOINC licensing

Deprecated env blocks are still documented in `.env.example`:
- legacy PHP API, marked for removal in May 2026
- legacy Keycloak auth

## Working Conventions

- Prefer `pnpm` over `npm` for direct commands.
- Do not rely on lint for validation; use `pnpm type-check` or targeted tests.
- When editing localized pages, check whether the route belongs under `app/[locale]/` or plain `app/`.
- When editing translations, keep locale JSON files aligned with the fallback behavior in `i18n/request.ts`.
- When editing build behavior, account for both SSR-on-Vercel and static-export paths.
- When editing workspace package usage, remember the root app transpiles selected packages rather than consuming built artifacts.
