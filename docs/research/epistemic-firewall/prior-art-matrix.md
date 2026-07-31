# Epistemic Firewall Prior-Art Matrix

Status: INITIAL SCREEN, SEARCH OPEN
Screened through: 2026-07-29

| Record | Date basis | Overlap | Initial assessment |
| --- | --- | --- | --- |
| [Necula, Proof-Carrying Code, POPL 1997](https://doi.org/10.1145/263699.263712) | Publication 1997 | Safety policy plus machine-checkable evidence before execution | Foundational prior art; blocks broad proof-carrying novelty |
| [Hekmatnejad et al., Model Checking CDS Using SMT](https://arxiv.org/abs/1901.04545) | Preprint 2019 | Semantic verification of clinical knowledge artifacts with SMT/Z3 | Blocks broad formally verified CDS claim |
| [Fairweather et al., Non-repudiable provenance for CDS](https://arxiv.org/abs/2006.11233) | Preprint/prototype 2020 | Signed provenance tokens, hashes, notary, verification for CDS recommendations | Strong collision with provenance and receipt layer |
| [Bates et al., risk-controlling prediction sets](https://arxiv.org/abs/2101.02703) | Preprint 2021 | Distribution-free expected-loss control with calibrated prediction sets | Blocks broad risk-certificate claim |
| [DeepMind WO2023057516A1](https://patents.google.com/patent/WO2023057516A1/en) | Priority 2021-10-05 | Conformal confidence sets explicitly applied to medical diagnosis | Patent-level collision with conformal diagnostic sets |
| [Angelopoulos et al., Conformal Risk Control](https://proceedings.iclr.cc/paper_files/paper/2024/hash/f3549ef9b5ff520a7e41ff3cc306ab2b-Abstract-Conference.html) | ICLR 2024 | Expected monotone-loss control, including extensions under shift | Core statistical prior art |
| [Lindemann et al., formal verification with conformal prediction](https://arxiv.org/abs/2409.00536) | Preprint 2024; IEEE 2025 | Combines conformal prediction with formal verification and online monitoring | Strong combination prior art outside medicine |
| [US20260121859A1](https://patents.google.com/patent/US20260121859A1/en) | Priority 2023-11-27; pending | Evidence-bound AI output, cryptographic render token, temporal validity, policy gate, refusal | Strong collision with evidence-bound release gate |
| [US12542216B2](https://patents.google.com/patent/US12542216B2/en) | Priority 2024-07-18; granted 2026 | Cryptographically governed CDS, Bayesian reasoning, formal safety invariants, Merkle audit trail | Strongest patent collision with broad architecture |
| [Conformal selective prediction for clinical triage](https://www.nature.com/articles/s41598-026-40637-w) | Publication 2026 | Conformal sets, cost-aware deferral, temporal shift | Blocks broad selective clinical inference claim |

## Current novelty boundary

The broad phrase `proof-carrying clinical inference` is not defensible as a novelty claim. The initial search leaves a narrower hypothesis open:

> A browser-executed clinical policy in which a Sounio-generated selective decision table refuses release unless a population-scoped calibration certificate, evidence bundle, executable WASM, test vectors, and compiler identity are all hash-bound and valid.

This is a research hypothesis, not a patentability conclusion. The individual components are known. Inventive step and non-obviousness remain unassessed.

## Priority follow-up

1. Build claim charts for US12542216B2, US20260121859A1, and WO2023057516A1.
2. Expand patent families and examiner citations.
3. Search CPC/IPC classes harvested from those families.
4. Run forward/backward citation chaining from Fairweather 2020 and Lindemann 2025.
5. Ask an independent reviewer and patent professional to challenge C6-C7.
