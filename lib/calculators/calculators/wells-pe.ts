/**
 * Wells' Criteria for Pulmonary Embolism
 * =======================================
 *
 * Clinical prediction rule to estimate probability of PE.
 * Used to guide diagnostic testing strategy.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const wellsPE: ClinicalCalculator = {
  id: 'wells-pe',
  name: "Wells' Criteria for Pulmonary Embolism",
  abbreviation: 'Wells PE',
  category: 'pulmonology',
  description:
    'Clinical prediction rule to estimate the pre-test probability of pulmonary embolism.',
  purpose:
    "Wells' criteria help determine which patients with suspected PE need further testing. Combined with D-dimer, it guides the diagnostic pathway.",
  indications: [
    'Suspected pulmonary embolism',
    'Determining need for CTPA or V/Q scan',
    'Risk stratification before D-dimer testing',
  ],
  contraindications: [
    'Not for patients already anticoagulated',
    'Not for known PE',
    'Should not delay treatment in hemodynamically unstable patients',
  ],

  inputs: [
    {
      id: 'clinicalDVT',
      label: 'Clinical signs/symptoms of DVT',
      type: 'boolean',
      required: true,
      description: 'Leg swelling, pain with palpation of deep veins',
      options: [
        { value: 0, label: 'No' },
        { value: 3, label: 'Yes (+3)' },
      ],
    },
    {
      id: 'alternativeLessLikely',
      label: 'PE is #1 diagnosis OR equally likely',
      type: 'boolean',
      required: true,
      description: 'Alternative diagnosis is less likely than PE',
      options: [
        { value: 0, label: 'No (alternative diagnosis more likely)' },
        { value: 3, label: 'Yes (PE is most or equally likely) (+3)' },
      ],
    },
    {
      id: 'heartRate',
      label: 'Heart rate >100 bpm',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'No (HR ≤100)' },
        { value: 1.5, label: 'Yes (HR >100) (+1.5)' },
      ],
    },
    {
      id: 'immobilization',
      label: 'Immobilization or surgery in past 4 weeks',
      type: 'boolean',
      required: true,
      description: '≥3 days immobilization OR surgery in past 4 weeks',
      options: [
        { value: 0, label: 'No' },
        { value: 1.5, label: 'Yes (+1.5)' },
      ],
    },
    {
      id: 'previousVTE',
      label: 'Previous PE or DVT',
      type: 'boolean',
      required: true,
      description: 'Previously objectively diagnosed PE or DVT',
      options: [
        { value: 0, label: 'No' },
        { value: 1.5, label: 'Yes (+1.5)' },
      ],
    },
    {
      id: 'hemoptysis',
      label: 'Hemoptysis',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes (+1)' },
      ],
    },
    {
      id: 'malignancy',
      label: 'Malignancy',
      type: 'boolean',
      required: true,
      description: 'Active cancer (treatment within 6 months or palliative)',
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes (+1)' },
      ],
    },
  ],

  calculate: (inputs) => {
    return (
      (inputs.clinicalDVT || 0) +
      (inputs.alternativeLessLikely || 0) +
      (inputs.heartRate || 0) +
      (inputs.immobilization || 0) +
      (inputs.previousVTE || 0) +
      (inputs.hemoptysis || 0) +
      (inputs.malignancy || 0)
    );
  },

  interpret: (score): ScoreInterpretation => {
    // Three-tier interpretation (traditional)
    if (score <= 1) {
      return {
        score,
        scoreDisplay: score.toFixed(1),
        category: 'Low Probability',
        risk: 'low',
        mortality: 'PE prevalence: ~1.3%',
        recommendation:
          'Low probability. D-dimer testing recommended. If D-dimer negative, PE is effectively ruled out.',
        action: 'Order D-dimer. If negative, PE excluded. If positive, proceed to imaging.',
        notes: [
          'Negative D-dimer + low Wells = PE ruled out (NPV >99%)',
          'Age-adjusted D-dimer (age × 10 if >50) can be used',
        ],
      };
    }

    if (score <= 6) {
      return {
        score,
        scoreDisplay: score.toFixed(1),
        category: 'Moderate Probability',
        risk: 'moderate',
        mortality: 'PE prevalence: ~16%',
        recommendation:
          'Moderate probability. D-dimer can be considered. CTPA generally recommended for definitive diagnosis.',
        action: 'Consider D-dimer or proceed directly to CTPA',
        notes: [
          'Many guidelines recommend CTPA for moderate probability',
          'D-dimer still useful if clinical suspicion at lower end of moderate',
        ],
      };
    }

    // Score > 6
    return {
      score,
      scoreDisplay: score.toFixed(1),
      category: 'High Probability',
      risk: 'high',
      mortality: 'PE prevalence: ~37-78%',
      recommendation:
        'High probability. D-dimer is not useful. Proceed directly to CTPA or V/Q scan. Consider empiric anticoagulation while awaiting imaging.',
      action: 'Immediate imaging (CTPA preferred). Consider empiric anticoagulation.',
      notes: [
        'D-dimer should not be used to exclude PE in high probability',
        'Treatment should not be delayed for imaging in unstable patients',
        'PESI/sPESI can help with disposition after diagnosis',
      ],
    };
  },

  interpretationRanges: [
    {
      min: 0,
      max: 1,
      interpretation: {
        category: 'Low Probability',
        risk: 'low',
        mortality: 'PE prevalence: ~1.3%',
        recommendation: 'D-dimer. If negative, PE ruled out.',
      },
    },
    {
      min: 1.5,
      max: 6,
      interpretation: {
        category: 'Moderate Probability',
        risk: 'moderate',
        mortality: 'PE prevalence: ~16%',
        recommendation: 'Consider D-dimer or proceed to CTPA.',
      },
    },
    {
      min: 6.5,
      max: 12.5,
      interpretation: {
        category: 'High Probability',
        risk: 'high',
        mortality: 'PE prevalence: ~37-78%',
        recommendation: 'CTPA indicated. Consider empiric anticoagulation.',
        action: 'Immediate imaging',
      },
    },
  ],

  citations: [
    {
      authors: 'Wells PS, Anderson DR, Rodger M, et al.',
      title:
        'Derivation of a simple clinical model to categorize patients probability of pulmonary embolism: increasing the models utility with the SimpliRED D-dimer',
      journal: 'Thrombosis and Haemostasis',
      year: 2000,
      volume: '83(3):416-420',
      pmid: '10744147',
    },
    {
      authors: 'van Belle A, Büller HR, Huisman MV, et al.',
      title:
        'Effectiveness of managing suspected pulmonary embolism using an algorithm combining clinical probability, D-dimer testing, and computed tomography',
      journal: 'JAMA',
      year: 2006,
      volume: '295(2):172-179',
      doi: '10.1001/jama.295.2.172',
      pmid: '16403929',
    },
  ],

  validationStudy:
    'Christopher study validated algorithm; Wells + D-dimer safely rules out PE in low probability',

  notes: [
    'Two-tier version: ≤4 = PE unlikely, >4 = PE likely (used with D-dimer)',
    'Three-tier version used here: Low (0-1), Moderate (2-6), High (>6)',
    'PERC rule can be applied before Wells if gestalt is <15% probability',
    'Age-adjusted D-dimer (age × 10 ng/mL if >50 years) improves specificity',
  ],

  relatedCalculators: ['pesi', 'perc', 'wells-dvt'],

  snomedConcepts: ['59282003', '128053003'], // Pulmonary embolism, Deep vein thrombosis

  version: '1.0',
  lastUpdated: '2024-01-15',
};

export default wellsPE;
