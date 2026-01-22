{
  id: 'obesidade',
  titulo: 'Rastreamento e Manejo da Obesidade',
  categoria: 'adultos',
  descricao: 'A obesidade é uma doença crônica multifatorial caracterizada por acúmulo excessivo de tecido adiposo que pode prejudicar a saúde [11,12]. Está associada a comorbidades como síndrome metabólica [2], hipertensão [3,6], apneia obstrutiva do sono [4], diabetes em idosos [5], esteatose hepática metabólica [8] e risco vascular [7]. No contexto brasileiro, representa um desafio significativo para o sistema de saúde [12,13].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Avaliação antropométrica para identificação de sobrepeso e obesidade em consultas de atenção primária, com ênfase em manejo integrado para doença crônica [13]. Uso de liraglutida indicado para obesidade grau III ou II com comorbidades, após falha em mudanças de estilo de vida [14].',
      populacaoAlvo: 'Adultos e adolescentes com IMC ≥25 kg/m², priorizando aqueles com fatores de risco como hipertensão, diabetes ou dislipidemia [13,14].',
      periodicidade: 'Monitoramento anual ou a cada consulta de rotina para avaliação de peso e IMC; reavaliação a cada 3-6 meses durante tratamento farmacológico [13,14].',
      metodos: ['Medição de peso e altura para cálculo de IMC', 'Circunferência da cintura', 'Avaliação de composição corporal quando disponível'],
      evidencia: 'IIb',
      referencias: [13, 14],
    },
    sociedadesMedicas: {
      indicacao: 'Rastreamento universal de obesidade em adultos por meio de medidas antropométricas, com intervenções lifestyle como primeira linha; farmacoterapia para obesidade clínica (IMC ≥30 kg/m² ou ≥27 kg/m² com comorbidades) [11,12].',
      populacaoAlvo: 'Todos os adultos ≥18 anos, com foco em indivíduos com IMC ≥25 kg/m² e comorbidades cardiometabólicas [11,12].',
      periodicidade: 'Avaliação anual em adultos; mais frequente (a cada 3-6 meses) em casos de tratamento ativo [11,12].',
      metodos: ['Cálculo de IMC', 'Medição de circunferência abdominal', 'Avaliação de risco metabólico integrada'],
      evidencia: 'Ia',
      referencias: [11, 12],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'Globalmente, a prevalência de obesidade em adultos é de 13% (cerca de 1 bilhão de pessoas em 2022) [11]. No Brasil, estima-se em 22,4% entre adultos em 2021 [12,13].',
    incidencia: 'A incidência anual de obesidade varia de 1 a 2% em populações adultas, com maior risco em indivíduos com sobrepeso inicial [11,12].',
    mortalidade: 'A obesidade contribui para aproximadamente 4,7 milhões de mortes anuais globalmente, principalmente por doenças cardiovasculares e metabólicas [7,11]. No Brasil, associa-se a elevada morbimortalidade por DCNT [12,13].',
    referencias: [7, 11, 12, 13],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['8308-1', '39156-5', '29463-7', '8302-4', '59562-8'],
    ciap2: ['A92', 'A98'],
    atc: ['A10AE05'],
  },
  
  referencias: [
    { id: 1, citation: 'Authors et al. Consensus Statement on Vitamin D Status Assessment and Supplementation: Whys, Whens, and Hows. Endocrine reviews. 2024. PMID: 38676447. DOI: 10.1210/endrev/bnae009', pmid: '38676447', doi: '10.1210/endrev/bnae009' },
    { id: 2, citation: 'Authors et al. Consensus Statement on the definition and classification of metabolic hyperferritinaemia. Nature reviews. Endocrinology. 2023. PMID: 36805052. DOI: 10.1038/s41574-023-00807-6', pmid: '36805052', doi: '10.1038/s41574-023-00807-6' },
    { id: 3, citation: 'Authors et al. 2016 European Society of Hypertension guidelines for the management of high blood pressure in children and adolescents. Journal of hypertension. 2016. PMID: 27467768. DOI: 10.1097/HJH.0000000000001039', pmid: '27467768', doi: '10.1097/HJH.0000000000001039' },
    { id: 4, citation: 'Authors et al. International Consensus Document on Obstructive Sleep Apnea. Archivos de bronconeumologia. 2022. PMID: 33875282. DOI: 10.1016/j.arbres.2021.03.017', pmid: '33875282', doi: '10.1016/j.arbres.2021.03.017' },
    { id: 5, citation: 'Authors et al. Treatment of Diabetes in Older Adults: An Endocrine Society* Clinical Practice Guideline. The Journal of clinical endocrinology and metabolism. 2019. PMID: 30903688. DOI: 10.1210/jc.2019-00198', pmid: '30903688', doi: '10.1210/jc.2019-00198' },
    { id: 6, citation: 'Authors et al. 2024 European Society of Hypertension clinical practice guidelines for the management of arterial hypertension. European journal of internal medicine. 2024. PMID: 38914505. DOI: 10.1016/j.ejim.2024.05.033', pmid: '38914505', doi: '10.1016/j.ejim.2024.05.033' },
    { id: 7, citation: 'Authors et al. SEA 2024 Standards for Global Control of Vascular Risk. Clinica e investigacion en arteriosclerosis : publicacion oficial de la Sociedad Espanola de Arteriosclerosis. 2024. PMID: 38490888. DOI: 10.1016/j.arteri.2024.02.001', pmid: '38490888', doi: '10.1016/j.arteri.2024.02.001' },
    { id: 8, citation: 'Authors et al. Multidisciplinary clinical practice guideline on the management of metabolic hepatic steatosis. Gastroenterologia y hepatologia. 2025. PMID: 40221023. DOI: 10.1016/j.gastrohep.2025.502442', pmid: '40221023', doi: '10.1016/j.gastrohep.2025.502442' },
    { id: 9, citation: 'Authors et al. Eligibility criteria for Menopausal Hormone Therapy (MHT): a position statement from a consortium of scientific societies for the use of MHT in women with medical conditions. MHT Eligibility Criteria Group. Maturitas. 2022. PMID: 36081216. DOI: 10.1016/j.maturitas.2022.08.008', pmid: '36081216', doi: '10.1016/j.maturitas.2022.08.008' },
    { id: 10, citation: 'Authors et al. Fasting is not routinely required for determination of a lipid profile: clinical and laboratory implications including flagging at desirable concentration cut-points-a joint consensus statement from the European Atherosclerosis Society and European Federation of Clinical Chemistry and Laboratory Medicine. European heart journal. 2016. PMID: 27122601. DOI: 10.1093/eurheartj/ehw152', pmid: '27122601', doi: '10.1093/eurheartj/ehw152' },
    { id: 11, citation: 'The Obesity Society. Clinical Guidelines for the Evaluation and Management of Overweight and Obesity in Adults. The Obesity Society; 2022. Available from: https://www.obesity.org/', pmid: '', doi: '' },
    { id: 12, citation: 'Associação Brasileira para o Estudo da Obesidade e da Síndrome Metabólica. Diretrizes Brasileiras de Obesidade 2022. ABESO; 2022. Available from: https://abeso.org.br/', pmid: '', doi: '' },
    { id: 13, citation: 'Ministério da Saúde (Brazil). Estratégias para o Cuidado da Pessoa com Doença Crônica - Obesidade. Ministério da Saúde; 2014. Available from: https://bvsms.saude.gov.br/bvs/publicacoes/estrategias_cuidado_doenca_cronica_obesidade_cab38.pdf', pmid: '', doi: '' },
    { id: 14, citation: 'CONITEC - Comissão Nacional de Incorporação de Tecnologias. Protocolo de Uso - Liraglutida para Obesidade. Ministério da Saúde; 2023. Available from: https://www.gov.br/conitec/pt-br', pmid: '', doi: '' }
  ],
}