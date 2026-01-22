{
  id: 'esquistossomose',
  titulo: 'Rastreamento de Esquistossomose',
  categoria: 'doencas_infecciosas',
  descricao: 'A esquistossomose é uma doença parasitária negligenciada causada por trematódeos do gênero Schistosoma, com transmissão via água contaminada por caramujos vetores [1,2]. O rastreamento é essencial em áreas endêmicas para detecção precoce e controle da morbidade [3,4]. No Brasil, a doença afeta principalmente regiões Nordeste e Sudeste, com prevalência variando de 1% a 20% em comunidades de risco [5,6].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado em áreas endêmicas para populações expostas a corpos d\'água infectados [7,8]. Indicado para escolares e indivíduos em risco ocupacional ou recreacional [7,8].',
      populacaoAlvo: 'Escolares de 5 a 14 anos em municípios endêmicos; adultos em atividades de risco aquático [7,8].',
      periodicidade: 'Anual em áreas de alta prevalência (>15%); a cada 2 anos em áreas de baixa prevalência [7].',
      metodos: ['Exame parasitológico de fezes (Kato-Katz)', 'Exame de urina (filtração)', 'Sorologia (ELISA para anticorpos)'],
      evidencia: 'Ia',
      referencias: [7, 8],
    },
    sociedadesMedicas: {
      indicacao: 'A Sociedade Brasileira de Medicina Tropical (SBMT, 2022) e WHO (2022) recomendam rastreamento ativo em populações endêmicas para prevenção de complicações hepatoesplênicas [9,10].',
      populacaoAlvo: 'Crianças e adolescentes em áreas endêmicas; adultos com exposição ocupacional [9,10].',
      periodicidade: 'Anual para grupos de alto risco; bienal em contextos de baixa transmissão [9].',
      metodos: ['Kato-Katz para detecção de ovos', 'Testes sorológicos quantitativos', 'Ultrassonografia para morbidade'],
      evidencia: 'Ia',
      referencias: [9, 10],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global é estimada em 240 milhões de casos, com 700 milhões em risco [1,2]. No Brasil, cerca de 4 milhões de pessoas em 19 estados endêmicos, com prevalência de 1-20% em focos [5,6].',
    incidencia: 'Incidência global de 100-200 milhões de novas infecções anuais [1]. No Brasil, incidência de 0,5-2 casos por 1.000 habitantes em áreas endêmicas [5].',
    mortalidade: 'Mortalidade global de aproximadamente 20.000 óbitos/ano devido a complicações [1,2]. No Brasil, baixa mortalidade direta, mas contribui para 1-2% das mortes por doenças infecciosas em endemias [5,6].',
    referencias: [1, 2, 5, 6],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['80349-8', '6901-3', '24357-9', '80350-6', '9640-0'],
    atc: ['P02CA01'],
    ciap2: ['A78', 'A79'],
  },
  
  referencias: [
    { id: 1, citation: 'World Health Organization. Schistosomiasis. WHO Fact Sheet. Geneva: WHO; 2023. PMID: ', doi: '' },
    { id: 2, citation: 'Colley DG, Bustinduy AL, Secor WE, King CH. Human schistosomiasis. Lancet. 2014;383(9936):2253-2264. DOI: 10.1016/S0140-6736(13)61949-2 PMID: 24630742', pmid: '24630742', doi: '10.1016/S0140-6736(13)61949-2' },
    { id: 3, citation: 'Ministry of Health Brazil. Programa de Controle da Esquistossomose. Brasília: Ministério da Saúde; 2020.', pmid: '', doi: '' },
    { id: 4, citation: 'Fenwick A, et al. The Schistosomiasis Control Initiative (SCI): rationale, development and implementation from 2002-2008. Acta Trop. 2009;111(1):3-8. DOI: 10.1016/j.actatropica.2009.02.003 PMID: 19428593', pmid: '19428593', doi: '10.1016/j.actatropica.2009.02.003' },
    { id: 5, citation: 'Ximenes RAA, et al. Schistosomiasis in Brazil: where do we stand? Mem Inst Oswaldo Cruz. 2021;116:e210057. DOI: 10.1590/0074-02760210057 PMID: 34076143', pmid: '34076143', doi: '10.1590/0074-02760210057' },
    { id: 6, citation: 'Brazilian Ministry of Health. Vigilância em Saúde: Esquistossomose Mansoni. Brasília: MS; 2014. ISBN: 978-85-334-2197-3', pmid: '', doi: '' },
    { id: 7, citation: 'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Esquistossomose. Brasília: MS; 2019.', pmid: '', doi: '' },
    { id: 8, citation: 'CONITEC. Relatório de Recomendação: Esquistossomose. Brasília: Comissão Nacional de Incorporação de Tecnologias no SUS; 2020.', pmid: '', doi: '' },
    { id: 9, citation: 'Sociedade Brasileira de Medicina Tropical. Consenso Brasileiro em Esquistossomose. Rev Soc Bras Med Trop. 2022;55:e0200. DOI: 10.1590/0037-8682-0200-2022 PMID: 35703985', pmid: '35703985', doi: '10.1590/0037-8682-0200-2022' },
    { id: 10, citation: 'World Health Organization. Guideline: preventive chemotherapy to control schistosomiasis and soil-transmitted helminth infections. Geneva: WHO; 2022. ISBN: 978-92-4-003346-0', pmid: '', doi: '' }
  ],
}