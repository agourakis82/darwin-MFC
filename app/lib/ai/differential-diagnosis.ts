/**
 * Differential Diagnosis Engine
 * Phase 2: Intelligence Layer
 */

export interface DiagnosticContext {
  symptoms: string[];
  patientAge?: number;
  gender?: 'M' | 'F';
  riskFactors?: string[];
  vitals?: {
    temperature?: number;
    bloodPressure?: string;
    heartRate?: number;
    respiratoryRate?: number;
  };
}

export interface DifferentialDiagnosis {
  id: string;
  diagnosis: string;
  probability: number;
  keyFeatures: string[];
  reasoning: string;
  nextSteps?: string[];
  references?: string[];
}

/**
 * Generate differential diagnosis based on clinical presentation
 */
export function generateDifferentialDiagnosis(context: DiagnosticContext): DifferentialDiagnosis[] {
  const differentials: DifferentialDiagnosis[] = [];

  // Simplified example - in production this would use ML models
  const symptomLower = context.symptoms.map((s) => s.toLowerCase());

  // Chest pain differential
  if (symptomLower.some((s) => s.includes('chest'))) {
    differentials.push({
      id: 'acs',
      diagnosis: 'Acute Coronary Syndrome',
      probability: context.riskFactors?.some((r) => r.includes('cardiac')) ? 0.85 : 0.45,
      keyFeatures: ['Chest pain', 'Dyspnea', 'Diaphoresis', 'Radiation to arm'],
      reasoning:
        'Acute onset chest pain with associated symptoms raises concern for ACS. Risk factors and ECG findings would support this diagnosis.',
      nextSteps: [
        'Obtain EKG immediately',
        'Check troponin levels',
        'Continuous cardiac monitoring',
        'Cardiology consultation',
      ],
      references: ['ESC Guidelines on ACS', 'HEART Score Calculator'],
    });

    differentials.push({
      id: 'pe',
      diagnosis: 'Pulmonary Embolism',
      probability: 0.35,
      keyFeatures: ['Chest pain', 'Dyspnea', 'Tachycardia'],
      reasoning: 'PE should be considered in patients with pleuritic chest pain and dyspnea. Wells score would help stratify risk.',
      nextSteps: ['Calculate Wells Score', 'CT pulmonary angiography if high risk', 'D-dimer if low risk'],
      references: ['Wells Criteria for PE', 'ACCP Guidelines'],
    });

    differentials.push({
      id: 'gerd',
      diagnosis: 'Gastroesophageal Reflux Disease',
      probability: 0.25,
      keyFeatures: ['Chest pain', 'Heartburn', 'Postprandial symptoms'],
      reasoning: 'GERD is a common cause of chest pain. Clarify temporal relationship with meals and position.',
      nextSteps: ['Trial of PPI therapy', 'Upper endoscopy if refractory'],
      references: ['GERD Management Guidelines'],
    });
  }

  // Fever differential
  if (symptomLower.some((s) => s.includes('fever'))) {
    differentials.push({
      id: 'uri',
      diagnosis: 'Upper Respiratory Infection',
      probability: 0.5,
      keyFeatures: ['Fever', 'Cough', 'Rhinorrhea', 'Sore throat'],
      reasoning: 'URI is the most common cause of fever in primary care. Most cases are viral and self-limited.',
      nextSteps: ['Symptomatic management', 'Supportive care', 'Culture if bacterial suspected'],
    });

    differentials.push({
      id: 'covid',
      diagnosis: 'COVID-19',
      probability: 0.4,
      keyFeatures: ['Fever', 'Cough', 'Dyspnea', 'Loss of taste/smell'],
      reasoning: 'COVID-19 remains a consideration with fever and respiratory symptoms. PCR testing would confirm.',
      nextSteps: [
        'SARS-CoV-2 PCR test',
        'Isolation precautions',
        'Supportive care or antiviral therapy if eligible',
      ],
    });
  }

  // Sort by probability
  return differentials.sort((a, b) => b.probability - a.probability).slice(0, 5);
}

/**
 * Calculate probability modifier based on age and gender
 */
export function getAgeGenderModifier(diagnosis: string, age?: number, gender?: string): number {
  const modifiers: Record<string, Record<string, number>> = {
    'acute_coronary_syndrome': {
      age_over_50: 1.5,
      male: 1.3,
    },
    'preeclampsia': {
      female: 2.0,
      age_under_35: 0.8,
    },
  };

  let modifier = 1.0;
  const diagKey = diagnosis.toLowerCase().replace(/\s+/g, '_');

  if (modifiers[diagKey]) {
    if (age && age > 50) {
      modifier *= modifiers[diagKey]['age_over_50'] || 1.0;
    }
    if (gender === 'M') {
      modifier *= modifiers[diagKey]['male'] || 1.0;
    } else if (gender === 'F') {
      modifier *= modifiers[diagKey]['female'] || 1.0;
    }
  }

  return Math.min(modifier, 1.0); // Cap at 100%
}

export default {
  generateDifferentialDiagnosis,
  getAgeGenderModifier,
};
