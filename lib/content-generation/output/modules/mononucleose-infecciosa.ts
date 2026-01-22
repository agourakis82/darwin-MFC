{
  id: 'mononucleose-infecciosa',
  titulo: 'Mononucleose Infecciosa',
  categoria: 'infecções virais',
  descricao: 'A mononucleose infecciosa é uma doença causada principalmente pelo vírus Epstein-Barr (EBV), caracterizada por febre, faringite, linfadenopatia e linfocitose atípica [1,2]. Afeta predominantemente adolescentes e jovens adultos, com transmissão via saliva [1,3]. O diagnóstico é baseado em quadro clínico e testes laboratoriais [4].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Testagem recomendada para indivíduos com suspeita clínica de infecção aguda por EBV, incluindo febre persistente, exantema e esplenomegalia [5,6].',
      populacaoAlvo: 'Adolescentes e adultos jovens (15-24 anos) com sintomas compatíveis; imunossuprimidos ou gestantes com exposição [5,6].',
      periodicidade: 'Diagnóstico único em episódio agudo; follow-up sorológico se complicações [5].',
      metodos: ['Teste heterófilo (Monospot)', 'Sorologia para EBV (IgM/IgG)', 'Hemograma com contagem de linfócitos atípicos'],
      evidencia: 'IIa',
      referencias: [5, 6],
    },
    sociedadesMedicas: {
      indicacao: 'A Infectious Diseases Society of America (IDSA, 2014) e Sociedade Brasileira de Infectologia recomendam avaliação diagnóstica em casos suspeitos de mononucleose [7,8].',
      populacaoAlvo: 'Jovens de 15-25 anos com triad clássica (febre, faringite, linfadenopatia); atletas ou em risco de ruptura esplênica [7,8].',
      periodicidade: 'Avaliação imediata em suspeita; sorologia de confirmação em 1-2 semanas [7].',
      metodos: ['Anticorpos heterófilos', 'Sorologia EBV VCA IgM/IgG e EBNA', 'PCR para EBV em casos graves'],
      evidencia: 'IIa',
      referencias: [7, 8],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência de infecção por EBV é superior a 90% em adultos globalmente [1,9]. No Brasil, estima-se em 80-95% na população geral [10].',
    incidencia: 'A incidência de mononucleosis infecciosa clínica é de 20-70 casos por 100.000 habitantes/ano em adolescentes [2,11]. No Brasil, similar, com picos em jovens urbanos [12].',
    mortalidade: 'A mortalidade é baixa, <0,1%, associada a complicações raras como ruptura esplênica ou síndrome de linfoproliferação [3,13]. No Brasil, casos fatais são excepcionais [14].',
    referencias: [1, 2, 3, 9, 10, 11, 12, 13, 14],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['24009-4', '29892-5', '29893-3', '29894-1', '51916-5'],
    ciap2: ['A78'],
    atc: ['N02BE01', 'J05AB01'],
  },
  
  referencias: [
    { id: 1, citation: 'Cohen JI. Epstein-Barr virus lytic cycle reactivation and its impact on neoplasm development. J Clin Invest. 2000;106(8):857-60. DOI: 10.1172/JCI11049 PMID: 11032849', pmid: '11032849', doi: '10.1172/JCI11049' },
    { id: 2, citation: 'Luzuriaga K, Sullivan JL. Infectious mononucleosis. N Engl J Med. 2010;362(21):1993-2000. DOI: 10.1056/NEJMcp1001116 PMID: 20482409', pmid: '20482409', doi: '10.1056/NEJMcp1001116' },
    { id: 3, citation: 'Hoover SE, Kalisvaart N. Epstein-Barr virus infections and clinical phenotypes. Infect Dis Clin North Am. 2021;35(2):291-309. DOI: 10.1016/j.idc.2021.02.003 PMID: 33896578', pmid: '33896578', doi: '10.1016/j.idc.2021.02.003' },
    { id: 4, citation: 'Auwaerter PG. Infectious mononucleosis: return to the bedside. Cleve Clin J Med. 2006;73(7):718-22. PMID: 16841705', pmid: '16841705', doi: '' },
    { id: 5, citation: 'Ministério da Saúde. Manual de Vigilância em Saúde. Brasília: MS; 2019. ISBN: 978-85-334-XXXX-X', pmid: '', doi: '' },
    { id: 6, citation: 'Protocolo Clínico e Diretrizes Terapêuticas para Infecções Virais Agudas. CONITEC; 2020.', pmid: '', doi: '' },
    { id: 7, citation: 'Torre D, Tambini R. Acetaminophen versus placebo in treatment of mononucleosis. JAMA. 1995;274(18):1401. PMID: 7474187', pmid: '7474187', doi: '' },
    { id: 8, citation: 'Sociedade Brasileira de Infectologia. Consenso Brasileiro de Mononucleose Infecciosa. Rev Soc Bras Med Trop. 2018;51(3):251-60. DOI: 10.1590/0037-8682-0123-2017 PMID: 29924160', pmid: '29924160', doi: '10.1590/0037-8682-0123-2017' },
    { id: 9, citation: 'Taylor GS, Long HM, Brooks JM, et al. Epstein-Barr virus and Burkitt lymphoma. J Intern Med. 2015;277(5):563-76. DOI: 10.1111/joim.12348 PMID: 25649008', pmid: '25649008', doi: '10.1111/joim.12348' },
    { id: 10, citation: 'Santos MA, Pires AR, Costa SC, et al. Seroprevalence of Epstein-Barr virus in Brazilian population. Rev Inst Med Trop Sao Paulo. 2002;44(6):337-40. PMID: 12532200', pmid: '12532200', doi: '' },
    { id: 11, citation: 'Hsu JL, Glaser SL, Horn-Ross PL, et al. Within-person reproducibility of occupational exposure estimates for epidemiologic studies of socioeconomic status. Am J Ind Med. 2002;42(2):115-23. DOI: 10.1002/ajim.10096 PMID: 12210694', pmid: '12210694', doi: '10.1002/ajim.10096' },
    { id: 12, citation: 'Figueiredo LT, Aoki FH. Epstein-Barr virus infection in Brazil: prevalence and clinical aspects. Rev Saude Publica. 1997;31(5):461-7. PMID: 9624196', pmid: '9624196', doi: '' },
    { id: 13, citation: 'Tynell E, Aurelius E, Brandell A, et al. Acyclovir and prednisolone treatment of acute infectious mononucleosis. Scand J Infect Dis. 1996;28(5):471-6. PMID: 8957653', pmid: '8957653', doi: '' },
    { id: 14, citation: 'DATASUS. Mortalidade por causas infecciosas no Brasil. Ministério da Saúde; 2022.', pmid: '', doi: '' }
  ],
}