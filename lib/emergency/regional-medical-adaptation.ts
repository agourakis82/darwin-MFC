// @ts-nocheck
/**
 * ADAPTAÇÃO REGIONAL AUTOMÁTICA
 * Sistema de adaptação automática por região/país para medicina de emergência
 * Otimizado para zonas pobres e zonas de guerra
 */

export interface RegionalConfig {
  region: 'brasil' | 'grecia' | 'haiti' | 'syria';
  country: string;
  language: string;
  medicalSystem: string;
  emergencyNumber: string;
  protocols: RegionalProtocol[];
  medications: RegionalMedication[];
  guidelines: RegionalGuideline[];
  culturalConsiderations: CulturalConsideration[];
  resourceAvailability: ResourceAvailability;
  emergencyContacts: EmergencyContact[];
}

export interface RegionalProtocol {
  id: string;
  name: string;
  localName: string;
  authority: string;
  year: number;
  modifications: ProtocolModification[];
  adaptations: ProtocolAdaptation[];
}

export interface ProtocolModification {
  step: string;
  originalAction: string;
  modifiedAction: string;
  reason: string;
  context: string;
}

export interface ProtocolAdaptation {
  condition: string;
  adaptation: string;
  availability: 'always' | 'limited' | 'unavailable';
  alternative?: string;
}

export interface RegionalMedication {
  rxcui: string;
  internationalName: string;
  localName: string;
  availability: 'universal' | 'restricted' | 'unavailable';
  restrictions: string[];
  alternatives: string[];
  localDosage: string;
  culturalNotes: string[];
}

export interface RegionalGuideline {
  authority: string;
  title: string;
  year: number;
  url?: string;
  keyPoints: string[];
  adaptations: string[];
}

export interface CulturalConsideration {
  aspect: string;
  description: string;
  implications: string[];
  recommendations: string[];
  sensitivity: 'low' | 'medium' | 'high' | 'critical';
}

export interface ResourceAvailability {
  infrastructure: {
    hospitals: number; // por 100k habitantes
    icuBeds: number; // por 100k habitantes
    ambulances: number; // por 100k habitantes
    basicEquipment: number; // percentual de disponibilidade
  };
  medications: {
    essential: number; // percentual de disponibilidade
    emergency: number; // percentual de disponibilidade
    pediatric: number; // percentual de disponibilidade
  };
  personnel: {
    doctors: number; // por 100k habitantes
    nurses: number; // por 100k habitantes
    specialists: number; // por 100k habitantes
  };
  accessibility: {
    urban: number; // percentual
    rural: number; // percentual
    remote: number; // percentual
  };
}

export interface EmergencyContact {
  service: string;
  number: string;
  coverage: string;
  notes: string;
}

// CONFIGURAÇÕES REGIONAIS

// BRASIL - SISTEMA SUS
export const BRASIL_CONFIG: RegionalConfig = {
  region: 'brasil',
  country: 'Brasil',
  language: 'pt-BR',
  medicalSystem: 'Sistema Único de Saúde (SUS)',
  emergencyNumber: '192 (SAMU)',
  protocols: [
    {
      id: 'sus-protocol-001',
      name: 'Protocolo de Manchester (Triagem)',
      localName: 'Protocolo de Manchester - Sistema Brasileiro',
      authority: 'Ministério da Saúde',
      year: 2023,
      modifications: [
        {
          step: 'Triagem',
          originalAction: 'Sistema padrão internacional',
          modifiedAction: 'Sistema Manchester adaptado para SUS',
          reason: 'Integração com regulação médica',
          context: 'Unidades de Pronto Atendimento'
        }
      ],
      adaptations: [
        {
          condition: 'Área rural',
          adaptation: 'Triagem simplificada com critérios de evacuação',
          availability: 'always'
        }
      ]
    },
    {
      id: 'sus-protocol-002',
      name: 'Pré-natal de Alto Risco',
      localName: 'Protocolo de Pré-natal SUS',
      authority: 'Ministério da Saúde',
      year: 2022,
      modifications: [
        {
          step: 'Exames',
          originalAction: 'Protocolo internacional padrão',
          modifiedAction: 'Exames RENAME (lista padronizada)',
          reason: 'Lista de medicamentos padronizados',
          context: 'Atenção primária SUS'
        }
      ],
      adaptations: [
        {
          condition: 'UBS sem laboratório',
          adaptation: 'Encaminhamento para Polo (Rede de Frio)',
          availability: 'limited',
          alternative: 'Teste rápido quando disponível'
        }
      ]
    }
  ],
  medications: [
    {
      rxcui: '314422',
      internationalName: 'Epinephrine',
      localName: 'Adrenalina',
      availability: 'universal',
      restrictions: [],
      alternatives: [],
      localDosage: 'Doses padrão SUS',
      culturalNotes: ['Aceitação universal', 'Disponível em UBS básicas']
    },
    {
      rxcui: '1191',
      internationalName: 'Insulin',
      localName: 'Insulina',
      availability: 'restricted',
      restrictions: ['Acesso via programa farmácia popular'],
      alternatives: ['Metformina (via oral)'],
      localDosage: 'Conforme protocolo SUS',
      culturalNotes: ['Resistência cultural menor que em outras regiões', 'Educação sobre diabetes necessária']
    },
    {
      rxcui: '8601',
      internationalName: 'Omeprazole',
      localName: 'Omeprazol',
      availability: 'universal',
      restrictions: [],
      alternatives: ['Ranitidina'],
      localDosage: '40mg IV conforme SUS',
      culturalNotes: ['Aceitação boa', 'Disponível em genéricos']
    }
  ],
  guidelines: [
    {
      authority: 'Sociedade Brasileira de Cardiologia',
      title: 'Diretrizes Brasileiras de Cardiologia',
      year: 2023,
      keyPoints: [
        'Protocolo IAM integrado com SUS',
        'Telemedicina para áreas remotas',
        'RCP com ênfase em compressões'
      ],
      adaptations: [
        'Adaptação para contexto SUS',
        'Ênfase em prevenção primaria'
      ]
    },
    {
      authority: 'Ministério da Saúde',
      title: 'Protocolo Clínico e Diretrizes Terapêuticas',
      year: 2022,
      keyPoints: [
        'Lista RENAME de medicamentos',
        'Protocolos por nível de atenção',
        'Integração atenção primária/secundária'
      ],
      adaptations: [
        'Foco em medicina preventiva',
        'Adaptação para realidade epidemiológica brasileira'
      ]
    }
  ],
  culturalConsiderations: [
    {
      aspect: 'Medicina preventiva',
      description: 'Brasil tem cultura forte de medicina preventiva',
      implications: [
        'Maior aceitação de campanhas de vacinação',
        'Busca ativa por cuidados preventivos',
        'Participação comunitária ativa'
      ],
      recommendations: [
        'Enfatizar educação em saúde',
        'Usar linguagem popular acessível',
        'Integrar medicina tradicional quando apropriado'
      ],
      sensitivity: 'medium'
    },
    {
      aspect: 'Família extendida',
      description: 'Família extensa participação em decisões médicas',
      implications: [
        'Decisões podem envolver múltiplos familiares',
        'Necessidade de consenso familiar',
        'Influência de avós e tios em decisões infantis'
      ],
      recommendations: [
        'Incluir família em orientações',
        'Usar comunicação clara e acessível',
        'Respeitar hierarquia familiar'
      ],
      sensitivity: 'high'
    }
  ],
  resourceAvailability: {
    infrastructure: {
      hospitals: 2.1, // por 100k
      icuBeds: 2.0, // por 100k
      ambulances: 4.8, // por 100k
      basicEquipment: 78 // percentual
    },
    medications: {
      essential: 85, // percentual
      emergency: 72, // percentual
      pediatric: 68 // percentual
    },
    personnel: {
      doctors: 2.1, // por 1000 habitantes
      nurses: 4.5, // por 1000 habitantes
      specialists: 0.8 // por 1000 habitantes
    },
    accessibility: {
      urban: 92, // percentual
      rural: 65, // percentual
      remote: 23 // percentual
    }
  },
  emergencyContacts: [
    {
      service: 'SAMU',
      number: '192',
      coverage: 'Nacional',
      notes: 'Emergências médicas'
    },
    {
      service: 'Bombeiros',
      number: '193',
      coverage: 'Nacional',
      notes: 'Incêndios, resgates, emergências'
    },
    {
      service: 'Polícia',
      number: '190',
      coverage: 'Nacional',
      notes: 'Emergências policiais'
    }
  ]
};

// GRÉCIA - SISTEMA EUROPEU
export const GRECIA_CONFIG: RegionalConfig = {
  region: 'grecia',
  country: 'Grécia',
  language: 'el-GR',
  medicalSystem: 'Sistema Nacional de Saúde Grego (ESY)',
  emergencyNumber: '166 (EKAB)',
  protocols: [
    {
      id: 'grecia-protocol-001',
      name: 'European Resuscitation Council Guidelines',
      localName: 'Οδηγίες ERC - Ελληνική έκδοση',
      authority: 'European Resuscitation Council',
      year: 2021,
      modifications: [
        {
          step: 'RCP',
          originalAction: 'Protocolo padrão ERC',
          modifiedAction: 'Adaptação para sistema grego EKAB',
          reason: 'Integração com sistema de emergência pré-hospitalar',
          context: 'Serviços de emergência'
        }
      ],
      adaptations: [
        {
          condition: 'Ilhas remotas',
          adaptation: 'Protocolos Telemedicina',
          availability: 'limited',
          alternative: 'Médico de família'
        }
      ]
    }
  ],
  medications: [
    {
      rxcui: '314422',
      internationalName: 'Epinephrine',
      localName: 'Επινεφρίνη',
      availability: 'universal',
      restrictions: [],
      alternatives: [],
      localDosage: 'Conforme farmacopeia grega',
      culturalNotes: ['Aceitação médica excelente', 'Disponível em todos os hospitais']
    }
  ],
  guidelines: [
    {
      authority: 'Greek Society of Cardiology',
      title: 'Καρδιολογικές Οδηγίες',
      year: 2022,
      keyPoints: [
        'Protocolo IAM europeu',
        'Prevenção cardiovascular',
        'RCP integrado'
      ],
      adaptations: [
        'Adaptação para realidade econômica grega',
        'Ênfase em custo-efetividade'
      ]
    }
  ],
  culturalConsiderations: [
    {
      aspect: 'Hierarquia médica',
      description: 'Sistema médico hierárquico forte',
      implications: [
        'Decisões centralizadas',
        'Respeito à autoridade médica',
        'Protocolos seguidos estritamente'
      ],
      recommendations: [
        'Usar linguagem médica precisa',
        'Seguir protocolos estabelecidos',
        'Respeitar hierarquia profissional'
      ],
      sensitivity: 'medium'
    }
  ],
  resourceAvailability: {
    infrastructure: {
      hospitals: 3.2,
      icuBeds: 3.8,
      ambulances: 6.1,
      basicEquipment: 85
    },
    medications: {
      essential: 90,
      emergency: 82,
      pediatric: 78
    },
    personnel: {
      doctors: 3.1,
      nurses: 3.8,
      specialists: 1.2
    },
    accessibility: {
      urban: 95,
      rural: 78,
      remote: 45
    }
  },
  emergencyContacts: [
    {
      service: 'EKAB',
      number: '166',
      coverage: 'Nacional',
      notes: 'Serviços de emergência médica'
    },
    {
      service: 'Fire Service',
      number: '199',
      coverage: 'Nacional',
      notes: 'Bombeiros'
    }
  ]
};

// HAITI - CONTEXTO DE CONFLITO
export const HAITI_CONFIG: RegionalConfig = {
  region: 'haiti',
  country: 'Haiti',
  language: 'ht-HT',
  medicalSystem: 'Sistema de Saúde Fragmentado',
  emergencyNumber: '118',
  protocols: [
    {
      id: 'haiti-protocol-001',
      name: 'War Medicine Protocol',
      localName: 'Pwo tok-médikè pou lagè',
      authority: 'WHO Emergency Guidelines',
      year: 2023,
      modifications: [
        {
          step: 'Triagem',
          originalAction: 'Triagem médica padrão',
          modifiedAction: 'Triagem de guerra com códigos de prioridade',
          reason: 'Situações de conflito armado',
          context: 'Medicina de guerra'
        }
      ],
      adaptations: [
        {
          condition: 'Zona de conflito',
          adaptation: 'Múltiplas vítimas - códigos de prioridade',
          availability: 'always',
          alternative: 'Triagem simplificada'
        },
        {
          condition: 'Recursos limitados',
          adaptation: 'Protocolos de improvisação',
          availability: 'limited',
          alternative: 'Medicina tradicional quando possível'
        }
      ]
    }
  ],
  medications: [
    {
      rxcui: '314422',
      internationalName: 'Epinephrine',
      localName: 'Epinefrin',
      availability: 'restricted',
      restrictions: ['Disponibilidade limitada', 'Preferir alternativas quando possível'],
      alternatives: ['Dopamina (doses baixas)', 'Corticoide IV'],
      localDosage: 'Doses mínimas eficazes',
      culturalNotes: [
        'Respeitar tradições vodou quando não interfere',
        'Explicar procedimento em crioulo',
        'Incluir família extensa em decisões'
      ]
    }
  ],
  guidelines: [
    {
      authority: 'WHO Haiti Office',
      title: 'Emergency Medical Guidelines for Conflict Zones',
      year: 2023,
      keyPoints: [
        'Triagem de guerra',
        'Medicina de trauma',
        'Protocolos de escassez'
      ],
      adaptations: [
        'Adaptação para recursos muito limitados',
        'Medicina de guerra',
        'Foco em trauma e infectologia'
      ]
    }
  ],
  culturalConsiderations: [
    {
      aspect: 'Medicina tradicional',
      description: 'Medicina vodou e tradicional muito presente',
      implications: [
        'Resistência a procedimentos invasivos',
        'Crenças sobre causas sobrenaturais',
        'Curandeiros locais influenciam decisões'
      ],
      recommendations: [
        'Integrar medicina tradicional quando seguro',
        'Respeitar crenças locais',
        'Explicar em linguagem simples',
        'Trabalhar com curandeiros locais'
      ],
      sensitivity: 'critical'
    },
    {
      aspect: 'Autoridade familiar',
      description: 'Elder (mais velho) toma decisões médicas',
      implications: [
        'Elder deve aprovar tratamentos',
        'Mulheres têm autoridade limitada',
        'Decisões podem ser atrasadas'
      ],
      recommendations: [
        'Envolver elder desde o início',
        'Explicar urgência quando necessário',
        'Respeitar estrutura familiar',
        'Usar intérprete quando possível'
      ],
      sensitivity: 'high'
    }
  ],
  resourceAvailability: {
    infrastructure: {
      hospitals: 0.8,
      icuBeds: 0.2,
      ambulances: 1.2,
      basicEquipment: 35
    },
    medications: {
      essential: 45,
      emergency: 28,
      pediatric: 22
    },
    personnel: {
      doctors: 0.2,
      nurses: 0.5,
      specialists: 0.05
    },
    accessibility: {
      urban: 48,
      rural: 12,
      remote: 5
    }
  },
  emergencyContacts: [
    {
      service: 'Police',
      number: '118',
      coverage: 'Urbano',
      notes: 'Serviços limitados'
    },
    {
      service: 'UN Peacekeeping',
      number: '9999',
      coverage: 'Áreas controladas',
      notes: 'Casos específicos'
    }
  ]
};

// SÍRIA - MEDICINA DE GUERRA
export const SYRIA_CONFIG: RegionalConfig = {
  region: 'syria',
  country: 'Síria',
  language: 'ar-SY',
  medicalSystem: 'Sistema Fragmentado por Conflito',
  emergencyNumber: '110',
  protocols: [
    {
      id: 'syria-protocol-001',
      name: 'War Medicine Protocol',
      localName: 'بروتوكول الطب الحربي',
      authority: 'WHO Emergency Guidelines',
      year: 2023,
      modifications: [
        {
          step: 'Segurança',
          originalAction: 'Avaliação médica padrão',
          modifiedAction: 'Avaliação de segurança primeiro',
          reason: 'Conflito armado ativo',
          context: 'Medicina de guerra'
        }
      ],
      adaptations: [
        {
          condition: 'Bombeiros ativos',
          adaptation: 'Refúgio subterrâneo obrigatório',
          availability: 'always',
          alternative: 'Tratamento em bunker'
        },
        {
          condition: 'Recursos de guerra',
          adaptation: 'Medicina de campo',
          availability: 'limited',
          alternative: 'Instrumentos improvisados'
        }
      ]
    }
  ],
  medications: [
    {
      rxcui: '314422',
      internationalName: 'Epinephrine',
      localName: 'الإبينفرين',
      availability: 'restricted',
      restrictions: ['Disponibilidade erratic', 'Escassez frequente'],
      alternatives: ['Norepinefrina', 'Corticoide em altas doses'],
      localDosage: 'Doses adaptadas à escassez',
      culturalNotes: [
        'Respeitar valores islâmicos',
        'Considerar objeções a procedimentos invasivos',
        'Explicar em árabe simplificado'
      ]
    }
  ],
  guidelines: [
    {
      authority: 'WHO Syria Office',
      title: 'Emergency Medical Care in Conflict Zones',
      year: 2023,
      keyPoints: [
        'Medicina de guerra',
        'Triagem de múltiplas vítimas',
        'Protocolos de escassez extrema'
      ],
      adaptations: [
        'Adaptação para conflitos ativos',
        'Medicina de bunker/subterrânea',
        'Foco em trauma e emergência'
      ]
    }
  ],
  culturalConsiderations: [
    {
      aspect: 'Valores islâmicos',
      description: 'Medicina deve respeitar princípios islâmicos',
      implications: [
        'Resistência a certos procedimentos',
        'Importância da modesty',
        'Papel da família em decisões'
      ],
      recommendations: [
        'Respeitar valores religiosos',
        'Garantir modesty',
        'Incluir família em discussões',
        'Considerar aspectos halal/haram'
      ],
      sensitivity: 'critical'
    },
    {
      aspect: 'Santuário médico',
      description: 'Hospitais são santuários mesmo em guerra',
      implications: [
        'Hospitais podem ser alvo',
        'Segurança da equipe médica',
        'Evacuação quando necessário'
      ],
      recommendations: [
        'Planos de evacuação',
        'Comunicações de emergência',
        'Coordenação com forças armadas',
        'Medicina móvel quando possível'
      ],
      sensitivity: 'critical'
    }
  ],
  resourceAvailability: {
    infrastructure: {
      hospitals: 1.5,
      icuBeds: 0.8,
      ambulances: 2.1,
      basicEquipment: 42
    },
    medications: {
      essential: 52,
      emergency: 35,
      pediatric: 28
    },
    personnel: {
      doctors: 1.5,
      nurses: 2.2,
      specialists: 0.3
    },
    accessibility: {
      urban: 65,
      rural: 25,
      remote: 8
    }
  },
  emergencyContacts: [
    {
      service: 'Civil Defence',
      number: '110',
      coverage: 'Áreas controladas',
      notes: 'Serviços limitados'
    },
    {
      service: 'Red Crescent',
      number: '114',
      coverage: 'Internacional',
      notes: 'Cruz Vermelha'
    }
  ]
};

// GERENCIADOR DE ADAPTAÇÃO REGIONAL
export class RegionalMedicalAdapter {
  private configs: Map<string, RegionalConfig> = new Map();
  private currentRegion: string = 'brasil';

  constructor() {
    this.initializeConfigs();
  }

  private initializeConfigs() {
    const configs = [
      BRASIL_CONFIG,
      GRECIA_CONFIG,
      HAITI_CONFIG,
      SYRIA_CONFIG
    ];

    configs.forEach(config => {
      this.configs.set(config.region, config);
    });
  }

  /**
   * Define região atual
   */
  setCurrentRegion(region: string): void {
    if (this.configs.has(region)) {
      this.currentRegion = region;
    } else {
      console.warn(`Região ${region} não encontrada, mantendo ${this.currentRegion}`);
    }
  }

  /**
   * Obtém configuração da região atual
   */
  getCurrentConfig(): RegionalConfig | undefined {
    return this.configs.get(this.currentRegion);
  }

  /**
   * Obtém protocolo adaptado para região
   */
  getAdaptedProtocol(protocolId: string): any {
    const config = this.getCurrentConfig();
    if (!config) return null;

    const protocol = config.protocols.find(p => p.id === protocolId);
    if (!protocol) return null;

    return {
      ...protocol,
      adaptations: protocol.adaptations,
      modifications: protocol.modifications
    };
  }

  /**
   * Obtém medicamento disponível na região
   */
  getRegionalMedication(rxcui: string): RegionalMedication | null {
    const config = this.getCurrentConfig();
    if (!config) return null;

    const medication = config.medications.find(m => m.rxcui === rxcui);
    return medication || null;
  }

  /**
   * Verifica disponibilidade de medicamento
   */
  checkMedicationAvailability(rxcui: string): {
    available: boolean;
    restrictions: string[];
    alternatives: string[];
    regionalNotes: string[];
  } {
    const medication = this.getRegionalMedication(rxcui);
    
    if (!medication) {
      return {
        available: false,
        restrictions: ['Medicamento não encontrado'],
        alternatives: [],
        regionalNotes: ['Consultar lista local de medicamentos']
      };
    }

    return {
      available: medication.availability === 'universal',
      restrictions: medication.restrictions,
      alternatives: medication.alternatives,
      regionalNotes: medication.culturalNotes
    };
  }

  /**
   * Obtém considerações culturais
   */
  getCulturalConsiderations(): CulturalConsideration[] {
    const config = this.getCurrentConfig();
    return config?.culturalConsiderations || [];
  }

  /**
   * Obtém recursos disponíveis
   */
  getResourceAvailability(): ResourceAvailability | null {
    const config = this.getCurrentConfig();
    return config?.resourceAvailability || null;
  }

  /**
   * Busca regiões disponíveis
   */
  getAvailableRegions(): string[] {
    return Array.from(this.configs.keys());
  }

  /**
   * Adapta protocolo baseado em recursos disponíveis
   */
  adaptProtocolForResources(
    protocol: any,
    resourceLevel: 'full' | 'limited' | 'minimal' = 'full'
  ): any {
    const config = this.getCurrentConfig();
    if (!config) return protocol;

    const availability = config.resourceAvailability;
    
    // Adaptar baseado no nível de recursos
    if (resourceLevel === 'minimal' || availability.infrastructure.basicEquipment < 50) {
      return {
        ...protocol,
        steps: protocol.steps.filter((step: any) => step.critical),
        medications: protocol.medications?.filter((med: any) =>
          this.getRegionalMedication(med.rxcui)?.availability === 'universal'
        )
      };
    }

    return protocol;
  }

  /**
   * Detecta região automaticamente (baseado em localização)
   */
  async detectRegion(): Promise<string> {
    // Implementação simplificada - em produção usaria geolocalização
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      // Mapear código do país para região
      const countryMapping: Record<string, string> = {
        'BR': 'brasil',
        'GR': 'grecia',
        'HT': 'haiti',
        'SY': 'syria'
      };

      const detectedRegion = countryMapping[data.country_code];
      if (detectedRegion && this.configs.has(detectedRegion)) {
        this.setCurrentRegion(detectedRegion);
        return detectedRegion;
      }
    } catch (error) {
      console.warn('Não foi possível detectar região automaticamente');
    }

    return this.currentRegion;
  }
}

// Instância global
export const regionalMedicalAdapter = new RegionalMedicalAdapter();

// Export para compatibilidade
export default regionalMedicalAdapter;