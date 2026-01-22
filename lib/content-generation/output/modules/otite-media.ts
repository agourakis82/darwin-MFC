{
  id: 'otite-media',
  titulo: 'Otite Média Aguda em Crianças',
  categoria: 'crianças',
  descricao: 'A otite média aguda (OMA) é uma infecção comum do ouvido médio na infância, frequentemente associada a infecções respiratórias superiores [2,3]. O uso inadequado de antibióticos em infecções como a OMA contribui para o aumento da resistência bacteriana, prolongando hospitalizações e elevando custos e mortalidade [1]. O diagnóstico preciso é essencial para evitar tratamentos desnecessários [2].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Diagnóstico baseado em sintomas como otalgia, febre e exame otoscópico; antibióticos reservados para casos com critérios de gravidade ou persistência de sintomas [1,2].',
      populacaoAlvo: 'Crianças com suspeita de infecção aguda do ouvido médio, especialmente menores de 2 anos [2,3].',
      periodicidade: 'Avaliação imediata em casos sintomáticos; seguimento em 48-72 horas se tratamento expectante [1].',
      metodos: ['Otoscopia', 'Pneumotoscopia', 'Avaliação clínica de sintomas'],
      evidencia: 'III',
      referencias: [1, 2, 3],
    },
    sociedadesMedicas: {
      indicacao: 'Diagnóstico clínico com confirmação otoscópica; evitar antibióticos em infecções virais ou OMA não complicada [1,2].',
      populacaoAlvo: 'Crianças e adolescentes com dor de ouvido e sinais de infecção [2,3].',
      periodicidade: 'Reavaliação em 48-72 horas para casos sem melhora [1].',
      metodos: ['Exame otoscópico', 'Avaliação de mobilidade timpânica', 'Critérios de gravidade clínica'],
      evidencia: 'III',
      referencias: [1, 2, 3],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'Alta prevalência na infância, afetando cerca de 80% das crianças até os 3 anos de idade [2,3].',
    incidencia: 'Incidência elevada em infecções respiratórias superiores, com picos sazonais [1,2].',
    mortalidade: 'Baixa mortalidade direta, mas complicações como mastoidite aumentam riscos em casos não tratados [3].',
    referencias: [1, 2, 3],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: [],
    ciap2: [],
    atc: [],
  },
  
  referencias: [
    { id: 1, citation: 'De Luca C, et al. How to avoid the inappropriate use of antibiotics in upper respiratory tract infections? A position statement from an expert panel. Brazilian journal of otorhinolaryngology. 2018;84(3):266-277. DOI: 10.1016/j.bjorl.2018.02.001 PMID: 29588108', pmid: '29588108', doi: '10.1016/j.bjorl.2018.02.001' },
    { id: 2, citation: 'Autor et al. [Acute otitis media diagnosis in childhood]. Revista da Associacao Medica Brasileira (1992). 2006;52(1):10-15. DOI: 10.1590/s0104-42302006000100010 PMID: 16622527', pmid: '16622527', doi: '10.1590/s0104-42302006000100010' },
    { id: 3, citation: 'Autor et al. [Acute otitis media in childhood]. Revista da Associacao Medica Brasileira (1992). 2006;52(2):71-76. DOI: 10.1590/s0104-42302006000200011 PMID: 16767326', pmid: '16767326', doi: '10.1590/s0104-42302006000200011' }
  ],
}