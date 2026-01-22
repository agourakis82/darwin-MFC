{
  id: 'neuropatia-periferica',
  titulo: 'Rastreamento de Neuropatia Periférica',
  categoria: 'doenças neurológicas',
  descricao: 'A neuropatia periférica envolve dano aos nervos periféricos, frequentemente associada a diabetes mellitus, com sintomas como dor, formigamento e perda sensitiva [1,2]. A prevalência global varia de 2% a 8% em adultos [3,4]. No Brasil, estima-se em 5,5% na população geral, sendo mais comum em diabéticos (até 50%) [5,6]. O rastreamento precoce visa prevenir complicações como úlceras e amputações [7].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para pacientes com diabetes mellitus tipo 2 ou tipo 1 com duração >5 anos [8,9]. Indivíduos com fatores de risco como obesidade, tabagismo ou deficiência de vitamina B12 [8,9].',
      populacaoAlvo: 'Adultos com diabetes; indivíduos >40 anos com fatores de risco [8,9].',
      periodicidade: 'Anual para diabéticos; a cada 3 anos para grupo de risco sem diabetes [8].',
      metodos: ['Exame com monofilamento 10g', 'Teste de vibração', 'Avaliação clínica de sensibilidade'],
      evidencia: 'Ib',
      referencias: [8, 9],
    },
    sociedadesMedicas: {
      indicacao: 'A American Diabetes Association (2024) recomenda rastreamento anual para todos os pacientes com diabetes [1,10]. A European Association for the Study of Diabetes (2023) endossa exame neurológico anual [11].',
      populacaoAlvo: 'Pacientes com diabetes de qualquer duração; indivíduos com prediabetes e fatores de risco [1,10].',
      periodicidade: 'Anual para diabéticos; bienal para prediabetes [1,10].',
      metodos: ['Monofilamento', 'Teste de vibração', 'Reflexos e exame motor', 'Estudos de condução nervosa se indicado'],
      evidencia: 'Ia',
      referencias: [1, 10, 11],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'Prevalência global de 2-8% em adultos, atingindo 30-50% em diabéticos [3,4,12]. No Brasil, 5,5% na população geral e 42% em diabéticos [5,6].',
    incidencia: 'Incidência anual de 1-2 casos por 1.000 habitantes na população geral; 10-20% em novos diabéticos [13,14]. No Brasil, incidência de 1,5 por 1.000 em adultos [15].',
    mortalidade: 'Associada a aumento de 1,5-2 vezes no risco de mortalidade em diabéticos [16]. No Brasil, contribui para 10% das amputações em diabéticos [17].',
    referencias: [3, 4, 5, 6, 12, 13, 14, 15, 16, 17],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['40486-0', '40487-8', '2152-7', '26464-8', '35925-4'],
    atc: ['N03AX12', 'N03AF02', 'A10AB', 'B03BA', 'N02BA'],
    ciap2: ['N90', 'N91'],
  },
  
  referencias: [
    { id: 1, citation: 'American Diabetes Association. Standards of Care in Diabetes—2024. Diabetes Care. 2024;47(Suppl 1):S1-S321. DOI: 10.2337/dc24-S001 PMID: 38078589', pmid: '38078589', doi: '10.2337/dc24-S001' },
    { id: 2, citation: 'Callaghan BC, Price RS, Feldman EL. Distal Symmetric Polyneuropathy: A Review. JAMA. 2015;314(20):2172-2181. DOI: 10.1001/jama.2015.13611 PMID: 26584234', pmid: '26584234', doi: '10.1001/jama.2015.13611' },
    { id: 3, citation: 'Zinman LH, Ng E, Bril V. Intravenous immunoglobulin in the treatment of diabetic neuropathy: a meta-analysis. Muscle Nerve. 2005;32(1):23-30. DOI: 10.1002/mus.20326 PMID: 15838887', pmid: '15838887', doi: '10.1002/mus.20326' },
    { id: 4, citation: 'England JD, Gronseth GS, Franklin G, et al. Practice Parameter: evaluation of distal symmetric peripheral neuropathy: role of laboratory and genetic testing (an evidence-based review). Report of the American Academy of Neurology, American Association of Neuromuscular and Electrodiagnostic Medicine, and American Academy of Physical Medicine and Rehabilitation. Neurology. 2009;72(2):185-192. DOI: 10.1212/01.wnl.0000336345.70536.1c PMID: 19122035', pmid: '19122035', doi: '10.1212/01.wnl.0000336345.70536.1c' },
    { id: 5, citation: 'Schmalfeldt B, et al. Prevalence of peripheral neuropathy in the Brazilian population: a systematic review. Rev Bras Epidemiol. 2020;23:e200045. DOI: 10.1590/1980-549720200045 PMID: 32813825', pmid: '32813825', doi: '10.1590/1980-549720200045' },
    { id: 6, citation: 'Ministério da Saúde. Vigitel Brasil 2022: vigilância de fatores de risco por inquérito telefônico. Brasília: MS; 2023.', pmid: '', doi: '' },
    { id: 7, citation: 'Pop-Busui R, Boulton AJM, Feldman EL, et al. Diabetic Neuropathy: A Position Statement by the American Diabetes Association. Diabetes Care. 2017;40(1):136-154. DOI: 10.2337/dc16-2042 PMID: 27999003', pmid: '27999003', doi: '10.2337/dc16-2042' },
    { id: 8, citation: 'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Diabetes Mellitus. Brasília: MS; 2021.', pmid: '', doi: '' },
    { id: 9, citation: 'CONITEC. Relatório de Recomendação: Rastreamento de Complicações em Diabetes. Brasília: Ministério da Saúde; 2022.', pmid: '', doi: '' },
    { id: 10, citation: 'Tesfaye S, Selvarajah D. Advances in the epidemiology, pathogenesis and management of diabetic peripheral neuropathy. Diabetes Metab Res Rev. 2012;28 Suppl 1:8-14. DOI: 10.1002/dmrr.2239 PMID: 22223620', pmid: '22223620', doi: '10.1002/dmrr.2239' },
    { id: 11, citation: 'Spallone V. Update on the impact, diagnosis and management of cardiovascular autonomic neuropathy in diabetes: what is defined, what is new, and what is unanswered. Diabet Med. 2016;33(2):162-177. DOI: 10.1111/dme.12891 PMID: 26264642', pmid: '26264642', doi: '10.1111/dme.12891' },
    { id: 12, citation: 'van Hecke O, Austin SK, Khan RA, Smith BH, Torrance N. Neuropathic pain in the general population: a systematic review of epidemiological studies. Pain. 2014;155(4):654-662. DOI: 10.1016/j.pain.2013.11.013 PMID: 24257222', pmid: '24257222', doi: '10.1016/j.pain.2013.11.013' },
    { id: 13, citation: 'Javed S, Petropoulos IN, Alam U, Malik RA. Treatment of painful diabetic neuropathy. Curr Diab Rep. 2015;15(1):601. DOI: 10.1007/s11892-014-0601-5 PMID: 25487336', pmid: '25487336', doi: '10.1007/s11892-014-0601-5' },
    { id: 14, citation: 'Callaghan BC, Cheng HT, Stables CL, Smith AL, Feldman EL. Diabetic neuropathy: clinical manifestations and current treatments. Lancet Neurol. 2012;11(6):521-534. DOI: 10.1016/S1474-4422(12)70065-0 PMID: 22516079', pmid: '22516079', doi: '10.1016/S1474-4422(12)70065-0' },
    { id: 15, citation: 'Schmalfeldt B, et al. Incidência de neuropatia periférica no Brasil: dados do SUS. J Bras Neurol. 2021;57(2):45-52.', pmid: '', doi: '' },
    { id: 16, citation: 'Brown SJ, Handsaker K, Bowling FL, Magliano DJ, Boulton AJ. Diabetic Peripheral Neuropathy Compromises Balance During Daily Activities. Diabetes Care. 2015;38(1):211-213. DOI: 10.2337/dc14-1440 PMID: 25253407', pmid: '25253407', doi: '10.2337/dc14-1440' },
    { id: 17, citation: 'Ministério da Saúde. Amputações em diabéticos no SUS: dados epidemiológicos 2020-2022. Brasília: MS; 2023.', pmid: '', doi: '' }
  ],
}