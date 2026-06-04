# Corte 2 Clinical Intelligence Pathspec - 2026-06-03

## Objetivo

Preparar o segundo corte de staging para a frente de calculadoras clinicas 2026. Este corte promove somente a camada `clinical-intelligence` e as calculadoras classificadas como `experimental` ou `prototype`, com gating explicito de backend e sem misturar Education/SOTA, ECG, expansoes de conteudo ou documentos promocionais antigos.

Comando reprodutivel:

```bash
npx tsx scripts/plan-corte2-staging.ts --format=summary
```

Resultado atual:

```text
changed files: 235
candidate paths: 20
required changed: 12
calculator changed: 8
excluded changed: 163
uncovered changed: 0
required missing from worktree: 0
index already staged: 72
safe to stage as Corte 2: true
```

## Pathspec Atual

```text
app/[locale]/calculadoras/CalculadorasHubClient.tsx
app/[locale]/calculadoras/[id]/CalculatorDetailClient.tsx
app/[locale]/calculadoras/[id]/page.tsx
docs/CLINICAL_INTELLIGENCE_AUDIT_2026-06-03.md
docs/CORTE2_CLINICAL_INTELLIGENCE_PATHSPEC_2026-06-03.md
lib/calculators/calculators/ai-powered-sepsis-score-2025.ts
lib/calculators/calculators/cancer-risk-prediction-2025.ts
lib/calculators/calculators/genomic-multiomic-risk.ts
lib/calculators/calculators/index.ts
lib/calculators/calculators/pharmacogenomics-precision.ts
lib/calculators/calculators/precision-frailty-index-2025.ts
lib/calculators/calculators/prevent-score-2025.ts
lib/calculators/calculators/sota-metabolic-risk-2025.ts
lib/calculators/calculators/stroke-temporal-evolution.ts
lib/calculators/clinical-intelligence.ts
lib/calculators/index.ts
lib/calculators/types.ts
lib/clinical-intelligence/config.ts
scripts/audit-clinical-intelligence.ts
scripts/plan-corte2-staging.ts
```

## Exclusoes Confirmadas

Continuam fora do Corte 2:

- `.roomodes` e `.roo/`
- `/learn/diagnosis`, SOTA API/WebSocket e incubadora educacional
- ECG clinico
- expansoes massivas de doencas/medicamentos
- demos HTML/JSON/imagens
- docs SOTA antigas e docs de estrategia nao operacionais
- `lib/calculators/calculators/sota-calculators-index.ts`, porque ainda contem framing SOTA promocional antigo e nao e importado pelo registro clinico atual

## Gates Antes De Commit

```bash
npx tsx scripts/plan-corte2-staging.ts --format=summary
npx tsx scripts/audit-clinical-intelligence.ts --format=summary
npm run type-check
npm run lint -- --quiet
npm run verify
npm run build
git diff --cached --check
```

## Estado Clinico Validado

- 8 calculadoras com `versionYear: 2026`
- 5 calculadoras visiveis
- 3 prototipos ocultos
- 0 prototipos visiveis
- 0 calculadoras dependentes de backend calculaveis sem configuracao
- 0 erros / 0 warnings na auditoria `clinical-intelligence`
