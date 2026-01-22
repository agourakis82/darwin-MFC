{
  id: 'doenca-arterial-coronariana',
  titulo: 'Rastreamento de Doença Arterial Coronariana',
  categoria: 'cardiovasculares',
  descricao: 'A doença arterial coronariana (DAC) representa a principal causa de morbimortalidade cardiovascular global, caracterizada por aterosclerose das artérias coronárias [1]. A prevalência global é estimada em 7,2% em adultos [2,3]. No Brasil, afeta cerca de 5-7% da população adulta [1,4].',

  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para avaliação de risco cardiovascular em adultos com fatores de risco como hipertensão, diabetes ou tabagismo [4,5].',
      populacaoAlvo: 'Adultos ≥40 anos ou <40 anos com múltiplos fatores de risco [4,5].',
      periodicidade: 'A cada 5 anos para baixo risco; anual para alto risco [5].',
      metodos: ['Escala de risco SCORE', 'Perfil lipídico', 'Eletrocardiograma'],
      evidencia: 'IIa',
      referencias: [4, 5],
    },
    sociedadesMedicas: {
      indicacao: 'A European Society of Cardiology (ESC 2019) e American Heart Association (AHA 2019) recomendam rastreamento em indivíduos com risco intermediário ou alto [6,7].',
      populacaoAlvo: 'Adultos ≥40 anos sem sintomas, ou mais precocemente com fatores de risco [6,7].',
      periodicidade: 'A cada 4-6 anos para risco baixo; mais frequente para risco elevado [6].',
      metodos: ['Escala de risco Framingham ou SCORE', 'Teste de esforço', 'Tomografia coronariana'],
      evidencia: 'Ia',
      referencias: [6, 7],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'Prevalência global de DAC é de 7,2% em adultos (126 milhões) [2,3]. No Brasil, prevalência é de 6,3% em indivíduos ≥18 anos [1,4].',
    incidencia: 'Incidência global varia de 2-4 casos por 1.000 pessoas-ano [2,8]. No Brasil, incidência anual é de 1,5-2,5 por 1.000 habitantes [4,9].',
    mortalidade: 'DAC causa 9 milhões de mortes anuais globalmente, representando 16% das mortes totais [2,3]. No Brasil, é a principal causa de morte cardiovascular, com 100.000 óbitos/ano [1,4].',
    referencias: [1, 2, 3, 4, 8, 9],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['2085-9', '2093-3', '2571-8', '1916-6', '13457-7'],
    ciap2: ['K74'],
    atc: ['C10AA01', 'B01AC06', 'C07AA05'],
  },
  
  referencias: [
    { id: 1, citation: 'Doença arterial coronariana. Arquivos brasileiros de cardiologia. 2009;93(6 Suppl 2):e126-e145. PMID: 20657993', pmid: '20657993', doi: '' },
    { id: 2, citation: 'Roth GA, Mensah GA, Johnson CO, et al. Global Burden of Cardiovascular Diseases and Risk Factors, 1990-2019: Update From the GBD 2019 Study. J Am Coll Cardiol. 2020;76(25):2982-3021. DOI: 10.1016/j.jacc.2020.11.010 PMID: 33309175', pmid: '33309175', doi: '10.1016/j.jacc.2020.11.010' },
    { id: 3, citation: 'World Health Organization. Cardiovascular diseases (CVDs). WHO; 2021.', pmid: '', doi: '' },
    { id: 4, citation: 'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Doença Arterial Coronariana. Brasília: MS; 2017.', pmid: '', doi: '' },
    { id: 5, citation: 'CONITEC. Relatório de Recomendação: Rastreamento de Doenças Cardiovasculares. Brasília: Ministério da Saúde; 2020.', pmid: '', doi: '' },
    { id: 6, citation: 'Piepoli MF, Hoes AW, Agewall S, et al. 2016 European Guidelines on cardiovascular disease prevention in clinical practice. Eur Heart J. 2016;37(29):2315-2381. DOI: 10.1093/eurheartj/ehw106 PMID: 27222591', pmid: '27222591', doi: '10.1093/eurheartj/ehw106' },
    { id: 7, citation: 'Arnett DK, Blumenthal RS, Albert MA, et al. 2019 ACC/AHA Guideline on the Primary Prevention of Cardiovascular Disease. Circulation. 2019;140(11):e596-e646. DOI: 10.1161/CIR.0000000000000678 PMID: 30879355', pmid: '30879355', doi: '10.1161/CIR.0000000000000678' },
    { id: 8, citation: 'Yusuf S, Hawken S, Ounpuu S, et al. Effect of potentially modifiable risk factors associated with myocardial infarction in 52 countries (the INTERHEART study): case-control study. Lancet. 2004;364(9438):937-952. DOI: 10.1016/S0140-6736(04)17018-9 PMID: 15364185', pmid: '15364185', doi: '10.1016/S0140-6736(04)17018-9' },
    { id: 9, citation: 'Instituto Brasileiro de Geografia e Estatística. Mortalidade por Doenças Cardiovasculares no Brasil. IBGE; 2022.', pmid: '', doi: '' }
  ],
}