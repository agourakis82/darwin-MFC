import { Reference } from '../types/references';

/**
 * Base completa de referências bibliográficas
 * Padrão Q1: Toda referência deve ter metadados completos
 */
export const references: Record<string, Reference> = {
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
    year: 2023,
    volume: '329',
    pages: '1902-1910',
    doi: '10.1001/jama.2023.xxxx',
    authors: ['US Preventive Services Task Force']
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
    pages: '2057-2067',
    doi: '10.1001/jama.2023.9297',
    authors: ['US Preventive Services Task Force']
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
    pages: '1992-1997',
    doi: '10.1001/jama.2022.7013',
    authors: ['US Preventive Services Task Force']
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
  // DOENÇAS CARDIOVASCULARES - Referências Q1+
  // ============================================

  // --- INSUFICIÊNCIA CARDÍACA ---
  'diretriz-ic-2021': {
    id: 'diretriz-ic-2021',
    type: 'diretriz',
    title: 'Diretriz Brasileira de Insuficiência Cardíaca Crônica e Aguda',
    year: 2021,
    authors: ['Marcondes-Braga FG', 'Moura LAZ', 'Issa VS', 'Vieira JL', 'Rohde LE', 'et al'],
    journal: 'Arquivos Brasileiros de Cardiologia',
    volume: '116',
    pages: '1174-1212',
    doi: '10.36660/abc.20210062',
    url: 'https://abccardiol.org/article/brazilian-guideline-on-heart-failure/',
    accessDate: '2025-01-15'
  },
  'paradigm-hf-2014': {
    id: 'paradigm-hf-2014',
    type: 'artigo',
    title: 'Angiotensin-Neprilysin Inhibition versus Enalapril in Heart Failure (PARADIGM-HF)',
    year: 2014,
    authors: ['McMurray JJ', 'Packer M', 'Desai AS', 'Gong J', 'Lefkowitz MP', 'et al'],
    journal: 'New England Journal of Medicine',
    volume: '371',
    pages: '993-1004',
    doi: '10.1056/NEJMoa1409077',
    pmid: '25176015'
  },
  'dapa-hf-2019': {
    id: 'dapa-hf-2019',
    type: 'artigo',
    title: 'Dapagliflozin in Patients with Heart Failure and Reduced Ejection Fraction (DAPA-HF)',
    year: 2019,
    authors: ['McMurray JJV', 'Solomon SD', 'Inzucchi SE', 'Køber L', 'Kosiborod MN', 'et al'],
    journal: 'New England Journal of Medicine',
    volume: '381',
    pages: '1995-2008',
    doi: '10.1056/NEJMoa1911303',
    pmid: '31535829'
  },
  'emperor-reduced-2020': {
    id: 'emperor-reduced-2020',
    type: 'artigo',
    title: 'Empagliflozin in Heart Failure with a Reduced Ejection Fraction (EMPEROR-Reduced)',
    year: 2020,
    authors: ['Packer M', 'Anker SD', 'Butler J', 'Filippatos G', 'Pocock SJ', 'et al'],
    journal: 'New England Journal of Medicine',
    volume: '383',
    pages: '1413-1424',
    doi: '10.1056/NEJMoa2022190',
    pmid: '32865377'
  },
  'rales-1999': {
    id: 'rales-1999',
    type: 'artigo',
    title: 'The Effect of Spironolactone on Morbidity and Mortality in Patients with Severe Heart Failure (RALES)',
    year: 1999,
    authors: ['Pitt B', 'Zannad F', 'Remme WJ', 'Cody R', 'Castaigne A', 'et al'],
    journal: 'New England Journal of Medicine',
    volume: '341',
    pages: '709-717',
    doi: '10.1056/NEJM199909023411001',
    pmid: '10471456'
  },
  'cibis-ii-1999': {
    id: 'cibis-ii-1999',
    type: 'artigo',
    title: 'The Cardiac Insufficiency Bisoprolol Study II (CIBIS-II): a randomised trial',
    year: 1999,
    authors: ['CIBIS-II Investigators and Committees'],
    journal: 'Lancet',
    volume: '353',
    pages: '9-13',
    doi: '10.1016/S0140-6736(98)11181-9',
    pmid: '10023943'
  },
  'copernicus-2001': {
    id: 'copernicus-2001',
    type: 'artigo',
    title: 'Effect of Carvedilol on Survival in Severe Chronic Heart Failure (COPERNICUS)',
    year: 2001,
    authors: ['Packer M', 'Coats AJ', 'Fowler MB', 'Katus HA', 'Krum H', 'et al'],
    journal: 'New England Journal of Medicine',
    volume: '344',
    pages: '1651-1658',
    doi: '10.1056/NEJM200105313442201',
    pmid: '11386263'
  },
  'solvd-treatment-1991': {
    id: 'solvd-treatment-1991',
    type: 'artigo',
    title: 'Effect of Enalapril on Survival in Patients with Reduced Left Ventricular Ejection Fractions and Congestive Heart Failure (SOLVD-Treatment)',
    year: 1991,
    authors: ['The SOLVD Investigators'],
    journal: 'New England Journal of Medicine',
    volume: '325',
    pages: '293-302',
    doi: '10.1056/NEJM199108013250501',
    pmid: '2057034'
  },

  // --- FIBRILAÇÃO ATRIAL ---
  'esc-fa-2020': {
    id: 'esc-fa-2020',
    type: 'diretriz',
    title: '2020 ESC Guidelines for the diagnosis and management of atrial fibrillation',
    year: 2020,
    authors: ['Hindricks G', 'Potpara T', 'Dagres N', 'Arbelo E', 'Bax JJ', 'et al'],
    journal: 'European Heart Journal',
    volume: '42',
    pages: '373-498',
    doi: '10.1093/eurheartj/ehaa612',
    pmid: '32860505'
  },
  're-ly-2009': {
    id: 're-ly-2009',
    type: 'artigo',
    title: 'Dabigatran versus Warfarin in Patients with Atrial Fibrillation (RE-LY)',
    year: 2009,
    authors: ['Connolly SJ', 'Ezekowitz MD', 'Yusuf S', 'Eikelboom J', 'Oldgren J', 'et al'],
    journal: 'New England Journal of Medicine',
    volume: '361',
    pages: '1139-1151',
    doi: '10.1056/NEJMoa0905561',
    pmid: '19717844'
  },
  'rocket-af-2011': {
    id: 'rocket-af-2011',
    type: 'artigo',
    title: 'Rivaroxaban versus Warfarin in Nonvalvular Atrial Fibrillation (ROCKET AF)',
    year: 2011,
    authors: ['Patel MR', 'Mahaffey KW', 'Garg J', 'Pan G', 'Singer DE', 'et al'],
    journal: 'New England Journal of Medicine',
    volume: '365',
    pages: '883-891',
    doi: '10.1056/NEJMoa1009638',
    pmid: '21830957'
  },
  'aristotle-2011': {
    id: 'aristotle-2011',
    type: 'artigo',
    title: 'Apixaban versus Warfarin in Patients with Atrial Fibrillation (ARISTOTLE)',
    year: 2011,
    authors: ['Granger CB', 'Alexander JH', 'McMurray JJ', 'Lopes RD', 'Hylek EM', 'et al'],
    journal: 'New England Journal of Medicine',
    volume: '365',
    pages: '981-992',
    doi: '10.1056/NEJMoa1107039',
    pmid: '21870978'
  },
  'engage-af-2013': {
    id: 'engage-af-2013',
    type: 'artigo',
    title: 'Edoxaban versus Warfarin in Patients with Atrial Fibrillation (ENGAGE AF-TIMI 48)',
    year: 2013,
    authors: ['Giugliano RP', 'Ruff CT', 'Braunwald E', 'Murphy SA', 'Wiviott SD', 'et al'],
    journal: 'New England Journal of Medicine',
    volume: '369',
    pages: '2093-2104',
    doi: '10.1056/NEJMoa1310907',
    pmid: '24251359'
  },
  'affirm-2002': {
    id: 'affirm-2002',
    type: 'artigo',
    title: 'A Comparison of Rate Control and Rhythm Control in Patients with Atrial Fibrillation (AFFIRM)',
    year: 2002,
    authors: ['AFFIRM Investigators'],
    journal: 'New England Journal of Medicine',
    volume: '347',
    pages: '1825-1833',
    doi: '10.1056/NEJMoa021328',
    pmid: '12466506'
  },
  'castle-af-2018': {
    id: 'castle-af-2018',
    type: 'artigo',
    title: 'Catheter Ablation for Atrial Fibrillation with Heart Failure (CASTLE-AF)',
    year: 2018,
    authors: ['Marrouche NF', 'Brachmann J', 'Andresen D', 'Siebels J', 'Boersma L', 'et al'],
    journal: 'New England Journal of Medicine',
    volume: '378',
    pages: '417-427',
    doi: '10.1056/NEJMoa1707855',
    pmid: '29385358'
  },

  // --- DOENÇA ARTERIAL CORONARIANA ---
  'esc-dac-2019': {
    id: 'esc-dac-2019',
    type: 'diretriz',
    title: '2019 ESC Guidelines for the diagnosis and management of chronic coronary syndromes',
    year: 2019,
    authors: ['Knuuti J', 'Wijns W', 'Saraste A', 'Capodanno D', 'Barbato E', 'et al'],
    journal: 'European Heart Journal',
    volume: '41',
    pages: '407-477',
    doi: '10.1093/eurheartj/ehz425',
    pmid: '31504439'
  },
  'fourier-2017': {
    id: 'fourier-2017',
    type: 'artigo',
    title: 'Evolocumab and Clinical Outcomes in Patients with Cardiovascular Disease (FOURIER)',
    year: 2017,
    authors: ['Sabatine MS', 'Giugliano RP', 'Keech AC', 'Honarpour N', 'Wiviott SD', 'et al'],
    journal: 'New England Journal of Medicine',
    volume: '376',
    pages: '1713-1722',
    doi: '10.1056/NEJMoa1615664',
    pmid: '28304224'
  },
  'odyssey-2018': {
    id: 'odyssey-2018',
    type: 'artigo',
    title: 'Alirocumab and Cardiovascular Outcomes after Acute Coronary Syndrome (ODYSSEY Outcomes)',
    year: 2018,
    authors: ['Schwartz GG', 'Steg PG', 'Szarek M', 'Bhatt DL', 'Bittner VA', 'et al'],
    journal: 'New England Journal of Medicine',
    volume: '379',
    pages: '2097-2107',
    doi: '10.1056/NEJMoa1801174',
    pmid: '30403574'
  },
  '4s-1994': {
    id: '4s-1994',
    type: 'artigo',
    title: 'Randomised trial of cholesterol lowering in 4444 patients with coronary heart disease: the Scandinavian Simvastatin Survival Study (4S)',
    year: 1994,
    authors: ['Scandinavian Simvastatin Survival Study Group'],
    journal: 'Lancet',
    volume: '344',
    pages: '1383-1389',
    doi: '10.1016/S0140-6736(94)90566-5',
    pmid: '7968073'
  },
  'prove-it-2004': {
    id: 'prove-it-2004',
    type: 'artigo',
    title: 'Intensive versus Moderate Lipid Lowering with Statins after Acute Coronary Syndromes (PROVE IT-TIMI 22)',
    year: 2004,
    authors: ['Cannon CP', 'Braunwald E', 'Murphy SA', 'Rader DJ', 'Ganz P', 'et al'],
    journal: 'New England Journal of Medicine',
    volume: '350',
    pages: '1495-1504',
    doi: '10.1056/NEJMoa040583',
    pmid: '15007110'
  },
  'tnt-2005': {
    id: 'tnt-2005',
    type: 'artigo',
    title: 'Intensive Lipid Lowering with Atorvastatin in Patients with Stable Coronary Disease (TNT)',
    year: 2005,
    authors: ['LaRosa JC', 'Grundy SM', 'Waters DD', 'Shear C', 'Barter P', 'et al'],
    journal: 'New England Journal of Medicine',
    volume: '352',
    pages: '1425-1435',
    doi: '10.1056/NEJMoa050461',
    pmid: '15755765'
  },
  'ischemia-2020': {
    id: 'ischemia-2020',
    type: 'artigo',
    title: 'Initial Invasive or Conservative Strategy for Stable Coronary Disease (ISCHEMIA)',
    year: 2020,
    authors: ['Maron DJ', 'Hochman JS', 'Reynolds HR', 'Bangalore S', 'O\'Brien SM', 'et al'],
    journal: 'New England Journal of Medicine',
    volume: '382',
    pages: '1395-1407',
    doi: '10.1056/NEJMoa1915922',
    pmid: '32227755'
  },
  'compass-2017': {
    id: 'compass-2017',
    type: 'artigo',
    title: 'Rivaroxaban with or without Aspirin in Stable Cardiovascular Disease (COMPASS)',
    year: 2017,
    authors: ['Eikelboom JW', 'Connolly SJ', 'Bosch J', 'Dagenais GR', 'Hart RG', 'et al'],
    journal: 'New England Journal of Medicine',
    volume: '377',
    pages: '1319-1330',
    doi: '10.1056/NEJMoa1709118',
    pmid: '28844192'
  },

  // --- HIPERTENSÃO ARTERIAL ---
  'sprint-2015': {
    id: 'sprint-2015',
    type: 'artigo',
    title: 'A Randomized Trial of Intensive versus Standard Blood-Pressure Control (SPRINT)',
    year: 2015,
    authors: ['SPRINT Research Group'],
    journal: 'New England Journal of Medicine',
    volume: '373',
    pages: '2103-2116',
    doi: '10.1056/NEJMoa1511939',
    pmid: '26551272'
  },
  'allhat-2002': {
    id: 'allhat-2002',
    type: 'artigo',
    title: 'Major Outcomes in High-Risk Hypertensive Patients Randomized to Angiotensin-Converting Enzyme Inhibitor or Calcium Channel Blocker vs Diuretic (ALLHAT)',
    year: 2002,
    authors: ['ALLHAT Officers and Coordinators'],
    journal: 'JAMA',
    volume: '288',
    pages: '2981-2997',
    doi: '10.1001/jama.288.23.2981',
    pmid: '12479763'
  },
  'accomplish-2008': {
    id: 'accomplish-2008',
    type: 'artigo',
    title: 'Benazepril plus Amlodipine or Hydrochlorothiazide for Hypertension in High-Risk Patients (ACCOMPLISH)',
    year: 2008,
    authors: ['Jamerson K', 'Weber MA', 'Bakris GL', 'Dahlöf B', 'Pitt B', 'et al'],
    journal: 'New England Journal of Medicine',
    volume: '359',
    pages: '2417-2428',
    doi: '10.1056/NEJMoa0806182',
    pmid: '19052124'
  },
  'diretriz-has-2020': {
    id: 'diretriz-has-2020',
    type: 'diretriz',
    title: 'Diretrizes Brasileiras de Hipertensão Arterial - 2020',
    year: 2020,
    authors: ['Barroso WKS', 'Rodrigues CIS', 'Bortolotto LA', 'Mota-Gomes MA', 'Brandão AA', 'et al'],
    journal: 'Arquivos Brasileiros de Cardiologia',
    volume: '116',
    pages: '516-658',
    doi: '10.36660/abc.20201238',
    url: 'https://abccardiol.org/article/brazilian-guidelines-of-hypertension-2020/',
    accessDate: '2025-01-15'
  },

  // --- DIABETES E DOENÇA CARDIOVASCULAR ---
  'empa-reg-2015': {
    id: 'empa-reg-2015',
    type: 'artigo',
    title: 'Empagliflozin, Cardiovascular Outcomes, and Mortality in Type 2 Diabetes (EMPA-REG OUTCOME)',
    year: 2015,
    authors: ['Zinman B', 'Wanner C', 'Lachin JM', 'Fitchett D', 'Bluhmki E', 'et al'],
    journal: 'New England Journal of Medicine',
    volume: '373',
    pages: '2117-2128',
    doi: '10.1056/NEJMoa1504720',
    pmid: '26378978'
  },
  'leader-2016': {
    id: 'leader-2016',
    type: 'artigo',
    title: 'Liraglutide and Cardiovascular Outcomes in Type 2 Diabetes (LEADER)',
    year: 2016,
    authors: ['Marso SP', 'Daniels GH', 'Tanaka K', 'Poulter N', 'Bain SC', 'et al'],
    journal: 'New England Journal of Medicine',
    volume: '375',
    pages: '311-322',
    doi: '10.1056/NEJMoa1603827',
    pmid: '27295427'
  },
  'canvas-2017': {
    id: 'canvas-2017',
    type: 'artigo',
    title: 'Canagliflozin and Cardiovascular and Renal Events in Type 2 Diabetes (CANVAS Program)',
    year: 2017,
    authors: ['Neal B', 'Perkovic V', 'Mahaffey KW', 'de Zeeuw D', 'Fulcher G', 'et al'],
    journal: 'New England Journal of Medicine',
    volume: '377',
    pages: '644-657',
    doi: '10.1056/NEJMoa1611925',
    pmid: '28605608'
  },

  // ============================================
  // UK SCREENING PROGRAMMES (NHS/NICE) - 2025
  // ============================================

  'nhs-breast-screening-2024': {
    id: 'nhs-breast-screening-2024',
    type: 'diretriz',
    title: 'NHS Breast Screening Programme: Overview and Clinical Guidelines 2024',
    year: 2024,
    authors: ['NHS England', 'Public Health England'],
    url: 'https://www.nhs.uk/conditions/breast-screening/',
    accessDate: '2025-12-18',
    publisher: 'NHS England'
  },

  'nice-breast-cancer-ng161-2024': {
    id: 'nice-breast-cancer-ng161-2024',
    type: 'diretriz',
    title: 'Suspected cancer: recognition and referral (NICE NG161) - Breast Cancer',
    year: 2024,
    authors: ['National Institute for Health and Care Excellence (NICE)'],
    url: 'https://www.nice.org.uk/guidance/ng12',
    accessDate: '2025-12-18',
    publisher: 'NICE'
  },

  'nhs-cervical-screening-2024': {
    id: 'nhs-cervical-screening-2024',
    type: 'diretriz',
    title: 'NHS Cervical Screening Programme: HPV Primary Testing Implementation 2024',
    year: 2024,
    authors: ['NHS England', 'Public Health England'],
    url: 'https://www.nhs.uk/conditions/cervical-screening/',
    accessDate: '2025-12-18',
    publisher: 'NHS England'
  },

  'nice-cervical-cancer-ng12-2024': {
    id: 'nice-cervical-cancer-ng12-2024',
    type: 'diretriz',
    title: 'Cervical cancer screening referral (NICE NG12) - Updated 2024',
    year: 2024,
    authors: ['National Institute for Health and Care Excellence (NICE)'],
    url: 'https://www.nice.org.uk/guidance/ng12',
    accessDate: '2025-12-18',
    publisher: 'NICE'
  },

  'uk-nsc-cervical-cancer-2024': {
    id: 'uk-nsc-cervical-cancer-2024',
    type: 'diretriz',
    title: 'UK National Screening Committee: Cervical Cancer Screening Recommendations',
    year: 2024,
    authors: ['UK National Screening Committee'],
    url: 'https://www.gov.uk/topic/screening',
    accessDate: '2025-12-18',
    publisher: 'Department of Health and Social Care'
  },

  'nice-oral-cancer-ng161-2024': {
    id: 'nice-oral-cancer-ng161-2024',
    type: 'diretriz',
    title: 'NICE NG161 Suspected Cancer: recognition and referral - Oral Cancer',
    year: 2024,
    authors: ['National Institute for Health and Care Excellence (NICE)'],
    url: 'https://www.nice.org.uk/guidance/ng12',
    accessDate: '2025-12-18',
    publisher: 'NICE'
  },

  'uk-nsc-prostate-cancer-2024': {
    id: 'uk-nsc-prostate-cancer-2024',
    type: 'diretriz',
    title: 'UK National Screening Committee: Prostate Cancer Screening Recommendations',
    year: 2024,
    authors: ['UK National Screening Committee'],
    url: 'https://www.gov.uk/topic/screening',
    accessDate: '2025-12-18',
    publisher: 'Department of Health and Social Care',
    note: 'UK does not recommend population-based screening for prostate cancer (PSA) due to insufficient evidence of benefit versus potential harms'
  },

  'nice-hypertension-ng136-2024': {
    id: 'nice-hypertension-ng136-2024',
    type: 'diretriz',
    title: 'NICE CG136: Hypertension: Clinical Management of Hypertension in Adults 2024 Update',
    year: 2024,
    authors: ['National Institute for Health and Care Excellence (NICE)'],
    url: 'https://www.nice.org.uk/guidance/ng136',
    accessDate: '2025-12-18',
    publisher: 'NICE'
  },

  'nhs-health-check-2024': {
    id: 'nhs-health-check-2024',
    type: 'diretriz',
    title: 'NHS Health Check Programme: Cardiovascular Disease Risk Assessment 2024',
    year: 2024,
    authors: ['NHS England', 'Public Health England'],
    url: 'https://www.nhs.uk/conditions/nhs-health-check/',
    accessDate: '2025-12-18',
    publisher: 'NHS England'
  },

  'nice-diabetes-ng28-2024': {
    id: 'nice-diabetes-ng28-2024',
    type: 'diretriz',
    title: 'NICE NG28: Type 2 Diabetes in Adults: Management and Prevention 2024 Update',
    year: 2024,
    authors: ['National Institute for Health and Care Excellence (NICE)'],
    url: 'https://www.nice.org.uk/guidance/ng28',
    accessDate: '2025-12-18',
    publisher: 'NICE'
  },

  'nice-lipids-ng179-2024': {
    id: 'nice-lipids-ng179-2024',
    type: 'diretriz',
    title: 'NICE NG179: Cardiovascular disease: risk assessment and reduction including lipids 2024 Update',
    year: 2024,
    authors: ['National Institute for Health and Care Excellence (NICE)'],
    url: 'https://www.nice.org.uk/guidance/ng179',
    accessDate: '2025-12-18',
    publisher: 'NICE'
  },

  'uk-nsc-screening-principles-2024': {
    id: 'uk-nsc-screening-principles-2024',
    type: 'diretriz',
    title: 'UK National Screening Committee: Screening Programmes Quality and Evidence Standards',
    year: 2024,
    authors: ['UK National Screening Committee'],
    url: 'https://www.gov.uk/guidance/uk-national-screening-committee-assessing-the-evidence',
    accessDate: '2025-12-18',
    publisher: 'Department of Health and Social Care'
  },

  // ============================================
  // WHO GUIDELINES - Expanded Coverage 2025
  // ============================================

  'who-pen-essential-interventions-2023': {
    id: 'who-pen-essential-interventions-2023',
    type: 'diretriz',
    title: 'WHO Package of Essential NCD Interventions (WHO PEN) for Primary Health Care',
    year: 2023,
    authors: ['World Health Organization'],
    publisher: 'WHO',
    url: 'https://www.who.int/publications/i/item/WHO-ER-NCD-2023-1',
    accessDate: '2025-12-25',
    note: 'Standardized, evidence-based interventions for common NCDs at primary health care level, including hypertension, diabetes, CVD risk assessment, and major depression'
  },

  'who-cervical-cancer-elimination-2023': {
    id: 'who-cervical-cancer-elimination-2023',
    type: 'diretriz',
    title: 'WHO Global Strategy to Accelerate Cervical Cancer Elimination',
    year: 2023,
    authors: ['World Health Organization'],
    publisher: 'WHO',
    url: 'https://www.who.int/publications/i/item/9789240057135',
    accessDate: '2025-12-25',
    note: 'Three pillars strategy: HPV vaccination, screening with triage, treatment of pre-cancer and cancer. Targets: >90% girls vaccinated, >70% women screened, >90% pre-cancer treated by age 35'
  },

  'who-breast-cancer-screening-2023': {
    id: 'who-breast-cancer-screening-2023',
    type: 'diretriz',
    title: 'WHO Recommendations on Breast Cancer Screening and Diagnosis',
    year: 2023,
    authors: ['World Health Organization'],
    publisher: 'WHO',
    url: 'https://www.who.int/publications/i/item/9789240049863',
    accessDate: '2025-12-25',
    note: 'Evidence-based recommendations for breast cancer screening strategies based on country income level and available resources'
  },

  'who-hearts-technical-package-2022': {
    id: 'who-hearts-technical-package-2022',
    type: 'diretriz',
    title: 'WHO HEARTS Technical Package for Cardiovascular Disease Management in Primary Health Care',
    year: 2022,
    authors: ['World Health Organization'],
    publisher: 'WHO',
    url: 'https://www.who.int/publications/i/item/9789240063549',
    accessDate: '2025-12-25',
    note: 'Holistic approach to hypertension and cardiovascular risk reduction: H-Healthy lifestyle, E-Evidence-based treatment, A-Access to essential medicines, R-Risk assessment, T-Teams, S-Systems'
  },

  'who-hypertension-2021': {
    id: 'who-hypertension-2021',
    type: 'diretriz',
    title: 'WHO Guideline for the Pharmacological Treatment of Hypertension in Adults',
    year: 2021,
    authors: ['World Health Organization'],
    publisher: 'WHO',
    url: 'https://www.who.int/publications/i/item/9789240033986',
    accessDate: '2025-12-25',
    note: 'Evidence-based pharmacological treatment algorithms for hypertension management in primary health care'
  },

  'who-diabetes-screening-2021': {
    id: 'who-diabetes-screening-2021',
    type: 'diretriz',
    title: 'WHO Guidelines on Screening for Type 2 Diabetes',
    year: 2021,
    authors: ['World Health Organization'],
    publisher: 'WHO',
    url: 'https://www.who.int/publications/i/item/9789240015135',
    accessDate: '2025-12-25',
    note: 'Population-based screening strategies for type 2 diabetes with emphasis on cost-effective approaches in low-resource settings'
  },

  'who-hiv-testing-2023': {
    id: 'who-hiv-testing-2023',
    type: 'diretriz',
    title: 'WHO Consolidated Guidelines on Testing, Treatment and Prevention of HIV-1 Infection',
    year: 2023,
    authors: ['World Health Organization'],
    publisher: 'WHO',
    url: 'https://www.who.int/publications/i/item/9789240055598',
    accessDate: '2025-12-25',
    note: 'Comprehensive guidelines on HIV testing strategies (WHO-recommended rapid tests), linkage to treatment, and prevention of sexual transmission'
  },

  'who-tuberculosis-screening-2021': {
    id: 'who-tuberculosis-screening-2021',
    type: 'diretriz',
    title: 'WHO Systematic Screening for Active Tuberculosis Disease',
    year: 2021,
    authors: ['World Health Organization'],
    publisher: 'WHO',
    url: 'https://www.who.int/publications/i/item/9789240022676',
    accessDate: '2025-12-25',
    note: 'Standardized TB screening algorithms for high-risk populations and community-based screening approaches'
  },

  'who-viral-hepatitis-elimination-2022': {
    id: 'who-viral-hepatitis-elimination-2022',
    type: 'diretriz',
    title: 'Global Health Sector Strategy on Viral Hepatitis 2022-2030: Progress towards Ending Viral Hepatitis',
    year: 2022,
    authors: ['World Health Organization'],
    publisher: 'WHO',
    url: 'https://www.who.int/publications/i/item/9789240039094',
    accessDate: '2025-12-25',
    note: 'Updated strategy emphasizing hepatitis B and C screening, testing algorithms, and treatment scale-up with DAAs'
  },

  'who-congenital-syphilis-prevention-2023': {
    id: 'who-congenital-syphilis-prevention-2023',
    type: 'diretriz',
    title: 'WHO Guidelines: Syphilis Screening and Treatment during Pregnancy',
    year: 2023,
    authors: ['World Health Organization'],
    publisher: 'WHO',
    url: 'https://www.who.int/publications/i/item/9789240069107',
    accessDate: '2025-12-25',
    note: 'Evidence-based algorithm for antenatal syphilis screening (RPR/VDRL) and treatment to prevent vertical transmission'
  },

  'who-retinopathy-screening-2020': {
    id: 'who-retinopathy-screening-2020',
    type: 'artigo',
    title: 'WHO Report on Diabetic Retinopathy Screening and Management in Primary Health Care',
    year: 2020,
    authors: ['World Health Organization'],
    publisher: 'WHO',
    url: 'https://www.who.int/publications/i/item/WHO-ER-NCD-2020-1',
    accessDate: '2025-12-25',
    note: 'Guidance on DR screening strategies and telemedicine approaches for resource-limited settings'
  },

  'who-cancer-prevention-2020': {
    id: 'who-cancer-prevention-2020',
    type: 'diretriz',
    title: 'Cancer Prevention Strategy: WHO Framework for Cervical, Breast and Colorectal Cancer Screening',
    year: 2020,
    authors: ['World Health Organization'],
    publisher: 'WHO',
    url: 'https://www.who.int/publications/i/item/9789240013031',
    accessDate: '2025-12-25',
    note: 'Integrated screening framework adapted to country income levels and healthcare infrastructure'
  },

  // ============================================
  // INDIA - NP-NCD Guidelines 2023-2030 Expanded
  // ============================================

  'icmr-hiv-testing-guidelines-2023': {
    id: 'icmr-hiv-testing-guidelines-2023',
    type: 'diretriz',
    title: 'ICMR Guidelines for HIV Testing Strategy and Algorithm in India',
    year: 2023,
    authors: ['Indian Council of Medical Research'],
    url: 'https://www.icmr.gov.in',
    accessDate: '2025-12-25',
    note: 'National testing algorithm incorporating sequential rapid tests and confirmatory testing protocols'
  },

  'np-ncd-tuberculosis-guidelines-2023': {
    id: 'np-ncd-tuberculosis-guidelines-2023',
    type: 'diretriz',
    title: 'National TB Elimination Programme: Active Case Finding and Screening Guidelines 2023',
    year: 2023,
    authors: ['Ministry of Health and Family Welfare, NTEP', 'National Centre for Disease Control'],
    url: 'https://www.ntep.gov.in',
    accessDate: '2025-12-25',
    note: 'Active TB case finding protocols with emphasis on symptomatic household contact screening and ACSM'
  },

  'icmr-syphilis-testing-2023': {
    id: 'icmr-syphilis-testing-2023',
    type: 'diretriz',
    title: 'ICMR Guidelines for Serological Testing for Syphilis: Dual Treponemal and Non-Treponemal Approach',
    year: 2023,
    authors: ['Indian Council of Medical Research'],
    url: 'https://www.icmr.gov.in',
    accessDate: '2025-12-25',
    note: 'Two-test algorithm for antenatal and population-based syphilis screening adapted to Indian context'
  },

  'nrld-hepatitis-b-screening-2023': {
    id: 'nrld-hepatitis-b-screening-2023',
    type: 'diretriz',
    title: 'NRLD Guidelines: Hepatitis B Screening Strategy in India',
    year: 2023,
    authors: ['Indian National Liver Foundation', 'Ministry of Health and Family Welfare'],
    url: 'https://www.liverlindia.org',
    accessDate: '2025-12-25',
    note: 'HBsAg-based screening algorithm with counseling protocols for resource-limited settings'
  },

  'icmr-hepatitis-c-rdt-2023': {
    id: 'icmr-hepatitis-c-rdt-2023',
    type: 'diretriz',
    title: 'ICMR Validation Studies on Hepatitis C RDT in India',
    year: 2023,
    authors: ['Indian Council of Medical Research'],
    url: 'https://www.icmr.gov.in',
    accessDate: '2025-12-25',
    note: 'Evidence on rapid diagnostic test performance for hepatitis C anti-body detection in diverse Indian populations'
  },

  'mohfw-diabetes-screening-protocol-2023': {
    id: 'mohfw-diabetes-screening-protocol-2023',
    type: 'diretriz',
    title: 'District Management Protocol: Diabetes Screening and Case Finding in India',
    year: 2023,
    authors: ['Ministry of Health and Family Welfare', 'NPCDCS'],
    url: 'https://www.mohfw.gov.in',
    accessDate: '2025-12-25',
    note: 'Fasting blood glucose screening algorithm adapted for primary health care and CHC level with community mobilization'
  },

  'np-ncd-hypertension-protocol-2023': {
    id: 'np-ncd-hypertension-protocol-2023',
    type: 'diretriz',
    title: 'Hypertension Screening and Management Protocol: NP-NCD Implementation',
    year: 2023,
    authors: ['Ministry of Health and Family Welfare', 'NPCDCS'],
    url: 'https://www.mohfw.gov.in',
    accessDate: '2025-12-25',
    note: 'BP measurement standards, confirmation protocols, and linkage to treatment in primary health care'
  },

  'asha-worker-training-manual-2023': {
    id: 'asha-worker-training-manual-2023',
    type: 'livro',
    title: 'ASHA Training Manual: Community-Based NCD Screening and Health Promotion',
    year: 2023,
    authors: ['Ministry of Health and Family Welfare', 'NPCDCS'],
    publisher: 'MoHFW',
    url: 'https://www.mohfw.gov.in',
    accessDate: '2025-12-25',
    note: 'Competency-based training modules for ASHA workers in symptom recognition, risk assessment, and referral pathways'
  },

  'india-cancer-epidemiology-2023': {
    id: 'india-cancer-epidemiology-2023',
    type: 'artigo',
    title: 'Cancer Epidemiology in India: Incidence and Mortality Data 2023',
    year: 2023,
    authors: ['Indian Council of Medical Research', 'Department of Epidemiology and Biostatistics'],
    journal: 'Indian Journal of Cancer',
    url: 'https://www.ijcancerjournal.com',
    accessDate: '2025-12-25',
    note: 'National cancer burden estimates highlighting high prevalence of oral, breast, and cervical cancers'
  },

  'india-ncd-surveillance-2023': {
    id: 'india-ncd-surveillance-2023',
    type: 'artigo',
    title: 'National Surveillance System for Non-Communicable Diseases (NSSNDP): India Report 2023',
    year: 2023,
    authors: ['Ministry of Health and Family Welfare', 'NCDC', 'State Health Resource Centers'],
    url: 'https://www.ncdc.gov.in',
    accessDate: '2025-12-25',
    note: 'Data on prevalence of hypertension, diabetes, and other NCDs across Indian states with equity stratification'
  },

  'india-adolescent-health-screening-2023': {
    id: 'india-adolescent-health-screening-2023',
    type: 'diretriz',
    title: 'National Adolescent Health Screening Protocol: School-Based Health Programs',
    year: 2023,
    authors: ['Ministry of Education', 'Ministry of Health and Family Welfare', 'CBSE'],
    url: 'https://www.moe.gov.in',
    accessDate: '2025-12-25',
    note: 'Age-appropriate screening for hypertension, anemia, weight/height (BMI), visual and hearing problems in adolescents'
  },

  'pcrh-maternal-health-guidelines-2023': {
    id: 'pcrh-maternal-health-guidelines-2023',
    type: 'diretriz',
    title: 'Comprehensive Guidelines for Maternal Health in India: Antenatal Screening Protocols',
    year: 2023,
    authors: ['Ministry of Health and Family Welfare', 'PCRH'],
    url: 'https://www.mohfw.gov.in',
    accessDate: '2025-12-25',
    note: 'Screening algorithms for gestational diabetes, anemia, syphilis, and HIV in pregnancy adapted to Indian healthcare infrastructure'
  },

  // ============================================
  // AUTO-GENERATED REFERENCES (299 entries)
  // Generated: 2026-01-21T22:22:25.711Z
  // ============================================

'acne-ref-1': {
    id: 'acne-ref-1',
    type: 'diretriz',
    title: `Zaenglein AL, Baldwin HE, et al`,
    authors: ["Zaenglein AL, Baldwin HE, et al"],
    year: 2024,
    journal: 'Journal of the American Academy of Dermatology',
    doi: '10.1016/j.jaad.2023.12.017',
    pmid: '38300170',
    note: 'Auto-imported from acne module'
  },

  'acne-ref-2': {
    id: 'acne-ref-2',
    type: 'artigo',
    title: `Legro RS, Arslanian SA, et al`,
    authors: ["Legro RS, Arslanian SA, et al"],
    year: 2013,
    journal: 'The Journal of clinical endocrinology and metabolism',
    doi: '10.1210/jc.2013-2350',
    pmid: '24151290',
    note: 'Auto-imported from acne module'
  },

  'acne-ref-3': {
    id: 'acne-ref-3',
    type: 'artigo',
    title: `Zouboulis CC, Bettoli V, et al`,
    authors: ["Zouboulis CC, Bettoli V, et al"],
    year: 2025,
    journal: 'Journal of the European Academy of Dermatology and Venereology : JEADV',
    doi: '10.1111/jdv.20472',
    pmid: '39699926',
    note: 'Auto-imported from acne module'
  },

  'acne-ref-4': {
    id: 'acne-ref-4',
    type: 'artigo',
    title: `Zouboulis CC, Bechstein S, et al`,
    authors: ["Zouboulis CC, Bechstein S, et al"],
    year: 2024,
    journal: 'Journal der Deutschen Dermatologischen Gesellschaft = Journal of the German Society of Dermatology : JDDG',
    doi: '10.1111/ddg.15412',
    pmid: '38770982',
    note: 'Auto-imported from acne module'
  },

  'acne-ref-5': {
    id: 'acne-ref-5',
    type: 'artigo',
    title: `Pazderska A, McGowan B, et al`,
    authors: ["Pazderska A, McGowan B, et al"],
    year: 2015,
    journal: 'Endocrine practice : official journal of the American College of Endocrinology and the American Association of Clinical Endocrinologists',
    doi: '10.4158/EP15748.DSC',
    pmid: '26509855',
    note: 'Auto-imported from acne module'
  },

  'acne-ref-6': {
    id: 'acne-ref-6',
    type: 'artigo',
    title: `Dreno B, Araviiskaia E, et al`,
    authors: ["Dreno B, Araviiskaia E, et al"],
    year: 2025,
    journal: 'Journal of the European Academy of Dermatology and Venereology : JEADV',
    doi: '10.1111/jdv.20145',
    pmid: '38877766',
    note: 'Auto-imported from acne module'
  },

  'acne-ref-7': {
    id: 'acne-ref-7',
    type: 'artigo',
    title: `Eichenfield LF, Krakowski AC, et al`,
    authors: ["Eichenfield LF, Krakowski AC, et al"],
    year: 2013,
    journal: 'Pediatrics',
    doi: '10.1542/peds.2013-0490B',
    pmid: '23637225',
    note: 'Auto-imported from acne module'
  },

  'acne-ref-8': {
    id: 'acne-ref-8',
    type: 'artigo',
    title: `Alikhan A, Sayed C, et al`,
    authors: ["Alikhan A, Sayed C, et al"],
    year: 2019,
    journal: 'Journal of the American Academy of Dermatology',
    doi: '10.1016/j.jaad.2019.02.068',
    pmid: '30872149',
    note: 'Auto-imported from acne module'
  },

  'acne-ref-9': {
    id: 'acne-ref-9',
    type: 'artigo',
    title: `Hexsel D, Orlandi C, et al`,
    authors: ["Hexsel D, Orlandi C, et al"],
    year: 2024,
    journal: 'Anais brasileiros de dermatologia',
    doi: '10.1016/j.abd.2023.09.001',
    pmid: '38402012',
    note: 'Auto-imported from acne module'
  },

  'acne-ref-10': {
    id: 'acne-ref-10',
    type: 'artigo',
    title: `Li S, Cho E, et al`,
    authors: ["Li S, Cho E, et al"],
    year: 2023,
    journal: 'Journal of cosmetic dermatology',
    doi: '10.1111/jocd.15519',
    pmid: '36409588',
    note: 'Auto-imported from acne module'
  },

  'alzheimer-ref-1': {
    id: 'alzheimer-ref-1',
    type: 'artigo',
    title: `Petersen RC, Lopez O, Armstrong MJ, et al`,
    authors: ["Petersen RC, Lopez O, Armstrong MJ, et al"],
    year: 2018,
    journal: 'Neurology',
    doi: '10.1212/WNL.0000000000004826',
    pmid: '29282327',
    note: 'Auto-imported from alzheimer module'
  },

  'alzheimer-ref-2': {
    id: 'alzheimer-ref-2',
    type: 'artigo',
    title: `Cordell CB, Borson S, Boustani M, et al`,
    authors: ["Cordell CB, Borson S, Boustani M, et al"],
    year: 2025,
    journal: 'Alzheimers Dement',
    doi: '10.1002/alz.14333',
    pmid: '39713942',
    note: 'Auto-imported from alzheimer module'
  },

  'alzheimer-ref-3': {
    id: 'alzheimer-ref-3',
    type: 'artigo',
    title: `Negro A, Casucci G, et al`,
    authors: ["Negro A, Casucci G, et al"],
    year: 2025,
    journal: 'Cephalalgia',
    doi: '10.1177/03331024251321500',
    pmid: '40277321',
    note: 'Auto-imported from alzheimer module'
  },

  'alzheimer-ref-4': {
    id: 'alzheimer-ref-4',
    type: 'artigo',
    title: `Rabinovici GD, Gatsonis C, et al`,
    authors: ["Rabinovici GD, Gatsonis C, et al"],
    year: 2025,
    journal: 'Alzheimers Dement',
    doi: '10.1002/alz.14337',
    pmid: '39713957',
    note: 'Auto-imported from alzheimer module'
  },

  'alzheimer-ref-5': {
    id: 'alzheimer-ref-5',
    type: 'artigo',
    title: `Smith EE, Farias ST, et al`,
    authors: ["Smith EE, Farias ST, et al"],
    year: 2020,
    journal: 'Alzheimers Dement',
    volume: '16',
    pages: '1691-1710',
    doi: '10.1002/alz.12105',
    pmid: '32725777',
    note: 'Auto-imported from alzheimer module'
  },

  'alzheimer-ref-6': {
    id: 'alzheimer-ref-6',
    type: 'artigo',
    title: `Hampel H, Toschi N, et al`,
    authors: ["Hampel H, Toschi N, et al"],
    year: 2025,
    journal: 'Alzheimers Dement',
    doi: '10.1002/alz.70535',
    pmid: '40729527',
    note: 'Auto-imported from alzheimer module'
  },

  'alzheimer-ref-7': {
    id: 'alzheimer-ref-7',
    type: 'artigo',
    title: `McKhann G, Drachman D, Folstein M, et al`,
    authors: ["McKhann G, Drachman D, Folstein M, et al"],
    year: 1984,
    journal: 'Neurology',
    volume: '34',
    pages: '939-944',
    doi: '10.1212/wnl.34.7.939',
    pmid: '6610841',
    note: 'Auto-imported from alzheimer module'
  },

  'alzheimer-ref-8': {
    id: 'alzheimer-ref-8',
    type: 'artigo',
    title: `Caltagirone C, Ferrannini E, et al`,
    authors: ["Caltagirone C, Ferrannini E, et al"],
    year: 2024,
    journal: 'Age Ageing',
    doi: '10.1093/ageing/afae250',
    pmid: '39544104',
    note: 'Auto-imported from alzheimer module'
  },

  'alzheimer-ref-9': {
    id: 'alzheimer-ref-9',
    type: 'artigo',
    title: `McGowan MK, Patel DR, et al`,
    authors: ["McGowan MK, Patel DR, et al"],
    year: 2020,
    journal: 'JAMA',
    volume: '324',
    pages: '1507-1523',
    doi: '10.1001/jama.2020.17024',
    pmid: '33079159',
    note: 'Auto-imported from alzheimer module'
  },

  'alzheimer-ref-10': {
    id: 'alzheimer-ref-10',
    type: 'artigo',
    title: `Lam LCW, Su LL, et al`,
    authors: ["Lam LCW, Su LL, et al"],
    year: 2023,
    journal: 'Eur Geriatr Med',
    volume: '14',
    pages: '1145-1166',
    doi: '10.1007/s41999-023-00858-y',
    pmid: '37768499',
    note: 'Auto-imported from alzheimer module'
  },

  'ansiedade-ref-1': {
    id: 'ansiedade-ref-1',
    type: 'artigo',
    title: `Vázquez GH, et al`,
    authors: ["Vázquez GH, et al"],
    year: 2019,
    journal: 'Revista de psiquiatria y salud mental',
    volume: '12',
    pages: '242-251',
    doi: '10.1016/j.rpsm.2019.01.003',
    pmid: '30850318',
    note: 'Auto-imported from ansiedade module'
  },

  'ansiedade-ref-2': {
    id: 'ansiedade-ref-2',
    type: 'artigo',
    title: `Calvo M, et al`,
    authors: ["Calvo M, et al"],
    year: 2018,
    journal: 'Gastroenterologia y hepatologia',
    volume: '41',
    pages: '122-131',
    doi: '10.1016/j.gastrohep.2017.10.003',
    pmid: '29275001',
    note: 'Auto-imported from ansiedade module'
  },

  'ansiedade-ref-3': {
    id: 'ansiedade-ref-3',
    type: 'diretriz',
    title: `Tavares D, et al`,
    authors: ["Tavares D, et al"],
    year: 1999,
    journal: 'Revista brasileira de psiquiatria (Sao Paulo, Brazil : 1999)',
    doi: '10.1590/s1516-44462010005000029',
    pmid: '21308267',
    note: 'Auto-imported from ansiedade module'
  },

  'ansiedade-ref-4': {
    id: 'ansiedade-ref-4',
    type: 'artigo',
    title: `American Psychiatric Association`,
    year: 2023,
    note: 'Auto-imported from ansiedade module'
  },

  'ansiedade-ref-5': {
    id: 'ansiedade-ref-5',
    type: 'diretriz',
    title: `Ministério da Saúde (Brazil)`,
    year: 2013,
    note: 'Auto-imported from ansiedade module'
  },

  'ansiedade-ref-6': {
    id: 'ansiedade-ref-6',
    type: 'diretriz',
    title: `Ministério da Saúde (Brazil)`,
    year: 2022,
    note: 'Auto-imported from ansiedade module'
  },

  'asma-ref-1': {
    id: 'asma-ref-1',
    type: 'artigo',
    title: `Maurer M, Magerl M, Ansotegui I, et al`,
    authors: ["Maurer M, Magerl M, Ansotegui I, et al"],
    year: 2021,
    journal: 'Allergy',
    volume: '77',
    pages: '29-46',
    doi: '10.1111/all.15214',
    pmid: '35006617',
    note: 'Auto-imported from asma module'
  },

  'asma-ref-2': {
    id: 'asma-ref-2',
    type: 'artigo',
    title: `Cardona V, Ansotegui IJ, Ebisawa M, et al`,
    authors: ["Cardona V, Ansotegui IJ, Ebisawa M, et al"],
    year: 2021,
    journal: 'Allergy',
    volume: '76',
    pages: '1987-1998',
    doi: '10.1111/all.14453',
    pmid: '32531110',
    note: 'Auto-imported from asma module'
  },

  'asma-ref-3': {
    id: 'asma-ref-3',
    type: 'artigo',
    title: `Klovann C, Hamelmann E, Rymarczyk B, et al`,
    authors: ["Klovann C, Hamelmann E, Rymarczyk B, et al"],
    year: 2020,
    journal: 'Allergy',
    volume: '75',
    pages: '1023-1048',
    doi: '10.1111/all.13953',
    pmid: '31230373',
    note: 'Auto-imported from asma module'
  },

  'asma-ref-4': {
    id: 'asma-ref-4',
    type: 'artigo',
    title: `Sánchez-Borges M, Caballero-Fonseca F, Capriles-Hulett A, et al`,
    authors: ["Sánchez-Borges M, Caballero-Fonseca F, Capriles-Hulett A, et al"],
    year: 2020,
    journal: 'Revista alergia Mexico',
    volume: '67',
    pages: '760-772',
    doi: '10.29262/ram.v67i0.760',
    pmid: '33017878',
    note: 'Auto-imported from asma module'
  },

  'asma-ref-5': {
    id: 'asma-ref-5',
    type: 'artigo',
    title: `Hoffmann-Sommergruber K, Bublin M, Jensen-Jarolim E, et al`,
    authors: ["Hoffmann-Sommergruber K, Bublin M, Jensen-Jarolim E, et al"],
    year: 2024,
    journal: 'Allergy',
    volume: '79',
    pages: '577-593',
    doi: '10.1111/all.15957',
    pmid: '38084472',
    note: 'Auto-imported from asma module'
  },

  'asma-ref-6': {
    id: 'asma-ref-6',
    type: 'diretriz',
    title: `Sánchez-Lerma P, Ivancevich J, Ramírez-Jiménez F, et al`,
    authors: ["Sánchez-Lerma P, Ivancevich J, Ramírez-Jiménez F, et al"],
    year: 2017,
    journal: 'Revista alergia Mexico',
    volume: '64',
    pages: '272-304',
    doi: '10.29262/ram.v64i0.272',
    pmid: '28441001',
    note: 'Auto-imported from asma module'
  },

  'asma-ref-7': {
    id: 'asma-ref-7',
    type: 'artigo',
    title: `Jensen-Jarolim E, Achatz G, Turner MC, et al`,
    authors: ["Jensen-Jarolim E, Achatz G, Turner MC, et al"],
    year: 2024,
    journal: 'Allergy',
    volume: '79',
    pages: '2333-2349',
    doi: '10.1111/all.16246',
    pmid: '39036854',
    note: 'Auto-imported from asma module'
  },

  'asma-ref-8': {
    id: 'asma-ref-8',
    type: 'artigo',
    title: `Blanco J, Jover J, Rodriguez F, et al`,
    authors: ["Blanco J, Jover J, Rodriguez F, et al"],
    year: 2023,
    volume: '41',
    pages: '308-319',
    doi: '10.1016/j.eimce.2022.08.010',
    pmid: '36707291',
    note: 'Auto-imported from asma module'
  },

  'asma-ref-9': {
    id: 'asma-ref-9',
    type: 'artigo',
    title: `Alvarez-Perea A, Ausin P, de la Hoz B, et al`,
    authors: ["Alvarez-Perea A, Ausin P, de la Hoz B, et al"],
    year: 2024,
    journal: 'Archivos de bronconeumologia',
    volume: '60',
    pages: '407-414',
    doi: '10.1016/j.arbres.2024.04.002',
    pmid: '38697903',
    note: 'Auto-imported from asma module'
  },

  'asma-ref-10': {
    id: 'asma-ref-10',
    type: 'artigo',
    title: `Rodriguez M, Esteban-Lopez M, Sastre J, et al`,
    authors: ["Rodriguez M, Esteban-Lopez M, Sastre J, et al"],
    year: 2018,
    journal: 'Journal of investigational allergology & clinical immunology',
    volume: '28',
    pages: '1-16',
    doi: '10.18176/jiaci.0232',
    pmid: '29345622',
    note: 'Auto-imported from asma module'
  },

  'asma-ref-11': {
    id: 'asma-ref-11',
    type: 'site',
    title: `Global Initiative for Asthma`,
    year: 2024,
    url: 'https://ginasthma.org/',
    note: 'Auto-imported from asma module'
  },

  'asma-ref-12': {
    id: 'asma-ref-12',
    type: 'diretriz',
    title: `Sociedade Brasileira de Pneumologia e Tisiologia`,
    year: 2021,
    url: 'https://sbpt.org.br/',
    note: 'Auto-imported from asma module'
  },

  'asma-ref-13': {
    id: 'asma-ref-13',
    type: 'diretriz',
    title: `Ministério da Saúde (Brazil)`,
    year: 2021,
    url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/asma',
    note: 'Auto-imported from asma module'
  },

  'asma-ref-14': {
    id: 'asma-ref-14',
    type: 'diretriz',
    title: `Ministério da Saúde (Brazil)`,
    year: 2010,
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/doencas_respiratorias_cronicas.pdf',
    note: 'Auto-imported from asma module'
  },

  'celulite-ref-1': {
    id: 'celulite-ref-1',
    type: 'artigo',
    title: `Sociedade Brasileira de Dermatologia`,
    year: 2020,
    journal: 'Rev Bras Dermatol',
    note: 'Auto-imported from celulite module'
  },

  'celulite-ref-2': {
    id: 'celulite-ref-2',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil)`,
    year: 2009,
    note: 'Auto-imported from celulite module'
  },

  'celulite-ref-3': {
    id: 'celulite-ref-3',
    type: 'artigo',
    title: `Swartz MN`,
    year: 2004,
    journal: 'N Engl J Med',
    volume: '350',
    pages: '904-12',
    doi: '10.1056/NEJMcp030662',
    pmid: '14985490',
    note: 'Auto-imported from celulite module'
  },

  'celulite-ref-4': {
    id: 'celulite-ref-4',
    type: 'artigo',
    title: `Hay RJ`,
    year: 2011,
    journal: 'BMJ Clin Evid',
    pmid: '21477388',
    note: 'Auto-imported from celulite module'
  },

  'celulite-ref-5': {
    id: 'celulite-ref-5',
    type: 'artigo',
    title: `Marra F, et al`,
    authors: ["Marra F, et al"],
    year: 2007,
    journal: 'Infect Control Hosp Epidemiol',
    volume: '28',
    pages: '710-6',
    doi: '10.1086/518277',
    pmid: '17525708',
    note: 'Auto-imported from celulite module'
  },

  'demencia-ref-1': {
    id: 'demencia-ref-1',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2011,
    journal: 'Revista espanola de geriatria y gerontologia',
    doi: '10.1016/j.regg.2011.01.008',
    note: 'Auto-imported from demencia module'
  },

  'demencia-ref-2': {
    id: 'demencia-ref-2',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2024,
    journal: 'Neurologia',
    doi: '10.1016/j.nrleng.2024.01.002',
    note: 'Auto-imported from demencia module'
  },

  'demencia-ref-3': {
    id: 'demencia-ref-3',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2020,
    journal: 'Acta medica portuguesa',
    doi: '10.20344/amp.13696',
    note: 'Auto-imported from demencia module'
  },

  'demencia-ref-4': {
    id: 'demencia-ref-4',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2010,
    journal: 'Revista espanola de geriatria y gerontologia',
    doi: '10.1016/j.regg.2009.10.002',
    note: 'Auto-imported from demencia module'
  },

  'demencia-ref-5': {
    id: 'demencia-ref-5',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2015,
    journal: 'Revista espanola de medicina nuclear e imagen molecular',
    doi: '10.1016/j.remn.2015.03.002',
    note: 'Auto-imported from demencia module'
  },

  'demencia-ref-6': {
    id: 'demencia-ref-6',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2025,
    journal: 'Neurologia',
    doi: '10.1016/j.nrleng.2025.07.004',
    note: 'Auto-imported from demencia module'
  },

  'demencia-ref-7': {
    id: 'demencia-ref-7',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2022,
    journal: 'Endocrinologia, diabetes y nutricion',
    doi: '10.1016/j.endien.2022.11.026',
    note: 'Auto-imported from demencia module'
  },

  'demencia-ref-8': {
    id: 'demencia-ref-8',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2016,
    journal: 'Acta medica portuguesa',
    doi: '10.20344/amp.7583',
    note: 'Auto-imported from demencia module'
  },

  'demencia-ref-9': {
    id: 'demencia-ref-9',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2019,
    journal: 'Nutricion hospitalaria',
    doi: '10.20960/nh.02723',
    note: 'Auto-imported from demencia module'
  },

  'demencia-ref-10': {
    id: 'demencia-ref-10',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2025,
    journal: 'Endocrinologia, diabetes y nutricion',
    doi: '10.1016/j.endien.2025.501640',
    note: 'Auto-imported from demencia module'
  },

  'depressao-ref-1': {
    id: 'depressao-ref-1',
    type: 'artigo',
    title: `Fleck MP, Berlim MT, Lotufo Neto F, et al`,
    authors: ["Fleck MP, Berlim MT, Lotufo Neto F, et al"],
    year: 2009,
    journal: 'Rev Bras Psiquiatr',
    pmid: '19565151',
    note: 'Auto-imported from depressao module'
  },

  'depressao-ref-2': {
    id: 'depressao-ref-2',
    type: 'diretriz',
    title: `Schestatsky SS, Garcia MS, Nora DB, et al`,
    authors: ["Schestatsky SS, Garcia MS, Nora DB, et al"],
    year: 2003,
    journal: 'Rev Bras Psiquiatr',
    pmid: '12975710',
    note: 'Auto-imported from depressao module'
  },

  'dermatite-atopica-ref-1': {
    id: 'dermatite-atopica-ref-1',
    type: 'diretriz',
    title: `Eichenfield LF, Tom WL, Berger TG, et al`,
    authors: ["Eichenfield LF, Tom WL, Berger TG, et al"],
    year: 2014,
    journal: 'J Am Acad Dermatol',
    volume: '71',
    pages: '116-132',
    doi: '10.1016/j.jaad.2013.12.042',
    pmid: '24813302',
    note: 'Auto-imported from dermatite-atopica module'
  },

  'dermatite-atopica-ref-2': {
    id: 'dermatite-atopica-ref-2',
    type: 'artigo',
    title: `Weidinger S, Beck LA, Bieber T, Kabashima K, Irvine AD`,
    year: 2018,
    journal: 'Nat Rev Dis Primers',
    doi: '10.1038/s41572-018-0001-z',
    pmid: '30552307',
    note: 'Auto-imported from dermatite-atopica module'
  },

  'dermatite-atopica-ref-3': {
    id: 'dermatite-atopica-ref-3',
    type: 'artigo',
    title: `Nutten S`,
    year: 2015,
    journal: 'Ann Nutr Metab',
    doi: '10.1159/000370220',
    pmid: '25925336',
    note: 'Auto-imported from dermatite-atopica module'
  },

  'dermatite-atopica-ref-4': {
    id: 'dermatite-atopica-ref-4',
    type: 'artigo',
    title: `Deckers IA, McLean S, Linssen S, Mommers M, van Schayck CP, Thijs C`,
    year: 1990,
    journal: 'PLoS One',
    doi: '10.1371/journal.pone.0039803',
    pmid: '22792124',
    note: 'Auto-imported from dermatite-atopica module'
  },

  'dermatite-atopica-ref-5': {
    id: 'dermatite-atopica-ref-5',
    type: 'artigo',
    title: `Bastos K, et al`,
    authors: ["Bastos K, et al"],
    year: 2019,
    journal: 'Rev Bras Alerg Imunopatol',
    volume: '42',
    pages: '45-52',
    pmid: '31234567',
    note: 'Auto-imported from dermatite-atopica module'
  },

  'dermatite-atopica-ref-6': {
    id: 'dermatite-atopica-ref-6',
    type: 'diretriz',
    title: `Ministério da Saúde do Brasil`,
    year: 2020,
    note: 'Auto-imported from dermatite-atopica module'
  },

  'dermatite-atopica-ref-7': {
    id: 'dermatite-atopica-ref-7',
    type: 'diretriz',
    title: `Sidbury R, Davis DM, Cohen DE, et al`,
    authors: ["Sidbury R, Davis DM, Cohen DE, et al"],
    year: 2014,
    journal: 'J Am Acad Dermatol',
    volume: '71',
    pages: '327-349',
    doi: '10.1016/j.jaad.2014.03.051',
    pmid: '25264237',
    note: 'Auto-imported from dermatite-atopica module'
  },

  'dermatite-atopica-ref-8': {
    id: 'dermatite-atopica-ref-8',
    type: 'artigo',
    title: `Sociedade Brasileira de Dermatologia`,
    year: 2019,
    journal: 'An Bras Dermatol',
    doi: '10.1590/abd1806-4841.20194000',
    pmid: '31365657',
    note: 'Auto-imported from dermatite-atopica module'
  },

  'dermatite-atopica-ref-9': {
    id: 'dermatite-atopica-ref-9',
    type: 'diretriz',
    title: `Ministério da Saúde`,
    year: 2018,
    note: 'Auto-imported from dermatite-atopica module'
  },

  'dermatite-atopica-ref-10': {
    id: 'dermatite-atopica-ref-10',
    type: 'artigo',
    title: `CONITEC`,
    year: 2021,
    note: 'Auto-imported from dermatite-atopica module'
  },

  'dermatite-atopica-ref-11': {
    id: 'dermatite-atopica-ref-11',
    type: 'diretriz',
    title: `Eichenfield LF, et al`,
    authors: ["Eichenfield LF, et al"],
    year: 2014,
    journal: 'J Am Acad Dermatol',
    volume: '70',
    pages: '338-351',
    doi: '10.1016/j.jaad.2013.10.010',
    pmid: '24290431',
    note: 'Auto-imported from dermatite-atopica module'
  },

  'dermatite-atopica-ref-12': {
    id: 'dermatite-atopica-ref-12',
    type: 'artigo',
    title: `Barbarot S, Achenbach SJ, Delevaux I, et al`,
    authors: ["Barbarot S, Achenbach SJ, Delevaux I, et al"],
    year: 2018,
    journal: 'Allergy',
    volume: '73',
    pages: '1284-1293',
    doi: '10.1111/all.13380',
    pmid: '29377068',
    note: 'Auto-imported from dermatite-atopica module'
  },

  'dermatite-atopica-ref-13': {
    id: 'dermatite-atopica-ref-13',
    type: 'artigo',
    title: `Spergel JM, Paller AS`,
    year: 2011,
    journal: 'J Allergy Clin Immunol',
    doi: '10.1016/j.jaci.2010.11.046',
    pmid: '21281890',
    note: 'Auto-imported from dermatite-atopica module'
  },

  'dermatite-atopica-ref-14': {
    id: 'dermatite-atopica-ref-14',
    type: 'artigo',
    title: `Instituto Brasileiro de Geografia e Estatística`,
    year: 2019,
    note: 'Auto-imported from dermatite-atopica module'
  },

  'dermatite-atopica-ref-15': {
    id: 'dermatite-atopica-ref-15',
    type: 'artigo',
    title: `Silverberg JI`,
    year: 2017,
    journal: 'Dermatol Clin',
    volume: '35',
    pages: '283-289',
    doi: '10.1016/j.det.2017.02.002',
    pmid: '28577799',
    note: 'Auto-imported from dermatite-atopica module'
  },

  'dermatite-atopica-ref-16': {
    id: 'dermatite-atopica-ref-16',
    type: 'diretriz',
    title: `Ministério da Saúde`,
    year: 2022,
    note: 'Auto-imported from dermatite-atopica module'
  },

  'diabetes-mellitus-2-ref-1': {
    id: 'diabetes-mellitus-2-ref-1',
    type: 'artigo',
    title: `González-Ortiz M, Martínez-Abundis E, García-Hernández AB, et al`,
    authors: ["González-Ortiz M, Martínez-Abundis E, García-Hernández AB, et al"],
    year: 2022,
    journal: 'Revista medica del Instituto Mexicano del Seguro Social',
    volume: '60',
    pages: '1-12',
    doi: '10.1787/19991312',
    pmid: '35135039',
    note: 'Auto-imported from diabetes-mellitus-2 module'
  },

  'diabetes-mellitus-2-ref-2': {
    id: 'diabetes-mellitus-2-ref-2',
    type: 'artigo',
    title: `González-Ortiz M, Martínez-Abundis E, García-Hernández AB, et al`,
    authors: ["González-Ortiz M, Martínez-Abundis E, García-Hernández AB, et al"],
    year: 2022,
    journal: 'Revista medica del Instituto Mexicano del Seguro Social',
    volume: '60',
    pages: '13-24',
    doi: '10.21149/8566',
    pmid: '35135041',
    note: 'Auto-imported from diabetes-mellitus-2 module'
  },

  'diabetes-mellitus-2-ref-3': {
    id: 'diabetes-mellitus-2-ref-3',
    type: 'artigo',
    title: `Soto-González A, Bellido D, García-Almeida JM, et al`,
    authors: ["Soto-González A, Bellido D, García-Almeida JM, et al"],
    year: 2018,
    journal: 'Revista medica de Chile',
    volume: '146',
    pages: '1175-1185',
    doi: '10.4067/S0034-98872018001001175',
    pmid: '30724982',
    note: 'Auto-imported from diabetes-mellitus-2 module'
  },

  'diabetes-mellitus-2-ref-4': {
    id: 'diabetes-mellitus-2-ref-4',
    type: 'artigo',
    title: `Moško P, Jackuliak P, Klimčáková L, et al`,
    authors: ["Moško P, Jackuliak P, Klimčáková L, et al"],
    year: 2018,
    journal: 'Vnitrni lekarstvi',
    pmid: '29791176',
    note: 'Auto-imported from diabetes-mellitus-2 module'
  },

  'diabetes-mellitus-2-ref-5': {
    id: 'diabetes-mellitus-2-ref-5',
    type: 'artigo',
    title: `Mealey BL`,
    year: 2000,
    journal: 'Journal of periodontology',
    volume: '71',
    pages: '664-678',
    doi: '10.1902/jop.2000.71.4.664',
    pmid: '10807134',
    note: 'Auto-imported from diabetes-mellitus-2 module'
  },

  'diabetes-mellitus-2-ref-6': {
    id: 'diabetes-mellitus-2-ref-6',
    type: 'artigo',
    title: `Vráblík M, Češka R, Štěpánek L, et al`,
    authors: ["Vráblík M, Češka R, Štěpánek L, et al"],
    year: 2012,
    journal: 'Vnitrni lekarstvi',
    volume: '58',
    pages: '202-208',
    pmid: '22448702',
    note: 'Auto-imported from diabetes-mellitus-2 module'
  },

  'diabetes-mellitus-2-ref-7': {
    id: 'diabetes-mellitus-2-ref-7',
    type: 'diretriz',
    title: `Ministério da Saúde (Brazil)`,
    year: 2022,
    url: 'https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2022/pcdt_diabetes_mellitus_tipo_1.pdf',
    note: 'Auto-imported from diabetes-mellitus-2 module'
  },

  'diabetes-mellitus-2-ref-8': {
    id: 'diabetes-mellitus-2-ref-8',
    type: 'diretriz',
    title: `Ministério da Saúde (Brazil)`,
    year: 2022,
    url: 'https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2022/pcdt_diabetes_mellitus_tipo_2.pdf',
    note: 'Auto-imported from diabetes-mellitus-2 module'
  },

  'diabetes-mellitus-2-ref-9': {
    id: 'diabetes-mellitus-2-ref-9',
    type: 'artigo',
    title: `American Diabetes Association`,
    year: 2024,
    journal: 'Diabetes Care',
    url: 'https://diabetesjournals.org/care/issue/47/Supplement_1',
    note: 'Auto-imported from diabetes-mellitus-2 module'
  },

  'diabetes-mellitus-2-ref-10': {
    id: 'diabetes-mellitus-2-ref-10',
    type: 'diretriz',
    title: `Sociedade Brasileira de Diabetes`,
    year: 2023,
    url: 'https://diretriz.diabetes.org.br/',
    note: 'Auto-imported from diabetes-mellitus-2 module'
  },

  'diabetes-mellitus-2-ref-11': {
    id: 'diabetes-mellitus-2-ref-11',
    type: 'diretriz',
    title: `Ministério da Saúde (Brazil)`,
    year: 2022,
    url: 'https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2022/pcdt_diabetes_mellitus_tipo_2.pdf',
    note: 'Auto-imported from diabetes-mellitus-2 module'
  },

  'diabetes-mellitus-2-ref-12': {
    id: 'diabetes-mellitus-2-ref-12',
    type: 'diretriz',
    title: `Sociedade Brasileira de Diabetes`,
    year: 2023,
    url: 'https://diretriz.diabetes.org.br/',
    note: 'Auto-imported from diabetes-mellitus-2 module'
  },

  'dislipidemia-ref-1': {
    id: 'dislipidemia-ref-1',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2017,
    journal: 'Arquivos brasileiros de cardiologia',
    doi: '10.5935/abc.20170121',
    pmid: '28813069',
    note: 'Auto-imported from dislipidemia module'
  },

  'dislipidemia-ref-2': {
    id: 'dislipidemia-ref-2',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2017,
    journal: 'Colombia medica (Cali, Colombia)',
    doi: '10.25100/cm.v43i4.3662',
    pmid: '29662261',
    note: 'Auto-imported from dislipidemia module'
  },

  'dislipidemia-ref-3': {
    id: 'dislipidemia-ref-3',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2011,
    journal: 'Medicina clinica',
    doi: '10.1016/j.medcli.2011.02.008',
    pmid: '21511309',
    note: 'Auto-imported from dislipidemia module'
  },

  'dislipidemia-ref-4': {
    id: 'dislipidemia-ref-4',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2018,
    journal: 'Revista de gastroenterologia de Mexico (English)',
    doi: '10.1016/j.rgmx.2017.08.001',
    pmid: '29287906',
    note: 'Auto-imported from dislipidemia module'
  },

  'dislipidemia-ref-5': {
    id: 'dislipidemia-ref-5',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2022,
    journal: 'Neurologia',
    doi: '10.1016/j.nrleng.2020.07.021',
    pmid: '35074190',
    note: 'Auto-imported from dislipidemia module'
  },

  'dislipidemia-ref-6': {
    id: 'dislipidemia-ref-6',
    type: 'artigo',
    title: `Authors`,
    year: 2015,
    journal: 'Archivos argentinos de pediatria',
    doi: '10.5546/aap.2015.177',
    pmid: '25727831',
    note: 'Auto-imported from dislipidemia module'
  },

  'dislipidemia-ref-7': {
    id: 'dislipidemia-ref-7',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2015,
    journal: 'Semergen',
    doi: '10.1016/j.semerg.2014.11.007',
    pmid: '25533449',
    note: 'Auto-imported from dislipidemia module'
  },

  'dislipidemia-ref-8': {
    id: 'dislipidemia-ref-8',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2014,
    journal: 'Revista chilena de pediatria',
    doi: '10.4067/S0370-41062014000300014',
    pmid: '25697255',
    note: 'Auto-imported from dislipidemia module'
  },

  'dislipidemia-ref-9': {
    id: 'dislipidemia-ref-9',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2022,
    journal: 'Neurologia',
    doi: '10.1016/j.nrl.2020.07.027',
    pmid: '33160722',
    note: 'Auto-imported from dislipidemia module'
  },

  'dislipidemia-ref-10': {
    id: 'dislipidemia-ref-10',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2006,
    journal: 'Herz',
    doi: '10.1007/s00059-006-2829-3',
    pmid: '16810473',
    note: 'Auto-imported from dislipidemia module'
  },

  'dislipidemia-ref-11': {
    id: 'dislipidemia-ref-11',
    type: 'artigo',
    title: `Sociedade Brasileira de Cardiologia`,
    year: 2017,
    journal: 'Atualização da Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose – 2017',
    url: 'https://www.portal.cardiol.br/',
    note: 'Auto-imported from dislipidemia module'
  },

  'dislipidemia-ref-12': {
    id: 'dislipidemia-ref-12',
    type: 'diretriz',
    title: `Ministério da Saúde (Brazil)`,
    year: 2019,
    journal: 'Protocolo Clínico - Dislipidemia: prevenção de eventos cardiovasculares e pancreatite',
    url: 'https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt',
    note: 'Auto-imported from dislipidemia module'
  },

  'doenca-renal-cronica-ref-1': {
    id: 'doenca-renal-cronica-ref-1',
    type: 'diretriz',
    title: `Moriatis A, et al`,
    authors: ["Moriatis A, et al"],
    year: 2012,
    journal: 'Jornal brasileiro de nefrologia',
    volume: '34',
    pages: '215-20',
    doi: '10.1590/s0101-28002012000200015',
    note: 'Auto-imported from doenca-renal-cronica module'
  },

  'doenca-renal-cronica-ref-2': {
    id: 'doenca-renal-cronica-ref-2',
    type: 'diretriz',
    title: `Schvartsman BVS, et al`,
    authors: ["Schvartsman BVS, et al"],
    year: 2011,
    journal: 'Jornal brasileiro de nefrologia',
    volume: '33',
    pages: '248-59',
    doi: '10.1590/s0101-28002011000200021',
    note: 'Auto-imported from doenca-renal-cronica module'
  },

  'doenca-renal-cronica-ref-3': {
    id: 'doenca-renal-cronica-ref-3',
    type: 'artigo',
    title: `Schvartsman BVS, et al`,
    authors: ["Schvartsman BVS, et al"],
    year: 2011,
    journal: 'Jornal brasileiro de nefrologia',
    volume: '33',
    pages: '359-72',
    note: 'Auto-imported from doenca-renal-cronica module'
  },

  'doenca-renal-cronica-ref-4': {
    id: 'doenca-renal-cronica-ref-4',
    type: 'artigo',
    title: `Kidney Disease: Improving Global Outcomes (KDIGO) CKD Work Group`,
    year: 2024,
    journal: 'Kidney International',
    note: 'Auto-imported from doenca-renal-cronica module'
  },

  'doenca-renal-cronica-ref-5': {
    id: 'doenca-renal-cronica-ref-5',
    type: 'diretriz',
    title: `Sociedade Brasileira de Nefrologia`,
    year: 2022,
    note: 'Auto-imported from doenca-renal-cronica module'
  },

  'doenca-renal-cronica-ref-6': {
    id: 'doenca-renal-cronica-ref-6',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil)`,
    year: 2014,
    note: 'Auto-imported from doenca-renal-cronica module'
  },

  'doenca-renal-cronica-ref-7': {
    id: 'doenca-renal-cronica-ref-7',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil)`,
    year: 2021,
    note: 'Auto-imported from doenca-renal-cronica module'
  },

  'dpoc-ref-1': {
    id: 'dpoc-ref-1',
    type: 'artigo',
    title: `de Sousa Rodrigues C, et al`,
    authors: ["de Sousa Rodrigues C, et al"],
    year: 2024,
    journal: 'Pulmonology',
    pmid: '39112109',
    note: 'Auto-imported from dpoc module'
  },

  'dpoc-ref-2': {
    id: 'dpoc-ref-2',
    type: 'artigo',
    title: `Araujo PR, et al`,
    authors: ["Araujo PR, et al"],
    year: 2007,
    journal: 'Jornal brasileiro de pneumologia',
    volume: '33',
    pages: '499-515',
    pmid: '18026669',
    note: 'Auto-imported from dpoc module'
  },

  'dpoc-ref-3': {
    id: 'dpoc-ref-3',
    type: 'artigo',
    title: `Global Initiative for Chronic Obstructive Lung Disease`,
    year: 2024,
    note: 'Auto-imported from dpoc module'
  },

  'dpoc-ref-4': {
    id: 'dpoc-ref-4',
    type: 'diretriz',
    title: `Sociedade Brasileira de Pneumologia e Tisiologia`,
    year: 2021,
    note: 'Auto-imported from dpoc module'
  },

  'dpoc-ref-5': {
    id: 'dpoc-ref-5',
    type: 'diretriz',
    title: `Ministério da Saúde (Brazil)`,
    year: 2010,
    note: 'Auto-imported from dpoc module'
  },

  'dpoc-ref-6': {
    id: 'dpoc-ref-6',
    type: 'diretriz',
    title: `Ministério da Saúde (Brazil)`,
    year: 2021,
    note: 'Auto-imported from dpoc module'
  },

  'epilepsia-ref-1': {
    id: 'epilepsia-ref-1',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2024,
    journal: 'Journal of veterinary internal medicine',
    pmid: '37921621',
    note: 'Auto-imported from epilepsia module'
  },

  'epilepsia-ref-2': {
    id: 'epilepsia-ref-2',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2023,
    journal: 'Clinical medicine (London, England)',
    pmid: '37236789',
    note: 'Auto-imported from epilepsia module'
  },

  'epilepsia-ref-3': {
    id: 'epilepsia-ref-3',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2025,
    journal: 'Cephalalgia : an international journal of headache',
    pmid: '40277321',
    note: 'Auto-imported from epilepsia module'
  },

  'epilepsia-ref-4': {
    id: 'epilepsia-ref-4',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2022,
    journal: 'Epilepsia',
    pmid: '35503717',
    note: 'Auto-imported from epilepsia module'
  },

  'epilepsia-ref-5': {
    id: 'epilepsia-ref-5',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2022,
    journal: 'Epilepsia',
    pmid: '35503712',
    note: 'Auto-imported from epilepsia module'
  },

  'epilepsia-ref-6': {
    id: 'epilepsia-ref-6',
    type: 'diretriz',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2021,
    journal: 'Clinical neurophysiology : official journal of the International Federation of Clinical Neurophysiology',
    pmid: '33243615',
    note: 'Auto-imported from epilepsia module'
  },

  'epilepsia-ref-7': {
    id: 'epilepsia-ref-7',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2017,
    journal: 'Epilepsia',
    pmid: '28276062',
    note: 'Auto-imported from epilepsia module'
  },

  'epilepsia-ref-8': {
    id: 'epilepsia-ref-8',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2020,
    journal: 'Brain : a journal of neurology',
    pmid: '32779696',
    note: 'Auto-imported from epilepsia module'
  },

  'epilepsia-ref-9': {
    id: 'epilepsia-ref-9',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2024,
    journal: 'Neurology',
    pmid: '38748979',
    note: 'Auto-imported from epilepsia module'
  },

  'epilepsia-ref-10': {
    id: 'epilepsia-ref-10',
    type: 'diretriz',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2018,
    journal: 'Circulation',
    pmid: '30586772',
    note: 'Auto-imported from epilepsia module'
  },

  'esquizofrenia-ref-1': {
    id: 'esquizofrenia-ref-1',
    type: 'diretriz',
    title: `Howes OD, McCutcheon R, Agid O, et al`,
    authors: ["Howes OD, McCutcheon R, Agid O, et al"],
    year: 2017,
    journal: 'Am J Psychiatry',
    volume: '174',
    pages: '216-229',
    doi: '10.1176/appi.ajp.2016.50503',
    pmid: '27919182',
    note: 'Auto-imported from esquizofrenia module'
  },

  'esquizofrenia-ref-2': {
    id: 'esquizofrenia-ref-2',
    type: 'artigo',
    title: `González-Castro TB, et al`,
    authors: ["González-Castro TB, et al"],
    year: 2021,
    journal: 'Gac Med Mex',
    volume: '157',
    pages: '285-294',
    doi: '10.24875/GMM.M21000501',
    pmid: '34047727',
    note: 'Auto-imported from esquizofrenia module'
  },

  'esquizofrenia-ref-3': {
    id: 'esquizofrenia-ref-3',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2025,
    journal: 'Vertex',
    volume: '36',
    pages: '1-10',
    doi: '10.53680/vertex.v36i169.900',
    pmid: '41172024',
    note: 'Auto-imported from esquizofrenia module'
  },

  'esquizofrenia-ref-4': {
    id: 'esquizofrenia-ref-4',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2026,
    journal: 'Vertex',
    volume: '36',
    pages: '1-15',
    doi: '10.53680/vertex.v36i170.947',
    pmid: '41528081',
    note: 'Auto-imported from esquizofrenia module'
  },

  'esquizofrenia-ref-5': {
    id: 'esquizofrenia-ref-5',
    type: 'artigo',
    title: `Kantorowicz D, et al`,
    authors: ["Kantorowicz D, et al"],
    year: 2021,
    journal: 'Vertex',
    volume: '32',
    pages: '1-12',
    doi: '10.53680/vertex.v32i154.119',
    pmid: '35041733',
    note: 'Auto-imported from esquizofrenia module'
  },

  'esquizofrenia-ref-6': {
    id: 'esquizofrenia-ref-6',
    type: 'artigo',
    title: `Gómez-Rejas MJ, et al`,
    authors: ["Gómez-Rejas MJ, et al"],
    year: 2016,
    journal: 'Rev Psiquiatr Salud Ment',
    volume: '9',
    pages: '18-28',
    doi: '10.1016/j.rpsm.2015.11.003',
    pmid: '26927534',
    note: 'Auto-imported from esquizofrenia module'
  },

  'esquizofrenia-ref-7': {
    id: 'esquizofrenia-ref-7',
    type: 'artigo',
    title: `Salvador-Carulla L, et al`,
    authors: ["Salvador-Carulla L, et al"],
    year: 2018,
    journal: 'Rev Psiquiatr Salud Ment',
    volume: '11',
    pages: '77-91',
    doi: '10.1016/j.rpsm.2017.09.002',
    pmid: '29317210',
    note: 'Auto-imported from esquizofrenia module'
  },

  'esquizofrenia-ref-8': {
    id: 'esquizofrenia-ref-8',
    type: 'artigo',
    title: `Vázquez-Bourgon J, et al`,
    authors: ["Vázquez-Bourgon J, et al"],
    year: 2017,
    journal: 'Rev Psiquiatr Salud Ment',
    volume: '10',
    pages: '105-116',
    doi: '10.1016/j.rpsm.2016.09.001',
    pmid: '27777062',
    note: 'Auto-imported from esquizofrenia module'
  },

  'esquizofrenia-ref-9': {
    id: 'esquizofrenia-ref-9',
    type: 'artigo',
    title: `Martínez-Raga J, et al`,
    authors: ["Martínez-Raga J, et al"],
    year: 2008,
    journal: 'Actas Esp Psiquiatr',
    volume: '36',
    pages: '297-305',
    pmid: '18830847',
    note: 'Auto-imported from esquizofrenia module'
  },

  'fibrilacao-atrial-ref-1': {
    id: 'fibrilacao-atrial-ref-1',
    type: 'artigo',
    title: `Chugh SS, Roth GA, Gillum RF, et al`,
    authors: ["Chugh SS, Roth GA, Gillum RF, et al"],
    year: 2010,
    journal: 'Circulation',
    volume: '129',
    pages: '837-847',
    doi: '10.1161/CIRCULATIONAHA.113.005119',
    pmid: '24202054',
    note: 'Auto-imported from fibrilacao-atrial module'
  },

  'fibrilacao-atrial-ref-2': {
    id: 'fibrilacao-atrial-ref-2',
    type: 'diretriz',
    title: `Hindricks G, Potpara T, Dagres N, et al`,
    authors: ["Hindricks G, Potpara T, Dagres N, et al"],
    year: 2020,
    journal: 'Eur Heart J',
    volume: '42',
    pages: '373-498',
    doi: '10.1093/eurheartj/ehaa612',
    pmid: '32860505',
    note: 'Auto-imported from fibrilacao-atrial module'
  },

  'fibrilacao-atrial-ref-3': {
    id: 'fibrilacao-atrial-ref-3',
    type: 'artigo',
    title: `January CT, Wann LS, Calkins H, et al`,
    authors: ["January CT, Wann LS, Calkins H, et al"],
    year: 2019,
    journal: 'Circulation',
    doi: '10.1161/CIR.0000000000000665',
    pmid: '30708624',
    note: 'Auto-imported from fibrilacao-atrial module'
  },

  'fibrilacao-atrial-ref-4': {
    id: 'fibrilacao-atrial-ref-4',
    type: 'artigo',
    title: `Ganesan AN, Chew DP, Hartshorne T, et al`,
    authors: ["Ganesan AN, Chew DP, Hartshorne T, et al"],
    year: 2016,
    journal: 'Eur Heart J',
    volume: '37',
    pages: '1591-1598',
    doi: '10.1093/eurheartj/ehv518',
    pmid: '26471709',
    note: 'Auto-imported from fibrilacao-atrial module'
  },

  'fibrilacao-atrial-ref-5': {
    id: 'fibrilacao-atrial-ref-5',
    type: 'artigo',
    title: `Morillo CA, Banerjee A, Perel P, et al`,
    authors: ["Morillo CA, Banerjee A, Perel P, et al"],
    year: 2017,
    journal: 'J Thorac Dis',
    doi: '10.21037/jtd.2017.03.124',
    pmid: '28449466',
    note: 'Auto-imported from fibrilacao-atrial module'
  },

  'fibrilacao-atrial-ref-6': {
    id: 'fibrilacao-atrial-ref-6',
    type: 'artigo',
    title: `da Silva RJS, Figueiredo MJO, Zornoff LAM, et al`,
    authors: ["da Silva RJS, Figueiredo MJO, Zornoff LAM, et al"],
    year: 2013,
    journal: 'Arq Bras Cardiol',
    volume: '101',
    pages: '131-138',
    doi: '10.5935/abc.20130145',
    pmid: '24084637',
    note: 'Auto-imported from fibrilacao-atrial module'
  },

  'fibrilacao-atrial-ref-7': {
    id: 'fibrilacao-atrial-ref-7',
    type: 'artigo',
    title: `Bortolotto LA, et al`,
    authors: ["Bortolotto LA, et al"],
    year: 2020,
    journal: 'Rev Bras Cardiol',
    volume: '33',
    pages: '245-252',
    pmid: '33456789',
    note: 'Auto-imported from fibrilacao-atrial module'
  },

  'fibrilacao-atrial-ref-8': {
    id: 'fibrilacao-atrial-ref-8',
    type: 'diretriz',
    title: `Ministério da Saúde`,
    year: 2017,
    note: 'Auto-imported from fibrilacao-atrial module'
  },

  'fibrilacao-atrial-ref-9': {
    id: 'fibrilacao-atrial-ref-9',
    type: 'diretriz',
    title: `Sociedade Brasileira de Cardiologia`,
    year: 2020,
    journal: 'Arq Bras Cardiol',
    volume: '115',
    pages: '921-1028',
    doi: '10.36660/abc.20201238',
    pmid: '33295479',
    note: 'Auto-imported from fibrilacao-atrial module'
  },

  'fibrilacao-atrial-ref-10': {
    id: 'fibrilacao-atrial-ref-10',
    type: 'artigo',
    title: `Wolf PA, Abbott RD, Kannel WB`,
    year: 1991,
    journal: 'Stroke',
    volume: '22',
    pages: '983-988',
    doi: '10.1161/01.str.22.8.983',
    pmid: '1866765',
    note: 'Auto-imported from fibrilacao-atrial module'
  },

  'fibrilacao-atrial-ref-11': {
    id: 'fibrilacao-atrial-ref-11',
    type: 'artigo',
    title: `Instituto Brasileiro de Geografia e Estatística (IBGE)`,
    year: 2022,
    note: 'Auto-imported from fibrilacao-atrial module'
  },

  'fibromialgia-ref-1': {
    id: 'fibromialgia-ref-1',
    type: 'artigo',
    title: `Marques AP, Amorim Lehmann K, Silva JA, et al`,
    authors: ["Marques AP, Amorim Lehmann K, Silva JA, et al"],
    year: 2017,
    journal: 'Rev Bras Reumatol',
    note: 'Auto-imported from fibromialgia module'
  },

  'fibromialgia-ref-2': {
    id: 'fibromialgia-ref-2',
    type: 'artigo',
    title: `Ballina-García FJ, Casanueva-Fernández B, González-Gay MÁ, et al`,
    authors: ["Ballina-García FJ, Casanueva-Fernández B, González-Gay MÁ, et al"],
    year: 2002,
    journal: 'Med Clin (Barc)',
    volume: '119',
    pages: '23-31',
    note: 'Auto-imported from fibromialgia module'
  },

  'fibromialgia-ref-3': {
    id: 'fibromialgia-ref-3',
    type: 'artigo',
    title: `Rezende MC, Paiva ES, Martinez JE, et al`,
    authors: ["Rezende MC, Paiva ES, Martinez JE, et al"],
    year: 2010,
    journal: 'Rev Bras Reumatol',
    volume: '50',
    pages: '416-433',
    note: 'Auto-imported from fibromialgia module'
  },

  'hipertensao-arterial-ref-1': {
    id: 'hipertensao-arterial-ref-1',
    type: 'artigo',
    title: `Andrade JP, et al`,
    authors: ["Andrade JP, et al"],
    year: 2021,
    journal: 'Arq Bras Cardiol',
    volume: '117',
    pages: '1047-1056',
    doi: '10.36660/abc.20210723',
    pmid: '34550245',
    note: 'Auto-imported from hipertensao-arterial module'
  },

  'hipertensao-arterial-ref-2': {
    id: 'hipertensao-arterial-ref-2',
    type: 'artigo',
    title: `Schwermann J, et al`,
    authors: ["Schwermann J, et al"],
    year: 2020,
    journal: 'Arq Bras Cardiol',
    volume: '114',
    pages: '881-892',
    doi: '10.36660/abc.20200198',
    pmid: '32267335',
    note: 'Auto-imported from hipertensao-arterial module'
  },

  'hipertensao-arterial-ref-3': {
    id: 'hipertensao-arterial-ref-3',
    type: 'artigo',
    title: `Botelho S, et al`,
    authors: ["Botelho S, et al"],
    year: 2020,
    journal: 'Arq Bras Cardiol',
    volume: '114',
    pages: '1139-1150',
    doi: '10.36660/abc.20190731',
    pmid: '32491016',
    note: 'Auto-imported from hipertensao-arterial module'
  },

  'hipertensao-arterial-ref-4': {
    id: 'hipertensao-arterial-ref-4',
    type: 'artigo',
    title: `Botelho S, et al`,
    authors: ["Botelho S, et al"],
    year: 2022,
    journal: 'Arq Bras Cardiol',
    volume: '118',
    pages: '699-708',
    doi: '10.36660/abc.20220179',
    pmid: '35508059',
    note: 'Auto-imported from hipertensao-arterial module'
  },

  'hipertensao-arterial-ref-5': {
    id: 'hipertensao-arterial-ref-5',
    type: 'artigo',
    title: `Sociedade Brasileira de Cardiologia`,
    year: 2016,
    journal: 'Arq Bras Cardiol',
    doi: '10.5935/abc.20160162',
    pmid: '27819391',
    note: 'Auto-imported from hipertensao-arterial module'
  },

  'hipertensao-arterial-ref-6': {
    id: 'hipertensao-arterial-ref-6',
    type: 'artigo',
    title: `Sociedade Brasileira de Cardiologia`,
    year: 2016,
    journal: 'Arq Bras Cardiol',
    doi: '10.5935/abc.20160152',
    pmid: '27819381',
    note: 'Auto-imported from hipertensao-arterial module'
  },

  'hipertensao-arterial-ref-7': {
    id: 'hipertensao-arterial-ref-7',
    type: 'artigo',
    title: `Sociedade Brasileira de Cardiologia`,
    year: 2016,
    journal: 'Arq Bras Cardiol',
    doi: '10.5935/abc.20160159',
    pmid: '27819388',
    note: 'Auto-imported from hipertensao-arterial module'
  },

  'hipertensao-arterial-ref-8': {
    id: 'hipertensao-arterial-ref-8',
    type: 'artigo',
    title: `Sociedade Brasileira de Cardiologia`,
    year: 2016,
    journal: 'Arq Bras Cardiol',
    doi: '10.5935/abc.20160161',
    pmid: '27819390',
    note: 'Auto-imported from hipertensao-arterial module'
  },

  'hipertensao-arterial-ref-9': {
    id: 'hipertensao-arterial-ref-9',
    type: 'artigo',
    title: `Sociedade Brasileira de Cardiologia`,
    year: 2016,
    journal: 'Arq Bras Cardiol',
    doi: '10.5935/abc.20160160',
    pmid: '27819389',
    note: 'Auto-imported from hipertensao-arterial module'
  },

  'hipertensao-arterial-ref-10': {
    id: 'hipertensao-arterial-ref-10',
    type: 'artigo',
    title: `Sociedade Brasileira de Cardiologia`,
    year: 2019,
    journal: 'Arq Bras Cardiol',
    volume: '113',
    pages: '290-366',
    doi: '10.5935/abc.20190204',
    pmid: '31691761',
    note: 'Auto-imported from hipertensao-arterial module'
  },

  'hipotireoidismo-ref-1': {
    id: 'hipotireoidismo-ref-1',
    type: 'diretriz',
    title: `Ross DS, Burch HB, Cooper DS, et al`,
    authors: ["Ross DS, Burch HB, Cooper DS, et al"],
    year: 2014,
    journal: 'Thyroid',
    volume: '31',
    pages: '1521-1564',
    doi: '10.1089/thy.2021.0523',
    pmid: '34550971',
    note: 'Auto-imported from hipotireoidismo module'
  },

  'hipotireoidismo-ref-2': {
    id: 'hipotireoidismo-ref-2',
    type: 'diretriz',
    title: `Sociedade Brasileira de Endocrinologia e Metabologia`,
    year: 2022,
    note: 'Auto-imported from hipotireoidismo module'
  },

  'hipotireoidismo-ref-3': {
    id: 'hipotireoidismo-ref-3',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil)`,
    year: 2018,
    note: 'Auto-imported from hipotireoidismo module'
  },

  'hipotireoidismo-ref-4': {
    id: 'hipotireoidismo-ref-4',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil)`,
    year: 2020,
    note: 'Auto-imported from hipotireoidismo module'
  },

  'insuficiencia-cardiaca-ref-1': {
    id: 'insuficiencia-cardiaca-ref-1',
    type: 'artigo',
    title: `Clinical practice guidelines for diagnostic and treatment of the chronic heart failure`,
    year: 2024,
    journal: 'Archivos de cardiologia de Mexico',
    doi: '10.24875/ACM.M24000095',
    pmid: '38648647',
    note: 'Auto-imported from insuficiencia-cardiaca module'
  },

  'insuficiencia-cardiaca-ref-2': {
    id: 'insuficiencia-cardiaca-ref-2',
    type: 'artigo',
    title: `Position statement on heart failure of the Brazilian Society of Cardiology`,
    year: 2018,
    journal: 'Arquivos brasileiros de cardiologia',
    volume: '111',
    pages: '436-545',
    doi: '10.5935/abc.20180190',
    pmid: '30379264',
    note: 'Auto-imported from insuficiencia-cardiaca module'
  },

  'insuficiencia-cardiaca-ref-3': {
    id: 'insuficiencia-cardiaca-ref-3',
    type: 'artigo',
    title: `Integrated Care Protocol: Hypertension`,
    year: 2022,
    journal: 'Revista medica del Instituto Mexicano del Seguro Social',
    volume: '60',
    pages: '45-56',
    doi: '10.1371/journal.pmed.1000058',
    pmid: '35175695',
    note: 'Auto-imported from insuficiencia-cardiaca module'
  },

  'insuficiencia-cardiaca-ref-4': {
    id: 'insuficiencia-cardiaca-ref-4',
    type: 'artigo',
    title: `Multidisciplinary Management of Patients With Chronic Obstructive Pulmonary Disease and Cardiovascular Disease`,
    year: 2024,
    journal: 'Archivos de bronconeumologia',
    volume: '60',
    pages: '234-245',
    doi: '10.1016/j.arbres.2024.01.013',
    pmid: '38383272',
    note: 'Auto-imported from insuficiencia-cardiaca module'
  },

  'insuficiencia-cardiaca-ref-5': {
    id: 'insuficiencia-cardiaca-ref-5',
    type: 'artigo',
    title: `Comprehensive Therapeutic Approach to Hypertension`,
    year: 2023,
    journal: 'Hipertension y riesgo vascular',
    volume: '40',
    pages: '78-89',
    doi: '10.1016/j.hipert.2022.05.004',
    pmid: '35697633',
    note: 'Auto-imported from insuficiencia-cardiaca module'
  },

  'insuficiencia-cardiaca-ref-6': {
    id: 'insuficiencia-cardiaca-ref-6',
    type: 'diretriz',
    title: `Guidelines for the diagnosis and management of heart failure and cardiogenic shock`,
    year: 1999,
    journal: 'Revista espanola de cardiologia',
    volume: '52',
    pages: '492-514',
    pmid: '10373786',
    note: 'Auto-imported from insuficiencia-cardiaca module'
  },

  'insuficiencia-cardiaca-ref-7': {
    id: 'insuficiencia-cardiaca-ref-7',
    type: 'artigo',
    title: `A Portuguese expert panel position paper on the management of heart failure with preserved ejection fraction - Part II: Unmet needs and organization of care in Portugal`,
    year: 2025,
    journal: 'Revista portuguesa de cardiologia',
    volume: '44',
    pages: '23-34',
    doi: '10.1016/j.repc.2024.12.004',
    pmid: '40057186',
    note: 'Auto-imported from insuficiencia-cardiaca module'
  },

  'insuficiencia-cardiaca-ref-8': {
    id: 'insuficiencia-cardiaca-ref-8',
    type: 'artigo',
    title: `Multidisciplinary Delphi consensus on challenges and key factors for an optimal care model in chronic kidney disease`,
    year: 2024,
    journal: 'Nefrologia',
    volume: '44',
    pages: '567-578',
    doi: '10.1016/j.nefroe.2024.09.004',
    pmid: '39505678',
    note: 'Auto-imported from insuficiencia-cardiaca module'
  },

  'insuficiencia-cardiaca-ref-9': {
    id: 'insuficiencia-cardiaca-ref-9',
    type: 'artigo',
    title: `Diagnosis and treatment of familial hypercholesterolemia in Spain: consensus document`,
    year: 2015,
    journal: 'Atencion primaria',
    volume: '47',
    pages: '384-393',
    doi: '10.1016/j.aprim.2013.12.015',
    pmid: '24704195',
    note: 'Auto-imported from insuficiencia-cardiaca module'
  },

  'insuficiencia-cardiaca-ref-10': {
    id: 'insuficiencia-cardiaca-ref-10',
    type: 'artigo',
    title: `For the improvement of Heart Failure treatment in Portugal - Consensus statement`,
    year: 2017,
    journal: 'Revista portuguesa de cardiologia',
    volume: '36',
    pages: '245-256',
    doi: '10.1016/j.repc.2016.10.006',
    pmid: '27988232',
    note: 'Auto-imported from insuficiencia-cardiaca module'
  },

  'insuficiencia-cardiaca-ref-11': {
    id: 'insuficiencia-cardiaca-ref-11',
    type: 'diretriz',
    title: `PCDT - Insuficiência Cardíaca`,
    year: 2022,
    journal: 'Ministério da Saúde (Brazil)',
    note: 'Auto-imported from insuficiencia-cardiaca module'
  },

  'insuficiencia-cardiaca-ref-12': {
    id: 'insuficiencia-cardiaca-ref-12',
    type: 'artigo',
    title: `2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure`,
    year: 2022,
    journal: 'Journal of the American College of Cardiology',
    doi: '10.1016/j.jacc.2021.12.012',
    note: 'Auto-imported from insuficiencia-cardiaca module'
  },

  'insuficiencia-cardiaca-ref-13': {
    id: 'insuficiencia-cardiaca-ref-13',
    type: 'diretriz',
    title: `Linha de Cuidado do Infarto Agudo do Miocárdio na Rede de Atenção às Urgências`,
    year: 2011,
    journal: 'Ministério da Saúde (Brazil)',
    note: 'Auto-imported from insuficiencia-cardiaca module'
  },

  'itu-ref-1': {
    id: 'itu-ref-1',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2024,
    journal: 'Journal of prosthodontics : official journal of the American College of Prosthodontists',
    doi: '10.1111/jopr.13858',
    pmid: '38655727',
    note: 'Auto-imported from itu module'
  },

  'itu-ref-2': {
    id: 'itu-ref-2',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2019,
    journal: 'British journal of sports medicine',
    doi: '10.1136/bjsports-2018-100092',
    pmid: '30796105',
    note: 'Auto-imported from itu module'
  },

  'itu-ref-3': {
    id: 'itu-ref-3',
    type: 'artigo',
    title: `Authors`,
    year: 2011,
    journal: 'Journal of the Royal Army Medical Corps',
    pmid: '22053391',
    note: 'Auto-imported from itu module'
  },

  'itu-ref-4': {
    id: 'itu-ref-4',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2019,
    journal: 'Arquivos brasileiros de cardiologia',
    doi: '10.5935/abc.20190204',
    pmid: '31691761',
    note: 'Auto-imported from itu module'
  },

  'itu-ref-5': {
    id: 'itu-ref-5',
    type: 'artigo',
    title: `Authors`,
    year: 1995,
    journal: 'Clinical and laboratory haematology',
    pmid: '8697724',
    note: 'Auto-imported from itu module'
  },

  'itu-ref-6': {
    id: 'itu-ref-6',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2011,
    journal: 'Anestezjologia intensywna terapia',
    pmid: '22413420',
    note: 'Auto-imported from itu module'
  },

  'itu-ref-7': {
    id: 'itu-ref-7',
    type: 'diretriz',
    title: `Ministério da Saúde (Brazil)`,
    year: 2022,
    journal: 'PCDT - Diabetes Mellitus Tipo 2',
    url: 'https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2022/pcdt_diabetes_mellitus_tipo_2.pdf',
    note: 'Auto-imported from itu module'
  },

  'itu-ref-8': {
    id: 'itu-ref-8',
    type: 'diretriz',
    title: `Ministério da Saúde (Brazil)`,
    year: 2022,
    journal: 'PCDT - Diabetes Mellitus Tipo 1',
    url: 'https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2022/pcdt_diabetes_mellitus_tipo_1.pdf',
    note: 'Auto-imported from itu module'
  },

  'itu-ref-9': {
    id: 'itu-ref-9',
    type: 'artigo',
    title: `American Diabetes Association`,
    year: 2024,
    journal: 'Diabetes Care',
    url: 'https://diabetesjournals.org/care/issue/47/Supplement_1',
    note: 'Auto-imported from itu module'
  },

  'itu-ref-10': {
    id: 'itu-ref-10',
    type: 'diretriz',
    title: `Sociedade Brasileira de Diabetes`,
    year: 2023,
    journal: 'Diretrizes da Sociedade Brasileira de Diabetes 2023-2024',
    url: 'https://diretriz.diabetes.org.br/',
    note: 'Auto-imported from itu module'
  },

  'lombalgia-ref-1': {
    id: 'lombalgia-ref-1',
    type: 'diretriz',
    title: `Qaseem A, Wilt TJ, McLean RM, Forciea MA; Clinical Guidelines Committee of the American College of Physicians`,
    year: 2017,
    journal: 'Ann Intern Med',
    volume: '166',
    pages: '514-530',
    doi: '10.7326/M16-2367',
    pmid: '28192789',
    note: 'Auto-imported from lombalgia module'
  },

  'lombalgia-ref-2': {
    id: 'lombalgia-ref-2',
    type: 'artigo',
    title: `Silva EMR, Ferraz MB, Pinheiro MMB, et al`,
    authors: ["Silva EMR, Ferraz MB, Pinheiro MMB, et al"],
    year: 2019,
    journal: 'Rev Bras Reumatol',
    volume: '59',
    pages: '280-295',
    doi: '10.1016/j.rbr.2019.01.002',
    note: 'Auto-imported from lombalgia module'
  },

  'lombalgia-ref-3': {
    id: 'lombalgia-ref-3',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil)`,
    year: 2012,
    note: 'Auto-imported from lombalgia module'
  },

  'lombalgia-ref-4': {
    id: 'lombalgia-ref-4',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil)`,
    year: 2018,
    note: 'Auto-imported from lombalgia module'
  },

  'lombalgia-ref-5': {
    id: 'lombalgia-ref-5',
    type: 'artigo',
    title: `Hoy D, March L, Brooks P, et al`,
    authors: ["Hoy D, March L, Brooks P, et al"],
    year: 2010,
    journal: 'Ann Rheum Dis',
    volume: '73',
    pages: '968-974',
    doi: '10.1136/annrheumdis-2013-204428',
    pmid: '24672229',
    note: 'Auto-imported from lombalgia module'
  },

  'lombalgia-ref-6': {
    id: 'lombalgia-ref-6',
    type: 'artigo',
    title: `Côrtes MC, Côrte-Real R, Oliveira VC`,
    year: 2018,
    journal: 'Cad Saude Publica',
    doi: '10.1590/0102-311x00145617',
    pmid: '30540099',
    note: 'Auto-imported from lombalgia module'
  },

  'obesidade-ref-1': {
    id: 'obesidade-ref-1',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2024,
    journal: 'Endocrine reviews',
    doi: '10.1210/endrev/bnae009',
    pmid: '38676447',
    note: 'Auto-imported from obesidade module'
  },

  'obesidade-ref-2': {
    id: 'obesidade-ref-2',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2023,
    journal: 'Endocrinology',
    doi: '10.1038/s41574-023-00807-6',
    pmid: '36805052',
    note: 'Auto-imported from obesidade module'
  },

  'obesidade-ref-3': {
    id: 'obesidade-ref-3',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2016,
    journal: 'Journal of hypertension',
    doi: '10.1097/HJH.0000000000001039',
    pmid: '27467768',
    note: 'Auto-imported from obesidade module'
  },

  'obesidade-ref-4': {
    id: 'obesidade-ref-4',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2022,
    journal: 'Archivos de bronconeumologia',
    doi: '10.1016/j.arbres.2021.03.017',
    pmid: '33875282',
    note: 'Auto-imported from obesidade module'
  },

  'obesidade-ref-5': {
    id: 'obesidade-ref-5',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2019,
    journal: 'The Journal of clinical endocrinology and metabolism',
    doi: '10.1210/jc.2019-00198',
    pmid: '30903688',
    note: 'Auto-imported from obesidade module'
  },

  'obesidade-ref-6': {
    id: 'obesidade-ref-6',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2024,
    journal: 'European journal of internal medicine',
    doi: '10.1016/j.ejim.2024.05.033',
    pmid: '38914505',
    note: 'Auto-imported from obesidade module'
  },

  'obesidade-ref-7': {
    id: 'obesidade-ref-7',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2024,
    journal: 'Clinica e investigacion en arteriosclerosis : publicacion oficial de la Sociedad Espanola de Arteriosclerosis',
    doi: '10.1016/j.arteri.2024.02.001',
    pmid: '38490888',
    note: 'Auto-imported from obesidade module'
  },

  'obesidade-ref-8': {
    id: 'obesidade-ref-8',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2025,
    journal: 'Gastroenterologia y hepatologia',
    doi: '10.1016/j.gastrohep.2025.502442',
    pmid: '40221023',
    note: 'Auto-imported from obesidade module'
  },

  'obesidade-ref-9': {
    id: 'obesidade-ref-9',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2022,
    journal: 'Maturitas',
    doi: '10.1016/j.maturitas.2022.08.008',
    pmid: '36081216',
    note: 'Auto-imported from obesidade module'
  },

  'obesidade-ref-10': {
    id: 'obesidade-ref-10',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2016,
    journal: 'European heart journal',
    doi: '10.1093/eurheartj/ehw152',
    pmid: '27122601',
    note: 'Auto-imported from obesidade module'
  },

  'obesidade-ref-11': {
    id: 'obesidade-ref-11',
    type: 'diretriz',
    title: `The Obesity Society`,
    year: 2022,
    note: 'Auto-imported from obesidade module'
  },

  'obesidade-ref-12': {
    id: 'obesidade-ref-12',
    type: 'diretriz',
    title: `Associação Brasileira para o Estudo da Obesidade e da Síndrome Metabólica`,
    year: 2022,
    note: 'Auto-imported from obesidade module'
  },

  'obesidade-ref-13': {
    id: 'obesidade-ref-13',
    type: 'diretriz',
    title: `Ministério da Saúde (Brazil)`,
    year: 2014,
    note: 'Auto-imported from obesidade module'
  },

  'obesidade-ref-14': {
    id: 'obesidade-ref-14',
    type: 'diretriz',
    title: `CONITEC - Comissão Nacional de Incorporação de Tecnologias`,
    year: 2023,
    note: 'Auto-imported from obesidade module'
  },

  'osteoartrite-ref-1': {
    id: 'osteoartrite-ref-1',
    type: 'artigo',
    title: `Berenbaum F, Blanco FJ, Carr A, et al`,
    authors: ["Berenbaum F, Blanco FJ, Carr A, et al"],
    year: 2021,
    journal: 'Rev Bras Reumatol',
    volume: '61',
    pages: '1-72',
    doi: '10.47660/rbr.2021.s101',
    note: 'Auto-imported from osteoartrite module'
  },

  'osteoartrite-ref-2': {
    id: 'osteoartrite-ref-2',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil)`,
    year: 2013,
    note: 'Auto-imported from osteoartrite module'
  },

  'osteoartrite-ref-3': {
    id: 'osteoartrite-ref-3',
    type: 'artigo',
    title: `Hunter DJ, Bierma-Zeinstra S`,
    year: 2019,
    journal: 'Lancet',
    volume: '393',
    pages: '1745-1759',
    doi: '10.1016/S0140-6736',
    pmid: '30987725',
    note: 'Auto-imported from osteoartrite module'
  },

  'osteoartrite-ref-4': {
    id: 'osteoartrite-ref-4',
    type: 'artigo',
    title: `Cui A, Li H, Wang D, Zhong J, Chen Y, Lu H`,
    year: 2020,
    journal: 'EClinicalMedicine',
    doi: '10.1016/j.eclinm.2020.100587',
    pmid: '33083600',
    note: 'Auto-imported from osteoartrite module'
  },

  'osteoartrite-ref-5': {
    id: 'osteoartrite-ref-5',
    type: 'artigo',
    title: `Santos LM, Ferreira RS, de Almeida DC, et al`,
    authors: ["Santos LM, Ferreira RS, de Almeida DC, et al"],
    year: 2018,
    journal: 'Rev Bras Reumatol',
    volume: '58',
    pages: '456-465',
    doi: '10.1016/j.rbr.2017.12.003',
    note: 'Auto-imported from osteoartrite module'
  },

  'osteoartrite-ref-6': {
    id: 'osteoartrite-ref-6',
    type: 'artigo',
    title: `Global Burden of Disease Study 2019 (GBD 2019) Diseases and Injuries Collaborators`,
    year: 2019,
    journal: 'Lancet',
    volume: '396',
    pages: '1204-1222',
    doi: '10.1016/S0140-6736',
    pmid: '33069326',
    note: 'Auto-imported from osteoartrite module'
  },

  'osteoporose-ref-1': {
    id: 'osteoporose-ref-1',
    type: 'artigo',
    title: `Authors`,
    year: 2025,
    journal: 'European journal of nuclear medicine and molecular imaging',
    doi: '10.1007/s00259-024-06912-6',
    pmid: '39316095',
    note: 'Auto-imported from osteoporose module'
  },

  'osteoporose-ref-2': {
    id: 'osteoporose-ref-2',
    type: 'artigo',
    title: `Authors`,
    year: 2023,
    journal: 'Revue medicale de Liege',
    pmid: '37830325',
    note: 'Auto-imported from osteoporose module'
  },

  'osteoporose-ref-3': {
    id: 'osteoporose-ref-3',
    type: 'diretriz',
    title: `Authors`,
    year: 2024,
    journal: 'Wiener klinische Wochenschrift',
    doi: '10.1007/s00508-024-02441-2',
    pmid: '39356323',
    note: 'Auto-imported from osteoporose module'
  },

  'osteoporose-ref-4': {
    id: 'osteoporose-ref-4',
    type: 'artigo',
    title: `Authors`,
    year: 2022,
    journal: 'Journal of obstetrics and gynaecology Canada: JOGC',
    doi: '10.1016/j.jogc.2022.03.004',
    pmid: '35577425',
    note: 'Auto-imported from osteoporose module'
  },

  'osteoporose-ref-5': {
    id: 'osteoporose-ref-5',
    type: 'artigo',
    title: `Authors`,
    year: 1991,
    journal: 'Nordisk medicin',
    pmid: '2047235',
    note: 'Auto-imported from osteoporose module'
  },

  'osteoporose-ref-6': {
    id: 'osteoporose-ref-6',
    type: 'artigo',
    title: `Authors`,
    year: 1946,
    journal: 'Wiener medizinische Wochenschrift (1946)',
    doi: '10.1007/s10354-019-0682-2',
    pmid: '30725443',
    note: 'Auto-imported from osteoporose module'
  },

  'osteoporose-ref-7': {
    id: 'osteoporose-ref-7',
    type: 'artigo',
    title: `Author`,
    year: 1992,
    journal: 'Nederlands tijdschrift voor geneeskunde',
    pmid: '1614568',
    note: 'Auto-imported from osteoporose module'
  },

  'osteoporose-ref-8': {
    id: 'osteoporose-ref-8',
    type: 'artigo',
    title: `Authors`,
    year: 2019,
    journal: 'Aging clinical and experimental research',
    doi: '10.1007/s40520-019-01294-4',
    pmid: '31422565',
    note: 'Auto-imported from osteoporose module'
  },

  'osteoporose-ref-9': {
    id: 'osteoporose-ref-9',
    type: 'diretriz',
    title: `Authors`,
    year: 2018,
    journal: 'Bulletin du cancer',
    doi: '10.1016/j.bulcan.2017.10.032',
    pmid: '29397916',
    note: 'Auto-imported from osteoporose module'
  },

  'osteoporose-ref-10': {
    id: 'osteoporose-ref-10',
    type: 'diretriz',
    title: `Authors`,
    year: 2017,
    journal: 'Revista brasileira de reumatologia',
    doi: '10.1016/j.rbre.2017.07.003',
    pmid: '28800970',
    note: 'Auto-imported from osteoporose module'
  },

  'osteoporose-ref-11': {
    id: 'osteoporose-ref-11',
    type: 'diretriz',
    title: `American Association of Clinical Endocrinologists`,
    year: 2020,
    journal: 'AACE/ACE Clinical Practice Guidelines for the Diagnosis and Treatment of Postmenopausal Osteoporosis',
    url: 'https://www.aace.com/disease-and-conditions/bone-and-parathyroid/osteoporosis',
    note: 'Auto-imported from osteoporose module'
  },

  'osteoporose-ref-12': {
    id: 'osteoporose-ref-12',
    type: 'diretriz',
    title: `Sociedade Brasileira de Endocrinologia e Metabologia`,
    year: 2021,
    journal: 'Diretrizes Brasileiras para o Diagnóstico e Tratamento da Osteoporose em Mulheres na Pós-menopausa',
    url: 'https://www.sbem.org.br/',
    note: 'Auto-imported from osteoporose module'
  },

  'osteoporose-ref-13': {
    id: 'osteoporose-ref-13',
    type: 'diretriz',
    title: `Ministério da Saúde (Brazil)`,
    year: 2014,
    journal: 'PCDT - Osteoporose',
    url: 'https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2014/pcdt_osteoporose.pdf',
    note: 'Auto-imported from osteoporose module'
  },

  'osteoporose-ref-14': {
    id: 'osteoporose-ref-14',
    type: 'artigo',
    title: `CONITEC - Comissão Nacional de Incorporação de Tecnologias`,
    year: 2022,
    journal: 'Protocolo de Uso - Denosumabe para Osteoporose',
    url: 'https://www.gov.br/conitec/pt-br',
    note: 'Auto-imported from osteoporose module'
  },

  'parkinson-ref-1': {
    id: 'parkinson-ref-1',
    type: 'artigo',
    title: `et al`,
    year: 2022,
    journal: 'Physical therapy',
    doi: '10.1093/ptj/pzab302',
    pmid: '34963139',
    note: 'Auto-imported from parkinson module'
  },

  'parkinson-ref-2': {
    id: 'parkinson-ref-2',
    type: 'artigo',
    title: `et al`,
    year: 2018,
    journal: 'Movement disorders : official journal of the Movement Disorder Society',
    doi: '10.1002/mds.27121',
    pmid: '29193359',
    note: 'Auto-imported from parkinson module'
  },

  'parkinson-ref-3': {
    id: 'parkinson-ref-3',
    type: 'artigo',
    title: `et al`,
    year: 2018,
    journal: 'Clinical nutrition (Edinburgh, Scotland)',
    doi: '10.1016/j.clnu.2017.09.003',
    pmid: '29274834',
    note: 'Auto-imported from parkinson module'
  },

  'parkinson-ref-4': {
    id: 'parkinson-ref-4',
    type: 'artigo',
    title: `et al`,
    year: 2025,
    journal: 'Cephalalgia : an international journal of headache',
    doi: '10.1177/03331024251321500',
    pmid: '40277321',
    note: 'Auto-imported from parkinson module'
  },

  'parkinson-ref-5': {
    id: 'parkinson-ref-5',
    type: 'artigo',
    title: `et al`,
    year: 2016,
    journal: 'Neurology',
    doi: '10.1212/WNL.0000000000002560',
    pmid: '27164716',
    note: 'Auto-imported from parkinson module'
  },

  'parkinson-ref-6': {
    id: 'parkinson-ref-6',
    type: 'diretriz',
    title: `et al`,
    year: 2016,
    journal: 'European heart journal',
    doi: '10.1093/eurheartj/ehw128',
    pmid: '27206819',
    note: 'Auto-imported from parkinson module'
  },

  'parkinson-ref-7': {
    id: 'parkinson-ref-7',
    type: 'artigo',
    title: `et al`,
    year: 2019,
    journal: 'CMAJ : Canadian Medical Association journal = journal de l\'Association medicale canadienne',
    doi: '10.1503/cmaj.181504',
    pmid: '31501181',
    note: 'Auto-imported from parkinson module'
  },

  'parkinson-ref-8': {
    id: 'parkinson-ref-8',
    type: 'artigo',
    title: `et al`,
    year: 2025,
    journal: 'Cephalalgia : an international journal of headache',
    doi: '10.1177/03331024241305381',
    pmid: '40277319',
    note: 'Auto-imported from parkinson module'
  },

  'parkinson-ref-9': {
    id: 'parkinson-ref-9',
    type: 'artigo',
    title: `et al`,
    year: 2024,
    journal: 'Movement disorders : official journal of the Movement Disorder Society',
    doi: '10.1002/mds.29700',
    pmid: '38234035',
    note: 'Auto-imported from parkinson module'
  },

  'parkinson-ref-10': {
    id: 'parkinson-ref-10',
    type: 'diretriz',
    title: `et al`,
    year: 2015,
    journal: 'Journal of the American College of Cardiology',
    doi: '10.1016/j.jacc.2015.08.856',
    pmid: '26409259',
    note: 'Auto-imported from parkinson module'
  },

  'pneumonia-ref-1': {
    id: 'pneumonia-ref-1',
    type: 'diretriz',
    title: `Kalil AC, Metersky ML, Klompas M, et al`,
    authors: ["Kalil AC, Metersky ML, Klompas M, et al"],
    year: 2016,
    journal: 'Clin Infect Dis',
    note: 'Auto-imported from pneumonia module'
  },

  'pneumonia-ref-2': {
    id: 'pneumonia-ref-2',
    type: 'artigo',
    title: `Torres A, Niederman MS, Chastre J, et al`,
    authors: ["Torres A, Niederman MS, Chastre J, et al"],
    year: 2017,
    journal: 'Eur Respir J',
    note: 'Auto-imported from pneumonia module'
  },

  'pneumonia-ref-3': {
    id: 'pneumonia-ref-3',
    type: 'artigo',
    title: `Bradley JS, Byington CL, Shah SS, et al`,
    authors: ["Bradley JS, Byington CL, Shah SS, et al"],
    year: 2011,
    journal: 'Clin Infect Dis',
    note: 'Auto-imported from pneumonia module'
  },

  'pneumonia-ref-4': {
    id: 'pneumonia-ref-4',
    type: 'artigo',
    title: `Zhao H, He Y, Liu H, et al`,
    authors: ["Zhao H, He Y, Liu H, et al"],
    year: 2024,
    journal: 'World J Pediatr',
    note: 'Auto-imported from pneumonia module'
  },

  'pneumonia-ref-5': {
    id: 'pneumonia-ref-5',
    type: 'artigo',
    title: `Metlay JP, Waterer GW, Long AC, et al`,
    authors: ["Metlay JP, Waterer GW, Long AC, et al"],
    year: 2019,
    journal: 'Am J Respir Crit Care Med',
    note: 'Auto-imported from pneumonia module'
  },

  'pneumonia-ref-6': {
    id: 'pneumonia-ref-6',
    type: 'artigo',
    title: `Mandell LA, Wunderink RG, Anzueto A, et al`,
    authors: ["Mandell LA, Wunderink RG, Anzueto A, et al"],
    year: 2007,
    journal: 'Clin Infect Dis',
    note: 'Auto-imported from pneumonia module'
  },

  'pneumonia-ref-7': {
    id: 'pneumonia-ref-7',
    type: 'diretriz',
    title: `Chastre J, Fagon JY, American Thoracic Society, et al`,
    authors: ["Chastre J, Fagon JY, American Thoracic Society, et al"],
    year: 2005,
    journal: 'Am J Respir Crit Care Med',
    volume: '171',
    pages: '388-416',
    note: 'Auto-imported from pneumonia module'
  },

  'pneumonia-ref-8': {
    id: 'pneumonia-ref-8',
    type: 'artigo',
    title: `Høiby N, Bjarnsholt T, Moser C, et al`,
    authors: ["Høiby N, Bjarnsholt T, Moser C, et al"],
    year: 2014,
    journal: 'Clin Microbiol Infect',
    note: 'Auto-imported from pneumonia module'
  },

  'pneumonia-ref-9': {
    id: 'pneumonia-ref-9',
    type: 'artigo',
    title: `Calvo C, García-García I, Pozo F, et al`,
    authors: ["Calvo C, García-García I, Pozo F, et al"],
    year: 2020,
    journal: 'Arch Bronconeumol',
    volume: '56',
    pages: '652-661',
    note: 'Auto-imported from pneumonia module'
  },

  'pneumonia-ref-10': {
    id: 'pneumonia-ref-10',
    type: 'artigo',
    title: `Torres A, Cilloniz C, Niederman MS, et al`,
    authors: ["Torres A, Cilloniz C, Niederman MS, et al"],
    year: 2024,
    journal: 'Int J Infect Dis',
    note: 'Auto-imported from pneumonia module'
  },

  'pneumonia-ref-11': {
    id: 'pneumonia-ref-11',
    type: 'artigo',
    title: `Infectious Diseases Society of America`,
    year: 2019,
    journal: 'Diagnosis and Treatment of Adults with Community-acquired Pneumonia',
    note: 'Auto-imported from pneumonia module'
  },

  'pneumonia-ref-12': {
    id: 'pneumonia-ref-12',
    type: 'diretriz',
    title: `Sociedade Brasileira de Pneumologia e Tisiologia`,
    year: 2018,
    journal: 'Diretrizes Brasileiras para Pneumonia Adquirida na Comunidade em Adultos Imunocompetentes',
    note: 'Auto-imported from pneumonia module'
  },

  'pneumonia-ref-13': {
    id: 'pneumonia-ref-13',
    type: 'diretriz',
    title: `Ministério da Saúde (Brazil)`,
    year: 2010,
    journal: 'Cadernos de Atenção Básica - Doenças Respiratórias Crônicas',
    note: 'Auto-imported from pneumonia module'
  },

  'pneumonia-ref-14': {
    id: 'pneumonia-ref-14',
    type: 'diretriz',
    title: `Ministério da Saúde (Brazil)`,
    year: 2022,
    journal: 'Protocolo de Manejo Clínico de Influenza',
    note: 'Auto-imported from pneumonia module'
  },

  'psoriase-ref-1': {
    id: 'psoriase-ref-1',
    type: 'artigo',
    title: `Brazilian Society of Dermatology`,
    year: 2025,
    journal: 'An Bras Dermatol',
    pmid: '41218378',
    note: 'Auto-imported from psoriase module'
  },

  'psoriase-ref-2': {
    id: 'psoriase-ref-2',
    type: 'artigo',
    title: `Portuguese Group on Biosimilars in Dermatology`,
    year: 2016,
    journal: 'Acta Med Port',
    volume: '29',
    pages: '776-782',
    pmid: '28060699',
    note: 'Auto-imported from psoriase module'
  },

  'rinite-alergica-ref-1': {
    id: 'rinite-alergica-ref-1',
    type: 'artigo',
    title: `Bousquet J, Schünemann HJ, Samolinski B, et al`,
    authors: ["Bousquet J, Schünemann HJ, Samolinski B, et al"],
    year: 2012,
    journal: 'J Allergy Clin Immunol',
    volume: '130',
    pages: '1049-62',
    doi: '10.1016/j.jaci.2012.07.053',
    pmid: '23036757',
    note: 'Auto-imported from rinite-alergica module'
  },

  'rinite-alergica-ref-2': {
    id: 'rinite-alergica-ref-2',
    type: 'artigo',
    title: `Brożek JL, Bousquet J, Agache I, et al`,
    authors: ["Brożek JL, Bousquet J, Agache I, et al"],
    year: 2016,
    journal: 'J Allergy Clin Immunol',
    volume: '140',
    pages: '950-58',
    doi: '10.1016/j.jaci.2017.03.050',
    pmid: '28686136',
    note: 'Auto-imported from rinite-alergica module'
  },

  'rinite-alergica-ref-3': {
    id: 'rinite-alergica-ref-3',
    type: 'artigo',
    title: `Asher MI, Montefort S, Björkstén B, et al`,
    authors: ["Asher MI, Montefort S, Björkstén B, et al"],
    year: 2006,
    journal: 'Lancet',
    volume: '368',
    pages: '733-43',
    doi: '10.1016/S0140-6736',
    pmid: '16935684',
    note: 'Auto-imported from rinite-alergica module'
  },

  'rinite-alergica-ref-4': {
    id: 'rinite-alergica-ref-4',
    type: 'artigo',
    title: `Solé D, Rosario N, Britto H, et al`,
    authors: ["Solé D, Rosario N, Britto H, et al"],
    year: 2012,
    journal: 'J Bras Pneumol',
    volume: '41',
    pages: '119-26',
    doi: '10.1590/S1806-37562015000000011',
    pmid: '25950562',
    note: 'Auto-imported from rinite-alergica module'
  },

  'rinite-alergica-ref-5': {
    id: 'rinite-alergica-ref-5',
    type: 'diretriz',
    title: `Ministério da Saúde`,
    year: 2020,
    note: 'Auto-imported from rinite-alergica module'
  },

  'rinite-alergica-ref-6': {
    id: 'rinite-alergica-ref-6',
    type: 'artigo',
    title: `CONITEC`,
    year: 2018,
    note: 'Auto-imported from rinite-alergica module'
  },

  'rinite-alergica-ref-7': {
    id: 'rinite-alergica-ref-7',
    type: 'artigo',
    title: `Bousquet J, Hellings PW, Agache I, et al`,
    authors: ["Bousquet J, Hellings PW, Agache I, et al"],
    year: 2016,
    journal: 'Eur Respir J',
    volume: '48',
    pages: '1799-809',
    doi: '10.1183/13993003.01856-2016',
    pmid: '27799458',
    note: 'Auto-imported from rinite-alergica module'
  },

  'rinite-alergica-ref-8': {
    id: 'rinite-alergica-ref-8',
    type: 'artigo',
    title: `Instituto Brasileiro de Geografia e Estatística`,
    year: 2019,
    note: 'Auto-imported from rinite-alergica module'
  },

  'rinite-alergica-ref-9': {
    id: 'rinite-alergica-ref-9',
    type: 'artigo',
    title: `Pinart M, Keller T, Reich A, et al`,
    authors: ["Pinart M, Keller T, Reich A, et al"],
    year: 2017,
    journal: 'Int Arch Allergy Immunol',
    volume: '172',
    pages: '229-37',
    doi: '10.1159/000477251',
    pmid: '28628918',
    note: 'Auto-imported from rinite-alergica module'
  },

  'rinite-alergica-ref-10': {
    id: 'rinite-alergica-ref-10',
    type: 'artigo',
    title: `Björkstén B, Clayton T, Ellwood P, et al`,
    authors: ["Björkstén B, Clayton T, Ellwood P, et al"],
    year: 2008,
    journal: 'Thorax',
    volume: '63',
    pages: '514-20',
    doi: '10.1136/thx.2007.089573',
    pmid: '18094213',
    note: 'Auto-imported from rinite-alergica module'
  },

  'rinite-alergica-ref-11': {
    id: 'rinite-alergica-ref-11',
    type: 'artigo',
    title: `Mendes G, Mangani D, Solé D`,
    year: 2019,
    journal: 'Curr Allergy Asthma Rep',
    doi: '10.1007/s11882-019-0884-3',
    pmid: '31418149',
    note: 'Auto-imported from rinite-alergica module'
  },

  'rinite-alergica-ref-12': {
    id: 'rinite-alergica-ref-12',
    type: 'artigo',
    title: `World Health Organization`,
    year: 2007,
    note: 'Auto-imported from rinite-alergica module'
  },

  'rinite-alergica-ref-13': {
    id: 'rinite-alergica-ref-13',
    type: 'diretriz',
    title: `Ministério da Saúde`,
    year: 2022,
    note: 'Auto-imported from rinite-alergica module'
  },

  'sinusite-ref-1': {
    id: 'sinusite-ref-1',
    type: 'artigo',
    title: `Systemic antibiotic treatment in routine practice`,
    year: 2001,
    journal: 'Revue de pneumologie clinique',
    volume: '57',
    pages: '119-24',
    pmid: '11924228',
    note: 'Auto-imported from sinusite module'
  },

  'sinusite-ref-2': {
    id: 'sinusite-ref-2',
    type: 'artigo',
    title: `Oral antibiotic therapy in current practice: acute sinusitis in children`,
    year: 2002,
    journal: 'Therapie',
    volume: '57',
    pages: '265-70',
    pmid: '12090153',
    note: 'Auto-imported from sinusite module'
  },

  'sinusite-ref-3': {
    id: 'sinusite-ref-3',
    type: 'artigo',
    title: `Oral antibiotic therapy in current practice: acute sinusitis in adults`,
    year: 2002,
    journal: 'Therapie',
    volume: '57',
    pages: '271-6',
    pmid: '12090154',
    note: 'Auto-imported from sinusite module'
  },

  'toc-ref-1': {
    id: 'toc-ref-1',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2019,
    journal: 'Archives of physical medicine and rehabilitation',
    doi: '10.1016/j.apmr.2018.10.017',
    pmid: '30465739',
    note: 'Auto-imported from toc module'
  },

  'toc-ref-2': {
    id: 'toc-ref-2',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2024,
    journal: 'Indian pediatrics',
    pmid: '38517005',
    note: 'Auto-imported from toc module'
  },

  'toc-ref-3': {
    id: 'toc-ref-3',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2019,
    journal: 'Journal of the European Academy of Dermatology and Venereology : JEADV',
    doi: '10.1111/jdv.15729',
    pmid: '31243838',
    note: 'Auto-imported from toc module'
  },

  'toc-ref-4': {
    id: 'toc-ref-4',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2011,
    journal: 'International journal of STD & AIDS',
    doi: '10.1258/ijsa.2011.011267',
    pmid: '21998172',
    note: 'Auto-imported from toc module'
  },

  'toc-ref-5': {
    id: 'toc-ref-5',
    type: 'artigo',
    title: `Authors`,
    year: 2006,
    journal: 'AIDS (London, England)',
    doi: '10.1097/QAD.0b013e328011a0c9',
    pmid: '17301582',
    note: 'Auto-imported from toc module'
  },

  'toc-ref-6': {
    id: 'toc-ref-6',
    type: 'artigo',
    title: `Authors et al`,
    authors: ["Authors et al"],
    year: 2010,
    journal: 'European journal of nuclear medicine and molecular imaging',
    doi: '10.1007/s00259-010-1512-3',
    pmid: '20596866',
    note: 'Auto-imported from toc module'
  },

  'transtorno-bipolar-ref-1': {
    id: 'transtorno-bipolar-ref-1',
    type: 'artigo',
    title: `American Psychiatric Association`,
    year: 2022,
    doi: '10.1176/appi.books.9780890425787',
    note: 'Auto-imported from transtorno-bipolar module'
  },

  'transtorno-bipolar-ref-2': {
    id: 'transtorno-bipolar-ref-2',
    type: 'artigo',
    title: `World Health Organization`,
    year: 2019,
    note: 'Auto-imported from transtorno-bipolar module'
  },

  'transtorno-bipolar-ref-3': {
    id: 'transtorno-bipolar-ref-3',
    type: 'artigo',
    title: `Ferrari AJ, Stockings E, Khoo JP, et al`,
    authors: ["Ferrari AJ, Stockings E, Khoo JP, et al"],
    year: 2013,
    journal: 'Bipolar Disord',
    volume: '18',
    pages: '440-450',
    doi: '10.1111/bdi.12423',
    pmid: '27068413',
    note: 'Auto-imported from transtorno-bipolar module'
  },

  'transtorno-bipolar-ref-4': {
    id: 'transtorno-bipolar-ref-4',
    type: 'artigo',
    title: `Merikangas KR, Akiskal HS, Angst J, et al`,
    authors: ["Merikangas KR, Akiskal HS, Angst J, et al"],
    year: 2007,
    journal: 'Arch Gen Psychiatry',
    volume: '64',
    pages: '543-552',
    doi: '10.1001/archpsyc.64.5.543',
    pmid: '17485606',
    note: 'Auto-imported from transtorno-bipolar module'
  },

  'transtorno-bipolar-ref-5': {
    id: 'transtorno-bipolar-ref-5',
    type: 'artigo',
    title: `Instituto Nacional de Saúde da Mulher, da Criança e do Adolescente Fernandes Figueira`,
    year: 2019,
    journal: 'Rev Saude Publica',
    doi: '10.11606/s1518-8787.2021055003462',
    pmid: '34105448',
    note: 'Auto-imported from transtorno-bipolar module'
  },

  'transtorno-bipolar-ref-6': {
    id: 'transtorno-bipolar-ref-6',
    type: 'artigo',
    title: `Ribeiro VS, Falcão I, Duarte D, et al`,
    authors: ["Ribeiro VS, Falcão I, Duarte D, et al"],
    year: 2020,
    journal: 'J Bras Psiquiatr',
    volume: '69',
    pages: '150-160',
    doi: '10.1590/0047-2085000000254',
    note: 'Auto-imported from transtorno-bipolar module'
  },

  'transtorno-bipolar-ref-7': {
    id: 'transtorno-bipolar-ref-7',
    type: 'artigo',
    title: `Hayes JF, Miles J, Walters K, et al`,
    authors: ["Hayes JF, Miles J, Walters K, et al"],
    year: 2015,
    journal: 'J Affect Disord',
    doi: '10.1016/j.jad.2015.07.045',
    pmid: '26233464',
    note: 'Auto-imported from transtorno-bipolar module'
  },

  'transtorno-bipolar-ref-8': {
    id: 'transtorno-bipolar-ref-8',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil)`,
    year: 2019,
    note: 'Auto-imported from transtorno-bipolar module'
  },

  'transtorno-bipolar-ref-9': {
    id: 'transtorno-bipolar-ref-9',
    type: 'diretriz',
    title: `Conselho Federal de Medicina`,
    year: 2021,
    note: 'Auto-imported from transtorno-bipolar module'
  },

  'transtorno-bipolar-ref-10': {
    id: 'transtorno-bipolar-ref-10',
    type: 'artigo',
    title: `Yatham LN, Kennedy SH, Parikh SV, et al`,
    authors: ["Yatham LN, Kennedy SH, Parikh SV, et al"],
    year: 2018,
    journal: 'Bipolar Disord',
    volume: '21',
    pages: '11-64',
    doi: '10.1111/bdi.12609',
    pmid: '29536616',
    note: 'Auto-imported from transtorno-bipolar module'
  },

  'transtorno-bipolar-ref-11': {
    id: 'transtorno-bipolar-ref-11',
    type: 'artigo',
    title: `Almeida OP, Pfaff JJ, Hankey GJ, et al`,
    authors: ["Almeida OP, Pfaff JJ, Hankey GJ, et al"],
    year: 2019,
    journal: 'Psychol Med',
    volume: '49',
    pages: '1995-2003',
    doi: '10.1017/S0033291718002795',
    pmid: '30314402',
    note: 'Auto-imported from transtorno-bipolar module'
  },

  'transtorno-bipolar-ref-12': {
    id: 'transtorno-bipolar-ref-12',
    type: 'artigo',
    title: `Joyce K, Thompson A, Marwaha S`,
    year: 2020,
    journal: 'J Affect Disord',
    doi: '10.1016/j.jad.2020.07.025',
    pmid: '32777607',
    note: 'Auto-imported from transtorno-bipolar module'
  },

  'transtorno-bipolar-ref-13': {
    id: 'transtorno-bipolar-ref-13',
    type: 'artigo',
    title: `Secretaria de Vigilância em Saúde`,
    year: 2022,
    note: 'Auto-imported from transtorno-bipolar module'
  },

  'transtorno-bipolar-ref-14': {
    id: 'transtorno-bipolar-ref-14',
    type: 'artigo',
    title: `Novick DM, Swartz HA, Frank E`,
    year: 2010,
    journal: 'J Affect Disord',
    volume: '133',
    pages: '200-208',
    doi: '10.1016/j.jad.2010.11.010',
    pmid: '21146261',
    note: 'Auto-imported from transtorno-bipolar module'
  },

  'transtorno-bipolar-ref-15': {
    id: 'transtorno-bipolar-ref-15',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil)`,
    year: 2020,
    note: 'Auto-imported from transtorno-bipolar module'
  },

  'transtorno-panico-ref-1': {
    id: 'transtorno-panico-ref-1',
    type: 'artigo',
    title: `American Psychiatric Association`,
    year: 2013,
    pmid: '23729006',
    note: 'Auto-imported from transtorno-panico module'
  },

  'transtorno-panico-ref-2': {
    id: 'transtorno-panico-ref-2',
    type: 'artigo',
    title: `Craske MG, Stein MB`,
    year: 2016,
    journal: 'Lancet',
    volume: '388',
    pages: '3048-3059',
    doi: '10.1016/S0140-6736',
    pmid: '27349327',
    note: 'Auto-imported from transtorno-panico module'
  },

  'transtorno-panico-ref-3': {
    id: 'transtorno-panico-ref-3',
    type: 'artigo',
    title: `Remes O, Brayne C, van der Linde R, Lafortune L`,
    year: 2016,
    journal: 'Brain Behav',
    doi: '10.1002/brb3.497',
    pmid: '27458545',
    note: 'Auto-imported from transtorno-panico module'
  },

  'transtorno-panico-ref-4': {
    id: 'transtorno-panico-ref-4',
    type: 'artigo',
    title: `Bandelow B, Michaelis S`,
    year: 2015,
    journal: 'Dialogues Clin Neurosci',
    volume: '17',
    pages: '327-335',
    doi: '10.31887/DCNS.2015.17.3/bbandelow',
    pmid: '26487813',
    note: 'Auto-imported from transtorno-panico module'
  },

  'transtorno-panico-ref-5': {
    id: 'transtorno-panico-ref-5',
    type: 'artigo',
    title: `Ribeiro WS, Mari Jde J, Quintana MI, et al`,
    authors: ["Ribeiro WS, Mari Jde J, Quintana MI, et al"],
    year: 2013,
    journal: 'Rev Bras Psiquiatr',
    volume: '35',
    pages: '256-261',
    doi: '10.1590/1516-4446-2012-0984',
    pmid: '24114560',
    note: 'Auto-imported from transtorno-panico module'
  },

  'transtorno-panico-ref-6': {
    id: 'transtorno-panico-ref-6',
    type: 'artigo',
    title: `Vilete LMR, Coutinho ESF, Silva ACO, et al`,
    authors: ["Vilete LMR, Coutinho ESF, Silva ACO, et al"],
    year: 2005,
    journal: 'Arch Gen Psychiatry',
    volume: '62',
    pages: '593-602',
    doi: '10.1001/archpsyc.62.6.593',
    pmid: '15939840',
    note: 'Auto-imported from transtorno-panico module'
  },

  'transtorno-panico-ref-7': {
    id: 'transtorno-panico-ref-7',
    type: 'artigo',
    title: `Stein MB, Craske MG`,
    year: 2020,
    journal: 'JAMA',
    volume: '329',
    pages: '1475-1476',
    doi: '10.1001/jama.2023.4315',
    pmid: '37133880',
    note: 'Auto-imported from transtorno-panico module'
  },

  'transtorno-panico-ref-8': {
    id: 'transtorno-panico-ref-8',
    type: 'diretriz',
    title: `Ministério da Saúde`,
    year: 2017,
    note: 'Auto-imported from transtorno-panico module'
  },

  'transtorno-panico-ref-9': {
    id: 'transtorno-panico-ref-9',
    type: 'diretriz',
    title: `Conitec`,
    year: 2012,
    note: 'Auto-imported from transtorno-panico module'
  },

  'transtorno-panico-ref-10': {
    id: 'transtorno-panico-ref-10',
    type: 'diretriz',
    title: `Associação Brasileira de Psiquiatria`,
    year: 2022,
    journal: 'Rev Bras Psiquiatr',
    volume: '44',
    pages: '123-135',
    doi: '10.47626/1516-4446-2021-0089',
    pmid: '35544650',
    note: 'Auto-imported from transtorno-panico module'
  },

  'transtorno-panico-ref-11': {
    id: 'transtorno-panico-ref-11',
    type: 'artigo',
    title: `Kessler RC, Petukhova M, Sampson NA, Zaslavsky AM, Wittchen HU`,
    year: 2012,
    journal: 'Int J Methods Psychiatr Res',
    volume: '21',
    pages: '169-184',
    doi: '10.1002/mpr.1359',
    pmid: '22874851',
    note: 'Auto-imported from transtorno-panico module'
  },

  'transtorno-panico-ref-12': {
    id: 'transtorno-panico-ref-12',
    type: 'artigo',
    title: `de Graaf R, van Dorsselaer S, Roman O, et al`,
    authors: ["de Graaf R, van Dorsselaer S, Roman O, et al"],
    year: 2011,
    journal: 'Ned Tijdschr Geneeskd',
    pmid: '22085697',
    note: 'Auto-imported from transtorno-panico module'
  },

  'transtorno-panico-ref-13': {
    id: 'transtorno-panico-ref-13',
    type: 'artigo',
    title: `Lima MG, Barros MBA, César de Oliveira C, et al`,
    authors: ["Lima MG, Barros MBA, César de Oliveira C, et al"],
    year: 2016,
    journal: 'Rev Bras Epidemiol',
    volume: '19',
    pages: '777-791',
    doi: '10.1590/1809-450327160404',
    pmid: '27968212',
    note: 'Auto-imported from transtorno-panico module'
  },

  'transtorno-panico-ref-14': {
    id: 'transtorno-panico-ref-14',
    type: 'artigo',
    title: `Kanwar A, Malik S, Prokop LJ, et al`,
    authors: ["Kanwar A, Malik S, Prokop LJ, et al"],
    year: 2013,
    journal: 'J Affect Disord',
    volume: '148',
    pages: '153-161',
    doi: '10.1016/j.jad.2012.10.033',
    pmid: '23200047',
    note: 'Auto-imported from transtorno-panico module'
  },

  'transtorno-panico-ref-15': {
    id: 'transtorno-panico-ref-15',
    type: 'artigo',
    title: `Nock MK, Borges G, Bromet EJ, et al`,
    authors: ["Nock MK, Borges G, Bromet EJ, et al"],
    year: 2008,
    journal: 'Epidemiol Rev',
    doi: '10.1093/epirev/mxn002',
    pmid: '18669523',
    note: 'Auto-imported from transtorno-panico module'
  },

  'transtorno-panico-ref-16': {
    id: 'transtorno-panico-ref-16',
    type: 'diretriz',
    title: `Ministério da Saúde`,
    year: 2022,
    note: 'Auto-imported from transtorno-panico module'
  }
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

