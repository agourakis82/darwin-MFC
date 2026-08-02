import DeonticTransportFinite

/-!
# Bounded WASM ABI refinement

This file connects the abstract finite-family semantics to the integer-mask ABI
implemented by the Sounio/WASM kernel. It proves refinement for every family of
at most eight abstract decisions, not only for the four captured fixtures.

Masks outside `0..3` and families longer than eight are outside the executable
contract and return `none` in the model. This is abstract research only; actions
have no clinical meaning.
-/

namespace Darwin.DeonticTransport

/-- Stable ABI encoding: empty, A, B, A-or-B. -/
def encodeDecision : Decision → Int
  | .refuse => 0
  | .onlyA => 1
  | .onlyB => 2
  | .both => 3

def decodeDecision : Int → Option Decision
  | 0 => some .refuse
  | 1 => some .onlyA
  | 2 => some .onlyB
  | 3 => some .both
  | _ => none

theorem decodeDecision_encodeDecision (d : Decision) :
    decodeDecision (encodeDecision d) = some d := by
  cases d <;> rfl

def abiValidMask (mask : Int) : Bool :=
  mask == 0 || mask == 1 || mask == 2 || mask == 3

def abiContainsA (mask : Int) : Bool := mask == 1 || mask == 3
def abiContainsB (mask : Int) : Bool := mask == 2 || mask == 3

def abiUnionMasks (left right : Int) : Int :=
  (if abiContainsA left || abiContainsA right then 1 else 0) +
  (if abiContainsB left || abiContainsB right then 2 else 0)

def abiIntersectMasks (left right : Int) : Int :=
  (if abiContainsA left && abiContainsA right then 1 else 0) +
  (if abiContainsB left && abiContainsB right then 2 else 0)

theorem abiValidMask_encodeDecision (d : Decision) :
    abiValidMask (encodeDecision d) = true := by
  cases d <;> decide

theorem abiUnionMasks_encodeDecision (d₁ d₂ : Decision) :
    abiUnionMasks (encodeDecision d₁) (encodeDecision d₂) =
      encodeDecision (unionDecision d₁ d₂) := by
  cases d₁ <;> cases d₂ <;> decide

theorem abiIntersectMasks_encodeDecision (d₁ d₂ : Decision) :
    abiIntersectMasks (encodeDecision d₁) (encodeDecision d₂) =
      encodeDecision (intersectDecision d₁ d₂) := by
  cases d₁ <;> cases d₂ <;> decide

theorem unionDecision_assoc (d₁ d₂ d₃ : Decision) :
    unionDecision (unionDecision d₁ d₂) d₃ =
      unionDecision d₁ (unionDecision d₂ d₃) := by
  cases d₁ <;> cases d₂ <;> cases d₃ <;> rfl

theorem intersectDecision_assoc (d₁ d₂ d₃ : Decision) :
    intersectDecision (intersectDecision d₁ d₂) d₃ =
      intersectDecision d₁ (intersectDecision d₂ d₃) := by
  cases d₁ <;> cases d₂ <;> cases d₃ <;> rfl

theorem encodeDecision_foldl_union (ds : List Decision) (acc : Decision) :
    (ds.map encodeDecision).foldl abiUnionMasks (encodeDecision acc) =
      encodeDecision (ds.foldl unionDecision acc) := by
  induction ds generalizing acc with
  | nil => rfl
  | cons d ds ih =>
      simp only [List.map_cons, List.foldl_cons]
      rw [abiUnionMasks_encodeDecision]
      exact ih (unionDecision acc d)

theorem encodeDecision_foldl_intersection (ds : List Decision) (acc : Decision) :
    (ds.map encodeDecision).foldl abiIntersectMasks (encodeDecision acc) =
      encodeDecision (ds.foldl intersectDecision acc) := by
  induction ds generalizing acc with
  | nil => rfl
  | cons d ds ih =>
      simp only [List.map_cons, List.foldl_cons]
      rw [abiIntersectMasks_encodeDecision]
      exact ih (intersectDecision acc d)

theorem foldl_union_eq_foldr (ds : List Decision) (acc : Decision) :
    ds.foldl unionDecision acc =
      unionDecision acc (ds.foldr unionDecision .refuse) := by
  induction ds generalizing acc with
  | nil => cases acc <;> rfl
  | cons d ds ih =>
      simp only [List.foldl_cons, List.foldr_cons]
      rw [ih, unionDecision_assoc]

theorem foldl_intersection_eq_foldr (ds : List Decision) (acc : Decision) :
    ds.foldl intersectDecision acc =
      intersectDecision acc (ds.foldr intersectDecision .both) := by
  induction ds generalizing acc with
  | nil => cases acc <;> rfl
  | cons d ds ih =>
      simp only [List.foldl_cons, List.foldr_cons]
      rw [ih, intersectDecision_assoc]

theorem identifiedSetMany_eq_foldr (e : Evidence2) (cs : List Context2) :
    identifiedSetMany e cs =
      (cs.map (choose e)).foldr unionDecision .refuse := by
  induction cs with
  | nil => rfl
  | cons c cs ih => simp [identifiedSetMany, ih]

theorem robustCoreMany_eq_foldr (e : Evidence2) (cs : List Context2) :
    robustCoreMany e cs =
      (cs.map (choose e)).foldr intersectDecision .both := by
  induction cs with
  | nil => rfl
  | cons c cs ih => simp [robustCoreMany, ih]

/-- Executable model of the bounded union ABI. -/
def abiUnionMany8 (masks : List Int) : Option Int :=
  if masks.length ≤ 8 ∧ masks.all abiValidMask = true then
    some (masks.foldl abiUnionMasks 0)
  else
    none

/-- Executable model of the bounded intersection ABI. -/
def abiIntersectMany8 (masks : List Int) : Option Int :=
  if masks.length ≤ 8 ∧ masks.all abiValidMask = true then
    some (masks.foldl abiIntersectMasks 3)
  else
    none

private theorem encodedMasks_all_valid (ds : List Decision) :
    (ds.map encodeDecision).all abiValidMask = true := by
  induction ds with
  | nil => rfl
  | cons d ds ih =>
      simp [abiValidMask_encodeDecision, ih]

theorem abiUnionMany8_refines_decisions (ds : List Decision)
    (h : ds.length ≤ 8) :
    abiUnionMany8 (ds.map encodeDecision) =
      some (encodeDecision (ds.foldl unionDecision .refuse)) := by
  have hvalid :
      (ds.map encodeDecision).length ≤ 8 ∧
        (ds.map encodeDecision).all abiValidMask = true := by
    exact ⟨by simpa using h, encodedMasks_all_valid ds⟩
  rw [abiUnionMany8, if_pos hvalid]
  simpa only [encodeDecision] using
    congrArg some (encodeDecision_foldl_union ds .refuse)

theorem abiIntersectMany8_refines_decisions (ds : List Decision)
    (h : ds.length ≤ 8) :
    abiIntersectMany8 (ds.map encodeDecision) =
      some (encodeDecision (ds.foldl intersectDecision .both)) := by
  have hvalid :
      (ds.map encodeDecision).length ≤ 8 ∧
        (ds.map encodeDecision).all abiValidMask = true := by
    exact ⟨by simpa using h, encodedMasks_all_valid ds⟩
  rw [abiIntersectMany8, if_pos hvalid]
  simpa only [encodeDecision] using
    congrArg some (encodeDecision_foldl_intersection ds .both)

private theorem map_encode_choose (e : Evidence2) (cs : List Context2) :
    cs.map (fun c => encodeDecision (choose e c)) =
      (cs.map (choose e)).map encodeDecision := by
  induction cs with
  | nil => rfl
  | cons c cs ih => simp only [List.map_cons, ih]

theorem foldl_choose_union_eq_identifiedSetMany
    (e : Evidence2) (cs : List Context2) :
    (cs.map (choose e)).foldl unionDecision .refuse = identifiedSetMany e cs := by
  rw [foldl_union_eq_foldr, identifiedSetMany_eq_foldr]
  rfl

theorem foldl_choose_intersection_eq_robustCoreMany
    (e : Evidence2) (cs : List Context2) :
    (cs.map (choose e)).foldl intersectDecision .both = robustCoreMany e cs := by
  rw [foldl_intersection_eq_foldr, robustCoreMany_eq_foldr]
  rfl

theorem abiUnionMany8_refines_identifiedSetMany
    (e : Evidence2) (cs : List Context2) (h : cs.length ≤ 8) :
    abiUnionMany8 (cs.map (fun c => encodeDecision (choose e c))) =
      some (encodeDecision (identifiedSetMany e cs)) := by
  have hm : (cs.map (choose e)).length ≤ 8 := by simpa using h
  rw [map_encode_choose]
  rw [abiUnionMany8_refines_decisions (cs.map (choose e)) hm]
  rw [foldl_choose_union_eq_identifiedSetMany]

theorem abiIntersectMany8_refines_robustCoreMany
    (e : Evidence2) (cs : List Context2) (h : cs.length ≤ 8) :
    abiIntersectMany8 (cs.map (fun c => encodeDecision (choose e c))) =
      some (encodeDecision (robustCoreMany e cs)) := by
  have hm : (cs.map (choose e)).length ≤ 8 := by simpa using h
  rw [map_encode_choose]
  rw [abiIntersectMany8_refines_decisions (cs.map (choose e)) hm]
  rw [foldl_choose_intersection_eq_robustCoreMany]

/-- Stable ABI encoding for the four identification states. -/
def encodeIdentificationState : IdentificationState → Int
  | .refused => 0
  | .identifiedA => 1
  | .identifiedB => 2
  | .partialAbstain => 3

def abiClassify (identified core : Int) : Int :=
  if identified == 0 then 0
  else if identified == 1 && core == 1 then 1
  else if identified == 2 && core == 2 then 2
  else 3

theorem abiClassify_refines (identified core : Decision) :
    abiClassify (encodeDecision identified) (encodeDecision core) =
      encodeIdentificationState (classify identified core) := by
  cases identified <;> cases core <;> decide

/-- Result code used at the no-string WASM boundary. -/
def abiCaseCodeMany8 (masks : List Int) : Option Int :=
  match abiUnionMany8 masks, abiIntersectMany8 masks with
  | some identified, some core =>
      some (identified + core * 4 + abiClassify identified core * 16)
  | _, _ => none

/-- Main bounded-refinement theorem: for every admissible family of at most
    eight contexts, the ABI result is exactly the encoded abstract semantics. -/
theorem abiCaseCodeMany8_refines
    (e : Evidence2) (cs : List Context2) (h : cs.length ≤ 8) :
    abiCaseCodeMany8 (cs.map (fun c => encodeDecision (choose e c))) =
      some (
        encodeDecision (identifiedSetMany e cs) +
        encodeDecision (robustCoreMany e cs) * 4 +
        encodeIdentificationState
          (classify (identifiedSetMany e cs) (robustCoreMany e cs)) * 16
      ) := by
  simp only [abiCaseCodeMany8]
  rw [abiUnionMany8_refines_identifiedSetMany e cs h]
  rw [abiIntersectMany8_refines_robustCoreMany e cs h]
  simpa only using congrArg some
    (congrArg (fun state =>
      encodeDecision (identifiedSetMany e cs) +
        encodeDecision (robustCoreMany e cs) * 4 + state * 16)
      (abiClassify_refines
        (identifiedSetMany e cs)
        (robustCoreMany e cs)))

theorem abiUnionMany8_rejects_oversized (masks : List Int)
    (h : 8 < masks.length) : abiUnionMany8 masks = none := by
  simp [abiUnionMany8, Nat.not_le.mpr h]

theorem abiIntersectMany8_rejects_oversized (masks : List Int)
    (h : 8 < masks.length) : abiIntersectMany8 masks = none := by
  simp [abiIntersectMany8, Nat.not_le.mpr h]

end Darwin.DeonticTransport
