# Deontic finite-family WASM closure v0.3

Date: 2026-08-02  
Status: abstract research only  
Clinical disposition: **REFUSE**  
Production authorization: **false**

## What closed

- The public `souc build --backend wasm` path emitted a real WebAssembly module.
- The module validates and instantiates in Node.js with zero imports.
- The no-IO Sounio ABI exposes bounded union, intersection, classification, and case evaluation.
- All four finite-family vectors and both invalid-count guards execute exactly.
- The same Sounio source compiled to native ELF and WASM returns self-check code `87` in both runtimes.
- Repeated native and WASM builds are bit-identical.
- A source-derived lean compiler seed reached a three-stage fixed point and passed the canonical compiler gate.
- The modular compiler rebuilt from the fixed-point seed is bit-identical to the preceding source-derived build.

## What remains open

- The Sounio backend patch lives in an isolated dirty worktree and is not a committed source identity.
- The modular compiler build still emits `error:` diagnostics while returning exit code zero.
- `--version-json` emitted malformed JSON in this run.
- The bootstrap-chain gate completed S1-S5, then aborted because `/usr/bin/time` is absent; S6-S8 have no verdict.
- No compiler receipt or artifact is signed.

Therefore `nativeWasmParityEstablished=true` applies only to the bounded abstract kernel and captured vectors. `compilerReconciled=false`, `clinicalDisposition=REFUSE`, and `productionAuthorized=false` remain mandatory.
