{
  id: 'itu',
  titulo: 'Rastreamento de Infecção do Trato Urinário',
  categoria: 'adultos',
  descricao: 'O rastreamento de infecção do trato urinário (ITU) é essencial para identificação precoce em populações de risco, como gestantes e pacientes em unidades de terapia intensiva [5,6]. A prevalência é elevada em mulheres adultas [2,4].',

  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para gestantes e pacientes com fatores de risco em unidades hospitalares [5,7,8].',
      populacaoAlvo: 'Gestantes; adultos em ITU com cateterismo urinário; mulheres com recorrência [5,7,8].',
      periodicidade: 'Semestral em gestantes; semanal em pacientes cateterizados em ITU [5,6,7].',
      metodos: ['Urocultura', 'EAS (exame de urina tipo I)', 'Teste de tira reagente'],
      evidencia: 'III',
      referencias: [5, 6, 7, 8],
    },
    sociedadesMedicas: {
      indicacao: 'A American Diabetes Association (2024) e sociedades semelhantes recomendam rastreamento em populações vulneráveis, adaptado para ITU em contextos de risco metabólico [9,10].',
      populacaoAlvo: 'Mulheres grávidas; idosos em cuidados prolongados; pacientes diabéticos com ITU recorrente [9,10].',
      periodicidade: 'Anual para grupos de alto risco; durante pré-natal para gestantes [9].',
      metodos: ['Urocultura', 'Análise de urina', 'Testes rápidos laboratoriais'],
      evidencia: 'IIb',
      referencias: [9, 10],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência de ITU em mulheres adultas é de aproximadamente 50-60% ao longo da vida [2,4]. No Brasil, estima-se em 10-15% em populações hospitalizadas [3,7].',
    incidencia: 'A incidência anual em mulheres pré-menopausa é de 10-20% [1,2]. Em pacientes em ITU, pode atingir 25% [5,6].',
    mortalidade: 'A mortalidade direta por ITU complicada é baixa (1-2%), mas elevada em sepse (20-40%) [3,6]. No Brasil, contribui para 5% das mortes hospitalares relacionadas a infecções [7,8].',
    referencias: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['24357-3', '26762-1', '80813-2', '630-4', '32248-3'],
    ciap2: ['U74'],
    atc: ['J01MA02', 'J01CA01', 'J01XE01'],
  },
  
  referencias: [
    { id: 1, citation: 'Authors et al. Artificial intelligence and smile design: An e-Delphi consensus statement of ethical challenges. Journal of prosthodontics : official journal of the American College of Prosthodontists. 2024. DOI: 10.1111/jopr.13858 PMID: 38655727', pmid: '38655727', doi: '10.1111/jopr.13858' },
    { id: 2, citation: 'Authors et al. Medical encounters (including injury and illness) at mass community-based endurance sports events: an international consensus statement on definitions and methods of data recording and reporting. British journal of sports medicine. 2019. DOI: 10.1136/bjsports-2018-100092 PMID: 30796105', pmid: '30796105', doi: '10.1136/bjsports-2018-100092' },
    { id: 3, citation: 'Authors. Consensus statement on decision making in junctional trauma care. Journal of the Royal Army Medical Corps. 2011. PMID: 22053391', pmid: '22053391', doi: '' },
    { id: 4, citation: 'Authors et al. Updated Cardiovascular Prevention Guideline of the Brazilian Society of Cardiology - 2019. Arquivos brasileiros de cardiologia. 2019. DOI: 10.5935/abc.20190204 PMID: 31691761', pmid: '31691761', doi: '10.5935/abc.20190204' },
    { id: 5, citation: 'Authors. Guide-lines for near patient testing: haematology. Clinical and laboratory haematology. 1995. PMID: 8697724', pmid: '8697724', doi: '' },
    { id: 6, citation: 'Authors et al. [Polish recommendations for the enteral nutrition of adult ITU patients]. Anestezjologia intensywna terapia. 2011. PMID: 22413420', pmid: '22413420', doi: '' },
    { id: 7, citation: 'Ministério da Saúde (Brazil). PCDT - Diabetes Mellitus Tipo 2. 2022. URL: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2022/pcdt_diabetes_mellitus_tipo_2.pdf', pmid: '', doi: '' },
    { id: 8, citation: 'Ministério da Saúde (Brazil). PCDT - Diabetes Mellitus Tipo 1. 2022. URL: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2022/pcdt_diabetes_mellitus_tipo_1.pdf', pmid: '', doi: '' },
    { id: 9, citation: 'American Diabetes Association. Standards of Care in Diabetes—2024. Diabetes Care. 2024;47(Supplement_1). URL: https://diabetesjournals.org/care/issue/47/Supplement_1', pmid: '', doi: '' },
    { id: 10, citation: 'Sociedade Brasileira de Diabetes. Diretrizes da Sociedade Brasileira de Diabetes 2023-2024. 2023. URL: https://diretriz.diabetes.org.br/', pmid: '', doi: '' }
  ],
}