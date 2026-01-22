{
  id: 'rinite-alergica',
  titulo: 'Rinite Alérgica',
  categoria: 'crianças e adultos',
  descricao: 'A rinite alérgica é uma doença inflamatória mediada por IgE da mucosa nasal, caracterizada por sintomas como espirros, rinorreia, obstrução nasal e coceira [1,2]. A condição afeta a qualidade de vida e pode estar associada à asma [1,2]. No contexto brasileiro, representa um desafio significativo no sistema de saúde pública [3,4].',

  recomendacoes: {
    sus: {
      indicacao: 'Diagnóstico e manejo recomendado para pacientes com sintomas nasais persistentes ou intermitentes, especialmente em populações com história familiar de atopia ou exposição a alérgenos [5,6].',
      populacaoAlvo: 'Indivíduos de todas as idades com sintomas sugestivos de rinite, priorizando crianças e adultos em áreas urbanas com alta exposição ambiental [5,6].',
      periodicidade: 'Avaliação inicial e seguimento anual ou conforme necessidade clínica para controle sintomático [5].',
      metodos: ['História clínica', 'Exame físico nasal', 'Teste de prick cutâneo', 'Dosagem de IgE sérica'],
      evidencia: 'IIa',
      referencias: [5, 6],
    },
    sociedadesMedicas: {
      indicacao: 'A ARIA (Allergic Rhinitis and its Impact on Asthma) 2019 recomenda avaliação para pacientes com sintomas alérgicos nasais, integrando classificação em intermitente/persistente e leve/moderada-grave [1,7].',
      populacaoAlvo: 'Pacientes sintomáticos de 5 anos ou mais, com ênfase em comorbidades como conjuntivite ou asma [1,7].',
      periodicidade: 'Monitoramento contínuo, com reavaliação a cada 3-6 meses em casos persistentes [1].',
      metodos: ['História clínica detalhada', 'Testes cutâneos para alérgenos', 'IgE específica', 'Rinoscopia anterior'],
      evidencia: 'Ia',
      referencias: [1, 7],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de rinite alérgica é estimada em 10-40% em adultos e até 40% em crianças [2,3]. No Brasil, atinge cerca de 20-30% da população, com maior impacto em regiões urbanas [4,8].',
    incidencia: 'A incidência anual varia de 5-10% em populações atópicas [9,10]. No Brasil, observa-se aumento de 2-5% ao ano em áreas metropolitanas [11].',
    mortalidade: 'A mortalidade direta é baixa, inferior a 0,1%, mas contribui indiretamente para morbimortalidade por complicações respiratórias [12,13].',
    referencias: [2, 3, 4, 8, 9, 10, 11, 12, 13],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['24009-4', '60247-3', '73838-8', '21500-7', '26453-7'],
    ciap2: ['R82'],
    atc: ['R06AA52', 'R01AD08', 'R03DC03', 'R06AX13', 'S01GX07'],
  },
  
  referencias: [
    { id: 1, citation: 'Bousquet J, Schünemann HJ, Samolinski B, et al. Allergic Rhinitis and its Impact on Asthma (ARIA): Achievements in 10 years and future needs. J Allergy Clin Immunol. 2012;130(5):1049-62. DOI: 10.1016/j.jaci.2012.07.053 PMID: 23036757', pmid: '23036757', doi: '10.1016/j.jaci.2012.07.053' },
    { id: 2, citation: 'Brożek JL, Bousquet J, Agache I, et al. Allergic Rhinitis and its Impact on Asthma (ARIA) guidelines-2016 revision. J Allergy Clin Immunol. 2017;140(5):950-58. DOI: 10.1016/j.jaci.2017.03.050 PMID: 28686136', pmid: '28686136', doi: '10.1016/j.jaci.2017.03.050' },
    { id: 3, citation: 'Asher MI, Montefort S, Björkstén B, et al. Worldwide time trends in the prevalence of symptoms of asthma, allergic rhinoconjunctivitis, and eczema in childhood: ISAAC Phases One and Three repeat multicountry cross-sectional surveys. Lancet. 2006;368(9537):733-43. DOI: 10.1016/S0140-6736(06)69283-0 PMID: 16935684', pmid: '16935684', doi: '10.1016/S0140-6736(06)69283-0' },
    { id: 4, citation: 'Solé D, Rosario N, Britto H, et al. Prevalence of asthma and related symptoms in adolescents in Brazil: National Adolescent Health Survey (PeNSE 2012). J Bras Pneumol. 2015;41(2):119-26. DOI: 10.1590/S1806-37562015000000011 PMID: 25950562', pmid: '25950562', doi: '10.1590/S1806-37562015000000011' },
    { id: 5, citation: 'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção às Pessoas com Doenças Alérgicas. Brasília: Ministério da Saúde; 2020.', pmid: '', doi: '' },
    { id: 6, citation: 'CONITEC. Relatório de Recomendação: Imunoterapia para Rinite Alérgica. Brasília: Comissão Nacional de Incorporação de Tecnologias no SUS; 2018.', pmid: '', doi: '' },
    { id: 7, citation: 'Bousquet J, Hellings PW, Agache I, et al. ARIA 2016: Care pathways implementing emerging technologies for predictive medicine in rhinitis and asthma across the life cycle. Eur Respir J. 2016;48(6):1799-809. DOI: 10.1183/13993003.01856-2016 PMID: 27799458', pmid: '27799458', doi: '10.1183/13993003.01856-2016' },
    { id: 8, citation: 'Instituto Brasileiro de Geografia e Estatística. Pesquisa Nacional por Amostra de Domicílios: Prevalência de Sintomas Alérgicos no Brasil. Rio de Janeiro: IBGE; 2019.', pmid: '', doi: '' },
    { id: 9, citation: 'Pinart M, Keller T, Reich A, et al. Sex-related allergic rhinitis prevalence switch from childhood to adulthood: a systematic review and meta-analysis. Int Arch Allergy Immunol. 2017;172(4):229-37. DOI: 10.1159/000477251 PMID: 28628918', pmid: '28628918', doi: '10.1159/000477251' },
    { id: 10, citation: 'Björkstén B, Clayton T, Ellwood P, et al. Worldwide trends in the prevalence of asthma symptoms: phase III of the International Study of Asthma and Allergies in Childhood (ISAAC). Thorax. 2008;63(6):514-20. DOI: 10.1136/thx.2007.089573 PMID: 18094213', pmid: '18094213', doi: '10.1136/thx.2007.089573' },
    { id: 11, citation: 'Mendes G, Mangani D, Solé D. Epidemiology of allergic rhinitis in Latin America. Curr Allergy Asthma Rep. 2019;19(10):48. DOI: 10.1007/s11882-019-0884-3 PMID: 31418149', pmid: '31418149', doi: '10.1007/s11882-019-0884-3' },
    { id: 12, citation: 'World Health Organization. Global Surveillance, Prevention and Control of Chronic Respiratory Diseases: A Comprehensive Approach. Geneva: WHO; 2007.', pmid: '', doi: '' },
    { id: 13, citation: 'Ministério da Saúde. Datasus: Mortalidade por Doenças Respiratórias no Brasil. Brasília: Ministério da Saúde; 2022.', pmid: '', doi: '' }
  ],
}