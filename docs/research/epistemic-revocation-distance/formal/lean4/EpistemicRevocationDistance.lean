import NoHiddenGaugeFixing

/-!
# Epistemic revocation distance

This file proves the finite restoration theorem behind Darwin v1.3. For each
output-moving symmetry, the active receipts excluding it form a least
restoration cut. The global revocation distance is the minimum cardinality of
those blocker cuts.

Lists deliberately replace mathematical sets here. They are the exact finite
enumerations carried by the executable receipt, and the theorem does not need
classical choice or an external finite-set library.

The theorem is abstract. It has no patient or treatment semantics.
-/

namespace Darwin.EpistemicRevocationDistance

variable {Evidence Gauge : Type}

def countWhere (predicate : Evidence -> Bool) : List Evidence -> Nat
  | [] => 0
  | evidence :: tail =>
      (if predicate evidence then 1 else 0) + countWhere predicate tail

def blockerCost (active : List Evidence)
    (Excludes : Evidence -> Gauge -> Bool) (gauge : Gauge) : Nat :=
  countWhere (fun evidence => Excludes evidence gauge) active

def revocationCost (active : List Evidence)
    (Revoked : Evidence -> Bool) : Nat :=
  countWhere Revoked active

def Restores (active : List Evidence) (Revoked : Evidence -> Bool)
    (Excludes : Evidence -> Gauge -> Bool) (gauge : Gauge) : Prop :=
  forall evidence,
    evidence ∈ active ->
    Excludes evidence gauge = true ->
    Revoked evidence = true

theorem countWhere_mono_of_pointwise
    (active : List Evidence) (left right : Evidence -> Bool)
    (included : forall evidence,
      evidence ∈ active -> left evidence = true -> right evidence = true) :
    countWhere left active <= countWhere right active := by
  induction active with
  | nil => simp [countWhere]
  | cons head tail inductionHypothesis =>
      have tailIncluded : forall evidence,
          evidence ∈ tail -> left evidence = true -> right evidence = true := by
        intro evidence inTail selected
        exact included evidence (List.mem_cons_of_mem head inTail) selected
      have tailBound := inductionHypothesis tailIncluded
      cases leftHead : left head with
      | false =>
          cases rightHead : right head with
          | false => simpa [countWhere, leftHead, rightHead] using tailBound
          | true =>
              simpa [countWhere, leftHead, rightHead] using
                Nat.le_trans tailBound
                  (Nat.le_add_left (countWhere right tail) 1)
      | true =>
          have rightHead : right head = true :=
            included head (by simp) leftHead
          simp [countWhere, leftHead, rightHead, tailBound]

theorem blockers_restore
    (active : List Evidence)
    (Excludes : Evidence -> Gauge -> Bool) (gauge : Gauge) :
    Restores active (fun evidence => Excludes evidence gauge)
      Excludes gauge := by
  intro evidence _inActive excluded
  exact excluded

theorem restoration_cost_lower_bound
    (active : List Evidence) (Revoked : Evidence -> Bool)
    (Excludes : Evidence -> Gauge -> Bool) (gauge : Gauge)
    (restores : Restores active Revoked Excludes gauge) :
    blockerCost active Excludes gauge <= revocationCost active Revoked := by
  exact countWhere_mono_of_pointwise active
    (fun evidence => Excludes evidence gauge) Revoked restores

def revocationDistance (active : List Evidence) (head : Gauge)
    (tail : List Gauge) (Excludes : Evidence -> Gauge -> Bool) : Nat :=
  match tail with
  | [] => blockerCost active Excludes head
  | next :: rest => Nat.min (blockerCost active Excludes head)
      (revocationDistance active next rest Excludes)

theorem revocation_distance_le_blocker_cost
    (active : List Evidence) (head : Gauge) (tail : List Gauge)
    (Excludes : Evidence -> Gauge -> Bool)
    (gauge : Gauge) (gaugeBad : gauge ∈ head :: tail) :
    revocationDistance active head tail Excludes <=
      blockerCost active Excludes gauge := by
  induction tail generalizing head with
  | nil =>
      simp only [List.mem_cons, List.not_mem_nil, or_false] at gaugeBad
      subst gauge
      simp [revocationDistance]
  | cons next rest inductionHypothesis =>
      simp only [revocationDistance]
      simp only [List.mem_cons] at gaugeBad
      rcases gaugeBad with gaugeAtHead | gaugeInTail
      · subst gauge
        exact Nat.min_le_left _ _
      · have gaugeInNext : gauge ∈ next :: rest := by
          simpa only [List.mem_cons] using gaugeInTail
        exact Nat.le_trans (Nat.min_le_right _ _)
          (inductionHypothesis (head := next) (gaugeBad := gaugeInNext))

theorem exists_exact_minimum_blocker
    (active : List Evidence) (head : Gauge) (tail : List Gauge)
    (Excludes : Evidence -> Gauge -> Bool) :
    Exists fun gauge =>
      gauge ∈ head :: tail /\
      blockerCost active Excludes gauge =
        revocationDistance active head tail Excludes := by
  induction tail generalizing head with
  | nil =>
      exact ⟨head, by simp, rfl⟩
  | cons next rest inductionHypothesis =>
      simp only [revocationDistance]
      by_cases headIsMinimum :
          blockerCost active Excludes head <=
            revocationDistance active next rest Excludes
      · refine ⟨head, by simp, ?_⟩
        exact (Nat.min_eq_left headIsMinimum).symm
      · have tailIsMinimum :
            revocationDistance active next rest Excludes <=
              blockerCost active Excludes head :=
          Nat.le_of_lt (Nat.lt_of_not_ge headIsMinimum)
        rcases inductionHypothesis next with ⟨gauge, gaugeBad, exactCost⟩
        refine ⟨gauge, ?_, ?_⟩
        · exact List.mem_cons_of_mem head gaugeBad
        · calc
            blockerCost active Excludes gauge =
                revocationDistance active next rest Excludes := exactCost
            _ = Nat.min (blockerCost active Excludes head)
                (revocationDistance active next rest Excludes) :=
              (Nat.min_eq_right tailIsMinimum).symm

theorem smaller_than_distance_cannot_restore_bad
    (active : List Evidence) (Revoked : Evidence -> Bool)
    (head : Gauge) (tail : List Gauge)
    (Excludes : Evidence -> Gauge -> Bool)
    (smaller : revocationCost active Revoked <
      revocationDistance active head tail Excludes)
    (gauge : Gauge) (gaugeBad : gauge ∈ head :: tail) :
    Not (Restores active Revoked Excludes gauge) := by
  intro restores
  have distanceLeBlockers := revocation_distance_le_blocker_cost
    active head tail Excludes gauge gaugeBad
  have blockersLeRevoked := restoration_cost_lower_bound
    active Revoked Excludes gauge restores
  exact (Nat.not_lt_of_ge
    (Nat.le_trans distanceLeBlockers blockersLeRevoked)) smaller

theorem exists_exact_minimum_restoration_cut
    (active : List Evidence) (head : Gauge) (tail : List Gauge)
    (Excludes : Evidence -> Gauge -> Bool) :
    Exists fun gauge =>
      gauge ∈ head :: tail /\
      Restores active (fun evidence => Excludes evidence gauge)
        Excludes gauge /\
      blockerCost active Excludes gauge =
        revocationDistance active head tail Excludes := by
  rcases exists_exact_minimum_blocker active head tail Excludes with
    ⟨gauge, gaugeBad, exactCost⟩
  exact ⟨gauge, gaugeBad, blockers_restore active Excludes gauge, exactCost⟩

theorem revocation_distance_is_exact
    (active : List Evidence) (head : Gauge) (tail : List Gauge)
    (Excludes : Evidence -> Gauge -> Bool) :
    (forall Revoked,
      revocationCost active Revoked <
        revocationDistance active head tail Excludes ->
      forall gauge, gauge ∈ head :: tail ->
        Not (Restores active Revoked Excludes gauge)) /\
    (Exists fun gauge =>
      gauge ∈ head :: tail /\
      Restores active (fun evidence => Excludes evidence gauge)
        Excludes gauge /\
      blockerCost active Excludes gauge =
        revocationDistance active head tail Excludes) := by
  constructor
  · intro Revoked smaller gauge gaugeBad
    exact smaller_than_distance_cannot_restore_bad active Revoked head tail
      Excludes smaller gauge gaugeBad
  · exact exists_exact_minimum_restoration_cut active head tail Excludes

end Darwin.EpistemicRevocationDistance
