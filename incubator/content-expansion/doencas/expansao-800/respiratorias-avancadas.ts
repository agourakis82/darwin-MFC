/**
 * DOENCAS RESPIRATORIAS AVANCADAS - DARWIN-MFC EXPANSAO 800
 * ==========================================================
 * Doencas respiratorias cronicas, intersticiais e raras
 */

import { Doenca } from '@/lib/types/doenca';

export const respiratoriasAvancadas: Doenca[] = [
  // ============================================================================
  // DOENCAS PULMONARES INTERSTICIAIS
  // ============================================================================
  {
    id: 'fibrose-pulmonar-idiopatica',
    titulo: 'Fibrose Pulmonar Idiopatica',
    sinonimos: ['FPI', 'IPF', 'Alveolite Fibrosante Criptogenica'],
    doid: 'DOID:0050156',
    snomedCT: '700250006',
    meshId: 'D054990',
    umlsCui: 'C1800706',
    ordo: ['ORPHA:2032'],
    ciap2: ['R99'],
    cid10: ['J84.1'],
    cid11: ['CB03.4'],
    categoria: 'respiratorio',
    subcategoria: 'intersticial',
    quickView: {
      definicao: 'Pneumonia intersticial fibrosante cronica, progressiva, de causa desconhecida, limitada aos pulmoes. Padrao histologico de pneumonia intersticial usual (PIU). Sobrevida media 3-5 anos.',
      criteriosDiagnosticos: [
        'Exclusao de outras causas de doenca intersticial',
        'TCAR: padrao PIU (faveolamento, bronquiectasias de tracao, distribuicao basal/subpleural)',
        'Se TCAR inconclusiva: biopsia pulmonar cirurgica',
        'Idade >50 anos (tipico)',
        'Predominio masculino',
        'Historia de tabagismo frequente'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Cessacao do tabagismo',
          'Reabilitacao pulmonar',
          'Oxigenoterapia domiciliar se hipoxemia',
          'Vacinacao (influenza, pneumococo)',
          'Avaliacao para transplante pulmonar'
        ],
        farmacologico: [
          'ANTIFIBROTICOS (modificam progressao):',
          'Pirfenidona 801mg 3x/dia (com alimentos)',
          'Nintedanibe 150mg 2x/dia',
          'NAO usar corticoides ou imunossupressores (sem beneficio, potencial dano)'
        ]
      },
      metasTerapeuticas: [
        'Reduzir declinio da CVF',
        'Manter qualidade de vida',
        'Prevenir exacerbacoes agudas',
        'Preparar para transplante se elegivel'
      ],
      examesIniciais: [
        'TCAR de torax (alta resolucao)',
        'Espirometria com difusao (DLCO)',
        'Gasometria arterial',
        'TC6M (teste de caminhada 6 minutos)',
        'BNP/NT-proBNP (hipertensao pulmonar)',
        'Autoanticorpos (FAN, FR, anti-CCP - excluir colagenose)'
      ],
      redFlags: [
        'Declinio rapido da CVF (>10% em 6 meses)',
        'Exacerbacao aguda (piora subita sem causa)',
        'Hipertensao pulmonar grave',
        'Hipoxemia severa em repouso',
        'SpO2 <88% no TC6M'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '14-43/100.000',
        incidencia: '6-16/100.000/ano',
        mortalidade: 'Sobrevida mediana 3-5 anos; principal causa de morte: insuficiencia respiratoria',
        faixaEtaria: 'Tipico >50 anos; media ao diagnostico 66 anos',
        fatoresRisco: [
          'Idade avancada',
          'Sexo masculino',
          'Tabagismo (atual ou pregresso)',
          'Exposicoes ambientais/ocupacionais',
          'Refluxo gastroesofagico',
          'Mutacoes em genes de telomerase (TERT, TERC)'
        ],
        citations: [{ refId: 'ats-ers-ipf-2022' }]
      },
      fisiopatologia: {
        texto: 'Lesao epitelial alveolar repetida em individuo suscetivel leva a reparo aberrante com fibrose progressiva. Ativacao de fibroblastos, deposicao excessiva de matriz extracelular, formacao de focos fibroblasticos. Via TGF-beta central.',
        citations: [{ refId: 'nejm-ipf-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dispneia progressiva aos esforcos',
          'Tosse seca persistente',
          'Fadiga',
          'Perda de peso'
        ],
        sinaisExameFisico: [
          'Estertores crepitantes bibasais (velcro)',
          'Baqueteamento digital (40-75%)',
          'Cianose (fases avancadas)',
          'Sinais de cor pulmonale (tardio)'
        ],
        formasClinicas: [
          'FPI tipica (progressao lenta)',
          'FPI com exacerbacao aguda',
          'FPI rapidamente progressiva'
        ],
        citations: [{ refId: 'ats-ers-ipf-2022' }]
      },
      diagnostico: {
        criterios: [
          'Criterios ATS/ERS/JRS/ALAT 2022',
          'Exclusao de causas conhecidas (medicamentos, exposicoes, colagenoses)',
          'TCAR com padrao PIU definitivo = diagnostico sem biopsia',
          'TCAR provavel PIU + histologia PIU = diagnostico',
          'Discussao multidisciplinar (MDT) obrigatoria em casos incertos'
        ],
        diagnosticoDiferencial: [
          'Pneumonite de hipersensibilidade cronica',
          'Doenca intersticial associada a colagenose',
          'Asbestose',
          'Pneumonia intersticial nao especifica (PINE)',
          'Fibrose pulmonar relacionada a tabagismo'
        ],
        examesLaboratoriais: [
          'FAN, anti-CCP, FR, anti-Jo1, anti-Scl70',
          'Hemograma, funcao hepatica e renal',
          'BNP/NT-proBNP',
          'KL-6, SP-D (biomarcadores)'
        ],
        examesImagem: [
          'TCAR de torax: faveolamento, bronquiectasias de tracao, padrao reticular basal subpleural',
          'Gradiente apico-basal tipico'
        ],
        citations: [{ refId: 'ats-ers-ipf-2022' }]
      },
      tratamento: {
        objetivos: [
          'Reduzir velocidade de progressao',
          'Manter funcao pulmonar',
          'Melhorar qualidade de vida',
          'Prevenir exacerbacoes'
        ],
        naoFarmacologico: {
          medidas: [
            'Cessacao tabagica absoluta',
            'Reabilitacao pulmonar supervisionada',
            'Oxigenoterapia (SpO2 <88%)',
            'Tratamento de comorbidades (DRGE, apneia)',
            'Suporte nutricional',
            'Cuidados paliativos quando indicado'
          ],
          citations: [{ refId: 'ats-ers-ipf-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antifibroticos', medicamentos: ['Pirfenidona', 'Nintedanibe'], posologia: 'Pirfenidona 801mg 3x/dia; Nintedanibe 150mg 2x/dia', observacoes: 'Reduzem declinio da CVF em ~50%' }
          ],
          situacoesEspeciais: [
            { situacao: 'Exacerbacao aguda', conduta: 'Corticoide em pulso (controverso); suporte; antibiotico empirico' },
            { situacao: 'Hipertensao pulmonar associada', conduta: 'Considerar terapia especifica; encaminhar centro especializado' }
          ],
          citations: [{ refId: 'nejm-ipf-2021' }]
        },
        duracao: 'Continuo ate transplante ou cuidados paliativos exclusivos'
      },
      acompanhamento: {
        frequenciaConsultas: 'Pneumologista a cada 3-4 meses',
        examesControle: [
          'Espirometria com DLCO a cada 3-6 meses',
          'TC6M a cada 6 meses',
          'TCAR anual ou se mudanca clinica',
          'Ecocardiograma anual'
        ],
        metasTerapeuticas: [
          'Declinio CVF <5% ao ano',
          'Manter SpO2 >88% em repouso e exercicio',
          'Qualidade de vida preservada'
        ],
        criteriosEncaminhamento: [
          'Todos: pneumologista especializado em intersticial',
          'Transplante: idade <65-70 anos, CVF <80% ou DLCO <40%',
          'Cuidados paliativos: doenca avancada refrataria'
        ],
        citations: [{ refId: 'ats-ers-ipf-2022' }]
      },
      prevencao: {
        primaria: [
          'Cessacao tabagica',
          'Evitar exposicoes ocupacionais nocivas'
        ],
        secundaria: [
          'Diagnostico precoce em populacao de risco',
          'Inicio precoce de antifibroticos'
        ],
        citations: [{ refId: 'ats-ers-ipf-2022' }]
      }
    },
    protocolos: ['fpi-antifibroticos', 'transplante-pulmonar'],
    medicamentos: ['pirfenidona', 'nintedanibe'],
    calculadoras: ['gap-index', 'du-bois-ipf'],
    rastreamentos: [],
    citations: [{ refId: 'ats-ers-ipf-2022' }, { refId: 'nejm-ipf-2021' }],
    lastUpdate: '2026-01',
    tags: ['fibrose', 'intersticial', 'PIU', 'antifibrotico', 'transplante']
  },

  {
    id: 'sarcoidose-pulmonar',
    titulo: 'Sarcoidose Pulmonar',
    sinonimos: ['Sarcoidose', 'Doenca de Besnier-Boeck-Schaumann'],
    doid: 'DOID:11335',
    snomedCT: '31541009',
    meshId: 'D012507',
    umlsCui: 'C0036202',
    ciap2: ['R99'],
    cid10: ['D86.0'],
    cid11: ['4B20.0'],
    categoria: 'respiratorio',
    subcategoria: 'intersticial',
    quickView: {
      definicao: 'Doenca granulomatosa multissistemica de etiologia desconhecida, caracterizada por granulomas nao caseosos. Acometimento pulmonar em >90% dos casos. Curso variavel: remissao espontanea ou doenca cronica.',
      criteriosDiagnosticos: [
        'Quadro clinico-radiologico compativel',
        'Evidencia histologica de granuloma nao caseoso',
        'Exclusao de outras causas de granulomatose',
        'Estadiamento radiologico (0-IV)',
        'Acometimento multissistemica comum'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Observacao em casos assintomaticos estagio I',
          'Cessacao tabagica',
          'Evitar exposicao solar excessiva (hipercalcemia)',
          'Reabilitacao pulmonar se sintomatico'
        ],
        farmacologico: [
          'INDICACOES: doenca progressiva, sintomatica, orgao nobre',
          'Prednisona 20-40mg/dia por 4-6 semanas, desmame lento',
          'POUPADORES: Metotrexato 10-15mg/semana',
          'Azatioprina 50-200mg/dia',
          'REFRATARIO: Infliximabe, Adalimumabe'
        ]
      },
      metasTerapeuticas: [
        'Preservar funcao pulmonar',
        'Controlar sintomas',
        'Prevenir lesao de orgaos nobres',
        'Minimizar efeitos adversos do tratamento'
      ],
      examesIniciais: [
        'Radiografia e TCAR de torax',
        'Espirometria com DLCO',
        'Hemograma, calcio serico e urinario',
        'Funcao hepatica e renal',
        'ECG e Holter (sarcoidose cardiaca)',
        'Exame oftalmologico',
        'Dosagem de ECA (enzima conversora)'
      ],
      redFlags: [
        'Sarcoidose cardiaca (arritmias, bloqueios)',
        'Neurossarcoidose',
        'Hipercalcemia grave',
        'Insuficiencia respiratoria',
        'Fibrose pulmonar progressiva (estagio IV)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-40/100.000 (varia por etnia e regiao)',
        incidencia: '5-40/100.000/ano',
        faixaEtaria: 'Pico 25-35 anos e 45-65 anos',
        fatoresRisco: [
          'Afrodescendentes (maior incidencia e gravidade)',
          'Norte europeus (maior incidencia)',
          'Historia familiar',
          'Exposicoes ambientais (controverso)'
        ],
        citations: [{ refId: 'lancet-sarcoidosis-2022' }]
      },
      fisiopatologia: {
        texto: 'Resposta imune exagerada Th1/Th17 a antigeno desconhecido em individuo geneticamente predisposto. Formacao de granulomas nao caseosos com celulas epitelioides e gigantes multinucleadas. Resolucao ou progressao para fibrose.',
        citations: [{ refId: 'nejm-sarcoidosis-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Tosse seca',
          'Dispneia aos esforcos',
          'Dor toracica',
          'Fadiga',
          'Sintomas sistemicos (febre, emagrecimento)',
          'Lesoes cutaneas (eritema nodoso, lupus pernio)'
        ],
        sinaisExameFisico: [
          'Linfadenopatia (hilar bilateral tipica)',
          'Estertores (incomum, exceto fibrose)',
          'Lesoes cutaneas',
          'Hepatoesplenomegalia',
          'Uveite (exame oftalmologico)'
        ],
        formasClinicas: [
          'Sindrome de Lofgren (eritema nodoso + artrite + adenopatia hilar) - bom prognostico',
          'Sarcoidose cronica progressiva',
          'Sarcoidose fibrosante'
        ],
        citations: [{ refId: 'lancet-sarcoidosis-2022' }]
      },
      diagnostico: {
        criterios: [
          'Quadro clinico-radiologico sugestivo',
          'Histologia: granuloma nao caseoso',
          'Exclusao: tuberculose, histoplasmose, outras',
          'Estadiamento: 0 (normal), I (adenopatia), II (adenopatia + infiltrado), III (infiltrado sem adenopatia), IV (fibrose)'
        ],
        diagnosticoDiferencial: [
          'Tuberculose',
          'Linfoma',
          'Histoplasmose',
          'Beriliose',
          'Pneumonite de hipersensibilidade',
          'Carcinoma bronquioloalveolar'
        ],
        examesLaboratoriais: [
          'ECA (elevada em 60%, pouco especifica)',
          'Calcio serico e urina 24h',
          'Hemograma, VHS',
          'Funcao hepatica'
        ],
        examesImagem: [
          'RX torax: adenopatia hilar bilateral simetrica',
          'TCAR: nodulos perilinfaticos, adenopatia, vidro fosco',
          'PET-CT: util para avaliar atividade e locais de biopsia'
        ],
        outrosExames: [
          'Broncoscopia com LBA (linfocitose, CD4/CD8 >3,5)',
          'Biopsia transbrônquica ou EBUS',
          'Biopsia de pele ou linfonodo periferico se disponivel'
        ],
        citations: [{ refId: 'nejm-sarcoidosis-2020' }]
      },
      tratamento: {
        objetivos: [
          'Controlar inflamacao ativa',
          'Preservar funcao de orgaos',
          'Melhorar qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Observacao em assintomaticos estagio I (70% remissao espontanea)',
            'Cessacao tabagica',
            'Protecao solar',
            'Reabilitacao pulmonar'
          ],
          citations: [{ refId: 'ats-sarcoidosis-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticosteroide', medicamentos: ['Prednisona'], posologia: '20-40mg/dia por 4-6 semanas, desmame em 6-12 meses', observacoes: 'Primeira linha quando tratamento indicado' }
          ],
          segundaLinha: [
            { classe: 'Imunossupressor poupador', medicamentos: ['Metotrexato', 'Azatioprina', 'Leflunomida'], posologia: 'MTX 10-15mg/sem; AZA 2mg/kg/dia', observacoes: 'Para poupar corticoide ou refratarios' }
          ],
          situacoesEspeciais: [
            { situacao: 'Refratario a imunossupressores', conduta: 'Anti-TNF: Infliximabe 3-5mg/kg, Adalimumabe' },
            { situacao: 'Sarcoidose cardiaca', conduta: 'Tratamento agressivo precoce; considerar CDI' }
          ],
          citations: [{ refId: 'ats-sarcoidosis-2020' }]
        },
        duracao: 'Minimo 12 meses; muitos requerem tratamento prolongado'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses; mais frequente se em tratamento',
        examesControle: [
          'Espirometria a cada 3-6 meses',
          'TCAR anual ou se mudanca',
          'Calcio, funcao hepatica, ECG periodicos',
          'Oftalmologia anual'
        ],
        metasTerapeuticas: [
          'Estabilizacao da CVF',
          'Controle de sintomas',
          'Ausencia de progressao radiologica'
        ],
        criteriosEncaminhamento: [
          'Pneumologista: todos os casos',
          'Cardiologista: suspeita de acometimento cardiaco',
          'Neurologista: neurossarcoidose',
          'Transplante: fibrose avancada refrataria'
        ],
        citations: [{ refId: 'lancet-sarcoidosis-2022' }]
      }
    },
    protocolos: ['sarcoidose-tratamento', 'sarcoidose-cardiaca'],
    medicamentos: ['prednisona', 'metotrexato', 'azatioprina', 'infliximabe'],
    calculadoras: ['scadding-staging'],
    rastreamentos: [],
    citations: [{ refId: 'lancet-sarcoidosis-2022' }, { refId: 'nejm-sarcoidosis-2020' }],
    lastUpdate: '2026-01',
    tags: ['sarcoidose', 'granuloma', 'intersticial', 'corticoide']
  },

  {
    id: 'bronquiectasias-nao-fc',
    titulo: 'Bronquiectasias nao-Fibrose Cistica',
    sinonimos: ['Bronquiectasias', 'NCFB', 'Non-CF Bronchiectasis'],
    doid: 'DOID:9563',
    snomedCT: '12295008',
    meshId: 'D001987',
    umlsCui: 'C0006267',
    ciap2: ['R99'],
    cid10: ['J47'],
    cid11: ['CA20'],
    categoria: 'respiratorio',
    subcategoria: 'vias_aereas',
    quickView: {
      definicao: 'Dilatacao bronquica anormal e permanente, caracterizada por inflamacao cronica, infeccoes recorrentes e producao de secrecao. Circulo vicioso: infeccao-inflamacao-dano estrutural.',
      criteriosDiagnosticos: [
        'TCAR: dilatacao bronquica (razao bronquio/arteria >1)',
        'Ausencia de afilamento bronquico',
        'Bronquios visiveis na periferia do pulmao',
        'Tosse cronica produtiva',
        'Infeccoes respiratorias de repeticao',
        'Investigar etiologia subjacente'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Fisioterapia respiratoria diaria (drenagem postural, flutter)',
          'Exercicio fisico regular',
          'Cessacao tabagica',
          'Vacinacao (influenza, pneumococo)'
        ],
        farmacologico: [
          'EXACERBACAO: antibiotico guiado por cultura 14 dias',
          'COLONIZACAO Pseudomonas: erradicacao (ciprofloxacino + tobramicina inalatoria)',
          'MACROLIDEO: Azitromicina 250-500mg 3x/semana (>=3 exacerbacoes/ano)',
          'BRONCODILATADOR: se obstrucao ao fluxo',
          'Solucao salina hipertonica 7% inalatoria'
        ]
      },
      metasTerapeuticas: [
        'Reduzir exacerbacoes',
        'Melhorar clearance mucociliar',
        'Prevenir progressao',
        'Erradicar Pseudomonas se colonizado'
      ],
      examesIniciais: [
        'TCAR de torax',
        'Espirometria',
        'Cultura de escarro',
        'Imunoglobulinas (IgG, IgA, IgM)',
        'Cloro no suor (excluir FC)',
        'Alfa-1-antitripsina',
        'FAN, FR (colagenoses)'
      ],
      redFlags: [
        'Hemoptise macica',
        'Colonizacao por Pseudomonas ou micobacteria',
        'Declinio rapido da funcao pulmonar',
        '>=3 exacerbacoes/ano',
        'Insuficiencia respiratoria'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '53-566/100.000 (aumenta com idade)',
        incidencia: 'Crescente com melhor diagnostico',
        faixaEtaria: 'Mais comum >50 anos',
        fatoresRisco: [
          'Infeccoes previas (pneumonia, tuberculose, coqueluche)',
          'Imunodeficiencias',
          'DPOC',
          'Asma',
          'Refluxo gastroesofagico',
          'Doencas autoimunes'
        ],
        citations: [{ refId: 'ers-bronchiectasis-2017' }]
      },
      fisiopatologia: {
        texto: 'Circulo vicioso de Cole: dano estrutural bronquico -> retencao de secrecao -> colonizacao bacteriana -> inflamacao neutrofilica -> mais dano. Protease-antiprotease desbalanceado. Remodeling bronquico irreversivel.',
        citations: [{ refId: 'lancet-bronchiectasis-2018' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Tosse cronica produtiva (escarro purulento)',
          'Dispneia progressiva',
          'Hemoptise (20-30%)',
          'Infeccoes respiratorias recorrentes',
          'Fadiga, emagrecimento'
        ],
        sinaisExameFisico: [
          'Estertores grossos, roncos',
          'Baqueteamento digital (raro)',
          'Crepitacoes',
          'Sibilos (se broncoespasmo)'
        ],
        formasClinicas: [
          'Cilindrica (leve)',
          'Varicosa (moderada)',
          'Cistica/sacular (grave)'
        ],
        citations: [{ refId: 'ers-bronchiectasis-2017' }]
      },
      diagnostico: {
        criterios: [
          'TCAR de torax com dilatacao bronquica',
          'Razao bronquio/arteria >1 (sinal do anel de sinete)',
          'Bronquios na periferia (1cm da pleura)',
          'Investigar etiologia em todos'
        ],
        diagnosticoDiferencial: [
          'DPOC',
          'Fibrose cistica',
          'Asma',
          'Tuberculose',
          'Aspergilose broncopulmonar alergica'
        ],
        examesLaboratoriais: [
          'Imunoglobulinas (IgG, IgA, IgM, subclasses)',
          'Alfa-1-antitripsina',
          'Cloro no suor',
          'Autoanticorpos (FAN, FR)',
          'HIV'
        ],
        examesImagem: [
          'TCAR de torax (padrao-ouro)',
          'Broncoscopia se hemoptise ou atelectasia'
        ],
        outrosExames: [
          'Cultura de escarro rotineira',
          'Micobacterias (incluindo NTM)',
          'Funcao pulmonar',
          'Espermograma se suspeita de discinesia ciliar'
        ],
        citations: [{ refId: 'lancet-bronchiectasis-2018' }]
      },
      tratamento: {
        objetivos: [
          'Reduzir sintomas e exacerbacoes',
          'Melhorar qualidade de vida',
          'Prevenir progressao',
          'Erradicar patogenos cronicos'
        ],
        naoFarmacologico: {
          medidas: [
            'Fisioterapia respiratoria diaria (essencial)',
            'Dispositivos de pressao positiva (flutter, acapella)',
            'Exercicio aerobico regular',
            'Hidratacao adequada',
            'Vacinacao'
          ],
          citations: [{ refId: 'ers-bronchiectasis-2017' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antibiotico (exacerbacao)', medicamentos: ['Amoxicilina-clavulanato', 'Ciprofloxacino', 'Azitromicina'], posologia: '14 dias guiado por cultura', observacoes: 'Cobrir Pseudomonas se colonizado' },
            { classe: 'Macrolideo cronico', medicamentos: ['Azitromicina'], posologia: '250-500mg 3x/semana', observacoes: 'Se >=3 exacerbacoes/ano; ECG antes (QT)' }
          ],
          segundaLinha: [
            { classe: 'Antibiotico inalatorio', medicamentos: ['Tobramicina', 'Colistina'], posologia: 'Tobramicina 300mg 2x/dia', observacoes: 'Para Pseudomonas cronica' }
          ],
          situacoesEspeciais: [
            { situacao: 'Primeira colonizacao Pseudomonas', conduta: 'Erradicacao: cipro 750mg 2x/dia 2-3 semanas + tobramicina inalatoria 3 meses' },
            { situacao: 'Hemoptise macica', conduta: 'Arteriografia bronquica com embolizacao; considerar cirurgia' }
          ],
          citations: [{ refId: 'ers-bronchiectasis-2017' }]
        },
        duracao: 'Tratamento cronico de manutencao; antibioticos conforme exacerbacoes'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses; mais frequente se instavel',
        examesControle: [
          'Espirometria a cada 6-12 meses',
          'Cultura de escarro a cada consulta',
          'TCAR se mudanca clinica'
        ],
        metasTerapeuticas: [
          'Reducao de exacerbacoes (<2/ano)',
          'Estabilizacao da CVF',
          'Clearance efetivo de secrecao'
        ],
        criteriosEncaminhamento: [
          'Pneumologista: todos',
          'Imunologista: imunodeficiencia',
          'Cirurgiao toracico: doenca localizada refrataria, hemoptise',
          'Transplante: doenca avancada'
        ],
        citations: [{ refId: 'lancet-bronchiectasis-2018' }]
      }
    },
    protocolos: ['bronquiectasias-manejo', 'erradicacao-pseudomonas'],
    medicamentos: ['azitromicina', 'tobramicina', 'ciprofloxacino'],
    calculadoras: ['bsi-bronchiectasis', 'faced-score'],
    rastreamentos: [],
    citations: [{ refId: 'ers-bronchiectasis-2017' }, { refId: 'lancet-bronchiectasis-2018' }],
    lastUpdate: '2026-01',
    tags: ['bronquiectasias', 'pseudomonas', 'fisioterapia', 'macrolideo']
  },

  {
    id: 'hipertensao-pulmonar',
    titulo: 'Hipertensao Pulmonar',
    sinonimos: ['HP', 'PAH', 'Hipertensao Arterial Pulmonar'],
    doid: 'DOID:6432',
    snomedCT: '70995007',
    meshId: 'D006976',
    umlsCui: 'C0020542',
    ordo: ['ORPHA:182090'],
    ciap2: ['K99'],
    cid10: ['I27.0', 'I27.2'],
    cid11: ['BB01'],
    categoria: 'respiratorio',
    subcategoria: 'vascular_pulmonar',
    quickView: {
      definicao: 'Pressao arterial pulmonar media >=20 mmHg em repouso (cateterismo). Classificada em 5 grupos. Grupo 1 (HAP) e doenca arterial pulmonar progressiva. Sem tratamento, prognostico reservado.',
      criteriosDiagnosticos: [
        'CATETERISMO DIREITO: PAPm >=20 mmHg',
        'HAP (Grupo 1): RVP >2 WU, POAP <=15 mmHg',
        'Exclusao de outras causas (grupos 2-5)',
        'Ecocardiograma de triagem: VRT >2,8 m/s sugestivo',
        'Classificacao funcional OMS (I-IV)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Reabilitacao supervisionada',
          'Evitar esforco intenso e altitude',
          'Anticoncepcao eficaz (gestacao contraindicada)',
          'Vacinacao',
          'Oxigenoterapia se hipoxemia'
        ],
        farmacologico: [
          'TERAPIA ESPECIFICA (HAP):',
          'Via endotelina: Ambrisentana, Bosentana, Macicentana',
          'Via NO: Sildenafila, Tadalafila, Riociguat',
          'Via prostaciclina: Epoprostenol, Treprostinil, Selexipag',
          'COMBINACAO: terapia dupla ou tripla sequencial ou inicial',
          'SUPORTE: Anticoagulacao (controverso), diureticos, O2'
        ]
      },
      metasTerapeuticas: [
        'Classe funcional I-II',
        'TC6M >440m',
        'BNP/NT-proBNP normal',
        'Funcao VD preservada',
        'Baixo risco no escore'
      ],
      examesIniciais: [
        'Ecocardiograma com Doppler',
        'TCAR de torax (excluir parenquima)',
        'Cintilografia V/Q (excluir CTEPH)',
        'PFP com DLCO',
        'BNP/NT-proBNP',
        'Cateterismo cardiaco direito (obrigatorio para HAP)',
        'Teste de vasorreatividade'
      ],
      redFlags: [
        'Sincope',
        'Classe funcional III-IV',
        'TC6M <165m',
        'BNP muito elevado',
        'Derrame pericardico',
        'Disfuncao grave de VD'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'HAP idiopatica: 5-15/1.000.000',
        incidencia: '2-5/1.000.000/ano (HAP)',
        faixaEtaria: 'HAP idiopatica: pico 30-60 anos; predominio feminino',
        fatoresRisco: [
          'Mutacoes BMPR2 (HAP hereditaria)',
          'Colagenoses (esclerodermia)',
          'HIV, hipertensao portal',
          'Uso de anorexigenos',
          'Cardiopatias congenitas'
        ],
        citations: [{ refId: 'esc-ers-ph-2022' }]
      },
      fisiopatologia: {
        texto: 'Remodelamento arterial pulmonar com proliferacao de celulas endoteliais e musculares lisas, trombose in situ e vasoconstriction. Aumento progressivo da RVP leva a falencia de VD. Desequilibrio entre vasoconstritores (endotelina) e vasodilatadores (NO, prostaciclina).',
        citations: [{ refId: 'nejm-pah-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dispneia aos esforcos (progressiva)',
          'Fadiga',
          'Sincope ou pre-sincope',
          'Dor toracica',
          'Edema periferico (fases avancadas)'
        ],
        sinaisExameFisico: [
          'Hiperfonese de P2',
          'Sopro de insuficiencia tricuspide',
          'Estase jugular, hepatomegalia',
          'Edema de MMII',
          'Cianose central (shunt/DVOD)'
        ],
        formasClinicas: [
          'Grupo 1: HAP (idiopatica, hereditaria, drogas, colagenose, HIV, portal)',
          'Grupo 2: cardiopatia esquerda',
          'Grupo 3: doenca pulmonar/hipoxia',
          'Grupo 4: CTEPH',
          'Grupo 5: mecanismos multifatoriais'
        ],
        citations: [{ refId: 'esc-ers-ph-2022' }]
      },
      diagnostico: {
        criterios: [
          'Cateterismo cardiaco direito obrigatorio',
          'PAPm >=20 mmHg',
          'HAP: RVP >2 WU + POAP <=15 mmHg',
          'Estratificacao de risco (baixo/intermediario/alto)'
        ],
        diagnosticoDiferencial: [
          'Insuficiencia cardiaca esquerda',
          'DPOC/fibrose pulmonar',
          'TEP cronico (CTEPH)',
          'Doenca venoclusiva pulmonar'
        ],
        examesLaboratoriais: [
          'BNP/NT-proBNP',
          'FAN, anti-Scl70, anti-centromero (esclerodermia)',
          'HIV, hepatite',
          'TSH, funcao hepatica'
        ],
        examesImagem: [
          'Ecocardiograma (triagem e seguimento)',
          'TCAR de torax',
          'Cintilografia V/Q (excluir CTEPH)',
          'Angio-TC se cintilografia alterada',
          'RM cardiaca (funcao VD)'
        ],
        outrosExames: [
          'Cateterismo cardiaco direito (padrao-ouro)',
          'Teste de vasorreatividade (idiopatica)',
          'TC6M',
          'Teste cardiopulmonar'
        ],
        citations: [{ refId: 'esc-ers-ph-2022' }]
      },
      tratamento: {
        objetivos: [
          'Atingir perfil de baixo risco',
          'Melhorar capacidade funcional',
          'Retardar progressao',
          'Melhorar sobrevida'
        ],
        naoFarmacologico: {
          medidas: [
            'Reabilitacao pulmonar supervisionada',
            'Evitar exercicio intenso e altitude >1500m',
            'Anticoncepcao eficaz',
            'Suporte psicossocial',
            'Oxigenoterapia se PaO2 <60 mmHg'
          ],
          citations: [{ refId: 'esc-ers-ph-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antagonista receptor endotelina', medicamentos: ['Ambrisentana', 'Bosentana', 'Macicentana'], posologia: 'Ambrisentana 5-10mg/dia', observacoes: 'Monitorar hepatotoxicidade (bosentana)' },
            { classe: 'Inibidor PDE5', medicamentos: ['Sildenafila', 'Tadalafila'], posologia: 'Sildenafila 20mg 3x/dia; Tadalafila 40mg/dia', observacoes: 'Primeira linha via NO' }
          ],
          segundaLinha: [
            { classe: 'Agonista prostaciclina', medicamentos: ['Selexipag', 'Treprostinil', 'Epoprostenol'], posologia: 'Selexipag titulado ate 1600mcg 2x/dia', observacoes: 'Epoprostenol IV para casos graves' }
          ],
          situacoesEspeciais: [
            { situacao: 'Vasorreativo positivo', conduta: 'Bloqueador canal calcio em altas doses' },
            { situacao: 'Alto risco inicial', conduta: 'Terapia combinada tripla incluindo prostaciclina IV' }
          ],
          citations: [{ refId: 'nejm-pah-2021' }]
        },
        duracao: 'Tratamento continuo; transplante se refratario'
      },
      acompanhamento: {
        frequenciaConsultas: 'Centro especializado a cada 3-6 meses',
        examesControle: [
          'Classe funcional, TC6M a cada visita',
          'BNP/NT-proBNP',
          'Ecocardiograma a cada 6-12 meses',
          'Cateterismo se mudanca clinica'
        ],
        metasTerapeuticas: [
          'Classe funcional I-II',
          'TC6M >440m',
          'BNP normalizado',
          'Funcao VD preservada'
        ],
        criteriosEncaminhamento: [
          'Todos: centro de referencia em HAP',
          'Transplante: refratarios em terapia maxima',
          'CTEPH: avaliar endarterectomia ou BPA'
        ],
        citations: [{ refId: 'esc-ers-ph-2022' }]
      }
    },
    protocolos: ['hap-tratamento-escalonado', 'cteph-avaliacao'],
    medicamentos: ['sildenafila', 'ambrisentana', 'selexipag', 'epoprostenol'],
    calculadoras: ['reveal-2', 'french-registry-risk'],
    rastreamentos: [],
    citations: [{ refId: 'esc-ers-ph-2022' }, { refId: 'nejm-pah-2021' }],
    lastUpdate: '2026-01',
    tags: ['hipertensao-pulmonar', 'HAP', 'VD', 'prostaciclina', 'transplante']
  },

  {
    id: 'pneumonite-hipersensibilidade',
    titulo: 'Pneumonite de Hipersensibilidade',
    sinonimos: ['HP', 'Alveolite Alergica Extrinseca', 'Pulmao de Fazendeiro', 'Pulmao dos Criadores de Aves'],
    doid: 'DOID:841',
    snomedCT: '37471005',
    meshId: 'D000542',
    umlsCui: 'C0002390',
    ciap2: ['R99'],
    cid10: ['J67'],
    cid11: ['CA70'],
    categoria: 'respiratorio',
    subcategoria: 'intersticial',
    quickView: {
      definicao: 'Doenca pulmonar intersticial causada por resposta imune a antigenos inalados organicos ou quimicos. Formas aguda, subaguda e cronica (fibrotica). Diagnostico requer identificacao de exposicao.',
      criteriosDiagnosticos: [
        'Exposicao a antigeno reconhecido',
        'Sintomas temporalmente relacionados',
        'TCAR: vidro fosco, nodulos centrolobulares, mosaico (aguda/subaguda)',
        'TCAR: fibrose, bronquiectasias de tracao (cronica)',
        'Linfocitose no LBA (>30%)',
        'Melhora com afastamento da exposicao'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'AFASTAMENTO DA EXPOSICAO (fundamental)',
          'Mudanca ambiental ou ocupacional',
          'Uso de EPIs se exposicao inevitavel',
          'Cessacao tabagica'
        ],
        farmacologico: [
          'AGUDA/SUBAGUDA: geralmente resolve com afastamento',
          'Prednisona 0,5-1mg/kg/dia se persistente/grave',
          'CRONICA FIBROTICA: considerar antifibroticos (off-label)',
          'Corticoide +/- imunossupressor se inflamatoria ativa'
        ]
      },
      metasTerapeuticas: [
        'Eliminar exposicao ao antigeno',
        'Estabilizar ou melhorar funcao pulmonar',
        'Prevenir progressao para fibrose'
      ],
      examesIniciais: [
        'Historia ocupacional e ambiental detalhada',
        'TCAR de torax',
        'Espirometria com DLCO',
        'LBA (linfocitose)',
        'Precipitinas sericas (sensibilidade limitada)',
        'Autoanticorpos (excluir colagenose)'
      ],
      redFlags: [
        'Fibrose estabelecida na TCAR',
        'Declinio rapido da CVF',
        'Hipoxemia grave',
        'Nao melhora apos afastamento',
        'Padrao PIU-like (pior prognostico)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1-3% das doencas intersticiais',
        faixaEtaria: 'Qualquer idade; depende da exposicao',
        fatoresRisco: [
          'Exposicao a aves (pombos, periquitos, galinhas)',
          'Fazendeiros (feno mofado)',
          'Trabalhadores com madeira, cogumelos',
          'Uso de banheiras de hidromassagem',
          'Ar condicionado contaminado',
          'Travesseiros de pena'
        ],
        citations: [{ refId: 'ats-hp-2020' }]
      },
      fisiopatologia: {
        texto: 'Resposta imune mista (Th1/Th17 e humoral) a antigenos organicos inalados repetidamente. Alveolite linfocitica inicialmente, podendo evoluir para granulomas e fibrose. Antigenos comuns: proteinas aviarias, fungos (Aspergillus, Thermoactinomyces).',
        citations: [{ refId: 'nejm-hp-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'AGUDA: febre, dispneia, tosse 4-8h apos exposicao',
          'SUBAGUDA: tosse, dispneia progressiva, fadiga',
          'CRONICA: dispneia lentamente progressiva, tosse seca'
        ],
        sinaisExameFisico: [
          'Estertores crepitantes',
          'Baqueteamento (formas cronicas)',
          'Cianose (grave)',
          'Sinais de cor pulmonale (avancado)'
        ],
        formasClinicas: [
          'Aguda: sintomas horas apos exposicao, resolve',
          'Subaguda: exposicao continua, sintomas persistentes',
          'Cronica nao-fibrotica: inflamacao sem fibrose significativa',
          'Cronica fibrotica: fibrose estabelecida, pior prognostico'
        ],
        citations: [{ refId: 'ats-hp-2020' }]
      },
      diagnostico: {
        criterios: [
          'Exposicao identificavel',
          'Sintomas compativeis',
          'TCAR sugestiva',
          'Linfocitose LBA',
          'Melhora com afastamento (suporta diagnostico)'
        ],
        diagnosticoDiferencial: [
          'Fibrose pulmonar idiopatica',
          'PINE',
          'Sarcoidose',
          'Infeccao',
          'Doenca intersticial associada a colagenose'
        ],
        examesLaboratoriais: [
          'Precipitinas sericas (baixa sensibilidade)',
          'LBA: linfocitose >30% (tipico)',
          'Autoanticorpos (excluir)'
        ],
        examesImagem: [
          'TCAR: vidro fosco, nodulos centrolobulares mal definidos, mosaico, air trapping',
          'Cronica: fibrose, bronquiectasias de tracao, faveolamento'
        ],
        outrosExames: [
          'Teste de provocacao (raramente feito)',
          'Biopsia pulmonar (casos incertos)'
        ],
        citations: [{ refId: 'nejm-hp-2020' }]
      },
      tratamento: {
        objetivos: [
          'Eliminar exposicao',
          'Suprimir inflamacao se ativa',
          'Prevenir progressao'
        ],
        naoFarmacologico: {
          medidas: [
            'Afastamento COMPLETO da exposicao (essencial)',
            'Remocao de aves do domicilio',
            'Mudanca de ocupacao se necessario',
            'EPIs (mascara N95) se exposicao inevitavel',
            'Remediacacao ambiental'
          ],
          citations: [{ refId: 'ats-hp-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticosteroide', medicamentos: ['Prednisona'], posologia: '0,5-1mg/kg/dia, desmame em 2-3 meses', observacoes: 'Para formas sintomaticas persistentes' }
          ],
          segundaLinha: [
            { classe: 'Imunossupressor', medicamentos: ['Micofenolato', 'Azatioprina'], posologia: 'Micofenolato 1-3g/dia', observacoes: 'Poupar corticoide em casos cronicos' }
          ],
          situacoesEspeciais: [
            { situacao: 'HP cronica fibrotica', conduta: 'Considerar antifibroticos (nintedanibe aprovado em alguns paises)' }
          ],
          citations: [{ refId: 'nejm-hp-2020' }]
        },
        duracao: 'Corticoide por 2-3 meses; reavaliar necessidade'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses; mais frequente se instavel',
        examesControle: [
          'Espirometria com DLCO',
          'TCAR se mudanca clinica',
          'Oximetria/TC6M'
        ],
        metasTerapeuticas: [
          'Estabilizacao/melhora da funcao pulmonar',
          'Ausencia de progressao radiologica',
          'Controle de exposicao mantido'
        ],
        criteriosEncaminhamento: [
          'Pneumologista especializado em intersticial',
          'Medicina do trabalho',
          'Transplante se fibrose avancada refrataria'
        ],
        citations: [{ refId: 'ats-hp-2020' }]
      }
    },
    protocolos: ['hp-investigacao-exposicao', 'hp-tratamento'],
    medicamentos: ['prednisona', 'micofenolato', 'nintedanibe'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'ats-hp-2020' }, { refId: 'nejm-hp-2020' }],
    lastUpdate: '2026-01',
    tags: ['hipersensibilidade', 'exposicao', 'aves', 'fazendeiro', 'intersticial']
  },

  {
    id: 'dpoc-enfisema',
    titulo: 'DPOC - Enfisema Predominante',
    sinonimos: ['Enfisema Pulmonar', 'Pink Puffer', 'DPOC tipo A'],
    doid: 'DOID:9675',
    snomedCT: '87433001',
    meshId: 'D011656',
    umlsCui: 'C0034067',
    ciap2: ['R95'],
    cid10: ['J43', 'J43.9'],
    cid11: ['CA22'],
    categoria: 'respiratorio',
    subcategoria: 'obstrutiva',
    quickView: {
      definicao: 'Subtipo de DPOC com destruicao parenquimatosa predominante, alargamento dos espacos aereos distais aos bronquiolos terminais. Hiperinsuflacao, dispneia acentuada, pouca secrecao.',
      criteriosDiagnosticos: [
        'Espirometria: VEF1/CVF <0,7 pos-BD',
        'TCAR: areas de baixa atenuacao (enfisema)',
        'Hiperinsuflacao (RV/TLC aumentado)',
        'DLCO reduzida',
        'Dispneia desproporcional a obstrucao',
        'Fenotipos: centrolobular, panlobular, parasseptal'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Cessacao tabagica (essencial)',
          'Reabilitacao pulmonar',
          'Vacinacao (influenza, pneumococo, COVID)',
          'Oxigenoterapia se indicada',
          'Nutricao (caquexia comum)'
        ],
        farmacologico: [
          'LAMA: Tiotropio, Glicopirronio, Umeclidinio',
          'LABA: Formoterol, Salmeterol, Indacaterol',
          'LAMA/LABA combinados para maioria',
          'ICS: apenas se eosinofilos >300 ou exacerbacoes frequentes',
          'Roflumilaste: se bronquite cronica + exacerbacoes'
        ]
      },
      metasTerapeuticas: [
        'Reduzir sintomas (mMRC, CAT)',
        'Prevenir exacerbacoes',
        'Retardar declinio do VEF1',
        'Melhorar tolerancia ao exercicio'
      ],
      examesIniciais: [
        'Espirometria com prova broncodilatadora',
        'TCAR de torax',
        'Gasometria arterial',
        'Alfa-1-antitripsina',
        'Hemograma (poliglobulia)',
        'BNP (cor pulmonale)'
      ],
      redFlags: [
        'Exacerbacao grave (insuficiencia respiratoria)',
        'Cor pulmonale descompensado',
        'IMC <20 (caquexia)',
        'VEF1 <30% previsto',
        'Hipercapnia cronica'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'DPOC: 10-15% adultos >40 anos; enfisema predominante em ~30%',
        mortalidade: '3a causa de morte global',
        faixaEtaria: '>40 anos, aumenta com idade',
        fatoresRisco: [
          'Tabagismo (principal)',
          'Exposicao a biomassa',
          'Deficiencia de alfa-1-antitripsina',
          'Poluicao ambiental',
          'Infeccoes respiratorias na infancia'
        ],
        citations: [{ refId: 'gold-2024' }]
      },
      fisiopatologia: {
        texto: 'Destruicao proteolitica das paredes alveolares por desequilibrio protease-antiprotease e estresse oxidativo. Perda de retração elastica, colapso expiratório de vias aereas, hiperinsuflação. Centrolobular (tabaco) ou panlobular (alfa-1-AT).',
        citations: [{ refId: 'nejm-copd-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dispneia aos esforcos progressiva',
          'Tosse seca ou pouco produtiva',
          'Perda de peso, caquexia',
          'Fadiga',
          'Exacerbacoes menos frequentes que bronquitico'
        ],
        sinaisExameFisico: [
          'Torax em barril (hiperinsuflacao)',
          'Murmúrio vesicular diminuido',
          'Timpanismo a percussao',
          'Uso de musculatura acessoria',
          'Respiracao com labios semicerrados',
          'Emagrecimento, caquexia'
        ],
        formasClinicas: [
          'Enfisema centrolobular (tabaco)',
          'Enfisema panlobular (deficiencia alfa-1-AT)',
          'Enfisema parasseptal (bolhas subpleurais)'
        ],
        citations: [{ refId: 'gold-2024' }]
      },
      diagnostico: {
        criterios: [
          'VEF1/CVF <0,7 pos-BD (obstrucao fixa)',
          'TCAR: areas de baixa atenuacao',
          'DLCO reduzida',
          'Hiperinsuflacao (aumento RV)'
        ],
        diagnosticoDiferencial: [
          'Asma',
          'Bronquiectasias',
          'Insuficiencia cardiaca',
          'Fibrose pulmonar',
          'Tuberculose sequela'
        ],
        examesLaboratoriais: [
          'Alfa-1-antitripsina',
          'Hemograma',
          'Gasometria arterial',
          'BNP se suspeita de IC'
        ],
        examesImagem: [
          'Radiografia (hiperinsuflacao)',
          'TCAR: quantificacao de enfisema'
        ],
        outrosExames: [
          'Volumes pulmonares (pletismografia)',
          'DLCO',
          'TC6M'
        ],
        citations: [{ refId: 'gold-2024' }]
      },
      tratamento: {
        objetivos: [
          'Reduzir sintomas',
          'Melhorar tolerancia ao exercicio',
          'Prevenir exacerbacoes',
          'Retardar progressao'
        ],
        naoFarmacologico: {
          medidas: [
            'Cessacao tabagica (unica medida que modifica progressao)',
            'Reabilitacao pulmonar (essencial)',
            'Oxigenoterapia domiciliar (PaO2 <55 ou <60 com cor pulmonale)',
            'Suporte nutricional',
            'Vacinacao'
          ],
          citations: [{ refId: 'gold-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'LAMA', medicamentos: ['Tiotropio', 'Glicopirronio', 'Umeclidinio'], posologia: 'Tiotropio 18mcg/dia', observacoes: 'Base do tratamento' },
            { classe: 'LAMA/LABA', medicamentos: ['Umeclidinio/Vilanterol', 'Glicopirronio/Indacaterol'], posologia: '1 inalacao/dia', observacoes: 'Mais sintomatico' }
          ],
          segundaLinha: [
            { classe: 'Tripla (ICS/LAMA/LABA)', medicamentos: ['Fluticasona/Umeclidinio/Vilanterol'], posologia: '1 inalacao/dia', observacoes: 'Se eosinofilos >300 ou exacerbacoes' }
          ],
          situacoesEspeciais: [
            { situacao: 'Deficiencia de alfa-1-AT', conduta: 'Reposicao de alfa-1-antitripsina IV' },
            { situacao: 'Enfisema heterogeneo grave', conduta: 'Cirurgia redutora de volume ou valvulas endobronquicas' }
          ],
          citations: [{ refId: 'gold-2024' }]
        },
        duracao: 'Tratamento continuo; ajuste conforme GOLD'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses; mais frequente se instavel',
        examesControle: [
          'Espirometria anual',
          'Oximetria, gasometria periodica',
          'CAT/mMRC a cada visita'
        ],
        metasTerapeuticas: [
          'mMRC <2, CAT <10',
          '0-1 exacerbacoes/ano',
          'Manutencao da capacidade funcional'
        ],
        criteriosEncaminhamento: [
          'Pneumologista: todos os casos',
          'Cirurgia: enfisema heterogeneo grave',
          'Transplante: DPOC avancada (<25 anos, BODE >7)'
        ],
        citations: [{ refId: 'gold-2024' }]
      }
    },
    protocolos: ['gold-dpoc', 'reducao-volume-pulmonar'],
    medicamentos: ['tiotropio', 'indacaterol', 'roflumilaste'],
    calculadoras: ['bode-index', 'gold-abcd', 'cat-copd'],
    rastreamentos: [],
    citations: [{ refId: 'gold-2024' }, { refId: 'nejm-copd-2020' }],
    lastUpdate: '2026-01',
    tags: ['DPOC', 'enfisema', 'tabagismo', 'hiperinsuflacao', 'alfa-1-antitripsina']
  },

  {
    id: 'acos-asma-dpoc',
    titulo: 'Sindrome de Sobreposicao Asma-DPOC',
    sinonimos: ['ACOS', 'ACO', 'Asthma-COPD Overlap'],
    doid: 'DOID:2841',
    snomedCT: '10692761000119105',
    meshId: 'D029481',
    umlsCui: 'C3714497',
    ciap2: ['R95', 'R96'],
    cid10: ['J44.8'],
    cid11: ['CA23'],
    categoria: 'respiratorio',
    subcategoria: 'obstrutiva',
    quickView: {
      definicao: 'Condicao caracterizada por obstrucao persistente ao fluxo aereo com caracteristicas clinicas tanto de asma quanto de DPOC. Maior risco de exacerbacoes e pior prognostico que asma ou DPOC isoladas.',
      criteriosDiagnosticos: [
        'Obstrucao persistente: VEF1/CVF <0,7 pos-BD',
        'Historia de asma antes dos 40 anos OU',
        'Reversibilidade significativa (>400mL ou >15%)',
        'Eosinofilia no escarro ou sangue (>300/uL)',
        'Variabilidade de sintomas caracteristica de asma',
        'Exposicao a tabaco ou biomassa (DPOC)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Cessacao tabagica',
          'Evitar alérgenos e irritantes',
          'Reabilitacao pulmonar',
          'Vacinacao'
        ],
        farmacologico: [
          'ICS OBRIGATORIO (nunca LABA isolado)',
          'ICS + LABA: Budesonida/Formoterol, Fluticasona/Salmeterol',
          'Adicionar LAMA se nao controlado',
          'Tripla terapia: ICS/LAMA/LABA',
          'Biologicos se eosinofilia e exacerbacoes (anti-IL5, anti-IL4R)'
        ]
      },
      metasTerapeuticas: [
        'Controle de sintomas',
        'Prevencao de exacerbacoes',
        'Manter funcao pulmonar',
        'Evitar declinio acelerado'
      ],
      examesIniciais: [
        'Espirometria com prova BD (antes e apos)',
        'Eosinofilos no sangue',
        'IgE total',
        'FeNO (oxido nitrico exalado)',
        'TCAR de torax',
        'Alfa-1-antitripsina'
      ],
      redFlags: [
        'Exacerbacoes frequentes (>=2/ano)',
        'Declinio rapido do VEF1',
        'Hospitalizacoes por exacerbacao',
        'Uso frequente de corticoide oral',
        'Eosinofilia persistente apesar de ICS'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '15-20% dos pacientes com obstrucao cronica',
        faixaEtaria: 'Tipico >40 anos',
        fatoresRisco: [
          'Historia de asma na infancia/juventude',
          'Tabagismo',
          'Atopia',
          'Asma nao tratada ou subtratada'
        ],
        citations: [{ refId: 'gina-gold-aco-2023' }]
      },
      fisiopatologia: {
        texto: 'Combinacao de inflamacao eosinofilica (tipo 2) da asma com inflamacao neutrofilica e destruicao parenquimatosa da DPOC. Remodelamento bronquico com componente reversivel e fixo. Hiper-responsividade bronquica persistente.',
        citations: [{ refId: 'lancet-aco-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dispneia aos esforcos',
          'Sibilo e aperto toracico',
          'Variabilidade dos sintomas (pior a noite/manha)',
          'Exacerbacoes frequentes',
          'Tosse com ou sem expectoracao'
        ],
        sinaisExameFisico: [
          'Sibilos difusos',
          'Prolongamento expiratório',
          'Hiperinsuflacao (se enfisema)',
          'Pode ter exame normal fora de crise'
        ],
        citations: [{ refId: 'gina-gold-aco-2023' }]
      },
      diagnostico: {
        criterios: [
          'Obstrucao persistente (VEF1/CVF <0,7 pos-BD)',
          '>=3 caracteristicas de asma E >=3 de DPOC',
          'Asma: inicio <40a, variabilidade, reversibilidade >400mL, atopia',
          'DPOC: inicio >40a, tabaco, persistencia, enfisema'
        ],
        diagnosticoDiferencial: [
          'Asma de dificil controle',
          'DPOC com eosinofilia',
          'Bronquiectasias',
          'Insuficiencia cardiaca'
        ],
        examesLaboratoriais: [
          'Eosinofilos sanguineos',
          'IgE total e especificas',
          'FeNO',
          'Escarro induzido (se disponivel)'
        ],
        examesImagem: [
          'TCAR: pode mostrar aprisionamento aereo, espessamento bronquico, enfisema'
        ],
        citations: [{ refId: 'lancet-aco-2021' }]
      },
      tratamento: {
        objetivos: [
          'Controlar inflamacao tipo 2',
          'Broncodilatacao sustentada',
          'Prevenir exacerbacoes e declinio'
        ],
        naoFarmacologico: {
          medidas: [
            'Cessacao tabagica',
            'Evitar alérgenos',
            'Reabilitacao pulmonar',
            'Educacao em autocontrole'
          ],
          citations: [{ refId: 'gina-gold-aco-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'ICS/LABA', medicamentos: ['Budesonida/Formoterol', 'Fluticasona/Salmeterol'], posologia: 'Dose media a alta de ICS', observacoes: 'ICS obrigatorio - nunca LABA isolado' }
          ],
          segundaLinha: [
            { classe: 'Tripla ICS/LAMA/LABA', medicamentos: ['Fluticasona/Umeclidinio/Vilanterol', 'Beclometasona/Glicopirronio/Formoterol'], posologia: '1 inalacao 1-2x/dia', observacoes: 'Se ICS/LABA insuficiente' }
          ],
          situacoesEspeciais: [
            { situacao: 'Eosinofilia >=300 e exacerbacoes', conduta: 'Biologico anti-IL5 (Mepolizumabe, Benralizumabe) ou anti-IL4R (Dupilumabe)' }
          ],
          citations: [{ refId: 'gina-gold-aco-2023' }]
        },
        duracao: 'Tratamento continuo; nunca suspender ICS'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 2-3 meses ate controle; depois cada 3-6 meses',
        examesControle: [
          'Espirometria a cada 6-12 meses',
          'Eosinofilos periodicos',
          'CAT/ACT a cada visita'
        ],
        metasTerapeuticas: [
          'Sintomas controlados',
          '0 exacerbacoes',
          'Funcao pulmonar estavel'
        ],
        criteriosEncaminhamento: [
          'Pneumologista: todos',
          'Imunologista/alergista: fenótipo tipo 2 grave',
          'Centro de asma grave: para biologicos'
        ],
        citations: [{ refId: 'lancet-aco-2021' }]
      }
    },
    protocolos: ['acos-tratamento', 'biologicos-asma'],
    medicamentos: ['budesonida-formoterol', 'mepolizumabe', 'dupilumabe'],
    calculadoras: ['act-asthma', 'cat-copd'],
    rastreamentos: [],
    citations: [{ refId: 'gina-gold-aco-2023' }, { refId: 'lancet-aco-2021' }],
    lastUpdate: '2026-01',
    tags: ['ACOS', 'asma', 'DPOC', 'sobreposicao', 'eosinofilia', 'biologico']
  },

  {
    id: 'fibrose-cistica',
    titulo: 'Fibrose Cistica',
    sinonimos: ['FC', 'CF', 'Mucoviscidose'],
    doid: 'DOID:1485',
    snomedCT: '190905008',
    meshId: 'D003550',
    umlsCui: 'C0010674',
    ordo: ['ORPHA:586'],
    ciap2: ['R99'],
    cid10: ['E84', 'E84.0', 'E84.1'],
    cid11: ['CA25'],
    categoria: 'respiratorio',
    subcategoria: 'genetica',
    quickView: {
      definicao: 'Doenca genetica autossomica recessiva causada por mutacoes no gene CFTR. Secrecoes espessas afetam pulmoes, pancreas, figado, intestino. Bronquiectasias, insuficiencia pancreatica, infertilidade masculina.',
      criteriosDiagnosticos: [
        'Teste do suor: cloro >=60 mmol/L (positivo)',
        '2 mutacoes patogenicas no gene CFTR',
        'Triagem neonatal positiva (IRT)',
        'Manifestacoes clinicas compativeis',
        'Diferenca de potencial nasal anormal'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Fisioterapia respiratoria diaria (2-4x/dia)',
          'Exercicio fisico regular',
          'Nutricao hipercalorica (120-150% RDA)',
          'Hidratacao adequada',
          'Vacinacao completa'
        ],
        farmacologico: [
          'MODULADORES CFTR: Elexacaftor/Tezacaftor/Ivacaftor (Trikafta) - revolucionario',
          'Ivacaftor (mutacoes gating)',
          'Dornase alfa (DNase) inalatoria 1x/dia',
          'Salina hipertonica 7% inalatoria 2x/dia',
          'Enzimas pancreaticas a cada refeicao',
          'Azitromicina cronica se colonizado Pseudomonas'
        ]
      },
      metasTerapeuticas: [
        'Manter VEF1 >70% previsto',
        'IMC adequado para idade',
        'Minimizar exacerbacoes',
        'Erradicar/suprimir Pseudomonas'
      ],
      examesIniciais: [
        'Teste do suor',
        'Genotipagem CFTR',
        'Espirometria',
        'Cultura de escarro',
        'Elastase fecal (insuficiencia pancreatica)',
        'Vitaminas lipossolveis (A, D, E, K)',
        'Glicemia/TTOG (DRFC)',
        'Funcao hepatica, US abdominal'
      ],
      redFlags: [
        'Exacerbacao grave/insuficiencia respiratoria',
        'Hemoptise macica',
        'Pneumotorax',
        'Colonizacao por Burkholderia cepacia (pior prognostico)',
        'Declinio rapido do VEF1',
        'Desnutricao grave'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:2.500-3.500 nascidos vivos (caucasianos)',
        incidencia: 'Varia por etnia e regiao',
        mortalidade: 'Sobrevida mediana >50 anos com tratamento moderno',
        faixaEtaria: 'Diagnostico na infancia; sobrevida ate adulto',
        fatoresRisco: [
          'Historia familiar',
          'Etnia caucasiana',
          'Portadores (1:25 caucasianos)'
        ],
        citations: [{ refId: 'cff-guidelines-2024' }]
      },
      fisiopatologia: {
        texto: 'Mutacoes no gene CFTR (canal de cloro) levam a secrecoes espessas e desidratadas. Nos pulmoes: obstrucao, infeccao cronica, inflamacao, bronquiectasias. Pancreas: insuficiencia exocrina. Glandulas sudoriparas: cloro elevado. >2000 mutacoes; F508del mais comum.',
        citations: [{ refId: 'nejm-cf-2019' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Tosse cronica produtiva',
          'Infeccoes respiratorias recorrentes',
          'Dispneia progressiva',
          'Esteatorreia, ma absorcao',
          'Deficit de crescimento',
          'Sinusite cronica',
          'Infertilidade masculina (azoospermia obstrutiva)'
        ],
        sinaisExameFisico: [
          'Baqueteamento digital',
          'Roncos, crepitacoes',
          'Polipose nasal',
          'Desnutricao',
          'Hepatomegalia (cirrose biliar)'
        ],
        formasClinicas: [
          'Classica (pancreatica insuficiente)',
          'Pancreatica suficiente (10-15%)',
          'Atipica/diagnostico tardio'
        ],
        citations: [{ refId: 'cff-guidelines-2024' }]
      },
      diagnostico: {
        criterios: [
          'Clinica sugestiva + teste do suor >=60 mmol/L, ou',
          '2 mutacoes patogenicas CFTR, ou',
          'Triagem neonatal + 1 dos acima'
        ],
        diagnosticoDiferencial: [
          'Bronquiectasias nao-FC',
          'Discinesia ciliar primaria',
          'Imunodeficiencias',
          'Deficiencia de alfa-1-antitripsina'
        ],
        examesLaboratoriais: [
          'Teste do suor (padrao-ouro)',
          'Genotipagem CFTR',
          'Elastase fecal',
          'Vitaminas A, D, E, K',
          'Glicemia, HbA1c, TTOG'
        ],
        examesImagem: [
          'TCAR de torax (bronquiectasias, impactacao mucoide)',
          'Radiografia seios da face',
          'US abdominal (figado, pancreas)'
        ],
        outrosExames: [
          'Cultura de escarro rotineira',
          'Espirometria',
          'Densitometria ossea'
        ],
        citations: [{ refId: 'nejm-cf-2019' }]
      },
      tratamento: {
        objetivos: [
          'Manter funcao pulmonar',
          'Nutricao adequada',
          'Prevenir/tratar infeccoes',
          'Melhorar qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Fisioterapia respiratoria diaria (essencial)',
            'Dispositivos de clearance (PEP, flutter)',
            'Exercicio aerobico regular',
            'Dieta hipercalorica, hiperlipidica',
            'Controle de infeccao cruzada'
          ],
          citations: [{ refId: 'cff-guidelines-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Modulador CFTR', medicamentos: ['Elexacaftor/Tezacaftor/Ivacaftor'], posologia: '2 comprimidos manha + 1 noite', observacoes: 'Para >=1 copia F508del (90% dos pacientes)' },
            { classe: 'Mucoativo', medicamentos: ['Dornase alfa'], posologia: '2,5mg inalatorio 1x/dia', observacoes: 'Antes da fisioterapia' },
            { classe: 'Enzimas pancreaticas', medicamentos: ['Pancreatina'], posologia: '500-2500 U lipase/kg/refeicao', observacoes: 'A cada refeicao e lanche' }
          ],
          segundaLinha: [
            { classe: 'Antibiotico inalatorio', medicamentos: ['Tobramicina', 'Aztreonam lisina', 'Colistina'], posologia: 'Tobramicina 300mg 2x/dia ciclos', observacoes: 'Para Pseudomonas cronica' }
          ],
          situacoesEspeciais: [
            { situacao: 'Exacerbacao', conduta: 'Antibiotico IV 14-21 dias guiado por cultura; internacao' },
            { situacao: 'DRFC (diabetes)', conduta: 'Insulina; nao usar hipoglicemiantes orais' }
          ],
          citations: [{ refId: 'nejm-cf-2019' }]
        },
        duracao: 'Tratamento continuo por toda vida'
      },
      acompanhamento: {
        frequenciaConsultas: 'Centro de referencia a cada 2-3 meses',
        examesControle: [
          'Espirometria a cada visita',
          'Cultura de escarro a cada visita',
          'TCAR anual ou bienal',
          'TTOG anual apos 10 anos',
          'Densitometria, vitaminas'
        ],
        metasTerapeuticas: [
          'VEF1 estavel ou melhorando',
          'IMC >50% percentil (pediatria) ou >22 (adulto)',
          'Exacerbacoes minimizadas'
        ],
        criteriosEncaminhamento: [
          'Centro de referencia em FC obrigatorio',
          'Transplante: VEF1 <30%, declinio rapido, hipoxemia grave'
        ],
        citations: [{ refId: 'cff-guidelines-2024' }]
      }
    },
    protocolos: ['fc-moduladores', 'fc-exacerbacao', 'fc-nutricao'],
    medicamentos: ['elexacaftor-tezacaftor-ivacaftor', 'dornase-alfa', 'tobramicina'],
    calculadoras: ['fev1-decline-cf'],
    rastreamentos: ['triagem-neonatal-fc'],
    citations: [{ refId: 'cff-guidelines-2024' }, { refId: 'nejm-cf-2019' }],
    lastUpdate: '2026-01',
    tags: ['fibrose-cistica', 'CFTR', 'modulador', 'bronquiectasias', 'pancreas']
  },

  {
    id: 'aspergilose-broncopulmonar-alergica',
    titulo: 'Aspergilose Broncopulmonar Alergica',
    sinonimos: ['ABPA', 'ABPM', 'Allergic Bronchopulmonary Aspergillosis'],
    doid: 'DOID:13166',
    snomedCT: '37981002',
    meshId: 'D001229',
    umlsCui: 'C0004031',
    ciap2: ['R99'],
    cid10: ['B44.1'],
    cid11: ['CA70.0'],
    categoria: 'respiratorio',
    subcategoria: 'hipersensibilidade',
    quickView: {
      definicao: 'Reacao de hipersensibilidade pulmonar ao Aspergillus fumigatus em pacientes com asma ou fibrose cistica. Pode causar bronquiectasias centrais e fibrose se nao tratada.',
      criteriosDiagnosticos: [
        'CRITERIOS ISHAM 2013:',
        'Predisposicao: asma ou FC',
        'IgE total >1000 UI/mL',
        'Sensibilizacao a Aspergillus (prick ou IgE especifica)',
        'IgG anti-Aspergillus elevado',
        'TCAR: bronquiectasias centrais, impactacao mucoide',
        'Eosinofilia sanguinea >500/uL'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar exposicao a ambientes com mofo',
          'Controle ambiental',
          'Fisioterapia respiratoria'
        ],
        farmacologico: [
          'CORTICOIDE SISTEMICO: Prednisona 0,5mg/kg/dia 2 semanas, desmame 3-6 meses',
          'ANTIFUNGICO: Itraconazol 200mg 2x/dia 4-6 meses (poupador de corticoide)',
          'Alternativas: Voriconazol, Posaconazol',
          'Omalizumabe: asma alergica grave com ABPA'
        ]
      },
      metasTerapeuticas: [
        'Reducao de IgE total em >35%',
        'Melhora radiologica',
        'Controle de sintomas',
        'Prevenir fibrose'
      ],
      examesIniciais: [
        'IgE total',
        'IgE especifica para Aspergillus',
        'IgG anti-Aspergillus (precipitinas)',
        'Eosinofilos',
        'TCAR de torax',
        'Espirometria',
        'Cultura de escarro para Aspergillus'
      ],
      redFlags: [
        'IgE muito elevado (>5000)',
        'Bronquiectasias extensas',
        'Fibrose pulmonar',
        'Recaidas frequentes',
        'Dependencia de corticoide'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1-2% dos asmaticos; 5-15% dos pacientes com FC',
        faixaEtaria: 'Qualquer idade; mais comum adultos jovens',
        fatoresRisco: [
          'Asma moderada a grave',
          'Fibrose cistica',
          'Atopia',
          'Exposicao ambiental a fungos'
        ],
        citations: [{ refId: 'chest-abpa-2021' }]
      },
      fisiopatologia: {
        texto: 'Colonizacao de vias aereas por Aspergillus fumigatus desencadeia resposta imune Th2 exagerada. Producao de IgE e IgG especificos, eosinofilia, inflamacao bronquica. Dano estrutural leva a bronquiectasias centrais e impactacao mucoide.',
        citations: [{ refId: 'lancet-resp-abpa-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Piora do controle da asma',
          'Tosse produtiva com plugs mucoides',
          'Sibilo persistente',
          'Dispneia',
          'Febre baixa (exacerbacoes)',
          'Expectoracao de moldes bronquicos'
        ],
        sinaisExameFisico: [
          'Sibilos difusos',
          'Estertores',
          'Exame pode ser normal fora de exacerbacao'
        ],
        formasClinicas: [
          'ABPA-S (serologica, sem bronquiectasias)',
          'ABPA-CB (com bronquiectasias centrais)',
          'ABPA com fibrose'
        ],
        citations: [{ refId: 'chest-abpa-2021' }]
      },
      diagnostico: {
        criterios: [
          'Criterios ISHAM 2013',
          'Obrigatorios: asma/FC + sensibilizacao + IgE >1000',
          'Outros: eosinofilia, IgG, imagem'
        ],
        diagnosticoDiferencial: [
          'Asma grave nao controlada',
          'Aspergilose pulmonar invasiva',
          'Aspergiloma',
          'Pneumonia eosinofilica',
          'Granulomatose eosinofilica'
        ],
        examesLaboratoriais: [
          'IgE total (elevado)',
          'IgE especifica Aspergillus',
          'IgG anti-Aspergillus',
          'Eosinofilos (frequentemente >500)',
          'Cultura de escarro'
        ],
        examesImagem: [
          'TCAR: bronquiectasias centrais (dedo de luva), impactacao mucoide (high attenuation mucus), atelectasias'
        ],
        citations: [{ refId: 'lancet-resp-abpa-2020' }]
      },
      tratamento: {
        objetivos: [
          'Controlar inflamacao',
          'Prevenir progressao para fibrose',
          'Manter funcao pulmonar'
        ],
        naoFarmacologico: {
          medidas: [
            'Controle ambiental',
            'Fisioterapia para clearance',
            'Evitar ambientes umidos/mofados'
          ],
          citations: [{ refId: 'chest-abpa-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticosteroide', medicamentos: ['Prednisona'], posologia: '0,5mg/kg/dia 2 semanas, depois 0,5mg/kg dias alternados 6-8 semanas, desmame 3-6 meses', observacoes: 'Pilar do tratamento' }
          ],
          segundaLinha: [
            { classe: 'Antifungico azolico', medicamentos: ['Itraconazol', 'Voriconazol'], posologia: 'Itraconazol 200mg 2x/dia 4-6 meses', observacoes: 'Poupar corticoide; monitorar nivel serico e hepatotoxicidade' }
          ],
          situacoesEspeciais: [
            { situacao: 'Dependente de corticoide ou refratario', conduta: 'Omalizumabe (anti-IgE)' },
            { situacao: 'ABPA em FC', conduta: 'Tratamento mais agressivo; azolico por mais tempo' }
          ],
          citations: [{ refId: 'lancet-resp-abpa-2020' }]
        },
        duracao: 'Agudo: 3-6 meses; recaidas comuns, pode precisar tratamento prolongado'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6-8 semanas durante tratamento; depois cada 3-6 meses',
        examesControle: [
          'IgE total a cada 6-8 semanas (meta: reducao >35%)',
          'Espirometria',
          'TCAR se mudanca clinica',
          'Funcao hepatica (se azolico)'
        ],
        metasTerapeuticas: [
          'IgE total em queda ou estavel',
          'Melhora radiologica',
          'Controle de sintomas',
          'Desmame de corticoide'
        ],
        criteriosEncaminhamento: [
          'Pneumologista',
          'Alergista/imunologista',
          'Centro de FC (se fibrose cistica)'
        ],
        citations: [{ refId: 'chest-abpa-2021' }]
      }
    },
    protocolos: ['abpa-corticoide', 'abpa-antifungico'],
    medicamentos: ['prednisona', 'itraconazol', 'omalizumabe'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'chest-abpa-2021' }, { refId: 'lancet-resp-abpa-2020' }],
    lastUpdate: '2026-01',
    tags: ['ABPA', 'Aspergillus', 'asma', 'IgE', 'bronquiectasias']
  },

  {
    id: 'proteinose-alveolar-pulmonar',
    titulo: 'Proteinose Alveolar Pulmonar',
    sinonimos: ['PAP', 'Pulmonary Alveolar Proteinosis'],
    doid: 'DOID:12120',
    snomedCT: '64667001',
    meshId: 'D011649',
    umlsCui: 'C0034050',
    ordo: ['ORPHA:747'],
    ciap2: ['R99'],
    cid10: ['J84.0'],
    cid11: ['CB03.3'],
    categoria: 'respiratorio',
    subcategoria: 'intersticial_rara',
    quickView: {
      definicao: 'Doenca rara caracterizada por acumulo de surfactante nos alveolos devido a deficiencia de clearance por macrofagos alveolares. Forma autoimune (anti-GM-CSF) mais comum em adultos.',
      criteriosDiagnosticos: [
        'TCAR: padrao crazy paving (vidro fosco + espessamento septal)',
        'LBA: material leitoso, PAS positivo',
        'Anticorpos anti-GM-CSF elevados (forma autoimune)',
        'Biopsia: material eosinofilico intra-alveolar PAS+',
        'Exclusao de causas secundarias'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Observacao se assintomatico/leve',
          'Cessacao tabagica',
          'Evitar exposicoes ocupacionais'
        ],
        farmacologico: [
          'LAVAGEM PULMONAR TOTAL (padrao-ouro para sintomaticos)',
          'Sob anestesia geral, sequencial',
          'GM-CSF inalatorio ou subcutaneo (forma autoimune)',
          'Rituximabe para refratarios'
        ]
      },
      metasTerapeuticas: [
        'Melhorar oxigenacao',
        'Resolver infiltrados',
        'Manter funcao pulmonar',
        'Reduzir sintomas'
      ],
      examesIniciais: [
        'TCAR de torax (crazy paving)',
        'Espirometria com DLCO',
        'Gasometria arterial',
        'Anticorpos anti-GM-CSF',
        'LBA (aspecto leitoso, PAS+)',
        'LDH (frequentemente elevado)'
      ],
      redFlags: [
        'Hipoxemia grave',
        'Infeccao oportunista (Nocardia, micobacteria)',
        'Progressao rapida',
        'Necessidade de O2 domiciliar'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '6-7/1.000.000',
        incidencia: '0,2/1.000.000/ano',
        faixaEtaria: 'Pico 30-50 anos; forma congenita em neonatos',
        fatoresRisco: [
          'Tabagismo (associacao)',
          'Exposicao a poeiras inorganicas',
          'Neoplasias hematologicas (secundaria)'
        ],
        citations: [{ refId: 'erj-pap-2022' }]
      },
      fisiopatologia: {
        texto: 'Autoimune: anticorpos anti-GM-CSF bloqueiam a sinalizacao, impedindo a diferenciacao e funcao de macrofagos alveolares, que falham em degradar o surfactante. Acumulo progressivo de material lipoproteico nos alveolos.',
        citations: [{ refId: 'nejm-pap-2019' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dispneia progressiva',
          'Tosse seca',
          'Fadiga',
          'Pode ser assintomatico (achado incidental)',
          'Perda de peso'
        ],
        sinaisExameFisico: [
          'Crepitacoes (incomum)',
          'Cianose (casos graves)',
          'Baqueteamento (raro)',
          'Exame frequentemente normal'
        ],
        formasClinicas: [
          'Autoimune (90% dos adultos)',
          'Secundaria (neoplasias, infeccoes, exposicoes)',
          'Congenita/hereditaria (mutacoes em CSF2RA, CSF2RB, SFTPB, SFTPC)'
        ],
        citations: [{ refId: 'erj-pap-2022' }]
      },
      diagnostico: {
        criterios: [
          'TCAR: crazy paving patognomonico',
          'LBA: aspecto leitoso, material PAS+',
          'Anti-GM-CSF positivo (autoimune)',
          'Biopsia se inconclusivo'
        ],
        diagnosticoDiferencial: [
          'Pneumonia por Pneumocystis',
          'Edema pulmonar cardiogenico',
          'Hemorragia alveolar',
          'Pneumonia lipoidica',
          'Carcinoma bronquioloalveolar'
        ],
        examesLaboratoriais: [
          'Anti-GM-CSF serico',
          'LDH (elevado em 80%)',
          'CEA (pode estar elevado)'
        ],
        examesImagem: [
          'TCAR: crazy paving (vidro fosco + espessamento septal poligonal)',
          'Distribuicao geografica'
        ],
        outrosExames: [
          'LBA: leitoso, lipidios, material PAS+',
          'Biopsia transbrônquica ou cirurgica'
        ],
        citations: [{ refId: 'nejm-pap-2019' }]
      },
      tratamento: {
        objetivos: [
          'Remover material acumulado',
          'Restaurar troca gasosa',
          'Tratar causa subjacente'
        ],
        naoFarmacologico: {
          medidas: [
            'Lavagem pulmonar total (WLL) - padrao-ouro',
            'Sob anestesia geral',
            'Ate 20-30L de salina por pulmao',
            'Pode precisar repetir'
          ],
          citations: [{ refId: 'erj-pap-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'GM-CSF', medicamentos: ['Sargramostim'], posologia: 'Inalatorio 250mcg 2x/dia ou SC 5-10mcg/kg/dia', observacoes: 'Alternativa ou adjunto a WLL' }
          ],
          segundaLinha: [
            { classe: 'Imunoterapia', medicamentos: ['Rituximabe'], posologia: '375mg/m2 semanal x4 ou 1g x2', observacoes: 'Para refratarios' }
          ],
          situacoesEspeciais: [
            { situacao: 'Forma secundaria', conduta: 'Tratar doenca de base (neoplasia, exposicao)' },
            { situacao: 'Forma congenita', conduta: 'Transplante pulmonar' }
          ],
          citations: [{ refId: 'nejm-pap-2019' }]
        },
        duracao: 'Variavel; muitos precisam de WLL repetidas'
      },
      acompanhamento: {
        frequenciaConsultas: 'Centro especializado a cada 3-6 meses',
        examesControle: [
          'Espirometria com DLCO',
          'Gasometria',
          'TCAR periodico',
          'LDH'
        ],
        metasTerapeuticas: [
          'Melhora ou estabilizacao da oxigenacao',
          'Resolucao radiologica',
          'Independencia de O2'
        ],
        criteriosEncaminhamento: [
          'Centro de referencia em doencas pulmonares raras',
          'Transplante: formas refratarias graves'
        ],
        citations: [{ refId: 'erj-pap-2022' }]
      }
    },
    protocolos: ['pap-lavagem-pulmonar', 'pap-gmcsf'],
    medicamentos: ['sargramostim', 'rituximabe'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'erj-pap-2022' }, { refId: 'nejm-pap-2019' }],
    lastUpdate: '2026-01',
    tags: ['PAP', 'proteinose', 'lavagem-pulmonar', 'GM-CSF', 'crazy-paving']
  },

  {
    id: 'linfangioleiomiomatose',
    titulo: 'Linfangioleiomiomatose',
    sinonimos: ['LAM', 'Lymphangioleiomyomatosis'],
    doid: 'DOID:3202',
    snomedCT: '50325005',
    meshId: 'D018192',
    umlsCui: 'C0751674',
    ordo: ['ORPHA:538'],
    ciap2: ['R99'],
    cid10: ['D48.1', 'J84.8'],
    cid11: ['CB03.5'],
    categoria: 'respiratorio',
    subcategoria: 'intersticial_rara',
    quickView: {
      definicao: 'Doenca pulmonar cistica rara que afeta quase exclusivamente mulheres em idade fertil. Proliferacao de celulas musculares lisas anormais (celulas LAM). Associada a esclerose tuberosa (TSC-LAM) ou esporadica (S-LAM).',
      criteriosDiagnosticos: [
        'TCAR: cistos pulmonares difusos de parede fina',
        'Mulher em idade fertil',
        'VEGF-D serico >=800 pg/mL (altamente sugestivo)',
        'Angiomiolipoma renal ou linfangioleiomioma associado',
        'Biopsia se criterios nao preenchidos'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar estrogeno exogeno (contraceptivos, TRH)',
          'Evitar gestacao (controverso)',
          'Vacinacao',
          'Evitar mergulho e altitude extrema (pneumotorax)'
        ],
        farmacologico: [
          'SIROLIMUS (inibidor mTOR) - padrao-ouro',
          'Dose: 1-2mg/dia, alvo nivel serico 5-15 ng/mL',
          'Indicado: VEF1 <70%, declinio funcional, quilotorax',
          'Broncodilatador se obstrucao'
        ]
      },
      metasTerapeuticas: [
        'Estabilizar ou melhorar VEF1',
        'Resolver quilotorax',
        'Manter qualidade de vida',
        'Prevenir pneumotorax'
      ],
      examesIniciais: [
        'TCAR de torax (cistos)',
        'Espirometria com DLCO',
        'VEGF-D serico',
        'RM ou TC de abdome (angiomiolipoma)',
        'TC/RM de cranio (esclerose tuberosa)',
        'Funcao renal'
      ],
      redFlags: [
        'Pneumotorax recorrente',
        'Quilotorax',
        'Declinio rapido do VEF1',
        'Angiomiolipoma >4cm (risco de sangramento)',
        'Hipoxemia'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '3-8/1.000.000 mulheres',
        incidencia: '0,3-0,5/1.000.000/ano',
        faixaEtaria: 'Idade fertil; media ao diagnostico 35 anos',
        fatoresRisco: [
          'Sexo feminino (quase exclusivo)',
          'Esclerose tuberosa (TSC1/TSC2)',
          'Estrogeno (pode acelerar progressao)'
        ],
        citations: [{ refId: 'ats-lam-2016' }]
      },
      fisiopatologia: {
        texto: 'Mutacoes em TSC1/TSC2 levam a ativacao da via mTOR e proliferacao descontrolada de celulas LAM (celulas musculares lisas atipicas). Infiltracao de pulmoes, linfaticos e rins. Destruicao cistica do parenquima pulmonar.',
        citations: [{ refId: 'nejm-lam-2018' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dispneia progressiva',
          'Pneumotorax espontaneo (50-70%)',
          'Quilotorax (20-30%)',
          'Tosse',
          'Hemoptise (ocasional)'
        ],
        sinaisExameFisico: [
          'Murmúrio vesicular diminuido',
          'Exame frequentemente normal',
          'Sinais de pneumotorax se presente',
          'Linfedema (raro)'
        ],
        formasClinicas: [
          'S-LAM (esporadica)',
          'TSC-LAM (associada a esclerose tuberosa)'
        ],
        citations: [{ refId: 'ats-lam-2016' }]
      },
      diagnostico: {
        criterios: [
          'TCAR: cistos pulmonares difusos bilaterais',
          'Criterios confirmatorios: TSC, angiomiolipoma, VEGF-D >=800, biopsia'
        ],
        diagnosticoDiferencial: [
          'Histiocitose de celulas de Langerhans',
          'Sindrome de Birt-Hogg-Dube',
          'Enfisema',
          'Pneumonia intersticial linfocitica'
        ],
        examesLaboratoriais: [
          'VEGF-D serico (especifico)',
          'Funcao renal'
        ],
        examesImagem: [
          'TCAR: cistos redondos, difusos, parede fina',
          'TC/RM abdome: angiomiolipoma',
          'RM cranio: tubers (se TSC)'
        ],
        outrosExames: [
          'Biopsia pulmonar (se criterios nao preenchidos)',
          'Avaliacao genetica para TSC'
        ],
        citations: [{ refId: 'nejm-lam-2018' }]
      },
      tratamento: {
        objetivos: [
          'Estabilizar funcao pulmonar',
          'Tratar complicacoes',
          'Manter qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Evitar estrogeno',
            'Vacinacao',
            'Evitar mergulho, viagens aereas longas sem O2 se hipoxemia',
            'Pleurodese para pneumotorax recorrente'
          ],
          citations: [{ refId: 'ats-lam-2016' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Inibidor mTOR', medicamentos: ['Sirolimus', 'Everolimus'], posologia: 'Sirolimus 1-2mg/dia, nivel 5-15 ng/mL', observacoes: 'Indicado se VEF1 <70% ou declinando, quilotorax' }
          ],
          situacoesEspeciais: [
            { situacao: 'Quilotorax', conduta: 'Sirolimus; dieta pobre em gordura; drenagem se necessario' },
            { situacao: 'Angiomiolipoma >4cm', conduta: 'Sirolimus ou embolizacao' }
          ],
          citations: [{ refId: 'nejm-lam-2018' }]
        },
        duracao: 'Sirolimus continuo; suspensao leva a progressao'
      },
      acompanhamento: {
        frequenciaConsultas: 'Centro especializado a cada 3-6 meses',
        examesControle: [
          'Espirometria a cada 3-6 meses',
          'Nivel de sirolimus',
          'TCAR anual',
          'Imagem abdominal anual'
        ],
        metasTerapeuticas: [
          'VEF1 estavel',
          'Ausencia de pneumotorax/quilotorax',
          'VEGF-D normalizado'
        ],
        criteriosEncaminhamento: [
          'Centro de referencia em LAM',
          'Transplante: VEF1 <30%, hipoxemia grave',
          'Genetica: avaliacao para TSC'
        ],
        citations: [{ refId: 'ats-lam-2016' }]
      }
    },
    protocolos: ['lam-sirolimus', 'lam-pneumotorax'],
    medicamentos: ['sirolimus', 'everolimus'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'ats-lam-2016' }, { refId: 'nejm-lam-2018' }],
    lastUpdate: '2026-01',
    tags: ['LAM', 'cistos', 'mTOR', 'sirolimus', 'pneumotorax', 'esclerose-tuberosa']
  },

  {
    id: 'histiocitose-langerhans-pulmonar',
    titulo: 'Histiocitose de Celulas de Langerhans Pulmonar',
    sinonimos: ['PLCH', 'Histiocitose X Pulmonar', 'Granuloma Eosinofilico Pulmonar', 'HCLP'],
    doid: 'DOID:0060320',
    snomedCT: '78369003',
    meshId: 'D006646',
    umlsCui: 'C0019621',
    ordo: ['ORPHA:389'],
    ciap2: ['R99'],
    cid10: ['C96.6', 'D76.0'],
    cid11: ['2B31'],
    categoria: 'respiratorio',
    subcategoria: 'intersticial_rara',
    quickView: {
      definicao: 'Doenca pulmonar cistica causada por acumulo de celulas de Langerhans no intersticio pulmonar. Forte associacao com tabagismo. Evolucao variavel: remissao espontanea ou fibrose progressiva.',
      criteriosDiagnosticos: [
        'TCAR: nodulos e cistos, predominio em lobos superiores e medios',
        'Poupando angulos costofrenicos (caracteristico)',
        'LBA: celulas CD1a+ >5%',
        'Biopsia: granulomas com celulas de Langerhans (CD1a+, CD207+)',
        'Historia de tabagismo (>90%)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'CESSACAO TABAGICA (essencial e pode ser suficiente)',
          'Reabilitacao pulmonar',
          'Vacinacao'
        ],
        farmacologico: [
          'Corticoide: Prednisona 0,5-1mg/kg/dia (controverso)',
          'Cladribina: para doenca progressiva refrataria',
          'Tratamento de hipertensao pulmonar se presente',
          'Broncodilatador se obstrucao'
        ]
      },
      metasTerapeuticas: [
        'Cessacao tabagica sustentada',
        'Estabilizacao funcional e radiologica',
        'Prevenir complicacoes'
      ],
      examesIniciais: [
        'TCAR de torax',
        'Espirometria com DLCO',
        'Gasometria arterial',
        'Ecocardiograma (hipertensao pulmonar)',
        'LBA (CD1a)',
        'Avaliacao de doenca sistemica (ossos, hipofise)'
      ],
      redFlags: [
        'Pneumotorax espontaneo',
        'Hipertensao pulmonar grave',
        'Declinio funcional rapido',
        'Diabetes insipidus (acometimento hipofisario)',
        'Lesoes osseas liticas'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Rara; estimada 1-2/1.000.000',
        faixaEtaria: '20-40 anos; pico terceira decada',
        fatoresRisco: [
          'Tabagismo (>90% sao fumantes)',
          'Mutacoes BRAF V600E (50-70%)',
          'Sexo masculino (discreto predominio)'
        ],
        citations: [{ refId: 'erj-plch-2020' }]
      },
      fisiopatologia: {
        texto: 'Proliferacao clonal de celulas de Langerhans (CD1a+, CD207+) ativadas por componentes do cigarro. Formacao de granulomas peribronquiolares com eosinofilos. Destruicao bronquiolar leva a nodulos, cistos e fibrose. Mutacao BRAF frequente.',
        citations: [{ refId: 'nejm-lch-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Tosse seca',
          'Dispneia aos esforcos',
          'Pneumotorax espontaneo (10-25%)',
          'Pode ser assintomatico (achado incidental)',
          'Sintomas sistemicos (febre, emagrecimento - se disseminada)'
        ],
        sinaisExameFisico: [
          'Exame frequentemente normal',
          'Estertores (incomum)',
          'Sinais de pneumotorax se presente'
        ],
        formasClinicas: [
          'PLCH isolada (adultos fumantes)',
          'Histiocitose multissistemica (criancas, adultos)',
          'PLCH com hipertensao pulmonar'
        ],
        citations: [{ refId: 'erj-plch-2020' }]
      },
      diagnostico: {
        criterios: [
          'TCAR caracteristica + tabagismo + exclusao de outras causas',
          'LBA: CD1a+ >5% sugestivo',
          'Biopsia: granulomas com celulas de Langerhans'
        ],
        diagnosticoDiferencial: [
          'Linfangioleiomiomatose',
          'Enfisema centrolobular',
          'Sindrome de Birt-Hogg-Dube',
          'Pneumonia intersticial usual'
        ],
        examesLaboratoriais: [
          'LBA com citologia e CD1a',
          'Mutacao BRAF V600E (biopsia)'
        ],
        examesImagem: [
          'TCAR: nodulos e cistos, predominio superior e medio, poupa bases',
          'RX: infiltrado reticulonodular superior',
          'Cintilografia ossea/PET (doenca sistemica)'
        ],
        outrosExames: [
          'Biopsia transbrônquica ou cirurgica',
          'Avaliacao sistemica (ossos, hipofise, pele)'
        ],
        citations: [{ refId: 'nejm-lch-2020' }]
      },
      tratamento: {
        objetivos: [
          'Cessacao tabagica',
          'Estabilizar doenca',
          'Tratar complicacoes'
        ],
        naoFarmacologico: {
          medidas: [
            'Cessacao tabagica absoluta (pode levar a remissao)',
            'Reabilitacao pulmonar',
            'Pleurodese para pneumotorax recorrente'
          ],
          citations: [{ refId: 'erj-plch-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticosteroide', medicamentos: ['Prednisona'], posologia: '0,5-1mg/kg/dia', observacoes: 'Evidencia limitada; considerar se progressiva' }
          ],
          segundaLinha: [
            { classe: 'Quimioterapico', medicamentos: ['Cladribina', 'Citarabina'], posologia: 'Cladribina 5mg/m2/dia x5 dias', observacoes: 'Para doenca progressiva refrataria' },
            { classe: 'Inibidor BRAF', medicamentos: ['Vemurafenibe'], posologia: '960mg 2x/dia', observacoes: 'Se mutacao BRAF V600E presente' }
          ],
          situacoesEspeciais: [
            { situacao: 'Hipertensao pulmonar', conduta: 'Terapia especifica para HP; transplante' }
          ],
          citations: [{ refId: 'nejm-lch-2020' }]
        },
        duracao: 'Variavel; depende de resposta a cessacao tabagica'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses inicialmente',
        examesControle: [
          'Espirometria a cada 3-6 meses',
          'TCAR anual ou se mudanca',
          'Ecocardiograma (hipertensao pulmonar)',
          'Avaliacao sistemica periodica'
        ],
        metasTerapeuticas: [
          'Cessacao tabagica mantida',
          'Estabilizacao funcional',
          'Ausencia de progressao radiologica'
        ],
        criteriosEncaminhamento: [
          'Pneumologista especializado',
          'Transplante: fibrose avancada, HP grave',
          'Oncologia: se terapia sistemica'
        ],
        citations: [{ refId: 'erj-plch-2020' }]
      }
    },
    protocolos: ['plch-cessacao-tabagica', 'plch-tratamento'],
    medicamentos: ['prednisona', 'cladribina', 'vemurafenibe'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'erj-plch-2020' }, { refId: 'nejm-lch-2020' }],
    lastUpdate: '2026-01',
    tags: ['histiocitose', 'Langerhans', 'tabagismo', 'cistos', 'BRAF', 'CD1a']
  }
];
