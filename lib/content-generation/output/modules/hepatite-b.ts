{
  id: 'hepatite-b',
  titulo: 'Rastreamento de Hepatite B',
  categoria: 'adultos',
  descricao: 'O rastreamento de hepatite B visa identificar infecções crônicas para prevenção de transmissão e tratamento precoce [3,5]. A vacina contra hepatite B é recomendada universalmente para prevenção [1,3]. Em contextos obstétricos, o rastreamento é crucial para mulheres com infecção viral crônica [2,5].',

  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento sorológico recomendado para gestantes e grupos de alto risco, como profissionais de saúde e doadores de órgãos [1,3,5].',
      populacaoAlvo: 'Gestantes em todas as idades gestacionais; indivíduos com múltiplos parceiros sexuais, usuários de drogas injetáveis e familiares de portadores [1,3,5].',
      periodicidade: 'Rastreamento único durante a gestação; repetição em grupos de risco a cada 6-12 meses conforme exposição [3,5].',
      metodos: ['Teste para HBsAg', 'Anti-HBc total', 'Anti-HBs'],
      evidencia: 'Ia',
      referencias: [1, 3, 5],
    },
    sociedadesMedicas: {
      indicacao: 'A OMS recomenda rastreamento universal em recém-nascidos e populações de alto risco para infecção por hepatite B [3,5]. Diretrizes obstétricas enfatizam triagem em mulheres grávidas com infecções virais crônicas [2,5].',
      populacaoAlvo: 'Recém-nascidos de mães HBsAg positivas; adultos com fatores de risco como viagens endêmicas e exposições ocupacionais [2,3,5].',
      periodicidade: 'Vacinação em série de 3 doses sem reforço rotineiro em imunocompetentes; rastreamento pós-vacinação em grupos de risco [3,4,5].',
      metodos: ['Sorologia para HBsAg', 'Anti-HBc', 'Anti-HBs', 'PCR para HBV DNA em casos selecionados'],
      evidencia: 'Ia',
      referencias: [2, 3, 4, 5],
    },
    convergencia: 'convergencia',
  },

  epidemiologia: {
    prevalencia: 'A prevalência global de infecção crônica por hepatite B é de aproximadamente 3,5% (257 milhões de pessoas) [3,5]. No Brasil, a prevalência é estimada em 0,6-1% na população geral [1,5].',
    incidencia: 'A incidência global de hepatite B aguda é de cerca de 1,5 milhão de casos por ano [3,5]. No contexto brasileiro, a incidência diminuiu com vacinação, para menos de 2 casos por 100.000 habitantes [1,5].',
    mortalidade: 'A hepatite B causa cerca de 887.000 mortes anuais globalmente, principalmente por cirrose e carcinoma hepatocelular [3,5]. No Brasil, contribui para 5-10% das mortes por doenças hepáticas [1,5].',
    referencias: [1, 3, 5],
  },

  ontologia: {
    cid11: ['1E50.1', '1E51.0', '1E51.1', '1E51.2', 'DB94.0'],
    snomedCT: ['66071002', '186639003', '235869004', '235871004', '60498001'],
    loinc: ['5193-7', '11064-1', '1695-6', '8789-0', '20566-0'],
    atc: ['J07BC01', 'J05AF08', 'J05AF10', 'J05AF11'],
    ciap2: ['D72', 'A94'],
  },

  referencias: [
    { id: 1, citation: 'Hepatitis B vaccine. Rev Assoc Med Bras. 2006;52(5):257-8. DOI: 10.1590/s0104-42302006000500009 PMID: 17269193', pmid: '17269193', doi: '10.1590/s0104-42302006000500009' },
    { id: 2, citation: 'Screening and treatment of perinatal viral infections. J Obstet Gynaecol Can. 2020;42(12):1561-1573. DOI: 10.1016/j.jogc.2020.10.006 PMID: 33308792', pmid: '33308792', doi: '10.1016/j.jogc.2020.10.006' },
    { id: 3, citation: 'Hepatitis B vaccines: WHO position paper - July 2017. Wkly Epidemiol Rec. 2017;92(28):369-392. PMID: 28685564', pmid: '28685564', doi: '' },
    { id: 4, citation: 'Revised recommendations regarding hepatitis B booster vaccines. National Immunization Conferences Committee. Union Med Can. 1993;122(3):55-6. PMID: 8465476', pmid: '8465476', doi: '' },
    { id: 5, citation: 'Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Hepatite B e Coinfecções. Brasília: Ministério da Saúde; 2022. URL: https://www.gov.br/saude/pt-br/assuntos/pcdt', pmid: '', doi: '' }
  ],
}
