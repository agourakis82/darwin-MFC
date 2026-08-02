# Deontic Transportability and Normative Non-Identifiability

Version: 0.1

Date: 2026-08-02

Research disposition: **TEST**

Novelty disposition: **NOT ESTABLISHED**

Clinical disposition: **REFUSE**

## 1. Research question

Causal transportability asks when evidence from a source environment can
identify a causal quantity in a target environment. Clinical guideline
adaptation asks a later question: what should a target panel recommend after
considering those effects together with values, resource use, equity,
acceptability, feasibility, and local authority?

This program studies the boundary between them:

> Under what assumptions does transport of causal consequences identify the
> direction, strength, and scope of a target clinical recommendation?

The central hypothesis is that causal transportability is generally necessary
but insufficient. Recommendation transport requires additional, explicit
normative transport assumptions. When those assumptions are incomplete, the
scientifically correct result is a set of admissible recommendations or
abstention, not a silently chosen recommendation.

This is not a claim that values and resources were previously ignored. GRADE
Evidence-to-Decision (EtD) and GRADE-ADOLOPMENT explicitly include them. The
candidate advance is a formal identification theory that separates the causal
and normative layers and exposes the missing assumptions as mathematical
objects.

## 2. Objects and notation

Let:

- `S` and `T` denote source and target environments;
- `A` be a finite set of possible actions;
- `X` be pre-action covariates;
- `Y(a)` be the vector of potential outcomes under action `a`;
- `E_T` be the identified target causal evidence, represented as a set when
  causal quantities are only partially identified;
- `eta_T` be a target normative context;
- `Theta_T` be the set of normatively and institutionally admissible target
  contexts; and
- `R_T` be a recommendation represented by direction, strength, and scope.

A normative context is deliberately richer than a scalar reward:

```text
eta_T = (
  U_T,       outcome utilities and patient preference model
  F_T,       feasible action set and resource constraints
  Q_T,       equity objective or distributional ordering
  C_T,       acceptability, implementation, and legal context
  H_T,       legitimate decision authority and represented constituency
  G_T        recommendation grading and deontic force scheme
)
```

`H_T` matters because a population panel, regulator, health system, clinician,
and individual patient do not possess interchangeable authority. `G_T` matters
because verbal and categorical strength labels do not have a universal
cross-scheme metric.

For causal state `e in E_T` and context `eta in Theta_T`, let

```text
W_T(a; e, eta)
```

be a possibly vector-valued welfare ordering. The target decision
correspondence is

```text
D_T(e, eta) = argmax_(a in F_T(eta)) W_T(a; e, eta).
```

It is a correspondence rather than a forced single action. Ties, partial
orders, and unresolved value conflicts remain visible.

The recommendation constructor

```text
rho_T(D_T, e, eta, G_T) -> (direction, strength, scope)
```

is scheme-specific. It cannot be assumed to be a universal monotone map from
effect size to recommendation strength.

## 3. Definitions

### 3.1 Causal transportability

The target causal estimand is transportable when it is identifiable from the
available source experiments, source observations, target observations, and
explicit cross-environment causal assumptions.

This definition belongs to established causal transportability theory. The
present program does not claim it.

### 3.2 Deontic transportability

A source recommendation is **deontically transportable** to `T` over
`Theta_T` only when all admissible target contexts preserve the specified
recommendation property:

```text
for every eta in Theta_T:
  property(rho_T(D_T(E_T, eta), E_T, eta, G_T))
    = property(R_S)
```

The property may be direction, strength, scope, or the entire recommendation.
These properties must be tested separately.

### 3.3 Normative identified set

When the target context is partially known, the recommendation identified set
is

```text
R_ID(T) = union_(e in E_T, eta in Theta_T) rho_T(D_T(e, eta), e, eta, G_T).
```

The result is point-identified only when `R_ID(T)` is a singleton under the
declared representation.

### 3.4 Robust action core

The robust core is the set of actions selected in every admissible causal and
normative state:

```text
C_T = intersection_(e in E_T, eta in Theta_T) D_T(e, eta).
```

An empty core means that no action is robust to the declared uncertainty. It
does not mean that every action is acceptable.

### 3.5 Deontic transport gap

For a traceable source/adapted recommendation pair, define the descriptive
indicator

```text
DTG_p = 1[
  causal evidence lineage is adjudicated stable or transportable for property p
  AND recommendation property p changed
].
```

`DTG_p` is not causal unless the evidence-stability judgment and adaptation
process support that interpretation. The pilot atlas intentionally leaves this
status `NOT_ADJUDICATED`.

### 3.6 Deontic robustness radius

Given a declared metric `d` on normative contexts and baseline `eta_0`, define

```text
delta_D(eta_0) = inf {
  d(eta, eta_0): D_T(E_T, eta) != D_T(E_T, eta_0), eta in Theta_T
}.
```

The metric and admissible set are part of the result. A radius without them is
not interpretable.

### 3.7 Normative information deficit

Let `Z` be the target context variables actually observed. The normative
information deficit is the unresolved partition of `Theta_T` after conditioning
on `Z` that still changes the recommendation. One operational measure is the
minimum additional context-variable set needed to make `R_ID(T | Z)` a
singleton. This is a candidate research object, not yet a validated scale.

## 4. Propositions and proof obligations

### Proposition 1: causal transportability is insufficient

Assume the target potential-outcome distribution is point-identified. If two
admissible target contexts use the same causal consequences but induce
different orderings over actions, then the target recommendation is not
identified from causal evidence alone.

**Constructive proof.** Let actions `A` and `B` have identical causal outcome
vectors across two contexts. Under one legitimate weighting of benefit and
burden, `A` maximizes welfare; under another, `B` does. Any operator whose only
input is the shared causal evidence must return the same value in both
contexts, so it is wrong in at least one. The executable countermodel is
`DT-001` in `counterexamples-v0.1.json`.

This proposition is elementary. Its value is as a boundary condition, not as
a standalone novelty claim.

### Proposition 2: feasibility can break recommendation transport

Even with transported effects and invariant utilities, a source-optimal action
need not be target-optimal if it is outside the target feasible set. Therefore,
effect and utility transport do not identify a target recommendation without a
feasibility assumption.

The executable countermodel is `DT-002`.

### Proposition 3: equity objectives can reverse a population recommendation

Two panels can accept the same subgroup-specific causal outcomes and utilities
yet choose different actions when they use different legitimate distributional
objectives. Average-benefit transport is therefore insufficient when equity is
decision-relevant.

The executable countermodel is `DT-003`.

### Proposition 4: population values do not identify individual preference

A population-level preference distribution does not identify an individual
patient's utility without elicitation or an explicit linking assumption. A
population recommendation and an individual choice therefore occupy different
authority domains.

The executable countermodel is `DT-004`.

### Proposition 5: sufficient condition by robust dominance

If there exists exactly one action `a*` such that, for every `e in E_T`, every
`eta in Theta_T`, and every feasible competitor `b`, `a*` strictly outranks
`b`, then `C_T = {a*}` and the action is point-identified over the declared
uncertainty set.

This establishes a sufficient condition, not clinical validity. The conclusion
is only as sound as `E_T`, `Theta_T`, the outcome representation, and the
authority that declared them.

### Proposition 6: recommendation strength needs an additional bridge

Point-identifying an action does not necessarily identify recommendation
strength. Strength may depend on certainty, variability in preferences,
resource use, equity, feasibility, and the grading scheme. A separate,
reviewed `rho_T` bridge is required.

## 5. Relation to close prior art

The framework must survive the following collisions:

- Pearl and Bareinboim provide causal transportability definitions and
  identification algorithms.
- Policy adaptation under covariate shift identifies target rewards and learns
  target policies after fixing a reward function.
- GRADE EtD and GRADE-ADOLOPMENT already make contextual judgments explicit.
- Health-economic and HTA transferability already examine jurisdictional
  differences in costs, systems, and decision contexts.
- Threshold analysis already asks how far evidence can move before an optimal
  intervention changes.
- Deontic-terminology research already studies perceived obligation in
  guideline language.
- Computable-guideline standards already represent recommendations, evidence,
  logic, and provenance.

The narrower candidate contribution is therefore:

> A recommendation-level partial-identification theory that treats normative
> context and legitimate authority as transport variables, returns a robust
> recommendation core or abstention, and empirically estimates deontic
> transport gaps in paired source/adapted guidelines.

If existing work is found to provide that complete object, the novelty claim
is falsified and this program becomes a replication or synthesis.

## 6. Falsifiers

The program should be abandoned or reframed if any of the following occurs:

1. Prior art contains the same recommendation-level identified set, authority
   boundary, and robustness result.
2. In a sufficiently traceable paired corpus, every apparent recommendation
   change is explained by changed causal evidence or changed PICO rather than
   normative context.
3. Independent reviewers cannot classify evidence lineage or adaptation
   drivers with acceptable reliability.
4. In a preregistered factorial experiment, controlled changes to values,
   resources, equity, or feasibility do not alter direction, strength, or
   abstention when evidence is held fixed.
5. The identified sets are almost always either singleton without added
   context or completely uninformative even after realistic context is added.
6. The framework reduces without loss to established target-policy learning
   with a fully observed reward, making the separate deontic layer redundant.

## 7. Formalization roadmap

The executable JSON fixtures test finite countermodels only. The next formal
stage is:

1. define finite actions, outcome vectors, rational weights, feasibility, and
   set-valued choice in Lean;
2. prove Propositions 1, 2, 4, and 5 over the finite model;
3. encode the same model in Sounio with dimensional outcome types and sealed
   normative-context effects;
4. require exact native/WASM parity for identified sets and robust cores; and
5. keep all outputs research-only until empirical and governance gates close.

Sounio is valuable here not because a programming language can create a norm,
but because it can make missing normative premises, unit errors, hidden effects,
and provenance loss harder to conceal.

## 8. References used to delimit the claim

1. Bareinboim E, Pearl J. A General Algorithm for Deciding
   Transportability of Experimental Results.
   <https://arxiv.org/abs/1312.7485>
2. Liu X, Yang Q, Tian Z, Guo R, Wu P. Optimal Policy Adaptation under
   Covariate Shift. IJCAI 2025.
   <https://www.ijcai.org/proceedings/2025/0645.pdf>
3. Klugar M, et al. GRADE guidance 39: using GRADE-ADOLOPMENT to adopt,
   adapt or create contextualized recommendations. J Clin Epidemiol. 2024.
   <https://pubmed.ncbi.nlm.nih.gov/39117011/>
4. Schünemann HJ, et al. GRADE Evidence-to-Decision framework introduction.
   <https://book.gradepro.org/guideline/introduction-to-the-evidence-to-decision-frameworks>
5. Lomotan EA, et al. How "Should" We Write Guideline Recommendations?
   <https://pmc.ncbi.nlm.nih.gov/articles/PMC2982946/>
6. Phillippo DM, et al. Threshold analysis for guideline recommendations.
   <https://pmc.ncbi.nlm.nih.gov/articles/PMC5176010/>
7. Neumann I, et al. Methodology for adaptation of the ASH VTE guidelines
   for Latin America. <https://pmc.ncbi.nlm.nih.gov/articles/PMC8361463/>
8. HL7. Development of Computable Clinical Guideline Artifacts.
   <https://www.hl7.org/fhir/uv/cpg/STU2/documentation-approach-04-05-computable-guideline-artifacts.html>

