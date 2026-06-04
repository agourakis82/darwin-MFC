# Agent Config / Roo Audit - 2026-06-03

## Escopo

Auditoria do dominio `agent-config`, cobrindo `.roomodes`, `.roo/*` e `AGENTS.md`. O objetivo e evitar que mudancas de configuracao de agentes sejam stageadas junto com app clinico, tooling ou conteudo sem uma decisao explicita.

Comando reprodutivel:

```bash
npm run audit:agent-config -- --format=summary
```

## Resultado Atual

```text
changed files: 17
HEAD modes: 11
current modes: 13
removed modes: 0
added modes: 2
expected clinical modes missing: 0
rule directories: 13
rule dirs without current mode: 0
current modes without rule dir: 0
current promotional claim hits: 14
HEAD .roomodes lines: 305
current .roomodes lines: 347
stage current .roomodes: true
removed mode slugs: none
```

## Conclusao

O `.roomodes` foi corrigido por fusao aditiva: os 11 modos do HEAD foram preservados e os 2 modos novos foram adicionados sem substituir os modos clinicos/de qualidade. A configuracao atual pode ser stageada como Corte 3 junto com os diretorios `.roo/rules-conversation-master/` e `.roo/rules-medical-education-sota/`.

## Decisoes

### P0 resolvido - modos clinicos preservados

O estado ruim inicial reduzia `.roomodes` de 11 modos para 2 e removia modos essenciais:

- `repository-quality-guardian`
- `medical-content-architect`
- `polyglot-medical-translator`
- `citation-sentinel`
- `critical-analysis-generator`
- `ontology-integrator`
- `protocol-flowchart-builder`
- `clinical-cases-generator`
- `medical-calculators-builder`

Estado atual: 0 modos removidos e 0 modos clinicos esperados ausentes.

### P1 resolvido - rules conectadas

Ha 13 diretorios `.roo/rules-*` e 13 modos atuais. A auditoria confirma:

- `rule dirs without current mode: 0`
- `current modes without rule dir: 0`

Os dois novos diretorios de regras foram reduzidos para XML curto e valido.

### P1 controlado - Education/SOTA isolado

O modo `medical-education-sota` foi mantido como incubadora educacional separada, nao como substituto do workflow clinico. A linguagem foi rebaixada para escopo cauteloso:

- prototipos educacionais ficam isolados
- claims fortes viram propostas em validacao
- backend educacional nao contamina o static export clinico
- `/learn/diagnosis` nao vira eixo das calculadoras clinicas

### P2 residual - claims historicos no HEAD

O auditor ainda encontra 14 hits promocionais, mas a maior parte vem de modos ja existentes no HEAD (`SOTA++`, `Nature/Cell`, `Q1`). Este corte nao reescreve a semantica historica desses modos para evitar churn amplo; apenas impede a regressao operacional e isola os novos modos.

## Gates

```bash
npm run audit:agent-config -- --format=summary
xmllint --noout .roo/rules-conversation-master/*.xml .roo/rules-medical-education-sota/*.xml
git diff --check -- .roomodes .roo/rules-conversation-master .roo/rules-medical-education-sota scripts/audit-agent-config.ts docs/AGENT_CONFIG_AUDIT_2026-06-03.md
```

## Artefatos

- Script: `scripts/audit-agent-config.ts`
- Comando: `npm run audit:agent-config`
- Corte recomendado: `Agent config / Roo workflow`
