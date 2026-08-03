# Revocable Normative Influence v0.7 Closure

Closure date: 2026-08-02.

## Result

The bounded research artifact closes the following conditional statement:

> Once authority narrows, a derived normative label may survive only when it is
> reidentified from the current legitimate view. If currently indistinguishable
> admissible worlds require different labels, a zero-error non-refusing engine
> must abstain.

This is a theorem and executable witness over an abstract finite model. It is
not a clinical recommendation, authorization rule, novelty opinion, or product
release.

## Formal Evidence

- Lean `4.30.0-rc2` builds the complete project.
- No project-declared axioms, `sorry`, or `admit` occur.
- `sanitizedEngineNoResidualInfluence`,
  `postRevocationZeroErrorForcesAbstention`, and the seed-wise extension depend
  on no axioms.
- Extensional compatibility lemmas separately and honestly report Lean's
  standard `propext` and `Quot.sound` axioms.

## Executable Evidence

- Source-fresh compiler commit:
  `32bf57e880d5a0bc64d39edff98491a6c7c6101d`.
- Compiler SHA-256:
  `b5208b7a82bf5a369d1188858a3ab57ceba3bdd83cceb28f30cc90f05b94322d`.
- Two independent WASM builds are bit-identical.
- Two independent native builds are bit-identical and both execute with exit
  code `97`.
- A generated native transcript harness compiles bit-identically twice and
  executes twice with exit code `0`.
- Native and WASM transcripts contain exactly 262,144 ordered
  `index|certificate|cut` records, 2,887,066 bytes, and SHA-256
  `6466348cb7e94b0fbb7e69ec78e0139d30f3ad8f3d6b82f3a7d9bd6df4a19bdd`.

## Exhaustive Host Gate

- Hostile states checked: 6,400,000.
- Canonical states checked internally: 262,144.
- Valid monotone states: 110,592.
- Invalid states refused: 6,289,408.
- Distinct revocation-cut states: 32,768.
- Certificate, reference-oracle, validity, minimality, cut, and transcript
  mismatches: zero.
- The defensive `REFUSE_INTERNAL_INCONSISTENCY` state is unreachable throughout
  the valid bounded domain.

## Claim Boundary

The adversarial prior-art map directly collides broad claims involving dynamic
revocation, deletion, certified unlearning, counterfactual invariance,
proof-carrying authorization, provenance supports, view deletion, living
guidelines, and governed correction workflows. The exact conjunction remains a
research hypothesis, not established novelty.

`clinicalDisposition=REFUSE`

`clinicalUseAllowed=false`

`productionAuthorized=false`

`noveltyEstablished=false`

`signed=false`
