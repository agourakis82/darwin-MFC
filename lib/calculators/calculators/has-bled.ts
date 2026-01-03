/**
 * HAS-BLED SCORE
 * ================
 *
 * Bleeding risk score for patients on anticoagulation.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const hasBled: ClinicalCalculator = {
  id: 'has-bled',
  name: 'HAS-BLED Score for Major Bleeding Risk',
  abbreviation: 'HAS-BLED',
  category: 'cardiology',
  description:
    'Estimates risk of major bleeding for patients on anticoagulation for atrial fibrillation.',
  purpose:
    'The HAS-BLED score helps identify modifiable bleeding risk factors and guides anticoagulation decisions.',

  indications: [
    'Patients on or being considered for anticoagulation',
    'Atrial fibrillation patients',
    'Assessing bleeding risk vs stroke risk',
    'Identifying modifiable risk factors',
  ],

  contraindications: [
    'Should not be used alone to withhold anticoagulation',
    'High HAS-BLED should prompt risk factor modification, not necessarily stopping anticoagulation',
  ],

  inputs: [
    {
      id: 'hypertension',
      label: 'Hypertension',
      type: 'boolean',
      description: 'Uncontrolled, SBP >160 mmHg',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'renal_disease',
      label: 'Abnormal Renal Function',
      type: 'boolean',
      description: 'Dialysis, transplant, Cr >2.26 mg/dL or >200 μmol/L',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'liver_disease',
      label: 'Abnormal Liver Function',
      type: 'boolean',
      description: 'Cirrhosis or Bilirubin >2x normal with AST/ALT/ALP >3x normal',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'stroke',
      label: 'Prior Stroke',
      type: 'boolean',
      description: 'History of stroke',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'bleeding',
      label: 'Prior Major Bleeding or Predisposition',
      type: 'boolean',
      description: 'Previous major bleed, anemia, or bleeding predisposition',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'labile_inr',
      label: 'Labile INR',
      type: 'boolean',
      description: 'Unstable/high INRs, TTR <60%',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'elderly',
      label: 'Age >65 years',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'drugs',
      label: 'Drugs Predisposing to Bleeding',
      type: 'boolean',
      description: 'Antiplatelet agents, NSAIDs',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'alcohol',
      label: 'Alcohol Use (≥8 drinks/week)',
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
      (inputs.hypertension || 0) +
      (inputs.renal_disease || 0) +
      (inputs.liver_disease || 0) +
      (inputs.stroke || 0) +
      (inputs.bleeding || 0) +
      (inputs.labile_inr || 0) +
      (inputs.elderly || 0) +
      (inputs.drugs || 0) +
      (inputs.alcohol || 0)
    );
  },

  interpret: (score): ScoreInterpretation => {
    if (score === 0) {
      return {
        score,
        category: 'Low Risk',
        risk: 'low',
        morbidity: '1.13 bleeds per 100 patient-years',
        recommendation: 'Low bleeding risk. Anticoagulation generally safe.',
        action: 'Proceed with anticoagulation if indicated.',
      };
    }
    if (score === 1) {
      return {
        score,
        category: 'Low-Moderate Risk',
        risk: 'low-moderate',
        morbidity: '1.02 bleeds per 100 patient-years',
        recommendation: 'Relatively low bleeding risk.',
        action: 'Anticoagulation appropriate with routine monitoring.',
      };
    }
    if (score === 2) {
      return {
        score,
        category: 'Moderate Risk',
        risk: 'moderate',
        morbidity: '1.88 bleeds per 100 patient-years',
        recommendation: 'Moderate bleeding risk. Address modifiable factors.',
        action: 'Consider modifiable risk factors. Closer follow-up.',
        notes: [
          'Control blood pressure',
          'Minimize NSAID/antiplatelet use',
          'Address alcohol use if applicable',
        ],
      };
    }
    // score >= 3
    return {
      score,
      category: 'High Risk',
      risk: 'high',
      morbidity: '3.74-12.5 bleeds per 100 patient-years',
      recommendation:
        'High bleeding risk. Carefully weigh benefits vs risks.',
      action:
        'Aggressively modify risk factors. Consider alternatives. Closer monitoring.',
      notes: [
        'Does NOT mean anticoagulation is contraindicated',
        'High HAS-BLED often parallels high stroke risk',
        'Focus on modifiable factors',
        'May consider DOAC over warfarin',
        'More frequent follow-up recommended',
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
        morbidity: '1.13/100 pt-yrs',
        recommendation: 'Anticoagulation safe',
      },
    },
    {
      min: 1,
      max: 1,
      interpretation: {
        category: 'Low-Moderate',
        risk: 'low-moderate',
        morbidity: '1.02/100 pt-yrs',
        recommendation: 'Routine monitoring',
      },
    },
    {
      min: 2,
      max: 2,
      interpretation: {
        category: 'Moderate Risk',
        risk: 'moderate',
        morbidity: '1.88/100 pt-yrs',
        recommendation: 'Address risk factors',
      },
    },
    {
      min: 3,
      max: 9,
      interpretation: {
        category: 'High Risk',
        risk: 'high',
        morbidity: '3.74+/100 pt-yrs',
        recommendation: 'Careful risk-benefit analysis',
      },
    },
  ],

  citations: [
    {
      authors: 'Pisters R, Lane DA, Nieuwlaat R, et al.',
      title:
        'A novel user-friendly score (HAS-BLED) to assess 1-year risk of major bleeding in patients with atrial fibrillation',
      journal: 'Chest',
      year: 2010,
      volume: '138(5):1093-1100',
      doi: '10.1378/chest.10-0134',
      pmid: '20299623',
    },
  ],

  validationStudy:
    'Validated in Euro Heart Survey with 3,978 AF patients.',
};
