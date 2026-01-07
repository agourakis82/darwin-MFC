/**
 * REFERÊNCIAS BIBLIOGRÁFICAS - PRÉ-NATAL DE ALTO RISCO
 * =====================================================
 *
 * Padrão Vancouver para todas as citações
 * Baseado nas diretrizes brasileiras e internacionais mais recentes
 */

import { Reference } from '../types/references';

export const referencesPrenatal: Record<string, Reference> = {
  // =============================================================================
  // MINISTÉRIO DA SAÚDE - BRASIL
  // =============================================================================

  'ms-gestacao-alto-risco-2022': {
    id: 'ms-gestacao-alto-risco-2022',
    type: 'livro',
    title: 'Manual de Gestação de Alto Risco',
    year: 2022,
    authors: ['Ministério da Saúde', 'Secretaria de Atenção Primária à Saúde'],
    publisher: 'Ministério da Saúde',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/manual_gestacao_alto_risco.pdf',
    accessDate: '2025-01-07'
  },

  'ms-prenatal-baixo-risco-2012': {
    id: 'ms-prenatal-baixo-risco-2012',
    type: 'livro',
    title: 'Atenção ao Pré-Natal de Baixo Risco - Caderno de Atenção Básica nº 32',
    year: 2012,
    authors: ['Ministério da Saúde'],
    publisher: 'Ministério da Saúde',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/cadernos_atencao_basica_32_prenatal.pdf',
    accessDate: '2025-01-07'
  },

  'ms-pcdt-transmissao-vertical-2022': {
    id: 'ms-pcdt-transmissao-vertical-2022',
    type: 'diretriz',
    title: 'Protocolo Clínico e Diretrizes Terapêuticas para Prevenção da Transmissão Vertical de HIV, Sífilis e Hepatites Virais',
    year: 2022,
    authors: ['Ministério da Saúde', 'DCCI'],
    publisher: 'Ministério da Saúde',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/protocolo_clinico_hiv_sifilis_hepatites.pdf',
    accessDate: '2025-01-07'
  },

  'ms-pcdt-trombofilia-2021': {
    id: 'ms-pcdt-trombofilia-2021',
    type: 'diretriz',
    title: 'Protocolo Clínico e Diretrizes Terapêuticas para Prevenção de Tromboembolismo Venoso em Gestantes com Trombofilia',
    year: 2021,
    authors: ['Ministério da Saúde', 'CONITEC'],
    legalNumber: 'Portaria Conjunta nº 23/2021',
    url: 'https://www.gov.br/conitec/pt-br/midias/protocolos/resumidos/pcdt_resumido_trombofilia_gestacional.pdf',
    accessDate: '2025-01-07'
  },

  // =============================================================================
  // SOCIEDADE BRASILEIRA DE DIABETES (SBD)
  // =============================================================================

  'sbd-dmg-2025': {
    id: 'sbd-dmg-2025',
    type: 'diretriz',
    title: 'Tratamento Farmacológico do DM2 e DMG na Gestação - Diretrizes SBD 2024-2025',
    year: 2025,
    authors: ['Sociedade Brasileira de Diabetes'],
    url: 'https://diretriz.diabetes.org.br/tratamento-farmacologico-do-dm2-e-dmg-na-gestacao/',
    accessDate: '2025-01-07'
  },

  'sbd-rastreamento-dmg-2025': {
    id: 'sbd-rastreamento-dmg-2025',
    type: 'diretriz',
    title: 'Rastreamento e Diagnóstico do Diabetes Mellitus Gestacional - Diretrizes SBD 2024-2025',
    year: 2025,
    authors: ['Sociedade Brasileira de Diabetes'],
    url: 'https://diretriz.diabetes.org.br/rastreamento-e-diagnostico-do-diabetes-mellitus-gestacional/',
    accessDate: '2025-01-07'
  },

  // =============================================================================
  // FEBRASGO
  // =============================================================================

  'febrasgo-tireoide-gestacao-2024': {
    id: 'febrasgo-tireoide-gestacao-2024',
    type: 'diretriz',
    title: 'Doenças da Tireoide na Gestação - Protocolo FEBRASGO-Obstetrícia n.5',
    year: 2024,
    authors: ['FEBRASGO', 'Comissão Nacional Especializada em Gestação de Alto Risco'],
    url: 'https://febrasgo.org.br/images/pec/CNE_pdfs/fps2024/',
    accessDate: '2025-01-07'
  },

  'febrasgo-cardiopatia-2021': {
    id: 'febrasgo-cardiopatia-2021',
    type: 'diretriz',
    title: 'Cardiopatia e Gravidez - Protocolo FEBRASGO-Obstetrícia n.41',
    year: 2021,
    authors: ['FEBRASGO', 'Comissão Nacional Especializada em Gestação de Alto Risco'],
    url: 'https://www.febrasgo.org.br/pt/noticias/item/cardiopatia-e-gravidez',
    accessDate: '2025-01-07'
  },

  'febrasgo-hipertireoidismo-2022': {
    id: 'febrasgo-hipertireoidismo-2022',
    type: 'diretriz',
    title: 'Rastreio, Diagnóstico e Manejo do Hipertireoidismo na Gestação',
    year: 2022,
    authors: ['FEBRASGO', 'SBEM'],
    journal: 'Femina',
    volume: '50',
    issue: '8',
    url: 'https://www.febrasgo.org.br/images/pec/posicionamentos-febrasgo/FPS---N8---Agosto-2022---portugues.pdf',
    accessDate: '2025-01-07'
  },

  'febrasgo-hipotireoidismo-2022': {
    id: 'febrasgo-hipotireoidismo-2022',
    type: 'diretriz',
    title: 'Rastreio, Diagnóstico e Manejo do Hipotireoidismo na Gestação',
    year: 2022,
    authors: ['FEBRASGO', 'SBEM'],
    journal: 'Femina',
    volume: '50',
    issue: '10',
    url: 'https://www.febrasgo.org.br/images/pec/posicionamentos-febrasgo/FPS-N10-Outubro-2022-portugues.pdf',
    accessDate: '2025-01-07'
  },

  // =============================================================================
  // SOCIEDADE BRASILEIRA DE CARDIOLOGIA (SBC)
  // =============================================================================

  'sbc-cardiopatia-gravidez-2020': {
    id: 'sbc-cardiopatia-gravidez-2020',
    type: 'diretriz',
    title: 'Posicionamento da Sociedade Brasileira de Cardiologia para Gravidez e Planejamento Familiar na Mulher Portadora de Cardiopatia',
    year: 2020,
    authors: ['Sociedade Brasileira de Cardiologia', 'Departamento de Cardiologia da Mulher'],
    journal: 'Arquivos Brasileiros de Cardiologia',
    volume: '114',
    issue: '5',
    pages: '849-942',
    doi: '10.36660/abc.20200406',
    pmid: '32491074',
    url: 'https://www.scielo.br/j/abc/a/G44cMS57LdN9g65nyqYSg6m',
    accessDate: '2025-01-07'
  },

  // =============================================================================
  // REDE BRASILEIRA DE ESTUDOS SOBRE HIPERTENSÃO NA GRAVIDEZ (RBEHG)
  // =============================================================================

  'rbehg-pre-eclampsia-2023': {
    id: 'rbehg-pre-eclampsia-2023',
    type: 'diretriz',
    title: 'Protocolo de Pré-eclâmpsia - RBEHG 2023',
    year: 2023,
    authors: ['Rede Brasileira de Estudos sobre Hipertensão na Gravidez'],
    url: 'https://rbehg.com.br/wp-content/uploads/2023/04/PROTOCOLO-2023.pdf',
    accessDate: '2025-01-07'
  },

  // =============================================================================
  // DIRETRIZES INTERNACIONAIS - ACOG
  // =============================================================================

  'acog-gestational-hypertension-2020': {
    id: 'acog-gestational-hypertension-2020',
    type: 'artigo',
    title: 'Gestational Hypertension and Preeclampsia: ACOG Practice Bulletin, Number 222',
    year: 2020,
    authors: ['American College of Obstetricians and Gynecologists'],
    journal: 'Obstetrics & Gynecology',
    volume: '135',
    issue: '6',
    pages: 'e237-e260',
    doi: '10.1097/AOG.0000000000003891',
    pmid: '32443079',
    accessDate: '2025-01-07'
  },

  'acog-gdm-2018': {
    id: 'acog-gdm-2018',
    type: 'artigo',
    title: 'ACOG Practice Bulletin No. 190: Gestational Diabetes Mellitus',
    year: 2018,
    authors: ['American College of Obstetricians and Gynecologists'],
    journal: 'Obstetrics & Gynecology',
    volume: '131',
    issue: '2',
    pages: 'e49-e64',
    doi: '10.1097/AOG.0000000000002501',
    pmid: '29370047',
    accessDate: '2025-01-07'
  },

  'acog-thyroid-2020': {
    id: 'acog-thyroid-2020',
    type: 'artigo',
    title: 'ACOG Practice Bulletin No. 223: Thyroid Disease in Pregnancy',
    year: 2020,
    authors: ['American College of Obstetricians and Gynecologists'],
    journal: 'Obstetrics & Gynecology',
    volume: '135',
    issue: '6',
    pages: 'e261-e274',
    doi: '10.1097/AOG.0000000000003893',
    pmid: '32443080',
    accessDate: '2025-01-07'
  },

  'acog-thromboembolism-2018': {
    id: 'acog-thromboembolism-2018',
    type: 'artigo',
    title: 'ACOG Practice Bulletin No. 196: Thromboembolism in Pregnancy',
    year: 2018,
    authors: ['American College of Obstetricians and Gynecologists'],
    journal: 'Obstetrics & Gynecology',
    volume: '132',
    issue: '1',
    pages: 'e1-e17',
    doi: '10.1097/AOG.0000000000002706',
    pmid: '29939940',
    accessDate: '2025-01-07'
  },

  // =============================================================================
  // AMERICAN DIABETES ASSOCIATION (ADA)
  // =============================================================================

  'ada-diabetes-pregnancy-2025': {
    id: 'ada-diabetes-pregnancy-2025',
    type: 'artigo',
    title: 'Management of Diabetes in Pregnancy: Standards of Care in Diabetes—2025',
    year: 2025,
    authors: ['American Diabetes Association'],
    journal: 'Diabetes Care',
    volume: '48',
    issue: 'Supplement 1',
    pages: 'S306-S320',
    doi: '10.2337/dc25-S015',
    url: 'https://diabetesjournals.org/care/article/48/Supplement_1/S306/157565/',
    accessDate: '2025-01-07'
  },

  // =============================================================================
  // OUTRAS DIRETRIZES INTERNACIONAIS
  // =============================================================================

  'sogc-hypertensive-disorders-2022': {
    id: 'sogc-hypertensive-disorders-2022',
    type: 'diretriz',
    title: 'Guideline No. 426: Hypertensive Disorders of Pregnancy: Diagnosis, Prediction, Prevention, and Management',
    year: 2022,
    authors: ['Society of Obstetricians and Gynaecologists of Canada'],
    journal: 'Journal of Obstetrics and Gynaecology Canada',
    volume: '44',
    issue: '5',
    pages: '547-571',
    doi: '10.1016/j.jogc.2022.03.002',
    pmid: '35568376',
    accessDate: '2025-01-07'
  },

  'who-preeclampsia-2011': {
    id: 'who-preeclampsia-2011',
    type: 'diretriz',
    title: 'WHO Recommendations for Prevention and Treatment of Pre-eclampsia and Eclampsia',
    year: 2011,
    authors: ['World Health Organization'],
    publisher: 'WHO',
    url: 'https://www.who.int/publications/i/item/9789241548335',
    accessDate: '2025-01-07'
  },

  'figo-gdm-2015': {
    id: 'figo-gdm-2015',
    type: 'artigo',
    title: 'The International Federation of Gynecology and Obstetrics (FIGO) Initiative on Gestational Diabetes Mellitus',
    year: 2015,
    authors: ['Hod M', 'Kapur A', 'Sacks DA', 'et al.'],
    journal: 'International Journal of Gynecology & Obstetrics',
    volume: '131',
    issue: 'S3',
    pages: 'S213-S220',
    doi: '10.1016/S0020-7292(15)30033-3',
    pmid: '26433807',
    accessDate: '2025-01-07'
  },

  // =============================================================================
  // ARTIGOS CIENTÍFICOS DE REFERÊNCIA
  // =============================================================================

  'magpie-trial-2002': {
    id: 'magpie-trial-2002',
    type: 'artigo',
    title: 'Do women with pre-eclampsia, and their babies, benefit from magnesium sulphate? The Magpie Trial',
    year: 2002,
    authors: ['Magpie Trial Collaborative Group'],
    journal: 'Lancet',
    volume: '359',
    issue: '9321',
    pages: '1877-1890',
    doi: '10.1016/s0140-6736(02)08778-0',
    pmid: '12057549',
    accessDate: '2025-01-07'
  },

  'hapo-study-2008': {
    id: 'hapo-study-2008',
    type: 'artigo',
    title: 'Hyperglycemia and Adverse Pregnancy Outcomes',
    year: 2008,
    authors: ['HAPO Study Cooperative Research Group'],
    journal: 'New England Journal of Medicine',
    volume: '358',
    issue: '19',
    pages: '1991-2002',
    doi: '10.1056/NEJMoa0707943',
    pmid: '18463375',
    accessDate: '2025-01-07'
  },

  'aspre-trial-2017': {
    id: 'aspre-trial-2017',
    type: 'artigo',
    title: 'Aspirin versus Placebo in Pregnancies at High Risk for Preterm Preeclampsia',
    year: 2017,
    authors: ['Rolnik DL', 'Wright D', 'Poon LC', 'et al.'],
    journal: 'New England Journal of Medicine',
    volume: '377',
    issue: '7',
    pages: '613-622',
    doi: '10.1056/NEJMoa1704559',
    pmid: '28657417',
    accessDate: '2025-01-07'
  },

  'iadpsg-criteria-2010': {
    id: 'iadpsg-criteria-2010',
    type: 'artigo',
    title: 'International Association of Diabetes and Pregnancy Study Groups recommendations on the diagnosis and classification of hyperglycemia in pregnancy',
    year: 2010,
    authors: ['International Association of Diabetes and Pregnancy Study Groups'],
    journal: 'Diabetes Care',
    volume: '33',
    issue: '3',
    pages: '676-682',
    doi: '10.2337/dc09-1848',
    pmid: '20190296',
    accessDate: '2025-01-07'
  },

  // =============================================================================
  // CLASSIFICAÇÃO OMS CARDIOPATIA
  // =============================================================================

  'who-cardiovascular-pregnancy-2018': {
    id: 'who-cardiovascular-pregnancy-2018',
    type: 'diretriz',
    title: 'WHO Classification of Maternal Cardiovascular Risk in Pregnancy',
    year: 2018,
    authors: ['World Health Organization', 'ESC Task Force'],
    journal: 'European Heart Journal',
    volume: '39',
    issue: '34',
    pages: '3165-3241',
    doi: '10.1093/eurheartj/ehy340',
    pmid: '30165544',
    accessDate: '2025-01-07'
  },

  // =============================================================================
  // FIOCRUZ / PORTAL DE BOAS PRÁTICAS
  // =============================================================================

  'fiocruz-sulfato-magnesio-2023': {
    id: 'fiocruz-sulfato-magnesio-2023',
    type: 'livro',
    title: 'Prevenção da Eclâmpsia: O Uso do Sulfato de Magnésio',
    year: 2023,
    authors: ['Portal de Boas Práticas', 'Fiocruz'],
    url: 'https://portaldeboaspraticas.iff.fiocruz.br/atencao-mulher/prevencao-da-eclampsia-o-uso-do-sulfato-de-magnesio/',
    accessDate: '2025-01-07'
  },

  // =============================================================================
  // SECRETARIAS ESTADUAIS E PROTOCOLOS LOCAIS
  // =============================================================================

  'ses-ce-estratificacao-risco': {
    id: 'ses-ce-estratificacao-risco',
    type: 'nota_tecnica',
    title: 'Nota Técnica: Estratificação de Risco Gestacional',
    year: 2023,
    authors: ['Secretaria da Saúde do Estado do Ceará'],
    url: 'https://www.saude.ce.gov.br/wp-content/uploads/sites/9/2018/06/estratificacao-de-Risco-Gestacional.pdf',
    accessDate: '2025-01-07'
  },

  'ses-mg-guia-gestante-2025': {
    id: 'ses-mg-guia-gestante-2025',
    type: 'livro',
    title: 'Guia de Atenção à Saúde da Gestante - Estratificação de Risco',
    year: 2025,
    authors: ['Secretaria de Estado de Saúde de Minas Gerais'],
    url: 'https://www.saude.mg.gov.br/wp-content/uploads/2025/01/12-11-Estratificacao-de-Risco-final-1.pdf',
    accessDate: '2025-01-07'
  }
};

/**
 * Função auxiliar para obter referência por ID
 */
export function getPrenatalReference(refId: string): Reference | undefined {
  return referencesPrenatal[refId];
}

/**
 * Função auxiliar para obter múltiplas referências
 */
export function getPrenatalReferences(refIds: string[]): Reference[] {
  return refIds
    .map(id => referencesPrenatal[id])
    .filter((ref): ref is Reference => ref !== undefined);
}
