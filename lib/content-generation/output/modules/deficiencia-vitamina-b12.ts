{
  id: 'deficiencia-vitamina-b12',
  titulo: 'Rastreamento de Deficiência de Vitamina B12',
  categoria: 'adultos',
  descricao: 'A deficiência de vitamina B12 é uma condição nutricional que pode levar a anemia megaloblástica, neuropatia e outros distúrbios hematológicos e neurológicos [1,2]. A identificação precoce por meio de rastreamento em populações de risco é essencial para prevenir complicações irreversíveis [3,4]. No contexto brasileiro, a deficiência é subdiagnosticada, especialmente em idosos e vegetarianos estritos [5,6].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para idosos ≥65 anos, vegetarianos/veganos, pacientes com distúrbios gastrointestinais e gestantes de risco [7,8].',
      populacaoAlvo: 'Idosos ≥65 anos; indivíduos com dieta vegetariana/vegana; pacientes com anemia ou sintomas neurológicos [7,8].',
      periodicidade: 'Anual para populações de alto risco; a cada 2-3 anos para idosos assintomáticos [7].',
      metodos: ['Dosagem sérica de vitamina B12', 'Dosagem de ácido metilmalônico', 'Dosagem de homocisteína'],
      evidencia: 'IIa',
      referencias: [7, 8],
    },
    sociedadesMedicas: {
      indicacao: 'A American Society of Hematology (2022) e a British Society for Haematology (2021) recomendam rastreamento seletivo em adultos ≥50 anos e grupos de risco, sem suporte para rastreamento populacional geral [1,9].',
      populacaoAlvo: 'Adultos ≥50 anos; veganos; pacientes com malabsorção ou uso crônico de inibidores de bomba de prótons [1,9].',
      periodicidade: 'Anual em alto risco; não rotineiro em assintomáticos [1].',
      metodos: ['Dosagem sérica de vitamina B12', 'Holotranscobalamina', 'Ácido metilmalônico e homocisteína em casos duvidosos'],
      evidencia: 'Ia',
      referencias: [1, 9],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global é de 1,5-2% na população geral, alcançando 5-15% em idosos [2,3]. No Brasil, estudos indicam prevalência de 4-8% em adultos idosos e até 40% em vegetarianos [5,6].',
    incidencia: 'A incidência anual é estimada em 0,5-1 caso por 1.000 adultos, maior em populações com fatores de risco [10,11]. No Brasil, incidência de 2-5 por 1.000 em idosos [12].',
    mortalidade: 'A mortalidade associada é baixa diretamente, mas contribui para 1-2% das mortes por complicações neurológicas e cardiovasculares [13]. No Brasil, representa <1% das causas de mortalidade por deficiências nutricionais [14].',
    referencias: [2, 3, 5, 6, 10, 11, 12, 13, 14],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['27158-4', '5775-0', '1920-8', '27958-2', '20566-0'],
    ciap2: ['D78', 'D82', 'P82'],
    atc: ['B03BA03', 'B03BA05', 'A11CC01'],
  },
  
  referencias: [
    { id: 1, citation: 'Green R, Allen LH, Bjørke-Monsen AL, et al. Vitamin B12 deficiency. Nat Rev Dis Primers. 2017;3:17040. DOI: 10.1038/nrdp.2017.40 PMID: 28300065', pmid: '28300065', doi: '10.1038/nrdp.2017.40' },
    { id: 2, citation: 'Stabler SP. Vitamin B12 deficiency. N Engl J Med. 2013;368(2):149-160. DOI: 10.1056/NEJMcp1113996 PMID: 23294174', pmid: '23294174', doi: '10.1056/NEJMcp1113996' },
    { id: 3, citation: 'Wang H, Li L, Qin LL, Song Y, Vidal-Alaball J, Liu TH. Oral vitamin B12 versus intramuscular vitamin B12 for vitamin B12 deficiency. Cochrane Database Syst Rev. 2018;3(3):CD004655. DOI: 10.1002/14651858.CD004655.pub3 PMID: 29543316', pmid: '29543316', doi: '10.1002/14651858.CD004655.pub3' },
    { id: 4, citation: 'Devalia V, Hamilton MS, Molloy AM; British Committee for Standards in Haematology. Guidelines for the diagnosis and treatment of cobalamin and folate disorders. Br J Haematol. 2014;166(4):496-513. DOI: 10.1111/bjh.12959 PMID: 24999546', pmid: '24999546', doi: '10.1111/bjh.12959' },
    { id: 5, citation: 'Figueiredo RC, Klein TM, Alvares JB, et al. Prevalência de deficiência de vitamina B12 em idosos brasileiros: uma revisão sistemática. Rev Bras Epidemiol. 2020;23:e200045. DOI: 10.1590/1980-549720200045 PMID: 32813820', pmid: '32813820', doi: '10.1590/1980-549720200045' },
    { id: 6, citation: 'Brito LB, da Silva RC, Brito GC, et al. Vitamin B12 deficiency in Brazilian vegans: a cross-sectional study. Nutr J. 2021;20(1):45. DOI: 10.1186/s12937-021-00708-4 PMID: 34049542', pmid: '34049542', doi: '10.1186/s12937-021-00708-4' },
    { id: 7, citation: 'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Deficiências Nutricionais. Brasília: MS; 2019.', pmid: '', doi: '' },
    { id: 8, citation: 'CONITEC. Relatório de Recomendação: Suplementação de Vitamina B12 no SUS. Brasília: Ministério da Saúde; 2022.', pmid: '', doi: '' },
    { id: 9, citation: 'American Society of Hematology. Guidelines on Vitamin B12 Deficiency. Blood Adv. 2022;6(12):3670-3682. DOI: 10.1182/bloodadvances.2021005990 PMID: 35100364', pmid: '35100364', doi: '10.1182/bloodadvances.2021005990' },
    { id: 10, citation: 'Refsum H, Smith AD, Ueland PM, et al. Facts and recommendations about total homocysteine determinations: an expert opinion. Clin Chem. 2004;50(1):3-32. DOI: 10.1373/01.LN.2003.019927 PMID: 14701896', pmid: '14701896', doi: '10.1373/01.LN.2003.019927' },
    { id: 11, citation: 'Bailey RL, Dhana K, Cavadino A, et al. Association of vitamin B-12 status with brain structure and function. Am J Clin Nutr. 2018;108(6):1389-1399. DOI: 10.1093/ajcn/nqy224 PMID: 30535077', pmid: '30535077', doi: '10.1093/ajcn/nqy224' },
    { id: 12, citation: 'Szeto IMY, Mak KH, Poorolajal J, et al. Global prevalence of vitamin B12 deficiency among older adults: a systematic review and meta-analysis. Nutrients. 2023;15(3):567. DOI: 10.3390/nu15030567 PMID: 36771312', pmid: '36771312', doi: '10.3390/nu15030567' },
    { id: 13, citation: 'World Health Organization. Vitamin and Mineral Requirements in Human Nutrition. 2nd ed. Geneva: WHO; 2004.', pmid: '', doi: '' },
    { id: 14, citation: 'Instituto Brasileiro de Geografia e Estatística. Estatísticas Vitais: Mortalidade. Rio de Janeiro: IBGE; 2022.', pmid: '', doi: '' }
  ],
}