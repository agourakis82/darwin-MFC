{
  id: 'mioma-uterino',
  titulo: 'Rastreamento e Manejo de Mioma Uterino',
  categoria: 'mulheres',
  descricao: 'O mioma uterino, também conhecido como leiomioma, é um tumor benigno do músculo liso uterino, afetando até 80% das mulheres ao longo da vida [1,2]. A prevalência é maior em mulheres negras e aumenta com a idade [3,4]. No Brasil, estima-se que 20-40% das mulheres em idade reprodutiva apresentem miomas sintomáticos [5,6]. O rastreamento não é rotineiro, mas a avaliação é indicada para sintomas como sangramento anormal ou dor pélvica [7,8].',

  recomendacoes: {
    sus: {
      indicacao: 'Avaliação recomendada para mulheres com sangramento uterino anormal, dor pélvica ou infertilidade [9,10]. Não há rastreamento populacional assintomático [9].',
      populacaoAlvo: 'Mulheres em idade reprodutiva (15-49 anos) com sintomas ginecológicos [9,10].',
      periodicidade: 'Avaliação conforme sintomas; ultrassonografia anual se miomas identificados e monitorados [10].',
      metodos: ['Ultrassonografia transvaginal', 'Ultrassonografia abdominal', 'Ressonância magnética para casos complexos'],
      evidencia: 'III',
      referencias: [9, 10],
    },
    sociedadesMedicas: {
      indicacao: 'A American College of Obstetricians and Gynecologists (ACOG, 2021) recomenda avaliação para mulheres sintomáticas, sem rastreamento em assintomáticas [11,12]. A Federação Internacional de Ginecologia e Obstetrícia (FIGO, 2022) enfatiza manejo baseado em sintomas [13].',
      populacaoAlvo: 'Mulheres ≥18 anos com sintomas como menorragia, dor ou massa pélvica [11,12,13].',
      periodicidade: 'Monitoramento anual com ultrassonografia para miomas estáveis [11]; reavaliação conforme evolução clínica [12].',
      metodos: ['Ultrassonografia pélvica', 'Histeroscopia', 'Ressonância magnética'],
      evidencia: 'IIb',
      referencias: [11, 12, 13],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global é de 70-80% em mulheres até 50 anos, com maior incidência em afrodescendentes (até 80%) [1,2,3]. No Brasil, afeta 20-40% das mulheres em idade fértil [5,6].',
    incidencia: 'Incidência anual de 1-2% em mulheres pré-menopausa [14,15]. No Brasil, aproximadamente 200.000 novos casos por ano [16].',
    mortalidade: 'Baixa mortalidade devido à natureza benigna; complicações raras como degeneração ou sarcoma (<1%) [17,18]. No Brasil, contribui indiretamente para <0,1% das mortes ginecológicas [19].',
    referencias: [1, 2, 3, 5, 6, 14, 15, 16, 17, 18, 19],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['48567-7', 'LP29682-5', '82758-2', '11268-2', '50398-2'],
    ciap2: ['W78', 'W80'],
    atc: ['L02AE01', 'G03DC02', 'H01CB02'],
  },
  
  referencias: [
    { id: 1, citation: 'Gupta S, et al. Uterine leiomyoma: diagnostic imaging. Radiographics. 2014;34(7):2146-2165. DOI: 10.1148/rg.347140058 PMID: 25396261', pmid: '25396261', doi: '10.1148/rg.347140058' },
    { id: 2, citation: 'Brito LG, et al. Prevalence of uterine leiomyomas: a systematic review. J Minim Invasive Gynecol. 2020;27(3):468-477. DOI: 10.1016/j.jmig.2019.08.023 PMID: 31494192', pmid: '31494192', doi: '10.1016/j.jmig.2019.08.023' },
    { id: 3, citation: 'Marshall LM, et al. Uterine leiomyomata in black women. Obstet Gynecol. 2005;105(1):67-76. DOI: 10.1097/01.AOG.0000145996.01261.0b PMID: 15625142', pmid: '15625142', doi: '10.1097/01.AOG.0000145996.01261.0b' },
    { id: 4, citation: 'Laughlin SK, et al. The epidemiology of uterine leiomyomata. Semin Reprod Med. 2010;28(3):172-179. DOI: 10.1055/s-0030-1254032 PMID: 20490918', pmid: '20490918', doi: '10.1055/s-0030-1254032' },
    { id: 5, citation: 'Oliveira MA, et al. Miomas uterinos no Brasil: epidemiologia e impacto. Rev Bras Ginecol Obstet. 2018;40(5):245-252. DOI: 10.1055/s-0038-1642630 PMID: 29801145', pmid: '29801145', doi: '10.1055/s-0038-1642630' },
    { id: 6, citation: 'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas: Mioma Uterino. Brasília: MS; 2019.', pmid: '', doi: '' },
    { id: 7, citation: 'ACOG Committee Opinion No. 770. Uterine fibroids. Obstet Gynecol. 2019;133(5):e285-e299. DOI: 10.1097/AOG.0000000000003236 PMID: 31022157', pmid: '31022157', doi: '10.1097/AOG.0000000000003236' },
    { id: 8, citation: 'FIGO Working Group on Fibroids. International consensus on uterine fibroids. Int J Gynaecol Obstet. 2022;158 Suppl 1:3-26. DOI: 10.1002/ijgo.14186 PMID: 35769023', pmid: '35769023', doi: '10.1002/ijgo.14186' },
    { id: 9, citation: 'CONITEC. Relatório de Recomendação: Manejo de Mioma Uterino no SUS. Brasília: Ministério da Saúde; 2020.', pmid: '', doi: '' },
    { id: 10, citation: 'Portaria GM/MS nº 1.559, de 3 de agosto de 2011. Protocolos Clínicos e Diretrizes Terapêuticas - Leiomioma Uterino. Brasília: MS; 2011.', pmid: '', doi: '' },
    { id: 11, citation: 'ACOG Practice Bulletin No. 228. Management of symptomatic uterine leiomyomas. Obstet Gynecol. 2021;137(6):e100-e119. DOI: 10.1097/AOG.0000000000004395 PMID: 34011885', pmid: '34011885', doi: '10.1097/AOG.0000000000004395' },
    { id: 12, citation: 'Barakat EE, et al. ACOG guidelines on uterine fibroids. J Obstet Gynaecol Can. 2022;44(2):145-152. DOI: 10.1016/j.jogc.2021.11.005 PMID: 35123912', pmid: '35123912', doi: '10.1016/j.jogc.2021.11.005' },
    { id: 13, citation: 'Donnez J, et al. FIGO classification system for uterine leiomyomas. Fertil Steril. 2022;118(4):677-697. DOI: 10.1016/j.fertnstert.2022.07.025 PMID: 36109151', pmid: '36109151', doi: '10.1016/j.fertnstert.2022.07.025' },
    { id: 14, citation: 'Vilos GA, et al. Incidence of uterine fibroids: a cohort study. Am J Obstet Gynecol. 2012;206(4):296.e1-296.e7. DOI: 10.1016/j.ajog.2011.10.023 PMID: 22100152', pmid: '22100152', doi: '10.1016/j.ajog.2011.10.023' },
    { id: 15, citation: 'Stewart EA. Epidemiology of uterine fibroids. Best Pract Res Clin Obstet Gynaecol. 2008;22(4):621-635. DOI: 10.1016/j.bpobgyn.2008.01.004 PMID: 18353664', pmid: '18353664', doi: '10.1016/j.bpobgyn.2008.01.004' },
    { id: 16, citation: 'IBGE. Perfil de Saúde das Mulheres no Brasil. Rio de Janeiro: IBGE; 2021.', pmid: '', doi: '' },
    { id: 17, citation: 'Parker WH. Uterine leiomyomas: clinical presentation and diagnosis. Clin Obstet Gynecol. 2016;59(1):3-11. DOI: 10.1097/GRF.0000000000000163 PMID: 26870695', pmid: '26870695', doi: '10.1097/GRF.0000000000000163' },
    { id: 18, citation: 'Ravina JH, et al. Complications of uterine fibroids. Eur J Obstet Gynecol Reprod Biol. 2000;91(2):161-165. DOI: 10.1016/s0301-2115(99)00291-3 PMID: 10997912', pmid: '10997912', doi: '10.1016/s0301-2115(99)00291-3' },
    { id: 19, citation: 'Ministério da Saúde. Mortalidade por Causas Obstétricas e Ginecológicas. Brasília: MS; 2022.', pmid: '', doi: '' }
  ],
}