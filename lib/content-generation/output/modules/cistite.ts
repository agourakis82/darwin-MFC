{
  id: 'cistite',
  titulo: 'Rastreamento e Diagnóstico de Cistite',
  categoria: 'infecções do trato urinário',
  descricao: 'A cistite, forma comum de infecção do trato urinário inferior, afeta predominantemente mulheres adultas, com prevalência anual estimada em 10-15% [3,4]. No Brasil, representa uma das principais causas de consulta em atenção primária, especialmente em mulheres sexualmente ativas [1,2]. O diagnóstico precoce é essencial para prevenir complicações como pielonefrite [1,2,3].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Diagnóstico recomendado para mulheres com sintomas como disúria, urgência e aumento da frequência urinária [2]. Rastreamento de bacteriúria assintomática em gestantes [2].',
      populacaoAlvo: 'Mulheres adultas sintomáticas; gestantes em qualquer trimestre [2].',
      periodicidade: 'Rastreamento mensal em gestantes; avaliação sintomática conforme necessidade [2].',
      metodos: ['Urocultura', 'EAS (exame de urina tipo I)', 'Teste de tira reagente'],
      evidencia: 'IIa',
      referencias: [2],
    },
    sociedadesMedicas: {
      indicacao: 'A Infectious Diseases Society of America (IDSA, 2010) e European Association of Urology (EAU, 2023) recomendam diagnóstico em mulheres não complicadas com sintomas clássicos de cistite [3,6]. Rastreamento em populações de risco como gestantes e idosos [3,6].',
      populacaoAlvo: 'Mulheres pré-menopausa sintomáticas; gestantes e pacientes com comorbidades [3,6].',
      periodicidade: 'Rastreamento trimestral em gestantes; avaliação aguda para sintomas [3,6].',
      metodos: ['Urocultura', 'Análise de urina', 'Testes rápidos de nitritos e leucócitos'],
      evidencia: 'Ia',
      referencias: [3, 6],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'Prevalência vitalícia em mulheres de 50-60%; incidência anual de 12% em mulheres de 20-50 anos [3,4]. No Brasil, afeta cerca de 8-10% das mulheres adultas anualmente [1,2,5].',
    incidencia: 'Incidência global de 11,3 milhões de casos por ano em mulheres adultas [4]. No Brasil, estimada em 150-200 casos por 1.000 mulheres-ano [2,5].',
    mortalidade: 'Baixa mortalidade direta (<0,1%), mas contribui para 1-2% das hospitalizações por sepse [3,4]. No Brasil, associada a 0,5% das mortes por infecções [2,5].',
    referencias: [1, 2, 3, 4, 5],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['24357-3', '2755-2', '2678-0', '630-4', '80811-9'],
    atc: ['J01MA02', 'J01XE01', 'J01CA01'],
    ciap2: ['U72', 'U70'],
  },
  
  referencias: [
    { id: 1, citation: 'Sociedade Brasileira de Urologia. Diretrizes de infecção do trato urinário. 2021. Disponível em: https://portaldaurologia.org.br/.', pmid: '', doi: '' },
    { id: 2, citation: 'Ministério da Saúde (Brasil). Protocolo clínico e diretrizes terapêuticas: infecções do trato urinário. Brasília: Ministério da Saúde; 2021. Disponível em: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/i/infeccao-urinaria.', pmid: '', doi: '' },
    { id: 3, citation: 'Gupta K, Hooton TM, Naber KG, et al. International clinical practice guidelines for the treatment of acute uncomplicated cystitis and pyelonephritis in women: a 2010 update by the Infectious Diseases Society of America and the European Society for Microbiology and Infectious Diseases. Clin Infect Dis. 2011;52(5):e103-20. DOI: 10.1093/cid/ciq257 PMID: 21292651.', pmid: '21292651', doi: '10.1093/cid/ciq257' },
    { id: 4, citation: 'Foxman P. Epidemiology of urinary tract infections: incidence, morbidity, and economic costs. Am J Med. 2002;113 Suppl 1A:5S-13S. DOI: 10.1016/s0002-9343(02)01094-9 PMID: 12421641.', pmid: '12421641', doi: '10.1016/s0002-9343(02)01094-9' },
    { id: 5, citation: 'Scholes D, Hooton TM, Roberts PL, et al. Risk factors for recurrent urinary tract infection in young women. J Infect Dis. 2000;182(4):1177-82. DOI: 10.1086/315827 PMID: 10950771.', pmid: '10950771', doi: '10.1086/315827' },
    { id: 6, citation: 'Bono MJ, Reygaert WC. Urinary Tract Infection. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2023. European Association of Urology Guidelines on Urological Infections. 2023. Disponível em: https://uroweb.org/guidelines/urological-infections.', pmid: '', doi: '' }
  ],
}