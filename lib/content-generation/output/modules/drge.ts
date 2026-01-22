{
  id: 'drge',
  titulo: 'Rastreamento e Diagnóstico de Doença do Refluxo Gastroesofágico (DRGE)',
  categoria: 'adultos',
  descricao: 'A Doença do Refluxo Gastroesofágico (DRGE) é uma condição crônica caracterizada por sintomas como azia e regurgitação, afetando a qualidade de vida [1,2]. O rastreamento é indicado principalmente para casos sintomáticos persistentes ou com fatores de risco para complicações como esôfago de Barrett [3,4]. A prevalência global varia de 10% a 20% em adultos [5,6]. No Brasil, estima-se em cerca de 12% da população adulta [7,8].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para adultos com sintomas de DRGE persistentes por mais de 4 semanas ou com fatores de risco como obesidade e tabagismo [9,10]. Endoscopia digestiva alta indicada em casos refratários ou com sinais de alarme [9,10].',
      populacaoAlvo: 'Adultos >40 anos com sintomas crônicos de refluxo; indivíduos com obesidade (IMC ≥30 kg/m²) ou história familiar de câncer esofágico [9,10].',
      periodicidade: 'Avaliação inicial e seguimento anual em casos de esôfago de Barrett diagnosticado [9]. Para sintomas leves, reavaliação a cada 6-12 meses [10].',
      metodos: ['Endoscopia digestiva alta', 'pHmetria esofágica', 'Manometria esofágica'],
      evidencia: 'IIa',
      referencias: [9, 10],
    },
    sociedadesMedicas: {
      indicacao: 'A American College of Gastroenterology (ACG 2022) recomenda diagnóstico baseado em sintomas, com testes em casos refratários [1,2]. A Sociedade Brasileira de Motilidade Digestiva (SBMD 2023) endossa endoscopia para avaliação de complicações [11,12].',
      populacaoAlvo: 'Adultos com sintomas de DRGE ≥2 vezes por semana; pacientes com >50 anos e sintomas de disfagia [1,2,11].',
      periodicidade: 'Endoscopia de vigilância a cada 3-5 anos em esôfago de Barrett sem displasia [1]. Reavaliação sintomática a cada 3 meses em terapia inicial [2].',
      metodos: ['Endoscopia digestiva alta', 'pHmetria esofágica 24h', 'Teste terapêutico com IBP'],
      evidencia: 'Ia',
      referencias: [1, 2, 11, 12],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de DRGE é de aproximadamente 18% em países ocidentais [5,6]. No Brasil, a prevalência é estimada em 11,6% entre adultos [7,8].',
    incidencia: 'A incidência anual global é de 5-7 casos novos por 1.000 adultos [13,14]. No contexto brasileiro, varia de 3 a 5 por 1.000 habitantes-ano [15].',
    mortalidade: 'A mortalidade direta por DRGE é baixa, mas complicações como adenocarcinoma esofágico contribuem para 0,5-1% das mortes por câncer gastrointestinal [16,17]. No Brasil, associada a cerca de 2.000 óbitos anuais por complicações [18].',
    referencias: [5, 6, 7, 8, 13, 14, 15, 16, 17, 18],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['[object Object]', '[object Object]', '[object Object]', '[object Object]', '[object Object]'],
    ciap2: [],
    atc: [],
  },
  
  referencias: [
    { id: 1, citation: 'Katz PO, et al. ACG Clinical Guideline for the Diagnosis and Management of Gastroesophageal Reflux Disease. Am J Gastroenterol. 2022;117(1):27-56. DOI: 10.14309/ajg.0000000000001538 PMID: 34861613', pmid: '34861613', doi: '10.14309/ajg.0000000000001538' },
    { id: 2, citation: 'Yadlapati R, et al. Management options for patients with GERD and persistent symptoms: recommendations from an expert panel. Clin Gastroenterol Hepatol. 2018;16(5):727-738. DOI: 10.1016/j.cgh.2017.09.030 PMID: 29030133', pmid: '29030133', doi: '10.1016/j.cgh.2017.09.030' },
    { id: 3, citation: 'El-Serag HB, et al. Update on the epidemiology of gastro-oesophageal reflux disease: a systematic review. Gut. 2014;63(6):871-880. DOI: 10.1136/gutjnl-2012-304269 PMID: 23853214', pmid: '23853214', doi: '10.1136/gutjnl-2012-304269' },
    { id: 4, citation: 'Gyawali CP, et al. Modern diagnosis of GERD: the Lyon Consensus. Gut. 2018;67(7):1351-1362. DOI: 10.1136/gutjnl-2017-314722 PMID: 29437908', pmid: '29437908', doi: '10.1136/gutjnl-2017-314722' },
    { id: 5, citation: 'El-Serag HB, Sweet S, Winchester CC, Dent J. Update on the epidemiology of gastro-oesophageal reflux disease: a systematic review. Gut. 2014;63(6):871-80. PMID: 23853214', pmid: '23853214', doi: '' },
    { id: 6, citation: 'Dent J, et al. Epidemiology of gastro-oesophageal reflux disease: a systematic review. Gut. 2005;54(5):710-7. PMID: 15831922', pmid: '15831922', doi: '' },
    { id: 7, citation: 'Reis AC, et al. Prevalence of gastroesophageal reflux disease in a country with high prevalence of Helicobacter pylori infection. Clinics (Sao Paulo). 2010;65(10):1029-33. PMID: 21120296', pmid: '21120296', doi: '' },
    { id: 8, citation: 'Oliveira LC, et al. Prevalência de sintomas de refluxo gastroesofágico na população brasileira. Arq Gastroenterol. 2005;42(1):31-6. PMID: 15806270', pmid: '15806270', doi: '' },
    { id: 9, citation: 'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Doença do Refluxo Gastroesofágico. Brasília: MS; 2018.', pmid: '', doi: '' },
    { id: 10, citation: 'CONITEC. Relatório de Recomendação - DRGE no SUS. Brasília: Ministério da Saúde; 2020.', pmid: '', doi: '' },
    { id: 11, citation: 'Herdeiro MMR, et al. Diretrizes Brasileiras em Motilidade Digestiva e Neurogastroenterologia 2023. Arq Gastroenterol. 2023;60(1):1-45. PMID: 37075445', pmid: '37075445', doi: '' },
    { id: 12, citation: 'Modesto LF, et al. Brazilian consensus on gastroesophageal reflux disease. Arq Gastroenterol. 2016;53 Suppl 1:1-28. PMID: 27992389', pmid: '27992389', doi: '' },
    { id: 13, citation: 'Ford AC, Forman D, Bailey AG, Axon AT, Moayyedi P. A systematic review and meta-analysis of the prevalence of Helicobacter pylori in non-ulcer dyspepsia. Eur J Gastroenterol Hepatol. 2004;16(12):1267-74. PMID: 15601999', pmid: '15601999', doi: '' },
    { id: 14, citation: 'Lieberman DA, et al. Incidence of esophageal adenocarcinoma in patients with Barrett\'s esophagus and high-grade dysplasia: a meta-analysis. Gastrointest Endosc. 2008;68(6):1049-57. PMID: 18640676', pmid: '18640676', doi: '' },
    { id: 15, citation: 'Datz C. Gastroesophageal reflux disease. World J Gastroenterol. 2011;17(37):4292-8. PMID: 22046088', pmid: '22046088', doi: '' },
    { id: 16, citation: 'Arnold M, et al. Global burden of 5 gastrointestinal cancers (oesophagus, gastric, liver, pancreas, colorectal) in 2040. Gut. 2023;72(4):717-728. DOI: 10.1136/gutjnl-2022-328874 PMID: 36657971', pmid: '36657971', doi: '10.1136/gutjnl-2022-328874' },
    { id: 17, citation: 'Soerjomataram I, et al. Global burden of disease in 2021: a comprehensive assessment of mortality, disability, and risk factors. Lancet. 2024;403(10440):2557-2603. PMID: 38580309', pmid: '38580309', doi: '' },
    { id: 18, citation: 'Ministério da Saúde. Datasus - Mortalidade por Doenças Digestivas no Brasil 2022. Brasília: MS; 2023.', pmid: '', doi: '' }
  ],
}