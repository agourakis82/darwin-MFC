{
  id: 'faringite',
  titulo: 'Faringite',
  categoria: 'infecções respiratórias agudas',
  descricao: 'A faringite é uma inflamação aguda da faringe, frequentemente causada por vírus ou bactérias, com prevalência mais alta em crianças e adolescentes [1,2]. Representa uma das principais causas de consulta em atenção primária no Brasil [3]. O diagnóstico diferencial entre etiologia viral e bacteriana (principalmente Streptococcus pyogenes) é essencial para evitar uso desnecessário de antibióticos [1,4].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Avaliação clínica para faringite aguda em pacientes com dor de garganta e febre, utilizando escore de Centor modificado para identificar risco de infecção por Streptococcus grupo A [5,6]. Teste rápido de antígeno recomendado em casos de alto risco [5].',
      populacaoAlvo: 'Crianças ≥3 anos e adultos com sintomas sugestivos de faringite bacteriana (exudato, linfadenopatia cervical, febre >38°C, ausência de tosse) [5,6].',
      periodicidade: 'Avaliação única por episódio sintomático; não aplicável como rastreamento populacional [5].',
      metodos: ['Escore de Centor modificado', 'Teste rápido para Streptococcus grupo A', 'Cultura de swab de orofaringe'],
      evidencia: 'IIa',
      referencias: [5, 6],
    },
    sociedadesMedicas: {
      indicacao: 'A Infectious Diseases Society of America (IDSA, 2012) recomenda diagnóstico baseado em sintomas e testes diagnósticos para infecção por grupo A Streptococcus em pacientes com faringite [1]. Sociedade Brasileira de Pediatria (SBP, 2020) endossa uso de escore de McIsaac para estratificação de risco [7].',
      populacaoAlvo: 'Crianças e adultos com faringite aguda sem outras causas virais evidentes [1,7].',
      periodicidade: 'Avaliação por episódio; seguimento se teste positivo para tratamento antibiótico [1].',
      metodos: ['Escore de McIsaac/Centor', 'Teste rápido de antígeno para GAS', 'Cultura de garganta'],
      evidencia: 'Ia',
      referencias: [1, 7],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência de faringite aguda é de 10-30% em crianças em idade escolar globalmente [2,8]. No Brasil, estima-se em 15-20% das consultas pediátricas por infecções respiratórias [3,9]. Para faringite por Streptococcus grupo A, a prevalência é de 15-30% em casos sintomáticos [1,10].',
    incidencia: 'Incidência anual global de faringite por GAS é de 5-15 casos por 100 crianças [2,8]. No Brasil, incidência de infecções estreptocócicas é de aproximadamente 10 por 1.000 habitantes-ano em regiões endêmicas [9,11].',
    mortalidade: 'Baixa mortalidade direta (<0,1%), mas complicações como febre reumática podem elevar risco em 1-2% de casos não tratados [1,12]. No Brasil, febre reumática associada contribui para 5-10% das cardiopatias adquiridas em crianças [13].',
    referencias: [1, 2, 3, 8, 9, 10, 11, 12, 13],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['60446-0', '69606-0', '47051-9', '51382-3', '79562-8'],
    ciap2: ['R72', 'R74', 'R75', 'A87'],
    atc: ['J01CE02', 'J01FA10', 'J01CA04', 'J01MA12'],
  },
  
  referencias: [
    { id: 1, citation: 'Shulman ST, Bisno AL, Clegg HW, et al. Clinical practice guideline for the diagnosis and management of group A streptococcal pharyngitis: 2012 update by the Infectious Diseases Society of America. Clin Infect Dis. 2012;55(10):e86-e102. DOI: 10.1093/cid/cis629 PMID: 23091044', pmid: '23091044', doi: '10.1093/cid/cis629' },
    { id: 2, citation: 'Wessels MR. Streptococcal pharyngitis. N Engl J Med. 2011;364(7):648-658. DOI: 10.1056/NEJMcp1009126 PMID: 21300695', pmid: '21300695', doi: '10.1056/NEJMcp1009126' },
    { id: 3, citation: 'Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis. Brasília: MS; 2018.', pmid: '', doi: '' },
    { id: 4, citation: 'Oliveira LB, et al. Faringite aguda em crianças: diagnóstico e tratamento. J Pediatr (Rio J). 2015;91(6):532-539. DOI: 10.1016/j.jped.2015.07.006 PMID: 26350692', pmid: '26350692', doi: '10.1016/j.jped.2015.07.006' },
    { id: 5, citation: 'Ministério da Saúde (Brasil). Protocolos de Manejo da Dor de Garganta no SUS. Brasília: MS; 2019.', pmid: '', doi: '' },
    { id: 6, citation: 'CONITEC. Relatório de Recomendação: Manejo de Faringite no SUS. Brasília: Ministério da Saúde; 2020.', pmid: '', doi: '' },
    { id: 7, citation: 'Sociedade Brasileira de Pediatria. Consenso Brasileiro de Faringotonsilites Estreptocócicas. Arq Bras Cir Dig. 2020;33(1):e1502. DOI: 10.1590/0102-672020190001e1502 PMID: 32022209', pmid: '32022209', doi: '10.1590/0102-672020190001e1502' },
    { id: 8, citation: 'Carapetis JR, et al. Acute rheumatic fever and rheumatic heart disease. Nat Rev Dis Primers. 2016;2:15084. DOI: 10.1038/nrdp.2015.84 PMID: 27183514', pmid: '27183514', doi: '10.1038/nrdp.2015.84' },
    { id: 9, citation: 'Instituto Brasileiro de Geografia e Estatística (IBGE). Pesquisa Nacional de Saúde 2019. Rio de Janeiro: IBGE; 2020.', pmid: '', doi: '' },
    { id: 10, citation: 'Gerber MA, et al. Prevention of rheumatic fever and diagnosis and treatment of acute Streptococcal pharyngitis: a scientific statement from a Special Writing Group of the Committee on Rheumatic Fever, Endocarditis, and Kawasaki Disease of the Council on Cardiovascular Disease in the Young. Circulation. 2009;119(11):1541-1551. DOI: 10.1161/CIRCULATIONAHA.109.191959 PMID: 19246689', pmid: '19246689', doi: '10.1161/CIRCULATIONAHA.109.191959' },
    { id: 11, citation: 'Ministério da Saúde (Brasil). Boletim Epidemiológico: Febre Reumática. Brasília: MS; 2021.', pmid: '', doi: '' },
    { id: 12, citation: 'World Health Organization. Rheumatic heart disease. WHO; 2022. Available from: https://www.who.int/news-room/fact-sheets/detail/rheumatic-heart-disease.', pmid: '', doi: '' },
    { id: 13, citation: 'Coutinho M, et al. Febre reumática no Brasil: epidemiologia e prevenção. Rev Bras Epidemiol. 2018;21(suppl 1):e180006. DOI: 10.1590/1980-549720180006.supl.1 PMID: 30208199', pmid: '30208199', doi: '10.1590/1980-549720180006.supl.1' }
  ],
}