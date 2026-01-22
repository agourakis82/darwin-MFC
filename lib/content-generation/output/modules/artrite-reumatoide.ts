{
  id: 'artrite-reumatoide',
  titulo: 'Artrite Reumatoide',
  categoria: 'doenças reumáticas',
  descricao: 'A artrite reumatoide (AR) é uma doença inflamatória autoimune crônica que afeta principalmente as articulações sinoviais, levando a sinovite, dano articular e incapacidade funcional [1,9]. O tratamento visa controle da inflamação, alívio da dor e prevenção de complicações, com ênfase em DMARDs e terapias biológicas [1,3,5,9].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Tratamento farmacológico para pacientes com AR ativa, diagnosticada pelos critérios ACR/EULAR 2010, com falha ou intolerância a DMARDs convencionais [9].',
      populacaoAlvo: 'Adultos com AR moderada a grave (DAS28 >3,2), incluindo aqueles com fatores de risco para progressão rápida [9].',
      periodicidade: 'Monitoramento clínico e laboratorial a cada 1-3 meses inicialmente, ajustando para 6-12 meses em remissão [9].',
      metodos: ['Metotrexato (MTX)', 'Sulfassalazina', 'Hidroxicloroquina', 'Leflunomida', 'Inibidores de TNF (ex.: etanercepta)', 'Tofacitinibe'],
      evidencia: 'Ia',
      referencias: [9],
    },
    sociedadesMedicas: {
      indicacao: 'Uso de MTX como primeira linha para AR ativa; introdução de biológicos ou JAK inibidores em falha a DMARDs convencionais [1,3,5,6]. Triagem para TB antes de anti-TNF [2,4].',
      populacaoAlvo: 'Adultos com AR confirmada, DAS28 >5,1 para biológicos, considerando comorbidades como infecções latentes [1,2,3,5].',
      periodicidade: 'Avaliação a cada 3 meses durante iniciação de terapia biológica, com monitoramento anual para infecções oportunistas [2,3,7].',
      metodos: ['Metotrexato (MTX)', 'Biologics (anti-TNF, abatacepte)', 'Tofacitinibe (JAK inibidor)', 'Triagem para LTBI (teste tuberculínico, IGRA)'],
      evidencia: 'Ia',
      referencias: [1,2,3,5,6],
    },
    convergencia: 'As recomendações do SUS e das sociedades médicas demonstram convergencia quanto à indicação de DMARDs convencionais como MTX e biológicos em AR refratária, com ênfase em triagem para TB [1,2,3,5,9].',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global da AR é de aproximadamente 0,5-1% em adultos [1,5]. No Brasil, estima-se em 0,46% da população adulta [1,9].',
    incidencia: 'A incidência global varia de 20-50 casos por 100.000 habitantes/ano, com maior risco em mulheres e fumantes [1,5]. No Brasil, incidência anual de cerca de 25/100.000 [9].',
    mortalidade: 'A AR aumenta o risco de mortalidade em 1,5-2 vezes, principalmente por infecções e doenças cardiovasculares [1,3]. No Brasil, contribui para 0,5% das mortes por doenças reumáticas [9].',
    referencias: [1,3,5,9],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['9357-6', '50794-0', '11526-1', '6690-2', '32239-9'],
    atc: ['L01BA01', 'L04AA26', 'L04AC07', 'L04AX07', 'M01CC01'],
    ciap2: ['A85', 'A86', 'A89'],
  },
  
  referencias: [
    { id: 1, citation: 'Brenol JC, Oliveira LM, Tumas L, et al. Update on the 2012 Brazilian Society of Rheumatology Guidelines for the treatment of rheumatoid arthritis: position on the use of tofacitinib. Rev Bras Reumatol. 2015;55(5):374-381. doi: 10.1016/j.rbr.2015.08.004', pmid: '26456224', doi: '10.1016/j.rbr.2015.08.004' },
    { id: 2, citation: 'Santana R, Gamito M, et al. Recommendations for the diagnosis and treatment of latent and active tuberculosis in patients with inflammatory joint diseases treated with tumour necrosis factor alpha inhibitors. Acta Reumatol Port. 2006;31(4):309-326.', pmid: '17094335', doi: '' },
    { id: 3, citation: 'Portuguese Society of Rheumatology. Guidelines for the use of biologic therapies in rheumatoid arthritis--December 2006 update. Acta Reumatol Port. 2007;32(1):51-64.', pmid: '17450763', doi: '' },
    { id: 4, citation: 'Santana R, Gamito M, et al. Guidelines for the diagnosis and treatment of latent tuberculosis infection and active tuberculosis in patients with inflammatory joint diseases proposed for treatment with tumour necrosis factor alpha antagonist drugs. Rev Port Pneumol. 2006;12(6):751-774.', pmid: '17117328', doi: '' },
    { id: 5, citation: 'Monteiro C, et al. Portuguese guidelines for the use of biological agents in rheumatoid arthritis - March 2010 update. Acta Reumatol Port. 2010;35(2):155-179.', pmid: '20505635', doi: '' },
    { id: 6, citation: 'Salaffi F, et al. Italian consensus on the recommendations about the use of methotrexate for the treatment of rheumatic diseases with a focus on rheumatoid arthritis: results from the "3E initiative". Reumatismo. 2010;62(1):48-64. doi: 10.4081/reumatismo.2010.34', pmid: '20390116', doi: '10.4081/reumatismo.2010.34' },
    { id: 7, citation: 'Monteiro C, et al. Practical guide for the use of biological agents in rheumatoid arthritis - December 2011 update. Acta Reumatol Port. 2011;36(4):352-375.', pmid: '22472930', doi: '' },
    { id: 8, citation: 'Portuguese Society of Rheumatology. Practical guide for the use of biotechnological therapies in rheumatoid arthritis. Acta Reumatol Port. 2009;34(3):289-308.', pmid: '19727050', doi: '' },
    { id: 9, citation: 'Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Artrite Reumatoide. Brasília: Ministério da Saúde; 2019. Available from: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt', pmid: '', doi: '' }
  ],
}