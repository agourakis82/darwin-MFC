/**
 * qSOFA (Quick Sequential Organ Failure Assessment)
 * ==================================================
 *
 * Bedside score to identify patients at risk for sepsis outside the ICU.
 * Uses only 3 simple clinical criteria that can be rapidly assessed.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const qsofa: ClinicalCalculator = {
  id: 'qsofa',
  name: 'Quick SOFA Score',
  abbreviation: 'qSOFA',
  category: 'critical-care',
  description:
    'Bedside assessment tool for identifying patients with suspected infection who are at risk for sepsis.',
  purpose:
    'The qSOFA was developed as a simplified version of SOFA for rapid bedside assessment. It identifies patients with suspected infection who are at greater risk for a poor outcome outside the ICU.',
  indications: [
    'Suspected infection outside the ICU',
    'Initial sepsis screening in emergency department',
    'Triage of patients with possible sepsis',
  ],
  contraindications: [
    'Should not replace clinical judgment',
    'Not validated for ICU patients (use full SOFA instead)',
    'Does not rule out sepsis if negative',
  ],

  inputs: [
    {
      id: 'respiratoryRate',
      label: 'Respiratory Rate ≥22/min',
      type: 'boolean',
      required: true,
      description: 'Is the respiratory rate 22 breaths per minute or higher?',
      options: [
        { value: 0, label: 'No (RR <22/min)' },
        { value: 1, label: 'Yes (RR ≥22/min)' },
      ],
    },
    {
      id: 'alteredMentation',
      label: 'Altered Mentation',
      type: 'boolean',
      required: true,
      description: 'Is there any alteration in mental status? (GCS <15)',
      options: [
        { value: 0, label: 'No (Alert, GCS 15)' },
        { value: 1, label: 'Yes (Any altered mentation)' },
      ],
    },
    {
      id: 'systolicBP',
      label: 'Systolic BP ≤100 mmHg',
      type: 'boolean',
      required: true,
      description: 'Is the systolic blood pressure 100 mmHg or less?',
      options: [
        { value: 0, label: 'No (SBP >100 mmHg)' },
        { value: 1, label: 'Yes (SBP ≤100 mmHg)' },
      ],
    },
  ],

  calculate: (inputs) => {
    return (inputs.respiratoryRate || 0) + (inputs.alteredMentation || 0) + (inputs.systolicBP || 0);
  },

  interpret: (score): ScoreInterpretation => {
    if (score >= 2) {
      return {
        score,
        category: 'High Risk',
        risk: 'high',
        mortality: '3-14x higher in-hospital mortality',
        recommendation:
          'Patient is at significantly increased risk for poor outcomes. Consider ICU admission, obtain lactate, blood cultures, and initiate sepsis bundle if appropriate.',
        action: 'Immediate evaluation for organ dysfunction and sepsis',
        notes: [
          'qSOFA ≥2 is associated with 3-14x increase in in-hospital mortality',
          'Consider full SOFA assessment',
          'Does not confirm sepsis diagnosis',
        ],
      };
    }

    if (score === 1) {
      return {
        score,
        category: 'Intermediate Risk',
        risk: 'moderate',
        recommendation:
          'Continue close monitoring. A single qSOFA criterion warrants attention but does not indicate high risk.',
        notes: [
          'Re-evaluate if clinical condition changes',
          'Consider serial assessments',
        ],
      };
    }

    return {
      score,
      category: 'Low Risk',
      risk: 'low',
      recommendation:
        'Low risk based on qSOFA. However, clinical judgment should still guide management of suspected infection.',
      notes: [
        'Low qSOFA does not rule out sepsis',
        'Continue standard infection workup if clinically indicated',
      ],
    };
  },

  interpretationRanges: [
    {
      min: 0,
      max: 0,
      interpretation: {
        category: 'Low Risk',
        risk: 'low',
        recommendation: 'Continue monitoring. Low qSOFA does not exclude sepsis.',
      },
    },
    {
      min: 1,
      max: 1,
      interpretation: {
        category: 'Intermediate Risk',
        risk: 'moderate',
        recommendation: 'Close monitoring advised. Re-assess if condition changes.',
      },
    },
    {
      min: 2,
      max: 3,
      interpretation: {
        category: 'High Risk',
        risk: 'high',
        mortality: '3-14x higher in-hospital mortality',
        recommendation: 'High risk for poor outcomes. Immediate sepsis evaluation needed.',
        action: 'Consider ICU admission and sepsis bundle',
      },
    },
  ],

  citations: [
    {
      authors: 'Seymour CW, Liu VX, Iwashyna TJ, et al.',
      title:
        'Assessment of Clinical Criteria for Sepsis: For the Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3)',
      journal: 'JAMA',
      year: 2016,
      volume: '315(8):762-774',
      doi: '10.1001/jama.2016.0288',
      pmid: '26903335',
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
    'Validated in over 1.3 million patient encounters; qSOFA ≥2 had 81% predictive validity for in-hospital mortality',

  notes: [
    'qSOFA should prompt further assessment for organ dysfunction if positive',
    'Not intended to replace SIRS criteria for research or epidemiology',
    'Should be used alongside clinical judgment, not as sole diagnostic tool',
  ],

  relatedCalculators: ['sofa', 'news2', 'sirs'],

  snomedConcepts: ['91302008'], // Sepsis

  version: '1.0',
  lastUpdated: '2024-01-15',
};

export default qsofa;
