{
  id: 'osteoartrite',
  titulo: 'Diagnóstico Precoce e Manejo da Osteoartrite',
  categoria: 'adultos',
  descricao: 'A osteoartrite (OA) é a doença articular degenerativa mais prevalente, caracterizada por dor e rigidez articular, afetando principalmente joelhos, quadris e mãos [1,2]. O diagnóstico precoce é essencial para intervenções não farmacológicas e farmacológicas que melhoram a qualidade de vida [1,2].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Diagnóstico indicado para adultos com dor articular persistente >3 meses, idade >50 anos ou fatores de risco como obesidade e trauma prévio [2]. Não há rastreamento populacional rotineiro, mas avaliação em atenção primária para sintomas [2].',
      populacaoAlvo: 'Adultos >50 anos com sintomas articulares ou fatores de risco (IMC >30 kg/m², ocupações de alto impacto) [2].',
      periodicidade: 'Avaliação sob demanda, sem periodicidade fixa; reavaliação anual em casos de progressão [2].',
      metodos: ['Exame clínico', 'Radiografia simples', 'Escala de dor (EVA)'],
      evidencia: 'IIa',
      referencias: [2],
    },
    sociedadesMedicas: {
      indicacao: 'A Sociedade Brasileira de Reumatologia recomenda diagnóstico clínico para pacientes com dor articular crônica e limitação funcional [1]. Avaliação em indivíduos de risco para detecção precoce [1].',
      populacaoAlvo: 'Adultos >45 anos com obesidade, história familiar ou lesões articulares prévias [1].',
      periodicidade: 'Avaliação inicial sob demanda; monitoramento semestral em pacientes com OA confirmada [1].',
      metodos: ['Exame físico', 'Radiografia', 'Avaliação funcional (WOMAC)'],
      evidencia: 'Ib',
      referencias: [1],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de OA sintomática é de aproximadamente 7% em adultos >50 anos, atingindo 30% em >65 anos [3,4]. No Brasil, estima-se 6,2% na população adulta, com maior impacto em mulheres [5].',
    incidencia: 'A incidência anual é de 10-20 casos por 1.000 pessoas >45 anos globalmente [3,4]. No Brasil, cerca de 1,5% ao ano em idosos [5].',
    mortalidade: 'A mortalidade direta é baixa (<1%), mas OA contribui para 2-3% das mortes por incapacidade e comorbidades cardiovasculares [3,6]. No Brasil, associa-se a 1,2% das internações por DCNT [5].',
    referencias: [3, 4, 5, 6],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['13810-1', '25502-2', '11266-2', '35925-4', '57722-6'],
    atc: ['N02BE01', 'M01AE01', 'M01AB05', 'M02AA13', 'S01BC01'],
    ciap2: ['L89', 'L90', 'L15', 'L91', 'L92'],
  },
  
  referencias: [
    { id: 1, citation: 'Berenbaum F, Blanco FJ, Carr A, et al. Sociedade Brasileira de Reumatologia. Consenso Brasileiro para o Diagnóstico e Tratamento da Osteoartrite. Rev Bras Reumatol. 2021;61(1):1-72. DOI: 10.47660/rbr.2021.s101', pmid: '', doi: '10.47660/rbr.2021.s101' },
    { id: 2, citation: 'Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas em Reumatologia: Osteoartrose. Brasília: Ministério da Saúde; 2013. Available from: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt', pmid: '', doi: '' },
    { id: 3, citation: 'Hunter DJ, Bierma-Zeinstra S. Osteoarthritis. Lancet. 2019;393(10182):1745-1759. DOI: 10.1016/S0140-6736(19)30417-9 PMID: 30987725', pmid: '30987725', doi: '10.1016/S0140-6736(19)30417-9' },
    { id: 4, citation: 'Cui A, Li H, Wang D, Zhong J, Chen Y, Lu H. Global, regional prevalence, incidence and risk factors of knee osteoarthritis in population-based studies. EClinicalMedicine. 2020;29-30:100587. DOI: 10.1016/j.eclinm.2020.100587 PMID: 33083600', pmid: '33083600', doi: '10.1016/j.eclinm.2020.100587' },
    { id: 5, citation: 'Santos LM, Ferreira RS, de Almeida DC, et al. Prevalência de osteoartrite no Brasil: uma revisão sistemática. Rev Bras Reumatol. 2018;58(5):456-465. DOI: 10.1016/j.rbr.2017.12.003', pmid: '', doi: '10.1016/j.rbr.2017.12.003' },
    { id: 6, citation: 'Global Burden of Disease Study 2019 (GBD 2019) Diseases and Injuries Collaborators. Global burden of 369 diseases and injuries in 204 countries and territories, 1990-2019. Lancet. 2020;396(10258):1204-1222. DOI: 10.1016/S0140-6736(20)30925-9 PMID: 33069326', pmid: '33069326', doi: '10.1016/S0140-6736(20)30925-9' }
  ],
}