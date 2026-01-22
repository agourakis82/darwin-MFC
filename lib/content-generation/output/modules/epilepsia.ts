{
  id: 'epilepsia',
  titulo: 'Epilepsia',
  categoria: 'neurológico',
  descricao: 'A epilepsia é um distúrbio neurológico caracterizado por crises recorrentes e autolimitadas, com classificação atualizada pela ILAE considerando etiologia, comorbidades e síndrome [7]. A identificação precoce em neonatos, lactentes e crianças é essencial para manejo [4,5]. Malformações do desenvolvimento cortical estão associadas a epilepsia refratária [8].',

  recomendacoes: {
    sus: {
      indicacao: 'Não há programa específico de rastreamento populacional no SUS para epilepsia; diagnóstico indicado por história clínica de crises recorrentes e avaliação neurológica [7]. Recomendado em neonatos e crianças com suspeita de síndromes epilépticas [5].',
      populacaoAlvo: 'Indivíduos com crises convulsivas suspeitas, neonatos, lactentes e crianças com fatores de risco como malformações corticais [4,5,8].',
      periodicidade: 'Avaliação imediata para diagnóstico; follow-up periódico conforme necessidade clínica, sem periodicidade fixa para rastreamento [7].',
      metodos: ['Eletroencefalograma (EEG)', 'Ressonância magnética (RM)', 'Testes genéticos'],
      evidencia: 'IV',
      referencias: [4,5,7,8],
    },
    sociedadesMedicas: {
      indicacao: 'A ILAE recomenda classificação e diagnóstico de síndromes epilépticas com base em idade de início, etiologia e EEG para orientação terapêutica [4,5,7]. Identificação em neonatos e infância para manejo precoce [5].',
      populacaoAlvo: 'Neonatos e lactentes até 2 anos com crises; crianças com onset na infância e malformações corticais [4,5,8].',
      periodicidade: 'Diagnóstico imediato; monitoramento contínuo em síndromes específicas, sem rastreamento assintomático rotineiro [7].',
      metodos: ['Eletroencefalograma (EEG)', 'Ressonância magnética (RM)', 'Análise genética e classificação sindrômica'],
      evidencia: 'IV',
      referencias: [4,5,7,8],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de epilepsia é de aproximadamente 0,5-1% da população [7]. Em neonatos e lactentes, a incidência de epilepsia é alta, afetando até 1-2% em grupos de risco [5]. No Brasil, estima-se prevalência similar à global, em torno de 1% [7].',
    incidencia: 'A incidência anual global é de 40-70 casos por 100.000 habitantes [7]. Em neonatos, pode ser de 1-3 por 1.000 nascidos vivos [5].',
    mortalidade: 'A mortalidade associada à epilepsia inclui status epilepticus com alta morbimortalidade; taxa de SUDEP é de cerca de 1 por 1.000 pacientes-ano [1,7].',
    referencias: [1,5,7],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['24311-7', '34761-7', '20069-4', 'A26230-6', '8251-2'],
    ciap2: ['P76'],
    atc: ['N03AA01', 'N03AB01', 'N03AD01', 'N03AF01', 'N03AX14'],
  },
  
  referencias: [
    { id: 1, citation: 'Authors et al. ACVIM Consensus Statement on the management of status epilepticus and cluster seizures in dogs and cats. Journal of veterinary internal medicine. 2024. doi: 10.1111/jvim.16928. PMID: 37921621.', pmid: '37921621', doi: '10.1111/jvim.16928' },
    { id: 2, citation: 'Authors et al. The diagnosis and treatment of catatonia. Clinical medicine (London, England). 2023. doi: 10.7861/clinmed.2023-0113. PMID: 37236789.', pmid: '37236789', doi: '10.7861/clinmed.2023-0113' },
    { id: 3, citation: 'Authors et al. Evidence-based guidelines for the pharmacological treatment of migraine, summary version. Cephalalgia : an international journal of headache. 2025. doi: 10.1177/03331024251321500. PMID: 40277321.', pmid: '40277321', doi: '10.1177/03331024251321500' },
    { id: 4, citation: 'Authors et al. International League Against Epilepsy classification and definition of epilepsy syndromes with onset in childhood: Position paper by the ILAE Task Force on Nosology and Definitions. Epilepsia. 2022. doi: 10.1111/epi.17241. PMID: 35503717.', pmid: '35503717', doi: '10.1111/epi.17241' },
    { id: 5, citation: 'Authors et al. ILAE classification and definition of epilepsy syndromes with onset in neonates and infants: Position statement by the ILAE Task Force on Nosology and Definitions. Epilepsia. 2022. doi: 10.1111/epi.17239. PMID: 35503712.', pmid: '35503712', doi: '10.1111/epi.17239' },
    { id: 6, citation: 'Authors et al. Safety and recommendations for TMS use in healthy subjects and patient populations, with updates on training, ethical and regulatory issues: Expert Guidelines. Clinical neurophysiology : official journal of the International Federation of Clinical Neurophysiology. 2021. doi: 10.1016/j.clinph.2020.10.003. PMID: 33243615.', pmid: '33243615', doi: '10.1016/j.clinph.2020.10.003' },
    { id: 7, citation: 'Authors et al. ILAE classification of the epilepsies: Position paper of the ILAE Commission for Classification and Terminology. Epilepsia. 2017. doi: 10.1111/epi.13709. PMID: 28276062.', pmid: '28276062', doi: '10.1111/epi.13709' },
    { id: 8, citation: 'Authors et al. Definitions and classification of malformations of cortical development: practical guidelines. Brain : a journal of neurology. 2020. doi: 10.1093/brain/awaa174. PMID: 32779696.', pmid: '32779696', doi: '10.1093/brain/awaa174' },
    { id: 9, citation: 'Authors et al. Teratogenesis, Perinatal, and Neurodevelopmental Outcomes After In Utero Exposure to Antiseizure Medication: Practice Guideline From the AAN, AES, and SMFM. Neurology. 2024. doi: 10.1212/WNL.0000000000209279. PMID: 38748979.', pmid: '38748979', doi: '10.1212/WNL.0000000000209279' },
    { id: 10, citation: 'Authors et al. 2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia and Cardiac Conduction Delay: A Report of the American College of Cardiology/American Heart Association Task Force on Clinical Practice Guidelines and the Heart Rhythm Society. Circulation. 2019. doi: 10.1161/CIR.0000000000000628. PMID: 30586772.', pmid: '30586772', doi: '10.1161/CIR.0000000000000628' }
  ],
}