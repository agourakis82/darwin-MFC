{
  id: 'hepatite-e',
  titulo: 'Rastreamento de Hepatite E',
  categoria: 'doenças_infecciosas',
  descricao: 'A hepatite E é uma infecção viral aguda causada pelo vírus da hepatite E (HEV), transmitida principalmente por via fecal-oral, frequentemente associada a água contaminada [1]. O rastreamento é direcionado a populações de risco para identificação precoce e prevenção de complicações, como insuficiência hepática fulminante em gestantes [2]. A doença é geralmente autolimitada, mas pode ser crônica em imunossuprimidos [1,2].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento não recomendado de forma rotineira para população geral no SUS, mas indicado para indivíduos com suspeita clínica de hepatite aguda de etiologia desconhecida, gestantes em áreas endêmicas ou com exposição, viajantes retornando de regiões de alta endemicidade e pacientes imunossuprimidos [3].',
      populacaoAlvo: 'Adultos e gestantes com sintomas de hepatite (icterícia, fadiga, náuseas), imunossuprimidos (transplantados, HIV), e populações expostas a fontes de água contaminada ou carne suína crua [3].',
      periodicidade: 'Não aplicável para rastreamento populacional; avaliação caso a caso em situações de risco ou surto [3].',
      metodos: ['Sorologia para IgM anti-HEV', 'PCR para RNA-HEV em soronegativos ou casos crônicos'],
      evidencia: 'III',
      referencias: [3],
    },
    sociedadesMedicas: {
      indicacao: 'A European Association for the Study of the Liver (EASL, 2018) e a American Association for the Study of Liver Diseases (AASLD, 2018) recomendam rastreamento em pacientes com hepatite aguda inexplicada, doença hepática crônica, imunossupressão e gestantes sintomáticas [2,4].',
      populacaoAlvo: 'Indivíduos com elevação de transaminases sem causa aparente, receptores de transplante de órgãos, pacientes em diálise, viajantes de áreas endêmicas (Ásia, África) e gestantes no terceiro trimestre [2,4].',
      periodicidade: 'Avaliação única em situações de risco; monitoramento anual em imunossuprimidos para detecção de infecção crônica [2,4].',
      metodos: ['Sorologia para IgM e IgG anti-HEV', 'Detecção de RNA-HEV por PCR em plasma ou fezes'],
      evidencia: 'IIa',
      referencias: [2, 4],
    },
    convergencia: 'As recomendações apresentam convergência parcial, concordando na indicação para populações de risco específicas, mas divergindo na ênfase em periodicidade para imunossuprimidos nas sociedades médicas internacionais [2,3,4].',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de infecção por HEV é estimada em 20 milhões de infecções anuais, com soroprevalência variando de 1-15% em países industrializados e até 60% em áreas endêmicas [1]. No Brasil, a soroprevalência de anticorpos anti-HEV é de 1-5% na população geral, com picos de até 10% em regiões rurais e populações indígenas [5].',
    incidencia: 'A incidência global de casos sintomáticos é de aproximadamente 3,3 milhões por ano [1]. No Brasil, a incidência é baixa, com cerca de 100-200 casos notificados anualmente, concentrados em surtos esporádicos [3,5].',
    mortalidade: 'Globalmente, a hepatite E causa cerca de 56.600 mortes por ano, principalmente em gestantes (taxa de mortalidade de 20-25%) [1]. No Brasil, a mortalidade é rara, com menos de 5 óbitos reportados anualmente, associada a casos fulminantes em comorbidades [3,6].',
    referencias: [1, 3, 5, 6],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['25412-1', '24379-0', '41922-8', '42977-4', '11068-1'],
    ciap2: ['D72', 'D73'],
    atc: ['J05AB04'],
  },
  
  referencias: [
    { id: 1, citation: 'World Health Organization. Hepatitis E. Geneva: WHO; 2023.', pmid: '', doi: '' },
    { id: 2, citation: 'European Association for the Study of the Liver. EASL Clinical Practice Guidelines: management of acute (fulminant) liver failure. J Hepatol. 2017;66(5):1047-1081. DOI: 10.1016/j.jhep.2016.12.003 PMID: 28372952', pmid: '28372952', doi: '10.1016/j.jhep.2016.12.003' },
    { id: 3, citation: 'Ministério da Saúde (Brasil). Protocolos Clínicos e Diretrizes Terapêuticas para Hepatites Virais A, B, C, D e E. Brasília: Ministério da Saúde; 2020.', pmid: '', doi: '' },
    { id: 4, citation: 'Kamar N, Izopet J, Cintas P, et al. Hepatitis E infection. Curr Opin Gastroenterol. 2018;34(3):153-159. DOI: 10.1097/MOG.0000000000000424 PMID: 29470376', pmid: '29470376', doi: '10.1097/MOG.0000000000000424' },
    { id: 5, citation: 'Passos-Castilho AM, Tarelho LC, Villanova MG. Hepatitis E virus infection in Latin America: A systematic review. J Clin Virol. 2019;111:47-54. DOI: 10.1016/j.jcv.2018.12.011 PMID: 30594048', pmid: '30594048', doi: '10.1016/j.jcv.2018.12.011' },
    { id: 6, citation: 'Dalton HR, Kamar N, Izopet J. Hepatitis E virus: infection, epidemiology and transmission. J Hepatol. 2022;77(Suppl 1):S136-S146. DOI: 10.1016/j.jhep.2022.05.008 PMID: 35504790', pmid: '35504790', doi: '10.1016/j.jhep.2022.05.008' }
  ],
}