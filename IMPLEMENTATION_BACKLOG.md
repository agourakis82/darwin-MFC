# Darwin PS Implementation Backlog

Status: Draft v1  
Companion docs:
- `SPEC.md`
- `UI_ARCHITECTURE.md`
- `DESIGN_TOKENS_COMPONENT_INVENTORY.md`

## 1. Goal

Translate the Darwin PS product and design stack into an implementation backlog that can be executed in short engineering phases.

## 2. Delivery Strategy

Recommended strategy:
- deliver a narrow Tier 1 foundation first
- validate sentinel workflows before broadening feature coverage
- treat design-system consistency and workflow support as part of core delivery, not polish

## 3. Epics

### Epic 1: PS foundation state

Objective:
- add case-centered state to the PS vertical

Tasks:
- extend `psStore` with weight-source-aware patient context
- add single active case session
- add session lifecycle actions
- add event logging states: consulted/computed/completed/confirmed

Primary files:
- `lib/store/psStore.ts`

### Epic 2: Cockpit-first PS home

Objective:
- shift PS home from navigation hub to active-case-first cockpit

Tasks:
- add active case card
- prioritize sentinel workflow launches
- expose pending actions
- preserve existing quick access patterns where useful

Primary files:
- `app/components/PS/PSDashboard.tsx`
- `app/components/PS/PSActiveCaseCard.tsx`

### Epic 3: Patient context and header

Objective:
- make patient context visible and clinically meaningful across PS

Tasks:
- add weight source semantics
- show active case state in header
- preserve low-friction weight entry

Primary files:
- `app/components/PS/PSHeader.tsx`

### Epic 4: Protocol runner v2

Objective:
- convert protocol interaction into resumable workflow execution

Tasks:
- persist active step
- add pending actions support
- add stop-point rendering
- add event logging integration
- add situational awareness panel

Primary files:
- `app/[locale]/ps/protocolos/[slug]/ProtocolFlowClient.tsx`
- `app/components/PS/PSSituationalAwarenessPanel.tsx`
- `app/components/PS/PSStopPointCard.tsx`

### Epic 5: Inline support layers

Objective:
- reduce route changes during active workflow

Tasks:
- build drug sheet
- build score sheet
- build calculator sheet
- build timer overlay

Primary files:
- `app/components/PS/PSDrugSheet.tsx`
- `app/components/PS/PSScoreSheet.tsx`
- `app/components/PS/PSCalculatorSheet.tsx`
- `app/components/PS/PSTimerOverlay.tsx`

### Epic 6: Summary surfaces

Objective:
- support handoff and reflection

Tasks:
- build handoff panel
- build debrief panel
- map session state to summary artifacts

Primary files:
- `app/components/PS/PSHandoffPanel.tsx`
- `app/components/PS/PSDebriefPanel.tsx`

### Epic 7: UI hardening

Objective:
- enforce Apple-grade minimum and accessibility

Tasks:
- normalize PS tokens
- normalize state visuals
- enforce touch targets
- unify motion rules
- audit contrast

Primary files:
- PS component files
- shared design-system/token files as needed

## 4. Tier 1 MVP Slice

Tier 1 should include:
- state foundation
- active case card
- patient context improvements
- start/resume sentinel workflow behavior
- initial drug sheet
- initial awareness panel

## 5. Task Breakdown by Priority

### P0

- extend `psStore`
- add active case card
- update header
- update dashboard

### P1

- implement situational awareness panel
- persist protocol step
- implement stop-point component
- implement first drug sheet

### P2

- implement handoff panel
- implement debrief panel
- implement score and calculator sheets

### P3

- role-oriented PCR board
- shared display mode
- command search improvements

## 6. Risks

- overextending Tier 1
- breaking current PS flows while adding state
- letting visual polish outpace workflow improvement

## 7. Definition of Ready

A task is ready when:
- workflow purpose is clear
- file targets are known
- state changes are known
- acceptance criteria are explicit

## 8. Definition of Done

A task is done when:
- the component or state change matches the spec
- semantic states are explicit
- mobile and desktop behavior are both defined
- critical UX does not rely on route changes unless intended
