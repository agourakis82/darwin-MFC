# Epistemic Revocation Spectra for Proof-Carrying Inference

## Provisional title

**Epistemic Revocation Spectra: Exact Evidence-Cut Fragility for
Model-Relative Singular Inference**

## One-sentence claim

For a finite model-relative singular result, the minimum number, failure mode,
and complete family of evidence revocations that destroy its identification
contract can be defined exactly, proved independently of the executable model,
and computed without exporting the singular result or selecting one failure
cut.

This is the only retained candidate claim. It does not claim invention of
evidence removal, group bases, fault tolerance, revocable authorization,
proof-carrying code, or distance to statistical non-identifiability.

## Abstract draft

Point-valued computational results often conceal how little evidence separates
an identified model from ambiguity. Existing work studies non-identifiability,
group bases, robust determining sets, evidence retraction, and revocable
authorization, but these traditions do not by themselves expose every smallest
revocation that invalidates a declared singular result. We define an epistemic
revocation spectrum containing the distance to loss of the complete
identification contract, the distances to model and symmetry failure, the
complete family of minimum revocation cuts, and their critical-receipt union.
For output-moving symmetries, we prove that the active evidence receipts
excluding a symmetry form its exact least restoration cut and that the global
distance is attained. A Sounio kernel compiled to native Linux and WebAssembly
computes the finite three-receipt profile without exporting a singular result.
The implementation exhaustively agrees with an independent oracle over 66,356
abstract states, closes all 151 nonempty blocker families, and is reproduced by
a no-crate Rust implementation. These results establish an abstract finite
research object, not empirical validity, clinical safety, scientific novelty,
or production authorization.

## Research questions

1. Can evidence-revocation fragility be separated into model, symmetry, and
   joint failure without selecting a singular output?
2. Is the minimum restoration cost exact for arbitrary finite blocker
   enumerations?
3. Does an executable finite profile return every minimum cut rather than a
   convenient representative?
4. Can independent implementations reproduce the complete committed domain?
5. Does close prior art anticipate the complete conjunction rather than only
   its components?

## Primary results

| Result | Fixed endpoint | Observed |
|---|---:|---:|
| Lean exact-distance theorem | builds, no project axioms or forbidden escape hatches | pass |
| Blocker-family benchmark | 151 complete cases | 151 |
| Lower-bound violations | 0 | 0 |
| Exact-cut violations | 0 | 0 |
| Complete-family violations | 0 | 0 |
| Abstract ABI states | 66,356 | 66,356 |
| Sounio-oracle mismatches | 0 | 0 |
| Rust transcript records | 66,356 exact | 66,356 exact |
| Declared mutation classes killed | 4 of 4 | 4 of 4 |
| Singular-result WASM exports | 0 | 0 |

Both runtime observations are admitted only by the deterministic v1.3 receipt
and are invalidated by any source, compiler, artifact, or transcript drift.

## Candidate contribution relative to close work

The proposed object is not a continuous condition number and not a minimum
sufficient support set. It is an output-relative, discrete deletion spectrum:

```text
S(E) = (rho_joint, rho_model, rho_symmetry, M_min, C_critical).
```

`M_min` is the complete family of minimum destructive cuts. This matters
because equal scalar distances can hide different causal structures: one
result may depend on a unique bottleneck, while another has several independent
minimum failure paths.

## Required figures

1. Evidence receipts to bad-symmetry blocker hypergraph.
2. Two systems with equal scalar distance but different minimum-cut families.
3. Native/WASM/Rust receipt and transcript chain.
4. Mutation matrix showing which shortcuts each profile kills.
5. Prior-art claim lattice separating known components from the candidate
   conjunction.

## Submission blockers

- independent mathematical review of the theorem and definitions;
- unrelated third-party execution of the replication package;
- broader database and patent search, including currently blocked sources;
- a scaling result or an explicit statement that the executable contribution
  is only the complete three-receipt experiment;
- a stable public archival identifier for code, receipts, and transcripts;
- removal of every empirical, clinical, and production implication.

Until those close, the correct label is `internal preprint draft package`, not
submitted manuscript or established novelty.
