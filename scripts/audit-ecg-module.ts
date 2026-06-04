import {
  allECGPatterns,
  allRedFlags,
  allReferralCriteria,
  allTriageAlgorithms,
  allDecisionTrees,
  allContextProtocols,
  ecgModuleStats,
  getEmergencyPatterns,
  searchPatterns,
} from '../lib/data/ecg/index';
import {
  analyzeForNonSpecialist,
  classifyUrgency,
  generateActionPlan,
  identifyRedFlags,
  suggestReferral,
  type ECGFindings,
} from '../lib/services/ecg-clinical-support';
import type { ClinicalContext } from '../lib/types/ecg';

type AnyRecord = Record<string, unknown>;

function duplicateIds(items: readonly AnyRecord[]): string[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    const id = typeof item.id === 'string' ? item.id : '';
    if (!id) continue;
    counts.set(id, (counts.get(id) || 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([id]) => id)
    .sort();
}

function countWithField(items: readonly AnyRecord[], field: string): number {
  return items.filter((item) => {
    const value = item[field];
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  }).length;
}

function runScenario(name: string, findings: ECGFindings, context: ClinicalContext) {
  const analysis = analyzeForNonSpecialist(findings);
  const redFlags = identifyRedFlags(findings);
  const urgency = classifyUrgency(findings);
  const referral = suggestReferral(findings, context);
  const actionPlan = generateActionPlan(findings, context);

  return {
    name,
    context,
    analysis: {
      classification: analysis.classification,
      urgencyLevel: analysis.urgencyLevel,
      redFlags: analysis.redFlags.length,
      abnormalFindings: analysis.abnormalFindings.length,
      suggestedActions: analysis.suggestedActions.length,
    },
    redFlags: redFlags.map((flag) => ({
      id: flag.id,
      urgencyLevel: flag.urgencyLevel,
      category: flag.category,
    })),
    urgency: {
      level: urgency.level,
      category: urgency.category,
      urgencyFactors: urgency.urgencyFactors.length,
      timeSensitiveActions: urgency.timeSensitiveActions.length,
    },
    referral: {
      shouldRefer: referral.shouldRefer,
      recommendation: referral.recommendation,
      destination: referral.destination,
      timeframe: referral.timeframe,
    },
    actionPlan: {
      immediateActions: actionPlan.immediateActions.length,
      shortTermActions: actionPlan.shortTermActions.length,
      monitoring: actionPlan.monitoring.length,
      followUp: actionPlan.followUp.length,
    },
  };
}

const normalScenario: ECGFindings = {
  rhythm: 'ritmo sinusal',
  rate: 72,
  axis: 'normal',
  intervals: { pr: 160, qrs: 90, qtc: 420 },
  stChanges: [
    { lead: 'II', type: 'normal' },
    { lead: 'V5', type: 'normal' },
  ],
  tWaveChanges: [{ lead: 'V5', type: 'normal' }],
};

const stemiScenario: ECGFindings = {
  rhythm: 'ritmo sinusal',
  rate: 92,
  axis: 'normal',
  intervals: { pr: 160, qrs: 92, qtc: 440 },
  stChanges: [
    { lead: 'V2', type: 'elevation', magnitude: 2, shape: 'convex' },
    { lead: 'V3', type: 'elevation', magnitude: 2, shape: 'convex' },
    { lead: 'V4', type: 'elevation', magnitude: 1.5, shape: 'convex' },
  ],
  tWaveChanges: [{ lead: 'V3', type: 'hyperacute' }],
  otherFindings: ['dor toracica', 'iamcsst', 'supradesnivel-st'],
};

const qtcScenario: ECGFindings = {
  rhythm: 'ritmo sinusal',
  rate: 58,
  axis: 'normal',
  intervals: { pr: 170, qrs: 90, qtc: 560 },
  stChanges: [{ lead: 'II', type: 'normal' }],
  tWaveChanges: [{ lead: 'II', type: 'normal' }],
  otherFindings: ['QT prolongado'],
};

const textStemiScenario: ECGFindings = {
  otherFindings: ['STEMI'],
};

const report = {
  generatedAt: new Date().toISOString(),
  stats: ecgModuleStats,
  counts: {
    patterns: allECGPatterns.length,
    emergencyPatterns: getEmergencyPatterns().length,
    redFlags: allRedFlags.length,
    referralCriteria: allReferralCriteria.length,
    triageAlgorithms: allTriageAlgorithms.length,
    decisionTrees: allDecisionTrees.length,
    contextProtocols: allContextProtocols.length,
  },
  duplicates: {
    patternIds: duplicateIds(allECGPatterns as unknown as readonly AnyRecord[]),
    redFlagIds: duplicateIds(allRedFlags as unknown as readonly AnyRecord[]),
    referralCriteriaIds: duplicateIds(allReferralCriteria as unknown as readonly AnyRecord[]),
  },
  coverage: {
    patternsWithTags: countWithField(allECGPatterns as unknown as readonly AnyRecord[], 'tags'),
    patternsWithReferences:
      countWithField(allECGPatterns as unknown as readonly AnyRecord[], 'referencias') +
      countWithField(allECGPatterns as unknown as readonly AnyRecord[], 'citations'),
    redFlagsWithActions:
      countWithField(allRedFlags as unknown as readonly AnyRecord[], 'acoesImediatas') +
      countWithField(allRedFlags as unknown as readonly AnyRecord[], 'acaoImediata') +
      countWithField(allRedFlags as unknown as readonly AnyRecord[], 'immediateActions'),
    referralCriteriaWithTags: countWithField(
      allReferralCriteria as unknown as readonly AnyRecord[],
      'tags'
    ),
  },
  searchSmokeTests: {
    stemi: searchPatterns('STEMI').map((pattern) => pattern.id).slice(0, 10),
    qt: searchPatterns('QT').map((pattern) => pattern.id).slice(0, 10),
    bloqueio: searchPatterns('bloqueio').map((pattern) => pattern.id).slice(0, 10),
  },
  scenarios: [
    runScenario('normal-primary-care', normalScenario, 'primary_care'),
    runScenario('stemi-emergency', stemiScenario, 'emergency'),
    runScenario('qtc-prolonged-primary-care', qtcScenario, 'primary_care'),
    runScenario('text-stemi-emergency', textStemiScenario, 'emergency'),
  ],
};

console.log(JSON.stringify(report, null, 2));
