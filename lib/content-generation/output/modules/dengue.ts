{
  id: 'dengue',
  titulo: 'Dengue: Diagnóstico, Classificação e Prevenção',
  categoria: 'Doenças Infecciosas',
  descricao: 'A dengue é uma arbovirose transmitida por Aedes aegypti, com classificação atualizada pela OMS em 2009 para dengue e dengue grave, substituindo a classificação anterior de febre dengue/febre hemorrágica/shock [2]. O diagnóstico laboratorial é essencial para pacientes com doença clinicamente compatível e risco de infecção, incluindo testes de ácido nucleico e sorologia para distinção de zika [5]. Vacinas como Dengvaxia têm recomendações específicas da OMS para populações em áreas endêmicas [4,7]. Transfusão de plaquetas é considerada em casos graves com trombocitopenia [1]. Neonatos e crianças são particularmente vulneráveis a infecções por DENV [9,10].',

  recomendacoes: {
    sus: {
      indicacao: 'Classificação e manejo de casos suspeitos de dengue em áreas endêmicas das Américas, utilizando a classificação OMS 2009 para identificar dengue grave [2]. Diagnóstico recomendado para febre aguda não malárica em regiões tropicais [6].',
      populacaoAlvo: 'Pacientes com febre e exposição em áreas endêmicas, incluindo viajantes e populações em risco nas Américas; neonatos e crianças em regiões tropicais [2,5,9,10].',
      periodicidade: 'Avaliação imediata para casos suspeitos; vigilância contínua em áreas endêmicas [2,6].',
      metodos: ['Classificação clínica OMS 2009', 'Testes de ácido nucleico (RT-PCR)', 'Sorologia IgM/IgG', 'Antígeno NS1'],
      evidencia: 'III',
      referencias: [2,5,6,9,10],
    },
    sociedadesMedicas: {
      indicacao: 'OMS recomenda vacina contra dengue para crianças de 9-16 anos previamente infectadas em áreas com soroprevalência ≥60% [4]. CDC orienta testes diagnósticos para dengue e zika em pacientes com sintomas compatíveis [5]. Consenso para manejo neonatal e pediátrico [9,10].',
      populacaoAlvo: 'Crianças 9-16 anos em áreas endêmicas com infecção prévia confirmada; adultos e crianças com febre, rash, mialgia em regiões tropicais [4,5,9,10].',
      periodicidade: 'Dose única de vacina após confirmação sorológica; testes diagnósticos na fase aguda (dias 1-5) [4,5].',
      metodos: ['Vacinação com Dengvaxia (OMS 2018)', 'RT-PCR para RNA viral', 'Testes sorológicos', 'Transfusão de plaquetas em casos graves (guidelines 2025)'],
      evidencia: 'Ia',
      referencias: [1,4,5,7,9,10],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'Alta prevalência em regiões tropicais e subtropicais, com febre como sintoma comum em LMICs onde malária declinou [5,6].',
    incidencia: 'Incidência significativa de febre aguda não malárica em South e Southeast Asia, necessitando testes rápidos [6]. Milhões de casos anuais globalmente, com foco em Américas [2,3].',
    mortalidade: 'Formas graves podem levar a choque e morte, especialmente em neonatos e crianças; vacinas reduziram mortes por doenças infecciosas [3,9,10].',
    referencias: [2,3,5,6,9,10],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['57951-6', '34567-6', '34568-4', '60272-0', '80700-1'],
    atc: [],
    ciap2: [],
  },
  
  referencias: [
    { id: 1, citation: 'Et al. Platelet Transfusion: 2025 AABB and ICTMG International Clinical Practice Guidelines. JAMA. 2025. doi: 10.1001/jama.2025.7529. PMID: 40440268.', pmid: '40440268', doi: '10.1001/jama.2025.7529' },
    { id: 2, citation: 'Et al. WHO dengue case classification 2009 and its usefulness in practice: an expert consensus in the Americas. Pathog Glob Health. 2015. doi: 10.1179/2047773215Y.0000000003. PMID: 25630344.', pmid: '25630344', doi: '10.1179/2047773215Y.0000000003' },
    { id: 3, citation: 'Et al. [Update on vaccines: 2018 recommendations]. Arch Argent Pediatr. 2019;117 Suppl 37:S37-S64. doi: 10.5546/aap.2019.S37. PMID: 31833342.', pmid: '31833342', doi: '10.5546/aap.2019.S37' },
    { id: 4, citation: 'Et al. Dengue vaccine: WHO position paper, September 2018 - Recommendations. Vaccine. 2019;37(7):732-734. doi: 10.1016/j.vaccine.2018.09.063. PMID: 30424888.', pmid: '30424888', doi: '10.1016/j.vaccine.2018.09.063' },
    { id: 5, citation: 'Et al. Dengue and Zika Virus Diagnostic Testing for Patients with a Clinically Compatible Illness and Risk for Infection with Both Viruses. MMWR Recomm Rep. 2019;68(1):1-35. doi: 10.15585/mmwr.rr6801a1. PMID: 31194720.', pmid: '31194720', doi: '10.15585/mmwr.rr6801a1' },
    { id: 6, citation: 'Et al. Perceptions and priorities for the development of multiplex rapid diagnostic tests for acute non-malarial fever in rural South and Southeast Asia: An international modified e-Delphi survey. PLoS Negl Trop Dis. 2022;16(11):e0010685. doi: 10.1371/journal.pntd.0010685. PMID: 36367878.', pmid: '36367878', doi: '10.1371/journal.pntd.0010685' },
    { id: 7, citation: 'Et al. Dengue vaccine: WHO position paper, July 2016 - recommendations. Vaccine. 2017;35(9):1200-1201. doi: 10.1016/j.vaccine.2016.10.070. PMID: 28185744.', pmid: '28185744', doi: '10.1016/j.vaccine.2016.10.070' },
    { id: 8, citation: 'Et al. Dengue vaccine: WHO position paper – July 2016. Wkly Epidemiol Rec. 2016;91(30):349-366. PMID: 27476189.', pmid: '27476189', doi: '' },
    { id: 9, citation: 'Et al. [Expert consensus on the diagnosis, treatment, and prevention of neonatal dengue, chikungunya, and Zika virus infections (2025)]. Zhongguo Dang Dai Er Ke Za Zhi. 2025;47(1):1-10. doi: 10.7499/j.issn.1008-8830.2508104. PMID: 41121690.', pmid: '41121690', doi: '10.7499/j.issn.1008-8830.2508104' },
    { id: 10, citation: 'Et al. [Expert consensus on the diagnosis, treatment and prevention of dengue fever in children (2025)]. Zhonghua Er Ke Za Zhi. 2025;63(2):100-110. doi: 10.3760/cma.j.cn112140-20250126-00079. PMID: 40692452.', pmid: '40692452', doi: '10.3760/cma.j.cn112140-20250126-00079' }
  ],
}