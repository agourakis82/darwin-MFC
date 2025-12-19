/**
 * TRANSTORNOS MENTAIS DSM-5 - EXPANSÃO
 * Mais transtornos mentais com ontologia DSM-5 completa
 */

import type { DoencaMental } from '@/lib/types/doenca-mental';
import { DSM5_CATEGORIES } from '@/lib/types/dsm5';

export const transtornosMentalDSM5Expansao: Array<Partial<DoencaMental> & Pick<DoencaMental, 'id' | 'titulo' | 'categoria' | 'cid10' | 'ciap2'>> = [
  // ============================================================================
  // TRANSTORNOS DEPRESSIVOS (continuação)
  // ============================================================================
  
  {
    id: 'transtorno-distimico',
    titulo: 'Transtorno Depressivo Persistente (Distimia)',
    categoria: 'saude_mental',
    cid10: ['F34.1'],
    cid11: ['6A71'],
    ciap2: ['P76'],
    dsm5: {
      code: '300.4',
      category: DSM5_CATEGORIES.DEPRESSIVE,
      diagnosticCriteria: {
        code: '300.4',
        name: 'Persistent Depressive Disorder (Dysthymia)',
        category: DSM5_CATEGORIES.DEPRESSIVE,
        criteria: [
          {
            letter: 'A',
            text: 'Humor deprimido na maior parte do dia, na maioria dos dias, indicado por relato subjetivo ou observação de outros, por pelo menos 2 anos',
          },
          {
            letter: 'B',
            text: 'Presença, enquanto deprimido, de dois (ou mais) dos seguintes:',
            subCriteria: [
              { text: '1. Apetite diminuído ou excessivo' },
              { text: '2. Insônia ou hipersonia' },
              { text: '3. Baixa energia ou fadiga' },
              { text: '4. Baixa autoestima' },
              { text: '5. Dificuldade de concentração ou para tomar decisões' },
              { text: '6. Sentimentos de desesperança' },
            ],
          },
        ],
      },
    },
    quickView: {
      definicao: 'Transtorno depressivo crônico caracterizado por humor deprimido persistente por ≥2 anos, com sintomas menos intensos que o TDM, mas com impacto funcional significativo.',
      criteriosDiagnosticos: [
        'Humor deprimido na maior parte do dia, ≥2 anos',
        '≥2 sintomas: apetite, sono, energia, autoestima, concentração, desesperança',
        'Sem período livre de sintomas >2 meses',
        'Prejuízo funcional significativo',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Psicoterapia: TCC, IPT',
          'Ativação comportamental',
          'Exercício físico',
        ],
        farmacologico: [
          'ISRS: Sertralina, Escitalopram',
          'ISRN: Venlafaxina',
        ],
      },
      redFlags: [
        'TDM superposto',
        'Ideação suicida',
        'Resistência ao tratamento',
      ],
      examesIniciais: ['TSH', 'PHQ-9'],
    },
    tags: ['distimia', 'depressao', 'cronica', 'isrs', 'tcc', 'dsm5'],
  },

  // ============================================================================
  // TRANSTORNOS BIPOLARES (continuação)
  // ============================================================================
  
  {
    id: 'transtorno-bipolar-ii',
    titulo: 'Transtorno Bipolar Tipo II',
    categoria: 'saude_mental',
    cid10: ['F31.8'],
    cid11: ['6A60'],
    ciap2: ['P73'],
    dsm5: {
      code: '296.89',
      category: DSM5_CATEGORIES.MOOD,
      diagnosticCriteria: {
        code: '296.89',
        name: 'Bipolar II Disorder',
        category: DSM5_CATEGORIES.MOOD,
        criteria: [
          {
            letter: 'A',
            text: 'Critérios para um episódio hipomaníaco atual ou passado E para um episódio depressivo maior atual ou passado foram atendidos',
          },
          {
            letter: 'B',
            text: 'Nunca houve um episódio maníaco',
          },
        ],
      },
    },
    quickView: {
      definicao: 'Transtorno de humor caracterizado por pelo menos um episódio hipomaníaco e um episódio depressivo maior, sem história de episódio maníaco completo.',
      criteriosDiagnosticos: [
        'Episódio hipomaníaco: humor elevado/irritável + 3 sintomas por ≥4 dias, sem prejuízo funcional marcante',
        'Episódio depressivo maior: presente ou passado',
        'Nunca houve episódio maníaco completo',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Psicoeducação',
          'Terapia familiar',
          'Regulação de ritmos sociais',
        ],
        farmacologico: [
          'Lítio ou Lamotrigina (prevenção de episódios)',
          'Quetiapina (episódio depressivo)',
          'Evitar antidepressivos isolados (risco de virada maníaca)',
        ],
      },
      redFlags: [
        'Risco de virada maníaca com antidepressivos',
        'Risco suicida durante depressão',
        'Crises recorrentes',
      ],
    },
    criteriosEncaminhamento: [
      'Primeiro episódio hipomaníaco',
      'Depressão grave',
      'Risco suicida',
      'Necessidade de ajuste de estabilizadores',
    ],
    urgencia: {
      riscosuicida: true,
      criterios: ['Depressão grave', 'Risco de virada maníaca'],
    },
    tags: ['bipolar', 'hipomania', 'depressao', 'lítio', 'lamotrigina', 'dsm5'],
  },

  // ============================================================================
  // TRANSTORNOS DE ANSIEDADE (continuação)
  // ============================================================================
  
  {
    id: 'fobia-social',
    titulo: 'Fobia Social (Transtorno de Ansiedade Social)',
    categoria: 'saude_mental',
    cid10: ['F40.1'],
    cid11: ['6B04'],
    ciap2: ['P74'],
    dsm5: {
      code: '300.23',
      category: DSM5_CATEGORIES.ANXIETY,
      diagnosticCriteria: {
        code: '300.23',
        name: 'Social Anxiety Disorder (Social Phobia)',
        category: DSM5_CATEGORIES.ANXIETY,
        criteria: [
          {
            letter: 'A',
            text: 'Medo ou ansiedade marcante acerca de uma ou mais situações sociais nas quais o indivíduo está exposto à possível avaliação por outros',
          },
          {
            letter: 'B',
            text: 'O indivíduo teme que vai agir de modo a mostrar sintomas de ansiedade que serão avaliados negativamente',
          },
          {
            letter: 'C',
            text: 'As situações sociais quase sempre provocam medo ou ansiedade',
          },
          {
            letter: 'D',
            text: 'As situações sociais são evitadas ou suportadas com intenso medo ou ansiedade',
          },
        ],
      },
    },
    quickView: {
      definicao: 'Transtorno de ansiedade caracterizado por medo ou ansiedade marcante em situações sociais onde o indivíduo está exposto à possível avaliação por outros.',
      criteriosDiagnosticos: [
        'Medo ou ansiedade marcante em situações sociais',
        'Medo de ser avaliado negativamente',
        'Situações sociais quase sempre provocam medo/ansiedade',
        'Evitação ou suporte com intenso medo/ansiedade',
        'Duração ≥6 meses',
        'Prejuízo funcional significativo',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'TCC com exposição - padrão-ouro',
          'Treinamento de habilidades sociais',
          'Terapia de grupo',
        ],
        farmacologico: [
          'ISRS: Paroxetina, Sertralina, Escitalopram',
          'ISRN: Venlafaxina XR',
        ],
      },
      redFlags: [
        'Evitação severa com isolamento social',
        'Comorbidade depressiva',
        'Uso de substâncias para enfrentar situações',
      ],
      examesIniciais: ['Avaliação funcional', 'Escala LSAS'],
    },
    escalasAvaliacao: [
      {
        name: 'LSAS',
        description: 'Liebowitz Social Anxiety Scale: Escala de 24 itens para avaliar fobia social.',
        reference: 'Liebowitz, 1987',
      },
    ],
    tags: ['fobia-social', 'ansiedade', 'tcc', 'isrs', 'dsm5'],
  },

  {
    id: 'agorafobia',
    titulo: 'Agorafobia',
    categoria: 'saude_mental',
    cid10: ['F40.0'],
    cid11: ['6B02'],
    ciap2: ['P74'],
    dsm5: {
      code: '300.22',
      category: DSM5_CATEGORIES.ANXIETY,
      diagnosticCriteria: {
        code: '300.22',
        name: 'Agoraphobia',
        category: DSM5_CATEGORIES.ANXIETY,
        criteria: [
          {
            letter: 'A',
            text: 'Medo ou ansiedade marcante acerca de duas (ou mais) das seguintes situações:',
            subCriteria: [
              { text: '1. Uso de transporte público' },
              { text: '2. Estar em espaços abertos' },
              { text: '3. Estar em locais fechados' },
              { text: '4. Estar em uma multidão ou em uma fila' },
              { text: '5. Estar fora de casa sozinho' },
            ],
          },
          {
            letter: 'B',
            text: 'O indivíduo evita essas situações por medo de não conseguir escapar ou de não receber ajuda',
          },
        ],
      },
    },
    quickView: {
      definicao: 'Transtorno de ansiedade caracterizado por medo ou ansiedade marcante em situações onde escapar pode ser difícil ou onde ajuda pode não estar disponível em caso de sintomas de pânico ou outros sintomas incapacitantes.',
      criteriosDiagnosticos: [
        'Medo/ansiedade marcante em ≥2 situações: transporte público, espaços abertos, locais fechados, multidão, fora de casa sozinho',
        'Evitação por medo de não conseguir escapar ou não receber ajuda',
        'Duração ≥6 meses',
        'Prejuízo funcional significativo',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'TCC com exposição gradual - padrão-ouro',
          'Psicoeducação',
          'Técnicas de respiração',
        ],
        farmacologico: [
          'ISRS: Sertralina, Paroxetina',
          'ISRN: Venlafaxina',
        ],
      },
      redFlags: [
        'Isolamento domiciliar',
        'Comorbidade com pânico',
        'Prejuízo funcional grave',
      ],
      examesIniciais: ['Avaliação funcional'],
    },
    tags: ['agorafobia', 'ansiedade', 'tcc', 'isrs', 'dsm5'],
  },

  // ============================================================================
  // TRANSTORNOS DE PERSONALIDADE (principais)
  // ============================================================================
  
  {
    id: 'transtorno-personalidade-borderline',
    titulo: 'Transtorno de Personalidade Borderline',
    categoria: 'saude_mental',
    cid10: ['F60.3'],
    cid11: ['6D10'],
    ciap2: ['P79'],
    dsm5: {
      code: '301.83',
      category: DSM5_CATEGORIES.PERSONALITY,
      diagnosticCriteria: {
        code: '301.83',
        name: 'Borderline Personality Disorder',
        category: DSM5_CATEGORIES.PERSONALITY,
        criteria: [
          {
            text: 'Um padrão difuso de instabilidade nos relacionamentos interpessoais, autoimagem e afetos, e marcante impulsividade, começando no início da idade adulta e presente em vários contextos, conforme indicado por cinco (ou mais) dos seguintes:',
            subCriteria: [
              { text: '1. Esforços frenéticos para evitar abandono real ou imaginado' },
              { text: '2. Padrão de relacionamentos interpessoais instáveis e intensos caracterizado por alternância entre extremos de idealização e desvalorização' },
              { text: '3. Perturbação da identidade: instabilidade acentuada e persistente da autoimagem ou do senso de self' },
              { text: '4. Impulsividade em pelo menos duas áreas que são potencialmente autodestrutivas' },
              { text: '5. Recorrência de comportamento, gestos ou ameaças suicidas ou comportamento automutilante' },
              { text: '6. Instabilidade afetiva devido a marcante reatividade do humor' },
              { text: '7. Sentimentos crônicos de vazio' },
              { text: '8. Raiva intensa e inapropriada ou dificuldade em controlar a raiva' },
              { text: '9. Ideação paranoide transitória relacionada ao estresse ou sintomas dissociativos graves' },
            ],
          },
        ],
      },
    },
    quickView: {
      definicao: 'Transtorno de personalidade caracterizado por instabilidade marcante nos relacionamentos, autoimagem e afetos, com impulsividade e comportamentos autodestrutivos.',
      criteriosDiagnosticos: [
        '≥5 dos 9 critérios: esforços para evitar abandono, relacionamentos instáveis, perturbação da identidade, impulsividade, comportamento suicida/automutilante, instabilidade afetiva, sentimento de vazio, raiva intensa, sintomas dissociativos/paranoides',
        'Início no início da idade adulta',
        'Presente em vários contextos',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'DBT (Dialectical Behavior Therapy) - padrão-ouro',
          'TCC especializada',
          'Terapia de esquemas',
          'Terapia de grupo',
        ],
        farmacologico: [
          'Medicação para sintomas específicos:',
          '- ISRS para instabilidade afetiva',
          '- Antipsicóticos atípicos em baixa dose para sintomas cognitivos',
          '- Estabilizadores de humor para impulsividade',
        ],
      },
      redFlags: [
        'Risco suicida alto',
        'Comportamento autolesivo',
        'Comorbidade com outros transtornos',
      ],
    },
    criteriosEncaminhamento: [
      'Primeiro diagnóstico',
      'Risco suicida',
      'Comportamento autolesivo grave',
      'Necessidade de DBT especializada',
    ],
    urgencia: {
      riscosuicida: true,
      riscoAutolesao: true,
      criterios: ['Comportamento suicida', 'Automutilação', 'Crises agudas'],
    },
    tags: ['borderline', 'personalidade', 'dbt', 'instabilidade', 'dsm5'],
  },

  // ============================================================================
  // TRANSTORNOS DE SUBSTÂNCIAS
  // ============================================================================
  
  {
    id: 'transtorno-uso-alcool',
    titulo: 'Transtorno por Uso de Álcool',
    categoria: 'saude_mental',
    cid10: ['F10'],
    cid11: ['6C40'],
    ciap2: ['P15', 'P16'],
    dsm5: {
      code: '305.00', // Mild
      category: DSM5_CATEGORIES.SUBSTANCE,
      diagnosticCriteria: {
        code: '305.00',
        name: 'Alcohol Use Disorder',
        category: DSM5_CATEGORIES.SUBSTANCE,
        criteria: [
          {
            text: 'Um padrão problemático de uso de álcool levando a prejuízo ou sofrimento clinicamente significativo, manifestado por pelo menos dois dos seguintes, ocorrendo em um período de 12 meses:',
            subCriteria: [
              { text: '1. Álcool frequentemente consumido em quantidades maiores ou por período mais longo que o pretendido' },
              { text: '2. Desejo persistente ou esforços malsucedidos de reduzir ou controlar o uso de álcool' },
              { text: '3. Muito tempo gasto em atividades necessárias para obter álcool, usá-lo ou se recuperar de seus efeitos' },
              { text: '4. Fissura (craving) ou forte desejo ou impulso para usar álcool' },
              { text: '5. Uso recorrente de álcool resultando em fracasso em cumprir obrigações principais' },
              { text: '6. Uso continuado apesar de problemas sociais ou interpessoais persistentes ou recorrentes' },
              { text: '7. Importantes atividades sociais, ocupacionais ou recreativas abandonadas ou reduzidas' },
              { text: '8. Uso recorrente em situações em que é fisicamente perigoso' },
              { text: '9. Uso continuado apesar de conhecimento de problema físico ou psicológico' },
              { text: '10. Tolerância (definida por qualquer um dos seguintes):',
                subCriteria: [
                  { text: 'a) Necessidade de quantidades progressivamente maiores para alcançar intoxicação ou efeito desejado' },
                  { text: 'b) Efeito marcadamente diminuído com uso continuado da mesma quantidade' },
                ],
              },
              { text: '11. Abstinência (definida por qualquer um dos seguintes):',
                subCriteria: [
                  { text: 'a) Síndrome de abstinência característica' },
                  { text: 'b) Álcool (ou substância relacionada) é consumido para aliviar ou evitar sintomas de abstinência' },
                ],
              },
            ],
          },
        ],
        specifiers: {
          severity: ['Mild (2-3 sintomas)', 'Moderate (4-5 sintomas)', 'Severe (6+ sintomas)'],
          course: ['Early Remission', 'Sustained Remission', 'On Maintenance Therapy', 'In a Controlled Environment'],
        },
      },
    },
    quickView: {
      definicao: 'Transtorno caracterizado por padrão problemático de uso de álcool levando a prejuízo ou sofrimento clinicamente significativo, manifestado por ≥2 critérios em 12 meses.',
      criteriosDiagnosticos: [
        '≥2 critérios em 12 meses:',
        'Consumo maior que pretendido, esforços para reduzir, muito tempo gasto, fissura, fracasso em obrigações, problemas interpessoais, abandono de atividades, uso em situações perigosas, uso apesar de problemas, tolerância, abstinência',
        'Gravidade: Leve (2-3), Moderada (4-5), Grave (6+)',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Entrevista motivacional',
          'Terapia cognitivo-comportamental',
          'Grupos de apoio (AA)',
          'Prevenção de recaída',
        ],
        farmacologico: [
          'Desintoxicação se necessário (benzodiazepínicos para abstinência)',
          'Prevenção de recaída: Naltrexona, Acamprosato',
          'Deterrência: Dissulfiram',
        ],
      },
      redFlags: [
        'Abstinência grave com risco de convulsões',
        'Delirium tremens',
        'Hepatopatia alcoólica',
        'Pancreatite',
        'Wernicke-Korsakoff',
      ],
      examesIniciais: [
        'AST, ALT, GGT',
        'Bilirrubina',
        'Hemograma completo',
        'AUDIT (Alcohol Use Disorders Identification Test)',
      ],
    },
    criteriosEncaminhamento: [
      'Transtorno grave',
      'Abstinência grave',
      'Delirium tremens',
      'Complicações clínicas',
      'Resistência ao tratamento ambulatorial',
    ],
    urgencia: {
      riscosuicida: true,
      criterios: ['Abstinência grave', 'Delirium tremens', 'Complicações clínicas'],
    },
    escalasAvaliacao: [
      {
        name: 'AUDIT',
        description: 'Alcohol Use Disorders Identification Test: Escala de 10 itens para rastreamento de uso problemático de álcool.',
        cutoff: '≥8 indica uso problemático',
        reference: 'WHO, 2001',
      },
    ],
    tags: ['alcool', 'substancia', 'adiccao', 'naltrexona', 'dsm5'],
  },
];

