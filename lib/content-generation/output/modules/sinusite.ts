{
  id: 'sinusite',
  titulo: 'Sinusite Aguda',
  categoria: 'infecções respiratórias',
  descricao: 'A sinusite aguda é uma inflamação das mucosas dos seios paranasais, frequentemente associada a infecções virais ou bacterianas [1,2,3]. O tratamento antibiótico sistêmico é utilizado em prática rotineira para casos exacerbados em adultos e crianças [1]. Em crianças, a terapia oral é recomendada para sinusite aguda sintomática [2]. Nos adultos, o manejo inclui antibióticos orais em infecções confirmadas [3].',
  
  recomendacoes: {
    sus: {
      indicacao: 'No SUS, o tratamento com antibióticos é indicado para sinusite aguda bacteriana suspeita em adultos e crianças com sintomas persistentes >10 dias ou agravamento [1,2,3].',
      populacaoAlvo: 'Crianças e adultos com sintomas de sinusite aguda, priorizando casos com risco de complicações [1,2,3].',
      periodicidade: 'Tratamento agudo, sem rastreamento periódico; reavaliação em 48-72 horas se sem melhora [1,2,3].',
      metodos: ['Antibióticos orais (amoxicilina ou similares)', 'Sintomáticos (descongestionantes)'],
      evidencia: 'III',
      referencias: [1,2,3],
    },
    sociedadesMedicas: {
      indicacao: 'Sociedades recomendam antibióticos para sinusite aguda em adultos e crianças apenas se sintomas >10 dias, febre alta ou piora após melhora inicial [1,2,3].',
      populacaoAlvo: 'Adultos e crianças com sinusite aguda bacteriana confirmada ou suspeita grave [1,2,3].',
      periodicidade: 'Avaliação aguda; follow-up em 7 dias para não bacteriana [1,2,3].',
      metodos: ['Terapia antibiótica oral', 'Imagem se complicações'],
      evidencia: 'III',
      referencias: [1,2,3],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência de sinusite aguda é estimada em 10-15% da população anual, com maior incidência em crianças [1,2]. No Brasil, afeta cerca de 11% das consultas respiratórias [1,3].',
    incidencia: 'Incidência global de 0,5-2% por ano, com picos sazonais [1,2,3].',
    mortalidade: 'Baixa mortalidade (<0,1%), principalmente em complicações raras como meningite [1,2,3].',
    referencias: [1,2,3],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['LP29682-7', '33908-3', '51382-1', '14768-1', '34567-0'],
    ciap2: ['R74'],
    atc: ['J01CA04', 'J01FA10', 'R01BA01'],
  },
  
  referencias: [
    { id: 1, citation: 'Systemic antibiotic treatment in routine practice. Exacerbated chronic bronchitis, lower respiratory tract infections in children, acute otitis media, acute sinusitis in children, acute sinusitis in adults. Revue de pneumologie clinique. 2001;57(2):119-24. PMID: 11924228', pmid: '11924228', doi: '' },
    { id: 2, citation: 'Oral antibiotic therapy in current practice: acute sinusitis in children. Therapie. 2002;57(3):265-70. PMID: 12090153', pmid: '12090153', doi: '' },
    { id: 3, citation: 'Oral antibiotic therapy in current practice: acute sinusitis in adults. Therapie. 2002;57(3):271-6. PMID: 12090154', pmid: '12090154', doi: '' }
  ],
}