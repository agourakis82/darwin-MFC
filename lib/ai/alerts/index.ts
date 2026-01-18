/**
 * CLINICAL ALERTS SYSTEM - INDEX
 * =============================
 *
 * Central export point for all clinical alert generation utilities.
 * Includes rules, generators, consistency checking, and drug interactions.
 */

// =============================================================================
// ALERT RULES
// =============================================================================

export {
  type AlertSeverity,
  type AlertCategory,
  type ClinicalContext,
  type MedicationContext,
  type AlertRule,
  renalDosageAdjustmentRule,
  redFlagSymptomsRule,
  absoluteContraindicationRule,
  abnormalDosageRule,
  elderlyHighRiskMedicationRule,
  pregnancyContraindicationRule,
  breastfeedingContraindicationRule,
  missingMonitoringRule,
  qtProlongationRiskRule,
  ALL_ALERT_RULES,
} from './alert-rules';

// =============================================================================
// ALERT GENERATOR
// =============================================================================

export {
  type AlertGenerationConfig,
  generateAlerts,
  getAlertsBySeverity,
  getCriticalAlerts,
  hasCriticalAlerts,
  type AlertSummary,
  getAlertSummary,
  serializeAlerts,
  deserializeAlerts,
  type AlertFilter,
  filterAlerts,
} from './alert-generator';

// =============================================================================
// CONSISTENCY CHECKER
// =============================================================================

export {
  type ConsistencyIssue,
  type ConsistencyReport,
  ClinicalConsistencyChecker,
  checkConsistency,
  convertConsistencyToAlerts,
  getConsistencyIssueSummary,
} from './consistency-checker';

// =============================================================================
// DRUG INTERACTION ALERTS
// =============================================================================

export {
  type DrugInteractionDetail,
  type InteractionAlert,
  DrugInteractionDetector,
  generateInteractionAlerts,
  getInteractionManagementOptions,
  type InteractionManagement,
  DANGEROUS_COMBINATIONS,
  checkDangerousCombinations,
  type InteractionReport,
  generateInteractionReport,
  exportInteractionData,
} from './drug-interaction-alerts';

// =============================================================================
// COMPREHENSIVE ALERT SYSTEM
// =============================================================================

import { generateAlerts, type AlertGenerationConfig } from './alert-generator';
import type { ClinicalContext } from './alert-rules';
import { checkConsistency } from './consistency-checker';
import { generateInteractionReport } from './drug-interaction-alerts';
import { ClinicalAlert } from '@/lib/clinical-decision-support/alerts/clinical-alerts';

/**
 * Comprehensive clinical alert generation combining all systems
 */
export interface ComprehensiveAlertAnalysis {
  timestamp: Date;
  contextId: string;
  alerts: ClinicalAlert[];
  alertSummary: {
    total: number;
    critical: number;
    warnings: number;
    info: number;
  };
  consistencyReport: ReturnType<typeof checkConsistency>;
  interactionReport: ReturnType<typeof generateInteractionReport>;
  riskScore: number;
  recommendations: string[];
}

/**
 * Run comprehensive clinical alert analysis
 *
 * Combines:
 * 1. Rule-based alert generation
 * 2. Clinical consistency checking
 * 3. Drug interaction analysis
 *
 * @param context - Clinical context to analyze
 * @param config - Optional alert generation config
 * @returns Comprehensive analysis with all alerts and reports
 */
export function runComprehensiveAnalysis(
  context: ClinicalContext,
  config?: Partial<AlertGenerationConfig>
): ComprehensiveAlertAnalysis {
  // Generate alerts from rules
  const alerts = generateAlerts(context, config);

  // Check clinical consistency
  const consistencyReport = checkConsistency(context);

  // Check drug interactions
  const interactionReport = generateInteractionReport(context.medications);

  // Combine all alerts
  const allAlerts = [
    ...alerts,
    ...interactionReport.interactions.map((ia) => ia.alert),
  ];

  // Calculate risk score
  const riskScore = calculateOverallRiskScore(alerts, consistencyReport, interactionReport);

  // Compile recommendations
  const recommendations = compileRecommendations(
    consistencyReport,
    interactionReport,
    allAlerts
  );

  return {
    timestamp: new Date(),
    contextId: `analysis-${Date.now()}`,
    alerts: allAlerts,
    alertSummary: {
      total: allAlerts.length,
      critical: allAlerts.filter((a) => a.severity === 'critical').length,
      warnings: allAlerts.filter((a) => a.severity === 'warning').length,
      info: allAlerts.filter((a) => a.severity === 'info').length,
    },
    consistencyReport,
    interactionReport,
    riskScore,
    recommendations,
  };
}

/**
 * Calculate overall clinical risk score (0-100)
 */
function calculateOverallRiskScore(
  alerts: ClinicalAlert[],
  consistencyReport: ReturnType<typeof checkConsistency>,
  interactionReport: ReturnType<typeof generateInteractionReport>
): number {
  let score = 0;

  // Alert contribution (critical=20, warning=5, info=1)
  const criticalAlerts = alerts.filter((a) => a.severity === 'critical').length;
  const warnings = alerts.filter((a) => a.severity === 'warning').length;

  score += criticalAlerts * 15;
  score += warnings * 5;

  // Consistency report contribution
  score += 100 - consistencyReport.overallScore;

  // Interaction severity contribution
  score += interactionReport.critical * 10;
  score += interactionReport.warnings * 3;

  // Normalize to 0-100
  const normalized = Math.min(100, Math.max(0, score));

  return Math.round(normalized);
}

/**
 * Compile all recommendations from various sources
 */
function compileRecommendations(
  consistencyReport: ReturnType<typeof checkConsistency>,
  interactionReport: ReturnType<typeof generateInteractionReport>,
  alerts: ClinicalAlert[]
): string[] {
  const recommendations: string[] = [];

  // Add consistency recommendations
  recommendations.push(...consistencyReport.recommendations);

  // Add interaction summary
  if (interactionReport.totalInteractions > 0) {
    recommendations.push(`Review ${interactionReport.totalInteractions} drug interaction(s).`);
  }

  // Add critical alert summary
  const criticalAlerts = alerts.filter((a) => a.severity === 'critical');
  if (criticalAlerts.length > 0) {
    recommendations.push(
      `⚠️ ADDRESS ${criticalAlerts.length} CRITICAL ALERT(S) IMMEDIATELY`
    );
  }

  return recommendations;
}

/**
 * Export comprehensive analysis for documentation
 */
export function exportComprehensiveAnalysis(
  analysis: ComprehensiveAlertAnalysis,
  format: 'json' | 'text' = 'json'
): string {
  if (format === 'json') {
    return JSON.stringify(analysis, null, 2);
  }

  // Text/markdown format
  const lines: string[] = [];

  lines.push('# COMPREHENSIVE CLINICAL ALERT ANALYSIS');
  lines.push(`Generated: ${analysis.timestamp.toISOString()}`);
  lines.push('');

  lines.push('## ALERT SUMMARY');
  lines.push(`- Total Alerts: ${analysis.alertSummary.total}`);
  lines.push(`- Critical: ${analysis.alertSummary.critical}`);
  lines.push(`- Warnings: ${analysis.alertSummary.warnings}`);
  lines.push(`- Informational: ${analysis.alertSummary.info}`);
  lines.push(`- Overall Risk Score: ${analysis.riskScore}/100`);
  lines.push('');

  lines.push('## CRITICAL ALERTS');
  const critical = analysis.alerts.filter((a) => a.severity === 'critical');
  if (critical.length === 0) {
    lines.push('None');
  } else {
    critical.forEach((alert) => {
      lines.push(`- ${alert.title}`);
      lines.push(`  ${alert.message}`);
    });
  }
  lines.push('');

  lines.push('## RECOMMENDATIONS');
  analysis.recommendations.forEach((rec) => {
    lines.push(`- ${rec}`);
  });
  lines.push('');

  lines.push('## DRUG INTERACTIONS');
  lines.push(`Total: ${analysis.interactionReport.totalInteractions}`);
  lines.push(`Summary: ${analysis.interactionReport.summary}`);
  lines.push('');

  lines.push('## CLINICAL CONSISTENCY');
  lines.push(`Overall Score: ${analysis.consistencyReport.overallScore}/100`);
  lines.push(`Issues Found: ${analysis.consistencyReport.issues.length}`);

  return lines.join('\n');
}
