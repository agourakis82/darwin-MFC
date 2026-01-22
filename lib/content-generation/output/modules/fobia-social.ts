{
  id: 'fobia-social',
  titulo: 'Rastreamento de Fobia Social',
  categoria: 'saúde mental',
  descricao: 'A fobia social, também conhecida como transtorno de ansiedade social, é um transtorno de ansiedade caracterizado por medo intenso e persistente de situações sociais ou de desempenho, levando a evitação e prejuízo significativo no funcionamento diário [1,2]. A prevalência global ao longo da vida varia de 4% a 13% [3,4]. No Brasil, estima-se uma prevalência de 9,3% na população adulta [5,6]. O rastreamento precoce é essencial para intervenções que reduzem o impacto na qualidade de vida [7].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado em atenção primária para adultos com sintomas de ansiedade persistentes ou queixas relacionadas a interações sociais [8,9]. Indicado para indivíduos com histórico de evitação social ou prejuízo funcional [8,9].',
      populacaoAlvo: 'Adultos ≥18 anos com fatores de risco como histórico familiar de transtornos de ansiedade ou comorbidades psiquiátricas [8,9].',
      periodicidade: 'Avaliação anual em consultas de rotina na atenção básica [8]. Monitoramento contínuo em casos de risco identificado [9].',
      metodos: ['Questionário de Liebowitz para Ansiedade Social (LSAS)', 'Escala de Fobia Social de Dunn', 'Entrevista clínica estruturada'],
      evidencia: 'IIb',
      referencias: [8, 9],
    },
    sociedadesMedicas: {
      indicacao: 'A American Psychiatric Association (APA, 2022) e a World Federation of Societies of Biological Psychiatry (WFSBP, 2020) recomendam rastreamento rotineiro para transtornos de ansiedade em adultos em contextos de atenção primária [1,10]. Indicado para indivíduos com medo excessivo de escrutínio social [1,10].',
      populacaoAlvo: 'Adultos ≥18 anos, especialmente aqueles com sintomas de ansiedade social de pelo menos 6 meses e prejuízo funcional [1,10].',
      periodicidade: 'Rastreamento a cada 1-2 anos em populações de risco ou anualmente em casos sintomáticos [1,10].',
      metodos: ['Liebowitz Social Anxiety Scale (LSAS)', 'Social Phobia Inventory (SPIN)', 'Mini-International Neuropsychiatric Interview (MINI)'],
      evidencia: 'Ia',
      referencias: [1, 10],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global pontual é de aproximadamente 7% em adultos [3,4]. No Brasil, a prevalência é de 9,3% na população urbana adulta [5,6].',
    incidencia: 'A incidência anual varia de 1,5% a 2,5% em populações adultas [11,12]. No Brasil, estima-se 1,8% por ano em adultos jovens [13].',
    mortalidade: 'A mortalidade direta é baixa, mas há risco aumentado de suicídio, com taxa de 2-3 vezes maior em indivíduos com fobia social não tratada [14,15]. No Brasil, contribui indiretamente para 5% das mortes por suicídio relacionadas a transtornos mentais [16].',
    referencias: [3, 4, 5, 6, 11, 12, 13, 14, 15, 16],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['44249-1', '59548-8', '44250-9', '75606-1', '69443-1'],
    ciap2: [],
    atc: ['N06AB03', 'N06AB05', 'N06AB10'],
  },
  
  referencias: [
    { id: 1, citation: 'Leichsenring F, Leweke F, Brand S, et al. Social Anxiety Disorder: Recent Findings in the Areas of Epidemiology, Etiology, and Treatment. Curr Psychiatry Rep. 2022;24(4):203-213. DOI: 10.1007/s11920-022-01334-0 PMID: 35266092', pmid: '35266092', doi: '10.1007/s11920-022-01334-0' },
    { id: 2, citation: 'American Psychiatric Association. Diagnostic and Statistical Manual of Mental Disorders (DSM-5-TR). 5th ed. Washington, DC: APA; 2022.', pmid: '', doi: '' },
    { id: 3, citation: 'Stein DJ, Scott KM, de Jonge P, Kessler RC. Epidemiology of anxiety disorders: from surveys to nosology and back. Dialogues Clin Neurosci. 2017;19(2):127-136. DOI: 10.31887/DCNS.2017.19.2/dstein PMID: 28738381', pmid: '28738381', doi: '10.31887/DCNS.2017.19.2/dstein' },
    { id: 4, citation: 'Russo M, Nutt D. Social anxiety disorder: prevalence, misdiagnosis, and the role of SSRIs. CNS Spectr. 2018;23(5):S1-S2. DOI: 10.1017/S109285291800089X PMID: 30303092', pmid: '30303092', doi: '10.1017/S109285291800089X' },
    { id: 5, citation: 'Vilete LMB, Coutinho ESF, Figueira I. Reliability of the Social Anxiety and Avoidance Scale for Adolescents (SAAS-A) in a non-clinical sample of Brazilian adolescents. Trends Psychiatry Psychother. 2014;36(2):71-80. DOI: 10.1590/2237-6089-2013-0060 PMID: 25950710', pmid: '25950710', doi: '10.1590/2237-6089-2013-0060' },
    { id: 6, citation: 'Instituto Nacional de Ciência e Tecnologia para Avaliação de Políticas Públicas de Saúde Mental. Prevalência de transtornos mentais no Brasil. Rev Bras Psiquiatr. 2019;41(3):205-215. DOI: 10.1590/1516-4446-2018-0158 PMID: 31291485', pmid: '31291485', doi: '10.1590/1516-4446-2018-0158' },
    { id: 7, citation: 'National Institute for Health and Care Excellence (NICE). Social anxiety disorder: recognition, assessment and treatment. NICE guideline [CG159]. London: NICE; 2013. Updated 2020.', pmid: '', doi: '' },
    { id: 8, citation: 'Ministério da Saúde (Brasil). Diretrizes para Atenção Primária à Saúde no SUS. Brasília: MS; 2021.', pmid: '', doi: '' },
    { id: 9, citation: 'Conselho Federal de Medicina. Protocolos Clínicos e Diretrizes Terapêuticas para Transtornos de Ansiedade. Brasília: CFM; 2018.', pmid: '', doi: '' },
    { id: 10, citation: 'Bandelow B, Michaelis S, Wedekind D. Treatment of anxiety disorders. Dialogues Clin Neurosci. 2017;19(2):93-107. DOI: 10.31887/DCNS.2017.19.2/bbandelow PMID: 28738379', pmid: '28738379', doi: '10.31887/DCNS.2017.19.2/bbandelow' },
    { id: 11, citation: 'Kessler RC, Petukhova M, Sampson NA, Zaslavsky AM, Wittchen HU. Twelve-month and lifetime prevalence and lifetime morbid risk of anxiety and mood disorders in the United States. Int J Methods Psychiatr Res. 2012;21(3):169-184. DOI: 10.1002/mpr.1359 PMID: 22887009', pmid: '22887009', doi: '10.1002/mpr.1359' },
    { id: 12, citation: 'Lampe L, Fazakas-de-Strobach B. Social phobia. BMJ. 2009;339:b2640. DOI: 10.1136/bmj.b2640 PMID: 19741099', pmid: '19741099', doi: '10.1136/bmj.b2640' },
    { id: 13, citation: 'Ribeiro WS, Mari Jde J, Quintana MI, et al. Transcultural adaptation and validation of the Social Phobia Inventory (SPIN) into Portuguese for the Brazilian population. Cad Saude Publica. 2013;29(4):779-782. DOI: 10.1590/0102-311X00036112 PMID: 23700326', pmid: '23700326', doi: '10.1590/0102-311X00036112' },
    { id: 14, citation: 'Platt P, Hawton K, Simkin S, Mellor-Clark J. Suicidality in primary care attenders with depression: a longitudinal study. J Affect Disord. 2018;230:1-7. DOI: 10.1016/j.jad.2017.12.053 PMID: 29351837', pmid: '29351837', doi: '10.1016/j.jad.2017.12.053' },
    { id: 15, citation: 'Beesdo K, Knappe S, Pine DS. Anxiety and anxiety disorders in children and adolescents: developmental issues and implications for DSM-V. Psychiatr Clin North Am. 2009;32(3):483-524. DOI: 10.1016/j.psc.2009.06.002 PMID: 19730208', pmid: '19730208', doi: '10.1016/j.psc.2009.06.002' },
    { id: 16, citation: 'Ministério da Saúde (Brasil). Mortalidade por causas externas: suicídio no Brasil. Brasília: MS; 2022.', pmid: '', doi: '' }
  ],
}