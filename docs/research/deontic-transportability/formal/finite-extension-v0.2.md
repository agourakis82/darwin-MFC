# Deontic Transport Formal Gate: Finite-Family Extension v0.2

Date: 2026-08-02  
Status: **research-only formal and native verification**  
Clinical disposition: **REFUSE**

This extension preserves the v0.1 package byte for byte and chains to its
receipt. It lifts the formal semantics from two declared contexts to an
arbitrary finite list of contexts.

## Formal Result

For fixed evidence and a finite context family:

- an action belongs to the identified set exactly when at least one context
  chooses it;
- an action belongs to the robust core exactly when every context chooses it;
- unanimous unique choice of A or B over any nonempty family yields the same
  unique identified set and robust core; and
- if two family members disagree, every evidence-only operator fails for at
  least one declared member.

The empty family has an empty identified set and a vacuous universal robust
core. Its classification remains `REFUSED`; it is never an authorization.

## Executable Witness

The Sounio witness folds at most eight decision masks with exact integer
operations. Counts outside `0..8` return `-1` for caller refusal. Four families
cover disagreement, unanimous A, unanimous B, and the explicit empty-family
convention.

Observed gates:

```text
Lean finite build: PASS
Lean axiom audit: PASS
Sounio check: PASS
Sounio native compile: PASS
Sounio direct execution: ALL PASS
Public WASM build: BLOCKED (exit 2)
Raw WASM attempt: BLOCKED (exit 255, no artifact)
Native/WASM parity: BLOCKED
Clinical authorization: REFUSE
```

The formal proof is unbounded over finite lists. The Sounio executable is
deliberately bounded to eight inputs and receives already-contextualized
decision masks; it is not represented as an unbounded executable proof.

## Verification

```bash
node scripts/verify-deontic-formal-gate.mjs
node scripts/verify-deontic-finite-gate.mjs
```

Neither gate establishes empirical validity, novelty, compiler source
freshness, browser execution, or clinical use.
