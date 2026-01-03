/**
 * APACHE II SCORE
 * ================
 *
 * Acute Physiology and Chronic Health Evaluation II.
 * ICU mortality prediction.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const apache2: ClinicalCalculator = {
  id: 'apache-ii',
  name: 'APACHE II Score',
  abbreviation: 'APACHE II',
  category: 'critical-care',
  description:
    'Predicts ICU mortality based on acute physiology, age, and chronic health status.',
  purpose:
    'APACHE II provides severity scoring for ICU patients to estimate mortality risk and guide resource allocation.',

  indications: [
    'ICU admission mortality prediction',
    'Severity stratification for clinical trials',
    'Quality benchmarking between ICUs',
    'Resource allocation decisions',
  ],

  contraindications: [
    'Burns patients (use specific burns scoring)',
    'Post-cardiac surgery (use specific scores)',
    'Score should be calculated within first 24 hours of ICU admission',
  ],

  inputs: [
    {
      id: 'temperature',
      label: 'Temperature (°C)',
      type: 'select',
      description: 'Highest or lowest rectal temperature',
      required: true,
      options: [
        { value: 4, label: '≥41°C or ≤29.9°C (+4)' },
        { value: 3, label: '39-40.9°C or 30-31.9°C (+3)' },
        { value: 2, label: '32-33.9°C (+2)' },
        { value: 1, label: '38.5-38.9°C or 34-35.9°C (+1)' },
        { value: 0, label: '36-38.4°C (0)' },
      ],
      group: 'Acute Physiology Score',
    },
    {
      id: 'map',
      label: 'Mean Arterial Pressure (mmHg)',
      type: 'select',
      required: true,
      options: [
        { value: 4, label: '≥160 or ≤49 (+4)' },
        { value: 3, label: '130-159 (+3)' },
        { value: 2, label: '110-129 or 50-69 (+2)' },
        { value: 0, label: '70-109 (0)' },
      ],
      group: 'Acute Physiology Score',
    },
    {
      id: 'heart_rate',
      label: 'Heart Rate (bpm)',
      type: 'select',
      required: true,
      options: [
        { value: 4, label: '≥180 or ≤39 (+4)' },
        { value: 3, label: '140-179 or 40-54 (+3)' },
        { value: 2, label: '110-139 or 55-69 (+2)' },
        { value: 0, label: '70-109 (0)' },
      ],
      group: 'Acute Physiology Score',
    },
    {
      id: 'respiratory_rate',
      label: 'Respiratory Rate',
      type: 'select',
      description: 'Non-ventilated or ventilated',
      required: true,
      options: [
        { value: 4, label: '≥50 or ≤5 (+4)' },
        { value: 3, label: '35-49 (+3)' },
        { value: 1, label: '25-34 or 6-9 (+1)' },
        { value: 0, label: '12-24 or 10-11 (0)' },
      ],
      group: 'Acute Physiology Score',
    },
    {
      id: 'oxygenation',
      label: 'Oxygenation',
      type: 'select',
      description: 'Use A-a gradient if FiO2 ≥0.5, or PaO2 if FiO2 <0.5',
      required: true,
      options: [
        { value: 4, label: 'A-a ≥500 or PaO2 <55 (+4)' },
        { value: 3, label: 'A-a 350-499 or PaO2 55-60 (+3)' },
        { value: 2, label: 'A-a 200-349 (+2)' },
        { value: 1, label: 'PaO2 61-70 (+1)' },
        { value: 0, label: 'A-a <200 or PaO2 >70 (0)' },
      ],
      group: 'Acute Physiology Score',
    },
    {
      id: 'arterial_ph',
      label: 'Arterial pH',
      type: 'select',
      required: true,
      options: [
        { value: 4, label: '≥7.70 or ≤7.15 (+4)' },
        { value: 3, label: '7.60-7.69 or 7.15-7.24 (+3)' },
        { value: 2, label: '7.50-7.59 (+2)' },
        { value: 1, label: '7.25-7.32 (+1)' },
        { value: 0, label: '7.33-7.49 (0)' },
      ],
      group: 'Acute Physiology Score',
    },
    {
      id: 'sodium',
      label: 'Serum Sodium (mEq/L)',
      type: 'select',
      required: true,
      options: [
        { value: 4, label: '≥180 or ≤110 (+4)' },
        { value: 3, label: '160-179 or 111-119 (+3)' },
        { value: 2, label: '155-159 or 120-129 (+2)' },
        { value: 1, label: '150-154 (+1)' },
        { value: 0, label: '130-149 (0)' },
      ],
      group: 'Acute Physiology Score',
    },
    {
      id: 'potassium',
      label: 'Serum Potassium (mEq/L)',
      type: 'select',
      required: true,
      options: [
        { value: 4, label: '≥7.0 or <2.5 (+4)' },
        { value: 3, label: '6.0-6.9 (+3)' },
        { value: 2, label: '2.5-2.9 (+2)' },
        { value: 1, label: '5.5-5.9 or 3.0-3.4 (+1)' },
        { value: 0, label: '3.5-5.4 (0)' },
      ],
      group: 'Acute Physiology Score',
    },
    {
      id: 'creatinine',
      label: 'Serum Creatinine (mg/dL)',
      type: 'select',
      description: 'Double points for acute renal failure',
      required: true,
      options: [
        { value: 4, label: '≥3.5 (+4, double if ARF)' },
        { value: 3, label: '2.0-3.4 (+3, double if ARF)' },
        { value: 2, label: '1.5-1.9 (+2, double if ARF)' },
        { value: 0, label: '0.6-1.4 (0)' },
        { value: 2, label: '<0.6 (+2)' },
      ],
      group: 'Acute Physiology Score',
    },
    {
      id: 'acute_renal_failure',
      label: 'Acute Renal Failure',
      type: 'boolean',
      description: 'Double creatinine points if ARF',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
      group: 'Acute Physiology Score',
    },
    {
      id: 'hematocrit',
      label: 'Hematocrit (%)',
      type: 'select',
      required: true,
      options: [
        { value: 4, label: '≥60 or <20 (+4)' },
        { value: 2, label: '50-59.9 or 20-29.9 (+2)' },
        { value: 1, label: '46-49.9 (+1)' },
        { value: 0, label: '30-45.9 (0)' },
      ],
      group: 'Acute Physiology Score',
    },
    {
      id: 'wbc',
      label: 'White Blood Cell Count (×1000/mm³)',
      type: 'select',
      required: true,
      options: [
        { value: 4, label: '≥40 or <1 (+4)' },
        { value: 2, label: '20-39.9 or 1-2.9 (+2)' },
        { value: 1, label: '15-19.9 (+1)' },
        { value: 0, label: '3-14.9 (0)' },
      ],
      group: 'Acute Physiology Score',
    },
    {
      id: 'gcs',
      label: 'Glasgow Coma Scale',
      type: 'select',
      description: 'If sedated, use pre-sedation GCS. Score = 15 - GCS',
      required: true,
      options: [
        { value: 0, label: 'GCS 15 (+0)' },
        { value: 1, label: 'GCS 14 (+1)' },
        { value: 2, label: 'GCS 13 (+2)' },
        { value: 3, label: 'GCS 12 (+3)' },
        { value: 4, label: 'GCS 11 (+4)' },
        { value: 5, label: 'GCS 10 (+5)' },
        { value: 6, label: 'GCS 9 (+6)' },
        { value: 7, label: 'GCS 8 (+7)' },
        { value: 8, label: 'GCS 7 (+8)' },
        { value: 9, label: 'GCS 6 (+9)' },
        { value: 10, label: 'GCS 5 (+10)' },
        { value: 11, label: 'GCS 4 (+11)' },
        { value: 12, label: 'GCS 3 (+12)' },
      ],
      group: 'Acute Physiology Score',
    },
    {
      id: 'age',
      label: 'Age (years)',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '<45 (+0)' },
        { value: 2, label: '45-54 (+2)' },
        { value: 3, label: '55-64 (+3)' },
        { value: 5, label: '65-74 (+5)' },
        { value: 6, label: '≥75 (+6)' },
      ],
      group: 'Age Points',
    },
    {
      id: 'chronic_health',
      label: 'Chronic Health Points',
      type: 'select',
      description: 'Severe organ insufficiency or immunocompromised',
      required: true,
      options: [
        { value: 0, label: 'None (+0)' },
        { value: 2, label: 'Non-operative or elective postop (+2)' },
        { value: 5, label: 'Emergency postop (+5)' },
      ],
      group: 'Chronic Health',
    },
  ],

  calculate: (inputs) => {
    let score = 0;

    // Acute Physiology Score (APS)
    score += inputs.temperature || 0;
    score += inputs.map || 0;
    score += inputs.heart_rate || 0;
    score += inputs.respiratory_rate || 0;
    score += inputs.oxygenation || 0;
    score += inputs.arterial_ph || 0;
    score += inputs.sodium || 0;
    score += inputs.potassium || 0;

    // Creatinine with ARF doubling
    let creatininePoints = inputs.creatinine || 0;
    if (inputs.acute_renal_failure === 1 && creatininePoints > 0) {
      creatininePoints *= 2;
    }
    score += creatininePoints;

    score += inputs.hematocrit || 0;
    score += inputs.wbc || 0;
    score += inputs.gcs || 0;

    // Age Points
    score += inputs.age || 0;

    // Chronic Health Points
    score += inputs.chronic_health || 0;

    return score;
  },

  interpret: (score): ScoreInterpretation => {
    // Approximate mortality rates by APACHE II score
    let mortalityPercent: number;
    if (score <= 4) mortalityPercent = 4;
    else if (score <= 9) mortalityPercent = 8;
    else if (score <= 14) mortalityPercent = 15;
    else if (score <= 19) mortalityPercent = 25;
    else if (score <= 24) mortalityPercent = 40;
    else if (score <= 29) mortalityPercent = 55;
    else if (score <= 34) mortalityPercent = 75;
    else mortalityPercent = 85;

    if (score <= 9) {
      return {
        score,
        category: 'Low Severity',
        risk: 'low',
        mortality: `~${mortalityPercent}% predicted mortality`,
        recommendation: 'Low severity illness. Standard ICU care.',
        action: 'Routine monitoring. Consider step-down if improving.',
        notes: [
          'Expected good outcomes with standard care',
          'Daily reassessment for ICU discharge',
          'Early mobility protocols',
        ],
      };
    }
    if (score <= 19) {
      return {
        score,
        category: 'Moderate Severity',
        risk: 'moderate',
        mortality: `~${mortalityPercent}% predicted mortality`,
        recommendation: 'Moderate severity illness. Close monitoring required.',
        action: 'Intensive monitoring. Optimize organ support.',
        notes: [
          'Close hemodynamic monitoring',
          'Early nutrition support',
          'Prophylaxis for DVT, stress ulcer',
          'Daily sedation vacation if ventilated',
        ],
      };
    }
    if (score <= 29) {
      return {
        score,
        category: 'High Severity',
        risk: 'high',
        mortality: `~${mortalityPercent}% predicted mortality`,
        recommendation: 'High severity illness. Aggressive intervention needed.',
        action: 'Maximize organ support. Goals of care discussion may be appropriate.',
        notes: [
          'Aggressive resuscitation',
          'Consider advanced therapies',
          'Family meeting for goals of care',
          'Daily multidisciplinary rounds',
        ],
      };
    }
    // score > 29
    return {
      score,
      category: 'Very High Severity',
      risk: 'critical',
      mortality: `~${mortalityPercent}% predicted mortality`,
      recommendation: 'Critical severity. Very high mortality risk.',
      action: 'Maximum support. Mandatory goals of care discussion.',
      notes: [
        'Expected mortality >55%',
        'Palliative care consultation',
        'Family meeting essential',
        'Consider limitations of treatment',
        'Document patient wishes',
      ],
    };
  },

  interpretationRanges: [
    {
      min: 0,
      max: 9,
      interpretation: {
        category: 'Low Severity',
        risk: 'low',
        mortality: '~4-8%',
        recommendation: 'Standard care',
      },
    },
    {
      min: 10,
      max: 19,
      interpretation: {
        category: 'Moderate Severity',
        risk: 'moderate',
        mortality: '~15-25%',
        recommendation: 'Intensive monitoring',
      },
    },
    {
      min: 20,
      max: 29,
      interpretation: {
        category: 'High Severity',
        risk: 'high',
        mortality: '~40-55%',
        recommendation: 'Maximum support',
      },
    },
    {
      min: 30,
      max: 71,
      interpretation: {
        category: 'Very High Severity',
        risk: 'critical',
        mortality: '>75%',
        recommendation: 'Goals of care discussion',
      },
    },
  ],

  citations: [
    {
      authors: 'Knaus WA, Draper EA, Wagner DP, Zimmerman JE.',
      title: 'APACHE II: a severity of disease classification system',
      journal: 'Crit Care Med',
      year: 1985,
      volume: '13(10):818-829',
      pmid: '3928249',
    },
  ],

  validationStudy:
    'Validated in >5,000 ICU admissions. Most widely used ICU severity score worldwide despite newer alternatives.',

  notes: [
    'Use worst values in first 24 hours of ICU admission',
    'Maximum possible score is 71',
    'Chronic health points apply only if severe organ insufficiency existed prior to admission',
    'APACHE III and IV exist but APACHE II remains most validated',
  ],
};
