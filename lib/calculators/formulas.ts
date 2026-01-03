/**
 * DARWIN-MFC CLINICAL CALCULATOR FORMULAS
 * ========================================
 *
 * Mathematical utilities and common formulas used across clinical calculators.
 * Includes unit conversions, physiological calculations, and scoring utilities.
 */

// =============================================================================
// UNIT CONVERSIONS
// =============================================================================

/**
 * Weight conversions
 */
export const weight = {
  /** Kilograms to pounds */
  kgToLb: (kg: number): number => kg * 2.20462,

  /** Pounds to kilograms */
  lbToKg: (lb: number): number => lb / 2.20462,

  /** Kilograms to stones */
  kgToStone: (kg: number): number => kg * 0.157473,

  /** Stones to kilograms */
  stoneToKg: (stone: number): number => stone / 0.157473,
};

/**
 * Length/Height conversions
 */
export const length = {
  /** Centimeters to inches */
  cmToIn: (cm: number): number => cm / 2.54,

  /** Inches to centimeters */
  inToCm: (inches: number): number => inches * 2.54,

  /** Meters to feet */
  mToFt: (m: number): number => m * 3.28084,

  /** Feet to meters */
  ftToM: (ft: number): number => ft / 3.28084,

  /** Feet and inches to centimeters */
  ftInToCm: (feet: number, inches: number): number => (feet * 12 + inches) * 2.54,
};

/**
 * Temperature conversions
 */
export const temperature = {
  /** Celsius to Fahrenheit */
  cToF: (c: number): number => (c * 9) / 5 + 32,

  /** Fahrenheit to Celsius */
  fToC: (f: number): number => ((f - 32) * 5) / 9,
};

/**
 * Volume conversions
 */
export const volume = {
  /** Liters to milliliters */
  lToMl: (l: number): number => l * 1000,

  /** Milliliters to liters */
  mlToL: (ml: number): number => ml / 1000,

  /** US fluid ounces to milliliters */
  ozToMl: (oz: number): number => oz * 29.5735,
};

/**
 * Lab value conversions
 */
export const labValues = {
  /** Creatinine: mg/dL to μmol/L */
  creatinineMgToUmol: (mgdl: number): number => mgdl * 88.4,

  /** Creatinine: μmol/L to mg/dL */
  creatinineUmolToMg: (umol: number): number => umol / 88.4,

  /** Bilirubin: mg/dL to μmol/L */
  bilirubinMgToUmol: (mgdl: number): number => mgdl * 17.1,

  /** Bilirubin: μmol/L to mg/dL */
  bilirubinUmolToMg: (umol: number): number => umol / 17.1,

  /** Glucose: mg/dL to mmol/L */
  glucoseMgToMmol: (mgdl: number): number => mgdl / 18.0182,

  /** Glucose: mmol/L to mg/dL */
  glucoseMmolToMg: (mmol: number): number => mmol * 18.0182,

  /** Cholesterol: mg/dL to mmol/L */
  cholesterolMgToMmol: (mgdl: number): number => mgdl / 38.67,

  /** Cholesterol: mmol/L to mg/dL */
  cholesterolMmolToMg: (mmol: number): number => mmol * 38.67,

  /** Triglycerides: mg/dL to mmol/L */
  trigMgToMmol: (mgdl: number): number => mgdl / 88.57,

  /** Triglycerides: mmol/L to mg/dL */
  trigMmolToMg: (mmol: number): number => mmol * 88.57,

  /** Hemoglobin: g/dL to g/L */
  hbGdlToGl: (gdl: number): number => gdl * 10,

  /** Hemoglobin: g/L to g/dL */
  hbGlToGdl: (gl: number): number => gl / 10,

  /** Urea/BUN: mg/dL to mmol/L */
  bunMgToMmol: (mgdl: number): number => mgdl / 2.8,

  /** Urea/BUN: mmol/L to mg/dL */
  bunMmolToMg: (mmol: number): number => mmol * 2.8,
};

// =============================================================================
// BODY MEASUREMENTS
// =============================================================================

/**
 * Calculate Body Mass Index (BMI)
 * @param weightKg Weight in kilograms
 * @param heightCm Height in centimeters
 * @returns BMI in kg/m²
 */
export function calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

/**
 * Calculate Body Surface Area (BSA) using Mosteller formula
 * @param weightKg Weight in kilograms
 * @param heightCm Height in centimeters
 * @returns BSA in m²
 */
export function calculateBSA(weightKg: number, heightCm: number): number {
  return Math.sqrt((weightKg * heightCm) / 3600);
}

/**
 * Calculate Body Surface Area using DuBois formula
 * @param weightKg Weight in kilograms
 * @param heightCm Height in centimeters
 * @returns BSA in m²
 */
export function calculateBSADuBois(weightKg: number, heightCm: number): number {
  return 0.007184 * Math.pow(weightKg, 0.425) * Math.pow(heightCm, 0.725);
}

/**
 * Calculate Ideal Body Weight (IBW) using Devine formula
 * @param heightCm Height in centimeters
 * @param isMale Whether the patient is male
 * @returns IBW in kilograms
 */
export function calculateIBW(heightCm: number, isMale: boolean): number {
  const heightIn = length.cmToIn(heightCm);
  const inchesOver5Feet = Math.max(0, heightIn - 60);

  if (isMale) {
    return 50 + 2.3 * inchesOver5Feet;
  }
  return 45.5 + 2.3 * inchesOver5Feet;
}

/**
 * Calculate Adjusted Body Weight (for obesity)
 * @param actualWeight Actual weight in kg
 * @param idealWeight Ideal body weight in kg
 * @returns Adjusted weight in kg
 */
export function calculateAdjustedBodyWeight(
  actualWeight: number,
  idealWeight: number
): number {
  return idealWeight + 0.4 * (actualWeight - idealWeight);
}

/**
 * Calculate Lean Body Weight using Boer formula
 * @param weightKg Weight in kilograms
 * @param heightCm Height in centimeters
 * @param isMale Whether the patient is male
 * @returns LBW in kilograms
 */
export function calculateLBW(
  weightKg: number,
  heightCm: number,
  isMale: boolean
): number {
  if (isMale) {
    return 0.407 * weightKg + 0.267 * heightCm - 19.2;
  }
  return 0.252 * weightKg + 0.473 * heightCm - 48.3;
}

// =============================================================================
// RENAL FUNCTION
// =============================================================================

/**
 * Calculate Creatinine Clearance using Cockcroft-Gault equation
 * @param age Age in years
 * @param weightKg Weight in kg
 * @param creatinineMgdl Serum creatinine in mg/dL
 * @param isMale Whether the patient is male
 * @returns CrCl in mL/min
 */
export function calculateCrCl(
  age: number,
  weightKg: number,
  creatinineMgdl: number,
  isMale: boolean
): number {
  const base = ((140 - age) * weightKg) / (72 * creatinineMgdl);
  return isMale ? base : base * 0.85;
}

/**
 * Calculate eGFR using CKD-EPI 2021 equation (race-free)
 * @param creatinineMgdl Serum creatinine in mg/dL
 * @param age Age in years
 * @param isMale Whether the patient is male
 * @returns eGFR in mL/min/1.73m²
 */
export function calculateEGFR(
  creatinineMgdl: number,
  age: number,
  isMale: boolean
): number {
  const kappa = isMale ? 0.9 : 0.7;
  const alpha = isMale ? -0.302 : -0.241;
  const factor = isMale ? 1.0 : 1.012;

  const scrOverKappa = creatinineMgdl / kappa;

  return (
    142 *
    Math.pow(Math.min(scrOverKappa, 1), alpha) *
    Math.pow(Math.max(scrOverKappa, 1), -1.2) *
    Math.pow(0.9938, age) *
    factor
  );
}

// =============================================================================
// CARDIOVASCULAR
// =============================================================================

/**
 * Calculate Mean Arterial Pressure (MAP)
 * @param systolic Systolic blood pressure in mmHg
 * @param diastolic Diastolic blood pressure in mmHg
 * @returns MAP in mmHg
 */
export function calculateMAP(systolic: number, diastolic: number): number {
  return diastolic + (systolic - diastolic) / 3;
}

/**
 * Calculate Pulse Pressure
 * @param systolic Systolic blood pressure in mmHg
 * @param diastolic Diastolic blood pressure in mmHg
 * @returns Pulse pressure in mmHg
 */
export function calculatePulsePressure(systolic: number, diastolic: number): number {
  return systolic - diastolic;
}

/**
 * Calculate Corrected QT interval (QTc) using Bazett's formula
 * @param qtMs QT interval in milliseconds
 * @param heartRate Heart rate in bpm
 * @returns QTc in milliseconds
 */
export function calculateQTcBazett(qtMs: number, heartRate: number): number {
  const rrSeconds = 60 / heartRate;
  return qtMs / Math.sqrt(rrSeconds);
}

/**
 * Calculate Corrected QT interval using Fridericia's formula
 * @param qtMs QT interval in milliseconds
 * @param heartRate Heart rate in bpm
 * @returns QTc in milliseconds
 */
export function calculateQTcFridericia(qtMs: number, heartRate: number): number {
  const rrSeconds = 60 / heartRate;
  return qtMs / Math.pow(rrSeconds, 1 / 3);
}

// =============================================================================
// RESPIRATORY
// =============================================================================

/**
 * Calculate A-a gradient (Alveolar-arterial oxygen gradient)
 * @param fio2 Fraction of inspired oxygen (0-1)
 * @param pao2 Arterial oxygen partial pressure in mmHg
 * @param paco2 Arterial CO2 partial pressure in mmHg
 * @param patmMmhg Atmospheric pressure in mmHg (default 760 at sea level)
 * @returns A-a gradient in mmHg
 */
export function calculateAaGradient(
  fio2: number,
  pao2: number,
  paco2: number,
  patmMmhg: number = 760
): number {
  const ph2o = 47; // Water vapor pressure at 37°C
  const pao2Alveolar = fio2 * (patmMmhg - ph2o) - paco2 / 0.8;
  return pao2Alveolar - pao2;
}

/**
 * Calculate expected A-a gradient based on age
 * @param age Age in years
 * @returns Expected A-a gradient upper limit
 */
export function expectedAaGradient(age: number): number {
  return (age / 4) + 4;
}

/**
 * Calculate P/F ratio (PaO2/FiO2)
 * @param pao2 Arterial oxygen partial pressure in mmHg
 * @param fio2 Fraction of inspired oxygen (0-1)
 * @returns P/F ratio
 */
export function calculatePFRatio(pao2: number, fio2: number): number {
  return pao2 / fio2;
}

/**
 * Calculate Oxygen Content (CaO2)
 * @param hb Hemoglobin in g/dL
 * @param sao2 Oxygen saturation (0-1)
 * @param pao2 Arterial PaO2 in mmHg
 * @returns CaO2 in mL O2/dL blood
 */
export function calculateO2Content(hb: number, sao2: number, pao2: number): number {
  const boundO2 = 1.34 * hb * sao2;
  const dissolvedO2 = 0.003 * pao2;
  return boundO2 + dissolvedO2;
}

// =============================================================================
// ACID-BASE
// =============================================================================

/**
 * Calculate expected PaCO2 in metabolic acidosis (Winter's formula)
 * @param hco3 Serum bicarbonate in mEq/L
 * @returns Expected PaCO2 range [min, max]
 */
export function calculateExpectedPCO2Acidosis(hco3: number): [number, number] {
  const expected = 1.5 * hco3 + 8;
  return [expected - 2, expected + 2];
}

/**
 * Calculate anion gap
 * @param na Sodium in mEq/L
 * @param cl Chloride in mEq/L
 * @param hco3 Bicarbonate in mEq/L
 * @returns Anion gap in mEq/L
 */
export function calculateAnionGap(na: number, cl: number, hco3: number): number {
  return na - (cl + hco3);
}

/**
 * Calculate corrected anion gap for albumin
 * @param anionGap Calculated anion gap
 * @param albumin Serum albumin in g/dL
 * @returns Corrected anion gap
 */
export function calculateCorrectedAnionGap(anionGap: number, albumin: number): number {
  return anionGap + 2.5 * (4 - albumin);
}

/**
 * Calculate delta ratio (gap-gap)
 * @param anionGap Current anion gap
 * @param hco3 Current bicarbonate
 * @param normalAG Normal anion gap (default 12)
 * @param normalHCO3 Normal bicarbonate (default 24)
 * @returns Delta ratio
 */
export function calculateDeltaRatio(
  anionGap: number,
  hco3: number,
  normalAG: number = 12,
  normalHCO3: number = 24
): number {
  return (anionGap - normalAG) / (normalHCO3 - hco3);
}

// =============================================================================
// ELECTROLYTES
// =============================================================================

/**
 * Calculate corrected sodium for hyperglycemia
 * @param na Measured sodium in mEq/L
 * @param glucose Serum glucose in mg/dL
 * @returns Corrected sodium in mEq/L
 */
export function calculateCorrectedSodium(na: number, glucose: number): number {
  return na + 0.016 * (glucose - 100);
}

/**
 * Calculate corrected calcium for albumin
 * @param ca Measured calcium in mg/dL
 * @param albumin Serum albumin in g/dL
 * @returns Corrected calcium in mg/dL
 */
export function calculateCorrectedCalcium(ca: number, albumin: number): number {
  return ca + 0.8 * (4 - albumin);
}

/**
 * Calculate free water deficit
 * @param na Current sodium in mEq/L
 * @param weightKg Weight in kg
 * @param targetNa Target sodium (default 140)
 * @returns Free water deficit in liters
 */
export function calculateFreeWaterDeficit(
  na: number,
  weightKg: number,
  targetNa: number = 140
): number {
  const tbw = 0.6 * weightKg; // Total body water (assumes male; use 0.5 for female)
  return tbw * ((na / targetNa) - 1);
}

// =============================================================================
// SCORING UTILITIES
// =============================================================================

/**
 * Sum points from a record of input values
 */
export function sumPoints(inputs: Record<string, number>): number {
  return Object.values(inputs).reduce((sum, val) => sum + (val || 0), 0);
}

/**
 * Count how many inputs meet a threshold
 */
export function countAboveThreshold(
  inputs: Record<string, number>,
  threshold: number
): number {
  return Object.values(inputs).filter((val) => val >= threshold).length;
}

/**
 * Round to specified decimal places
 */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Linear interpolation between two values
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Map a value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
