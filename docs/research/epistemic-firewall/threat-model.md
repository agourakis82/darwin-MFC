# Epistemic Firewall v0.1 Threat Model

Status: implemented technical baseline; clinical and regulatory evidence pending

## Protected assets

- Patient safety and clinician autonomy.
- Clinical evidence, calibration cohorts, model parameters, and policy thresholds.
- Sounio source, compiler artifact, native oracle output, WASM, and test vectors.
- The authorization state rendered to the clinician.

## Trust boundaries

1. Scientific evidence and deidentified cohorts enter the build pipeline.
2. Sounio native execution produces mathematical and policy oracles.
3. The build creates browser artifacts and hash-bound receipts.
4. The browser verifies artifacts before any inference.
5. The UI renders only the authorization state returned by the verifier.

## Threats and controls

| ID | Threat | v0.1 control | Residual state |
| --- | --- | --- | --- |
| T1 | Evidence, model, WASM, policy, or certificate substitution | Cross-bound SHA-256 checks in both receipts | Signature is not implemented |
| T2 | Stale or different compiler artifact | Compiler hash bound into both receipts | Remote source reconciliation is pending |
| T3 | TypeScript silently replacing Sounio mathematics | No probabilistic fallback; policy is a Sounio-generated lookup table | Adapter correctness still needs independent review |
| T4 | False promotion by editing `status` | Build requires complete coverage, utility, distribution, cohort, and analysis evidence | Metric recomputation pipeline is pending |
| T5 | Use after certificate expiry | Temporal validity is an authorization bit | No valid certificate exists yet |
| T6 | Population or site mismatch | Population support is an authorization bit | Site-specific validation is pending |
| T7 | Harmful distribution shift | Distribution status is an authorization bit | Drift monitor and fingerprint are pending |
| T8 | Red flag hidden by a high posterior | Red flag takes precedence over `ASK` and `ACT` | Clinical red-flag set requires review |
| T9 | UI bypasses authorization | `REFUSE` returns no hypotheses and stops before WASM instantiation | End-to-end tamper tests remain pending |
| T10 | Abstention induces under-treatment | Explicit `REFUSE/DEFER/ASK` states | Human-factors study is pending |

## Safety properties

- P1: No calibrated claim without complete calibration evidence.
- P2: No clinical output when a bound hash differs.
- P3: No clinical output when signature verification is absent.
- P4: No clinical output outside the certificate population or validity window.
- P5: No `ACT` under measured distribution shift.
- P6: Red flags dominate missing-information and action states.
- P7: No TypeScript probability fallback.
- P8: Any source, evidence, compiler, policy, or executable change invalidates existing receipts.

## Current authorization result

`REFUSE / calibration-invalid` is the only honest runtime result. Integrity checks pass, but clinical authorization does not.
