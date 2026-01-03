/**
 * PHQ-9 SCORE
 * ============
 *
 * Patient Health Questionnaire-9 for depression screening.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

const phq9Options = [
  { value: 0, label: 'Not at all', description: '0 days' },
  { value: 1, label: 'Several days', description: '1-7 days' },
  { value: 2, label: 'More than half the days', description: '8-11 days' },
  { value: 3, label: 'Nearly every day', description: '12-14 days' },
];

export const phq9: ClinicalCalculator = {
  id: 'phq-9',
  name: 'PHQ-9 (Patient Health Questionnaire-9)',
  abbreviation: 'PHQ-9',
  category: 'psychiatry',
  description:
    'Screens for depression severity and monitors treatment response.',
  purpose:
    'The PHQ-9 is a validated tool for depression screening, diagnosis support, and monitoring treatment outcomes.',

  indications: [
    'Depression screening in primary care',
    'Monitoring depression treatment response',
    'Assessing depression severity',
    'Part of routine mental health assessment',
  ],

  contraindications: [
    'Not diagnostic alone - clinical interview required',
    'May need cultural adaptation',
  ],

  inputs: [
    {
      id: 'interest',
      label: '1. Little interest or pleasure in doing things',
      type: 'radio',
      required: true,
      options: phq9Options,
      group: 'Over the last 2 weeks',
    },
    {
      id: 'depressed',
      label: '2. Feeling down, depressed, or hopeless',
      type: 'radio',
      required: true,
      options: phq9Options,
      group: 'Over the last 2 weeks',
    },
    {
      id: 'sleep',
      label: '3. Trouble falling/staying asleep, or sleeping too much',
      type: 'radio',
      required: true,
      options: phq9Options,
      group: 'Over the last 2 weeks',
    },
    {
      id: 'energy',
      label: '4. Feeling tired or having little energy',
      type: 'radio',
      required: true,
      options: phq9Options,
      group: 'Over the last 2 weeks',
    },
    {
      id: 'appetite',
      label: '5. Poor appetite or overeating',
      type: 'radio',
      required: true,
      options: phq9Options,
      group: 'Over the last 2 weeks',
    },
    {
      id: 'failure',
      label: '6. Feeling bad about yourself — or that you are a failure',
      type: 'radio',
      required: true,
      options: phq9Options,
      group: 'Over the last 2 weeks',
    },
    {
      id: 'concentration',
      label: '7. Trouble concentrating on things',
      type: 'radio',
      required: true,
      options: phq9Options,
      group: 'Over the last 2 weeks',
    },
    {
      id: 'movement',
      label: '8. Moving or speaking slowly, or being fidgety/restless',
      type: 'radio',
      required: true,
      options: phq9Options,
      group: 'Over the last 2 weeks',
    },
    {
      id: 'suicidal',
      label: '9. Thoughts of self-harm or being better off dead',
      type: 'radio',
      required: true,
      options: phq9Options,
      group: 'Over the last 2 weeks',
    },
  ],

  calculate: (inputs) => {
    return (
      (inputs.interest || 0) +
      (inputs.depressed || 0) +
      (inputs.sleep || 0) +
      (inputs.energy || 0) +
      (inputs.appetite || 0) +
      (inputs.failure || 0) +
      (inputs.concentration || 0) +
      (inputs.movement || 0) +
      (inputs.suicidal || 0)
    );
  },

  interpret: (score, inputs): ScoreInterpretation => {
    const suicidalScore = inputs?.suicidal || 0;
    const baseInterpretation = getBaseInterpretation(score);

    // Add suicide risk warning if question 9 is positive
    if (suicidalScore > 0) {
      return {
        ...baseInterpretation,
        action: `${baseInterpretation.action} IMPORTANT: Patient endorsed suicidal ideation - requires immediate safety assessment.`,
        notes: [
          ...(baseInterpretation.notes || []),
          '⚠️ Question 9 positive - assess suicide risk immediately',
          'Consider safety planning and appropriate level of care',
        ],
      };
    }

    return baseInterpretation;
  },

  interpretationRanges: [
    {
      min: 0,
      max: 4,
      interpretation: {
        category: 'Minimal/None',
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
      max: 19,
      interpretation: {
        category: 'Moderately Severe',
        risk: 'high',
        recommendation: 'Active treatment',
      },
    },
    {
      min: 20,
      max: 27,
      interpretation: {
        category: 'Severe',
        risk: 'critical',
        recommendation: 'Immediate intervention',
      },
    },
  ],

  citations: [
    {
      authors: 'Kroenke K, Spitzer RL, Williams JB.',
      title:
        'The PHQ-9: validity of a brief depression severity measure',
      journal: 'J Gen Intern Med',
      year: 2001,
      volume: '16(9):606-613',
      doi: '10.1046/j.1525-1497.2001.016009606.x',
      pmid: '11556941',
    },
  ],

  validationStudy:
    'Validated in 6,000+ patients. 88% sensitivity and specificity for major depression at cutoff ≥10.',

  notes: [
    'Question 9 about self-harm requires immediate clinical attention if positive',
    'Score of 10+ suggests clinically significant depression',
    'Useful for tracking treatment response over time',
  ],
};

function getBaseInterpretation(score: number): ScoreInterpretation {
  if (score <= 4) {
    return {
      score,
      category: 'Minimal Depression',
      risk: 'very-low',
      recommendation: 'No treatment indicated.',
      action: 'Supportive care. Rescreen if clinical concern.',
    };
  }
  if (score <= 9) {
    return {
      score,
      category: 'Mild Depression',
      risk: 'low',
      recommendation: 'Watchful waiting. Repeat PHQ-9 at follow-up.',
      action: 'Consider counseling. Lifestyle modifications.',
      notes: [
        'May not require pharmacotherapy',
        'Psychoeducation helpful',
        'Follow-up in 2-4 weeks',
      ],
    };
  }
  if (score <= 14) {
    return {
      score,
      category: 'Moderate Depression',
      risk: 'moderate',
      recommendation: 'Treatment plan warranted.',
      action: 'Consider antidepressant and/or psychotherapy.',
      notes: [
        'SSRIs typically first-line',
        'Psychotherapy effective',
        'Follow-up in 2-4 weeks',
      ],
    };
  }
  if (score <= 19) {
    return {
      score,
      category: 'Moderately Severe Depression',
      risk: 'high',
      recommendation: 'Active treatment required.',
      action: 'Antidepressant and/or psychotherapy. Consider psychiatry referral.',
      notes: [
        'Close follow-up essential',
        'Combination therapy may be more effective',
        'Assess functional impairment',
      ],
    };
  }
  // score >= 20
  return {
    score,
    category: 'Severe Depression',
    risk: 'critical',
    recommendation: 'Immediate treatment intervention.',
    action: 'Antidepressant + psychotherapy. Psychiatry referral. Assess safety.',
    notes: [
      'High risk for functional impairment',
      'Consider hospitalization if safety concern',
      'Frequent follow-up needed',
    ],
  };
}
