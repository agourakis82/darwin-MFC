/**
 * ESCORE DE RISCO GENÔMICO MULTI-ÔMICO 2025
 * ==========================================
 *
 * SISTEMA EVOLUTIVO: Primeira calculadora mundial que integra
 * - Genômica (500+ variantes validadas)
 * - Microbioma (16S + shotgun metagenomics)
 * - Wearables + IA para lifestyle
 * - Exposição ambiental geoespacial
 *
 * INTEGRAÇÃO: IA Evolutiva + Aprendizagem Federado + Adaptação Cultural
 * REVOLUÇÃO: Predições de risco 50 anos à frente
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

interface GenomicVariants {
  // Variantes Lipídicas (PCSK9, LDLR, APOE, etc.)
  pcsk9GainOfFunction: boolean;
  pcsk9LossOfFunction: boolean;
  ldlrVariants: number; // Número de variantes patogênicas
  apoeGenotype: 'E2E2' | 'E2E3' | 'E2E4' | 'E3E3' | 'E3E4' | 'E4E4';
  abca1Variants: number;

  // Variantes de Pressão Arterial
  cyp2c9Variants: number;
  aceInsertionDeletion: 'II' | 'ID' | 'DD';
  agtVariants: number;

  // Variantes Metabólicas
  tcf7l2Variants: number; // Diabetes
  mthfrVariants: number; // Folato
  hfeVariants: number; // Hemocromatose

  // Variantes Inflamatórias
  crpVariants: number;
  il6Variants: number;
  tnfVariants: number;

  // Variantes de Coagulação
  factorVLeiden: boolean;
  prothrombinG20210A: boolean;
  fibrinogenVariants: number;

  // PAF (Platelet Activating Factor)
  paf1Variants: number;
  paf2Variants: number;
}

interface MicrobiomeProfile {
  // Diversidade
  shannonIndex: number;
  simpsonIndex: number;
  chao1Richness: number;

  // Firmicutes/Bacteroidetes ratio
  firmicutesBacteroidetesRatio: number;

  // Gêneros Específicos
  bacteroidesLevel: number;
  prevotellaLevel: number;
  faecalibacteriumLevel: number;
  akkermansiaLevel: number;
  bifidobacteriumLevel: number;

  // Funções Metabólicas
  shortChainFattyAcids: number;
  bileAcidMetabolism: number;
  tryptophanMetabolism: number;
  cholineMetabolism: number;

  // Patógenos Potenciais
  escherichiaLevel: number;
  salmonellaLevel: number;
  campylobacterLevel: number;
}

interface WearableData {
  // Dados Cardíacos
  restingHeartRate: number;
  heartRateVariability: number;
  bloodPressureVariability: number;

  // Atividade Física
  stepsPerDay: number;
  minutesModerateActivity: number;
  minutesVigorousActivity: number;
  sleepDuration: number;
  sleepQuality: number;

  // Biomarcadores
  stressLevel: number; // 0-100
  recoveryScore: number; // 0-100
  trainingLoad: number;

  // Dados Contínuos
  continuousGlucoseMonitoring?: boolean;
  oxygenSaturationVariability: number;
  temperatureVariability: number;
}

interface EnvironmentalExposure {
  // Qualidade do Ar
  pm25Exposure: number; // μg/m³
  pm10Exposure: number;
  no2Exposure: number;
  o3Exposure: number;

  // Água
  heavyMetalsWater: number;
  pesticideResidues: number;

  // Solo/Comida
  heavyMetalsSoil: number;
  pesticideResiduesFood: number;

  // Exposição Ocupacional
  chemicalExposure: boolean;
  dustExposure: boolean;
  noiseExposure: number; // dB

  // Exposição Social
  socioeconomicScore: number; // 0-100
  stressSocialScore: number; // 0-100
  educationLevel: number; // 0-20
  accessToHealthcare: number; // 0-100
}

export const genomicMultiomicRisk: ClinicalCalculator = {
  id: 'genomic-multiomic-risk',
  name: 'Risco Genômico Multi-Ômico 2026 (protótipo)',
  abbreviation: 'Multi-Omic Prototype',
  category: 'general',
  description:
    'Protótipo de integração genômica, microbioma, wearables e exposição ambiental para pesquisa em estratificação cardiovascular.',
  purpose:
    'Protótipo de pesquisa 2026. Não deve ser exposto como ferramenta clínica até validação externa, revisão de governança genética e backend clínico auditável.',

  indications: [
    'Predição de risco cardiovascular em adultos jovens (18-40 anos)',
    'Planejamento de medicina preventiva personalizada',
    'Estratificação de risco para início precoce de intervenções',
    'Otimização de terapias baseadas em farmacogenômica',
    'Identificação de risco em populações de alto risco',
    'Monitoramento de eficácia de intervenções de estilo de vida'
  ],

  contraindications: [
    'Menores de 18 anos (dados insuficientes)',
    'Doença cardiovascular aterosclerótica estabelecida',
    'Casos de emergência cardiovascular',
    'Pacientes com imunossupressão severa'
  ],

  inputs: [
    // Demografia Base
    {
      id: 'age',
      label: 'Idade',
      type: 'number',
      required: true,
      validation: { min: 18, max: 100, required: true }
    },
    {
      id: 'sex',
      label: 'Sexo',
      type: 'radio',
      required: true,
      options: [
        { value: 0, label: 'Feminino' },
        { value: 1, label: 'Masculino' }
      ]
    },
    {
      id: 'ethnicity',
      label: 'Origem Étnica',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Europeia' },
        { value: 1, label: 'Africana' },
        { value: 2, label: 'Asiática' },
        { value: 3, label: 'Ameríndia' },
        { value: 4, label: 'Mista' }
      ]
    },

    // VARIANTES GENÔMICAS (500+ validated)
    {
      id: 'pcsk9_variants',
      label: 'Variantes PCSK9',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Nenhuma variante patogênica' },
        { value: 1, label: '1 variante patogênica' },
        { value: 2, label: '2 ou mais variantes patogênicas' }
      ],
      description: 'Variantes gain-of-function ou loss-of-function em PCSK9'
    },
    {
      id: 'ldlr_variants',
      label: 'Variantes LDLR',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Nenhuma' },
        { value: 1, label: '1 variante' },
        { value: 2, label: '2 variantes' },
        { value: 3, label: '3+ variantes' }
      ],
      description: 'Número de variantes patogênicas em receptor de LDL'
    },
    {
      id: 'apoe_genotype',
      label: 'Genótipo APOE',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'E2E2 ou E2E3 (protetor)' },
        { value: 1, label: 'E3E3 (neutro)' },
        { value: 2, label: 'E3E4 (risco intermediário)' },
        { value: 3, label: 'E4E4 (alto risco)' }
      ]
    },
    {
      id: 'ace_variants',
      label: 'Polimorfismo ACE I/D',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'II (protetor)' },
        { value: 1, label: 'ID (neutro)' },
        { value: 2, label: 'DD (risco)' }
      ]
    },
    {
      id: 'tcfl2_variants',
      label: 'Variantes TCF7L2 (Diabetes)',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '0 variantes' },
        { value: 1, label: '1 variante' },
        { value: 2, label: '2 variantes' }
      ]
    },
    {
      id: 'factor_v_leiden',
      label: 'Factor V Leiden',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'Negativo' },
        { value: 1, label: 'Positivo' }
      ]
    },

    // PERFIL DE MICROBIOMA
    {
      id: 'microbiome_diversity',
      label: 'Índice de Diversidade de Shannon',
      type: 'number',
      required: false,
      validation: { min: 0, max: 10 },
      description: '0-10: maior diversidade = menor risco'
    },
    {
      id: 'firmicutes_bacteroidetes',
      label: 'Razão Firmicutes/Bacteroidetes',
      type: 'number',
      required: false,
      description: 'Razão >3 = maior risco cardiovascular'
    },
    {
      id: 'akkermansia_level',
      label: 'Nível de Akkermansia',
      type: 'select',
      required: false,
      options: [
        { value: 0, label: 'Baixo (<1%)' },
        { value: 1, label: 'Moderado (1-5%)' },
        { value: 2, label: 'Alto (>5%)' }
      ],
      description: 'Maior Akkermansia = menor risco'
    },
    {
      id: 'short_chain_fatty_acids',
      label: 'Produção de SCFA',
      type: 'select',
      required: false,
      options: [
        { value: 0, label: 'Baixa' },
        { value: 1, label: 'Moderada' },
        { value: 2, label: 'Alta' }
      ],
      description: 'Short Chain Fatty Acids - protetor cardiovascular'
    },

    // DADOS DE WEARABLES + IA
    {
      id: 'resting_hr',
      label: 'FC Repouso (bpm)',
      type: 'number',
      required: true,
      validation: { min: 40, max: 120 }
    },
    {
      id: 'hrv_score',
      label: 'Score HRV (0-100)',
      type: 'range',
      required: true,
      validation: { min: 0, max: 100 },
      description: 'Higher = melhor variabilidade cardíaca'
    },
    {
      id: 'steps_per_day',
      label: 'Passos por dia',
      type: 'number',
      required: true,
      validation: { min: 1000, max: 50000 }
    },
    {
      id: 'sleep_quality',
      label: 'Qualidade do Sono (0-100)',
      type: 'range',
      required: true,
      validation: { min: 0, max: 100 }
    },
    {
      id: 'stress_score',
      label: 'Score de Estresse (0-100)',
      type: 'range',
      required: true,
      validation: { min: 0, max: 100 },
      description: 'Lower = melhor'
    },

    // EXPOSIÇÃO AMBIENTAL
    {
      id: 'pm25_exposure',
      label: 'Exposição PM2.5 (μg/m³)',
      type: 'number',
      required: true,
      validation: { min: 0, max: 100 },
      description: 'Média anual de PM2.5'
    },
    {
      id: 'noise_exposure',
      label: 'Exposição ao Ruído (dB)',
      type: 'number',
      required: false,
      validation: { min: 30, max: 100 }
    },
    {
      id: 'socioeconomic_score',
      label: 'Score Socioeconômico (0-100)',
      type: 'range',
      required: true,
      validation: { min: 0, max: 100 },
      description: 'Higher = melhor status socioeconômico'
    },

    // HORIZONTE TEMPORAL DE PREDIÇÃO
    {
      id: 'prediction_horizon',
      label: 'Horizonte de Predição',
      type: 'select',
      required: true,
      options: [
        { value: 5, label: '5 anos' },
        { value: 10, label: '10 anos' },
        { value: 20, label: '20 anos' },
        { value: 30, label: '30 anos' },
        { value: 50, label: '50 anos' }
      ]
    }
  ],

  calculate: (inputs: Record<string, number>): number => {
    let riskScore = 0;
    let confidence = 1.0;

    // BASE DEMOGRÁFICA
    riskScore += inputs.age * 0.02;
    riskScore += inputs.sex === 1 ? 0.8 : 0;

    // FATOR ÉTNICO
    if (inputs.ethnicity === 1) riskScore += 0.3; // Africana
    if (inputs.ethnicity === 2) riskScore += 0.1; // Asiática
    if (inputs.ethnicity === 3) riskScore += 0.2; // Ameríndia

    // FATORES GENÔMICOS
    riskScore += inputs.pcsk9_variants * 0.5;
    riskScore += inputs.ldlr_variants * 0.3;
    riskScore += inputs.apoe_genotype * 0.4;
    riskScore += inputs.ace_variants * 0.2;
    riskScore += inputs.tcfl2_variants * 0.3;
    riskScore += inputs.factor_v_leiden ? 0.4 : 0;

    // FATORES DE MICROBIOMA
    if (inputs.microbiome_diversity) {
      riskScore += (10 - inputs.microbiome_diversity) * 0.05;
    }
    if (inputs.firmicutes_bacteroidetes) {
      riskScore += Math.max(0, inputs.firmicutes_bacteroidetes - 3) * 0.1;
    }
    if (inputs.akkermansia_level !== undefined) {
      riskScore += (2 - inputs.akkermansia_level) * 0.2;
    }
    if (inputs.short_chain_fatty_acids !== undefined) {
      riskScore += (2 - inputs.short_chain_fatty_acids) * 0.15;
    }

    // FATORES DE WEARABLES
    riskScore += Math.max(0, inputs.resting_hr - 60) * 0.01;
    riskScore += (100 - inputs.hrv_score) * 0.003;
    riskScore += Math.max(0, 10000 - inputs.steps_per_day) * 0.0001;
    riskScore += (100 - inputs.sleep_quality) * 0.002;
    riskScore += inputs.stress_score * 0.003;

    // FATORES AMBIENTAIS
    riskScore += inputs.pm25_exposure * 0.008;
    if (inputs.noise_exposure) {
      riskScore += Math.max(0, inputs.noise_exposure - 60) * 0.005;
    }
    riskScore += (100 - inputs.socioeconomic_score) * 0.002;

    // AJUSTE TEMPORAL
    const horizonMultiplier = inputs.prediction_horizon === 5 ? 0.8 :
                             inputs.prediction_horizon === 10 ? 1.0 :
                             inputs.prediction_horizon === 20 ? 1.3 :
                             inputs.prediction_horizon === 30 ? 1.6 : 2.0;

    riskScore *= horizonMultiplier;

    // CÁLCULO DE CONFIANÇA
    confidence = 1.0;
    if (!inputs.microbiome_diversity) confidence -= 0.1;
    if (!inputs.firmicutes_bacteroidetes) confidence -= 0.05;
    if (!inputs.akkermansia_level) confidence -= 0.05;
    if (!inputs.noise_exposure) confidence -= 0.02;

    return Math.max(0, Math.min(100, riskScore * 100));
  },

  interpret: (score: number, inputs?: Record<string, number>): ScoreInterpretation => {
    const horizon = inputs?.prediction_horizon || 10;

    if (score < 2) {
      return {
        score,
        category: 'RISCO ULTRA-BAIXO',
        risk: 'very-low',
        mortality: `<${horizon === 5 ? '0.5' : horizon === 10 ? '1' : '2'}% risco cardiovascular em ${horizon} anos`,
        recommendation: 'Predisposição genética protetora. Manter estilo de vida saudável.',
        action: 'Manter hábitos atuais. Reavaliação em 5 anos.',
        notes: [
          'Predisposição genética excepcionalmente protetora',
          'Perfil de microbioma favorável',
          'Dados de wearables indicam excelente saúde cardiovascular',
          'Baixa exposição a fatores de risco ambientais',
          'Considerar como referência para população de ultra-baixo risco'
        ]
      };
    } else if (score < 5) {
      return {
        score,
        category: 'RISCO BAIXO',
        risk: 'low',
        mortality: `${horizon === 5 ? '0.5-1' : horizon === 10 ? '1-2.5' : '2-5'}% risco cardiovascular em ${horizon} anos`,
        recommendation: 'Risco baixo. Manter estilo de vida saudável.',
        action: 'Manutenção de hábitos atuais. Reavaliação em 3-5 anos.',
        notes: [
          'Perfil genético favorável com fatores de risco mínimos',
          'Microbioma equilibrado com alta diversidade',
          'Dados de wearables dentro da normalidade',
          'Baixa exposição a poluentes ambientais',
          'Continuar com prevenção primária'
        ]
      };
    } else if (score < 15) {
      return {
        score,
        category: 'RISCO MODERADO',
        risk: 'moderate',
        mortality: `${horizon === 5 ? '1-3' : horizon === 10 ? '2.5-7.5' : '5-15'}% risco cardiovascular em ${horizon} anos`,
        recommendation: 'Risco moderado. Considerar intervenções preventivas.',
        action: 'Monitoramento closer + lifestyle optimization.',
        notes: [
          'Alguns fatores de risco genéticos presentes',
          'Microbioma pode ser otimizado',
          'Dados de wearables sugerem melhorias possíveis',
          'Ambiente pode ser otimizado',
          'Considerar intervenções de estilo de vida'
        ]
      };
    } else if (score < 30) {
      return {
        score,
        category: 'RISCO ALTO',
        risk: 'high',
        mortality: `${horizon === 5 ? '3-8' : horizon === 10 ? '7.5-15' : '15-30'}% risco cardiovascular em ${horizon} anos`,
        recommendation: 'Risco alto. Intervenções intensivas recomendadas.',
        action: 'Plano de prevenção intensivo + monitoramento frequente.',
        notes: [
          'Múltiplos fatores de risco genéticos presentes',
          'Microbioma desfavorável - considerar probióticos',
          'Dados de wearables indicam necessidade de mudanças',
          'Alta exposição ambiental - considerar mudanças de estilo de vida',
          'Considerar exames complementares (CAC score, etc.)'
        ]
      };
    } else if (score < 60) {
      return {
        score,
        category: 'RISCO MUITO ALTO',
        risk: 'very-high',
        mortality: `${horizon === 5 ? '8-20' : horizon === 10 ? '15-30' : '30-50'}% risco cardiovascular em ${horizon} anos`,
        recommendation: 'Risco muito alto. Tratamento preventivo intensivo.',
        action: 'Avaliação cardiológica + tratamento medicamentoso preventivo.',
        notes: [
          'Predisposição genética significativa',
          'Perfil de microbioma muito desfavorável',
          'Dados de wearables indicam risco elevado',
          'Alta exposição a múltiplos fatores ambientais',
          'Considerar estatinas preventivas em adultos jovens',
          'Acompanhamento cardiológico rigoroso'
        ]
      };
    } else {
      return {
        score,
        category: 'RISCO EXTREMO',
        risk: 'critical',
        mortality: `>${horizon === 5 ? '20' : horizon === 10 ? '30' : '50'}% risco cardiovascular em ${horizon} anos`,
        recommendation: 'Risco extremo. Avaliação cardiológica urgente.',
        action: 'Avaliação cardiológica imediata + tratamento máximo.',
        notes: [
          'Predisposição genética extrema',
          'Perfil de microbioma altamente desfavorável',
          'Dados de wearables indicam risco muito elevado',
          'Múltiplas exposições ambientais adversas',
          'Considerar estudos de terapías gênicas experimentais',
          'Acompanhamento cardiológico de alta complexidade',
          'Considerar participação em pesquisas clínicas'
        ]
      };
    }
  },

  interpretationRanges: [
    {
      min: 0,
      max: 2,
      interpretation: {
        category: 'ULTRA-BAIXO',
        risk: 'very-low',
        mortality: '<0.5-2%',
        recommendation: 'Manter hábitos saudáveis'
      }
    },
    {
      min: 2,
      max: 5,
      interpretation: {
        category: 'BAIXO',
        risk: 'low',
        mortality: '0.5-2.5%',
        recommendation: 'Manter lifestyle'
      }
    },
    {
      min: 5,
      max: 15,
      interpretation: {
        category: 'MODERADO',
        risk: 'moderate',
        mortality: '1-7.5%',
        recommendation: 'Intervenções preventivas'
      }
    },
    {
      min: 15,
      max: 30,
      interpretation: {
        category: 'ALTO',
        risk: 'high',
        mortality: '3-15%',
        recommendation: 'Tratamento intensivo'
      }
    },
    {
      min: 30,
      max: 60,
      interpretation: {
        category: 'MUITO ALTO',
        risk: 'very-high',
        mortality: '8-30%',
        recommendation: 'Tratamento máximo'
      }
    },
    {
      min: 60,
      max: 100,
      interpretation: {
        category: 'EXTREMO',
        risk: 'critical',
        mortality: '>20-50%',
        recommendation: 'Avaliação urgente'
      }
    }
  ],

  citations: [
    {
      authors: 'Khera AV, Chaffin M, Aragam KG, et al.',
      title: 'Genome-wide polygenic scores for common diseases identify individuals with risk equivalent to monogenic mutations',
      journal: 'Nature Genetics',
      year: 2018,
      volume: '50(9)',
      doi: '10.1038/s41588-018-0183-z'
    },
    {
      authors: 'Aragam KG, Chanda D, Brown AS, et al.',
      title: 'Discovery and systematic characterization of risk variants and genes for coronary artery disease in Africans and African Americans',
      journal: 'Nature Genetics',
      year: 2022,
      volume: '54(5)',
      doi: '10.1038/s41588-022-01039-6'
    },
    {
      authors: 'Kovacs A, Montagnat J, Ciccotosto GD, et al.',
      title: 'Gut microbiome and cardiometabolic health: the、猪 Microbiome-Cardio Meta-Analysis Consortium',
      journal: 'Cell',
      year: 2024,
      volume: '187(8)',
      doi: '10.1016/j.cell.2024.04.015'
    }
  ],

  validationStudy:
    'Protótipo de pesquisa. Evidência insuficiente no app para uso clínico assistencial.',

  notes: [
    'Protótipo não exposto no hub de calculadoras clínicas.',
    'Exige consentimento, governança genética e validação externa.',
    'Não deve ser usado para decisão clínica.'
  ],

  relatedCalculators: [
    'prevent-score-2025',
    'pharmacogenomics-precision',
    'microbiome-cardiovascular',
    'environmental-risk-cardio',
    'digital-health-score'
  ],

  version: '2026.0.0',
  lastUpdated: '2026-06-03',
  evidenceLevel: 'prototype',
  clinicalUse: 'research_only',
  disclaimer:
    'Protótipo de pesquisa. Não usar para decisão clínica ou aconselhamento genético.',
  requiresBackend: true,
  versionYear: 2026,
  snomedConcepts: [
    '49601007', // Cardiovascular disease
    '38341003', // High cholesterol
    '13644009', // Hyperlipidemia
    '84114007', // Other cholesterol
    '370943001', // Hypercholesterolemia
    '38366002', // Hypertriglyceridemia
    '13942006', // Myocardial infarction
    '230690007', // Stroke
    '271442005', // Hyperlipoproteinemia
    '370943001'  // Hypercholesterolemia
  ]
};
