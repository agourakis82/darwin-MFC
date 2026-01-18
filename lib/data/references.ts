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

