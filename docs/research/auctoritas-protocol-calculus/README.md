# Darwin Auctoritas Protocol Calculus v0.6

This package studies authority-constrained adaptive inquiry. It extends the
pairwise Auctoritas v0.5 witness with well-founded answer-dependent protocols,
seed-indexed zero-error strategies, static role coalitions, and a bounded
minimum authority-expansion certificate.

The scientific distinction is deliberate:

- a query can be informative but unauthorized;
- a query can be authorized but insufficient;
- every declared query can be insufficient;
- soundness can therefore force abstention even after adaptive inquiry;
- an expansion certificate states the smallest additional query capability
  that separates every world pair requiring different recommendations.

The executable never returns a recommendation. It returns only:

| Code | Disposition | Meaning |
| ---: | --- | --- |
| 0 | `REFUSE` | Invalid ABI or integrity state. |
| 1 | `IDENTIFIED` | Current authority already separates all conflicting world pairs. |
| 2 | `EXPAND_AUTHORITY` | A cardinality-minimal additional query mask is certified. |
| 4 | `ABSTAIN_QUERY_UNIVERSE` | Even the complete declared query universe cannot separate a conflicting pair. |

## Bounded kernel

- three admissible worlds;
- three binary queries;
- two uninterpreted recommendation symbols;
- 32,768 canonical states checked inside native and WASM builds;
- 640,000 bounded valid and malformed ABI states checked by the host oracle.

The bounded search is an exact finite optimization, not a scalable solver for
the general minimum test-set problem.

## Verification

```bash
node scripts/verify-auctoritas-protocol-v0.6.mjs
```

## Boundary

- `clinicalDisposition=REFUSE`
- `clinicalUseAllowed=false`
- `productionAuthorized=false`
- `noveltyEstablished=false`
- `signed=false`
