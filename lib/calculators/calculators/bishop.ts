/**
 * BISHOP SCORE
 * =============
 *
 * Cervical favorability for labor induction.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const bishop: ClinicalCalculator = {
  id: 'bishop',
  name: 'Bishop Score for Cervical Favorability',
  abbreviation: 'Bishop',
  category: 'obstetrics',
  description:
    'Assesses cervical readiness for labor induction and predicts likelihood of vaginal delivery.',
  purpose:
    'The Bishop score helps determine the likelihood of successful labor induction based on cervical examination findings.',

  indications: [
    'Pre-induction cervical assessment',
    'Predicting success of labor induction',
    'Planning induction method',
  ],

  contraindications: [
    'Contraindications to vaginal delivery',
    'Not applicable if cervix cannot be examined',
  ],

  inputs: [
    {
      id: 'dilation',
      label: 'Cervical Dilation',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Closed (0 cm)' },
        { value: 1, label: '1-2 cm' },
        { value: 2, label: '3-4 cm' },
        { value: 3, label: '≥5 cm' },
      ],
    },
    {
      id: 'effacement',
      label: 'Cervical Effacement',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '0-30%' },
        { value: 1, label: '40-50%' },
        { value: 2, label: '60-70%' },
        { value: 3, label: '≥80%' },
      ],
    },
    {
      id: 'station',
      label: 'Fetal Station',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '-3' },
        { value: 1, label: '-2' },
        { value: 2, label: '-1, 0' },
        { value: 3, label: '+1, +2' },
      ],
    },
    {
      id: 'consistency',
      label: 'Cervical Consistency',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Firm' },
        { value: 1, label: 'Medium' },
        { value: 2, label: 'Soft' },
      ],
    },
    {
      id: 'position',
      label: 'Cervical Position',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Posterior' },
        { value: 1, label: 'Mid-position' },
        { value: 2, label: 'Anterior' },
      ],
    },
  ],

  calculate: (inputs) => {
    return (
      (inputs.dilation || 0) +
      (inputs.effacement || 0) +
      (inputs.station || 0) +
      (inputs.consistency || 0) +
      (inputs.position || 0)
    );
  },

  interpret: (score): ScoreInterpretation => {
    if (score <= 4) {
      return {
        score,
        category: 'Unfavorable Cervix',
        risk: 'high',
        recommendation: 'Low likelihood of successful induction. Consider cervical ripening.',
        action: 'Cervical ripening agents (prostaglandins, mechanical methods) may be needed before oxytocin.',
        notes: [
          'Higher risk of failed induction',
          'Longer induction process expected',
          'Consider prostaglandin E2 (dinoprostone) or misoprostol',
          'Foley catheter is mechanical alternative',
          'Discuss risks and alternatives with patient',
        ],
      };
    }
    if (score <= 6) {
      return {
        score,
        category: 'Intermediate',
        risk: 'moderate',
        recommendation: 'Moderate likelihood of successful induction.',
        action: 'May benefit from cervical ripening or may proceed to induction.',
        notes: [
          'Clinical judgment important',
          'Consider patient factors and urgency',
          'Ripening may shorten induction time',
        ],
      };
    }
    // score >= 7
    return {
      score,
      category: 'Favorable Cervix',
      risk: 'low',
      recommendation: 'High likelihood of successful vaginal delivery.',
      action: 'Proceed with induction (oxytocin, amniotomy as appropriate).',
      notes: [
        'Good prognosis for vaginal delivery',
        'Oxytocin induction typically effective',
        'Similar to spontaneous labor success rates',
      ],
    };
  },

  interpretationRanges: [
    {
      min: 0,
      max: 4,
      interpretation: {
        category: 'Unfavorable',
        risk: 'high',
        recommendation: 'Cervical ripening needed',
      },
    },
    {
      min: 5,
      max: 6,
      interpretation: {
        category: 'Intermediate',
        risk: 'moderate',
        recommendation: 'Consider ripening',
      },
    },
    {
      min: 7,
      max: 13,
      interpretation: {
        category: 'Favorable',
        risk: 'low',
        recommendation: 'Proceed with induction',
      },
    },
  ],

  citations: [
    {
      authors: 'Bishop EH.',
      title: 'Pelvic scoring for elective induction',
      journal: 'Obstet Gynecol',
      year: 1964,
      volume: '24:266-268',
      pmid: '14199536',
    },
  ],

  validationStudy:
    'Original study and subsequent validations confirm predictive value for induction success.',
};
