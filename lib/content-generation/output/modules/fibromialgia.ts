{
  id: 'fibromialgia',
  titulo: 'Fibromialgia',
  categoria: 'reumatologia',
  descricao: 'A fibromialgia é uma síndrome de dor crônica generalizada associada a fadiga, distúrbios do sono e sintomas somáticos [1,2]. O diagnóstico é essencialmente clínico, baseado em critérios validados, sem necessidade de exames complementares de rotina [1,3].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Diagnóstico indicado para pacientes com dor musculoesquelética crônica generalizada por pelo menos 3 meses, acompanhada de fadiga e distúrbios cognitivos [1,3].',
      populacaoAlvo: 'Adultos e idosos com suspeita clínica de dor difusa sem causa orgânica identificável [1,3].',
      periodicidade: 'Avaliação diagnóstica realizada uma vez, quando sintomas sugestivos estão presentes; reavaliação conforme evolução clínica [1].',
      metodos: ['Critérios ACR 2016 (WPI e SSS)', 'Exame físico para exclusão de outras condições', 'História clínica detalhada'],
      evidencia: 'IIa',
      referencias: [1, 3],
    },
    sociedadesMedicas: {
      indicacao: 'Recomendado pelas sociedades de reumatologia o diagnóstico clínico em indivíduos com dor generalizada persistente e sintomas associados, utilizando critérios ACR [1,2].',
      populacaoAlvo: 'Mulheres adultas predominantemente, mas sem restrição de gênero; foco em pacientes com impacto funcional significativo [1,2].',
      periodicidade: 'Diagnóstico único baseado em apresentação sintomática; monitoramento periódico para manejo, não para rastreamento populacional [2].',
      metodos: ['Índice de Dor Generalizada (WPI)', 'Escala de Gravidade de Sintomas (SSS)', 'Exclusão de outras patologias por história e exame'],
      evidencia: 'IIa',
      referencias: [1, 2],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global da fibromialgia varia de 2% a 8% na população adulta, sendo mais comum em mulheres [1,2]. No Brasil, estima-se em cerca de 2,5% a 4% [3].',
    incidencia: 'A incidência anual é estimada em 2 a 4 casos por 1.000 adultos, com maior ocorrência em faixas etárias médias [2].',
    mortalidade: 'A fibromialgia não está associada a aumento significativo de mortalidade, embora impacte qualidade de vida [1,3].',
    referencias: [1, 2, 3],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['82607-2', '69609-7', '11368-8', '35925-4', '45423-0'],
    ciap2: ['L04'],
    atc: ['N03AX16', 'N06AX21', 'N06AA09'],
  },
  
  referencias: [
    { id: 1, citation: 'Marques AP, Amorim Lehmann K, Silva JA, et al. New guidelines for the diagnosis of fibromyalgia. Rev Bras Reumatol. 2017;57(Suppl 2):S342-S348. doi: 10.1016/j.rbre.2017.07.002', pmid: '28800969', doi: '10.1016/j.rbre.2017.07.002' },
    { id: 2, citation: 'Ballina-García FJ, Casanueva-Fernández B, González-Gay MÁ, et al. [Consensus report on the diagnosis and treatment of fibromyalgia in Catalonia]. Med Clin (Barc). 2002;119(1):23-31. doi: 10.1016/s0025-7753(02)72517-7', pmid: '12049708', doi: '10.1016/s0025-7753(02)72517-7' },
    { id: 3, citation: 'Rezende MC, Paiva ES, Martinez JE, et al. Brazilian consensus on the treatment of fibromyalgia. Rev Bras Reumatol. 2010;50(4):416-433.', pmid: '21125141', doi: '' }
  ],
}