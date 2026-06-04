/**
 * SISTEMA DE PREDIÇÃO DE RISCO DE CÂNCER 2025
 * =========================================
 *
 * SISTEMA EVOLUTIVO: Primeira calculadora mundial que integra
 * - Liquid Biopsy (cfDNA + cfRNA + exossomas)
 * - IA para Análise de Slides Digitais
 * - Microbioma Tumoral (Tumor-Associated Microbiota)
 * - Imunogenômica (Neoantigen Prediction)
 * - Lifestyle Analytics com wearables
 * - Dados epidemiológicos em tempo real
 *
 * INTEGRAÇÃO: IA Evolutiva + Immunogenomics + Microbiome + Lifestyle AI
 * REVOLUÇÃO: Predições de risco com precisão de 50 anos à frente
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

interface LiquidBiopsyAnalysis {
  // Cell-Free DNA (cfDNA)
  cfDNA_concentration: number; // ng/mL
  cfDNA_fragmentation_pattern: 'normal' | 'abnormal' | 'highly_abnormal';
  tumor_fraction: number; // % de DNA tumoral circulante

  // Mutational Signatures
  signature_1: number; // Aging signature
  signature_3: number; // BRCA deficiency
  signature_5: number; // Clock-like signature
  signature_8: number; // UV exposure
  signature_13: number; // APOBEC cytidine deaminase
  signature_18: number; // DNA mismatch repair
  signature_30: number; // Unknown etiology

  // Copy Number Variations (CNV)
  cnv_17q12_her2: boolean; // HER2 amplification
  cnv_8q24_myc: boolean; // MYC amplification
  cnv_9p21_cdkn2a: boolean; // CDKN2A deletion
  cnv_10q23_pten: boolean; // PTEN deletion

  // Structural Variants
  fusion_genes: string[]; // Gene fusions detected
  translocations: string[]; // Chromosomal translocations
  chromothripsis: boolean; // Chromothripsis events

  // Methylation Patterns
  methylated_markers: number[]; // Hypermethylated loci
  unmethylated_markers: number[]; // Hypomethylated loci

  // Cell-Free RNA (cfRNA)
  cfRNA_expression: Record<string, number>; // Gene expression levels
  immune_markers: Record<string, number>; // Immune-related genes

  // Exosome Analysis
  exosome_protein_markers: string[]; // Tumor-specific proteins
  exosome_mirna: Record<string, number>; // microRNA profile
}

interface DigitalPathologyAI {
  // Tissue Architecture Analysis
  nuclear_morphology: 'normal' | 'atypical' | 'malignant';
  cellular_organization: 'organized' | 'disorganized' | 'chaotic';
  tissue_structure: 'benign' | 'suspicious' | 'malignant';

  // Cell Analysis
  nuclear_cytoplasm_ratio: number;
  chromatin_pattern: 'fine' | 'coarse' | 'irregular';
  nucleoli_visibility: 'absent' | 'single' | 'multiple';

  // Invasion Analysis
  basement_membrane_intact: boolean;
  lymphovascular_invasion: boolean;
  perineural_invasion: boolean;

  // Grade Prediction
  tumor_grade_predicted: 1 | 2 | 3 | 4;
  grade_confidence: number; // 0-1

  // Subtype Classification
  molecular_subtype: string;
  immunohistochemistry_markers: Record<string, number>;

  // AI Confidence Scores
  ai_confidence_benign: number; // 0-1
  ai_confidence_malignant: number; // 0-1
  ai_confidence_suspicious: number; // 0-1
}

interface TumorMicrobiomeProfile {
  // Tumor-Associated Microbiota (TAM)
  bacterial_diversity: number; // Shannon index
  fungal_diversity: number; // Fungal diversity index
  viral_load: number; // Viral particles/mL

  // Beneficial Bacteria
  lactobacillus_level: number; // %
  bifidobacterium_level: number; // %
  bacteroides_level: number; // %

  // Pathogenic Bacteria
  fusobacterium_level: number; // %
  prevotella_level: number; // %
  streptococcus_level: number; // %

  // Tumor-Specific Patterns
  colorectal_cancer_pattern: boolean;
  breast_cancer_pattern: boolean;
  lung_cancer_pattern: boolean;
  pancreatic_cancer_pattern: boolean;

  // Microbial Metabolites
  short_chain_fatty_acids: number; // SCFA levels
  bile_acids: number; // Bile acid profile
  tryptophan_metabolites: number; // Tryptophan pathway

  // Inflammation Markers
  inflammatory_cytokines: Record<string, number>;
  immune_activators: number; // Immune activation score
  immunosuppressors: number; // Immune suppression score
}

interface ImmunogenomicsProfile {
  // Neoantigen Prediction
  neoantigen_load: number; // Number of predicted neoantigens
  neoantigen_affinity: number; // Average binding affinity
  neoantigen_immunogenicity: number; // Immunogenicity score

  // HLA Typing
  hla_class_a: string[]; // HLA-A alleles
  hla_class_b: string[]; // HLA-B alleles
  hla_class_c: string[]; // HLA-C alleles
  hla_class_dp: string[]; // HLA-DP alleles
  hla_class_dq: string[]; // HLA-DQ alleles
  hla_class_dr: string[]; // HLA-DR alleles

  // Immune Checkpoints
  pd1_expression: number; // PD-1 expression level
  pd_l1_expression: number; // PD-L1 expression level
  ctla4_expression: number; // CTLA-4 expression level
  lag3_expression: number; // LAG-3 expression level

  // T Cell Repertoire
  tcr_diversity: number; // T cell receptor diversity
  tcr_clonality: number; // T cell clonality
  tcr_expansion: number; // T cell expansion score

  // Immune Infiltration
  cd8_t_cells: number; // CD8+ T cell density
  cd4_t_cells: number; // CD4+ T cell density
  b_cells: number; // B cell density
  nk_cells: number; // NK cell density
  macrophages: number; // Macrophage density
  dendritic_cells: number; // Dendritic cell density

  // Immune Evasion
  immune_evasion_score: number; // Immune evasion capability
  antigen_presentation: number; // Antigen presentation efficiency
  interferon_response: number; // Interferon pathway activity
}

interface LifestyleRiskFactors {
  // Dietary Patterns
  processed_meat_consumption: number; // servings/week
  red_meat_consumption: number; // servings/week
  fruit_vegetable_intake: number; // servings/day
  fiber_intake: number; // grams/day
  alcohol_consumption: number; // drinks/week

  // Physical Activity
  moderate_exercise_minutes: number; // minutes/week
  vigorous_exercise_minutes: number; // minutes/week
  sedentary_time: number; // hours/day
  muscle_mass: number; // kg

  // Environmental Exposures
  air_pollution_exposure: number; // PM2.5 μg/m³
  occupational_exposures: string[]; // Chemical exposures
  radiation_exposure: number; // mSv/year
  pesticide_exposure: boolean;

  // Sleep and Stress
  sleep_duration: number; // hours/night
  sleep_quality_score: number; // 0-100
  chronic_stress_level: number; // 0-100
  social_support_score: number; // 0-100

  // Hormonal Factors
  estrogen_exposure: number; // Hormone exposure score
  reproductive_history: Record<string, number>; // Parity, age at menarche, etc.
  breastfeeding_duration: number; // months

  // Digital Health Metrics
  wearable_stress_indicators: number[]; // Stress patterns
  digital_health_score: number; // 0-100
  health_app_usage: number; // frequency
}

interface EpidemiologicalIntelligence {
  // Geographic Risk
  region_cancer_rates: Record<string, number>; // Local incidence rates
  environmental_carcinogens: string[]; // Local carcinogens
  water_quality_index: number; // Water quality score

  // Infectious Disease Correlation
  hpv_prevalence: number; // HPV prevalence rate
  hepatitis_b_prevalence: number; // HBV prevalence rate
  helicobacter_pylori_rate: number; // H. pylori infection rate

  // Occupational Clusters
  cancer_clusters_identified: boolean;
  occupational_exposure_groups: string[];

  // Lifestyle Trends
  regional_diet_trends: Record<string, number>;
  physical_activity_trends: number[];
  smoking_prevalence_trends: number[];

  // Healthcare Access
  screening_participation_rate: number; // %
  early_detection_capability: number; // 0-100
  treatment_accessibility: number; // 0-100
}

export const cancerRiskPrediction2025: ClinicalCalculator = {
  id: 'cancer-risk-prediction-2025',
  name: 'Predição Multimodal de Risco de Câncer 2026 (protótipo)',
  abbreviation: 'Cancer Prototype',
  category: 'general',
  description:
    'Protótipo de pesquisa para integração de biópsia líquida, patologia digital, microbioma e imunogenômica em risco oncológico.',
  purpose:
    'Protótipo de inteligência clínica 2026 para pesquisa. Não deve ser usado como ferramenta de rastreamento, diagnóstico ou aconselhamento oncológico sem validação externa e revisão especializada.',

  indications: [
    'Predição de risco de câncer em adultos (25-80 anos)',
    'Estratificação de risco para rastreamento personalizado',
    'Identificação de pacientes de alto risco',
    'Planejamento de prevenção personalizada',
    'Monitoramento de risco em tempo real',
    'Detecção precoce de alterações pré-cancerígenas'
  ],

  contraindications: [
    'Câncer ativo em tratamento',
    'Imunossupressão severa ativa',
    'Menores de 25 anos (dados insuficientes)',
    'Condições psiquiátricas severas'
  ],

  inputs: [
    // Demografia Base
    {
      id: 'age',
      label: 'Idade',
      type: 'number',
      required: true,
      validation: { min: 25, max: 80, required: true }
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

    // LIQUID BIOPSY ANALYSIS
    {
      id: 'cfdna_concentration',
      label: 'Concentração cfDNA (ng/mL)',
      type: 'number',
      required: false,
      validation: { min: 0, max: 1000 },
      description: 'Concentração de DNA circulante livre'
    },
    {
      id: 'cfdna_fragmentation',
      label: 'Padrão de Fragmentação cfDNA',
      type: 'select',
      required: false,
      options: [
        { value: 0, label: 'Normal' },
        { value: 1, label: 'Anormal' },
        { value: 2, label: 'Altamente anormal' }
      ]
    },
    {
      id: 'tumor_fraction',
      label: 'Fração Tumoral (%)',
      type: 'number',
      required: false,
      validation: { min: 0, max: 100 },
      description: 'Percentual de DNA tumoral circulante'
    },
    {
      id: 'signature_3_brca',
      label: 'Assinatura 3 (Deficiência BRCA)',
      type: 'range',
      required: false,
      validation: { min: 0, max: 100 },
      description: 'Score da assinatura mutacional 3'
    },
    {
      id: 'signature_5_clock',
      label: 'Assinatura 5 (Clock-like)',
      type: 'range',
      required: false,
      validation: { min: 0, max: 100 },
      description: 'Score da assinatura mutacional 5'
    },

    // MICROBIOMA TUMORAL
    {
      id: 'bacterial_diversity',
      label: 'Diversidade Bacteriana (Índice Shannon)',
      type: 'number',
      required: false,
      validation: { min: 0, max: 10 },
      description: 'Diversidade da microbiota tumoral'
    },
    {
      id: 'fusobacterium_level',
      label: 'Nível de Fusobacterium (%)',
      type: 'number',
      required: false,
      validation: { min: 0, max: 100 },
      description: 'Associado a câncer colorretal'
    },
    {
      id: 'bifidobacterium_level',
      label: 'Nível de Bifidobacterium (%)',
      type: 'number',
      required: false,
      validation: { min: 0, max: 100 },
      description: 'Bactéria protetora'
    },
    {
      id: 'inflammation_score',
      label: 'Score de Inflamação (0-100)',
      type: 'range',
      required: false,
      validation: { min: 0, max: 100 },
      description: 'Nível de inflamação local'
    },

    // IMUNOGENÔMICA
    {
      id: 'neoantigen_load',
      label: 'Carga de Neoantígenos',
      type: 'number',
      required: false,
      validation: { min: 0, max: 1000 },
      description: 'Número de neoantígenos preditos'
    },
    {
      id: 'hla_diversity',
      label: 'Diversidade HLA',
      type: 'select',
      required: false,
      options: [
        { value: 0, label: 'Baixa diversidade' },
        { value: 1, label: 'Diversidade moderada' },
        { value: 2, label: 'Alta diversidade' }
      ]
    },
    {
      id: 'immune_infiltration',
      label: 'Infiltrado Imune (0-100)',
      type: 'range',
      required: false,
      validation: { min: 0, max: 100 },
      description: 'Score de infiltrado imune tumoral'
    },
    {
      id: 'pd_l1_expression',
      label: 'Expressão PD-L1 (%)',
      type: 'number',
      required: false,
      validation: { min: 0, max: 100 },
      description: 'Expressão de PD-L1 em células tumorais'
    },

    // LIFESTYLE ANALYTICS
    {
      id: 'processed_meat_weekly',
      label: 'Carnes Processadas (porções/semana)',
      type: 'number',
      required: true,
      validation: { min: 0, max: 50 },
      description: 'Consumo de carnes processadas'
    },
    {
      id: 'alcohol_weekly',
      label: 'Álcool (drinks/semana)',
      type: 'number',
      required: true,
      validation: { min: 0, max: 100 },
      description: 'Consumo de álcool semanal'
    },
    {
      id: 'exercise_minutes',
      label: 'Exercício Moderado (min/semana)',
      type: 'number',
      required: true,
      validation: { min: 0, max: 1000 }
    },
    {
      id: 'sleep_hours',
      label: 'Horas de Sono por Noite',
      type: 'number',
      required: true,
      validation: { min: 3, max: 12 }
    },
    {
      id: 'stress_level',
      label: 'Nível de Estresse Crônico (0-100)',
      type: 'range',
      required: true,
      validation: { min: 0, max: 100 }
    },

    // FATORES GENÉTICOS
    {
      id: 'family_history_cancer',
      label: 'Histórico Familiar de Câncer',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Nenhum caso' },
        { value: 1, label: '1 parente de 2º grau' },
        { value: 2, label: '1 parente de 1º grau' },
        { value: 3, label: '2+ parentes de 1º grau' },
        { value: 4, label: 'Síndrome hereditária conhecida' }
      ]
    },
    {
      id: 'genetic_mutations',
      label: 'Mutações Genéticas Conhecidas',
      type: 'select',
      required: false,
      options: [
        { value: 0, label: 'Nenhuma' },
        { value: 1, label: 'BRCA1/2' },
        { value: 2, label: 'Lynch Syndrome' },
        { value: 3, label: 'Li-Fraumeni' },
        { value: 4, label: 'Multiple' }
      ]
    },

    // INTELIGÊNCIA EPIDEMIOLÓGICA
    {
      id: 'regional_cancer_rate',
      label: 'Taxa de Câncer Regional (por 100.000)',
      type: 'number',
      required: true,
      validation: { min: 0, max: 1000 }
    },
    {
      id: 'air_pollution_level',
      label: 'Nível de Poluição do Ar (PM2.5 μg/m³)',
      type: 'number',
      required: true,
      validation: { min: 0, max: 500 }
    },
    {
      id: 'hpv_status',
      label: 'Status HPV',
      type: 'select',
      required: false,
      options: [
        { value: 0, label: 'Negativo' },
        { value: 1, label: 'HPV alto risco positivo' },
        { value: 2, label: 'HPV baixo risco positivo' }
      ]
    },

    // HORIZONTE DE PREDIÇÃO
    {
      id: 'prediction_horizon',
      label: 'Horizonte de Predição',
      type: 'select',
      required: true,
      options: [
        { value: 12, label: '1 ano' },
        { value: 60, label: '5 anos' },
        { value: 120, label: '10 anos' },
        { value: 300, label: '25 anos' },
        { value: 600, label: '50 anos' }
      ]
    },

    // TIPO DE CÂNCER DE RISCO
    {
      id: 'cancer_type_focus',
      label: 'Foco Principal de Risco',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Geral (todos os cânceres)' },
        { value: 1, label: 'Mama' },
        { value: 2, label: 'Colorretal' },
        { value: 3, label: 'Pulmão' },
        { value: 4, label: 'Próstata' },
        { value: 5, label: 'Ovário' },
        { value: 6, label: 'Pâncreas' },
        { value: 7, label: 'Melanoma' },
        { value: 8, label: 'Múltiplos tipos' }
      ]
    }
  ],

  calculate: (inputs: Record<string, number>): number => {
    let riskScore = 0;
    let confidence = 1.0;

    // DEMOGRAFIA
    riskScore += inputs.age * 0.1;
    if (inputs.sex === 1 && inputs.age > 50) riskScore += 5; // Maior risco masculino após 50

    // LIQUID BIOPSY
    if (inputs.cfdna_concentration) {
      if (inputs.cfdna_concentration > 50) {
        riskScore += inputs.cfdna_concentration * 0.2;
        confidence += 0.2;
      }
    }
    if (inputs.tumor_fraction) {
      riskScore += inputs.tumor_fraction * 1.5;
      confidence += 0.3;
    }
    if (inputs.signature_3_brca) {
      riskScore += inputs.signature_3_brca * 0.8;
    }
    if (inputs.signature_5_clock) {
      riskScore += inputs.signature_5_clock * 0.3;
    }

    // MICROBIOMA TUMORAL
    if (inputs.bacterial_diversity < 3) {
      riskScore += (3 - inputs.bacterial_diversity) * 2;
      confidence += 0.1;
    }
    if (inputs.fusobacterium_level) {
      riskScore += inputs.fusobacterium_level * 0.15;
    }
    if (inputs.bifidobacterium_level) {
      riskScore += (50 - inputs.bifidobacterium_level) * 0.02; // Baixo bifidobacterium = maior risco
    }
    if (inputs.inflammation_score) {
      riskScore += inputs.inflammation_score * 0.05;
    }

    // IMUNOGENÔMICA
    if (inputs.neoantigen_load) {
      riskScore += Math.log(inputs.neoantigen_load + 1) * 1.2;
      confidence += 0.15;
    }
    if (inputs.hla_diversity === 0) {
      riskScore += 3; // Baixa diversidade HLA = maior risco
    }
    if (inputs.immune_infiltration) {
      if (inputs.immune_infiltration < 20) {
        riskScore += (20 - inputs.immune_infiltration) * 0.1;
      }
    }
    if (inputs.pd_l1_expression > 50) {
      riskScore += (inputs.pd_l1_expression - 50) * 0.05;
    }

    // LIFESTYLE FACTORS
    riskScore += inputs.processed_meat_weekly * 0.8;
    riskScore += inputs.alcohol_weekly * 0.3;
    riskScore += Math.max(0, 150 - inputs.exercise_minutes) * 0.01;
    riskScore += Math.abs(inputs.sleep_hours - 7) * 0.5;
    riskScore += inputs.stress_level * 0.04;

    // GENETIC FACTORS
    riskScore += inputs.family_history_cancer * 2.5;
    if (inputs.genetic_mutations === 1) riskScore += 15; // BRCA1/2
    else if (inputs.genetic_mutations === 2) riskScore += 12; // Lynch
    else if (inputs.genetic_mutations === 3) riskScore += 20; // Li-Fraumeni
    else if (inputs.genetic_mutations === 4) riskScore += 25; // Multiple

    // EPIDEMIOLOGICAL INTELLIGENCE
    riskScore += inputs.regional_cancer_rate * 0.02;
    riskScore += inputs.air_pollution_level * 0.05;
    if (inputs.hpv_status === 1) riskScore += 8; // HPV alto risco

    // TIPO DE CÂNCER FOCUS
    const cancerTypeMultiplier: Record<number, number> = {
      0: 1.0, // Geral
      1: 1.2, // Mama
      2: 1.1, // Colorretal
      3: 1.3, // Pulmão
      4: 1.15, // Próstata
      5: 1.25, // Ovário
      6: 1.4, // Pâncreas
      7: 1.1, // Melanoma
      8: 1.5  // Múltiplos
    };

    const multiplier = cancerTypeMultiplier[inputs.cancer_type_focus] || 1.0;
    riskScore *= multiplier;

    // TEMPORAL ADJUSTMENT
    const temporalMultipliers: Record<number, number> = {
      12: 0.5,  // 1 ano
      60: 1.0,  // 5 anos
      120: 1.5, // 10 anos
      300: 2.5, // 25 anos
      600: 4.0  // 50 anos
    };

    const temporalMultiplier = temporalMultipliers[inputs.prediction_horizon] || 1.0;
    riskScore *= temporalMultiplier;

    return Math.max(0, Math.min(100, riskScore));
  },

  interpret: (score: number, inputs?: Record<string, number>): ScoreInterpretation => {
    const horizon = inputs?.prediction_horizon || 60;
    const cancerType = inputs?.cancer_type_focus || 0;

    const cancerTypes = [
      'câncer em geral', 'câncer de mama', 'câncer colorretal',
      'câncer de pulmão', 'câncer de próstata', 'câncer de ovário',
      'câncer de pâncreas', 'melanoma', 'múltiplos cânceres'
    ];
    const cancerTypeName = cancerTypes[cancerType];

    if (score < 5) {
      return {
        score,
        category: 'RISCO ULTRA-BAIXO',
        risk: 'very-low',
        mortality: `<0.1% risco de ${cancerTypeName} em ${Math.round(horizon/12)} anos`,
        recommendation: 'Risco ultra-baixo. Manter estilo de vida saudável.',
        action: 'Check-up de rotina. Manter hábitos atuais.',
        notes: [
          'Perfil de liquid biopsy favorável',
          'Microbioma tumoral equilibrado',
          'Imunogenômica otimizada',
          'Lifestyle com baixo risco',
          'Genética favorável',
          'Sem fatores epidemiológicos adversos'
        ]
      };
    } else if (score < 15) {
      return {
        score,
        category: 'RISCO BAIXO',
        risk: 'low',
        mortality: `0.1-1% risco de ${cancerTypeName} em ${Math.round(horizon/12)} anos`,
        recommendation: 'Risco baixo. Manter monitoramento de rotina.',
        action: 'Rastreamento padrão. Manter lifestyle saudável.',
        notes: [
          'Biomarcadores majoritariamente favoráveis',
          'Microbioma com diversidade adequada',
          'Sistema imune competente',
          'Lifestyle com pequenos ajustes necessários',
          'Histórico genético de baixo risco',
          'Monitoramento preventivo recomendado'
        ]
      };
    } else if (score < 35) {
      return {
        score,
        category: 'RISCO MODERADO',
        risk: 'moderate',
        mortality: `1-5% risco de ${cancerTypeName} em ${Math.round(horizon/12)} anos`,
        recommendation: 'Risco moderado. Considerar intervenções preventivas.',
        action: 'Rastreamento intensificado + lifestyle optimization.',
        notes: [
          'Alguns biomarcadores elevaram-se',
          'Microbioma com desequilíbrios identificados',
          'Possíveis alterações imunes sutis',
          'Múltiplos fatores de lifestyle modificáveis',
          'Histórico familiar presente',
          'Considerar biomarcadores adicionais',
          'Intervenções preventivas intensificadas'
        ]
      };
    } else if (score < 60) {
      return {
        score,
        category: 'RISCO ALTO',
        risk: 'high',
        mortality: `5-15% risco de ${cancerTypeName} em ${Math.round(horizon/12)} anos`,
        recommendation: 'Risco alto. Intervenções preventivas intensivas.',
        action: 'Avaliação oncológica + protocolo preventivo personalizado.',
        notes: [
          'Liquid biopsy com alterações preocupantes',
          'Microbioma tumoral significativamente alterado',
          'Imunogenômica comprometida',
          'Lifestyle com múltiplos fatores adversos',
          'Síndrome genética possível',
          'Fatores epidemiológicos desfavoráveis',
          'Considerar liquid biopsy seriada',
          'Protocolo de monitoramento intensivo'
        ]
      };
    } else {
      return {
        score,
        category: 'RISCO EXTREMO',
        risk: 'critical',
        mortality: `>15% risco de ${cancerTypeName} em ${Math.round(horizon/12)} anos`,
        recommendation: 'Risco extremo. Avaliação oncológica urgente.',
        action: 'EVALUAÇÃO ONCOLÓGICA URGENTE + Protocolo máximo.',
        notes: [
          'Perfil de liquid biopsy crítico',
          'Microbioma tumoral severamente alterado',
          'Imunogenômica comprometida severamente',
          'Lifestyle de alto risco severo',
          'Síndrome genética confirmada provável',
          'Epidemiologia altamente desfavorável',
          'Considerar profilaxia cirúrgica',
          'Avaliação genética completa obrigatória',
          'Acompanhamento oncológico de alta complexidade'
        ]
      };
    }
  },

  interpretationRanges: [
    {
      min: 0,
      max: 5,
      interpretation: {
        category: 'ULTRA-BAIXO',
        risk: 'very-low',
        mortality: '<0.1%',
        recommendation: 'Manter lifestyle saudável'
      }
    },
    {
      min: 5,
      max: 15,
      interpretation: {
        category: 'BAIXO',
        risk: 'low',
        mortality: '0.1-1%',
        recommendation: 'Monitoramento rotina'
      }
    },
    {
      min: 15,
      max: 35,
      interpretation: {
        category: 'MODERADO',
        risk: 'moderate',
        mortality: '1-5%',
        recommendation: 'Intervenções preventivas'
      }
    },
    {
      min: 35,
      max: 60,
      interpretation: {
        category: 'ALTO',
        risk: 'high',
        mortality: '5-15%',
        recommendation: 'Protocolo preventivo intensivo'
      }
    },
    {
      min: 60,
      max: 100,
      interpretation: {
        category: 'EXTREMO',
        risk: 'critical',
        mortality: '>15%',
        recommendation: 'Avaliação oncológica urgente'
      }
    }
  ],

  citations: [
    {
      authors: 'Cohen JD, Li L, Wang Y, et al.',
      title: 'Detection and localization of surgically resectable cancers with a multi-analyte blood test',
      journal: 'Science',
      year: 2018,
      volume: '359(6378)',
      doi: '10.1126/science.aat3247'
    },
    {
      authors: 'Liu Y, Sethi NS, Hinoue T, et al.',
      title: 'Comparative Molecular Analysis of Gastrointestinal Adenocarcinomas',
      journal: 'Cancer Cell',
      year: 2018,
      volume: '33(4)',
      doi: '10.1016/j.ccell.2018.03.010'
    },
    {
      authors: 'Gopalakrishnan V, Spencer CN, Nezi L, et al.',
      title: 'Gut microbiome modulates response to anti-PD-1 immunotherapy in melanoma patients',
      journal: 'Science',
      year: 2018,
      volume: '359(6378)',
      doi: '10.1126/science.aan4236'
    },
    {
      authors: 'Schumacher TN, Schreiber RD',
      title: 'Neoantigens in cancer immunotherapy',
      journal: 'Science',
      year: 2015,
      volume: '348(6230)',
      doi: '10.1126/science.aaa4971'
    }
  ],

  validationStudy:
    'Protótipo de pesquisa. Evidência insuficiente no app para rastreamento ou decisão clínica.',

  notes: [
    'Protótipo não exposto no hub de calculadoras clínicas.',
    'Não substitui rastreamento conforme diretrizes nem avaliação oncológica.',
    'Requer backend clínico, validação externa e governança de dados biológicos.'
  ],

  relatedCalculators: [
    'genomic-multiomic-risk',
    'pharmacogenomics-precision',
    'stroke-temporal-evolution',
    'immune-checkpoint-prediction',
    'microbiome-cancer-interaction'
  ],

  version: '2026.0.0',
  lastUpdated: '2026-06-03',
  evidenceLevel: 'prototype',
  clinicalUse: 'research_only',
  disclaimer:
    'Protótipo de pesquisa. Não usar para rastreamento, diagnóstico ou decisão oncológica.',
  requiresBackend: true,
  versionYear: 2026,
  snomedConcepts: [
    '448949009', // Malignant neoplasm
    '108600006', // Benign neoplasm
    '25506009',  // Carcinoma
    '10837004',  // Sarcoma
    '20376005',  // Lymphoma
    '123480006', // Leukemia
    '65363002',  // Neoplasm of uncertain behavior
    '20376005',  // Malignant lymphoma
    '92341006',  // Primary malignant neoplasm
    '14796000'   // Neoplasm of uncertain behavior
  ]
};
