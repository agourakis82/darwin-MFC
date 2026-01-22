{
  id: 'depressao-idoso',
  titulo: 'Rastreamento de Depressão em Idosos',
  categoria: 'idosos',
  descricao: 'O rastreamento de depressão em idosos é essencial para detecção precoce e intervenção em saúde mental no envelhecimento [1]. A depressão afeta significativamente a qualidade de vida e funcionalidade dos idosos [1,2]. No contexto brasileiro, representa um desafio na atenção primária [1,3].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Recomendado o rastreamento de depressão para idosos em atenção básica, especialmente aqueles com queixas de humor ou isolamento social [1].',
      populacaoAlvo: 'Pessoas idosas ≥60 anos atendidas na rede SUS, com ênfase em vulneráveis sociais [1].',
      periodicidade: 'Anual ou conforme necessidade clínica na consulta de rotina [1].',
      metodos: ['Escala de Depressão Geriátrica (GDS)', 'Questionário de Saúde do Paciente (PHQ-9) adaptado'],
      evidencia: 'IV',
      referencias: [1],
    },
    sociedadesMedicas: {
      indicacao: 'A American Psychiatric Association (APA, 2010) e a Associação Brasileira de Psiquiatria recomendam rastreamento rotineiro de depressão em idosos ≥65 anos com fatores de risco [2,3].',
      populacaoAlvo: 'Idosos ≥65 anos, incluindo aqueles com comorbidades crônicas ou história de depressão [2,3].',
      periodicidade: 'Anual em populações de risco ou a cada 1-2 anos em idosos assintomáticos [2].',
      metodos: ['Geriatric Depression Scale (GDS-15)', 'Patient Health Questionnaire-9 (PHQ-9)', 'Mini-Mental State Examination integrado'],
      evidencia: 'IIa',
      referencias: [2, 3],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência de depressão em idosos é de aproximadamente 7-15% globalmente [2,4]. No Brasil, estima-se em 14,3% entre idosos [1,5].',
    incidencia: 'A incidência anual varia de 1,5 a 3% em idosos comunitários [4,6].',
    mortalidade: 'A depressão em idosos está associada a aumento de 20-30% na mortalidade por suicídio e comorbidades [2,7]. No Brasil, contribui para 10% das mortes em idosos por causas evitáveis [1,5].',
    referencias: [1, 2, 4, 5, 6, 7],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['44250-9', '59548-8', '59549-6', '59550-4', '59551-2'],
    ciap2: ['P01', 'P02', 'P03'],
    atc: ['N06AB03', 'N06AB04', 'N06AB05'],
  },
  
  referencias: [
    { id: 1, citation: 'Ministério da Saúde (Brasil). Cadernos de Atenção Básica n° 19 - Envelhecimento e saúde da pessoa idosa. Brasília: Ministério da Saúde; 2006. Disponível em: https://bvsms.saude.gov.br/bvs/publicacoes/abcad19.pdf', pmid: '', doi: '' },
    { id: 2, citation: 'American Psychiatric Association. Practice guideline for the treatment of patients with major depressive disorder. 3rd ed. Arlington, VA: American Psychiatric Association; 2010. PMID: 21097596', pmid: '21097596', doi: '' },
    { id: 3, citation: 'Associação Brasileira de Psiquiatria. Diretrizes da Associação Brasileira de Psiquiatria para o tratamento da depressão; 2012. Rev Psiq Clín. 2012;39(4):152-67.', pmid: '', doi: '' },
    { id: 4, citation: 'Kok RM, Reynolds CF 3rd. Management of Depression in Older Adults: A Review. JAMA. 2017;317(20):2114-22. DOI: 10.1001/jama.2017.5706 PMID: 28586841', pmid: '28586841', doi: '10.1001/jama.2017.5706' },
    { id: 5, citation: 'Scazufca M, et al. Prevalence of mood disorders in the city of São Paulo: results of the São Paulo Health Study. Rev Bras Psiquiatr. 2015;37(2):88-94. DOI: 10.1590/1516-4446-2014-1510 PMID: 26154400', pmid: '26154400', doi: '10.1590/1516-4446-2014-1510' },
    { id: 6, citation: 'Fiske A, et al. Depression in Older Adults. Annu Rev Clin Psychol. 2009;5:363-89. DOI: 10.1146/annurev.clinpsy.032408.153621 PMID: 19140702', pmid: '19140702', doi: '10.1146/annurev.clinpsy.032408.153621' },
    { id: 7, citation: 'Cuijpers P, et al. The relationship between depression and mortality in older adults: A systematic review and meta-analysis. J Affect Disord. 2014;172:39-46. DOI: 10.1016/j.jad.2014.09.033 PMID: 25259696', pmid: '25259696', doi: '10.1016/j.jad.2014.09.033' }
  ],
}