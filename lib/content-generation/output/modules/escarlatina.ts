{
  id: 'escarlatina',
  titulo: 'Protocolo Clínico para Escarlatina',
  categoria: 'infectologia_pediatrica',
  descricao: 'A escarlatina, também conhecida como febre escarlate, é uma infecção causada por cepas toxigênicas de Streptococcus pyogenes (grupo A), caracterizada por faringite, exantema eritematoso e complicações como febre reumática [1,2]. No contexto brasileiro, representa uma doença notificável no SUS, com ênfase na detecção precoce e tratamento antibiótico para prevenção de sequelas [3,4]. A prevalência global diminuiu significativamente com o uso de antibióticos, mas surtos persistem em populações vulneráveis [5,6].',

  recomendacoes: {
    sus: {
      indicacao: 'Indicação para diagnóstico e tratamento em casos suspeitos de infecção por Streptococcus pyogenes com rash escarlatiniforme, especialmente em crianças de 5-15 anos [3,7]. Notificação compulsória imediata ao SUS [3].',
      populacaoAlvo: 'Crianças e adolescentes com sintomas de faringite associada a exantema; grupos de risco incluem escolares em ambientes fechados [3,7].',
      periodicidade: 'Avaliação clínica imediata ao suspeitar; seguimento para complicações em 2-4 semanas [7].',
      metodos: ['Cultura de orofaringe', 'Teste rápido para antígeno estreptocócico', 'Dosagem de ASLO (antistreptolisina O)'],
      evidencia: 'Ib',
      referencias: [3, 7],
    },
    sociedadesMedicas: {
      indicacao: 'A Infectious Diseases Society of America (IDSA, 2012, atualizada 2023) recomenda tratamento empírico com penicilina para escarlatina confirmada ou suspeita, visando erradicação do patógeno e prevenção de complicações supurativas e não supurativas [1,8].',
      populacaoAlvo: 'Crianças e adultos com faringite estreptocócica sintomática; priorizar em idades escolares [1,8].',
      periodicidade: 'Tratamento único por 10 dias; vigilância para recorrências em 1-3 meses [8].',
      metodos: ['Teste rápido de estreptococo', 'Cultura faríngea', 'ASLO para confirmação sorológica'],
      evidencia: 'Ia',
      referencias: [1, 8],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de escarlatina é baixa, estimada em menos de 1 caso por 1.000 crianças anualmente em países desenvolvidos [5,6]. No Brasil, casos reportados ao SINAN indicam incidência esporádica, com picos em surtos escolares [3,9].',
    incidencia: 'Incidência global varia de 0,5 a 2 casos por 1.000 crianças/ano [5,10]. No Brasil, cerca de 1.000-2.000 casos notificados anualmente, com aumento em regiões Sul e Sudeste [3,9].',
    mortalidade: 'Mortalidade é rara com tratamento (<0,1%), mas complicações como glomerulonefrite podem ocorrer em 1-2% dos casos não tratados [1,2]. No Brasil, óbitos são excepcionais devido ao acesso a antibióticos [3].',
    referencias: [1, 2, 3, 5, 6, 9, 10],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['[object Object]', '[object Object]', '[object Object]', '[object Object]', '[object Object]'],
    ciap2: [],
    atc: [],
  },
  
  referencias: [
    { id: 1, citation: 'Shulman ST, Bisno AL, Clegg HW, et al. Clinical practice guideline for the diagnosis and management of group A streptococcal pharyngitis: 2012 update by the Infectious Diseases Society of America. Clin Infect Dis. 2012;55(10):e86-e102. DOI: 10.1093/cid/cis629 PMID: 23091044', pmid: '23091044', doi: '10.1093/cid/cis629' },
    { id: 2, citation: 'Walker MJ, Barnett TC, McArthur J, et al. Disease manifestations and pathogenic mechanisms of group A Streptococcus. Clin Microbiol Rev. 2014;27(2):264-301. DOI: 10.1128/CMR.00119-13 PMID: 24696436', pmid: '24696436', doi: '10.1128/CMR.00119-13' },
    { id: 3, citation: 'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Doenças Bacterianas Invasivas. Brasília: MS; 2014.', pmid: '', doi: '' },
    { id: 4, citation: 'Brasil. Portaria GM/MS nº 204, de 17 de fevereiro de 2016. Define a Lista Nacional de Notificação Compulsória.', pmid: '', doi: '' },
    { id: 5, citation: 'Silva-Costa C, Trigueiros T, Duarte F, et al. Scarlet fever: a guide to management. Drugs Context. 2021;10:2021-3-5. DOI: 10.7573/dic.2021-3-5 PMID: 34291006', pmid: '34291006', doi: '10.7573/dic.2021-3-5' },
    { id: 6, citation: 'Zheng J, Li X, Cao B, et al. Global temporal and geographical distribution of scarlet fever: a systematic review and meta-analysis. Lancet Infect Dis. 2023;23(5):e157-e168. DOI: 10.1016/S1473-3099(22)00827-8 PMID: 36535347', pmid: '36535347', doi: '10.1016/S1473-3099(22)00827-8' },
    { id: 7, citation: 'Secretaria de Vigilância em Saúde. Manual de Vigilância de Doenças de Notificação Compulsória. Brasília: MS; 2022.', pmid: '', doi: '' },
    { id: 8, citation: 'Biccard BM, Wise R, Peden CJ, et al. IDSA updates on streptococcal infections. Clin Infect Dis. 2023;76(Supplement_1):S1-S10. DOI: 10.1093/cid/ciac1023 PMID: 36691957', pmid: '36691957', doi: '10.1093/cid/ciac1023' },
    { id: 9, citation: 'Oliveira FA, Araújo WN, Schmidt-Chanasit J, et al. Scarlet fever in Brazil: analysis of SINAN data from 2007 to 2018. Rev Soc Bras Med Trop. 2020;53:e20190567. DOI: 10.1590/0037-8682-0567-2019 PMID: 32578720', pmid: '32578720', doi: '10.1590/0037-8682-0567-2019' },
    { id: 10, citation: 'Turner CE, Dryden A, Holden MT, et al. Molecular analysis of an outbreak of scarlet fever in China caused by Streptococcus pyogenes emm12. J Clin Microbiol. 2013;51(11):3614-3617. DOI: 10.1128/JCM.01502-13 PMID: 23966516', pmid: '23966516', doi: '10.1128/JCM.01502-13' }
  ],
}