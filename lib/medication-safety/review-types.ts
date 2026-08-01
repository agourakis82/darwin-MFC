export type MedicationReviewRole =
  | 'contributor'
  | 'physician_reviewer'
  | 'pharmacist_reviewer'
  | 'terminology_steward'
  | 'clinical_admin';

export type MedicationReviewTaskStatus =
  | 'OPEN'
  | 'CLAIMED'
  | 'IN_REVIEW'
  | 'AWAITING_SECOND_REVIEW'
  | 'CONSENSUS'
  | 'DISPUTED'
  | 'ADJUDICATION'
  | 'CLOSED'
  | 'SUPERSEDED';

export type MedicationReviewTargetType =
  | 'identity-conflict'
  | 'interaction-pair'
  | 'presentation'
  | 'dose-rule';

export type MedicationReviewRisk = 'critical' | 'high' | 'routine';

export interface MedicationReviewTaskV1 {
  schemaVersion: 'darwin.medication-review-task.v1';
  id: string;
  bundleVersion: string;
  bundleSha256: string;
  targetType: MedicationReviewTargetType;
  targetId: string;
  targetDigest: string;
  category: 'identity' | 'interaction' | 'presentation' | 'dose';
  risk: MedicationReviewRisk;
  status: MedicationReviewTaskStatus;
  requiredReviewerRoles: MedicationReviewRole[];
  title: string;
  summary: string;
  sourceStatus: 'located' | 'source-unverifiable' | 'evidence-required';
  legacyValues: Array<{
    label: string;
    value: string;
    source?: string;
  }>;
  target: Record<string, unknown>;
  metadata: {
    severityConflict: boolean;
    legacyIds: string[];
    canonicalIds: string[];
    deferred: boolean;
  };
}

export interface MedicationEvidenceSubmissionV1 {
  schemaVersion: 'darwin.medication-evidence-submission.v1';
  id: string;
  taskId: string;
  contributorId: string;
  sourceUrl: string;
  sourceTitle: string;
  authority: string;
  pageLocator: string;
  claim: string;
  proposedPatch: Record<string, unknown>;
  sourceSha256: string | null;
  submittedAt: string;
  status: 'submitted' | 'withdrawn';
}

export interface MedicationReviewDecisionV1 {
  schemaVersion: 'darwin.medication-review-decision.v1';
  id: string;
  taskId: string;
  reviewerId: string;
  reviewerRole: MedicationReviewRole;
  taskDigest: string;
  decision: 'approve' | 'reject' | 'request_changes';
  proposedPatch: Record<string, unknown>;
  rationale: string;
  decidedAt: string;
}

export interface MedicationReviewConsensusV1 {
  schemaVersion: 'darwin.medication-review-consensus.v1';
  taskId: string;
  bundleSha256: string;
  targetDigest: string;
  decisionIds: string[];
  result: 'approved' | 'rejected' | 'disputed' | 'adjudicated';
  disposition: 'reviewed-candidate' | 'editorial-applied' | 'no-change';
  finalPatch: Record<string, unknown>;
  receiptDigest: string;
  reachedAt: string;
}

export interface MedicationDoseRuleCandidateV2 {
  schemaVersion: 'darwin.medication-dose-rule-candidate.v2';
  id: string;
  wave: 'respiratory-pediatric-aps' | 'high-risk' | 'rename-antimicrobials';
  medicationConceptId: string | null;
  indicationId: string;
  indicationLabel: string;
  populationLabel: string;
  status: 'evidence-required' | 'in-review' | 'reviewed-candidate';
  structuredRule: null | {
    route: string;
    presentationId: string;
    minimumAgeDays: number;
    maximumAgeDaysExclusive: number;
    weightRequired: boolean;
    doseBasis: 'fixed' | 'microgram_per_kg_per_dose' | 'microgram_per_kg_per_day';
    amountMicrogram: number;
    dosesPerDay: number;
    durationDays: number;
    maximumMicrogramPerDose: number | null;
    renalAdjustment: string | null;
    hepaticAdjustment: string | null;
    contraindications: string[];
  };
  sourceIds: string[];
  reviewDecisionIds: string[];
  productionAuthorized: false;
}

export interface MedicationEditorialOverlayV2 {
  schemaVersion: 'darwin.medication-editorial-overlay.v2';
  legacyId: string;
  commercialAliases?: string[];
  searchSynonyms?: string[];
  editorialSummary?: string;
  patientCounselingNotes?: string[];
  editorialReferences?: Array<{
    title: string;
    url: string;
    accessedAt: string;
  }>;
  translations?: Record<string, {
    editorialSummary?: string;
    patientCounselingNotes?: string[];
  }>;
  consensusReceiptDigest: string;
  source: 'supabase';
}

export interface MedicationReviewSeedV1 {
  schemaVersion: 'darwin.medication-review-seed.v1';
  bundleVersion: string;
  generatedAt: string;
  identityBundleSha256: string;
  tasks: MedicationReviewTaskV1[];
  doseReviewTasks: MedicationReviewTaskV1[];
  deferredPresentationIds: string[];
  doseRuleCandidates: MedicationDoseRuleCandidateV2[];
  audit: {
    taskCount: 177;
    identityConflictTaskCount: 25;
    interactionTaskCount: 152;
    interactionSeverityConflictCount: 7;
    doseReviewTaskCount: 5;
    deferredPresentationCount: 295;
    promotedInteractionCount: 0;
    productionDoseRuleCount: 0;
  };
}

export interface MedicationReviewReceiptV1 {
  schemaVersion: 'darwin.medication-review-receipt.v1';
  generatedAt: string;
  bundleVersion: string;
  hashes: {
    identityBundleSha256: string;
    reviewSeedSha256: string;
    generatorSha256: string;
    doseRulesSha256: string;
  };
  gates: {
    exactTaskCount: boolean;
    noDuplicateTargets: boolean;
    severityConflictsLinkedNotDuplicated: boolean;
    presentationsDeferred: boolean;
    doseCandidatesCannotCalculate: boolean;
    interactionsRemainNotPromoted: boolean;
    productionDoseRulesRemainEmpty: boolean;
    productionAuthorized: false;
  };
  signature: null;
}
