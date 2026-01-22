{
  id: 'angina-estavel',
  titulo: 'Angina Estável',
  categoria: 'cardiovascular',
  descricao: 'A angina estável representa uma manifestação de doença arterial coronariana crônica, caracterizada por episódios de dor torácica desencadeados por esforço e aliviados pelo repouso ou nitroglicerina [1,2]. É uma condição prevalente em adultos com fatores de risco cardiovascular, demandando protocolos de avaliação e manejo para prevenção de eventos adversos [3,4].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Avaliação recomendada para pacientes com dor torácica atípica ou típica sugestiva de isquemia, especialmente em indivíduos com fatores de risco como hipertensão, diabetes ou tabagismo [3,4].',
      populacaoAlvo: 'Adultos acima de 40 anos com sintomas torácicos e fatores de risco cardiovascular; pacientes assintomáticos de alto risco para estratificação [3,4].',
      periodicidade: 'Avaliação inicial imediata para sintomas; follow-up anual em pacientes estáveis com terapia otimizada [3].',
      metodos: ['Eletrocardiograma de repouso', 'Teste ergométrico', 'Ecocardiograma de estresse'],
      evidencia: 'Ia',
      referencias: [3, 4],
    },
    sociedadesMedicas: {
      indicacao: 'A European Society of Cardiology (ESC 2019) e American Heart Association (AHA/ACC 2021) recomendam avaliação não invasiva para suspeita de angina estável em pacientes sintomáticos [1,2].',
      populacaoAlvo: 'Adultos com dor torácica de início recente ou progressiva, independentemente de idade, com ênfase em populações de risco elevado [1,2].',
      periodicidade: 'Reavaliação a cada 6-12 meses em pacientes com angina estável controlada; mais frequente se instabilidade [1].',
      metodos: ['Teste de esforço com imagem', 'Angiografia por TC coronária', 'Ressonância magnética cardíaca'],
      evidencia: 'Ia',
      referencias: [1, 2],
    },
    convergencia: 'As recomendações SUS e das sociedades médicas mostram convergência na indicação para pacientes sintomáticos de risco, com métodos diagnósticos complementares, embora haja ênfase maior em testes avançados pelas sociedades internacionais [1,2,3,4].',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de angina estável é estimada em 2-4% em adultos acima de 40 anos, com variação por gênero e região [5,6]. No Brasil, a prevalência em populações urbanas é de aproximadamente 3,2% em indivíduos acima de 45 anos [7].',
    incidencia: 'A incidência anual de angina estável varia de 1 a 2 casos por 1.000 habitantes em populações de médio risco, elevando-se para 10 por 1.000 em grupos de alto risco [8]. No Brasil, estima-se 150-200 novos casos por 100.000 habitantes-ano [9].',
    mortalidade: 'A doença arterial coronariana, incluindo angina estável, contribui para cerca de 9 milhões de mortes globais anualmente, representando 16% das mortes totais [5,6]. No Brasil, é a principal causa de mortalidade cardiovascular, com 400.000 óbitos por ano [7,10].',
    referencias: [5, 6, 7, 8, 9, 10],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['1988-6', '2157-7', '48050-7', '6768-6', '30522-7'],
    atc: ['C01DA02', 'C08CA05', 'B01AC06', 'C07AA05', 'C10AA01'],
    ciap2: ['K82', 'K83', 'K84'],
  },
  
  referencias: [
    { id: 1, citation: 'Knuuti J, Wijns W, Saraste A, et al. 2019 ESC Guidelines for the diagnosis and management of chronic coronary syndromes. Eur Heart J. 2020;41(3):407-477. DOI: 10.1093/eurheartj/ehz425 PMID: 31504439', pmid: '31504439', doi: '10.1093/eurheartj/ehz425' },
    { id: 2, citation: 'Writing Committee Members. 2021 AHA/ACC/ASE/CHEST/SAEM/SCCT/SCMR Guideline for the Evaluation and Diagnosis of Chest Pain. Circulation. 2021;144(22):e368-e454. DOI: 10.1161/CIR.0000000000001029 PMID: 34748368', pmid: '34748368', doi: '10.1161/CIR.0000000000001029' },
    { id: 3, citation: 'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Doença Arterial Coronariana. Brasília: Secretaria de Atenção à Saúde; 2018.', pmid: '', doi: '' },
    { id: 4, citation: 'Sociedade Brasileira de Cardiologia. Diretrizes Brasileiras de Doenças Coronarianas Crônicas - 2020. Arq Bras Cardiol. 2020;115(5):965-1073. DOI: 10.36660/abc.20201238 PMID: 33295452', pmid: '33295452', doi: '10.36660/abc.20201238' },
    { id: 5, citation: 'Roth GA, Mensah GA, Johnson CO, et al. Global Burden of Cardiovascular Diseases and Risk Factors, 1990-2019: Update From the GBD 2019 Study. J Am Coll Cardiol. 2020;76(25):2982-3021. DOI: 10.1016/j.jacc.2020.11.010 PMID: 33309175', pmid: '33309175', doi: '10.1016/j.jacc.2020.11.010' },
    { id: 6, citation: 'GBD 2019 Diseases and Injuries Collaborators. Global burden of 369 diseases and injuries in 204 countries and territories, 1990-2019: a systematic analysis for the Global Burden of Disease Study 2019. Lancet. 2020;396(10258):1204-1222. DOI: 10.1016/S0140-6736(20)30925-9 PMID: 33069326', pmid: '33069326', doi: '10.1016/S0140-6736(20)30925-9' },
    { id: 7, citation: 'Instituto Brasileiro de Geografia e Estatística. Pesquisa Nacional de Saúde 2019. Rio de Janeiro: IBGE; 2020.', pmid: '', doi: '' },
    { id: 8, citation: 'Anderson KM, Odell PM, Wilson PW, Kannel WB. Cardiovascular disease risk profiles. Am Heart J. 1991;121(3 Pt 2):757-769. DOI: 10.1016/0002-8703(91)90979-5 PMID: 2006656', pmid: '2006656', doi: '10.1016/0002-8703(91)90979-5' },
    { id: 9, citation: 'Schmidt MI, Duncan BB, Mill JG, et al. Cohort Profile: Longitudinal Study of Adult Health (ELSA-Brasil). Int J Epidemiol. 2015;44(1):68-75. DOI: 10.1093/ije/dyu027 PMID: 24585772', pmid: '24585772', doi: '10.1093/ije/dyu027' },
    { id: 10, citation: 'Ministério da Saúde. Datasus - Mortalidade. Brasília: Secretaria de Vigilância em Saúde; 2022.', pmid: '', doi: '' }
  ],
}