# Prior-art claim matrix v1.2

## Verdict

The broad architecture is not a defensible novelty claim. Stabilizer
obstructions, permutation-group bases, set-valued clinical decisions,
abstention, formal executable guidelines, signed provenance, credential
revocation, and proof-carrying software all have prior art.

The narrow candidate that survived this search is:

> **Revocable residual-stabilizer authorization.** A singular model-relative
> result may exist only while verified observation receipts reduce the exact
> residual stabilizer enough to make the admissible-section set a singleton.
> Revoking a receipt invalidates every descendant uniqueness proof; if the
> restored stabilizer again moves all admissible singular outputs, recomputation
> must abstain and may emit only invariant obstruction data.

No located reference states this complete lifecycle law. That makes it a
`CANDIDATE_CONJUNCTION`, not an established novelty result.

## Closest references

| ID | Reference | What it establishes | What it does not establish here |
|---|---|---|---|
| R1 | Dym, Lawrence, Siegel. [Equivariant Frames and the Impossibility of Continuous Canonicalization](https://proceedings.mlr.press/v235/dym24a.html), ICML 2024. | Canonicalization can be impossible or discontinuous under symmetry; weighted frames avoid forced canonical choices. | Clinical observations, revocable receipts, or result invalidation after symmetry restoration. |
| R2 | Kaba et al. [Equivariance with Learned Canonicalization Functions](https://arxiv.org/abs/2211.06489), 2022/2023. | Symmetric inputs with non-trivial stabilizers obstruct ordinary equivariant canonicalization; relaxed/coset outputs are used. | Provenance-qualified observations or revocation-triggered abstention. |
| R3 | Huang. [Base sizes of primitive groups of diagonal type](https://arxiv.org/abs/2303.14290), 2023. | A base is a minimum subset with trivial pointwise stabilizer. | Epistemic reliability, clinical meaning, or lifecycle invalidation. |
| R4 | Dzedzej, Kryszewski. [Selections and approximations of convex-valued equivariant mappings](https://www.tmna.ncu.pl/static/files/v40n2-08.pdf), 2012. | Equivariant selections and set-valued mappings are an established mathematical subject. | The declared receipt and revocation semantics. |
| R5 | Laber et al. [Set-valued dynamic treatment regimes for competing outcomes](https://pmc.ncbi.nlm.nih.gov/articles/PMC3954452/), 2014. | Clinical treatment rules may return sets and leave tie-breaking to external factors. | Group stabilizers, signed observations, or proof-carrying execution. |
| R6 | Presacan et al. [When silence is safer](https://pubmed.ncbi.nlm.nih.gov/42298124/), 2026. | Clinical abstention is an explicit safety and decision-theoretic outcome. | Algebraic symmetry restoration or receipt-dependent authorization. |
| R7 | Bowles et al. [Automated conflict detection and resolution in medical guidelines](https://pmc.ncbi.nlm.nih.gov/articles/PMC6993806/), 2019. | Clinical guidelines and medication conflicts are transformed into formal models checked with Isabelle/HOL and SMT. | Residual gauge groups or revocable value receipts. |
| R8 | Fairweather et al. [Non-repudiable provenance for clinical decision support systems](https://arxiv.org/abs/2006.11233), 2020. | Cryptographically defensible provenance is applied to CDS traces. | Provenance values acting as symmetry-breaking observations. |
| R9 | HL7. [FHIR R4 Provenance](https://hl7.org/fhir/R4/provenance-definitions.html), 2019. | Target, agent, policy, entity, time, and digital signature can be represented for clinical artifacts. | Exact stabilizer reduction or mandatory abstention after revocation. |
| R10 | W3C. [Bitstring Status List v1.0](https://www.w3.org/TR/vc-bitstring-status-list/), 2025. | Verifiable credentials can carry efficiently checkable suspension and revocation status. | Clinical inference semantics or symmetry restoration. |
| R11 | Zhang et al. [Semantically enabling clinical decision support recommendations](https://pmc.ncbi.nlm.nih.gov/articles/PMC10353186/), 2023. | Guideline evidence and provenance are linked to computable CDS recommendations and update workflows. | Formal receipt-dependent residual stabilizers. |
| R12 | US12542216B2, [Personalized AI agent as a case manager](https://patents.google.com/patent/US12542216B2/en), priority 2024-07-18. | Active US patent with machine-verifiable clinical constraints, formal safety checks, time-boxed/revoked access, Merkle audit, and cryptographic provenance. | The inspected claims do not state the residual-stabilizer lifecycle law. |
| R13 | US20260024661A1 / US12562280B2, [Multilingual healthcare system](https://patents.google.com/patent/US20260024661A1/en), priority 2024-07-18. | Deterministic constraint grammar, clinical command validation, co-signature, signed evidence packages, and artifact hashes. | The inspected claims do not state symmetry-restoring revocation. |
| R14 | WO2025193234A1, [Prescription management system](https://patents.google.com/patent/WO2025193234A1/en), priority 2024-03-15. | Signed prescriptions, metadata hashes, provenance checks, lifecycle invalidation, and auditable receipt handling. | Formal clinical constraint semantics or stabilizer-driven abstention. |
| R15 | Necula. [Proof-Carrying Code](https://people.eecs.berkeley.edu/~necula/Papers/thesis.pdf), 1997. | Executable code can be accompanied by machine-checkable safety evidence. | The clinical and residual-symmetry conjunction. |

## Claim-by-claim assessment

| Claim | Assessment | Anticipating references | Reason |
|---|---|---|---|
| C1 | `KNOWN` | R1, R2 | Stabilizer/canonicalization obstructions are established. |
| C2 | `KNOWN` | R3 | Minimum point sets with trivial pointwise stabilizer are permutation-group bases. |
| C3 | `KNOWN` | R4, R5, R6 | Set-valued and abstaining decisions predate this project. |
| C4 | `KNOWN_COMPONENTS` | R8, R9, R10, R12, R14 | Signed provenance, scope, validity, reliability metadata, and revocation exist, though not as the exact gauge-fixing semantics. |
| C5 | `KNOWN` | R7, R11 | Formal and computable clinical guideline systems are established. |
| C6 | `KNOWN_COMPONENTS` | R12, R13, R15 | Proof-carrying execution and hash-bound clinical evidence packages are disclosed in adjacent work. |
| C7 | `CANDIDATE_CONJUNCTION` | R1-R3, R8-R10 | No retained reference connects receipt revocation to residual-stabilizer expansion and mandatory singular-result invalidation. |
| C8 | `CANDIDATE_CONJUNCTION_CLOSE_ART` | R7-R15 | The full architecture is crowded; R12 and R13 are especially close. The exact symmetry lifecycle was not located, but absence is not established. |

## Scientific position worth pursuing

The publishable theorem should not be “we use Sounio”, “we sign a receipt”, or
“we abstain”. It should formalize a state transition law over valid evidence:

```text
valid receipts O
  -> residual stabilizer H(O)
  -> admissible-section torsor S(O)
  -> singular emission only when |S(O)| = 1

revoke r from O
  -> recompute H(O - {r}) and S(O - {r})
  -> invalidate every descendant proof depending on r
  -> abstain if uniqueness is lost or the restored stabilizer has no fixed point
```

This suggests three testable contributions:

1. a **revocation restoration theorem** proving when removal of an observation
   reconstructs a non-trivial gauge orbit;
2. a **dependency-complete receipt calculus** proving that no singular result
   survives revocation of a receipt in its minimal observation base;
3. an **executable abstention law** with native/WASM parity and no hidden
   selector, evaluated on graphs beyond the Boolean triangle.

v1.2 implements a synthetic instance and the broader graph benchmark. It does
not yet prove the general revocation restoration theorem, establish clinical
validity, complete blocked database searches, or obtain independent human
replication.

## Boundary

```text
formalPriorArtSearchExecuted=true
searchComplete=false
legalOpinion=false
noveltyEstablished=false
clinicalDisposition=REFUSE
clinicalUseAllowed=false
productionAuthorized=false
```
