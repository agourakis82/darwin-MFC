/**
 * DOENCAS TOXICOLOGICAS AVANCADAS - DARWIN-MFC EXPANSAO 800
 * =========================================================
 * Intoxicacoes e sindromes toxicologicas criticas
 */

import { Doenca } from '@/lib/types/doenca';

export const toxicologicasAvancadas: Doenca[] = [
  // ============================================================================
  // INTOXICACAO POR PARACETAMOL
  // ============================================================================
  {
    id: 'intoxicacao-paracetamol',
    titulo: 'Intoxicacao por Paracetamol',
    sinonimos: ['Intoxicacao por Acetaminofeno', 'Overdose de Paracetamol'],
    doid: 'DOID:11556',
    snomedCT: '295172009',
    meshId: 'D000082',
    ciap2: ['A84'],
    cid10: ['T39.1'],
    cid11: ['NE61.0'],
    categoria: 'outros',
    subcategoria: 'toxicologia',
    quickView: {
      definicao: 'Intoxicacao potencialmente fatal por doses >150mg/kg ou >7,5g em adultos. Causa hepatotoxicidade por acumulo de NAPQI. Janela terapeutica critica para antidoto (N-acetilcisteina).',
      criteriosDiagnosticos: [
        'Historia de ingestao de dose toxica (>150mg/kg)',
        'Dosagem serica de paracetamol',
        'Nomograma de Rumack-Matthew (4-24h pos-ingestao)',
        'Elevacao de transaminases (pico 72-96h)',
        'INR prolongado indica insuficiencia hepatica'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Carvao ativado se <2h da ingestao',
          'Monitorar funcao hepatica seriada'
        ],
        farmacologico: [
          'N-ACETILCISTEINA (NAC) - antidoto especifico',
          'Protocolo IV: 150mg/kg em 1h, 50mg/kg em 4h, 100mg/kg em 16h',
          'Iniciar se nivel toxico no nomograma ou dose >150mg/kg'
        ]
      },
      metasTerapeuticas: [
        'Prevenir hepatotoxicidade',
        'Normalizar funcao hepatica',
        'Evitar transplante hepatico'
      ],
      examesIniciais: [
        'Nivel serico paracetamol (4h pos-ingestao)',
        'AST, ALT, bilirrubinas, INR',
        'Funcao renal, glicemia, lactato'
      ],
      redFlags: [
        'INR >1.5 com encefalopatia',
        'Acidose metabolica (pH <7.3)',
        'Lactato >3 mmol/L',
        'Creatinina >3.4 mg/dL'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Principal causa de insuficiencia hepatica aguda nos paises desenvolvidos',
        incidencia: '~50.000 visitas a emergencia/ano nos EUA',
        mortalidade: '<1% com tratamento precoce; 5-10% se encefalopatia',
        fatoresRisco: [
          'Etilismo cronico (deplecao de glutationa)',
          'Desnutricao',
          'Uso de indutores do CYP2E1',
          'Ingestao cronica supraterapeutica'
        ],
        citations: [{ refId: 'aasld-alf-2023' }]
      },
      fisiopatologia: {
        texto: 'Paracetamol e metabolizado pelo CYP2E1 em NAPQI (hepatotoxico). Em doses normais, glutationa conjuga NAPQI. Em overdose, glutationa se esgota e NAPQI causa necrose centrolobular.',
        citations: [{ refId: 'nejm-acetaminophen-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Fase 1 (0-24h): Nausea, vomito, anorexia ou assintomatico',
          'Fase 2 (24-72h): Dor em HCD, elevacao de enzimas',
          'Fase 3 (72-96h): Ictericia, coagulopatia, encefalopatia',
          'Fase 4 (4-14 dias): Recuperacao ou obito'
        ],
        sinaisExameFisico: [
          'Dor a palpacao em hipocondrio direito',
          'Ictericia (fase tardia)',
          'Asterixis se encefalopatia',
          'Sangramento se coagulopatia'
        ],
        citations: [{ refId: 'lancet-paracetamol-2021' }]
      },
      diagnostico: {
        criterios: [
          'Nivel serico acima da linha de tratamento no nomograma',
          'Dose ingerida >150mg/kg (ou >7.5g) requer tratamento empirico',
          'Elevacao de transaminases confirma hepatotoxicidade'
        ],
        diagnosticoDiferencial: [
          'Hepatite viral aguda',
          'Hepatite alcoolica',
          'Outras hepatotoxicidades medicamentosas',
          'Sindrome de Reye'
        ],
        examesLaboratoriais: [
          'Paracetamol serico (4h e seriado)',
          'TGO/TGP, bilirrubinas, INR, PTT',
          'Creatinina, ureia, glicemia, lactato, gasometria'
        ],
        citations: [{ refId: 'nejm-acetaminophen-2020' }]
      },
      tratamento: {
        objetivos: [
          'Prevenir formacao de NAPQI',
          'Repor glutationa via NAC',
          'Suporte hepatico'
        ],
        naoFarmacologico: {
          medidas: [
            'Carvao ativado 1g/kg se <2h da ingestao',
            'Suporte em UTI se insuficiencia hepatica',
            'Avaliar transplante se criterios de Kings College'
          ],
          citations: [{ refId: 'aasld-alf-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antidoto', medicamentos: ['N-acetilcisteina'], posologia: 'IV: 150mg/kg em 1h + 50mg/kg em 4h + 100mg/kg em 16h', observacoes: 'Eficaz ate 24h; beneficio parcial ate 72h' }
          ],
          situacoesEspeciais: [
            { situacao: 'Gestantes', conduta: 'NAC e seguro e deve ser administrado; risco fetal maior sem tratamento' },
            { situacao: 'Ingestao cronica', conduta: 'Nomograma nao se aplica; tratar se transaminases elevadas' }
          ],
          citations: [{ refId: 'nejm-acetaminophen-2020' }]
        },
        duracao: 'NAC ate normalizacao de INR e transaminases em queda'
      },
      acompanhamento: {
        frequenciaConsultas: 'Diario durante internacao; ambulatorio em 1 semana',
        examesControle: [
          'Transaminases a cada 12-24h',
          'INR diario',
          'Nivel de paracetamol seriado'
        ],
        metasTerapeuticas: [
          'INR <1.5',
          'Transaminases em queda',
          'Sem encefalopatia'
        ],
        criteriosEncaminhamento: [
          'UTI se INR >2 ou encefalopatia',
          'Centro de transplante se criterios de Kings College',
          'Psiquiatria se tentativa de suicidio'
        ],
        citations: [{ refId: 'aasld-alf-2023' }]
      },
      prevencao: {
        primaria: [
          'Educacao sobre dose maxima (4g/dia em adultos)',
          'Embalagens com quantidade limitada'
        ],
        secundaria: [
          'Identificacao precoce de ingestao',
          'Acesso rapido a NAC'
        ],
        citations: [{ refId: 'lancet-paracetamol-2021' }]
      }
    },
    protocolos: ['intoxicacao-paracetamol-manejo'],
    medicamentos: ['n-acetilcisteina', 'carvao-ativado'],
    calculadoras: ['rumack-matthew'],
    citations: [{ refId: 'nejm-acetaminophen-2020' }, { refId: 'aasld-alf-2023' }],
    lastUpdate: '2026-01',
    tags: ['intoxicacao', 'paracetamol', 'hepatotoxicidade', 'NAC', 'emergencia']
  },

  // ============================================================================
  // INTOXICACAO POR BENZODIAZEPINICOS
  // ============================================================================
  {
    id: 'intoxicacao-benzodiazepinicos',
    titulo: 'Intoxicacao por Benzodiazepinicos',
    sinonimos: ['Overdose de BZD', 'Intoxicacao por ansioliticos'],
    doid: 'DOID:9446',
    snomedCT: '295122003',
    meshId: 'D001569',
    ciap2: ['A84'],
    cid10: ['T42.4'],
    cid11: ['NE61.2'],
    categoria: 'outros',
    subcategoria: 'toxicologia',
    quickView: {
      definicao: 'Intoxicacao por agonistas GABA-A causando depressao do SNC. Raramente fatal em monoterapia, mas perigosa em associacao com opioides ou alcool. Antidoto: flumazenil.',
      criteriosDiagnosticos: [
        'Historia de ingestao de BZD',
        'Rebaixamento do nivel de consciencia',
        'Ataxia, disartria',
        'Resposta ao flumazenil (diagnostica e terapeutica)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Suporte de via aerea',
          'Monitoracao cardiorrespiratoria',
          'Carvao ativado se <1h'
        ],
        farmacologico: [
          'FLUMAZENIL 0.2mg IV, repetir ate 1mg',
          'CONTRAINDICADO se uso cronico de BZD ou coingestao com pro-convulsivantes'
        ]
      },
      metasTerapeuticas: [
        'Manter via aerea pervia',
        'Reverter depressao respiratoria',
        'Evitar aspiracao'
      ],
      examesIniciais: [
        'Screening toxicologico urinario',
        'Glicemia, gasometria',
        'ECG (excluir coingestoes)'
      ],
      redFlags: [
        'Coingestao com opioides',
        'Depressao respiratoria',
        'Glasgow <8',
        'Aspiracao'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Envolvido em 30% das overdoses por medicamentos',
        mortalidade: '<2% em monoterapia; >10% se coingestao com opioides',
        fatoresRisco: [
          'Uso cronico de BZD',
          'Poliuso de substancias',
          'Idosos (metabolismo lento)',
          'Insuficiencia hepatica'
        ],
        citations: [{ refId: 'cdc-overdose-2023' }]
      },
      fisiopatologia: {
        texto: 'BZD potencializam acao do GABA no receptor GABA-A, aumentando frequencia de abertura do canal de cloro. Resulta em depressao do SNC dose-dependente.',
        citations: [{ refId: 'pharmacol-rev-bzd-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Sonolencia progressiva',
          'Ataxia, disartria',
          'Amnesia anterograda',
          'Depressao respiratoria (doses altas)',
          'Coma (doses muito altas ou coingestao)'
        ],
        sinaisExameFisico: [
          'Rebaixamento de consciencia',
          'Miose leve',
          'Hipotonia, hiporreflexia',
          'FR diminuida em casos graves'
        ],
        citations: [{ refId: 'toxicology-bzd-2022' }]
      },
      diagnostico: {
        criterios: [
          'Historia clinica de exposicao',
          'Sinais de depressao do SNC',
          'Screening toxicologico positivo',
          'Resposta ao flumazenil'
        ],
        diagnosticoDiferencial: [
          'Intoxicacao por opioides',
          'Intoxicacao alcoolica',
          'AVC',
          'Hipoglicemia',
          'Pos-ictal'
        ],
        examesLaboratoriais: [
          'Screening urinario (detecta metabolitos)',
          'Glicemia, funcao renal e hepatica',
          'Gasometria arterial'
        ],
        citations: [{ refId: 'toxicology-bzd-2022' }]
      },
      tratamento: {
        objetivos: [
          'Manter via aerea e ventilacao',
          'Reverter efeitos se indicado',
          'Tratar coingestoes'
        ],
        naoFarmacologico: {
          medidas: [
            'Intubacao se Glasgow <8 ou insuficiencia respiratoria',
            'Decubito lateral se risco de aspiracao',
            'Carvao ativado 1g/kg se <1h da ingestao'
          ],
          citations: [{ refId: 'acmt-toxicology-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antagonista GABA', medicamentos: ['Flumazenil'], posologia: '0.2mg IV a cada 1min ate 1mg total', observacoes: 'Evitar em uso cronico de BZD ou coingestao com substancias pro-convulsivantes' }
          ],
          situacoesEspeciais: [
            { situacao: 'Uso cronico de BZD', conduta: 'Nao usar flumazenil - risco de convulsoes de abstinencia' },
            { situacao: 'Coingestao com opioides', conduta: 'Priorizar naloxona; flumazenil com cautela' }
          ],
          citations: [{ refId: 'acmt-toxicology-2023' }]
        },
        duracao: 'Observacao por 6-24h conforme meia-vida do BZD'
      },
      acompanhamento: {
        frequenciaConsultas: 'Alta apos estabilidade; seguimento psiquiatrico se intencional',
        metasTerapeuticas: [
          'Nivel de consciencia normal',
          'Ventilacao adequada',
          'Sem recorrencia (meia-vida flumazenil < BZD)'
        ],
        criteriosEncaminhamento: [
          'UTI se intubacao necessaria',
          'Psiquiatria se tentativa de suicidio',
          'Adicao se uso cronico'
        ],
        citations: [{ refId: 'toxicology-bzd-2022' }]
      },
      prevencao: {
        primaria: [
          'Prescricao racional de BZD',
          'Evitar associacao BZD + opioides'
        ],
        secundaria: [
          'Identificacao de abuso',
          'Programas de reducao de danos'
        ],
        citations: [{ refId: 'cdc-overdose-2023' }]
      }
    },
    protocolos: ['intoxicacao-bzd-manejo'],
    medicamentos: ['flumazenil'],
    calculadoras: [],
    citations: [{ refId: 'acmt-toxicology-2023' }, { refId: 'toxicology-bzd-2022' }],
    lastUpdate: '2026-01',
    tags: ['intoxicacao', 'benzodiazepinicos', 'flumazenil', 'overdose']
  },

  // ============================================================================
  // INTOXICACAO POR OPIOIDES
  // ============================================================================
  {
    id: 'intoxicacao-opioides',
    titulo: 'Intoxicacao por Opioides',
    sinonimos: ['Overdose de opioides', 'Intoxicacao por narcoticos'],
    doid: 'DOID:9447',
    snomedCT: '295128004',
    meshId: 'D009293',
    ciap2: ['A84'],
    cid10: ['T40.0', 'T40.1', 'T40.2'],
    cid11: ['NE61.3'],
    categoria: 'outros',
    subcategoria: 'toxicologia',
    quickView: {
      definicao: 'Emergencia medica caracterizada pela triade: rebaixamento de consciencia, depressao respiratoria e miose puntiforme. Reversivel com naloxona. Alta mortalidade sem tratamento.',
      criteriosDiagnosticos: [
        'Triade classica: coma + miose + depressao respiratoria',
        'Historia de uso de opioides',
        'Resposta a naloxona (diagnostica)',
        'Saturacao baixa, cianose'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Ventilacao com bolsa-valvula-mascara',
          'Via aerea definitiva se nao responder'
        ],
        farmacologico: [
          'NALOXONA 0.4-2mg IV/IM/IN, repetir a cada 2-3min',
          'Pode ser necessario infusao continua (opioides de longa acao)'
        ]
      },
      metasTerapeuticas: [
        'FR >12 irpm',
        'SpO2 >94%',
        'Nivel de consciencia adequado'
      ],
      examesIniciais: [
        'Gasometria arterial',
        'Screening toxicologico',
        'Glicemia, ECG'
      ],
      redFlags: [
        'PCR',
        'Edema pulmonar nao cardiogenico',
        'Rabdomiolise',
        'Hipotermia grave'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Crise de opioides: >100.000 mortes/ano nos EUA (2021)',
        mortalidade: '>50% sem tratamento; <5% com naloxona precoce',
        fatoresRisco: [
          'Uso de fentanil ilicito',
          'Coingestao com BZD ou alcool',
          'Uso apos periodo de abstinencia',
          'Uso solitario'
        ],
        citations: [{ refId: 'cdc-opioid-crisis-2023' }]
      },
      fisiopatologia: {
        texto: 'Opioides ativam receptores mu centrais, causando depressao do centro respiratorio bulbar. Reduzem resposta ao CO2 e hipoxia. Fentanil e >100x mais potente que morfina.',
        citations: [{ refId: 'nejm-opioid-overdose-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Rebaixamento de consciencia ate coma',
          'Depressao respiratoria (<12 irpm)',
          'Miose puntiforme bilateral',
          'Cianose, hipoxemia'
        ],
        sinaisExameFisico: [
          'Pupilas puntiformes (<2mm)',
          'Bradipneia ou apneia',
          'Hipotensao, bradicardia',
          'Hipotermia',
          'Marcas de agulha (uso IV)'
        ],
        citations: [{ refId: 'lancet-opioids-2021' }]
      },
      diagnostico: {
        criterios: [
          'Triade clinica patognomonica',
          'Reversao com naloxona confirma',
          'Historia de exposicao'
        ],
        diagnosticoDiferencial: [
          'Hipoglicemia',
          'AVC de tronco',
          'Intoxicacao por BZD ou barbituricos',
          'Encefalopatia hepatica'
        ],
        examesLaboratoriais: [
          'Gasometria (hipercapnia, hipoxemia)',
          'Screening urinario (pode ser falso-negativo para fentanil)',
          'Glicemia, funcao renal'
        ],
        citations: [{ refId: 'nejm-opioid-overdose-2022' }]
      },
      tratamento: {
        objetivos: [
          'Reverter depressao respiratoria',
          'Prevenir morte por hipoxia',
          'Tratar complicacoes'
        ],
        naoFarmacologico: {
          medidas: [
            'Ventilacao com BVM imediata',
            'Posicao de recuperacao apos estabilizacao',
            'Intubacao se nao responder a naloxona'
          ],
          citations: [{ refId: 'aha-acls-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antagonista opioide', medicamentos: ['Naloxona'], posologia: '0.4-2mg IV/IM/SC/IN; repetir a cada 2-3min; max 10mg', observacoes: 'Fentanil pode requerer doses maiores; iniciar infusao 2/3 da dose de reversao/hora' }
          ],
          situacoesEspeciais: [
            { situacao: 'Usuario cronico', conduta: 'Titular naloxona para FR >12, evitar reversao completa (precipita abstinencia)' },
            { situacao: 'Fentanil', conduta: 'Doses altas de naloxona (4-10mg); meia-vida curta requer observacao prolongada' }
          ],
          citations: [{ refId: 'nejm-opioid-overdose-2022' }]
        },
        duracao: 'Observacao minima 4-6h; 24h se opioides de longa acao'
      },
      acompanhamento: {
        frequenciaConsultas: 'Alta com naloxona take-home; encaminhamento para tratamento de adicao',
        metasTerapeuticas: [
          'Ausencia de recorrencia de depressao respiratoria',
          'Engajamento em tratamento'
        ],
        criteriosEncaminhamento: [
          'Centro de tratamento de adicao',
          'Psiquiatria',
          'Programas de reducao de danos'
        ],
        citations: [{ refId: 'samhsa-mat-2023' }]
      },
      prevencao: {
        primaria: [
          'Prescricao racional de opioides',
          'Distribuicao de naloxona (take-home)',
          'Tiras de fentanil para deteccao'
        ],
        secundaria: [
          'MAT (buprenorfina, metadona, naltrexona)',
          'Supervisao de uso (safe injection sites)'
        ],
        citations: [{ refId: 'cdc-opioid-crisis-2023' }]
      }
    },
    protocolos: ['overdose-opioide-manejo'],
    medicamentos: ['naloxona', 'buprenorfina', 'metadona'],
    calculadoras: [],
    citations: [{ refId: 'nejm-opioid-overdose-2022' }, { refId: 'cdc-opioid-crisis-2023' }],
    lastUpdate: '2026-01',
    tags: ['opioides', 'overdose', 'naloxona', 'fentanil', 'emergencia']
  },

  // ============================================================================
  // INTOXICACAO POR ORGANOFOSFORADOS
  // ============================================================================
  {
    id: 'intoxicacao-organofosforados',
    titulo: 'Intoxicacao por Organofosforados',
    sinonimos: ['Intoxicacao por pesticidas', 'Sindrome colinergica'],
    doid: 'DOID:11559',
    snomedCT: '40733005',
    meshId: 'D062025',
    ciap2: ['A86'],
    cid10: ['T60.0'],
    cid11: ['NE62.0'],
    categoria: 'outros',
    subcategoria: 'toxicologia',
    quickView: {
      definicao: 'Intoxicacao grave por inibidores da acetilcolinesterase (pesticidas, nervos de guerra). Sindrome colinergica (SLUDGE + killer Bs). Tratamento: atropina + pralidoxima.',
      criteriosDiagnosticos: [
        'Exposicao a organofosforado (ocupacional, suicidio)',
        'Sindrome colinergica: SLUDGE (Salivacao, Lacrimejamento, Urina, Diarreia, GI, Emese)',
        'Killer Bs: Bradicardia, Broncoespasmo, Broncorreia',
        'Miose, fasciculacoes',
        'Colinesterase plasmatica ou eritrocitaria reduzida'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Descontaminacao (remover roupas, lavar pele)',
          'Via aerea (succcao de secrecoes, intubacao precoce)',
          'Evitar succinilcolina'
        ],
        farmacologico: [
          'ATROPINA 2-4mg IV a cada 5-10min ate secar secrecoes',
          'PRALIDOXIMA 1-2g IV em 15-30min, depois 500mg/h infusao'
        ]
      },
      metasTerapeuticas: [
        'FC >80 bpm',
        'Ausculta pulmonar limpa',
        'Pupilas midriticas'
      ],
      examesIniciais: [
        'Colinesterase plasmatica e eritrocitaria',
        'Gasometria',
        'ECG, Rx torax'
      ],
      redFlags: [
        'Insuficiencia respiratoria',
        'Convulsoes',
        'Coma',
        'Sindrome intermediaria (fraqueza 24-96h)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '~3 milhoes de intoxicacoes/ano no mundo',
        mortalidade: '10-20% em paises em desenvolvimento; <5% com tratamento adequado',
        fatoresRisco: [
          'Trabalhadores rurais',
          'Tentativa de suicidio (comum em Asia)',
          'Exposicao acidental'
        ],
        citations: [{ refId: 'who-pesticides-2022' }]
      },
      fisiopatologia: {
        texto: 'Organofosforados inibem irreversivelmente a acetilcolinesterase, causando acumulo de acetilcolina nas sinapses muscarínicas, nicotínicas e SNC. Envellhecimento (aging) ocorre em 24-48h, tornando a inibicao permanente.',
        citations: [{ refId: 'lancet-organophosphate-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Efeitos muscarinico: SLUDGE + miose, bradicardia, broncoespasmo',
          'Efeitos nicotinicos: fasciculacoes, fraqueza, paralisia',
          'Efeitos SNC: agitacao, convulsoes, coma',
          'Sindrome intermediaria (24-96h): fraqueza proximal e respiratoria'
        ],
        sinaisExameFisico: [
          'Miose bilateral',
          'Sialorreia profusa',
          'Broncoespasmo, estertores',
          'Fasciculacoes musculares',
          'Bradicardia ou taquicardia'
        ],
        citations: [{ refId: 'crit-care-op-2023' }]
      },
      diagnostico: {
        criterios: [
          'Historia de exposicao',
          'Sindrome colinergica',
          'Colinesterase reduzida (plasmatica <50% ou eritrocitaria <70%)',
          'Resposta a atropina'
        ],
        diagnosticoDiferencial: [
          'Intoxicacao por carbamatos',
          'Crise colinergica por miastenia',
          'Intoxicacao por cogumelos muscarinicos'
        ],
        examesLaboratoriais: [
          'Colinesterase plasmatica (pseudocolinesterase)',
          'Colinesterase eritrocitaria (mais especifica)',
          'Gasometria, lactato',
          'ECG (QTc prolongado)'
        ],
        citations: [{ refId: 'lancet-organophosphate-2021' }]
      },
      tratamento: {
        objetivos: [
          'Reverter efeitos muscarinicos com atropina',
          'Reativar colinesterase com pralidoxima',
          'Suporte respiratorio'
        ],
        naoFarmacologico: {
          medidas: [
            'Descontaminacao cutanea (agua e sabao)',
            'Remover roupas contaminadas',
            'Intubacao precoce (nao usar succinilcolina)',
            'Carvao ativado se ingestao <1h'
          ],
          citations: [{ refId: 'crit-care-op-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Anticolinergico', medicamentos: ['Atropina'], posologia: '2-4mg IV a cada 5-10min; dobrar dose se sem resposta; meta: secar secrecoes', observacoes: 'Podem ser necessarias doses muito altas (100-200mg)' },
            { classe: 'Reativador da colinesterase', medicamentos: ['Pralidoxima'], posologia: '1-2g IV em 30min, depois 500mg/h por 24-48h', observacoes: 'Eficaz se dado antes do aging (<24-48h)' }
          ],
          situacoesEspeciais: [
            { situacao: 'Convulsoes', conduta: 'Diazepam 5-10mg IV; atropina tambem ajuda' },
            { situacao: 'Sindrome intermediaria', conduta: 'Suporte ventilatório; pode durar semanas' }
          ],
          citations: [{ refId: 'crit-care-op-2023' }]
        },
        duracao: 'Atropina ate secrecoes controladas; pralidoxima por 24-48h ou mais'
      },
      acompanhamento: {
        frequenciaConsultas: 'UTI; observacao por 72-96h para sindrome intermediaria',
        examesControle: [
          'Colinesterase seriada',
          'Funcao respiratoria'
        ],
        metasTerapeuticas: [
          'Ausculta pulmonar limpa',
          'Forca muscular recuperada',
          'Colinesterase em recuperacao'
        ],
        criteriosEncaminhamento: [
          'UTI para todos casos moderados/graves',
          'Psiquiatria se tentativa de suicidio',
          'Pneumologia se sequelas'
        ],
        citations: [{ refId: 'who-pesticides-2022' }]
      },
      prevencao: {
        primaria: [
          'EPI para trabalhadores rurais',
          'Regulamentacao de pesticidas',
          'Restricao de acesso (suicidio)'
        ],
        secundaria: [
          'Treinamento em primeiros socorros',
          'Disponibilidade de atropina em areas rurais'
        ],
        citations: [{ refId: 'lancet-organophosphate-2021' }]
      }
    },
    protocolos: ['intoxicacao-organofosforados-manejo'],
    medicamentos: ['atropina', 'pralidoxima', 'diazepam'],
    calculadoras: [],
    citations: [{ refId: 'lancet-organophosphate-2021' }, { refId: 'crit-care-op-2023' }],
    lastUpdate: '2026-01',
    tags: ['organofosforados', 'pesticidas', 'sindrome-colinergica', 'atropina', 'pralidoxima']
  },

  // ============================================================================
  // INTOXICACAO POR MONOXIDO DE CARBONO
  // ============================================================================
  {
    id: 'intoxicacao-monoxido-carbono',
    titulo: 'Intoxicacao por Monoxido de Carbono',
    sinonimos: ['Intoxicacao por CO', 'Envenenamento por CO'],
    doid: 'DOID:11558',
    snomedCT: '242383002',
    meshId: 'D002249',
    ciap2: ['A86'],
    cid10: ['T58'],
    cid11: ['NE60.0'],
    categoria: 'outros',
    subcategoria: 'toxicologia',
    quickView: {
      definicao: 'Intoxicacao por gas incolor e inodoro que se liga a hemoglobina com afinidade 200-250x maior que O2. Causa hipoxia tecidual. Tratamento: oxigenio a 100% ou camara hiperbarica.',
      criteriosDiagnosticos: [
        'Historia de exposicao (incendio, aquecedor, carro em garagem)',
        'Carboxihemoglobina (COHb) >3% em nao fumantes, >10% em fumantes',
        'Sintomas: cefaleia, nausea, tontura, confusao',
        'Oximetria de pulso NORMAL (nao detecta COHb)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Remover da fonte de exposicao',
          'Oxigenio 100% por mascara de alto fluxo',
          'Considerar camara hiperbarica se criterios'
        ],
        farmacologico: [
          'Nao ha antidoto especifico',
          'O2 100% reduz meia-vida de COHb de 5h para 1h',
          'Oxigenoterapia hiperbarica (HBO) reduz para 20min'
        ]
      },
      metasTerapeuticas: [
        'COHb <5%',
        'Resolucao de sintomas',
        'Prevencao de sequelas neurologicas tardias'
      ],
      examesIniciais: [
        'COHb (co-oximetria, nao oximetro de pulso)',
        'Gasometria arterial',
        'Lactato, troponina, ECG'
      ],
      redFlags: [
        'Perda de consciencia',
        'Isquemia miocardica',
        'Gravidez',
        'COHb >25%'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '~50.000 visitas a emergencia/ano nos EUA',
        mortalidade: '~400 mortes nao-intencionais/ano nos EUA',
        fatoresRisco: [
          'Aquecedores a gas mal ventilados',
          'Incendios',
          'Carro ligado em garagem fechada',
          'Inverno (uso de aquecedores)'
        ],
        citations: [{ refId: 'cdc-co-poisoning-2023' }]
      },
      fisiopatologia: {
        texto: 'CO liga-se a hemoglobina com afinidade 200-250x maior que O2, formando carboxihemoglobina (COHb). Desloca curva de dissociacao da Hb para esquerda, reduzindo liberacao de O2 aos tecidos. Tambem inibe citocromo oxidase mitocondrial.',
        citations: [{ refId: 'nejm-co-poisoning-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Cefaleia (sintoma mais comum)',
          'Nausea, vomitos',
          'Tontura, fraqueza',
          'Confusao, sincope',
          'Coma, convulsoes (graves)'
        ],
        sinaisExameFisico: [
          'Pele rosea (cherry red) - raro, tardio',
          'Taquicardia',
          'Alteracao do nivel de consciencia',
          'SpO2 normal (falso-tranquilizador)'
        ],
        formasClinicas: [
          'Intoxicacao aguda',
          'Sindrome neurologica tardia (2-40 dias): parkinsonismo, deficit cognitivo'
        ],
        citations: [{ refId: 'nejm-co-poisoning-2021' }]
      },
      diagnostico: {
        criterios: [
          'Historia de exposicao + sintomas compativeis',
          'COHb elevada (>3% nao fumantes, >10% fumantes)',
          'Exclusao de outras causas'
        ],
        diagnosticoDiferencial: [
          'Enxaqueca',
          'Gastroenterite viral',
          'Intoxicacao alimentar',
          'Sindrome gripal'
        ],
        examesLaboratoriais: [
          'COHb por co-oximetria (nao usar SpO2)',
          'Gasometria arterial',
          'Lactato (marcador de hipoxia tecidual)',
          'Troponina, ECG',
          'BetaHCG em mulheres'
        ],
        citations: [{ refId: 'uhms-hbo-guidelines-2022' }]
      },
      tratamento: {
        objetivos: [
          'Eliminar CO da hemoglobina',
          'Restaurar oxigenacao tecidual',
          'Prevenir sequelas neurologicas'
        ],
        naoFarmacologico: {
          medidas: [
            'Remocao da fonte de CO',
            'O2 100% por mascara com reservatorio (15L/min)',
            'Oxigenoterapia hiperbarica se: perda de consciencia, COHb >25%, isquemia miocardica, gestante com COHb >15%, sintomas neurologicos'
          ],
          citations: [{ refId: 'uhms-hbo-guidelines-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Oxigenoterapia', medicamentos: ['Oxigenio 100%'], posologia: 'Mascara de alto fluxo ate COHb <5% e assintomatico', observacoes: 'HBO reduz meia-vida de 60min (O2 100%) para 20min' }
          ],
          situacoesEspeciais: [
            { situacao: 'Gestante', conduta: 'HBO indicada com COHb >15%; O2 por mais tempo (Hb fetal tem maior afinidade)' },
            { situacao: 'Intoxicacao por fumaca', conduta: 'Considerar cianeto concomitante (hidroxocobalamina)' }
          ],
          citations: [{ refId: 'nejm-co-poisoning-2021' }]
        },
        duracao: 'O2 ate COHb <5% e assintomatico; minimo 6h'
      },
      acompanhamento: {
        frequenciaConsultas: 'Reavaliacao em 1-4 semanas para sindrome neurologica tardia',
        examesControle: [
          'COHb seriada ate normalizacao',
          'Avaliacao neurologica'
        ],
        metasTerapeuticas: [
          'COHb <5%',
          'Sem sequelas neurologicas',
          'Correcao da fonte de CO'
        ],
        criteriosEncaminhamento: [
          'Centro com camara hiperbarica se indicado',
          'Neurologia se sintomas persistentes',
          'Saude ocupacional se exposicao no trabalho'
        ],
        citations: [{ refId: 'uhms-hbo-guidelines-2022' }]
      },
      prevencao: {
        primaria: [
          'Detectores de CO residenciais',
          'Manutencao de aquecedores e caldeiras',
          'Nao usar carro em garagem fechada'
        ],
        secundaria: [
          'Educacao sobre sintomas',
          'Busca ativa de expostos em incidentes'
        ],
        citations: [{ refId: 'cdc-co-poisoning-2023' }]
      }
    },
    protocolos: ['intoxicacao-co-manejo'],
    medicamentos: [],
    calculadoras: ['cohb-halflife'],
    citations: [{ refId: 'nejm-co-poisoning-2021' }, { refId: 'uhms-hbo-guidelines-2022' }],
    lastUpdate: '2026-01',
    tags: ['monoxido-carbono', 'CO', 'carboxihemoglobina', 'hiperbarica', 'emergencia']
  },

  // ============================================================================
  // SINDROME SEROTONINERGICA
  // ============================================================================
  {
    id: 'sindrome-serotoninergica',
    titulo: 'Sindrome Serotoninergica',
    sinonimos: ['Toxicidade serotoninergica', 'Serotonin Syndrome'],
    doid: 'DOID:0060606',
    snomedCT: '405800001',
    meshId: 'D020230',
    ciap2: ['A84'],
    cid10: ['G25.7'],
    cid11: ['6E62'],
    categoria: 'neurologico',
    subcategoria: 'toxicologia',
    quickView: {
      definicao: 'Emergencia causada por excesso de serotonina no SNC. Triade: alteracao do estado mental, hiperatividade autonomica e anormalidades neuromusculares. Gatilho: interacao medicamentosa serotoninergica.',
      criteriosDiagnosticos: [
        'Criterios de Hunter: uso de agente serotoninergico + pelo menos um de:',
        '- Clonus espontaneo',
        '- Clonus induzido + agitacao ou diaforese',
        '- Tremor + hiperreflexia',
        '- Hipertonia + temperatura >38C + clonus ou mioclonia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Suspender todos agentes serotoninergicos',
          'Suporte: hidratacao, resfriamento',
          'Sedacao com benzodiazepinicos'
        ],
        farmacologico: [
          'DIAZEPAM 5-10mg IV para agitacao e rigidez',
          'CIPROHEPTADINA 12mg VO inicial, depois 2mg a cada 2h (antagonista 5-HT2A)',
          'Evitar antipireticos (hipertermia nao e central)'
        ]
      },
      metasTerapeuticas: [
        'Temperatura <38.5C',
        'Resolucao de clonus',
        'Estabilidade autonomica'
      ],
      examesIniciais: [
        'CPK (rabdomiolise)',
        'Funcao renal, eletrolitos',
        'Gasometria',
        'Screening toxicologico'
      ],
      redFlags: [
        'Temperatura >41C',
        'Rigidez extrema',
        'Rabdomiolise',
        'CIVD'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Incidencia crescente com uso de antidepressivos',
        mortalidade: '2-12% em casos graves; rara com tratamento adequado',
        fatoresRisco: [
          'Combinacao de ISRS + IMAO',
          'ISRS + tramadol ou meperidina',
          'ISRS + triptanos',
          'IMAO + dextrometorfano'
        ],
        citations: [{ refId: 'nejm-serotonin-syndrome-2020' }]
      },
      fisiopatologia: {
        texto: 'Excesso de serotonina ativando receptores 5-HT1A e 5-HT2A no tronco cerebral e medula. Combinacoes de farmacos que aumentam sintese, liberacao, reduzem recaptacao ou metabolismo, ou agonismo direto.',
        citations: [{ refId: 'pharmacol-serotonin-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Alteracao mental: agitacao, confusao, delirium',
          'Autonomica: diaforese, taquicardia, hipertensao, hipertermia',
          'Neuromuscular: clonus, hiperreflexia, tremor, rigidez'
        ],
        sinaisExameFisico: [
          'Clonus (espontaneo ou induzido, maior em MMII)',
          'Midriase',
          'Hiperreflexia',
          'Tremor',
          'Diaforese profusa'
        ],
        formasClinicas: [
          'Leve: tremor, taquicardia, diaforese',
          'Moderada: agitacao, clonus, hipertermia <40C',
          'Grave: hipertermia >40C, rigidez, rabdomiolise, CIVD'
        ],
        citations: [{ refId: 'nejm-serotonin-syndrome-2020' }]
      },
      diagnostico: {
        criterios: [
          'Criterios de Hunter (sensibilidade 84%, especificidade 97%)',
          'Requer uso de agente serotoninergico nas ultimas 5 semanas',
          'Exclusao de outras causas'
        ],
        diagnosticoDiferencial: [
          'Sindrome neuroleptica maligna (bradicinesia vs clonus)',
          'Hipertermia maligna',
          'Encefalite',
          'Intoxicacao por anticolinergicos',
          'Tireotoxicose'
        ],
        examesLaboratoriais: [
          'CPK (rabdomiolise)',
          'Funcao renal e hepatica',
          'Coagulograma (CIVD)',
          'Gasometria, lactato'
        ],
        citations: [{ refId: 'crit-care-serotonin-2022' }]
      },
      tratamento: {
        objetivos: [
          'Remover agente causador',
          'Controlar agitacao e rigidez',
          'Prevenir complicacoes'
        ],
        naoFarmacologico: {
          medidas: [
            'Suspender TODOS agentes serotoninergicos',
            'Resfriamento ativo se temperatura >41C',
            'Hidratacao vigorosa',
            'Intubacao se rigidez grave'
          ],
          citations: [{ refId: 'nejm-serotonin-syndrome-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Benzodiazepinicos', medicamentos: ['Diazepam', 'Lorazepam'], posologia: 'Diazepam 5-10mg IV; repetir conforme necessario', observacoes: 'Primeira linha para agitacao e rigidez' },
            { classe: 'Antagonista 5-HT2A', medicamentos: ['Ciproheptadina'], posologia: '12mg VO inicial, depois 2mg a cada 2h; max 32mg/dia', observacoes: 'Disponivel apenas VO; considerar por SNG' }
          ],
          situacoesEspeciais: [
            { situacao: 'Hipertermia refrataria', conduta: 'Paralisia neuromuscular + intubacao; evitar succinilcolina' },
            { situacao: 'Uso de IMAO', conduta: 'Sintomas podem durar semanas; observacao prolongada' }
          ],
          citations: [{ refId: 'crit-care-serotonin-2022' }]
        },
        duracao: 'Maioria resolve em 24-72h apos suspensao do agente'
      },
      acompanhamento: {
        frequenciaConsultas: 'UTI ate estabilizacao; ambulatorio em 1 semana',
        metasTerapeuticas: [
          'Resolucao dos sintomas',
          'CPK normalizada',
          'Plano seguro de retorno de medicacoes psiquiatricas'
        ],
        criteriosEncaminhamento: [
          'UTI se sintomas moderados/graves',
          'Psiquiatria para reavaliacao de medicacoes',
          'Centro de toxicologia para consulta'
        ],
        citations: [{ refId: 'nejm-serotonin-syndrome-2020' }]
      },
      prevencao: {
        primaria: [
          'Evitar combinacoes serotoninergicas',
          'Wash-out adequado ao trocar IMAO (2-5 semanas)',
          'Educacao sobre interacoes'
        ],
        secundaria: [
          'Reconhecimento precoce',
          'Alertas em prontuario eletronico'
        ],
        citations: [{ refId: 'pharmacol-serotonin-2021' }]
      }
    },
    protocolos: ['sindrome-serotoninergica-manejo'],
    medicamentos: ['ciproheptadina', 'diazepam'],
    calculadoras: ['hunter-criteria'],
    citations: [{ refId: 'nejm-serotonin-syndrome-2020' }, { refId: 'crit-care-serotonin-2022' }],
    lastUpdate: '2026-01',
    tags: ['sindrome-serotoninergica', 'serotonina', 'clonus', 'ISRS', 'IMAO']
  },

  // ============================================================================
  // SINDROME NEUROLEPTICA MALIGNA
  // ============================================================================
  {
    id: 'sindrome-neuroleptica-maligna',
    titulo: 'Sindrome Neuroleptica Maligna',
    sinonimos: ['SNM', 'Neuroleptic Malignant Syndrome'],
    doid: 'DOID:0080010',
    snomedCT: '73297009',
    meshId: 'D009459',
    ciap2: ['N07'],
    cid10: ['G21.0'],
    cid11: ['6A41'],
    categoria: 'neurologico',
    subcategoria: 'toxicologia',
    quickView: {
      definicao: 'Reacao idiossinc a bloqueio dopaminergico (antipsicoticos). Tetrade: febre, rigidez, alteracao mental, disautonomia. Emergencia com mortalidade 5-10%. Tratamento: suporte + dantrolene/bromocriptina.',
      criteriosDiagnosticos: [
        'Exposicao a agente bloqueador de dopamina',
        'Hipertermia (>38C)',
        'Rigidez muscular intensa (tubo de chumbo)',
        'Alteracao do nivel de consciencia',
        'Disautonomia (taquicardia, PA labil, diaforese)',
        'CPK muito elevada (>1000 U/L)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Suspender neuroleptico imediatamente',
          'Resfriamento agressivo',
          'Hidratacao IV vigorosa',
          'Suporte em UTI'
        ],
        farmacologico: [
          'DANTROLENE 1-2.5mg/kg IV a cada 6h (relaxante muscular)',
          'BROMOCRIPTINA 2.5-10mg VO/SNG 3x/dia (agonista dopaminergico)',
          'Benzodiazepinicos para rigidez leve'
        ]
      },
      metasTerapeuticas: [
        'Temperatura <38C',
        'Reducao da rigidez',
        'CPK em queda'
      ],
      examesIniciais: [
        'CPK (muito elevada)',
        'Funcao renal (rabdomiolise)',
        'Eletrolitos, gasometria',
        'Hemograma (leucocitose)'
      ],
      redFlags: [
        'Temperatura >41C',
        'IRA por rabdomiolise',
        'Insuficiencia respiratoria',
        'CIVD'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0.02-0.03% dos pacientes em uso de antipsicoticos',
        mortalidade: '5-10% (era 30% antes de UTIs modernas)',
        faixaEtaria: 'Qualquer idade; mais comum em adultos jovens',
        fatoresRisco: [
          'Antipsicoticos de alta potencia (haloperidol)',
          'Dose alta ou aumento rapido',
          'Desidratacao',
          'Agitacao psicomotora',
          'Historia previa de SNM'
        ],
        citations: [{ refId: 'lancet-psychiatry-nms-2022' }]
      },
      fisiopatologia: {
        texto: 'Bloqueio de receptores D2 no hipotalamo (desregulacao termica) e estriado (rigidez). Tambem desregulacao do sistema simpatico. Susceptibilidade individual desconhecida.',
        citations: [{ refId: 'neurotherapeutics-nms-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Hipertermia (pode >40C)',
          'Rigidez muscular difusa (tubo de chumbo)',
          'Alteracao mental: confusao, mutismo, coma',
          'Disautonomia: taquicardia, PA labil, diaforese, sialorreia'
        ],
        sinaisExameFisico: [
          'Rigidez generalizada (cera, tubo de chumbo)',
          'Tremor',
          'Bradicinesia',
          'Disfagia',
          'Incontinencia'
        ],
        formasClinicas: [
          'Classica: todos elementos da tetrade',
          'Atipica: com antipsicoticos atipicos (menor rigidez)',
          'Recorrente: em pacientes re-expostos'
        ],
        citations: [{ refId: 'lancet-psychiatry-nms-2022' }]
      },
      diagnostico: {
        criterios: [
          'Criterios DSM-5: exposicao a bloqueador D2 + rigidez + hipertermia + 2 de: diaforese, disfagia, tremor, incontinencia, alteracao consciencia, mutismo, taquicardia, PA labil, leucocitose, CPK elevada',
          'Exclusao de outras causas'
        ],
        diagnosticoDiferencial: [
          'Sindrome serotoninergica (clonus vs rigidez)',
          'Hipertermia maligna (exposicao a anestesicos)',
          'Catatonia letal',
          'Encefalite',
          'Golpe de calor'
        ],
        examesLaboratoriais: [
          'CPK muito elevada (>1000, pode >100.000)',
          'Leucocitose',
          'Mioglobinuria',
          'Funcao renal (IRA)',
          'Coagulograma (CIVD)'
        ],
        citations: [{ refId: 'neurotherapeutics-nms-2021' }]
      },
      tratamento: {
        objetivos: [
          'Suspender agente causador',
          'Controlar hipertermia e rigidez',
          'Prevenir insuficiencia renal'
        ],
        naoFarmacologico: {
          medidas: [
            'Suspensao imediata do neuroleptico',
            'Resfriamento externo agressivo',
            'Hidratacao IV (prevenir IRA)',
            'Intubacao se insuficiencia respiratoria'
          ],
          citations: [{ refId: 'lancet-psychiatry-nms-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Relaxante muscular', medicamentos: ['Dantrolene'], posologia: '1-2.5mg/kg IV a cada 6h; max 10mg/kg/dia', observacoes: 'Hepatotoxico; monitorar funcao hepatica' },
            { classe: 'Agonista dopaminergico', medicamentos: ['Bromocriptina'], posologia: '2.5-10mg VO/SNG 3x/dia', observacoes: 'Continuar por 10 dias apos resolucao' }
          ],
          segundaLinha: [
            { classe: 'Benzodiazepinicos', medicamentos: ['Lorazepam'], posologia: '1-2mg IV a cada 4-6h', observacoes: 'Util em casos leves ou componente catatonico' }
          ],
          situacoesEspeciais: [
            { situacao: 'ECT', conduta: 'Considerar para casos refratarios ou catatonia' }
          ],
          citations: [{ refId: 'neurotherapeutics-nms-2021' }]
        },
        duracao: 'Media 7-14 dias; antipsicotico depot pode durar semanas'
      },
      acompanhamento: {
        frequenciaConsultas: 'UTI; resolucao em media 7-10 dias',
        examesControle: [
          'CPK diaria',
          'Funcao renal',
          'Temperatura'
        ],
        metasTerapeuticas: [
          'Normotermia',
          'CPK <1000',
          'Funcao renal preservada'
        ],
        criteriosEncaminhamento: [
          'UTI para todos os casos',
          'Nefrologia se IRA',
          'Psiquiatria para plano de reintroducao'
        ],
        citations: [{ refId: 'lancet-psychiatry-nms-2022' }]
      },
      prevencao: {
        primaria: [
          'Inicio com doses baixas de antipsicoticos',
          'Hidratacao adequada',
          'Evitar antipsicoticos de alta potencia em pacientes de risco'
        ],
        secundaria: [
          'Se necessario reintroduzir, aguardar 2 semanas, usar agente diferente, baixa potencia',
          'Monitoracao intensiva na reintroducao'
        ],
        citations: [{ refId: 'neurotherapeutics-nms-2021' }]
      }
    },
    protocolos: ['snm-manejo'],
    medicamentos: ['dantrolene', 'bromocriptina'],
    calculadoras: [],
    citations: [{ refId: 'lancet-psychiatry-nms-2022' }, { refId: 'neurotherapeutics-nms-2021' }],
    lastUpdate: '2026-01',
    tags: ['sindrome-neuroleptica-maligna', 'SNM', 'antipsicoticos', 'rigidez', 'hipertermia']
  },

  // ============================================================================
  // INTOXICACAO POR LITIO
  // ============================================================================
  {
    id: 'intoxicacao-litio',
    titulo: 'Intoxicacao por Litio',
    sinonimos: ['Toxicidade por litio', 'Litemia elevada'],
    doid: 'DOID:11557',
    snomedCT: '84757009',
    meshId: 'D018188',
    ciap2: ['A84'],
    cid10: ['T43.5'],
    cid11: ['NE61.6'],
    categoria: 'neurologico',
    subcategoria: 'toxicologia',
    quickView: {
      definicao: 'Intoxicacao por litio (janela terapeutica estreita: 0.6-1.2 mEq/L). Sintomas neurologicos predominam. Risco aumentado com desidratacao ou uso de IECA/diureticos. Hemodialise e tratamento de escolha.',
      criteriosDiagnosticos: [
        'Litemia >1.5 mEq/L com sintomas ou >2.0 mEq/L',
        'Sintomas neurologicos: tremor, ataxia, confusao',
        'GI: nausea, vomitos, diarreia',
        'Tipos: aguda, cronica, aguda sobre cronica'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratacao IV vigorosa com SF 0.9%',
          'Suspender litio e agentes que aumentam litemia',
          'Hemodialise se criterios'
        ],
        farmacologico: [
          'Nao ha antidoto especifico',
          'Nao usar diureticos',
          'Hemodialise: litio >4 mEq/L, ou >2.5 com sintomas graves, ou IRA'
        ]
      },
      metasTerapeuticas: [
        'Litemia <1.0 mEq/L',
        'Resolucao de sintomas neurologicos',
        'Funcao renal estavel'
      ],
      examesIniciais: [
        'Litio serico (e seriado)',
        'Funcao renal, eletrolitos',
        'TSH (hipotireoidismo)',
        'ECG (alteracoes T)'
      ],
      redFlags: [
        'Convulsoes',
        'Coma',
        'Arritmias',
        'IRA'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '~5.000 casos/ano nos EUA',
        mortalidade: '9-25% em intoxicacao grave sem dialise',
        fatoresRisco: [
          'Uso de IECA ou ARA-II',
          'Diureticos tiazidicos',
          'Desidratacao (diarreia, vomitos)',
          'Insuficiencia renal',
          'Idade avancada'
        ],
        citations: [{ refId: 'kdigo-lithium-2023' }]
      },
      fisiopatologia: {
        texto: 'Litio e reabsorvido no tubulo proximal (compete com sodio). Desidratacao ou hiponatremia aumentam reabsorcao. Toxicidade afeta principalmente SNC (neurons mais sensiveis) e rins.',
        citations: [{ refId: 'clin-pharmacol-lithium-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Neurologicos: tremor grosseiro, ataxia, disartria, confusao, mioclonias',
          'GI: nausea, vomitos, diarreia',
          'Renais: poliuria, diabetes insipidus nefrogenico',
          'Graves: convulsoes, coma, encefalopatia permanente (SILENT)'
        ],
        sinaisExameFisico: [
          'Tremor de acao (grosseiro)',
          'Hiperreflexia',
          'Fasciculacoes',
          'Rigidez em casos graves',
          'Alteracao de nivel de consciencia'
        ],
        formasClinicas: [
          'Intoxicacao aguda: mais sintomas GI, menos neurotoxicidade',
          'Intoxicacao cronica: mais neurotoxicidade com litemias menores',
          'Aguda sobre cronica: mais grave'
        ],
        citations: [{ refId: 'nephrol-lithium-2022' }]
      },
      diagnostico: {
        criterios: [
          'Litemia >1.5 mEq/L com sintomas',
          'Litemia >2.0 mEq/L mesmo assintomatico',
          'Intoxicacao cronica pode ser sintomatica com litemias mais baixas'
        ],
        diagnosticoDiferencial: [
          'Sindrome neuroleptica maligna',
          'Sindrome serotoninergica',
          'Encefalite',
          'Uremia'
        ],
        examesLaboratoriais: [
          'Litio serico (a cada 2-4h)',
          'Creatinina, ureia',
          'Sodio, potassio',
          'TSH, gasometria'
        ],
        citations: [{ refId: 'kdigo-lithium-2023' }]
      },
      tratamento: {
        objetivos: [
          'Aumentar eliminacao de litio',
          'Suporte neurologico',
          'Prevenir sequelas'
        ],
        naoFarmacologico: {
          medidas: [
            'Hidratacao IV com SF 0.9% (nao usar solucao hipertonica)',
            'Hemodialise intermitente (mais efetiva) ou CVVHD',
            'Indicacoes de HD: litio >4, ou >2.5 com sintomas graves, ou IRA, ou alteracao consciencia'
          ],
          citations: [{ refId: 'extrip-lithium-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Hidratacao', medicamentos: ['SF 0.9%'], posologia: '1-2L nas primeiras horas; ajustar conforme debito urinario', observacoes: 'Evitar diureticos; nao usar diureticos de alca' }
          ],
          situacoesEspeciais: [
            { situacao: 'Convulsoes', conduta: 'Benzodiazepinicos (lorazepam 2-4mg IV)' },
            { situacao: 'Rebote pos-dialise', conduta: 'Repetir HD se litio >1.0 6h apos ou ressurgimento de sintomas' }
          ],
          citations: [{ refId: 'extrip-lithium-2020' }]
        },
        duracao: 'Ate litemia <1.0 e sintomas resolvidos'
      },
      acompanhamento: {
        frequenciaConsultas: 'Litemia a cada 4-6h; apos alta, em 1 semana',
        examesControle: [
          'Litemia seriada',
          'Funcao renal',
          'TSH'
        ],
        metasTerapeuticas: [
          'Litemia <1.0 mEq/L',
          'Funcao neurologica preservada',
          'Funcao renal estavel'
        ],
        criteriosEncaminhamento: [
          'UTI se intoxicacao grave',
          'Nefrologia para hemodialise',
          'Psiquiatria para ajuste de tratamento'
        ],
        citations: [{ refId: 'kdigo-lithium-2023' }]
      },
      prevencao: {
        primaria: [
          'Monitoracao de litemia regular (3-6 meses)',
          'Educacao sobre hidratacao e interacoes',
          'Evitar IECA/diureticos se possivel'
        ],
        secundaria: [
          'Ajuste de dose em diarreia, vomitos, febre',
          'Check litemia antes de cirurgias'
        ],
        citations: [{ refId: 'clin-pharmacol-lithium-2021' }]
      }
    },
    protocolos: ['intoxicacao-litio-manejo'],
    medicamentos: [],
    calculadoras: ['clearance-litio'],
    citations: [{ refId: 'extrip-lithium-2020' }, { refId: 'kdigo-lithium-2023' }],
    lastUpdate: '2026-01',
    tags: ['litio', 'intoxicacao', 'hemodialise', 'bipolar', 'neurotoxicidade']
  },

  // ============================================================================
  // INTOXICACAO DIGITALICA
  // ============================================================================
  {
    id: 'intoxicacao-digitalica',
    titulo: 'Intoxicacao Digitalica',
    sinonimos: ['Toxicidade por digoxina', 'Intoxicacao por digitalis'],
    doid: 'DOID:9442',
    snomedCT: '84246002',
    meshId: 'D004072',
    ciap2: ['K84'],
    cid10: ['T46.0'],
    cid11: ['NE61.5'],
    categoria: 'cardiovascular',
    subcategoria: 'toxicologia',
    quickView: {
      definicao: 'Intoxicacao por glicosideo cardiaco com janela terapeutica estreita (0.5-2.0 ng/mL). Arritmias potencialmente fatais. Antidoto: fragmentos Fab anti-digoxina (Digibind).',
      criteriosDiagnosticos: [
        'Nivel serico digoxina >2 ng/mL ou qualquer nivel com sintomas',
        'Arritmias caracteristicas: TAP com bloqueio, ritmo juncional',
        'Sintomas GI: nausea, vomitos, anorexia',
        'Visuais: visao amarelada (xantopsia), halos',
        'Hipercalemia (marcador de gravidade)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Suspender digoxina',
          'Corrigir disturbios eletroliticos (K, Mg)',
          'Monitoracao cardiaca continua'
        ],
        farmacologico: [
          'DIGIBIND (Fab anti-digoxina): arritmias graves, K+ >5.5, nivel >10ng/mL',
          'Dose: ng ingeridos/0.5 ou nivel serico x peso x 0.4',
          'Atropina para bradicardia',
          'Lidocaina ou fenitoina para arritmias ventriculares'
        ]
      },
      metasTerapeuticas: [
        'Ritmo sinusal',
        'Potassio 4.0-5.0 mEq/L',
        'Estabilidade hemodinamica'
      ],
      examesIniciais: [
        'Digoxina serica (e seriada)',
        'Potassio, magnesio, calcio',
        'Funcao renal',
        'ECG'
      ],
      redFlags: [
        'Hipercalemia >5.5 mEq/L',
        'Arritmia ventricular',
        'Bloqueio AV de alto grau',
        'Nivel >10 ng/mL'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '~5% dos usuarios cronicos desenvolvem toxicidade',
        mortalidade: '20% sem tratamento; <5% com Fab',
        fatoresRisco: [
          'Insuficiencia renal (clearance diminuido)',
          'Hipocalemia (sensibiliza ao digital)',
          'Idade avancada',
          'Interacoes: amiodarona, verapamil, quinidina'
        ],
        citations: [{ refId: 'jacc-digoxin-2021' }]
      },
      fisiopatologia: {
        texto: 'Digoxina inibe Na+/K+-ATPase, aumentando calcio intracelular (inotropismo). Em excesso, causa pos-despolarizacoes tardias e automaticidade aumentada. Hipocalemia potencializa toxicidade.',
        citations: [{ refId: 'pharmacol-digoxin-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'GI: nausea, vomitos, anorexia (mais precoces)',
          'Visuais: xantopsia (visao amarela/verde), halos',
          'Cardiacos: palpitacoes, sincope',
          'Neurologicos: confusao, letargia'
        ],
        sinaisExameFisico: [
          'Bradicardia',
          'Arritmias diversas',
          'Hipotensao'
        ],
        formasClinicas: [
          'Intoxicacao aguda: mais sintomas GI, hipercalemia',
          'Intoxicacao cronica: mais arritmias, hipocalemia'
        ],
        citations: [{ refId: 'jacc-digoxin-2021' }]
      },
      diagnostico: {
        criterios: [
          'Clinica compativel + nivel serico elevado',
          'Arritmia caracteristica mesmo com nivel normal',
          'ECG: efeito digitalico (cubeta, PR aumentado) vs toxicidade (arritmias)'
        ],
        diagnosticoDiferencial: [
          'Outras causas de arritmia',
          'Hipercalemia por outras causas',
          'Sindrome do seio doente'
        ],
        examesLaboratoriais: [
          'Digoxina serica (coletar >6h da dose)',
          'Potassio, magnesio, calcio',
          'Funcao renal',
          'Gasometria'
        ],
        examesImagem: [
          'ECG: TAP com bloqueio AV 2:1, ritmo juncional acelerado, bigeminismo ventricular, TV bidirecional'
        ],
        citations: [{ refId: 'heart-rhythm-digital-2022' }]
      },
      tratamento: {
        objetivos: [
          'Neutralizar digoxina com Fab',
          'Tratar arritmias',
          'Corrigir eletrolitos'
        ],
        naoFarmacologico: {
          medidas: [
            'Suspender digoxina',
            'Monitoracao cardiaca continua',
            'Carvao ativado se ingestao <1-2h (digoxina tem ciclo entero-hepatico)',
            'Corrigir hipocalemia e hipomagnesemia'
          ],
          citations: [{ refId: 'jacc-digoxin-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Anticorpo especifico', medicamentos: ['Digibind (Fab anti-digoxina)'], posologia: 'Dose = ng ingeridos x 0.8 / 0.5; ou nivel x peso x 0.4; ou empirica 10-20 frascos', observacoes: 'Indicado se: K+ >5.5, arritmia grave, nivel >10, instabilidade' },
            { classe: 'Anticolinergico', medicamentos: ['Atropina'], posologia: '0.5-1mg IV para bradicardia', observacoes: 'Temporario ate Fab' }
          ],
          segundaLinha: [
            { classe: 'Antiarritmico', medicamentos: ['Lidocaina', 'Fenitoina'], posologia: 'Lidocaina 1mg/kg bolus; Fenitoina 100mg IV lento', observacoes: 'Para arritmias ventriculares; fenitoina aumenta conducao AV' }
          ],
          situacoesEspeciais: [
            { situacao: 'Hipercalemia grave', conduta: 'Insulina + glicose, bicarbonato; NAO usar calcio (pode precipitar arritmia fatal)' },
            { situacao: 'Marca-passo', conduta: 'Se refratario a Fab; cuidado com inducao de arritmias' }
          ],
          citations: [{ refId: 'heart-rhythm-digital-2022' }]
        },
        duracao: 'Monitoracao por 12-24h apos Fab'
      },
      acompanhamento: {
        frequenciaConsultas: 'Cardiologia em 1 semana; reavaliar indicacao de digoxina',
        examesControle: [
          'ECG seriado',
          'Potassio',
          'Nivel de digoxina (invalido por 1-2 semanas apos Fab)'
        ],
        metasTerapeuticas: [
          'Ritmo sinusal ou controlado',
          'Eletrolitos normais',
          'Funcao renal estavel'
        ],
        criteriosEncaminhamento: [
          'UTI cardiaca',
          'Cardiologia para reavaliar tratamento',
          'Nefrologia se IRA'
        ],
        citations: [{ refId: 'jacc-digoxin-2021' }]
      },
      prevencao: {
        primaria: [
          'Monitoracao de nivel serico (cada 6-12 meses)',
          'Evitar interacoes (amiodarona aumenta nivel em 50%)',
          'Ajustar dose na DRC'
        ],
        secundaria: [
          'Monitorar eletrolitos',
          'Educacao sobre sintomas precoces'
        ],
        citations: [{ refId: 'pharmacol-digoxin-2020' }]
      }
    },
    protocolos: ['intoxicacao-digitalica-manejo'],
    medicamentos: ['digibind', 'atropina', 'lidocaina'],
    calculadoras: ['dose-digibind'],
    citations: [{ refId: 'jacc-digoxin-2021' }, { refId: 'heart-rhythm-digital-2022' }],
    lastUpdate: '2026-01',
    tags: ['digoxina', 'intoxicacao', 'arritmia', 'digibind', 'hipercalemia']
  },

  // ============================================================================
  // RABDOMIOLISE
  // ============================================================================
  {
    id: 'rabdomiolise',
    titulo: 'Rabdomiolise',
    sinonimos: ['Mioglobinuria', 'Destruicao muscular aguda'],
    doid: 'DOID:3236',
    snomedCT: '240131006',
    meshId: 'D012206',
    ciap2: ['L99'],
    cid10: ['M62.8', 'T79.6'],
    cid11: ['FB32.1'],
    categoria: 'musculoesqueletico',
    subcategoria: 'toxicologia',
    quickView: {
      definicao: 'Lise de musculo esqueletico com liberacao de mioglobina, CPK e eletrolitos. Causa IRA por nefrotoxicidade da mioglobina. Causas: trauma, drogas, exercicio, toxinas.',
      criteriosDiagnosticos: [
        'CPK >5x o limite superior normal (>1000 U/L)',
        'Mioglobinuria (urina escura)',
        'Sintomas: dor muscular, fraqueza, edema',
        'Causa identificavel'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratacao IV agressiva (meta: diurese 200-300 mL/h)',
          'Tratar causa subjacente',
          'Monitorar funcao renal e eletrolitos'
        ],
        farmacologico: [
          'SF 0.9% 1-2L/h inicialmente',
          'Bicarbonato de sodio: controverso, considerar se pH urinario <6.5',
          'Manitol: controverso, evitar em oliguria'
        ]
      },
      metasTerapeuticas: [
        'Diurese >200 mL/h',
        'Prevenir IRA',
        'CPK em queda'
      ],
      examesIniciais: [
        'CPK (e seriada)',
        'Funcao renal',
        'Potassio, calcio, fosforo',
        'Urina (mioglobina, sedimento)'
      ],
      redFlags: [
        'Oliguria/anuria',
        'Hipercalemia >6 mEq/L',
        'CPK >50.000 U/L',
        'Sindrome compartimental'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '~26.000 casos/ano nos EUA',
        incidencia: 'IRA em 10-50% dos casos',
        mortalidade: '5% geral; 20% se IRA com necessidade de dialise',
        fatoresRisco: [
          'Trauma/crush syndrome',
          'Uso de estatinas (especialmente + fibratos)',
          'Drogas ilicitas (cocaina, MDMA)',
          'Exercicio extenuante',
          'Hipertermia'
        ],
        citations: [{ refId: 'nejm-rhabdo-2021' }]
      },
      fisiopatologia: {
        texto: 'Lesao do sarcolema libera conteudo celular: mioglobina (nefrotoxica por precipitacao tubular e vasoconstrição), CPK, potassio, fosforo. Hipocalcemia inicial por deposicao no musculo lesado; hipercalcemia tardia na recuperacao.',
        citations: [{ refId: 'crit-care-rhabdo-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor muscular (mialgia difusa ou localizada)',
          'Fraqueza',
          'Edema muscular',
          'Urina escura (cor de cha ou coca-cola)',
          'Sintomas da causa (ex: historia de trauma)'
        ],
        sinaisExameFisico: [
          'Dor a palpacao muscular',
          'Edema',
          'Tensao compartimental',
          'Sinais da causa (marcas de agulha, trauma)'
        ],
        formasClinicas: [
          'Traumatica (crush syndrome)',
          'Nao traumatica: exercicio, toxinas, infeccoes, eletrolitos',
          'Hereditaria (doencas metabolicas musculares)'
        ],
        citations: [{ refId: 'nejm-rhabdo-2021' }]
      },
      diagnostico: {
        criterios: [
          'CPK >5x LSN (tipicamente >1000 U/L)',
          'Contexto clinico compativel',
          'Mioglobinuria (fita positiva para sangue sem hemacias)'
        ],
        diagnosticoDiferencial: [
          'Infarto agudo do miocardio (eleva CPK-MB)',
          'Miosite inflamatoria',
          'Hipotireoidismo grave'
        ],
        examesLaboratoriais: [
          'CPK total (seriada a cada 12-24h)',
          'Creatinina, ureia',
          'Potassio, fosforo, calcio',
          'Acido urico, DHL',
          'Mioglobina serica/urinaria'
        ],
        citations: [{ refId: 'crit-care-rhabdo-2022' }]
      },
      tratamento: {
        objetivos: [
          'Prevenir IRA',
          'Manter alto debito urinario',
          'Corrigir disturbios eletroliticos'
        ],
        naoFarmacologico: {
          medidas: [
            'Hidratacao IV agressiva: SF 0.9% 1-2L/h inicial, ajustar para diurese 200-300mL/h',
            'Tratar causa subjacente',
            'Fasciotomia se sindrome compartimental',
            'Hemodialise se IRA com hipercalemia ou sobrecarga'
          ],
          citations: [{ refId: 'kdigo-aki-rhabdo-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Cristaloide', medicamentos: ['SF 0.9%'], posologia: '1-2L/h inicial; depois ajustar para manter diurese 200-300mL/h', observacoes: 'Meta: balanco positivo de 6-12L nas primeiras 24h' }
          ],
          segundaLinha: [
            { classe: 'Alcalinizante', medicamentos: ['Bicarbonato de sodio'], posologia: '150mEq em 1L D5W; manter pH urinario >6.5', observacoes: 'Controverso; pode piorar hipocalcemia' }
          ],
          situacoesEspeciais: [
            { situacao: 'Hipercalemia', conduta: 'Insulina + glicose, bicarbonato, gluconato de calcio; dialise se refratario' },
            { situacao: 'Hipocalcemia', conduta: 'Repor apenas se sintomatica (tetania, QTc longo); reposicao agressiva pode causar hipercalcemia tardia' }
          ],
          citations: [{ refId: 'nejm-rhabdo-2021' }]
        },
        duracao: 'Ate CPK <5000 e funcao renal estavel'
      },
      acompanhamento: {
        frequenciaConsultas: 'CPK e funcao renal a cada 12-24h; ambulatorio em 1-2 semanas',
        examesControle: [
          'CPK seriada',
          'Funcao renal',
          'Eletrolitos'
        ],
        metasTerapeuticas: [
          'CPK <5000 U/L',
          'Creatinina estavel',
          'Diurese adequada'
        ],
        criteriosEncaminhamento: [
          'UTI se CPK >50.000 ou IRA',
          'Nefrologia se necessidade de dialise',
          'Cirurgia se sindrome compartimental',
          'Investigacao de miopatia hereditaria se recorrente'
        ],
        citations: [{ refId: 'kdigo-aki-rhabdo-2023' }]
      },
      prevencao: {
        primaria: [
          'Hidratacao em exercicios intensos',
          'Monitorar CPK em estatinas + fibratos',
          'Evitar drogas ilicitas'
        ],
        secundaria: [
          'Hidratacao precoce em crush syndrome',
          'Suspensao de estatina se CPK >10x LSN'
        ],
        citations: [{ refId: 'crit-care-rhabdo-2022' }]
      }
    },
    protocolos: ['rabdomiolise-manejo'],
    medicamentos: [],
    calculadoras: ['risco-ira-rabdo'],
    citations: [{ refId: 'nejm-rhabdo-2021' }, { refId: 'kdigo-aki-rhabdo-2023' }],
    lastUpdate: '2026-01',
    tags: ['rabdomiolise', 'mioglobinuria', 'CPK', 'insuficiencia-renal', 'estatinas']
  }
];
