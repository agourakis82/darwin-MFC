/**
 * MELD-Na SCORE
 * ==============
 *
 * Model for End-Stage Liver Disease with Sodium.
 * Used for liver transplant prioritization.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const meldNa: ClinicalCalculator = {
  id: 'meld-na',
  name: 'MELD-Na Score (Model for End-Stage Liver Disease)',
  abbreviation: 'MELD-Na',
  category: 'hepatology',
  description:
    'Predicts 90-day mortality in patients with end-stage liver disease. Used for liver transplant allocation.',
  purpose:
    'The MELD-Na score estimates survival in patients with chronic liver disease and prioritizes liver transplant allocation.',

  indications: [
    'End-stage liver disease assessment',
    'Liver transplant prioritization',
    'Prognosis in cirrhosis',
    'TIPS procedure risk assessment',
  ],

  contraindications: [
    'Acute liver failure (different scoring)',
    'Pediatric patients (<12 years)',
  ],

  inputs: [
    {
      id: 'creatinine',
      label: 'Creatinine',
      type: 'number',
      unit: 'mg/dL',
      description: 'Serum creatinine (capped at 4.0 mg/dL)',
      required: true,
      validation: {
        min: 0.1,
        max: 15,
      },
    },
    {
      id: 'bilirubin',
      label: 'Bilirubin',
      type: 'number',
      unit: 'mg/dL',
      description: 'Total bilirubin',
      required: true,
      validation: {
        min: 0.1,
        max: 50,
      },
    },
    {
      id: 'inr',
      label: 'INR',
      type: 'number',
      description: 'International Normalized Ratio',
      required: true,
      validation: {
        min: 0.5,
        max: 10,
        step: 0.1,
      },
    },
    {
      id: 'sodium',
      label: 'Sodium',
      type: 'number',
      unit: 'mEq/L',
      description: 'Serum sodium (125-137 mEq/L range used)',
      required: true,
      validation: {
        min: 100,
        max: 160,
      },
    },
    {
      id: 'dialysis',
      label: 'Dialysis at least twice in past week',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
  ],

  calculate: (inputs) => {
    // Cap and floor values per UNOS guidelines
    let creatinine = Math.max(1, Math.min(4, inputs.creatinine || 1));
    if (inputs.dialysis === 1) creatinine = 4;

    const bilirubin = Math.max(1, inputs.bilirubin || 1);
    const inr = Math.max(1, inputs.inr || 1);
    let sodium = inputs.sodium || 137;
    sodium = Math.max(125, Math.min(137, sodium));

    // MELD score calculation
    const meld =
      10 *
      (0.957 * Math.log(creatinine) +
        0.378 * Math.log(bilirubin) +
        1.12 * Math.log(inr) +
        0.643);

    // MELD-Na adjustment
    const meldNa =
      meld + 1.32 * (137 - sodium) - 0.033 * meld * (137 - sodium);

    return Math.round(Math.max(6, Math.min(40, meldNa)));
  },

  interpret: (score): ScoreInterpretation => {
    if (score <= 9) {
      return {
        score,
        category: 'Low',
        risk: 'low',
        mortality: '1.9% 90-day mortality',
        recommendation: 'Regular monitoring. Transplant evaluation if indicated.',
        action: 'Continue medical management.',
      };
    }
    if (score <= 19) {
      return {
        score,
        category: 'Moderate',
        risk: 'moderate',
        mortality: '6% 90-day mortality',
        recommendation: 'Consider transplant evaluation if not already listed.',
        action: 'Close monitoring. Optimize medical therapy.',
      };
    }
    if (score <= 29) {
      return {
        score,
        category: 'High',
        risk: 'high',
        mortality: '19.6% 90-day mortality',
        recommendation: 'Active transplant listing recommended.',
        action: 'Expedite transplant workup if eligible.',
      };
    }
    if (score <= 39) {
      return {
        score,
        category: 'Very High',
        risk: 'very-high',
        mortality: '52.6% 90-day mortality',
        recommendation: 'Urgent transplant consideration.',
        action: 'Priority listing. Consider living donor if available.',
      };
    }
    return {
      score,
      category: 'Critical',
      risk: 'critical',
      mortality: '71.3% 90-day mortality',
      recommendation: 'Critical condition. Maximum priority.',
      action: 'Highest priority for transplant. Intensive supportive care.',
    };
  },

  interpretationRanges: [
    {
      min: 6,
      max: 9,
      interpretation: {
        category: 'Low',
        risk: 'low',
        mortality: '1.9%',
        recommendation: 'Regular monitoring',
      },
    },
    {
      min: 10,
      max: 19,
      interpretation: {
        category: 'Moderate',
        risk: 'moderate',
        mortality: '6%',
        recommendation: 'Consider listing',
      },
    },
    {
      min: 20,
      max: 29,
      interpretation: {
        category: 'High',
        risk: 'high',
        mortality: '19.6%',
        recommendation: 'Active listing',
      },
    },
    {
      min: 30,
      max: 39,
      interpretation: {
        category: 'Very High',
        risk: 'very-high',
        mortality: '52.6%',
        recommendation: 'Urgent transplant',
      },
    },
    {
      min: 40,
      max: 40,
      interpretation: {
        category: 'Critical',
        risk: 'critical',
        mortality: '71.3%',
        recommendation: 'Maximum priority',
      },
    },
  ],

  citations: [
    {
      authors: 'Kim WR, Biggins SW, Kremers WK, et al.',
      title:
        'Hyponatremia and mortality among patients on the liver-transplant waiting list',
      journal: 'N Engl J Med',
      year: 2008,
      volume: '359(10):1018-1026',
      doi: '10.1056/NEJMoa0801209',
      pmid: '18768945',
    },
  ],

  validationStudy:
    'Validated in UNOS database. Now standard for US liver transplant allocation.',
};
