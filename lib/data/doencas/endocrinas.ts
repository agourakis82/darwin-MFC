/**
 * DOENÇAS ENDÓCRINAS - DARWIN-MFC
 * ================================
 *
 * Evidence levels follow GRADE system:
 * - high: High-quality RCTs, meta-analyses (e.g., UKPDS, DCCT, EMPA-REG, LEADER)
 * - moderate: Lower-quality RCTs, well-designed observational studies
 * - low: Observational studies, case series
 * - very_low: Expert opinion, case reports
 *
 * Study types:
 * - rct: Randomized Controlled Trial
 * - systematic_review: Systematic Review / Meta-Analysis
 * - guideline: Clinical Practice Guideline
 * - cohort: Cohort Study
 * - consensus: Consensus Statement
 */

import { Doenca } from '../../types/doenca';

export const doencasEndocrinas: Doenca[] = [
  {
    id: 'diabetes-mellitus-tipo-2',
    titulo: 'Diabetes Mellitus Tipo 2',
    sinonimos: ['DM2', 'Diabetes do adulto', 'Diabetes não insulino-dependente'],
    doid: 'DOID:9352',
    snomedCT: '44054006',
    meshId: 'D003924',
    umlsCui: 'C0011860',
    ciap2: ['T90'],
    cid10: ['E11', 'E11.0', 'E11.9'],
    cid11: ['5A11'],
    loinc: [
      '4548-4',   // HbA1c
      '1558-6',   // Fasting glucose
      '2345-7',   // Glucose
      '14771-0',  // 2-hour OGTT glucose
      '2160-0',   // Creatinine
      '33914-3',  // eGFR
      '9318-7',   // Albumin/creatinine ratio
      '2093-3',   // Total cholesterol
      '2085-9',   // HDL cholesterol
      '13457-7',  // LDL calculated
      '2571-8',   // Triglycerides
      '1920-8',   // AST
      '1742-6',   // ALT
    ],
    categoria: 'metabolico',
    quickView: {
      definicao: 'Doença metabólica crônica caracterizada por hiperglicemia resultante de defeitos na secreção e/ou ação da insulina. Principal causa de cegueira, amputação não traumática e doença renal em adultos.',
      criteriosDiagnosticos: [
        'Glicemia de jejum ≥126 mg/dL (confirmada)',
        'HbA1c ≥6,5% (confirmada)',
        'Glicemia 2h pós-75g glicose (TOTG) ≥200 mg/dL',
        'Glicemia aleatória ≥200 mg/dL com sintomas clássicos',
        'Pré-diabetes: glicemia jejum 100-125 ou HbA1c 5,7-6,4%'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Mudança do estilo de vida (MEV): dieta + exercício físico',
          'Perda de peso (5-10% melhora controle glicêmico)',
          'Atividade física: 150 min/semana aeróbico + resistido',
          'Dieta: preferir baixo índice glicêmico, reduzir ultraprocessados',
          'Educação em diabetes e automonitorização'
        ],
        farmacologico: [
          'Metformina: primeira linha (se TFGe >30)',
          'Se doença CV ou renal: adicionar iSGLT2 ou agonista GLP-1',
          'Se HbA1c >1,5% acima da meta: considerar terapia combinada inicial',
          'Insulina: se HbA1c muito alta, sintomas catabólicos, ou gestação'
        ]
      },
      metasTerapeuticas: [
        'HbA1c <7% (maioria dos adultos)',
        'HbA1c <6,5% (recém-diagnosticados, sem complicações, expectativa de vida longa)',
        'HbA1c <8% (idosos frágeis, expectativa de vida limitada, hipoglicemias frequentes)',
        'PA <130/80 mmHg',
        'LDL <100 (ou <70 se alto risco CV)'
      ],
      examesIniciais: [
        'HbA1c',
        'Glicemia de jejum',
        'Perfil lipídico completo',
        'Creatinina e TFGe',
        'Relação albumina/creatinina urinária (RAC)',
        'TSH',
        'Fundoscopia (retinopatia)',
        'ECG'
      ],
      redFlags: [
        'Cetoacidose diabética (CAD): glicemia >250, cetonas+, acidose',
        'Estado hiperosmolar hiperglicêmico (EHH): glicemia >600, hiperosmolaridade',
        'Hipoglicemia grave (glicemia <54 com sintomas neurogênicos)',
        'Úlcera em pé diabético com sinais de infecção',
        'Perda visual súbita',
        'Dor torácica (síndrome coronariana aguda silenciosa)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '16,8 milhões de brasileiros (7,7% da população adulta)',
        incidencia: 'Crescente em todas as faixas etárias',
        mortalidade: '5ª causa de morte global; principal causa de DRC terminal',
        faixaEtaria: 'Aumenta com idade; 50% não diagnosticados',
        fatoresRisco: [
          'Obesidade (IMC ≥25)',
          'Circunferência abdominal aumentada',
          'História familiar de DM (parente 1º grau)',
          'Sedentarismo',
          'Pré-diabetes (GJA ou TGD)',
          'Síndrome metabólica',
          'HAS',
          'Dislipidemia',
          'História de DMG ou macrossomia fetal',
          'Síndrome dos ovários policísticos'
        ],
        citations: [
          { refId: 'sbd-epidemiologia-2024', evidenceLevel: 'moderate', studyType: 'guideline' },
          { refId: 'vigitel-2023', evidenceLevel: 'moderate', studyType: 'cohort' }
        ]
      },
      fisiopatologia: {
        texto: 'O DM2 resulta de resistência insulínica progressiva associada a disfunção das células beta pancreáticas. A resistência insulínica (principalmente hepática e muscular) antecede a hiperglicemia por anos. A lipotoxicidade, glicotoxicidade e inflamação crônica contribuem para falência progressiva das células beta. Fatores genéticos (poligênico) e ambientais (obesidade, sedentarismo) interagem na patogênese.',
        citations: [
          { refId: 'sbd-diretrizes-2023', evidenceLevel: 'high', studyType: 'guideline' },
          { refId: 'ukpds-1998', evidenceLevel: 'high', studyType: 'rct' }
        ]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Poliúria (diurese osmótica)',
          'Polidipsia',
          'Perda de peso inexplicada',
          'Fadiga',
          'Visão turva',
          'Infecções de repetição (candidíase, ITU)',
          'Parestesias em extremidades',
          'Muitos pacientes são assintomáticos'
        ],
        sinaisExameFisico: [
          'Obesidade central',
          'Acantose nigricans (resistência insulínica)',
          'Xantelasmas (dislipidemia)',
          'Sinais de complicações microvasculares',
          'Pé diabético: deformidades, calosidades, úlceras',
          'Diminuição de pulsos periféricos',
          'Alterações de sensibilidade (monofilamento)'
        ],
        formasClinicas: [
          'DM2 clássico: obesidade, início insidioso, adultos',
          'DM2 com fenótipo de DM1: magro, pode necessitar insulina precoce',
          'LADA (Latent Autoimmune Diabetes in Adults): autoimune de início tardio'
        ],
        citations: [
          { refId: 'sbd-diretrizes-2023', evidenceLevel: 'high', studyType: 'guideline' },
          { refId: 'ada-standards-2024', evidenceLevel: 'high', studyType: 'guideline' }
        ]
      },
      diagnostico: {
        criterios: [
          'Glicemia de jejum ≥126 mg/dL (2 ocasiões)',
          'HbA1c ≥6,5% (2 ocasiões)',
          'TOTG 2h ≥200 mg/dL',
          'Glicemia aleatória ≥200 + sintomas clássicos'
        ],
        diagnosticoDiferencial: [
          'DM tipo 1 (autoimune)',
          'LADA',
          'MODY (monogênico)',
          'Diabetes secundário (corticoides, pancreatite)',
          'Diabetes gestacional',
          'Estresse hiperglicêmico agudo'
        ],
        examesLaboratoriais: [
          'Glicemia de jejum',
          'HbA1c',
          'TOTG (se dúvida diagnóstica)',
          'Perfil lipídico',
          'Creatinina e TFGe',
          'RAC (relação albumina/creatinina urinária)',
          'Função hepática (antes de iniciar metformina)',
          'TSH (comorbidade comum)'
        ],
        citations: [
          { refId: 'sbd-diagnostico-2024', evidenceLevel: 'high', studyType: 'guideline' },
          { refId: 'ada-standards-2024', evidenceLevel: 'high', studyType: 'guideline' }
        ]
      },
      tratamento: {
        objetivos: [
          'Controle glicêmico (HbA1c individualizada)',
          'Prevenção de complicações micro e macrovasculares',
          'Controle de fatores de risco CV (PA, lipídios)',
          'Melhora da qualidade de vida',
          'Evitar hipoglicemias'
        ],
        naoFarmacologico: {
          medidas: [
            'Dieta equilibrada: redução de carboidratos refinados, aumento de fibras',
            'Atividade física: 150 min/sem aeróbico + 2-3x resistido',
            'Perda de peso: 5-10% melhora controle; >15% pode induzir remissão',
            'Cessação do tabagismo',
            'Educação estruturada em diabetes',
            'Automonitorização glicêmica (se insulinizado)'
          ],
          citations: [
            { refId: 'sbd-diretrizes-2023', evidenceLevel: 'high', studyType: 'guideline' },
            { refId: 'look-ahead-2013', evidenceLevel: 'high', studyType: 'rct' },
            { refId: 'direct-trial-2018', evidenceLevel: 'high', studyType: 'rct' }
          ]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Biguanida',
              medicamentos: ['Metformina'],
              posologia: '500-2550 mg/dia, com refeições. Iniciar 500mg 1-2x/dia, titular.',
              observacoes: 'Contraindicada se TFGe <30. Suspender em procedimentos com contraste.'
            },
            {
              classe: 'Inibidor SGLT2',
              medicamentos: ['Empagliflozina', 'Dapagliflozina', 'Canagliflozina'],
              posologia: 'Empagliflozina 10-25mg/dia; Dapagliflozina 10mg/dia',
              observacoes: 'Benefício CV e renal comprovado em RCTs. Preferir se DCV ou DRC.'
            },
            {
              classe: 'Agonista GLP-1',
              medicamentos: ['Semaglutida', 'Liraglutida', 'Dulaglutida'],
              posologia: 'Semaglutida SC 0,25mg/sem → 1mg/sem; Liraglutida 0,6mg → 1,8mg/dia',
              observacoes: 'Benefício CV e perda de peso. Preferir se obesidade ou DCV aterosclerótica.'
            }
          ],
          segundaLinha: [
            {
              classe: 'Sulfonilureia',
              medicamentos: ['Gliclazida MR', 'Glimepirida'],
              posologia: 'Gliclazida MR 30-120 mg/dia; Glimepirida 1-4 mg/dia',
              observacoes: 'Baixo custo, mas risco de hipoglicemia e ganho de peso.'
            },
            {
              classe: 'Inibidor DPP-4',
              medicamentos: ['Sitagliptina', 'Vildagliptina', 'Linagliptina'],
              posologia: 'Sitagliptina 100mg/dia; Vildagliptina 50mg 2x/dia',
              observacoes: 'Neutro em peso. Linagliptina não precisa ajuste renal.'
            },
            {
              classe: 'Insulina basal',
              medicamentos: ['Glargina', 'Degludeca', 'NPH'],
              posologia: 'Iniciar 10 UI ou 0,1-0,2 UI/kg à noite. Titular por glicemia jejum.',
              observacoes: 'Indicada se HbA1c muito alta, sintomas catabólicos, ou falha de orais.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'DM2 com DCV aterosclerótica estabelecida',
              conduta: 'iSGLT2 ou agonista GLP-1 com benefício CV comprovado, independente de HbA1c'
            },
            {
              situacao: 'DM2 com insuficiência cardíaca',
              conduta: 'iSGLT2 (empagliflozina ou dapagliflozina) reduz internações por IC'
            },
            {
              situacao: 'DM2 com DRC (TFGe 25-60 ou albuminúria)',
              conduta: 'iSGLT2 até TFGe 20; agonista GLP-1 como alternativa; iECA/BRA para nefroproteção'
            },
            {
              situacao: 'DM2 com obesidade',
              conduta: 'Agonista GLP-1 (semaglutida: perda de 10-15% peso) ou cirurgia bariátrica se IMC ≥35'
            },
            {
              situacao: 'Idosos frágeis',
              conduta: 'Evitar hipoglicemia. Preferir iDPP-4. Metas HbA1c mais flexíveis (<8%)'
            }
          ],
          citations: [
            { refId: 'ukpds-1998', evidenceLevel: 'high', studyType: 'rct' },
            { refId: 'dcct-1993', evidenceLevel: 'high', studyType: 'rct' },
            { refId: 'empa-reg-2015', evidenceLevel: 'high', studyType: 'rct' },
            { refId: 'leader-2016', evidenceLevel: 'high', studyType: 'rct' },
            { refId: 'credence-2019', evidenceLevel: 'high', studyType: 'rct' },
            { refId: 'dapa-hf-2019', evidenceLevel: 'high', studyType: 'rct' },
            { refId: 'sustain-6-2016', evidenceLevel: 'high', studyType: 'rct' },
            { refId: 'sbd-diretrizes-2023', evidenceLevel: 'high', studyType: 'guideline' },
            { refId: 'ada-standards-2024', evidenceLevel: 'high', studyType: 'guideline' }
          ]
        },
        duracao: 'Tratamento contínuo e progressivo ao longo da vida'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-4 meses até atingir metas; depois a cada 6 meses',
        examesControle: [
          'HbA1c a cada 3 meses (se fora da meta) ou 6 meses (se estável)',
          'Glicemia de jejum e perfil lipídico anual',
          'Creatinina, TFGe e RAC anual',
          'Fundoscopia anual (ou a cada 2 anos se normal e bom controle)',
          'Exame dos pés a cada consulta (monofilamento, pulsos)',
          'ECG anual se alto risco CV'
        ],
        metasTerapeuticas: [
          'HbA1c <7% (individualizável)',
          'Glicemia jejum 80-130 mg/dL',
          'Glicemia pós-prandial <180 mg/dL',
          'PA <130/80 mmHg',
          'LDL <100 mg/dL (ou <70 se DCV estabelecida)',
          'Triglicerídeos <150 mg/dL'
        ],
        criteriosEncaminhamento: [
          'Suspeita de DM1 ou LADA',
          'Cetoacidose ou EHH',
          'Retinopatia diabética proliferativa ou edema macular',
          'DRC estágio 4-5 (TFGe <30)',
          'Pé diabético com úlcera infectada ou isquêmica',
          'Neuropatia autonômica grave',
          'Gestação (pré-natal de alto risco)'
        ],
        citations: [
          { refId: 'sbd-diretrizes-2023', evidenceLevel: 'high', studyType: 'guideline' },
          { refId: 'ada-standards-2024', evidenceLevel: 'high', studyType: 'guideline' },
          { refId: 'ukpds-follow-up-2008', evidenceLevel: 'high', studyType: 'rct' }
        ]
      },
      prevencao: {
        primaria: [
          'Modificação do estilo de vida em pré-diabéticos (reduz risco em 58%)',
          'Perda de peso sustentada (5-10%)',
          'Atividade física regular (150 min/semana)',
          'Dieta saudável (mediterrânea, DASH)',
          'Metformina em alto risco (reduz risco em 31%)'
        ],
        secundaria: [
          'Controle glicêmico intensivo precoce (legacy effect)',
          'Controle de PA e lipídios',
          'Rastreamento de complicações',
          'Vacinação (influenza, pneumococo, COVID-19)'
        ],
        citations: [
          { refId: 'dpp-2002', evidenceLevel: 'high', studyType: 'rct' },
          { refId: 'finnish-dps-2001', evidenceLevel: 'high', studyType: 'rct' },
          { refId: 'sbd-rastreamento-2025', evidenceLevel: 'moderate', studyType: 'guideline' }
        ]
      },
    },
    protocolos: ['protocolo-dm2', 'insulinizacao'],
    medicamentos: ['metformina', 'empagliflozina', 'dapagliflozina', 'semaglutida', 'liraglutida', 'sitagliptina', 'glargina'],
    calculadoras: ['findrisc', 'risco-cv', 'tfge'],
    rastreamentos: ['rastreamento-dm2', 'retinopatia-diabetica', 'pe-diabetico'],
    citations: [
      { refId: 'sbd-diretrizes-2023', evidenceLevel: 'high', studyType: 'guideline' },
      { refId: 'ada-standards-2024', evidenceLevel: 'high', studyType: 'guideline' },
      { refId: 'ukpds-1998', evidenceLevel: 'high', studyType: 'rct' },
      { refId: 'empa-reg-2015', evidenceLevel: 'high', studyType: 'rct' }
    ],
    lastUpdate: '2024-12',
    tags: ['diabetes', 'dm2', 'hiperglicemia', 'insulina', 'metformina', 'isglt2', 'glp1'],
  },
  {
    id: 'hipotireoidismo',
    titulo: 'Hipotireoidismo',
    sinonimos: ['Tireoidite de Hashimoto', 'Mixedema'],
    doid: 'DOID:1459',
    snomedCT: '40930008',
    meshId: 'D007037',
    umlsCui: 'C0020676',
    ciap2: ['T86'],
    cid10: ['E03', 'E03.9', 'E06.3'],
    cid11: ['5A00'],
    loinc: [
      '3016-3',   // TSH
      '3024-7',   // T4 free
      '3051-0',   // T3 free
      '3026-2',   // T4 total
      '3053-6',   // T3 total
      '5382-7',   // Anti-TPO antibodies
      '5385-0',   // Anti-thyroglobulin antibodies
      '2093-3',   // Total cholesterol (often elevated)
      '2160-0',   // Creatinine
      '718-7',    // Hemoglobin (anemia common)
      '2951-2',   // Sodium (hyponatremia risk)
    ],
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
        citations: [
          { refId: 'sbem-tireoide-2023', evidenceLevel: 'moderate', studyType: 'guideline' },
          { refId: 'ata-hypothyroidism-2014', evidenceLevel: 'high', studyType: 'guideline' }
        ]
      },
      fisiopatologia: {
        texto: 'A causa mais comum é a tireoidite de Hashimoto (autoimune), com destruição gradual da glândula por autoanticorpos (anti-TPO, anti-Tg). Outras causas incluem tireoidectomia, radioablação, medicamentos e deficiência de iodo. A deficiência de T3/T4 reduz o metabolismo basal de todos os tecidos.',
        citations: [
          { refId: 'sbem-tireoide-2023', evidenceLevel: 'moderate', studyType: 'guideline' },
          { refId: 'pearce-2013', evidenceLevel: 'moderate', studyType: 'systematic_review' }
        ]
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
        citations: [
          { refId: 'sbem-tireoide-2023', evidenceLevel: 'moderate', studyType: 'guideline' },
          { refId: 'ata-hypothyroidism-2014', evidenceLevel: 'high', studyType: 'guideline' }
        ]
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
        citations: [
          { refId: 'sbem-tireoide-2023', evidenceLevel: 'moderate', studyType: 'guideline' },
          { refId: 'ata-hypothyroidism-2014', evidenceLevel: 'high', studyType: 'guideline' }
        ]
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
          citations: [
            { refId: 'sbem-tireoide-2023', evidenceLevel: 'moderate', studyType: 'guideline' }
          ]
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
          citations: [
            { refId: 'sbem-tireoide-2023', evidenceLevel: 'moderate', studyType: 'guideline' },
            { refId: 'ata-hypothyroidism-2014', evidenceLevel: 'high', studyType: 'guideline' },
            { refId: 'trust-thyroid-2017', evidenceLevel: 'high', studyType: 'rct' }
          ]
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
        citations: [
          { refId: 'sbem-tireoide-2023', evidenceLevel: 'moderate', studyType: 'guideline' },
          { refId: 'ata-hypothyroidism-2014', evidenceLevel: 'high', studyType: 'guideline' }
        ]
      },
      prevencao: {
        primaria: ['Não há prevenção primária específica para hipotireoidismo autoimune'],
        secundaria: ['Tratamento precoce para evitar complicações cardiovasculares e metabólicas'],
        citations: [
          { refId: 'sbem-tireoide-2023', evidenceLevel: 'moderate', studyType: 'guideline' }
        ]
      },
    },
    protocolos: [],
    medicamentos: ['levotiroxina'],
    calculadoras: [],
    rastreamentos: ['rastreamento-tireoide'],
    citations: [
      { refId: 'sbem-tireoide-2023', evidenceLevel: 'moderate', studyType: 'guideline' },
      { refId: 'ata-hypothyroidism-2014', evidenceLevel: 'high', studyType: 'guideline' }
    ],
    lastUpdate: '2024-12',
    tags: ['hipotireoidismo', 'tireoide', 'hashimoto', 'levotiroxina', 'tsh'],
  },
  {
    id: 'hipertireoidismo',
    titulo: 'Hipertireoidismo',
    sinonimos: ['Doença de Graves', 'Tireotoxicose', 'Bócio tóxico'],
    doid: 'DOID:7998',
    snomedCT: '34486009',
    meshId: 'D006980',
    umlsCui: 'C0020550',
    ciap2: ['T85'],
    cid10: ['E05', 'E05.0', 'E05.9'],
    cid11: ['5A02'],
    loinc: [
      '3016-3',   // TSH
      '3024-7',   // T4 free
      '3051-0',   // T3 free
      '3026-2',   // T4 total
      '3053-6',   // T3 total
      '5384-3',   // TRAb (TSH receptor antibodies)
      '5382-7',   // Anti-TPO antibodies
      '718-7',    // Hemoglobin
      '1920-8',   // AST
      '1742-6',   // ALT
    ],
    categoria: 'metabolico',
    quickView: {
      definicao: 'Síndrome clínica de hipermetabolismo resultante do excesso de hormônios tireoidianos. A doença de Graves é a causa mais comum (60-80%).',
      criteriosDiagnosticos: [
        'TSH suprimido (<0,1 mU/L)',
        'T4 livre elevado (hipertireoidismo manifesto)',
        'TSH suprimido com T4L normal, T3 elevado (T3-toxicose)',
        'TRAb positivo confirma doença de Graves'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar iodo em excesso (contraste, amiodarona)',
          'Repouso relativo (se tireotoxicose grave)',
          'Betabloqueador para controle sintomático'
        ],
        farmacologico: [
          'Metimazol: droga de escolha (exceto 1º trimestre gestação)',
          'Propiltiouracil (PTU): 1º trimestre gestação ou crise tireotóxica',
          'Propranolol: controle de taquicardia e tremor',
          'Iodo radioativo ou cirurgia: tratamento definitivo'
        ]
      },
      metasTerapeuticas: [
        'Normalização de TSH e T4L',
        'Controle de sintomas adrenérgicos',
        'Remissão ou tratamento definitivo',
        'Prevenção de complicações (FA, osteoporose)'
      ],
      examesIniciais: [
        'TSH',
        'T4 livre',
        'T3 livre (se TSH suprimido com T4L normal)',
        'TRAb (se suspeita de Graves)',
        'Hemograma e função hepática (antes de antitireoidianos)',
        'US tireoide, cintilografia (definir etiologia)'
      ],
      redFlags: [
        'Crise tireotóxica (tempestade tireoidiana): febre, taquicardia grave, alteração consciência',
        'Fibrilação atrial de alta resposta',
        'Insuficiência cardíaca de alto débito',
        'Oftalmopatia de Graves grave (proptose, diplopia, compressão nervo óptico)',
        'Agranulocitose (febre + odinofagia em uso de antitireoidianos)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1-2% da população',
        incidencia: 'Mais comum em mulheres (5-10x)',
        faixaEtaria: 'Graves: 20-50 anos; bócio multinodular tóxico: idosos',
        fatoresRisco: [
          'Sexo feminino',
          'História familiar de doença tireoidiana autoimune',
          'Outras doenças autoimunes',
          'Tabagismo (fator de risco para oftalmopatia de Graves)',
          'Excesso de iodo (contraste, amiodarona)'
        ],
        citations: [
          { refId: 'sbem-tireoide-2023', evidenceLevel: 'moderate', studyType: 'guideline' },
          { refId: 'ata-hyperthyroidism-2016', evidenceLevel: 'high', studyType: 'guideline' }
        ]
      },
      fisiopatologia: {
        texto: 'Na doença de Graves, autoanticorpos (TRAb) estimulam o receptor de TSH, causando produção excessiva de T3/T4 independente do feedback hipofisário. No bócio multinodular tóxico, nódulos autônomos produzem hormônios independentemente. O excesso de hormônios tireoidianos aumenta o metabolismo basal, termogênese e ação catecolaminérgica.',
        citations: [
          { refId: 'sbem-tireoide-2023', evidenceLevel: 'moderate', studyType: 'guideline' },
          { refId: 'ata-hyperthyroidism-2016', evidenceLevel: 'high', studyType: 'guideline' }
        ]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Taquicardia, palpitações',
          'Perda de peso apesar de apetite normal/aumentado',
          'Intolerância ao calor, sudorese',
          'Tremores finos',
          'Nervosismo, irritabilidade, insônia',
          'Fraqueza muscular proximal',
          'Diarreia ou aumento da frequência evacuatória',
          'Alterações menstruais (oligomenorreia)'
        ],
        sinaisExameFisico: [
          'Taquicardia sinusal ou FA',
          'Bócio difuso (Graves) ou nodular',
          'Pele quente e úmida',
          'Tremor fino de extremidades',
          'Hiperreflexia',
          'Oftalmopatia de Graves: proptose, retração palpebral, lagoftalmia',
          'Mixedema pré-tibial (Graves)'
        ],
        formasClinicas: [
          'Doença de Graves: autoimune, TRAb+, bócio difuso, oftalmopatia',
          'Bócio multinodular tóxico: idosos, áreas de iodo insuficiente',
          'Adenoma tóxico: nódulo solitário hiperfuncionante',
          'Tireoidite subaguda: hipertireoidismo transitório, dor cervical'
        ],
        citations: [
          { refId: 'sbem-tireoide-2023', evidenceLevel: 'moderate', studyType: 'guideline' },
          { refId: 'ata-hyperthyroidism-2016', evidenceLevel: 'high', studyType: 'guideline' }
        ]
      },
      diagnostico: {
        criterios: [
          'TSH suprimido (<0,1 mU/L) com T4L e/ou T3 elevados',
          'TRAb positivo confirma doença de Graves',
          'Cintilografia: captação aumentada difusa (Graves) ou nodular (adenoma/bócio)'
        ],
        diagnosticoDiferencial: [
          'Tireoidite subaguda (hipertireoidismo transitório)',
          'Tireotoxicose factícia (uso exógeno de hormônio)',
          'Struma ovarii (teratoma ovariano)',
          'Hipertireoidismo induzido por amiodarona',
          'Ansiedade generalizada'
        ],
        examesLaboratoriais: [
          'TSH, T4L, T3L',
          'TRAb (doença de Graves)',
          'Anti-TPO (pode estar positivo)',
          'Hemograma e função hepática (antes de antitireoidianos)',
          'US tireoide',
          'Cintilografia de tireoide (definir causa)'
        ],
        citations: [
          { refId: 'sbem-tireoide-2023', evidenceLevel: 'moderate', studyType: 'guideline' },
          { refId: 'ata-hyperthyroidism-2016', evidenceLevel: 'high', studyType: 'guideline' }
        ]
      },
      tratamento: {
        objetivos: [
          'Controle dos sintomas de tireotoxicose',
          'Normalização da função tireoidiana',
          'Tratamento definitivo ou remissão sustentada',
          'Prevenção de complicações (FA, osteoporose, crise tireotóxica)'
        ],
        naoFarmacologico: {
          medidas: [
            'Evitar excesso de iodo',
            'Cessação do tabagismo (especialmente se oftalmopatia)',
            'Repouso relativo se tireotoxicose grave',
            'Suplementação de cálcio e vitamina D se necessário'
          ],
          citations: [
            { refId: 'ata-hyperthyroidism-2016', evidenceLevel: 'high', studyType: 'guideline' }
          ]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Antitireoidiano (tionamida)',
              medicamentos: ['Metimazol', 'Propiltiouracil (PTU)'],
              posologia: 'Metimazol: 10-30 mg/dia (dose única). PTU: 100-150 mg 3x/dia',
              observacoes: 'Metimazol preferido. PTU apenas no 1º trimestre gestação ou crise tireotóxica.'
            },
            {
              classe: 'Betabloqueador',
              medicamentos: ['Propranolol', 'Atenolol'],
              posologia: 'Propranolol 20-40 mg 3-4x/dia até controle de sintomas',
              observacoes: 'Controle sintomático de taquicardia, tremor. Pode ser suspenso após eutireoidismo.'
            }
          ],
          segundaLinha: [
            {
              classe: 'Iodo radioativo (I-131)',
              medicamentos: ['Iodo-131'],
              posologia: 'Dose calculada para ablação tireoidiana',
              observacoes: 'Tratamento definitivo. Causa hipotireoidismo. Contraindicado em gestação.'
            },
            {
              classe: 'Tireoidectomia',
              medicamentos: [],
              posologia: 'Cirurgia total ou subtotal',
              observacoes: 'Indicada em bócios grandes, suspeita de malignidade, ou falha de outras terapias.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Gestação',
              conduta: 'PTU no 1º trimestre, metimazol no 2º/3º trimestres. Menor dose efetiva.'
            },
            {
              situacao: 'Oftalmopatia de Graves',
              conduta: 'Cessar tabagismo. Corticoides se grave. Evitar I-131 se oftalmopatia ativa.'
            },
            {
              situacao: 'Crise tireotóxica',
              conduta: 'Emergência: PTU em altas doses, iodo, betabloqueador IV, corticoide, suporte em UTI.'
            }
          ],
          citations: [
            { refId: 'ata-hyperthyroidism-2016', evidenceLevel: 'high', studyType: 'guideline' },
            { refId: 'sbem-tireoide-2023', evidenceLevel: 'moderate', studyType: 'guideline' },
            { refId: 'abraham-2005', evidenceLevel: 'moderate', studyType: 'systematic_review' }
          ]
        },
        duracao: 'Antitireoidianos: 12-18 meses, depois avaliar remissão ou tratamento definitivo'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 4-6 semanas até eutireoidismo, depois a cada 3-6 meses',
        examesControle: [
          'TSH, T4L, T3L',
          'Hemograma (risco de agranulocitose com tionamidas)',
          'Função hepática',
          'TRAb (para prever remissão na doença de Graves)'
        ],
        metasTerapeuticas: [
          'TSH e T4L normais',
          'Controle de sintomas',
          'Remissão sustentada ou eutireoidismo pós-tratamento definitivo'
        ],
        criteriosEncaminhamento: [
          'Suspeita de crise tireotóxica',
          'Oftalmopatia de Graves moderada/grave',
          'Indicação de I-131 ou cirurgia',
          'Agranulocitose ou hepatotoxicidade por tionamidas',
          'Gestação com hipertireoidismo'
        ],
        citations: [
          { refId: 'ata-hyperthyroidism-2016', evidenceLevel: 'high', studyType: 'guideline' },
          { refId: 'sbem-tireoide-2023', evidenceLevel: 'moderate', studyType: 'guideline' }
        ]
      },
      prevencao: {
        primaria: ['Não há prevenção primária específica'],
        secundaria: [
          'Rastreamento em pacientes de risco',
          'Diagnóstico e tratamento precoce para prevenir complicações'
        ],
        citations: [
          { refId: 'sbem-tireoide-2023', evidenceLevel: 'moderate', studyType: 'guideline' }
        ]
      },
    },
    protocolos: [],
    medicamentos: ['metimazol', 'propiltiouracil', 'propranolol'],
    calculadoras: [],
    rastreamentos: [],
    citations: [
      { refId: 'sbem-tireoide-2023', evidenceLevel: 'moderate', studyType: 'guideline' },
      { refId: 'ata-hyperthyroidism-2016', evidenceLevel: 'high', studyType: 'guideline' }
    ],
    lastUpdate: '2024-12',
    tags: ['hipertireoidismo', 'graves', 'tireotoxicose', 'tireoide', 'metimazol', 'tsh'],
  },
  {
    id: 'obesidade',
    titulo: 'Obesidade',
    sinonimos: ['Excesso de peso', 'Sobrepeso'],
    doid: 'DOID:9970',
    snomedCT: '414916001',
    meshId: 'D009765',
    umlsCui: 'C0028754',
    ciap2: ['T82', 'T83'],
    cid10: ['E66', 'E66.0', 'E66.9'],
    cid11: ['5B81'],
    loinc: [
      '39156-5',  // BMI
      '29463-7',  // Body weight
      '8302-2',   // Height
      '8280-0',   // Waist circumference
      '1558-6',   // Fasting glucose
      '4548-4',   // HbA1c
      '2093-3',   // Total cholesterol
      '2085-9',   // HDL
      '13457-7',  // LDL calculated
      '2571-8',   // Triglycerides
      '1920-8',   // AST
      '1742-6',   // ALT
      '3016-3',   // TSH (rule out hypothyroidism)
      '2160-0',   // Creatinine
      '9318-7',   // Albumin/creatinine ratio
    ],
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
          'Opções: Orlistate, Semaglutida, Liraglutida, Tirzepatida',
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
        citations: [
          { refId: 'abeso-2022', evidenceLevel: 'moderate', studyType: 'guideline' },
          { refId: 'vigitel-2023', evidenceLevel: 'moderate', studyType: 'cohort' }
        ]
      },
      fisiopatologia: {
        texto: 'Desequilíbrio crônico entre ingestão e gasto energético, modulado por fatores genéticos, ambientais, hormonais e psicológicos. O tecido adiposo não é inerte: secreta adipocinas que promovem inflamação crônica de baixo grau, resistência insulínica e disfunção metabólica.',
        citations: [
          { refId: 'abeso-2022', evidenceLevel: 'moderate', studyType: 'guideline' }
        ]
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
        citations: [
          { refId: 'abeso-2022', evidenceLevel: 'moderate', studyType: 'guideline' }
        ]
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
        citations: [
          { refId: 'abeso-2022', evidenceLevel: 'moderate', studyType: 'guideline' }
        ]
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
          citations: [
            { refId: 'abeso-2022', evidenceLevel: 'moderate', studyType: 'guideline' },
            { refId: 'look-ahead-2013', evidenceLevel: 'high', studyType: 'rct' }
          ]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Inibidor de lipases',
              medicamentos: ['Orlistate'],
              posologia: '120mg 3x/dia com refeições principais',
              observacoes: 'Perda de peso modesta (3-4kg). Efeitos GI comuns.'
            },
            {
              classe: 'Agonista GLP-1',
              medicamentos: ['Semaglutida', 'Liraglutida'],
              posologia: 'Semaglutida SC: iniciar 0,25mg/sem, titular até 2,4mg/sem',
              observacoes: 'Perda de 10-15% do peso. Benefício CV adicional.'
            },
            {
              classe: 'Agonista duplo GIP/GLP-1',
              medicamentos: ['Tirzepatida'],
              posologia: 'Iniciar 2,5mg/sem SC, titular até 15mg/sem',
              observacoes: 'Perda de até 20% do peso. Mais potente para perda de peso.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'IMC ≥40 ou ≥35 com comorbidade grave',
              conduta: 'Avaliar cirurgia bariátrica (bypass, sleeve)'
            },
            {
              situacao: 'Obesidade + DM2',
              conduta: 'Preferir agonistas GLP-1, iSGLT2 ou tirzepatida'
            }
          ],
          citations: [
            { refId: 'abeso-2022', evidenceLevel: 'moderate', studyType: 'guideline' },
            { refId: 'step-1-2021', evidenceLevel: 'high', studyType: 'rct' },
            { refId: 'surmount-1-2022', evidenceLevel: 'high', studyType: 'rct' },
            { refId: 'select-2023', evidenceLevel: 'high', studyType: 'rct' }
          ]
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
        citations: [
          { refId: 'abeso-2022', evidenceLevel: 'moderate', studyType: 'guideline' }
        ]
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
        citations: [
          { refId: 'abeso-2022', evidenceLevel: 'moderate', studyType: 'guideline' }
        ]
      },
    },
    protocolos: ['protocolo-obesidade'],
    medicamentos: ['orlistate', 'semaglutida', 'liraglutida', 'tirzepatida'],
    calculadoras: ['imc', 'risco-cv'],
    rastreamentos: [],
    citations: [
      { refId: 'abeso-2022', evidenceLevel: 'moderate', studyType: 'guideline' },
      { refId: 'step-1-2021', evidenceLevel: 'high', studyType: 'rct' },
      { refId: 'select-2023', evidenceLevel: 'high', studyType: 'rct' }
    ],
    lastUpdate: '2024-12',
    tags: ['obesidade', 'sobrepeso', 'imc', 'emagrecimento', 'cirurgia-bariatrica', 'semaglutida'],
  }
];
