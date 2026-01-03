/**
 * ASCVD RISK CALCULATOR
 * =====================
 *
 * Pooled Cohort Equations for 10-year ASCVD risk.
 * ACC/AHA guidelines standard.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const ascvd: ClinicalCalculator = {
  id: 'ascvd',
  name: 'ASCVD Risk Estimator (Pooled Cohort Equations)',
  abbreviation: 'ASCVD',
  category: 'cardiology',
  description:
    'Estimates 10-year risk of atherosclerotic cardiovascular disease using the ACC/AHA Pooled Cohort Equations.',
  purpose:
    'The ASCVD Risk Estimator guides primary prevention decisions and statin therapy initiation per ACC/AHA guidelines.',

  indications: [
    'Primary prevention risk assessment',
    'Guiding statin therapy decisions (ACC/AHA guidelines)',
    'Patient counseling about CVD risk',
    'Adults 40-79 years without known ASCVD',
  ],

  contraindications: [
    'Known atherosclerotic cardiovascular disease',
    'Age <40 or >79 years',
    'LDL ≥190 mg/dL (high-intensity statin indicated regardless)',
    'Diabetes mellitus ages 40-75 (moderate-intensity statin indicated)',
  ],

  inputs: [
    {
      id: 'age',
      label: 'Age (years)',
      type: 'number',
      validation: { min: 40, max: 79 },
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
      id: 'race',
      label: 'Race',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'White or Other' },
        { value: 1, label: 'African American' },
      ],
    },
    {
      id: 'total_cholesterol',
      label: 'Total Cholesterol (mg/dL)',
      type: 'number',
      validation: { min: 130, max: 320 },
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
      id: 'diabetes',
      label: 'Diabetes',
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
  ],

  calculate: (inputs) => {
    // Pooled Cohort Equations coefficients
    const age = inputs.age || 55;
    const isMale = inputs.sex === 1;
    const isAA = inputs.race === 1;
    const tc = inputs.total_cholesterol || 200;
    const hdl = inputs.hdl || 50;
    const sbp = inputs.systolic_bp || 120;
    const bpTreated = inputs.bp_treated === 1;
    const diabetes = inputs.diabetes === 1;
    const smoker = inputs.smoker === 1;

    // Coefficients for each group
    let coefficients: {
      lnAge: number;
      lnAge2: number;
      lnTC: number;
      lnAgeTC: number;
      lnHDL: number;
      lnAgeHDL: number;
      lnTreatedSBP: number;
      lnAgeTreatedSBP: number;
      lnUntreatedSBP: number;
      lnAgeUntreatedSBP: number;
      smoker: number;
      lnAgeSmoker: number;
      diabetes: number;
      baseline: number;
      meanCoeff: number;
    };

    if (isMale && !isAA) {
      // White Male
      coefficients = {
        lnAge: 12.344,
        lnAge2: 0,
        lnTC: 11.853,
        lnAgeTC: -2.664,
        lnHDL: -7.990,
        lnAgeHDL: 1.769,
        lnTreatedSBP: 1.797,
        lnAgeTreatedSBP: 0,
        lnUntreatedSBP: 1.764,
        lnAgeUntreatedSBP: 0,
        smoker: 7.837,
        lnAgeSmoker: -1.795,
        diabetes: 0.658,
        baseline: 0.9144,
        meanCoeff: 61.18,
      };
    } else if (isMale && isAA) {
      // African American Male
      coefficients = {
        lnAge: 2.469,
        lnAge2: 0,
        lnTC: 0.302,
        lnAgeTC: 0,
        lnHDL: -0.307,
        lnAgeHDL: 0,
        lnTreatedSBP: 1.916,
        lnAgeTreatedSBP: 0,
        lnUntreatedSBP: 1.809,
        lnAgeUntreatedSBP: 0,
        smoker: 0.549,
        lnAgeSmoker: 0,
        diabetes: 0.645,
        baseline: 0.8954,
        meanCoeff: 19.54,
      };
    } else if (!isMale && !isAA) {
      // White Female
      coefficients = {
        lnAge: -29.799,
        lnAge2: 4.884,
        lnTC: 13.540,
        lnAgeTC: -3.114,
        lnHDL: -13.578,
        lnAgeHDL: 3.149,
        lnTreatedSBP: 2.019,
        lnAgeTreatedSBP: 0,
        lnUntreatedSBP: 1.957,
        lnAgeUntreatedSBP: 0,
        smoker: 7.574,
        lnAgeSmoker: -1.665,
        diabetes: 0.661,
        baseline: 0.9665,
        meanCoeff: -29.18,
      };
    } else {
      // African American Female
      coefficients = {
        lnAge: 17.114,
        lnAge2: 0,
        lnTC: 0.940,
        lnAgeTC: 0,
        lnHDL: -18.920,
        lnAgeHDL: 4.475,
        lnTreatedSBP: 29.291,
        lnAgeTreatedSBP: -6.432,
        lnUntreatedSBP: 27.820,
        lnAgeUntreatedSBP: -6.087,
        smoker: 0.691,
        lnAgeSmoker: 0,
        diabetes: 0.874,
        baseline: 0.9533,
        meanCoeff: 86.61,
      };
    }

    // Calculate individual sum
    const lnAge = Math.log(age);
    const lnTC = Math.log(tc);
    const lnHDL = Math.log(hdl);
    const lnSBP = Math.log(sbp);

    let indSum = 0;
    indSum += coefficients.lnAge * lnAge;
    indSum += coefficients.lnAge2 * lnAge * lnAge;
    indSum += coefficients.lnTC * lnTC;
    indSum += coefficients.lnAgeTC * lnAge * lnTC;
    indSum += coefficients.lnHDL * lnHDL;
    indSum += coefficients.lnAgeHDL * lnAge * lnHDL;

    if (bpTreated) {
      indSum += coefficients.lnTreatedSBP * lnSBP;
      indSum += coefficients.lnAgeTreatedSBP * lnAge * lnSBP;
    } else {
      indSum += coefficients.lnUntreatedSBP * lnSBP;
      indSum += coefficients.lnAgeUntreatedSBP * lnAge * lnSBP;
    }

    if (smoker) {
      indSum += coefficients.smoker;
      indSum += coefficients.lnAgeSmoker * lnAge;
    }

    if (diabetes) {
      indSum += coefficients.diabetes;
    }

    // Calculate 10-year risk
    const risk = 1 - Math.pow(coefficients.baseline, Math.exp(indSum - coefficients.meanCoeff));

    // Return as percentage (multiply by 100 and round to 1 decimal)
    return Math.round(risk * 1000) / 10;
  },

  interpret: (score): ScoreInterpretation => {
    // Score is already the 10-year risk percentage
    const risk10yr = score;

    if (risk10yr < 5) {
      return {
        score,
        category: 'Low Risk',
        risk: 'low',
        morbidity: `${risk10yr.toFixed(1)}% 10-year ASCVD risk`,
        recommendation: 'Low cardiovascular risk. Emphasize lifestyle modifications.',
        action: 'Lifestyle counseling. Statin generally not recommended unless risk enhancers present.',
        notes: [
          'Focus on heart-healthy lifestyle',
          'Diet: Mediterranean or DASH pattern',
          'Exercise: 150+ minutes moderate activity/week',
          'Maintain healthy weight',
          'Avoid tobacco',
          'Reassess in 5-10 years',
        ],
      };
    }
    if (risk10yr < 7.5) {
      return {
        score,
        category: 'Borderline Risk',
        risk: 'low-moderate',
        morbidity: `${risk10yr.toFixed(1)}% 10-year ASCVD risk`,
        recommendation: 'Borderline risk. Consider risk-enhancing factors.',
        action: 'Risk discussion. If risk enhancers present, consider moderate-intensity statin.',
        notes: [
          'Review risk-enhancing factors:',
          '- Family history of premature ASCVD',
          '- LDL ≥160 mg/dL or elevated Lp(a)',
          '- Metabolic syndrome',
          '- CKD, chronic inflammatory conditions',
          '- History of preeclampsia or premature menopause',
          '- High-risk ethnicity (South Asian)',
          'Coronary artery calcium (CAC) scoring may help decision-making',
        ],
      };
    }
    if (risk10yr < 20) {
      return {
        score,
        category: 'Intermediate Risk',
        risk: 'moderate',
        morbidity: `${risk10yr.toFixed(1)}% 10-year ASCVD risk`,
        recommendation: 'Intermediate risk. Risk discussion about statin therapy.',
        action: 'Clinician-patient risk discussion. If decision uncertain, consider CAC scoring.',
        notes: [
          'Risk discussion should include:',
          '- Potential benefits of statin therapy',
          '- Potential adverse effects',
          '- Drug-drug interactions',
          '- Patient preferences',
          'If CAC = 0: Consider holding statin, repeat CAC in 5 years',
          'If CAC 1-99: Favors statin therapy',
          'If CAC ≥100: Statin indicated',
        ],
      };
    }
    // risk10yr >= 20%
    return {
      score,
      category: 'High Risk',
      risk: 'high',
      morbidity: `${risk10yr.toFixed(1)}% 10-year ASCVD risk`,
      recommendation: 'High cardiovascular risk. Statin therapy strongly recommended.',
      action: 'High-intensity statin therapy. Maximize lifestyle intervention.',
      notes: [
        'High-intensity statin indicated',
        'Goal: LDL reduction ≥50%',
        'Consider LDL goal <70 mg/dL',
        'Blood pressure control to <130/80',
        'If on statin and LDL ≥70 mg/dL, consider adding ezetimibe',
        'If very high risk, consider PCSK9 inhibitor',
        'Aspirin may be considered if no increased bleeding risk',
      ],
    };
  },

  interpretationRanges: [
    {
      min: 0,
      max: 4.9,
      interpretation: {
        category: 'Low Risk',
        risk: 'low',
        morbidity: '<5%',
        recommendation: 'Lifestyle counseling',
      },
    },
    {
      min: 5,
      max: 7.4,
      interpretation: {
        category: 'Borderline Risk',
        risk: 'low-moderate',
        morbidity: '5-7.5%',
        recommendation: 'Consider risk enhancers',
      },
    },
    {
      min: 7.5,
      max: 19.9,
      interpretation: {
        category: 'Intermediate Risk',
        risk: 'moderate',
        morbidity: '7.5-20%',
        recommendation: 'Risk discussion, consider statin',
      },
    },
    {
      min: 20,
      max: 100,
      interpretation: {
        category: 'High Risk',
        risk: 'high',
        morbidity: '≥20%',
        recommendation: 'Statin therapy indicated',
      },
    },
  ],

  citations: [
    {
      authors: 'Goff DC Jr, Lloyd-Jones DM, Bennett G, et al.',
      title: '2013 ACC/AHA guideline on the assessment of cardiovascular risk',
      journal: 'Circulation',
      year: 2014,
      volume: '129(25 Suppl 2):S49-73',
      doi: '10.1161/01.cir.0000437741.48606.98',
      pmid: '24222018',
    },
    {
      authors: 'Arnett DK, Blumenthal RS, Grundy SM, et al.',
      title: '2019 ACC/AHA Guideline on the Primary Prevention of Cardiovascular Disease',
      journal: 'Circulation',
      year: 2019,
      volume: '140(11):e596-e646',
      doi: '10.1161/CIR.0000000000000678',
      pmid: '30879355',
    },
  ],

  validationStudy:
    'Derived from pooled data from ARIC, CARDIA, CHS, and Framingham studies. Standard for ACC/AHA primary prevention guidelines.',

  notes: [
    'Based on Pooled Cohort Equations from ACC/AHA guidelines',
    'Validated for White and African American adults',
    'May overestimate risk in some populations',
    'Consider risk-enhancing factors and CAC scoring for borderline/intermediate risk',
    'Equations are race- and sex-specific',
  ],
};
