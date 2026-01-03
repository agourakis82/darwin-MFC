/**
 * CHA₂DS₂-VASc Score
 * ==================
 *
 * Risk stratification for stroke in patients with atrial fibrillation.
 * Guides anticoagulation decision-making.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const cha2ds2vasc: ClinicalCalculator = {
  id: 'cha2ds2-vasc',
  name: 'CHA₂DS₂-VASc Score for Atrial Fibrillation Stroke Risk',
  abbreviation: 'CHA₂DS₂-VASc',
  category: 'cardiology',
  description:
    'Calculates stroke risk in patients with atrial fibrillation to guide anticoagulation therapy.',
  purpose:
    'CHA₂DS₂-VASc is the recommended tool for stroke risk assessment in AF. It helps identify patients who would benefit from anticoagulation and those at low enough risk to forgo it.',
  indications: [
    'Atrial fibrillation (AF) or atrial flutter',
    'Deciding whether to initiate anticoagulation',
    'Annual risk reassessment in AF patients',
  ],
  contraindications: [
    'Not applicable for other causes of stroke risk',
    'Should be used alongside bleeding risk assessment (HAS-BLED)',
  ],

  inputs: [
    {
      id: 'chf',
      label: 'Congestive Heart Failure',
      type: 'boolean',
      required: true,
      description: 'History of CHF or objective evidence of LV dysfunction (EF ≤40%)',
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes (+1)' },
      ],
    },
    {
      id: 'hypertension',
      label: 'Hypertension',
      type: 'boolean',
      required: true,
      description: 'Resting BP >140/90 mmHg on ≥2 occasions or current antihypertensive treatment',
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes (+1)' },
      ],
    },
    {
      id: 'age',
      label: 'Age',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '<65 years' },
        { value: 1, label: '65-74 years (+1)' },
        { value: 2, label: '≥75 years (+2)' },
      ],
    },
    {
      id: 'diabetes',
      label: 'Diabetes Mellitus',
      type: 'boolean',
      required: true,
      description: 'Fasting glucose ≥126 mg/dL or treatment with oral hypoglycemics/insulin',
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes (+1)' },
      ],
    },
    {
      id: 'stroke',
      label: 'Stroke/TIA/Thromboembolism',
      type: 'boolean',
      required: true,
      description: 'Prior stroke, TIA, or systemic thromboembolism',
      options: [
        { value: 0, label: 'No' },
        { value: 2, label: 'Yes (+2)' },
      ],
    },
    {
      id: 'vascular',
      label: 'Vascular Disease',
      type: 'boolean',
      required: true,
      description: 'Prior MI, peripheral artery disease, or aortic plaque',
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes (+1)' },
      ],
    },
    {
      id: 'sex',
      label: 'Sex Category',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Male' },
        { value: 1, label: 'Female (+1)' },
      ],
    },
  ],

  calculate: (inputs) => {
    return (
      (inputs.chf || 0) +
      (inputs.hypertension || 0) +
      (inputs.age || 0) +
      (inputs.diabetes || 0) +
      (inputs.stroke || 0) +
      (inputs.vascular || 0) +
      (inputs.sex || 0)
    );
  },

  interpret: (score, inputs): ScoreInterpretation => {
    const isMale = inputs?.sex === 0;

    // Annual stroke risk percentages
    const strokeRisk: Record<number, string> = {
      0: '0%',
      1: '1.3%',
      2: '2.2%',
      3: '3.2%',
      4: '4.0%',
      5: '6.7%',
      6: '9.8%',
      7: '9.6%',
      8: '12.5%',
      9: '15.2%',
    };

    const risk = strokeRisk[score] || '>15%';

    if (score === 0) {
      return {
        score,
        category: 'Low Risk',
        risk: 'very-low',
        mortality: `Annual stroke risk: ${risk}`,
        recommendation: isMale
          ? 'Low risk. Anticoagulation is generally not recommended. No antithrombotic therapy or aspirin may be considered.'
          : 'Score of 0 in females without other risk factors = low risk. No anticoagulation generally needed.',
        notes: [
          'Female sex alone does not necessitate anticoagulation',
          'Reassess risk factors annually',
        ],
      };
    }

    if (score === 1) {
      return {
        score,
        category: isMale ? 'Low-Moderate Risk' : 'Low Risk (Female only)',
        risk: 'low-moderate',
        mortality: `Annual stroke risk: ${risk}`,
        recommendation: isMale
          ? 'Oral anticoagulation should be considered. Balance stroke prevention against bleeding risk (HAS-BLED).'
          : 'If the only point is female sex, actual risk is low. No anticoagulation generally needed.',
        notes: [
          'ESC guidelines: Consider OAC for males with score 1',
          'NOACs preferred over warfarin unless contraindicated',
        ],
      };
    }

    // Score ≥2
    return {
      score,
      category: score >= 4 ? 'High Risk' : 'Moderate Risk',
      risk: score >= 4 ? 'high' : 'moderate',
      mortality: `Annual stroke risk: ${risk}`,
      recommendation:
        'Oral anticoagulation is recommended. Use HAS-BLED to assess bleeding risk but anticoagulation generally warranted.',
      action: 'Initiate anticoagulation (NOAC preferred unless mechanical valve or moderate-severe mitral stenosis)',
      notes: [
        'NOACs preferred over warfarin for most patients',
        'If warfarin: target INR 2.0-3.0',
        'Assess bleeding risk with HAS-BLED but high HAS-BLED is rarely reason to avoid anticoagulation',
        score >= 4 ? 'High risk - anticoagulation strongly indicated' : '',
      ].filter(Boolean),
    };
  },

  interpretationRanges: [
    {
      min: 0,
      max: 0,
      interpretation: {
        category: 'Low Risk',
        risk: 'very-low',
        mortality: 'Annual stroke risk: 0%',
        recommendation: 'No anticoagulation generally recommended.',
      },
    },
    {
      min: 1,
      max: 1,
      interpretation: {
        category: 'Low-Moderate Risk',
        risk: 'low-moderate',
        mortality: 'Annual stroke risk: 1.3%',
        recommendation: 'Consider anticoagulation in males. Assess bleeding risk.',
      },
    },
    {
      min: 2,
      max: 3,
      interpretation: {
        category: 'Moderate Risk',
        risk: 'moderate',
        mortality: 'Annual stroke risk: 2.2-3.2%',
        recommendation: 'Anticoagulation recommended.',
      },
    },
    {
      min: 4,
      max: 9,
      interpretation: {
        category: 'High Risk',
        risk: 'high',
        mortality: 'Annual stroke risk: 4-15%+',
        recommendation: 'Anticoagulation strongly recommended.',
        action: 'Initiate NOAC or warfarin',
      },
    },
  ],

  citations: [
    {
      authors: 'Lip GY, Nieuwlaat R, Pisters R, et al.',
      title:
        'Refining clinical risk stratification for predicting stroke and thromboembolism in atrial fibrillation using a novel risk factor-based approach: the Euro Heart Survey on atrial fibrillation',
      journal: 'Chest',
      year: 2010,
      volume: '137(2):263-272',
      doi: '10.1378/chest.09-1584',
      pmid: '19762550',
    },
    {
      authors: 'Hindricks G, Potpara T, Dagres N, et al.',
      title:
        '2020 ESC Guidelines for the diagnosis and management of atrial fibrillation',
      journal: 'European Heart Journal',
      year: 2021,
      volume: '42(5):373-498',
      doi: '10.1093/eurheartj/ehaa612',
      pmid: '32860505',
    },
  ],

  validationStudy:
    'Validated in multiple large cohorts; recommended by ESC, AHA/ACC/HRS guidelines',

  notes: [
    'Female sex alone (score of 1) does not warrant anticoagulation',
    'Score applies to non-valvular AF (not mechanical valves or moderate-severe mitral stenosis)',
    'Always assess bleeding risk with HAS-BLED alongside stroke risk',
    'Reassess annually as risk factors may change',
  ],

  relatedCalculators: ['has-bled', 'chads2', 'heart-score'],

  snomedConcepts: ['49436004', '230690007'], // Atrial fibrillation, Stroke

  version: '1.0',
  lastUpdated: '2024-01-15',
};

export default cha2ds2vasc;
