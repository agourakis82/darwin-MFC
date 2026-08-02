# Auctoritas Protocol Calculus

## Research question

Suppose an algorithm may choose each next question after seeing previous
answers, may randomize, and may combine the authority of several roles. When
does soundness still require abstention, and what is the smallest explicit
authority expansion that could make recommendation identification possible?

The v0.6 answer has two layers:

1. a generic Lean calculus for well-founded adaptive protocols;
2. an exact bounded Sounio certificate for three worlds and three binary
   queries.

Neither layer has clinical semantics.

## Well-founded adaptive protocols

A protocol is a well-founded answer-indexed tree:

```text
Protocol = Abstain
         | Emit recommendation
         | Ask query (answer -> Protocol)
```

Every execution path terminates. Without a finite answer type, however, the
whole answer-indexed tree need not contain finitely many nodes.

Every branch of an authority-compliant protocol asks only queries authorized
for the executing role. An unauthorized query produces `REFUSE`. A protocol is
zero-error sound when every recommendation it emits equals the recommendation
required in the actual admissible world. Abstention is allowed.

### Adaptive No-Escape Theorem

If two worlds have the same maximal legitimate view for a role, every
well-founded authority-compliant adaptive protocol has the same outcome in
both worlds.

The proof is by structural induction on the protocol. At an `Ask` node, equal
legitimate views imply equal answers to the authorized query. Both executions
therefore enter the same continuation, where the induction hypothesis applies.

### Adaptive Forced Abstention Theorem

If the two indistinguishable worlds require different recommendations, every
zero-error sound, authority-compliant adaptive protocol returns `Abstain`.

This rules out three alternatives:

- `Refuse` is impossible because compliance prevents unauthorized queries;
- different emitted recommendations are impossible because outcomes are equal;
- one shared emitted recommendation is wrong in at least one world.

The theorem formalizes abstention as a consequence of soundness, not a product
preference.

## Randomness and coalitions

A randomized strategy is represented extensionally as `Seed -> Protocol`.
When compliance and soundness hold for every seed, forced abstention holds for
every seed. This is a zero-error result. It does not cover bounded expected
error, Bayesian risk, or PAC guarantees.

A static coalition receives the union of its members' query authorities. The
Adaptive No-Escape Theorem applies unchanged to the coalition's maximal view.
Dynamic delegation, revocation, strategic agents, and information leakage
through role changes are outside v0.6.

## Authority expansion certificates

For a finite family of worlds, a query mask identifies the recommendation when
every pair of worlds requiring different recommendations differs on at least
one available query. An expansion certificate contains a set of additional
query capabilities that makes this predicate true.

The abstract Lean interface defines an inclusion-minimal separating grant. The
bounded Sounio kernel computes a cardinality-minimal grant, breaking ties by the
smallest numeric query mask. It checks every candidate mask, and an independent
host oracle repeats the global search.

The certificate does not grant authority. It only states a minimal missing
capability under the supplied model. Institutional authorization remains an
external normative act.

### No Authority Expansion Escape

If two worlds answer every query in the declared universe identically but
require different recommendations, no authority grant over that universe can
rescue a zero-error adaptive protocol. The result remains forced abstention.

This separates two failure modes:

- `EXPAND_AUTHORITY`: distinguishing information exists but is outside the
  current authority mask;
- `ABSTAIN_QUERY_UNIVERSE`: the declared ontology contains no distinguishing
  query at all.

## Bounded executable contract

Inputs are one current-authority mask, three world-answer masks, and three
recommendation symbols. Every mask is in `0..7`; every recommendation symbol is
`1` or `2`. The packed result encodes disposition, expansion mask, and expansion
cardinality. No world recommendation crosses the ABI.

Native and WASM execute an internal exhaustive comparison over all 32,768
canonical states. The host verifier expands the input alphabet with invalid
boundary values and checks 640,000 states against an independently implemented
brute-force oracle.

## Falsifiability

The v0.6 artifact fails if:

- any central adaptive theorem depends on an undisclosed axiom;
- a compliant protocol can return `REFUSE`;
- two equal legitimate views produce different protocol outcomes;
- a zero-error protocol emits on the counterexample family;
- a returned expansion does not separate every conflicting world pair;
- any lower-cardinality expansion also succeeds;
- deterministic tie-breaking returns the wrong equal-cost mask;
- native and WASM self-checks disagree;
- one bounded WASM state differs from the host oracle;
- any linked source, compiler, parent receipt, executable, or evidence hash is
  modified without detection.

## Limits and next open problems

- General minimum query/test-set optimization is computationally hard; v0.6 is
  an exhaustive bounded witness, not a new complexity result.
- Noisy answers, missingness, continuous observations, and imprecise
  probabilities are absent.
- Seed-wise zero-error soundness is stronger than average-risk soundness.
- Coalition authority is a static union and does not model revocation or
  information-flow side channels.
- The declared query universe and authority policy are inputs, not validated
  ethical or legal facts.
- No clinical validity, utility, regulatory status, or novelty is established.

The next theoretical target is a dynamic authority calculus where delegation
and revocation are trace events and where the certificate minimizes authority
exposure subject to a formally declared error budget.
