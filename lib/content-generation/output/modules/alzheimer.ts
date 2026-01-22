{
  id: 'alzheimer',
  titulo: 'Diagnóstico e Avaliação de Doença de Alzheimer',
  categoria: 'idosos',
  descricao: 'A doença de Alzheimer é a forma mais comum de demência, caracterizada por declínio cognitivo progressivo [7]. As diretrizes recomendam avaliação estruturada para suspeita de comprometimento cognitivo em cuidados primários e especializados [2,4]. A avaliação inclui história clínica, testes cognitivos e exclusão de causas reversíveis [1,5].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Avaliação diagnóstica para pacientes com suspeita de declínio cognitivo ou queixas de memória, sem programa de rastreamento populacional rotineiro [5,8].',
      populacaoAlvo: 'Idosos acima de 65 anos com fatores de risco como história familiar, hipertensão ou Down syndrome [5,9].',
      periodicidade: 'Sob demanda clínica, sem periodicidade fixa; reavaliação anual para MCI [1,10].',
      metodos: ['Testes cognitivos (ex: MMSE)', 'Exames laboratoriais', 'Neuroimagem (TC/RM)', 'Biomarcadores sanguíneos em centros especializados'],
      evidencia: 'III',
      referencias: [1,5,8,9,10],
    },
    sociedadesMedicas: {
      indicacao: 'Avaliação diagnóstica recomendada pela Alzheimer\'s Association para suspeita de Alzheimer ou demências relacionadas em cuidados primários e especializados [2,4]. Critérios clínicos NINCDS-ADRDA para diagnóstico provável [7].',
      populacaoAlvo: 'Adultos com queixas subjetivas de memória ou impairment cognitivo objetivo, especialmente ≥65 anos [1,2,4].',
      periodicidade: 'Avaliação inicial sob suspeita; monitoramento para progressão em MCI a cada 6-12 meses [1,10].',
      metodos: ['Entrevista clínica e história', 'Testes neuropsicológicos', 'Biomarcadores (p-tau, Aβ) em contextos especializados [6]', 'Neuroimagem e EEG se indicado'],
      evidencia: 'Ia',
      referencias: [1,2,4,6,7,10],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de demência é de aproximadamente 55 milhões de casos, com Alzheimer representando 60-70% [5,8]. No Brasil, estima-se 1,5 milhão de casos de demência [5].',
    incidencia: 'Incidência anual global de demência ~10 milhões de novos casos [5,8]. Para Alzheimer, ~5-10 por 1.000 pessoas-ano em idosos >65 anos [7].',
    mortalidade: 'Alzheimer é a 7ª principal causa de morte global, com ~2 milhões de óbitos anuais [5,8]. No Brasil, contribui para 5-10% das mortes em idosos [5].',
    referencias: [5,7,8],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['72186-1', '44252-0', '41950-8', '80061-5', '52465-0'],
    ciap2: ['P82', 'P99'],
    atc: ['N06DA02', 'N06DA04', 'N06DA01'],
  },
  
  referencias: [
    { id: 1, citation: 'Petersen RC, Lopez O, Armstrong MJ, et al. Practice guideline update summary: Mild cognitive impairment: Report of the Guideline Development, Dissemination, and Implementation Subcommittee of the American Academy of Neurology. Neurology. 2018;90(3):e169-e182. DOI: 10.1212/WNL.0000000000004826 PMID: 29282327', pmid: '29282327', doi: '10.1212/WNL.0000000000004826' },
    { id: 2, citation: 'Cordell CB, Borson S, Boustani M, et al. Alzheimer\'s Association clinical practice guideline for the Diagnostic Evaluation, Testing, Counseling, and Disclosure of Suspected Alzheimer\'s Disease and Related Disorders (DETeCD-ADRD): Executive summary of recommendations for primary care. Alzheimers Dement. 2025;21(1):e14333. DOI: 10.1002/alz.14333 PMID: 39713942', pmid: '39713942', doi: '10.1002/alz.14333' },
    { id: 3, citation: 'Negro A, Casucci G, et al. Evidence-based guidelines for the pharmacological treatment of migraine, summary version. Cephalalgia. 2025;45(1):33310024251321500. DOI: 10.1177/03331024251321500 PMID: 40277321', pmid: '40277321', doi: '10.1177/03331024251321500' },
    { id: 4, citation: 'Rabinovici GD, Gatsonis C, et al. The Alzheimer\'s Association clinical practice guideline for the Diagnostic Evaluation, Testing, Counseling, and Disclosure of Suspected Alzheimer\'s Disease and Related Disorders (DETeCD-ADRD): Executive summary of recommendations for specialty care. Alzheimers Dement. 2025;21(1):e14337. DOI: 10.1002/alz.14337 PMID: 39713957', pmid: '39713957', doi: '10.1002/alz.14337' },
    { id: 5, citation: 'Smith EE, Farias ST, et al. Recommendations of the 5th Canadian Consensus Conference on the diagnosis and treatment of dementia. Alzheimers Dement. 2020;16(12):1691-1710. DOI: 10.1002/alz.12105 PMID: 32725777', pmid: '32725777', doi: '10.1002/alz.12105' },
    { id: 6, citation: 'Hampel H, Toschi N, et al. Alzheimer\'s Association Clinical Practice Guideline on the use of blood-based biomarkers in the diagnostic workup of suspected Alzheimer\'s disease within specialized care settings. Alzheimers Dement. 2025;21(5):70535. DOI: 10.1002/alz.70535 PMID: 40729527', pmid: '40729527', doi: '10.1002/alz.70535' },
    { id: 7, citation: 'McKhann G, Drachman D, Folstein M, et al. Clinical diagnosis of Alzheimer\'s disease: report of the NINCDS-ADRDA Work Group under the auspices of Department of Health and Human Services Task Force on Alzheimer\'s Disease. Neurology. 1984;34(7):939-944. DOI: 10.1212/wnl.34.7.939 PMID: 6610841', pmid: '6610841', doi: '10.1212/wnl.34.7.939' },
    { id: 8, citation: 'Caltagirone C, Ferrannini E, et al. The Italian guideline on diagnosis and treatment of dementia and mild cognitive impairment. Age Ageing. 2024;53(10):afae250. DOI: 10.1093/ageing/afae250 PMID: 39544104', pmid: '39544104', doi: '10.1093/ageing/afae250' },
    { id: 9, citation: 'McGowan MK, Patel DR, et al. Medical Care of Adults With Down Syndrome: A Clinical Guideline. JAMA. 2020;324(15):1507-1523. DOI: 10.1001/jama.2020.17024 PMID: 33079159', pmid: '33079159', doi: '10.1001/jama.2020.17024' },
    { id: 10, citation: 'Lam LCW, Su LL, et al. Physical activity and exercise for the prevention and management of mild cognitive impairment and dementia: a collaborative international guideline. Eur Geriatr Med. 2023;14(6):1145-1166. DOI: 10.1007/s41999-023-00858-y PMID: 37768499', pmid: '37768499', doi: '10.1007/s41999-023-00858-y' }
  ],
}