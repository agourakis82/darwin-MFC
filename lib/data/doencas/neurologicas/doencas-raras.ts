/**
 * DOENÇAS NEUROLÓGICAS RARAS E COMPLEXAS
 * Condições menos comuns mas clinicamente importantes
 */

import type { TranstornoNeurologico } from '@/lib/types/doenca-mental';

export const doencasNeurologicasRaras: Array<Partial<TranstornoNeurologico> & Pick<TranstornoNeurologico, 'id' | 'titulo' | 'categoria' | 'cid10' | 'ciap2'>> = [
  // ============================================================================
  // DOENÇAS NEURODEGENERATIVAS RARAS
  // ============================================================================
  
  {
    id: 'doenca-huntington',
    titulo: 'Doença de Huntington',
    categoria: 'neurologico',
    cid10: ['G10'],
    cid11: ['8A01'],
    ciap2: ['N87'],
    classificacao: {
      tipo: 'doenca_neurodegenerativa',
      subtipo: 'transtorno_movimento',
      classificacaoEspecifica: {
        sistema: 'CID-11',
        codigo: '8A01',
        descricao: 'Doença de Huntington - Doença neurodegenerativa autossômica dominante',
      },
    },
    quickView: {
      definicao: 'Doença neurodegenerativa autossômica dominante caracterizada por coreia (movimentos involuntários), deterioração cognitiva e distúrbios psiquiátricos, causada por expansão de repetições CAG no gene HTT.',
      criteriosDiagnosticos: [
        'História familiar (autossômica dominante)',
        'Coreia progressiva',
        'Deterioração cognitiva/psiquiátrica',
        'Teste genético: expansão CAG ≥36 repetições no gene HTT',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Suporte multidisciplinar',
          'Fisioterapia',
          'Fonoaudiologia',
          'Suporte psicossocial',
          'Aconselhamento genético',
        ],
        farmacologico: [
          'Coreia: Tetrabenazina, Deutetrabenazina',
          'Sintomas psiquiátricos: Antipsicóticos, ISRS',
          'Rigidez: Levodopa',
        ],
      },
      redFlags: [
        'Progressão rápida',
        'Disfagia (risco de pneumonia)',
        'Sintomas psiquiátricos graves',
        'Quedas frequentes',
      ],
      examesIniciais: [
        'Teste genético (confirmatório)',
        'RM de crânio (atrofia de núcleo caudado)',
        'Avaliação neuropsicológica',
      ],
    },
    sinaisNeurologicos: [
      'Coreia (movimentos involuntários)',
      'Distúrbios de marcha',
      'Disfagia',
      'Disfonia',
      'Bradicinesia (fase tardia)',
      'Rigidez (fase tardia)',
    ],
    tratamentoNeurologico: {
      primeiraLinha: {
        medicamentos: ['tetrabenazina', 'deutetrabenazina'],
        outrasIntervencoes: ['Fisioterapia', 'Suporte multidisciplinar'],
      },
    },
    prognostico: {
      curso: 'progressivo',
      expectativa: 'Progressão inexorável, sobrevida 15-20 anos após início',
      fatoresPrognosticos: ['Número de repetições CAG', 'Idade de início', 'Sintomas iniciais'],
    },
    tags: ['huntington', 'coreia', 'neurodegenerativa', 'genetica', 'rara'],
  },

  {
    id: 'esclerose-lateral-amiotrofica',
    titulo: 'Esclerose Lateral Amiotrófica (ELA)',
    categoria: 'neurologico',
    cid10: ['G12.2'],
    cid11: ['8B60'],
    ciap2: ['N87'],
    classificacao: {
      tipo: 'doenca_neurodegenerativa',
      subtipo: 'doenca_motoneuronio',
    },
    quickView: {
      definicao: 'Doença neurodegenerativa fatal caracterizada por degeneração progressiva dos neurônios motores superiores e inferiores, resultando em fraqueza muscular progressiva, atrofia e eventualmente paralisia respiratória.',
      criteriosDiagnosticos: [
        'Critérios de El Escorial Revisados:',
        'Evidência de degeneração de neurônio motor superior (espasticidade, hiperreflexia)',
        'Evidência de degeneração de neurônio motor inferior (atrofia, fasciculações, fraqueza)',
        'Progressão da doença',
        'Exclusão de outras causas',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Cuidados multidisciplinares',
          'Fisioterapia e terapia ocupacional',
          'Suporte respiratório (ventilação não invasiva quando necessário)',
          'Nutrição (gastrostomia se necessário)',
          'Suporte psicológico',
        ],
        farmacologico: [
          'Riluzol 50mg 2x/dia (prolonga sobrevida em 2-3 meses)',
          'Edaravone (IV - alguns casos)',
          'Sintomáticos: Baclofeno (espasticidade), Anticolinérgicos (sialorreia)',
        ],
      },
      redFlags: [
        'Insuficiência respiratória',
        'Disfagia grave',
        'Progressão rápida',
        'Sintomas bulbares',
      ],
      examesIniciais: [
        'EMG/NCV (fundamental)',
        'RM de crânio e medula',
        'Exames para excluir outras causas',
      ],
    },
    examesNeurologicos: [
      {
        tipo: 'EMG/NCV',
        indicacao: 'Confirmar degeneração de neurônio motor inferior',
        quandoSolicitar: 'Primeira suspeita',
      },
    ],
    tratamentoNeurologico: {
      primeiraLinha: {
        medicamentos: ['riluzol'],
        outrasIntervencoes: ['Ventilação não invasiva', 'Gastrostomia', 'Cuidados multidisciplinares'],
      },
    },
    prognostico: {
      curso: 'progressivo',
      expectativa: 'Sobrevida mediana 2-5 anos, variável',
      fatoresPrognosticos: ['Idade de início', 'Forma clínica (bulbar vs espinhal)', 'Velocidade de progressão'],
    },
    tags: ['ela', 'als', 'motoneuronio', 'degenerativa', 'rara', 'riluzol'],
  },

  // ============================================================================
  // DOENÇAS DESMIELINIZANTES RARAS
  // ============================================================================
  
  {
    id: 'neuromielite-optica',
    titulo: 'Neuromielite Óptica (NMO / Doença de Devic)',
    categoria: 'neurologico',
    cid10: ['G36.0'],
    cid11: ['8A45'],
    ciap2: ['N88'],
    classificacao: {
      tipo: 'doenca_desmielinizante',
      subtipo: 'neuromielite_optica',
    },
    quickView: {
      definicao: 'Doença desmielinizante do sistema nervoso central caracterizada por neurite óptica bilateral e mielite transversa extensa, associada a anticorpos anti-aquaporina-4 (AQP4).',
      criteriosDiagnosticos: [
        'Critérios Wingerchuk 2015:',
        'Neurite óptica + Mielite transversa',
        '≥2 de 3:',
        '- Mielite contínua ≥3 segmentos vertebrais',
        '- RM cerebral não atende critérios de EM',
        '- Soropositivo para AQP4-IgG',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Fisioterapia',
          'Suporte visual',
          'Reabilitação',
        ],
        farmacologico: [
          'Surto agudo: Metilprednisolona 1g/dia IV por 3-5 dias',
          'Se não responsivo: Plasmaférese',
          'Prevenção: Azatioprina + Prednisona, ou Rituximab',
        ],
      },
      redFlags: [
        'Neurite óptica bilateral',
        'Mielite extensa',
        'Surtos frequentes',
        'Resposta insuficiente a corticosteróides',
      ],
      examesIniciais: [
        'RM de crânio e medula',
        'Anticorpos AQP4-IgG (soro)',
        'Anticorpos MOG (se AQP4 negativo)',
        'LCR (bandas oligoclonais menos frequentes que EM)',
      ],
    },
    examesNeurologicos: [
      {
        tipo: 'RM de medula',
        indicacao: 'Avaliar extensão da mielite',
        quandoSolicitar: 'Surto de mielite',
      },
      {
        tipo: 'Anticorpos AQP4-IgG',
        indicacao: 'Confirmar diagnóstico',
        quandoSolicitar: 'Suspeita de NMO',
      },
    ],
    tratamentoNeurologico: {
      primeiraLinha: {
        medicamentos: ['metilprednisolona', 'rituximab', 'azatioprina'],
        outrasIntervencoes: ['Plasmaférese'],
      },
    },
    prognostico: {
      curso: 'recidivante-remitente',
      expectativa: 'Variável, pode ser grave com surtos frequentes',
      fatoresPrognosticos: ['Titulação de AQP4-IgG', 'Frequência de surtos', 'Resposta ao tratamento'],
    },
    tags: ['nmo', 'neuromielite', 'devic', 'desmielinizante', 'rara', 'aqp4'],
  },

  // ============================================================================
  // DOENÇAS NEUROMUSCULARES
  // ============================================================================
  
  {
    id: 'miastenia-gravis',
    titulo: 'Miastenia Gravis',
    categoria: 'neurologico',
    cid10: ['G70.0'],
    cid11: ['8C60'],
    ciap2: ['N87'],
    classificacao: {
      tipo: 'miopatia',
      subtipo: 'doenca_autoimune',
    },
    quickView: {
      definicao: 'Doença autoimune da junção neuromuscular caracterizada por fraqueza e fadiga muscular que piora com atividade e melhora com repouso, causada por anticorpos contra receptores de acetilcolina.',
      criteriosDiagnosticos: [
        'Fraqueza muscular flutuante',
        'Piora com atividade, melhora com repouso',
        'Padrão típico: ptose, diplopia, fraqueza facial/bulbar/proximal',
        'Teste de Tensilom (edrofônio): melhora temporária',
        'Anticorpos anti-AChR ou anti-MuSK',
        'EMG: decremento na estimulação repetitiva',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar exercício excessivo',
          'Repouso adequado',
          'Evitar medicamentos que pioram (aminoglicosídeos, quinolonas)',
        ],
        farmacologico: [
          'Inibidores de colinesterase: Piridostigmina 30-120mg 3-4x/dia',
          'Imunossupressão: Prednisona, Azatioprina, Micofenolato',
          'Crise miastênica: Imunoglobulina IV ou Plasmaférese',
        ],
      },
      redFlags: [
        'Crise miastênica (insuficiência respiratória)',
        'Fraqueza bulbar grave (risco de aspiração)',
        'Timoma (15% dos casos)',
      ],
      examesIniciais: [
        'Anticorpos anti-AChR',
        'Anticorpos anti-MuSK (se AChR negativo)',
        'EMG com estimulação repetitiva',
        'TC de tórax (timoma)',
      ],
    },
    examesNeurologicos: [
      {
        tipo: 'Teste de Tensilom',
        indicacao: 'Avaliação clínica rápida',
        quandoSolicitar: 'Suspeita de miastenia',
      },
      {
        tipo: 'EMG com estimulação repetitiva',
        indicacao: 'Confirmar diagnóstico',
        quandoSolicitar: 'Suspeita confirmada',
      },
    ],
    tratamentoNeurologico: {
      primeiraLinha: {
        medicamentos: ['piridostigmina', 'prednisona', 'azatioprina'],
        outrasIntervencoes: ['Imunoglobulina IV', 'Plasmaférese', 'Timectomia'],
      },
    },
    prognostico: {
      curso: 'cronico',
      expectativa: 'Bom controle com tratamento, mas requer monitoramento',
      fatoresPrognosticos: ['Presença de timoma', 'Tipo de anticorpos', 'Resposta ao tratamento'],
    },
    tags: ['miastenia', 'autoimune', 'neuromuscular', 'piridostigmina', 'rara'],
  },

  // ============================================================================
  // DOENÇAS CEREBROVASCULARES RARAS
  // ============================================================================
  
  {
    id: 'enxaqueca-hemiplegica',
    titulo: 'Enxaqueca Hemiplégica',
    categoria: 'neurologico',
    cid10: ['G43.1'],
    cid11: ['8A80.2'],
    ciap2: ['N89'],
    classificacao: {
      tipo: 'cefaleia',
      subtipo: 'primaria',
      classificacaoEspecifica: {
        sistema: 'ICHD-3',
        codigo: '1.2',
        descricao: 'Enxaqueca com aura motora',
      },
    },
    quickView: {
      definicao: 'Subtipo raro de enxaqueca com aura caracterizado por fraqueza motora (hemiparesia) durante a aura, que pode durar minutos a dias.',
      criteriosDiagnosticos: [
        'Critérios ICHD-3 para enxaqueca com aura',
        'Aura com fraqueza motora unilateral',
        'Aura totalmente reversível',
        'Familiar ou esporádica (genética)',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar gatilhos',
          'Educação sobre o transtorno',
        ],
        farmacologico: [
          'Evitar triptanos e ergotamina (risco de AVC)',
          'Prevenção: Verapamil, Lamotrigina',
          'Crise: AINEs, Analgésicos simples',
        ],
      },
      redFlags: [
        'Primeiro episódio (excluir AVC)',
        'Aura >60 minutos',
        'Sintomas persistentes',
      ],
      examesIniciais: [
        'RM de crânio (excluir AVC)',
        'Teste genético (se familiar)',
      ],
    },
    sinaisNeurologicos: [
      'Fraqueza motora unilateral (aura)',
      'Outros sintomas de aura (visual, sensitiva, de fala)',
    ],
    tratamentoNeurologico: {
      primeiraLinha: {
        medicamentos: ['verapamil', 'lamotrigina'],
        outrasIntervencoes: ['Evitar triptanos'],
      },
    },
    prognostico: {
      curso: 'recidivante-remitente',
      expectativa: 'Variável, geralmente controlável',
      fatoresPrognosticos: ['Familiar vs esporádica', 'Resposta ao tratamento'],
    },
    tags: ['enxaqueca', 'hemiplegica', 'aura', 'cefaleia', 'rara'],
  },
];

