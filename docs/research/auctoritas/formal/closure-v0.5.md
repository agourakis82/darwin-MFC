# Auctoritas v0.5 Closure

## Established in this bounded artifact

- Lean proves the abstract `noLegitimateQuery` theorem without axioms.
- Lean proves `soundnessForcesAbstention` without axioms: any sound partial
  identifier must return `None` on the indistinguishable counterexample pair.
- Lean proves a negative local-authority witness and a positive joint-authority
  control; their standard Lean extensionality axioms are disclosed in evidence.
- Sounio native and WASM artifacts are deterministic across two builds.
- Each backend returns `95` only after checking all 1,024 canonical encoded
  states against the Sounio reference classifier.
- The host verifier checks 147,456 bounded ABI states, including 576 valid
  states and 146,880 malformed states that must return `REFUSE`.
- The executable emits an identifiability disposition, never a recommendation.

## Not established

- completeness of the declared query universe;
- legitimacy of any real authority policy;
- clinical validity, utility, safety, or authorization;
- production readiness or a cryptographic signature;
- scientific novelty or absence of prior art;
- equivalence for unbounded worlds, queries, protocols, or adversaries.

## Mandatory boundary

- `clinicalDisposition=REFUSE`
- `clinicalUseAllowed=false`
- `productionAuthorized=false`
- `noveltyEstablished=false`
- `signed=false`

`compilerReconciled=true` refers only to the source-fresh Sounio compiler
identity inherited through the linked v0.4 compiler receipt. It does not promote
this abstract witness into a clinical system.
