# Prior-Art Frontier v0.8

Search snapshot: 2026-08-02. This is an adversarial map, not a completed
systematic search, freedom-to-operate analysis, or novelty opinion.

| Neighborhood | Direct prior art | Collision | Boundary retained in v0.8 |
| --- | --- | --- | --- |
| Reproducible and hermetic builds | [Reproducible Builds](https://arxiv.org/abs/2104.06020), [reproducible environments through time](https://arxiv.org/abs/2402.00424), Nix, and SLSA bind software inputs and provenance. | Dependency closure, content addressing, hermetic execution, and attestations are established. | v0.8 studies an abstract normative output whose external semantic resolver is omitted from an otherwise byte-stable receipt. |
| Time of check to time of use | [MITRE CWE-367](https://cwe.mitre.org/data/definitions/367.html) defines the general resource-state race. | No claim to invent TOCTOU or mutable-reference attacks. | The checked resource is a semantic interpretation used by an executable knowledge artifact, and failure has a zero-error abstention consequence. |
| Ontology evolution | [Logical Difference for EL](https://arxiv.org/abs/1401.5850) and the [ontology inseparability survey](https://arxiv.org/abs/1804.07805) formalize safe replacement relative to query languages and vocabularies. | Logical difference, conservative extension, query inseparability, and semantic diff are prior art. | v0.8 uses only decision-scoped label identification under a separately modeled receipt closure; it does not propose a general ontology-diff algorithm. |
| Dependency provenance | [Provenance as Dependency Analysis](https://arxiv.org/abs/0708.2173) gives semantic foundations and computability limits for dependency provenance. | Minimal supports and semantic dependency are established. | The finite support and cut certificates are bounded witnesses around normative hermeticity, not a new provenance calculus. |
| Deontic bisimulation | Recent work proves bisimulation and language-equivalence results for [collective deontic admissibility](https://www.cambridge.org/core/journals/review-of-symbolic-logic/article/conditional-expressivity-and-collective-deontic-admissibility/E3618B569DC9FC42008830664689351D). | Deontic bisimulation and indistinguishability are not new. | v0.8 does not claim a new modal logic; its theorem concerns equal cryptographic receipts with open semantic referents. |
| Decision-relevant abstraction | [Decision-Relevant Concepts](https://arxiv.org/abs/2604.04808) selects concepts whose removal would merge states requiring different actions. | Action-preserving concept selection directly collides with broad minimal-concept claims. | v0.8 restricts the certificate to transitive semantic references that must be bound for receipt-level reproducibility. |
| FHIR terminology identity | FHIR distinguishes code system, version, code, and value set; it says a version may be necessary when permanence is absent ([FHIR Terminologies](https://hl7.org/fhir/R5/terminologies.html)). | Version-aware coded identity and terminology safety are standards practice. | v0.8 asks whether the bound versions are sufficient for one normative output, not how FHIR should identify concepts. |
| Mutable canonical references | FHIR allows versioned canonical references but also documents unresolved current-version selection and publisher-dependent algorithms ([FHIR References](https://fhir.hl7.org/fhir/references.html)). | Pinning canonical resource versions is not new. | The candidate result is a formal insufficiency and abstention theorem when a decision-relevant canonical remains unbound. |
| Context-dependent mappings | FHIR `ConceptMap` represents `dependsOn`, `product`, broader/narrower relations, and warns when equivalence cannot be relied on without context ([R4 definitions](https://hl7.org/fhir/R4/conceptmap-definitions.html)). | Context-sensitive terminology mapping is explicit prior art. | v0.8 treats missing mapping context as one possible unresolved semantic dependency; it does not invent contextual mappings. |
| Executable clinical knowledge | [CQL](https://cql.hl7.org/) and [Using CQL with FHIR](https://build.fhir.org/ig/HL7/cql-ig/en/using-cql.html) provide versioned, shareable executable knowledge artifacts and dependency conventions. | Versioned computable clinical knowledge is established. | The bounded kernel has no clinical logic and never emits a recommendation; it tests closure of an abstract dependency graph. |
| Prior Darwin gates | Auctoritas v0.5-v0.6 and Revocable Normative Influence v0.7 already prove authority-relative identifiability, adaptive abstention, and rederivation after revocation. | The underlying indistinguishability argument and finite mask search are inherited, not new. | v0.8 isolates a different trust boundary: the resolver environment behind a byte-identical receipt. |

## Candidate Contribution

The surviving hypothesis is the conjunction of:

1. a formal separation of byte identity from resolution-environment identity;
2. normative hermeticity as noninterference from receipt-unbound referents;
3. a constructive same-receipt/different-required-label countermodel;
4. a zero-error forced-abstention theorem for unresolved semantic ambiguity;
5. separate minimal certificates for bound sufficiency, binding deficit, and
   semantic fragility; and
6. source-fresh Sounio native/WASM execution with an exhaustive bounded oracle.

Every component has close predecessors. The conjunction remains a research
hypothesis until academic and patent searches close claim by claim.

## Claim Exclusions

No future claim from this package may assert invention of:

- content addressing, lockfiles, reproducible or hermetic builds;
- TOCTOU detection;
- ontology versioning, logical difference, or conservative extension;
- deontic bisimulation;
- FHIR/CQL versioning or contextual terminology maps;
- provenance supports, minimal feature selection, or dependency cuts; or
- proof-carrying decisions and signed software attestations.

## Exact-Phrase Probe

Web-index probes for `"normative hermeticity"`, `"semantic hermeticity"`,
`"deontic hermetic"`, and combinations of mutable canonical references with
forced abstention did not reveal the full v0.8 conjunction in this snapshot.
This is weak negative evidence only. Terminology varies, indexing is
incomplete, and lexical absence cannot establish novelty.
