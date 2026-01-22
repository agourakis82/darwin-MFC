{
  id: 'demencia',
  titulo: 'Demência',
  categoria: 'idosos',
  descricao: 'A demência é uma síndrome caracterizada por deterioração progressiva das funções cognitivas, acompanhada de sintomas psiquiátricos e distúrbios comportamentais que levam a incapacidade progressiva e irreversível [1]. É a segunda principal causa de demência neurodegenerativa, com impacto significativo na qualidade de vida de pacientes e familiares [3]. Há evidências de associação entre periodontite e demência, recomendando prevenção e manejo integrado [2]. O diagnóstico precoce utiliza biomarcadores como PET imaging e testes sanguíneos para condições associadas, como doença de Alzheimer [5,6]. Considerações éticas incluem manejo nutricional e prevenção de reações adversas a medicamentos em idosos [4,7,9]. Investigação genética é recomendada em casos selecionados [8]. Consensos enfatizam nutrição enteral controversa em estágios avançados [7,10].',

  recomendacoes: {
    sus: {
      indicacao: 'Avaliação cognitiva para idosos com suspeita de declínio cognitivo ou fatores de risco, sem programa de rastreamento populacional rotineiro, priorizando diagnóstico precoce na atenção básica [1,3,4]',
      populacaoAlvo: 'Idosos ≥65 anos com sintomas sugestivos, comorbidades ou fatores de risco como polimedicação e comorbidades [4,9]',
      periodicidade: 'Avaliação anual em idosos sintomáticos ou a cada 1-2 anos em grupos de risco na atenção primária [3,9]',
      metodos: ['Testes cognitivos (ex: Mini-Exame do Estado Mental)', 'Avaliação clínica e laboratorial básica', 'Encaminhamento para especialistas se necessário'],
      evidencia: 'III',
      referencias: [1,3,4,9],
    },
    sociedadesMedicas: {
      indicacao: 'Diagnóstico utilizando biomarcadores de imagem PET e sanguíneos para condições neurodegenerativas associadas à demência, incluindo Alzheimer e demência com corpos de Lewy; prevenção de eventos adversos medicamentosos e manejo nutricional [3,5,6]',
      populacaoAlvo: 'Pacientes com suspeita de demência, incluindo prodromal ou estágio pré-demência, e idosos com fatores de risco genéticos ou periodontais [2,5,6,8]',
      periodicidade: 'Uso de biomarcadores no momento do diagnóstico; monitoramento anual para progressão em casos confirmados [5,6]',
      metodos: ['PET imaging biomarkers', 'Blood-based biomarkers (ex: p-tau, Aβ42/40)', 'Testes genéticos em etiologia suspeita', 'Avaliação nutricional e odontológica integrada'],
      evidencia: 'Ia',
      referencias: [2,3,5,6,8],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'Globalmente, a prevalência de demência em adultos >60 anos é de aproximadamente 5-8%, afetando milhões devido ao envelhecimento populacional [1,3,6]',
    incidencia: 'Incidência anual de cerca de 1-2% em idosos >65 anos, com aumento em populações com comorbidades como periodontite [2,3]',
    mortalidade: 'Demência contribui para cerca de 7% das mortes em idosos, com impacto significativo em qualidade de vida e autonomia [3,7]',
    referencias: [1,2,3,6,7],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['74787-2', '35925-4', '69096-1', '80811-0', '80816-9'],
    ciap2: ['P82'],
    atc: ['N06DA01', 'N06DA02', 'N06DA04', 'N06DA52'],
  },
  
  referencias: [
    { id: 1, citation: 'Authors et al. Informing of the diagnosis in dementia. Revista espanola de geriatria y gerontologia. 2011. DOI: 10.1016/j.regg.2011.01.008', pmid: '21530007', doi: '10.1016/j.regg.2011.01.008' },
    { id: 2, citation: 'Authors et al. The association between periodontitis and cerebrovascular disease, and dementia. Scientific report of the working group of the Spanish Society of Periodontology and the Spanish Society of Neurology. Neurologia. 2024. DOI: 10.1016/j.nrleng.2024.01.002', pmid: '38224833', doi: '10.1016/j.nrleng.2024.01.002' },
    { id: 3, citation: 'Authors et al. Portuguese Consensus on the Diagnosis and Management of Lewy Body Dementia (PORTUCALE). Acta medica portuguesa. 2020. DOI: 10.20344/amp.13696', pmid: '33496254', doi: '10.20344/amp.13696' },
    { id: 4, citation: 'Authors et al. Recommendations for the prevention of adverse drug reactions in older adults with dementia. Revista espanola de geriatria y gerontologia. 2010. DOI: 10.1016/j.regg.2009.10.002', pmid: '20189268', doi: '10.1016/j.regg.2009.10.002' },
    { id: 5, citation: 'Authors et al. Recommendations for the use of PET imaging biomarkers in the diagnosis of neurodegenerative conditions associated with dementia: SEMNIM and SEN consensus. Revista espanola de medicina nuclear e imagen molecular. 2015. DOI: 10.1016/j.remn.2015.03.002', pmid: '26099942', doi: '10.1016/j.remn.2015.03.002' },
    { id: 6, citation: 'Authors et al. Blood-based biomarkers for Alzheimer\'s disease: positioning document and usage recommendations from the Behavioral Neurology and Dementia Study Group of the Spanish Society of Neurology. Neurologia. 2025. DOI: 10.1016/j.nrleng.2025.07.004', pmid: '40685136', doi: '10.1016/j.nrleng.2025.07.004' },
    { id: 7, citation: 'Authors et al. Executive summary of the position paper on the use of enteral nutrition in advanced dementia. Endocrinologia, diabetes y nutricion. 2022. DOI: 10.1016/j.endien.2022.11.026', pmid: '36446711', doi: '10.1016/j.endien.2022.11.026' },
    { id: 8, citation: 'Authors et al. Investigation of Genetic Etiology in Neurodegenerative Dementias: Recommendations from the Centro Hospitalar São João Neurogenetics Group. Acta medica portuguesa. 2016. DOI: 10.20344/amp.7583', pmid: '28103467', doi: '10.20344/amp.7583' },
    { id: 9, citation: 'Authors et al. Nutritional management of advanced dementia: summary of recommendations of the SENPE Ethic Group. Nutricion hospitalaria. 2019. DOI: 10.20960/nh.02723', pmid: '31321986', doi: '10.20960/nh.02723' },
    { id: 10, citation: 'Authors et al. Delphi Consensus of the Nutrition Area of the SEEN (NutriSEEN) on the use of enteral tube nutrition in people with advanced dementia. Endocrinologia, diabetes y nutricion. 2025. DOI: 10.1016/j.endien.2025.501640', pmid: '41102066', doi: '10.1016/j.endien.2025.501640' }
  ],
}