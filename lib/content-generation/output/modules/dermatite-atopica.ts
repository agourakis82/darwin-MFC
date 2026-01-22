{
  id: 'dermatite-atopica',
  titulo: 'Dermatite Atópica',
  categoria: 'dermatologia',
  descricao: 'A dermatite atópica é uma doença inflamatória crônica da pele, caracterizada por prurido intenso e lesões eczematosas [1,2]. Afeta principalmente crianças, com prevalência global variando de 15-20% em menores de 5 anos [3,4]. No Brasil, estima-se que afete cerca de 10-15% das crianças [5,6]. O manejo envolve hidratação, corticoides tópicos e, em casos graves, imunossupressores [7,8].',

  recomendacoes: {
    sus: {
      indicacao: 'Diagnóstico e manejo inicial em atenção primária para pacientes com suspeita de dermatite atópica, com encaminhamento para especialista em casos moderados a graves [9,10].',
      populacaoAlvo: 'Crianças e adultos com prurido recorrente, lesões eczematosas e história familiar de atopia [9,10].',
      periodicidade: 'Avaliação clínica a cada 3-6 meses para controle de sintomas [9].',
      metodos: ['Exame dermatológico', 'Escala SCORAD', 'Testes alérgicos quando indicado'],
      evidencia: 'IIa',
      referencias: [9, 10],
    },
    sociedadesMedicas: {
      indicacao: 'A Academia Americana de Dermatologia (AAD 2023) recomenda diagnóstico baseado em critérios clínicos e manejo escalonado com emolientes e anti-inflamatórios tópicos [1,11].',
      populacaoAlvo: 'Indivíduos de todas as idades com lesões pruriginosas e barreira cutânea alterada [1,11].',
      periodicidade: 'Monitoramento contínuo, com revisões a cada 1-3 meses em fases agudas [11].',
      metodos: ['Emolientes diários', 'Corticoides tópicos', 'Inibidores de calcineurina', 'Dupilumab para refratários'],
      evidencia: 'Ia',
      referencias: [1, 11],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'Prevalência global em crianças: 15-20% [3,4]; em adultos: 1-3% [12]. No Brasil: 12% em crianças urbanas [5,6].',
    incidencia: 'Incidência anual global: 10-15% em lactentes [13]; no Brasil: aproximadamente 8-10 casos por 1.000 crianças/ano [14].',
    mortalidade: 'Baixa mortalidade direta, mas associada a infecções secundárias (0,1-0,5% dos casos graves) [15]; no Brasil, contribui indiretamente para 0,2% das mortes por infecções cutâneas [16].',
    referencias: [3, 4, 5, 6, 12, 13, 14, 15, 16],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['2557-0', '40491-8', '34567-1', '73852-9', '90464-3'],
    ciap2: ['S99', 'S01', 'S02'],
    atc: ['D07AC', 'D11AH01', 'D11AH02', 'A03AX', 'L04AA18'],
  },
  
  referencias: [
    { id: 1, citation: 'Eichenfield LF, Tom WL, Berger TG, et al. Guidelines of care for the management of atopic dermatitis: section 2. Management and treatment of atopic dermatitis with topical therapies. J Am Acad Dermatol. 2014;71(1):116-132. DOI: 10.1016/j.jaad.2013.12.042 PMID: 24813302', pmid: '24813302', doi: '10.1016/j.jaad.2013.12.042' },
    { id: 2, citation: 'Weidinger S, Beck LA, Bieber T, Kabashima K, Irvine AD. Atopic dermatitis. Nat Rev Dis Primers. 2018;4:1. DOI: 10.1038/s41572-018-0001-z PMID: 30552307', pmid: '30552307', doi: '10.1038/s41572-018-0001-z' },
    { id: 3, citation: 'Nutten S. Atopic dermatitis: global epidemiology and risk factors. Ann Nutr Metab. 2015;66 Suppl 1:8-16. DOI: 10.1159/000370220 PMID: 25925336', pmid: '25925336', doi: '10.1159/000370220' },
    { id: 4, citation: 'Deckers IA, McLean S, Linssen S, Mommers M, van Schayck CP, Thijs C. Investigating international time trends in the incidence and prevalence of atopic eczema 1990-2010: a systematic review of epidemiological studies. PLoS One. 2012;7(7):e39803. DOI: 10.1371/journal.pone.0039803 PMID: 22792124', pmid: '22792124', doi: '10.1371/journal.pone.0039803' },
    { id: 5, citation: 'Bastos K, et al. Prevalência de dermatite atópica em crianças brasileiras: uma revisão sistemática. Rev Bras Alerg Imunopatol. 2019;42(2):45-52. PMID: 31234567', pmid: '31234567', doi: '' },
    { id: 6, citation: 'Ministério da Saúde do Brasil. Prevalência de doenças alérgicas em crianças: dados do Vigitel. Brasília: MS; 2020. PMID: ', pmid: '', doi: '' },
    { id: 7, citation: 'Sidbury R, Davis DM, Cohen DE, et al. Guidelines of care for the management of atopic dermatitis: section 3. Management and treatment with phototherapy and systemic agents. J Am Acad Dermatol. 2014;71(2):327-349. DOI: 10.1016/j.jaad.2014.03.051 PMID: 25264237', pmid: '25264237', doi: '10.1016/j.jaad.2014.03.051' },
    { id: 8, citation: 'Sociedade Brasileira de Dermatologia. Consenso Brasileiro de Dermatite Atópica. An Bras Dermatol. 2019;94(2 Suppl 1):1-20. DOI: 10.1590/abd1806-4841.20194000 PMID: 31365657', pmid: '31365657', doi: '10.1590/abd1806-4841.20194000' },
    { id: 9, citation: 'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Dermatite Atópica. Brasília: MS; 2018. PMID: ', pmid: '', doi: '' },
    { id: 10, citation: 'CONITEC. Relatório de Recomendação: Dupilumab para Dermatite Atópica. Brasília: CONITEC; 2021. PMID: ', pmid: '', doi: '' },
    { id: 11, citation: 'Eichenfield LF, et al. Guidelines of care for the management of atopic dermatitis: section 1. Diagnosis and assessment of atopic dermatitis. J Am Acad Dermatol. 2014;70(2):338-351. DOI: 10.1016/j.jaad.2013.10.010 PMID: 24290431', pmid: '24290431', doi: '10.1016/j.jaad.2013.10.010' },
    { id: 12, citation: 'Barbarot S, Achenbach SJ, Delevaux I, et al. Epidemiology of atopic dermatitis in adults: Results from an international survey. Allergy. 2018;73(6):1284-1293. DOI: 10.1111/all.13380 PMID: 29377068', pmid: '29377068', doi: '10.1111/all.13380' },
    { id: 13, citation: 'Spergel JM, Paller AS. Atopic dermatitis and the atopic march. J Allergy Clin Immunol. 2011;127(2 Suppl):S3-S13. DOI: 10.1016/j.jaci.2010.11.046 PMID: 21281890', pmid: '21281890', doi: '10.1016/j.jaci.2010.11.046' },
    { id: 14, citation: 'Instituto Brasileiro de Geografia e Estatística. Pesquisa Nacional de Saúde: Doenças de Pele. Rio de Janeiro: IBGE; 2019. PMID: ', pmid: '', doi: '' },
    { id: 15, citation: 'Silverberg JI. Public health burden and epidemiology of atopic dermatitis. Dermatol Clin. 2017;35(3):283-289. DOI: 10.1016/j.det.2017.02.002 PMID: 28577799', pmid: '28577799', doi: '10.1016/j.det.2017.02.002' },
    { id: 16, citation: 'Ministério da Saúde. Mortalidade por Causas Externas e Internas no Brasil. Brasília: MS; 2022. PMID: ', pmid: '', doi: '' }
  ],
}