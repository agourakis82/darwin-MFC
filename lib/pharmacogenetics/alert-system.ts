/**
 * Pharmacogenetics Alert System
 * Provides medication safety alerts based on genetic profile
 */

import { getPharmGKBClient } from './pharmgkb-client';
import type { 
  PharmGKBVariant, 
  ClinicalAnnotation, 
  DosingGuideline,
  DrugInteraction 
} from './pharmgkb-client';
import type { Medicamento } from '@/lib/types/medicamento';

// ============================================================================
// TYPES
// ============================================================================

export interface PatientGeneticProfile {
  patientId: string;
  variants: GeneticVariant[];
  lastUpdated: Date;
}

export interface GeneticVariant {
  gene: string;
  variantId: string;
  variant: string;
  phenotype: string;
  labResult?: string;
  dateTested: Date;
}

export interface PharmacogeneticsAlert {
  id: string;
  medicationId?: string;
  severity: 'critical' | 'warning' | 'info';
  gene: string;
  variant: string;
  phenotype: string;
  recommendation: string;
  alternativeDrugs: string[];
  evidenceLevel: string;
  references?: string[];
  dismissed: boolean;
  createdAt: Date;
}

export interface DosingRecommendation {
  medicationId: string;
  medicationName: string;
  recommendation: string;
  explanation: string;
  alternativeDrugs: string[];
  evidenceLevel: string;
  requiresAdjustment: boolean;
}

export interface MedicationSafetyCheck {
  medicationId: string;
  medicationName: string;
  hasPharmacogeneticsData: boolean;
  alerts: PharmacogeneticsAlert[];
  dosingRecommendation?: DosingRecommendation;
  overallRisk: 'critical' | 'high' | 'moderate' | 'low' | 'none';
}

// ============================================================================
// PHARMACOGENETICS ALERT SYSTEM
// ============================================================================

export class PharmacogeneticsAlertSystem {
  private pharmgkb = getPharmGKBClient();
  private alertCache: Map<string, PharmacogeneticsAlert> = new Map();

  /**
   * Check medication safety for a patient's genetic profile
   */
  async checkMedicationSafety(
    medication: Medicamento,
    patientGenetics: PatientGeneticProfile
  ): Promise<MedicationSafetyCheck> {
    const alerts: PharmacogeneticsAlert[] = [];
    const relevantGenes = this.getRelevantGenesForMedication(medication);

    for (const gene of relevantGenes) {
      const patientVariant = patientGenetics.variants.find(
        v => v.gene === gene
      );

      if (!patientVariant) {
        continue;
      }

      // Get PharmGKB data for this variant
      try {
        const variantInfo = await this.pharmgkb.getVariantInfo(patientVariant.variantId);
        
        // Generate alerts from clinical annotations
        const geneAlerts = this.generateAlertsFromAnnotation(
          variantInfo,
          medication,
          patientVariant
        );
        
        alerts.push(...geneAlerts);
      } catch (error) {
        console.error(`Failed to get PharmGKB data for variant ${patientVariant.variantId}:`, error);
      }
    }

    // Get dosing recommendation
    let dosingRecommendation: DosingRecommendation | undefined;
    if (alerts.length > 0) {
      dosingRecommendation = await this.getDosingRecommendation(
        medication,
        patientGenetics
      );
    }

    return {
      medicationId: medication.id,
      medicationName: medication.nomeGenerico,
      hasPharmacogeneticsData: relevantGenes.length > 0,
      alerts,
      dosingRecommendation,
      overallRisk: this.calculateOverallRisk(alerts)
    };
  }

  /**
   * Check multiple medications for a patient
   */
  async checkMultipleMedications(
    medications: Medicamento[],
    patientGenetics: PatientGeneticProfile
  ): Promise<MedicationSafetyCheck[]> {
    const results = await Promise.all(
      medications.map(med => 
        this.checkMedicationSafety(med, patientGenetics)
      )
    );

    // Check for drug-drug interactions that may be exacerbated by genetics
    const interactionAlerts = await this.checkGeneticDrugInteractions(
      medications,
      patientGenetics
    );

    // Add interaction alerts to results
    interactionAlerts.forEach(alert => {
      const medResult = results.find(r => r.medicationId === alert.medicationId);
      if (medResult) {
        medResult.alerts.push(alert);
      }
    });

    return results;
  }

  /**
   * Get dosing recommendation for a medication
   */
  async getDosingRecommendation(
    medication: Medicamento,
    patientGenetics: PatientGeneticProfile
  ): Promise<DosingRecommendation> {
    const relevantGenes = this.getRelevantGenesForMedication(medication);
    const recommendations: DosingRecommendation[] = [];

    for (const gene of relevantGenes) {
      const patientVariant = patientGenetics.variants.find(
        v => v.gene === gene
      );

      if (!patientVariant) {
        continue;
      }

      try {
        const guidelines = await this.pharmgkb.getDrugGuidelines(medication.id);
        
        // Find guideline for patient's phenotype
        const relevantGuideline = guidelines.find(
          g => g.gene === gene && 
               this.matchesPhenotype(g.phenotype, patientVariant.phenotype)
        );

        if (relevantGuideline) {
          recommendations.push({
            medicationId: medication.id,
            medicationName: medication.nomeGenerico,
            recommendation: relevantGuideline.recommendation,
            explanation: `Based on ${gene} genotype (${patientVariant.phenotype})`,
            alternativeDrugs: relevantGuideline.alternativeDrugs,
            evidenceLevel: relevantGuideline.evidenceLevel,
            requiresAdjustment: true
          });
        }
      } catch (error) {
        console.error(`Failed to get dosing guidelines for ${medication.id}:`, error);
      }
    }

    // Return most critical recommendation
    if (recommendations.length === 0) {
      return {
        medicationId: medication.id,
        medicationName: medication.nomeGenerico,
        recommendation: 'Standard dosing',
        explanation: 'No pharmacogenetic guidelines available',
        alternativeDrugs: [],
        evidenceLevel: 'N/A',
        requiresAdjustment: false
      };
    }

    // Sort by severity (critical > warning > info)
    const severityOrder = { critical: 0, warning: 1, info: 2 };
    recommendations.sort((a, b) => 
      severityOrder[a.requiresAdjustment ? 'warning' : 'info'] - 
      severityOrder[b.requiresAdjustment ? 'warning' : 'info']
    );

    return recommendations[0];
  }

  /**
   * Check for drug interactions that may be exacerbated by genetics
   */
  private async checkGeneticDrugInteractions(
    medications: Medicamento[],
    patientGenetics: PatientGeneticProfile
  ): Promise<PharmacogeneticsAlert[]> {
    const alerts: PharmacogeneticsAlert[] = [];

    // Get interactions from PharmGKB
    for (const medication of medications) {
      try {
        const interactions = await this.pharmgkb.getDrugInteractions(medication.id);
        
        for (const interaction of interactions) {
          // Check if this interaction is exacerbated by patient's genetics
          const geneticExacerbation = await this.checkGeneticExacerbation(
            interaction,
            patientGenetics
          );

          if (geneticExacerbation) {
            alerts.push({
              id: `interaction-${medication.id}-${interaction.drug2Id}`,
              severity: this.mapInteractionSeverity(interaction.severity),
              gene: geneticExacerbation.gene,
              variant: geneticExacerbation.variant,
              phenotype: geneticExacerbation.phenotype,
              recommendation: interaction.recommendation,
              alternativeDrugs: [],
              evidenceLevel: interaction.evidenceLevel,
              references: [],
              dismissed: false,
              createdAt: new Date()
            });
          }
        }
      } catch (error) {
        console.error(`Failed to get interactions for ${medication.id}:`, error);
      }
    }

    return alerts;
  }

  /**
   * Check if an interaction is exacerbated by patient's genetics
   */
  private async checkGeneticExacerbation(
    interaction: DrugInteraction,
    patientGenetics: PatientGeneticProfile
  ): Promise<{ gene: string; variant: string; phenotype: string } | null> {
    // This would require PharmGKB API to check for genetic exacerbations
    // For now, return null (no exacerbation detected)
    // In production, implement actual check
    return null;
  }

  /**
   * Get relevant genes for a medication
   */
  private getRelevantGenesForMedication(medication: Medicamento): string[] {
    // Map medication classes to relevant genes
    const geneMap: Record<string, string[]> = {
      'ssri': ['CYP2D6', 'CYP2C19', 'SERT1A'],
      'opioid': ['CYP2D6', 'CYP3A4', 'OPRM1'],
      'anticoagulante': ['CYP2C9', 'VKORC1', 'CYP4F2'],
      'antidepressant': ['CYP2D6', 'CYP2C19', 'CYP3A4', 'DRD2'],
      'antipsychotic': ['CYP2D6', 'CYP3A4', 'DRD2'],
      'statin': ['SLCO1B1', 'CYP3A4', 'ABCG2'],
      'ace-inhibitor': ['CYP3A5', 'ACE'],
      'antihypertensive': ['CYP2D6', 'CYP2C9', 'AGTR1'],
      'beta-blocker': ['CYP2D6', 'ADRB1'],
      'antibiotico': ['CYP2C9', 'CYP2C19', 'SLCO1B1'],
      'antidiabetico': ['CYP2C9', 'SLCO1B1', 'KCNJ11']
    };

    // Get medication class from medication data
    const drugClass = this.getMedicationClass(medication);
    
    return geneMap[drugClass.toLowerCase()] || [];
  }

  /**
   * Get medication class from medication data
   */
  private getMedicationClass(medication: Medicamento): string {
    // Extract class from medication data
    // This would be more sophisticated in production
    if (medication.classeTerapeutica) {
      return medication.classeTerapeutica;
    }
    
    // Fallback: infer from name
    const name = medication.nomeGenerico.toLowerCase();
    
    if (name.includes('fluoxetine') || name.includes('sertralina') || name.includes('paroxetine')) {
      return 'ssri';
    }
    if (name.includes('morfina') || name.includes('codeina') || name.includes('tramadol')) {
      return 'opioid';
    }
    if (name.includes('varfarina') || name.includes('acenocumarol')) {
      return 'anticoagulante';
    }
    if (name.includes('amitriptilina') || name.includes('nortriptilina')) {
      return 'antidepressant';
    }
    if (name.includes('haloperidol') || name.includes('risperidona')) {
      return 'antipsicotico';
    }
    if (name.includes('simvastatina') || name.includes('atorvastatina')) {
      return 'estatina';
    }
    if (name.includes('lisinopril') || name.includes('enalapril')) {
      return 'ace-inhibitor';
    }
    if (name.includes('metoprolol') || name.includes('propranolol')) {
      return 'beta-blocker';
    }
    
    return 'other';
  }

  /**
   * Generate alerts from PharmGKB clinical annotation
   */
  private generateAlertsFromAnnotation(
    variantInfo: PharmGKBVariant,
    medication: Medicamento,
    patientVariant: GeneticVariant
  ): PharmacogeneticsAlert[] {
    const alerts: PharmacogeneticsAlert[] = [];
    const annotation = variantInfo.clinicalAnnotation;

    // Check if annotation should trigger alert
    if (!this.shouldAlert(annotation)) {
      return alerts;
    }

    // Create alert
    alerts.push({
      id: `alert-${medication.id}-${variantInfo.variantId}`,
      severity: this.getSeverityFromAnnotation(annotation),
      gene: variantInfo.gene,
      variant: variantInfo.variant,
      phenotype: patientVariant.phenotype,
      recommendation: annotation.recommendation || 
        `Consider alternative medication due to ${variantInfo.gene} ${patientVariant.phenotype} phenotype`,
      alternativeDrugs: this.getAlternativeDrugs(variantInfo.dosingGuidelines),
      evidenceLevel: annotation.level,
      references: this.extractReferences(annotation),
      dismissed: false,
      createdAt: new Date()
    });

    return alerts;
  }

  /**
   * Check if annotation should trigger alert
   */
  private shouldAlert(annotation: ClinicalAnnotation): boolean {
    // Alert for levels 1A, 1B, 2A
    return ['1A', '1B', '2A'].includes(annotation.level);
  }

  /**
   * Get severity from annotation level
   */
  private getSeverityFromAnnotation(annotation: ClinicalAnnotation): 'critical' | 'warning' | 'info' {
    if (['1A', '1B'].includes(annotation.level)) {
      return 'critical';
    }
    if (['2A', '2B'].includes(annotation.level)) {
      return 'warning';
    }
    return 'info';
  }

  /**
   * Map interaction severity
   */
  private mapInteractionSeverity(severity: string): 'critical' | 'warning' | 'info' {
    if (severity === 'contraindicated') {
      return 'critical';
    }
    if (severity === 'major') {
      return 'warning';
    }
    return 'info';
  }

  /**
   * Get alternative drugs from dosing guidelines
   */
  private getAlternativeDrugs(guidelines: DosingGuideline[]): string[] {
    const alternatives = new Set<string>();
    
    for (const guideline of guidelines) {
      guideline.alternativeDrugs.forEach(drug => alternatives.add(drug));
    }
    
    return Array.from(alternatives);
  }

  /**
   * Extract references from annotation
   */
  private extractReferences(annotation: ClinicalAnnotation): string[] {
    // In production, parse actual references from annotation
    // For now, return empty array
    return [];
  }

  /**
   * Check if phenotype matches
   */
  private matchesPhenotype(guidelinePhenotype: string, patientPhenotype: string): boolean {
    // Simple string matching - in production, use more sophisticated matching
    return guidelinePhenotype.toLowerCase() === patientPhenotype.toLowerCase();
  }

  /**
   * Calculate overall risk from alerts
   */
  private calculateOverallRisk(alerts: PharmacogeneticsAlert[]): 'critical' | 'high' | 'moderate' | 'low' | 'none' {
    if (alerts.length === 0) {
      return 'none';
    }

    const hasCritical = alerts.some(a => a.severity === 'critical');
    const hasWarning = alerts.some(a => a.severity === 'warning');

    if (hasCritical) {
      return 'critical';
    }
    if (hasWarning) {
      return 'high';
    }
    if (alerts.length > 1) {
      return 'moderate';
    }
    return 'low';
  }

  /**
   * Dismiss an alert
   */
  dismissAlert(alertId: string): void {
    const alert = this.alertCache.get(alertId);
    if (alert) {
      alert.dismissed = true;
    }
  }

  /**
   * Clear all alerts
   */
  clearAlerts(): void {
    this.alertCache.clear();
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

let alertSystemInstance: PharmacogeneticsAlertSystem | null = null;

export function getPharmacogeneticsAlertSystem(): PharmacogeneticsAlertSystem {
  if (!alertSystemInstance) {
    alertSystemInstance = new PharmacogeneticsAlertSystem();
  }
  return alertSystemInstance;
}
