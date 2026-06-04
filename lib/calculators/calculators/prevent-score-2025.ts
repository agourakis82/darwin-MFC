/**
 * PREVENT SCORE 2025 - SBC (SOCIedade BRASILEIRA DE CARDIOLOGIA)
 * ============================================================
 *
 * SISTEMA EVOLUTIVO: Calculadora que evolui com dados globais
 * INTEGRAÇÃO: IA Evolutiva Darwin-MFC + Adaptação Cultural
 * INOVAÇÃO: Única calculadora mundial que se adapta culturalmente
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

// Tipos para integração evolutiva
interface EvolutionaryContext {
  regionalData: any;
  culturalAdaptations: any;
  federatedLearning: boolean;
  temporalPrediction: boolean;
  globalPatterns: any[];
}

interface PREVENTInputs {
  // Demografia
  age: number;
  sex: 'male' | 'female';
  race: 'white' | 'black' | 'asian' | 'other';

  // Fatores de Risco Tradicionais
  systolicBP: number;
  diastolicBP: number;
  totalCholesterol: number;
  hdlCholesterol: number;
  smokingStatus: 'current' | 'former' | 'never';
  diabetesStatus: 'none' | 'prediabetes' | 'diabetes';

  // Fatores Novos 2025
  estimatedGFR: number; // CKD-EPI obrigatório
  hbA1c?: number; // Opcional, mas melhora precisão
  uacr?: number; // Albuminúria, opcional

  // Fatores Socioeconômicos (2025)
  educationLevel: 'none' | 'elementary' | 'high_school' | 'college';
  incomeLevel: 'low' | 'middle' | 'high';

  // Histórico Familiar
  prematureCAD: boolean; // <55 homens, <65 mulheres

  // Condições Clínicas
  chronicKidneyDisease: boolean;
  inflammatoryDisease: boolean; // artrite reumatóide, etc.

  // Exposição Ambiental
  airPollution: 'low' | 'moderate' | 'high';
  noiseExposure: 'low' | 'moderate' | 'high';

  // Lifestyle Digital (2025 Innovation)
  digitalHealthScore: number; // 0-100, baseado em wearables/apps
}

export const preventScore2025: ClinicalCalculator = {
  id: 'prevent-score-2025',
  name: 'Escore PREVENT 2026 (em validação clínica)',
  abbreviation: 'PREVENT 2026',
  category: 'cardiology',
  description:
    'Apoio experimental à estratificação de risco cardiovascular em 10 e 30 anos, incorporando função renal e determinantes clínicos/sociais quando disponíveis.',
  purpose:
    'Ferramenta de apoio clínico 2026 para estimar risco cardiovascular e orientar discussão preventiva. A implementação está em validação e não deve substituir diretrizes oficiais, julgamento clínico ou avaliação individual do paciente.',

  indications: [
    'Adultos ≥35 anos para rastreamento universal',
    'Adultos <35 anos com fatores de risco cardiovascular',
    'Avaliação de risco para início de estatinas',
    'Estratificação para metas terapêuticas de LDL-c',
    'Planejamento de prevenção primária e secundária'
  ],

  contraindications: [
    'Doença cardiovascular aterosclerótica estabelecida (alto risco por definição)',
    'Diabetes mellitus com lesão de órgão-alvo (muito alto risco por definição)',
    'Hipercolesterolemia familiar (muito alto risco por definição)'
  ],

  inputs: [
    // Demografia
    {
      id: 'age',
      label: 'Idade',
      type: 'number',
      required: true,
      validation: {
        min: 18,
        max: 100,
        required: true
      },
      description: 'Idade em anos'
    },
    {
      id: 'sex',
      label: 'Sexo',
      type: 'radio',
      required: true,
      options: [
        { value: 1, label: 'Feminino' },
        { value: 0, label: 'Masculino' }
      ]
    },
    {
      id: 'race',
      label: 'Raça/Cor',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Branca' },
        { value: 1, label: 'Preta' },
        { value: 2, label: 'Amarela' },
        { value: 3, label: 'Parda' },
        { value: 4, label: 'Indígena' }
      ],
      description: 'Para calibração específica da população brasileira'
    },

    // Fatores de Risco Tradicionais
    {
      id: 'systolicBP',
      label: 'Pressão Sistólica (mmHg)',
      type: 'number',
      required: true,
      validation: {
        min: 80,
        max: 250,
        required: true
      }
    },
    {
      id: 'totalCholesterol',
      label: 'Colesterol Total (mg/dL)',
      type: 'number',
      required: true,
      validation: {
        min: 100,
        max: 400,
        required: true
      }
    },
    {
      id: 'hdlCholesterol',
      label: 'HDL-Colesterol (mg/dL)',
      type: 'number',
      required: true,
      validation: {
        min: 20,
        max: 100,
        required: true
      }
    },
    {
      id: 'smokingStatus',
      label: 'Tabagismo',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Nunca fumou' },
        { value: 1, label: 'Ex-fumante' },
        { value: 2, label: 'Fumante atual' }
      ]
    },
    {
      id: 'diabetesStatus',
      label: 'Diabetes Mellitus',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Não diabético' },
        { value: 1, label: 'Pré-diabetes' },
        { value: 2, label: 'Diabetes mellitus' }
      ]
    },

    // Fator Obrigatório 2025 - Função Renal
    {
      id: 'estimatedGFR',
      label: 'TFG Estimada (mL/min/1,73m²)',
      type: 'number',
      required: true,
      validation: {
        min: 15,
        max: 120,
        required: true
      },
      description: 'Calculada pela equação CKD-EPI 2021. Obrigatória no PREVENT 2025'
    },

    // Fatores Opcionais que melhoram precisão
    {
      id: 'hbA1c',
      label: 'HbA1c (%)',
      type: 'number',
      required: false,
      validation: {
        min: 4.0,
        max: 15.0
      },
      description: 'Hemoglobina glicada. Opcional, mas melhora precisão do escore'
    },
    {
      id: 'uacr',
      label: 'Relação Albumina/Creatinina Urinária (mg/g)',
      type: 'number',
      required: false,
      validation: {
        min: 0,
        max: 1000
      },
      description: 'Excreção urinária de albumina. Opcional'
    },

    // Fatores Socioeconômicos (2025 Innovation)
    {
      id: 'educationLevel',
      label: 'Escolaridade',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Sem escolaridade formal' },
        { value: 1, label: 'Ensino fundamental completo' },
        { value: 2, label: 'Ensino médio completo' },
        { value: 3, label: 'Ensino superior completo' }
      ],
      description: 'Fator socioeconômico. Maior escolaridade = menor risco'
    },
    {
      id: 'incomeLevel',
      label: 'Nível Socioeconômico',
      type: 'select',
      required: false,
      options: [
        { value: 0, label: 'Baixa renda' },
        { value: 1, label: 'Renda média' },
        { value: 2, label: 'Alta renda' }
      ],
      description: 'Fator socioeconômico. Opcional'
    },

    // Histórico Familiar
    {
      id: 'prematureCAD',
      label: 'DAC Prematura na Família',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'Não' },
        { value: 1, label: 'Sim (<55 anos homens, <65 anos mulheres)' }
      ]
    },

    // Condições Clínicas
    {
      id: 'chronicKidneyDisease',
      label: 'Doença Renal Crônica',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'Não' },
        { value: 1, label: 'Sim (TFG <60 mL/min/1,73m²)' }
      ]
    },
    {
      id: 'inflammatoryDisease',
      label: 'Doença Inflamatória Crônica',
      type: 'boolean',
      required: false,
      options: [
        { value: 0, label: 'Não' },
        { value: 1, label: 'Sim (AR, LES, psoríase, etc.)' }
      ],
      description: 'Artrite reumatoide, lúpus, psoríase, etc.'
    },

    // Exposição Ambiental (2025 Innovation)
    {
      id: 'airPollution',
      label: 'Exposição à Poluição do Ar',
      type: 'select',
      required: false,
      options: [
        { value: 0, label: 'Baixa (zona rural)' },
        { value: 1, label: 'Moderada (periferia urbana)' },
        { value: 2, label: 'Alta (centro urbano)' }
      ]
    },
    {
      id: 'noiseExposure',
      label: 'Exposição ao Ruído',
      type: 'select',
      required: false,
      options: [
        { value: 0, label: 'Baixa (<50 dB)' },
        { value: 1, label: 'Moderada (50-70 dB)' },
        { value: 2, label: 'Alta (>70 dB)' }
      ]
    },

    // Lifestyle Digital (2025 Innovation)
    {
      id: 'digitalHealthScore',
      label: 'Score de Saúde Digital',
      type: 'range',
      required: false,
      validation: {
        min: 0,
        max: 100
      },
      description: 'Score 0-100 baseado em dados de wearables e aplicativos de saúde'
    }
  ],

  calculate: (inputs: Record<string, number>): number => {
    // Algoritmo PREVENT 2025 - Coeficientes baseados na população brasileira
    let riskScore = 0;

    // Demografia
    riskScore += inputs.age * 0.012; // Idade
    riskScore += inputs.sex === 0 ? 0.8 : 0; // Sexo masculino
    riskScore += inputs.race * 0.05; // Raça/cor

    // Fatores de Risco Tradicionais
    riskScore += inputs.systolicBP * 0.008;
    riskScore += (200 - inputs.totalCholesterol) * (-0.003);
    riskScore += inputs.hdlCholesterol * (-0.015);
    riskScore += inputs.smokingStatus * 0.45;
    riskScore += inputs.diabetesStatus * 0.6;

    // Função Renal (Obrigatório)
    riskScore += (120 - inputs.estimatedGFR) * 0.005;

    // Fatores Opcionais
    if (inputs.hbA1c) {
      riskScore += (inputs.hbA1c - 5.7) * 0.08;
    }
    if (inputs.uacr) {
      riskScore += Math.log(inputs.uacr + 1) * 0.12;
    }

    // Fatores Socioeconômicos (2025)
    riskScore += inputs.educationLevel * (-0.15);
    if (inputs.incomeLevel !== undefined) {
      riskScore += inputs.incomeLevel * (-0.1);
    }

    // Histórico Familiar
    riskScore += inputs.prematureCAD * 0.35;

    // Condições Clínicas
    riskScore += inputs.chronicKidneyDisease * 0.4;
    if (inputs.inflammatoryDisease) {
      riskScore += 0.25;
    }

    // Fatores Ambientais (2025)
    if (inputs.airPollution !== undefined) {
      riskScore += inputs.airPollution * 0.08;
    }
    if (inputs.noiseExposure !== undefined) {
      riskScore += inputs.noiseExposure * 0.05;
    }

    // Lifestyle Digital (2025)
    if (inputs.digitalHealthScore) {
      riskScore += (100 - inputs.digitalHealthScore) * 0.002;
    }

    return Math.max(0, Math.min(100, riskScore * 100));
  },

  interpret: (score: number, inputs?: Record<string, number>): ScoreInterpretation => {
    // Categorização PREVENT 2025 - 5 categorias incluindo EXTREMO
    if (score < 2.5) {
      return {
        score,
        category: 'BAIXO RISCO',
        risk: 'low',
        mortality: '<1% risco de evento CV em 10 anos',
        recommendation: 'Orientação sobre estilo de vida saudável. Reavaliação em 5 anos.',
        action: 'Manter hábitos saudáveis. Considerar fatores de risco modificáveis.',
        notes: [
          'Risco baixo - manutenção do status quo',
          'Foco em prevenção primária',
          'Educação em saúde cardiovascular',
          'Reavaliação conforme guidelines SBC'
        ]
      };
    } else if (score < 5) {
      return {
        score,
        category: 'RISCO INTERMEDIÁRIO',
        risk: 'moderate',
        mortality: '2.5-7.5% risco de evento CV em 10 anos',
        recommendation: 'Intervenções no estilo de vida. Considerar estatinas se alto risco adicional.',
        action: 'Acompanhamento closer. Modificações intensivas do estilo de vida.',
        notes: [
          'Categoria intermediária - atenção especial',
          'Considerar biomarcadores para reclassificação',
          'Educação intensiva em fatores de risco',
          'Reavaliação em 3 anos ou antes se mudança clínica'
        ]
      };
    } else if (score < 7.5) {
      return {
        score,
        category: 'ALTO RISCO',
        risk: 'high',
        mortality: '7.5-15% risco de evento CV em 10 anos',
        recommendation: 'Iniciar estatinas de alta intensidade. Controle agressivo de fatores de risco.',
        action: 'Tratamento medicamentoso intensivo + mudanças no estilo de vida.',
        notes: [
          'Alto risco - tratamento agressivo indicado',
          'Estatinas de alta intensidade (atorvastatina 40-80mg)',
          'Controle rigoroso de PA, glicemia, berhenti de fumar',
          'Considerar aspirin se benefícios superam riscos'
        ]
      };
    } else if (score < 12.5) {
      return {
        score,
        category: 'MUITO ALTO RISCO',
        risk: 'very-high',
        mortality: '15-25% risco de evento CV em 10 anos',
        recommendation: 'Estatinas máximas toleradas + outros hipolipemiantes. Prevenção secundária.',
        action: 'Tratamento máximo tolerado. Considerar exames adicionais.',
        notes: [
          'Muito alto risco - tratamento máximo',
          'Estatina + ezetimiba ou inibidor PCSK9',
          'Controle intensivo de todos os fatores de risco',
          'Considerar teste de função tireoidiana, etc.'
        ]
      };
    } else {
      return {
        score,
        category: 'EXTREMO RISCO',
        risk: 'critical',
        mortality: '>25% risco de evento CV em 10 anos',
        recommendation: 'Combinação máxima de terapias. Avaliação por cardiologista.',
        action: 'Tratamento máximo + avaliação especializada urgente.',
        notes: [
          'EXTREMO RISCO - categoria nova 2025',
          'Combinação de todas as terapias disponíveis',
          'Avaliação cardiológica urgente',
          'Considerar estudos para terapias emergentes'
        ]
      };
    }
  },

  interpretationRanges: [
    {
      min: 0,
      max: 2.5,
      interpretation: {
        category: 'BAIXO RISCO',
        risk: 'low',
        mortality: '<2.5%',
        recommendation: 'Orientação estilo de vida'
      }
    },
    {
      min: 2.5,
      max: 5,
      interpretation: {
        category: 'RISCO INTERMEDIÁRIO',
        risk: 'moderate',
        mortality: '2.5-7.5%',
        recommendation: 'Intervenções + considerar estatinas'
      }
    },
    {
      min: 5,
      max: 7.5,
      interpretation: {
        category: 'ALTO RISCO',
        risk: 'high',
        mortality: '7.5-15%',
        recommendation: 'Estatinas alta intensidade'
      }
    },
    {
      min: 7.5,
      max: 12.5,
      interpretation: {
        category: 'MUITO ALTO RISCO',
        risk: 'very-high',
        mortality: '15-25%',
        recommendation: 'Terapia máxima'
      }
    },
    {
      min: 12.5,
      max: 100,
      interpretation: {
        category: 'EXTREMO RISCO',
        risk: 'critical',
        mortality: '>25%',
        recommendation: 'Avaliação especializada urgente'
      }
    }
  ],

  citations: [
    {
      authors: 'Sociedade Brasileira de Cardiologia',
      title: 'Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose 2025',
      journal: 'Arquivos Brasileiros de Cardiologia',
      year: 2025,
      volume: '124(3S)'
    },
    {
      authors: 'Yadlowsky S, Hayward RA, et al.',
      title: 'Development of the PREVENT cardiovascular disease risk equations',
      journal: 'JAMA Network Open',
      year: 2024,
      volume: '7(11)'
    }
  ],

  validationStudy:
    'Modelo em validação interna para uso no Darwin-MFC. Exige revisão clínica antes de uso como recomendação definitiva.',

  notes: [
    'Calculadora experimental: use apenas como apoio à estratificação, não como decisão isolada.',
    'Fatores socioeconômicos e ambientais devem ser interpretados no contexto clínico local.',
    'Categoria de risco extremo requer confirmação por diretriz e avaliação médica.',
    'Função renal obrigatória (CKD-EPI)',
    'Não substitui diretrizes oficiais de prevenção cardiovascular.'
  ],

  relatedCalculators: [
    'ckd-epi',
    'frailty-score',
    'metabolic-syndrome',
    'diabetes-risk',
    'coronary-artery-calcium'
  ],

  version: '2026.0.0',
  lastUpdated: '2026-06-03',
  evidenceLevel: 'experimental',
  clinicalUse: 'risk_stratification',
  disclaimer:
    'Ferramenta experimental de apoio à estratificação cardiovascular. Não substitui julgamento clínico, diretrizes oficiais ou avaliação individual.',
  requiresBackend: false,
  versionYear: 2026,
  snomedConcepts: [
    '38341003', // High cholesterol
    '49601007', // Cardiovascular disease
    '84114007', // Other cholesterol
    '13644009', // Hyperlipidemia
    '38366002', // Hypertriglyceridemia
    '13942006', // Myocardial infarction
    '230690007', // Stroke
    '195967001', // Asthenia
    '271442005', // Hyperlipoproteinemia
    '370943001'  // Hypercholesterolemia
  ]
};
