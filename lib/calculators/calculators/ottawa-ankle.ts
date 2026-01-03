/**
 * OTTAWA ANKLE RULES
 * ===================
 *
 * Clinical decision rule for ankle X-ray necessity.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const ottawaAnkle: ClinicalCalculator = {
  id: 'ottawa-ankle',
  name: 'Ottawa Ankle Rules',
  abbreviation: 'Ottawa Ankle',
  category: 'orthopedics',
  description:
    'Determines need for X-ray in ankle/midfoot injuries to rule out fracture.',
  purpose:
    'The Ottawa Ankle Rules identify patients who can safely forgo radiography after ankle or midfoot injury.',

  indications: [
    'Acute ankle injury with pain',
    'Acute midfoot injury with pain',
    'Deciding on need for X-ray',
  ],

  contraindications: [
    'Age <18 years (modified rules exist)',
    'Intoxicated patients',
    'Multiple painful injuries',
    'Decreased sensation in legs',
    'Pregnancy (radiation considerations separate)',
    'Injuries >10 days old',
  ],

  inputs: [
    {
      id: 'bone_tenderness_lateral',
      label: 'Bone tenderness at posterior edge or tip of lateral malleolus',
      type: 'boolean',
      description: 'Distal 6 cm',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
      group: 'Ankle X-ray Criteria',
    },
    {
      id: 'bone_tenderness_medial',
      label: 'Bone tenderness at posterior edge or tip of medial malleolus',
      type: 'boolean',
      description: 'Distal 6 cm',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
      group: 'Ankle X-ray Criteria',
    },
    {
      id: 'unable_bear_weight_ankle',
      label: 'Unable to bear weight immediately and in ED (4 steps)',
      type: 'boolean',
      description: 'For ankle injury',
      required: true,
      options: [
        { value: 0, label: 'No (can bear weight)' },
        { value: 1, label: 'Yes (unable)' },
      ],
      group: 'Ankle X-ray Criteria',
    },
    {
      id: 'bone_tenderness_base_5th',
      label: 'Bone tenderness at base of 5th metatarsal',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
      group: 'Foot X-ray Criteria',
    },
    {
      id: 'bone_tenderness_navicular',
      label: 'Bone tenderness at navicular',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
      group: 'Foot X-ray Criteria',
    },
    {
      id: 'unable_bear_weight_foot',
      label: 'Unable to bear weight immediately and in ED (4 steps)',
      type: 'boolean',
      description: 'For midfoot injury',
      required: true,
      options: [
        { value: 0, label: 'No (can bear weight)' },
        { value: 1, label: 'Yes (unable)' },
      ],
      group: 'Foot X-ray Criteria',
    },
  ],

  calculate: (inputs) => {
    // Calculate ankle and foot scores separately
    const anklePositive =
      (inputs.bone_tenderness_lateral || 0) +
      (inputs.bone_tenderness_medial || 0) +
      (inputs.unable_bear_weight_ankle || 0);

    const footPositive =
      (inputs.bone_tenderness_base_5th || 0) +
      (inputs.bone_tenderness_navicular || 0) +
      (inputs.unable_bear_weight_foot || 0);

    // Return combined score (0 = no X-ray needed, >0 = X-ray needed)
    return anklePositive + footPositive;
  },

  interpret: (score, inputs): ScoreInterpretation => {
    const anklePositive =
      ((inputs?.bone_tenderness_lateral || 0) +
      (inputs?.bone_tenderness_medial || 0) +
      (inputs?.unable_bear_weight_ankle || 0)) > 0;

    const footPositive =
      ((inputs?.bone_tenderness_base_5th || 0) +
      (inputs?.bone_tenderness_navicular || 0) +
      (inputs?.unable_bear_weight_foot || 0)) > 0;

    if (!anklePositive && !footPositive) {
      return {
        score: 0,
        category: 'Low Risk - No X-ray Needed',
        risk: 'very-low',
        recommendation: 'X-ray not indicated by Ottawa rules.',
        action: 'Safe to discharge without radiography. Provide RICE therapy and follow-up instructions.',
        notes: [
          'Sensitivity for fracture ~98%',
          'Negative predictive value very high',
          'RICE: Rest, Ice, Compression, Elevation',
          'Follow up if not improving in 5-7 days',
          'Return if worsening pain or unable to bear weight',
        ],
      };
    }

    let recommendation = '';
    let action = '';

    if (anklePositive && footPositive) {
      recommendation = 'Both ankle AND foot X-rays indicated.';
      action = 'Obtain ankle and foot radiographs.';
    } else if (anklePositive) {
      recommendation = 'Ankle X-ray indicated.';
      action = 'Obtain ankle radiographs (AP, lateral, mortise views).';
    } else {
      recommendation = 'Foot X-ray indicated.';
      action = 'Obtain foot radiographs.';
    }

    return {
      score,
      category: 'X-ray Indicated',
      risk: 'moderate',
      recommendation,
      action,
      notes: [
        'Positive criteria do not confirm fracture',
        'They indicate need for imaging',
        'Manage based on X-ray findings',
      ],
    };
  },

  interpretationRanges: [
    {
      min: 0,
      max: 0,
      interpretation: {
        category: 'Low Risk',
        risk: 'very-low',
        recommendation: 'No X-ray needed',
      },
    },
    {
      min: 1,
      max: 6,
      interpretation: {
        category: 'X-ray Indicated',
        risk: 'moderate',
        recommendation: 'Imaging recommended',
      },
    },
  ],

  citations: [
    {
      authors: 'Stiell IG, Greenberg GH, McKnight RD, et al.',
      title:
        'A study to develop clinical decision rules for the use of radiography in acute ankle injuries',
      journal: 'Ann Emerg Med',
      year: 1992,
      volume: '21(4):384-390',
      doi: '10.1016/s0196-0644(05)82656-3',
      pmid: '1554175',
    },
    {
      authors: 'Stiell IG, McKnight RD, Greenberg GH, et al.',
      title:
        'Implementation of the Ottawa ankle rules',
      journal: 'JAMA',
      year: 1994,
      volume: '271(11):827-832',
      pmid: '8114236',
    },
  ],

  validationStudy:
    'Validated in 10,000+ patients. 98% sensitivity for significant fractures. Reduces unnecessary X-rays by 30-40%.',
};
