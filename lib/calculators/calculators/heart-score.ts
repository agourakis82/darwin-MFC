/**
 * HEART Score for Major Cardiac Events
 * =====================================
 *
 * Risk stratification for chest pain patients in the emergency department.
 * Identifies low-risk patients who may be safely discharged.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const heartScore: ClinicalCalculator = {
  id: 'heart-score',
  name: 'HEART Score for Major Cardiac Events',
  abbreviation: 'HEART',
  category: 'cardiology',
  description:
    'Predicts 6-week risk of major adverse cardiac events (MACE) in ED patients with chest pain.',
  purpose:
    'The HEART score helps risk-stratify chest pain patients to identify those at low risk who may be safely discharged without further testing, and those requiring more aggressive evaluation.',
  indications: [
    'Chest pain in the emergency department',
    'Undifferentiated chest pain evaluation',
    'ACS risk stratification',
  ],
  contraindications: [
    'Not for patients with clear STEMI',
    'Not validated for clearly non-cardiac chest pain',
    'Should not replace clinical judgment in high-risk presentations',
  ],

  inputs: [
    {
      id: 'history',
      label: 'History',
      type: 'select',
      required: true,
      group: 'H - History',
      description:
        'Assess characteristics of chest pain: location, radiation, timing, associated symptoms',
      options: [
        {
          value: 0,
          label: 'Slightly suspicious - Non-specific history, atypical features',
        },
        {
          value: 1,
          label: 'Moderately suspicious - Some typical features present',
        },
        {
          value: 2,
          label: 'Highly suspicious - Typical chest pain with classic features',
        },
      ],
    },
    {
      id: 'ecg',
      label: 'ECG',
      type: 'select',
      required: true,
      group: 'E - ECG',
      description: 'Initial 12-lead ECG findings',
      options: [
        { value: 0, label: 'Normal - Completely normal ECG' },
        {
          value: 1,
          label:
            'Non-specific changes - Repolarization abnormalities, LBBB, pacemaker, no significant ST changes',
        },
        {
          value: 2,
          label: 'Significant ST deviation - ST depression or elevation, T-wave inversion',
        },
      ],
    },
    {
      id: 'age',
      label: 'Age',
      type: 'select',
      required: true,
      group: 'A - Age',
      options: [
        { value: 0, label: '<45 years' },
        { value: 1, label: '45-64 years' },
        { value: 2, label: '≥65 years' },
      ],
    },
    {
      id: 'riskFactors',
      label: 'Risk Factors',
      type: 'select',
      required: true,
      group: 'R - Risk Factors',
      description:
        'HTN, hypercholesterolemia, DM, obesity (BMI >30), smoking, family history of CAD, atherosclerotic disease',
      options: [
        { value: 0, label: 'No known risk factors' },
        { value: 1, label: '1-2 risk factors' },
        { value: 2, label: '≥3 risk factors or known atherosclerotic disease' },
      ],
    },
    {
      id: 'troponin',
      label: 'Initial Troponin',
      type: 'select',
      required: true,
      group: 'T - Troponin',
      description: 'First troponin result relative to the upper limit of normal (ULN)',
      options: [
        { value: 0, label: '≤ Normal limit' },
        { value: 1, label: '1-3× Normal limit' },
        { value: 2, label: '>3× Normal limit' },
      ],
    },
  ],

  calculate: (inputs) => {
    return (
      (inputs.history || 0) +
      (inputs.ecg || 0) +
      (inputs.age || 0) +
      (inputs.riskFactors || 0) +
      (inputs.troponin || 0)
    );
  },

  interpret: (score): ScoreInterpretation => {
    if (score <= 3) {
      return {
        score,
        category: 'Low Risk',
        risk: 'low',
        mortality: 'MACE risk: 0.9-1.7%',
        recommendation:
          'Low risk for MACE at 6 weeks. Consider discharge with outpatient follow-up. Further cardiac workup generally not indicated acutely.',
        action: 'Consider safe discharge with close follow-up',
        notes: [
          'HEART Pathway: If troponin negative at 0 and 3 hours, discharge is safe',
          '1.7% MACE rate in validation studies',
          'Ensure reliable follow-up before discharge',
        ],
      };
    }

    if (score <= 6) {
      return {
        score,
        category: 'Moderate Risk',
        risk: 'moderate',
        mortality: 'MACE risk: 12-16.6%',
        recommendation:
          'Moderate risk. Admit for observation. Serial troponins and further cardiac evaluation recommended.',
        action: 'Observation unit or admission, stress testing or angiography as indicated',
        notes: [
          'Non-invasive testing or cardiology consult recommended',
          'Serial troponins at 3-6 hours',
          'Consider CT coronary angiography if available',
        ],
      };
    }

    // Score 7-10
    return {
      score,
      category: 'High Risk',
      risk: 'high',
      mortality: 'MACE risk: 50-65%',
      recommendation:
        'High risk for major cardiac event. Admit to monitored setting. Early invasive strategy recommended.',
      action: 'Cardiology consult, consider early catheterization',
      notes: [
        'High likelihood of ACS',
        'Dual antiplatelet therapy and anticoagulation per ACS guidelines',
        'Invasive coronary angiography typically indicated',
      ],
    };
  },

  interpretationRanges: [
    {
      min: 0,
      max: 3,
      interpretation: {
        category: 'Low Risk',
        risk: 'low',
        mortality: 'MACE: 0.9-1.7%',
        recommendation:
          'Low risk. Consider discharge with follow-up. Serial troponins may allow safe discharge.',
      },
    },
    {
      min: 4,
      max: 6,
      interpretation: {
        category: 'Moderate Risk',
        risk: 'moderate',
        mortality: 'MACE: 12-16.6%',
        recommendation: 'Admit for observation. Non-invasive testing or angiography.',
      },
    },
    {
      min: 7,
      max: 10,
      interpretation: {
        category: 'High Risk',
        risk: 'high',
        mortality: 'MACE: 50-65%',
        recommendation: 'High risk. Cardiology consult. Early invasive strategy.',
        action: 'Consider early catheterization',
      },
    },
  ],

  citations: [
    {
      authors: 'Six AJ, Backus BE, Kelder JC',
      title:
        'Chest pain in the emergency room: value of the HEART score',
      journal: 'Netherlands Heart Journal',
      year: 2008,
      volume: '16(6):191-196',
      pmid: '18665203',
    },
    {
      authors: 'Backus BE, Six AJ, Kelder JC, et al.',
      title:
        'A prospective validation of the HEART score for chest pain patients at the emergency department',
      journal: 'International Journal of Cardiology',
      year: 2013,
      volume: '168(3):2153-2158',
      doi: '10.1016/j.ijcard.2013.01.255',
      pmid: '23465250',
    },
    {
      authors: 'Mahler SA, Riley RF, Hiestand BC, et al.',
      title:
        'The HEART Pathway randomized trial: identifying emergency department patients with acute chest pain for early discharge',
      journal: 'Circulation: Cardiovascular Quality and Outcomes',
      year: 2015,
      volume: '8(2):195-203',
      doi: '10.1161/CIRCOUTCOMES.114.001384',
      pmid: '25737484',
    },
  ],

  validationStudy:
    'Prospectively validated; HEART Pathway RCT showed safe early discharge for low-risk patients',

  notes: [
    'HEART = History, ECG, Age, Risk factors, Troponin',
    'HEART Pathway uses serial troponins at 0 and 3 hours for low-risk patients',
    'High-sensitivity troponin assays may modify interpretation',
    'Clinical judgment should supplement score in borderline cases',
    'Not validated for known ACS or STEMI',
  ],

  relatedCalculators: ['timi', 'grace', 'cha2ds2-vasc'],

  snomedConcepts: ['29857009', '394659003'], // Chest pain, Acute coronary syndrome

  version: '1.0',
  lastUpdated: '2024-01-15',
};

export default heartScore;
