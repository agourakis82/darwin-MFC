# Darwin Normative Holonomy v0.9

This package tests a narrow research hypothesis: locally certified normative
translations can compose into a cycle that has no globally coherent witness.
When that happens, an executable system with a zero-error emission contract
must abstain rather than silently select a label.

The package contains:

- a finite triangle model and explicit claim boundary;
- an axiom-audited Lean countermodel;
- a Sounio kernel with a fixed integer ABI and no string or IO boundary;
- an independent JavaScript oracle over the complete bounded domain;
- deterministic native/WASM parity evidence and a content-addressed receipt.

## Status

This is abstract research. It does not encode patients, diseases, drugs,
utilities, legal authority, or clinical thresholds.

- `clinicalDisposition=REFUSE`
- `clinicalUseAllowed=false`
- `productionAuthorized=false`
- `noveltyEstablished=false`
- `signed=false`

The receipt can establish the behavior of the declared finite model. It cannot
establish scientific novelty, empirical validity, regulatory authorization, or
correctness of any future real-world translation.

## Dispositions

| Code | Disposition | Meaning |
| ---: | --- | --- |
| 0 | `REFUSE` | Invalid ABI or integrity boundary |
| 1 | `GLOBALLY_FLAT` | A global section exists and the bound edges contain a minimal basis |
| 2 | `BIND_TRANSLATIONS` | A global section exists, but additional declared translations must be bound |
| 3 | `ABSTAIN_NONTRIVIAL_HOLONOMY` | Every declared edge is locally bijective and the cycle has no global section |
| 4 | `REVIEW_LOCAL_PROOF` | At least one declared edge is not bijective |
| 5 | `REFUSE_INTERNAL_INCONSISTENCY` | Defensive unreachable state |

No disposition contains or returns a clinical label.

## Verification

The final gate is intentionally fail-closed:

```bash
node scripts/verify-normative-holonomy-gate.mjs
```

The verifier covers all 4,096 canonical ABI states, a 21,600-state hostile
domain, representative vectors, artifact hashes, Lean build evidence, and
native/WASM self-check parity.
