# No Hidden Gauge Fixing v1.1 closure

## Closed result

The milestone establishes a proof and a finite executable countermodel for the
following statement:

> An equivariant deterministic selector must return an output fixed by every
> symmetry that stabilizes its input. If a stabilizer element moves every
> admissible output, a deterministic equivariant admissible selector cannot be
> emitted.

The general stabilizer theorem and the Boolean countermodel compile in Lean
4.30.0-rc2. The core theorem is axiom-free; the finite negation proofs use only
`propext`. There are no `sorry`, `native_decide`, project axioms, or `unsafe`
declarations.

For the identity Boolean triangle, both `000` and `111` are global sections.
The diagonal flip preserves every transport pointwise and exchanges the two
sections. Any one-label deterministic choice therefore fixes a hidden gauge.
An observed value at any one vertex excludes that diagonal flip.

## Executable evidence

The canonical Sounio kernel:

- has 26 Sounio functions and 27 WASM exports including memory;
- has zero imports, zero IO effects, and zero singular-witness exports;
- enumerates the exact residual stabilizer in `C2^3`;
- counts admissible assignments without selecting one;
- computes the minimum additional anchor mask in cardinality/rank order;
- returns only `REFUSE`, `REVIEW`, `ABSTAIN`, or
  `NO_STABILIZER_OBSTRUCTION` dispositions.

The complete bounded verification covers:

| Check | Count | Mismatches |
|---|---:|---:|
| Canonical states | 4,096 | 0 |
| Gauge transformations | 32,768 | 0 |
| Edge transformations | 1,536 | 0 |
| Group compositions | 4,096 | 0 |
| Stabilizer subgroup checks | 23,912 | 0 |
| Minimum-anchor checks | 9,688 | 0 |
| Obstructed fixed-point checks | 12,520 | 0 |
| Hostile ABI states | 21,600 | 0 |

The canonical disposition census is 716 states with no stabilizer obstruction,
980 with a stabilizer obstruction, 2,368 requiring local-proof review, and 32
with no global section. “No stabilizer obstruction” is not authorization and
does not imply a unique or justified output.

Four adversarial selectors were compiled into a separate test-only artifact:
minimum encoding, maximum encoding, fixed-seed cyclic order, and raw-map-code
order. All four were killed over the complete domain with independent
JavaScript counterexamples. No adversarial selector is present in the canonical
WASM.

## Source freshness and parity

The canonical, adversarial, and transcript sources were compiled twice with the
reconciled Madaros v0.80.0 compiler at Sounio commit
`32bf57e880d5a0bc64d39edff98491a6c7c6101d`. Every native and WASM pair was bit
identical.

The native and WASM canonical transcripts each contain 4,096 records and 86,106
bytes with SHA-256:

```text
182e55cd9ef202b2e5ab6153fbcd7d95a1699b4e9fd2111f824135619acf0a82
```

Native and WASM self-checks return `111`; the isolated adversarial artifacts
return `112`.

## Deliberate open boundary

v1.1 computes a minimum *vertex support* whose observation would remove the
finite stabilizer. It does not yet encode the observed value, the observation
procedure, epistemic reliability, content-addressed provenance, temporal
validity, or authorization scope. Those are required before any later singular
output could carry an external gauge-fixing receipt.

The Sounio executable semantics and emitted WASM byte semantics are not
mechanized. Internal helper parity beyond the canonical transcript is not
claimed. Scientific novelty, priority, real-world normative correctness,
clinical validity, regulatory acceptability, and production safety remain
unestablished.

## Safety state

```text
clinicalDisposition=REFUSE
clinicalUseAllowed=false
productionAuthorized=false
noveltyEstablished=false
signed=false
```
