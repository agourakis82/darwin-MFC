# Prior-art search protocol v1.2

## Purpose and boundary

This protocol records a dated, reproducible search for work adjacent to
value-carrying gauge fixing. It is a scientific landscape search, not a legal
freedom-to-operate opinion and not a patentability opinion.

The search asks whether prior work discloses the following claims, alone or in
combination:

| ID | Claim under test |
|---|---|
| C1 | A non-trivial input stabilizer obstructs a singular equivariant output when it moves every admissible output. |
| C2 | External observations reduce the residual stabilizer, and a minimum point set with trivial pointwise stabilizer is an observation base. |
| C3 | A clinical decision system returns a set, review state, or abstention instead of forcing a singular action under unresolved ambiguity. |
| C4 | An observed value is admitted only through a signed, scoped, time-bounded, reliability-qualified, revocable provenance receipt. |
| C5 | Clinical guideline or medication constraints are compiled into executable formal models checked by solvers or theorem provers. |
| C6 | A result is bound to source, compiler, proof, executable artifact, and evidence identities. |
| C7 | Revoking an observation receipt expands the residual stabilizer and must invalidate a singular result whose uniqueness depended on that receipt. |
| C8 | C1-C7 are enforced together by a fail-closed executable clinical architecture. |

Absence of a returned record is not evidence of absence. `noveltyEstablished`
remains `false` throughout this milestone.

## Search date and query families

Searches were run on 2026-08-03 UTC against the interfaces available from the
research environment. The literal phrase family was:

```text
"proof-carrying prescribing"
"clinical constraint compiler"
"dose safety envelope"
"stabilizer-complete abstention"
"revocation restores symmetry"
```

The semantic families combined the following terms:

```text
(equivariant OR invariant OR gauge OR symmetry) AND
(selector OR canonicalization OR stabilizer OR fixed point)

(clinical decision support OR prescribing OR medication OR guideline) AND
(abstention OR set-valued OR constraint solver OR theorem prover)

(clinical decision support OR prescription) AND
(provenance OR signed evidence OR cryptographic receipt OR revocation)
```

## Database execution record

| Database | Interface | Result for declared exact phrases | Access state |
|---|---|---|---|
| PubMed | NCBI E-utilities | 0 records across the five literal phrases. Broad searches returned 1 record for formal verification plus medication/prescribing/guideline, 30 for provenance/non-repudiation/cryptography plus CDS, and 677 for abstention/set-valued plus clinical/treatment. | Query executed |
| Crossref | REST API | No exact title match among the top 100 fuzzy-ranked results for each phrase. Crossref total-result counts are not treated as exact-phrase counts. | Query executed with ranking limitation |
| arXiv | Atom API | 0 records across the five literal phrases. | Query executed |
| IEEE Xplore | Web search | Direct query returned HTTP 418; a domain-scoped web search found adjacent formal-verification work but no literal-phrase hit. | Direct search blocked |
| ACM Digital Library | Web search | Direct query returned HTTP 403 Cloudflare challenge; a domain-scoped web search produced no literal-phrase hit. | Direct search blocked |
| Google Patents | XHR query plus document review | 0 records for each literal phrase. Semantically adjacent patent families were screened manually. | Query executed |
| WIPO Patentscope | Web search | Direct query returned HTTP 403. Candidate PCT documents were inspected through Google Patents mirrors. | Direct search blocked |
| Espacenet | Web search | Direct query returned HTTP 403. Candidate publication metadata were inspected through Google Patents mirrors. | Direct search blocked |
| INPI Brazil | Public service landing page and web index | Landing page was reachable, but no anonymous machine-queryable result interface was available in this run. | Full-text search incomplete |

Exact API queries and counts are preserved in
`formal/evidence/prior-art-search.v1.2.json`. HTTP denial is recorded as a
coverage gap, not converted into a negative finding.

## Inclusion and screening rules

A reference was retained when its title, abstract, claims, or normative text
covered at least one claim ID. Broad conceptual similarity was not enough: the
matrix records which limitation was actually disclosed and which was inferred.
Patent status and priority dates are reported as displayed by Google Patents
and are explicitly not independent legal conclusions.

The search deliberately includes standards and old foundational work because
scientific priority is not limited to journal articles. It also separates:

- a known mathematical ingredient;
- a known clinical or provenance ingredient;
- a close architecture that anticipates part of a conjunction;
- a candidate conjunction not located in the declared search;
- an unsearched or access-blocked region.

## Stop rule and next audit

This v1.2 search stops after executing the declared API queries, screening the
closest returned work, and documenting every blocked database. It is not a
systematic review and has no independent information-specialist validation.

Before a novelty or priority claim is published, the next audit must:

1. run authenticated searches in IEEE Xplore and ACM Digital Library;
2. run expert Boolean and CPC/IPC searches in Patentscope, Espacenet, and INPI;
3. perform backward and forward citation chasing for every retained reference;
4. obtain independent claim-by-claim review from a mathematician, clinical
   informatician, and patent professional;
5. freeze the final queries, exports, dates, and reviewer attestations.
