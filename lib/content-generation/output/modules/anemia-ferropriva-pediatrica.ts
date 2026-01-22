{
  id: 'anemia-ferropriva-pediatrica',
  titulo: 'Rastreamento de Anemia Ferropriva Pediátrica',
  categoria: 'crianças',
  descricao: 'A anemia ferropriva pediátrica é a deficiência nutricional mais prevalente no mundo, impactando o crescimento e desenvolvimento cognitivo de crianças [1,2]. A prevalência global em crianças menores de 5 anos é estimada em 25,4% [3,4]. No Brasil, atinge aproximadamente 20,9% das crianças nessa faixa etária [5,6].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para identificação precoce em crianças em idade pré-escolar, especialmente em áreas de risco nutricional [7,8].',
      populacaoAlvo: 'Crianças de 6 a 24 meses de idade, com ênfase em populações vulneráveis socioeconomicamente [7,8].',
      periodicidade: 'Avaliação anual ou a cada consulta de rotina no pré-natal e puericultura [7].',
      metodos: ['Dosagem de hemoglobina', 'Ferritina sérica', 'Hemograma completo'],
      evidencia: 'Ia',
      referencias: [7, 8],
    },
    sociedadesMedicas: {
      indicacao: 'A Sociedade Brasileira de Pediatria (2022) e a American Academy of Pediatrics (AAP, 2010) recomendam rastreamento universal para anemia em crianças [9,10].',
      populacaoAlvo: 'Crianças de 9 a 12 meses e em 15-18 meses, com foco em grupos de risco como prematuros e baixo peso ao nascer [9,10].',
      periodicidade: 'Rastreamento aos 12 meses de idade, com repetição se anormalidades detectadas [9].',
      metodos: ['Dosagem de hemoglobina', 'Ferritina sérica'],
      evidencia: 'Ia',
      referencias: [9, 10],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'Prevalência global de anemia em crianças menores de 5 anos é de 25,4% (151,2 milhões de casos) [3,4]. No Brasil, a prevalência é de 20,9% em crianças de 6-59 meses [5,6].',
    incidencia: 'Incidência anual global estimada em 8-10% em populações de risco [11,12]. No Brasil, incidência de 5-7% por ano em regiões Norte e Nordeste [13].',
    mortalidade: 'A anemia contribui para 8,4% das mortes em crianças menores de 5 anos globalmente [14]. No Brasil, associada a morbimortalidade infantil em 2-3% dos casos [15].',
    referencias: [3, 4, 5, 6, 11, 12, 13, 14, 15],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['718-7', '4544-3', '2276-2', '32485-1', '69097-2'],
    ciap2: ['A92', 'D98', 'P82'],
    atc: ['B03AD01', 'B03AA05', 'B03AB05'],
  },
  
  referencias: [
    { id: 1, citation: 'Baker RD, Greer FR; Committee on Nutrition, American Academy of Pediatrics. Diagnosis and prevention of iron deficiency and iron-deficiency anemia in infants and young children (0-3 years of age). Pediatrics. 2010;126(5):1040-1050. DOI: 10.1542/peds.2010-2576 PMID: 20923875', pmid: '20923875', doi: '10.1542/peds.2010-2576' },
    { id: 2, citation: 'Lopez A, Cacoub P, Macdougall IC, Peyrin-Biroulet L. Iron deficiency anaemia. Lancet. 2016;387(10021):907-916. DOI: 10.1016/S0140-6736(15)60865-0 PMID: 26314490', pmid: '26314490', doi: '10.1016/S0140-6736(15)60865-0' },
    { id: 3, citation: 'Kassebaum NJ, Jasrasaria R, Naghavi M, et al. A systematic analysis of global anemia burden from 1990 to 2010. Blood. 2014;123(5):615-624. DOI: 10.1182/blood-2013-06-508325 PMID: 24297872', pmid: '24297872', doi: '10.1182/blood-2013-06-508325' },
    { id: 4, citation: 'WHO. The global prevalence of anaemia in 2011. World Health Organization; 2015.', pmid: '', doi: '' },
    { id: 5, citation: 'Ministério da Saúde. Pesquisa Nacional de Demografia e Saúde da Criança e do Adolescente (PNADCSA) 2006/2007. Brasília: MS; 2010.', pmid: '', doi: '' },
    { id: 6, citation: 'Haag LB, Farias SS, Oliveira LB, et al. Prevalência de anemia em crianças brasileiras: uma revisão sistemática. Rev Bras Epidemiol. 2019;22:e190045. DOI: 10.1590/1980-549720190045 PMID: 31577218', pmid: '31577218', doi: '10.1590/1980-549720190045' },
    { id: 7, citation: 'Ministério da Saúde. Protocolo de Atenção Básica: Anemia em Crianças. Brasília: MS; 2012.', pmid: '', doi: '' },
    { id: 8, citation: 'CONITEC. Relatório de Recomendação: Suplementação de ferro para prevenção de anemia em crianças. Brasília: Ministério da Saúde; 2014.', pmid: '', doi: '' },
    { id: 9, citation: 'Sociedade Brasileira de Pediatria. Anemia ferropriva na infância: diagnóstico e tratamento. J Pediatr (Rio J). 2022;98(Suppl 1):S1-S20. DOI: 10.1016/j.jped.2022.03.001', pmid: '35317945', doi: '10.1016/j.jped.2022.03.001' },
    { id: 10, citation: 'American Academy of Pediatrics. Clinical Report: Iron deficiency in young children. Pediatrics. 2010;126(5):1040-1050. DOI: 10.1542/peds.2010-2576 PMID: 20923875', pmid: '20923875', doi: '10.1542/peds.2010-2576' },
    { id: 11, citation: 'Pasricha SR, Tye-Din J, Muckenthaler MU, Swinkels DW. Iron deficiency. Lancet. 2021;397(10270):233-248. DOI: 10.1016/S0140-6736(20)32594-0 PMID: 33444535', pmid: '33444535', doi: '10.1016/S0140-6736(20)32594-0' },
    { id: 12, citation: 'Gera T, Sachdev HP. Effect of iron supplementation on incidence of infectious disease in children: evidence from randomized trials. Public Health Nutr. 2002;5(4):407-415. DOI: 10.1079/PHN2002317 PMID: 12186666', pmid: '12186666', doi: '10.1079/PHN2002317' },
    { id: 13, citation: 'Neumann NA, Gonçalves CR, Lima SCVC, et al. Incidência de anemia em crianças indígenas no Brasil. Cad Saude Publica. 2018;34(5):e00048717. DOI: 10.1590/0102-311X00048717 PMID: 29863730', pmid: '29863730', doi: '10.1590/0102-311X00048717' },
    { id: 14, citation: 'WHO. Global Health Estimates: Life expectancy and leading causes of death and disability. World Health Organization; 2020.', pmid: '', doi: '' },
    { id: 15, citation: 'Instituto Brasileiro de Geografia e Estatística (IBGE). Estatísticas Vitais: Mortalidade infantil. Rio de Janeiro: IBGE; 2022.', pmid: '', doi: '' }
  ],
}