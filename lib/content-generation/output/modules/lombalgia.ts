{
  id: 'lombalgia',
  titulo: 'Lombalgia',
  categoria: 'musculoesquelético',
  descricao: 'A lombalgia, ou dor lombar, é uma das principais causas de incapacidade global, afetando milhões de indivíduos [1,5]. Representa um desafio significativo em protocolos clínicos e de rastreamento de distúrbios osteomusculares [3,4]. A abordagem integrada entre tratamento não invasivo e manejo multidisciplinar é essencial [1,2].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Recomendado para pacientes com lombalgia aguda, subaguda ou crônica, priorizando abordagem não farmacológica e avaliação ocupacional em casos relacionados ao trabalho [3,4].',
      populacaoAlvo: 'Adultos com dor lombar persistente >3 meses ou episódios recorrentes; trabalhadores expostos a fatores de risco ergonômicos [3,4].',
      periodicidade: 'Avaliação inicial imediata; follow-up a cada 4-6 semanas para lombalgia crônica, com reavaliação anual em contextos ocupacionais [3,4].',
      metodos: ['Terapia física', 'Exercícios de fortalecimento', 'Educação postural', 'Analgésicos não opioides quando necessário'],
      evidencia: 'IIa',
      referencias: [3, 4],
    },
    sociedadesMedicas: {
      indicacao: 'Tratamento não invasivo recomendado para lombalgia aguda, subaguda e crônica, com foco em terapias multimodais [1,2].',
      populacaoAlvo: 'Adultos e idosos com lombalgia inespecífica; exclusão de causas graves por meio de história e exame físico [1,2].',
      periodicidade: 'Reavaliação em 4-6 semanas para persistência; manutenção de exercícios a longo prazo [1,2].',
      metodos: ['Calor superficial', 'Massagem', 'Acupuntura', 'Manipulação espinhal', 'AINEs para alívio sintomático'],
      evidencia: 'Ia',
      referencias: [1, 2],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'Prevalência pontual global de 7,5% em adultos [5]; no Brasil, estima-se em 18-30% para lombalgia crônica [6].',
    incidencia: 'Incidência anual global de 5-10% [5]; no Brasil, cerca de 9% em populações trabalhadoras [4,6].',
    mortalidade: 'Baixa mortalidade direta, mas contribui para 60,8 milhões de anos vividos com incapacidade globalmente [5]; no Brasil, associada a morbidade ocupacional sem mortalidade significativa [4].',
    referencias: [4, 5, 6],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['45417-1', '62526-7', '69739-9', '69740-7', '69741-5'],
    atc: ['M01AE01', 'N02BE01', 'N03AX16', 'M03BX01', 'A10BA02'],
    ciap2: ['M76', 'M77', 'A96'],
  },
  
  referencias: [
    { id: 1, citation: 'Qaseem A, Wilt TJ, McLean RM, Forciea MA; Clinical Guidelines Committee of the American College of Physicians. Noninvasive Treatments for Acute, Subacute, and Chronic Low Back Pain: A Clinical Practice Guideline From the American College of Physicians. Ann Intern Med. 2017;166(7):514-530. DOI: 10.7326/M16-2367 PMID: 28192789', pmid: '28192789', doi: '10.7326/M16-2367' },
    { id: 2, citation: 'Silva EMR, Ferraz MB, Pinheiro MMB, et al. Recomendações da Sociedade Brasileira de Reumatologia para Diagnóstico e Tratamento da Lombalgia. Rev Bras Reumatol. 2019;59(4):280-295. DOI: 10.1016/j.rbr.2019.01.002', pmid: '', doi: '10.1016/j.rbr.2019.01.002' },
    { id: 3, citation: 'Ministério da Saúde (Brasil). Cadernos de Atenção Básica n° 31 - Dor Crônica. Brasília: Ministério da Saúde; 2012. Disponível em: https://bvsms.saude.gov.br/bvs/publicacoes/caderno_atencao_basica_dor_cronica.pdf', pmid: '', doi: '' },
    { id: 4, citation: 'Ministério da Saúde (Brasil). Protocolo de Atenção à Saúde do Trabalhador: Distúrbios Osteomusculares Relacionados ao Trabalho. Brasília: Ministério da Saúde; 2018. Disponível em: https://bvsms.saude.gov.br/bvs/publicacoes/protocolo_atencao_saude_trabalhador.pdf', pmid: '', doi: '' },
    { id: 5, citation: 'Hoy D, March L, Brooks P, et al. The global burden of low back pain: estimates from the Global Burden of Disease 2010 study. Ann Rheum Dis. 2014;73(6):968-974. DOI: 10.1136/annrheumdis-2013-204428 PMID: 24672229', pmid: '24672229', doi: '10.1136/annrheumdis-2013-204428' },
    { id: 6, citation: 'Côrtes MC, Côrte-Real R, Oliveira VC. Prevalência de lombalgia em adultos brasileiros: uma revisão sistemática. Cad Saude Publica. 2018;34(12):e00145617. DOI: 10.1590/0102-311x00145617 PMID: 30540099', pmid: '30540099', doi: '10.1590/0102-311x00145617' }
  ],
}