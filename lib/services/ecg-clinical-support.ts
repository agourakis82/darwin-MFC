/**
 * ECG CLINICAL SUPPORT SERVICE - DARWIN-MFC
 * ==========================================
 *
 * Decision support service for non-cardiologist physicians interpreting ECGs.
 * Provides systematic analysis, red flag identification, referral recommendations,
 * and context-specific protocols.
 *
 * This service integrates with the ECG module's data layer to provide:
 * - Automated finding analysis for non-specialists
 * - Red flag detection with urgency classification
 * - Referral decision support
 * - Context-specific protocol recommendations
 * - Structured report generation
 *
 * References:
 * - AHA/ACC/HRS Guidelines for ECG Interpretation 2024
 * - ESC Guidelines for Acute Coronary Syndromes 2023
 * - Sociedade Brasileira de Cardiologia 2024
 *
 * @module lib/services/ecg-clinical-support
 * @version 1.0.0
 */

import type {
  ClinicalContext,
  ECGLeadName,
  RhythmType,
  AxisClassification,
  STChange,
  TWaveMorphology,
  QRSMorphology,
  ECGRedFlag,
  ECGRedFlagCode,
  ECGReferralUrgency,
  ECGTriageCategory,
  ECGChecklistResponse,
} from '@/lib/types/ecg';

import {
  ecgRedFlags,
  getRedFlagsByUrgency,
  getRedFlagsByCategory,
  searchRedFlags,
  type UrgencyLevel as RedFlagUrgencyLevel,
  type ECGRedFlagCategoria,
} from '@/lib/data/ecg/clinical-support/red-flags';

import {
  allReferralCriteria,
  shouldRefer,
  getReferralPriority,
  generateActionSummary,
  getContextSpecificGuidance,
  type CategoriaUrgencia,
  type EspecialidadeDestino,
  type ECGReferralCriteria,
} from '@/lib/data/ecg/clinical-support/referral-criteria';

import {
  ecgInterpretationChecklist,
  generateChecklistReport,
  calculateQTcBazett,
  calculateQTcFridericia,
  assessQTc,
  getAxisInterpretation,
  type ChecklistResponse,
  type ChecklistReport,
} from '@/lib/data/ecg/clinical-support/interpretation-checklist';

// =============================================================================
// INTERFACES
// =============================================================================

/**
 * Input structure for ECG findings analysis
 */
export interface ECGFindings {
  /** Rhythm classification */
  rhythm?: string;
  /** Heart rate in bpm */
  rate?: number;
  /** Axis classification or degree */
  axis?: string | number;
  /** Interval measurements in milliseconds */
  intervals?: {
    pr?: number;
    qrs?: number;
    qt?: number;
    qtc?: number;
  };
  /** ST segment changes by lead */
  stChanges?: STChangeDetail[];
  /** T wave changes by lead */
  tWaveChanges?: TWaveChangeDetail[];
  /** P wave findings */
  pWaveFindings?: string;
  /** QRS morphology findings */
  qrsMorphology?: string;
  /** Voltage findings (HVE, HVD, low voltage) */
  voltageFindings?: string;
  /** Q wave findings */
  qWaveFindings?: string;
  /** Other findings as free text */
  otherFindings?: string[];
  /** Raw finding codes for direct matching */
  findingCodes?: string[];
}

/**
 * ST segment change detail
 */
export interface STChangeDetail {
  /** Lead showing the change */
  lead: ECGLeadName;
  /** Type of change */
  type: 'elevation' | 'depression' | 'normal';
  /** Magnitude in mm */
  magnitude?: number;
  /** Shape of ST segment */
  shape?: 'concave' | 'convex' | 'horizontal' | 'downsloping';
}

/**
 * T wave change detail
 */
export interface TWaveChangeDetail {
  /** Lead showing the change */
  lead: ECGLeadName;
  /** Type of change */
  type: 'normal' | 'inverted' | 'biphasic' | 'flattened' | 'peaked' | 'hyperacute';
  /** Additional description */
  description?: string;
}

/**
 * Abnormal finding with clinical context
 */
export interface AbnormalFinding {
  /** Finding code */
  code: string;
  /** Human-readable description */
  description: string;
  /** Severity level */
  severity: 'mild' | 'moderate' | 'severe' | 'critical';
  /** Affected leads if applicable */
  leadsAffected?: ECGLeadName[];
  /** Clinical significance */
  clinicalSignificance: string;
  /** Possible causes */
  possibleCauses: string[];
  /** Recommended actions */
  recommendedActions: string[];
}

/**
 * Red flag result with urgency and actions
 */
export interface RedFlagResult {
  /** Unique identifier */
  id: string;
  /** Red flag code */
  code: string;
  /** Red flag name */
  name: string;
  /** Urgency level (1-4) */
  urgencyLevel: 1 | 2 | 3 | 4;
  /** Category */
  category: 'emergencia' | 'urgente' | 'alerta';
  /** Time to action */
  timeToAction: string;
  /** Immediate actions required */
  immediateActions: string[];
  /** Actions to avoid */
  actionsToAvoid: string[];
  /** Who to contact */
  whoToContact: string[];
  /** Triggered criteria */
  triggeredBy: string[];
}

/**
 * Suggested action for the clinician
 */
export interface SuggestedAction {
  /** Action identifier */
  id: string;
  /** Action description */
  action: string;
  /** Priority level */
  priority: 'immediate' | 'urgent' | 'soon' | 'routine';
  /** Category of action */
  category: 'diagnostic' | 'therapeutic' | 'monitoring' | 'consultation' | 'referral';
  /** Rationale for the action */
  rationale: string;
  /** Time frame for action */
  timeframe: string;
}

/**
 * Complete analysis result
 */
export interface AnalysisResult {
  /** Overall classification */
  classification: 'normal' | 'anormal_nao_urgente' | 'anormal_urgente' | 'emergencia';
  /** Normal findings identified */
  normalFindings: string[];
  /** Abnormal findings with details */
  abnormalFindings: AbnormalFinding[];
  /** Red flags identified */
  redFlags: RedFlagResult[];
  /** Suggested actions */
  suggestedActions: SuggestedAction[];
  /** Urgency level (1=routine, 2=24-48h, 3=hours, 4=immediate) */
  urgencyLevel: 1 | 2 | 3 | 4;
  /** Confidence score (0-1) */
  confidence: number;
  /** Reasoning explanation */
  reasoning: string;
  /** Timestamp of analysis */
  timestamp: Date;
}

/**
 * Structured ECG interpretation report
 */
export interface ECGReport {
  /** Report identifier */
  id: string;
  /** Report timestamp */
  timestamp: Date;
  /** Patient context (optional, anonymized) */
  patientContext?: {
    age?: number;
    sex?: 'M' | 'F';
    clinicalHistory?: string[];
    currentMedications?: string[];
    chiefComplaint?: string;
  };
  /** Technical quality assessment */
  technicalQuality: {
    isInterpretable: boolean;
    qualityIssues?: string[];
  };
  /** Systematic interpretation sections */
  sections: {
    rhythm: {
      description: string;
      isNormal: boolean;
      findings: string[];
    };
    rate: {
      value: number;
      classification: 'bradycardia' | 'normal' | 'tachycardia';
      isNormal: boolean;
    };
    axis: {
      value?: number;
      classification: string;
      isNormal: boolean;
    };
    intervals: {
      pr: { value?: number; interpretation: string; isNormal: boolean };
      qrs: { value?: number; interpretation: string; isNormal: boolean };
      qtc: { value?: number; interpretation: string; isNormal: boolean; riskLevel?: string };
    };
    morphology: {
      pWave: string;
      qrs: string;
      stSegment: string;
      tWave: string;
    };
  };
  /** Normal findings summary */
  normalFindings: string[];
  /** Abnormal findings summary */
  abnormalFindings: AbnormalFinding[];
  /** Urgency assessment */
  urgencyAssessment: {
    level: 1 | 2 | 3 | 4;
    category: 'normal' | 'anormal_nao_urgente' | 'anormal_urgente' | 'emergencia';
    reasoning: string;
  };
  /** Recommended actions */
  recommendedActions: SuggestedAction[];
  /** Red flags if any */
  redFlags: RedFlagResult[];
  /** Overall impression */
  impression: {
    summary: string;
    primaryDiagnosis?: string;
    differentialDiagnoses?: string[];
  };
  /** Comparison with previous ECG if available */
  comparison?: {
    hasPrevious: boolean;
    changes?: string[];
    isSignificantChange: boolean;
  };
}

/**
 * Referral suggestion result
 */
export interface ReferralSuggestion {
  /** Should refer? */
  shouldRefer: boolean;
  /** Referral recommendation level */
  recommendation: 'none' | 'routine' | 'priority' | 'emergency';
  /** Timeframe for referral */
  timeframe: string;
  /** Destination specialty */
  destination: EspecialidadeDestino;
  /** Rationale for referral */
  rationale: string;
  /** Required information for referral */
  requiredInformation: string[];
  /** Pre-referral workup */
  preReferralWorkup: string[];
  /** Actions while awaiting referral */
  actionsWhileAwaiting: string[];
  /** Matched referral criteria */
  matchedCriteria: ECGReferralCriteria[];
}

/**
 * Contextual protocol based on clinical setting
 */
export interface ContextualProtocol {
  /** Protocol identifier */
  id: string;
  /** Clinical setting */
  setting: ClinicalContext;
  /** Setting-specific priorities */
  priorities: string[];
  /** Quick checklist for the setting */
  quickChecklist: string[];
  /** Actions while awaiting */
  actionsWhileAwaiting: string[];
  /** Common mistakes to avoid */
  commonMistakes: string[];
  /** Time constraints */
  timeConstraints: string;
  /** Available resources typically */
  typicalResources: string[];
  /** Escalation criteria */
  escalationCriteria: string[];
  /** Finding-specific recommendations */
  findingSpecificRecommendations: {
    finding: string;
    action: string;
    urgency: string;
  }[];
}

/**
 * Urgency classification result
 */
export interface UrgencyClassification {
  /** Urgency level (1-4) */
  level: 1 | 2 | 3 | 4;
  /** Category name */
  category: 'rotina' | 'alerta' | 'urgente' | 'emergencia';
  /** Reasoning for classification */
  reasoning: string;
  /** Time-sensitive actions */
  timeSensitiveActions: {
    action: string;
    timeframe: string;
    rationale: string;
  }[];
  /** Factors that increased urgency */
  urgencyFactors: string[];
  /** Factors that decreased urgency (if any) */
  mitigatingFactors: string[];
}

/**
 * Complete action plan
 */
export interface ActionPlan {
  /** Plan identifier */
  id: string;
  /** Timestamp */
  timestamp: Date;
  /** Clinical context */
  context: ClinicalContext;
  /** Immediate actions (minutes) */
  immediateActions: {
    action: string;
    priority: number;
    rationale: string;
    timeframe: string;
  }[];
  /** Short-term actions (hours to 24h) */
  shortTermActions: {
    action: string;
    priority: number;
    rationale: string;
    timeframe: string;
  }[];
  /** Monitoring requirements */
  monitoring: {
    parameter: string;
    frequency: string;
    alertThreshold?: string;
  }[];
  /** Follow-up requirements */
  followUp: {
    action: string;
    timeframe: string;
    responsible: string;
  }[];
  /** Red flags to watch for */
  redFlagsToWatch: string[];
  /** Documentation requirements */
  documentationRequirements: string[];
}

// =============================================================================
// CONSTANTS
// =============================================================================

/** Normal ECG reference values */
const NORMAL_VALUES = {
  rate: { min: 60, max: 100 },
  pr: { min: 120, max: 200 },
  qrs: { max: 120 },
  qtc: { male: 450, female: 460, highRisk: 500, veryHighRisk: 550 },
  axis: { min: -30, max: 90 },
};

/** Urgency level labels */
const URGENCY_LABELS: Record<1 | 2 | 3 | 4, string> = {
  1: 'Rotina',
  2: '24-48 horas',
  3: '1-2 horas',
  4: 'Imediato',
};

/** Classification to urgency mapping */
const CLASSIFICATION_TO_URGENCY: Record<AnalysisResult['classification'], 1 | 2 | 3 | 4> = {
  normal: 1,
  anormal_nao_urgente: 2,
  anormal_urgente: 3,
  emergencia: 4,
};

// =============================================================================
// MAIN FUNCTIONS
// =============================================================================

/**
 * Analyzes ECG findings for non-specialist physicians
 *
 * Takes ECG findings as input and returns a comprehensive analysis including:
 * - Classification (normal/abnormal_non_urgent/abnormal_urgent/emergency)
 * - Identified findings (normal and abnormal)
 * - Suggested actions
 * - Confidence score
 *
 * @param findings - ECG findings to analyze
 * @returns Complete analysis result
 */
export function analyzeForNonSpecialist(findings: ECGFindings): AnalysisResult {
  const normalFindings: string[] = [];
  const abnormalFindings: AbnormalFinding[] = [];
  const redFlagsFound: RedFlagResult[] = [];
  const suggestedActions: SuggestedAction[] = [];
  const reasoningParts: string[] = [];

  let maxUrgency: 1 | 2 | 3 | 4 = 1;
  let confidenceFactors = 0;
  let totalFactors = 0;

  // Analyze rhythm
  if (findings.rhythm) {
    totalFactors++;
    const rhythmAnalysis = analyzeRhythm(findings.rhythm, findings.rate);
    if (rhythmAnalysis.isNormal) {
      normalFindings.push(rhythmAnalysis.description);
      confidenceFactors++;
    } else {
      abnormalFindings.push(rhythmAnalysis.finding!);
      if (rhythmAnalysis.urgency > maxUrgency) {
        maxUrgency = rhythmAnalysis.urgency;
      }
      suggestedActions.push(...rhythmAnalysis.actions);
      reasoningParts.push(rhythmAnalysis.reasoning);
    }
  }

  // Analyze rate
  if (findings.rate !== undefined) {
    totalFactors++;
    const rateAnalysis = analyzeRate(findings.rate);
    if (rateAnalysis.isNormal) {
      normalFindings.push(rateAnalysis.description);
      confidenceFactors++;
    } else {
      abnormalFindings.push(rateAnalysis.finding!);
      if (rateAnalysis.urgency > maxUrgency) {
        maxUrgency = rateAnalysis.urgency;
      }
      suggestedActions.push(...rateAnalysis.actions);
      reasoningParts.push(rateAnalysis.reasoning);
    }
  }

  // Analyze axis
  if (findings.axis !== undefined) {
    totalFactors++;
    const axisAnalysis = analyzeAxis(findings.axis);
    if (axisAnalysis.isNormal) {
      normalFindings.push(axisAnalysis.description);
      confidenceFactors++;
    } else {
      abnormalFindings.push(axisAnalysis.finding!);
      if (axisAnalysis.urgency > maxUrgency) {
        maxUrgency = axisAnalysis.urgency;
      }
      reasoningParts.push(axisAnalysis.reasoning);
    }
  }

  // Analyze intervals
  if (findings.intervals) {
    const intervalAnalysis = analyzeIntervals(findings.intervals, findings.rate);
    totalFactors += intervalAnalysis.totalChecked;
    confidenceFactors += intervalAnalysis.normalCount;
    normalFindings.push(...intervalAnalysis.normalFindings);
    abnormalFindings.push(...intervalAnalysis.abnormalFindings);
    suggestedActions.push(...intervalAnalysis.actions);
    if (intervalAnalysis.maxUrgency > maxUrgency) {
      maxUrgency = intervalAnalysis.maxUrgency;
    }
    reasoningParts.push(...intervalAnalysis.reasoning);
  }

  // Analyze ST changes
  if (findings.stChanges && findings.stChanges.length > 0) {
    totalFactors++;
    const stAnalysis = analyzeSTChanges(findings.stChanges);
    if (stAnalysis.isNormal) {
      normalFindings.push(stAnalysis.description);
      confidenceFactors++;
    } else {
      abnormalFindings.push(...stAnalysis.findings);
      suggestedActions.push(...stAnalysis.actions);
      if (stAnalysis.urgency > maxUrgency) {
        maxUrgency = stAnalysis.urgency;
      }
      reasoningParts.push(stAnalysis.reasoning);
      // ST elevation is a major red flag
      if (stAnalysis.hasSTEMI) {
        const stemiRedFlag = createRedFlagResult('iamcsst-anterior', ['ST elevation in contiguous leads']);
        if (stemiRedFlag) {
          redFlagsFound.push(stemiRedFlag);
        }
      }
    }
  }

  // Analyze T wave changes
  if (findings.tWaveChanges && findings.tWaveChanges.length > 0) {
    totalFactors++;
    const tAnalysis = analyzeTWaveChanges(findings.tWaveChanges);
    if (tAnalysis.isNormal) {
      normalFindings.push(tAnalysis.description);
      confidenceFactors++;
    } else {
      abnormalFindings.push(...tAnalysis.findings);
      suggestedActions.push(...tAnalysis.actions);
      if (tAnalysis.urgency > maxUrgency) {
        maxUrgency = tAnalysis.urgency;
      }
      reasoningParts.push(tAnalysis.reasoning);
    }
  }

  // Analyze other findings and check for red flags
  if (findings.otherFindings && findings.otherFindings.length > 0) {
    for (const finding of findings.otherFindings) {
      const matchedRedFlags = searchRedFlags(finding);
      for (const rf of matchedRedFlags) {
        const redFlagResult = createRedFlagResultFromData(rf, [finding]);
        if (redFlagResult) {
          redFlagsFound.push(redFlagResult);
          if (redFlagResult.urgencyLevel > maxUrgency) {
            maxUrgency = redFlagResult.urgencyLevel;
          }
        }
      }
    }
  }

  // Check direct finding codes
  if (findings.findingCodes && findings.findingCodes.length > 0) {
    for (const code of findings.findingCodes) {
      const matchedRedFlags = searchRedFlags(code);
      for (const rf of matchedRedFlags) {
        // Avoid duplicates
        if (!redFlagsFound.some(existing => existing.id === rf.id)) {
          const redFlagResult = createRedFlagResultFromData(rf, [code]);
          if (redFlagResult) {
            redFlagsFound.push(redFlagResult);
            if (redFlagResult.urgencyLevel > maxUrgency) {
              maxUrgency = redFlagResult.urgencyLevel;
            }
          }
        }
      }
    }
  }

  // Add red flag actions to suggested actions
  for (const rf of redFlagsFound) {
    for (const action of rf.immediateActions) {
      suggestedActions.push({
        id: `rf-action-${rf.id}-${suggestedActions.length}`,
        action,
        priority: rf.urgencyLevel === 4 ? 'immediate' : rf.urgencyLevel === 3 ? 'urgent' : 'soon',
        category: 'therapeutic',
        rationale: `Red flag: ${rf.name}`,
        timeframe: rf.timeToAction,
      });
    }
  }

  // Determine classification based on urgency
  const classification = urgencyToClassification(maxUrgency);

  // Calculate confidence
  const confidence = totalFactors > 0 ? confidenceFactors / totalFactors : 0.5;

  // Build reasoning
  const reasoning = buildReasoning(classification, abnormalFindings, redFlagsFound, reasoningParts);

  // Sort and deduplicate suggested actions
  const uniqueActions = deduplicateActions(suggestedActions);
  uniqueActions.sort((a, b) => priorityToNumber(a.priority) - priorityToNumber(b.priority));

  return {
    classification,
    normalFindings,
    abnormalFindings,
    redFlags: redFlagsFound,
    suggestedActions: uniqueActions,
    urgencyLevel: maxUrgency,
    confidence: Math.min(1, confidence + (redFlagsFound.length > 0 ? 0.2 : 0)),
    reasoning,
    timestamp: new Date(),
  };
}

/**
 * Generates a structured interpretation report from checklist responses
 *
 * @param checklistResponses - Completed checklist responses organized by step
 * @returns Structured ECG interpretation report
 */
export function generateSystematicReport(
  checklistResponses: Record<string, ChecklistResponse[]>
): ECGReport {
  // Use the existing checklist report generator
  const baseReport = generateChecklistReport(checklistResponses);

  // Extract findings from responses
  const normalFindings: string[] = [];
  const abnormalFindings: AbnormalFinding[] = [];

  for (const stepId of Object.keys(checklistResponses)) {
    const responses = checklistResponses[stepId];
    for (const response of responses) {
      if (response.isNormal) {
        normalFindings.push(`${response.itemId}: ${response.resposta}`);
      } else {
        abnormalFindings.push({
          code: response.itemId,
          description: response.resposta,
          severity: determineSeverityFromResponse(response),
          clinicalSignificance: 'Requires evaluation',
          possibleCauses: [],
          recommendedActions: [],
        });
      }
    }
  }

  // Convert red flags from checklist report
  const redFlags = baseReport.redFlagsIdentified.map((rf, index) => ({
    id: `checklist-rf-${index}`,
    code: 'checklist_finding',
    name: rf,
    urgencyLevel: baseReport.overallAssessment === 'emergencia' ? 4 as const :
                  baseReport.overallAssessment === 'anormal_urgente' ? 3 as const :
                  baseReport.overallAssessment === 'anormal_nao_urgente' ? 2 as const : 1 as const,
    category: baseReport.overallAssessment === 'emergencia' ? 'emergencia' as const :
              baseReport.overallAssessment === 'anormal_urgente' ? 'urgente' as const : 'alerta' as const,
    timeToAction: baseReport.overallAssessment === 'emergencia' ? 'imediato' :
                  baseReport.overallAssessment === 'anormal_urgente' ? '1-2h' : '24-48h',
    immediateActions: baseReport.recommendations,
    actionsToAvoid: [],
    whoToContact: ['Cardiologista'],
    triggeredBy: [rf],
  }));

  // Build recommended actions
  const recommendedActions: SuggestedAction[] = baseReport.recommendations.map((rec, index) => ({
    id: `rec-${index}`,
    action: rec,
    priority: baseReport.overallAssessment === 'emergencia' ? 'immediate' as const :
              baseReport.overallAssessment === 'anormal_urgente' ? 'urgent' as const : 'routine' as const,
    category: 'consultation' as const,
    rationale: 'Based on systematic checklist evaluation',
    timeframe: baseReport.overallAssessment === 'emergencia' ? 'imediato' :
               baseReport.overallAssessment === 'anormal_urgente' ? '24h' : '7 dias',
  }));

  // Map classification
  const urgencyLevel = baseReport.overallAssessment === 'emergencia' ? 4 :
                       baseReport.overallAssessment === 'anormal_urgente' ? 3 :
                       baseReport.overallAssessment === 'anormal_nao_urgente' ? 2 : 1;

  const report: ECGReport = {
    id: `report-${Date.now()}`,
    timestamp: baseReport.timestamp,
    technicalQuality: {
      isInterpretable: true,
      qualityIssues: [],
    },
    sections: {
      rhythm: {
        description: extractSectionValue(checklistResponses, 'ritmo'),
        isNormal: !abnormalFindings.some(f => f.code.includes('ritmo')),
        findings: [],
      },
      rate: {
        value: extractNumericValue(checklistResponses, 'frequencia') || 0,
        classification: determineRateClassification(extractNumericValue(checklistResponses, 'frequencia')),
        isNormal: !abnormalFindings.some(f => f.code.includes('freq')),
      },
      axis: {
        value: extractNumericValue(checklistResponses, 'eixo'),
        classification: extractSectionValue(checklistResponses, 'eixo') || 'indeterminado',
        isNormal: !abnormalFindings.some(f => f.code.includes('eixo')),
      },
      intervals: {
        pr: {
          value: extractNumericValue(checklistResponses, 'intervalo-pr'),
          interpretation: extractSectionValue(checklistResponses, 'intervalo-pr') || 'nao avaliado',
          isNormal: !abnormalFindings.some(f => f.code.includes('pr')),
        },
        qrs: {
          value: extractNumericValue(checklistResponses, 'intervalo-qrs'),
          interpretation: extractSectionValue(checklistResponses, 'intervalo-qrs') || 'nao avaliado',
          isNormal: !abnormalFindings.some(f => f.code.includes('qrs')),
        },
        qtc: {
          value: extractNumericValue(checklistResponses, 'intervalo-qt'),
          interpretation: extractSectionValue(checklistResponses, 'intervalo-qt') || 'nao avaliado',
          isNormal: !abnormalFindings.some(f => f.code.includes('qt')),
        },
      },
      morphology: {
        pWave: extractSectionValue(checklistResponses, 'morf-onda-p') || 'nao avaliado',
        qrs: extractSectionValue(checklistResponses, 'morf-qrs') || 'nao avaliado',
        stSegment: extractSectionValue(checklistResponses, 'morf-st') || 'nao avaliado',
        tWave: extractSectionValue(checklistResponses, 'morf-t') || 'nao avaliado',
      },
    },
    normalFindings,
    abnormalFindings,
    urgencyAssessment: {
      level: urgencyLevel as 1 | 2 | 3 | 4,
      category: baseReport.overallAssessment,
      reasoning: baseReport.summary,
    },
    recommendedActions,
    redFlags,
    impression: {
      summary: baseReport.summary,
      primaryDiagnosis: abnormalFindings.length > 0 ? abnormalFindings[0].description : undefined,
      differentialDiagnoses: abnormalFindings.slice(1).map(f => f.description),
    },
  };

  return report;
}

/**
 * Identifies red flags in ECG findings
 *
 * Scans findings for critical red flags that require immediate attention.
 * Returns a list of identified red flags with urgency levels and immediate actions.
 *
 * @param findings - ECG findings to scan
 * @returns Array of identified red flags
 */
export function identifyRedFlags(findings: ECGFindings): RedFlagResult[] {
  const redFlagsFound: RedFlagResult[] = [];
  const searchTerms: string[] = [];

  // Build search terms from findings
  if (findings.rhythm) {
    searchTerms.push(findings.rhythm);

    // Check for specific dangerous rhythms
    const dangerousRhythms = [
      'fibrilacao ventricular', 'ventricular fibrillation', 'fv',
      'taquicardia ventricular', 'ventricular tachycardia', 'tv',
      'torsades', 'flutter ventricular',
      'assistolia', 'asystole',
      'bavt', 'bloqueio atrioventricular total', 'complete heart block',
    ];
    for (const dangerous of dangerousRhythms) {
      if (findings.rhythm.toLowerCase().includes(dangerous)) {
        searchTerms.push(dangerous);
      }
    }
  }

  // Check rate extremes
  if (findings.rate !== undefined) {
    if (findings.rate < 40) {
      searchTerms.push('bradicardia severa');
    }
    if (findings.rate > 150 && findings.intervals?.qrs && findings.intervals.qrs >= 120) {
      searchTerms.push('taquicardia ventricular');
    }
  }

  // Check intervals
  if (findings.intervals) {
    if (findings.intervals.qtc && findings.intervals.qtc > 500) {
      searchTerms.push('qt longo');
      searchTerms.push('torsades');
    }
    if (findings.intervals.qrs && findings.intervals.qrs >= 120) {
      searchTerms.push('bloqueio de ramo');
    }
    if (findings.intervals.pr && findings.intervals.pr < 120) {
      searchTerms.push('pre-excitacao');
      searchTerms.push('wpw');
    }
  }

  // Check ST changes for STEMI
  if (findings.stChanges) {
    const elevations = findings.stChanges.filter(
      st => st.type === 'elevation' && st.magnitude && st.magnitude >= 1
    );
    if (elevations.length >= 2) {
      // Check for contiguous leads
      const contiguousGroups = [
        ['V1', 'V2', 'V3', 'V4'], // Anterior
        ['V3', 'V4', 'V5', 'V6'], // Anterolateral
        ['I', 'aVL'], // Lateral high
        ['II', 'III', 'aVF'], // Inferior
        ['V5', 'V6', 'I', 'aVL'], // Lateral
      ];
      for (const group of contiguousGroups) {
        const matchingLeads = elevations.filter(e => group.includes(e.lead));
        if (matchingLeads.length >= 2) {
          searchTerms.push('iamcsst');
          searchTerms.push('stemi');
          break;
        }
      }
    }

    // Check for posterior MI (depression in V1-V3)
    const anteriorDepressions = findings.stChanges.filter(
      st => st.type === 'depression' &&
            ['V1', 'V2', 'V3'].includes(st.lead) &&
            st.magnitude && st.magnitude >= 1
    );
    if (anteriorDepressions.length >= 2) {
      searchTerms.push('iamcsst-posterior');
    }
  }

  // Check T wave changes
  if (findings.tWaveChanges) {
    const hyperacute = findings.tWaveChanges.filter(t => t.type === 'hyperacute' || t.type === 'peaked');
    if (hyperacute.length > 0) {
      searchTerms.push('isquemia aguda');
      searchTerms.push('hipercalemia');
    }

    // Wellens syndrome
    const wellensPattern = findings.tWaveChanges.filter(
      t => (t.type === 'inverted' || t.type === 'biphasic') &&
           ['V2', 'V3', 'V4'].includes(t.lead)
    );
    if (wellensPattern.length >= 2) {
      searchTerms.push('wellens');
      searchTerms.push('iamsst-alto-risco');
    }
  }

  // Add other findings
  if (findings.otherFindings) {
    searchTerms.push(...findings.otherFindings);
  }

  if (findings.findingCodes) {
    searchTerms.push(...findings.findingCodes);
  }

  // Search for red flags
  const seenIds = new Set<string>();
  for (const term of searchTerms) {
    const matches = searchRedFlags(term);
    for (const match of matches) {
      if (!seenIds.has(match.id)) {
        seenIds.add(match.id);
        const result = createRedFlagResultFromData(match, [term]);
        if (result) {
          redFlagsFound.push(result);
        }
      }
    }
  }

  // Sort by urgency (highest first)
  redFlagsFound.sort((a, b) => b.urgencyLevel - a.urgencyLevel);

  return redFlagsFound;
}

/**
 * Suggests referral based on findings and clinical context
 *
 * @param findings - ECG findings
 * @param clinicalContext - Clinical setting context
 * @returns Referral suggestion with destination, timeframe, and requirements
 */
export function suggestReferral(
  findings: ECGFindings,
  clinicalContext: ClinicalContext
): ReferralSuggestion {
  // Build finding descriptions for matching
  const findingDescriptions: string[] = [];

  if (findings.rhythm) {
    findingDescriptions.push(findings.rhythm);
  }

  if (findings.stChanges) {
    const elevations = findings.stChanges.filter(st => st.type === 'elevation');
    if (elevations.length > 0) {
      findingDescriptions.push('supradesnivel de ST');
      findingDescriptions.push('STEMI');
    }
    const depressions = findings.stChanges.filter(st => st.type === 'depression');
    if (depressions.length > 0) {
      findingDescriptions.push('infradesnivel de ST');
    }
  }

  if (findings.intervals) {
    if (findings.intervals.qtc && findings.intervals.qtc > 500) {
      findingDescriptions.push('QT prolongado');
    }
    if (findings.intervals.qrs && findings.intervals.qrs >= 120) {
      findingDescriptions.push('bloqueio de ramo');
    }
    if (findings.intervals.pr && findings.intervals.pr < 120) {
      findingDescriptions.push('WPW');
      findingDescriptions.push('pre-excitacao');
    }
  }

  if (findings.otherFindings) {
    findingDescriptions.push(...findings.otherFindings);
  }

  if (findings.findingCodes) {
    findingDescriptions.push(...findings.findingCodes);
  }

  // Get referral recommendations
  const recommendations = shouldRefer(findingDescriptions);
  const actionSummary = generateActionSummary(findingDescriptions);

  // Get context-specific guidance
  const contextGuidance = getContextSpecificGuidance(
    mapClinicalContextToReferralContext(clinicalContext)
  );

  // Determine if referral is needed
  const shouldReferPatient = recommendations.length > 0 &&
    recommendations.some(r => r.shouldRefer);

  // Find the highest priority recommendation
  const highestPriority = recommendations.length > 0 ? recommendations[0] : null;

  // Map priority to recommendation level
  let recommendation: 'none' | 'routine' | 'priority' | 'emergency' = 'none';
  let timeframe = 'N/A';
  let destination: EspecialidadeDestino = 'cardiologia';

  if (highestPriority && highestPriority.shouldRefer) {
    switch (highestPriority.priority) {
      case 'emergencia':
        recommendation = 'emergency';
        timeframe = 'imediato';
        break;
      case 'urgente':
        recommendation = 'priority';
        timeframe = '24h';
        break;
      case 'rotina':
        recommendation = 'routine';
        timeframe = '7-30 dias';
        break;
      default:
        recommendation = 'none';
    }
    destination = highestPriority.destination;
  }

  // Build required information
  const requiredInfo: string[] = [
    'ECG de 12 derivacoes com hora marcada',
    'Resumo clinico do paciente',
    'Medicacoes em uso',
    'Comorbidades relevantes',
  ];

  if (recommendation === 'emergency' || recommendation === 'priority') {
    requiredInfo.push('Horario de inicio dos sintomas');
    requiredInfo.push('Sinais vitais atuais');
    requiredInfo.push('Tratamento ja administrado');
  }

  // Build pre-referral workup based on context
  const preReferralWorkup: string[] = [];
  if (clinicalContext === 'primary_care') {
    preReferralWorkup.push('ECG completo de 12 derivacoes');
    preReferralWorkup.push('Comparar com ECG anterior se disponivel');
    if (recommendation !== 'emergency') {
      preReferralWorkup.push('Solicitar ecocardiograma');
      preReferralWorkup.push('Exames laboratoriais basicos');
    }
  } else if (clinicalContext === 'emergency') {
    preReferralWorkup.push('Troponina (nao aguardar resultado em STEMI)');
    preReferralWorkup.push('ECGs seriados');
    preReferralWorkup.push('Monitorização continua');
  }

  // Actions while awaiting
  const actionsWhileAwaiting = actionSummary.immediateActions.length > 0 ?
    actionSummary.immediateActions :
    contextGuidance?.acoes || ['Manter monitorização', 'Documentar alteracoes'];

  // Build rationale
  let rationale = 'Encaminhamento baseado nos achados do ECG';
  if (highestPriority) {
    rationale = highestPriority.criteria.justificativa;
  }

  return {
    shouldRefer: shouldReferPatient,
    recommendation,
    timeframe,
    destination,
    rationale,
    requiredInformation: requiredInfo,
    preReferralWorkup,
    actionsWhileAwaiting,
    matchedCriteria: recommendations.map(r => r.criteria),
  };
}

/**
 * Gets appropriate protocol based on clinical setting and findings
 *
 * @param context - Clinical context/setting
 * @param findings - ECG findings
 * @returns Contextual protocol with setting-specific recommendations
 */
export function getProtocolByContext(
  context: ClinicalContext,
  findings: ECGFindings
): ContextualProtocol {
  // Base protocol structure
  const protocol: ContextualProtocol = {
    id: `protocol-${context}-${Date.now()}`,
    setting: context,
    priorities: [],
    quickChecklist: [],
    actionsWhileAwaiting: [],
    commonMistakes: [],
    timeConstraints: '',
    typicalResources: [],
    escalationCriteria: [],
    findingSpecificRecommendations: [],
  };

  // Get context-specific guidance
  const referralContext = mapClinicalContextToReferralContext(context);
  const guidance = getContextSpecificGuidance(referralContext);

  if (guidance) {
    protocol.priorities = guidance.criterios;
    protocol.actionsWhileAwaiting = guidance.acoes;
  }

  // Set context-specific attributes
  switch (context) {
    case 'emergency':
      protocol.timeConstraints = 'ECG em < 10 min; decisao critica em < 30 min';
      protocol.typicalResources = [
        'ECG de 12 derivacoes',
        'Desfibrilador/cardioversor',
        'Marcapasso transcutaneo',
        'Drogas de emergencia',
        'Monitorização continua',
      ];
      protocol.quickChecklist = [
        '1. Estabilidade hemodinamica?',
        '2. Ritmo: sinusal ou arritmia?',
        '3. FC: bradi/normal/taqui?',
        '4. QRS: estreito ou largo?',
        '5. Supra de ST?',
        '6. Infra de ST? (fazer V7-V9 se V1-V3)',
        '7. QTc? (> 500ms = alto risco)',
        '8. Comparar com ECG previo',
      ];
      protocol.commonMistakes = [
        'Esperar troponina para ativar protocolo STEMI',
        'Nao reconhecer STEMI posterior',
        'Dar adenosina/BCC em FA com WPW',
        'Alta com ECG anormal + dor toracica',
        'Amiodarona em Torsades',
      ];
      protocol.escalationCriteria = [
        'STEMI confirmado ou suspeito',
        'Arritmia instavel',
        'Bradicardia sintomatica',
        'Choque cardiogenico',
      ];
      break;

    case 'icu':
      protocol.timeConstraints = 'Avaliacao imediata; monitorização continua';
      protocol.typicalResources = [
        'Monitorização multiparametros',
        'Desfibrilador',
        'Marcapasso transcutaneo/transvenoso',
        'Drogas vasoativas',
        'Acesso a hemodinamica 24h',
      ];
      protocol.quickChecklist = [
        '1. Estabilidade hemodinamica atual?',
        '2. Comparar com ECG de admissao',
        '3. Correlacionar com drogas em uso',
        '4. Avaliar disturbios eletroliticos',
        '5. Monitorar QTc se uso de drogas que prolongam QT',
      ];
      protocol.commonMistakes = [
        'Ignorar alteracoes sutis em paciente sedado',
        'Nao correlacionar com drogas vasoativas',
        'Subestimar disturbios eletroliticos',
      ];
      protocol.escalationCriteria = [
        'Nova arritmia ventricular',
        'Alteracoes isquemicas novas',
        'BAV de alto grau',
        'Necessidade de marcapasso',
      ];
      break;

    case 'ward':
      protocol.timeConstraints = 'Avaliacao em minutos a horas';
      protocol.typicalResources = [
        'ECG de 12 derivacoes',
        'Monitorização telemetrica (se disponivel)',
        'Carrinho de emergencia',
      ];
      protocol.quickChecklist = [
        '1. Comparar com ECG previo',
        '2. Correlacionar com sintomas',
        '3. Verificar medicacoes em uso',
        '4. Avaliar necessidade de monitorização',
      ];
      protocol.commonMistakes = [
        'Demorar para avaliar ECG anormal',
        'Nao comunicar alteracoes ao medico assistente',
        'Subestimar alteracoes em paciente assintomatico',
      ];
      protocol.escalationCriteria = [
        'Alteracoes isquemicas',
        'Arritmias novas',
        'Bloqueios de conducao',
        'Sintomas cardiovasculares',
      ];
      break;

    case 'primary_care':
      protocol.timeConstraints = 'Avaliacao em horas a dias; urgencias = transferir';
      protocol.typicalResources = [
        'ECG de 12 derivacoes',
        'Acesso a SAMU',
        'Medicacoes basicas (AAS, nitrato)',
      ];
      protocol.quickChecklist = [
        '1. Sintomas atuais do paciente?',
        '2. Comparar com ECG anterior (se disponivel)',
        '3. Avaliar necessidade de encaminhamento urgente',
        '4. Verificar medicacoes cardiovasculares',
        '5. Estratificar risco cardiovascular',
      ];
      protocol.commonMistakes = [
        'Retardar encaminhamento de emergencias',
        'Atribuir alteracoes a causas benignas sem investigar',
        'Nao fazer ECG em paciente com sintomas suspeitos',
        'Dar alta sem orientacoes de alerta',
      ];
      protocol.escalationCriteria = [
        'Qualquer supra de ST com sintomas',
        'Arritmia sintomatica',
        'Sincope com ECG anormal',
        'Dor toracica + ECG alterado',
      ];
      break;

    default:
      // Telemedicine or other contexts
      protocol.timeConstraints = 'Variavel conforme disponibilidade';
      protocol.typicalResources = ['ECG digital'];
      protocol.quickChecklist = [
        '1. Qualidade tecnica do ECG?',
        '2. Achados criticos presentes?',
        '3. Necessidade de encaminhamento presencial?',
      ];
  }

  // Add finding-specific recommendations
  if (findings.stChanges) {
    const elevations = findings.stChanges.filter(st => st.type === 'elevation');
    if (elevations.length >= 2) {
      protocol.findingSpecificRecommendations.push({
        finding: 'Supra de ST',
        action: 'Ativar protocolo STEMI; transferir para hemodinamica',
        urgency: 'Imediato',
      });
    }
  }

  if (findings.intervals?.qtc && findings.intervals.qtc > 500) {
    protocol.findingSpecificRecommendations.push({
      finding: 'QTc > 500ms',
      action: 'Suspender drogas que prolongam QT; corrigir eletrolitos; MgSO4 2g IV',
      urgency: 'Urgente',
    });
  }

  if (findings.rate && findings.rate < 40) {
    protocol.findingSpecificRecommendations.push({
      finding: 'Bradicardia severa',
      action: 'Atropina; preparar marcapasso transcutaneo',
      urgency: 'Imediato se sintomatico',
    });
  }

  return protocol;
}

/**
 * Classifies urgency based on ECG findings
 *
 * @param findings - ECG findings
 * @returns Urgency classification with reasoning and time-sensitive actions
 */
export function classifyUrgency(findings: ECGFindings): UrgencyClassification {
  const urgencyFactors: string[] = [];
  const mitigatingFactors: string[] = [];
  const timeSensitiveActions: { action: string; timeframe: string; rationale: string }[] = [];

  let level: 1 | 2 | 3 | 4 = 1;

  // Check for emergency-level findings
  const redFlags = identifyRedFlags(findings);
  if (redFlags.length > 0) {
    const maxRedFlagUrgency = Math.max(...redFlags.map(rf => rf.urgencyLevel));
    if (maxRedFlagUrgency > level) {
      level = maxRedFlagUrgency as 1 | 2 | 3 | 4;
    }
    for (const rf of redFlags) {
      urgencyFactors.push(`Red flag: ${rf.name}`);
      for (const action of rf.immediateActions) {
        timeSensitiveActions.push({
          action,
          timeframe: rf.timeToAction,
          rationale: rf.name,
        });
      }
    }
  }

  // Check ST changes
  if (findings.stChanges) {
    const significantElevations = findings.stChanges.filter(
      st => st.type === 'elevation' && st.magnitude && st.magnitude >= 1
    );
    if (significantElevations.length >= 2) {
      level = 4;
      urgencyFactors.push('Supra de ST em derivacoes contiguas - suspeita de STEMI');
      timeSensitiveActions.push({
        action: 'Ativar protocolo STEMI',
        timeframe: '< 10 minutos',
        rationale: 'Tempo porta-balao e critico',
      });
    }
  }

  // Check intervals
  if (findings.intervals) {
    if (findings.intervals.qtc && findings.intervals.qtc > 550) {
      if (level < 4) level = 3;
      urgencyFactors.push('QTc muito prolongado (> 550ms) - alto risco de Torsades');
      timeSensitiveActions.push({
        action: 'Suspender drogas que prolongam QT; MgSO4 2g IV',
        timeframe: 'Imediato',
        rationale: 'Prevencao de Torsades de Pointes',
      });
    } else if (findings.intervals.qtc && findings.intervals.qtc > 500) {
      if (level < 3) level = 3;
      urgencyFactors.push('QTc prolongado (> 500ms) - risco de Torsades');
      timeSensitiveActions.push({
        action: 'Revisar e suspender drogas que prolongam QT',
        timeframe: '1-2 horas',
        rationale: 'Prevencao de arritmia',
      });
    }
  }

  // Check rate
  if (findings.rate !== undefined) {
    if (findings.rate < 40) {
      if (level < 3) level = 3;
      urgencyFactors.push('Bradicardia severa (< 40 bpm)');
      timeSensitiveActions.push({
        action: 'Avaliar estabilidade; preparar atropina e marcapasso',
        timeframe: 'Imediato se sintomatico',
        rationale: 'Risco de baixo debito',
      });
    } else if (findings.rate > 150) {
      if (level < 3) level = 3;
      urgencyFactors.push('Taquicardia significativa (> 150 bpm)');
    }
  }

  // Check for mitigating factors
  if (findings.rhythm?.toLowerCase().includes('sinusal') &&
      findings.rate && findings.rate >= 60 && findings.rate <= 100) {
    mitigatingFactors.push('Ritmo sinusal com FC normal');
  }

  if (!findings.stChanges || findings.stChanges.every(st => st.type === 'normal')) {
    mitigatingFactors.push('Segmento ST normal');
  }

  // Determine category
  const category = level === 4 ? 'emergencia' :
                   level === 3 ? 'urgente' :
                   level === 2 ? 'alerta' : 'rotina';

  // Build reasoning
  let reasoning = '';
  if (urgencyFactors.length === 0 && mitigatingFactors.length > 0) {
    reasoning = `ECG sem alteracoes urgentes. ${mitigatingFactors.join('; ')}.`;
  } else if (urgencyFactors.length > 0) {
    reasoning = `Achados que elevam urgencia: ${urgencyFactors.join('; ')}.`;
    if (mitigatingFactors.length > 0) {
      reasoning += ` Fatores atenuantes: ${mitigatingFactors.join('; ')}.`;
    }
  } else {
    reasoning = 'ECG sem achados significativos para classificacao de urgencia.';
  }

  return {
    level,
    category,
    reasoning,
    timeSensitiveActions,
    urgencyFactors,
    mitigatingFactors,
  };
}

/**
 * Generates a complete action plan based on findings and context
 *
 * @param findings - ECG findings
 * @param context - Clinical context
 * @returns Complete action plan with immediate, short-term, and follow-up actions
 */
export function generateActionPlan(findings: ECGFindings, context: ClinicalContext): ActionPlan {
  const immediateActions: ActionPlan['immediateActions'] = [];
  const shortTermActions: ActionPlan['shortTermActions'] = [];
  const monitoring: ActionPlan['monitoring'] = [];
  const followUp: ActionPlan['followUp'] = [];
  const redFlagsToWatch: string[] = [];
  const documentationRequirements: string[] = [];

  // Analyze findings
  const analysisResult = analyzeForNonSpecialist(findings);
  const urgencyClassification = classifyUrgency(findings);
  const redFlags = identifyRedFlags(findings);

  // Add time-sensitive actions as immediate
  for (const tsa of urgencyClassification.timeSensitiveActions) {
    immediateActions.push({
      action: tsa.action,
      priority: immediateActions.length + 1,
      rationale: tsa.rationale,
      timeframe: tsa.timeframe,
    });
  }

  // Add red flag actions
  for (const rf of redFlags) {
    for (const action of rf.immediateActions) {
      if (!immediateActions.some(ia => ia.action === action)) {
        immediateActions.push({
          action,
          priority: immediateActions.length + 1,
          rationale: `Red flag: ${rf.name}`,
          timeframe: rf.timeToAction,
        });
      }
    }
    redFlagsToWatch.push(`${rf.name}: ${rf.triggeredBy.join(', ')}`);
  }

  // Add context-specific actions
  const protocol = getProtocolByContext(context, findings);

  // Add standard monitoring based on findings
  if (analysisResult.urgencyLevel >= 3) {
    monitoring.push({
      parameter: 'Ritmo cardiaco',
      frequency: 'Continuo',
      alertThreshold: 'Qualquer arritmia nova',
    });
    monitoring.push({
      parameter: 'Sinais vitais',
      frequency: 'A cada 15-30 minutos',
      alertThreshold: 'Instabilidade hemodinamica',
    });
  }

  if (findings.intervals?.qtc && findings.intervals.qtc > 500) {
    monitoring.push({
      parameter: 'QTc',
      frequency: 'ECG seriado a cada 4-6h',
      alertThreshold: '> 550ms ou aumento progressivo',
    });
    shortTermActions.push({
      action: 'Revisar todos os medicamentos que prolongam QT',
      priority: 1,
      rationale: 'QTc prolongado identificado',
      timeframe: '1-2 horas',
    });
  }

  // Add referral as short-term action if needed
  const referralSuggestion = suggestReferral(findings, context);
  if (referralSuggestion.shouldRefer) {
    shortTermActions.push({
      action: `Encaminhar para ${referralSuggestion.destination}`,
      priority: referralSuggestion.recommendation === 'emergency' ? 1 :
                referralSuggestion.recommendation === 'priority' ? 2 : 3,
      rationale: referralSuggestion.rationale,
      timeframe: referralSuggestion.timeframe,
    });
  }

  // Add follow-up based on classification
  switch (analysisResult.classification) {
    case 'emergencia':
      followUp.push({
        action: 'Reavaliar apos estabilizacao inicial',
        timeframe: 'Apos resolucao da emergencia',
        responsible: 'Equipe de emergencia/cardiologia',
      });
      break;
    case 'anormal_urgente':
      followUp.push({
        action: 'ECG de controle',
        timeframe: '24 horas',
        responsible: 'Medico assistente',
      });
      followUp.push({
        action: 'Avaliacao cardiologica',
        timeframe: '1-2 semanas',
        responsible: 'Cardiologista',
      });
      break;
    case 'anormal_nao_urgente':
      followUp.push({
        action: 'Encaminhamento eletivo para cardiologia',
        timeframe: '30 dias',
        responsible: 'Medico da APS',
      });
      followUp.push({
        action: 'Repetir ECG',
        timeframe: '1-3 meses ou se sintomas',
        responsible: 'Medico assistente',
      });
      break;
    case 'normal':
      followUp.push({
        action: 'Seguimento de rotina',
        timeframe: 'Conforme indicacao clinica',
        responsible: 'Medico da APS',
      });
      break;
  }

  // Add documentation requirements
  documentationRequirements.push('Registrar ECG com horario');
  documentationRequirements.push('Documentar achados principais');
  if (immediateActions.length > 0) {
    documentationRequirements.push('Registrar acoes tomadas e horarios');
  }
  if (referralSuggestion.shouldRefer) {
    documentationRequirements.push('Documentar indicacao de encaminhamento');
    documentationRequirements.push('Registrar comunicacao com especialista');
  }

  return {
    id: `action-plan-${Date.now()}`,
    timestamp: new Date(),
    context,
    immediateActions,
    shortTermActions,
    monitoring,
    followUp,
    redFlagsToWatch,
    documentationRequirements,
  };
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Analyzes rhythm finding
 */
function analyzeRhythm(
  rhythm: string,
  rate?: number
): {
  isNormal: boolean;
  description: string;
  finding?: AbnormalFinding;
  urgency: 1 | 2 | 3 | 4;
  actions: SuggestedAction[];
  reasoning: string;
} {
  const rhythmLower = rhythm.toLowerCase();
  const actions: SuggestedAction[] = [];

  // Check for normal sinus rhythm
  if (rhythmLower.includes('sinusal') || rhythmLower.includes('sinus')) {
    if (rate && (rate < 60 || rate > 100)) {
      return {
        isNormal: false,
        description: rhythm,
        finding: {
          code: 'sinus_rate_abnormal',
          description: rate < 60 ? 'Bradicardia sinusal' : 'Taquicardia sinusal',
          severity: rate < 40 || rate > 150 ? 'severe' : 'mild',
          clinicalSignificance: rate < 60 ?
            'Pode ser fisiologico em atletas ou patologico' :
            'Avaliar causas (febre, dor, ansiedade, anemia, etc.)',
          possibleCauses: rate < 60 ?
            ['Condicionamento fisico', 'Hipotireoidismo', 'Medicamentos', 'DNS'] :
            ['Febre', 'Dor', 'Ansiedade', 'Anemia', 'Hipertireoidismo', 'PE'],
          recommendedActions: rate < 60 ?
            ['Avaliar sintomas', 'Verificar medicacoes'] :
            ['Investigar causa base'],
        },
        urgency: rate < 40 || rate > 150 ? 3 : 2,
        actions,
        reasoning: `Ritmo sinusal com frequencia ${rate < 60 ? 'baixa' : 'elevada'}`,
      };
    }
    return {
      isNormal: true,
      description: 'Ritmo sinusal normal',
      urgency: 1,
      actions: [],
      reasoning: 'Ritmo sinusal normal identificado',
    };
  }

  // Check for dangerous rhythms
  const dangerousPatterns = [
    { pattern: /fibrilacao\s*ventricular|ventricular\s*fibrillation|fv/i, urgency: 4 as const, name: 'Fibrilacao ventricular' },
    { pattern: /taquicardia\s*ventricular|ventricular\s*tachycardia|tv\s*sustentada/i, urgency: 4 as const, name: 'Taquicardia ventricular' },
    { pattern: /torsades/i, urgency: 4 as const, name: 'Torsades de Pointes' },
    { pattern: /assistolia|asystole/i, urgency: 4 as const, name: 'Assistolia' },
    { pattern: /bavt|bloqueio\s*av\s*(total|3|completo)|complete\s*heart\s*block/i, urgency: 4 as const, name: 'BAVT' },
    { pattern: /fibrilacao\s*atrial|atrial\s*fibrillation|fa\b/i, urgency: 3 as const, name: 'Fibrilacao atrial' },
    { pattern: /flutter/i, urgency: 3 as const, name: 'Flutter' },
  ];

  for (const dp of dangerousPatterns) {
    if (dp.pattern.test(rhythmLower)) {
      actions.push({
        id: `rhythm-action-${dp.name}`,
        action: dp.urgency === 4 ?
          'Iniciar protocolo ACLS correspondente' :
          'Controle de frequencia; avaliar estabilidade',
        priority: dp.urgency === 4 ? 'immediate' : 'urgent',
        category: 'therapeutic',
        rationale: `Arritmia identificada: ${dp.name}`,
        timeframe: dp.urgency === 4 ? 'Imediato' : '1-2 horas',
      });

      return {
        isNormal: false,
        description: rhythm,
        finding: {
          code: dp.name.toLowerCase().replace(/\s+/g, '_'),
          description: dp.name,
          severity: dp.urgency === 4 ? 'critical' : 'severe',
          clinicalSignificance: `${dp.name} - requer atencao ${dp.urgency === 4 ? 'imediata' : 'urgente'}`,
          possibleCauses: ['Doenca cardiaca estrutural', 'Isquemia', 'Disturbios eletroliticos'],
          recommendedActions: actions.map(a => a.action),
        },
        urgency: dp.urgency,
        actions,
        reasoning: `Arritmia ${dp.urgency === 4 ? 'critica' : 'significativa'}: ${dp.name}`,
      };
    }
  }

  // Unknown or other rhythm
  return {
    isNormal: false,
    description: rhythm,
    finding: {
      code: 'rhythm_other',
      description: rhythm,
      severity: 'moderate',
      clinicalSignificance: 'Ritmo nao-sinusal identificado - avaliar contexto clinico',
      possibleCauses: [],
      recommendedActions: ['Correlacionar com clinica', 'Considerar monitorização'],
    },
    urgency: 2,
    actions: [],
    reasoning: `Ritmo nao-sinusal: ${rhythm}`,
  };
}

/**
 * Analyzes heart rate
 */
function analyzeRate(
  rate: number
): {
  isNormal: boolean;
  description: string;
  finding?: AbnormalFinding;
  urgency: 1 | 2 | 3 | 4;
  actions: SuggestedAction[];
  reasoning: string;
} {
  const actions: SuggestedAction[] = [];

  if (rate >= NORMAL_VALUES.rate.min && rate <= NORMAL_VALUES.rate.max) {
    return {
      isNormal: true,
      description: `FC ${rate} bpm (normal)`,
      urgency: 1,
      actions: [],
      reasoning: 'Frequencia cardiaca dentro da normalidade',
    };
  }

  const isBradycardia = rate < NORMAL_VALUES.rate.min;
  const severity: AbnormalFinding['severity'] =
    rate < 40 || rate > 150 ? 'severe' :
    rate < 50 || rate > 130 ? 'moderate' : 'mild';

  const urgency: 1 | 2 | 3 | 4 =
    rate < 40 || rate > 150 ? 3 :
    rate < 50 || rate > 130 ? 2 : 1;

  if (rate < 40) {
    actions.push({
      id: 'bradycardia-action',
      action: 'Avaliar estabilidade hemodinamica; preparar atropina',
      priority: 'urgent',
      category: 'therapeutic',
      rationale: 'Bradicardia severa',
      timeframe: 'Imediato se sintomatico',
    });
  }

  if (rate > 150) {
    actions.push({
      id: 'tachycardia-action',
      action: 'Avaliar ritmo; estabilidade; considerar causas',
      priority: 'urgent',
      category: 'diagnostic',
      rationale: 'Taquicardia significativa',
      timeframe: 'Imediato',
    });
  }

  return {
    isNormal: false,
    description: `FC ${rate} bpm (${isBradycardia ? 'bradicardia' : 'taquicardia'})`,
    finding: {
      code: isBradycardia ? 'bradycardia' : 'tachycardia',
      description: isBradycardia ? `Bradicardia (${rate} bpm)` : `Taquicardia (${rate} bpm)`,
      severity,
      clinicalSignificance: isBradycardia ?
        'Pode indicar doenca do no sinusal, medicamentos, ou ser fisiologico' :
        'Pode indicar estresse, febre, dor, ou arritmia',
      possibleCauses: isBradycardia ?
        ['Condicionamento fisico', 'Hipotireoidismo', 'Medicamentos (BB, BCC, digoxina)', 'DNS', 'IAM inferior'] :
        ['Febre', 'Dor', 'Ansiedade', 'Anemia', 'Hipertireoidismo', 'PE', 'Desidratacao'],
      recommendedActions: isBradycardia ?
        ['Avaliar sintomas', 'Verificar medicacoes', 'Considerar causas reversiveis'] :
        ['Investigar causa', 'Avaliar estabilidade hemodinamica'],
    },
    urgency,
    actions,
    reasoning: `${isBradycardia ? 'Bradicardia' : 'Taquicardia'} ${severity}: ${rate} bpm`,
  };
}

/**
 * Analyzes axis
 */
function analyzeAxis(
  axis: string | number
): {
  isNormal: boolean;
  description: string;
  finding?: AbnormalFinding;
  urgency: 1 | 2 | 3 | 4;
  reasoning: string;
} {
  let axisValue: number | null = null;
  let axisString = typeof axis === 'string' ? axis : `${axis} graus`;

  if (typeof axis === 'number') {
    axisValue = axis;
  } else {
    // Try to extract numeric value
    const match = axis.match(/-?\d+/);
    if (match) {
      axisValue = parseInt(match[0], 10);
    }
  }

  // Check for normal axis
  if (axisValue !== null && axisValue >= NORMAL_VALUES.axis.min && axisValue <= NORMAL_VALUES.axis.max) {
    return {
      isNormal: true,
      description: `Eixo normal (${axisValue} graus)`,
      urgency: 1,
      reasoning: 'Eixo eletrico dentro da normalidade',
    };
  }

  // Check for string descriptions
  const axisLower = axisString.toLowerCase();
  if (axisLower.includes('normal')) {
    return {
      isNormal: true,
      description: axisString,
      urgency: 1,
      reasoning: 'Eixo eletrico normal',
    };
  }

  // Determine type of deviation
  let deviation = '';
  let severity: AbnormalFinding['severity'] = 'mild';
  let significance = '';
  let causes: string[] = [];

  if (axisValue !== null) {
    if (axisValue < NORMAL_VALUES.axis.min && axisValue >= -90) {
      deviation = 'Desvio do eixo para a esquerda';
      causes = ['BDAS', 'HVE', 'IAM inferior'];
    } else if (axisValue > NORMAL_VALUES.axis.max && axisValue <= 180) {
      deviation = 'Desvio do eixo para a direita';
      causes = ['HVD', 'BDPI', 'Embolia pulmonar', 'DPOC'];
    } else {
      deviation = 'Eixo extremo / indeterminado';
      severity = 'moderate';
      causes = ['TV', 'Marcapasso ventricular', 'Hipercalemia grave', 'Erro de posicionamento'];
    }
  } else if (axisLower.includes('esquerda') || axisLower.includes('left')) {
    deviation = 'Desvio do eixo para a esquerda';
    causes = ['BDAS', 'HVE', 'IAM inferior'];
  } else if (axisLower.includes('direita') || axisLower.includes('right')) {
    deviation = 'Desvio do eixo para a direita';
    causes = ['HVD', 'BDPI', 'Embolia pulmonar'];
  } else if (axisLower.includes('extremo') || axisLower.includes('indeterminado')) {
    deviation = 'Eixo extremo';
    severity = 'moderate';
    causes = ['TV', 'Marcapasso', 'Hipercalemia'];
  }

  significance = deviation ?
    `${deviation} pode indicar ${causes.slice(0, 2).join(' ou ')}` :
    'Avaliar no contexto clinico';

  return {
    isNormal: false,
    description: deviation || axisString,
    finding: {
      code: 'axis_deviation',
      description: deviation || `Eixo anormal: ${axisString}`,
      severity,
      clinicalSignificance: significance,
      possibleCauses: causes,
      recommendedActions: ['Correlacionar com outros achados', 'Avaliar contexto clinico'],
    },
    urgency: severity === 'moderate' ? 2 : 1,
    reasoning: `Desvio de eixo identificado: ${deviation || axisString}`,
  };
}

/**
 * Analyzes intervals
 */
function analyzeIntervals(
  intervals: ECGFindings['intervals'],
  rate?: number
): {
  normalFindings: string[];
  abnormalFindings: AbnormalFinding[];
  actions: SuggestedAction[];
  maxUrgency: 1 | 2 | 3 | 4;
  totalChecked: number;
  normalCount: number;
  reasoning: string[];
} {
  const normalFindings: string[] = [];
  const abnormalFindings: AbnormalFinding[] = [];
  const actions: SuggestedAction[] = [];
  const reasoning: string[] = [];
  let maxUrgency: 1 | 2 | 3 | 4 = 1;
  let totalChecked = 0;
  let normalCount = 0;

  if (!intervals) return { normalFindings, abnormalFindings, actions, maxUrgency, totalChecked, normalCount, reasoning };

  // PR interval
  if (intervals.pr !== undefined) {
    totalChecked++;
    if (intervals.pr >= NORMAL_VALUES.pr.min && intervals.pr <= NORMAL_VALUES.pr.max) {
      normalFindings.push(`PR ${intervals.pr}ms (normal)`);
      normalCount++;
    } else if (intervals.pr < NORMAL_VALUES.pr.min) {
      abnormalFindings.push({
        code: 'short_pr',
        description: `PR curto (${intervals.pr}ms)`,
        severity: 'moderate',
        clinicalSignificance: 'PR curto pode indicar WPW ou conducao AV acelerada',
        possibleCauses: ['WPW/pre-excitacao', 'Ritmo juncional', 'Conducao AV acelerada'],
        recommendedActions: ['Procurar onda delta', 'Evitar adenosina/BB/BCC se FA com WPW'],
      });
      reasoning.push('PR curto identificado - avaliar pre-excitacao');
      maxUrgency = Math.max(maxUrgency, 2) as 1 | 2 | 3 | 4;
    } else {
      const prSeverity = intervals.pr > 300 ? 'moderate' as const : 'mild' as const;
      abnormalFindings.push({
        code: 'prolonged_pr',
        description: `PR prolongado (${intervals.pr}ms) - BAV 1 grau`,
        severity: prSeverity,
        clinicalSignificance: 'BAV de 1 grau - geralmente benigno isoladamente',
        possibleCauses: ['Medicamentos (BB, BCC, digoxina)', 'Doenca do sistema de conducao', 'Tônus vagal'],
        recommendedActions: ['Verificar medicacoes', 'Monitorar se progressivo'],
      });
      reasoning.push(`PR prolongado (${intervals.pr}ms) - BAV 1 grau`);
    }
  }

  // QRS duration
  if (intervals.qrs !== undefined) {
    totalChecked++;
    if (intervals.qrs < NORMAL_VALUES.qrs.max) {
      normalFindings.push(`QRS ${intervals.qrs}ms (normal)`);
      normalCount++;
    } else {
      const qrsSeverity: AbnormalFinding['severity'] = intervals.qrs >= 140 ? 'moderate' : 'mild';
      abnormalFindings.push({
        code: 'wide_qrs',
        description: `QRS alargado (${intervals.qrs}ms)`,
        severity: qrsSeverity,
        clinicalSignificance: 'QRS alargado indica bloqueio de ramo ou ritmo ventricular',
        possibleCauses: ['BRD', 'BRE', 'Ritmo ventricular', 'Hipercalemia', 'Antiarritmicos'],
        recommendedActions: ['Determinar tipo de bloqueio (V1)', 'Se taquicardia + QRS largo = TV ate prova contraria'],
      });
      reasoning.push(`QRS alargado (${intervals.qrs}ms) - avaliar bloqueio de ramo`);

      if (rate && rate > 100 && intervals.qrs >= 120) {
        maxUrgency = Math.max(maxUrgency, 3) as 1 | 2 | 3 | 4;
        actions.push({
          id: 'wide-qrs-tachy',
          action: 'Taquicardia de QRS largo - assumir TV ate prova contraria',
          priority: 'urgent',
          category: 'diagnostic',
          rationale: 'TV vs TSV com aberrancia',
          timeframe: 'Imediato',
        });
      }
    }
  }

  // QTc
  if (intervals.qtc !== undefined) {
    totalChecked++;
    const qtcAssessment = assessQTc(intervals.qtc, 'M'); // Default to male thresholds

    if (qtcAssessment.status === 'normal') {
      normalFindings.push(`QTc ${intervals.qtc}ms (normal)`);
      normalCount++;
    } else {
      const qtcSeverity: AbnormalFinding['severity'] =
        qtcAssessment.status === 'muito_prolongado' ? 'critical' :
        qtcAssessment.status === 'prolongado' ? 'severe' : 'moderate';

      abnormalFindings.push({
        code: 'prolonged_qtc',
        description: `QTc ${qtcAssessment.status} (${intervals.qtc}ms)`,
        severity: qtcSeverity,
        clinicalSignificance: qtcAssessment.risk,
        possibleCauses: ['Medicamentos que prolongam QT', 'Hipocalemia', 'Hipomagnesemia', 'Sindrome do QT longo'],
        recommendedActions: [
          'Revisar medicamentos em uso',
          'Dosar K+ e Mg++',
          intervals.qtc > 500 ? 'MgSO4 2g IV profilatico' : 'Monitorar',
        ],
      });

      if (intervals.qtc > NORMAL_VALUES.qtc.veryHighRisk) {
        maxUrgency = 4;
        actions.push({
          id: 'qtc-emergency',
          action: 'QTc > 550ms - SUSPENDER drogas que prolongam QT; MgSO4 2g IV',
          priority: 'immediate',
          category: 'therapeutic',
          rationale: 'Risco muito alto de Torsades',
          timeframe: 'Imediato',
        });
      } else if (intervals.qtc > NORMAL_VALUES.qtc.highRisk) {
        maxUrgency = Math.max(maxUrgency, 3) as 1 | 2 | 3 | 4;
        actions.push({
          id: 'qtc-urgent',
          action: 'QTc > 500ms - Revisar e suspender drogas que prolongam QT',
          priority: 'urgent',
          category: 'therapeutic',
          rationale: 'Risco alto de Torsades',
          timeframe: '1-2 horas',
        });
      }

      reasoning.push(`QTc ${qtcAssessment.status} (${intervals.qtc}ms) - ${qtcAssessment.risk}`);
    }
  }

  return {
    normalFindings,
    abnormalFindings,
    actions,
    maxUrgency,
    totalChecked,
    normalCount,
    reasoning,
  };
}

/**
 * Analyzes ST segment changes
 */
function analyzeSTChanges(
  stChanges: STChangeDetail[]
): {
  isNormal: boolean;
  description: string;
  findings: AbnormalFinding[];
  actions: SuggestedAction[];
  urgency: 1 | 2 | 3 | 4;
  hasSTEMI: boolean;
  reasoning: string;
} {
  const findings: AbnormalFinding[] = [];
  const actions: SuggestedAction[] = [];
  let urgency: 1 | 2 | 3 | 4 = 1;
  let hasSTEMI = false;

  // Check for elevations
  const elevations = stChanges.filter(st => st.type === 'elevation');
  const depressions = stChanges.filter(st => st.type === 'depression');
  const normalST = stChanges.filter(st => st.type === 'normal');

  if (elevations.length === 0 && depressions.length === 0) {
    return {
      isNormal: true,
      description: 'Segmento ST isoeletrico',
      findings: [],
      actions: [],
      urgency: 1,
      hasSTEMI: false,
      reasoning: 'ST normal em todas as derivacoes avaliadas',
    };
  }

  // Analyze elevations for STEMI pattern
  if (elevations.length >= 2) {
    const contiguousGroups: Record<string, ECGLeadName[]> = {
      anterior: ['V1', 'V2', 'V3', 'V4'],
      anterolateral: ['V3', 'V4', 'V5', 'V6'],
      lateral_high: ['I', 'aVL'],
      inferior: ['II', 'III', 'aVF'],
      lateral: ['V5', 'V6', 'I', 'aVL'],
    };

    for (const [territory, leads] of Object.entries(contiguousGroups)) {
      const matchingElevations = elevations.filter(e =>
        leads.includes(e.lead) && e.magnitude && e.magnitude >= 1
      );
      if (matchingElevations.length >= 2) {
        hasSTEMI = true;
        urgency = 4;

        const affectedLeads = matchingElevations.map(e => e.lead);
        findings.push({
          code: `stemi_${territory}`,
          description: `Supra de ST em ${territory.replace('_', ' ')} (${affectedLeads.join(', ')})`,
          severity: 'critical',
          leadsAffected: affectedLeads,
          clinicalSignificance: 'IAMCSST - oclusao coronariana aguda',
          possibleCauses: ['Oclusao coronariana aguda'],
          recommendedActions: [
            'Ativar protocolo STEMI',
            'AAS 300mg',
            'Dupla antiagregacao',
            'Transferir para hemodinamica',
          ],
        });

        actions.push({
          id: `stemi-action-${territory}`,
          action: 'STEMI - Ativar codigo infarto; transferir para ICP',
          priority: 'immediate',
          category: 'referral',
          rationale: `Supra de ST em ${territory}`,
          timeframe: 'Imediato - porta-balao < 90min',
        });
        break;
      }
    }
  }

  // Analyze depressions
  if (depressions.length > 0 && !hasSTEMI) {
    // Check for posterior MI pattern (V1-V3 depression)
    const anteriorDepressions = depressions.filter(d =>
      ['V1', 'V2', 'V3'].includes(d.lead) && d.magnitude && d.magnitude >= 1
    );

    if (anteriorDepressions.length >= 2) {
      urgency = Math.max(urgency, 3) as 1 | 2 | 3 | 4;
      findings.push({
        code: 'posterior_mi_pattern',
        description: 'Infra de ST em V1-V3 - possivel IAM posterior',
        severity: 'severe',
        leadsAffected: anteriorDepressions.map(d => d.lead),
        clinicalSignificance: 'Pode representar IAMCSST posterior em espelho',
        possibleCauses: ['IAM posterior', 'Isquemia subendocardica'],
        recommendedActions: ['Fazer derivacoes posteriores (V7-V9)', 'Se supra em V7-V9 = tratar como STEMI'],
      });

      actions.push({
        id: 'posterior-mi-action',
        action: 'Fazer derivacoes posteriores (V7, V8, V9)',
        priority: 'urgent',
        category: 'diagnostic',
        rationale: 'Suspeita de IAM posterior',
        timeframe: 'Imediato',
      });
    } else {
      // General ST depression - ischemia
      urgency = Math.max(urgency, 2) as 1 | 2 | 3 | 4;
      findings.push({
        code: 'st_depression',
        description: `Infra de ST em ${depressions.map(d => d.lead).join(', ')}`,
        severity: 'moderate',
        leadsAffected: depressions.map(d => d.lead),
        clinicalSignificance: 'Pode indicar isquemia subendocardica ou IAMSST',
        possibleCauses: ['Isquemia miocardica', 'Efeito de digitalis', 'HVE com strain'],
        recommendedActions: ['Correlacionar com clinica', 'Dosar troponina', 'ECGs seriados'],
      });
    }
  }

  const description = hasSTEMI ?
    `SUPRA DE ST - STEMI em ${findings[0].leadsAffected?.join(', ')}` :
    `Alteracoes de ST identificadas`;

  return {
    isNormal: false,
    description,
    findings,
    actions,
    urgency,
    hasSTEMI,
    reasoning: hasSTEMI ?
      'STEMI identificado - ativar protocolo de reperfusao' :
      'Alteracoes de ST que requerem correlacao clinica',
  };
}

/**
 * Analyzes T wave changes
 */
function analyzeTWaveChanges(
  tWaveChanges: TWaveChangeDetail[]
): {
  isNormal: boolean;
  description: string;
  findings: AbnormalFinding[];
  actions: SuggestedAction[];
  urgency: 1 | 2 | 3 | 4;
  reasoning: string;
} {
  const findings: AbnormalFinding[] = [];
  const actions: SuggestedAction[] = [];
  let urgency: 1 | 2 | 3 | 4 = 1;

  const abnormalT = tWaveChanges.filter(t => t.type !== 'normal');

  if (abnormalT.length === 0) {
    return {
      isNormal: true,
      description: 'Ondas T normais',
      findings: [],
      actions: [],
      urgency: 1,
      reasoning: 'Ondas T normais em todas as derivacoes avaliadas',
    };
  }

  // Check for hyperacute T waves (early STEMI)
  const hyperacute = abnormalT.filter(t => t.type === 'hyperacute' || t.type === 'peaked');
  if (hyperacute.length > 0) {
    urgency = Math.max(urgency, 3) as 1 | 2 | 3 | 4;
    findings.push({
      code: 't_hyperacute',
      description: `Ondas T hiperagudas em ${hyperacute.map(h => h.lead).join(', ')}`,
      severity: 'severe',
      leadsAffected: hyperacute.map(h => h.lead),
      clinicalSignificance: 'Pode indicar IAM hiperagudo ou hipercalemia',
      possibleCauses: ['IAM hiperagudo (fase inicial)', 'Hipercalemia'],
      recommendedActions: ['ECGs seriados a cada 15min', 'Dosar K+', 'Monitorização'],
    });

    actions.push({
      id: 't-hyperacute-action',
      action: 'Ondas T hiperagudas - monitorar evolucao; dosar K+',
      priority: 'urgent',
      category: 'diagnostic',
      rationale: 'Possivel IAM hiperagudo ou hipercalemia',
      timeframe: '15-30 minutos',
    });
  }

  // Check for Wellens syndrome pattern
  const wellensPattern = abnormalT.filter(t =>
    (t.type === 'inverted' || t.type === 'biphasic') &&
    ['V2', 'V3', 'V4'].includes(t.lead)
  );
  if (wellensPattern.length >= 2) {
    urgency = Math.max(urgency, 3) as 1 | 2 | 3 | 4;
    findings.push({
      code: 't_wellens',
      description: 'Padrao de Wellens (inversao de T em V2-V4)',
      severity: 'severe',
      leadsAffected: wellensPattern.map(w => w.lead),
      clinicalSignificance: 'Alta probabilidade de lesao critica de DA proximal',
      possibleCauses: ['Estenose critica de DA proximal'],
      recommendedActions: ['NAO fazer teste de esforco', 'Encaminhar para cateterismo em < 24h'],
    });

    actions.push({
      id: 't-wellens-action',
      action: 'Padrao de Wellens - cateterismo em < 24h; NAO fazer teste de esforco',
      priority: 'urgent',
      category: 'referral',
      rationale: 'Lesao critica de DA proximal provavel',
      timeframe: '< 24 horas',
    });
  }

  // General T wave inversions
  const inversions = abnormalT.filter(t => t.type === 'inverted' && !wellensPattern.includes(t));
  if (inversions.length > 0) {
    const severity = inversions.length > 3 ? 'moderate' as const : 'mild' as const;
    urgency = Math.max(urgency, 2) as 1 | 2 | 3 | 4;
    findings.push({
      code: 't_inversion',
      description: `Inversao de T em ${inversions.map(i => i.lead).join(', ')}`,
      severity,
      leadsAffected: inversions.map(i => i.lead),
      clinicalSignificance: 'Pode indicar isquemia, cardiomiopatia, ou ser inespecifica',
      possibleCauses: ['Isquemia', 'Cardiomiopatia', 'TEP', 'Alteracao inespecifica'],
      recommendedActions: ['Correlacionar com clinica', 'Comparar com ECG previo'],
    });
  }

  return {
    isNormal: false,
    description: `Alteracoes de onda T: ${findings.map(f => f.code).join(', ')}`,
    findings,
    actions,
    urgency,
    reasoning: `Alteracoes de onda T identificadas - ${urgency >= 3 ? 'requer atencao urgente' : 'avaliar no contexto clinico'}`,
  };
}

/**
 * Creates a RedFlagResult from a red flag ID
 */
function createRedFlagResult(id: string, triggeredBy: string[]): RedFlagResult | null {
  const rf = ecgRedFlags.find(r => r.id === id);
  if (!rf) return null;
  return createRedFlagResultFromData(rf, triggeredBy);
}

/**
 * Creates a RedFlagResult from ECGRedFlag data
 */
function createRedFlagResultFromData(
  rf: typeof ecgRedFlags[0],
  triggeredBy: string[]
): RedFlagResult {
  return {
    id: rf.id,
    code: rf.id,
    name: rf.nome,
    urgencyLevel: rf.urgencia,
    category: rf.categoria,
    timeToAction: rf.tempoParaAcao,
    immediateActions: rf.acaoImediata,
    actionsToAvoid: rf.naoFazer,
    whoToContact: rf.quemChamar,
    triggeredBy,
  };
}

/**
 * Converts urgency level to classification
 */
function urgencyToClassification(urgency: 1 | 2 | 3 | 4): AnalysisResult['classification'] {
  switch (urgency) {
    case 4: return 'emergencia';
    case 3: return 'anormal_urgente';
    case 2: return 'anormal_nao_urgente';
    default: return 'normal';
  }
}

/**
 * Builds reasoning explanation
 */
function buildReasoning(
  classification: AnalysisResult['classification'],
  abnormalFindings: AbnormalFinding[],
  redFlags: RedFlagResult[],
  reasoningParts: string[]
): string {
  if (classification === 'normal' && abnormalFindings.length === 0 && redFlags.length === 0) {
    return 'ECG sem alteracoes significativas identificadas. Todos os parametros avaliados estao dentro da normalidade.';
  }

  const parts: string[] = [];

  if (redFlags.length > 0) {
    parts.push(`Red flags identificados: ${redFlags.map(rf => rf.name).join(', ')}.`);
  }

  if (abnormalFindings.length > 0) {
    const critical = abnormalFindings.filter(f => f.severity === 'critical');
    const severe = abnormalFindings.filter(f => f.severity === 'severe');
    const moderate = abnormalFindings.filter(f => f.severity === 'moderate');

    if (critical.length > 0) {
      parts.push(`Achados criticos: ${critical.map(f => f.description).join(', ')}.`);
    }
    if (severe.length > 0) {
      parts.push(`Achados graves: ${severe.map(f => f.description).join(', ')}.`);
    }
    if (moderate.length > 0) {
      parts.push(`Achados moderados: ${moderate.map(f => f.description).join(', ')}.`);
    }
  }

  if (reasoningParts.length > 0) {
    parts.push(reasoningParts.join(' '));
  }

  const classificationText = classification === 'emergencia' ?
    'Classificacao: EMERGENCIA - acao imediata necessaria.' :
    classification === 'anormal_urgente' ?
    'Classificacao: Urgente - avaliacao em horas.' :
    classification === 'anormal_nao_urgente' ?
    'Classificacao: Anormal nao-urgente - encaminhamento eletivo.' :
    'Classificacao: Normal.';

  return `${classificationText} ${parts.join(' ')}`;
}

/**
 * Converts priority string to number for sorting
 */
function priorityToNumber(priority: SuggestedAction['priority']): number {
  switch (priority) {
    case 'immediate': return 1;
    case 'urgent': return 2;
    case 'soon': return 3;
    case 'routine': return 4;
    default: return 5;
  }
}

/**
 * Deduplicates actions by action text
 */
function deduplicateActions(actions: SuggestedAction[]): SuggestedAction[] {
  const seen = new Set<string>();
  return actions.filter(action => {
    const key = action.action.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Maps ClinicalContext to referral context
 */
function mapClinicalContextToReferralContext(
  context: ClinicalContext
): 'aps' | 'emergencia' | 'uti' | 'preoperatorio' {
  switch (context) {
    case 'emergency': return 'emergencia';
    case 'icu':
    case 'ccu': return 'uti';
    case 'primary_care':
    case 'telemedicine': return 'aps';
    case 'preoperative': return 'preoperatorio';
    case 'ward': return 'aps';
    default: return 'aps';
  }
}

/**
 * Determines severity from checklist response
 */
function determineSeverityFromResponse(response: ChecklistResponse): AbnormalFinding['severity'] {
  const respLower = response.resposta.toLowerCase();
  if (respLower.includes('emergencia') || respLower.includes('critico') || respLower.includes('grave')) {
    return 'critical';
  }
  if (respLower.includes('urgente') || respLower.includes('severo')) {
    return 'severe';
  }
  if (respLower.includes('moderado')) {
    return 'moderate';
  }
  return 'mild';
}

/**
 * Extracts section value from checklist responses
 */
function extractSectionValue(
  responses: Record<string, ChecklistResponse[]>,
  stepOrItemId: string
): string {
  for (const stepId of Object.keys(responses)) {
    if (stepId === stepOrItemId) {
      const stepResponses = responses[stepId];
      if (stepResponses.length > 0) {
        return stepResponses.map(r => r.resposta).join('; ');
      }
    }
    for (const response of responses[stepId]) {
      if (response.itemId.includes(stepOrItemId)) {
        return response.resposta;
      }
    }
  }
  return '';
}

/**
 * Extracts numeric value from checklist responses
 */
function extractNumericValue(
  responses: Record<string, ChecklistResponse[]>,
  stepOrItemId: string
): number | undefined {
  const value = extractSectionValue(responses, stepOrItemId);
  const match = value.match(/\d+/);
  return match ? parseInt(match[0], 10) : undefined;
}

/**
 * Determines rate classification
 */
function determineRateClassification(rate?: number): 'bradycardia' | 'normal' | 'tachycardia' {
  if (!rate) return 'normal';
  if (rate < 60) return 'bradycardia';
  if (rate > 100) return 'tachycardia';
  return 'normal';
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  analyzeForNonSpecialist,
  generateSystematicReport,
  identifyRedFlags,
  suggestReferral,
  getProtocolByContext,
  classifyUrgency,
  generateActionPlan,
};
