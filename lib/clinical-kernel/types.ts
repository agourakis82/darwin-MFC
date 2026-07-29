export type ClinicalKernelStatus = 'experimental' | 'calibrated' | 'refused';
export type ClinicalFirewallDisposition = 'REFUSE' | 'ASK' | 'DEFER' | 'ACT';

export interface ClinicalKernelReceipt {
  schemaVersion: 'darwin.sounio.clinical-receipt.v2';
  modelVersion: string;
  status: Exclude<ClinicalKernelStatus, 'refused'>;
  generatedAt: string;
  abi: {
    conditions: number;
    features: number;
    modelStrideBytes: number;
    outputStrideBytes: number;
    informationGainOffsetBytes: number;
    nextQuestionOffsetBytes: number;
    outputBytes: number;
    imports: Array<{
      module: string;
      name: string;
      signature: string;
      purpose: string;
    }>;
  };
  compiler: {
    identity: string;
    sha256: string;
    sourceFreshness: string;
  };
  hashes: {
    evidenceSha256: string;
    modelSha256: string;
    wasmSha256: string;
    [key: string]: string;
  };
  gates: {
    nativeOracleExecuted: boolean;
    wasmInstantiated: boolean;
    nativeWasmParity: boolean;
    retrospectiveCalibration: boolean;
    signatureVerified: boolean;
    [key: string]: unknown;
  };
  signature: string | null;
  refusalReasons: string[];
}

export interface ClinicalCalibrationCertificate {
  schemaVersion: 'darwin.sounio.calibration-certificate.v1';
  certificateId: string;
  modelVersion: string;
  status: 'not-calibrated' | 'calibrated' | 'expired' | 'drifted' | 'revoked';
  issuedAt: string | null;
  validFrom: string | null;
  validUntil: string | null;
  population: {
    country: string;
    careSetting: string;
    locale: string;
    ageMinimumDays: number;
    ageMaximumYearsExclusive: number;
    sites: string[];
    inclusionCriteria: string[];
    exclusionCriteria: string[];
  };
  method: {
    family: string;
    variant: string;
    alpha: number;
    calibrationSplit: string;
    decisionPolicy: string;
  };
  coverage: {
    target: number;
    marginalObserved: number | null;
    lowerConfidenceBound: number | null;
    classConditional: Record<string, number>;
    subgroupConditional: Record<string, number>;
    meanPredictionSetSize: number | null;
  };
  clinicalUtility: Record<string, number | null>;
  distribution: {
    status: 'unmeasured' | 'in-bounds' | 'out-of-bounds';
    referenceFingerprint: string | null;
    monitor: string;
    thresholds: Record<string, number>;
    lastCheckedAt: string | null;
  };
  hashes: Record<string, string | null>;
  signature: string | null;
  refusalReasons: string[];
}

export interface ClinicalFirewallPolicy {
  schemaVersion: 'darwin.sounio.epistemic-firewall-policy.v1';
  policyVersion: string;
  generatedBy: string;
  bitOrder: {
    integrityVerified: number;
    calibrationValid: number;
    signatureVerified: number;
    populationSupported: number;
    temporalValidity: number;
    distributionInBounds: number;
    redFlagPresent: number;
    additionalObservationRequired: number;
  };
  entries: Array<{
    mask: number;
    disposition: ClinicalFirewallDisposition;
    reason: string;
  }>;
}

export interface ClinicalFirewallReceipt {
  schemaVersion: 'darwin.sounio.epistemic-firewall-receipt.v1';
  policyVersion: string;
  modelVersion: string;
  status: 'refused' | 'experimental' | 'calibrated';
  generatedAt: string;
  hashes: Record<string, string>;
  gates: {
    policyOracleExecuted: boolean;
    policyTableComplete: boolean;
    calibrationCertificateValid: boolean;
    compilerReconciled: boolean;
    distributionInBounds: boolean;
    signatureVerified: boolean;
  };
  signature: string | null;
  refusalReasons: string[];
}

export interface ClinicalFirewallDecision {
  disposition: ClinicalFirewallDisposition;
  reason: string;
  mask: number;
  policyVersion: string;
  certificateId: string;
  certificateStatus: ClinicalCalibrationCertificate['status'] | 'unavailable';
}

export interface ClinicalEvidenceFeature {
  id: string;
  label: string;
  question: string;
  informationWeight: number;
}

export interface ClinicalEvidenceCondition {
  id: string;
  label: string;
  prior: number;
  uncertainty: {
    lowerFactor: number;
    upperFactor: number;
    confidence: number;
  };
  likelihoods: Record<string, [number, number]>;
}

export interface ClinicalEvidenceBundle {
  schemaVersion: 'darwin.sounio.clinical-evidence.v1';
  modelVersion: string;
  status: 'experimental';
  setting: string;
  features: ClinicalEvidenceFeature[];
  conditions: ClinicalEvidenceCondition[];
  redFlags: string[];
  references: Array<{ id: string; title: string; url: string }>;
  informationGain: {
    method: string;
    conditionalObservationApproximation: string;
    runtime: string;
    clinicalStatus: 'experimental';
  };
  limitations: string[];
}

export interface ClinicalKernelInput {
  ageYears?: number;
  symptoms: string[];
}

export interface ClinicalContribution {
  featureId: string;
  label: string;
  direction: 'increased' | 'reduced' | 'neutral';
  provenanceReferenceIds: string[];
}

export interface EpistemicHypothesis {
  conditionId: string;
  label: string;
  posterior: number;
  interval: [number, number];
  confidence: number;
  contributions: ClinicalContribution[];
}

export interface EpistemicDifferential {
  status: ClinicalKernelStatus;
  hypotheses: EpistemicHypothesis[];
  nextQuestion: { featureId: string; question: string; informationGain: number } | null;
  redFlags: string[];
  modelVersion: string;
  evidenceVersion: string;
  compilerIdentity: string;
  integrityVerified: boolean;
  signatureVerified: boolean;
  policy: ClinicalFirewallDecision;
  refusalReasons: string[];
}

export interface AdaptedClinicalInput {
  vector: Int32Array;
  presentFeatureIds: Set<string>;
  redFlags: string[];
}
