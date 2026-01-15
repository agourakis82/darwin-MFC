/**
 * RXNORM - NORMALIZAÇÃO DE MEDICAMENTOS
 * Sistema de padronização de medicamentos para zonas de emergência
 * Otimizado para medicina de família e situações críticas
 */

export interface RXNormMedication {
  rxcui: string; // RXNorm Concept Unique Identifier
  name: string;
  genericName: string;
  brandNames: string[];
  dosageForm: string;
  strength: string;
  route: string;
  therapeuticClass: string;
  atcCode: string;
  emergencyRelevance: 'low' | 'medium' | 'high' | 'critical';
  pediatrics?: {
    minAge: number; // meses
    maxAge: number; // meses
    dosingWeight: number; // kg mínimo
    concentration?: string;
    specialInstructions?: string;
  };
  emergencyDosing?: {
    adultDose: string;
    pediatricDose: string;
    maxDose: string;
    administration: string;
    precautions: string[];
  };
  availability: 'universal' | 'restricted' | 'unavailable';
  storage: string;
  contraindications: string[];
  interactions: string[];
}

export interface EmergencyMedicationProtocol {
  rxcui: string;
  medicationName: string;
  indication: string;
  emergencyLevel: 'low' | 'medium' | 'high' | 'critical';
  dosageCalculation: {
    type: 'fixed' | 'weight_based' | 'age_based';
    formula: string;
    parameters: string[];
  };
  administration: {
    route: string;
    speed: string;
    monitoring: string[];
  };
  contraindications: string[];
  sideEffects: string[];
  availability: {
    sus: boolean; // Sistema Único de Saúde (Brasil)
    who: boolean; // Lista OMS
    restricted: boolean;
  };
  storageConditions: string;
}

// MEDICAMENTOS CRÍTICOS PARA EMERGÊNCIA
export const EMERGENCY_MEDICATIONS: Record<string, EmergencyMedicationProtocol> = {
  
  // REANIMAÇÃO CARDIOVASCULAR
  '314422': {
    rxcui: '314422',
    medicationName: 'Adrenalina (Epinefrina)',
    indication: 'Parada cardiorrespiratória, choque anafilático',
    emergencyLevel: 'critical',
    dosageCalculation: {
      type: 'weight_based',
      formula: '0.01mg/kg (0.1ml/kg da solução 1:10.000)',
      parameters: ['peso_kg']
    },
    administration: {
      route: 'IV/IO/ET',
      speed: 'Bolus imediato',
      monitoring: ['FC', 'PA', 'ritmo_cardíaco']
    },
    contraindications: ['Parada cardíaca por hipoxemia severa'],
    sideEffects: ['Taquicardia', 'Hipertensão', 'Arritmias'],
    availability: {
      sus: true,
      who: true,
      restricted: false
    },
    storageConditions: 'Temperatura ambiente, proteger da luz'
  },

  '3115': {
    rxcui: '3115',
    medicationName: 'Amiodarona',
    indication: 'Fibrilação ventricular, taquicardia ventricular',
    emergencyLevel: 'critical',
    dosageCalculation: {
      type: 'weight_based',
      formula: '5mg/kg IV (máximo 300mg)',
      parameters: ['peso_kg']
    },
    administration: {
      route: 'IV',
      speed: 'Bolus rápido',
      monitoring: ['ECG', 'PA', 'QRS']
    },
    contraindications: ['Bloqueio AV 2º/3º grau', 'Bradicardia severa'],
    sideEffects: ['Hipotensão', 'Bradicardia', 'Tosse'],
    availability: {
      sus: true,
      who: true,
      restricted: false
    },
    storageConditions: 'Temperatura ambiente'
  },

  // EMERGÊNCIA RESPIRATÓRIA
  '104963': {
    rxcui: '104963',
    medicationName: 'Salbutamol (Albuterol)',
    indication: 'Crise asmática, DPOC exacerbação',
    emergencyLevel: 'high',
    dosageCalculation: {
      type: 'fixed',
      formula: '2.5mg nebulizado ou 2-4 puffs inalatório',
      parameters: []
    },
    administration: {
      route: 'Inalatório/nebulização',
      speed: 'Repetir a cada 20min se necessário',
      monitoring: ['SpO2', 'FC', 'FR']
    },
    contraindications: ['Hipersensibilidade ao salbutamol'],
    sideEffects: ['Tremor', 'Taquicardia', 'Nervosismo'],
    availability: {
      sus: true,
      who: true,
      restricted: false
    },
    storageConditions: 'Temperatura ambiente, não perfurar'
  },

  // EMERGÊNCIA PEDIÁTRICA
  '5640': {
    rxcui: '5640',
    medicationName: 'Paracetamol (Acetaminofeno)',
    indication: 'Febre, dor moderada a intensa',
    emergencyLevel: 'medium',
    dosageCalculation: {
      type: 'weight_based',
      formula: '15mg/kg/dose a cada 6-8h (máximo 75mg/kg/dia)',
      parameters: ['peso_kg']
    },
    administration: {
      route: 'VO/PR/IV',
      speed: 'Administração conforme via escolhida',
      monitoring: ['Temperatura', 'Dor', 'Função hepática']
    },
    contraindications: ['Insuficiência hepática grave'],
    sideEffects: ['Hepatotoxicidade (overdose)', 'Náusea'],
    availability: {
      sus: true,
      who: true,
      restricted: false
    },
    storageConditions: 'Temperatura ambiente, protegido da umidade'
  },

  // EMERGÊNCIA OBSTÉTRICA
  '6898': {
    rxcui: '6898',
    medicationName: 'Sulfato de Magnésio',
    indication: 'Eclampsia, trabalho de parto prematuro',
    emergencyLevel: 'critical',
    dosageCalculation: {
      type: 'weight_based',
      formula: '4-6g IV em 20min, depois 1-2g/h',
      parameters: ['peso_kg', 'gravidez']
    },
    administration: {
      route: 'IV',
      speed: 'Infusão controlada',
      monitoring: ['PA', 'FR', 'reflexos', 'diurese']
    },
    contraindications: ['Miastenia gravis', 'Bloqueio cardíaco'],
    sideEffects: ['Depressão do SNC', 'Fraqueza muscular', 'Hipotensão'],
    availability: {
      sus: true,
      who: true,
      restricted: false
    },
    storageConditions: 'Temperatura ambiente, proteger da luz'
  },

  // EMERGÊNCIA GASTROINTESTINAL
  '8601': {
    rxcui: '8601',
    medicationName: 'Omeprazol',
    indication: 'Hemorragia digestiva alta, úlcera péptica',
    emergencyLevel: 'high',
    dosageCalculation: {
      type: 'fixed',
      formula: '40mg IV a cada 12h',
      parameters: []
    },
    administration: {
      route: 'IV/VO',
      speed: 'IV em 3-5min',
      monitoring: ['Hemorragia', 'Dor abdominal', 'Hemoglobina']
    },
    contraindications: ['Hipersensibilidade'],
    sideEffects: ['Cefaleia', 'Náusea', 'Diarreia'],
    availability: {
      sus: true,
      who: true,
      restricted: false
    },
    storageConditions: 'Temperatura ambiente'
  },

  // EMERGÊNCIA ENDÓCRINA
  '1191': {
    rxcui: '1191',
    medicationName: 'Insulina Regular',
    indication: 'Cetoacidose diabética, hiperglicemia severa',
    emergencyLevel: 'critical',
    dosageCalculation: {
      type: 'weight_based',
      formula: '0.1U/kg/h em infusão contínua',
      parameters: ['peso_kg', 'glicemia']
    },
    administration: {
      route: 'SC/IV',
      speed: 'Infusão contínua ou SC a cada 6h',
      monitoring: ['Glicemia capilar', 'Cetonas', 'Eletrolitos']
    },
    contraindications: ['Hipoglicemia'],
    sideEffects: ['Hipoglicemia', 'Hipocalemia', 'Reação alérgica'],
    availability: {
      sus: true,
      who: true,
      restricted: false
    },
    storageConditions: 'Geladeira (2-8°C), não congelar'
  }
};

// MEDICAMENTOS DE ATENÇÃO PRIMÁRIA
export const PRIMARY_CARE_MEDICATIONS: RXNormMedication[] = [
  
  // PRÉ-NATAL
  {
    rxcui: '198440',
    name: 'Ácido Fólico 5mg',
    genericName: 'Ácido Fólico',
    brandNames: ['Folacin', 'Acfol'],
    dosageForm: 'Comprimido',
    strength: '5mg',
    route: 'VO',
    therapeuticClass: 'Vitaminas',
    atcCode: 'B03BB01',
    emergencyRelevance: 'low',
    availability: 'universal',
    storage: 'Temperatura ambiente',
    contraindications: ['Deficiência de B12 não diagnosticada'],
    interactions: ['Metformina', 'Sulfasalazina']
  },

  // PEDIATRIA
  {
    rxcui: '198440',
    name: 'Sulfato Ferroso',
    genericName: 'Ferro elementar',
    brandNames: ['Ferronil', 'Ferrotrent'],
    dosageForm: 'Xarope',
    strength: '25mg/5ml',
    route: 'VO',
    therapeuticClass: 'Antianêmicos',
    atcCode: 'B03AA04',
    emergencyRelevance: 'low',
    availability: 'universal',
    storage: 'Temperatura ambiente',
    contraindications: ['Hemocromatose', 'Talassemia'],
    interactions: ['Tetraciclinas', 'Levotiroxina']
  },

  // HIPERTENSÃO
  {
    rxcui: '304295',
    name: 'Enalapril 10mg',
    genericName: 'Enalapril',
    brandNames: ['Vasotec', 'Renitec'],
    dosageForm: 'Comprimido',
    strength: '10mg',
    route: 'VO',
    therapeuticClass: 'IECA',
    atcCode: 'C09AA02',
    emergencyRelevance: 'medium',
    availability: 'universal',
    storage: 'Temperatura ambiente',
    contraindications: ['Gravidez', 'Hipercalemia', 'Insuficiência renal'],
    interactions: ['Diuréticos poupadores de potássio', 'AINE']
  },

  // DIABETES
  {
    rxcui: '860975',
    name: 'Metformina 850mg',
    genericName: 'Metformina',
    brandNames: ['Glifage', 'Dimefor'],
    dosageForm: 'Comprimido',
    strength: '850mg',
    route: 'VO',
    therapeuticClass: 'Antidiabéticos',
    atcCode: 'A10BA02',
    emergencyRelevance: 'high',
    availability: 'universal',
    storage: 'Temperatura ambiente',
    contraindications: ['Insuficiência renal', 'Insuficiência hepática', 'Alcoolismo'],
    interactions: ['Álcool', 'Contraste iodado']
  },

  // ASMA
  {
    rxcui: '83367',
    name: 'Beclometasona 250mcg',
    genericName: 'Dipropionato de beclometasona',
    brandNames: ['Clenil', 'Qvar'],
    dosageForm: 'Inalador',
    strength: '250mcg/dose',
    route: 'Inalatório',
    therapeuticClass: 'Corticosteroide',
    atcCode: 'R03BA01',
    emergencyRelevance: 'high',
    availability: 'universal',
    storage: 'Temperatura ambiente',
    contraindications: ['Hipersensibilidade'],
    interactions: ['Inibidores da CYP3A4'],
    emergencyDosing: {
      adultDose: '1-2 puffs 2x/dia',
      pediatricDose: '1 puff 2x/dia (> 5 anos)',
      maxDose: '8 puffs/dia',
      administration: 'Inalar profundamente, segurar por 10 segundos',
      precautions: ['Enxaguar boca após uso', 'Verificar técnica inalatória']
    }
  }
];

// CALCULADORA DE DOSES PEDIÁTRICAS
export class PediatricDoseCalculator {
  /**
   * Calcula dose pediátrica baseada no peso
   */
  static calculateByWeight(
    adultDose: number,
    childWeight: number,
    adultWeight: number = 70
  ): number {
    return (adultDose * childWeight) / adultWeight;
  }

  /**
   * Calcula dose pediátrica baseada na superfície corporal
   */
  static calculateByBSA(
    adultDose: number,
    childWeight: number,
    childHeight: number
  ): number {
    const childBSA = this.calculateBSA(childWeight, childHeight);
    const adultBSA = 1.73; // Adulto médio 70kg, 170cm
    return (adultDose * childBSA) / adultBSA;
  }

  /**
   * Calcula superfície corporal (fórmula de Mosteller)
   */
  static calculateBSA(weight: number, height: number): number {
    return Math.sqrt((weight * height) / 3600);
  }

  /**
   * Verifica se a dose está dentro dos limites seguros
   */
  static validateDose(
    calculatedDose: number,
    maxDose: number,
    minDose: number = 0
  ): { valid: boolean; dose: number; message?: string } {
    if (calculatedDose > maxDose) {
      return {
        valid: false,
        dose: maxDose,
        message: `Dose excede o máximo permitido (${maxDose}mg)`
      };
    }
    
    if (calculatedDose < minDose) {
      return {
        valid: false,
        dose: minDose,
        message: `Dose abaixo do mínimo permitido (${minDose}mg)`
      };
    }

    return {
      valid: true,
      dose: calculatedDose
    };
  }
}

// GESTÃO DE MEDICAMENTOS RXNORM
export class RXNormManager {
  private medications: Map<string, RXNormMedication> = new Map();
  private emergencyProtocols: Map<string, EmergencyMedicationProtocol> = new Map();

  constructor() {
    this.initializeMedications();
  }

  private initializeMedications() {
    // Inicializar medicamentos de emergência
    Object.entries(EMERGENCY_MEDICATIONS).forEach(([rxcui, protocol]) => {
      this.emergencyProtocols.set(rxcui, protocol);
    });

    // Inicializar medicamentos de atenção primária
    PRIMARY_CARE_MEDICATIONS.forEach(med => {
      this.medications.set(med.rxcui, med);
    });
  }

  /**
   * Busca medicamento por nome
   */
  searchByName(query: string, limit = 10): RXNormMedication[] {
    const normalizedQuery = query.toLowerCase();
    const results: Array<{ medication: RXNormMedication; score: number }> = [];

    this.medications.forEach(medication => {
      const name = medication.name.toLowerCase();
      const genericName = medication.genericName.toLowerCase();
      const brandNames = medication.brandNames.map(b => b.toLowerCase());
      
      let maxScore = 0;
      
      // Nome exato
      if (name.includes(normalizedQuery)) {
        maxScore = Math.max(maxScore, 1.0);
      }
      
      // Nome genérico
      if (genericName.includes(normalizedQuery)) {
        maxScore = Math.max(maxScore, 0.8);
      }
      
      // Nomes comerciais
      brandNames.forEach(brand => {
        if (brand.includes(normalizedQuery)) {
          maxScore = Math.max(maxScore, 0.6);
        }
      });
      
      if (maxScore > 0) {
        results.push({ medication, score: maxScore });
      }
    });

    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.medication);
  }

  /**
   * Obtém protocolo de emergência
   */
  getEmergencyProtocol(rxcui: string): EmergencyMedicationProtocol | undefined {
    return this.emergencyProtocols.get(rxcui);
  }

  /**
   * Lista medicamentos por relevância para emergência
   */
  getMedicationsByEmergencyRelevance(relevance: RXNormMedication['emergencyRelevance']): RXNormMedication[] {
    return Array.from(this.medications.values()).filter(med => med.emergencyRelevance === relevance);
  }

  /**
   * Calcula dose pediátrica
   */
  calculatePediatricDose(
    rxcui: string,
    childWeight: number,
    calculationType: 'weight' | 'bsa' = 'weight'
  ): { dose: number; valid: boolean; message?: string } {
    const medication = this.medications.get(rxcui);
    const emergencyProtocol = this.emergencyProtocols.get(rxcui);
    
    if (!medication && !emergencyProtocol) {
      return {
        dose: 0,
        valid: false,
        message: 'Medicamento não encontrado'
      };
    }

    const protocol = emergencyProtocol || medication?.emergencyDosing;
    if (!protocol) {
      return {
        dose: 0,
        valid: false,
        message: 'Protocolo de dose não disponível'
      };
    }

    // Implementação simplificada - em produção seria mais robusta
    const dose = PediatricDoseCalculator.calculateByWeight(100, childWeight); // Exemplo

    return {
      dose,
      valid: true
    };
  }

  /**
   * Verifica disponibilidade por região
   */
  getAvailability(rxcui: string, region: 'sus' | 'who' | 'restricted'): boolean {
    const protocol = this.emergencyProtocols.get(rxcui);
    if (!protocol) return false;
    
    return protocol.availability[region];
  }

  /**
   * Busca por classe terapêutica
   */
  getMedicationsByTherapeuticClass(therapeuticClass: string): RXNormMedication[] {
    return Array.from(this.medications.values()).filter(
      med => med.therapeuticClass.toLowerCase().includes(therapeuticClass.toLowerCase())
    );
  }

  /**
   * Obtém interações medicamentosas críticas
   */
  getCriticalInteractions(rxcui: string): string[] {
    const medication = this.medications.get(rxcui);
    return medication?.interactions || [];
  }

  /**
   * Lista medicamentos críticos para uma indicação
   */
  getEmergencyMedicationsByIndication(indication: string): EmergencyMedicationProtocol[] {
    const normalizedIndication = indication.toLowerCase();
    
    return Array.from(this.emergencyProtocols.values()).filter(
      protocol => protocol.indication.toLowerCase().includes(normalizedIndication)
    );
  }
}

// Instância global
export const rxnormManager = new RXNormManager();

// Export para compatibilidade
export default rxnormManager;