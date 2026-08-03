# Darwin Normative Hermeticity v0.8

This package studies a narrow reproducibility failure: an executable artifact
can retain exactly the same bytes and SHA-256 while an unversioned external
reference resolves to different semantic content at review and execution time.
Cryptographic identity still proves byte identity; it does not close mutable
referents that were omitted from the receipt.

The candidate contribution is deliberately bounded:

1. separate syntactic receipt identity from reference-resolution regimes;
2. define normative hermeticity as invariance to every unbound resolution;
3. prove that equal closed views force equal execution outcomes;
4. prove zero-error abstention when indistinguishable regimes require
   different normative labels;
5. certify a minimal hermetic basis, binding deficit, and semantic fragility
   cut.

The executable never returns a normative label. It classifies only whether the
declared reference graph is sufficient and content-bound for the supplied
abstract regime family.

| Code | Disposition | Certificate mask |
| ---: | --- | --- |
| 0 | `REFUSE` | Invalid ABI, including a bound reference that was not declared. |
| 1 | `HERMETIC` | Cardinality-minimal subset of already bound references that identifies the label. |
| 2 | `BIND_REFERENCES` | Cardinality-minimal declared-but-unbound subset needed to identify the label. |
| 3 | `ABSTAIN_OPEN_SEMANTICS` | Even every declared semantic dependency fails to identify the label. |
| 4 | `REFUSE_INTERNAL_INCONSISTENCY` | Defensive state: declared references identify but no binding witness exists. |

## Bounded Kernel

- three admissible resolver regimes;
- three binary semantic dependencies;
- two uninterpreted normative labels;
- declared and content-bound reference masks;
- exact search over all eight dependency subsets;
- no patient data, clinical semantics, reference resolution, or normative
  label output.

## Verification

```bash
node scripts/verify-normative-hermeticity-v0.8.mjs --runtime-only
node scripts/verify-normative-hermeticity-v0.8.mjs
```

The complete verifier binds the parent research receipt, source-fresh compiler,
Lean audit, Sounio source, native executable, WASM, exact transcript, evidence,
and every document in this package.

## Boundary

- `clinicalDisposition=REFUSE`
- `clinicalUseAllowed=false`
- `productionAuthorized=false`
- `noveltyEstablished=false`
- `signed=false`
