# Deontic source-fresh semantic closure v0.4

Date: 2026-08-02  
Status: abstract research only  
Clinical disposition: **REFUSE**  
Production authorization: **false**

## What closed

- The public Sounio branch has an exact commit and tree over `origin/main`.
- A detached clean checkout rebuilt Madaros twice from the same fixed-point
  seed; both compiler artifacts are bit-identical.
- The seed self-reproduces across three stages and passes the canonical
  compiler gate.
- Bootstrap stages S1-S8 pass, including portable peak-RSS measurement.
- Compiler builds fail closed on emitted `error:` diagnostics, and the clean
  builds emitted none.
- `--version-json` parses and matches the six expected identity fields.
- The public `--backend wasm` path emits a validating, zero-import module.
- Independent native and WASM builds of the v0.4 kernel are deterministic and
  both execute self-check code `87`.
- Node exhaustively checks all 87,381 valid families of length zero through
  eight, all 16 binary-mask pairs, and 438 invalid-input rejection cases.
- Lean proves that the integer-mask ABI refines the abstract finite-family
  semantics for every family with at most eight contexts.

The resulting source identity is `compilerReconciled=true`. This statement is
about compiler provenance and reproducibility only.

## Trust boundary

- The central Lean refinement theorem depends on the standard Lean axiom
  `propext`; oversized-list rejection also reports `Quot.sound`.
- The Lean sources contain no `sorry` and no `native_decide`.
- The executable proof is complete only for the declared bounded mask domain.
- The kernel receives already-contextualized abstract decisions. It does not
  establish that real-world evidence, utilities, or contexts were encoded
  correctly.
- The current WASM backend closes acyclic forward branches used by this kernel;
  loop-bearing control flow remains unsupported and must fail closed.
- No compiler, receipt, model, or clinical artifact is signed.
- No empirical validation, novelty determination, regulatory authorization, or
  clinical evaluation was performed in this milestone.

Therefore `clinicalDisposition=REFUSE`, `productionAuthorized=false`, and
`noveltyEstablished=false` remain mandatory despite source-fresh compiler
reconciliation and exact native/WASM parity.
