# Corte 3 Agent Config Pathspec - 2026-06-03

## Objetivo

Preparar o terceiro corte de staging para configuracao Roo/agent. Este corte preserva os modos clinicos e de qualidade do HEAD, adiciona os dois modos novos como complementares, e stageia apenas regras XML validas para esses novos modos.

Comando reprodutivel:

```bash
npx tsx scripts/plan-corte3-agent-config.ts --format=summary
```

Resultado esperado apos a correcao:

```text
agent changes: 21
candidate paths: 20
uncovered agent changes: 0
index already staged: 90
safe to stage as Corte 3: true
```

## Pathspec Atual

```text
.roomodes
.roo/rules-conversation-master/1_workflow.xml
.roo/rules-conversation-master/2_best_practices.xml
.roo/rules-conversation-master/3_common_patterns.xml
.roo/rules-conversation-master/4_tool_usage.xml
.roo/rules-conversation-master/5_examples.xml
.roo/rules-conversation-master/6_error_handling.xml
.roo/rules-conversation-master/7_communication.xml
.roo/rules-medical-education-sota/1_workflow.xml
.roo/rules-medical-education-sota/2_best_practices.xml
.roo/rules-medical-education-sota/3_common_patterns.xml
.roo/rules-medical-education-sota/4_tool_usage.xml
.roo/rules-medical-education-sota/5_examples.xml
.roo/rules-medical-education-sota/6_technical_documentation.xml
.roo/rules-medical-education-sota/7_communication.xml
.roo/rules-medical-education-sota/8_implementation_plan.xml
docs/AGENT_CONFIG_AUDIT_2026-06-03.md
docs/CORTE3_AGENT_CONFIG_PATHSPEC_2026-06-03.md
scripts/audit-agent-config.ts
scripts/plan-corte3-agent-config.ts
```

## Exclusoes Confirmadas

Continuam fora do Corte 3:

- app Education/SOTA (`/learn/diagnosis`, `app/components/SOTA`, `lib/api/sota-*`, `lib/store/sotaStore.ts`)
- pacote arquivado `incubator/education-sota/packages/medical-education-sota/`
- ECG clinico
- expansoes massivas de doencas/medicamentos
- docs SOTA antigas e docs estrategicas nao operacionais
- demos HTML/JSON/imagens

## Gates Antes De Commit

```bash
npm run audit:agent-config -- --format=summary
xmllint --noout .roo/rules-conversation-master/*.xml .roo/rules-medical-education-sota/*.xml
npx tsx scripts/plan-corte3-agent-config.ts --format=summary
git diff --cached --check
```

## Estado Validado

- HEAD modes: 11
- current modes: 13
- removed modes: 0
- added modes: 2
- expected clinical modes missing: 0
- rule dirs without current mode: 0
- current modes without rule dir: 0
- XML novo: valido via `xmllint`
- total staged apos Corte 3: 90 arquivos
