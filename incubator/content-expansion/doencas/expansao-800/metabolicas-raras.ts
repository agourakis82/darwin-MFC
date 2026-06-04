/**
 * DOENCAS METABOLICAS RARAS - DARWIN-MFC EXPANSAO 800
 * ===================================================
 * Erros inatos do metabolismo e doencas de deposito
 */

import { Doenca } from '@/lib/types/doenca';

export const metabolicasRaras: Doenca[] = [
  // ============================================================================
  // DOENCAS DE DEPOSITO LISOSSOMAL
  // ============================================================================
  {
    id: 'doenca-gaucher',
    titulo: 'Doenca de Gaucher',
    sinonimos: ['Gaucher Disease', 'Deficiencia de Glucocerebrosidase', 'GD'],
    doid: 'DOID:1926',
    snomedCT: '190794006',
    meshId: 'D005776',
    umlsCui: 'C0017205',
    ordo: ['ORPHA:355'],
    ciap2: ['T99'],
    cid10: ['E75.2'],
    cid11: ['5C56.0'],
    categoria: 'metabolico',
    subcategoria: 'doencas_deposito_lisossomal',
    quickView: {
      definicao: 'Doenca de deposito lisossomal autossomica recessiva mais comum, causada por deficiencia de glucocerebrosidase (GBA1). Acumulo de glucocerebrosideo em macrofagos (celulas de Gaucher). Tipo 1 (nao neuropatico) e mais frequente.',
      criteriosDiagnosticos: [
        'Esplenomegalia (geralmente massiva)',
        'Hepatomegalia',
        'Citopenias (trombocitopenia, anemia)',
        'Doenca ossea (crises, osteonecrose, fraturas)',
        'Atividade de glucocerebrosidase <15% em leucocitos',
        'Celulas de Gaucher em medula ossea (nao obrigatorio)',
        'Biomarcadores: quitotriosidase elevada, CCL18/PARC'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Acompanhamento multidisciplinar',
          'Avaliacao ossea periodica (DXA, RM)',
          'Aconselhamento genetico',
          'Vacinacao (asplenia funcional)'
        ],
        farmacologico: [
          'TRE: Imiglucerase 60 U/kg IV a cada 2 semanas',
          'Alternativas TRE: Velaglucerase alfa, Taliglucerase alfa',
          'TRS: Eliglustat 84mg 2x/dia VO (CYP2D6 metabolizadores extensivos)',
          'Alternativa TRS: Miglustat 100mg 3x/dia'
        ]
      },
      metasTerapeuticas: [
        'Normalizacao de hemoglobina e plaquetas em 1-2 anos',
        'Reducao de volume hepatoesplenico em 2-5 anos',
        'Prevencao de complicacoes osseas',
        'Melhora da qualidade de vida'
      ],
      examesIniciais: [
        'Atividade de glucocerebrosidase em leucocitos',
        'Analise molecular GBA1',
        'Hemograma completo',
        'Quitotriosidase e CCL18',
        'RM de femur e coluna',
        'DXA (densitometria ossea)',
        'Ultrassom ou RM abdominal'
      ],
      redFlags: [
        'Sinais neurologicos (tipos 2 e 3)',
        'Sangramento grave',
        'Crises osseas intensas',
        'Hipertensao pulmonar',
        'Doenca de Parkinson associada (mutacao GBA)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:40.000-60.000 na populacao geral; 1:800 em judeus Ashkenazi',
        incidencia: 'Tipo 1 representa 90-95% dos casos',
        faixaEtaria: 'Tipo 1: qualquer idade; Tipo 2: lactentes; Tipo 3: infancia',
        fatoresRisco: [
          'Ancestralidade judaica Ashkenazi (mutacao N370S)',
          'Consanguinidade',
          'Historia familiar'
        ],
        citations: [{ refId: 'nejm-gaucher-2017' }]
      },
      fisiopatologia: {
        texto: 'Mutacoes no gene GBA1 causam deficiencia de glucocerebrosidase lisossomal. Glucocerebrosideo acumula em macrofagos (celulas de Gaucher), que infiltram figado, baco, medula ossea e outros orgaos. Inflamacao cronica e disfuncao multiorganica.',
        citations: [{ refId: 'lancet-gaucher-2018' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Esplenomegalia (pode ser massiva)',
          'Hepatomegalia',
          'Fadiga (anemia)',
          'Sangramentos (trombocitopenia)',
          'Dor ossea e crises osseas',
          'Fraturas patologicas'
        ],
        sinaisExameFisico: [
          'Palidez',
          'Esplenomegalia palpavel',
          'Hepatomegalia',
          'Equimoses',
          'Deformidades osseas (frasco de Erlenmeyer)'
        ],
        formasClinicas: [
          'TIPO 1: Nao neuropatico (90-95%), variavel',
          'TIPO 2: Neuropatico agudo, letal 1-2 anos',
          'TIPO 3: Neuropatico cronico, sobrevida variavel'
        ],
        citations: [{ refId: 'nejm-gaucher-2017' }]
      },
      diagnostico: {
        criterios: [
          'Atividade de glucocerebrosidase <15% do normal em leucocitos',
          'Confirmacao por analise molecular do GBA1',
          'Fenotipos clinicos variaveis'
        ],
        diagnosticoDiferencial: [
          'Outras doencas de deposito lisossomal',
          'Doenca de Niemann-Pick',
          'Leucemias e linfomas',
          'Esplenomegalia de outras causas',
          'Histiocitose'
        ],
        examesLaboratoriais: [
          'Atividade de glucocerebrosidase em leucocitos (padrao-ouro)',
          'Sequenciamento GBA1',
          'Hemograma (citopenias)',
          'Quitotriosidase (biomarcador)',
          'Ferritina, fosfatase acida'
        ],
        examesImagem: [
          'RM de femur e coluna (infiltracao medular)',
          'DXA (osteopenia/osteoporose)',
          'Ultrassom ou TC abdominal',
          'Ecocardiograma (HP)'
        ],
        citations: [{ refId: 'lancet-gaucher-2018' }]
      },
      tratamento: {
        objetivos: [
          'Reverter citopenias',
          'Reduzir organomegalias',
          'Prevenir complicacoes osseas',
          'Melhorar qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Monitoramento multidisciplinar',
            'Evitar esportes de contato (esplenomegalia)',
            'Suporte nutricional',
            'Fisioterapia para mobilidade'
          ],
          citations: [{ refId: 'acmg-gaucher-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'TRE - Terapia de Reposicao Enzimatica', medicamentos: ['Imiglucerase', 'Velaglucerase alfa', 'Taliglucerase alfa'], posologia: 'Imiglucerase 60 U/kg IV a cada 2 semanas', observacoes: 'Ajuste conforme resposta; alto custo' },
            { classe: 'TRS - Terapia de Reducao de Substrato', medicamentos: ['Eliglustat'], posologia: '84mg 2x/dia VO (metabolizadores extensivos CYP2D6)', observacoes: 'Primeira linha oral; requer genotipagem CYP2D6' }
          ],
          segundaLinha: [
            { classe: 'TRS alternativa', medicamentos: ['Miglustat'], posologia: '100mg 3x/dia VO', observacoes: 'Efeitos GI frequentes; segunda linha' }
          ],
          situacoesEspeciais: [
            { situacao: 'Gravidez', conduta: 'TRE pode ser continuada; eliglustat contraindicado' },
            { situacao: 'Doenca ossea grave', conduta: 'TRE em dose plena; considerar bifosfonatos' }
          ],
          citations: [{ refId: 'acmg-gaucher-2021' }]
        },
        duracao: 'Tratamento continuo por toda a vida'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses durante estabilizacao; anual quando estavel',
        examesControle: [
          'Hemograma a cada 3-6 meses',
          'Quitotriosidase anual',
          'RM abdominal anual',
          'RM ossea a cada 1-2 anos',
          'DXA anual'
        ],
        metasTerapeuticas: [
          'Hb >11 g/dL (mulheres) ou >12 g/dL (homens)',
          'Plaquetas >100.000/mm3',
          'Volume esplenico <2-8x normal',
          'Ausencia de crises osseas'
        ],
        criteriosEncaminhamento: [
          'Todo caso suspeito: geneticista/centro de referencia',
          'Ortopedia se doenca ossea',
          'Hematologia se citopenias graves',
          'Pneumologia se hipertensao pulmonar'
        ],
        citations: [{ refId: 'nejm-gaucher-2017' }]
      },
      prevencao: {
        primaria: [
          'Aconselhamento genetico para portadores',
          'Triagem de portadores em populacoes de risco'
        ],
        secundaria: [
          'Diagnostico precoce',
          'Triagem neonatal disponivel em alguns paises',
          'Triagem familiar de casos indice'
        ],
        citations: [{ refId: 'acmg-gaucher-2021' }]
      }
    },
    protocolos: ['gaucher-tre-manejo'],
    medicamentos: ['imiglucerase', 'velaglucerase', 'eliglustat', 'miglustat'],
    calculadoras: ['ds3-gaucher', 'gd-severity-score'],
    rastreamentos: ['triagem-neonatal-gaucher'],
    citations: [{ refId: 'nejm-gaucher-2017' }, { refId: 'lancet-gaucher-2018' }, { refId: 'acmg-gaucher-2021' }],
    lastUpdate: '2025-01',
    tags: ['gaucher', 'lisossomal', 'TRE', 'esplenomegalia', 'glucocerebrosidase', 'rara']
  },

  {
    id: 'doenca-fabry',
    titulo: 'Doenca de Fabry',
    sinonimos: ['Fabry Disease', 'Deficiencia de Alfa-galactosidase A', 'Angiokeratoma Corporis Diffusum'],
    doid: 'DOID:14499',
    snomedCT: '16652001',
    meshId: 'D000795',
    umlsCui: 'C0002986',
    ordo: ['ORPHA:324'],
    ciap2: ['T99'],
    cid10: ['E75.2'],
    cid11: ['5C56.01'],
    categoria: 'metabolico',
    subcategoria: 'doencas_deposito_lisossomal',
    quickView: {
      definicao: 'Doenca de deposito lisossomal ligada ao X causada por deficiencia de alfa-galactosidase A (GLA). Acumulo de globotriaosilceramida (Gb3) em endotelio, podocitos, cardiomiocitos e neuronios. Afeta homens mais gravemente; mulheres heterozigotas podem ser sintomaticas.',
      criteriosDiagnosticos: [
        'Acroparestesias (dor neuropatica em maos e pes)',
        'Angioqueratomas (pele)',
        'Hipoidrose/anidrose',
        'Cornea verticillata (exame oftalmologico)',
        'Proteinuria e DRC progressiva',
        'Cardiomiopatia hipertrofica',
        'AVC em jovens',
        'Atividade de alfa-gal A <1% em homens',
        'Analise molecular do gene GLA'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar calor excessivo (hipoidrose)',
          'Hidratacao adequada',
          'Nefroproteção (IECA/BRA)',
          'Controle rigoroso de fatores CV'
        ],
        farmacologico: [
          'TRE: Agalsidase beta 1 mg/kg IV a cada 2 semanas',
          'TRE: Agalsidase alfa 0,2 mg/kg IV a cada 2 semanas',
          'Chaperona: Migalastat 123mg VO em dias alternados (mutacoes amenable)',
          'Dor neuropatica: Carbamazepina, Gabapentina'
        ]
      },
      metasTerapeuticas: [
        'Estabilizar funcao renal',
        'Prevenir progressao cardiaca',
        'Controle da dor neuropatica',
        'Prevenir eventos cerebrovasculares'
      ],
      examesIniciais: [
        'Atividade de alfa-galactosidase A (homens)',
        'Analise molecular GLA (obrigatoria em mulheres)',
        'Gb3 e liso-Gb3 plasmaticos',
        'Creatinina, proteinuria',
        'Ecocardiograma',
        'RM cardiaca',
        'Exame oftalmologico (lampada de fenda)'
      ],
      redFlags: [
        'Proteinuria >1g/dia',
        'TFG em declinio rapido',
        'Hipertrofia ventricular progressiva',
        'Arritmias',
        'AVC ou AIT em jovem'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:40.000-117.000 (forma classica); ate 1:3.000 (incluindo variantes tardia)',
        incidencia: 'Subdiagnosticada; triagem neonatal revelando maior prevalencia',
        faixaEtaria: 'Classica: infancia; Variantes: adultos',
        fatoresRisco: [
          'Heranca ligada ao X',
          'Historia familiar',
          'Mulheres heterozigotas podem ser afetadas por inativacao do X enviesada'
        ],
        citations: [{ refId: 'nejm-fabry-2020' }]
      },
      fisiopatologia: {
        texto: 'Mutacoes no gene GLA causam deficiencia de alfa-galactosidase A. Gb3 e liso-Gb3 acumulam em lisossomos de celulas endoteliais, podocitos, cardiomiocitos e neuronios dos ganglios dorsais. Vasculopatia progressiva e fibrose.',
        citations: [{ refId: 'lancet-fabry-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Acroparestesias (crises de dor em maos/pes)',
          'Hipoidrose/anidrose',
          'Intolerancia ao calor e exercicio',
          'Sintomas GI (dor, diarreia)',
          'Proteinuria progressiva',
          'Cardiomiopatia hipertrofica',
          'AVC isquemico'
        ],
        sinaisExameFisico: [
          'Angioqueratomas (umbigo, coxas, escroto)',
          'Cornea verticillata',
          'Edema de membros inferiores',
          'Sopro cardiaco (se cardiomiopatia)'
        ],
        formasClinicas: [
          'CLASSICA: homens, inicio infancia, manifestacoes completas',
          'TARDIA (cardiaca/renal): residual enzimatico, orgao-especifica',
          'HETEROZIGOTA: mulheres, variavel'
        ],
        citations: [{ refId: 'nejm-fabry-2020' }]
      },
      diagnostico: {
        criterios: [
          'Homens: atividade de alfa-gal A <1% + clinica',
          'Mulheres: analise molecular obrigatoria (enzima pode ser normal)',
          'Biomarcadores: Gb3 e liso-Gb3 elevados'
        ],
        diagnosticoDiferencial: [
          'Febre reumatica',
          'Neuropatia de pequenas fibras idiopatica',
          'Cardiomiopatia hipertrofica outras',
          'Nefropatia IgA',
          'Esclerose multipla'
        ],
        examesLaboratoriais: [
          'Atividade de alfa-galactosidase A em leucocitos/plasma',
          'Sequenciamento do gene GLA',
          'Gb3 e liso-Gb3 plasmaticos',
          'Creatinina, proteinuria 24h ou RAC'
        ],
        examesImagem: [
          'Ecocardiograma',
          'RM cardiaca com T1 mapping',
          'RM cerebral',
          'Ultrassom renal'
        ],
        outrosExames: [
          'Exame oftalmologico (lampada de fenda)',
          'Audiometria',
          'Biopsia renal (casos selecionados)'
        ],
        citations: [{ refId: 'lancet-fabry-2021' }]
      },
      tratamento: {
        objetivos: [
          'Estabilizar ou melhorar funcao renal',
          'Prevenir progressao cardiaca',
          'Aliviar sintomas',
          'Prevenir eventos CV'
        ],
        naoFarmacologico: {
          medidas: [
            'Evitar gatilhos de crises (calor, exercicio intenso)',
            'Dieta hipossodica',
            'Controle de PA',
            'Cessacao de tabagismo'
          ],
          citations: [{ refId: 'ema-fabry-guidelines-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'TRE', medicamentos: ['Agalsidase beta', 'Agalsidase alfa'], posologia: 'Agalsidase beta 1 mg/kg IV 2/2 sem; Agalsidase alfa 0,2 mg/kg IV 2/2 sem', observacoes: 'Iniciar precocemente; reacoes infusionais possiveis' },
            { classe: 'Chaperona farmacologica', medicamentos: ['Migalastat'], posologia: '123mg VO em dias alternados', observacoes: 'Apenas mutacoes amenable; teste in vitro necessario' }
          ],
          segundaLinha: [
            { classe: 'Sintomatico - dor neuropatica', medicamentos: ['Carbamazepina', 'Gabapentina', 'Pregabalina'], posologia: 'Carbamazepina 200-800mg/dia', observacoes: 'Evitar AINE (nefrotoxicidade)' }
          ],
          situacoesEspeciais: [
            { situacao: 'DRC avancada', conduta: 'Dialise ou transplante renal; manter TRE' },
            { situacao: 'Gravidez', conduta: 'TRE pode ser mantida; discussao caso a caso' }
          ],
          citations: [{ refId: 'ema-fabry-guidelines-2022' }]
        },
        duracao: 'Tratamento continuo por toda a vida'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6 meses; mais frequente se instavel',
        examesControle: [
          'Funcao renal e proteinuria a cada 6 meses',
          'Ecocardiograma anual',
          'RM cardiaca a cada 2 anos',
          'Liso-Gb3 anual',
          'Audiometria anual'
        ],
        metasTerapeuticas: [
          'TFG estavel',
          'Proteinuria <0,5g/dia',
          'Massa VE estavel',
          'Ausencia de eventos CV'
        ],
        criteriosEncaminhamento: [
          'Todo caso: centro de referencia em doencas raras',
          'Nefrologia se proteinuria ou DRC',
          'Cardiologia se cardiomiopatia',
          'Neurologia se AVC/neuropatia'
        ],
        citations: [{ refId: 'nejm-fabry-2020' }]
      },
      prevencao: {
        primaria: [
          'Aconselhamento genetico',
          'Teste de portadoras em familias afetadas'
        ],
        secundaria: [
          'Triagem neonatal',
          'Triagem familiar de casos indice',
          'Inicio precoce de tratamento'
        ],
        citations: [{ refId: 'lancet-fabry-2021' }]
      }
    },
    protocolos: ['fabry-tre-manejo'],
    medicamentos: ['agalsidase-beta', 'agalsidase-alfa', 'migalastat', 'carbamazepina'],
    calculadoras: ['mssi-fabry', 'fipi-fabry'],
    rastreamentos: ['triagem-neonatal-fabry'],
    citations: [{ refId: 'nejm-fabry-2020' }, { refId: 'lancet-fabry-2021' }, { refId: 'ema-fabry-guidelines-2022' }],
    lastUpdate: '2025-01',
    tags: ['fabry', 'lisossomal', 'X-linked', 'cardiomiopatia', 'nefropatia', 'TRE', 'rara']
  },

  {
    id: 'doenca-pompe',
    titulo: 'Doenca de Pompe',
    sinonimos: ['Pompe Disease', 'Glicogenose Tipo II', 'Deficiencia de Alfa-glicosidase Acida', 'GAA Deficiency'],
    doid: 'DOID:2752',
    snomedCT: '124315001',
    meshId: 'D006009',
    umlsCui: 'C0017921',
    ordo: ['ORPHA:365'],
    ciap2: ['T99'],
    cid10: ['E74.0'],
    cid11: ['5C51.01'],
    categoria: 'metabolico',
    subcategoria: 'doencas_deposito_lisossomal',
    quickView: {
      definicao: 'Doenca de deposito lisossomal autossomica recessiva causada por deficiencia de alfa-glicosidase acida (GAA). Acumulo de glicogenio em musculos esqueleticos, cardiacos e respiratorios. Forma infantil e tardia (LOPD).',
      criteriosDiagnosticos: [
        'INFANTIL: Hipotonia grave, cardiomiopatia hipertrofica, hepatomegalia',
        'TARDIA: Fraqueza de cinturas, insuficiencia respiratoria',
        'Elevacao de CK (2-10x)',
        'Atividade de GAA <1% (infantil) ou 1-30% (tardia)',
        'EMG: padrao miopatico',
        'RM muscular: infiltracao gordurosa'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Fisioterapia motora e respiratoria',
          'Suporte ventilatório (BiPAP, ventilacao invasiva)',
          'Terapia ocupacional',
          'Suporte nutricional'
        ],
        farmacologico: [
          'TRE: Alglucosidase alfa 20 mg/kg IV a cada 2 semanas',
          'TRE: Avalglucosidase alfa 20 mg/kg IV a cada 2 semanas (segunda geracao)',
          'Pre-medicacao para reacoes infusionais',
          'Imunomodulacao se anticorpos neutralizantes'
        ]
      },
      metasTerapeuticas: [
        'INFANTIL: Sobrevida, funcao cardiaca, marcos motores',
        'TARDIA: Estabilizar funcao muscular e respiratoria',
        'Manter marcha independente',
        'Retardar necessidade de ventilacao'
      ],
      examesIniciais: [
        'Atividade de GAA em papel filtro (triagem)',
        'Confirmacao em leucocitos ou fibroblastos',
        'Analise molecular do gene GAA',
        'CK, AST, ALT, LDH',
        'Ecocardiograma',
        'Prova de funcao pulmonar (CVF sentado/deitado)',
        'RM muscular'
      ],
      redFlags: [
        'Insuficiencia respiratoria aguda',
        'Cardiomiopatia grave (infantil)',
        'Perda rapida de funcao motora',
        'Disfagia',
        'Reacoes infusionais graves'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:40.000 (todas as formas); infantil 1:138.000',
        incidencia: 'Triagem neonatal mostrando maior incidencia que estimado',
        faixaEtaria: 'Infantil: <12 meses; Tardia: infancia a adulto',
        fatoresRisco: [
          'Autossomica recessiva',
          'Consanguinidade',
          'Historia familiar'
        ],
        citations: [{ refId: 'nejm-pompe-2019' }]
      },
      fisiopatologia: {
        texto: 'Mutacoes no gene GAA causam deficiencia de alfa-glicosidase acida lisossomal. Glicogenio acumula em lisossomos, especialmente de musculos esqueleticos, cardiacos e diafragma. Autofagia disfuncional contribui para dano muscular.',
        citations: [{ refId: 'lancet-neurol-pompe-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'INFANTIL: Hipotonia profunda (floppy baby)',
          'Cardiomegalia massiva',
          'Dificuldade alimentar',
          'TARDIA: Fraqueza proximal progressiva',
          'Dificuldade respiratoria',
          'Fadiga'
        ],
        sinaisExameFisico: [
          'Hipotonia',
          'Macroglossia (infantil)',
          'Hepatomegalia (infantil)',
          'Fraqueza de cinturas',
          'Sinal de Gowers',
          'Uso de musculatura acessoria'
        ],
        formasClinicas: [
          'INFANTIL CLASSICA: <12 meses, cardiomiopatia, fatal se nao tratada',
          'INFANTIL NAO CLASSICA: cardiomiopatia leve',
          'TARDIA (LOPD): >12 meses a adulto, miopatia predominante'
        ],
        citations: [{ refId: 'nejm-pompe-2019' }]
      },
      diagnostico: {
        criterios: [
          'Clinica compativel + atividade de GAA reduzida',
          'Confirmacao molecular (gene GAA)',
          'CRIM status (infantil) - importante para tratamento'
        ],
        diagnosticoDiferencial: [
          'Distrofias musculares',
          'Outras glicogenoses',
          'Miopatias inflamatorias',
          'Atrofia muscular espinhal',
          'Miastenia gravis'
        ],
        examesLaboratoriais: [
          'Atividade de GAA (DBS, leucocitos, fibroblastos)',
          'Sequenciamento GAA',
          'CK (2-10x elevado)',
          'Tetrassacarideo urinario Glc4'
        ],
        examesImagem: [
          'Ecocardiograma',
          'RM muscular (coxas, paravertebrais)',
          'Radiografia de torax'
        ],
        outrosExames: [
          'Provas de funcao pulmonar (CVF)',
          'Polissonografia',
          'EMG'
        ],
        citations: [{ refId: 'lancet-neurol-pompe-2021' }]
      },
      tratamento: {
        objetivos: [
          'Melhorar/estabilizar funcao muscular',
          'Manter funcao respiratoria',
          'Sobrevida (infantil)',
          'Qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Fisioterapia motora regular',
            'Fisioterapia respiratoria',
            'Suporte ventilatório conforme necessidade',
            'Terapia ocupacional',
            'Dieta adequada'
          ],
          citations: [{ refId: 'acmg-pompe-2019' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'TRE primeira geracao', medicamentos: ['Alglucosidase alfa'], posologia: '20 mg/kg IV a cada 2 semanas', observacoes: 'Pre-medicacao; monitorar anticorpos' },
            { classe: 'TRE segunda geracao', medicamentos: ['Avalglucosidase alfa'], posologia: '20 mg/kg IV a cada 2 semanas', observacoes: 'Maior captacao muscular; aprovado para LOPD' }
          ],
          segundaLinha: [
            { classe: 'Terapia combinada', medicamentos: ['Cipaglucosidase alfa + miglustat'], posologia: 'Em avaliacao', observacoes: 'Chaperona potencializa TRE' }
          ],
          situacoesEspeciais: [
            { situacao: 'CRIM negativo (infantil)', conduta: 'Imunomodulacao profilatica (rituximab, MTX, IVIG)' },
            { situacao: 'Anticorpos neutralizantes', conduta: 'Imunomodulacao; considerar troca de TRE' }
          ],
          citations: [{ refId: 'acmg-pompe-2019' }]
        },
        duracao: 'Tratamento continuo por toda a vida'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses; mais frequente na forma infantil',
        examesControle: [
          'CK, Glc4 urinario a cada 6 meses',
          'Provas de funcao pulmonar a cada 6 meses',
          'Ecocardiograma (infantil) a cada 6 meses',
          'Teste de caminhada de 6 minutos',
          'RM muscular anual',
          'Anticorpos anti-rhGAA'
        ],
        metasTerapeuticas: [
          'CVF estavel ou melhorando',
          'Manter capacidade de marcha',
          'Ausencia de progressao cardiaca (infantil)'
        ],
        criteriosEncaminhamento: [
          'Todo caso: centro de referencia em doencas neuromusculares',
          'Pneumologia',
          'Cardiologia (infantil)',
          'Genetica'
        ],
        citations: [{ refId: 'nejm-pompe-2019' }]
      },
      prevencao: {
        primaria: [
          'Aconselhamento genetico',
          'Triagem de portadores'
        ],
        secundaria: [
          'Triagem neonatal (implementada em varios estados)',
          'Inicio precoce de TRE (melhor prognostico)'
        ],
        citations: [{ refId: 'acmg-pompe-2019' }]
      }
    },
    protocolos: ['pompe-tre-manejo', 'triagem-neonatal-pompe'],
    medicamentos: ['alglucosidase-alfa', 'avalglucosidase-alfa'],
    calculadoras: ['gsgc-pompe', 'walton-score'],
    rastreamentos: ['triagem-neonatal-pompe'],
    citations: [{ refId: 'nejm-pompe-2019' }, { refId: 'lancet-neurol-pompe-2021' }, { refId: 'acmg-pompe-2019' }],
    lastUpdate: '2025-01',
    tags: ['pompe', 'glicogenose', 'lisossomal', 'TRE', 'miopatia', 'triagem-neonatal', 'rara']
  },

  {
    id: 'mps-tipo-i',
    titulo: 'Mucopolissacaridose Tipo I',
    sinonimos: ['MPS I', 'Hurler', 'Scheie', 'Hurler-Scheie', 'Deficiencia de Alfa-L-Iduronidase'],
    doid: 'DOID:12799',
    snomedCT: '70737009',
    meshId: 'D008059',
    umlsCui: 'C0026708',
    ordo: ['ORPHA:579'],
    ciap2: ['T99'],
    cid10: ['E76.0'],
    cid11: ['5C56.10'],
    categoria: 'metabolico',
    subcategoria: 'doencas_deposito_lisossomal',
    quickView: {
      definicao: 'Doenca de deposito lisossomal autossomica recessiva causada por deficiencia de alfa-L-iduronidase. Acumulo de dermatan e heparan sulfato. Espectro de Hurler (grave) a Scheie (atenuada).',
      criteriosDiagnosticos: [
        'Facies grosseira',
        'Disostose multipla',
        'Hepatoesplenomegalia',
        'Opacidade corneana',
        'Cardiopatia valvar',
        'Hernia umbilical/inguinal',
        'Deficiencia intelectual (formas graves)',
        'GAGs urinarios elevados (dermatan/heparan sulfato)',
        'Atividade de alfa-L-iduronidase deficiente'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'TCTH alogênico precoce (Hurler <2 anos)',
          'Fisioterapia',
          'Cirurgias corretivas (hernias, mãos, coluna)',
          'Suporte respiratório (apneia do sono)'
        ],
        farmacologico: [
          'TRE: Laronidase 0,58 mg/kg IV semanal',
          'Pre-medicacao para reacoes infusionais',
          'Analgesia para dores osteoarticulares'
        ]
      },
      metasTerapeuticas: [
        'Hurler: preservar cognicao (TCTH precoce)',
        'Reduzir organomegalias',
        'Melhorar mobilidade articular',
        'Estabilizar funcao cardiaca e pulmonar'
      ],
      examesIniciais: [
        'GAGs urinarios quantitativos',
        'Atividade de alfa-L-iduronidase',
        'Analise molecular IDUA',
        'Rx de esqueleto (disostose multipla)',
        'Ecocardiograma',
        'RM de coluna cervical',
        'Avaliacao oftalmologica'
      ],
      redFlags: [
        'Compressao medular cervical',
        'Hidrocefalia comunicante',
        'Insuficiencia respiratoria',
        'Cardiopatia grave',
        'Declinio cognitivo rapido'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:100.000 nascidos vivos',
        incidencia: 'Hurler 60%, Hurler-Scheie 23%, Scheie 17%',
        faixaEtaria: 'Hurler: <1 ano; Scheie: infância tardia a adulto',
        fatoresRisco: [
          'Autossomica recessiva',
          'Consanguinidade'
        ],
        citations: [{ refId: 'genet-med-mps-2020' }]
      },
      fisiopatologia: {
        texto: 'Mutacoes no gene IDUA causam deficiencia de alfa-L-iduronidase. Dermatan e heparan sulfato acumulam em lisossomos de multiplos tecidos, causando disfuncao celular progressiva e organomegalias.',
        citations: [{ refId: 'lancet-mps-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Facies grosseira progressiva',
          'Hepatoesplenomegalia',
          'Rigidez articular',
          'Baixa estatura',
          'Opacidade corneana',
          'Perda auditiva',
          'Regressao neurológica (Hurler)'
        ],
        sinaisExameFisico: [
          'Macrocefalia',
          'Hirsutismo',
          'Gibosidade toracolombar',
          'Mao em garra',
          'Hernia umbilical',
          'Sopro cardiaco'
        ],
        formasClinicas: [
          'HURLER: grave, inicio <1 ano, DI, morte <10 anos sem tratamento',
          'HURLER-SCHEIE: intermediaria',
          'SCHEIE: atenuada, inteligencia preservada, sobrevida adulta'
        ],
        citations: [{ refId: 'genet-med-mps-2020' }]
      },
      diagnostico: {
        criterios: [
          'Clinica sugestiva',
          'GAGs urinarios elevados',
          'Atividade enzimatica deficiente',
          'Confirmacao molecular'
        ],
        diagnosticoDiferencial: [
          'Outras MPS (II, VI)',
          'Mucolipidoses',
          'Gangliosidoses',
          'Fucosidose'
        ],
        examesLaboratoriais: [
          'GAGs urinarios quantitativos',
          'Atividade de alfa-L-iduronidase',
          'Sequenciamento IDUA'
        ],
        examesImagem: [
          'Rx de esqueleto (disostose multipla)',
          'RM de coluna cervical',
          'RM de encefalo',
          'Ecocardiograma'
        ],
        outrosExames: [
          'Avaliacao oftalmologica',
          'Audiometria',
          'Polissonografia'
        ],
        citations: [{ refId: 'lancet-mps-2021' }]
      },
      tratamento: {
        objetivos: [
          'Preservar cognicao (TCTH em Hurler)',
          'Reduzir carga de GAGs',
          'Prevenir complicacoes',
          'Melhorar qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'TCTH alogenico precoce (<2 anos) para Hurler',
            'Fisioterapia',
            'Cirurgias ortopedicas',
            'CPAP para apneia',
            'Derivacao ventriculoperitoneal se hidrocefalia'
          ],
          citations: [{ refId: 'acmg-mps-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'TRE', medicamentos: ['Laronidase'], posologia: '0,58 mg/kg IV semanal', observacoes: 'Nao atravessa BHE; indicado para formas atenuadas ou peri-TCTH' }
          ],
          situacoesEspeciais: [
            { situacao: 'Hurler <2 anos', conduta: 'TCTH alogenico e a melhor opcao; TRE peri-transplante' },
            { situacao: 'Anticorpos neutralizantes', conduta: 'Imunomodulacao' }
          ],
          citations: [{ refId: 'acmg-mps-2021' }]
        },
        duracao: 'TRE continua; TCTH e curativo para componente somatico'
      },
      acompanhamento: {
        frequenciaConsultas: 'Multidisciplinar a cada 3-6 meses',
        examesControle: [
          'GAGs urinarios a cada 6 meses',
          'Ecocardiograma anual',
          'RM de coluna anual',
          'Avaliacao cognitiva anual',
          'Audiometria anual'
        ],
        metasTerapeuticas: [
          'Estabilizacao de organomegalias',
          'Mobilidade preservada',
          'Funcao cardiaca estavel',
          'Cognicao preservada (pos-TCTH)'
        ],
        criteriosEncaminhamento: [
          'Todo caso: centro de referencia',
          'Neurocirurgia se compressao medular',
          'Cardiologia',
          'Ortopedia'
        ],
        citations: [{ refId: 'genet-med-mps-2020' }]
      },
      prevencao: {
        primaria: [
          'Aconselhamento genetico'
        ],
        secundaria: [
          'Triagem neonatal disponivel',
          'Diagnostico precoce permite TCTH a tempo'
        ],
        citations: [{ refId: 'lancet-mps-2021' }]
      }
    },
    protocolos: ['mps1-manejo', 'tcth-mps'],
    medicamentos: ['laronidase'],
    calculadoras: ['mps-severity-score'],
    rastreamentos: ['triagem-neonatal-mps'],
    citations: [{ refId: 'genet-med-mps-2020' }, { refId: 'lancet-mps-2021' }, { refId: 'acmg-mps-2021' }],
    lastUpdate: '2025-01',
    tags: ['MPS', 'mucopolissacaridose', 'Hurler', 'lisossomal', 'TRE', 'TCTH', 'rara']
  },

  // ============================================================================
  // AMINOACIDOPATIAS
  // ============================================================================
  {
    id: 'fenilcetonuria',
    titulo: 'Fenilcetonuria',
    sinonimos: ['PKU', 'Hiperfenilalaninemia', 'Deficiencia de Fenilalanina Hidroxilase'],
    doid: 'DOID:9281',
    snomedCT: '7573000',
    meshId: 'D010661',
    umlsCui: 'C0031485',
    ordo: ['ORPHA:716'],
    ciap2: ['T99'],
    cid10: ['E70.0', 'E70.1'],
    cid11: ['5C50.00'],
    categoria: 'metabolico',
    subcategoria: 'aminoacidopatias',
    quickView: {
      definicao: 'Erro inato do metabolismo autossomico recessivo mais comum, causado por deficiencia de fenilalanina hidroxilase (PAH). Acumulo de fenilalanina causa dano neurologico irreversivel se nao tratado precocemente. Triagem neonatal obrigatoria no Brasil.',
      criteriosDiagnosticos: [
        'Triagem neonatal positiva (Phe >2 mg/dL)',
        'PKU classica: Phe >20 mg/dL',
        'PKU leve: Phe 10-20 mg/dL',
        'Hiperfenilalaninemia leve: Phe 2-10 mg/dL',
        'Deficiencia de BH4: excluir (pterinas urinarias)',
        'Sem tratamento: DI, convulsoes, eczema, odor de mofo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Dieta restrita em fenilalanina (VITALICIO)',
          'Formula metabolica isenta de Phe',
          'Monitoramento frequente de Phe sanguinea',
          'Acompanhamento nutricional especializado'
        ],
        farmacologico: [
          'Sapropterina (BH4) 5-20 mg/kg/dia (responsivos)',
          'Pegvaliase (adultos com PKU nao controlada)',
          'Suplementacao de tirosina se necessario'
        ]
      },
      metasTerapeuticas: [
        'Phe 2-6 mg/dL (0-12 anos)',
        'Phe 2-10 mg/dL (>12 anos)',
        'Desenvolvimento neuropsicomotor normal',
        'Crescimento adequado'
      ],
      examesIniciais: [
        'Phe e Tyr plasmaticas quantitativas',
        'Pterinas urinarias (excluir deficiencia de BH4)',
        'DHPR em sangue',
        'Teste de responsividade a BH4',
        'Analise molecular PAH'
      ],
      redFlags: [
        'Phe persistentemente >10 mg/dL em criancas',
        'Atraso do DNPM',
        'Convulsoes',
        'Sindrome de PKU materna (gestante nao tratada)',
        'Deficiencia de BH4 (requer tratamento diferente)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:10.000-15.000 no Brasil',
        incidencia: 'Detectada pela triagem neonatal',
        faixaEtaria: 'Diagnostico neonatal; tratamento vitalicio',
        fatoresRisco: [
          'Autossomica recessiva',
          'Historia familiar',
          'Frequencia de portadores ~1:50'
        ],
        citations: [{ refId: 'acmg-pku-2021' }]
      },
      fisiopatologia: {
        texto: 'Mutacoes no gene PAH causam deficiencia de fenilalanina hidroxilase, impedindo conversao de fenilalanina em tirosina. Phe elevada e metabolitos toxicos (fenilpiruvato, fenilacetato) causam dano cerebral, afetando mielinizacao e neurotransmissao.',
        citations: [{ refId: 'lancet-pku-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'SEM TRATAMENTO: Deficiencia intelectual grave',
          'Convulsoes',
          'Microcefalia',
          'Eczema',
          'Odor de mofo (acido fenilacetico)',
          'COM TRATAMENTO PRECOCE: Desenvolvimento normal'
        ],
        sinaisExameFisico: [
          'Hipopigmentacao (cabelos e pele claros)',
          'Eczema',
          'Hipertonia (nao tratados)',
          'Sinais neurologicos (nao tratados)'
        ],
        formasClinicas: [
          'PKU classica: Phe >20 mg/dL, atividade PAH <1%',
          'PKU leve: Phe 10-20 mg/dL',
          'Hiperfenilalaninemia leve (HPA): Phe 2-10 mg/dL (pode nao requerer dieta)',
          'Deficiencia de BH4: pterinas anormais'
        ],
        citations: [{ refId: 'acmg-pku-2021' }]
      },
      diagnostico: {
        criterios: [
          'Triagem neonatal: Phe >2 mg/dL',
          'Confirmacao: Phe quantitativa elevada',
          'Excluir deficiencia de BH4'
        ],
        diagnosticoDiferencial: [
          'Deficiencia de BH4 (GTPCH, PTPS, DHPR)',
          'Tirosinemia',
          'Prematuridade (transitoria)'
        ],
        examesLaboratoriais: [
          'Phe e Tyr plasmaticas',
          'Razao Phe/Tyr',
          'Pterinas urinarias',
          'DHPR em eritrocitos',
          'Sequenciamento PAH'
        ],
        citations: [{ refId: 'lancet-pku-2020' }]
      },
      tratamento: {
        objetivos: [
          'Manter Phe em faixa terapeutica',
          'Garantir desenvolvimento normal',
          'Nutricao adequada'
        ],
        naoFarmacologico: {
          medidas: [
            'Dieta restrita em Phe (proteina natural limitada)',
            'Formula metabolica sem Phe',
            'Alimentos especiais baixos em proteina',
            'Monitoramento nutricional regular'
          ],
          citations: [{ refId: 'acmg-pku-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Chaperona', medicamentos: ['Sapropterina (BH4)'], posologia: '5-20 mg/kg/dia VO', observacoes: 'Apenas responsivos (~30-50%); teste de responsividade necessario' }
          ],
          segundaLinha: [
            { classe: 'Terapia de substituicao enzimatica', medicamentos: ['Pegvaliase'], posologia: 'SC, titulacao ate 20-40 mg/dia', observacoes: 'Adultos com PKU nao controlada; risco de anafilaxia' }
          ],
          situacoesEspeciais: [
            { situacao: 'Gravidez (PKU materna)', conduta: 'Phe <6 mg/dL ANTES da concepcao e durante gestacao; prevenir sindrome de PKU materna' },
            { situacao: 'Deficiencia de BH4', conduta: 'BH4 + precursores de neurotransmissores (L-dopa, 5-HTP)' }
          ],
          citations: [{ refId: 'lancet-pku-2020' }]
        },
        duracao: 'Tratamento vitalicio'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal no primeiro ano; a cada 3-6 meses depois',
        examesControle: [
          'Phe sanguinea: semanal a quinzenal',
          'Perfil nutricional a cada 6-12 meses',
          'Avaliacao neuropsicologica periodica'
        ],
        metasTerapeuticas: [
          'Phe 2-6 mg/dL (0-12 anos)',
          'Phe 2-10 mg/dL (>12 anos)',
          'Phe <6 mg/dL (gestantes)'
        ],
        criteriosEncaminhamento: [
          'Todo caso: servico de referencia em EIM',
          'Neurologia se atraso do desenvolvimento',
          'Psicologia para adesao'
        ],
        citations: [{ refId: 'acmg-pku-2021' }]
      },
      prevencao: {
        primaria: [
          'Aconselhamento genetico'
        ],
        secundaria: [
          'Triagem neonatal OBRIGATORIA no Brasil (teste do pezinho)',
          'Diagnostico e tratamento precoce previnem sequelas'
        ],
        citations: [{ refId: 'lancet-pku-2020' }]
      }
    },
    protocolos: ['pku-manejo-nutricional', 'triagem-neonatal-pku'],
    medicamentos: ['sapropterina', 'pegvaliase', 'formula-pku'],
    calculadoras: ['phe-calculator', 'pku-diet-calculator'],
    rastreamentos: ['triagem-neonatal-pku'],
    citations: [{ refId: 'acmg-pku-2021' }, { refId: 'lancet-pku-2020' }],
    lastUpdate: '2025-01',
    tags: ['PKU', 'fenilcetonuria', 'aminoacidopatia', 'triagem-neonatal', 'dieta', 'rara']
  },

  {
    id: 'doenca-xarope-bordo',
    titulo: 'Doenca do Xarope de Bordo',
    sinonimos: ['MSUD', 'Maple Syrup Urine Disease', 'Leucinose', 'Deficiencia de BCKDH'],
    doid: 'DOID:9269',
    snomedCT: '27718001',
    meshId: 'D008375',
    umlsCui: 'C0024776',
    ordo: ['ORPHA:511'],
    ciap2: ['T99'],
    cid10: ['E71.0'],
    cid11: ['5C50.10'],
    categoria: 'metabolico',
    subcategoria: 'aminoacidopatias',
    quickView: {
      definicao: 'Erro inato do metabolismo dos aminoacidos de cadeia ramificada (leucina, isoleucina, valina) por deficiencia do complexo BCKDH. Nome deriva do odor adocicado da urina. Emergencia metabolica se nao tratada.',
      criteriosDiagnosticos: [
        'Triagem neonatal: leucina elevada',
        'Odor adocicado (xarope de bordo) na urina e suor',
        'FORMA CLASSICA: encefalopatia neonatal, cetoacidose',
        'Leucina plasmatica muito elevada (>2000 umol/L na crise)',
        'Aloisoleucina presente (patognomonico)',
        'Atividade de BCKDH <2% (classica)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'EMERGENCIA: suspender proteina, aporte calorico alto',
          'Dieta restrita em BCAA vitalicia',
          'Formula especial sem BCAA',
          'Monitoramento frequente de BCAA'
        ],
        farmacologico: [
          'Crise: glicose IV alta concentracao, insulina',
          'Tiamina 100-300 mg/dia (testar responsividade)',
          'Suplementacao de isoleucina e valina se deficientes',
          'Carnitina se deficiencia secundaria'
        ]
      },
      metasTerapeuticas: [
        'Leucina 75-200 umol/L (normal 50-200)',
        'Prevenir crises metabolicas',
        'Desenvolvimento neuropsicomotor normal',
        'Crescimento adequado'
      ],
      examesIniciais: [
        'Aminoacidos plasmaticos quantitativos',
        'Acidos organicos urinarios',
        'Atividade de BCKDH em fibroblastos',
        'Analise molecular (BCKDHA, BCKDHB, DBT)',
        'Gasometria, amonia, lactato na crise'
      ],
      redFlags: [
        'Letargia, recusa alimentar (crise iminente)',
        'Odor adocicado intensificado',
        'Cetoacidose',
        'Convulsoes, coma',
        'Edema cerebral'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:185.000 global; 1:380 em Menonitas (fundador)',
        incidencia: 'Detectada pela triagem neonatal ampliada',
        faixaEtaria: 'Forma classica: sintomas em 3-5 dias de vida',
        fatoresRisco: [
          'Autossomica recessiva',
          'Consanguinidade',
          'Comunidades isoladas (Menonitas)'
        ],
        citations: [{ refId: 'jimd-msud-2021' }]
      },
      fisiopatologia: {
        texto: 'Mutacoes nos genes BCKDHA, BCKDHB ou DBT causam deficiencia do complexo desidrogenase de alfa-cetoacidos de cadeia ramificada. Leucina, isoleucina, valina e seus cetoacidos acumulam. Leucina e particularmente neurotoxica, causando edema cerebral e desmielinizacao.',
        citations: [{ refId: 'genet-med-msud-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'FORMA CLASSICA: encefalopatia neonatal (3-5 dias)',
          'Dificuldade alimentar, letargia',
          'Odor de xarope de bordo',
          'Opistotono, movimentos de boxeador',
          'Convulsoes, coma',
          'FORMAS LEVES: crises intermitentes com estresse'
        ],
        sinaisExameFisico: [
          'Odor caracteristico',
          'Hipotonia ou hipertonia',
          'Movimentos anormais',
          'Fontanela abaulada (edema cerebral)'
        ],
        formasClinicas: [
          'CLASSICA: neonatal, atividade <2%, mais grave',
          'INTERMITENTE: crises com estresse, atividade 5-20%',
          'INTERMEDIARIA: tolerancia proteica maior',
          'TIAMINA-RESPONSIVA: responde a doses altas de B1'
        ],
        citations: [{ refId: 'jimd-msud-2021' }]
      },
      diagnostico: {
        criterios: [
          'Leucina muito elevada',
          'Presenca de aloisoleucina (patognomonico)',
          'Atividade de BCKDH reduzida',
          'Confirmacao molecular'
        ],
        diagnosticoDiferencial: [
          'Sepse neonatal',
          'Outras acidemias organicas',
          'Defeitos do ciclo da ureia',
          'Encefalopatia hipoxica'
        ],
        examesLaboratoriais: [
          'Aminoacidos plasmaticos',
          'Acidos organicos urinarios',
          'Gasometria (cetoacidose)',
          'Amonia',
          'Glicemia'
        ],
        examesImagem: [
          'RM de encefalo (edema, desmielinizacao)'
        ],
        citations: [{ refId: 'genet-med-msud-2020' }]
      },
      tratamento: {
        objetivos: [
          'Normalizar leucina rapidamente na crise',
          'Manter BCAA em faixa terapeutica',
          'Prevenir dano neurologico'
        ],
        naoFarmacologico: {
          medidas: [
            'CRISE: jejum proteico + aporte calorico alto (glicose IV)',
            'Dialise se leucina muito elevada',
            'Dieta restrita em BCAA vitalicia',
            'Formula especial'
          ],
          citations: [{ refId: 'gmdi-msud-protocol-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Vitamina', medicamentos: ['Tiamina'], posologia: '100-300 mg/dia', observacoes: 'Testar responsividade em todos os casos' }
          ],
          situacoesEspeciais: [
            { situacao: 'Crise metabolica', conduta: 'Glicose IV 10-12 mg/kg/min, insulina se necessario, dialise se refratario' },
            { situacao: 'MSUD grave recorrente', conduta: 'Transplante hepatico (cura metabolica parcial)' }
          ],
          citations: [{ refId: 'gmdi-msud-protocol-2022' }]
        },
        duracao: 'Tratamento vitalicio'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal no inicio; mensal quando estavel',
        examesControle: [
          'BCAA plasmaticos: 2-3x/semana no inicio, semanal depois',
          'Perfil nutricional regular',
          'Avaliacao neurológica'
        ],
        metasTerapeuticas: [
          'Leucina 75-200 umol/L',
          'Isoleucina e valina normais',
          'Desenvolvimento normal'
        ],
        criteriosEncaminhamento: [
          'Todo caso: centro de referencia EIM',
          'Emergencia se crise metabolica',
          'Considerar transplante hepatico'
        ],
        citations: [{ refId: 'jimd-msud-2021' }]
      },
      prevencao: {
        primaria: [
          'Aconselhamento genetico'
        ],
        secundaria: [
          'Triagem neonatal (incluida na ampliada)',
          'Diagnostico e tratamento em horas previnem sequelas'
        ],
        citations: [{ refId: 'genet-med-msud-2020' }]
      }
    },
    protocolos: ['msud-emergencia', 'msud-dieta'],
    medicamentos: ['tiamina', 'formula-msud'],
    calculadoras: ['bcaa-calculator'],
    rastreamentos: ['triagem-neonatal-msud'],
    citations: [{ refId: 'jimd-msud-2021' }, { refId: 'genet-med-msud-2020' }, { refId: 'gmdi-msud-protocol-2022' }],
    lastUpdate: '2025-01',
    tags: ['MSUD', 'leucinose', 'aminoacidopatia', 'triagem-neonatal', 'emergencia', 'rara']
  },

  // ============================================================================
  // ACIDEMIAS ORGANICAS
  // ============================================================================
  {
    id: 'acidemia-propionica',
    titulo: 'Acidemia Propionica',
    sinonimos: ['PA', 'Propionic Acidemia', 'Deficiencia de Propionil-CoA Carboxilase'],
    doid: 'DOID:857',
    snomedCT: '87629003',
    meshId: 'D056693',
    umlsCui: 'C0268579',
    ordo: ['ORPHA:35'],
    ciap2: ['T99'],
    cid10: ['E71.1'],
    cid11: ['5C50.30'],
    categoria: 'metabolico',
    subcategoria: 'acidemias_organicas',
    quickView: {
      definicao: 'Acidemia organica autossomica recessiva causada por deficiencia de propionil-CoA carboxilase. Acumulo de acido propionico e metabolitos toxicos. Apresentacao neonatal grave ou formas tardias. Risco de cardiomiopatia e AVC de ganglios basais.',
      criteriosDiagnosticos: [
        'Triagem neonatal: C3-carnitina elevada',
        'Acidose metabolica com anion gap aumentado',
        'Hiperamonemia',
        'Cetose',
        'Acido propionico elevado em acidos organicos urinarios',
        '3-OH-propionato, metilcitrato, propionilglicina elevados',
        'Atividade de PCC deficiente'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'EMERGENCIA: jejum proteico, glicose IV alta',
          'Dieta restrita em proteina vitalicia',
          'Restricao de isoleucina, valina, metionina, treonina',
          'Formula especial'
        ],
        farmacologico: [
          'Carnitina 100-300 mg/kg/dia',
          'Metronidazol intermitente (reduz propionato intestinal)',
          'Biotina (testar responsividade)',
          'Crise: benzoato de sodio/fenilbutirato se hiperamonemia'
        ]
      },
      metasTerapeuticas: [
        'Prevenir crises metabolicas',
        'Manter amonia <80 umol/L',
        'Desenvolvimento neuromotor adequado',
        'Prevenir cardiomiopatia'
      ],
      examesIniciais: [
        'Acilcarnitinas plasmaticas (C3)',
        'Acidos organicos urinarios',
        'Amonia, lactato, gasometria',
        'Atividade de PCC',
        'Analise molecular PCCA/PCCB',
        'Ecocardiograma'
      ],
      redFlags: [
        'Letargia, vomitos (crise)',
        'Hiperamonemia grave',
        'Pancitopenia',
        'Cardiomiopatia dilatada',
        'Sinais de AVC de ganglios basais'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:100.000-150.000',
        incidencia: 'Detectada pela triagem neonatal ampliada',
        faixaEtaria: 'Neonatal (grave) ou infancia (tardio)',
        fatoresRisco: [
          'Autossomica recessiva',
          'Consanguinidade',
          'Populacoes isoladas'
        ],
        citations: [{ refId: 'jimd-pa-2021' }]
      },
      fisiopatologia: {
        texto: 'Mutacoes em PCCA ou PCCB causam deficiencia de propionil-CoA carboxilase. Propionil-CoA e metabolitos (metilcitrato, propionilcarnitina) acumulam, inibindo ciclo de Krebs, gliconeogenese e ciclo da ureia. Toxicidade mitocondrial leva a cardiomiopatia e lesao de ganglios basais.',
        citations: [{ refId: 'e-imds-pa-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'NEONATAL: letargia, hipotonia, vomitos',
          'Recusa alimentar',
          'Acidose metabolica grave',
          'Hiperamonemia',
          'TARDIO: crises intermitentes, atraso DNPM'
        ],
        sinaisExameFisico: [
          'Letargia, hipotonia',
          'Desidratacao',
          'Hepatomegalia leve',
          'Sinais de cardiomiopatia'
        ],
        formasClinicas: [
          'NEONATAL GRAVE: primeiros dias de vida',
          'TARDIA: crises com catabolismo',
          'OLIGOSSINTOMATICA: cardiomiopatia isolada'
        ],
        citations: [{ refId: 'jimd-pa-2021' }]
      },
      diagnostico: {
        criterios: [
          'C3-carnitina elevada (triagem/confirmacao)',
          'Acidos organicos urinarios caracteristicos',
          'Atividade de PCC reduzida',
          'Confirmacao molecular'
        ],
        diagnosticoDiferencial: [
          'Acidemia metilmalonica',
          'Deficiencia de holocarboxilase sintetase',
          'Deficiencia de biotinidase',
          'Outras acidemias organicas'
        ],
        examesLaboratoriais: [
          'Acilcarnitinas (C3 elevado)',
          'Acidos organicos urinarios',
          'Amonia, lactato, glicemia',
          'Hemograma (pancitopenia)',
          'Atividade de PCC',
          'Sequenciamento PCCA/PCCB'
        ],
        examesImagem: [
          'RM de encefalo (ganglios basais)',
          'Ecocardiograma'
        ],
        citations: [{ refId: 'e-imds-pa-2020' }]
      },
      tratamento: {
        objetivos: [
          'Prevenir crises',
          'Manter metabolismo controlado',
          'Prevenir complicacoes cronicas'
        ],
        naoFarmacologico: {
          medidas: [
            'Dieta restrita em proteina natural',
            'Formula sem isoleucina, valina, metionina, treonina',
            'Evitar jejum prolongado',
            'Protocolo de emergencia para familias'
          ],
          citations: [{ refId: 'gmdi-pa-protocol-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Suplemento', medicamentos: ['L-carnitina'], posologia: '100-300 mg/kg/dia', observacoes: 'Detoxificacao de propionil-CoA' },
            { classe: 'Antibiotico', medicamentos: ['Metronidazol'], posologia: '10-20 mg/kg/dia, ciclos intermitentes', observacoes: 'Reduz producao intestinal de propionato' }
          ],
          situacoesEspeciais: [
            { situacao: 'Crise com hiperamonemia', conduta: 'Benzoato de sodio, fenilbutirato, hemodialise se refratario' },
            { situacao: 'Cardiomiopatia grave', conduta: 'Transplante cardiaco ou hepatico' }
          ],
          citations: [{ refId: 'gmdi-pa-protocol-2022' }]
        },
        duracao: 'Tratamento vitalicio'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal no primeiro ano; a cada 3 meses depois',
        examesControle: [
          'Acilcarnitinas e amonia regular',
          'Hemograma (pancitopenia)',
          'Ecocardiograma a cada 6-12 meses',
          'RM de encefalo anual',
          'Avaliacao neuropsicologica'
        ],
        metasTerapeuticas: [
          'Amonia <80 umol/L',
          'Ausencia de crises',
          'Funcao cardiaca preservada'
        ],
        criteriosEncaminhamento: [
          'Todo caso: centro de referencia EIM',
          'Cardiologia',
          'Considerar transplante se crises refratarias'
        ],
        citations: [{ refId: 'jimd-pa-2021' }]
      },
      prevencao: {
        primaria: [
          'Aconselhamento genetico'
        ],
        secundaria: [
          'Triagem neonatal ampliada',
          'Diagnostico precoce'
        ],
        citations: [{ refId: 'e-imds-pa-2020' }]
      }
    },
    protocolos: ['pa-emergencia', 'pa-manejo-cronico'],
    medicamentos: ['carnitina', 'metronidazol', 'benzoato-sodio'],
    calculadoras: ['proteina-calculator-pa'],
    rastreamentos: ['triagem-neonatal-pa'],
    citations: [{ refId: 'jimd-pa-2021' }, { refId: 'e-imds-pa-2020' }, { refId: 'gmdi-pa-protocol-2022' }],
    lastUpdate: '2025-01',
    tags: ['acidemia', 'propionica', 'organica', 'carnitina', 'triagem-neonatal', 'rara']
  },

  {
    id: 'acidemia-metilmalonica',
    titulo: 'Acidemia Metilmalonica',
    sinonimos: ['MMA', 'Methylmalonic Acidemia', 'Deficiencia de Metilmalonil-CoA Mutase'],
    doid: 'DOID:9272',
    snomedCT: '360375001',
    meshId: 'D008661',
    umlsCui: 'C0268583',
    ordo: ['ORPHA:28'],
    ciap2: ['T99'],
    cid10: ['E71.1'],
    cid11: ['5C50.31'],
    categoria: 'metabolico',
    subcategoria: 'acidemias_organicas',
    quickView: {
      definicao: 'Acidemia organica causada por defeitos no metabolismo da vitamina B12 ou na metilmalonil-CoA mutase (MUT). Formas B12-responsivas tem melhor prognostico. Risco de DRC progressiva e complicacoes neurologicas.',
      criteriosDiagnosticos: [
        'Triagem neonatal: C3-carnitina elevada',
        'Acido metilmalonico urinario muito elevado',
        'Acidose metabolica, cetose, hiperamonemia',
        'Formas MUT: nao responsivas a B12',
        'Formas CblA/CblB: podem responder a B12',
        'Homocisteina elevada em defeitos de cobalamina C'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'EMERGENCIA: jejum proteico, glicose IV',
          'Dieta restrita em proteina',
          'Formula especial',
          'Evitar jejum'
        ],
        farmacologico: [
          'Hidroxocobalamina IM 1mg/dia (testar responsividade)',
          'Carnitina 100-200 mg/kg/dia',
          'Metronidazol (reducao de propionato)',
          'Crise: scavengers de amonia se hiperamonemia'
        ]
      },
      metasTerapeuticas: [
        'MMA urinario estavel',
        'Amonia <80 umol/L',
        'Funcao renal preservada',
        'Desenvolvimento adequado'
      ],
      examesIniciais: [
        'Acilcarnitinas (C3 elevado)',
        'Acidos organicos urinarios (MMA)',
        'Homocisteina total',
        'Vitamina B12, acido folico',
        'Funcao renal (DRC precoce)',
        'Teste de responsividade a B12',
        'Analise molecular'
      ],
      redFlags: [
        'Crise metabolica (vomitos, letargia)',
        'Hiperamonemia >200 umol/L',
        'Declinio de TFG',
        'Sinais de AVC metabolico',
        'Pancreatite'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:50.000-100.000',
        incidencia: 'Triagem neonatal ampliada detectando mais casos',
        faixaEtaria: 'Neonatal a infancia',
        fatoresRisco: [
          'Autossomica recessiva',
          'Consanguinidade'
        ],
        citations: [{ refId: 'jimd-mma-2021' }]
      },
      fisiopatologia: {
        texto: 'Defeitos em MUT (mutase) ou no metabolismo intracelular de cobalamina (CblA, CblB, CblC, CblD) causam acumulo de metilmalonil-CoA, que e convertido a acido metilmalonico. Toxicidade mitocondrial afeta rim, SNC e medula ossea.',
        citations: [{ refId: 'genet-med-mma-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'NEONATAL: letargia, vomitos, hipotonia',
          'Acidose metabolica grave',
          'Hiperamonemia',
          'CRONICO: atraso DNPM, DRC',
          'CblC: anemia megaloblastica, retinopatia'
        ],
        sinaisExameFisico: [
          'Letargia',
          'Desidratacao',
          'Hepatomegalia',
          'Retinopatia (CblC)'
        ],
        formasClinicas: [
          'MUT0: sem atividade, muito grave',
          'MUT-: atividade residual, menos grave',
          'CblA/CblB: B12-responsivas',
          'CblC: combinada (MMA + homocistinuria)'
        ],
        citations: [{ refId: 'jimd-mma-2021' }]
      },
      diagnostico: {
        criterios: [
          'MMA urinario muito elevado',
          'C3-carnitina elevada',
          'Teste de responsividade a B12',
          'Confirmacao molecular'
        ],
        diagnosticoDiferencial: [
          'Acidemia propionica',
          'Deficiencia de vitamina B12 nutricional',
          'Outras acidemias organicas'
        ],
        examesLaboratoriais: [
          'Acidos organicos urinarios',
          'Acilcarnitinas',
          'Homocisteina',
          'B12, folato',
          'Funcao renal'
        ],
        examesImagem: [
          'RM de encefalo',
          'Ultrassom renal'
        ],
        citations: [{ refId: 'genet-med-mma-2020' }]
      },
      tratamento: {
        objetivos: [
          'Reduzir MMA',
          'Prevenir crises',
          'Preservar funcao renal'
        ],
        naoFarmacologico: {
          medidas: [
            'Dieta restrita em proteina',
            'Formula especial',
            'Evitar jejum e catabolismo'
          ],
          citations: [{ refId: 'gmdi-mma-protocol-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Vitamina', medicamentos: ['Hidroxocobalamina'], posologia: '1 mg IM diario ou 2-3x/semana', observacoes: 'Todas as formas; essencial em B12-responsivas' },
            { classe: 'Suplemento', medicamentos: ['L-carnitina'], posologia: '100-200 mg/kg/dia', observacoes: 'Detoxificacao' }
          ],
          situacoesEspeciais: [
            { situacao: 'DRC progressiva', conduta: 'Transplante renal ou hepatorrenal' },
            { situacao: 'Crises refratarias', conduta: 'Transplante hepatico' }
          ],
          citations: [{ refId: 'gmdi-mma-protocol-2022' }]
        },
        duracao: 'Vitalicio'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal a cada 3 meses',
        examesControle: [
          'MMA urinario',
          'Funcao renal frequente',
          'Hemograma',
          'Ecocardiograma anual'
        ],
        metasTerapeuticas: [
          'MMA estavel',
          'TFG preservada',
          'Ausencia de crises'
        ],
        criteriosEncaminhamento: [
          'Centro EIM',
          'Nefrologia',
          'Considerar transplante'
        ],
        citations: [{ refId: 'jimd-mma-2021' }]
      },
      prevencao: {
        primaria: [
          'Aconselhamento genetico'
        ],
        secundaria: [
          'Triagem neonatal'
        ],
        citations: [{ refId: 'genet-med-mma-2020' }]
      }
    },
    protocolos: ['mma-emergencia', 'mma-manejo'],
    medicamentos: ['hidroxocobalamina', 'carnitina'],
    calculadoras: ['mma-calculator'],
    rastreamentos: ['triagem-neonatal-mma'],
    citations: [{ refId: 'jimd-mma-2021' }, { refId: 'genet-med-mma-2020' }, { refId: 'gmdi-mma-protocol-2022' }],
    lastUpdate: '2025-01',
    tags: ['MMA', 'acidemia', 'B12', 'cobalamina', 'DRC', 'triagem-neonatal', 'rara']
  },

  // ============================================================================
  // DOENCAS DO METABOLISMO DE METAIS
  // ============================================================================
  {
    id: 'doenca-wilson',
    titulo: 'Doenca de Wilson',
    sinonimos: ['Wilson Disease', 'Degeneracao Hepatolenticular', 'Deficiencia de ATP7B'],
    doid: 'DOID:893',
    snomedCT: '88518009',
    meshId: 'D006527',
    umlsCui: 'C0019202',
    ordo: ['ORPHA:905'],
    ciap2: ['T99'],
    cid10: ['E83.0'],
    cid11: ['5C64.00'],
    categoria: 'metabolico',
    subcategoria: 'metabolismo_metais',
    quickView: {
      definicao: 'Doenca autossomica recessiva do metabolismo do cobre causada por mutacoes em ATP7B. Acumulo de cobre em figado, cerebro e outros orgaos. Manifestacoes hepaticas, neurologicas e psiquiatricas. Tratavel se diagnosticada precocemente.',
      criteriosDiagnosticos: [
        'Anel de Kayser-Fleischer (exame com lampada de fenda)',
        'Ceruloplasmina serica baixa (<20 mg/dL)',
        'Cobre urinario 24h elevado (>100 mcg/dia; >40 mcg em criancas)',
        'Cobre hepatico >250 mcg/g peso seco',
        'RM cerebral: sinal do panda (mesencefalo)',
        'Score de Leipzig >=4 confirma diagnostico',
        'Mutacoes em ATP7B (confirmatorio)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Dieta pobre em cobre (evitar visceras, frutos do mar, nozes, chocolate)',
          'Nao usar utensilios de cobre',
          'Triagem familiar obrigatoria'
        ],
        farmacologico: [
          'D-PENICILAMINA 1-1,5g/dia (quelante de primeira linha)',
          'TRIENTINA 900-1500 mg/dia (alternativa)',
          'ZINCO 150 mg/dia (manutencao ou monoterapia leve)',
          'Terapia combinada: quelante + zinco'
        ]
      },
      metasTerapeuticas: [
        'Cobre urinario 24h em tratamento: 200-500 mcg/dia',
        'Cobre livre <10 mcg/dL',
        'Melhora clinica neurologica/hepatica',
        'Estabilizacao da funcao hepatica'
      ],
      examesIniciais: [
        'Ceruloplasmina serica',
        'Cobre serico total e livre',
        'Cobre urinario 24h (basal e pos-penicilamina)',
        'Funcao hepatica',
        'Exame oftalmologico (lampada de fenda)',
        'RM de encefalo',
        'Biopsia hepatica (cobre tecidual)',
        'Analise molecular ATP7B'
      ],
      redFlags: [
        'Insuficiencia hepatica aguda (pode requerer transplante urgente)',
        'Anemia hemolitica Coombs-negativa',
        'Piora neurologica paradoxal com tratamento',
        'Nao adesao (recaida potencialmente fatal)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:30.000; portadores 1:90',
        incidencia: 'Subdiagnosticada',
        faixaEtaria: 'Tipicamente 5-35 anos; hepatico mais precoce',
        fatoresRisco: [
          'Autossomica recessiva',
          'Historia familiar',
          'Consanguinidade'
        ],
        citations: [{ refId: 'easl-wilson-2022' }]
      },
      fisiopatologia: {
        texto: 'Mutacoes em ATP7B prejudicam excrecao biliar de cobre e incorporacao a ceruloplasmina. Cobre acumula em figado, causando hepatite cronica e cirrose. Deposicao em ganglios basais causa distonia, tremor, parkinsonismo. Cobre livre causa hemolise.',
        citations: [{ refId: 'lancet-wilson-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'HEPATICO: hepatite cronica, cirrose, insuficiencia aguda',
          'NEUROLOGICO: tremor, distonia, disartria, disfagia',
          'PSIQUIATRICO: depressao, psicose, alteracao comportamento',
          'Anel de Kayser-Fleischer',
          'Anemia hemolitica'
        ],
        sinaisExameFisico: [
          'Anel de Kayser-Fleischer',
          'Hepatomegalia ou figado reduzido',
          'Esplenomegalia',
          'Tremor, distonia',
          'Facies parkinsoniana'
        ],
        formasClinicas: [
          'HEPATICA: predominante em criancas',
          'NEUROLOGICA: predominante em adultos jovens',
          'MISTA',
          'FULMINANTE: rara, hemolise + IH aguda'
        ],
        citations: [{ refId: 'easl-wilson-2022' }]
      },
      diagnostico: {
        criterios: [
          'Score de Leipzig >=4',
          'Combinacao de achados clinicos e laboratoriais',
          'Confirmacao molecular'
        ],
        diagnosticoDiferencial: [
          'Hepatites virais',
          'Hepatite autoimune',
          'Doenca de Parkinson jovem',
          'Distonia primaria',
          'Esquizofrenia'
        ],
        examesLaboratoriais: [
          'Ceruloplasmina (<20 mg/dL)',
          'Cobre serico total e livre',
          'Cobre urinario 24h',
          'Funcao hepatica',
          'Hemograma, reticulocitos'
        ],
        examesImagem: [
          'RM de encefalo (sinal do panda)',
          'Ultrassom hepatico',
          'Elastografia hepatica'
        ],
        outrosExames: [
          'Exame oftalmologico',
          'Biopsia hepatica (cobre tecidual)',
          'Sequenciamento ATP7B'
        ],
        citations: [{ refId: 'lancet-wilson-2021' }]
      },
      tratamento: {
        objetivos: [
          'Remover excesso de cobre',
          'Prevenir reacumulo',
          'Estabilizar doenca hepatica e neurologica'
        ],
        naoFarmacologico: {
          medidas: [
            'Dieta pobre em cobre',
            'Evitar agua de poco com cobre',
            'Triagem de irmaos'
          ],
          citations: [{ refId: 'aasld-wilson-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Quelante', medicamentos: ['D-penicilamina'], posologia: '1-1,5g/dia em doses divididas, jejum', observacoes: 'Suplementar piridoxina; efeitos adversos frequentes' },
            { classe: 'Quelante alternativo', medicamentos: ['Trientina'], posologia: '900-1500 mg/dia', observacoes: 'Melhor tolerada que penicilamina' }
          ],
          segundaLinha: [
            { classe: 'Bloqueador de absorcao', medicamentos: ['Zinco (acetato ou gluconato)'], posologia: '150 mg Zn elementar/dia em 3 doses', observacoes: 'Manutencao ou monoterapia em assintomaticos' }
          ],
          situacoesEspeciais: [
            { situacao: 'Insuficiencia hepatica aguda', conduta: 'Transplante hepatico de urgencia' },
            { situacao: 'Gravidez', conduta: 'Manter tratamento (menor dose eficaz); zinco preferido' },
            { situacao: 'Piora neurologica inicial', conduta: 'Nao interromper; pode ocorrer em 10-50% no inicio' }
          ],
          citations: [{ refId: 'aasld-wilson-2022' }]
        },
        duracao: 'Tratamento vitalicio; NUNCA interromper'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal no inicio; a cada 3-6 meses quando estavel',
        examesControle: [
          'Cobre urinario 24h a cada 3-6 meses',
          'Funcao hepatica',
          'Hemograma',
          'Exame neurologico',
          'Zinco serico (se em uso)'
        ],
        metasTerapeuticas: [
          'Cobre urinario 200-500 mcg/24h em quelacao',
          'Cobre livre <10 mcg/dL',
          'Estabilizacao clinica'
        ],
        criteriosEncaminhamento: [
          'Hepatologia',
          'Neurologia se sintomas neurologicos',
          'Genetica para aconselhamento familiar'
        ],
        citations: [{ refId: 'easl-wilson-2022' }]
      },
      prevencao: {
        primaria: [
          'Aconselhamento genetico'
        ],
        secundaria: [
          'Triagem familiar OBRIGATORIA (irmaos: 25% risco)',
          'Tratamento de assintomaticos previne doenca'
        ],
        citations: [{ refId: 'lancet-wilson-2021' }]
      }
    },
    protocolos: ['wilson-manejo', 'wilson-triagem-familiar'],
    medicamentos: ['d-penicilamina', 'trientina', 'zinco'],
    calculadoras: ['leipzig-score-wilson'],
    rastreamentos: [],
    citations: [{ refId: 'easl-wilson-2022' }, { refId: 'lancet-wilson-2021' }, { refId: 'aasld-wilson-2022' }],
    lastUpdate: '2025-01',
    tags: ['wilson', 'cobre', 'quelante', 'hepatico', 'neurologico', 'rara']
  },

  {
    id: 'hemocromatose-hereditaria',
    titulo: 'Hemocromatose Hereditaria',
    sinonimos: ['HH', 'Hereditary Hemochromatosis', 'Sobrecarga de Ferro Genetica', 'HFE-related'],
    doid: 'DOID:2352',
    snomedCT: '399144008',
    meshId: 'D006432',
    umlsCui: 'C0018995',
    ordo: ['ORPHA:139498'],
    ciap2: ['T99'],
    cid10: ['E83.1'],
    cid11: ['5C64.10'],
    categoria: 'metabolico',
    subcategoria: 'metabolismo_metais',
    quickView: {
      definicao: 'Doenca autossomica recessiva do metabolismo do ferro, mais comumente por mutacao C282Y homozigota no gene HFE. Absorcao intestinal excessiva de ferro causa deposicao em figado, coracao, pancreas e outras glandulas.',
      criteriosDiagnosticos: [
        'Saturacao de transferrina elevada (>45%)',
        'Ferritina serica elevada (>300 ng/mL homens; >200 mulheres)',
        'Genotipo HFE: C282Y/C282Y (mais comum)',
        'RM hepatica: sobrecarga de ferro (LIC elevado)',
        'Manifestacoes: hepatopatia, DM, artropatia, hipogonadismo, cardiomiopatia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'FLEBOTOMIA terapeutica (500 mL/sessao)',
          'Fase de inducao: semanal ate ferritina <50 ng/mL',
          'Fase de manutencao: a cada 2-4 meses',
          'Evitar suplementos de ferro e vitamina C em excesso'
        ],
        farmacologico: [
          'Quelantes de ferro (deferasirox) se flebotomia impossivel',
          'Tratamento de complicacoes (DM, hipotireoidismo, etc.)'
        ]
      },
      metasTerapeuticas: [
        'Ferritina serica 50-100 ng/mL',
        'Saturacao de transferrina <50%',
        'Prevencao de cirrose e complicacoes',
        'Melhora de sintomas (fadiga, artralgia)'
      ],
      examesIniciais: [
        'Ferro serico, TIBC, saturacao de transferrina',
        'Ferritina serica',
        'Genotipagem HFE (C282Y, H63D)',
        'Funcao hepatica',
        'Glicemia, HbA1c',
        'RM hepatica (se ferritina >1000)',
        'Elastografia hepatica'
      ],
      redFlags: [
        'Ferritina >1000 ng/mL (risco de cirrose)',
        'Cirrose hepatica',
        'Cardiomiopatia',
        'Hepatocarcinoma',
        'Diabetes descompensado'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:200-300 em caucasianos (C282Y homozigoto)',
        incidencia: 'Penetrancia incompleta; nem todos desenvolvem doenca',
        faixaEtaria: 'Sintomas tipicamente 40-60 anos (homens antes)',
        fatoresRisco: [
          'Ancestralidade europeia/celta',
          'Masculino (mulheres protegidas por menstruacao)',
          'Uso de suplementos de ferro/vitamina C'
        ],
        citations: [{ refId: 'aasld-hemochromatosis-2022' }]
      },
      fisiopatologia: {
        texto: 'Mutacao HFE C282Y causa reducao de hepcidina, hormonio regulador do ferro. Absorcao intestinal aumentada leva a deposicao progressiva em hepatocitos, cardiomiocitos, celulas pancreaticas e hipofise. Estresse oxidativo e fibrose.',
        citations: [{ refId: 'nejm-hemochromatosis-2019' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Fadiga cronica',
          'Artralgia (MCP 2 e 3 - aperto de mao doloroso)',
          'Hepatomegalia, cirrose',
          'Diabetes mellitus (diabetes bronzeado)',
          'Hiperpigmentacao cutanea',
          'Cardiomiopatia, arritmias',
          'Hipogonadismo, impotencia'
        ],
        sinaisExameFisico: [
          'Hepatomegalia',
          'Hiperpigmentacao',
          'Artropatia de maos',
          'Sinais de cirrose (se avancada)'
        ],
        formasClinicas: [
          'HFE-related (tipo 1): C282Y/C282Y mais comum',
          'Juvenil (tipos 2A/2B): hepcidina/hemojuvelina',
          'Tipo 3: TfR2',
          'Tipo 4: ferroportina (dominante)'
        ],
        citations: [{ refId: 'aasld-hemochromatosis-2022' }]
      },
      diagnostico: {
        criterios: [
          'Saturacao transferrina >45% + ferritina elevada',
          'Genotipo HFE confirma tipo 1',
          'RM ou biopsia quantifica sobrecarga'
        ],
        diagnosticoDiferencial: [
          'Sobrecarga de ferro secundaria (transfusional)',
          'Hepatopatia alcoolica',
          'NAFLD',
          'Inflamacao cronica (ferritina elevada)'
        ],
        examesLaboratoriais: [
          'Saturacao de transferrina',
          'Ferritina serica',
          'Genotipagem HFE',
          'Funcao hepatica',
          'Glicemia, hormonios'
        ],
        examesImagem: [
          'RM hepatica com quantificacao de ferro (LIC)',
          'Elastografia hepatica',
          'Ecocardiograma'
        ],
        outrosExames: [
          'Biopsia hepatica (se duvida ou ferritina >1000)'
        ],
        citations: [{ refId: 'nejm-hemochromatosis-2019' }]
      },
      tratamento: {
        objetivos: [
          'Reduzir estoques de ferro',
          'Prevenir complicacoes',
          'Manter ferritina em faixa alvo'
        ],
        naoFarmacologico: {
          medidas: [
            'Flebotomia terapeutica 500 mL',
            'Inducao: 1x/semana ate ferritina <50',
            'Manutencao: a cada 2-4 meses',
            'Evitar alcool',
            'Evitar suplementos de ferro e vit C'
          ],
          citations: [{ refId: 'easl-iron-overload-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Quelante (se flebotomia impossivel)', medicamentos: ['Deferasirox'], posologia: '10-20 mg/kg/dia', observacoes: 'Indicado se anemia, acesso venoso impossivel' }
          ],
          situacoesEspeciais: [
            { situacao: 'Cirrose estabelecida', conduta: 'Rastreio de CHC a cada 6 meses' },
            { situacao: 'Cardiomiopatia', conduta: 'Quelacao intensiva; flebotomia frequente' }
          ],
          citations: [{ refId: 'easl-iron-overload-2022' }]
        },
        duracao: 'Manutencao vitalicia'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada flebotomia inicialmente; depois a cada 3-6 meses',
        examesControle: [
          'Hemograma antes de cada flebotomia',
          'Ferritina a cada 1-3 meses (inducao)',
          'Ferritina a cada 3-6 meses (manutencao)',
          'Funcao hepatica anual',
          'Elastografia anual'
        ],
        metasTerapeuticas: [
          'Ferritina 50-100 ng/mL',
          'Saturacao transferrina <50%',
          'Hb adequada para flebotomia'
        ],
        criteriosEncaminhamento: [
          'Hepatologia se cirrose',
          'Cardiologia se cardiomiopatia',
          'Endocrinologia se DM, hipogonadismo'
        ],
        citations: [{ refId: 'aasld-hemochromatosis-2022' }]
      },
      prevencao: {
        primaria: [
          'Triagem familiar de parentes de primeiro grau'
        ],
        secundaria: [
          'Diagnostico precoce previne complicacoes',
          'Tratamento antes de cirrose tem excelente prognostico'
        ],
        citations: [{ refId: 'nejm-hemochromatosis-2019' }]
      }
    },
    protocolos: ['hemocromatose-flebotomia'],
    medicamentos: ['deferasirox'],
    calculadoras: ['liver-iron-calculator'],
    rastreamentos: ['triagem-hfe-familiar'],
    citations: [{ refId: 'aasld-hemochromatosis-2022' }, { refId: 'nejm-hemochromatosis-2019' }, { refId: 'easl-iron-overload-2022' }],
    lastUpdate: '2025-01',
    tags: ['hemocromatose', 'ferro', 'HFE', 'flebotomia', 'cirrose', 'rara']
  }
];
