# Epistemic Firewall Formal Prior-Art Search Protocol

Status: OPEN
Opened: 2026-07-29
Review type: novelty landscape and prior-art search, not a legal opinion

## Research question

Has a clinical inference system already been disclosed that jointly binds all of the following to each executable recommendation?

1. A calibrated or conformal coverage certificate scoped to a defined population.
2. A selective `ACT / ASK / DEFER / REFUSE` policy.
3. Machine-checkable clinical safety invariants.
4. Evidence and calibration-cohort provenance.
5. The identity and hash of the compiler and executable artifact.
6. Runtime refusal when any bound artifact is stale, incompatible, unsigned, or outside distribution.

## Claim decomposition

| Claim | Search concept | Current status |
| --- | --- | --- |
| C1 | Conformal prediction sets for medical diagnosis | RED: known and patented |
| C2 | Selective prediction or abstention in clinical AI | RED: established literature |
| C3 | Formal verification of clinical decision support | RED: established literature |
| C4 | Cryptographic and non-repudiable CDS provenance | RED: published prototype and patents |
| C5 | Evidence-bound rendering or release gate | RED/YELLOW: recent patent claims are close |
| C6 | Compiler-identity-bound clinical calibration receipt | OPEN: no exact disclosure identified yet |
| C7 | Joint C1-C6 browser/offline implementation | OPEN: combination search incomplete |

`RED` means the broad component is not novel. `OPEN` means unconfirmed, not novel.

## Information sources

- Biomedical: MEDLINE/PubMed, Europe PMC.
- Multidisciplinary: Crossref, OpenAlex, ACM Digital Library, IEEE Xplore.
- Preprints: arXiv and medRxiv, labeled separately.
- Patents: WIPO PATENTSCOPE, Google Patents, USPTO Patent Center, Espacenet.
- Citation chaining: backward and forward chaining from all high-priority records.

The reporting log follows PRISMA-S where applicable. Patent searching follows the WIPO distinction between publication date, filing date, and priority date.

## Core search strings

1. `("proof carrying" OR "proof-carrying") AND (clinical OR medical OR diagnosis)`
2. `"conformal prediction" AND clinical AND ("formal verification" OR "runtime verification")`
3. `("selective prediction" OR abstention) AND clinical AND (provenance OR cryptographic OR attestation)`
4. `"clinical decision support" AND ("non-repudiable" OR "cryptographic provenance" OR attestation)`
5. `(compiler OR WebAssembly OR WASM) AND "clinical decision support" AND (provenance OR verification OR receipt)`
6. `("calibration certificate" OR "coverage certificate") AND (clinical OR medical OR healthcare) AND AI`

Patent variants replace clinical terms with CPC/IPC classes after classification harvesting from seed patents.

## Eligibility

Include publications, standards, patents, theses, and executable systems that disclose at least two claim components. Exclude opinion pieces without technical architecture, generic blockchain health records, and uncertainty methods without a clinical or safety-critical decision surface.

## Screening and extraction

- Two independent reviewers are required before a novelty conclusion.
- Extract priority/publication date, jurisdiction, claims, implementation status, proof type, calibration method, provenance binding, compiler binding, and runtime refusal behavior.
- Conflicts are retained as unresolved rather than averaged away.
- Preprints and pending patent applications remain visibly labeled.

## Stop conditions

The search cannot be called complete until patent-family expansion, citation chaining, CPC/IPC searching, non-English synonyms, and independent second review are complete. No statement using `first`, `only`, or `novel` is authorized while status is OPEN.

## Reproducible discovery run

Run:

```bash
pnpm research:epistemic-firewall
```

The command queries Crossref and Europe PMC and writes the timestamped raw result log. Patent results and claim charts are curated separately because an equivalent public unauthenticated API is not available for the selected patent databases.
