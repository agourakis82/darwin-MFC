/**
 * NEWS2 (National Early Warning Score 2)
 * =======================================
 *
 * UK national standard for detecting and responding to clinical deterioration.
 * Updated version includes specific SpO2 scale for patients at risk of hypercapnic respiratory failure.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const news2: ClinicalCalculator = {
  id: 'news2',
  name: 'National Early Warning Score 2',
  abbreviation: 'NEWS2',
  category: 'critical-care',
  description:
    'Standardized assessment of acute illness severity used across the UK NHS to detect clinical deterioration.',
  purpose:
    'NEWS2 helps identify patients at risk of deterioration. It triggers escalation of care based on aggregate score or individual parameter abnormalities.',
  indications: [
    'Routine assessment of hospitalized patients',
    'Detection of early clinical deterioration',
    'Standardizing clinical communication about patient status',
    'Triggering appropriate clinical response',
  ],
  contraindications: [
    'Not validated in pediatric populations',
    'Modified scales may be needed for specific conditions',
  ],

  inputs: [
    {
      id: 'respiratoryRate',
      label: 'Respiratory Rate (breaths/min)',
      type: 'select',
      required: true,
      group: 'Respiratory',
      options: [
        { value: 3, label: '≤8' },
        { value: 1, label: '9-11' },
        { value: 0, label: '12-20' },
        { value: 2, label: '21-24' },
        { value: 3, label: '≥25' },
      ],
    },
    {
      id: 'spo2Scale',
      label: 'SpO2 Scale',
      type: 'select',
      required: true,
      group: 'Respiratory',
      description:
        'Scale 2 for patients at risk of hypercapnic respiratory failure (COPD, etc.)',
      options: [
        { value: 0, label: 'Scale 1 (Standard)' },
        { value: 1, label: 'Scale 2 (Hypercapnia risk)' },
      ],
    },
    {
      id: 'spo2',
      label: 'SpO2 (%)',
      type: 'select',
      required: true,
      group: 'Respiratory',
      description: 'Oxygen saturation. Score depends on scale selected above.',
      options: [
        { value: 3, label: '≤91% (Scale 1) / ≤83% (Scale 2)' },
        { value: 2, label: '92-93% (Scale 1) / 84-85% (Scale 2)' },
        { value: 1, label: '94-95% (Scale 1) / 86-87% (Scale 2)' },
        { value: 0, label: '≥96% (Scale 1) / 88-92% or ≥93% on air (Scale 2)' },
      ],
    },
    {
      id: 'supplementalO2',
      label: 'Supplemental Oxygen',
      type: 'boolean',
      required: true,
      group: 'Respiratory',
      options: [
        { value: 0, label: 'No (Room air)' },
        { value: 2, label: 'Yes (On oxygen)' },
      ],
    },
    {
      id: 'temperature',
      label: 'Temperature (°C)',
      type: 'select',
      required: true,
      group: 'Cardiovascular',
      options: [
        { value: 3, label: '≤35.0' },
        { value: 1, label: '35.1-36.0' },
        { value: 0, label: '36.1-38.0' },
        { value: 1, label: '38.1-39.0' },
        { value: 2, label: '≥39.1' },
      ],
    },
    {
      id: 'systolicBP',
      label: 'Systolic Blood Pressure (mmHg)',
      type: 'select',
      required: true,
      group: 'Cardiovascular',
      options: [
        { value: 3, label: '≤90' },
        { value: 2, label: '91-100' },
        { value: 1, label: '101-110' },
        { value: 0, label: '111-219' },
        { value: 3, label: '≥220' },
      ],
    },
    {
      id: 'heartRate',
      label: 'Heart Rate (bpm)',
      type: 'select',
      required: true,
      group: 'Cardiovascular',
      options: [
        { value: 3, label: '≤40' },
        { value: 1, label: '41-50' },
        { value: 0, label: '51-90' },
        { value: 1, label: '91-110' },
        { value: 2, label: '111-130' },
        { value: 3, label: '≥131' },
      ],
    },
    {
      id: 'consciousness',
      label: 'Consciousness (ACVPU)',
      type: 'select',
      required: true,
      group: 'Neurological',
      description: 'Alert, Confusion, Voice, Pain, Unresponsive',
      options: [
        { value: 0, label: 'Alert' },
        { value: 3, label: 'Confusion (new onset)' },
        { value: 3, label: 'Voice (responds only to voice)' },
        { value: 3, label: 'Pain (responds only to pain)' },
        { value: 3, label: 'Unresponsive' },
      ],
    },
  ],

  calculate: (inputs) => {
    return (
      (inputs.respiratoryRate || 0) +
      (inputs.spo2 || 0) +
      (inputs.supplementalO2 || 0) +
      (inputs.temperature || 0) +
      (inputs.systolicBP || 0) +
      (inputs.heartRate || 0) +
      (inputs.consciousness || 0)
    );
  },

  interpret: (score, inputs): ScoreInterpretation => {
    // Check for individual parameter score of 3 (red score)
    const hasRedScore =
      inputs &&
      Object.values(inputs).some((val) => val === 3) &&
      inputs.spo2Scale !== 3;

    if (score >= 7 || hasRedScore) {
      return {
        score,
        category: 'High Clinical Risk',
        risk: 'critical',
        recommendation:
          'Emergency response threshold. Urgent review by clinical team with critical care competencies, including consideration of transfer to Level 2/3 care.',
        action: 'Continuous monitoring. Emergency assessment team response.',
        notes: hasRedScore
          ? [
              'Individual parameter score of 3 (red score) triggers urgent response',
              'Minimum hourly observations',
            ]
          : ['Urgent escalation to critical care team'],
      };
    }

    if (score >= 5) {
      return {
        score,
        category: 'Medium Clinical Risk (Key Threshold)',
        risk: 'high',
        recommendation:
          'Key threshold for urgent response. Urgent review by ward-based doctor or acute team. Consider escalation.',
        action: 'Increase monitoring to minimum hourly. Urgent clinical review.',
        notes: [
          'Ward-based doctor to review within 30-60 minutes',
          'Consider intensive monitoring environment',
        ],
      };
    }

    if (score >= 1) {
      return {
        score,
        category: 'Low Clinical Risk',
        risk: 'low-moderate',
        recommendation:
          'Ward-based response. Inform registered nurse who should assess the patient.',
        action: 'Minimum 4-6 hourly observations.',
        notes: ['Registered nurse to decide if increased frequency needed'],
      };
    }

    return {
      score,
      category: 'Baseline',
      risk: 'very-low',
      recommendation:
        'Continue routine monitoring. All parameters within normal range.',
      action: 'Minimum 12 hourly observations (or per local policy).',
    };
  },

  interpretationRanges: [
    {
      min: 0,
      max: 0,
      interpretation: {
        category: 'Baseline',
        risk: 'very-low',
        recommendation: 'Routine monitoring. Minimum 12 hourly observations.',
      },
    },
    {
      min: 1,
      max: 4,
      interpretation: {
        category: 'Low Clinical Risk',
        risk: 'low-moderate',
        recommendation: 'Inform registered nurse. 4-6 hourly observations.',
      },
    },
    {
      min: 5,
      max: 6,
      interpretation: {
        category: 'Medium Clinical Risk',
        risk: 'high',
        recommendation: 'Urgent review by doctor. Hourly observations.',
        action: 'Clinical review within 30-60 minutes',
      },
    },
    {
      min: 7,
      max: 20,
      interpretation: {
        category: 'High Clinical Risk',
        risk: 'critical',
        recommendation: 'Emergency response. Consider critical care transfer.',
        action: 'Continuous monitoring. Immediate clinical review.',
      },
    },
  ],

  citations: [
    {
      authors: 'Royal College of Physicians',
      title:
        'National Early Warning Score (NEWS) 2: Standardising the assessment of acute-illness severity in the NHS',
      journal: 'Royal College of Physicians',
      year: 2017,
      url: 'https://www.rcplondon.ac.uk/projects/outputs/national-early-warning-score-news-2',
    },
    {
      authors: 'Smith GB, Prytherch DR, Meredith P, et al.',
      title:
        'The ability of the National Early Warning Score (NEWS) to discriminate patients at risk of early cardiac arrest, unanticipated intensive care unit admission, and death',
      journal: 'Resuscitation',
      year: 2013,
      volume: '84(4):465-470',
      doi: '10.1016/j.resuscitation.2012.12.016',
      pmid: '23295778',
    },
  ],

  validationStudy:
    'Validated across UK NHS; strongly predictive of cardiac arrest, ICU admission, and death within 24 hours',

  notes: [
    'NEWS2 is the UK national standard for detecting deterioration',
    'Score of 3 in any single parameter should trigger urgent response',
    'Scale 2 for SpO2 should be used for patients at risk of hypercapnic respiratory failure',
    'New confusion should always trigger clinical concern regardless of score',
  ],

  relatedCalculators: ['qsofa', 'sofa', 'mews'],

  snomedConcepts: ['401314001'], // Early warning score

  version: '2.0',
  lastUpdated: '2024-01-15',
};

export default news2;
