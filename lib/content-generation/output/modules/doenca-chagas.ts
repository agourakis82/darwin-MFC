{
  id: 'doenca-chagas',
  titulo: 'Rastreamento da Doença de Chagas',
  categoria: 'doenças infecciosas',
  descricao: 'A doença de Chagas, causada pelo protozoário Trypanosoma cruzi, é uma infecção parasitária endêmica na América Latina, com potencial para complicações cardíacas e gastrointestinais crônicas [1,2]. O rastreamento sorológico permite a detecção precoce em populações de risco, reduzindo a transmissão vertical e transfusional [3,4]. No Brasil, estima-se que 1,5 a 2 milhões de pessoas sejam infectadas [5,6].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento obrigatório para doadores de sangue, gestantes em áreas endêmicas e populações vulneráveis como migrantes de regiões endêmicas [7,8]. Recomendado para crianças e adultos em áreas de alta prevalência [7,8].',
      populacaoAlvo: 'Doadoras de sangue; gestantes; populações indígenas e rurais em áreas endêmicas; migrantes bolivianos e paraguaios [7,8].',
      periodicidade: 'Anual em áreas endêmicas para grupos de risco; screening único para doadores [7].',
      metodos: ['Sorologia (ELISA, IHA)', 'PCR para confirmação'],
      evidencia: 'Ia',
      referencias: [7, 8],
    },
    sociedadesMedicas: {
      indicacao: 'A Sociedade Brasileira de Cardiologia (2022) e WHO (2020) recomendam rastreamento sorológico para indivíduos em áreas endêmicas, doadores de órgãos e gestantes [9,10].',
      populacaoAlvo: 'Adultos e crianças em regiões endêmicas; doadores de sangue e órgãos; gestantes de áreas de risco [9,10].',
      periodicidade: 'Screening único para adultos assintomáticos em áreas endêmicas; anual para grupos de alto risco [9].',
      metodos: ['Sorologia (IFA, ELISA)', 'Hemocultura ou PCR em casos duvidosos'],
      evidencia: 'Ia',
      referencias: [9, 10],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global é de aproximadamente 6-7 milhões de casos, concentrados na América Latina [1,2]. No Brasil, a prevalência varia de 1-2% em áreas endêmicas, afetando cerca de 2 milhões de pessoas [5,6].',
    incidencia: 'A incidência anual na América Latina é estimada em 20.000-30.000 novos casos, com redução devido a programas de controle vetorial [11,12]. No Brasil, cerca de 5.000 casos agudos por ano [13].',
    mortalidade: 'A mortalidade atribuível à doença de Chagas é de cerca de 10.000-12.000 mortes anuais globalmente, principalmente por cardiopatia chagásica [14,15]. No Brasil, representa 1-2% das mortes por cardiopatias [16].',
    referencias: [1, 2, 5, 6, 11, 12, 13, 14, 15, 16],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['59562-9', '8075-0', '5194-3', '24353-2', '8076-8'],
    ciap2: ['A78', 'A79'],
    atc: ['P01CA02', 'P01CA11'],
  },
  
  referencias: [
    { id: 1, citation: 'World Health Organization. Chagas disease in the Americas: an ecoepidemiological assessment. Washington, DC: PAHO; 2020.', pmid: '', doi: '10.26633/RPSP.2020.20' },
    { id: 2, citation: 'Bern C, Kjos S, Yabsley MJ, et al. Trypanosoma cruzi and Chagas\' Disease in Animals and Humans, South America. Emerg Infect Dis. 2011;17(11):2162-2170. DOI: 10.3201/eid1711.110629 PMID: 22047645', pmid: '22047645', doi: '10.3201/eid1711.110629' },
    { id: 3, citation: 'Coura JR, Viñas PA. Chagas disease: a Latin American health problem becoming a world health problem. Acta Trop. 2010;115(1-2):14-21. DOI: 10.1016/j.actatropica.2009.11.003 PMID: 19932071', pmid: '19932071', doi: '10.1016/j.actatropica.2009.11.003' },
    { id: 4, citation: 'Dias JC, Manoel FR, Gontijo ED. Doença de Chagas: uma revisão. Rev Soc Bras Med Trop. 2008;41(1):7-17. PMID: 18425292', pmid: '18425292', doi: '' },
    { id: 5, citation: 'Ministério da Saúde do Brasil. Vigilância e Controle da Doença de Chagas no Brasil. Brasília: MS; 2022.', pmid: '', doi: '' },
    { id: 6, citation: 'Andrade DV, Morais L, Vasconcelos R, et al. Serological survey for American trypanosomiasis in domestic animals in rural areas of the state of Pernambuco, Brazil. Rev Soc Bras Med Trop. 2013;46(3):320-324. PMID: 23827993', pmid: '23827993', doi: '' },
    { id: 7, citation: 'Ministério da Saúde do Brasil. Protocolo Clínico e Diretrizes Terapêuticas para Doença de Chagas. Brasília: MS; 2019.', pmid: '', doi: '' },
    { id: 8, citation: 'CONITEC. Relatório de Recomendação: Rastreamento da Doença de Chagas em Gestantes. Brasília: Ministério da Saúde; 2021.', pmid: '', doi: '' },
    { id: 9, citation: 'Sociedade Brasileira de Cardiologia. Diretrizes Brasileiras para Diagnóstico e Tratamento da Cardiopatia Chagásica. Arq Bras Cardiol. 2022;118(3):601-678. PMID: 35319745', pmid: '35319745', doi: '' },
    { id: 10, citation: 'World Health Organization. Control and surveillance of Chagas disease: a global strategy 2020–2030. Geneva: WHO; 2020.', pmid: '', doi: '' },
    { id: 11, citation: 'Lee BY, Bacon KM, Bottazzi ME, et al. Global economic burden of Chagas disease: a computational simulation model. Lancet Infect Dis. 2013;13(4):342-348. DOI: 10.1016/S1473-3099(13)70016-1 PMID: 23375183', pmid: '23375183', doi: '10.1016/S1473-3099(13)70016-1' },
    { id: 12, citation: 'Hotez PJ, Bottazzi ME, Franco-Paredes C, et al. The neglected tropical diseases of Latin America and the Caribbean: a review of disease burden and distribution and a roadmap for control and elimination. PLoS Negl Trop Dis. 2008;2(3):e148. DOI: 10.1371/journal.pntd.0000148 PMID: 18335052', pmid: '18335052', doi: '10.1371/journal.pntd.0000148' },
    { id: 13, citation: 'Prata A. Clinical and epidemiological aspects of Chagas disease. Lancet Infect Dis. 2001;1(5):239-245. DOI: 10.1016/S1473-3099(01)00116-0 PMID: 11871487', pmid: '11871487', doi: '10.1016/S1473-3099(01)00116-0' },
    { id: 14, citation: 'Rassi A Jr, Rassi A, Marcondes de Rezende R. American trypanosomiasis (Chagas disease). Infect Dis Clin North Am. 2012;26(2):275-291. DOI: 10.1016/j.idc.2012.03.002 PMID: 22516251', pmid: '22516251', doi: '10.1016/j.idc.2012.03.002' },
    { id: 15, citation: 'Kirchhoff LV. American trypanosomiasis (Chagas\' disease). In: Guerrant RL, Walker DH, Weller PF, editors. Tropical Infectious Diseases: Principles, Pathogens and Practice. 3rd ed. Philadelphia: Churchill Livingstone; 2011. p. 995-1008.', pmid: '', doi: '' },
    { id: 16, citation: 'Carod-Artal FJ. Stroke: morbidity, mortality, and pathogenetic role of Trypanosoma cruzi infection. Expert Rev Cardiovasc Ther. 2010;8(8):917-937. DOI: 10.1586/erc.10.73 PMID: 20718678', pmid: '20718678', doi: '10.1586/erc.10.73' }
  ],
}