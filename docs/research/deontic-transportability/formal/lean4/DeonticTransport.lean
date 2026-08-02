import Std.Tactic

/-!
# Deontic Transportability: finite formal core

This file formalizes a deliberately small, non-clinical model with two abstract
actions. It separates fixed causal evidence from target normative context.

Mechanized here:

1. no evidence-only operator can agree with two admissible contexts that choose
   different decisions for the same evidence;
2. an infeasible action cannot be the unique selected action;
3. disagreement yields a set-identified result with an empty robust core;
4. agreement on one unique action yields a two-context robust core; and
5. four exact countermodels instantiate value, feasibility, equity, and
   population-versus-individual authority boundaries.

This is research-only. It contains no clinical recommendation and proves no
empirical or regulatory claim. No Mathlib, no axiom, no sorry.
-/

namespace Darwin.DeonticTransport

/-- Two abstract actions. They have no clinical interpretation. -/
inductive Action where
  | A
  | B
  deriving DecidableEq, Repr

/-- A decision is represented as a subset of the two abstract actions. -/
inductive Decision where
  | refuse
  | onlyA
  | onlyB
  | both
  deriving DecidableEq, Repr

/-- Research disposition after comparing the identified set and robust core. -/
inductive IdentificationState where
  | refused
  | identifiedA
  | identifiedB
  | partialAbstain
  deriving DecidableEq, Repr

/-- Fixed two-outcome evidence for actions A and B. -/
structure Evidence2 where
  a₁ : Int
  a₂ : Int
  b₁ : Int
  b₂ : Int
  deriving DecidableEq, Repr

/-- Target normative context. `authority` is an opaque constituency id. -/
structure Context2 where
  w₁ : Int
  w₂ : Int
  feasibleA : Bool
  feasibleB : Bool
  authority : Nat
  deriving DecidableEq, Repr

def scoreA (e : Evidence2) (c : Context2) : Int :=
  e.a₁ * c.w₁ + e.a₂ * c.w₂

def scoreB (e : Evidence2) (c : Context2) : Int :=
  e.b₁ * c.w₁ + e.b₂ * c.w₂

/-- Set-valued choice under one context. No feasible action yields `refuse`. -/
def choose (e : Evidence2) (c : Context2) : Decision :=
  match c.feasibleA, c.feasibleB with
  | false, false => .refuse
  | true, false => .onlyA
  | false, true => .onlyB
  | true, true =>
      if scoreA e c > scoreB e c then .onlyA
      else if scoreB e c > scoreA e c then .onlyB
      else .both

/-- Union of two decision sets: the two-context identified action set. -/
def unionDecision : Decision → Decision → Decision
  | .refuse, d => d
  | d, .refuse => d
  | .both, _ => .both
  | _, .both => .both
  | .onlyA, .onlyA => .onlyA
  | .onlyB, .onlyB => .onlyB
  | _, _ => .both

/-- Intersection of two decision sets: the two-context robust action core. -/
def intersectDecision : Decision → Decision → Decision
  | .both, d => d
  | d, .both => d
  | .refuse, _ => .refuse
  | _, .refuse => .refuse
  | .onlyA, .onlyA => .onlyA
  | .onlyB, .onlyB => .onlyB
  | _, _ => .refuse

def identifiedSet (e : Evidence2) (c₁ c₂ : Context2) : Decision :=
  unionDecision (choose e c₁) (choose e c₂)

def robustCore (e : Evidence2) (c₁ c₂ : Context2) : Decision :=
  intersectDecision (choose e c₁) (choose e c₂)

def classify (identified core : Decision) : IdentificationState :=
  match identified, core with
  | .refuse, _ => .refused
  | .onlyA, .onlyA => .identifiedA
  | .onlyB, .onlyB => .identifiedB
  | _, _ => .partialAbstain

/-! ## General theorems -/

/-- If two admissible contexts disagree for the same evidence, every operator
    that sees evidence alone is wrong in at least one context. -/
theorem noEvidenceOnlyOperator
    (e : Evidence2) (c₁ c₂ : Context2)
    (h : choose e c₁ ≠ choose e c₂)
    (f : Evidence2 → Decision) :
    f e ≠ choose e c₁ ∨ f e ≠ choose e c₂ := by
  by_cases h₁ : f e = choose e c₁
  · right
    intro h₂
    apply h
    exact h₁.symm.trans h₂
  · exact Or.inl h₁

/-- Feasibility is independent of score: infeasible A cannot be selected alone. -/
theorem infeasibleA_ne_onlyA (e : Evidence2) (c : Context2)
    (h : c.feasibleA = false) : choose e c ≠ .onlyA := by
  cases hB : c.feasibleB <;> simp [choose, h, hB]

/-- Feasibility is independent of score: infeasible B cannot be selected alone. -/
theorem infeasibleB_ne_onlyB (e : Evidence2) (c : Context2)
    (h : c.feasibleB = false) : choose e c ≠ .onlyB := by
  cases hA : c.feasibleA <;> simp [choose, h, hA]

/-- Opposing unique decisions produce both actions in the identified set and
    no action in the robust core. -/
theorem disagreement_set_identified {d₁ d₂ : Decision}
    (h₁ : d₁ = .onlyA) (h₂ : d₂ = .onlyB) :
    unionDecision d₁ d₂ = .both ∧
      intersectDecision d₁ d₂ = .refuse := by
  simp [h₁, h₂, unionDecision, intersectDecision]

/-- A finite sufficient condition: both declared contexts uniquely select A. -/
theorem robustDominanceA (e : Evidence2) (c₁ c₂ : Context2)
    (h₁ : choose e c₁ = .onlyA) (h₂ : choose e c₂ = .onlyA) :
    identifiedSet e c₁ c₂ = .onlyA ∧ robustCore e c₁ c₂ = .onlyA := by
  simp [identifiedSet, robustCore, h₁, h₂, unionDecision, intersectDecision]

/-- Symmetric finite sufficient condition for B. -/
theorem robustDominanceB (e : Evidence2) (c₁ c₂ : Context2)
    (h₁ : choose e c₁ = .onlyB) (h₂ : choose e c₂ = .onlyB) :
    identifiedSet e c₁ c₂ = .onlyB ∧ robustCore e c₁ c₂ = .onlyB := by
  simp [identifiedSet, robustCore, h₁, h₂, unionDecision, intersectDecision]

/-! ## Four exact, abstract countermodels -/

def dt001Evidence : Evidence2 := ⟨8, 4, 5, 1⟩
def dt001Context₁ : Context2 := ⟨2, -1, true, true, 1⟩
def dt001Context₂ : Context2 := ⟨1, -2, true, true, 2⟩

theorem dt001_value_shift :
    choose dt001Evidence dt001Context₁ = .onlyA ∧
    choose dt001Evidence dt001Context₂ = .onlyB ∧
    identifiedSet dt001Evidence dt001Context₁ dt001Context₂ = .both ∧
    robustCore dt001Evidence dt001Context₁ dt001Context₂ = .refuse ∧
    classify
      (identifiedSet dt001Evidence dt001Context₁ dt001Context₂)
      (robustCore dt001Evidence dt001Context₁ dt001Context₂) = .partialAbstain := by
  decide

def dt002Evidence : Evidence2 := ⟨10, 7, 6, 2⟩
def dt002Context₁ : Context2 := ⟨2, -1, true, true, 3⟩
def dt002Context₂ : Context2 := ⟨2, -1, false, true, 4⟩

theorem dt002_feasibility_shift :
    choose dt002Evidence dt002Context₁ = .onlyA ∧
    choose dt002Evidence dt002Context₂ = .onlyB ∧
    identifiedSet dt002Evidence dt002Context₁ dt002Context₂ = .both ∧
    robustCore dt002Evidence dt002Context₁ dt002Context₂ = .refuse ∧
    classify
      (identifiedSet dt002Evidence dt002Context₁ dt002Context₂)
      (robustCore dt002Evidence dt002Context₁ dt002Context₂) = .partialAbstain := by
  decide

def dt003Evidence : Evidence2 := ⟨10, 8, 7, 1⟩
def dt003Context₁ : Context2 := ⟨1, 0, true, true, 5⟩
def dt003Context₂ : Context2 := ⟨1, -1, true, true, 6⟩

theorem dt003_equity_shift :
    choose dt003Evidence dt003Context₁ = .onlyA ∧
    choose dt003Evidence dt003Context₂ = .onlyB ∧
    identifiedSet dt003Evidence dt003Context₁ dt003Context₂ = .both ∧
    robustCore dt003Evidence dt003Context₁ dt003Context₂ = .refuse ∧
    classify
      (identifiedSet dt003Evidence dt003Context₁ dt003Context₂)
      (robustCore dt003Evidence dt003Context₁ dt003Context₂) = .partialAbstain := by
  decide

def dt004Evidence : Evidence2 := ⟨9, 4, 6, 1⟩
def dt004Context₁ : Context2 := ⟨2, -1, true, true, 7⟩
def dt004Context₂ : Context2 := ⟨1, -3, true, true, 8⟩

theorem dt004_authority_boundary :
    dt004Context₁.authority ≠ dt004Context₂.authority ∧
    choose dt004Evidence dt004Context₁ = .onlyA ∧
    choose dt004Evidence dt004Context₂ = .onlyB ∧
    identifiedSet dt004Evidence dt004Context₁ dt004Context₂ = .both ∧
    robustCore dt004Evidence dt004Context₁ dt004Context₂ = .refuse ∧
    classify
      (identifiedSet dt004Evidence dt004Context₁ dt004Context₂)
      (robustCore dt004Evidence dt004Context₁ dt004Context₂) = .partialAbstain := by
  decide

end Darwin.DeonticTransport
