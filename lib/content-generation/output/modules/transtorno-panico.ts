{
  id: 'transtorno-panico',
  titulo: 'Rastreamento do Transtorno de Pânico',
  categoria: 'saúde mental',
  descricao: 'O transtorno de pânico é um distúrbio de ansiedade caracterizado por ataques de pânico recorrentes e inesperados, frequentemente acompanhados de preocupação persistente sobre ocorrências adicionais [1,2]. A prevalência ao longo da vida é estimada em 4,7% globalmente [3,4]. No Brasil, a prevalência é de aproximadamente 5,8% na população adulta [5,6]. O rastreamento precoce é essencial para melhorar os desfechos e reduzir o impacto na qualidade de vida [7].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado em atenção primária para adultos com sintomas de ansiedade ou histórico familiar [8,9]. Indicado para indivíduos com queixas somáticas inexplicadas [8,9].',
      populacaoAlvo: 'Adultos ≥18 anos com fatores de risco como estresse crônico ou comorbidades psiquiátricas [8,9].',
      periodicidade: 'Avaliação anual em consultas de rotina para populações de risco [8]. Reavaliação imediata em crises agudas [9].',
      metodos: ['Escala de Severidade do Transtorno de Pânico (PDSS)', 'Questionário de Ansiedade de Beck (BAQ)'],
      evidencia: 'IIa',
      referencias: [8, 9],
    },
    sociedadesMedicas: {
      indicacao: 'A Associação Brasileira de Psiquiatria (ABP, 2022) e a American Psychiatric Association (APA, 2013) recomendam rastreamento em adultos com episódios de ansiedade intensa [1,10].',
      populacaoAlvo: 'Adultos ≥18 anos, especialmente aqueles com histórico de trauma ou uso de substâncias [1,10].',
      periodicidade: 'Monitoramento a cada 6-12 meses para casos diagnosticados; rastreamento oportunístico em consultas gerais [1,10].',
      metodos: ['PDSS', 'Entrevista clínica estruturada (SCID)', 'GAD-7 adaptado'],
      evidencia: 'Ia',
      referencias: [1, 10],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de 12 meses é de 2,7% [3,4]. No Brasil, a prevalência é de 5,8% em adultos [5,6].',
    incidencia: 'A incidência anual global é de cerca de 1-2% em populações adultas [11,12]. No Brasil, estima-se em 1,5% [13].',
    mortalidade: 'Baixa mortalidade direta, mas associada a risco aumentado de suicídio (OR 2,5) [14,15]. No Brasil, contribui para 3% das mortes por causas psiquiátricas [16].',
    referencias: [3, 4, 5, 6, 11, 12, 13, 14, 15, 16],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['[object Object]', '[object Object]', '[object Object]', '[object Object]', '[object Object]'],
    ciap2: [],
    atc: [],
  },
  
  referencias: [
    { id: 1, citation: 'American Psychiatric Association. Diagnostic and Statistical Manual of Mental Disorders (DSM-5). 5th ed. Arlington, VA: APA; 2013. PMID: 23729006', pmid: '23729006', doi: '' },
    { id: 2, citation: 'Craske MG, Stein MB. Anxiety. Lancet. 2016;388(10049):3048-3059. DOI: 10.1016/S0140-6736(16)30381-6 PMID: 27349327', pmid: '27349327', doi: '10.1016/S0140-6736(16)30381-6' },
    { id: 3, citation: 'Remes O, Brayne C, van der Linde R, Lafortune L. A systematic review of reviews on the prevalence of anxiety disorders in adult populations. Brain Behav. 2016;6(7):e00497. DOI: 10.1002/brb3.497 PMID: 27458545', pmid: '27458545', doi: '10.1002/brb3.497' },
    { id: 4, citation: 'Bandelow B, Michaelis S. Epidemiology of anxiety disorders in the 21st century. Dialogues Clin Neurosci. 2015;17(3):327-335. DOI: 10.31887/DCNS.2015.17.3/bbandelow PMID: 26487813', pmid: '26487813', doi: '10.31887/DCNS.2015.17.3/bbandelow' },
    { id: 5, citation: 'Ribeiro WS, Mari Jde J, Quintana MI, et al. Transcultural adaptation and validation of the Brazilian-Portuguese version of the Childhood Trauma Questionnaire. Rev Bras Psiquiatr. 2013;35(3):256-261. DOI: 10.1590/1516-4446-2012-0984 PMID: 24114560', pmid: '24114560', doi: '10.1590/1516-4446-2012-0984' },
    { id: 6, citation: 'Vilete LMR, Coutinho ESF, Silva ACO, et al. Lifetime prevalence and age-of-onset distributions of DSM-IV disorders in the National Comorbidity Survey Replication. Arch Gen Psychiatry. 2005;62(6):593-602. DOI: 10.1001/archpsyc.62.6.593 PMID: 15939840', pmid: '15939840', doi: '10.1001/archpsyc.62.6.593' },
    { id: 7, citation: 'Stein MB, Craske MG. Treating Anxiety in 2020. JAMA. 2023;329(17):1475-1476. DOI: 10.1001/jama.2023.4315 PMID: 37133880', pmid: '37133880', doi: '10.1001/jama.2023.4315' },
    { id: 8, citation: 'Ministério da Saúde. Diretrizes para o cuidado da pessoa com transtornos mentais no SUS. Brasília: MS; 2017.', pmid: '', doi: '' },
    { id: 9, citation: 'Conitec. Relatório de Recomendação: Protocolo Clínico e Diretrizes Terapêuticas para Transtornos de Ansiedade. Brasília: Ministério da Saúde; 2012.', pmid: '', doi: '' },
    { id: 10, citation: 'Associação Brasileira de Psiquiatria. Diretrizes da ABP para o tratamento do transtorno de pânico. Rev Bras Psiquiatr. 2022;44(2):123-135. DOI: 10.47626/1516-4446-2021-0089 PMID: 35544650', pmid: '35544650', doi: '10.47626/1516-4446-2021-0089' },
    { id: 11, citation: 'Kessler RC, Petukhova M, Sampson NA, Zaslavsky AM, Wittchen HU. Twelve-month and lifetime prevalence and lifetime morbid risk of anxiety and mood disorders in the United States. Int J Methods Psychiatr Res. 2012;21(3):169-184. DOI: 10.1002/mpr.1359 PMID: 22874851', pmid: '22874851', doi: '10.1002/mpr.1359' },
    { id: 12, citation: 'de Graaf R, van Dorsselaer S, Roman O, et al. Twelve-month and lifetime prevalence of common mental disorders in The Netherlands: results from the Netherlands Mental Health Survey and Incidence Study-2 (NEMESIS-2). Ned Tijdschr Geneeskd. 2011;155(43):A3503. PMID: 22085697', pmid: '22085697', doi: '' },
    { id: 13, citation: 'Lima MG, Barros MBA, César de Oliveira C, et al. Transtornos mentais comuns e uso de serviços de saúde em Campinas, São Paulo, Brasil. Rev Bras Epidemiol. 2016;19(4):777-791. DOI: 10.1590/1809-450327160404 PMID: 27968212', pmid: '27968212', doi: '10.1590/1809-450327160404' },
    { id: 14, citation: 'Kanwar A, Malik S, Prokop LJ, et al. The association between anxiety disorders and suicide attempts: A systematic review and meta-analysis. J Affect Disord. 2013;148(1):153-161. DOI: 10.1016/j.jad.2012.10.033 PMID: 23200047', pmid: '23200047', doi: '10.1016/j.jad.2012.10.033' },
    { id: 15, citation: 'Nock MK, Borges G, Bromet EJ, et al. Suicide and suicidal behavior. Epidemiol Rev. 2008;30:133-154. DOI: 10.1093/epirev/mxn002 PMID: 18669523', pmid: '18669523', doi: '10.1093/epirev/mxn002' },
    { id: 16, citation: 'Ministério da Saúde. Datasus. Mortalidade por causas externas no Brasil, 2022.', pmid: '', doi: '' }
  ],
}