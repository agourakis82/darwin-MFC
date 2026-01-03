/**
 * Glasgow Coma Scale (GCS)
 * ========================
 *
 * Standardized assessment of level of consciousness in acute medical and trauma patients.
 * Assesses eye, verbal, and motor responses.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const gcs: ClinicalCalculator = {
  id: 'gcs',
  name: 'Glasgow Coma Scale',
  abbreviation: 'GCS',
  category: 'emergency',
  description:
    'Standardized scale for assessing level of consciousness based on eye, verbal, and motor responses.',
  purpose:
    'The GCS provides a reliable, objective way to record the conscious state of a patient. It is used for initial and continuing assessment in head injury and critical care.',
  indications: [
    'Traumatic brain injury assessment',
    'Altered mental status evaluation',
    'Critical care neurological monitoring',
    'Intubation/airway management decision',
    'Prognostication after brain injury',
  ],
  contraindications: [
    'Limited in sedated/paralyzed patients',
    'Verbal score limited in intubated patients (record as VT)',
    'Eye score may be affected by periorbital swelling',
  ],

  inputs: [
    {
      id: 'eye',
      label: 'Eye Response',
      type: 'select',
      required: true,
      group: 'Eye Opening (E)',
      description: 'Best eye opening response',
      options: [
        { value: 4, label: 'Spontaneous - Eyes open spontaneously' },
        { value: 3, label: 'To Voice - Eyes open to verbal command' },
        { value: 2, label: 'To Pain - Eyes open to painful stimulus' },
        { value: 1, label: 'None - No eye opening' },
      ],
    },
    {
      id: 'verbal',
      label: 'Verbal Response',
      type: 'select',
      required: true,
      group: 'Verbal Response (V)',
      description: 'Best verbal response (if intubated, document as VT)',
      options: [
        { value: 5, label: 'Oriented - Oriented, converses normally' },
        { value: 4, label: 'Confused - Disoriented but converses' },
        { value: 3, label: 'Inappropriate Words - Random/exclamatory words' },
        { value: 2, label: 'Incomprehensible Sounds - Moaning, no words' },
        { value: 1, label: 'None - No verbal response' },
      ],
    },
    {
      id: 'motor',
      label: 'Motor Response',
      type: 'select',
      required: true,
      group: 'Motor Response (M)',
      description: 'Best motor response',
      options: [
        { value: 6, label: 'Obeys Commands - Follows simple commands' },
        { value: 5, label: 'Localizes Pain - Purposeful movement to pain' },
        { value: 4, label: 'Withdraws from Pain - Pulls away from pain' },
        { value: 3, label: 'Abnormal Flexion - Decorticate posturing' },
        { value: 2, label: 'Extension - Decerebrate posturing' },
        { value: 1, label: 'None - No motor response' },
      ],
    },
  ],

  calculate: (inputs) => {
    return (inputs.eye || 1) + (inputs.verbal || 1) + (inputs.motor || 1);
  },

  interpret: (score, inputs): ScoreInterpretation => {
    const eye = inputs?.eye || 1;
    const verbal = inputs?.verbal || 1;
    const motor = inputs?.motor || 1;
    const breakdown = `E${eye}V${verbal}M${motor}`;

    if (score === 15) {
      return {
        score,
        scoreDisplay: `${score} (${breakdown})`,
        category: 'Normal',
        risk: 'very-low',
        recommendation:
          'Normal level of consciousness. Continue routine monitoring as clinically indicated.',
      };
    }

    if (score >= 13) {
      return {
        score,
        scoreDisplay: `${score} (${breakdown})`,
        category: 'Mild Impairment',
        risk: 'low',
        recommendation:
          'Mild alteration in consciousness. Close observation. Consider CT head if trauma.',
        notes: ['In trauma: mild traumatic brain injury (concussion)'],
      };
    }

    if (score >= 9) {
      return {
        score,
        scoreDisplay: `${score} (${breakdown})`,
        category: 'Moderate Impairment',
        risk: 'moderate',
        recommendation:
          'Moderate alteration in consciousness. Frequent neurological observations. CT head indicated if trauma. Consider ICU admission.',
        notes: ['In trauma: moderate traumatic brain injury', 'Serial GCS monitoring essential'],
      };
    }

    if (score >= 6) {
      return {
        score,
        scoreDisplay: `${score} (${breakdown})`,
        category: 'Severe Impairment',
        risk: 'high',
        recommendation:
          'Severe alteration in consciousness. Airway protection is priority. ICU admission required.',
        action: 'Consider intubation for airway protection',
        notes: [
          'In trauma: severe traumatic brain injury',
          'GCS ≤8 traditionally indicates need for intubation',
        ],
      };
    }

    if (score >= 4) {
      return {
        score,
        scoreDisplay: `${score} (${breakdown})`,
        category: 'Very Severe Impairment',
        risk: 'very-high',
        recommendation:
          'Very severe impairment. Immediate airway management. ICU care essential. Poor prognosis.',
        action: 'Immediate intubation and definitive airway',
        mortality: 'High mortality risk',
        notes: ['Neurosurgical consultation if trauma'],
      };
    }

    return {
      score,
      scoreDisplay: `${score} (${breakdown})`,
      category: 'Critical / Unresponsive',
      risk: 'critical',
      recommendation:
        'Minimal or no response. Deep coma or brain death assessment may be appropriate.',
      action: 'Full resuscitation. Consider brain death protocol if appropriate.',
      mortality: 'Very high mortality',
      notes: ['GCS 3 = no eye, verbal, or motor response', 'May indicate brain death'],
    };
  },

  interpretationRanges: [
    {
      min: 15,
      max: 15,
      interpretation: {
        category: 'Normal',
        risk: 'very-low',
        recommendation: 'Normal consciousness. Routine monitoring.',
      },
    },
    {
      min: 13,
      max: 14,
      interpretation: {
        category: 'Mild Impairment',
        risk: 'low',
        recommendation: 'Mild TBI if trauma. Close observation.',
      },
    },
    {
      min: 9,
      max: 12,
      interpretation: {
        category: 'Moderate Impairment',
        risk: 'moderate',
        recommendation: 'Moderate TBI. ICU consideration. Serial monitoring.',
      },
    },
    {
      min: 6,
      max: 8,
      interpretation: {
        category: 'Severe Impairment',
        risk: 'high',
        recommendation: 'Severe TBI. Intubation indicated. ICU admission.',
        action: 'Airway protection priority',
      },
    },
    {
      min: 4,
      max: 5,
      interpretation: {
        category: 'Very Severe Impairment',
        risk: 'very-high',
        mortality: 'High',
        recommendation: 'Critical injury. Immediate intervention.',
      },
    },
    {
      min: 3,
      max: 3,
      interpretation: {
        category: 'Unresponsive',
        risk: 'critical',
        mortality: 'Very high',
        recommendation: 'Deep coma. Consider brain death if no reversible cause.',
      },
    },
  ],

  citations: [
    {
      authors: 'Teasdale G, Jennett B',
      title: 'Assessment of coma and impaired consciousness. A practical scale.',
      journal: 'Lancet',
      year: 1974,
      volume: '2(7872):81-84',
      doi: '10.1016/S0140-6736(74)91639-0',
      pmid: '4136544',
    },
    {
      authors: 'Teasdale G, Maas A, Lecky F, et al.',
      title: 'The Glasgow Coma Scale at 40 years: standing the test of time',
      journal: 'Lancet Neurology',
      year: 2014,
      volume: '13(8):844-854',
      doi: '10.1016/S1474-4422(14)70120-6',
      pmid: '25030516',
    },
  ],

  validationStudy:
    'Original validation 1974; extensively validated across populations for TBI outcome prediction',

  notes: [
    'Always record as E_V_M_ with individual component scores',
    'Motor score is the most predictive component for outcome',
    'GCS ≤8 = severe brain injury, traditionally indicates intubation',
    'For intubated patients, record verbal as VT (intubated) and use GCS-E/M only',
    'Pupillary reactivity provides additional prognostic information',
  ],

  relatedCalculators: ['qsofa', 'sofa', 'rass'],

  snomedConcepts: ['386557006'], // Glasgow coma score

  version: '1.0',
  lastUpdated: '2024-01-15',
};

export default gcs;
