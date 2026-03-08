# Darwin PS Safety Implementation Backlog

Status: Draft v1  
Companion docs:
- `SAFETY_SPEC_ADDENDUM.md`
- `IMPLEMENTATION_BACKLOG.md`

## 1. Goal

Deliver the first safety-centered slice of Darwin PS around:
- drug sheet safety
- weight source rigor
- omission prevention

## 2. Workstreams

### Workstream A: Medication safety surfaces

Tasks:
- build `PSDrugSheet`
- show weight source, timestamp, and basis of calculation
- show dilution and infusion assumptions
- add `reviewed` and `confirm use` actions
- add estimated-weight banner and dose badges

Target files:
- `app/components/PS/PSDrugSheet.tsx`
- `app/[locale]/ps/protocolos/[slug]/ProtocolFlowClient.tsx`

### Workstream B: Weight semantics

Tasks:
- enforce `verified/estimated/ideal/unknown`
- display source in header and dose surfaces
- propagate timestamps

Target files:
- `lib/store/psStore.ts`
- `app/components/PS/PSHeader.tsx`
- PS safety surfaces

### Workstream C: Omission prevention

Tasks:
- persist current step in active case
- derive pending actions from current step
- log checklist-driven completion and step completion
- expose awareness panel

Target files:
- `app/[locale]/ps/protocolos/[slug]/ProtocolFlowClient.tsx`
- `app/components/PS/PSSituationalAwarenessPanel.tsx`
- `lib/store/psStore.ts`

### Workstream D: Stop points

Tasks:
- define stop-point component
- map sentinel workflow checkpoints
- decide per-checkpoint exit behavior

Target files:
- `app/components/PS/PSStopPointCard.tsx`
- runner and protocol content files

## 3. Priority

### P0

- drug sheet
- weight source display
- reviewed/confirm actions
- awareness panel
- active-step persistence

### P1

- stop-point component
- stop-point mapping for sentinel workflows
- timeline refinement

### P2

- double-check flows
- stronger high-alert gating
- calculation traps and mismatch warnings

## 4. Acceptance Criteria

- weight-dependent doses show source, timestamp, and basis
- estimated-weight doses show banner and badge
- high-alert medication sheets expose reviewed and confirm actions
- runner timeline can distinguish consulted, reviewed, confirmed, and completed
- current step survives navigation within the active case

