/**
 * APFEL SCORE
 * ============
 *
 * Predicts postoperative nausea and vomiting (PONV) risk.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const apfel: ClinicalCalculator = {
  id: 'apfel',
  name: 'Apfel Score for PONV Risk',
  abbreviation: 'Apfel',
  category: 'anesthesia',
  description:
    'Predicts risk of postoperative nausea and vomiting to guide antiemetic prophylaxis.',
  purpose:
    'The Apfel score identifies patients at high risk for PONV who may benefit from multimodal antiemetic prophylaxis.',

  indications: [
    'Preoperative risk assessment',
    'Guiding antiemetic prophylaxis',
    'Patient counseling about PONV risk',
  ],

  contraindications: [],

  inputs: [
    {
      id: 'female',
      label: 'Female Gender',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'No (Male)' },
        { value: 1, label: 'Yes (Female)' },
      ],
    },
    {
      id: 'nonsmoker',
      label: 'Non-smoker',
      type: 'boolean',
      description: 'Patient does not currently smoke',
      required: true,
      options: [
        { value: 0, label: 'No (Smoker)' },
        { value: 1, label: 'Yes (Non-smoker)' },
      ],
    },
    {
      id: 'history_ponv',
      label: 'History of PONV or Motion Sickness',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'postop_opioids',
      label: 'Postoperative Opioids Expected',
      type: 'boolean',
      description: 'Opioids planned for postoperative analgesia',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
  ],

  calculate: (inputs) => {
    return (
      (inputs.female || 0) +
      (inputs.nonsmoker || 0) +
      (inputs.history_ponv || 0) +
      (inputs.postop_opioids || 0)
    );
  },

  interpret: (score): ScoreInterpretation => {
    const riskPercent = [10, 21, 39, 61, 79][score] || 79;

    if (score === 0) {
      return {
        score,
        category: 'Low Risk',
        risk: 'low',
        morbidity: `${riskPercent}% PONV risk`,
        recommendation: 'Low PONV risk. Prophylaxis generally not needed.',
        action: 'No routine antiemetic prophylaxis required. Rescue antiemetics available.',
      };
    }
    if (score === 1) {
      return {
        score,
        category: 'Low-Moderate Risk',
        risk: 'low-moderate',
        morbidity: `${riskPercent}% PONV risk`,
        recommendation: 'Low-moderate PONV risk.',
        action: 'Consider single antiemetic prophylaxis if high-risk surgery.',
        notes: [
          'Dexamethasone 4-8mg at induction',
          'Or ondansetron 4mg at end of surgery',
        ],
      };
    }
    if (score === 2) {
      return {
        score,
        category: 'Moderate Risk',
        risk: 'moderate',
        morbidity: `${riskPercent}% PONV risk`,
        recommendation: 'Moderate PONV risk. Prophylaxis recommended.',
        action: 'Dual antiemetic prophylaxis.',
        notes: [
          'Dexamethasone 4-8mg at induction',
          'Plus ondansetron 4mg at end of surgery',
          'Consider TIVA instead of volatile anesthetics',
        ],
      };
    }
    if (score === 3) {
      return {
        score,
        category: 'High Risk',
        risk: 'high',
        morbidity: `${riskPercent}% PONV risk`,
        recommendation: 'High PONV risk. Multimodal prophylaxis strongly recommended.',
        action: 'Triple antiemetic prophylaxis. Consider TIVA.',
        notes: [
          'Dexamethasone 4-8mg at induction',
          'Ondansetron 4mg at end of surgery',
          'Consider adding droperidol, scopolamine patch, or aprepitant',
          'Minimize opioids - use regional/multimodal analgesia',
          'Total intravenous anesthesia (TIVA) preferred',
        ],
      };
    }
    // score === 4
    return {
      score,
      category: 'Very High Risk',
      risk: 'very-high',
      morbidity: `${riskPercent}% PONV risk`,
      recommendation: 'Very high PONV risk. Aggressive prophylaxis essential.',
      action: 'Maximum multimodal prophylaxis. TIVA strongly recommended.',
      notes: [
        'All available prophylactic measures',
        'TIVA with propofol',
        'Dexamethasone, ondansetron, and third agent',
        'Consider scopolamine patch, aprepitant',
        'Minimize/avoid opioids',
        'Regional anesthesia if possible',
        'Ensure adequate hydration',
      ],
    };
  },

  interpretationRanges: [
    {
      min: 0,
      max: 0,
      interpretation: {
        category: 'Low Risk',
        risk: 'low',
        morbidity: '10%',
        recommendation: 'No prophylaxis needed',
      },
    },
    {
      min: 1,
      max: 1,
      interpretation: {
        category: 'Low-Moderate',
        risk: 'low-moderate',
        morbidity: '21%',
        recommendation: 'Consider prophylaxis',
      },
    },
    {
      min: 2,
      max: 2,
      interpretation: {
        category: 'Moderate',
        risk: 'moderate',
        morbidity: '39%',
        recommendation: 'Dual prophylaxis',
      },
    },
    {
      min: 3,
      max: 3,
      interpretation: {
        category: 'High',
        risk: 'high',
        morbidity: '61%',
        recommendation: 'Triple prophylaxis',
      },
    },
    {
      min: 4,
      max: 4,
      interpretation: {
        category: 'Very High',
        risk: 'very-high',
        morbidity: '79%',
        recommendation: 'Maximum prophylaxis',
      },
    },
  ],

  citations: [
    {
      authors: 'Apfel CC, Läärä E, Koivuranta M, et al.',
      title:
        'A simplified risk score for predicting postoperative nausea and vomiting',
      journal: 'Anesthesiology',
      year: 1999,
      volume: '91(3):693-700',
      doi: '10.1097/00000542-199909000-00022',
      pmid: '10485781',
    },
  ],

  validationStudy:
    'Validated in >8,000 surgical patients. Most widely used PONV risk score.',
};
