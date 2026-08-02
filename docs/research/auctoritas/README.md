# Darwin Auctoritas v0.5

Darwin Auctoritas is an abstract, research-only package for studying
authority-constrained identifiability. It asks whether a recommendation can be
identified from every query that a role is legitimately allowed to make.

The package deliberately separates:

- an abstract impossibility theorem and a forced-abstention theorem in Lean;
- a bounded two-world, two-query witness in Sounio/WASM;
- an exhaustive host oracle over the complete bounded ABI domain;
- content-addressed evidence and a fail-closed receipt.

The executable returns only identifiability dispositions. It does not choose an
action, calculate a dose, diagnose, prescribe, or authorize clinical use.

## Dispositions

| Code | Disposition | Meaning |
| ---: | --- | --- |
| 0 | `REFUSE` | The ABI contract or artifact integrity is invalid. |
| 1 | `IDENTIFIED` | The two admissible worlds agree on the recommendation, or an already observed legitimate query distinguishes them. |
| 2 | `ASK` | An authorized, not-yet-observed query distinguishes the worlds. |
| 3 | `DELEGATE` | Distinguishing information exists only outside the current authority boundary. |
| 4 | `ABSTAIN_AUTHORITY` | Recommendations differ, but all declared query answers are identical. |

`ABSTAIN_AUTHORITY` is relative to the declared query universe. It is not a
claim that no physically or logically possible query exists.

## Verification

The final gate is run from the repository root:

```bash
node scripts/verify-auctoritas-v0.5.mjs
```

Lean and Sounio compiler identities are recorded in the receipt rather than
silently inferred from the host environment.

## Boundary

- `clinicalDisposition=REFUSE`
- `clinicalUseAllowed=false`
- `productionAuthorized=false`
- `noveltyEstablished=false`
- `signed=false`
