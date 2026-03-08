# Darwin PS SOTA++ SPEC

Status: Draft v4  
Date: 2026-03-06  
Owner: Product / Design / Engineering / Clinical Governance  
Scope: `app/[locale]/ps/*`, `app/components/PS/*`, `lib/store/psStore.ts`, supporting `lib/ps/*`

## 1. Executive Summary

The Darwin PS module should evolve from a fast emergency navigation hub into a case-centered acute care operating system.

The current module already offers strong point-of-care access to:
- protocols
- emergency drugs
- scores
- calculators
- timers

Its main limitation is structural: the experience is still route-centric and catalog-centric, while real emergency care is case-centric, interruption-heavy, medication-sensitive, and coordination-dependent.

This spec defines a publishable MVP and a broader product direction for Darwin PS as a workflow-first bedside system that supports:
- fast protocol launch
- persistent patient context
- inline medication and calculator actions
- resumable protocol execution
- structured situational awareness
- handoff-ready case summaries
- explicit critical stop points
- optional team-role orchestration
- post-event debrief support

## 2. Product Thesis

Darwin PS should not compete primarily as a protocol library.

It should compete as an acute care workflow layer optimized for:
- speed under interruption
- safety in weight-based and infusion-based medication use
- low cognitive switching cost
- explicit next-action support
- resumable case execution

In product terms:
- not an EHR
- not a documentation platform
- not an autonomous CDS engine
- a bedside acute care operating interface

## 3. Problem Statement

Current PS UX is effective for lookup, but not yet optimized for live case execution.

Observed product gaps:
- too much context switching between protocols, drugs, scores, and calculators
- patient context is too thin for safe medication and score guidance
- protocols behave more like interactive documents than operational runners
- there is no formal case session model
- there is no structured handoff artifact
- the dashboard prioritizes discovery over active-case continuation
- consulted information is not clearly distinguished from completed or administered actions

Clinical consequence:
- more taps and more cognitive transitions during high-pressure care
- increased risk of omission under interruption
- weaker support for medication safety
- weaker support for coordination, reassessment, and handoff

## 4. Publishable MVP Scope

Version 1 must not attempt to optimize all emergency workflows at once.

The publishable MVP is intentionally restricted to three sentinel workflows:
- `PCR / ACLS`
- `Sepse / Choque`
- `IOT / RSI`

These were selected because together they stress the core product claims:
- interruption-heavy execution
- medication urgency
- timers
- branching logic
- checklists
- handoff relevance
- weight-based decision support

Out of scope for v1 as first-class mission-control experiences:
- trauma
- AVC
- IAM
- pediatric triage flows outside weight-based medication aids
- broad waiting-room or intake workflows

These can remain accessible in the legacy catalog/navigation model until validated patterns exist.

## 5. Goals

Primary goals:
- reduce time from opening PS to first useful action
- reduce time to weight-based dose and infusion setup
- reduce route changes per critical task
- make protocol state resumable after interruption
- generate a clinically usable handoff summary
- reduce omission risk in sentinel workflows

Secondary goals:
- improve mobile ergonomics in emergency use
- improve clarity of alert hierarchy
- create a foundation for future shared displays and richer CDS

Non-goals:
- replace institutional triage systems
- replace medical judgment
- become a full clinical documentation platform
- make medication administration claims
- integrate with EHRs in v1
- support multiple simultaneous active cases in v1

## 6. Users and Core Jobs

Primary users:
- ED physician
- emergency resident
- internal medicine or family medicine physician covering urgent care

Secondary users:
- supervising physician
- future nursing-oriented workflows

Core jobs:
- open the right critical protocol in seconds
- calculate a correct dose from current patient context
- retrieve the next action without rereading the whole flow
- execute a protocol while being interrupted
- resume the case without reconstructing context from memory
- summarize what has been reviewed, completed, and still remains pending

## 7. Product Principles

- Workflow over catalog
- Context over memory
- Action over navigation
- Safety over feature density
- Resume over restart
- Mobile-first, desktop-complete
- Interruptive alerts must be rare
- High-alert medication behavior must be explicit
- Case support is not documentation
- Passive by default, interruptive by exception
- Apple-grade minimum visual and interaction quality

## 8. Current State Snapshot

Current PS surface:
- dashboard: `app/components/PS/PSDashboard.tsx`
- header: `app/components/PS/PSHeader.tsx`
- sidebar/nav: `app/components/PS/PSSidebar.tsx`
- layout: `app/[locale]/ps/layout.tsx`
- protocol runner: `app/[locale]/ps/protocolos/[slug]/ProtocolFlowClient.tsx`
- store: `lib/store/psStore.ts`

Current strengths:
- fast visual access to critical scenarios
- persistent weight in header
- integrated search across drugs, protocols, and scores
- lightweight protocol rendering
- emergency-specific drug and score datasets

Current structural limitations:
- no patient context beyond basic weight/sex/height/ideal weight
- no case session persistence
- no handoff object
- protocol flow lacks longitudinal event capture
- no distinction between reviewed versus completed versus administered actions
- supporting tools often require leaving active workflow

## 9. Target Experience

Darwin PS should behave like a case cockpit.

Target experience:
1. Clinician enters or resumes patient context.
2. Clinician launches or resumes one active case.
3. Protocol runner becomes the main workspace.
4. Drug, score, timer, and calculator support appear inline as contextual sheets.
5. Session state persists automatically.
6. Handoff summary is always derivable.

The design center is not discovery. It is operational continuity.

## 10. Key UX Surfaces

### 10.1 PS Home becomes a cockpit

Replace the current home emphasis on static scenario discovery with a priority stack:
- active patient context
- continue current case
- active timers
- immediate actions
- sentinel workflow launchers
- quick dose/infusion tools
- favorites and recent items

Rules:
- if an active case exists, continuation is the first visible surface
- if no active case exists, sentinel workflow quick-start is first
- non-sentinel workflows stay accessible but visually de-emphasized in v1

### 10.2 Patient Context Bar

Persistent top-level context available across all PS routes:
- verified weight
- estimated weight
- weight source
- weight timestamp
- height
- sex
- ideal weight toggle
- age or age band
- allergies
- pregnancy
- renal impairment flag
- hepatic impairment flag
- airway risk flag

Rules:
- context must be editable in place
- dose calculations must clearly state which weight source is being used
- estimated-weight use must be visually explicit
- context must influence downstream drug and score displays
- context must persist locally
- context must remain compact on mobile

### 10.3 Protocol Runner v2

The protocol runner becomes an operational interface rather than a document viewer.

Required capabilities:
- active step focus
- visible progress through macro-stages
- branching persistence
- checklist completion state
- event logging
- timer integration
- inline drug and score support
- rapid resume after interruption
- explicit pending next actions
- explicit pause-and-verify checkpoints at critical junctures

Desktop structure:
- left: step map / progress
- center: active step and decisions
- right: contextual sheets and session timeline

Mobile structure:
- active step full focus
- sticky bottom action bar
- contextual sheets from bottom drawer

### 10.4 Inline Action Layers

Critical supporting functions should open in contextual sheets or overlays:
- drug sheet
- score sheet
- calculator sheet
- timer overlay
- quick note panel

Rules:
- user does not lose place in protocol
- computed values return directly to session context
- all action layers must clearly distinguish consult, compute, complete, and confirm states

### 10.5 Handoff Mode

Any active or completed case must support one-tap structured summary generation.

The default v1 handoff structure should be I-PASS-derived:
- illness severity
- patient summary
- action list
- contingency plan
- synthesis / confirmation prompt

The UI may abbreviate labels, but the structure must remain stable.

### 10.6 Debrief Mode

Any closed or stabilized sentinel case should support a lightweight post-event debrief view.

The debrief mode is not a legal record and not a full clinical note.

Its purpose is to support:
- rapid reflection
- error or delay detection
- team learning
- workflow iteration

Minimum contents:
- workflow used
- major timestamps
- confirmed actions
- pending or missed critical actions
- free-text reflection

## 11. Apple-Grade UI Minimum

This section is normative for the PS vertical.

The goal is not to imitate Apple branding. The goal is to adopt a minimum interaction and visual quality bar compatible with high-trust clinical use.

### 11.1 Typography

- primary UI typography should follow an `SF Pro`-like system sans hierarchy
- monospaced typography should be reserved for:
  - dose values
  - infusion rates
  - weight values
  - timers
  - concentrations
- critical clinical text must remain comfortably legible on mobile
- long explanatory text must never dominate the active-step surface

### 11.2 Touch targets

- all critical interactive controls must meet a minimum `44x44` target
- checklist rows, confirm buttons, next-step buttons, and timer controls must be finger-safe

### 11.3 Contrast and semantics

- text and critical UI states must meet at least WCAG AA contrast targets
- state must never be conveyed by color alone
- critical, warning, info, completed, pending, and confirmed states must use a stable combination of:
  - color
  - icon
  - label
  - placement

### 11.4 Motion

- motion must communicate state, hierarchy, or continuity
- decorative motion is prohibited on critical task surfaces
- the PS experience must support reduced-motion operation
- transitions should prefer subtle reveal, fade, and highlight patterns over large spatial theatrics

### 11.5 Contextual actions

- contextual sheets are the preferred interaction for drug, score, calculator, and timer support
- modal stacking should be avoided
- the user should not lose active protocol context when invoking a supporting tool

### 11.6 Alerts and interruptions

- the default interaction model is passive or inline guidance
- interruptive alerts require strong safety justification
- stop points must not feel like punitive popups
- critical interruption design must be brief, actionable, and dismissible only with intent

### 11.7 Consistency

- the PS vertical should use one coherent visual language
- card, chip, banner, sheet, and button behavior must be standardized across PS screens
- the same semantic state must never look meaningfully different across pages

## 12. Sentinel Workflow Definitions

### 11.1 PCR / ACLS

Core needs:
- active cycle timer
- shock and medication markers
- branching between rhythms
- checklist support
- explicit next-dose timing
- optional team-role layout for pit-crew style use
- explicit cycle-level stop points

### 11.2 Sepse / Choque

Core needs:
- rapid fluid and vasoactive support
- dose and infusion calculations
- milestone awareness
- reassessment checkpoints
- pending actions list
- explicit reassessment stop points

### 11.3 IOT / RSI

Core needs:
- airway risk context
- induction/paralysis dosing
- checklist support
- backup plan visibility
- post-intubation medication support
- explicit pre-intubation and post-intubation stop points

## 13. Functional Requirements

### FR-1 Single active case in v1
- System must support exactly one active case session in v1.
- Starting a new case must require explicit replacement or closure of the prior active case.

### FR-2 Patient context persistence
- System must store patient context locally across PS routes.
- System must allow reset to a new patient.
- System must allow ideal-weight-aware calculations.
- System must distinguish verified weight from estimated weight.

### FR-3 Active case session
- System must support creating, resuming, and closing a case session.
- System must persist current protocol, active step, completion state, and event timeline.
- System must persist state across route changes and refreshes.

### FR-4 Protocol progression
- System must allow moving between steps without losing branching history.
- System must support completed, active, and pending states.
- System must support optional checklist gating for critical steps.
- System must surface recommended next actions.
- System must support explicit stop points where the interface asks the user to pause and verify critical information.

### FR-5 Inline clinical tools
- System must open related drugs, scores, calculators, and timers without route change whenever possible.
- System must expose patient-context-aware outputs.
- System must allow returning to the current step without loss of state.

### FR-6 Medication safety
- System must clearly indicate whether displayed dose values rely on verified weight, estimated weight, ideal weight, or no weight.
- System must show concentration assumptions for infusion calculations.
- System must distinguish between reviewed dose guidance and confirmed administration.
- System must support high-alert medication warnings for predefined drug classes.

### FR-7 Safety signaling
- System must support three alert tiers:
  - critical
  - warning
  - info
- Critical alerts may interrupt only when immediate action or severe harm risk is plausible.
- Warning and info states should usually be non-blocking.
- Passive, inline signaling must be the default pattern.

### FR-8 Event logging
- System must log key events into the case session timeline:
  - protocol started
  - step completed
  - branch chosen
  - drug opened
  - score calculated
  - calculator used
  - timer started or stopped
  - note added
- Event kinds must distinguish:
  - consulted
  - computed
  - completed
  - confirmed

### FR-9 Handoff summary
- System must compile a structured, copyable summary from session state.
- Summary must be readable in under 30 seconds.
- Summary must contain pending actions and contingency notes.

### FR-10 Debrief support
- System must support a lightweight debrief view for closed or stabilized sentinel cases.
- Debrief output must distinguish confirmed actions from consulted or computed actions.
- Debrief must not imply formal clinical documentation status.

### FR-11 Team-role support for PCR
- System should support an optional role-oriented PCR view in v1.1 or later.
- If enabled, the interface should allow assignment or display of roles such as leader, compressor, airway, medication, and monitor-defibrillator.

## 14. Medication Safety Requirements

This section is normative for v1.

### 13.1 Weight model

```ts
type WeightSource = 'verified' | 'estimated' | 'ideal' | 'unknown';

type WeightRecord = {
  valueKg: number | null;
  source: WeightSource;
  measuredAt: number | null;
};
```

Rules:
- If a displayed dose uses estimated weight, the UI must show that state explicitly.
- If no weight is available for a weight-dependent dose, the product must not imply precise dosing.
- Where applicable, ideal-weight calculations must be visually distinct from actual-weight calculations.

### 13.2 High-alert medications

V1 must define a high-alert subset at minimum covering:
- vasoactives
- induction agents
- paralytics
- concentrated electrolytes if present in the workflow

Rules:
- high-alert medication UI must show calculation assumptions
- dilution and infusion assumptions must be visible near output
- high-alert actions should favor confirmation or acknowledgment patterns, not silent output

### 13.3 Consulted vs completed vs confirmed

The product must never imply that medication guidance viewed in the UI equals medication administered to the patient.

Required status distinctions:
- `consulted`: user opened the drug guidance
- `computed`: a calculation was performed
- `completed`: a protocol action was marked done
- `confirmed`: user explicitly confirmed a real-world action occurred

This distinction must be preserved in the timeline and in handoff generation.

## 15. Alert Governance

This section is normative for v1.

### 14.1 Alert tiers

- `critical`
  - interruptive allowed
  - must correspond to high-severity, time-sensitive action or severe risk
- `warning`
  - inline prominent
  - non-blocking by default
- `info`
  - passive or lightly emphasized

### 14.2 Alert design rules

- passive inline signaling is the default
- interruptive alerts require stronger justification than passive alerts
- alert text must be short
- alert text must be actionable
- alert text should be patient-context-aware when possible
- repeated alerts must be rate-limited or suppressed
- alert burden must be measurable
- every interruptive alert should map to a plausible severe-harm hypothesis

### 14.3 Governance metrics

V1 metrics to track:
- number of critical alerts shown per case
- alert override or dismiss count
- repeated alert frequency
- critical alert action follow-through rate in simulated testing

## 16. Situational Awareness Layer

The system must provide a persistent awareness layer for sentinel workflows.

Minimum awareness panel contents:
- current protocol
- current active step
- next recommended actions
- timers in progress
- pending critical tasks
- last confirmed actions
- declared illness severity

This may appear differently by breakpoint, but the information model must stay stable.

## 17. Critical Stop Points

This section is normative for sentinel workflows.

Critical stop points are short pause-and-verify checkpoints inserted at high-risk junctures.

Rules:
- they must be rare
- they must occur at clinically meaningful moments
- they must verify only the minimum information required to reduce major error
- they should prefer confirmation checklists over free-text input

Initial stop-point targets:
- PCR: rhythm-change and medication-timing checkpoints
- sepse/choque: fluid or vasoactive escalation checkpoints
- IOT/RSI: pre-intubation readiness and post-intubation stabilization checkpoints

## 18. Data Model Proposal

### 16.1 Patient context

```ts
type PatientContext = {
  verifiedWeightKg: number | null;
  estimatedWeightKg: number | null;
  weightSource: 'verified' | 'estimated' | 'ideal' | 'unknown';
  weightMeasuredAt: number | null;
  heightCm: number | null;
  sex: 'M' | 'F' | null;
  useIdealWeight: boolean;
  idealWeightKg: number | null;
  ageYears: number | null;
  pregnancy: boolean | null;
  allergies: string[];
  renalImpairment: boolean;
  hepaticImpairment: boolean;
  difficultAirway: boolean;
};
```

### 16.2 Case session

```ts
type CaseEventState = 'consulted' | 'computed' | 'completed' | 'confirmed';

type CaseEventKind =
  | 'protocol_started'
  | 'step_completed'
  | 'branch_selected'
  | 'drug_opened'
  | 'score_calculated'
  | 'calculator_used'
  | 'timer_started'
  | 'timer_stopped'
  | 'note_added'
  | 'handoff_generated';

type CaseEvent = {
  id: string;
  kind: CaseEventKind;
  state: CaseEventState;
  at: number;
  label: string;
  meta?: Record<string, unknown>;
};

type CaseTimer = {
  id: string;
  label: string;
  type: 'pcr' | 'step' | 'custom';
  status: 'running' | 'paused' | 'done';
  startedAt: number | null;
  elapsedSeconds: number;
};

type HandoffSummary = {
  illnessSeverity: 'critical' | 'high' | 'moderate' | 'unknown';
  patientSummary: string;
  actionList: string[];
  contingencyPlan: string[];
  synthesisPrompt: string;
};

type DebriefSummary = {
  workflow: 'pcr' | 'sepse_choque' | 'iot_rsi';
  majorTimestamps: Array<{ label: string; at: number }>;
  confirmedActions: string[];
  missedOrPendingActions: string[];
  reflection: string;
};

type CaseSession = {
  id: string;
  workflow: 'pcr' | 'sepse_choque' | 'iot_rsi';
  protocolId: string | null;
  startedAt: number | null;
  updatedAt: number | null;
  illnessSeverity: 'critical' | 'high' | 'moderate' | 'unknown';
  activeStepId: string | null;
  completedStepIds: string[];
  pendingActionLabels: string[];
  branchHistory: Array<{
    stepId: string;
    optionLabel: string;
    nextStepId: string;
    at: number;
  }>;
  timers: CaseTimer[];
  events: CaseEvent[];
  noteDraft: string;
  handoff: HandoffSummary | null;
  debrief: DebriefSummary | null;
};
```

## 19. Technical Architecture Changes

### 17.1 Store evolution

Current store file:
- `lib/store/psStore.ts`

Changes:
- expand `PatientContext`
- add `activeCaseSession`
- add `recentProtocols`
- add `recentDrugs`
- add `recentScores`
- add `startCase`, `resumeCase`, `closeCase`
- add `logCaseEvent`
- add `setPendingActions`
- add explicit confirm actions for real-world completion

### 17.2 New UI primitives

Proposed components:
- `PSPatientContextBar`
- `PSActiveCaseCard`
- `PSImmediateActions`
- `PSSituationalAwarenessPanel`
- `PSStopPointCard`
- `PSQuickDoseRail`
- `PSProtocolStepMap`
- `PSProtocolTimeline`
- `PSDrugSheet`
- `PSScoreSheet`
- `PSCalculatorSheet`
- `PSHandoffPanel`
- `PSDebriefPanel`
- `PSPCRRoleBoard`

### 17.3 Routing posture

Keep routes for direct access and shareability, but prefer overlays for in-flow actions.

Rules:
- direct route remains canonical
- in active protocol usage, supporting utilities should open as sheets
- the active case session must survive route changes

## 20. UX Flows

### Flow A: Start critical protocol
1. User lands on PS home.
2. User sees no active case.
3. User selects one sentinel workflow.
4. System creates a case session.
5. Protocol runner opens at initial step.
6. User acts through step map, timers, and inline tools.

### Flow B: Resume interrupted case
1. User lands on PS home.
2. Active case card is visible.
3. User taps resume.
4. Protocol runner opens at last active step.
5. Timer and timeline state remain available.

### Flow C: Inline dose support
1. User is in a protocol step referencing a drug.
2. User taps the drug CTA.
3. Drug sheet opens without leaving protocol.
4. Weight source, concentration assumption, and dose outputs appear.
5. Drug consult event is logged.
6. If the user explicitly confirms a real-world action, that action is separately logged as confirmed.
7. User closes the sheet and continues protocol.

### Flow D: Handoff
1. User opens handoff mode from the active case.
2. System compiles an I-PASS-derived summary.
3. User reviews and copies the summary.
4. User resumes or closes the case.

### Flow E: Stop point verification
1. User reaches a critical juncture in a sentinel workflow.
2. System presents a compact stop-point card.
3. User verifies the minimum required items.
4. System logs the checkpoint and returns the user to the active flow.

### Flow F: Debrief
1. User closes or stabilizes a case.
2. User opens debrief mode.
3. System compiles major timestamps, confirmed actions, and pending or missed actions.
4. User adds optional reflection notes.

## 21. MVP Definition

MVP must include:
- expanded patient context with explicit weight source
- one active case session model
- PS home with active-case-first layout
- protocol runner persistence for sentinel workflows
- one inline drug sheet
- one inline timer overlay
- one structured handoff panel
- explicit consulted/computed/completed/confirmed state distinctions
- stop-point support for sentinel workflows
- Apple-grade minimum interaction and visual consistency rules applied to PS-critical surfaces

MVP may defer:
- semantic command palette
- team shared display
- patient-facing room mode
- external EHR integration
- multi-case management
- role-oriented PCR board
- full debrief export

## 22. Phased Delivery Plan

### Phase 1 Foundation
- extend store
- add patient context bar
- add single active case persistence
- encode weight source logic

### Phase 2 Home Cockpit
- redesign dashboard
- add active case priority
- add immediate actions rail
- de-emphasize non-sentinel workflows

### Phase 3 Protocol Runner v2
- progress map
- branching persistence
- awareness panel
- timeline
- action logging
- stop-point cards

### Phase 4 Inline Layers
- drug sheet
- score sheet
- calculator sheet
- timer overlay

### Phase 5 Handoff Mode
- I-PASS-derived summary builder
- copy/export experience

### Phase 5.5 Debrief Mode
- event review panel
- missed or pending action synthesis
- optional reflection capture

### Phase 6 Hardening
- alert policy tuning
- accessibility
- performance
- offline resilience
- governance instrumentation
- role-based PCR view if validated
- Apple-grade UI hardening and consistency pass

## 23. Content Governance Requirements

For any protocol or medication support used in the v1 mission-control experience, the system must expose or retain:
- content version
- last reviewed date
- clinical owner
- primary source or guideline reference
- update status

These fields do not all need to be visible in the primary task UI, but they must exist in the content model or governance workflow.

UI recommendation:
- expose freshness metadata in a low-friction secondary surface such as a sheet, panel, or footer metadata row

## 24. Evaluation Plan

This section is mandatory for publication readiness.

### 22.1 Study type

Recommended initial design:
- simulation-based before/after usability study

### 22.2 Sentinel scenarios

- PCR / ACLS
- sepse / choque
- IOT / RSI

### 22.3 Primary endpoints

- time to first useful action
- time to correct dose or infusion output
- route changes per scenario
- omission of critical step

### 22.4 Secondary endpoints

- SUS
- NASA-TLX
- number of interruptions successfully recovered from
- handoff completeness
- alert burden
- stop-point completion rate
- debrief usefulness rating
- perceived visual clarity and trust
- mobile ergonomics rating

### 22.5 Safety hypotheses

- v1 reduces time to dose support versus current PS
- v1 reduces omitted critical steps in sentinel workflows
- v1 improves handoff completeness without increasing perceived workload
- v1 stop points reduce high-risk omission without unacceptable alert burden

## 25. Success Metrics

Product metrics:
- median time to first useful action
- median time to dose lookup
- route changes per task
- protocol completion rate
- resume success rate
- handoff completion rate

UX research metrics:
- task time in simulation
- click or tap count
- error count in simulated scenarios
- SUS
- NASA-TLX
- visual clarity score
- mobile ergonomics score

Safety metrics:
- critical alert exposure count
- alert override or dismiss rate
- omitted-step frequency in simulated scenarios
- proportion of dose outputs shown with verified versus estimated weight
- stop-point bypass frequency

## 26. Risks

- overbuilding complexity into the runner
- too many interruptive alerts
- excessive session state causing confusion
- mobile density becoming visually heavy
- accidental drift into pseudo-documentation
- overclaiming safety impact before validation
- stop points becoming friction rather than protection
- role support increasing UI complexity without benefit
- visual polish consuming effort without workflow gains

Mitigations:
- sentinel-scope MVP
- strict alert hierarchy
- explicit state distinctions
- compact, action-oriented text
- simulation validation before broader rollout
- keep stop points rare and measurable
- require UI polish decisions to support speed, clarity, or safety

## 27. Open Questions

- Which exact high-alert drugs are mandatory in v1?
- Which septic shock infusion workflows should be first-class in the drug sheet?
- What is the smallest handoff summary that remains clinically useful?
- Should confirmed actions require optional timestamp editing?
- Which fields must be visible versus only stored?
- Which stop points provide the best safety-to-friction ratio?
- Does team-role support meaningfully improve PCR usability in Darwin contexts?
- Which visual patterns best balance calmness with urgency on mobile under stress?

## 28. Initial Engineering Tasks

1. Extend `lib/store/psStore.ts` with weight-source-aware patient context and single active case session types.
2. Add session lifecycle and explicit event-state actions.
3. Refactor `app/components/PS/PSHeader.tsx` into a compact context bar.
4. Refactor `app/components/PS/PSDashboard.tsx` into an active-case-first cockpit.
5. Add protocol session persistence in `app/[locale]/ps/protocolos/[slug]/ProtocolFlowClient.tsx`.
6. Build a first contextual `PSDrugSheet` for sentinel workflows.
7. Build a first `PSSituationalAwarenessPanel`.
8. Build a first `PSHandoffPanel` with I-PASS-derived structure.
9. Build `PSStopPointCard` for sentinel workflows.
10. Add `PSDebriefPanel` after case closure.
11. Encode PS-wide typography, spacing, state, and motion rules into shared primitives.

## 29. Acceptance Criteria for v1

- User can enter and persist patient context across PS screens.
- User can distinguish verified weight from estimated weight.
- User can start one active sentinel workflow and resume it later at the same step.
- User can open a drug inline from protocol flow and return without losing context.
- User can see whether a drug interaction was consulted, computed, completed, or confirmed.
- User can view a structured case summary derived from session state.
- User can complete stop-point verification at critical junctures.
- PS home prioritizes active-case continuation over static discovery.
- Critical PS surfaces meet the defined typography, touch-target, contrast, and motion rules.

## 30. Publication Readiness Criteria

For the Darwin PS redesign to become publishable as a product and research artifact, it should produce:
- a clearly bounded workflow model
- reproducible UX changes
- measurable usability and task-performance outcomes
- explicit safety hypotheses
- scenario-based evaluation in representative emergency workflows
- explicit governance over alerting and content freshness
- explicit rationale for stop points and, if used, team-role support
- an explicit and reproducible UI architecture for critical surfaces

Candidate study outputs:
- pre/post usability study
- simulation-based task performance study
- design case study grounded in human factors and emergency workflow support
