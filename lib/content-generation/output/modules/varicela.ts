{
  id: 'varicela',
  titulo: 'Rastreamento e Vacinação contra Varicela',
  categoria: 'criancas',
  descricao: 'A varicela, causada pelo vírus varicela-zoster (VZV), é uma doença exantemática altamente contagiosa, com potencial para complicações graves em imunossuprimidos [1,2]. O rastreamento de suscetibilidade e a vacinação constituem estratégias preventivas fundamentais, reduzindo a incidência em até 90% [3,4]. No Brasil, a introdução da vacina no SUS em 2013 impactou significativamente a epidemiologia [5,6].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Vacinação recomendada para prevenção primária da varicela em crianças saudáveis [7,8]. Rastreamento sorológico para suscetibilidade em profissionais de saúde e imunossuprimidos [7].',
      populacaoAlvo: 'Crianças a partir de 12 meses de idade; reforço aos 4 anos; gestantes suscetíveis e profissionais de saúde [7,8].',
      periodicidade: 'Duas doses: aos 15 meses e aos 4-6 anos [7]. Rastreamento sorológico conforme risco ocupacional [8].',
      metodos: ['Vacina viva atenuada (duas doses)', 'Sorologia IgG para VZV'],
      evidencia: 'Ia',
      referencias: [7, 8],
    },
    sociedadesMedicas: {
      indicacao: 'A American Academy of Pediatrics (AAP 2023) e CDC recomendam vacinação universal contra varicela para prevenção [9,10]. Rastreamento de imunidade em adultos de alto risco [9].',
      populacaoAlvo: 'Crianças ≥12 meses; adultos suscetíveis, especialmente imunossuprimidos e profissionais de saúde [9,10].',
      periodicidade: 'Duas doses com intervalo de 3 meses em crianças <13 anos; 4-8 semanas em adultos [9]. Sorologia para confirmação de imunidade [10].',
      metodos: ['Vacina varicela (duas doses)', 'Teste sorológico IgG anti-VZV'],
      evidencia: 'Ia',
      referencias: [9, 10],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'Pré-vacina, a seroprevalência global de anticorpos contra VZV era >90% em adultos [11,12]. No Brasil, antes de 2013, quase 100% das crianças eram infectadas até os 10 anos [13].',
    incidencia: 'Incidência global pré-vacinal: 4-5 casos/100.000 habitantes/ano em países desenvolvidos; no Brasil, >1 milhão de casos/ano pré-2013 [11,14]. Pós-vacina, redução de 85-95% [15].',
    mortalidade: 'Mortalidade global: 0,1-0,4/100.000 casos, com 100-150 mortes/ano nos EUA pré-vacina [16]. No Brasil, taxa de 0,02/100.000 habitantes em 2022 [17].',
    referencias: [11, 12, 13, 14, 15, 16, 17],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['41298-8', '41299-6', '51916-5', '24052008', '51921-5'],
    ciap2: ['A78', 'A79'],
    atc: ['J05AB01', 'J05AB11', 'J05AX'],
  },
  
  referencias: [
    { id: 1, citation: 'Arvin AM, Gilden D. Varicella-Zoster Virus. In: Knipe DM, Howley PM, eds. Fields Virology. 6th ed. Philadelphia: Lippincott Williams & Wilkins; 2013:2015-2057.', pmid: '', doi: '' },
    { id: 2, citation: 'Gershon AA, Breuer J, Cohen JI, et al. Varicella zoster virus infection. Nat Rev Dis Primers. 2015;1:15016. DOI: 10.1038/nrdp.2015.16 PMID: 27189058', pmid: '27189058', doi: '10.1038/nrdp.2015.16' },
    { id: 3, citation: 'Marin M, Güris D, Chaves SS, et al. Prevention of varicella: recommendations of the Advisory Committee on Immunization Practices (ACIP). MMWR Recomm Rep. 2007;56(RR-4):1-40. PMID: 17585291', pmid: '17585291', doi: '' },
    { id: 4, citation: 'Vázquez M. Varicella zoster virus infections. Adv Exp Med Biol. 2011;697:183-199. DOI: 10.1007/978-1-4419-7034-2_15 PMID: 21489330', pmid: '21489330', doi: '10.1007/978-1-4419-7034-2_15' },
    { id: 5, citation: 'Ministério da Saúde (Brasil). Calendário Nacional de Vacinação. Brasília: MS; 2023.', pmid: '', doi: '' },
    { id: 6, citation: 'Sartori ALCG, de Oliveira RS, et al. Impact of universal varicella vaccination in Brazil: a modeling study. BMC Infect Dis. 2021;21:1-10. DOI: 10.1186/s12879-021-05892-5', pmid: '', doi: '10.1186/s12879-021-05892-5' },
    { id: 7, citation: 'Ministério da Saúde (Brasil). Manual dos Centros de Referência para Imunobiológicos Especiais. 7th ed. Brasília: MS; 2020. PMID: ', pmid: '', doi: '' },
    { id: 8, citation: 'Brasil. Portaria GM/MS nº 3.391, de 13 de dezembro de 2013. Institui a vacina varicela no calendário vacinal do SUS. Diário Oficial da União; 2013.', pmid: '', doi: '' },
    { id: 9, citation: 'American Academy of Pediatrics. Varicella-Zoster Infections. In: Kimberlin DW, Barnett ED, Lynfield R, Sawyer MH, eds. Red Book: 2021 Report of the Committee on Infectious Diseases. 32nd ed. Itasca, IL: American Academy of Pediatrics; 2021:846-858.', pmid: '', doi: '' },
    { id: 10, citation: 'Marin M, Bialek SR, et al. Prevention of varicella-zoster virus infection. In: Hamborsky J, Kroger AT, Wolfe S, eds. Epidemiology and Prevention of Vaccine-Preventable Diseases. 13th ed. Washington DC: Public Health Foundation; 2015:361-376.', pmid: '', doi: '' },
    { id: 11, citation: 'Wutzler P, Färber I, et al. Varicella-zoster virus epidemiology - a changing scene? J Infect Dis. 2009;200(Suppl 3):S92-S98. DOI: 10.1086/644553 PMID: 19817634', pmid: '19817634', doi: '10.1086/644553' },
    { id: 12, citation: 'WHO. Varicella and herpes zoster vaccines: WHO position paper, July 2014. Wkly Epidemiol Rec. 2014;89(30):353-364. PMID: 25071922', pmid: '25071922', doi: '' },
    { id: 13, citation: 'Moura FR, et al. Seroprevalence of varicella-zoster virus in the city of São Paulo, Brazil. Rev Inst Med Trop Sao Paulo. 2016;58:36. DOI: 10.1590/S1678-9946201658036 PMID: 27304025', pmid: '27304025', doi: '10.1590/S1678-9946201658036' },
    { id: 14, citation: 'Burden of varicella in Brazil: a systematic review. Rev Saude Publica. 2019;53:65. DOI: 10.11606/s1518-8787.2019053001092 PMID: 31433015', pmid: '31433015', doi: '10.11606/s1518-8787.2019053001092' },
    { id: 15, citation: 'Leung J, Marin M. Update on trends in varicella mortality during the varicella vaccine era - United States, 1990-2016. Hum Vaccin Immunother. 2018;14(10):2659-2662. DOI: 10.1080/21645515.2018.1515467 PMID: 30230992', pmid: '30230992', doi: '10.1080/21645515.2018.1515467' },
    { id: 16, citation: 'Meyer PA, Seward JF. Varicella mortality in the United States, 2000-2005. Pediatr Infect Dis J. 2008;27(11):1013-1015. DOI: 10.1097/INF.0b013e31817fded6 PMID: 18833036', pmid: '18833036', doi: '10.1097/INF.0b013e31817fded6' },
    { id: 17, citation: 'DATASUS. Mortalidade por varicela no Brasil, 2010-2022. Ministério da Saúde; 2023. Disponível em: http://datasus.saude.gov.br.', pmid: '', doi: '' }
  ],
}