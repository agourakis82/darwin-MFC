/**
 * DRUG INTERACTION ALERTS - DARWIN-MFC
 * ====================================
 *
 * Specialized alert generation for drug-drug interactions.
 * Integrates with existing medication data structures.
 *
 * Features:
 * - Pairwise interaction checking
 * - Severity-based recommendations
 * - Mechanism explanation
 * - Monitoring guidance
 * - Management suggestions
 */

import { Medicamento, Interacao, GravidadeInteracao } from '@/lib/types/medicamento';
import { MedicationContext } from './alert-rules';
import { ClinicalAlert } from '@/lib/clinical-decision-support/alerts/clinical-alerts';

// =============================================================================
// TYPES
// =============================================================================

export interface DrugInteractionDetail {
  drug1: string;
  drug1Id: string;
  drug2: string;
  drug2Id: string;
  severity: GravidadeInteracao;
  efeito: string;
  mecanismo?: string;
  conduta: string;
  evidence?: string;
  monitoramento?: string[];
  alternatives?: string[];
}

export interface InteractionAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  interaction: DrugInteractionDetail;
  alert: ClinicalAlert;
}

// =============================================================================
// INTERACTION DETECTION ENGINE
// =============================================================================

export class DrugInteractionDetector {
  /**
   * Find all interactions between medications
   */
  static findInteractions(
    medications: MedicationContext[],
    medicamentoDatabase?: Medicamento[]
  ): DrugInteractionDetail[] {
    const interactions: DrugInteractionDetail[] = [];

    // Check all pairs of medications
    for (let i = 0; i < medications.length; i++) {
      for (let j = i + 1; j < medications.length; j++) {
        const med1 = medications[i];
        const med2 = medications[j];

        if (!med1.medication || !med2.medication) continue;

        // Check if med1 has interaction with med2
        const interaction = this.getInteraction(med1.medication, med2.medication);

        if (interaction) {
          interactions.push(interaction);
        }

        // Check if med2 has interaction with med1 (bidirectional)
        const reverseInteraction = this.getInteraction(med2.medication, med1.medication);

        if (reverseInteraction && !this.isDuplicate(interactions, reverseInteraction)) {
          interactions.push(reverseInteraction);
        }
      }
    }

    return interactions;
  }

  /**
   * Get interaction between two specific medications
   */
  private static getInteraction(
    med1: Medicamento,
    med2: Medicamento
  ): DrugInteractionDetail | null {
    // Check med1's interaction list for med2
    const interacao = med1.interacoes.find((int) =>
      int.medicamento.toLowerCase().includes(med2.nomeGenerico.toLowerCase())
    );

    if (!interacao) return null;

    return {
      drug1: med1.nomeGenerico,
      drug1Id: med1.id,
      drug2: med2.nomeGenerico,
      drug2Id: med2.id,
      severity: interacao.gravidade,
      efeito: interacao.efeito,
      mecanismo: interacao.mecanismo,
      conduta: interacao.conduta,
    };
  }

  /**
   * Check if interaction is already in list (avoid duplicates)
   */
  private static isDuplicate(
    interactions: DrugInteractionDetail[],
    newInteraction: DrugInteractionDetail
  ): boolean {
    return interactions.some(
      (int) =>
        (int.drug1Id === newInteraction.drug1Id &&
          int.drug2Id === newInteraction.drug2Id) ||
        (int.drug1Id === newInteraction.drug2Id &&
          int.drug2Id === newInteraction.drug1Id)
    );
  }

  /**
   * Get all interactions for a specific medication
   */
  static getInteractionsForMedication(
    medicamento: Medicamento,
    allMedications: MedicationContext[]
  ): DrugInteractionDetail[] {
    return allMedications
      .filter((m) => m.medication?.id !== medicamento.id)
      .map((m) => {
        if (!m.medication) return null;
        return this.getInteraction(medicamento, m.medication);
      })
      .filter((int): int is DrugInteractionDetail => int !== null);
  }

  /**
   * Filter interactions by severity
   */
  static filterBySeverity(
    interactions: DrugInteractionDetail[],
    severity: GravidadeInteracao | GravidadeInteracao[]
  ): DrugInteractionDetail[] {
    const severities = Array.isArray(severity) ? severity : [severity];
    return interactions.filter((int) => severities.includes(int.severity));
  }

  /**
   * Get critical/severe interactions only
   */
  static getCriticalInteractions(
    interactions: DrugInteractionDetail[]
  ): DrugInteractionDetail[] {
    return this.filterBySeverity(interactions, ['grave', 'contraindicada']);
  }
}

// =============================================================================
// INTERACTION ALERT GENERATION
// =============================================================================

/**
 * Generate clinical alerts from drug interactions
 */
export function generateInteractionAlerts(
  interactions: DrugInteractionDetail[]
): InteractionAlert[] {
  return interactions.map((interaction, index) => {
    const severity = mapInteractionSeverity(interaction.severity);
    const alert = createInteractionAlert(interaction, severity, index);

    return {
      id: `interaction-alert-${interaction.drug1Id}-${interaction.drug2Id}-${index}`,
      severity,
      interaction,
      alert,
    };
  });
}

/**
 * Map drug interaction severity to alert severity
 */
function mapInteractionSeverity(gravidade: GravidadeInteracao): 'critical' | 'warning' | 'info' {
  switch (gravidade) {
    case 'contraindicada':
      return 'critical';
    case 'grave':
      return 'critical';
    case 'moderada':
      return 'warning';
    case 'leve':
      return 'info';
    default:
      return 'info';
  }
}

/**
 * Create clinical alert from interaction
 */
function createInteractionAlert(
  interaction: DrugInteractionDetail,
  severity: 'critical' | 'warning' | 'info',
  index: number
): ClinicalAlert {
  const severityLabel = {
    critical: 'CONTRAINDICATED',
    warning: 'SIGNIFICANT',
    info: 'MINOR',
  }[severity];

  return {
    id: `drug-interaction-${index}-${Date.now()}`,
    severity,
    title: `${severityLabel} Drug Interaction: ${interaction.drug1} + ${interaction.drug2}`,
    message: `${interaction.efeito}. Mechanism: ${interaction.mecanismo || 'Not specified'}.`,
    action: `Action: ${interaction.conduta}. ${generateMonitoringRecommendation(interaction)}`,
    dismissible: severity !== 'critical',
  };
}

/**
 * Generate monitoring recommendation text
 */
function generateMonitoringRecommendation(interaction: DrugInteractionDetail): string {
  if (!interaction.monitoramento || interaction.monitoramento.length === 0) {
    return 'Monitor patient for adverse effects.';
  }

  return `Monitor: ${interaction.monitoramento.join(', ')}.`;
}

/**
 * Get interaction management recommendations
 */
export function getInteractionManagementOptions(
  interaction: DrugInteractionDetail
): InteractionManagement {
  const management: InteractionManagement = {
    avoidCombination: interaction.severity === 'contraindicada',
    monitoringRequired: interaction.severity !== 'leve',
    doseAdjustment: false,
    timingSpacing: false,
    monitoring: interaction.monitoramento || [],
    alternatives: interaction.alternatives || [],
    conduta: interaction.conduta,
  };

  // Add specific recommendations based on mechanism
  if (interaction.mecanismo?.toLowerCase().includes('cyp')) {
    management.doseAdjustment = true;
    management.conduta = 'Reduce dose of substrate drug or increase monitoring';
  }

  if (interaction.mecanismo?.toLowerCase().includes('absorption')) {
    management.timingSpacing = true;
    management.conduta =
      'Space administration by 2-4 hours or adjust dosing schedule';
  }

  return management;
}

export interface InteractionManagement {
  avoidCombination: boolean;
  monitoringRequired: boolean;
  doseAdjustment: boolean;
  timingSpacing: boolean;
  monitoring: string[];
  alternatives: string[];
  conduta: string;
}

/**
 * Check for specific known dangerous combinations
 */
export const DANGEROUS_COMBINATIONS: Array<{
  drugs: string[];
  reason: string;
  recommendation: string;
}> = [
  {
    drugs: ['warfarin', 'aspirin'],
    reason: 'Increased bleeding risk',
    recommendation: 'Use alternative antiplatelet agent or separate indications',
  },
  {
    drugs: ['methotrexate', 'nsaid'],
    reason: 'Increased methotrexate toxicity',
    recommendation: 'Use acetaminophen instead or monitor MTX levels closely',
  },
  {
    drugs: ['lisinopril', 'potassium'],
    reason: 'Severe hyperkalemia risk',
    recommendation: 'Monitor potassium levels regularly or adjust dosing',
  },
  {
    drugs: ['simvastatin', 'clarithromycin'],
    reason: 'Increased statin levels, myopathy risk',
    recommendation: 'Use pravastatin or rosuvastatin instead, or switch antibiotic',
  },
  {
    drugs: ['digoxin', 'quinidine'],
    reason: 'Increased digoxin levels, toxicity',
    recommendation: 'Monitor digoxin levels closely or use alternative antiarrhythmic',
  },
];

/**
 * Check for dangerous drug combinations
 */
export function checkDangerousCombinations(
  medications: MedicationContext[]
): DrugInteractionDetail[] {
  const dangerous: DrugInteractionDetail[] = [];

  const medNames = medications.map(
    (m) => m.medication?.nomeGenerico.toLowerCase() || ''
  );

  for (const combo of DANGEROUS_COMBINATIONS) {
    const hasAllDrugs = combo.drugs.every((drug) =>
      medNames.some((name) => name.includes(drug.toLowerCase()))
    );

    if (hasAllDrugs) {
      dangerous.push({
        drug1: combo.drugs[0],
        drug1Id: '',
        drug2: combo.drugs[1],
        drug2Id: '',
        severity: 'grave',
        efeito: combo.reason,
        conduta: combo.recommendation,
        evidence: 'Micromedex/UpToDate Critical Interaction Database',
      });
    }
  }

  return dangerous;
}

/**
 * Generate interaction report
 */
export interface InteractionReport {
  timestamp: Date;
  totalInteractions: number;
  critical: number;
  warnings: number;
  info: number;
  interactions: InteractionAlert[];
  summary: string;
}

export function generateInteractionReport(
  medications: MedicationContext[]
): InteractionReport {
  // Find all interactions
  const allInteractions = DrugInteractionDetector.findInteractions(medications);

  // Generate alerts
  const alerts = generateInteractionAlerts(allInteractions);

  // Count by severity
  const critical = alerts.filter((a) => a.severity === 'critical').length;
  const warnings = alerts.filter((a) => a.severity === 'warning').length;
  const info = alerts.filter((a) => a.severity === 'info').length;

  // Generate summary
  let summary = `Drug interaction check completed. Total interactions: ${allInteractions.length}. `;
  if (critical > 0) {
    summary += `⚠️ ${critical} critical interaction(s) detected. `;
  }
  if (warnings > 0) {
    summary += `${warnings} warning(s). `;
  }
  summary += 'Review each interaction carefully.';

  return {
    timestamp: new Date(),
    totalInteractions: allInteractions.length,
    critical,
    warnings,
    info,
    interactions: alerts,
    summary,
  };
}

/**
 * Export interaction data for clinical reference
 */
export function exportInteractionData(
  interactions: DrugInteractionDetail[],
  format: 'json' | 'csv' | 'pdf' = 'json'
): string {
  if (format === 'json') {
    return JSON.stringify(interactions, null, 2);
  }

  if (format === 'csv') {
    const headers = [
      'Drug 1',
      'Drug 2',
      'Severity',
      'Effect',
      'Mechanism',
      'Recommendation',
    ];
    const rows = interactions.map((int) => [
      int.drug1,
      int.drug2,
      int.severity,
      int.efeito,
      int.mecanismo || '',
      int.conduta,
    ]);

    const csv =
      headers.join(',') +
      '\n' +
      rows.map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');

    return csv;
  }

  // PDF format not implemented (would require pdf-lib)
  return JSON.stringify(interactions, null, 2);
}
