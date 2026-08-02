import DeonticTransport

/-!
# Deontic Transportability: arbitrary finite context families

This extension lifts the two-context formal core to finite lists of admissible
contexts. The empty-family conventions are explicit:

* the identified set is empty (`Decision.refuse`); and
* the robust core is universal over the two abstract actions (`Decision.both`).

The second convention is the ordinary vacuous intersection. Clinical callers
must still refuse an empty family; this file proves abstract set semantics only.

Research-only: no action has a clinical interpretation. No Mathlib, no axiom,
no `sorry`, and no `native_decide`.
-/

namespace Darwin.DeonticTransport

/-- Membership in a decision set. -/
def contains : Decision → Action → Bool
  | .refuse, _ => false
  | .onlyA, .A => true
  | .onlyA, .B => false
  | .onlyB, .A => false
  | .onlyB, .B => true
  | .both, _ => true

/-- Decision equality is completely determined by the two membership bits. -/
theorem decision_ext {d₁ d₂ : Decision}
    (hA : contains d₁ .A = contains d₂ .A)
    (hB : contains d₁ .B = contains d₂ .B) : d₁ = d₂ := by
  cases d₁ <;> cases d₂ <;> simp [contains] at hA hB ⊢

theorem contains_unionDecision (d₁ d₂ : Decision) (a : Action) :
    contains (unionDecision d₁ d₂) a = (contains d₁ a || contains d₂ a) := by
  cases d₁ <;> cases d₂ <;> cases a <;> decide

theorem contains_intersectDecision (d₁ d₂ : Decision) (a : Action) :
    contains (intersectDecision d₁ d₂) a = (contains d₁ a && contains d₂ a) := by
  cases d₁ <;> cases d₂ <;> cases a <;> decide

/-- Union of choices over an arbitrary finite family. -/
def identifiedSetMany (e : Evidence2) : List Context2 → Decision
  | [] => .refuse
  | c :: cs => unionDecision (choose e c) (identifiedSetMany e cs)

/-- Intersection of choices over an arbitrary finite family. -/
def robustCoreMany (e : Evidence2) : List Context2 → Decision
  | [] => .both
  | c :: cs => intersectDecision (choose e c) (robustCoreMany e cs)

/-- An action is identified exactly when at least one family member chooses it. -/
theorem contains_identifiedSetMany_iff (e : Evidence2) (cs : List Context2) (a : Action) :
    contains (identifiedSetMany e cs) a = true ↔
      ∃ c, c ∈ cs ∧ contains (choose e c) a = true := by
  induction cs with
  | nil => simp [identifiedSetMany, contains]
  | cons c cs ih =>
      simp [identifiedSetMany, contains_unionDecision, ih, Bool.or_eq_true]

/-- An action is robust exactly when every family member chooses it. -/
theorem contains_robustCoreMany_iff (e : Evidence2) (cs : List Context2) (a : Action) :
    contains (robustCoreMany e cs) a = true ↔
      ∀ c, c ∈ cs → contains (choose e c) a = true := by
  induction cs with
  | nil => simp [robustCoreMany, contains]
  | cons c cs ih =>
      simp [robustCoreMany, contains_intersectDecision, ih, Bool.and_eq_true]

private theorem identifiedSetMany_cons_onlyA (e : Evidence2) :
    ∀ (c : Context2) (cs : List Context2),
      choose e c = .onlyA →
      (∀ c' ∈ cs, choose e c' = .onlyA) →
      identifiedSetMany e (c :: cs) = .onlyA := by
  intro c cs
  induction cs generalizing c with
  | nil =>
      intro h _
      simp [identifiedSetMany, h, unionDecision]
  | cons d ds ih =>
      intro hc hs
      have hd : choose e d = .onlyA := hs d (by simp)
      have hds : ∀ x ∈ ds, choose e x = .onlyA := by
        intro x hx
        exact hs x (by simp [hx])
      have htail : identifiedSetMany e (d :: ds) = .onlyA := ih d hd hds
      change unionDecision (choose e c) (identifiedSetMany e (d :: ds)) = .onlyA
      rw [hc, htail]
      rfl

private theorem robustCoreMany_cons_onlyA (e : Evidence2) :
    ∀ (c : Context2) (cs : List Context2),
      choose e c = .onlyA →
      (∀ c' ∈ cs, choose e c' = .onlyA) →
      robustCoreMany e (c :: cs) = .onlyA := by
  intro c cs
  induction cs generalizing c with
  | nil =>
      intro h _
      simp [robustCoreMany, h, intersectDecision]
  | cons d ds ih =>
      intro hc hs
      have hd : choose e d = .onlyA := hs d (by simp)
      have hds : ∀ x ∈ ds, choose e x = .onlyA := by
        intro x hx
        exact hs x (by simp [hx])
      have htail : robustCoreMany e (d :: ds) = .onlyA := ih d hd hds
      change intersectDecision (choose e c) (robustCoreMany e (d :: ds)) = .onlyA
      rw [hc, htail]
      rfl

private theorem identifiedSetMany_cons_onlyB (e : Evidence2) :
    ∀ (c : Context2) (cs : List Context2),
      choose e c = .onlyB →
      (∀ c' ∈ cs, choose e c' = .onlyB) →
      identifiedSetMany e (c :: cs) = .onlyB := by
  intro c cs
  induction cs generalizing c with
  | nil =>
      intro h _
      simp [identifiedSetMany, h, unionDecision]
  | cons d ds ih =>
      intro hc hs
      have hd : choose e d = .onlyB := hs d (by simp)
      have hds : ∀ x ∈ ds, choose e x = .onlyB := by
        intro x hx
        exact hs x (by simp [hx])
      have htail : identifiedSetMany e (d :: ds) = .onlyB := ih d hd hds
      change unionDecision (choose e c) (identifiedSetMany e (d :: ds)) = .onlyB
      rw [hc, htail]
      rfl

private theorem robustCoreMany_cons_onlyB (e : Evidence2) :
    ∀ (c : Context2) (cs : List Context2),
      choose e c = .onlyB →
      (∀ c' ∈ cs, choose e c' = .onlyB) →
      robustCoreMany e (c :: cs) = .onlyB := by
  intro c cs
  induction cs generalizing c with
  | nil =>
      intro h _
      simp [robustCoreMany, h, intersectDecision]
  | cons d ds ih =>
      intro hc hs
      have hd : choose e d = .onlyB := hs d (by simp)
      have hds : ∀ x ∈ ds, choose e x = .onlyB := by
        intro x hx
        exact hs x (by simp [hx])
      have htail : robustCoreMany e (d :: ds) = .onlyB := ih d hd hds
      change intersectDecision (choose e c) (robustCoreMany e (d :: ds)) = .onlyB
      rw [hc, htail]
      rfl

/-- Agreement on unique A across any nonempty finite family identifies A and
    makes A the robust core. -/
theorem robustDominanceManyA (e : Evidence2) (c : Context2) (cs : List Context2)
    (hc : choose e c = .onlyA)
    (hs : ∀ c' ∈ cs, choose e c' = .onlyA) :
    identifiedSetMany e (c :: cs) = .onlyA ∧
      robustCoreMany e (c :: cs) = .onlyA := by
  exact ⟨identifiedSetMany_cons_onlyA e c cs hc hs,
    robustCoreMany_cons_onlyA e c cs hc hs⟩

/-- Symmetric arbitrary-family result for unique B. -/
theorem robustDominanceManyB (e : Evidence2) (c : Context2) (cs : List Context2)
    (hc : choose e c = .onlyB)
    (hs : ∀ c' ∈ cs, choose e c' = .onlyB) :
    identifiedSetMany e (c :: cs) = .onlyB ∧
      robustCoreMany e (c :: cs) = .onlyB := by
  exact ⟨identifiedSetMany_cons_onlyB e c cs hc hs,
    robustCoreMany_cons_onlyB e c cs hc hs⟩

/-- A family containing two disagreeing contexts defeats every evidence-only
    decision operator on at least one declared family member. -/
theorem noEvidenceOnlyOperatorFamily
    (e : Evidence2) (cs : List Context2) (c₁ c₂ : Context2)
    (hc₁ : c₁ ∈ cs) (hc₂ : c₂ ∈ cs)
    (h : choose e c₁ ≠ choose e c₂)
    (f : Evidence2 → Decision) :
    ∃ c, c ∈ cs ∧ f e ≠ choose e c := by
  rcases noEvidenceOnlyOperator e c₁ c₂ h f with h₁ | h₂
  · exact ⟨c₁, hc₁, h₁⟩
  · exact ⟨c₂, hc₂, h₂⟩

/-! ## Executable finite-family witnesses -/

def mixedFamily : List Context2 :=
  [dt001Context₁, dt001Context₁, dt001Context₂, dt001Context₁]

theorem dtFinite001_mixed_family :
    identifiedSetMany dt001Evidence mixedFamily = .both ∧
    robustCoreMany dt001Evidence mixedFamily = .refuse ∧
    classify
      (identifiedSetMany dt001Evidence mixedFamily)
      (robustCoreMany dt001Evidence mixedFamily) = .partialAbstain := by
  decide

def robustAFamily : List Context2 :=
  [dt001Context₁, { dt001Context₁ with authority := 9 },
    { dt001Context₁ with authority := 10 }]

theorem dtFinite002_robust_a :
    identifiedSetMany dt001Evidence robustAFamily = .onlyA ∧
    robustCoreMany dt001Evidence robustAFamily = .onlyA ∧
    classify
      (identifiedSetMany dt001Evidence robustAFamily)
      (robustCoreMany dt001Evidence robustAFamily) = .identifiedA := by
  decide

def robustBFamily : List Context2 :=
  [dt001Context₂, { dt001Context₂ with authority := 11 }]

theorem dtFinite003_robust_b :
    identifiedSetMany dt001Evidence robustBFamily = .onlyB ∧
    robustCoreMany dt001Evidence robustBFamily = .onlyB ∧
    classify
      (identifiedSetMany dt001Evidence robustBFamily)
      (robustCoreMany dt001Evidence robustBFamily) = .identifiedB := by
  decide

theorem dtFinite004_empty_family :
    identifiedSetMany dt001Evidence [] = .refuse ∧
    robustCoreMany dt001Evidence [] = .both ∧
    classify
      (identifiedSetMany dt001Evidence [])
      (robustCoreMany dt001Evidence []) = .refused := by
  decide

end Darwin.DeonticTransport
