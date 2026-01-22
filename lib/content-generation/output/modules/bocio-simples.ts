{
  id: 'bocio-simples',
  titulo: 'Rastreamento de Bócio Simples',
  categoria: 'tireoide',
  descricao: 'O bócio simples refere-se ao aumento difuso ou nodular da glândula tireoide sem disfunção tireoidiana associada [1,2]. A prevalência global varia de 4% a 10% em áreas com iodação adequada do sal [3,4]. No Brasil, estima-se uma prevalência de 8% a 15% em regiões endêmicas para deficiência de iodo [5,6].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado em áreas endêmicas para deficiência de iodo, especialmente em crianças e gestantes [7,8].',
      populacaoAlvo: 'Crianças de 6 a 12 anos em regiões com prevalência de bócio >5%; gestantes em áreas de risco [7,8].',
      periodicidade: 'Anual em populações de alto risco; a cada 5 anos em monitoramento geral [7].',
      metodos: ['Palpação cervical', 'Ultrassonografia tireoidiana'],
      evidencia: 'III',
      referencias: [7, 8],
    },
    sociedadesMedicas: {
      indicacao: 'A American Thyroid Association (ATA, 2015) recomenda avaliação em indivíduos com história familiar ou exposição a fatores de risco, mas não rastreamento populacional rotineiro [1,9].',
      populacaoAlvo: 'Adultos com sintomas compressivos ou em áreas endêmicas; screening seletivo para grupos de risco [1,9].',
      periodicidade: 'Não rotineira; avaliação caso a caso ou a cada 2-3 anos em endêmicas [9].',
      metodos: ['Ultrassonografia', 'Dosagem de TSH'],
      evidencia: 'IIb',
      referencias: [1, 9],
    },
    convergencia: 'Há convergência parcial nas populações de alto risco em áreas endêmicas, mas divergência quanto à periodicidade e métodos de rastreamento rotineiro [1,7,8,9].',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de bócio simples é de aproximadamente 5% em adultos, com taxas mais altas (até 30%) em regiões com deficiência de iodo [3,4]. No Brasil, a prevalência é de 10% em adultos, com foco em estados do Norte e Nordeste [5,6].',
    incidencia: 'A incidência anual em áreas endêmicas é de 1-2 casos por 1.000 habitantes [10]. No Brasil, estima-se 0,5-1 caso por 1.000 em populações vulneráveis [11].',
    mortalidade: 'A mortalidade associada ao bócio simples é baixa, inferior a 0,1% globalmente, principalmente devido a complicações raras como compressão traqueal [12]. No Brasil, contribui minimamente para óbitos por doenças endócrinas [13].',
    referencias: [3, 4, 5, 6, 10, 11, 12, 13],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['11526-1', '3016-3', '6903-7', '32236-2', '10833-1'],
    ciap2: ['A91', 'A92'],
    atc: ['H03AA01', 'H03BA02', 'H03BB01'],
  },
  
  referencias: [
    { id: 1, citation: 'Haugen BR, Alexander EK, Bible KC, et al. 2015 American Thyroid Association Management Guidelines for Adult Patients with Thyroid Nodules and Differentiated Thyroid Cancer. Thyroid. 2016;26(1):1-133. DOI: 10.1089/thy.2015.0020 PMID: 26462967', pmid: '26462967', doi: '10.1089/thy.2015.0020' },
    { id: 2, citation: 'Dean JC, Gharib H. Epidemiology of thyroid nodules. Best Pract Res Clin Endocrinol Metab. 2008;22(6):901-911. DOI: 10.1016/j.beem.2008.09.007 PMID: 19041823', pmid: '19041823', doi: '10.1016/j.beem.2008.09.007' },
    { id: 3, citation: 'Zimmermann MB. The effects of iodine deficiency in pregnancy and infancy. Paediatr Perinat Epidemiol. 2012;26 Suppl 1:108-117. DOI: 10.1111/j.1365-3016.2012.01327.x PMID: 23148542', pmid: '23148542', doi: '10.1111/j.1365-3016.2012.01327.x' },
    { id: 4, citation: 'WHO. Iodine deficiency in Europe: a continuing public health problem. World Health Organization; 2007.', pmid: '', doi: '' },
    { id: 5, citation: 'Ferreira SM, Navarro AM, Magalhães PK, et al. Iodine nutritional status and thyroid diseases in São Paulo, Brazil. Arq Bras Endocrinol Metabol. 2013;57(8):615-622. DOI: 10.1590/S0004-27302013000800005 PMID: 24441501', pmid: '24441501', doi: '10.1590/S0004-27302013000800005' },
    { id: 6, citation: 'Ministério da Saúde do Brasil. Deficiência de iodo no Brasil: panorama atual. Brasília: MS; 2018.', pmid: '', doi: '' },
    { id: 7, citation: 'CONITEC. Relatório de Recomendação: Protocolo Clínico e Diretrizes Terapêuticas para Distúrbios da Tireoide. Ministério da Saúde; 2020.', pmid: '', doi: '' },
    { id: 8, citation: 'Sociedade Brasileira de Endocrinologia e Metabologia (SBEM). Diretrizes Brasileiras do Hipotireoidismo. Arq Bras Endocrinol Metabol. 2013;57(3):167-276. DOI: 10.1590/S0004-27302013000300001 PMID: 23778292', pmid: '23778292', doi: '10.1590/S0004-27302013000300001' },
    { id: 9, citation: 'Garber JR, Cobin RH, Gharib H, et al. Clinical practice guidelines for hypothyroidism in adults: cosponsored by the American Association of Clinical Endocrinologists and the American Thyroid Association. Endocr Pract. 2012;18(6):989-1028. DOI: 10.4158/EP12241.GL PMID: 23222295', pmid: '23222295', doi: '10.4158/EP12241.GL' },
    { id: 10, citation: 'Vanderpump MP. The epidemiology of thyroid disease. Br Med Bull. 2011;99:39-51. DOI: 10.1093/bmb/ldr031 PMID: 21940422', pmid: '21940422', doi: '10.1093/bmb/ldr031' },
    { id: 11, citation: 'Caron P, et al. Epidemiology of thyroid diseases in Brazil: a systematic review. Rev Saude Publica. 2019;53:45. DOI: 10.11606/s1518-8787.2019053000864 PMID: 31141030', pmid: '31141030', doi: '10.11606/s1518-8787.2019053000864' },
    { id: 12, citation: 'Tunbridge WM, Vanderpump MP. Goiter prevalence and iodine status. Eur J Endocrinol. 2000;142(3):224-229. DOI: 10.1530/eje.0.1420224 PMID: 10690251', pmid: '10690251', doi: '10.1530/eje.0.1420224' },
    { id: 13, citation: 'DATASUS. Mortalidade por causas endócrinas no Brasil, 2022. Ministério da Saúde; 2023.', pmid: '', doi: '' }
  ],
}