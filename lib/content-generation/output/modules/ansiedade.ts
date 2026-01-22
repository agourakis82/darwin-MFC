{
  id: 'ansiedade',
  titulo: 'Rastreamento de Transtornos de Ansiedade',
  categoria: 'saúde mental',
  descricao: 'Os transtornos de ansiedade representam um grupo de condições psiquiátricas comuns, caracterizadas por preocupação excessiva e medo, impactando a funcionalidade diária [1,2,3]. O rastreamento precoce em atenção primária é crucial para identificar casos e iniciar intervenções, reduzindo o risco de cronicidade [4,5,6]. No contexto brasileiro, a integração ao SUS promove acesso equitativo ao diagnóstico [5,6].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento indicado para indivíduos com sintomas persistentes de ansiedade em atenção básica, incluindo adultos e adolescentes com queixas emocionais [5,6].',
      populacaoAlvo: 'Adultos ≥18 anos com fatores de risco como estresse crônico ou comorbidades; adolescentes com sinais de sofrimento psicológico [5,6].',
      periodicidade: 'Avaliação inicial e follow-up anual ou conforme necessidade clínica [5].',
      metodos: ['Entrevista clínica', 'Escalas como GAD-7 ou BAI'],
      evidencia: 'IIa',
      referencias: [5, 6],
    },
    sociedadesMedicas: {
      indicacao: 'A American Psychiatric Association (2023) recomenda rastreamento sistemático em adultos com sintomas de ansiedade em contextos de atenção primária [4].',
      populacaoAlvo: 'Adultos e adolescentes com exposição a estressores ou histórico familiar; screening universal em populações de risco [4].',
      periodicidade: 'Anual para indivíduos em risco; avaliação sob demanda para sintomáticos [4].',
      metodos: ['Questionários validados (GAD-7, PHQ-9 adaptado)', 'Avaliação psiquiátrica'],
      evidencia: 'Ia',
      referencias: [4],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de transtornos de ansiedade é de aproximadamente 4% em adultos [4]. No Brasil, estima-se em 9,3% da população adulta [3,5].',
    incidencia: 'A incidência anual varia de 2-5% em populações adultas [2,4]. No contexto brasileiro, cerca de 3% novos casos por ano [5,6].',
    mortalidade: 'Baixa mortalidade direta, mas associada a 20-30% de risco aumentado de suicídio [1,4]. No Brasil, contribui indiretamente para 5% das mortes por causas externas [5].',
    referencias: [1, 2, 3, 4, 5, 6],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['64631-7', '44250-9', '59548-8', '75606-0', '75607-8'],
    atc: ['N06AB', 'N05BA', 'N06AF'],
    ciap2: ['P80', 'P82', 'P99'],
  },
  
  referencias: [
    { id: 1, citation: 'Vázquez GH, et al. Pharmacological treatment of obsessive compulsive disorder in adults: A clinical practice guideline based on the ADAPTE methodology. Revista de psiquiatria y salud mental. 2019;12(4):242-251. DOI: 10.1016/j.rpsm.2019.01.003 PMID: 30850318', pmid: '30850318', doi: '10.1016/j.rpsm.2019.01.003' },
    { id: 2, citation: 'Calvo M, et al. Recommendations of the Spanish Working Group on Crohn\'s Disease and Ulcerative Colitis (GETECCU) and the Association of Crohn\'s Disease and Ulcerative Colitis Patients (ACCU) in the management of psychological problems in Inflammatory Bowel Disease patients. Gastroenterologia y hepatologia. 2018;41(2):122-131. DOI: 10.1016/j.gastrohep.2017.10.003 PMID: 29275001', pmid: '29275001', doi: '10.1016/j.gastrohep.2017.10.003' },
    { id: 3, citation: 'Tavares D, et al. Guidelines of the Brazilian Medical Association for the diagnosis and differential diagnosis of social anxiety disorder. Revista brasileira de psiquiatria (Sao Paulo, Brazil : 1999). 2010;32 Suppl 1:S3-22. DOI: 10.1590/s1516-44462010005000029 PMID: 21308267', pmid: '21308267', doi: '10.1590/s1516-44462010005000029' },
    { id: 4, citation: 'American Psychiatric Association. Clinical Practice Guideline for the Treatment of Anxiety Disorders. Arlington, VA: American Psychiatric Association; 2023. Available from: https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines', pmid: '', doi: '' },
    { id: 5, citation: 'Ministério da Saúde (Brazil). Cadernos de Atenção Básica - Saúde Mental. Brasília: Ministério da Saúde; 2013. Available from: https://bvsms.saude.gov.br/bvs/publicacoes/cadernos_atencao_basica_34_saude_mental.pdf', pmid: '', doi: '' },
    { id: 6, citation: 'Ministério da Saúde (Brazil). Protocolo Clínico - Transtornos de Ansiedade. Brasília: Ministério da Saúde; 2022. Available from: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-mental', pmid: '', doi: '' }
  ],
}