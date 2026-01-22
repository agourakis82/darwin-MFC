{
  id: 'tuberculose-pulmonar',
  titulo: 'Rastreamento de Tuberculose Pulmonar',
  categoria: 'doenças infecciosas',
  descricao: 'O rastreamento de tuberculose pulmonar é essencial para detecção precoce em populações de risco, reduzindo a transmissão comunitária [1,2]. A doença afeta principalmente os pulmões e é causada por Mycobacterium tuberculosis [1]. No Brasil, representa uma prioridade em saúde pública devido à alta carga epidêmica [1,3].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento indicado para indivíduos com sintomas respiratórios persistentes (tosse >2 semanas), contatos domiciliares de casos confirmados, populações vulneráveis como prisioneiros, indígenas e pessoas vivendo com HIV [1].',
      populacaoAlvo: 'Adultos e crianças com suspeita clínica, contatos de casos, HIV+, diabéticos, desnutridos e populações em situação de vulnerabilidade social [1].',
      periodicidade: 'Investigação imediata em casos sintomáticos; rastreamento ativo anual em grupos de alto risco como prisões e comunidades indígenas [1].',
      metodos: ['Radiografia de tórax', 'Baciloscopia de escarro', 'Teste rápido molecular (TRM-TB)', 'Cultura de escarro'],
      evidencia: 'Ia',
      referencias: [1],
    },
    sociedadesMedicas: {
      indicacao: 'A Organização Mundial da Saúde (OMS) recomenda rastreamento sistemático para tuberculose ativa em populações de alto risco, incluindo contatos, HIV+ e diabéticos [2]. A American Thoracic Society (ATS)/IDSA (2020) endossa investigação em sintomáticos e grupos vulneráveis [4].',
      populacaoAlvo: 'Indivíduos com sintomas como tosse crônica, hemoptise, febre; contatos próximos, imunossuprimidos e populações em áreas endêmicas [2,4].',
      periodicidade: 'Rastreamento contínuo em contextos de alta prevalência; anual para grupos de risco persistente [2].',
      metodos: ['Radiografia de tórax', 'Microscopia de escarro para BAAR', 'Xpert MTB/RIF', 'Cultura microbiológica'],
      evidencia: 'Ia',
      referencias: [2, 4],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de tuberculose ativa é estimada em 1.000 casos por 100.000 habitantes, com foco em pulmonar representando 85% dos casos [3]. No Brasil, a prevalência é de aproximadamente 50 casos por 100.000 habitantes [1,5].',
    incidencia: 'A incidência global é de 134 novos casos por 100.000 habitantes em 2022 [3]. No Brasil, a incidência de tuberculose pulmonar é de 33 casos por 100.000 habitantes [1,5].',
    mortalidade: 'Globalmente, a tuberculose causou 1,3 milhão de mortes em 2022 [3]. No Brasil, a mortalidade é de cerca de 2,5 mortes por 100.000 habitantes [1,5].',
    referencias: [1, 3, 5],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['180-2', '6465-0', '4955-7', '791-5', '53926-7'],
    ciap2: ['A78'],
    atc: ['J04AB02', 'J04AC01', 'J04AD03', 'J04AK02', 'J04AM02'],
  },
  
  referencias: [
    { id: 1, citation: 'Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral aos Pacientes com Tuberculose. Brasília: Ministério da Saúde; 2022. Disponível em: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/t/tuberculose', pmid: '', doi: '' },
    { id: 2, citation: 'World Health Organization. WHO consolidated guidelines on tuberculosis: module 2: screening – systematic screening for active tuberculosis: policy summary. Geneva: WHO; 2021. PMID: 34919334', pmid: '34919334', doi: '10.1016/S1473-3099(21)00675-3' },
    { id: 3, citation: 'World Health Organization. Global tuberculosis report 2023. Geneva: WHO; 2023.', pmid: '', doi: '' },
    { id: 4, citation: 'Nahid P, Dorman SE, Alipanah N, et al. Official American Thoracic Society/Centers for Disease Control and Prevention/Infectious Diseases Society of America Clinical Practice Guidelines: Treatment of Drug-Susceptible Tuberculosis. Clin Infect Dis. 2016;63(7):e147-e195. PMID: 27595215', pmid: '27595215', doi: '10.1093/cid/ciw376' },
    { id: 5, citation: 'Pan American Health Organization. Tuberculosis in the Americas: Regional Report 2022. Washington, DC: PAHO; 2023.', pmid: '', doi: '' }
  ],
}