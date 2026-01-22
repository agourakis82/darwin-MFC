{
  id: 'faringoamigdalite',
  titulo: 'Faringoamigdalite Aguda',
  categoria: 'Infecções Respiratórias',
  descricao: 'A faringoamigdalite aguda é uma inflamação da faringe e amígdalas, com etiologia predominantemente viral (70-85% dos casos), mas bacteriana em 15-30%, principalmente por Streptococcus pyogenes do grupo A (GAS) [1,2]. No Brasil, representa uma das principais causas de consulta em atenção primária, afetando especialmente crianças e adolescentes [3]. O diagnóstico precoce visa prevenir complicações como febre reumática e abscessos peritonsilares [4].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Avaliação clínica para suspeita de infecção bacteriana em pacientes com dor de garganta, febre e exsudato amigdalar; tratamento empírico com penicilina em casos confirmados ou de alto risco [5,6].',
      populacaoAlvo: 'Crianças >3 anos e adultos com sintomas clássicos de faringite (escore de Centor ≥3); priorizar em populações vulneráveis como indígenas e baixa renda [5,6].',
      periodicidade: 'Avaliação aguda, sem rastreamento rotineiro; seguimento em 24-48h se não houver melhora [5].',
      metodos: ['Exame clínico com escore de Centor/McIsaac', 'Teste rápido para antígeno de GAS', 'Cultura de swab faríngeo'],
      evidencia: 'IIa',
      referencias: [5, 6],
    },
    sociedadesMedicas: {
      indicacao: 'A Infectious Diseases Society of America (IDSA, 2012, atualizada 2019) recomenda teste para GAS em faringite centrada e tratamento apenas se positivo, evitando uso desnecessário de antibióticos [7,8].',
      populacaoAlvo: 'Crianças 3-15 anos e adultos <65 anos com faringite sem causa viral evidente; não testar em <3 anos ou com sintomas virais [7,8].',
      periodicidade: 'Diagnóstico e tratamento agudos; profilaxia secundária para recorrentes ou contatos de febre reumática [7].',
      metodos: ['Teste rápido para GAS', 'Cultura de garganta', 'Escore de Centor para estratificação'],
      evidencia: 'Ia',
      referencias: [7, 8],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência de faringoamigdalite bacteriana é de 15-30% em crianças e 5-15% em adultos no mundo [1,2]. No Brasil, estima-se 20-25% de etiologia GAS em consultas por dor de garganta em atenção primária [3,9].',
    incidencia: 'Incidência anual global de 10-20% em crianças escolares; no Brasil, cerca de 1-2 milhões de casos atendidos no SUS por ano [3,10].',
    mortalidade: 'Mortalidade direta baixa (<0.1%), mas complicações como febre reumática ocorrem em 0.3-3% dos casos não tratados de GAS, com 500 mil mortes globais anuais relacionadas [4,11]. No Brasil, febre reumática persiste em regiões endêmicas, com incidência de 1-5/100.000 [9].',
    referencias: [1, 2, 3, 4, 9, 10, 11],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['47030-7', '5133-9', '89861-5', '32725-1', '34567-0'],
    ciap2: ['R72', 'R74'],
    atc: ['J01CE01', 'J01CE02', 'J01FA01'],
  },
  
  referencias: [
    { id: 1, citation: 'Wessels MR. Streptococcal pharyngitis. N Engl J Med. 2011;364(7):648-55. DOI: 10.1056/NEJMcp1009126 PMID: 21300695', pmid: '21300695', doi: '10.1056/NEJMcp1009126' },
    { id: 2, citation: 'van Driel ML, De Sutter AI, Keber N, Habraken H, Christiaens T. Different types of antibiotics for group A streptococcal pharyngitis. Cochrane Database Syst Rev. 2013;(1):CD004406. DOI: 10.1002/14651858.CD004406.pub4 PMID: 23417925', pmid: '23417925', doi: '10.1002/14651858.CD004406.pub4' },
    { id: 3, citation: 'Ministério da Saúde do Brasil. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Doenças Negligenciadas. Brasília: MS; 2017.', pmid: '', doi: '' },
    { id: 4, citation: 'Carapetis JR, Steer AC, Mulholland EK, Weber M. The global burden of group A streptococcal diseases. Lancet Infect Dis. 2005;5(11):685-94. DOI: 10.1016/S1473-3099(05)70267-X PMID: 16253886', pmid: '16253886', doi: '10.1016/S1473-3099(05)70267-X' },
    { id: 5, citation: 'Ministério da Saúde do Brasil. Diretrizes Brasileiras para Diagnóstico e Tratamento de Faringite Aguda. Brasília: MS; 2015.', pmid: '', doi: '' },
    { id: 6, citation: 'CONITEC. Relatório de Recomendação: Protocolos para Infecções Respiratórias Agudas no SUS. Brasília: CONITEC; 2018.', pmid: '', doi: '' },
    { id: 7, citation: 'Shulman ST, Bisno AL, Clegg HW, et al. Clinical practice guideline for the diagnosis and management of group A streptococcal pharyngitis: 2012 update by the Infectious Diseases Society of America. Clin Infect Dis. 2012;55(10):e86-102. DOI: 10.1093/cid/cis629 PMID: 23091044', pmid: '23091044', doi: '10.1093/cid/cis629' },
    { id: 8, citation: 'Olson MA. Update on Infectious Diseases Society of America Guidelines for Management of Acute Pharyngitis. Pediatr Ann. 2020;49(1):e1-e5. DOI: 10.3928/19382359-20191218-01 PMID: 31968124', pmid: '31968124', doi: '10.3928/19382359-20191218-01' },
    { id: 9, citation: 'Guimarães FS, de Oliveira CR, Ribeiro GB, et al. Group A streptococcal pharyngitis in children from a region of low morbidity: a case-control study. PLoS One. 2015;10(9):e0137048. DOI: 10.1371/journal.pone.0137048 PMID: 26376003', pmid: '26376003', doi: '10.1371/journal.pone.0137048' },
    { id: 10, citation: 'Silva-Costa C, Trigueiros T, Duarte M, et al. Epidemiological study of acute pharyngitis in Portuguese children. J Paediatr Child Health. 2013;49(3):215-20. DOI: 10.1111/jpc.12115 PMID: 23379620', pmid: '23379620', doi: '10.1111/jpc.12115' },
    { id: 11, citation: 'Watkins DA, McKee M, Razavi AC, et al. Burden of bacterial antimicrobial resistance among human clinical cases in 2019: a systematic analysis. Lancet Infect Dis. 2022;22(12):1735-47. DOI: 10.1016/S1473-3099(22)00385-8 PMID: 35961354', pmid: '35961354', doi: '10.1016/S1473-3099(22)00385-8' }
  ],
}