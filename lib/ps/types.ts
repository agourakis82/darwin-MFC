export type EmergencyDrugCategory =
  | 'vasoativa'
  | 'rsi'
  | 'antidoto'
  | 'antiarritmico'
  | 'sedacao'
  | 'analgesico'
  | 'trombolitico'
  | 'anticoagulante'
  | 'anticonvulsivante'
  | 'eletrolitico'
  | 'outro';

export type InfusionUnit =
  | 'mcg/kg/min'
  | 'mcg/min'
  | 'mg/kg/h'
  | 'mg/h'
  | 'U/min'
  | 'U/h'
  | 'mL/h'
  | 'mL/kg/h';

export type DoseUnit =
  | 'mg'
  | 'mg/kg'
  | 'mcg'
  | 'mcg/kg'
  | 'g'
  | 'U'
  | 'U/kg'
  | 'mEq'
  | 'mEq/kg'
  | 'mL'
  | 'mL/kg';

export interface Dilution {
  description: string;
  solute: string;
  soluteVolume: string;
  diluent: string;
  diluentVolume: string;
  finalVolume: number;
  finalConcentration: number;
  concentrationUnit: string;
  stability: string;
  photoprotection?: boolean;
}

export interface InfusionStep {
  dosePerKgMin: number;
  unit: InfusionUnit;
}

export interface EmergencyDosing {
  indication: string;
  route: string;
  doseRange: { min: number; max: number };
  doseUnit: DoseUnit;
  maxDose?: string;
  bolus?: string;
  infusion?: {
    dilution: Dilution;
    rateRange: { min: number; max: number };
    rateUnit: InfusionUnit;
    steps: InfusionStep[];
  };
  onset?: string;
  peak?: string;
  duration?: string;
  notes?: string[];
  adjustments?: {
    condition: string;
    modification: string;
  }[];
}

export type YCompatibility = 'compatible' | 'incompatible' | 'unknown';

export interface YCompatibilityEntry {
  drugId: string;
  drugName: string;
  status: YCompatibility;
}

export interface EmergencyDrug {
  id: string;
  genericName: string;
  tradeName: string[];
  category: EmergencyDrugCategory;
  subcategory?: string;
  atcCode: string;
  snomedCT?: string;
  rename: boolean;
  sus: boolean;
  presentations: string[];
  mechanismOfAction: string;
  emergencyDosing: EmergencyDosing[];
  contraindications: string[];
  seriousAdverseEffects: string[];
  yCompatibility: YCompatibilityEntry[];
  renalAdjustment?: {
    gfr: string;
    adjustment: string;
  }[];
  pregnancyCategory: string;
  references: {
    citation: string;
    year: number;
    guideline?: string;
    pmid?: string;
  }[];
  keywords: string[];
}

export interface ProtocolStopPoint {
  title: string;
  description: string;
  items: string[];
  actionLabel: string;
}

export interface EmergencyProtocolStep {
  id: string;
  title: string;
  description: string;
  type: 'action' | 'decision' | 'drug' | 'timer' | 'checklist' | 'score';
  drugId?: string;
  scoreId?: string;
  timerSeconds?: number;
  checklistItems?: string[];
  options?: {
    label: string;
    nextStepId: string;
    condition?: string;
  }[];
  nextStepId?: string;
  alertLevel?: 'info' | 'warning' | 'critical';
  notes?: string[];
  stopPoint?: ProtocolStopPoint;
}

export interface EmergencyProtocol {
  id: string;
  name: string;
  shortName: string;
  description: string;
  category: string;
  color: string;
  icon: string;
  steps: EmergencyProtocolStep[];
  references: {
    citation: string;
    year: number;
    guideline?: string;
    pmid?: string;
  }[];
  relatedScores: string[];
  relatedDrugs: string[];
}

export interface ScoreInput {
  id: string;
  label: string;
  type: 'select' | 'number' | 'boolean';
  options?: { label: string; value: number }[];
  min?: number;
  max?: number;
  unit?: string;
}

export interface ScoreInterpretationRange {
  min: number;
  max: number;
  label: string;
  severity: 'low' | 'moderate' | 'high' | 'very-high' | 'critical';
  recommendation: string;
  color: string;
}

export interface EmergencyScore {
  id: string;
  name: string;
  abbreviation: string;
  category: string;
  description: string;
  inputs: ScoreInput[];
  calculate: (values: Record<string, number>) => number;
  maxScore: number;
  interpretationRanges: ScoreInterpretationRange[];
  references: {
    citation: string;
    year: number;
  }[];
  relatedProtocols: string[];
  keywords: string[];
}

export function calculateInfusionRate(
  weightKg: number,
  dosePerKgMin: number,
  concentrationMcgPerMl: number
): number {
  const mcgPerMin = dosePerKgMin * weightKg;
  const mlPerMin = mcgPerMin / concentrationMcgPerMl;
  return Math.round(mlPerMin * 60 * 10) / 10;
}

export function calculateBolusDose(
  weightKg: number,
  dosePerKg: number
): number {
  return Math.round(weightKg * dosePerKg * 100) / 100;
}

export function generateInfusionTable(
  weightKg: number,
  steps: { dosePerKgMin: number; unit: InfusionUnit }[],
  concentrationMcgPerMl: number
): { dose: number; unit: string; dosePerMin: number; mlPerHour: number }[] {
  return steps.map((step) => {
    const dosePerMin = step.dosePerKgMin * weightKg;
    const mlPerHour = calculateInfusionRate(
      weightKg,
      step.dosePerKgMin,
      concentrationMcgPerMl
    );
    return {
      dose: step.dosePerKgMin,
      unit: step.unit,
      dosePerMin: Math.round(dosePerMin * 100) / 100,
      mlPerHour,
    };
  });
}
