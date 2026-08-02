# Source-Fresh Semantic Closure v0.4

This milestone closes the executable research chain for the bounded deontic
transportability witness. It does not authorize clinical use.

## Compiler identity

- Sounio commit: `32bf57e880d5a0bc64d39edff98491a6c7c6101d`
- Git tree: `3560e7e17d931d12244c3232869faf010019c962`
- Fixed-point seed SHA-256: `f330d61264b35665d90ce9cc55f8fdde6c3e2229cdd3a9902d22afa9fc9a21da`
- Madaros SHA-256: `b5208b7a82bf5a369d1188858a3ab57ceba3bdd83cceb28f30cc90f05b94322d`
- Two clean builds were byte-identical, emitted valid version JSON, and used
  strict pinned-seed mode with no automatic fallback.
- The canonical fixed-point gate, three-stage fixed-point gate, bootstrap S1-S8
  gate, diagnostic refusal gate, and `ItemKind` 27/27 dispatch gate passed.

## Executable witness

- Sounio source SHA-256: `e7431ff3900d9ec056140155a54fae97ea6aeab76ee496ff05324346a9ec4b78`
- WASM SHA-256: `f3acb60e5569e87f9117a1a0b444b0e8a0513b465a14f482689391411bda3216`
- Native SHA-256: `0a4c2489960b4ce0bedbe5627ae18881177cfd6b8c36c809346f807851b3f7dd`
- Both compiler builds reproduced the same native and WASM artifacts.
- Native and WASM self-checks returned `87`.
- The JavaScript oracle checked all 589,824 packed ABI states representing
  87,381 canonical families of length zero through eight.
- Active masks outside `0..3` were refused and inactive padding was shown not
  to affect the result.
- Lean proves the bounded ABI refines the finite-list semantics. The audit
  reports no project-declared axioms; the affected proofs depend only on
  standard Lean `propext` and, for oversized-list rejection, `Quot.sound`.

## Export boundary

The source-fresh backend exports the executable API plus the independent
reference and exhaustive-audit functions. This surface is recorded exactly by
the verifier. It is a research ABI, not a minimized production ABI.

## Mandatory refusal boundary

`compilerReconciled=true` means that compiler source, seed, binaries, and
executed artifacts agree. It does not establish clinical validity, novelty,
regulatory authorization, or a production signature. Therefore
`clinicalDisposition=REFUSE`, `clinicalUseAllowed=false`,
`productionAuthorized=false`, `noveltyEstablished=false`, and `signed=false`
remain mandatory.
