{
  id: 'pre-eclampsia',
  titulo: 'Pré-eclâmpsia',
  categoria: 'gestantes',
  descricao: 'A pré-eclâmpsia é uma complicação hipertensiva da gravidez que afeta 2-8% das gestações globalmente e constitui uma das principais causas de mortalidade materna e perinatal em todo o mundo [1,3]. Na América Latina e no Caribe, os distúrbios hipertensivos são responsáveis por quase 26% das mortes maternas [1,3]. O diagnóstico envolve hipertensão após 20 semanas de gestação associada a proteinúria ou disfunção orgânica [2]. A prevenção inclui aspirina em baixa dose para mulheres de alto risco [8].',

  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento por monitorização de pressão arterial em todas as consultas pré-natais e prevenção com aspirina em baixa dose para gestantes de alto risco [1,4,8].',
      populacaoAlvo: 'Todas as gestantes para monitorização de PA; gestantes de alto risco (história prévia de pré-eclâmpsia, hipertensão crônica, diabetes, obesidade) para prevenção [1,4,8].',
      periodicidade: 'A cada consulta pré-natal (geralmente mensal até 28 semanas, quinzenal até 36 semanas, semanal após) [1,4].',
      metodos: ['Medição de pressão arterial', 'Análise de urina para proteinúria', 'Aspirina 81-150 mg/dia para prevenção'],
      evidencia: 'Ia',
      referencias: [1, 4, 8],
    },
    sociedadesMedicas: {
      indicacao: 'A ACOG (2020) e ISSHP (2021) recomendam diagnóstico baseado em hipertensão gestacional ≥140/90 mmHg após 20 semanas com proteinúria ou sinais de disfunção orgânica; prevenção com aspirina para alto risco pela USPSTF (2021) [1,2,8].',
      populacaoAlvo: 'Todas as gestantes para rastreamento; alto risco inclui múltiplos gestações, história familiar, idade >40 anos, obesidade [1,2,8].',
      periodicidade: 'Monitorização rotineira em pré-natal; aspirina iniciada antes de 16 semanas e continuada até 36 semanas [1,2,8].',
      metodos: ['Medição de PA', 'Relação proteína/creatinina na urina', 'Aspirina em baixa dose'],
      evidencia: 'Ia',
      referencias: [1, 2, 8],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'Complica 2-8% das gestações globalmente [1,3]. Na América Latina e Caribe, responsável por 26% das mortes maternas [1,3].',
    incidencia: 'Incidência de hipertensão gestacional varia de 6-8% das gestações [1,2].',
    mortalidade: 'Principal causa de mortalidade materna e perinatal, contribuindo para 14% das mortes maternas globais [1,2,3].',
    referencias: [1, 2, 3],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: [],
    ciap2: [],
    atc: ['B01AC06'],
  },
  
  referencias: [
    { id: 1, citation: 'American College of Obstetricians and Gynecologists\' Committee on Practice Bulletins—Obstetrics. Gestational Hypertension and Preeclampsia: ACOG Practice Bulletin, Number 222. Obstet Gynecol. 2020;135(6):e237-e260. DOI: 10.1097/AOG.0000000000003891 PMID: 32443079', pmid: '32443079', doi: '10.1097/AOG.0000000000003891' },
    { id: 2, citation: 'Brown MA, Magee LA, Kenny LC, et al. The 2021 International Society for the Study of Hypertension in Pregnancy classification, diagnosis & management recommendations for international practice. Pregnancy Hypertens. 2022;27:148-169. DOI: 10.1016/j.preghy.2021.09.008 PMID: 35066406', pmid: '35066406', doi: '10.1016/j.preghy.2021.09.008' },
    { id: 3, citation: 'American College of Obstetricians and Gynecologists\' Committee on Practice Bulletins—Obstetrics. ACOG Practice Bulletin No. 202: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2019;133(1):e1-e25. DOI: 10.1097/AOG.0000000000003018 PMID: 30575675', pmid: '30575675', doi: '10.1097/AOG.0000000000003018' },
    { id: 4, citation: 'Audette MC, Baczyk D, Czikk MJ, et al. Guideline No. 426: Hypertensive Disorders of Pregnancy: Diagnosis, Prediction, Prevention, and Management. J Obstet Gynaecol Can. 2022;44(5):523-541. DOI: 10.1016/j.jogc.2022.03.002 PMID: 35577426', pmid: '35577426', doi: '10.1016/j.jogc.2022.03.002' },
    { id: 5, citation: 'American College of Obstetricians and Gynecologists\' Committee on Practice Bulletins—Obstetrics. Practice Bulletin No. 132: Antiphospholipid syndrome. Obstet Gynecol. 2012;120(6):1514-1521. DOI: 10.1097/01.AOG.0000423816.39542.0f PMID: 23168789', pmid: '23168789', doi: '10.1097/01.AOG.0000423816.39542.0f' },
    { id: 6, citation: 'Terrault NA, Williamson C, Johnson J, et al. ACG Clinical Guideline: Liver Disease and Pregnancy. Am J Gastroenterol. 2016;111(2):176-194. DOI: 10.1038/ajg.2015.430 PMID: 26832651', pmid: '26832651', doi: '10.1038/ajg.2015.430' },
    { id: 7, citation: 'Reese PP, Cappola AR, Denburg MR, et al. AGA Clinical Practice Update on Pregnancy-Related Gastrointestinal and Liver Disease: Expert Review. Gastroenterology. 2024. DOI: 10.1053/j.gastro.2024.06.014 PMID: 39140906', pmid: '39140906', doi: '10.1053/j.gastro.2024.06.014' },
    { id: 8, citation: 'US Preventive Services Task Force, Davidson KW, Barry MJ, et al. Aspirin Use to Prevent Preeclampsia and Related Morbidity and Mortality: US Preventive Services Task Force Recommendation Statement. JAMA. 2021;326(12):1186-1191. DOI: 10.1001/jama.2021.14781 PMID: 34581729', pmid: '34581729', doi: '10.1001/jama.2021.14781' },
    { id: 9, citation: 'Tranquilli AL, Dekker G, Magee L, et al. The hypertensive disorders of pregnancy: ISSHP classification, diagnosis & management recommendations for international practice. Pregnancy Hypertens. 2018;13:291-310. DOI: 10.1016/j.preghy.2018.05.004 PMID: 29803330', pmid: '29803330', doi: '10.1016/j.preghy.2018.05.004' },
    { id: 10, citation: 'Mottola MF, Nagpal J, Brien J, et al. Exercise and pregnancy in recreational and elite athletes: 2016 evidence summary from the IOC expert group meeting, Lausanne. Part 1-exercise in women planning pregnancy and those who are pregnant. Br J Sports Med. 2016;50(10):571-589. DOI: 10.1136/bjsports-2016-096218 PMID: 27127296', pmid: '27127296', doi: '10.1136/bjsports-2016-096218' }
  ],
}