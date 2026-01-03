/**
 * MMSE (Mini-Mental State Examination)
 * =====================================
 *
 * Cognitive screening tool.
 * Note: The full MMSE is copyrighted. This is a simplified scoring guide.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const mmse: ClinicalCalculator = {
  id: 'mmse',
  name: 'MMSE (Mini-Mental State Examination)',
  abbreviation: 'MMSE',
  category: 'neurology',
  description:
    'Screens for cognitive impairment and dementia. Assesses orientation, memory, attention, language, and visuospatial skills.',
  purpose:
    'The MMSE provides a standardized cognitive assessment to screen for dementia and monitor cognitive decline.',

  indications: [
    'Dementia screening',
    'Cognitive impairment assessment',
    'Monitoring cognitive decline over time',
    'Delirium assessment (baseline comparison)',
  ],

  contraindications: [
    'Severe visual or hearing impairment affecting testing',
    'Acute delirium (may be used but interpret carefully)',
    'Language barrier',
    'Severe depression affecting effort',
  ],

  inputs: [
    {
      id: 'orientation_time',
      label: 'Orientation to Time (0-5)',
      type: 'select',
      description: 'Year, season, month, date, day of week (1 point each)',
      required: true,
      options: [
        { value: 0, label: '0 correct' },
        { value: 1, label: '1 correct' },
        { value: 2, label: '2 correct' },
        { value: 3, label: '3 correct' },
        { value: 4, label: '4 correct' },
        { value: 5, label: '5 correct (all)' },
      ],
      group: 'Orientation',
    },
    {
      id: 'orientation_place',
      label: 'Orientation to Place (0-5)',
      type: 'select',
      description: 'State, county, city, building, floor (1 point each)',
      required: true,
      options: [
        { value: 0, label: '0 correct' },
        { value: 1, label: '1 correct' },
        { value: 2, label: '2 correct' },
        { value: 3, label: '3 correct' },
        { value: 4, label: '4 correct' },
        { value: 5, label: '5 correct (all)' },
      ],
      group: 'Orientation',
    },
    {
      id: 'registration',
      label: 'Registration (0-3)',
      type: 'select',
      description: 'Repeat 3 objects (1 point each)',
      required: true,
      options: [
        { value: 0, label: '0 objects' },
        { value: 1, label: '1 object' },
        { value: 2, label: '2 objects' },
        { value: 3, label: '3 objects (all)' },
      ],
      group: 'Memory',
    },
    {
      id: 'attention',
      label: 'Attention/Calculation (0-5)',
      type: 'select',
      description: 'Serial 7s OR spell WORLD backwards (1 point each)',
      required: true,
      options: [
        { value: 0, label: '0 correct' },
        { value: 1, label: '1 correct' },
        { value: 2, label: '2 correct' },
        { value: 3, label: '3 correct' },
        { value: 4, label: '4 correct' },
        { value: 5, label: '5 correct (all)' },
      ],
      group: 'Attention',
    },
    {
      id: 'recall',
      label: 'Recall (0-3)',
      type: 'select',
      description: 'Recall 3 objects from earlier (1 point each)',
      required: true,
      options: [
        { value: 0, label: '0 objects' },
        { value: 1, label: '1 object' },
        { value: 2, label: '2 objects' },
        { value: 3, label: '3 objects (all)' },
      ],
      group: 'Memory',
    },
    {
      id: 'language_naming',
      label: 'Naming (0-2)',
      type: 'select',
      description: 'Name pencil and watch (1 point each)',
      required: true,
      options: [
        { value: 0, label: '0 correct' },
        { value: 1, label: '1 correct' },
        { value: 2, label: '2 correct (both)' },
      ],
      group: 'Language',
    },
    {
      id: 'language_repetition',
      label: 'Repetition (0-1)',
      type: 'select',
      description: 'Repeat "No ifs, ands, or buts"',
      required: true,
      options: [
        { value: 0, label: 'Incorrect' },
        { value: 1, label: 'Correct' },
      ],
      group: 'Language',
    },
    {
      id: 'language_command',
      label: '3-Stage Command (0-3)',
      type: 'select',
      description: '"Take paper, fold in half, put on floor" (1 point each step)',
      required: true,
      options: [
        { value: 0, label: '0 steps' },
        { value: 1, label: '1 step' },
        { value: 2, label: '2 steps' },
        { value: 3, label: '3 steps (all)' },
      ],
      group: 'Language',
    },
    {
      id: 'reading',
      label: 'Reading (0-1)',
      type: 'select',
      description: 'Read and obey "Close your eyes"',
      required: true,
      options: [
        { value: 0, label: 'Incorrect' },
        { value: 1, label: 'Correct' },
      ],
      group: 'Language',
    },
    {
      id: 'writing',
      label: 'Writing (0-1)',
      type: 'select',
      description: 'Write a sentence',
      required: true,
      options: [
        { value: 0, label: 'Unable/incorrect' },
        { value: 1, label: 'Writes meaningful sentence' },
      ],
      group: 'Language',
    },
    {
      id: 'copying',
      label: 'Copying (0-1)',
      type: 'select',
      description: 'Copy intersecting pentagons',
      required: true,
      options: [
        { value: 0, label: 'Incorrect' },
        { value: 1, label: 'Correct (10 angles, 2 intersecting)' },
      ],
      group: 'Visuospatial',
    },
  ],

  calculate: (inputs) => {
    return (
      (inputs.orientation_time || 0) +
      (inputs.orientation_place || 0) +
      (inputs.registration || 0) +
      (inputs.attention || 0) +
      (inputs.recall || 0) +
      (inputs.language_naming || 0) +
      (inputs.language_repetition || 0) +
      (inputs.language_command || 0) +
      (inputs.reading || 0) +
      (inputs.writing || 0) +
      (inputs.copying || 0)
    );
  },

  interpret: (score): ScoreInterpretation => {
    if (score >= 24) {
      return {
        score,
        category: 'Normal Cognition',
        risk: 'low',
        recommendation: 'No significant cognitive impairment detected.',
        action: 'No immediate intervention needed. Repeat if clinical concern.',
        notes: [
          'Score ≥24 generally considered normal',
          'Consider education level (higher cutoffs for higher education)',
          'Age and cultural factors may affect interpretation',
        ],
      };
    }
    if (score >= 19) {
      return {
        score,
        category: 'Mild Cognitive Impairment',
        risk: 'moderate',
        recommendation: 'Mild cognitive impairment likely. Further evaluation recommended.',
        action: 'Consider more detailed neuropsychological testing. Evaluate for reversible causes.',
        notes: [
          'Rule out depression, medication effects, metabolic causes',
          'Check B12, thyroid, CBC',
          'Consider MRI brain',
          'Discuss driving safety',
        ],
      };
    }
    if (score >= 10) {
      return {
        score,
        category: 'Moderate Cognitive Impairment',
        risk: 'high',
        recommendation: 'Moderate dementia likely. Comprehensive evaluation needed.',
        action: 'Neurology/geriatrics referral. Imaging and labs. Safety assessment.',
        notes: [
          'Likely needs assistance with complex ADLs',
          'Assess caregiver support',
          'Discuss advance directives',
          'Consider cholinesterase inhibitors',
          'Safety evaluation (driving, finances, wandering)',
        ],
      };
    }
    // score < 10
    return {
      score,
      category: 'Severe Cognitive Impairment',
      risk: 'critical',
      recommendation: 'Severe dementia. Requires significant care support.',
      action: 'Full care needs assessment. Long-term care planning.',
      notes: [
        'Needs assistance with basic ADLs',
        'Caregiver support essential',
        'Consider palliative care goals',
        'Safety is primary concern',
        'Behavioral management may be needed',
      ],
    };
  },

  interpretationRanges: [
    {
      min: 24,
      max: 30,
      interpretation: {
        category: 'Normal',
        risk: 'low',
        recommendation: 'No impairment',
      },
    },
    {
      min: 19,
      max: 23,
      interpretation: {
        category: 'Mild Impairment',
        risk: 'moderate',
        recommendation: 'Further evaluation',
      },
    },
    {
      min: 10,
      max: 18,
      interpretation: {
        category: 'Moderate Impairment',
        risk: 'high',
        recommendation: 'Dementia likely',
      },
    },
    {
      min: 0,
      max: 9,
      interpretation: {
        category: 'Severe Impairment',
        risk: 'critical',
        recommendation: 'Severe dementia',
      },
    },
  ],

  citations: [
    {
      authors: 'Folstein MF, Folstein SE, McHugh PR.',
      title: '"Mini-mental state". A practical method for grading the cognitive state of patients for the clinician',
      journal: 'J Psychiatr Res',
      year: 1975,
      volume: '12(3):189-198',
      doi: '10.1016/0022-3956(75)90026-6',
      pmid: '1202204',
    },
  ],

  validationStudy:
    'Most widely used cognitive screening tool. Sensitivity 79%, specificity 100% for dementia at cutoff 23/24.',

  notes: [
    'Maximum score is 30',
    'Adjust cutoffs for education level',
    'Not sensitive for mild cognitive impairment or frontal dysfunction',
    'Consider MoCA for better sensitivity in mild cases',
  ],
};
