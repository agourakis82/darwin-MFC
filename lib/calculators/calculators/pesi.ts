/**
 * PESI SCORE (Simplified)
 * ========================
 *
 * Pulmonary Embolism Severity Index - simplified version.
 * Risk stratifies patients with pulmonary embolism.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const pesi: ClinicalCalculator = {
  id: 'pesi',
  name: 'Simplified PESI (sPESI) for Pulmonary Embolism',
  abbreviation: 'sPESI',
  category: 'pulmonology',
  description:
    'Simplified Pulmonary Embolism Severity Index for risk stratification and mortality prediction in PE.',
  purpose:
    'The sPESI identifies low-risk PE patients who may be candidates for outpatient treatment.',

  indications: [
    'Confirmed pulmonary embolism',
    'Risk stratification for PE',
    'Determining need for hospitalization',
    'Guiding treatment intensity',
  ],

  contraindications: [
    'Suspected but unconfirmed PE',
    'Patients already in extremis',
  ],

  inputs: [
    {
      id: 'age',
      label: 'Age >80 years',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'cancer',
      label: 'History of Cancer',
      type: 'boolean',
      description: 'Active cancer or history of cancer',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'chronic_cardiopulmonary',
      label: 'Chronic Cardiopulmonary Disease',
      type: 'boolean',
      description: 'Chronic heart failure or chronic pulmonary disease',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'heart_rate',
      label: 'Heart Rate ≥110 bpm',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'systolic_bp',
      label: 'Systolic BP <100 mmHg',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'oxygen_saturation',
      label: 'O₂ Saturation <90%',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
  ],

  calculate: (inputs) => {
    return (
      (inputs.age || 0) +
      (inputs.cancer || 0) +
      (inputs.chronic_cardiopulmonary || 0) +
      (inputs.heart_rate || 0) +
      (inputs.systolic_bp || 0) +
      (inputs.oxygen_saturation || 0)
    );
  },

  interpret: (score): ScoreInterpretation => {
    if (score === 0) {
      return {
        score,
        category: 'Low Risk',
        risk: 'low',
        mortality: '1.0% 30-day mortality',
        recommendation: 'Consider outpatient treatment.',
        action:
          'Patient may be candidate for home treatment with close follow-up.',
        notes: [
          'Low risk of adverse outcomes',
          'Outpatient anticoagulation may be appropriate',
          'Ensure adequate follow-up and patient education',
          'Consider social factors before discharge',
        ],
      };
    }
    // score >= 1
    return {
      score,
      category: 'High Risk',
      risk: 'high',
      mortality: '10.9% 30-day mortality',
      recommendation: 'Hospital admission recommended.',
      action: 'Inpatient management with close monitoring.',
      notes: [
        'Higher risk of complications and mortality',
        'Consider echocardiography for RV dysfunction',
        'Monitor for hemodynamic instability',
        'May need more aggressive treatment',
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
        mortality: '1.0%',
        recommendation: 'Outpatient treatment possible',
      },
    },
    {
      min: 1,
      max: 6,
      interpretation: {
        category: 'High Risk',
        risk: 'high',
        mortality: '10.9%',
        recommendation: 'Hospital admission',
      },
    },
  ],

  citations: [
    {
      authors: 'Jiménez D, Aujesky D, Moores L, et al.',
      title:
        'Simplification of the pulmonary embolism severity index for prognostication in patients with acute symptomatic pulmonary embolism',
      journal: 'Arch Intern Med',
      year: 2010,
      volume: '170(15):1383-1389',
      doi: '10.1001/archinternmed.2010.199',
      pmid: '20696966',
    },
  ],

  validationStudy:
    'Validated in multiple cohorts with excellent discrimination for 30-day mortality.',
};
