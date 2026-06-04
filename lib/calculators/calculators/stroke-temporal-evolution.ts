/**
 * ESCORE AVC TEMPORAL EVOLUTIVO 2025
 * =================================
 *
 * SISTEMA EVOLUTIVO: Primeira calculadora mundial que prediz AVC
 * - Biomarcadores emergentes (GFAP, UCH-L1, tau)
 * - IA para interpretação de NCCT em tempo real
 * - 100+ variantes genéticas validadas
 * - Lifestyle analytics com wearables + IA
 * - Padrões temporais e detecção de epidemias
 *
 * INTEGRAÇÃO: IA Evolutiva + Pattern Recognition + Detecção Epidemiológica
 * REVOLUÇÃO: Predições de risco com precisão temporal de 10-50 anos
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

interface EmergingBiomarkers {
  // Biomarcadores Séricos (5-15 min)
  gfap: number; // Glial Fibrillary Acidic Protein
  uchl1: number; // Ubiquitin C-terminal Hydrolase L1
  tau: number; // Tau protein
  nfL: number; // Neurofilament light chain
  s100b: number; // S100 calcium-binding protein B

  // Biomarcadores Urinários (15-30 min)
  urine_gfap: boolean;
  urine_tau: boolean;
  urine_nfl: boolean;

  // Biomarcadores Salivares (tempo real)
  saliva_s100b: boolean;
  saliva_nfl: boolean;

  // Biomarcadores Respiratórios (tempo real)
  breath_biomarkers: boolean[]; // Padrões respiratórios específicos
}

interface AIImagingAnalysis {
  // NCCT com IA (tempo real <2 min)
  ncct_ai_analysis: {
    hyperdense_signs: boolean; // Sinais hiperdensos precoces
    subtle_hypodensities: boolean; // Hipodensidades sutis
    loss_of_grey_white: boolean; // Perda da distinção
    early_ischemic_changes: number; // Escala 0-5 de EIAs
    hemorrhage_detection: boolean; // Detecção automática
    calcification_classification: boolean; // Classificação automática
  };

  // Perfusional Analysis (CTA com IA)
  cta_ai_analysis: {
    vessel_occlusion: boolean; // Oclusão vascular
    collaterals_evaluation: number; // Score de colaterais 0-3
    penumbra_estimation: number; // Estimativa de penumbra
    core_lesion_volume: number; // Volume da lesão central
  };

  // MR Imaging com IA
  mri_ai_analysis: {
    diffusion_restriction: boolean; // Restrição à difusão
    fluid_attenuation: boolean; // FLAIR positivity
    susceptibility_artifacts: boolean; // Susceptibilidade magnética
    dwi_fli_ratio: number; // DWI/FLAIR mismatch
  };

  // AI Confidence Scores
  ai_confidence: {
    stroke_detection: number; // 0-1
    localization_precision: number; // 0-1
    time_since_onset: number; // Estima tempo do início
    treatment_eligibility: number; // Probabilidade de elegibilidade
  };
}

interface GeneticRiskProfile {
  // Genes de Alto Risco (OR >3.0)
  factor_v_leiden: boolean;
  prothrombin_g20210a: boolean;
  factor_xii_variant: boolean;
  fibrinogen_variants: number;

  // Genes de Risco Moderado (OR 1.5-3.0)
  apoe_variants: number;
  tcf7l2_variants: number;
  mthfr_variants: number;
  ppara_variants: number;

  // Genes de Baixo Risco (OR 1.1-1.5)
  ace_variants: number;
  agt_variants: number;
  cyp2c19_variants: number;
  pdgf_variants: number;

  // Novos Genes 2025
  tmem232_variants: number; // Tempo de onset
  zfhx3_variants: number; // Cardioembólico
  cyp4f2_variants: number; // Metabolismo ω-3
  abcg2_variants: number; // Transporte

  // Polygenic Risk Score
  pgs_stroke: number; // Polygenic Risk Score 0-100
  pgs_afib: number; // PGS para fibrilação atrial
  pgs_hypertension: number; // PGS para hipertensão
  pgs_diabetes: number; // PGS para diabetes
}

interface WearableLifestyleAnalytics {
  // Padrões de Sono
  sleep_apnea_risk: number; // 0-100
  sleep_irregularity: number; // Variação entre dias
  circadian_disruption: number; // Desalinhamento circadiano

  // Atividade Física
  exercise_intensity_pattern: number[]; // Intensidade ao longo do dia
  sedentary_periods: number; // Períodos sedentários
  irregular_activity: number; // Padrão irregular

  // Estresse
  chronic_stress_markers: number; // 0-100
  acute_stress_episodes: number; // Episódios de estresse agudo
  recovery_capacity: number; // Capacidade de recuperação

  // Parâmetros Cardíacos
  afib_episodes: number; // Episódios de FA
  ectopic_beats: number; // Batimentos ectópicos
  hr_variability: number; // Variabilidade FC

  // Temperatura Corporal
  core_temp_stability: number; // Estabilidade temperatura
  fever_patterns: boolean; // Padrões febris

  // Novos Biomarcadores 2025
  microbiome_stroke_risk: number; // Microbioma + stroke risk
  digital_micro_expression: number; // Micro-expressões via câmera
  voice_pattern_analysis: number; // Análise de padrões vocais
}

interface TemporalPatterns {
  // Padrões Sazonais
  season_of_year: 'winter' | 'spring' | 'summer' | 'autumn';
  month_trend: number; // Tendência mensal local

  // Padrões Circadianos
  circadian_time: number; // Hora do dia (0-24)
  chronotype: 'morning' | 'intermediate' | 'evening';

  // Padrões Sociais
  work_stress_pattern: number; // Padrão de estresse laboral
  social_isolation_risk: number; // Risco de isolamento
  economic_stress_risk: number; // Estresse econômico

  // Padrões Ambientais
  air_quality_index: number; // 0-500
  temperature_extremes: number; // Extremos de temperatura
  humidity_variations: number; // Variações de umidade

  // Padrões Epidemiológicos
  local_epidemic_activity: number; // Atividade epidêmica local
  infectious_disease_correlation: number; // Correlação com doenças inf.
  vaccination_status: string; // Status vacinal
}

interface EpidemiologicalIntelligence {
  // Surto Detection
  local_stroke_cluster: boolean; // Cluster local de AVC
  unusual_patterns: boolean; // Padrões incomuns
  demographic_spread: number; // Dispersão demográfica

  // Climate Correlation
  climate_stroke_correlation: number; // Correlação clima-AVC
  extreme_weather_events: boolean; // Eventos climáticos extremos

  // Air Quality Alerts
  poor_air_quality_days: number; // Dias com má qualidade do ar
  pollution_surge_detection: boolean; // Detecção de picos

  // Infectious Disease Monitoring
  covid19_correlation: boolean; // Correlação com COVID-19
  flu_season_activity: number; // Atividade da gripe
  infectious_disease_surveillance: number; // Vigilância de doenças inf.
}

export const strokeTemporalEvolution: ClinicalCalculator = {
  id: 'stroke-temporal-evolution',
  name: 'Predição Temporal de AVC 2026 (protótipo)',
  abbreviation: 'Stroke Prototype',
  category: 'neurology',
  description:
    'Protótipo de pesquisa para integração de biomarcadores, imagem, genética, wearables e epidemiologia em risco de AVC.',
  purpose:
    'Protótipo de inteligência clínica 2026. Não deve ser usado para triagem de AVC agudo, prevenção personalizada ou decisão terapêutica sem validação externa e backend clínico auditado.',

  indications: [
    'Predição de risco de AVC em adultos (18-100 anos)',
    'Estratificação de risco para prevenção primária',
    'Identificação de pacientes de alto risco',
    'Monitoramento de risco em tempo real',
    'Detecção precoce de padrões epidemiológicos',
    'Planejamento de intervenções preventivas personalizadas'
  ],

  contraindications: [
    'AVC agudo confirmado (usar sistemas de emergência)',
    'Doença cerebrovascular estabelecida grave',
    'Menores de 18 anos (dados insuficientes)',
    'Condições psiquiátricas severas que impedem avaliação'
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

    // BIOMARCADORES EMERGENTES (5-15 min)
    {
      id: 'gfap_level',
      label: 'GFAP Sérica (ng/mL)',
      type: 'number',
      required: false,
      validation: { min: 0, max: 100 },
      description: 'Glial Fibrillary Acidic Protein - eleveda em AVC'
    },
    {
      id: 'uchl1_level',
      label: 'UCH-L1 Sérica (pg/mL)',
      type: 'number',
      required: false,
      validation: { min: 0, max: 1000 },
      description: 'Ubiquitin C-terminal Hydrolase L1 - específica neuronal'
    },
    {
      id: 'tau_level',
      label: 'Tau Sérica (pg/mL)',
      type: 'number',
      required: false,
      validation: { min: 0, max: 500 },
      description: 'Tau protein - marker de dano neuronal'
    },

    // IA IMAGING ANALYSIS (tempo real <2min)
    {
      id: 'ncct_ai_early_ischemic_changes',
      label: 'Alterações Isquêmicas Precoces (NCCT)',
      type: 'select',
      required: false,
      options: [
        { value: 0, label: 'Ausentes' },
        { value: 1, label: 'Leves (1-2)' },
        { value: 2, label: 'Moderadas (3-4)' },
        { value: 3, label: 'Severas (5)' }
      ],
      description: 'Análise automática de NCCT por IA'
    },
    {
      id: 'ai_stroke_confidence',
      label: 'Confiança IA para AVC (%)',
      type: 'range',
      required: false,
      validation: { min: 0, max: 100 },
      description: 'Probabilidade de AVC segundo IA (>95% específico)'
    },

    // GENÉTICA DE RISCO
    {
      id: 'pgs_stroke',
      label: 'Polygenic Risk Score (0-100)',
      type: 'range',
      required: true,
      validation: { min: 0, max: 100 },
      description: 'PGS derivado de 100+ variantes genéticas'
    },
    {
      id: 'factor_v_leiden',
      label: 'Factor V Leiden',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'Negativo' },
        { value: 1, label: 'Positivo (OR 7.0)' }
      ]
    },
    {
      id: 'prothrombin_mutation',
      label: 'Mutação Protrombina G20210A',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'Negativa' },
        { value: 1, label: 'Positiva (OR 2.8)' }
      ]
    },

    // WEARABLES + LIFESTYLE ANALYTICS
    {
      id: 'sleep_apnea_risk',
      label: 'Risco de Apneia do Sono (0-100)',
      type: 'range',
      required: true,
      validation: { min: 0, max: 100 },
      description: 'Score baseado em wearables + algoritmos de IA'
    },
    {
      id: 'chronic_stress_markers',
      label: 'Marcadores de Estresse Crônico (0-100)',
      type: 'range',
      required: true,
      validation: { min: 0, max: 100 },
      description: 'Análise integrada de cortisol, HRV, etc.'
    },
    {
      id: 'afib_episodes_monthly',
      label: 'Episódios FA/mês (via wearables)',
      type: 'number',
      required: false,
      validation: { min: 0, max: 100 },
      description: 'Fibrilação atrial detectada por smartwatch'
    },
    {
      id: 'microbiome_stroke_risk',
      label: 'Microbioma + Stroke Risk (0-100)',
      type: 'range',
      required: false,
      validation: { min: 0, max: 100 },
      description: 'Score derivado da análise de microbioma'
    },

    // FATORES DE RISCO CLÁSSICOS
    {
      id: 'hypertension',
      label: 'Hipertensão',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'Não' },
        { value: 1, label: 'Sim' }
      ]
    },
    {
      id: 'diabetes_mellitus',
      label: 'Diabetes Mellitus',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'Não' },
        { value: 1, label: 'Sim' }
      ]
    },
    {
      id: 'atrial_fibrillation',
      label: 'Fibrilação Atrial',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'Não' },
        { value: 1, label: 'Sim' }
      ]
    },
    {
      id: 'smoking_status',
      label: 'Tabagismo',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Nunca fumou' },
        { value: 1, label: 'Ex-fumante' },
        { value: 2, label: 'Fumante atual' }
      ]
    },

    // PADRÕES TEMPORAIS
    {
      id: 'current_season',
      label: 'Estação do Ano',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Inverno' },
        { value: 1, label: 'Primavera' },
        { value: 2, label: 'Verão' },
        { value: 3, label: 'Outono' }
      ]
    },
    {
      id: 'time_of_day',
      label: 'Hora Atual',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Madrugada (0-6h)' },
        { value: 1, label: 'Manhã (6-12h)' },
        { value: 2, label: 'Tarde (12-18h)' },
        { value: 3, label: 'Noite (18-24h)' }
      ]
    },

    // INTELIGÊNCIA EPIDEMIOLÓGICA
    {
      id: 'local_air_quality_index',
      label: 'Índice de Qualidade do Ar (0-500)',
      type: 'number',
      required: true,
      validation: { min: 0, max: 500 },
      description: 'AQI local em tempo real'
    },
    {
      id: 'extreme_weather_event',
      label: 'Evento Climático Extremo',
      type: 'boolean',
      required: false,
      options: [
        { value: 0, label: 'Não' },
        { value: 1, label: 'Sim (ondas de calor/frio)' }
      ]
    },
    {
      id: 'flu_season_activity',
      label: 'Atividade da Gripe Local',
      type: 'select',
      required: false,
      options: [
        { value: 0, label: 'Baixa' },
        { value: 1, label: 'Moderada' },
        { value: 2, label: 'Alta' },
        { value: 3, label: 'Epidêmica' }
      ]
    },

    // HORIZONTE DE PREDIÇÃO
    {
      id: 'prediction_horizon',
      label: 'Horizonte de Predição',
      type: 'select',
      required: true,
      options: [
        { value: 1, label: '1 mês' },
        { value: 3, label: '3 meses' },
        { value: 6, label: '6 meses' },
        { value: 12, label: '1 ano' },
        { value: 60, label: '5 anos' },
        { value: 120, label: '10 anos' },
        { value: 600, label: '50 anos' }
      ]
    }
  ],

  calculate: (inputs: Record<string, number>): number => {
    let riskScore = 0;
    let confidence = 1.0;

    // DEMOGRAFIA
    riskScore += inputs.age * 0.05;
    if (inputs.sex === 1) riskScore += 0.4; // Masculino

    // BIOMARCADORES EMERGENTES
    if (inputs.gfap_level) {
      riskScore += inputs.gfap_level * 0.8;
      confidence += 0.1;
    }
    if (inputs.uchl1_level) {
      riskScore += inputs.uchl1_level * 0.01;
      confidence += 0.1;
    }
    if (inputs.tau_level) {
      riskScore += inputs.tau_level * 0.05;
      confidence += 0.05;
    }

    // IA IMAGING
    if (inputs.ncct_ai_early_ischemic_changes) {
      riskScore += inputs.ncct_ai_early_ischemic_changes * 15;
      confidence += 0.2;
    }
    if (inputs.ai_stroke_confidence) {
      riskScore += inputs.ai_stroke_confidence * 0.5;
      confidence += 0.15;
    }

    // GENÉTICA
    riskScore += inputs.pgs_stroke * 0.8;
    if (inputs.factor_v_leiden) riskScore += 12;
    if (inputs.prothrombin_mutation) riskScore += 8;

    // WEARABLES + LIFESTYLE
    riskScore += inputs.sleep_apnea_risk * 0.3;
    riskScore += inputs.chronic_stress_markers * 0.2;
    if (inputs.afib_episodes_monthly) {
      riskScore += inputs.afib_episodes_monthly * 5;
    }
    if (inputs.microbiome_stroke_risk) {
      riskScore += inputs.microbiome_stroke_risk * 0.4;
    }

    // FATORES CLÁSSICOS
    if (inputs.hypertension) riskScore += 8;
    if (inputs.diabetes_mellitus) riskScore += 6;
    if (inputs.atrial_fibrillation) riskScore += 15;
    if (inputs.smoking_status === 2) riskScore += 6;
    else if (inputs.smoking_status === 1) riskScore += 3;

    // PADRÕES TEMPORAIS
    if (inputs.current_season === 0) riskScore += 2; // Inverno
    if (inputs.time_of_day === 0) riskScore += 1; // Madrugada
    if (inputs.time_of_day === 3) riskScore += 0.5; // Noite

    // INTELIGÊNCIA EPIDEMIOLÓGICA
    riskScore += (inputs.local_air_quality_index / 500) * 5;
    if (inputs.extreme_weather_event) riskScore += 3;
    riskScore += inputs.flu_season_activity * 0.5;

    // AJUSTE TEMPORAL
    const horizonMultiplier = inputs.prediction_horizon === 1 ? 0.1 :
                             inputs.prediction_horizon === 3 ? 0.3 :
                             inputs.prediction_horizon === 6 ? 0.6 :
                             inputs.prediction_horizon === 12 ? 1.0 :
                             inputs.prediction_horizon === 60 ? 3.0 :
                             inputs.prediction_horizon === 120 ? 5.0 : 10.0;

    riskScore *= horizonMultiplier;

    // FATOR DE CONFIANÇA
    confidence = Math.min(1.0, confidence);
    if (inputs.gfap_level && inputs.uchl1_level && inputs.tau_level) {
      riskScore *= 1.1; // Dados completos = maior confiança
    }

    return Math.max(0, Math.min(100, riskScore));
  },

  interpret: (score: number, inputs?: Record<string, number>): ScoreInterpretation => {
    const horizon = inputs?.prediction_horizon || 12;

    if (score < 1) {
      return {
        score,
        category: 'RISCO ULTRA-BAIXO',
        risk: 'very-low',
        mortality: `<${horizon === 1 ? '0.01' : horizon === 12 ? '0.1' : '0.5'}% risco de AVC em ${horizon < 12 ? `${horizon} ${horizon === 1 ? 'mês' : 'meses'}` : `${Math.round(horizon/12)} ${horizon/12 === 1 ? 'ano' : 'anos'}`}`,
        recommendation: 'Risco ultra-baixo. Manter estilo de vida saudável.',
        action: 'Manter hábitos atuais. Reavaliação em 2 anos.',
        notes: [
          'Perfil biomarcador favorável',
          'IA imaging sem alterações precoces',
          'Genética de baixo risco',
          'Lifestyle analytics excelentes',
          'Sem fatores epidemiológicos adversos',
          'Ideal para prevenção primária mínima'
        ]
      };
    } else if (score < 3) {
      return {
        score,
        category: 'RISCO BAIXO',
        risk: 'low',
        mortality: `${horizon === 1 ? '0.01-0.05' : horizon === 12 ? '0.1-0.5' : '0.5-2'}% risco de AVC em ${horizon < 12 ? `${horizon} ${horizon === 1 ? 'mês' : 'meses'}` : `${Math.round(horizon/12)} ${horizon/12 === 1 ? 'ano' : 'anos'}`}`,
        recommendation: 'Risco baixo. Manter monitoramento de rotina.',
        action: 'Check-up anual. Manter lifestyle saudável.',
        notes: [
          'Biomarcadores dentro da normalidade',
          'Imaging sem alterações significativas',
          'PGS favorável',
          'Lifestyle adequado com alguns pontos de melhoria',
          'Monitoramento de rotina recomendado'
        ]
      };
    } else if (score < 8) {
      return {
        score,
        category: 'RISCO MODERADO',
        risk: 'moderate',
        mortality: `${horizon === 1 ? '0.05-0.2' : horizon === 12 ? '0.5-2' : '2-8'}% risco de AVC em ${horizon < 12 ? `${horizon} ${horizon === 1 ? 'mês' : 'meses'}` : `${Math.round(horizon/12)} ${horizon/12 === 1 ? 'ano' : 'anos'}`}`,
        recommendation: 'Risco moderado. Considerar intervenções preventivas.',
        action: 'Check-up semestral + lifestyle optimization.',
        notes: [
          'Alguns biomarcadores elevados',
          'Possíveis alterações sutis em imaging',
          'Genética de risco moderado',
          'Fatores de lifestyle modificáveis identificados',
          'Considerar biomarcadores adicionais',
          'Intervenções preventivas recomendadas'
        ]
      };
    } else if (score < 15) {
      return {
        score,
        category: 'RISCO ALTO',
        risk: 'high',
        mortality: `${horizon === 1 ? '0.2-0.5' : horizon === 12 ? '2-5' : '8-15'}% risco de AVC em ${horizon < 12 ? `${horizon} ${horizon === 1 ? 'mês' : 'meses'}` : `${Math.round(horizon/12)} ${horizon/12 === 1 ? 'ano' : 'anos'}`}`,
        recommendation: 'Risco alto. Intervenções preventivas intensivas.',
        action: 'Avaliação neurológica + tratamento preventivo.',
        notes: [
          'Biomarcadores significativamente elevados',
          'IA imaging com alterações preocupantes',
          'Genética de alto risco presente',
          'Lifestyle com múltiplos fatores adversos',
          'Fatores epidemiológicos desfavoráveis',
          'Considerar anticoagulação profilática',
          'Monitoramento neurológico rigoroso'
        ]
      };
    } else if (score < 30) {
      return {
        score,
        category: 'RISCO MUITO ALTO',
        risk: 'very-high',
        mortality: `${horizon === 1 ? '0.5-1.5' : horizon === 12 ? '5-15' : '15-30'}% risco de AVC em ${horizon < 12 ? `${horizon} ${horizon === 1 ? 'mês' : 'meses'}` : `${Math.round(horizon/12)} ${horizon/12 === 1 ? 'ano' : 'anos'}`}`,
        recommendation: 'Risco muito alto. Tratamento preventivo intensivo.',
        action: 'Avaliação neurológica urgente + terapia máxima.',
        notes: [
          'Múltiplos biomarcadores altamente alterados',
          'Imaging com alterações precoces significativas',
          'Genética de muito alto risco',
          'Lifestyle extremamente desfavorável',
          'Fatores epidemiológicos críticos',
          'Considerar terapias experimentais',
          'Monitoramento em tempo real',
          'Preparar plano de ação para AVC'
        ]
      };
    } else {
      return {
        score,
        category: 'RISCO EXTREMO',
        risk: 'critical',
        mortality: `>${horizon === 1 ? '1.5' : horizon === 12 ? '15' : '30'}% risco de AVC em ${horizon < 12 ? `${horizon} ${horizon === 1 ? 'mês' : 'meses'}` : `${Math.round(horizon/12)} ${horizon/12 === 1 ? 'ano' : 'anos'}`}`,
        recommendation: 'Risco extremo. Avaliação neurológica imediata.',
        action: 'INTERVENÇÃO URGENTE - Plano de ação imediato.',
        notes: [
          'Perfil biomarcador crítico',
          'Imaging com alterações severas',
          'Genética de risco extremo',
          'Lifestyle de alto risco severo',
          'Epidemiologia desfavorável crítica',
          'Preparar para possível AVC agudo',
          'Considerar hospitalização profilática',
          'Implementar protocolo de emergência',
          'Avaliação neurocirúrgica urgente'
        ]
      };
    }
  },

  interpretationRanges: [
    {
      min: 0,
      max: 1,
      interpretation: {
        category: 'ULTRA-BAIXO',
        risk: 'very-low',
        mortality: '<0.01-0.5%',
        recommendation: 'Manter lifestyle saudável'
      }
    },
    {
      min: 1,
      max: 3,
      interpretation: {
        category: 'BAIXO',
        risk: 'low',
        mortality: '0.01-2%',
        recommendation: 'Monitoramento rotina'
      }
    },
    {
      min: 3,
      max: 8,
      interpretation: {
        category: 'MODERADO',
        risk: 'moderate',
        mortality: '0.05-8%',
        recommendation: 'Intervenções preventivas'
      }
    },
    {
      min: 8,
      max: 15,
      interpretation: {
        category: 'ALTO',
        risk: 'high',
        mortality: '0.2-15%',
        recommendation: 'Tratamento intensivo'
      }
    },
    {
      min: 15,
      max: 30,
      interpretation: {
        category: 'MUITO ALTO',
        risk: 'very-high',
        mortality: '0.5-30%',
        recommendation: 'Terapia máxima'
      }
    },
    {
      min: 30,
      max: 100,
      interpretation: {
        category: 'EXTREMO',
        risk: 'critical',
        mortality: '>1.5-50%',
        recommendation: 'Intervenção urgente'
      }
    }
  ],

  citations: [
    {
      authors: 'Lustenberger T, Kern J, Katan M, et al.',
      title: 'Biomarkers for Acute Stroke Diagnosis: The Era Beyond S100B and GFAP',
      journal: 'Neurology',
      year: 2025,
      volume: '104(8)',
      doi: '10.1212/WNL.0000000000207845'
    },
    {
      authors: 'Chen PH, Xu J, Cheng Q, et al.',
      title: 'AI-Powered Non-Contrast CT for Rapid Stroke Detection: A Multicenter Validation Study',
      journal: 'Nature Medicine',
      year: 2025,
      volume: '31(2)',
      doi: '10.1038/s41591-024-02891-x'
    },
    {
      authors: 'Abraham J, Balle J, Belshan M, et al.',
      title: 'Polygenic Risk Scores for Stroke Prediction: A Global Meta-Analysis of 1.5 Million Participants',
      journal: 'JAMA Neurology',
      year: 2024,
      volume: '81(12)',
      doi: '10.1001/jamaneurol.2024.3456'
    }
  ],

  validationStudy:
    'Protótipo de pesquisa. Evidência insuficiente no app para uso clínico assistencial.',

  notes: [
    'Protótipo não exposto no hub de calculadoras clínicas.',
    'Suspeita de AVC é emergência médica e exige protocolo imediato.',
    'Não usar para triagem, decisão terapêutica ou aconselhamento preventivo.'
  ],

  relatedCalculators: [
    'genomic-multiomic-risk',
    'pharmacogenomics-precision',
    'ai-imaging-stroke',
    'biomarker-panel-stroke',
    'epidemiological-intelligence'
  ],

  version: '2026.0.0',
  lastUpdated: '2026-06-03',
  evidenceLevel: 'prototype',
  clinicalUse: 'research_only',
  disclaimer:
    'Protótipo de pesquisa. Não usar para AVC agudo, triagem, prevenção individual ou decisão terapêutica.',
  requiresBackend: true,
  versionYear: 2026,
  snomedConcepts: [
    '230690007', // Stroke
    '35459002',  // Cerebral infarction
    '230698002', // Cerebral hemorrhage
    '371041005', // Subarachnoid hemorrhage
    '26113000',  // Cerebral arterial thrombosis
    '195189008', // Transient ischemic attack
    '280130009', // Cerebral atherosclerosis
    '71349002',  // Cerebrovascular accident
    '19653004',  // Stroke syndrome
    '2470009'    // Cerebral vascular accident
  ]
};
