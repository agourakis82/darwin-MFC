# Deontic Transportability Research Program

Date: 2026-08-02

Status: **frontier hypothesis under test**

Novelty disposition: **NOT ESTABLISHED**

Clinical disposition: **REFUSE**

This directory contains a research-only program about a gap between two
questions that are often collapsed:

1. Can causal effects be transported to a target population?
2. Can the direction, strength, and scope of a recommendation be transported
   to a target normative context?

The working term is **deontic transportability**. The term and the framework
are hypotheses to be challenged by formal prior-art review, not claims of
priority.

## Candidate scientific contribution

The candidate contribution is a partial-identification theory for clinical
recommendations. Even if target causal consequences are known, a recommendation
may remain unidentified because target values, resource constraints, equity
objectives, feasibility, force semantics, and legitimate authority are only
partly known.

The framework returns:

- an identified recommendation set;
- a robust core shared by all admissible normative contexts;
- a deontic robustness radius to the nearest recommendation-changing context;
- explicit assumptions required to move from effects to a recommendation; and
- `ABSTAIN` when the available information does not identify a unique result.

It never treats a recommendation as a fact mechanically entailed by clinical
evidence.

## Artifacts

- `deontic-transportability-theory-v0.1.md`: definitions, propositions,
  constructive counterexamples, and proof obligations.
- `preregistration-protocol-v0.1.md`: retrospective paired-guideline study and
  prospective randomized Evidence-to-Decision experiment.
- `novelty-map-2026-08-02.md`: the closest known work and the narrower claim
  that remains worth testing.
- `ash-latam-discovery-atlas-v0.1.json`: ten public adaptation changes reported
  by ASH, encoded as non-clinical discovery metadata.
- `counterexamples-v0.1.json`: four abstract finite countermodels.
- `deontic-transportability.receipt.v0.1.json`: content hashes and fail-closed
  research disposition.
- `../../../scripts/verify-deontic-transportability.mjs`: deterministic
  verifier for the atlas, countermodels, and receipt.

## Relationship to No Hidden Ought

The neighboring `no-hidden-ought` work asks whether a compiler can prevent
unwitnessed normative amplification. This program asks a different upstream
question: when is a recommendation itself identified after moving to a new
context? The two can later compose, but neither is connected to the clinical
runtime here.

## Run the research gate

```bash
node scripts/verify-deontic-transportability.mjs
```

Passing this gate means only that the abstract counterexamples, public metadata
counts, and artifact hashes are internally consistent. It does not validate a
clinical recommendation, prove novelty, or authorize patient use.

