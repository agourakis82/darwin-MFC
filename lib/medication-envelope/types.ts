export type MedicationEvidenceNodeKind =
  | 'source'
  | 'claim'
  | 'interpretation'
  | 'constraint'
  | 'review'
  | 'consensus'
  | 'test'
  | 'artifact'
  | 'signature';

export type MedicationEvidenceEdgeKind =
  | 'supports'
  | 'derives'
  | 'reviews'
  | 'tests'
  | 'compiles-to'
  | 'supersedes'
  | 'signs';

export type MedicationEvidenceNodeStatus = 'CURRENT' | 'STALE' | 'REVOKED';

export interface MedicationEvidenceNodeV1 {
  schemaVersion: 'darwin.medication-evidence-node.v1';
  id: string;
  kind: MedicationEvidenceNodeKind;
  status: MedicationEvidenceNodeStatus;
  payload: Record<string, unknown>;
  payloadSha256: string;
  parentIds: string[];
  nodeSha256: string;
}

export interface MedicationEvidenceEdgeV1 {
  from: string;
  to: string;
  kind: MedicationEvidenceEdgeKind;
}

export interface MedicationEvidenceGraphV1 {
  schemaVersion: 'darwin.medication-evidence-graph.v1';
  generatedAt: string;
  intendedUse: string;
  nodes: MedicationEvidenceNodeV1[];
  edges: MedicationEvidenceEdgeV1[];
  roots: string[];
  merkleRootSha256: string;
  audit: {
    nodeCount: number;
    edgeCount: number;
    staleNodeCount: number;
    cycleFree: boolean;
    contentAddressed: boolean;
  };
}

export interface MedicationChangeImpactReportV1 {
  schemaVersion: 'darwin.medication-change-impact-report.v1';
  graphSha256: string;
  changedNodeIds: string[];
  staleDescendantIds: string[];
  affectedArtifactIds: string[];
  disposition: 'REFUSE';
  reason: 'evidence-descendant-stale';
}

export type ClinicalDimensionV1 =
  | 'dimensionless'
  | 'age-day'
  | 'body-mass-gram'
  | 'mass-microgram'
  | 'volume-microliter'
  | 'time-second'
  | 'frequency-per-day'
  | 'activity-international-unit'
  | 'concentration-microgram-per-milliliter'
  | 'concentration-unit-per-milliliter'
  | 'egfr-milliliter-per-minute-per-1.73m2'
  | 'inr-ratio'
  | 'serum-nanomole-per-liter'
  | 'serum-nanogram-per-milliliter';

export interface ExactRationalV1 {
  numerator: string;
  denominator: string;
}

export interface ExactQuantityV1 extends ExactRationalV1 {
  dimension: ClinicalDimensionV1;
}

export type ClinicalConstraintKindV1 =
  | 'RANGE'
  | 'FORBIDDEN_PAIR'
  | 'REQUIRED_CONTEXT'
  | 'REQUIRED_MONITORING'
  | 'EXACT_FREQUENCY';

interface ClinicalConstraintBaseV1 {
  id: string;
  kind: ClinicalConstraintKindV1;
  label: string;
  severity: 'BLOCK' | 'REVIEW';
  evidenceNodeIds: string[];
  unknownBehavior: 'REFUSE' | 'REVIEW';
}

export interface RangeConstraintV1 extends ClinicalConstraintBaseV1 {
  kind: 'RANGE';
  variable: string;
  minimum?: ExactQuantityV1;
  maximum?: ExactQuantityV1;
  minimumInclusive: boolean;
  maximumInclusive: boolean;
}

export interface ForbiddenPairConstraintV1 extends ClinicalConstraintBaseV1 {
  kind: 'FORBIDDEN_PAIR';
  leftConceptId: string;
  rightConceptId: string;
}

export interface RequiredContextConstraintV1 extends ClinicalConstraintBaseV1 {
  kind: 'REQUIRED_CONTEXT';
  variable: string;
}

export interface RequiredMonitoringConstraintV1 extends ClinicalConstraintBaseV1 {
  kind: 'REQUIRED_MONITORING';
  observationCode: string;
}

export interface ExactFrequencyConstraintV1 extends ClinicalConstraintBaseV1 {
  kind: 'EXACT_FREQUENCY';
  variable: string;
  expected: ExactQuantityV1;
}

export type ClinicalConstraintV1 =
  | RangeConstraintV1
  | ForbiddenPairConstraintV1
  | RequiredContextConstraintV1
  | RequiredMonitoringConstraintV1
  | ExactFrequencyConstraintV1;

export interface ClinicalConstraintIRV1 {
  schemaVersion: 'darwin.clinical-constraint-ir.v1';
  artifactId: string;
  artifactVersion: string;
  medicationConceptIds: string[];
  indicationId: string | null;
  population: string;
  reviewStatus: 'EVIDENCE_REQUIRED' | 'REVIEWED_CANDIDATE' | 'PILOT_APPROVED';
  constraints: ClinicalConstraintV1[];
  graphNodeIds: string[];
  graphMerkleRootSha256: string;
  irSha256: string;
}

export interface ProposedMedicationActionV1 {
  schemaVersion: 'darwin.proposed-medication-action.v1';
  medicationConceptId: string;
  indicationId: string | null;
  route: string | null;
  presentationId: string | null;
  quantities: Record<string, ExactQuantityV1>;
  concomitantConceptIds: string[];
  observationsPresent: string[];
}

export interface MedicationEnvelopePatientContextV1 {
  ageDays?: string;
  weightGram?: string;
  estimatedGlomerularFiltrationRate?: ExactQuantityV1;
  hepaticStatus?: 'none' | 'mild' | 'moderate' | 'severe' | 'unknown';
  pregnancyStatus?: 'not-applicable' | 'not-pregnant' | 'pregnant' | 'unknown';
  lactationStatus?: 'not-applicable' | 'not-lactating' | 'lactating' | 'unknown';
}

export interface MedicationEnvelopeRequestV1 {
  schemaVersion: 'darwin.medication-envelope-request.v1';
  artifactId: string;
  action: ProposedMedicationActionV1;
  patient: MedicationEnvelopePatientContextV1;
  pilotCredential: string | null;
  expectedGraphMerkleRootSha256: string;
  expectedReceiptSha256: string;
}

export type MedicationEnvelopeDisposition =
  | 'REFUSE'
  | 'BLOCK'
  | 'REVIEW'
  | 'WITHIN_REVIEWED_ENVELOPE';

export interface MedicationEnvelopeConstraintResultV1 {
  constraintId: string;
  outcome: 'SATISFIED' | 'VIOLATED' | 'UNKNOWN' | 'NOT_EVALUATED';
  code: string;
  evidenceNodeIds: string[];
  observed?: ExactQuantityV1;
  boundary?: ExactQuantityV1;
}

export interface MedicationEnvelopeResultV1 {
  schemaVersion: 'darwin.sounio.medication-envelope-result.v1';
  disposition: MedicationEnvelopeDisposition;
  artifactId: string;
  evaluatedConstraints: MedicationEnvelopeConstraintResultV1[];
  unknownVariables: string[];
  counterexample: {
    constraintId: string;
    code: string;
    observed?: ExactQuantityV1;
    boundary?: ExactQuantityV1;
  } | null;
  graphMerkleRootSha256: string | null;
  receiptSha256: string | null;
  credentialId: string | null;
  integrityVerified: boolean;
  clinicalSafetyClaim: null;
}

export interface MedicationPilotCredentialV1 {
  schemaVersion: 'darwin.medication-pilot-credential.v1';
  credentialId: string;
  subjectUserId: string;
  role: 'physician_reviewer' | 'pharmacist_reviewer' | 'clinical_admin';
  pilotId: string;
  scopes: Array<'synthetic-envelope-evaluate' | 'synthetic-fhir-export'>;
  issuedAt: string;
  expiresAt: string;
  environment: 'staging-synthetic-only';
  issuerKeyId: string;
  signatureBase64: string;
}

export interface MedicationAssuranceReceiptV1 {
  schemaVersion: 'darwin.sounio.medication-assurance-receipt.v1';
  receiptId: string;
  generatedAt: string;
  intendedUse: string;
  hashes: {
    evidenceGraphSha256: string;
    evidenceGraphMerkleRootSha256: string;
    artifactBundleSha256: string;
    benchmarkSha256: string;
    buildScriptSha256: string;
    identityBundleSha256: string;
    reviewSeedSha256: string;
    adversarialAiPolicySha256: string;
    testVectorsSha256: string;
    sounioSourceSha256: string;
    sounioCodegenSha256: string;
    compilerSourceReceiptSha256: string;
    compilerSha256: string;
    wasmSha256: string;
    nativeOracleSha256: string;
    formalToolchainManifestSha256: string;
    smtInvariantSha256: string;
    leanSemanticsSourceSha256: string;
    cvc5BinarySha256: string | null;
    ethosBinarySha256: string | null;
    z3BinarySha256: string | null;
    leanBinarySha256: string | null;
    cpcDefinitionSha256: string | null;
    cvc5ProofSha256: string | null;
    ethosCheckReceiptSha256: string | null;
    z3CountermodelReportSha256: string | null;
    leanProofReceiptSha256: string | null;
    trustedPilotKeysSha256: string;
  };
  abi: {
    inputCount: 16;
    outputCount: 8;
    integerRepresentation: 'signed-i64-little-endian';
    imports: [];
    exports: ['memory', 'evaluate'];
  };
  gates: {
    graphIntegrity: boolean;
    graphCycleFree: boolean;
    allEvidenceCurrent: boolean;
    exactArtifactCount: boolean;
    exactBenchmarkCount: boolean;
    compilerReconciled: boolean;
    nativeOracleExecuted: boolean;
    wasmInstantiated: boolean;
    nativeWasmExactParity: boolean;
    cvc5ProofVerified: boolean;
    ethosProofVerified: boolean;
    z3CountermodelAgreement: boolean;
    leanSemanticsVerified: boolean;
    solverAgreement: boolean;
    pilotCredentialKeyAvailable: boolean;
    pilotAuthorized: boolean;
    productionAuthorized: false;
  };
  refusalReasons: string[];
  signature: null;
}

export interface MedicationEnvelopeArtifactBundleV1 {
  schemaVersion: 'darwin.medication-envelope-artifact-bundle.v1';
  generatedAt: string;
  intendedUse: string;
  artifacts: ClinicalConstraintIRV1[];
  pilotAuthorized: false;
  productionAuthorized: false;
  signature: null;
}

export interface MedicationEnvelopeBenchmarkV1 {
  schemaVersion: 'darwin.medication-envelope-benchmark.v1';
  generatedAt: string;
  syntheticOnly: true;
  cases: MedicationEnvelopeBenchmarkCaseV1[];
}

export interface MedicationEnvelopeBenchmarkCaseV1 {
  id: string;
  artifactId: string;
  scenario: 'WITHIN_FIXTURE' | 'SINGLE_VIOLATION' | 'COMBINED_VIOLATION' | 'MISSING_CONTEXT';
  synthetic: true;
  input: number[];
  expectedEngineeringOutput: number[];
  clinicalExpectedDisposition: 'REFUSE';
}

export interface AdversarialEvidenceRunV1 {
  schemaVersion: 'darwin.adversarial-evidence-run.v1';
  mode: 'extractor' | 'falsifier';
  provider: string;
  model: string;
  sourceNodeId: string;
  promptSha256: string;
  sourceSha256: string;
  responseSha256: string;
  toolAccess: false;
  networkAccess: false;
  output: {
    claims: Array<{
      statement: string;
      locator: string;
      confidenceBasis: string;
    }>;
    challenges: Array<{
      claimIndex: number;
      failureMode: string;
      locator: string;
    }>;
  };
  promotionStatus: 'CANDIDATE_ONLY';
}

export interface AdversarialEvidenceReconciliationV1 {
  schemaVersion: 'darwin.adversarial-evidence-reconciliation.v1';
  extractorRunSha256: string;
  falsifierRunSha256: string;
  sourceSha256: string;
  candidateClaimDigests: string[];
  unresolvedChallenges: string[];
  humanConsensusRequired: true;
  executable: false;
}
