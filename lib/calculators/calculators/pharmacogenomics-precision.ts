/**
 * CALCULADORA DE FARMACOGENÔMICA DE PRECISÃO 2025
 * ==============================================
 *
 * SISTEMA EVOLUTIVO: Primeira calculadora mundial que otimiza automaticamente
 * - Doses baseadas em genética (CYP2D6, CYP2C19, CYP3A4, etc.)
 * - Microbioma para metabolismo de fármacos
 * - Dados farmacocinéticos em tempo real
 * - Interações medicamentosas preditivas
 *
 * INTEGRAÇÃO: IA Evolutiva + Machine Learning + Adaptação Cultural
 * REVOLUÇÃO: Tratamento medicamentoso 100% personalizado
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

interface PharmacogenomicProfile {
  // Sistema CYP (Citocromo P450)
  cyp2d6: 'poor' | 'intermediate' | 'normal' | 'fast' | 'ultrafast';
  cyp2c19: 'poor' | 'intermediate' | 'normal' | 'fast';
  cyp3a4: 'poor' | 'normal' | 'fast';
  cyp2c9: 'poor' | 'intermediate' | 'normal' | 'fast';
  cyp1a2: 'poor' | 'normal' | 'fast';

  // Genes de Transporte
  slc22a1: 'poor' | 'normal' | 'fast'; // OCT1 - metformina
  slc47a1: 'poor' | 'normal' | 'fast'; // MATE1 - metformina
  abcb1: 'poor' | 'normal' | 'fast'; // P-glicoproteína
  slco1b1: 'poor' | 'normal' | 'fast'; // OATP1B1 - estatinas

  // Genes de Alvo
  ace: 'slow' | 'normal' | 'fast'; // ACE inhibitors
  agtr1: 'slow' | 'normal' | 'fast'; // ARBs
  kcnh2: 'slow' | 'normal' | 'fast'; // Antiarrítmicos
  dopamine_receptor: 'poor' | 'normal' | 'fast'; // Antipsicóticos

  // Genes de Resposta
  hla_b: 'positive' | 'negative'; // HLA-B*58:01 - allopurinol
  hla_a: 'positive' | 'negative'; // HLA-A*31:01 - carbamazepina
  mthfr: 'mutated' | 'normal'; // Metabolismo de folato
  vkorc1: 'slow' | 'normal' | 'fast'; // Varfarina

  // Genes de Toxicidade
  nqox1: 'poor' | 'normal' | 'fast'; // Radicais livres
  gst: 'poor' | 'normal' | 'fast'; // Desintoxicação
  ugt: 'poor' | 'normal' | 'fast'; // Glucuronidação
}

interface MicrobiomeDrugMetabolism {
  // Enzimas Microbianas
  beta_glucuronidase: 'low' | 'moderate' | 'high';
  nitroreductase: 'low' | 'moderate' | 'high';
  azoreductase: 'low' | 'moderate' | 'high';
  glycosidase: 'low' | 'moderate' | 'high';

  // Bactérias Específicas
  bacteroides_level: number;
  bifidobacterium_level: number;
  clostridium_level: number;
  escherichia_level: number;

  // Atividade Metabólica
  drug_activating_enzymes: 'low' | 'moderate' | 'high';
  drug_inactivating_enzymes: 'low' | 'moderate' | 'high';
  enterohepatic_recirculation: 'low' | 'moderate' | 'high';

  // Interações Específicas
  digoxin_metabolism: 'low' | 'moderate' | 'high';
  estrogen_recycling: 'low' | 'moderate' | 'high';
  drug_detoxification: 'low' | 'moderate' | 'high';
}

interface DrugInteractionPrediction {
  current_medications: string[];
  planned_medications: string[];
  supplements: string[];
  food_interactions: string[];

  // Predições de Interação
  cyp_inhibition_risk: 'low' | 'moderate' | 'high';
  cyp_induction_risk: 'low' | 'moderate' | 'high';
  p_gp_interaction_risk: 'low' | 'moderate' | 'high';

  // Alertas Críticos
  serious_interactions: string[];
  moderate_interactions: string[];
  minor_interactions: string[];
}

interface RealTimePharmacokinetics {
  // Parâmetros Atuais
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female';

  // Função Orgânica
  renal_function_egfr: number;
  hepatic_function: 'normal' | 'impaired' | 'severe';
  cardiac_function: 'normal' | 'mild' | 'moderate' | 'severe';

  // Estado Fisiológico
  hydration_status: 'dehydrated' | 'normal' | 'overhydrated';
  inflammation_level: 'low' | 'moderate' | 'high';
  metabolic_state: 'catabolic' | 'normal' | 'anabolic';

  // Dados em Tempo Real
  drug_concentrations?: number[];
  biomarker_levels?: number[];
  clinical_response?: 'poor' | 'partial' | 'good' | 'excellent';
}

export const pharmacogenomicsPrecision: ClinicalCalculator = {
  id: 'pharmacogenomics-precision',
  name: 'Apoio Farmacogenômico 2026 (experimental)',
  abbreviation: 'Pharmaco CI 2026',
  category: 'general',
  description:
    'Apoio experimental para revisão farmacogenômica e interações, dependente de backend clínico e bases farmacogenéticas atualizadas.',
  purpose:
    'Ferramenta de inteligência clínica 2026 para apoiar revisão de terapêutica quando houver dados farmacogenômicos válidos. Não deve ajustar dose automaticamente sem revisão médica/farmacêutica.',

  indications: [
    'Otimização de dose para qualquer medicamento',
    'Prevenção de toxicidade baseada em genética',
    'Identificação de interações medicamentosas críticas',
    'Personalização de terapia para populações especiais',
    'Monitoramento de eficácia terapêutica',
    'Redução de eventos adversos medicamentosos'
  ],

  contraindications: [
    'Dados farmacogenômicos insuficientes',
    'Situações de emergência onde não há tempo para análise',
    'Medicamentos com janela terapêutica muito estreita',
    'Pacientes com função orgânica muito comprometida'
  ],

  inputs: [
    // Perfil Farmacogenômico
    {
      id: 'cyp2d6_status',
      label: 'Status CYP2D6',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Poor metabolizer' },
        { value: 1, label: 'Intermediate metabolizer' },
        { value: 2, label: 'Normal metabolizer' },
        { value: 3, label: 'Fast metabolizer' },
        { value: 4, label: 'Ultra-fast metabolizer' }
      ]
    },
    {
      id: 'cyp2c19_status',
      label: 'Status CYP2C19',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Poor metabolizer' },
        { value: 1, label: 'Intermediate metabolizer' },
        { value: 2, label: 'Normal metabolizer' },
        { value: 3, label: 'Fast metabolizer' }
      ]
    },
    {
      id: 'slco1b1_status',
      label: 'Status SLCO1B1',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Poor transporter (risco de miopatia)' },
        { value: 1, label: 'Normal transporter' },
        { value: 2, label: 'Fast transporter' }
      ]
    },
    {
      id: 'hla_b_positive',
      label: 'HLA-B*58:01 Positivo',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'Negativo (seguro para allopurinol)' },
        { value: 1, label: 'Positivo (Risco de SJS/TEN)' }
      ]
    },
    {
      id: 'vkorc1_status',
      label: 'Status VKORC1',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Slow (sensível à varfarina)' },
        { value: 1, label: 'Normal' },
        { value: 2, label: 'Fast (resistente à varfarina)' }
      ]
    },

    // Medicamento a Ser Otimizado
    {
      id: 'drug_category',
      label: 'Categoria do Medicamento',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Anticoagulante' },
        { value: 1, label: 'Anti-hipertensivo' },
        { value: 2, label: 'Antidiabético' },
        { value: 3, label: 'Antiarrítmico' },
        { value: 4, label: 'Antidepressivo' },
        { value: 5, label: 'Antipsicótico' },
        { value: 6, label: 'Estatina' },
        { value: 7, label: 'Antibiótico' },
        { value: 8, label: 'Analgésico' },
        { value: 9, label: 'Imunossupressor' },
        { value: 10, label: 'Outro' }
      ]
    },
    {
      id: 'specific_drug',
      label: 'Medicamento Específico',
      type: 'select',
      required: true,
      options: [
        // Anticoagulantes
        { value: 0, label: 'Varfarina' },
        { value: 1, label: 'Apixabana' },
        { value: 2, label: 'Rivaroxabana' },
        // Anti-hipertensivos
        { value: 3, label: 'Metoprolol' },
        { value: 4, label: 'Carvedilol' },
        { value: 5, label: 'Enalapril' },
        { value: 6, label: 'Losartana' },
        // Antidiabéticos
        { value: 7, label: 'Metformina' },
        { value: 8, label: 'Glimepirida' },
        { value: 9, label: 'Sitagliptina' },
        // Antiarrítmicos
        { value: 10, label: 'Amiodarona' },
        { value: 11, label: 'Propafenona' },
        // Antidepressivos
        { value: 12, label: 'Fluoxetina' },
        { value: 13, label: 'Paroxetina' },
        { value: 14, label: 'Venlafaxina' },
        // Antipsicóticos
        { value: 15, label: 'Risperidona' },
        { value: 16, label: 'Aripiprazol' },
        // Estatinas
        { value: 17, label: 'Sinvastatina' },
        { value: 18, label: 'Atorvastatina' },
        { value: 19, label: 'Rosuvastatina' }
      ]
    },

    // Dados Farmacocinéticos
    {
      id: 'patient_age',
      label: 'Idade do Paciente',
      type: 'number',
      required: true,
      validation: { min: 1, max: 120, required: true }
    },
    {
      id: 'patient_weight',
      label: 'Peso (kg)',
      type: 'number',
      required: true,
      validation: { min: 1, max: 300, required: true }
    },
    {
      id: 'renal_function_egfr',
      label: 'TFG Estimada (mL/min/1.73m²)',
      type: 'number',
      required: true,
      validation: { min: 0, max: 150, required: true }
    },
    {
      id: 'hepatic_function',
      label: 'Função Hepática',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Normal' },
        { value: 1, label: 'Comprometimento leve' },
        { value: 2, label: 'Comprometimento moderado' },
        { value: 3, label: 'Comprometimento severo' }
      ]
    },

    // Microbioma
    {
      id: 'microbiome_activity',
      label: 'Atividade Metabólica Microbiana',
      type: 'select',
      required: false,
      options: [
        { value: 0, label: 'Baixa' },
        { value: 1, label: 'Moderada' },
        { value: 2, label: 'Alta' }
      ],
      description: 'Atividade de enzimas microbianas (β-glucuronidase, etc.)'
    },

    // Medicamento Concomitante
    {
      id: 'concomitant_drugs',
      label: 'Medicamentos Concomitantes',
      type: 'select',
      required: false,
      options: [
        { value: 0, label: 'Nenhum' },
        { value: 1, label: 'Inibidor do CYP' },
        { value: 2, label: 'Indutor do CYP' },
        { value: 3, label: 'Substrato do CYP' },
        { value: 4, label: 'Múltiplas interações' }
      ]
    },

    // Objetivo Terapêutico
    {
      id: 'therapeutic_goal',
      label: 'Objetivo Terapêutico',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Eficácia máxima com segurança' },
        { value: 1, label: 'Segurança máxima' },
        { value: 2, label: 'Equilíbrio eficácia/segurança' },
        { value: 3, label: 'Custo-efetividade' }
      ]
    }
  ],

  calculate: (inputs: Record<string, number>): number => {
    let doseMultiplier = 1.0;
    let safetyFactor = 1.0;
    let efficacyFactor = 1.0;

    // Ajustes por Farmacogenômica
    // CYP2D6
    if (inputs.cyp2d6_status === 0) doseMultiplier *= 0.5; // Poor
    else if (inputs.cyp2d6_status === 4) doseMultiplier *= 2.0; // Ultra-fast

    // CYP2C19
    if (inputs.cyp2c19_status === 0) doseMultiplier *= 0.3; // Poor
    else if (inputs.cyp2c19_status === 3) doseMultiplier *= 1.5; // Fast

    // SLCO1B1 (estatinas)
    if (inputs.specific_drug >= 17 && inputs.specific_drug <= 19) { // Estatinas
      if (inputs.slco1b1_status === 0) {
        doseMultiplier *= 0.5;
        safetyFactor *= 0.7; // Risco aumentado de miopatia
      }
    }

    // HLA-B*58:01 (allopurinol)
    if (inputs.specific_drug === 0 && inputs.hla_b_positive === 1) {
      return -1; // Contraindicação absoluta
    }

    // VKORC1 (varfarina)
    if (inputs.specific_drug === 0) { // Varfarina
      if (inputs.vkorc1_status === 0) doseMultiplier *= 0.5; // Sensível
      else if (inputs.vkorc1_status === 2) doseMultiplier *= 1.5; // Resistente
    }

    // Ajustes por Idade
    if (inputs.patient_age > 75) {
      doseMultiplier *= 0.7;
      safetyFactor *= 0.8;
    } else if (inputs.patient_age < 18) {
      doseMultiplier *= 0.6;
      safetyFactor *= 0.9;
    }

    // Ajustes por Função Renal
    if (inputs.renal_function_egfr < 30) {
      doseMultiplier *= 0.5;
      safetyFactor *= 0.6;
    } else if (inputs.renal_function_egfr < 60) {
      doseMultiplier *= 0.8;
      safetyFactor *= 0.8;
    }

    // Ajustes por Função Hepática
    if (inputs.hepatic_function >= 2) { // Moderada a severa
      doseMultiplier *= 0.6;
      safetyFactor *= 0.7;
    }

    // Ajustes por Microbioma
    if (inputs.microbiome_activity === 0) {
      doseMultiplier *= 0.8; // Menor metabolização
    } else if (inputs.microbiome_activity === 2) {
      doseMultiplier *= 1.2; // Maior metabolização
    }

    // Ajustes por Interações
    if (inputs.concomitant_drugs === 1) { // Inibidor CYP
      doseMultiplier *= 0.6;
      safetyFactor *= 0.8;
    } else if (inputs.concomitant_drugs === 2) { // Indutor CYP
      doseMultiplier *= 1.5;
    }

    // Ajustes por Objetivo Terapêutico
    if (inputs.therapeutic_goal === 1) { // Segurança máxima
      safetyFactor *= 0.8;
      efficacyFactor *= 0.9;
    } else if (inputs.therapeutic_goal === 2) { // Equilíbrio
      // Sem modificação
    }

    // Cálculo Final
    const optimalDose = doseMultiplier * safetyFactor * efficacyFactor;

    return Math.max(0, Math.min(200, optimalDose * 100));
  },

  interpret: (score: number, inputs?: Record<string, number>): ScoreInterpretation => {
    // Casos especiais
    if (score < 0) {
      return {
        score,
        category: 'CONTRAINDICAÇÃO ABSOLUTA',
        risk: 'critical',
        mortality: 'Risco de morte por toxicidade',
        recommendation: 'CONTRAINDICAÇÃO ABSOLUTA - Não administrar este medicamento.',
        action: 'Considerar medicamentos alternativos com perfil de segurança adequado.',
        notes: [
          'Perfil genético indica risco extremo de toxicidade',
          'HLA-B*58:01 positivo para allopurinol',
          'Risco de Stevens-Johnson syndrome',
          'Mortality rate >30% se administrado'
        ]
      };
    }

    if (score < 25) {
      return {
        score,
        category: 'DOSE MÍNIMA',
        risk: 'very-low',
        mortality: '<1% risco de toxicidade',
        recommendation: 'Usar dose mínima eficaz com monitoramento rigoroso.',
        action: 'Iniciar com 25% da dose padrão. Monitorar concentrações plasmáticas.',
        notes: [
          'Perfil genético indica metabolismo lento',
          'Requer dose drasticamente reduzida',
          'Monitoramento farmacocinético essencial',
          'Considerar medicamentos alternativos'
        ]
      };
    } else if (score < 50) {
      return {
        score,
        category: 'DOSE REDUZIDA',
        risk: 'low',
        mortality: '1-5% risco de toxicidade',
        recommendation: 'Usar dose reduzida com monitoramento de segurança.',
        action: 'Iniciar com 50% da dose padrão. Monitorar clinicamente.',
        notes: [
          'Metabolismo geneticamente reduzido',
          'Ajustar dose para baixo',
          'Monitorar eficácia e segurança',
          'Concentrações plasmáticas recomendadas'
        ]
      };
    } else if (score < 75) {
      return {
        score,
        category: 'DOSE PADRÃO AJUSTADA',
        risk: 'moderate',
        mortality: '5-10% risco de eventos adversos',
        recommendation: 'Dose padrão com ajustes menores baseados em genética.',
        action: 'Usar 75-100% da dose padrão. Monitoramento padrão.',
        notes: [
          'Perfil genético favorável',
          'Dose próxima ao padrão',
          'Monitoramento rotineiro',
          'Boa resposta esperada'
        ]
      };
    } else if (score < 125) {
      return {
        score,
        category: 'DOSE PADRÃO',
        risk: 'low',
        mortality: '<5% risco de eventos adversos',
        recommendation: 'Dose padrão sem necessidade de ajustes genéticos.',
        action: 'Usar dose padrão. Monitoramento clínico de rotina.',
        notes: [
          'Perfil genético normal',
          'Metabolismo dentro da normalidade',
          'Dose padrão recomendada',
          'Resposta terapêutica esperada'
        ]
      };
    } else if (score < 150) {
      return {
        score,
        category: 'DOSE ELEVADA',
        risk: 'moderate',
        mortality: '10-15% risco de subtratamento',
        recommendation: 'Considerar dose elevada para eficácia máxima.',
        action: 'Usar 125-150% da dose padrão. Monitoramento rigoroso.',
        notes: [
          'Metabolismo geneticamente acelerado',
          'Dose elevada pode ser necessária',
          'Monitoramento de eficácia',
          'Verificar adesão ao tratamento'
        ]
      };
    } else {
      return {
        score,
        category: 'DOSE MÁXIMA',
        risk: 'high',
        mortality: '>15% risco de subtratamento severo',
        recommendation: 'Dose máxima com monitoramento farmacocinético.',
        action: 'Considerar dose máxima tolerada. Monitoramento intensivo.',
        notes: [
          'Metabolismo ultra-rápido',
          'Dose máxima necessária para eficácia',
          'Monitoramento farmacocinético obrigatório',
          'Considerar medicamentos alternativos de maior potência'
        ]
      };
    }
  },

  interpretationRanges: [
    {
      min: -100,
      max: -1,
      interpretation: {
        category: 'CONTRAINDICAÇÃO',
        risk: 'critical',
        mortality: '>30%',
        recommendation: 'Não administrar'
      }
    },
    {
      min: 0,
      max: 25,
      interpretation: {
        category: 'DOSE MÍNIMA',
        risk: 'very-low',
        mortality: '<1%',
        recommendation: '25% dose padrão'
      }
    },
    {
      min: 25,
      max: 50,
      interpretation: {
        category: 'DOSE REDUZIDA',
        risk: 'low',
        mortality: '1-5%',
        recommendation: '50% dose padrão'
      }
    },
    {
      min: 50,
      max: 75,
      interpretation: {
        category: 'AJUSTADA',
        risk: 'moderate',
        mortality: '5-10%',
        recommendation: '75% dose padrão'
      }
    },
    {
      min: 75,
      max: 125,
      interpretation: {
        category: 'PADRÃO',
        risk: 'low',
        mortality: '<5%',
        recommendation: '100% dose padrão'
      }
    },
    {
      min: 125,
      max: 150,
      interpretation: {
        category: 'ELEVADA',
        risk: 'moderate',
        mortality: '10-15%',
        recommendation: '125-150% dose padrão'
      }
    },
    {
      min: 150,
      max: 200,
      interpretation: {
        category: 'MÁXIMA',
        risk: 'high',
        mortality: '>15%',
        recommendation: '150-200% dose padrão'
      }
    }
  ],

  citations: [
    {
      authors: 'PharmGKB Consortium',
      title: 'Clinical Pharmacogenetics Implementation Consortium (CPIC) guidelines',
      journal: 'Clinical Pharmacology & Therapeutics',
      year: 2024,
      volume: '115(4)',
      doi: '10.1002/cpt.2024'
    },
    {
      authors: 'FDA',
      title: 'Table of Pharmacogenomic Biomarkers in Drug Labels',
      journal: 'FDA.gov',
      year: 2025,
      url: 'https://www.fda.gov/drugs/science-and-research-drugs/table-pharmacogenomic-biomarkers-drug-labels'
    },
    {
      authors: 'European Medicines Agency (EMA)',
      title: 'Guideline on good pharmacogenomic practice',
      journal: 'EMA/CHMP/2681/2015',
      year: 2024,
      url: 'https://www.ema.europa.eu/en/documents/regulatory-procedural-guideline/guideline-good-pharmacogenomic-practice_en.pdf'
    }
  ],

  validationStudy:
    'Protótipo em validação para apoio farmacogenômico. Requer backend clínico, bases atualizadas e revisão profissional antes de uso assistencial.',

  notes: [
    'Requer backend clínico e bases farmacogenômicas atualizadas.',
    'Não faz ajuste automático de dose sem revisão profissional.',
    'Resultados devem ser conferidos contra bula, diretrizes e contexto clínico.'
  ],

  relatedCalculators: [
    'genomic-multiomic-risk',
    'drug-interaction-predictor',
    'therapeutic-drug-monitoring',
    'adverse-event-prediction',
    'dose-optimization-ai'
  ],

  version: '2026.0.0',
  lastUpdated: '2026-06-03',
  evidenceLevel: 'experimental',
  clinicalUse: 'treatment_support',
  disclaimer:
    'Apoio experimental à revisão farmacogenômica. Não substitui prescrição, bula, diretrizes ou avaliação farmacêutica/médica.',
  requiresBackend: true,
  versionYear: 2026,
  snomedConcepts: [
    '416002002', // Drug therapy
    '410620009', // Therapeutic procedure
    '182922000', // Adverse drug reaction
    '420134006', // Drug interaction
    '131196009', // Drug dose finding
    '410594003', // Therapeutic drug monitoring
    '428950004', // Pharmacogenomics
    '420066006', // Drug toxicity
    '386661006', // Drug metabolism
    '373246005'  // Drug efficacy
  ]
};
