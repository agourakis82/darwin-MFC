# Darwin Epistemic Revocation Distance v1.3

This milestone asks a question that v1.2 did not quantify:

> How many independently identified evidence receipts must be revoked before a
> singular model-relative result loses its justification?

The answer is the **epistemic revocation distance**. For a currently identified
state, it is the minimum cardinality of a receipt set whose removal either
admits more than one model section, removes every model section, restores an
output-moving symmetry, or otherwise invalidates the declared identification
contract.

The v1.3 artifact returns the distance, every minimum-cardinality revocation
cut, and the union of receipts appearing in those cuts. It never returns the
singular section itself. A lexical first cut is not an acceptable replacement
for the complete cut family.

Together these outputs form an **epistemic revocation spectrum**:

```text
(joint distance, model distance, symmetry distance,
 complete minimum-cut family, critical-receipt union)
```

The scalar says how close the declared result is to losing its proof; the
family says every smallest way that loss can happen. The spectrum is about a
proof obligation, not confidence in a treatment or a patient-level forecast.

## Candidate contribution

The mathematical core is an output-relative restoration theorem. For a bad
symmetry `g`, let `B(g)` be the active receipts that exclude `g`. Revoking a set
`R` restores `g` exactly when `B(g)` is a subset of `R`. Therefore the exact
minimum cost of restoring any bad symmetry is

```text
min { |B(g)| : g moves the declared singular output }.
```

The executable layer extends this from symmetry restoration to the complete
v1.2 identification contract. It evaluates all receipt-removal subsets and
retains the full family of minimum cuts.

The benchmark closes every nonempty blocker family over one to three receipt
identities (151 theorem-shaped cases) and every abstract four-state profile of
the eight-cut ABI (66,356 states). An independent no-crate Rust implementation
reproduces the committed transcript byte for byte. This is language and
implementation independence, not unrelated-author independence.

This is a research candidate, not an established novelty claim. Permutation
group bases, fault-tolerant bases, evidence removal, proof-carrying
authorization, revocable capabilities, assurance cases, and complete minimal
cut-set analysis all have close prior art. The candidate conjunction is
narrower: a mode-resolved revocation spectrum for a model-relative singular
result, immutable subset recomputation, receipt-bound native/WASM execution,
and no export of the singular result.

The ABI assumes functional recomputation from each retained-evidence subset.
It does not silently equate order-dependent incremental histories. A future
incremental profile must prove confluence or carry a path-addressed receipt.

## Sounio boundary

The kernel uses the source-fresh v1.2 Sounio analyzer as the mathematical
upstream. TypeScript only passes the eight post-revocation packed states into
the v1.3 WASM module and compares independent transcripts.

The current Sounio audit does not support a broad claim that linear, affine, or
`Observe` semantics close stale-result invalidation. Some simple linear
double-use cases reject, but branch, capture, affine, and current `Observe`
fixtures expose gaps. v1.3 therefore proves the revocation theorem in Lean and
enforces the finite lifecycle through explicit epochs and hash-bound receipts.
Compiler-enforced stale-alias elimination remains a named open gate.

## Scientific boundary

The finite model has no patient semantics. Revocation distance measures the
fragility of a declared proof obligation, not treatment safety, clinical
confidence, or expected benefit.

```text
clinicalDisposition=REFUSE
clinicalUseAllowed=false
productionAuthorized=false
noveltyEstablished=false
signed=false
```
