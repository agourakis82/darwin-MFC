/**
 * COMMON CLINICAL CALCULATORS
 * ============================
 *
 * Pre-built clinical calculators using the framework
 * BMI, CrCl, CHADS2-VASc, Wells Score, and more
 *
 * @example
 * ```tsx
 * import { BMICalculator, CrClCalculator, CHADS2VAScCalculator } from './common-calculators';
 *
 * <BMICalculator />
 * <CrClCalculator />
 * <CHADS2VAScCalculator />
 * ```
 */

'use client';

import React from 'react';
import {
  Calculator,
  CalculatorInput,
  CalculatorResult,
  Interpretation,
} from './framework';

// ============================================================================
// BMI CALCULATOR
// ============================================================================

const bmiInputs: CalculatorInput[] = [
  {
    id: 'weight',
    label: 'Weight',
    type: 'number',
    unit: 'kg',
    min: 1,
    max: 500,
    step: 0.1,
    required: true,
    helpText: 'Enter weight in kilograms',
    validate: (value) => {
      if (value < 1) return 'Weight must be at least 1 kg';
      if (value > 500) return 'Please enter a valid weight';
      return null;
    },
  },
  {
    id: 'height',
    label: 'Height',
    type: 'number',
    unit: 'cm',
    min: 50,
    max: 250,
    step: 0.1,
    required: true,
    helpText: 'Enter height in centimeters',
    validate: (value) => {
      if (value < 50) return 'Height must be at least 50 cm';
      if (value > 250) return 'Please enter a valid height';
      return null;
    },
  },
];

const bmiInterpretations: Interpretation[] = [
  {
    condition: (result) => (result.value as number) < 18.5,
    message: 'Underweight - BMI below normal range',
    riskLevel: 'moderate',
    recommendations: [
      'Consider nutritional assessment',
      'Evaluate for underlying medical conditions',
      'May benefit from dietitian consultation',
    ],
  },
  {
    condition: (result) => (result.value as number) >= 18.5 && (result.value as number) < 25,
    message: 'Normal weight - BMI within healthy range',
    riskLevel: 'low',
    recommendations: [
      'Maintain current weight through balanced diet',
      'Continue regular physical activity',
      'Monitor weight periodically',
    ],
  },
  {
    condition: (result) => (result.value as number) >= 25 && (result.value as number) < 30,
    message: 'Overweight - BMI above normal range',
    riskLevel: 'moderate',
    recommendations: [
      'Consider lifestyle modifications',
      'Increase physical activity',
      'Dietary counseling may be beneficial',
      'Monitor for metabolic risk factors',
    ],
  },
  {
    condition: (result) => (result.value as number) >= 30,
    message: 'Obese - Significant health risk',
    riskLevel: 'high',
    recommendations: [
      'Comprehensive weight management program recommended',
      'Screen for obesity-related comorbidities',
      'Consider referral to endocrinologist or bariatric specialist',
      'Evaluate for sleep apnea, diabetes, hypertension',
    ],
  },
];

export const BMICalculator: React.FC = () => {
  const calculate = (values: Record<string, any>): CalculatorResult => {
    const weight = parseFloat(values.weight);
    const height = parseFloat(values.height) / 100; // Convert to meters
    const bmi = weight / (height * height);

    return {
      value: bmi,
      unit: 'kg/m²',
      label: 'Body Mass Index (BMI)',
      reference: {
        min: 18.5,
        max: 24.9,
      },
    };
  };

  return (
    <Calculator
      title="BMI Calculator"
      description="Calculate Body Mass Index and assess weight status"
      inputs={bmiInputs}
      calculate={calculate}
      interpretations={bmiInterpretations}
      references={[
        {
          title: 'WHO BMI Classification',
          citation: 'World Health Organization, 2000',
        },
      ]}
    />
  );
};

// ============================================================================
// CREATININE CLEARANCE (COCKCROFT-GAULT)
// ============================================================================

const crclInputs: CalculatorInput[] = [
  {
    id: 'age',
    label: 'Age',
    type: 'number',
    unit: 'years',
    min: 18,
    max: 120,
    required: true,
  },
  {
    id: 'weight',
    label: 'Weight',
    type: 'number',
    unit: 'kg',
    min: 30,
    max: 200,
    required: true,
  },
  {
    id: 'creatinine',
    label: 'Serum Creatinine',
    type: 'number',
    unit: 'mg/dL',
    min: 0.1,
    max: 20,
    step: 0.1,
    required: true,
  },
  {
    id: 'sex',
    label: 'Sex',
    type: 'radio',
    required: true,
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
    ],
  },
];

const crclInterpretations: Interpretation[] = [
  {
    condition: (result) => (result.value as number) >= 90,
    message: 'Normal kidney function',
    riskLevel: 'low',
  },
  {
    condition: (result) => (result.value as number) >= 60 && (result.value as number) < 90,
    message: 'Mildly decreased kidney function',
    riskLevel: 'low',
    recommendations: ['Monitor kidney function', 'Review medication dosing'],
  },
  {
    condition: (result) => (result.value as number) >= 30 && (result.value as number) < 60,
    message: 'Moderately decreased kidney function',
    riskLevel: 'moderate',
    recommendations: [
      'Adjust medication doses as needed',
      'Monitor more frequently',
      'Consider nephrology referral',
    ],
  },
  {
    condition: (result) => (result.value as number) >= 15 && (result.value as number) < 30,
    message: 'Severely decreased kidney function',
    riskLevel: 'high',
    recommendations: [
      'Nephrology referral strongly recommended',
      'Careful medication review and adjustment',
      'Prepare for possible renal replacement therapy',
    ],
  },
  {
    condition: (result) => (result.value as number) < 15,
    message: 'Kidney failure',
    riskLevel: 'critical',
    recommendations: [
      'Urgent nephrology consultation',
      'Consider dialysis or transplant evaluation',
      'Strict medication review',
    ],
  },
];

export const CrClCalculator: React.FC = () => {
  const calculate = (values: Record<string, any>): CalculatorResult => {
    const age = parseFloat(values.age);
    const weight = parseFloat(values.weight);
    const creatinine = parseFloat(values.creatinine);
    const isFemale = values.sex === 'female';

    // Cockcroft-Gault equation
    let crcl = ((140 - age) * weight) / (72 * creatinine);
    if (isFemale) {
      crcl *= 0.85;
    }

    return {
      value: crcl,
      unit: 'mL/min',
      label: 'Creatinine Clearance (CrCl)',
      interpretation: 'Estimated using Cockcroft-Gault equation',
      reference: {
        min: 90,
      },
    };
  };

  return (
    <Calculator
      title="Creatinine Clearance Calculator"
      description="Estimate kidney function using Cockcroft-Gault equation"
      inputs={crclInputs}
      calculate={calculate}
      interpretations={crclInterpretations}
      references={[
        {
          title: 'Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine',
          citation: 'Nephron. 1976;16(1):31-41',
        },
      ]}
    />
  );
};

// ============================================================================
// CHADS2-VASc SCORE
// ============================================================================

const chads2vascInputs: CalculatorInput[] = [
  {
    id: 'chf',
    label: 'Congestive Heart Failure',
    type: 'checkbox',
    helpText: 'History of CHF or reduced ejection fraction',
  },
  {
    id: 'hypertension',
    label: 'Hypertension',
    type: 'checkbox',
    helpText: 'History of hypertension or on antihypertensive therapy',
  },
  {
    id: 'age',
    label: 'Age',
    type: 'select',
    required: true,
    options: [
      { value: '0', label: '<65 years' },
      { value: '1', label: '65-74 years' },
      { value: '2', label: '≥75 years' },
    ],
  },
  {
    id: 'diabetes',
    label: 'Diabetes Mellitus',
    type: 'checkbox',
  },
  {
    id: 'stroke',
    label: 'Prior Stroke/TIA/Thromboembolism',
    type: 'checkbox',
  },
  {
    id: 'vascular',
    label: 'Vascular Disease',
    type: 'checkbox',
    helpText: 'Prior MI, peripheral arterial disease, or aortic plaque',
  },
  {
    id: 'sex',
    label: 'Sex',
    type: 'radio',
    required: true,
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
    ],
  },
];

const chads2vascInterpretations: Interpretation[] = [
  {
    condition: (result) => (result.value as number) === 0,
    message: 'Low risk - Anticoagulation generally not recommended',
    riskLevel: 'low',
    recommendations: ['Annual stroke risk: 0%', 'No antithrombotic therapy recommended'],
  },
  {
    condition: (result) => (result.value as number) === 1,
    message: 'Low-moderate risk - Consider anticoagulation',
    riskLevel: 'moderate',
    recommendations: [
      'Annual stroke risk: 1.3%',
      'Consider oral anticoagulation',
      'Discuss risks and benefits with patient',
    ],
  },
  {
    condition: (result) => (result.value as number) >= 2,
    message: 'Moderate-high risk - Oral anticoagulation recommended',
    riskLevel: 'high',
    recommendations: [
      'Annual stroke risk: ≥2.2%',
      'Oral anticoagulation recommended (warfarin or DOAC)',
      'Consider patient preferences and bleeding risk',
    ],
  },
];

export const CHADS2VAScCalculator: React.FC = () => {
  const calculate = (values: Record<string, any>): CalculatorResult => {
    let score = 0;

    // CHF: 1 point
    if (values.chf) score += 1;

    // Hypertension: 1 point
    if (values.hypertension) score += 1;

    // Age: 1 or 2 points
    score += parseInt(values.age || '0');

    // Diabetes: 1 point
    if (values.diabetes) score += 1;

    // Stroke/TIA: 2 points
    if (values.stroke) score += 2;

    // Vascular disease: 1 point
    if (values.vascular) score += 1;

    // Female sex: 1 point
    if (values.sex === 'female') score += 1;

    return {
      value: score,
      label: 'CHA₂DS₂-VASc Score',
      interpretation: 'Stroke risk assessment in atrial fibrillation',
      reference: {
        min: 0,
        max: 9,
      },
    };
  };

  return (
    <Calculator
      title="CHA₂DS₂-VASc Score"
      description="Stroke risk assessment in atrial fibrillation"
      inputs={chads2vascInputs}
      calculate={calculate}
      interpretations={chads2vascInterpretations}
      references={[
        {
          title: 'Lip GY, et al. Refining clinical risk stratification for predicting stroke and thromboembolism in atrial fibrillation',
          citation: 'Chest. 2010;137(2):263-272',
        },
      ]}
    />
  );
};

// ============================================================================
// WELLS SCORE FOR DVT
// ============================================================================

const wellsDVTInputs: CalculatorInput[] = [
  {
    id: 'paralysis',
    label: 'Active cancer (treatment within 6 months or palliative)',
    type: 'checkbox',
  },
  {
    id: 'bedridden',
    label: 'Bedridden recently >3 days or major surgery within 12 weeks',
    type: 'checkbox',
  },
  {
    id: 'calf_swelling',
    label: 'Calf swelling >3 cm compared to other leg',
    type: 'checkbox',
  },
  {
    id: 'collateral_veins',
    label: 'Collateral superficial veins (non-varicose)',
    type: 'checkbox',
  },
  {
    id: 'entire_leg_swollen',
    label: 'Entire leg swollen',
    type: 'checkbox',
  },
  {
    id: 'localized_tenderness',
    label: 'Localized tenderness along deep venous system',
    type: 'checkbox',
  },
  {
    id: 'pitting_edema',
    label: 'Pitting edema (confined to symptomatic leg)',
    type: 'checkbox',
  },
  {
    id: 'previous_dvt',
    label: 'Previously documented DVT',
    type: 'checkbox',
  },
  {
    id: 'alternative_diagnosis',
    label: 'Alternative diagnosis at least as likely',
    type: 'checkbox',
    helpText: 'Subtracts 2 points if checked',
  },
];

const wellsDVTInterpretations: Interpretation[] = [
  {
    condition: (result) => (result.value as number) <= 0,
    message: 'Low probability of DVT',
    riskLevel: 'low',
    recommendations: [
      'DVT prevalence: ~5%',
      'D-dimer testing reasonable',
      'Ultrasound if D-dimer positive',
    ],
  },
  {
    condition: (result) => (result.value as number) >= 1 && (result.value as number) <= 2,
    message: 'Moderate probability of DVT',
    riskLevel: 'moderate',
    recommendations: [
      'DVT prevalence: ~17%',
      'Consider D-dimer or ultrasound',
      'Ultrasound recommended if D-dimer positive',
    ],
  },
  {
    condition: (result) => (result.value as number) >= 3,
    message: 'High probability of DVT',
    riskLevel: 'high',
    recommendations: [
      'DVT prevalence: ~53%',
      'Ultrasound recommended',
      'Consider empiric anticoagulation pending imaging',
    ],
  },
];

export const WellsDVTCalculator: React.FC = () => {
  const calculate = (values: Record<string, any>): CalculatorResult => {
    let score = 0;

    // Each checked item (except alternative diagnosis) adds 1 point
    Object.keys(values).forEach((key) => {
      if (key === 'alternative_diagnosis') {
        if (values[key]) score -= 2;
      } else if (values[key]) {
        score += 1;
      }
    });

    return {
      value: score,
      label: "Wells' Score for DVT",
      interpretation: 'Deep vein thrombosis probability',
    };
  };

  return (
    <Calculator
      title="Wells' Score for DVT"
      description="Assess probability of deep vein thrombosis"
      inputs={wellsDVTInputs}
      calculate={calculate}
      interpretations={wellsDVTInterpretations}
      references={[
        {
          title: "Wells PS, et al. Value of assessment of pretest probability of deep-vein thrombosis in clinical management",
          citation: 'Lancet. 1997;350(9094):1795-1798',
        },
      ]}
    />
  );
};
