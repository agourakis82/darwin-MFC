# Intended Use Statement v1.0.0

## Frozen Status

Frozen on 2026-07-30 before access to any retrospective clinical cohort. Any change requires a dated amendment, a new package version, and new hashes. This statement does not authorize clinical use.

## Intended Purpose

The Darwin-Sounio pediatric respiratory kernel is an investigational clinician-facing decision-support system for encounters in Brazilian primary care and SUS. It is intended to organize a differential among nine prespecified respiratory condition classes for patients from birth through 17 years, preserve red flags independently of calculated probability, and identify the next missing observation with the greatest expected information gain.

The system supports, but does not replace, the licensed clinician. It does not establish a diagnosis, prescribe treatment, calculate a patient-specific dose without professional confirmation, or authorize disposition. The reference standard is independent double chart adjudication, not the kernel output.

## Intended Users And Setting

- Licensed physicians and nurses working in APS/SUS acute care.
- Retrospective research teams operating under approved data-use and ethics governance.
- At least two organizationally independent APS services for the first multicenter evaluation.

## Intended Population

- Age 0 through 6,574 days at the index encounter.
- Acute respiratory symptoms assessed in APS/SUS.
- Exactly one prespecified index encounter per patient in cohort contract v1.

Patients outside the age or care-setting boundary, records without a defensible reference standard, repeat episodes, and unsupported populations are outside intended use.

## Output Boundary

The investigational output contains prediction-set candidates, calibrated posterior probabilities only after all gates pass, epistemic intervals, contributing observations, red flags, and the next question. Until approved retrospective calibration, population support, temporal validity, distribution reference, independent review, and external signature exist, the only permitted product output is `REFUSE` with no Sounio probabilities exposed.

## Explicit Non-Uses

- Autonomous diagnosis, triage, treatment, prescribing, or dosing.
- Emergency decision-making without immediate clinician assessment.
- Screening of asymptomatic populations.
- Use outside APS/SUS or outside the pediatric age boundary.
- Training or evaluation on convenience labels inferred only from billing codes.
- Secondary use of identifiable records or transfer of free text into this repository.

## Evaluation Framework

Retrospective model reporting will follow [TRIPOD+AI](https://www.bmj.com/content/385/bmj.q902), risk of bias and applicability will be assessed with [PROBAST+AI](https://www.bmj.com/content/388/bmj-2024-082505), and diagnostic-study reporting will use [STARD-AI](https://www.nature.com/articles/s41591-025-03953-8) as a supplemental checklist. A later live silent-phase study will follow [DECIDE-AI](https://www.nature.com/articles/s41591-022-01772-9). The machine-readable data package follows the core-data-dictionary and decision-support separation used by [WHO SMART Guidelines](https://smart.who.int/).
