# Darwin-Sounio Epistemic Firewall v0.1

This directory contains the clinical authorization layer that is intentionally stricter than artifact integrity.

## Build flow

1. `epistemic-firewall.sio` executes all 256 combinations of eight authorization gates.
2. The build captures the native Sounio output and generates `epistemic-firewall.policy.json`.
3. `clinical-receipt.v3` and `firewall-receipt.v2` bind the source-fresh compiler receipt, compiler, policy, calibration certificate, evidence, model, and WASM by SHA-256.
4. The browser verifies every cross-binding and the compiler reconciliation claim.
5. The browser looks up the current gate mask in the Sounio-generated table.
6. A `REFUSE` disposition stops before the probabilistic WASM is instantiated.

The build accepts `SOUNIO_COMPILER_PATH` and `SOUNIO_COMPILER_RECEIPT_PATH`. A local snapshot may execute engineering tests, but only a valid `darwin.sounio.compiler-source-receipt.v1` can set `compilerReconciled=true`.

## Retrospective calibration pipeline

`conformal-calibration.sio` is the sole mathematical authority for the offline split-conformal analysis. `scripts/calibrate-epistemic-firewall.mjs` validates a deidentified cohort, performs a patient-level temporal split, generates and compiles the Sounio oracle, and writes a hash-bound report under `.clinical-kernel-build/calibration/`.

The bundled fixture is deterministic and synthetic. Its report is `fixture-only`; `--promote` fails before compilation. It exists to test the analysis machinery, never to estimate clinical performance.

The current APS score comparator is frozen in `current-aps-comparator.json`. Its TypeScript adapter emits raw product scores only; Sounio performs smoothing, probability normalization, Brier score, Brier skill, and coverage-precision sample sizing. Comparator configuration, dependencies, output, compiler, and oracle are hash-bound in the report.

```bash
pnpm calibrate:epistemic-firewall:fixture
pnpm calibrate:epistemic-firewall:validate
```

The cohort contract and full protocol are documented in `schemas/retrospective-cohort.schema.json` and `docs/research/epistemic-firewall/cohort-calibration-protocol.md`.

The frozen multicenter package contains the intended-use statement, SAP, 12-observation and nine-condition data dictionary, site-mapping v2 schema/template, onboarding runbook, and extraction checklist. Validate the template package with `pnpm validate:multicenter-package` and the executable synthetic refusal suite with `pnpm test:multicenter-onboarding`. A real cohort requires at least two externally stored locked site mappings whose exact `siteHash` set matches the cohort. Lock completed drafts with `pnpm lock:multicenter-site`; a lock never authorizes calibration or clinical use.

The public-data prevalidation package is intentionally separate from the multicenter calibration lane. `public-data/public-dataset-registry.v1.json` records source roles, selection bias, partial mappings, forbidden uses and live probes for SIVEP-Gripe, e-SUS Notifica, NAMCS and SINAN. Validate the static contract with `pnpm validate:public-clinical-datasets`; use `pnpm probe:public-clinical-datasets` for an explicit network receipt. Probes persist metadata and a CSV-header hash only, never patient rows or credentials. `pnpm analyze:public-sivep-srag:feasibility` streams a bounded prefix into non-patient aggregate counts, while `pnpm analyze:public-sivep-srag:full` streams the frozen public snapshot and emits age-classification-outcome strata under primary and complementary small-cell suppression. `pnpm test:public-sivep-stratification` validates age/code mappings, disclosure controls and refusal offline. `pnpm analyze:public-namcs2018` downloads the official archive into a temporary directory, verifies archive/SAS/format hashes, parses only the selected fields and writes weighted, non-patient ambulatory aggregates. Small medication cells are suppressed and no treatment effect, probability or prescription recommendation is inferred. `pnpm test:public-namcs2018-adapter` runs the offline mapping and refusal contract. Public sources cannot set `apsCalibrationAuthorized=true`.

The scope and limitations of the executable precision calculation are recorded in `docs/research/epistemic-firewall/sample-size-method-note.md`.

TypeScript does not recalculate the policy or clinical probabilities. It verifies bound artifacts, derives observable gate facts, and interprets the Sounio-generated disposition.

## Current state

The certificate is `not-calibrated`, unsigned, temporally invalid, and has no reference distribution. Therefore the only reachable clinical state is `REFUSE`. This is expected and is a passing safety condition, not a build failure.

## Promotion rule

Changing `status` to `calibrated` is insufficient. The build rejects promotion unless all condition and subgroup coverage values meet the declared target, utility metrics are finite, validity dates exist, distribution status and fingerprint are present, and all cohort and analysis hashes are complete. Signature verification remains a separate production gate.
