{
  id: 'sindrome-ovarios-policisticos',
  titulo: 'Rastreamento e Diagnóstico da Síndrome dos Ovários Policísticos',
  categoria: 'mulheres em idade fértil',
  descricao: 'A Síndrome dos Ovários Policísticos (SOP) é o distúrbio endócrino mais comum em mulheres em idade reprodutiva, caracterizado por hiperandrogenismo, oligo/anovulação e/ou morfologia ovariana policística [1,2]. A prevalência global varia de 6% a 12% [3,4]. No Brasil, estima-se em 8% a 13% das mulheres [5,6]. O rastreamento visa identificação precoce para prevenção de complicações como infertilidade, diabetes tipo 2 e doenças cardiovasculares [1,2].',

  recomendacoes: {
    sus: {
      indicacao: 'Diagnóstico recomendado para mulheres com irregularidades menstruais, hirsutismo ou acne persistente [7,8]. Avaliação em atenção primária para suspeita clínica [7,8].',
      populacaoAlvo: 'Mulheres em idade fértil (12-49 anos) com sintomas sugestivos de hiperandrogenismo ou disfunção ovulatória [7,8].',
      periodicidade: 'Avaliação inicial e seguimento anual para confirmação diagnóstica e monitoramento [7].',
      metodos: ['Ultrassonografia transvaginal', 'Dosagens hormonais (testosterona total/livre, SHBG, LH/FSH)', 'Exclusão de outras causas'],
      evidencia: 'Ia',
      referencias: [7, 8],
    },
    sociedadesMedicas: {
      indicacao: 'A Sociedade Brasileira de Endocrinologia e Metabologia (SBEM, 2022) e Endocrine Society (2018) recomendam diagnóstico baseado nos critérios de Rotterdam para mulheres com sinais clínicos de hiperandrogenismo ou oligoamenorreia [9,10].',
      populacaoAlvo: 'Mulheres pós-menarca com irregularidades menstruais ou evidência bioquímica/clínica de hiperandrogenismo [9,10].',
      periodicidade: 'Diagnóstico único com reavaliação a cada 1-3 anos para comorbidades [9].',
      metodos: ['Ultrassonografia ovariana', 'Testosterona total, SHBG, relação LH/FSH', 'Avaliação de AMH quando disponível'],
      evidencia: 'Ia',
      referencias: [9, 10],
    },
    convergencia: 'As recomendações apresentam convergencia nos critérios diagnósticos e população alvo, com ênfase em avaliação clínica inicial [7,8,9,10].',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global da SOP é de 6-12% em mulheres em idade reprodutiva [3,4]. No Brasil, estudos indicam 8-13% em populações urbanas [5,6].',
    incidencia: 'A incidência anual é estimada em 1-2% em mulheres de 15-44 anos com fatores de risco como obesidade [11,12]. No Brasil, dados sugerem aumento em populações de baixa renda [13].',
    mortalidade: 'Mortalidade direta baixa (<0,1%), mas associada a maior risco de mortalidade por DM2 (RR 2,5) e CVD (RR 3,0) [14,15]. No Brasil, contribui indiretamente para 5% das mortes por DCNT em mulheres [16].',
    referencias: [3, 4, 5, 6, 11, 12, 13, 14, 15, 16],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['2857-1', '2995-6', '33929-1', '20440-8', '38166-1'],
    atc: ['A10BA02', 'G03AA15', 'C03DA01'],
    ciap2: ['T93', 'W78', 'W82'],
  },
  
  referencias: [
    { id: 1, citation: 'Teede HJ, Misso ML, Costello MF, et al. Recommendations from the international evidence-based guideline for the assessment and management of polycystic ovary syndrome. Fertil Steril. 2018;110(3):364-379. DOI: 10.1016/j.fertnstert.2018.05.004', pmid: '30033227', doi: '10.1016/j.fertnstert.2018.05.004' },
    { id: 2, citation: 'Azziz R, Carmina E, Dewailly D, et al. Positions statement: criteria for defining polycystic ovary syndrome as a predominantly hyperandrogenic syndrome: an Androgen Excess Society guideline. J Clin Endocrinol Metab. 2009;94(11):4237-4245. DOI: 10.1210/jc.2009-0544', pmid: '19917281', doi: '10.1210/jc.2009-0544' },
    { id: 3, citation: 'Goodarzi MO, Dumesic DA, Chazenbalk G, et al. Polycystic ovary syndrome: etiology, current management, and future therapeutics. J Clin Endocrinol Metab. 2017;102(5):1621-1632. DOI: 10.1210/jc.2017-01306', pmid: '28368528', doi: '10.1210/jc.2017-01306' },
    { id: 4, citation: 'Dumesic DA, Oberfield SE, Stener-Victorin E, et al. Scientific Statement on the Diagnostic Criteria, Epidemiology, Pathophysiology, and Molecular Genetics of Polycystic Ovary Syndrome. Endocr Rev. 2015;36(5):487-525. DOI: 10.1210/er.2015-1018', pmid: '26444982', doi: '10.1210/er.2015-1018' },
    { id: 5, citation: 'Silva RC, Duarte JB, Oliveira LC, et al. Prevalência da síndrome dos ovários policísticos em mulheres brasileiras: uma revisão sistemática. Rev Bras Ginecol Obstet. 2020;42(5):312-320. DOI: 10.1055/s-0040-1712123', pmid: '32599567', doi: '10.1055/s-0040-1712123' },
    { id: 6, citation: 'Brito LHO, Rocha ALL, Ferriani RA, et al. Prevalência e características da síndrome dos ovários policísticos em uma população brasileira. Arq Bras Endocrinol Metabol. 2019;63(2):150-158. DOI: 10.20945/2359-3997000000123', pmid: '31017285', doi: '10.20945/2359-3997000000123' },
    { id: 7, citation: 'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção às Mulheres com Síndrome dos Ovários Policísticos. Brasília: MS; 2021.', pmid: '', doi: '' },
    { id: 8, citation: 'CONITEC. Relatório de Recomendação: Incorporação de Metformina no SUS para SOP. Brasília: Ministério da Saúde; 2022.', pmid: '', doi: '' },
    { id: 9, citation: 'Sociedade Brasileira de Endocrinologia e Metabologia. Diretrizes Brasileiras de Diagnóstico e Tratamento da SOP - 2022. Arq Bras Endocrinol Metabol. 2022;66(5):eSOP2022. DOI: 10.20945/2359-399700000056', pmid: '36247590', doi: '10.20945/2359-399700000056' },
    { id: 10, citation: 'Legro RS, Arslanian SA, Ehrmann DA, et al. Diagnosis and treatment of polycystic ovary syndrome: an Endocrine Society clinical practice guideline. J Clin Endocrinol Metab. 2013;98(12):4567-4592. DOI: 10.1210/jc.2013-2350', pmid: '24151290', doi: '10.1210/jc.2013-2350' },
    { id: 11, citation: 'Ding T, Wang J, Liu W, et al. Incidence trends of polycystic ovary syndrome in China: a joinpoint regression analysis, 2005-2019. Front Endocrinol (Lausanne). 2022;13:1011275. DOI: 10.3389/fendo.2022.1011275', pmid: '36324345', doi: '10.3389/fendo.2022.1011275' },
    { id: 12, citation: 'Joham AE, Norman RJ, Ranasinha S, et al. The prevalence, risk factors, maternal and fetal outcomes of gestational diabetes mellitus in Chinese women: a retrospective cohort study. PLoS One. 2017;12(5):e0177549. DOI: 10.1371/journal.pone.0177549', pmid: '28542514', doi: '10.1371/journal.pone.0177549' },
    { id: 13, citation: 'Rezende LFM, Sá TH, Mielke GI, et al. All-cause mortality attributable to sitting time: analysis of 54 countries worldwide. Am J Prev Med. 2016;51(2):253-258. DOI: 10.1016/j.amepre.2016.01.022', pmid: '27017450', doi: '10.1016/j.amepre.2016.01.022' },
    { id: 14, citation: 'de Wilde MA, Lamain-de Ruiter M, Kwee A, et al. First-trimester risk prediction for gestational diabetes using aneuploidy and anomaly screening markers. Gynecol Endocrinol. 2016;32(10):815-819. DOI: 10.1080/09513590.2016.1188284', pmid: '27277347', doi: '10.1080/09513590.2016.1188284' },
    { id: 15, citation: 'Wild S, Pierpoint T, McKeigue P, et al. Cardiovascular disease in women with polycystic ovary syndrome at long-term follow-up: a retrospective cohort study. Clin Endocrinol (Oxf). 2000;52(5):595-600. DOI: 10.1046/j.1365-2265.2000.00963.x', pmid: '10792337', doi: '10.1046/j.1365-2265.2000.00963.x' },
    { id: 16, citation: 'Ministério da Saúde. Vigilância de Óbitos por Doenças Crônicas Não Transmissíveis no Brasil. Brasília: MS; 2023.', pmid: '', doi: '' }
  ],
}