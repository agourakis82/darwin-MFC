/**
 * DOENCAS AUTOIMUNES AVANCADAS - DARWIN-MFC EXPANSAO 800
 * ======================================================
 * Doencas autoimunes sistemicas e vasculites
 */

import { Doenca } from '@/lib/types/doenca';

export const autoimunesAvancadas: Doenca[] = [
  // ============================================================================
  // SINDROME DE SJOGREN
  // ============================================================================
  {
    id: 'sindrome-sjogren',
    titulo: 'Sindrome de Sjogren',
    sinonimos: ['Sjogren Syndrome', 'SS', 'Sindrome sicca'],
    doid: 'DOID:12894',
    snomedCT: '83901003',
    meshId: 'D012859',
    ciap2: ['L99'],
    cid10: ['M35.0'],
    categoria: 'musculoesqueletico',
    subcategoria: 'autoimune_sistemica',
    quickView: {
      definicao: 'Doenca autoimune cronica com infiltracao linfocitaria de glandulas exocrinas, causando xerostomia e xeroftalmia.',
      criteriosDiagnosticos: [
        'Criterios ACR/EULAR 2016 (>=4 pontos)',
        'Anti-SSA/Ro positivo (3 pontos)',
        'Biopsia glandula salivar: sialadenite focal (3 pontos)',
        'Score Schirmer <=5mm/5min (1 ponto)',
        'Fluxo salivar <=0,1ml/min (1 ponto)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Lagrimas artificiais', 'Saliva artificial', 'Higiene oral rigorosa'],
        farmacologico: ['Pilocarpina 5mg 3-4x/dia', 'Hidroxicloroquina para fadiga/artralgia', 'Corticoide se manifestacoes sistemicas']
      },
      metasTerapeuticas: ['Alivio sintomatico', 'Prevencao de caries', 'Controle de manifestacoes sistemicas'],
      examesIniciais: ['Anti-SSA/Ro', 'Anti-SSB/La', 'FAN', 'FR', 'Schirmer', 'Biopsia glandula salivar menor'],
      redFlags: ['Linfoma (risco 44x)', 'Pneumonite intersticial', 'Vasculite crioglobulinemica', 'Nefrite intersticial']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,5-1% da populacao',
        faixaEtaria: 'Mulheres 40-60 anos (9:1)',
        fatoresRisco: ['Sexo feminino', 'Historia familiar', 'HLA-DR3/DR2'],
        citations: [{ refId: 'eular-sjogren-2020' }]
      },
      fisiopatologia: {
        texto: 'Infiltracao linfocitaria de glandulas exocrinas mediada por celulas T e B, com producao de autoanticorpos.',
        citations: [{ refId: 'nat-rev-sjogren-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Olhos secos', 'Boca seca', 'Fadiga', 'Artralgia'],
        sinaisExameFisico: ['Aumento parotideo', 'Ulceras orais', 'Caries extensas'],
        citations: [{ refId: 'eular-sjogren-2020' }]
      },
      diagnostico: {
        criterios: ['Criterios ACR/EULAR 2016', 'Anti-SSA/Ro + ou biopsia focal score >=1'],
        diagnosticoDiferencial: ['LES', 'AR', 'Sarcoidose', 'Amiloidose', 'Linfoma'],
        examesLaboratoriais: ['Anti-SSA/Ro', 'Anti-SSB/La', 'FAN', 'FR'],
        citations: [{ refId: 'acr-sjogren-criteria-2016' }]
      },
      tratamento: {
        objetivos: ['Alivio sintomas sicca', 'Prevenir complicacoes', 'Tratar manifestacoes sistemicas'],
        naoFarmacologico: {
          medidas: ['Lagrimas artificiais', 'Saliva artificial', 'Higiene oral', 'Evitar farmacos anticolinergicos'],
          citations: [{ refId: 'eular-sjogren-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Secretagogo', medicamentos: ['Pilocarpina'], posologia: '5mg 3-4x/dia' },
            { classe: 'DMARD', medicamentos: ['Hidroxicloroquina'], posologia: '200-400mg/dia', observacoes: 'Para fadiga e artralgia' }
          ],
          citations: [{ refId: 'eular-sjogren-2020' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6-12 meses; mais frequente se manifestacoes sistemicas',
        examesControle: ['Hemograma', 'Funcao renal', 'Imunoglobulinas', 'Rastreio linfoma'],
        metasTerapeuticas: ['Controle sintomas', 'Vigilancia linfoma'],
        criteriosEncaminhamento: ['Reumatologista', 'Oftalmologista', 'Odontologista'],
        citations: [{ refId: 'eular-sjogren-2020' }]
      },
      prevencao: {
        primaria: ['Nao aplicavel'],
        secundaria: ['Rastreio linfoma', 'Prevencao caries'],
        citations: [{ refId: 'eular-sjogren-2020' }]
      }
    },
    protocolos: ['sjogren-tratamento'],
    medicamentos: ['pilocarpina', 'hidroxicloroquina'],
    calculadoras: ['esspri', 'essdai'],
    citations: [{ refId: 'eular-sjogren-2020' }, { refId: 'acr-sjogren-criteria-2016' }],
    lastUpdate: '2026-01',
    tags: ['sjogren', 'sicca', 'autoimune', 'xerostomia']
  },

  // ============================================================================
  // ESCLEROSE SISTEMICA
  // ============================================================================
  {
    id: 'esclerose-sistemica',
    titulo: 'Esclerose Sistemica',
    sinonimos: ['Esclerodermia', 'Systemic Sclerosis', 'SSc'],
    doid: 'DOID:418',
    snomedCT: '89155008',
    meshId: 'D012595',
    ciap2: ['L99'],
    cid10: ['M34'],
    categoria: 'musculoesqueletico',
    subcategoria: 'autoimune_sistemica',
    quickView: {
      definicao: 'Doenca autoimune caracterizada por fibrose cutanea e visceral progressiva, vasculopatia e autoanticorpos.',
      criteriosDiagnosticos: [
        'Criterios ACR/EULAR 2013 (>=9 pontos)',
        'Espessamento cutaneo proximal aos MCF (9 pontos)',
        'Esclerodactilia, dedos edemaciados',
        'Ulceras digitais, cicatrizes pitting',
        'Telangiectasias, FRP, HAP, DPI'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Aquecimento das extremidades', 'Cessacao tabagismo', 'Fisioterapia'],
        farmacologico: ['Nifedipino para FRP', 'Sildenafil para ulceras/HAP', 'Micofenolato para pele/pulmao', 'IECA para crise renal']
      },
      metasTerapeuticas: ['Prevenir fibrose progressiva', 'Controle FRP', 'Prevenir crise renal'],
      examesIniciais: ['FAN', 'Anti-Scl70', 'Anti-centrômero', 'TCAR torax', 'Ecocardiograma', 'Funcao pulmonar'],
      redFlags: ['Crise renal esclerodermica', 'HAP progressiva', 'DPI rapidamente progressiva', 'Miocardiopatia']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1-2/10.000',
        incidencia: '1-2/100.000/ano',
        faixaEtaria: 'Mulheres 30-50 anos (4:1)',
        fatoresRisco: ['Sexo feminino', 'Exposicao a silica', 'HLA-DRB1'],
        citations: [{ refId: 'eular-ssc-2017' }]
      },
      fisiopatologia: {
        texto: 'Triade de vasculopatia, autoimunidade e fibrose. Disfuncao endotelial leva a ativacao de fibroblastos e deposito excessivo de colageno.',
        citations: [{ refId: 'lancet-ssc-2017' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Fenomeno de Raynaud', 'Espessamento cutaneo', 'Dispneia', 'Disfagia'],
        sinaisExameFisico: ['Esclerodactilia', 'Microstomia', 'Telangiectasias', 'Ulceras digitais'],
        formasClinicas: ['Limitada (CREST)', 'Difusa'],
        citations: [{ refId: 'eular-ssc-2017' }]
      },
      diagnostico: {
        criterios: ['Criterios ACR/EULAR 2013', 'Espessamento cutaneo + autoanticorpos/capilaroscopia'],
        diagnosticoDiferencial: ['Esclerodermia localizada', 'Fasciite eosinofilica', 'DMTC'],
        examesLaboratoriais: ['Anti-Scl70 (difusa)', 'Anti-centromero (limitada)', 'Anti-RNA polimerase III'],
        examesImagem: ['TCAR torax', 'Ecocardiograma com PSAP'],
        citations: [{ refId: 'acr-ssc-criteria-2013' }]
      },
      tratamento: {
        objetivos: ['Prevenir progressao de fibrose', 'Tratar vasculopatia', 'Manejar complicacoes viscerais'],
        naoFarmacologico: {
          medidas: ['Aquecimento extremidades', 'Cessacao tabagismo', 'Protecao de ulceras', 'Fisioterapia'],
          citations: [{ refId: 'eular-ssc-2017' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Vasodilatador', medicamentos: ['Nifedipino'], posologia: '30-60mg/dia', observacoes: 'Para FRP' },
            { classe: 'Imunossupressor', medicamentos: ['Micofenolato'], posologia: '2-3g/dia', observacoes: 'Para pele e DPI' }
          ],
          segundaLinha: [
            { classe: 'Inibidor PDE5', medicamentos: ['Sildenafil'], posologia: '20mg 3x/dia', observacoes: 'Para ulceras digitais e HAP' }
          ],
          situacoesEspeciais: [
            { situacao: 'Crise renal', conduta: 'IECA (captopril) imediato' }
          ],
          citations: [{ refId: 'eular-ssc-2017' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses; mensal nos primeiros anos se difusa',
        examesControle: ['Funcao pulmonar anual', 'Ecocardiograma anual', 'PA domiciliar'],
        metasTerapeuticas: ['Estabilizacao cutanea', 'Preservacao funcao pulmonar'],
        criteriosEncaminhamento: ['Reumatologista obrigatorio', 'Pneumologista se DPI', 'Cardiologista se HAP'],
        citations: [{ refId: 'eular-ssc-2017' }]
      },
      prevencao: {
        primaria: ['Evitar exposicao a silica'],
        secundaria: ['Rastreio HAP e DPI', 'Monitorar funcao renal'],
        citations: [{ refId: 'eular-ssc-2017' }]
      }
    },
    protocolos: ['esclerose-sistemica-tratamento'],
    medicamentos: ['nifedipino', 'micofenolato', 'sildenafil', 'captopril'],
    calculadoras: ['mrss', 'rodnan'],
    citations: [{ refId: 'eular-ssc-2017' }, { refId: 'acr-ssc-criteria-2013' }],
    lastUpdate: '2026-01',
    tags: ['esclerodermia', 'fibrose', 'raynaud', 'autoimune']
  },

  // ============================================================================
  // DERMATOMIOSITE
  // ============================================================================
  {
    id: 'dermatomiosite',
    titulo: 'Dermatomiosite',
    sinonimos: ['DM', 'Dermatomyositis'],
    doid: 'DOID:10223',
    snomedCT: '396230008',
    meshId: 'D003882',
    ciap2: ['L99'],
    cid10: ['M33.1'],
    categoria: 'musculoesqueletico',
    subcategoria: 'miopatia_inflamatoria',
    quickView: {
      definicao: 'Miopatia inflamatoria idiopatica com fraqueza muscular proximal e manifestacoes cutaneas patognomonicas.',
      criteriosDiagnosticos: [
        'Criterios EULAR/ACR 2017',
        'Fraqueza muscular proximal simetrica',
        'Elevacao de enzimas musculares (CK)',
        'Heliotropo, papulas de Gottron',
        'EMG miopatico, biopsia muscular'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fotoproteção', 'Fisioterapia', 'Fonoaudiologia se disfagia'],
        farmacologico: ['Prednisona 1mg/kg/dia', 'Metotrexato ou Azatioprina associados', 'IGIV se refratario']
      },
      metasTerapeuticas: ['Recuperacao da forca muscular', 'Normalizacao de CK', 'Controle cutaneo'],
      examesIniciais: ['CK', 'Aldolase', 'TGO/TGP', 'Anticorpos miosite-especificos', 'EMG', 'RM muscular'],
      redFlags: ['Disfagia grave', 'DPI rapidamente progressiva', 'Malignidade associada', 'Calcinose extensa']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1-10/100.000',
        incidencia: '1-8/milhao/ano',
        faixaEtaria: 'Bimodal: 5-15 anos e 40-60 anos',
        fatoresRisco: ['Sexo feminino', 'Malignidade (adultos)', 'HLA-DRB1'],
        citations: [{ refId: 'eular-iim-2017' }]
      },
      fisiopatologia: {
        texto: 'Vasculopatia mediada por complemento afetando capilares musculares e cutaneos, com infiltrado perivascular.',
        citations: [{ refId: 'nejm-myositis-2015' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Fraqueza proximal', 'Heliotropo', 'Papulas de Gottron', 'Disfagia'],
        sinaisExameFisico: ['Fraqueza cinturas', 'Eritema heliotropo', 'Papulas sobre MCF', 'Maos de mecanico'],
        formasClinicas: ['DM classica', 'DM amiopatica', 'DM juvenil'],
        citations: [{ refId: 'eular-iim-2017' }]
      },
      diagnostico: {
        criterios: ['EULAR/ACR 2017', 'Clinica + CK + EMG/RM + biopsia'],
        diagnosticoDiferencial: ['Polimiosite', 'Miosite por corpos de inclusao', 'Distrofias', 'Miopatia por estatina'],
        examesLaboratoriais: ['CK (elevada)', 'Anti-Mi-2', 'Anti-MDA5', 'Anti-TIF1-gamma'],
        examesImagem: ['RM muscular: edema muscular'],
        citations: [{ refId: 'acr-iim-criteria-2017' }]
      },
      tratamento: {
        objetivos: ['Recuperar forca', 'Controlar cutaneo', 'Rastrear malignidade'],
        naoFarmacologico: {
          medidas: ['Fotoproteção', 'Fisioterapia gradual', 'Fonoaudiologia'],
          citations: [{ refId: 'eular-iim-2017' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide', medicamentos: ['Prednisona'], posologia: '1mg/kg/dia', observacoes: 'Desmame lento apos resposta' },
            { classe: 'Poupador de corticoide', medicamentos: ['Metotrexato', 'Azatioprina'], posologia: 'MTX 15-25mg/sem; AZA 2-3mg/kg/dia' }
          ],
          segundaLinha: [
            { classe: 'Imunoglobulina', medicamentos: ['IGIV'], posologia: '2g/kg dividido em 2-5 dias/mes' }
          ],
          citations: [{ refId: 'eular-iim-2017' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal na fase ativa; a cada 3-6 meses estavel',
        examesControle: ['CK', 'Funcao hepatica', 'Forca muscular', 'Funcao pulmonar'],
        metasTerapeuticas: ['CK normal', 'Forca recuperada', 'Corticoide minimo'],
        criteriosEncaminhamento: ['Reumatologista', 'Rastreio malignidade em >40 anos'],
        citations: [{ refId: 'eular-iim-2017' }]
      },
      prevencao: {
        primaria: ['Nao aplicavel'],
        secundaria: ['Rastreio malignidade por 3 anos'],
        citations: [{ refId: 'eular-iim-2017' }]
      }
    },
    protocolos: ['dermatomiosite-tratamento'],
    medicamentos: ['prednisona', 'metotrexato', 'azatioprina', 'imunoglobulina'],
    calculadoras: ['mmt8', 'cmas'],
    citations: [{ refId: 'eular-iim-2017' }, { refId: 'acr-iim-criteria-2017' }],
    lastUpdate: '2026-01',
    tags: ['dermatomiosite', 'miopatia', 'autoimune', 'gottron']
  },

  // ============================================================================
  // SINDROME ANTIFOSFOLIPIDE
  // ============================================================================
  {
    id: 'sindrome-antifosfolipide',
    titulo: 'Sindrome Antifosfolipide',
    sinonimos: ['SAF', 'APS', 'Antiphospholipid Syndrome'],
    doid: 'DOID:2988',
    snomedCT: '72631000',
    meshId: 'D016736',
    ciap2: ['B83'],
    cid10: ['D68.6'],
    categoria: 'hematologico',
    subcategoria: 'trombofilia_autoimune',
    quickView: {
      definicao: 'Trombofilia autoimune caracterizada por tromboses e/ou morbidade gestacional na presenca de anticorpos antifosfolipides.',
      criteriosDiagnosticos: [
        'Criterios Sydney 2006',
        'CLINICO: Trombose vascular ou morbidade obstetrica',
        'LABORATORIAL: aPL positivo em 2 ocasioes (>12 semanas)',
        'Anticoagulante lupico, anticardiolipina IgG/IgM, anti-beta2GPI'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Controle fatores risco CV', 'Evitar estrogeno'],
        farmacologico: ['Warfarina INR 2-3 (trombose venosa)', 'Warfarina INR 3-4 (trombose arterial)', 'AAS + HBPM na gestacao']
      },
      metasTerapeuticas: ['Prevenir recorrencia trombotica', 'Gestacao bem-sucedida'],
      examesIniciais: ['Anticoagulante lupico', 'Anticardiolipina IgG/IgM', 'Anti-beta2GPI', 'Hemograma'],
      redFlags: ['SAF catastrofica', 'Trombocitopenia grave', 'Valvulopatia', 'Livedo racemosa']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'aPL positivo: 1-5% populacao; SAF clinico: raro',
        faixaEtaria: '30-40 anos; mulheres 5:1',
        fatoresRisco: ['LES (40% tem aPL)', 'Outras doencas autoimunes', 'Infeccoes'],
        citations: [{ refId: 'eular-aps-2019' }]
      },
      fisiopatologia: {
        texto: 'Anticorpos antifosfolipides ativam endotelio, plaquetas e complemento, promovendo estado protrombotico.',
        citations: [{ refId: 'nejm-aps-2018' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['TVP', 'TEP', 'AVC', 'Perdas gestacionais recorrentes'],
        sinaisExameFisico: ['Livedo reticular', 'Sinais de trombose', 'Valvulopatia'],
        formasClinicas: ['SAF primaria', 'SAF secundaria (LES)', 'SAF catastrofica'],
        citations: [{ refId: 'eular-aps-2019' }]
      },
      diagnostico: {
        criterios: ['Criterios Sydney 2006', '>=1 clinico + >=1 laboratorial'],
        diagnosticoDiferencial: ['Outras trombofilias', 'Neoplasia oculta', 'Vasculites'],
        examesLaboratoriais: ['LAC', 'aCL IgG/IgM', 'Anti-beta2GPI IgG/IgM'],
        citations: [{ refId: 'sydney-aps-criteria-2006' }]
      },
      tratamento: {
        objetivos: ['Prevenir trombose', 'Gestacao segura', 'Tratar trombose aguda'],
        naoFarmacologico: {
          medidas: ['Cessacao tabagismo', 'Controle PA e lipidios', 'Evitar estrogeno'],
          citations: [{ refId: 'eular-aps-2019' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Anticoagulante', medicamentos: ['Warfarina'], posologia: 'INR 2-3 (venoso); INR 3-4 (arterial)', observacoes: 'Indefinido' },
            { classe: 'Obstetrico', medicamentos: ['AAS', 'Enoxaparina'], posologia: 'AAS 100mg + HBPM profilatica', observacoes: 'Na gestacao' }
          ],
          citations: [{ refId: 'eular-aps-2019' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses; INR semanal inicial',
        examesControle: ['INR', 'aPL anual', 'Funcao renal'],
        metasTerapeuticas: ['INR no alvo', 'Sem recorrencia'],
        criteriosEncaminhamento: ['Hematologista', 'Reumatologista se LES', 'Alto risco obstetrico'],
        citations: [{ refId: 'eular-aps-2019' }]
      },
      prevencao: {
        primaria: ['Tromboprofilaxia em situacoes de risco'],
        secundaria: ['Anticoagulacao cronica'],
        citations: [{ refId: 'eular-aps-2019' }]
      }
    },
    protocolos: ['saf-tratamento'],
    medicamentos: ['warfarina', 'enoxaparina', 'aas'],
    calculadoras: ['gapss', 'aps-score'],
    citations: [{ refId: 'eular-aps-2019' }, { refId: 'sydney-aps-criteria-2006' }],
    lastUpdate: '2026-01',
    tags: ['antifosfolipide', 'trombose', 'autoimune', 'gestacao']
  },

  // ============================================================================
  // VASCULITE ANCA
  // ============================================================================
  {
    id: 'vasculite-anca',
    titulo: 'Vasculite Associada a ANCA',
    sinonimos: ['AAV', 'ANCA-associated vasculitis', 'GPA', 'MPA', 'EGPA'],
    doid: 'DOID:13145',
    snomedCT: '239934007',
    meshId: 'D055953',
    ciap2: ['K99'],
    cid10: ['M31.3', 'M31.7'],
    categoria: 'cardiovascular',
    subcategoria: 'vasculite',
    quickView: {
      definicao: 'Vasculites de pequenos vasos associadas a anticorpos anticitoplasma de neutrofilos (ANCA), incluindo GPA, MPA e EGPA.',
      criteriosDiagnosticos: [
        'Clinica de vasculite de pequenos vasos',
        'ANCA positivo (PR3 ou MPO)',
        'GPA: granulomas VAS + GNRP',
        'MPA: GNRP + hemorragia alveolar',
        'EGPA: asma + eosinofilia + vasculite'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Suporte nutricional', 'Reabilitacao pulmonar'],
        farmacologico: ['Inducao: Ciclofosfamida ou Rituximabe + Prednisona', 'Manutencao: Azatioprina ou Rituximabe', 'Plasmaferese se grave']
      },
      metasTerapeuticas: ['Remissao clinica', 'Preservar funcao renal', 'Minimizar corticoide'],
      examesIniciais: ['ANCA (PR3, MPO)', 'Creatinina', 'EAS', 'TCAR torax', 'Biopsia renal/pulmonar'],
      redFlags: ['Hemorragia alveolar', 'GNRP', 'Mononeurite multipla', 'Estenose subglotica']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '46-184/milhao',
        incidencia: '10-20/milhao/ano',
        faixaEtaria: 'Pico 65-74 anos',
        fatoresRisco: ['Exposicao a silica', 'Farmacos (hidralazina, PTU)', 'Infeccoes'],
        citations: [{ refId: 'eular-aav-2022' }]
      },
      fisiopatologia: {
        texto: 'ANCA ativam neutrofilos que aderem ao endotelio e liberam especies reativas, causando necrose vascular.',
        citations: [{ refId: 'nejm-aav-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Sintomas constitucionais', 'Glomerulonefrite', 'Hemorragia pulmonar', 'Sinusite/rinite'],
        sinaisExameFisico: ['Purpura', 'Nariz em sela (GPA)', 'Mononeurite multipla'],
        formasClinicas: ['GPA (Wegener)', 'MPA', 'EGPA (Churg-Strauss)'],
        citations: [{ refId: 'eular-aav-2022' }]
      },
      diagnostico: {
        criterios: ['ACR/EULAR 2022', 'Clinica + ANCA + biopsia'],
        diagnosticoDiferencial: ['Anti-GBM', 'LES', 'Crioglobulinemia', 'Endocardite'],
        examesLaboratoriais: ['ANCA-PR3 (GPA)', 'ANCA-MPO (MPA)', 'Eosinofilos (EGPA)'],
        examesImagem: ['TCAR torax', 'TC seios da face'],
        citations: [{ refId: 'acr-aav-criteria-2022' }]
      },
      tratamento: {
        objetivos: ['Inducao de remissao', 'Manutencao sem recidiva', 'Protecao renal'],
        naoFarmacologico: {
          medidas: ['Suporte renal', 'Vacinacao', 'Profilaxia Pneumocystis'],
          citations: [{ refId: 'eular-aav-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Inducao', medicamentos: ['Rituximabe', 'Ciclofosfamida'], observacoes: '+ Prednisona 1mg/kg' },
            { classe: 'Manutencao', medicamentos: ['Rituximabe', 'Azatioprina'], posologia: 'RTX 500mg a cada 6 meses; AZA 2mg/kg/dia' }
          ],
          situacoesEspeciais: [
            { situacao: 'Hemorragia alveolar/GNRP grave', conduta: 'Plasmaferese + metilprednisolona pulso' }
          ],
          citations: [{ refId: 'eular-aav-2022' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal na inducao; a cada 3 meses na manutencao',
        examesControle: ['ANCA', 'Creatinina', 'EAS', 'Hemograma'],
        metasTerapeuticas: ['BVAS = 0', 'Funcao renal estavel'],
        criteriosEncaminhamento: ['Reumatologista', 'Nefrologista', 'Pneumologista'],
        citations: [{ refId: 'eular-aav-2022' }]
      },
      prevencao: {
        primaria: ['Evitar exposicao a silica'],
        secundaria: ['Manutencao imunossupressora', 'Monitorar ANCA'],
        citations: [{ refId: 'eular-aav-2022' }]
      }
    },
    protocolos: ['vasculite-anca-tratamento'],
    medicamentos: ['rituximabe', 'ciclofosfamida', 'azatioprina', 'prednisona'],
    calculadoras: ['bvas', 'vdi'],
    citations: [{ refId: 'eular-aav-2022' }, { refId: 'acr-aav-criteria-2022' }],
    lastUpdate: '2026-01',
    tags: ['vasculite', 'anca', 'gpa', 'mpa', 'egpa']
  },

  // ============================================================================
  // ARTERITE DE CELULAS GIGANTES
  // ============================================================================
  {
    id: 'arterite-celulas-gigantes',
    titulo: 'Arterite de Celulas Gigantes',
    sinonimos: ['ACG', 'Arterite temporal', 'Giant Cell Arteritis', 'GCA'],
    doid: 'DOID:11303',
    snomedCT: '400130008',
    meshId: 'D013700',
    ciap2: ['K99'],
    cid10: ['M31.5', 'M31.6'],
    categoria: 'cardiovascular',
    subcategoria: 'vasculite',
    quickView: {
      definicao: 'Vasculite de grandes vasos afetando aorta e seus ramos, especialmente arteria temporal. Emergencia pela perda visual.',
      criteriosDiagnosticos: [
        'Criterios ACR 1990 (>=3 de 5)',
        'Idade >=50 anos',
        'Cefaleia nova',
        'Anormalidade arteria temporal',
        'VHS >=50mm/h',
        'Biopsia com arterite'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['AAS baixa dose', 'Prevencao osteoporose'],
        farmacologico: ['Prednisona 40-60mg/dia (sem sintomas visuais)', 'Metilprednisolona IV 1g/dia x3 (sintomas visuais)', 'Tocilizumabe para poupador de corticoide']
      },
      metasTerapeuticas: ['Prevenir cegueira', 'Controle de sintomas', 'Reducao de corticoide'],
      examesIniciais: ['VHS', 'PCR', 'Hemograma', 'US arteria temporal', 'Biopsia temporal'],
      redFlags: ['Amaurose fugaz', 'Perda visual aguda', 'Diplopia', 'Claudicacao mandibular']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '20-30/100.000 >50 anos',
        incidencia: '15-25/100.000/ano >50 anos',
        faixaEtaria: '>50 anos (media 70 anos)',
        fatoresRisco: ['Idade avancada', 'Sexo feminino (2-3:1)', 'Ascendencia nordica', 'Polimialgia reumatica'],
        citations: [{ refId: 'eular-gca-2020' }]
      },
      fisiopatologia: {
        texto: 'Inflamacao granulomatosa da parede arterial mediada por celulas T e macrofagos, com formacao de celulas gigantes.',
        citations: [{ refId: 'nejm-gca-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Cefaleia temporal nova', 'Claudicacao mandibular', 'Disturbio visual', 'Sintomas constitucionais'],
        sinaisExameFisico: ['Arteria temporal espessada, nodular', 'Pulso temporal ausente', 'Sensibilidade couro cabeludo'],
        formasClinicas: ['Craniana', 'Aortica (grandes vasos)', 'Sobreposta a PMR'],
        citations: [{ refId: 'eular-gca-2020' }]
      },
      diagnostico: {
        criterios: ['ACR 1990', 'Biopsia ou US com halo'],
        diagnosticoDiferencial: ['Cefaleia primaria', 'NAION', 'Aterosclerose carotidea'],
        examesLaboratoriais: ['VHS (tipicamente >50-100)', 'PCR elevado', 'Anemia inflamatoria'],
        examesImagem: ['US temporal: sinal do halo', 'PET-CT se suspeita grandes vasos'],
        citations: [{ refId: 'acr-gca-criteria-1990' }]
      },
      tratamento: {
        objetivos: ['Prevenir cegueira', 'Controlar inflamacao', 'Minimizar corticoide'],
        naoFarmacologico: {
          medidas: ['AAS 100mg/dia', 'Calcio + vitamina D', 'Rastreio osteoporose'],
          citations: [{ refId: 'eular-gca-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide', medicamentos: ['Prednisona'], posologia: '40-60mg/dia', observacoes: 'Desmame lento em 12-24 meses' }
          ],
          segundaLinha: [
            { classe: 'Anti-IL6', medicamentos: ['Tocilizumabe'], posologia: '162mg SC semanal', observacoes: 'Poupador de corticoide; primeira linha com corticoide em recidivantes' }
          ],
          situacoesEspeciais: [
            { situacao: 'Sintomas visuais', conduta: 'Metilprednisolona 1g IV x3 dias, depois prednisona oral' }
          ],
          citations: [{ refId: 'eular-gca-2020' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal no primeiro mes; mensal nos primeiros 6 meses',
        examesControle: ['VHS', 'PCR', 'Glicemia', 'PA'],
        metasTerapeuticas: ['Assintomatico', 'VHS/PCR normais', 'Corticoide minimo'],
        criteriosEncaminhamento: ['Reumatologista', 'Oftalmologista urgente se sintomas visuais'],
        citations: [{ refId: 'eular-gca-2020' }]
      },
      prevencao: {
        primaria: ['Nao aplicavel'],
        secundaria: ['Rastreio aneurisma aortico', 'Prevencao osteoporose'],
        citations: [{ refId: 'eular-gca-2020' }]
      }
    },
    protocolos: ['arterite-temporal-tratamento'],
    medicamentos: ['prednisona', 'tocilizumabe', 'metilprednisolona'],
    calculadoras: [],
    citations: [{ refId: 'eular-gca-2020' }, { refId: 'acr-gca-criteria-1990' }],
    lastUpdate: '2026-01',
    tags: ['arterite', 'temporal', 'celulas-gigantes', 'vasculite']
  },

  // ============================================================================
  // SINDROME DE BEHCET
  // ============================================================================
  {
    id: 'sindrome-behcet',
    titulo: 'Sindrome de Behcet',
    sinonimos: ['Doenca de Behcet', 'Behcet Disease', 'BD'],
    doid: 'DOID:13241',
    snomedCT: '77024004',
    meshId: 'D001528',
    ciap2: ['S99'],
    cid10: ['M35.2'],
    categoria: 'musculoesqueletico',
    subcategoria: 'vasculite',
    quickView: {
      definicao: 'Vasculite sistemica cronica com ulceras orais e genitais recorrentes, uveite e manifestacoes cutaneas.',
      criteriosDiagnosticos: [
        'Criterios ISG 1990',
        'Ulceras orais recorrentes (>=3/ano) obrigatorio',
        '+ 2 de: ulceras genitais, lesoes oculares, lesoes cutaneas, patergia positiva'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar trauma (patergia)', 'Higiene oral'],
        farmacologico: ['Colchicina para mucocutaneo', 'Azatioprina para uveite', 'Prednisona para flares', 'Anti-TNF se refratario']
      },
      metasTerapeuticas: ['Controle de ulceras', 'Prevenir cegueira', 'Prevenir trombose'],
      examesIniciais: ['HLA-B51', 'Patergia', 'Fundoscopia', 'Angiografia se suspeita vascular'],
      redFlags: ['Uveite posterior', 'Trombose venosa cerebral', 'Aneurisma arterial', 'Envolvimento neurológico']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Variavel: 20-420/100.000 na Turquia; raro no Ocidente',
        faixaEtaria: '20-40 anos',
        fatoresRisco: ['HLA-B51', 'Rota da Seda', 'Sexo masculino (formas graves)'],
        citations: [{ refId: 'eular-behcet-2018' }]
      },
      fisiopatologia: {
        texto: 'Vasculite de vasos de qualquer tamanho com infiltrado neutrofilico. HLA-B51 e resposta Th1/Th17 exacerbada.',
        citations: [{ refId: 'nat-rev-behcet-2019' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Ulceras orais dolorosas', 'Ulceras genitais', 'Uveite', 'Lesoes cutaneas'],
        sinaisExameFisico: ['Aftas orais', 'Ulceras escrotais/vulvares', 'Eritema nodoso', 'Patergia positiva'],
        formasClinicas: ['Mucocutanea', 'Ocular', 'Vascular', 'Neurologica'],
        citations: [{ refId: 'eular-behcet-2018' }]
      },
      diagnostico: {
        criterios: ['ISG 1990', 'ICBD 2014'],
        diagnosticoDiferencial: ['Aftas comuns', 'Herpes', 'LES', 'Crohn', 'Sarcoidose'],
        examesLaboratoriais: ['HLA-B51 (50-80% positivo)', 'VHS/PCR elevados em flares'],
        citations: [{ refId: 'isg-behcet-criteria-1990' }]
      },
      tratamento: {
        objetivos: ['Controlar manifestacoes', 'Prevenir dano orgânico', 'Manter qualidade de vida'],
        naoFarmacologico: {
          medidas: ['Evitar trauma (patergia)', 'Higiene oral', 'Cessacao tabagismo'],
          citations: [{ refId: 'eular-behcet-2018' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Anti-inflamatorio', medicamentos: ['Colchicina'], posologia: '1-2mg/dia', observacoes: 'Para mucocutaneo e artrite' },
            { classe: 'Imunossupressor', medicamentos: ['Azatioprina'], posologia: '2-2,5mg/kg/dia', observacoes: 'Para uveite' }
          ],
          segundaLinha: [
            { classe: 'Biologico', medicamentos: ['Infliximabe', 'Adalimumabe'], observacoes: 'Para uveite refrataria ou neurobehcet' }
          ],
          citations: [{ refId: 'eular-behcet-2018' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 1-3 meses conforme atividade',
        examesControle: ['Fundoscopia periodica', 'VHS/PCR', 'Monitorar imunossupressao'],
        metasTerapeuticas: ['Sem ulceras', 'Visao preservada'],
        criteriosEncaminhamento: ['Reumatologista', 'Oftalmologista', 'Neurologista se neurobehcet'],
        citations: [{ refId: 'eular-behcet-2018' }]
      },
      prevencao: {
        primaria: ['Nao aplicavel'],
        secundaria: ['Colchicina continua', 'Vigilancia ocular'],
        citations: [{ refId: 'eular-behcet-2018' }]
      }
    },
    protocolos: ['behcet-tratamento'],
    medicamentos: ['colchicina', 'azatioprina', 'infliximabe', 'prednisona'],
    calculadoras: ['bdcaf'],
    citations: [{ refId: 'eular-behcet-2018' }, { refId: 'isg-behcet-criteria-1990' }],
    lastUpdate: '2026-01',
    tags: ['behcet', 'aftas', 'uveite', 'vasculite']
  },

  // ============================================================================
  // SARCOIDOSE
  // ============================================================================
  {
    id: 'sarcoidose',
    titulo: 'Sarcoidose',
    sinonimos: ['Sarcoidosis', 'Doenca de Besnier-Boeck-Schaumann'],
    doid: 'DOID:11335',
    snomedCT: '31541009',
    meshId: 'D012507',
    ciap2: ['R99'],
    cid10: ['D86'],
    categoria: 'respiratorio',
    subcategoria: 'granulomatosa',
    quickView: {
      definicao: 'Doenca granulomatosa multissistemica de etiologia desconhecida, com acometimento pulmonar e linfonodal predominante.',
      criteriosDiagnosticos: [
        'Clinica compativel',
        'Granulomas nao caseosos na biopsia',
        'Exclusao de outras causas (TB, fungos, linfoma)',
        'Adenopatia hilar bilateral na RX'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Observacao se assintomatico', 'Cessacao tabagismo'],
        farmacologico: ['Prednisona 20-40mg/dia se sintomatico', 'Metotrexato se refratario ou poupador', 'Hidroxicloroquina para pele']
      },
      metasTerapeuticas: ['Alivio sintomas', 'Preservar funcao pulmonar', 'Evitar fibrose'],
      examesIniciais: ['RX torax', 'TCAR', 'Funcao pulmonar', 'Calcio serico/urinario', 'ECG', 'Oftalmoscopia'],
      redFlags: ['Hipercalcemia', 'Envolvimento cardiaco', 'Neurossarcoidose', 'Fibrose pulmonar avancada']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-40/100.000',
        incidencia: '5-40/100.000/ano',
        faixaEtaria: '25-45 anos; segundo pico >50 anos',
        fatoresRisco: ['Afrodescendentes (maior incidencia e gravidade)', 'Historia familiar', 'Exposicoes ocupacionais'],
        citations: [{ refId: 'ats-sarcoidosis-2020' }]
      },
      fisiopatologia: {
        texto: 'Resposta imune Th1 exacerbada a antigenos desconhecidos, formando granulomas nao caseosos com celulas epitelioides e gigantes.',
        citations: [{ refId: 'lancet-sarcoidosis-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Tosse seca', 'Dispneia', 'Fadiga', 'Lesoes cutaneas', 'Uveite'],
        sinaisExameFisico: ['Linfadenopatia', 'Eritema nodoso', 'Lupus pernio', 'Estertores finos'],
        formasClinicas: ['Pulmonar (90%)', 'Cutanea', 'Ocular', 'Cardiaca', 'Neurologica'],
        citations: [{ refId: 'ats-sarcoidosis-2020' }]
      },
      diagnostico: {
        criterios: ['Clinica + biopsia + exclusao diferenciais'],
        diagnosticoDiferencial: ['Tuberculose', 'Linfoma', 'Histoplasmose', 'Beriliose'],
        examesLaboratoriais: ['ECA (elevada em 60%)', 'Calcio serico', 'Vitamina D'],
        examesImagem: ['RX torax: adenopatia hilar bilateral', 'TCAR: nodulos perilinfaticos'],
        citations: [{ refId: 'ats-sarcoidosis-2020' }]
      },
      tratamento: {
        objetivos: ['Controlar inflamacao', 'Preservar funcao', 'Minimizar efeitos adversos'],
        naoFarmacologico: {
          medidas: ['Observacao se assintomatico estagio I', 'Cessacao tabagismo', 'Evitar sol (hipercalcemia)'],
          citations: [{ refId: 'ats-sarcoidosis-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide', medicamentos: ['Prednisona'], posologia: '20-40mg/dia por 4-6 semanas, desmame em 6-12 meses', observacoes: 'Se sintomatico ou estagio II-IV' }
          ],
          segundaLinha: [
            { classe: 'Poupador de corticoide', medicamentos: ['Metotrexato'], posologia: '10-15mg/semana' },
            { classe: 'Antimalárico', medicamentos: ['Hidroxicloroquina'], posologia: '200-400mg/dia', observacoes: 'Para pele e hipercalcemia' }
          ],
          citations: [{ refId: 'ats-sarcoidosis-2020' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses; anual se remissao',
        examesControle: ['Funcao pulmonar', 'RX torax', 'Calcio', 'ECG/Holter se cardiaco'],
        metasTerapeuticas: ['Estabilizacao pulmonar', 'Calcio normal'],
        criteriosEncaminhamento: ['Pneumologista', 'Cardiologista se arritmia', 'Neurologista se neurossarcoidose'],
        citations: [{ refId: 'ats-sarcoidosis-2020' }]
      },
      prevencao: {
        primaria: ['Nao aplicavel'],
        secundaria: ['Rastreio complicacoes', 'Vacinacao'],
        citations: [{ refId: 'ats-sarcoidosis-2020' }]
      }
    },
    protocolos: ['sarcoidose-tratamento'],
    medicamentos: ['prednisona', 'metotrexato', 'hidroxicloroquina'],
    calculadoras: [],
    citations: [{ refId: 'ats-sarcoidosis-2020' }, { refId: 'lancet-sarcoidosis-2021' }],
    lastUpdate: '2026-01',
    tags: ['sarcoidose', 'granuloma', 'pulmonar', 'hilar']
  }
];
