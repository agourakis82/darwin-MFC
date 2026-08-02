# Deontic Transport Formal Gate

Date: 2026-08-02

Status: **research-only formalization in progress**

Clinical disposition: **REFUSE**

This package begins the formal-proof gate described by the Deontic
Transportability research program. It contains no medication, diagnosis,
patient context, dose, or clinical recommendation.

## Implemented boundary

The model has two abstract actions, two-dimensional integer outcome vectors,
context-specific integer weights, an explicit feasible-action mask, and a
decision-authority identifier. Results are set-valued:

```text
0 = REFUSE / empty decision set
1 = action A only
2 = action B only
3 = both actions / partially identified set
```

Identification states are:

```text
0 = REFUSED
1 = IDENTIFIED_A
2 = IDENTIFIED_B
3 = PARTIAL_ABSTAIN
```

## Artifacts

- `lean4/DeonticTransport.lean`: finite semantics, general evidence-only
  impossibility theorem, feasibility lemmas, two-context robust-dominance
  theorem, and four executable countermodels.
- `sounio/deontic_transport.sio`: exact integer implementation of the same
  four countermodels and set operations.
- `vectors/deontic-transport-formal-vectors.v1.json`: language-neutral inputs
  and expected outputs.
- `evidence/`: normalized outputs from actual compiler runs when available.
- `formal-gate.receipt.v0.1.json`: hashes, toolchain identities, passed gates,
  skipped gates, and invalidation conditions.

## Claims deliberately not made

- The current finite model is not a universal decision theory.
- Concrete `native_decide` witnesses do not replace the general theorems.
- Integer weights are experimental semantics, not elicited patient utilities.
- A clean native Sounio run does not establish WASM parity.
- A Lean build does not establish empirical validity or scientific novelty.
- No result authorizes clinical use.

## Local research gate

```bash
node scripts/verify-deontic-formal-gate.mjs
```

The verifier fails closed if source, vectors, captured outputs, compiler
identity, or receipt hashes diverge.

## Source-fresh closure v0.4

The v0.4 closure adds a source-fresh Sounio compiler receipt, deterministic
native and WASM artifacts, a Lean refinement of the modeled integer ABI, and
two complementary executable gates:

```bash
node scripts/verify-deontic-source-fresh-gate.mjs
node scripts/verify-deontic-wasm-source-fresh.mjs
```

The first gate checks the canonical semantic-refinement receipt across 87,381
valid bounded families and 438 rejection cases. The second traverses 589,824
packed ABI states, checks inactive-slot noninterference, and exercises negative
hash, compiler-identity, and clinical-promotion cases.

`compilerReconciled=true` applies only to the compiler and artifacts identified
by the v0.4 receipts. The executable model remains bounded to eight contexts,
the emitted WASM binary semantics are not mechanized in Lean, and no empirical,
clinical, novelty, regulatory, signature, or production claim is established.
`clinicalDisposition=REFUSE` remains mandatory.
