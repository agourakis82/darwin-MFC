{
  id: 'obesidade-infantil',
  titulo: 'Rastreamento de Obesidade Infantil',
  categoria: 'criancas-e-adolescentes',
  descricao: 'A obesidade infantil é definida como o acúmulo excessivo de gordura corporal que pode prejudicar a saúde, avaliada principalmente pelo índice de massa corporal (IMC) ajustado para idade e sexo [1,2,3]. Representa um problema de saúde pública crescente, associado a riscos cardiovasculares, diabetes tipo 2 e distúrbios psicológicos [2,3]. No contexto brasileiro, o rastreamento precoce é essencial para intervenções preventivas [3,4].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado por meio de avaliação antropométrica para identificação de excesso de peso em crianças e adolescentes [3]. Indicado em consultas de rotina para detecção precoce e manejo integrado [3].',
      populacaoAlvo: 'Crianças e adolescentes de 0 a 19 anos, com ênfase em grupos de risco como história familiar de obesidade e sedentarismo [3].',
      periodicidade: 'Avaliação anual ou a cada consulta de rotina, monitorando curvas de crescimento [3].',
      metodos: ['Medição de peso, estatura e cálculo de IMC', 'Curvas de percentis de IMC para idade e sexo', 'Avaliação de circunferência abdominal'],
      evidencia: 'IIa',
      referencias: [3],
    },
    sociedadesMedicas: {
      indicacao: 'As Diretrizes Brasileiras de Obesidade recomendam rastreamento universal por IMC ajustado para idade em crianças e adolescentes [2]. A The Obesity Society enfatiza avaliação precoce para prevenção de comorbidades [1].',
      populacaoAlvo: 'Crianças e adolescentes de 2 a 18 anos, incluindo aqueles com fatores de risco como baixa renda e etnia [1,2].',
      periodicidade: 'Anual em consultas pediátricas ou a cada 6-12 meses em casos de risco [2].',
      metodos: ['IMC para idade e sexo', 'Percentis de IMC (OMS ou CDC)', 'Medidas antropométricas complementares'],
      evidencia: 'Ia',
      referencias: [1, 2],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'No Brasil, a prevalência de obesidade em crianças de 5 a 9 anos é de 6,1% e em adolescentes de 10 a 19 anos é de 4,9% [2,3]. Globalmente, afeta cerca de 39 milhões de crianças menores de 5 anos [1].',
    incidencia: 'A incidência de obesidade infantil no Brasil aumentou 28% entre 2006 e 2019 [2]. Estima-se uma taxa de 2-5 novos casos por 100 crianças-ano em populações vulneráveis [3].',
    mortalidade: 'A obesidade infantil contribui indiretamente para 2,3 milhões de mortes anuais por comorbidades em adultos [1]. No Brasil, associa-se a maior mortalidade por doenças crônicas não transmissíveis [3].',
    referencias: [1, 2, 3],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['8308-9', '39156-5', '59562-7', '29463-1', '41945-0'],
    ciap2: ['A96'],
    atc: ['A10AE05', 'A08AA01'],
  },
  
  referencias: [
    { id: 1, citation: 'Garvey WT, Mechanick JI, Brett EM, et al. Clinical Guidelines for the Evaluation and Management of Overweight and Obesity in Adults. The Obesity Society; 2022. Available from: https://www.obesity.org/', pmid: '', doi: '' },
    { id: 2, citation: 'Diretrizes Brasileiras de Obesidade 2022. Associação Brasileira para o Estudo da Obesidade e da Síndrome Metabólica (ABESO); 2022. Available from: https://abeso.org.br/', pmid: '', doi: '' },
    { id: 3, citation: 'Ministério da Saúde (Brasil). Estratégias para o Cuidado da Pessoa com Doença Crônica - Obesidade. Brasília: Ministério da Saúde; 2014. Available from: https://bvsms.saude.gov.br/bvs/publicacoes/estrategias_cuidado_doenca_cronica_obesidade_cab38.pdf', pmid: '', doi: '' },
    { id: 4, citation: 'Comissão Nacional de Incorporação de Tecnologias no SUS (CONITEC). Protocolo de Uso - Liraglutida para Obesidade. Ministério da Saúde; 2023. Available from: https://www.gov.br/conitec/pt-br', pmid: '', doi: '' }
  ],
}