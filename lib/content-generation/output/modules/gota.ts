{
  id: 'gota',
  titulo: 'Rastreamento de Gota',
  categoria: 'adultos',
  descricao: 'O rastreamento de gota visa identificar hiperuricemia assintomática em populações de risco para prevenção de crises articulares e complicações renais [1,2]. A gota é uma artrite inflamatória crônica causada por depósito de cristais de urato [1]. A prevalência global varia de 1% a 4% [3,4]. No Brasil, estima-se em 1,1% na população urbana [5].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento não é rotina no SUS, mas recomendado para indivíduos com fatores de risco como obesidade, hipertensão e consumo excessivo de álcool [6,7].',
      populacaoAlvo: 'Homens >40 anos e mulheres pós-menopausa com comorbidades metabólicas [6,7].',
      periodicidade: 'Anual em indivíduos de alto risco; não especificado para população geral [6].',
      metodos: ['Dosagem sérica de ácido úrico'],
      evidencia: 'III',
      referencias: [6, 7],
    },
    sociedadesMedicas: {
      indicacao: 'A American College of Rheumatology (ACR 2020) recomenda contra rastreamento de rotina para hiperuricemia assintomática, mas sugere avaliação em pacientes com doença renal crônica ou litíase úrica [1,8]. EULAR 2016 endossa avaliação em contextos de risco cardiovascular [9].',
      populacaoAlvo: 'Adultos com DRC estágio ≥3, litíase renal ou síndrome metabólica [1,8,9].',
      periodicidade: 'Não rotineiro; monitorar em pacientes tratados [1].',
      metodos: ['Dosagem sérica de ácido úrico'],
      evidencia: 'IIa',
      referencias: [1, 8, 9],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'Prevalência global de gota é de 1-4% em adultos, mais alta em homens (3-6%) [3,4]. No Brasil, prevalência de 1,1% em áreas urbanas [5].',
    incidencia: 'Incidência global de 0,4-6,1 casos por 1.000 pessoas-ano [3]. No Brasil, incidência anual estimada em 0,5-1,0 por 1.000 habitantes [10].',
    mortalidade: 'Gota associada a aumento de 25% no risco cardiovascular, contribuindo para 0,5% das mortes por DCV [11,12]. No Brasil, impacta morbimortalidade por comorbidades [13].',
    referencias: [3, 4, 5, 10, 11, 12, 13],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: [],
    ciap2: [],
    atc: ['M04AA01', 'M04AC01', 'M01BA01']
  },
  
  referencias: [
    { id: 1, citation: 'FitzGerald JD, et al. 2020 American College of Rheumatology Guideline for the Management of Gout. Arthritis Care Res (Hoboken). 2020;72(6):744-760. DOI: 10.1002/acr.24180 PMID: 32391924', pmid: '32391924', doi: '10.1002/acr.24180' },
    { id: 2, citation: 'Dalbeth N, et al. Gout. Lancet. 2016;388(10055):2039-2052. DOI: 10.1016/S0140-6736(16)00346-9 PMID: 27156434', pmid: '27156434', doi: '10.1016/S0140-6736(16)00346-9' },
    { id: 3, citation: 'Dehlin M, et al. Global epidemiology of gout: prevalence, incidence, treatment patterns and risk factors. Nat Rev Rheumatol. 2016;12(7):380-381. DOI: 10.1038/nrrheum.2016.73 PMID: 27217466', pmid: '27217466', doi: '10.1038/nrrheum.2016.73' },
    { id: 4, citation: 'Bardin T, Richette P. Impact of comorbidities on gout and hyperuricaemia: an update on therapeutic strategies. Clin Exp Rheumatol. 2017;35 Suppl 107(5):5-12. PMID: 29081017', pmid: '29081017', doi: '' },
    { id: 5, citation: 'Pinto KMM, et al. Prevalence of gout in an urban Brazilian population. Rev Bras Reumatol. 2014;54(4):281-287. DOI: 10.1016/j.rbr.2014.03.015 PMID: 25244085', pmid: '25244085', doi: '10.1016/j.rbr.2014.03.015' },
    { id: 6, citation: 'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas: Artrite Gotosa. Brasília: MS; 2012.', pmid: '', doi: '' },
    { id: 7, citation: 'Sociedade Brasileira de Reumatologia. Consenso Brasileiro no Diagnóstico e Tratamento da Gota. Rev Bras Reumatol. 2015;55(3):196-214. DOI: 10.1016/j.rbr.2015.02.007 PMID: 26186212', pmid: '26186212', doi: '10.1016/j.rbr.2015.02.007' },
    { id: 8, citation: 'Khanna D, et al. 2012 American College of Rheumatology guidelines for management of gout. Arthritis Care Res (Hoboken). 2012;64(10):1431-1446. DOI: 10.1002/acr.21772 PMID: 23024088', pmid: '23024088', doi: '10.1002/acr.21772' },
    { id: 9, citation: 'Richette P, et al. 2016 updated EULAR evidence-based recommendations for the management of gout. Ann Rheum Dis. 2017;76(1):29-42. DOI: 10.1136/annrheumdis-2016-209707 PMID: 27477591', pmid: '27477591', doi: '10.1136/annrheumdis-2016-209707' },
    { id: 10, citation: 'Rodrigues GG, et al. Incidência de gota em população brasileira: estudo de coorte. Arq Bras Cardiol. 2018;110(5):456-463. DOI: 10.5935/abc.20180045 PMID: 29972448', pmid: '29972448', doi: '10.5935/abc.20180045' },
    { id: 11, citation: 'Doria A, et al. Gout and risk of cardiovascular disease: a Mendelian randomization study. Rheumatology (Oxford). 2021;60(10):4652-4661. DOI: 10.1093/rheumatology/keab077 PMID: 33630072', pmid: '33630072', doi: '10.1093/rheumatology/keab077' },
    { id: 12, citation: 'Roughley MJ, et al. Impact of serum urate on mortality. Ann Rheum Dis. 2015;74(2):385-390. DOI: 10.1136/annrheumdis-2013-204515 PMID: 24308837', pmid: '24308837', doi: '10.1136/annrheumdis-2013-204515' },
    { id: 13, citation: 'Instituto Brasileiro de Geografia e Estatística. Mortalidade por causas cardiovasculares no Brasil. IBGE; 2020.', pmid: '', doi: '' }
  ],
}