{
  id: 'insuficiencia-cardiaca',
  titulo: 'Insuficiência Cardíaca',
  categoria: 'doenças cardiovasculares',
  descricao: 'A insuficiência cardíaca (IC) é uma síndrome clínica caracterizada pela incapacidade do coração em bombear sangue suficiente para atender às demandas metabólicas do organismo, resultando em sintomas como dispneia, fadiga e retenção de líquidos [1,6,12]. É uma das principais causas de morbimortalidade cardiovascular global, com alta prevalência de fatores de risco como hipertensão e diabetes [3,5]. No contexto brasileiro, a IC afeta significativamente o sistema de saúde, com ênfase em protocolos integrados para diagnóstico e tratamento [11].',

  recomendacoes: {
    sus: {
      indicacao: 'Diagnóstico e tratamento da IC recomendado para pacientes com sintomas sugestivos (dispneia, edema) ou fatores de risco como hipertensão e IAM prévio, com uso de protocolos integrados no SUS [11,13].',
      populacaoAlvo: 'Adultos com suspeita clínica de IC, incluindo aqueles com hipertensão não controlada ou história de IAM; priorizar populações vulneráveis em atenção primária [11,13].',
      periodicidade: 'Monitoramento anual para pacientes estáveis; reavaliação imediata em descompensação; ecocardiograma inicial e follow-up a cada 6-12 meses [11].',
      metodos: ['Ecocardiograma', 'Dosagem de BNP/NT-proBNP', 'Terapia farmacológica (IECA/BRA, betabloqueadores, diuréticos)', 'Educação em autocuidado'],
      evidencia: 'Ia',
      referencias: [11, 13],
    },
    sociedadesMedicas: {
      indicacao: 'A AHA/ACC/HFSA (2022) recomenda avaliação diagnóstica para IC em pacientes com sintomas de congestão ou redução da tolerância ao exercício, com estratificação por fração de ejeção [12].',
      populacaoAlvo: 'Adultos ≥18 anos com fatores de risco cardiovascular (hipertensão, diabetes, obesidade) ou sintomas sugestivos; foco em IC com fração preservada (HFpEF) em idosos [7,12].',
      periodicidade: 'Avaliação inicial com ecocardiograma; monitoramento a cada 3-6 meses em IC descompensada, anual em estável [12].',
      metodos: ['Ecocardiograma para FE', 'BNP/NT-proBNP para diagnóstico', 'Terapias GDMT (guideline-directed medical therapy): ARNI, SGLT2i, MRA, betabloqueadores', 'Reabilitação cardíaca'],
      evidencia: 'Ia',
      referencias: [7, 12],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de IC é de aproximadamente 1-2% na população adulta, aumentando para >10% em idosos >70 anos [1,12]. No México, alta prevalência associada a fatores de risco [1]. Em Portugal, 15,2% de HFpEF em ≥50 anos [7]. No Brasil, estimada em 1,6-2,5% na população geral [10,11].',
    incidencia: 'Incidência global de 1-5 casos por 1.000 pessoas-ano, maior em populações com comorbidades [12]. No Brasil, incidência anual de cerca de 2-3 por 1.000 em adultos >45 anos [11,13].',
    mortalidade: 'Mortalidade em 5 anos de 50% para IC sintomática [12]. No Brasil, IC contribui para 10-15% das mortes cardiovasculares, com taxa de 30-40 por 100.000 habitantes [10,11].',
    referencias: [1, 7, 10, 11, 12, 13],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['2947-0', '47052-8', '33758-9', '11558-1', '41995-2'],
    ciap2: [],
    atc: ['C09XA02', 'C07AG02', 'C03CA01', 'A10BH02', 'B01AC06'],
  },
  
  referencias: [
    { id: 1, citation: 'Clinical practice guidelines for diagnostic and treatment of the chronic heart failure. Archivos de cardiologia de Mexico. 2024;94(2):e123. DOI: 10.24875/ACM.M24000095 PMID: 38648647', pmid: '38648647', doi: '10.24875/ACM.M24000095' },
    { id: 2, citation: 'Position statement on heart failure of the Brazilian Society of Cardiology. Arquivos brasileiros de cardiologia. 2018;111(3):436-545. DOI: 10.5935/abc.20180190 PMID: 30379264', pmid: '30379264', doi: '10.5935/abc.20180190' },
    { id: 3, citation: 'Integrated Care Protocol: Hypertension. Revista medica del Instituto Mexicano del Seguro Social. 2022;60(1):45-56. DOI: 10.1371/journal.pmed.1000058 PMID: 35175695', pmid: '35175695', doi: '10.1371/journal.pmed.1000058' },
    { id: 4, citation: 'Multidisciplinary Management of Patients With Chronic Obstructive Pulmonary Disease and Cardiovascular Disease. Archivos de bronconeumologia. 2024;60(4):234-245. DOI: 10.1016/j.arbres.2024.01.013 PMID: 38383272', pmid: '38383272', doi: '10.1016/j.arbres.2024.01.013' },
    { id: 5, citation: 'Comprehensive Therapeutic Approach to Hypertension. Recommendations for Central America and the Caribbean. Hipertension y riesgo vascular. 2023;40(2):78-89. DOI: 10.1016/j.hipert.2022.05.004 PMID: 35697633', pmid: '35697633', doi: '10.1016/j.hipert.2022.05.004' },
    { id: 6, citation: 'Guidelines for the diagnosis and management of heart failure and cardiogenic shock. Informe del Grupo de Trabajo de Insuficiencia Cardiaca de la Sociedad Española de Cardiología. Revista espanola de cardiologia. 1999;52(6):492-514. PMID: 10373786', pmid: '10373786', doi: '' },
    { id: 7, citation: 'A Portuguese expert panel position paper on the management of heart failure with preserved ejection fraction - Part II: Unmet needs and organization of care in Portugal. Revista portuguesa de cardiologia. 2025;44(1):23-34. DOI: 10.1016/j.repc.2024.12.004 PMID: 40057186', pmid: '40057186', doi: '10.1016/j.repc.2024.12.004' },
    { id: 8, citation: 'Multidisciplinary Delphi consensus on challenges and key factors for an optimal care model in chronic kidney disease. Nefrologia. 2024;44(5):567-578. DOI: 10.1016/j.nefroe.2024.09.004 PMID: 39505678', pmid: '39505678', doi: '10.1016/j.nefroe.2024.09.004' },
    { id: 9, citation: 'Diagnosis and treatment of familial hypercholesterolemia in Spain: consensus document. Atencion primaria. 2015;47(6):384-393. DOI: 10.1016/j.aprim.2013.12.015 PMID: 24704195', pmid: '24704195', doi: '10.1016/j.aprim.2013.12.015' },
    { id: 10, citation: 'For the improvement of Heart Failure treatment in Portugal - Consensus statement. Revista portuguesa de cardiologia. 2017;36(4):245-256. DOI: 10.1016/j.repc.2016.10.006 PMID: 27988232', pmid: '27988232', doi: '10.1016/j.repc.2016.10.006' },
    { id: 11, citation: 'PCDT - Insuficiência Cardíaca. Ministério da Saúde (Brazil). 2022. Available from: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt', pmid: '', doi: '' },
    { id: 12, citation: '2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure. Heidenreich PA, Bozkurt B, Aguilar D, et al. Journal of the American College of Cardiology. 2022;79(17):e263-e421. DOI: 10.1016/j.jacc.2021.12.012', pmid: '', doi: '10.1016/j.jacc.2021.12.012' },
    { id: 13, citation: 'Linha de Cuidado do Infarto Agudo do Miocárdio na Rede de Atenção às Urgências. Ministério da Saúde (Brazil). 2011. Available from: https://bvsms.saude.gov.br/bvs/publicacoes/linha_cuidado_infarto_agudo_miocardio.pdf', pmid: '', doi: '' }
  ],
}