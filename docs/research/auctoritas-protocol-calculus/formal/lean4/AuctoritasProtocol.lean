/-!
# Darwin Auctoritas Protocol Calculus

Well-founded adaptive protocols, seed-indexed randomized strategies, static
coalitions, and authority expansion. Recommendations remain uninterpreted
symbols. This file has no clinical semantics.
-/

namespace Darwin.AuctoritasProtocol

universe uW uQ uA uR uRole uSeed

structure AuthorityModel
    (World : Type uW) (Query : Type uQ) (Answer : Type uA)
    (Recommendation : Type uR) (Role : Type uRole) where
  admissible : World -> Prop
  authorized : Role -> Query -> Bool
  answer : World -> Query -> Answer
  recommendation : World -> Recommendation

def legitimateView
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : AuthorityModel World Query Answer Recommendation Role)
    (role : Role) (world : World) : Query -> Option Answer :=
  fun query =>
    if model.authorized role query then some (model.answer world query) else none

inductive ProtocolOutcome (Recommendation : Type uR) where
  | refuse
  | abstain
  | emit (recommendation : Recommendation)
  deriving DecidableEq, Repr

/-- A well-founded adaptive protocol. The next query may depend on every answer seen
    so far because continuations are answer-indexed subprotocols. -/
inductive Protocol
    (Query : Type uQ) (Answer : Type uA) (Recommendation : Type uR) where
  | abstain
  | emit (recommendation : Recommendation)
  | ask (query : Query) (next : Answer -> Protocol Query Answer Recommendation)

def runProtocol
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : AuthorityModel World Query Answer Recommendation Role)
    (role : Role) (world : World) :
    Protocol Query Answer Recommendation -> ProtocolOutcome Recommendation
  | .abstain => .abstain
  | .emit recommendation => .emit recommendation
  | .ask query next =>
      if model.authorized role query then
        runProtocol model role world (next (model.answer world query))
      else
        .refuse

/-- Every possible branch of an authority-compliant protocol asks only
    authorized queries. -/
def AuthorityCompliant
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : AuthorityModel World Query Answer Recommendation Role)
    (role : Role) : Protocol Query Answer Recommendation -> Prop
  | .abstain => True
  | .emit _ => True
  | .ask query next =>
      model.authorized role query = true ∧
        forall answer, AuthorityCompliant model role (next answer)

def ZeroErrorSound
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : AuthorityModel World Query Answer Recommendation Role)
    (role : Role) (protocol : Protocol Query Answer Recommendation) : Prop :=
  forall world, model.admissible world ->
    match runProtocol model role world protocol with
    | .emit candidate => candidate = model.recommendation world
    | .refuse => True
    | .abstain => True

theorem authorizedAnswersEqual
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : AuthorityModel World Query Answer Recommendation Role)
    (role : Role) (world0 world1 : World) (query : Query)
    (sameView : legitimateView model role world0 =
      legitimateView model role world1)
    (authorized : model.authorized role query = true) :
    model.answer world0 query = model.answer world1 query := by
  have pointwise := congrFun sameView query
  change
    (if model.authorized role query then some (model.answer world0 query) else none) =
      (if model.authorized role query then some (model.answer world1 query) else none)
    at pointwise
  rw [authorized] at pointwise
  exact Option.some.inj pointwise

theorem compliantProtocolNeverRefuses
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : AuthorityModel World Query Answer Recommendation Role)
    (role : Role) (world : World)
    (protocol : Protocol Query Answer Recommendation)
    (compliant : AuthorityCompliant model role protocol) :
    runProtocol model role world protocol ≠ .refuse := by
  induction protocol with
  | abstain =>
      intro impossible
      cases impossible
  | emit recommendation =>
      intro impossible
      cases impossible
  | ask query next ih =>
      rcases compliant with ⟨authorized, branches⟩
      change
        (if model.authorized role query then
          runProtocol model role world (next (model.answer world query))
        else .refuse) ≠ .refuse
      rw [authorized]
      exact ih (model.answer world query) (branches (model.answer world query))

/-- Adaptive No-Escape Theorem: a compliant well-founded protocol has the same
    outcome in worlds with the same maximal legitimate view. -/
theorem adaptiveNoEscape
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : AuthorityModel World Query Answer Recommendation Role)
    (role : Role) (world0 world1 : World)
    (protocol : Protocol Query Answer Recommendation)
    (sameView : legitimateView model role world0 =
      legitimateView model role world1)
    (compliant : AuthorityCompliant model role protocol) :
    runProtocol model role world0 protocol =
      runProtocol model role world1 protocol := by
  induction protocol with
  | abstain => rfl
  | emit recommendation => rfl
  | ask query next ih =>
      rcases compliant with ⟨authorized, branches⟩
      have sameAnswer := authorizedAnswersEqual model role world0 world1 query
        sameView authorized
      change
        (if model.authorized role query then
          runProtocol model role world0 (next (model.answer world0 query))
        else .refuse) =
        (if model.authorized role query then
          runProtocol model role world1 (next (model.answer world1 query))
        else .refuse)
      rw [authorized, sameAnswer]
      exact ih (model.answer world1 query) (branches (model.answer world1 query))

/-- Adaptive Forced Abstention Theorem: zero-error soundness turns
    indistinguishability into a required abstention, not a heuristic one. -/
theorem adaptiveZeroErrorForcesAbstention
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : AuthorityModel World Query Answer Recommendation Role)
    (role : Role) (world0 world1 : World)
    (protocol : Protocol Query Answer Recommendation)
    (h0 : model.admissible world0)
    (h1 : model.admissible world1)
    (sameView : legitimateView model role world0 =
      legitimateView model role world1)
    (differentRecommendation :
      model.recommendation world0 ≠ model.recommendation world1)
    (compliant : AuthorityCompliant model role protocol)
    (sound : ZeroErrorSound model role protocol) :
    runProtocol model role world0 protocol = .abstain := by
  have sameOutcome := adaptiveNoEscape model role world0 world1 protocol
    sameView compliant
  have notRefused := compliantProtocolNeverRefuses model role world0 protocol
    compliant
  have sound0 := sound world0 h0
  have sound1 := sound world1 h1
  cases outcome : runProtocol model role world0 protocol with
  | refuse =>
      exfalso
      exact notRefused outcome
  | abstain => rfl
  | emit candidate =>
      have candidate0 : candidate = model.recommendation world0 := by
        rw [outcome] at sound0
        exact sound0
      have outcome1 :
          runProtocol model role world1 protocol = .emit candidate := by
        rw [← sameOutcome]
        exact outcome
      have candidate1 : candidate = model.recommendation world1 := by
        rw [outcome1] at sound1
        exact sound1
      exfalso
      apply differentRecommendation
      exact candidate0.symm.trans candidate1

/-- Randomness is represented extensionally by a seed. The theorem is
    zero-error: compliance and soundness must hold for every seed. -/
theorem seededZeroErrorForcesAbstention
    {Seed : Type uSeed}
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : AuthorityModel World Query Answer Recommendation Role)
    (role : Role) (world0 world1 : World)
    (strategy : Seed -> Protocol Query Answer Recommendation)
    (h0 : model.admissible world0)
    (h1 : model.admissible world1)
    (sameView : legitimateView model role world0 =
      legitimateView model role world1)
    (differentRecommendation :
      model.recommendation world0 ≠ model.recommendation world1)
    (compliant : forall seed, AuthorityCompliant model role (strategy seed))
    (sound : forall seed, ZeroErrorSound model role (strategy seed)) :
    forall seed, runProtocol model role world0 (strategy seed) = .abstain := by
  intro seed
  exact adaptiveZeroErrorForcesAbstention model role world0 world1
    (strategy seed) h0 h1 sameView differentRecommendation
    (compliant seed) (sound seed)

/-- A coalition's authority is the union of its members' authority. This
    models static multi-role handoff without inventing any new permission. -/
def coalitionModel
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : AuthorityModel World Query Answer Recommendation Role) :
    AuthorityModel World Query Answer Recommendation (List Role) where
  admissible := model.admissible
  authorized := fun roles query =>
    roles.any (fun role => model.authorized role query)
  answer := model.answer
  recommendation := model.recommendation

theorem coalitionAdaptiveNoEscape
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : AuthorityModel World Query Answer Recommendation Role)
    (roles : List Role) (world0 world1 : World)
    (protocol : Protocol Query Answer Recommendation)
    (sameView : legitimateView (coalitionModel model) roles world0 =
      legitimateView (coalitionModel model) roles world1)
    (compliant : AuthorityCompliant (coalitionModel model) roles protocol) :
    runProtocol (coalitionModel model) roles world0 protocol =
      runProtocol (coalitionModel model) roles world1 protocol :=
  adaptiveNoEscape (coalitionModel model) roles world0 world1 protocol
    sameView compliant

def expandAuthority
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : AuthorityModel World Query Answer Recommendation Role)
    (grant : Role -> Query -> Bool) :
    AuthorityModel World Query Answer Recommendation Role where
  admissible := model.admissible
  authorized := fun role query =>
    model.authorized role query || grant role query
  answer := model.answer
  recommendation := model.recommendation

def GrantIncluded
    {Query : Type uQ} {Role : Type uRole}
    (left right : Role -> Query -> Bool) : Prop :=
  forall role query, left role query = true -> right role query = true

def StrictGrantIncluded
    {Query : Type uQ} {Role : Type uRole}
    (left right : Role -> Query -> Bool) : Prop :=
  GrantIncluded left right ∧ ¬ GrantIncluded right left

def RecommendationSeparatingGrant
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : AuthorityModel World Query Answer Recommendation Role)
    (grant : Role -> Query -> Bool) : Prop :=
  forall role world0 world1,
    model.admissible world0 -> model.admissible world1 ->
    model.recommendation world0 ≠ model.recommendation world1 ->
    legitimateView (expandAuthority model grant) role world0 ≠
      legitimateView (expandAuthority model grant) role world1

/-- A generic certificate specification. The bounded Sounio kernel computes a
    cardinality-minimal instance; this abstract definition uses set inclusion. -/
structure AuthorityExpansionCertificate
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : AuthorityModel World Query Answer Recommendation Role) where
  grant : Role -> Query -> Bool
  separates : RecommendationSeparatingGrant model grant
  inclusionMinimal : forall candidate,
    StrictGrantIncluded candidate grant ->
      ¬ RecommendationSeparatingGrant model candidate

theorem expandedViewsEqualOfAllAnswersEqual
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : AuthorityModel World Query Answer Recommendation Role)
    (grant : Role -> Query -> Bool)
    (role : Role) (world0 world1 : World)
    (answersEqual : forall query,
      model.answer world0 query = model.answer world1 query) :
    legitimateView (expandAuthority model grant) role world0 =
      legitimateView (expandAuthority model grant) role world1 := by
  funext query
  simp [legitimateView, expandAuthority, answersEqual query]

/-- No Authority Expansion Escape: if the declared query universe itself has
    identical answers, no grant can rescue a zero-error adaptive protocol. -/
theorem noAuthorityExpansionEscapesZeroError
    {World : Type uW} {Query : Type uQ} {Answer : Type uA}
    {Recommendation : Type uR} {Role : Type uRole}
    (model : AuthorityModel World Query Answer Recommendation Role)
    (grant : Role -> Query -> Bool)
    (role : Role) (world0 world1 : World)
    (protocol : Protocol Query Answer Recommendation)
    (h0 : model.admissible world0)
    (h1 : model.admissible world1)
    (answersEqual : forall query,
      model.answer world0 query = model.answer world1 query)
    (differentRecommendation :
      model.recommendation world0 ≠ model.recommendation world1)
    (compliant : AuthorityCompliant (expandAuthority model grant) role protocol)
    (sound : ZeroErrorSound (expandAuthority model grant) role protocol) :
    runProtocol (expandAuthority model grant) role world0 protocol =
      .abstain := by
  exact adaptiveZeroErrorForcesAbstention
    (expandAuthority model grant) role world0 world1 protocol h0 h1
    (expandedViewsEqualOfAllAnswersEqual model grant role world0 world1
      answersEqual)
    differentRecommendation compliant sound

end Darwin.AuctoritasProtocol
