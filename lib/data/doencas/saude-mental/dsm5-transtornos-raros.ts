/**
 * TRANSTORNOS MENTAIS RAROS E COMPLEXOS - DSM-5
 * Transtornos menos comuns, mas clinicamente importantes
 */

import type { DoencaMental } from '@/lib/types/doenca-mental';
import { DSM5_CATEGORIES } from '@/lib/types/dsm5';

export const transtornosMentalRaros: Array<Partial<DoencaMental> & Pick<DoencaMental, 'id' | 'titulo' | 'categoria' | 'cid10' | 'ciap2'>> = [
  // ============================================================================
  // TRANSTORNOS NEUROCOGNITIVOS
  // ============================================================================
  
  {
    id: 'transtorno-neurocognitivo-leve',
    titulo: 'Transtorno Neurocognitivo Leve',
    categoria: 'saude_mental',
    cid10: ['F06.7'],
    cid11: ['6D70'],
    ciap2: ['P70'],
    dsm5: {
      code: '331.83',
      category: DSM5_CATEGORIES.NEUROCOGNITIVE,
      diagnosticCriteria: {
        code: '331.83',
        name: 'Mild Neurocognitive Disorder',
        category: DSM5_CATEGORIES.NEUROCOGNITIVE,
        criteria: [
          {
            letter: 'A',
            text: 'Evidência de declínio cognitivo modesto de um nível prévio de desempenho em um ou mais domínios cognitivos',
          },
          {
            letter: 'B',
            text: 'O declínio cognitivo não interfere com a capacidade de independência nas atividades instrumentais da vida diária',
          },
        ],
      },
    },
    quickView: {
      definicao: 'Declínio cognitivo modesto de um ou mais domínios (atenção complexa, função executiva, aprendizado e memória, linguagem, perceptivo-motor, cognição social) que não interfere com independência funcional.',
      criteriosDiagnosticos: [
        'Declínio cognitivo modesto em ≥1 domínio',
        'Avaliação objetiva (testes neuropsicológicos)',
        'NÃO interfere com independência funcional',
        'NÃO atende critérios de delirium',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Reabilitação cognitiva',
          'Treinamento cognitivo',
          'Exercício físico regular',
          'Controle de fatores de risco cardiovascular',
        ],
        farmacologico: [
          'Tratamento de causa subjacente',
          'Donepezil ou Rivastigmina (se Alzheimer)',
        ],
      },
      redFlags: [
        'Progressão rápida',
        'Declínio funcional',
        'Sintomas comportamentais',
        'Causa reversível não tratada',
      ],
      examesIniciais: [
        'Avaliação neuropsicológica',
        'RM de crânio',
        'Hemograma, função tireoidiana, B12, folato',
        'Excluir causas reversíveis',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'MoCA',
        description: 'Montreal Cognitive Assessment: Escala de rastreamento cognitivo',
        cutoff: '<26 sugere comprometimento',
        reference: 'Nasreddine et al., 2005',
      },
      {
        name: 'MMSE',
        description: 'Mini-Mental State Examination: Escala clássica de rastreamento',
        cutoff: '<24 sugere comprometimento',
        reference: 'Folstein et al., 1975',
      },
    ],
    tags: ['neurocognitivo', 'cognicao', 'demencia', 'moca', 'mmse', 'dsm5'],
  },

  // ============================================================================
  // TRANSTORNOS DISSOCIATIVOS
  // ============================================================================
  
  {
    id: 'transtorno-identidade-dissociativo',
    titulo: 'Transtorno de Identidade Dissociativo',
    categoria: 'saude_mental',
    cid10: ['F44.81'],
    cid11: ['6B64'],
    ciap2: ['P79'],
    dsm5: {
      code: '300.14',
      category: DSM5_CATEGORIES.DISSOCIATIVE,
      diagnosticCriteria: {
        code: '300.14',
        name: 'Dissociative Identity Disorder',
        category: DSM5_CATEGORIES.DISSOCIATIVE,
        criteria: [
          {
            letter: 'A',
            text: 'Disrupção da identidade caracterizada por duas ou mais personalidades distintas',
          },
          {
            letter: 'B',
            text: 'Lacunas recorrentes na recordação de eventos cotidianos, informações pessoais importantes ou eventos traumáticos',
          },
        ],
      },
    },
    quickView: {
      definicao: 'Transtorno dissociativo caracterizado por disrupção da identidade com duas ou mais personalidades distintas e lacunas na memória.',
      criteriosDiagnosticos: [
        '≥2 personalidades distintas (identidades)',
        'Lacunas recorrentes na memória',
        'Causa sofrimento ou prejuízo funcional',
        'Não atribuível a substâncias ou condição médica',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Psicoterapia especializada (longo prazo)',
          'Integração de identidades',
          'Processamento de traumas',
          'Estabilização de sintomas',
        ],
        farmacologico: [
          'Medicação para sintomas específicos (depressão, ansiedade)',
          'NÃO há medicação específica para DID',
        ],
      },
      redFlags: [
        'Crises de identidade',
        'Automutilação',
        'Comportamento suicida',
        'Amnésia dissociativa grave',
      ],
    },
    criteriosEncaminhamento: [
      'Sempre encaminhar para especialista em transtornos dissociativos',
      'Primeiro diagnóstico',
      'Sintomas graves',
    ],
    tags: ['dissociativo', 'identidade', 'trauma', 'rarissimo', 'dsm5'],
  },

  // ============================================================================
  // TRANSTORNOS DE ALIMENTAÇÃO E INGESTÃO
  // ============================================================================
  
  {
    id: 'anorexia-nervosa',
    titulo: 'Anorexia Nervosa',
    categoria: 'saude_mental',
    cid10: ['F50.0'],
    cid11: ['6B80'],
    ciap2: ['P99'],
    dsm5: {
      code: '307.1',
      category: DSM5_CATEGORIES.FEEDING_EATING,
      diagnosticCriteria: {
        code: '307.1',
        name: 'Anorexia Nervosa',
        category: DSM5_CATEGORIES.FEEDING_EATING,
        criteria: [
          {
            letter: 'A',
            text: 'Restrição da ingestão de alimentos levando a peso corporal significativamente baixo',
          },
          {
            letter: 'B',
            text: 'Medo intenso de ganhar peso ou de se tornar gordo',
          },
          {
            letter: 'C',
            text: 'Perturbação na forma como o peso ou a forma do corpo são experienciados',
          },
        ],
      },
    },
    quickView: {
      definicao: 'Transtorno alimentar caracterizado por restrição alimentar, medo intenso de ganhar peso e perturbação na percepção do peso/corpo, resultando em peso significativamente baixo.',
      criteriosDiagnosticos: [
        'Restrição alimentar → peso significativamente baixo (IMC <18,5 ou peso <85% do esperado)',
        'Medo intenso de ganhar peso',
        'Perturbação na percepção do peso/corpo',
        'Tipos: Restritivo ou Compulsão periódica/Purgação',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Tratamento multidisciplinar: médico, nutricionista, psicólogo',
          'Terapia familiar (para adolescentes)',
          'Terapia cognitivo-comportamental especializada',
          'Reabilitação nutricional (supervisionada)',
        ],
        farmacologico: [
          'Olanzapina (ganho de peso, sintomas obsessivos)',
          'ISRS para comorbidades (depressão, ansiedade)',
          'Suplementação nutricional se necessário',
        ],
      },
      redFlags: [
        'IMC <15 ou perda de peso rápida',
        'Bradicardia (<50 bpm)',
        'Hipotensão ortostática',
        'Hipotermia',
        'Amenorreia',
        'Comportamento suicida',
      ],
      examesIniciais: [
        'Peso, altura, IMC',
        'Sinais vitais',
        'Hemograma, eletrólitos, função hepática e renal',
        'ECG (arritmias)',
        'Densidade óssea (osteoporose)',
      ],
    },
    criteriosEncaminhamento: [
      'IMC <15',
      'Sinais vitais instáveis',
      'Desnutrição grave',
      'Complicações médicas',
      'Falha ao tratamento ambulatorial',
    ],
    urgencia: {
      riscosuicida: true,
      criterios: ['Desnutrição grave', 'Sinais vitais instáveis', 'Complicações médicas'],
    },
    tags: ['anorexia', 'alimentar', 'restritivo', 'olanzapina', 'dsm5'],
  },

  {
    id: 'bulimia-nervosa',
    titulo: 'Bulimia Nervosa',
    categoria: 'saude_mental',
    cid10: ['F50.2'],
    cid11: ['6B81'],
    ciap2: ['P99'],
    dsm5: {
      code: '307.51',
      category: DSM5_CATEGORIES.FEEDING_EATING,
      diagnosticCriteria: {
        code: '307.51',
        name: 'Bulimia Nervosa',
        category: DSM5_CATEGORIES.FEEDING_EATING,
        criteria: [
          {
            letter: 'A',
            text: 'Episódios recorrentes de compulsão alimentar',
          },
          {
            letter: 'B',
            text: 'Comportamentos compensatórios recorrentes e inadequados para prevenir ganho de peso',
          },
          {
            letter: 'C',
            text: 'Episódios ocorrem em média pelo menos uma vez por semana por 3 meses',
          },
        ],
      },
    },
    quickView: {
      definicao: 'Transtorno alimentar caracterizado por episódios recorrentes de compulsão alimentar seguidos de comportamentos compensatórios inadequados (vômitos, laxantes, exercício excessivo).',
      criteriosDiagnosticos: [
        'Episódios recorrentes de compulsão alimentar (grande quantidade em curto período, sensação de perda de controle)',
        'Comportamentos compensatórios recorrentes: vômitos autoinduzidos, uso de laxantes/diuréticos, exercício excessivo, jejum',
        '≥1 vez/semana por ≥3 meses',
        'Autoavaliação indevidamente influenciada pela forma e peso do corpo',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'TCC especializada (TCC-BN) - padrão-ouro',
          'Terapia interpessoal (IPT)',
          'Psicoeducação nutricional',
        ],
        farmacologico: [
          'ISRS: Fluoxetina 60mg/dia (aprovado para BN)',
          'Outros ISRS em altas doses',
        ],
      },
      redFlags: [
        'Desequilíbrio eletrolítico grave',
        'Esofagite/erosão dentária',
        'Comportamento suicida',
        'Uso excessivo de laxantes',
      ],
      examesIniciais: [
        'Eletrólitos (hipocalemia, hiponatremia)',
        'Função hepática e renal',
        'Avaliação odontológica (erosão)',
      ],
    },
    tags: ['bulimia', 'compulsao', 'purga', 'fluoxetina', 'tcc', 'dsm5'],
  },

  // ============================================================================
  // TRANSTORNOS DO ESPECTRO AUTISTA
  // ============================================================================
  
  {
    id: 'transtorno-espectro-autista',
    titulo: 'Transtorno do Espectro Autista (TEA)',
    categoria: 'saude_mental',
    cid10: ['F84.0'],
    cid11: ['6A02'],
    ciap2: ['P15'],
    dsm5: {
      code: '299.00',
      category: DSM5_CATEGORIES.NEURODEVELOPMENTAL,
      diagnosticCriteria: {
        code: '299.00',
        name: 'Autism Spectrum Disorder',
        category: DSM5_CATEGORIES.NEURODEVELOPMENTAL,
        criteria: [
          {
            letter: 'A',
            text: 'Déficits persistentes na comunicação social e na interação social em múltiplos contextos',
          },
          {
            letter: 'B',
            text: 'Padrões restritos e repetitivos de comportamento, interesses ou atividades',
          },
          {
            letter: 'C',
            text: 'Sintomas presentes no início do período de desenvolvimento',
          },
        ],
        specifiers: {
          severity: ['Nível 1 (Requer suporte)', 'Nível 2 (Requer suporte substancial)', 'Nível 3 (Requer suporte muito substancial)'],
        },
      },
    },
    quickView: {
      definicao: 'Transtorno do neurodesenvolvimento caracterizado por déficits persistentes na comunicação social e interação social, e padrões restritos e repetitivos de comportamento, presentes desde o início do desenvolvimento.',
      criteriosDiagnosticos: [
        'Déficits em comunicação social: reciprocidade socioemocional, comunicação não verbal, relacionamentos',
        'Padrões restritos/repetitivos: ≥2: movimentos estereotipados, insistência na rotina, interesses fixos, hiper/hiporreatividade sensorial',
        'Sintomas presentes no início do desenvolvimento (podem não ser evidentes até demandas sociais excederem capacidades)',
        'Nível de suporte: 1 (leve), 2 (moderado), 3 (grave)',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Intervenções comportamentais precoces intensivas',
          'Análise do Comportamento Aplicada (ABA)',
          'Terapia de comunicação social',
          'Terapia ocupacional (integração sensorial)',
          'Suporte educacional especializado',
        ],
        farmacologico: [
          'Medicação para sintomas específicos:',
          '- Risperidona ou Aripiprazol (agressividade, irritabilidade)',
          '- ISRS para ansiedade/comportamento obsessivo',
          '- Estimulantes para TDAH comórbido',
        ],
      },
      redFlags: [
        'Regressão de habilidades',
        'Comportamentos autolesivos graves',
        'Agressividade',
        'Comorbidades psiquiátricas não tratadas',
      ],
      examesIniciais: [
        'Avaliação multidisciplinar: pediatra, neurologista, fonoaudiólogo, psicólogo',
        'Avaliação auditiva (excluir perda auditiva)',
        'Testes genéticos (se indicado)',
        'Escalas: ADOS, ADI-R',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'M-CHAT-R',
        description: 'Modified Checklist for Autism in Toddlers, Revised: Rastreamento para TEA em crianças 16-30 meses',
        reference: 'Robins et al., 2009',
      },
      {
        name: 'ADOS',
        description: 'Autism Diagnostic Observation Schedule: Padrão-ouro para diagnóstico de TEA',
        reference: 'Lord et al., 2012',
      },
    ],
    tags: ['autismo', 'tea', 'neurodesenvolvimento', 'aba', 'dsm5'],
  },

  // ============================================================================
  // TRANSTORNOS DO SONO
  // ============================================================================
  
  {
    id: 'narcolepsia',
    titulo: 'Narcolepsia',
    categoria: 'saude_mental',
    cid10: ['G47.4'],
    cid11: ['7A20'],
    ciap2: ['P06'],
    dsm5: {
      code: '347.00',
      category: DSM5_CATEGORIES.SLEEP_WAKE,
      diagnosticCriteria: {
        code: '347.00',
        name: 'Narcolepsy',
        category: DSM5_CATEGORIES.SLEEP_WAKE,
        criteria: [
          {
            letter: 'A',
            text: 'Episódios recorrentes de necessidade irresistível de dormir, cochilos ou lapsos no sono',
          },
          {
            letter: 'B',
            text: 'Presença de ≥1: cataplexia, baixos níveis de orexina, REM sleep latency ≤15 minutos',
          },
        ],
      },
    },
    quickView: {
      definicao: 'Transtorno do sono caracterizado por sonolência diurna excessiva, episódios irresistíveis de sono, frequentemente associado a cataplexia (perda súbita de tônus muscular).',
      criteriosDiagnosticos: [
        'Sonolência diurna excessiva ≥3 meses',
        'Episódios recorrentes de sono em situações inapropriadas',
        '≥1: cataplexia, hipocretina baixa no LCR, latência REM ≤15 min no teste múltiplo de latência do sono',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Cochilos programados (2-3/dia, 15-20 min)',
          'Higiene do sono rigorosa',
          'Suporte psicossocial',
        ],
        farmacologico: [
          'Estimulantes: Modafinil 200-400mg/dia ou Armodafinil',
          'Para cataplexia: Venlafaxina, Fluoxetina, ou Oxibato de sódio',
        ],
      },
      redFlags: [
        'Cataplexia grave com risco de quedas',
        'Alucinações hipnagógicas',
          'Paralisia do sono',
      ],
      examesIniciais: [
        'Teste múltiplo de latência do sono (MSLT)',
        'Polissonografia',
        'Dosagem de hipocretina no LCR',
      ],
    },
    tags: ['narcolepsia', 'sono', 'cataplexia', 'modafinil', 'dsm5'],
  },

  // ============================================================================
  // TRANSTORNOS RELACIONADOS A SUBSTÂNCIAS - OUTROS
  // ============================================================================
  
  {
    id: 'transtorno-uso-cannabis',
    titulo: 'Transtorno por Uso de Cannabis',
    categoria: 'saude_mental',
    cid10: ['F12'],
    cid11: ['6C41'],
    ciap2: ['P15', 'P16'],
    dsm5: {
      code: '304.30',
      category: DSM5_CATEGORIES.SUBSTANCE,
      diagnosticCriteria: {
        code: '304.30',
        name: 'Cannabis Use Disorder',
        category: DSM5_CATEGORIES.SUBSTANCE,
        criteria: [
          {
            text: 'Padrão problemático de uso de cannabis levando a prejuízo ou sofrimento clinicamente significativo, manifestado por ≥2 critérios em 12 meses',
          },
        ],
      },
    },
    quickView: {
      definicao: 'Padrão problemático de uso de cannabis levando a prejuízo ou sofrimento clinicamente significativo.',
      criteriosDiagnosticos: [
        '≥2 critérios em 12 meses: uso maior que pretendido, esforços para reduzir, muito tempo gasto, fissura, fracasso em obrigações, problemas interpessoais, abandono de atividades, uso em situações perigosas, uso apesar de problemas, tolerância, abstinência',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Entrevista motivacional',
          'TCC para uso de substâncias',
          'Terapia de manejo de contingências',
          'Grupos de apoio',
        ],
        farmacologico: [
          'Tratamento de sintomas de abstinência se necessário',
          'Naltrexona pode ajudar',
        ],
      },
      redFlags: [
        'Transtorno psicótico induzido',
        'Uso em adolescentes (maior risco de dependência)',
        'Comorbidade psiquiátrica',
      ],
      examesIniciais: [
        'Teste toxicológico',
        'Avaliação de comorbidades psiquiátricas',
      ],
    },
    tags: ['cannabis', 'maconha', 'substancia', 'tcc', 'dsm5'],
  },
];

