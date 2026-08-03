# No Hidden Gauge Fixing

## Claim under test

Let a gauge set `G` act on inputs `X` and outputs `Y`. A deterministic selector
`s : X -> Y` is equivariant when

```text
s(g . x) = g . s(x).
```

For an input `x`, its stabilizer contains every `g` for which `g . x = x`.
Equivariance then forces the selected output to be fixed by every element of
that stabilizer:

```text
g . s(x) = s(g . x) = s(x).
```

Therefore, if one stabilizer element moves every admissible output, no
deterministic equivariant admissible selector exists at `x`. This is the
**stabilizer obstruction**.

The theorem does not require probabilities, optimization, or a clinical model.
It is a structural impossibility statement. Randomness does not repair a
deterministic claim: a fixed seed is another hidden coordinate, while a true
distribution changes the output type and must be evaluated as a distribution.

## Minimal countermodel

Take a context with no observable distinction and two output labels. The
non-identity gauge leaves the context unchanged and swaps the labels. Both
labels are admissible, but neither is fixed. Any deterministic single-label
selector therefore violates equivariance.

The triangle instance uses three Boolean vertices, identity transports, and all
three edges. It admits exactly the constant sections `000` and `111`. The
diagonal flip changes every vertex, leaves all identity transports unchanged,
and exchanges those two sections. Choosing either section is hidden gauge
fixing.

## External anchoring

An external observation may reduce the permitted gauge subgroup. In the
triangle countermodel, observing the value at any one vertex excludes the
diagonal flip. The executable kernel computes the smallest *additional* vertex
mask that reduces the input stabilizer to identity.

This certificate means only that this finite symmetry obstruction was removed.
It does not prove that the admissible set is clinically complete, that one
output is normatively justified, or that downstream evidence is valid.

## Executable contract

The Sounio ABI is the fixed numeric vector:

```text
[declaredEdgeMask, anchorVertexMask, mapAB, mapBC, mapCA]
```

- edge and anchor masks are in `0..7`;
- map codes are in `0..3`, with bits encoding outputs at `0` and `1`;
- gauges are the eight elements of `C2^3`;
- a gauge is eligible only when it fixes every externally anchored vertex;
- the stabilizer contains eligible gauges that leave all declared transports
  unchanged under conjugation;
- the kernel emits disposition, stabilizer mask/order, solution count, local
  issue mask, and minimum additional anchor mask;
- the canonical analyzer never emits a witness assignment.

Disposition `NO_STABILIZER_OBSTRUCTION` is deliberately not named `READY`.
Removal of one obstruction is not positive authorization.

## Falsifiers

The candidate thesis fails or must be narrowed if any of the following occurs:

1. Lean admits a deterministic equivariant selector for the stated
   countermodel without weakening the action or output type.
2. The Sounio stabilizer differs from the independent exhaustive oracle.
3. A reported minimum anchor does not reduce the residual stabilizer to
   identity, or a lower-ranked smaller anchor does so.
4. Native and WASM transcripts differ for any canonical state.
5. Any hidden-choice mutant is equivariant across the complete gauge domain.
6. A singular output can be produced without a provenance-bound external
   anchor and still satisfy the same invariants.
7. Prior art discloses the complete claimed conjunction before the recorded
   research date.

## Research boundary

The formal object has no patient semantics. The receipt remains unsigned and
fail-closed. It cannot authorize medication selection, dosing, export, or
clinical use.
