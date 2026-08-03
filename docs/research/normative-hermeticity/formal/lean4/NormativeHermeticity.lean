/-!
# Darwin Normative Hermeticity

This file separates byte-level receipt identity from the semantic references
resolved when an abstract normative computation executes. It proves a
no-unbound-influence property and zero-error forced abstention. Normative labels
remain uninterpreted symbols and the model has no clinical semantics.
-/

namespace Darwin.NormativeHermeticity

universe uRegime uDependency uValue uLabel uReceipt uSeed

abbrev ResolutionMemory (Dependency : Type uDependency) (Value : Type uValue) :=
  Dependency -> Option Value

inductive ExecutionOutcome (Label : Type uLabel) where
  | refuse
  | abstain
  | emit (label : Label)
  deriving DecidableEq, Repr

structure ReferenceModel
    (Regime : Type uRegime) (Dependency : Type uDependency)
    (Value : Type uValue) (Label : Type uLabel) (Receipt : Type uReceipt) where
  admissible : Regime -> Prop
  declared : Dependency -> Bool
  bound : Dependency -> Bool
  boundWithinDeclared : forall dependency,
    bound dependency = true -> declared dependency = true
  resolution : Regime -> Dependency -> Value
  required : Regime -> Label
  receipt : Regime -> Receipt

def resolutionView
    {Regime : Type uRegime} {Dependency : Type uDependency}
    {Value : Type uValue} {Label : Type uLabel} {Receipt : Type uReceipt}
    (model : ReferenceModel Regime Dependency Value Label Receipt)
    (available : Dependency -> Bool) (regime : Regime) :
    ResolutionMemory Dependency Value :=
  fun dependency =>
    if available dependency then some (model.resolution regime dependency)
    else none

def declaredView
    {Regime : Type uRegime} {Dependency : Type uDependency}
    {Value : Type uValue} {Label : Type uLabel} {Receipt : Type uReceipt}
    (model : ReferenceModel Regime Dependency Value Label Receipt)
    (regime : Regime) : ResolutionMemory Dependency Value :=
  resolutionView model model.declared regime

def boundView
    {Regime : Type uRegime} {Dependency : Type uDependency}
    {Value : Type uValue} {Label : Type uLabel} {Receipt : Type uReceipt}
    (model : ReferenceModel Regime Dependency Value Label Receipt)
    (regime : Regime) : ResolutionMemory Dependency Value :=
  resolutionView model model.bound regime

abbrev HermeticEngine
    (Dependency : Type uDependency) (Value : Type uValue)
    (Label : Type uLabel) (Receipt : Type uReceipt) :=
  Receipt -> ResolutionMemory Dependency Value -> ExecutionOutcome Label

def hermeticRun
    {Regime : Type uRegime} {Dependency : Type uDependency}
    {Value : Type uValue} {Label : Type uLabel} {Receipt : Type uReceipt}
    (model : ReferenceModel Regime Dependency Value Label Receipt)
    (engine : HermeticEngine Dependency Value Label Receipt)
    (regime : Regime) : ExecutionOutcome Label :=
  engine (model.receipt regime) (boundView model regime)

def ReceiptClosesBoundReferences
    {Regime : Type uRegime} {Dependency : Type uDependency}
    {Value : Type uValue} {Label : Type uLabel} {Receipt : Type uReceipt}
    (model : ReferenceModel Regime Dependency Value Label Receipt) : Prop :=
  forall regime0 regime1,
    model.admissible regime0 -> model.admissible regime1 ->
    model.receipt regime0 = model.receipt regime1 ->
      boundView model regime0 = boundView model regime1

def NormativelyHermetic
    {Regime : Type uRegime} {Dependency : Type uDependency}
    {Value : Type uValue} {Label : Type uLabel} {Receipt : Type uReceipt}
    (model : ReferenceModel Regime Dependency Value Label Receipt)
    (engine : HermeticEngine Dependency Value Label Receipt) : Prop :=
  forall regime0 regime1,
    model.admissible regime0 -> model.admissible regime1 ->
    model.receipt regime0 = model.receipt regime1 ->
      hermeticRun model engine regime0 = hermeticRun model engine regime1

/-- Once every runtime semantic input is a function of the receipt-bound view,
    equal receipts cannot leak influence from unbound reference resolutions. -/
theorem closedEngineNoUnboundInfluence
    {Regime : Type uRegime} {Dependency : Type uDependency}
    {Value : Type uValue} {Label : Type uLabel} {Receipt : Type uReceipt}
    (model : ReferenceModel Regime Dependency Value Label Receipt)
    (engine : HermeticEngine Dependency Value Label Receipt)
    (closed : ReceiptClosesBoundReferences model) :
    NormativelyHermetic model engine := by
  intro regime0 regime1 admissible0 admissible1 sameReceipt
  have sameBound := closed regime0 regime1 admissible0 admissible1 sameReceipt
  unfold hermeticRun
  rw [sameReceipt, sameBound]

def PostResolutionZeroError
    {Regime : Type uRegime} {Dependency : Type uDependency}
    {Value : Type uValue} {Label : Type uLabel} {Receipt : Type uReceipt}
    (model : ReferenceModel Regime Dependency Value Label Receipt)
    (engine : HermeticEngine Dependency Value Label Receipt) : Prop :=
  forall regime, model.admissible regime ->
    match hermeticRun model engine regime with
    | .emit candidate => candidate = model.required regime
    | .refuse => True
    | .abstain => True

def PostResolutionNonRefusing
    {Regime : Type uRegime} {Dependency : Type uDependency}
    {Value : Type uValue} {Label : Type uLabel} {Receipt : Type uReceipt}
    (model : ReferenceModel Regime Dependency Value Label Receipt)
    (engine : HermeticEngine Dependency Value Label Receipt) : Prop :=
  forall regime, model.admissible regime ->
    hermeticRun model engine regime ≠ .refuse

/-- If equal receipts close the same semantic view while admissible resolver
    regimes require different labels, a zero-error non-refusing engine must
    abstain. -/
theorem zeroErrorOpenSemanticsForcesAbstention
    {Regime : Type uRegime} {Dependency : Type uDependency}
    {Value : Type uValue} {Label : Type uLabel} {Receipt : Type uReceipt}
    (model : ReferenceModel Regime Dependency Value Label Receipt)
    (engine : HermeticEngine Dependency Value Label Receipt)
    (regime0 regime1 : Regime)
    (admissible0 : model.admissible regime0)
    (admissible1 : model.admissible regime1)
    (sameReceipt : model.receipt regime0 = model.receipt regime1)
    (differentRequired : model.required regime0 ≠ model.required regime1)
    (closed : ReceiptClosesBoundReferences model)
    (sound : PostResolutionZeroError model engine)
    (nonRefusing : PostResolutionNonRefusing model engine) :
    hermeticRun model engine regime0 = .abstain := by
  have sameOutcome := closedEngineNoUnboundInfluence model engine closed
    regime0 regime1 admissible0 admissible1 sameReceipt
  have sound0 := sound regime0 admissible0
  have sound1 := sound regime1 admissible1
  have notRefused := nonRefusing regime0 admissible0
  cases outcome : hermeticRun model engine regime0 with
  | refuse =>
      exfalso
      exact notRefused outcome
  | abstain => rfl
  | emit candidate =>
      have candidate0 : candidate = model.required regime0 := by
        rw [outcome] at sound0
        exact sound0
      have outcome1 : hermeticRun model engine regime1 = .emit candidate := by
        rw [← sameOutcome]
        exact outcome
      have candidate1 : candidate = model.required regime1 := by
        rw [outcome1] at sound1
        exact sound1
      exfalso
      apply differentRequired
      exact candidate0.symm.trans candidate1

theorem seededZeroErrorOpenSemanticsForcesAbstention
    {Seed : Type uSeed}
    {Regime : Type uRegime} {Dependency : Type uDependency}
    {Value : Type uValue} {Label : Type uLabel} {Receipt : Type uReceipt}
    (model : ReferenceModel Regime Dependency Value Label Receipt)
    (strategy : Seed -> HermeticEngine Dependency Value Label Receipt)
    (regime0 regime1 : Regime)
    (admissible0 : model.admissible regime0)
    (admissible1 : model.admissible regime1)
    (sameReceipt : model.receipt regime0 = model.receipt regime1)
    (differentRequired : model.required regime0 ≠ model.required regime1)
    (closed : ReceiptClosesBoundReferences model)
    (sound : forall seed, PostResolutionZeroError model (strategy seed))
    (nonRefusing : forall seed,
      PostResolutionNonRefusing model (strategy seed)) :
    forall seed, hermeticRun model (strategy seed) regime0 = .abstain := by
  intro seed
  exact zeroErrorOpenSemanticsForcesAbstention model (strategy seed)
    regime0 regime1 admissible0 admissible1 sameReceipt differentRequired
    closed (sound seed) (nonRefusing seed)

def demoDeclared (_ : Bool) : Bool := true

def demoBound (_ : Bool) : Bool := false

def demoModel : ReferenceModel Bool Bool Bool Bool (Nat × Nat) where
  admissible := fun _ => True
  declared := demoDeclared
  bound := demoBound
  boundWithinDeclared := by
    intro dependency isBound
    simp [demoBound] at isBound
  resolution := fun regime _ => regime
  required := fun regime => regime
  receipt := fun _ => (17, 31)

theorem demoReceiptCloses : ReceiptClosesBoundReferences demoModel := by
  intro regime0 regime1 admissible0 admissible1 sameReceipt
  funext dependency
  simp [boundView, resolutionView, demoModel, demoBound]

/-- The same bytes and digest can coexist with different required labels when
    every decision-relevant semantic reference remains unbound. -/
theorem sameReceiptCanRequireDifferentLabels :
    demoModel.receipt false = demoModel.receipt true ∧
    boundView demoModel false = boundView demoModel true ∧
    demoModel.required false ≠ demoModel.required true := by
  constructor
  . rfl
  constructor
  . exact demoReceiptCloses false true trivial trivial rfl
  . decide

theorem declaredResolutionsExposeDifference :
    declaredView demoModel false ≠ declaredView demoModel true := by
  intro sameDeclared
  have atDependency := congrFun sameDeclared false
  simp [declaredView, resolutionView, demoModel, demoDeclared] at atDependency

theorem demoZeroErrorEngineMustAbstain
    (engine : HermeticEngine Bool Bool Bool (Nat × Nat))
    (sound : PostResolutionZeroError demoModel engine)
    (nonRefusing : PostResolutionNonRefusing demoModel engine) :
    hermeticRun demoModel engine false = .abstain := by
  exact zeroErrorOpenSemanticsForcesAbstention demoModel engine false true
    trivial trivial rfl (by decide) demoReceiptCloses sound nonRefusing

def ReferenceIncluded
    {Dependency : Type uDependency}
    (left right : Dependency -> Bool) : Prop :=
  forall dependency, left dependency = true -> right dependency = true

def StrictReferenceIncluded
    {Dependency : Type uDependency}
    (left right : Dependency -> Bool) : Prop :=
  ReferenceIncluded left right ∧ Not (ReferenceIncluded right left)

def unionMask
    {Dependency : Type uDependency}
    (left right : Dependency -> Bool) : Dependency -> Bool :=
  fun dependency => left dependency || right dependency

def subtractMask
    {Dependency : Type uDependency}
    (original cut : Dependency -> Bool) : Dependency -> Bool :=
  fun dependency => original dependency && !cut dependency

def unboundMask
    {Regime : Type uRegime} {Dependency : Type uDependency}
    {Value : Type uValue} {Label : Type uLabel} {Receipt : Type uReceipt}
    (model : ReferenceModel Regime Dependency Value Label Receipt) :
    Dependency -> Bool :=
  fun dependency => model.declared dependency && !model.bound dependency

def IdentifiesRequiredLabel
    {Regime : Type uRegime} {Dependency : Type uDependency}
    {Value : Type uValue} {Label : Type uLabel} {Receipt : Type uReceipt}
    (model : ReferenceModel Regime Dependency Value Label Receipt)
    (available : Dependency -> Bool) : Prop :=
  forall regime0 regime1,
    model.admissible regime0 -> model.admissible regime1 ->
    model.required regime0 ≠ model.required regime1 ->
      resolutionView model available regime0 ≠
        resolutionView model available regime1

structure HermeticBasisCertificate
    {Regime : Type uRegime} {Dependency : Type uDependency}
    {Value : Type uValue} {Label : Type uLabel} {Receipt : Type uReceipt}
    (model : ReferenceModel Regime Dependency Value Label Receipt) where
  basis : Dependency -> Bool
  withinBound : ReferenceIncluded basis model.bound
  identifies : IdentifiesRequiredLabel model basis
  inclusionMinimal : forall candidate,
    StrictReferenceIncluded candidate basis ->
      Not (IdentifiesRequiredLabel model candidate)

structure BindingDeficitCertificate
    {Regime : Type uRegime} {Dependency : Type uDependency}
    {Value : Type uValue} {Label : Type uLabel} {Receipt : Type uReceipt}
    (model : ReferenceModel Regime Dependency Value Label Receipt) where
  binding : Dependency -> Bool
  declaredIdentifies : IdentifiesRequiredLabel model model.declared
  boundFails : Not (IdentifiesRequiredLabel model model.bound)
  withinUnbound : ReferenceIncluded binding (unboundMask model)
  closes : IdentifiesRequiredLabel model (unionMask model.bound binding)
  inclusionMinimal : forall candidate,
    StrictReferenceIncluded candidate binding ->
      Not (IdentifiesRequiredLabel model (unionMask model.bound candidate))

structure SemanticFragilityCutCertificate
    {Regime : Type uRegime} {Dependency : Type uDependency}
    {Value : Type uValue} {Label : Type uLabel} {Receipt : Type uReceipt}
    (model : ReferenceModel Regime Dependency Value Label Receipt) where
  cut : Dependency -> Bool
  declaredIdentifies : IdentifiesRequiredLabel model model.declared
  withinDeclared : ReferenceIncluded cut model.declared
  destroys : Not (IdentifiesRequiredLabel model
    (subtractMask model.declared cut))
  inclusionMinimal : forall candidate,
    StrictReferenceIncluded candidate cut ->
      IdentifiesRequiredLabel model (subtractMask model.declared candidate)

theorem boundUnionUnboundEqualsDeclared
    {Regime : Type uRegime} {Dependency : Type uDependency}
    {Value : Type uValue} {Label : Type uLabel} {Receipt : Type uReceipt}
    (model : ReferenceModel Regime Dependency Value Label Receipt) :
    unionMask model.bound (unboundMask model) = model.declared := by
  funext dependency
  cases bound : model.bound dependency with
  | false =>
      cases declared : model.declared dependency <;>
        simp [unionMask, unboundMask, bound, declared]
  | true =>
      have declared := model.boundWithinDeclared dependency bound
      simp [unionMask, unboundMask, bound, declared]

theorem fullUnboundBindingIdentifies
    {Regime : Type uRegime} {Dependency : Type uDependency}
    {Value : Type uValue} {Label : Type uLabel} {Receipt : Type uReceipt}
    (model : ReferenceModel Regime Dependency Value Label Receipt)
    (declaredIdentifies : IdentifiesRequiredLabel model model.declared) :
    IdentifiesRequiredLabel model
      (unionMask model.bound (unboundMask model)) := by
  rw [boundUnionUnboundEqualsDeclared]
  exact declaredIdentifies

end Darwin.NormativeHermeticity
