/**
 * CURB-65 SCORE
 * ==============
 *
 * Severity score for community-acquired pneumonia (CAP).
 * Helps determine need for hospitalization.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const curb65: ClinicalCalculator = {
  id: 'curb-65',
  name: 'CURB-65 Score for Pneumonia Severity',
  abbreviation: 'CURB-65',
  category: 'pulmonology',
  description:
    'Estimates mortality risk in community-acquired pneumonia to help determine inpatient vs outpatient treatment.',
  purpose:
    'The CURB-65 score stratifies patients with community-acquired pneumonia by mortality risk to guide disposition decisions.',

  indications: [
    'Adults with community-acquired pneumonia',
    'Disposition planning (outpatient vs inpatient vs ICU)',
    'Risk stratification for CAP',
  ],

  contraindications: [
    'Hospital-acquired or ventilator-associated pneumonia',
    'Immunocompromised patients (may underestimate severity)',
    'Pediatric patients',
  ],

  inputs: [
    {
      id: 'confusion',
      label: 'Confusion',
      type: 'boolean',
      description: 'New mental confusion (AMT ≤8 or new disorientation)',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'bun',
      label: 'BUN >19 mg/dL (>7 mmol/L)',
      type: 'boolean',
      description: 'Blood urea nitrogen elevated',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'respiratory_rate',
      label: 'Respiratory Rate ≥30/min',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'blood_pressure',
      label: 'Low Blood Pressure',
      type: 'boolean',
      description: 'SBP <90 mmHg or DBP ≤60 mmHg',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'age',
      label: 'Age ≥65 years',
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
      (inputs.confusion || 0) +
      (inputs.bun || 0) +
      (inputs.respiratory_rate || 0) +
      (inputs.blood_pressure || 0) +
      (inputs.age || 0)
    );
  },

  interpret: (score): ScoreInterpretation => {
    if (score === 0) {
      return {
        score,
        category: 'Low Risk',
        risk: 'low',
        mortality: '0.6% 30-day mortality',
        recommendation: 'Consider outpatient treatment.',
        action: 'May be suitable for home treatment with oral antibiotics.',
        notes: [
          'Ensure adequate social support',
          'Close follow-up within 48-72 hours',
          'Return precautions for worsening symptoms',
        ],
      };
    }
    if (score === 1) {
      return {
        score,
        category: 'Low Risk',
        risk: 'low',
        mortality: '2.7% 30-day mortality',
        recommendation: 'Consider outpatient treatment or short hospital stay.',
        action: 'Outpatient or brief observation depending on clinical judgment.',
        notes: [
          'Consider social factors and comorbidities',
          'May benefit from brief observation',
        ],
      };
    }
    if (score === 2) {
      return {
        score,
        category: 'Moderate Risk',
        risk: 'moderate',
        mortality: '6.8% 30-day mortality',
        recommendation: 'Hospital admission recommended.',
        action: 'Admit for inpatient treatment and monitoring.',
        notes: [
          'IV antibiotics typically indicated',
          'Monitor for clinical deterioration',
        ],
      };
    }
    if (score === 3) {
      return {
        score,
        category: 'High Risk',
        risk: 'high',
        mortality: '14% 30-day mortality',
        recommendation: 'Hospital admission required. Consider ICU.',
        action: 'Admit to hospital. Assess need for intensive care.',
        notes: [
          'High risk of complications',
          'May require respiratory support',
          'Close monitoring essential',
        ],
      };
    }
    // score >= 4
    return {
      score,
      category: 'Very High Risk',
      risk: 'critical',
      mortality: '27.8% 30-day mortality',
      recommendation: 'Urgent hospital admission. ICU consideration.',
      action: 'Admit to ICU or high-dependency unit.',
      notes: [
        'Very high mortality risk',
        'Aggressive treatment indicated',
        'Early involvement of critical care',
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
        mortality: '0.6%',
        recommendation: 'Outpatient treatment',
      },
    },
    {
      min: 1,
      max: 1,
      interpretation: {
        category: 'Low Risk',
        risk: 'low',
        mortality: '2.7%',
        recommendation: 'Outpatient or short stay',
      },
    },
    {
      min: 2,
      max: 2,
      interpretation: {
        category: 'Moderate Risk',
        risk: 'moderate',
        mortality: '6.8%',
        recommendation: 'Hospital admission',
      },
    },
    {
      min: 3,
      max: 3,
      interpretation: {
        category: 'High Risk',
        risk: 'high',
        mortality: '14%',
        recommendation: 'Hospital/ICU',
      },
    },
    {
      min: 4,
      max: 5,
      interpretation: {
        category: 'Very High Risk',
        risk: 'critical',
        mortality: '27.8%',
        recommendation: 'ICU admission',
      },
    },
  ],

  citations: [
    {
      authors: 'Lim WS, van der Eerden MM, Laing R, et al.',
      title:
        'Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study',
      journal: 'Thorax',
      year: 2003,
      volume: '58(5):377-382',
      doi: '10.1136/thorax.58.5.377',
      pmid: '12728155',
    },
  ],

  validationStudy:
    'Validated in multiple international cohorts with consistent mortality stratification.',
};
