# Darwin-MFC Repo Audit - 2026-06-03

## Escopo

Auditoria do estado atual do repositorio Darwin-MFC apos a reorganizacao inicial e o reenquadramento das calculadoras como Inteligencia Clinica 2026. O objetivo e separar o que esta pronto para integrar/publicar, o que e prototipo, e quais riscos bloqueiam uma consolidacao segura.

Este documento nao declara o repo como finalizado. Ele registra evidencia atual e proximos cortes recomendados.

## Evidencia Executada

| Gate | Resultado | Observacao |
| --- | --- | --- |
| `npm run type-check` | PASS | `tsc --noEmit` passou com os excludes atuais em `tsconfig.json`. |
| `npm run build` | PASS | Static export passou. |
| `npm run lint` | PASS com warnings | 0 errors, 2874 warnings. Regras historicamente ruidosas estao como `warn`. |
| `npm run verify` | PASS com avisos | 8 OK, 0 falhas, 3 avisos: LOINC ausente, ORDO ausente, PharmGKB ausente. |
| `npm audit --json` | FAIL por vulnerabilidades | 10 vulnerabilidades: 6 moderate, 3 high, 1 critical. |
| Dev server local | PASS parcial | `next dev` inicia sem aviso de middleware/export e sem aviso de Turbopack root. Hub e detalhes de calculadoras retornaram 200 em verificacao anterior. |

## Inventario De Superficie

Contagem aproximada de arquivos versionaveis e nao gerados, excluindo `.git`, `.next`, `node_modules` e `out`:

| Area | Arquivos |
| --- | ---: |
| `lib/` | 837 |
| `app/` | 278 |
| `messages/` | 64 |
| `docs/` | 39 |
| `scripts/` | 25 |
| `incubator/education-sota/packages/medical-education-sota/` | 24 |
| `infrastructure/` | 15 |
| `mobile/` | 9 |
| outros | 198 |

O `git status --porcelain -uall` mostra dezenas de arquivos rastreados modificados, 1 delecao rastreada e muitos arquivos novos nao rastreados. A arvore ainda nao esta pronta para um commit unico sem curadoria.

`npm run audit:repo` gera um inventario JSON reproduzivel por dominio. Resumo atual:

| Dominio | Mudancas |
| --- | ---: |
| `content-expansion` | 65 |
| `education-sota-incubator` | 54 |
| `docs-strategy` | 32 |
| `i18n` | 18 |
| `agent-config` | 17 |
| `clinical-intelligence-calculators` | 17 |
| `ecg-clinical-module` | 14 |
| `scripts` | 16 |
| `tooling-config` | 8 |
| `learning-ui` | 5 |
| `search-recommendations` | 3 |

O plano de staging por cortes esta em `docs/STAGING_MANIFEST_2026-06-03.md`.
Auditoria detalhada das expansoes de conteudo: `docs/CONTENT_EXPANSION_AUDIT_2026-06-03.md`.
Auditoria detalhada do modulo ECG: `docs/ECG_MODULE_AUDIT_2026-06-03.md`.
Auditoria detalhada da incubadora Education/SOTA: `docs/EDUCATION_INCUBATOR_AUDIT_2026-06-03.md`.
Auditoria detalhada de agent-config/Roo: `docs/AGENT_CONFIG_AUDIT_2026-06-03.md`.
Auditoria detalhada de dependencias de seguranca: `docs/SECURITY_DEPENDENCY_AUDIT_2026-06-03.md`.
Auditoria detalhada de docs estrategicas/SOTA: `docs/DOCS_STRATEGY_AUDIT_2026-06-03.md`.

## Classificacao Atual

### Pronto / Integravel Com Baixo Risco

- Ajustes de validacao da esteira:
  - `eslint.config.mjs`
  - `package.json`
  - `package-lock.json`
  - `tsconfig.json`
- Correcoes i18n/localStorage que destravaram `type-check`, `build`, `lint` e `verify`.
- `lib/calculators/types.ts`, `lib/calculators/clinical-intelligence.ts`, `lib/clinical-intelligence/config.ts`.
- Hub e detalhe de calculadoras com badges/disclaimers/backend gating.

### Integravel Como Experimental Clinico

- `prevent-score-2025.ts`: exposto como PREVENT 2026 experimental deterministico, sem backend.
- `sota-metabolic-risk-2025.ts`, `ai-powered-sepsis-score-2025.ts`, `precision-frailty-index-2025.ts`, `pharmacogenomics-precision.ts`: expostos como experimentais, mas bloqueados sem backend clinico configurado.

### Inventario Tecnico / Nao Exposto

- `genomic-multiomic-risk.ts`, `cancer-risk-prediction-2025.ts`, `stroke-temporal-evolution.ts`: `prototype` / `research_only`, fora do hub e de `generateStaticParams`.
- `lib/design-system/*.incomplete`: rascunhos/prototipos ignorados pelo `.gitignore`.
- `.bak`: ignorado pelo `.gitignore`.

### Prototipos Grandes A Isolar Antes De Integrar

- `incubator/education-sota/packages/medical-education-sota/`: pacote/app separado com backend, frontend, Docker e Prisma. Nao deve entrar no app static export sem decisao arquitetural.
- `incubator/education-sota/`: rota `learn/diagnosis`, componentes SOTA, clientes API/WebSocket, store, hooks, tipos, geradores e demos educacionais arquivados fora do App Router e fora dos namespaces principais `app/`/`lib/`.
- `incubator/content-expansion/doencas/expansao-800/` e `incubator/content-expansion/medicamentos/expansao-1000/`: 65 arquivos de expansao massiva. Precisam de validacao de schema, citacoes e decisao de conexao aos indices principais.
- `lib/data/ecg/`, `lib/types/ecg.ts`, `lib/services/ecg-clinical-support.ts`, `app/components/ECG/ClinicalSupport/ECGReferralGuide.tsx`: modulo clinico promissor; Corte 4 inclui inventario, smoke tests e normalizacao textual para `STEMI`, mas ainda precisa decisao de rota/exposicao ampla.

## Achados Criticos

### A1. Middleware Next conflita com static export

Resolvido nesta auditoria: o app usa `output: "export"` em `next.config.ts`, entao o antigo `middleware.ts` foi removido do runtime Next. A intencao de seguranca foi preservada em `lib/hosting/static-security.ts` e documentada em `docs/STATIC_EXPORT_SECURITY.md`.

Tambem foi fixado `turbopack.root` em `next.config.ts` para impedir que o dev server infira incorretamente o workspace root por causa de lockfile fora do repo.

Impacto restante: seguranca/rate-limit/CORS precisam ser aplicados no deploy estatico, CDN, Traefik/Nginx, ou backend/proxy externo. Eles nao existem automaticamente no HTML exportado.

Recomendacao: no deploy real, aplicar `STATIC_SECURITY_HEADERS` e rate limit/CORS no host/proxy.

### A2. `npm audit` aponta vulnerabilidades

Resumo atual:

- 10 vulnerabilidades totais.
- 1 critical: `jspdf`.
- 3 high: `next`, `minimatch`, `picomatch`.
- 6 moderate: `brace-expansion`, `dompurify`, `next-intl`, `postcss`, `styled-components`, `ws`.

Recomendacao: criar corte proprio de seguranca. `jspdf` pede upgrade major para `4.2.1`, entao precisa teste de exportacao PDF depois.

Auditoria dedicada disponivel via `npm run audit:security-deps`.

### A3. Lint passa, mas nao e sinal forte de qualidade

`npm run lint` passa com 0 errors porque varias regras estao como `warn`. Ha 2874 warnings. Isso e aceitavel como estabilizacao inicial, mas nao como gate final de qualidade.

Recomendacao: estabelecer meta incremental por dominio, com `--max-warnings` apenas depois de reduzir ruido historico.

### A4. Frente educacional ainda aparece no produto

Ha rotas, docs e mensagens com linguagem de educacao medica/SOTA. Isso nao e necessariamente errado para areas de estudo, mas conflita com a decisao recente de que a frente de calculadoras deve ser app medico clinico, nao LMS.

Mitigacao aplicada: `app/[locale]/learn/diagnosis/` foi movida para `incubator/education-sota/app-routes/learn-diagnosis/`, fora do App Router. O auditor agora reporta `route physically present in App Router: false` e `static export contamination risk: false`.

Recomendacao: manter `/learn/*` como dominio separado e nao usar `/learn/diagnosis` como eixo da Inteligencia Clinica 2026. Se a rota voltar para `app/`, precisa pagina indisponivel sem backend real e sem token demo.

### A5. Expansoes de conteudo precisam de gate antes de integrar

Inventario inicial feito nesta auditoria com `npm run audit:content-expansions`.

Achados atuais:

- 725 itens totais.
- As expansoes nao sao importadas pelos indices principais.
- 29 IDs duplicados internos.
- 131 overlaps de ID com indices principais.
- 30 doencas com campos obrigatorios ausentes.
- Medicamentos expansao-1000 tem 0% de citacao detectada.

Recomendacao: manter fora do staging principal e promover apenas apos deduplicacao, citacoes e gate bloqueante.

### A6. `.roomodes` atual reduz cobertura operacional

Inventario feito com `npm run audit:agent-config`.

Achados atuais:

- HEAD tinha 11 modos Roo; o arquivo atual tem 2.
- 11 modos foram removidos do `.roomodes`, incluindo `repository-quality-guardian`, `citation-sentinel`, `ontology-integrator`, `polyglot-medical-translator`, `medical-content-architect`, `protocol-flowchart-builder`, `clinical-cases-generator` e `medical-calculators-builder`.
- Ha 13 diretorios `.roo/rules-*`; 11 ficam sem modo correspondente no `.roomodes` atual.
- O modo dominante novo e `medical-education-sota`, desalinhado com a decisao atual de app medico clinico como produto principal.

Status atual: resolvido no Corte 3 por fusao aditiva. O `.roomodes` preserva os 11 modos do HEAD e adiciona `medical-education-sota` e `conversation-master`, sem remover os modos clinicos/de qualidade.

## Achados De Arquitetura

- Static export e o contrato principal. Qualquer backend clinico, auth, rate limit, API ou WebSocket deve viver fora do Next static app.
- Next middleware/proxy foi aposentado para preservar esse contrato; ver `docs/STATIC_EXPORT_SECURITY.md`.
- `tsconfig.json` exclui `incubator`, `lib/supabase`, `lib/sync`, `infrastructure`, testes e mobile. Isso explica a esteira verde e deve ser mantido explicito.
- O repo tem subprodutos potenciais (`mobile/`, `infrastructure/`) e a frente educacional arquivada em `incubator/education-sota/`.
- `SESSION.md` esta corretamente gitignored e deve continuar como scratchpad local.

## Recomendacao De Organizacao Em Cortes

### Corte 1 - Esteira e Static Export

Objetivo: commit pequeno para manter `type-check`, `build`, `lint`, `verify` verdes.

Incluir:
- ESLint flat config e scripts.
- `tsconfig` excludes explicitos.
- correcoes i18n/localStorage.
- remocao de `middleware.ts` do runtime Next.
- `lib/hosting/static-security.ts` e `docs/STATIC_EXPORT_SECURITY.md`.
- `turbopack.root` em `next.config.ts`.

Excluir:
- prototipos novos, docs SOTA extensas e expansions massivas.

Manifesto detalhado: `docs/STAGING_MANIFEST_2026-06-03.md`.

### Corte 2 - Inteligencia Clinica 2026 / Calculadoras

Objetivo: publicar a camada clinica segura para calculadoras.

Incluir:
- tipos/metadados clinicos.
- `clinical-intelligence`.
- UI de badges/disclaimers/backend gating.
- calculadoras experimentais/prototipos conforme classificacao.

Gate:
- `type-check`, `build`, `lint`, `verify`.
- revisar UI no browser com backend ausente.

### Corte 3 - Agent Config / Roo

Objetivo: preservar modos clinicos/de qualidade e adicionar modos novos sem substituir o workflow principal.

Gate:
- `npm run audit:agent-config -- --format=summary`
- `npm run plan:corte3 -- --format=summary`

### Corte 4 - ECG Clinico

Objetivo: promover modulo ECG como ferramenta clinica.

Requisitos:
- compilar dentro do app raiz sem excludes especiais.
- testes unitarios para `suggestReferral`, `classifyUrgency`, `identifyRedFlags`.
- disclaimers clinicos e fluxo de emergencia.
- decisao de rota/entrada UI.
- auditoria atual: `npm run audit:ecg` passa e cobre inventario + smoke tests.

### Corte 5 - Educacao / SOTA Learning

Objetivo: decidir se vira produto separado, pacote separado, ou fica incubado.

Requisitos:
- nome sem colidir com Inteligencia Clinica.
- backend separado documentado.
- removido do eixo principal do app medico.

### Corte 6 - Expansoes De Conteudo

Objetivo: manter expansoes de doencas/medicamentos fora dos indices principais ate resolver duplicatas, overlaps, campos ausentes e citacoes.

Gate:
- `npm run audit:content-expansions -- --format=summary`
- `npm run plan:corte6 -- --format=summary`

### Corte 7 - Segurança

Objetivo: resolver `npm audit`.

Requisitos:
- atualizar `jspdf` major com teste de exportacao.
- atualizar `next`/`next-intl`/dependencias.
- confirmar build static e rotas i18n.

### Corte 8 - Docs Strategy

Objetivo: manter docs SOTA/estrategia historicas fora da documentacao primaria do produto clinico ate reescrita cautelosa.

Gate:
- `npm run audit:docs-strategy -- --format=summary`
- `npm run plan:corte8 -- --format=summary`

## Proximas Acoes Concretas

1. Revisar o indice staged por cortes e decidir se faz commit unico organizado ou commits separados.
2. Aplicar `STATIC_SECURITY_HEADERS` no hosting/proxy real e verificar headers em producao.
3. Reduzir docs antigas `SOTA*` ou renomea-las como historico/prototipo para nao contradizer o framing medico.
4. Criar gate bloqueante de promocao para `expansao-800` e `expansao-1000`.
5. Decidir rota/exposicao do modulo ECG.
6. Planejar upgrade de seguranca com foco em `jspdf` e `next`.
