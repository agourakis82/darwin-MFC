# Darwin PS SwiftUI Architecture

## App structure

### Modules

1. `DarwinPSApp`
2. `Core`
3. `Protocols`
4. `CaseSession`
5. `Handoff`
6. `Features`
7. `DesignSystem`

## Suggested folder layout

```text
DarwinPSNative/
  App/
  Core/
    Models/
    Contracts/
    Persistence/
    Utilities/
  Features/
    Cockpit/
    ProtocolRunner/
    DrugSheet/
    Handoff/
    Debrief/
    RoleBoard/
  DesignSystem/
  Resources/
```

## Core models

### PatientContext

- verified weight
- estimated weight
- weight source
- timestamp
- sex
- height
- ideal weight

### ActiveCaseSession

- id
- workflow
- protocolId
- startedAt
- updatedAt
- illnessSeverity
- activeStepId
- pendingActionLabels
- roleAssignments
- events

### CaseEvent

- kind
- state
- label
- timestamp
- metadata

## State model

### Global app state

- current active case
- recent team members
- app mode if needed later

### Feature state

- selected drug
- handoff import draft
- debrief visibility
- role assignment editor

## View model approach

- one feature view model per major surface
- thin views
- domain logic outside view bodies

Suggested:

- `CockpitViewModel`
- `ProtocolRunnerViewModel`
- `DrugSheetViewModel`
- `HandoffViewModel`
- `DebriefViewModel`

## Navigation

### iPad

- `NavigationSplitView`
  - sidebar: protocol flow
  - content: active step
  - detail/inspector: safety, timeline, handoff, tools

### iPhone

- stack navigation
- bottom sheets
- sticky action bar

## Presentation patterns

- `sheet` for drug sheet and role assignment
- `fullScreenCover` only if truly necessary
- `inspector` on iPad for side utilities
- `confirmationDialog` for destructive/replace actions

## Persistence

### Start simple

- local JSON persistence for case session
- app storage for lightweight preferences

### Then

- `SwiftData` if the object graph becomes richer

## Protocol content strategy

- ship bundled JSON for critical workflows
- decode into native models
- do not depend on web UI models directly

## Handoff architecture

- native payload builder
- native import validator
- schema versioning explicit
- export as JSON + text representations

## Design system guidance

- SF Pro
- SF Mono for calculations/timers
- large touch targets
- high-clarity surfaces
- minimal chrome

## iPad-first layout target

### Runner

- left: protocol map
- center: active step
- right: timeline / stop point / role board / handoff

## Native integrations worth considering later

- share sheet for handoff
- files import/export
- local notifications for timers
- Live Activities if timer usage proves strong

## What to avoid

- giant `ObservableObject` with everything
- business logic inside SwiftUI views
- overusing modal stacks
- fake Apple look with poor state architecture
