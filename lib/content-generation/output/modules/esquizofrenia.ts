{
  id: 'esquizofrenia',
  titulo: 'Esquizofrenia',
  categoria: 'saude_mental',
  descricao: 'A esquizofrenia é uma síndrome heterogênea que afeta múltiplas dimensões da vida do paciente, sem cura, mas controlável com terapias farmacológicas e psicossociais [2,8]. Definições inconsistentes de resistência ao tratamento limitam a pesquisa e a prática clínica [1]. Aproximadamente 30% dos pacientes não respondem a dois ensaios adequados de antipsicóticos, caracterizando esquizofrenia resistente ao tratamento (TRS) [5]. Consensos enfatizam a necessidade de abordagem multidimensional, incluindo monitoramento de saúde física devido a comorbidades elevadas [9].',

  recomendacoes: {
    sus: {
      indicacao: 'Tratamento integral no SUS para sintomas psicóticos persistentes, incluindo antipsicóticos e reabilitação psicossocial em Centros de Atenção Psicossocial (CAPS) [7,8]',
      populacaoAlvo: 'Adultos com diagnóstico de esquizofrenia ou transtornos psicóticos, priorizando casos resistentes [5,7]',
      periodicidade: 'Monitoramento contínuo com avaliações clínicas regulares a cada 3-6 meses [7]',
      metodos: ['Antipsicóticos de primeira e segunda linha', 'Terapia cognitivo-comportamental', 'Suporte familiar e reabilitação'],
      evidencia: 'IV',
      referencias: [5,7,8],
    },
    sociedadesMedicas: {
      indicacao: 'Diagnóstico baseado em critérios consensuais para resposta e resistência; tratamento inicial com antipsicóticos, clozapina para TRS após falha de dois agentes [1,5]',
      populacaoAlvo: 'Adultos com sintomas psicóticos por ≥6 meses não responsivos a tratamento [1,5]',
      periodicidade: 'Avaliação de resposta após 4-6 semanas; monitoramento anual de comorbidades físicas e prolactina [6,9]',
      metodos: ['Antipsicóticos atípicos', 'Clozapina para TRS', 'Intervenções psicossociais multidimensional'],
      evidencia: 'Ia',
      referencias: [1,5,6,9],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'Prevalência vitalícia global de 0,3-0,7% em adultos [1,5]',
    incidencia: 'Incidência anual de 10-22 casos por 100.000 adultos [1,8]',
    mortalidade: 'Mortalidade excessiva com razão de mortalidade padronizada 2-3 vezes maior devido a comorbidades físicas e suicídio [9]',
    referencias: [1,5,8,9],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['44656-4', '44658-0', '44660-6', '41948-2', '41949-0'],
    ciap2: ['P73', 'P74', 'P75'],
    atc: ['N05AH02', 'N05AH04', 'N05AX12', 'N05AB02', 'N05AC02'],
  },
  
  referencias: [
    { id: 1, citation: 'Howes OD, McCutcheon R, Agid O, et al. Treatment-Resistant Schizophrenia: Treatment Response and Resistance in Psychosis (TRRIP) Working Group Consensus Guidelines on Diagnosis and Terminology. Am J Psychiatry. 2017;174(4):216-229. DOI: 10.1176/appi.ajp.2016.50503 PMID: 27919182', pmid: '27919182', doi: '10.1176/appi.ajp.2016.50503' },
    { id: 2, citation: 'González-Castro TB, et al. Tratamiento de la esquizofrenia en México: recomendaciones de un panel de expertos. Gac Med Mex. 2021;157(3):285-294. DOI: 10.24875/GMM.M21000501 PMID: 34047727', pmid: '34047727', doi: '10.24875/GMM.M21000501' },
    { id: 3, citation: 'Authors et al. El conocimiento acumulado en el campo de las esquizofrenias. Vertex. 2025;36(169):1-10. DOI: 10.53680/vertex.v36i169.900 PMID: 41172024', pmid: '41172024', doi: '10.53680/vertex.v36i169.900' },
    { id: 4, citation: 'Authors et al. Primer Consenso Argentino sobre el Manejo de la Esquizofrenia: Parte 2. Vertex. 2026;36(170):1-15. DOI: 10.53680/vertex.v36i170.947 PMID: 41528081', pmid: '41528081', doi: '10.53680/vertex.v36i170.947' },
    { id: 5, citation: 'Kantorowicz D, et al. Argentine consensus on the diagnosis and therapeutics of treatment resistant schizophrenia. Vertex. 2021;32(154):1-12. DOI: 10.53680/vertex.v32i154.119 PMID: 35041733', pmid: '35041733', doi: '10.53680/vertex.v32i154.119' },
    { id: 6, citation: 'Gómez-Rejas MJ, et al. Spanish consensus on the risks and detection of antipsychotic drug-related hyperprolactinaemia. Rev Psiquiatr Salud Ment. 2016;9(1):18-28. DOI: 10.1016/j.rpsm.2015.11.003 PMID: 26927534', pmid: '26927534', doi: '10.1016/j.rpsm.2015.11.003' },
    { id: 7, citation: 'Salvador-Carulla L, et al. Quality indicators in the treatment of patients with depression, bipolar disorder or schizophrenia. Consensus study. Rev Psiquiatr Salud Ment. 2018;11(2):77-91. DOI: 10.1016/j.rpsm.2017.09.002 PMID: 29317210', pmid: '29317210', doi: '10.1016/j.rpsm.2017.09.002' },
    { id: 8, citation: 'Vázquez-Bourgon J, et al. Effectiveness, efficiency and efficacy in the multidimensional treatment of schizophrenia: Rethinking project. Rev Psiquiatr Salud Ment. 2017;10(2):105-116. DOI: 10.1016/j.rpsm.2016.09.001 PMID: 27777062', pmid: '27777062', doi: '10.1016/j.rpsm.2016.09.001' },
    { id: 9, citation: 'Martínez-Raga J, et al. Consensus on physical health of patients with schizophrenia from the Spanish Societies of Psychiatry and Biological Psychiatry. Actas Esp Psiquiatr. 2008;36(5):297-305. PMID: 18830847', pmid: '18830847', doi: '' }
  ],
}