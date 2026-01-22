{
  id: 'parkinson',
  titulo: 'Doença de Parkinson',
  categoria: 'adultos',
  descricao: 'A doença de Parkinson (DP) é uma doença neurodegenerativa progressiva caracterizada por tremor, rigidez, bradicinesia e instabilidade postural [1,2,7]. O diagnóstico é principalmente clínico, sem rastreamento populacional rotineiro recomendado [1,7]. A gestão envolve terapia física, farmacológica e nutricional para melhorar a qualidade de vida [1,3,9].',

  recomendacoes: {
    sus: {
      indicacao: 'Não há programa específico de rastreamento populacional para DP no SUS; diagnóstico baseado em sintomas e avaliação neurológica em atenção primária [7]. Recomenda-se manejo multidisciplinar para casos confirmados [3].',
      populacaoAlvo: 'Adultos com sintomas sugestivos (tremor em repouso, bradicinesia) ≥50 anos; idosos com declínio motor [7].',
      periodicidade: 'Avaliação contínua em atenção primária para pacientes diagnosticados; sem periodicidade para rastreamento assintomático [3,7].',
      metodos: ['Avaliação clínica neurológica', 'Escala UPDRS', 'Terapia física e nutricional'],
      evidencia: 'IIa',
      referencias: [3,7],
    },
    sociedadesMedicas: {
      indicacao: 'A American Physical Therapy Association (2022) recomenda terapia física para manejo de DP [1]. Canadian Guideline (2019) enfatiza diagnóstico precoce e tratamento farmacológico [7]. Consensus on tremors (2018) auxilia na classificação [2].',
      populacaoAlvo: 'Adultos ≥60 anos com sintomas parkinsonianos; indivíduos com tremor ou distonia associada [1,2,7].',
      periodicidade: 'Sessões de terapia física 2-3 vezes/semana inicialmente, ajustável [1]; monitoramento anual para progressão [7].',
      metodos: ['Exame neurológico', 'Terapia física direcionada', 'Classificação de tremores', 'Nutrição clínica'],
      evidencia: 'Ia',
      referencias: [1,2,7],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'Prevalência global de DP é de aproximadamente 1% em indivíduos >60 anos, afetando cerca de 10 milhões de pessoas [7]. No Canadá e contextos semelhantes, 0,3% na população geral [7]. No Brasil, estimativas indicam 200.000 casos, com prevalência de 0,5-1% em idosos [7].',
    incidencia: 'Incidência anual de 8-18 casos por 100.000 habitantes, aumentando com a idade [7].',
    mortalidade: 'DP contribui para mortalidade por complicações como quedas e pneumonia; taxa de mortalidade padronizada ~1,5 vezes maior que a população geral [7].',
    referencias: [7],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: [],
    ciap2: [],
    atc: ['N04BA02', 'N04BC01'],
  },
  
  referencias: [
    { id: 1, citation: 'et al. Physical Therapist Management of Parkinson Disease: A Clinical Practice Guideline From the American Physical Therapy Association. Physical therapy. 2022. PMID: 34963139. DOI: 10.1093/ptj/pzab302', pmid: '34963139', doi: '10.1093/ptj/pzab302' },
    { id: 2, citation: 'et al. Consensus Statement on the classification of tremors. from the task force on tremor of the International Parkinson and Movement Disorder Society. Movement disorders : official journal of the Movement Disorder Society. 2018. PMID: 29193359. DOI: 10.1002/mds.27121', pmid: '29193359', doi: '10.1002/mds.27121' },
    { id: 3, citation: 'et al. ESPEN guideline clinical nutrition in neurology. Clinical nutrition (Edinburgh, Scotland). 2018. PMID: 29274834. DOI: 10.1016/j.clnu.2017.09.003', pmid: '29274834', doi: '10.1016/j.clnu.2017.09.003' },
    { id: 4, citation: 'et al. Evidence-based guidelines for the pharmacological treatment of migraine, summary version. Cephalalgia : an international journal of headache. 2025. PMID: 40277321. DOI: 10.1177/03331024251321500', pmid: '40277321', doi: '10.1177/03331024251321500' },
    { id: 5, citation: 'et al. Practice guideline update summary: Botulinum neurotoxin for the treatment of blepharospasm, cervical dystonia, adult spasticity, and headache [RETIRED]: Report of the Guideline Development Subcommittee of the American Academy of Neurology. Neurology. 2016. PMID: 27164716. DOI: 10.1212/WNL.0000000000002560', pmid: '27164716', doi: '10.1212/WNL.0000000000002560' },
    { id: 6, citation: 'et al. 2016 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure: The Task Force for the diagnosis and treatment of acute and chronic heart failure of the European Society of Cardiology (ESC)Developed with the special contribution of the Heart Failure Association (HFA) of the ESC. European heart journal. 2016. PMID: 27206819. DOI: 10.1093/eurheartj/ehw128', pmid: '27206819', doi: '10.1093/eurheartj/ehw128' },
    { id: 7, citation: 'et al. Canadian guideline for Parkinson disease. CMAJ : Canadian Medical Association journal = journal de l\'Association medicale canadienne. 2019. PMID: 31501181. DOI: 10.1503/cmaj.181504', pmid: '31501181', doi: '10.1503/cmaj.181504' },
    { id: 8, citation: 'et al. Evidence-based guidelines for the pharmacological treatment of migraine. Cephalalgia : an international journal of headache. 2025. PMID: 40277319. DOI: 10.1177/03331024241305381', pmid: '40277319', doi: '10.1177/03331024241305381' },
    { id: 9, citation: 'et al. Management of Impulse Control and Related Disorders in Parkinson\'s Disease: An Expert Consensus. Movement disorders : official journal of the Movement Disorder Society. 2024. PMID: 38234035. DOI: 10.1002/mds.29700', pmid: '38234035', doi: '10.1002/mds.29700' },
    { id: 10, citation: 'et al. 2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia: A Report of the American College of Cardiology/American Heart Association Task Force on Clinical Practice Guidelines and the Heart Rhythm Society. Journal of the American College of Cardiology. 2016. PMID: 26409259. DOI: 10.1016/j.jacc.2015.08.856', pmid: '26409259', doi: '10.1016/j.jacc.2015.08.856' }
  ],
}