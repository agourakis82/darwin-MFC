{
  id: 'diabetes-screening',
  titulo: 'Rastreamento de Diabetes Mellitus',
  categoria: 'multidimensional',
  descricao: 'O Diabetes Mellitus (DM) constitui um grupo de distúrbios metabólicos caracterizados por hiperglicemia persistente, resultante de defeitos na secreção de insulina, na ação da insulina, ou em ambos [1,6]. A classificação atual reconhece quatro categorias clínicas principais: diabetes tipo 1, diabetes tipo 2, diabetes mellitus gestacional e tipos específicos de diabetes devido a outras causas [1,6]. O rastreamento sistemático é uma estratégia essencial para identificação precoce, permitindo intervenção terapêutica oportuna e redução de complicações microvasculares e macrovasculares [1,2]. A prevalência global de diabetes em adultos é estimada em 10,5%, afetando aproximadamente 537 milhões de pessoas worldwide [3]. No Brasil, a prevalência autorreferida de diabetes mellitus é de 7,7%, representando um desafio significativo para a saúde pública [4]. O diagnóstico precoce através de rastreamento organizado pode reduzir a progressão para complicações crônicas em até 50% quando implementado adequadamente [1,5].',

  recomendacoes: {
    sus: {
      indicacao: 'O Ministério da Saúde do Brasil recomenda rastreamento para diabetes mellitus tipo 2 em indivíduos assintomáticos com fatores de risco estabelecidos, visando identificação precoce e intervenção terapêutica oportuna dentro do Sistema Único de Saúde [7,8]. Para diabetes mellitus tipo 1, o rastreamento populacional não é recomendado, porém casos suspeitos devem ser investigados imediatamente devido à natureza rapidamente progressiva da doença [8].',
      populacaoAlvo: 'Adultos com idade igual ou superior a 45 anos; adultos com idade inferior a 45 anos apresentando IMC ≥25 kg/m² e pelo menos um fator de risco adicional, incluindo história familiar de diabetes em parentes de primeiro grau, hipertensão arterial, dislipidemia, história de doença cardiovascular, síndrome de ovário policístico, acantose nigricans, ou uso de medicamentos hiperglicemiantes [7,8].',
      periodicidade: 'O rastreamento deve ser repetitionado a cada 3 anos para indivíduos com resultados normais [7]. Para pacientes com pré-diabetes (glicemia de jejum entre 100-125 mg/dL, HbA1c entre 5,7-6,4%, ou TOTG com 2h entre 140-199 mg/dL), o rastreamento deve ser anual [7,8].',
      metodos: ['Glicemia de jejum', 'Hemoglobina glicada (HbA1c)', 'Teste oral de tolerância à glicose com 75g'],
      evidencia: 'IIa',
      referencias: [7, 8],
    },
    sociedadesMedicas: {
      indicacao: 'A American Diabetes Association (ADA) Standards of Care 2024 recomenda rastreamento sistemático para diabetes mellitus tipo 2 e pré-diabetes em adultos assintomáticos, independentemente do IMC, a partir dos 35 anos de idade [2]. A Sociedade Brasileira de Diabetes (SBD) endossa recomendações semelhantes, enfatizando a importância do rastreamento em populações de alto risco [4]. Para diabetes mellitus tipo 1, o rastreamento seletivo em familiares de primeiro grau pode ser considerado, embora não seja recomendado para a população geral [3,9].',
      populacaoAlvo: 'Adultos com idade ≥35 anos, independentemente do IMC, devem ser submetidos a rastreamento a cada 3 anos [1,2]. Indivíduos de qualquer idade com IMC ≥25 kg/m² (ou ≥23 kg/m² em populações de alto risco) e fatores de risco adicionais, incluindo história familiar de diabetes, hipertensão arterial, dislipidemia, sedentarismo, história de diabetes gestacional, síndrome de ovário policístico, ou condições associadas à resistência insulínica [1,2,4]. Crianças e adolescentes com IMC ≥85º percentil e fatores de risco devem ser rastreados a partir dos 10 anos ou na puberdade, o que ocorrer primeiro [9].',
      periodicidade: 'Para indivíduos com resultados de rastreamento normais, a repetitionação deve ocorrer a cada 3 anos [1,2]. Para indivíduos com pré-diabetes identificada, o rastreamento deve ser anual [1,2]. Mulheres com histórico de diabetes gestacional devem ser submetidas a rastreamento a cada 3 anos a partir de 4-12 semanas pós-parto e, subsequentemente, a cada 1-3 anos [5,10].',
      metodos: ['Glicemia de jejum', 'Hemoglobina glicada (HbA1c)', 'Teste oral de tolerância à glicose com 75g'],
      evidencia: 'Ia',
      referencias: [1, 2, 3, 4, 9],
    },
    convergencia: 'As recomendações do Ministério da Saúde do Brasil demonstram convergência parcial com as diretrizes internacionais da ADA e SBD quanto à indicação de rastreamento e métodos diagnósticos [1,2,4,7,8]. Ambas as fontes convergem na indicação de rastreamento para adultos com fatores de risco, porém divergem na idade inicial recomendada (≥45 anos no SUS versus ≥35 anos na ADA) [1,2,7]. A periodicidade de repetitionação é consistente (3 anos para resultados normais, anual para pré-diabetes), demonstrando convergência neste aspecto [1,2,7]. Os métodos diagnósticos recomendados são idênticos: glicemia de jejum, HbA1c e TOTG 75g [1,2,7].',
  },

  epidemiologia: {
    prevalencia: 'A prevalência global de diabetes mellitus em adultos é estimada em 10,5%, afetando aproximadamente 537 milhões de pessoas worldwide, com projeção de aumento para 783 milhões até 2045 se as tendências atuais persistirem [3]. No Brasil, a prevalência autorreferida de diabetes mellitus é de 7,7%, representando cerca de 16 milhões de indivíduos adultos com a doença [4]. A prevalência de pré-diabetes globalmente é de aproximadamente 10,6%, afetando 541 milhões de adultos [3]. A prevalência de diabetes tipo 1 varia geograficamente, sendo mais elevada em países nórdicos (Finlândia, Suécia) e mais baixa em países asiáticos e sul-americanos [9].',
    incidencia: 'A incidência global de diabetes mellitus tipo 2 varia de 2 a 15 casos por 1.000 pessoas-ano, dependendo da região e características populacionais [3]. No Brasil, a incidência anual de diabetes mellitus tipo 2 é estimada entre 0,5 a 1,5 casos por 1.000 habitantes [4]. A incidência de diabetes mellitus tipo 1 em crianças e adolescentes varia de 0,5 a 35 casos por 100.000 pessoas-ano worldwide, com aumento anual de aproximadamente 2-3% na incidência globally [9].',
    mortalidade: 'O diabetes mellitus representa a nona principal causa de morte globalmente, contribuindo para aproximadamente 6,7 milhões de mortes em 2021, o que corresponde a uma morte a cada 5 segundos atribuível ao diabetes [3]. No Brasil, o diabetes mellitus é a sétima causa de morte por doenças crônicas não transmissíveis, representando um componente significativo da carga de morbimortalidade nacional [4]. As complicações cardiovasculares são responsáveis por mais de 50% das mortes em indivíduos com diabetes, enquanto as complicações microvasculares (nefropatia, retinopatia, neuropatia) contribuem substancialmente para a morbidade e custos de saúde [1,5].',
    referencias: [1, 2, 3, 4, 5, 9],
  },

  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005', '279039007', '84114007', '49436004', '53741008', '13645005'],
    loinc: ['2339-0', '4548-4', '1558-6', '21000-3', '4549-2', '2345-7', '15074-8', '17856-3'],
    atc: ['A10BA02', 'A10AB01', 'A10AC01', 'A10AD01', 'A10AE01', 'A10BD01', 'A10BK01', 'A10BX01'],
    ciap2: ['T89', 'T90', 'T82', 'T83', 'T84'],
  },

  referencias: [
    { id: 1, citation: 'American Diabetes Association. 2. Classification and Diagnosis of Diabetes: Standards of Care in Diabetes—2024. Diabetes Care. 2024;47(Suppl 1):S20-S42. DOI: 10.2337/dc24-S002 PMID: 38098573', pmid: '38098573', doi: '10.2337/dc24-S002' },
    { id: 2, citation: 'American Diabetes Association. Standards of Care in Diabetes—2024. Diabetes Care. 2024;47(Suppl 1):S1-S321. DOI: 10.2337/dc24-S001 PMID: 38078589', pmid: '38078589', doi: '10.2337/dc24-S001' },
    { id: 3, citation: 'IDF Diabetes Atlas 10th Edition. International Diabetes Federation; 2021.', pmid: '', doi: '' },
    { id: 4, citation: 'Sociedade Brasileira de Diabetes. Diretrizes da Sociedade Brasileira de Diabetes 2023-2024. São Paulo: SBD; 2024.', pmid: '', doi: '' },
    { id: 5, citation: 'American Diabetes Association. 15. Management of Diabetes in Pregnancy: Standards of Care in Diabetes—2024. Diabetes Care. 2024;47(Suppl 1):S282-S294. DOI: 10.2337/dc24-S015', pmid: '38078589', doi: '10.2337/dc24-S015' },
    { id: 6, citation: 'American Diabetes Association. Diagnosis and classification of diabetes mellitus. Diabetes Care. 2014;37(Suppl 1):S81-S90. DOI: 10.2337/dc14-S081 PMID: 24357215', pmid: '24357215', doi: '10.2337/dc14-S081' },
    { id: 7, citation: 'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas do Diabetes Mellitus Tipo 2. Brasília: MS; 2022.', pmid: '', doi: '' },
    { id: 8, citation: 'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas do Diabetes Mellitus Tipo 1. Brasília: MS; 2022.', pmid: '', doi: '' },
    { id: 9, citation: 'Mayer-Davis EJ, et al. ISPAD Clinical Practice Consensus Guidelines 2018: Definition, epidemiology, and classification of diabetes in children and adolescents. Pediatr Diabetes. 2018;19(Suppl 27):7-19. DOI: 10.1111/pedi.12773 PMID: 30226024', pmid: '30226024', doi: '10.1111/pedi.12773' },
    { id: 10, citation: 'Blumer I, et al. Preexisting Diabetes and Pregnancy: An Endocrine Society and European Society of Endocrinology Joint Clinical Practice Guideline. J Clin Endocrinol Metab. 2025;110(1):1-50. DOI: 10.1210/clinem/dgaf288 PMID: 40652453', pmid: '40652453', doi: '10.1210/clinem/dgaf288' }
  ],
}
