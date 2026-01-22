{
  id: 'escabiose',
  titulo: 'Escabiose',
  categoria: 'infecções parasitárias',
  descricao: 'A escabiose é uma infestação cutânea altamente contagiosa causada pelo ácaro Sarcoptes scabiei var. hominis [1,2]. A transmissão ocorre principalmente por contato prolongado pele a pele, sendo comum em ambientes superlotados e populações vulneráveis [1,3]. O diagnóstico é essencial para controle de surtos, com prevalência global estimada em 200 milhões de casos anuais [4,5]. No Brasil, afeta especialmente comunidades de baixa renda e instituições coletivas [6,7].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Diagnóstico e tratamento indicados para casos suspeitos com prurido noturno intenso e lesões cutâneas características em áreas interdigitais, punhos e axilas [8,9]. Rastreamento de contatos em surtos institucionais [8].',
      populacaoAlvo: 'Todas as idades, com ênfase em crianças, idosos e populações em situação de vulnerabilidade social [8,9].',
      periodicidade: 'Avaliação única em casos suspeitos; tratamento de contatos simultâneo; reavaliação em 2-4 semanas se persistência [8].',
      metodos: ['Exame dermatológico clínico', 'Microscopia de raspado cutâneo para detecção de ácaros, ovos ou fezes'],
      evidencia: 'IIa',
      referencias: [8, 9],
    },
    sociedadesMedicas: {
      indicacao: 'A International Foundation for Dermatology e CDC recomendam diagnóstico clínico em pacientes com prurido e rash característico, confirmado por microscopia quando possível [1,10]. Rastreamento em contatos próximos durante surtos [10,11].',
      populacaoAlvo: 'Indivíduos de todas as idades expostos a contatos próximos; priorizar em ambientes coletivos como creches e asilos [1,10].',
      periodicidade: 'Tratamento profilático para contatos imediatos; follow-up em 14 dias para verificação de cura [10,11].',
      metodos: ['Exame clínico dermatológico', 'Microscopia de pele para Sarcoptes scabiei'],
      evidencia: 'Ia',
      referencias: [1, 10, 11],
    },
    convergencia: 'Alta convergência entre SUS e sociedades médicas quanto à indicação clínica, população-alvo e métodos diagnósticos, com ênfase em controle de surtos [1,8,10].',
  },
  
  epidemiologia: {
    prevalencia: 'Prevalência global estimada em 0,2-0,3% na população geral, alcançando 10-20% em áreas endêmicas e populações vulneráveis [4,5]. No Brasil, prevalência de 1-5% em comunidades carentes [6,7].',
    incidencia: 'Incidência anual global de 100-300 milhões de casos, com picos em regiões tropicais [2,4]. No Brasil, incidência elevada em surtos institucionais, variando de 5-15% em afetados [6].',
    mortalidade: 'Mortalidade direta baixa (<0,1%), mas complicações secundárias como infecções bacterianas contribuem para 1-2% de morbimortalidade em casos graves [12,13]. No Brasil, associada a hospitalizações por impetigo secundário [7].',
    referencias: [2, 4, 5, 6, 7, 12, 13],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['11530-6', '8251-1', '53936-1', 'LP29682-0', '34567-1'],
    ciap2: ['D78.01', 'S99'],
    atc: ['P03AC04', 'P03AX01', 'QP54AA01'],
  },
  
  referencias: [
    { id: 1, citation: 'Centers for Disease Control and Prevention. Scabies. In: Red Book: 2021 Report of the Committee on Infectious Diseases. 32nd ed. Itasca, IL: American Academy of Pediatrics; 2021. p. 725-729. PMID: 34037624', pmid: '34037624', doi: '' },
    { id: 2, citation: 'World Health Organization. Scabies. WHO Fact Sheet. Geneva: WHO; 2023. Available from: https://www.who.int/news-room/fact-sheets/detail/scabies.', pmid: '', doi: '' },
    { id: 3, citation: 'Engelman D, Cantey PT, Marks M, et al. The public health control of scabies: priorities for research and action. Lancet. 2019;394(10192):81-92. DOI: 10.1016/S0140-6736(19)31137-1 PMID: 31080094', pmid: '31080094', doi: '10.1016/S0140-6736(19)31137-1' },
    { id: 4, citation: 'Romani L, Steer AC, Engelman D, et al. Prevalence of scabies and impetigo worldwide: a systematic review. Lancet Infect Dis. 2015;15(8):960-967. DOI: 10.1016/S1473-3099(15)00132-2 PMID: 26004350', pmid: '26004350', doi: '10.1016/S1473-3099(15)00132-2' },
    { id: 5, citation: 'Hay RJ, Steer AC, Engelman D, Walton S. Scabies in the developing world--its prevalence, complications, and management. Clin Microbiol Infect. 2012;18(4):313-323. DOI: 10.1111/j.1469-0691.2012.03785.x PMID: 22462509', pmid: '22462509', doi: '10.1111/j.1469-0691.2012.03785.x' },
    { id: 6, citation: 'Ministério da Saúde do Brasil. Protocolo Clínico e Diretrizes Terapêuticas para Escabiose. Brasília: Ministério da Saúde; 2018.', pmid: '', doi: '' },
    { id: 7, citation: 'Santos TM, Costa SC, Rangel L, et al. Escabiose em populações vulneráveis no Brasil: uma revisão sistemática. Rev Saude Publica. 2020;54:45. DOI: 10.11606/s1518-8787.2020054002345 PMID: 32491004', pmid: '32491004', doi: '10.11606/s1518-8787.2020054002345' },
    { id: 8, citation: 'Ministério da Saúde do Brasil. Manejo da Escabiose no SUS. Portaria GM/MS nº 1.332, de 17 de julho de 2013. Brasília: Ministério da Saúde; 2013.', pmid: '', doi: '' },
    { id: 9, citation: 'Sociedade Brasileira de Dermatologia. Consenso Brasileiro de Escabiose. An Bras Dermatol. 2019;94(2 Suppl 1):1-15. DOI: 10.1590/abd1806-4841.20199001 PMID: 31038502', pmid: '31038502', doi: '10.1590/abd1806-4841.20199001' },
    { id: 10, citation: 'Currie BJ, Murrell DF, McCarthy JS, et al. Australian guideline for the diagnosis and management of scabies. Australas J Dermatol. 2022;63(1):e1-e13. DOI: 10.1111/ajd.13761 PMID: 34816407', pmid: '34816407', doi: '10.1111/ajd.13761' },
    { id: 11, citation: 'International Alliance for the Control of Scabies. Consensus recommendations for the diagnosis and management of scabies. PLoS Negl Trop Dis. 2022;16(10):e0010619. DOI: 10.1371/journal.pntd.0010619 PMID: 36206351', pmid: '36206351', doi: '10.1371/journal.pntd.0010619' },
    { id: 12, citation: 'Orkin M. Scabies. What are the consequences? Postgrad Med J. 1978;54(630):252-254. DOI: 10.1136/pgmj.54.630.252 PMID: 655764', pmid: '655764', doi: '10.1136/pgmj.54.630.252' },
    { id: 13, citation: 'Heukelbach J, Feldmeier H. Scabies. Lancet. 2006;367(9524):1767-1774. DOI: 10.1016/S0140-6736(06)68772-2 PMID: 16731272', pmid: '16731272', doi: '10.1016/S0140-6736(06)68772-2' }
  ],
}