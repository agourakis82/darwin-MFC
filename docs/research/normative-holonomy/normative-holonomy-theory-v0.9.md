# Normative holonomy: finite theory v0.9

## Research question

Can every local translation in a normative network be individually certified
while the composed network still fails to support any globally coherent
witness? If so, what must a zero-error executable system return?

## Triangle model

Let the vertices be `A`, `B`, and `C`, and let the witness domain be Boolean.
The directed translations are:

- `AB : A -> B`
- `BC : B -> C`
- `CA : C -> A`

Each translation is encoded by its outputs on `false` and `true`. Codes `1`
and `2` are the two bijections (flip and identity); codes `0` and `3` are
constant maps and therefore fail the local proof contract.

A global section is a triple `(a,b,c)` satisfying every declared edge:

```text
b = AB(a)
c = BC(b)
a = CA(c)
```

The holonomy at `A` is `CA(BC(AB(a)))`. A global section exists exactly when
this composite has a fixed point. In the concrete odd-flip triangle, all three
edge maps are bijective, but the composite is Boolean negation and has no fixed
point. Local certification therefore does not imply global realizability.

## Executable contract

The kernel accepts five signed 64-bit integers:

```text
[declaredMask, boundMask, mapAB, mapBC, mapCA]
```

Masks range from `0` through `7`; map codes range from `0` through `3`; and
`boundMask` must be a subset of `declaredMask`. The packed result is:

```text
disposition + certificateMask * 8 + certificateCardinality * 64
```

The certificate mask identifies one of:

- a cardinality-minimal sufficient bound basis;
- a cardinality-minimal set of translations still requiring binding;
- the locally invalid edges;
- the minimal obstruction cycle.

Candidate ties use the stable order `0,1,2,4,3,5,6,7`. This order is part of
the ABI and is tested independently. A separate repair-cut function returns a
cardinality-minimal edge set whose removal restores at least one global
section; it never returns a replacement witness.

## Zero-error abstention theorem

An outcome may be `refuse`, `abstain`, or `emit assignment`. `ZeroError` means
that every emitted assignment is a valid global section. Lean proves:

```text
no global section + zero-error + non-refusal => abstention
```

The theorem is pointwise over arbitrary seeds, so randomization cannot evade
the obstruction without weakening the zero-error contract.

## Scope limits

The model proves neither that a real translation is correct nor that Boolean
witnesses capture a clinical or legal domain. It deliberately separates the
composition problem from authority, values, causality, evidence quality, and
real-world ontology alignment. Every clinical use remains refused.
