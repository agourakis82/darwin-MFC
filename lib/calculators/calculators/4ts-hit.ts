/**
 * 4Ts SCORE FOR HIT
 * ==================
 *
 * Pre-test probability for Heparin-Induced Thrombocytopenia.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const fourTsHit: ClinicalCalculator = {
  id: '4ts-hit',
  name: '4Ts Score for Heparin-Induced Thrombocytopenia',
  abbreviation: '4Ts HIT',
  category: 'hematology',
  description:
    'Estimates pre-test probability of heparin-induced thrombocytopenia (HIT).',
  purpose:
    'The 4Ts score helps clinicians determine the likelihood of HIT to guide further workup and treatment decisions.',

  indications: [
    'Suspected HIT in patients on heparin',
    'Thrombocytopenia during heparin therapy',
    'Determining need for HIT antibody testing',
  ],

  contraindications: [
    'Patients not exposed to heparin',
    'Clear alternative cause of thrombocytopenia',
  ],

  inputs: [
    {
      id: 'thrombocytopenia',
      label: 'Thrombocytopenia',
      type: 'select',
      description: 'Platelet count fall and nadir',
      required: true,
      options: [
        { value: 2, label: '>50% fall AND nadir ≥20,000' },
        { value: 1, label: '30-50% fall OR nadir 10,000-19,000' },
        { value: 0, label: '<30% fall OR nadir <10,000' },
      ],
    },
    {
      id: 'timing',
      label: 'Timing of Platelet Fall',
      type: 'select',
      description: 'Days after heparin exposure',
      required: true,
      options: [
        { value: 2, label: 'Days 5-10 OR ≤1 day with prior exposure within 30 days' },
        { value: 1, label: '>Day 10 OR ≤1 day with prior exposure 30-100 days ago' },
        { value: 0, label: '≤4 days without recent heparin exposure' },
      ],
    },
    {
      id: 'thrombosis',
      label: 'Thrombosis or Other Sequelae',
      type: 'select',
      description: 'New thrombosis, skin necrosis, or acute reaction',
      required: true,
      options: [
        { value: 2, label: 'Confirmed new thrombosis, skin necrosis, or acute systemic reaction' },
        { value: 1, label: 'Progressive or recurrent thrombosis, or non-necrotizing skin lesions' },
        { value: 0, label: 'None' },
      ],
    },
    {
      id: 'other_cause',
      label: 'Other Causes for Thrombocytopenia',
      type: 'select',
      description: 'Presence of other likely causes',
      required: true,
      options: [
        { value: 2, label: 'None evident' },
        { value: 1, label: 'Possible other cause' },
        { value: 0, label: 'Definite other cause present' },
      ],
    },
  ],

  calculate: (inputs) => {
    return (
      (inputs.thrombocytopenia || 0) +
      (inputs.timing || 0) +
      (inputs.thrombosis || 0) +
      (inputs.other_cause || 0)
    );
  },

  interpret: (score): ScoreInterpretation => {
    if (score <= 3) {
      return {
        score,
        category: 'Low Probability',
        risk: 'low',
        morbidity: '<5% probability of HIT',
        recommendation: 'HIT unlikely. Consider other causes.',
        action: 'HIT antibody testing generally not indicated. May continue heparin if clinically appropriate.',
        notes: [
          'Negative predictive value ~99%',
          'Look for alternative diagnoses',
          'Sepsis, DIC, drugs common alternatives',
        ],
      };
    }
    if (score <= 5) {
      return {
        score,
        category: 'Intermediate Probability',
        risk: 'moderate',
        morbidity: '~14% probability of HIT',
        recommendation: 'HIT possible. Testing indicated.',
        action: 'Send HIT antibody (PF4/heparin ELISA). Consider switching to non-heparin anticoagulant.',
        notes: [
          'Clinical decision based on test results and clinical context',
          'May need to stop heparin empirically',
          'Functional assay may be needed if ELISA positive',
        ],
      };
    }
    // score >= 6
    return {
      score,
      category: 'High Probability',
      risk: 'high',
      morbidity: '~64% probability of HIT',
      recommendation: 'HIT highly likely. Immediate action required.',
      action: 'Stop all heparin. Start alternative anticoagulant. Send HIT antibody testing.',
      notes: [
        'Do NOT wait for test results to treat',
        'Use argatroban, bivalirudin, or fondaparinux',
        'Avoid warfarin until platelets recover',
        'Screen for thrombosis (limb DVT ultrasound)',
        'Do not transfuse platelets',
      ],
    };
  },

  interpretationRanges: [
    {
      min: 0,
      max: 3,
      interpretation: {
        category: 'Low Probability',
        risk: 'low',
        morbidity: '<5%',
        recommendation: 'Testing not indicated',
      },
    },
    {
      min: 4,
      max: 5,
      interpretation: {
        category: 'Intermediate',
        risk: 'moderate',
        morbidity: '~14%',
        recommendation: 'Testing indicated',
      },
    },
    {
      min: 6,
      max: 8,
      interpretation: {
        category: 'High Probability',
        risk: 'high',
        morbidity: '~64%',
        recommendation: 'Stop heparin immediately',
      },
    },
  ],

  citations: [
    {
      authors: 'Lo GK, Juhl D, Warkentin TE, et al.',
      title:
        'Evaluation of pretest clinical score (4 T\'s) for the diagnosis of heparin-induced thrombocytopenia in two clinical settings',
      journal: 'J Thromb Haemost',
      year: 2006,
      volume: '4(4):759-765',
      doi: '10.1111/j.1538-7836.2006.01787.x',
      pmid: '16634744',
    },
  ],

  validationStudy:
    'Validated in multiple studies. Low score has excellent negative predictive value (99%).',
};
