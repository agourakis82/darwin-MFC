/**
 * GAD-7 SCORE
 * ============
 *
 * Generalized Anxiety Disorder 7-item scale.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

const gad7Options = [
  { value: 0, label: 'Not at all', description: '0 days' },
  { value: 1, label: 'Several days', description: '1-7 days' },
  { value: 2, label: 'More than half the days', description: '8-11 days' },
  { value: 3, label: 'Nearly every day', description: '12-14 days' },
];

export const gad7: ClinicalCalculator = {
  id: 'gad-7',
  name: 'GAD-7 (Generalized Anxiety Disorder 7-item)',
  abbreviation: 'GAD-7',
  category: 'psychiatry',
  description:
    'Screens for generalized anxiety disorder and assesses severity.',
  purpose:
    'The GAD-7 is a validated screening tool for generalized anxiety disorder and monitoring treatment response.',

  indications: [
    'Anxiety screening in primary care',
    'Monitoring anxiety treatment response',
    'Assessing anxiety severity',
    'Part of routine mental health assessment',
  ],

  contraindications: [
    'Not diagnostic alone - clinical interview required',
    'Screens primarily for GAD - other anxiety disorders may be missed',
  ],

  inputs: [
    {
      id: 'nervous',
      label: '1. Feeling nervous, anxious, or on edge',
      type: 'radio',
      required: true,
      options: gad7Options,
      group: 'Over the last 2 weeks',
    },
    {
      id: 'control_worry',
      label: '2. Not being able to stop or control worrying',
      type: 'radio',
      required: true,
      options: gad7Options,
      group: 'Over the last 2 weeks',
    },
    {
      id: 'worry_much',
      label: '3. Worrying too much about different things',
      type: 'radio',
      required: true,
      options: gad7Options,
      group: 'Over the last 2 weeks',
    },
    {
      id: 'relax',
      label: '4. Trouble relaxing',
      type: 'radio',
      required: true,
      options: gad7Options,
      group: 'Over the last 2 weeks',
    },
    {
      id: 'restless',
      label: '5. Being so restless that it\'s hard to sit still',
      type: 'radio',
      required: true,
      options: gad7Options,
      group: 'Over the last 2 weeks',
    },
    {
      id: 'irritable',
      label: '6. Becoming easily annoyed or irritable',
      type: 'radio',
      required: true,
      options: gad7Options,
      group: 'Over the last 2 weeks',
    },
    {
      id: 'afraid',
      label: '7. Feeling afraid as if something awful might happen',
      type: 'radio',
      required: true,
      options: gad7Options,
      group: 'Over the last 2 weeks',
    },
  ],

  calculate: (inputs) => {
    return (
      (inputs.nervous || 0) +
      (inputs.control_worry || 0) +
      (inputs.worry_much || 0) +
      (inputs.relax || 0) +
      (inputs.restless || 0) +
      (inputs.irritable || 0) +
      (inputs.afraid || 0)
    );
  },

  interpret: (score): ScoreInterpretation => {
    if (score <= 4) {
      return {
        score,
        category: 'Minimal Anxiety',
        risk: 'very-low',
        recommendation: 'No treatment indicated.',
        action: 'Supportive care. Rescreen if clinical concern.',
      };
    }
    if (score <= 9) {
      return {
        score,
        category: 'Mild Anxiety',
        risk: 'low',
        recommendation: 'Watchful waiting. Repeat GAD-7 at follow-up.',
        action: 'Consider counseling. Relaxation techniques.',
        notes: [
          'May not require pharmacotherapy',
          'Psychoeducation helpful',
          'Lifestyle modifications (exercise, sleep hygiene)',
          'Follow-up in 2-4 weeks',
        ],
      };
    }
    if (score <= 14) {
      return {
        score,
        category: 'Moderate Anxiety',
        risk: 'moderate',
        recommendation: 'Treatment plan warranted.',
        action: 'Consider medication and/or CBT.',
        notes: [
          'SSRIs/SNRIs typically first-line',
          'CBT highly effective',
          'Consider psychiatry referral',
          'Follow-up in 2-4 weeks',
        ],
      };
    }
    // score >= 15
    return {
      score,
      category: 'Severe Anxiety',
      risk: 'high',
      recommendation: 'Active treatment required.',
      action: 'Pharmacotherapy + CBT. Consider psychiatry referral.',
      notes: [
        'High functional impairment likely',
        'Combination therapy most effective',
        'Screen for comorbid depression',
        'Close follow-up needed',
        'Consider benzodiazepine for acute symptom relief (short-term only)',
      ],
    };
  },

  interpretationRanges: [
    {
      min: 0,
      max: 4,
      interpretation: {
        category: 'Minimal',
        risk: 'very-low',
        recommendation: 'No treatment needed',
      },
    },
    {
      min: 5,
      max: 9,
      interpretation: {
        category: 'Mild',
        risk: 'low',
        recommendation: 'Watchful waiting',
      },
    },
    {
      min: 10,
      max: 14,
      interpretation: {
        category: 'Moderate',
        risk: 'moderate',
        recommendation: 'Treatment plan',
      },
    },
    {
      min: 15,
      max: 21,
      interpretation: {
        category: 'Severe',
        risk: 'high',
        recommendation: 'Active treatment',
      },
    },
  ],

  citations: [
    {
      authors: 'Spitzer RL, Kroenke K, Williams JB, Löwe B.',
      title:
        'A brief measure for assessing generalized anxiety disorder: the GAD-7',
      journal: 'Arch Intern Med',
      year: 2006,
      volume: '166(10):1092-1097',
      doi: '10.1001/archinte.166.10.1092',
      pmid: '16717171',
    },
  ],

  validationStudy:
    'Validated in 2,740 primary care patients. 89% sensitivity and 82% specificity for GAD at cutoff ≥10.',

  notes: [
    'Often used alongside PHQ-9 for comprehensive mental health screening',
    'Score of 10+ suggests clinically significant anxiety',
    'Useful for tracking treatment response',
  ],
};
