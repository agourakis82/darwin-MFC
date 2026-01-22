{
  id: 'febre-amarela',
  titulo: 'Vacinação e Rastreamento para Febre Amarela',
  categoria: 'doenças_infecciosas',
  descricao: 'A febre amarela é uma doença viral aguda transmitida por mosquitos Aedes e Haemagogus, endêmica em regiões tropicais da América do Sul e África [1,2]. No Brasil, representa risco significativo em áreas silvestres, com vacinação como principal estratégia de prevenção [3,4]. A identificação precoce de casos e status vacinal é essencial para controle epidemiológico [5].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Vacinação recomendada para residentes e viajantes em áreas de risco endêmico ou com transmissão silvestre [3,6]. Rastreamento de status vacinal em consultas de rotina em regiões afetadas [3,6].',
      populacaoAlvo: 'Crianças a partir de 9 meses de idade; adultos até 59 anos em áreas de risco; gestantes e idosos com avaliação individual [3,6].',
      periodicidade: 'Dose única para imunidade vitalícia em adultos; reforço a cada 10 anos para viajantes internacionais [3,6].',
      metodos: ['Vacina atenuada 17D', 'Certificado Internacional de Vacinação'],
      evidencia: 'Ia',
      referencias: [3, 6],
    },
    sociedadesMedicas: {
      indicacao: 'A Sociedade Brasileira de Imunizações (SBIm) e WHO recomendam vacinação para populações em áreas endêmicas e viajantes [2,7]. Rastreamento sorológico em surtos [2,7].',
      populacaoAlvo: 'Indivíduos ≥9 meses em zonas de risco; viajantes para áreas endêmicas, excluindo contraindicações como imunossupressão [2,7].',
      periodicidade: 'Dose única com reforço decenal para certos grupos; monitoramento anual em áreas de alta transmissão [2,7].',
      metodos: ['Vacina viva atenuada', 'Testes sorológicos IgM/IgG'],
      evidencia: 'Ia',
      referencias: [2, 7],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'Globalmente, estima-se 200.000 casos anuais, com 30.000 mortes [1,8]. No Brasil, prevalência sorológica em áreas endêmicas varia de 5-20% [3,9].',
    incidencia: 'Incidência no Brasil foi de 3,6 casos por 100.000 habitantes em 2017-2018 durante surto [3,10]. Globalmente, 29 casos por 100.000 em regiões de risco [1,8].',
    mortalidade: 'Taxa de letalidade de 20-50% em formas graves sem tratamento [1,2]. No Brasil, 289 mortes registradas em 2017-2020 [3,10].',
    referencias: [1, 2, 3, 8, 9, 10],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['51911-2', '51913-8', '80700-3', '80701-1', '80702-9'],
    ciap2: [],
    atc: ['J07BL01']
  },
  
  referencias: [
    { id: 1, citation: 'World Health Organization. Yellow fever. WHO Fact Sheet. Geneva: WHO; 2023.', pmid: '', doi: '' },
    { id: 2, citation: 'World Health Organization. Yellow fever vaccination: WHO position paper – July 2023. Wkly Epidemiol Rec. 2023;98(30):317-332.', pmid: '37531294', doi: '' },
    { id: 3, citation: 'Ministério da Saúde (Brasil). Vacina de febre amarela: informe técnico. Brasília: MS; 2022.', pmid: '', doi: '' },
    { id: 4, citation: 'Barrett ADT, Monath TP. History of yellow fever. In: Yellow Fever. Current Topics in Microbiology and Immunology. 2014;376:1-15.', pmid: '', doi: '10.1007/978-3-319-05090-7_1' },
    { id: 5, citation: 'Silva MV, et al. Yellow fever surveillance in Brazil: challenges and perspectives. Rev Saude Publica. 2020;54:45.', pmid: '32491004', doi: '10.11606/s1518-8787.2020054002466' },
    { id: 6, citation: 'Ministério da Saúde (Brasil). Programa Nacional de Imunizações: febre amarela. Brasília: MS; 2021.', pmid: '', doi: '' },
    { id: 7, citation: 'Sociedade Brasileira de Imunizações. Calendário de vacinação 2023. SBIm; 2023.', pmid: '', doi: '' },
    { id: 8, citation: 'Gubler DJ. The continuing spread of West Nile virus in the western hemisphere. Clin Infect Dis. 2007;45(7):1039-1046.', pmid: '', doi: '10.1086/521911' },
    { id: 9, citation: 'Figueiredo LT. The Brazilian approach to yellow fever surveillance. Mem Inst Oswaldo Cruz. 2019;114:e190024.', pmid: '31017461', doi: '10.1590/0074-02760190024' },
    { id: 10, citation: 'Possas C, et al. Yellow fever outbreak in Brazil: lessons and challenges for epidemic preparedness and response. PLoS Negl Trop Dis. 2020;14(4):e0008081.', pmid: '32271798', doi: '10.1371/journal.pntd.0008081' }
  ],
}