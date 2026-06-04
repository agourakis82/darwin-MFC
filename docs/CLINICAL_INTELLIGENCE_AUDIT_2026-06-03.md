# Clinical Intelligence Calculators Audit - 2026-06-03

## Objective

Audit the Darwin-MFC calculator work as a clinical medical-app feature, not an education or LMS feature. The 2026 calculator layer must expose cautious clinical decision-support language, explicit evidence maturity, and safe fallback behavior when the external clinical backend is unavailable.

## Current Contract

- Product framing: clinical medical app.
- Feature name: Clinical Intelligence 2026 / Clinical Calculators 2026.
- Static export remains the app contract; authenticated clinical AI/proxy calls must live in an external backend, not a Next API route.
- Backend configuration is centralized through `lib/clinical-intelligence/config.ts`.
- Calculator metadata is optional for legacy tools but required for `versionYear: 2026` calculators:
  - `evidenceLevel`: `validated | experimental | prototype`
  - `clinicalUse`: `screening | risk_stratification | triage | treatment_support | research_only`
  - `disclaimer`
  - `requiresBackend`
  - `versionYear: 2026`

## Audit Command

```bash
npx tsx scripts/audit-clinical-intelligence.ts --format=summary
```

Current result:

```text
clinical intelligence calculators: 8
visible: 5
hidden: 3
visible prototypes: 0
backend calculable without config: 0
errors: 0
warnings: 0
```

JSON inspection also confirmed:

- `totalCalculators`: 33
- `clinicalIntelligenceCount`: 8
- `visibleClinicalIntelligenceCount`: 5
- `hiddenClinicalIntelligenceCount`: 3
- `visiblePrototypeCount`: 0
- `backendCalculableWithoutConfigCount`: 0

## Visible Calculators

| Calculator | Evidence | Clinical use | Backend | Calculates without backend |
| --- | --- | --- | --- | --- |
| `sota-metabolic-risk-2025` | experimental | risk stratification | required | no |
| `ai-powered-sepsis-score-2025` | experimental | triage | required | no |
| `precision-frailty-index-2025` | experimental | risk stratification | required | no |
| `prevent-score-2025` | experimental | risk stratification | not required | yes |
| `pharmacogenomics-precision` | experimental | treatment support | required | no |

The remaining file names still include `2025` or `sota` for compatibility and low-churn staging, but the exposed product contract and UI copy are Clinical Intelligence 2026.

## Hidden Prototypes

| Calculator | Evidence | Clinical use | Backend | UI/SSG exposure |
| --- | --- | --- | --- | --- |
| `genomic-multiomic-risk` | prototype | research only | required | hidden |
| `cancer-risk-prediction-2025` | prototype | research only | required | hidden |
| `stroke-temporal-evolution` | prototype | research only | required | hidden |

Prototype calculators are filtered by `isCalculatorVisible`, excluded from `getVisibleCalculatorIds`, and blocked by `canCalculateClinically`.

## Acceptance Evidence

- `npm run type-check`: passed.
- `npm run build`: passed and generated 5655 static pages.
- `npm run verify`: passed with 8 OK, 0 failures, 3 warnings.
- `npm run lint -- --quiet`: passed with 0 errors.
- `npx tsx scripts/audit-clinical-intelligence.ts --format=summary`: passed with 0 errors and 0 warnings.
- `git diff --check` over the clinical slice: passed.

## Remaining Boundaries

- Do not promote `/learn/diagnosis` as part of this clinical calculator layer.
- Do not expose backend-dependent calculators with mocked clinical results.
- Do not stage legacy SOTA promotional docs as clinical product docs unless they are rewritten or explicitly marked historical/internal; current historical copies are quarantined under `incubator/education-sota/docs/strategy/`.
- Do not stage `lib/calculators/calculators/sota-calculators-index.ts` unless it is rewritten; it still contains old promotional SOTA framing and is not imported by the current clinical calculator registry.
- Keep full clinical backend/auth behind a separate proxy/service compatible with static export.
