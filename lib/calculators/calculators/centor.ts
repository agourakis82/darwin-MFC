/**
 * CENTOR/McISAAC SCORE
 * =====================
 *
 * Strep pharyngitis probability and need for testing/antibiotics.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const centor: ClinicalCalculator = {
  id: 'centor',
  name: 'Centor Score (Modified/McIsaac) for Strep Pharyngitis',
  abbreviation: 'Centor',
  category: 'infectious-disease',
  description:
    'Estimates probability of streptococcal pharyngitis to guide testing and antibiotic decisions.',
  purpose:
    'The modified Centor (McIsaac) score helps determine whether to test for Group A Streptococcus and/or treat empirically.',

  indications: [
    'Acute pharyngitis/sore throat',
    'Deciding on rapid strep testing',
    'Antibiotic stewardship for pharyngitis',
  ],

  contraindications: [
    'Clear viral syndrome (coryza, cough, hoarseness)',
    'Known strep exposure requiring treatment',
  ],

  inputs: [
    {
      id: 'age',
      label: 'Age',
      type: 'select',
      required: true,
      options: [
        { value: 1, label: '3-14 years' },
        { value: 0, label: '15-44 years' },
        { value: -1, label: '≥45 years' },
      ],
    },
    {
      id: 'exudate',
      label: 'Tonsillar Exudates or Swelling',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'lymph_nodes',
      label: 'Tender Anterior Cervical Lymphadenopathy',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'fever',
      label: 'Fever (History or Present, >38°C/100.4°F)',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
    },
    {
      id: 'cough',
      label: 'Absence of Cough',
      type: 'boolean',
      description: 'Score 1 if cough is ABSENT',
      required: true,
      options: [
        { value: 0, label: 'Cough present' },
        { value: 1, label: 'No cough' },
      ],
    },
  ],

  calculate: (inputs) => {
    const score =
      (inputs.age || 0) +
      (inputs.exudate || 0) +
      (inputs.lymph_nodes || 0) +
      (inputs.fever || 0) +
      (inputs.cough || 0);
    // Score can be -1 to 5, but for display we'll show the raw score
    return score;
  },

  interpret: (score): ScoreInterpretation => {
    if (score <= 0) {
      return {
        score,
        category: 'Very Low Risk',
        risk: 'very-low',
        morbidity: '1-2.5% probability of strep',
        recommendation: 'No testing or antibiotics needed.',
        action: 'Symptomatic treatment only. No rapid strep test indicated.',
        notes: [
          'Viral etiology most likely',
          'Supportive care: rest, fluids, analgesics',
          'Return if worsening or not improving in 7 days',
        ],
      };
    }
    if (score === 1) {
      return {
        score,
        category: 'Low Risk',
        risk: 'low',
        morbidity: '5-10% probability of strep',
        recommendation: 'Testing optional based on clinical judgment.',
        action: 'May consider rapid strep test. No empiric antibiotics.',
        notes: [
          'Most cases still viral',
          'Test if high clinical suspicion',
        ],
      };
    }
    if (score === 2) {
      return {
        score,
        category: 'Moderate Risk',
        risk: 'low-moderate',
        morbidity: '11-17% probability of strep',
        recommendation: 'Rapid strep testing recommended.',
        action: 'Perform rapid strep test. Treat only if positive.',
        notes: [
          'Test before treating',
          'If rapid negative in child, consider throat culture',
        ],
      };
    }
    if (score === 3) {
      return {
        score,
        category: 'Moderate-High Risk',
        risk: 'moderate',
        morbidity: '28-35% probability of strep',
        recommendation: 'Test and/or treat.',
        action: 'Rapid strep test. May consider empiric treatment pending results.',
        notes: [
          'Higher probability warrants testing',
          'In high-risk populations, empiric treatment reasonable',
        ],
      };
    }
    // score >= 4
    return {
      score,
      category: 'High Risk',
      risk: 'high',
      morbidity: '51-53% probability of strep',
      recommendation: 'Test and treat.',
      action: 'Rapid strep test. Empiric antibiotics may be reasonable pending results.',
      notes: [
        'High probability of strep',
        'If positive test or high clinical suspicion: penicillin or amoxicillin',
        'Azithromycin if penicillin allergy',
        '10-day course typically recommended',
      ],
    };
  },

  interpretationRanges: [
    {
      min: -1,
      max: 0,
      interpretation: {
        category: 'Very Low',
        risk: 'very-low',
        morbidity: '1-2.5%',
        recommendation: 'No testing needed',
      },
    },
    {
      min: 1,
      max: 1,
      interpretation: {
        category: 'Low',
        risk: 'low',
        morbidity: '5-10%',
        recommendation: 'Optional testing',
      },
    },
    {
      min: 2,
      max: 2,
      interpretation: {
        category: 'Moderate',
        risk: 'low-moderate',
        morbidity: '11-17%',
        recommendation: 'Test recommended',
      },
    },
    {
      min: 3,
      max: 3,
      interpretation: {
        category: 'Moderate-High',
        risk: 'moderate',
        morbidity: '28-35%',
        recommendation: 'Test and/or treat',
      },
    },
    {
      min: 4,
      max: 5,
      interpretation: {
        category: 'High',
        risk: 'high',
        morbidity: '51-53%',
        recommendation: 'Empiric treatment',
      },
    },
  ],

  citations: [
    {
      authors: 'McIsaac WJ, White D, Tannenbaum D, Low DE.',
      title:
        'A clinical score to reduce unnecessary antibiotic use in patients with sore throat',
      journal: 'CMAJ',
      year: 1998,
      volume: '158(1):75-83',
      pmid: '9475915',
    },
    {
      authors: 'Centor RM, Witherspoon JM, Dalton HP, et al.',
      title:
        'The diagnosis of strep throat in adults in the emergency room',
      journal: 'Med Decis Making',
      year: 1981,
      volume: '1(3):239-246',
      doi: '10.1177/0272989X8100100304',
      pmid: '6763125',
    },
  ],

  validationStudy:
    'McIsaac modification validated in 600,000+ patient encounters.',
};
