/**
 * ICD-10 - CLASSIFICAÇÃO INTERNACIONAL DE DOENÇAS
 * Sistema de codificação para diagnóstico médico
 * Otimizado para zonas de emergência e medicina de família
 */

export interface ICD10Code {
  code: string;
  description: string;
  chapter: string;
  block: string;
  category: string;
  severity?: 'mild' | 'moderate' | 'severe' | 'critical';
  emergencyProtocol?: string;
  primaryCare?: boolean;
  icd11Code?: string;
}

export interface EmergencyICD10Category {
  code: string;
  description: string;
  emergencyLevel: 'low' | 'medium' | 'high' | 'critical';
  triageCategory: 'green' | 'yellow' | 'red' | 'black';
  immediateAction: string;
  requiredTests: string[];
  medications?: string[];
  disposition: 'home' | 'observation' | 'hospital' | 'icu' | 'surgery';
}

// CÓDIGOS CRÍTICOS PARA EMERGÊNCIA
export const EMERGENCY_ICD10_CODES: Record<string, EmergencyICD10Category> = {
  // PARADA CARDÍACA
  'I46.9': {
    code: 'I46.9',
    description: 'Parada cardíaca não especificada',
    emergencyLevel: 'critical',
    triageCategory: 'red',
    immediateAction: 'Iniciar RCP imediatamente, chamar equipe de emergência',
    requiredTests: ['ECG', 'Gasometria arterial', 'Lactato'],
    medications: ['Adrenalina', 'Amiodarona'],
    disposition: 'icu'
  },
  
  // INFARTO AGUDO DO MIOCÁRDIO
  'I21.9': {
    code: 'I21.9',
    description: 'Infarto agudo do miocárdio não especificado',
    emergencyLevel: 'critical',
    triageCategory: 'red',
    immediateAction: 'ECG em 10min, Protocolo IAM, Acesso venoso',
    requiredTests: ['ECG', 'Troponina', 'CK-MB'],
    medications: [' AAS ', 'Heparina', 'Clopidogrel'],
    disposition: 'icu'
  },

  // ACIDENTE VASCULAR CEREBRAL
  'I63.9': {
    code: 'I63.9',
    description: 'Acidente vascular cerebral não especificado',
    emergencyLevel: 'critical',
    triageCategory: 'red',
    immediateAction: 'Avaliar tempo, TC de crânio urgente',
    requiredTests: ['TC de crânio', 'Glicemia', 'Pressão arterial'],
    medications: ['Aspirina se dentro da janela terapêutica'],
    disposition: 'icu'
  },

  // TRAUMATISMO CRANIOENCEFÁLICO
  'S06.9': {
    code: 'S06.9',
    description: 'Traumatismo intracraniano não especificado',
    emergencyLevel: 'high',
    triageCategory: 'red',
    immediateAction: 'Imobilização cervical, TC urgente',
    requiredTests: ['TC de crânio', 'Glasgow', 'Pupilas'],
    medications: ['Manitol se indicado'],
    disposition: 'icu'
  },

  // HEMORRAGIA DIGESTIVA ALTA
  'K92.2': {
    code: 'K92.2',
    description: 'Hemorragia gastrointestinal não especificada',
    emergencyLevel: 'high',
    triageCategory: 'red',
    immediateAction: 'Acesso venoso, avaliar estabilidade hemodinâmica',
    requiredTests: ['Hemograma', 'Coagulograma', 'Tipo e fator'],
    medications: ['Omeprazol IV', 'Tranexamico se indicado'],
    disposition: 'hospital'
  },

  // SEPSE
  'A41.9': {
    code: 'A41.9',
    description: 'Sepse não especificada',
    emergencyLevel: 'critical',
    triageCategory: 'red',
    immediateAction: 'Protocolo de sepse, culturas, antibiótico empírico',
    requiredTests: ['Hemograma', 'PCR', 'Procalcitonina', 'Hemocultura'],
    medications: ['Antibiótico amplo espectro'],
    disposition: 'icu'
  },

  // EMERGÊNCIA PEDIÁTRICA - DESIDRATAÇÃO
  'E86.9': {
    code: 'E86.9',
    description: 'Desidratação não especificada',
    emergencyLevel: 'high',
    triageCategory: 'yellow',
    immediateAction: 'Avaliar grau, iniciar reposição hídrica',
    requiredTests: ['Eletrolitos', 'Glicemia'],
    medications: ['Soro de reidratação oral', 'Soro fisiológico'],
    disposition: 'observation'
  },

  // EMERGÊNCIA OBSTÉTRICA - ECLAMPSIA
  'O14.9': {
    code: 'O14.9',
    description: 'Eclampsia não especificada',
    emergencyLevel: 'critical',
    triageCategory: 'red',
    immediateAction: 'Magnésio sulfático, controle PA, preparação para parto',
    requiredTests: ['Proteinúria', 'PA seriada', 'Reflexos'],
    medications: ['Sulfato de magnésio', 'Anti-hipertensivos'],
    disposition: 'icu'
  },

  // PNEUMONIA GRAVE
  'J18.9': {
    code: 'J18.9',
    description: 'Pneumonia não especificada',
    emergencyLevel: 'high',
    triageCategory: 'red',
    immediateAction: 'Avaliar saturação, raio X de tórax',
    requiredTests: ['Raio X tórax', 'Hemograma', 'Gasometria'],
    medications: ['Antibiótico conforme protocolo'],
    disposition: 'hospital'
  }
};

// CÓDIGOS DE ATENÇÃO PRIMÁRIA
export const PRIMARY_CARE_ICD10_CODES: ICD10Code[] = [
  {
    code: 'Z00.00',
    description: 'Exame geral de saúde da criança',
    chapter: 'Z',
    block: 'Z00-Z13',
    category: 'Exames preventivos',
    primaryCare: true
  },
  {
    code: 'Z34.00',
    description: 'Supervisão de primeira gravidez normal',
    chapter: 'Z',
    block: 'Z30-Z39',
    category: 'Gravidez',
    primaryCare: true
  },
  {
    code: 'I10',
    description: 'Hipertensão arterial essencial',
    chapter: 'I',
    block: 'I10-I15',
    category: 'Doenças do aparelho circulatório',
    primaryCare: true,
    emergencyProtocol: 'monitoramento_rápido'
  },
  {
    code: 'E11.9',
    description: 'Diabetes mellitus tipo 2 não complicados',
    chapter: 'E',
    block: 'E10-E14',
    category: 'Doenças endócrinas',
    primaryCare: true,
    emergencyProtocol: 'controle_glicêmico'
  },
  {
    code: 'J45.9',
    description: 'Asma não especificada',
    chapter: 'J',
    block: 'J40-J47',
    category: 'Doenças do aparelho respiratório',
    primaryCare: true,
    emergencyProtocol: 'broncodilatador'
  }
];

// FUNÇÕES DE BUSCA E CONVERSÃO
export class ICD10Manager {
  private codes: Map<string, ICD10Code> = new Map();
  private emergencyCodes: Map<string, EmergencyICD10Category> = new Map();

  constructor() {
    this.initializeCodes();
  }

  private initializeCodes() {
    // Inicializar códigos de emergência
    Object.entries(EMERGENCY_ICD10_CODES).forEach(([code, data]) => {
      this.emergencyCodes.set(code, data);
    });

    // Inicializar códigos de atenção primária
    PRIMARY_CARE_ICD10_CODES.forEach(code => {
      this.codes.set(code.code, code);
    });
  }

  /**
   * Busca código por descrição (fuzzy search)
   */
  searchByDescription(query: string, limit = 10): ICD10Code[] {
    const normalizedQuery = query.toLowerCase();
    const results: Array<{ code: ICD10Code; score: number }> = [];

    this.codes.forEach(code => {
      const description = code.description.toLowerCase();
      const score = this.calculateSimilarity(normalizedQuery, description);
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
   * Obtém código de emergência por ID
   */
  getEmergencyCode(code: string): EmergencyICD10Category | undefined {
    return this.emergencyCodes.get(code);
  }

  /**
   * Lista códigos por capítulo
   */
  getCodesByChapter(chapter: string): ICD10Code[] {
    return Array.from(this.codes.values()).filter(code => code.chapter === chapter);
  }

  /**
   * Converte ICD-10 para ICD-11 (quando disponível)
   */
  convertToICD11(icd10Code: string): string | undefined {
    const code = this.codes.get(icd10Code);
    return code?.icd11Code;
  }

  /**
   * Calcula similaridade entre strings (algoritmo simples)
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
   * Busca códigos de emergência por nível
   */
  getEmergencyCodesByLevel(level: EmergencyICD10Category['emergencyLevel']): EmergencyICD10Category[] {
    return Array.from(this.emergencyCodes.values()).filter(code => code.emergencyLevel === level);
  }

  /**
   * Obtém códigos por categoria de triagem
   */
  getCodesByTriageCategory(category: EmergencyICD10Category['triageCategory']): EmergencyICD10Category[] {
    return Array.from(this.emergencyCodes.values()).filter(code => code.triageCategory === category);
  }
}

// Instância global
export const icd10Manager = new ICD10Manager();

// Export para compatibilidade
export default icd10Manager;