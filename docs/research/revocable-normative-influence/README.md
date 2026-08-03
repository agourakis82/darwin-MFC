# Darwin Revocable Normative Influence v0.7

This package studies what must happen to a derived decision when evidence that
was legitimately observed later loses authority. It distinguishes data
retention from normative influence: retaining a source for audit does not
permit a post-revocation decision procedure to continue using it.

The candidate contribution is deliberately narrow:

1. model prior and current authority as separate snapshots;
2. sanitize retained memory to the current legitimate view;
3. prove that equal current views force equal post-revocation outcomes;
4. prove zero-error abstention when those views require different outcomes;
5. certify bounded survival support, residual restore, and revocation cuts.

The executable never returns a recommendation. It classifies only whether the
recommendation remains identifiable after authority narrows.

| Code | Disposition | Certificate mask |
| ---: | --- | --- |
| 0 | `REFUSE` | Invalid ABI or non-monotone authority transition. |
| 1 | `SURVIVES_REDERIVED` | Cardinality-minimal subset of current authority that still identifies. |
| 2 | `ABSTAIN_RESIDUAL_INFLUENCE` | Cardinality-minimal revoked subset whose restoration would recover identification. |
| 3 | `REFUSE_PRIOR_UNIDENTIFIED` | The prior authority never identified a recommendation. |
| 4 | `REFUSE_INTERNAL_INCONSISTENCY` | Defensive state: prior identifies but no revoked restore exists. |

## Bounded Kernel

- three admissible worlds;
- three binary queries;
- two uninterpreted recommendation symbols;
- prior and current authority masks, with current required to be a subset of
  prior;
- exact search over all eight query subsets;
- no clinical semantics and no recommendation output.

## Verification

```bash
node scripts/verify-revocable-influence-v0.7.mjs --runtime-only
node scripts/verify-revocable-influence-v0.7.mjs
```

The first command verifies the executable before evidence and receipt JSONs are
frozen. The second verifies the complete artifact graph.

The closed bounded run covers 6,400,000 hostile host states. Exact native/WASM
parity is witnessed by a 262,144-record transcript containing every canonical
`index|certificate|cut` result, compared by record count, byte count, and
SHA-256.

## Boundary

- `clinicalDisposition=REFUSE`
- `clinicalUseAllowed=false`
- `productionAuthorized=false`
- `noveltyEstablished=false`
- `signed=false`
