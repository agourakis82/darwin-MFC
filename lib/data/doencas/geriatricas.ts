/**
 * SÍNDROMES GERIÁTRICAS - DARWIN-MFC
 * ===================================
 * Condições comuns na população idosa na APS
 * 
 * Nota: fullContent será expandido em versão futura
 */

import { Doenca } from '../../types/doenca';

export const doencasGeriatricas: Partial<Doenca>[] = [
  {
    id: 'sindrome-fragilidade',
    titulo: 'Síndrome de Fragilidade',
    ciap2: ['A04'],
    cid10: ['R54'],
    cid11: ['MG2A'],
    categoria: 'outros',
    doid: 'DOID:0080429',
    snomedCT: '248279007',
    meshId: 'D000073496',
    umlsCui: 'C0424594',
    quickView: {
      definicao: 'Síndrome geriátrica de vulnerabilidade aumentada a estressores por declínio de reservas fisiológicas. Prevalência de 10-15% em >65 anos.',
      criteriosDiagnosticos: [
        'Fenótipo de Fried: ≥3 critérios = frágil, 1-2 = pré-frágil',
        'Perda de peso não intencional >4,5kg/ano',
        'Exaustão autorrelatada',
        'Baixa atividade física',
        'Lentidão de marcha',
        'Fraqueza (grip strength)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Exercício multicomponente (resistência + equilíbrio)', 'Intervenção nutricional proteica', 'Avaliação geriátrica ampla'],
        farmacologico: ['Vitamina D se deficiência', 'Revisão e desprescrição de medicamentos']
      },
      redFlags: ['Quedas recorrentes', 'Perda de peso significativa', 'Hospitalizações frequentes', 'Declínio funcional rápido']
    },
    medicamentos: ['vitamina-d'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'delirium',
    titulo: 'Delirium (Estado Confusional Agudo)',
    ciap2: ['P71'],
    cid10: ['F05'],
    cid11: ['6D70'],
    categoria: 'neurologico',
    doid: 'DOID:0060164',
    snomedCT: '2776000',
    meshId: 'D003693',
    umlsCui: 'C0011206',
    quickView: {
      definicao: 'Síndrome neuropsiquiátrica aguda com alteração de atenção e consciência de curso flutuante. 10-30% dos idosos hospitalizados.',
      criteriosDiagnosticos: [
        'CAM: início agudo + curso flutuante',
        'Desatenção (não mantém conversa)',
        'Pensamento desorganizado OU alteração de consciência',
        'Flutuação ao longo do dia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Identificar e tratar causa subjacente', 'Reorientação repetida', 'Presença de familiar', 'Minimizar contenção'],
        farmacologico: ['Haloperidol 0,5-1mg APENAS se agitação grave', 'Evitar benzodiazepínicos']
      },
      redFlags: ['Febre alta', 'Sinais neurológicos focais', 'Hipóxia', 'Hipoglicemia', 'Abstinência alcoólica']
    },
    medicamentos: ['haloperidol'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'incontinencia-urinaria-idoso',
    titulo: 'Incontinência Urinária no Idoso',
    ciap2: ['U04'],
    cid10: ['N39.4'],
    cid11: ['MF50'],
    categoria: 'outros',
    doid: 'DOID:13580',
    snomedCT: '165232002',
    meshId: 'D014549',
    umlsCui: 'C0042024',
    quickView: {
      definicao: 'Perda involuntária de urina causando impacto social ou higiênico. 30-50% dos idosos na comunidade.',
      criteriosDiagnosticos: [
        'Identificar tipo: urgência, esforço, mista, funcional',
        'Diário miccional',
        'Teste de esforço positivo',
        'Resíduo pós-miccional'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Exercícios de Kegel (assoalho pélvico)', 'Treinamento vesical', 'Micção programada', 'Reduzir cafeína'],
        farmacologico: ['Oxibutinina ou Tolterodina (urgência)', 'Mirabegrona (alternativa)', 'Cuidado com anticolinérgicos em idosos']
      },
      redFlags: ['Hematúria', 'Dor pélvica', 'Infecção urinária recorrente', 'Retenção urinária']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'quedas-idoso',
    titulo: 'Síndrome de Quedas no Idoso',
    ciap2: ['A29'],
    cid10: ['W19'],
    cid11: ['NE01'],
    categoria: 'outros',
    doid: 'DOID:14002',
    snomedCT: '56307009',
    meshId: 'D000058',
    umlsCui: 'C0000921',
    quickView: {
      definicao: 'Evento não intencional de deslocamento ao solo. 30% dos >65 anos caem/ano. Principal causa de morte traumática em idosos.',
      criteriosDiagnosticos: [
        '≥2 quedas em 12 meses = alto risco',
        'Timed Up and Go >12 segundos',
        'História detalhada da queda',
        'Avaliação de marcha e equilíbrio'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Exercícios de equilíbrio (Tai Chi)', 'Correção visual', 'Adaptação ambiental', 'Calçados adequados'],
        farmacologico: ['Vitamina D 800-1000UI/dia', 'Revisar sedativos e anti-hipertensivos']
      },
      redFlags: ['Queda com fratura', 'Lesão de cabeça', 'Síncope associada', 'Queda recorrente']
    },
    medicamentos: ['vitamina-d'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'polifarmacia',
    titulo: 'Polifarmácia no Idoso',
    ciap2: ['A97'],
    cid10: ['Y57.9'],
    cid11: ['NE60'],
    categoria: 'outros',
    doid: 'DOID:0111688',
    snomedCT: '182929008',
    meshId: 'D019338',
    umlsCui: 'C0032269',
    quickView: {
      definicao: 'Uso simultâneo de ≥5 medicamentos. 40% dos idosos >65 anos. Principal causa de eventos adversos evitáveis.',
      criteriosDiagnosticos: [
        'Contagem de medicamentos ≥5',
        'Identificar MPI via Beers ou STOPP/START',
        'Avaliar cascata de prescrição',
        'Reconciliação medicamentosa'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Reconciliação medicamentosa', 'Aplicar STOPP/START', 'Desprescrição gradual supervisionada', 'Envolver paciente e família'],
        farmacologico: ['Não há - o tratamento É a desprescrição']
      },
      redFlags: ['Reações adversas', 'Quedas', 'Declínio cognitivo', 'Não adesão', 'Piora funcional']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },
  // ===============================================
  // SÍNDROMES GERIÁTRICAS ADICIONAIS
  // ===============================================
  {
    id: 'demencia',
    titulo: 'Demência (Transtorno Neurocognitivo Maior)',
    ciap2: ['P70'],
    cid10: ['F00', 'F01', 'F02', 'F03', 'G30'],
    cid11: ['6D80', '6D81', '6D82', '8A20'],
    categoria: 'neurologico',
    doid: 'DOID:1307',
    snomedCT: '52448006',
    meshId: 'D003704',
    umlsCui: 'C0497327',
    quickView: {
      definicao: 'Síndrome de declínio cognitivo progressivo com prejuízo funcional. Alzheimer é a causa mais comum (60-70%). Prevalência dobra a cada 5 anos após 65.',
      criteriosDiagnosticos: [
        'Declínio cognitivo em ≥2 domínios',
        'Prejuízo funcional (AVDs)',
        'Não explicado por delirium',
        'Não explicado por transtorno psiquiátrico',
        'MEEM <24 (ajustar escolaridade)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Estimulação cognitiva', 'Atividade física', 'Suporte ao cuidador', 'Segurança ambiental'],
        farmacologico: [
          'Inibidores colinesterase (donepezila 5-10mg) - leve a moderada',
          'Memantina (moderada a grave)',
          'Evitar anticolinérgicos'
        ]
      },
      redFlags: ['Declínio rápido (<6 meses)', 'Sinais focais', 'Início <65 anos', 'Alteração de personalidade precoce']
    },
    medicamentos: ['donepezila'],
    protocolos: [],
    calculadoras: ['meem']
  },
  {
    id: 'sarcopenia',
    titulo: 'Sarcopenia',
    ciap2: ['L29'],
    cid10: ['M62.84'],
    cid11: ['FB32.3'],
    categoria: 'musculoesqueletico',
    doid: 'DOID:0081310',
    snomedCT: '1172655006',
    meshId: 'D055948',
    umlsCui: 'C0872084',
    quickView: {
      definicao: 'Perda progressiva de massa e força muscular esquelética com o envelhecimento. Prevalência 5-13% em 60-70 anos, até 50% em >80 anos.',
      criteriosDiagnosticos: [
        'EWGSOP2: força reduzida (provável)',
        'Dinamometria <27kg (H) ou <16kg (F)',
        'Confirmação: massa muscular baixa (DXA/BIA)',
        'Severidade: desempenho físico baixo (SPPB <8)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Exercício resistido progressivo', 'Proteína 1,0-1,2g/kg/dia', 'Leucina/HMB como adjuvante'],
        farmacologico: ['Vitamina D se deficiência', 'Não há fármacos aprovados específicos']
      },
      redFlags: ['Perda de peso rápida', 'Quedas recorrentes', 'Incapacidade de levantar da cadeira', 'Sarcopenia + obesidade']
    },
    medicamentos: ['vitamina-d'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'osteoporose',
    titulo: 'Osteoporose',
    ciap2: ['L95'],
    cid10: ['M80', 'M81'],
    cid11: ['FB83'],
    categoria: 'musculoesqueletico',
    doid: 'DOID:11476',
    snomedCT: '64859006',
    meshId: 'D010024',
    umlsCui: 'C0029456',
    quickView: {
      definicao: 'Doença esquelética com massa óssea baixa e deterioração microarquitetural, aumentando risco de fratura. Prevalência pós-menopausa: 30-50%.',
      criteriosDiagnosticos: [
        'DXA: T-score ≤-2,5 (coluna/fêmur)',
        'OU fratura por fragilidade prévia',
        'T-score -1 a -2,5 = osteopenia',
        'FRAX para calcular risco'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Exercício com carga', 'Prevenção de quedas', 'Cessar tabagismo', 'Cálcio dietético 1000-1200mg/dia'],
        farmacologico: [
          'Alendronato 70mg/semana ou Risedronato 35mg/semana',
          'Vitamina D 800-2000UI/dia',
          'Denosumabe se intolerância a bifosfonatos'
        ]
      },
      redFlags: ['Fratura vertebral', 'Múltiplas fraturas', 'Perda de altura >4cm', 'Dor óssea difusa']
    },
    medicamentos: ['alendronato', 'vitamina-d', 'carbonato-calcio'],
    protocolos: [],
    calculadoras: ['frax']
  },
  {
    id: 'depressao-idoso',
    titulo: 'Depressão no Idoso',
    ciap2: ['P76'],
    cid10: ['F32', 'F33'],
    cid11: ['6A70', '6A71'],
    categoria: 'saude_mental',
    doid: 'DOID:1596',
    snomedCT: '35489007',
    meshId: 'D003866',
    umlsCui: 'C0011570',
    quickView: {
      definicao: 'Transtorno depressivo maior no idoso, muitas vezes subdiagnosticado. Pode apresentar-se com queixas somáticas e "pseudodemência".',
      criteriosDiagnosticos: [
        'GDS-15 ≥5 (rastreamento)',
        'Sintomas atípicos comuns: queixas somáticas',
        'Perda de interesse mais que tristeza',
        'Pseudodemência: déficit cognitivo reversível'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Atividade física', 'Ativação comportamental', 'Suporte social', 'Psicoterapia'],
        farmacologico: [
          'ISRS: Sertralina 25-50mg (preferido)',
          'Evitar tricíclicos (efeitos anticolinérgicos)',
          'Start low, go slow'
        ]
      },
      redFlags: ['Ideação suicida (maior risco que jovens)', 'Recusa alimentar', 'Psicose', 'Declínio funcional rápido']
    },
    medicamentos: ['sertralina', 'escitalopram'],
    protocolos: [],
    calculadoras: ['gds-15']
  },
  {
    id: 'hipotensao-ortostatica',
    titulo: 'Hipotensão Ortostática',
    ciap2: ['K88'],
    cid10: ['I95.1'],
    cid11: ['BA81'],
    categoria: 'cardiovascular',
    doid: 'DOID:10763',
    snomedCT: '28651003',
    meshId: 'D007024',
    umlsCui: 'C0020651',
    quickView: {
      definicao: 'Queda da PAS ≥20mmHg ou PAD ≥10mmHg ao ortostatismo. Prevalência 20-30% em >65 anos. Causa importante de quedas.',
      criteriosDiagnosticos: [
        'Queda PA ao ortostatismo (1-3 min)',
        'Sintomas: tontura, escurecimento visual',
        'Reprodutível ao teste postural',
        'Avaliar medicamentos causadores'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Levantar em etapas', 'Elevar cabeceira', 'Meias compressivas', 'Hidratação adequada', 'Aumentar sal (se não HAS grave)'],
        farmacologico: ['Revisar e reduzir anti-hipertensivos', 'Fludrocortisona 0,1mg/dia (se refratário)', 'Midodrina 2,5-10mg 3x/dia']
      },
      redFlags: ['Síncope', 'Quedas recorrentes', 'Sintomas neurológicos associados', 'Anemia']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  }
];
