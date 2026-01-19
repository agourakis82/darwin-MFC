/**
 * Expansão: Doenças Raras - Parte 1
 * 25 doenças raras (doenças lisossomais, distrofias musculares)
 * Darwin-MFC v1.6.0
 */

import type { Doenca } from '@/lib/types/doenca';

export const doencasRarasParte1: Partial<Doenca>[] = [
  // ============================================
  // DOENÇAS LISOSSOMAIS DE DEPÓSITO (10)
  // ============================================
  {
    id: 'doenca-gaucher',
    titulo: 'Doença de Gaucher',
    sinonimos: ['Deficiência de glicocerebrosidase', 'Lipidose por glicosilceramida'],
    doid: 'DOID:1926',
    snomedCT: '190794006',
    ordo: ['ORPHA:355'],
    ciap2: ['T99'],
    cid10: ['E75.2'],
    categoria: 'metabolico',
    subcategoria: 'doenca-lisossomal',
    quickView: {
      definicao: 'Doença lisossomal autossômica recessiva causada por deficiência de glicocerebrosidase, levando ao acúmulo de glicocerebrosídeo em macrófagos.',
      criteriosDiagnosticos: [
        'Hepatoesplenomegalia progressiva',
        'Citopenias (anemia, plaquetopenia)',
        'Dor óssea e fraturas patológicas',
        'Células de Gaucher na medula óssea',
        'Atividade enzimática reduzida (<15% do normal)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Acompanhamento multidisciplinar', 'Avaliação ortopédica regular'],
        farmacologico: ['Terapia de reposição enzimática (imiglucerase, velaglucerase)', 'Terapia de redução de substrato (eliglustat, miglustat)']
      },
      redFlags: ['Doença pulmonar progressiva', 'Comprometimento neurológico (tipos 2 e 3)', 'Crise óssea aguda']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:40.000-60.000 nascidos vivos (geral); 1:850 em judeus Ashkenazi',
        faixaEtaria: 'Tipo 1: qualquer idade; Tipo 2: lactentes; Tipo 3: infância',
        fatoresRisco: ['Ascendência judaica Ashkenazi', 'Consanguinidade'],
        citations: [{ refId: 'gaucher-registry-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Fadiga', 'Sangramento fácil', 'Dor óssea', 'Distensão abdominal'],
        sinaisExameFisico: ['Esplenomegalia maciça', 'Hepatomegalia', 'Palidez', 'Equimoses'],
        formasClinicas: ['Tipo 1 (não-neuropática)', 'Tipo 2 (neuropática aguda)', 'Tipo 3 (neuropática crônica)'],
        citations: [{ refId: 'gaucher-guidelines-2022' }]
      },
      diagnostico: {
        criterios: ['Atividade de β-glicocerebrosidase <15% em leucócitos', 'Análise molecular do gene GBA1'],
        diagnosticoDiferencial: ['Outras doenças de depósito', 'Leucemia', 'Linfoma', 'Doença de Niemann-Pick'],
        examesLaboratoriais: ['Dosagem enzimática em leucócitos', 'Quitotriosidase sérica', 'Hemograma', 'Ferritina'],
        examesImagem: ['RM de fêmur e coluna', 'USG abdominal', 'DXA'],
        citations: [{ refId: 'gaucher-diagnosis-2021' }]
      },
      tratamento: {
        objetivos: ['Reduzir esplenomegalia', 'Normalizar hemograma', 'Prevenir complicações ósseas'],
        naoFarmacologico: {
          medidas: ['Monitoramento regular', 'Suplementação vitamina D/cálcio'],
          citations: [{ refId: 'gaucher-management-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'TRE', medicamentos: ['Imiglucerase 60 U/kg a cada 2 sem', 'Velaglucerase alfa', 'Taliglucerase alfa'] }
          ],
          segundaLinha: [
            { classe: 'TRS', medicamentos: ['Eliglustat', 'Miglustat'] }
          ],
          citations: [{ refId: 'gaucher-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: ['Hemograma', 'Volume esplênico/hepático', 'RM óssea anual', 'DXA anual'],
        metasTerapeuticas: ['Hemoglobina >11 g/dL', 'Plaquetas >100.000', 'Redução de 30-50% do baço'],
        criteriosEncaminhamento: ['Centro de referência em doenças raras', 'Hematologia', 'Ortopedia'],
        citations: [{ refId: 'gaucher-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-gaucher-ms'],
    medicamentos: ['imiglucerase', 'velaglucerase', 'eliglustat', 'miglustat'],
    calculadoras: [],
    citations: [{ refId: 'gaucher-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'lisossomal', 'tre', 'esplenomegalia']
  },
  {
    id: 'doenca-fabry',
    titulo: 'Doença de Fabry',
    sinonimos: ['Deficiência de alfa-galactosidase A', 'Angioqueratoma corporal difuso'],
    doid: 'DOID:14499',
    snomedCT: '16652001',
    ordo: ['ORPHA:324'],
    ciap2: ['T99'],
    cid10: ['E75.2'],
    categoria: 'metabolico',
    subcategoria: 'doenca-lisossomal',
    quickView: {
      definicao: 'Doença lisossomal ligada ao X causada por deficiência de α-galactosidase A, com acúmulo de globotriaosilceramida (Gb3) em múltiplos órgãos.',
      criteriosDiagnosticos: [
        'Acroparestesias (dor neuropática em mãos/pés)',
        'Angioqueratomas cutâneos',
        'Córnea verticillata',
        'Proteinúria progressiva',
        'Cardiomiopatia hipertrófica',
        'AVC em jovens'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar calor extremo', 'Hidratação adequada'],
        farmacologico: ['TRE (agalsidase alfa ou beta)', 'Migalastat (variantes amenable)', 'Controle da dor neuropática']
      },
      redFlags: ['AVC', 'Insuficiência renal', 'Arritmias cardíacas', 'Insuficiência cardíaca']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:40.000-117.000 (formas clássicas); maior em screening neonatal',
        faixaEtaria: 'Homens: sintomas na infância; Mulheres: variável (heterozigotas)',
        fatoresRisco: ['Herança ligada ao X', 'História familiar'],
        citations: [{ refId: 'fabry-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Dor neuropática', 'Hipoidrose', 'Intolerância ao calor', 'Sintomas GI'],
        sinaisExameFisico: ['Angioqueratomas', 'Opacidade corneana', 'Edema de membros'],
        formasClinicas: ['Clássica (homens)', 'Tardia/atípica', 'Heterozigotas sintomáticas'],
        citations: [{ refId: 'fabry-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Atividade de α-Gal A reduzida (homens)', 'Análise molecular gene GLA', 'Gb3/lyso-Gb3 elevados'],
        diagnosticoDiferencial: ['Artrite reumatoide juvenil', 'Febre reumática', 'Nefropatia IgA'],
        examesLaboratoriais: ['α-Gal A em leucócitos/plasma', 'Lyso-Gb3 sérico', 'Creatinina', 'Proteinúria'],
        examesImagem: ['Eco cardíaco', 'RM cardíaca', 'RM cerebral'],
        citations: [{ refId: 'fabry-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Reduzir Gb3 tecidual', 'Prevenir complicações orgânicas', 'Controlar dor'],
        naoFarmacologico: {
          medidas: ['Evitar gatilhos de dor', 'Nefroproteção'],
          citations: [{ refId: 'fabry-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'TRE', medicamentos: ['Agalsidase alfa 0.2 mg/kg', 'Agalsidase beta 1 mg/kg'] },
            { classe: 'Chaperona', medicamentos: ['Migalastat 123 mg/dia (variantes amenable)'] }
          ],
          citations: [{ refId: 'fabry-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6 meses',
        examesControle: ['Lyso-Gb3', 'Função renal', 'Eco/RM cardíaca anual', 'RM cerebral'],
        metasTerapeuticas: ['Estabilização/melhora renal', 'Prevenção de eventos CV'],
        criteriosEncaminhamento: ['Nefrologia', 'Cardiologia', 'Neurologia', 'Centro de referência'],
        citations: [{ refId: 'fabry-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-fabry-ms'],
    medicamentos: ['agalsidase-alfa', 'agalsidase-beta', 'migalastat'],
    calculadoras: [],
    citations: [{ refId: 'fabry-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'lisossomal', 'ligada-x', 'neuropatia', 'cardiomiopatia']
  },
  {
    id: 'doenca-pompe',
    titulo: 'Doença de Pompe',
    sinonimos: ['Glicogenose tipo II', 'Deficiência de maltase ácida'],
    doid: 'DOID:2752',
    snomedCT: '124556006',
    ordo: ['ORPHA:365'],
    ciap2: ['T99'],
    cid10: ['E74.0'],
    categoria: 'metabolico',
    subcategoria: 'doenca-lisossomal',
    quickView: {
      definicao: 'Glicogenose lisossomal causada por deficiência de alfa-glicosidase ácida (GAA), com acúmulo de glicogênio em músculo cardíaco e esquelético.',
      criteriosDiagnosticos: [
        'Forma infantil: cardiomiopatia hipertrófica, hipotonia grave',
        'Forma tardia: fraqueza proximal progressiva, insuficiência respiratória',
        'Elevação de CK',
        'Atividade de GAA reduzida'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia respiratória', 'Suporte ventilatório', 'Nutrição adequada'],
        farmacologico: ['TRE (alfaglicosidase alfa - Myozyme)', 'Avalglicosidase alfa (Nexviazyme)']
      },
      redFlags: ['Insuficiência respiratória', 'Cardiomiopatia grave (infantil)', 'Disfagia']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:40.000 nascidos vivos',
        faixaEtaria: 'Infantil: primeiros meses; Tardia: infância a adulto',
        fatoresRisco: ['Autossômica recessiva', 'Consanguinidade'],
        citations: [{ refId: 'pompe-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Fraqueza muscular proximal', 'Dispneia', 'Dificuldade para subir escadas'],
        sinaisExameFisico: ['Hipotonia', 'Hepatomegalia (infantil)', 'Macroglossia', 'Escoliose'],
        formasClinicas: ['Infantil clássica', 'Infantil não-clássica', 'Tardia (juvenil/adulta)'],
        citations: [{ refId: 'pompe-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Atividade de GAA <1% (infantil) ou <30% (tardia)', 'Análise molecular gene GAA'],
        diagnosticoDiferencial: ['Distrofias musculares', 'Miopatias inflamatórias', 'Outras glicogenoses'],
        examesLaboratoriais: ['GAA em DBS/leucócitos', 'CK', 'Transaminases', 'Glc4 urinário'],
        examesImagem: ['RM muscular', 'Eco cardíaco', 'Polissonografia'],
        citations: [{ refId: 'pompe-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Estabilizar função motora', 'Preservar função respiratória', 'Sobrevida (infantil)'],
        naoFarmacologico: {
          medidas: ['VNI/VMI quando indicado', 'Fisioterapia motora e respiratória'],
          citations: [{ refId: 'pompe-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'TRE', medicamentos: ['Alfaglicosidase alfa 20 mg/kg a cada 2 sem'] }
          ],
          segundaLinha: [
            { classe: 'TRE 2ª geração', medicamentos: ['Avalglicosidase alfa'] }
          ],
          citations: [{ refId: 'pompe-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: ['Provas funcionais respiratórias', 'Teste de caminhada 6 min', 'CK', 'Eco cardíaco'],
        metasTerapeuticas: ['Estabilização da CVF', 'Manutenção da marcha'],
        criteriosEncaminhamento: ['Pneumologia', 'Neurologia', 'Centro de referência'],
        citations: [{ refId: 'pompe-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-pompe-ms'],
    medicamentos: ['alfaglicosidase-alfa', 'avalglicosidase-alfa'],
    calculadoras: [],
    citations: [{ refId: 'pompe-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'lisossomal', 'glicogenose', 'miopatia']
  },
  {
    id: 'mucopolissacaridose-i',
    titulo: 'Mucopolissacaridose Tipo I',
    sinonimos: ['MPS I', 'Síndrome de Hurler', 'Síndrome de Scheie', 'Hurler-Scheie'],
    doid: 'DOID:12800',
    snomedCT: '69088006',
    ordo: ['ORPHA:579'],
    ciap2: ['T99'],
    cid10: ['E76.0'],
    categoria: 'metabolico',
    subcategoria: 'mucopolissacaridose',
    quickView: {
      definicao: 'MPS causada por deficiência de α-L-iduronidase, com acúmulo de dermatan e heparan sulfato. Espectro de Hurler (grave) a Scheie (atenuada).',
      criteriosDiagnosticos: [
        'Fácies grosseira',
        'Hepatoesplenomegalia',
        'Disostose múltipla',
        'Opacificação corneana',
        'Déficit cognitivo (forma grave)',
        'GAGs urinários elevados'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Transplante de células-tronco hematopoiéticas (TCTH) para formas graves precoces'],
        farmacologico: ['TRE (laronidase)']
      },
      redFlags: ['Hidrocefalia', 'Compressão medular', 'Insuficiência cardíaca', 'Obstrução de vias aéreas']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:100.000 nascidos vivos',
        faixaEtaria: 'Hurler: 1º ano; Scheie: infância tardia/adulto',
        fatoresRisco: ['Autossômica recessiva'],
        citations: [{ refId: 'mps1-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Atraso do desenvolvimento', 'Rigidez articular', 'Infecções respiratórias recorrentes'],
        sinaisExameFisico: ['Macrocefalia', 'Hérnia umbilical/inguinal', 'Garra de mão', 'Cifose toracolombar'],
        formasClinicas: ['Hurler (MPS IH)', 'Hurler-Scheie (MPS IH/S)', 'Scheie (MPS IS)'],
        citations: [{ refId: 'mps1-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Atividade de α-L-iduronidase reduzida', 'GAGs urinários elevados', 'Análise molecular gene IDUA'],
        diagnosticoDiferencial: ['Outras MPS', 'Mucolipidoses', 'Oligossacaridoses'],
        examesLaboratoriais: ['α-L-iduronidase em leucócitos', 'GAGs urinários', 'Dermatan/heparan sulfato'],
        examesImagem: ['RX esqueleto', 'RM coluna/crânio', 'Eco cardíaco'],
        citations: [{ refId: 'mps1-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Prevenir progressão', 'Preservar cognição (TCTH precoce)', 'Qualidade de vida'],
        naoFarmacologico: {
          medidas: ['TCTH antes de 2 anos para Hurler', 'Suporte multidisciplinar'],
          citations: [{ refId: 'mps1-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'TRE', medicamentos: ['Laronidase 0.58 mg/kg/semana'] }
          ],
          citations: [{ refId: 'mps1-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: ['GAGs urinários', 'Avaliação neurocognitiva', 'Eco cardíaco', 'Audiometria'],
        metasTerapeuticas: ['Estabilização de GAGs', 'Preservação funcional'],
        criteriosEncaminhamento: ['Genética', 'Neurologia', 'Ortopedia', 'Centro de TCTH'],
        citations: [{ refId: 'mps1-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-mps1-ms'],
    medicamentos: ['laronidase'],
    calculadoras: [],
    citations: [{ refId: 'mps1-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'mps', 'lisossomal', 'tcth']
  },
  {
    id: 'mucopolissacaridose-ii',
    titulo: 'Mucopolissacaridose Tipo II',
    sinonimos: ['MPS II', 'Síndrome de Hunter'],
    doid: 'DOID:12797',
    snomedCT: '42502008',
    ordo: ['ORPHA:580'],
    ciap2: ['T99'],
    cid10: ['E76.1'],
    categoria: 'metabolico',
    subcategoria: 'mucopolissacaridose',
    quickView: {
      definicao: 'MPS ligada ao X causada por deficiência de iduronato-2-sulfatase, com acúmulo de dermatan e heparan sulfato. Afeta principalmente meninos.',
      criteriosDiagnosticos: [
        'Fácies grosseira',
        'Hepatoesplenomegalia',
        'Disostose múltipla',
        'Surdez neurossensorial',
        'Sem opacificação corneana (diferente da MPS I)',
        'Lesões papulares características'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Suporte multidisciplinar'],
        farmacologico: ['TRE (idursulfase)', 'Terapia intratecal (idursulfase-IT) para SNC']
      },
      redFlags: ['Hidrocefalia', 'Compressão medular cervical', 'Apneia do sono grave', 'Cardiomiopatia']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:100.000-150.000 nascidos vivos masculinos',
        faixaEtaria: 'Forma grave: 2-4 anos; Atenuada: infância tardia',
        fatoresRisco: ['Herança ligada ao X'],
        citations: [{ refId: 'mps2-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Atraso do desenvolvimento', 'Comportamento hiperativo', 'Rigidez articular', 'Respiração ruidosa'],
        sinaisExameFisico: ['Macrocefalia', 'Hirsutismo', 'Pápulas peroladas em escápulas', 'Hepatoesplenomegalia'],
        formasClinicas: ['Neuronopática (grave)', 'Não-neuronopática (atenuada)'],
        citations: [{ refId: 'mps2-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Atividade de I2S reduzida', 'GAGs urinários elevados', 'Análise molecular gene IDS'],
        diagnosticoDiferencial: ['MPS I', 'MPS VI', 'Outras MPS'],
        examesLaboratoriais: ['I2S em plasma/leucócitos', 'GAGs urinários'],
        examesImagem: ['RM crânio/coluna', 'Eco cardíaco', 'RX esqueleto'],
        citations: [{ refId: 'mps2-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Reduzir GAGs', 'Melhorar qualidade de vida', 'Tratar SNC (quando possível)'],
        naoFarmacologico: {
          medidas: ['Adenotonsilectomia se indicado', 'CPAP para SAOS'],
          citations: [{ refId: 'mps2-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'TRE', medicamentos: ['Idursulfase 0.5 mg/kg/semana'] }
          ],
          segundaLinha: [
            { classe: 'TRE intratecal', medicamentos: ['Idursulfase-IT'] }
          ],
          citations: [{ refId: 'mps2-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: ['GAGs urinários', 'Eco cardíaco', 'Polissonografia', 'RM cerebral'],
        metasTerapeuticas: ['Redução de GAGs', 'Estabilização funcional'],
        criteriosEncaminhamento: ['Genética', 'Neurologia', 'Pneumologia', 'ORL'],
        citations: [{ refId: 'mps2-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-mps2-ms'],
    medicamentos: ['idursulfase'],
    calculadoras: [],
    citations: [{ refId: 'mps2-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'mps', 'lisossomal', 'ligada-x']
  },
  {
    id: 'doenca-niemann-pick-a-b',
    titulo: 'Doença de Niemann-Pick Tipos A e B',
    sinonimos: ['Deficiência de esfingomielinase ácida', 'ASMD'],
    doid: 'DOID:14503',
    snomedCT: '58411008',
    ordo: ['ORPHA:77292'],
    ciap2: ['T99'],
    cid10: ['E75.2'],
    categoria: 'metabolico',
    subcategoria: 'doenca-lisossomal',
    quickView: {
      definicao: 'Doença lisossomal por deficiência de esfingomielinase ácida (ASM), com acúmulo de esfingomielina. Tipo A: neuronopático infantil fatal; Tipo B: visceral crônico.',
      criteriosDiagnosticos: [
        'Hepatoesplenomegalia',
        'Doença pulmonar intersticial',
        'Dislipidemia aterogênica',
        'Mancha vermelho-cereja na retina (tipo A)',
        'Regressão neurológica (tipo A)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Suporte respiratório', 'Acompanhamento nutricional'],
        farmacologico: ['Olipudase alfa (TRE aprovada para tipo B)', 'Suporte sintomático']
      },
      redFlags: ['Insuficiência respiratória', 'Cirrose hepática', 'Sangramento grave']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:250.000 nascidos vivos',
        faixaEtaria: 'Tipo A: lactentes; Tipo B: variável',
        fatoresRisco: ['Autossômica recessiva', 'Ascendência judaica Ashkenazi (tipo A)'],
        citations: [{ refId: 'npd-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Distensão abdominal', 'Dispneia', 'Infecções respiratórias'],
        sinaisExameFisico: ['Esplenomegalia maciça', 'Hepatomegalia', 'Hipocratismo digital'],
        formasClinicas: ['Tipo A (neuronopático infantil)', 'Tipo B (visceral crônico)', 'Intermediário A/B'],
        citations: [{ refId: 'npd-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Atividade de ASM reduzida', 'Lyso-SM elevado', 'Análise molecular gene SMPD1'],
        diagnosticoDiferencial: ['Doença de Gaucher', 'MPS', 'Niemann-Pick C'],
        examesLaboratoriais: ['ASM em leucócitos', 'Lyso-SM sérico', 'Perfil lipídico'],
        examesImagem: ['TC tórax', 'USG abdominal', 'DXA'],
        citations: [{ refId: 'npd-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Reduzir esfingomielina', 'Estabilizar função pulmonar', 'Reduzir organomegalias'],
        naoFarmacologico: {
          medidas: ['Oxigenoterapia se necessário', 'Vacinação antipneumocócica'],
          citations: [{ refId: 'npd-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'TRE', medicamentos: ['Olipudase alfa (dose escalonada)'] }
          ],
          citations: [{ refId: 'npd-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: ['Lyso-SM', 'Função pulmonar', 'Volume esplênico/hepático'],
        metasTerapeuticas: ['Estabilização pulmonar', 'Redução de organomegalias'],
        criteriosEncaminhamento: ['Pneumologia', 'Hepatologia', 'Centro de referência'],
        citations: [{ refId: 'npd-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-niemann-pick-ms'],
    medicamentos: ['olipudase-alfa'],
    calculadoras: [],
    citations: [{ refId: 'npd-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'lisossomal', 'esfingolipidose', 'pulmonar']
  },
  {
    id: 'doenca-niemann-pick-c',
    titulo: 'Doença de Niemann-Pick Tipo C',
    sinonimos: ['NPC', 'Alzheimer infantil'],
    doid: 'DOID:14504',
    snomedCT: '398055006',
    ordo: ['ORPHA:646'],
    ciap2: ['T99', 'N99'],
    cid10: ['E75.2'],
    categoria: 'neurologico',
    subcategoria: 'neurodegeneracao',
    quickView: {
      definicao: 'Doença neurodegenerativa por defeito no transporte intracelular de colesterol (genes NPC1/NPC2), com acúmulo de colesterol e glicolipídeos.',
      criteriosDiagnosticos: [
        'Paralisia supranuclear do olhar vertical',
        'Ataxia cerebelar',
        'Cataplexia gelástica',
        'Esplenomegalia neonatal',
        'Declínio cognitivo progressivo',
        'Distonia/disartria'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fonoaudiologia', 'Fisioterapia', 'Suporte nutricional'],
        farmacologico: ['Miglustat (redução de substrato)', 'Tratamento sintomático']
      },
      redFlags: ['Disfagia grave', 'Pneumonia aspirativa', 'Epilepsia refratária']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:120.000-150.000 nascidos vivos',
        faixaEtaria: 'Neonatal a adulto (pico: 5-15 anos)',
        fatoresRisco: ['Autossômica recessiva'],
        citations: [{ refId: 'npc-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Ataxia', 'Disartria', 'Disfagia', 'Crises epilépticas', 'Demência'],
        sinaisExameFisico: ['Oftalmoplegia vertical', 'Esplenomegalia', 'Icterícia neonatal prolongada'],
        formasClinicas: ['Neonatal', 'Infantil precoce', 'Infantil tardio', 'Juvenil', 'Adulto'],
        citations: [{ refId: 'npc-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Filipin positivo em fibroblastos', 'Oxisteróis elevados', 'Análise molecular NPC1/NPC2'],
        diagnosticoDiferencial: ['Niemann-Pick A/B', 'Ataxias hereditárias', 'Wilson'],
        examesLaboratoriais: ['Oxisteróis plasmáticos', 'Teste de filipin', 'Quitotriosidase'],
        examesImagem: ['RM encéfalo'],
        citations: [{ refId: 'npc-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Retardar progressão neurológica', 'Manter função de deglutição', 'Qualidade de vida'],
        naoFarmacologico: {
          medidas: ['Gastrostomia quando indicada', 'Reabilitação contínua'],
          citations: [{ refId: 'npc-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'TRS', medicamentos: ['Miglustat 200 mg 3x/dia'] }
          ],
          situacoesEspeciais: [
            { situacao: 'Cataplexia', conduta: 'Antidepressivos tricíclicos, clomipramina' },
            { situacao: 'Epilepsia', conduta: 'Antiepilépticos (evitar valproato)' }
          ],
          citations: [{ refId: 'npc-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: ['Avaliação de deglutição', 'Escala NPC-SS', 'RM cerebral'],
        metasTerapeuticas: ['Estabilização neurológica', 'Prevenção de aspiração'],
        criteriosEncaminhamento: ['Neurologia', 'Gastroenterologia', 'Genética'],
        citations: [{ refId: 'npc-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-npc-ms'],
    medicamentos: ['miglustat'],
    calculadoras: [],
    citations: [{ refId: 'npc-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'neurodegenerativa', 'colesterol', 'ataxia']
  },
  {
    id: 'leucodistrofia-metacromatica',
    titulo: 'Leucodistrofia Metacromática',
    sinonimos: ['LDM', 'Deficiência de arilsulfatase A'],
    doid: 'DOID:10581',
    snomedCT: '42921004',
    ordo: ['ORPHA:512'],
    ciap2: ['N99'],
    cid10: ['E75.2'],
    categoria: 'neurologico',
    subcategoria: 'leucodistrofia',
    quickView: {
      definicao: 'Leucodistrofia por deficiência de arilsulfatase A (ARSA), com acúmulo de sulfatídeos na mielina, causando desmielinização progressiva do SNC e SNP.',
      criteriosDiagnosticos: [
        'Regressão motora e cognitiva',
        'Hipotonia evoluindo para espasticidade',
        'Neuropatia periférica',
        'Leucodistrofia na RM',
        'ARSA reduzida'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['TCTH pré-sintomático', 'Terapia gênica (atidarsagene autotemcel)'],
        farmacologico: ['Suporte sintomático', 'Tratamento de espasticidade']
      },
      redFlags: ['Crises epilépticas', 'Perda da marcha', 'Disfagia', 'Descerebração']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:40.000-160.000 nascidos vivos',
        faixaEtaria: 'Infantil tardio (1-2 anos), juvenil (4-14 anos), adulto',
        fatoresRisco: ['Autossômica recessiva'],
        citations: [{ refId: 'mld-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Dificuldade de marcha', 'Quedas frequentes', 'Alteração comportamental', 'Declínio escolar'],
        sinaisExameFisico: ['Hipotonia inicial', 'Espasticidade tardia', 'Hiporreflexia', 'Atrofia óptica'],
        formasClinicas: ['Infantil tardia', 'Juvenil', 'Adulta'],
        citations: [{ refId: 'mld-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['ARSA <10% do normal', 'Sulfatídeos elevados na urina', 'Análise molecular gene ARSA'],
        diagnosticoDiferencial: ['Outras leucodistrofias', 'Adrenoleucodistrofia', 'Doença de Krabbe'],
        examesLaboratoriais: ['ARSA em leucócitos', 'Sulfatídeos urinários'],
        examesImagem: ['RM encéfalo (padrão tigróide periventricular)'],
        citations: [{ refId: 'mld-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Prevenir progressão (se pré-sintomático)', 'Suporte e qualidade de vida'],
        naoFarmacologico: {
          medidas: ['TCTH em fase pré-sintomática ou inicial', 'Terapia gênica (Libmeldy)'],
          citations: [{ refId: 'mld-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Sintomático', medicamentos: ['Baclofeno para espasticidade', 'Antiepilépticos'] }
          ],
          citations: [{ refId: 'mld-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: ['Avaliação motora', 'Eletroneuromiografia', 'RM cerebral'],
        metasTerapeuticas: ['Estabilização funcional pós-TCTH/TG'],
        criteriosEncaminhamento: ['Neurologia pediátrica', 'Centro de TCTH/terapia gênica'],
        citations: [{ refId: 'mld-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-ldm-ms'],
    medicamentos: [],
    calculadoras: [],
    citations: [{ refId: 'mld-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'leucodistrofia', 'desmielinizante', 'terapia-genica']
  },
  {
    id: 'doenca-tay-sachs',
    titulo: 'Doença de Tay-Sachs',
    sinonimos: ['Gangliosidose GM2 tipo 1', 'Deficiência de hexosaminidase A'],
    doid: 'DOID:3320',
    snomedCT: '111385000',
    ordo: ['ORPHA:845'],
    ciap2: ['N99'],
    cid10: ['E75.0'],
    categoria: 'neurologico',
    subcategoria: 'neurodegeneracao',
    quickView: {
      definicao: 'Gangliosidose GM2 por deficiência de hexosaminidase A, com acúmulo de gangliosídeo GM2 em neurônios, causando neurodegeneração progressiva e fatal.',
      criteriosDiagnosticos: [
        'Regressão neurológica após 3-6 meses',
        'Hipotonia progredindo para espasticidade',
        'Mancha vermelho-cereja na retina',
        'Resposta de sobressalto exagerada',
        'Macrocefalia',
        'Hexosaminidase A ausente'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Cuidados paliativos', 'Suporte nutricional', 'Controle de crises'],
        farmacologico: ['Antiepilépticos', 'Tratamento sintomático']
      },
      redFlags: ['Crises epilépticas refratárias', 'Pneumonia aspirativa', 'Estado vegetativo']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:320.000 (geral); 1:3.600 em judeus Ashkenazi',
        faixaEtaria: 'Infantil: 3-6 meses; Juvenil: 2-10 anos; Adulto: 20-30 anos',
        fatoresRisco: ['Ascendência judaica Ashkenazi', 'Franco-canadense', 'Cajun'],
        citations: [{ refId: 'taysachs-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Perda de marcos motores', 'Cegueira', 'Convulsões', 'Dificuldade de alimentação'],
        sinaisExameFisico: ['Hipotonia', 'Macrocefalia', 'Mancha macular vermelho-cereja', 'Reflexo de Moro exagerado'],
        formasClinicas: ['Infantil clássica (fatal ~4 anos)', 'Juvenil', 'Tardia/adulta'],
        citations: [{ refId: 'taysachs-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Hexosaminidase A ausente ou muito reduzida', 'Análise molecular gene HEXA'],
        diagnosticoDiferencial: ['Doença de Sandhoff', 'Outras gangliosidoses', 'Leucodistrofias'],
        examesLaboratoriais: ['Hex A em soro/leucócitos', 'Ensaio com 4-MUG'],
        examesImagem: ['RM cerebral (atrofia, hipersinal tálamos)'],
        citations: [{ refId: 'taysachs-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Conforto e qualidade de vida', 'Controle de sintomas', 'Suporte familiar'],
        naoFarmacologico: {
          medidas: ['Fisioterapia', 'Suporte ventilatório', 'Gastrostomia'],
          citations: [{ refId: 'taysachs-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antiepilépticos', medicamentos: ['Levetiracetam', 'Clobazam'] }
          ],
          citations: [{ refId: 'taysachs-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Conforme evolução',
        examesControle: ['Avaliação neurológica', 'Suporte nutricional'],
        metasTerapeuticas: ['Conforto', 'Prevenção de complicações'],
        criteriosEncaminhamento: ['Neurologia', 'Cuidados paliativos', 'Genética'],
        citations: [{ refId: 'taysachs-follow-up-2022' }]
      }
    },
    protocolos: [],
    medicamentos: [],
    calculadoras: [],
    citations: [{ refId: 'taysachs-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'gangliosidose', 'neurodegenerativa', 'ashkenazi']
  },
  {
    id: 'doenca-krabbe',
    titulo: 'Doença de Krabbe',
    sinonimos: ['Leucodistrofia de células globoides', 'Deficiência de galactocerebrosidase'],
    doid: 'DOID:10587',
    snomedCT: '15527002',
    ordo: ['ORPHA:487'],
    ciap2: ['N99'],
    cid10: ['E75.2'],
    categoria: 'neurologico',
    subcategoria: 'leucodistrofia',
    quickView: {
      definicao: 'Leucodistrofia por deficiência de galactocerebrosidase (GALC), com acúmulo de psicosina tóxica causando desmielinização grave do SNC e SNP.',
      criteriosDiagnosticos: [
        'Irritabilidade extrema (choro inconsolável)',
        'Rigidez em opistótono',
        'Regressão neurológica rápida',
        'Febre sem infecção',
        'Neuropatia periférica',
        'GALC deficiente'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['TCTH pré-sintomático (única opção modificadora)'],
        farmacologico: ['Suporte sintomático', 'Tratamento da espasticidade']
      },
      redFlags: ['Opistótono', 'Convulsões', 'Descerebração', 'Insuficiência respiratória']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:100.000 nascidos vivos',
        faixaEtaria: 'Infantil (3-6 meses), tardia (>6 meses a adulto)',
        fatoresRisco: ['Autossômica recessiva'],
        citations: [{ refId: 'krabbe-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Irritabilidade', 'Rigidez', 'Regressão motora', 'Cegueira', 'Surdez'],
        sinaisExameFisico: ['Hipertonia', 'Opistótono', 'Hiporreflexia', 'Atrofia óptica'],
        formasClinicas: ['Infantil clássica (85%)', 'Infantil tardia', 'Juvenil', 'Adulta'],
        citations: [{ refId: 'krabbe-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['GALC <5% do normal', 'Análise molecular gene GALC', 'Triagem neonatal em alguns locais'],
        diagnosticoDiferencial: ['LDM', 'Adrenoleucodistrofia', 'Outras leucodistrofias'],
        examesLaboratoriais: ['GALC em leucócitos/DBS', 'Psicosina sérica'],
        examesImagem: ['RM encéfalo (hipersinal periventricular)'],
        citations: [{ refId: 'krabbe-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Transplante precoce em fase pré-sintomática', 'Suporte e conforto'],
        naoFarmacologico: {
          medidas: ['TCTH antes dos sintomas', 'Fisioterapia', 'Suporte respiratório'],
          citations: [{ refId: 'krabbe-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Sintomático', medicamentos: ['Baclofeno', 'Clonazepam'] }
          ],
          citations: [{ refId: 'krabbe-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Frequente conforme evolução',
        examesControle: ['Avaliação neurológica', 'ENMG'],
        metasTerapeuticas: ['Conforto', 'Suporte familiar'],
        criteriosEncaminhamento: ['Neurologia', 'TCTH', 'Cuidados paliativos'],
        citations: [{ refId: 'krabbe-follow-up-2022' }]
      }
    },
    protocolos: [],
    medicamentos: [],
    calculadoras: [],
    citations: [{ refId: 'krabbe-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'leucodistrofia', 'tcth', 'triagem-neonatal']
  },

  // ============================================
  // DISTROFIAS MUSCULARES (8)
  // ============================================
  {
    id: 'distrofia-muscular-duchenne',
    titulo: 'Distrofia Muscular de Duchenne',
    sinonimos: ['DMD', 'Distrofia muscular pseudohipertrófica'],
    doid: 'DOID:11723',
    snomedCT: '76670001',
    ordo: ['ORPHA:98896'],
    ciap2: ['N99'],
    cid10: ['G71.0'],
    categoria: 'neurologico',
    subcategoria: 'distrofia-muscular',
    quickView: {
      definicao: 'Distrofia muscular ligada ao X causada por mutações no gene DMD com ausência de distrofina, resultando em fraqueza muscular progressiva e fatal.',
      criteriosDiagnosticos: [
        'Fraqueza proximal progressiva (início 2-5 anos)',
        'Pseudo-hipertrofia de panturrilhas',
        'Sinal de Gowers positivo',
        'CK muito elevado (>10.000 U/L)',
        'Perda da marcha até 12-13 anos',
        'Ausência de distrofina na biópsia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia', 'VNI precoce', 'Prevenção de contraturas'],
        farmacologico: ['Corticosteroides (deflazacort, prednisona)', 'Cardioproteção (IECA/BRA)']
      },
      redFlags: ['Insuficiência respiratória', 'Cardiomiopatia', 'Escoliose grave', 'Fraturas vertebrais']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:3.500-5.000 nascidos vivos masculinos',
        faixaEtaria: 'Sintomas 2-5 anos, perda da marcha 10-13 anos',
        fatoresRisco: ['Herança ligada ao X', '1/3 mutações de novo'],
        citations: [{ refId: 'dmd-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Atraso motor', 'Quedas frequentes', 'Dificuldade para correr/subir escadas', 'Dispneia'],
        sinaisExameFisico: ['Marcha anserina', 'Lordose lombar', 'Pseudo-hipertrofia', 'Reflexos diminuídos'],
        formasClinicas: ['DMD clássica'],
        citations: [{ refId: 'dmd-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['CK >10.000', 'Análise molecular gene DMD (MLPA + sequenciamento)', 'Ausência de distrofina em biópsia'],
        diagnosticoDiferencial: ['Becker', 'Distrofias de cinturas', 'Miopatias inflamatórias'],
        examesLaboratoriais: ['CK', 'Aldolase', 'Transaminases', 'BNP'],
        examesImagem: ['RM muscular', 'Eco/RM cardíaca'],
        citations: [{ refId: 'dmd-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Prolongar deambulação', 'Preservar função respiratória e cardíaca', 'Qualidade de vida'],
        naoFarmacologico: {
          medidas: ['Fisioterapia contínua', 'Órteses', 'VNI noturna quando CVF<50%', 'Cirurgia de escoliose'],
          citations: [{ refId: 'dmd-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticosteroides', medicamentos: ['Deflazacort 0.9 mg/kg/dia', 'Prednisona 0.75 mg/kg/dia'] },
            { classe: 'Cardioproteção', medicamentos: ['IECA ou BRA desde diagnóstico'] }
          ],
          segundaLinha: [
            { classe: 'Terapias gênicas (mutação-específicas)', medicamentos: ['Eteplirsen (exon 51)', 'Golodirsen (exon 53)'] }
          ],
          citations: [{ refId: 'dmd-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: ['Função pulmonar', 'Eco cardíaco anual', 'DXA', 'RX coluna'],
        metasTerapeuticas: ['CVF >50%', 'FE >55%', 'Prevenção de fraturas'],
        criteriosEncaminhamento: ['Neurologia', 'Cardiologia', 'Pneumologia', 'Ortopedia'],
        citations: [{ refId: 'dmd-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-dmd-ms'],
    medicamentos: ['deflazacort', 'prednisona', 'enalapril', 'eteplirsen'],
    calculadoras: [],
    citations: [{ refId: 'dmd-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'distrofia-muscular', 'ligada-x', 'distrofina']
  },
  {
    id: 'distrofia-muscular-becker',
    titulo: 'Distrofia Muscular de Becker',
    sinonimos: ['DMB', 'Distrofinopatia benigna'],
    doid: 'DOID:11727',
    snomedCT: '302057004',
    ordo: ['ORPHA:98895'],
    ciap2: ['N99'],
    cid10: ['G71.0'],
    categoria: 'neurologico',
    subcategoria: 'distrofia-muscular',
    quickView: {
      definicao: 'Distrofia muscular ligada ao X com distrofina parcialmente funcional, causando fenótipo mais brando que Duchenne com início tardio e progressão lenta.',
      criteriosDiagnosticos: [
        'Fraqueza proximal de início tardio (>7 anos)',
        'Pseudo-hipertrofia de panturrilhas',
        'CK elevado (1.000-10.000 U/L)',
        'Marcha preservada após 16 anos',
        'Distrofina parcial na biópsia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia', 'Exercício aeróbico moderado'],
        farmacologico: ['Cardioproteção (IECA/BRA)', 'Corticosteroides em casos selecionados']
      },
      redFlags: ['Cardiomiopatia (pode ser desproporcional)', 'Insuficiência respiratória', 'Rabdomiólise']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:18.000-30.000 nascidos vivos masculinos',
        faixaEtaria: 'Sintomas 5-15 anos, marcha preservada até 20-40 anos',
        fatoresRisco: ['Herança ligada ao X'],
        citations: [{ refId: 'bmd-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Cãibras', 'Fadiga', 'Dificuldade para exercícios', 'Dispneia tardia'],
        sinaisExameFisico: ['Pseudo-hipertrofia', 'Fraqueza proximal', 'Marcha alterada'],
        formasClinicas: ['BMD clássica', 'Cardiomiopatia dilatada ligada ao X', 'Hiperckemia assintomática'],
        citations: [{ refId: 'bmd-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['CK elevado', 'Mutação in-frame no gene DMD', 'Distrofina parcial em biópsia'],
        diagnosticoDiferencial: ['DMD', 'Distrofias de cinturas', 'Miopatia metabólica'],
        examesLaboratoriais: ['CK', 'BNP'],
        examesImagem: ['RM muscular', 'Eco/RM cardíaca'],
        citations: [{ refId: 'bmd-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Manter função', 'Prevenir cardiomiopatia', 'Qualidade de vida'],
        naoFarmacologico: {
          medidas: ['Exercício regular', 'Evitar rabdomiólise'],
          citations: [{ refId: 'bmd-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Cardioproteção', medicamentos: ['IECA ou BRA'] }
          ],
          citations: [{ refId: 'bmd-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6-12 meses',
        examesControle: ['Eco cardíaco anual', 'Função pulmonar', 'CK'],
        metasTerapeuticas: ['FE >55%', 'Estabilidade funcional'],
        criteriosEncaminhamento: ['Neurologia', 'Cardiologia'],
        citations: [{ refId: 'bmd-follow-up-2022' }]
      }
    },
    protocolos: [],
    medicamentos: ['enalapril', 'losartana'],
    calculadoras: [],
    citations: [{ refId: 'bmd-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'distrofia-muscular', 'ligada-x', 'cardiomiopatia']
  },
  {
    id: 'distrofia-miotonica-tipo1',
    titulo: 'Distrofia Miotônica Tipo 1',
    sinonimos: ['DM1', 'Doença de Steinert'],
    doid: 'DOID:11729',
    snomedCT: '77956009',
    ordo: ['ORPHA:273'],
    ciap2: ['N99'],
    cid10: ['G71.1'],
    categoria: 'neurologico',
    subcategoria: 'distrofia-muscular',
    quickView: {
      definicao: 'Distrofia muscular autossômica dominante por expansão CTG no gene DMPK, caracterizada por miotonia, fraqueza distal e envolvimento multissistêmico.',
      criteriosDiagnosticos: [
        'Miotonia (dificuldade de relaxamento muscular)',
        'Fraqueza facial e distal',
        'Ptose palpebral',
        'Calvície frontal (homens)',
        'Catarata subcapsular posterior',
        'Envolvimento cardíaco'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Monitoramento cardíaco regular', 'Fisioterapia'],
        farmacologico: ['Mexiletina para miotonia', 'Modafinila para sonolência']
      },
      redFlags: ['Bloqueio AV/arritmias', 'Insuficiência respiratória', 'Disfagia grave', 'Morte súbita']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:8.000 (mais comum distrofia muscular em adultos)',
        faixaEtaria: 'Congênita a adulto (típico 20-40 anos)',
        fatoresRisco: ['Autossômica dominante', 'Antecipação (expansão CTG aumenta entre gerações)'],
        citations: [{ refId: 'dm1-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Fraqueza de mãos/pés', 'Dificuldade de soltar objetos', 'Sonolência diurna', 'Disfagia'],
        sinaisExameFisico: ['Fácies miopática', 'Miotonia de preensão/percussão', 'Atrofia temporal', 'Ptose'],
        formasClinicas: ['Congênita', 'Infantil', 'Clássica (adulto)', 'Oligossintomática tardia'],
        citations: [{ refId: 'dm1-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Expansão CTG >50 repetições no gene DMPK', 'Clínica característica'],
        diagnosticoDiferencial: ['DM2', 'Miotonias não-distróficas', 'Miastenia gravis'],
        examesLaboratoriais: ['CK (normal ou levemente elevado)', 'Glicemia', 'TSH', 'Função hepática'],
        examesImagem: ['ECG/Holter', 'Eco cardíaco', 'RM cerebral'],
        citations: [{ refId: 'dm1-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Controlar miotonia', 'Monitorar coração', 'Tratar complicações sistêmicas'],
        naoFarmacologico: {
          medidas: ['Marca-passo/CDI se indicado', 'VNI para hipoventilação'],
          citations: [{ refId: 'dm1-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antimiotônico', medicamentos: ['Mexiletina 150-200 mg 3x/dia'] },
            { classe: 'Estimulante SNC', medicamentos: ['Modafinila 100-400 mg/dia'] }
          ],
          citations: [{ refId: 'dm1-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6-12 meses',
        examesControle: ['ECG/Holter anual', 'Eco cardíaco', 'Função pulmonar', 'Glicemia'],
        metasTerapeuticas: ['Detecção precoce de arritmias', 'Manutenção da função'],
        criteriosEncaminhamento: ['Cardiologia (eletrofisiologia)', 'Pneumologia', 'Neurologia'],
        citations: [{ refId: 'dm1-follow-up-2022' }]
      }
    },
    protocolos: [],
    medicamentos: ['mexiletina', 'modafinila'],
    calculadoras: [],
    citations: [{ refId: 'dm1-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'distrofia-muscular', 'miotonia', 'multissistemica', 'antecipacao']
  },
  {
    id: 'distrofia-facio-escapulo-umeral',
    titulo: 'Distrofia Fácio-Escápulo-Umeral',
    sinonimos: ['DFEU', 'FSHD'],
    doid: 'DOID:11726',
    snomedCT: '45853006',
    ordo: ['ORPHA:269'],
    ciap2: ['N99'],
    cid10: ['G71.0'],
    categoria: 'neurologico',
    subcategoria: 'distrofia-muscular',
    quickView: {
      definicao: 'Distrofia muscular autossômica dominante caracterizada por fraqueza facial, escapular e de braços, com progressão lentamente progressiva e assimétrica.',
      criteriosDiagnosticos: [
        'Fraqueza facial (dificuldade de assobiar, sorrir)',
        'Escápula alada',
        'Fraqueza de bíceps/tríceps desproporcional',
        'Assimetria marcante',
        'Contração D4Z4 (FSHD1) ou mutação SMCHD1 (FSHD2)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia', 'Cirurgia de fixação escapular'],
        farmacologico: ['Sem tratamento específico', 'Analgésicos para dor']
      },
      redFlags: ['Insuficiência respiratória (raro)', 'Retinopatia exsudativa', 'Perda auditiva']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:15.000-20.000',
        faixaEtaria: 'Tipicamente adolescência a adulto jovem',
        fatoresRisco: ['Autossômica dominante'],
        citations: [{ refId: 'fshd-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Dificuldade de levantar braços', 'Incapacidade de assobiar', 'Dor muscular'],
        sinaisExameFisico: ['Escápula alada', 'Atrofia peitoral', 'Fraqueza facial', 'Lordose lombar'],
        formasClinicas: ['FSHD1 (95%)', 'FSHD2'],
        citations: [{ refId: 'fshd-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Contração D4Z4 <11 repetições (FSHD1)', 'Fenótipo clínico característico'],
        diagnosticoDiferencial: ['Distrofias de cinturas', 'Miopatias inflamatórias', 'Miastenia'],
        examesLaboratoriais: ['CK (normal ou levemente elevado)'],
        examesImagem: ['RM muscular', 'Fundoscopia'],
        citations: [{ refId: 'fshd-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Manter função', 'Tratar dor', 'Melhorar estética/função escapular'],
        naoFarmacologico: {
          medidas: ['Fixação escapular cirúrgica', 'Exercício aeróbico'],
          citations: [{ refId: 'fshd-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Analgésicos', medicamentos: ['AINEs', 'Paracetamol'] }
          ],
          citations: [{ refId: 'fshd-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Anual',
        examesControle: ['Fundoscopia', 'Audiometria', 'Função pulmonar se sintomático'],
        metasTerapeuticas: ['Estabilidade funcional'],
        criteriosEncaminhamento: ['Neurologia', 'Ortopedia', 'Oftalmologia'],
        citations: [{ refId: 'fshd-follow-up-2022' }]
      }
    },
    protocolos: [],
    medicamentos: [],
    calculadoras: [],
    citations: [{ refId: 'fshd-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'distrofia-muscular', 'face', 'escapula']
  },
  {
    id: 'distrofia-cinturas-lgmd',
    titulo: 'Distrofias Musculares de Cinturas',
    sinonimos: ['LGMD', 'Distrofia limb-girdle'],
    doid: 'DOID:11728',
    snomedCT: '75752001',
    ordo: ['ORPHA:263'],
    ciap2: ['N99'],
    cid10: ['G71.0'],
    categoria: 'neurologico',
    subcategoria: 'distrofia-muscular',
    quickView: {
      definicao: 'Grupo heterogêneo de distrofias com fraqueza predominante em cinturas pélvica e escapular, incluindo formas dominantes (LGMD D) e recessivas (LGMD R).',
      criteriosDiagnosticos: [
        'Fraqueza proximal de cinturas pélvica/escapular',
        'CK elevado',
        'Início variável (infância a adulto)',
        'Deficiência proteica específica em biópsia',
        'Confirmação molecular'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia', 'Exercício adaptado'],
        farmacologico: ['Suporte cardíaco se indicado', 'Corticosteroides em formas específicas']
      },
      redFlags: ['Cardiomiopatia (LGMD R9, R5)', 'Insuficiência respiratória', 'Contraturas']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:15.000-100.000 (varia por subtipo)',
        faixaEtaria: 'Variável por subtipo',
        fatoresRisco: ['Autossômica dominante (D) ou recessiva (R)'],
        citations: [{ refId: 'lgmd-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Dificuldade de subir escadas', 'Levantar de cadeira', 'Fraqueza de braços'],
        sinaisExameFisico: ['Marcha miopática', 'Gowers positivo', 'Escápula alada', 'Pseudo-hipertrofia variável'],
        formasClinicas: ['LGMD D1-D5', 'LGMD R1-R24 (>30 subtipos conhecidos)'],
        citations: [{ refId: 'lgmd-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Fenótipo de cintura', 'Painel genético/exoma', 'Imunohistoquímica/Western blot'],
        diagnosticoDiferencial: ['DMD/BMD', 'Miopatias metabólicas', 'Miopatias inflamatórias'],
        examesLaboratoriais: ['CK', 'BNP'],
        examesImagem: ['RM muscular (padrão específico)', 'Eco cardíaco'],
        citations: [{ refId: 'lgmd-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Manter função', 'Monitorar coração/pulmão', 'Qualidade de vida'],
        naoFarmacologico: {
          medidas: ['Fisioterapia', 'Órteses', 'VNI se indicada'],
          citations: [{ refId: 'lgmd-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Cardioproteção', medicamentos: ['IECA/BRA em formas com risco cardíaco'] }
          ],
          citations: [{ refId: 'lgmd-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6-12 meses',
        examesControle: ['Eco cardíaco anual (formas de risco)', 'Função pulmonar'],
        metasTerapeuticas: ['Estabilidade funcional'],
        criteriosEncaminhamento: ['Neurologia', 'Cardiologia', 'Genética'],
        citations: [{ refId: 'lgmd-follow-up-2022' }]
      }
    },
    protocolos: [],
    medicamentos: [],
    calculadoras: [],
    citations: [{ refId: 'lgmd-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'distrofia-muscular', 'cinturas', 'heterogenea']
  },
  {
    id: 'atrofia-muscular-espinhal',
    titulo: 'Atrofia Muscular Espinhal',
    sinonimos: ['AME', 'SMA'],
    doid: 'DOID:12377',
    snomedCT: '5262007',
    ordo: ['ORPHA:70'],
    ciap2: ['N99'],
    cid10: ['G12.0', 'G12.1'],
    categoria: 'neurologico',
    subcategoria: 'doenca-neuronio-motor',
    quickView: {
      definicao: 'Doença neurodegenerativa autossômica recessiva por deleção/mutação do gene SMN1, causando perda de neurônios motores e fraqueza muscular progressiva.',
      criteriosDiagnosticos: [
        'Fraqueza proximal simétrica',
        'Hipotonia (formas precoces)',
        'Arreflexia',
        'Fasciculações linguais',
        'Deleção homozigota SMN1 exon 7',
        'Classificação por idade de início e função motora máxima'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia motora e respiratória', 'VNI', 'Suporte nutricional'],
        farmacologico: ['Nusinersena (intratecal)', 'Onasemnogene abeparvovec (terapia gênica)', 'Risdiplam (oral)']
      },
      redFlags: ['Insuficiência respiratória', 'Disfagia/aspiração', 'Escoliose progressiva']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:6.000-10.000 nascidos vivos',
        faixaEtaria: 'Tipo 1: 0-6m; Tipo 2: 6-18m; Tipo 3: >18m; Tipo 4: adulto',
        fatoresRisco: ['Autossômica recessiva', 'Número de cópias SMN2'],
        citations: [{ refId: 'sma-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Hipotonia', 'Fraqueza', 'Dificuldade respiratória', 'Dificuldade de alimentação'],
        sinaisExameFisico: ['Postura de rã', 'Fasciculações de língua', 'Respiração paradoxal', 'Tremor de mãos'],
        formasClinicas: ['Tipo 1 (Werdnig-Hoffmann)', 'Tipo 2', 'Tipo 3 (Kugelberg-Welander)', 'Tipo 4 (adulto)'],
        citations: [{ refId: 'sma-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Deleção homozigota SMN1 exon 7', 'Número de cópias SMN2 (prognóstico)'],
        diagnosticoDiferencial: ['Miopatias congênitas', 'Distrofias musculares', 'Botulismo infantil'],
        examesLaboratoriais: ['MLPA/PCR para SMN1/SMN2', 'CK (normal ou levemente elevado)'],
        examesImagem: ['RX tórax', 'Função pulmonar'],
        citations: [{ refId: 'sma-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Preservar/melhorar função motora', 'Manter função respiratória', 'Sobrevida'],
        naoFarmacologico: {
          medidas: ['VNI/traqueostomia se indicado', 'Gastrostomia', 'Cirurgia de escoliose'],
          citations: [{ refId: 'sma-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Terapia gênica', medicamentos: ['Onasemnogene abeparvovec (dose única IV)'] },
            { classe: 'Antisense', medicamentos: ['Nusinersena intratecal'] },
            { classe: 'Modulador splicing', medicamentos: ['Risdiplam 0.2 mg/kg/dia VO'] }
          ],
          citations: [{ refId: 'sma-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal a trimestral',
        examesControle: ['Escalas motoras (CHOP-INTEND, HFMSE)', 'Função pulmonar', 'Avaliação nutricional'],
        metasTerapeuticas: ['Ganho/estabilização de marcos motores'],
        criteriosEncaminhamento: ['Centro de referência SMA', 'Pneumologia', 'Nutrição'],
        citations: [{ refId: 'sma-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-ame-ms'],
    medicamentos: ['nusinersena', 'risdiplam', 'onasemnogene-abeparvovec'],
    calculadoras: [],
    citations: [{ refId: 'sma-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'neuronio-motor', 'terapia-genica', 'triagem-neonatal']
  },
  {
    id: 'miopatia-miotubular',
    titulo: 'Miopatia Miotubular',
    sinonimos: ['Miopatia centronuclear ligada ao X', 'XLMTM'],
    doid: 'DOID:0050674',
    snomedCT: '240065008',
    ordo: ['ORPHA:596'],
    ciap2: ['N99'],
    cid10: ['G71.2'],
    categoria: 'neurologico',
    subcategoria: 'miopatia-congenita',
    quickView: {
      definicao: 'Miopatia congênita ligada ao X por mutação no gene MTM1, caracterizada por hipotonia grave neonatal e insuficiência respiratória.',
      criteriosDiagnosticos: [
        'Hipotonia grave ao nascimento',
        'Insuficiência respiratória neonatal',
        'Oftalmoplegia',
        'Face alongada',
        'Núcleos centrais na biópsia',
        'Mutação MTM1'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Suporte ventilatório (maioria requer VM)', 'Suporte nutricional'],
        farmacologico: ['Terapia gênica em investigação']
      },
      redFlags: ['Dependência ventilatória', 'Disfunção hepática', 'Colelitíase']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:50.000 nascidos vivos masculinos',
        faixaEtaria: 'Neonatal',
        fatoresRisco: ['Herança ligada ao X'],
        citations: [{ refId: 'mtm-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Hipotonia profunda', 'Falência respiratória', 'Dificuldade de alimentação'],
        sinaisExameFisico: ['Face miopática', 'Oftalmoplegia', 'Macrocefalia relativa', 'Criptorquidia'],
        formasClinicas: ['Clássica (grave neonatal)', 'Formas mais leves (raras)'],
        citations: [{ refId: 'mtm-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Análise molecular MTM1', 'Biópsia com núcleos centrais e fibras hipoplásicas'],
        diagnosticoDiferencial: ['Outras miopatias congênitas', 'SMA tipo 1', 'Distrofia miotônica congênita'],
        examesLaboratoriais: ['CK (normal ou baixo)'],
        examesImagem: ['RM muscular', 'USG hepático'],
        citations: [{ refId: 'mtm-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Suporte ventilatório', 'Nutrição adequada', 'Qualidade de vida'],
        naoFarmacologico: {
          medidas: ['Ventilação mecânica', 'Gastrostomia', 'Fisioterapia'],
          citations: [{ refId: 'mtm-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Experimental', medicamentos: ['Terapia gênica AAV8 (em ensaios)'] }
          ],
          citations: [{ refId: 'mtm-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Frequente (paciente grave)',
        examesControle: ['Função hepática', 'Crescimento', 'Avaliação respiratória'],
        metasTerapeuticas: ['Sobrevida', 'Desenvolvimento possível'],
        criteriosEncaminhamento: ['UTI neonatal', 'Neurologia', 'Pneumologia pediátrica'],
        citations: [{ refId: 'mtm-follow-up-2022' }]
      }
    },
    protocolos: [],
    medicamentos: [],
    calculadoras: [],
    citations: [{ refId: 'mtm-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'miopatia-congenita', 'neonatal', 'ligada-x']
  },

  // ============================================
  // NEUROPATIAS HEREDITÁRIAS (7)
  // ============================================
  {
    id: 'charcot-marie-tooth',
    titulo: 'Doença de Charcot-Marie-Tooth',
    sinonimos: ['CMT', 'Neuropatia hereditária sensitivo-motora', 'HMSN'],
    doid: 'DOID:10595',
    snomedCT: '398100001',
    ordo: ['ORPHA:166'],
    ciap2: ['N99'],
    cid10: ['G60.0'],
    categoria: 'neurologico',
    subcategoria: 'neuropatia-hereditaria',
    quickView: {
      definicao: 'Grupo de neuropatias hereditárias periféricas caracterizadas por fraqueza distal progressiva, atrofia muscular e deformidades de pés.',
      criteriosDiagnosticos: [
        'Fraqueza distal progressiva (pés > mãos)',
        'Atrofia peroneal ("pernas de cegonha")',
        'Pé cavo e dedos em martelo',
        'Arreflexia aquiliana',
        'Velocidade de condução nervosa alterada',
        'Confirmação genética'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Órteses (AFO)', 'Fisioterapia', 'Cirurgia ortopédica corretiva'],
        farmacologico: ['Sem tratamento modificador aprovado', 'Analgésicos para dor neuropática']
      },
      redFlags: ['Insuficiência respiratória (formas graves)', 'Paralisia de cordas vocais', 'Disfagia']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:2.500 (neuropatia hereditária mais comum)',
        faixaEtaria: 'Tipicamente infância/adolescência, mas variável',
        fatoresRisco: ['Herança dominante (maioria), recessiva ou ligada ao X'],
        citations: [{ refId: 'cmt-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Tropeços frequentes', 'Dificuldade de correr', 'Cãibras', 'Perda sensitiva distal'],
        sinaisExameFisico: ['Pé cavo', 'Dedos em martelo', 'Atrofia peroneal', 'Mãos em garra (tardio)'],
        formasClinicas: ['CMT1 (desmielinizante)', 'CMT2 (axonal)', 'CMT4 (recessiva)', 'CMTX'],
        citations: [{ refId: 'cmt-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['ENMG (desmielinizante vs axonal)', 'Painel genético (PMP22, MFN2, GJB1, etc.)'],
        diagnosticoDiferencial: ['CIDP', 'Neuropatias adquiridas', 'Paraparesia espástica hereditária'],
        examesLaboratoriais: ['CK (normal)', 'VHS, glicemia (excluir causas adquiridas)'],
        examesImagem: ['RM de nervos (espessamento)'],
        citations: [{ refId: 'cmt-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Manter marcha', 'Prevenir deformidades', 'Qualidade de vida'],
        naoFarmacologico: {
          medidas: ['AFO', 'Cirurgia de pé cavo', 'Exercício regular'],
          citations: [{ refId: 'cmt-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Dor neuropática', medicamentos: ['Gabapentina', 'Pregabalina', 'Duloxetina'] }
          ],
          citations: [{ refId: 'cmt-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Anual',
        examesControle: ['Avaliação funcional', 'Função pulmonar se indicado'],
        metasTerapeuticas: ['Manter independência'],
        criteriosEncaminhamento: ['Neurologia', 'Ortopedia', 'Fisiatria'],
        citations: [{ refId: 'cmt-follow-up-2022' }]
      }
    },
    protocolos: [],
    medicamentos: ['gabapentina', 'pregabalina'],
    calculadoras: [],
    citations: [{ refId: 'cmt-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'neuropatia', 'hereditaria', 'pe-cavo']
  },
  {
    id: 'amiloidose-attr-hereditaria',
    titulo: 'Amiloidose ATTR Hereditária',
    sinonimos: ['ATTRv', 'Polineuropatia amiloidótica familiar', 'PAF'],
    doid: 'DOID:0050638',
    snomedCT: '399144008',
    ordo: ['ORPHA:85447'],
    ciap2: ['N99'],
    cid10: ['E85.1'],
    categoria: 'neurologico',
    subcategoria: 'amiloidose',
    quickView: {
      definicao: 'Amiloidose sistêmica por depósito de transtirretina mutante (variante), causando polineuropatia e cardiomiopatia progressivas.',
      criteriosDiagnosticos: [
        'Polineuropatia sensitivo-motora axonal',
        'Disautonomia (hipotensão, diarreia, impotência)',
        'Cardiomiopatia infiltrativa',
        'Síndrome do túnel do carpo bilateral',
        'Mutação TTR patogênica',
        'Depósito amiloide em biópsia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Transplante hepático (casos selecionados)'],
        farmacologico: ['Tafamidis (estabilizador)', 'Patisiran/Vutrisiran (silenciadores RNA)', 'Inotersen']
      },
      redFlags: ['Cardiomiopatia avançada', 'Desnutrição grave', 'Neuropatia incapacitante']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '~10.000 casos mundiais (endêmica em Portugal, Japão, Suécia)',
        faixaEtaria: 'Início 30-70 anos (variável por mutação)',
        fatoresRisco: ['Autossômica dominante', 'Mutação Val30Met mais comum'],
        citations: [{ refId: 'attrv-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Parestesias', 'Dor neuropática', 'Diarreia alternada com constipação', 'Edema de MMII'],
        sinaisExameFisico: ['Perda sensitiva em luva/bota', 'Hipotensão ortostática', 'Caquexia', 'Pupilas de Argyll-Robertson'],
        formasClinicas: ['Predomínio neurológico', 'Predomínio cardíaco', 'Mista'],
        citations: [{ refId: 'attrv-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Mutação TTR', 'Depósito amiloide (vermelho Congo)', 'Espectrometria de massas para TTR'],
        diagnosticoDiferencial: ['CIDP', 'Amiloidose AL', 'ATTRwt', 'Neuropatia diabética'],
        examesLaboratoriais: ['Sequenciamento TTR', 'Biópsia (gordura, nervo, reto)'],
        examesImagem: ['Eco cardíaco', 'Cintilografia com pirofosfato', 'RM cardíaca'],
        citations: [{ refId: 'attrv-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Estabilizar/retardar progressão', 'Tratar cardiomiopatia'],
        naoFarmacologico: {
          medidas: ['Transplante hepático em jovens com variante específica'],
          citations: [{ refId: 'attrv-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Estabilizador TTR', medicamentos: ['Tafamidis 61 mg/dia'] },
            { classe: 'Silenciador RNA', medicamentos: ['Patisiran 0.3 mg/kg a cada 3 sem', 'Vutrisiran 25 mg SC mensal'] }
          ],
          segundaLinha: [
            { classe: 'Antisense', medicamentos: ['Inotersen 284 mg SC semanal'] }
          ],
          citations: [{ refId: 'attrv-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: ['NIS score', 'mBMI', 'Eco cardíaco', 'Holter'],
        metasTerapeuticas: ['Estabilização de scores', 'Manutenção nutricional'],
        criteriosEncaminhamento: ['Centro de amiloidose', 'Cardiologia', 'Transplante hepático'],
        citations: [{ refId: 'attrv-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-attr-ms'],
    medicamentos: ['tafamidis', 'patisiran', 'vutrisiran', 'inotersen'],
    calculadoras: [],
    citations: [{ refId: 'attrv-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'amiloidose', 'neuropatia', 'cardiomiopatia', 'silenciador-rna']
  }
];
