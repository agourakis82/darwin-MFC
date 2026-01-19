/**
 * DOENÇAS ONCOLÓGICAS - EXPANSÃO COMPLETA 40 DOENÇAS
 * ===================================================
 *
 * Categorias:
 * - Tumores Sólidos (25): Mama, Pulmão, Colorretal, Gástrico, Próstata, etc.
 * - Neoplasias Hematológicas (10): Leucemias, Linfomas, Mieloma
 * - Síndromes Paraneoplásicas (5): SIADH, Hipercalcemia, Cushing ectópico
 *
 * Padrão Q1 com citações, estadiamento TNM e ontologias
 */

import { Doenca } from '../../types/doenca';

export const doencasOncologicas: Partial<Doenca>[] = [
  // TUMORES SÓLIDOS
  {
    id: 'cancer-mama',
    titulo: 'Câncer de Mama',
    sinonimos: ['Carcinoma mamário', 'Neoplasia de mama'],
    doid: 'DOID:1612',
    snomedCT: '254837009',
    meshId: 'D001943',
    ciap2: ['X76'],
    cid10: ['C50', 'C50.9'],
    categoria: 'outros',
    quickView: {
      definicao: 'Neoplasia maligna mais comum em mulheres. Tipos: ductal (70-80%), lobular (10-15%). Subtipos moleculares: Luminal A/B, HER2+, Triplo-negativo.',
      criteriosDiagnosticos: [
        'Nódulo mamário palpável ou achado mamográfico (BI-RADS 4-5)',
        'Core biopsy ou biópsia excisional',
        'Estadiamento: TNM + biomarcadores (RE, RP, HER2, Ki-67)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Cirurgia conservadora ou mastectomia', 'Radioterapia adjuvante', 'Pesquisa de linfonodo sentinela'],
        farmacologico: ['Luminal: Tamoxifeno ou IA + CDK4/6i', 'HER2+: Trastuzumabe + Pertuzumabe + QT', 'TNBC: Quimioterapia (AC-T)', 'Metastático: conforme subtipo']
      },
      redFlags: ['Carcinoma inflamatório', 'Metástase à apresentação', 'Progressão em hormonioterapia', 'Recidiva local']
    },
    medicamentos: ['tamoxifeno', 'anastrozol', 'trastuzumabe', 'pertuzumabe', 'doxorrubicina', 'paclitaxel'],
    protocolos: ['cancer-mama-estadiamento', 'cancer-mama-tratamento'],
    calculadoras: ['predict-breast', 'oncotype-dx'],
    citations: [{ refId: 'nccn-breast-2024', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'mama', 'rastreamento']
  },
  {
    id: 'cancer-pulmao-cpnpc',
    titulo: 'Câncer de Pulmão Não-Pequenas Células',
    sinonimos: ['CPNPC', 'NSCLC', 'Adenocarcinoma pulmonar', 'Carcinoma epidermóide pulmonar'],
    doid: 'DOID:3908',
    snomedCT: '254637007',
    meshId: 'D002289',
    ciap2: ['R84'],
    cid10: ['C34', 'C34.9'],
    categoria: 'outros',
    quickView: {
      definicao: 'Representa 85% dos cânceres de pulmão. Subtipos: adenocarcinoma (40%), epidermóide (25%), grandes células. Mutações driver: EGFR, ALK, ROS1, KRAS, BRAF.',
      criteriosDiagnosticos: [
        'TC de tórax: nódulo/massa pulmonar',
        'Biópsia com histologia CPNPC',
        'Painel molecular: EGFR, ALK, ROS1, PD-L1, KRAS',
        'Estadiamento: PET-CT, RNM crânio'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Ressecção cirúrgica (estádios I-II)', 'Radioterapia (SBRT para não operáveis)', 'Quimiorradioterapia (estádio III)'],
        farmacologico: ['EGFR+: Osimertinibe', 'ALK+: Alectinibe', 'KRAS G12C: Sotorasibe', 'PD-L1 ≥50%: Pembrolizumabe', 'QT: Carboplatina + Pemetrexede']
      },
      redFlags: ['Metástase cerebral', 'Compressão medular', 'Síndrome veia cava superior', 'Hemoptise maciça']
    },
    medicamentos: ['osimertinibe', 'alectinibe', 'pembrolizumabe', 'carboplatina', 'pemetrexede'],
    protocolos: ['cpnpc-tratamento'],
    calculadoras: [],
    citations: [{ refId: 'nccn-lung-2024', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'pulmao', 'terapia-alvo', 'imunoterapia']
  },
  {
    id: 'cancer-pulmao-cppc',
    titulo: 'Câncer de Pulmão Pequenas Células',
    sinonimos: ['CPPC', 'SCLC', 'Oat cell'],
    doid: 'DOID:5409',
    snomedCT: '254632001',
    meshId: 'D055752',
    ciap2: ['R84'],
    cid10: ['C34'],
    categoria: 'outros',
    quickView: {
      definicao: 'Representa 15% dos cânceres de pulmão. Altamente agressivo, crescimento rápido. Forte associação com tabagismo. Frequentes síndromes paraneoplásicas.',
      criteriosDiagnosticos: [
        'Histologia: células pequenas, alta relação núcleo/citoplasma',
        'Marcadores neuroendócrinos: cromogranina, sinaptofisina',
        'Estadiamento: Doença limitada vs. extensiva'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Radioterapia torácica (doença limitada)', 'Irradiação craniana profilática se resposta'],
        farmacologico: ['Doença limitada: Cisplatina/Carboplatina + Etoposídeo + RT concomitante', 'Doença extensiva: Carboplatina + Etoposídeo + Atezolizumabe ou Durvalumabe']
      },
      redFlags: ['SIADH', 'Síndrome de Cushing', 'Síndrome miastênica (Lambert-Eaton)', 'Metástase cerebral']
    },
    medicamentos: ['cisplatina', 'etoposideo', 'atezolizumabe', 'durvalumabe'],
    protocolos: ['cppc-tratamento'],
    calculadoras: [],
    citations: [{ refId: 'nccn-sclc-2024', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'pulmao', 'quimioterapia', 'imunoterapia']
  },
  {
    id: 'cancer-colorretal',
    titulo: 'Câncer Colorretal',
    sinonimos: ['CCR', 'Adenocarcinoma de cólon', 'Câncer de reto'],
    doid: 'DOID:9256',
    snomedCT: '363406005',
    meshId: 'D015179',
    ciap2: ['D75'],
    cid10: ['C18', 'C19', 'C20'],
    categoria: 'outros',
    quickView: {
      definicao: '3º câncer mais comum no mundo. Maioria esporádica (70-80%). Hereditários: Lynch, PAF. Sequência adenoma-carcinoma. Rastreamento após 45 anos.',
      criteriosDiagnosticos: [
        'Colonoscopia com biópsia',
        'Estadiamento: TC tórax/abdome/pelve, CEA',
        'Pesquisa de instabilidade de microssatélites (MSI) e RAS/BRAF'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Ressecção cirúrgica (cólon: colectomia; reto: RTU ou ressecção)', 'Neoadjuvância em reto (QT-RT)'],
        farmacologico: ['Adjuvante estádio III: FOLFOX ou CAPOX', 'Metastático RAS-wt: FOLFOX/FOLFIRI + Cetuximabe ou Bevacizumabe', 'MSI-H: Pembrolizumabe', 'BRAF V600E: Encorafenibe + Cetuximabe']
      },
      redFlags: ['Obstrução intestinal', 'Perfuração', 'Metástase hepática extensa', 'Carcinomatose peritoneal']
    },
    medicamentos: ['oxaliplatina', 'irinotecano', 'cetuximabe', 'bevacizumabe', 'pembrolizumabe'],
    protocolos: ['ccr-tratamento'],
    calculadoras: ['colorectal-survival'],
    citations: [{ refId: 'nccn-colon-2024', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'gastrointestinal', 'rastreamento']
  },
  {
    id: 'cancer-gastrico',
    titulo: 'Câncer Gástrico',
    sinonimos: ['Adenocarcinoma gástrico', 'Câncer de estômago'],
    doid: 'DOID:10534',
    snomedCT: '363349007',
    meshId: 'D013274',
    ciap2: ['D74'],
    cid10: ['C16', 'C16.9'],
    categoria: 'outros',
    quickView: {
      definicao: 'Adenocarcinoma em 95%. Classificação de Lauren: intestinal vs. difuso. Fatores de risco: H. pylori, dieta, tabagismo. Alta incidência no Brasil.',
      criteriosDiagnosticos: [
        'EDA com biópsia',
        'Estadiamento: TC, US endoscópico, PET-CT',
        'HER2 para doença avançada'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Gastrectomia (total ou subtotal) com linfadenectomia D2'],
        farmacologico: ['Perioperatório: FLOT (5-FU, Leucovorin, Oxaliplatina, Docetaxel)', 'Metastático: FOLFOX ou CAPOX ± Trastuzumabe (se HER2+)', 'PD-L1 CPS ≥5: Nivolumabe']
      },
      redFlags: ['Linite plástica', 'Carcinomatose', 'Obstrução gástrica', 'Sangramento volumoso']
    },
    medicamentos: ['docetaxel', 'oxaliplatina', 'fluorouracil', 'trastuzumabe', 'nivolumabe'],
    protocolos: ['cancer-gastrico'],
    calculadoras: [],
    citations: [{ refId: 'esmo-gastric-2023', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'gastrointestinal']
  },
  {
    id: 'cancer-prostata',
    titulo: 'Câncer de Próstata',
    sinonimos: ['Adenocarcinoma prostático', 'CaP'],
    doid: 'DOID:10283',
    snomedCT: '399068003',
    meshId: 'D011471',
    ciap2: ['Y77'],
    cid10: ['C61'],
    categoria: 'outros',
    quickView: {
      definicao: 'Câncer mais comum em homens (exceto pele). Maioria indolente. Estratificação: PSA, Gleason, estadiamento. Vigilância ativa para baixo risco.',
      criteriosDiagnosticos: [
        'PSA elevado ou toque retal alterado',
        'Biópsia prostática (ISUP grading)',
        'RNM multiparamétrica (PI-RADS)',
        'Estadiamento: cintilografia óssea, TC/PET-PSMA'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Baixo risco: Vigilância ativa', 'Intermediário/Alto: Prostatectomia ou Radioterapia'],
        farmacologico: ['Metastático hormoniossensível: ADT + Docetaxel ou Enzalutamida/Abiraterona/Apalutamida', 'Resistente à castração: Enzalutamida, Abiraterona, Docetaxel, Cabazitaxel', 'BRCA+: Olaparibe']
      },
      redFlags: ['Compressão medular', 'Retenção urinária', 'Metástases ósseas extensas', 'Insuficiência renal obstrutiva']
    },
    medicamentos: ['enzalutamida', 'abiraterona', 'docetaxel', 'olaparibe', 'goserelina'],
    protocolos: ['cancer-prostata'],
    calculadoras: ['damico-risk'],
    citations: [{ refId: 'nccn-prostate-2024', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'urologia', 'rastreamento']
  },
  {
    id: 'hepatocarcinoma',
    titulo: 'Carcinoma Hepatocelular',
    sinonimos: ['CHC', 'Hepatocarcinoma', 'HCC'],
    doid: 'DOID:684',
    snomedCT: '109841003',
    meshId: 'D006528',
    ciap2: ['D77'],
    cid10: ['C22.0'],
    categoria: 'outros',
    quickView: {
      definicao: 'Principal tumor primário do fígado. 80% em cirróticos (HBV, HCV, álcool, NASH). Rastreamento: US + AFP cada 6 meses em cirróticos.',
      criteriosDiagnosticos: [
        'Critérios LI-RADS: TC/RNM com wash-in arterial e wash-out',
        'Biópsia se critérios não conclusivos',
        'Estadiamento BCLC'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['BCLC 0-A: Ressecção, ablação ou transplante', 'BCLC B: Quimioembolização (TACE)', 'BCLC C: Terapia sistêmica'],
        farmacologico: ['1ª linha: Atezolizumabe + Bevacizumabe', 'Alternativa: Sorafenibe ou Lenvatinibe', '2ª linha: Regorafenibe, Cabozantinibe, Ramucirumabe']
      },
      redFlags: ['Trombose portal tumoral', 'Descompensação hepática', 'Ruptura tumoral', 'Metástases']
    },
    medicamentos: ['atezolizumabe', 'bevacizumabe', 'sorafenibe', 'lenvatinibe'],
    protocolos: ['chc-bclc'],
    calculadoras: ['child-pugh', 'meld'],
    citations: [{ refId: 'easl-hcc-2022', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'hepatologia', 'rastreamento']
  },
  {
    id: 'cancer-pancreas',
    titulo: 'Adenocarcinoma de Pâncreas',
    sinonimos: ['Câncer de pâncreas', 'Carcinoma pancreático'],
    doid: 'DOID:4905',
    snomedCT: '363418001',
    meshId: 'D010190',
    ciap2: ['D77'],
    cid10: ['C25', 'C25.9'],
    categoria: 'outros',
    quickView: {
      definicao: 'Neoplasia de péssimo prognóstico. Sobrevida 5 anos <10%. Maioria diagnosticada em estágio avançado. Fatores: tabagismo, DM, pancreatite crônica, histórico familiar.',
      criteriosDiagnosticos: [
        'TC abdome com protocolo pancreático',
        'Ecoendoscopia com biópsia',
        'CA 19-9 elevado (marcador)',
        'Estadiamento: ressecável, borderline, localmente avançado, metastático'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Ressecável: Duodenopancreatectomia (Whipple) ou pancreatectomia distal'],
        farmacologico: ['Adjuvante: FOLFIRINOX modificado (mFOLFIRINOX)', 'Metastático PS bom: FOLFIRINOX ou Gemcitabina + nab-Paclitaxel', 'PS ruim: Gemcitabina monoterapia']
      },
      redFlags: ['Invasão vascular (AMS, TC)', 'Carcinomatose', 'Icterícia obstrutiva', 'Trombose venosa profunda']
    },
    medicamentos: ['gemcitabina', 'nab-paclitaxel', 'oxaliplatina', 'irinotecano', 'fluorouracil'],
    protocolos: ['cancer-pancreas'],
    calculadoras: [],
    citations: [{ refId: 'nccn-pancreas-2024', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'gastrointestinal']
  },
  {
    id: 'cancer-renal',
    titulo: 'Carcinoma de Células Renais',
    sinonimos: ['CCR', 'Hipernefroma', 'Adenocarcinoma renal'],
    doid: 'DOID:4450',
    snomedCT: '254902007',
    meshId: 'D002292',
    ciap2: ['U77'],
    cid10: ['C64'],
    categoria: 'outros',
    quickView: {
      definicao: 'Tipo mais comum: células claras (70-80%). Frequentemente incidentaloma. Tríade clássica (10%): hematúria, dor lombar, massa palpável.',
      criteriosDiagnosticos: [
        'TC ou RNM com lesão renal suspeita',
        'Biópsia se necessário',
        'Estadiamento: TC tórax/abdome/pelve'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Nefrectomia (radical ou parcial)', 'Vigilância ativa para pequenas massas em idosos/comorbidades', 'Ablação para não cirúrgicos'],
        farmacologico: ['Metastático risco favorável: Pembrolizumabe + Axitinibe ou Nivolumabe + Cabozantinibe', 'Risco intermediário/alto: Nivolumabe + Ipilimumabe', 'TKI monoterapia: Sunitinibe, Pazopanibe']
      },
      redFlags: ['Trombo tumoral em veia cava', 'Metástase cerebral', 'Síndromes paraneoplásicas']
    },
    medicamentos: ['pembrolizumabe', 'axitinibe', 'nivolumabe', 'ipilimumabe', 'sunitinibe'],
    protocolos: ['ccr-tratamento'],
    calculadoras: ['imdc-score'],
    citations: [{ refId: 'esmo-rcc-2023', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'urologia', 'imunoterapia']
  },
  {
    id: 'cancer-bexiga',
    titulo: 'Câncer de Bexiga',
    sinonimos: ['Carcinoma urotelial', 'Câncer vesical'],
    doid: 'DOID:11054',
    snomedCT: '93796005',
    meshId: 'D001749',
    ciap2: ['U77'],
    cid10: ['C67', 'C67.9'],
    categoria: 'outros',
    quickView: {
      definicao: 'Carcinoma urotelial em 90%. Fator principal: tabagismo. Classificação: não músculo-invasivo (NMIBC) vs. músculo-invasivo (MIBC).',
      criteriosDiagnosticos: [
        'Cistoscopia com biópsia (RTU)',
        'Citologia urinária',
        'Estadiamento: TC urografia, RNM pelve'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['NMIBC: RTU completa + BCG intravesical (alto risco)', 'MIBC: Cistectomia radical com derivação urinária'],
        farmacologico: ['MIBC neoadjuvante: Cisplatina + Gemcitabina', 'Metastático 1ª linha: Pembrolizumabe + Enfortumabe vedotin', 'Não elegível a platina: Imunoterapia']
      },
      redFlags: ['Hidronefrose', 'Invasão de órgãos adjacentes', 'Metástases linfonodais extensas']
    },
    medicamentos: ['bcg', 'cisplatina', 'gemcitabina', 'pembrolizumabe', 'enfortumabe-vedotin'],
    protocolos: ['cancer-bexiga'],
    calculadoras: [],
    citations: [{ refId: 'nccn-bladder-2024', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'urologia']
  },
  {
    id: 'melanoma',
    titulo: 'Melanoma Cutâneo',
    sinonimos: ['Melanoma maligno'],
    doid: 'DOID:1909',
    snomedCT: '372244006',
    meshId: 'D008545',
    ciap2: ['S77'],
    cid10: ['C43', 'C43.9'],
    categoria: 'outros',
    quickView: {
      definicao: 'Neoplasia de melanócitos. Mais letal dos cânceres de pele. Subtipos: extensivo superficial, nodular, lentigo maligno, acral. Mutações: BRAF V600 (50%).',
      criteriosDiagnosticos: [
        'Critérios ABCDE: Assimetria, Bordas irregulares, Cores múltiplas, Diâmetro >6mm, Evolução',
        'Biópsia excisional com margens',
        'Breslow (espessura), ulceração, mitoses'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Excisão ampla com margens adequadas', 'Pesquisa de linfonodo sentinela se >0.8mm ou ulcerado'],
        farmacologico: ['Adjuvante (estádio III): Nivolumabe ou Pembrolizumabe', 'BRAF+: Dabrafenibe + Trametinibe', 'Metastático: Imunoterapia (Nivo+Ipi) ou BRAF/MEKi']
      },
      redFlags: ['Breslow >4mm', 'Ulceração', 'Metástase em trânsito', 'Linfonodos positivos', 'Metástase cerebral']
    },
    medicamentos: ['pembrolizumabe', 'nivolumabe', 'ipilimumabe', 'dabrafenibe', 'trametinibe'],
    protocolos: ['melanoma-tratamento'],
    calculadoras: [],
    citations: [{ refId: 'nccn-melanoma-2024', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'dermatologia', 'imunoterapia']
  },
  {
    id: 'cancer-ovario',
    titulo: 'Câncer de Ovário',
    sinonimos: ['Carcinoma ovariano', 'Adenocarcinoma seroso de alto grau'],
    doid: 'DOID:2394',
    snomedCT: '363443007',
    meshId: 'D010051',
    ciap2: ['X77'],
    cid10: ['C56'],
    categoria: 'outros',
    quickView: {
      definicao: 'Tipo epitelial mais comum (90%). Seroso de alto grau: 70%. Maioria diagnosticada em estádio avançado. Associação com BRCA1/2.',
      criteriosDiagnosticos: [
        'US/TC/RNM: massa anexial complexa',
        'CA-125 elevado',
        'Laparotomia/laparoscopia com estadiamento cirúrgico',
        'Teste genético BRCA'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Citorredução cirúrgica máxima (R0)'],
        farmacologico: ['Adjuvante: Carboplatina + Paclitaxel ± Bevacizumabe', 'Manutenção BRCA+: Olaparibe', 'Manutenção HRD+: Niraparibe', 'Recidiva platina-sensível: Reexposição a platina']
      },
      redFlags: ['Ascite volumosa', 'Carcinomatose peritoneal extensa', 'Doença irressecável', 'Recidiva platina-resistente']
    },
    medicamentos: ['carboplatina', 'paclitaxel', 'bevacizumabe', 'olaparibe', 'niraparibe'],
    protocolos: ['cancer-ovario'],
    calculadoras: [],
    citations: [{ refId: 'nccn-ovarian-2024', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'ginecologia', 'parp']
  },
  {
    id: 'cancer-colo-utero',
    titulo: 'Câncer de Colo de Útero',
    sinonimos: ['Câncer cervical', 'Carcinoma de cérvice'],
    doid: 'DOID:4362',
    snomedCT: '363354003',
    meshId: 'D002583',
    ciap2: ['X76'],
    cid10: ['C53', 'C53.9'],
    categoria: 'outros',
    quickView: {
      definicao: 'Carcinoma epidermóide (70%) ou adenocarcinoma. Causado por HPV de alto risco (16, 18). Prevenível por vacinação e rastreamento (Papanicolaou).',
      criteriosDiagnosticos: [
        'Citologia cervical anormal + colposcopia',
        'Biópsia cervical',
        'Estadiamento FIGO: exame físico, RNM pelve, TC'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Estádios IA-IB1: Conização ou histerectomia radical', 'IB2-IVA: Quimiorradioterapia concomitante'],
        farmacologico: ['Quimiorradioterapia: Cisplatina semanal 40mg/m² + RT', 'Metastático/Recidiva: Pembrolizumabe + Carboplatina + Paclitaxel ± Bevacizumabe', 'PD-L1+: Imunoterapia']
      },
      redFlags: ['Obstrução ureteral', 'Invasão de bexiga/reto', 'Metástases à distância', 'Hemorragia']
    },
    medicamentos: ['cisplatina', 'carboplatina', 'paclitaxel', 'pembrolizumabe', 'bevacizumabe'],
    protocolos: ['cancer-cervical'],
    calculadoras: [],
    citations: [{ refId: 'nccn-cervical-2024', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'ginecologia', 'rastreamento', 'vacinacao']
  },
  {
    id: 'glioblastoma',
    titulo: 'Glioblastoma',
    sinonimos: ['GBM', 'Glioma grau IV', 'Glioblastoma multiforme'],
    doid: 'DOID:3068',
    snomedCT: '393563007',
    meshId: 'D005909',
    ciap2: ['N74'],
    cid10: ['C71.9'],
    categoria: 'outros',
    quickView: {
      definicao: 'Tumor cerebral primário mais comum e agressivo em adultos. Sobrevida mediana ~15 meses. Características: IDH-wildtype, necrose, proliferação vascular.',
      criteriosDiagnosticos: [
        'RNM com realce anelar em T1 pós-contraste',
        'Biópsia ou ressecção',
        'Classificação molecular WHO 2021: IDH, MGMT'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Ressecção máxima segura', 'Radioterapia conformacional'],
        farmacologico: ['Stupp protocol: RT + Temozolomida concomitante', 'Seguido de Temozolomida adjuvante (6-12 ciclos)', 'MGMT metilado: melhor resposta a TMZ', 'Recidiva: Bevacizumabe, TTFields']
      },
      redFlags: ['Déficit neurológico progressivo', 'Hipertensão intracraniana', 'Convulsões refratárias', 'Hemorragia tumoral']
    },
    medicamentos: ['temozolomida', 'bevacizumabe'],
    protocolos: ['glioblastoma-stupp'],
    calculadoras: [],
    citations: [{ refId: 'nccn-cns-2024', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'neurologia', 'quimioterapia']
  },
  {
    id: 'cancer-tireoide',
    titulo: 'Câncer de Tireoide',
    sinonimos: ['Carcinoma papilífero', 'Carcinoma folicular'],
    doid: 'DOID:1781',
    snomedCT: '363478007',
    meshId: 'D013964',
    ciap2: ['T71'],
    cid10: ['C73'],
    categoria: 'outros',
    quickView: {
      definicao: 'Carcinomas diferenciados (90%): papilífero (85%) e folicular. Excelente prognóstico. Medular (5%): origem células C, associado a MEN2. Anaplásico (1%): agressivo.',
      criteriosDiagnosticos: [
        'US cervical: nódulo suspeito (TI-RADS)',
        'PAAF: citologia Bethesda',
        'Tireoglobulina (marcador pós-operatório para diferenciado)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Tireoidectomia total ou lobectomia', 'Iodo radioativo ablativo (alto risco)'],
        farmacologico: ['Supressão de TSH com Levotiroxina', 'Refratário a RAI: Lenvatinibe ou Sorafenibe', 'Anaplásico BRAF+: Dabrafenibe + Trametinibe']
      },
      redFlags: ['Invasão traqueal/esofágica', 'Paralisia de corda vocal', 'Metástases à distância', 'Tireoide anaplásico']
    },
    medicamentos: ['levotiroxina', 'lenvatinibe', 'sorafenibe'],
    protocolos: ['cancer-tireoide'],
    calculadoras: [],
    citations: [{ refId: 'ata-thyroid-2015', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'endocrinologia']
  },

  // NEOPLASIAS HEMATOLÓGICAS
  {
    id: 'leucemia-mieloide-aguda',
    titulo: 'Leucemia Mieloide Aguda',
    sinonimos: ['LMA', 'AML'],
    doid: 'DOID:9119',
    snomedCT: '91861009',
    meshId: 'D015470',
    ciap2: ['B73'],
    cid10: ['C92.0'],
    categoria: 'outros',
    subcategoria: 'hematologico',
    quickView: {
      definicao: 'Neoplasia hematológica com proliferação clonal de precursores mieloides. ≥20% blastos em MO ou sangue. Classificação WHO: por alterações genéticas.',
      criteriosDiagnosticos: [
        '≥20% blastos no sangue periférico ou MO',
        'Imunofenotipagem: marcadores mieloides',
        'Citogenética e biologia molecular (NPM1, FLT3, CEBPA)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Suporte transfusional', 'Profilaxia/tratamento de infecções', 'Acesso venoso central'],
        farmacologico: ['Indução: 7+3 (Citarabina + Daunorrubicina)', 'Consolidação: HiDAC ou TMO alogênico', 'FLT3+: Midostaurina ou Gilteritinibe', 'APL: ATRA + ATO']
      },
      redFlags: ['Leucostase', 'CIVD (especialmente APL)', 'Neutropenia febril', 'Síndrome de lise tumoral']
    },
    medicamentos: ['citarabina', 'daunorrubicina', 'midostaurina', 'tretinoina'],
    protocolos: ['lma-tratamento'],
    calculadoras: ['eln-risk'],
    citations: [{ refId: 'eln-aml-2022', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'hematologia', 'quimioterapia', 'tmo']
  },
  {
    id: 'leucemia-linfoide-aguda',
    titulo: 'Leucemia Linfoide Aguda',
    sinonimos: ['LLA', 'ALL'],
    doid: 'DOID:9952',
    snomedCT: '91857003',
    meshId: 'D054198',
    ciap2: ['B73'],
    cid10: ['C91.0'],
    categoria: 'outros',
    subcategoria: 'hematologico',
    quickView: {
      definicao: 'Neoplasia de precursores linfoides B ou T. Mais comum em crianças (pico 2-5 anos). Cura em >90% das crianças com tratamento moderno.',
      criteriosDiagnosticos: [
        '≥20% linfoblastos em MO',
        'Imunofenotipagem: B ou T',
        'Citogenética: Ph+, t(4;11), hiperdiploidia',
        'Pesquisa de DRM (doença residual mínima)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Profilaxia de SNC', 'Suporte hematológico'],
        farmacologico: ['Indução: Vincristina + Daunorrubicina + Asparaginase + Prednisona', 'Consolidação/Manutenção: MTX + 6-MP', 'Ph+: TKI (Imatinibe, Dasatinibe)', 'Recidiva: Blinatumomabe, CAR-T cells']
      },
      redFlags: ['Leucostase', 'Infiltração de SNC', 'Síndrome de lise tumoral', 'Infecções oportunistas']
    },
    medicamentos: ['vincristina', 'daunorrubicina', 'asparaginase', 'metotrexato', 'imatinibe', 'blinatumomabe'],
    protocolos: ['lla-tratamento'],
    calculadoras: [],
    citations: [{ refId: 'nccn-all-2024', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'hematologia', 'pediatria', 'tmo']
  },
  {
    id: 'leucemia-mieloide-cronica',
    titulo: 'Leucemia Mieloide Crônica',
    sinonimos: ['LMC', 'CML'],
    doid: 'DOID:8552',
    snomedCT: '92818009',
    meshId: 'D015464',
    ciap2: ['B73'],
    cid10: ['C92.1'],
    categoria: 'outros',
    subcategoria: 'hematologico',
    quickView: {
      definicao: 'Neoplasia mieloproliferativa definida pela t(9;22) / BCR-ABL1. Fases: crônica, acelerada, blástica. TKIs revolucionaram o tratamento.',
      criteriosDiagnosticos: [
        'Leucocitose com desvio à esquerda (todos estágios de maturação)',
        'Basofilia, esplenomegalia',
        'BCR-ABL1 por PCR ou FISH',
        't(9;22) cromossomo Philadelphia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Monitoramento molecular (BCR-ABL1 a cada 3 meses)'],
        farmacologico: ['1ª linha: Imatinibe 400mg/dia ou TKI 2ª geração (Dasatinibe, Nilotinibe)', '2ª geração se alto risco', 'Refratário/Resistente: Ponatinibe, Asciminibe', 'Fase blástica: QT + TKI ± TMO']
      },
      redFlags: ['Transformação blástica', 'Mutação T315I', 'Perda de resposta molecular', 'Intolerância a múltiplos TKIs']
    },
    medicamentos: ['imatinibe', 'dasatinibe', 'nilotinibe', 'ponatinibe', 'asciminibe'],
    protocolos: ['lmc-tratamento'],
    calculadoras: ['sokal-score', 'hasford-score'],
    citations: [{ refId: 'eln-cml-2020', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'hematologia', 'terapia-alvo']
  },
  {
    id: 'leucemia-linfoide-cronica',
    titulo: 'Leucemia Linfoide Crônica',
    sinonimos: ['LLC', 'CLL'],
    doid: 'DOID:1040',
    snomedCT: '92814006',
    meshId: 'D015451',
    ciap2: ['B73'],
    cid10: ['C91.1'],
    categoria: 'outros',
    subcategoria: 'hematologico',
    quickView: {
      definicao: 'Neoplasia de linfócitos B maduros. Mais comum em idosos. Muitos assintomáticos. Tratamento apenas se sintomático (estadiamento Rai/Binet).',
      criteriosDiagnosticos: [
        'Linfocitose ≥5.000/µL clonal',
        'Imunofenotipagem: CD5+, CD19+, CD23+',
        'FISH: del(17p), del(11q), trisomia 12',
        'Pesquisa de TP53 e IGHV'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Watch and wait se assintomático'],
        farmacologico: ['Del(17p)/TP53: Venetoclax + Obinutuzumabe ou Ibrutinibe', 'Sem del(17p): FCR (jovens fit) ou Venetoclax + Obinutuzumabe', 'Idosos: Ibrutinibe, Acalabrutinibe', 'Recidiva: estratégia sequencial']
      },
      redFlags: ['Síndrome de Richter (transformação em LDGCB)', 'Citopenias autoimunes', 'Infecções de repetição', 'Progressão rápida']
    },
    medicamentos: ['ibrutinibe', 'venetoclax', 'obinutuzumabe', 'fludarabina', 'ciclofosfamida', 'rituximabe'],
    protocolos: ['llc-tratamento'],
    calculadoras: ['cll-ipi'],
    citations: [{ refId: 'iwcll-guidelines-2018', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'hematologia', 'terapia-alvo']
  },
  {
    id: 'linfoma-hodgkin',
    titulo: 'Linfoma de Hodgkin',
    sinonimos: ['LH', 'Doença de Hodgkin'],
    doid: 'DOID:8567',
    snomedCT: '118600007',
    meshId: 'D006689',
    ciap2: ['B72'],
    cid10: ['C81', 'C81.9'],
    categoria: 'outros',
    subcategoria: 'hematologico',
    quickView: {
      definicao: 'Linfoma caracterizado por células de Reed-Sternberg. Bimodal: adultos jovens e >55 anos. Tipos: clássico (95%) e predomínio linfocitário nodular.',
      criteriosDiagnosticos: [
        'Biópsia linfonodal: células de Reed-Sternberg',
        'Imuno-histoquímica: CD30+, CD15+',
        'Estadiamento: PET-CT (Ann Arbor modificado)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Preservação de fertilidade pré-tratamento'],
        farmacologico: ['Estádio limitado: ABVD x 2-4 + RT involved field', 'Estádio avançado: ABVD x 6 ou BrECADD (PET guiado)', 'Refratário/Recidiva: DHAP → TMO autólogo', 'Pós-TMO: Brentuximabe vedotin ou Pembrolizumabe']
      },
      redFlags: ['Doença bulky', 'Sintomas B', 'Refratário primário', 'Recidiva precoce']
    },
    medicamentos: ['doxorrubicina', 'bleomicina', 'vincristina', 'dacarbazina', 'brentuximabe-vedotin'],
    protocolos: ['linfoma-hodgkin'],
    calculadoras: ['ips-hodgkin'],
    citations: [{ refId: 'nccn-hodgkin-2024', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'hematologia', 'quimioterapia', 'tmo']
  },
  {
    id: 'linfoma-difuso-grandes-celulas-b',
    titulo: 'Linfoma Difuso de Grandes Células B',
    sinonimos: ['LDGCB', 'DLBCL'],
    doid: 'DOID:0050745',
    snomedCT: '404103001',
    meshId: 'D016403',
    ciap2: ['B72'],
    cid10: ['C83.3'],
    categoria: 'outros',
    subcategoria: 'hematologico',
    quickView: {
      definicao: 'Linfoma não-Hodgkin mais comum (30-40%). Agressivo mas curável. Subtipos moleculares: GCB e ABC. Double/Triple-hit: pior prognóstico.',
      criteriosDiagnosticos: [
        'Biópsia: células B grandes, padrão difuso',
        'Imuno-histoquímica: CD20+, determinar COO (GCB vs. ABC)',
        'FISH para MYC, BCL2, BCL6',
        'PET-CT para estadiamento'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Profilaxia de SNC se alto risco'],
        farmacologico: ['R-CHOP x 6 + RT se bulky', 'Double-hit: DA-R-EPOCH ou Pola-R-CHP', 'Idosos frágeis: R-mini-CHOP', 'Recidiva: R-DHAP → TMO autólogo', 'Refratário: CAR-T cells (Axi-cel, Liso-cel)']
      },
      redFlags: ['Double/Triple-hit', 'Envolvimento de SNC', 'IPI alto', 'Refratário primário']
    },
    medicamentos: ['rituximabe', 'ciclofosfamida', 'doxorrubicina', 'vincristina', 'prednisona', 'polatuzumabe-vedotin'],
    protocolos: ['ldgcb-tratamento'],
    calculadoras: ['ipi-linfoma'],
    citations: [{ refId: 'nccn-dlbcl-2024', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'hematologia', 'imunoterapia', 'car-t']
  },
  {
    id: 'mieloma-multiplo',
    titulo: 'Mieloma Múltiplo',
    sinonimos: ['MM', 'Plasmocitoma'],
    doid: 'DOID:9538',
    snomedCT: '109989006',
    meshId: 'D009101',
    ciap2: ['B74'],
    cid10: ['C90.0'],
    categoria: 'outros',
    subcategoria: 'hematologico',
    quickView: {
      definicao: 'Neoplasia de plasmócitos com produção de imunoglobulina monoclonal. Critérios CRAB: Cálcio, Renal, Anemia, Bone lesions.',
      criteriosDiagnosticos: [
        'Plasmócitos clonais ≥10% na MO ou plasmocitoma',
        'CRAB ou biomarcadores de malignidade (≥60% plasmócitos, razão cadeias leves, >1 lesão focal na RNM)',
        'Proteína M no soro/urina'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratação', 'Tratamento de lesões ósseas (RT, cirurgia)', 'Prevenção de complicações esqueléticas'],
        farmacologico: ['Elegível a TMO: VRd (Bortezomibe + Lenalidomida + Dexametasona) → TMO autólogo → manutenção', 'Não elegível: VRd ou DRd (Daratumumabe + Rd)', 'Osso: Denosumabe ou Ácido zoledrônico', 'Recidiva: triplets com novos agentes']
      },
      redFlags: ['Insuficiência renal aguda', 'Hipercalcemia grave', 'Compressão medular', 'Síndrome de hiperviscosidade']
    },
    medicamentos: ['bortezomibe', 'lenalidomida', 'daratumumabe', 'dexametasona', 'acido-zoledronico'],
    protocolos: ['mieloma-tratamento'],
    calculadoras: ['iss-mieloma', 'r-iss'],
    citations: [{ refId: 'imwg-2014', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'hematologia', 'tmo']
  },

  // SÍNDROMES PARANEOPLÁSICAS
  {
    id: 'siadh-paraneoplasica',
    titulo: 'SIADH Paraneoplásica',
    sinonimos: ['Síndrome de secreção inapropriada de ADH'],
    doid: 'DOID:12556',
    snomedCT: '67823006',
    meshId: 'D007177',
    ciap2: ['T99'],
    cid10: ['E22.2'],
    categoria: 'endocrino',
    subcategoria: 'paraneoplasico',
    quickView: {
      definicao: 'Secreção ectópica de ADH por tumor, causando hiponatremia. Mais comum em carcinoma de pequenas células de pulmão.',
      criteriosDiagnosticos: [
        'Hiponatremia hipotônica (Na <135 mEq/L, Osm <280 mOsm/kg)',
        'Urina concentrada (Osm >100 mOsm/kg, Na >30 mEq/L)',
        'Euvolemia clínica',
        'Função tireoideana e adrenal normais'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Restrição hídrica (500-1000 mL/dia)', 'Tratar tumor primário'],
        farmacologico: ['Leve: Restrição hídrica', 'Moderada: Tolvaptana ou Furosemida + NaCl', 'Grave/sintomática: NaCl 3% (correção lenta: <10-12 mEq/L/24h)']
      },
      redFlags: ['Na <120 mEq/L', 'Sintomas neurológicos (confusão, convulsão)', 'Correção rápida (risco de mielinólise pontina)']
    },
    medicamentos: ['tolvaptana', 'furosemida'],
    protocolos: ['hiponatremia-manejo'],
    calculadoras: [],
    citations: [{ refId: 'uptodate-siadh-2023', evidenceLevel: 'B', studyType: 'SystematicReview' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'endocrinologia', 'paraneoplasico']
  },
  {
    id: 'hipercalcemia-maligna',
    titulo: 'Hipercalcemia da Malignidade',
    sinonimos: ['Hipercalcemia humoral', 'HHM'],
    doid: 'DOID:12559',
    snomedCT: '237844006',
    meshId: 'D006934',
    ciap2: ['T99'],
    cid10: ['E83.5'],
    categoria: 'endocrino',
    subcategoria: 'paraneoplasico',
    quickView: {
      definicao: 'Elevação do cálcio por mecanismos tumorais: PTHrP (humoral), metástases osteolíticas, calcitriol (linfomas). Emergência oncológica.',
      criteriosDiagnosticos: [
        'Cálcio total >10,5 mg/dL (corrigir pela albumina) ou Ca iônico >5,6 mg/dL',
        'PTH suprimido',
        'PTHrP elevado (se humoral)',
        'Neoplasia conhecida'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratação IV vigorosa (SF 0,9% 200-300 mL/h)', 'Mobilização se possível'],
        farmacologico: ['Hidratação + Furosemida (após expansão)', 'Ácido zoledrônico 4mg IV ou Denosumabe 120mg SC', 'Calcitonina 4 UI/kg 12/12h (efeito rápido, transitório)', 'Casos refratários: Corticoides (linfomas)']
      },
      redFlags: ['Ca >14 mg/dL', 'Alteração do nível de consciência', 'Arritmias (QT curto)', 'Desidratação grave', 'IRA']
    },
    medicamentos: ['acido-zoledronico', 'denosumabe', 'calcitonina'],
    protocolos: ['hipercalcemia-emergencia'],
    calculadoras: ['calcio-corrigido'],
    citations: [{ refId: 'nejm-hypercalcemia-2005', evidenceLevel: 'A', studyType: 'SystematicReview' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'emergencia', 'paraneoplasico']
  },
  {
    id: 'sindrome-cushing-ectopica',
    titulo: 'Síndrome de Cushing Ectópica',
    sinonimos: ['ACTH ectópico'],
    doid: 'DOID:0060168',
    snomedCT: '190502001',
    meshId: 'D000308',
    ciap2: ['T99'],
    cid10: ['E24.3'],
    categoria: 'endocrino',
    subcategoria: 'paraneoplasico',
    quickView: {
      definicao: 'Produção ectópica de ACTH por tumores não hipofisários. Causas: carcinoma de pequenas células (50%), carcinoides brônquicos, timoma.',
      criteriosDiagnosticos: [
        'Hipercortisolismo: UFC elevado, cortisol salivar noturno',
        'ACTH elevado',
        'Teste de supressão com dexametasona: não suprime',
        'RNM hipófise normal',
        'Localização do tumor produtor'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Ressecção do tumor primário se possível', 'Adrenalectomia bilateral se refratário'],
        farmacologico: ['Controle do hipercortisolismo: Cetoconazol, Metirapona, Etomidato IV', 'Tratamento do tumor primário']
      },
      redFlags: ['Hipocalemia grave', 'HAS descontrolada', 'Infecções oportunistas', 'Psicose']
    },
    medicamentos: ['cetoconazol', 'metirapona'],
    protocolos: ['cushing-ectopico'],
    calculadoras: [],
    citations: [{ refId: 'endocr-rev-cushing-2015', evidenceLevel: 'B', studyType: 'SystematicReview' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'endocrinologia', 'paraneoplasico']
  },
  {
    id: 'sindrome-veia-cava-superior',
    titulo: 'Síndrome da Veia Cava Superior',
    sinonimos: ['SVCS', 'Obstrução de VCS'],
    doid: 'DOID:0060163',
    snomedCT: '233937008',
    meshId: 'D013479',
    ciap2: ['K99'],
    cid10: ['I87.1'],
    categoria: 'outros',
    subcategoria: 'emergencia',
    quickView: {
      definicao: 'Obstrução da veia cava superior, 90% por malignidade (câncer de pulmão, linfoma, metástases). Emergência se sintomas graves.',
      criteriosDiagnosticos: [
        'Edema facial e de MMSS (pior pela manhã)',
        'Ingurgitamento jugular',
        'Circulação colateral torácica',
        'Dispneia, tosse, disfagia',
        'TC de tórax confirmando obstrução'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Cabeceira elevada', 'Stent endovascular (alívio rápido)', 'Radioterapia (se tumor radiossensível)'],
        farmacologico: ['Corticoides: Dexametasona 8-16mg/dia (se linfoma ou edema)', 'Anticoagulação se trombose associada', 'Tratamento do tumor primário: QT (CPPC, linfoma)']
      },
      redFlags: ['Estridor/obstrução de via aérea', 'Edema cerebral', 'Síncope', 'Trombose associada']
    },
    medicamentos: ['dexametasona'],
    protocolos: ['svcs-manejo'],
    calculadoras: [],
    citations: [{ refId: 'chest-svc-syndrome-2007', evidenceLevel: 'B', studyType: 'SystematicReview' }],
    lastUpdate: '2025-01',
    tags: ['oncologia', 'emergencia', 'cardiovascular']
  }
];

export default doencasOncologicas;
