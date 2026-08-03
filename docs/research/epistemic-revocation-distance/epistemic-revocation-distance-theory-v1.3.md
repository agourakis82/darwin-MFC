# Epistemic Revocation Distance

## 1. Objects

Let `E` be a finite set of active evidence receipts, `G` a finite set of
candidate symmetries, and `Y` an output space. For a declared singular output
`y`, call a symmetry `g` bad when `g.y != y`.

Each receipt either excludes a candidate symmetry or leaves it possible. For a
bad symmetry `g`, define its blocker set:

```text
B_E(g) = { e in E : e excludes g }.
```

A revocation set `R` restores `g` when no still-active receipt excludes it.
Equivalently:

```text
g is restored after R  iff  B_E(g) is a subset of R.
```

## 2. Exact restoration theorem

For each bad symmetry `g`, revoking `B_E(g)` restores `g`, and every set that
restores `g` contains `B_E(g)`. Its exact restoration cost is therefore
`|B_E(g)|`.

For a nonempty finite bad-symmetry set `G_bad`, define

```text
rho_sym(E, y) = min { |B_E(g)| : g in G_bad }.
```

Then:

1. no revocation set of size smaller than `rho_sym` restores a bad symmetry;
2. at least one revocation set of size exactly `rho_sym` restores one;
3. the complete family of minimum cuts is the set of blocker sets attaining
   that minimum.

The Lean artifact proves these statements for arbitrary finite evidence and
gauge types. It does not assume the Boolean triangle.

## 3. Identification distance

Symmetry is only one failure mode. A declared singular result can also cease to
be model-relative unique or the model can become inconsistent. Let `I(E)` mean
that the upstream analyzer reports exactly one admissible section, a trivial
residual stabilizer, and its identified disposition.

The executable distance is

```text
rho(E) = min { |R| : R subset E and not I(E - R) }.
```

The v1.3 profile includes:

- `jointDistance`: first loss of the complete identification contract;
- `modelDistance`: first loss of exactly-one-section status;
- `symmetryDistance`: first restoration of a nontrivial stabilizer;
- `minimumCutFamily`: every receipt mask attaining `jointDistance`;
- `criticalReceiptMask`: the union of those minimum cuts.

The ordered object

```text
S(E) = (rho_joint, rho_model, rho_symmetry, M_min, C_critical)
```

is the **epistemic revocation spectrum**. Two results with the same scalar
distance need not have the same spectrum: one may have a unique failure cut,
while another may have several independent minimum cuts. Returning `M_min`
rather than a lexical representative preserves that distinction and makes the
claim directly falsifiable.

`distance = 0` means the base state was not identified. `distance = 4` is the
finite three-receipt sentinel for no observed failing subset. Neither state can
authorize a singular action.

## 4. Compositional ABI

The v1.2 analyzer is evaluated at the active receipt mask and at every one of
its eight possible revocation masks. Invalid masks are represented by `-1`.
The v1.3 Sounio kernel receives:

```text
[activeMask, stateAfterCut0, ..., stateAfterCut7]
```

Every nonnegative state is a packed v1.2 Sounio result. The v1.3 kernel decodes
only disposition, section count, and stabilizer order, then computes the exact
profile. This keeps Sounio as the executable mathematical authority while the
JavaScript harness remains orchestration and independent falsification.

Each post-revocation state must be recomputed from the immutable set of
receipts that remain. v1.3 does not treat two incremental revocation histories
as equivalent merely because they remove the same IDs. If an upstream updater
is order-dependent, it must carry the path or prove confluence before using
this set-indexed ABI.

The executable profile has exactly three receipt bits. This is a complete
finite experiment, not an asymptotic algorithm claim. The Lean theorem is
general over finite enumerations; scaling the executable search beyond three
receipts is a separate algorithmic milestone.

## 5. Falsifiers

The candidate fails or must be narrowed if:

1. the Lean restoration equivalence or exact-cost theorem cannot be proved
   without adding assumptions hidden from the executable model;
2. any cut smaller than the emitted distance invalidates identification;
3. any emitted minimum cut does not invalidate identification;
4. any minimum-cardinality invalidating cut is absent from the emitted family;
5. native and WASM outputs differ;
6. a singular section or selected cut is exported;
7. stale, tampered, or differently hashed upstream results are accepted;
8. prior art discloses the complete claimed conjunction before the recorded
   research date.

## 6. Boundary

This theorem measures robustness of a finite proof obligation. It does not
establish empirical validity, patient benefit, treatment choice, or clinical
authorization.
