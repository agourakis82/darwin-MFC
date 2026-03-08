# Apple Native Migration Map

## Principle

Migrar por `clinical capability`, não por página.

## Current web to native mapping

### Cockpit

Web:
- [`PSDashboard.tsx`](/home/demetrios/darwin-MFC/app/components/PS/PSDashboard.tsx)
- [`PSActiveCaseCard.tsx`](/home/demetrios/darwin-MFC/app/components/PS/PSActiveCaseCard.tsx)
- [`PSHeader.tsx`](/home/demetrios/darwin-MFC/app/components/PS/PSHeader.tsx)

Native target:
- `CockpitView`
- `ActiveCaseCard`
- `PatientContextBar`

### Protocol runner

Web:
- [`ProtocolFlowClient.tsx`](/home/demetrios/darwin-MFC/app/[locale]/ps/protocolos/[slug]/ProtocolFlowClient.tsx)
- [`PSProtocolHero.tsx`](/home/demetrios/darwin-MFC/app/components/PS/PSProtocolHero.tsx)
- [`PSActiveStepDetail.tsx`](/home/demetrios/darwin-MFC/app/components/PS/PSActiveStepDetail.tsx)
- [`PSProtocolStepCard.tsx`](/home/demetrios/darwin-MFC/app/components/PS/PSProtocolStepCard.tsx)
- [`PSProtocolSafetySidebar.tsx`](/home/demetrios/darwin-MFC/app/components/PS/PSProtocolSafetySidebar.tsx)

Native target:
- `ProtocolRunnerView`
- `ProtocolHeroView`
- `ActiveStepView`
- `StepListItem`
- `SafetyInspectorView`

### Drug sheet

Web:
- [`PSDrugSheet.tsx`](/home/demetrios/darwin-MFC/app/components/PS/PSDrugSheet.tsx)

Native target:
- `DrugSheetView`
- `DrugCalculationSection`
- `DrugPreparationSection`
- `DrugSafetySection`

### Handoff

Web:
- [`PSHandoffPanel.tsx`](/home/demetrios/darwin-MFC/app/components/PS/PSHandoffPanel.tsx)
- [`useHandoffImportController.ts`](/home/demetrios/darwin-MFC/lib/ps/useHandoffImportController.ts)
- [`useHandoffExportController.ts`](/home/demetrios/darwin-MFC/lib/ps/useHandoffExportController.ts)
- [`handoffImportValidation.ts`](/home/demetrios/darwin-MFC/lib/ps/handoffImportValidation.ts)

Native target:
- `HandoffView`
- `HandoffImportViewModel`
- `HandoffExportViewModel`

### Debrief

Web:
- [`PSDebriefPanel.tsx`](/home/demetrios/darwin-MFC/app/components/PS/PSDebriefPanel.tsx)

Native target:
- `DebriefView`

### Role board

Web:
- [`PSPCRRoleBoard.tsx`](/home/demetrios/darwin-MFC/app/components/PS/PSPCRRoleBoard.tsx)
- [`PSRoleAssignmentSheet.tsx`](/home/demetrios/darwin-MFC/app/components/PS/PSRoleAssignmentSheet.tsx)

Native target:
- `RoleBoardView`
- `RoleAssignmentSheet`

## Logic to preserve exactly

- event semantics
- workflow sentinels
- handoff schema meanings
- import validation rules
- review vs confirm vs complete distinction

## Logic to rewrite natively

- navigation
- overlay management
- presentation state
- responsive layout
- motion

## Migration order

1. contracts and models
2. case session store
3. protocol runner
4. drug sheet
5. handoff
6. debrief
7. role board
8. cockpit

## Recommended implementation path

### Step 1

Freeze these concepts as native models:

- patient context
- active case session
- case event
- handoff payload

### Step 2

Build a native runner for the three sentinel workflows only.

### Step 3

Port handoff import/export and debrief once the runner is stable.

## Definition of success

The native app should not be a mirror of the web app.
It should be a better execution surface built on the same clinical semantics.
