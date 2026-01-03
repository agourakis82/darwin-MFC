/**
 * CHILD-PUGH SCORE
 * =================
 *
 * Classification of cirrhosis severity.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const childPugh: ClinicalCalculator = {
  id: 'child-pugh',
  name: 'Child-Pugh Score for Cirrhosis Severity',
  abbreviation: 'Child-Pugh',
  category: 'hepatology',
  description:
    'Classifies severity of cirrhosis and predicts surgical mortality and prognosis.',
  purpose:
    'The Child-Pugh score classifies liver cirrhosis severity (A, B, or C) to guide treatment decisions and prognosis.',

  indications: [
    'Patients with known cirrhosis',
    'Pre-operative risk assessment in liver disease',
    'Prognosis in chronic liver disease',
    'Guiding therapy intensity',
  ],

  contraindications: [
    'Acute liver failure',
    'Patients without cirrhosis',
  ],

  inputs: [
    {
      id: 'bilirubin',
      label: 'Total Bilirubin',
      type: 'select',
      required: true,
      options: [
        { value: 1, label: '<2 mg/dL (<34 μmol/L)' },
        { value: 2, label: '2-3 mg/dL (34-50 μmol/L)' },
        { value: 3, label: '>3 mg/dL (>50 μmol/L)' },
      ],
    },
    {
      id: 'albumin',
      label: 'Serum Albumin',
      type: 'select',
      required: true,
      options: [
        { value: 1, label: '>3.5 g/dL' },
        { value: 2, label: '2.8-3.5 g/dL' },
        { value: 3, label: '<2.8 g/dL' },
      ],
    },
    {
      id: 'inr',
      label: 'INR',
      type: 'select',
      required: true,
      options: [
        { value: 1, label: '<1.7' },
        { value: 2, label: '1.7-2.3' },
        { value: 3, label: '>2.3' },
      ],
    },
    {
      id: 'ascites',
      label: 'Ascites',
      type: 'select',
      required: true,
      options: [
        { value: 1, label: 'None' },
        { value: 2, label: 'Mild/Moderate (responsive to diuretics)' },
        { value: 3, label: 'Severe (refractory)' },
      ],
    },
    {
      id: 'encephalopathy',
      label: 'Hepatic Encephalopathy',
      type: 'select',
      required: true,
      options: [
        { value: 1, label: 'None' },
        { value: 2, label: 'Grade I-II (or controlled with medication)' },
        { value: 3, label: 'Grade III-IV (or refractory)' },
      ],
    },
  ],

  calculate: (inputs) => {
    return (
      (inputs.bilirubin || 0) +
      (inputs.albumin || 0) +
      (inputs.inr || 0) +
      (inputs.ascites || 0) +
      (inputs.encephalopathy || 0)
    );
  },

  interpret: (score): ScoreInterpretation => {
    if (score <= 6) {
      return {
        score,
        scoreDisplay: `${score} (Class A)`,
        category: 'Class A - Well Compensated',
        risk: 'low',
        mortality: '10% 1-year mortality; 29% 2-year mortality',
        recommendation: 'Good hepatic function. Generally tolerate surgery well.',
        action: 'Standard care. Low perioperative risk.',
        notes: [
          '100% survival at 1 year',
          '85% survival at 2 years',
          'Abdominal surgery mortality: 10%',
        ],
      };
    }
    if (score <= 9) {
      return {
        score,
        scoreDisplay: `${score} (Class B)`,
        category: 'Class B - Significant Functional Compromise',
        risk: 'moderate',
        mortality: '30% 1-year mortality; 38% 2-year mortality',
        recommendation: 'Moderate hepatic impairment. Higher surgical risk.',
        action: 'Consider transplant evaluation. Optimize before any surgery.',
        notes: [
          '80% survival at 1 year',
          '60% survival at 2 years',
          'Abdominal surgery mortality: 30%',
        ],
      };
    }
    // score >= 10
    return {
      score,
      scoreDisplay: `${score} (Class C)`,
      category: 'Class C - Decompensated Disease',
      risk: 'high',
      mortality: '82% 1-year mortality; 88% 2-year mortality',
      recommendation:
        'Severe hepatic impairment. Very high surgical risk.',
      action:
        'Transplant evaluation urgent. Avoid elective surgery if possible.',
      notes: [
        '45% survival at 1 year',
        '35% survival at 2 years',
        'Abdominal surgery mortality: 82%',
      ],
    };
  },

  interpretationRanges: [
    {
      min: 5,
      max: 6,
      interpretation: {
        category: 'Class A',
        risk: 'low',
        mortality: '10% 1-yr',
        recommendation: 'Good prognosis',
      },
    },
    {
      min: 7,
      max: 9,
      interpretation: {
        category: 'Class B',
        risk: 'moderate',
        mortality: '30% 1-yr',
        recommendation: 'Consider transplant',
      },
    },
    {
      min: 10,
      max: 15,
      interpretation: {
        category: 'Class C',
        risk: 'high',
        mortality: '82% 1-yr',
        recommendation: 'Poor prognosis',
      },
    },
  ],

  citations: [
    {
      authors: 'Pugh RN, Murray-Lyon IM, Dawson JL, et al.',
      title:
        'Transection of the oesophagus for bleeding oesophageal varices',
      journal: 'Br J Surg',
      year: 1973,
      volume: '60(8):646-649',
      doi: '10.1002/bjs.1800600817',
      pmid: '4541913',
    },
  ],

  validationStudy:
    'Widely validated over 50 years. Standard classification for cirrhosis severity.',
};
