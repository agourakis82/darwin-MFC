/**
 * LOINC - LABORATÓRIOS E OBSERVAÇÕES
 * Sistema de codificação para exames laboratoriais e observações clínicas
 * Otimizado para zonas de emergência e medicina de família
 */

export interface LOINCCode {
  loincNum: string;
  component: string;
  property: string;
  timeAspect: string;
  system: string;
  scaleType: string;
  methodType: string;
  classType: string;
  orderObs: string;
  emergencyRelevance: 'low' | 'medium' | 'high' | 'critical';
  pediatricRange?: {
    ageGroup: string;
    minValue: number;
    maxValue: number;
    unit: string;
  };
  adultRange?: {
    minValue: number;
    maxValue: number;
    unit: string;
  };
  criticalValues?: {
    lowCritical: number;
    highCritical: number;
    unit: string;
    immediateAction: string;
  };
  turnaroundTime: 'immediate' | 'urgent' | 'routine' | 'stat';
  equipmentNeeded?: string;
  sampleType: string[];
}

export interface EmergencyLabTest {
  loincNum: string;
  testName: string;
  emergencyLevel: 'low' | 'medium' | 'high' | 'critical';
  criticalTime: number; // minutos para resultado
  immediateActions: string[];
  interpretation: {
    normal: string;
    abnormal: {
      low: string;
      high: string;
    };
  };
  relatedTests: string[];
  pediatricConsiderations: string;
  contraindications: string[];
}

// EXAMES CRÍTICOS PARA EMERGÊNCIA
export const EMERGENCY_LOINC_TESTS: Record<string, EmergencyLabTest> = {
  
  // GASOMETRIA ARTERIAL - EMERGÊNCIA RESPIRATÓRIA
  '59408-5': {
    loincNum: '59408-5',
    testName: 'Gasometria arterial - pH',
    emergencyLevel: 'critical',
    criticalTime: 10,
    immediateActions: [
      'Avaliar acidose/alkalose',
      'Calcular gap aniônico',
      'Interpretar distúrbio primário',
      'Avaliar compensação respiratória/metabólica'
    ],
    interpretation: {
      normal: 'pH 7.35-7.45',
      abnormal: {
        low: 'Acidose (pH < 7.35) - avaliar HCO3- e pCO2',
        high: 'Alcalose (pH > 7.45) - avaliar HCO3- e pCO2'
      }
    },
    relatedTests: ['59407-7', '59409-3', '1986-5'],
    pediatricConsiderations: 'pH normal 7.35-7.45, compensar alterações respiratórias mais rapidamente',
    contraindications: ['Distúrbios de coagulação severa', 'Infecção no local de punção']
  },

  // HEMOGRAMA COMPLETO - INFECÇÃO/SEPSE
  '58410-2': {
    loincNum: '58410-2',
    testName: 'Hemograma completo - Leucócitos',
    emergencyLevel: 'high',
    criticalTime: 30,
    immediateActions: [
      'Avaliar leucocitose/leucopenia',
      'Verificar desvio à esquerda',
      'Interpretar junto com PCR e procalcitonina',
      'Suspeitar infecção bacteriana/viral'
    ],
    interpretation: {
      normal: '4.000-11.000/mm³',
      abnormal: {
        low: 'Leucopenia (< 4.000) - Suspeitar infecção viral, immunossupressão',
        high: 'Leucocitose (> 11.000) - Infecção bacteriana, estresse, leucemia'
      }
    },
    relatedTests: ['718-7', '6690-2', '777-3'],
    pediatricConsiderations: 'Normal 6.000-17.500/mm³, interpretar com idade',
    contraindications: ['Nenhuma específica']
  },

  // GLICEMIA - EMERGÊNCIA ENDÓCRINA
  '2345-7': {
    loincNum: '2345-7',
    testName: 'Glicose - Soro',
    emergencyLevel: 'critical',
    criticalTime: 5,
    immediateActions: [
      'Se < 70mg/dL: Administrar glicose 50% IV',
      'Se > 400mg/dL: Suspeitar cetoacidose diabética',
      'Monitorizar a cada 1-2h',
      'Avaliar necessidade de insulina'
    ],
    interpretation: {
      normal: '70-100mg/dL (jejum)',
      abnormal: {
        low: 'Hipoglicemia (< 70mg/dL) - Risco de coma hipoglicêmico',
        high: 'Hiperglicemia (> 140mg/dL jejum) - Diabetes, estresse'
      }
    },
    relatedTests: ['1558-6', '12773-4', '1986-5'],
    pediatricConsiderations: 'Normal 60-100mg/dL, monitorizar em crianças diabéticas',
    contraindications: ['Nenhuma específica']
  },

  // TROPONINA - INFARTO AGUDO DO MIOCÁRDIO
  '6598-7': {
    loincNum: '6598-7',
    testName: 'Troponina I - Soro',
    emergencyLevel: 'critical',
    criticalTime: 60,
    immediateActions: [
      'Se elevada: Protocolo IAM',
      'Repetir em 3-6h para tendência',
      'Avaliar com ECG e clínica',
      'Preparar para cateterismo'
    ],
    interpretation: {
      normal: '< 0.04 ng/mL',
      abnormal: {
        low: 'Valores normais não excluem IAM precoce',
        high: 'Troponina elevada (> 0.04) - Suspeitar lesão miocárdica'
      }
    },
    relatedTests: ['10834-1', '8867-4', '6093-7'],
    pediatricConsiderations: 'Valores de referência pediátricos limitados',
    contraindications: ['Nenhuma específica']
  },

  // CREATININA - FUNÇÃO RENAL
  '2160-0': {
    loincNum: '2160-0',
    testName: 'Creatinina - Soro',
    emergencyLevel: 'high',
    criticalTime: 30,
    immediateActions: [
      'Calcular clearance de creatinina',
      'Avaliar necessidade de diálise',
      'Ajustar doses de medicamentos',
      'Monitorizar balanço hídrico'
    ],
    interpretation: {
      normal: '0.7-1.3 mg/dL (homens), 0.6-1.1 mg/dL (mulheres)',
      abnormal: {
        low: 'Geralmente não tem significado clínico',
        high: 'Insuficiência renal (valores > 1.5 mg/dL)'
      }
    },
    relatedTests: ['1986-5', '30934-4', '14646-9'],
    pediatricConsiderations: 'Normal varia com idade e peso',
    contraindications: ['Nenhuma específica']
  },

  // SÓDIO - EQUILÍBRIO HIDROELETROLÍTICO
  '2951-2': {
    loincNum: '2951-2',
    testName: 'Sódio - Soro',
    emergencyLevel: 'high',
    criticalTime: 30,
    immediateActions: [
      'Se < 125 ou > 155 mEq/L: Avaliar risco de edema cerebral',
      'Corregir lentamente (máximo 10-12 mEq/L em 24h)',
      'Identificar causa (diurético, SIADH, desidratação)',
      'Monitorizar neurológicamente'
    ],
    interpretation: {
      normal: '135-145 mEq/L',
      abnormal: {
        low: 'Hiponatremia (< 135) - Risco de edema cerebral',
        high: 'Hipernatremia (> 145) - Desidratação, diabetes insipidus'
      }
    },
    relatedTests: ['30934-4', '1963-7', '17861-2'],
    pediatricConsiderations: 'Normal similar ao adulto, mas corrigir mais lentamente',
    contraindications: ['Nenhuma específica']
  },

  // HEMOCULTURA - SEPSE
  '600-2': {
    loincNum: '600-2',
    testName: 'Hemocultura',
    emergencyLevel: 'critical',
    criticalTime: 1440, // 24 horas para resultado preliminar
    immediateActions: [
      'Colher ANTES do antibiótico',
      'Colher 2 frascos (aeróbico e anaeróbico)',
      'Iniciar antibiótico empírico conforme protocolo',
      'Repetir hemoculturas se febre persistente'
    ],
    interpretation: {
      normal: 'Negativo',
      abnormal: {
        low: 'Crescimento bacteriano indica bacteremia/sepses',
        high: 'Contaminação da pele (S. epidermidis, Bacillus)'
      }
    },
    relatedTests: ['58410-2', '718-7', '10834-1'],
    pediatricConsiderations: 'Volume de sangue proporcional ao peso da criança',
    contraindications: ['Nenhuma específica']
  },

  // PROCALCITONINA - INFECÇÃO BACTERIANA
  '7525-2': {
    loincNum: '7525-2',
    testName: 'Procalcitonina - Soro',
    emergencyLevel: 'high',
    criticalTime: 60,
    immediateActions: [
      'Distingue infecção bacteriana de viral',
      'Guia início/parada de antibióticos',
      'Interpretação: < 0.5 = baixa probabilidade bacteriana',
      'Valores altos (> 2.0) indicam sepse bacteriana'
    ],
    interpretation: {
      normal: '< 0.5 ng/mL',
      abnormal: {
        low: 'Baixa probabilidade de infecção bacteriana',
        high: 'Infecção bacteriana provável (> 0.5 ng/mL)'
      }
    },
    relatedTests: ['58410-2', '718-7', '10834-1'],
    pediatricConsiderations: 'Valores pediátricos similares, interpretar com clínica',
    contraindications: ['Nenhuma específica']
  }
};

// EXAMES DE ATENÇÃO PRIMÁRIA
export const PRIMARY_CARE_LOINC_CODES: LOINCCode[] = [
  
  // PRÉ-NATAL
  {
    loincNum: '5778-6',
    component: 'Gravidez',
    property: 'Estado',
    timeAspect: 'Pontual',
    system: 'Paciente',
    scaleType: 'Nominal',
    methodType: 'Observação',
    classType: 'Laboratório',
    orderObs: 'Both',
    emergencyRelevance: 'medium',
    adultRange: {
      minValue: 1,
      maxValue: 1,
      unit: 'Positivo'
    },
    turnaroundTime: 'routine',
    sampleType: ['Soro', 'Urina']
  },

  // PEDIATRIA
  {
    loincNum: '4548-4',
    component: 'Hemoglobina',
    property: 'Concentração',
    timeAspect: 'Pontual',
    system: 'Sangue',
    scaleType: 'Quantitativo',
    methodType: 'Método indireto',
    classType: 'Laboratório',
    orderObs: 'Both',
    emergencyRelevance: 'medium',
    pediatricRange: {
      ageGroup: '6 meses - 2 anos',
      minValue: 10.5,
      maxValue: 13.5,
      unit: 'g/dL'
    },
    adultRange: {
      minValue: 12.0,
      maxValue: 16.0,
      unit: 'g/dL'
    },
    criticalValues: {
      lowCritical: 7.0,
      highCritical: 20.0,
      unit: 'g/dL',
      immediateAction: 'Avaliar anemia severa ou policitemia'
    },
    turnaroundTime: 'routine',
    sampleType: ['Sangue total']
  },

  // DIABETES
  {
    loincNum: '4548-4',
    component: 'Hemoglobina A1c',
    property: 'Fração',
    timeAspect: 'Pontual',
    system: 'Sangue',
    scaleType: 'Quantitativo',
    methodType: 'Cromatografia',
    classType: 'Laboratório',
    orderObs: 'Both',
    emergencyRelevance: 'high',
    adultRange: {
      minValue: 4.0,
      maxValue: 7.0,
      unit: '%'
    },
    criticalValues: {
      lowCritical: 3.0,
      highCritical: 15.0,
      unit: '%',
      immediateAction: 'Avaliar controle glicêmico'
    },
    turnaroundTime: 'routine',
    sampleType: ['Sangue total']
  },

  // PERFIL LIPÍDICO
  {
    loincNum: '13457-7',
    component: 'Colesterol total',
    property: 'Concentração',
    timeAspect: 'Pontual',
    system: 'Soro',
    scaleType: 'Quantitativo',
    methodType: 'Enzimático',
    classType: 'Laboratório',
    orderObs: 'Both',
    emergencyRelevance: 'medium',
    adultRange: {
      minValue: 0,
      maxValue: 200,
      unit: 'mg/dL'
    },
    turnaroundTime: 'routine',
    sampleType: ['Soro']
  }
];

// INTERPRETAÇÃO AUTOMÁTICA DE EXAMES
export class LOINCInterpreter {
  
  /**
   * Interpreta resultado de exame crítico
   */
  static interpretCriticalResult(
    loincNum: string,
    value: number,
    unit: string,
    patientAge?: number,
    patientGender?: 'male' | 'female'
  ): {
    status: 'normal' | 'abnormal_low' | 'abnormal_high' | 'critical_low' | 'critical_high';
    interpretation: string;
    immediateActions: string[];
    urgency: 'low' | 'medium' | 'high' | 'critical';
  } {
    const test = EMERGENCY_LOINC_TESTS[loincNum];
    
    if (!test) {
      return {
        status: 'normal',
        interpretation: 'Teste não encontrado no banco de emergência',
        immediateActions: [],
        urgency: 'low'
      };
    }

    // Interpretação específica por tipo de exame
    switch (loincNum) {
      case '59408-5': // pH
        if (value < 7.0 || value > 7.6) {
          return {
            status: 'critical_high',
            interpretation: 'pH crítico - Risco de coma acidose/alkalose',
            immediateActions: ['Avaliar vias aéreas', 'Verificar função respiratória', 'Correção urgente'],
            urgency: 'critical'
          };
        } else if (value < 7.35) {
          return {
            status: 'abnormal_low',
            interpretation: 'Acidose - Avaliar causa metabólica/respiratória',
            immediateActions: ['Gasometria completa', 'Avaliar HCO3- e pCO2'],
            urgency: 'high'
          };
        } else if (value > 7.45) {
          return {
            status: 'abnormal_high',
            interpretation: 'Alcalose - Avaliar causa metabólica/respiratória',
            immediateActions: ['Gasometria completa', 'Avaliar HCO3- e pCO2'],
            urgency: 'high'
          };
        }
        break;

      case '2345-7': // Glicose
        if (value < 40) {
          return {
            status: 'critical_low',
            interpretation: 'Hipoglicemia severa - Risco de coma',
            immediateActions: ['Glicose 50% IV', 'Monitorizar continuamente'],
            urgency: 'critical'
          };
        } else if (value > 600) {
          return {
            status: 'critical_high',
            interpretation: 'Hiperglicemia severa - Suspeitar cetoacidose',
            immediateActions: ['Insulina IV', 'Avaliar cetonas', 'Reposição hídrica'],
            urgency: 'critical'
          };
        } else if (value < 70) {
          return {
            status: 'abnormal_low',
            interpretation: 'Hipoglicemia - Administrar glicose',
            immediateActions: ['Glicose via oral/IV', 'Repetir glicemia'],
            urgency: 'high'
          };
        }
        break;

      case '6598-7': // Troponina
        if (value > 0.04) {
          return {
            status: 'critical_high',
            interpretation: 'Troponina elevada - Suspeitar IAM',
            immediateActions: ['Protocolo IAM', 'ECG seriado', 'Preparar cateterismo'],
            urgency: 'critical'
          };
        }
        break;
    }

    return {
      status: 'normal',
      interpretation: 'Resultado dentro da normalidade',
      immediateActions: [],
      urgency: 'low'
    };
  }

  /**
   * Calcula valores pediátricos normalizados
   */
  static calculatePediatricNormal(
    loincNum: string,
    ageInMonths: number,
    gender?: 'male' | 'female'
  ): {
    min: number;
    max: number;
    unit: string;
    note?: string;
  } {
    // Implementação simplificada - em produção seria mais robusta
    const test = PRIMARY_CARE_LOINC_CODES.find(t => t.loincNum === loincNum);
    
    if (!test?.pediatricRange) {
      const adultRange = test?.adultRange || { minValue: 0, maxValue: 100, unit: '' };
      return {
        min: adultRange.minValue,
        max: adultRange.maxValue,
        unit: adultRange.unit
      };
    }

    return {
      min: test.pediatricRange.minValue,
      max: test.pediatricRange.maxValue,
      unit: test.pediatricRange.unit
    };
  }

  /**
   * Identifica exames urgentes baseados em sintomas
   */
  static getUrgentTestsForSymptoms(symptoms: string[]): string[] {
    const urgentTests: string[] = [];

    symptoms.forEach(symptom => {
      const lowerSymptom = symptom.toLowerCase();
      
      // Dor torácica
      if (lowerSymptom.includes('dor torácica') || lowerSymptom.includes('dor peito')) {
        urgentTests.push('6598-7', '8867-4', '6093-7'); // Troponina, ECG, CK-MB
      }
      
      // Dispneia
      if (lowerSymptom.includes('dispneia') || lowerSymptom.includes('falta ar')) {
        urgentTests.push('59408-5', '59407-7', '59409-3'); // Gasometria completa
      }
      
      // Febre
      if (lowerSymptom.includes('febre') || lowerSymptom.includes('temperatura')) {
        urgentTests.push('58410-2', '7525-2', '10834-1'); // Hemograma, procalcitonina, PCR
      }
      
      // Dor abdominal
      if (lowerSymptom.includes('dor abdominal') || lowerSymptom.includes('barriga')) {
        urgentTests.push('2160-0', '30934-4', '14646-9'); // Creatinina, eletrolitos, amilase
      }
    });

    return [...new Set(urgentTests)]; // Remove duplicatas
  }
}

// GESTÃO DE CÓDIGOS LOINC
export class LOINCManager {
  private codes: Map<string, LOINCCode> = new Map();
  private emergencyTests: Map<string, EmergencyLabTest> = new Map();

  constructor() {
    this.initializeCodes();
  }

  private initializeCodes() {
    // Inicializar testes de emergência
    Object.entries(EMERGENCY_LOINC_TESTS).forEach(([loincNum, test]) => {
      this.emergencyTests.set(loincNum, test);
    });

    // Inicializar códigos de atenção primária
    PRIMARY_CARE_LOINC_CODES.forEach(code => {
      this.codes.set(code.loincNum, code);
    });
  }

  /**
   * Busca código por componente
   */
  searchByComponent(component: string, limit = 10): LOINCCode[] {
    const normalizedComponent = component.toLowerCase();
    const results: Array<{ code: LOINCCode; score: number }> = [];

    this.codes.forEach(code => {
      const comp = code.component.toLowerCase();
      const score = this.calculateSimilarity(normalizedComponent, comp);
      if (score > 0.3) {
        results.push({ code, score });
      }
    });

    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.code);
  }

  /**
   * Obtém teste de emergência
   */
  getEmergencyTest(loincNum: string): EmergencyLabTest | undefined {
    return this.emergencyTests.get(loincNum);
  }

  /**
   * Lista testes por nível de emergência
   */
  getEmergencyTestsByLevel(level: EmergencyLabTest['emergencyLevel']): EmergencyLabTest[] {
    return Array.from(this.emergencyTests.values()).filter(test => test.emergencyLevel === level);
  }

  /**
   * Obtém valores de referência para um teste
   */
  getReferenceValues(
    loincNum: string,
    patientAge?: number,
    patientGender?: 'male' | 'female'
  ): {
    pediatric?: LOINCCode['pediatricRange'];
    adult: LOINCCode['adultRange'];
    critical?: LOINCCode['criticalValues'];
  } {
    const code = this.codes.get(loincNum);
    
    if (!code) {
      return {
        adult: { minValue: 0, maxValue: 100, unit: '' }
      };
    }

    return {
      pediatric: code.pediatricRange,
      adult: code.adultRange,
      critical: code.criticalValues
    };
  }

  /**
   * Calcula similaridade entre strings
   */
  private calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = this.levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  }

  /**
   * Distância de Levenshtein
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  /**
   * Lista testes por tempo de resultado
   */
  getTestsByTurnaroundTime(turnaround: LOINCCode['turnaroundTime']): LOINCCode[] {
    return Array.from(this.codes.values()).filter(code => code.turnaroundTime === turnaround);
  }

  /**
   * Busca por tipo de amostra
   */
  getTestsBySampleType(sampleType: string): LOINCCode[] {
    return Array.from(this.codes.values()).filter(code => 
      code.sampleType.includes(sampleType)
    );
  }
}

// Instância global
export const loincManager = new LOINCManager();

// Export para compatibilidade
export default loincManager;
