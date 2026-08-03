# Darwin No Hidden Gauge Fixing v1.1

This research milestone asks a narrower question than medication selection:

> When can a system emit one normative witness without hiding an arbitrary
> coordinate choice?

The candidate answer is a proof obligation. If an input has a non-trivial
stabilizer and that stabilizer moves every admissible output, no deterministic
equivariant selector exists. The system must abstain until an external,
content-addressed observation removes the obstruction. A seed, lexical order,
raw encoding, or implementation accident is not such an observation.

The milestone contains:

- a general stabilizer obstruction proved in Lean;
- a minimal Boolean countermodel and a triangle transport instance;
- a standalone Sounio kernel that enumerates stabilizers and computes a
  minimum additional anchor mask;
- an independent JavaScript oracle over the complete finite domain;
- hidden-choice mutants with machine-checkable counterexamples;
- source-fresh native/WASM parity and a fail-closed receipt.

## Scientific boundary

This is an abstract result about deterministic choice under symmetry. It does
not identify a treatment, validate a dose, establish clinical benefit, or
authorize production use. Every receipt in this directory must retain:

```text
clinicalDisposition=REFUSE
clinicalUseAllowed=false
productionAuthorized=false
noveltyEstablished=false
signed=false
```

The mathematical ingredients have prior art. The research candidate is the
joint architecture in which a singular output is forbidden unless a verifiable
external observation can be shown to destroy the exact stabilizer that caused
the obstruction. Novelty remains an open, separately reviewed claim.
