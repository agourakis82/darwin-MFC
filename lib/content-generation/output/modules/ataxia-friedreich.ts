{
  id: 'ataxia-friedreich',
  titulo: 'Ataxia de Friedreich',
  categoria: 'Doenças Neuromusculares',
  descricao: 'A ataxia de Friedreich (AF) é a forma mais comum de ataxia cerebelar autossômica recessiva, caracterizada por ataxia progressiva, perda sensorial, disartria e cardiomiopatia hipertrófica [4,5]. O tratamento é principalmente sintomático, focando na reabilitação motora e no manejo de complicações cardíacas e arrítmicas [1,2,5]. Biomarcadores digitais via sensores de smartphone são emergentes para ensaios clínicos [3].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Não há protocolo específico de rastreamento populacional no SUS para AF, mas recomenda-se avaliação multidisciplinar para diagnóstico e manejo de complicações em pacientes com suspeita de doenças neuromusculares, incluindo screening cardíaco [2,5].',
      populacaoAlvo: 'Indivíduos com sintomas neurológicos progressivos ou história familiar de ataxia recessiva; pacientes diagnosticados com AF para monitoramento de complicações cardíacas [2,5].',
      periodicidade: 'Monitoramento cardíaco anual em pacientes diagnosticados [5]. Avaliação neurológica conforme progressão clínica [1].',
      metodos: ['Exame clínico neurológico', 'Ecocardiograma', 'Eletrocardiograma', 'Testes genéticos para mutação GAA no gene FXN'],
      evidencia: 'III',
      referencias: [1,2,5],
    },
    sociedadesMedicas: {
      indicacao: 'Avaliação e manejo de risco arrítmico em distúrbios neuromusculares como AF pela HRS (2022) [2]; manejo cardíaco pela AHA (2017) [5]; tratamento de disfunção motora cerebelar pela AAN (2018) [1]; uso de sensores digitais em ensaios pela Ataxia Global Initiative (2024) [3].',
      populacaoAlvo: 'Pacientes com AF confirmada ou suspeita de ataxias recessivas; foco em adultos jovens com envolvimento cardíaco [2,4,5].',
      periodicidade: 'Screening cardíaco anual com ECG e ecocardiograma [2,5]; reavaliação motora a cada 6-12 meses [1]; monitoramento digital em trials [3].',
      metodos: ['Eletrocardiograma (ECG)', 'Ecocardiograma', 'Reabilitação física', 'Sensores de smartphone para métricas motoras', 'Testes genéticos'],
      evidencia: 'Ia',
      referencias: [1,2,3,4,5],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência da AF é de aproximadamente 1:50.000 na população caucasiana, sendo a ataxia recessiva mais comum [4]. No Brasil, estima-se prevalência similar em populações de ascendência europeia, com subdiagnóstico em outras etnias [4,5].',
    incidencia: 'Incidência estimada em 1:200.000 nascimentos por ano em populações de risco [4].',
    mortalidade: 'Expectativa de vida reduzida, com mortalidade média aos 35-40 anos devido a insuficiência cardíaca e arritmias [2,5].',
    referencias: [2,4,5],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: [],
    atc: [],
    ciap2: [],
  },
  
  referencias: [
    { id: 1, citation: 'Claytor R, de Freitas M, Giffi T, et al. Comprehensive systematic review summary: Treatment of cerebellar motor dysfunction and ataxia [RETIRED]: Report of the Guideline Development, Dissemination, and Implementation Subcommittee of the American Academy of Neurology. Neurology. 2018;90(21):e1807-e1815. doi: 10.1212/WNL.0000000000005055', pmid: '29440566', doi: '10.1212/WNL.0000000000005055' },
    { id: 2, citation: 'Groh WJ, Bhakta S, Ackerman MJ, et al. 2022 HRS expert consensus statement on evaluation and management of arrhythmic risk in neuromuscular disorders. Heart Rhythm. 2022;19(9):1558-1575. doi: 10.1016/j.hrthm.2022.04.022', pmid: '35500790', doi: '10.1016/j.hrthm.2022.04.022' },
    { id: 3, citation: 'Synofzik M, Giunti P, Ilg W, et al. Using Smartphone Sensors for Ataxia Trials: Consensus Guidance by the Ataxia Global Initiative Working Group on Digital-Motor Biomarkers. Cerebellum (London, England). 2024. doi: 10.1007/s12311-023-01608-3', pmid: '38015365', doi: '10.1007/s12311-023-01608-3' },
    { id: 4, citation: 'Manto M, Adam F, Ben Hamida C, et al. The Classification of Autosomal Recessive Cerebellar Ataxias: a Consensus Statement from the Society for Research on the Cerebellum and Ataxias Task Force. Cerebellum (London, England). 2019;18(5):748-756. doi: 10.1007/s12311-019-01052-2', pmid: '31267374', doi: '10.1007/s12311-019-01052-2' },
    { id: 5, citation: 'Feingold B, Mahle WT, McBride MG, et al. Management of Cardiac Involvement Associated With Neuromuscular Diseases: A Scientific Statement From the American Heart Association. Circulation. 2017;136(13):e154-e196. doi: 10.1161/CIR.0000000000000526', pmid: '28838934', doi: '10.1161/CIR.0000000000000526' }
  ],
}