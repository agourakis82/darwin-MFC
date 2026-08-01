# Darwin Rx Medication Envelope Intended Use v1

## Intended use

Darwin Rx is intended to validate a medication action created by a credentialed professional against a delimited set of independently reviewed constraints. The result is one of `REFUSE`, `BLOCK`, `REVIEW`, or `WITHIN_REVIEWED_ENVELOPE` and includes evidence provenance, evaluated constraints, unknown variables, counterexample codes, and artifact hashes.

## Excluded uses

- It does not diagnose, rank diseases, select a medication, recommend treatment, calculate an alternative dose, or issue an active legal order.
- It does not replace professional judgment, local policy, product labeling, monitoring, or patient-specific assessment.
- It does not convert AI agreement into clinical consensus.
- It does not authorize use with real patients during the current milestone.

## Current operating boundary

- Synthetic vignettes only.
- `pilotAuthorized=false` and `productionAuthorized=false`.
- All 17 artifacts remain `EVIDENCE_REQUIRED`.
- No trusted pilot signing key is published.
- FHIR export is limited by contract to `MedicationRequest.status=draft` and `intent=proposal` after a future `WITHIN_REVIEWED_ENVELOPE` result and explicit professional confirmation.

## Regulatory posture

This document starts the intended-use record; it is not a conformity, certification, registration, or regulatory determination. Any patient pilot requires an institution, ethics review, privacy assessment, applicable Anvisa evaluation, and an updated safety case.
