# Prior-art frontier v1.0

## Known components

The project excludes the following from any novelty claim:

1. Gauge invariance, conjugation, holonomy, orbit representatives, and anomaly
   detection as general mathematical and physical ideas.
2. Equivariance and invariance under group actions in machine learning.
3. Isomorphism and renaming invariance in logic, databases, graphs, and formal
   semantics.
4. Context-dependent, directional terminology mapping and ontology alignment.
5. Formal verification, metamorphic testing, mutation testing, and
   proof-carrying computation.
6. Executable clinical guidelines and terminology-aware decision support.

## Surviving candidate conjunction

The narrow candidate is:

> A content-addressed normative transport compiler that treats local
> terminology relabelings as gauge transformations, exhaustively proves
> disposition and repair invariance over the declared finite orbit, emits a
> canonical orbit certificate, detects gauge-sensitive implementation mutants,
> and refuses on any anomaly without emitting a normative label.

This candidate is falsified by prior work containing the operative conjunction,
not merely one of its known components.

## Search observations

Exact phrase probes for "normative gauge invariance", "normative gauge
anomaly", and clinical gauge-anomaly firewalls did not locate a clear direct
predecessor in the inspected results. This is weak negative evidence only.

FHIR `ConceptMap` explicitly models mappings as directional and scoped to a
business use; reverse mappings cannot be assumed. Context dependencies can be
required for a mapping to hold, and equivalence may be unreliable without
required products. SNOMED guidance likewise treats exact equivalence and
clinical review as safety-relevant. These standards motivate the problem but
do not supply a gauge-invariance theorem or executable anomaly certificate.

## Selected anchors

- Healey R. [Gauging What's Real](https://doi.org/10.1093/acprof:oso/9780199287963.001.0001).
- Bronstein MM et al. [Geometric Deep Learning](https://arxiv.org/abs/2104.13478).
- HL7 International. [FHIR R4 ConceptMap definitions](https://hl7.org/fhir/R4/conceptmap-definitions.html).
- SNOMED International. [Clinical risk in terminology mapping](https://docs.snomed.org/snomed-ct-practical-guides/snomed-ct-mapping-guide/evaluating-mapping-as-a-solution/4.1-clinical-risk).
- WHO. [WHO-FIC Interoperability Hub](https://www.who.int/standards/classifications/who-fic-interoperability-hub).

## Required novelty review

The formal review must search mathematical logic, knowledge representation,
clinical informatics, safety engineering, programming languages, metamorphic
testing, and patent literature. It must chase citations around gauge
equivariance, representation independence, terminology mapping, and executable
guidelines. `noveltyEstablished` remains `false` until independent claim-level
review closes that matrix.
