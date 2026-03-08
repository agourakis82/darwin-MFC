# Darwin PS High-Fidelity Wireframes

Status: Draft v1  
Companion docs:
- `SPEC.md`
- `UI_ARCHITECTURE.md`
- `DESIGN_TOKENS_COMPONENT_INVENTORY.md`

## 1. Purpose

This document provides high-fidelity textual wireframes for the PS vertical.

It is intended to bridge:
- product decisions
- UI architecture
- engineering implementation
- future visual mockups

These wireframes are not low-level pixel specs, but they are specific enough to define hierarchy, grouping, priority, and interaction behavior.

## 2. Screen Set

The v1 high-fidelity screen set includes:
- PS Cockpit desktop
- PS Cockpit mobile
- Protocol Runner desktop
- Protocol Runner mobile
- Drug Sheet
- Timer Overlay
- Handoff Panel
- Debrief Panel
- Stop Point Card

## 3. Visual Direction

### 3.1 Overall tone

- dark clinical canvas
- restrained chroma
- strong data legibility
- urgent states clearly distinguished
- low ornament, high precision

### 3.2 Primary visual cues

- active workflow at top
- active step in center
- support tools in sheets
- data values in mono
- semantically stable states

## 4. PS Cockpit Desktop

### 4.1 Layout

```text
+--------------------------------------------------------------------------------------------------+
| Patient Context Bar                                                                              |
| Verified wt 70 kg | Age 64 | Renal impairment | Airway risk | Edit                              |
+--------------------------------------------------------------------------------------------------+
| Case Header                                                                                      |
| Active Case: Sepse / Choque | Severity: Critical | Resume | Handoff | Close                     |
+----------------------------+------------------------------------------------------+--------------+
| Left Rail                  | Main Cockpit                                         | Right Rail   |
|                            |                                                      |              |
| Immediate Actions          | Active Case Card                                     | Awareness    |
| Dose                       | Step: Vasopressor escalation                         | Next actions |
| Timer                      | Last confirmed: Fluids 30 mL/kg                      | Timers       |
| Score                      | Pending: MAP reassessment                            | Last actions |
| Note                       | [Resume workflow] [Open drug sheet]                  | Pending      |
|                            |                                                      |              |
| Sentinel Workflows         | Quick Dose Rail                                      | Recent       |
| PCR                        | Noradrenaline | Adrenaline | Etomidate | Rocuronium | Favorites    |
| Sepse/Choque               |                                                      |              |
| IOT/RSI                    | Stop Point Preview                                   |              |
|                            | Reassess MAP before escalation                       |              |
| Legacy Workflows           |                                                      |              |
| Trauma                     | Recent Workflows                                     |              |
| AVC                        | Sepse | PCR | RSI                                    |              |
| IAM                        |                                                      |              |
+----------------------------+------------------------------------------------------+--------------+
```

### 4.2 Interaction notes

- left rail is utilitarian and quiet
- main area leads with active case, not static discovery
- right rail is situational awareness, not generic stats
- quick dose rail uses large pill-like controls with mono dosage snippets where available

## 5. PS Cockpit Mobile

### 5.1 Layout

```text
+--------------------------------------+
| Patient Context Bar                  |
| 70 kg verified | renal | edit        |
+--------------------------------------+
| Active Case Header                   |
| Sepse / Choque   Critical            |
| Step: Vasopressor escalation         |
| [Resume] [Handoff]                   |
+--------------------------------------+
| Immediate Actions                    |
| Dose | Timer | Score | Note          |
+--------------------------------------+
| Quick Dose Rail                      |
| Norad | Adren | Etom | Roc           |
+--------------------------------------+
| Stop Point Preview                   |
| Reassess MAP before escalation       |
+--------------------------------------+
| Sentinel Workflows                   |
| PCR          Sepse/Choque            |
| IOT/RSI      More                    |
+--------------------------------------+
| Bottom Nav                           |
+--------------------------------------+
```

### 5.2 Interaction notes

- the active case appears before launchers
- quick actions must be thumb-friendly
- no dense multipanel experience on mobile cockpit

## 6. Protocol Runner Desktop

### 6.1 Layout

```text
+--------------------------------------------------------------------------------------------------+
| Patient Context Bar                                                                              |
+--------------------------------------------------------------------------------------------------+
| Case Header                                                                                      |
| Workflow: IOT / RSI | Severity: High | Timer | Handoff | Debrief                                 |
+------------------------+------------------------------------------------------+------------------+
| Step Map               | Active Step                                           | Awareness Panel  |
|                        |                                                      |                  |
| 1. Pre-oxygenate       | PREPARE FOR RSI                                       | Current step     |
| 2. Check airway risk   | Confirm backup airway strategy before induction        | Next actions     |
| 3. Prepare meds        |                                                      | Active timers    |
| 4. Confirm roles       | Checklist                                             | Last confirmed   |
| 5. Induction           | [ ] Monitor attached                                  | Pending tasks    |
| 6. Paralysis           | [ ] Suction ready                                     | Weight source    |
| 7. Tube confirmation   | [ ] Backup airway available                           |                  |
|                        |                                                      | Drug Sheet Peek  |
| Stop Point Marker      | Inline Actions                                        | Etomidate        |
| Before induction       | [Open Etomidate] [Open Rocuronium] [Start Timer]      | 0.3 mg/kg        |
|                        |                                                      | verified 70 kg   |
| Timeline               | Decision Block                                        |                  |
| Consulted etomidate    | Difficult airway present?                             |                  |
| Timer started          | [Yes -> backup-first plan] [No -> continue]           |                  |
+------------------------+------------------------------------------------------+------------------+
```

### 6.2 Interaction notes

- center pane owns focus
- awareness panel must remain useful even when narrow
- timeline is secondary but continuously informative

## 7. Protocol Runner Mobile

### 7.1 Layout

```text
+--------------------------------------+
| Patient Context                      |
| 70 kg verified | difficult airway    |
+--------------------------------------+
| Workflow Header                      |
| IOT / RSI     Step 3 of 7            |
| Severity: High                       |
+--------------------------------------+
| Active Step Card                     |
| Prepare meds                         |
| Confirm backup airway strategy       |
|                                      |
| Checklist                            |
| [ ] Monitor attached                 |
| [ ] Suction ready                    |
| [ ] Backup airway available          |
+--------------------------------------+
| Inline Actions                       |
| Etomidate | Rocuronium | Timer       |
+--------------------------------------+
| Stop Point Card                      |
| Before induction                     |
| Verify roles and backup plan         |
| [Open checkpoint]                    |
+--------------------------------------+
| Sticky Action Bar                    |
| Prev | Done | Next | Summary         |
+--------------------------------------+
```

### 7.2 Interaction notes

- active step card should dominate
- stop point remains visible but not overwhelming
- sticky action bar always exposes forward progress

## 8. Drug Sheet

### 8.1 Layout

```text
+--------------------------------------------------+
| Etomidate                                        |
| RSI induction                                    |
| Weight source: verified 70 kg                    |
+--------------------------------------------------+
| Dose                                             |
| 0.3 mg/kg                                        |
| = 21 mg                                          |
+--------------------------------------------------+
| Assumptions                                      |
| Uses verified weight                             |
| No renal adjustment surfaced                     |
+--------------------------------------------------+
| Actions                                          |
| [Mark consulted] [Confirm used]                  |
+--------------------------------------------------+
| Related                                          |
| Rocuronium | Timer | Backup airway stop point    |
+--------------------------------------------------+
```

### 8.2 Interaction notes

- assumptions must be above or adjacent to output
- confirm action must be visually distinct from consult

## 9. Timer Overlay

### 9.1 Layout

```text
+--------------------------------------+
| Active Timer                         |
| PCR Cycle 02:00                      |
| Next epinephrine in 01:00            |
+--------------------------------------+
| Quick Markers                        |
| Shock | Epi | Amio | Pulse check     |
+--------------------------------------+
| [Pause] [Close]                      |
+--------------------------------------+
```

### 9.2 Interaction notes

- overlay should not fully replace runner context
- quick markers must be large and immediate

## 10. Stop Point Card

### 10.1 Layout

```text
+--------------------------------------------------+
| STOP POINT                                       |
| Before induction                                 |
| Verify the minimum critical items                |
+--------------------------------------------------+
| [ ] Primary airway plan ready                    |
| [ ] Backup airway plan visible                   |
| [ ] Induction and paralysis meds prepared        |
| [ ] Team roles acknowledged                      |
+--------------------------------------------------+
| [Continue workflow]                              |
+--------------------------------------------------+
```

### 10.2 Interaction notes

- visually distinct from generic alert
- compact, deliberate, and rare

## 11. Handoff Panel

### 11.1 Layout

```text
+--------------------------------------------------+
| HANDOFF                                          |
+--------------------------------------------------+
| Illness severity                                 |
| Critical                                         |
+--------------------------------------------------+
| Patient summary                                  |
| Septic shock, fluids completed, norad running    |
+--------------------------------------------------+
| Action list                                      |
| - Fluids 30 mL/kg completed                      |
| - Norad consulted and confirmed                  |
| - MAP reassessment pending                       |
+--------------------------------------------------+
| Contingency                                      |
| If MAP remains < 65, titrate vasoactive support  |
+--------------------------------------------------+
| Synthesis                                        |
| Confirm recipient understands current priorities |
+--------------------------------------------------+
| [Copy] [Resume]                                  |
+--------------------------------------------------+
```

## 12. Debrief Panel

### 12.1 Layout

```text
+--------------------------------------------------+
| DEBRIEF                                          |
+--------------------------------------------------+
| Workflow                                         |
| IOT / RSI                                        |
+--------------------------------------------------+
| Major timestamps                                 |
| 14:02 workflow started                           |
| 14:05 meds confirmed                             |
| 14:07 tube confirmation step                     |
+--------------------------------------------------+
| Confirmed actions                                |
| - Etomidate confirmed                            |
| - Rocuronium confirmed                           |
+--------------------------------------------------+
| Pending or missed                                |
| - Post-intubation sedation not confirmed         |
+--------------------------------------------------+
| Reflection                                       |
| [text area]                                      |
+--------------------------------------------------+
| [Close case]                                     |
+--------------------------------------------------+
```

## 13. Visual QA Questions

Before final visual design, ask:
- is the active case state obvious in under 2 seconds?
- is the next action obvious in under 2 seconds?
- are critical values readable at a glance?
- are confirmed actions visually distinct from consulted actions?
- can the user recover after interruption without scanning the whole page?
- does any motion compete with timer or safety cues?

## 14. Definition of Done

These wireframes are implementation-ready when:
- engineering can infer component boundaries
- product can infer workflow priority
- design can derive exact visual comps without rethinking hierarchy
- research can derive evaluation scenarios from the flows
