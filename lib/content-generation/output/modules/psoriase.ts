{
  id: 'psoriase',
  titulo: 'Psoríase',
  categoria: 'doenças dermatológicas',
  descricao: 'A psoríase é uma doença inflamatória crônica e imunomediada da pele, caracterizada por placas eritematoescamosas [1]. A prevalência global varia de 1% a 3% [1]. No Brasil, estima-se em 1% a 2% da população [1]. O consenso brasileiro atualiza o manejo, incluindo algoritmos de tratamento [1]. Biossimilares são recomendados para reduzir custos em terapias biológicas [2].',

  recomendacoes: {
    sus: {
      indicacao: 'Diagnóstico clínico para lesões cutâneas suspeitas de psoríase; tratamento acessível via SUS para casos moderados a graves [1].',
      populacaoAlvo: 'Adultos e crianças com sintomas cutâneos persistentes ou história familiar [1].',
      periodicidade: 'Avaliação inicial e monitoramento a cada 3-6 meses conforme resposta ao tratamento [1].',
      metodos: ['Exame dermatológico', 'Escala PASI para gravidade', 'Terapias tópicas ou sistêmicas'],
      evidencia: 'IV',
      referencias: [1],
    },
    sociedadesMedicas: {
      indicacao: 'A Sociedade Brasileira de Dermatologia recomenda diagnóstico baseado em critérios clínicos e tratamento escalonado por gravidade [1]. Posição portuguesa endossa biossimilares para psoríase moderada a grave [2].',
      populacaoAlvo: 'Pacientes com psoríase leve a grave, incluindo formas pustulosa e eritrodérmica [1,2].',
      periodicidade: 'Reavaliação a cada 3 meses para terapias biológicas; anual para casos leves controlados [1].',
      metodos: ['Exame clínico', 'Biópsia se diagnóstico incerto', 'Biossimilares de anti-TNF e anti-IL'],
      evidencia: 'IV',
      referencias: [1, 2],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'Global: 1-3% em adultos [1]. Brasil: 1-2% [1].',
    incidencia: 'Incidência anual de 0,1-0,2% em populações caucasianas; menor em populações latinas [1].',
    mortalidade: 'Baixa diretamente, mas aumenta risco de comorbidades cardiovasculares (RR 1,5-2,0) [1].',
    referencias: [1],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['11526-1', '44666-8', '57722-6', '57922-4', '11525-3'],
    atc: ['D05AA', 'D05AC', 'L04AC12', 'L04AX07', 'D11AH02'],
    ciap2: ['S91'],
  },
  
  referencias: [
    { id: 1, citation: 'Brazilian Society of Dermatology. Highlights of the Brazilian Society of Dermatology\'s Brazilian Consensus on Psoriasis. An Bras Dermatol. 2025. doi: 10.1016/j.abd.2025.501242. PMID: 41218378', pmid: '41218378', doi: '10.1016/j.abd.2025.501242' },
    { id: 2, citation: 'Portuguese Group on Biosimilars in Dermatology. Portuguese Position Paper on the Use of Biosimilars in Psoriasis. Acta Med Port. 2016;29(12):776-782. doi: 10.20344/amp.8118. PMID: 28060699', pmid: '28060699', doi: '10.20344/amp.8118' }
  ],
}