/**
 * DOENÇAS ENDÓCRINAS - DARWIN-MFC
 * ================================
 */

import { Doenca } from '../../types/doenca';

export const doencasEndocrinas: Doenca[] = [
  {
    id: 'hipotireoidismo',
    titulo: 'Hipotireoidismo',
    sinonimos: ['Tireoidite de Hashimoto', 'Mixedema'],
    ciap2: ['T86'],
    cid10: ['E03', 'E03.9', 'E06.3'],
    categoria: 'metabolico',
    quickView: {
      definicao: 'Síndrome clínica resultante da deficiência de hormônios tireoidianos (T3 e T4), com consequente lentificação generalizada dos processos metabólicos.',
      criteriosDiagnosticos: [
        'TSH elevado (>4,5 mU/L) - marcador mais sensível',
        'T4 livre baixo (hipotireoidismo manifesto)',
        'TSH elevado com T4L normal (hipotireoidismo subclínico)',
        'Sintomas compatíveis: fadiga, ganho de peso, intolerância ao frio'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Educação sobre a doença',
          'Orientação sobre uso correto da medicação',
          'Identificar e tratar causa subjacente',
          'Monitorização regular'
        ],
        farmacologico: [
          'Levotiroxina (T4): medicamento de escolha',
          'Dose inicial: 1,6 mcg/kg/dia (adultos jovens saudáveis)',
          'Idosos/cardiopatas: iniciar 12,5-25 mcg/dia, titular lentamente',
          'Tomar em jejum, 30-60 min antes do café da manhã'
        ]
      },
      metasTerapeuticas: [
        'TSH normal (0,4-4,0 mU/L) na maioria',
        'T4L no terço superior da normalidade',
        'Resolução dos sintomas',
        'Idosos: aceitar TSH até 6-8 mU/L'
      ],
      examesIniciais: [
        'TSH',
        'T4 livre',
        'Anti-TPO (se investigar etiologia autoimune)',
        'Perfil lipídico (dislipidemia secundária)',
        'Hemograma (anemia)'
      ],
      redFlags: [
        'Coma mixedematoso (hipotireoidismo grave + alteração consciência)',
        'Hipotireoidismo grave com bradicardia/hipotensão',
        'Derrame pericárdico',
        'Hiponatremia grave',
        'Suspeita de hipotireoidismo central (TSH baixo/normal com T4L baixo)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '2-5% da população adulta (10% se subclínico)',
        incidencia: 'Mais comum em mulheres (5-8x)',
        faixaEtaria: 'Aumenta com idade',
        fatoresRisco: [
          'Sexo feminino',
          'Idade >60 anos',
          'História familiar de doença tireoidiana',
          'Outras doenças autoimunes (DM1, vitiligo)',
          'Uso de amiodarona, lítio',
          'Radioterapia cervical',
          'Cirurgia ou radioablação de tireoide'
        ],
        citations: [{ refId: 'sbem-tireoide-2023' }]
      },
      fisiopatologia: {
        texto: 'A causa mais comum é a tireoidite de Hashimoto (autoimune), com destruição gradual da glândula por autoanticorpos (anti-TPO, anti-Tg). Outras causas incluem tireoidectomia, radioablação, medicamentos e deficiência de iodo. A deficiência de T3/T4 reduz o metabolismo basal de todos os tecidos.',
        citations: [{ refId: 'sbem-tireoide-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Fadiga, lentidão',
          'Ganho de peso (moderado)',
          'Intolerância ao frio',
          'Constipação',
          'Pele seca, queda de cabelo',
          'Irregularidade menstrual',
          'Depressão, lentificação cognitiva'
        ],
        sinaisExameFisico: [
          'Bradicardia',
          'Pele seca, fria e pálida',
          'Mixedema (edema sem cacifo)',
          'Bócio (na Hashimoto)',
          'Reflexos lentos',
          'Madarose (perda 1/3 lateral sobrancelha)'
        ],
        formasClinicas: [
          'Hipotireoidismo subclínico: TSH alto, T4L normal',
          'Hipotireoidismo manifesto: TSH alto, T4L baixo',
          'Hipotireoidismo central: TSH normal/baixo, T4L baixo'
        ],
        citations: [{ refId: 'sbem-tireoide-2023' }]
      },
      diagnostico: {
        criterios: [
          'TSH >4,5 mU/L (confirmar em 2ª dosagem)',
          'T4L baixo (manifesto) ou normal (subclínico)',
          'Anti-TPO positivo sugere etiologia autoimune'
        ],
        diagnosticoDiferencial: [
          'Síndrome do eutireoideo doente',
          'Depressão',
          'Anemia',
          'Insuficiência cardíaca',
          'Apneia do sono',
          'Uso de medicamentos que afetam função tireoidiana'
        ],
        examesLaboratoriais: [
          'TSH',
          'T4 livre',
          'Anti-TPO, anti-Tg',
          'T3 (geralmente não necessário)',
          'Ultrassom de tireoide (se bócio ou nódulo)'
        ],
        citations: [{ refId: 'sbem-tireoide-2023' }]
      },
      tratamento: {
        objetivos: [
          'Normalizar TSH e T4L',
          'Aliviar sintomas',
          'Prevenir complicações',
          'Melhorar qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Orientar sobre uso correto da levotiroxina',
            'Tomar em jejum absoluto (30-60 min antes café)',
            'Separar de medicamentos que interferem na absorção'
          ],
          citations: [{ refId: 'sbem-tireoide-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Hormônio tireoidiano',
              medicamentos: ['Levotiroxina'],
              posologia: 'Dose calculada: 1,6 mcg/kg/dia. Ajustar a cada 4-6 semanas até TSH normalizar.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Idosos ou cardiopatas',
              conduta: 'Iniciar 12,5-25 mcg/dia, aumentar 12,5-25 mcg a cada 4-6 semanas'
            },
            {
              situacao: 'Gestação',
              conduta: 'Aumentar dose em 25-30% logo que confirmar gestação. Meta TSH <2,5 no 1º tri'
            },
            {
              situacao: 'Hipotireoidismo subclínico',
              conduta: 'Tratar se TSH >10, ou TSH 5-10 com sintomas, anti-TPO+, dislipidemia, gestação'
            }
          ],
          citations: [{ refId: 'sbem-tireoide-2023' }]
        },
        duracao: 'Tratamento contínuo (maioria dos casos é permanente)'
      },
      acompanhamento: {
        frequenciaConsultas: 'TSH a cada 4-6 semanas até estabilizar, depois anual',
        examesControle: [
          'TSH (principal parâmetro)',
          'T4L se necessário',
          'Perfil lipídico (melhora com tratamento)'
        ],
        metasTerapeuticas: [
          'TSH 0,4-4,0 mU/L (maioria)',
          'Idosos: TSH até 6-8 aceitável',
          'Gestantes: TSH <2,5 no 1º trimestre'
        ],
        criteriosEncaminhamento: [
          'Suspeita de hipotireoidismo central',
          'Nódulo tireoidiano',
          'Refratário ao tratamento',
          'Gestação de alto risco'
        ],
        citations: [{ refId: 'sbem-tireoide-2023' }]
      },
      prevencao: {
        primaria: ['Não há prevenção primária específica'],
        secundaria: ['Tratamento precoce para evitar complicações'],
        citations: []
      },
    },
    protocolos: [],
    medicamentos: ['levotiroxina'],
    calculadoras: [],
    rastreamentos: ['rastreamento-tireoide'],
    citations: [{ refId: 'sbem-tireoide-2023' }],
    lastUpdate: '2024-12',
    tags: ['hipotireoidismo', 'tireoide', 'hashimoto', 'levotiroxina', 'tsh'],
  },
  {
    id: 'obesidade',
    titulo: 'Obesidade',
    sinonimos: ['Excesso de peso', 'Sobrepeso'],
    ciap2: ['T82', 'T83'],
    cid10: ['E66', 'E66.0', 'E66.9'],
    categoria: 'metabolico',
    quickView: {
      definicao: 'Doença crônica caracterizada pelo acúmulo excessivo de gordura corporal, com repercussões negativas sobre a saúde. Definida por IMC ≥30 kg/m².',
      criteriosDiagnosticos: [
        'IMC ≥25 kg/m²: sobrepeso',
        'IMC ≥30 kg/m²: obesidade grau I',
        'IMC ≥35 kg/m²: obesidade grau II',
        'IMC ≥40 kg/m²: obesidade grau III (mórbida)',
        'Circunferência abdominal: >94cm (H) ou >80cm (M) - risco aumentado'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Mudança do estilo de vida (MEV) é a base do tratamento',
          'Dieta hipocalórica (déficit de 500-1000 kcal/dia)',
          'Atividade física: 150-300 min/semana de exercício aeróbico',
          'Terapia cognitivo-comportamental',
          'Suporte nutricional com nutricionista'
        ],
        farmacologico: [
          'Considerar se IMC ≥30, ou IMC ≥27 com comorbidade',
          'Após falha de MEV por 3-6 meses',
          'Opções: Orlistate, Semaglutida, Liraglutida, Sibutramina (com restrições)',
          'Cirurgia bariátrica se IMC ≥40 ou ≥35 com comorbidade grave'
        ]
      },
      metasTerapeuticas: [
        'Perda de 5-10% do peso inicial em 6 meses (clinicamente significativa)',
        'Melhora das comorbidades (DM, HAS, dislipidemia)',
        'Manutenção do peso a longo prazo',
        'Melhora da qualidade de vida'
      ],
      examesIniciais: [
        'Glicemia de jejum, HbA1c',
        'Perfil lipídico',
        'Função hepática (esteatose)',
        'TSH (descartar hipotireoidismo)',
        'Função renal',
        'Ácido úrico'
      ],
      redFlags: [
        'Ganho de peso rápido e inexplicado',
        'Síndrome de Cushing (fácies em lua cheia, estrias violáceas)',
        'Apneia do sono grave',
        'Hipertensão intracraniana idiopática',
        'Síndrome metabólica grave'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '30% dos adultos brasileiros (obesidade), 55% sobrepeso',
        incidencia: 'Pandemia global em crescimento',
        faixaEtaria: 'Todas as idades, aumenta na meia-idade',
        fatoresRisco: [
          'Dieta hipercalórica e ultraprocessados',
          'Sedentarismo',
          'Genética (60-70% de herdabilidade)',
          'Fatores socioeconômicos',
          'Distúrbios do sono',
          'Estresse crônico',
          'Medicamentos (corticoides, antipsicóticos, alguns antidepressivos)'
        ],
        citations: [{ refId: 'abeso-2022' }]
      },
      fisiopatologia: {
        texto: 'Desequilíbrio crônico entre ingestão e gasto energético, modulado por fatores genéticos, ambientais, hormonais e psicológicos. O tecido adiposo não é inerte: secreta adipocinas que promovem inflamação crônica de baixo grau, resistência insulínica e disfunção metabólica.',
        citations: [{ refId: 'abeso-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Excesso de peso visível',
          'Dispneia aos esforços',
          'Fadiga',
          'Dor articular (joelhos, coluna)',
          'Ronco, apneia do sono',
          'Baixa autoestima'
        ],
        sinaisExameFisico: [
          'IMC elevado',
          'Circunferência abdominal aumentada',
          'Acantose nigricans (resistência insulínica)',
          'Estrias',
          'Edema de MMII'
        ],
        formasClinicas: [
          'Obesidade androide (central/visceral): maior risco metabólico',
          'Obesidade ginoide (periférica): menor risco metabólico'
        ],
        citations: [{ refId: 'abeso-2022' }]
      },
      diagnostico: {
        criterios: [
          'IMC ≥30 kg/m² (obesidade)',
          'Circunferência abdominal aumentada',
          'Avaliação de comorbidades associadas'
        ],
        diagnosticoDiferencial: [
          'Edema (anasarca)',
          'Hipotireoidismo',
          'Síndrome de Cushing',
          'Uso de medicamentos',
          'Síndromes genéticas raras'
        ],
        examesLaboratoriais: [
          'Glicemia, HbA1c, TOTG',
          'Perfil lipídico completo',
          'Função hepática, ultrassom abdominal (esteatose)',
          'TSH',
          'Função renal, ácido úrico',
          'ECG, ecocardiograma se indicado'
        ],
        citations: [{ refId: 'abeso-2022' }]
      },
      tratamento: {
        objetivos: [
          'Perda de peso sustentada',
          'Melhora das comorbidades',
          'Prevenção de complicações',
          'Melhora da qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Dieta hipocalórica equilibrada (déficit 500-1000 kcal/dia)',
            'Atividade física: 150-300 min/semana aeróbico + resistido',
            'Terapia cognitivo-comportamental',
            'Acompanhamento com equipe multidisciplinar'
          ],
          citations: [{ refId: 'abeso-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Inibidor de lipases',
              medicamentos: ['Orlistate'],
              posologia: '120mg 3x/dia com refeições principais'
            },
            {
              classe: 'Agonista GLP-1',
              medicamentos: ['Semaglutida', 'Liraglutida'],
              posologia: 'Semaglutida SC: iniciar 0,25mg/sem, titular até 2,4mg/sem'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'IMC ≥40 ou ≥35 com comorbidade grave',
              conduta: 'Avaliar cirurgia bariátrica'
            },
            {
              situacao: 'Obesidade + DM2',
              conduta: 'Preferir agonistas GLP-1 ou iSGLT2'
            }
          ],
          citations: [{ refId: 'abeso-2022' }]
        },
        duracao: 'Tratamento crônico'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal nos primeiros 6 meses, depois a cada 3 meses',
        examesControle: [
          'Peso, IMC, circunferência abdominal',
          'Glicemia, HbA1c',
          'Perfil lipídico',
          'Função hepática'
        ],
        metasTerapeuticas: [
          'Perda de 5-10% do peso inicial é clinicamente significativa',
          'Manutenção do peso perdido'
        ],
        criteriosEncaminhamento: [
          'Avaliação para cirurgia bariátrica',
          'Suspeita de causa secundária',
          'Complicações graves'
        ],
        citations: [{ refId: 'abeso-2022' }]
      },
      prevencao: {
        primaria: [
          'Alimentação saudável desde a infância',
          'Atividade física regular',
          'Redução de ultraprocessados'
        ],
        secundaria: [
          'Intervenção precoce no sobrepeso',
          'Tratamento de comorbidades'
        ],
        citations: [{ refId: 'abeso-2022' }]
      },
    },
    protocolos: ['protocolo-obesidade'],
    medicamentos: ['orlistate', 'semaglutida', 'liraglutida'],
    calculadoras: ['imc', 'risco-cv'],
    rastreamentos: [],
    citations: [{ refId: 'abeso-2022' }],
    lastUpdate: '2024-12',
    tags: ['obesidade', 'sobrepeso', 'imc', 'emagrecimento', 'cirurgia-bariatrica'],
  }
];

