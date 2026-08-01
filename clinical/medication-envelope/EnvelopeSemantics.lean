namespace DarwinMedicationEnvelope

inductive Disposition where
  | refuse
  | block
  | review
  | withinReviewedEnvelope
  deriving DecidableEq, Repr

structure Inputs where
  integrityValid : Bool
  blockerMask : Nat
  reviewMask : Nat
  unknownCount : Nat

def evaluate (input : Inputs) : Disposition :=
  if !input.integrityValid then .refuse
  else if input.blockerMask != 0 then .block
  else if input.reviewMask != 0 || input.unknownCount != 0 then .review
  else .withinReviewedEnvelope

theorem integrity_failure_refuses (input : Inputs) (h : input.integrityValid = false) :
    evaluate input = .refuse := by
  simp [evaluate, h]

theorem blocker_cannot_be_within (input : Inputs) (hi : input.integrityValid = true)
    (hb : input.blockerMask != 0) :
    evaluate input != .withinReviewedEnvelope := by
  simp [evaluate, hi, hb]

theorem within_has_no_known_exception (input : Inputs)
    (h : evaluate input = .withinReviewedEnvelope) :
    input.integrityValid = true ∧ input.blockerMask = 0 ∧
      input.reviewMask = 0 ∧ input.unknownCount = 0 := by
  cases hi : input.integrityValid with
  | false => simp [evaluate, hi] at h
  | true =>
    by_cases hb : input.blockerMask = 0
    · by_cases hr : input.reviewMask = 0
      · by_cases hu : input.unknownCount = 0
        · exact ⟨rfl, hb, hr, hu⟩
        · simp [evaluate, hi, hb, hr, hu] at h
      · simp [evaluate, hi, hb, hr] at h
    · simp [evaluate, hi, hb] at h

end DarwinMedicationEnvelope
