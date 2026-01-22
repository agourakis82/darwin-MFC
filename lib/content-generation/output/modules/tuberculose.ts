{
  id: 'tuberculose',
  titulo: 'Rastreamento de Tuberculose',
  categoria: 'infectocontagiosas',
  descricao: 'O rastreamento de tuberculose (TB) é essencial para o controle da doença, focando na detecção precoce de infecção latente (TBI) e doença ativa (TBD), especialmente em contextos de alta endemicidade como o Brasil [3,5,8,9]. A TB é causada por Mycobacterium tuberculosis e representa uma das principais causas de morbimortalidade infecciosa global [8]. No Brasil, o protocolo do SUS enfatiza a investigação em grupos vulneráveis [11].',

  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para contatos de casos confirmados, populações de risco como profissionais de saúde, população carcerária e indivíduos com imunossupressão [11,3,5]. Investigação ativa em sintomáticos respiratórios e para TBI em candidatos a imunossupressores [5,11].',
      populacaoAlvo: 'Contatos domiciliares e extrafamiliares de casos de TB; profissionais de saúde; população privada de liberdade; pacientes com HIV, diabetes, desnutrição ou doenças imunomediadas inflamatórias (IMID) [3,5,11].',
      periodicidade: 'Investigação imediata para contatos (dentro de 15 dias); rastreamento anual para profissionais de saúde e grupos de alto risco persistente [3,11].',
      metodos: ['Radiografia de tórax', 'Baciloscopia direta (AFB)', 'Cultura para micobactérias', 'Teste tuberculínico (TST)', 'Interferon-gamma release assays (IGRA)'],
      evidencia: 'IIa',
      referencias: [3,5,11],
    },
    sociedadesMedicas: {
      indicacao: 'A Sociedade Brasileira de Pneumologia e Tisiologia (SBPT) recomenda rastreamento para TBI em contatos próximos e indivíduos com fatores de risco, incluindo IMID sob imunossupressão [5,9]. Diagnóstico de TBD por métodos microbiológicos em suspeitos [9].',
      populacaoAlvo: 'Contatos de casos ativos; pacientes com IMID, HIV ou outras comorbidades; profissionais de saúde e populações vulneráveis [5,9].',
      periodicidade: 'Avaliação imediata para contatos; periódica (anual ou bienal) em grupos de risco contínuo, conforme exposição [5,9].',
      metodos: ['Radiografia de tórax', 'Baciloscopia e cultura', 'TST ou IGRA para TBI', 'Testes moleculares (ex.: GeneXpert)'],
      evidencia: 'IIa',
      referencias: [5,9],
    },
    convergencia: 'convergencia',
  },

  epidemiologia: {
    prevalencia: 'Globalmente, cerca de 1/4 da população tem infecção latente por TB [8]. No Brasil, a prevalência de TBD é estimada em 50-60 casos por 100.000 habitantes [9,11].',
    incidencia: 'Incidência global de TBD é de aproximadamente 10 milhões de casos novos por ano [8]. No Brasil, incidência de 33 casos por 100.000 habitantes em 2022 [11,9].',
    mortalidade: 'Mortalidade global por TB é de 1,3 milhão de mortes anuais [8]. No Brasil, cerca de 4.500 mortes por ano, com taxa de 2,2 por 100.000 [11,9].',
    referencias: [8,9,11],
  },

  ontologia: {
    cid11: ['1B10', '1B11', '1B12', '1B13', '1B14'],
    snomedCT: ['56717001', '186161000', '154283005', '58458000', '398447007'],
    loinc: ['73710-3', '90424-1', '18018-9', '630-4', '11220-1'],
    atc: ['J04AA02', 'J04AK02', 'J04AM03', 'J04AM06', 'J04BA01'],
    ciap2: ['A78'],
  },

  referencias: [
    { id: 1, citation: 'Planchard D, Popat S, Kerr K, et al. Oncogene-addicted metastatic non-small-cell lung cancer: ESMO Clinical Practice Guideline for diagnosis, treatment and follow-up. Annals of oncology. 2023;34(4):273-286. DOI: 10.1016/j.annonc.2022.12.009 PMID: 36872130', pmid: '36872130', doi: '10.1016/j.annonc.2022.12.009' },
    { id: 2, citation: 'Gandhi L, Rodriguez-Abreu D, Kim SW, et al. Non-oncogene-addicted metastatic non-small-cell lung cancer: ESMO Clinical Practice Guideline. Annals of oncology. 2023;34(4):287-302. DOI: 10.1016/j.annonc.2022.12.013 PMID: 36669645', pmid: '36669645', doi: '10.1016/j.annonc.2022.12.013' },
    { id: 3, citation: 'Chaulet JF, Grosset J, Le Pen C. Tuberculosis contact tracing. Revue des maladies respiratoires. 2018;35(7):599-608. DOI: 10.1016/j.rmr.2018.03.003 PMID: 30224213', pmid: '30224213', doi: '10.1016/j.rmr.2018.03.003' },
    { id: 4, citation: 'Nucci M, Garnica M, Gloria AB, et al. Brazilian task force for the management of mucormycosis. The Brazilian journal of infectious diseases. 2025;29(1):104579. DOI: 10.1016/j.bjid.2025.104579 PMID: 40974632', pmid: '40974632', doi: '10.1016/j.bjid.2025.104579' },
    { id: 5, citation: 'Ferreira LG, Mendoza-Sassi RA, Ramires PV, et al. Brazilian recommendations for the management of tuberculosis infection in immune-mediated inflammatory diseases. Advances in rheumatology. 2025;65(1):10. DOI: 10.1186/s42358-025-00449-4 PMID: 40114289', pmid: '40114289', doi: '10.1186/s42358-025-00449-4' },
    { id: 6, citation: 'Lapa A, Carvalho A, Duarte R, et al. Treatment of latent tuberculosis infection: update of guidelines, 2006. Revista portuguesa de pneumologia. 2007;13(4):571-598. DOI: 10.1016/s0873-2159(15)30359-7 PMID: 17695077', pmid: '17695077', doi: '10.1016/s0873-2159(15)30359-7' },
    { id: 7, citation: 'Palaci M, Dietze R, Ribeiro NK. Tuberculous pleural effusions. Jornal brasileiro de pneumologia. 2006;32(9):S419-S426. DOI: 10.1590/s1806-37132006000900003 PMID: 17273621', pmid: '17273621', doi: '10.1590/s1806-37132006000900003' },
    { id: 8, citation: 'Désolée G, Barbut M, Frappier E. Introduction-Epidemiology of latent and active tuberculosis. Revue des maladies respiratoires. 2018;35(7):591-598. DOI: 10.1016/j.rmr.2018.08.009 PMID: 30241683', pmid: '30241683', doi: '10.1016/j.rmr.2018.08.009' },
    { id: 9, citation: 'Dalcolmo M, Barreto AW, Campanerut P, et al. Diagnosis of tuberculosis: a consensus statement from the Brazilian Thoracic Association. Jornal brasileiro de pneumologia. 2021;47(3):e20210054. DOI: 10.36416/1806-3756/e20210054 PMID: 34008763', pmid: '34008763', doi: '10.36416/1806-3756/e20210054' },
    { id: 10, citation: 'de Andrade LB, de Melo HRV, de Sousa DP, et al. Brazilian Clinical Practice Guidelines for Sexually Transmitted Infections. Sexually transmitted diseases. 2023;50(12):793-800. DOI: 10.1097/OLQ.0000000000001873 PMID: 37824264', pmid: '37824264', doi: '10.1097/OLQ.0000000000001873' },
    { id: 11, citation: 'Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral aos Casos Suspeitos e Confirmados de Tuberculose. Brasília: Ministério da Saúde; 2022. URL: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/t/tuberculose', pmid: '', doi: '' }
  ],
}
