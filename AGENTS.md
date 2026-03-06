# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Build Commands

```bash
pnpm dev                    # Development server
pnpm build                  # Production build (static export for non-Vercel)
VERCEL=1 pnpm build         # SSR build for Vercel
USE_BASE_PATH=true pnpm build  # Build with /darwin-MFC basePath for GitHub Pages
```

## Test Commands

```bash
pnpm test:e2e               # All Playwright E2E tests
pnpm test:e2e -- --grep "test name"  # Run specific test
pnpm test:e2e:ui            # Playwright UI mode
pnpm test:visual            # Visual regression tests
pnpm test                   # Integration verification (tsx scripts/verify-integration.ts)
```

## Critical Project Patterns

- **Monorepo**: pnpm workspaces with `packages/*` - internal packages: `@darwin-mfc/design-tokens`, `@darwin-mfc/protocol-runner`, `@darwin-mfc/protocol-data`
- **No linter configured**: `pnpm lint` just echoes success - rely on `pnpm type-check`
- **TypeScript exclusions**: `tsconfig.json` excludes `mobile/`, `packages/`, `lib/supabase/`, `lib/sync/`, `lib/search/elasticsearch-client.ts`, `infrastructure/`, `lib/content-generation/**`, `scripts/test-*.ts` - these may have separate configs or be intentionally untyped
- **i18n**: Uses `next-intl` with JSON files in `messages/{locale}/*.json` - loaded dynamically in `i18n/request.ts`
- **Design System**: Central export at `lib/design-system/index.ts` - import components/tokens from `@/lib/design-system`
- **Types**: Centralized re-exports at `lib/types/index.ts`
- **Static vs SSR**: Build output depends on `VERCEL` env var - static export only when `!isVercel && NODE_ENV=production`

## Environment Setup

Copy `.env.example` to `.env.local`. Required for full functionality:
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (primary backend)
- `NEXT_PUBLIC_SEARCH_URL` for Meilisearch (optional)

## Architecture Notes

- `app/[locale]/` contains locale-aware pages; `app/` root is for non-localized pages only
- Legacy PHP API and Keycloak are deprecated (see `.env.example`)
- SOTA infrastructure (Elasticsearch, Neo4j) uses separate docker-compose: `docker-compose.sota.yml`
