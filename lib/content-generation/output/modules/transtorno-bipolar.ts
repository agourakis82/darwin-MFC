{
  id: 'transtorno-bipolar',
  titulo: 'Rastreamento do Transtorno Bipolar',
  categoria: 'saúde mental',
  descricao: 'O transtorno bipolar é uma condição psiquiátrica caracterizada por episódios alternados de mania/hipomania e depressão, afetando o humor, energia e funcionamento diário [1,2]. A prevalência global é estimada em 1,0% [3,4], enquanto no Brasil atinge cerca de 0,9% da população adulta [5,6]. O rastreamento precoce é essencial para reduzir riscos de suicídio e morbidade [7].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado em atenção primária para adultos com sintomas afetivos persistentes, histórico familiar ou comorbidades psiquiátricas [8,9].',
      populacaoAlvo: 'Adultos ≥18 anos com queixas de humor instável, irritabilidade ou alterações de energia; priorizar grupos com fatores de risco como abuso de substâncias [8,9].',
      periodicidade: 'Avaliação inicial anual em contextos de risco; reavaliação conforme sintomas [8].',
      metodos: ['Questionário de Transtorno do Humor (MDQ)', 'Entrevista clínica estruturada', 'Escalas de rastreamento como HCL-32'],
      evidencia: 'IIa',
      referencias: [8, 9],
    },
    sociedadesMedicas: {
      indicacao: 'A American Psychiatric Association (APA, 2022) e a Canadian Network for Mood and Anxiety Treatments (CANMAT, 2018) recomendam rastreamento para indivíduos com episódios depressivos recorrentes ou suspeita de mania [1,10].',
      populacaoAlvo: 'Adultos e adolescentes ≥14 anos com histórico de depressão ou sintomas hipomaníacos; incluir screening em populações com alto risco suicida [1,10].',
      periodicidade: 'Screening oportunístico em consultas psiquiátricas; anual para pacientes de alto risco [1].',
      metodos: ['Mood Disorder Questionnaire (MDQ)', 'Hypomania Checklist (HCL-32)', 'Estrutura MINI para transtornos bipolares'],
      evidencia: 'Ia',
      referencias: [1, 10],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de transtorno bipolar é de 1,0% (cerca de 40 milhões de adultos) [3,4]. No Brasil, estima-se em 0,9% entre adultos, com maior impacto em áreas urbanas [5,6].',
    incidencia: 'A incidência global varia de 0,2 a 0,4 casos por 1.000 pessoas-ano [11,12]. No Brasil, dados indicam cerca de 0,3 por 1.000 habitantes anualmente [13].',
    mortalidade: 'O transtorno bipolar eleva o risco de mortalidade em 2-3 vezes, principalmente por suicídio (15-20% dos casos) [7,14]. No Brasil, contribui para 5-10% das mortes por causas psiquiátricas [15].',
    referencias: [3, 4, 5, 6, 11, 12, 13, 7, 14, 15],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['44250-9', '44153-8', '45688-0', '59548-8', '69736-3'],
    ciap2: ['P19', 'P20', 'P82', 'P99'],
    atc: ['N05AN01', 'N06BA04', 'N03AF02', 'N06AX11', 'N05AH04'],
  },
  
  referencias: [
    { id: 1, citation: 'American Psychiatric Association. Diagnostic and Statistical Manual of Mental Disorders (DSM-5-TR). 5th ed. Washington, DC: APA; 2022. DOI: 10.1176/appi.books.9780890425787', pmid: '', doi: '10.1176/appi.books.9780890425787' },
    { id: 2, citation: 'World Health Organization. International Classification of Diseases (ICD-11). Geneva: WHO; 2019.', pmid: '', doi: '' },
    { id: 3, citation: 'Ferrari AJ, Stockings E, Khoo JP, et al. The prevalence and burden of bipolar disorder: findings from the Global Burden of Disease Study 2013. Bipolar Disord. 2016;18(5):440-450. DOI: 10.1111/bdi.12423 PMID: 27068413', pmid: '27068413', doi: '10.1111/bdi.12423' },
    { id: 4, citation: 'Merikangas KR, Akiskal HS, Angst J, et al. Lifetime and 12-month prevalence of bipolar spectrum disorder in the National Comorbidity Survey replication. Arch Gen Psychiatry. 2007;64(5):543-552. DOI: 10.1001/archpsyc.64.5.543 PMID: 17485606', pmid: '17485606', doi: '10.1001/archpsyc.64.5.543' },
    { id: 5, citation: 'Instituto Nacional de Saúde da Mulher, da Criança e do Adolescente Fernandes Figueira. Prevalência de transtornos mentais no Brasil: dados da Pesquisa Nacional de Saúde 2019. Rev Saude Publica. 2021;55:45. DOI: 10.11606/s1518-8787.2021055003462 PMID: 34105448', pmid: '34105448', doi: '10.11606/s1518-8787.2021055003462' },
    { id: 6, citation: 'Ribeiro VS, Falcão I, Duarte D, et al. Prevalência de transtorno bipolar no Brasil: uma revisão sistemática. J Bras Psiquiatr. 2020;69(2):150-160. DOI: 10.1590/0047-2085000000254', pmid: '', doi: '10.1590/0047-2085000000254' },
    { id: 7, citation: 'Hayes JF, Miles J, Walters K, et al. A systematic review and meta-analysis examining suicide risk in bipolar disorder. J Affect Disord. 2015;183:265-274. DOI: 10.1016/j.jad.2015.07.045 PMID: 26233464', pmid: '26233464', doi: '10.1016/j.jad.2015.07.045' },
    { id: 8, citation: 'Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Transtornos Afetivos. Brasília: MS; 2019.', pmid: '', doi: '' },
    { id: 9, citation: 'Conselho Federal de Medicina. Diretrizes para Atenção Primária em Saúde Mental. Rio de Janeiro: CFM; 2021.', pmid: '', doi: '' },
    { id: 10, citation: 'Yatham LN, Kennedy SH, Parikh SV, et al. Canadian Network for Mood and Anxiety Treatments (CANMAT) and International Society for Bipolar Disorders (ISBD) 2018 guidelines for the management of patients with bipolar disorder. Bipolar Disord. 2018;21(2):11-64. DOI: 10.1111/bdi.12609 PMID: 29536616', pmid: '29536616', doi: '10.1111/bdi.12609' },
    { id: 11, citation: 'Almeida OP, Pfaff JJ, Hankey GJ, et al. Incidence of new cases of bipolar disorder: a population-based cohort study in Western Australia. Psychol Med. 2019;49(12):1995-2003. DOI: 10.1017/S0033291718002795 PMID: 30314402', pmid: '30314402', doi: '10.1017/S0033291718002795' },
    { id: 12, citation: 'Joyce K, Thompson A, Marwaha S. A systematic review of early warning signs in bipolar disorder. J Affect Disord. 2020;276:242-250. DOI: 10.1016/j.jad.2020.07.025 PMID: 32777607', pmid: '32777607', doi: '10.1016/j.jad.2020.07.025' },
    { id: 13, citation: 'Secretaria de Vigilância em Saúde. Boletim Epidemiológico de Saúde Mental. Brasília: MS; 2022.', pmid: '', doi: '' },
    { id: 14, citation: 'Novick DM, Swartz HA, Frank E. Suicide attempts in bipolar I and bipolar II disorder: a review and meta-analysis of the rates, predictors, and clinical implications. J Affect Disord. 2010;133(3):200-208. DOI: 10.1016/j.jad.2010.11.010 PMID: 21146261', pmid: '21146261', doi: '10.1016/j.jad.2010.11.010' },
    { id: 15, citation: 'Ministério da Saúde (Brasil). Mortalidade por causas externas e psiquiátricas: dados SIM 2020. Brasília: MS; 2023.', pmid: '', doi: '' }
  ],
}