/**
 * Expansão: Doenças Raras - Parte 3
 * 32 doenças raras (imunodeficiências, doenças hematológicas raras, outras)
 * Darwin-MFC v1.6.0
 */

import type { Doenca } from '@/lib/types/doenca';

export const doencasRarasParte3: Partial<Doenca>[] = [
  // ============================================
  // IMUNODEFICIÊNCIAS PRIMÁRIAS (8)
  // ============================================
  {
    id: 'imunodeficiencia-comum-variavel',
    titulo: 'Imunodeficiência Comum Variável',
    sinonimos: ['IDCV', 'CVID'],
    doid: 'DOID:12177',
    snomedCT: '234532001',
    ordo: ['ORPHA:1572'],
    ciap2: ['B99'],
    cid10: ['D83.0'],
    categoria: 'hematologico',
    subcategoria: 'imunodeficiencia',
    quickView: {
      definicao: 'Imunodeficiência primária mais comum sintomática em adultos, caracterizada por hipogamaglobulinemia e infecções recorrentes.',
      criteriosDiagnosticos: [
        'IgG baixa (2 DP abaixo da média para idade)',
        'IgA e/ou IgM baixas',
        'Idade >4 anos ao diagnóstico',
        'Exclusão de outras causas de hipogamaglobulinemia',
        'Resposta vacinal prejudicada'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Vigilância para autoimunidade e malignidade'],
        farmacologico: ['Imunoglobulina IV ou SC de reposição']
      },
      redFlags: ['Infecções graves/invasivas', 'Doença pulmonar intersticial', 'Esplenomegalia', 'Linfoma']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:25.000-50.000',
        faixaEtaria: 'Diagnóstico tipicamente 20-40 anos',
        fatoresRisco: ['Multifatorial', 'Alguns casos familiares'],
        citations: [{ refId: 'cvid-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Sinusites/otites recorrentes', 'Pneumonias de repetição', 'Diarreia crônica', 'Citopenias autoimunes'],
        sinaisExameFisico: ['Bronquiectasias', 'Esplenomegalia', 'Linfadenopatia'],
        formasClinicas: ['Infecciosa pura', 'Com autoimunidade', 'Com doença granulomatosa', 'Com linfoproliferação'],
        citations: [{ refId: 'cvid-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Critérios ESID/PAGID 2014'],
        diagnosticoDiferencial: ['Agamaglobulinemia', 'Deficiência de subclasses', 'Hipogama secundária (mieloma, LLC)'],
        examesLaboratoriais: ['Dosagem de IgG, IgA, IgM', 'Resposta a vacinas', 'Linfócitos B (CD19/CD20)'],
        examesImagem: ['TC tórax (bronquiectasias, DPI)', 'USG abdominal'],
        citations: [{ refId: 'cvid-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Prevenir infecções', 'Tratar complicações autoimunes', 'Manter IgG trough >700 mg/dL'],
        naoFarmacologico: {
          medidas: ['Vacinação (exceto vivas)', 'Profilaxia com azitromicina em bronquiectasias'],
          citations: [{ refId: 'cvid-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Imunoglobulina', medicamentos: ['IgIV 400-600 mg/kg a cada 3-4 semanas', 'IgSC semanal'] }
          ],
          citations: [{ refId: 'cvid-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: ['IgG trough', 'Função pulmonar', 'TC tórax periódica', 'Hemograma'],
        metasTerapeuticas: ['IgG >700 mg/dL', 'Redução de infecções'],
        criteriosEncaminhamento: ['Imunologia', 'Pneumologia', 'Hematologia'],
        citations: [{ refId: 'cvid-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-idp-ms'],
    medicamentos: ['imunoglobulina-humana'],
    calculadoras: [],
    citations: [{ refId: 'cvid-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'imunodeficiencia', 'hipogamaglobulinemia', 'igiv']
  },
  {
    id: 'agamaglobulinemia-ligada-x',
    titulo: 'Agamaglobulinemia Ligada ao X',
    sinonimos: ['XLA', 'Doença de Bruton'],
    doid: 'DOID:0060169',
    snomedCT: '65880007',
    ordo: ['ORPHA:47'],
    ciap2: ['B99'],
    cid10: ['D80.0'],
    categoria: 'hematologico',
    subcategoria: 'imunodeficiencia',
    quickView: {
      definicao: 'Imunodeficiência primária ligada ao X por mutação em BTK, com ausência de linfócitos B e agamaglobulinemia.',
      criteriosDiagnosticos: [
        'Menino com infecções bacterianas recorrentes após 6 meses',
        'IgG, IgA, IgM muito baixas ou indetectáveis',
        'Linfócitos B CD19+ <2%',
        'Mutação em BTK'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar vacinas vivas'],
        farmacologico: ['Imunoglobulina IV ou SC vitalícia']
      },
      redFlags: ['Meningoencefalite por enterovírus', 'Artrite séptica', 'Bronquiectasias']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:200.000 nascidos vivos masculinos',
        faixaEtaria: 'Diagnóstico 6 meses a 2 anos',
        fatoresRisco: ['Herança ligada ao X'],
        citations: [{ refId: 'xla-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Otite média', 'Pneumonia', 'Sinusite', 'Diarreia por Giardia'],
        sinaisExameFisico: ['Ausência de tonsilas/linfonodos', 'Bronquiectasias (tardio)'],
        formasClinicas: ['Clássica', 'Hipomórfica (residual BTK)'],
        citations: [{ refId: 'xla-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Linfócitos B <2%', 'Todas as Ig muito baixas', 'Mutação BTK confirma'],
        diagnosticoDiferencial: ['AR agamaglobulinemia', 'Hipogama transitória', 'IDCV precoce'],
        examesLaboratoriais: ['Imunoglobulinas', 'CD19/CD20', 'Análise de BTK'],
        examesImagem: ['RX tórax', 'TC seios da face'],
        citations: [{ refId: 'xla-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Prevenir infecções', 'IgG trough >800 mg/dL'],
        naoFarmacologico: {
          medidas: ['Não vacinar com vacinas vivas', 'Cuidado com enterovírus'],
          citations: [{ refId: 'xla-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Imunoglobulina', medicamentos: ['IgIV 400-600 mg/kg a cada 3-4 semanas'] }
          ],
          citations: [{ refId: 'xla-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: ['IgG trough', 'TC tórax periódica', 'Função pulmonar'],
        metasTerapeuticas: ['Ausência de infecções graves'],
        criteriosEncaminhamento: ['Imunologia pediátrica', 'Pneumologia'],
        citations: [{ refId: 'xla-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-idp-ms'],
    medicamentos: ['imunoglobulina-humana'],
    calculadoras: [],
    citations: [{ refId: 'xla-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'imunodeficiencia', 'btk', 'ligada-x']
  },
  {
    id: 'imunodeficiencia-combinada-grave',
    titulo: 'Imunodeficiência Combinada Grave',
    sinonimos: ['SCID', 'Menino da bolha'],
    doid: 'DOID:627',
    snomedCT: '31323000',
    ordo: ['ORPHA:183660'],
    ciap2: ['B99'],
    cid10: ['D81.0', 'D81.1', 'D81.2'],
    categoria: 'hematologico',
    subcategoria: 'imunodeficiencia',
    quickView: {
      definicao: 'Emergência pediátrica por defeito grave de linfócitos T (±B/NK), com infecções oportunistas fatais se não tratada.',
      criteriosDiagnosticos: [
        'Linfócitos T CD3+ <300/μL ou <20% (neonato)',
        'Infecções graves/oportunistas nos primeiros meses',
        'Falha de crescimento',
        'Diarreia crônica',
        'Ausência de timo no RX'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['TCTH (curativo)', 'Terapia gênica (formas específicas)', 'Isolamento protetor'],
        farmacologico: ['Profilaxias antimicrobianas', 'IgIV']
      },
      redFlags: ['Pneumocystis jirovecii', 'BCGite disseminada', 'CMV disseminado', 'GVHD transfusional']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:50.000-100.000 nascidos vivos',
        faixaEtaria: 'Diagnóstico neonatal ou primeiros meses',
        fatoresRisco: ['AR ou ligada ao X (IL2RG)'],
        citations: [{ refId: 'scid-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Infecções recorrentes/graves', 'Diarreia persistente', 'Candidíase oral persistente', 'Pneumonia'],
        sinaisExameFisico: ['Ausência de linfonodos/tonsilas', 'Desnutrição', 'Rash (GVHD materno)'],
        formasClinicas: ['T-B+NK- (X-linked)', 'T-B-NK+ (RAG)', 'T-B-NK- (ADA)', 'Outras'],
        citations: [{ refId: 'scid-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['TREC baixo na triagem neonatal', 'Linfócitos T muito baixos', 'Confirmação molecular'],
        diagnosticoDiferencial: ['HIV perinatal', 'Síndrome de DiGeorge completa', 'Linfocitopenia idiopática de células T'],
        examesLaboratoriais: ['TREC', 'Subpopulações linfocitárias', 'Painel genético'],
        examesImagem: ['RX tórax (ausência de timo)'],
        citations: [{ refId: 'scid-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['TCTH precoce (curativo)', 'Prevenção de infecções até transplante'],
        naoFarmacologico: {
          medidas: ['TCTH de doador compatível', 'Terapia gênica (ADA-SCID, X-SCID)', 'Isolamento'],
          citations: [{ refId: 'scid-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Profilaxias', medicamentos: ['Sulfametoxazol-trimetoprim', 'Fluconazol', 'Aciclovir'] },
            { classe: 'Reposição', medicamentos: ['IgIV', 'PEG-ADA (ADA-SCID)'] }
          ],
          citations: [{ refId: 'scid-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Contínuo até TCTH, depois protocolo transplante',
        examesControle: ['Reconstituição imune pós-TCTH', 'TREC', 'Subpopulações'],
        metasTerapeuticas: ['Sobrevida', 'Reconstituição imune'],
        criteriosEncaminhamento: ['Centro de TCTH pediátrico', 'Imunologia'],
        citations: [{ refId: 'scid-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-scid-ms'],
    medicamentos: ['sulfametoxazol-trimetoprim', 'imunoglobulina-humana'],
    calculadoras: [],
    citations: [{ refId: 'scid-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'imunodeficiencia', 'tcth', 'triagem-neonatal', 'emergencia']
  },
  {
    id: 'sindrome-wiskott-aldrich',
    titulo: 'Síndrome de Wiskott-Aldrich',
    sinonimos: ['WAS'],
    doid: 'DOID:2916',
    snomedCT: '36070007',
    ordo: ['ORPHA:906'],
    ciap2: ['B99'],
    cid10: ['D82.0'],
    categoria: 'hematologico',
    subcategoria: 'imunodeficiencia',
    quickView: {
      definicao: 'Imunodeficiência ligada ao X caracterizada pela tríade: trombocitopenia com microplaquetas, eczema e infecções recorrentes.',
      criteriosDiagnosticos: [
        'Trombocitopenia com plaquetas pequenas (VPM <7 fL)',
        'Eczema',
        'Infecções bacterianas e virais recorrentes',
        'Mutação no gene WAS'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['TCTH (curativo)'],
        farmacologico: ['IgIV', 'Profilaxia antimicrobiana', 'Transfusões de plaquetas quando necessário']
      },
      redFlags: ['Hemorragia intracraniana', 'Infecções graves', 'Autoimunidade', 'Malignidade (linfoma)']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:100.000 nascidos vivos masculinos',
        faixaEtaria: 'Diagnóstico nos primeiros anos de vida',
        fatoresRisco: ['Herança ligada ao X'],
        citations: [{ refId: 'was-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Petéquias', 'Sangramento', 'Eczema grave', 'Infecções'],
        sinaisExameFisico: ['Eczema', 'Equimoses', 'Esplenomegalia'],
        formasClinicas: ['Clássica', 'XLT (trombocitopenia ligada ao X, mais leve)'],
        citations: [{ refId: 'was-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Trombocitopenia + microplaquetas + mutação WAS'],
        diagnosticoDiferencial: ['PTI', 'Síndrome de Wiskott-like'],
        examesLaboratoriais: ['Hemograma (plaquetopenia, VPM baixo)', 'Imunoglobulinas', 'Citometria para WASp'],
        examesImagem: [],
        citations: [{ refId: 'was-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['TCTH curativo', 'Prevenir sangramento e infecções'],
        naoFarmacologico: {
          medidas: ['TCTH alogênico', 'Terapia gênica (em desenvolvimento)', 'Esplenectomia (risco de sepse)'],
          citations: [{ refId: 'was-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Reposição', medicamentos: ['IgIV'] },
            { classe: 'Profilaxia', medicamentos: ['Sulfametoxazol-trimetoprim', 'Aciclovir'] }
          ],
          citations: [{ refId: 'was-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Frequente até TCTH',
        examesControle: ['Hemograma', 'Imunoglobulinas', 'Vigilância para autoimunidade/malignidade'],
        metasTerapeuticas: ['TCTH bem-sucedido'],
        criteriosEncaminhamento: ['Imunologia', 'Hematologia', 'Centro de TCTH'],
        citations: [{ refId: 'was-follow-up-2022' }]
      }
    },
    protocolos: [],
    medicamentos: ['imunoglobulina-humana'],
    calculadoras: [],
    citations: [{ refId: 'was-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'imunodeficiencia', 'trombocitopenia', 'eczema', 'tcth']
  },
  {
    id: 'angioedema-hereditario',
    titulo: 'Angioedema Hereditário',
    sinonimos: ['AEH', 'HAE', 'Deficiência de C1-INH'],
    doid: 'DOID:14735',
    snomedCT: '82966003',
    ordo: ['ORPHA:91378'],
    ciap2: ['A92'],
    cid10: ['D84.1'],
    categoria: 'hematologico',
    subcategoria: 'complemento',
    quickView: {
      definicao: 'Doença autossômica dominante por deficiência/disfunção de C1-inibidor, causando episódios de angioedema sem urticária.',
      criteriosDiagnosticos: [
        'Episódios recorrentes de angioedema (face, extremidades, genitália, abdome)',
        'Sem urticária associada',
        'C4 baixo (entre crises)',
        'C1-INH quantitativo ou funcional baixo',
        'História familiar (75%)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar gatilhos (trauma, estresse, estrogênio)'],
        farmacologico: ['Tratamento de crise: concentrado de C1-INH, icatibanto, ecallantide', 'Profilaxia: C1-INH, lanadelumabe, berotralstat']
      },
      redFlags: ['Edema de glote', 'Dor abdominal intensa', 'Edema de face/língua']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:50.000',
        faixaEtaria: 'Início tipicamente na 2ª década',
        fatoresRisco: ['Autossômica dominante', '25% mutações de novo'],
        citations: [{ refId: 'hae-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Edema facial', 'Edema de extremidades', 'Dor abdominal (edema intestinal)', 'Edema laríngeo'],
        sinaisExameFisico: ['Edema não-pruriginoso, não-eritematoso', 'Sem urticária'],
        formasClinicas: ['Tipo I (85%, C1-INH baixo)', 'Tipo II (15%, C1-INH disfuncional)', 'HAE com C1-INH normal (raro)'],
        citations: [{ refId: 'hae-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['C4 baixo + C1-INH baixo ou disfuncional'],
        diagnosticoDiferencial: ['Angioedema por IECA', 'Angioedema alérgico', 'Angioedema idiopático'],
        examesLaboratoriais: ['C4', 'C1-INH quantitativo', 'C1-INH funcional', 'C1q (normal no HAE, baixo no adquirido)'],
        examesImagem: ['USG/TC abdome em crises abdominais'],
        citations: [{ refId: 'hae-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Tratar crises rapidamente', 'Prevenir crises', 'Evitar intubação/traqueostomia'],
        naoFarmacologico: {
          medidas: ['Evitar estrogênios', 'Plano de ação para emergências'],
          citations: [{ refId: 'hae-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Crise', medicamentos: ['C1-INH concentrado IV', 'Icatibanto SC', 'Ecallantide SC'] }
          ],
          segundaLinha: [
            { classe: 'Profilaxia de longo prazo', medicamentos: ['Lanadelumabe SC', 'Berotralstat VO', 'C1-INH SC'] }
          ],
          citations: [{ refId: 'hae-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: ['Frequência de crises', 'Qualidade de vida (AE-QoL)'],
        metasTerapeuticas: ['Zero crises ou mínimas'],
        criteriosEncaminhamento: ['Imunologia/Alergologia', 'Centro de referência HAE'],
        citations: [{ refId: 'hae-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-aeh-ms'],
    medicamentos: ['c1-inibidor', 'icatibanto', 'lanadelumabe', 'berotralstat'],
    calculadoras: [],
    citations: [{ refId: 'hae-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'complemento', 'angioedema', 'emergencia']
  },

  // ============================================
  // DOENÇAS HEMATOLÓGICAS RARAS (10)
  // ============================================
  {
    id: 'anemia-falciforme',
    titulo: 'Anemia Falciforme',
    sinonimos: ['Doença falciforme', 'Drepanocitose', 'HbSS'],
    doid: 'DOID:10923',
    snomedCT: '127040003',
    ordo: ['ORPHA:232'],
    ciap2: ['B78'],
    cid10: ['D57.1'],
    categoria: 'hematologico',
    subcategoria: 'hemoglobinopatia',
    quickView: {
      definicao: 'Hemoglobinopatia hereditária por HbS homozigota, causando polimerização de hemoglobina e vaso-oclusão com hemólise crônica.',
      criteriosDiagnosticos: [
        'Eletroforese com HbS >80% (sem HbA)',
        'Anemia hemolítica crônica',
        'Crises vaso-oclusivas dolorosas',
        'Dactilite (síndrome mão-pé em lactentes)',
        'Esplenomegalia inicial, depois asplenia funcional'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratação', 'Evitar gatilhos (frio, hipóxia)', 'Transfusão quando indicada'],
        farmacologico: ['Hidroxiureia', 'L-glutamina', 'Voxelotor', 'Crizanlizumabe']
      },
      redFlags: ['Síndrome torácica aguda', 'AVC', 'Priapismo', 'Sequestro esplênico', 'Crise aplástica']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Alta em afrodescendentes (1:500 nos EUA)',
        faixaEtaria: 'Diagnóstico neonatal (teste do pezinho)',
        fatoresRisco: ['Homozigose HbS', 'Ascendência africana, mediterrânea, indiana'],
        citations: [{ refId: 'scd-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Dor óssea/articular', 'Fadiga', 'Icterícia', 'Dispneia'],
        sinaisExameFisico: ['Palidez', 'Icterícia', 'Esplenomegalia (crianças)', 'Úlceras de perna'],
        formasClinicas: ['HbSS (mais grave)', 'HbSC', 'HbS-βtalassemia'],
        citations: [{ refId: 'scd-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Eletroforese de hemoglobina', 'Teste de falcização', 'HPLC'],
        diagnosticoDiferencial: ['Outras hemoglobinopatias', 'Talassemias', 'Anemia hemolítica autoimune'],
        examesLaboratoriais: ['Eletroforese Hb', 'Hemograma', 'Reticulócitos', 'LDH', 'Bilirrubinas'],
        examesImagem: ['Doppler transcraniano', 'RX tórax em STA'],
        citations: [{ refId: 'scd-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Prevenir crises', 'Prevenir complicações orgânicas', 'Aumentar HbF'],
        naoFarmacologico: {
          medidas: ['Transfusão crônica em alto risco de AVC', 'TCTH (curativo)', 'Terapia gênica'],
          citations: [{ refId: 'scd-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Indutor de HbF', medicamentos: ['Hidroxiureia 15-35 mg/kg/dia'] }
          ],
          segundaLinha: [
            { classe: 'Antiadesivo', medicamentos: ['Crizanlizumabe IV mensal'] },
            { classe: 'Modificador de Hb', medicamentos: ['Voxelotor'] },
            { classe: 'Antioxidante', medicamentos: ['L-glutamina'] }
          ],
          situacoesEspeciais: [
            { situacao: 'Crise dolorosa', conduta: 'Hidratação + opioides + AINEs' },
            { situacao: 'STA', conduta: 'Oxigênio + transfusão + antibiótico' }
          ],
          citations: [{ refId: 'scd-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: ['Hemograma', 'Ferritina', 'Doppler transcraniano anual (crianças)', 'Função renal'],
        metasTerapeuticas: ['HbF >20%', 'Redução de crises', 'Prevenção de AVC'],
        criteriosEncaminhamento: ['Hematologia', 'Neurologia (AVC)', 'Centro de TCTH'],
        citations: [{ refId: 'scd-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-falciforme-ms'],
    medicamentos: ['hidroxiureia', 'crizanlizumabe', 'voxelotor'],
    calculadoras: [],
    citations: [{ refId: 'scd-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'hemoglobinopatia', 'triagem-neonatal', 'vaso-oclusao']
  },
  {
    id: 'talassemia-major',
    titulo: 'Talassemia Major',
    sinonimos: ['β-talassemia major', 'Anemia de Cooley'],
    doid: 'DOID:10241',
    snomedCT: '65959000',
    ordo: ['ORPHA:848'],
    ciap2: ['B78'],
    cid10: ['D56.1'],
    categoria: 'hematologico',
    subcategoria: 'hemoglobinopatia',
    quickView: {
      definicao: 'Talassemia grave por homozigose ou dupla heterozigose de mutações em β-globina, com anemia grave dependente de transfusão.',
      criteriosDiagnosticos: [
        'Anemia microcítica grave (Hb <7 g/dL)',
        'Hepatoesplenomegalia',
        'Alterações ósseas (fácies talassêmica)',
        'Dependência transfusional desde 1º ano',
        'HbF elevada, HbA2 variável, ausência de HbA'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Transfusões regulares (manter Hb pré >9-10.5 g/dL)', 'TCTH (curativo)'],
        farmacologico: ['Quelação de ferro (desferroxamina, deferasirox, deferiprona)']
      },
      redFlags: ['Sobrecarga de ferro cardíaca', 'Insuficiência cardíaca', 'Hemocromatose']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Alta no Mediterrâneo, Oriente Médio, Sudeste Asiático',
        faixaEtaria: 'Diagnóstico no 1º ano de vida',
        fatoresRisco: ['Autossômica recessiva'],
        citations: [{ refId: 'thalassemia-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Palidez', 'Icterícia', 'Atraso de crescimento', 'Infecções'],
        sinaisExameFisico: ['Hepatoesplenomegalia', 'Fácies talassêmica', 'Deformidades ósseas'],
        formasClinicas: ['Major (dependente de transfusão)', 'Intermedia (não-dependente)', 'Minor (traço)'],
        citations: [{ refId: 'thalassemia-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Eletroforese de Hb + análise molecular de β-globina'],
        diagnosticoDiferencial: ['Anemia ferropriva grave', 'Outras talassemias', 'Anemia sideroblástica'],
        examesLaboratoriais: ['Hemograma', 'Eletroforese Hb', 'Ferritina', 'LIC por RM'],
        examesImagem: ['RM T2* cardíaca e hepática'],
        citations: [{ refId: 'thalassemia-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Manter Hb adequada', 'Prevenir sobrecarga de ferro', 'TCTH se possível'],
        naoFarmacologico: {
          medidas: ['Transfusão a cada 2-4 semanas', 'TCTH de doador compatível', 'Terapia gênica'],
          citations: [{ refId: 'thalassemia-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Quelante de ferro', medicamentos: ['Deferasirox 20-40 mg/kg/dia VO', 'Desferroxamina SC/IV', 'Deferiprona'] }
          ],
          segundaLinha: [
            { classe: 'Indutor de HbF', medicamentos: ['Hidroxiureia (em intermedia)'] }
          ],
          citations: [{ refId: 'thalassemia-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 2-4 semanas (transfusão)',
        examesControle: ['Ferritina mensal', 'LIC e T2* cardíaco anual', 'Função endócrina'],
        metasTerapeuticas: ['Ferritina <1000 ng/mL', 'T2* cardíaco >20 ms'],
        criteriosEncaminhamento: ['Hematologia', 'Cardiologia', 'Endocrinologia', 'Centro de TCTH'],
        citations: [{ refId: 'thalassemia-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-talassemia-ms'],
    medicamentos: ['deferasirox', 'desferroxamina', 'deferiprona'],
    calculadoras: [],
    citations: [{ refId: 'thalassemia-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'hemoglobinopatia', 'transfusao', 'quelacao']
  },
  {
    id: 'hemofilia-a',
    titulo: 'Hemofilia A',
    sinonimos: ['Deficiência de fator VIII'],
    doid: 'DOID:12134',
    snomedCT: '28293008',
    ordo: ['ORPHA:98878'],
    ciap2: ['B83'],
    cid10: ['D66'],
    categoria: 'hematologico',
    subcategoria: 'coagulopatia',
    quickView: {
      definicao: 'Coagulopatia hereditária ligada ao X por deficiência de fator VIII, causando sangramentos articulares e musculares.',
      criteriosDiagnosticos: [
        'Sangramentos em articulações (hemartroses)',
        'Sangramentos musculares',
        'Sangramento prolongado pós-trauma/cirurgia',
        'TTPa prolongado, TP normal',
        'Fator VIII <40%'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar trauma', 'Fisioterapia'],
        farmacologico: ['Fator VIII recombinante (profilaxia e demanda)', 'Emicizumabe (profilaxia)']
      },
      redFlags: ['Hemorragia intracraniana', 'Sangramento de psoas', 'Artropatia hemofílica', 'Inibidores']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:5.000 nascidos vivos masculinos',
        faixaEtaria: 'Diagnóstico no 1º ano (grave) ou tardio (leve)',
        fatoresRisco: ['Herança ligada ao X'],
        citations: [{ refId: 'hemophilia-a-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Hemartroses (joelhos, cotovelos, tornozelos)', 'Hematomas musculares', 'Sangramento pós-procedimentos'],
        sinaisExameFisico: ['Artropatia crônica', 'Deformidades articulares', 'Atrofia muscular'],
        formasClinicas: ['Grave (<1%)', 'Moderada (1-5%)', 'Leve (5-40%)'],
        citations: [{ refId: 'hemophilia-a-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Fator VIII <40%', 'TTPa prolongado corrigido com plasma normal'],
        diagnosticoDiferencial: ['Hemofilia B', 'Doença de von Willebrand', 'Deficiências raras'],
        examesLaboratoriais: ['TTPa, TP', 'Dosagem de FVIII', 'Pesquisa de inibidores'],
        examesImagem: ['USG/RM articular'],
        citations: [{ refId: 'hemophilia-a-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Prevenir sangramentos (profilaxia)', 'Tratar sangramentos agudos', 'Preservar articulações'],
        naoFarmacologico: {
          medidas: ['Fisioterapia', 'Terapia gênica (em desenvolvimento)'],
          citations: [{ refId: 'hemophilia-a-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Reposição de fator', medicamentos: ['Fator VIII recombinante (profilaxia 2-3x/semana)'] },
            { classe: 'Anticorpo biespecífico', medicamentos: ['Emicizumabe SC (semanal/quinzenal/mensal)'] }
          ],
          situacoesEspeciais: [
            { situacao: 'Com inibidor', conduta: 'Agentes de bypass (aPCC, rFVIIa) ou emicizumabe' }
          ],
          citations: [{ refId: 'hemophilia-a-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6-12 meses',
        examesControle: ['Inibidores anualmente', 'Avaliação articular', 'FVIII trough'],
        metasTerapeuticas: ['Zero sangramentos', 'Preservação articular'],
        criteriosEncaminhamento: ['Hematologia', 'Ortopedia', 'Centro de hemofilia'],
        citations: [{ refId: 'hemophilia-a-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-hemofilia-ms'],
    medicamentos: ['fator-viii-recombinante', 'emicizumabe'],
    calculadoras: [],
    citations: [{ refId: 'hemophilia-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'coagulopatia', 'ligada-x', 'hemartrose']
  },
  {
    id: 'hemofilia-b',
    titulo: 'Hemofilia B',
    sinonimos: ['Deficiência de fator IX', 'Doença de Christmas'],
    doid: 'DOID:12259',
    snomedCT: '1563006',
    ordo: ['ORPHA:98879'],
    ciap2: ['B83'],
    cid10: ['D67'],
    categoria: 'hematologico',
    subcategoria: 'coagulopatia',
    quickView: {
      definicao: 'Coagulopatia hereditária ligada ao X por deficiência de fator IX, clinicamente idêntica à hemofilia A.',
      criteriosDiagnosticos: [
        'Fenótipo hemorrágico similar à hemofilia A',
        'TTPa prolongado, TP normal',
        'Fator IX <40%',
        'Fator VIII normal'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar trauma', 'Fisioterapia'],
        farmacologico: ['Fator IX recombinante (profilaxia e demanda)', 'Fator IX de meia-vida estendida']
      },
      redFlags: ['Hemorragia intracraniana', 'Sangramento de psoas', 'Inibidores (menos comum que na A)']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:25.000 nascidos vivos masculinos',
        faixaEtaria: 'Diagnóstico no 1º ano (grave) ou tardio (leve)',
        fatoresRisco: ['Herança ligada ao X'],
        citations: [{ refId: 'hemophilia-b-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Hemartroses', 'Hematomas', 'Sangramento pós-operatório'],
        sinaisExameFisico: ['Artropatia', 'Similar à hemofilia A'],
        formasClinicas: ['Grave (<1%)', 'Moderada (1-5%)', 'Leve (5-40%)'],
        citations: [{ refId: 'hemophilia-b-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Fator IX <40%', 'Fator VIII normal'],
        diagnosticoDiferencial: ['Hemofilia A', 'Deficiências raras'],
        examesLaboratoriais: ['TTPa', 'Dosagem FIX', 'Pesquisa de inibidores'],
        examesImagem: ['USG/RM articular'],
        citations: [{ refId: 'hemophilia-b-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Profilaxia de sangramentos', 'Preservação articular'],
        naoFarmacologico: {
          medidas: ['Fisioterapia', 'Terapia gênica (etranacogene dezaparvovec aprovado)'],
          citations: [{ refId: 'hemophilia-b-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Reposição de fator', medicamentos: ['Fator IX recombinante (profilaxia 2x/semana)', 'FIX de meia-vida estendida (semanal)'] }
          ],
          citations: [{ refId: 'hemophilia-b-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6-12 meses',
        examesControle: ['Inibidores', 'FIX trough', 'Avaliação articular'],
        metasTerapeuticas: ['Zero sangramentos'],
        criteriosEncaminhamento: ['Hematologia', 'Centro de hemofilia'],
        citations: [{ refId: 'hemophilia-b-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-hemofilia-ms'],
    medicamentos: ['fator-ix-recombinante'],
    calculadoras: [],
    citations: [{ refId: 'hemophilia-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'coagulopatia', 'ligada-x', 'terapia-genica']
  },
  {
    id: 'doenca-von-willebrand',
    titulo: 'Doença de von Willebrand',
    sinonimos: ['DvW', 'VWD'],
    doid: 'DOID:12531',
    snomedCT: '128105004',
    ordo: ['ORPHA:903'],
    ciap2: ['B83'],
    cid10: ['D68.0'],
    categoria: 'hematologico',
    subcategoria: 'coagulopatia',
    quickView: {
      definicao: 'Coagulopatia hereditária mais comum, por deficiência quantitativa ou qualitativa do fator de von Willebrand (FvW).',
      criteriosDiagnosticos: [
        'Sangramento mucocutâneo (epistaxe, menorragia, equimoses)',
        'FvW:Ag ou FvW:RCo <30-50%',
        'História familiar positiva (maioria)',
        'TTPa normal ou prolongado'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar AINEs e aspirina'],
        farmacologico: ['Desmopressina (tipos 1 e alguns 2)', 'Concentrado de FvW/FVIII']
      },
      redFlags: ['Sangramento pós-parto', 'Sangramento GI', 'Sangramento pós-operatório']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:100-1:1.000 (maioria assintomático)',
        faixaEtaria: 'Qualquer idade',
        fatoresRisco: ['Autossômica dominante (maioria) ou recessiva'],
        citations: [{ refId: 'vwd-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Epistaxe', 'Menorragia', 'Sangramento gengival', 'Equimoses fáceis'],
        sinaisExameFisico: ['Equimoses', 'Petéquias (tipo 3)'],
        formasClinicas: ['Tipo 1 (deficiência quantitativa parcial)', 'Tipo 2 (qualitativo)', 'Tipo 3 (deficiência grave)'],
        citations: [{ refId: 'vwd-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['FvW:Ag e FvW:RCo', 'Multímeros de FvW', 'Relação FvW:RCo/FvW:Ag'],
        diagnosticoDiferencial: ['Disfunção plaquetária', 'Hemofilia A leve', 'Síndrome de Bernard-Soulier'],
        examesLaboratoriais: ['FvW:Ag', 'FvW:RCo', 'FVIII', 'Multímeros', 'Teste de ligação ao colágeno'],
        examesImagem: [],
        citations: [{ refId: 'vwd-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Controlar sangramentos', 'Profilaxia pré-procedimentos'],
        naoFarmacologico: {
          medidas: ['Ácido tranexâmico para sangramento mucoso'],
          citations: [{ refId: 'vwd-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Análogo de ADH', medicamentos: ['Desmopressina 0.3 mcg/kg IV (tipos responsivos)'] },
            { classe: 'Antifibrinolítico', medicamentos: ['Ácido tranexâmico'] }
          ],
          segundaLinha: [
            { classe: 'Reposição', medicamentos: ['Concentrado de FvW/FVIII (tipo 3 ou não-responsivos)'] }
          ],
          citations: [{ refId: 'vwd-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Anual ou conforme sintomas',
        examesControle: ['Resposta à desmopressina (teste)', 'FvW em procedimentos'],
        metasTerapeuticas: ['Controle de sangramentos'],
        criteriosEncaminhamento: ['Hematologia', 'Ginecologia (menorragia)'],
        citations: [{ refId: 'vwd-follow-up-2022' }]
      }
    },
    protocolos: [],
    medicamentos: ['desmopressina', 'acido-tranexamico', 'concentrado-fvw'],
    calculadoras: ['isth-bat'],
    citations: [{ refId: 'vwd-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'coagulopatia', 'mucocutaneo', 'desmopressina']
  },
  {
    id: 'hemoglobinuria-paroxistica-noturna',
    titulo: 'Hemoglobinúria Paroxística Noturna',
    sinonimos: ['HPN', 'PNH'],
    doid: 'DOID:8637',
    snomedCT: '1963002',
    ordo: ['ORPHA:447'],
    ciap2: ['B78'],
    cid10: ['D59.5'],
    categoria: 'hematologico',
    subcategoria: 'anemia-hemolitica',
    quickView: {
      definicao: 'Doença clonal adquirida de célula-tronco por mutação somática em PIGA, causando hemólise intravascular, trombose e falência medular.',
      criteriosDiagnosticos: [
        'Hemólise intravascular (LDH elevado)',
        'Hemoglobinúria',
        'Trombose venosa em sítios atípicos',
        'Clone GPI-deficiente na citometria de fluxo',
        'Associação com anemia aplástica/SMD'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Transfusões quando necessário'],
        farmacologico: ['Eculizumabe (anti-C5)', 'Ravulizumabe', 'Pegcetacoplan (anti-C3)']
      },
      redFlags: ['Trombose (Budd-Chiari, cerebral)', 'Insuficiência renal', 'Hipertensão pulmonar']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1-2:100.000',
        faixaEtaria: 'Qualquer idade (pico 30-40 anos)',
        fatoresRisco: ['Mutação somática em PIGA'],
        citations: [{ refId: 'pnh-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Fadiga', 'Dispneia', 'Dor abdominal', 'Disfagia', 'Disfunção erétil'],
        sinaisExameFisico: ['Icterícia', 'Esplenomegalia', 'Sinais de trombose'],
        formasClinicas: ['Hemolítica clássica', 'Com falência medular', 'Subclínica'],
        citations: [{ refId: 'pnh-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Citometria de fluxo: deficiência de GPI-AP (CD55, CD59) em >1 linhagem'],
        diagnosticoDiferencial: ['AHAI', 'SHU/PTT', 'Anemia aplástica'],
        examesLaboratoriais: ['Citometria de fluxo para PNH', 'LDH', 'Haptoglobina', 'Hemoglobina livre', 'Reticulócitos'],
        examesImagem: ['Eco abdominal (Budd-Chiari)', 'Angio-TC se trombose'],
        citations: [{ refId: 'pnh-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Controlar hemólise', 'Prevenir trombose', 'Tratar citopenia'],
        naoFarmacologico: {
          medidas: ['TCTH (curativo em casos selecionados)', 'Anticoagulação em trombose'],
          citations: [{ refId: 'pnh-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Anti-C5', medicamentos: ['Eculizumabe 600-900 mg IV', 'Ravulizumabe'] }
          ],
          segundaLinha: [
            { classe: 'Anti-C3', medicamentos: ['Pegcetacoplan SC (hemólise extravascular persistente)'] }
          ],
          citations: [{ refId: 'pnh-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 2-4 semanas (infusões)',
        examesControle: ['LDH', 'Hemograma', 'Clone PNH anual'],
        metasTerapeuticas: ['LDH normal', 'Independência transfusional'],
        criteriosEncaminhamento: ['Hematologia', 'Centro de HPN'],
        citations: [{ refId: 'pnh-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-hpn-ms'],
    medicamentos: ['eculizumabe', 'ravulizumabe', 'pegcetacoplan'],
    calculadoras: [],
    citations: [{ refId: 'pnh-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'hemolitica', 'complemento', 'trombose']
  },
  {
    id: 'purpura-trombocitopenica-trombotica',
    titulo: 'Púrpura Trombocitopênica Trombótica',
    sinonimos: ['PTT', 'TTP'],
    doid: 'DOID:10772',
    snomedCT: '78129009',
    ordo: ['ORPHA:54057'],
    ciap2: ['B83'],
    cid10: ['M31.1'],
    categoria: 'hematologico',
    subcategoria: 'microangiopatia',
    quickView: {
      definicao: 'Microangiopatia trombótica por deficiência grave de ADAMTS13 (<10%), com trombocitopenia, anemia hemolítica e disfunção orgânica.',
      criteriosDiagnosticos: [
        'Trombocitopenia',
        'Anemia hemolítica microangiopática (esquizócitos)',
        'Sintomas neurológicos (flutuantes)',
        'Febre',
        'Insuficiência renal (geralmente leve)',
        'ADAMTS13 <10%'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Plasmaférese de urgência'],
        farmacologico: ['Corticosteroides', 'Caplacizumabe', 'Rituximabe']
      },
      redFlags: ['AVC', 'IAM', 'Coma', 'Insuficiência renal grave (considerar SHU)']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '3-6:1.000.000/ano',
        faixaEtaria: 'Adultos jovens (predomínio feminino)',
        fatoresRisco: ['Autoimune (anticorpos anti-ADAMTS13)', 'Congênita (síndrome de Upshaw-Schulman)'],
        citations: [{ refId: 'ttp-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Fadiga', 'Petéquias', 'Confusão', 'Cefaleia', 'Dor abdominal'],
        sinaisExameFisico: ['Púrpura', 'Icterícia', 'Alteração neurológica', 'Febre'],
        formasClinicas: ['Adquirida (imune)', 'Congênita (deficiência hereditária de ADAMTS13)'],
        citations: [{ refId: 'ttp-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['ADAMTS13 <10%', 'Anticorpo anti-ADAMTS13 (adquirida)', 'PLASMIC score'],
        diagnosticoDiferencial: ['SHU', 'CIVD', 'Síndrome HELLP', 'PTI'],
        examesLaboratoriais: ['Hemograma (esquizócitos)', 'LDH', 'Haptoglobina', 'ADAMTS13 e inibidor', 'Creatinina'],
        examesImagem: ['TC crânio se sintomas neurológicos'],
        citations: [{ refId: 'ttp-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Remover multímeros ultra-grandes de FvW', 'Inibir adesão plaquetária', 'Reduzir anticorpos'],
        naoFarmacologico: {
          medidas: ['Plasmaférese diária até remissão', 'NÃO transfundir plaquetas (exceto sangramento grave)'],
          citations: [{ refId: 'ttp-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticosteroide', medicamentos: ['Metilprednisolona 1 mg/kg/dia'] },
            { classe: 'Anti-FvW', medicamentos: ['Caplacizumabe 11 mg SC/dia'] }
          ],
          segundaLinha: [
            { classe: 'Anti-CD20', medicamentos: ['Rituximabe 375 mg/m² semanal x4'] }
          ],
          citations: [{ refId: 'ttp-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Diário na fase aguda, depois mensal',
        examesControle: ['Plaquetas', 'LDH', 'ADAMTS13 seriado'],
        metasTerapeuticas: ['ADAMTS13 >20%', 'Plaquetas >150.000', 'Remissão sustentada'],
        criteriosEncaminhamento: ['Hematologia', 'Aférese', 'UTI'],
        citations: [{ refId: 'ttp-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-mat-ms'],
    medicamentos: ['caplacizumabe', 'rituximabe'],
    calculadoras: ['plasmic-score'],
    citations: [{ refId: 'ttp-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'microangiopatia', 'adamts13', 'plasmaferese', 'emergencia']
  },

  // ============================================
  // OUTRAS DOENÇAS RARAS (9)
  // ============================================
  {
    id: 'fibrose-cistica',
    titulo: 'Fibrose Cística',
    sinonimos: ['FC', 'Mucoviscidose'],
    doid: 'DOID:1485',
    snomedCT: '190905008',
    ordo: ['ORPHA:586'],
    ciap2: ['R99'],
    cid10: ['E84'],
    categoria: 'respiratorio',
    subcategoria: 'genetica',
    quickView: {
      definicao: 'Doença autossômica recessiva por mutação em CFTR, causando secreções espessas com doença pulmonar, insuficiência pancreática e infertilidade.',
      criteriosDiagnosticos: [
        'Teste do suor positivo (Cl >60 mEq/L)',
        'Doença pulmonar obstrutiva crônica',
        'Insuficiência pancreática exócrina',
        'Íleo meconial neonatal',
        'Infertilidade masculina (azoospermia obstrutiva)',
        'Duas mutações CFTR patogênicas'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia respiratória diária', 'Suporte nutricional hipercalórico'],
        farmacologico: ['Moduladores CFTR (ivacaftor, lumacaftor/ivacaftor, elexacaftor/tezacaftor/ivacaftor)', 'Enzimas pancreáticas', 'DNase inalatória']
      },
      redFlags: ['Hemoptise maciça', 'Pneumotórax', 'Exacerbação pulmonar grave', 'Insuficiência respiratória']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:2.500-3.500 em caucasianos',
        faixaEtaria: 'Diagnóstico neonatal (triagem) ou infância',
        fatoresRisco: ['Autossômica recessiva', 'ΔF508 mutação mais comum'],
        citations: [{ refId: 'cf-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Tosse crônica produtiva', 'Infecções respiratórias recorrentes', 'Esteatorreia', 'Baixo ganho de peso'],
        sinaisExameFisico: ['Baqueteamento digital', 'Hepatomegalia', 'Sinusite crônica', 'Prolapso retal'],
        formasClinicas: ['Clássica', 'Atípica/não-clássica', 'Relacionada a CFTR'],
        citations: [{ refId: 'cf-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Teste do suor (2 amostras)', 'Análise molecular CFTR', 'IRT na triagem neonatal'],
        diagnosticoDiferencial: ['Asma', 'Bronquiectasias idiopáticas', 'Discinesia ciliar primária', 'Imunodeficiência'],
        examesLaboratoriais: ['Teste do suor', 'Elastase fecal', 'Vitaminas lipossolúveis'],
        examesImagem: ['TC tórax', 'RX seios da face'],
        citations: [{ refId: 'cf-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Manter função pulmonar', 'Otimizar nutrição', 'Prevenir/tratar infecções'],
        naoFarmacologico: {
          medidas: ['Fisioterapia respiratória 2x/dia', 'Dieta hipercalórica', 'Transplante pulmonar se indicado'],
          citations: [{ refId: 'cf-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Modulador CFTR', medicamentos: ['Elexacaftor/tezacaftor/ivacaftor (Trikafta)', 'Ivacaftor (Kalydeco)'] },
            { classe: 'Mucolítico', medicamentos: ['Dornase alfa inalatória', 'Salina hipertônica 7%'] },
            { classe: 'Enzimas', medicamentos: ['Pancreatina/pancrelipase'] }
          ],
          situacoesEspeciais: [
            { situacao: 'Exacerbação', conduta: 'Antibióticos IV (cobertura Pseudomonas)' }
          ],
          citations: [{ refId: 'cf-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3 meses',
        examesControle: ['Espirometria', 'Cultura de escarro', 'Estado nutricional', 'Glicemia'],
        metasTerapeuticas: ['VEF1 >80%', 'IMC adequado'],
        criteriosEncaminhamento: ['Centro de referência FC', 'Transplante pulmonar'],
        citations: [{ refId: 'cf-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-fc-ms'],
    medicamentos: ['elexacaftor-tezacaftor-ivacaftor', 'ivacaftor', 'dornase-alfa', 'pancreatina'],
    calculadoras: [],
    citations: [{ refId: 'cf-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'triagem-neonatal', 'cftr', 'modulador', 'pulmonar']
  },
  {
    id: 'hiperplasia-adrenal-congenita',
    titulo: 'Hiperplasia Adrenal Congênita',
    sinonimos: ['HAC', 'CAH', 'Deficiência de 21-hidroxilase'],
    doid: 'DOID:0050811',
    snomedCT: '237751000',
    ordo: ['ORPHA:90793'],
    ciap2: ['T99'],
    cid10: ['E25.0'],
    categoria: 'endocrino',
    subcategoria: 'adrenal',
    quickView: {
      definicao: 'Erro inato da esteroidogênese adrenal, mais comumente por deficiência de 21-hidroxilase, com excesso de andrógenos e deficiência de cortisol/aldosterona.',
      criteriosDiagnosticos: [
        'Virilização de genitália em meninas (ambiguidade)',
        'Crise adrenal perdedora de sal em neonatos',
        'Pseudopuberdade precoce em meninos',
        '17-hidroxiprogesterona muito elevada',
        'Mutação CYP21A2'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Cirurgia corretiva em meninas (controversa)'],
        farmacologico: ['Glicocorticoide (hidrocortisona)', 'Mineralocorticoide (fludrocortisona)', 'Reposição de NaCl em lactentes']
      },
      redFlags: ['Crise adrenal (hiponatremia, hipercalemia)', 'Desidratação grave', 'Virilização progressiva']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:10.000-15.000 nascidos vivos',
        faixaEtaria: 'Diagnóstico neonatal (triagem)',
        fatoresRisco: ['Autossômica recessiva'],
        citations: [{ refId: 'cah-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Ambiguidade genital (meninas)', 'Vômitos, desidratação (perdedora de sal)', 'Crescimento acelerado'],
        sinaisExameFisico: ['Genitália ambígua', 'Hiperpigmentação', 'Puberdade precoce'],
        formasClinicas: ['Clássica perdedora de sal', 'Clássica virilizante simples', 'Não-clássica (tardia)'],
        citations: [{ refId: 'cah-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['17-OHP basal >10.000 ng/dL (forma clássica)', 'Teste de ACTH na forma não-clássica'],
        diagnosticoDiferencial: ['Outras deficiências enzimáticas', 'Tumor virilizante'],
        examesLaboratoriais: ['17-OHP', 'Eletrólitos', 'Cortisol', 'ACTH', 'Atividade de renina'],
        examesImagem: ['USG pélvico (determinação sexo gonadal)'],
        citations: [{ refId: 'cah-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Repor cortisol e aldosterona', 'Suprimir excesso de andrógenos', 'Crescimento normal'],
        naoFarmacologico: {
          medidas: ['Identificação de sexo de criação', 'Educação sobre dose de estresse'],
          citations: [{ refId: 'cah-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Glicocorticoide', medicamentos: ['Hidrocortisona 10-15 mg/m²/dia em 3 doses'] },
            { classe: 'Mineralocorticoide', medicamentos: ['Fludrocortisona 0.05-0.2 mg/dia'] }
          ],
          situacoesEspeciais: [
            { situacao: 'Crise adrenal', conduta: 'Hidrocortisona IV 50-100 mg/m² + SF 0.9%' }
          ],
          citations: [{ refId: 'cah-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-4 meses',
        examesControle: ['17-OHP', 'Androstenediona', 'Crescimento/idade óssea', 'Eletrólitos'],
        metasTerapeuticas: ['17-OHP 400-1200 ng/dL', 'Crescimento normal'],
        criteriosEncaminhamento: ['Endocrinologia pediátrica', 'Urologia pediátrica', 'Genética'],
        citations: [{ refId: 'cah-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-hac-ms'],
    medicamentos: ['hidrocortisona', 'fludrocortisona'],
    calculadoras: [],
    citations: [{ refId: 'cah-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'triagem-neonatal', 'adrenal', 'virilizacao', 'crise-adrenal']
  },
  {
    id: 'hipotireoidismo-congenito',
    titulo: 'Hipotireoidismo Congênito',
    sinonimos: ['HC'],
    doid: 'DOID:10581',
    snomedCT: '111567004',
    ordo: ['ORPHA:442'],
    ciap2: ['T86'],
    cid10: ['E03.1'],
    categoria: 'endocrino',
    subcategoria: 'tireoide',
    quickView: {
      definicao: 'Deficiência de hormônios tireoidianos presente ao nascimento, principal causa prevenível de deficiência intelectual se não tratada.',
      criteriosDiagnosticos: [
        'TSH elevado na triagem neonatal',
        'T4L baixo',
        'Confirmação em amostra venosa',
        'Pode ter bócio ou tireoide ausente/ectópica'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Nenhum'],
        farmacologico: ['Levotiroxina']
      },
      redFlags: ['Atraso no início do tratamento (risco de DI)', 'TSH persistentemente elevado']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:2.000-4.000 nascidos vivos',
        faixaEtaria: 'Diagnóstico neonatal (teste do pezinho)',
        fatoresRisco: ['Disgenesia tireoidiana', 'Disormonogênese', 'Deficiência de iodo'],
        citations: [{ refId: 'ch-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Maioria assintomático ao nascimento', 'Icterícia prolongada', 'Letargia', 'Constipação'],
        sinaisExameFisico: ['Macroglossia', 'Hérnia umbilical', 'Fontanela posterior ampla', 'Pele seca'],
        formasClinicas: ['Permanente', 'Transitório'],
        citations: [{ refId: 'ch-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['TSH >10-20 mU/L (triagem)', 'Confirmação com TSH e T4L séricos'],
        diagnosticoDiferencial: ['Hipotireoidismo transitório', 'Hipotiroxinemia da prematuridade'],
        examesLaboratoriais: ['TSH', 'T4L', 'Tireoglobulina'],
        examesImagem: ['Cintilografia tireoidiana', 'USG cervical'],
        citations: [{ refId: 'ch-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Normalizar T4L em 2 semanas', 'TSH normal em 1 mês', 'Desenvolvimento normal'],
        naoFarmacologico: {
          medidas: ['Iniciar tratamento até 14 dias de vida'],
          citations: [{ refId: 'ch-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Hormônio tireoidiano', medicamentos: ['Levotiroxina 10-15 mcg/kg/dia'] }
          ],
          citations: [{ refId: 'ch-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 1-3 meses no 1º ano',
        examesControle: ['TSH e T4L', 'Desenvolvimento neuropsicomotor'],
        metasTerapeuticas: ['T4L >1.5 ng/dL no 1º ano', 'TSH 0.5-2 mU/L'],
        criteriosEncaminhamento: ['Endocrinologia pediátrica'],
        citations: [{ refId: 'ch-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-hc-ms'],
    medicamentos: ['levotiroxina'],
    calculadoras: [],
    citations: [{ refId: 'ch-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'triagem-neonatal', 'tireoide', 'prevenivel']
  },
  {
    id: 'doenca-wilson',
    titulo: 'Doença de Wilson',
    sinonimos: ['Degeneração hepatolenticular'],
    doid: 'DOID:893',
    snomedCT: '88518009',
    ordo: ['ORPHA:905'],
    ciap2: ['D99', 'N99'],
    cid10: ['E83.0'],
    categoria: 'metabolico',
    subcategoria: 'metal',
    quickView: {
      definicao: 'Doença autossômica recessiva do metabolismo do cobre por mutação em ATP7B, com acúmulo de cobre em fígado, cérebro e outros órgãos.',
      criteriosDiagnosticos: [
        'Doença hepática (hepatite, cirrose)',
        'Sintomas neurológicos (tremor, distonia, disartria)',
        'Anel de Kayser-Fleischer',
        'Ceruloplasmina baixa (<20 mg/dL)',
        'Cobre hepático elevado',
        'Mutação ATP7B'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Dieta pobre em cobre (evitar fígado, mariscos, chocolate)'],
        farmacologico: ['D-penicilamina ou trientina (quelantes)', 'Zinco (bloqueia absorção)']
      },
      redFlags: ['Insuficiência hepática aguda', 'Anemia hemolítica Coombs negativa', 'Deterioração neurológica']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:30.000-100.000',
        faixaEtaria: 'Diagnóstico 5-35 anos (variável)',
        fatoresRisco: ['Autossômica recessiva'],
        citations: [{ refId: 'wilson-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Fadiga', 'Icterícia', 'Tremor', 'Alteração de comportamento'],
        sinaisExameFisico: ['Anel de Kayser-Fleischer', 'Hepatomegalia', 'Esplenomegalia', 'Distonia'],
        formasClinicas: ['Hepática', 'Neurológica', 'Psiquiátrica', 'Mista'],
        citations: [{ refId: 'wilson-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Score de Leipzig (ceruloplasmina, KF ring, Cu urinário, Cu hepático, genética)'],
        diagnosticoDiferencial: ['Hepatite autoimune', 'Cirrose de outras causas', 'Parkinsonismo jovem'],
        examesLaboratoriais: ['Ceruloplasmina', 'Cu sérico e urinário 24h', 'Função hepática', 'Análise molecular ATP7B'],
        examesImagem: ['RM encéfalo (sinal do panda)', 'USG hepático'],
        citations: [{ refId: 'wilson-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Remover cobre acumulado', 'Prevenir novo acúmulo', 'Tratar complicações'],
        naoFarmacologico: {
          medidas: ['Dieta pobre em cobre', 'Transplante hepático se fulminante'],
          citations: [{ refId: 'wilson-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Quelante', medicamentos: ['D-penicilamina 750-1500 mg/dia', 'Trientina 750-1500 mg/dia'] }
          ],
          segundaLinha: [
            { classe: 'Bloqueador absorção', medicamentos: ['Zinco 150 mg/dia (elemento) - manutenção'] }
          ],
          citations: [{ refId: 'wilson-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: ['Cu urinário 24h', 'Cu livre sérico', 'Função hepática', 'Hemograma'],
        metasTerapeuticas: ['Cu urinário 200-500 mcg/24h (em tratamento)', 'Cu livre <10 mcg/dL'],
        criteriosEncaminhamento: ['Hepatologia', 'Neurologia', 'Transplante hepático'],
        citations: [{ refId: 'wilson-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-wilson-ms'],
    medicamentos: ['d-penicilamina', 'trientina', 'zinco'],
    calculadoras: ['leipzig-score'],
    citations: [{ refId: 'wilson-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'cobre', 'hepatico', 'neurologico', 'kayser-fleischer']
  },
  {
    id: 'hemocromatose-hereditaria',
    titulo: 'Hemocromatose Hereditária',
    sinonimos: ['HH', 'Sobrecarga de ferro genética'],
    doid: 'DOID:2352',
    snomedCT: '399187006',
    ordo: ['ORPHA:139498'],
    ciap2: ['D99'],
    cid10: ['E83.1'],
    categoria: 'metabolico',
    subcategoria: 'metal',
    quickView: {
      definicao: 'Doença autossômica recessiva de absorção excessiva de ferro, mais comumente por mutação HFE (C282Y), causando sobrecarga de ferro em múltiplos órgãos.',
      criteriosDiagnosticos: [
        'Saturação de transferrina >45%',
        'Ferritina elevada',
        'Sobrecarga de ferro hepática (RM ou biópsia)',
        'Homozigose C282Y ou heterozigose composta',
        'Manifestações: fadiga, artropatia, hepatomegalia, diabetes, hiperpigmentação'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Flebotomia terapêutica'],
        farmacologico: ['Quelantes apenas se contraindicação a flebotomia']
      },
      redFlags: ['Cirrose', 'Carcinoma hepatocelular', 'Cardiomiopatia', 'Diabetes']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:200-300 em caucasianos (genótipo); expressão clínica menor',
        faixaEtaria: 'Sintomas 40-60 anos (homens antes)',
        fatoresRisco: ['Homozigose C282Y', 'Sexo masculino', 'Álcool'],
        citations: [{ refId: 'hh-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Fadiga', 'Artralgia (2º e 3º MCF)', 'Impotência', 'Dor abdominal'],
        sinaisExameFisico: ['Hepatomegalia', 'Hiperpigmentação bronzeada', 'Artropatia'],
        formasClinicas: ['Tipo 1 (HFE)', 'Tipo 2 (juvenil)', 'Tipo 3 (TFR2)', 'Tipo 4 (ferroportina)'],
        citations: [{ refId: 'hh-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Sat. transferrina >45% + ferritina elevada + genética HFE'],
        diagnosticoDiferencial: ['Sobrecarga de ferro secundária', 'Doença hepática alcoólica', 'NAFLD'],
        examesLaboratoriais: ['Ferro sérico', 'Ferritina', 'Saturação de transferrina', 'Genotipagem HFE'],
        examesImagem: ['RM hepática (LIC)', 'Elastografia'],
        citations: [{ refId: 'hh-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Depletar estoque de ferro', 'Ferritina <50-100 ng/mL', 'Prevenir complicações'],
        naoFarmacologico: {
          medidas: ['Flebotomia 500 mL semanal (indução), depois manutenção'],
          citations: [{ refId: 'hh-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Flebotomia', medicamentos: ['500 mL sangue/sessão'] }
          ],
          segundaLinha: [
            { classe: 'Quelante', medicamentos: ['Deferasirox (se anemia, acesso venoso difícil)'] }
          ],
          citations: [{ refId: 'hh-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Conforme frequência de flebotomia',
        examesControle: ['Hemograma', 'Ferritina a cada 3-6 flebotomias', 'USG hepático semestral (se cirrose)'],
        metasTerapeuticas: ['Ferritina 50-100 ng/mL'],
        criteriosEncaminhamento: ['Hepatologia', 'Hematologia'],
        citations: [{ refId: 'hh-follow-up-2022' }]
      }
    },
    protocolos: [],
    medicamentos: [],
    calculadoras: [],
    citations: [{ refId: 'hh-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'ferro', 'flebotomia', 'hepatico', 'hfe']
  }
];
