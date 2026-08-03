# Normative Hermeticity

## Research Question

Suppose source code, executable, evidence, compiler, and receipt are all
content-addressed. Can a normative result nevertheless change because the
artifact names a semantic dependency without fixing the version and resolved
content actually used at runtime?

The v0.8 hypothesis is:

> Byte-level integrity is necessary but insufficient for normative
> reproducibility. A result is normatively hermetic only when it is invariant
> to every admissible resolution of every semantic reference left outside the
> receipt closure.

This does not identify a SHA-256 weakness. The same artifact bytes contain the
same mutable locator in both runs; a resolver supplies different content behind
that locator.

## Model

Let:

- `A` be the byte-identical executable knowledge artifact;
- `H(A)` be its cryptographic receipt identity;
- `D` be the declared semantic dependencies;
- `B` be the subset whose exact resolved content is bound into the receipt;
- `rho` be an admissible reference-resolution regime;
- `rho|B` be the values of bound dependencies in that regime;
- `L(rho)` be an uninterpreted required normative label; and
- `F(H(A), rho|B)` be a post-verification execution outcome.

The artifact is normatively hermetic over an admissible regime family when
equal receipt identities force equal outcomes:

```text
for every rho0, rho1:
  admissible(rho0) and admissible(rho1)
  and receipt(rho0) = receipt(rho1)
  implies F(receipt(rho0), rho0|B) = F(receipt(rho1), rho1|B).
```

A closed receipt additionally guarantees that equal receipt identities imply
equal bound views. The execution path receives only the receipt and that bound
view. Unbound resolver state is not a hidden runtime input.

## Hash-Identity Countermodel

The Lean artifact constructs two admissible regimes with:

1. exactly the same abstract byte count and digest;
2. the same empty bound semantic view;
3. different resolutions of one declared reference; and
4. different required normative labels.

Thus receipt identity alone cannot identify a label when the decision-relevant
referent is outside the closure. The countermodel is existential and abstract;
it does not assert that every mutable reference changes a result.

## No Unbound Influence

`closedEngineNoUnboundInfluence` proves that any engine consuming only a closed
receipt and its bound view has equal outcomes in equal-receipt regimes. This is
a semantic noninterference statement scoped to the declared model.

It is intentionally weaker than ontology equivalence. Two ontology versions
may differ substantially yet remain equivalent for one bounded normative
output. Conversely, a small mapping change can be normatively relevant even if
most ontology queries are unchanged.

## Forced Abstention

Assume two admissible resolver regimes:

1. carry equal receipts;
2. are equal on every receipt-bound dependency;
3. require different labels;
4. are evaluated by a zero-error engine; and
5. cannot return `REFUSE` after integrity validation.

Normative hermeticity forces the same outcome in both regimes. Zero-error
soundness excludes a shared emitted label, and non-refusal excludes `REFUSE`.
The remaining outcome is `ABSTAIN`.

The seeded theorem is pointwise in every random seed. Average-risk, Bayesian,
PAC, and noisy-resolution guarantees are outside v0.8.

## Three Certificates

For a finite semantic dependency universe, v0.8 distinguishes:

- **hermetic basis**: a minimal subset of already bound references that still
  identifies every pair of regimes requiring different labels;
- **binding deficit**: a minimal declared-but-unbound subset whose exact
  binding would recover identification; and
- **semantic fragility cut**: a minimal subset of the declared dependency
  universe whose removal destroys identification.

These are mathematical dependency witnesses. They do not resolve, approve,
update, or grant authority to a terminology or knowledge artifact.

## Standards Anchor

FHIR canonical references may omit a version. The specification notes that a
server may then select a current version and that the selection algorithm can
be unknown. FHIR also states that a code-system version may be required when
concept permanence is not guaranteed. CQL guidance requires a version when an
artifact becomes active, and FHIR `ConceptMap` explicitly models mappings whose
equivalence depends on additional context.

These standards already recognize version and context dependencies. v0.8 does
not claim that insight. It asks for a decision-scoped impossibility theorem and
minimal closure witnesses when such dependencies remain open.

## Falsifiability

The artifact fails if:

- equal closed receipt views can yield different engine outcomes;
- the concrete equal-receipt countermodel cannot be constructed;
- a zero-error engine emits in the ambiguous countermodel;
- a bound reference is accepted outside the declared dependency mask;
- a hermetic basis does not identify or is not minimal;
- a binding deficit includes an already bound or undeclared dependency;
- a fragility cut does not destroy identification or is not minimal;
- native and WASM results differ;
- WASM differs from the independent host oracle; or
- mutation of a linked parent, compiler, source, executable, evidence record,
  or refusal boundary is accepted.

## Limits

- The executable domain is tiny, binary, and exact.
- Admissible resolver regimes and required labels are supplied facts.
- Cryptographic collision resistance is assumed rather than formalized.
- Network races, signatures, terminology licensing, and resolver trust are not
  mechanized.
- The model proves conditional reproducibility, not clinical correctness.
- Scientific novelty, clinical validity, regulation, and production readiness
  remain unestablished.
