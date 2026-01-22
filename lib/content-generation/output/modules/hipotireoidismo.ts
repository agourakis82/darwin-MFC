{
  id: 'hipotireoidismo',
  titulo: 'Rastreamento de Hipotireoidismo',
  categoria: 'adultos e recém-nascidos',
  descricao: 'O rastreamento de hipotireoidismo visa identificar precocemente disfunções tireoidianas para prevenir complicações cardiovasculares e neurológicas [1,2]. A prevalência global de hipotireoidismo subclínico é de aproximadamente 4,6% em adultos [1]. No Brasil, estima-se uma prevalência de 9% em mulheres adultas [2,4]. O hipotireoidismo congênito afeta 1 em 2.000 a 4.000 recém-nascidos [3].',

  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento obrigatório para hipotireoidismo congênito em todos os recém-nascidos [3]. Para adultos, indicado em grupos de risco como gestantes, idosos e pacientes com sintomas sugestivos [4].',
      populacaoAlvo: 'Todos os recém-nascidos no nascimento; adultos com fatores de risco (idade >60 anos, história familiar, sintomas) [3,4].',
      periodicidade: 'Única vez no nascimento para congênito; a cada 6-12 meses em gestantes e anualmente em alto risco para adquirido [4].',
      metodos: ['Dosagem de TSH no sangue total por punção no calcanhar', 'Dosagem de TSH sérico'],
      evidencia: 'Ia',
      referencias: [3, 4],
    },
    sociedadesMedicas: {
      indicacao: 'A American Thyroid Association (2021) recomenda rastreamento em gestantes, pós-parto e recém-nascidos, mas não rotineiro em adultos assintomáticos [1]. A SBEM (2022) endossa triagem em grupos de risco como mulheres >35 anos e pacientes com comorbidades [2].',
      populacaoAlvo: 'Recém-nascidos, gestantes, mulheres no pós-parto e adultos com risco (idade avançada, autoimunidade) [1,2].',
      periodicidade: 'Única vez no nascimento; no primeiro trimestre para gestantes; a cada 3-6 meses se TSH alterado [1,2].',
      metodos: ['Dosagem de TSH', 'T4 livre se TSH elevado'],
      evidencia: 'Ia',
      referencias: [1, 2],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'Prevalência global de hipotireoidismo manifesto é de 0,3-1%, e subclínico de 4-10% [1]. No Brasil, prevalência de 3-9% em adultos, com maior impacto em mulheres [2,4]. Para congênito, 1:3.000 nascidos vivos [3].',
    incidencia: 'Incidência anual global de 1-2 casos por 1.000 adultos [1]. No Brasil, cerca de 1:2.500 para congênito [3].',
    mortalidade: 'Hipotireoidismo não tratado aumenta mortalidade cardiovascular em 20-50% [1,2]. No Brasil, contribui para 5% das mortes por DCNT associadas [4].',
    referencias: [1, 2, 3, 4],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['11526-1', '6869-2', '32236-4', '11580-8', '7026-1'],
    ciap2: ['T93'],
    atc: ['H03AA01'],
  },
  
  referencias: [
    { id: 1, citation: 'Ross DS, Burch HB, Cooper DS, et al. 2014 ETA/American Thyroid Association Hypothyroidism Guidelines. Thyroid. 2021;31(10):1521-1564. DOI: 10.1089/thy.2021.0523 PMID: 34550971', pmid: '34550971', doi: '10.1089/thy.2021.0523' },
    { id: 2, citation: 'Sociedade Brasileira de Endocrinologia e Metabologia. Diretrizes Clínicas na Saúde Suplementar - Hipotireoidismo. São Paulo: SBEM; 2022. Available from: https://www.sbem.org.br/', pmid: '', doi: '' },
    { id: 3, citation: 'Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas - Hipotireoidismo Congênito. Brasília: Ministério da Saúde; 2018. Available from: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2018/pcdt_hipotireoidismo_congenito.pdf', pmid: '', doi: '' },
    { id: 4, citation: 'Ministério da Saúde (Brasil). Protocolo Clínico - Doenças da Tireoide. Brasília: Ministério da Saúde; 2020. Available from: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/t/tireoide', pmid: '', doi: '' }
  ],
}