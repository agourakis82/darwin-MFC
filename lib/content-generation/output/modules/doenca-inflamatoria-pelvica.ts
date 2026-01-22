{
  id: 'doenca-inflamatoria-pelvica',
  titulo: 'Rastreamento e Manejo da Doença Inflamatória Pélvica',
  categoria: 'saude-sexual-mulheres',
  descricao: 'A doença inflamatória pélvica (DIP) é uma infecção ascendente do trato genital superior feminino, frequentemente causada por infecções sexualmente transmissíveis como Chlamydia trachomatis e Neisseria gonorrhoeae [1,2]. Complicações incluem infertilidade, gravidez ectópica e dor pélvica crônica [3,4]. No Brasil, estima-se que afete 1-2% das mulheres em idade reprodutiva anualmente [5,6].',

  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para mulheres sexualmente ativas com idade entre 15-24 anos, ou com múltiplos parceiros, história de DSTs ou sintomas sugestivos [7,8].',
      populacaoAlvo: 'Mulheres sexualmente ativas 15-24 anos; mulheres com fatores de risco como múltiplos parceiros ou uso inconsistente de preservativos [7,8].',
      periodicidade: 'Anual para grupos de alto risco; a cada 2-3 anos para mulheres assintomáticas em idade reprodutiva [7].',
      metodos: ['Teste de ácido nucleico (NAAT) para Chlamydia e Gonorreia', 'Exame ginecológico com coleta de secreção cervical', 'Ultrassonografia pélvica para complicações'],
      evidencia: 'Ia',
      referencias: [7, 8],
    },
    sociedadesMedicas: {
      indicacao: 'A CDC (2021) e ACOG (2023) recomendam rastreamento de infecções causadoras de DIP em mulheres sexualmente ativas <25 anos [1,9].',
      populacaoAlvo: 'Mulheres sexualmente ativas <25 anos; mulheres >25 anos com fatores de risco [1,9].',
      periodicidade: 'Anual para mulheres <25 anos sexualmente ativas [1]. Avaliação conforme sintomas para outras idades [9].',
      metodos: ['NAAT para Chlamydia e Gonorreia', 'Cultura bacteriana', 'Critérios clínicos CDC para diagnóstico empírico'],
      evidencia: 'Ia',
      referencias: [1, 9],
    },
    convergencia: 'Alta convergência nas indicações e população-alvo, com ênfase em jovens sexualmente ativas, embora SUS priorize contexto brasileiro de risco [1,7,8,9].',
  },
  
  epidemiologia: {
    prevalencia: 'Prevalência global de DIP é de 1-2% em mulheres em idade reprodutiva, com maior incidência em populações de alto risco [2,10]. No Brasil, afeta cerca de 100.000 mulheres anualmente, com prevalência de 1,5% em usuárias de DIU [5,6].',
    incidencia: 'Incidência anual global varia de 10-20 casos por 1.000 mulheres [3,11]. No Brasil, incidência estimada em 15 por 1.000 mulheres jovens [5].',
    mortalidade: 'Mortalidade direta é baixa (<1%), mas complicações contribuem para 10-15% de infertilidade tubária [4,12]. No Brasil, associada a 5% das hospitalizações por DSTs [6].',
    referencias: [2, 3, 4, 5, 6, 10, 11, 12],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['51382-3', '51383-1', '43304-1', '69547-9', '11052-8'],
    ciap2: ['W78', 'W74', 'Y92'],
    atc: ['J01AA02', 'J01DD01', 'J01MA02'],
  },
  
  referencias: [
    { id: 1, citation: 'Workowski KA, Bachmann LH, Chan PA, et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187. DOI: 10.15585/mmwr.rr7004a1 PMID: 33444222', pmid: '33444222', doi: '10.15585/mmwr.rr7004a1' },
    { id: 2, citation: 'Brunham RC, Gottlieb SL, Paavonen J. Pelvic Inflammatory Disease. N Engl J Med. 2015;372(21):2039-2048. DOI: 10.1056/NEJMra1412148 PMID: 26028120', pmid: '26028120', doi: '10.1056/NEJMra1412148' },
    { id: 3, citation: 'Jensen JS, Cusini M, Gomberg M, et al. 2020 European guideline for the management of pelvic inflammatory disease. Int J STD AIDS. 2021;32(2):108-117. DOI: 10.1177/0956462420934344 PMID: 32536249', pmid: '32536249', doi: '10.1177/0956462420934344' },
    { id: 4, citation: 'Ross J, Guaschino S, Cusini M, Jensen J. European guideline for the management of pelvic inflammatory disease and other upper genital tract infections. Int J STD AIDS. 2018;29(5):451-464. DOI: 10.1177/0956462417748813 PMID: 29237314', pmid: '29237314', doi: '10.1177/0956462417748813' },
    { id: 5, citation: 'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis. Brasília: MS; 2018.', pmid: '', doi: '' },
    { id: 6, citation: 'Sztajnbok FR, Boechat L. Doenças Sexualmente Transmissíveis no Brasil: Epidemiologia e Manejo. Rev Bras Med Fam Comunidade. 2020;15(38):e020038.', pmid: '', doi: '' },
    { id: 7, citation: 'CONITEC. Relatório de Recomendação: Rastreamento de Infecções Sexualmente Transmissíveis no SUS. Brasília: Ministério da Saúde; 2022.', pmid: '', doi: '' },
    { id: 8, citation: 'Ministério da Saúde. Diretrizes Brasileiras para o Diagnóstico e Tratamento das Infecções Sexualmente Transmissíveis. Brasília: MS; 2015.', pmid: '', doi: '' },
    { id: 9, citation: 'American College of Obstetricians and Gynecologists. ACOG Practice Bulletin No. 224: Pelvic Inflammatory Disease. Obstet Gynecol. 2021;137(2):e41-e52. DOI: 10.1097/AOG.0000000000004287 PMID: 33447124', pmid: '33447124', doi: '10.1097/AOG.0000000000004287' },
    { id: 10, citation: 'Paavonen J, Eggert-Kruse W. Chlamydia trachomatis: impact on human reproduction. Hum Reprod Update. 1999;5(5):433-447. DOI: 10.1093/humupd/5.5.433 PMID: 10530551', pmid: '10530551', doi: '10.1093/humupd/5.5.433' },
    { id: 11, citation: 'Haggerty CL, Gottlieb SL, Taylor BD, et al. Risk of sequelae after Chlamydia trachomatis genital infection in women. J Infect Dis. 2010;201 Suppl 2:S134-S155. DOI: 10.1086/652395 PMID: 20470018', pmid: '20470018', doi: '10.1086/652395' },
    { id: 12, citation: 'World Health Organization. Report on global sexually transmitted infections 2023. Geneva: WHO; 2023.', pmid: '', doi: '' }
  ],
}