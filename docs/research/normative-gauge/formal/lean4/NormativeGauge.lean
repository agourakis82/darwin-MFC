import Std

/-!
# Normative gauge invariance

Local witness labels are coordinates. A bijective coordinate change at every
context conjugates the edge transports. This file proves that global sections,
holonomy fixed points, zero-error emission, and forced abstention survive that
change. It also constructs a coordinate-sensitive analyzer with a real gauge
anomaly.

The model has no clinical semantics.
-/

namespace Darwin.NormativeGauge

inductive Vertex where
  | a
  | b
  | c
  deriving DecidableEq, Repr

structure TriangleTransport (Label : Type) where
  ab : Label -> Label
  bc : Label -> Label
  ca : Label -> Label

abbrev Assignment (Label : Type) := Vertex -> Label

def GlobalSection (transport : TriangleTransport Label)
    (witness : Assignment Label) : Prop :=
  witness .b = transport.ab (witness .a) /\
  witness .c = transport.bc (witness .b) /\
  witness .a = transport.ca (witness .c)

def holonomy (transport : TriangleTransport Label) (anchor : Label) : Label :=
  transport.ca (transport.bc (transport.ab anchor))

theorem globalSectionIffHolonomyFixedPoint
    (transport : TriangleTransport Label) :
    (Exists fun witness => GlobalSection transport witness) <->
      Exists fun anchor => anchor = holonomy transport anchor := by
  constructor
  · rintro ⟨witness, hab, hbc, hca⟩
    refine ⟨witness .a, ?_⟩
    calc
      witness .a = transport.ca (witness .c) := hca
      _ = transport.ca (transport.bc (witness .b)) := congrArg transport.ca hbc
      _ = transport.ca (transport.bc (transport.ab (witness .a))) :=
        congrArg (fun value => transport.ca (transport.bc value)) hab
      _ = holonomy transport (witness .a) := rfl
  · rintro ⟨anchor, hfixed⟩
    let witness : Assignment Label := fun
      | .a => anchor
      | .b => transport.ab anchor
      | .c => transport.bc (transport.ab anchor)
    refine ⟨witness, rfl, rfl, ?_⟩
    simpa [witness, holonomy] using hfixed

structure LocalGauge (Label : Type) where
  forward : Vertex -> Label -> Label
  backward : Vertex -> Label -> Label
  forward_backward : forall vertex value,
    forward vertex (backward vertex value) = value
  backward_forward : forall vertex value,
    backward vertex (forward vertex value) = value

def transformTransport (transport : TriangleTransport Label)
    (gauge : LocalGauge Label) : TriangleTransport Label where
  ab := fun value => gauge.forward .b (transport.ab (gauge.backward .a value))
  bc := fun value => gauge.forward .c (transport.bc (gauge.backward .b value))
  ca := fun value => gauge.forward .a (transport.ca (gauge.backward .c value))

def transformAssignment (gauge : LocalGauge Label)
    (witness : Assignment Label) : Assignment Label :=
  fun vertex => gauge.forward vertex (witness vertex)

def untransformAssignment (gauge : LocalGauge Label)
    (witness : Assignment Label) : Assignment Label :=
  fun vertex => gauge.backward vertex (witness vertex)

theorem transformGlobalSection
    (gauge : LocalGauge Label)
    (global : GlobalSection transport witness) :
    GlobalSection (transformTransport transport gauge)
      (transformAssignment gauge witness) := by
  rcases global with ⟨hab, hbc, hca⟩
  refine ⟨?_, ?_, ?_⟩
  · simp only [transformAssignment, transformTransport]
    rw [gauge.backward_forward]
    exact congrArg (gauge.forward .b) hab
  · simp only [transformAssignment, transformTransport]
    rw [gauge.backward_forward]
    exact congrArg (gauge.forward .c) hbc
  · simp only [transformAssignment, transformTransport]
    rw [gauge.backward_forward]
    exact congrArg (gauge.forward .a) hca

theorem untransformGlobalSection
    (gauge : LocalGauge Label)
    (global : GlobalSection (transformTransport transport gauge) witness) :
    GlobalSection transport (untransformAssignment gauge witness) := by
  rcases global with ⟨hab, hbc, hca⟩
  refine ⟨?_, ?_, ?_⟩
  · simp only [untransformAssignment]
    calc
      gauge.backward .b (witness .b) =
          gauge.backward .b
            (gauge.forward .b (transport.ab (gauge.backward .a (witness .a)))) :=
        congrArg (gauge.backward .b) hab
      _ = transport.ab (gauge.backward .a (witness .a)) :=
        gauge.backward_forward .b _
  · simp only [untransformAssignment]
    calc
      gauge.backward .c (witness .c) =
          gauge.backward .c
            (gauge.forward .c (transport.bc (gauge.backward .b (witness .b)))) :=
        congrArg (gauge.backward .c) hbc
      _ = transport.bc (gauge.backward .b (witness .b)) :=
        gauge.backward_forward .c _
  · simp only [untransformAssignment]
    calc
      gauge.backward .a (witness .a) =
          gauge.backward .a
            (gauge.forward .a (transport.ca (gauge.backward .c (witness .c)))) :=
        congrArg (gauge.backward .a) hca
      _ = transport.ca (gauge.backward .c (witness .c)) :=
        gauge.backward_forward .a _

theorem globalSectionGaugeInvariant
    (transport : TriangleTransport Label) (gauge : LocalGauge Label) :
    (Exists fun witness =>
      GlobalSection (transformTransport transport gauge) witness) <->
    (Exists fun witness => GlobalSection transport witness) := by
  constructor
  · rintro ⟨witness, global⟩
    exact ⟨untransformAssignment gauge witness,
      untransformGlobalSection gauge global⟩
  · rintro ⟨witness, global⟩
    exact ⟨transformAssignment gauge witness,
      transformGlobalSection gauge global⟩

theorem holonomyGaugeConjugacy
    (transport : TriangleTransport Label) (gauge : LocalGauge Label)
    (anchor : Label) :
    holonomy (transformTransport transport gauge)
        (gauge.forward .a anchor) =
      gauge.forward .a (holonomy transport anchor) := by
  simp [holonomy, transformTransport, gauge.backward_forward]

theorem holonomyFixedPointGaugeInvariant
    (transport : TriangleTransport Label) (gauge : LocalGauge Label) :
    (Exists fun anchor =>
      anchor = holonomy (transformTransport transport gauge) anchor) <->
    (Exists fun anchor => anchor = holonomy transport anchor) := by
  rw [← globalSectionIffHolonomyFixedPoint (transformTransport transport gauge)]
  rw [← globalSectionIffHolonomyFixedPoint transport]
  exact globalSectionGaugeInvariant transport gauge

def GaugeInvariantPredicate
    (predicate : TriangleTransport Label -> Prop) : Prop :=
  forall transport gauge,
    predicate (transformTransport transport gauge) <-> predicate transport

theorem globalSectionExistence_gaugeInvariant :
    GaugeInvariantPredicate
      (fun transport : TriangleTransport Label =>
        Exists fun witness => GlobalSection transport witness) := by
  exact fun transport gauge => globalSectionGaugeInvariant transport gauge

theorem holonomyFixedPointExistence_gaugeInvariant :
    GaugeInvariantPredicate
      (fun transport : TriangleTransport Label =>
        Exists fun anchor => anchor = holonomy transport anchor) := by
  exact fun transport gauge => holonomyFixedPointGaugeInvariant transport gauge

inductive CompositionOutcome (Label : Type) where
  | refuse
  | abstain
  | emit (assignment : Assignment Label)

def transformOutcome (gauge : LocalGauge Label) :
    CompositionOutcome Label -> CompositionOutcome Label
  | .refuse => .refuse
  | .abstain => .abstain
  | .emit witness => .emit (transformAssignment gauge witness)

def ZeroError (transport : TriangleTransport Label) :
    CompositionOutcome Label -> Prop
  | .refuse => True
  | .abstain => True
  | .emit witness => GlobalSection transport witness

def NonRefusing : CompositionOutcome Label -> Prop
  | .refuse => False
  | .abstain => True
  | .emit _ => True

theorem zeroErrorGaugeCovariant
    (gauge : LocalGauge Label)
    (zeroError : ZeroError transport outcome) :
    ZeroError (transformTransport transport gauge)
      (transformOutcome gauge outcome) := by
  cases outcome with
  | refuse => trivial
  | abstain => trivial
  | emit witness => exact transformGlobalSection gauge zeroError

theorem noGlobalSectionForcesAbstention
    (transport : TriangleTransport Label)
    (outcome : CompositionOutcome Label)
    (zeroError : ZeroError transport outcome)
    (nonRefusing : NonRefusing outcome)
    (noGlobal : Not (Exists fun witness => GlobalSection transport witness)) :
    outcome = .abstain := by
  cases outcome with
  | refuse => contradiction
  | abstain => rfl
  | emit witness => exact False.elim (noGlobal ⟨witness, zeroError⟩)

theorem noGlobalSectionGaugePreserved
    (gauge : LocalGauge Label)
    (noGlobal : Not (Exists fun witness => GlobalSection transport witness)) :
    Not (Exists fun witness =>
      GlobalSection (transformTransport transport gauge) witness) := by
  intro transformedGlobal
  exact noGlobal ((globalSectionGaugeInvariant transport gauge).mp transformedGlobal)

theorem gaugeTransformedNoGlobalForcesAbstention
    (gauge : LocalGauge Label)
    (outcome : CompositionOutcome Label)
    (zeroError : ZeroError (transformTransport transport gauge) outcome)
    (nonRefusing : NonRefusing outcome)
    (noGlobal : Not (Exists fun witness => GlobalSection transport witness)) :
    outcome = .abstain := by
  exact noGlobalSectionForcesAbstention
    (transformTransport transport gauge) outcome zeroError nonRefusing
    (noGlobalSectionGaugePreserved gauge noGlobal)

abbrev SeededOutcome (Seed Label : Type) := Seed -> CompositionOutcome Label

def SeededZeroError (transport : TriangleTransport Label)
    (outcome : SeededOutcome Seed Label) : Prop :=
  forall seed, ZeroError transport (outcome seed)

def SeededNonRefusing (outcome : SeededOutcome Seed Label) : Prop :=
  forall seed, NonRefusing (outcome seed)

theorem seededGaugeTransformedNoGlobalForcesAbstention
    (gauge : LocalGauge Label)
    (outcome : SeededOutcome Seed Label)
    (zeroError : SeededZeroError (transformTransport transport gauge) outcome)
    (nonRefusing : SeededNonRefusing outcome)
    (noGlobal : Not (Exists fun witness => GlobalSection transport witness)) :
    forall seed, outcome seed = .abstain := by
  intro seed
  exact gaugeTransformedNoGlobalForcesAbstention gauge (outcome seed)
    (zeroError seed) (nonRefusing seed) noGlobal

def GaugeInvariantAnalyzer [DecidableEq Result]
    (analyzer : TriangleTransport Label -> Result) : Prop :=
  forall transport gauge,
    analyzer (transformTransport transport gauge) = analyzer transport

def HasGaugeAnomaly [DecidableEq Result]
    (analyzer : TriangleTransport Label -> Result) : Prop :=
  Exists fun transport => Exists fun gauge =>
    analyzer (transformTransport transport gauge) != analyzer transport

def boolFlipAtBValue (vertex : Vertex) (value : Bool) : Bool :=
  match vertex with
  | .b => !value
  | _ => value

def boolFlipAtB : LocalGauge Bool where
  forward := boolFlipAtBValue
  backward := boolFlipAtBValue
  forward_backward := by
    intro vertex value
    cases vertex <;> cases value <;> rfl
  backward_forward := by
    intro vertex value
    cases vertex <;> cases value <;> rfl

def boolIdentityTransport : TriangleTransport Bool where
  ab := id
  bc := id
  ca := id

def coordinateSensitiveAnalyzer (transport : TriangleTransport Bool) : Bool :=
  transport.ab false

theorem coordinateSensitiveAnalyzer_changesUnderGauge :
    coordinateSensitiveAnalyzer
        (transformTransport boolIdentityTransport boolFlipAtB) !=
      coordinateSensitiveAnalyzer boolIdentityTransport := by
  decide

theorem coordinateSensitiveAnalyzer_hasGaugeAnomaly :
    HasGaugeAnomaly coordinateSensitiveAnalyzer := by
  exact ⟨boolIdentityTransport, boolFlipAtB,
    coordinateSensitiveAnalyzer_changesUnderGauge⟩

theorem coordinateSensitiveAnalyzer_notGaugeInvariant :
    Not (GaugeInvariantAnalyzer coordinateSensitiveAnalyzer) := by
  intro invariant
  have impossible := invariant boolIdentityTransport boolFlipAtB
  simp [coordinateSensitiveAnalyzer, transformTransport, boolIdentityTransport,
    boolFlipAtB, boolFlipAtBValue] at impossible

structure GaugeOrbitCertificate where
  representative : Nat
  orbitCardinality : Nat
  analyzerAnomalyMask : Nat
  repairAnomalyMask : Nat

end Darwin.NormativeGauge
