export type MedicationSafetyDisposition =
  | 'REFUSE'
  | 'REVIEW'
  | 'READY_FOR_CONFIRMATION';

export type MedicationDoseBasis =
  | 'fixed'
  | 'microgram_per_kg_per_dose'
  | 'microgram_per_kg_per_day';

export type MedicationKnowledgeStatus =
  | 'reference-only'
  | 'dose-reviewed'
  | 'data-incomplete';

export type MedicationRuleReviewStatus =
  | 'candidate'
  | 'approved'
  | 'expired'
  | 'revoked';

export interface MedicationSourceSnapshotV1 {
  id: string;
  title: string;
  authority: string;
  jurisdiction: 'BR' | 'WHO' | 'US' | 'HL7';
  role:
    | 'formulary'
    | 'regulatory-label'
    | 'clinical-guideline'
    | 'interoperability'
    | 'safety-policy';
  url: string;
  retrievedAt: string;
  mediaType: string;
  bytes: number;
  sha256: string;
}

export interface MedicationRuleReviewerV1 {
  role: 'physician' | 'pharmacist';
  reviewerId: string;
  reviewedAt: string;
  decision: 'approved' | 'rejected';
}

export interface MedicationPresentationV1 {
  id: string;
  form: string;
  concentrationText: string;
  availableInSus: boolean;
  concentrationMicrogramPerMilliliter?: number;
  administrationIncrementMicroliter?: number;
}

export interface MedicationDoseRuleV1 {
  schemaVersion: 'darwin.medication-dose-rule.v1';
  id: string;
  medicationId: string;
  indicationId: string;
  indicationLabel: string;
  route: string;
  presentationId: string;
  population: {
    minimumAgeDays: number;
    maximumAgeDaysExclusive: number;
    weightRequired: boolean;
  };
  dose: {
    basis: MedicationDoseBasis;
    amountMicrogram: number;
    dosesPerDay: number;
    maximumMicrogramPerDose?: number;
    durationDays?: number;
  };
  review: {
    status: MedicationRuleReviewStatus;
    reviewers: MedicationRuleReviewerV1[];
    validFrom: string;
    validUntil: string;
    sourceIds: string[];
  };
}

export interface MedicationKnowledgeEntryV1 {
  medicationId: string;
  genericName: string;
  atcCode: string | null;
  rename: boolean;
  therapeuticClass: string;
  presentations: MedicationPresentationV1[];
  indicationLabels: string[];
  contraindicationCount: number;
  interactionCount: number;
  sourceReferenceIds: string[];
  sourceStatus: 'indexed-reference' | 'local-reference' | 'missing';
  knowledgeStatus: MedicationKnowledgeStatus;
  structuredDoseRuleIds: string[];
  clinicalContentSha256: string;
}

export interface MedicationKnowledgeBundleV1 {
  schemaVersion: 'darwin.medication-knowledge-bundle.v1';
  bundleVersion: string;
  generatedAt: string;
  status: 'unsigned-reference-only' | 'reviewed';
  intendedUse: string;
  sourceSnapshots: MedicationSourceSnapshotV1[];
  medications: MedicationKnowledgeEntryV1[];
  doseRules: MedicationDoseRuleV1[];
  audit: {
    expectedMedicationCount: number;
    uniqueMedicationCount: number;
    referenceOnlyCount: number;
    doseReviewedCount: number;
    dataIncompleteCount: number;
    localReferenceCount: number;
    pediatricPosologyCount: number;
    doseMaximumCount: number;
    renalAdjustmentCount: number;
    hepaticAdjustmentCount: number;
  };
  signature: null | {
    algorithm: string;
    keyId: string;
    value: string;
  };
}

export interface PatientMedicationContextV1 {
  ageDays?: number;
  weightGram?: number;
  sexAtBirth?: 'female' | 'male' | 'unknown';
  allergyMedicationIds: string[];
  allergyClassIds: string[];
  currentMedicationIds: string[];
  estimatedGlomerularFiltrationRate?: number;
  hepaticStatus?: 'none' | 'mild' | 'moderate' | 'severe' | 'unknown';
  pregnancyStatus?: 'not-applicable' | 'not-pregnant' | 'pregnant' | 'unknown';
  lactationStatus?: 'not-applicable' | 'not-lactating' | 'lactating' | 'unknown';
}

export interface MedicationSafetyBlockerV1 {
  code: string;
  message: string;
}

export interface MedicationSafetyWarningV1 {
  code: string;
  message: string;
}

export interface MedicationSafetyResultV1 {
  schemaVersion: 'darwin.sounio.medication-safety-result.v1';
  disposition: MedicationSafetyDisposition;
  medicationId: string;
  ruleId: string | null;
  calculatedDoseMicrogram: number | null;
  unroundedDoseMicrogram: number | null;
  administrationVolumeMicroliter: number | null;
  maximumDoseApplied: boolean;
  blockers: MedicationSafetyBlockerV1[];
  warnings: MedicationSafetyWarningV1[];
  explanation: string[];
  sourceIds: string[];
  receiptSha256: string | null;
  integrityVerified: boolean;
}

export interface MedicationSafetyReceiptV1 {
  schemaVersion: 'darwin.sounio.medication-safety-receipt.v1';
  receiptId: string;
  generatedAt: string;
  status: 'reference-only' | 'reviewed';
  compiler: {
    identity: string;
    sha256: string;
    sourceReceiptSchemaVersion: 'darwin.sounio.compiler-source-receipt.v1';
    sourceReceiptSha256: string;
  };
  abi: {
    inputCount: 26;
    outputCount: 8;
    inputOffsetBytes: number;
    outputOffsetBytes: number;
    integerRepresentation: 'signed-i64-little-endian';
    exports: ['memory', 'evaluate'];
    imports: [];
  };
  hashes: {
    medicationKnowledgeBundleSha256: string;
    sourceRegistrySha256: string;
    doseRulesSha256: string;
    trustedSigningKeysSha256: string;
    sounioSourceSha256: string;
    sounioCodegenSha256: string;
    compilerSourceReceiptSha256: string;
    wasmSha256: string;
    testVectorsSha256: string;
  };
  gates: {
    exactMedicationCount: boolean;
    uniqueMedicationIds: boolean;
    compilerReconciled: boolean;
    nativeOracleExecuted: boolean;
    wasmInstantiated: boolean;
    nativeWasmExactParity: boolean;
    integerOverflowEnvelopeTested: boolean;
    noWasmImports: boolean;
    productionReviewedRules: boolean;
    signatureVerified: boolean;
    productionAuthorized: boolean;
  };
  refusalReasons: string[];
  signature: null;
}

export interface MedicationSafetyEvaluationRequestV1 {
  medicationId: string;
  ruleId: string;
  patient: PatientMedicationContextV1;
  indicationSelected: boolean;
  presentationSelected: boolean;
  severeInteraction: boolean;
  moderateInteraction: boolean;
  allergyBlocked: boolean;
  renalContextBlocked: boolean;
  hepaticContextBlocked: boolean;
  reproductiveContextBlocked: boolean;
  lactationWarning: boolean;
  duplicateTherapy: boolean;
}

export interface PrescriptionTextV1 {
  medicamento: string;
  posologia: string;
  duracao?: string;
}

export interface LegacyPrescriptionV1 extends PrescriptionTextV1 {
  verificationStatus?: 'legacy-unverified';
}

export interface StructuredPrescriptionDraftV2 extends PrescriptionTextV1 {
  schemaVersion: 'darwin.structured-prescription-draft.v2';
  medicationId: string;
  indicationId: string;
  route: string;
  presentationId: string;
  verificationStatus:
    | 'reference-only'
    | 'ready-for-confirmation'
    | 'professionally-confirmed';
  safetyResult: MedicationSafetyResultV1;
  professionalConfirmation?: {
    confirmedAt: string;
    statementVersion: 'darwin.medication-professional-confirmation.v1';
  };
}

export type SOAPPrescriptionV2 = LegacyPrescriptionV1 | StructuredPrescriptionDraftV2;

export function isStructuredPrescriptionDraftV2(
  prescription: SOAPPrescriptionV2,
): prescription is StructuredPrescriptionDraftV2 {
  return 'schemaVersion' in prescription
    && prescription.schemaVersion === 'darwin.structured-prescription-draft.v2';
}
