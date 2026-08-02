/-!
# Darwin Auctoritas

An abstract theorem and finite positive/negative witnesses for
authority-constrained identifiability. All recommendations are uninterpreted
symbols. This file has no clinical semantics.
-/

namespace Darwin.Auctoritas

universe uW uQ uA uR uRole

/-- A world model with an explicit admissibility predicate and authority map. -/
structure AuthorityModel
    (World : Type uW) (Query : Type uQ) (Answer : Type uA)
    (Recommendation : Type uR) (Role : Type uRole) where
  admissible : World -> Prop
  authorized : Role -> Query -> Bool
  answer : World -> Query -> Answer
  recommendation : World -> Recommendation

/-- Everything a role could legitimately learn inside the declared query
    universe. Unauthorized answers are hidden. -/
def legitimateView
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : AuthorityModel World Query Answer Recommendation Role)
    (role : Role) (world : World) : Query -> Option Answer :=
  fun query =>
    if model.authorized role query then some (model.answer world query) else none

/-- Correct identification from the maximal legitimate view for every
    admissible world. -/
def IdentifiesByLegitimateView
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : AuthorityModel World Query Answer Recommendation Role)
    (role : Role)
    (algorithm : (Query -> Option Answer) -> Recommendation) : Prop :=
  forall world, model.admissible world ->
    algorithm (legitimateView model role world) = model.recommendation world

/-- No Legitimate Query Theorem: two admissible worlds with the same maximal
    legitimate view and different required recommendations rule out a correct
    authority-compliant identifier. -/
theorem noLegitimateQuery
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : AuthorityModel World Query Answer Recommendation Role)
    (role : Role) (world0 world1 : World)
    (h0 : model.admissible world0)
    (h1 : model.admissible world1)
    (sameView : legitimateView model role world0 =
      legitimateView model role world1)
    (differentRecommendation :
      model.recommendation world0 ≠ model.recommendation world1) :
    ¬ (exists algorithm, IdentifiesByLegitimateView model role algorithm) := by
  rintro ⟨algorithm, identifies⟩
  have correct0 := identifies world0 h0
  have correct1 := identifies world1 h1
  apply differentRecommendation
  calc
    model.recommendation world0 = algorithm (legitimateView model role world0) :=
      correct0.symm
    _ = algorithm (legitimateView model role world1) := congrArg algorithm sameView
    _ = model.recommendation world1 := correct1

/-- Any correct identifier for worlds requiring different recommendations must
    receive different legitimate views. -/
theorem identificationRequiresLegitimateSeparation
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : AuthorityModel World Query Answer Recommendation Role)
    (role : Role) (world0 world1 : World)
    (h0 : model.admissible world0)
    (h1 : model.admissible world1)
    (differentRecommendation :
      model.recommendation world0 ≠ model.recommendation world1)
    (identifierExists :
      exists algorithm, IdentifiesByLegitimateView model role algorithm) :
    legitimateView model role world0 ≠ legitimateView model role world1 := by
  intro sameView
  exact noLegitimateQuery model role world0 world1 h0 h1 sameView
    differentRecommendation identifierExists

/-- A partial identifier is sound when every recommendation it emits is the
    world's required recommendation. Returning `none` is always permitted. -/
def SoundPartialByLegitimateView
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : AuthorityModel World Query Answer Recommendation Role)
    (role : Role)
    (algorithm : (Query -> Option Answer) -> Option Recommendation) : Prop :=
  forall world, model.admissible world ->
    match algorithm (legitimateView model role world) with
    | none => True
    | some candidate => candidate = model.recommendation world

/-- Forced Abstention Theorem: a sound partial identifier must abstain on two
    admissible, legitimately indistinguishable worlds that require different
    recommendations. -/
theorem soundnessForcesAbstention
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : AuthorityModel World Query Answer Recommendation Role)
    (role : Role) (world0 world1 : World)
    (algorithm : (Query -> Option Answer) -> Option Recommendation)
    (h0 : model.admissible world0)
    (h1 : model.admissible world1)
    (sameView : legitimateView model role world0 =
      legitimateView model role world1)
    (differentRecommendation :
      model.recommendation world0 ≠ model.recommendation world1)
    (sound : SoundPartialByLegitimateView model role algorithm) :
    algorithm (legitimateView model role world0) = none := by
  have sound0 := sound world0 h0
  have sound1 := sound world1 h1
  cases output : algorithm (legitimateView model role world0) with
  | none => rfl
  | some candidate =>
      have candidate0 : candidate = model.recommendation world0 := by
        simpa [output] using sound0
      have output1 :
          algorithm (legitimateView model role world1) = some candidate := by
        rw [← sameView]
        exact output
      have candidate1 : candidate = model.recommendation world1 := by
        simpa [output1] using sound1
      exfalso
      apply differentRecommendation
      exact candidate0.symm.trans candidate1

inductive WitnessWorld where
  | world0
  | world1
  deriving DecidableEq, Repr

inductive WitnessQuery where
  | causal
  | mandate
  deriving DecidableEq, Repr

inductive WitnessAnswer where
  | no
  | yes
  deriving DecidableEq, Repr

inductive WitnessRecommendation where
  | optionA
  | optionB
  deriving DecidableEq, Repr

inductive WitnessRole where
  | local
  | joint
  deriving DecidableEq, Repr

/-- The local role may inspect the causal query. The joint role may also
    inspect the mandate query. Both worlds agree causally and disagree only on
    mandate and recommendation. -/
def witnessModel : AuthorityModel WitnessWorld WitnessQuery WitnessAnswer
    WitnessRecommendation WitnessRole where
  admissible := fun _ => True
  authorized := fun role query =>
    match role, query with
    | .local, .causal => true
    | .local, .mandate => false
    | .joint, _ => true
  answer := fun world query =>
    match world, query with
    | _, .causal => .yes
    | .world0, .mandate => .no
    | .world1, .mandate => .yes
  recommendation := fun world =>
    match world with
    | .world0 => .optionA
    | .world1 => .optionB

theorem localWorldsIndistinguishable :
    legitimateView witnessModel .local .world0 =
      legitimateView witnessModel .local .world1 := by
  funext query
  cases query <;> simp [legitimateView, witnessModel]

/-- Concrete negative witness for the central theorem. -/
theorem localRoleCannotIdentify :
    ¬ (exists algorithm,
      IdentifiesByLegitimateView witnessModel .local algorithm) := by
  exact noLegitimateQuery witnessModel .local .world0 .world1
    (by trivial) (by trivial) localWorldsIndistinguishable (by decide)

theorem localSoundPartialMustAbstain
    (algorithm :
      (WitnessQuery -> Option WitnessAnswer) -> Option WitnessRecommendation)
    (sound : SoundPartialByLegitimateView witnessModel .local algorithm) :
    algorithm (legitimateView witnessModel .local .world0) = none := by
  exact soundnessForcesAbstention witnessModel .local .world0 .world1
    algorithm (by trivial) (by trivial) localWorldsIndistinguishable
    (by decide) sound

/-- A positive control: expanded joint authority makes the same two-world
    family identifiable. -/
noncomputable def jointIdentifier
    (view : WitnessQuery -> Option WitnessAnswer) : WitnessRecommendation :=
  match view .mandate with
  | some .yes => .optionB
  | _ => .optionA

theorem jointRoleCanIdentify :
    IdentifiesByLegitimateView witnessModel .joint jointIdentifier := by
  intro world _
  cases world <;> simp [jointIdentifier, legitimateView, witnessModel]

/-- Stable executable dispositions for the bounded witness. -/
inductive AuthorityDisposition where
  | refuse
  | identified
  | ask
  | delegate
  | abstainAuthority
  deriving DecidableEq, Repr

/-- Boolean normal form of a valid or invalid two-world, two-query ABI state. -/
structure PairCase where
  authorizedQ0 : Bool
  authorizedQ1 : Bool
  observedQ0 : Bool
  observedQ1 : Bool
  answersDifferQ0 : Bool
  answersDifferQ1 : Bool
  recommendationsDiffer : Bool
  deriving DecidableEq, Repr

def PairCase.valid (input : PairCase) : Bool :=
  (!input.observedQ0 || input.authorizedQ0) &&
    (!input.observedQ1 || input.authorizedQ1)

/-- Typed reference semantics mirrored by the integer Sounio ABI. -/
def classifyPair (input : PairCase) : AuthorityDisposition :=
  if !input.valid then .refuse
  else if !input.recommendationsDiffer then .identified
  else if
    (input.observedQ0 && input.answersDifferQ0) ||
      (input.observedQ1 && input.answersDifferQ1)
  then .identified
  else if
    (input.authorizedQ0 && input.answersDifferQ0) ||
      (input.authorizedQ1 && input.answersDifferQ1)
  then .ask
  else if input.answersDifferQ0 || input.answersDifferQ1 then .delegate
  else .abstainAuthority

theorem abstainAuthorityIff (input : PairCase) :
    classifyPair input = .abstainAuthority <->
      input.valid = true ∧ input.recommendationsDiffer = true ∧
      input.answersDifferQ0 = false ∧ input.answersDifferQ1 = false := by
  cases input with
  | mk a0 a1 o0 o1 d0 d1 rd =>
      cases a0 <;> cases a1 <;> cases o0 <;> cases o1 <;>
        cases d0 <;> cases d1 <;> cases rd <;> decide

theorem askImpliesAuthorizedSeparator (input : PairCase) :
    classifyPair input = .ask ->
      (input.authorizedQ0 && input.answersDifferQ0) = true ||
      (input.authorizedQ1 && input.answersDifferQ1) = true := by
  cases input with
  | mk a0 a1 o0 o1 d0 d1 rd =>
      cases a0 <;> cases a1 <;> cases o0 <;> cases o1 <;>
        cases d0 <;> cases d1 <;> cases rd <;> decide

theorem delegateImpliesOnlyUnauthorizedSeparation (input : PairCase) :
    classifyPair input = .delegate ->
      (input.answersDifferQ0 || input.answersDifferQ1) = true ∧
      ((input.authorizedQ0 && input.answersDifferQ0) ||
        (input.authorizedQ1 && input.answersDifferQ1)) = false := by
  cases input with
  | mk a0 a1 o0 o1 d0 d1 rd =>
      cases a0 <;> cases a1 <;> cases o0 <;> cases o1 <;>
        cases d0 <;> cases d1 <;> cases rd <;> decide

end Darwin.Auctoritas
