# Darwin PS Safety Wireframes

Status: Draft v1  
Companion docs:
- `SAFETY_SPEC_ADDENDUM.md`
- `WIREFRAMES_HIGH_FIDELITY.md`

## 1. Purpose

This document isolates the safety-critical wireframes for the sentinel workflows.

Focus:
- weight-dependent dosing
- omission prevention
- safety actions

## 2. Shared Safety Pattern

Every safety-critical drug surface should include:
- banner if weight is not verified
- dose badge showing weight source
- calculation basis block
- reviewed action
- confirm use action

## 3. Shared Drug Sheet Pattern

```text
+--------------------------------------------------+
| Drug name                                        |
| indication                                       |
+--------------------------------------------------+
| SAFETY BANNER if weight != verified              |
| Using estimated weight                           |
+--------------------------------------------------+
| Dose                                             |
| 21 mg                              [EST. WT]     |
| source: estimated 70 kg at 14:02                |
| basis: 0.3 mg/kg x 70 kg                        |
+--------------------------------------------------+
| Dilution / infusion assumptions                  |
| concentration, unit, final rate                 |
+--------------------------------------------------+
| Actions                                          |
| [Mark reviewed]    [Confirm use]                |
+--------------------------------------------------+
```

## 4. PCR Safety View

### Priority safety elements

- adrenaline timing
- shock markers
- cycle timing
- next-dose awareness

### Safety layout

```text
+--------------------------------------------------+
| PCR / ACLS                                       |
| Step: Rhythm check                               |
+--------------------------------------------------+
| Pending                                          |
| - pulse check                                    |
| - defibrillation decision                        |
| - adrenaline timing                              |
+--------------------------------------------------+
| Drug safety card                                 |
| Adrenalina                                       |
| source + basis + reviewed/confirm                |
+--------------------------------------------------+
| Timeline                                         |
| consulted -> reviewed -> confirmed -> step done  |
+--------------------------------------------------+
```

## 5. Sepse / Choque Safety View

### Priority safety elements

- vasoactive support
- infusion assumptions
- reassessment checkpoint

### Safety layout

```text
+--------------------------------------------------+
| Sepse / Choque                                   |
| Step: Vasopressor escalation                     |
+--------------------------------------------------+
| Stop point                                       |
| verify MAP, access, and dose assumptions         |
+--------------------------------------------------+
| Drug safety card                                 |
| Noradrenalina                                    |
| banner + badge + basis + concentration           |
| [reviewed] [confirm use]                         |
+--------------------------------------------------+
| Timeline                                         |
| consulted -> reviewed -> confirmed -> step done  |
+--------------------------------------------------+
```

## 6. IOT / RSI Safety View

### Priority safety elements

- induction dose
- paralysis dose
- pre-intubation stop point

### Safety layout

```text
+--------------------------------------------------+
| IOT / RSI                                        |
| Step: Prepare meds                               |
+--------------------------------------------------+
| Stop point                                       |
| verify airway backup and meds                    |
+--------------------------------------------------+
| Drug safety cards                                |
| Etomidate                                        |
| Rocuronium                                       |
| source + timestamp + basis + reviewed/confirm    |
+--------------------------------------------------+
| Timeline                                         |
| consulted -> reviewed -> confirmed -> step done  |
+--------------------------------------------------+
```

