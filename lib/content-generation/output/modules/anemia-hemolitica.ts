{
  id: 'anemia-hemolitica',
  titulo: 'Anemia Hemolítica',
  categoria: 'hematologia',
  descricao: 'A anemia hemolítica engloba um grupo heterogêneo de distúrbios caracterizados pela destruição acelerada de eritrócitos, resultando em anemia, icterícia e esplenomegalia em casos crônicos [1,2]. A deficiência de piruvato quinase (PK) representa a segunda enzimopatia mais frequente e a causa principal de anemia hemolítica hereditária não-esferocítica crônica, com prevalência global subestimada devido à baixa suspeita em casos leves e dificuldades na execução e interpretação de testes [1]. A microangiopatia trombótica (TMA) é uma forma adquirida associada a anemia hemolítica microangiopática e trombocitopenia, com desenvolvimento agudo que requer manejo inicial essencial para melhorar desfechos [2].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Não há diretrizes específicas do SUS para rastreamento populacional de anemia hemolítica, sendo o diagnóstico indicado em casos de suspeita clínica baseada em sintomas como fadiga, palidez e icterícia, ou história familiar de hemólise [1,2].',
      populacaoAlvo: 'Indivíduos com apresentação clínica sugestiva de hemólise ou fatores de risco como história familiar para deficiências enzimáticas hereditárias [1]; pacientes com quadro agudo de TMA [2].',
      periodicidade: 'Não aplicável para rastreamento rotineiro; investigação diagnóstica conforme suspeita clínica e monitoramento contínuo em casos diagnosticados [1,2].',
      metodos: ['Hemograma com esfregaço periférico', 'Dosagens de LDH, haptoglobina e bilirrubina', 'Teste de Coombs direto e indireto'],
      evidencia: 'IV',
      referencias: [1, 2],
    },
    sociedadesMedicas: {
      indicacao: 'Consenso recomenda diagnóstico e tratamento para deficiência de PK em pacientes com suspeita de anemia hemolítica hereditária crônica [1]; diretrizes enfatizam tratamento de emergência para TMA com anemia hemolítica microangiopática [2].',
      populacaoAlvo: 'Pacientes com anemia hemolítica não-esferocítica crônica para avaliação de PK [1]; indivíduos com TMA aguda caracterizada por anemia hemolítica e trombocitopenia [2].',
      periodicidade: 'Diagnóstico único com testes confirmatórios; monitoramento periódico da hemólise e função esplênica em PKD [1]; intervenção imediata nas primeiras horas para TMA [2].',
      metodos: ['Dosagem de atividade enzimática de PK e análise genética [1]', 'Plasmaférese, suporte transfusional e terapias específicas como inibidores do complemento para TMA [2]'],
      evidencia: 'IV',
      referencias: [1, 2],
    },
    convergencia: 'divergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global da deficiência de PK é subestimada devido à baixa suspeita clínica em casos leves e dificuldades diagnósticas [1]; representa a enzimopatia congênita mais comum causando anemia hemolítica hereditária não-esferocítica crônica [1]. A TMA é uma condição heterogênea com prevalência variável, mas geralmente rara [2].',
    incidencia: 'Dados de incidência são limitados e subestimados para formas hereditárias como PKD devido a diagnósticos tardios [1]; TMA apresenta desenvolvimento agudo em contextos clínicos específicos [2].',
    mortalidade: 'A mortalidade em PKD varia com a gravidade, sendo mais elevada em formas graves sem suporte [1]; em TMA, o prognóstico melhora com manejo inicial precoce, mas pode ser invalidante ou fatal se não tratado nas primeiras horas [2].',
    referencias: [1, 2],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['718-7', '4544-3', '2326-7', '1976-0', '11526-0'],
    ciap2: [],
    atc: [],
  },
  
  referencias: [
    { id: 1, citation: 'Authors et al. Consensus document for the diagnosis and treatment of pyruvate kinase deficiency. Medicina clinica. 2021. DOI: 10.1016/j.medcli.2020.10.018 PMID: 33431182', pmid: '33431182', doi: '10.1016/j.medcli.2020.10.018' },
    { id: 2, citation: 'Authors et al. Practice guidelines for the emergency treatment of thrombotic microangiopathy. Medicina clinica. 2018. DOI: 10.1016/j.medcli.2018.01.013 PMID: 29534844', pmid: '29534844', doi: '10.1016/j.medcli.2018.01.013' }
  ],
}