/**
 * FRAMINGHAM RISK SCORE
 * =====================
 *
 * Estimates 10-year cardiovascular disease risk.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const framingham: ClinicalCalculator = {
  id: 'framingham',
  name: 'Framingham Risk Score',
  abbreviation: 'FRS',
  category: 'cardiology',
  description:
    'Estimates 10-year risk of developing cardiovascular disease based on traditional risk factors.',
  purpose:
    'The Framingham Risk Score guides primary prevention decisions by stratifying patients into low, intermediate, or high cardiovascular risk categories.',

  indications: [
    'Primary prevention risk assessment',
    'Guiding statin therapy decisions',
    'Patient counseling about CVD risk',
    'Adults 30-74 years without known CVD',
  ],

  contraindications: [
    'Known cardiovascular disease (use secondary prevention)',
    'Age <30 or >74 years',
    'Familial hypercholesterolemia (use different calculator)',
  ],

  inputs: [
    {
      id: 'age',
      label: 'Age (years)',
      type: 'number',
      validation: { min: 30, max: 74 },
      required: true,
    },
    {
      id: 'sex',
      label: 'Sex',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Female' },
        { value: 1, label: 'Male' },
      ],
    },
    {
      id: 'total_cholesterol',
      label: 'Total Cholesterol (mg/dL)',
      type: 'number',
      validation: { min: 100, max: 400 },
      required: true,
    },
    {
      id: 'hdl',
      label: 'HDL Cholesterol (mg/dL)',
      type: 'number',
      validation: { min: 20, max: 100 },
      required: true,
    },
    {
      id: 'systolic_bp',
      label: 'Systolic Blood Pressure (mmHg)',
      type: 'number',
      validation: { min: 90, max: 200 },
      required: true,
    },
    {
      id: 'bp_treated',
      label: 'On Blood Pressure Medication',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'smoker',
      label: 'Current Smoker',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'diabetes',
      label: 'Diabetes',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
  ],

  calculate: (inputs) => {
    // Simplified Framingham point system
    const age = inputs.age || 45;
    const isMale = inputs.sex === 1;
    const tc = inputs.total_cholesterol || 200;
    const hdl = inputs.hdl || 50;
    const sbp = inputs.systolic_bp || 120;
    const bpTreated = inputs.bp_treated === 1;
    const smoker = inputs.smoker === 1;
    const diabetes = inputs.diabetes === 1;

    let points = 0;

    if (isMale) {
      // Male point system
      // Age points
      if (age >= 30 && age <= 34) points += -1;
      else if (age >= 35 && age <= 39) points += 0;
      else if (age >= 40 && age <= 44) points += 1;
      else if (age >= 45 && age <= 49) points += 2;
      else if (age >= 50 && age <= 54) points += 3;
      else if (age >= 55 && age <= 59) points += 4;
      else if (age >= 60 && age <= 64) points += 5;
      else if (age >= 65 && age <= 69) points += 6;
      else if (age >= 70 && age <= 74) points += 7;

      // Total Cholesterol points (age-adjusted)
      if (age >= 30 && age <= 39) {
        if (tc < 160) points += 0;
        else if (tc < 200) points += 4;
        else if (tc < 240) points += 7;
        else if (tc < 280) points += 9;
        else points += 11;
      } else if (age >= 40 && age <= 49) {
        if (tc < 160) points += 0;
        else if (tc < 200) points += 3;
        else if (tc < 240) points += 5;
        else if (tc < 280) points += 6;
        else points += 8;
      } else if (age >= 50 && age <= 59) {
        if (tc < 160) points += 0;
        else if (tc < 200) points += 2;
        else if (tc < 240) points += 3;
        else if (tc < 280) points += 4;
        else points += 5;
      } else if (age >= 60 && age <= 69) {
        if (tc < 160) points += 0;
        else if (tc < 200) points += 1;
        else if (tc < 240) points += 1;
        else if (tc < 280) points += 2;
        else points += 3;
      } else {
        if (tc < 160) points += 0;
        else if (tc < 200) points += 0;
        else if (tc < 240) points += 0;
        else if (tc < 280) points += 1;
        else points += 1;
      }

      // HDL points
      if (hdl >= 60) points += -1;
      else if (hdl >= 50) points += 0;
      else if (hdl >= 40) points += 1;
      else points += 2;

      // Blood pressure points
      if (!bpTreated) {
        if (sbp < 120) points += 0;
        else if (sbp < 130) points += 0;
        else if (sbp < 140) points += 1;
        else if (sbp < 160) points += 1;
        else points += 2;
      } else {
        if (sbp < 120) points += 0;
        else if (sbp < 130) points += 1;
        else if (sbp < 140) points += 2;
        else if (sbp < 160) points += 2;
        else points += 3;
      }

      // Smoking
      if (smoker) {
        if (age >= 30 && age <= 39) points += 8;
        else if (age >= 40 && age <= 49) points += 5;
        else if (age >= 50 && age <= 59) points += 3;
        else if (age >= 60 && age <= 69) points += 1;
        else points += 1;
      }

      // Diabetes
      if (diabetes) points += 3;

    } else {
      // Female point system
      // Age points
      if (age >= 30 && age <= 34) points += -7;
      else if (age >= 35 && age <= 39) points += -3;
      else if (age >= 40 && age <= 44) points += 0;
      else if (age >= 45 && age <= 49) points += 3;
      else if (age >= 50 && age <= 54) points += 6;
      else if (age >= 55 && age <= 59) points += 8;
      else if (age >= 60 && age <= 64) points += 10;
      else if (age >= 65 && age <= 69) points += 12;
      else if (age >= 70 && age <= 74) points += 14;

      // Total Cholesterol points (age-adjusted)
      if (age >= 30 && age <= 39) {
        if (tc < 160) points += 0;
        else if (tc < 200) points += 4;
        else if (tc < 240) points += 8;
        else if (tc < 280) points += 11;
        else points += 13;
      } else if (age >= 40 && age <= 49) {
        if (tc < 160) points += 0;
        else if (tc < 200) points += 3;
        else if (tc < 240) points += 6;
        else if (tc < 280) points += 8;
        else points += 10;
      } else if (age >= 50 && age <= 59) {
        if (tc < 160) points += 0;
        else if (tc < 200) points += 2;
        else if (tc < 240) points += 4;
        else if (tc < 280) points += 5;
        else points += 7;
      } else if (age >= 60 && age <= 69) {
        if (tc < 160) points += 0;
        else if (tc < 200) points += 1;
        else if (tc < 240) points += 2;
        else if (tc < 280) points += 3;
        else points += 4;
      } else {
        if (tc < 160) points += 0;
        else if (tc < 200) points += 1;
        else if (tc < 240) points += 1;
        else if (tc < 280) points += 2;
        else points += 2;
      }

      // HDL points
      if (hdl >= 60) points += -1;
      else if (hdl >= 50) points += 0;
      else if (hdl >= 40) points += 1;
      else points += 2;

      // Blood pressure points
      if (!bpTreated) {
        if (sbp < 120) points += 0;
        else if (sbp < 130) points += 1;
        else if (sbp < 140) points += 2;
        else if (sbp < 160) points += 3;
        else points += 4;
      } else {
        if (sbp < 120) points += 0;
        else if (sbp < 130) points += 3;
        else if (sbp < 140) points += 4;
        else if (sbp < 160) points += 5;
        else points += 6;
      }

      // Smoking
      if (smoker) {
        if (age >= 30 && age <= 39) points += 9;
        else if (age >= 40 && age <= 49) points += 7;
        else if (age >= 50 && age <= 59) points += 4;
        else if (age >= 60 && age <= 69) points += 2;
        else points += 1;
      }

      // Diabetes
      if (diabetes) points += 6;
    }

    return points;
  },

  interpret: (score, inputs): ScoreInterpretation => {
    const isMale = inputs?.sex === 1;

    // Convert points to 10-year risk percentage
    let risk10yr: number;

    if (isMale) {
      if (score <= 0) risk10yr = 1;
      else if (score <= 4) risk10yr = 1;
      else if (score === 5) risk10yr = 2;
      else if (score === 6) risk10yr = 2;
      else if (score === 7) risk10yr = 3;
      else if (score === 8) risk10yr = 4;
      else if (score === 9) risk10yr = 5;
      else if (score === 10) risk10yr = 6;
      else if (score === 11) risk10yr = 8;
      else if (score === 12) risk10yr = 10;
      else if (score === 13) risk10yr = 12;
      else if (score === 14) risk10yr = 16;
      else if (score === 15) risk10yr = 20;
      else if (score === 16) risk10yr = 25;
      else risk10yr = 30;
    } else {
      if (score <= 9) risk10yr = 1;
      else if (score <= 12) risk10yr = 1;
      else if (score === 13) risk10yr = 2;
      else if (score === 14) risk10yr = 2;
      else if (score === 15) risk10yr = 3;
      else if (score === 16) risk10yr = 4;
      else if (score === 17) risk10yr = 5;
      else if (score === 18) risk10yr = 6;
      else if (score === 19) risk10yr = 8;
      else if (score === 20) risk10yr = 11;
      else if (score === 21) risk10yr = 14;
      else if (score === 22) risk10yr = 17;
      else if (score === 23) risk10yr = 22;
      else if (score === 24) risk10yr = 27;
      else risk10yr = 30;
    }

    if (risk10yr < 10) {
      return {
        score,
        category: 'Low Risk',
        risk: 'low',
        morbidity: `${risk10yr}% 10-year CVD risk`,
        recommendation: 'Low cardiovascular risk. Focus on lifestyle modifications.',
        action: 'Therapeutic lifestyle changes. Reassess in 5 years.',
        notes: [
          'Encourage healthy diet and regular exercise',
          'Maintain healthy weight',
          'Avoid tobacco use',
          'Moderate alcohol consumption',
          'Statin therapy generally not indicated at this risk level',
        ],
      };
    }
    if (risk10yr < 20) {
      return {
        score,
        category: 'Intermediate Risk',
        risk: 'moderate',
        morbidity: `${risk10yr}% 10-year CVD risk`,
        recommendation: 'Intermediate cardiovascular risk. Consider additional risk assessment.',
        action: 'Lifestyle modifications. Consider coronary calcium scoring for reclassification.',
        notes: [
          'Intensive lifestyle intervention',
          'Consider moderate-intensity statin therapy',
          'Control blood pressure to goal',
          'Consider aspirin if net benefit expected',
          'Coronary artery calcium score may help with shared decision-making',
        ],
      };
    }
    // risk10yr >= 20%
    return {
      score,
      category: 'High Risk',
      risk: 'high',
      morbidity: `${risk10yr}% 10-year CVD risk`,
      recommendation: 'High cardiovascular risk. Aggressive risk factor modification indicated.',
      action: 'High-intensity statin therapy. Aggressive risk factor control.',
      notes: [
        'High-intensity statin indicated',
        'Target LDL <70 mg/dL or >50% reduction',
        'Blood pressure control to <130/80',
        'Consider aspirin for primary prevention',
        'Diabetes control if applicable',
        'Smoking cessation is critical',
        'Consider referral to cardiology',
      ],
    };
  },

  interpretationRanges: [
    {
      min: -10,
      max: 10,
      interpretation: {
        category: 'Low Risk',
        risk: 'low',
        morbidity: '<10%',
        recommendation: 'Lifestyle modifications',
      },
    },
    {
      min: 11,
      max: 15,
      interpretation: {
        category: 'Intermediate Risk',
        risk: 'moderate',
        morbidity: '10-20%',
        recommendation: 'Consider statin therapy',
      },
    },
    {
      min: 16,
      max: 30,
      interpretation: {
        category: 'High Risk',
        risk: 'high',
        morbidity: '>20%',
        recommendation: 'Statin + aggressive control',
      },
    },
  ],

  citations: [
    {
      authors: 'D\'Agostino RB Sr, Vasan RS, Pencina MJ, et al.',
      title: 'General cardiovascular risk profile for use in primary care: the Framingham Heart Study',
      journal: 'Circulation',
      year: 2008,
      volume: '117(6):743-753',
      doi: '10.1161/CIRCULATIONAHA.107.699579',
      pmid: '18212285',
    },
    {
      authors: 'Wilson PW, D\'Agostino RB, Levy D, et al.',
      title: 'Prediction of coronary heart disease using risk factor categories',
      journal: 'Circulation',
      year: 1998,
      volume: '97(18):1837-1847',
      doi: '10.1161/01.cir.97.18.1837',
      pmid: '9603539',
    },
  ],

  validationStudy:
    'Derived from the Framingham Heart Study cohort. Validated in multiple populations. Foundation for subsequent CVD risk calculators.',

  notes: [
    'Original derivation cohort was predominantly white',
    'May underestimate risk in South Asians',
    'Consider family history as risk modifier',
    'ASCVD Risk Estimator may be preferred in US guidelines',
  ],
};
