/**
 * CLINICAL CONSISTENCY CHECKER - DARWIN-MFC
 * ==========================================
 *
 * Validates internal consistency of clinical data:
 * - Diagnosis ↔ Prescribed medications alignment
 * - Missing follow-up for chronic conditions
 * - Conflicting medications
 * - Therapy appropriateness
 * - Incomplete treatment protocols
 *
 * Returns findings as structured alerts.
 */

import { ClinicalContext } from './alert-rules';
import { ClinicalAlert } from '@/lib/clinical-decision-support/alerts/clinical-alerts';

// =============================================================================
// TYPES
// =============================================================================

export interface ConsistencyIssue {
  id: string;
  type:
    | 'diagnosis-medication-mismatch'
    | 'missing-chronic-management'
    | 'conflicting-medications'
    | 'incomplete-treatment'
    | 'drug-disease-interaction'
    | 'missing-follow-up';
  severity: 'critical' | 'warning' | 'info';
  diagnosis?: string;
  medications?: string[];
  description: string;
  recommendation: string;
}

export interface ConsistencyReport {
  contextId: string;
  timestamp: Date;
  issues: ConsistencyIssue[];
  overallScore: number; // 0-100, higher is more consistent
  recommendations: string[];
}

// =============================================================================
// CONSISTENCY CHECKER CLASS
// =============================================================================

export class ClinicalConsistencyChecker {
  /**
   * Analyze clinical context for consistency issues
   */
  static analyze(context: ClinicalContext): ConsistencyReport {
    const issues: ConsistencyIssue[] = [];

    // Check diagnosis-medication alignment
    issues.push(...this.checkDiagnosisMedicationAlignment(context));

    // Check chronic disease management
    issues.push(...this.checkChronicDiseaseManagement(context));

    // Check for conflicting medications
    issues.push(...this.checkConflictingMedications(context));

    // Check for drug-disease interactions
    issues.push(...this.checkDrugDiseaseInteractions(context));

    // Check treatment completeness
    issues.push(...this.checkTreatmentCompleteness(context));

    // Calculate consistency score
    const score = this.calculateConsistencyScore(context, issues);

    // Generate recommendations
    const recommendations = this.generateRecommendations(issues);

    return {
      contextId: `consistency-${Date.now()}`,
      timestamp: new Date(),
      issues,
      overallScore: score,
      recommendations,
    };
  }

  /**
   * Check if prescribed medications align with diagnoses
   */
  private static checkDiagnosisMedicationAlignment(
    context: ClinicalContext
  ): ConsistencyIssue[] {
    const issues: ConsistencyIssue[] = [];

    if (context.diagnoses.length === 0) {
      // Medications without documented diagnosis
      if (context.medications.length > 0) {
        issues.push({
          id: 'diagnosis-medication-mismatch-001',
          type: 'diagnosis-medication-mismatch',
          severity: 'warning',
          medications: context.medications
            .map((m) => m.medication?.nomeGenerico || m.medicationId)
            .slice(0, 3),
          description:
            'Medications prescribed without documented diagnoses or indications',
          recommendation:
            'Document clinical indications for all medications. Use problem-oriented medical record.',
        });
      }
      return issues;
    }

    // Check for cardiovascular drugs without cardiovascular diagnosis
    const cvDrugs = context.medications.filter((med) => {
      const classe = med.medication?.classeTerapeutica.toLowerCase() || '';
      return [
        'anti_hipertensivo',
        'anticoagulante',
        'cardiotonico',
        'hipolipemiante',
      ].some((cv) => classe.includes(cv));
    });

    const hasCVDiagnosis = context.diagnoses.some(
      (d) =>
        d.toLowerCase().includes('hypertension') ||
        d.toLowerCase().includes('heart') ||
        d.toLowerCase().includes('cardiovascular') ||
        d.toLowerCase().includes('coração')
    );

    if (cvDrugs.length > 0 && !hasCVDiagnosis) {
      issues.push({
        id: 'diagnosis-medication-mismatch-cv',
        type: 'diagnosis-medication-mismatch',
        severity: 'info',
        medications: cvDrugs.map((m) => m.medication?.nomeGenerico || m.medicationId),
        description:
          'Cardiovascular medications without documented cardiovascular diagnosis',
        recommendation:
          'Clarify indication for cardiovascular medications. Add diagnosis if appropriate or reconsider therapy.',
      });
    }

    // Check for diabetes medications without diabetes diagnosis
    const diabetesDrugs = context.medications.filter((med) => {
      return med.medication?.classeTerapeutica === 'antidiabetico';
    });

    const hasDiabetes = context.diagnoses.some(
      (d) =>
        d.toLowerCase().includes('diabetes') ||
        d.toLowerCase().includes('glycemic')
    );

    if (diabetesDrugs.length > 0 && !hasDiabetes) {
      issues.push({
        id: 'diagnosis-medication-mismatch-dm',
        type: 'diagnosis-medication-mismatch',
        severity: 'warning',
        medications: diabetesDrugs.map((m) => m.medication?.nomeGenerico || m.medicationId),
        description: 'Antidiabetic medications without documented diabetes diagnosis',
        recommendation:
          'Document diabetes diagnosis or consider if medication is for prediabetes/prevention.',
      });
    }

    return issues;
  }

  /**
   * Check if chronic diseases have appropriate management
   */
  private static checkChronicDiseaseManagement(
    context: ClinicalContext
  ): ConsistencyIssue[] {
    const issues: ConsistencyIssue[] = [];

    const chronicDiseases: Record<string, string[]> = {
      hypertension: ['anti_hipertensivo'],
      diabetes: ['antidiabetico'],
      'heart failure': ['diuretico', 'ieca', 'cardiotonico'],
      'ckd': ['ieca', 'bra'],
      'asthma': ['broncodilatador', 'corticoide_inalatorio'],
    };

    for (const [diagnosis, expectedDrugClasses] of Object.entries(
      chronicDiseases
    )) {
      const hasDiagnosis = context.diagnoses.some((d) =>
        d.toLowerCase().includes(diagnosis)
      );

      if (!hasDiagnosis) continue;

      const hasExpectedTreatment = expectedDrugClasses.some((drugClass) =>
        context.medications.some((med) => {
          const classe = med.medication?.classeTerapeutica.toLowerCase() || '';
          return classe.includes(drugClass);
        })
      );

      if (!hasExpectedTreatment) {
        issues.push({
          id: `missing-chronic-management-${diagnosis}`,
          type: 'missing-chronic-management',
          severity: 'warning',
          diagnosis,
          description: `Patient has ${diagnosis} but no documented evidence-based medication`,
          recommendation: `Consider initiating guideline-recommended therapy for ${diagnosis}. Document reason if intentionally not treated.`,
        });
      }
    }

    return issues;
  }

  /**
   * Check for medications that should not be used together
   */
  private static checkConflictingMedications(
    context: ClinicalContext
  ): ConsistencyIssue[] {
    const issues: ConsistencyIssue[] = [];

    // Define drug conflicts (simplified)
    const conflicts: Array<{
      drugs: string[];
      description: string;
    }> = [
      {
        drugs: ['metformin', 'metoprolol', 'ieca'],
        description: 'ACE inhibitors + metformin increases renal issues risk',
      },
      {
        drugs: ['warfarin', 'aspirin'],
        description: 'Warfarin + Aspirin increases bleeding risk',
      },
      {
        drugs: ['lithio', 'diuretico_tiazidico'],
        description: 'Thiazide diuretics increase lithium levels',
      },
      {
        drugs: ['nsaid', 'ieca'],
        description: 'NSAIDs reduce ACE inhibitor effectiveness, increase renal risk',
      },
    ];

    for (const conflict of conflicts) {
      const presentDrugs = context.medications.filter((med) => {
        const medName = med.medication?.nomeGenerico.toLowerCase() || '';
        const medSubclass = med.medication?.subclasse?.toLowerCase() || '';
        return conflict.drugs.some(
          (drug) =>
            medName.includes(drug) ||
            medSubclass.includes(drug) ||
            drug.includes(medName)
        );
      });

      if (presentDrugs.length >= 2) {
        issues.push({
          id: `conflicting-medications-${conflicts.indexOf(conflict)}`,
          type: 'conflicting-medications',
          severity: 'warning',
          medications: presentDrugs.map((m) => m.medication?.nomeGenerico || m.medicationId),
          description: conflict.description,
          recommendation:
            'Review necessity of combination. Consider alternative therapy or enhanced monitoring.',
        });
      }
    }

    return issues;
  }

  /**
   * Check for drug-disease interactions
   */
  private static checkDrugDiseaseInteractions(
    context: ClinicalContext
  ): ConsistencyIssue[] {
    const issues: ConsistencyIssue[] = [];

    // Drug-disease contraindications
    const drugDiseaseContraindications: Record<string, string[]> = {
      'nsaid': ['ckd', 'heart failure', 'renal impairment', 'asthma'],
      'ace-inhibitor': ['pregnancy', 'angioedema history'],
      'beta-blocker': ['heart block', 'asthma', 'severe bradycardia'],
      'anticoagulant': ['active bleeding', 'thrombocytopenia'],
    };

    for (const [drugClass, contraindications] of Object.entries(
      drugDiseaseContraindications
    )) {
      const hasDrug = context.medications.some((med) => {
        const medName = med.medication?.nomeGenerico.toLowerCase() || '';
        const medSubclass = med.medication?.subclasse?.toLowerCase() || '';
        return medName.includes(drugClass) || medSubclass.includes(drugClass);
      });

      if (!hasDrug) continue;

      const hasContraindication = context.diagnoses.some((diagnosis) =>
        contraindications.some((c) =>
          diagnosis.toLowerCase().includes(c.toLowerCase())
        )
      );

      if (hasContraindication) {
        issues.push({
          id: `drug-disease-interaction-${drugClass}`,
          type: 'drug-disease-interaction',
          severity: 'critical',
          description: `${drugClass} contraindicated in patient with: ${context.diagnoses.find((d) =>
            contraindications.some((c) =>
              d.toLowerCase().includes(c.toLowerCase())
            )
          )}`,
          recommendation: `Review and consider alternative therapy. Consult specialist if necessary.`,
        });
      }
    }

    return issues;
  }

  /**
   * Check if treatments are complete
   */
  private static checkTreatmentCompleteness(
    context: ClinicalContext
  ): ConsistencyIssue[] {
    const issues: ConsistencyIssue[] = [];

    // Check for antibiotic duration (if documented)
    const antibiotics = context.medications.filter(
      (m) => m.medication?.classeTerapeutica === 'antibiotico'
    );

    for (const antibiotic of antibiotics) {
      if (!antibiotic.durationDays) {
        issues.push({
          id: `incomplete-treatment-duration-${antibiotic.medicationId}`,
          type: 'incomplete-treatment',
          severity: 'info',
          medications: [antibiotic.medication?.nomeGenerico || antibiotic.medicationId],
          description: `Antibiotic therapy duration not documented`,
          recommendation: `Document planned treatment duration and completion date. Verify appropriate duration for indication.`,
        });
      } else if (antibiotic.durationDays < 5 || antibiotic.durationDays > 30) {
        issues.push({
          id: `incomplete-treatment-duration-abnormal-${antibiotic.medicationId}`,
          type: 'incomplete-treatment',
          severity: 'warning',
          medications: [antibiotic.medication?.nomeGenerico || antibiotic.medicationId],
          description: `Unusual antibiotic duration: ${antibiotic.durationDays} days`,
          recommendation: `Verify antibiotic duration is appropriate for indication. Typical range 5-14 days.`,
        });
      }
    }

    return issues;
  }

  /**
   * Calculate overall consistency score
   */
  private static calculateConsistencyScore(
    context: ClinicalContext,
    issues: ConsistencyIssue[]
  ): number {
    let score = 100;

    // Deduct points for critical issues
    score -= issues.filter((i) => i.severity === 'critical').length * 15;

    // Deduct points for warnings
    score -= issues.filter((i) => i.severity === 'warning').length * 7;

    // Deduct points for info
    score -= issues.filter((i) => i.severity === 'info').length * 2;

    // Bonus for complete documentation
    if (context.diagnoses.length > 0) score += 5;
    if (context.labs && Object.keys(context.labs).length > 0) score += 5;
    if (context.vitals) score += 3;

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Generate actionable recommendations
   */
  private static generateRecommendations(issues: ConsistencyIssue[]): string[] {
    const recommendations: string[] = [];

    const criticalIssues = issues.filter((i) => i.severity === 'critical');
    const warningIssues = issues.filter((i) => i.severity === 'warning');

    if (criticalIssues.length > 0) {
      recommendations.push(
        `URGENT: ${criticalIssues.length} critical inconsistencies detected. Review immediately.`
      );
    }

    if (warningIssues.length > 0) {
      recommendations.push(
        `Review ${warningIssues.length} potential issues with current therapy.`
      );
    }

    // Add specific recommendations from issues
    for (const issue of issues.slice(0, 3)) {
      recommendations.push(`• ${issue.recommendation}`);
    }

    if (issues.length === 0) {
      recommendations.push(
        'Clinical data is internally consistent. Continue with current management.'
      );
    }

    return recommendations;
  }
}

/**
 * Convert consistency report to clinical alerts
 */
export function convertConsistencyToAlerts(
  report: ConsistencyReport
): ClinicalAlert[] {
  return report.issues.map((issue) => ({
    id: issue.id,
    severity: issue.severity,
    title: issue.description,
    message: issue.recommendation,
    action: `Review and address: ${issue.description}`,
    dismissible: issue.severity !== 'critical',
  }));
}

/**
 * Check consistency of clinical context
 */
export function checkConsistency(context: ClinicalContext): ConsistencyReport {
  return ClinicalConsistencyChecker.analyze(context);
}

/**
 * Get summary of consistency issues by type
 */
export function getConsistencyIssueSummary(
  report: ConsistencyReport
): Record<string, number> {
  const summary: Record<string, number> = {};

  for (const issue of report.issues) {
    summary[issue.type] = (summary[issue.type] || 0) + 1;
  }

  return summary;
}
