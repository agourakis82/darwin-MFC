# Darwin Normative Holonomy v0.9 closure

Closed on 2026-08-03 as abstract research only.

## What closed

- Lean 4.30.0-rc2 proved that a triangle has a global section exactly when its
  holonomy has a fixed point.
- Lean constructed a Boolean triangle whose three maps are locally bijective
  but whose odd-flip holonomy has no fixed point and therefore no global
  section.
- The zero-error and seeded zero-error abstention theorems compile without
  axioms, `sorry`, `native_decide`, project axioms, or unsafe declarations.
- The source-fresh Sounio compiler at commit
  `32bf57e880d5a0bc64d39edff98491a6c7c6101d` produced two byte-identical WASM
  artifacts, two byte-identical canonical native artifacts, and two
  byte-identical transcript-native artifacts.
- Both canonical native executions returned self-check code `109`; WASM
  returned `109` with zero imports.
- The independent JavaScript oracle checked all 4,096 canonical states and all
  21,600 hostile states with zero result, repair-cut, or internal-reference
  mismatches.
- The native and WASM result transcripts matched exactly across 4,096 records,
  41,854 bytes, and SHA-256
  `a35da0bc331d5e9a72df86749cd68a1099574745654b3c45bcb5599d5a131c87`.
- The canonical census contains 32 `ABSTAIN_NONTRIVIAL_HOLONOMY` states and
  zero `REFUSE_INTERNAL_INCONSISTENCY` states.

## What did not close

- The Lean model is not a mechanized semantics of the emitted WASM bytes.
- Parity covers the externally meaningful `analyze` and `repair_cut` results;
  every internal helper export was not compared individually.
- The finite Boolean triangle does not establish correctness of any real
  terminology, guideline, value, authority, or clinical translation.
- The prior-art probes are not a systematic review, legal novelty opinion, or
  proof of scientific priority.
- No empirical, clinical, regulatory, or production validation was performed.
- No artifact or receipt is signed.

## Mandatory boundary

- `clinicalDisposition=REFUSE`
- `clinicalUseAllowed=false`
- `productionAuthorized=false`
- `noveltyEstablished=false`
- `signed=false`
