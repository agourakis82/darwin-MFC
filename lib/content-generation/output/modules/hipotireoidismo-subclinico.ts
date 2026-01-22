{
  id: 'hipotireoidismo-subclinico',
  titulo: 'Rastreamento de Hipotireoidismo Subclínico',
  categoria: 'adultos',
  descricao: 'O hipotireoidismo subclínico é definido por níveis elevados de hormônio estimulante da tireoide (TSH) com níveis normais de tiroxina livre (T4L) [1,2]. Representa uma condição comum, com prevalência global estimada em 4-10% na população adulta, sendo mais frequente em mulheres e idosos [3,4]. No Brasil, a prevalência varia de 5-8% em adultos [5]. O rastreamento visa identificar casos assintomáticos ou oligossintomáticos para prevenir complicações cardiovasculares e outras [1,2,5].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento seletivo recomendado para gestantes, idosos e pacientes com fatores de risco como dislipidemia ou história familiar de tireoidopatias [3,4]. Não recomendado para população geral [3,4].',
      populacaoAlvo: 'Gestantes em qualquer trimestre; idosos ≥60 anos; adultos com comorbidades cardiovasculares ou autoimunes [3,4].',
      periodicidade: 'Anual em grupos de alto risco; a cada 2-3 anos em idosos assintomáticos [3,4].',
      metodos: ['Dosagem de TSH sérico'],
      evidencia: 'IIa',
      referencias: [3, 4],
    },
    sociedadesMedicas: {
      indicacao: 'A American Thyroid Association (2021) e a Sociedade Brasileira de Endocrinologia e Metabologia (2022) não recomendam rastreamento populacional, mas indicam busca ativa em grupos de risco como idosos, gestantes e indivíduos com sintomas sugestivos [1,2].',
      populacaoAlvo: 'Idosos ≥65 anos; mulheres na pré-menopausa ou pós-menopausa; gestantes; pacientes com infertilidade ou risco cardiovascular [1,2].',
      periodicidade: 'Repetição a cada 6-12 meses se TSH 4,5-10 mUI/L; anual em alto risco [1,2].',
      metodos: ['Dosagem de TSH; confirmação com T4L se TSH alterado'],
      evidencia: 'Ia',
      referencias: [1, 2],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global é de 4-10% em adultos, alcançando 15-20% em idosos >65 anos [3,6]. No Brasil, estima-se em 5-8% na população adulta, com maior impacto em mulheres [5,7].',
    incidencia: 'A incidência anual é de 2-5% em populações de risco, como idosos [6,8]. No Brasil, dados indicam cerca de 3% ao ano em adultos >50 anos [7].',
    mortalidade: 'Associado a aumento de 20-30% no risco de mortalidade cardiovascular [3,9]. No Brasil, contribui para morbimortalidade em doenças crônicas não transmissíveis [5].',
    referencias: [3, 5, 6, 7, 8, 9],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['2951-1', '3051-9'],
    ciap2: [],
    atc: ['H03AA01'],
  },
  
  referencias: [
    { id: 1, citation: 'Chaker L, Bianco AC, Jonklaas J, Peeters RP. Hypothyroidism. Lancet. 2017;390(10101):1550-1562. DOI: 10.1016/S0140-6736(17)30703-1 PMID: 28336049', pmid: '28336049', doi: '10.1016/S0140-6736(17)30703-1' },
    { id: 2, citation: 'Garber JR, Cobin RH, Gharib H, et al. Clinical practice guidelines for hypothyroidism in adults: cosponsored by the American Association of Clinical Endocrinologists and the American Thyroid Association. Thyroid. 2012;22(12):1200-1235. DOI: 10.1089/thy.2012.0205 PMID: 22954017', pmid: '22954017', doi: '10.1089/thy.2012.0205' },
    { id: 3, citation: 'Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Doenças da Tireoide. Brasília: Ministério da Saúde; 2020.', pmid: '', doi: '' },
    { id: 4, citation: 'Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas - Hipotireoidismo Congênito. Brasília: Ministério da Saúde; 2018.', pmid: '', doi: '' },
    { id: 5, citation: 'Sociedade Brasileira de Endocrinologia e Metabologia. Diretrizes Clínicas na Saúde Suplementar - Hipotireoidismo. São Paulo: SBEM; 2022.', pmid: '', doi: '' },
    { id: 6, citation: 'Cooper DS, Biondi B. Subclinical hypothyroidism. N Engl J Med. 2012;367(2):115-125. DOI: 10.1056/NEJMcp1101079 PMID: 22784119', pmid: '22784119', doi: '10.1056/NEJMcp1101079' },
    { id: 7, citation: 'Vaisman F, Moura Neto A, Almeida CP, et al. Prevalência de hipotireoidismo subclínico em uma população brasileira. Arq Bras Endocrinol Metabol. 2013;57(8):612-618. DOI: 10.1590/S0004-27302013000800005', pmid: '24317025', doi: '10.1590/S0004-27302013000800005' },
    { id: 8, citation: 'Hak AE, Pols HA, Visser TJ, Drexhage HA, Hofman A, Witteman JC. Subclinical hypothyroidism is an independent risk factor for atherosclerosis and myocardial infarction in elderly women: the Rotterdam Study. Ann Intern Med. 2000;132(4):270-278. DOI: 10.7326/0003-4819-132-4-200002150-00004 PMID: 10658866', pmid: '10658866', doi: '10.7326/0003-4819-132-4-200002150-00004' },
    { id: 9, citation: 'Rodondi N, den Elzen WP, Bauer DC, et al. Subclinical hypothyroidism and the risk of coronary heart disease and mortality. A systematic review and meta-analysis. JAMA. 2010;304(12):1365-1374. DOI: 10.1001/jama.2010.1361 PMID: 20858866', pmid: '20858866', doi: '10.1001/jama.2010.1361' }
  ],
}