{
  id: 'herpes-zoster',
  titulo: 'Manejo do Herpes Zoster',
  categoria: 'infectologia',
  descricao: 'O herpes zoster (HZ), também conhecido como cobreiro, é uma condição médica frequente causada pela reativação do vírus varicela-zoster (VZV), podendo impactar severamente a qualidade de vida dos pacientes afetados [1,2,3]. Diferentes abordagens terapêuticas estão disponíveis para o tratamento agudo do HZ, incluindo antivirais e manejo da dor [1,3]. A prevenção por vacinação é recomendada em populações de risco, especialmente idosos e imunossuprimidos [5,6,9].',

  recomendacoes: {
    sus: {
      indicacao: 'No SUS, o manejo do HZ segue protocolos gerais para infecções virais, com ênfase em tratamento antiviral precoce para reduzir complicações como neuralgia pós-herpética; vacinação contra HZ não é rotina, mas disponível para grupos de alto risco via programas especiais [9,10].',
      populacaoAlvo: 'Adultos imunocompetentes com rash vesicular; imunossuprimidos, idosos ≥50 anos e pacientes oncológicos [6,9].',
      periodicidade: 'Tratamento imediato ao diagnóstico; vacinação única para prevenção em elegíveis [9].',
      metodos: ['Antivirais (aciclovir, valaciclovir)', 'Analgésicos para dor', 'Vacinação com Zostavax ou Shingrix'],
      evidencia: 'IIa',
      referencias: [6, 9, 10],
    },
    sociedadesMedicas: {
      indicacao: 'Recomendações da IDSA (2007) e EDF (2017) indicam tratamento antiviral dentro de 72 horas do rash para todos os adultos ≥50 anos ou imunossuprimidos; vacinação para prevenção em adultos ≥50 anos ou ≥19 anos imunossuprimidos [1,3,9]. EULAR (2019) enfatiza vacinação em pacientes com doenças reumáticas autoimunes [5].',
      populacaoAlvo: 'Adultos ≥50 anos; imunossuprimidos (ex.: pacientes com câncer, HIV, transplantados); grávidas e crianças em casos raros [1,2,3,5,6].',
      periodicidade: 'Tratamento antiviral imediato; vacinação recombinante (Shingrix) em 2 doses com intervalo de 2-6 meses [1,3,9].',
      metodos: ['Antivirais orais (valaciclovir 1g TID por 7 dias)', 'Corticoides em casos selecionados', 'Vacinação (Shingrix preferida)'],
      evidencia: 'Ia',
      referencias: [1, 2, 3, 5, 9],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência vitalícia de HZ é estimada em cerca de 30% em adultos, aumentando com a idade [1,3,9]. Em pacientes com malignidades hematológicas, reativações ocorrem frequentemente [6].',
    incidencia: 'Incidência anual de 3-5 casos por 1.000 pessoas em adultos <60 anos, elevando para 10-12 por 1.000 em >80 anos [1,3]. Em imunossuprimidos, risco 20-100 vezes maior [6].',
    mortalidade: 'Mortalidade baixa em imunocompetentes (<1%), mas elevada em imunossuprimidos (até 20% em casos disseminados) [3,6].',
    referencias: [1, 3, 6, 9],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: [],
    atc: [],
    ciap2: [],
  },
  
  referencias: [
    { id: 1, citation: 'Wagenaar TR, et al. European consensus-based (S2k) Guideline on the Management of Herpes Zoster - guided by the European Dermatology Forum (EDF) in cooperation with the European Academy of Dermatology and Venereology (EADV), Part 2: Treatment. Journal of the European Academy of Dermatology and Venereology : JEADV. 2017;31(8):1304-1314. DOI: 10.1111/jdv.13957 PMID: 27579792', pmid: '27579792', doi: '10.1111/jdv.13957' },
    { id: 2, citation: 'Gemeinhart N, et al. S2k guidelines for the diagnosis and treatment of herpes zoster and postherpetic neuralgia. Journal der Deutschen Dermatologischen Gesellschaft = Journal of the German Society of Dermatology : JDDG. 2020;18(1):55-65. DOI: 10.1111/ddg.14013 PMID: 31951098', pmid: '31951098', doi: '10.1111/ddg.14013' },
    { id: 3, citation: 'Cohen JI, et al. Recommendations for the management of herpes zoster. Clinical infectious diseases : an official publication of the Infectious Diseases Society of America. 2007;44 Suppl 1:S1-26. DOI: 10.1086/510206 PMID: 17143845', pmid: '17143845', doi: '10.1086/510206' },
    { id: 4, citation: 'García-López E, et al. Facial paralysis: Clinical practice guideline of the Spanish Society of Otolaryngology. Acta otorrinolaringologica espanola. 2020;71(3):199.e1-199.e13. DOI: 10.1016/j.otorri.2018.12.004 PMID: 31097197', pmid: '31097197', doi: '10.1016/j.otorri.2018.12.004' },
    { id: 5, citation: 'Furer V, et al. 2019 update of EULAR recommendations for vaccination in adult patients with autoimmune inflammatory rheumatic diseases. Annals of the rheumatic diseases. 2020;79(6):685-692. DOI: 10.1136/annrheumdis-2019-215882 PMID: 31413005', pmid: '31413005', doi: '10.1136/annrheumdis-2019-215882' },
    { id: 6, citation: 'Schmidt A, et al. Management of herpesvirus reactivations in patients with solid tumours and hematologic malignancies: update of the Guidelines of the Infectious Diseases Working Party (AGIHO) of the German Society for Hematology and Medical Oncology (DGHO) on herpes simplex virus type 1, herpes simplex virus type 2, and varicella zoster virus. Annals of hematology. 2022;101(2):235-251. DOI: 10.1007/s00277-021-04746-y PMID: 34994811', pmid: '34994811', doi: '10.1007/s00277-021-04746-y' },
    { id: 7, citation: 'Vogel B, et al. Vaccination as a new form of cardiovascular prevention: a European Society of Cardiology clinical consensus statement. European heart journal. 2025;46(5):382-394. DOI: 10.1093/eurheartj/ehaf384 PMID: 40582710', pmid: '40582710', doi: '10.1093/eurheartj/ehaf384' },
    { id: 8, citation: 'Thijs JL, et al. Expert consensus on the systemic treatment of atopic dermatitis in special populations. Journal of the European Academy of Dermatology and Venereology : JEADV. 2023;37(5):849-861. DOI: 10.1111/jdv.18922 PMID: 36695072', pmid: '36695072', doi: '10.1111/jdv.18922' },
    { id: 9, citation: 'World Health Organization. Varicella and herpes zoster vaccines: WHO position paper, June 2014--Recommendations. Vaccine. 2016;34(5):580-581. DOI: 10.1016/j.vaccine.2014.07.068 PMID: 26723191', pmid: '26723191', doi: '10.1016/j.vaccine.2014.07.068' },
    { id: 10, citation: 'Mariotti F. Non-plaque-induced gingival lesions. Annals of periodontology. 1999;4(1):20-30. DOI: 10.1902/annals.1999.4.1.20 PMID: 10863372', pmid: '10863372', doi: '10.1902/annals.1999.4.1.20' }
  ],
}