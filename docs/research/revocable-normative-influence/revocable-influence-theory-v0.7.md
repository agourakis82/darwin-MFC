# Revocable Normative Influence

## Research Question

Suppose a decision was derived while a set of observations was legitimately
available. Later, a source is retracted, superseded, expired, or otherwise
loses authority. Under what conditions may the decision survive?

The v0.7 answer is deliberately stronger than provenance display:

> A result survives only when it can be rederived from the current legitimate
> view and is invariant to every retained observation whose authority was
> revoked.

This is not a claim that stored data was deleted or forgotten. Historical
evidence may remain in an audit store. It must not remain an undeclared input
to the post-revocation decision engine.

## Trace Model

The formal model contains:

- admissible worlds;
- query answers and required recommendation symbols;
- a prior authority snapshot;
- a current authority snapshot that is a subset of the prior snapshot;
- retained memory containing the prior legitimate view;
- a sanitizer that projects retained memory onto current authority;
- an arbitrary deterministic decision engine consuming the canonical current
  legitimate view.

The decision path receives `currentView` directly. The separate Lean theorem
`sanitizedRetainedHistoryEqualsPostRevocationRun` proves that sanitizing the
retained prior view is extensionally equivalent. Keeping this compatibility
lemma outside the central path makes it impossible for retained history to
become an undeclared runtime input.

The current view is maximal: it contains every answer the role could
legitimately obtain now. Therefore it also subsumes any finite adaptive inquiry
restricted to current authority.

## No Residual Influence

Two worlds are currently indistinguishable when their current legitimate views
are equal. The post-revocation engine therefore receives equal canonical inputs
in those worlds, even when the retained historical memories differ.

The Lean theorem `sanitizedEngineNoResidualInfluence` proves that every engine
fed by this projection has equal outcomes on currently indistinguishable
worlds. A concrete leaky engine demonstrates that an engine given retained
history can preserve influence from observations that are no longer authorized.

## Forced Abstention After Revocation

Assume two admissible worlds:

1. have the same current legitimate view;
2. require different recommendation symbols;
3. are evaluated by a post-revocation zero-error engine;
4. cannot return `REFUSE` after passing integrity checks.

No residual influence forces equal outcomes. Zero-error soundness rules out a
shared emitted recommendation, and non-refusal rules out `REFUSE`. The only
remaining result is `ABSTAIN`.

The result is seed-wise for randomized strategies only when soundness and
non-refusal hold for every seed. Average-risk, Bayesian, PAC, or noisy-answer
guarantees are outside this artifact.

## Three Certificates

For a finite query universe, v0.7 distinguishes:

- **survival basis**: a minimal subset of current authority that still
  identifies every pair of worlds requiring different recommendations;
- **residual restore**: when current authority fails, a minimal subset of the
  revoked authority whose restoration would recover identification;
- **revocation cut**: a minimal subset of prior authority whose removal would
  destroy identification.

These certificates describe mathematical dependency. They do not restore,
revoke, or grant real authority.

## Bounded Executable

The Sounio kernel uses three worlds, three binary queries, and two
recommendation symbols. It exhaustively searches all eight subsets, ranking by
cardinality and then numeric mask. Native and WASM run the same internal
canonical-domain check; an independent JavaScript oracle additionally checks
malformed boundary values.

The internal domain contains 262,144 states. The host verifier checks 6,400,000
states over malformed boundary masks and recommendation symbols, including
110,592 valid monotone transitions, plus 32,768 distinct revocation-cut states.
For cross-backend parity, a deterministically generated native harness emits
every canonical `index|certificate|cut` tuple. The verifier independently emits
the same transcript from WASM and requires equal SHA-256, byte count, and all
262,144 records.

No recommendation crosses the ABI. TypeScript performs no certificate
mathematics in the product and this research artifact is not connected to the
clinical interface.

## Falsifiability

The artifact fails if:

- current authority is accepted when it is not a subset of prior authority;
- sanitization leaves a revoked observation in decision memory;
- equal current legitimate views yield different sanitized outcomes;
- a zero-error post-revocation engine emits on an ambiguous pair;
- a survival basis does not identify or is not minimal;
- a residual restore uses a non-revoked query or is not minimal;
- a revocation cut does not destroy identification or is not minimal;
- native and WASM self-checks diverge;
- any bounded WASM result differs from the independent host oracle;
- a linked source, parent receipt, compiler, executable, or evidence hash is
  altered without rejection.

## Limits

- The executable domain is deliberately tiny and exact.
- Authority snapshots are supplied facts, not validated law or ethics.
- Revocation is monotone; new grants, delegation, and expiry intervals are not
  modeled in the executable.
- The model has deterministic binary answers and no missingness.
- The Lean theorem establishes a conditional formal result, not empirical or
  clinical validity.
- Novelty, safety, utility, regulation, and production readiness remain
  unestablished.
