// @ts-nocheck
/**
 * MÓDULO DE EMERGÊNCIA - PROTOCOLOS VISUAIS
 * Sistema de protocolos de emergência para zonas críticas
 * Otimizado para medicina de família e situações extremas
 */

export interface EmergencyProtocol {
  id: string;
  name: string;
  category: 'cardiac' | 'trauma' | 'sepsis' | 'pediatric' | 'obstetric' | 'respiratory';
  severity: 'low' | 'medium' | 'high' | 'critical';
  estimatedTime: number; // minutos
  steps: EmergencyStep[];
  medications?: EmergencyMedication[];
  equipment?: string[];
  contraindications?: string[];
  complications?: string[];
  monitoring?: string[];
  regionalAdaptations: RegionalAdaptation[];
  visualFlowchart?: string[];
  code: string; // Código do protocolo
}

export interface EmergencyStep {
  id: string;
  title: string;
  description: string;
  duration?: number; // segundos
  critical?: boolean;
  warning?: string;
  tip?: string;
  visual?: string;
  actions?: string[];
  parameters?: Record<string, any>;
}

export interface EmergencyMedication {
  rxcui: string;
  name: string;
  dose: string;
  route: string;
  timing: string;
  maxDose?: string;
  precautions?: string[];
}

export interface RegionalAdaptation {
  region: 'brasil' | 'grecia' | 'haiti' | 'syria';
  modifiedSteps?: string[];
  alternativeMedications?: string[];
  localGuidelines?: string[] | string;
  availabilityNotes?: string[] | string;
  culturalConsiderations?: string[] | string;
}

// PROTOCOLOS DE EMERGÊNCIA CRÍTICOS

// 1. PARADA CARDIORRESPIRATÓRIA (RCP)
export const CARDIAC_ARREST_PROTOCOL: EmergencyProtocol = {
  id: 'cardiac-arrest-001',
  name: 'Parada Cardiorrespiratória - RCP',
  category: 'cardiac',
  severity: 'critical',
  estimatedTime: 0,
  code: 'RCP-001',
  steps: [
    {
      id: 'step-001',
      title: 'Verificar Responsividade',
      description: 'Bater nos ombros e gritar: "Você está bem?"',
      duration: 10,
      critical: true,
      visual: 'touch_shoulder',
      actions: ['Verificar respiração', 'Verificar pulso carotídeo']
    },
    {
      id: 'step-002',
      title: 'Chamar Ajuda',
      description: 'Gritar por ajuda e chamar equipe de emergência',
      duration: 5,
      critical: true,
      visual: 'call_help',
      actions: ['Pedir desfibrilador', 'Solicitar medicações de RCP']
    },
    {
      id: 'step-003',
      title: 'Posicionar Paciente',
      description: 'Decúbito dorsal em superfície rígida',
      duration: 15,
      visual: 'position_supine',
      tip: 'Cabeça, pescoço e tórax alinhados'
    },
    {
      id: 'step-004',
      title: 'Iniciar Compressões Torácicas',
      description: 'Frequência 100-120/min, profundidade 5-6cm',
      duration: 180,
      critical: true,
      visual: 'chest_compressions',
      parameters: {
        compressionDepth: '5-6 cm',
        compressionRate: '100-120/min',
        handPosition: 'Centro do peito, entre os mamilos'
      }
    },
    {
      id: 'step-005',
      title: 'Abrir Via Aérea',
      description: 'Manobra frente-mento',
      duration: 10,
      visual: 'airway_open',
      actions: ['Remover dentaduras', 'Aspirar se necessário']
    },
    {
      id: 'step-006',
      title: 'Ventilação',
      description: '2 respirações para cada 30 compressões',
      duration: 20,
      visual: 'ventilation',
      parameters: {
        volume: '500-600ml',
        duration: '1 segundo por respiração',
        pauseBetween: 'Menos de 10 segundos'
      }
    }
  ],
  medications: [
    {
      rxcui: '314422',
      name: 'Adrenalina',
      dose: '1mg IV/IO',
      route: 'IV/IO',
      timing: 'A cada 3-5 minutos'
    },
    {
      rxcui: '3115',
      name: 'Amiodarona',
      dose: '300mg IV/IO',
      route: 'IV/IO',
      timing: 'Após 2ª dose de adrenalina'
    }
  ],
  equipment: [
    'Desfibrilador',
    'Máscara facial',
    'Ambú',
    'Cânula orofaríngea',
    'Aspirador'
  ],
  monitoring: [
    'Ritmo cardíaco',
    'Pressão arterial',
    'Saturação de oxigênio',
    'Temperatura corporal'
  ],
  regionalAdaptations: [
    {
      region: 'brasil',
      localGuidelines: 'Protocolo da Sociedade Brasileira de Cardiologia',
      availabilityNotes: 'Desfibrilador disponível em UBS básicas'
    },
    {
      region: 'grecia',
      localGuidelines: 'ERC Guidelines 2021',
      availabilityNotes: 'Sistema pré-hospitalar希腊民防'
    },
    {
      region: 'haiti',
      alternativeMedications: ['Epinefrina local disponível'],
      culturalConsiderations: 'Sensibilidade religiosa sobre procedimentos invasivos'
    },
    {
      region: 'syria',
      modifiedSteps: ['Verificar sinais vitais antes de RCP completa'],
      availabilityNotes: 'Equipamentos limitados, priorizar ventilação manual'
    }
  ],
  visualFlowchart: [
    'VERIFICAR → CHAMAR AJUDA → POSICIONAR → COMPRIMIR',
    'ABRIR VIA AÉREA → VENTILAR → CONTINUAR RITMO 30:2'
  ]
};

// 2. TRAUMA - ABCDE
export const TRAUMA_PROTOCOL: EmergencyProtocol = {
  id: 'trauma-abcde-001',
  name: 'Trauma - Avaliação ABCDE',
  category: 'trauma',
  severity: 'high',
  estimatedTime: 5,
  code: 'TRAUMA-001',
  steps: [
    {
      id: 'trauma-001',
      title: 'A - Via Aérea',
      description: 'Avaliar e manter via aérea permeable',
      duration: 60,
      critical: true,
      visual: 'airway_assessment',
      actions: [
        'Verificar obstrução',
        'Imobilizar cervical',
        'Aspirar secreções',
        'Cânula orofaríngea se necessário'
      ],
      warning: 'Suspeitar trauma cervical até prova contrária'
    },
    {
      id: 'trauma-002',
      title: 'B - Respiração',
      description: 'Avaliar ventilação e oxigenação',
      duration: 60,
      critical: true,
      visual: 'breathing_assessment',
      actions: [
        'Expor tórax',
        'Auscultar pulmões',
        'Verificar expansibilidade',
        'Administrar oxigênio'
      ]
    },
    {
      id: 'trauma-003',
      title: 'C - Circulação',
      description: 'Avaliar perfusão e controlar hemorragias',
      duration: 90,
      critical: true,
      visual: 'circulation_assessment',
      actions: [
        'Verificar pulso e PA',
        'Avaliar tempo de enchimento capilar',
        'Controlar hemorragias',
        'Acesso venoso grosso'
      ]
    },
    {
      id: 'trauma-004',
      title: 'D - Estado Neurológico',
      description: 'Avaliar nível de consciência',
      duration: 60,
      visual: 'neurological_assessment',
      actions: [
        'Escala de Glasgow',
        'Tamanho e reatividade pupilar',
        'Reflexos',
        'Paralisias'
      ]
    },
    {
      id: 'trauma-005',
      title: 'E - Exposição',
      description: 'Expor completamente o paciente',
      duration: 60,
      visual: 'full_exposure',
      actions: [
        'Remover roupas',
        'Verificar hypothermia',
        'Proteger contra perda de calor',
        'Examinar frente e costas'
      ]
    }
  ],
  medications: [
    {
      rxcui: '5640',
      name: 'Morfina',
      dose: '0.1mg/kg IV',
      route: 'IV',
      timing: 'Após ABCDE inicial',
      maxDose: '10mg'
    }
  ],
  equipment: [
    'Colar cervical',
    'Maca rígida',
    'Ataduras',
    'Soro fisiológico',
    'Acesso venoso grosso'
  ],
  regionalAdaptations: [
    {
      region: 'brasil',
      localGuidelines: 'Protocolo ATLS brasileiro',
      availabilityNotes: 'SAMU disponível para transporte'
    },
    {
      region: 'grecia',
      localGuidelines: 'European Trauma Course',
      availabilityNotes: 'Sistema europeu de trauma'
    },
    {
      region: 'haiti',
      culturalConsiderations: 'Exposição limitada por questões culturais',
      availabilityNotes: 'Materiais limitados, priorizar ABC'
    },
    {
      region: 'syria',
      modifiedSteps: ['Triagem de múltiplas vítimas primeiro'],
      availabilityNotes: 'Conflito armado, priorizar segurança da equipe'
    }
  ],
  visualFlowchart: [
    'A - VIA AÉREA → B - RESPIRAÇÃO → C - CIRCULAÇÃO',
    'D - NEUROLÓGICO → E - EXPOSIÇÃO'
  ]
};

// 3. SEPSE - RECONHECIMENTO E TRATAMENTO
export const SEPSIS_PROTOCOL: EmergencyProtocol = {
  id: 'sepsis-recognition-001',
  name: 'Sepse - Reconhecimento e Tratamento',
  category: 'sepsis',
  severity: 'critical',
  estimatedTime: 60,
  code: 'SEPSE-001',
  steps: [
    {
      id: 'sepsis-001',
      title: 'Reconhecer Sinais de Sepse',
      description: 'Buscar sinais de infecção sistêmica',
      duration: 30,
      critical: true,
      visual: 'sepsis_signs',
      actions: [
        'Febre > 38.3°C ou < 36°C',
        'FC > 90 bpm',
        'FR > 20 irpm',
        'PA sistólica < 90 mmHg'
      ]
    },
    {
      id: 'sepsis-002',
      title: 'Colher Exames',
      description: 'Coletar culturas antes de antibiótico',
      duration: 15,
      critical: true,
      visual: 'lab_collection',
      actions: [
        'Hemoculturas (2 frascos)',
        'Hemograma completo',
        'PCR, procalcitonina',
        'Eletrolitos, creatinina'
      ]
    },
    {
      id: 'sepsis-003',
      title: 'Iniciar Antibiótico',
      description: 'Antibiótico amplo espectro em 1 hora',
      duration: 45,
      critical: true,
      visual: 'antibiotic_start',
      parameters: {
        timeLimit: '60 minutos do reconhecimento'
      }
    },
    {
      id: 'sepsis-004',
      title: 'Reposição Volêmica',
      description: '30ml/kg de cristaloide em 3 horas',
      duration: 180,
      critical: true,
      visual: 'fluid_resuscitation',
      parameters: {
        volume: '30ml/kg',
        fluid: 'Soro fisiológico ou Ringer lactato',
        time: '3 horas'
      }
    },
    {
      id: 'sepsis-005',
      title: 'Monitorização',
      description: 'Avaliar resposta ao tratamento',
      duration: 60,
      visual: 'monitoring',
      actions: [
        'PA seriada',
        'Diurese (> 0.5ml/kg/h)',
        'Lactato sérico',
        'Estado mental'
      ]
    }
  ],
  medications: [
    {
      rxcui: 'specific_antibiotic',
      name: 'Piperacilina-Tazobactam',
      dose: '4.5g IV',
      route: 'IV',
      timing: 'A cada 6-8 horas',
      precautions: ['Verificar alergias', 'Ajustar se insuficiência renal']
    }
  ],
  equipment: [
    'Acesso venoso grosso',
    'Monitor multiparamétrico',
    'Sondas',
    'Material para culturas'
  ],
  regionalAdaptations: [
    {
      region: 'brasil',
      localGuidelines: 'Protocolo Brasileiro de Sepse',
      availabilityNotes: 'Antibióticos do SUS disponíveis'
    },
    {
      region: 'grecia',
      localGuidelines: 'Surviving Sepsis Campaign',
      availabilityNotes: 'Protocolos europeus de sepse'
    },
    {
      region: 'haiti',
      alternativeMedications: ['Ceftriaxona + Metronidazol'],
      availabilityNotes: 'Materiais limitados, priorizar acesso venoso'
    },
    {
      region: 'syria',
      modifiedSteps: ['Triagem de guerra - feridas múltiplas'],
      availabilityNotes: 'Escassez de antibióticos, usar empíricos'
    }
  ],
  visualFlowchart: [
    'RECONHECER → COLETAR → ANTIBIÓTICO (1H)',
    'REPOSIÇÃO (30ML/KG) → MONITORIZAR'
  ]
};

// 4. EMERGÊNCIA PEDIÁTRICA
export const PEDIATRIC_EMERGENCY_PROTOCOL: EmergencyProtocol = {
  id: 'pediatric-dehydration-001',
  name: 'Desidratação Pediátrica',
  category: 'pediatric',
  severity: 'high',
  estimatedTime: 30,
  code: 'PED-001',
  steps: [
    {
      id: 'ped-001',
      title: 'Avaliar Grau de Desidratação',
      description: 'Classificar desidratação leve, moderada ou grave',
      duration: 15,
      critical: true,
      visual: 'dehydration_assessment',
      parameters: {
        criteria: [
          'Perda de peso (%)',
          'Estado geral',
          'Mucosas',
          'Turgor cutâneo',
          'Oligúria'
        ]
      }
    },
    {
      id: 'ped-002',
      title: 'Calcular Déficit Hídrico',
      description: 'Déficit = Peso x % desidratação',
      duration: 10,
      visual: 'fluid_deficit_calc',
      parameters: {
        formula: 'Déficit = Peso (kg) × % desidratação',
        example: '10kg × 8% = 800ml déficit'
      }
    },
    {
      id: 'ped-003',
      title: 'Reposição Hidrica',
      description: 'Soro de reidratação oral ou IV conforme grau',
      duration: 240,
      critical: true,
      visual: 'oral_rehydration',
      actions: [
        'Leve: SRO via oral',
        'Moderada: SRO + sonda nasogástrica',
        'Grave: Reposição IV urgente'
      ]
    }
  ],
  medications: [
    {
      rxcui: 'oral_rehydration_salt',
      name: 'Soro de Reidratação Oral',
      dose: '50-100ml/kg em 4 horas',
      route: 'VO',
      timing: 'Repetir conforme necessário',
      precautions: ['Não usar em choque']
    }
  ],
  regionalAdaptations: [
    {
      region: 'brasil',
      localGuidelines: 'Sociedade Brasileira de Pediatria',
      availabilityNotes: 'SRO disponível gratuitamente nas UBS'
    },
    {
      region: 'grecia',
      localGuidelines: 'European Pediatric Society',
      availabilityNotes: 'Protocolos europeus de pediatria'
    },
    {
      region: 'haiti',
      modifiedSteps: ['Monitorização intensiva por recursos limitados'],
      culturalConsiderations: 'Enfatizar importância da hidratação'
    },
    {
      region: 'syria',
      availabilityNotes: 'SRO escasso, usar soluções caseiras quando possível'
    }
  ],
  visualFlowchart: [
    'AVALIAR GRAU → CALCULAR DÉFICIT → REPOR',
    'LEVE: ORAL | MODERADA: SNG | GRAVE: IV'
  ]
};

// 5. EMERGÊNCIA OBSTÉTRICA - ECLAMPSIA
export const OBSTETRIC_EMERGENCY_PROTOCOL: EmergencyProtocol = {
  id: 'obstetric-eclampsia-001',
  name: 'Eclampsia - Emergenência Obstétrica',
  category: 'obstetric',
  severity: 'critical',
  estimatedTime: 15,
  code: 'OBST-001',
  steps: [
    {
      id: 'obst-001',
      title: 'Reconhecer Eclampsia',
      description: 'Crises tônico-clônicas em grávida com pré-eclâmpsia',
      duration: 5,
      critical: true,
      visual: 'eclampsia_recognition',
      actions: [
        'PA > 160/110 mmHg',
        'Proteinúria 2+ ou mais',
        'Edema facial/extremidades',
        'Cefaleia, alterações visuais'
      ]
    },
    {
      id: 'obst-002',
      title: 'Proteger Paciente',
      description: 'Evitar traumatismos durante a crise',
      duration: 180,
      critical: true,
      visual: 'patient_protection',
      actions: [
        'Proteger голову',
        'Posição lateral',
        'Aspirar secreções',
        'Oxigênio 100%'
      ]
    },
    {
      id: 'obst-003',
      title: 'Sulfato de Magnésio',
      description: 'Protocolo deLoad: 4-6g IV em 20min',
      duration: 20,
      critical: true,
      visual: 'magnesium_sulfate',
      parameters: {
        loadingDose: '4-6g IV em 20min',
        maintenance: '1-2g/h por 24h',
        monitoring: 'Reflexos, diurese, FR'
      }
    },
    {
      id: 'obst-004',
      title: 'Controle da PA',
      description: 'Reduzir PA sem causar hipoperfusão fetal',
      duration: 60,
      critical: true,
      visual: 'bp_control',
      actions: [
        'Labetalol 20mg IV',
        'Hidralazina 5mg IV',
        'Manter PA 140-160/90-100'
      ]
    },
    {
      id: 'obst-005',
      title: 'Preparar Parto',
      description: 'Avaliarvia de parto e timing',
      duration: 30,
      visual: 'delivery_prep',
      actions: [
        'Avaliar Bishop score',
        'Preparar para cesariana',
        'Equipe de neonatologia'
      ]
    }
  ],
  medications: [
    {
      rxcui: '6898',
      name: 'Sulfato de Magnésio',
      dose: '4-6g IV em 20min',
      route: 'IV',
      timing: 'Dose de ataque',
      precautions: ['Monitorizar reflexos', 'Parar se depressão respiratória']
    },
    {
      rxcui: 'blood_pressure_med',
      name: 'Labetalol',
      dose: '20mg IV',
      route: 'IV',
      timing: 'Repetir a cada 10min se necessário',
      maxDose: '80mg'
    }
  ],
  equipment: [
    'Monitor fetal',
    'Equipo deinfusão',
    'Sulfato de magnésio',
    'Antihipertensivos',
    'Equipo de neonatologia'
  ],
  regionalAdaptations: [
    {
      region: 'brasil',
      localGuidelines: 'Federação Brasileira das Sociedades de Ginecologia e Obstetrícia',
      availabilityNotes: 'Protocolo Obstétrico Nacional'
    },
    {
      region: 'grecia',
      localGuidelines: 'European Society of Obstetrics',
      availabilityNotes: 'Protocolos europeus de obstetrícia'
    },
    {
      region: 'haiti',
      culturalConsiderations: 'Respeitar tradição familiar no parto',
      availabilityNotes: 'Materiais limitados, priorizar estabilização'
    },
    {
      region: 'syria',
      modifiedSteps: ['Maternidade deve estar protegida'],
      availabilityNotes: 'Conflito armado, protocolos de guerra'
    }
  ],
  visualFlowchart: [
    'RECONHECER → PROTEGER → MgSO4',
    'CONTROLAR PA → PREPARAR PARTO'
  ]
};

// GERENCIADOR DE PROTOCOLOS DE EMERGÊNCIA
export class EmergencyProtocolManager {
  private protocols: Map<string, EmergencyProtocol> = new Map();

  constructor() {
    this.initializeProtocols();
  }

  private initializeProtocols() {
    const protocols = [
      CARDIAC_ARREST_PROTOCOL,
      TRAUMA_PROTOCOL,
      SEPSIS_PROTOCOL,
      PEDIATRIC_EMERGENCY_PROTOCOL,
      OBSTETRIC_EMERGENCY_PROTOCOL
    ];

    protocols.forEach(protocol => {
      this.protocols.set(protocol.id, protocol);
    });
  }

  /**
   * Busca protocolo por categoria
   */
  getProtocolsByCategory(category: EmergencyProtocol['category']): EmergencyProtocol[] {
    return Array.from(this.protocols.values()).filter(p => p.category === category);
  }

  /**
   * Busca protocolo por severidade
   */
  getProtocolsBySeverity(severity: EmergencyProtocol['severity']): EmergencyProtocol[] {
    return Array.from(this.protocols.values()).filter(p => p.severity === severity);
  }

  /**
   * Obtém protocolo por ID
   */
  getProtocolById(id: string): EmergencyProtocol | undefined {
    return this.protocols.get(id);
  }

  /**
   * Adapta protocolo para região específica
   */
  adaptProtocolForRegion(
    protocolId: string, 
    region: RegionalAdaptation['region']
  ): EmergencyProtocol | undefined {
    const protocol = this.protocols.get(protocolId);
    if (!protocol) return undefined;

    const adaptation = protocol.regionalAdaptations.find(r => r.region === region);
    if (!adaptation) return protocol;

    // Criar versão adaptada do protocolo
    return {
      ...protocol,
      steps: this.adaptStepsForRegion(protocol.steps, adaptation),
      medications: this.adaptMedicationsForRegion(protocol.medications || [], adaptation)
    };
  }

  private adaptStepsForRegion(
    steps: EmergencyStep[], 
    adaptation: RegionalAdaptation
  ): EmergencyStep[] {
    if (!adaptation.modifiedSteps) return steps;
    
    // Implementação simplificada - em produção seria mais complexa
    return steps;
  }

  private adaptMedicationsForRegion(
    medications: EmergencyMedication[], 
    adaptation: RegionalAdaptation
  ): EmergencyMedication[] {
    if (!adaptation.alternativeMedications) return medications;
    
    // Implementação simplificada - em produção seria mais complexa
    return medications;
  }

  /**
   * Busca protocolos por tempo estimado
   */
  getProtocolsByTime(maxTime: number): EmergencyProtocol[] {
    return Array.from(this.protocols.values()).filter(p => p.estimatedTime <= maxTime);
  }

  /**
   * Obtém códigos de protocolo
   */
  getProtocolCodes(): string[] {
    return Array.from(this.protocols.values()).map(p => p.code);
  }

  /**
   * Busca por texto livre
   */
  searchProtocols(query: string): EmergencyProtocol[] {
    const normalizedQuery = query.toLowerCase();
    return Array.from(this.protocols.values()).filter(protocol => 
      protocol.name.toLowerCase().includes(normalizedQuery) ||
      protocol.category.toLowerCase().includes(normalizedQuery) ||
      protocol.steps.some(step => 
        step.title.toLowerCase().includes(normalizedQuery) ||
        step.description.toLowerCase().includes(normalizedQuery)
      )
    );
  }
}

// Instância global
export const emergencyProtocolManager = new EmergencyProtocolManager();

// Export para compatibilidade
export default emergencyProtocolManager;