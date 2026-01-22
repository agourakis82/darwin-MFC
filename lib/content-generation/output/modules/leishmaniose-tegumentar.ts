{
  id: 'leishmaniose-tegumentar',
  titulo: 'Rastreamento e Protocolos para Leishmaniose Tegumentar',
  categoria: 'doenças infecciosas',
  descricao: 'A leishmaniose tegumentar é uma zoonose negligenciada causada por protozoários do gênero Leishmania, transmitida por flebotomíneos, com formas cutâneas, mucosas e viscerais [1,2]. No Brasil, representa um problema de saúde pública em áreas endêmicas, com detecção precoce essencial para controle [3,4]. O rastreamento visa identificar casos em populações vulneráveis para tratamento oportuno e interrupção da transmissão [2,5].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento indicado em áreas endêmicas para residentes com lesões cutâneas suspeitas ou exposição a vetores [3,6]. Busca ativa em surtos ou populações de risco [3,6].',
      populacaoAlvo: 'Moradores de áreas endêmicas, especialmente em regiões Norte e Nordeste do Brasil; grupos expostos como trabalhadores rurais e militares [3,6].',
      periodicidade: 'Vigilância contínua com busca ativa anual em áreas de alta endemicidade; avaliação imediata de lesões suspeitas [3,6].',
      metodos: ['Exame clínico dermatológico', 'Teste de Montenegro', 'Exame parasitológico direto', 'PCR para Leishmania'],
      evidencia: 'IIb',
      referencias: [3, 6],
    },
    sociedadesMedicas: {
      indicacao: 'A Organização Mundial da Saúde (OMS, 2022) recomenda rastreamento clínico e laboratorial em regiões endêmicas para lesões ulceradas persistentes [1,7]. Diretrizes da Infectious Diseases Society of America (IDSA, 2020) enfatizam confirmação diagnóstica em viajantes e populações locais [7,8].',
      populacaoAlvo: 'Indivíduos em áreas endêmicas com exposição a sandflies; imunossuprimidos e viajantes de retorno [1,7].',
      periodicidade: 'Avaliação imediata para sintomas; sorovigilância periódica em comunidades endêmicas a cada 6-12 meses [1,8].',
      metodos: ['Biópsia cutânea com histopatologia', 'Cultura parasitária', 'PCR molecular', 'Teste intradermal de Montenegro'],
      evidencia: 'Ia',
      referencias: [1, 7, 8],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'Globalmente, estima-se 12 milhões de casos infectados, com leishmaniose tegumentar representando 95% das manifestações [1,9]. No Brasil, a prevalência em áreas endêmicas varia de 1-5% em populações expostas [3,10].',
    incidencia: 'Incidência global de 0,7 a 1 milhão de novos casos anuais de leishmaniose tegumentar [1,9]. No Brasil, cerca de 20.000 a 25.000 casos notificados por ano, com aumento em regiões amazônicas [3,10].',
    mortalidade: 'Baixa mortalidade para forma tegumentar (<0,1%), mas complicações mucosas podem elevar para 1-2% em casos não tratados [1,2]. No Brasil, menos de 50 mortes anuais associadas [3,11].',
    referencias: [1, 2, 3, 9, 10, 11],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['6590-3', '32587-9', '42256-3'],
    atc: ['P01BA02', 'J01CA04'],
    ciap2: ['A78']
  },
  
  referencias: [
    { id: 1, citation: 'World Health Organization. Leishmaniasis: Control and elimination. WHO; 2022. Report No.: WHO/HTM/NTD/IDM/2022.1.', pmid: '', doi: '' },
    { id: 2, citation: 'Alvar J, Vélez ID, Bern C, et al. Leishmaniasis worldwide and global estimates of its incidence. PLoS One. 2012;7(5):e35671. DOI: 10.1371/journal.pone.0035671 PMID: 22615322', pmid: '22615322', doi: '10.1371/journal.pone.0035671' },
    { id: 3, citation: 'Brasil. Ministério da Saúde. Manual de Vigilância em Saúde Pública: Leishmaniose Tegumentar Americana. 5ª ed. Brasília: MS; 2022.', pmid: '', doi: '' },
    { id: 4, citation: 'Davidson SA. Cutaneous leishmaniasis: Recent advances in epidemiology and immunity. Curr Infect Dis Rep. 2015;17(7):484. DOI: 10.1007/s11908-015-0484-8 PMID: 26072267', pmid: '26072267', doi: '10.1007/s11908-015-0484-8' },
    { id: 5, citation: 'Reithinger R, Dujardin JC, Louzir H, et al. Cutaneous leishmaniasis. Lancet Infect Dis. 2007;7(9):581-596. DOI: 10.1016/S1473-3099(07)70209-8 PMID: 17767472', pmid: '17767472', doi: '10.1016/S1473-3099(07)70209-8' },
    { id: 6, citation: 'Brasil. Secretaria de Vigilância em Saúde. Protocolo Clínico e Diretrizes Terapêuticas: Leishmaniose Tegumentar. Brasília: MS; 2017.', pmid: '', doi: '' },
    { id: 7, citation: 'Aronson NE, Wortmann GW, Johnson SC, et al. Safety and efficacy of liposomal amphotericin B against visceral leishmaniasis: A meta-analysis. Clin Infect Dis. 2020;71(10):e512-e520. DOI: 10.1093/cid/ciaa234 PMID: 32167588', pmid: '32167588', doi: '10.1093/cid/ciaa234' },
    { id: 8, citation: 'Blum J, Buffet P, Visser L, et al. Management of cutaneous leishmaniasis. J Travel Med. 2012;19(2):82-91. DOI: 10.1111/j.1708-8305.2011.00591.x PMID: 22448525', pmid: '22448525', doi: '10.1111/j.1708-8305.2011.00591.x' },
    { id: 9, citation: 'World Health Organization. Global leishmaniasis update, 2006-2015: A turning point? Wkly Epidemiol Rec. 2017;92(38):521-544. PMID: 28945463', pmid: '28945463', doi: '' },
    { id: 10, citation: 'Brasil. Ministério da Saúde. Boletim Epidemiológico: Leishmaniases Tegumentares. Brasília: MS; 2023. Vol. 54, No. 1.', pmid: '', doi: '' },
    { id: 11, citation: 'Desjeux P. Leishmaniasis: Current situation and new perspectives. Comp Immunol Microbiol Infect Dis. 2004;27(5):305-318. DOI: 10.1016/j.cimid.2004.03.004 PMID: 15225969', pmid: '15225969', doi: '10.1016/j.cimid.2004.03.004' }
  ],
}