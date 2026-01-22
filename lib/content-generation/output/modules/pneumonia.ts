{
  id: 'pneumonia',
  titulo: 'Pneumonia',
  categoria: 'infecções respiratórias',
  descricao: 'A pneumonia é uma infecção aguda do parênquima pulmonar causada por bactérias, vírus ou fungos, representando uma das principais causas de morbimortalidade respiratória [1,2,5]. Pode ser classificada como adquirida na comunidade (CAP), hospitalar (HAP) ou associada à ventilação mecânica (VAP) [1,2,5]. Em crianças, é uma causa comum de hospitalização [3,9]. No contexto brasileiro, o manejo segue protocolos para infecções respiratórias [12,13,14].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Manejo clínico de infecções respiratórias agudas, incluindo pneumonia como complicação de influenza ou em atenção básica para casos leves [13,14].',
      populacaoAlvo: 'Adultos e crianças com sintomas respiratórios agudos, priorizando grupos vulneráveis como idosos e imunocomprometidos [13,14].',
      periodicidade: 'Avaliação imediata para sintomas agudos; follow-up conforme evolução clínica, sem periodicidade fixa para rastreamento [13,14].',
      metodos: ['Antibióticos empíricos (amoxicilina ou similar)', 'Radiografia de tórax quando disponível', 'Oxigenoterapia e suporte sintomático'],
      evidencia: 'IIb',
      referencias: [13, 14],
    },
    sociedadesMedicas: {
      indicacao: 'Diagnóstico e tratamento empírico de CAP em adultos com sintomas como febre, tosse e infiltrados pulmonares [5,11]; para HAP/VAP, cobertura para patógenos multirresistentes [1,2]; em crianças >3 meses, avaliação etiológica [3,9] [5,11].',
      populacaoAlvo: 'Adultos com CAP (todos os grupos etários, priorizando >65 anos ou com comorbidades); crianças >3 meses com CAP; pacientes hospitalizados para HAP/VAP [1,2,3,5,11].',
      periodicidade: 'Tratamento imediato ao diagnóstico; desescalonamento após 48-72h baseado em culturas [1,5]; prevenção de VAP com bundles diários [10].',
      metodos: ['Antibióticos beta-lactâmicos + macrolídeos para CAP', 'Cefalosporinas + vancomicina para HAP/VAP', 'PCR para Mycoplasma em crianças resistentes', 'Radiografia de tórax e testes microbiológicos'],
      evidencia: 'Ia',
      referencias: [1, 2, 3, 5, 11],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A pneumonia afeta cerca de 5-11 casos por 1.000 adultos/ano globalmente para CAP [5,6]; em crianças, é prevalente em <5 anos com taxas de 0,5-2% [3,9]. No Brasil, estima-se 1-2 milhões de casos anuais de CAP [12].',
    incidencia: 'Incidência global de pneumonia é de 150 milhões de casos/ano, com 4-5 milhões de mortes [5,6]; para VAP, 10-20% dos ventilados [1,2,10]. No Brasil, incidência de CAP é 3-5/1.000 habitantes/ano [12].',
    mortalidade: 'Mortalidade de CAP em adultos é 5-7% em hospitalizados [5,6]; para VAP, 20-40% [1,2,10]; em crianças, <1% com tratamento adequado [3,9]. No Brasil, pneumonia é 4ª causa de morte por doenças respiratórias [12,13].',
    referencias: [1, 2, 3, 5, 6, 9, 10, 12, 13],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['1988-6', '2019-8', '6401-0', '5767-9', '11534-2'],
    atc: ['J01CA01', 'J01FA01', 'J01MA02', 'J01CR02', 'J07AL02'],
    ciap2: ['R80', 'R81', 'R82'],
  },
  
  referencias: [
    { id: 1, citation: 'Kalil AC, Metersky ML, Klompas M, et al. Management of Adults With Hospital-acquired and Ventilator-associated Pneumonia: 2016 Clinical Practice Guidelines by the Infectious Diseases Society of America and the American Thoracic Society. Clin Infect Dis. 2016;63(5):e61-e111. doi: 10.1093/cid/ciw353', pmid: '27418577', doi: '10.1093/cid/ciw353' },
    { id: 2, citation: 'Torres A, Niederman MS, Chastre J, et al. International ERS/ESICM/ESCMID/ALAT guidelines for the management of hospital-acquired pneumonia and ventilator-associated pneumonia. Eur Respir J. 2017;50(3):1700582. doi: 10.1183/13993003.00582-2017', pmid: '28890434', doi: '10.1183/13993003.00582-2017' },
    { id: 3, citation: 'Bradley JS, Byington CL, Shah SS, et al. The management of community-acquired pneumonia in infants and children older than 3 months of age: clinical practice guidelines by the Pediatric Infectious Diseases Society and the Infectious Diseases Society of America. Clin Infect Dis. 2011;53(7):e25-76. doi: 10.1093/cid/cir531', pmid: '21880587', doi: '10.1093/cid/cir531' },
    { id: 4, citation: 'Zhao H, He Y, Liu H, et al. Expert consensus on the diagnosis and treatment of macrolide-resistant Mycoplasma pneumoniae pneumonia in children. World J Pediatr. 2024. doi: 10.1007/s12519-024-00831-0', pmid: '39143259', doi: '10.1007/s12519-024-00831-0' },
    { id: 5, citation: 'Metlay JP, Waterer GW, Long AC, et al. Diagnosis and Treatment of Adults with Community-acquired Pneumonia. An Official Clinical Practice Guideline of the American Thoracic Society and Infectious Diseases Society of America. Am J Respir Crit Care Med. 2019;200(7):e45-e67. doi: 10.1164/rccm.201908-1581ST', pmid: '31573350', doi: '10.1164/rccm.201908-1581ST' },
    { id: 6, citation: 'Mandell LA, Wunderink RG, Anzueto A, et al. Infectious Diseases Society of America/American Thoracic Society consensus guidelines on the management of community-acquired pneumonia in adults. Clin Infect Dis. 2007;44(Suppl 2):S27-72. doi: 10.1086/511159', pmid: '17278083', doi: '10.1086/511159' },
    { id: 7, citation: 'Chastre J, Fagon JY, American Thoracic Society, et al. Guidelines for the management of adults with hospital-acquired, ventilator-associated, and healthcare-associated pneumonia. Am J Respir Crit Care Med. 2005;171(4):388-416. doi: 10.1164/rccm.200405-644ST', pmid: '15699079', doi: '10.1164/rccm.200405-644ST' },
    { id: 8, citation: 'Høiby N, Bjarnsholt T, Moser C, et al. ESCMID guideline for the diagnosis and treatment of biofilm infections 2014. Clin Microbiol Infect. 2015;21 Suppl 1:S1-25. doi: 10.1016/j.cmi.2014.10.024', pmid: '25596784', doi: '10.1016/j.cmi.2014.10.024' },
    { id: 9, citation: 'Calvo C, García-García I, Pozo F, et al. Consensus Document on Community-Acquired Pneumonia in Children. SENP-SEPAR-SEIP. Arch Bronconeumol. 2020;56(10):652-661. doi: 10.1016/j.arbres.2020.03.025', pmid: '32534869', doi: '10.1016/j.arbres.2020.03.025' },
    { id: 10, citation: 'Torres A, Cilloniz C, Niederman MS, et al. Preventing ventilator-associated pneumonia: A position paper of the International Society for Infectious Diseases, 2024 update. Int J Infect Dis. 2025;140:107305. doi: 10.1016/j.ijid.2024.107305', pmid: '39551087', doi: '10.1016/j.ijid.2024.107305' },
    { id: 11, citation: 'Infectious Diseases Society of America. Diagnosis and Treatment of Adults with Community-acquired Pneumonia. 2019. Available from: https://www.idsociety.org/practice-guideline/community-acquired-pneumonia/', pmid: '', doi: '' },
    { id: 12, citation: 'Sociedade Brasileira de Pneumologia e Tisiologia. Diretrizes Brasileiras para Pneumonia Adquirida na Comunidade em Adultos Imunocompetentes. 2018. Available from: https://sbpt.org.br/', pmid: '', doi: '' },
    { id: 13, citation: 'Ministério da Saúde (Brazil). Cadernos de Atenção Básica - Doenças Respiratórias Crônicas. 2010. Available from: https://bvsms.saude.gov.br/bvs/publicacoes/doencas_respiratorias_cronicas.pdf', pmid: '', doi: '' },
    { id: 14, citation: 'Ministério da Saúde (Brazil). Protocolo de Manejo Clínico de Influenza. 2022. Available from: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/i/influenza', pmid: '', doi: '' }
  ],
}