/**
 * SOFA (Sequential Organ Failure Assessment)
 * ===========================================
 *
 * Comprehensive ICU scoring system to assess organ dysfunction.
 * Evaluates 6 organ systems and is used to define sepsis and track progression.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const sofa: ClinicalCalculator = {
  id: 'sofa',
  name: 'Sequential Organ Failure Assessment',
  abbreviation: 'SOFA',
  category: 'critical-care',
  description:
    'ICU scoring system that assesses organ dysfunction across 6 organ systems to diagnose sepsis and predict mortality.',
  purpose:
    'SOFA is used to track the status of critically ill patients, particularly for defining organ dysfunction in sepsis. An acute increase of ≥2 points from baseline is used to identify sepsis.',
  indications: [
    'ICU patients with suspected infection',
    'Defining organ dysfunction for Sepsis-3 criteria',
    'Daily tracking of ICU patient status',
    'Prognostication in critical illness',
  ],
  contraindications: [
    'Not validated for general ward patients (use qSOFA instead)',
    'Baseline SOFA may be difficult to determine in new patients',
  ],

  inputs: [
    // Respiratory
    {
      id: 'pao2fio2',
      label: 'PaO2/FiO2 Ratio (Respiration)',
      type: 'select',
      required: true,
      group: 'Respiration',
      description: 'Calculate as PaO2 (mmHg) divided by FiO2 (decimal)',
      options: [
        { value: 0, label: '≥400 (Normal)' },
        { value: 1, label: '<400' },
        { value: 2, label: '<300' },
        { value: 3, label: '<200 with respiratory support' },
        { value: 4, label: '<100 with respiratory support' },
      ],
    },
    // Coagulation
    {
      id: 'platelets',
      label: 'Platelets (×10³/µL)',
      type: 'select',
      required: true,
      group: 'Coagulation',
      options: [
        { value: 0, label: '≥150' },
        { value: 1, label: '<150' },
        { value: 2, label: '<100' },
        { value: 3, label: '<50' },
        { value: 4, label: '<20' },
      ],
    },
    // Liver
    {
      id: 'bilirubin',
      label: 'Bilirubin (mg/dL)',
      type: 'select',
      required: true,
      group: 'Liver',
      options: [
        { value: 0, label: '<1.2' },
        { value: 1, label: '1.2-1.9' },
        { value: 2, label: '2.0-5.9' },
        { value: 3, label: '6.0-11.9' },
        { value: 4, label: '≥12.0' },
      ],
    },
    // Cardiovascular
    {
      id: 'cardiovascular',
      label: 'Cardiovascular (Hypotension)',
      type: 'select',
      required: true,
      group: 'Cardiovascular',
      description: 'MAP = Mean Arterial Pressure; vasopressors in µg/kg/min for ≥1 hour',
      options: [
        { value: 0, label: 'MAP ≥70 mmHg' },
        { value: 1, label: 'MAP <70 mmHg' },
        { value: 2, label: 'Dopamine ≤5 or any dobutamine' },
        { value: 3, label: 'Dopamine >5 or Epi/Norepi ≤0.1' },
        { value: 4, label: 'Dopamine >15 or Epi/Norepi >0.1' },
      ],
    },
    // CNS
    {
      id: 'gcs',
      label: 'Glasgow Coma Scale',
      type: 'select',
      required: true,
      group: 'Central Nervous System',
      options: [
        { value: 0, label: '15 (Normal)' },
        { value: 1, label: '13-14' },
        { value: 2, label: '10-12' },
        { value: 3, label: '6-9' },
        { value: 4, label: '<6' },
      ],
    },
    // Renal
    {
      id: 'renal',
      label: 'Creatinine (mg/dL) or Urine Output',
      type: 'select',
      required: true,
      group: 'Renal',
      options: [
        { value: 0, label: 'Cr <1.2' },
        { value: 1, label: 'Cr 1.2-1.9' },
        { value: 2, label: 'Cr 2.0-3.4' },
        { value: 3, label: 'Cr 3.5-4.9 OR UO <500 mL/day' },
        { value: 4, label: 'Cr ≥5.0 OR UO <200 mL/day' },
      ],
    },
  ],

  calculate: (inputs) => {
    return (
      (inputs.pao2fio2 || 0) +
      (inputs.platelets || 0) +
      (inputs.bilirubin || 0) +
      (inputs.cardiovascular || 0) +
      (inputs.gcs || 0) +
      (inputs.renal || 0)
    );
  },

  interpret: (score): ScoreInterpretation => {
    if (score <= 1) {
      return {
        score,
        category: 'Minimal Organ Dysfunction',
        risk: 'very-low',
        mortality: '<1.5%',
        recommendation:
          'Minimal organ dysfunction. Continue supportive care and monitor for changes.',
      };
    }

    if (score <= 3) {
      return {
        score,
        category: 'Mild Organ Dysfunction',
        risk: 'low',
        mortality: '1.5-4%',
        recommendation:
          'Mild organ dysfunction. Identify and treat underlying cause. Serial SOFA monitoring recommended.',
      };
    }

    if (score <= 6) {
      return {
        score,
        category: 'Moderate Organ Dysfunction',
        risk: 'moderate',
        mortality: '4-11%',
        recommendation:
          'Moderate organ dysfunction. Intensive monitoring required. Consider escalation of care if worsening.',
      };
    }

    if (score <= 9) {
      return {
        score,
        category: 'Significant Organ Dysfunction',
        risk: 'high',
        mortality: '11-20%',
        recommendation:
          'Significant multi-organ dysfunction. Aggressive organ support and source control required.',
      };
    }

    if (score <= 12) {
      return {
        score,
        category: 'Severe Organ Dysfunction',
        risk: 'very-high',
        mortality: '20-50%',
        recommendation:
          'Severe multi-organ dysfunction. Maximum supportive therapy. Discuss goals of care if appropriate.',
      };
    }

    return {
      score,
      category: 'Critical Organ Dysfunction',
      risk: 'critical',
      mortality: '>50%',
      recommendation:
        'Critical multi-organ failure with very high mortality risk. All possible interventions should be considered.',
      action: 'Goals of care discussion may be appropriate',
    };
  },

  interpretationRanges: [
    {
      min: 0,
      max: 1,
      interpretation: {
        category: 'Minimal Organ Dysfunction',
        risk: 'very-low',
        mortality: '<1.5%',
        recommendation: 'Minimal dysfunction. Continue monitoring.',
      },
    },
    {
      min: 2,
      max: 3,
      interpretation: {
        category: 'Mild Organ Dysfunction',
        risk: 'low',
        mortality: '1.5-4%',
        recommendation: 'Mild dysfunction. Serial monitoring advised.',
      },
    },
    {
      min: 4,
      max: 6,
      interpretation: {
        category: 'Moderate Organ Dysfunction',
        risk: 'moderate',
        mortality: '4-11%',
        recommendation: 'Moderate dysfunction. Intensive monitoring.',
      },
    },
    {
      min: 7,
      max: 9,
      interpretation: {
        category: 'Significant Organ Dysfunction',
        risk: 'high',
        mortality: '11-20%',
        recommendation: 'Aggressive organ support required.',
      },
    },
    {
      min: 10,
      max: 12,
      interpretation: {
        category: 'Severe Organ Dysfunction',
        risk: 'very-high',
        mortality: '20-50%',
        recommendation: 'Maximum support. Consider goals of care.',
      },
    },
    {
      min: 13,
      max: 24,
      interpretation: {
        category: 'Critical Organ Dysfunction',
        risk: 'critical',
        mortality: '>50%',
        recommendation: 'Critical failure. Very high mortality.',
      },
    },
  ],

  citations: [
    {
      authors: 'Vincent JL, Moreno R, Takala J, et al.',
      title:
        'The SOFA (Sepsis-related Organ Failure Assessment) score to describe organ dysfunction/failure',
      journal: 'Intensive Care Medicine',
      year: 1996,
      volume: '22(7):707-710',
      doi: '10.1007/BF01709751',
      pmid: '8844239',
    },
    {
      authors: 'Singer M, Deutschman CS, Seymour CW, et al.',
      title:
        'The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3)',
      journal: 'JAMA',
      year: 2016,
      volume: '315(8):801-810',
      doi: '10.1001/jama.2016.0287',
      pmid: '26903338',
    },
  ],

  validationStudy:
    'Original validation in ICU population; Sepsis-3 definition uses SOFA increase ≥2 from baseline',

  notes: [
    'For Sepsis-3: Sepsis = Suspected infection + SOFA increase ≥2 from baseline',
    'Baseline SOFA assumed 0 in patients not known to have pre-existing organ dysfunction',
    'Serial SOFA assessments can track response to treatment',
    'Individual organ scores range 0-4, total maximum 24',
  ],

  relatedCalculators: ['qsofa', 'apache2', 'sirs', 'news2'],

  snomedConcepts: ['91302008', '127311007'], // Sepsis, Organ failure

  version: '1.0',
  lastUpdated: '2024-01-15',
};

export default sofa;
