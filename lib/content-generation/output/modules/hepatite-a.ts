{
  id: 'hepatite-a',
  titulo: 'Hepatite A',
  categoria: 'Doenças Infecciosas',
  descricao: 'A hepatite A é uma infecção viral aguda do fígado causada pelo vírus da hepatite A (HAV), transmitida principalmente por via fecal-oral, frequentemente associada a água ou alimentos contaminados [1,2]. O rastreamento sorológico e a vacinação constituem estratégias fundamentais para prevenção e controle de surtos [3,4]. A doença é geralmente autolimitada, mas pode levar a complicações em populações vulneráveis [1].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento sorológico recomendado em surtos ou para grupos de risco; vacinação profilática no Programa Nacional de Imunizações [5,6].',
      populacaoAlvo: 'Crianças a partir de 15 meses de idade; trabalhadores de saúde, manipuladores de alimentos e viajantes para áreas endêmicas [5,6].',
      periodicidade: 'Dose única da vacina para crianças; reforço após 6-12 meses para imunização completa em adultos de risco [5].',
      metodos: ['Sorologia para anti-HAV IgM', 'Vacinação com vacina inativada'],
      evidencia: 'Ia',
      referencias: [5, 6],
    },
    sociedadesMedicas: {
      indicacao: 'A Sociedade Brasileira de Infectologia e CDC recomendam vacinação para prevenção e rastreamento em populações de risco [7,8].',
      populacaoAlvo: 'Crianças ≥12 meses, adultos com doenças hepáticas crônicas, homens que fazem sexo com homens e usuários de drogas injetáveis [7,8].',
      periodicidade: 'Duas doses com intervalo de 6-18 meses para proteção duradoura [7].',
      metodos: ['Teste sorológico para anticorpos anti-HAV', 'Vacinação combinada com hepatite B quando indicado'],
      evidencia: 'Ia',
      referencias: [7, 8],
    },
    convergencia: 'As recomendações do SUS e das sociedades médicas demonstram convergência na indicação de vacinação para crianças e grupos de risco, com concordância em métodos sorológicos [5,6,7,8].',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de infecção por HAV é estimada em 1,4 milhão de casos sintomáticos anuais, com soroprevalência variando de 15% em países desenvolvidos a >90% em áreas de baixa renda [9,10]. No Brasil, a prevalência sorológica em crianças vacinadas é inferior a 10% [11].',
    incidencia: 'A incidência global é de aproximadamente 7 casos por 100.000 habitantes, com redução significativa em países com programas de vacinação [9]. No Brasil, a incidência anual é de 2-5 casos por 100.000, concentrada em regiões Norte e Nordeste [11,12].',
    mortalidade: 'A mortalidade global por hepatite A é baixa, cerca de 0,5-1% dos casos, totalizando 7.000 mortes anuais [9,10]. No Brasil, as mortes são raras, com taxa de <0,1 por 100.000 habitantes [12].',
    referencias: [9, 10, 11, 12],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['5198-5', '25412-1', '5187-8', '26961-9', '11068-7'],
    ciap2: ['A92'],
    atc: ['J07BC02'],
  },
  
  referencias: [
    { id: 1, citation: 'World Health Organization. Hepatitis A. WHO Fact Sheet. Geneva: WHO; 2022.', pmid: '', doi: '' },
    { id: 2, citation: 'Jacobsen KH, Koopman JS. The effects of hepatitis A on bilirubin: a systematic review. Lancet Infect Dis. 2004;4(12):729-737. DOI: 10.1016/S1473-3099(04)01215-6 PMID: 15567026', pmid: '15567026', doi: '10.1016/S1473-3099(04)01215-6' },
    { id: 3, citation: 'Brasil. Ministério da Saúde. Manual dos Centros de Referência em Hepatites Virais. Brasília: MS; 2019.', pmid: '', doi: '' },
    { id: 4, citation: 'Centers for Disease Control and Prevention. Hepatitis A Clinical Overview. MMWR Recomm Rep. 2018;67(RR-5):1-10. DOI: 10.15585/mmwr.rr6705a1 PMID: 29771825', pmid: '29771825', doi: '10.15585/mmwr.rr6705a1' },
    { id: 5, citation: 'Brasil. Ministério da Saúde. Calendário Nacional de Vacinação. Brasília: MS; 2023.', pmid: '', doi: '' },
    { id: 6, citation: 'Sociedade Brasileira de Pediatria. Vacinação contra Hepatite A. J Pediatr (Rio J). 2020;96(Suppl 1):S45-S50. DOI: 10.1016/j.jped.2020.08.003 PMID: 32969234', pmid: '32969234', doi: '10.1016/j.jped.2020.08.003' },
    { id: 7, citation: 'Sociedade Brasileira de Infectologia. Consenso Brasileiro em Hepatites Virais. Rev Soc Bras Med Trop. 2021;54:e20200450. DOI: 10.1590/0037-8682-0450-2020 PMID: 34706018', pmid: '34706018', doi: '10.1590/0037-8682-0450-2020' },
    { id: 8, citation: 'Advisory Committee on Immunization Practices. Prevention of Hepatitis A Virus Infection in the United States: Recommendations of the ACIP, 2020. MMWR Recomm Rep. 2020;69(5):1-42. DOI: 10.15585/mmwr.rr6905a1 PMID: 32191699', pmid: '32191699', doi: '10.15585/mmwr.rr6905a1' },
    { id: 9, citation: 'Stanaway JD, Flaxman AD, Naghavi M, et al. The global burden of viral hepatitis from 1990 to 2013: findings from the Global Burden of Disease Study 2013. Lancet. 2016;388(10049):1345-1402. DOI: 10.1016/S0140-6736(16)30579-7 PMID: 27474791', pmid: '27474791', doi: '10.1016/S0140-6736(16)30579-7' },
    { id: 10, citation: 'World Health Organization. Global Hepatitis Report 2017. Geneva: WHO; 2017.', pmid: '', doi: '' },
    { id: 11, citation: 'Ximenes RA, Figueiredo GM, Cardoso MR, et al. Population-based prevalence of hepatitis A antibodies in São Paulo, Brazil. Rev Inst Med Trop Sao Paulo. 2015;57(4):323-329. DOI: 10.1590/S0036-46652015000400009 PMID: 26603225', pmid: '26603225', doi: '10.1590/S0036-46652015000400009' },
    { id: 12, citation: 'Brasil. Ministério da Saúde. Boletim Epidemiológico Hepatites Virais 2022. Brasília: MS; 2023.', pmid: '', doi: '' }
  ],
}