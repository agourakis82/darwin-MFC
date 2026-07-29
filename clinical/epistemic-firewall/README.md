# Darwin-Sounio Epistemic Firewall v0.1

This directory contains the clinical authorization layer that is intentionally stricter than artifact integrity.

## Build flow

1. `epistemic-firewall.sio` executes all 256 combinations of eight authorization gates.
2. The build captures the native Sounio output and generates `epistemic-firewall.policy.json`.
3. The browser verifies the policy, calibration certificate, evidence, model, WASM, compiler identity, and receipts by SHA-256.

## Retrospective calibration pipeline

`conformal-calibration.sio` is the sole mathematical authority for the offline split-conformal analysis. `scripts/calibrate-epistemic-firewall.mjs` validates a deidentified cohort, performs a patient-level temporal split, generates and compiles the Sounio oracle, and writes a hash-bound report under `.clinical-kernel-build/calibration/`.

The bundled fixture is deterministic and synthetic. Its report is `fixture-only`; `--promote` fails before compilation. It exists to test the analysis machinery, never to estimate clinical performance.

The current APS score comparator is frozen in `current-aps-comparator.json`. Its TypeScript adapter emits raw product scores only; Sounio performs smoothing, probability normalization, Brier score, Brier skill, and coverage-precision sample sizing. Comparator configuration, dependencies, output, compiler, and oracle are hash-bound in the report.

```bash
pnpm calibrate:epistemic-firewall:fixture
pnpm calibrate:epistemic-firewall:validate
```

The cohort contract and full protocol are documented in `schemas/retrospective-cohort.schema.json` and `docs/research/epistemic-firewall/cohort-calibration-protocol.md`.

The scope and limitations of the executable precision calculation are recorded in `docs/research/epistemic-firewall/sample-size-method-note.md`.
4. The browser looks up the current gate mask in the Sounio-generated table.
5. A `REFUSE` disposition stops before the probabilistic WASM is instantiated.

TypeScript does not recalculate the policy or clinical probabilities. It verifies bound artifacts, derives observable gate facts, and interprets the Sounio-generated disposition.

## Current state

The certificate is `not-calibrated`, unsigned, temporally invalid, and has no reference distribution. Therefore the only reachable clinical state is `REFUSE`. This is expected and is a passing safety condition, not a build failure.

## Promotion rule

Changing `status` to `calibrated` is insufficient. The build rejects promotion unless all condition and subgroup coverage values meet the declared target, utility metrics are finite, validity dates exist, distribution status and fingerprint are present, and all cohort and analysis hashes are complete. Signature verification remains a separate production gate.
