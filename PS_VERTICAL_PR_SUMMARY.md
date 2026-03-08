# PR Summary: Darwin PS Acute Workflow Upgrade

## Title

`feat(ps): turn emergency workflows into active case runner with safety timeline, handoff, debrief, and import/export`

## Why

Esta PR move a vertical de pronto-socorro de um hub de consulta para um runner operacional de caso agudo, com foco em:
- erro de dose/peso
- omissão de passo crítico
- retomada após interrupção
- handoff estruturado
- coordenação da equipe em PCR

## What changed

### Runner and case state

- added persistent `activeCaseSession`
- synced current protocol step and pending actions
- introduced safety/event timeline
- integrated stop points and situational awareness

### Medication safety

- contextual `PSDrugSheet`
- explicit review/confirm actions
- infusion/dilution assumptions shown inline
- weight-source aware workflow

### Team coordination

- persistent PCR role board
- named role assignment with recent members

### Handoff and debrief

- clinical handoff
- structured handoff export
- clinical note export
- debrief derived from real case events
- handoff import with validation, preview, confirmation, and draft persistence

### Architecture

- shared contracts and event helpers
- runtime model extracted from runner
- dedicated handoff import/export controllers

### Testing

- PS smoke expanded to cover handoff import
- dedicated drug sheet e2e retained

## Review focus

- `ProtocolFlowClient` orchestration boundaries
- handoff import/export controllers
- UI density and scanability in `PSHandoffPanel`
- session/timeline semantics vs real clinical intent

## Suggested reviewer checklist

- confirm `handoff import` rejects incompatible workflow
- confirm `role assignment` persists correctly in active case
- confirm `debrief` reflects case timeline
- confirm `drug sheet` remains contextual and safe
- confirm smoke tests cover the critical happy paths
