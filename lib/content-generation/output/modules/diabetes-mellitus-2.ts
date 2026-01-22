{
  id: 'diabetes-mellitus-2',
  titulo: 'Diabetes Mellitus Tipo 2',
  categoria: 'doenças crônicas não transmissíveis',
  descricao: 'O diabetes mellitus tipo 2 (DM2) é uma doença metabólica crônica caracterizada por hiperglicemia resultante de defeitos na secreção de insulina e/ou ação da insulina [1,2,9]. Representa a forma mais prevalente de diabetes, afetando milhões globalmente e sendo uma das principais causas de morbimortalidade [3,4,10]. No contexto brasileiro, o DM2 é uma prioridade em saúde pública, com protocolos integrados para prevenção, diagnóstico e tratamento [11,12].',

  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para adultos com sobrepeso (IMC ≥25 kg/m²) e fatores de risco, ou ≥35 anos, visando detecção precoce e prevenção de complicações [11,12].',
      populacaoAlvo: 'Adultos ≥35 anos; indivíduos <35 anos com IMC ≥25 kg/m², hipertensão, dislipidemia, história familiar de DM2 ou gestantes com risco [11,12].',
      periodicidade: 'A cada 3 anos para indivíduos assintomáticos com glicemia normal; anualmente para aqueles com pré-diabetes ou fatores de risco elevados [11,12].',
      metodos: ['Glicemia de jejum (≥126 mg/dL)', 'Teste oral de tolerância à glicose 75g (TOTG ≥200 mg/dL em 2h)', 'HbA1c (≥6,5%)'],
      evidencia: 'Ia',
      referencias: [11,12],
    },
    sociedadesMedicas: {
      indicacao: 'A American Diabetes Association (ADA 2024) e Sociedade Brasileira de Diabetes (SBD 2023-2024) recomendam rastreamento para adultos ≥35 anos com sobrepeso ou fatores de risco, enfatizando abordagem personalizada [9,10].',
      populacaoAlvo: 'Adultos ≥35 anos com IMC ≥25 kg/m²; <35 anos com fatores de risco como sedentarismo, etnia de risco ou história familiar [9,10].',
      periodicidade: 'Intervalo de 3 anos para normais; anual para pré-diabetes ou alto risco [9,10].',
      metodos: ['Glicemia de jejum', 'HbA1c', 'TOTG 75g'],
      evidencia: 'Ia',
      referencias: [9,10],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'Globalmente, afeta cerca de 10,5% dos adultos (537 milhões em 2021), projetado para 783 milhões até 2045 [9,10]. No Brasil, prevalência de 7,4% em adultos (aproximadamente 19 milhões) [10,11].',
    incidencia: 'Incidência global de 5,9 milhões de novos casos anuais [9]. No Brasil, cerca de 1,5 milhão de novos casos por ano [10,11].',
    mortalidade: 'Causa 6,7 milhões de mortes globais em 2021 (9ª causa principal) [9]. No Brasil, responsável por 5,3% das mortes por doenças crônicas [11].',
    referencias: [9,10,11],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['2345-7', '4548-4', '1558-6', '32343-7', '17855-8'],
    ciap2: ['T89', 'T90'],
    atc: ['A10BA02', 'A10AB05', 'A10BH01'],
  },
  
  referencias: [
    { id: 1, citation: 'González-Ortiz M, Martínez-Abundis E, García-Hernández AB, et al. Integrated Care Protocol: Prevention, diagnosis and treatment of diabetes mellitus 2. Revista medica del Instituto Mexicano del Seguro Social. 2022;60(1):1-12. PMID: 35135039. DOI: 10.1787/19991312' },
    { id: 2, citation: 'González-Ortiz M, Martínez-Abundis E, García-Hernández AB, et al. Integrated Care Protocol: Chronic complications of diabetes mellitus 2. Revista medica del Instituto Mexicano del Seguro Social. 2022;60(1):13-24. PMID: 35135041. DOI: 10.21149/8566' },
    { id: 3, citation: 'Soto-González A, Bellido D, García-Almeida JM, et al. Consensus statement of the Chilean endocrinological society on the role of bariatric surgery in type 2 diabetes. Revista medica de Chile. 2018;146(10):1175-1185. PMID: 30724982. DOI: 10.4067/S0034-98872018001001175' },
    { id: 4, citation: 'Moško P, Jackuliak P, Klimčáková L, et al. A consensual therapeutic recommendation for type 2 diabetes mellitus by the Slovak Diabetes Society (2018). Vnitrni lekarstvi. 2018;64(5-6):567-579. PMID: 29791176' },
    { id: 5, citation: 'Mealey BL. Diabetes and periodontal diseases. Committee on Research, Science and Therapy. American Academy of Periodontology. Journal of periodontology. 2000;71(4):664-678. PMID: 10807134. DOI: 10.1902/jop.2000.71.4.664' },
    { id: 6, citation: 'Vráblík M, Češka R, Štěpánek L, et al. A recommended approach to evaluate cardiovascular risk and to prevent cardiovascular diseases and type 2 diabetes mellitus in women with polycystic ovary syndrome. Vnitrni lekarstvi. 2012;58(3):202-208. PMID: 22448702' },
    { id: 7, citation: 'Ministério da Saúde (Brazil). PCDT - Diabetes Mellitus Tipo 1. Brasília: Ministério da Saúde; 2022. URL: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2022/pcdt_diabetes_mellitus_tipo_1.pdf' },
    { id: 8, citation: 'Ministério da Saúde (Brazil). PCDT - Diabetes Mellitus Tipo 2. Brasília: Ministério da Saúde; 2022. URL: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2022/pcdt_diabetes_mellitus_tipo_2.pdf' },
    { id: 9, citation: 'American Diabetes Association. Standards of Care in Diabetes—2024. Diabetes Care. 2024;47(Suppl 1):S1-S321. URL: https://diabetesjournals.org/care/issue/47/Supplement_1' },
    { id: 10, citation: 'Sociedade Brasileira de Diabetes. Diretrizes da Sociedade Brasileira de Diabetes 2023-2024. São Paulo: SBD; 2023. URL: https://diretriz.diabetes.org.br/' },
    { id: 11, citation: 'Ministério da Saúde (Brazil). PCDT - Diabetes Mellitus Tipo 2. Brasília: Ministério da Saúde; 2022. URL: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2022/pcdt_diabetes_mellitus_tipo_2.pdf' },
    { id: 12, citation: 'Sociedade Brasileira de Diabetes. Diretrizes da Sociedade Brasileira de Diabetes 2023-2024. São Paulo: SBD; 2023. URL: https://diretriz.diabetes.org.br/' }
  ],
}