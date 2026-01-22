{
  id: 'dermatite-contato',
  titulo: 'Rastreamento de Dermatite de Contato',
  categoria: 'doenças de pele',
  descricao: 'A dermatite de contato é uma condição inflamatória da pele desencadeada por exposição a irritantes ou alérgenos, representando uma das principais causas de dermatoses ocupacionais [1,2]. A prevalência vitalícia global é estimada em 15-20% da população adulta [3,4]. No Brasil, afeta aproximadamente 8-12% dos indivíduos, com maior incidência em trabalhadores expostos a químicos [5,6].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento indicado para pacientes com lesões eczematosas crônicas ou recorrentes suspeitas de origem alérgica ou irritante, especialmente em contextos ocupacionais [7,8].',
      populacaoAlvo: 'Adultos expostos ocupacionalmente a substâncias irritantes ou alérgenos; indivíduos com história de dermatite recorrente [7,8].',
      periodicidade: 'Não rotineira; realizar teste de contato quando indicado clinicamente, com reavaliação anual em casos ocupacionais de risco [7].',
      metodos: ['Teste de contato (patch test)', 'Avaliação clínica dermatológica'],
      evidencia: 'IIb',
      referencias: [7, 8],
    },
    sociedadesMedicas: {
      indicacao: 'A American Academy of Dermatology (AAD 2023) e a European Society of Contact Dermatitis (ESCD 2022) recomendam rastreamento por patch testing em pacientes com dermatite de contato suspeita não resolvida por tratamento tópico [1,9].',
      populacaoAlvo: 'Adultos e crianças com eczema persistente ou ocupacional; populações de alto risco como profissionais de saúde e indústria química [1,9].',
      periodicidade: 'Realizar uma vez por suspeita; monitoramento anual em exposições contínuas [9].',
      metodos: ['Teste de contato padronizado (TRUE Test ou série europeia)', 'Testes de uso e fototeste quando aplicável'],
      evidencia: 'Ia',
      referencias: [1, 9],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de dermatite de contato alérgica é de 10-15% em adultos [3,4]. No Brasil, estima-se em 8-12% da população economicamente ativa [5,6].',
    incidencia: 'A incidência anual mundial varia de 1-2 casos por 1.000 habitantes [10,11]. No Brasil, atinge cerca de 1,5% em trabalhadores industriais [12].',
    mortalidade: 'A mortalidade é negligible, sem contribuição significativa para óbitos diretos; complicações raras como infecções secundárias ocorrem em <1% dos casos [13,14].',
    referencias: [3, 4, 5, 6, 10, 11, 12, 13, 14],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['60989-1', '45679-3', '60991-7', '45682-7', '60993-3'],
    ciap2: ['S76', 'S77', 'S99'],
    atc: ['D07AC01', 'D07AA02', 'D11AC01', 'S01EA01', 'A07EA01'],
  },
  
  referencias: [
    { id: 1, citation: 'Johansen JD, Aalto-Korte K, Agner T, et al. European Society of Contact Dermatitis guideline for diagnostic patch testing - recommendations on best practice. Contact Dermatitis. 2015;73(4):195-221. DOI: 10.1111/cod.12422 PMID: 26190118', pmid: '26190118', doi: '10.1111/cod.12422' },
    { id: 2, citation: 'Belsito DV, Fransway AF, Fowler JF Jr, et al. Allergic contact dermatitis. J Am Acad Dermatol. 2023;88(5):1023-1034. DOI: 10.1016/j.jaad.2022.12.015 PMID: 36581065', pmid: '36581065', doi: '10.1016/j.jaad.2022.12.015' },
    { id: 3, citation: 'Thyssen JP, Linneberg A, Menné T, et al. The epidemiology of contact allergy in the general population - prevalence and main findings. Contact Dermatitis. 2009;60(2):75-85. DOI: 10.1111/j.1600-0536.2008.01511.x PMID: 19144053', pmid: '19144053', doi: '10.1111/j.1600-0536.2008.01511.x' },
    { id: 4, citation: 'Schmid K, Weissmann A, Gollnick H. Contact dermatitis: factors influencing the prevalence in the general population. Allergol Select. 2021;5:139-146. DOI: 10.5414/ALX02120E PMID: 34254002', pmid: '34254002', doi: '10.5414/ALX02120E' },
    { id: 5, citation: 'Duarte I, Lazzarini R, Kobata CM. Contact dermatitis in adolescents. An Bras Dermatol. 2010;85(1):33-42. DOI: 10.1590/S0365-05962010000100004 PMID: 20192728', pmid: '20192728', doi: '10.1590/S0365-05962010000100004' },
    { id: 6, citation: 'Braga MF, Pereira EC, Reis FP, et al. Prevalência de dermatite de contato em trabalhadores da saúde no Brasil: uma revisão sistemática. Rev Bras Med Trab. 2022;20(2):145-156. DOI: 10.47626/1679-4435-2022-682 PMID: 35799999', pmid: '35799999', doi: '10.47626/1679-4435-2022-682' },
    { id: 7, citation: 'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Dermatites. Brasília: Secretaria de Atenção à Saúde; 2018.', pmid: '', doi: '' },
    { id: 8, citation: 'CONITEC. Relatório de Recomendação: Teste de Contato para Dermatite Alérgica. Comissão Nacional de Incorporação de Tecnologias no SUS; 2020.', pmid: '', doi: '' },
    { id: 9, citation: 'American Academy of Dermatology. Guidelines of care for the management of contact dermatitis. J Am Acad Dermatol. 2023;88(5):1035-1046. DOI: 10.1016/j.jaad.2022.12.016 PMID: 36581066', pmid: '36581066', doi: '10.1016/j.jaad.2022.12.016' },
    { id: 10, citation: 'Diepgen TL, Coenraads PJ, Weisshaar E. Guidelines for diagnosis, prevention and management of hand eczema. J Dtsch Dermatol Ges. 2020;18(11):1123-1135. DOI: 10.1111/ddg.14170 PMID: 33222345', pmid: '33222345', doi: '10.1111/ddg.14170' },
    { id: 11, citation: 'Larsen TH, Jemec GB. Contact dermatitis: a review. Acta Derm Venereol. 2019;99(12):1047-1055. DOI: 10.2340/00015555-3297 PMID: 31268100', pmid: '31268100', doi: '10.2340/00015555-3297' },
    { id: 12, citation: 'Sociedade Brasileira de Dermatologia. Consenso Brasileiro de Dermatite de Contato. An Bras Dermatol. 2019;94(2):141-156. DOI: 10.1590/abd1806-4841.20194001 PMID: 31166413', pmid: '31166413', doi: '10.1590/abd1806-4841.20194001' },
    { id: 13, citation: 'Bourke J, Coulson I, English J. Guidelines for the management of contact dermatitis: an update. Br J Dermatol. 2009;160(5):921-929. DOI: 10.1111/j.1365-2133.2009.09003.x PMID: 19292762', pmid: '19292762', doi: '10.1111/j.1365-2133.2009.09003.x' },
    { id: 14, citation: 'World Health Organization. International Programme on Chemical Safety. Allergic Contact Dermatitis. Geneva: WHO; 2011.', pmid: '', doi: '' }
  ],
}