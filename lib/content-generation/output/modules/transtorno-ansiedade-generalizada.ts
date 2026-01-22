{
  id: 'transtorno-ansiedade-generalizada',
  titulo: 'Transtorno de Ansiedade Generalizada',
  categoria: 'saúde mental',
  descricao: 'O Transtorno de Ansiedade Generalizada (TAG) é caracterizado por ansiedade e preocupação excessiva persistente por pelo menos seis meses, acompanhada de sintomas como inquietação, fadiga e tensão muscular [1,2,3]. A prevalência global é estimada em 3,6% para o período de 12 meses [1]. No Brasil, a prevalência de transtornos de ansiedade é de aproximadamente 9,3% [2,3].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado em atenção primária para adultos com sintomas de ansiedade persistente, incluindo preocupação excessiva e sintomas somáticos [2,3].',
      populacaoAlvo: 'Adultos ≥18 anos com queixas de ansiedade crônica ou fatores de risco como estresse crônico e comorbidades [2,3].',
      periodicidade: 'Avaliação anual ou conforme necessidade clínica em consultas de rotina [2,3].',
      metodos: ['Questionário GAD-7', 'Entrevista clínica estruturada'],
      evidencia: 'III',
      referencias: [2, 3],
    },
    sociedadesMedicas: {
      indicacao: 'A American Psychiatric Association (2023) recomenda rastreamento em adultos com sintomas sugestivos de TAG, especialmente em contextos de atenção primária [1].',
      populacaoAlvo: 'Adultos ≥18 anos com ansiedade generalizada e prejuízo funcional [1].',
      periodicidade: 'Monitoramento contínuo ou anual em populações de risco [1].',
      metodos: ['Escalas de triagem como GAD-7', 'Avaliação diagnóstica DSM-5'],
      evidencia: 'III',
      referencias: [1],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'Prevalência global de 3,6% em adultos para TAG no último ano [1]. No Brasil, transtornos de ansiedade afetam 9,3% da população adulta [2,3].',
    incidencia: 'Incidência anual estimada em 2-5% em populações adultas [1,2]. No Brasil, cerca de 1,5% novos casos por ano [3].',
    mortalidade: 'Baixa mortalidade direta, mas associada a risco aumentado de suicídio (OR 2,1) e comorbidades cardiovasculares [1,2,3].',
    referencias: [1, 2, 3],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['64631-9', '59548-8', '44250-9', '64632-7', '59549-6'],
    ciap2: ['P74'],
    atc: ['N06AB03', 'N06AB05', 'N05BA01', 'N06AB10', 'N05AN01'],
  },
  
  referencias: [
    { id: 1, citation: 'American Psychiatric Association. Clinical Practice Guideline for the Treatment of Anxiety Disorders. Arlington, VA: American Psychiatric Association; 2023. Available from: https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines', pmid: '', doi: '' },
    { id: 2, citation: 'Ministério da Saúde (Brasil). Cadernos de Atenção Básica - Saúde Mental. Brasília: Ministério da Saúde; 2013. Available from: https://bvsms.saude.gov.br/bvs/publicacoes/cadernos_atencao_basica_34_saude_mental.pdf', pmid: '', doi: '' },
    { id: 3, citation: 'Ministério da Saúde (Brasil). Protocolo Clínico - Transtornos de Ansiedade. Brasília: Ministério da Saúde; 2022. Available from: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-mental', pmid: '', doi: '' }
  ],
}