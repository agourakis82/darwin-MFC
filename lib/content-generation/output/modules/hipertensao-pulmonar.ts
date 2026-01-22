{
  id: 'hipertensao-pulmonar',
  titulo: 'Hipertensão Pulmonar',
  categoria: 'doenças cardiovasculares',
  descricao: 'A hipertensão pulmonar (HP) é uma condição caracterizada por aumento da pressão nas artérias pulmonares, frequentemente subdiagnosticada até avanços recentes na patogênese e mecanismos vasculares [1]. Representa uma patologia obscura que evoluiu com estratégias diagnósticas precisas, impactando o manejo clínico [1,2]. No contexto brasileiro, diretrizes enfatizam diagnóstico, avaliação e terapia para melhorar outcomes [2].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para indivíduos de alto risco, como portadores de doenças do tecido conjuntivo, HIV ou tromboembolismo pulmonar crônico [2].',
      populacaoAlvo: 'Adultos com fatores de risco como esclerodermia, HIV ou história de embolia pulmonar [2].',
      periodicidade: 'Anual em populações de alto risco ou conforme sintomas [2].',
      metodos: ['Ecocardiograma transtorácico', 'Cateterismo cardíaco direito'],
      evidencia: 'IV',
      referencias: [2],
    },
    sociedadesMedicas: {
      indicacao: 'Diretrizes internacionais recomendam avaliação em pacientes com dispneia inexplicada ou fatores de risco para HP [1].',
      populacaoAlvo: 'Indivíduos com sintomas sugestivos ou comorbidades como doença cardíaca esquerda ou hipóxia crônica [1].',
      periodicidade: 'Monitoramento periódico baseado em risco, tipicamente anual para grupos selecionados [1].',
      metodos: ['Ecocardiograma', 'Teste de função pulmonar', 'Cateterismo direito'],
      evidencia: 'IV',
      referencias: [1],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência de hipertensão pulmonar é estimada em 15-50 casos por milhão de habitantes globalmente [1,2]. No Brasil, dados sugerem subdiagnóstico, com prevalência similar em populações de risco [2].',
    incidencia: 'A incidência varia de 5-15 novos casos por milhão por ano, com maior impacto em grupos de alto risco [1,2].',
    mortalidade: 'A mortalidade é elevada, com sobrevida de 5 anos em torno de 50-60% sem tratamento adequado [1,2].',
    referencias: [1, 2],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: [],
    ciap2: [],
    atc: [],
  },
  
  referencias: [
    { id: 1, citation: 'Sociedade Portuguesa de Cardiologia. Guidelines for the management of pulmonary hypertension patients. Revista portuguesa de cardiologia. 2010;29(6):643-700. PMID: 20545252', pmid: '20545252', doi: '' },
    { id: 2, citation: 'Sociedade Brasileira de Cardiologia. Guideline for diagnosis, evaluation and therapeutic of pulmonary hypertension. Arquivos brasileiros de cardiologia. 2003;80(5):479-514. PMID: 15108641', pmid: '15108641', doi: '' }
  ],
}