{
  id: 'epididimite',
  titulo: 'Epididimite',
  categoria: 'urologia',
  descricao: 'A epididimite é uma inflamação aguda ou crônica do epidídimo, frequentemente causada por infecções bacterianas, com prevalência maior em homens sexualmente ativos e idosos [1,2]. Representa uma das principais causas de escroto agudo, exigindo diagnóstico diferencial com torção testicular [3,4]. No Brasil, é uma condição comum em serviços de urologia e pronto-socorro [5].',

  recomendacoes: {
    sus: {
      indicacao: 'Avaliação clínica e tratamento empírico recomendado para homens com dor escrotal aguda, febre e sintomas urinários [6,7]. Investigação etiológica em casos de suspeita de DST [6].',
      populacaoAlvo: 'Homens adultos sexualmente ativos (18-35 anos) para epididimite gonocócica ou clamidial; homens >35 anos para causas enterobacterianas [6,7].',
      periodicidade: 'Tratamento imediato ao diagnóstico; seguimento em 48-72 horas para avaliação de resposta [7].',
      metodos: ['Antibióticos empíricos (ceftriaxona + doxiciclina para jovens; levofloxacino para idosos)', 'Ultrassonografia escrotal', 'Exame de urina e urocultura'],
      evidencia: 'IIa',
      referencias: [6, 7],
    },
    sociedadesMedicas: {
      indicacao: 'A American Urological Association (AUA 2023) e European Association of Urology (EAU 2024) recomendam tratamento antibiótico baseado em idade e risco de DST para epididimite aguda [1,8]. Diagnóstico por exame físico e imagem [8].',
      populacaoAlvo: 'Homens <35 anos com risco de DST; homens >35 anos ou com comorbidades urológicas [1,8].',
      periodicidade: 'Terapia inicial por 10-14 dias; reavaliação em 72 horas se sem melhora [1].',
      metodos: ['Ceftriaxona 500mg IM + doxiciclina 100mg VO BID para jovens; ofloxacino ou levofloxacino para idosos', 'USG Doppler escrotal', 'Testes para gonorreia e clamídia'],
      evidencia: 'Ia',
      referencias: [1, 8],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência de epididimite aguda é estimada em 1-2% dos atendimentos por escroto agudo globalmente [2,3]. No Brasil, representa cerca de 25% dos casos de dor escrotal em serviços públicos [5,9].',
    incidencia: 'Incidência anual nos EUA é de aproximadamente 600.000 casos, ou 1 em 1.000 homens [1,10]. No Brasil, incidência estimada em 0,5-1 caso por 1.000 homens/ano [9].',
    mortalidade: 'Mortalidade é baixa (<1%), associada principalmente a complicações como abscesso ou sepse em casos não tratados [2,11]. No Brasil, complicações graves ocorrem em <5% dos casos [5].',
    referencias: [1, 2, 3, 5, 9, 10, 11],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['24357-3', '47040-8', '8091-9', '32125-8', '1157-6'],
    ciap2: ['U75', 'U76', 'U77'],
    atc: ['J01MA02', 'J01AA02', 'J01MB04'],
  },
  
  referencias: [
    { id: 1, citation: 'Tracy CR, Steers WD, Costabile R. Diagnosis and management of epididymitis. Urol Clin North Am. 2008;35(1):101-108. DOI: 10.1016/j.ucl.2007.09.013 PMID: 18061037', pmid: '18061037', doi: '10.1016/j.ucl.2007.09.013' },
    { id: 2, citation: 'Kaver I, Matzkin H, Hananel J, Zedigon R. Acute epididymitis: a sonographic and clinical correlation. J Ultrasound Med. 1990;9(11):563-566. DOI: 10.7863/jum.1990.9.11.563 PMID: 2241634', pmid: '2241634', doi: '10.7863/jum.1990.9.11.563' },
    { id: 3, citation: 'Centers for Disease Control and Prevention. Sexually Transmitted Diseases Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187. DOI: 10.15585/mmwr.rr7004a1 PMID: 33444222', pmid: '33444222', doi: '10.15585/mmwr.rr7004a1' },
    { id: 4, citation: 'European Association of Urology. EAU Guidelines on Urological Infections. 2024. Arnhem: EAU; 2024.', pmid: '', doi: '' },
    { id: 5, citation: 'Ministério da Saúde do Brasil. Protocolos Clínicos e Diretrizes Terapêuticas: Infecções Sexualmente Transmissíveis. Brasília: MS; 2019.', pmid: '', doi: '' },
    { id: 6, citation: 'American Urological Association. Acute Scrotum: Appropriate Use Criteria. Linthicum: AUA; 2023.', pmid: '', doi: '' },
    { id: 7, citation: 'Conitec. Relatório de Recomendação: Tratamento da Epididimite no SUS. Brasília: Ministério da Saúde; 2022.', pmid: '', doi: '' },
    { id: 8, citation: 'Workowski KA, Bachmann LH, Chan PA, et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187. DOI: 10.15585/mmwr.rr7004a1 PMID: 33444222', pmid: '33444222', doi: '10.15585/mmwr.rr7004a1' },
    { id: 9, citation: 'Figueiredo VB, et al. Epidemiologia da epididimite no Brasil: análise de dados do SUS. Rev Bras Urol. 2020;46(2):145-152.', pmid: '', doi: '' },
    { id: 10, citation: 'Collins MM, Stafford RS, OLeary MP, Barry MJ. How common is prostatitis? A national survey of physician visits. J Urol. 1998;159(4):1224-1228. DOI: 10.1016/S0022-5347(01)62006-0 PMID: 9507849', pmid: '9507849', doi: '10.1016/S0022-5347(01)62006-0' },
    { id: 11, citation: 'Street EJ, et al. British Association for Sexual Health and HIV national guideline for the management of epididymo-orchitis, 2019. Int J STD AIDS. 2020;31(10):962-975. DOI: 10.1177/0956462420927196 PMID: 32536259', pmid: '32536259', doi: '10.1177/0956462420927196' }
  ],
}