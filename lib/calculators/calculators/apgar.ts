/**
 * APGAR SCORE
 * ============
 *
 * Newborn assessment score at birth.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const apgar: ClinicalCalculator = {
  id: 'apgar',
  name: 'APGAR Score for Newborns',
  abbreviation: 'APGAR',
  category: 'pediatrics',
  description:
    'Assesses newborn health at 1 and 5 minutes after birth.',
  purpose:
    'The APGAR score provides a standardized assessment of newborn condition immediately after birth to guide need for resuscitation.',

  indications: [
    'All newborns at 1 and 5 minutes after birth',
    'May repeat at 10, 15, 20 minutes if score remains low',
    'Standardized neonatal assessment',
  ],

  contraindications: [],

  inputs: [
    {
      id: 'appearance',
      label: 'Appearance (Skin Color)',
      type: 'select',
      description: 'A - Appearance',
      required: true,
      options: [
        { value: 0, label: 'Blue or pale all over' },
        { value: 1, label: 'Blue at extremities, body pink (acrocyanosis)' },
        { value: 2, label: 'Pink all over' },
      ],
    },
    {
      id: 'pulse',
      label: 'Pulse (Heart Rate)',
      type: 'select',
      description: 'P - Pulse',
      required: true,
      options: [
        { value: 0, label: 'Absent' },
        { value: 1, label: '<100 bpm' },
        { value: 2, label: '≥100 bpm' },
      ],
    },
    {
      id: 'grimace',
      label: 'Grimace (Reflex Irritability)',
      type: 'select',
      description: 'G - Grimace (response to stimulation)',
      required: true,
      options: [
        { value: 0, label: 'No response to stimulation' },
        { value: 1, label: 'Grimace/weak cry with stimulation' },
        { value: 2, label: 'Cry or pull away with stimulation' },
      ],
    },
    {
      id: 'activity',
      label: 'Activity (Muscle Tone)',
      type: 'select',
      description: 'A - Activity',
      required: true,
      options: [
        { value: 0, label: 'Limp, no movement' },
        { value: 1, label: 'Some flexion of extremities' },
        { value: 2, label: 'Active motion, good flexion' },
      ],
    },
    {
      id: 'respiration',
      label: 'Respiration',
      type: 'select',
      description: 'R - Respiration',
      required: true,
      options: [
        { value: 0, label: 'Absent' },
        { value: 1, label: 'Slow, irregular, weak cry' },
        { value: 2, label: 'Good, crying' },
      ],
    },
  ],

  calculate: (inputs) => {
    return (
      (inputs.appearance || 0) +
      (inputs.pulse || 0) +
      (inputs.grimace || 0) +
      (inputs.activity || 0) +
      (inputs.respiration || 0)
    );
  },

  interpret: (score): ScoreInterpretation => {
    if (score >= 7) {
      return {
        score,
        category: 'Normal',
        risk: 'low',
        recommendation: 'Reassuring. Routine newborn care.',
        action: 'Standard newborn care. Skin-to-skin contact. Initiate breastfeeding.',
        notes: [
          'Most healthy newborns score 7-10',
          'Score of 10 is rare (mild acrocyanosis is common)',
          'Continue routine monitoring',
        ],
      };
    }
    if (score >= 4) {
      return {
        score,
        category: 'Moderately Abnormal',
        risk: 'moderate',
        recommendation: 'May need some resuscitative measures.',
        action: 'Stimulation, clearing airway, possible supplemental oxygen.',
        notes: [
          'Continue resuscitation as needed',
          'Repeat APGAR at 5 minutes',
          'Most improve with basic interventions',
          'Call for additional help if not improving',
        ],
      };
    }
    // score < 4
    return {
      score,
      category: 'Low - Needs Immediate Intervention',
      risk: 'critical',
      recommendation: 'Immediate resuscitation required.',
      action: 'Initiate NRP. Ventilation, chest compressions, medications as indicated.',
      notes: [
        'Critical condition - full resuscitation team needed',
        'Follow Neonatal Resuscitation Program (NRP) guidelines',
        'Repeat APGAR at 5 and 10 minutes',
        'Document all interventions',
        '5-minute APGAR more predictive of outcomes',
      ],
    };
  },

  interpretationRanges: [
    {
      min: 7,
      max: 10,
      interpretation: {
        category: 'Normal',
        risk: 'low',
        recommendation: 'Routine care',
      },
    },
    {
      min: 4,
      max: 6,
      interpretation: {
        category: 'Moderately Abnormal',
        risk: 'moderate',
        recommendation: 'Some intervention needed',
      },
    },
    {
      min: 0,
      max: 3,
      interpretation: {
        category: 'Low',
        risk: 'critical',
        recommendation: 'Immediate resuscitation',
      },
    },
  ],

  citations: [
    {
      authors: 'Apgar V.',
      title: 'A proposal for a new method of evaluation of the newborn infant',
      journal: 'Curr Res Anesth Analg',
      year: 1953,
      volume: '32(4):260-267',
      pmid: '13083014',
    },
  ],

  validationStudy:
    'Used worldwide since 1953. Standard of care for newborn assessment.',

  notes: [
    'Score at 1 minute: reflects need for immediate resuscitation',
    'Score at 5 minutes: more predictive of outcomes',
    'Low scores should not be used alone to diagnose asphyxia',
  ],
};
