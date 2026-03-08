# Darwin PS Final Handoff

## Product

### What shipped

- the PS now behaves as an active case runner, not only a protocol catalog
- sentinel workflows (`PCR`, `sepse/choque`, `IOT/RSI`) keep persistent session state
- handoff, debrief, drug sheet, stop points and team coordination are integrated into the same workflow

### What matters most

- safety semantics are explicit:
  - `consulted`
  - `reviewed/computed`
  - `confirmed`
  - `completed`
- handoff import/export is now part of the workflow model
- interruption recovery is materially stronger than the earlier hub model

## Design

### Current design posture

- dark acute-care UI with clear hierarchy and contextual overlays
- handoff, debrief and role assignment are now visually consistent with the runner
- import flow has preview and explicit overwrite confirmation

### Remaining design work

- reduce density in the structured handoff field list
- unify spacing and microcopy across all PS overlays
- final mobile polish pass on import/debrief/role assignment surfaces

## Clinical reviewers

### What to review first

1. stop points and pending actions in the three sentinel workflows
2. drug sheet assumptions and review/confirm semantics
3. debrief summary fidelity vs actual case timeline
4. handoff clinical summary and structured export semantics
5. role board usefulness in real PCR coordination

### Main questions

- does the runner reduce omission risk under interruption?
- does the handoff structure match real transition needs?
- are any actions implying documentation when they should imply consultation only?

## Engineering

### Key modules

- runner orchestration:
  - [`ProtocolFlowClient.tsx`](/home/demetrios/darwin-MFC/app/[locale]/ps/protocolos/[slug]/ProtocolFlowClient.tsx)
- runtime model:
  - [`useProtocolRuntimeModel.ts`](/home/demetrios/darwin-MFC/lib/ps/useProtocolRuntimeModel.ts)
- presentation state:
  - [`useProtocolPresentationState.ts`](/home/demetrios/darwin-MFC/lib/ps/useProtocolPresentationState.ts)
- handoff import:
  - [`useHandoffImportController.ts`](/home/demetrios/darwin-MFC/lib/ps/useHandoffImportController.ts)
  - [`handoffImportValidation.ts`](/home/demetrios/darwin-MFC/lib/ps/handoffImportValidation.ts)
- handoff export:
  - [`useHandoffExportController.ts`](/home/demetrios/darwin-MFC/lib/ps/useHandoffExportController.ts)

### Test status

- `type-check`: green
- `ps-runner-smoke`: green
- `ps-drug-sheet`: green

### Suggested next engineering steps

1. externalize structured handoff schema contracts further
2. add a final visual regression layer for core PS surfaces
3. tighten controller/shared type boundaries before broader rollout
