{
  id: 'doenca-renal-cronica',
  titulo: 'Rastreamento de Doença Renal Crônica',
  categoria: 'adultos',
  descricao: 'A Doença Renal Crônica (DRC) é definida como anormalidades na estrutura ou função renal por mais de três meses, com implicações na saúde [4,5]. A prevalência global é estimada em 9,1% a 13,4% em adultos [4]. No Brasil, a prevalência é de aproximadamente 10,2% na população adulta [5,6]. O rastreamento precoce visa identificar estágios iniciais para retardar a progressão [4,6,7].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para indivíduos com fatores de risco como diabetes mellitus, hipertensão arterial, doenças cardiovasculares, idade superior a 60 anos, história familiar de DRC, obesidade e tabagismo [6,7].',
      populacaoAlvo: 'Adultos maiores de 18 anos com fatores de risco cardiovascular ou renal; priorizar pacientes com diabetes e hipertensão [6,7].',
      periodicidade: 'Anual para grupos de alto risco; a cada 1-2 anos para populações de risco moderado [6,7].',
      metodos: ['Dosagem de creatinina sérica para cálculo de TFG', 'Relação albumina/creatinina na urina'],
      evidencia: 'IIa',
      referencias: [6, 7],
    },
    sociedadesMedicas: {
      indicacao: 'A KDIGO (2024) recomenda avaliação de TFG e albuminúria em adultos com fatores de risco, incluindo diabetes, hipertensão, idade >60 anos, histórico familiar e marcadores de risco cardiovascular [4]. A Sociedade Brasileira de Nefrologia (2022) endossa rastreamento similar para detecção precoce [5].',
      populacaoAlvo: 'Adultos com diabetes, hipertensão, idade ≥60 anos, doenças cardiovasculares, tabagismo, obesidade ou história familiar de DRC [4,5].',
      periodicidade: 'Anual em indivíduos de alto risco; a cada 1-3 anos em risco moderado [4,5].',
      metodos: ['Cálculo de TFG por creatinina sérica (equação CKD-EPI)', 'Medição de albuminúria (ACR em amostra isolada de urina)'],
      evidencia: 'Ia',
      referencias: [4, 5],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de DRC é de 9,1% a 13,4% em adultos, afetando cerca de 700 milhões de pessoas [4]. No Brasil, estima-se em 10,2% da população adulta [5,6].',
    incidencia: 'A incidência global é de aproximadamente 133 casos por milhão de habitantes por ano [4]. No Brasil, a incidência anual é de cerca de 120-150 por milhão [5].',
    mortalidade: 'A DRC contribui para 4,9 milhões de mortes globais em 2021, sendo a 9ª causa principal [4]. No Brasil, representa cerca de 5% das mortes por doenças crônicas não transmissíveis [6].',
    referencias: [4, 5, 6],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['2164-5', '33914-3', '30000-1', '9318-7', '32282-1'],
    atc: ['C09AA02', 'C09CA02', 'B03XA02'],
    ciap2: ['U90', 'U99'],
  },
  
  referencias: [
    { id: 1, citation: 'Moriatis A, et al. Guidelines on bone mineral disorder in chronic kidney disease--addendum chapter 2. Jornal brasileiro de nefrologia. 2012;34(2):215-20. DOI: 10.1590/s0101-28002012000200015', pmid: '22850924', doi: '10.1590/s0101-28002012000200015' },
    { id: 2, citation: 'Schvartsman BVS, et al. Brazilian Guidelines for bone and mineral disorders in CKD children. Jornal brasileiro de nefrologia. 2011;33(2):248-59. DOI: 10.1590/s0101-28002011000200021', pmid: '21789433', doi: '10.1590/s0101-28002011000200021' },
    { id: 3, citation: 'Schvartsman BVS, et al. Brazilian guidelines for bone and mineral disorders in CKD children. Jornal brasileiro de nefrologia. 2011;33(3):359-72.', pmid: '21655859', doi: '' },
    { id: 4, citation: 'Kidney Disease: Improving Global Outcomes (KDIGO) CKD Work Group. KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. Kidney International. 2024;105(4S):S117-S314.', pmid: '', doi: '' },
    { id: 5, citation: 'Sociedade Brasileira de Nefrologia. Diretrizes Brasileiras de Doença Renal Crônica. São Paulo: SBN; 2022.', pmid: '', doi: '' },
    { id: 6, citation: 'Ministério da Saúde (Brasil). Diretrizes Clínicas para o Cuidado ao paciente com Doença Renal Crônica – DRC no Sistema Único de Saúde. Brasília: Ministério da Saúde; 2014.', pmid: '', doi: '' },
    { id: 7, citation: 'Ministério da Saúde (Brasil). Protocolo Clínico - Doença Renal Crônica. Brasília: Ministério da Saúde; 2021.', pmid: '', doi: '' }
  ],
}