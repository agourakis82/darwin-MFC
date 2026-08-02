# Auctoritas Protocol Calculus v0.6 Closure

## Established in this bounded artifact

- Lean proves `adaptiveNoEscape` without axioms for well-founded answer-dependent
  protocols.
- Lean proves `adaptiveZeroErrorForcesAbstention` and its seed-wise zero-error
  extension without axioms.
- Lean proves the same no-escape property for static coalitions without axioms.
- Lean specifies inclusion-minimal authority-expansion certificates.
- The Sounio kernel computes an exact cardinality-minimal expansion for three
  worlds and three binary queries, with deterministic tie-breaking.
- Native and WASM artifacts are deterministic and each checks all 32,768
  canonical states against the independent Sounio search oracle.
- The host verifier checks 640,000 bounded ABI states, including 607,232
  malformed states that must return `REFUSE`.
- Every valid certificate is checked for sufficiency, disjointness from current
  authority, minimum cardinality, and deterministic tie-breaking.
- The executable never emits a recommendation or grants authority.

## Not established

- novelty or absence of academic or patent prior art;
- scalability beyond the bounded exact-search domain;
- a new complexity result for minimum query/test-set optimization;
- average-error, Bayesian, PAC, or noisy-observation guarantees;
- dynamic delegation, revocation, strategic agents, or side-channel security;
- correctness or legitimacy of a real authority policy or query ontology;
- clinical validity, utility, safety, regulatory status, or deployment
  authorization;
- production signature or clinical integration.

## Mandatory boundary

- `clinicalDisposition=REFUSE`
- `clinicalUseAllowed=false`
- `productionAuthorized=false`
- `noveltyEstablished=false`
- `signed=false`

`compilerReconciled=true` refers only to the linked source-fresh Sounio
compiler. `EXPAND_AUTHORITY` is a mathematical missing-capability certificate,
not permission to grant that capability.
