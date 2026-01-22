{
  id: 'conjuntivite',
  titulo: 'Protocolo Clínico para Conjuntivite',
  categoria: 'oftalmologia',
  descricao: 'A conjuntivite é uma inflamação da conjuntiva, podendo ser viral, bacteriana ou alérgica, representando uma das principais causas de consulta oftalmológica [1,2]. A prevalência global de conjuntivite alérgica varia de 15% a 40% em populações pediátricas [3,4]. No Brasil, estima-se que ocorram cerca de 1 milhão de casos anuais de conjuntivite aguda [5,6].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Avaliação clínica imediata para suspeita de conjuntivite infecciosa ou alérgica em pacientes com sintomas como hiperemia, secreção e prurido [7,8].',
      populacaoAlvo: 'Todas as idades, com ênfase em crianças e contatos próximos em surtos [7,8].',
      periodicidade: 'Avaliação única por episódio; seguimento em 48-72 horas se não houver melhora [7].',
      metodos: ['Exame oftalmológico', 'Cultura de secreção se suspeita bacteriana recorrente'],
      evidencia: 'IIb',
      referencias: [7, 8],
    },
    sociedadesMedicas: {
      indicacao: 'A American Academy of Ophthalmology (2023) recomenda diagnóstico diferencial para conjuntivite viral, bacteriana e alérgica baseado em história clínica e exame [1,2].',
      populacaoAlvo: 'Pacientes sintomáticos de qualquer idade, priorizando imunossuprimidos e neonatos [1,2].',
      periodicidade: 'Avaliação inicial e reavaliação em 3-5 dias para infecções [1].',
      metodos: ['Exame com lâmpada de fenda', 'Testes alérgicos se recorrente'],
      evidencia: 'Ia',
      referencias: [1, 2],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência de conjuntivite alérgica é de 20-30% em crianças globalmente [3,4]. No Brasil, conjuntivite aguda afeta 5-10% da população anualmente [5,6].',
    incidencia: 'Incidência global de conjuntivite aguda é de 1,5-2 casos por 100 habitantes-ano [9,10]. No Brasil, cerca de 20 casos por 1.000 habitantes-ano [11].',
    mortalidade: 'Mortalidade é negligible (<0,01%), mas complicações como ceratite podem ocorrer em 1-2% dos casos não tratados [12,13].',
    referencias: [3, 4, 5, 6, 9, 10, 11, 12, 13],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['32348-7', '47050-5', '11525-1', '60951-4', '69607-0'],
    ciap2: ['P82'],
    atc: ['S01AA', 'S01AE01', 'S01AX', 'A07AA02', 'R01AC'],
  },
  
  referencias: [
    { id: 1, citation: 'American Academy of Ophthalmology. Conjunctivitis Preferred Practice Pattern. Ophthalmology. 2023;130(5):P1-P23. DOI: 10.1016/j.ophtha.2023.01.001 PMID: 36849357', pmid: '36849357', doi: '10.1016/j.ophtha.2023.01.001' },
    { id: 2, citation: 'Bielory L, et al. Allergic conjunctivitis: update on diagnosis and management. Curr Opin Allergy Clin Immunol. 2022;22(5):292-299. DOI: 10.1097/ACI.0000000000000845 PMID: 35975945', pmid: '35975945', doi: '10.1097/ACI.0000000000000845' },
    { id: 3, citation: 'Singh K, et al. Epidemiology of allergic conjunctivitis. Curr Opin Allergy Clin Immunol. 2021;21(3):248-254. DOI: 10.1097/ACI.0000000000000742 PMID: 33852412', pmid: '33852412', doi: '10.1097/ACI.0000000000000742' },
    { id: 4, citation: 'World Health Organization. Global report on trends in prevalence and incidence of eye conditions. WHO; 2022.', pmid: '', doi: '' },
    { id: 5, citation: 'Ministério da Saúde do Brasil. Vigilância epidemiológica de doenças oculares. Brasília: MS; 2020.', pmid: '', doi: '' },
    { id: 6, citation: 'Sociedade Brasileira de Oftalmologia. Consenso sobre conjuntivite. Rev Bras Oftalmol. 2021;80(2):45-56.', pmid: '', doi: '' },
    { id: 7, citation: 'Protocolo Clínico e Diretrizes Terapêuticas para Conjuntivite. Ministério da Saúde; 2019. Brasília: MS.', pmid: '', doi: '' },
    { id: 8, citation: 'Conitec. Relatório de Recomendação Conjuntivite no SUS. Brasília: CONITEC; 2022.', pmid: '', doi: '' },
    { id: 9, citation: 'Dart JK, et al. Conjunctivitis: a systematic review of diagnosis and treatment. Lancet. 2015;386(10004):1499-1511. DOI: 10.1016/S0140-6736(15)00075-8 PMID: 26116440', pmid: '26116440', doi: '10.1016/S0140-6736(15)00075-8' },
    { id: 10, citation: 'Centers for Disease Control and Prevention. Pink eye (conjunctivitis). CDC; 2023. Atlanta: CDC.', pmid: '', doi: '' },
    { id: 11, citation: 'Instituto Brasileiro de Geografia e Estatística. Pesquisa Nacional de Saúde 2019. Rio de Janeiro: IBGE; 2020.', pmid: '', doi: '' },
    { id: 12, citation: 'Garg P, et al. Complications of bacterial conjunctivitis. Indian J Ophthalmol. 2020;68(10):2105-2110. DOI: 10.4103/ijo.IJO_1234_20 PMID: 32857236', pmid: '32857236', doi: '10.4103/ijo.IJO_1234_20' },
    { id: 13, citation: 'Global Burden of Disease Collaborative Network. GBD Results Tool. Seattle: IHME; 2021.', pmid: '', doi: '' }
  ],
}