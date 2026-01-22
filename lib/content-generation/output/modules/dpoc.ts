{
  id: 'dpoc',
  titulo: 'Rastreamento de Doença Pulmonar Obstrutiva Crônica (DPOC)',
  categoria: 'adultos',
  descricao: 'A Doença Pulmonar Obstrutiva Crônica (DPOC) é uma doença respiratória crônica progressiva, caracterizada por limitação ao fluxo aéreo, sendo uma das principais causas de morbimortalidade global [3,4,5]. O rastreamento visa identificar casos precocemente em populações de risco por meio de espirometria, reduzindo complicações e mortalidade [3,6]. No contexto brasileiro, a DPOC afeta significativamente o sistema de saúde pública [5,6].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para indivíduos com sintomas respiratórios crônicos, tabagistas ou ex-tabagistas acima de 40 anos, e exposição ocupacional a poeiras ou fumos [5,6].',
      populacaoAlvo: 'Adultos ≥40 anos com história de tabagismo ≥20 maços-ano, dispneia ou tosse crônica, e exposição ambiental [5,6].',
      periodicidade: 'Avaliação inicial com espirometria; repetição anual em casos confirmados ou de alto risco [6].',
      metodos: ['Espirometria com broncodilatador'],
      evidencia: 'IIa',
      referencias: [5, 6],
    },
    sociedadesMedicas: {
      indicacao: 'A Global Initiative for Chronic Obstructive Lung Disease (GOLD 2024) e a Sociedade Brasileira de Pneumologia e Tisiologia (SBPT 2021) recomendam busca ativa (case-finding) em indivíduos de risco, não rastreamento populacional geral [3,4].',
      populacaoAlvo: 'Adultos ≥40 anos com tabagismo atual ou passado, sintomas respiratórios, e fatores de risco como exposição biomassa ou occupational [3,4].',
      periodicidade: 'Espirometria única para diagnóstico em suspeitos; monitoramento periódico em diagnosticados [3,4].',
      metodos: ['Espirometria (relação VEF1/CVF <0,70 pós-broncodilatador)'],
      evidencia: 'Ia',
      referencias: [3, 4],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de DPOC em adultos >40 anos é estimada em 12,1% [3]. No Brasil, a prevalência é de aproximadamente 13,6% em indivíduos >40 anos [4,5,6].',
    incidencia: 'A incidência global varia de 1,5 a 2,5 casos por 1.000 pessoas-ano em populações de risco [3]. No Brasil, estima-se 100.000 novos casos anuais [6].',
    mortalidade: 'A DPOC é a terceira causa de morte global, com 3,23 milhões de óbitos em 2019 [3]. No Brasil, representa cerca de 5% das mortes por doenças crônicas [5,6].',
    referencias: [3, 4, 5, 6],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['20108-4', '20150-6', '69811-2', '33909-7', '6366-3'],
    atc: ['R03AC02', 'R03BB04', 'R03AK06'],
    ciap2: ['R95'],
  },
  
  referencias: [
    { id: 1, citation: 'de Sousa Rodrigues C, et al. Recommendations for the implementation of a national lung cancer screening program in Portugal-A consensus statement. Pulmonology. 2024. doi: 10.1016/j.pulmoe.2024.04.003. PMID: 39112109.', pmid: '39112109', doi: '10.1016/j.pulmoe.2024.04.003' },
    { id: 2, citation: 'Araujo PR, et al. Mechanical ventilation in decompensated chronic obstructive pulmonary disease (COPD). Jornal brasileiro de pneumologia. 2007;33(4):499-515. doi: 10.1590/s1806-37132007000800006. PMID: 18026669.', pmid: '18026669', doi: '10.1590/s1806-37132007000800006' },
    { id: 3, citation: 'Global Initiative for Chronic Obstructive Lung Disease. Global Strategy for the Diagnosis, Management, and Prevention of Chronic Obstructive Pulmonary Disease: 2024 Report. GOLD; 2024. Available from: https://goldcopd.org/.', pmid: '', doi: '' },
    { id: 4, citation: 'Sociedade Brasileira de Pneumologia e Tisiologia. Diretrizes para o Manejo da DPOC da SBPT – 2021. SBPT; 2021. Available from: https://sbpt.org.br/.', pmid: '', doi: '' },
    { id: 5, citation: 'Ministério da Saúde (Brazil). Cadernos de Atenção Básica - Doenças Respiratórias Crônicas. Brasília: Ministério da Saúde; 2010. Available from: https://bvsms.saude.gov.br/bvs/publicacoes/doencas_respiratorias_cronicas.pdf.', pmid: '', doi: '' },
    { id: 6, citation: 'Ministério da Saúde (Brazil). Protocolo Clínico e Diretrizes Terapêuticas - Doença Pulmonar Obstrutiva Crônica (DPOC). Brasília: Ministério da Saúde; 2021. Available from: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dpoc.', pmid: '', doi: '' }
  ],
}