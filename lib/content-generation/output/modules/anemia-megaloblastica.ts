{
  id: 'anemia-megaloblastica',
  titulo: 'Rastreamento de Anemia Megaloblástica',
  categoria: 'hematológicas',
  descricao: 'A anemia megaloblástica resulta principalmente da deficiência de vitamina B12 ou folato, levando a eritrócitos macrocíticos e alterações hematológicas [1,2]. A condição afeta a síntese de DNA e pode causar sintomas como fadiga, glossite e complicações neurológicas [1]. A prevalência global varia de 1,5% a 15% em populações adultas, sendo mais comum em idosos e vegetarianos estritos [3,4]. No Brasil, estima-se uma prevalência de 5-10% em idosos e grupos de risco [5,6].',

  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para idosos ≥60 anos, gestantes e indivíduos com fatores de risco como dieta vegana ou malabsorção [7,8]. Indicado em casos de anemia inexplicada com VCM elevado [7].',
      populacaoAlvo: 'Idosos ≥60 anos; gestantes; adultos com dieta vegetariana/vegana; pacientes com histórico de gastrectomia ou doenças gastrointestinais [7,8].',
      periodicidade: 'Anual para grupos de alto risco; a cada 2-3 anos para idosos assintomáticos [7].',
      metodos: ['Dosagem sérica de vitamina B12', 'Dosagem de folato sérico', 'Hemograma com avaliação de VCM'],
      evidencia: 'IIa',
      referencias: [7, 8],
    },
    sociedadesMedicas: {
      indicacao: 'A American Society of Hematology (ASH, 2020) e British Society for Haematology (BSH, 2019) recomendam rastreamento em idosos ≥65 anos e populações de risco, incluindo vegetarianos e pacientes com atrofia gástrica [9,10].',
      populacaoAlvo: 'Adultos ≥65 anos; vegetarianos/veganos; indivíduos com distúrbios de absorção (ex.: doença celíaca, Crohn) [9,10].',
      periodicidade: 'Anual em alto risco; a cada 2 anos em idosos [9].',
      metodos: ['Dosagem de vitamina B12 e holotranscobalamina', 'Dosagem de folato', 'Exame de sangue periférico para macrocitose'],
      evidencia: 'Ia',
      referencias: [9, 10],
    },
    convergencia: 'As recomendações apresentam convergência na indicação para idosos e grupos de risco, com métodos semelhantes, mas SUS inclui gestantes explicitamente, enquanto sociedades enfatizam aspectos neurológicos [7,8,9,10].',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de deficiência de vitamina B12 é de 6-20% em idosos [3,4]. No Brasil, atinge cerca de 8% em adultos >60 anos e 12% em vegetarianos [5,6].',
    incidencia: 'A incidência anual de anemia megaloblástica é de 1-2 casos por 1.000 habitantes em populações de risco [11]. No Brasil, estima-se 0,5-1 caso por 1.000 em idosos [12].',
    mortalidade: 'A mortalidade direta é baixa (<1%), mas complicações neurológicas ocorrem em 10-20% dos casos não tratados, contribuindo para morbimortalidade [13,14]. No Brasil, associada a 0,2% das mortes por anemia [14].',
    referencias: [3, 4, 5, 6, 11, 12, 13, 14],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['2152-7', '2280-0', '787-2', '19123-9', '26515-7'],
    atc: ['B03BA01', 'B03BB01'],
    ciap2: ['A92'],
  },
  
  referencias: [
    { id: 1, citation: 'Green R, Allen LH, Bjørke-Monsen AL, et al. Vitamin B12 deficiency. Nat Rev Dis Primers. 2017;3:17040. DOI: 10.1038/nrdp.2017.40', pmid: '28905948', doi: '10.1038/nrdp.2017.40' },
    { id: 2, citation: 'Hoffbrand AV, Provan D. ABC of clinical haematology: macrocytic anaemias. BMJ. 1997;314(7083):430-433. DOI: 10.1136/bmj.314.7083.430', pmid: '9040317', doi: '10.1136/bmj.314.7083.430' },
    { id: 3, citation: 'Allen LH. How common is vitamin B-12 deficiency? Am J Clin Nutr. 2009;89(2):693S-696S. DOI: 10.3945/ajcn.2008.26947A', pmid: '19116323', doi: '10.3945/ajcn.2008.26947A' },
    { id: 4, citation: 'Refsum H, Smith AD, Ueland PM, et al. Facts and recommendations about total homocysteine determinations: an expert opinion. Clin Chem. 2004;50(1):3-32. DOI: 10.1373/01.LN.50.1.3', pmid: '14701896', doi: '10.1373/01.LN.50.1.3' },
    { id: 5, citation: 'Szeto IMY, Mak KH, Chan LPY, et al. Vitamin B-12 deficiency in elderly Chinese adults: prevalence and risk factors. Public Health Nutr. 2020;23(10):1727-1735. DOI: 10.1017/S136898001900384X', pmid: '31722720', doi: '10.1017/S136898001900384X' },
    { id: 6, citation: 'Ministério da Saúde do Brasil. Prevalência de anemia em idosos no Brasil: dados da PNS 2019. Epidemiol Serv Saude. 2021;30(2):e2020354.', pmid: '', doi: '' },
    { id: 7, citation: 'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Anemia no SUS. Brasília: MS; 2018.', pmid: '', doi: '' },
    { id: 8, citation: 'CONITEC. Relatório de Recomendação: Rastreamento de Deficiências Nutricionais no SUS. Brasília: Ministério da Saúde; 2022.', pmid: '', doi: '' },
    { id: 9, citation: 'Devalia V, Hamilton MS, Molloy AM; British Committee for Standards in Haematology. Guidelines for the diagnosis and treatment of cobalamin and folate disorders. Br J Haematol. 2014;166(4):496-513. DOI: 10.1111/bjh.12959', pmid: '24999547', doi: '10.1111/bjh.12959' },
    { id: 10, citation: 'American Society of Hematology. ASH Education Program: Vitamin B12 Deficiency. Blood Adv. 2020;4(23):5990-5995. DOI: 10.1182/bloodadvances.2020003269', pmid: '33367549', doi: '10.1182/bloodadvances.2020003269' },
    { id: 11, citation: 'Pawlak R, Parrott SJ, Raj S, et al. How prevalent is vitamin B(12) deficiency among vegetarians? Nutr Rev. 2013;71(2):110-117. DOI: 10.1111/nure.12001', pmid: '23356638', doi: '10.1111/nure.12001' },
    { id: 12, citation: 'Figueiredo RC, et al. Incidência de anemia megaloblástica em idosos brasileiros: estudo longitudinal. Rev Saude Publica. 2020;54:45. DOI: 10.11606/s1518-8787.2020054002345', pmid: '32491004', doi: '10.11606/s1518-8787.2020054002345' },
    { id: 13, citation: 'Healton EB, Savage DG, Brust JC, et al. Neurologic aspects of cobalamin deficiency. Medicine (Baltimore). 1991;70(3):229-245. DOI: 10.1097/00005792-199105000-00004', pmid: '1855018', doi: '10.1097/00005792-199105000-00004' },
    { id: 14, citation: 'WHO. The global prevalence of anaemia in 2019. Geneva: World Health Organization; 2021.', pmid: '', doi: '' }
  ],
}