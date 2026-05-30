# Darwin-MFC

Interactive global guide for Family and Community Medicine.

Darwin-MFC combines evidence-based clinical reference material, population
screening comparisons, medications, diseases, emergency protocols, calculators,
education tools, multilingual content, and interoperability experiments in one
Next.js application.

Live site:

```text
https://mfc.agourakis.med.br
```

Current operational status:

- [CURRENT_STATUS.md](./CURRENT_STATUS.md)

## Current Stack

- Next.js 16 App Router
- React 19
- TypeScript 5
- Tailwind CSS 4
- pnpm `11.3.0`
- Node `24.x`
- `next-intl` with 9 locales
- Zustand, Recharts, Fuse.js, Lucide
- Supabase, PWA, FHIR, AI/NLP, and sync modules in active or experimental
  product areas

## Product Surfaces

- primary care clinical reference
- disease and medication database
- population screening comparisons
- emergency department / PS mode
- clinical calculators
- protocol flowcharts
- study mode, quizzes, flashcards, learning paths, and certificates
- community, auth, notes, progress, and sync features
- knowledge graph, ontology, LOINC, PharmGKB, HPO, ORDO, and GRADE evidence
  integrations
- AI/NLP extraction and clinical decision-support experiments
- FHIR/interoperability modules

## Setup

Use Node 24 and pnpm. On this Beagle machine, source the project wrapper:

```bash
source /home/devsounio/projects/darwin-mfc/darwin-mfc-env.sh
cd /home/devsounio/darwin-MFC
pnpm install --frozen-lockfile
```

For a fresh machine:

```bash
corepack enable
corepack prepare pnpm@11.3.0 --activate
pnpm install --frozen-lockfile
```

## Development

```bash
pnpm dev
```

Default local URL:

```text
http://localhost:3000
```

If that port is busy:

```bash
pnpm exec next dev -H 0.0.0.0 -p 3024
```

## Validation

Normal gate for agent work:

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
the Chromium already installed for browser-agent verification. This focused
gate runs serially by default because Next dev route compilation has shown
transient failures under concurrent route pressure. It covers first-session
onboarding order, clinical deep links, desktop/mobile shell overflow, deep
clinical content routes, and core static/PWA asset references.

`pnpm test` runs the integration verifier for medical data, ontology coverage,
translations, knowledge graph shape, and semantic-search availability.

## Build Modes

Use this for the primary runtime target:

```bash
pnpm build:vercel
```

This forces the Vercel SSR path and preserves dynamic API routes.

Be careful with:

```bash
pnpm build
```

Plain production build enables static export when Vercel environment markers
are absent. The static-export path is large: the latest observed run generated
16,527 pages before final export was intentionally stopped to protect disk
space. Use it only when the static publishing target and disk budget are
explicit.

## Project Scale

This is a large product repo, not a small website. Current observed scale:

- 85 route/layout/route-handler files
- 76 page files
- 6 API route handlers
- 9 locales
- more than 3,200 active app/data/message/doc files under the product surface
- more than 1,400 TypeScript/TSX files across app, components, lib, packages,
  scripts, and tests

See:

- [CURRENT_STATUS.md](./CURRENT_STATUS.md)
- `/home/devsounio/projects/darwin-mfc/SCALE_MAP.md`

## Internationalization

Locales:

```text
pt en es fr ru ar zh el hi
```

English is used as the completeness fallback for missing message keys, while
Portuguese remains the default locale.

## Citation

This project uses FORCE11-compliant citation metadata. See:

- [CITATION.cff](./CITATION.cff)

DOI:

```text
10.5281/zenodo.17987610
```

## License

- Code: MIT License
- Clinical content: CC-BY-4.0

See `LICENSE` and `CONTENT_LICENSE`.

## Authors

Demetrios Chiuratto Agourakis, MD

- ORCID: `0009-0001-8671-8878`
- GitHub: `agourakis82`

Isadora Casagrande Amalcaburio

- ORCID: `0009-0005-6883-1809`

## Medical Disclaimer

Darwin-MFC is educational and informational software. It is not a substitute
for clinical judgment, local protocols, or professional medical care.
