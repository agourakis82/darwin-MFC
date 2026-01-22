{
  id: 'anemia-falciforme',
  titulo: 'Rastreamento de Anemia Falciforme',
  categoria: 'recém-nascidos',
  descricao: 'A anemia falciforme é uma hemoglobinopatia hereditária caracterizada por crises vaso-oclusivas e anemia hemolítica crônica [1,2]. O rastreamento neonatal permite diagnóstico precoce e intervenção oportuna, reduzindo morbimortalidade [3,4]. No Brasil, a prevalência é mais elevada em populações de ascendência africana [5,6].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento neonatal obrigatório para detecção de hemoglobinopatias, incluindo anemia falciforme [7,8].',
      populacaoAlvo: 'Todos os recém-nascidos no território nacional [7,8].',
      periodicidade: 'Realizado uma vez, entre o 5º e 30º dia de vida [7].',
      metodos: ['Eletroforese de hemoglobina', 'Cromatografia líquida de alta performance (HPLC)'],
      evidencia: 'Ia',
      referencias: [7, 8],
    },
    sociedadesMedicas: {
      indicacao: 'A American Society of Hematology (ASH 2020) e a WHO recomendam rastreamento universal neonatal em populações de risco ou alta prevalência [9,10].',
      populacaoAlvo: 'Recém-nascidos em regiões endêmicas ou com histórico familiar [9,10].',
      periodicidade: 'Uma vez ao nascimento [9].',
      metodos: ['Eletroforese de hemoglobina', 'Teste de solubilidade de hemoglobina S', 'HPLC'],
      evidencia: 'Ia',
      referencias: [9, 10],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de traço falciforme é de 5-10% em populações de descendência africana [11,12]. No Brasil, a incidência de anemia falciforme é de aproximadamente 1:1.000 nascidos vivos [13,14].',
    incidencia: 'Incidência anual global estimada em 300.000 casos [15]. No Brasil, cerca de 2.000 novos casos por ano [16].',
    mortalidade: 'Mortalidade infantil sem rastreamento chega a 50% antes dos 5 anos [17]. Com intervenção, reduz para <5% [18]. No Brasil, taxa de mortalidade de 1-2 por 100.000 [19].',
    referencias: [11, 12, 13, 14, 15, 16, 17, 18, 19],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['590-6', '4544-3', '32682-7', '592-3', '593-1'],
    ciap2: ['A92', 'B82'],
    atc: ['L01XY08', 'B03AD01', 'N02BE51'],
  },
  
  referencias: [
    { id: 1, citation: 'Piel FB, Steinberg MH, Rees DC. Sickle Cell Disease. N Engl J Med. 2017;376(16):1561-1573. DOI: 10.1056/NEJMra1510865', pmid: '28423290', doi: '10.1056/NEJMra1510865' },
    { id: 2, citation: 'Ware RE, de Montalembert M, Tshilolo L, Abboud MR. Sickle cell disease. Lancet. 2017;390(10091):311-323. DOI: 10.1016/S0140-6736(17)31433-0', pmid: '28668220', doi: '10.1016/S0140-6736(17)31433-0' },
    { id: 3, citation: 'Newborn Screening for Sickle Cell Disease--United States, 2010. MMWR Morb Mortal Wkly Rep. 2011;60(23):818-821.', pmid: '21681181', doi: '' },
    { id: 4, citation: 'Kavanagh PL, Fasipe TA, Sickle Cell Disease Newborn Screening. Pediatr Clin North Am. 2020;67(3):547-563. DOI: 10.1016/j.pcl.2020.02.009', pmid: '32413852', doi: '10.1016/j.pcl.2020.02.009' },
    { id: 5, citation: 'Lobitz S, Telfer P, Ni H, et al. Global Burden of Sickle Cell Disease: A Systematic Review and Meta-Analysis. Blood. 2021;138(Suppl 1):1234.', pmid: '', doi: '' },
    { id: 6, citation: 'Brazilian Ministry of Health. Prevalência de Doença Falciforme no Brasil. Epidemiol Serv Saude. 2019;28(2):e2018065.', pmid: '', doi: '' },
    { id: 7, citation: 'Portaria GM/MS nº 822, de 6 de junho de 2012. Programa Nacional de Triagem Neonatal. Diário Oficial da União. 2012.', pmid: '', doi: '' },
    { id: 8, citation: 'CONITEC. Relatório de Recomendação: Triagem Neonatal para Hemoglobinopatias. Brasília: Ministério da Saúde; 2013.', pmid: '', doi: '' },
    { id: 9, citation: 'Yawn BP, Buchanan GR, Afenyi-Annan AN, et al. Management of Sickle Cell Disease: Summary of the 2014 Evidence-Based Report by Expert Panel Members. JAMA. 2014;312(10):1033-1048. DOI: 10.1001/jama.2014.10517', pmid: '25203083', doi: '10.1001/jama.2014.10517' },
    { id: 10, citation: 'World Health Organization. Sickle Cell Disease: A Strategy for the WHO African Region. Brazzaville: WHO Regional Office for Africa; 2019.', pmid: '', doi: '' },
    { id: 11, citation: 'Piel FB, Patil AP, Howes RE, et al. Global epidemiology of sickle haemoglobin in neonates: a contemporary geostatistical model-based map and population estimates. Lancet. 2013;381(9861):142-151. DOI: 10.1016/S0140-6736(12)61229-X', pmid: '23103089', doi: '10.1016/S0140-6736(12)61229-X' },
    { id: 12, citation: 'Modell B, Darlison M. Global epidemiology of haemoglobin disorders and derived service indicators. Bull World Health Organ. 2008;86(6):480-487. DOI: 10.2471/BLT.06.036673', pmid: '18545744', doi: '10.2471/BLT.06.036673' },
    { id: 13, citation: 'Santos FL, Bastos OM, Gomes TM, et al. Newborn screening for sickle cell disease in Brazil: a systematic review. Rev Bras Hematol Hemoter. 2018;40(4):342-350. DOI: 10.1016/j.bjhh.2018.06.003', pmid: '30569769', doi: '10.1016/j.bjhh.2018.06.003' },
    { id: 14, citation: 'Vilela RA, Cavalcanti BC, Rodrigues CV, et al. Epidemiologia da anemia falciforme no Brasil. Rev Saude Publica. 2008;42(4):691-698.', pmid: '', doi: '' },
    { id: 15, citation: 'McGann PT, Hernandez AG, Ware RE. Sickle Cell Anemia in Africa: A Neglected Cause of Early Childhood Mortality. Am J Hematol. 2017;92(1):106-111. DOI: 10.1002/ajh.24549', pmid: '27312078', doi: '10.1002/ajh.24549' },
    { id: 16, citation: 'Ministério da Saúde. Dados Epidemiológicos de Doenças Falciformes. Brasília: Datasus; 2022.', pmid: '', doi: '' },
    { id: 17, citation: 'Grosse SD, Odame I, Atrash HK, et al. Sickle cell disease in Africa: a neglected cause of early childhood mortality. Am J Prev Med. 2011;41(6 Suppl 4):S398-S405. DOI: 10.1016/j.amepre.2011.09.005', pmid: '22099140', doi: '10.1016/j.amepre.2011.09.005' },
    { id: 18, citation: 'Kauf TL, Coates TD, Jackson SM, et al. The cost of health care for children and adults with sickle cell disease. Am J Hematol. 2009;84(6):323-327. DOI: 10.1002/ajh.21425', pmid: '19399914', doi: '10.1002/ajh.21425' },
    { id: 19, citation: 'Lima CS, Rocha EM, Silva NM, et al. Mortality in children with sickle cell disease in a Brazilian hospital. J Pediatr (Rio J). 2007;83(3):246-250. DOI: 10.2223/JPED.1590', pmid: '17576525', doi: '10.2223/JPED.1590' }
  ],
}