# No Hidden Gauge Fixing v1.2 closure

## Closed result

v1.2 closes the five engineering and research tasks that were deliberately open
after v1.1:

1. a value-carrying observation receipt exists and fails closed;
2. the abstract Lean model refines the declared Sounio ABI fixture;
3. the executable benchmark extends beyond the Boolean triangle;
4. an independent-language implementation and blinded package reproduce the
   declared finite results;
5. a dated prior-art search maps every candidate claim to close work.

This closure is about an abstract finite model. It does not authorize clinical
inference.

## Value-carrying observation

The synthetic receipt binds the observed Boolean value at vertex A to:

- exact source bytes and locator;
- subject, context, purpose, and scope hashes;
- integer reliability in basis points;
- observed, valid-from, and expiry times;
- signer credential and Ed25519 fixture identity;
- a signed revocation registry and epoch;
- the six-field ABI and Sounio kernel-source hash.

The verifier accepts the fixture and refuses nine negative cases: unsigned
value tampering, unsigned provenance tampering, signature tampering, low
reliability, expiry, scope mismatch, subject mismatch, signed revocation, and
source-content tampering. Invalid receipts make zero kernel calls. Canonical
JSON rejects floating-point values.

The trust roots are deterministic public test fixtures and have
`productionTrustEligible=false`. No external clinical observation has been
established.

## Lean-Sounio refinement

Lean 4.30.0-rc2 proves that:

- an observed value restricts admissible assignments;
- the diagonal flip cannot preserve the declared observed value;
- the identity triangle plus the A anchor has one model section;
- no anchor retains both identity sections;
- authorization implies receipt trust;
- revoked, expired, and invalid-signature receipts cannot authorize;
- the declared fixture ABI is shape-valid and packs to `278537`.

There are no `sorry`, `native_decide`, project axioms, or `unsafe`
declarations. The audit permits only Lean's `propext` and `Quot.sound` where
reported. The proof is an abstract refinement of the declared fixture. Complete
Sounio operational semantics and emitted WASM byte semantics are not
mechanized.

## Complete ABI and graph evidence

The triangle verifier covers all 32,768 raw ABI states: 13,824 are valid and
18,944 are invalid. It reports zero invalid kernel outputs and zero oracle
mismatches. The valid-state census is:

| Disposition | Count |
|---|---:|
| Unique within the declared model | 2,392 |
| Stabilizer obstruction | 2,132 |
| Local proof review | 7,992 |
| No global section | 1,308 |

It also closes 32,768 residual-gauge checks, 55,032 subgroup checks, and 13,824
anchor-restriction checks with zero mismatches. “Unique” remains explicitly
model-relative and is not clinical authorization.

The general graph benchmark contains 1,536 cases, 256 each for path, cycle,
star, complete, disconnected, and random graphs with one to six Boolean
vertices. It closes 51,394 gauge checks and 624 affine-torsor checks with zero
mismatches. The census is 422 unique, 202 stabilizer-obstructed, and 912
inconsistent cases. A hidden minimum-assignment selector is killed by 3,788
anomalies across all 202 obstructed cases.

Both canonical WASM modules have zero singular-witness exports. TypeScript and
JavaScript serialize, verify, and compare results; they are not a clinical
mathematical fallback.

## Source freshness and reproduction

Both Sounio kernels were compiled twice to deterministic native Linux and WASM
artifacts with the reconciled Madaros v0.80.0 compiler at Sounio commit
`32bf57e880d5a0bc64d39edff98491a6c7c6101d`. Native and WASM self-checks agree
at `121` for the triangle and `131` for the graph kernel. Complete internal
native/WASM export parity is not claimed.

The no-crate, `unsafe`-forbidden Rust implementation reproduces all 32,768
triangle transcript records byte-for-byte. It also reproduces the committed
output hash for 384 blinded graph cases, 64 per family, and rejects a tampered
commitment. This is implementation and language independence, not author
independence: no unrelated third party has returned the signed attestation.

## Prior-art position

The formal search establishes that C1-C6 are known or composed of known
elements. Clinical abstention, equivariant selection, permutation-group bases,
formal medication constraints, signed clinical provenance, credential
revocation, and proof-carrying software cannot be claimed broadly.

The surviving position is a candidate conjunction only:

> revocation of an observation invalidates every dependent uniqueness proof;
> if the restored residual stabilizer again obstructs singular equivariant
> choice, the executable result must return to abstention.

The exact conjunction was not located in the declared searches. IEEE Xplore,
ACM Digital Library, WIPO Patentscope, Espacenet, and INPI remain blocked or
incomplete, so `searchComplete=false` and `noveltyEstablished=false`.

## Deliberate open boundary

The next scientific milestone is a general revocation-restoration theorem with
dependency-complete receipts, followed by unrelated third-party reproduction.
No real-world observation, clinical outcome, patient cohort, regulatory
assessment, patentability opinion, or production signature exists in v1.2.

```text
clinicalDisposition=REFUSE
clinicalUseAllowed=false
productionAuthorized=false
noveltyEstablished=false
signed=false
```
