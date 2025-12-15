/**
 * DATABASE DE DOENÇAS - DARWIN-MFC
 * =================================
 * 
 * Doenças mais prevalentes na Atenção Primária à Saúde
 * Padrão Q1: Todas com referências validadas
 * 
 * Referências principais:
 * - Cadernos de Atenção Básica (Ministério da Saúde)
 * - Diretrizes das Sociedades Brasileiras
 * - Tratado de Medicina de Família e Comunidade (Gusso & Lopes, 2024)
 */

import { Doenca, getDoencasByCategoria as groupByCategoria } from '../types/doenca';

export const doencas: Doenca[] = [
  // ==========================================================================
  // CARDIOVASCULAR
  // ==========================================================================
  {
    id: 'hipertensao-arterial',
    titulo: 'Hipertensão Arterial Sistêmica (HAS)',
    sinonimos: ['Pressão alta', 'HAS', 'Hipertensão'],
    doid: 'DOID:10763',
    snomedCT: '38341003',
    meshId: 'D006973',
    umlsCui: 'C0020538',
    ciap2: ['K86', 'K87'],
    cid10: ['I10', 'I11', 'I12', 'I13'],
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Condição clínica multifatorial caracterizada por elevação sustentada dos níveis pressóricos ≥140/90 mmHg. É o principal fator de risco modificável para doenças cardiovasculares, cerebrovasculares e renais.',
      criteriosDiagnosticos: [
        'PA de consultório ≥140/90 mmHg em 2 ou mais ocasiões distintas',
        'MAPA: média 24h ≥130/80 mmHg, vigília ≥135/85 mmHg, sono ≥120/70 mmHg',
        'MRPA: média ≥130/80 mmHg (7 dias, 2 medidas/dia)',
        'Afastar hipertensão do jaleco branco e mascarada'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Redução de sódio (<2g/dia ou 5g sal/dia)',
          'Dieta DASH (frutas, vegetais, laticínios desnatados)',
          'Atividade física: 150 min/semana (moderada) ou 75 min (intensa)',
          'Perda de peso se IMC >25 (meta: perda de 5-10%)',
          'Moderação do álcool (≤2 doses/dia homens, ≤1 mulheres)',
          'Cessação do tabagismo'
        ],
        farmacologico: [
          'IECA (Enalapril 5-20mg 12/12h) ou BRA (Losartana 50-100mg/dia)',
          'BCC (Anlodipino 5-10mg/dia)',
          'Diurético tiazídico (HCTZ 12,5-25mg/dia ou Clortalidona 12,5-25mg)',
          'Combinações preferidas: IECA/BRA + BCC ou IECA/BRA + Diurético',
          'Evitar monoterapia em estágio 2 ou alto risco CV'
        ]
      },
      metasTerapeuticas: [
        'PA <140/90 mmHg (geral)',
        'PA <130/80 mmHg se alto risco CV, DM ou DRC',
        'PA <130/80 mmHg em idosos hígidos (<80 anos)',
        'PA <150/90 mmHg em idosos frágeis (>80 anos)'
      ],
      examesIniciais: [
        'Glicemia de jejum e HbA1c',
        'Creatinina e TFG (CKD-EPI)',
        'Potássio sérico',
        'Perfil lipídico (CT, LDL, HDL, TG)',
        'Ácido úrico',
        'Exame de urina (EAS) e relação albumina/creatinina',
        'ECG de repouso'
      ],
      redFlags: [
        'PA ≥180/120 mmHg com sintomas (cefaleia intensa, alteração visual, dispneia)',
        'Suspeita de HAS secundária (início <30 anos, refratária, hipocalemia)',
        'Lesão de órgão-alvo aguda (IAM, AVC, EAP, dissecção)',
        'Gestante com PA ≥140/90 mmHg'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '32% da população adulta brasileira',
        incidencia: '~500 mil novos casos/ano',
        mortalidade: '~300 mil mortes CV/ano (principal FR)',
        faixaEtaria: 'Aumenta progressivamente com idade (>60% em >65 anos)',
        fatoresRisco: [
          'Idade avançada',
          'História familiar de HAS',
          'Etnia negra',
          'Excesso de sódio',
          'Obesidade/sobrepeso',
          'Sedentarismo',
          'Consumo excessivo de álcool',
          'Tabagismo',
          'Estresse crônico'
        ],
        citations: [{ refId: 'vigitel-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Frequentemente assintomática ("assassina silenciosa")',
          'Cefaleia occipital (geralmente matinal)',
          'Tontura',
          'Epistaxe (não específico)',
          'Dispneia aos esforços (se ICC)',
          'Alterações visuais (se retinopatia)'
        ],
        sinaisExameFisico: [
          'PA elevada em ambos os braços',
          'Sopros abdominais (HAS renovascular)',
          'Pulsos femorais diminuídos (coarctação)',
          'Fundo de olho alterado (retinopatia)',
          'B4 (sobrecarga ventricular)',
          'Edema de MMII (se ICC)'
        ],
        citations: [{ refId: 'sbc-has-2020' }]
      },
      diagnostico: {
        criterios: [
          'PA ≥140/90 mmHg em 2+ consultas com técnica adequada',
          'MAPA ou MRPA para confirmação (excluir jaleco branco)',
          'Classificação: Ótima (<120/80), Normal (120-129/80-84), Pré-HAS (130-139/85-89)',
          'Estágios: 1 (140-159/90-99), 2 (160-179/100-109), 3 (≥180/110)'
        ],
        diagnosticoDiferencial: [
          'Hipertensão do jaleco branco',
          'Hipertensão mascarada',
          'HAS secundária (renal, endócrina, medicamentosa)',
          'Síndrome de apneia do sono'
        ],
        examesLaboratoriais: [
          'Glicemia jejum, HbA1c, creatinina, potássio, ácido úrico',
          'Perfil lipídico, EAS, microalbuminúria'
        ],
        outrosExames: [
          'ECG de repouso',
          'Ecocardiograma se suspeita de cardiopatia',
          'USG renal se suspeita de HAS secundária'
        ],
        citations: [{ refId: 'sbc-has-2020' }]
      },
      tratamento: {
        objetivos: [
          'Reduzir morbimortalidade CV',
          'Atingir metas pressóricas individualizadas',
          'Controlar fatores de risco associados',
          'Prevenir/regredir lesões de órgão-alvo'
        ],
        naoFarmacologico: {
          medidas: [
            'Dieta DASH: rica em frutas, vegetais, grãos integrais, laticínios desnatados',
            'Restrição de sódio: <2g/dia (5g sal)',
            'Atividade física aeróbica: 150 min/semana moderada',
            'Exercício resistido: 2-3x/semana',
            'Perda de peso: meta 5-10% se sobrepeso/obesidade',
            'Moderação do álcool',
            'Cessação do tabagismo',
            'Controle do estresse'
          ],
          citations: [{ refId: 'sbc-has-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'IECA',
              medicamentos: ['Enalapril 5-40mg/dia', 'Captopril 25-150mg/dia', 'Ramipril 2,5-10mg/dia'],
              posologia: '1-2x/dia',
              observacoes: 'Tosse seca em 5-20%. CI: gestação, K>5,5, estenose bilateral renal'
            },
            {
              classe: 'BRA',
              medicamentos: ['Losartana 50-100mg/dia', 'Valsartana 80-320mg/dia'],
              posologia: '1x/dia',
              observacoes: 'Alternativa se intolerância a IECA'
            },
            {
              classe: 'BCC',
              medicamentos: ['Anlodipino 5-10mg/dia', 'Nifedipino Retard 20-60mg/dia'],
              posologia: '1x/dia',
              observacoes: 'Edema de MMII dose-dependente'
            },
            {
              classe: 'Diurético tiazídico',
              medicamentos: ['HCTZ 12,5-25mg/dia', 'Clortalidona 12,5-25mg/dia', 'Indapamida 1,5mg/dia'],
              posologia: '1x/dia pela manhã',
              observacoes: 'Monitorar K+, glicemia, ácido úrico'
            }
          ],
          segundaLinha: [
            {
              classe: 'Betabloqueador',
              medicamentos: ['Atenolol 25-100mg/dia', 'Carvedilol 12,5-50mg/dia', 'Metoprolol 50-200mg/dia'],
              observacoes: 'Preferir se ICC, FA, pós-IAM. Evitar em DPOC descompensada'
            },
            {
              classe: 'Diurético de alça',
              medicamentos: ['Furosemida 20-80mg/dia'],
              observacoes: 'Se TFG <30 ou edema refratário'
            },
            {
              classe: 'Poupador de potássio',
              medicamentos: ['Espironolactona 25-50mg/dia'],
              observacoes: 'HAS resistente. Monitorar K+'
            }
          ],
          situacoesEspeciais: [
            { situacao: 'Diabetes', conduta: 'IECA ou BRA (nefroproteção). Meta <130/80' },
            { situacao: 'DRC', conduta: 'IECA ou BRA se albuminúria. Meta <130/80' },
            { situacao: 'ICC FEr', conduta: 'IECA/BRA + BB + espironolactona + iSGLT2' },
            { situacao: 'Gestação', conduta: 'Metildopa, Nifedipino, Labetalol. CI: IECA, BRA' },
            { situacao: 'Negro', conduta: 'BCC ou Tiazídico como 1ª linha (melhor resposta)' }
          ],
          citations: [{ refId: 'sbc-has-2020' }]
        },
        duracao: 'Tratamento contínuo. Descontinuação apenas em casos selecionados (MEV bem-sucedida, HAS inicial leve)'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal até controle, depois trimestral/semestral',
        examesControle: [
          'Creatinina e K+ (1-2 semanas após iniciar/ajustar IECA/BRA/diurético)',
          'Perfil lipídico, glicemia: anual',
          'Microalbuminúria: anual se DM ou DRC'
        ],
        metasTerapeuticas: [
          'PA <140/90 mmHg (geral)',
          'PA <130/80 mmHg se alto risco, DM, DRC',
          'Controle de DM, dislipidemia, tabagismo'
        ],
        criteriosEncaminhamento: [
          'HAS resistente (não controlada com 3 drogas incluindo diurético)',
          'Suspeita de HAS secundária',
          'Lesão de órgão-alvo avançada',
          'DRC TFG <30 mL/min',
          'Emergências hipertensivas'
        ],
        citations: [{ refId: 'sbc-has-2020' }]
      },
      prevencao: {
        primaria: [
          'Alimentação saudável desde infância',
          'Manutenção de peso adequado',
          'Atividade física regular',
          'Moderação do sódio e álcool',
          'Não iniciar tabagismo'
        ],
        secundaria: [
          'Adesão ao tratamento',
          'Automonitorização da PA',
          'Controle de fatores de risco associados'
        ],
        citations: [{ refId: 'ms-cab-37-2013' }]
      }
    },
    protocolos: ['protocolo-has', 'estratificacao-rcv'],
    medicamentos: ['losartana', 'enalapril', 'anlodipino', 'hctz', 'atenolol'],
    calculadoras: ['framingham', 'score', 'ckdepi'],
    rastreamentos: ['hipertensao-arterial'],
    citations: [
      { refId: 'sbc-has-2020' },
      { refId: 'ms-cab-37-2013' }
    ],
    lastUpdate: '2024-12',
    tags: ['cardiovascular', 'cronica', 'prevalente', 'dcnt']
  },

  // ==========================================================================
  // METABÓLICO
  // ==========================================================================
  {
    id: 'diabetes-mellitus-2',
    titulo: 'Diabetes Mellitus tipo 2 (DM2)',
    sinonimos: ['Diabetes tipo 2', 'DM2', 'Diabetes do adulto'],
    doid: 'DOID:9351',
    snomedCT: '44054006',
    meshId: 'D003924',
    umlsCui: 'C0011860',
    ciap2: ['T90'],
    cid10: ['E11'],
    categoria: 'metabolico',
    quickView: {
      definicao: 'Doença metabólica caracterizada por hiperglicemia crônica resultante de defeitos na secreção e/ou ação da insulina. Representa 90-95% dos casos de diabetes e está fortemente associada à obesidade e sedentarismo.',
      criteriosDiagnosticos: [
        'Glicemia de jejum ≥126 mg/dL (confirmada em 2 ocasiões)',
        'Glicemia 2h após TOTG 75g ≥200 mg/dL',
        'HbA1c ≥6,5% (método certificado)',
        'Glicemia casual ≥200 mg/dL + sintomas clássicos (poliúria, polidipsia, perda de peso)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Dieta: redução calórica se sobrepeso, carboidratos complexos, fibras',
          'Atividade física: 150 min/semana aeróbico + resistido 2-3x',
          'Perda de 7-10% do peso se sobrepeso/obesidade',
          'Educação em diabetes e automonitorização',
          'Cessação do tabagismo'
        ],
        farmacologico: [
          'Metformina 500-2550mg/dia (1ª linha se TFG >30)',
          'Se HbA1c >7,5% ou sintomático: associar 2º agente',
          'iSGLT2 se DCV ou DRC (empagliflozina, dapagliflozina)',
          'GLP-1 se obesidade ou DCV (semaglutida, liraglutida)',
          'Insulina se HbA1c >10% ou sintomas graves'
        ]
      },
      metasTerapeuticas: [
        'HbA1c <7% (geral)',
        'HbA1c <6,5% se DM recente, jovem, sem hipoglicemias',
        'HbA1c <8% se idoso frágil, comorbidades, risco hipoglicemia',
        'Glicemia jejum 80-130 mg/dL',
        'Glicemia pós-prandial <180 mg/dL'
      ],
      examesIniciais: [
        'HbA1c (a cada 3-6 meses)',
        'Glicemia de jejum',
        'Perfil lipídico (LDL, HDL, TG)',
        'Creatinina e TFG',
        'Relação albumina/creatinina urinária',
        'Exame de fundo de olho',
        'Exame dos pés (sensibilidade, pulsos)',
        'ECG'
      ],
      redFlags: [
        'Cetoacidose diabética (glicemia >250, cetonúria, acidose)',
        'Estado hiperglicêmico hiperosmolar (glicemia >600, desidratação grave)',
        'Hipoglicemia grave (<54 mg/dL com sintomas neurológicos)',
        'Infecção grave (pé diabético infectado, sepse)',
        'Síndrome coronariana aguda'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '9,4% da população adulta brasileira (~16 milhões)',
        incidencia: '~500 mil novos casos/ano',
        mortalidade: '~70 mil mortes/ano atribuídas ao DM',
        faixaEtaria: 'Pico 45-64 anos, crescente em jovens',
        fatoresRisco: [
          'Obesidade/sobrepeso (IMC ≥25)',
          'Sedentarismo',
          'História familiar de DM',
          'Pré-diabetes (GJ 100-125, TOTG 140-199, HbA1c 5,7-6,4%)',
          'Diabetes gestacional prévio',
          'Síndrome dos ovários policísticos',
          'HAS, dislipidemia',
          'Uso de corticoides, antipsicóticos'
        ],
        citations: [{ refId: 'sbd-2024' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Frequentemente oligossintomático ou assintomático',
          'Poliúria (micção frequente)',
          'Polidipsia (sede excessiva)',
          'Perda de peso não intencional',
          'Fadiga',
          'Turvação visual',
          'Infecções de repetição (candidíase, ITU)'
        ],
        sinaisExameFisico: [
          'Obesidade central (circunferência abdominal aumentada)',
          'Acantose nigricans (pescoço, axilas)',
          'Alterações de sensibilidade em pés (neuropatia)',
          'Pulsos pediais diminuídos (DAP)',
          'Retinopatia ao exame de fundo de olho'
        ],
        citations: [{ refId: 'sbd-2024' }]
      },
      diagnostico: {
        criterios: [
          'Glicemia jejum ≥126 mg/dL (2 ocasiões ou 1 + sintomas)',
          'TOTG 75g ≥200 mg/dL às 2h',
          'HbA1c ≥6,5%',
          'Glicemia casual ≥200 + sintomas clássicos'
        ],
        diagnosticoDiferencial: [
          'Diabetes tipo 1 (autoimune, insulinopenia absoluta)',
          'LADA (autoimune tardio)',
          'MODY (genético)',
          'Diabetes secundário (pancreatite, Cushing, medicamentos)'
        ],
        examesLaboratoriais: [
          'HbA1c, glicemia jejum',
          'Perfil lipídico',
          'Creatinina, TFG, relação albumina/creatinina',
          'Transaminases',
          'TSH'
        ],
        citations: [{ refId: 'sbd-2024' }]
      },
      tratamento: {
        objetivos: [
          'Alcançar e manter metas glicêmicas individualizadas',
          'Prevenir complicações micro e macrovasculares',
          'Reduzir mortalidade cardiovascular',
          'Melhorar qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Terapia nutricional individualizada',
            'Redução de carboidratos simples e açúcar',
            'Aumento de fibras, vegetais, proteínas',
            'Atividade física: 150 min/semana aeróbico + resistido',
            'Perda de 7-10% do peso se sobrepeso',
            'Educação em diabetes estruturada',
            'Automonitorização da glicemia capilar'
          ],
          citations: [{ refId: 'sbd-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Biguanida',
              medicamentos: ['Metformina 500-2550mg/dia'],
              posologia: '2-3x/dia às refeições (XR 1x/dia)',
              observacoes: 'Iniciar 500mg 1-2x/dia, titular a cada 1-2 semanas. CI: TFG <30, acidose, desidratação'
            }
          ],
          segundaLinha: [
            {
              classe: 'iSGLT2',
              medicamentos: ['Empagliflozina 10-25mg/dia', 'Dapagliflozina 10mg/dia'],
              observacoes: 'Preferir se DCV aterosclerótica ou ICC ou DRC. CI: TFG <20-25'
            },
            {
              classe: 'Agonista GLP-1',
              medicamentos: ['Semaglutida 0,25-1mg SC/semana', 'Liraglutida 0,6-1,8mg SC/dia'],
              observacoes: 'Preferir se obesidade ou DCV. Alto custo, não disponível SUS'
            },
            {
              classe: 'Sulfonilureia',
              medicamentos: ['Glibenclamida 2,5-20mg/dia', 'Gliclazida MR 30-120mg/dia'],
              observacoes: 'Disponível SUS. Risco de hipoglicemia e ganho de peso'
            },
            {
              classe: 'Insulina',
              medicamentos: ['NPH 10 UI noturna', 'Regular pré-prandial'],
              observacoes: 'Se HbA1c >10%, sintomas catabólicos, falha de ADOs'
            }
          ],
          situacoesEspeciais: [
            { situacao: 'DCV estabelecida', conduta: 'Preferir iSGLT2 ou GLP-1 com benefício CV comprovado' },
            { situacao: 'ICC', conduta: 'iSGLT2 obrigatório (empagliflozina, dapagliflozina)' },
            { situacao: 'DRC', conduta: 'iSGLT2 se TFG >20-25. Ajustar metformina/suspender se TFG <30' },
            { situacao: 'Idoso frágil', conduta: 'Meta HbA1c <8%. Evitar sulfonilureias. Preferir iDPP4' }
          ],
          citations: [{ refId: 'sbd-2024' }]
        },
        duracao: 'Tratamento contínuo e progressivo'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-4 meses se descontrolado; 6 meses se estável',
        examesControle: [
          'HbA1c a cada 3-6 meses',
          'Perfil lipídico, creatinina, TFG, microalbuminúria: anual',
          'Fundo de olho: anual (a cada 2 anos se sem retinopatia e bom controle)',
          'Exame dos pés: a cada consulta',
          'ECG: anual se >40 anos ou fatores de risco'
        ],
        metasTerapeuticas: [
          'HbA1c individualizada (geralmente <7%)',
          'PA <130/80 mmHg',
          'LDL <100 mg/dL (ou <70 se alto risco CV)',
          'Cessação do tabagismo',
          'Peso saudável'
        ],
        criteriosEncaminhamento: [
          'Retinopatia diabética (para oftalmologia)',
          'Pé diabético com lesão/infecção',
          'DRC TFG <30 ou albuminúria progressiva',
          'Descompensação refratária',
          'Necessidade de insulinização complexa'
        ],
        citations: [{ refId: 'sbd-2024' }]
      },
      prevencao: {
        primaria: [
          'Identificação e tratamento do pré-diabetes',
          'Programa de mudança de estilo de vida',
          'Metformina em pré-diabetes de alto risco'
        ],
        secundaria: [
          'Controle glicêmico adequado',
          'Rastreamento e tratamento de complicações',
          'Vacinação (influenza, pneumococo, hepatite B)'
        ],
        citations: [{ refId: 'sbd-2024' }]
      }
    },
    protocolos: ['protocolo-dm2', 'insulinizacao-dm2'],
    medicamentos: ['metformina', 'glibenclamida', 'insulina-nph', 'empagliflozina'],
    calculadoras: ['findrisc', 'ckdepi', 'framingham'],
    rastreamentos: ['diabetes-mellitus-2'],
    citations: [{ refId: 'sbd-2024' }],
    lastUpdate: '2024-12',
    tags: ['metabolico', 'cronica', 'prevalente', 'dcnt']
  },

  // ==========================================================================
  // SAÚDE MENTAL
  // ==========================================================================
  {
    id: 'depressao',
    titulo: 'Transtorno Depressivo Maior',
    sinonimos: ['Depressão', 'Depressão maior', 'Episódio depressivo'],
    doid: 'DOID:1470',
    snomedCT: '35489007',
    meshId: 'D003865',
    umlsCui: 'C0011570',
    ciap2: ['P76'],
    cid10: ['F32', 'F33'],
    categoria: 'saude_mental',
    quickView: {
      definicao: 'Transtorno mental caracterizado por humor deprimido persistente e/ou perda de interesse por ≥2 semanas, acompanhado de sintomas cognitivos, comportamentais e físicos, causando prejuízo funcional significativo.',
      criteriosDiagnosticos: [
        '≥5 sintomas por ≥2 semanas, sendo obrigatório: humor deprimido OU anedonia',
        'Outros: alteração peso/apetite, insônia/hipersonia, agitação/retardo',
        'Fadiga, sentimento de inutilidade/culpa, dificuldade de concentração',
        'Pensamentos de morte ou ideação suicida',
        'Prejuízo funcional significativo (trabalho, relações, autocuidado)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Psicoeducação sobre a doença e tratamento',
          'Psicoterapia (TCC, interpessoal) - indicada para todos',
          'Atividade física regular (efeito antidepressivo)',
          'Higiene do sono',
          'Suporte social e familiar',
          'Afastamento de álcool e drogas'
        ],
        farmacologico: [
          'ISRS 1ª linha: Fluoxetina 20-60mg, Sertralina 50-200mg, Escitalopram 10-20mg',
          'ISRSN: Venlafaxina 75-225mg, Duloxetina 60-120mg (se dor associada)',
          'Tricíclico: Amitriptilina 25-150mg (se dor, insônia, baixo custo)',
          'Mínimo 6-12 meses após remissão. Manutenção se ≥3 episódios'
        ]
      },
      metasTerapeuticas: [
        'Remissão completa dos sintomas (PHQ-9 <5)',
        'Retorno ao funcionamento prévio',
        'Prevenção de recorrências',
        'Identificação e manejo de comorbidades'
      ],
      examesIniciais: [
        'TSH (descartar hipotireoidismo)',
        'Hemograma (anemia)',
        'Glicemia',
        'Função renal e hepática (baseline para medicamentos)',
        'Vitamina B12 e ácido fólico (se idoso ou desnutrido)'
      ],
      redFlags: [
        'Ideação suicida estruturada com plano e intenção',
        'Tentativa de suicídio prévia recente',
        'Sintomas psicóticos (delírios, alucinações)',
        'Episódio maníaco/hipomaníaco (sugere bipolaridade)',
        'Catatonia',
        'Risco de heteroagressão'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '7-10% da população adulta, 2x mais em mulheres',
        incidencia: 'Pico 25-44 anos',
        mortalidade: 'Suicídio: 15% em casos graves não tratados',
        fatoresRisco: [
          'História familiar de depressão',
          'Eventos adversos na infância',
          'Estresse crônico, luto, desemprego',
          'Doenças crônicas (DM, dor crônica, câncer)',
          'Uso de substâncias',
          'Transtorno de ansiedade prévio',
          'Puerpério'
        ],
        citations: [{ refId: 'who-depression-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Humor deprimido na maior parte do dia',
          'Anedonia (perda de prazer)',
          'Alteração de peso/apetite (aumento ou diminuição)',
          'Insônia ou hipersonia',
          'Fadiga, perda de energia',
          'Sentimento de inutilidade ou culpa excessiva',
          'Dificuldade de concentração',
          'Pensamentos de morte, ideação suicida'
        ],
        sinaisExameFisico: [
          'Aparência descuidada',
          'Lentificação psicomotora ou agitação',
          'Fácies triste, choro',
          'Fala lenta, monotônica',
          'Dificuldade de contato visual'
        ],
        formasClinicas: [
          'Leve: sintomas mínimos, funcionalidade preservada',
          'Moderado: sintomas e prejuízo funcionais evidentes',
          'Grave: sintomas intensos, risco de suicídio, possível psicose'
        ],
        citations: [{ refId: 'dsm-5' }]
      },
      diagnostico: {
        criterios: [
          '≥5 sintomas por ≥2 semanas (humor deprimido ou anedonia obrigatório)',
          'Prejuízo clínico significativo',
          'Não atribuível a substância ou condição médica',
          'Sem episódio maníaco/hipomaníaco prévio'
        ],
        diagnosticoDiferencial: [
          'Transtorno bipolar',
          'Hipotireoidismo',
          'Anemia',
          'Transtorno de ajustamento',
          'Luto normal',
          'Depressão secundária (medicamentos, doenças)'
        ],
        examesLaboratoriais: [
          'TSH, hemograma, glicemia, função renal e hepática',
          'Vitamina B12, folato (idosos)',
          'Exame toxicológico se suspeita de uso de substâncias'
        ],
        citations: [{ refId: 'dsm-5' }]
      },
      tratamento: {
        objetivos: [
          'Remissão dos sintomas',
          'Recuperação funcional',
          'Prevenção de recaídas e recorrências',
          'Melhora da qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Psicoterapia: TCC (12-20 sessões) ou terapia interpessoal',
            'Ativação comportamental',
            'Exercício físico: 30-45 min, 3-5x/semana',
            'Higiene do sono',
            'Grupos de apoio',
            'Mindfulness'
          ],
          citations: [{ refId: 'nice-depression-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'ISRS',
              medicamentos: ['Fluoxetina 20-60mg/dia', 'Sertralina 50-200mg/dia', 'Escitalopram 10-20mg/dia'],
              posologia: '1x/dia, pela manhã',
              observacoes: 'Iniciar dose baixa, aumentar a cada 2 semanas. Efeito em 2-4 semanas'
            }
          ],
          segundaLinha: [
            {
              classe: 'ISRSN',
              medicamentos: ['Venlafaxina 75-225mg/dia', 'Duloxetina 60-120mg/dia'],
              observacoes: 'Se dor crônica associada ou falha de ISRS'
            },
            {
              classe: 'Tricíclico',
              medicamentos: ['Amitriptilina 25-150mg/dia', 'Nortriptilina 25-150mg/dia'],
              observacoes: 'Menor custo. Mais efeitos adversos. ECG prévio se >40 anos'
            },
            {
              classe: 'Outros',
              medicamentos: ['Bupropiona 150-300mg/dia', 'Mirtazapina 15-45mg/dia'],
              observacoes: 'Bupropiona: cessação tabágica. Mirtazapina: insônia, inapetência'
            }
          ],
          situacoesEspeciais: [
            { situacao: 'Gestação', conduta: 'Sertralina mais seguro. Evitar paroxetina no 1º trimestre' },
            { situacao: 'Idoso', conduta: 'Iniciar com doses mais baixas. Preferir ISRS' },
            { situacao: 'Bipolaridade', conduta: 'Antidepressivo + estabilizador de humor. Encaminhar psiquiatria' }
          ],
          citations: [{ refId: 'nice-depression-2022' }]
        },
        duracao: 'Mínimo 6-12 meses após remissão. Manutenção indefinida se ≥3 episódios ou fatores de risco'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal/quinzenal inicial, depois mensal, trimestral quando estável',
        examesControle: [
          'PHQ-9 a cada consulta',
          'Avaliação de efeitos adversos',
          'Avaliação de risco suicida',
          'ECG se tricíclico em >40 anos'
        ],
        metasTerapeuticas: [
          'PHQ-9 <5 (remissão)',
          'Retorno ao trabalho/atividades',
          'Sono e apetite normalizados',
          'Ausência de ideação suicida'
        ],
        criteriosEncaminhamento: [
          'Risco suicida alto',
          'Sintomas psicóticos',
          'Suspeita de bipolaridade',
          'Refratariedade (falha a 2+ antidepressivos)',
          'Necessidade de ECT',
          'Comorbidade psiquiátrica grave'
        ],
        citations: [{ refId: 'nice-depression-2022' }]
      }
    },
    protocolos: ['protocolo-depressao'],
    medicamentos: ['fluoxetina', 'sertralina', 'amitriptilina', 'escitalopram'],
    calculadoras: ['phq9', 'phq2'],
    citations: [{ refId: 'dsm-5' }, { refId: 'nice-depression-2022' }],
    lastUpdate: '2024-12',
    tags: ['saude_mental', 'cronica', 'prevalente']
  },

  // ==========================================================================
  // RESPIRATÓRIO
  // ==========================================================================
  {
    id: 'asma',
    titulo: 'Asma Brônquica',
    sinonimos: ['Asma', 'Bronquite asmática', 'Hiperreatividade brônquica'],
    doid: 'DOID:2841',
    snomedCT: '195967001',
    meshId: 'D001249',
    umlsCui: 'C0004096',
    ciap2: ['R96'],
    cid10: ['J45', 'J46'],
    categoria: 'respiratorio',
    quickView: {
      definicao: 'Doença inflamatória crônica das vias aéreas caracterizada por hiperresponsividade brônquica e obstrução variável ao fluxo aéreo, manifestando-se por episódios recorrentes de sibilância, dispneia, opressão torácica e tosse.',
      criteriosDiagnosticos: [
        'Sintomas variáveis (sibilos, dispneia, tosse, opressão torácica)',
        'Piora noturna/matinal, com exercício, alérgenos, infecções',
        'Espirometria: VEF1/CVF <0,7 + melhora ≥12% e 200ml pós-BD',
        'PFE: variabilidade >10% em adultos',
        'Se espirometria normal: teste de broncoprovocação positivo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Afastamento de alérgenos (ácaros, mofo, pelos de animais)',
          'Controle ambiental (encapar colchões, lavar roupas de cama)',
          'Cessação do tabagismo (próprio e passivo)',
          'Evitar AINEs e betabloqueadores se hipersensibilidade',
          'Vacinação (influenza anual, pneumococo)',
          'Plano de ação por escrito'
        ],
        farmacologico: [
          'Etapa 1-2: CI dose baixa-média (Beclometasona 200-400mcg) + SABA se necessário',
          'Etapa 3: CI dose média + LABA (Formoterol) ou LAMA',
          'Etapa 4-5: CI dose alta + LABA, considerar anti-IgE/IL-5',
          'Resgate: Formoterol-CI (preferido) ou SABA (Salbutamol)',
          'Exacerbação: Prednisona 40-60mg/dia 5-7 dias'
        ]
      },
      metasTerapeuticas: [
        'Controle de sintomas: ACT ≥20, sem limitação de atividades',
        'Reduzir risco de exacerbações',
        'Minimizar uso de SABA (<2x/mês para sintomas)',
        'Função pulmonar normal ou próxima do normal',
        'Minimizar efeitos adversos do tratamento'
      ],
      examesIniciais: [
        'Espirometria com prova broncodilatadora',
        'Peak Flow (PFE) para monitorização domiciliar',
        'Hemograma (eosinofilia sugere asma alérgica)',
        'IgE total',
        'Radiografia de tórax (na avaliação inicial)'
      ],
      redFlags: [
        'Exacerbação grave: fala entrecortada, FR >30, FC >120, SpO2 <90%',
        'Uso de musculatura acessória, cianose',
        'PFE <50% do previsto ou melhor pessoal',
        'Falta de resposta ao broncodilatador',
        'História de intubação por asma',
        'Pneumotórax'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-15% em crianças, 5-10% em adultos no Brasil',
        mortalidade: '~2.500 mortes/ano no Brasil (maioria evitável)',
        faixaEtaria: 'Início frequente na infância, pode iniciar em qualquer idade',
        fatoresRisco: [
          'Atopia (rinite, eczema)',
          'História familiar de asma',
          'Exposição a alérgenos (ácaros, mofo, pelos)',
          'Infecções respiratórias na infância',
          'Tabagismo passivo',
          'Poluição ambiental',
          'Obesidade'
        ],
        citations: [{ refId: 'gina-2024' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Sibilância (chiado no peito)',
          'Dispneia episódica',
          'Tosse, especialmente noturna/matinal',
          'Opressão torácica',
          'Sintomas variáveis no tempo e intensidade',
          'Piora com infecções, exercício, alérgenos, mudanças climáticas'
        ],
        sinaisExameFisico: [
          'Sibilos expiratórios difusos na crise',
          'Fase expiratória prolongada',
          'Uso de musculatura acessória (crise grave)',
          'Intercrises: exame frequentemente normal',
          'Rinite alérgica associada'
        ],
        formasClinicas: [
          'Asma alérgica (mais comum)',
          'Asma não alérgica',
          'Asma de início tardio',
          'Asma com limitação fixa ao fluxo aéreo',
          'Asma com obesidade'
        ],
        citations: [{ refId: 'gina-2024' }]
      },
      diagnostico: {
        criterios: [
          'História de sintomas respiratórios variáveis',
          'Limitação variável ao fluxo expiratório (espirometria)',
          'Resposta ao broncodilatador (≥12% e 200ml no VEF1)',
          'Ou variabilidade do PFE >10%',
          'Ou teste de broncoprovocação positivo'
        ],
        diagnosticoDiferencial: [
          'DPOC',
          'Disfunção de cordas vocais',
          'Insuficiência cardíaca',
          'Bronquiectasias',
          'Corpo estranho',
          'DRGE com tosse'
        ],
        citations: [{ refId: 'gina-2024' }]
      },
      tratamento: {
        objetivos: [
          'Controle dos sintomas',
          'Prevenção de exacerbações',
          'Manutenção da função pulmonar normal',
          'Minimizar efeitos adversos'
        ],
        naoFarmacologico: {
          medidas: [
            'Educação em asma e plano de ação',
            'Técnica inalatória correta',
            'Controle ambiental',
            'Cessação do tabagismo',
            'Atividade física regular',
            'Controle do peso',
            'Vacinação'
          ],
          citations: [{ refId: 'gina-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'CI dose baixa',
              medicamentos: ['Beclometasona 200-400mcg/dia', 'Budesonida 200-400mcg/dia'],
              observacoes: 'Base do tratamento. Etapas 1-2'
            },
            {
              classe: 'CI + Formoterol',
              medicamentos: ['Budesonida/Formoterol 200-400/6-12mcg'],
              observacoes: 'Manutenção e resgate (MART). Preferido pelo GINA'
            }
          ],
          segundaLinha: [
            {
              classe: 'CI dose média-alta + LABA',
              medicamentos: ['Budesonida/Formoterol 400-800/12-24mcg'],
              observacoes: 'Etapas 3-4'
            },
            {
              classe: 'LAMA',
              medicamentos: ['Tiotrópio 5mcg (Respimat)'],
              observacoes: 'Adicional em etapa 4-5'
            }
          ],
          situacoesEspeciais: [
            { situacao: 'Exacerbação', conduta: 'SABA + corticoide oral (prednisona 40-60mg 5-7 dias)' },
            { situacao: 'Gestação', conduta: 'Manter tratamento. CI seguros. Controle é prioridade' },
            { situacao: 'Asma grave', conduta: 'Encaminhar. Imunobiológicos (anti-IgE, anti-IL5)' }
          ],
          citations: [{ refId: 'gina-2024' }]
        },
        duracao: 'Tratamento contínuo. Step down após 3 meses de controle'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 1-3 meses até controle, depois a cada 3-6 meses',
        examesControle: [
          'Espirometria anual',
          'ACT (Asthma Control Test) a cada consulta',
          'PFE domiciliar'
        ],
        metasTerapeuticas: [
          'ACT ≥20',
          'Sem exacerbações',
          'SABA <2x/mês',
          'VEF1 normal ou próximo'
        ],
        criteriosEncaminhamento: [
          'Asma de difícil controle (etapa 4-5)',
          'Exacerbação grave/quase fatal',
          'Dúvida diagnóstica',
          'Suspeita de asma ocupacional',
          'Necessidade de imunobiológico'
        ],
        citations: [{ refId: 'gina-2024' }]
      }
    },
    protocolos: ['protocolo-asma', 'crise-asma'],
    medicamentos: ['beclometasona', 'budesonida', 'salbutamol', 'formoterol'],
    calculadoras: [],
    citations: [{ refId: 'gina-2024' }],
    lastUpdate: '2024-12',
    tags: ['respiratorio', 'cronica', 'prevalente']
  },

  // ==========================================================================
  // INFECCIOSAS
  // ==========================================================================
  {
    id: 'infeccao-urinaria',
    titulo: 'Infecção do Trato Urinário (ITU)',
    sinonimos: ['Cistite', 'ITU', 'Infecção urinária'],
    doid: 'DOID:13148',
    snomedCT: '68566005',
    meshId: 'D014552',
    umlsCui: 'C0042029',
    ciap2: ['U71'],
    cid10: ['N30', 'N39.0'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Infecção bacteriana do trato urinário, mais comumente cistite (infecção baixa) em mulheres. ITU não complicada ocorre em mulheres saudáveis, não grávidas, com anatomia urinária normal.',
      criteriosDiagnosticos: [
        'Sintomas típicos: disúria, polaciúria, urgência miccional',
        'Dor suprapúbica',
        'EAS: leucocitúria, nitrito positivo, bacteriúria',
        'Urocultura se ITU complicada, recorrente, falha terapêutica, gestante',
        'Diagnóstico pode ser clínico em ITU não complicada'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratação abundante',
          'Micção pós-coito (prevenção)',
          'Evitar espermicidas',
          'Higiene adequada (não usar duchas)',
          'Tratar constipação se associada'
        ],
        farmacologico: [
          'Nitrofurantoína 100mg 6/6h por 5-7 dias (1ª escolha)',
          'Fosfomicina 3g dose única (boa adesão, 2ª escolha)',
          'Sulfametoxazol-TMP 800/160mg 12/12h por 3 dias (se sensibilidade local)',
          'Evitar fluoroquinolonas em ITU não complicada'
        ]
      },
      metasTerapeuticas: [
        'Resolução dos sintomas em 48-72h',
        'Esterilização da urina',
        'Prevenção de recorrências'
      ],
      examesIniciais: [
        'EAS (exame de urina tipo 1)',
        'Urocultura + antibiograma se: ITU complicada, recorrente, gestante, falha terapêutica',
        'Creatinina se suspeita de pielonefrite'
      ],
      redFlags: [
        'Febre >38°C, calafrios (sugere pielonefrite)',
        'Dor lombar (Giordano positivo)',
        'Náuseas/vômitos',
        'Gestante (risco de complicações)',
        'Imunossupressão, DM descompensado',
        'ITU em homem (sempre investigar)',
        'Sepse'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '50-60% das mulheres terão ITU na vida',
        incidencia: '25-30% recorrência em 6 meses após primeiro episódio',
        faixaEtaria: 'Pico em mulheres jovens sexualmente ativas e idosas',
        fatoresRisco: [
          'Sexo feminino (uretra curta)',
          'Atividade sexual',
          'Uso de espermicida/diafragma',
          'Menopausa (atrofia urogenital)',
          'História prévia de ITU',
          'DM',
          'Cateterismo vesical',
          'Anomalias urológicas'
        ],
        citations: [{ refId: 'idsa-itu-2011' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Disúria (dor/ardência ao urinar)',
          'Polaciúria (micções frequentes)',
          'Urgência miccional',
          'Dor suprapúbica',
          'Hematúria (pode ocorrer)',
          'Urina turva ou fétida'
        ],
        sinaisExameFisico: [
          'Geralmente exame físico normal na cistite',
          'Dor à palpação suprapúbica',
          'Ausência de febre (cistite)',
          'Se febre + Giordano +: pielonefrite'
        ],
        formasClinicas: [
          'Cistite (infecção baixa)',
          'Pielonefrite (infecção alta)',
          'Bacteriúria assintomática',
          'ITU recorrente (≥3/ano ou ≥2/6 meses)'
        ],
        citations: [{ refId: 'idsa-itu-2011' }]
      },
      diagnostico: {
        criterios: [
          'Clínico em ITU não complicada (sintomas típicos)',
          'EAS: leucocitúria (>10 leucócitos/campo), nitrito +',
          'Urocultura: >10⁵ UFC/mL (ou >10² se sintomática)'
        ],
        diagnosticoDiferencial: [
          'Vaginite/vulvovaginite',
          'Uretrite (IST)',
          'Bexiga hiperativa',
          'Cistite intersticial',
          'Nefrolitíase'
        ],
        citations: [{ refId: 'idsa-itu-2011' }]
      },
      tratamento: {
        objetivos: [
          'Erradicar infecção',
          'Aliviar sintomas',
          'Prevenir complicações',
          'Prevenir recorrências'
        ],
        naoFarmacologico: {
          medidas: [
            'Hidratação abundante',
            'Micção pós-coito',
            'Evitar retenção urinária',
            'Tratar constipação'
          ],
          citations: [{ refId: 'idsa-itu-2011' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Nitrofurantoína',
              medicamentos: ['Nitrofurantoína 100mg 6/6h por 5-7 dias'],
              observacoes: '1ª escolha. Evitar se TFG <30'
            },
            {
              classe: 'Fosfomicina',
              medicamentos: ['Fosfomicina trometamol 3g dose única'],
              observacoes: 'Boa adesão. Mais cara'
            }
          ],
          segundaLinha: [
            {
              classe: 'Sulfametoxazol-TMP',
              medicamentos: ['SMX-TMP 800/160mg 12/12h por 3 dias'],
              observacoes: 'Se sensibilidade local >80%. Evitar no 3º trimestre'
            }
          ],
          situacoesEspeciais: [
            { situacao: 'Gestante', conduta: 'Nitrofurantoína (não no 3º tri), Cefalexina, Amoxicilina. Tratar bacteriúria assintomática' },
            { situacao: 'Pielonefrite', conduta: 'Fluoroquinolona ou Ceftriaxona. 7-14 dias. Considerar internação' },
            { situacao: 'ITU recorrente', conduta: 'Profilaxia: Nitrofurantoína 50-100mg/noite ou pós-coito' }
          ],
          citations: [{ refId: 'idsa-itu-2011' }]
        },
        duracao: 'Cistite: 3-7 dias. Pielonefrite: 7-14 dias'
      },
      acompanhamento: {
        frequenciaConsultas: 'Reavaliação em 48-72h se não melhora',
        metasTerapeuticas: [
          'Resolução dos sintomas',
          'Urocultura de controle não indicada de rotina'
        ],
        criteriosEncaminhamento: [
          'Pielonefrite grave (sepse, vômitos, gestante)',
          'ITU recorrente sem causa identificada',
          'Suspeita de alteração anatômica',
          'ITU em homem (urologia)'
        ],
        citations: [{ refId: 'idsa-itu-2011' }]
      }
    },
    protocolos: ['protocolo-itu'],
    medicamentos: ['nitrofurantoina', 'fosfomicina', 'sulfametoxazol-tmp'],
    calculadoras: [],
    citations: [{ refId: 'idsa-itu-2011' }],
    lastUpdate: '2024-12',
    tags: ['infecciosas', 'aguda', 'prevalente']
  },

  // ==========================================================================
  // MUSCULOESQUELÉTICO
  // ==========================================================================
  {
    id: 'lombalgia',
    titulo: 'Lombalgia',
    sinonimos: ['Dor lombar', 'Dor nas costas', 'Lumbago'],
    doid: 'DOID:0060167',
    snomedCT: '279039007',
    meshId: 'D017116',
    umlsCui: 'C0024031',
    ciap2: ['L03', 'L84', 'L86'],
    cid10: ['M54.5', 'M54.4'],
    categoria: 'musculoesqueletico',
    quickView: {
      definicao: 'Dor localizada na região lombar (entre o último arco costal e as pregas glúteas), podendo ou não irradiar para membros inferiores. É a principal causa de incapacidade no mundo.',
      criteriosDiagnosticos: [
        'Dor na região lombar com ou sem irradiação',
        'Classificar: inespecífica (>90%), com irradiação radicular, ou específica',
        'Duração: aguda (<6 semanas), subaguda (6-12 sem), crônica (>12 sem)',
        'Excluir red flags (fratura, infecção, tumor, síndrome de cauda equina)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Educação: tranquilizar, prognóstico geralmente bom',
          'Manter atividades habituais (evitar repouso prolongado)',
          'Calor local',
          'Exercícios de fortalecimento e alongamento',
          'Fisioterapia se persistência >4 semanas'
        ],
        farmacologico: [
          'Paracetamol 500-1000mg 6/6h (1ª linha se tolerado)',
          'AINE: Ibuprofeno 400-600mg 8/8h ou Diclofenaco 50mg 8/8h (ciclo curto)',
          'Relaxante muscular: Ciclobenzaprina 5-10mg à noite (espasmo associado)',
          'Opioide fraco: Tramadol 50-100mg 6/6h (dor intensa, curto prazo)'
        ]
      },
      metasTerapeuticas: [
        'Alívio da dor',
        'Retorno às atividades habituais',
        'Prevenção de cronificação',
        'Evitar uso prolongado de medicamentos'
      ],
      examesIniciais: [
        'Exames de imagem NÃO indicados de rotina na lombalgia inespecífica',
        'Solicitar RX/RM se red flags ou persistência >6 semanas sem melhora'
      ],
      redFlags: [
        'Trauma significativo',
        'Idade <20 ou >55 anos com primeiro episódio',
        'Dor noturna que acorda, dor em repouso',
        'Perda de peso inexplicada',
        'História de câncer, imunossupressão, uso de corticoides',
        'Síndrome de cauda equina (anestesia em sela, incontinência, fraqueza MMII)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '60-80% terão lombalgia na vida',
        incidencia: 'Principal causa de incapacidade laboral',
        faixaEtaria: 'Pico 35-55 anos',
        fatoresRisco: [
          'Trabalho braçal pesado',
          'Posturas inadequadas',
          'Sedentarismo',
          'Obesidade',
          'Tabagismo',
          'Fatores psicossociais (estresse, insatisfação laboral)',
          'Depressão, ansiedade'
        ],
        citations: [{ refId: 'lancet-lombalgia-2018' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor lombar localizada',
          'Piora com movimento, melhora com repouso (mecânica)',
          'Rigidez matinal breve (<30 min)',
          'Irradiação para nádega ou coxa (sem dermátomo)',
          'Se radiculopatia: dor irradiada para MMII em dermátomo'
        ],
        sinaisExameFisico: [
          'Limitação de amplitude de movimento lombar',
          'Contratura muscular paravertebral',
          'Lasègue positivo se radiculopatia',
          'Exame neurológico normal na lombalgia inespecífica',
          'Avaliar força, sensibilidade, reflexos em MMII'
        ],
        formasClinicas: [
          'Lombalgia mecânica/inespecífica (>90%)',
          'Lombalgia com radiculopatia (hérnia de disco)',
          'Lombalgia específica (fratura, tumor, infecção, espondiloartrite)'
        ],
        citations: [{ refId: 'lancet-lombalgia-2018' }]
      },
      diagnostico: {
        criterios: [
          'Diagnóstico clínico',
          'Classificar por duração e presença de red flags',
          'Exames de imagem apenas se red flags ou refratariedade'
        ],
        diagnosticoDiferencial: [
          'Hérnia de disco com radiculopatia',
          'Estenose de canal',
          'Espondilolistese',
          'Espondilite anquilosante',
          'Fratura vertebral',
          'Metástase óssea',
          'Infecção (discite, abscesso)'
        ],
        citations: [{ refId: 'lancet-lombalgia-2018' }]
      },
      tratamento: {
        objetivos: [
          'Alívio da dor',
          'Manutenção da função',
          'Prevenção de cronificação',
          'Retorno ao trabalho'
        ],
        naoFarmacologico: {
          medidas: [
            'Educação e reasseguramento',
            'Manter atividade física',
            'Exercícios supervisionados',
            'Calor superficial',
            'Terapia cognitivo-comportamental se cronicidade'
          ],
          citations: [{ refId: 'lancet-lombalgia-2018' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Analgésico simples',
              medicamentos: ['Paracetamol 500-1000mg 6/6h'],
              observacoes: 'Eficácia limitada, mas seguro'
            },
            {
              classe: 'AINE',
              medicamentos: ['Ibuprofeno 400-600mg 8/8h', 'Naproxeno 250-500mg 12/12h'],
              observacoes: 'Eficaz. Uso curto (7-14 dias). Atenção a riscos GI/CV/renal'
            }
          ],
          segundaLinha: [
            {
              classe: 'Relaxante muscular',
              medicamentos: ['Ciclobenzaprina 5-10mg à noite'],
              observacoes: 'Se espasmo muscular. Curto prazo. Sonolência'
            }
          ],
          situacoesEspeciais: [
            { situacao: 'Dor crônica', conduta: 'Abordagem multimodal. Considerar duloxetina, amitriptilina. Encaminhar' },
            { situacao: 'Radiculopatia', conduta: 'AINE + fisioterapia. Se refratário, encaminhar para avaliação cirúrgica' }
          ],
          citations: [{ refId: 'lancet-lombalgia-2018' }]
        },
        duracao: 'Maioria resolve em 4-6 semanas'
      },
      acompanhamento: {
        frequenciaConsultas: 'Reavaliação em 2-4 semanas se não melhora',
        metasTerapeuticas: [
          'Resolução da dor',
          'Retorno às atividades',
          'Sem uso crônico de medicamentos'
        ],
        criteriosEncaminhamento: [
          'Red flags (urgente)',
          'Déficit neurológico progressivo',
          'Dor refratária >6 semanas',
          'Síndrome de cauda equina (emergência)',
          'Necessidade de fisioterapia especializada'
        ],
        citations: [{ refId: 'lancet-lombalgia-2018' }]
      }
    },
    protocolos: [],
    medicamentos: ['paracetamol', 'ibuprofeno', 'ciclobenzaprina'],
    calculadoras: [],
    citations: [{ refId: 'lancet-lombalgia-2018' }],
    lastUpdate: '2024-12',
    tags: ['musculoesqueletico', 'aguda', 'cronica', 'prevalente']
  }
];

// =============================================================================
// FUNÇÕES AUXILIARES
// =============================================================================

export { groupByCategoria as getDoencasByCategoria };

export function getDoencaById(id: string): Doenca | undefined {
  return doencas.find(d => d.id === id);
}

export function searchDoencas(termo: string): Doenca[] {
  const termoLower = termo.toLowerCase();
  return doencas.filter(d =>
    d.titulo.toLowerCase().includes(termoLower) ||
    d.sinonimos?.some(s => s.toLowerCase().includes(termoLower)) ||
    d.ciap2.some(c => c.toLowerCase().includes(termoLower)) ||
    d.cid10.some(c => c.toLowerCase().includes(termoLower)) ||
    d.tags?.some(t => t.toLowerCase().includes(termoLower))
  );
}

export function getDoencasPorCategoria(categoria: string): Doenca[] {
  return doencas.filter(d => d.categoria === categoria);
}

