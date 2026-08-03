# Normative gauge anomaly theory v1.0

## Problem

Clinical and institutional systems use different local codes, labels, and
interface terminologies. Some differences are substantive; others are merely
coordinate choices. An executable normative system is anomalous when a purely
bijective local relabeling changes its disposition, obstruction certificate,
or required repair.

## Local gauge

For each vertex `v` in a transport network, a gauge provides mutually inverse
maps:

```text
g_v : Label_v -> Label'_v
g_v^-1 : Label'_v -> Label_v
```

An edge transport `T_uv` transforms by conjugation:

```text
T'_uv = g_v . T_uv . g_u^-1
```

An assignment transforms pointwise as `s'(v) = g_v(s(v))`. Lean proves that
`s` is a global section of `T` exactly when `s'` is a global section of `T'`.
The loop holonomy transforms by conjugation at its base vertex, so existence of
a fixed point and forced abstention are gauge invariant.

## Executable Boolean model

The executable model inherits the triangle ABI from Normative Holonomy v0.9:

```text
[declaredMask, boundMask, mapAB, mapBC, mapCA]
```

Each local Boolean gauge is one bit; there are `2^3 = 8` gauges. A transformed
edge map is computed exactly from the source and target gauge bits. For every
input, the kernel evaluates the complete orbit and returns:

- the inherited v0.9 result;
- the lexicographically minimal map-triple representative of the orbit;
- the exact orbit cardinality;
- an anomaly mask for disposition/certificate drift;
- an anomaly mask for repair-cut drift;
- an anomaly mask for canonical-certificate drift.

The low three bits remain the disposition. Code `6` is reserved for
`REFUSE_GAUGE_ANOMALY`. A valid v1.0 kernel must never emit code `6` for the
canonical implementation, while coordinate-sensitive mutants must do so on at
least one state.

## Gauge anomaly

For analyzer `A`, transport `T`, and gauge `g`:

```text
Anomaly(A,T,g) := A(g . T . g^-1) != A(T)
```

This is a metamorphic property: no external clinical label is needed to test
it. The test oracle follows from the declared symmetry itself. The deliberate
mutants inspect raw map codes, raw endpoints, or coordinate ordering. Their
detection demonstrates that a green invariant kernel is not a vacuous test.

## Scientific boundary

Gauge invariance can rule out dependence on arbitrary representation. It
cannot prove that an asserted mapping preserves meaning, that a source is
authoritative, or that a real-world recommendation is justified. A perfectly
gauge-invariant system can still be clinically wrong. Those boundaries remain
outside v1.0 and force `REFUSE`.

## Falsification contract

The executable suite is not considered adequate merely because the canonical
implementation is invariant. Six coordinate-sensitive mutants inspect raw
edge codes, raw map triples, a selected endpoint, or a coordinate-dependent
assignment. Every mutant must have a minimal counterexample in the complete
finite domain. Suppressing a mutant result invalidates the receipt.

Native and WASM agreement is assessed through a five-field transcript for all
4,096 states. This establishes exact result parity for the declared ABI, not a
mechanized semantics of the emitted machine code or WebAssembly bytes.
