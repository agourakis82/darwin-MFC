{
  id: 'anemia-ferropriva',
  titulo: 'Rastreamento de Anemia por Deficiência de Ferro',
  categoria: 'populacoes-vulneraveis',
  descricao: 'A anemia por deficiência de ferro é a forma mais comum de anemia, afetando principalmente crianças e gestantes [1,2]. Globalmente, afeta cerca de 1,2 bilhão de pessoas, com prevalência de 30% em crianças pré-escolares [3,4]. No Brasil, a prevalência em crianças de 6 meses a 5 anos é de 20,9% [5,6]. O rastreamento precoce permite intervenção nutricional e suplementação [7,8].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para crianças de 6 meses a 5 anos e gestantes no pré-natal [9,10]. Indicado em populações de risco como baixa renda e regiões endêmicas [9,10].',
      populacaoAlvo: 'Crianças de 6 meses a 5 anos; gestantes; puérperas [9,10].',
      periodicidade: 'Anual para crianças em áreas de alta prevalência; no primeiro e terceiro trimestres para gestantes [9]. Semestral em casos de risco [10].',
      metodos: ['Dosagem de hemoglobina', 'Ferritina sérica', 'Hemograma completo'],
      evidencia: 'Ia',
      referencias: [9, 10],
    },
    sociedadesMedicas: {
      indicacao: 'A Organização Mundial da Saúde (OMS, 2020) recomenda rastreamento em crianças <5 anos e gestantes em regiões com prevalência >20% [11,12]. A American Society of Hematology (ASH, 2021) endossa triagem em grupos de risco [11,12].',
      populacaoAlvo: 'Crianças <5 anos; gestantes; mulheres em idade fértil com menorragia [11,12].',
      periodicidade: 'Anual em populações de risco; durante pré-natal [11]. Avaliação individualizada para adultos [12].',
      metodos: ['Hemoglobina', 'Ferritina', 'Transferrina saturada'],
      evidencia: 'Ia',
      referencias: [11, 12],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'Prevalência global de 25% em pré-escolares e 40% em gestantes [3,4]. No Brasil, 20,9% em crianças e 15-20% em gestantes [5,6].',
    incidencia: 'Incidência anual global de 50-100 casos por 1.000 crianças em risco [13,14]. No Brasil, cerca de 10-15% de novas detecções em pré-natal [15].',
    mortalidade: 'Contribui para 800.000 mortes anuais globalmente, principalmente em crianças [16,17]. No Brasil, associada a 5% das mortes maternas [18].',
    referencias: [3, 4, 5, 6, 13, 14, 15, 16, 17, 18],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['718-7', '4544-3', '2500-6', '42735-8', '19123-9'],
    ciap2: ['A95', 'A96', 'D98'],
    atc: ['B03AD01', 'B03AA05', 'B03AB03'],
  },
  
  referencias: [
    { id: 1, citation: 'Pasricha SR, Tye-Din J, Muckenthaler MU, Swinkels DW. Iron deficiency. Lancet. 2021;397(10270):233-248. DOI: 10.1016/S0140-6736(20)32594-0 PMID: 33485430', pmid: '33485430', doi: '10.1016/S0140-6736(20)32594-0' },
    { id: 2, citation: 'Lopez A, Cacoub P, Macdougall IC, Peyrin-Biroulet L. Iron deficiency anaemia. Lancet. 2016;387(10021):907-916. DOI: 10.1016/S0140-6736(15)60865-0 PMID: 26314490', pmid: '26314490', doi: '10.1016/S0140-6736(15)60865-0' },
    { id: 3, citation: 'WHO. The global prevalence of anaemia in 2019: a systematic analysis. Geneva: World Health Organization; 2021.', pmid: '', doi: '' },
    { id: 4, citation: 'Stevens GA, Finucane MM, De Regil LM, et al. Global, regional, and national trends in hemoglobin concentration and prevalence of total and severe anemia in children and pregnant and non-pregnant women for 1995-2011: a systematic analysis of population-representative data. Lancet Glob Health. 2013;1(1):e16-e25. DOI: 10.1016/S2214-109X(13)70001-9 PMID: 25104482', pmid: '25104482', doi: '10.1016/S2214-109X(13)70001-9' },
    { id: 5, citation: 'Ministério da Saúde do Brasil. Pesquisa Nacional de Saúde 2019: prevalência de anemia em crianças. Brasília: MS; 2020.', pmid: '', doi: '' },
    { id: 6, citation: 'Muniz PT, Castro TG, Araujo TS, et al. Prevalence of anemia and associated factors in children aged 6-59 months in Brazil. Rev Saude Publica. 2015;49:73. DOI: 10.1590/S0034-8910.2015049005503 PMID: 26270009', pmid: '26270009', doi: '10.1590/S0034-8910.2015049005503' },
    { id: 7, citation: 'Baker RD, Greer FR; Committee on Nutrition, American Academy of Pediatrics. Diagnosis and prevention of iron deficiency and iron-deficiency anemia in infants and young children (0-3 years of age). Pediatrics. 2010;126(5):1040-1050. DOI: 10.1542/peds.2010-2576 PMID: 20956481', pmid: '20956481', doi: '10.1542/peds.2010-2576' },
    { id: 8, citation: 'Stoffel NU, Cercamondi CI, Brittenham G, et al. Iron absorption from oral iron supplements given on consecutive versus alternate days and as single morning doses versus twice-daily split dosing in iron-depleted women: two open-label, randomised controlled trials. Lancet Haematol. 2017;4(11):e524-e533. DOI: 10.1016/S2352-3026(17)30182-1 PMID: 28970771', pmid: '28970771', doi: '10.1016/S2352-3026(17)30182-1' },
    { id: 9, citation: 'Ministério da Saúde do Brasil. Protocolo de Atenção Básica: Anemia em Crianças e Gestantes. Brasília: MS; 2012.', pmid: '', doi: '' },
    { id: 10, citation: 'CONITEC. Relatório de Recomendação: Suplementação de Ferro no SUS. Brasília: Ministério da Saúde; 2015.', pmid: '', doi: '' },
    { id: 11, citation: 'WHO. WHO guideline on use of ferritin concentrations to assess iron status in individuals and populations. Geneva: World Health Organization; 2020.', pmid: '', doi: '' },
    { id: 12, citation: 'Auerbach M, Adamson JW. How we diagnose and treat iron deficiency anemia. Am J Hematol. 2016;91(1):31-38. DOI: 10.1002/ajh.24201 PMID: 26408108', pmid: '26408108', doi: '10.1002/ajh.24201' },
    { id: 13, citation: 'Gera T, Sachdev HP. Effect of iron supplementation on incidence of infectious disease in children: systematic review. BMJ. 2002;325(7373):1142. DOI: 10.1136/bmj.325.7373.1142 PMID: 12446566', pmid: '12446566', doi: '10.1136/bmj.325.7373.1142' },
    { id: 14, citation: 'Imdad A, Yakoob MY, Bhutta ZA. Impact of routine iron supplementation with or without folic acid on anemia during pregnancy. BMC Public Health. 2011;11 Suppl 3(Suppl 3):S10. DOI: 10.1186/1471-2458-11-S3-S10 PMID: 21676242', pmid: '21676242', doi: '10.1186/1471-2458-11-S3-S10' },
    { id: 15, citation: 'Figueiredo ACM, Oliveira LB, Ramalho A. Prevalência de anemia em gestantes atendidas no SUS no Brasil. Rev Bras Ginecol Obstet. 2018;40(5):251-258. DOI: 10.1055/s-0038-1642640 PMID: 29801129', pmid: '29801129', doi: '10.1055/s-0038-1642640' },
    { id: 16, citation: 'WHO. Global Health Estimates 2020: Disease burden by Cause, Age, Sex, by Country and by Region, 2000-2019. Geneva: World Health Organization; 2021.', pmid: '', doi: '' },
    { id: 17, citation: 'Kassebaum NJ, Jasrasaria R, Naghavi M, et al. A systematic analysis of global anemia burden from 1990 to 2010. Blood. 2014;123(5):615-624. DOI: 10.1182/blood-2013-06-508325 PMID: 24297872', pmid: '24297872', doi: '10.1182/blood-2013-06-508325' },
    { id: 18, citation: 'Ministério da Saúde do Brasil. Mortalidade Materna no Brasil: Dados 2020. Brasília: MS; 2022.', pmid: '', doi: '' }
  ],
}