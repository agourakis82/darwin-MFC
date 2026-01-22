{
  id: 'hipertensao-arterial',
  titulo: 'Rastreamento de Hipertensão Arterial',
  categoria: 'cardiovascular',
  descricao: 'A hipertensão arterial é uma condição crônica caracterizada por elevados níveis pressóricos, sendo um fator de risco principal para doenças cardiovasculares [5,6]. No Brasil, o rastreamento é essencial para detecção precoce e prevenção de complicações [2,10]. A classificação segue critérios baseados em medições repetidas [6].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para todos os adultos em consultas de atenção primária, com ênfase em indivíduos com fatores de risco [5,6,10].',
      populacaoAlvo: 'Adultos ≥ 18 anos; priorizar aqueles com obesidade, diabetes ou história familiar [5,6].',
      periodicidade: 'Anual para adultos saudáveis; semestral ou trimestral para hipertensos controlados ou de alto risco [6,10].',
      metodos: ['Medição da pressão arterial no consultório', 'Monitorização ambulatorial da pressão arterial (MAPA)', 'Monitorização residencial da pressão arterial (MRPA)'],
      evidencia: 'Ia',
      referencias: [5, 6, 10],
    },
    sociedadesMedicas: {
      indicacao: 'A Sociedade Brasileira de Cardiologia recomenda rastreamento sistemático para detecção de hipertensão primária e secundária [5,6,8].',
      populacaoAlvo: 'Adultos ≥ 18 anos, com foco em idosos, gestantes e crianças/adolescentes com suspeita [6,7,8,9].',
      periodicidade: 'A cada 1-2 anos para normotensos; mais frequente em populações de risco [6].',
      metodos: ['Medição da pressão arterial no consultório', 'MAPA para confirmação de hipertensão branca ou mascarada', 'MRPA para monitoramento domiciliar'],
      evidencia: 'Ia',
      referencias: [5, 6, 7, 8, 9],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência no Brasil é de aproximadamente 35% em adultos [5,6,10]. Globalmente, afeta cerca de 1,28 bilhão de adultos [10].',
    incidencia: 'Incidência anual no Brasil varia de 2-5% em adultos jovens [5,6].',
    mortalidade: 'Responsável por 13% das mortes globais; no Brasil, contribui para 300 mil óbitos anuais por DCV [10].',
    referencias: [5, 6, 10],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['8480-6', '8482-2', '55417-1', '8462-4', '35001-9'],
    ciap2: ['K86', 'K87', 'K88'],
    atc: ['C02', 'C03', 'C07', 'C08', 'C09'],
  },
  
  referencias: [
    { id: 1, citation: 'Andrade JP, et al. Position Statement on Hypertension and Spirituality. Arq Bras Cardiol. 2021;117(5):1047-1056. DOI: 10.36660/abc.20210723 PMID: 34550245', pmid: '34550245', doi: '10.36660/abc.20210723' },
    { id: 2, citation: 'Schwermann J, et al. Brazilian Position Statement on Resistant Hypertension. Arq Bras Cardiol. 2020;114(5):881-892. DOI: 10.36660/abc.20200198 PMID: 32267335', pmid: '32267335', doi: '10.36660/abc.20200198' },
    { id: 3, citation: 'Botelho S, et al. Luso-Brazilian Position Statement on Hypertensive Emergencies. Arq Bras Cardiol. 2020;114(6):1139-1150. DOI: 10.36660/abc.20190731 PMID: 32491016', pmid: '32491016', doi: '10.36660/abc.20190731' },
    { id: 4, citation: 'Botelho S, et al. Position Statement on Cardiovascular Safety of Vaccines Against COVID-19. Arq Bras Cardiol. 2022;118(4):699-708. DOI: 10.36660/abc.20220179 PMID: 35508059', pmid: '35508059', doi: '10.36660/abc.20220179' },
    { id: 5, citation: 'Sociedade Brasileira de Cardiologia. 7th Brazilian Guideline of Arterial Hypertension: Chapter 12 - Secondary Arterial Hypertension. Arq Bras Cardiol. 2016;107(3 Suppl 3):83-89. DOI: 10.5935/abc.20160162 PMID: 27819391', pmid: '27819391', doi: '10.5935/abc.20160162' },
    { id: 6, citation: 'Sociedade Brasileira de Cardiologia. 7th Brazilian Guideline of Arterial Hypertension: Chapter 2 - Diagnosis and Classification. Arq Bras Cardiol. 2016;107(3 Suppl 3):1-7. DOI: 10.5935/abc.20160152 PMID: 27819381', pmid: '27819381', doi: '10.5935/abc.20160152' },
    { id: 7, citation: 'Sociedade Brasileira de Cardiologia. 7th Brazilian Guideline of Arterial Hypertension: Chapter 9 - Arterial Hypertension in pregnancy. Arq Bras Cardiol. 2016;107(3 Suppl 3):68-75. DOI: 10.5935/abc.20160159 PMID: 27819388', pmid: '27819388', doi: '10.5935/abc.20160159' },
    { id: 8, citation: 'Sociedade Brasileira de Cardiologia. 7th Brazilian Guideline of Arterial Hypertension: Chapter 11 - Arterial Hypertension in the elderly. Arq Bras Cardiol. 2016;107(3 Suppl 3):79-82. DOI: 10.5935/abc.20160161 PMID: 27819390', pmid: '27819390', doi: '10.5935/abc.20160161' },
    { id: 9, citation: 'Sociedade Brasileira de Cardiologia. 7th Brazilian Guideline of Arterial Hypertension: Chapter 10 - Hypertension in Children and Adolescents. Arq Bras Cardiol. 2016;107(3 Suppl 3):76-78. DOI: 10.5935/abc.20160160 PMID: 27819389', pmid: '27819389', doi: '10.5935/abc.20160160' },
    { id: 10, citation: 'Sociedade Brasileira de Cardiologia. Updated Cardiovascular Prevention Guideline of the Brazilian Society of Cardiology - 2019. Arq Bras Cardiol. 2019;113(2):290-366. DOI: 10.5935/abc.20190204 PMID: 31691761', pmid: '31691761', doi: '10.5935/abc.20190204' }
  ],
}