{
  id: 'endometriose',
  titulo: 'Diagnóstico e Manejo da Endometriose',
  categoria: 'ginecologia',
  descricao: 'A endometriose é uma condição ginecológica crônica caracterizada pela presença de tecido endometrial fora do útero, afetando aproximadamente 10% das mulheres em idade reprodutiva [5]. Ela está associada a dor pélvica, infertilidade e impacto na qualidade de vida [1,7]. O diagnóstico precoce é essencial para o manejo adequado, embora não haja rastreamento populacional rotineiro devido à ausência de testes simples e custo-efetivos [6]. No Brasil, o manejo segue protocolos baseados em diretrizes internacionais adaptadas ao SUS [5,10].',

  recomendacoes: {
    sus: {
      indicacao: 'Indicação para avaliação diagnóstica em mulheres com dor pélvica crônica, dismenorreia intensa ou infertilidade sem causa aparente [5,6]. Não recomendado rastreamento assintomático no SUS devido à baixa prevalência e custo-benefício [6].',
      populacaoAlvo: 'Mulheres em idade fértil (15-49 anos) com sintomas sugestivos, incluindo adolescentes com dor incapacitante [2,5].',
      periodicidade: 'Avaliação clínica inicial e follow-up anual para casos confirmados; exames de imagem sob demanda [3,4].',
      metodos: ['Exame pélvico clínico', 'Ultrassonografia transvaginal', 'Ressonância magnética para casos profundos'],
      evidencia: 'IIa',
      referencias: [2,3,5,6],
    },
    sociedadesMedicas: {
      indicacao: 'A CNGOF-HAS recomenda diagnóstico baseado em história clínica e imagem não invasiva para endometriose profunda [4,6]. Indicação para preservação de fertilidade em casos de risco de falência ovariana prematura [1]. Consenso internacional (ISUOG, EEL, ESGE, ESHRE) enfatiza técnicas de imagem para classificação [4].',
      populacaoAlvo: 'Mulheres sintomáticas, incluindo adolescentes com endometriose dolorosa e casos de infertilidade associada a lesões profundas [2,7].',
      periodicidade: 'Avaliação diagnóstica imediata para sintomas; monitoramento cirúrgico ou médico a cada 6-12 meses [8,10].',
      metodos: ['Ultrassonografia com protocolo IDEA', 'Ressonância magnética', 'Laparoscopia diagnóstica em casos inconclusivos'],
      evidencia: 'Ia',
      referencias: [1,2,4,6,7,10],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'Prevalência estimada em 5-10% das mulheres em idade reprodutiva globalmente; subdiagnosticada em até 5% dos casos extragenitais [5,8]. No Brasil, dados semelhantes, com maior impacto em populações urbanas [5].',
    incidencia: 'Incidência anual de 0,1-0,2% em mulheres férteis; maior em casos de infertilidade (30-50% das afetadas) [7].',
    mortalidade: 'Baixa mortalidade direta (<0,1%), mas associada a complicações como infertilidade e dor crônica; não é causa principal de óbito [5,9].',
    referencias: [5,7,8],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: [],
    atc: [],
    ciap2: [],
  },
  
  referencias: [
    { id: 1, citation: 'Donnez J, et al. Endometriosis and fertility preservation: CNGOF-HAS Endometriosis Guidelines. Gynecologie, obstetrique, fertilite & senologie. 2018;46(4):320-327. DOI: 10.1016/j.gofs.2018.02.010 PMID: 29530556', pmid: '29530556', doi: '10.1016/j.gofs.2018.02.010' },
    { id: 2, citation: 'Donnez J, et al. Management of painful endometriosis in adolescents: CNGOF-HAS Endometriosis Guidelines. Gynecologie, obstetrique, fertilite & senologie. 2018;46(4):328-334. DOI: 10.1016/j.gofs.2018.02.029 PMID: 29519595', pmid: '29519595', doi: '10.1016/j.gofs.2018.02.029' },
    { id: 3, citation: 'Querleu D, et al. Pelvic exam in gynecology and obstetrics: Guidelines for clinical practice. Gynecologie, obstetrique, fertilite & senologie. 2023;51(6S):S20-S28. DOI: 10.1016/j.gofs.2023.04.001 PMID: 37258002', pmid: '37258002', doi: '10.1016/j.gofs.2023.04.001' },
    { id: 4, citation: 'Leonardi M, et al. Non-Invasive Imaging Techniques for Diagnosis of Pelvic Deep Endometriosis and Endometriosis Classification Systems: An International Consensus Statement. Journal of minimally invasive gynecology. 2024;31(8):645-661. DOI: 10.1016/j.jmig.2024.04.006 PMID: 38819341', pmid: '38819341', doi: '10.1016/j.jmig.2024.04.006' },
    { id: 5, citation: 'Chapron C, et al. Epidemiology and diagnosis strategy: CNGOF-HAS Endometriosis Guidelines. Gynecologie, obstetrique, fertilite & senologie. 2018;46(4):280-287. DOI: 10.1016/j.gofs.2018.02.012 PMID: 29548620', pmid: '29548620', doi: '10.1016/j.gofs.2018.02.012' },
    { id: 6, citation: 'Borghese B, et al. Diagnostic strategies for endometriosis: CNGOF-HAS Endometriosis Guidelines. Gynecologie, obstetrique, fertilite & senologie. 2018;46(4):269-273. DOI: 10.1016/j.gofs.2018.02.008 PMID: 29514767', pmid: '29514767', doi: '10.1016/j.gofs.2018.02.008' },
    { id: 7, citation: 'Mathias M, et al. Deeply infiltrating endometriosis and infertility: CNGOF-HAS Endometriosis Guidelines. Gynecologie, obstetrique, fertilite & senologie. 2018;46(4):335-341. DOI: 10.1016/j.gofs.2018.02.006 PMID: 29544710', pmid: '29544710', doi: '10.1016/j.gofs.2018.02.006' },
    { id: 8, citation: 'Roman H, et al. Extragenital endometriosis: Parietal, thoracic, diaphragmatic and nervous lesions. CNGOF-HAS Endometriosis Guidelines. Gynecologie, obstetrique, fertilite & senologie. 2018;46(4):223-229. DOI: 10.1016/j.gofs.2018.02.001 PMID: 29530553', pmid: '29530553', doi: '10.1016/j.gofs.2018.02.001' },
    { id: 9, citation: 'Maraud R, et al. Expectations of women with endometriosis: What information to deliver? CNGOF-HAS Endometriosis Guidelines. Gynecologie, obstetrique, fertilite & senologie. 2018;46(4):230-235. DOI: 10.1016/j.gofs.2018.02.005 PMID: 29530554', pmid: '29530554', doi: '10.1016/j.gofs.2018.02.005' },
    { id: 10, citation: 'Roman H, et al. Strategies and surgical management of endometriosis: CNGOF-HAS Endometriosis Guidelines. Gynecologie, obstetrique, fertilite & senologie. 2018;46(4):342-350. DOI: 10.1016/j.gofs.2018.02.020 PMID: 29526793', pmid: '29526793', doi: '10.1016/j.gofs.2018.02.020' }
  ],
}