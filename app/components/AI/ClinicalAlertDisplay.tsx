'use client';

/**
 * ClinicalAlertDisplay Component
 * ==============================
 *
 * Displays clinical alerts generated from NER entity extraction results.
 * Detects drug interactions, critical lab values, red-flag symptoms,
 * and other clinically relevant patterns.
 *
 * Features:
 * - Automatic alert generation from extracted entities
 * - Severity-based grouping (critical, warning, info)
 * - Dismissible alerts with persistence
 * - Entity linking for quick navigation
 * - Action suggestions for critical alerts
 */

import React, { useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  X,
  Bell,
  BellOff,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Pill,
  Activity,
  Heart,
  Thermometer,
  FlaskConical,
} from 'lucide-react';
import type { ExtractedEntity } from '@/lib/ai/extraction/biobert-extractor';
import type { EntityType } from '@/lib/ai/models/onnx-config';

// =============================================================================
// TYPES
// =============================================================================

export type AlertSeverity = 'critical' | 'warning' | 'info';
export type AlertCategory =
  | 'drug-interaction'
  | 'contraindication'
  | 'critical-value'
  | 'red-flag'
  | 'dosage'
  | 'monitoring'
  | 'follow-up';

export interface ClinicalAlert {
  id: string;
  severity: AlertSeverity;
  category: AlertCategory;
  title: string;
  message: string;
  action?: string;
  entities?: ExtractedEntity[];
  dismissible?: boolean;
  timestamp: Date;
  source?: 'ner' | 'rule' | 'manual';
}

export interface ClinicalAlertDisplayProps {
  /** Extracted entities from NER */
  entities: ExtractedEntity[];
  /** Custom alerts to display alongside generated ones */
  customAlerts?: ClinicalAlert[];
  /** Callback when an entity is clicked */
  onEntityClick?: (entity: ExtractedEntity) => void;
  /** Callback when alert is dismissed */
  onAlertDismiss?: (alertId: string) => void;
  /** Show only specific severities */
  filterSeverity?: AlertSeverity[];
  /** Show only specific categories */
  filterCategory?: AlertCategory[];
  /** Maximum alerts to show (default: 10) */
  maxAlerts?: number;
  /** Enable sound notification for critical alerts */
  enableSound?: boolean;
  /** Compact mode for inline display */
  compact?: boolean;
  /** Custom class name */
  className?: string;
}

// =============================================================================
// ALERT RULES & DETECTION
// =============================================================================

interface AlertRule {
  id: string;
  severity: AlertSeverity;
  category: AlertCategory;
  titleKey: string;
  messageKey: string;
  actionKey?: string;
  detect: (entities: ExtractedEntity[]) => ExtractedEntity[] | null;
}

// Brazilian Portuguese drug interaction rules
const DRUG_INTERACTION_RULES: Array<{
  drugs: string[];
  severity: AlertSeverity;
  risk: string;
}> = [
  {
    drugs: ['varfarina', 'aspirina'],
    severity: 'critical',
    risk: 'Increased bleeding risk',
  },
  {
    drugs: ['varfarina', 'ibuprofeno'],
    severity: 'critical',
    risk: 'Increased bleeding risk',
  },
  {
    drugs: ['metformina', 'contraste iodado'],
    severity: 'critical',
    risk: 'Risk of lactic acidosis',
  },
  {
    drugs: ['enalapril', 'espironolactona'],
    severity: 'warning',
    risk: 'Hyperkalemia risk',
  },
  {
    drugs: ['losartana', 'espironolactona'],
    severity: 'warning',
    risk: 'Hyperkalemia risk',
  },
  {
    drugs: ['fluoxetina', 'tramadol'],
    severity: 'critical',
    risk: 'Serotonin syndrome risk',
  },
  {
    drugs: ['sertralina', 'tramadol'],
    severity: 'critical',
    risk: 'Serotonin syndrome risk',
  },
  {
    drugs: ['omeprazol', 'clopidogrel'],
    severity: 'warning',
    risk: 'Reduced antiplatelet efficacy',
  },
  {
    drugs: ['metformina', 'furosemida'],
    severity: 'info',
    risk: 'Monitor renal function',
  },
];

// Red flag symptoms
const RED_FLAG_SYMPTOMS = [
  { pattern: /dor.*precordial|dor.*peito/i, severity: 'critical' as AlertSeverity, condition: 'Possible cardiac event' },
  { pattern: /dispneia.*súbita|falta.*ar.*aguda/i, severity: 'critical' as AlertSeverity, condition: 'Respiratory emergency' },
  { pattern: /cefaleia.*intensa|pior.*cefaleia/i, severity: 'critical' as AlertSeverity, condition: 'Possible SAH' },
  { pattern: /hemiparesia|hemiplegia|afasia/i, severity: 'critical' as AlertSeverity, condition: 'Possible stroke' },
  { pattern: /febre.*alta|febre.*39|febre.*40/i, severity: 'warning' as AlertSeverity, condition: 'High fever' },
  { pattern: /perda.*peso.*involuntária/i, severity: 'warning' as AlertSeverity, condition: 'Investigate malignancy' },
  { pattern: /hematúria|sangue.*urina/i, severity: 'warning' as AlertSeverity, condition: 'Urological evaluation needed' },
  { pattern: /melena|hematêmese/i, severity: 'critical' as AlertSeverity, condition: 'GI bleeding' },
];

// Critical lab value patterns
const CRITICAL_VALUES = [
  { pattern: /glicemia.*(\d+)/i, threshold: 400, severity: 'critical' as AlertSeverity, condition: 'Severe hyperglycemia' },
  { pattern: /glicemia.*(\d+)/i, threshold: 50, below: true, severity: 'critical' as AlertSeverity, condition: 'Severe hypoglycemia' },
  { pattern: /potássio.*(\d+\.?\d*)/i, threshold: 6.0, severity: 'critical' as AlertSeverity, condition: 'Hyperkalemia' },
  { pattern: /potássio.*(\d+\.?\d*)/i, threshold: 3.0, below: true, severity: 'critical' as AlertSeverity, condition: 'Hypokalemia' },
  { pattern: /sódio.*(\d+)/i, threshold: 160, severity: 'critical' as AlertSeverity, condition: 'Hypernatremia' },
  { pattern: /sódio.*(\d+)/i, threshold: 120, below: true, severity: 'critical' as AlertSeverity, condition: 'Hyponatremia' },
  { pattern: /hemoglobina.*(\d+\.?\d*)/i, threshold: 7.0, below: true, severity: 'critical' as AlertSeverity, condition: 'Severe anemia' },
  { pattern: /INR.*(\d+\.?\d*)/i, threshold: 5.0, severity: 'critical' as AlertSeverity, condition: 'Over-anticoagulation' },
  { pattern: /creatinina.*(\d+\.?\d*)/i, threshold: 4.0, severity: 'warning' as AlertSeverity, condition: 'Renal impairment' },
];

/**
 * Generate alerts from extracted entities
 */
function generateAlertsFromEntities(entities: ExtractedEntity[]): ClinicalAlert[] {
  const alerts: ClinicalAlert[] = [];
  const medications = entities.filter(e => e.type === 'MEDICATION');
  const symptoms = entities.filter(e => e.type === 'SYMPTOM');
  const exams = entities.filter(e => e.type === 'EXAM');

  // Check drug interactions
  for (const rule of DRUG_INTERACTION_RULES) {
    const foundDrugs = medications.filter(m =>
      rule.drugs.some(drug => m.text.toLowerCase().includes(drug.toLowerCase()))
    );

    if (foundDrugs.length >= 2) {
      alerts.push({
        id: `interaction-${foundDrugs.map(d => d.text).join('-')}-${Date.now()}`,
        severity: rule.severity,
        category: 'drug-interaction',
        title: 'Drug Interaction Detected',
        message: `${foundDrugs.map(d => d.text).join(' + ')}: ${rule.risk}`,
        action: 'Review medication list and consider alternatives',
        entities: foundDrugs,
        dismissible: true,
        timestamp: new Date(),
        source: 'ner',
      });
    }
  }

  // Check red flag symptoms
  for (const symptom of symptoms) {
    for (const flag of RED_FLAG_SYMPTOMS) {
      if (flag.pattern.test(symptom.text)) {
        alerts.push({
          id: `redflag-${symptom.text}-${Date.now()}`,
          severity: flag.severity,
          category: 'red-flag',
          title: 'Red Flag Symptom',
          message: `${symptom.text}: ${flag.condition}`,
          action: 'Urgent clinical evaluation recommended',
          entities: [symptom],
          dismissible: true,
          timestamp: new Date(),
          source: 'ner',
        });
      }
    }
  }

  // Check critical lab values
  for (const exam of exams) {
    for (const crit of CRITICAL_VALUES) {
      const match = exam.text.match(crit.pattern);
      if (match && match[1]) {
        const value = parseFloat(match[1]);
        const isCritical = crit.below ? value < crit.threshold : value > crit.threshold;

        if (isCritical) {
          alerts.push({
            id: `critval-${exam.text}-${Date.now()}`,
            severity: crit.severity,
            category: 'critical-value',
            title: 'Critical Lab Value',
            message: `${exam.text}: ${crit.condition}`,
            action: 'Immediate clinical attention required',
            entities: [exam],
            dismissible: true,
            timestamp: new Date(),
            source: 'ner',
          });
        }
      }
    }
  }

  return alerts;
}

// =============================================================================
// STYLING CONFIGURATION
// =============================================================================

const severityConfig: Record<
  AlertSeverity,
  {
    bg: string;
    border: string;
    icon: typeof AlertTriangle;
    iconColor: string;
    badgeBg: string;
    badgeText: string;
  }
> = {
  critical: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-500',
    icon: AlertTriangle,
    iconColor: 'text-red-600 dark:text-red-400',
    badgeBg: 'bg-red-500',
    badgeText: 'text-white',
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-500',
    icon: AlertCircle,
    iconColor: 'text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-500',
    badgeText: 'text-white',
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-500',
    icon: Info,
    iconColor: 'text-blue-600 dark:text-blue-400',
    badgeBg: 'bg-blue-500',
    badgeText: 'text-white',
  },
};

const categoryConfig: Record<
  AlertCategory,
  {
    icon: typeof Pill;
    label: string;
    labelPt: string;
  }
> = {
  'drug-interaction': { icon: Pill, label: 'Drug Interaction', labelPt: 'Interação Medicamentosa' },
  'contraindication': { icon: AlertTriangle, label: 'Contraindication', labelPt: 'Contraindicação' },
  'critical-value': { icon: FlaskConical, label: 'Critical Value', labelPt: 'Valor Crítico' },
  'red-flag': { icon: Heart, label: 'Red Flag', labelPt: 'Sinal de Alerta' },
  'dosage': { icon: Activity, label: 'Dosage Alert', labelPt: 'Alerta de Dosagem' },
  'monitoring': { icon: Thermometer, label: 'Monitoring', labelPt: 'Monitoramento' },
  'follow-up': { icon: Bell, label: 'Follow-up', labelPt: 'Acompanhamento' },
};

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface AlertCardProps {
  alert: ClinicalAlert;
  onDismiss?: (id: string) => void;
  onEntityClick?: (entity: ExtractedEntity) => void;
  compact?: boolean;
}

function AlertCard({ alert, onDismiss, onEntityClick, compact }: AlertCardProps) {
  const [expanded, setExpanded] = useState(false);
  const severity = severityConfig[alert.severity];
  const category = categoryConfig[alert.category];
  const Icon = severity.icon;
  const CategoryIcon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`rounded-lg border-l-4 ${severity.bg} ${severity.border} ${compact ? 'p-2' : 'p-4'}`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${severity.iconColor}`} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${severity.badgeBg} ${severity.badgeText}`}>
              <CategoryIcon className="w-3 h-3" />
              {category.labelPt}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {alert.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <p className={`font-semibold ${compact ? 'text-sm' : 'text-base'} mt-1`}>
            {alert.title}
          </p>

          <p className={`${compact ? 'text-xs' : 'text-sm'} text-slate-600 dark:text-slate-300 mt-1`}>
            {alert.message}
          </p>

          {alert.action && (
            <p className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-slate-700 dark:text-slate-200 mt-2`}>
              → {alert.action}
            </p>
          )}

          {/* Related entities */}
          {alert.entities && alert.entities.length > 0 && (
            <div className="mt-2">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {alert.entities.length} entidade(s) relacionada(s)
              </button>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-1 mt-2">
                      {alert.entities.map((entity, idx) => (
                        <button
                          key={`${entity.text}-${idx}`}
                          onClick={() => onEntityClick?.(entity)}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs hover:bg-slate-50 dark:hover:bg-slate-700"
                        >
                          {entity.text}
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {alert.dismissible && onDismiss && (
          <button
            onClick={() => onDismiss(alert.id)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

interface AlertSummaryProps {
  alerts: ClinicalAlert[];
  onMuteToggle?: () => void;
  muted?: boolean;
}

function AlertSummary({ alerts, onMuteToggle, muted }: AlertSummaryProps) {
  const counts = useMemo(() => {
    return {
      critical: alerts.filter(a => a.severity === 'critical').length,
      warning: alerts.filter(a => a.severity === 'warning').length,
      info: alerts.filter(a => a.severity === 'info').length,
    };
  }, [alerts]);

  if (alerts.length === 0) return null;

  return (
    <div className="flex items-center justify-between mb-3 p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Bell className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-medium">{alerts.length} Alertas</span>
        </div>

        <div className="flex items-center gap-2">
          {counts.critical > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white">
              {counts.critical} crítico{counts.critical > 1 ? 's' : ''}
            </span>
          )}
          {counts.warning > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500 text-white">
              {counts.warning} aviso{counts.warning > 1 ? 's' : ''}
            </span>
          )}
          {counts.info > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">
              {counts.info} info
            </span>
          )}
        </div>
      </div>

      {onMuteToggle && (
        <button
          onClick={onMuteToggle}
          className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
          aria-label={muted ? 'Unmute alerts' : 'Mute alerts'}
        >
          {muted ? (
            <BellOff className="w-4 h-4 text-slate-400" />
          ) : (
            <Bell className="w-4 h-4 text-slate-500" />
          )}
        </button>
      )}
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function ClinicalAlertDisplay({
  entities,
  customAlerts = [],
  onEntityClick,
  onAlertDismiss,
  filterSeverity,
  filterCategory,
  maxAlerts = 10,
  enableSound = false,
  compact = false,
  className = '',
}: ClinicalAlertDisplayProps) {
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  const [muted, setMuted] = useState(!enableSound);

  // Generate alerts from entities
  const generatedAlerts = useMemo(() => {
    return generateAlertsFromEntities(entities);
  }, [entities]);

  // Combine and filter alerts
  const allAlerts = useMemo(() => {
    const combined = [...generatedAlerts, ...customAlerts];

    return combined
      .filter(alert => !dismissedIds.has(alert.id))
      .filter(alert => !filterSeverity || filterSeverity.includes(alert.severity))
      .filter(alert => !filterCategory || filterCategory.includes(alert.category))
      .sort((a, b) => {
        // Sort by severity (critical > warning > info) then by timestamp
        const severityOrder = { critical: 0, warning: 1, info: 2 };
        const severityDiff = severityOrder[a.severity] - severityOrder[b.severity];
        if (severityDiff !== 0) return severityDiff;
        return b.timestamp.getTime() - a.timestamp.getTime();
      })
      .slice(0, maxAlerts);
  }, [generatedAlerts, customAlerts, dismissedIds, filterSeverity, filterCategory, maxAlerts]);

  // Handle dismiss
  const handleDismiss = useCallback((alertId: string) => {
    setDismissedIds(prev => new Set([...prev, alertId]));
    onAlertDismiss?.(alertId);
  }, [onAlertDismiss]);

  // No alerts
  if (allAlerts.length === 0) {
    return (
      <div className={`text-center py-6 text-slate-500 dark:text-slate-400 ${className}`}>
        <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">Nenhum alerta clínico identificado</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <AlertSummary
        alerts={allAlerts}
        onMuteToggle={() => setMuted(!muted)}
        muted={muted}
      />

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {allAlerts.map(alert => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onDismiss={handleDismiss}
              onEntityClick={onEntityClick}
              compact={compact}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export default ClinicalAlertDisplay;
export { generateAlertsFromEntities };
