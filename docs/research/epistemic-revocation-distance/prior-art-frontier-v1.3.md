# Prior-art frontier v1.3

Search date: 2026-08-03.

## Verdict

The broad ingredients are known. This milestone must not claim invention of
group bases, evidence retraction, fault-tolerant basis selection, revocable
authorization, linear authority, or proof-carrying execution.

The retained scientific candidate is narrower:

> A mode-resolved epistemic revocation spectrum for a model-relative singular
> result, recomputed from immutable evidence subsets, accompanied by complete
> cut receipts and executed by a hash-bound compiler pipeline that exports no
> singular result.

No retained reference states that complete conjunction. The status is
`CANDIDATE_CONJUNCTION`; novelty is not established.

## Closest primary work

| Area | Reference | Anticipation |
|---|---|---|
| Equivariant canonicalization | Dym, Lawrence, Siegel. [Equivariant Frames and the Impossibility of Continuous Canonicalization](https://proceedings.mlr.press/v235/dym24a.html), ICML 2024. | Stabilizer obstructions and alternatives to forced canonical choices are known. |
| Minimum group bases | Blaha. [Minimum bases for permutation groups: the greedy approximation](https://doi.org/10.1016/0196-6774(92)90020-D), 1992. | Minimum base is established and NP-hard. |
| Irredundant group bases | Margolis, Rhodes. [Bases of Permutation Groups and Boolean Representable Simplicial Complexes](https://arxiv.org/abs/2602.12912), 2026. | Group-action bases have a recent closure-complex formulation beyond matroids. |
| Fault-tolerant bases | Bentert et al. [Fault-Tolerant Matroid Bases](https://arxiv.org/abs/2506.22010), ESA 2025. | A basis surviving deletion of any `k` elements is known for matroids. |
| Fault-tolerant distinguishing sets | Seo, Slater. [Fault Tolerant Detectors for Distinguishing Sets in Graphs](https://doi.org/10.7151/dmgt.1838), 2015. | Redundant detector sets and failure tolerance are known in graph identification. |
| Minimal cut-set analysis | Rauzy, Yang. [Decision Diagram Algorithms to Extract Minimal Cutsets of Finite Degradation Models](https://doi.org/10.3390/info10120368), 2019. | Complete minimal failure sets and structural fragility are established reliability objects. |
| Automated cut-set generation | Kromodimoeljo, Lindsay. [Automatic Generation of Minimal Cut Sets](https://arxiv.org/abs/1506.03555), 2015. | Model-checked enumeration of multiple minimal failure behaviors is known. |
| Assurance-case confidence | Bloomfield, Rushby. [Assessing Confidence with Assurance 2.0](https://arxiv.org/abs/2205.04522), 2022. | Multi-perspective confidence, defeaters, residual doubts, and evidence-backed claims are known. |
| Distance to non-identifiability | Ulusarslan, Kilbertus, Schneider. [Limits of Learning Linear Dynamics from Experiments](https://arxiv.org/abs/2605.12010), 2026. | Geometric and algebraic proximity to non-identifiability is known for linear dynamical systems; it is not receipt-revocation distance. |
| Distance to singular regimes | Plummer. [Hypothesis Testing over Observable Regimes in Singular Models](https://arxiv.org/abs/2602.24165), 2026. | Distance to a singular stratum governs statistical detectability; the metric and object differ from finite evidence cuts. |
| Evidence removal | Baltag, Renne, Smets. [The Logic of Evidence and Truth](https://doi.org/10.1007/s11229-013-0359-5) and related dynamic evidence-removal semantics. | Retraction as an epistemic action is known. |
| Dynamic epistemic action | van Ditmarsch, van der Hoek, Kooi. [Dynamic Epistemic Logic](https://doi.org/10.1007/978-1-4020-5839-4), 2007. | Ordered epistemic state updates are established. |
| Linear authorization | Garg. [Proof Theory for Authorization Logic](https://people.mpi-sws.org/~dg/papers/thesis.pdf), 2009. | Time, state, consumption, revocation, and proof-carrying authorization are jointly treated. |
| Explicit-time authorization | DeYoung, Garg, Pfenning. [An Authorization Logic With Explicit Time](https://doi.org/10.1109/CSF.2008.15), CSF 2008. | Time-indexed proof-carrying authorization is known. |
| Use-once and revocable certificates | Garg, Pfenning. [A Proof-Carrying File System with Revocable and Use-Once Certificates](https://people.mpi-sws.org/~dg/papers/stm11-lpcfs.pdf), 2011. | Revocable linear certificates predate this work. |
| Revocable capabilities | Yu et al. [CAPSTONE](https://www.usenix.org/conference/usenixsecurity23/presentation/yu-jason), USENIX Security 2023. | Linear capabilities and revocation trees invalidate aliases at machine level. |
| Revocable typestate | [Typestate via Revocable Capabilities](https://arxiv.org/abs/2510.08889), PLDI 2026. | Flow-sensitive typestate with revocable capabilities is very close systems prior art. |
| Proof-carrying code | Necula. [Proof-Carrying Code](https://www.usenix.org/legacy/publications/library/proceedings/osdi96/full_papers/necula/necula.pdf), 1996. | Machine-checkable safety evidence attached to executable code is foundational prior art. |

A 2026 manuscript titled *Certified Theory Compiling for Verifiable and
Efficient Language-Model Learning* uses the phrase “minimum evidence cut” for
a minimum sufficient support of an output. Only a ResearchGate copy was
located in this pass, so it is recorded as an unverified terminological
collision, not a primary-source negative finding. Its displayed construction
removes irrelevant context while preserving support; v1.3 instead asks which
revocations destroy an already declared identification contract.

## Claim matrix

| Claim | Assessment | Reason |
|---|---|---|
| Stabilizer obstruction to singular equivariant choice | `KNOWN` | Equivariant canonicalization literature. |
| Minimum observations that destroy all symmetry | `KNOWN` | Permutation-group bases and determining sets. |
| Robustness to removal of `k` observations | `KNOWN_COMPONENTS` | Fault-tolerant matroid bases and detector sets. |
| Continuous distance to statistical non-identifiability | `KNOWN` | System identification and singular-model geometry. |
| Minimum sufficient evidence support for a claim | `KNOWN_TERMINOLOGICAL_COLLISION` | Recent certified-theory-compiling manuscript; primary provenance remains incomplete. |
| Complete families of minimal destructive cuts | `KNOWN` | Reliability, degradation models, and model-checked cut-set analysis. |
| Evidence addition/removal changes epistemic state | `KNOWN` | Dynamic evidence and belief-revision logics. |
| Time-bounded, consumed, revocable authority | `KNOWN` | Authorization logic, use-once certificates, capabilities. |
| Proof attached to executable safety policy | `KNOWN` | Proof-carrying code/data. |
| Output-relative distance to loss of model-relative singularity | `CANDIDATE` | Not located as the exact group-action and identified-set object. |
| Mode-resolved model/symmetry/joint revocation spectrum without exporting the singular result | `CANDIDATE_CONJUNCTION` | Each mathematical component is close to known work; the full output-relative object was not located. |
| Source-fresh native/WASM realization tied to immutable subset recomputation and revocation receipts | `CANDIDATE_CONJUNCTION_CLOSE_ART` | Proof-carrying, assurance cases, cut sets, and revocable execution are crowded. |

## Path-independence boundary

Commutativity and path independence of belief revision are also known research
topics. v1.3 does not infer them. Every post-revocation state is recomputed from
the immutable retained-evidence subset, so the executable experiment is a
function of a set by construction. An incremental implementation would need a
separate flatness/confluence certificate or a path-addressed receipt; silently
collapsing order-dependent histories into one set hash is outside this claim.

## Open searches

IEEE Xplore, ACM Digital Library full text, WIPO Patentscope, Espacenet, INPI,
MathSciNet, zbMATH, primary provenance for the theory-compiling manuscript, and
an independent human mathematical review remain open. Search-result absence is
not evidence of absence.

```text
formalPriorArtSearchExecuted=true
searchComplete=false
legalOpinion=false
noveltyEstablished=false
```
