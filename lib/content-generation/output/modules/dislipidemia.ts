{
  id: 'dislipidemia',
  titulo: 'Rastreamento de Dislipidemia',
  categoria: 'adultos',
  descricao: 'O rastreamento de dislipidemia é essencial para a prevenção de eventos cardiovasculares ateroscleróticos, com foco na identificação precoce de alterações lipídicas como hipercolesterolemia e hipertrigliceridemia [1,3,11]. No Brasil, a dislipidemia é um fator de risco prevalente, contribuindo para a alta morbimortalidade cardiovascular [11,12]. A abordagem integrada considera o risco cardiovascular global [3,5].',

  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para prevenção de eventos cardiovasculares e pancreatite em indivíduos com fatores de risco ou ≥40 anos [11,12].',
      populacaoAlvo: 'Adultos ≥40 anos; indivíduos <40 anos com obesidade, diabetes, hipertensão ou história familiar de doença cardiovascular precoce [11,12].',
      periodicidade: 'A cada 5 anos em indivíduos de baixo risco; anualmente em alto risco [11].',
      metodos: ['Perfil lipídico (colesterol total, HDL, LDL, triglicerídeos)'],
      evidencia: 'Ia',
      referencias: [11, 12],
    },
    sociedadesMedicas: {
      indicacao: 'A Sociedade Brasileira de Cardiologia (2017) e diretrizes ESC recomendam rastreamento para avaliação de risco cardiovascular em adultos [1,3,5].',
      populacaoAlvo: 'Adultos ≥20 anos; priorizando aqueles com fatores de risco como diabetes, hipertensão ou tabagismo [1,3,5,7].',
      periodicidade: 'A cada 4-6 anos em adultos saudáveis; mais frequente em alto risco [1,5].',
      metodos: ['Perfil lipídico completo', 'Cálculo de escore de risco (SCORE ou Framingham)'],
      evidencia: 'Ia',
      referencias: [1, 3, 5, 7],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'No Brasil, a prevalência de dislipidemia é de aproximadamente 30-40% em adultos, com hipercolesterolemia afetando 25% da população [11,12]. Globalmente, estima-se em 39% para hipercolesterolemia [3,5].',
    incidencia: 'A incidência anual de dislipidemia em adultos é de 5-10 casos por 1.000 habitantes, associada ao envelhecimento e obesidade [3,7]. No Brasil, contribui para 20% dos novos casos de doença coronariana [11].',
    mortalidade: 'A dislipidemia contribui para 4,4 milhões de mortes globais por CVD anualmente [3,5]. No Brasil, representa fator em 30% das mortes cardiovasculares [11,12].',
    referencias: [3, 5, 7, 11, 12],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['2093-3', '2085-9', '13457-7', '1920-8', '2571-8'],
    atc: ['C10AA01', 'C10AB05', 'C10BA02'],
    ciap2: ['A96', 'A97', '25'],
  },
  
  referencias: [
    { id: 1, citation: 'Authors et al. Title not available. Arquivos brasileiros de cardiologia. 2017. DOI: 10.5935/abc.20170121 PMID: 28813069', pmid: '28813069', doi: '10.5935/abc.20170121' },
    { id: 2, citation: 'Authors et al. Prediabetes in Colombia: Expert Consensus. Colombia medica (Cali, Colombia). 2017. DOI: 10.25100/cm.v43i4.3662 PMID: 29662261', pmid: '29662261', doi: '10.25100/cm.v43i4.3662' },
    { id: 3, citation: 'Authors et al. Dyslipidemias: a pending challenge in cardiovascular prevention. Consensus document from CEIPC/SEA Committee. Medicina clinica. 2011. DOI: 10.1016/j.medcli.2011.02.008 PMID: 21511309', pmid: '21511309', doi: '10.1016/j.medcli.2011.02.008' },
    { id: 4, citation: 'Authors et al. Mexican consensus on lysosomal acid lipase deficiency diagnosis. Revista de gastroenterologia de Mexico (English). 2018. DOI: 10.1016/j.rgmx.2017.08.001 PMID: 29287906', pmid: '29287906', doi: '10.1016/j.rgmx.2017.08.001' },
    { id: 5, citation: 'Authors et al. Dyslipidemias and stroke prevention: Recommendations of the Study Group of Cerebrovascular Diseases of the Spanish Society of Neurology. Neurologia. 2022. DOI: 10.1016/j.nrleng.2020.07.021 PMID: 35074190', pmid: '35074190', doi: '10.1016/j.nrleng.2020.07.021' },
    { id: 6, citation: 'Authors. Consensus on management of dyslipidemia in pediatrics. Archivos argentinos de pediatria. 2015. DOI: 10.5546/aap.2015.177 PMID: 25727831', pmid: '25727831', doi: '10.5546/aap.2015.177' },
    { id: 7, citation: 'Authors et al. Consensus document on the treatment of dyslipidemia in diabetes. Semergen. 2015. DOI: 10.1016/j.semerg.2014.11.007 PMID: 25533449', pmid: '25533449', doi: '10.1016/j.semerg.2014.11.007' },
    { id: 8, citation: 'Authors et al. Dyslipidemia management in children and adolescents: recommendations of the Nutrition Branch of the Chilean Society of Pediatrics. Revista chilena de pediatria. 2014. DOI: 10.4067/S0370-41062014000300014 PMID: 25697255', pmid: '25697255', doi: '10.4067/S0370-41062014000300014' },
    { id: 9, citation: 'Authors et al. Dyslipidemias and stroke prevention: recommendations of the Study Group of Cerebrovascular Diseases of the Spanish Society of Neurology. Neurologia. 2022. DOI: 10.1016/j.nrl.2020.07.027 PMID: 33160722', pmid: '33160722', doi: '10.1016/j.nrl.2020.07.027' },
    { id: 10, citation: 'Authors et al. ESH-ESC guidelines for the management of hypertension. Herz. 2006. DOI: 10.1007/s00059-006-2829-3 PMID: 16810473', pmid: '16810473', doi: '10.1007/s00059-006-2829-3' },
    { id: 11, citation: 'Sociedade Brasileira de Cardiologia. Atualização da Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose – 2017. 2017. URL: https://www.portal.cardiol.br/', pmid: '', doi: '' },
    { id: 12, citation: 'Ministério da Saúde (Brazil). Protocolo Clínico - Dislipidemia: prevenção de eventos cardiovasculares e pancreatite. 2019. URL: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt', pmid: '', doi: '' }
  ],
}