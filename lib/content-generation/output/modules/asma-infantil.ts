{
  id: 'asma-infantil',
  titulo: 'Asma Infantil',
  categoria: 'criancas',
  descricao: 'A asma infantil é uma doença inflamatória crônica das vias aéreas, caracterizada por episódios recorrentes de sibilância, dispneia e tosse, afetando principalmente crianças [1,2]. Menos de 5% dos casos em crianças são de asma difícil de controlar, exigindo manejo especializado [1]. No Brasil, o manejo segue protocolos integrados ao SUS para diagnóstico precoce e controle [4,5].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Diagnóstico e manejo da asma em crianças com sintomas respiratórios recorrentes, incluindo sibilância noturna e resposta a broncodilatadores [4,5].',
      populacaoAlvo: 'Crianças de 0 a 18 anos com história de chiado recorrente ou diagnóstico suspeito de asma [4,5].',
      periodicidade: 'Avaliação inicial imediata e follow-up a cada 1-3 meses conforme gravidade, com monitoramento anual para casos controlados [4].',
      metodos: ['Avaliação clínica e anamnese', 'Espirometria (após 5 anos)', 'Medição de pico expiratório'],
      evidencia: 'Ia',
      referencias: [4, 5],
    },
    sociedadesMedicas: {
      indicacao: 'GINA 2024 recomenda diagnóstico baseado em padrões de sintomas respiratórios variáveis e exclusão de diagnósticos diferenciais [2]. SBPT 2021 enfatiza manejo escalonado para crianças com asma persistente [3].',
      populacaoAlvo: 'Crianças com sintomas como chiado, tosse noturna ou limitação ao exercício, independentemente da idade [2,3].',
      periodicidade: 'Revisão a cada 1-6 meses baseada no nível de controle, com avaliação de função pulmonar anual [2,3].',
      metodos: ['História clínica detalhada', 'Testes de função pulmonar (espirometria)', 'Teste de broncodilatador'],
      evidencia: 'Ia',
      referencias: [2, 3],
    },
    convergencia: 'As recomendações SUS e das sociedades médicas mostram convergencia na indicação para crianças sintomáticas e métodos diagnósticos, com alinhamento na periodicidade baseada em gravidade [2,3,4,5].',
  },
  
  epidemiologia: {
    prevalencia: 'Prevalência global de asma em crianças é de aproximadamente 10-12% [2]. No Brasil, estima-se em 15-20% das crianças em idade escolar [3,5].',
    incidencia: 'Incidência anual global em crianças é de 2-5 casos por 1.000 [2]. No Brasil, varia de 1-3% em populações urbanas [3].',
    mortalidade: 'Mortalidade global por asma em crianças é baixa, cerca de 0,5-1 por 100.000, mas associada a crises graves [2]. No Brasil, representa menos de 1% das mortes pediátricas, com 200-300 óbitos anuais [4,5].',
    referencias: [2, 3, 4, 5],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['20109-4', '60246-3', '2584-9', '32485-2', '33914-3'],
    atc: ['R03AC12', 'R03BA08', 'R03CC02', 'R03DC03', 'A07EA06'],
    ciap2: ['R96', 'R97', 'R98'],
  },
  
  referencias: [
    { id: 1, citation: 'Grupo de trabajo de asma difícil a controlar en pediatría. Diagnosis and treatment guidelines for difficult-to-control asthma in children. An Pediatr (Barc). 2009;71(5):443-456. DOI: 10.1016/j.anpedi.2009.08.004', pmid: '19864193', doi: '10.1016/j.anpedi.2009.08.004' },
    { id: 2, citation: 'Global Initiative for Asthma. Global Strategy for Asthma Management and Prevention 2024. Global Initiative for Asthma; 2024. Available from: https://ginasthma.org/', pmid: '', doi: '' },
    { id: 3, citation: 'Sociedade Brasileira de Pneumologia e Tisiologia. Diretrizes da Sociedade Brasileira de Pneumologia e Tisiologia para o Manejo da Asma – 2021. J Bras Pneumol. 2021;47(Suppl 1):e20210112. Available from: https://sbpt.org.br/', pmid: '', doi: '' },
    { id: 4, citation: 'Ministério da Saúde (Brazil). Protocolo Clínico e Diretrizes Terapêuticas: Asma. Brasília: Ministério da Saúde; 2021. Available from: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/asma', pmid: '', doi: '' },
    { id: 5, citation: 'Ministério da Saúde (Brazil). Cadernos de Atenção Básica - Doenças Respiratórias Crônicas. Brasília: Ministério da Saúde; 2010. Available from: https://bvsms.saude.gov.br/bvs/publicacoes/doencas_respiratorias_cronicas.pdf', pmid: '', doi: '' }
  ],
}