// @ts-nocheck
/**
 * CALCULADORAS MÉDICAS DE EMERGÊNCIA
 * Sistema de calculadoras essenciais para medicina de família em zonas críticas
 * Otimizado para situações extremas e uso offline
 */

export interface CalculatorResult {
  value: number;
  unit: string;
  category: 'normal' | 'mild_abnormal' | 'moderate_abnormal' | 'severe_abnormal' | 'critical';
  interpretation: string;
  recommendations: string[];
  warnings?: string[];
  nextSteps?: string[];
}

export interface CalculatorParameters {
  weight?: number; // kg
  age?: number; // anos
  gender?: 'male' | 'female';
  height?: number; // cm
  creatinine?: number; // mg/dL
  medication?: string;
  dosage?: number;
  [key: string]: any;
}

// 1. CALCULADORA DE DOSES PEDIÁTRICAS
export class PediatricDoseCalculator {
  
  /**
   * Calcula dose pediátrica por peso
   */
  static calculateDoseByWeight(
    adultDose: number,
    childWeight: number,
    adultWeight: number = 70
  ): CalculatorResult {
    const dose = (adultDose * childWeight) / adultWeight;
    
    return {
      value: Math.round(dose * 100) / 100,
      unit: 'mg',
      category: 'normal',
      interpretation: `Dose calculada: ${dose.toFixed(2)}mg`,
      recommendations: [
        'Verificar dose máxima diária',
        'Confirmar idade e peso',
        'Considerar via de administração'
      ]
    };
  }

  /**
   * Calcula dose pediátrica por superfície corporal
   */
  static calculateDoseByBSA(
    adultDose: number,
    childWeight: number,
    childHeight: number
  ): CalculatorResult {
    const childBSA = this.calculateBSA(childWeight, childHeight);
    const adultBSA = 1.73; // Adulto médio
    
    const dose = (adultDose * childBSA) / adultBSA;
    
    return {
      value: Math.round(dose * 100) / 100,
      unit: 'mg',
      category: 'normal',
      interpretation: `Dose baseada em BSA: ${dose.toFixed(2)}mg`,
      recommendations: [
        'BSA mais precisa que peso',
        'Ideal para medicamentos tóxicos',
        'Confirmar altura correta'
      ]
    };
  }

  /**
   * Calcula superfície corporal (fórmula de Mosteller)
   */
  static calculateBSA(weight: number, height: number): number {
    return Math.sqrt((weight * height) / 3600);
  }

  /**
   * Dose de paracetamol pediátrica
   */
  static calculateParacetamolDose(weight: number): CalculatorResult {
    const dosePerKg = 15; // mg/kg
    const maxDose = 75 * weight; // mg/kg/dia
    const maxSingle = 1000; // mg por dose
    const calculatedDose = dosePerKg * weight;
    
    let category: CalculatorResult['category'] = 'normal';
    let interpretation = `Dose de paracetamol: ${calculatedDose}mg`;
    
    if (calculatedDose > maxSingle) {
      category = 'severe_abnormal';
      interpretation += ' - EXCEDE DOSE MÁXIMA';
    }

    return {
      value: Math.round(calculatedDose),
      unit: 'mg',
      category,
      interpretation,
      recommendations: [
        'Máximo 75mg/kg/dia',
        'Intervalo mínimo 6h entre doses',
        'Não exceder 4g/dia em adultos'
      ],
      warnings: calculatedDose > maxSingle ? ['DOSE EXCESSIVA - NÃO ADMINISTRAR'] : undefined
    };
  }

  /**
   * Dose de ibuprofeno pediátrica
   */
  static calculateIbuprofenDose(weight: number): CalculatorResult {
    const dosePerKg = 10; // mg/kg
    const maxDose = 40 * weight; // mg/kg/dia
    const maxSingle = 400; // mg por dose
    const calculatedDose = dosePerKg * weight;
    
    let category: CalculatorResult['category'] = 'normal';
    let interpretation = `Dose de ibuprofeno: ${calculatedDose}mg`;
    
    if (calculatedDose > maxSingle) {
      category = 'severe_abnormal';
      interpretation += ' - EXCEDE DOSE MÁXIMA';
    }

    return {
      value: Math.round(calculatedDose),
      unit: 'mg',
      category,
      interpretation,
      recommendations: [
        'Máximo 40mg/kg/dia',
        'Intervalo mínimo 6-8h',
        'Não usar < 6 meses'
      ],
      warnings: calculatedDose > maxSingle ? ['DOSE EXCESSIVA'] : undefined
    };
  }

  /**
   * Dose de adrenalina em parada pediátrica
   */
  static calculatePediatricEpinephrine(weight: number): CalculatorResult {
    const dose = 0.01 * weight; // mg/kg (1:10.000 = 0.1mg/ml)
    const volume = dose * 10; // ml da solução 1:10.000
    
    return {
      value: Math.round(volume * 100) / 100,
      unit: 'ml',
      category: 'critical',
      interpretation: `Adrenalina: ${dose.toFixed(3)}mg (${volume.toFixed(2)}ml)`,
      recommendations: [
        'Solução 1:10.000',
        'Repetir a cada 3-5min',
        'Via IV/IO preferencial'
      ],
      warnings: ['DOSE CRÍTICA - VERIFICAR CÁLCULO']
    };
  }
}

// 2. CALCULADORA DE CLEARANCE DE CREATININA
export class CreatinineClearanceCalculator {
  
  /**
   * Fórmula de Cockcroft-Gault
   */
  static cockcroftGault(
    creatinine: number,
    weight: number,
    age: number,
    gender: 'male' | 'female'
  ): CalculatorResult {
    let crcl;
    
    if (gender === 'male') {
      crcl = ((140 - age) * weight) / (72 * creatinine);
    } else {
      crcl = ((140 - age) * weight * 0.85) / (72 * creatinine);
    }

    let category: CalculatorResult['category'] = 'normal';
    let interpretation = `Clearance: ${crcl.toFixed(1)} ml/min`;
    let recommendations = ['Avaliar função renal'];

    if (crcl < 15) {
      category = 'severe_abnormal';
      interpretation += ' - INSUFICIÊNCIA RENAL SEVERA';
      recommendations = [
        'Diálise urgente se indicado',
        'Ajustar doses de medicamentos',
        'Monitorar eletrólitos'
      ];
    } else if (crcl < 30) {
      category = 'moderate_abnormal';
      interpretation += ' - INSUFICIÊNCIA RENAL MODERADA';
      recommendations = [
        'Evitar nefrotóxicos',
        'Ajustar doses de medicamentos'
      ];
    } else if (crcl < 60) {
      category = 'mild_abnormal';
      interpretation += ' - INSUFICIÊNCIA RENAL LEVE';
      recommendations = [
        'Monitorizar função renal',
        'Hidratação adequada'
      ];
    }

    return {
      value: Math.round(crcl),
      unit: 'ml/min',
      category,
      interpretation,
      recommendations
    };
  }

  /**
   * Fórmula de Schwartz (pediátrica)
   */
  static schwartz(creatinine: number, height: number, age: number): CalculatorResult {
    const k = age < 1 ? 0.33 : 0.45; // constante por idade
    const crcl = (k * height) / creatinine;

    return {
      value: Math.round(crcl),
      unit: 'ml/min/1.73m²',
      category: crcl < 60 ? 'mild_abnormal' : 'normal',
      interpretation: `Clearance pediátrica: ${crcl.toFixed(1)} ml/min/1.73m²`,
      recommendations: [
        'Fórmula de Schwartz',
        'Interpretar por idade da criança'
      ]
    };
  }

  /**
   * Equação CKD-EPI (revisada)
   */
  static ckdEpi(
    creatinine: number,
    age: number,
    gender: 'male' | 'female',
    race: 'black' | 'non-black' = 'non-black'
  ): CalculatorResult {
    let kappa;
    let alpha;
    let genderFactor;
    
    if (gender === 'female') {
      kappa = 0.7;
      alpha = -0.329;
      genderFactor = 1.018;
    } else {
      kappa = 0.9;
      alpha = -0.411;
      genderFactor = 1;
    }

    let egfr = (141 * Math.pow((creatinine / kappa), alpha) * Math.pow(1.200, age) * 0.993 * genderFactor);
    
    if (race === 'black') {
      egfr *= 1.159;
    }

    return {
      value: Math.round(egfr),
      unit: 'ml/min/1.73m²',
      category: egfr < 60 ? 'mild_abnormal' : 'normal',
      interpretation: `eGFR: ${egfr.toFixed(1)} ml/min/1.73m²`,
      recommendations: [
        'Método mais moderno',
        'Não usar em < 18 anos',
        'Interpretar com idade'
      ]
    };
  }
}

// 3. CALCULADORA DE SORO DE REIDRATAÇÃO ORAL
export class OralRehydrationCalculator {
  
  /**
   * Calcula déficit hídrico
   */
  static calculateFluidDeficit(
    weight: number,
    dehydrationPercent: number
  ): CalculatorResult {
    const deficitMl = weight * dehydrationPercent * 10; // ml
    
    return {
      value: deficitMl,
      unit: 'ml',
      category: dehydrationPercent > 10 ? 'critical' : dehydrationPercent > 5 ? 'moderate_abnormal' : 'mild_abnormal',
      interpretation: `Déficit hídrico: ${deficitMl}ml (${dehydrationPercent}%)`,
      recommendations: [
        'Repor em 4-6 horas',
        'Monitorizar sinais vitais',
        'Verificar diurese'
      ],
      warnings: dehydrationPercent > 15 ? ['DESIDRATAÇÃO GRAVE - HOSPITALIZAÇÃO'] : undefined
    };
  }

  /**
   * Calcula necessidade de manutenção
   */
  static calculateMaintenanceFluids(weight: number): CalculatorResult {
    let maintenanceMl;
    
    if (weight <= 10) {
      maintenanceMl = weight * 100; // 100ml/kg para os primeiros 10kg
    } else if (weight <= 20) {
      maintenanceMl = 1000 + (weight - 10) * 50; // +50ml/kg para peso 10-20kg
    } else {
      maintenanceMl = 1500 + (weight - 20) * 20; // +20ml/kg para peso > 20kg
    }

    return {
      value: Math.round(maintenanceMl),
      unit: 'ml/dia',
      category: 'normal',
      interpretation: `Manutenção: ${maintenanceMl}ml/dia`,
      recommendations: [
        'Fórmula de Holliday-Segar',
        'Repartir em 24 horas',
        'Ajustar conforme perdas'
      ]
    };
  }

  /**
   * Composição do SRO
   */
  static getSROComposition(): {
    sodium: number;
    chloride: number;
    potassium: number;
    glucose: number;
    osmolarity: number;
  } {
    return {
      sodium: 75, // mEq/L
      chloride: 65, // mEq/L
      potassium: 20, // mEq/L
      glucose: 75, // mEq/L
      osmolarity: 245 // mOsm/L
    };
  }
}

// 4. CALCULADORA DE INSULINA EM CETOACIDOSE
export class InsulinDKACalculator {
  
  /**
   * Dose inicial de insulina em cetoacidose
   */
  static calculateInitialInsulinDose(
    weight: number,
    glucose: number
  ): CalculatorResult {
    // Dose usual: 0.1 U/kg/h em infusão contínua
    const initialDose = weight * 0.1;
    
    return {
      value: Math.round(initialDose * 10) / 10,
      unit: 'U/h',
      category: 'critical',
      interpretation: `Insulina: ${initialDose.toFixed(1)}U/h em infusão`,
      recommendations: [
        'Infusão contínua preferencial',
        'Verificar glicemia a cada 1-2h',
        'Protocolo de cetoacidose diabética'
      ],
      warnings: ['DOSE CRÍTICA - MONITORIZAÇÃO CONTÍNUA']
    };
  }

  /**
   * Dose de insulina em bolus
   */
  static calculateInsulinBolus(
    weight: number,
    glucose: number
  ): CalculatorResult {
    // Dose usual: 0.1 U/kg IV
    const bolusDose = weight * 0.1;
    
    return {
      value: Math.round(bolusDose),
      unit: 'U',
      category: 'critical',
      interpretation: `Bolus insulina: ${bolusDose}U IV`,
      recommendations: [
        'Após reposição hídrica',
        'Verificar cetonas',
        'Iniciar infusão contínua'
      ],
      warnings: ['BOLUS ÚNICO - NÃO REPETIR SEM AVALIAR']
    };
  }

  /**
   * Ajuste de insulina conforme glicemia
   */
  static adjustInsulinByGlucose(glucose: number): {
    adjustment: string;
    action: string;
  } {
    if (glucose > 250) {
      return {
        adjustment: '+',
        action: 'Aumentar infusão em 1-2 U/h'
      };
    } else if (glucose < 150) {
      return {
        adjustment: '-',
        action: 'Diminuir infusão em 1-2 U/h'
      };
    } else {
      return {
        adjustment: '=',
        action: 'Manter dose atual'
      };
    }
  }
}

// 5. CALCULADORA DE DOSES DE EMERGÊNCIA
export class EmergencyDoseCalculator {
  
  /**
   * Adrenalina em anafilaxia
   */
  static calculateEpinephrineAnaphylaxis(weight: number): CalculatorResult {
    const dose = 0.01 * weight; // mg/kg
    const volume = dose * 10; // ml da solução 1:10.000
    
    return {
      value: Math.round(volume * 100) / 100,
      unit: 'ml',
      category: 'critical',
      interpretation: `Adrenalina anafilaxia: ${volume.toFixed(2)}ml (1:10.000)`,
      recommendations: [
        'Via intramuscular (face anterolateral da coxa)',
        'Repetir a cada 5-15min se necessário',
        'Hospitalizar para observação'
      ],
      warnings: ['EMERGÊNCIA VITAL - ADMINISTRAR IMEDIATAMENTE']
    };
  }

  /**
   * Atropina em bradicardia
   */
  static calculateAtropineBradycardia(
    weight: number,
    severity: 'mild' | 'severe'
  ): CalculatorResult {
    const dose = severity === 'severe' ? 0.04 : 0.02; // mg/kg
    const calculatedDose = dose * weight;
    
    return {
      value: Math.round(calculatedDose * 100) / 100,
      unit: 'mg',
      category: 'critical',
      interpretation: `Atropina: ${calculatedDose.toFixed(2)}mg IV`,
      recommendations: [
        'Dose mínima: 0.5mg IV',
        'Dose máxima: 3mg',
        'Repetir em 3-5min se necessário'
      ]
    };
  }

  /**
   * Adrenalina em parada cardíaca
   */
  static calculateEpinephrineCardiacArrest(weight: number): CalculatorResult {
    const dose = 0.01 * weight; // mg/kg
    const volume = dose * 10; // ml da solução 1:10.000
    
    return {
      value: Math.round(volume * 100) / 100,
      unit: 'ml',
      category: 'critical',
      interpretation: `Adrenalina PCR: ${volume.toFixed(2)}ml (1:10.000)`,
      recommendations: [
        'Via IV/IO',
        'A cada 3-5min durante PCR',
        'Continuar até retorno da circulação'
      ],
      warnings: ['PARADA CARDÍACA - NÃO HESITAR']
    };
  }
}

// 6. CALCULADORA DE ESCORES CLÍNICOS
export class ClinicalScoreCalculator {
  
  /**
   * Escala de coma de Glasgow
   */
  static glasgowComaScale(
    eye: number,
    verbal: number,
    motor: number
  ): {
    total: number;
    category: CalculatorResult['category'];
    interpretation: string;
    recommendations: string[];
  } {
    const total = eye + verbal + motor;
    
    let category: CalculatorResult['category'];
    let interpretation: string;
    let recommendations: string[];

    if (total <= 8) {
      category = 'critical';
      interpretation = `Glasgow: ${total} - COMA`;
      recommendations = [
        'Via aérea comprometida',
        'Intubação orotraqueal',
        'TC de crânio urgente'
      ];
    } else if (total <= 12) {
      category = 'moderate_abnormal';
      interpretation = `Glasgow: ${total} - ALTERAÇÃO MODERADA`;
      recommendations = [
        'Monitorização neurológica',
        'TC de crânio se indicado',
        'Reavaliação seriada'
      ];
    } else {
      category = 'normal';
      interpretation = `Glasgow: ${total} - NORMAL`;
      recommendations = [
        'Continuar avaliação',
        'Monitorização de rotina'
      ];
    }

    return { total, category, interpretation, recommendations };
  }

  /**
   * Score de risco de mortalidade (MRS)
   */
  static mortalityRiskScore(
    age: number,
    comorbidities: number,
    severity: number
  ): CalculatorResult {
    let score = 0;
    
    // Idade
    if (age > 75) score += 3;
    else if (age > 65) score += 2;
    else if (age > 55) score += 1;
    
    // Comorbidades
    score += comorbidities;
    
    // Severidade
    score += severity;

    return {
      value: score,
      unit: 'pontos',
      category: score >= 8 ? 'critical' : score >= 5 ? 'moderate_abnormal' : 'normal',
      interpretation: `Score de risco: ${score} pontos`,
      recommendations: [
        'Avaliar prognóstico',
        'Planejar cuidados intensivos',
        'Discutir com família'
      ]
    };
  }
}

// GERENCIADOR DE CALCULADORAS
export class EmergencyCalculatorManager {
  private calculators: Map<string, any> = new Map();

  constructor() {
    this.initializeCalculators();
  }

  private initializeCalculators() {
    this.calculators.set('pediatric_dose', PediatricDoseCalculator);
    this.calculators.set('creatinine_clearance', CreatinineClearanceCalculator);
    this.calculators.set('oral_rehydration', OralRehydrationCalculator);
    this.calculators.set('insulin_dka', InsulinDKACalculator);
    this.calculators.set('emergency_dose', EmergencyDoseCalculator);
    this.calculators.set('clinical_score', ClinicalScoreCalculator);
  }

  /**
   * Executa cálculo específico
   */
  calculate(
    calculatorName: string,
    methodName: string,
    parameters: CalculatorParameters
  ): CalculatorResult {
    const calculator = this.calculators.get(calculatorName);
    if (!calculator) {
      throw new Error(`Calculadora ${calculatorName} não encontrada`);
    }

    const method = calculator[methodName];
    if (!method || typeof method !== 'function') {
      throw new Error(`Método ${methodName} não encontrado na calculadora ${calculatorName}`);
    }

    return method.apply(calculator, Object.values(parameters));
  }

  /**
   * Lista calculadoras disponíveis
   */
  getAvailableCalculators(): string[] {
    return Array.from(this.calculators.keys());
  }

  /**
   * Valida parâmetros necessários
   */
  validateParameters(
    calculatorName: string,
    methodName: string,
    parameters: CalculatorParameters
  ): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Validações básicas por tipo de cálculo
    if (calculatorName === 'pediatric_dose') {
      if (!parameters.weight) errors.push('Peso é obrigatório');
      if (parameters.weight && parameters.weight < 0) errors.push('Peso deve ser positivo');
    }
    
    if (calculatorName === 'creatinine_clearance') {
      if (!parameters.creatinine) errors.push('Creatinina é obrigatória');
      if (!parameters.age) errors.push('Idade é obrigatória');
      if (!parameters.gender) errors.push('Sexo é obrigatório');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// Instância global
export const emergencyCalculatorManager = new EmergencyCalculatorManager();

// Export para compatibilidade
export default emergencyCalculatorManager;