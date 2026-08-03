import NormativeGauge

/-!
# No hidden gauge fixing

An equivariant deterministic selector must return an output fixed by every
symmetry that stabilizes its input. If one such symmetry moves every admissible
output, no equivariant admissible selector exists. The Boolean triangle below
is a concrete finite countermodel.

The model has no clinical semantics.
-/

namespace Darwin.NoHiddenGaugeFixing

def Stabilizes (actInput : Gauge -> Input -> Input)
    (gauge : Gauge) (input : Input) : Prop :=
  actInput gauge input = input

def FixedBy (actOutput : Gauge -> Output -> Output)
    (gauge : Gauge) (output : Output) : Prop :=
  actOutput gauge output = output

def EquivariantSelector (actInput : Gauge -> Input -> Input)
    (actOutput : Gauge -> Output -> Output) (selector : Input -> Output) : Prop :=
  forall gauge input,
    selector (actInput gauge input) = actOutput gauge (selector input)

theorem stabilizerForcesSelectedFixed
    (equivariant : EquivariantSelector actInput actOutput selector)
    (stabilizes : Stabilizes actInput gauge input) :
    FixedBy actOutput gauge (selector input) := by
  calc
    actOutput gauge (selector input) = selector (actInput gauge input) :=
      (equivariant gauge input).symm
    _ = selector input := congrArg selector stabilizes

theorem stabilizerObstructsAdmissibleSelection
    (Admissible : Input -> Output -> Prop)
    (equivariant : EquivariantSelector actInput actOutput selector)
    (selectsAdmissible : forall candidate, Admissible candidate (selector candidate))
    (stabilizes : Stabilizes actInput gauge input)
    (movesEveryAdmissible : forall output,
      Admissible input output -> Not (FixedBy actOutput gauge output)) : False := by
  exact movesEveryAdmissible (selector input) (selectsAdmissible input)
    (stabilizerForcesSelectedFixed equivariant stabilizes)

def boolGaugeAction (gauge value : Bool) : Bool :=
  if gauge then !value else value

def boolTrivialInputAction (_gauge : Bool) (input : Unit) : Unit := input

theorem boolNontrivialGaugeHasNoFixedPoint (value : Bool) :
    Not (FixedBy boolGaugeAction true value) := by
  cases value <;> simp [FixedBy, boolGaugeAction]

theorem noBooleanGaugeFixing (selector : Unit -> Bool) :
    Not (EquivariantSelector boolTrivialInputAction boolGaugeAction selector) := by
  intro equivariant
  exact boolNontrivialGaugeHasNoFixedPoint (selector ())
    (stabilizerForcesSelectedFixed equivariant rfl)

open Darwin.NormativeGauge

def boolFlipAllValue (_vertex : Vertex) (value : Bool) : Bool := !value

def boolFlipAll : LocalGauge Bool where
  forward := boolFlipAllValue
  backward := boolFlipAllValue
  forward_backward := by
    intro vertex value
    cases value <;> rfl
  backward_forward := by
    intro vertex value
    cases value <;> rfl

def SameTransport (left right : TriangleTransport Label) : Prop :=
  (forall value, left.ab value = right.ab value) /\
  (forall value, left.bc value = right.bc value) /\
  (forall value, left.ca value = right.ca value)

theorem boolFlipAllStabilizesIdentityPointwise :
    SameTransport (transformTransport boolIdentityTransport boolFlipAll)
      boolIdentityTransport := by
  refine ⟨?_, ?_, ?_⟩ <;> intro value <;> cases value <;> rfl

theorem boolFlipAllMovesEveryAssignment (witness : Assignment Bool) :
    transformAssignment boolFlipAll witness ≠ witness := by
  intro fixed
  have fixedAtA := congrFun fixed Vertex.a
  cases valueAtA : witness Vertex.a <;>
    simp [transformAssignment, boolFlipAll, boolFlipAllValue, valueAtA] at fixedAtA

def TriangleStabilizerCovariant
    (selector : TriangleTransport Bool -> Assignment Bool) : Prop :=
  forall transport gauge,
    SameTransport (transformTransport transport gauge) transport ->
      selector transport = transformAssignment gauge (selector transport)

def TriangleAdmissible (selector : TriangleTransport Bool -> Assignment Bool) : Prop :=
  forall transport, GlobalSection transport (selector transport)

theorem noTriangleStabilizerCovariantSelector :
    Not (Exists fun selector : TriangleTransport Bool -> Assignment Bool =>
      TriangleStabilizerCovariant selector) := by
  rintro ⟨selector, covariant⟩
  have selectedFixed := covariant boolIdentityTransport boolFlipAll
    boolFlipAllStabilizesIdentityPointwise
  exact boolFlipAllMovesEveryAssignment (selector boolIdentityTransport)
    selectedFixed.symm

theorem noTriangleStabilizerCovariantAdmissibleSelector :
    Not (Exists fun selector : TriangleTransport Bool -> Assignment Bool =>
      TriangleStabilizerCovariant selector /\ TriangleAdmissible selector) := by
  rintro ⟨selector, covariant, _admissible⟩
  exact noTriangleStabilizerCovariantSelector ⟨selector, covariant⟩

def constantAssignment (value : Bool) : Assignment Bool := fun _vertex => value

theorem identityHasFalseSection :
    GlobalSection boolIdentityTransport (constantAssignment false) := by
  exact ⟨rfl, rfl, rfl⟩

theorem identityHasTrueSection :
    GlobalSection boolIdentityTransport (constantAssignment true) := by
  exact ⟨rfl, rfl, rfl⟩

def RespectsAnchor (gauge : LocalGauge Bool) (vertex : Vertex)
    (observed : Bool) : Prop :=
  gauge.forward vertex observed = observed

theorem boolFlipAllViolatesEveryAnchor (vertex : Vertex) (observed : Bool) :
    Not (RespectsAnchor boolFlipAll vertex observed) := by
  intro respected
  cases observed <;>
    simp [RespectsAnchor, boolFlipAll, boolFlipAllValue] at respected

theorem anchorAtAExcludesDiagonalFlip (observed : Bool) :
    Not (RespectsAnchor boolFlipAll Vertex.a observed) :=
  boolFlipAllViolatesEveryAnchor Vertex.a observed

end Darwin.NoHiddenGaugeFixing
