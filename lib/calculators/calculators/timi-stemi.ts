/**
 * TIMI RISK SCORE FOR STEMI
 * ==========================
 *
 * Risk stratification for patients with ST-elevation MI.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const timiStemi: ClinicalCalculator = {
  id: 'timi-stemi',
  name: 'TIMI Risk Score for STEMI',
  abbreviation: 'TIMI STEMI',
  category: 'cardiology',
  description:
    'Estimates 30-day mortality in patients with ST-elevation myocardial infarction.',
  purpose:
    'The TIMI Risk Score for STEMI helps stratify patients by mortality risk to guide treatment intensity.',

  indications: [
    'Patients with confirmed STEMI',
    'Risk stratification at presentation',
    'Guiding treatment decisions',
  ],

  contraindications: [
    'NSTEMI or unstable angina (use TIMI for UA/NSTEMI)',
    'Non-cardiac chest pain',
  ],

  inputs: [
    {
      id: 'age',
      label: 'Age',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '<65 years' },
        { value: 2, label: '65-74 years' },
        { value: 3, label: '≥75 years' },
      ],
    },
    {
      id: 'diabetes_htn_angina',
      label: 'Diabetes, Hypertension, or Angina',
      type: 'boolean',
      description: 'History of diabetes mellitus, hypertension, or angina',
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
        { value: 3, label: 'Yes' },
      ],
    },
    {
      id: 'heart_rate',
      label: 'Heart Rate >100 bpm',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 2, label: 'Yes' },
      ],
    },
    {
      id: 'killip_class',
      label: 'Killip Class II-IV',
      type: 'boolean',
      description: 'Signs of heart failure (rales, S3, hypotension, shock)',
      required: true,
      options: [
        { value: 0, label: 'No (Killip I)' },
        { value: 2, label: 'Yes (Killip II-IV)' },
      ],
    },
    {
      id: 'weight',
      label: 'Weight <67 kg (148 lbs)',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'anterior_st',
      label: 'Anterior ST Elevation or LBBB',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'time_to_treatment',
      label: 'Time to Treatment >4 hours',
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
      (inputs.diabetes_htn_angina || 0) +
      (inputs.systolic_bp || 0) +
      (inputs.heart_rate || 0) +
      (inputs.killip_class || 0) +
      (inputs.weight || 0) +
      (inputs.anterior_st || 0) +
      (inputs.time_to_treatment || 0)
    );
  },

  interpret: (score): ScoreInterpretation => {
    if (score === 0) {
      return {
        score,
        category: 'Very Low Risk',
        risk: 'very-low',
        mortality: '0.8% 30-day mortality',
        recommendation: 'Standard STEMI care.',
        action: 'Proceed with reperfusion therapy per guidelines.',
      };
    }
    if (score <= 2) {
      return {
        score,
        category: 'Low Risk',
        risk: 'low',
        mortality: '1.6-2.2% 30-day mortality',
        recommendation: 'Standard STEMI care with close monitoring.',
        action: 'Proceed with reperfusion therapy.',
      };
    }
    if (score <= 4) {
      return {
        score,
        category: 'Moderate Risk',
        risk: 'moderate',
        mortality: '4.4-7.3% 30-day mortality',
        recommendation: 'Aggressive treatment. Consider higher level of care.',
        action: 'Urgent reperfusion. Monitor for complications.',
      };
    }
    if (score <= 6) {
      return {
        score,
        category: 'High Risk',
        risk: 'high',
        mortality: '12.4-16.1% 30-day mortality',
        recommendation: 'High-risk patient. Intensive monitoring required.',
        action: 'ICU level care. Consider mechanical support if needed.',
      };
    }
    // score > 6
    return {
      score,
      category: 'Very High Risk',
      risk: 'critical',
      mortality: '23.4-35.9% 30-day mortality',
      recommendation: 'Critical patient. Maximum supportive care.',
      action: 'ICU admission. Consider mechanical circulatory support.',
      notes: [
        'Very high mortality risk',
        'Discuss prognosis with patient/family',
        'All available therapies should be considered',
      ],
    };
  },

  interpretationRanges: [
    {
      min: 0,
      max: 0,
      interpretation: {
        category: 'Very Low Risk',
        risk: 'very-low',
        mortality: '0.8%',
        recommendation: 'Standard care',
      },
    },
    {
      min: 1,
      max: 2,
      interpretation: {
        category: 'Low Risk',
        risk: 'low',
        mortality: '1.6-2.2%',
        recommendation: 'Standard care',
      },
    },
    {
      min: 3,
      max: 4,
      interpretation: {
        category: 'Moderate Risk',
        risk: 'moderate',
        mortality: '4.4-7.3%',
        recommendation: 'Close monitoring',
      },
    },
    {
      min: 5,
      max: 6,
      interpretation: {
        category: 'High Risk',
        risk: 'high',
        mortality: '12.4-16.1%',
        recommendation: 'ICU care',
      },
    },
    {
      min: 7,
      max: 14,
      interpretation: {
        category: 'Very High Risk',
        risk: 'critical',
        mortality: '23.4-35.9%',
        recommendation: 'Critical care',
      },
    },
  ],

  citations: [
    {
      authors: 'Morrow DA, Antman EM, Charlesworth A, et al.',
      title:
        'TIMI risk score for ST-elevation myocardial infarction: A convenient, bedside, clinical score for risk assessment at presentation',
      journal: 'Circulation',
      year: 2000,
      volume: '102(17):2031-2037',
      doi: '10.1161/01.cir.102.17.2031',
      pmid: '11044416',
    },
  ],

  validationStudy:
    'Derived and validated in >15,000 STEMI patients from InTIME II trial.',
};
