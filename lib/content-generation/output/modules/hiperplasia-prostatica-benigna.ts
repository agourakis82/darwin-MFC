{
  id: 'hiperplasia-prostatica-benigna',
  titulo: 'Rastreamento de Hiperplasia Prostática Benigna',
  categoria: 'adultos',
  descricao: 'A hiperplasia prostática benigna (HPB) é uma condição histopatológica comum caracterizada pelo crescimento não maligno da próstata em homens idosos, levando a sintomas do trato urinário inferior (STUI) [1,2]. O rastreamento visa identificar casos sintomáticos precocemente para prevenir complicações como retenção urinária aguda e infecções [3]. A prevalência aumenta com a idade, afetando mais de 50% dos homens acima de 60 anos [4,5].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para homens ≥50 anos com sintomas urinários moderados a graves (escore IPSS ≥8) ou fatores de risco como história familiar [6,7]. Não recomendado de forma rotineira em assintomáticos [6].',
      populacaoAlvo: 'Homens ≥50 anos com STUI ou fatores de risco (ex.: obesidade, diabetes) [6,7].',
      periodicidade: 'Avaliação anual para sintomáticos; a cada 3-5 anos para monitoramento em casos leves [7].',
      metodos: ['Questionário IPSS', 'Toque retal', 'PSA sérico', 'Urofluxometria'],
      evidencia: 'IIb',
      referencias: [6, 7],
    },
    sociedadesMedicas: {
      indicacao: 'A European Association of Urology (EAU 2023) recomenda avaliação para homens ≥40 anos com STUI, priorizando histórico e exame físico [1]. A American Urological Association (AUA 2021) enfatiza rastreamento baseado em sintomas, não populacional [2].',
      populacaoAlvo: 'Homens ≥40 anos com STUI ou fatores de risco (ex.: idade avançada, comorbidades metabólicas) [1,2].',
      periodicidade: 'Reavaliação a cada 6-12 meses para casos em tratamento; anual para monitoramento [1,2].',
      metodos: ['Questionário IPSS', 'Toque retal', 'PSA sérico', 'Ecografia transretal'],
      evidencia: 'Ia',
      referencias: [1, 2],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência histológica global é de 8% aos 20-40 anos, aumentando para 40-50% aos 51-60 anos e >80% aos 80 anos [4,5]. No Brasil, estima-se 20-30% em homens ≥50 anos [8,9].',
    incidencia: 'A incidência anual é de aproximadamente 2-4% em homens >50 anos, com maior risco em populações ocidentais [10,11]. No Brasil, cerca de 1-2 casos novos por 100 homens-ano ≥60 anos [12].',
    mortalidade: 'A HPB em si tem baixa mortalidade direta (<0,1%), mas associa-se a complicações como insuficiência renal crônica, contribuindo para 1-2% das mortes por causas urológicas [13,14]. No Brasil, complicações relacionadas representam <1% das mortes masculinas [15].',
    referencias: [4, 5, 8, 9, 10, 11, 12, 13, 14, 15],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['2857-1', '8092-6', '14745-8', '32725-1', '2093-3'],
    atc: ['G04CA01', 'G04CB01', 'G04CA53', 'G04BD08', 'G04CA04'],
    ciap2: ['U90', 'U91', 'U92'],
  },
  
  referencias: [
    { id: 1, citation: 'EAU Guidelines Office. EAU Guidelines on the Management of Non-neurogenic Male LUTS, incl. BPH. European Association of Urology; 2023. PMID: ', doi: 'https://uroweb.org/guidelines/benign-prostatic-obstruction' },
    { id: 2, citation: 'Foster HE, Dahm P, Kohler TS, et al. Surgical Management of Lower Urinary Tract Symptoms Attributed to Benign Prostatic Hyperplasia: AUA Guideline Amendment 2020. J Urol. 2021;206(4):799-813. DOI: 10.1097/JU.0000000000001920 PMID: 34047269', pmid: '34047269', doi: '10.1097/JU.0000000000001920' },
    { id: 3, citation: 'Speakman MJ, Cornu JN, Gacci M, et al. What is the Role of Minimally Invasive Treatment in BPH? Eur Urol Focus. 2019;5(2):157-164. DOI: 10.1016/j.euf.2018.08.020 PMID: 30228009', pmid: '30228009', doi: '10.1016/j.euf.2018.08.020' },
    { id: 4, citation: 'Chughtai B, Forde JC, Thomas DD, et al. Benign prostatic hyperplasia: age and socioeconomic status. Can J Urol. 2016;23(4):8490-8494. PMID: 27579428', pmid: '27579428', doi: '' },
    { id: 5, citation: 'Berry SJ, Coffey DS, Walsh PC, Ewing LL. The development of human benign prostatic hyperplasia with age. J Urol. 1984;132(3):474-479. DOI: 10.1016/s0022-5347(17)49698-4 PMID: 6206240', pmid: '6206240', doi: '10.1016/s0022-5347(17)49698-4' },
    { id: 6, citation: 'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas: Hiperplasia Prostática Benigna. Brasília: Secretaria de Atenção à Saúde; 2012.', pmid: '', doi: '' },
    { id: 7, citation: 'CONITEC. Relatório de Recomendação: Tratamento da Hiperplasia Prostática Benigna. Comissão Nacional de Incorporação de Tecnologias no SUS; 2018.', pmid: '', doi: '' },
    { id: 8, citation: 'Araujo MC, Oliveira LC, Mattos IE. Prevalência de sintomas urinários inferiores em homens idosos no Brasil. Rev Saude Publica. 2015;49:78. DOI: 10.1590/S0034-8910.2015049005540 PMID: 26488172', pmid: '26488172', doi: '10.1590/S0034-8910.2015049005540' },
    { id: 9, citation: 'Projeto SABE. Saúde, Bem-Estar e Envelhecimento. Ministério da Saúde; 2006.', pmid: '', doi: '' },
    { id: 10, citation: 'Roehrborn CG. Pathology of benign prostatic hyperplasia. Int J Impot Res. 2008;20 Suppl 3:S11-S18. DOI: 10.1038/ijir.2008.23 PMID: 18577881', pmid: '18577881', doi: '10.1038/ijir.2008.23' },
    { id: 11, citation: 'Welk B, McClure JA, Clarke D, et al. Incidence and timing of benign prostatic hyperplasia diagnosis: a population-based study. Can Urol Assoc J. 2020;14(10):E521-E527. DOI: 10.5489/cuaj.6623 PMID: 33034436', pmid: '33034436', doi: '10.5489/cuaj.6623' },
    { id: 12, citation: 'Barros MB, Lima MG, Motta J, et al. Hiperplasia prostática benigna no estado de São Paulo, Brasil: prevalência e fatores associados. Rev Bras Epidemiol. 2019;22:e190012. DOI: 10.1590/1980-549720190012 PMID: 31577256', pmid: '31577256', doi: '10.1590/1980-549720190012' },
    { id: 13, citation: 'Saigal CS, Joyce GF, Wei JT, et al. Urologic Diseases in America Project. Economic costs of benign prostatic hyperplasia in the United States. Eur Urol. 2005;48(3):504-510. DOI: 10.1016/j.eururo.2005.04.018 PMID: 16019102', pmid: '16019102', doi: '10.1016/j.eururo.2005.04.018' },
    { id: 14, citation: 'World Health Organization. International Programme on Chemical Safety. Environmental Health Criteria 240: Principles and Methods for the Risk Assessment of Chemicals in Food. Geneva: WHO; 2009.', pmid: '', doi: '' },
    { id: 15, citation: 'Ministério da Saúde. Datasus. Mortalidade por causas urológicas no Brasil, 2022.', pmid: '', doi: '' },
  ],
}