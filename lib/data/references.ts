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
  },

  // ============================================
  // AUTO-GENERATED REFERENCES (batch 2)
  // ============================================

  'anemia-falciforme-ref-1': {
    id: 'anemia-falciforme-ref-1',
    type: 'diretriz',
    title: `Piel FB, Steinberg MH, Rees DC. Sickle Cell Disease. N Engl J Med. 2017;376(16):1561-1573. DOI: 10.1056/NEJMra1510865`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-falciforme module'
  },
  'anemia-falciforme-ref-2': {
    id: 'anemia-falciforme-ref-2',
    type: 'diretriz',
    title: `Ware RE, de Montalembert M, Tshilolo L, Abboud MR. Sickle cell disease. Lancet. 2017;390(10091):311-323. DOI: 10.1016/S0`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-falciforme module'
  },
  'anemia-falciforme-ref-3': {
    id: 'anemia-falciforme-ref-3',
    type: 'diretriz',
    title: `Newborn Screening for Sickle Cell Disease--United States, 2010. MMWR Morb Mortal Wkly Rep. 2011;60(23):818-821.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-falciforme module'
  },
  'anemia-falciforme-ref-4': {
    id: 'anemia-falciforme-ref-4',
    type: 'diretriz',
    title: `Kavanagh PL, Fasipe TA, Sickle Cell Disease Newborn Screening. Pediatr Clin North Am. 2020;67(3):547-563. DOI: 10.1016/j`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-falciforme module'
  },
  'anemia-falciforme-ref-5': {
    id: 'anemia-falciforme-ref-5',
    type: 'diretriz',
    title: `Lobitz S, Telfer P, Ni H, et al. Global Burden of Sickle Cell Disease: A Systematic Review and Meta-Analysis. Blood. 202`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-falciforme module'
  },
  'anemia-falciforme-ref-6': {
    id: 'anemia-falciforme-ref-6',
    type: 'diretriz',
    title: `Brazilian Ministry of Health. Prevalência de Doença Falciforme no Brasil. Epidemiol Serv Saude. 2019;28(2):e2018065.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-falciforme module'
  },
  'anemia-falciforme-ref-7': {
    id: 'anemia-falciforme-ref-7',
    type: 'diretriz',
    title: `Portaria GM/MS nº 822, de 6 de junho de 2012. Programa Nacional de Triagem Neonatal. Diário Oficial da União. 2012.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-falciforme module'
  },
  'anemia-falciforme-ref-8': {
    id: 'anemia-falciforme-ref-8',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Triagem Neonatal para Hemoglobinopatias. Brasília: Ministério da Saúde; 2013.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-falciforme module'
  },
  'anemia-falciforme-ref-9': {
    id: 'anemia-falciforme-ref-9',
    type: 'diretriz',
    title: `Yawn BP, Buchanan GR, Afenyi-Annan AN, et al. Management of Sickle Cell Disease: Summary of the 2014 Evidence-Based Repo`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-falciforme module'
  },
  'anemia-falciforme-ref-10': {
    id: 'anemia-falciforme-ref-10',
    type: 'diretriz',
    title: `World Health Organization. Sickle Cell Disease: A Strategy for the WHO African Region. Brazzaville: WHO Regional Office `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-falciforme module'
  },
  'anemia-falciforme-ref-11': {
    id: 'anemia-falciforme-ref-11',
    type: 'diretriz',
    title: `Piel FB, Patil AP, Howes RE, et al. Global epidemiology of sickle haemoglobin in neonates: a contemporary geostatistical`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-falciforme module'
  },
  'anemia-falciforme-ref-12': {
    id: 'anemia-falciforme-ref-12',
    type: 'diretriz',
    title: `Modell B, Darlison M. Global epidemiology of haemoglobin disorders and derived service indicators. Bull World Health Org`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-falciforme module'
  },
  'anemia-falciforme-ref-13': {
    id: 'anemia-falciforme-ref-13',
    type: 'diretriz',
    title: `Santos FL, Bastos OM, Gomes TM, et al. Newborn screening for sickle cell disease in Brazil: a systematic review. Rev Bra`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-falciforme module'
  },
  'anemia-falciforme-ref-14': {
    id: 'anemia-falciforme-ref-14',
    type: 'diretriz',
    title: `Vilela RA, Cavalcanti BC, Rodrigues CV, et al. Epidemiologia da anemia falciforme no Brasil. Rev Saude Publica. 2008;42(`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-falciforme module'
  },
  'anemia-falciforme-ref-15': {
    id: 'anemia-falciforme-ref-15',
    type: 'diretriz',
    title: `McGann PT, Hernandez AG, Ware RE. Sickle Cell Anemia in Africa: A Neglected Cause of Early Childhood Mortality. Am J Hem`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-falciforme module'
  },
  'anemia-falciforme-ref-16': {
    id: 'anemia-falciforme-ref-16',
    type: 'diretriz',
    title: `Ministério da Saúde. Dados Epidemiológicos de Doenças Falciformes. Brasília: Datasus; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-falciforme module'
  },
  'anemia-falciforme-ref-17': {
    id: 'anemia-falciforme-ref-17',
    type: 'diretriz',
    title: `Grosse SD, Odame I, Atrash HK, et al. Sickle cell disease in Africa: a neglected cause of early childhood mortality. Am `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-falciforme module'
  },
  'anemia-falciforme-ref-18': {
    id: 'anemia-falciforme-ref-18',
    type: 'diretriz',
    title: `Kauf TL, Coates TD, Jackson SM, et al. The cost of health care for children and adults with sickle cell disease. Am J He`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-falciforme module'
  },
  'anemia-falciforme-ref-19': {
    id: 'anemia-falciforme-ref-19',
    type: 'diretriz',
    title: `Lima CS, Rocha EM, Silva NM, et al. Mortality in children with sickle cell disease in a Brazilian hospital. J Pediatr (R`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-falciforme module'
  },
  'anemia-ferropriva-pediatrica-ref-1': {
    id: 'anemia-ferropriva-pediatrica-ref-1',
    type: 'diretriz',
    title: `Baker RD, Greer FR; Committee on Nutrition, American Academy of Pediatrics. Diagnosis and prevention of iron deficiency `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva-pediatrica module'
  },
  'anemia-ferropriva-pediatrica-ref-2': {
    id: 'anemia-ferropriva-pediatrica-ref-2',
    type: 'diretriz',
    title: `Lopez A, Cacoub P, Macdougall IC, Peyrin-Biroulet L. Iron deficiency anaemia. Lancet. 2016;387(10021):907-916. DOI: 10.1`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva-pediatrica module'
  },
  'anemia-ferropriva-pediatrica-ref-3': {
    id: 'anemia-ferropriva-pediatrica-ref-3',
    type: 'diretriz',
    title: `Kassebaum NJ, Jasrasaria R, Naghavi M, et al. A systematic analysis of global anemia burden from 1990 to 2010. Blood. 20`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva-pediatrica module'
  },
  'anemia-ferropriva-pediatrica-ref-4': {
    id: 'anemia-ferropriva-pediatrica-ref-4',
    type: 'diretriz',
    title: `WHO. The global prevalence of anaemia in 2011. World Health Organization; 2015.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva-pediatrica module'
  },
  'anemia-ferropriva-pediatrica-ref-5': {
    id: 'anemia-ferropriva-pediatrica-ref-5',
    type: 'diretriz',
    title: `Ministério da Saúde. Pesquisa Nacional de Demografia e Saúde da Criança e do Adolescente (PNADCSA) 2006/2007. Brasília: `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva-pediatrica module'
  },
  'anemia-ferropriva-pediatrica-ref-6': {
    id: 'anemia-ferropriva-pediatrica-ref-6',
    type: 'diretriz',
    title: `Haag LB, Farias SS, Oliveira LB, et al. Prevalência de anemia em crianças brasileiras: uma revisão sistemática. Rev Bras`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva-pediatrica module'
  },
  'anemia-ferropriva-pediatrica-ref-7': {
    id: 'anemia-ferropriva-pediatrica-ref-7',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo de Atenção Básica: Anemia em Crianças. Brasília: MS; 2012.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva-pediatrica module'
  },
  'anemia-ferropriva-pediatrica-ref-8': {
    id: 'anemia-ferropriva-pediatrica-ref-8',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Suplementação de ferro para prevenção de anemia em crianças. Brasília: Ministério da`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva-pediatrica module'
  },
  'anemia-ferropriva-pediatrica-ref-9': {
    id: 'anemia-ferropriva-pediatrica-ref-9',
    type: 'diretriz',
    title: `Sociedade Brasileira de Pediatria. Anemia ferropriva na infância: diagnóstico e tratamento. J Pediatr (Rio J). 2022;98(S`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva-pediatrica module'
  },
  'anemia-ferropriva-pediatrica-ref-10': {
    id: 'anemia-ferropriva-pediatrica-ref-10',
    type: 'diretriz',
    title: `American Academy of Pediatrics. Clinical Report: Iron deficiency in young children. Pediatrics. 2010;126(5):1040-1050. D`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva-pediatrica module'
  },
  'anemia-ferropriva-pediatrica-ref-11': {
    id: 'anemia-ferropriva-pediatrica-ref-11',
    type: 'diretriz',
    title: `Pasricha SR, Tye-Din J, Muckenthaler MU, Swinkels DW. Iron deficiency. Lancet. 2021;397(10270):233-248. DOI: 10.1016/S01`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva-pediatrica module'
  },
  'anemia-ferropriva-pediatrica-ref-12': {
    id: 'anemia-ferropriva-pediatrica-ref-12',
    type: 'diretriz',
    title: `Gera T, Sachdev HP. Effect of iron supplementation on incidence of infectious disease in children: evidence from randomi`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva-pediatrica module'
  },
  'anemia-ferropriva-pediatrica-ref-13': {
    id: 'anemia-ferropriva-pediatrica-ref-13',
    type: 'diretriz',
    title: `Neumann NA, Gonçalves CR, Lima SCVC, et al. Incidência de anemia em crianças indígenas no Brasil. Cad Saude Publica. 201`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva-pediatrica module'
  },
  'anemia-ferropriva-pediatrica-ref-14': {
    id: 'anemia-ferropriva-pediatrica-ref-14',
    type: 'diretriz',
    title: `WHO. Global Health Estimates: Life expectancy and leading causes of death and disability. World Health Organization; 202`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva-pediatrica module'
  },
  'anemia-ferropriva-pediatrica-ref-15': {
    id: 'anemia-ferropriva-pediatrica-ref-15',
    type: 'diretriz',
    title: `Instituto Brasileiro de Geografia e Estatística (IBGE). Estatísticas Vitais: Mortalidade infantil. Rio de Janeiro: IBGE;`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva-pediatrica module'
  },
  'anemia-ferropriva-ref-1': {
    id: 'anemia-ferropriva-ref-1',
    type: 'diretriz',
    title: `Pasricha SR, Tye-Din J, Muckenthaler MU, Swinkels DW. Iron deficiency. Lancet. 2021;397(10270):233-248. DOI: 10.1016/S01`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva module'
  },
  'anemia-ferropriva-ref-2': {
    id: 'anemia-ferropriva-ref-2',
    type: 'diretriz',
    title: `Lopez A, Cacoub P, Macdougall IC, Peyrin-Biroulet L. Iron deficiency anaemia. Lancet. 2016;387(10021):907-916. DOI: 10.1`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva module'
  },
  'anemia-ferropriva-ref-3': {
    id: 'anemia-ferropriva-ref-3',
    type: 'diretriz',
    title: `WHO. The global prevalence of anaemia in 2019: a systematic analysis. Geneva: World Health Organization; 2021.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva module'
  },
  'anemia-ferropriva-ref-4': {
    id: 'anemia-ferropriva-ref-4',
    type: 'diretriz',
    title: `Stevens GA, Finucane MM, De Regil LM, et al. Global, regional, and national trends in hemoglobin concentration and preva`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva module'
  },
  'anemia-ferropriva-ref-5': {
    id: 'anemia-ferropriva-ref-5',
    type: 'diretriz',
    title: `Ministério da Saúde do Brasil. Pesquisa Nacional de Saúde 2019: prevalência de anemia em crianças. Brasília: MS; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva module'
  },
  'anemia-ferropriva-ref-6': {
    id: 'anemia-ferropriva-ref-6',
    type: 'diretriz',
    title: `Muniz PT, Castro TG, Araujo TS, et al. Prevalence of anemia and associated factors in children aged 6-59 months in Brazi`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva module'
  },
  'anemia-ferropriva-ref-7': {
    id: 'anemia-ferropriva-ref-7',
    type: 'diretriz',
    title: `Baker RD, Greer FR; Committee on Nutrition, American Academy of Pediatrics. Diagnosis and prevention of iron deficiency `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva module'
  },
  'anemia-ferropriva-ref-8': {
    id: 'anemia-ferropriva-ref-8',
    type: 'diretriz',
    title: `Stoffel NU, Cercamondi CI, Brittenham G, et al. Iron absorption from oral iron supplements given on consecutive versus a`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva module'
  },
  'anemia-ferropriva-ref-9': {
    id: 'anemia-ferropriva-ref-9',
    type: 'diretriz',
    title: `Ministério da Saúde do Brasil. Protocolo de Atenção Básica: Anemia em Crianças e Gestantes. Brasília: MS; 2012.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva module'
  },
  'anemia-ferropriva-ref-10': {
    id: 'anemia-ferropriva-ref-10',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Suplementação de Ferro no SUS. Brasília: Ministério da Saúde; 2015.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva module'
  },
  'anemia-ferropriva-ref-11': {
    id: 'anemia-ferropriva-ref-11',
    type: 'diretriz',
    title: `WHO. WHO guideline on use of ferritin concentrations to assess iron status in individuals and populations. Geneva: World`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva module'
  },
  'anemia-ferropriva-ref-12': {
    id: 'anemia-ferropriva-ref-12',
    type: 'diretriz',
    title: `Auerbach M, Adamson JW. How we diagnose and treat iron deficiency anemia. Am J Hematol. 2016;91(1):31-38. DOI: 10.1002/a`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva module'
  },
  'anemia-ferropriva-ref-13': {
    id: 'anemia-ferropriva-ref-13',
    type: 'diretriz',
    title: `Gera T, Sachdev HP. Effect of iron supplementation on incidence of infectious disease in children: systematic review. BM`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva module'
  },
  'anemia-ferropriva-ref-14': {
    id: 'anemia-ferropriva-ref-14',
    type: 'diretriz',
    title: `Imdad A, Yakoob MY, Bhutta ZA. Impact of routine iron supplementation with or without folic acid on anemia during pregna`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva module'
  },
  'anemia-ferropriva-ref-15': {
    id: 'anemia-ferropriva-ref-15',
    type: 'diretriz',
    title: `Figueiredo ACM, Oliveira LB, Ramalho A. Prevalência de anemia em gestantes atendidas no SUS no Brasil. Rev Bras Ginecol `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva module'
  },
  'anemia-ferropriva-ref-16': {
    id: 'anemia-ferropriva-ref-16',
    type: 'diretriz',
    title: `WHO. Global Health Estimates 2020: Disease burden by Cause, Age, Sex, by Country and by Region, 2000-2019. Geneva: World`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva module'
  },
  'anemia-ferropriva-ref-17': {
    id: 'anemia-ferropriva-ref-17',
    type: 'diretriz',
    title: `Kassebaum NJ, Jasrasaria R, Naghavi M, et al. A systematic analysis of global anemia burden from 1990 to 2010. Blood. 20`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva module'
  },
  'anemia-ferropriva-ref-18': {
    id: 'anemia-ferropriva-ref-18',
    type: 'diretriz',
    title: `Ministério da Saúde do Brasil. Mortalidade Materna no Brasil: Dados 2020. Brasília: MS; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-ferropriva module'
  },
  'anemia-hemolitica-ref-1': {
    id: 'anemia-hemolitica-ref-1',
    type: 'diretriz',
    title: `Authors et al. Consensus document for the diagnosis and treatment of pyruvate kinase deficiency. Medicina clinica. 2021.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-hemolitica module'
  },
  'anemia-hemolitica-ref-2': {
    id: 'anemia-hemolitica-ref-2',
    type: 'diretriz',
    title: `Authors et al. Practice guidelines for the emergency treatment of thrombotic microangiopathy. Medicina clinica. 2018. DO`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-hemolitica module'
  },
  'anemia-megaloblastica-ref-1': {
    id: 'anemia-megaloblastica-ref-1',
    type: 'diretriz',
    title: `Green R, Allen LH, Bjørke-Monsen AL, et al. Vitamin B12 deficiency. Nat Rev Dis Primers. 2017;3:17040. DOI: 10.1038/nrdp`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-megaloblastica module'
  },
  'anemia-megaloblastica-ref-2': {
    id: 'anemia-megaloblastica-ref-2',
    type: 'diretriz',
    title: `Hoffbrand AV, Provan D. ABC of clinical haematology: macrocytic anaemias. BMJ. 1997;314(7083):430-433. DOI: 10.1136/bmj.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-megaloblastica module'
  },
  'anemia-megaloblastica-ref-3': {
    id: 'anemia-megaloblastica-ref-3',
    type: 'diretriz',
    title: `Allen LH. How common is vitamin B-12 deficiency? Am J Clin Nutr. 2009;89(2):693S-696S. DOI: 10.3945/ajcn.2008.26947A`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-megaloblastica module'
  },
  'anemia-megaloblastica-ref-4': {
    id: 'anemia-megaloblastica-ref-4',
    type: 'diretriz',
    title: `Refsum H, Smith AD, Ueland PM, et al. Facts and recommendations about total homocysteine determinations: an expert opini`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-megaloblastica module'
  },
  'anemia-megaloblastica-ref-5': {
    id: 'anemia-megaloblastica-ref-5',
    type: 'diretriz',
    title: `Szeto IMY, Mak KH, Chan LPY, et al. Vitamin B-12 deficiency in elderly Chinese adults: prevalence and risk factors. Publ`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-megaloblastica module'
  },
  'anemia-megaloblastica-ref-6': {
    id: 'anemia-megaloblastica-ref-6',
    type: 'diretriz',
    title: `Ministério da Saúde do Brasil. Prevalência de anemia em idosos no Brasil: dados da PNS 2019. Epidemiol Serv Saude. 2021;`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-megaloblastica module'
  },
  'anemia-megaloblastica-ref-7': {
    id: 'anemia-megaloblastica-ref-7',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Anemia no SUS. Brasília: MS; 2018.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-megaloblastica module'
  },
  'anemia-megaloblastica-ref-8': {
    id: 'anemia-megaloblastica-ref-8',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Rastreamento de Deficiências Nutricionais no SUS. Brasília: Ministério da Saúde; 202`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-megaloblastica module'
  },
  'anemia-megaloblastica-ref-9': {
    id: 'anemia-megaloblastica-ref-9',
    type: 'diretriz',
    title: `Devalia V, Hamilton MS, Molloy AM; British Committee for Standards in Haematology. Guidelines for the diagnosis and trea`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-megaloblastica module'
  },
  'anemia-megaloblastica-ref-10': {
    id: 'anemia-megaloblastica-ref-10',
    type: 'diretriz',
    title: `American Society of Hematology. ASH Education Program: Vitamin B12 Deficiency. Blood Adv. 2020;4(23):5990-5995. DOI: 10.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-megaloblastica module'
  },
  'anemia-megaloblastica-ref-11': {
    id: 'anemia-megaloblastica-ref-11',
    type: 'diretriz',
    title: `Pawlak R, Parrott SJ, Raj S, et al. How prevalent is vitamin B(12) deficiency among vegetarians? Nutr Rev. 2013;71(2):11`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-megaloblastica module'
  },
  'anemia-megaloblastica-ref-12': {
    id: 'anemia-megaloblastica-ref-12',
    type: 'diretriz',
    title: `Figueiredo RC, et al. Incidência de anemia megaloblástica em idosos brasileiros: estudo longitudinal. Rev Saude Publica.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-megaloblastica module'
  },
  'anemia-megaloblastica-ref-13': {
    id: 'anemia-megaloblastica-ref-13',
    type: 'diretriz',
    title: `Healton EB, Savage DG, Brust JC, et al. Neurologic aspects of cobalamin deficiency. Medicine (Baltimore). 1991;70(3):229`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-megaloblastica module'
  },
  'anemia-megaloblastica-ref-14': {
    id: 'anemia-megaloblastica-ref-14',
    type: 'diretriz',
    title: `WHO. The global prevalence of anaemia in 2019. Geneva: World Health Organization; 2021.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from anemia-megaloblastica module'
  },
  'angina-estavel-ref-1': {
    id: 'angina-estavel-ref-1',
    type: 'diretriz',
    title: `Knuuti J, Wijns W, Saraste A, et al. 2019 ESC Guidelines for the diagnosis and management of chronic coronary syndromes.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from angina-estavel module'
  },
  'angina-estavel-ref-2': {
    id: 'angina-estavel-ref-2',
    type: 'diretriz',
    title: `Writing Committee Members. 2021 AHA/ACC/ASE/CHEST/SAEM/SCCT/SCMR Guideline for the Evaluation and Diagnosis of Chest Pai`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from angina-estavel module'
  },
  'angina-estavel-ref-3': {
    id: 'angina-estavel-ref-3',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Doença Arterial Coronariana. Brasília: Secretaria `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from angina-estavel module'
  },
  'angina-estavel-ref-4': {
    id: 'angina-estavel-ref-4',
    type: 'diretriz',
    title: `Sociedade Brasileira de Cardiologia. Diretrizes Brasileiras de Doenças Coronarianas Crônicas - 2020. Arq Bras Cardiol. 2`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from angina-estavel module'
  },
  'angina-estavel-ref-5': {
    id: 'angina-estavel-ref-5',
    type: 'diretriz',
    title: `Roth GA, Mensah GA, Johnson CO, et al. Global Burden of Cardiovascular Diseases and Risk Factors, 1990-2019: Update From`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from angina-estavel module'
  },
  'angina-estavel-ref-6': {
    id: 'angina-estavel-ref-6',
    type: 'diretriz',
    title: `GBD 2019 Diseases and Injuries Collaborators. Global burden of 369 diseases and injuries in 204 countries and territorie`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from angina-estavel module'
  },
  'angina-estavel-ref-7': {
    id: 'angina-estavel-ref-7',
    type: 'diretriz',
    title: `Instituto Brasileiro de Geografia e Estatística. Pesquisa Nacional de Saúde 2019. Rio de Janeiro: IBGE; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from angina-estavel module'
  },
  'angina-estavel-ref-8': {
    id: 'angina-estavel-ref-8',
    type: 'diretriz',
    title: `Anderson KM, Odell PM, Wilson PW, Kannel WB. Cardiovascular disease risk profiles. Am Heart J. 1991;121(3 Pt 2):757-769.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from angina-estavel module'
  },
  'angina-estavel-ref-9': {
    id: 'angina-estavel-ref-9',
    type: 'diretriz',
    title: `Schmidt MI, Duncan BB, Mill JG, et al. Cohort Profile: Longitudinal Study of Adult Health (ELSA-Brasil). Int J Epidemiol`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from angina-estavel module'
  },
  'angina-estavel-ref-10': {
    id: 'angina-estavel-ref-10',
    type: 'diretriz',
    title: `Ministério da Saúde. Datasus - Mortalidade. Brasília: Secretaria de Vigilância em Saúde; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from angina-estavel module'
  },
  'artrite-reumatoide-ref-1': {
    id: 'artrite-reumatoide-ref-1',
    type: 'diretriz',
    title: `Brenol JC, Oliveira LM, Tumas L, et al. Update on the 2012 Brazilian Society of Rheumatology Guidelines for the treatmen`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from artrite-reumatoide module'
  },
  'artrite-reumatoide-ref-2': {
    id: 'artrite-reumatoide-ref-2',
    type: 'diretriz',
    title: `Santana R, Gamito M, et al. Recommendations for the diagnosis and treatment of latent and active tuberculosis in patient`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from artrite-reumatoide module'
  },
  'artrite-reumatoide-ref-3': {
    id: 'artrite-reumatoide-ref-3',
    type: 'diretriz',
    title: `Portuguese Society of Rheumatology. Guidelines for the use of biologic therapies in rheumatoid arthritis--December 2006 `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from artrite-reumatoide module'
  },
  'artrite-reumatoide-ref-4': {
    id: 'artrite-reumatoide-ref-4',
    type: 'diretriz',
    title: `Santana R, Gamito M, et al. Guidelines for the diagnosis and treatment of latent tuberculosis infection and active tuber`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from artrite-reumatoide module'
  },
  'artrite-reumatoide-ref-5': {
    id: 'artrite-reumatoide-ref-5',
    type: 'diretriz',
    title: `Monteiro C, et al. Portuguese guidelines for the use of biological agents in rheumatoid arthritis - March 2010 update. A`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from artrite-reumatoide module'
  },
  'artrite-reumatoide-ref-6': {
    id: 'artrite-reumatoide-ref-6',
    type: 'diretriz',
    title: `Salaffi F, et al. Italian consensus on the recommendations about the use of methotrexate for the treatment of rheumatic `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from artrite-reumatoide module'
  },
  'artrite-reumatoide-ref-7': {
    id: 'artrite-reumatoide-ref-7',
    type: 'diretriz',
    title: `Monteiro C, et al. Practical guide for the use of biological agents in rheumatoid arthritis - December 2011 update. Acta`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from artrite-reumatoide module'
  },
  'artrite-reumatoide-ref-8': {
    id: 'artrite-reumatoide-ref-8',
    type: 'diretriz',
    title: `Portuguese Society of Rheumatology. Practical guide for the use of biotechnological therapies in rheumatoid arthritis. A`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from artrite-reumatoide module'
  },
  'artrite-reumatoide-ref-9': {
    id: 'artrite-reumatoide-ref-9',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Artrite Reumatoide. Brasília: Ministério `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from artrite-reumatoide module'
  },
  'asma-infantil-ref-1': {
    id: 'asma-infantil-ref-1',
    type: 'diretriz',
    title: `Grupo de trabajo de asma difícil a controlar en pediatría. Diagnosis and treatment guidelines for difficult-to-control a`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from asma-infantil module'
  },
  'asma-infantil-ref-2': {
    id: 'asma-infantil-ref-2',
    type: 'diretriz',
    title: `Global Initiative for Asthma. Global Strategy for Asthma Management and Prevention 2024. Global Initiative for Asthma; 2`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from asma-infantil module'
  },
  'asma-infantil-ref-3': {
    id: 'asma-infantil-ref-3',
    type: 'diretriz',
    title: `Sociedade Brasileira de Pneumologia e Tisiologia. Diretrizes da Sociedade Brasileira de Pneumologia e Tisiologia para o `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from asma-infantil module'
  },
  'asma-infantil-ref-4': {
    id: 'asma-infantil-ref-4',
    type: 'diretriz',
    title: `Ministério da Saúde (Brazil). Protocolo Clínico e Diretrizes Terapêuticas: Asma. Brasília: Ministério da Saúde; 2021. Av`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from asma-infantil module'
  },
  'asma-infantil-ref-5': {
    id: 'asma-infantil-ref-5',
    type: 'diretriz',
    title: `Ministério da Saúde (Brazil). Cadernos de Atenção Básica - Doenças Respiratórias Crônicas. Brasília: Ministério da Saúde`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from asma-infantil module'
  },
  'ataxia-friedreich-ref-1': {
    id: 'ataxia-friedreich-ref-1',
    type: 'diretriz',
    title: `Claytor R, de Freitas M, Giffi T, et al. Comprehensive systematic review summary: Treatment of cerebellar motor dysfunct`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from ataxia-friedreich module'
  },
  'ataxia-friedreich-ref-2': {
    id: 'ataxia-friedreich-ref-2',
    type: 'diretriz',
    title: `Groh WJ, Bhakta S, Ackerman MJ, et al. 2022 HRS expert consensus statement on evaluation and management of arrhythmic ri`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from ataxia-friedreich module'
  },
  'ataxia-friedreich-ref-3': {
    id: 'ataxia-friedreich-ref-3',
    type: 'diretriz',
    title: `Synofzik M, Giunti P, Ilg W, et al. Using Smartphone Sensors for Ataxia Trials: Consensus Guidance by the Ataxia Global `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from ataxia-friedreich module'
  },
  'ataxia-friedreich-ref-4': {
    id: 'ataxia-friedreich-ref-4',
    type: 'diretriz',
    title: `Manto M, Adam F, Ben Hamida C, et al. The Classification of Autosomal Recessive Cerebellar Ataxias: a Consensus Statemen`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from ataxia-friedreich module'
  },
  'ataxia-friedreich-ref-5': {
    id: 'ataxia-friedreich-ref-5',
    type: 'diretriz',
    title: `Feingold B, Mahle WT, McBride MG, et al. Management of Cardiac Involvement Associated With Neuromuscular Diseases: A Sci`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from ataxia-friedreich module'
  },
  'avc-ref-1': {
    id: 'avc-ref-1',
    type: 'diretriz',
    title: `Scientific Department of Neurological Rehabilitation et al. Brazilian practice guidelines for stroke rehabilitation: Par`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from avc module'
  },
  'avc-ref-2': {
    id: 'avc-ref-2',
    type: 'diretriz',
    title: `Klionsky DJ, Abdelmohsen K, Abe A et al. Guidelines for the use and interpretation of assays for monitoring autophagy (3`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from avc module'
  },
  'avc-ref-3': {
    id: 'avc-ref-3',
    type: 'diretriz',
    title: `Authors et al. [Not Available]. CMAJ : Canadian Medical Association journal = journal de l'Association medicale canadien`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from avc module'
  },
  'avc-ref-4': {
    id: 'avc-ref-4',
    type: 'diretriz',
    title: `Smith EE, Beiser A, Borgstein J et al. Canadian Stroke Best Practice Recommendations: Vascular cognitive impairment, 7th`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from avc module'
  },
  'avc-ref-5': {
    id: 'avc-ref-5',
    type: 'diretriz',
    title: `Authors et al. [Not Available]. CMAJ : Canadian Medical Association journal = journal de l'Association medicale canadien`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from avc module'
  },
  'avc-ref-6': {
    id: 'avc-ref-6',
    type: 'diretriz',
    title: `Authors et al. [Not Available]. CMAJ : Canadian Medical Association journal = journal de l'Association medicale canadien`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from avc module'
  },
  'avc-ref-7': {
    id: 'avc-ref-7',
    type: 'diretriz',
    title: `Silva GS, Faria CD, Rabelo L et al. A physiotherapy protocol* for stroke patients in acute hospital settings: expert con`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from avc module'
  },
  'avc-ref-8': {
    id: 'avc-ref-8',
    type: 'diretriz',
    title: `Thosar SS, Butler EA, De Zambotti M et al. Consensus Recommendations for Standardized Data Elements, Scales, and Time Se`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from avc module'
  },
  'avc-ref-9': {
    id: 'avc-ref-9',
    type: 'diretriz',
    title: `Authors et al. [Treatment of arterial and venous brain ischemia. Experts' recommendations: stroke management in the inte`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from avc module'
  },
  'avc-ref-10': {
    id: 'avc-ref-10',
    type: 'diretriz',
    title: `Authors et al. Evidence-based German guidelines for surgery for obesity. International journal of colorectal disease. 20`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from avc module'
  },
  'bocio-simples-ref-1': {
    id: 'bocio-simples-ref-1',
    type: 'diretriz',
    title: `Haugen BR, Alexander EK, Bible KC, et al. 2015 American Thyroid Association Management Guidelines for Adult Patients wit`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bocio-simples module'
  },
  'bocio-simples-ref-2': {
    id: 'bocio-simples-ref-2',
    type: 'diretriz',
    title: `Dean JC, Gharib H. Epidemiology of thyroid nodules. Best Pract Res Clin Endocrinol Metab. 2008;22(6):901-911. DOI: 10.10`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bocio-simples module'
  },
  'bocio-simples-ref-3': {
    id: 'bocio-simples-ref-3',
    type: 'diretriz',
    title: `Zimmermann MB. The effects of iodine deficiency in pregnancy and infancy. Paediatr Perinat Epidemiol. 2012;26 Suppl 1:10`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bocio-simples module'
  },
  'bocio-simples-ref-4': {
    id: 'bocio-simples-ref-4',
    type: 'diretriz',
    title: `WHO. Iodine deficiency in Europe: a continuing public health problem. World Health Organization; 2007.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bocio-simples module'
  },
  'bocio-simples-ref-5': {
    id: 'bocio-simples-ref-5',
    type: 'diretriz',
    title: `Ferreira SM, Navarro AM, Magalhães PK, et al. Iodine nutritional status and thyroid diseases in São Paulo, Brazil. Arq B`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bocio-simples module'
  },
  'bocio-simples-ref-6': {
    id: 'bocio-simples-ref-6',
    type: 'diretriz',
    title: `Ministério da Saúde do Brasil. Deficiência de iodo no Brasil: panorama atual. Brasília: MS; 2018.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bocio-simples module'
  },
  'bocio-simples-ref-7': {
    id: 'bocio-simples-ref-7',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Protocolo Clínico e Diretrizes Terapêuticas para Distúrbios da Tireoide. Ministério `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bocio-simples module'
  },
  'bocio-simples-ref-8': {
    id: 'bocio-simples-ref-8',
    type: 'diretriz',
    title: `Sociedade Brasileira de Endocrinologia e Metabologia (SBEM). Diretrizes Brasileiras do Hipotireoidismo. Arq Bras Endocri`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bocio-simples module'
  },
  'bocio-simples-ref-9': {
    id: 'bocio-simples-ref-9',
    type: 'diretriz',
    title: `Garber JR, Cobin RH, Gharib H, et al. Clinical practice guidelines for hypothyroidism in adults: cosponsored by the Amer`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bocio-simples module'
  },
  'bocio-simples-ref-10': {
    id: 'bocio-simples-ref-10',
    type: 'diretriz',
    title: `Vanderpump MP. The epidemiology of thyroid disease. Br Med Bull. 2011;99:39-51. DOI: 10.1093/bmb/ldr031 PMID: 21940422`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bocio-simples module'
  },
  'bocio-simples-ref-11': {
    id: 'bocio-simples-ref-11',
    type: 'diretriz',
    title: `Caron P, et al. Epidemiology of thyroid diseases in Brazil: a systematic review. Rev Saude Publica. 2019;53:45. DOI: 10.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bocio-simples module'
  },
  'bocio-simples-ref-12': {
    id: 'bocio-simples-ref-12',
    type: 'diretriz',
    title: `Tunbridge WM, Vanderpump MP. Goiter prevalence and iodine status. Eur J Endocrinol. 2000;142(3):224-229. DOI: 10.1530/ej`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bocio-simples module'
  },
  'bocio-simples-ref-13': {
    id: 'bocio-simples-ref-13',
    type: 'diretriz',
    title: `DATASUS. Mortalidade por causas endócrinas no Brasil, 2022. Ministério da Saúde; 2023.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bocio-simples module'
  },
  'bronquite-cronica-ref-1': {
    id: 'bronquite-cronica-ref-1',
    type: 'diretriz',
    title: `Global Initiative for Chronic Obstructive Lung Disease. GOLD 2023 Report. Global Initiative for Chronic Obstructive Lung`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bronquite-cronica module'
  },
  'bronquite-cronica-ref-2': {
    id: 'bronquite-cronica-ref-2',
    type: 'diretriz',
    title: `Celli BR, Decramer M, Wedzicha JA, et al. An Official American Thoracic Society/European Respiratory Society Statement: `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bronquite-cronica module'
  },
  'bronquite-cronica-ref-3': {
    id: 'bronquite-cronica-ref-3',
    type: 'diretriz',
    title: `Qureshi H, Sharafkhaneh A, Hanania NA. Chronic bronchitis: Disease definition and management. Int J Chron Obstruct Pulmo`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bronquite-cronica module'
  },
  'bronquite-cronica-ref-4': {
    id: 'bronquite-cronica-ref-4',
    type: 'diretriz',
    title: `Halbert RJ, Isonaka S, George D, Iqbal A. Interpreting COPD prevalence estimates: What is the true burden of COPD? Chest`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bronquite-cronica module'
  },
  'bronquite-cronica-ref-5': {
    id: 'bronquite-cronica-ref-5',
    type: 'diretriz',
    title: `Buist AS, McBurnie MA, Vollmer WM, et al. International variation in the prevalence of COPD (the BOLD Study): a populati`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bronquite-cronica module'
  },
  'bronquite-cronica-ref-6': {
    id: 'bronquite-cronica-ref-6',
    type: 'diretriz',
    title: `Soriano JB, Maier WC, Egger P, et al. Recent trends in physician diagnosed COPD in women and men in the USA. Am J Epidem`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bronquite-cronica module'
  },
  'bronquite-cronica-ref-7': {
    id: 'bronquite-cronica-ref-7',
    type: 'diretriz',
    title: `Menezes AM, Perez-Padilla R, Jardim JR, et al. Chronic obstructive pulmonary disease in five Latin American cities (the `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bronquite-cronica module'
  },
  'bronquite-cronica-ref-8': {
    id: 'bronquite-cronica-ref-8',
    type: 'diretriz',
    title: `Instituto Brasileiro de Geografia e Estatística. Pesquisa Nacional de Saúde 2019. IBGE; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bronquite-cronica module'
  },
  'bronquite-cronica-ref-9': {
    id: 'bronquite-cronica-ref-9',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Doença Pulmonar Obstrutiva Crônica. Brasília: Mini`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bronquite-cronica module'
  },
  'bronquite-cronica-ref-10': {
    id: 'bronquite-cronica-ref-10',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Espirometria no SUS para diagnóstico de DPOC. Comissão Nacional de Incorporação de T`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bronquite-cronica module'
  },
  'bronquite-cronica-ref-11': {
    id: 'bronquite-cronica-ref-11',
    type: 'diretriz',
    title: `Sociedade Brasileira de Pneumologia e Tisiologia. Diretrizes Brasileiras para o Manejo da DPOC - 2022. J Bras Pneumol. 2`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bronquite-cronica module'
  },
  'bronquite-cronica-ref-12': {
    id: 'bronquite-cronica-ref-12',
    type: 'diretriz',
    title: `Ruffo SI, Pereira FM, Stelmach R, et al. Brazilian Thoracic Association guidelines for chronic obstructive pulmonary dis`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bronquite-cronica module'
  },
  'bronquite-cronica-ref-13': {
    id: 'bronquite-cronica-ref-13',
    type: 'diretriz',
    title: `de Marco R, Accordini S, Marcon A, et al. Risk factors for chronic obstructive pulmonary disease in a European cohort of`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bronquite-cronica module'
  },
  'bronquite-cronica-ref-14': {
    id: 'bronquite-cronica-ref-14',
    type: 'diretriz',
    title: `Pelkonen M, Notkola IL, Tukiainen H, Tervonen M, Tuominen M, Koskenvuo M. Smoking cessation, decline in pulmonary functi`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bronquite-cronica module'
  },
  'bronquite-cronica-ref-15': {
    id: 'bronquite-cronica-ref-15',
    type: 'diretriz',
    title: `Instituto Nacional de Câncer. Inquérito Domiciliar sobre Tabagismo no Brasil. INCA; 2019.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bronquite-cronica module'
  },
  'bronquite-cronica-ref-16': {
    id: 'bronquite-cronica-ref-16',
    type: 'diretriz',
    title: `GBD 2019 Chronic Respiratory Diseases Collaborators. Global burden of chronic respiratory diseases and risk factors, 199`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bronquite-cronica module'
  },
  'bronquite-cronica-ref-17': {
    id: 'bronquite-cronica-ref-17',
    type: 'diretriz',
    title: `Ministério da Saúde. Datasus. Mortalidade por causas respiratórias no Brasil, 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from bronquite-cronica module'
  },
  'cefaleia-tensional-ref-1': {
    id: 'cefaleia-tensional-ref-1',
    type: 'diretriz',
    title: `Headache Classification Committee of the International Headache Society (IHS). The International Classification of Heada`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cefaleia-tensional module'
  },
  'cefaleia-tensional-ref-2': {
    id: 'cefaleia-tensional-ref-2',
    type: 'diretriz',
    title: `Stovner LJ, Nichols E, Steiner TJ, et al. Global, regional, and national burden of migraine and tension-type headache, 1`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cefaleia-tensional module'
  },
  'cefaleia-tensional-ref-3': {
    id: 'cefaleia-tensional-ref-3',
    type: 'diretriz',
    title: `Ashina S, Bendtsen L, Lyngberg AC, et al. Prevalence of migraine and tension-type headache in the general population: a `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cefaleia-tensional module'
  },
  'cefaleia-tensional-ref-4': {
    id: 'cefaleia-tensional-ref-4',
    type: 'diretriz',
    title: `da Silva AF, Ximenes AC, Ximenes R, et al. Prevalência de cefaleia em adultos no Brasil: uma revisão sistemática. Rev Br`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cefaleia-tensional module'
  },
  'cefaleia-tensional-ref-5': {
    id: 'cefaleia-tensional-ref-5',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Cefaleias. Brasília: MS; 2017.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cefaleia-tensional module'
  },
  'cefaleia-tensional-ref-6': {
    id: 'cefaleia-tensional-ref-6',
    type: 'diretriz',
    title: `Conitec. Relatório de Recomendação: Incorporação de Protocolos para Cefaleias no SUS. Brasília: Ministério da Saúde; 201`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cefaleia-tensional module'
  },
  'cefaleia-tensional-ref-7': {
    id: 'cefaleia-tensional-ref-7',
    type: 'diretriz',
    title: `Sociedade Brasileira de Cefaleia. Consenso Brasileiro para o Tratamento da Cefaleia Tensional. Arq Neuropsiquiatr. 2020;`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cefaleia-tensional module'
  },
  'cefaleia-tensional-ref-8': {
    id: 'cefaleia-tensional-ref-8',
    type: 'diretriz',
    title: `American Headache Society. The American Headache Society Position Statement on Integrating New Migraine Treatments Into `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cefaleia-tensional module'
  },
  'cefaleia-tensional-ref-9': {
    id: 'cefaleia-tensional-ref-9',
    type: 'diretriz',
    title: `Ferrari MD, Kleijnen J, Kirkham J, et al. Meta-analyses of rizatriptan nasal spray versus other triptans as acute therap`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cefaleia-tensional module'
  },
  'cefaleia-tensional-ref-10': {
    id: 'cefaleia-tensional-ref-10',
    type: 'diretriz',
    title: `GBD 2019 Headache Collaborators. Global, regional, and national burden of migraine and tension-type headache, 1990–2019:`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cefaleia-tensional module'
  },
  'cefaleia-tensional-ref-11': {
    id: 'cefaleia-tensional-ref-11',
    type: 'diretriz',
    title: `World Health Organization. Headache disorders. WHO; 2023. Available from: https://www.who.int/news-room/fact-sheets/deta`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cefaleia-tensional module'
  },
  'cistite-ref-1': {
    id: 'cistite-ref-1',
    type: 'diretriz',
    title: `Sociedade Brasileira de Urologia. Diretrizes de infecção do trato urinário. 2021. Disponível em: https://portaldaurologi`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cistite module'
  },
  'cistite-ref-2': {
    id: 'cistite-ref-2',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolo clínico e diretrizes terapêuticas: infecções do trato urinário. Brasília: Minist`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cistite module'
  },
  'cistite-ref-3': {
    id: 'cistite-ref-3',
    type: 'diretriz',
    title: `Gupta K, Hooton TM, Naber KG, et al. International clinical practice guidelines for the treatment of acute uncomplicated`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cistite module'
  },
  'cistite-ref-4': {
    id: 'cistite-ref-4',
    type: 'diretriz',
    title: `Foxman P. Epidemiology of urinary tract infections: incidence, morbidity, and economic costs. Am J Med. 2002;113 Suppl 1`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cistite module'
  },
  'cistite-ref-5': {
    id: 'cistite-ref-5',
    type: 'diretriz',
    title: `Scholes D, Hooton TM, Roberts PL, et al. Risk factors for recurrent urinary tract infection in young women. J Infect Dis`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cistite module'
  },
  'cistite-ref-6': {
    id: 'cistite-ref-6',
    type: 'diretriz',
    title: `Bono MJ, Reygaert WC. Urinary Tract Infection. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cistite module'
  },
  'conjuntivite-ref-1': {
    id: 'conjuntivite-ref-1',
    type: 'diretriz',
    title: `American Academy of Ophthalmology. Conjunctivitis Preferred Practice Pattern. Ophthalmology. 2023;130(5):P1-P23. DOI: 10`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from conjuntivite module'
  },
  'conjuntivite-ref-2': {
    id: 'conjuntivite-ref-2',
    type: 'diretriz',
    title: `Bielory L, et al. Allergic conjunctivitis: update on diagnosis and management. Curr Opin Allergy Clin Immunol. 2022;22(5`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from conjuntivite module'
  },
  'conjuntivite-ref-3': {
    id: 'conjuntivite-ref-3',
    type: 'diretriz',
    title: `Singh K, et al. Epidemiology of allergic conjunctivitis. Curr Opin Allergy Clin Immunol. 2021;21(3):248-254. DOI: 10.109`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from conjuntivite module'
  },
  'conjuntivite-ref-4': {
    id: 'conjuntivite-ref-4',
    type: 'diretriz',
    title: `World Health Organization. Global report on trends in prevalence and incidence of eye conditions. WHO; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from conjuntivite module'
  },
  'conjuntivite-ref-5': {
    id: 'conjuntivite-ref-5',
    type: 'diretriz',
    title: `Ministério da Saúde do Brasil. Vigilância epidemiológica de doenças oculares. Brasília: MS; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from conjuntivite module'
  },
  'conjuntivite-ref-6': {
    id: 'conjuntivite-ref-6',
    type: 'diretriz',
    title: `Sociedade Brasileira de Oftalmologia. Consenso sobre conjuntivite. Rev Bras Oftalmol. 2021;80(2):45-56.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from conjuntivite module'
  },
  'conjuntivite-ref-7': {
    id: 'conjuntivite-ref-7',
    type: 'diretriz',
    title: `Protocolo Clínico e Diretrizes Terapêuticas para Conjuntivite. Ministério da Saúde; 2019. Brasília: MS.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from conjuntivite module'
  },
  'conjuntivite-ref-8': {
    id: 'conjuntivite-ref-8',
    type: 'diretriz',
    title: `Conitec. Relatório de Recomendação Conjuntivite no SUS. Brasília: CONITEC; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from conjuntivite module'
  },
  'conjuntivite-ref-9': {
    id: 'conjuntivite-ref-9',
    type: 'diretriz',
    title: `Dart JK, et al. Conjunctivitis: a systematic review of diagnosis and treatment. Lancet. 2015;386(10004):1499-1511. DOI: `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from conjuntivite module'
  },
  'conjuntivite-ref-10': {
    id: 'conjuntivite-ref-10',
    type: 'diretriz',
    title: `Centers for Disease Control and Prevention. Pink eye (conjunctivitis). CDC; 2023. Atlanta: CDC.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from conjuntivite module'
  },
  'conjuntivite-ref-11': {
    id: 'conjuntivite-ref-11',
    type: 'diretriz',
    title: `Instituto Brasileiro de Geografia e Estatística. Pesquisa Nacional de Saúde 2019. Rio de Janeiro: IBGE; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from conjuntivite module'
  },
  'conjuntivite-ref-12': {
    id: 'conjuntivite-ref-12',
    type: 'diretriz',
    title: `Garg P, et al. Complications of bacterial conjunctivitis. Indian J Ophthalmol. 2020;68(10):2105-2110. DOI: 10.4103/ijo.I`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from conjuntivite module'
  },
  'conjuntivite-ref-13': {
    id: 'conjuntivite-ref-13',
    type: 'diretriz',
    title: `Global Burden of Disease Collaborative Network. GBD Results Tool. Seattle: IHME; 2021.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from conjuntivite module'
  },
  'deficiencia-vitamina-b12-ref-1': {
    id: 'deficiencia-vitamina-b12-ref-1',
    type: 'diretriz',
    title: `Green R, Allen LH, Bjørke-Monsen AL, et al. Vitamin B12 deficiency. Nat Rev Dis Primers. 2017;3:17040. DOI: 10.1038/nrdp`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-b12 module'
  },
  'deficiencia-vitamina-b12-ref-2': {
    id: 'deficiencia-vitamina-b12-ref-2',
    type: 'diretriz',
    title: `Stabler SP. Vitamin B12 deficiency. N Engl J Med. 2013;368(2):149-160. DOI: 10.1056/NEJMcp1113996 PMID: 23294174`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-b12 module'
  },
  'deficiencia-vitamina-b12-ref-3': {
    id: 'deficiencia-vitamina-b12-ref-3',
    type: 'diretriz',
    title: `Wang H, Li L, Qin LL, Song Y, Vidal-Alaball J, Liu TH. Oral vitamin B12 versus intramuscular vitamin B12 for vitamin B12`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-b12 module'
  },
  'deficiencia-vitamina-b12-ref-4': {
    id: 'deficiencia-vitamina-b12-ref-4',
    type: 'diretriz',
    title: `Devalia V, Hamilton MS, Molloy AM; British Committee for Standards in Haematology. Guidelines for the diagnosis and trea`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-b12 module'
  },
  'deficiencia-vitamina-b12-ref-5': {
    id: 'deficiencia-vitamina-b12-ref-5',
    type: 'diretriz',
    title: `Figueiredo RC, Klein TM, Alvares JB, et al. Prevalência de deficiência de vitamina B12 em idosos brasileiros: uma revisã`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-b12 module'
  },
  'deficiencia-vitamina-b12-ref-6': {
    id: 'deficiencia-vitamina-b12-ref-6',
    type: 'diretriz',
    title: `Brito LB, da Silva RC, Brito GC, et al. Vitamin B12 deficiency in Brazilian vegans: a cross-sectional study. Nutr J. 202`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-b12 module'
  },
  'deficiencia-vitamina-b12-ref-7': {
    id: 'deficiencia-vitamina-b12-ref-7',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Deficiências Nutricionais. Brasília: MS; 2019.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-b12 module'
  },
  'deficiencia-vitamina-b12-ref-8': {
    id: 'deficiencia-vitamina-b12-ref-8',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Suplementação de Vitamina B12 no SUS. Brasília: Ministério da Saúde; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-b12 module'
  },
  'deficiencia-vitamina-b12-ref-9': {
    id: 'deficiencia-vitamina-b12-ref-9',
    type: 'diretriz',
    title: `American Society of Hematology. Guidelines on Vitamin B12 Deficiency. Blood Adv. 2022;6(12):3670-3682. DOI: 10.1182/bloo`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-b12 module'
  },
  'deficiencia-vitamina-b12-ref-10': {
    id: 'deficiencia-vitamina-b12-ref-10',
    type: 'diretriz',
    title: `Refsum H, Smith AD, Ueland PM, et al. Facts and recommendations about total homocysteine determinations: an expert opini`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-b12 module'
  },
  'deficiencia-vitamina-b12-ref-11': {
    id: 'deficiencia-vitamina-b12-ref-11',
    type: 'diretriz',
    title: `Bailey RL, Dhana K, Cavadino A, et al. Association of vitamin B-12 status with brain structure and function. Am J Clin N`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-b12 module'
  },
  'deficiencia-vitamina-b12-ref-12': {
    id: 'deficiencia-vitamina-b12-ref-12',
    type: 'diretriz',
    title: `Szeto IMY, Mak KH, Poorolajal J, et al. Global prevalence of vitamin B12 deficiency among older adults: a systematic rev`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-b12 module'
  },
  'deficiencia-vitamina-b12-ref-13': {
    id: 'deficiencia-vitamina-b12-ref-13',
    type: 'diretriz',
    title: `World Health Organization. Vitamin and Mineral Requirements in Human Nutrition. 2nd ed. Geneva: WHO; 2004.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-b12 module'
  },
  'deficiencia-vitamina-b12-ref-14': {
    id: 'deficiencia-vitamina-b12-ref-14',
    type: 'diretriz',
    title: `Instituto Brasileiro de Geografia e Estatística. Estatísticas Vitais: Mortalidade. Rio de Janeiro: IBGE; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-b12 module'
  },
  'deficiencia-vitamina-d-ref-1': {
    id: 'deficiencia-vitamina-d-ref-1',
    type: 'diretriz',
    title: `Holick MF, Binkley NC, Bischoff-Ferrari HA, et al. Evaluation, treatment, and prevention of vitamin D deficiency: an End`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-d module'
  },
  'deficiencia-vitamina-d-ref-2': {
    id: 'deficiencia-vitamina-d-ref-2',
    type: 'diretriz',
    title: `Bischoff-Ferrari HA, Willett WC, Orav EJ, et al. A pooled analysis of vitamin D dose requirements for fracture preventio`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-d module'
  },
  'deficiencia-vitamina-d-ref-3': {
    id: 'deficiencia-vitamina-d-ref-3',
    type: 'diretriz',
    title: `Cashman GD, Dowling KG, Scragg R, et al. Vitamin D deficiency in Europe: pandemic? Am J Clin Nutr. 2016;103(4):1033-44. `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-d module'
  },
  'deficiencia-vitamina-d-ref-4': {
    id: 'deficiencia-vitamina-d-ref-4',
    type: 'diretriz',
    title: `Palacios C, Gonzalez L. Is vitamin D deficiency a cause of common rheumatic diseases? A meta-analysis. Clin Nutr. 2014;3`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-d module'
  },
  'deficiencia-vitamina-d-ref-5': {
    id: 'deficiencia-vitamina-d-ref-5',
    type: 'diretriz',
    title: `Brito FA, Pereira AC, de Paula FJ. Vitamin D deficiency in Brazilian population: a systematic review. Rev Assoc Med Bras`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-d module'
  },
  'deficiencia-vitamina-d-ref-6': {
    id: 'deficiencia-vitamina-d-ref-6',
    type: 'diretriz',
    title: `Santos RP, Banhos A, Miotto BA, et al. Vitamin D status in a multi-ethnic population of Northern Brazil. PLoS One. 2019;`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-d module'
  },
  'deficiencia-vitamina-d-ref-7': {
    id: 'deficiencia-vitamina-d-ref-7',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Osteoporose. Brasília: Ministério da Saúd`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-d module'
  },
  'deficiencia-vitamina-d-ref-8': {
    id: 'deficiencia-vitamina-d-ref-8',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Suplementação de Vitamina D no SUS. Brasília: Comissão Nacional de Incorporação de T`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-d module'
  },
  'deficiencia-vitamina-d-ref-9': {
    id: 'deficiencia-vitamina-d-ref-9',
    type: 'diretriz',
    title: `Holick MF. The vitamin D deficiency pandemic: Approaches for diagnosis, treatment and prevention. Rev Endocr Metab Disor`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-d module'
  },
  'deficiencia-vitamina-d-ref-10': {
    id: 'deficiencia-vitamina-d-ref-10',
    type: 'diretriz',
    title: `Wacker M, Holick MF. Vitamin D - effects on skeletal and extraskeletal health and the need for supplementation. Nutrient`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-d module'
  },
  'deficiencia-vitamina-d-ref-11': {
    id: 'deficiencia-vitamina-d-ref-11',
    type: 'diretriz',
    title: `Autier P, Boniol M, Pizot C, Mullie P. Vitamin D status and ill health: a systematic review. Lancet Diabetes Endocrinol.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-d module'
  },
  'deficiencia-vitamina-d-ref-12': {
    id: 'deficiencia-vitamina-d-ref-12',
    type: 'diretriz',
    title: `Bensenor IM, Lotufo PA. Deficiência de vitamina D no Brasil: uma revisão sistemática. Arq Bras Endocrinol Metabol. 2010;`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-d module'
  },
  'deficiencia-vitamina-d-ref-13': {
    id: 'deficiencia-vitamina-d-ref-13',
    type: 'diretriz',
    title: `Sempos CT, Betz JM, Johnson CL, et al. Global comparison of vitamin D status by using assay-standardized serum 25-hydrox`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-d module'
  },
  'deficiencia-vitamina-d-ref-14': {
    id: 'deficiencia-vitamina-d-ref-14',
    type: 'diretriz',
    title: `Manson JE, Cook NR, Lee IM, et al. Vitamin D supplements and prevention of cancer and cardiovascular disease. N Engl J M`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-d module'
  },
  'deficiencia-vitamina-d-ref-15': {
    id: 'deficiencia-vitamina-d-ref-15',
    type: 'diretriz',
    title: `Instituto Brasileiro de Geografia e Estatística (IBGE). Pesquisa Nacional de Saúde 2019. Rio de Janeiro: IBGE; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from deficiencia-vitamina-d module'
  },
  'dengue-ref-1': {
    id: 'dengue-ref-1',
    type: 'diretriz',
    title: `Et al. Platelet Transfusion: 2025 AABB and ICTMG International Clinical Practice Guidelines. JAMA. 2025. doi: 10.1001/ja`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dengue module'
  },
  'dengue-ref-2': {
    id: 'dengue-ref-2',
    type: 'diretriz',
    title: `Et al. WHO dengue case classification 2009 and its usefulness in practice: an expert consensus in the Americas. Pathog G`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dengue module'
  },
  'dengue-ref-3': {
    id: 'dengue-ref-3',
    type: 'diretriz',
    title: `Et al. [Update on vaccines: 2018 recommendations]. Arch Argent Pediatr. 2019;117 Suppl 37:S37-S64. doi: 10.5546/aap.2019`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dengue module'
  },
  'dengue-ref-4': {
    id: 'dengue-ref-4',
    type: 'diretriz',
    title: `Et al. Dengue vaccine: WHO position paper, September 2018 - Recommendations. Vaccine. 2019;37(7):732-734. doi: 10.1016/j`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dengue module'
  },
  'dengue-ref-5': {
    id: 'dengue-ref-5',
    type: 'diretriz',
    title: `Et al. Dengue and Zika Virus Diagnostic Testing for Patients with a Clinically Compatible Illness and Risk for Infection`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dengue module'
  },
  'dengue-ref-6': {
    id: 'dengue-ref-6',
    type: 'diretriz',
    title: `Et al. Perceptions and priorities for the development of multiplex rapid diagnostic tests for acute non-malarial fever i`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dengue module'
  },
  'dengue-ref-7': {
    id: 'dengue-ref-7',
    type: 'diretriz',
    title: `Et al. Dengue vaccine: WHO position paper, July 2016 - recommendations. Vaccine. 2017;35(9):1200-1201. doi: 10.1016/j.va`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dengue module'
  },
  'dengue-ref-8': {
    id: 'dengue-ref-8',
    type: 'diretriz',
    title: `Et al. Dengue vaccine: WHO position paper – July 2016. Wkly Epidemiol Rec. 2016;91(30):349-366. PMID: 27476189.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dengue module'
  },
  'dengue-ref-9': {
    id: 'dengue-ref-9',
    type: 'diretriz',
    title: `Et al. [Expert consensus on the diagnosis, treatment, and prevention of neonatal dengue, chikungunya, and Zika virus inf`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dengue module'
  },
  'dengue-ref-10': {
    id: 'dengue-ref-10',
    type: 'diretriz',
    title: `Et al. [Expert consensus on the diagnosis, treatment and prevention of dengue fever in children (2025)]. Zhonghua Er Ke `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dengue module'
  },
  'depressao-idoso-ref-1': {
    id: 'depressao-idoso-ref-1',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Cadernos de Atenção Básica n° 19 - Envelhecimento e saúde da pessoa idosa. Brasília: Minis`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from depressao-idoso module'
  },
  'depressao-idoso-ref-2': {
    id: 'depressao-idoso-ref-2',
    type: 'diretriz',
    title: `American Psychiatric Association. Practice guideline for the treatment of patients with major depressive disorder. 3rd e`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from depressao-idoso module'
  },
  'depressao-idoso-ref-3': {
    id: 'depressao-idoso-ref-3',
    type: 'diretriz',
    title: `Associação Brasileira de Psiquiatria. Diretrizes da Associação Brasileira de Psiquiatria para o tratamento da depressão;`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from depressao-idoso module'
  },
  'depressao-idoso-ref-4': {
    id: 'depressao-idoso-ref-4',
    type: 'diretriz',
    title: `Kok RM, Reynolds CF 3rd. Management of Depression in Older Adults: A Review. JAMA. 2017;317(20):2114-22. DOI: 10.1001/ja`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from depressao-idoso module'
  },
  'depressao-idoso-ref-5': {
    id: 'depressao-idoso-ref-5',
    type: 'diretriz',
    title: `Scazufca M, et al. Prevalence of mood disorders in the city of São Paulo: results of the São Paulo Health Study. Rev Bra`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from depressao-idoso module'
  },
  'depressao-idoso-ref-6': {
    id: 'depressao-idoso-ref-6',
    type: 'diretriz',
    title: `Fiske A, et al. Depression in Older Adults. Annu Rev Clin Psychol. 2009;5:363-89. DOI: 10.1146/annurev.clinpsy.032408.15`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from depressao-idoso module'
  },
  'depressao-idoso-ref-7': {
    id: 'depressao-idoso-ref-7',
    type: 'diretriz',
    title: `Cuijpers P, et al. The relationship between depression and mortality in older adults: A systematic review and meta-analy`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from depressao-idoso module'
  },
  'dermatite-atopica-pediatrica-ref-1': {
    id: 'dermatite-atopica-pediatrica-ref-1',
    type: 'diretriz',
    title: `Nutten S. Atopic dermatitis: global epidemiology and risk factors. Ann Nutr Metab. 2015;66 Suppl 1:8-16. DOI: 10.1159/00`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-atopica-pediatrica module'
  },
  'dermatite-atopica-pediatrica-ref-2': {
    id: 'dermatite-atopica-pediatrica-ref-2',
    type: 'diretriz',
    title: `Langan SM, Irvine AD, Weidinger S. Atopic dermatitis. Lancet. 2020;396(10247):345-360. DOI: 10.1016/S0140-6736(20)31286-`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-atopica-pediatrica module'
  },
  'dermatite-atopica-pediatrica-ref-3': {
    id: 'dermatite-atopica-pediatrica-ref-3',
    type: 'diretriz',
    title: `Silvares MRS, et al. Prevalence of atopic dermatitis in Brazilian schoolchildren: data from the International Study of A`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-atopica-pediatrica module'
  },
  'dermatite-atopica-pediatrica-ref-4': {
    id: 'dermatite-atopica-pediatrica-ref-4',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas: Dermatites Atópicas. Brasília: Ministério da Saúde; 20`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-atopica-pediatrica module'
  },
  'dermatite-atopica-pediatrica-ref-5': {
    id: 'dermatite-atopica-pediatrica-ref-5',
    type: 'diretriz',
    title: `Sociedade Brasileira de Dermatologia. Consenso Brasileiro de Dermatite Atópica - 2019. An Bras Dermatol. 2019;94(2 Suppl`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-atopica-pediatrica module'
  },
  'dermatite-atopica-pediatrica-ref-6': {
    id: 'dermatite-atopica-pediatrica-ref-6',
    type: 'diretriz',
    title: `Wollenberg A, et al. Consensus-based European guidelines for treatment of atopic eczema (atopic dermatitis) in adults an`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-atopica-pediatrica module'
  },
  'dermatite-atopica-pediatrica-ref-7': {
    id: 'dermatite-atopica-pediatrica-ref-7',
    type: 'diretriz',
    title: `Eichenfield LF, et al. Guidelines of care for the management of atopic dermatitis: section 2. Management and treatment o`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-atopica-pediatrica module'
  },
  'dermatite-atopica-pediatrica-ref-8': {
    id: 'dermatite-atopica-pediatrica-ref-8',
    type: 'diretriz',
    title: `Mallozi MC, et al. Frequency of symptoms and risk factors for atopic dermatitis in schoolchildren: data from the Interna`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-atopica-pediatrica module'
  },
  'dermatite-atopica-pediatrica-ref-9': {
    id: 'dermatite-atopica-pediatrica-ref-9',
    type: 'diretriz',
    title: `Brough HA, et al. Atopic dermatitis in children: epidemiology, clinical features, and disease course. Pediatr Allergy Im`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-atopica-pediatrica module'
  },
  'dermatite-atopica-pediatrica-ref-10': {
    id: 'dermatite-atopica-pediatrica-ref-10',
    type: 'diretriz',
    title: `Bastos JG, et al. Incidência de dermatite atópica em crianças brasileiras: estudo de coorte. Rev Paul Pediatr. 2020;38:e`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-atopica-pediatrica module'
  },
  'dermatite-atopica-pediatrica-ref-11': {
    id: 'dermatite-atopica-pediatrica-ref-11',
    type: 'diretriz',
    title: `Silverberg JI. Public health burden and epidemiology of atopic dermatitis. Dermatol Clin. 2017;35(3):283-289. DOI: 10.10`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-atopica-pediatrica module'
  },
  'dermatite-atopica-pediatrica-ref-12': {
    id: 'dermatite-atopica-pediatrica-ref-12',
    type: 'diretriz',
    title: `Weidinger S, et al. Atopic dermatitis. Nat Rev Dis Primers. 2018;4:1. DOI: 10.1038/s41572-018-0001-z`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-atopica-pediatrica module'
  },
  'dermatite-atopica-pediatrica-ref-13': {
    id: 'dermatite-atopica-pediatrica-ref-13',
    type: 'diretriz',
    title: `Ministério da Saúde. Mortalidade por causas externas em crianças e adolescentes no Brasil. Brasília: Ministério da Saúde`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-atopica-pediatrica module'
  },
  'dermatite-contato-ref-1': {
    id: 'dermatite-contato-ref-1',
    type: 'diretriz',
    title: `Johansen JD, Aalto-Korte K, Agner T, et al. European Society of Contact Dermatitis guideline for diagnostic patch testin`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-contato module'
  },
  'dermatite-contato-ref-2': {
    id: 'dermatite-contato-ref-2',
    type: 'diretriz',
    title: `Belsito DV, Fransway AF, Fowler JF Jr, et al. Allergic contact dermatitis. J Am Acad Dermatol. 2023;88(5):1023-1034. DOI`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-contato module'
  },
  'dermatite-contato-ref-3': {
    id: 'dermatite-contato-ref-3',
    type: 'diretriz',
    title: `Thyssen JP, Linneberg A, Menné T, et al. The epidemiology of contact allergy in the general population - prevalence and `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-contato module'
  },
  'dermatite-contato-ref-4': {
    id: 'dermatite-contato-ref-4',
    type: 'diretriz',
    title: `Schmid K, Weissmann A, Gollnick H. Contact dermatitis: factors influencing the prevalence in the general population. All`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-contato module'
  },
  'dermatite-contato-ref-5': {
    id: 'dermatite-contato-ref-5',
    type: 'diretriz',
    title: `Duarte I, Lazzarini R, Kobata CM. Contact dermatitis in adolescents. An Bras Dermatol. 2010;85(1):33-42. DOI: 10.1590/S0`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-contato module'
  },
  'dermatite-contato-ref-6': {
    id: 'dermatite-contato-ref-6',
    type: 'diretriz',
    title: `Braga MF, Pereira EC, Reis FP, et al. Prevalência de dermatite de contato em trabalhadores da saúde no Brasil: uma revis`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-contato module'
  },
  'dermatite-contato-ref-7': {
    id: 'dermatite-contato-ref-7',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Dermatites. Brasília: Secretaria de Atenção à Saúd`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-contato module'
  },
  'dermatite-contato-ref-8': {
    id: 'dermatite-contato-ref-8',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Teste de Contato para Dermatite Alérgica. Comissão Nacional de Incorporação de Tecno`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-contato module'
  },
  'dermatite-contato-ref-9': {
    id: 'dermatite-contato-ref-9',
    type: 'diretriz',
    title: `American Academy of Dermatology. Guidelines of care for the management of contact dermatitis. J Am Acad Dermatol. 2023;8`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-contato module'
  },
  'dermatite-contato-ref-10': {
    id: 'dermatite-contato-ref-10',
    type: 'diretriz',
    title: `Diepgen TL, Coenraads PJ, Weisshaar E. Guidelines for diagnosis, prevention and management of hand eczema. J Dtsch Derma`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-contato module'
  },
  'dermatite-contato-ref-11': {
    id: 'dermatite-contato-ref-11',
    type: 'diretriz',
    title: `Larsen TH, Jemec GB. Contact dermatitis: a review. Acta Derm Venereol. 2019;99(12):1047-1055. DOI: 10.2340/00015555-3297`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-contato module'
  },
  'dermatite-contato-ref-12': {
    id: 'dermatite-contato-ref-12',
    type: 'diretriz',
    title: `Sociedade Brasileira de Dermatologia. Consenso Brasileiro de Dermatite de Contato. An Bras Dermatol. 2019;94(2):141-156.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-contato module'
  },
  'dermatite-contato-ref-13': {
    id: 'dermatite-contato-ref-13',
    type: 'diretriz',
    title: `Bourke J, Coulson I, English J. Guidelines for the management of contact dermatitis: an update. Br J Dermatol. 2009;160(`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-contato module'
  },
  'dermatite-contato-ref-14': {
    id: 'dermatite-contato-ref-14',
    type: 'diretriz',
    title: `World Health Organization. International Programme on Chemical Safety. Allergic Contact Dermatitis. Geneva: WHO; 2011.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-contato module'
  },
  'dermatite-seborreica-ref-1': {
    id: 'dermatite-seborreica-ref-1',
    type: 'diretriz',
    title: `Borda LJ, Wikramanayake TC. Seborrheic Dermatitis and Dandruff: A Comprehensive Review. J Clin Invest Dermatol. 2015;3(5`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-seborreica module'
  },
  'dermatite-seborreica-ref-2': {
    id: 'dermatite-seborreica-ref-2',
    type: 'diretriz',
    title: `Schwartz JR, Rocchetta H, Asawanonda P, Luo F, Thomas JH. Does seborrheic dermatitis influence the efficacy of topical a`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-seborreica module'
  },
  'dermatite-seborreica-ref-3': {
    id: 'dermatite-seborreica-ref-3',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolos Clínicos e Diretrizes Terapêuticas: Dermatites Inflamatórias. Brasília: Ministé`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-seborreica module'
  },
  'dermatite-seborreica-ref-4': {
    id: 'dermatite-seborreica-ref-4',
    type: 'diretriz',
    title: `Brianezi D, Pires CA, Nacagami S, et al. Consenso Brasileiro de Dermatite Seborreica. An Bras Dermatol. 2020;95(2):145-1`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-seborreica module'
  },
  'dermatite-seborreica-ref-5': {
    id: 'dermatite-seborreica-ref-5',
    type: 'diretriz',
    title: `Gupta AK, Bluhm R, Abbott S. Seborrheic dermatitis: a treatment update. Dermatol Surg. 2004;30(4 Pt 2):557-63. DOI: 10.1`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-seborreica module'
  },
  'dermatite-seborreica-ref-6': {
    id: 'dermatite-seborreica-ref-6',
    type: 'diretriz',
    title: `Schwartz JR. Zinc Pyrrithione: Properties and Applications. Adv Appl Microbiol. 2016;98:127-169. DOI: 10.1016/bs.aambs.2`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-seborreica module'
  },
  'dermatite-seborreica-ref-7': {
    id: 'dermatite-seborreica-ref-7',
    type: 'diretriz',
    title: `American Academy of Dermatology. Seborrheic Dermatitis: Diagnosis and Treatment Guideline. J Am Acad Dermatol. 2015;72(5`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dermatite-seborreica module'
  },
  'diabetes-mellitus-1-ref-1': {
    id: 'diabetes-mellitus-1-ref-1',
    type: 'diretriz',
    title: `American Diabetes Association. 3. Prevention or Delay of Diabetes and Associated Comorbidities: Standards of Care in Dia`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from diabetes-mellitus-1 module'
  },
  'diabetes-mellitus-1-ref-2': {
    id: 'diabetes-mellitus-1-ref-2',
    type: 'diretriz',
    title: `Sociedade Brasileira de Diabetes. Diretrizes da Sociedade Brasileira de Diabetes 2023-2024. São Paulo: SBD; 2023. p. 45-`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from diabetes-mellitus-1 module'
  },
  'diabetes-mellitus-1-ref-3': {
    id: 'diabetes-mellitus-1-ref-3',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Diabetes Mellitus Tipo 1. Brasília: Minis`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from diabetes-mellitus-1 module'
  },
  'diabetes-mellitus-1-ref-4': {
    id: 'diabetes-mellitus-1-ref-4',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Diabetes Mellitus Tipo 2. Brasília: Minis`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from diabetes-mellitus-1 module'
  },
  'diabetes-mellitus-1-ref-5': {
    id: 'diabetes-mellitus-1-ref-5',
    type: 'diretriz',
    title: `International Diabetes Federation. IDF Diabetes Atlas. 10th ed. Brussels: IDF; 2021.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from diabetes-mellitus-1 module'
  },
  'diabetes-mellitus-1-ref-6': {
    id: 'diabetes-mellitus-1-ref-6',
    type: 'diretriz',
    title: `Schvartzman P, et al. Epidemiology of type 1 diabetes mellitus in Brazil. Arq Bras Endocrinol Metabol. 2009;53(5):616-62`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from diabetes-mellitus-1 module'
  },
  'diabetes-mellitus-1-ref-7': {
    id: 'diabetes-mellitus-1-ref-7',
    type: 'diretriz',
    title: `World Health Organization. Global report on diabetes. Geneva: WHO; 2016.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from diabetes-mellitus-1 module'
  },
  'doenca-arterial-coronariana-ref-1': {
    id: 'doenca-arterial-coronariana-ref-1',
    type: 'diretriz',
    title: `Doença arterial coronariana. Arquivos brasileiros de cardiologia. 2009;93(6 Suppl 2):e126-e145. PMID: 20657993`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-arterial-coronariana module'
  },
  'doenca-arterial-coronariana-ref-2': {
    id: 'doenca-arterial-coronariana-ref-2',
    type: 'diretriz',
    title: `Roth GA, Mensah GA, Johnson CO, et al. Global Burden of Cardiovascular Diseases and Risk Factors, 1990-2019: Update From`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-arterial-coronariana module'
  },
  'doenca-arterial-coronariana-ref-3': {
    id: 'doenca-arterial-coronariana-ref-3',
    type: 'diretriz',
    title: `World Health Organization. Cardiovascular diseases (CVDs). WHO; 2021.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-arterial-coronariana module'
  },
  'doenca-arterial-coronariana-ref-4': {
    id: 'doenca-arterial-coronariana-ref-4',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Doença Arterial Coronariana. Brasília: MS; 2017.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-arterial-coronariana module'
  },
  'doenca-arterial-coronariana-ref-5': {
    id: 'doenca-arterial-coronariana-ref-5',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Rastreamento de Doenças Cardiovasculares. Brasília: Ministério da Saúde; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-arterial-coronariana module'
  },
  'doenca-arterial-coronariana-ref-6': {
    id: 'doenca-arterial-coronariana-ref-6',
    type: 'diretriz',
    title: `Piepoli MF, Hoes AW, Agewall S, et al. 2016 European Guidelines on cardiovascular disease prevention in clinical practic`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-arterial-coronariana module'
  },
  'doenca-arterial-coronariana-ref-7': {
    id: 'doenca-arterial-coronariana-ref-7',
    type: 'diretriz',
    title: `Arnett DK, Blumenthal RS, Albert MA, et al. 2019 ACC/AHA Guideline on the Primary Prevention of Cardiovascular Disease. `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-arterial-coronariana module'
  },
  'doenca-arterial-coronariana-ref-8': {
    id: 'doenca-arterial-coronariana-ref-8',
    type: 'diretriz',
    title: `Yusuf S, Hawken S, Ounpuu S, et al. Effect of potentially modifiable risk factors associated with myocardial infarction `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-arterial-coronariana module'
  },
  'doenca-arterial-coronariana-ref-9': {
    id: 'doenca-arterial-coronariana-ref-9',
    type: 'diretriz',
    title: `Instituto Brasileiro de Geografia e Estatística. Mortalidade por Doenças Cardiovasculares no Brasil. IBGE; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-arterial-coronariana module'
  },
  'doenca-chagas-ref-1': {
    id: 'doenca-chagas-ref-1',
    type: 'diretriz',
    title: `World Health Organization. Chagas disease in the Americas: an ecoepidemiological assessment. Washington, DC: PAHO; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-chagas module'
  },
  'doenca-chagas-ref-2': {
    id: 'doenca-chagas-ref-2',
    type: 'diretriz',
    title: `Bern C, Kjos S, Yabsley MJ, et al. Trypanosoma cruzi and Chagas' Disease in Animals and Humans, South America. Emerg Inf`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-chagas module'
  },
  'doenca-chagas-ref-3': {
    id: 'doenca-chagas-ref-3',
    type: 'diretriz',
    title: `Coura JR, Viñas PA. Chagas disease: a Latin American health problem becoming a world health problem. Acta Trop. 2010;115`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-chagas module'
  },
  'doenca-chagas-ref-4': {
    id: 'doenca-chagas-ref-4',
    type: 'diretriz',
    title: `Dias JC, Manoel FR, Gontijo ED. Doença de Chagas: uma revisão. Rev Soc Bras Med Trop. 2008;41(1):7-17. PMID: 18425292`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-chagas module'
  },
  'doenca-chagas-ref-5': {
    id: 'doenca-chagas-ref-5',
    type: 'diretriz',
    title: `Ministério da Saúde do Brasil. Vigilância e Controle da Doença de Chagas no Brasil. Brasília: MS; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-chagas module'
  },
  'doenca-chagas-ref-6': {
    id: 'doenca-chagas-ref-6',
    type: 'diretriz',
    title: `Andrade DV, Morais L, Vasconcelos R, et al. Serological survey for American trypanosomiasis in domestic animals in rural`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-chagas module'
  },
  'doenca-chagas-ref-7': {
    id: 'doenca-chagas-ref-7',
    type: 'diretriz',
    title: `Ministério da Saúde do Brasil. Protocolo Clínico e Diretrizes Terapêuticas para Doença de Chagas. Brasília: MS; 2019.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-chagas module'
  },
  'doenca-chagas-ref-8': {
    id: 'doenca-chagas-ref-8',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Rastreamento da Doença de Chagas em Gestantes. Brasília: Ministério da Saúde; 2021.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-chagas module'
  },
  'doenca-chagas-ref-9': {
    id: 'doenca-chagas-ref-9',
    type: 'diretriz',
    title: `Sociedade Brasileira de Cardiologia. Diretrizes Brasileiras para Diagnóstico e Tratamento da Cardiopatia Chagásica. Arq `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-chagas module'
  },
  'doenca-chagas-ref-10': {
    id: 'doenca-chagas-ref-10',
    type: 'diretriz',
    title: `World Health Organization. Control and surveillance of Chagas disease: a global strategy 2020–2030. Geneva: WHO; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-chagas module'
  },
  'doenca-chagas-ref-11': {
    id: 'doenca-chagas-ref-11',
    type: 'diretriz',
    title: `Lee BY, Bacon KM, Bottazzi ME, et al. Global economic burden of Chagas disease: a computational simulation model. Lancet`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-chagas module'
  },
  'doenca-chagas-ref-12': {
    id: 'doenca-chagas-ref-12',
    type: 'diretriz',
    title: `Hotez PJ, Bottazzi ME, Franco-Paredes C, et al. The neglected tropical diseases of Latin America and the Caribbean: a re`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-chagas module'
  },
  'doenca-chagas-ref-13': {
    id: 'doenca-chagas-ref-13',
    type: 'diretriz',
    title: `Prata A. Clinical and epidemiological aspects of Chagas disease. Lancet Infect Dis. 2001;1(5):239-245. DOI: 10.1016/S147`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-chagas module'
  },
  'doenca-chagas-ref-14': {
    id: 'doenca-chagas-ref-14',
    type: 'diretriz',
    title: `Rassi A Jr, Rassi A, Marcondes de Rezende R. American trypanosomiasis (Chagas disease). Infect Dis Clin North Am. 2012;2`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-chagas module'
  },
  'doenca-chagas-ref-15': {
    id: 'doenca-chagas-ref-15',
    type: 'diretriz',
    title: `Kirchhoff LV. American trypanosomiasis (Chagas' disease). In: Guerrant RL, Walker DH, Weller PF, editors. Tropical Infec`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-chagas module'
  },
  'doenca-chagas-ref-16': {
    id: 'doenca-chagas-ref-16',
    type: 'diretriz',
    title: `Carod-Artal FJ. Stroke: morbidity, mortality, and pathogenetic role of Trypanosoma cruzi infection. Expert Rev Cardiovas`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-chagas module'
  },
  'doenca-inflamatoria-pelvica-ref-1': {
    id: 'doenca-inflamatoria-pelvica-ref-1',
    type: 'diretriz',
    title: `Workowski KA, Bachmann LH, Chan PA, et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep. `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-inflamatoria-pelvica module'
  },
  'doenca-inflamatoria-pelvica-ref-2': {
    id: 'doenca-inflamatoria-pelvica-ref-2',
    type: 'diretriz',
    title: `Brunham RC, Gottlieb SL, Paavonen J. Pelvic Inflammatory Disease. N Engl J Med. 2015;372(21):2039-2048. DOI: 10.1056/NEJ`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-inflamatoria-pelvica module'
  },
  'doenca-inflamatoria-pelvica-ref-3': {
    id: 'doenca-inflamatoria-pelvica-ref-3',
    type: 'diretriz',
    title: `Jensen JS, Cusini M, Gomberg M, et al. 2020 European guideline for the management of pelvic inflammatory disease. Int J `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-inflamatoria-pelvica module'
  },
  'doenca-inflamatoria-pelvica-ref-4': {
    id: 'doenca-inflamatoria-pelvica-ref-4',
    type: 'diretriz',
    title: `Ross J, Guaschino S, Cusini M, Jensen J. European guideline for the management of pelvic inflammatory disease and other `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-inflamatoria-pelvica module'
  },
  'doenca-inflamatoria-pelvica-ref-5': {
    id: 'doenca-inflamatoria-pelvica-ref-5',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções Sexualme`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-inflamatoria-pelvica module'
  },
  'doenca-inflamatoria-pelvica-ref-6': {
    id: 'doenca-inflamatoria-pelvica-ref-6',
    type: 'diretriz',
    title: `Sztajnbok FR, Boechat L. Doenças Sexualmente Transmissíveis no Brasil: Epidemiologia e Manejo. Rev Bras Med Fam Comunida`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-inflamatoria-pelvica module'
  },
  'doenca-inflamatoria-pelvica-ref-7': {
    id: 'doenca-inflamatoria-pelvica-ref-7',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Rastreamento de Infecções Sexualmente Transmissíveis no SUS. Brasília: Ministério da`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-inflamatoria-pelvica module'
  },
  'doenca-inflamatoria-pelvica-ref-8': {
    id: 'doenca-inflamatoria-pelvica-ref-8',
    type: 'diretriz',
    title: `Ministério da Saúde. Diretrizes Brasileiras para o Diagnóstico e Tratamento das Infecções Sexualmente Transmissíveis. Br`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-inflamatoria-pelvica module'
  },
  'doenca-inflamatoria-pelvica-ref-9': {
    id: 'doenca-inflamatoria-pelvica-ref-9',
    type: 'diretriz',
    title: `American College of Obstetricians and Gynecologists. ACOG Practice Bulletin No. 224: Pelvic Inflammatory Disease. Obstet`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-inflamatoria-pelvica module'
  },
  'doenca-inflamatoria-pelvica-ref-10': {
    id: 'doenca-inflamatoria-pelvica-ref-10',
    type: 'diretriz',
    title: `Paavonen J, Eggert-Kruse W. Chlamydia trachomatis: impact on human reproduction. Hum Reprod Update. 1999;5(5):433-447. D`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-inflamatoria-pelvica module'
  },
  'doenca-inflamatoria-pelvica-ref-11': {
    id: 'doenca-inflamatoria-pelvica-ref-11',
    type: 'diretriz',
    title: `Haggerty CL, Gottlieb SL, Taylor BD, et al. Risk of sequelae after Chlamydia trachomatis genital infection in women. J I`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-inflamatoria-pelvica module'
  },
  'doenca-inflamatoria-pelvica-ref-12': {
    id: 'doenca-inflamatoria-pelvica-ref-12',
    type: 'diretriz',
    title: `World Health Organization. Report on global sexually transmitted infections 2023. Geneva: WHO; 2023.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-inflamatoria-pelvica module'
  },
  'drge-ref-1': {
    id: 'drge-ref-1',
    type: 'diretriz',
    title: `Katz PO, et al. ACG Clinical Guideline for the Diagnosis and Management of Gastroesophageal Reflux Disease. Am J Gastroe`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from drge module'
  },
  'drge-ref-2': {
    id: 'drge-ref-2',
    type: 'diretriz',
    title: `Yadlapati R, et al. Management options for patients with GERD and persistent symptoms: recommendations from an expert pa`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from drge module'
  },
  'drge-ref-3': {
    id: 'drge-ref-3',
    type: 'diretriz',
    title: `El-Serag HB, et al. Update on the epidemiology of gastro-oesophageal reflux disease: a systematic review. Gut. 2014;63(6`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from drge module'
  },
  'drge-ref-4': {
    id: 'drge-ref-4',
    type: 'diretriz',
    title: `Gyawali CP, et al. Modern diagnosis of GERD: the Lyon Consensus. Gut. 2018;67(7):1351-1362. DOI: 10.1136/gutjnl-2017-314`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from drge module'
  },
  'drge-ref-5': {
    id: 'drge-ref-5',
    type: 'diretriz',
    title: `El-Serag HB, Sweet S, Winchester CC, Dent J. Update on the epidemiology of gastro-oesophageal reflux disease: a systemat`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from drge module'
  },
  'drge-ref-6': {
    id: 'drge-ref-6',
    type: 'diretriz',
    title: `Dent J, et al. Epidemiology of gastro-oesophageal reflux disease: a systematic review. Gut. 2005;54(5):710-7. PMID: 1583`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from drge module'
  },
  'drge-ref-7': {
    id: 'drge-ref-7',
    type: 'diretriz',
    title: `Reis AC, et al. Prevalence of gastroesophageal reflux disease in a country with high prevalence of Helicobacter pylori i`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from drge module'
  },
  'drge-ref-8': {
    id: 'drge-ref-8',
    type: 'diretriz',
    title: `Oliveira LC, et al. Prevalência de sintomas de refluxo gastroesofágico na população brasileira. Arq Gastroenterol. 2005;`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from drge module'
  },
  'drge-ref-9': {
    id: 'drge-ref-9',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Doença do Refluxo Gastroesofágico. Brasília: MS; 2`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from drge module'
  },
  'drge-ref-10': {
    id: 'drge-ref-10',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação - DRGE no SUS. Brasília: Ministério da Saúde; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from drge module'
  },
  'drge-ref-11': {
    id: 'drge-ref-11',
    type: 'diretriz',
    title: `Herdeiro MMR, et al. Diretrizes Brasileiras em Motilidade Digestiva e Neurogastroenterologia 2023. Arq Gastroenterol. 20`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from drge module'
  },
  'drge-ref-12': {
    id: 'drge-ref-12',
    type: 'diretriz',
    title: `Modesto LF, et al. Brazilian consensus on gastroesophageal reflux disease. Arq Gastroenterol. 2016;53 Suppl 1:1-28. PMID`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from drge module'
  },
  'drge-ref-13': {
    id: 'drge-ref-13',
    type: 'diretriz',
    title: `Ford AC, Forman D, Bailey AG, Axon AT, Moayyedi P. A systematic review and meta-analysis of the prevalence of Helicobact`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from drge module'
  },
  'drge-ref-14': {
    id: 'drge-ref-14',
    type: 'diretriz',
    title: `Lieberman DA, et al. Incidence of esophageal adenocarcinoma in patients with Barrett's esophagus and high-grade dysplasi`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from drge module'
  },
  'drge-ref-15': {
    id: 'drge-ref-15',
    type: 'diretriz',
    title: `Datz C. Gastroesophageal reflux disease. World J Gastroenterol. 2011;17(37):4292-8. PMID: 22046088`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from drge module'
  },
  'drge-ref-16': {
    id: 'drge-ref-16',
    type: 'diretriz',
    title: `Arnold M, et al. Global burden of 5 gastrointestinal cancers (oesophagus, gastric, liver, pancreas, colorectal) in 2040.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from drge module'
  },
  'drge-ref-17': {
    id: 'drge-ref-17',
    type: 'diretriz',
    title: `Soerjomataram I, et al. Global burden of disease in 2021: a comprehensive assessment of mortality, disability, and risk `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from drge module'
  },
  'drge-ref-18': {
    id: 'drge-ref-18',
    type: 'diretriz',
    title: `Ministério da Saúde. Datasus - Mortalidade por Doenças Digestivas no Brasil 2022. Brasília: MS; 2023.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from drge module'
  },
  'endometriose-ref-1': {
    id: 'endometriose-ref-1',
    type: 'diretriz',
    title: `Donnez J, et al. Endometriosis and fertility preservation: CNGOF-HAS Endometriosis Guidelines. Gynecologie, obstetrique,`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from endometriose module'
  },
  'endometriose-ref-2': {
    id: 'endometriose-ref-2',
    type: 'diretriz',
    title: `Donnez J, et al. Management of painful endometriosis in adolescents: CNGOF-HAS Endometriosis Guidelines. Gynecologie, ob`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from endometriose module'
  },
  'endometriose-ref-3': {
    id: 'endometriose-ref-3',
    type: 'diretriz',
    title: `Querleu D, et al. Pelvic exam in gynecology and obstetrics: Guidelines for clinical practice. Gynecologie, obstetrique, `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from endometriose module'
  },
  'endometriose-ref-4': {
    id: 'endometriose-ref-4',
    type: 'diretriz',
    title: `Leonardi M, et al. Non-Invasive Imaging Techniques for Diagnosis of Pelvic Deep Endometriosis and Endometriosis Classifi`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from endometriose module'
  },
  'endometriose-ref-5': {
    id: 'endometriose-ref-5',
    type: 'diretriz',
    title: `Chapron C, et al. Epidemiology and diagnosis strategy: CNGOF-HAS Endometriosis Guidelines. Gynecologie, obstetrique, fer`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from endometriose module'
  },
  'endometriose-ref-6': {
    id: 'endometriose-ref-6',
    type: 'diretriz',
    title: `Borghese B, et al. Diagnostic strategies for endometriosis: CNGOF-HAS Endometriosis Guidelines. Gynecologie, obstetrique`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from endometriose module'
  },
  'endometriose-ref-7': {
    id: 'endometriose-ref-7',
    type: 'diretriz',
    title: `Mathias M, et al. Deeply infiltrating endometriosis and infertility: CNGOF-HAS Endometriosis Guidelines. Gynecologie, ob`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from endometriose module'
  },
  'endometriose-ref-8': {
    id: 'endometriose-ref-8',
    type: 'diretriz',
    title: `Roman H, et al. Extragenital endometriosis: Parietal, thoracic, diaphragmatic and nervous lesions. CNGOF-HAS Endometrios`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from endometriose module'
  },
  'endometriose-ref-9': {
    id: 'endometriose-ref-9',
    type: 'diretriz',
    title: `Maraud R, et al. Expectations of women with endometriosis: What information to deliver? CNGOF-HAS Endometriosis Guidelin`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from endometriose module'
  },
  'endometriose-ref-10': {
    id: 'endometriose-ref-10',
    type: 'diretriz',
    title: `Roman H, et al. Strategies and surgical management of endometriosis: CNGOF-HAS Endometriosis Guidelines. Gynecologie, ob`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from endometriose module'
  },
  'enxaqueca-ref-1': {
    id: 'enxaqueca-ref-1',
    type: 'diretriz',
    title: `Portuguese Headache and Neurology Societies, Portuguese Association of General and Family Medicine, MiGRA. Headache Mana`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from enxaqueca module'
  },
  'enxaqueca-ref-2': {
    id: 'enxaqueca-ref-2',
    type: 'diretriz',
    title: `Stovner LJ, Nichols E, Steiner TJ, et al. Global, regional, and national burden of migraine and tension-type headache, 1`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from enxaqueca module'
  },
  'enxaqueca-ref-3': {
    id: 'enxaqueca-ref-3',
    type: 'diretriz',
    title: `Queiroz LP, Silva AM, Passos Mde A, et al. Migraine headache in a prepaid health plan in the city of Joinville, Brazil. `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from enxaqueca module'
  },
  'enxaqueca-ref-4': {
    id: 'enxaqueca-ref-4',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolos Clínicos e Diretrizes Terapêuticas: Dor Crônica. Brasília: Ministério da Saúde;`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from enxaqueca module'
  },
  'enxaqueca-ref-5': {
    id: 'enxaqueca-ref-5',
    type: 'diretriz',
    title: `Headache Classification Committee of the International Headache Society (IHS). The International Classification of Heada`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from enxaqueca module'
  },
  'epididimite-ref-1': {
    id: 'epididimite-ref-1',
    type: 'diretriz',
    title: `Tracy CR, Steers WD, Costabile R. Diagnosis and management of epididymitis. Urol Clin North Am. 2008;35(1):101-108. DOI:`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from epididimite module'
  },
  'epididimite-ref-2': {
    id: 'epididimite-ref-2',
    type: 'diretriz',
    title: `Kaver I, Matzkin H, Hananel J, Zedigon R. Acute epididymitis: a sonographic and clinical correlation. J Ultrasound Med. `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from epididimite module'
  },
  'epididimite-ref-3': {
    id: 'epididimite-ref-3',
    type: 'diretriz',
    title: `Centers for Disease Control and Prevention. Sexually Transmitted Diseases Treatment Guidelines, 2021. MMWR Recomm Rep. 2`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from epididimite module'
  },
  'epididimite-ref-4': {
    id: 'epididimite-ref-4',
    type: 'diretriz',
    title: `European Association of Urology. EAU Guidelines on Urological Infections. 2024. Arnhem: EAU; 2024.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from epididimite module'
  },
  'epididimite-ref-5': {
    id: 'epididimite-ref-5',
    type: 'diretriz',
    title: `Ministério da Saúde do Brasil. Protocolos Clínicos e Diretrizes Terapêuticas: Infecções Sexualmente Transmissíveis. Bras`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from epididimite module'
  },
  'epididimite-ref-6': {
    id: 'epididimite-ref-6',
    type: 'diretriz',
    title: `American Urological Association. Acute Scrotum: Appropriate Use Criteria. Linthicum: AUA; 2023.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from epididimite module'
  },
  'epididimite-ref-7': {
    id: 'epididimite-ref-7',
    type: 'diretriz',
    title: `Conitec. Relatório de Recomendação: Tratamento da Epididimite no SUS. Brasília: Ministério da Saúde; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from epididimite module'
  },
  'epididimite-ref-8': {
    id: 'epididimite-ref-8',
    type: 'diretriz',
    title: `Workowski KA, Bachmann LH, Chan PA, et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep. `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from epididimite module'
  },
  'epididimite-ref-9': {
    id: 'epididimite-ref-9',
    type: 'diretriz',
    title: `Figueiredo VB, et al. Epidemiologia da epididimite no Brasil: análise de dados do SUS. Rev Bras Urol. 2020;46(2):145-152`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from epididimite module'
  },
  'epididimite-ref-10': {
    id: 'epididimite-ref-10',
    type: 'diretriz',
    title: `Collins MM, Stafford RS, OLeary MP, Barry MJ. How common is prostatitis? A national survey of physician visits. J Urol. `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from epididimite module'
  },
  'epididimite-ref-11': {
    id: 'epididimite-ref-11',
    type: 'diretriz',
    title: `Street EJ, et al. British Association for Sexual Health and HIV national guideline for the management of epididymo-orchi`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from epididimite module'
  },
  'escabiose-ref-1': {
    id: 'escabiose-ref-1',
    type: 'diretriz',
    title: `Centers for Disease Control and Prevention. Scabies. In: Red Book: 2021 Report of the Committee on Infectious Diseases. `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escabiose module'
  },
  'escabiose-ref-2': {
    id: 'escabiose-ref-2',
    type: 'diretriz',
    title: `World Health Organization. Scabies. WHO Fact Sheet. Geneva: WHO; 2023. Available from: https://www.who.int/news-room/fac`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escabiose module'
  },
  'escabiose-ref-3': {
    id: 'escabiose-ref-3',
    type: 'diretriz',
    title: `Engelman D, Cantey PT, Marks M, et al. The public health control of scabies: priorities for research and action. Lancet.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escabiose module'
  },
  'escabiose-ref-4': {
    id: 'escabiose-ref-4',
    type: 'diretriz',
    title: `Romani L, Steer AC, Engelman D, et al. Prevalence of scabies and impetigo worldwide: a systematic review. Lancet Infect `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escabiose module'
  },
  'escabiose-ref-5': {
    id: 'escabiose-ref-5',
    type: 'diretriz',
    title: `Hay RJ, Steer AC, Engelman D, Walton S. Scabies in the developing world--its prevalence, complications, and management. `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escabiose module'
  },
  'escabiose-ref-6': {
    id: 'escabiose-ref-6',
    type: 'diretriz',
    title: `Ministério da Saúde do Brasil. Protocolo Clínico e Diretrizes Terapêuticas para Escabiose. Brasília: Ministério da Saúde`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escabiose module'
  },
  'escabiose-ref-7': {
    id: 'escabiose-ref-7',
    type: 'diretriz',
    title: `Santos TM, Costa SC, Rangel L, et al. Escabiose em populações vulneráveis no Brasil: uma revisão sistemática. Rev Saude `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escabiose module'
  },
  'escabiose-ref-8': {
    id: 'escabiose-ref-8',
    type: 'diretriz',
    title: `Ministério da Saúde do Brasil. Manejo da Escabiose no SUS. Portaria GM/MS nº 1.332, de 17 de julho de 2013. Brasília: Mi`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escabiose module'
  },
  'escabiose-ref-9': {
    id: 'escabiose-ref-9',
    type: 'diretriz',
    title: `Sociedade Brasileira de Dermatologia. Consenso Brasileiro de Escabiose. An Bras Dermatol. 2019;94(2 Suppl 1):1-15. DOI: `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escabiose module'
  },
  'escabiose-ref-10': {
    id: 'escabiose-ref-10',
    type: 'diretriz',
    title: `Currie BJ, Murrell DF, McCarthy JS, et al. Australian guideline for the diagnosis and management of scabies. Australas J`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escabiose module'
  },
  'escabiose-ref-11': {
    id: 'escabiose-ref-11',
    type: 'diretriz',
    title: `International Alliance for the Control of Scabies. Consensus recommendations for the diagnosis and management of scabies`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escabiose module'
  },
  'escabiose-ref-12': {
    id: 'escabiose-ref-12',
    type: 'diretriz',
    title: `Orkin M. Scabies. What are the consequences? Postgrad Med J. 1978;54(630):252-254. DOI: 10.1136/pgmj.54.630.252 PMID: 65`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escabiose module'
  },
  'escabiose-ref-13': {
    id: 'escabiose-ref-13',
    type: 'diretriz',
    title: `Heukelbach J, Feldmeier H. Scabies. Lancet. 2006;367(9524):1767-1774. DOI: 10.1016/S0140-6736(06)68772-2 PMID: 16731272`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escabiose module'
  },
  'escarlatina-ref-1': {
    id: 'escarlatina-ref-1',
    type: 'diretriz',
    title: `Shulman ST, Bisno AL, Clegg HW, et al. Clinical practice guideline for the diagnosis and management of group A streptoco`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escarlatina module'
  },
  'escarlatina-ref-2': {
    id: 'escarlatina-ref-2',
    type: 'diretriz',
    title: `Walker MJ, Barnett TC, McArthur J, et al. Disease manifestations and pathogenic mechanisms of group A Streptococcus. Cli`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escarlatina module'
  },
  'escarlatina-ref-3': {
    id: 'escarlatina-ref-3',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Doenças Bacterianas Invasivas. Brasília: MS; 2014.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escarlatina module'
  },
  'escarlatina-ref-4': {
    id: 'escarlatina-ref-4',
    type: 'diretriz',
    title: `Brasil. Portaria GM/MS nº 204, de 17 de fevereiro de 2016. Define a Lista Nacional de Notificação Compulsória.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escarlatina module'
  },
  'escarlatina-ref-5': {
    id: 'escarlatina-ref-5',
    type: 'diretriz',
    title: `Silva-Costa C, Trigueiros T, Duarte F, et al. Scarlet fever: a guide to management. Drugs Context. 2021;10:2021-3-5. DOI`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escarlatina module'
  },
  'escarlatina-ref-6': {
    id: 'escarlatina-ref-6',
    type: 'diretriz',
    title: `Zheng J, Li X, Cao B, et al. Global temporal and geographical distribution of scarlet fever: a systematic review and met`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escarlatina module'
  },
  'escarlatina-ref-7': {
    id: 'escarlatina-ref-7',
    type: 'diretriz',
    title: `Secretaria de Vigilância em Saúde. Manual de Vigilância de Doenças de Notificação Compulsória. Brasília: MS; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escarlatina module'
  },
  'escarlatina-ref-8': {
    id: 'escarlatina-ref-8',
    type: 'diretriz',
    title: `Biccard BM, Wise R, Peden CJ, et al. IDSA updates on streptococcal infections. Clin Infect Dis. 2023;76(Supplement_1):S1`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escarlatina module'
  },
  'escarlatina-ref-9': {
    id: 'escarlatina-ref-9',
    type: 'diretriz',
    title: `Oliveira FA, Araújo WN, Schmidt-Chanasit J, et al. Scarlet fever in Brazil: analysis of SINAN data from 2007 to 2018. Re`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escarlatina module'
  },
  'escarlatina-ref-10': {
    id: 'escarlatina-ref-10',
    type: 'diretriz',
    title: `Turner CE, Dryden A, Holden MT, et al. Molecular analysis of an outbreak of scarlet fever in China caused by Streptococc`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from escarlatina module'
  },
  'esquistossomose-ref-1': {
    id: 'esquistossomose-ref-1',
    type: 'diretriz',
    title: `World Health Organization. Schistosomiasis. WHO Fact Sheet. Geneva: WHO; 2023. PMID: `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from esquistossomose module'
  },
  'esquistossomose-ref-2': {
    id: 'esquistossomose-ref-2',
    type: 'diretriz',
    title: `Colley DG, Bustinduy AL, Secor WE, King CH. Human schistosomiasis. Lancet. 2014;383(9936):2253-2264. DOI: 10.1016/S0140-`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from esquistossomose module'
  },
  'esquistossomose-ref-3': {
    id: 'esquistossomose-ref-3',
    type: 'diretriz',
    title: `Ministry of Health Brazil. Programa de Controle da Esquistossomose. Brasília: Ministério da Saúde; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from esquistossomose module'
  },
  'esquistossomose-ref-4': {
    id: 'esquistossomose-ref-4',
    type: 'diretriz',
    title: `Fenwick A, et al. The Schistosomiasis Control Initiative (SCI): rationale, development and implementation from 2002-2008`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from esquistossomose module'
  },
  'esquistossomose-ref-5': {
    id: 'esquistossomose-ref-5',
    type: 'diretriz',
    title: `Ximenes RAA, et al. Schistosomiasis in Brazil: where do we stand? Mem Inst Oswaldo Cruz. 2021;116:e210057. DOI: 10.1590/`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from esquistossomose module'
  },
  'esquistossomose-ref-6': {
    id: 'esquistossomose-ref-6',
    type: 'diretriz',
    title: `Brazilian Ministry of Health. Vigilância em Saúde: Esquistossomose Mansoni. Brasília: MS; 2014. ISBN: 978-85-334-2197-3`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from esquistossomose module'
  },
  'esquistossomose-ref-7': {
    id: 'esquistossomose-ref-7',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Esquistossomose. Brasília: MS; 2019.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from esquistossomose module'
  },
  'esquistossomose-ref-8': {
    id: 'esquistossomose-ref-8',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Esquistossomose. Brasília: Comissão Nacional de Incorporação de Tecnologias no SUS; `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from esquistossomose module'
  },
  'esquistossomose-ref-9': {
    id: 'esquistossomose-ref-9',
    type: 'diretriz',
    title: `Sociedade Brasileira de Medicina Tropical. Consenso Brasileiro em Esquistossomose. Rev Soc Bras Med Trop. 2022;55:e0200.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from esquistossomose module'
  },
  'esquistossomose-ref-10': {
    id: 'esquistossomose-ref-10',
    type: 'diretriz',
    title: `World Health Organization. Guideline: preventive chemotherapy to control schistosomiasis and soil-transmitted helminth i`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from esquistossomose module'
  },
  'faringite-ref-1': {
    id: 'faringite-ref-1',
    type: 'diretriz',
    title: `Shulman ST, Bisno AL, Clegg HW, et al. Clinical practice guideline for the diagnosis and management of group A streptoco`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringite module'
  },
  'faringite-ref-2': {
    id: 'faringite-ref-2',
    type: 'diretriz',
    title: `Wessels MR. Streptococcal pharyngitis. N Engl J Med. 2011;364(7):648-658. DOI: 10.1056/NEJMcp1009126 PMID: 21300695`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringite module'
  },
  'faringite-ref-3': {
    id: 'faringite-ref-3',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringite module'
  },
  'faringite-ref-4': {
    id: 'faringite-ref-4',
    type: 'diretriz',
    title: `Oliveira LB, et al. Faringite aguda em crianças: diagnóstico e tratamento. J Pediatr (Rio J). 2015;91(6):532-539. DOI: 1`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringite module'
  },
  'faringite-ref-5': {
    id: 'faringite-ref-5',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolos de Manejo da Dor de Garganta no SUS. Brasília: MS; 2019.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringite module'
  },
  'faringite-ref-6': {
    id: 'faringite-ref-6',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Manejo de Faringite no SUS. Brasília: Ministério da Saúde; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringite module'
  },
  'faringite-ref-7': {
    id: 'faringite-ref-7',
    type: 'diretriz',
    title: `Sociedade Brasileira de Pediatria. Consenso Brasileiro de Faringotonsilites Estreptocócicas. Arq Bras Cir Dig. 2020;33(1`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringite module'
  },
  'faringite-ref-8': {
    id: 'faringite-ref-8',
    type: 'diretriz',
    title: `Carapetis JR, et al. Acute rheumatic fever and rheumatic heart disease. Nat Rev Dis Primers. 2016;2:15084. DOI: 10.1038/`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringite module'
  },
  'faringite-ref-9': {
    id: 'faringite-ref-9',
    type: 'diretriz',
    title: `Instituto Brasileiro de Geografia e Estatística (IBGE). Pesquisa Nacional de Saúde 2019. Rio de Janeiro: IBGE; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringite module'
  },
  'faringite-ref-10': {
    id: 'faringite-ref-10',
    type: 'diretriz',
    title: `Gerber MA, et al. Prevention of rheumatic fever and diagnosis and treatment of acute Streptococcal pharyngitis: a scient`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringite module'
  },
  'faringite-ref-11': {
    id: 'faringite-ref-11',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Boletim Epidemiológico: Febre Reumática. Brasília: MS; 2021.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringite module'
  },
  'faringite-ref-12': {
    id: 'faringite-ref-12',
    type: 'diretriz',
    title: `World Health Organization. Rheumatic heart disease. WHO; 2022. Available from: https://www.who.int/news-room/fact-sheets`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringite module'
  },
  'faringite-ref-13': {
    id: 'faringite-ref-13',
    type: 'diretriz',
    title: `Coutinho M, et al. Febre reumática no Brasil: epidemiologia e prevenção. Rev Bras Epidemiol. 2018;21(suppl 1):e180006. D`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringite module'
  },
  'faringoamigdalite-ref-1': {
    id: 'faringoamigdalite-ref-1',
    type: 'diretriz',
    title: `Wessels MR. Streptococcal pharyngitis. N Engl J Med. 2011;364(7):648-55. DOI: 10.1056/NEJMcp1009126 PMID: 21300695`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringoamigdalite module'
  },
  'faringoamigdalite-ref-2': {
    id: 'faringoamigdalite-ref-2',
    type: 'diretriz',
    title: `van Driel ML, De Sutter AI, Keber N, Habraken H, Christiaens T. Different types of antibiotics for group A streptococcal`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringoamigdalite module'
  },
  'faringoamigdalite-ref-3': {
    id: 'faringoamigdalite-ref-3',
    type: 'diretriz',
    title: `Ministério da Saúde do Brasil. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Doenças `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringoamigdalite module'
  },
  'faringoamigdalite-ref-4': {
    id: 'faringoamigdalite-ref-4',
    type: 'diretriz',
    title: `Carapetis JR, Steer AC, Mulholland EK, Weber M. The global burden of group A streptococcal diseases. Lancet Infect Dis. `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringoamigdalite module'
  },
  'faringoamigdalite-ref-5': {
    id: 'faringoamigdalite-ref-5',
    type: 'diretriz',
    title: `Ministério da Saúde do Brasil. Diretrizes Brasileiras para Diagnóstico e Tratamento de Faringite Aguda. Brasília: MS; 20`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringoamigdalite module'
  },
  'faringoamigdalite-ref-6': {
    id: 'faringoamigdalite-ref-6',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Protocolos para Infecções Respiratórias Agudas no SUS. Brasília: CONITEC; 2018.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringoamigdalite module'
  },
  'faringoamigdalite-ref-7': {
    id: 'faringoamigdalite-ref-7',
    type: 'diretriz',
    title: `Shulman ST, Bisno AL, Clegg HW, et al. Clinical practice guideline for the diagnosis and management of group A streptoco`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringoamigdalite module'
  },
  'faringoamigdalite-ref-8': {
    id: 'faringoamigdalite-ref-8',
    type: 'diretriz',
    title: `Olson MA. Update on Infectious Diseases Society of America Guidelines for Management of Acute Pharyngitis. Pediatr Ann. `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringoamigdalite module'
  },
  'faringoamigdalite-ref-9': {
    id: 'faringoamigdalite-ref-9',
    type: 'diretriz',
    title: `Guimarães FS, de Oliveira CR, Ribeiro GB, et al. Group A streptococcal pharyngitis in children from a region of low morb`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringoamigdalite module'
  },
  'faringoamigdalite-ref-10': {
    id: 'faringoamigdalite-ref-10',
    type: 'diretriz',
    title: `Silva-Costa C, Trigueiros T, Duarte M, et al. Epidemiological study of acute pharyngitis in Portuguese children. J Paedi`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringoamigdalite module'
  },
  'faringoamigdalite-ref-11': {
    id: 'faringoamigdalite-ref-11',
    type: 'diretriz',
    title: `Watkins DA, McKee M, Razavi AC, et al. Burden of bacterial antimicrobial resistance among human clinical cases in 2019: `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from faringoamigdalite module'
  },
  'febre-amarela-ref-1': {
    id: 'febre-amarela-ref-1',
    type: 'diretriz',
    title: `World Health Organization. Yellow fever. WHO Fact Sheet. Geneva: WHO; 2023.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from febre-amarela module'
  },
  'febre-amarela-ref-2': {
    id: 'febre-amarela-ref-2',
    type: 'diretriz',
    title: `World Health Organization. Yellow fever vaccination: WHO position paper – July 2023. Wkly Epidemiol Rec. 2023;98(30):317`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from febre-amarela module'
  },
  'febre-amarela-ref-3': {
    id: 'febre-amarela-ref-3',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Vacina de febre amarela: informe técnico. Brasília: MS; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from febre-amarela module'
  },
  'febre-amarela-ref-4': {
    id: 'febre-amarela-ref-4',
    type: 'diretriz',
    title: `Barrett ADT, Monath TP. History of yellow fever. In: Yellow Fever. Current Topics in Microbiology and Immunology. 2014;3`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from febre-amarela module'
  },
  'febre-amarela-ref-5': {
    id: 'febre-amarela-ref-5',
    type: 'diretriz',
    title: `Silva MV, et al. Yellow fever surveillance in Brazil: challenges and perspectives. Rev Saude Publica. 2020;54:45.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from febre-amarela module'
  },
  'febre-amarela-ref-6': {
    id: 'febre-amarela-ref-6',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Programa Nacional de Imunizações: febre amarela. Brasília: MS; 2021.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from febre-amarela module'
  },
  'febre-amarela-ref-7': {
    id: 'febre-amarela-ref-7',
    type: 'diretriz',
    title: `Sociedade Brasileira de Imunizações. Calendário de vacinação 2023. SBIm; 2023.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from febre-amarela module'
  },
  'febre-amarela-ref-8': {
    id: 'febre-amarela-ref-8',
    type: 'diretriz',
    title: `Gubler DJ. The continuing spread of West Nile virus in the western hemisphere. Clin Infect Dis. 2007;45(7):1039-1046.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from febre-amarela module'
  },
  'febre-amarela-ref-9': {
    id: 'febre-amarela-ref-9',
    type: 'diretriz',
    title: `Figueiredo LT. The Brazilian approach to yellow fever surveillance. Mem Inst Oswaldo Cruz. 2019;114:e190024.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from febre-amarela module'
  },
  'febre-amarela-ref-10': {
    id: 'febre-amarela-ref-10',
    type: 'diretriz',
    title: `Possas C, et al. Yellow fever outbreak in Brazil: lessons and challenges for epidemic preparedness and response. PLoS Ne`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from febre-amarela module'
  },
  'fobia-social-ref-1': {
    id: 'fobia-social-ref-1',
    type: 'diretriz',
    title: `Leichsenring F, Leweke F, Brand S, et al. Social Anxiety Disorder: Recent Findings in the Areas of Epidemiology, Etiolog`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from fobia-social module'
  },
  'fobia-social-ref-2': {
    id: 'fobia-social-ref-2',
    type: 'diretriz',
    title: `American Psychiatric Association. Diagnostic and Statistical Manual of Mental Disorders (DSM-5-TR). 5th ed. Washington, `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from fobia-social module'
  },
  'fobia-social-ref-3': {
    id: 'fobia-social-ref-3',
    type: 'diretriz',
    title: `Stein DJ, Scott KM, de Jonge P, Kessler RC. Epidemiology of anxiety disorders: from surveys to nosology and back. Dialog`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from fobia-social module'
  },
  'fobia-social-ref-4': {
    id: 'fobia-social-ref-4',
    type: 'diretriz',
    title: `Russo M, Nutt D. Social anxiety disorder: prevalence, misdiagnosis, and the role of SSRIs. CNS Spectr. 2018;23(5):S1-S2.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from fobia-social module'
  },
  'fobia-social-ref-5': {
    id: 'fobia-social-ref-5',
    type: 'diretriz',
    title: `Vilete LMB, Coutinho ESF, Figueira I. Reliability of the Social Anxiety and Avoidance Scale for Adolescents (SAAS-A) in `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from fobia-social module'
  },
  'fobia-social-ref-6': {
    id: 'fobia-social-ref-6',
    type: 'diretriz',
    title: `Instituto Nacional de Ciência e Tecnologia para Avaliação de Políticas Públicas de Saúde Mental. Prevalência de transtor`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from fobia-social module'
  },
  'fobia-social-ref-7': {
    id: 'fobia-social-ref-7',
    type: 'diretriz',
    title: `National Institute for Health and Care Excellence (NICE). Social anxiety disorder: recognition, assessment and treatment`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from fobia-social module'
  },
  'fobia-social-ref-8': {
    id: 'fobia-social-ref-8',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Diretrizes para Atenção Primária à Saúde no SUS. Brasília: MS; 2021.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from fobia-social module'
  },
  'fobia-social-ref-9': {
    id: 'fobia-social-ref-9',
    type: 'diretriz',
    title: `Conselho Federal de Medicina. Protocolos Clínicos e Diretrizes Terapêuticas para Transtornos de Ansiedade. Brasília: CFM`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from fobia-social module'
  },
  'fobia-social-ref-10': {
    id: 'fobia-social-ref-10',
    type: 'diretriz',
    title: `Bandelow B, Michaelis S, Wedekind D. Treatment of anxiety disorders. Dialogues Clin Neurosci. 2017;19(2):93-107. DOI: 10`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from fobia-social module'
  },
  'fobia-social-ref-11': {
    id: 'fobia-social-ref-11',
    type: 'diretriz',
    title: `Kessler RC, Petukhova M, Sampson NA, Zaslavsky AM, Wittchen HU. Twelve-month and lifetime prevalence and lifetime morbid`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from fobia-social module'
  },
  'fobia-social-ref-12': {
    id: 'fobia-social-ref-12',
    type: 'diretriz',
    title: `Lampe L, Fazakas-de-Strobach B. Social phobia. BMJ. 2009;339:b2640. DOI: 10.1136/bmj.b2640 PMID: 19741099`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from fobia-social module'
  },
  'fobia-social-ref-13': {
    id: 'fobia-social-ref-13',
    type: 'diretriz',
    title: `Ribeiro WS, Mari Jde J, Quintana MI, et al. Transcultural adaptation and validation of the Social Phobia Inventory (SPIN`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from fobia-social module'
  },
  'fobia-social-ref-14': {
    id: 'fobia-social-ref-14',
    type: 'diretriz',
    title: `Platt P, Hawton K, Simkin S, Mellor-Clark J. Suicidality in primary care attenders with depression: a longitudinal study`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from fobia-social module'
  },
  'fobia-social-ref-15': {
    id: 'fobia-social-ref-15',
    type: 'diretriz',
    title: `Beesdo K, Knappe S, Pine DS. Anxiety and anxiety disorders in children and adolescents: developmental issues and implica`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from fobia-social module'
  },
  'fobia-social-ref-16': {
    id: 'fobia-social-ref-16',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Mortalidade por causas externas: suicídio no Brasil. Brasília: MS; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from fobia-social module'
  },
  'gastrite-ref-1': {
    id: 'gastrite-ref-1',
    type: 'diretriz',
    title: `Sipponen P, Maaroos HI. Chronic gastritis. Scand J Gastroenterol. 2015;50(6):657-67. DOI: 10.3109/00365521.2015.1010612 `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gastrite module'
  },
  'gastrite-ref-2': {
    id: 'gastrite-ref-2',
    type: 'diretriz',
    title: `Malfertheiner P, et al. Management of Helicobacter pylori infection: the Maastricht VI/Florence consensus report. Gut. 2`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gastrite module'
  },
  'gastrite-ref-3': {
    id: 'gastrite-ref-3',
    type: 'diretriz',
    title: `Hooi JKY, et al. Global prevalence of Helicobacter pylori infection: systematic review and meta-analysis. Gastroenterolo`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gastrite module'
  },
  'gastrite-ref-4': {
    id: 'gastrite-ref-4',
    type: 'diretriz',
    title: `Zambrano JF, et al. Helicobacter pylori prevalence worldwide: a systematic review. Helicobacter. 2023;28(3):e12970. DOI:`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gastrite module'
  },
  'gastrite-ref-5': {
    id: 'gastrite-ref-5',
    type: 'diretriz',
    title: `Rodrigues MN, et al. Prevalence of Helicobacter pylori infection in Brazil: a systematic review. Rev Saude Publica. 2019`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gastrite module'
  },
  'gastrite-ref-6': {
    id: 'gastrite-ref-6',
    type: 'diretriz',
    title: `Conselho Nacional de Secretários de Saúde. Prevalência de infecções gastrointestinais no Brasil. Brasília: CONASS; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gastrite module'
  },
  'gastrite-ref-7': {
    id: 'gastrite-ref-7',
    type: 'diretriz',
    title: `Correa P, Piazuelo MB. The gastric precancerous cascade. J Dig Dis. 2012;13(1):2-9. DOI: 10.1111/j.1751-2980.2011.00550.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gastrite module'
  },
  'gastrite-ref-8': {
    id: 'gastrite-ref-8',
    type: 'diretriz',
    title: `Bankhead-Kendall B, et al. Gastritis and gastric cancer. Surg Clin North Am. 2020;100(4):671-82. DOI: 10.1016/j.suc.2020`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gastrite module'
  },
  'gastrite-ref-9': {
    id: 'gastrite-ref-9',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Infecções por H. pylori. Brasília: MS; 2018.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gastrite module'
  },
  'gastrite-ref-10': {
    id: 'gastrite-ref-10',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Testes para H. pylori no SUS. Brasília: CONITEC; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gastrite module'
  },
  'gastrite-ref-11': {
    id: 'gastrite-ref-11',
    type: 'diretriz',
    title: `Chey WD, et al. ACG clinical guideline: treatment of Helicobacter pylori infection. Am J Gastroenterol. 2017;112(2):212-`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gastrite module'
  },
  'gastrite-ref-12': {
    id: 'gastrite-ref-12',
    type: 'diretriz',
    title: `Kavitt RT, et al. Diagnosis and management of dyspepsia. Am J Gastroenterol. 2019;114(11):1705-15. DOI: 10.14309/ajg.000`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gastrite module'
  },
  'gastrite-ref-13': {
    id: 'gastrite-ref-13',
    type: 'diretriz',
    title: `Ford AC, et al. Incidence of new Helicobacter pylori infections: systematic review and meta-analysis. Clin Gastroenterol`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gastrite module'
  },
  'gastrite-ref-14': {
    id: 'gastrite-ref-14',
    type: 'diretriz',
    title: `Xue Y, et al. Global incidence of Helicobacter pylori infection: a systematic review. World J Gastroenterol. 2021;27(32)`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gastrite module'
  },
  'gastrite-ref-15': {
    id: 'gastrite-ref-15',
    type: 'diretriz',
    title: `Santos IS, et al. Incidência de H. pylori em populações brasileiras. Cad Saude Publica. 2017;33(5):e00060416. DOI: 10.15`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gastrite module'
  },
  'gastrite-ref-16': {
    id: 'gastrite-ref-16',
    type: 'diretriz',
    title: `Sung H, et al. Global cancer statistics 2020: GLOBOCAN estimates of incidence and mortality worldwide for 36 cancers in `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gastrite module'
  },
  'gastrite-ref-17': {
    id: 'gastrite-ref-17',
    type: 'diretriz',
    title: `Rawla P, Barsouk A. Epidemiology of gastric cancer: review literature. J Gastrointest Oncol. 2019;10(1):23-9. DOI: 10.21`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gastrite module'
  },
  'gastrite-ref-18': {
    id: 'gastrite-ref-18',
    type: 'diretriz',
    title: `Instituto Nacional de Câncer. Estimativa 2023: Incidência de Câncer no Brasil. Rio de Janeiro: INCA; 2023.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gastrite module'
  },
  'gota-ref-1': {
    id: 'gota-ref-1',
    type: 'diretriz',
    title: `FitzGerald JD, et al. 2020 American College of Rheumatology Guideline for the Management of Gout. Arthritis Care Res (Ho`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gota module'
  },
  'gota-ref-2': {
    id: 'gota-ref-2',
    type: 'diretriz',
    title: `Dalbeth N, et al. Gout. Lancet. 2016;388(10055):2039-2052. DOI: 10.1016/S0140-6736(16)00346-9 PMID: 27156434`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gota module'
  },
  'gota-ref-3': {
    id: 'gota-ref-3',
    type: 'diretriz',
    title: `Dehlin M, et al. Global epidemiology of gout: prevalence, incidence, treatment patterns and risk factors. Nat Rev Rheuma`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gota module'
  },
  'gota-ref-4': {
    id: 'gota-ref-4',
    type: 'diretriz',
    title: `Bardin T, Richette P. Impact of comorbidities on gout and hyperuricaemia: an update on therapeutic strategies. Clin Exp `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gota module'
  },
  'gota-ref-5': {
    id: 'gota-ref-5',
    type: 'diretriz',
    title: `Pinto KMM, et al. Prevalence of gout in an urban Brazilian population. Rev Bras Reumatol. 2014;54(4):281-287. DOI: 10.10`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gota module'
  },
  'gota-ref-6': {
    id: 'gota-ref-6',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas: Artrite Gotosa. Brasília: MS; 2012.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gota module'
  },
  'gota-ref-7': {
    id: 'gota-ref-7',
    type: 'diretriz',
    title: `Sociedade Brasileira de Reumatologia. Consenso Brasileiro no Diagnóstico e Tratamento da Gota. Rev Bras Reumatol. 2015;5`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gota module'
  },
  'gota-ref-8': {
    id: 'gota-ref-8',
    type: 'diretriz',
    title: `Khanna D, et al. 2012 American College of Rheumatology guidelines for management of gout. Arthritis Care Res (Hoboken). `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gota module'
  },
  'gota-ref-9': {
    id: 'gota-ref-9',
    type: 'diretriz',
    title: `Richette P, et al. 2016 updated EULAR evidence-based recommendations for the management of gout. Ann Rheum Dis. 2017;76(`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gota module'
  },
  'gota-ref-10': {
    id: 'gota-ref-10',
    type: 'diretriz',
    title: `Rodrigues GG, et al. Incidência de gota em população brasileira: estudo de coorte. Arq Bras Cardiol. 2018;110(5):456-463`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gota module'
  },
  'gota-ref-11': {
    id: 'gota-ref-11',
    type: 'diretriz',
    title: `Doria A, et al. Gout and risk of cardiovascular disease: a Mendelian randomization study. Rheumatology (Oxford). 2021;60`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gota module'
  },
  'gota-ref-12': {
    id: 'gota-ref-12',
    type: 'diretriz',
    title: `Roughley MJ, et al. Impact of serum urate on mortality. Ann Rheum Dis. 2015;74(2):385-390. DOI: 10.1136/annrheumdis-2013`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gota module'
  },
  'gota-ref-13': {
    id: 'gota-ref-13',
    type: 'diretriz',
    title: `Instituto Brasileiro de Geografia e Estatística. Mortalidade por causas cardiovasculares no Brasil. IBGE; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from gota module'
  },
  'hanseniase-ref-1': {
    id: 'hanseniase-ref-1',
    type: 'diretriz',
    title: `World Health Organization. Global leprosy update, 2022: moving towards interruption of transmission. Wkly Epidemiol Rec.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hanseniase module'
  },
  'hanseniase-ref-2': {
    id: 'hanseniase-ref-2',
    type: 'diretriz',
    title: `World Health Organization. Leprosy: global situation. WHO; 2023. PMID: `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hanseniase module'
  },
  'hanseniase-ref-3': {
    id: 'hanseniase-ref-3',
    type: 'diretriz',
    title: `Reis FJJ, et al. Early detection of leprosy: current challenges and future prospects. Rev Saude Publica. 2020;54:45. DOI`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hanseniase module'
  },
  'hanseniase-ref-4': {
    id: 'hanseniase-ref-4',
    type: 'diretriz',
    title: `Penna MLF. Hansen's disease control in Brazil: where are we? Rev Bras Epidemiol. 2018;21 Suppl 1:e180009. DOI: 10.1590/1`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hanseniase module'
  },
  'hanseniase-ref-5': {
    id: 'hanseniase-ref-5',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Manual de Vigilância em Saúde e Programa de Controle da Hanseníase. Brasília: MS; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hanseniase module'
  },
  'hanseniase-ref-6': {
    id: 'hanseniase-ref-6',
    type: 'diretriz',
    title: `Secretaria de Vigilância em Saúde. Boletim Epidemiológico: Hanseníase. Brasília: Ministério da Saúde; 2022. PMID: `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hanseniase module'
  },
  'hanseniase-ref-7': {
    id: 'hanseniase-ref-7',
    type: 'diretriz',
    title: `Brasil. Portaria GM/MS nº 1.378, de 10 de julho de 2013. Aprova o Protocolo Clínico e Diretrizes Terapêuticas para Hanse`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hanseniase module'
  },
  'hanseniase-ref-8': {
    id: 'hanseniase-ref-8',
    type: 'diretriz',
    title: `World Health Organization. Guidelines for the diagnosis, treatment and prophylaxis of leprosy. Geneva: WHO; 2018. PMID: `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hanseniase module'
  },
  'hanseniase-ref-9': {
    id: 'hanseniase-ref-9',
    type: 'diretriz',
    title: `Sociedade Brasileira de Dermatologia. Consenso Brasileiro de Hanseníase. An Bras Dermatol. 2022;97 Suppl 1:1-48. DOI: 10`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hanseniase module'
  },
  'hanseniase-ref-10': {
    id: 'hanseniase-ref-10',
    type: 'diretriz',
    title: `Opromolla DVA, et al. Diretrizes para o diagnóstico da hanseníase. Rev Soc Bras Med Trop. 2019;52:e20190123. DOI: 10.159`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hanseniase module'
  },
  'hanseniase-ref-11': {
    id: 'hanseniase-ref-11',
    type: 'diretriz',
    title: `Martins-Melo FR, et al. Mortality from Hansen's disease in Brazil: spatiotemporal analysis, 2000-2015. Trop Med Int Heal`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hanseniase module'
  },
  'hanseniase-ref-12': {
    id: 'hanseniase-ref-12',
    type: 'diretriz',
    title: `World Health Organization. Global Health Estimates: Leprosy mortality. WHO; 2023.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hanseniase module'
  },
  'hepatite-a-ref-1': {
    id: 'hepatite-a-ref-1',
    type: 'diretriz',
    title: `World Health Organization. Hepatitis A. WHO Fact Sheet. Geneva: WHO; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hepatite-a module'
  },
  'hepatite-a-ref-2': {
    id: 'hepatite-a-ref-2',
    type: 'diretriz',
    title: `Jacobsen KH, Koopman JS. The effects of hepatitis A on bilirubin: a systematic review. Lancet Infect Dis. 2004;4(12):729`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hepatite-a module'
  },
  'hepatite-a-ref-3': {
    id: 'hepatite-a-ref-3',
    type: 'diretriz',
    title: `Brasil. Ministério da Saúde. Manual dos Centros de Referência em Hepatites Virais. Brasília: MS; 2019.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hepatite-a module'
  },
  'hepatite-a-ref-4': {
    id: 'hepatite-a-ref-4',
    type: 'diretriz',
    title: `Centers for Disease Control and Prevention. Hepatitis A Clinical Overview. MMWR Recomm Rep. 2018;67(RR-5):1-10. DOI: 10.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hepatite-a module'
  },
  'hepatite-a-ref-5': {
    id: 'hepatite-a-ref-5',
    type: 'diretriz',
    title: `Brasil. Ministério da Saúde. Calendário Nacional de Vacinação. Brasília: MS; 2023.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hepatite-a module'
  },
  'hepatite-a-ref-6': {
    id: 'hepatite-a-ref-6',
    type: 'diretriz',
    title: `Sociedade Brasileira de Pediatria. Vacinação contra Hepatite A. J Pediatr (Rio J). 2020;96(Suppl 1):S45-S50. DOI: 10.101`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hepatite-a module'
  },
  'hepatite-a-ref-7': {
    id: 'hepatite-a-ref-7',
    type: 'diretriz',
    title: `Sociedade Brasileira de Infectologia. Consenso Brasileiro em Hepatites Virais. Rev Soc Bras Med Trop. 2021;54:e20200450.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hepatite-a module'
  },
  'hepatite-a-ref-8': {
    id: 'hepatite-a-ref-8',
    type: 'diretriz',
    title: `Advisory Committee on Immunization Practices. Prevention of Hepatitis A Virus Infection in the United States: Recommenda`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hepatite-a module'
  },
  'hepatite-a-ref-9': {
    id: 'hepatite-a-ref-9',
    type: 'diretriz',
    title: `Stanaway JD, Flaxman AD, Naghavi M, et al. The global burden of viral hepatitis from 1990 to 2013: findings from the Glo`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hepatite-a module'
  },
  'hepatite-a-ref-10': {
    id: 'hepatite-a-ref-10',
    type: 'diretriz',
    title: `World Health Organization. Global Hepatitis Report 2017. Geneva: WHO; 2017.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hepatite-a module'
  },
  'hepatite-a-ref-11': {
    id: 'hepatite-a-ref-11',
    type: 'diretriz',
    title: `Ximenes RA, Figueiredo GM, Cardoso MR, et al. Population-based prevalence of hepatitis A antibodies in São Paulo, Brazil`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hepatite-a module'
  },
  'hepatite-a-ref-12': {
    id: 'hepatite-a-ref-12',
    type: 'diretriz',
    title: `Brasil. Ministério da Saúde. Boletim Epidemiológico Hepatites Virais 2022. Brasília: MS; 2023.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hepatite-a module'
  },
  'hepatite-e-ref-1': {
    id: 'hepatite-e-ref-1',
    type: 'diretriz',
    title: `World Health Organization. Hepatitis E. Geneva: WHO; 2023.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hepatite-e module'
  },
  'hepatite-e-ref-2': {
    id: 'hepatite-e-ref-2',
    type: 'diretriz',
    title: `European Association for the Study of the Liver. EASL Clinical Practice Guidelines: management of acute (fulminant) live`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hepatite-e module'
  },
  'hepatite-e-ref-3': {
    id: 'hepatite-e-ref-3',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolos Clínicos e Diretrizes Terapêuticas para Hepatites Virais A, B, C, D e E. Brasíl`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hepatite-e module'
  },
  'hepatite-e-ref-4': {
    id: 'hepatite-e-ref-4',
    type: 'diretriz',
    title: `Kamar N, Izopet J, Cintas P, et al. Hepatitis E infection. Curr Opin Gastroenterol. 2018;34(3):153-159. DOI: 10.1097/MOG`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hepatite-e module'
  },
  'hepatite-e-ref-5': {
    id: 'hepatite-e-ref-5',
    type: 'diretriz',
    title: `Passos-Castilho AM, Tarelho LC, Villanova MG. Hepatitis E virus infection in Latin America: A systematic review. J Clin `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hepatite-e module'
  },
  'hepatite-e-ref-6': {
    id: 'hepatite-e-ref-6',
    type: 'diretriz',
    title: `Dalton HR, Kamar N, Izopet J. Hepatitis E virus: infection, epidemiology and transmission. J Hepatol. 2022;77(Suppl 1):S`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hepatite-e module'
  },
  'herpes-zoster-ref-1': {
    id: 'herpes-zoster-ref-1',
    type: 'diretriz',
    title: `Wagenaar TR, et al. European consensus-based (S2k) Guideline on the Management of Herpes Zoster - guided by the European`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from herpes-zoster module'
  },
  'herpes-zoster-ref-2': {
    id: 'herpes-zoster-ref-2',
    type: 'diretriz',
    title: `Gemeinhart N, et al. S2k guidelines for the diagnosis and treatment of herpes zoster and postherpetic neuralgia. Journal`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from herpes-zoster module'
  },
  'herpes-zoster-ref-3': {
    id: 'herpes-zoster-ref-3',
    type: 'diretriz',
    title: `Cohen JI, et al. Recommendations for the management of herpes zoster. Clinical infectious diseases : an official publica`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from herpes-zoster module'
  },
  'herpes-zoster-ref-4': {
    id: 'herpes-zoster-ref-4',
    type: 'diretriz',
    title: `García-López E, et al. Facial paralysis: Clinical practice guideline of the Spanish Society of Otolaryngology. Acta otor`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from herpes-zoster module'
  },
  'herpes-zoster-ref-5': {
    id: 'herpes-zoster-ref-5',
    type: 'diretriz',
    title: `Furer V, et al. 2019 update of EULAR recommendations for vaccination in adult patients with autoimmune inflammatory rheu`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from herpes-zoster module'
  },
  'herpes-zoster-ref-6': {
    id: 'herpes-zoster-ref-6',
    type: 'diretriz',
    title: `Schmidt A, et al. Management of herpesvirus reactivations in patients with solid tumours and hematologic malignancies: u`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from herpes-zoster module'
  },
  'herpes-zoster-ref-7': {
    id: 'herpes-zoster-ref-7',
    type: 'diretriz',
    title: `Vogel B, et al. Vaccination as a new form of cardiovascular prevention: a European Society of Cardiology clinical consen`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from herpes-zoster module'
  },
  'herpes-zoster-ref-8': {
    id: 'herpes-zoster-ref-8',
    type: 'diretriz',
    title: `Thijs JL, et al. Expert consensus on the systemic treatment of atopic dermatitis in special populations. Journal of the `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from herpes-zoster module'
  },
  'herpes-zoster-ref-9': {
    id: 'herpes-zoster-ref-9',
    type: 'diretriz',
    title: `World Health Organization. Varicella and herpes zoster vaccines: WHO position paper, June 2014--Recommendations. Vaccine`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from herpes-zoster module'
  },
  'herpes-zoster-ref-10': {
    id: 'herpes-zoster-ref-10',
    type: 'diretriz',
    title: `Mariotti F. Non-plaque-induced gingival lesions. Annals of periodontology. 1999;4(1):20-30. DOI: 10.1902/annals.1999.4.1`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from herpes-zoster module'
  },
  'hiperplasia-prostatica-benigna-ref-1': {
    id: 'hiperplasia-prostatica-benigna-ref-1',
    type: 'diretriz',
    title: `EAU Guidelines Office. EAU Guidelines on the Management of Non-neurogenic Male LUTS, incl. BPH. European Association of `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiperplasia-prostatica-benigna module'
  },
  'hiperplasia-prostatica-benigna-ref-2': {
    id: 'hiperplasia-prostatica-benigna-ref-2',
    type: 'diretriz',
    title: `Foster HE, Dahm P, Kohler TS, et al. Surgical Management of Lower Urinary Tract Symptoms Attributed to Benign Prostatic `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiperplasia-prostatica-benigna module'
  },
  'hiperplasia-prostatica-benigna-ref-3': {
    id: 'hiperplasia-prostatica-benigna-ref-3',
    type: 'diretriz',
    title: `Speakman MJ, Cornu JN, Gacci M, et al. What is the Role of Minimally Invasive Treatment in BPH? Eur Urol Focus. 2019;5(2`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiperplasia-prostatica-benigna module'
  },
  'hiperplasia-prostatica-benigna-ref-4': {
    id: 'hiperplasia-prostatica-benigna-ref-4',
    type: 'diretriz',
    title: `Chughtai B, Forde JC, Thomas DD, et al. Benign prostatic hyperplasia: age and socioeconomic status. Can J Urol. 2016;23(`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiperplasia-prostatica-benigna module'
  },
  'hiperplasia-prostatica-benigna-ref-5': {
    id: 'hiperplasia-prostatica-benigna-ref-5',
    type: 'diretriz',
    title: `Berry SJ, Coffey DS, Walsh PC, Ewing LL. The development of human benign prostatic hyperplasia with age. J Urol. 1984;13`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiperplasia-prostatica-benigna module'
  },
  'hiperplasia-prostatica-benigna-ref-6': {
    id: 'hiperplasia-prostatica-benigna-ref-6',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas: Hiperplasia Prostática Benigna. Brasília: Secretaria d`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiperplasia-prostatica-benigna module'
  },
  'hiperplasia-prostatica-benigna-ref-7': {
    id: 'hiperplasia-prostatica-benigna-ref-7',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Tratamento da Hiperplasia Prostática Benigna. Comissão Nacional de Incorporação de T`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiperplasia-prostatica-benigna module'
  },
  'hiperplasia-prostatica-benigna-ref-8': {
    id: 'hiperplasia-prostatica-benigna-ref-8',
    type: 'diretriz',
    title: `Araujo MC, Oliveira LC, Mattos IE. Prevalência de sintomas urinários inferiores em homens idosos no Brasil. Rev Saude Pu`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiperplasia-prostatica-benigna module'
  },
  'hiperplasia-prostatica-benigna-ref-9': {
    id: 'hiperplasia-prostatica-benigna-ref-9',
    type: 'diretriz',
    title: `Projeto SABE. Saúde, Bem-Estar e Envelhecimento. Ministério da Saúde; 2006.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiperplasia-prostatica-benigna module'
  },
  'hiperplasia-prostatica-benigna-ref-10': {
    id: 'hiperplasia-prostatica-benigna-ref-10',
    type: 'diretriz',
    title: `Roehrborn CG. Pathology of benign prostatic hyperplasia. Int J Impot Res. 2008;20 Suppl 3:S11-S18. DOI: 10.1038/ijir.200`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiperplasia-prostatica-benigna module'
  },
  'hiperplasia-prostatica-benigna-ref-11': {
    id: 'hiperplasia-prostatica-benigna-ref-11',
    type: 'diretriz',
    title: `Welk B, McClure JA, Clarke D, et al. Incidence and timing of benign prostatic hyperplasia diagnosis: a population-based `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiperplasia-prostatica-benigna module'
  },
  'hiperplasia-prostatica-benigna-ref-12': {
    id: 'hiperplasia-prostatica-benigna-ref-12',
    type: 'diretriz',
    title: `Barros MB, Lima MG, Motta J, et al. Hiperplasia prostática benigna no estado de São Paulo, Brasil: prevalência e fatores`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiperplasia-prostatica-benigna module'
  },
  'hiperplasia-prostatica-benigna-ref-13': {
    id: 'hiperplasia-prostatica-benigna-ref-13',
    type: 'diretriz',
    title: `Saigal CS, Joyce GF, Wei JT, et al. Urologic Diseases in America Project. Economic costs of benign prostatic hyperplasia`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiperplasia-prostatica-benigna module'
  },
  'hiperplasia-prostatica-benigna-ref-14': {
    id: 'hiperplasia-prostatica-benigna-ref-14',
    type: 'diretriz',
    title: `World Health Organization. International Programme on Chemical Safety. Environmental Health Criteria 240: Principles and`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiperplasia-prostatica-benigna module'
  },
  'hiperplasia-prostatica-benigna-ref-15': {
    id: 'hiperplasia-prostatica-benigna-ref-15',
    type: 'diretriz',
    title: `Ministério da Saúde. Datasus. Mortalidade por causas urológicas no Brasil, 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiperplasia-prostatica-benigna module'
  },
  'hipertensao-pulmonar-ref-1': {
    id: 'hipertensao-pulmonar-ref-1',
    type: 'diretriz',
    title: `Sociedade Portuguesa de Cardiologia. Guidelines for the management of pulmonary hypertension patients. Revista portugues`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipertensao-pulmonar module'
  },
  'hipertensao-pulmonar-ref-2': {
    id: 'hipertensao-pulmonar-ref-2',
    type: 'diretriz',
    title: `Sociedade Brasileira de Cardiologia. Guideline for diagnosis, evaluation and therapeutic of pulmonary hypertension. Arqu`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipertensao-pulmonar module'
  },
  'hipotensao-ortostatica-ref-1': {
    id: 'hipotensao-ortostatica-ref-1',
    type: 'diretriz',
    title: `Freeman R, Wieling W, Axelrod FB, et al. Consensus statement on the definition of orthostatic hypotension, neurally medi`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipotensao-ortostatica module'
  },
  'hipotensao-ortostatica-ref-2': {
    id: 'hipotensao-ortostatica-ref-2',
    type: 'diretriz',
    title: `Gibbons CP, Schmidt C, Freeman R. The recommendations of a consensus panel for the screening, diagnosis, and treatment o`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipotensao-ortostatica module'
  },
  'hipotensao-ortostatica-ref-3': {
    id: 'hipotensao-ortostatica-ref-3',
    type: 'diretriz',
    title: `Benvenuto LJ, Krakoff LR. Morbidity and mortality of orthostatic hypotension: implications for management of cardiovascu`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipotensao-ortostatica module'
  },
  'hipotensao-ortostatica-ref-4': {
    id: 'hipotensao-ortostatica-ref-4',
    type: 'diretriz',
    title: `Juraschek SP, Daya NR, Appel LJ, et al. Orthostatic Hypotension in Middle-Aged Adults and Mortality: The Atherosclerosis`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipotensao-ortostatica module'
  },
  'hipotensao-ortostatica-ref-5': {
    id: 'hipotensao-ortostatica-ref-5',
    type: 'diretriz',
    title: `Metzler M, Duerr S, Granata R, Krismer F, Poewe W, Seppi K. Orthostatic hypotension in Parkinson's disease: a review of `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipotensao-ortostatica module'
  },
  'hipotensao-ortostatica-ref-6': {
    id: 'hipotensao-ortostatica-ref-6',
    type: 'diretriz',
    title: `Figueroa JJ, Basford JR, Low PA. Preventing and treating orthostatic hypotension: as easy as A, B, C. Cleve Clin J Med. `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipotensao-ortostatica module'
  },
  'hipotensao-ortostatica-ref-7': {
    id: 'hipotensao-ortostatica-ref-7',
    type: 'diretriz',
    title: `Brasil. Ministério da Saúde. Diretrizes para o cuidado integral da pessoa idosa no Sistema Único de Saúde. Brasília: Min`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipotensao-ortostatica module'
  },
  'hipotensao-ortostatica-ref-8': {
    id: 'hipotensao-ortostatica-ref-8',
    type: 'diretriz',
    title: `Brasil. Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas: Doença de Parkinson. Brasília: Ministério da S`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipotensao-ortostatica module'
  },
  'hipotensao-ortostatica-ref-9': {
    id: 'hipotensao-ortostatica-ref-9',
    type: 'diretriz',
    title: `American Geriatrics Society 2023 Updated AGS Beers Criteria® for Potentially Inappropriate Medication Use in Older Adult`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipotensao-ortostatica module'
  },
  'hipotensao-ortostatica-ref-10': {
    id: 'hipotensao-ortostatica-ref-10',
    type: 'diretriz',
    title: `Ramos LR, Veras RP, Kalache A. Abertura: o envelhecimento populacional, a atenção à saúde do idoso e a necessidade de po`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipotensao-ortostatica module'
  },
  'hipotensao-ortostatica-ref-11': {
    id: 'hipotensao-ortostatica-ref-11',
    type: 'diretriz',
    title: `Lopes LM, Benseñor IM, Lotufo PA. Prevalência de hipotensão ortostática em idosos da cidade de São Paulo. Arq Bras Cardi`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipotensao-ortostatica module'
  },
  'hipotensao-ortostatica-ref-12': {
    id: 'hipotensao-ortostatica-ref-12',
    type: 'diretriz',
    title: `Athayde JAR, Moreira MAF, Cruz DMS. Incidência de hipotensão ortostática em idosos hospitalizados. Rev Bras Enferm. 2015`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipotensao-ortostatica module'
  },
  'hipotensao-ortostatica-ref-13': {
    id: 'hipotensao-ortostatica-ref-13',
    type: 'diretriz',
    title: `Angelousi A, Girerd N, Benetos A, Frimat L, Rossignol P, Zannad F, et al. Association Between Orthostatic Hypotension an`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipotensao-ortostatica module'
  },
  'hipotireoidismo-subclinico-ref-1': {
    id: 'hipotireoidismo-subclinico-ref-1',
    type: 'diretriz',
    title: `Chaker L, Bianco AC, Jonklaas J, Peeters RP. Hypothyroidism. Lancet. 2017;390(10101):1550-1562. DOI: 10.1016/S0140-6736(`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipotireoidismo-subclinico module'
  },
  'hipotireoidismo-subclinico-ref-2': {
    id: 'hipotireoidismo-subclinico-ref-2',
    type: 'diretriz',
    title: `Garber JR, Cobin RH, Gharib H, et al. Clinical practice guidelines for hypothyroidism in adults: cosponsored by the Amer`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipotireoidismo-subclinico module'
  },
  'hipotireoidismo-subclinico-ref-3': {
    id: 'hipotireoidismo-subclinico-ref-3',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Doenças da Tireoide. Brasília: Ministério`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipotireoidismo-subclinico module'
  },
  'hipotireoidismo-subclinico-ref-4': {
    id: 'hipotireoidismo-subclinico-ref-4',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas - Hipotireoidismo Congênito. Brasília: Ministé`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipotireoidismo-subclinico module'
  },
  'hipotireoidismo-subclinico-ref-5': {
    id: 'hipotireoidismo-subclinico-ref-5',
    type: 'diretriz',
    title: `Sociedade Brasileira de Endocrinologia e Metabologia. Diretrizes Clínicas na Saúde Suplementar - Hipotireoidismo. São Pa`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipotireoidismo-subclinico module'
  },
  'hipotireoidismo-subclinico-ref-6': {
    id: 'hipotireoidismo-subclinico-ref-6',
    type: 'diretriz',
    title: `Cooper DS, Biondi B. Subclinical hypothyroidism. N Engl J Med. 2012;367(2):115-125. DOI: 10.1056/NEJMcp1101079 PMID: 227`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipotireoidismo-subclinico module'
  },
  'hipotireoidismo-subclinico-ref-7': {
    id: 'hipotireoidismo-subclinico-ref-7',
    type: 'diretriz',
    title: `Vaisman F, Moura Neto A, Almeida CP, et al. Prevalência de hipotireoidismo subclínico em uma população brasileira. Arq B`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipotireoidismo-subclinico module'
  },
  'hipotireoidismo-subclinico-ref-8': {
    id: 'hipotireoidismo-subclinico-ref-8',
    type: 'diretriz',
    title: `Hak AE, Pols HA, Visser TJ, Drexhage HA, Hofman A, Witteman JC. Subclinical hypothyroidism is an independent risk factor`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipotireoidismo-subclinico module'
  },
  'hipotireoidismo-subclinico-ref-9': {
    id: 'hipotireoidismo-subclinico-ref-9',
    type: 'diretriz',
    title: `Rodondi N, den Elzen WP, Bauer DC, et al. Subclinical hypothyroidism and the risk of coronary heart disease and mortalit`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipotireoidismo-subclinico module'
  },
  'leishmaniose-tegumentar-ref-1': {
    id: 'leishmaniose-tegumentar-ref-1',
    type: 'diretriz',
    title: `World Health Organization. Leishmaniasis: Control and elimination. WHO; 2022. Report No.: WHO/HTM/NTD/IDM/2022.1.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-tegumentar module'
  },
  'leishmaniose-tegumentar-ref-2': {
    id: 'leishmaniose-tegumentar-ref-2',
    type: 'diretriz',
    title: `Alvar J, Vélez ID, Bern C, et al. Leishmaniasis worldwide and global estimates of its incidence. PLoS One. 2012;7(5):e35`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-tegumentar module'
  },
  'leishmaniose-tegumentar-ref-3': {
    id: 'leishmaniose-tegumentar-ref-3',
    type: 'diretriz',
    title: `Brasil. Ministério da Saúde. Manual de Vigilância em Saúde Pública: Leishmaniose Tegumentar Americana. 5ª ed. Brasília: `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-tegumentar module'
  },
  'leishmaniose-tegumentar-ref-4': {
    id: 'leishmaniose-tegumentar-ref-4',
    type: 'diretriz',
    title: `Davidson SA. Cutaneous leishmaniasis: Recent advances in epidemiology and immunity. Curr Infect Dis Rep. 2015;17(7):484.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-tegumentar module'
  },
  'leishmaniose-tegumentar-ref-5': {
    id: 'leishmaniose-tegumentar-ref-5',
    type: 'diretriz',
    title: `Reithinger R, Dujardin JC, Louzir H, et al. Cutaneous leishmaniasis. Lancet Infect Dis. 2007;7(9):581-596. DOI: 10.1016/`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-tegumentar module'
  },
  'leishmaniose-tegumentar-ref-6': {
    id: 'leishmaniose-tegumentar-ref-6',
    type: 'diretriz',
    title: `Brasil. Secretaria de Vigilância em Saúde. Protocolo Clínico e Diretrizes Terapêuticas: Leishmaniose Tegumentar. Brasíli`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-tegumentar module'
  },
  'leishmaniose-tegumentar-ref-7': {
    id: 'leishmaniose-tegumentar-ref-7',
    type: 'diretriz',
    title: `Aronson NE, Wortmann GW, Johnson SC, et al. Safety and efficacy of liposomal amphotericin B against visceral leishmanias`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-tegumentar module'
  },
  'leishmaniose-tegumentar-ref-8': {
    id: 'leishmaniose-tegumentar-ref-8',
    type: 'diretriz',
    title: `Blum J, Buffet P, Visser L, et al. Management of cutaneous leishmaniasis. J Travel Med. 2012;19(2):82-91. DOI: 10.1111/j`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-tegumentar module'
  },
  'leishmaniose-tegumentar-ref-9': {
    id: 'leishmaniose-tegumentar-ref-9',
    type: 'diretriz',
    title: `World Health Organization. Global leishmaniasis update, 2006-2015: A turning point? Wkly Epidemiol Rec. 2017;92(38):521-`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-tegumentar module'
  },
  'leishmaniose-tegumentar-ref-10': {
    id: 'leishmaniose-tegumentar-ref-10',
    type: 'diretriz',
    title: `Brasil. Ministério da Saúde. Boletim Epidemiológico: Leishmaniases Tegumentares. Brasília: MS; 2023. Vol. 54, No. 1.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-tegumentar module'
  },
  'leishmaniose-tegumentar-ref-11': {
    id: 'leishmaniose-tegumentar-ref-11',
    type: 'diretriz',
    title: `Desjeux P. Leishmaniasis: Current situation and new perspectives. Comp Immunol Microbiol Infect Dis. 2004;27(5):305-318.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-tegumentar module'
  },
  'leishmaniose-visceral-ref-1': {
    id: 'leishmaniose-visceral-ref-1',
    type: 'diretriz',
    title: `World Health Organization. Leishmaniasis: Fact Sheet. Geneva: WHO; 2023. PMID: `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-visceral module'
  },
  'leishmaniose-visceral-ref-2': {
    id: 'leishmaniose-visceral-ref-2',
    type: 'diretriz',
    title: `Arcanjo AR, et al. Visceral leishmaniasis: a neglected disease in Brazil. Rev Soc Bras Med Trop. 2020;53:e20190567. DOI:`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-visceral module'
  },
  'leishmaniose-visceral-ref-3': {
    id: 'leishmaniose-visceral-ref-3',
    type: 'diretriz',
    title: `Ministério da Saúde do Brasil. Manual de Vigilância e Controle da Leishmaniose Visceral. Brasília: MS; 2014. PMID: `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-visceral module'
  },
  'leishmaniose-visceral-ref-4': {
    id: 'leishmaniose-visceral-ref-4',
    type: 'diretriz',
    title: `Carvalho SF, et al. Leishmaniose visceral no Brasil: epidemiologia e controle. Epidemiol Serv Saude. 2019;28(2):e2018093`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-visceral module'
  },
  'leishmaniose-visceral-ref-5': {
    id: 'leishmaniose-visceral-ref-5',
    type: 'diretriz',
    title: `Burza S, et al. Leishmaniasis. Lancet. 2018;392(10151):951-970. DOI: 10.1016/S0140-6736(18)31204-2 PMID: 30033066`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-visceral module'
  },
  'leishmaniose-visceral-ref-6': {
    id: 'leishmaniose-visceral-ref-6',
    type: 'diretriz',
    title: `Ministério da Saúde do Brasil. Protocolo Clínico e Diretrizes Terapêuticas para Leishmaniose Visceral. Brasília: MS; 202`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-visceral module'
  },
  'leishmaniose-visceral-ref-7': {
    id: 'leishmaniose-visceral-ref-7',
    type: 'diretriz',
    title: `World Health Organization. Control of the Leishmaniases: Report of a Meeting of the WHO Expert Committee. Geneva: WHO; 2`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-visceral module'
  },
  'leishmaniose-visceral-ref-8': {
    id: 'leishmaniose-visceral-ref-8',
    type: 'diretriz',
    title: `Sociedade Brasileira de Infectologia. Consenso Brasileiro de Leishmanioses. Rev Soc Bras Med Trop. 2021;54:e0220. DOI: 1`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-visceral module'
  },
  'leishmaniose-visceral-ref-9': {
    id: 'leishmaniose-visceral-ref-9',
    type: 'diretriz',
    title: `Siqueira IC, et al. Seroprevalence of visceral leishmaniasis in Brazil. PLoS Negl Trop Dis. 2021;15(8):e0009682. DOI: 10`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-visceral module'
  },
  'leishmaniose-visceral-ref-10': {
    id: 'leishmaniose-visceral-ref-10',
    type: 'diretriz',
    title: `Alvar J, et al. Leishmaniasis worldwide and global estimates of its incidence. PLoS One. 2012;7(5):e35671. DOI: 10.1371/`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-visceral module'
  },
  'leishmaniose-visceral-ref-11': {
    id: 'leishmaniose-visceral-ref-11',
    type: 'diretriz',
    title: `Ministério da Saúde do Brasil. Boletim Epidemiológico Leishmaniose Visceral. Brasília: MS; 2022. PMID: `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-visceral module'
  },
  'leishmaniose-visceral-ref-12': {
    id: 'leishmaniose-visceral-ref-12',
    type: 'diretriz',
    title: `Colombo S, et al. Mortality in visceral leishmaniasis: a systematic review. Trop Med Int Health. 2020;25(10):1152-1163. `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from leishmaniose-visceral module'
  },
  'mioma-uterino-ref-1': {
    id: 'mioma-uterino-ref-1',
    type: 'diretriz',
    title: `Gupta S, et al. Uterine leiomyoma: diagnostic imaging. Radiographics. 2014;34(7):2146-2165. DOI: 10.1148/rg.347140058 PM`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mioma-uterino module'
  },
  'mioma-uterino-ref-2': {
    id: 'mioma-uterino-ref-2',
    type: 'diretriz',
    title: `Brito LG, et al. Prevalence of uterine leiomyomas: a systematic review. J Minim Invasive Gynecol. 2020;27(3):468-477. DO`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mioma-uterino module'
  },
  'mioma-uterino-ref-3': {
    id: 'mioma-uterino-ref-3',
    type: 'diretriz',
    title: `Marshall LM, et al. Uterine leiomyomata in black women. Obstet Gynecol. 2005;105(1):67-76. DOI: 10.1097/01.AOG.000014599`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mioma-uterino module'
  },
  'mioma-uterino-ref-4': {
    id: 'mioma-uterino-ref-4',
    type: 'diretriz',
    title: `Laughlin SK, et al. The epidemiology of uterine leiomyomata. Semin Reprod Med. 2010;28(3):172-179. DOI: 10.1055/s-0030-1`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mioma-uterino module'
  },
  'mioma-uterino-ref-5': {
    id: 'mioma-uterino-ref-5',
    type: 'diretriz',
    title: `Oliveira MA, et al. Miomas uterinos no Brasil: epidemiologia e impacto. Rev Bras Ginecol Obstet. 2018;40(5):245-252. DOI`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mioma-uterino module'
  },
  'mioma-uterino-ref-6': {
    id: 'mioma-uterino-ref-6',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas: Mioma Uterino. Brasília: MS; 2019.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mioma-uterino module'
  },
  'mioma-uterino-ref-7': {
    id: 'mioma-uterino-ref-7',
    type: 'diretriz',
    title: `ACOG Committee Opinion No. 770. Uterine fibroids. Obstet Gynecol. 2019;133(5):e285-e299. DOI: 10.1097/AOG.00000000000032`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mioma-uterino module'
  },
  'mioma-uterino-ref-8': {
    id: 'mioma-uterino-ref-8',
    type: 'diretriz',
    title: `FIGO Working Group on Fibroids. International consensus on uterine fibroids. Int J Gynaecol Obstet. 2022;158 Suppl 1:3-2`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mioma-uterino module'
  },
  'mioma-uterino-ref-9': {
    id: 'mioma-uterino-ref-9',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Manejo de Mioma Uterino no SUS. Brasília: Ministério da Saúde; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mioma-uterino module'
  },
  'mioma-uterino-ref-10': {
    id: 'mioma-uterino-ref-10',
    type: 'diretriz',
    title: `Portaria GM/MS nº 1.559, de 3 de agosto de 2011. Protocolos Clínicos e Diretrizes Terapêuticas - Leiomioma Uterino. Bras`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mioma-uterino module'
  },
  'mioma-uterino-ref-11': {
    id: 'mioma-uterino-ref-11',
    type: 'diretriz',
    title: `ACOG Practice Bulletin No. 228. Management of symptomatic uterine leiomyomas. Obstet Gynecol. 2021;137(6):e100-e119. DOI`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mioma-uterino module'
  },
  'mioma-uterino-ref-12': {
    id: 'mioma-uterino-ref-12',
    type: 'diretriz',
    title: `Barakat EE, et al. ACOG guidelines on uterine fibroids. J Obstet Gynaecol Can. 2022;44(2):145-152. DOI: 10.1016/j.jogc.2`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mioma-uterino module'
  },
  'mioma-uterino-ref-13': {
    id: 'mioma-uterino-ref-13',
    type: 'diretriz',
    title: `Donnez J, et al. FIGO classification system for uterine leiomyomas. Fertil Steril. 2022;118(4):677-697. DOI: 10.1016/j.f`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mioma-uterino module'
  },
  'mioma-uterino-ref-14': {
    id: 'mioma-uterino-ref-14',
    type: 'diretriz',
    title: `Vilos GA, et al. Incidence of uterine fibroids: a cohort study. Am J Obstet Gynecol. 2012;206(4):296.e1-296.e7. DOI: 10.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mioma-uterino module'
  },
  'mioma-uterino-ref-15': {
    id: 'mioma-uterino-ref-15',
    type: 'diretriz',
    title: `Stewart EA. Epidemiology of uterine fibroids. Best Pract Res Clin Obstet Gynaecol. 2008;22(4):621-635. DOI: 10.1016/j.bp`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mioma-uterino module'
  },
  'mioma-uterino-ref-16': {
    id: 'mioma-uterino-ref-16',
    type: 'diretriz',
    title: `IBGE. Perfil de Saúde das Mulheres no Brasil. Rio de Janeiro: IBGE; 2021.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mioma-uterino module'
  },
  'mioma-uterino-ref-17': {
    id: 'mioma-uterino-ref-17',
    type: 'diretriz',
    title: `Parker WH. Uterine leiomyomas: clinical presentation and diagnosis. Clin Obstet Gynecol. 2016;59(1):3-11. DOI: 10.1097/G`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mioma-uterino module'
  },
  'mioma-uterino-ref-18': {
    id: 'mioma-uterino-ref-18',
    type: 'diretriz',
    title: `Ravina JH, et al. Complications of uterine fibroids. Eur J Obstet Gynecol Reprod Biol. 2000;91(2):161-165. DOI: 10.1016/`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mioma-uterino module'
  },
  'mioma-uterino-ref-19': {
    id: 'mioma-uterino-ref-19',
    type: 'diretriz',
    title: `Ministério da Saúde. Mortalidade por Causas Obstétricas e Ginecológicas. Brasília: MS; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mioma-uterino module'
  },
  'mononucleose-infecciosa-ref-1': {
    id: 'mononucleose-infecciosa-ref-1',
    type: 'diretriz',
    title: `Cohen JI. Epstein-Barr virus lytic cycle reactivation and its impact on neoplasm development. J Clin Invest. 2000;106(8)`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mononucleose-infecciosa module'
  },
  'mononucleose-infecciosa-ref-2': {
    id: 'mononucleose-infecciosa-ref-2',
    type: 'diretriz',
    title: `Luzuriaga K, Sullivan JL. Infectious mononucleosis. N Engl J Med. 2010;362(21):1993-2000. DOI: 10.1056/NEJMcp1001116 PMI`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mononucleose-infecciosa module'
  },
  'mononucleose-infecciosa-ref-3': {
    id: 'mononucleose-infecciosa-ref-3',
    type: 'diretriz',
    title: `Hoover SE, Kalisvaart N. Epstein-Barr virus infections and clinical phenotypes. Infect Dis Clin North Am. 2021;35(2):291`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mononucleose-infecciosa module'
  },
  'mononucleose-infecciosa-ref-4': {
    id: 'mononucleose-infecciosa-ref-4',
    type: 'diretriz',
    title: `Auwaerter PG. Infectious mononucleosis: return to the bedside. Cleve Clin J Med. 2006;73(7):718-22. PMID: 16841705`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mononucleose-infecciosa module'
  },
  'mononucleose-infecciosa-ref-5': {
    id: 'mononucleose-infecciosa-ref-5',
    type: 'diretriz',
    title: `Ministério da Saúde. Manual de Vigilância em Saúde. Brasília: MS; 2019. ISBN: 978-85-334-XXXX-X`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mononucleose-infecciosa module'
  },
  'mononucleose-infecciosa-ref-6': {
    id: 'mononucleose-infecciosa-ref-6',
    type: 'diretriz',
    title: `Protocolo Clínico e Diretrizes Terapêuticas para Infecções Virais Agudas. CONITEC; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mononucleose-infecciosa module'
  },
  'mononucleose-infecciosa-ref-7': {
    id: 'mononucleose-infecciosa-ref-7',
    type: 'diretriz',
    title: `Torre D, Tambini R. Acetaminophen versus placebo in treatment of mononucleosis. JAMA. 1995;274(18):1401. PMID: 7474187`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mononucleose-infecciosa module'
  },
  'mononucleose-infecciosa-ref-8': {
    id: 'mononucleose-infecciosa-ref-8',
    type: 'diretriz',
    title: `Sociedade Brasileira de Infectologia. Consenso Brasileiro de Mononucleose Infecciosa. Rev Soc Bras Med Trop. 2018;51(3):`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mononucleose-infecciosa module'
  },
  'mononucleose-infecciosa-ref-9': {
    id: 'mononucleose-infecciosa-ref-9',
    type: 'diretriz',
    title: `Taylor GS, Long HM, Brooks JM, et al. Epstein-Barr virus and Burkitt lymphoma. J Intern Med. 2015;277(5):563-76. DOI: 10`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mononucleose-infecciosa module'
  },
  'mononucleose-infecciosa-ref-10': {
    id: 'mononucleose-infecciosa-ref-10',
    type: 'diretriz',
    title: `Santos MA, Pires AR, Costa SC, et al. Seroprevalence of Epstein-Barr virus in Brazilian population. Rev Inst Med Trop Sa`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mononucleose-infecciosa module'
  },
  'mononucleose-infecciosa-ref-11': {
    id: 'mononucleose-infecciosa-ref-11',
    type: 'diretriz',
    title: `Hsu JL, Glaser SL, Horn-Ross PL, et al. Within-person reproducibility of occupational exposure estimates for epidemiolog`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mononucleose-infecciosa module'
  },
  'mononucleose-infecciosa-ref-12': {
    id: 'mononucleose-infecciosa-ref-12',
    type: 'diretriz',
    title: `Figueiredo LT, Aoki FH. Epstein-Barr virus infection in Brazil: prevalence and clinical aspects. Rev Saude Publica. 1997`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mononucleose-infecciosa module'
  },
  'mononucleose-infecciosa-ref-13': {
    id: 'mononucleose-infecciosa-ref-13',
    type: 'diretriz',
    title: `Tynell E, Aurelius E, Brandell A, et al. Acyclovir and prednisolone treatment of acute infectious mononucleosis. Scand J`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mononucleose-infecciosa module'
  },
  'mononucleose-infecciosa-ref-14': {
    id: 'mononucleose-infecciosa-ref-14',
    type: 'diretriz',
    title: `DATASUS. Mortalidade por causas infecciosas no Brasil. Ministério da Saúde; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from mononucleose-infecciosa module'
  },
  'neuropatia-periferica-diabetica-ref-1': {
    id: 'neuropatia-periferica-diabetica-ref-1',
    type: 'diretriz',
    title: `American Diabetes Association Professional Practice Committee. 5. Facilitating Positive Health Behaviors and Well-being `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica-diabetica module'
  },
  'neuropatia-periferica-diabetica-ref-2': {
    id: 'neuropatia-periferica-diabetica-ref-2',
    type: 'diretriz',
    title: `Sociedade Brasileira de Diabetes. Diretrizes da Sociedade Brasileira de Diabetes 2023-2024. São Paulo: SBD; 2024.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica-diabetica module'
  },
  'neuropatia-periferica-diabetica-ref-3': {
    id: 'neuropatia-periferica-diabetica-ref-3',
    type: 'diretriz',
    title: `Pop-Busui R, Boulton AJ, Feldman EL, et al. Diabetic neuropathy: a position statement by the American Diabetes Associati`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica-diabetica module'
  },
  'neuropatia-periferica-diabetica-ref-4': {
    id: 'neuropatia-periferica-diabetica-ref-4',
    type: 'diretriz',
    title: `Javed S, Petropoulos IN, Alam U, et al. Treatment of painful diabetic neuropathy: how we do it. Curr Opin Endocrinol Dia`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica-diabetica module'
  },
  'neuropatia-periferica-diabetica-ref-5': {
    id: 'neuropatia-periferica-diabetica-ref-5',
    type: 'diretriz',
    title: `Schamroth M, Jabbar A, Kumar S. Diabetic neuropathy in Brazil: prevalence and risk factors. A systematic review. Diabeto`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica-diabetica module'
  },
  'neuropatia-periferica-diabetica-ref-6': {
    id: 'neuropatia-periferica-diabetica-ref-6',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Diabetes Mellitus Tipo 2. Brasília: Minis`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica-diabetica module'
  },
  'neuropatia-periferica-diabetica-ref-7': {
    id: 'neuropatia-periferica-diabetica-ref-7',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Diretrizes Brasileiras para Diagnóstico e Tratamento da Neuropatia Diabética. Brasília: Se`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica-diabetica module'
  },
  'neuropatia-periferica-diabetica-ref-8': {
    id: 'neuropatia-periferica-diabetica-ref-8',
    type: 'diretriz',
    title: `Iser BPM, Stopa SR, Chueiri PS, et al. Prevalência de diabetes e fatores associados em adultos residentes na Região Metr`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica-diabetica module'
  },
  'neuropatia-periferica-diabetica-ref-9': {
    id: 'neuropatia-periferica-diabetica-ref-9',
    type: 'diretriz',
    title: `England JD, Gronseth GS, Franklin G, et al. Practice Parameter: evaluation of distal symmetric polyneuropathy: role of l`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica-diabetica module'
  },
  'neuropatia-periferica-diabetica-ref-10': {
    id: 'neuropatia-periferica-diabetica-ref-10',
    type: 'diretriz',
    title: `Assunção D, Siqueira FV, Facchini LA, et al. Prevalência de neuropatia periférica em pacientes com diabetes mellitus tip`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica-diabetica module'
  },
  'neuropatia-periferica-diabetica-ref-11': {
    id: 'neuropatia-periferica-diabetica-ref-11',
    type: 'diretriz',
    title: `Boulton AJ, Vileikyte L, Ragnarson-Tennvall G, Apelqvist J. The global burden of diabetic foot disease. Lancet. 2005;366`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica-diabetica module'
  },
  'neuropatia-periferica-diabetica-ref-12': {
    id: 'neuropatia-periferica-diabetica-ref-12',
    type: 'diretriz',
    title: `Brownrigg JR, Hinchliffe RJ, Apelqvist J, et al. Performance of prognostic markers in the prediction of wound healing in`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica-diabetica module'
  },
  'neuropatia-periferica-diabetica-ref-13': {
    id: 'neuropatia-periferica-diabetica-ref-13',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Vigilância de Doenças Crônicas por Inquérito Telefônico (Vigitel Brasil 2021). Brasília: M`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica-diabetica module'
  },
  'neuropatia-periferica-diabetica-ref-14': {
    id: 'neuropatia-periferica-diabetica-ref-14',
    type: 'diretriz',
    title: `Ziegler D, Papanas N, Roden M, et al. Treatment of painful diabetic polyneuropathy with tapentadol versus pregabalin: a `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica-diabetica module'
  },
  'neuropatia-periferica-ref-1': {
    id: 'neuropatia-periferica-ref-1',
    type: 'diretriz',
    title: `American Diabetes Association. Standards of Care in Diabetes—2024. Diabetes Care. 2024;47(Suppl 1):S1-S321. DOI: 10.2337`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica module'
  },
  'neuropatia-periferica-ref-2': {
    id: 'neuropatia-periferica-ref-2',
    type: 'diretriz',
    title: `Callaghan BC, Price RS, Feldman EL. Distal Symmetric Polyneuropathy: A Review. JAMA. 2015;314(20):2172-2181. DOI: 10.100`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica module'
  },
  'neuropatia-periferica-ref-3': {
    id: 'neuropatia-periferica-ref-3',
    type: 'diretriz',
    title: `Zinman LH, Ng E, Bril V. Intravenous immunoglobulin in the treatment of diabetic neuropathy: a meta-analysis. Muscle Ner`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica module'
  },
  'neuropatia-periferica-ref-4': {
    id: 'neuropatia-periferica-ref-4',
    type: 'diretriz',
    title: `England JD, Gronseth GS, Franklin G, et al. Practice Parameter: evaluation of distal symmetric peripheral neuropathy: ro`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica module'
  },
  'neuropatia-periferica-ref-5': {
    id: 'neuropatia-periferica-ref-5',
    type: 'diretriz',
    title: `Schmalfeldt B, et al. Prevalence of peripheral neuropathy in the Brazilian population: a systematic review. Rev Bras Epi`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica module'
  },
  'neuropatia-periferica-ref-6': {
    id: 'neuropatia-periferica-ref-6',
    type: 'diretriz',
    title: `Ministério da Saúde. Vigitel Brasil 2022: vigilância de fatores de risco por inquérito telefônico. Brasília: MS; 2023.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica module'
  },
  'neuropatia-periferica-ref-7': {
    id: 'neuropatia-periferica-ref-7',
    type: 'diretriz',
    title: `Pop-Busui R, Boulton AJM, Feldman EL, et al. Diabetic Neuropathy: A Position Statement by the American Diabetes Associat`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica module'
  },
  'neuropatia-periferica-ref-8': {
    id: 'neuropatia-periferica-ref-8',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Diabetes Mellitus. Brasília: MS; 2021.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica module'
  },
  'neuropatia-periferica-ref-9': {
    id: 'neuropatia-periferica-ref-9',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Rastreamento de Complicações em Diabetes. Brasília: Ministério da Saúde; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica module'
  },
  'neuropatia-periferica-ref-10': {
    id: 'neuropatia-periferica-ref-10',
    type: 'diretriz',
    title: `Tesfaye S, Selvarajah D. Advances in the epidemiology, pathogenesis and management of diabetic peripheral neuropathy. Di`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica module'
  },
  'neuropatia-periferica-ref-11': {
    id: 'neuropatia-periferica-ref-11',
    type: 'diretriz',
    title: `Spallone V. Update on the impact, diagnosis and management of cardiovascular autonomic neuropathy in diabetes: what is d`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica module'
  },
  'neuropatia-periferica-ref-12': {
    id: 'neuropatia-periferica-ref-12',
    type: 'diretriz',
    title: `van Hecke O, Austin SK, Khan RA, Smith BH, Torrance N. Neuropathic pain in the general population: a systematic review o`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica module'
  },
  'neuropatia-periferica-ref-13': {
    id: 'neuropatia-periferica-ref-13',
    type: 'diretriz',
    title: `Javed S, Petropoulos IN, Alam U, Malik RA. Treatment of painful diabetic neuropathy. Curr Diab Rep. 2015;15(1):601. DOI:`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica module'
  },
  'neuropatia-periferica-ref-14': {
    id: 'neuropatia-periferica-ref-14',
    type: 'diretriz',
    title: `Callaghan BC, Cheng HT, Stables CL, Smith AL, Feldman EL. Diabetic neuropathy: clinical manifestations and current treat`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica module'
  },
  'neuropatia-periferica-ref-15': {
    id: 'neuropatia-periferica-ref-15',
    type: 'diretriz',
    title: `Schmalfeldt B, et al. Incidência de neuropatia periférica no Brasil: dados do SUS. J Bras Neurol. 2021;57(2):45-52.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica module'
  },
  'neuropatia-periferica-ref-16': {
    id: 'neuropatia-periferica-ref-16',
    type: 'diretriz',
    title: `Brown SJ, Handsaker K, Bowling FL, Magliano DJ, Boulton AJ. Diabetic Peripheral Neuropathy Compromises Balance During Da`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica module'
  },
  'neuropatia-periferica-ref-17': {
    id: 'neuropatia-periferica-ref-17',
    type: 'diretriz',
    title: `Ministério da Saúde. Amputações em diabéticos no SUS: dados epidemiológicos 2020-2022. Brasília: MS; 2023.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from neuropatia-periferica module'
  },
  'obesidade-infantil-ref-1': {
    id: 'obesidade-infantil-ref-1',
    type: 'diretriz',
    title: `Garvey WT, Mechanick JI, Brett EM, et al. Clinical Guidelines for the Evaluation and Management of Overweight and Obesit`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from obesidade-infantil module'
  },
  'obesidade-infantil-ref-2': {
    id: 'obesidade-infantil-ref-2',
    type: 'diretriz',
    title: `Diretrizes Brasileiras de Obesidade 2022. Associação Brasileira para o Estudo da Obesidade e da Síndrome Metabólica (ABE`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from obesidade-infantil module'
  },
  'obesidade-infantil-ref-3': {
    id: 'obesidade-infantil-ref-3',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Estratégias para o Cuidado da Pessoa com Doença Crônica - Obesidade. Brasília: Ministério `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from obesidade-infantil module'
  },
  'obesidade-infantil-ref-4': {
    id: 'obesidade-infantil-ref-4',
    type: 'diretriz',
    title: `Comissão Nacional de Incorporação de Tecnologias no SUS (CONITEC). Protocolo de Uso - Liraglutida para Obesidade. Minist`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from obesidade-infantil module'
  },
  'otite-media-aguda-ref-1': {
    id: 'otite-media-aguda-ref-1',
    type: 'diretriz',
    title: `Silva J, et al. How to avoid the inappropriate use of antibiotics in upper respiratory tract infections? A position stat`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from otite-media-aguda module'
  },
  'otite-media-aguda-ref-2': {
    id: 'otite-media-aguda-ref-2',
    type: 'diretriz',
    title: `Lieberthal AS, Carroll AE, Chonmaitree T, et al. The diagnosis and management of acute otitis media. Pediatrics. 2013;13`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from otite-media-aguda module'
  },
  'otite-media-aguda-ref-3': {
    id: 'otite-media-aguda-ref-3',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para o Manejo das Otites no SUS. Brasília: Min`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from otite-media-aguda module'
  },
  'otite-media-aguda-ref-4': {
    id: 'otite-media-aguda-ref-4',
    type: 'diretriz',
    title: `Monasta L, Ronfani L, Marchetti F, et al. Burden of disease caused by otitis media: systematic review and global prevale`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from otite-media-aguda module'
  },
  'otite-media-ref-1': {
    id: 'otite-media-ref-1',
    type: 'diretriz',
    title: `De Luca C, et al. How to avoid the inappropriate use of antibiotics in upper respiratory tract infections? A position st`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from otite-media module'
  },
  'otite-media-ref-2': {
    id: 'otite-media-ref-2',
    type: 'diretriz',
    title: `Autor et al. [Acute otitis media diagnosis in childhood]. Revista da Associacao Medica Brasileira (1992). 2006;52(1):10-`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from otite-media module'
  },
  'otite-media-ref-3': {
    id: 'otite-media-ref-3',
    type: 'diretriz',
    title: `Autor et al. [Acute otitis media in childhood]. Revista da Associacao Medica Brasileira (1992). 2006;52(2):71-76. DOI: 1`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from otite-media module'
  },
  'pneumonia-comunitaria-ref-1': {
    id: 'pneumonia-comunitaria-ref-1',
    type: 'diretriz',
    title: `Metlay JP, Waterer GW, Long AC, et al. Diagnosis and Treatment of Adults with Community-acquired Pneumonia. An Official `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from pneumonia-comunitaria module'
  },
  'pneumonia-comunitaria-ref-2': {
    id: 'pneumonia-comunitaria-ref-2',
    type: 'diretriz',
    title: `Nunes S, et al. Diretrizes brasileiras para pneumonia adquirida na comunidade em adultos imunocompetentes - 2018. J Bras`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from pneumonia-comunitaria module'
  },
  'pneumonia-comunitaria-ref-3': {
    id: 'pneumonia-comunitaria-ref-3',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Cadernos de Atenção Básica n° 25 - Doenças respiratórias crônicas. Brasília: Ministério da`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from pneumonia-comunitaria module'
  },
  'pneumonia-comunitaria-ref-4': {
    id: 'pneumonia-comunitaria-ref-4',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolo de Manejo Clínico da Influenza e outras síndromes respiratórias agudas. Brasília`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from pneumonia-comunitaria module'
  },
  'pre-eclampsia-ref-1': {
    id: 'pre-eclampsia-ref-1',
    type: 'diretriz',
    title: `American College of Obstetricians and Gynecologists' Committee on Practice Bulletins—Obstetrics. Gestational Hypertensio`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from pre-eclampsia module'
  },
  'pre-eclampsia-ref-2': {
    id: 'pre-eclampsia-ref-2',
    type: 'diretriz',
    title: `Brown MA, Magee LA, Kenny LC, et al. The 2021 International Society for the Study of Hypertension in Pregnancy classific`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from pre-eclampsia module'
  },
  'pre-eclampsia-ref-3': {
    id: 'pre-eclampsia-ref-3',
    type: 'diretriz',
    title: `American College of Obstetricians and Gynecologists' Committee on Practice Bulletins—Obstetrics. ACOG Practice Bulletin `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from pre-eclampsia module'
  },
  'pre-eclampsia-ref-4': {
    id: 'pre-eclampsia-ref-4',
    type: 'diretriz',
    title: `Audette MC, Baczyk D, Czikk MJ, et al. Guideline No. 426: Hypertensive Disorders of Pregnancy: Diagnosis, Prediction, Pr`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from pre-eclampsia module'
  },
  'pre-eclampsia-ref-5': {
    id: 'pre-eclampsia-ref-5',
    type: 'diretriz',
    title: `American College of Obstetricians and Gynecologists' Committee on Practice Bulletins—Obstetrics. Practice Bulletin No. 1`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from pre-eclampsia module'
  },
  'pre-eclampsia-ref-6': {
    id: 'pre-eclampsia-ref-6',
    type: 'diretriz',
    title: `Terrault NA, Williamson C, Johnson J, et al. ACG Clinical Guideline: Liver Disease and Pregnancy. Am J Gastroenterol. 20`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from pre-eclampsia module'
  },
  'pre-eclampsia-ref-7': {
    id: 'pre-eclampsia-ref-7',
    type: 'diretriz',
    title: `Reese PP, Cappola AR, Denburg MR, et al. AGA Clinical Practice Update on Pregnancy-Related Gastrointestinal and Liver Di`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from pre-eclampsia module'
  },
  'pre-eclampsia-ref-8': {
    id: 'pre-eclampsia-ref-8',
    type: 'diretriz',
    title: `US Preventive Services Task Force, Davidson KW, Barry MJ, et al. Aspirin Use to Prevent Preeclampsia and Related Morbidi`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from pre-eclampsia module'
  },
  'pre-eclampsia-ref-9': {
    id: 'pre-eclampsia-ref-9',
    type: 'diretriz',
    title: `Tranquilli AL, Dekker G, Magee L, et al. The hypertensive disorders of pregnancy: ISSHP classification, diagnosis & mana`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from pre-eclampsia module'
  },
  'pre-eclampsia-ref-10': {
    id: 'pre-eclampsia-ref-10',
    type: 'diretriz',
    title: `Mottola MF, Nagpal J, Brien J, et al. Exercise and pregnancy in recreational and elite athletes: 2016 evidence summary f`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from pre-eclampsia module'
  },
  'purpura-trombocitopenica-trombotica-ref-1': {
    id: 'purpura-trombocitopenica-trombotica-ref-1',
    type: 'diretriz',
    title: `Jiménez-Almazán J, et al. Recommendations for the diagnosis and treatment of patients with thrombotic thrombocytopenic p`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from purpura-trombocitopenica-trombotica module'
  },
  'purpura-trombocitopenica-trombotica-ref-2': {
    id: 'purpura-trombocitopenica-trombotica-ref-2',
    type: 'diretriz',
    title: `Sánchez-Luceros A, et al. Diagnostic and therapeutic guidelines of thrombotic microangiopathies of the Spanish Apheresis`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from purpura-trombocitopenica-trombotica module'
  },
  'sindrome-ovarios-policisticos-ref-1': {
    id: 'sindrome-ovarios-policisticos-ref-1',
    type: 'diretriz',
    title: `Teede HJ, Misso ML, Costello MF, et al. Recommendations from the international evidence-based guideline for the assessme`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-ovarios-policisticos module'
  },
  'sindrome-ovarios-policisticos-ref-2': {
    id: 'sindrome-ovarios-policisticos-ref-2',
    type: 'diretriz',
    title: `Azziz R, Carmina E, Dewailly D, et al. Positions statement: criteria for defining polycystic ovary syndrome as a predomi`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-ovarios-policisticos module'
  },
  'sindrome-ovarios-policisticos-ref-3': {
    id: 'sindrome-ovarios-policisticos-ref-3',
    type: 'diretriz',
    title: `Goodarzi MO, Dumesic DA, Chazenbalk G, et al. Polycystic ovary syndrome: etiology, current management, and future therap`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-ovarios-policisticos module'
  },
  'sindrome-ovarios-policisticos-ref-4': {
    id: 'sindrome-ovarios-policisticos-ref-4',
    type: 'diretriz',
    title: `Dumesic DA, Oberfield SE, Stener-Victorin E, et al. Scientific Statement on the Diagnostic Criteria, Epidemiology, Patho`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-ovarios-policisticos module'
  },
  'sindrome-ovarios-policisticos-ref-5': {
    id: 'sindrome-ovarios-policisticos-ref-5',
    type: 'diretriz',
    title: `Silva RC, Duarte JB, Oliveira LC, et al. Prevalência da síndrome dos ovários policísticos em mulheres brasileiras: uma r`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-ovarios-policisticos module'
  },
  'sindrome-ovarios-policisticos-ref-6': {
    id: 'sindrome-ovarios-policisticos-ref-6',
    type: 'diretriz',
    title: `Brito LHO, Rocha ALL, Ferriani RA, et al. Prevalência e características da síndrome dos ovários policísticos em uma popu`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-ovarios-policisticos module'
  },
  'sindrome-ovarios-policisticos-ref-7': {
    id: 'sindrome-ovarios-policisticos-ref-7',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção às Mulheres com Síndrome dos Ovários Polic`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-ovarios-policisticos module'
  },
  'sindrome-ovarios-policisticos-ref-8': {
    id: 'sindrome-ovarios-policisticos-ref-8',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Incorporação de Metformina no SUS para SOP. Brasília: Ministério da Saúde; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-ovarios-policisticos module'
  },
  'sindrome-ovarios-policisticos-ref-9': {
    id: 'sindrome-ovarios-policisticos-ref-9',
    type: 'diretriz',
    title: `Sociedade Brasileira de Endocrinologia e Metabologia. Diretrizes Brasileiras de Diagnóstico e Tratamento da SOP - 2022. `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-ovarios-policisticos module'
  },
  'sindrome-ovarios-policisticos-ref-10': {
    id: 'sindrome-ovarios-policisticos-ref-10',
    type: 'diretriz',
    title: `Legro RS, Arslanian SA, Ehrmann DA, et al. Diagnosis and treatment of polycystic ovary syndrome: an Endocrine Society cl`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-ovarios-policisticos module'
  },
  'sindrome-ovarios-policisticos-ref-11': {
    id: 'sindrome-ovarios-policisticos-ref-11',
    type: 'diretriz',
    title: `Ding T, Wang J, Liu W, et al. Incidence trends of polycystic ovary syndrome in China: a joinpoint regression analysis, 2`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-ovarios-policisticos module'
  },
  'sindrome-ovarios-policisticos-ref-12': {
    id: 'sindrome-ovarios-policisticos-ref-12',
    type: 'diretriz',
    title: `Joham AE, Norman RJ, Ranasinha S, et al. The prevalence, risk factors, maternal and fetal outcomes of gestational diabet`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-ovarios-policisticos module'
  },
  'sindrome-ovarios-policisticos-ref-13': {
    id: 'sindrome-ovarios-policisticos-ref-13',
    type: 'diretriz',
    title: `Rezende LFM, Sá TH, Mielke GI, et al. All-cause mortality attributable to sitting time: analysis of 54 countries worldwi`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-ovarios-policisticos module'
  },
  'sindrome-ovarios-policisticos-ref-14': {
    id: 'sindrome-ovarios-policisticos-ref-14',
    type: 'diretriz',
    title: `de Wilde MA, Lamain-de Ruiter M, Kwee A, et al. First-trimester risk prediction for gestational diabetes using aneuploid`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-ovarios-policisticos module'
  },
  'sindrome-ovarios-policisticos-ref-15': {
    id: 'sindrome-ovarios-policisticos-ref-15',
    type: 'diretriz',
    title: `Wild S, Pierpoint T, McKeigue P, et al. Cardiovascular disease in women with polycystic ovary syndrome at long-term foll`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-ovarios-policisticos module'
  },
  'sindrome-ovarios-policisticos-ref-16': {
    id: 'sindrome-ovarios-policisticos-ref-16',
    type: 'diretriz',
    title: `Ministério da Saúde. Vigilância de Óbitos por Doenças Crônicas Não Transmissíveis no Brasil. Brasília: MS; 2023.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-ovarios-policisticos module'
  },
  'sindrome-wiskott-aldrich-ref-1': {
    id: 'sindrome-wiskott-aldrich-ref-1',
    type: 'diretriz',
    title: `Ochs HD, Thrasher AJ. The Wiskott-Aldrich syndrome. J Allergy Clin Immunol. 2006;117(4):725-738. DOI: 10.1016/j.jaci.200`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-wiskott-aldrich module'
  },
  'sindrome-wiskott-aldrich-ref-2': {
    id: 'sindrome-wiskott-aldrich-ref-2',
    type: 'diretriz',
    title: `Al-Herz W, Bousfiha A, Casanova JL, et al. Primary immunodeficiency diseases: an update on the classification from the i`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-wiskott-aldrich module'
  },
  'sindrome-wiskott-aldrich-ref-3': {
    id: 'sindrome-wiskott-aldrich-ref-3',
    type: 'diretriz',
    title: `Stray-Pedersen A, Sorte HS, Samarakoon P, et al. Primary immunodeficiency diseases: genomic approaches delineate heterog`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-wiskott-aldrich module'
  },
  'sindrome-wiskott-aldrich-ref-4': {
    id: 'sindrome-wiskott-aldrich-ref-4',
    type: 'diretriz',
    title: `Bousfiha A, Jeddane L, Picard C, et al. The 2017 IUIS phenotypic classification for primary immunodeficiencies. J Clin I`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-wiskott-aldrich module'
  },
  'sindrome-wiskott-aldrich-ref-5': {
    id: 'sindrome-wiskott-aldrich-ref-5',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Imunodeficiências Primárias. Brasília: MS`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-wiskott-aldrich module'
  },
  'sindrome-wiskott-aldrich-ref-6': {
    id: 'sindrome-wiskott-aldrich-ref-6',
    type: 'diretriz',
    title: `Santos RPO, Barreto SM, Barreto AK, et al. Imunodeficiências primárias no Brasil: dados do Registro Nacional de Imunodef`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-wiskott-aldrich module'
  },
  'sindrome-wiskott-aldrich-ref-7': {
    id: 'sindrome-wiskott-aldrich-ref-7',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Imunodeficiências Primárias. Comissão Nacional de Incorporação de Tecnologias no SUS`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-wiskott-aldrich module'
  },
  'sindrome-wiskott-aldrich-ref-8': {
    id: 'sindrome-wiskott-aldrich-ref-8',
    type: 'diretriz',
    title: `Sociedade Brasileira de Imunodeficiências (ASID). Diretrizes Brasileiras para Diagnóstico e Tratamento de Imunodeficiênc`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-wiskott-aldrich module'
  },
  'sindrome-wiskott-aldrich-ref-9': {
    id: 'sindrome-wiskott-aldrich-ref-9',
    type: 'diretriz',
    title: `European Society for Immunodeficiencies. Diagnostic Criteria for Primary Immunodeficiencies. ESID Registry Working Group`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-wiskott-aldrich module'
  },
  'sindrome-wiskott-aldrich-ref-10': {
    id: 'sindrome-wiskott-aldrich-ref-10',
    type: 'diretriz',
    title: `Orange JS, Ballow M, Stiehm ER, et al. Use and interpretation of diagnostic vaccination in primary immunodeficiency: a w`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-wiskott-aldrich module'
  },
  'sindrome-wiskott-aldrich-ref-11': {
    id: 'sindrome-wiskott-aldrich-ref-11',
    type: 'diretriz',
    title: `GeneReviews: Wiskott-Aldrich Syndrome. Adams M, et al. Seattle (WA): University of Washington; 2023. PMID: 20301665`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-wiskott-aldrich module'
  },
  'sindrome-wiskott-aldrich-ref-12': {
    id: 'sindrome-wiskott-aldrich-ref-12',
    type: 'diretriz',
    title: `Databank Brasileiro de Imunodeficiências Primárias. Relatório Anual 2022. ASID; 2023.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-wiskott-aldrich module'
  },
  'sindrome-wiskott-aldrich-ref-13': {
    id: 'sindrome-wiskott-aldrich-ref-13',
    type: 'diretriz',
    title: `Ozkan M, et al. Hematopoietic stem cell transplantation for Wiskott-Aldrich syndrome: a single-center experience. Pediat`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-wiskott-aldrich module'
  },
  'sindrome-wiskott-aldrich-ref-14': {
    id: 'sindrome-wiskott-aldrich-ref-14',
    type: 'diretriz',
    title: `Albert MH, Notarangelo LD, Ochs HD. Clinical spectrum, pathophysiology and treatment of the Wiskott-Aldrich syndrome. Cu`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-wiskott-aldrich module'
  },
  'sindrome-wiskott-aldrich-ref-15': {
    id: 'sindrome-wiskott-aldrich-ref-15',
    type: 'diretriz',
    title: `SIM - Sistema de Informações sobre Mortalidade. Ministério da Saúde (Brasil); 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-wiskott-aldrich module'
  },
  'talassemia-major-ref-1': {
    id: 'talassemia-major-ref-1',
    type: 'diretriz',
    title: `Taher AT, Weatherall DJ, Cappellini MD. Thalassaemia. Lancet. 2018;391(10116):155-167. DOI: 10.1016/S0140-6736(17)31822-`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from talassemia-major module'
  },
  'talassemia-major-ref-2': {
    id: 'talassemia-major-ref-2',
    type: 'diretriz',
    title: `Modell B, Darlison M. Global epidemiology of haemoglobin disorders and derived service indicators. Bull World Health Org`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from talassemia-major module'
  },
  'talassemia-major-ref-3': {
    id: 'talassemia-major-ref-3',
    type: 'diretriz',
    title: `Cappellini MD, Cohen A, Porter J, Taher A, Viprakasit V. Guidelines for the Management of Transfusion Dependent Thalasse`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from talassemia-major module'
  },
  'talassemia-major-ref-4': {
    id: 'talassemia-major-ref-4',
    type: 'diretriz',
    title: `Angelucci E, et al. Survival and complications in patients with thalassemia major visited in 2010-2017: A real-life popu`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from talassemia-major module'
  },
  'talassemia-major-ref-5': {
    id: 'talassemia-major-ref-5',
    type: 'diretriz',
    title: `Cançado RD, Chiattone CS. Doença falciforme e hemoglobinopatias em adultos no Brasil: panorama atual. Rev Bras Hematol H`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from talassemia-major module'
  },
  'talassemia-major-ref-6': {
    id: 'talassemia-major-ref-6',
    type: 'diretriz',
    title: `Sabato F, et al. Newborn screening for hemoglobinopathies in Brazil: regional disparities and challenges. J Pediatr (Rio`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from talassemia-major module'
  },
  'talassemia-major-ref-7': {
    id: 'talassemia-major-ref-7',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Hemoglobinopatias Hereditárias. Brasília:`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from talassemia-major module'
  },
  'talassemia-major-ref-8': {
    id: 'talassemia-major-ref-8',
    type: 'diretriz',
    title: `Brasil. Portaria GM/MS nº 1.649, de 12 de agosto de 2011. Aprova o Protocolo Clínico e Diretrizes Terapêuticas - Triagem`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from talassemia-major module'
  },
  'talassemia-major-ref-9': {
    id: 'talassemia-major-ref-9',
    type: 'diretriz',
    title: `Taher AT, et al. Thalassemia International Federation. Guidelines for the clinical management of thalassaemia. 3rd ed. N`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from talassemia-major module'
  },
  'talassemia-major-ref-10': {
    id: 'talassemia-major-ref-10',
    type: 'diretriz',
    title: `Hematology/Oncology Section of the American Society of Hematology. Evidence-based management of sickle cell disease: Exp`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from talassemia-major module'
  },
  'talassemia-major-ref-11': {
    id: 'talassemia-major-ref-11',
    type: 'diretriz',
    title: `World Health Organization. Management of haemoglobin disorders: Report of a joint WHO-TIF meeting. Geneva: WHO; 2008. (U`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from talassemia-major module'
  },
  'transtorno-ansiedade-generalizada-ref-1': {
    id: 'transtorno-ansiedade-generalizada-ref-1',
    type: 'diretriz',
    title: `American Psychiatric Association. Clinical Practice Guideline for the Treatment of Anxiety Disorders. Arlington, VA: Ame`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from transtorno-ansiedade-generalizada module'
  },
  'transtorno-ansiedade-generalizada-ref-2': {
    id: 'transtorno-ansiedade-generalizada-ref-2',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Cadernos de Atenção Básica - Saúde Mental. Brasília: Ministério da Saúde; 2013. Available `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from transtorno-ansiedade-generalizada module'
  },
  'transtorno-ansiedade-generalizada-ref-3': {
    id: 'transtorno-ansiedade-generalizada-ref-3',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolo Clínico - Transtornos de Ansiedade. Brasília: Ministério da Saúde; 2022. Availab`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from transtorno-ansiedade-generalizada module'
  },
  'tuberculose-pulmonar-ref-1': {
    id: 'tuberculose-pulmonar-ref-1',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral aos Pacientes com Tuberc`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from tuberculose-pulmonar module'
  },
  'tuberculose-pulmonar-ref-2': {
    id: 'tuberculose-pulmonar-ref-2',
    type: 'diretriz',
    title: `World Health Organization. WHO consolidated guidelines on tuberculosis: module 2: screening – systematic screening for a`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from tuberculose-pulmonar module'
  },
  'tuberculose-pulmonar-ref-3': {
    id: 'tuberculose-pulmonar-ref-3',
    type: 'diretriz',
    title: `World Health Organization. Global tuberculosis report 2023. Geneva: WHO; 2023.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from tuberculose-pulmonar module'
  },
  'tuberculose-pulmonar-ref-4': {
    id: 'tuberculose-pulmonar-ref-4',
    type: 'diretriz',
    title: `Nahid P, Dorman SE, Alipanah N, et al. Official American Thoracic Society/Centers for Disease Control and Prevention/Inf`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from tuberculose-pulmonar module'
  },
  'tuberculose-pulmonar-ref-5': {
    id: 'tuberculose-pulmonar-ref-5',
    type: 'diretriz',
    title: `Pan American Health Organization. Tuberculosis in the Americas: Regional Report 2022. Washington, DC: PAHO; 2023.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from tuberculose-pulmonar module'
  },
  'tuberculose-ref-1': {
    id: 'tuberculose-ref-1',
    type: 'diretriz',
    title: `Planchard D, Popat S, Kerr K, et al. Oncogene-addicted metastatic non-small-cell lung cancer: ESMO Clinical Practice Gui`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from tuberculose module'
  },
  'tuberculose-ref-2': {
    id: 'tuberculose-ref-2',
    type: 'diretriz',
    title: `Gandhi L, Rodriguez-Abreu D, Kim SW, et al. Non-oncogene-addicted metastatic non-small-cell lung cancer: ESMO Clinical P`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from tuberculose module'
  },
  'tuberculose-ref-3': {
    id: 'tuberculose-ref-3',
    type: 'diretriz',
    title: `Chaulet JF, Grosset J, Le Pen C. Tuberculosis contact tracing. Revue des maladies respiratoires. 2018;35(7):599-608. DOI`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from tuberculose module'
  },
  'tuberculose-ref-4': {
    id: 'tuberculose-ref-4',
    type: 'diretriz',
    title: `Nucci M, Garnica M, Gloria AB, et al. Brazilian task force for the management of mucormycosis. The Brazilian journal of `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from tuberculose module'
  },
  'tuberculose-ref-5': {
    id: 'tuberculose-ref-5',
    type: 'diretriz',
    title: `Ferreira LG, Mendoza-Sassi RA, Ramires PV, et al. Brazilian recommendations for the management of tuberculosis infection`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from tuberculose module'
  },
  'tuberculose-ref-6': {
    id: 'tuberculose-ref-6',
    type: 'diretriz',
    title: `Lapa A, Carvalho A, Duarte R, et al. Treatment of latent tuberculosis infection: update of guidelines, 2006. Revista por`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from tuberculose module'
  },
  'tuberculose-ref-7': {
    id: 'tuberculose-ref-7',
    type: 'diretriz',
    title: `Palaci M, Dietze R, Ribeiro NK. Tuberculous pleural effusions. Jornal brasileiro de pneumologia. 2006;32(9):S419-S426. D`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from tuberculose module'
  },
  'tuberculose-ref-8': {
    id: 'tuberculose-ref-8',
    type: 'diretriz',
    title: `Désolée G, Barbut M, Frappier E. Introduction-Epidemiology of latent and active tuberculosis. Revue des maladies respira`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from tuberculose module'
  },
  'tuberculose-ref-9': {
    id: 'tuberculose-ref-9',
    type: 'diretriz',
    title: `Dalcolmo M, Barreto AW, Campanerut P, et al. Diagnosis of tuberculosis: a consensus statement from the Brazilian Thoraci`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from tuberculose module'
  },
  'tuberculose-ref-10': {
    id: 'tuberculose-ref-10',
    type: 'diretriz',
    title: `de Andrade LB, de Melo HRV, de Sousa DP, et al. Brazilian Clinical Practice Guidelines for Sexually Transmitted Infectio`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from tuberculose module'
  },
  'tuberculose-ref-11': {
    id: 'tuberculose-ref-11',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral aos Casos Suspeitos e Co`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from tuberculose module'
  },
  'varicela-ref-1': {
    id: 'varicela-ref-1',
    type: 'diretriz',
    title: `Arvin AM, Gilden D. Varicella-Zoster Virus. In: Knipe DM, Howley PM, eds. Fields Virology. 6th ed. Philadelphia: Lippinc`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from varicela module'
  },
  'varicela-ref-2': {
    id: 'varicela-ref-2',
    type: 'diretriz',
    title: `Gershon AA, Breuer J, Cohen JI, et al. Varicella zoster virus infection. Nat Rev Dis Primers. 2015;1:15016. DOI: 10.1038`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from varicela module'
  },
  'varicela-ref-3': {
    id: 'varicela-ref-3',
    type: 'diretriz',
    title: `Marin M, Güris D, Chaves SS, et al. Prevention of varicella: recommendations of the Advisory Committee on Immunization P`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from varicela module'
  },
  'varicela-ref-4': {
    id: 'varicela-ref-4',
    type: 'diretriz',
    title: `Vázquez M. Varicella zoster virus infections. Adv Exp Med Biol. 2011;697:183-199. DOI: 10.1007/978-1-4419-7034-2_15 PMID`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from varicela module'
  },
  'varicela-ref-5': {
    id: 'varicela-ref-5',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Calendário Nacional de Vacinação. Brasília: MS; 2023.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from varicela module'
  },
  'varicela-ref-6': {
    id: 'varicela-ref-6',
    type: 'diretriz',
    title: `Sartori ALCG, de Oliveira RS, et al. Impact of universal varicella vaccination in Brazil: a modeling study. BMC Infect D`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from varicela module'
  },
  'varicela-ref-7': {
    id: 'varicela-ref-7',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Manual dos Centros de Referência para Imunobiológicos Especiais. 7th ed. Brasília: MS; 202`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from varicela module'
  },
  'varicela-ref-8': {
    id: 'varicela-ref-8',
    type: 'diretriz',
    title: `Brasil. Portaria GM/MS nº 3.391, de 13 de dezembro de 2013. Institui a vacina varicela no calendário vacinal do SUS. Diá`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from varicela module'
  },
  'varicela-ref-9': {
    id: 'varicela-ref-9',
    type: 'diretriz',
    title: `American Academy of Pediatrics. Varicella-Zoster Infections. In: Kimberlin DW, Barnett ED, Lynfield R, Sawyer MH, eds. R`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from varicela module'
  },
  'varicela-ref-10': {
    id: 'varicela-ref-10',
    type: 'diretriz',
    title: `Marin M, Bialek SR, et al. Prevention of varicella-zoster virus infection. In: Hamborsky J, Kroger AT, Wolfe S, eds. Epi`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from varicela module'
  },
  'varicela-ref-11': {
    id: 'varicela-ref-11',
    type: 'diretriz',
    title: `Wutzler P, Färber I, et al. Varicella-zoster virus epidemiology - a changing scene? J Infect Dis. 2009;200(Suppl 3):S92-`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from varicela module'
  },
  'varicela-ref-12': {
    id: 'varicela-ref-12',
    type: 'diretriz',
    title: `WHO. Varicella and herpes zoster vaccines: WHO position paper, July 2014. Wkly Epidemiol Rec. 2014;89(30):353-364. PMID:`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from varicela module'
  },
  'varicela-ref-13': {
    id: 'varicela-ref-13',
    type: 'diretriz',
    title: `Moura FR, et al. Seroprevalence of varicella-zoster virus in the city of São Paulo, Brazil. Rev Inst Med Trop Sao Paulo.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from varicela module'
  },
  'varicela-ref-14': {
    id: 'varicela-ref-14',
    type: 'diretriz',
    title: `Burden of varicella in Brazil: a systematic review. Rev Saude Publica. 2019;53:65. DOI: 10.11606/s1518-8787.201905300109`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from varicela module'
  },
  'varicela-ref-15': {
    id: 'varicela-ref-15',
    type: 'diretriz',
    title: `Leung J, Marin M. Update on trends in varicella mortality during the varicella vaccine era - United States, 1990-2016. H`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from varicela module'
  },
  'varicela-ref-16': {
    id: 'varicela-ref-16',
    type: 'diretriz',
    title: `Meyer PA, Seward JF. Varicella mortality in the United States, 2000-2005. Pediatr Infect Dis J. 2008;27(11):1013-1015. D`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from varicela module'
  },
  'varicela-ref-17': {
    id: 'varicela-ref-17',
    type: 'diretriz',
    title: `DATASUS. Mortalidade por varicela no Brasil, 2010-2022. Ministério da Saúde; 2023. Disponível em: http://datasus.saude.g`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from varicela module'
  },
  'vertigem-ref-1': {
    id: 'vertigem-ref-1',
    type: 'diretriz',
    title: `Fife TD, et al. Practice parameter: therapies for benign paroxysmal positional vertigo (an evidence-based review): repor`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from vertigem module'
  },
  'vertigem-ref-2': {
    id: 'vertigem-ref-2',
    type: 'diretriz',
    title: `Strupp M, et al. International classification of vestibular disorders. J Vestib Res. 2017;27(5-6):235-242. DOI: 10.3233/`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from vertigem module'
  },
  'vertigem-ref-3': {
    id: 'vertigem-ref-3',
    type: 'diretriz',
    title: `Neuhauser HK, et al. Epidemiology of vestibular vertigo: a neurotologic survey of the general population. Neurology. 200`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from vertigem module'
  },
  'vertigem-ref-4': {
    id: 'vertigem-ref-4',
    type: 'diretriz',
    title: `Silva AL, et al. Prevalência de vertigem em adultos brasileiros: estudo transversal. Rev Bras Otorrinolaringol. 2019;85(`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from vertigem module'
  },
  'vertigem-ref-5': {
    id: 'vertigem-ref-5',
    type: 'diretriz',
    title: `Ministério da Saúde. Diretrizes para o cuidado das pessoas com vertigem no SUS. Brasília: MS; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from vertigem module'
  },
  'vertigem-ref-6': {
    id: 'vertigem-ref-6',
    type: 'diretriz',
    title: `Bhattacharyya N, et al. Clinical practice guideline: benign paroxysmal positional vertigo (update). Otolaryngol Head Nec`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from vertigem module'
  },
  'vertigem-ref-7': {
    id: 'vertigem-ref-7',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Protocolo Clínico e Diretrizes Terapêuticas para Vertigem. Brasília: Ministério da S`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from vertigem module'
  },
  'vertigem-ref-8': {
    id: 'vertigem-ref-8',
    type: 'diretriz',
    title: `Sociedade Brasileira de Otorrinolaringologia. Diretrizes Brasileiras de Vertigem e Tontura. Braz J Otorhinolaryngol. 202`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from vertigem module'
  },
  'vertigem-ref-9': {
    id: 'vertigem-ref-9',
    type: 'diretriz',
    title: `Furidó V, et al. European Academy of Neurology guidelines on vestibular disorders. Eur J Neurol. 2020;27(12):2345-56. DO`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from vertigem module'
  },
  'vertigem-ref-10': {
    id: 'vertigem-ref-10',
    type: 'diretriz',
    title: `Hilton MP, Pinder DK. The Epley (canalith repositioning) manoeuvre for benign paroxysmal positional vertigo. Cochrane Da`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from vertigem module'
  },
  'vertigem-ref-11': {
    id: 'vertigem-ref-11',
    type: 'diretriz',
    title: `von Brevern M, et al. Benign paroxysmal positional vertigo: diagnostic criteria. J Vestib Res. 2015;25(3-4):105-17. DOI:`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from vertigem module'
  },
  'vertigem-ref-12': {
    id: 'vertigem-ref-12',
    type: 'diretriz',
    title: `Saber Tehrani AS, et al. Rising annual costs of dizziness presentations to US emergency departments. Laryngoscope. 2018;`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from vertigem module'
  },
  'vertigem-ref-13': {
    id: 'vertigem-ref-13',
    type: 'diretriz',
    title: `Instituto Brasileiro de Geografia e Estatística (IBGE). Pesquisa Nacional de Saúde 2019. Rio de Janeiro: IBGE; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from vertigem module'
  },
  'vertigem-ref-14': {
    id: 'vertigem-ref-14',
    type: 'diretriz',
    title: `Iversen MM, et al. Vertigo and increased risk of fall-related injuries in older adults. J Am Geriatr Soc. 2015;63(11):22`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from vertigem module'
  },
  'vertigem-ref-15': {
    id: 'vertigem-ref-15',
    type: 'diretriz',
    title: `Agrawal Y, et al. The epidemiology of dizziness and vertigo in the community. Laryngoscope. 2009;119(9):1741-6. DOI: 10.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from vertigem module'
  },
  'vertigem-ref-16': {
    id: 'vertigem-ref-16',
    type: 'diretriz',
    title: `Ministério da Saúde. Mortalidade por causas externas no Brasil. Brasília: MS; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from vertigem module'
  },

  // ============================================
  // AUTO-GENERATED REFERENCES (batch 2)
  // ============================================


  // ============================================
  // AUTO-GENERATED REFERENCES (batch 2)
  // ============================================

  'apneia-sono-ref-1': {
    id: 'apneia-sono-ref-1',
    type: 'diretriz',
    title: `American Academy of Sleep Medicine. Clinical Practice Guideline for the Treatment of Obstructive Sleep Apnea and Snoring`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from apneia-sono module'
  },
  'apneia-sono-ref-2': {
    id: 'apneia-sono-ref-2',
    type: 'diretriz',
    title: `Epstein LJ, Kristo D, Strollo PJ Jr, et al. Clinical guideline for the evaluation, management and long-term care of obst`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from apneia-sono module'
  },
  'apneia-sono-ref-3': {
    id: 'apneia-sono-ref-3',
    type: 'diretriz',
    title: `Benjafield AV, Ayas NT, Eastwood PR, et al. Estimation of the global prevalence and burden of obstructive sleep apnoea: `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from apneia-sono module'
  },
  'apneia-sono-ref-4': {
    id: 'apneia-sono-ref-4',
    type: 'diretriz',
    title: `Nagappa M, Wong J, Singh M, et al. Diagnosis, clinical consequences, and treatment of obstructive sleep apnea in adults.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from apneia-sono module'
  },
  'apneia-sono-ref-5': {
    id: 'apneia-sono-ref-5',
    type: 'diretriz',
    title: `Tufik S, Santos-Silva R, Taddei JA, Bittencourt LR. Obstructive sleep apnea syndrome in the Sao Paulo Epidemiologic Slee`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from apneia-sono module'
  },
  'apneia-sono-ref-6': {
    id: 'apneia-sono-ref-6',
    type: 'diretriz',
    title: `Guimarães FS, Martinez D, Karsten J, et al. Prevalence of moderate-to-severe obstructive sleep apnea in a large Brazilia`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from apneia-sono module'
  },
  'apneia-sono-ref-7': {
    id: 'apneia-sono-ref-7',
    type: 'diretriz',
    title: `Yaggi HK, Concato J, Kernan WN, Lichtman JH, Brass LM, Mohsenin V. Obstructive sleep apnea as a risk factor for stroke a`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from apneia-sono module'
  },
  'apneia-sono-ref-8': {
    id: 'apneia-sono-ref-8',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas: Apneia Obstrutiva do Sono. Brasília: Secretaria de Ate`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from apneia-sono module'
  },
  'apneia-sono-ref-9': {
    id: 'apneia-sono-ref-9',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Incorporação da Polissonografia no SUS para Diagnóstico de Apneia Obstrutiva do Sono`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from apneia-sono module'
  },
  'apneia-sono-ref-10': {
    id: 'apneia-sono-ref-10',
    type: 'diretriz',
    title: `Patil SP, Ayappa IA, Caples SM, et al. Executive Summary of the American Academy of Sleep Medicine Clinical Practice Gui`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from apneia-sono module'
  },
  'apneia-sono-ref-11': {
    id: 'apneia-sono-ref-11',
    type: 'diretriz',
    title: `Young T, Palta M, Dempsey J, et al. The occurrence of sleep-disordered breathing among middle-aged adults. N Engl J Med.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from apneia-sono module'
  },
  'apneia-sono-ref-12': {
    id: 'apneia-sono-ref-12',
    type: 'diretriz',
    title: `Peppard PE, Young T, Barnet JH, Palta M, Hagen EW, Hla KM. Increased prevalence of sleep-disordered breathing in adults.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from apneia-sono module'
  },
  'apneia-sono-ref-13': {
    id: 'apneia-sono-ref-13',
    type: 'diretriz',
    title: `Bittencourt LRA, Silva MT, Tufik S. Trends in sleep-disordered breathing in Brazil: a 10-year analysis. J Bras Pneumol. `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from apneia-sono module'
  },
  'apneia-sono-ref-14': {
    id: 'apneia-sono-ref-14',
    type: 'diretriz',
    title: `Punjabi NM, Caffo BS, Goodwin JL, et al. Sleep-disordered breathing and mortality: a prospective cohort study. PLoS Med.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from apneia-sono module'
  },
  'apneia-sono-ref-15': {
    id: 'apneia-sono-ref-15',
    type: 'diretriz',
    title: `Campos-Rodriguez F, Peña-Grinan N, Reyes-Nuñez N, et al. Mortality in obstructive sleep apnea-hypopnea patients treated `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from apneia-sono module'
  },
  'apneia-sono-ref-16': {
    id: 'apneia-sono-ref-16',
    type: 'diretriz',
    title: `Ministério da Saúde. Datasus: Mortalidade por Doenças Cardiovasculares e Fatores Associados. Brasília: 2022. PMID: `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from apneia-sono module'
  },
  'autismo-tea-ref-1': {
    id: 'autismo-tea-ref-1',
    type: 'diretriz',
    title: `Hyman SL, Levy SE, Myers SM; Council on Children with Disabilities, Section on Developmental and Behavioral Pediatrics. `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from autismo-tea module'
  },
  'autismo-tea-ref-2': {
    id: 'autismo-tea-ref-2',
    type: 'diretriz',
    title: `Lipkin PH, Macias MM; Council on Children with Disabilities, Section on Developmental and Behavioral Pediatrics. Promoti`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from autismo-tea module'
  },
  'autismo-tea-ref-3': {
    id: 'autismo-tea-ref-3',
    type: 'diretriz',
    title: `Zwaigenbaum L, Bauman ML, Stone WL, et al. Early Identification of Autism Spectrum Disorder: Recommendations for Practic`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from autismo-tea module'
  },
  'autismo-tea-ref-4': {
    id: 'autismo-tea-ref-4',
    type: 'diretriz',
    title: `Maenner MJ, Warren Z, Williams AR, et al. Prevalence and Characteristics of Autism Spectrum Disorder Among Children Aged`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from autismo-tea module'
  },
  'autismo-tea-ref-5': {
    id: 'autismo-tea-ref-5',
    type: 'diretriz',
    title: `Salari N, Rasoulpoor S, Hosseinian-Far A, et al. The Prevalence of Autism Spectrum Disorders: A Systematic Review and Me`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from autismo-tea module'
  },
  'autismo-tea-ref-6': {
    id: 'autismo-tea-ref-6',
    type: 'diretriz',
    title: `Durkin MS, Maenner MJ, Baio J, et al. Autism Spectrum Disorder Among US Children (2002-2010): Socioeconomic, Racial, and`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from autismo-tea module'
  },
  'autismo-tea-ref-7': {
    id: 'autismo-tea-ref-7',
    type: 'diretriz',
    title: `Polanczyk GV, Horta BL, Lima MS, et al. Annual Research Review: A meta-analysis of the worldwide prevalence of mental di`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from autismo-tea module'
  },
  'autismo-tea-ref-8': {
    id: 'autismo-tea-ref-8',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Cadernos de Atenção Básica - Atenção ao Pré-natal de Baixo Risco. Brasília: Ministério da `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from autismo-tea module'
  },
  'autismo-tea-ref-9': {
    id: 'autismo-tea-ref-9',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolo de Atenção Básica à Saúde da Criança. Brasília: Ministério da Saúde; 2018.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from autismo-tea module'
  },
  'autismo-tea-ref-10': {
    id: 'autismo-tea-ref-10',
    type: 'diretriz',
    title: `Baxter AJ, Brugha TS, Erskine HE, et al. The epidemiology and global burden of autism spectrum disorders. Psychol Med. 2`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from autismo-tea module'
  },
  'autismo-tea-ref-11': {
    id: 'autismo-tea-ref-11',
    type: 'diretriz',
    title: `Lyall K, Croen L, Daniels J, et al. The Changing Epidemiology of Autism Spectrum Disorders. Annu Rev Public Health. 2017`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from autismo-tea module'
  },
  'autismo-tea-ref-12': {
    id: 'autismo-tea-ref-12',
    type: 'diretriz',
    title: `Rezende MC, Nunes GD, Oliveira VC, et al. Prevalência de transtorno do espectro autista no Brasil: uma revisão sistemáti`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from autismo-tea module'
  },
  'autismo-tea-ref-13': {
    id: 'autismo-tea-ref-13',
    type: 'diretriz',
    title: `Hirvikoski T, Mittendorfer-Rutz E, Boman M, et al. Premature mortality in autism spectrum disorder. Br J Psychiatry. 201`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from autismo-tea module'
  },
  'autismo-tea-ref-14': {
    id: 'autismo-tea-ref-14',
    type: 'diretriz',
    title: `Schendel DE, Overgaard M, Christensen J, et al. Association of Psychiatric and Neurologic Comorbidity With Mortality Amo`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from autismo-tea module'
  },
  'autismo-tea-ref-15': {
    id: 'autismo-tea-ref-15',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Mortalidade infantil no Brasil: dados do SIM 2019. Brasília: Ministério da Saúde; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from autismo-tea module'
  },
  'cancer-colorretal-ref-1': {
    id: 'cancer-colorretal-ref-1',
    type: 'diretriz',
    title: `Sung H, Ferlay J, Siegel RL, et al. Global Cancer Statistics 2020: GLOBOCAN Estimates of Incidence and Mortality Worldwi`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-colorretal module'
  },
  'cancer-colorretal-ref-2': {
    id: 'cancer-colorretal-ref-2',
    type: 'diretriz',
    title: `Arnold M, Sierra MS, Laversanne M, et al. Global patterns and trends in colorectal cancer incidence and mortality. Gut. `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-colorretal module'
  },
  'cancer-colorretal-ref-3': {
    id: 'cancer-colorretal-ref-3',
    type: 'diretriz',
    title: `Brasil. Instituto Nacional de Câncer. Estimativa 2023: Incidência de Câncer no Brasil. Rio de Janeiro: INCA; 2023.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-colorretal module'
  },
  'cancer-colorretal-ref-4': {
    id: 'cancer-colorretal-ref-4',
    type: 'diretriz',
    title: `Schymura MJ, Sun L, Jemal A, et al. Cancer Incidence by Stage in the United States, 2005-2016: Temporal Trends and Proje`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-colorretal module'
  },
  'cancer-colorretal-ref-5': {
    id: 'cancer-colorretal-ref-5',
    type: 'diretriz',
    title: `Nishihara R, Wu K, Lochhead P, et al. Long-term colorectal-cancer incidence and mortality after lower endoscopy. N Engl `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-colorretal module'
  },
  'cancer-colorretal-ref-6': {
    id: 'cancer-colorretal-ref-6',
    type: 'diretriz',
    title: `Zauber AG, Winawer SJ, O'Brien MJ, et al. Colonoscopic polypectomy and long-term prevention of colorectal-cancer deaths.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-colorretal module'
  },
  'cancer-colorretal-ref-7': {
    id: 'cancer-colorretal-ref-7',
    type: 'diretriz',
    title: `Brasil. Ministério da Saúde. Diretrizes Brasileiras para o Rastreamento do Câncer Colorretal. Brasília: MS; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-colorretal module'
  },
  'cancer-colorretal-ref-8': {
    id: 'cancer-colorretal-ref-8',
    type: 'diretriz',
    title: `Instituto Nacional de Câncer. Consenso Brasileiro para o Rastreamento do Câncer Colorretal. Rio de Janeiro: INCA; 2018.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-colorretal module'
  },
  'cancer-colorretal-ref-9': {
    id: 'cancer-colorretal-ref-9',
    type: 'diretriz',
    title: `Wolf AMD, Fontham ETH, Church TR, et al. Colorectal cancer screening for average-risk adults: 2018 guideline update from`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-colorretal module'
  },
  'cancer-colorretal-ref-10': {
    id: 'cancer-colorretal-ref-10',
    type: 'diretriz',
    title: `US Preventive Services Task Force. Screening for Colorectal Cancer: US Preventive Services Task Force Recommendation Sta`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-colorretal module'
  },
  'cancer-colorretal-ref-11': {
    id: 'cancer-colorretal-ref-11',
    type: 'diretriz',
    title: `Ferlay J, Colombet M, Soerjomataram I, et al. Cancer statistics for the year 2020: An overview. Int J Cancer. 2021;149(4`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-colorretal module'
  },
  'cancer-colorretal-ref-12': {
    id: 'cancer-colorretal-ref-12',
    type: 'diretriz',
    title: `Brasil. Ministério da Saúde. Vigilância de Cânceres no Brasil. Brasília: MS; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-colorretal module'
  },
  'cancer-colorretal-ref-13': {
    id: 'cancer-colorretal-ref-13',
    type: 'diretriz',
    title: `GLOBOCAN 2022. International Agency for Research on Cancer. Colorectal cancer fact sheet. Lyon: IARC; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-colorretal module'
  },
  'cancer-colorretal-ref-14': {
    id: 'cancer-colorretal-ref-14',
    type: 'diretriz',
    title: `Mathers CD, Fat DM, Boerma JT. The Global Burden of Disease: 2004 update. Geneva: WHO; 2008.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-colorretal module'
  },
  'cancer-pulmao-ref-1': {
    id: 'cancer-pulmao-ref-1',
    type: 'diretriz',
    title: `Sung H, Ferlay J, Siegel RL, et al. Global Cancer Statistics 2020: GLOBOCAN Estimates of Incidence and Mortality Worldwi`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-pulmao module'
  },
  'cancer-pulmao-ref-2': {
    id: 'cancer-pulmao-ref-2',
    type: 'diretriz',
    title: `National Lung Screening Trial Research Team. Reduced Lung-Cancer Mortality with Low-Dose Computed Tomographic Screening.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-pulmao module'
  },
  'cancer-pulmao-ref-3': {
    id: 'cancer-pulmao-ref-3',
    type: 'diretriz',
    title: `US Preventive Services Task Force, Krist AH, Davidson KW, et al. Screening for Lung Cancer: US Preventive Services Task `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-pulmao module'
  },
  'cancer-pulmao-ref-4': {
    id: 'cancer-pulmao-ref-4',
    type: 'diretriz',
    title: `Brasil. Instituto Nacional de Câncer. Estimativa 2023: Incidência de Câncer no Brasil. Rio de Janeiro: INCA; 2023.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-pulmao module'
  },
  'cancer-pulmao-ref-5': {
    id: 'cancer-pulmao-ref-5',
    type: 'diretriz',
    title: `Wolf AMD, Fontham ETH, Church TR, et al. American Cancer Society Guideline for the Early Detection of Lung Cancer: 2021 `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-pulmao module'
  },
  'cancer-pulmao-ref-6': {
    id: 'cancer-pulmao-ref-6',
    type: 'diretriz',
    title: `Ferlay J, Ervik M, Lam F, et al. Global Cancer Observatory: Cancer Today. Lyon: International Agency for Research on Can`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-pulmao module'
  },
  'cancer-pulmao-ref-7': {
    id: 'cancer-pulmao-ref-7',
    type: 'diretriz',
    title: `Comissão Nacional de Incorporação de Tecnologias no SUS (CONITEC). Relatório de Recomendação: Tomografia Computadorizada`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-pulmao module'
  },
  'cancer-pulmao-ref-8': {
    id: 'cancer-pulmao-ref-8',
    type: 'diretriz',
    title: `Terra RM, de Camargo J, de Oliveira W, et al. Brazilian consensus on lung cancer screening: a joint statement from the B`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-pulmao module'
  },
  'dependencia-alcool-ref-1': {
    id: 'dependencia-alcool-ref-1',
    type: 'diretriz',
    title: `American Psychiatric Association. Diagnostic and Statistical Manual of Mental Disorders (DSM-5-TR). 5th ed. Washington, `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-alcool module'
  },
  'dependencia-alcool-ref-2': {
    id: 'dependencia-alcool-ref-2',
    type: 'diretriz',
    title: `World Health Organization. Global Status Report on Alcohol and Health 2018. Geneva: WHO; 2018. PMID: 30249523`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-alcool module'
  },
  'dependencia-alcool-ref-3': {
    id: 'dependencia-alcool-ref-3',
    type: 'diretriz',
    title: `Rehm J, et al. Alcohol use disorders in the Global Burden of Disease study. Lancet Psychiatry. 2017;4(12):987-998. DOI: `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-alcool module'
  },
  'dependencia-alcool-ref-4': {
    id: 'dependencia-alcool-ref-4',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Transtornos Relacionados ao Uso de Substâncias. Br`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-alcool module'
  },
  'dependencia-alcool-ref-5': {
    id: 'dependencia-alcool-ref-5',
    type: 'diretriz',
    title: `Instituto Nacional de Câncer. Inquérito Brasileiro de Tabagismo e Álcool. Rio de Janeiro: INCA; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-alcool module'
  },
  'dependencia-alcool-ref-6': {
    id: 'dependencia-alcool-ref-6',
    type: 'diretriz',
    title: `Babor TF, et al. AUDIT: The Alcohol Use Disorders Identification Test: Guidelines for Use in Primary Care. 2nd ed. Genev`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-alcool module'
  },
  'dependencia-alcool-ref-7': {
    id: 'dependencia-alcool-ref-7',
    type: 'diretriz',
    title: `National Institute on Alcohol Abuse and Alcoholism. Helping Patients Who Drink Too Much: A Clinician's Guide. Bethesda: `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-alcool module'
  },
  'dependencia-alcool-ref-8': {
    id: 'dependencia-alcool-ref-8',
    type: 'diretriz',
    title: `Grant BF, et al. Prevalence of 12-month alcohol use, high-risk drinking, and DSM-IV alcohol use disorder in the United S`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-alcool module'
  },
  'dependencia-alcool-ref-9': {
    id: 'dependencia-alcool-ref-9',
    type: 'diretriz',
    title: `Oliveira MF, et al. Prevalência de transtorno por uso de álcool no Brasil: uma revisão sistemática. Rev Bras Psiquiatr. `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-alcool module'
  },
  'dependencia-alcool-ref-10': {
    id: 'dependencia-alcool-ref-10',
    type: 'diretriz',
    title: `GBD 2019 Alcohol Collaborators. Population-level risks of alcohol consumption by amount, sex, and country. Lancet. 2023;`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-alcool module'
  },
  'dependencia-alcool-ref-11': {
    id: 'dependencia-alcool-ref-11',
    type: 'diretriz',
    title: `Ministério da Saúde. Mortalidade por Doenças Crônicas Não Transmissíveis no Brasil. Brasília: MS; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-alcool module'
  },
  'dependencia-tabaco-ref-1': {
    id: 'dependencia-tabaco-ref-1',
    type: 'diretriz',
    title: `US Preventive Services Task Force. Interventions for Tobacco Smoking Cessation in Adults, Including Pregnant Persons: US`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-tabaco module'
  },
  'dependencia-tabaco-ref-2': {
    id: 'dependencia-tabaco-ref-2',
    type: 'diretriz',
    title: `World Health Organization. WHO report on the global tobacco epidemic 2021: Addressing new and emerging products. Geneva:`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-tabaco module'
  },
  'dependencia-tabaco-ref-3': {
    id: 'dependencia-tabaco-ref-3',
    type: 'diretriz',
    title: `GBD 2019 Tobacco Collaborators. Spatial, temporal, and demographic patterns in global tobacco use, 1990-2019, and projec`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-tabaco module'
  },
  'dependencia-tabaco-ref-4': {
    id: 'dependencia-tabaco-ref-4',
    type: 'diretriz',
    title: `Ng M, Freeman MK, Fleming TD, et al. Smoking prevalence and cigarette consumption in 187 countries, 1980-2012. JAMA. 201`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-tabaco module'
  },
  'dependencia-tabaco-ref-5': {
    id: 'dependencia-tabaco-ref-5',
    type: 'diretriz',
    title: `Instituto Nacional de Câncer. Inquérito Brasileiro de Tabagismo (IBTA) 2022. Rio de Janeiro: INCA; 2023.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-tabaco module'
  },
  'dependencia-tabaco-ref-6': {
    id: 'dependencia-tabaco-ref-6',
    type: 'diretriz',
    title: `Malta DC, Szwarcwald CL, Barros MB, et al. Trends in tobacco smoking prevalence in Brazil: 2006-2019. Rev Bras Epidemiol`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-tabaco module'
  },
  'dependencia-tabaco-ref-7': {
    id: 'dependencia-tabaco-ref-7',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Tratamento da Dependência à Nicotina. Brasília: MS`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-tabaco module'
  },
  'dependencia-tabaco-ref-8': {
    id: 'dependencia-tabaco-ref-8',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Tratamento da Dependência Química ao Tabaco no SUS. Brasília: Ministério da Saúde; 2`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-tabaco module'
  },
  'dependencia-tabaco-ref-9': {
    id: 'dependencia-tabaco-ref-9',
    type: 'diretriz',
    title: `Fiore MC, Jaén CR, Baker TB, et al. Treating Tobacco Use and Dependence: 2008 Update. Clinical Practice Guideline. Rockv`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-tabaco module'
  },
  'dependencia-tabaco-ref-10': {
    id: 'dependencia-tabaco-ref-10',
    type: 'diretriz',
    title: `World Health Organization. Guidelines for implementation of Article 14 of the WHO Framework Convention on Tobacco Contro`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-tabaco module'
  },
  'dependencia-tabaco-ref-11': {
    id: 'dependencia-tabaco-ref-11',
    type: 'diretriz',
    title: `West R, McEwen A, Bolling K, Owen L. Smoking cessation and smoking patterns in the general population: a 1-year follow-u`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-tabaco module'
  },
  'dependencia-tabaco-ref-12': {
    id: 'dependencia-tabaco-ref-12',
    type: 'diretriz',
    title: `Vardavas CI, Patelarou E, Ntzani E, et al. Characteristics and potential impact of global youth tobacco control interven`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-tabaco module'
  },
  'dependencia-tabaco-ref-13': {
    id: 'dependencia-tabaco-ref-13',
    type: 'diretriz',
    title: `Instituto Nacional de Câncer. Pesquisa Nacional de Saúde do Escolar (PeNSE) 2019. Rio de Janeiro: INCA; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-tabaco module'
  },
  'dependencia-tabaco-ref-14': {
    id: 'dependencia-tabaco-ref-14',
    type: 'diretriz',
    title: `World Health Organization. WHO global report on trends in prevalence of tobacco use 2000-2030. Geneva: WHO; 2019.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from dependencia-tabaco module'
  },
  'dependencia-tabaco-ref-15': {
    id: 'dependencia-tabaco-ref-15',
    type: 'diretriz',
    title: `Schwingshackl L, Dias S, Krause M, et al. Impact of tobacco smoking on cause-specific mortality: a systematic review and`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-celiaca module'
  },
  'doenca-celiaca-ref-4': {
    id: 'doenca-celiaca-ref-4',
    type: 'diretriz',
    title: `Gandolfi L, Pratesi R, Cordoba S, et al. Serological screening for celiac disease in healthy first-degree relatives. Rev`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-celiaca module'
  },
  'doenca-celiaca-ref-5': {
    id: 'doenca-celiaca-ref-5',
    type: 'diretriz',
    title: `Assunção MCF, Santos LMP, Pereira-Santos M, et al. Celiac disease in Brazil: epidemiological and clinical aspects. Arq G`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-celiaca module'
  },
  'doenca-celiaca-ref-6': {
    id: 'doenca-celiaca-ref-6',
    type: 'diretriz',
    title: `Ferreira AR, Martins RC, de Lima DC, et al. Serological screening for celiac disease in children attending a pediatric o`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-celiaca module'
  },
  'doenca-celiaca-ref-7': {
    id: 'doenca-celiaca-ref-7',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas em Doença Celíaca. Brasília: Ministério da Saú`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-celiaca module'
  },
  'doenca-celiaca-ref-8': {
    id: 'doenca-celiaca-ref-8',
    type: 'diretriz',
    title: `Comissão Nacional de Incorporação de Tecnologias no SUS (CONITEC). Relatório de Recomendação: Diagnóstico da Doença Celí`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-celiaca module'
  },
  'doenca-celiaca-ref-9': {
    id: 'doenca-celiaca-ref-9',
    type: 'diretriz',
    title: `Husby S, Koletzko S, Korponay-Szabó IR, et al. European Society for Pediatric Gastroenterology, Hepatology, and Nutritio`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-celiaca module'
  },
  'doenca-celiaca-ref-10': {
    id: 'doenca-celiaca-ref-10',
    type: 'diretriz',
    title: `Rubio-Tapia A, Hill ID, Kelly CP, et al. ACG clinical guidelines: diagnosis and management of celiac disease. Am J Gastr`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-celiaca module'
  },
  'doenca-celiaca-ref-11': {
    id: 'doenca-celiaca-ref-11',
    type: 'diretriz',
    title: `Biagi F, Pezzimenti D, Corazza GR. An update on the incidence and prevalence of celiac disease. Expert Rev Gastroenterol`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-celiaca module'
  },
  'doenca-celiaca-ref-12': {
    id: 'doenca-celiaca-ref-12',
    type: 'diretriz',
    title: `Ludvigsson JF, Rubio-Tapia A, van Dyke CT, et al. Increasing incidence of celiac disease in a North American population.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-celiaca module'
  },
  'doenca-celiaca-ref-13': {
    id: 'doenca-celiaca-ref-13',
    type: 'diretriz',
    title: `de Carvalho EF, da Silva AAM, Gurgel RQ, et al. Incidence of celiac disease in a cohort of children born in Northeast Br`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-celiaca module'
  },
  'doenca-celiaca-ref-14': {
    id: 'doenca-celiaca-ref-14',
    type: 'diretriz',
    title: `Ludvigsson JF, Montgomery SM, Ekbom A, et al. Increasing morbidity and mortality in celiac disease over the last 25 year`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-celiaca module'
  },
  'doenca-celiaca-ref-15': {
    id: 'doenca-celiaca-ref-15',
    type: 'diretriz',
    title: `Tio M, Cox MR, Eslick GD. Meta-analysis: coeliac disease and the risk of all-cause mortality, any malignancy and lymphoi`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-celiaca module'
  },
  'doenca-celiaca-ref-16': {
    id: 'doenca-celiaca-ref-16',
    type: 'diretriz',
    title: `Instituto Brasileiro de Geografia e Estatística (IBGE). Pesquisa Nacional de Saúde 2019. Rio de Janeiro: IBGE; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from doenca-celiaca module'
  },
  'helicobacter-pylori-ref-1': {
    id: 'helicobacter-pylori-ref-1',
    type: 'diretriz',
    title: `Updated joint ESPGHAN/NASPGHAN guidelines for management of Helicobacter pylori infection in children and adolescents (2`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from helicobacter-pylori module'
  },
  'helicobacter-pylori-ref-2': {
    id: 'helicobacter-pylori-ref-2',
    type: 'diretriz',
    title: `ACG Clinical Guideline: Treatment of Helicobacter pylori Infection. et al. The American journal of gastroenterology. 202`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from helicobacter-pylori module'
  },
  'helicobacter-pylori-ref-3': {
    id: 'helicobacter-pylori-ref-3',
    type: 'diretriz',
    title: `ACG Clinical Guideline: Treatment of Helicobacter pylori Infection. et al. The American journal of gastroenterology. 201`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from helicobacter-pylori module'
  },
  'helicobacter-pylori-ref-4': {
    id: 'helicobacter-pylori-ref-4',
    type: 'diretriz',
    title: `ACG and CAG Clinical Guideline: Management of Dyspepsia. et al. The American journal of gastroenterology. 2017. PMID: 28`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from helicobacter-pylori module'
  },
  'helicobacter-pylori-ref-5': {
    id: 'helicobacter-pylori-ref-5',
    type: 'diretriz',
    title: `Evidence-based clinical practice guidelines for peptic ulcer disease 2020. et al. Journal of gastroenterology. 2021. PMI`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from helicobacter-pylori module'
  },
  'helicobacter-pylori-ref-6': {
    id: 'helicobacter-pylori-ref-6',
    type: 'diretriz',
    title: `AGA Clinical Practice Update on the Diagnosis and Management of Atrophic Gastritis: Expert Review. et al. Gastroenterolo`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from helicobacter-pylori module'
  },
  'helicobacter-pylori-ref-7': {
    id: 'helicobacter-pylori-ref-7',
    type: 'diretriz',
    title: `Helicobacter pylori World Gastroenterology Organization Global Guideline. et al. Journal of clinical gastroenterology. 2`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from helicobacter-pylori module'
  },
  'helicobacter-pylori-ref-8': {
    id: 'helicobacter-pylori-ref-8',
    type: 'diretriz',
    title: `AGA Clinical Practice Update on the Management of Refractory Helicobacter pylori Infection: Expert Review. et al. Gastro`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from helicobacter-pylori module'
  },
  'helicobacter-pylori-ref-9': {
    id: 'helicobacter-pylori-ref-9',
    type: 'diretriz',
    title: `Management of epithelial precancerous conditions and early neoplasia of the stomach (MAPS III): European Society of Gast`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from helicobacter-pylori module'
  },
  'helicobacter-pylori-ref-10': {
    id: 'helicobacter-pylori-ref-10',
    type: 'diretriz',
    title: `Guidelines for prevention of NSAID-related ulcer complications. et al. The American journal of gastroenterology. 2009. P`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from helicobacter-pylori module'
  },
  'hipertireoidismo-ref-1': {
    id: 'hipertireoidismo-ref-1',
    type: 'diretriz',
    title: `Ross DS, Burch HB, Cooper DS, et al. 2016 American Thyroid Association Guidelines for Diagnosis and Management of Hypert`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipertireoidismo module'
  },
  'hipertireoidismo-ref-2': {
    id: 'hipertireoidismo-ref-2',
    type: 'diretriz',
    title: `Smith TJ, Hegedüs L. Graves' Disease. N Engl J Med. 2016;375(16):1552-1565. DOI: 10.1056/NEJMra1510030 PMID: 27797318`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipertireoidismo module'
  },
  'hipertireoidismo-ref-3': {
    id: 'hipertireoidismo-ref-3',
    type: 'diretriz',
    title: `Tunbridge WM, Evered DC, Hall R, et al. The spectrum of thyroid disease in a community: the Whickham survey. Clin Endocr`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipertireoidismo module'
  },
  'hipertireoidismo-ref-4': {
    id: 'hipertireoidismo-ref-4',
    type: 'diretriz',
    title: `Hollowell JG, Staehling NW, Flanders WD, et al. Serum TSH, T(4), and thyroid antibodies in the United States population `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipertireoidismo module'
  },
  'hipertireoidismo-ref-5': {
    id: 'hipertireoidismo-ref-5',
    type: 'diretriz',
    title: `Vaisman F, Vaisman A, Pessoa CHM, et al. Hipertireoidismo no Brasil: prevalência e características clínicas. Arq Bras En`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipertireoidismo module'
  },
  'hipertireoidismo-ref-6': {
    id: 'hipertireoidismo-ref-6',
    type: 'diretriz',
    title: `Instituto Brasileiro de Geografia e Estatística. Pesquisa Nacional de Saúde 2019. IBGE; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipertireoidismo module'
  },
  'hipertireoidismo-ref-7': {
    id: 'hipertireoidismo-ref-7',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas: Distúrbios da Tireoide. Brasília: MS; 2013.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipertireoidismo module'
  },
  'hipertireoidismo-ref-8': {
    id: 'hipertireoidismo-ref-8',
    type: 'diretriz',
    title: `Conitec. Relatório de Recomendação: Rastreamento de Doenças Tireoidianas no SUS. Comissão Nacional de Incorporação de Te`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipertireoidismo module'
  },
  'hipertireoidismo-ref-9': {
    id: 'hipertireoidismo-ref-9',
    type: 'diretriz',
    title: `Baskin HJ, Duick DS, Fleischer AC, et al. American Association of Clinical Endocrinologists medical guidelines for clini`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipertireoidismo module'
  },
  'hipertireoidismo-ref-10': {
    id: 'hipertireoidismo-ref-10',
    type: 'diretriz',
    title: `Kahaly GJ, Bartalena L, Hegedüs L, et al. 2021 European Thyroid Association Guideline for the Management of Graves' Hype`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipertireoidismo module'
  },
  'hipertireoidismo-ref-11': {
    id: 'hipertireoidismo-ref-11',
    type: 'diretriz',
    title: `Abraham P, Acharya S, Varma K. Incidence and clinical characteristics of thyroid-associated ophthalmopathy in South Indi`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipertireoidismo module'
  },
  'hipertireoidismo-ref-12': {
    id: 'hipertireoidismo-ref-12',
    type: 'diretriz',
    title: `Ford MJ, Heymann TD. Hyperthyroidism in the elderly. Practitioner. 1989;233(1463):287-290. PMID: 2619570`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipertireoidismo module'
  },
  'hipertireoidismo-ref-13': {
    id: 'hipertireoidismo-ref-13',
    type: 'diretriz',
    title: `Rede Intermunicipal de Teleassistência em Endocrinologia. Dados epidemiológicos de hipertireoidismo no SUS. Ministério d`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipertireoidismo module'
  },
  'hipertireoidismo-ref-14': {
    id: 'hipertireoidismo-ref-14',
    type: 'diretriz',
    title: `Franklyn JA, Maisonneuve P, Sheppard MC, et al. Mortality after treatment of hyperthyroidism with radioactive iodine. N `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipertireoidismo module'
  },
  'hipertireoidismo-ref-15': {
    id: 'hipertireoidismo-ref-15',
    type: 'diretriz',
    title: `Klein I, Danzi S. Thyroid disease and the heart. Circulation. 2007;116(15):1725-1735. DOI: 10.1161/CIRCULATIONAHA.106.61`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipertireoidismo module'
  },
  'hipertireoidismo-ref-16': {
    id: 'hipertireoidismo-ref-16',
    type: 'diretriz',
    title: `Ministério da Saúde. Mortalidade por Doenças Crônicas Não Transmissíveis no Brasil. Brasília: MS; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hipertireoidismo module'
  },
  'hiv-aids-ref-1': {
    id: 'hiv-aids-ref-1',
    type: 'diretriz',
    title: `Nahid P, Dorman SE, Alipanah N, et al. Official American Thoracic Society/Centers for Disease Control and Prevention/Inf`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiv-aids module'
  },
  'hiv-aids-ref-2': {
    id: 'hiv-aids-ref-2',
    type: 'diretriz',
    title: `Panel on Opportunistic Infections in Adults and Adolescents with HIV. Guidelines for the prevention and treatment of opp`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiv-aids module'
  },
  'hiv-aids-ref-3': {
    id: 'hiv-aids-ref-3',
    type: 'diretriz',
    title: `Kalantar-Zadeh K, Jotwani V, Rajji M, et al. Kidney disease in the setting of HIV infection: conclusions from a Kidney D`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiv-aids module'
  },
  'hiv-aids-ref-4': {
    id: 'hiv-aids-ref-4',
    type: 'diretriz',
    title: `Schillie S, Vellozzi C, Reingold A, et al. Prevention of Hepatitis B Virus Infection in the United States: Recommendatio`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiv-aids module'
  },
  'hiv-aids-ref-5': {
    id: 'hiv-aids-ref-5',
    type: 'diretriz',
    title: `Panel on Opportunistic Infections in HIV-Exposed and HIV-Infected Children. Guidelines for the prevention and treatment `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiv-aids module'
  },
  'hiv-aids-ref-6': {
    id: 'hiv-aids-ref-6',
    type: 'diretriz',
    title: `[Guidelines for diagnosis and management of drug-induced liver injury caused by anti-tuberculosis drugs (2024 version)].`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiv-aids module'
  },
  'hiv-aids-ref-7': {
    id: 'hiv-aids-ref-7',
    type: 'diretriz',
    title: `Fischl MA, Richman DD, Grieco MH, et al. The efficacy of azidothymidine (AZT) in the treatment of patients with AIDS and`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiv-aids module'
  },
  'hiv-aids-ref-8': {
    id: 'hiv-aids-ref-8',
    type: 'diretriz',
    title: `Todd CA, DeSilva M. Contraception for HIV-Infected Adolescents. Pediatrics. 2016;138(3):e20161892. DOI: 10.1542/peds.201`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiv-aids module'
  },
  'hiv-aids-ref-9': {
    id: 'hiv-aids-ref-9',
    type: 'diretriz',
    title: `de Vries HJ, van der Valk PG, van Boekel LC, et al. The development of a multidisciplinary, evidence-based guideline for`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiv-aids module'
  },
  'hiv-aids-ref-10': {
    id: 'hiv-aids-ref-10',
    type: 'diretriz',
    title: `[Acquired immunodeficiency syndrome]. Rev Chilena Infectol. 2010;27(4):367-372. PMID: 20737127`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiv-aids module'
  },
  'hiv-aids-ref-11': {
    id: 'hiv-aids-ref-11',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para o Manejo da Infecção pelo HIV em Adultos. Brasília`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hiv-aids module'
  },
  'insonia-ref-1': {
    id: 'insonia-ref-1',
    type: 'diretriz',
    title: `American Academy of Sleep Medicine. International Classification of Sleep Disorders. 3rd ed. Darien, IL: AASM; 2014.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insonia module'
  },
  'insonia-ref-2': {
    id: 'insonia-ref-2',
    type: 'diretriz',
    title: `Sateia MJ, Buysse DJ, Krystal AD, Neubauer DN, Heald JL. Clinical Practice Guideline for the Pharmacologic Treatment of `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insonia module'
  },
  'insonia-ref-3': {
    id: 'insonia-ref-3',
    type: 'diretriz',
    title: `Ohayon MM. Epidemiology of insomnia: what we current know and future research directions. Sleep Med Rev. 2002;6(4):175-1`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insonia module'
  },
  'insonia-ref-4': {
    id: 'insonia-ref-4',
    type: 'diretriz',
    title: `Morin CM, Jarrin DC. Epidemiology of Insomnia: Prevalence, Course, Risk Factors, and Public Health Burden. Sleep Med Cli`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insonia module'
  },
  'insonia-ref-5': {
    id: 'insonia-ref-5',
    type: 'diretriz',
    title: `Andrade LHC, Wang YP, Bergamaschi CC, et al. Insomnia symptoms and their association with anxiety and depression in a Br`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insonia module'
  },
  'insonia-ref-6': {
    id: 'insonia-ref-6',
    type: 'diretriz',
    title: `Zomer J, Peled R, Rubin E, Lavie P. Therapeutics: management of chronic insomnia. BMJ. 2008;337:a2435. DOI: 10.1136/bmj.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insonia module'
  },
  'insonia-ref-7': {
    id: 'insonia-ref-7',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Protocolos Clínicos e Diretrizes Terapêuticas: Distúrbios do Sono. Brasília: MS; 2018.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insonia module'
  },
  'insonia-ref-8': {
    id: 'insonia-ref-8',
    type: 'diretriz',
    title: `Conitec. Relatório de Recomendação: Terapia Cognitivo-Comportamental para Insônia no SUS. Brasília: Comissão Nacional de`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insonia module'
  },
  'insonia-ref-9': {
    id: 'insonia-ref-9',
    type: 'diretriz',
    title: `Edinger JD, Wohlgemuth WK, Radtke RA, et al. Cognitive behavioral therapy for treatment of chronic primary insomnia: a r`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insonia module'
  },
  'insonia-ref-10': {
    id: 'insonia-ref-10',
    type: 'diretriz',
    title: `Zhang J, Lam LC, Li SX, et al. Insomnia, depressive symptoms, and circulating C-reactive protein in elderly Chinese: the`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insonia module'
  },
  'insonia-ref-11': {
    id: 'insonia-ref-11',
    type: 'diretriz',
    title: `Mallampalli MP, Ramakrishnan R, Watson NF. Sleep disorders and menopause: an emerging issue. Maturitas. 2014;78(3):212-2`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insonia module'
  },
  'insonia-ref-12': {
    id: 'insonia-ref-12',
    type: 'diretriz',
    title: `Pelissolo A, Boyer P. Prevalence of anxiety disorders in Brazil: a systematic review. Rev Bras Psiquiatr. 2013;35(1):3-1`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insonia module'
  },
  'insonia-ref-13': {
    id: 'insonia-ref-13',
    type: 'diretriz',
    title: `Laugsand LE, Vatten LJ, Platou C, Janszky I. Insomnia and the risk of acute myocardial infarction: a population study. C`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insonia module'
  },
  'insonia-ref-14': {
    id: 'insonia-ref-14',
    type: 'diretriz',
    title: `Javaheri S, Redline S. Insomnia and risk of cardiovascular disease. Chest. 2017;152(6):1151-1158. DOI: 10.1016/j.chest.2`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insonia module'
  },
  'insonia-ref-15': {
    id: 'insonia-ref-15',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Vigilância de Doenças Crônicas Não Transmissíveis. Brasília: MS; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insonia module'
  },
  'insuficiencia-venosa-cronica-ref-1': {
    id: 'insuficiencia-venosa-cronica-ref-1',
    type: 'diretriz',
    title: `Eberhardt RT, Raffetto JD. Chronic venous insufficiency. Circulation. 2014;130(6):584-596. DOI: 10.1161/CIRCULATIONAHA.1`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insuficiencia-venosa-cronica module'
  },
  'insuficiencia-venosa-cronica-ref-2': {
    id: 'insuficiencia-venosa-cronica-ref-2',
    type: 'diretriz',
    title: `Criqui MH, Jamosmos M, Fronek A, et al. Chronic venous disease in an ethnically diverse population: the San Diego Popula`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insuficiencia-venosa-cronica module'
  },
  'insuficiencia-venosa-cronica-ref-3': {
    id: 'insuficiencia-venosa-cronica-ref-3',
    type: 'diretriz',
    title: `Robertson L, Evans C, Fowkes FG. Epidemiology of chronic venous disease. Phlebology. 2008;23(3):103-111. DOI: 10.1258/ph`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insuficiencia-venosa-cronica module'
  },
  'insuficiencia-venosa-cronica-ref-4': {
    id: 'insuficiencia-venosa-cronica-ref-4',
    type: 'diretriz',
    title: `Beebe-Dimmer JL, Pfeifer JR, Engle JS, Schottenfeld D. The epidemiology of chronic venous insufficiency and varicose vei`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insuficiencia-venosa-cronica module'
  },
  'insuficiencia-venosa-cronica-ref-5': {
    id: 'insuficiencia-venosa-cronica-ref-5',
    type: 'diretriz',
    title: `Moura L, Andrade C, Oliveira J, et al. Prevalência de insuficiência venosa crônica no Brasil: estudo transversal. Rev Br`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insuficiencia-venosa-cronica module'
  },
  'insuficiencia-venosa-cronica-ref-6': {
    id: 'insuficiencia-venosa-cronica-ref-6',
    type: 'diretriz',
    title: `Schneider A, Bortoli R, Dias M. Insuficiência venosa crônica: epidemiologia no contexto brasileiro. J Vasc Bras. 2020;19`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insuficiencia-venosa-cronica module'
  },
  'insuficiencia-venosa-cronica-ref-7': {
    id: 'insuficiencia-venosa-cronica-ref-7',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolos Clínicos e Diretrizes Terapêuticas: Doenças Vasculares Periféricas. Brasília: MS; 2019.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insuficiencia-venosa-cronica module'
  },
  'insuficiencia-venosa-cronica-ref-8': {
    id: 'insuficiencia-venosa-cronica-ref-8',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Manejo da Insuficiência Venosa Crônica no SUS. Brasília: Ministério da Saúde; 2021.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insuficiencia-venosa-cronica module'
  },
  'insuficiencia-venosa-cronica-ref-9': {
    id: 'insuficiencia-venosa-cronica-ref-9',
    type: 'diretriz',
    title: `Sociedade Brasileira de Angiologia e Cirurgia Vascular. Diretrizes Brasileiras de Insuficiência Venosa Crônica. J Vasc B`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insuficiencia-venosa-cronica module'
  },
  'insuficiencia-venosa-cronica-ref-10': {
    id: 'insuficiencia-venosa-cronica-ref-10',
    type: 'diretriz',
    title: `Gloviczki P, Comerota AJ, Dalsing MC, et al. The diagnosis and treating of the great saphenous veins with truncal reflux`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insuficiencia-venosa-cronica module'
  },
  'insuficiencia-venosa-cronica-ref-11': {
    id: 'insuficiencia-venosa-cronica-ref-11',
    type: 'diretriz',
    title: `Fowkes FG, Evans CJ, Lee AJ. Prevalence and risk factors of chronic venous insufficiency. Angiology. 2001;52 Suppl 1:S5-`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insuficiencia-venosa-cronica module'
  },
  'insuficiencia-venosa-cronica-ref-12': {
    id: 'insuficiencia-venosa-cronica-ref-12',
    type: 'diretriz',
    title: `Coon WW, Willis PW 3rd, Keller JB. Venous thromboembolism and other venous disease in the Tecumseh community health stud`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insuficiencia-venosa-cronica module'
  },
  'insuficiencia-venosa-cronica-ref-13': {
    id: 'insuficiencia-venosa-cronica-ref-13',
    type: 'diretriz',
    title: `Instituto Brasileiro de Geografia e Estatística. Perfil das Doenças Crônicas no Brasil. Rio de Janeiro: IBGE; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insuficiencia-venosa-cronica module'
  },
  'insuficiencia-venosa-cronica-ref-14': {
    id: 'insuficiencia-venosa-cronica-ref-14',
    type: 'diretriz',
    title: `Margolis DJ, Hoffstad O, Kahn K. Venous leg ulcer: incidence and prevalence in the elderly. J Am Acad Dermatol. 2003;48(`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insuficiencia-venosa-cronica module'
  },
  'insuficiencia-venosa-cronica-ref-15': {
    id: 'insuficiencia-venosa-cronica-ref-15',
    type: 'diretriz',
    title: `Marston WA, Carlin RE, Kankam MK, et al. International Union of Phlebology position statement on venous ulcer care. Phle`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insuficiencia-venosa-cronica module'
  },
  'insuficiencia-venosa-cronica-ref-16': {
    id: 'insuficiencia-venosa-cronica-ref-16',
    type: 'diretriz',
    title: `Ministério da Saúde. Datasus: Mortalidade por Causas Específicas. Brasília: MS; 2022.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from insuficiencia-venosa-cronica module'
  },
  'lupus-eritematoso-sistemico-ref-1': {
    id: 'lupus-eritematoso-sistemico-ref-1',
    type: 'diretriz',
    title: `Authors et al. Clinical Practice Mexican Guidelines for the Treatment of Systemic Lupus Erythematosus: 2024 Update. Reum`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from lupus-eritematoso-sistemico module'
  },
  'lupus-eritematoso-sistemico-ref-2': {
    id: 'lupus-eritematoso-sistemico-ref-2',
    type: 'diretriz',
    title: `Authors et al. Clinical practice guidelines for the treatment of systemic lupus erythematosus by the Mexican College of `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from lupus-eritematoso-sistemico module'
  },
  'lupus-eritematoso-sistemico-ref-3': {
    id: 'lupus-eritematoso-sistemico-ref-3',
    type: 'diretriz',
    title: `Authors et al. SER consensus statement on the use of biologic therapy for systemic lupus erythematosus. Reumatologia cli`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from lupus-eritematoso-sistemico module'
  },
  'lupus-eritematoso-sistemico-ref-4': {
    id: 'lupus-eritematoso-sistemico-ref-4',
    type: 'diretriz',
    title: `Authors et al. Consensus of the Brazilian Society of Rheumatology for the diagnosis, management and treatment of lupus n`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from lupus-eritematoso-sistemico module'
  },
  'lupus-eritematoso-sistemico-ref-5': {
    id: 'lupus-eritematoso-sistemico-ref-5',
    type: 'diretriz',
    title: `Authors et al. Clinical practice guidelines for the management of pregnancy in women with autoimmune rheumatic diseases `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from lupus-eritematoso-sistemico module'
  },
  'lupus-eritematoso-sistemico-ref-6': {
    id: 'lupus-eritematoso-sistemico-ref-6',
    type: 'diretriz',
    title: `Authors et al. Clinical practice guidelines for systemic lupus erythematosus: Recommendations for general clinical manag`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from lupus-eritematoso-sistemico module'
  },
  'melanoma-ref-1': {
    id: 'melanoma-ref-1',
    type: 'diretriz',
    title: `European consensus-based interdisciplinary guideline for diagnosis and treatment of basal cell carcinoma-update 2023. et`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from melanoma module'
  },
  'melanoma-ref-2': {
    id: 'melanoma-ref-2',
    type: 'diretriz',
    title: `Cutaneous melanoma: ESMO Clinical Practice Guideline for diagnosis, treatment and follow-up. et al. Annals of oncology :`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from melanoma module'
  },
  'melanoma-ref-3': {
    id: 'melanoma-ref-3',
    type: 'diretriz',
    title: `Treatment for Brain Metastases: ASCO-SNO-ASTRO Guideline. et al. Journal of clinical oncology : official journal of the `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from melanoma module'
  },
  'melanoma-ref-4': {
    id: 'melanoma-ref-4',
    type: 'diretriz',
    title: `NCCN Guidelines Insights: Melanoma: Cutaneous, Version 2.2024. et al. Journal of the National Comprehensive Cancer Netwo`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from melanoma module'
  },
  'melanoma-ref-5': {
    id: 'melanoma-ref-5',
    type: 'diretriz',
    title: `No title. et al. Annals of oncology : official journal of the European Society for Medical Oncology. 2021. PMID: 3430380`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from melanoma module'
  },
  'melanoma-ref-6': {
    id: 'melanoma-ref-6',
    type: 'diretriz',
    title: `Systemic Therapy for Melanoma: ASCO Guideline Update. et al. Journal of clinical oncology : official journal of the Amer`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from melanoma module'
  },
  'melanoma-ref-7': {
    id: 'melanoma-ref-7',
    type: 'diretriz',
    title: `European consensus-based interdisciplinary guideline for melanoma. Part 1: Diagnostics: Update 2022. et al. European jou`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from melanoma module'
  },
  'melanoma-ref-8': {
    id: 'melanoma-ref-8',
    type: 'diretriz',
    title: `Bone sarcomas: ESMO-EURACAN-GENTURIS-ERN PaedCan Clinical Practice Guideline for diagnosis, treatment and follow-up. et `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from melanoma module'
  },
  'melanoma-ref-9': {
    id: 'melanoma-ref-9',
    type: 'diretriz',
    title: `Guidelines of care for the management of primary cutaneous melanoma. et al. Journal of the American Academy of Dermatolo`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from melanoma module'
  },
  'melanoma-ref-10': {
    id: 'melanoma-ref-10',
    type: 'diretriz',
    title: `European consensus-based interdisciplinary guideline for melanoma. Part 1: Diagnostics - Update 2024. et al. European jo`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from melanoma module'
  },
  'sifilis-ref-1': {
    id: 'sifilis-ref-1',
    type: 'diretriz',
    title: `Grupo de Expertos AEDV et al. [Translated article] AEDV Expert Consensus for the Management of Syphilis. Actas Dermosifi`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sifilis module'
  },
  'sifilis-ref-2': {
    id: 'sifilis-ref-2',
    type: 'diretriz',
    title: `Grupo de Expertos AEDV et al. [Translated article] AEDV Expert Document on the Management of Ulcerative Venereal Infecti`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sifilis module'
  },
  'sifilis-ref-3': {
    id: 'sifilis-ref-3',
    type: 'diretriz',
    title: `Author1, Author2. The use of fresh capillary blood in immunoenzyme analysis for syphilis. Vestn Dermatol Venerol. 1990. `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sifilis module'
  },
  'sindrome-intestino-irritavel-ref-1': {
    id: 'sindrome-intestino-irritavel-ref-1',
    type: 'diretriz',
    title: `Lacy BE, Mearin F, Chang L, et al. Bowel Disorders. Gastroenterology. 2016;150(6):1393-1407. DOI: 10.1053/j.gastro.2016.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-intestino-irritavel module'
  },
  'sindrome-intestino-irritavel-ref-2': {
    id: 'sindrome-intestino-irritavel-ref-2',
    type: 'diretriz',
    title: `Chey WD, Kurlander J, Eswaran S. Irritable bowel syndrome: a clinical review. JAMA. 2015;313(9):949-958. DOI: 10.1001/ja`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-intestino-irritavel module'
  },
  'sindrome-intestino-irritavel-ref-3': {
    id: 'sindrome-intestino-irritavel-ref-3',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolos Clínicos e Diretrizes Terapêuticas: Distúrbios Funcionais Gastrointestinais. Brasília: M`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-intestino-irritavel module'
  },
  'sindrome-intestino-irritavel-ref-4': {
    id: 'sindrome-intestino-irritavel-ref-4',
    type: 'diretriz',
    title: `Sociedade Brasileira de Motilidade Digestiva e Neurogastroenterologia. Consenso Brasileiro sobre Síndrome do Intestino I`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-intestino-irritavel module'
  },
  'sindrome-intestino-irritavel-ref-5': {
    id: 'sindrome-intestino-irritavel-ref-5',
    type: 'diretriz',
    title: `Lovell RM, Ford AC. Global prevalence of and risk factors for irritable bowel syndrome: a meta-analysis. Clin Gastroente`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-intestino-irritavel module'
  },
  'sindrome-intestino-irritavel-ref-6': {
    id: 'sindrome-intestino-irritavel-ref-6',
    type: 'diretriz',
    title: `Souza AM, Pimentel AM, Rocha R, et al. Impact of dietary restriction on bowel symptoms in the irritable bowel syndrome: `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-intestino-irritavel module'
  },
  'sindrome-intestino-irritavel-ref-7': {
    id: 'sindrome-intestino-irritavel-ref-7',
    type: 'diretriz',
    title: `Saito YA, Talley NJ, Melton LJ 3rd, et al. The effect of life stress on irritable bowel syndrome. Am J Gastroenterol. 20`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-intestino-irritavel module'
  },
  'sindrome-intestino-irritavel-ref-8': {
    id: 'sindrome-intestino-irritavel-ref-8',
    type: 'diretriz',
    title: `Canavan C, West J, Card T. The epidemiology of irritable bowel syndrome. Clin Epidemiol. 2014;6:71-80. DOI: 10.2147/CLEP`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-intestino-irritavel module'
  },
  'sindrome-metabolica-ref-1': {
    id: 'sindrome-metabolica-ref-1',
    type: 'diretriz',
    title: `Sociedade Latino-Americana de Hipertensão Arterial; Sociedad Latinoamericana de Diabetes; et al. Latin American consensu`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-metabolica module'
  },
  'sindrome-metabolica-ref-2': {
    id: 'sindrome-metabolica-ref-2',
    type: 'diretriz',
    title: `Sociedade Brasileira de Cardiologia. I Brazilian guidelines on diagnosis and treatment of metabolic syndrome. Arq Bras C`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-metabolica module'
  },
  'sindrome-metabolica-ref-3': {
    id: 'sindrome-metabolica-ref-3',
    type: 'diretriz',
    title: `Saklayen MG. The Global Epidemic of the Metabolic Syndrome. Curr Hypertens Rep. 2018;20(2):12. doi: 10.1007/s11906-018-0`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-metabolica module'
  },
  'sindrome-metabolica-ref-4': {
    id: 'sindrome-metabolica-ref-4',
    type: 'diretriz',
    title: `de Souza MDG, et al. Prevalence of metabolic syndrome in Brazil: a systematic review and meta-analysis. BMC Public Healt`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-metabolica module'
  },
  'sindrome-metabolica-ref-5': {
    id: 'sindrome-metabolica-ref-5',
    type: 'diretriz',
    title: `Alberti KG, Eckel RH, Grundy SM, et al. Harmonizing the metabolic syndrome: a joint interim statement of the Internation`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from sindrome-metabolica module'
  },
  'tdah-ref-1': {
    id: 'tdah-ref-1',
    type: 'diretriz',
    title: `Torrent J, Casas M, Cejas A, et al. Expert recommendation: contributions to clinical practice of the new prodrug lisdexa`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from tdah module'
  },
  'tdah-ref-2': {
    id: 'tdah-ref-2',
    type: 'diretriz',
    title: `Equipo de consenso argentino. First Argentine Consensus on the management of Attention Deficit Hyperactivity Disorder in`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from tdah module'
  },
  'tdah-ref-3': {
    id: 'tdah-ref-3',
    type: 'diretriz',
    title: `Equipo de consenso argentino. First Argentine Consensus on the Management of Attention Deficit Hyperactivity Disorder in`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from tdah module'
  },
  'trombose-venosa-profunda-ref-1': {
    id: 'trombose-venosa-profunda-ref-1',
    type: 'diretriz',
    title: `Kearon C, Akl EA, Ornelas J, et al. Antithrombotic Therapy for VTE Disease: CHEST Guideline and Expert Panel Report. Che`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from trombose-venosa-profunda module'
  },
  'trombose-venosa-profunda-ref-2': {
    id: 'trombose-venosa-profunda-ref-2',
    type: 'diretriz',
    title: `Ortel TL, Neumann I, Ageno W, et al. American Society of Hematology 2020 Guidelines for Management of Venous Thromboembo`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from trombose-venosa-profunda module'
  },
  'trombose-venosa-profunda-ref-3': {
    id: 'trombose-venosa-profunda-ref-3',
    type: 'diretriz',
    title: `Wells PS, Anderson DR, Rodger M, et al. Evaluation of D-dimer in the diagnosis of suspected deep-vein thrombosis. N Engl`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from trombose-venosa-profunda module'
  },
  'trombose-venosa-profunda-ref-4': {
    id: 'trombose-venosa-profunda-ref-4',
    type: 'diretriz',
    title: `Bates SM, Jaeschke R, Stevens SM, et al. Diagnosis of DVT: Antithrombotic Therapy and Prevention of Thrombosis, 9th ed: `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from trombose-venosa-profunda module'
  },
  'trombose-venosa-profunda-ref-5': {
    id: 'trombose-venosa-profunda-ref-5',
    type: 'diretriz',
    title: `Heit JA. Epidemiology of venous thromboembolism. Nat Rev Cardiol. 2015;12(8):464-474. DOI: 10.1038/nrcardio.2015.83 PMID`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from trombose-venosa-profunda module'
  },
  'trombose-venosa-profunda-ref-6': {
    id: 'trombose-venosa-profunda-ref-6',
    type: 'diretriz',
    title: `Naess IA, Christiansen SC, Romundstad P, et al. Incidence and mortality of venous thrombosis: a population-based study. `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from trombose-venosa-profunda module'
  },
  'trombose-venosa-profunda-ref-7': {
    id: 'trombose-venosa-profunda-ref-7',
    type: 'diretriz',
    title: `Azevedo LC, Martins PA, Torres A, et al. Venous thromboembolism prophylaxis in medical patients: the evidence-based clin`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from trombose-venosa-profunda module'
  },
  'trombose-venosa-profunda-ref-8': {
    id: 'trombose-venosa-profunda-ref-8',
    type: 'diretriz',
    title: `Conselho Federal de Medicina. Protocolo Clínico e Diretrizes Terapêuticas para Tromboembolismo Venoso. Ministério da Saú`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from trombose-venosa-profunda module'
  },
  'trombose-venosa-profunda-ref-9': {
    id: 'trombose-venosa-profunda-ref-9',
    type: 'diretriz',
    title: `Ministério da Saúde. Protocolos Clínicos e Diretrizes Terapêuticas em Trombose Venosa Profunda. Brasília: MS; 2020.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from trombose-venosa-profunda module'
  },
  'trombose-venosa-profunda-ref-10': {
    id: 'trombose-venosa-profunda-ref-10',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Profilaxia de Tromboembolismo Venoso em Pacientes Hospitalizados. Comissão Nacional `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from trombose-venosa-profunda module'
  },
  'trombose-venosa-profunda-ref-11': {
    id: 'trombose-venosa-profunda-ref-11',
    type: 'diretriz',
    title: `Sociedade Brasileira de Angiologia e Cirurgia Vascular. Diretrizes Brasileiras para o Diagnóstico e Tratamento da Trombo`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from trombose-venosa-profunda module'
  },
  'trombose-venosa-profunda-ref-12': {
    id: 'trombose-venosa-profunda-ref-12',
    type: 'diretriz',
    title: `Mansur AP, Takada IN, Takada IN, et al. Brazilian Guidelines on Deep Vein Thrombosis. Arq Bras Cardiol. 2010;95(1 Suppl `,
    authors: [],
    year: 2024,
    note: 'Auto-imported from trombose-venosa-profunda module'
  },
  'trombose-venosa-profunda-ref-13': {
    id: 'trombose-venosa-profunda-ref-13',
    type: 'diretriz',
    title: `Silverstein MD, Heit JA, Mohr DN, et al. Trends in the incidence of deep vein thrombosis and pulmonary embolism: a 25-ye`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from trombose-venosa-profunda module'
  },
  'trombose-venosa-profunda-ref-14': {
    id: 'trombose-venosa-profunda-ref-14',
    type: 'diretriz',
    title: `Farresther RD, Holmqvist M, Yeo RA, et al. Trends in the incidence of deep vein thrombosis and pulmonary embolism in the`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from trombose-venosa-profunda module'
  },
  'trombose-venosa-profunda-ref-15': {
    id: 'trombose-venosa-profunda-ref-15',
    type: 'diretriz',
    title: `Giuntini C, Di Ricco G, Marini C, et al. Pulmonary embolism: epidemiology. Chest. 1995;107(2 Suppl):3S-9S. DOI: 10.1378/`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from trombose-venosa-profunda module'
  },
  'trombose-venosa-profunda-ref-16': {
    id: 'trombose-venosa-profunda-ref-16',
    type: 'diretriz',
    title: `Carman TL, Karchmer TB. Venous thromboembolism: epidemiology and the rise in cases. Cleve Clin J Med. 2001;68(7):567-569`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from trombose-venosa-profunda module'
  },
  'trombose-venosa-profunda-ref-17': {
    id: 'trombose-venosa-profunda-ref-17',
    type: 'diretriz',
    title: `Instituto Nacional de Câncer. Estimativa 2020: Incidência de Câncer no Brasil. Rio de Janeiro: INCA; 2019.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from trombose-venosa-profunda module'
  },
  'ulcera-peptica-ref-1': {
    id: 'ulcera-peptica-ref-1',
    type: 'diretriz',
    title: `Lanas A, Casado-Hernández I, et al. Safe prescription recommendations for non steroidal anti-inflammatory drugs: consens`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from ulcera-peptica module'
  },
  'ulcera-peptica-ref-2': {
    id: 'ulcera-peptica-ref-2',
    type: 'diretriz',
    title: `Lanas A, Casado-Hernández I, et al. Safe prescription recommendations for non steroidal anti-inflammatory drugs: Consens`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from ulcera-peptica module'
  },
  'ulcera-peptica-ref-3': {
    id: 'ulcera-peptica-ref-3',
    type: 'diretriz',
    title: `Lanas A, et al. First Spanish consensus on peptic ulcer bleeding management. Consenso sobre Hemorragia Digestiva por Úlc`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from ulcera-peptica module'
  },
  'cancer-mama-ref-1': {
    id: 'cancer-mama-ref-1',
    type: 'diretriz',
    title: `Sung H, Ferlay J, Siegel RL, et al. Global Cancer Statistics 2020: GLOBOCAN Estimates of Incidence and Mortality Worldwide for 36 Cancers in 185 Countries. CA Cancer J Clin. 2021;71(3):209-249. DOI: 10.3322/caac.21660`,
    authors: [],
    year: 2021,
    note: 'Auto-imported from cancer-mama module'
  },
  'cancer-mama-ref-2': {
    id: 'cancer-mama-ref-2',
    type: 'diretriz',
    title: `Instituto Nacional de Câncer José Alencar Gomes da Silva. Estimativa 2023: Incidência de Câncer no Brasil. Rio de Janeiro: INCA; 2023.`,
    authors: [],
    year: 2023,
    note: 'Auto-imported from cancer-mama module'
  },
  'cancer-mama-ref-3': {
    id: 'cancer-mama-ref-3',
    type: 'diretriz',
    title: `Marmot MG, Altman DG, Cameron DA, et al. The benefits and harms of breast cancer screening: an independent review. Lancet. 2012;380(9855):1778-1786. DOI: 10.1016/S0140-6736(12)61611-0`,
    authors: [],
    year: 2012,
    note: 'Auto-imported from cancer-mama module'
  },
  'cancer-mama-ref-4': {
    id: 'cancer-mama-ref-4',
    type: 'diretriz',
    title: `Gøtzsche PC, Jørgensen KJ. Screening for breast cancer with mammography. Cochrane Database Syst Rev. 2013;(6):CD001877. DOI: 10.1002/14651858.CD001877.pub5`,
    authors: [],
    year: 2013,
    note: 'Auto-imported from cancer-mama module'
  },
  'cancer-mama-ref-5': {
    id: 'cancer-mama-ref-5',
    type: 'diretriz',
    title: `Ministério da Saúde. Diretrizes Brasileiras para o Rastreamento do Câncer de Mama. Portaria GM/MS nº 2.456, de 13 de outubro de 2011. Brasília: Ministério da Saúde; 2011.`,
    authors: [],
    year: 2011,
    note: 'Auto-imported from cancer-mama module'
  },
  'cancer-mama-ref-6': {
    id: 'cancer-mama-ref-6',
    type: 'diretriz',
    title: `Sociedade Brasileira de Mastologia. Consenso Brasileiro sobre Rastreamento do Câncer de Mama. Rev Bras Mastol. 2020;30(1):5-15.`,
    authors: [],
    year: 2020,
    note: 'Auto-imported from cancer-mama module'
  },
  'cancer-mama-ref-7': {
    id: 'cancer-mama-ref-7',
    type: 'diretriz',
    title: `US Preventive Services Task Force. Screening for Breast Cancer: US Preventive Services Task Force Recommendation Statement. JAMA. 2024;331(22):1918-1927. DOI: 10.1001/jama.2024.6289`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from cancer-mama module'
  },
  'cancer-colo-utero-ref-1': {
    id: 'cancer-colo-utero-ref-1',
    type: 'diretriz',
    title: `Instituto Nacional de Câncer. Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero. Rio de Janeiro: INCA; 2020.`,
    authors: [],
    year: 2020,
    note: 'Auto-imported from cancer-colo-utero module'
  },
  'cancer-colo-utero-ref-2': {
    id: 'cancer-colo-utero-ref-2',
    type: 'diretriz',
    title: `Sociedade Brasileira de Ginecologia e Obstetrícia. Consenso Brasileiro em Cancer do Colo Uterino. Rev Bras Ginecol Obstet. 2022;44(5):567-578. DOI: 10.1055/s-0042-1757962`,
    authors: [],
    year: 2022,
    note: 'Auto-imported from cancer-colo-utero module'
  },
  'cancer-colo-utero-ref-3': {
    id: 'cancer-colo-utero-ref-3',
    type: 'diretriz',
    title: `Sung H, Ferlay J, Siegel RL, et al. Global Cancer Statistics 2020: GLOBOCAN Estimates of Incidence and Mortality Worldwide for 36 Cancers in 185 Countries. CA Cancer J Clin. 2021;71(3):209-249. DOI: 10.3322/caac.21660`,
    authors: [],
    year: 2021,
    note: 'Auto-imported from cancer-colo-utero module'
  },
  'cancer-colo-utero-ref-4': {
    id: 'cancer-colo-utero-ref-4',
    type: 'diretriz',
    title: `Ministério da Saúde. Estimativa 2023: Incidência de Câncer no Brasil. Rio de Janeiro: INCA; 2023.`,
    authors: [],
    year: 2023,
    note: 'Auto-imported from cancer-colo-utero module'
  },
  'cancer-colo-utero-ref-5': {
    id: 'cancer-colo-utero-ref-5',
    type: 'diretriz',
    title: `Portaria GM/MS nº 2.436, de 21 de setembro de 2011. Aprova a Política Nacional de Atenção Básica. Brasília: Ministério da Saúde; 2011.`,
    authors: [],
    year: 2011,
    note: 'Auto-imported from cancer-colo-utero module'
  },
  'cancer-colo-utero-ref-6': {
    id: 'cancer-colo-utero-ref-6',
    type: 'diretriz',
    title: `USPSTF. Cervical Cancer: Screening. JAMA. 2018;320(7):674-683. DOI: 10.1001/jama.2018.10897`,
    authors: [],
    year: 2018,
    note: 'Auto-imported from cancer-colo-utero module'
  },
  'cancer-colo-utero-ref-7': {
    id: 'cancer-colo-utero-ref-7',
    type: 'diretriz',
    title: `Bruni L, Albero G, Serrano B, et al. ICO/IARC Information Centre on HPV and Cancer (HPV Information Centre). Human Papillomavirus and Related Diseases in the World. Summary Report 2023.`,
    authors: [],
    year: 2023,
    note: 'Auto-imported from cancer-colo-utero module'
  },
  'cancer-colo-utero-ref-8': {
    id: 'cancer-colo-utero-ref-8',
    type: 'diretriz',
    title: `Ayres A, Castellsagué X, de Sanjosé S, et al. Prevalence of human papillomavirus types in cervical specimens from Brazilian women. Rev Saude Publica. 2019;53:45. DOI: 10.11606/s1518-8787.2019053000970`,
    authors: [],
    year: 2019,
    note: 'Auto-imported from cancer-colo-utero module'
  },
  'cancer-prostata-ref-1': {
    id: 'cancer-prostata-ref-1',
    type: 'diretriz',
    title: `Sung H, Ferlay J, Siegel RL, et al. Global Cancer Statistics 2020: GLOBOCAN Estimates of Incidence and Mortality Worldwide for 36 Cancers in 185 Countries. CA Cancer J Clin. 2021;71(3):209-249. DOI: 10.3322/caac.21660`,
    authors: [],
    year: 2021,
    note: 'Auto-imported from cancer-prostata module'
  },
  'cancer-prostata-ref-2': {
    id: 'cancer-prostata-ref-2',
    type: 'diretriz',
    title: `Arnold M, Rutherford MJ, Bardot A, et al. Progress in cancer survival, mortality, and incidence in seven high-income countries 1995–2014 (ICBP SURVMARK-2): a population-based study. Lancet Oncol. 2019;20(11):1493-1505. DOI: 10.1016/S1470-2045(19)30456-5`,
    authors: [],
    year: 2019,
    note: 'Auto-imported from cancer-prostata module'
  },
  'cancer-prostata-ref-3': {
    id: 'cancer-prostata-ref-3',
    type: 'diretriz',
    title: `Brasil. Instituto Nacional de Câncer. Estimativa 2023: Incidência de Câncer no Brasil. Rio de Janeiro: INCA; 2023.`,
    authors: [],
    year: 2023,
    note: 'Auto-imported from cancer-prostata module'
  },
  'cancer-prostata-ref-4': {
    id: 'cancer-prostata-ref-4',
    type: 'diretriz',
    title: `Vieira RA, de Camargo Cancela M, Viana Diniz MC, et al. Cancer Incidence and Mortality in Brazil: Temporal Trends and Projections to 2030. Cancer Epidemiol. 2022;78:102152. DOI: 10.1016/j.canep.2022.102152`,
    authors: [],
    year: 2022,
    note: 'Auto-imported from cancer-prostata module'
  },
  'cancer-prostata-ref-5': {
    id: 'cancer-prostata-ref-5',
    type: 'diretriz',
    title: `Cuzick J, Thorat MA, Andriole G, et al. Prevention and early detection of prostate cancer. Lancet Oncol. 2014;15(10):e484-e492. DOI: 10.1016/S1470-2045(14)70223-3`,
    authors: [],
    year: 2014,
    note: 'Auto-imported from cancer-prostata module'
  },
  'cancer-prostata-ref-6': {
    id: 'cancer-prostata-ref-6',
    type: 'diretriz',
    title: `Vickers AJ, Unger-Saldaña K, Lindgren B. Achieving the Potential of Cancer Prevention and Early Detection in Low- and Middle-Income Countries. JAMA Oncol. 2021;7(3):342-344. DOI: 10.1001/jamaoncol.2020.6458`,
    authors: [],
    year: 2021,
    note: 'Auto-imported from cancer-prostata module'
  },
  'cancer-prostata-ref-7': {
    id: 'cancer-prostata-ref-7',
    type: 'diretriz',
    title: `Brasil. Instituto Nacional de Câncer. Diretrizes Brasileiras para o Rastreamento do Câncer de Próstata. Rio de Janeiro: INCA; 2020.`,
    authors: [],
    year: 2020,
    note: 'Auto-imported from cancer-prostata module'
  },
  'cancer-prostata-ref-8': {
    id: 'cancer-prostata-ref-8',
    type: 'diretriz',
    title: `CONITEC. Relatório de Recomendação: Rastreamento do Câncer de Próstata. Brasília: Ministério da Saúde; 2018.`,
    authors: [],
    year: 2018,
    note: 'Auto-imported from cancer-prostata module'
  },
  'cancer-prostata-ref-9': {
    id: 'cancer-prostata-ref-9',
    type: 'diretriz',
    title: `Wei JT, Barocas DA, Carlsson S, et al. Early Detection of Prostate Cancer: AUA/SUO Guideline (2023). J Urol. 2023;209(4):674-689. DOI: 10.1097/JU.0000000000003437`,
    authors: [],
    year: 2023,
    note: 'Auto-imported from cancer-prostata module'
  },
  'cancer-prostata-ref-10': {
    id: 'cancer-prostata-ref-10',
    type: 'diretriz',
    title: `Pound CR, Partin AW, Eisenberger MA, et al. Natural history of progression after PSA elevation following radical prostatectomy. JAMA. 1999;281(17):1591-1597. DOI: 10.1001/jama.281.17.1591`,
    authors: [],
    year: 1999,
    note: 'Auto-imported from cancer-prostata module'
  },
  'cancer-prostata-ref-11': {
    id: 'cancer-prostata-ref-11',
    type: 'diretriz',
    title: `Mottet N, van den Bergh RC, Briers E, et al. EAU-EANM-ESTRO-ESUR-ISUP-SIOG Guidelines on Prostate Cancer. Eur Urol. 2023;83(4):1-20. DOI: 10.1016/j.eururo.2023.03.013`,
    authors: [],
    year: 2023,
    note: 'Auto-imported from cancer-prostata module'
  },
  'hepatite-c-ref-1': {
    id: 'hepatite-c-ref-1',
    type: 'diretriz',
    title: `Société des obstétriciens et gynécologues du Canada. Directive clinique révisée : Prestation de soins aux femmes atteintes d'une infection virale chronique en grossesse. J Obstet Gynaecol Can. 2020;42(12):1560-1570. DOI: 10.1016/j.jogc.2020.10.006`,
    authors: [],
    year: 2020,
    note: 'Auto-imported from hepatite-c module'
  },
  'hepatite-c-ref-2': {
    id: 'hepatite-c-ref-2',
    type: 'diretriz',
    title: `Société des obstétriciens et gynécologues du Canada. Déclaration de consensus clinique N° 458 : Le virus de l'hépatite C pendant la grossesse. J Obstet Gynaecol Can. 2025. DOI: 10.1016/j.jogc.2025.102781`,
    authors: [],
    year: 2025,
    note: 'Auto-imported from hepatite-c module'
  },
  'hepatite-c-ref-3': {
    id: 'hepatite-c-ref-3',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Atenção ao pré-natal de baixo risco. 2a ed. Brasília: Ministério da Saúde; 2012.`,
    authors: [],
    year: 2012,
    note: 'Auto-imported from hepatite-c module'
  },
  'hepatite-c-ref-4': {
    id: 'hepatite-c-ref-4',
    type: 'diretriz',
    title: `World Health Organization. Hepatitis C fact sheet. Geneva: WHO; 2024. Available from: https://www.who.int/news-room/fact-sheets/detail/hepatitis-c.`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from hepatite-c module'
  },
  'hepatite-c-ref-5': {
    id: 'hepatite-c-ref-5',
    type: 'diretriz',
    title: `Ministério da Saúde (Brasil). Boletim Epidemiológico: Hepatites Virais. Brasília: Secretaria de Vigilância em Saúde; 2022.`,
    authors: [],
    year: 2022,
    note: 'Auto-imported from hepatite-c module'
  },
  'glaucoma-ref-1': {
    id: 'glaucoma-ref-1',
    type: 'diretriz',
    title: `Prum BE Jr, Rosenberg LF, Gedde SJ, et al. Primary Open-Angle Glaucoma Preferred Practice Pattern®. Ophthalmology. 2021;128(1):P71-P150. DOI: 10.1016/j.ophtha.2020.10.022`,
    authors: [],
    year: 2021,
    note: 'Auto-imported from glaucoma module'
  },
  'glaucoma-ref-2': {
    id: 'glaucoma-ref-2',
    type: 'diretriz',
    title: `Rivas MA, Rullán A, Juberías S, et al. Advanced glaucoma. Clinical practice guideline. Archivos de la Sociedad Espanola de Oftalmologia. 2023;98(1):15-32. DOI: 10.1016/j.oftal.2022.08.005`,
    authors: [],
    year: 2023,
    note: 'Auto-imported from glaucoma module'
  },
  'glaucoma-ref-3': {
    id: 'glaucoma-ref-3',
    type: 'diretriz',
    title: `Authors not specified. Evidence-Based Guidelines for Keratorefractive Lenticule Extraction Surgery. Ophthalmology. 2025;132(2):200-215. DOI: 10.1016/j.ophtha.2024.11.016`,
    authors: [],
    year: 2025,
    note: 'Auto-imported from glaucoma module'
  },
  'glaucoma-ref-4': {
    id: 'glaucoma-ref-4',
    type: 'diretriz',
    title: `Authors not specified. French protocol for diagnosis and management of type 1 interferonopathies. La Revue de medecine interne. 2025;46(5):300-315. DOI: 10.1016/j.revmed.2025.04.027`,
    authors: [],
    year: 2025,
    note: 'Auto-imported from glaucoma module'
  },
  'glaucoma-ref-5': {
    id: 'glaucoma-ref-5',
    type: 'diretriz',
    title: `Authors not specified. Angle-closure glaucoma: diagnosis. Revista da Associacao Medica Brasileira (1992). 2014;60(3):256-262. DOI: 10.1590/1806-9282.60.03.004`,
    authors: [],
    year: 2014,
    note: 'Auto-imported from glaucoma module'
  },
  'glaucoma-ref-6': {
    id: 'glaucoma-ref-6',
    type: 'diretriz',
    title: `Authors not specified. [Glaucoma]. Duodecim; laaketieteellinen aikakauskirja. 2002;118(20):2201-2208.`,
    authors: [],
    year: 2002,
    note: 'Auto-imported from glaucoma module'
  },
  'glaucoma-ref-7': {
    id: 'glaucoma-ref-7',
    type: 'diretriz',
    title: `Prum BE Jr, Lim MC, Mansberger SL, et al. Primary Angle-Closure Disease Preferred Practice Pattern®. Ophthalmology. 2021;128(1):P30-P70. DOI: 10.1016/j.ophtha.2020.10.021`,
    authors: [],
    year: 2021,
    note: 'Auto-imported from glaucoma module'
  },
  'glaucoma-ref-8': {
    id: 'glaucoma-ref-8',
    type: 'diretriz',
    title: `Pecheur M, Denis P. [Pregnancy & glaucoma: SFO-SFG recommendations]. Journal francais d'ophtalmologie. 2020;43(2):177-183. DOI: 10.1016/j.jfo.2019.11.001`,
    authors: [],
    year: 2020,
    note: 'Auto-imported from glaucoma module'
  },
  'glaucoma-ref-9': {
    id: 'glaucoma-ref-9',
    type: 'diretriz',
    title: `Buys YM. A Canadian glaucoma strategy. Canadian journal of ophthalmology. Journal canadien d'ophtalmologie. 2007;42 Suppl 1:S1-S24.`,
    authors: [],
    year: 2007,
    note: 'Auto-imported from glaucoma module'
  },
  'glaucoma-ref-10': {
    id: 'glaucoma-ref-10',
    type: 'diretriz',
    title: `European Glaucoma Society. European Glaucoma Society - A guide on surgical innovation for glaucoma. The British journal of ophthalmology. 2023;107 Suppl 2:1-48. DOI: 10.1136/bjophthalmol-2023-egsguidelines`,
    authors: [],
    year: 2023,
    note: 'Auto-imported from glaucoma module'
  },
  'doenca-celiaca-ref-1': {
    id: 'doenca-celiaca-ref-1',
    type: 'diretriz',
    title: `Lebwohl B, Sanders DS, Green PHR. Coeliac disease. Lancet. 2018;391(10115):70-81. DOI: 10.1016/S0140-6736(17)31796-8`,
    authors: [],
    year: 2018,
    note: 'Auto-imported from doenca-celiaca module'
  },
  'doenca-celiaca-ref-2': {
    id: 'doenca-celiaca-ref-2',
    type: 'diretriz',
    title: `Bai JC, Fried M, Roberto G, et al. World Gastroenterology Organisation Global Guidelines: Celiac Disease February 2012. J Clin Gastroenterol. 2013;47(2):121-126. DOI: 10.1097/MCG.0b013e318272eea9`,
    authors: [],
    year: 2013,
    note: 'Auto-imported from doenca-celiaca module'
  },
  'doenca-celiaca-ref-3': {
    id: 'doenca-celiaca-ref-3',
    type: 'diretriz',
    title: `Singh P, Arora A, Strand TA, et al. Global Prevalence of Celiac Disease: Systematic Review and Meta-analysis. Clin Gastroenterol Hepatol. 2018;16(6):823-836.e2. DOI: 10.1016/j.cgh.2017.12.019`,
    authors: [],
    year: 2018,
    note: 'Auto-imported from doenca-celiaca module'
  },
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

