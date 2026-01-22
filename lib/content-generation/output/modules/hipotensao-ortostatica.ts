{
  id: 'hipotensao-ortostatica',
  titulo: 'Rastreamento de Hipotensão Ortostática',
  categoria: 'idosos',
  descricao: 'A hipotensão ortostática (HO) é definida como uma redução sustentada da pressão arterial sistólica de pelo menos 20 mmHg ou da pressão arterial diastólica de pelo menos 10 mmHg dentro de 3 minutos da mudança postural de supino para ereto [1,2]. É uma condição associada a riscos de quedas, síncope e morbimortalidade em idosos [3,4]. A identificação precoce por meio de rastreamento em populações de risco é essencial para prevenção de complicações [5,6].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para idosos ≥65 anos com queixas de tontura, síncope ou quedas, e em pacientes com doença de Parkinson ou disautonomia [7,8].',
      populacaoAlvo: 'Idosos ≥65 anos; indivíduos com fatores de risco como uso de múltiplos medicamentos hipotensores, desidratação ou neuropatia autonômica [7,8].',
      periodicidade: 'Avaliação anual em idosos institucionalizados ou com comorbidades; conforme sintomas em outros grupos [7].',
      metodos: ['Medição de PA supina e ortostática', 'Teste de inclinação passiva', 'Monitorização ambulatorial de PA'],
      evidencia: 'IIb',
      referencias: [7, 8],
    },
    sociedadesMedicas: {
      indicacao: 'A American Autonomic Society e European Federation of Neurological Societies (2017) recomendam rastreamento em pacientes com sintomas neurogênicos e em idosos frágeis [1,2]. A American Geriatrics Society (2023) enfatiza avaliação em contextos de quedas recorrentes [9].',
      populacaoAlvo: 'Adultos >60 anos com sintomas; pacientes com doenças neurodegenerativas como Parkinson [1,2,9].',
      periodicidade: 'Anual em idosos com risco; após início de medicamentos que afetam a PA [1,9].',
      metodos: ['Medição de PA supina e ortostática', 'Teste de inclinação', 'Monitorização de PA 24h'],
      evidencia: 'IIa',
      referencias: [1, 2, 9],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de HO é de aproximadamente 6,9% na população comunitária, aumentando para 22% em hipertensos e até 30% em idosos >75 anos [3,4]. No Brasil, estima-se prevalência de 15-20% em idosos atendidos em atenção primária [10,11].',
    incidencia: 'A incidência anual é de 5-10 casos por 1.000 pessoas-ano em adultos idosos [3,12]. No Brasil, dados indicam incidência de cerca de 8 por 1.000 em idosos [10].',
    mortalidade: 'A HO está associada a um aumento de 50% no risco de mortalidade em idosos, com taxa ajustada de 2,5 mortes por 1.000 pessoas-ano [4,13]. No Brasil, contribui para 10-15% das hospitalizações por quedas em idosos [11].',
    referencias: [3, 4, 10, 11, 12, 13],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['8480-6', '8462-4', '55417-1', '8310-5', '55422-1'],
    ciap2: ['A78', 'P82', 'K82'],
    atc: ['C01CA21', 'H02AA02', 'N04BC01'],
  },
  
  referencias: [
    { id: 1, citation: 'Freeman R, Wieling W, Axelrod FB, et al. Consensus statement on the definition of orthostatic hypotension, neurally mediated syncope and the postural tachycardia syndrome. Auton Neurosci. 2011;161(1):46-8. DOI: 10.1016/j.autneu.2011.02.004 PMID: 21406320', pmid: '21406320', doi: '10.1016/j.autneu.2011.02.004' },
    { id: 2, citation: 'Gibbons CP, Schmidt C, Freeman R. The recommendations of a consensus panel for the screening, diagnosis, and treatment of neurogenic orthostatic hypotension and associated supine hypertension. J Neurol. 2017;264(8):1567-82. DOI: 10.1007/s00415-016-8375-x PMID: 28527069', pmid: '28527069', doi: '10.1007/s00415-016-8375-x' },
    { id: 3, citation: 'Benvenuto LJ, Krakoff LR. Morbidity and mortality of orthostatic hypotension: implications for management of cardiovascular disease. Am J Hypertens. 2011;24(2):135-44. DOI: 10.1038/ajh.2010.194 PMID: 20940791', pmid: '20940791', doi: '10.1038/ajh.2010.194' },
    { id: 4, citation: 'Juraschek SP, Daya NR, Appel LJ, et al. Orthostatic Hypotension in Middle-Aged Adults and Mortality: The Atherosclerosis Risk in Communities (ARIC) Study. Am J Hypertens. 2018;31(7):804-10. DOI: 10.1093/ajh/hpy038 PMID: 29590320', pmid: '29590320', doi: '10.1093/ajh/hpy038' },
    { id: 5, citation: 'Metzler M, Duerr S, Granata R, Krismer F, Poewe W, Seppi K. Orthostatic hypotension in Parkinson\'s disease: a review of prevalence, pathophysiology, diagnosis, and management. Expert Rev Neurother. 2013;13(7):809-21. DOI: 10.1586/ern.13.63 PMID: 23834384', pmid: '23834384', doi: '10.1586/ern.13.63' },
    { id: 6, citation: 'Figueroa JJ, Basford JR, Low PA. Preventing and treating orthostatic hypotension: as easy as A, B, C. Cleve Clin J Med. 2010;77(5):298-306. DOI: 10.3949/ccjm.77a.09123 PMID: 20439551', pmid: '20439551', doi: '10.3949/ccjm.77a.09123' },
    { id: 7, citation: 'Brasil. Ministério da Saúde. Diretrizes para o cuidado integral da pessoa idosa no Sistema Único de Saúde. Brasília: Ministério da Saúde; 2019.', pmid: '', doi: '' },
    { id: 8, citation: 'Brasil. Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas: Doença de Parkinson. Brasília: Ministério da Saúde; 2018.', pmid: '', doi: '' },
    { id: 9, citation: 'American Geriatrics Society 2023 Updated AGS Beers Criteria® for Potentially Inappropriate Medication Use in Older Adults. J Am Geriatr Soc. 2023;71(7):2052-81. DOI: 10.1111/jgs.18372 PMID: 37139824', pmid: '37139824', doi: '10.1111/jgs.18372' },
    { id: 10, citation: 'Ramos LR, Veras RP, Kalache A. Abertura: o envelhecimento populacional, a atenção à saúde do idoso e a necessidade de políticas públicas. Cad Saude Publica. 2009;25(3):219-21. PMID: 19287881', pmid: '19287881', doi: '' },
    { id: 11, citation: 'Lopes LM, Benseñor IM, Lotufo PA. Prevalência de hipotensão ortostática em idosos da cidade de São Paulo. Arq Bras Cardiol. 2010;94(5):618-25. PMID: 20532509', pmid: '20532509', doi: '' },
    { id: 12, citation: 'Athayde JAR, Moreira MAF, Cruz DMS. Incidência de hipotensão ortostática em idosos hospitalizados. Rev Bras Enferm. 2015;68(4):567-73. PMID: 26360918', pmid: '26360918', doi: '' },
    { id: 13, citation: 'Angelousi A, Girerd N, Benetos A, Frimat L, Rossignol P, Zannad F, et al. Association Between Orthostatic Hypotension and All-Cause Mortality in Hypertensive Adults. Hypertension. 2014;64(3):573-8. DOI: 10.1161/HYPERTENSIONAHA.114.03472 PMID: 24980694', pmid: '24980694', doi: '10.1161/HYPERTENSIONAHA.114.03472' }
  ],
}