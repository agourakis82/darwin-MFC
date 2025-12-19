/**
 * TRANSTORNOS MENTAIS COM ONTOLOGIA DSM-5
 * Diagnostic and Statistical Manual of Mental Disorders, 5th Edition
 * 
 * Transtornos com códigos DSM-5, critérios diagnósticos e mapeamento CID-10/CID-11
 */

import type { DoencaMental } from '@/lib/types/doenca-mental';
import { DSM5_CATEGORIES } from '@/lib/types/dsm5';

// Usamos Partial para permitir construção incremental dos objetos
export const transtornosMentalDSM5: Array<Partial<DoencaMental> & { id: string; titulo: string; categoria: 'saude_mental'; cid10: string[]; ciap2: string[] }> = [
  // ============================================================================
  // TRANSTORNOS DEPRESSIVOS
  // ============================================================================
  
  {
    id: 'transtorno-depressivo-maior',
    titulo: 'Transtorno Depressivo Maior (TDM)',
    categoria: 'saude_mental',
    cid10: ['F32', 'F33'],
    cid11: ['6A70', '6A71'],
    ciap2: ['P76'],
    dsm5: {
      code: '296.33', // Recurrent episode, severe
      codeAlternative: 'F32', // CID-10 mapping
      category: 'Depressive Disorders',
      diagnosticCriteria: {
        code: '296.33',
        name: 'Major Depressive Disorder',
        category: 'Depressive Disorders',
        criteria: [
          {
            text: 'A. Cinco (ou mais) dos seguintes sintomas estiveram presentes durante o mesmo período de 2 semanas e representam uma mudança do funcionamento prévio; pelo menos um dos sintomas é (1) humor deprimido ou (2) perda de interesse ou prazer.',
          },
          {
            letter: '1',
            text: 'Humor deprimido na maior parte do dia, quase todos os dias',
          },
          {
            letter: '2',
            text: 'Acentuada diminuição de interesse ou prazer em todas ou quase todas as atividades',
          },
          {
            letter: '3',
            text: 'Perda ou ganho significativo de peso (mais de 5% do peso corporal em 1 mês)',
          },
          {
            letter: '4',
            text: 'Insônia ou hipersonia quase todos os dias',
          },
          {
            letter: '5',
            text: 'Agitação ou retardo psicomotor quase todos os dias',
          },
          {
            letter: '6',
            text: 'Fadiga ou perda de energia quase todos os dias',
          },
          {
            letter: '7',
            text: 'Sentimentos de inutilidade ou culpa excessiva ou inadequada',
          },
          {
            letter: '8',
            text: 'Capacidade diminuída de pensar ou concentrar-se, ou indecisão',
          },
          {
            letter: '9',
            text: 'Pensamentos recorrentes de morte, ideação suicida',
          },
        ],
        specifiers: {
          severity: ['Mild', 'Moderate', 'Severe', 'With Psychotic Features'],
          course: ['Single Episode', 'Recurrent'],
          episode: ['With Melancholic Features', 'With Atypical Features', 'With Catatonia'],
          remission: ['In Partial Remission', 'In Full Remission'],
        },
        exclusions: ['Substance/Medication-Induced', 'Due to Another Medical Condition'],
      },
      specifiers: {
        severity: ['Mild', 'Moderate', 'Severe', 'With Psychotic Features'],
        course: ['Single Episode', 'Recurrent'],
        episode: ['With Melancholic Features', 'With Atypical Features', 'With Catatonia'],
        remission: ['In Partial Remission', 'In Full Remission'],
        withAnxiousDistress: true,
        withMelancholicFeatures: true,
        withAtypicalFeatures: true,
        withPsychoticFeatures: true,
        withCatatonia: true,
        withPeripartumOnset: true,
        withSeasonalPattern: true,
      },
    },
    quickView: {
      definicao: 'Transtorno de humor caracterizado por episódios de humor deprimido, perda de interesse ou prazer, acompanhados de outros sintomas cognitivos, neurovegetativos e psicomotores, que causam sofrimento ou prejuízo significativo.',
      criteriosDiagnosticos: [
        'Humor deprimido ou perda de interesse/prazer',
        'Pelo menos 5 sintomas por 2 semanas',
        'Sintomas: peso, sono, psicomotor, energia, cognição, culpa, ideação suicida',
        'Prejuízo significativo no funcionamento',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Psicoterapia: TCC (terapia cognitivo-comportamental) - padrão-ouro',
          'Psicoterapia: IPT (terapia interpessoal)',
          'Ativação comportamental',
          'Exercício físico regular',
        ],
        farmacologico: [
          'ISRS: Sertralina, Escitalopram, Fluoxetina (primeira linha)',
          'ISRN: Venlafaxina, Duloxetina',
          'Antidepressivos tricíclicos: Amitriptilina (segunda linha)',
        ],
      },
      redFlags: [
        'Ideação suicida ativa',
        'Tentativa de suicídio',
        'Psicose (alucinações/delírios)',
        'Catatonia',
        'Resistência ao tratamento',
        'TDM grave com resposta insuficiente',
      ],
      examesIniciais: [
        'TSH, T4 livre (excluir hipotireoidismo)',
        'Vitamina B12, folato',
        'Hemograma completo',
        'Escala PHQ-9 ou HAM-D para avaliação',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'PHQ-9',
        description: 'Patient Health Questionnaire-9: Escala de 9 itens, pontuação 0-27. ≥10 indica depressão moderada a grave.',
        cutoff: '≥10',
        reference: 'Kroenke et al., 2001',
      },
      {
        name: 'HAM-D',
        description: 'Hamilton Depression Rating Scale: Escala clínica, pontuação 0-52. ≥17 indica depressão moderada a grave.',
        cutoff: '≥17',
        reference: 'Hamilton, 1960',
      },
    ],
    tags: ['depressao', 'humor', 'isrs', 'tcc', 'dsm5', 'saude_mental'],
  },

  // ============================================================================
  // TRANSTORNOS DE ANSIEDADE
  // ============================================================================
  
  {
    id: 'transtorno-ansiedade-generalizada',
    titulo: 'Transtorno de Ansiedade Generalizada (TAG)',
    categoria: 'saude_mental',
    cid10: ['F41.1'],
    cid11: ['6B00'],
    ciap2: ['P74'],
    dsm5: {
      code: '300.02',
      category: DSM5_CATEGORIES.ANXIETY,
      diagnosticCriteria: {
        code: '300.02',
        name: 'Generalized Anxiety Disorder',
        category: DSM5_CATEGORIES.ANXIETY,
        criteria: [
          {
            letter: 'A',
            text: 'Ansiedade e preocupação excessivas (expectativa apreensiva), ocorrendo na maioria dos dias por pelo menos 6 meses, acerca de diversos eventos ou atividades',
          },
          {
            letter: 'B',
            text: 'O indivíduo considera difícil controlar a preocupação',
          },
          {
            letter: 'C',
            text: 'A ansiedade e preocupação estão associadas com três (ou mais) dos seguintes seis sintomas:',
            subCriteria: [
              { text: '1. Inquietação ou sensação de estar com os nervos à flor da pele' },
              { text: '2. Fadigabilidade' },
              { text: '3. Dificuldade em concentrar-se ou sensações de "branco" na mente' },
              { text: '4. Irritabilidade' },
              { text: '5. Tensão muscular' },
              { text: '6. Perturbação do sono' },
            ],
          },
        ],
      },
    },
    quickView: {
      definicao: 'Transtorno caracterizado por ansiedade e preocupação excessivas e persistentes sobre diversos eventos ou atividades, difícil de controlar, associada a sintomas físicos e cognitivos.',
      criteriosDiagnosticos: [
        'Preocupação excessiva na maioria dos dias por ≥6 meses',
        'Dificuldade em controlar a preocupação',
        '3 ou mais sintomas: inquietação, fadiga, dificuldade de concentração, irritabilidade, tensão muscular, perturbação do sono',
        'Prejuízo significativo no funcionamento',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'TCC (terapia cognitivo-comportamental) - padrão-ouro',
          'Terapia de aceitação e compromisso (ACT)',
          'Mindfulness',
          'Técnicas de relaxamento',
        ],
        farmacologico: [
          'ISRS: Escitalopram, Sertralina',
          'ISRN: Venlafaxina XR',
          'Pregabalina (alternativa)',
        ],
      },
      redFlags: [
        'Ideação suicida',
        'Transtornos de ansiedade comórbidos graves',
        'Resistência ao tratamento',
        'Uso de substâncias',
      ],
      examesIniciais: [
        'TSH (excluir hipertireoidismo)',
        'Hemograma',
        'Escala GAD-7 para avaliação',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'GAD-7',
        description: 'Generalized Anxiety Disorder-7: Escala de 7 itens, pontuação 0-21. ≥10 indica TAG moderada a grave.',
        cutoff: '≥10',
        reference: 'Spitzer et al., 2006',
      },
    ],
    tags: ['ansiedade', 'tag', 'isrs', 'tcc', 'dsm5', 'saude_mental'],
  },

  {
    id: 'transtorno-panico',
    titulo: 'Transtorno de Pânico',
    categoria: 'saude_mental',
    cid10: ['F41.0'],
    cid11: ['6B01'],
    ciap2: ['P74'],
    dsm5: {
      code: '300.01',
      category: DSM5_CATEGORIES.ANXIETY,
      diagnosticCriteria: {
        code: '300.01',
        name: 'Panic Disorder',
        category: DSM5_CATEGORIES.ANXIETY,
        criteria: [
          {
            letter: 'A',
            text: 'Ataques de pânico recorrentes e inesperados',
          },
          {
            letter: 'B',
            text: 'Pelo menos um dos ataques foi seguido por 1 mês (ou mais) de uma ou ambas:',
            subCriteria: [
              { text: '1. Preocupação persistente acerca de ataques adicionais ou de suas consequências' },
              { text: '2. Mudança de comportamento mal-adaptativa significativa relacionada aos ataques' },
            ],
          },
        ],
      },
    },
    quickView: {
      definicao: 'Transtorno caracterizado por ataques de pânico recorrentes e inesperados, seguidos de preocupação persistente ou mudança comportamental mal-adaptativa.',
      criteriosDiagnosticos: [
        'Ataques de pânico recorrentes e inesperados',
        'Pelo menos 4 sintomas durante o ataque: palpitações, sudorese, tremores, falta de ar, dor torácica, náusea, tontura, desrealização, medo de perder controle, medo de morrer',
        'Preocupação persistente ou mudança comportamental por ≥1 mês',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'TCC com exposição interoceptiva',
          'Psicoeducação sobre ataques de pânico',
          'Técnicas de respiração',
        ],
        farmacologico: [
          'ISRS: Sertralina, Paroxetina, Escitalopram',
          'Alprazolam (uso curto, evitar dependência)',
        ],
      },
      redFlags: [
        'Agorafobia grave',
        'Ideação suicida',
        'Uso de substâncias',
        'Comorbidade não tratada',
      ],
      examesIniciais: [
        'ECG (excluir arritmias)',
        'TSH',
        'Glicemia de jejum',
        'Hemograma',
      ],
    },
    tags: ['panico', 'ansiedade', 'ataques', 'isrs', 'tcc', 'dsm5'],
  },

  // ============================================================================
  // TRANSTORNOS BIPOLARES
  // ============================================================================
  
  {
    id: 'transtorno-bipolar-i',
    titulo: 'Transtorno Bipolar Tipo I',
    categoria: 'saude_mental',
    cid10: ['F31'],
    cid11: ['6A60'],
    ciap2: ['P73'],
    dsm5: {
      code: '296.43', // Bipolar I, most recent episode manic, severe
      category: 'Bipolar and Related Disorders',
      diagnosticCriteria: {
        code: '296.43',
        name: 'Bipolar I Disorder',
        category: DSM5_CATEGORIES.MOOD,
        criteria: [
          {
            letter: 'A',
            text: 'Critérios para um episódio maníaco foram atendidos',
          },
          {
            letter: 'B',
            text: 'O episódio maníaco não é mais bem explicado por esquizofrenia, transtorno esquizoafetivo ou outro transtorno psicótico',
          },
        ],
      },
      specifiers: {
        severity: ['Mild', 'Moderate', 'Severe', 'With Psychotic Features'],
        course: ['Single Manic Episode', 'Most Recent Episode Manic', 'Most Recent Episode Hypomanic', 'Most Recent Episode Depressed', 'Most Recent Episode Unspecified'],
        episode: ['With Catatonia', 'With Peripartum Onset', 'With Seasonal Pattern'],
        remission: ['In Partial Remission', 'In Full Remission'],
      },
    },
    quickView: {
      definicao: 'Transtorno de humor caracterizado por pelo menos um episódio maníaco completo, frequentemente alternando com episódios depressivos maiores.',
      criteriosDiagnosticos: [
        'Pelo menos um episódio maníaco (humor elevado/irritável + 3 sintomas por ≥1 semana)',
        'Sintomas maníacos: grandiosidade, sono reduzido, loquacidade, fuga de ideias, distratibilidade, atividade aumentada, envolvimento em atividades de risco',
        'Prejuízo significativo ou necessidade de hospitalização',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Psicoeducação sobre o transtorno',
          'Terapia familiar',
          'Terapia de ritmos sociais',
        ],
        farmacologico: [
          'Estabilizadores de humor: Lítio (padrão-ouro)',
          'Anticonvulsivantes: Valproato, Carbamazepina',
          'Antipsicóticos atípicos: Quetiapina, Olanzapina',
        ],
      },
      redFlags: [
        'Episódio maníaco grave com psicose',
        'Risco suicida durante depressão',
        'Não adesão ao tratamento',
        'Crises recorrentes',
      ],
    },
    criteriosEncaminhamento: [
      'Primeiro episódio maníaco',
      'Episódio maníaco grave ou com psicose',
      'Risco suicida',
      'Necessidade de ajuste de lítio',
      'Crises recorrentes apesar do tratamento',
    ],
    urgencia: {
      riscosuicida: true,
      riscoAgressao: true,
      criterios: ['Episódio maníaco grave', 'Psicose', 'Risco de autolesão'],
    },
    tags: ['bipolar', 'mania', 'depressao', 'lítio', 'estabilizadores', 'dsm5'],
  },

  // ============================================================================
  // TRANSTORNOS PSICÓTICOS
  // ============================================================================
  
  {
    id: 'esquizofrenia',
    titulo: 'Esquizofrenia',
    categoria: 'saude_mental',
    cid10: ['F20'],
    cid11: ['6A20'],
    ciap2: ['P72'],
    dsm5: {
      code: '295.90',
      category: 'Schizophrenia Spectrum and Other Psychotic Disorders',
      diagnosticCriteria: {
        code: '295.90',
        name: 'Schizophrenia',
        category: DSM5_CATEGORIES.SCHIZOPHRENIA_SPECTRUM,
        criteria: [
          {
            letter: 'A',
            text: 'Dois (ou mais) dos seguintes, cada um presente por uma porção significativa de tempo durante 1 mês (ou menos se tratado com sucesso):',
            subCriteria: [
              { text: '1. Delírios' },
              { text: '2. Alucinações' },
              { text: '3. Discurso desorganizado' },
              { text: '4. Comportamento grosseiramente desorganizado ou catatônico' },
              { text: '5. Sintomas negativos (embotamento afetivo, abulia)' },
            ],
          },
          {
            letter: 'B',
            text: 'Nível de funcionamento está significativamente abaixo do nível pré-mórbido',
          },
          {
            letter: 'C',
            text: 'Sinais contínuos da perturbação persistem por pelo menos 6 meses',
          },
        ],
      },
    },
    quickView: {
      definicao: 'Transtorno psicótico crônico caracterizado por sintomas positivos (delírios, alucinações, desorganização) e negativos (embotamento afetivo, abulia), com prejuízo significativo no funcionamento.',
      criteriosDiagnosticos: [
        '2 ou mais sintomas por ≥1 mês: delírios, alucinações, discurso desorganizado, comportamento desorganizado/catatônico, sintomas negativos',
        'Prejuízo significativo no funcionamento',
        'Sinais contínuos por ≥6 meses',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Psicoeducação',
          'Terapia cognitivo-comportamental para psicose (TCCp)',
          'Terapia familiar',
          'Reabilitação psicossocial',
        ],
        farmacologico: [
          'Antipsicóticos de segunda geração: Risperidona, Olanzapina, Quetiapina',
          'Antipsicóticos de primeira geração: Haloperidol (alternativa)',
        ],
      },
      redFlags: [
        'Primeiro episódio psicótico',
        'Agitação psicomotora grave',
        'Risco de agressão ou suicídio',
        'Catatonia',
        'Resistência ao tratamento',
      ],
    },
    criteriosEncaminhamento: [
      'Primeiro episódio psicótico',
      'Agitação grave ou catatonia',
      'Risco de agressão ou suicídio',
      'Necessidade de ajuste de antipsicóticos',
      'Crises recorrentes',
    ],
    urgencia: {
      riscosuicida: true,
      riscoAgressao: true,
      criterios: ['Primeiro episódio psicótico', 'Agitação grave', 'Catatonia'],
    },
    escalasAvaliacao: [
      {
        name: 'PANSS',
        description: 'Positive and Negative Syndrome Scale: Escala completa para avaliar sintomas positivos, negativos e gerais da esquizofrenia.',
        reference: 'Kay et al., 1987',
      },
    ],
    tags: ['esquizofrenia', 'psicose', 'antipsicoticos', 'dsm5', 'saude_mental'],
  },

  // ============================================================================
  // TRANSTORNOS RELACIONADOS A TRAUMA E ESTRESSE
  // ============================================================================
  
  {
    id: 'transtorno-estresse-pos-traumatico',
    titulo: 'Transtorno de Estresse Pós-Traumático (TEPT)',
    categoria: 'saude_mental',
    cid10: ['F43.1'],
    cid11: ['6B40'],
    ciap2: ['P74'],
    dsm5: {
      code: '309.81',
      category: DSM5_CATEGORIES.TRAUMA_STRESS,
      diagnosticCriteria: {
        code: '309.81',
        name: 'Posttraumatic Stress Disorder',
        category: DSM5_CATEGORIES.TRAUMA_STRESS,
        criteria: [
          {
            letter: 'A',
            text: 'Exposição a morte real ou ameaçada, lesão grave ou violência sexual',
          },
          {
            letter: 'B',
            text: 'Presença de um (ou mais) dos seguintes sintomas de intrusão:',
            subCriteria: [
              { text: '1. Memórias angustiantes recorrentes' },
              { text: '2. Sonhos angustiantes recorrentes' },
              { text: '3. Reações dissociativas' },
              { text: '4. Angústia psicológica ou fisiológica intensa' },
            ],
          },
          {
            letter: 'C',
            text: 'Evitação persistente de estímulos associados ao trauma',
          },
          {
            letter: 'D',
            text: 'Alterações negativas em cognições e humor',
          },
          {
            letter: 'E',
            text: 'Alterações marcantes em excitação e reatividade',
          },
        ],
      },
    },
    quickView: {
      definicao: 'Transtorno que se desenvolve após exposição a evento traumático grave, caracterizado por sintomas de intrusão, evitação, alterações cognitivas/mood e hiperexcitação.',
      criteriosDiagnosticos: [
        'Exposição a trauma (morte, lesão grave, violência)',
        'Sintomas de intrusão: memórias, sonhos, flashbacks',
        'Evitação persistente',
        'Alterações cognitivas/mood negativas',
        'Hiperexcitação e reatividade',
        'Duração >1 mês',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'TEPT-F (terapia focada em trauma): EMDR, terapia de exposição prolongada',
          'TCC com exposição',
          'Terapia cognitiva para TEPT',
        ],
        farmacologico: [
          'ISRS: Sertralina, Paroxetina (aprovados pelo FDA)',
          'ISRN: Venlafaxina',
          'Prazosina (para pesadelos)',
        ],
      },
      redFlags: [
        'Risco suicida',
        'Uso de substâncias',
        'Comorbidade grave',
        'TEPT crônico não responsivo',
      ],
      examesIniciais: [
        'Avaliação de risco suicida',
        'Rastreamento de uso de substâncias',
        'Escala PCL-5 para avaliação',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'PCL-5',
        description: 'PTSD Checklist for DSM-5: Escala de 20 itens, pontuação 0-80. ≥33 indica provável TEPT.',
        cutoff: '≥33',
        reference: 'Weathers et al., 2013',
      },
    ],
    tags: ['tept', 'trauma', 'estresse', 'emdr', 'isrs', 'dsm5'],
  },

  // ============================================================================
  // TRANSTORNOS OBSESSIVO-COMPULSIVOS
  // ============================================================================
  
  {
    id: 'transtorno-obsessivo-compulsivo',
    titulo: 'Transtorno Obsessivo-Compulsivo (TOC)',
    categoria: 'saude_mental',
    cid10: ['F42'],
    cid11: ['6B20'],
    ciap2: ['P79'],
    dsm5: {
      code: '300.3',
      category: 'Obsessive-Compulsive and Related Disorders',
      diagnosticCriteria: {
        code: '300.3',
        name: 'Obsessive-Compulsive Disorder',
        category: DSM5_CATEGORIES.OBSESSIVE_COMPULSIVE,
        criteria: [
          {
            letter: 'A',
            text: 'Presença de obsessões, compulsões ou ambas',
          },
          {
            letter: 'B',
            text: 'As obsessões ou compulsões consomem tempo (mais de 1 hora por dia) ou causam sofrimento ou prejuízo significativo',
          },
        ],
      },
    },
    quickView: {
      definicao: 'Transtorno caracterizado por obsessões (pensamentos, impulsos ou imagens recorrentes e persistentes) e/ou compulsões (comportamentos ou atos mentais repetitivos) que consomem tempo ou causam sofrimento significativo.',
      criteriosDiagnosticos: [
        'Obsessões: pensamentos, impulsos ou imagens recorrentes e persistentes, intrusivos e indesejados',
        'Compulsões: comportamentos ou atos mentais repetitivos em resposta a obsessões',
        'Consomem >1 hora/dia ou causam sofrimento/prejuízo significativo',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'TCC com prevenção de resposta e exposição (ERP) - padrão-ouro',
          'Terapia de aceitação e compromisso (ACT)',
        ],
        farmacologico: [
          'ISRS em altas doses: Sertralina (≥200mg), Fluoxetina (≥60mg), Fluvoxamina',
          'Clomipramina (antidepressivo tricíclico, segunda linha)',
        ],
      },
      redFlags: [
        'TOC grave com prejuízo funcional severo',
        'Ideação suicida',
        'Comorbidade não tratada',
        'Resistência ao tratamento',
      ],
      examesIniciais: [
        'Avaliação de funcionamento',
        'Escala Y-BOCS para avaliação',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'Y-BOCS',
        description: 'Yale-Brown Obsessive Compulsive Scale: Escala de 10 itens, pontuação 0-40. ≥16 indica TOC moderado a grave.',
        cutoff: '≥16',
        reference: 'Goodman et al., 1989',
      },
    ],
    tags: ['toc', 'obsessivo', 'compulsivo', 'erp', 'isrs', 'dsm5'],
  },
];

