/-!
# Darwin Revocable Normative Influence

Post-revocation memory sanitization, no residual influence, zero-error forced
abstention, and abstract support/cut certificates. Recommendations remain
uninterpreted symbols. This file has no clinical semantics.
-/

namespace Darwin.RevocableInfluence

universe uW uQ uA uR uRole uSeed

abbrev Memory (Query : Type uQ) (Answer : Type uA) :=
  Query -> Option Answer

inductive DecisionOutcome (Recommendation : Type uR) where
  | refuse
  | abstain
  | emit (recommendation : Recommendation)
  deriving DecidableEq, Repr

structure RevocationModel
    (World : Type uW) (Query : Type uQ) (Answer : Type uA)
    (Recommendation : Type uR) (Role : Type uRole) where
  admissible : World -> Prop
  priorAuthorized : Role -> Query -> Bool
  currentAuthorized : Role -> Query -> Bool
  authorityNarrows : forall role query,
    currentAuthorized role query = true -> priorAuthorized role query = true
  answer : World -> Query -> Answer
  recommendation : World -> Recommendation

def viewUnder
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (authorized : Role -> Query -> Bool)
    (role : Role) (world : World) : Memory Query Answer :=
  fun query =>
    if authorized role query then some (model.answer world query) else none

def priorView
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (role : Role) (world : World) : Memory Query Answer :=
  viewUnder model model.priorAuthorized role world

def currentView
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (role : Role) (world : World) : Memory Query Answer :=
  viewUnder model model.currentAuthorized role world

def sanitizeBy
    {Query : Type uQ} {Answer : Type uA}
    (active : Query -> Bool) (memory : Memory Query Answer) :
    Memory Query Answer :=
  fun query => if active query then memory query else none

def sanitizeCurrent
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (role : Role) (memory : Memory Query Answer) : Memory Query Answer :=
  sanitizeBy (model.currentAuthorized role) memory

theorem sanitizePriorView
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (role : Role) (world : World) :
    sanitizeCurrent model role (priorView model role world) =
      currentView model role world := by
  funext query
  cases current : model.currentAuthorized role query with
  | false =>
      simp [sanitizeCurrent, sanitizeBy, currentView, viewUnder, current]
  | true =>
      have prior := model.authorityNarrows role query current
      simp [sanitizeCurrent, sanitizeBy, priorView, currentView, viewUnder,
        current, prior]

abbrev DecisionEngine
    (Query : Type uQ) (Answer : Type uA) (Recommendation : Type uR) :=
  Memory Query Answer -> DecisionOutcome Recommendation

def retainedHistoryRun
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (role : Role) (engine : DecisionEngine Query Answer Recommendation)
    (world : World) : DecisionOutcome Recommendation :=
  engine (priorView model role world)

def postRevocationRun
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (role : Role) (engine : DecisionEngine Query Answer Recommendation)
    (world : World) : DecisionOutcome Recommendation :=
  engine (currentView model role world)

theorem postRevocationRunUsesCurrentView
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (role : Role) (engine : DecisionEngine Query Answer Recommendation)
    (world : World) :
    postRevocationRun model role engine world =
      engine (currentView model role world) := by
  rfl

/-- Executing from retained history after sanitization is extensionally equal to
    the canonical run over the current legitimate view. This compatibility lemma
    is deliberately outside the central no-residual-influence axiom path. -/
theorem sanitizedRetainedHistoryEqualsPostRevocationRun
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (role : Role) (engine : DecisionEngine Query Answer Recommendation)
    (world : World) :
    engine (sanitizeCurrent model role (priorView model role world)) =
      postRevocationRun model role engine world := by
  rw [sanitizePriorView]
  rfl

def NoResidualInfluence
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (role : Role) (engine : DecisionEngine Query Answer Recommendation) : Prop :=
  forall world0 world1,
    currentView model role world0 = currentView model role world1 ->
      postRevocationRun model role engine world0 =
        postRevocationRun model role engine world1

theorem sanitizedEngineNoResidualInfluence
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (role : Role) (engine : DecisionEngine Query Answer Recommendation) :
    NoResidualInfluence model role engine := by
  intro world0 world1 sameCurrentView
  rw [postRevocationRunUsesCurrentView, postRevocationRunUsesCurrentView,
    sameCurrentView]

def PostRevocationZeroError
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (role : Role) (engine : DecisionEngine Query Answer Recommendation) : Prop :=
  forall world, model.admissible world ->
    match postRevocationRun model role engine world with
    | .emit candidate => candidate = model.recommendation world
    | .refuse => True
    | .abstain => True

def PostRevocationNonRefusing
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (role : Role) (engine : DecisionEngine Query Answer Recommendation) : Prop :=
  forall world, model.admissible world ->
    postRevocationRun model role engine world ≠ .refuse

/-- If current legitimate views are equal but required recommendations differ,
    a sanitized zero-error non-refusing engine must abstain. -/
theorem postRevocationZeroErrorForcesAbstention
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (role : Role) (engine : DecisionEngine Query Answer Recommendation)
    (world0 world1 : World)
    (h0 : model.admissible world0)
    (h1 : model.admissible world1)
    (sameCurrentView : currentView model role world0 =
      currentView model role world1)
    (differentRecommendation :
      model.recommendation world0 ≠ model.recommendation world1)
    (sound : PostRevocationZeroError model role engine)
    (nonRefusing : PostRevocationNonRefusing model role engine) :
    postRevocationRun model role engine world0 = .abstain := by
  have sameOutcome := sanitizedEngineNoResidualInfluence model role engine
    world0 world1 sameCurrentView
  have sound0 := sound world0 h0
  have sound1 := sound world1 h1
  have notRefused := nonRefusing world0 h0
  cases outcome : postRevocationRun model role engine world0 with
  | refuse =>
      exfalso
      exact notRefused outcome
  | abstain => rfl
  | emit candidate =>
      have candidate0 : candidate = model.recommendation world0 := by
        rw [outcome] at sound0
        exact sound0
      have outcome1 :
          postRevocationRun model role engine world1 = .emit candidate := by
        rw [← sameOutcome]
        exact outcome
      have candidate1 : candidate = model.recommendation world1 := by
        rw [outcome1] at sound1
        exact sound1
      exfalso
      apply differentRecommendation
      exact candidate0.symm.trans candidate1

theorem seededPostRevocationZeroErrorForcesAbstention
    {Seed : Type uSeed}
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (role : Role) (strategy : Seed -> DecisionEngine Query Answer Recommendation)
    (world0 world1 : World)
    (h0 : model.admissible world0)
    (h1 : model.admissible world1)
    (sameCurrentView : currentView model role world0 =
      currentView model role world1)
    (differentRecommendation :
      model.recommendation world0 ≠ model.recommendation world1)
    (sound : forall seed, PostRevocationZeroError model role (strategy seed))
    (nonRefusing : forall seed,
      PostRevocationNonRefusing model role (strategy seed)) :
    forall seed,
      postRevocationRun model role (strategy seed) world0 = .abstain := by
  intro seed
  exact postRevocationZeroErrorForcesAbstention model role (strategy seed)
    world0 world1 h0 h1 sameCurrentView differentRecommendation
    (sound seed) (nonRefusing seed)

def allRevoked (_ : Bool) : Bool := false

def historicalFalse : Memory Bool Bool := fun _ => some false

def historicalTrue : Memory Bool Bool := fun _ => some true

def leakyEngine : DecisionEngine Bool Bool Bool :=
  fun memory =>
    match memory false with
    | some true => .emit true
    | _ => .emit false

theorem revokedMemoriesSanitizeEqual :
    sanitizeBy allRevoked historicalFalse =
      sanitizeBy allRevoked historicalTrue := by
  funext query
  simp [sanitizeBy, allRevoked]

theorem unsanitizedResidualInfluenceExists :
    leakyEngine historicalFalse ≠ leakyEngine historicalTrue := by
  decide

def QueryIncluded
    {Query : Type uQ} (left right : Query -> Bool) : Prop :=
  forall query, left query = true -> right query = true

def StrictQueryIncluded
    {Query : Type uQ} (left right : Query -> Bool) : Prop :=
  QueryIncluded left right ∧ ¬ QueryIncluded right left

def unionMask
    {Query : Type uQ} (left right : Query -> Bool) : Query -> Bool :=
  fun query => left query || right query

def subtractMask
    {Query : Type uQ} (original cut : Query -> Bool) : Query -> Bool :=
  fun query => original query && !cut query

def priorMask
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (role : Role) : Query -> Bool :=
  model.priorAuthorized role

def currentMask
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (role : Role) : Query -> Bool :=
  model.currentAuthorized role

def revokedMask
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (role : Role) : Query -> Bool :=
  fun query =>
    model.priorAuthorized role query && !model.currentAuthorized role query

def maskedView
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (allowed : Query -> Bool) (world : World) : Memory Query Answer :=
  fun query => if allowed query then some (model.answer world query) else none

def IdentifiesRecommendation
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (allowed : Query -> Bool) : Prop :=
  forall world0 world1,
    model.admissible world0 -> model.admissible world1 ->
    model.recommendation world0 ≠ model.recommendation world1 ->
      maskedView model allowed world0 ≠ maskedView model allowed world1

structure SurvivalBasisCertificate
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (role : Role) where
  basis : Query -> Bool
  withinCurrent : QueryIncluded basis (currentMask model role)
  identifies : IdentifiesRecommendation model basis
  inclusionMinimal : forall candidate,
    StrictQueryIncluded candidate basis ->
      ¬ IdentifiesRecommendation model candidate

structure ResidualRestoreCertificate
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (role : Role) where
  restore : Query -> Bool
  priorIdentifies : IdentifiesRecommendation model (priorMask model role)
  currentFails : ¬ IdentifiesRecommendation model (currentMask model role)
  withinRevoked : QueryIncluded restore (revokedMask model role)
  restores : IdentifiesRecommendation model
    (unionMask (currentMask model role) restore)
  inclusionMinimal : forall candidate,
    StrictQueryIncluded candidate restore ->
      ¬ IdentifiesRecommendation model
        (unionMask (currentMask model role) candidate)

structure RevocationCutCertificate
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (role : Role) where
  cut : Query -> Bool
  priorIdentifies : IdentifiesRecommendation model (priorMask model role)
  withinPrior : QueryIncluded cut (priorMask model role)
  destroys : ¬ IdentifiesRecommendation model
    (subtractMask (priorMask model role) cut)
  inclusionMinimal : forall candidate,
    StrictQueryIncluded candidate cut ->
      IdentifiesRecommendation model
        (subtractMask (priorMask model role) candidate)

theorem currentUnionRevokedEqualsPrior
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (role : Role) :
    unionMask (currentMask model role) (revokedMask model role) =
      priorMask model role := by
  funext query
  cases current : model.currentAuthorized role query with
  | false =>
      cases prior : model.priorAuthorized role query <;>
        simp [unionMask, currentMask, revokedMask, priorMask, current, prior]
  | true =>
      have prior := model.authorityNarrows role query current
      simp [unionMask, currentMask, revokedMask, priorMask, current, prior]

theorem fullRevokedRestoreIdentifies
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : RevocationModel World Query Answer Recommendation Role)
    (role : Role)
    (priorIdentifies :
      IdentifiesRecommendation model (priorMask model role)) :
    IdentifiesRecommendation model
      (unionMask (currentMask model role) (revokedMask model role)) := by
  rw [currentUnionRevokedEqualsPrior]
  exact priorIdentifies

end Darwin.RevocableInfluence
