# Corte 1 Staging Pathspec - 2026-06-03

## Objetivo

Preparar o primeiro corte de staging sem executar `git add`. Este corte estabiliza esteira, static export, auditorias e fixes de desbloqueio, sem misturar calculadoras clinicas 2026, Education/SOTA, ECG, expansoes de conteudo ou Roo.

Comando reprodutivel:

```bash
npm run plan:corte1 -- --format=summary
```

Resultado atual:

```text
changed files: 257
candidate paths: 56
required changed: 28
optional changed: 28
excluded changed: 201
uncovered changed: 0
required missing from worktree: 0
index already staged: 257
safe to stage as Corte 1: true
```

## Pathspec Atual

```text
.gitignore
AGENTS.md
CLAUDE.md
app/[locale]/learn/paths/[pathId]/LearningPathClient.tsx
app/[locale]/learn/progress/page.tsx
app/[locale]/outros/page.tsx
app/[locale]/preventive-dashboard/page.tsx
app/components/Learning/PathCard.tsx
app/components/Learning/ProgressBar.tsx
app/components/Navigation/MobileBottomNav.tsx
docs/AGENT_CONFIG_AUDIT_2026-06-03.md
docs/CONTENT_EXPANSION_AUDIT_2026-06-03.md
docs/CORTE1_STAGING_PATHSPEC_2026-06-03.md
docs/ECG_MODULE_AUDIT_2026-06-03.md
docs/EDUCATION_INCUBATOR_AUDIT_2026-06-03.md
docs/PRIMARY_SURFACE_AUDIT_2026-06-03.md
docs/REPO_AUDIT_2026-06-03.md
docs/SECURITY_DEPENDENCY_AUDIT_2026-06-03.md
docs/STAGING_MANIFEST_2026-06-03.md
docs/STATIC_EXPORT_SECURITY.md
eslint.config.mjs
lib/hosting/static-security.ts
lib/search/advancedSearch.ts
lib/search/searchIndex.ts
lib/utils/recommendations.ts
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
middleware.ts
next.config.ts
package-lock.json
package.json
scripts/audit-agent-config.ts
scripts/audit-content-expansions.ts
scripts/audit-ecg-module.ts
scripts/audit-education-incubator.ts
scripts/audit-primary-surface.ts
scripts/audit-repo-state.ts
scripts/audit-security-dependencies.ts
scripts/plan-corte1-staging.ts
tsconfig.json
```

## Comando De Staging Se O Usuario Pedir

Nao executado nesta auditoria.

```bash
git add -- '.gitignore' 'AGENTS.md' 'CLAUDE.md' 'app/[locale]/learn/paths/[pathId]/LearningPathClient.tsx' 'app/[locale]/learn/progress/page.tsx' 'app/components/Learning/PathCard.tsx' 'app/components/Learning/ProgressBar.tsx' 'app/components/Navigation/MobileBottomNav.tsx' 'docs/AGENT_CONFIG_AUDIT_2026-06-03.md' 'docs/CONTENT_EXPANSION_AUDIT_2026-06-03.md' 'docs/CORTE1_STAGING_PATHSPEC_2026-06-03.md' 'docs/ECG_MODULE_AUDIT_2026-06-03.md' 'docs/EDUCATION_INCUBATOR_AUDIT_2026-06-03.md' 'docs/REPO_AUDIT_2026-06-03.md' 'docs/SECURITY_DEPENDENCY_AUDIT_2026-06-03.md' 'docs/STAGING_MANIFEST_2026-06-03.md' 'docs/STATIC_EXPORT_SECURITY.md' 'eslint.config.mjs' 'lib/hosting/static-security.ts' 'lib/search/advancedSearch.ts' 'lib/search/searchIndex.ts' 'lib/utils/recommendations.ts' 'messages/ar/common.json' 'messages/ar/learning.json' 'messages/el/common.json' 'messages/el/learning.json' 'messages/en/common.json' 'messages/en/learning.json' 'messages/es/common.json' 'messages/es/learning.json' 'messages/fr/common.json' 'messages/fr/learning.json' 'messages/hi/common.json' 'messages/hi/learning.json' 'messages/pt/common.json' 'messages/pt/learning.json' 'messages/ru/common.json' 'messages/ru/learning.json' 'messages/zh/common.json' 'messages/zh/learning.json' 'middleware.ts' 'next.config.ts' 'package-lock.json' 'package.json' 'scripts/audit-agent-config.ts' 'scripts/audit-content-expansions.ts' 'scripts/audit-ecg-module.ts' 'scripts/audit-education-incubator.ts' 'scripts/audit-repo-state.ts' 'scripts/audit-security-dependencies.ts' 'scripts/plan-corte1-staging.ts' 'tsconfig.json'
git diff --cached --stat && git diff --cached --check
```

## Exclusoes Confirmadas

Continuam fora do Corte 1:

- `.roomodes` e `.roo/`
- calculadoras clinicas 2026
- `clinical-intelligence`
- `learn/diagnosis`, SOTA API/WebSocket e incubadora educacional
- ECG clinico
- expansoes massivas de doencas/medicamentos
- demos HTML/JSON/imagens
- docs SOTA antigas e docs de estrategia nao operacionais

## Gates Antes De Commit

```bash
npm run plan:corte1 -- --format=summary
npm run audit:repo -- --format=summary
npm run type-check
npm run lint
npm run verify
npm run build
```

Opcional antes de commit:

```bash
npm run dev
```

Confirmar no dev server:

- sem erro de middleware com `output: "export"`;
- sem warning de root Turbopack;
- rota raiz e uma rota locale respondem.
