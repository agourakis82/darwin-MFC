/**
 * CIAP2 - CLASSIFICAÇÃO INTERNACIONAL DE ATENÇÃO PRIMÁRIA
 * Sistema específico para medicina de família e atenção primária
 * Otimizado para zonas de emergência e áreas remotas
 */

export interface CIAP2Code {
  code: string;
  description: string;
  chapter: string;
  section: string;
  hasProblem: boolean;
  emergencyRelevance: 'low' | 'medium' | 'high' | 'critical';
  primaryCareAction: string[];
  medications?: string[];
  redFlags: string[];
  referralCriteria?: string;
  emergencyProtocol?: string;
}

export interface EmergencyCIAP2Category {
  code: string;
  description: string;
  chapter: string;
  emergencyLevel: 'low' | 'medium' | 'high' | 'critical';
  triageColor: 'green' | 'yellow' | 'red' | 'black';
  immediateActions: string[];
  diagnosticSteps: string[];
  medicationsFirstLine: string[];
  dispositionAdvice: 'home' | 'follow_up' | 'hospital' | 'emergency' | 'icu';
  redFlags: string[];
}

// CAPÍTULOS CIAP2 EMERGENCIAIS
export const EMERGENCY_CIAP2_CODES: Record<string, EmergencyCIAP2Category> = {
  
  // PARADA CARDÍACA - SINTOMAS CARDIOVASCULARES
  'K01': {
    code: 'K01',
    description: 'Dor torácica',
    chapter: 'Sistema Cardiovascular',
    emergencyLevel: 'critical',
    triageColor: 'red',
    immediateActions: [
      'Aferir sinais vitais imediatamente',
      'ECG de 12 derivações em 10 minutos',
      'Acesso venoso periférico grosso',
      'Oxigênio se SpO2 < 94%',
      'Aspirina 300mg se suspeita de IAM'
    ],
    diagnosticSteps: [
      'Anamnese dirigida (início, caráter, irradiação)',
      'ECG imediato',
      'Troponina sérica',
      'Raio X de tórax se disponível',
      'Avaliar fatores de risco'
    ],
    medicationsFirstLine: [
      'Aspirina 300mg (mastigável)',
      'Morfina se dor intensa',
      'Nitroglicerina sublingual se PA sistólica > 90mmHg'
    ],
    dispositionAdvice: 'emergency',
    redFlags: [
      'Dor em aperto > 20min',
      'Irradiação para braço esquerdo/mandíbula',
      'Sudorese, náusea, vômito',
      'Dispneia, síncope',
      'História familiar de IAM'
    ]
  },

  // EMERGÊNCIA RESPIRATÓRIA
  'R02': {
    code: 'R02',
    description: 'Falta de ar/dificuldade respiratória',
    chapter: 'Sistema Respiratório',
    emergencyLevel: 'critical',
    triageColor: 'red',
    immediateActions: [
      'Posicionar paciente (sentado)',
      'Oxigênio até SpO2 > 94%',
      'Ausculta pulmonar detalhada',
      'Acesso venoso',
      'Monitorizar frequência respiratória'
    ],
    diagnosticSteps: [
      'Gasometria arterial se disponível',
      'Raio X de tórax',
      'ECG se dispneia súbita',
      'Hemograma completo',
      'D-dímero se suspeita de tromboembolismo'
    ],
    medicationsFirstLine: [
      'Oxigênio via cateter/nasal',
      'Broncodilatador se sibilos',
      'Diurético se congestão pulmonar'
    ],
    dispositionAdvice: 'emergency',
    redFlags: [
      'SpO2 < 90% em ar ambiente',
      'Uso de musculatura acessória',
      'Tiragem intercostal',
      'Incapacidade de falar frases completas',
      'Cianose central'
    ]
  },

  // EMERGÊNCIA NEUROLÓGICA - ALTERAÇÃO DE CONSCIÊNCIA
  'N01': {
    code: 'N01',
    description: 'Cefaleia',
    chapter: 'Sistema Nervoso',
    emergencyLevel: 'high',
    triageColor: 'yellow',
    immediateActions: [
      'Avaliar nível de consciência',
      'Exame neurológico rápido',
      'Aferir pressão arterial',
      'Verificar temperatura',
      'Fundoscopia (papiledema)'
    ],
    diagnosticSteps: [
      'TC de crânio urgente',
      'Pressão arterial seriada',
      'Punção lombar se suspeita de meningite',
      'Glicemia capilar'
    ],
    medicationsFirstLine: [
      'Analgésico simples (dipirona/paracetamol)',
      'Antiemético se náusea'
    ],
    dispositionAdvice: 'hospital',
    redFlags: [
      'Cefaleia "a pior da vida"',
      'Início súbito (< 1min)',
      'Associada à febre + rigidez de nuca',
      'Alteração visual + déficit neurológico',
      'Piora progressiva em > 1 dia'
    ]
  },

  // EMERGÊNCIA ABDOMINAL
  'D01': {
    code: 'D01',
    description: 'Dor abdominal',
    chapter: 'Sistema Digestivo',
    emergencyLevel: 'high',
    triageColor: 'yellow',
    immediateActions: [
      'Avaliar sinais vitais',
      'Palpação abdominal cuidadosa',
      'Acesso venoso se dor intensa',
      'Analgesia (não mascarar sinais)',
      'Naso nasogástrica se vômitos'
    ],
    diagnosticSteps: [
      'Hemograma completo',
      'Amilase/lipase se suspeita pancreatite',
      'Raio X de abdome se perfuração',
      'USG/TC se indicada',
      'Teste de gravidez se mulher em idade fértil'
    ],
    medicationsFirstLine: [
      'Dipirona ou paracetamol',
      'Antiemético (metoclopramida)',
      'Omeprazol se suspeita úlcera'
    ],
    dispositionAdvice: 'hospital',
    redFlags: [
      'Abdome em tábua',
      'Dor que migra para fossa ilíaca direita',
      'Vômito bilioso + ausência de flatos',
      'Massa abdominal palpável',
      'Sangramento digestivo ativo'
    ]
  },

  // EMERGÊNCIA PEDIÁTRICA - FEBRE
  'A03': {
    code: 'A03',
    description: 'Febre',
    chapter: 'Problemas Gerais e Inespecíficos',
    emergencyLevel: 'medium',
    triageColor: 'yellow',
    immediateActions: [
      'Avaliar estado geral',
      'Verificar sinais de alerta',
      'Aferir temperatura corretamente',
      'Despir excesso de roupas',
      'Hidratação oral'
    ],
    diagnosticSteps: [
      'Hemograma completo',
      'Urocultura se infecção urinária',
      'Raio X de tórax se sintomas respiratórios',
      'Punção lombar se meningismo'
    ],
    medicationsFirstLine: [
      'Paracetamol 15mg/kg/dose',
      'Ibuprofeno 10mg/kg/dose (> 6 meses)',
      'Dipirona 5mg/kg/dose se disponível'
    ],
    dispositionAdvice: 'follow_up',
    redFlags: [
      'Idade < 3 meses com febre',
      'Temperatura > 40.5°C',
      'Sinais de meningismo',
      'Petequias/m equimoses',
      'Prostração, recusa de líquidos',
      'Sinais de desidratação'
    ]
  },

  // TRAUMA - FERIMENTOS
  'A80': {
    code: 'A80',
    description: 'Traumatismo/acidente',
    chapter: 'Problemas Gerais e Inespecíficos',
    emergencyLevel: 'high',
    triageColor: 'red',
    immediateActions: [
      'Avaliar ABC (via aérea, respiração, circulação)',
      'Controle de hemorragias',
      'Imobilização cervical',
      'Acesso venoso se necessário',
      'Exame físico sistemático'
    ],
    diagnosticSteps: [
      'Radiografias conforme mecanismo',
      'TC se trauma craniano',
      'USG FAST se trauma abdominal',
      'Avaliação ortopédica'
    ],
    medicationsFirstLine: [
      'Analgésico conforme intensidade',
      'Antiespasmódico se indicado',
      'Soro fisiológico para reposição'
    ],
    dispositionAdvice: 'emergency',
    redFlags: [
      'Alteração do nível de consciência',
      'Instabilidade hemodinâmica',
      'Trauma penetrante',
      'Fraturas expostas',
      'Pneumotórax/hemotórax'
    ]
  }
};

// CÓDIGOS DE ATENÇÃO PRIMÁRIA ESPECÍFICOS
export const PRIMARY_CARE_CIAP2_CODES: CIAP2Code[] = [
  
  // PRÉ-NATAL
  {
    code: 'W78',
    description: 'Gravidez normal',
    chapter: 'Gravidez, Parto e Puerpério',
    section: 'Gravidez',
    hasProblem: false,
    emergencyRelevance: 'low',
    primaryCareAction: [
      'Consulta pré-natal de rotina',
      'Solicitar exames conforme protocolo',
      'Orientações sobre dieta e suplementação',
      'Planejar parto institucional'
    ],
    redFlags: [
      'Sangramento vaginal',
      'Dor abdominal intensa',
      'Hipertensão arterial',
      'Sangramento transvaginal'
    ],
    emergencyProtocol: 'obstetric_emergency'
  },

  // PEDIATRIA
  {
    code: 'A71',
    description: 'Consulta de crescimento e desenvolvimento',
    chapter: 'Problemas Gerais e Inespecíficos',
    section: 'Desenvolvimento',
    hasProblem: false,
    emergencyRelevance: 'low',
    primaryCareAction: [
      'Curva de crescimento',
      'Vacinação conforme calendário',
      'Desenvolvimento neuropsicomotor',
      'Orientações nutricionais'
    ],
    redFlags: [
      'Peso < percentil 3',
      'Retardo no desenvolvimento',
      'Sinais de abuso infantil'
    ]
  },

  // HIPERTENSÃO
  {
    code: 'K86',
    description: 'Hipertensão arterial',
    chapter: 'Sistema Cardiovascular',
    section: 'Pressão arterial',
    hasProblem: true,
    emergencyRelevance: 'medium',
    primaryCareAction: [
      'Medida da PA em diferentes momentos',
      'Investigação de causas secundárias',
      'Modificações no estilo de vida',
      'Medicação antihipertensiva',
      'Seguimento regular'
    ],
    medications: ['Enalapril', 'Hidroclorotiazida', 'Anlodipino'],
    redFlags: [
      'PA > 180/120 mmHg',
      'Sintomas neurológicos',
      'Dor torácica',
      'Disfunção renal'
    ],
    emergencyProtocol: 'hypertensive_crisis'
  },

  // DIABETES
  {
    code: 'T90',
    description: 'Diabetes mellitus',
    chapter: 'Sistema Endócrino',
    section: 'Diabetes',
    hasProblem: true,
    emergencyRelevance: 'high',
    primaryCareAction: [
      'Controle glicêmico regular',
      'Educação sobre diabetes',
      'Complicações crônicas',
      'Medicação hipoglicemiante',
      'Dietoterapia'
    ],
    medications: ['Metformina', 'Insulina', 'Glimepirida'],
    redFlags: [
      'Hiperglicemia > 400 mg/dL',
      'Sintomas de cetoacidose',
      'Hipoglicemia grave',
      'Sinais de pé diabético'
    ],
    emergencyProtocol: 'diabetic_emergency'
  },

  // ASMA
  {
    code: 'R96',
    description: 'Asma',
    chapter: 'Sistema Respiratório',
    section: 'Asma',
    hasProblem: true,
    emergencyRelevance: 'high',
    primaryCareAction: [
      'Controle de sintomas',
      'Educação sobre inaladores',
      'Identificação de gatilhos',
      'Plano de ação para exacerbações',
      'Seguimento regular'
    ],
    medications: ['Salbutamol', 'Beclometasona', 'Brometo de ipratrópio'],
    redFlags: [
      'Dispneia em repouso',
      'SpO2 < 90%',
      'Uso de musculatura acessória',
      'Fala entrecortada'
    ],
    emergencyProtocol: 'asthma_exacerbation'
  }
];

// GESTÃO DE CÓDIGOS CIAP2
export class CIAP2Manager {
  private codes: Map<string, CIAP2Code> = new Map();
  private emergencyCodes: Map<string, EmergencyCIAP2Category> = new Map();

  constructor() {
    this.initializeCodes();
  }

  private initializeCodes() {
    // Inicializar códigos de emergência
    Object.entries(EMERGENCY_CIAP2_CODES).forEach(([code, data]) => {
      this.emergencyCodes.set(code, data);
    });

    // Inicializar códigos de atenção primária
    PRIMARY_CARE_CIAP2_CODES.forEach(code => {
      this.codes.set(code.code, code);
    });
  }

  /**
   * Busca código por descrição
   */
  searchByDescription(query: string, limit = 10): CIAP2Code[] {
    const normalizedQuery = query.toLowerCase();
    const results: Array<{ code: CIAP2Code; score: number }> = [];

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
   * Obtém código de emergência
   */
  getEmergencyCode(code: string): EmergencyCIAP2Category | undefined {
    return this.emergencyCodes.get(code);
  }

  /**
   * Lista códigos por capítulo
   */
  getCodesByChapter(chapter: string): CIAP2Code[] {
    return Array.from(this.codes.values()).filter(code => code.chapter === chapter);
  }

  /**
   * Busca códigos por nível de relevância para emergência
   */
  getCodesByEmergencyRelevance(relevance: CIAP2Code['emergencyRelevance']): CIAP2Code[] {
    return Array.from(this.codes.values()).filter(code => code.emergencyRelevance === relevance);
  }

  /**
   * Obtém red flags para um código
   */
  getRedFlags(code: string): string[] {
    const emergencyCode = this.emergencyCodes.get(code);
    const primaryCode = this.codes.get(code);
    
    return emergencyCode?.redFlags || primaryCode?.redFlags || [];
  }

  /**
   * Obtém protocolo de emergência
   */
  getEmergencyProtocol(code: string): string | undefined {
    const emergencyCode = this.emergencyCodes.get(code);
    const primaryCode = this.codes.get(code);
    
    return emergencyCode?.immediateActions.join('; ') || primaryCode?.emergencyProtocol;
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
   * Obtém códigos de emergência por nível
   */
  getEmergencyCodesByLevel(level: EmergencyCIAP2Category['emergencyLevel']): EmergencyCIAP2Category[] {
    return Array.from(this.emergencyCodes.values()).filter(code => code.emergencyLevel === level);
  }

  /**
   * Obtém códigos por cor de triagem
   */
  getCodesByTriageColor(color: EmergencyCIAP2Category['triageColor']): EmergencyCIAP2Category[] {
    return Array.from(this.emergencyCodes.values()).filter(code => code.triageColor === color);
  }
}

// Instância global
export const ciap2Manager = new CIAP2Manager();

// Export para compatibilidade
export default ciap2Manager;