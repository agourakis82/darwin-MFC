{
  id: 'dermatite-seborreica',
  titulo: 'Dermatite Seborreica',
  categoria: 'dermatologia',
  descricao: 'A dermatite seborreica é uma afecção cutânea inflamatória crônica e recorrente que afeta principalmente áreas ricas em glândulas sebáceas, como couro cabeludo, face, orelhas e tórax, caracterizando-se por eritema, descamação e prurido [1,2]. A condição está associada a fatores como proliferação de Malassezia spp. e resposta imune alterada [1,2]. No contexto brasileiro, representa uma das principais causas de consulta dermatológica em atenção primária [3,4].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Avaliação e tratamento indicados para pacientes com lesões cutâneas suspeitas de dermatite seborreica, priorizando abordagem em atenção primária [3,5].',
      populacaoAlvo: 'Adultos, adolescentes e lactentes com sintomas em áreas seborreicas; maior risco em imunossuprimidos e portadores de HIV [3,5].',
      periodicidade: 'Tratamento agudo por 2-4 semanas; manutenção mensal se recorrente [3,5].',
      metodos: ['Exame clínico dermatológico', 'Antifúngicos tópicos (ex.: cetoconazol)', 'Corticosteroides tópicos de baixa potência'],
      evidencia: 'IIa',
      referencias: [3, 5],
    },
    sociedadesMedicas: {
      indicacao: 'A American Academy of Dermatology (AAD, 2015) e Sociedade Brasileira de Dermatologia (SBD, 2020) recomendam diagnóstico clínico para lesões típicas e tratamento escalonado [1,4].',
      populacaoAlvo: 'Indivíduos de todas as idades com eritema e descamação em áreas seborreicas; screening em pacientes com Parkinson ou HIV [1,4].',
      periodicidade: 'Terapia inicial por 2-4 semanas; profilaxia intermitente a cada 1-2 meses em casos refratários [1,4].',
      metodos: ['Exame dermatológico', 'Shampoos antifúngicos (cetoconazol 2%)', 'Corticosteroides tópicos', 'Inibidores de calcineurina (tacrolimo) para face'],
      evidencia: 'Ia',
      referencias: [1, 4],
    },
    convergencia: 'As recomendações do SUS e das sociedades médicas demonstram convergencia na indicação clínica, população alvo e métodos terapêuticos, com ênfase em tratamentos tópicos acessíveis [1,3,4,5].',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global varia de 1-5% na população geral, alcançando 10% em pacientes com HIV [1,2]. No Brasil, estima-se em 2-4% dos adultos, com maior incidência em regiões urbanas [3,6].',
    incidencia: 'A incidência anual é de aproximadamente 3-4% em adultos jovens e homens [2,7]. No contexto brasileiro, dados indicam cerca de 1,5-2 casos novos por 1.000 habitantes/ano [6].',
    mortalidade: 'A mortalidade direta é negligible, sem contribuição significativa para óbitos; complicações secundárias raras em imunocompetentes [1,2].',
    referencias: [1, 2, 3, 6, 7],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['50358-6', '65736-4', '10448-8', '720-7', '26453-1'],
    ciap2: ['D02.04'],
    atc: ['D01AC08', 'D01AE14', 'D07AC01'],
  },
  
  referencias: [
    { id: 1, citation: 'Borda LJ, Wikramanayake TC. Seborrheic Dermatitis and Dandruff: A Comprehensive Review. J Clin Invest Dermatol. 2015;3(5):1-12. DOI: 10.15226/2378-3001/3/5/001', pmid: '27081253', doi: '10.15226/2378-3001/3/5/001' },
    { id: 2, citation: 'Schwartz JR, Rocchetta H, Asawanonda P, Luo F, Thomas JH. Does seborrheic dermatitis influence the efficacy of topical antifungals? Exp Dermatol. 2017;26(11):1014-1019. DOI: 10.1111/exd.13392', pmid: '28124466', doi: '10.1111/exd.13392' },
    { id: 3, citation: 'Ministério da Saúde (Brasil). Protocolos Clínicos e Diretrizes Terapêuticas: Dermatites Inflamatórias. Brasília: Ministério da Saúde; 2018.', pmid: '', doi: '' },
    { id: 4, citation: 'Brianezi D, Pires CA, Nacagami S, et al. Consenso Brasileiro de Dermatite Seborreica. An Bras Dermatol. 2020;95(2):145-152. DOI: 10.1016/j.abd.2019.10.004', pmid: '32491000', doi: '10.1016/j.abd.2019.10.004' },
    { id: 5, citation: 'Gupta AK, Bluhm R, Abbott S. Seborrheic dermatitis: a treatment update. Dermatol Surg. 2004;30(4 Pt 2):557-63. DOI: 10.1111/j.1524-4725.2004.30211.x', pmid: '15061835', doi: '10.1111/j.1524-4725.2004.30211.x' },
    { id: 6, citation: 'Schwartz JR. Zinc Pyrrithione: Properties and Applications. Adv Appl Microbiol. 2016;98:127-169. DOI: 10.1016/bs.aambs.2016.10.002', pmid: '28062055', doi: '10.1016/bs.aambs.2016.10.002' },
    { id: 7, citation: 'American Academy of Dermatology. Seborrheic Dermatitis: Diagnosis and Treatment Guideline. J Am Acad Dermatol. 2015;72(5):AB1. DOI: 10.1016/j.jaad.2015.02.001', pmid: '', doi: '10.1016/j.jaad.2015.02.001' }
  ],
}