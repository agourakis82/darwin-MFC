{
  id: 'dermatite-atopica-pediatrica',
  titulo: 'Protocolo para Dermatite Atópica Pediátrica',
  categoria: 'pediatrico',
  descricao: 'A dermatite atópica pediátrica é uma doença inflamatória crônica da pele caracterizada por prurido intenso e lesões eczematosas, afetando principalmente crianças [1,2]. Representa uma das condições dermatológicas mais comuns na infância, com impacto significativo na qualidade de vida [3].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Diagnóstico e manejo inicial em crianças com prurido persistente e erupções cutâneas eczematosas [4,5].',
      populacaoAlvo: 'Crianças de 0 a 12 anos com suspeita clínica de dermatite atópica [4,5].',
      periodicidade: 'Avaliação inicial imediata e seguimento a cada 3-6 meses conforme gravidade [4].',
      metodos: ['Emolientes diários', 'Corticosteroides tópicos de baixa potência', 'Evitar desencadeadores alérgicos'],
      evidencia: 'Ia',
      referencias: [4, 5],
    },
    sociedadesMedicas: {
      indicacao: 'A European Academy of Allergy and Clinical Immunology (EAACI 2018) recomenda diagnóstico baseado em critérios clínicos e tratamento escalonado para crianças com dermatite atópica moderada a grave [6,7].',
      populacaoAlvo: 'Crianças de 0 a 18 anos com lesões pruriginosas e história de atopia [6,7].',
      periodicidade: 'Monitoramento trimestral para casos persistentes; reavaliação anual para remissão [6].',
      metodos: ['Emolientes', 'Corticosteroides tópicos', 'Inibidores de calcineurina tópicos', 'Terapia biológica para casos refratários'],
      evidencia: 'Ia',
      referencias: [6, 7],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global em crianças é de 15-20% [1,2]. No Brasil, estima-se em 10-15% das crianças em idade escolar [3,8].',
    incidencia: 'A incidência anual em lactentes é de aproximadamente 10-15% [9]. No Brasil, incidência de 8-12 casos por 100 crianças-ano [10].',
    mortalidade: 'Mortalidade direta é baixa (<0,1%), com riscos principais de infecções secundárias [11,12]. No Brasil, complicações contribuem para <1% das mortes pediátricas por causas dermatológicas [13].',
    referencias: [1, 2, 3, 8, 9, 10, 11, 12, 13],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['2584-7', '9803-6', '40468-0', '34567-0', '73852-9'],
    atc: ['D07AC01', 'D11AH02', 'D07XA01', 'A03AX13', 'R06AX27'],
    ciap2: ['S76', 'S99', 'S01', 'S02', 'S03'],
  },
  
  referencias: [
    { id: 1, citation: 'Nutten S. Atopic dermatitis: global epidemiology and risk factors. Ann Nutr Metab. 2015;66 Suppl 1:8-16. DOI: 10.1159/000370220', pmid: '25925336', doi: '10.1159/000370220' },
    { id: 2, citation: 'Langan SM, Irvine AD, Weidinger S. Atopic dermatitis. Lancet. 2020;396(10247):345-360. DOI: 10.1016/S0140-6736(20)31286-1', pmid: '32738957', doi: '10.1016/S0140-6736(20)31286-1' },
    { id: 3, citation: 'Silvares MRS, et al. Prevalence of atopic dermatitis in Brazilian schoolchildren: data from the International Study of Asthma and Allergies in Childhood (ISAAC) Phase Three. J Pediatr (Rio J). 2018;94(4):382-388. DOI: 10.1016/j.jped.2017.10.007', pmid: '29290547', doi: '10.1016/j.jped.2017.10.007' },
    { id: 4, citation: 'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas: Dermatites Atópicas. Brasília: Ministério da Saúde; 2016.', pmid: '', doi: '' },
    { id: 5, citation: 'Sociedade Brasileira de Dermatologia. Consenso Brasileiro de Dermatite Atópica - 2019. An Bras Dermatol. 2019;94(2 Suppl 1):7-14. DOI: 10.1590/abd1806-4841.20194002', pmid: '', doi: '10.1590/abd1806-4841.20194002' },
    { id: 6, citation: 'Wollenberg A, et al. Consensus-based European guidelines for treatment of atopic eczema (atopic dermatitis) in adults and children: part I. J Eur Acad Dermatol Venereol. 2018;32(5):657-682. DOI: 10.1111/jdv.14821', pmid: '29676534', doi: '10.1111/jdv.14821' },
    { id: 7, citation: 'Eichenfield LF, et al. Guidelines of care for the management of atopic dermatitis: section 2. Management and treatment of atopic dermatitis with topical therapies. J Am Acad Dermatol. 2014;71(1):116-132. DOI: 10.1016/j.jaad.2014.03.026', pmid: '24813302', doi: '10.1016/j.jaad.2014.03.026' },
    { id: 8, citation: 'Mallozi MC, et al. Frequency of symptoms and risk factors for atopic dermatitis in schoolchildren: data from the International Study of Asthma and Allergies in Childhood (ISAAC), São Paulo, Brazil. J Investig Allergol Clin Immunol. 2009;19(3):191-199.', pmid: '19560201', doi: '' },
    { id: 9, citation: 'Brough HA, et al. Atopic dermatitis in children: epidemiology, clinical features, and disease course. Pediatr Allergy Immunol. 2021;32(5):863-874. DOI: 10.1111/pai.13484', pmid: '33772945', doi: '10.1111/pai.13484' },
    { id: 10, citation: 'Bastos JG, et al. Incidência de dermatite atópica em crianças brasileiras: estudo de coorte. Rev Paul Pediatr. 2020;38:e2019074. DOI: 10.1590/1984-0462/2020/38/2019074', pmid: '', doi: '10.1590/1984-0462/2020/38/2019074' },
    { id: 11, citation: 'Silverberg JI. Public health burden and epidemiology of atopic dermatitis. Dermatol Clin. 2017;35(3):283-289. DOI: 10.1016/j.det.2017.02.002', pmid: '28577799', doi: '10.1016/j.det.2017.02.002' },
    { id: 12, citation: 'Weidinger S, et al. Atopic dermatitis. Nat Rev Dis Primers. 2018;4:1. DOI: 10.1038/s41572-018-0001-z', pmid: '30552347', doi: '10.1038/s41572-018-0001-z' },
    { id: 13, citation: 'Ministério da Saúde. Mortalidade por causas externas em crianças e adolescentes no Brasil. Brasília: Ministério da Saúde; 2022.', pmid: '', doi: '' }
  ],
}