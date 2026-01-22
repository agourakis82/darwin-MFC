{
  id: 'bronquite-cronica',
  titulo: 'Rastreamento de Bronquite Crônica',
  categoria: 'respiratorio',
  descricao: 'A bronquite crônica é uma condição inflamatória crônica das vias aéreas, caracterizada por tosse produtiva por pelo menos três meses em dois anos consecutivos [1,2]. Faz parte da doença pulmonar obstrutiva crônica (DPOC) e afeta principalmente fumantes e ex-fumantes [1,2]. O rastreamento visa identificar casos precocemente em populações de risco para intervenção oportuna [3,4]. A prevalência global é estimada em 3-4% em adultos acima de 40 anos [5,6]. No Brasil, a prevalência é de aproximadamente 4,1% na população adulta [7,8].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para adultos ≥40 anos com história de tabagismo ≥10 maços-ano ou exposição ocupacional a irritantes [9,10]. Indicado para sintomáticos com dispneia ou tosse crônica [9,10].',
      populacaoAlvo: 'Adultos ≥40 anos fumantes ou ex-fumantes; indivíduos com exposição ambiental ou ocupacional a poeiras e fumos [9,10].',
      periodicidade: 'Avaliação inicial em indivíduos de risco; repetição a cada 1-2 anos em casos de DPOC confirmada [9].',
      metodos: ['Espirometria com broncodilatador', 'Questionário respiratório (ex: CAT ou mMRC)'],
      evidencia: 'IIa',
      referencias: [9, 10],
    },
    sociedadesMedicas: {
      indicacao: 'A Global Initiative for Chronic Obstructive Lung Disease (GOLD 2023) recomenda case-finding com espirometria em adultos ≥40 anos com risco ou sintomas [1,3]. A Sociedade Brasileira de Pneumologia e Tisiologia (SBPT 2022) endossa rastreamento em fumantes sintomáticos [11,12].',
      populacaoAlvo: 'Adultos ≥40 anos com tabagismo, sintomas respiratórios ou fatores de risco [1,3,11].',
      periodicidade: 'Não rotineiro; realizar espirometria em indivíduos de risco e repetir conforme evolução clínica [1,3].',
      metodos: ['Espirometria', 'Avaliação clínica com questionários'],
      evidencia: 'Ia',
      referencias: [1, 3, 11, 12],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de bronquite crônica é de 3-4% em adultos >40 anos, com maior impacto em regiões de alta poluição [5,6]. No Brasil, estima-se 4,1% na população adulta, com subdiagnóstico em áreas rurais [7,8].',
    incidencia: 'A incidência anual é de 1-2% em fumantes atuais, aumentando com a duração do tabagismo [13,14]. No Brasil, incidência de 0,8-1,5 casos por 1.000 habitantes-ano [15].',
    mortalidade: 'A bronquite crônica contribui para 3 milhões de mortes globais anuais por DPOC [16]. No Brasil, representa cerca de 5% das mortes por doenças respiratórias crônicas [17].',
    referencias: [5, 6, 7, 8, 13, 14, 15, 16, 17],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['20108-4', '20109-2', '20110-8', '47028-7', '47029-5'],
    ciap2: ['R82', 'R83'],
    atc: ['R03AC02', 'R03BB04', 'R03BA06'],
  },
  
  referencias: [
    { id: 1, citation: 'Global Initiative for Chronic Obstructive Lung Disease. GOLD 2023 Report. Global Initiative for Chronic Obstructive Lung Disease; 2023.', pmid: '', doi: 'https://goldcopd.org/2023-gold-report-2/' },
    { id: 2, citation: 'Celli BR, Decramer M, Wedzicha JA, et al. An Official American Thoracic Society/European Respiratory Society Statement: Research questions in chronic obstructive pulmonary disease. Am J Respir Crit Care Med. 2015;191(7):e4-e27. DOI: 10.1164/rccm.201505-0929ST PMID: 25738372', pmid: '25738372', doi: '10.1164/rccm.201505-0929ST' },
    { id: 3, citation: 'Qureshi H, Sharafkhaneh A, Hanania NA. Chronic bronchitis: Disease definition and management. Int J Chron Obstruct Pulmon Dis. 2014;9:1305-1311. DOI: 10.2147/COPD.S73872 PMID: 25395886', pmid: '25395886', doi: '10.2147/COPD.S73872' },
    { id: 4, citation: 'Halbert RJ, Isonaka S, George D, Iqbal A. Interpreting COPD prevalence estimates: What is the true burden of COPD? Chest. 2003;123(5):1684-1692. DOI: 10.1378/chest.123.5.1684 PMID: 12740281', pmid: '12740281', doi: '10.1378/chest.123.5.1684' },
    { id: 5, citation: 'Buist AS, McBurnie MA, Vollmer WM, et al. International variation in the prevalence of COPD (the BOLD Study): a population-based prevalence study. Lancet. 2007;370(9589):741-750. DOI: 10.1016/S0140-6736(07)61377-4 PMID: 17726336', pmid: '17726336', doi: '10.1016/S0140-6736(07)61377-4' },
    { id: 6, citation: 'Soriano JB, Maier WC, Egger P, et al. Recent trends in physician diagnosed COPD in women and men in the USA. Am J Epidemiol. 2000;152(8):713-720. DOI: 10.1093/aje/152.8.713 PMID: 11055373', pmid: '11055373', doi: '10.1093/aje/152.8.713' },
    { id: 7, citation: 'Menezes AM, Perez-Padilla R, Jardim JR, et al. Chronic obstructive pulmonary disease in five Latin American cities (the PLATINO study): a prevalence study. Lancet. 2005;366(9500):1875-1881. DOI: 10.1016/S0140-6736(05)67632-5 PMID: 16325693', pmid: '16325693', doi: '10.1016/S0140-6736(05)67632-5' },
    { id: 8, citation: 'Instituto Brasileiro de Geografia e Estatística. Pesquisa Nacional de Saúde 2019. IBGE; 2020.', pmid: '', doi: '' },
    { id: 9, citation: 'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Doença Pulmonar Obstrutiva Crônica. Brasília: Ministério da Saúde; 2017.', pmid: '', doi: '' },
    { id: 10, citation: 'CONITEC. Relatório de Recomendação: Espirometria no SUS para diagnóstico de DPOC. Comissão Nacional de Incorporação de Tecnologias no SUS; 2018.', pmid: '', doi: '' },
    { id: 11, citation: 'Sociedade Brasileira de Pneumologia e Tisiologia. Diretrizes Brasileiras para o Manejo da DPOC - 2022. J Bras Pneumol. 2022;48(Suppl 1):S1-S80. DOI: 10.36416/jbpm-2022-S1 PMID: 36350192', pmid: '36350192', doi: '10.36416/jbpm-2022-S1' },
    { id: 12, citation: 'Ruffo SI, Pereira FM, Stelmach R, et al. Brazilian Thoracic Association guidelines for chronic obstructive pulmonary disease - 2022. J Bras Pneumol. 2022;48(1):e20210450. DOI: 10.36416/jbpm-2022.10450 PMID: 35170644', pmid: '35170644', doi: '10.36416/jbpm-2022.10450' },
    { id: 13, citation: 'de Marco R, Accordini S, Marcon A, et al. Risk factors for chronic obstructive pulmonary disease in a European cohort of young adults. Am J Respir Crit Care Med. 2011;183(7):891-897. DOI: 10.1164/rccm.201007-1128OC PMID: 21030681', pmid: '21030681', doi: '10.1164/rccm.201007-1128OC' },
    { id: 14, citation: 'Pelkonen M, Notkola IL, Tukiainen H, Tervonen M, Tuominen M, Koskenvuo M. Smoking cessation, decline in pulmonary function and total mortality: a 30 year follow up study among middle-aged Finnish men. Thorax. 2001;56(8):656-660. DOI: 10.1136/thorax.56.8.656 PMID: 11462521', pmid: '11462521', doi: '10.1136/thorax.56.8.656' },
    { id: 15, citation: 'Instituto Nacional de Câncer. Inquérito Domiciliar sobre Tabagismo no Brasil. INCA; 2019.', pmid: '', doi: '' },
    { id: 16, citation: 'GBD 2019 Chronic Respiratory Diseases Collaborators. Global burden of chronic respiratory diseases and risk factors, 1990-2019: an update from the Global Burden of Disease Study 2019. EClinicalMedicine. 2023;59:101936. DOI: 10.1016/j.eclinm.2023.101936 PMID: 37383246', pmid: '37383246', doi: '10.1016/j.eclinm.2023.101936' },
    { id: 17, citation: 'Ministério da Saúde. Datasus. Mortalidade por causas respiratórias no Brasil, 2022.', pmid: '', doi: '' }
  ],
}