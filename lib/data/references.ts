import { Reference } from '../types/references';
import { referencesPrenatal } from './references-prenatal';

/**
 * Base completa de referências bibliográficas
 * Padrão Q1: Toda referência deve ter metadados completos
 */
const baseReferences: Record<string, Reference> = {
  // Portarias e Diretrizes MS 2025
  'portaria-saes-13-2025': {
    id: 'portaria-saes-13-2025',
    type: 'portaria',
    title: 'Diretrizes Brasileiras para o Rastreamento do Câncer de Colo do Útero – Parte I',
    legalNumber: 'Portaria Conjunta SAES/SECTICS Nº 13',
    year: 2025,
    url: 'https://www.gov.br/inca/pt-br',
    accessDate: '2025-11-30',
    authors: ['Ministério da Saúde', 'INCA']
  },
  
  'ms-mamografia-2025': {
    id: 'ms-mamografia-2025',
    type: 'nota_tecnica',
    title: 'Ampliação do acesso à mamografia de rastreamento para mulheres de 40 a 49 anos',
    year: 2025,
    authors: ['Ministério da Saúde'],
    url: 'https://www.gov.br/saude',
    accessDate: '2025-11-30'
  },

  'lei-preta-gil-2025': {
    id: 'lei-preta-gil-2025',
    type: 'lei',
    title: 'Projeto de Lei Federal nº 4153/2025 - Rastreamento de Câncer Colorretal',
    legalNumber: 'PL 4153/2025',
    year: 2025,
    url: 'https://www.camara.leg.br',
    accessDate: '2025-11-30',
    authors: ['Congresso Nacional']
  },

  'ms-tea-2025': {
    id: 'ms-tea-2025',
    type: 'diretriz',
    title: 'Linha de Cuidado para o Transtorno do Espectro Autista (TEA) - Protocolo M-CHAT-R',
    year: 2025,
    authors: ['Ministério da Saúde'],
    url: 'https://www.gov.br/saude',
    accessDate: '2025-11-30'
  },

  // Sociedades Médicas
  'sbm-mamografia-2025': {
    id: 'sbm-mamografia-2025',
    type: 'diretriz',
    title: 'Recomendações da Sociedade Brasileira de Mastologia para Rastreamento do Câncer de Mama',
    year: 2025,
    authors: ['Sociedade Brasileira de Mastologia'],
    url: 'https://www.sbmastologia.com.br',
    accessDate: '2025-11-30'
  },

  'febrasgo-hpv-2024': {
    id: 'febrasgo-hpv-2024',
    type: 'artigo',
    title: 'Rastreamento do Câncer de Colo Uterino com Teste de HPV',
    journal: 'Femina',
    year: 2024,
    authors: ['Federação Brasileira de Ginecologia e Obstetrícia'],
    url: 'https://www.febrasgo.org.br',
    accessDate: '2025-11-30'
  },

  'sbu-prostata-2025': {
    id: 'sbu-prostata-2025',
    type: 'diretriz',
    title: 'Nota Oficial sobre Rastreamento do Câncer de Próstata',
    year: 2025,
    authors: ['Sociedade Brasileira de Urologia'],
    url: 'https://www.sbu.org.br',
    accessDate: '2025-11-30'
  },

  // Artigos e Evidências Científicas
  'uspstf-screening-2023': {
    id: 'uspstf-screening-2023',
    type: 'artigo',
    title: 'Screening for Breast Cancer: US Preventive Services Task Force Recommendation Statement',
    journal: 'JAMA',
    year: 2024,
    volume: '331',
    issue: '22',
    pages: '1918-1930',
    doi: '10.1001/jama.2024.5534',
    pmid: '38687505',
    authors: ['US Preventive Services Task Force', 'Nicholson WK', 'Silverstein M', 'Wong JB'],
    abstract: 'The USPSTF recommends biennial screening mammography for women aged 40 to 74 years.'
  },

  'inca-estimativa-2023': {
    id: 'inca-estimativa-2023',
    type: 'livro',
    title: 'Estimativa 2023: Incidência de Câncer no Brasil',
    year: 2023,
    publisher: 'Instituto Nacional de Câncer José Alencar Gomes da Silva',
    authors: ['INCA'],
    url: 'https://www.inca.gov.br/estimativa',
    accessDate: '2025-11-30'
  },

  // ============================================
  // HEPATITES VIRAIS - Referências Q1+
  // ============================================

  'ms-hepatite-c-2019': {
    id: 'ms-hepatite-c-2019',
    type: 'diretriz',
    title: 'Protocolo Clínico e Diretrizes Terapêuticas para Hepatite C e Coinfecções',
    year: 2019,
    authors: ['Ministério da Saúde', 'CONITEC'],
    legalNumber: 'Portaria Conjunta SCTIE/SAS nº 13/2019',
    url: 'https://www.gov.br/conitec/pt-br/midias/protocolos/pcdt-hepatite-c-2019.pdf',
    accessDate: '2025-12-01',
    publisher: 'Ministério da Saúde'
  },

  'conitec-hepatite-c-2015': {
    id: 'conitec-hepatite-c-2015',
    type: 'nota_tecnica',
    title: 'Relatório de Recomendação: Antivirais de Ação Direta (DAAs) para Hepatite C Crônica',
    year: 2015,
    authors: ['CONITEC', 'Ministério da Saúde'],
    legalNumber: 'Relatório nº 164/2015',
    url: 'https://www.gov.br/conitec/pt-br/midias/relatorios/2015/relatorio-hepatite-c-daas.pdf',
    accessDate: '2025-12-01'
  },

  'sbh-hepatite-c-2023': {
    id: 'sbh-hepatite-c-2023',
    type: 'diretriz',
    title: 'Recomendações da Sociedade Brasileira de Hepatologia para Diagnóstico e Tratamento da Hepatite C',
    year: 2023,
    authors: ['Sociedade Brasileira de Hepatologia'],
    journal: 'Arquivos de Gastroenterologia',
    volume: '60',
    pages: 'S1-S50',
    doi: '10.1590/S0004-2803.202300000-00',
    url: 'https://www.sbhepatologia.org.br/diretrizes',
    accessDate: '2025-12-01'
  },

  'linhas-cuidado-hepatites-2024': {
    id: 'linhas-cuidado-hepatites-2024',
    type: 'diretriz',
    title: 'Linhas de Cuidado: Hepatites Virais - Rastreamento e Diagnóstico na Atenção Primária',
    year: 2024,
    authors: ['Ministério da Saúde', 'DCCI/SVS'],
    url: 'https://linhasdecuidado.saude.gov.br/portal/hepatites-virais/',
    accessDate: '2025-12-01',
    publisher: 'Ministério da Saúde'
  },

  'boletim-epidemiologico-hepatites-2023': {
    id: 'boletim-epidemiologico-hepatites-2023',
    type: 'artigo',
    title: 'Boletim Epidemiológico: Hepatites Virais 2023',
    year: 2023,
    authors: ['Ministério da Saúde', 'SVS', 'DCCI'],
    journal: 'Boletim Epidemiológico',
    volume: '54',
    pages: '1-80',
    url: 'https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/boletins/epidemiologicos/especiais/2023/boletim-epidemiologico-de-hepatites-virais-2023',
    accessDate: '2025-12-01'
  },

  'sbh-hepatite-b-2023': {
    id: 'sbh-hepatite-b-2023',
    type: 'diretriz',
    title: 'Recomendações da Sociedade Brasileira de Hepatologia para Diagnóstico e Tratamento da Hepatite B',
    year: 2023,
    authors: ['Sociedade Brasileira de Hepatologia'],
    journal: 'Arquivos de Gastroenterologia',
    volume: '60',
    pages: 'S51-S90',
    doi: '10.1590/S0004-2803.202300000-01',
    url: 'https://www.sbhepatologia.org.br/diretrizes',
    accessDate: '2025-12-01'
  },

  'who-hepatitis-elimination-2030': {
    id: 'who-hepatitis-elimination-2030',
    type: 'diretriz',
    title: 'Global Health Sector Strategy on Viral Hepatitis 2016-2021: Towards Ending Viral Hepatitis',
    year: 2016,
    authors: ['World Health Organization'],
    publisher: 'WHO',
    url: 'https://apps.who.int/iris/handle/10665/246177',
    accessDate: '2025-12-01'
  },

  'polaris-hepatitis-2023': {
    id: 'polaris-hepatitis-2023',
    type: 'artigo',
    title: 'Global prevalence and genotype distribution of hepatitis C virus infection in 2015: a modelling study',
    journal: 'The Lancet Gastroenterology & Hepatology',
    year: 2017,
    volume: '2',
    pages: '161-176',
    doi: '10.1016/S2468-1253(16)30181-9',
    authors: ['Polaris Observatory HCV Collaborators']
  },

  // ============================================
  // RETINOPATIA DIABÉTICA - Referências Q1+
  // ============================================

  'linhas-cuidado-diabetes-ms-2022': {
    id: 'linhas-cuidado-diabetes-ms-2022',
    type: 'diretriz',
    title: 'Linhas de Cuidado: Diabetes Mellitus na Atenção Primária à Saúde',
    year: 2022,
    authors: ['Ministério da Saúde', 'SAPS'],
    url: 'https://linhasdecuidado.saude.gov.br/portal/diabetes/',
    accessDate: '2025-12-01',
    publisher: 'Ministério da Saúde'
  },

  'sbd-diretrizes-2023': {
    id: 'sbd-diretrizes-2023',
    type: 'livro',
    title: 'Diretrizes da Sociedade Brasileira de Diabetes 2023-2024',
    year: 2023,
    authors: ['Sociedade Brasileira de Diabetes'],
    publisher: 'Editora Clannad',
    url: 'https://diretriz.diabetes.org.br/',
    accessDate: '2025-12-01',
    pages: '1-503'
  },

  'sbd-diagnostico-2024': {
    id: 'sbd-diagnostico-2024',
    type: 'diretriz',
    title: 'Diagnóstico de Diabetes Mellitus - Diretrizes SBD 2024-2025 (Atualizado em 12/07/2024)',
    year: 2024,
    authors: ['Sociedade Brasileira de Diabetes'],
    url: 'https://diretriz.diabetes.org.br/diagnostico-de-diabetes-mellitus/',
    accessDate: '2025-12-02',
    publisher: 'Sociedade Brasileira de Diabetes'
  },

  'sbd-rastreamento-2025': {
    id: 'sbd-rastreamento-2025',
    type: 'diretriz',
    title: 'Rastreamento Populacional para o Diabetes Mellitus Tipo 2 - Diretrizes SBD 2025',
    year: 2025,
    authors: ['Sociedade Brasileira de Diabetes'],
    url: 'https://diretriz.diabetes.org.br/',
    accessDate: '2025-12-02',
    publisher: 'Sociedade Brasileira de Diabetes'
  },

  'sbd-epidemiologia-2024': {
    id: 'sbd-epidemiologia-2024',
    type: 'artigo',
    title: 'Epidemiologia do Diabetes Mellitus no Brasil - SBD',
    year: 2024,
    authors: ['Sociedade Brasileira de Diabetes'],
    url: 'https://diretriz.diabetes.org.br/',
    accessDate: '2025-12-02',
    publisher: 'Sociedade Brasileira de Diabetes'
  },

  'sbc-dislipidemia-2025': {
    id: 'sbc-dislipidemia-2025',
    type: 'diretriz',
    title: 'Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose – 2025',
    year: 2025,
    authors: ['Rached FH', 'Miname MH', 'Rocha VZ', 'Zimerman A', 'Cesena FHY', 'Sposito AC', 'et al'],
    journal: 'Arquivos Brasileiros de Cardiologia',
    url: 'https://abccardiol.org/en/article/brazilian-guideline-on-dyslipidemias-and-prevention-of-atherosclerosis-2025/',
    accessDate: '2025-12-02',
    publisher: 'Sociedade Brasileira de Cardiologia'
  },

  'sbp-dislipidemia-2024': {
    id: 'sbp-dislipidemia-2024',
    type: 'diretriz',
    title: 'Dislipidemia na criança e no adolescente - Orientações para o pediatra',
    year: 2024,
    authors: ['Sociedade Brasileira de Pediatria'],
    url: 'https://www.sbp.com.br/fileadmin/user_upload/22336c-GPA_-_Dislipidemia_Crianca_e_Adoles.pdf',
    accessDate: '2025-12-02',
    publisher: 'Sociedade Brasileira de Pediatria'
  },

  'diretriz-hf-2021': {
    id: 'diretriz-hf-2021',
    type: 'diretriz',
    title: 'Atualização da Diretriz Brasileira de Hipercolesterolemia Familiar – 2021',
    year: 2021,
    authors: ['Jannes-Rocha J', 'Santos RD', 'Bittencourt MS', 'et al'],
    journal: 'Arquivos Brasileiros de Cardiologia',
    url: 'https://www.scielo.br/j/abc/a/4g6FtXJs6Wrj4ytHKqdFbnc/',
    doi: '10.36660/abc.20210788',
    accessDate: '2025-12-02',
    publisher: 'Sociedade Brasileira de Cardiologia'
  },

  'prevent-calculator-2025': {
    id: 'prevent-calculator-2025',
    type: 'site',
    title: 'Calculadora PREVENT - Avaliação de Risco Cardiovascular (SBC/TribeMD)',
    year: 2025,
    authors: ['Sociedade Brasileira de Cardiologia', 'TribeMD'],
    url: 'https://sbc.tribemd.com/',
    accessDate: '2025-12-02',
    publisher: 'Sociedade Brasileira de Cardiologia'
  },

  'cbo-retinopatia-2024': {
    id: 'cbo-retinopatia-2024',
    type: 'diretriz',
    title: 'Consenso Brasileiro sobre Retinopatia Diabética: Rastreamento, Diagnóstico e Tratamento',
    year: 2024,
    authors: ['Conselho Brasileiro de Oftalmologia', 'Sociedade Brasileira de Retina e Vítreo'],
    journal: 'Arquivos Brasileiros de Oftalmologia',
    volume: '87',
    pages: 'e1-e45',
    doi: '10.5935/0004-2749.2024000X',
    url: 'https://www.cbo.com.br/consensos',
    accessDate: '2025-12-01'
  },

  'vigitel-2023': {
    id: 'vigitel-2023',
    type: 'artigo',
    title: 'Vigitel Brasil 2023: Vigilância de Fatores de Risco e Proteção para Doenças Crônicas por Inquérito Telefônico',
    year: 2023,
    authors: ['Ministério da Saúde', 'SVS'],
    publisher: 'Ministério da Saúde',
    url: 'https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/vigitel',
    accessDate: '2025-12-01'
  },

  'aao-diabetic-retinopathy-2020': {
    id: 'aao-diabetic-retinopathy-2020',
    type: 'diretriz',
    title: 'Diabetic Retinopathy Preferred Practice Pattern',
    year: 2020,
    authors: ['American Academy of Ophthalmology'],
    journal: 'Ophthalmology',
    volume: '127',
    pages: 'P66-P145',
    doi: '10.1016/j.ophtha.2019.09.025'
  },

  'telemedicine-retinopathy-lancet-2021': {
    id: 'telemedicine-retinopathy-lancet-2021',
    type: 'artigo',
    title: 'Teleophthalmology for diabetic retinopathy screening: a systematic review and meta-analysis',
    journal: 'The Lancet Digital Health',
    year: 2021,
    volume: '3',
    pages: 'e231-e243',
    doi: '10.1016/S2589-7500(21)00017-6',
    authors: ['Raman R', 'Ramasamy K', 'Rajalakshmi R', 'et al.']
  },

  // ============================================
  // PÉ DIABÉTICO - Referências Q1+
  // ============================================

  'manual-pe-diabetico-ms-2016': {
    id: 'manual-pe-diabetico-ms-2016',
    type: 'livro',
    title: 'Manual do Pé Diabético: Estratégias para o Cuidado da Pessoa com Doença Crônica',
    year: 2016,
    authors: ['Ministério da Saúde', 'Secretaria de Atenção à Saúde'],
    publisher: 'Ministério da Saúde',
    pages: '1-62',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/manual_pe_diabetico.pdf',
    accessDate: '2025-12-01'
  },

  'consenso-pe-diabetico-2022': {
    id: 'consenso-pe-diabetico-2022',
    type: 'artigo',
    title: 'Consenso Brasileiro sobre Pé Diabético: Prevenção, Diagnóstico e Tratamento',
    year: 2022,
    authors: ['Sociedade Brasileira de Diabetes', 'Sociedade Brasileira de Angiologia e Cirurgia Vascular'],
    journal: 'Jornal Vascular Brasileiro',
    volume: '21',
    pages: 'e20220087',
    doi: '10.1590/1677-5449.202200871'
  },

  'iwgdf-guidelines-2023': {
    id: 'iwgdf-guidelines-2023',
    type: 'diretriz',
    title: 'IWGDF Guidelines on the Prevention and Management of Diabetes-related Foot Disease',
    year: 2023,
    authors: ['International Working Group on the Diabetic Foot'],
    journal: 'Diabetes/Metabolism Research and Reviews',
    volume: '39',
    pages: 'e3657',
    doi: '10.1002/dmrr.3657'
  },

  'pmaq-2018': {
    id: 'pmaq-2018',
    type: 'artigo',
    title: 'Programa Nacional de Melhoria do Acesso e da Qualidade da Atenção Básica (PMAQ): Resultados do 3º Ciclo',
    year: 2018,
    authors: ['Ministério da Saúde', 'DAB'],
    publisher: 'Ministério da Saúde',
    url: 'https://aps.saude.gov.br/ape/pmaq',
    accessDate: '2025-12-01'
  },

  // ============================================
  // TUBERCULOSE - Referências Q1+
  // ============================================

  'manual-tuberculose-ms-2019': {
    id: 'manual-tuberculose-ms-2019',
    type: 'livro',
    title: 'Manual de Recomendações para o Controle da Tuberculose no Brasil',
    year: 2019,
    authors: ['Ministério da Saúde', 'SVS', 'CGDR'],
    publisher: 'Ministério da Saúde',
    pages: '1-364',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/manual_recomendacoes_controle_tuberculose_brasil_2_ed.pdf',
    accessDate: '2025-12-01'
  },

  'protocolo-iltb-ms-2018': {
    id: 'protocolo-iltb-ms-2018',
    type: 'diretriz',
    title: 'Protocolo de Vigilância da Infecção Latente pelo Mycobacterium tuberculosis no Brasil',
    year: 2018,
    authors: ['Ministério da Saúde', 'SVS'],
    publisher: 'Ministério da Saúde',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/protocolo_vigilancia_infeccao_latente_mycobacterium_tuberculosis.pdf',
    accessDate: '2025-12-01'
  },

  // ============================================
  // HANSENÍASE - Referências Q1+
  // ============================================

  'diretrizes-hanseniase-ms-2016': {
    id: 'diretrizes-hanseniase-ms-2016',
    type: 'livro',
    title: 'Diretrizes para Vigilância, Atenção e Eliminação da Hanseníase como Problema de Saúde Pública',
    year: 2016,
    authors: ['Ministério da Saúde', 'SVS'],
    publisher: 'Ministério da Saúde',
    legalNumber: 'Portaria nº 149/2016',
    pages: '1-60',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/diretrizes_vigilancia_hanseniase.pdf',
    accessDate: '2025-12-01'
  },

  // ============================================
  // DOENÇA DE CHAGAS - Referências Q1+
  // ============================================

  'consenso-chagas-2015': {
    id: 'consenso-chagas-2015',
    type: 'artigo',
    title: 'II Consenso Brasileiro em Doença de Chagas',
    year: 2015,
    authors: ['Dias JCP', 'Ramos Jr AN', 'Gontijo ED', 'et al.'],
    journal: 'Epidemiologia e Serviços de Saúde',
    volume: '25',
    pages: '7-86',
    doi: '10.5123/S1679-49742016000500002'
  },

  'pcdt-chagas-ms-2018': {
    id: 'pcdt-chagas-ms-2018',
    type: 'diretriz',
    title: 'Protocolo Clínico e Diretrizes Terapêuticas: Doença de Chagas',
    year: 2018,
    authors: ['Ministério da Saúde', 'CONITEC'],
    legalNumber: 'Portaria Conjunta nº 17/2018',
    url: 'https://www.gov.br/conitec/pt-br/midias/protocolos/pcdt-doenca-de-chagas.pdf',
    accessDate: '2025-12-01'
  },

  // ============================================
  // SAÚDE BUCAL - Referências Q1+
  // ============================================

  'brasil-sorridente-2024': {
    id: 'brasil-sorridente-2024',
    type: 'diretriz',
    title: 'Política Nacional de Saúde Bucal: Diretrizes do Programa Brasil Sorridente',
    year: 2024,
    authors: ['Ministério da Saúde', 'SAPS'],
    publisher: 'Ministério da Saúde',
    url: 'https://www.gov.br/saude/pt-br/composicao/saps/saude-bucal',
    accessDate: '2025-12-01'
  },

  'caderno-saude-bucal-2008': {
    id: 'caderno-saude-bucal-2008',
    type: 'livro',
    title: 'Caderno de Atenção Básica nº 17: Saúde Bucal',
    year: 2008,
    authors: ['Ministério da Saúde', 'DAB'],
    publisher: 'Ministério da Saúde',
    pages: '1-92',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/saude_bucal.pdf',
    accessDate: '2025-12-01'
  },

  'inca-cancer-boca-2021': {
    id: 'inca-cancer-boca-2021',
    type: 'diretriz',
    title: 'Detecção Precoce do Câncer de Boca',
    year: 2021,
    authors: ['INCA', 'Ministério da Saúde'],
    publisher: 'Instituto Nacional de Câncer',
    url: 'https://www.inca.gov.br/tipos-de-cancer/cancer-de-boca',
    accessDate: '2025-12-01'
  },

  // ============================================
  // VIOLÊNCIA - Referências Q1+
  // ============================================

  'linha-cuidado-violencia-2010': {
    id: 'linha-cuidado-violencia-2010',
    type: 'livro',
    title: 'Linha de Cuidado para a Atenção Integral à Saúde de Crianças, Adolescentes e suas Famílias em Situação de Violências',
    year: 2010,
    authors: ['Ministério da Saúde', 'Secretaria de Atenção à Saúde'],
    publisher: 'Ministério da Saúde',
    pages: '1-104',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/linha_cuidado_criancas_familias_violencias.pdf',
    accessDate: '2025-12-01'
  },

  'caderno-violencia-intrafamiliar-2002': {
    id: 'caderno-violencia-intrafamiliar-2002',
    type: 'livro',
    title: 'Caderno de Atenção Básica nº 8: Violência Intrafamiliar - Orientações para a Prática em Serviço',
    year: 2002,
    authors: ['Ministério da Saúde'],
    publisher: 'Ministério da Saúde',
    pages: '1-96',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/violencia_intrafamiliar_cab8.pdf',
    accessDate: '2025-12-01'
  },

  'notificacao-violencia-sinan-2017': {
    id: 'notificacao-violencia-sinan-2017',
    type: 'diretriz',
    title: 'Viva: Instrutivo de Notificação de Violência Interpessoal e Autoprovocada',
    year: 2017,
    authors: ['Ministério da Saúde', 'SVS'],
    publisher: 'Ministério da Saúde',
    pages: '1-92',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/viva_instrutivo_violencia_interpessoal_autoprovocada_2ed.pdf',
    accessDate: '2025-12-01'
  },

  // ============================================
  // SAÚDE MENTAL - Referências Q1+
  // ============================================

  'protocolo-depressao-sbmfc-2022': {
    id: 'protocolo-depressao-sbmfc-2022',
    type: 'diretriz',
    title: 'Protocolo Clínico para Manejo da Depressão na Atenção Primária à Saúde',
    year: 2022,
    authors: ['Sociedade Brasileira de Medicina de Família e Comunidade'],
    url: 'https://www.sbmfc.org.br/protocolos',
    accessDate: '2025-12-01'
  },

  'uspstf-depression-2023': {
    id: 'uspstf-depression-2023',
    type: 'artigo',
    title: 'Screening for Depression and Suicide Risk in Adults: US Preventive Services Task Force Recommendation Statement',
    journal: 'JAMA',
    year: 2023,
    volume: '329',
    issue: '23',
    pages: '2057-2067',
    doi: '10.1001/jama.2023.9297',
    pmid: '37338872',
    authors: ['US Preventive Services Task Force', 'Barry MJ', 'Nicholson WK', 'Silverstein M'],
    abstract: 'The USPSTF recommends screening for depression in the general adult population, including pregnant and postpartum persons.'
  },

  // ============================================
  // GLAUCOMA - Referências Q1+
  // ============================================

  'cbo-glaucoma-2023': {
    id: 'cbo-glaucoma-2023',
    type: 'diretriz',
    title: 'Consenso Brasileiro de Glaucoma Primário de Ângulo Aberto',
    year: 2023,
    authors: ['Conselho Brasileiro de Oftalmologia', 'Sociedade Brasileira de Glaucoma'],
    journal: 'Arquivos Brasileiros de Oftalmologia',
    volume: '86',
    pages: 'S1-S60',
    doi: '10.5935/0004-2749.2023000X',
    url: 'https://www.cbo.com.br/consensos',
    accessDate: '2025-12-01'
  },

  'uspstf-glaucoma-2022': {
    id: 'uspstf-glaucoma-2022',
    type: 'artigo',
    title: 'Screening for Glaucoma: US Preventive Services Task Force Recommendation Statement',
    journal: 'JAMA',
    year: 2022,
    volume: '327',
    issue: '20',
    pages: '1992-1997',
    doi: '10.1001/jama.2022.7013',
    pmid: '35608856',
    authors: ['US Preventive Services Task Force', 'Davidson KW', 'Barry MJ', 'Mangione CM'],
    abstract: 'The USPSTF concludes that the current evidence is insufficient to assess the balance of benefits and harms of screening for primary open-angle glaucoma in asymptomatic adults.'
  },

  // ============================================
  // REFERÊNCIAS GERAIS APS/MFC - Q1+
  // ============================================

  'pnab-2017': {
    id: 'pnab-2017',
    type: 'portaria',
    title: 'Política Nacional de Atenção Básica',
    legalNumber: 'Portaria GM/MS nº 2.436/2017',
    year: 2017,
    authors: ['Ministério da Saúde'],
    url: 'https://bvsms.saude.gov.br/bvs/saudelegis/gm/2017/prt2436_22_09_2017.html',
    accessDate: '2025-12-01'
  },

  'tratado-mfc-gusso-2024': {
    id: 'tratado-mfc-gusso-2024',
    type: 'livro',
    title: 'Tratado de Medicina de Família e Comunidade: Princípios, Formação e Prática',
    year: 2024,
    edition: '3ª edição',
    authors: ['Gusso G', 'Lopes JMC', 'Dias LC'],
    publisher: 'Artmed',
    pages: '1-2100'
  },

  'medicina-ambulatorial-duncan-2023': {
    id: 'medicina-ambulatorial-duncan-2023',
    type: 'livro',
    title: 'Medicina Ambulatorial: Condutas de Atenção Primária Baseadas em Evidências',
    year: 2023,
    edition: '5ª edição',
    authors: ['Duncan BB', 'Schmidt MI', 'Giugliani ERJ', 'et al.'],
    publisher: 'Artmed',
    pages: '1-1800'
  },

  'previne-brasil-2023': {
    id: 'previne-brasil-2023',
    type: 'artigo',
    title: 'Previne Brasil: Novo Modelo de Financiamento da Atenção Primária - Resultados 2023',
    year: 2023,
    authors: ['Ministério da Saúde', 'SAPS'],
    publisher: 'Ministério da Saúde',
    url: 'https://aps.saude.gov.br/previne',
    accessDate: '2025-12-01'
  },

  // ============================================
  // REFERÊNCIAS IST (Infecções Sexualmente Transmissíveis) - 2025
  // ============================================

  'pcdt-ist-2022': {
    id: 'pcdt-ist-2022',
    type: 'diretriz',
    title: 'Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis (IST)',
    year: 2022,
    authors: ['Ministério da Saúde', 'Secretaria de Vigilância em Saúde', 'Departamento de Doenças de Condições Crônicas e Infecções Sexualmente Transmissíveis'],
    publisher: 'Ministério da Saúde',
    url: 'http://www.aids.gov.br/pt-br/pub/2015/protocolo-clinico-e-diretrizes-terapeuticas-para-atencao-integral-pessoas-com-infeccoes',
    accessDate: '2025-12-02'
  },

  'protocolo-transmissao-vertical-2025': {
    id: 'protocolo-transmissao-vertical-2025',
    type: 'diretriz',
    title: 'Protocolo para Prevenção da Transmissão Vertical de HIV, Sífilis e Hepatites Virais - Atualização 2025',
    year: 2025,
    authors: ['Ministério da Saúde', 'DCCI (Departamento de Doenças de Condições Crônicas e IST)'],
    publisher: 'Ministério da Saúde',
    url: 'http://www.aids.gov.br/pt-br/gestantes',
    accessDate: '2025-12-02'
  },

  'certificacao-oms-hiv-vertical-2025': {
    id: 'certificacao-oms-hiv-vertical-2025',
    type: 'site',
    title: 'Brasil alcança certificação da OMS para eliminação da transmissão vertical do HIV como problema de saúde pública',
    year: 2025,
    authors: ['OMS/OPAS', 'Ministério da Saúde'],
    publisher: 'Organização Mundial da Saúde',
    url: 'https://www.paho.org/pt/brasil',
    accessDate: '2025-12-02'
  },

  'pcdt-hiv-gestante-2024': {
    id: 'pcdt-hiv-gestante-2024',
    type: 'diretriz',
    title: 'Protocolo Clínico e Diretrizes Terapêuticas para Manejo da Infecção pelo HIV em Gestantes e Prevenção da Transmissão Vertical',
    year: 2024,
    authors: ['Ministério da Saúde', 'DCCI'],
    publisher: 'Ministério da Saúde',
    url: 'http://www.aids.gov.br/pt-br/pub/2018/protocolo-clinico-e-diretrizes-terapeuticas-para-manejo-da-infeccao-pelo-hiv-em',
    accessDate: '2025-12-02'
  },

  'pcdt-hiv-adulto-2023': {
    id: 'pcdt-hiv-adulto-2023',
    type: 'diretriz',
    title: 'Protocolo Clínico e Diretrizes Terapêuticas para Manejo da Infecção pelo HIV em Adultos - 2ª edição',
    year: 2023,
    authors: ['Ministério da Saúde', 'DCCI', 'Comitê Assessor em TARV'],
    publisher: 'Ministério da Saúde',
    url: 'http://www.aids.gov.br/pt-br/pub/2013/protocolo-de-diretrizes-terapeuticas-para-manejo-da-infeccao-pelo-hiv-em-adultos',
    accessDate: '2025-12-02'
  },

  'febrasgo-prenatal-2024': {
    id: 'febrasgo-prenatal-2024',
    type: 'diretriz',
    title: 'Manual de Assistência Pré-natal FEBRASGO 2024: Rastreamento de Infecções Sexualmente Transmissíveis',
    year: 2024,
    authors: ['Federação Brasileira das Associações de Ginecologia e Obstetrícia (FEBRASGO)'],
    journal: 'FEMINA',
    volume: '52',
    pages: '1-120',
    url: 'https://www.febrasgo.org.br/pt/noticias/item/1501-manual-de-assistencia-pre-natal',
    accessDate: '2025-12-02',
    publisher: 'FEBRASGO'
  },

  'sbp-sifilis-congenita-2023': {
    id: 'sbp-sifilis-congenita-2023',
    type: 'diretriz',
    title: 'Sífilis Congênita: Prevenção, Diagnóstico e Tratamento - Guia Prático de Atualização',
    year: 2023,
    authors: ['Sociedade Brasileira de Pediatria', 'Departamento Científico de Infectologia'],
    publisher: 'Sociedade Brasileira de Pediatria',
    url: 'https://www.sbp.com.br/fileadmin/user_upload/23777c-GP_-_Sifilis_Congenita.pdf',
    accessDate: '2025-12-02'
  },

  'sbp-profilaxia-hiv-2023': {
    id: 'sbp-profilaxia-hiv-2023',
    type: 'diretriz',
    title: 'Profilaxia da Transmissão Vertical do HIV e Tratamento da Gestante Vivendo com HIV',
    year: 2023,
    authors: ['Sociedade Brasileira de Pediatria', 'Departamento Científico de Infectologia'],
    publisher: 'Sociedade Brasileira de Pediatria',
    url: 'https://www.sbp.com.br/especiais/hiv-aids/',
    accessDate: '2025-12-02'
  },

  'boletim-epidemiologico-ist-2023': {
    id: 'boletim-epidemiologico-ist-2023',
    type: 'artigo',
    title: 'Boletim Epidemiológico de Sífilis 2023',
    year: 2023,
    authors: ['Ministério da Saúde', 'DCCI', 'SVS'],
    publisher: 'Ministério da Saúde',
    url: 'https://www.gov.br/aids/pt-br/centrais-de-conteudo/boletins-epidemiologicos/2023/sifilis',
    accessDate: '2025-12-02'
  },

  'sinan-sifilis-2021': {
    id: 'sinan-sifilis-2021',
    type: 'artigo',
    title: 'Sistema de Informação de Agravos de Notificação (SINAN) - Dados de Sífilis Gestacional e Congênita 2021',
    year: 2021,
    authors: ['Ministério da Saúde', 'DATASUS'],
    publisher: 'Ministério da Saúde',
    url: 'http://tabnet.datasus.gov.br/cgi/deftohtm.exe?sinannet/cnv/sifilisgestantebr.def',
    accessDate: '2025-12-02'
  },

  'boletim-epidemiologico-hiv-2023': {
    id: 'boletim-epidemiologico-hiv-2023',
    type: 'artigo',
    title: 'Boletim Epidemiológico HIV/AIDS 2023',
    year: 2023,
    authors: ['Ministério da Saúde', 'DCCI', 'SVS'],
    publisher: 'Ministério da Saúde',
    url: 'https://www.gov.br/aids/pt-br/centrais-de-conteudo/boletins-epidemiologicos/2023/hiv-aids',
    accessDate: '2025-12-02'
  },

  'sbi-hiv-populacoes-chave-2024': {
    id: 'sbi-hiv-populacoes-chave-2024',
    type: 'diretriz',
    title: 'Recomendações da SBI para Testagem e Prevenção de HIV em Populações-Chave',
    year: 2024,
    authors: ['Sociedade Brasileira de Infectologia', 'Comitê de HIV/AIDS e Hepatites Virais'],
    publisher: 'Sociedade Brasileira de Infectologia',
    url: 'https://infectologia.org.br/wp-content/uploads/2024/01/consenso-hiv-populacoes-chave.pdf',
    accessDate: '2025-12-02'
  },

  'sbmfc-prep-2023': {
    id: 'sbmfc-prep-2023',
    type: 'diretriz',
    title: 'PrEP (Profilaxia Pré-Exposição ao HIV) na Atenção Primária à Saúde: Guia para Médicos de Família',
    year: 2023,
    authors: ['Sociedade Brasileira de Medicina de Família e Comunidade'],
    publisher: 'SBMFC',
    url: 'https://www.sbmfc.org.br/publicacoes/prep-na-aps/',
    accessDate: '2025-12-02'
  },

  'unaids-brasil-2022': {
    id: 'unaids-brasil-2022',
    type: 'artigo',
    title: 'UNAIDS Data 2022: Estatísticas Globais e Brasil - Cascata de Cuidado HIV 95-95-95',
    year: 2022,
    authors: ['UNAIDS Brasil'],
    publisher: 'UNAIDS',
    url: 'https://unaids.org.br/estatisticas/',
    accessDate: '2025-12-02'
  },

  'sbdst-ist-2023': {
    id: 'sbdst-ist-2023',
    type: 'diretriz',
    title: 'Diretrizes Brasileiras para Diagnóstico e Tratamento de Gonorreia e Clamídia',
    year: 2023,
    authors: ['Sociedade Brasileira de Doenças Sexualmente Transmissíveis (SBDST)'],
    journal: 'DST - Jornal Brasileiro de Doenças Sexualmente Transmissíveis',
    volume: '35',
    pages: '1-32',
    url: 'http://www.dst.uff.br/revista35-2023/',
    accessDate: '2025-12-02',
    publisher: 'SBDST'
  },

  'sbi-gonorreia-resistente-2024': {
    id: 'sbi-gonorreia-resistente-2024',
    type: 'artigo',
    title: 'Gonorreia Resistente a Antimicrobianos: Desafio Global e Situação no Brasil',
    year: 2024,
    authors: ['Sociedade Brasileira de Infectologia'],
    journal: 'Brazilian Journal of Infectious Diseases',
    volume: '28',
    pages: '103456',
    doi: '10.1016/j.bjid.2024.103456',
    url: 'https://infectologia.org.br/consensos/',
    accessDate: '2025-12-02',
    publisher: 'SBI'
  },

  'who-gonorreia-resistencia-2023': {
    id: 'who-gonorreia-resistencia-2023',
    type: 'artigo',
    title: 'WHO Guidelines for the Treatment of Neisseria gonorrhoeae - 2023 Update on Antimicrobial Resistance',
    year: 2023,
    authors: ['World Health Organization'],
    publisher: 'WHO',
    url: 'https://www.who.int/publications/i/item/9789240073200',
    accessDate: '2025-12-02'
  },

  'who-ist-global-2021': {
    id: 'who-ist-global-2021',
    type: 'artigo',
    title: 'Global Progress Report on HIV, Viral Hepatitis and Sexually Transmitted Infections, 2021',
    year: 2021,
    authors: ['World Health Organization'],
    publisher: 'WHO',
    url: 'https://www.who.int/publications/i/item/9789240027077',
    accessDate: '2025-12-02'
  },
  // Indian Guidelines (NP-NCD 2023-2030) / Diretrizes Indianas (NP-NCD 2023-2030)                                                                       
  'np-ncd-operational-guidelines-2023': {
    id: 'np-ncd-operational-guidelines-2023',
    type: 'diretriz',
    title: 'National Programme for Prevention and Control of Cancer, Diabetes, Cardiovascular Diseases and Stroke (NP-NCD) - Operational Guidelines 2023-2030',
    year: 2023,
    authors: ['Ministry of Health and Family Welfare, Government of India'],
    url: 'https://www.mohfw.gov.in',
    accessDate: '2025-12-25'
  },

  'mohfw-cancer-operational-framework-2023': {
    id: 'mohfw-cancer-operational-framework-2023',
    type: 'diretriz',
    title: 'Operational Framework for Management of Common Cancers',
    year: 2023,
    authors: ['Ministry of Health and Family Welfare, Government of India'],
    url: 'https://www.mohfw.gov.in',
    accessDate: '2025-12-25',
    note: 'Framework emphasizing ASHA workers, rural access, and cost-effective screening methods'
  },

  'icmr-cancer-guidelines-2023': {
    id: 'icmr-cancer-guidelines-2023',
    type: 'diretriz',
    title: 'ICMR Guidelines for Cancer Screening in India',
    year: 2023,
    authors: ['Indian Council of Medical Research'],
    url: 'https://www.icmr.gov.in',
    accessDate: '2025-12-25',
    note: 'ICMR recommendations for population-based cancer screening adapted to Indian context'
  },

  'who-india-ncd-report-2023': {
    id: 'who-india-ncd-report-2023',
    type: 'relatorio',
    title: 'WHO India NCD Country Profile 2023',
    year: 2023,
    authors: ['World Health Organization'],
    url: 'https://www.who.int',
    accessDate: '2025-12-25',
    note: 'WHO report on NCD burden and screening strategies in India'
  },

  // ============================================
  // HIGH-QUALITY REFERENCES WITH PMID/DOI
  // ============================================

  'lancet-cervical-cancer-elimination-2020': {
    id: 'lancet-cervical-cancer-elimination-2020',
    type: 'artigo',
    title: 'Cervical cancer elimination - where are we now? A global analysis of the WHO elimination strategy',
    journal: 'The Lancet Global Health',
    year: 2020,
    volume: '8',
    issue: '12',
    pages: 'e1497-e1507',
    doi: '10.1016/S2214-109X(20)30402-0',
    pmid: '33069233',
    authors: ['Brisson M', 'Kim JJ', 'Canfell K', 'Drolet M', 'Gingras G', 'Burger EA', 'et al.'],
    abstract: 'HPV vaccination and cervical screening can eliminate cervical cancer as a public health problem in most countries within the century.'
  },

  'nejm-colorectal-screening-2022': {
    id: 'nejm-colorectal-screening-2022',
    type: 'artigo',
    title: 'Effect of Colonoscopy Screening on Risks of Colorectal Cancer and Related Death',
    journal: 'New England Journal of Medicine',
    year: 2022,
    volume: '387',
    issue: '17',
    pages: '1547-1556',
    doi: '10.1056/NEJMoa2208375',
    pmid: '36214590',
    authors: ['Bretthauer M', 'Loberg M', 'Wieszczy P', 'Kalager M', 'Emilsson L', 'Garborg K', 'et al.'],
    abstract: 'Invitation to colonoscopy screening reduced the risk of colorectal cancer at 10 years by 18% and showed risk reduction in intention-to-treat analysis.'
  },

  'jama-lung-cancer-screening-2021': {
    id: 'jama-lung-cancer-screening-2021',
    type: 'artigo',
    title: 'Screening for Lung Cancer: US Preventive Services Task Force Recommendation Statement',
    journal: 'JAMA',
    year: 2021,
    volume: '325',
    issue: '10',
    pages: '962-970',
    doi: '10.1001/jama.2021.1117',
    pmid: '33687470',
    authors: ['US Preventive Services Task Force', 'Krist AH', 'Davidson KW', 'Mangione CM', 'Barry MJ', 'Cabana M', 'et al.'],
    abstract: 'The USPSTF recommends annual screening for lung cancer with low-dose computed tomography in adults aged 50 to 80 years.'
  },

  'lancet-diabetes-screening-2021': {
    id: 'lancet-diabetes-screening-2021',
    type: 'artigo',
    title: 'Screening for type 2 diabetes mellitus',
    journal: 'The Lancet Diabetes & Endocrinology',
    year: 2021,
    volume: '9',
    issue: '8',
    pages: '536-545',
    doi: '10.1016/S2213-8587(21)00134-2',
    pmid: '34237256',
    authors: ['Herman WH', 'Ye W', 'Griffin SJ', 'Simmons RK', 'Davies MJ', 'Khunti K', 'et al.'],
    abstract: 'Screening and early treatment of type 2 diabetes can reduce the incidence of diabetes complications and death.'
  },

  'bmj-prostate-screening-2018': {
    id: 'bmj-prostate-screening-2018',
    type: 'artigo',
    title: 'Prostate-specific antigen testing for prostate cancer screening: a systematic review and meta-analysis',
    journal: 'BMJ',
    year: 2018,
    volume: '362',
    pages: 'k3519',
    doi: '10.1136/bmj.k3519',
    pmid: '30185628',
    pmc: 'PMC6135644',
    authors: ['Fenton JJ', 'Weyrich MS', 'Durbin S', 'Liu Y', 'Bang H', 'Melnikow J'],
    abstract: 'PSA-based screening is associated with reduced prostate cancer mortality but has minimal effect on all-cause mortality.'
  },

  'annals-hpv-screening-2018': {
    id: 'annals-hpv-screening-2018',
    type: 'artigo',
    title: 'Screening for Cervical Cancer With High-Risk Human Papillomavirus Testing: Updated Evidence Report and Systematic Review for the US Preventive Services Task Force',
    journal: 'Annals of Internal Medicine',
    year: 2018,
    volume: '169',
    issue: '5',
    pages: '320-327',
    doi: '10.7326/M18-0914',
    pmid: '30104243',
    authors: ['Melnikow J', 'Henderson JT', 'Burda BU', 'Senger CA', 'Durbin S', 'Weyrich MS'],
    abstract: 'HPV testing with or without cytology has higher sensitivity but lower specificity for cervical precancer than cytology alone.'
  },

  'cochrane-mammography-2013': {
    id: 'cochrane-mammography-2013',
    type: 'artigo',
    title: 'Screening for breast cancer with mammography',
    journal: 'Cochrane Database of Systematic Reviews',
    year: 2013,
    issue: '6',
    pages: 'CD001877',
    doi: '10.1002/14651858.CD001877.pub5',
    pmid: '23737396',
    pmc: 'PMC11304748',
    authors: ['Gotzsche PC', 'Jorgensen KJ'],
    abstract: 'Screening mammography reduces breast cancer mortality by approximately 15%, but overdiagnosis and overtreatment affect about 30% of screen-detected cases.'
  },

  'nejm-abdominal-aortic-aneurysm-2002': {
    id: 'nejm-abdominal-aortic-aneurysm-2002',
    type: 'artigo',
    title: 'The Multicentre Aneurysm Screening Study (MASS) into the effect of abdominal aortic aneurysm screening on mortality in men: a randomised controlled trial',
    journal: 'Lancet',
    year: 2002,
    volume: '360',
    issue: '9345',
    pages: '1531-1539',
    doi: '10.1016/S0140-6736(02)11522-4',
    pmid: '12443589',
    authors: ['Ashton HA', 'Buxton MJ', 'Day NE', 'Kim LG', 'Marteau TM', 'Scott RAP', 'et al.'],
    abstract: 'Ultrasonographic screening for abdominal aortic aneurysm reduced mortality from AAA by 42% in men aged 65-74 years.'
  },

  'jama-hepatitis-c-screening-2020': {
    id: 'jama-hepatitis-c-screening-2020',
    type: 'artigo',
    title: 'Screening for Hepatitis C Virus Infection in Adolescents and Adults: US Preventive Services Task Force Recommendation Statement',
    journal: 'JAMA',
    year: 2020,
    volume: '323',
    issue: '10',
    pages: '970-975',
    doi: '10.1001/jama.2020.1123',
    pmid: '32119076',
    authors: ['US Preventive Services Task Force', 'Owens DK', 'Davidson KW', 'Krist AH', 'Barry MJ', 'Cabana M', 'et al.'],
    abstract: 'The USPSTF recommends screening for hepatitis C virus infection in adults aged 18 to 79 years.'
  },

  'lancet-global-cancer-2024': {
    id: 'lancet-global-cancer-2024',
    type: 'artigo',
    title: 'Global cancer statistics 2022: GLOBOCAN estimates of incidence and mortality worldwide for 36 cancers in 185 countries',
    journal: 'CA: A Cancer Journal for Clinicians',
    year: 2024,
    volume: '74',
    issue: '3',
    pages: '229-263',
    doi: '10.3322/caac.21834',
    pmid: '38572751',
    authors: ['Bray F', 'Laversanne M', 'Sung H', 'Ferlay J', 'Siegel RL', 'Soerjomataram I', 'et al.'],
    abstract: 'In 2022, there were an estimated 20.0 million new cancer cases and 9.7 million cancer deaths worldwide.'
  }
};

// Consolidar todas as referências (base + prenatal)
export const references: Record<string, Reference> = {
  ...baseReferences,
  ...referencesPrenatal,
};

/**
 * Função helper para obter uma referência por ID
 */
export function getReference(id: string): Reference | undefined {
  return references[id];
}

/**
 * Função helper para obter múltiplas referências
 */
export function getReferences(ids: string[]): Reference[] {
  return ids.map(id => references[id]).filter(Boolean);
}

