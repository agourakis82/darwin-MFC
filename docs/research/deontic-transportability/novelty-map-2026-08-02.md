# Novelty Map: What Is Actually Left to Discover?

Date: 2026-08-02

Status: **living prior-art map; not a novelty opinion**

## Bottom line

The broad claim is not novel:

> Evidence does not mechanically determine a clinical recommendation because
> values, resources, equity, acceptability, and feasibility matter.

GRADE, guideline-adaptation methods, health economics, decision theory, and
clinical deontic-language research already establish that terrain.

The question still worth testing is narrower:

> Can recommendation direction, strength, and scope be treated as partially
> identified target-domain objects, with explicit normative transport
> assumptions, a robust core, an abstention result, and empirical validation on
> paired source/adapted guidelines?

No located source in the present search was shown to contain that full
combination. This is weak positive evidence for pursuing the question, not proof
of novelty or absence of prior art.

## Closest work and collision analysis

| Field | Existing contribution | Collision with this program | Residual question |
|---|---|---|---|
| Causal transportability | Identifies target causal effects under explicit cross-domain assumptions | Occupies all claims about transporting effects | What additional assumptions identify a recommendation after effects are known? |
| Target policy learning | Learns an optimal target policy after fixing or identifying a reward | Occupies generic “policy transport” and optimal action learning | What if values, authority, force scheme, and feasible set are not fixed or point-identified? |
| GRADE EtD | Structures judgments on benefits, harms, certainty, values, resources, equity, acceptability, and feasibility | Occupies the claim that recommendations need more than effect estimates | Can those judgments define a recommendation identified set and formal transport criterion? |
| GRADE-ADOLOPMENT | Reuses and adapts EtDs at recommendation level | Occupies operational contextualization of recommendations | How often does recommendation transport fail despite stable causal evidence, and can that gap be predicted? |
| HTA/economic transferability | Transfers models and evaluations across jurisdictions with cost and system adjustments | Occupies jurisdiction-sensitive resource and decision transfer | Can direction, strength, scope, and legitimate authority be jointly identified without collapsing to cost-effectiveness? |
| Threshold analysis | Measures how much evidence may change before the optimal intervention changes | Occupies evidence-space robustness radii | What is the corresponding radius in normative-context space while evidence is fixed? |
| Deontic terminology | Measures obligation conveyed by “must”, “should”, and “may” | Occupies language-to-perceived-force claims | Can cross-scheme force be treated as an explicit, reviewed transport map rather than inferred wording? |
| Computable guidelines | Represents evidence, recommendations, decision logic, and provenance | Occupies basic guideline formalization | Can a runtime expose non-identification and forbid execution when normative transport premises are missing? |
| Shared decision-making | Makes individual values central to preference-sensitive choices | Occupies the population-versus-individual values insight | Can the authority boundary be formalized as a non-identification result? |

## Claim ladder

### Already known or too broad

- `K1`: context can change a recommendation.
- `K2`: evidence quality and recommendation strength differ.
- `K3`: values and preferences affect decisions.
- `K4`: costs and feasibility vary across jurisdictions.
- `K5`: guideline wording carries deontic force.
- `K6`: policies and causal effects can be transported under assumptions.

These are background, never novelty claims.

### Candidate methodological claims

- `C1`: a target recommendation can be represented as a partial-identification
  set over causal and normative uncertainty.
- `C2`: causal transportability is formally separable from deontic
  transportability of direction, strength, and scope.
- `C3`: the intersection across admissible contexts defines a robust action core
  and the nearest context boundary defines a deontic robustness radius.
- `C4`: the minimum context needed to contract the identified set defines a
  normative information deficit.
- `C5`: an empirical deontic transport gap can be estimated in paired guideline
  adaptations only after independent evidence-lineage adjudication.

Each claim remains `TEST` until the formal search and studies close.

### Candidate systems claim

- `S1`: Sounio can make causal evidence, normative context, authority, units,
  uncertainty, and abstention separate typed inputs, then carry an identified
  set and proof receipt through native and WASM execution without TypeScript
  mathematics.

`S1` is an engineering/formal-methods claim. It is not the primary scientific
claim and does not make `C1-C5` true.

## Search observations

Searches included exact and adjacent terms such as:

- `deontic transportability`;
- `normative transportability clinical recommendation`;
- `recommendation transportability`;
- `policy adaptation target population identifiability`;
- `guideline adaptation direction strength values resources equity`;
- `threshold analysis recommendation robustness`; and
- `formal clinical guideline deontic logic`.

The exact phrases did not reveal an obvious complete predecessor in the current
web search. Exact-phrase absence is low-grade evidence because terminology can
differ, databases are incomplete, indexing lags, and relevant work may sit in
ethics, law, decision theory, AI, HTA, implementation science, or non-English
literature.

## Required formal search before any priority claim

Search independently in:

- MEDLINE/PubMed and Embase;
- Web of Science and Scopus;
- IEEE Xplore and ACM Digital Library;
- PhilPapers and legal scholarship databases;
- arXiv, medRxiv, and OSF;
- Crossref citation graph and backward/forward citations;
- theses and conference proceedings; and
- WIPO, Espacenet, Google Patents, and INPI only for the separate technical
  patent question.

At least two reviewers should screen title/abstract and full text. Search
strings, exports, deduplication, exclusions, and citation chasing must be
published. A domain expert in guideline methodology and one in formal
epistemology/deontic logic should challenge the final claim chart.

## Strongest real-world anchor found

The ASH Latin American VTE adaptation publicly reports 21 recommendations, of
which six changed direction and four changed strength. Its official summary
attributes groups of changes to additional indirect evidence, resource/access
and equity concerns, and values/preferences. This is an unusually clean
discovery anchor for the phenomenon, but it does not by itself prove that
causal effects transported or that the proposed theory is novel.

Primary source:
<https://www.hematology.org/-/media/hematology/files/clinicians/guidelines/vte/la-ash-slides-vte-prevention_033122-en.pdf#page=46>

The companion methodology paper confirms that the panel reused health-effect
reviews while adding regional evidence on values, resources, accessibility,
feasibility, and equity:
<https://pmc.ncbi.nlm.nih.gov/articles/PMC8361463/>

## Publication language allowed today

Allowed:

> We introduce a candidate framework and preregister a test of whether clinical
> recommendation properties remain partially unidentified after causal effects
> are transported. In a preliminary search, we did not locate a framework with
> the same complete combination.

Not allowed:

- “first ever”;
- “no prior art”;
- “proved universally”;
- “recommendations are safely transportable”; or
- any implication that a passing software gate validates clinical use.

## Go/no-go rule

Proceed to a methods preprint only if:

1. the formal search leaves `C1-C5` materially distinct;
2. the Lean/Sounio model proves nontrivial results beyond the finite examples;
3. independent coding of the paired corpus passes reliability gates;
4. the randomized experiment demonstrates context effects with evidence fixed;
5. identified-set coverage and sharpness both beat preregistered baselines; and
6. all negative findings and boundary conditions remain visible.

Failure at any gate produces a useful negative methods result, not a clinical
product claim.

