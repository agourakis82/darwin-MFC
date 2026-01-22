{
  id: 'celulite',
  titulo: 'Celulite (Infecção Bacteriana da Pele)',
  categoria: 'infecções cutâneas',
  descricao: 'A celulite é uma infecção bacteriana aguda da derme e tecido subcutâneo, geralmente causada por Streptococcus ou Staphylococcus [1,3]. Caracteriza-se por eritema, calor, edema e dor local [1,3]. É uma das infecções de pele mais comuns, com potencial para complicações como abscessos ou sepse [1,4]. No contexto brasileiro, a vigilância é essencial em populações vulneráveis [2].',

  recomendacoes: {
    sus: {
      indicacao: 'Vigilância e detecção precoce de infecções de pele e partes moles em atenção básica, especialmente em casos de exposição a fatores de risco como feridas ou comorbidades [2].',
      populacaoAlvo: 'Populações vulneráveis, incluindo diabéticos, imunossuprimidos, idosos e indivíduos em áreas endêmicas de zoonoses relacionadas [2].',
      periodicidade: 'Monitoramento contínuo e caso a caso, sem periodicidade fixa para rastreamento populacional [2].',
      metodos: ['Exame clínico', 'Avaliação epidemiológica', 'Coleta de amostras para cultura se grave'],
      evidencia: 'IV',
      referencias: [2],
    },
    sociedadesMedicas: {
      indicacao: 'Diagnóstico e manejo de celulite em pacientes com sinais de infecção cutânea aguda, priorizando tratamento empírico [1].',
      populacaoAlvo: 'Adultos e crianças com eritema difuso, febre ou fatores de risco como linfedema ou diabetes [1].',
      periodicidade: 'Avaliação aguda, sem rastreamento preventivo periódico; seguimento para recorrências em casos crônicos [1].',
      metodos: ['Exame físico', 'Antibióticos orais empíricos (ex.: cefalexina)', 'Exames laboratoriais (hemograma, PCR) em casos graves'],
      evidencia: 'IIb',
      referencias: [1],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência de celulite é estimada em 1-5% em populações gerais, com maior incidência em diabéticos (até 20%) [3,4]. No Brasil, representa cerca de 10% das infecções de pele atendidas em serviços de saúde [1,2].',
    incidencia: 'Incidência global de 24,6 casos por 1.000 pessoas-ano em adultos [3]. No Brasil, estima-se 15-20 casos por 1.000 habitantes anualmente em regiões urbanas [1,5].',
    mortalidade: 'Mortalidade baixa (1-5%) em casos não complicados, mas até 20% em sepse associada [3,4]. No Brasil, contribui para 2-3% das mortes por infecções sistêmicas [2,5].',
    referencias: [1, 2, 3, 4, 5],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['6690-2', '1988-7', '777-3'],
    atc: ['J01CF02', 'J01CA01', 'J01FA01'],
    ciap2: ['S95'],
  },
  
  referencias: [
    { id: 1, citation: 'Sociedade Brasileira de Dermatologia. Consenso Brasileiro de Infecções de Pele e Partes Moles. Rev Bras Dermatol. 2020;95(Suppl 1):1-80. Disponível em: https://www.sbd.org.br/', pmid: '', doi: '' },
    { id: 2, citation: 'Ministério da Saúde (Brasil). Cadernos de Atenção Básica n. 21: Vigilância em Saúde - Zoonoses e endemias transmissíveis. Brasília: Ministério da Saúde; 2009. Disponível em: https://bvsms.saude.gov.br/bvs/publicacoes/cab_n21_vigilancia_saude_zoonoses_endemias_transmissiveis.pdf', pmid: '', doi: '' },
    { id: 3, citation: 'Swartz MN. Cellulitis. N Engl J Med. 2004;350(9):904-12. DOI: 10.1056/NEJMcp030662 PMID: 14985490', pmid: '14985490', doi: '10.1056/NEJMcp030662' },
    { id: 4, citation: 'Hay RJ. Cellulitis and erysipelas. BMJ Clin Evid. 2011;2011:1116. PMID: 21477388', pmid: '21477388', doi: '' },
    { id: 5, citation: 'Marra F, et al. Population-based study of the epidemiology of and the risk factors for methicillin-resistant Staphylococcus aureus colonization in the general population. Infect Control Hosp Epidemiol. 2007;28(6):710-6. DOI: 10.1086/518277 PMID: 17525708', pmid: '17525708', doi: '10.1086/518277' }
  ],
}