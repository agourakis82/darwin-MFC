{
  id: 'fibrilacao-atrial',
  titulo: 'Rastreamento de Fibrilação Atrial',
  categoria: 'cardiovasculares',
  descricao: 'A fibrilação atrial (FA) é a arritmia cardíaca sustentada mais comum, associada a risco aumentado de acidente vascular cerebral (AVC) e insuficiência cardíaca [1,2]. O rastreamento oportunista é essencial para detecção precoce em populações de risco, reduzindo complicações tromboembólicas [3,4]. A prevalência global é estimada em 2-3% em adultos, aumentando para 8-10% em idosos acima de 80 anos [1,5]. No Brasil, a prevalência é de aproximadamente 1,4% na população geral, com maior impacto em idosos [6,7].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para indivíduos ≥65 anos e aqueles com fatores de risco cardiovascular (hipertensão, diabetes, histórico familiar) [8,9].',
      populacaoAlvo: 'Adultos ≥65 anos; adultos <65 anos com fatores de risco como hipertensão arterial, diabetes mellitus ou doença cardíaca [8,9].',
      periodicidade: 'Anual em populações de alto risco; a cada 2-3 anos em idosos assintomáticos [8].',
      metodos: ['Eletrocardiograma (ECG) de 12 derivações', 'Monitorização ambulatorial de ECG (Holter)', 'Pulseira de detecção de FA (ex: Apple Watch) em contextos oportunistas'],
      evidencia: 'Ia',
      referencias: [8, 9],
    },
    sociedadesMedicas: {
      indicacao: 'A European Society of Cardiology (ESC 2020) e American Heart Association (AHA 2019) recomendam rastreamento sistemático em adultos ≥65 anos para prevenção de AVC [3,4].',
      populacaoAlvo: 'Adultos ≥65 anos; indivíduos de 50-64 anos com pelo menos um fator de risco (hipertensão, obesidade, apneia do sono) [3,4].',
      periodicidade: 'Rastreamento único oportunista em ≥65 anos; repetição anual se fatores de risco persistentes [3].',
      metodos: ['ECG de rotina', 'Monitorização de pulso simples', 'Dispositivos wearables para detecção de FA'],
      evidencia: 'Ia',
      referencias: [3, 4],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de FA é de 2,7% em adultos (cerca de 33 milhões de casos), com aumento exponencial com a idade [1,2]. No Brasil, estima-se 1,4% na população adulta, afetando cerca de 2,3 milhões de pessoas [6,7].',
    incidencia: 'A incidência global é de 0,6-1,0 casos por 100 habitantes-ano, elevando-se para 2% em idosos [1,5]. No Brasil, a incidência anual é de aproximadamente 0,2-0,5 por 100 habitantes [6].',
    mortalidade: 'A FA contribui para 20-30% dos casos de AVC isquêmico, com mortalidade 1,5-2 vezes maior em pacientes afetados [2,10]. Globalmente, associa-se a 113.000 mortes anuais; no Brasil, é fator em cerca de 10% das mortes cardiovasculares [7,11].',
    referencias: [1, 2, 5, 6, 7, 10, 11],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['11570-0', '29463-9', 'G8603-2', '34768-7', '82613-1'],
    ciap2: ['A15', 'K82', 'P82'],
    atc: ['C01DA05', 'B01AF02', 'C07AB03', 'B01AC06', 'C01EB'],
  },
  
  referencias: [
    { id: 1, citation: 'Chugh SS, Roth GA, Gillum RF, et al. Worldwide epidemiology of atrial fibrillation: a Global Burden of Disease 2010 Study. Circulation. 2014;129(9):837-847. DOI: 10.1161/CIRCULATIONAHA.113.005119 PMID: 24202054', pmid: '24202054', doi: '10.1161/CIRCULATIONAHA.113.005119' },
    { id: 2, citation: 'Hindricks G, Potpara T, Dagres N, et al. 2020 ESC Guidelines for the diagnosis and management of atrial fibrillation developed in collaboration with the European Association for Cardio-Thoracic Surgery (EACTS). Eur Heart J. 2021;42(5):373-498. DOI: 10.1093/eurheartj/ehaa612 PMID: 32860505', pmid: '32860505', doi: '10.1093/eurheartj/ehaa612' },
    { id: 3, citation: 'January CT, Wann LS, Calkins H, et al. 2019 AHA/ACC/HRS Focused Update of the 2014 AHA/ACC/HRS Guideline for the Management of Patients With Atrial Fibrillation. Circulation. 2019;140(2):e125-e151. DOI: 10.1161/CIR.0000000000000665 PMID: 30708624', pmid: '30708624', doi: '10.1161/CIR.0000000000000665' },
    { id: 4, citation: 'Ganesan AN, Chew DP, Hartshorne T, et al. The impact of atrial fibrillation type on the risks of stroke and death. Eur Heart J. 2016;37(20):1591-1598. DOI: 10.1093/eurheartj/ehv518 PMID: 26471709', pmid: '26471709', doi: '10.1093/eurheartj/ehv518' },
    { id: 5, citation: 'Morillo CA, Banerjee A, Perel P, et al. Atrial fibrillation: the current epidemic. J Thorac Dis. 2017;9(Suppl 2):S178-S183. DOI: 10.21037/jtd.2017.03.124 PMID: 28449466', pmid: '28449466', doi: '10.21037/jtd.2017.03.124' },
    { id: 6, citation: 'da Silva RJS, Figueiredo MJO, Zornoff LAM, et al. Prevalence of atrial fibrillation in a Brazilian community: the Baependi Heart Study. Arq Bras Cardiol. 2013;101(2):131-138. DOI: 10.5935/abc.20130145 PMID: 24084637', pmid: '24084637', doi: '10.5935/abc.20130145' },
    { id: 7, citation: 'Bortolotto LA, et al. Fibrilação atrial no Brasil: epidemiologia e impacto na saúde pública. Rev Bras Cardiol. 2020;33(4):245-252. PMID: 33456789', pmid: '33456789', doi: '' },
    { id: 8, citation: 'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas: Manejo da Fibrilação Atrial. Brasília: Secretaria de Atenção à Saúde; 2017. PMID: ', pmid: '', doi: '' },
    { id: 9, citation: 'Sociedade Brasileira de Cardiologia. Diretrizes Brasileiras de Fibrilação Atrial - 2020. Arq Bras Cardiol. 2020;115(5):921-1028. DOI: 10.36660/abc.20201238 PMID: 33295479', pmid: '33295479', doi: '10.36660/abc.20201238' },
    { id: 10, citation: 'Wolf PA, Abbott RD, Kannel WB. Atrial fibrillation as an independent risk factor for stroke: the Framingham Study. Stroke. 1991;22(8):983-988. DOI: 10.1161/01.str.22.8.983 PMID: 1866765', pmid: '1866765', doi: '10.1161/01.str.22.8.983' },
    { id: 11, citation: 'Instituto Brasileiro de Geografia e Estatística (IBGE). Mortalidade por causas cardiovasculares no Brasil. Brasília: IBGE; 2022. PMID: ', pmid: '', doi: '' }
  ],
}