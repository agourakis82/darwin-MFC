# Synthetic Crossover Pilot Protocol v1

Status: draft protocol; no recruitment and no patient use.

## Objective

Estimate whether the medication-envelope rail improves detection of predefined constraint violations without unacceptable false blocking, delay, cognitive burden, or explanation failure.

## Design

- Within-participant randomized crossover.
- At least 12 credentialed participants: six physicians and six pharmacists.
- Forty synthetic cases per participant: 20 control and 20 with the validator.
- Washout and case-order counterbalancing to reduce learning effects.
- No real patient records, identifiers, or treatment actions.

## Benchmark

- 340 deterministic synthetic vignettes: 20 for each of 17 artifacts.
- Four balanced scenario families: within-fixture, single violation, combined violation, and mandatory context absent.
- Every vignette requires independent physician and pharmacist adjudication; divergence requires a third professional.

## Outcomes

- Primary: detection of predefined violations.
- Secondary: false blocking, task time, explanation comprehension, confidence calibration, NASA-TLX, and usability.
- Engineering gate: 100% detection of catastrophic invariants, exact native/WASM parity, valid proofs, zero overflow, and zero clinical-context traffic.
- Proposed clinical gates: sensitivity at least 95%, false blocking at most 2%, and explanation comprehension at least 90%.

## Analysis

- Report participant- and case-level estimates with confidence intervals.
- Use mixed-effects models with participant and vignette random effects where supported.
- Predefine missing-data handling, order effects, and exclusion rules before enrollment.
- Treat the 340 generated cases as engineering fixtures until dual clinical adjudication is complete.

## Stop rules

Stop or suspend if any catastrophic invariant is missed, a supposedly within-envelope case contains an adjudicated violation, PHI is transmitted, credential boundaries fail, or the signed artifact does not match the receipt.
