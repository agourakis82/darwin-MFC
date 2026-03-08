# Darwin PS Native Apple Plan

## Goal

Criar uma versão `Apple native` real do Darwin PS para `iPadOS` e `iPhone`, com prioridade em `iPad-first`, usando `SwiftUI` e preservando o core clínico já consolidado no web.

## Product direction

- `iPadOS` como superfície principal do runner operacional
- `iPhone` como companion rápido de consulta, execução e handoff
- `macOS` só depois, se houver motivo real

## Why native

- melhor ergonomia de touch e layout
- navegação, sheets e timers mais robustos
- integração real com ecossistema Apple
- melhor caminho para distribuição via TestFlight/App Store

## What stays shared conceptually

- protocolos sentinela
- case session semantics
- safety event model
- handoff schemas
- import/export rules
- distinction:
  - `consulted`
  - `reviewed`
  - `confirmed`
  - `completed`

## What becomes native-first

- cockpit
- protocol runner
- drug sheet
- handoff
- debrief
- PCR role board
- timers

## Technical recommendation

- app nova em `packages/mobile` ou novo target Apple dedicado
- `SwiftUI`
- `Observation`
- `NavigationSplitView` no iPad
- `sheet`, `inspector`, `toolbar`, `searchable`
- persistência local-first

## Delivery phases

### Phase 1

- frozen contracts
- native app shell
- case session model
- protocol runner v1
- drug sheet v1
- handoff export/import v1

### Phase 2

- debrief
- role board
- timers
- recent team members
- offline persistence hardening

### Phase 3

- deeper iPad polish
- iPhone refinement
- sharing/export integrations
- optional Live Activities / widgets

## Platform scope

### v1

- iPadOS
- iPhone

### later

- macOS
- watchOS only if timers/alerts justify it

## Build strategy

- local data first
- content bundled with app for critical workflows
- external sync/import later

## Main risk

O risco não é técnico.
É tentar portar tudo do web de uma vez.

## Recommended next move

Congelar os contratos clínicos e começar pelo runner nativo dos três workflows sentinela:

1. `PCR`
2. `Sepse/choque`
3. `IOT/RSI`
