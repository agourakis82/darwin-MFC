# Darwin PS Evaluation Protocol

Status: Draft v1  
Companion docs:
- `SPEC.md`
- `UI_ARCHITECTURE.md`
- `WIREFRAMES_HIGH_FIDELITY.md`

## 1. Title

Simulation-Based Evaluation of a Workflow-Centered Acute Care Interface for Emergency Protocol Execution

## 2. Purpose

This protocol defines a publishable evaluation plan for the Darwin PS redesign.

It is intended to support:
- preprint preparation
- paper drafting
- internal validation
- grant or ethics submission preparation

## 3. Background

The Darwin PS redesign aims to improve emergency workflow support by combining:
- persistent patient context
- active case continuity
- inline medication and calculator support
- stop points at critical junctures
- situational awareness support
- structured handoff

The study focuses on whether these changes improve clinical task performance and usability under interruption.

## 4. Primary Objective

To compare the redesigned Darwin PS interface against the current PS experience in simulated emergency workflows.

## 5. Secondary Objectives

- assess interruption recovery
- assess handoff completeness
- assess alert burden
- assess perceived workload
- assess visual clarity and mobile ergonomics

## 6. Hypotheses

### Primary hypotheses

- H1: The redesigned PS reduces `time to first useful action`.
- H2: The redesigned PS reduces `time to correct dose or infusion output`.
- H3: The redesigned PS reduces omitted critical steps in sentinel workflows.

### Secondary hypotheses

- H4: The redesigned PS improves interruption recovery.
- H5: The redesigned PS improves handoff completeness.
- H6: The redesigned PS improves usability without increasing perceived workload.
- H7: Stop points reduce high-risk omissions without unacceptable friction.

## 7. Study Design

Recommended design:
- within-subject simulation study

Structure:
- each participant uses both interfaces:
  - current PS
  - redesigned PS
- workflow order should be counterbalanced
- interface order should be counterbalanced

## 8. Study Population

Target participants:
- emergency physicians
- emergency residents
- internal medicine or family medicine physicians with urgent-care exposure

Suggested inclusion criteria:
- physician or physician trainee
- recent urgent/emergency clinical exposure
- basic familiarity with digital clinical tools

Suggested exclusion criteria:
- no relevant emergency workflow exposure
- prior deep involvement in Darwin PS design decisions if bias risk is too high

## 9. Sample Strategy

### Pilot phase

Suggested target:
- `8-12` participants

Goal:
- refine scenarios
- detect usability breakdowns
- tune study timing and instrumentation

### Main study

Suggested target:
- `20-36` participants for a within-subject exploratory study

This is suitable for:
- feasibility study
- design case study
- early publication with explicit limitations

## 10. Study Arms

### Arm A

Current Darwin PS experience

### Arm B

Redesigned Darwin PS experience with:
- patient context bar
- active case continuity
- protocol runner
- stop points
- drug sheet
- handoff panel

## 11. Sentinel Scenarios

### Scenario 1: PCR / ACLS

Core tasks:
- launch correct workflow
- start cycle timing
- mark rhythm-related actions
- track medication timing
- hand off the case status

### Scenario 2: Sepse / Choque

Core tasks:
- launch workflow
- consult vasoactive support
- interpret dose support
- continue through reassessment checkpoint
- hand off pending actions

### Scenario 3: IOT / RSI

Core tasks:
- launch workflow
- review induction/paralysis support
- complete stop point before induction
- confirm post-intubation priorities
- summarize actions and pending tasks

## 12. Interruption Design

Each scenario should include at least one standardized interruption.

Examples:
- new verbal request from team member
- simulated change in vital sign
- request for dose clarification

Purpose:
- evaluate recovery cues
- assess how quickly users return to the active step

## 13. Primary Endpoints

- `time_to_first_useful_action`
- `time_to_correct_dose_output`
- `critical_step_omission_count`
- `route_changes_per_scenario`

## 14. Secondary Endpoints

- `interruption_recovery_time`
- `handoff_completeness_score`
- `stop_point_completion_rate`
- `alert_burden_score`
- `consulted_vs_confirmed_confusion_events`
- `task_completion_rate`

## 15. Subjective Instruments

### 15.1 SUS

System Usability Scale after each interface condition

### 15.2 NASA-TLX

Task load assessment after each scenario or interface block

### 15.3 Single-item ratings

Suggested quick ratings:
- visual clarity
- confidence in medication support
- ease of interruption recovery
- mobile ergonomics
- trust in workflow guidance

## 16. Custom Scoring Rubrics

### 16.1 Handoff completeness rubric

Score components:
- illness severity communicated
- concise patient summary
- action list communicated
- contingency or pending actions communicated
- synthesis prompt attempted

### 16.2 Stop point utility rubric

Score components:
- stop point noticed
- stop point completed
- stop point helped avoid omission
- stop point perceived as acceptable friction

### 16.3 Consulted vs confirmed distinction rubric

Score components:
- participant correctly identified viewed guidance as non-administration
- participant correctly used explicit confirm actions when intended
- handoff preserved this distinction

## 17. Procedure

### Step 1

Consent and study introduction

### Step 2

Brief orientation to the task format without deep coaching

### Step 3

Scenario execution under counterbalanced condition order

### Step 4

Post-scenario measures

### Step 5

Brief semi-structured interview

## 18. Data Collection

Collect:
- screen recording if permitted
- timestamps
- click or tap traces if available
- step completion logs
- observer notes
- SUS
- NASA-TLX
- interview responses

## 19. Analysis Plan

### Quantitative

Use paired comparisons where appropriate:
- paired t-test if assumptions hold
- Wilcoxon signed-rank if non-parametric

Report:
- effect sizes
- confidence intervals
- descriptive distributions

### Qualitative

Use thematic coding for:
- interruption recovery
- trust in medication support
- stop point usefulness
- alert burden
- overall confidence

## 20. Minimum Output Tables

### Table A

Participant characteristics

### Table B

Primary endpoint comparison by interface

### Table C

Secondary endpoint comparison by scenario

### Table D

Qualitative themes with representative paraphrases

## 21. Safety and Ethics Notes

This is a simulation study, not clinical deployment.

Required safeguards:
- no claim of validated clinical superiority before data collection
- no patient data required in early simulation phases
- explicit separation between educational simulation and clinical production claims

## 22. Publication Positioning

This protocol is suitable for:
- human factors paper
- digital health design case study
- simulation-based usability study

Potential framing:
- workflow-centered redesign for acute care
- interruption recovery in emergency UI
- medication safety and situational awareness in bedside protocol tools

## 23. Success Criteria for Advancement

Advance from pilot to broader validation if:
- primary endpoints improve in the expected direction
- no major medication-safety confusion emerges
- stop points are tolerated
- handoff output is clinically credible
- users prefer the redesigned interface overall

## 24. Failure Criteria

Rework before publication or deployment if:
- stop points create major friction
- consult versus confirm remains confusing
- handoff is perceived as low-value
- visual clarity is poor under mobile use
- route changes remain excessive

## 25. Deliverables

At minimum, the study should produce:
- dataset of performance measures
- SUS and NASA-TLX results
- handoff and stop-point scoring outputs
- qualitative themes
- discussion of limitations

## 26. Next Research Layer

After the simulation study, a second evaluation layer may assess:
- shared team display behavior
- role-board usefulness in PCR
- debrief usefulness over repeated use
- AI-assisted summary generation with human review
