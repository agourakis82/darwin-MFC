import Std

/-!
# Normative holonomy

An abstract triangle of translations may be locally bijective at every edge
while admitting no globally coherent witness. This file proves the fixed-point
characterization, a concrete Boolean countermodel, and forced abstention under
a zero-error emission contract.

The model has no clinical semantics.
-/

namespace Darwin.NormativeHolonomy

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
    refine ⟨witness, ?_⟩
    refine ⟨rfl, rfl, ?_⟩
    simpa [witness, holonomy] using hfixed

def Injective (function : Source -> Target) : Prop :=
  forall ⦃left right⦄, function left = function right -> left = right

def Surjective (function : Source -> Target) : Prop :=
  forall target, Exists fun source => function source = target

def Bijective (function : Source -> Target) : Prop :=
  Injective function /\ Surjective function

theorem identity_bijective : Bijective (id : Label -> Label) := by
  constructor
  · intro left right equal
    exact equal
  · intro target
    exact ⟨target, rfl⟩

def LocallyCertified (transport : TriangleTransport Label) : Prop :=
  Bijective transport.ab /\
  Bijective transport.bc /\
  Bijective transport.ca

def oddFlipTransport : TriangleTransport Bool where
  ab := id
  bc := id
  ca := fun value => !value

theorem boolNot_bijective : Bijective (fun value : Bool => !value) := by
  constructor
  · intro left right equalImages
    cases left <;> cases right <;> simp_all
  · intro target
    cases target
    · exact ⟨true, rfl⟩
    · exact ⟨false, rfl⟩

theorem oddFlipTransport_locallyCertified :
    LocallyCertified oddFlipTransport := by
  exact ⟨identity_bijective, identity_bijective, boolNot_bijective⟩

theorem oddFlipHolonomy (anchor : Bool) :
    holonomy oddFlipTransport anchor = !anchor := by
  cases anchor <;> rfl

theorem bool_has_no_negation_fixed_point :
    Not (Exists fun anchor : Bool => anchor = !anchor) := by
  rintro ⟨anchor, equalNegation⟩
  cases anchor <;> simp at equalNegation

theorem oddFlipTransport_has_no_fixed_point :
    Not (Exists fun anchor => anchor = holonomy oddFlipTransport anchor) := by
  intro fixedPoint
  apply bool_has_no_negation_fixed_point
  rcases fixedPoint with ⟨anchor, equalHolonomy⟩
  exact ⟨anchor, equalHolonomy.trans (oddFlipHolonomy anchor)⟩

theorem oddFlipTransport_has_no_global_section :
    Not (Exists fun witness => GlobalSection oddFlipTransport witness) := by
  intro global
  exact oddFlipTransport_has_no_fixed_point
    ((globalSectionIffHolonomyFixedPoint oddFlipTransport).mp global)

theorem locallyCertifiedDoesNotImplyGlobalSection :
    Exists fun transport : TriangleTransport Bool =>
      LocallyCertified transport /\
      Not (Exists fun witness => GlobalSection transport witness) := by
  exact ⟨oddFlipTransport, oddFlipTransport_locallyCertified,
    oddFlipTransport_has_no_global_section⟩

inductive CompositionOutcome (Label : Type) where
  | refuse
  | abstain
  | emit (assignment : Assignment Label)

def ZeroError (transport : TriangleTransport Label) :
    CompositionOutcome Label -> Prop
  | .refuse => True
  | .abstain => True
  | .emit assignment => GlobalSection transport assignment

def NonRefusing : CompositionOutcome Label -> Prop
  | .refuse => False
  | .abstain => True
  | .emit _ => True

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
  | emit assignment =>
      exact False.elim (noGlobal ⟨assignment, zeroError⟩)

abbrev SeededOutcome (Seed Label : Type) := Seed -> CompositionOutcome Label

def SeededZeroError (transport : TriangleTransport Label)
    (outcome : SeededOutcome Seed Label) : Prop :=
  forall seed, ZeroError transport (outcome seed)

def SeededNonRefusing (outcome : SeededOutcome Seed Label) : Prop :=
  forall seed, NonRefusing (outcome seed)

theorem seededNoGlobalSectionForcesAbstention
    (transport : TriangleTransport Label)
    (outcome : SeededOutcome Seed Label)
    (zeroError : SeededZeroError transport outcome)
    (nonRefusing : SeededNonRefusing outcome)
    (noGlobal : Not (Exists fun witness => GlobalSection transport witness)) :
    forall seed, outcome seed = .abstain := by
  intro seed
  exact noGlobalSectionForcesAbstention transport (outcome seed)
    (zeroError seed) (nonRefusing seed) noGlobal

def PathIndependent (transport : TriangleTransport Label) : Prop :=
  forall anchor, holonomy transport anchor = anchor

theorem pathIndependentHasGlobalSection [Nonempty Label]
    (transport : TriangleTransport Label)
    (pathIndependent : PathIndependent transport) :
    Exists fun witness => GlobalSection transport witness := by
  let anchor : Label := Classical.choice (inferInstance : Nonempty Label)
  apply (globalSectionIffHolonomyFixedPoint transport).mpr
  exact ⟨anchor, (pathIndependent anchor).symm⟩

structure FlatConnectionCertificate (transport : TriangleTransport Label) where
  assignment : Assignment Label
  globallyCoherent : GlobalSection transport assignment

structure HolonomyObstructionCertificate
    (transport : TriangleTransport Label) where
  locallyCertified : LocallyCertified transport
  noFixedPoint : Not (Exists fun anchor => anchor = holonomy transport anchor)

theorem HolonomyObstructionCertificate.noGlobalSection
    (certificate : HolonomyObstructionCertificate transport) :
    Not (Exists fun witness => GlobalSection transport witness) := by
  intro global
  exact certificate.noFixedPoint
    ((globalSectionIffHolonomyFixedPoint transport).mp global)

abbrev Edge := Fin 3

structure TranslationBindingCertificate where
  declared : Edge -> Bool
  bound : Edge -> Bool
  basis : Edge -> Bool
  basisDeclared : forall edge, basis edge = true -> declared edge = true
  boundDeclared : forall edge, bound edge = true -> declared edge = true

structure RepairCutCertificate where
  declared : Edge -> Bool
  removed : Edge -> Bool
  removedDeclared : forall edge, removed edge = true -> declared edge = true
  restoredWitnessExists : Prop

end Darwin.NormativeHolonomy
