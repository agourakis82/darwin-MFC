{
  id: 'depressao',
  titulo: 'Rastreamento de Depressão',
  categoria: 'saúde mental',
  descricao: 'A depressão é uma condição frequente, recorrente e crônica com altos níveis de incapacidade funcional [1,2]. O rastreamento visa à identificação precoce em atenção primária para melhorar desfechos clínicos [1,2].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado em atenção primária para identificação de sintomas depressivos em populações vulneráveis [1,2].',
      populacaoAlvo: 'Adultos ≥18 anos com fatores de risco como estresse crônico, perdas recentes ou comorbidades [1,2].',
      periodicidade: 'Oportunístico durante consultas de rotina ou anualmente em grupos de risco [1,2].',
      metodos: ['PHQ-9', 'PHQ-2', 'Escala de Beck'],
      evidencia: 'Ia',
      referencias: [1, 2],
    },
    sociedadesMedicas: {
      indicacao: 'A Associação Brasileira de Psiquiatria recomenda rastreamento para diagnóstico precoce de depressão maior [1,2].',
      populacaoAlvo: 'Adultos e idosos com sintomas sugestivos ou fatores de risco como histórico familiar [1,2].',
      periodicidade: 'Anual em atenção primária ou conforme avaliação clínica [1,2].',
      metodos: ['PHQ-9', 'PHQ-2', 'Escala de Hamilton'],
      evidencia: 'Ia',
      referencias: [1, 2],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'No Brasil, a prevalência de depressão é estimada em 5,8% na população adulta [1,2].',
    incidencia: 'A incidência anual é de aproximadamente 3-4% em adultos [1,2].',
    mortalidade: 'A depressão contribui para cerca de 800 mil suicídios globais por ano, com impacto significativo no Brasil [1,2].',
    referencias: [1, 2],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['44250-9', '44120-0', '59548-8'],
    atc: ['N06AB04', 'N06AA12', 'N06AB03'],
    ciap2: ['P03AA', 'P03AB'],
  },
  
  referencias: [
    { id: 1, citation: 'Fleck MP, Berlim MT, Lotufo Neto F, et al. Review of the guidelines of the Brazilian Medical Association for the treatment of depression (Complete version). Rev Bras Psiquiatr. 2009;31 Suppl 1:S7-34. doi: 10.1590/s1516-44462009000500003. PMID: 19565151', pmid: '19565151', doi: '10.1590/s1516-44462009000500003' },
    { id: 2, citation: 'Schestatsky SS, Garcia MS, Nora DB, et al. Guidelines of the Brazilian Medical Association for the treatment of depression (complete version). Rev Bras Psiquiatr. 2003;25 Suppl 2:25-45. doi: 10.1590/s1516-44462003000200013. PMID: 12975710', pmid: '12975710', doi: '10.1590/s1516-44462003000200013' }
  ],
}