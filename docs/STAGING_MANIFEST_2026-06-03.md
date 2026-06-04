# Darwin-MFC Staging Manifest - 2026-06-03

## Objetivo

Organizar a arvore atual em cortes pequenos, verificaveis e semanticamente coerentes. A arvore tem mudancas expandidas em varios dominios e nao deve virar um commit unico.

Use `npm run audit:repo -- --format=summary` para atualizar a contagem, `npm run audit:repo -- --domain=<dominio> --format=list` para listar um dominio com status, e `npm run audit:repo -- --domain=<dominio> --format=paths` para obter apenas paths.

Use `npm run plan:corte1 -- --format=summary` para validar o pathspec do Corte 1 sem stagear nada. O pathspec atual esta documentado em `docs/CORTE1_STAGING_PATHSPEC_2026-06-03.md`.

## Estado Atual Por Dominio

| Dominio | Contagem | Tratamento |
| --- | ---: | --- |
| `education-sota-incubator` | 68 | Quarentena fisica em `incubator/education-sota/`; nao promover ao app medico. |
| `content-expansion` | 65 | Quarentena fisica em `incubator/content-expansion/`; precisa validador de schema/citacoes. |
| `i18n` | 18 | Pode entrar com Corte 1 se for necessario para gates, ou ficar em corte proprio de i18n. |
| `docs-strategy` | 23 | Corte 8 documenta quarentena; nao promover docs SOTA antigas como produto clinico. |
| `agent-config` | 17 | Nao stagear sem confirmacao; altera fluxo Roo/agentes. Auditoria atual recomenda nao stagear `.roomodes`. |
| `clinical-intelligence-calculators` | 16 | Corte 2. |
| `scripts` | 16 | `audit-repo-state.ts` entra no Corte 1; scripts de auditoria acompanham seus cortes. |
| `ecg-clinical-module` | 14 | Corte futuro com testes clinicos dedicados. |
| `tooling-config` | 8 | Corte 1. |
| `learning-ui` | 5 | Corte de i18n/learn separado, se necessario. |
| `primary-surface-audit` | 4 | Corte 1; limpa copy visivel e adiciona auditor de superficie primaria. |
| `search-recommendations` | 3 | Pode entrar no Corte 1 se for parte dos fixes de static export/localStorage. |

## Corte 1 - Esteira E Static Export

### Intencao

Estabilizar a esteira do app estatico sem misturar novas features clinicas, ECG, educacao SOTA ou expansoes massivas.

### Arquivos Para Staging

Tooling/static export:

```text
.gitignore
eslint.config.mjs
middleware.ts
next.config.ts
package.json
package-lock.json
tsconfig.json
lib/hosting/static-security.ts
scripts/audit-repo-state.ts
scripts/audit-agent-config.ts
scripts/audit-content-expansions.ts
scripts/audit-ecg-module.ts
scripts/audit-education-incubator.ts
scripts/audit-primary-surface.ts
scripts/audit-security-dependencies.ts
scripts/plan-corte1-staging.ts
```

Docs operacionais:

```text
docs/REPO_AUDIT_2026-06-03.md
docs/CORTE1_STAGING_PATHSPEC_2026-06-03.md
docs/STATIC_EXPORT_SECURITY.md
docs/STAGING_MANIFEST_2026-06-03.md
docs/PRIMARY_SURFACE_AUDIT_2026-06-03.md
docs/CONTENT_EXPANSION_AUDIT_2026-06-03.md
docs/ECG_MODULE_AUDIT_2026-06-03.md
docs/EDUCATION_INCUBATOR_AUDIT_2026-06-03.md
docs/SECURITY_DEPENDENCY_AUDIT_2026-06-03.md
docs/AGENT_CONFIG_AUDIT_2026-06-03.md
CLAUDE.md
AGENTS.md
```

Possiveis fixes associados a static export/localStorage/i18n, se o diff confirmar que sao apenas desbloqueio da esteira:

```text
messages/ar/common.json
messages/ar/learning.json
messages/el/common.json
messages/el/learning.json
messages/en/common.json
messages/en/learning.json
messages/es/common.json
messages/es/learning.json
messages/fr/common.json
messages/fr/learning.json
messages/hi/common.json
messages/hi/learning.json
messages/pt/common.json
messages/pt/learning.json
messages/ru/common.json
messages/ru/learning.json
messages/zh/common.json
messages/zh/learning.json
app/[locale]/learn/paths/[pathId]/LearningPathClient.tsx
app/[locale]/learn/progress/page.tsx
app/components/Learning/PathCard.tsx
app/components/Learning/ProgressBar.tsx
app/components/Navigation/MobileBottomNav.tsx
lib/search/advancedSearch.ts
lib/search/searchIndex.ts
lib/utils/recommendations.ts
```

### Nao Incluir No Corte 1

```text
app/[locale]/calculadoras/
lib/calculators/
lib/clinical-intelligence/
incubator/education-sota/
app/components/SOTA/
lib/api/sota-*
lib/store/sotaStore.ts
lib/hooks/useSotaWebSocket.ts
lib/medical-education*
incubator/education-sota/packages/medical-education-sota/
app/components/ECG/
lib/data/ecg/
lib/services/ecg-clinical-support.ts
lib/types/ecg.ts
incubator/content-expansion/doencas/expansao-800/
incubator/content-expansion/medicamentos/expansao-1000/
public/demo-data.json
public/demo-questoes-medicas.html
github-qti-medical-search.png
qti-ims-global-main.png
.roo/
.roomodes
```

### Gates Do Corte 1

```bash
npm run --silent audit:repo -- --format=summary
npm run --silent plan:corte1 -- --format=summary
npm run type-check
npm run lint
npm run verify
npm run build
npm run dev
```

No `npm run dev`, confirmar:

- sem aviso `Middleware cannot be used with "output: export"`;
- sem aviso de root inferido do Turbopack;
- app responde em `http://localhost:3000`.

## Corte 2 - Inteligencia Clinica 2026 / Calculadoras

### Intencao

Publicar a camada de calculadoras clinicas 2026 com evidencia explicita, disclaimers e bloqueio de backend sem mocks.

### Arquivos

Use:

```bash
npm run --silent audit:repo -- --domain=clinical-intelligence-calculators --format=list
```

Para obter paths puros para revisao/staging:

```bash
npm run --silent audit:repo -- --domain=clinical-intelligence-calculators --format=paths
```

Lista atual:

```text
app/[locale]/calculadoras/CalculadorasHubClient.tsx
app/[locale]/calculadoras/[id]/CalculatorDetailClient.tsx
app/[locale]/calculadoras/[id]/page.tsx
lib/calculators/calculators/index.ts
lib/calculators/index.ts
lib/calculators/types.ts
lib/calculators/calculators/ai-powered-sepsis-score-2025.ts
lib/calculators/calculators/cancer-risk-prediction-2025.ts
lib/calculators/calculators/genomic-multiomic-risk.ts
lib/calculators/calculators/pharmacogenomics-precision.ts
lib/calculators/calculators/precision-frailty-index-2025.ts
lib/calculators/calculators/prevent-score-2025.ts
lib/calculators/calculators/sota-calculators-index.ts
lib/calculators/calculators/sota-metabolic-risk-2025.ts
lib/calculators/calculators/stroke-temporal-evolution.ts
lib/calculators/clinical-intelligence.ts
lib/clinical-intelligence/config.ts
```

### Gates Extras

- Verificar hub de calculadoras no browser.
- Verificar detalhe de PREVENT 2026.
- Verificar detalhe de uma calculadora `requiresBackend`.
- Confirmar que prototipos nao aparecem no hub e nao entram em `generateStaticParams`.

## Corte 3 - Agent Config / Roo

Auditoria atual: `docs/AGENT_CONFIG_AUDIT_2026-06-03.md`.

Promover apenas a fusao aditiva que preserva os modos clinicos/de qualidade existentes e adiciona modos novos sem substituir o workflow clinico.

Planejador:

```bash
npm run --silent audit:agent-config -- --format=summary
npm run --silent plan:corte3 -- --format=summary
```

## Corte 4 - ECG Clinico

Auditoria atual: `docs/ECG_MODULE_AUDIT_2026-06-03.md`.

Promover apenas com smoke de triagem, red flags e encaminhamento. O Corte 4 atual tambem cobre o normalizador que faz `STEMI` textual gerar encaminhamento emergencial para hemodinamica.

Planejador:

```bash
npm run --silent audit:ecg
npm run --silent plan:corte4 -- --format=summary
```

## Corte 5 - Educacao/SOTA Incubator

Nao misturar com o app medico clinico. Decidir antes:

- produto separado;
- pacote separado;
- pasta de incubacao;
- descarte/arquivo historico.

Auditoria atual: `docs/EDUCATION_INCUBATOR_AUDIT_2026-06-03.md`.
Quarentena: `docs/CORTE5_EDUCATION_INCUBATOR_QUARANTINE_2026-06-03.md`.

Nota: a rota `learn/diagnosis` e os componentes/libs SOTA foram movidos para `incubator/education-sota/`, fora do App Router e fora dos namespaces principais `app/`/`lib/`. O build local nao deve exportar `/learn/diagnosis` enquanto ela permanecer arquivada.

Planejador:

```bash
npm run --silent audit:education-incubator -- --format=summary
npm run --silent plan:corte5 -- --format=summary
```

## Corte 6 - Expansoes De Conteudo

Promover apenas depois de:

- validador de schema;
- verificacao de citacoes;
- deduplicacao;
- prova de conexao aos indices principais;
- amostragem clinica.

Auditoria atual: `docs/CONTENT_EXPANSION_AUDIT_2026-06-03.md`.
Quarentena: `docs/CORTE6_CONTENT_EXPANSION_QUARANTINE_2026-06-03.md`.

Planejador:

```bash
npm run --silent audit:content-expansions -- --format=summary
npm run --silent plan:corte6 -- --format=summary
```

## Corte 7 - Segurança De Dependencias

`npm audit` ainda aponta 10 vulnerabilidades. Fazer em corte proprio, especialmente porque `jspdf` requer upgrade major.

Auditoria atual: `docs/SECURITY_DEPENDENCY_AUDIT_2026-06-03.md`.
Plano: `docs/CORTE7_SECURITY_DEPENDENCIES_2026-06-03.md`.

Planejador:

```bash
npm run --silent audit:security-deps -- --format=summary
npm run --silent plan:corte7 -- --format=summary
```

## Corte 8 - Docs Strategy

Docs SOTA/estrategia historicas ficam fora da documentacao primaria do app clinico ate reescrita cautelosa.

Auditoria atual: `docs/DOCS_STRATEGY_AUDIT_2026-06-03.md`.
Quarentena: `docs/CORTE8_DOCS_STRATEGY_QUARANTINE_2026-06-03.md`.

Planejador:

```bash
npm run --silent audit:docs-strategy -- --format=summary
npm run --silent plan:corte8 -- --format=summary
```
