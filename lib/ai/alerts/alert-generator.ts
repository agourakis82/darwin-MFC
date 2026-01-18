/**
 * ALERT GENERATOR - DARWIN-MFC
 * =============================
 *
 * Core alert generation engine that evaluates clinical context against
 * alert rules and generates actionable clinical alerts.
 *
 * Features:
 * - Rule-based alert generation
 * - Alert deduplication
 * - Severity-based sorting
 * - SOAP analysis integration
 */

import { ClinicalAlert } from '@/lib/clinical-decision-support/alerts/clinical-alerts';
import {
  AlertRule,
  ClinicalContext,
  ALL_ALERT_RULES,
} from './alert-rules';

// =============================================================================
// TYPES
// =============================================================================

/**
 * Alert generation configuration
 */
export interface AlertGenerationConfig {
  /** Array of alert rules to use (defaults to ALL_ALERT_RULES) */
  rules?: AlertRule[];

  /** Include informational alerts */
  includeInfo?: boolean;

  /** Include warning alerts */
  includeWarning?: boolean;

  /** Include critical alerts */
  includeCritical?: boolean;

  /** Dismiss duplicates from same category */
  deduplicateByCategory?: boolean;

  /** Maximum number of alerts to return */
  maxAlerts?: number;
}

/**
 * Internal alert representation during generation
 */
interface GeneratedAlert {
  id: string;
  rule: AlertRule;
  title: string;
  message: string;
  action?: string;
  severity: 'critical' | 'warning' | 'info';
  category: string;
  timestamp: Date;
  score: number; // For sorting
}

// =============================================================================
// ALERT GENERATION ENGINE
// =============================================================================

/**
 * Generate clinical alerts from context and rules
 *
 * @param context - Clinical context to evaluate
 * @param config - Alert generation configuration
 * @returns Array of clinical alerts sorted by severity and score
 */
export function generateAlerts(
  context: ClinicalContext,
  config: Partial<AlertGenerationConfig> = {}
): ClinicalAlert[] {
  const finalConfig: AlertGenerationConfig = {
    rules: config.rules || ALL_ALERT_RULES.filter((r) => r.enabled !== false),
    includeInfo: config.includeInfo !== false,
    includeWarning: config.includeWarning !== false,
    includeCritical: config.includeCritical !== false,
    deduplicateByCategory: config.deduplicateByCategory !== false,
    maxAlerts: config.maxAlerts || 10,
  };

  // Generate alerts from rules
  const generated = generateAlertsFromRules(context, finalConfig.rules || []);

  // Filter by severity settings
  const filtered = filterBySeverity(generated, finalConfig);

  // Deduplicate if enabled
  const deduplicated = finalConfig.deduplicateByCategory
    ? deduplicateAlerts(filtered)
    : filtered;

  // Sort by severity and score
  const sorted = sortAlerts(deduplicated);

  // Limit to max alerts
  const limited = sorted.slice(0, finalConfig.maxAlerts);

  // Convert to clinical alerts
  return convertToClinicAlerts(limited);
}

/**
 * Evaluate all rules against context
 */
function generateAlertsFromRules(
  context: ClinicalContext,
  rules: AlertRule[]
): GeneratedAlert[] {
  const alerts: GeneratedAlert[] = [];

  for (const rule of rules) {
    try {
      // Skip disabled rules
      if (rule.enabled === false) continue;

      // Evaluate rule condition
      if (rule.condition(context)) {
        const alert: GeneratedAlert = {
          id: generateAlertId(rule.id),
          rule,
          title: rule.name,
          message: rule.message(context),
          action: rule.action?.(context),
          severity: rule.severity,
          category: rule.category,
          timestamp: new Date(),
          score: calculateAlertScore(rule, context),
        };

        alerts.push(alert);
      }
    } catch (error) {
      console.error(`Error evaluating rule ${rule.id}:`, error);
    }
  }

  return alerts;
}

/**
 * Filter alerts by severity preferences
 */
function filterBySeverity(
  alerts: GeneratedAlert[],
  config: AlertGenerationConfig
): GeneratedAlert[] {
  return alerts.filter((alert) => {
    switch (alert.severity) {
      case 'critical':
        return config.includeCritical !== false;
      case 'warning':
        return config.includeWarning !== false;
      case 'info':
        return config.includeInfo !== false;
      default:
        return true;
    }
  });
}

/**
 * Remove duplicate alerts from same category
 */
function deduplicateAlerts(alerts: GeneratedAlert[]): GeneratedAlert[] {
  const seen = new Set<string>();
  const deduplicated: GeneratedAlert[] = [];

  for (const alert of alerts) {
    const key = `${alert.category}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduplicated.push(alert);
    }
  }

  return deduplicated;
}

/**
 * Sort alerts by severity (critical > warning > info) and score
 */
function sortAlerts(alerts: GeneratedAlert[]): GeneratedAlert[] {
  const severityOrder = { critical: 3, warning: 2, info: 1 };

  return alerts.sort((a, b) => {
    // Primary sort: severity
    const severityDiff =
      severityOrder[b.severity] - severityOrder[a.severity];
    if (severityDiff !== 0) return severityDiff;

    // Secondary sort: score (higher is more important)
    const scoreDiff = b.score - a.score;
    if (scoreDiff !== 0) return scoreDiff;

    // Tertiary sort: timestamp (newer first)
    return b.timestamp.getTime() - a.timestamp.getTime();
  });
}

/**
 * Convert generated alerts to clinical alert format
 */
function convertToClinicAlerts(
  generated: GeneratedAlert[]
): ClinicalAlert[] {
  return generated.map((alert) => ({
    id: alert.id,
    severity: alert.severity,
    title: alert.title,
    message: alert.message,
    action: alert.action,
    dismissible: alert.severity !== 'critical',
  }));
}

/**
 * Generate unique alert ID
 */
function generateAlertId(ruleId: string): string {
  return `alert-${ruleId}-${Date.now()}-${Math.random().toString(36).substring(7)}`;
}

/**
 * Calculate alert score (higher = more important within same severity)
 */
function calculateAlertScore(rule: AlertRule, context: ClinicalContext): number {
  let score = 0;

  // Base score by category
  const categoryScores: Record<string, number> = {
    'drug-interaction': 8,
    contraindication: 10,
    'red-flag': 9,
    'missing-exam': 4,
    dosage: 7,
    monitoring: 5,
    allergy: 10,
  };

  score += categoryScores[rule.category] || 5;

  // Boost for patient-specific factors
  if (context.age >= 75) score += 1; // Very elderly
  if (context.isPregnant) score += 2;
  if (context.isBreastfeeding) score += 1;

  // Boost for critical values
  if (context.labs?.tfg !== undefined && context.labs.tfg < 15) score += 2; // Severe renal impairment

  // Reduce for informational alerts
  if (rule.severity === 'info') score -= 2;

  return Math.max(0, score);
}

// =============================================================================
// ADVANCED FEATURES
// =============================================================================

/**
 * Get alerts filtered by severity
 */
export function getAlertsBySeverity(
  alerts: ClinicalAlert[],
  severity: 'critical' | 'warning' | 'info'
): ClinicalAlert[] {
  return alerts.filter((alert) => alert.severity === severity);
}

/**
 * Get critical alerts only
 */
export function getCriticalAlerts(alerts: ClinicalAlert[]): ClinicalAlert[] {
  return getAlertsBySeverity(alerts, 'critical');
}

/**
 * Check if context has critical alerts
 */
export function hasCriticalAlerts(context: ClinicalContext): boolean {
  const alerts = generateAlerts(context, {
    includeCritical: true,
    includeWarning: false,
    includeInfo: false,
  });
  return alerts.length > 0;
}

/**
 * Get alert summary statistics
 */
export interface AlertSummary {
  total: number;
  critical: number;
  warnings: number;
  info: number;
  hasCritical: boolean;
  categories: Record<string, number>;
}

export function getAlertSummary(alerts: ClinicalAlert[]): AlertSummary {
  const summary: AlertSummary = {
    total: alerts.length,
    critical: 0,
    warnings: 0,
    info: 0,
    hasCritical: false,
    categories: {},
  };

  for (const alert of alerts) {
    switch (alert.severity) {
      case 'critical':
        summary.critical++;
        summary.hasCritical = true;
        break;
      case 'warning':
        summary.warnings++;
        break;
      case 'info':
        summary.info++;
        break;
    }
  }

  return summary;
}

/**
 * Serialize alerts for storage or transmission
 */
export function serializeAlerts(alerts: ClinicalAlert[]): string {
  return JSON.stringify(alerts, null, 2);
}

/**
 * Deserialize alerts from storage
 */
export function deserializeAlerts(json: string): ClinicalAlert[] {
  try {
    return JSON.parse(json);
  } catch {
    console.error('Failed to deserialize alerts');
    return [];
  }
}

/**
 * Apply custom filtering to alerts
 */
export interface AlertFilter {
  severity?: Array<'critical' | 'warning' | 'info'>;
  categories?: string[];
  ruleIds?: string[];
}

export function filterAlerts(
  alerts: ClinicalAlert[],
  filter: AlertFilter
): ClinicalAlert[] {
  return alerts.filter((alert) => {
    if (filter.severity && !filter.severity.includes(alert.severity)) {
      return false;
    }

    return true;
  });
}
