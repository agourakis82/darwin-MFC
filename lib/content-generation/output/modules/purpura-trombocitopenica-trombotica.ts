{
  id: 'purpura-trombocitopenica-trombotica',
  titulo: 'Púrpura Trombocitopênica Trombótica',
  categoria: 'doenças hematológicas',
  descricao: 'A púrpura trombocitopênica trombótica (PTT) é uma microangiopatia trombótica caracterizada por anemia hemolítica microangiopática, trombocitopenia e disfunção orgânica isquêmica associada a níveis de ADAMTS13 inferiores a 10% na maioria dos casos [1]. É uma condição rara e potencialmente fatal que requer diagnóstico e tratamento rápidos [1,2].',

  recomendacoes: {
    sus: {
      indicacao: 'Não há recomendações específicas de rastreamento pelo SUS para PTT, mas diagnóstico imediato é indicado em pacientes com suspeita clínica de microangiopatia trombótica, incluindo anemia hemolítica e trombocitopenia [1,2].',
      populacaoAlvo: 'Adultos e crianças com sinais de anemia hemolítica microangiopática, trombocitopenia e disfunção orgânica [1,2].',
      periodicidade: 'Diagnóstico agudo, sem periodicidade de rastreamento populacional [1,2].',
      metodos: ['Dosagem de ADAMTS13', 'Esfregaço periférico para esquizócitos', 'Aférese de plasma terapêutica'],
      evidencia: 'IV',
      referencias: [1, 2],
    },
    sociedadesMedicas: {
      indicacao: 'Recomendações para diagnóstico e tratamento de PTT incluem confirmação por níveis de ADAMTS13 <10% e início imediato de terapia [1]. Diretrizes para microangiopatias trombóticas enfatizam avaliação rápida em casos de anemia hemolítica e trombocitopenia [2].',
      populacaoAlvo: 'Pacientes com microangiopatia hemolítica (esquizócitos no esfregaço), trombocitopenia e disfunção orgânica, independentemente da idade [1,2].',
      periodicidade: 'Avaliação diagnóstica imediata em suspeita; sem rastreamento rotineiro devido à raridade [1,2].',
      metodos: ['Teste de atividade de ADAMTS13', 'Contagem de plaquetas', 'Aférese plasmática', 'Imunossupressores como rituximabe'],
      evidencia: 'III',
      referencias: [1, 2],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência de PTT é estimada em 1-2 casos por 100.000 habitantes, sendo uma doença rara [1,2].',
    incidencia: 'A incidência anual é de 3-10 casos por milhão de habitantes [1,2].',
    mortalidade: 'A mortalidade é de 10-20% com tratamento adequado, mas pode chegar a 90% sem intervenção [1,2].',
    referencias: [1, 2],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['26515-7', '1920-8', '4544-3', '78248-8', '14747-2'],
    ciap2: [],
    atc: ['L01XC02', 'B01AX69', 'B05XA05'],
  },
  
  referencias: [
    { id: 1, citation: 'Jiménez-Almazán J, et al. Recommendations for the diagnosis and treatment of patients with thrombotic thrombocytopenic purpura. Medicina clinica. 2022;159(1):45-52. DOI: 10.1016/j.medcli.2021.03.040 PMID: 34266669', pmid: '34266669', doi: '10.1016/j.medcli.2021.03.040' },
    { id: 2, citation: 'Sánchez-Luceros A, et al. Diagnostic and therapeutic guidelines of thrombotic microangiopathies of the Spanish Apheresis Group. Medicina clinica. 2015;145(11):493-500. DOI: 10.1016/j.medcli.2014.09.013 PMID: 25433791', pmid: '25433791', doi: '10.1016/j.medcli.2014.09.013' }
  ],
}