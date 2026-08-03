import NoHiddenGaugeFixing

/-!
# Value-carrying observations for No Hidden Gauge Fixing v1.2

This file proves the abstract refinement boundary used by the v1.2 executable:
an observed value restricts admissible global sections, destroys any gauge that
moves the observation, and yields a unique section for the identity triangle.
It also proves that revoked, expired, or untrusted receipts cannot authorize an
evaluation. The model has no clinical semantics.
-/

namespace Darwin.NoHiddenGaugeFixingV12

open Darwin.NormativeGauge
open Darwin.NoHiddenGaugeFixing

def ObservedAt (witness : Assignment Bool) (vertex : Vertex)
    (value : Bool) : Prop :=
  witness vertex = value

def GaugePreservesObservation (gauge : LocalGauge Bool)
    (vertex : Vertex) (value : Bool) : Prop :=
  gauge.forward vertex value = value

theorem observedValueRestrictsAssignments
    (observed : ObservedAt witness vertex value) :
    witness vertex != !value := by
  cases value <;> simp [ObservedAt] at observed |-
  · exact observed
  · exact observed

theorem diagonalFlipCannotPreserveObservedValue
    (vertex : Vertex) (value : Bool) :
    Not (GaugePreservesObservation boolFlipAll vertex value) := by
  cases value <;>
    simp [GaugePreservesObservation, boolFlipAll, boolFlipAllValue]

theorem identitySectionDeterminedByAnchorA
    (witness : Assignment Bool)
    (global : GlobalSection boolIdentityTransport witness)
    (observed : ObservedAt witness .a value) :
    witness = constantAssignment value := by
  rcases global with ⟨hab, hbc, _hca⟩
  simp only [boolIdentityTransport, id_eq] at hab hbc
  funext vertex
  cases vertex with
  | a => exact observed
  | b => exact hab.trans observed
  | c => exact hbc.trans (hab.trans observed)

theorem identityAnchorAHasUniqueSection (value : Bool) :
    Exists fun witness : Assignment Bool =>
      GlobalSection boolIdentityTransport witness /\
        ObservedAt witness .a value /\
        forall other : Assignment Bool,
          GlobalSection boolIdentityTransport other ->
          ObservedAt other .a value -> other = witness := by
  refine ⟨constantAssignment value, ?_, ?_, ?_⟩
  · cases value <;> exact ⟨rfl, rfl, rfl⟩
  · rfl
  · intro witness global observed
    exact identitySectionDeterminedByAnchorA witness global observed

theorem noAnchorRetainsTwoIdentitySections :
    (GlobalSection boolIdentityTransport (constantAssignment false) /\
      GlobalSection boolIdentityTransport (constantAssignment true)) /\
    constantAssignment false ≠ constantAssignment true := by
  constructor
  · exact ⟨identityHasFalseSection, identityHasTrueSection⟩
  · intro equal
    have atA := congrFun equal Vertex.a
    simp [constantAssignment] at atA

structure ObservationReceiptModel where
  signatureValid : Bool
  scopeMatches : Bool
  sourceHashMatches : Bool
  reliabilityBps : Nat
  validFrom : Nat
  expiresAt : Nat
  revoked : Bool

def ReceiptTrustedAt (receipt : ObservationReceiptModel)
    (now minimumReliabilityBps : Nat) : Prop :=
  receipt.signatureValid = true /\
  receipt.scopeMatches = true /\
  receipt.sourceHashMatches = true /\
  minimumReliabilityBps <= receipt.reliabilityBps /\
  receipt.validFrom <= now /\
  now < receipt.expiresAt /\
  receipt.revoked = false

instance receiptTrustedAtDecidable (receipt : ObservationReceiptModel)
    (now minimumReliabilityBps : Nat) :
    Decidable (ReceiptTrustedAt receipt now minimumReliabilityBps) := by
  unfold ReceiptTrustedAt
  infer_instance

inductive ReceiptAuthorization where
  | refuse
  | evaluate
  deriving DecidableEq, Repr

def authorizeReceipt (receipt : ObservationReceiptModel)
    (now minimumReliabilityBps : Nat) : ReceiptAuthorization :=
  if ReceiptTrustedAt receipt now minimumReliabilityBps then
    .evaluate
  else
    .refuse

theorem authorizationImpliesTrusted
    (authorized : authorizeReceipt receipt now minimumReliabilityBps =
      .evaluate) :
    ReceiptTrustedAt receipt now minimumReliabilityBps := by
  by_cases trusted : ReceiptTrustedAt receipt now minimumReliabilityBps
  · exact trusted
  · simp [authorizeReceipt, trusted] at authorized

theorem revokedReceiptCannotAuthorize
    (revoked : receipt.revoked = true) :
    authorizeReceipt receipt now minimumReliabilityBps = .refuse := by
  have notTrusted : Not (ReceiptTrustedAt receipt now minimumReliabilityBps) := by
    intro trusted
    have notRevoked := trusted.2.2.2.2.2.2
    rw [revoked] at notRevoked
    exact Bool.noConfusion notRevoked
  simp [authorizeReceipt, notTrusted]

theorem expiredReceiptCannotAuthorize
    (expired : receipt.expiresAt <= now) :
    authorizeReceipt receipt now minimumReliabilityBps = .refuse := by
  have notTrusted : Not (ReceiptTrustedAt receipt now minimumReliabilityBps) := by
    intro trusted
    exact (Nat.not_lt_of_ge expired) trusted.2.2.2.2.2.1
  simp [authorizeReceipt, notTrusted]

theorem invalidSignatureCannotAuthorize
    (invalid : receipt.signatureValid = false) :
    authorizeReceipt receipt now minimumReliabilityBps = .refuse := by
  have notTrusted : Not (ReceiptTrustedAt receipt now minimumReliabilityBps) := by
    intro trusted
    have signatureValid := trusted.1
    rw [invalid] at signatureValid
    exact Bool.noConfusion signatureValid
  simp [authorizeReceipt, notTrusted]

structure AbiV12 where
  declaredEdges : Nat
  anchorMask : Nat
  anchorValueMask : Nat
  mapAB : Nat
  mapBC : Nat
  mapCA : Nat
  deriving DecidableEq, Repr

def maskSubset (subset superset : Nat) : Bool :=
  subset &&& superset == subset

def abiShapeValid (abi : AbiV12) : Bool :=
  abi.declaredEdges <= 7 && abi.anchorMask <= 7 &&
  abi.anchorValueMask <= 7 && maskSubset abi.anchorValueMask abi.anchorMask &&
  abi.mapAB <= 3 && abi.mapBC <= 3 && abi.mapCA <= 3

def encodeIdentityAnchorA (value : Bool) : AbiV12 where
  declaredEdges := 7
  anchorMask := 1
  anchorValueMask := if value then 1 else 0
  mapAB := 2
  mapBC := 2
  mapCA := 2

theorem encodedIdentityAnchorAIsShapeValid (value : Bool) :
    abiShapeValid (encodeIdentityAnchorA value) = true := by
  cases value <;> decide

def packResult (disposition stabilizer additionalAnchor solutionCount
    stabilizerOrder localIssue : Nat) : Nat :=
  disposition + stabilizer * 8 + additionalAnchor * 2048 +
    solutionCount * 16384 + stabilizerOrder * 262144 +
    localIssue * 4194304

def expectedIdentityAnchorAResult (_value : Bool) : Nat :=
  packResult 1 1 0 1 1 0

theorem identityAnchorARefinesPackedKernelResult (value : Bool) :
    expectedIdentityAnchorAResult value = 278537 := by
  rfl

theorem identityAnchorAUniqueIsModelRelative (value : Bool) :
    (Exists fun witness : Assignment Bool =>
      GlobalSection boolIdentityTransport witness /\
        ObservedAt witness .a value /\
        forall other : Assignment Bool,
          GlobalSection boolIdentityTransport other ->
          ObservedAt other .a value -> other = witness) :=
  identityAnchorAHasUniqueSection value

end Darwin.NoHiddenGaugeFixingV12
