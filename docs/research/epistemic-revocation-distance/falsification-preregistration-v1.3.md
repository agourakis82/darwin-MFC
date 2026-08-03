# Falsification preregistration v1.3

Frozen before the source-fresh v1.3 runtime receipt is generated.

## Primary hypothesis

The emitted epistemic revocation spectrum is exact for the declared finite
three-receipt ABI: no smaller cut destroys the identification contract, every
emitted minimum cut destroys it, and every minimum destructive cut is emitted.

## Confirmatory endpoints

1. `151` complete nonempty blocker-family cases.
2. `0` lower-bound violations.
3. `0` exact-cut violations.
4. `0` complete-family omissions or additions.
5. `66,356` abstract state profiles evaluated.
6. `0` Sounio-WASM versus independent JavaScript mismatches.
7. Exact committed-transcript equality from a no-crate Rust implementation.
8. Native and WASM `main` both return `143` from the exhaustive self-check.
9. `0` singular-result or selected-cut exports.
10. Stale epoch, parent hash, source hash, state, and state-digest mutations
    make zero kernel calls.

## Mutation endpoints

The benchmark must kill all four predeclared shortcut implementations:

- return only the lexical first minimum cut;
- intersect minimum cuts where the contract requires their union;
- reuse joint distance for model and symmetry distance;
- omit the base-identification guard.

Adding a mutant after seeing failures is exploratory and cannot replace these
confirmatory endpoints.

## Failure interpretation

- Any endpoint mismatch invalidates the v1.3 receipt.
- A theorem failure narrows or abandons the mathematical claim.
- A runtime mismatch blocks execution claims even if Lean remains green.
- A prior-art anticipation removes novelty language but does not erase a valid
  replication result.
- A compiler-control-flow gap blocks compiler-enforced no-replay language but
  does not alter the explicit epoch/hash theorem.

## Prohibited reinterpretations

The experiment cannot be relabeled after execution as clinical validation,
patient-level robustness, probabilistic confidence, treatment safety,
production authorization, patentability, or proof that no prior art exists.
