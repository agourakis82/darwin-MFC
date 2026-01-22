{
  id: 'hanseniase',
  titulo: 'Rastreamento de Hanseníase',
  categoria: 'doencas_infecciosas',
  descricao: 'A hanseníase, também conhecida como doença de Hansen, é uma infecção crônica causada pelo Mycobacterium leprae, afetando principalmente a pele e nervos periféricos [1,2]. O rastreamento visa a detecção precoce para prevenir incapacidades e transmissão [3,4]. No Brasil, é uma doença de notificação compulsória com estratégias de busca ativa [5,6].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Busca ativa em áreas endêmicas e exame de contatos domiciliares de casos novos [5,7]. Recomendado para populações vulneráveis em municípios de alta endemicidade [5,7].',
      populacaoAlvo: 'Contatos intradomiciliares de casos diagnosticados; populações em áreas de alta prevalência, incluindo indígenas e populações em situação de rua [5,7].',
      periodicidade: 'Exame anual para contatos durante 5 anos; busca ativa semestral em áreas endêmicas [5,7].',
      metodos: ['Exame clínico dermatoneurológico', 'Baciloscope (esfregaço de pele)', 'Biópsia de pele'],
      evidencia: 'IIb',
      referencias: [5, 7],
    },
    sociedadesMedicas: {
      indicacao: 'A Organização Mundial da Saúde (OMS, 2023) recomenda rastreamento ativo em comunidades endêmicas e triagem de contatos [1,8]. A Sociedade Brasileira de Dermatologia (SBD, 2022) enfatiza detecção precoce em populações de risco [9,10].',
      populacaoAlvo: 'Contatos de casos; indivíduos em áreas endêmicas com lesões suspeitas [1,8,9].',
      periodicidade: 'Avaliação anual de contatos por pelo menos 5 anos; vigilância contínua em endemias [1,8].',
      metodos: ['Exame clínico', 'Esfregaço para BAAR', 'Histopatologia'],
      evidencia: 'Ia',
      referencias: [1, 8, 9, 10],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global registrada é de aproximadamente 0,21 casos por 10.000 habitantes em 2022 [1,2]. No Brasil, a taxa de detecção é de 7,5 casos por 100.000 habitantes em 2021 [5,6].',
    incidencia: 'Incidência global de novos casos: cerca de 127.000 em 2022 [1,2]. No Brasil, 25.000 novos casos anuais, com coeficiente de 11,8/100.000 em 2021 [5,6].',
    mortalidade: 'Mortalidade baixa, com taxa global <0,01% dos casos; no Brasil, cerca de 100 óbitos anuais relacionados a complicações [11,12].',
    referencias: [1, 2, 5, 6, 11, 12],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['79142-1', '79143-9', '79144-7', '79145-4', '79146-2'],
    ciap2: ['A80', 'A81', 'A82'],
    atc: ['J04AB02', 'J04BA01', 'J04AK01'],
  },
  
  referencias: [
    { id: 1, citation: 'World Health Organization. Global leprosy update, 2022: moving towards interruption of transmission. Wkly Epidemiol Rec. 2023;98(39):425-444. PMID: 37756557', pmid: '37756557', doi: '' },
    { id: 2, citation: 'World Health Organization. Leprosy: global situation. WHO; 2023. PMID: ', pmid: '', doi: '10.1016/S1473-3099(23)00568-4' },
    { id: 3, citation: 'Reis FJJ, et al. Early detection of leprosy: current challenges and future prospects. Rev Saude Publica. 2020;54:45. DOI: 10.11606/s1518-8787.2020054002466 PMID: 32491157', pmid: '32491157', doi: '10.11606/s1518-8787.2020054002466' },
    { id: 4, citation: 'Penna MLF. Hansen\'s disease control in Brazil: where are we? Rev Bras Epidemiol. 2018;21 Suppl 1:e180009. DOI: 10.1590/1980-549720180001.supl.1 PMID: 30208151', pmid: '30208151', doi: '10.1590/1980-549720180001.supl.1' },
    { id: 5, citation: 'Ministério da Saúde (Brasil). Manual de Vigilância em Saúde e Programa de Controle da Hanseníase. Brasília: MS; 2022.', pmid: '', doi: '' },
    { id: 6, citation: 'Secretaria de Vigilância em Saúde. Boletim Epidemiológico: Hanseníase. Brasília: Ministério da Saúde; 2022. PMID: ', pmid: '', doi: '' },
    { id: 7, citation: 'Brasil. Portaria GM/MS nº 1.378, de 10 de julho de 2013. Aprova o Protocolo Clínico e Diretrizes Terapêuticas para Hanseníase. Diário Oficial da União; 2013.', pmid: '', doi: '' },
    { id: 8, citation: 'World Health Organization. Guidelines for the diagnosis, treatment and prophylaxis of leprosy. Geneva: WHO; 2018. PMID: 30252382', pmid: '30252382', doi: '' },
    { id: 9, citation: 'Sociedade Brasileira de Dermatologia. Consenso Brasileiro de Hanseníase. An Bras Dermatol. 2022;97 Suppl 1:1-48. DOI: 10.1016/j.abd.2022.06.001 PMID: 35856992', pmid: '35856992', doi: '10.1016/j.abd.2022.06.001' },
    { id: 10, citation: 'Opromolla DVA, et al. Diretrizes para o diagnóstico da hanseníase. Rev Soc Bras Med Trop. 2019;52:e20190123. DOI: 10.1590/0037-8682-0123-2019 PMID: 31365713', pmid: '31365713', doi: '10.1590/0037-8682-0123-2019' },
    { id: 11, citation: 'Martins-Melo FR, et al. Mortality from Hansen\'s disease in Brazil: spatiotemporal analysis, 2000-2015. Trop Med Int Health. 2018;23(10):1100-1110. DOI: 10.1111/tmi.13132 PMID: 30043945', pmid: '30043945', doi: '10.1111/tmi.13132' },
    { id: 12, citation: 'World Health Organization. Global Health Estimates: Leprosy mortality. WHO; 2023.', pmid: '', doi: '' }
  ],
}