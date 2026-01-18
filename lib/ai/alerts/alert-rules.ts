/**
 * CLINICAL ALERT RULES - DARWIN-MFC
 * ==================================
 *
 * Rule-based alert generation system for clinical decision support.
 * Implements rules for drug interactions, red flags, contraindications,
 * missing exams, and dosage concerns.
 *
 * Alert Severity:
 * - critical: Immediate action required, potential harm
 * - warning: Important, should be addressed
 * - info: Informational, helpful but not urgent
 *
 * Alert Category:
 * - drug-interaction: Drug-drug interactions
 * - contraindication: Absolute or relative contraindications
 * - red-flag: Clinical red flags in presentation
 * - missing-exam: Required exams not documented
 * - dosage: Dosage adjustment needed
 * - monitoring: Required monitoring recommendations
 * - allergy: Allergy warnings
 */

import { Medicamento } from '@/lib/types/medicamento';

// =============================================================================
// TYPES
// =============================================================================

export type AlertSeverity = 'critical' | 'warning' | 'info';

export type AlertCategory =
  | 'drug-interaction'
  | 'contraindication'
  | 'red-flag'
  | 'missing-exam'
  | 'dosage'
  | 'monitoring'
  | 'allergy';

/**
 * Clinical context for alert evaluation
 */
export interface ClinicalContext {
  // Patient demographics
  age: number;
  sex?: 'M' | 'F';
  weight?: number; // kg
  height?: number; // cm

  // Clinical data
  diagnoses: string[];
  symptoms: string[];
  medications: MedicationContext[];
  allergies: string[];

  // Lab values (if available)
  vitals?: {
    systolicBP?: number;
    diastolicBP?: number;
    heartRate?: number;
    temperature?: number;
    respiratoryRate?: number;
  };

  labs?: {
    tfg?: number; // eGFR (mL/min/1.73m²)
    creatinine?: number;
    inr?: number;
    hemoglobin?: number;
    potassium?: number;
    glucose?: number;
    ast?: number;
    alt?: number;
    [key: string]: number | undefined;
  };

  // Special populations
  isPregnant?: boolean;
  isBreastfeeding?: boolean;
  isElderly?: boolean; // age >= 65
}

/**
 * Context for a medication in use
 */
export interface MedicationContext {
  medicationId: string;
  medication?: Medicamento;
  dose?: string;
  frequency?: string;
  durationDays?: number;
  startDate?: string;
  indication?: string;
}

/**
 * Alert rule definition
 */
export interface AlertRule {
  /** Unique identifier for the rule */
  id: string;

  /** Human-readable rule name */
  name: string;

  /** Alert severity level */
  severity: AlertSeverity;

  /** Alert category */
  category: AlertCategory;

  /** Condition function to evaluate if alert should trigger */
  condition: (context: ClinicalContext) => boolean;

  /** Message generator function */
  message: (context: ClinicalContext) => string;

  /** Optional action/recommendation */
  action?: (context: ClinicalContext) => string;

  /** Evidence or citation */
  evidence?: string;

  /** Whether this rule should be applied */
  enabled?: boolean;
}

// =============================================================================
// PREDEFINED ALERT RULES
// =============================================================================

/**
 * Rule: Dosage adjustment needed for renal impairment
 */
export const renalDosageAdjustmentRule: AlertRule = {
  id: 'renal-dosage-adjustment',
  name: 'Renal Function-Based Dosage Adjustment',
  severity: 'warning',
  category: 'dosage',
  condition: (context) => {
    if (!context.labs?.tfg) return false;

    return context.medications.some((med) => {
      if (!med.medication?.ajusteDoseRenal || med.medication.ajusteDoseRenal.length === 0) {
        return false;
      }

      // Check if medication needs dose adjustment for current renal function
      return context.labs!.tfg! < 30; // Critical cutoff
    });
  },
  message: (context) => {
    const tfg = context.labs?.tfg || 0;
    const meds = context.medications
      .filter((m) => m.medication?.ajusteDoseRenal && m.medication.ajusteDoseRenal.length > 0)
      .map((m) => m.medication?.nomeGenerico || m.medicationId)
      .join(', ');

    return `Renal impairment detected (eGFR: ${tfg.toFixed(1)} mL/min). Dose adjustment may be needed for: ${meds}`;
  },
  action: (context) => {
    return `Review medication doses: ${context.medications
      .filter((m) => m.medication?.ajusteDoseRenal)
      .map((m) => m.medication?.nomeGenerico)
      .join(', ')}. Consider consulting renal dosing guidelines.`;
  },
  evidence: 'KDIGO, UpToDate Renal Dosing',
};

/**
 * Rule: Red flag symptoms requiring urgent evaluation
 */
export const redFlagSymptomsRule: AlertRule = {
  id: 'red-flag-symptoms',
  name: 'Red Flag Symptoms Detected',
  severity: 'critical',
  category: 'red-flag',
  condition: (context) => {
    const redFlagCombos = [
      { symptoms: ['chest pain', 'dyspnea'], flag: 'acute coronary syndrome' },
      { symptoms: ['sudden headache', 'stiff neck'], flag: 'meningitis' },
      { symptoms: ['severe abdominal pain', 'vomiting'], flag: 'acute abdomen' },
      { symptoms: ['confusion', 'fever'], flag: 'infection/sepsis' },
      { symptoms: ['loss of consciousness'], flag: 'altered mental status' },
    ];

    const lowerSymptoms = context.symptoms.map((s) => s.toLowerCase());

    return redFlagCombos.some((combo) => {
      const comboSymptoms = combo.symptoms.map((s) => s.toLowerCase());
      return comboSymptoms.every((symptom) =>
        lowerSymptoms.some((s) => s.includes(symptom))
      );
    });
  },
  message: (context) => {
    return `CRITICAL: Red flag symptom combination detected: ${context.symptoms.join(', ')}. Immediate evaluation required.`;
  },
  action: (context) => {
    return 'Perform immediate clinical assessment. Consider emergency referral if indicated.';
  },
  evidence: 'Clinical Guidelines - Emergency Triage',
};

/**
 * Rule: Absolute contraindication to medication
 */
export const absoluteContraindicationRule: AlertRule = {
  id: 'absolute-contraindication',
  name: 'Absolute Contraindication Present',
  severity: 'critical',
  category: 'contraindication',
  condition: (context) => {
    return context.medications.some((med) => {
      if (!med.medication?.contraindicacoes || med.medication.contraindicacoes.length === 0) {
        return false;
      }

      // Check for allergy contraindication
      if (context.allergies.length > 0) {
        const medName = med.medication.nomeGenerico.toLowerCase();
        return context.allergies.some((allergy) => {
          const allergyLower = allergy.toLowerCase();
          return (
            allergyLower.includes(medName) ||
            medName.includes(allergyLower)
          );
        });
      }

      return false;
    });
  },
  message: (context) => {
    const contraindMeds = context.medications
      .filter((med) => {
        const medName = med.medication?.nomeGenerico.toLowerCase();
        return context.allergies.some((allergy) =>
          allergy.toLowerCase().includes(medName || '')
        );
      })
      .map((m) => m.medication?.nomeGenerico)
      .join(', ');

    return `CONTRAINDICATION: Patient has documented allergy to: ${contraindMeds}`;
  },
  action: () => {
    return 'DISCONTINUE medication immediately. Choose alternative therapy.';
  },
  evidence: 'Patient Safety - Allergy Documentation',
};

/**
 * Rule: Dosage abnormally high or low
 */
export const abnormalDosageRule: AlertRule = {
  id: 'abnormal-dosage',
  name: 'Abnormal Medication Dosage',
  severity: 'warning',
  category: 'dosage',
  condition: (context) => {
    return context.medications.some((med) => {
      if (!med.dose || !med.medication?.posologias) return false;

      // Parse dose string (simplistic approach)
      const doseMatch = med.dose.match(/(\d+)\s*mg/i);
      if (!doseMatch) return false;

      const doseValue = parseInt(doseMatch[1]);

      // Check if dose exceeds maximum in any posology
      return med.medication.posologias.some((pos) => {
        const maxMatch = pos.adultos.doseMaxima?.match(/(\d+)\s*g/i);
        if (!maxMatch) return false;

        const maxValue = parseInt(maxMatch[1]) * 1000; // Convert g to mg
        return doseValue > maxValue;
      });
    });
  },
  message: (context) => {
    const abnormalMeds = context.medications
      .filter((m) => {
        if (!m.dose || !m.medication?.posologias) return false;
        const doseMatch = m.dose.match(/(\d+)\s*mg/i);
        return doseMatch && m.medication.posologias.some((pos) => {
          const maxMatch = pos.adultos.doseMaxima?.match(/(\d+)\s*g/i);
          return maxMatch && parseInt(doseMatch[1]) > parseInt(maxMatch[1]) * 1000;
        });
      })
      .map((m) => `${m.medication?.nomeGenerico} (${m.dose})`)
      .join(', ');

    return `Abnormal dosage detected: ${abnormalMeds}`;
  },
  action: () => {
    return 'Verify dosage against current medication guidelines and prescriber intent.';
  },
  evidence: 'Medication Safety - Dosage Review',
};

/**
 * Rule: Elderly patient (65+) with high-risk medications
 */
export const elderlyHighRiskMedicationRule: AlertRule = {
  id: 'elderly-high-risk-medication',
  name: 'Elderly Patient with High-Risk Medication',
  severity: 'warning',
  category: 'monitoring',
  condition: (context) => {
    if (!context.isElderly && context.age < 65) return false;

    const highRiskClasses = [
      'benzodiazepínico',
      'anticholinergico',
      'nsaid',
      'anticoagulante',
    ];

    return context.medications.some((med) => {
      const subclasse = med.medication?.subclasse?.toLowerCase() || '';
      const classe = med.medication?.classeTerapeutica.toLowerCase() || '';

      return highRiskClasses.some((risk) =>
        subclasse.includes(risk) || classe.includes(risk)
      );
    });
  },
  message: (context) => {
    const highRiskMeds = context.medications
      .filter((m) => {
        const highRiskClasses = ['benzodiazepínico', 'anticholinergico', 'nsaid', 'anticoagulante'];
        const classe = m.medication?.classeTerapeutica.toLowerCase() || '';
        return highRiskClasses.some((risk) => classe.includes(risk));
      })
      .map((m) => m.medication?.nomeGenerico)
      .join(', ');

    return `Elderly patient (age ${context.age}) prescribed high-risk medication(s): ${highRiskMeds}. Enhanced monitoring recommended.`;
  },
  action: () => {
    return 'Review necessity of high-risk medication. Consider deprescribing or Beers Criteria alternatives.';
  },
  evidence: 'Beers Criteria for Potentially Inappropriate Medication Use in Older Adults',
};

/**
 * Rule: Pregnancy contraindication
 */
export const pregnancyContraindicationRule: AlertRule = {
  id: 'pregnancy-contraindication',
  name: 'Medication Contraindicated in Pregnancy',
  severity: 'critical',
  category: 'contraindication',
  condition: (context) => {
    if (!context.isPregnant) return false;

    return context.medications.some((med) => {
      // FDA Category X or D medications
      return med.medication?.gestacao === 'X' || med.medication?.gestacao === 'D';
    });
  },
  message: (context) => {
    const contraindMeds = context.medications
      .filter((m) => m.medication?.gestacao === 'X' || m.medication?.gestacao === 'D')
      .map((m) => `${m.medication?.nomeGenerico} (Category ${m.medication?.gestacao})`)
      .join(', ');

    return `PREGNANCY CONTRAINDICATION: Patient is pregnant and prescribed: ${contraindMeds}`;
  },
  action: () => {
    return 'Discontinue immediately and switch to pregnancy-safe alternative (Category A or B). Consult OB/GYN.';
  },
  evidence: 'FDA Pregnancy and Lactation Labeling Rule (PLLR)',
};

/**
 * Rule: Breastfeeding incompatible medication
 */
export const breastfeedingContraindicationRule: AlertRule = {
  id: 'breastfeeding-contraindication',
  name: 'Medication Incompatible with Breastfeeding',
  severity: 'warning',
  category: 'monitoring',
  condition: (context) => {
    if (!context.isBreastfeeding) return false;

    return context.medications.some((med) => {
      return med.medication?.amamentacao && !med.medication.amamentacao.compativel;
    });
  },
  message: (context) => {
    const incompatMeds = context.medications
      .filter((m) => m.medication?.amamentacao && !m.medication.amamentacao.compativel)
      .map((m) => m.medication?.nomeGenerico)
      .join(', ');

    return `Breastfeeding concern: ${incompatMeds} - ${context.medications
      .find((m) => m.medication?.amamentacao && !m.medication.amamentacao.compativel)
      ?.medication?.amamentacao?.observacao || 'Not compatible'}`;
  },
  action: () => {
    return 'Consider temporary interruption of breastfeeding or switch to compatible medication.';
  },
  evidence: 'LactMed, AAP Breastfeeding Guidelines',
};

/**
 * Rule: Missing required monitoring for chronic conditions
 */
export const missingMonitoringRule: AlertRule = {
  id: 'missing-monitoring',
  name: 'Missing Required Monitoring',
  severity: 'warning',
  category: 'missing-exam',
  condition: (context) => {
    const chronicConditions = ['hypertension', 'diabetes', 'heart failure', 'ckd'];
    const hasChronicCondition = context.diagnoses.some((d) =>
      chronicConditions.some((condition) => d.toLowerCase().includes(condition))
    );

    if (!hasChronicCondition) return false;

    // Check if key labs are missing
    const hasEssentialLabs = context.labs && (
      (context.labs.tfg !== undefined) ||
      (context.labs.glucose !== undefined) ||
      (context.labs.hemoglobin !== undefined)
    );

    return hasChronicCondition && !hasEssentialLabs;
  },
  message: (context) => {
    const conditions = context.diagnoses
      .filter((d) =>
        ['hypertension', 'diabetes', 'heart failure', 'ckd'].some((c) =>
          d.toLowerCase().includes(c)
        )
      )
      .join(', ');

    return `Essential monitoring labs missing for chronic condition(s): ${conditions}`;
  },
  action: () => {
    return 'Order baseline labs: renal function (creatinine, eGFR), glucose, hemoglobin. Establish monitoring schedule.';
  },
  evidence: 'Clinical Practice Guidelines - Chronic Disease Management',
};

/**
 * Rule: QT prolongation risk with multiple medications
 */
export const qtProlongationRiskRule: AlertRule = {
  id: 'qt-prolongation-risk',
  name: 'QT Prolongation Risk',
  severity: 'warning',
  category: 'drug-interaction',
  condition: (context) => {
    const qtProlongingClasses = [
      'antipsicotico',
      'antiaritmico',
      'macrolideo',
      'fluoroquinolona',
      'azol',
      'antidepressivo',
    ];

    const qtMeds = context.medications.filter((med) => {
      const classe = med.medication?.classeTerapeutica.toLowerCase() || '';
      const subclasse = med.medication?.subclasse?.toLowerCase() || '';

      return qtProlongingClasses.some(
        (risk) => classe.includes(risk) || subclasse.includes(risk)
      );
    });

    // Alert if 2+ QT-prolonging medications
    return qtMeds.length >= 2;
  },
  message: (context) => {
    const qtMeds = context.medications
      .filter((med) => {
        const qtClasses = ['antipsicotico', 'antiaritmico', 'macrolideo', 'fluoroquinolona', 'azol'];
        const classe = med.medication?.classeTerapeutica.toLowerCase() || '';
        return qtClasses.some((c) => classe.includes(c));
      })
      .map((m) => m.medication?.nomeGenerico)
      .join(', ');

    return `Multiple QT-prolonging medications: ${qtMeds}. Risk of torsades de pointes.`;
  },
  action: () => {
    return 'Consider baseline ECG. Monitor QT interval. Evaluate necessity of multiple QT-prolonging drugs.';
  },
  evidence: 'Arizona Center for Education and Research on Therapeutics (AzCERT) - QT Drug Database',
};

/**
 * All available alert rules
 */
export const ALL_ALERT_RULES: AlertRule[] = [
  renalDosageAdjustmentRule,
  redFlagSymptomsRule,
  absoluteContraindicationRule,
  abnormalDosageRule,
  elderlyHighRiskMedicationRule,
  pregnancyContraindicationRule,
  breastfeedingContraindicationRule,
  missingMonitoringRule,
  qtProlongationRiskRule,
];
