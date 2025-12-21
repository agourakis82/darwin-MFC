/**
 * DOENÇAS NEROLÓGICAS - EXPANSÃO
 * Epilepsias, neuropatias, cefaleias adicionais, doenças neurodegenerativas
 */

import type { TranstornoNeurologico } from '@/lib/types/doenca-mental';

export const doencasNeurologicasExpansao: Array<Partial<TranstornoNeurologico> & Pick<TranstornoNeurologico, 'id' | 'titulo' | 'categoria' | 'cid10' | 'ciap2'>> = [
  // ============================================================================
  // EPILEPSIAS
  // ============================================================================
  
  {
    id: 'epilepsia-focal',
    titulo: 'Epilepsia Focal (Antes: Parcial)',
    categoria: 'neurologico',
    cid10: ['G40.0', 'G40.1', 'G40.2'],
    cid11: ['8A60'],
    ciap2: ['N88'],
    snomedCT: '69480007', // Focal epilepsy (disorder)
    doid: 'DOID:4469',
    meshId: 'D004828',
    umlsCui: 'C0014547',
    classificacao: {
      tipo: 'epilepsia',
      subtipo: 'focal',
      classificacaoEspecifica: {
        sistema: 'ILAE 2017',
        codigo: 'Focal',
        descricao: 'Epilepsia focal com ou sem generalização secundária',
      },
    },
    quickView: {
      definicao: 'Epilepsia caracterizada por crises que se originam em uma região focal do córtex cerebral, podendo permanecer focais ou generalizar secundariamente.',
      criteriosDiagnosticos: [
        '≥2 crises epilépticas não provocadas com intervalo >24 horas',
        'Crises com sintomas focais: motoros (músculos faciais, braço/perna), sensitivos, autonômicos, psíquicos',
        'EEG: atividade epileptiforme focal',
        'RM: pode mostrar lesão estrutural (cicatriz, tumor, malformação)',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar fatores desencadeantes (privação de sono, álcool)',
          'Educação sobre primeiros socorros',
          'Avaliar indicação cirúrgica se resistente',
        ],
        farmacologico: [
          'Anticonvulsivantes de primeira linha:',
          '- Carbamazepina 200-1200mg/dia',
          '- Lamotrigina 100-400mg/dia',
          '- Levetiracetam 1000-3000mg/dia',
          '- Oxcarbazepina 600-2400mg/dia',
        ],
      },
      redFlags: [
        'Crises frequentes (>1/semana)',
        'Status epilepticus',
        'Crises noturnas',
        'Sintomas neurológicos focais',
        'Resistência ao tratamento',
      ],
      examesIniciais: [
        'EEG (eletroencefalograma) - padrão-ouro',
        'RM de crânio com sequências especiais',
        'Hemograma, função hepática, função renal',
      ],
    },
    examesNeurologicos: [
      {
        tipo: 'EEG',
        indicacao: 'Confirmar diagnóstico e localizar foco',
        quandoSolicitar: 'Após primeira crise suspeita',
      },
      {
        tipo: 'RM de crânio',
        indicacao: 'Detectar lesões estruturais',
        quandoSolicitar: 'Epilepsia focal de início novo',
      },
    ],
    escalasNeurologicas: [
      {
        name: 'Escala de Severidade de Epilepsia',
        description: 'Avalia frequência e tipo de crises',
        uso: 'Monitoramento de tratamento',
      },
    ],
    tratamentoNeurologico: {
      primeiraLinha: {
        medicamentos: ['carbamazepina', 'lamotrigina', 'levetiracetam', 'oxcarbazepina'],
      },
      segundaLinha: {
        medicamentos: ['topiramato', 'lacosamida', 'zonisamida'],
      },
      cirurgia: {
        indicacao: 'Epilepsia focal resistente a ≥2 medicações adequadas',
        tipo: 'Ressecção cirúrgica do foco epiléptico',
      },
    },
    prognostico: {
      curso: 'cronico',
      expectativa: 'Controle com medicação em 60-70% dos casos',
      fatoresPrognosticos: ['Presença de lesão estrutural', 'Tipo de lesão', 'Localização do foco'],
    },
    tags: ['epilepsia', 'crises', 'focal', 'carbamazepina', 'levetiracetam'],
  },

  {
    id: 'epilepsia-generalizada',
    titulo: 'Epilepsia Generalizada',
    categoria: 'neurologico',
    cid10: ['G40.3', 'G40.4', 'G40.6'],
    cid11: ['8A61'],
    ciap2: ['N88'],
    snomedCT: '84757009', // Generalized epilepsy (disorder)
    doid: 'DOID:1826',
    meshId: 'D020936',
    umlsCui: 'C0270786',
    classificacao: {
      tipo: 'epilepsia',
      subtipo: 'generalizada',
      classificacaoEspecifica: {
        sistema: 'ILAE 2017',
        codigo: 'Generalized',
        descricao: 'Epilepsia generalizada (tônica-clônica, ausências, mioclônica)',
      },
    },
    quickView: {
      definicao: 'Epilepsia caracterizada por crises que se originam simultaneamente em ambos os hemisférios cerebrais, sem início focal.',
      criteriosDiagnosticos: [
        '≥2 crises epilépticas não provocadas com intervalo >24 horas',
        'Crises generalizadas: tônica-clônica, ausências, mioclônicas, tônicas, atônicas',
        'EEG: atividade epileptiforme generalizada (espículas/poliespículas)',
        'Ausência de foco focal no EEG',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar fatores desencadeantes',
          'Educação sobre primeiros socorros',
          'Restrições de atividades (dirigir, natação)',
        ],
        farmacologico: [
          'Crises tônicas-clônicas: Valproato, Lamotrigina, Levetiracetam',
          'Ausências: Etosuximida, Valproato',
          'Mioclônicas: Valproato, Levetiracetam, Topiramato',
        ],
      },
      redFlags: [
        'Status epilepticus',
        'Crises noturnas',
        'Síndrome epiléptica específica',
        'Resistência ao tratamento',
      ],
      examesIniciais: [
        'EEG (fundamental)',
        'RM de crânio (para exclusão)',
        'Hemograma, função hepática',
      ],
    },
    examesNeurologicos: [
      {
        tipo: 'EEG',
        indicacao: 'Confirmar diagnóstico e tipo de crise',
        quandoSolicitar: 'Após primeira crise',
      },
    ],
    tratamentoNeurologico: {
      primeiraLinha: {
        medicamentos: ['valproato', 'lamotrigina', 'levetiracetam'],
        outrasIntervencoes: [],
      },
    },
    prognostico: {
      curso: 'cronico',
      expectativa: 'Controle com medicação em 70-80% dos casos',
      fatoresPrognosticos: ['Tipo de crise', 'Síndrome epiléptica', 'Idade de início'],
    },
    tags: ['epilepsia', 'generalizada', 'crises', 'valproato', 'lamotrigina'],
  },

  // ============================================================================
  // CEFALEIAS ADICIONAIS
  // ============================================================================
  
  {
    id: 'cefaleia-tensional',
    titulo: 'Cefaleia Tensional',
    categoria: 'neurologico',
    cid10: ['G44.2'],
    cid11: ['8A81'],
    ciap2: ['N89'],
    snomedCT: '398057008', // Tension-type headache (disorder)
    doid: 'DOID:9565',
    meshId: 'D018781',
    umlsCui: 'C0033893',
    classificacao: {
      tipo: 'cefaleia',
      subtipo: 'primaria',
      classificacaoEspecifica: {
        sistema: 'ICHD-3',
        codigo: '2.1',
        descricao: 'Cefaleia tensional episódica',
      },
    },
    quickView: {
      definicao: 'Cefaleia primária caracterizada por dor em pressão/aperto, bilateral, leve a moderada, não agravada por atividade física.',
      criteriosDiagnosticos: [
        '≥10 episódios de cefaleia',
        'Duração: 30 minutos a 7 dias',
        '≥2: bilateral, qualidade pressão/aperto, intensidade leve-moderada, não agravada por atividade física',
        'Sem náusea/vômito',
        'Fotofobia OU fonofobia (mas não ambos)',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Identificar e reduzir estressores',
          'Técnicas de relaxamento',
          'Fisioterapia para tensão muscular',
          'Exercício físico regular',
        ],
        farmacologico: [
          'Crise: Paracetamol 1g ou AINEs (Ibuprofeno 400mg, Naproxeno 500mg)',
          'Prevenção (se frequente): Amitriptilina 10-75mg/dia',
        ],
      },
      redFlags: [
        'Cefaleia de início súbito e severa (hemorragia subaracnóidea)',
        'Cefaleia com febre e rigidez de nuca (meningite)',
        'Cefaleia pior pela manhã (hipertensão intracraniana)',
        'Mudança no padrão de cefaleia',
      ],
      examesIniciais: ['Exame neurológico completo', 'Pressão arterial'],
    },
    sinaisNeurologicos: ['Tensão muscular pericraniana', 'Sensibilidade à palpação'],
    tags: ['cefaleia', 'tensional', 'primaria', 'amitriptilina'],
  },

  {
    id: 'cefaleia-em-salvas',
    titulo: 'Cefaleia em Salvas (Cluster Headache)',
    categoria: 'neurologico',
    cid10: ['G44.0'],
    cid11: ['8A82'],
    ciap2: ['N89'],
    snomedCT: '193031009', // Cluster headache syndrome (disorder)
    doid: 'DOID:9634',
    meshId: 'D003027',
    umlsCui: 'C0009043',
    classificacao: {
      tipo: 'cefaleia',
      subtipo: 'primaria',
      classificacaoEspecifica: {
        sistema: 'ICHD-3',
        codigo: '3.1',
        descricao: 'Cefaleia em salvas episódica',
      },
    },
    quickView: {
      definicao: 'Cefaleia primária severa, unilateral, periorbitária/peritemporal, com duração de 15-180 minutos, associada a sintomas autonômicos (lacrimejamento, rinorreia, ptose).',
      criteriosDiagnosticos: [
        '≥5 crises',
        'Dor unilateral, periorbitária/peritemporal, severa ou muito severa',
        'Duração: 15-180 minutos',
        '≥1 sintoma ipsilateral: lacrimejamento, congestão/rinorreia, sudorese facial, miose/ptose, edema palpebral',
        'Frequência: de 1 em dias alternados a 8/dia',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar álcool durante período de salva',
          'Oxigenoterapia inalatória (100% O2, 7-15L/min por 15 minutos)',
        ],
        farmacologico: [
          'Crise aguda: Sumatriptano 6mg SC ou 20mg intranasal',
          'Prevenção: Verapamil 240-960mg/dia (padrão-ouro)',
          'Alternativas: Prednisona, Topiramato',
        ],
      },
      redFlags: [
        'Primeiro episódio (excluir outras causas)',
        'Sintomas neurológicos focais',
        'Alteração no padrão',
      ],
      examesIniciais: ['RM de crânio (excluir lesões)', 'Exame neurológico'],
    },
    sinaisNeurologicos: ['Ptose', 'Miose', 'Lacrimejamento', 'Rinorreia', 'Sudorese facial'],
    tratamentoNeurologico: {
      primeiraLinha: {
        medicamentos: ['sumatriptano', 'verapamil'],
        outrasIntervencoes: ['Oxigenoterapia inalatória'],
      },
    },
    tags: ['cefaleia', 'salvas', 'cluster', 'sumatriptano', 'verapamil'],
  },

  // ============================================================================
  // NEUROPATIAS
  // ============================================================================
  
  {
    id: 'neuropatia-periferica-diabetica',
    titulo: 'Neuropatia Periférica Diabética',
    categoria: 'neurologico',
    cid10: ['G63.2', 'E11.4'],
    cid11: ['8C03', '5A10'],
    ciap2: ['N94', 'T90'],
    snomedCT: '230572002', // Diabetic peripheral neuropathy (disorder)
    doid: 'DOID:5682',
    meshId: 'D003929',
    umlsCui: 'C0011882',
    classificacao: {
      tipo: 'neuropatia',
      subtipo: 'polineuropatia',
    },
    quickView: {
      definicao: 'Neuropatia periférica associada ao diabetes mellitus, caracterizada por sintomas sensitivos (dor, queimação, formigamento) e/ou déficit motor, tipicamente em padrão "luvas e meias".',
      criteriosDiagnosticos: [
        'História de diabetes mellitus',
        'Sintomas: dor, queimação, formigamento, formigamento em pés/mãos',
        'Exame físico: diminuição de sensibilidade (vibração, tato fino), reflexos diminuídos',
        'Exame: monofilamento de Semmes-Weinstein (10g)',
        'EMG/NCV: confirmação de neuropatia',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Controle glicêmico rigoroso (HbA1c <7%)',
          'Cuidados com os pés (prevenção de úlceras)',
          'Exercício físico regular',
        ],
        farmacologico: [
          'Dor neuropática:',
          '- Gabapentina 300-3600mg/dia',
          '- Pregabalina 75-600mg/dia',
          '- Duloxetina 60-120mg/dia',
          '- Amitriptilina 25-100mg/dia',
        ],
      },
      redFlags: [
        'Úlcera de pé (risco de amputação)',
        'Déficit motor significativo',
        'Neuropatia autonômica (gastroparesia, hipotensão)',
      ],
      examesIniciais: [
        'Monofilamento 10g',
        'Diapasão 128Hz',
        'EMG/NCV (confirmação)',
        'HbA1c',
      ],
    },
    examesNeurologicos: [
      {
        tipo: 'Monofilamento de Semmes-Weinstein',
        indicacao: 'Rastreamento de neuropatia',
        quandoSolicitar: 'Todo diabético anualmente',
      },
      {
        tipo: 'EMG/NCV',
        indicacao: 'Confirmar diagnóstico e avaliar gravidade',
        quandoSolicitar: 'Sintomas sugestivos ou monofilamento positivo',
      },
    ],
    escalasNeurologicas: [
      {
        name: 'Escala de Sintomas de Neuropatia Diabética',
        description: 'Avalia sintomas de neuropatia',
        uso: 'Monitoramento',
      },
    ],
    tratamentoNeurologico: {
      primeiraLinha: {
        medicamentos: ['gabapentina', 'pregabalina', 'duloxetina'],
        outrasIntervencoes: [],
      },
    },
    prognostico: {
      curso: 'cronico',
      expectativa: 'Progressão lenta, controle sintomático possível',
      fatoresPrognosticos: ['Controle glicêmico', 'Duração do diabetes', 'Presença de outras complicações'],
    },
    tags: ['neuropatia', 'diabetes', 'polineuropatia', 'gabapentina', 'pregabalina'],
  },

  {
    id: 'sindrome-tunel-carpiano',
    titulo: 'Síndrome do Túnel do Carpo',
    categoria: 'neurologico',
    cid10: ['G56.0'],
    cid11: ['8C7Y'],
    ciap2: ['L83'],
    snomedCT: '57406009', // Carpal tunnel syndrome (disorder)
    doid: 'DOID:12169',
    meshId: 'D002349',
    umlsCui: 'C0007286',
    classificacao: {
      tipo: 'neuropatia',
      subtipo: 'mononeuropatia',
    },
    quickView: {
      definicao: 'Neuropatia por compressão do nervo mediano no túnel do carpo, caracterizada por dor, parestesia e déficit sensitivo no território do nervo mediano (polegar, indicador, médio, metade radial do anular).',
      criteriosDiagnosticos: [
        'Sintomas: dor, parestesia, formigamento em território do nervo mediano',
        'Pior à noite ou pela manhã',
        'Sinal de Tinel positivo (percussão do túnel do carpo)',
        'Teste de Phalen positivo (flexão do punho por 60 segundos)',
        'EMG/NCV: confirmação de compressão',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Tala de punho (especialmente à noite)',
          'Evitar movimentos repetitivos',
          'Fisioterapia',
          'Ajustes ergonômicos no trabalho',
        ],
        farmacologico: [
          'AINEs para dor aguda',
          'Corticosteróide intralesional (infiltração no túnel do carpo)',
        ],
      },
      redFlags: [
        'Atrofia tenar',
        'Déficit motor (abdução do polegar)',
        'Falha ao tratamento conservador',
      ],
      examesIniciais: ['Exame físico (Tinel, Phalen)', 'EMG/NCV'],
    },
    examesNeurologicos: [
      {
        tipo: 'EMG/NCV',
        indicacao: 'Confirmar diagnóstico e avaliar gravidade',
        quandoSolicitar: 'Sintomas sugestivos ou falha ao tratamento conservador',
      },
    ],
    tratamentoNeurologico: {
      primeiraLinha: {
        medicamentos: [],
        outrasIntervencoes: ['Tala de punho', 'Fisioterapia'],
      },
      segundaLinha: {
        medicamentos: [],
        outrasIntervencoes: ['Infiltração com corticosteróide'],
      },
      cirurgia: {
        indicacao: 'Falha ao tratamento conservador ou déficit motor/atrofia',
        tipo: 'Liberação cirúrgica do túnel do carpo',
      },
    },
    prognostico: {
      curso: 'cronico',
      expectativa: 'Boa resposta ao tratamento conservador na maioria dos casos',
      fatoresPrognosticos: ['Gravidade inicial', 'Duração dos sintomas', 'Presença de déficit motor'],
    },
    tags: ['neuropatia', 'compressao', 'tunel-carpiano', 'mediano'],
  },

  // ============================================================================
  // DOENÇAS NEURODEGENERATIVAS
  // ============================================================================
  
  {
    id: 'doenca-parkinson',
    titulo: 'Doença de Parkinson',
    categoria: 'neurologico',
    cid10: ['G20'],
    cid11: ['8A00'],
    ciap2: ['N87'],
    snomedCT: '49049000', // Parkinson disease (disorder)
    doid: 'DOID:14330',
    meshId: 'D010300',
    umlsCui: 'C0030567',
    classificacao: {
      tipo: 'doenca_neurodegenerativa',
      subtipo: 'parkinsonismo',
    },
    quickView: {
      definicao: 'Doença neurodegenerativa caracterizada por degeneração de neurônios dopaminérgicos da substância negra, resultando em parkinsonismo (tremor, rigidez, bradicinesia, instabilidade postural).',
      criteriosDiagnosticos: [
        'Parkinsonismo: ≥2 de: tremor de repouso, rigidez, bradicinesia, instabilidade postural',
        'Resposta à levodopa',
        'Progressão assimétrica',
        'Ausência de causas secundárias',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Fisioterapia (equilíbrio, marcha)',
          'Fonoaudiologia (disartria, disfagia)',
          'Terapia ocupacional',
          'Exercício físico regular',
        ],
        farmacologico: [
          'Levodopa + Benserazida ou Carbidopa (padrão-ouro)',
          'Agonistas dopaminérgicos: Pramipexol, Ropinirol',
          'Inibidores de MAO-B: Selegilina, Rasagilina',
          'Anticolinérgicos: Biperideno (para tremor)',
        ],
      },
      redFlags: [
        'Quedas frequentes',
        'Disfagia (risco de pneumonia aspirativa)',
        'Disfunção cognitiva',
        'Sintomas psicóticos',
      ],
      examesIniciais: [
        'Exame neurológico completo',
        'RM de crânio (excluir outras causas)',
      ],
    },
    sinaisNeurologicos: [
      'Tremor de repouso (4-6 Hz)',
      'Rigidez em roda dentada',
      'Bradicinesia',
      'Instabilidade postural',
      'Expressão facial diminuída',
      'Marcha em pequenos passos',
    ],
    escalasNeurologicas: [
      {
        name: 'UPDRS',
        description: 'Unified Parkinson\'s Disease Rating Scale: Escala completa para avaliar doença de Parkinson',
        uso: 'Monitoramento de progressão',
      },
    ],
    tratamentoNeurologico: {
      primeiraLinha: {
        medicamentos: ['levodopa', 'pramipexol', 'ropinirol'],
        outrasIntervencoes: [],
      },
      cirurgia: {
        indicacao: 'Doença avançada com complicações motoras (flutuações, discinesias)',
        tipo: 'Estimulação cerebral profunda (DBS)',
      },
    },
    prognostico: {
      curso: 'progressivo',
      expectativa: 'Progressão lenta ao longo de anos, controle sintomático possível',
      fatoresPrognosticos: ['Idade de início', 'Tipo de sintomas predominantes', 'Resposta à levodopa'],
    },
    tags: ['parkinson', 'neurodegenerativa', 'levodopa', 'tremor'],
  },

  {
    id: 'esclerose-multipla',
    titulo: 'Esclerose Múltipla',
    categoria: 'neurologico',
    cid10: ['G35'],
    cid11: ['8A40'],
    ciap2: ['N88'],
    snomedCT: '24700007', // Multiple sclerosis (disorder)
    doid: 'DOID:2377',
    meshId: 'D009103',
    umlsCui: 'C0026769',
    classificacao: {
      tipo: 'doenca_desmielinizante',
      subtipo: 'esclerose_multipla',
    },
    quickView: {
      definicao: 'Doença desmielinizante do sistema nervoso central, caracterizada por inflamação e desmielinização, com sintomas neurológicos variados que ocorrem em surtos ou de forma progressiva.',
      criteriosDiagnosticos: [
        'Critérios de McDonald 2017:',
        '- Disseminação no espaço: ≥1 lesão T2 em ≥2 regiões (periventricular, cortical/juxtacortical, infratentorial, medular)',
        '- Disseminação no tempo: novo surto OU nova lesão com captação de contraste OU bandas oligoclonais no LCR',
        'RM: lesões desmielinizantes características',
        'LCR: bandas oligoclonais (85% dos casos)',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Fisioterapia',
          'Fonoaudiologia',
          'Terapia ocupacional',
          'Controle de fatores de risco cardiovascular',
        ],
        farmacologico: [
          'Surto agudo: Metilprednisolona 1g/dia IV por 3-5 dias',
          'Prevenção de surtos (DMTs):',
          '- Interferon beta, Glatiramer',
          '- Fingolimode, Dimethyl fumarate',
          '- Natalizumab, Ocrelizumab (casos mais graves)',
        ],
      },
      redFlags: [
        'Surtos graves',
        'Progressão rápida',
        'Lesões medulares',
        'Síndrome clínica isolada',
      ],
      examesIniciais: [
        'RM de crânio e medula com contraste',
        'LCR (bandas oligoclonais)',
        'Potenciais evocados',
      ],
    },
    examesNeurologicos: [
      {
        tipo: 'RM de crânio e medula',
        indicacao: 'Diagnóstico e monitoramento',
        quandoSolicitar: 'Primeiro surto sugestivo',
      },
      {
        tipo: 'LCR (punção lombar)',
        indicacao: 'Bandas oligoclonais',
        quandoSolicitar: 'Confirmar diagnóstico',
      },
    ],
    tratamentoNeurologico: {
      primeiraLinha: {
        medicamentos: ['metilprednisolona', 'interferon-beta', 'glatiramer'],
        outrasIntervencoes: ['Fisioterapia', 'Reabilitação'],
      },
    },
    prognostico: {
      curso: 'recidivante-remitente',
      expectativa: 'Variável, dependendo do subtipo e resposta ao tratamento',
      fatoresPrognosticos: ['Idade de início', 'Subtipo (RRMS vs PPMS)', 'Número de surtos iniciais', 'Resposta ao tratamento'],
    },
    tags: ['esclerose-multipla', 'desmielinizante', 'surtos', 'metilprednisolona'],
  },
];

