{
  id: 'diabetes-mellitus-1',
  titulo: 'Rastreamento de Diabetes Mellitus Tipo 1',
  categoria: 'criancas_e_adolescentes',
  descricao: 'O rastreamento de Diabetes Mellitus Tipo 1 (DM1) visa identificar casos assintomáticos em grupos de alto risco, como familiares de primeiro grau de pacientes com DM1, devido ao componente autoimune da doença [1,2]. A detecção precoce por meio de testes de autoanticorpos pode permitir intervenções para retardar o início clínico [1,3]. No Brasil, o foco é no diagnóstico oportuno em crianças e adolescentes com sintomas sugestivos [3].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento não é recomendado de forma rotineira na população geral; indicado para crianças e adolescentes com sintomas clássicos (poliúria, polidipsia, perda de peso) ou em familiares de primeiro grau de pacientes com DM1 [3].',
      populacaoAlvo: 'Crianças e adolescentes com suspeita clínica ou história familiar de DM1 [3].',
      periodicidade: 'Avaliação imediata na presença de sintomas; rastreamento periódico em familiares de alto risco a cada 6-12 meses [3].',
      metodos: ['Glicemia de jejum', 'HbA1c', 'Teste de tolerância à glicose oral (TOTG)', 'Dosagem de autoanticorpos (GAD, IA-2, insulina)'],
      evidencia: 'IIb',
      referencias: [3],
    },
    sociedadesMedicas: {
      indicacao: 'A American Diabetes Association (2024) e a Sociedade Brasileira de Diabetes (2023-2024) recomendam rastreamento em parentes de primeiro grau de indivíduos com DM1 assintomáticos, utilizando painel de autoanticorpos [1,2].',
      populacaoAlvo: 'Parentes de primeiro grau (pais, irmãos, filhos) de pacientes com DM1, independentemente da idade [1,2].',
      periodicidade: 'Anual ou a cada 6 meses em indivíduos de alto risco com autoanticorpos positivos [1,2].',
      metodos: ['Painel de autoanticorpos (GAD65, IA-2, IAA, ZnT8)', 'Glicemia de jejum', 'HbA1c'],
      evidencia: 'Ib',
      referencias: [1, 2],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de DM1 é de aproximadamente 0,5% em crianças e adolescentes, afetando cerca de 8,4 milhões de pessoas em 2021 [5]. No Brasil, estima-se em 0,2-0,3% na população pediátrica [2,6].',
    incidencia: 'A incidência global é de 15 novos casos por 100.000 crianças por ano [5]. No Brasil, varia de 8 a 12 casos por 100.000 crianças/ano [2,6].',
    mortalidade: 'A mortalidade por DM1 é de cerca de 2-4% em países de alta renda, com 11.300 mortes em menores de 20 anos globalmente em 2021 [5,7]. No Brasil, contribui para 0,5% das mortes em jovens [6].',
    referencias: [2, 5, 6, 7],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['4548-4', '2345-7', '49694-4', '58537-0', '80808-3'],
    ciap2: ['T89'],
    atc: ['A10AE01', 'A10AE04', 'A10AD05', 'A10AB', 'A10AC'],
  },
  
  referencias: [
    { id: 1, citation: 'American Diabetes Association. 3. Prevention or Delay of Diabetes and Associated Comorbidities: Standards of Care in Diabetes—2024. Diabetes Care. 2024;47(Suppl 1):S77-S87. DOI: 10.2337/dc24-S003 PMID: 38078591', pmid: '38078591', doi: '10.2337/dc24-S003' },
    { id: 2, citation: 'Sociedade Brasileira de Diabetes. Diretrizes da Sociedade Brasileira de Diabetes 2023-2024. São Paulo: SBD; 2023. p. 45-60.', pmid: '', doi: '' },
    { id: 3, citation: 'Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Diabetes Mellitus Tipo 1. Brasília: Ministério da Saúde; 2022. Available from: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2022/pcdt_diabetes_mellitus_tipo_1.pdf', pmid: '', doi: '' },
    { id: 4, citation: 'Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Diabetes Mellitus Tipo 2. Brasília: Ministério da Saúde; 2022. Available from: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2022/pcdt_diabetes_mellitus_tipo_2.pdf', pmid: '', doi: '' },
    { id: 5, citation: 'International Diabetes Federation. IDF Diabetes Atlas. 10th ed. Brussels: IDF; 2021.', pmid: '', doi: '' },
    { id: 6, citation: 'Schvartzman P, et al. Epidemiology of type 1 diabetes mellitus in Brazil. Arq Bras Endocrinol Metabol. 2009;53(5):616-623. PMID: 19722071', pmid: '19722071', doi: '10.1590/S0004-27302009000500013' },
    { id: 7, citation: 'World Health Organization. Global report on diabetes. Geneva: WHO; 2016.', pmid: '', doi: '' }
  ],
}