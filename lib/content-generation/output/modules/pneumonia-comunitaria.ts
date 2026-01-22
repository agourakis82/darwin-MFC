{
  id: 'pneumonia-comunitaria',
  titulo: 'Pneumonia Adquirida na Comunidade',
  categoria: 'doenças infecciosas',
  descricao: 'A pneumonia adquirida na comunidade (PAC) é definida como uma infecção aguda do parênquima pulmonar que se desenvolve fora do ambiente hospitalar ou em até 48 horas após internação [1,2]. Representa uma causa comum de consulta médica e hospitalização, com impacto significativo na saúde pública [1,2,3,4].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Avaliação clínica inicial em atenção básica para sintomas respiratórios agudos, com encaminhamento para confirmação diagnóstica e tratamento de casos suspeitos de PAC, especialmente em contexto de síndromes respiratórias como influenza [3,4].',
      populacaoAlvo: 'Adultos imunocompetentes com sintomas como febre, tosse produtiva e dispneia, priorizando idosos e comorbidades [3,4].',
      periodicidade: 'Diagnóstico e manejo agudos, sob demanda, sem periodicidade fixa [3,4].',
      metodos: ['Exame clínico', 'Oxymetria de pulso', 'Radiografia de tórax se disponível', 'Antibióticos empíricos como amoxicilina'],
      evidencia: 'IV',
      referencias: [3, 4],
    },
    sociedadesMedicas: {
      indicacao: 'Diagnóstico baseado em sintomas, exame físico e imagem torácica, com estratificação de risco para guiar tratamento [1,2].',
      populacaoAlvo: 'Adultos com suspeita de infecção pulmonar aguda, excluindo hospitalar ou associada a cuidados [1,2].',
      periodicidade: 'Avaliação imediata em casos sintomáticos, sem rastreamento populacional periódico [1,2].',
      metodos: ['Critérios CURB-65 ou PSI para gravidade', 'Radiografia de tórax', 'Terapia antimicrobiana empírica (beta-lactâmicos ± macrolídeos)', 'Testes microbiológicos em casos graves'],
      evidencia: 'Ia',
      referencias: [1, 2],
    },
    convergencia: 'convergencia nas abordagens diagnósticas e de tratamento empírico para casos leves a moderados, com adaptações locais no SUS para recursos limitados [1,2,3,4].',
  },
  
  epidemiologia: {
    prevalencia: 'Não aplicável como doença crônica; a PAC é aguda, com carga de doença medida por incidência [1,2].',
    incidencia: 'Incidência global em adultos de 5-11 casos por 1.000 pessoas-ano, maior em idosos [1]. No Brasil, estimada em 15-25 casos por 1.000 adultos/ano [2].',
    mortalidade: 'Mortalidade global de 5-10% em pacientes hospitalizados, variando de 1% em ambulatorial a 30% em UTI [1]. No Brasil, taxa de letalidade em torno de 8-12% para casos graves [2,4].',
    referencias: [1, 2, 4],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['6690-2', '1988-6', '1157-9'],
    atc: ['J01CA04', 'J01FA10', 'J01MA12'],
    ciap2: ['R81'],
  },
  
  referencias: [
    { id: 1, citation: 'Metlay JP, Waterer GW, Long AC, et al. Diagnosis and Treatment of Adults with Community-acquired Pneumonia. An Official Clinical Practice Guideline of the American Thoracic Society and Infectious Diseases Society of America. Am J Respir Crit Care Med. 2019;200(7):e45-e67. DOI: 10.1164/rccm.201908-1581ST', pmid: '31573361', doi: '10.1164/rccm.201908-1581ST' },
    { id: 2, citation: 'Nunes S, et al. Diretrizes brasileiras para pneumonia adquirida na comunidade em adultos imunocompetentes - 2018. J Bras Pneumol. 2018;44(5):366-402. DOI: 10.1590/S1806-37562018000000020', pmid: '', doi: '10.1590/S1806-37562018000000020' },
    { id: 3, citation: 'Ministério da Saúde (Brasil). Cadernos de Atenção Básica n° 25 - Doenças respiratórias crônicas. Brasília: Ministério da Saúde; 2010.', pmid: '', doi: '' },
    { id: 4, citation: 'Ministério da Saúde (Brasil). Protocolo de Manejo Clínico da Influenza e outras síndromes respiratórias agudas. Brasília: Ministério da Saúde; 2022.', pmid: '', doi: '' }
  ],
}