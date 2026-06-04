/**
 * DOENCAS ONCOLOGICAS AVANCADAS - DARWIN-MFC EXPANSAO 800
 * =======================================================
 * 12 neoplasias malignas comuns com manejo clinico
 *
 * Ontologias integradas:
 * - DOID (Disease Ontology)
 * - SNOMED-CT (Systematized Nomenclature of Medicine)
 * - MeSH (Medical Subject Headings)
 * - CID-10 / CIAP-2
 */

import { Doenca } from '@/lib/types/doenca';

export const oncologicasAvancadas: Doenca[] = [
  // ============================================================================
  // CANCER DE MAMA
  // ============================================================================
  {
    id: 'cancer-mama',
    titulo: 'Cancer de Mama',
    sinonimos: ['Carcinoma mamario', 'Neoplasia maligna da mama'],
    doid: 'DOID:1612',
    snomedCT: '254837009',
    meshId: 'D001943',
    ciap2: ['X76'],
    cid10: ['C50'],
    categoria: 'hematologico',
    subcategoria: 'oncologia',
    lastUpdate: '2026-01',
    quickView: {
      definicao: 'Neoplasia maligna mais comum em mulheres. Tipos histologicos principais: carcinoma ductal invasivo (70-80%) e carcinoma lobular invasivo (10-15%). Classificacao molecular orienta tratamento.',
      criteriosDiagnosticos: [
        'Mamografia suspeita (BI-RADS 4-5)',
        'Nodulo palpavel com caracteristicas suspeitas',
        'Biopsia (core biopsy ou excisional) com confirmacao histopatologica',
        'Imunohistoquimica: RE, RP, HER2, Ki-67'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Cirurgia conservadora ou mastectomia',
          'Radioterapia adjuvante',
          'Linfadenectomia/biopsia de linfonodo sentinela'
        ],
        farmacologico: [
          'RE+: Tamoxifeno ou inibidor de aromatase',
          'HER2+: Trastuzumabe + quimioterapia',
          'Triplo-negativo: Quimioterapia sistemica'
        ]
      },
      redFlags: [
        'Nodulo fixo a planos profundos',
        'Retracao de pele ou mamilo',
        'Linfonodomegalia axilar petrosa',
        'Peau dorange',
        'Derrame papilar sanguinolento unilateral'
      ],
      metasTerapeuticas: [
        'Resseccao R0 com margens livres',
        'Controle locoregional',
        'Prevencao de metastases'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Cancer mais frequente em mulheres (excluindo pele nao-melanoma)',
        incidencia: '66.280 casos novos/ano no Brasil (INCA 2022)',
        mortalidade: '18.068 obitos/ano no Brasil',
        faixaEtaria: 'Pico entre 50-69 anos',
        fatoresRisco: [
          'Historia familiar (BRCA1/2)',
          'Menarca precoce/menopausa tardia',
          'Nuliparidade',
          'TRH prolongada',
          'Obesidade pos-menopausa'
        ],
        citations: [{ refId: 'inca-cancer-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Nodulo indolor (mais comum)',
          'Alteracao de contorno mamario',
          'Retracao de mamilo',
          'Derrame papilar'
        ],
        sinaisExameFisico: [
          'Nodulo duro, irregular, fixo',
          'Linfonodomegalia axilar',
          'Alteracoes cutaneas'
        ],
        citations: [{ refId: 'nccn-breast-2024' }]
      },
      diagnostico: {
        criterios: [
          'Histopatologia confirmatoria',
          'Estadiamento TNM',
          'Perfil molecular (Luminal A/B, HER2+, Triplo-negativo)'
        ],
        diagnosticoDiferencial: [
          'Fibroadenoma',
          'Cisto mamario',
          'Mastite/abscesso',
          'Tumor phyllodes'
        ],
        examesLaboratoriais: ['CA 15-3', 'CEA', 'Hemograma', 'Funcao hepatica/renal'],
        examesImagem: ['Mamografia', 'USG mamaria', 'RNM mamas', 'PET-CT (estadiamento)'],
        citations: [{ refId: 'asco-breast-2023' }]
      },
      tratamento: {
        objetivos: ['Cura ou controle da doenca', 'Preservacao funcional e estetica'],
        naoFarmacologico: {
          medidas: [
            'Cirurgia conservadora (quadrantectomia)',
            'Mastectomia (indicacoes especificas)',
            'Radioterapia adjuvante',
            'Reconstrucao mamaria'
          ],
          citations: [{ refId: 'nccn-breast-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Hormonioterapia', medicamentos: ['Tamoxifeno', 'Anastrozol', 'Letrozol'], posologia: 'Conforme status hormonal', observacoes: 'RE/RP positivo' },
            { classe: 'Anti-HER2', medicamentos: ['Trastuzumabe', 'Pertuzumabe'], posologia: 'Esquema padrao NCCN', observacoes: 'HER2 amplificado' },
            { classe: 'Quimioterapia', medicamentos: ['AC-T', 'TC', 'CMF'], posologia: 'Esquemas baseados em antraciclina/taxano' }
          ],
          citations: [{ refId: 'esmo-breast-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Trimestral nos 2 primeiros anos, semestral ate 5 anos, depois anual',
        examesControle: ['Mamografia anual', 'Exame clinico', 'Marcadores se indicado'],
        metasTerapeuticas: ['Sobrevida livre de doenca', 'Qualidade de vida'],
        criteriosEncaminhamento: ['Suspeita de recidiva', 'Metastases', 'Toxicidade grave'],
        citations: [{ refId: 'asco-survivorship-2023' }]
      },
      prevencao: {
        primaria: ['Amamentacao', 'Atividade fisica', 'Controle de peso', 'Evitar TRH prolongada'],
        secundaria: ['Mamografia bienal 50-69 anos (SUS)', 'Exame clinico anual'],
        citations: [{ refId: 'inca-rastreamento-2022' }]
      }
    },
    protocolos: ['rastreamento-cancer-mama'],
    medicamentos: ['tamoxifeno', 'trastuzumabe', 'anastrozol'],
    calculadoras: ['oncotype-dx', 'predict-breast'],
    citations: [{ refId: 'nccn-breast-2024' }]
  },

  // ============================================================================
  // CANCER DE PULMAO
  // ============================================================================
  {
    id: 'cancer-pulmao',
    titulo: 'Cancer de Pulmao',
    sinonimos: ['Carcinoma pulmonar', 'Neoplasia maligna do pulmao', 'Carcinoma broncogenico'],
    doid: 'DOID:1324',
    snomedCT: '254637007',
    meshId: 'D002283',
    ciap2: ['R84'],
    cid10: ['C34'],
    categoria: 'hematologico',
    subcategoria: 'oncologia',
    lastUpdate: '2026-01',
    quickView: {
      definicao: 'Neoplasia maligna de maior mortalidade mundial. Dividido em nao-pequenas celulas (CPNPC, 85%) e pequenas celulas (CPPC, 15%). Tabagismo e principal fator de risco (85% dos casos).',
      criteriosDiagnosticos: [
        'TC de torax com lesao suspeita',
        'Biopsia (broncoscopia, PAAF, toracoscopia)',
        'Estadiamento TNM com PET-CT',
        'Perfil molecular: EGFR, ALK, ROS1, PD-L1, KRAS'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Resseccao cirurgica (estadios I-II)',
          'Radioterapia (SBRT ou convencional)',
          'Quimiorradioterapia concomitante (estadio III)'
        ],
        farmacologico: [
          'EGFR+: Osimertinibe',
          'ALK+: Alectinibe',
          'PD-L1>=50%: Pembrolizumabe monoterapia',
          'Sem driver: Platina + pemetrexede + pembrolizumabe'
        ]
      },
      redFlags: [
        'Hemoptise',
        'Sindrome de veia cava superior',
        'Rouquidao (paralisia de corda vocal)',
        'Dor ossea/fraturas patologicas',
        'Sindrome de Pancoast'
      ],
      metasTerapeuticas: ['Sobrevida global', 'Controle de sintomas', 'Qualidade de vida']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Segundo cancer mais comum no mundo',
        incidencia: '30.200 casos novos/ano no Brasil',
        mortalidade: 'Principal causa de morte por cancer (1.8 milhao/ano global)',
        faixaEtaria: 'Pico 65-74 anos',
        fatoresRisco: ['Tabagismo (85%)', 'Exposicao ocupacional (asbesto)', 'Radon', 'Poluicao', 'Historia familiar'],
        citations: [{ refId: 'iarc-lung-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Tosse persistente', 'Hemoptise', 'Dispneia', 'Dor toracica', 'Perda de peso'],
        sinaisExameFisico: ['Hipocratismo digital', 'Sindrome paraneoplasica', 'Linfonodomegalia supraclavicular'],
        citations: [{ refId: 'nccn-lung-2024' }]
      },
      diagnostico: {
        criterios: ['Confirmacao histopatologica obrigatoria', 'Estadiamento TNM 8a edicao', 'Testes moleculares para CPNPC avancado'],
        diagnosticoDiferencial: ['Tuberculose', 'Pneumonia', 'Metastase pulmonar', 'Abscesso pulmonar'],
        examesLaboratoriais: ['NSE (CPPC)', 'CEA', 'Funcao hepatica/renal'],
        examesImagem: ['TC torax com contraste', 'PET-CT', 'RNM cranio'],
        citations: [{ refId: 'accp-lung-staging-2023' }]
      },
      tratamento: {
        objetivos: ['Cura (estadios iniciais)', 'Prolongar sobrevida', 'Controle sintomatico'],
        naoFarmacologico: {
          medidas: ['Lobectomia/pneumonectomia (estadios I-II)', 'SBRT (inoperaveis)', 'Quimiorradioterapia definitiva (estadio III)'],
          citations: [{ refId: 'nccn-lung-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'TKI EGFR', medicamentos: ['Osimertinibe'], posologia: '80mg/dia VO', observacoes: 'EGFR mutado' },
            { classe: 'TKI ALK', medicamentos: ['Alectinibe', 'Lorlatinibe'], posologia: 'Conforme bula', observacoes: 'ALK rearranjo' },
            { classe: 'Imunoterapia', medicamentos: ['Pembrolizumabe', 'Atezolizumabe'], posologia: 'IV a cada 3-6 semanas', observacoes: 'PD-L1>=1%' }
          ],
          citations: [{ refId: 'esmo-lung-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Trimestral por 2 anos, semestral ate 5 anos',
        examesControle: ['TC torax trimestral', 'PET-CT se suspeita de recidiva'],
        metasTerapeuticas: ['Resposta radiologica', 'Controle de toxicidades'],
        criteriosEncaminhamento: ['Progressao', 'Toxicidade grau 3-4'],
        citations: [{ refId: 'nccn-lung-2024' }]
      },
      prevencao: {
        primaria: ['Cessacao tabagica', 'Evitar exposicao ocupacional'],
        secundaria: ['TC de baixa dose (fumantes 50-80 anos, >=20 macos-ano)'],
        citations: [{ refId: 'uspstf-lung-screening-2021' }]
      }
    },
    protocolos: ['rastreamento-cancer-pulmao'],
    medicamentos: ['osimertinibe', 'pembrolizumabe', 'cisplatina'],
    calculadoras: ['lung-rads'],
    citations: [{ refId: 'nccn-lung-2024' }]
  },

  // ============================================================================
  // CANCER COLORRETAL
  // ============================================================================
  {
    id: 'cancer-colorretal',
    titulo: 'Cancer Colorretal',
    sinonimos: ['Carcinoma coloretal', 'Cancer de colon', 'Cancer de reto'],
    doid: 'DOID:9256',
    snomedCT: '363406005',
    meshId: 'D015179',
    ciap2: ['D75'],
    cid10: ['C18', 'C19', 'C20'],
    categoria: 'hematologico',
    subcategoria: 'oncologia',
    lastUpdate: '2026-01',
    quickView: {
      definicao: 'Terceiro cancer mais comum globalmente. Maioria adenocarcinomas originados de polipos adenomatosos. Rastreamento reduz mortalidade significativamente.',
      criteriosDiagnosticos: [
        'Colonoscopia com biopsia confirmatoria',
        'TC de abdome/pelve para estadiamento',
        'CEA basal',
        'Pesquisa de instabilidade de microsatelites (MSI)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Colectomia com resseccao do mesocolon',
          'Excisao total do mesorreto (cancer retal)',
          'Radioterapia neoadjuvante (reto)'
        ],
        farmacologico: [
          'Adjuvante: FOLFOX ou CAPOX (estadio III)',
          'Metastatico: FOLFOX/FOLFIRI + bevacizumabe ou cetuximabe',
          'MSI-H: Pembrolizumabe primeira linha'
        ]
      },
      redFlags: [
        'Obstrucao intestinal',
        'Sangramento retal persistente',
        'Perfuracao',
        'Anemia ferropriva inexplicada'
      ],
      metasTerapeuticas: ['Resseccao R0', 'Preservacao esfincteriana (reto baixo)', 'Sobrevida livre de doenca']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Terceiro mais comum em homens e segundo em mulheres',
        incidencia: '45.630 casos novos/ano no Brasil',
        mortalidade: '20.245 obitos/ano no Brasil',
        faixaEtaria: 'Pico 65-74 anos; aumento em <50 anos',
        fatoresRisco: ['Polipose adenomatosa', 'Lynch syndrome', 'DII', 'Dieta rica em carne processada', 'Obesidade'],
        citations: [{ refId: 'inca-colorretal-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Alteracao do habito intestinal', 'Sangue nas fezes', 'Dor abdominal', 'Perda de peso', 'Anemia'],
        sinaisExameFisico: ['Massa abdominal palpavel', 'Hepatomegalia (metastases)', 'Ascite'],
        citations: [{ refId: 'nccn-colon-2024' }]
      },
      diagnostico: {
        criterios: ['Adenocarcinoma a biopsia', 'Estadiamento TNM', 'Status MSI/MMR', 'RAS/BRAF'],
        diagnosticoDiferencial: ['Doenca de Crohn', 'Colite ulcerativa', 'Diverticulite', 'Hemorroidas'],
        examesLaboratoriais: ['CEA', 'Hemograma', 'Funcao hepatica'],
        examesImagem: ['Colonoscopia', 'TC torax/abdome/pelve', 'RNM pelve (reto)'],
        citations: [{ refId: 'ajcc-staging-2023' }]
      },
      tratamento: {
        objetivos: ['Resseccao curativa', 'Prevencao de recidiva', 'Controle metastatico'],
        naoFarmacologico: {
          medidas: ['Hemicolectomia direita/esquerda', 'Resseccao anterior baixa', 'Amputacao abdominoperineal (se necessario)'],
          citations: [{ refId: 'nccn-colon-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Fluoropirimidina', medicamentos: ['5-FU', 'Capecitabina'], posologia: 'Esquema FOLFOX/CAPOX' },
            { classe: 'Antiangiogenico', medicamentos: ['Bevacizumabe'], posologia: '5-7.5mg/kg IV', observacoes: 'Metastatico' },
            { classe: 'Anti-EGFR', medicamentos: ['Cetuximabe', 'Panitumumabe'], posologia: 'Semanal ou quinzenal', observacoes: 'RAS wild-type' }
          ],
          citations: [{ refId: 'esmo-colon-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Trimestral por 2 anos, semestral por 3 anos',
        examesControle: ['CEA trimestral', 'TC anual', 'Colonoscopia em 1 ano'],
        metasTerapeuticas: ['CEA normalizado', 'Ausencia de lesoes novas'],
        criteriosEncaminhamento: ['Elevacao de CEA', 'Lesao suspeita em imagem'],
        citations: [{ refId: 'asco-crc-surveillance-2023' }]
      },
      prevencao: {
        primaria: ['Dieta rica em fibras', 'Atividade fisica', 'Evitar carne processada', 'Nao fumar'],
        secundaria: ['Colonoscopia a cada 10 anos (50-75 anos)', 'Pesquisa de sangue oculto anual'],
        citations: [{ refId: 'uspstf-crc-2021' }]
      }
    },
    protocolos: ['rastreamento-cancer-colorretal'],
    medicamentos: ['5-fluorouracil', 'oxaliplatina', 'bevacizumabe'],
    calculadoras: ['nomograma-crc'],
    citations: [{ refId: 'nccn-colon-2024' }]
  },

  // ============================================================================
  // CANCER DE PROSTATA
  // ============================================================================
  {
    id: 'cancer-prostata',
    titulo: 'Cancer de Prostata',
    sinonimos: ['Adenocarcinoma de prostata', 'Neoplasia prostatica'],
    doid: 'DOID:10283',
    snomedCT: '399068003',
    meshId: 'D011471',
    ciap2: ['Y77'],
    cid10: ['C61'],
    categoria: 'hematologico',
    subcategoria: 'oncologia',
    lastUpdate: '2026-01',
    quickView: {
      definicao: 'Cancer mais comum em homens (excluindo pele). Maioria adenocarcinomas. Comportamento variavel: indolente a agressivo. Escore de Gleason/ISUP orienta prognostico.',
      criteriosDiagnosticos: [
        'PSA elevado (>=4ng/mL) ou em ascensao',
        'Toque retal alterado',
        'Biopsia prostatica (transretal ou transperineal)',
        'RNM multiparametrica (PI-RADS)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Vigilancia ativa (baixo risco)',
          'Prostatectomia radical',
          'Radioterapia externa ou braquiterapia'
        ],
        farmacologico: [
          'Localmente avancado: Hormonioterapia + radioterapia',
          'Metastatico: ADT + docetaxel ou abiraterona',
          'Castration-resistant: Enzalutamida, abiraterona, olaparibe (BRCA+)'
        ]
      },
      redFlags: [
        'Retencao urinaria aguda',
        'Dor ossea intensa (metastases)',
        'Compressao medular',
        'Hematuria macroscopica'
      ],
      metasTerapeuticas: ['PSA indetectavel (pos-prostatectomia)', 'Controle bioquimico', 'Sobrevida livre de progressao']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Cancer mais diagnosticado em homens brasileiros',
        incidencia: '71.730 casos novos/ano no Brasil',
        mortalidade: '15.983 obitos/ano no Brasil',
        faixaEtaria: 'Raro antes de 50 anos; pico 65-74 anos',
        fatoresRisco: ['Idade', 'Historia familiar', 'Raca negra', 'Mutacoes BRCA1/2'],
        citations: [{ refId: 'inca-prostata-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Frequentemente assintomatico', 'Sintomas obstrutivos urinarios', 'Dor ossea (metastases)'],
        sinaisExameFisico: ['Nodulo ou endurecimento ao toque retal', 'Assimetria prostatica'],
        citations: [{ refId: 'nccn-prostate-2024' }]
      },
      diagnostico: {
        criterios: ['Adenocarcinoma a biopsia', 'Gleason score/ISUP grade', 'Estadiamento TNM', 'PSA'],
        diagnosticoDiferencial: ['Hiperplasia prostatica benigna', 'Prostatite', 'Neoplasia intraepitelial prostatica'],
        examesLaboratoriais: ['PSA total e livre', 'Fosfatase alcalina', 'Testosterona'],
        examesImagem: ['RNM multiparametrica', 'PET-PSMA (estadiamento)', 'Cintilografia ossea'],
        citations: [{ refId: 'eau-prostate-2024' }]
      },
      tratamento: {
        objetivos: ['Cura (localizado)', 'Controle da doenca', 'Preservacao de funcao sexual/urinaria'],
        naoFarmacologico: {
          medidas: ['Vigilancia ativa (baixo risco)', 'Prostatectomia radical', 'Radioterapia com ou sem ADT'],
          citations: [{ refId: 'nccn-prostate-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Privacao androgenica', medicamentos: ['Goserelina', 'Leuprolida', 'Degarelix'], posologia: 'SC/IM mensal ou trimestral' },
            { classe: 'Antiandrogenos', medicamentos: ['Enzalutamida', 'Abiraterona', 'Apalutamida'], posologia: 'VO diaria' },
            { classe: 'Quimioterapia', medicamentos: ['Docetaxel', 'Cabazitaxel'], posologia: '75mg/m2 a cada 3 semanas', observacoes: 'CRPC' }
          ],
          citations: [{ refId: 'asco-prostate-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Trimestral nos 2 primeiros anos, semestral ate 5 anos',
        examesControle: ['PSA trimestral', 'Testosterona (em ADT)', 'Cintilografia se PSA em ascensao'],
        metasTerapeuticas: ['PSA nadir', 'Ausencia de progressao radiologica'],
        criteriosEncaminhamento: ['Recidiva bioquimica', 'Progressao para CRPC', 'Metastases sintomaticas'],
        citations: [{ refId: 'eau-prostate-2024' }]
      },
      prevencao: {
        primaria: ['Dieta equilibrada', 'Atividade fisica'],
        secundaria: ['Rastreamento controverso; decisao compartilhada PSA 55-69 anos'],
        citations: [{ refId: 'uspstf-prostate-2018' }]
      }
    },
    protocolos: ['rastreamento-cancer-prostata'],
    medicamentos: ['enzalutamida', 'abiraterona', 'docetaxel'],
    calculadoras: ['epstein-criteria', 'd-amico'],
    citations: [{ refId: 'nccn-prostate-2024' }]
  },

  // ============================================================================
  // CANCER GASTRICO
  // ============================================================================
  {
    id: 'cancer-gastrico',
    titulo: 'Cancer Gastrico',
    sinonimos: ['Adenocarcinoma gastrico', 'Carcinoma de estomago'],
    doid: 'DOID:10534',
    snomedCT: '363349007',
    meshId: 'D013274',
    ciap2: ['D74'],
    cid10: ['C16'],
    categoria: 'hematologico',
    subcategoria: 'oncologia',
    lastUpdate: '2026-01',
    quickView: {
      definicao: 'Adenocarcinoma gastrico responde por 90-95% dos casos. Infeccao por H. pylori e principal fator de risco. Alta incidencia na Asia e America Latina.',
      criteriosDiagnosticos: [
        'Endoscopia digestiva alta com biopsia',
        'TC de torax/abdome/pelve',
        'Ecoendoscopia (estadiamento T/N)',
        'HER2, PD-L1, MSI'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Gastrectomia subtotal ou total com linfadenectomia D2',
          'Resseccao endoscopica (T1a selecionados)'
        ],
        farmacologico: [
          'Perioperatorio: FLOT (docetaxel + oxaliplatina + 5-FU)',
          'Metastatico: FOLFOX/CAPOX + trastuzumabe (HER2+)',
          'Segunda linha: Ramucirumabe + paclitaxel'
        ]
      },
      redFlags: [
        'Disfagia progressiva',
        'Hemorragia digestiva alta',
        'Nodulo de Virchow',
        'Ascite (carcinomatose)'
      ],
      metasTerapeuticas: ['Resseccao R0', 'Controle de sintomas', 'Sobrevida']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Quinto cancer mais comum no mundo',
        incidencia: '21.230 casos novos/ano no Brasil',
        mortalidade: '14.314 obitos/ano',
        faixaEtaria: 'Pico apos 50 anos; 2x mais comum em homens',
        fatoresRisco: ['H. pylori', 'Dieta rica em sal/defumados', 'Gastrite atrofica', 'Tabagismo', 'Historia familiar'],
        citations: [{ refId: 'inca-gastrico-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Dispepsia', 'Perda de peso', 'Saciedade precoce', 'Nauseas/vomitos', 'Dor epigastrica'],
        sinaisExameFisico: ['Massa epigastrica (avancado)', 'Linfonodomegalia supraclavicular esquerda', 'Hepatomegalia'],
        citations: [{ refId: 'nccn-gastric-2024' }]
      },
      diagnostico: {
        criterios: ['Adenocarcinoma a biopsia', 'Classificacao de Lauren (intestinal vs difuso)', 'Estadiamento TNM'],
        diagnosticoDiferencial: ['Ulcera peptica', 'Gastrite', 'Linfoma gastrico', 'GIST'],
        examesLaboratoriais: ['Hemograma', 'CEA', 'CA 19-9', 'Funcao hepatica'],
        examesImagem: ['EDA com biopsia', 'TC torax/abdome/pelve', 'Ecoendoscopia', 'Laparoscopia de estadiamento'],
        citations: [{ refId: 'jgca-gastric-2023' }]
      },
      tratamento: {
        objetivos: ['Resseccao curativa', 'Prevencao de recidiva', 'Paliacao de sintomas'],
        naoFarmacologico: {
          medidas: ['Gastrectomia com linfadenectomia D2', 'Resseccao endoscopica (casos selecionados)', 'Stent para obstrucao'],
          citations: [{ refId: 'nccn-gastric-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Quimioterapia perioperatoria', medicamentos: ['FLOT'], posologia: '4 ciclos pre e 4 pos-operatorio' },
            { classe: 'Anti-HER2', medicamentos: ['Trastuzumabe'], posologia: 'IV a cada 3 semanas', observacoes: 'HER2 positivo' },
            { classe: 'Imunoterapia', medicamentos: ['Nivolumabe', 'Pembrolizumabe'], posologia: 'Conforme indicacao', observacoes: 'PD-L1+ ou MSI-H' }
          ],
          citations: [{ refId: 'esmo-gastric-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Trimestral por 2 anos, semestral ate 5 anos',
        examesControle: ['EDA anual (coto gastrico)', 'TC semestral', 'Hemograma'],
        metasTerapeuticas: ['Ausencia de recidiva', 'Nutricao adequada'],
        criteriosEncaminhamento: ['Suspeita de recidiva', 'Estenose anastomotica', 'Dumping grave'],
        citations: [{ refId: 'nccn-gastric-2024' }]
      },
      prevencao: {
        primaria: ['Erradicacao de H. pylori', 'Dieta equilibrada', 'Evitar defumados/embutidos'],
        secundaria: ['EDA em populacoes de alto risco'],
        citations: [{ refId: 'iarc-gastric-2022' }]
      }
    },
    protocolos: ['cancer-gastrico-tratamento'],
    medicamentos: ['trastuzumabe', 'oxaliplatina', 'docetaxel'],
    calculadoras: [],
    citations: [{ refId: 'nccn-gastric-2024' }]
  },

  // ============================================================================
  // CANCER DE COLO UTERINO
  // ============================================================================
  {
    id: 'cancer-colo-uterino',
    titulo: 'Cancer de Colo Uterino',
    sinonimos: ['Carcinoma cervical', 'Cancer cervical', 'Carcinoma do colo do utero'],
    doid: 'DOID:4362',
    snomedCT: '363354003',
    meshId: 'D002583',
    ciap2: ['X75'],
    cid10: ['C53'],
    categoria: 'hematologico',
    subcategoria: 'oncologia',
    lastUpdate: '2026-01',
    quickView: {
      definicao: 'Cancer ginecologico mais comum em paises em desenvolvimento. HPV de alto risco (16, 18) causa >99% dos casos. Prevenivel por vacinacao e rastreamento.',
      criteriosDiagnosticos: [
        'Citologia cervical alterada (Papanicolaou)',
        'Colposcopia com biopsia',
        'RNM pelve para estadiamento local',
        'PET-CT para estadiamento a distancia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Conizacao (IA1 sem invasao linfovascular)',
          'Histerectomia radical + linfadenectomia (IB-IIA)',
          'Quimiorradioterapia concomitante (IIB-IVA)'
        ],
        farmacologico: [
          'Cisplatina semanal concomitante a radioterapia',
          'Metastatico: Carboplatina + paclitaxel + bevacizumabe',
          'Segunda linha: Pembrolizumabe (PD-L1+)'
        ]
      },
      redFlags: [
        'Sangramento pos-coital',
        'Corrimento fetido',
        'Dor pelvica',
        'Hidronefrose',
        'Edema de membros inferiores'
      ],
      metasTerapeuticas: ['Cura (estadios iniciais)', 'Controle local', 'Sobrevida']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Quarto cancer mais comum em mulheres no mundo',
        incidencia: '17.010 casos novos/ano no Brasil',
        mortalidade: '6.627 obitos/ano',
        faixaEtaria: 'Pico 45-55 anos',
        fatoresRisco: ['HPV de alto risco', 'Multiplos parceiros', 'Tabagismo', 'Imunossupressao', 'Nao rastreamento'],
        citations: [{ refId: 'inca-cervical-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Sangramento vaginal anormal', 'Sangramento pos-coital', 'Corrimento vaginal', 'Dor pelvica (avancado)'],
        sinaisExameFisico: ['Lesao cervical visivel a especuloscopia', 'Colo friavel', 'Parametrios comprometidos (avancado)'],
        citations: [{ refId: 'nccn-cervical-2024' }]
      },
      diagnostico: {
        criterios: ['Biopsia cervical com histopatologia', 'Estadiamento FIGO 2018', 'Avaliacao de parametrios'],
        diagnosticoDiferencial: ['Cervicite', 'Ectopia cervical', 'Polipo cervical', 'Endometriose cervical'],
        examesLaboratoriais: ['Hemograma', 'Funcao renal', 'SCC (escamoso)'],
        examesImagem: ['RNM pelve', 'PET-CT', 'Cistoscopia/retossigmoidoscopia (se indicado)'],
        citations: [{ refId: 'figo-cervical-2018' }]
      },
      tratamento: {
        objetivos: ['Cura', 'Preservacao de fertilidade (casos selecionados)', 'Controle local'],
        naoFarmacologico: {
          medidas: ['Conizacao (microinvasivo)', 'Histerectomia radical', 'Radioterapia externa + braquiterapia'],
          citations: [{ refId: 'nccn-cervical-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Platina', medicamentos: ['Cisplatina'], posologia: '40mg/m2 semanal', observacoes: 'Concomitante a RT' },
            { classe: 'Antiangiogenico', medicamentos: ['Bevacizumabe'], posologia: '15mg/kg a cada 3 semanas', observacoes: 'Metastatico/recorrente' },
            { classe: 'Imunoterapia', medicamentos: ['Pembrolizumabe'], posologia: '200mg IV a cada 3 semanas', observacoes: 'PD-L1 CPS>=1' }
          ],
          citations: [{ refId: 'gog-cervical-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Trimestral por 2 anos, semestral por 3 anos, depois anual',
        examesControle: ['Exame ginecologico', 'Citologia de cupula', 'Imagem se sintomas'],
        metasTerapeuticas: ['Resposta completa', 'Ausencia de recidiva'],
        criteriosEncaminhamento: ['Suspeita de recidiva', 'Toxicidade tardia da radioterapia'],
        citations: [{ refId: 'nccn-cervical-2024' }]
      },
      prevencao: {
        primaria: ['Vacinacao HPV (9-26 anos)', 'Uso de preservativo'],
        secundaria: ['Papanicolaou 25-64 anos trienal', 'Teste HPV a partir de 30 anos'],
        citations: [{ refId: 'who-hpv-2022' }]
      }
    },
    protocolos: ['rastreamento-cancer-colo-uterino'],
    medicamentos: ['cisplatina', 'bevacizumabe', 'pembrolizumabe'],
    calculadoras: [],
    citations: [{ refId: 'nccn-cervical-2024' }]
  },

  // ============================================================================
  // CANCER DE TIREOIDE
  // ============================================================================
  {
    id: 'cancer-tireoide',
    titulo: 'Cancer de Tireoide',
    sinonimos: ['Carcinoma de tireoide', 'Neoplasia maligna da tireoide'],
    doid: 'DOID:1781',
    snomedCT: '363478007',
    meshId: 'D013964',
    ciap2: ['T71'],
    cid10: ['C73'],
    categoria: 'hematologico',
    subcategoria: 'oncologia',
    lastUpdate: '2026-01',
    quickView: {
      definicao: 'Neoplasia endocrina mais comum. Diferenciados (papilifero 80%, folicular 10%) tem excelente prognostico. Medular (5%) e anaplasico (1-2%) sao mais agressivos.',
      criteriosDiagnosticos: [
        'Nodulo tireoidiano suspeito a USG (TI-RADS)',
        'PAAF com citologia (Bethesda)',
        'TSH, T4L',
        'Calcitonina (se suspeita de medular)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Tireoidectomia total ou lobectomia',
          'Radioiodoterapia ablativa (diferenciados)',
          'Disseccao cervical (linfonodos positivos)'
        ],
        farmacologico: [
          'Supressao de TSH com levotiroxina',
          'Refratario a iodo: Lenvatinibe ou sorafenibe',
          'Medular: Cabozantinibe ou vandetanibe'
        ]
      },
      redFlags: [
        'Nodulo de crescimento rapido',
        'Rouquidao (paralisia de corda vocal)',
        'Linfonodomegalia cervical fixa',
        'Disfagia/dispneia'
      ],
      metasTerapeuticas: ['Tireoglobulina indetectavel (diferenciados)', 'TSH suprimido conforme risco', 'Calcitonina normalizada (medular)']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Em aumento devido a maior deteccao incidental',
        incidencia: '13.780 casos novos/ano no Brasil; 3x mais comum em mulheres',
        mortalidade: 'Baixa (exceto anaplasico)',
        faixaEtaria: 'Pico 30-50 anos',
        fatoresRisco: ['Radiacao na infancia', 'Historia familiar', 'Sindromes geneticas (MEN2, Cowden)', 'Deficiencia de iodo'],
        citations: [{ refId: 'inca-tireoide-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Nodulo tireoidiano palpavel', 'Frequentemente assintomatico', 'Linfonodomegalia cervical'],
        sinaisExameFisico: ['Nodulo duro, fixo', 'Linfonodos cervicais aumentados', 'Desvio traqueal (bocio volumoso)'],
        citations: [{ refId: 'ata-thyroid-2015' }]
      },
      diagnostico: {
        criterios: ['Citologia Bethesda IV-VI', 'Histopatologia confirmatoria pos-cirurgia', 'Estadiamento TNM'],
        diagnosticoDiferencial: ['Nodulo benigno', 'Bocio multinodular', 'Tireoidite', 'Adenoma'],
        examesLaboratoriais: ['TSH', 'T4L', 'Tireoglobulina + anti-Tg', 'Calcitonina (medular)', 'CEA (medular)'],
        examesImagem: ['USG cervical', 'PAAF guiada por USG', 'Cintilografia (nodulos hipercaptantes)', 'PET-CT (alto risco)'],
        citations: [{ refId: 'ata-thyroid-2015' }]
      },
      tratamento: {
        objetivos: ['Remissao bioquimica', 'Prevencao de recidiva', 'Minimizar comorbidades do tratamento'],
        naoFarmacologico: {
          medidas: ['Tireoidectomia total (alto risco)', 'Lobectomia (baixo risco)', 'I-131 ablativo', 'Disseccao cervical se necessario'],
          citations: [{ refId: 'ata-thyroid-2015' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Supressao de TSH', medicamentos: ['Levotiroxina'], posologia: 'Ajustar para TSH-alvo conforme risco' },
            { classe: 'TKI multicinase', medicamentos: ['Lenvatinibe', 'Sorafenibe'], posologia: 'VO continuo', observacoes: 'Refratario a radioiodo' },
            { classe: 'TKI para medular', medicamentos: ['Cabozantinibe', 'Vandetanibe'], posologia: 'VO continuo' }
          ],
          citations: [{ refId: 'nccn-thyroid-2024' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Semestral por 2 anos, depois anual',
        examesControle: ['Tireoglobulina + anti-Tg', 'USG cervical', 'TSH', 'Cintilografia de corpo inteiro (se indicado)'],
        metasTerapeuticas: ['Tireoglobulina estimulada <1ng/mL', 'USG cervical sem alteracoes'],
        criteriosEncaminhamento: ['Tireoglobulina em ascensao', 'Lesao estrutural', 'Refratario a radioiodo'],
        citations: [{ refId: 'ata-thyroid-2015' }]
      },
      prevencao: {
        primaria: ['Evitar exposicao a radiacao desnecessaria'],
        secundaria: ['USG em populacoes de risco (radiacao, sindromes geneticas)'],
        citations: [{ refId: 'ata-thyroid-2015' }]
      }
    },
    protocolos: ['nodulo-tireoide-investigacao'],
    medicamentos: ['levotiroxina', 'lenvatinibe', 'sorafenibe'],
    calculadoras: ['ti-rads', 'bethesda-system'],
    citations: [{ refId: 'ata-thyroid-2015' }]
  },

  // ============================================================================
  // LINFOMA DE HODGKIN
  // ============================================================================
  {
    id: 'linfoma-hodgkin',
    titulo: 'Linfoma de Hodgkin',
    sinonimos: ['Doenca de Hodgkin', 'LH'],
    doid: 'DOID:8567',
    snomedCT: '118600007',
    meshId: 'D006689',
    ciap2: ['B72'],
    cid10: ['C81'],
    categoria: 'hematologico',
    subcategoria: 'oncologia',
    lastUpdate: '2026-01',
    quickView: {
      definicao: 'Linfoma caracterizado por celulas de Reed-Sternberg. Dois picos de incidencia: adultos jovens e >55 anos. Alta taxa de cura (>80%) com tratamento adequado.',
      criteriosDiagnosticos: [
        'Biopsia excisional de linfonodo',
        'Celulas de Reed-Sternberg CD30+/CD15+',
        'Estadiamento de Lugano (PET-CT)',
        'Hemograma, VHS, LDH, albumina'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Radioterapia de campo envolvido (estadios iniciais)',
          'Considerar fertilidade (criopreservacao)'
        ],
        farmacologico: [
          'Estadios I-II favoravel: ABVD x 2-4 ciclos + RT',
          'Estadios avancados: ABVD x 6 ou BV-AVD x 6',
          'Refratario/recidiva: Auto-TMO + brentuximabe'
        ]
      },
      redFlags: [
        'Sintomas B (febre, sudorese noturna, perda >10% peso)',
        'Massa mediastinal volumosa',
        'Comprometimento extranodal',
        'Progressao durante tratamento'
      ],
      metasTerapeuticas: ['PET interim negativo', 'Remissao completa metabolica', 'Cura']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Representa 10% dos linfomas',
        incidencia: '2-3/100.000/ano',
        mortalidade: 'Baixa com tratamento adequado',
        faixaEtaria: 'Bimodal: 15-35 anos e >55 anos',
        fatoresRisco: ['EBV', 'Imunossupressao', 'Historia familiar', 'HIV'],
        citations: [{ refId: 'who-hodgkin-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Linfonodomegalia indolor (cervical, supraclavicular)', 'Sintomas B', 'Prurido'],
        sinaisExameFisico: ['Linfonodos elasticos, indolores', 'Esplenomegalia', 'Dor em linfonodos com alcool (raro)'],
        citations: [{ refId: 'nccn-hodgkin-2024' }]
      },
      diagnostico: {
        criterios: ['Biopsia excisional obrigatoria', 'Celulas de Reed-Sternberg', 'CD30+, CD15+, CD20-'],
        diagnosticoDiferencial: ['Linfoma nao-Hodgkin', 'Tuberculose ganglionar', 'Sarcoidose', 'Mononucleose'],
        examesLaboratoriais: ['Hemograma', 'VHS', 'LDH', 'Albumina', 'HIV', 'Hepatites'],
        examesImagem: ['PET-CT (estadiamento e resposta)', 'TC torax/abdome/pelve'],
        citations: [{ refId: 'lugano-staging-2014' }]
      },
      tratamento: {
        objetivos: ['Cura', 'Minimizar toxicidade tardia', 'Preservar fertilidade'],
        naoFarmacologico: {
          medidas: ['RT de campo envolvido (20-30 Gy)', 'Criopreservacao de gametas'],
          citations: [{ refId: 'nccn-hodgkin-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'ABVD', medicamentos: ['Adriamicina', 'Bleomicina', 'Vinblastina', 'Dacarbazina'], posologia: 'A cada 2 semanas x 2-6 ciclos' },
            { classe: 'BV-AVD', medicamentos: ['Brentuximabe vedotina', 'AVD'], posologia: 'A cada 2 semanas x 6 ciclos', observacoes: 'Avancado' },
            { classe: 'Imunoterapia', medicamentos: ['Pembrolizumabe', 'Nivolumabe'], observacoes: 'Pos-auto-TMO ou refratario' }
          ],
          citations: [{ refId: 'ghsg-hodgkin-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Trimestral por 2 anos, semestral ate 5 anos, anual apos',
        examesControle: ['Exame fisico', 'Hemograma', 'TC ou PET-CT se suspeita', 'Funcao tireoidiana (pos-RT cervical)'],
        metasTerapeuticas: ['Remissao completa mantida', 'Deteccao precoce de neoplasias secundarias'],
        criteriosEncaminhamento: ['Recidiva', 'Segunda neoplasia', 'Toxicidade cardiaca/pulmonar'],
        citations: [{ refId: 'nccn-hodgkin-2024' }]
      },
      prevencao: {
        primaria: [],
        secundaria: ['Rastreamento de neoplasias secundarias (mama, pulmao pos-RT)', 'Avaliacao cardiovascular'],
        citations: [{ refId: 'nccn-survivorship-2024' }]
      }
    },
    protocolos: ['linfoma-hodgkin-tratamento'],
    medicamentos: ['doxorrubicina', 'brentuximabe-vedotina', 'pembrolizumabe'],
    calculadoras: ['ips-hodgkin'],
    citations: [{ refId: 'nccn-hodgkin-2024' }]
  },

  // ============================================================================
  // LINFOMA NAO-HODGKIN
  // ============================================================================
  {
    id: 'linfoma-nao-hodgkin',
    titulo: 'Linfoma Nao-Hodgkin',
    sinonimos: ['LNH', 'Non-Hodgkin lymphoma'],
    doid: 'DOID:0060060',
    snomedCT: '118601006',
    meshId: 'D008228',
    ciap2: ['B72'],
    cid10: ['C82', 'C83', 'C84', 'C85'],
    categoria: 'hematologico',
    subcategoria: 'oncologia',
    lastUpdate: '2026-01',
    quickView: {
      definicao: 'Grupo heterogeneo de neoplasias linfoides. Linfoma difuso de grandes celulas B (LDGCB) e mais comum. Classificacao OMS define >80 subtipos.',
      criteriosDiagnosticos: [
        'Biopsia excisional de linfonodo ou tecido acometido',
        'Imunofenotipagem (CD20, CD3, etc)',
        'Estadiamento de Lugano (PET-CT para agressivos)',
        'LDH, beta-2 microglobulina'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Radioterapia (indolentes localizados)',
          'Observacao (folicular assintomatico)'
        ],
        farmacologico: [
          'LDGCB: R-CHOP x 6 ciclos',
          'Folicular: R-CHOP ou R-bendamustina + manutencao',
          'Manto: R-CHOP/DHAP alternado + auto-TMO',
          'CAR-T: Axicabtageno, tisagenlecleucel (recidiva)'
        ]
      },
      redFlags: [
        'Linfoma agressivo com LDH muito elevado',
        'Comprometimento de SNC',
        'Sindrome de lise tumoral',
        'Obstrucao de vias aereas'
      ],
      metasTerapeuticas: ['Remissao completa (agressivos)', 'Controle de doenca (indolentes)', 'Sobrevida livre de progressao']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Sexto cancer mais comum',
        incidencia: '12.040 casos novos/ano no Brasil',
        mortalidade: '5.430 obitos/ano',
        faixaEtaria: 'Mediana 65 anos (variavel por subtipo)',
        fatoresRisco: ['Imunossupressao', 'HIV', 'EBV', 'H. pylori (MALT)', 'Doencas autoimunes'],
        citations: [{ refId: 'who-lymphoma-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Linfonodomegalia', 'Sintomas B', 'Sintomas especificos do sitio acometido'],
        sinaisExameFisico: ['Linfonodos aumentados', 'Esplenomegalia', 'Hepatomegalia', 'Massas extranodais'],
        citations: [{ refId: 'nccn-nhl-2024' }]
      },
      diagnostico: {
        criterios: ['Histopatologia + imunofenotipo', 'Classificacao OMS 2022', 'Estadiamento de Lugano'],
        diagnosticoDiferencial: ['Linfoma de Hodgkin', 'Carcinoma metastatico', 'Infeccoes granulomatosas'],
        examesLaboratoriais: ['Hemograma', 'LDH', 'Beta-2 microglobulina', 'Sorologias (HIV, HBV, HCV)'],
        examesImagem: ['PET-CT (agressivos)', 'TC (indolentes)', 'Biopsia de medula ossea'],
        citations: [{ refId: 'lugano-staging-2014' }]
      },
      tratamento: {
        objetivos: ['Cura (agressivos)', 'Controle (indolentes)', 'Qualidade de vida'],
        naoFarmacologico: {
          medidas: ['RT isolada (indolente localizado)', 'Observacao (watch and wait)'],
          citations: [{ refId: 'nccn-nhl-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Imunoquimioterapia', medicamentos: ['R-CHOP'], posologia: 'A cada 21 dias x 6 ciclos', observacoes: 'LDGCB' },
            { classe: 'Imunoquimioterapia', medicamentos: ['R-bendamustina', 'R-CVP'], posologia: 'Conforme protocolo', observacoes: 'Indolentes' },
            { classe: 'CAR-T', medicamentos: ['Axicabtageno ciloleucel', 'Tisagenlecleucel'], observacoes: 'Refratario/recidiva pos-2 linhas' }
          ],
          citations: [{ refId: 'ash-nhl-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Trimestral por 2 anos, semestral ate 5 anos',
        examesControle: ['Exame fisico', 'Hemograma', 'LDH', 'TC ou PET-CT conforme subtipo'],
        metasTerapeuticas: ['PET negativo (agressivos)', 'Doenca estavel (indolentes)'],
        criteriosEncaminhamento: ['Recidiva', 'Transformacao (Richter)', 'Necessidade de CAR-T'],
        citations: [{ refId: 'nccn-nhl-2024' }]
      },
      prevencao: {
        primaria: [],
        secundaria: ['Vigilancia de transformacao', 'Rastreamento de segundas neoplasias'],
        citations: [{ refId: 'nccn-survivorship-2024' }]
      }
    },
    protocolos: ['linfoma-nao-hodgkin-tratamento'],
    medicamentos: ['rituximabe', 'ciclofosfamida', 'doxorrubicina'],
    calculadoras: ['ipi', 'flipi', 'mipi'],
    citations: [{ refId: 'nccn-nhl-2024' }]
  },

  // ============================================================================
  // LEUCEMIA MIELOIDE AGUDA
  // ============================================================================
  {
    id: 'leucemia-mieloide-aguda',
    titulo: 'Leucemia Mieloide Aguda',
    sinonimos: ['LMA', 'Leucemia nao-linfocitica aguda', 'ANLL'],
    doid: 'DOID:9119',
    snomedCT: '91861009',
    meshId: 'D015470',
    ciap2: ['B73'],
    cid10: ['C92.0'],
    categoria: 'hematologico',
    subcategoria: 'oncologia',
    lastUpdate: '2026-01',
    quickView: {
      definicao: 'Neoplasia mieloide com >=20% de blastos em medula ossea ou sangue. Classificacao OMS 2022 define subtipos por alteracoes geneticas. Emergencia oncologica.',
      criteriosDiagnosticos: [
        '>=20% blastos mieloides em medula ou sangue',
        'Imunofenotipagem (MPO+, CD13, CD33, CD117)',
        'Citogenetica e biologia molecular (NPM1, FLT3, CEBPA)',
        'Classificacao ELN de risco'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Transplante alogenico de celulas-tronco (risco intermediario/adverso)',
          'Suporte transfusional intensivo'
        ],
        farmacologico: [
          'Inducao 7+3: Citarabina + daunorrubicina',
          'Consolidacao: Citarabina alta dose',
          'LPA (PML-RARA): ATRA + trioxido de arsenico',
          'FLT3+: Midostaurina ou gilteritinibe'
        ]
      },
      redFlags: [
        'Leucostase (leucocitos >100.000)',
        'CIVD (especialmente LPA)',
        'Sindrome de lise tumoral',
        'Infeccao grave com neutropenia febril'
      ],
      metasTerapeuticas: ['Remissao completa morfologica', 'DRM negativa', 'Sobrevida livre de doenca']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Leucemia aguda mais comum em adultos',
        incidencia: '3-4/100.000/ano',
        mortalidade: 'Sobrevida 5 anos: 30% (geral), 45% (<60 anos)',
        faixaEtaria: 'Mediana 68 anos; aumenta com idade',
        fatoresRisco: ['Exposicao a benzeno', 'Quimioterapia previa', 'Radiacao', 'Sindromes mielodisplasicas', 'Sindromes geneticas'],
        citations: [{ refId: 'who-aml-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Fadiga', 'Sangramento', 'Infeccoes recorrentes', 'Febre'],
        sinaisExameFisico: ['Palidez', 'Petequias/equimoses', 'Hepatoesplenomegalia', 'Hipertrofia gengival (M4/M5)'],
        citations: [{ refId: 'nccn-aml-2024' }]
      },
      diagnostico: {
        criterios: ['>=20% blastos mieloides', 'Imunofenotipo mieloide', 'Classificacao OMS 2022'],
        diagnosticoDiferencial: ['LLA', 'Crise blastica de LMC', 'SMD com excesso de blastos', 'Reacao leucemoide'],
        examesLaboratoriais: ['Hemograma', 'Mielograma com citogenetica', 'NGS (painel de mutacoes)', 'Coagulacao (CIVD)'],
        examesImagem: ['TC cranio se sintomas neurologicos', 'ECO pre-antraciclina'],
        citations: [{ refId: 'eln-aml-2022' }]
      },
      tratamento: {
        objetivos: ['Remissao completa', 'Consolidacao', 'Cura (alo-TMO em selecionados)'],
        naoFarmacologico: {
          medidas: ['Alo-TMO em primeira remissao (risco adverso)', 'Leucafere se leucostase', 'Suporte intensivo'],
          citations: [{ refId: 'nccn-aml-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Inducao 7+3', medicamentos: ['Citarabina', 'Daunorrubicina'], posologia: 'Ara-C 100-200mg/m2/d D1-7; Dauno 60mg/m2 D1-3' },
            { classe: 'Consolidacao', medicamentos: ['Citarabina alta dose'], posologia: '3g/m2 12/12h D1,3,5 x 3-4 ciclos' },
            { classe: 'Inibidor FLT3', medicamentos: ['Midostaurina', 'Gilteritinibe'], posologia: 'VO continuo', observacoes: 'FLT3 mutado' },
            { classe: 'Agente diferenciador', medicamentos: ['ATRA', 'Trioxido de arsenico'], posologia: 'Conforme protocolo LPA', observacoes: 'LPA t(15;17)' }
          ],
          citations: [{ refId: 'eln-aml-2022' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal durante tratamento, mensal apos remissao, trimestral apos consolidacao',
        examesControle: ['Hemograma', 'Mielograma com DRM', 'Monitoramento de quimerismo (pos-TMO)'],
        metasTerapeuticas: ['RC morfologica', 'DRM por citometria/PCR negativa'],
        criteriosEncaminhamento: ['Centro de referencia para TMO', 'Recidiva'],
        citations: [{ refId: 'nccn-aml-2024' }]
      },
      prevencao: {
        primaria: ['Evitar exposicao ocupacional (benzeno, quimioterapicos)'],
        secundaria: [],
        citations: [{ refId: 'iarc-leukemia-2022' }]
      }
    },
    protocolos: ['lma-tratamento'],
    medicamentos: ['citarabina', 'daunorrubicina', 'midostaurina'],
    calculadoras: ['eln-risk-aml'],
    citations: [{ refId: 'nccn-aml-2024' }]
  },

  // ============================================================================
  // LEUCEMIA LINFOIDE CRONICA
  // ============================================================================
  {
    id: 'leucemia-linfoide-cronica',
    titulo: 'Leucemia Linfoide Cronica',
    sinonimos: ['LLC', 'Leucemia linfocitica cronica', 'CLL'],
    doid: 'DOID:1040',
    snomedCT: '92814006',
    meshId: 'D015451',
    ciap2: ['B73'],
    cid10: ['C91.1'],
    categoria: 'hematologico',
    subcategoria: 'oncologia',
    lastUpdate: '2026-01',
    quickView: {
      definicao: 'Leucemia mais comum em adultos ocidentais. Acumulo de linfocitos B maduros CD5+/CD23+. Curso indolente na maioria. Indicacao de tratamento por criterios especificos.',
      criteriosDiagnosticos: [
        '>=5.000 linfocitos B clonais/uL no sangue periferico',
        'Imunofenotipo: CD5+, CD19+, CD23+, CD20 fraco',
        'Escore de Matutes >=4',
        'FISH para del(17p), del(11q), trissomia 12, del(13q)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Watch and wait (maioria dos pacientes inicialmente)',
          'Suporte para complicacoes autoimunes'
        ],
        farmacologico: [
          'Sem del(17p)/TP53: Ibrutinibe, acalabrutinibe ou venetoclax-obinutuzumabe',
          'Com del(17p)/TP53: Ibrutinibe ou venetoclax-obinutuzumabe',
          'Fit e sem comorbidades: FCR (opcao)',
          'AIHA/PTI: Corticoides + rituximabe'
        ]
      },
      redFlags: [
        'Sindrome de Richter (transformacao)',
        'Citopenias autoimunes graves',
        'Del(17p) ou mutacao TP53',
        'Duplicacao de linfocitos <6 meses'
      ],
      metasTerapeuticas: ['Resposta com DRM negativa (objetivo ideal)', 'Controle de sintomas', 'Prevencao de infeccoes']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Leucemia mais comum em adultos no Ocidente',
        incidencia: '4-5/100.000/ano',
        mortalidade: 'Sobrevida variavel (5-20+ anos conforme risco)',
        faixaEtaria: 'Mediana 72 anos; raro <40 anos',
        fatoresRisco: ['Historia familiar', 'Exposicao a herbicidas', 'Sexo masculino'],
        citations: [{ refId: 'iwcll-2018' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Frequentemente assintomatico', 'Linfonodomegalia', 'Fadiga', 'Sudorese noturna'],
        sinaisExameFisico: ['Linfonodomegalia generalizada', 'Esplenomegalia', 'Hepatomegalia'],
        citations: [{ refId: 'nccn-cll-2024' }]
      },
      diagnostico: {
        criterios: ['>=5.000/uL linfocitos B clonais', 'Imunofenotipo caracteristico', 'Estadiamento Rai ou Binet'],
        diagnosticoDiferencial: ['Linfoma de celulas do manto', 'Linfoma folicular leucemizado', 'Leucemia prolinocitica'],
        examesLaboratoriais: ['Hemograma', 'Imunofenotipagem', 'FISH', 'Mutacao TP53', 'IGHV mutacional', 'Beta-2 microglobulina'],
        examesImagem: ['TC apenas se linfonodomegalia volumosa ou suspeita de Richter'],
        citations: [{ refId: 'iwcll-2018' }]
      },
      tratamento: {
        objetivos: ['Controle da doenca sintomatica', 'DRM negatividade', 'Sobrevida'],
        naoFarmacologico: {
          medidas: ['Observacao (assintomaticos estadio 0-I)', 'Vacinacao (pneumococo, influenza)', 'Profilaxia de infeccoes'],
          citations: [{ refId: 'nccn-cll-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Inibidor de BTK', medicamentos: ['Ibrutinibe', 'Acalabrutinibe', 'Zanubrutinibe'], posologia: 'VO continuo' },
            { classe: 'Inibidor de BCL2', medicamentos: ['Venetoclax'], posologia: 'VO, escalonamento + obinutuzumabe', observacoes: 'Duracao fixa' },
            { classe: 'Quimioimunoterapia', medicamentos: ['FCR', 'BR'], observacoes: 'Pacientes fit, IGHV mutado, sem del17p' }
          ],
          citations: [{ refId: 'esmo-cll-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Trimestral se em watch and wait, mensal durante tratamento',
        examesControle: ['Hemograma', 'Imunoglobulinas', 'Beta-2 microglobulina', 'Avaliacao de resposta'],
        metasTerapeuticas: ['Resposta completa com DRM negativa', 'Controle de complicacoes'],
        criteriosEncaminhamento: ['Indicacao de tratamento', 'Transformacao de Richter', 'Refratariedade'],
        citations: [{ refId: 'nccn-cll-2024' }]
      },
      prevencao: {
        primaria: [],
        secundaria: ['Vigilancia de transformacao', 'Rastreamento de segundas neoplasias'],
        citations: [{ refId: 'nccn-survivorship-2024' }]
      }
    },
    protocolos: ['llc-tratamento'],
    medicamentos: ['ibrutinibe', 'venetoclax', 'obinutuzumabe'],
    calculadoras: ['cll-ipi'],
    citations: [{ refId: 'nccn-cll-2024' }]
  },

  // ============================================================================
  // MIELOMA MULTIPLO
  // ============================================================================
  {
    id: 'mieloma-multiplo',
    titulo: 'Mieloma Multiplo',
    sinonimos: ['MM', 'Doenca de Kahler', 'Mieloma de celulas plasmaticas'],
    doid: 'DOID:9538',
    snomedCT: '109989006',
    meshId: 'D009101',
    ciap2: ['B73'],
    cid10: ['C90.0'],
    categoria: 'hematologico',
    subcategoria: 'oncologia',
    lastUpdate: '2026-01',
    quickView: {
      definicao: 'Neoplasia de celulas plasmaticas com producao de imunoglobulina monoclonal. Criterios CRAB definem doenca sintomatica. Segunda neoplasia hematologica mais comum.',
      criteriosDiagnosticos: [
        '>=10% plasmocitos clonais em medula OU plasmocitoma',
        'Proteina M em soro e/ou urina',
        'Criterios CRAB ou marcadores de malignidade:',
        'C: Hipercalcemia >11mg/dL',
        'R: Creatinina >2mg/dL',
        'A: Anemia Hb <10g/dL',
        'B: Lesoes osseas liticas'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Transplante autologo de celulas-tronco (elegiveis <70 anos)',
          'Radioterapia para lesoes osseas sintomaticas'
        ],
        farmacologico: [
          'Elegiveis a TMO: VRd (bortezomibe-lenalidomida-dex) inducao → Auto-TMO → Manutencao',
          'Nao elegiveis: VRd ou Dara-Rd (daratumumabe-lenalidomida-dex)',
          'Alto risco: Quadrupletos com daratumumabe',
          'Osso: Bisfosfonatos ou denosumabe'
        ]
      },
      redFlags: [
        'Compressao medular (emergencia)',
        'Hipercalcemia grave',
        'Insuficiencia renal aguda',
        'Hiperviscosidade'
      ],
      metasTerapeuticas: ['Resposta completa rigorosa (sCR)', 'DRM negativa', 'Sobrevida livre de progressao']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Segunda neoplasia hematologica mais comum',
        incidencia: '6-7/100.000/ano',
        mortalidade: 'Sobrevida mediana 5-7 anos (melhorando)',
        faixaEtaria: 'Mediana 69 anos; raro <40 anos',
        fatoresRisco: ['Idade', 'GMSI previa', 'Raca negra', 'Historia familiar', 'Obesidade'],
        citations: [{ refId: 'imwg-2014' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Dor ossea (70%)', 'Fadiga (anemia)', 'Infeccoes recorrentes', 'Sintomas de hipercalcemia'],
        sinaisExameFisico: ['Palidez', 'Dor a palpacao ossea', 'Sinais de compressao medular'],
        citations: [{ refId: 'nccn-myeloma-2024' }]
      },
      diagnostico: {
        criterios: ['Criterios IMWG 2014', 'Plasmocitos >=10% ou plasmocitoma', 'Evento definidor de mieloma (CRAB ou biomarcadores)'],
        diagnosticoDiferencial: ['GMSI', 'Mieloma smoldering', 'Amiloidose AL', 'Macroglobulinemia de Waldenstrom'],
        examesLaboratoriais: ['Eletroforese de proteinas (soro/urina)', 'Imunofixacao', 'Cadeias leves livres', 'Hemograma', 'Calcio', 'Creatinina', 'LDH', 'Beta-2 microglobulina'],
        examesImagem: ['TC de corpo inteiro ou PET-CT (lesoes liticas)', 'RNM de coluna se dor'],
        citations: [{ refId: 'imwg-2014' }]
      },
      tratamento: {
        objetivos: ['Resposta profunda', 'Controle de sintomas', 'Prevencao de complicacoes osseas'],
        naoFarmacologico: {
          medidas: ['Auto-TMO em elegiveis', 'RT para lesoes sintomaticas', 'Vertebroplastia se fraturas'],
          citations: [{ refId: 'nccn-myeloma-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Inibidor de proteassoma', medicamentos: ['Bortezomibe', 'Carfilzomibe'], posologia: 'SC ou IV semanal' },
            { classe: 'Imunomodulador', medicamentos: ['Lenalidomida', 'Pomalidomida'], posologia: 'VO D1-21 de 28' },
            { classe: 'Anti-CD38', medicamentos: ['Daratumumabe', 'Isatuximabe'], posologia: 'IV ou SC semanal→quinzenal→mensal' },
            { classe: 'Protetor osseo', medicamentos: ['Acido zoledronico', 'Denosumabe'], posologia: 'Mensal' }
          ],
          citations: [{ refId: 'esmo-myeloma-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal durante tratamento, depois a cada 2-3 meses',
        examesControle: ['Proteina M (SPEP, imunofixacao)', 'Cadeias leves livres', 'Hemograma', 'Funcao renal', 'Calcio'],
        metasTerapeuticas: ['sCR/CR com DRM negativa', 'Ausencia de lesoes novas', 'Melhora da funcao renal'],
        criteriosEncaminhamento: ['Recidiva', 'Refratariedade', 'CAR-T ou biespecificos'],
        citations: [{ refId: 'nccn-myeloma-2024' }]
      },
      prevencao: {
        primaria: [],
        secundaria: ['Monitoramento de GMSI (progressao 1%/ano)'],
        citations: [{ refId: 'imwg-smm-2020' }]
      }
    },
    protocolos: ['mieloma-multiplo-tratamento'],
    medicamentos: ['bortezomibe', 'lenalidomida', 'daratumumabe'],
    calculadoras: ['r-iss', 'imwg-frailty'],
    citations: [{ refId: 'nccn-myeloma-2024' }]
  }
];
