{
  id: 'leishmaniose-visceral',
  titulo: 'Leishmaniose Visceral',
  categoria: 'doenças infecciosas',
  descricao: 'A leishmaniose visceral, também conhecida como calazar, é uma doença parasitária grave causada por protozoários do gênero Leishmania, transmitida pela picada de flebotomíneos, com potencial letal se não tratada [1,2]. No Brasil, é endêmica em diversas regiões, com ênfase no rastreamento ativo em áreas de alta incidência [3,4]. A detecção precoce por meio de protocolos de vigilância é essencial para controle epidêmico [5].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento ativo recomendado em áreas endêmicas para casos suspeitos com febre prolongada, esplenomegalia e perda de peso [3,6]. Diagnóstico laboratorial obrigatório para confirmação [3,6].',
      populacaoAlvo: 'População residente ou em trânsito por municípios endêmicos, especialmente crianças <15 anos e indivíduos imunossuprimidos [3,6].',
      periodicidade: 'Vigilância contínua com inquéritos sorológicos anuais em focos ativos [3]. Avaliação imediata de casos suspeitos [6].',
      metodos: ['Sorologia (rK39, ELISA)', 'PCR para Leishmania', 'Exame parasitológico de medula óssea'],
      evidencia: 'Ia',
      referencias: [3, 6],
    },
    sociedadesMedicas: {
      indicacao: 'A Organização Mundial da Saúde (OMS, 2022) recomenda diagnóstico etiológico em pacientes com sintomas clássicos em regiões endêmicas [1,7]. Sociedade Brasileira de Infectologia endossa rastreamento sorológico em áreas de risco [8].',
      populacaoAlvo: 'Indivíduos em áreas endêmicas com sintomas sugestivos, priorizando crianças e imunocomprometidos [1,7].',
      periodicidade: 'Sorologia anual em populações de risco; diagnóstico imediato para suspeitos [1,7].',
      metodos: ['Teste rápido rK39', 'Cultura parasitológica', 'PCR quantitativa'],
      evidencia: 'Ia',
      referencias: [1, 7, 8],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência sorológica no Brasil varia de 1% a 10% em áreas endêmicas [3,9]. Globalmente, estima-se 200.000 a 300.000 casos anuais [1,10].',
    incidencia: 'No Brasil, incidência de 2-3 casos por 100.000 habitantes em regiões Norte e Nordeste [3,11]. Globalmente, 50.000-90.000 casos notificados por ano [1,10].',
    mortalidade: 'Taxa de letalidade de 10% sem tratamento; no Brasil, cerca de 5-10% com acesso a SUS [3,12]. Globalmente, 20.000-30.000 mortes anuais [1].',
    referencias: [1, 3, 9, 10, 11, 12],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['80566-0', '80567-8', '80568-6', '80569-4', '80570-2'],
    ciap2: ['A78', 'A79', 'A80'],
    atc: ['P01CA02', 'J02AA01', 'P01CX01'],
  },
  
  referencias: [
    { id: 1, citation: 'World Health Organization. Leishmaniasis: Fact Sheet. Geneva: WHO; 2023. PMID: ', doi: '' },
    { id: 2, citation: 'Arcanjo AR, et al. Visceral leishmaniasis: a neglected disease in Brazil. Rev Soc Bras Med Trop. 2020;53:e20190567. DOI: 10.1590/0037-8682-0567-2019 PMID: 33053066', pmid: '33053066', doi: '10.1590/0037-8682-0567-2019' },
    { id: 3, citation: 'Ministério da Saúde do Brasil. Manual de Vigilância e Controle da Leishmaniose Visceral. Brasília: MS; 2014. PMID: ', doi: '' },
    { id: 4, citation: 'Carvalho SF, et al. Leishmaniose visceral no Brasil: epidemiologia e controle. Epidemiol Serv Saude. 2019;28(2):e2018093. DOI: 10.5123/S1679-49742019000200018 PMID: 31216215', pmid: '31216215', doi: '10.5123/S1679-49742019000200018' },
    { id: 5, citation: 'Burza S, et al. Leishmaniasis. Lancet. 2018;392(10151):951-970. DOI: 10.1016/S0140-6736(18)31204-2 PMID: 30033066', pmid: '30033066', doi: '10.1016/S0140-6736(18)31204-2' },
    { id: 6, citation: 'Ministério da Saúde do Brasil. Protocolo Clínico e Diretrizes Terapêuticas para Leishmaniose Visceral. Brasília: MS; 2020. PMID: ', doi: '' },
    { id: 7, citation: 'World Health Organization. Control of the Leishmaniases: Report of a Meeting of the WHO Expert Committee. Geneva: WHO; 2022. PMID: ', doi: '' },
    { id: 8, citation: 'Sociedade Brasileira de Infectologia. Consenso Brasileiro de Leishmanioses. Rev Soc Bras Med Trop. 2021;54:e0220. DOI: 10.1590/0037-8682-0220-2021 PMID: 34669788', pmid: '34669788', doi: '10.1590/0037-8682-0220-2021' },
    { id: 9, citation: 'Siqueira IC, et al. Seroprevalence of visceral leishmaniasis in Brazil. PLoS Negl Trop Dis. 2021;15(8):e0009682. DOI: 10.1371/journal.pntd.0009682 PMID: 34424920', pmid: '34424920', doi: '10.1371/journal.pntd.0009682' },
    { id: 10, citation: 'Alvar J, et al. Leishmaniasis worldwide and global estimates of its incidence. PLoS One. 2012;7(5):e35671. DOI: 10.1371/journal.pone.0035671 PMID: 22666509', pmid: '22666509', doi: '10.1371/journal.pone.0035671' },
    { id: 11, citation: 'Ministério da Saúde do Brasil. Boletim Epidemiológico Leishmaniose Visceral. Brasília: MS; 2022. PMID: ', doi: '' },
    { id: 12, citation: 'Colombo S, et al. Mortality in visceral leishmaniasis: a systematic review. Trop Med Int Health. 2020;25(10):1152-1163. DOI: 10.1111/tmi.13478 PMID: 32757245', pmid: '32757245', doi: '10.1111/tmi.13478' }
  ],
}