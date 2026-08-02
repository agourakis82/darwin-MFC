# Darwin Auctoritas: Authority-Constrained Identifiability

## Open problem

Evidence can identify causal effects without identifying what an institution,
professional, patient, or public authority ought to do. Existing work studies
transportability, preference elicitation, value of information, guideline
development, and legitimate public reason. The unresolved conjunction pursued
here is narrower:

> When is a recommendation not identifiable by any information-gathering
> procedure that stays within an explicitly declared authority boundary?

This is a scientific hypothesis and formal research program, not a novelty
claim. A preliminary search found neighboring work but did not establish either
novelty or absence of prior art.

## Model

Let:

- `W` be admissible normative worlds;
- `Q` be a declared universe of possible queries;
- `A(w, q)` be the answer to query `q` in world `w`;
- `L(r, q)` state that role `r` is authorized to issue or observe `q`;
- `R(w)` be the recommendation required in world `w`.

The maximal legitimate view of role `r` in world `w` is:

```text
V(r, w)(q) = A(w, q)  when L(r, q)
             hidden    otherwise
```

This maximal view dominates every deterministic adaptive protocol that only
uses authorized queries. If two worlds have equal maximal legitimate views,
then every such protocol receives the same information in both worlds.

## No Legitimate Query Theorem

For admissible worlds `w0` and `w1`, if:

1. `V(r, w0) = V(r, w1)`, and
2. `R(w0) != R(w1)`,

then no deterministic algorithm from legitimate views to recommendations can
be correct in every admissible world.

The proof is elementary but consequential. Equal inputs force equal outputs,
while correctness would require different outputs. A system that still emits a
unique recommendation has imported an undeclared normative premise, crossed
the authority boundary, or ceased to be correct in at least one admissible
world.

The Lean artifact proves the theorem over arbitrary world, query, answer,
recommendation, and role types. It also proves a finite witness in which a local
role cannot identify the recommendation, while a joint role can. This positive
control prevents the result from being a vacuous assertion that identification
is always impossible.

## Forced Abstention Theorem

Consider a partial algorithm that may return a recommendation or `None`. Call it
sound when every recommendation it does emit equals the recommendation required
in the actual admissible world. Under the same two hypotheses as the No
Legitimate Query Theorem, every sound partial algorithm must return `None` on
the shared legitimate view.

This sharpens the result. Abstention is not merely a conservative interface
choice in the counterexample family. It is required by soundness. The theorem
does not prescribe what a human or institution should do after abstention; that
would require an additional, explicit authority model.

## Executable witness

The Sounio kernel implements the complete bounded domain of two worlds and two
binary queries. Its input is:

```text
authority mask, observed mask,
answers for q0 and q1 in world 0,
answers for q0 and q1 in world 1,
recommendation code for each world
```

The kernel emits only one of five dispositions. It never emits either world's
recommendation. The host verifier exhausts every valid combination and explicit
invalid-contract cases, compares Sounio/WASM against an independent JavaScript
oracle, and rejects import, export, hash, parent, or refusal-boundary drift.

## Falsifiability

The v0.5 claim fails if any of the following occurs:

- the Lean theorem requires a project-declared axiom;
- the finite positive control cannot be identified under expanded authority;
- native Sounio and WASM disagree;
- WASM and the independent exhaustive oracle disagree on one bounded state;
- an invalid mask or unauthorized observation is not refused;
- artifact mutation survives receipt verification;
- the executable returns a recommendation rather than an identifiability state.

## What this does not establish

- that the declared query universe is complete;
- that an authority policy is legitimate, ethical, or legally correct;
- that all adaptive, randomized, multi-agent, or strategic protocols have been
  mechanized in Lean;
- that clinical recommendations are identifiable or non-identifiable in a real
  health system;
- scientific or patent novelty;
- clinical safety, efficacy, deployment authorization, or regulatory approval.

## Prior-art frontier

The closest current neighborhoods include:

- causal transportability and selection diagrams: Bareinboim and Pearl,
  [arXiv:1312.7485](https://arxiv.org/abs/1312.7485);
- structured evidence-to-decision methodology: the
  [Core GRADE series](https://www.bmj.com/content/389/bmj-2024-083867);
- robust active preference elicitation:
  [Vayanos et al.](https://arxiv.org/abs/2003.01899);
- value of information under imprecise probabilities:
  [arXiv:2607.06570](https://arxiv.org/abs/2607.06570);
- legitimacy through public reason:
  [Oxford University Press](https://academic.oup.com/book/62946);
- moral disagreement as an open alignment problem:
  [PubMed 41268066](https://pubmed.ncbi.nlm.nih.gov/41268066/).

The candidate contribution is therefore not "formal clinical decision support"
or "proof-carrying prescribing" alone. It is the combination of a declared
query universe, role-indexed authority, a maximal legitimate view, a theorem of
non-identifiability under that view, and an executable disposition that
distinguishes `ASK`, `DELEGATE`, and `ABSTAIN_AUTHORITY`. A formal prior-art and
novelty review remains mandatory before stronger language is used.
