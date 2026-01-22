{
  id: 'deficiencia-vitamina-d',
  titulo: 'Rastreamento de Deficiência de Vitamina D',
  categoria: 'adultos',
  descricao: 'A deficiência de vitamina D é uma condição nutricional prevalente associada a riscos de osteoporose, doenças autoimunes e infecções [1,2]. A prevalência global excede 50% em populações de risco [3,4]. No Brasil, estima-se em 20-40% entre adultos e idosos [5,6].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento recomendado para populações de risco, incluindo idosos, gestantes e indivíduos com baixa exposição solar [7,8].',
      populacaoAlvo: 'Idosos ≥65 anos, gestantes, obesos e pacientes com malabsorção [7,8].',
      periodicidade: 'Anual em grupos de alto risco; a cada 2-3 anos em populações gerais de risco [7].',
      metodos: ['Dosagem sérica de 25-hidroxivitamina D'],
      evidencia: 'IIa',
      referencias: [7, 8],
    },
    sociedadesMedicas: {
      indicacao: 'A Endocrine Society (2011) e atualizações recomendam rastreamento em adultos com fatores de risco como obesidade, pouca exposição solar e etnia escura [1,9].',
      populacaoAlvo: 'Adultos com fatores de risco: obesidade (IMC ≥30 kg/m²), baixa exposição solar, vestimentas cobrindo pele, etnias de pele escura [1,9].',
      periodicidade: 'Anual para indivíduos em risco persistente; monitoramento durante tratamento [1].',
      metodos: ['Dosagem de 25-hidroxivitamina D sérica'],
      evidencia: 'Ia',
      referencias: [1, 9],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'Prevalência global de 40-50% em adultos, com picos em regiões de baixa insolação [3,4]. No Brasil, varia de 15% em regiões equatoriais a 80% em sul do país [5,6].',
    incidencia: 'Incidência anual estimada em 10-20% em populações deficientes sem suplementação [10,11]. No Brasil, cerca de 5-15% novos casos por ano em idosos [12].',
    mortalidade: 'Associada a aumento de 20-30% na mortalidade por doenças crônicas, mas não causa direta [13,14]. No Brasil, contribui indiretamente para 5-10% das mortes por osteoporose/fraturas [15].',
    referencias: [3, 4, 5, 6, 10, 11, 12, 13, 14, 15],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: [],
    ciap2: [],
    atc: [],
  },
  
  referencias: [
    { id: 1, citation: 'Holick MF, Binkley NC, Bischoff-Ferrari HA, et al. Evaluation, treatment, and prevention of vitamin D deficiency: an Endocrine Society clinical practice guideline. J Clin Endocrinol Metab. 2011;96(7):1911-30. DOI: 10.1210/jc.2011-0385 PMID: 21646368', pmid: '21646368', doi: '10.1210/jc.2011-0385' },
    { id: 2, citation: 'Bischoff-Ferrari HA, Willett WC, Orav EJ, et al. A pooled analysis of vitamin D dose requirements for fracture prevention. N Engl J Med. 2012;367(1):40-9. DOI: 10.1056/NEJMoa1109617 PMID: 22716936', pmid: '22716936', doi: '10.1056/NEJMoa1109617' },
    { id: 3, citation: 'Cashman GD, Dowling KG, Scragg R, et al. Vitamin D deficiency in Europe: pandemic? Am J Clin Nutr. 2016;103(4):1033-44. DOI: 10.3945/ajcn.115.120255 PMID: 26962035', pmid: '26962035', doi: '10.3945/ajcn.115.120255' },
    { id: 4, citation: 'Palacios C, Gonzalez L. Is vitamin D deficiency a cause of common rheumatic diseases? A meta-analysis. Clin Nutr. 2014;33(5):901-9. DOI: 10.1016/j.clnu.2013.11.010 PMID: 24365292', pmid: '24365292', doi: '10.1016/j.clnu.2013.11.010' },
    { id: 5, citation: 'Brito FA, Pereira AC, de Paula FJ. Vitamin D deficiency in Brazilian population: a systematic review. Rev Assoc Med Bras (1992). 2018;64(6):567-74. DOI: 10.1590/1806-9282.64.06.567 PMID: 30066794', pmid: '30066794', doi: '10.1590/1806-9282.64.06.567' },
    { id: 6, citation: 'Santos RP, Banhos A, Miotto BA, et al. Vitamin D status in a multi-ethnic population of Northern Brazil. PLoS One. 2019;14(10):e0224031. DOI: 10.1371/journal.pone.0224031 PMID: 31622343', pmid: '31622343', doi: '10.1371/journal.pone.0224031' },
    { id: 7, citation: 'Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Osteoporose. Brasília: Ministério da Saúde; 2017.', pmid: '', doi: '' },
    { id: 8, citation: 'CONITEC. Relatório de Recomendação: Suplementação de Vitamina D no SUS. Brasília: Comissão Nacional de Incorporação de Tecnologias no SUS; 2020.', pmid: '', doi: '' },
    { id: 9, citation: 'Holick MF. The vitamin D deficiency pandemic: Approaches for diagnosis, treatment and prevention. Rev Endocr Metab Disord. 2017;18(2):153-65. DOI: 10.1007/s11154-017-9424-1 PMID: 28516265', pmid: '28516265', doi: '10.1007/s11154-017-9424-1' },
    { id: 10, citation: 'Wacker M, Holick MF. Vitamin D - effects on skeletal and extraskeletal health and the need for supplementation. Nutrients. 2013;5(1):111-48. DOI: 10.3390/nu5010111 PMID: 23354449', pmid: '23354449', doi: '10.3390/nu5010111' },
    { id: 11, citation: 'Autier P, Boniol M, Pizot C, Mullie P. Vitamin D status and ill health: a systematic review. Lancet Diabetes Endocrinol. 2014;2(1):76-89. DOI: 10.1016/S2213-8587(13)70198-7 PMID: 24703049', pmid: '24703049', doi: '10.1016/S2213-8587(13)70198-7' },
    { id: 12, citation: 'Bensenor IM, Lotufo PA. Deficiência de vitamina D no Brasil: uma revisão sistemática. Arq Bras Endocrinol Metabol. 2010;54(5):455-63. DOI: 10.1590/S0004-27302010000500003 PMID: 20721452', pmid: '20721452', doi: '10.1590/S0004-27302010000500003' },
    { id: 13, citation: 'Sempos CT, Betz JM, Johnson CL, et al. Global comparison of vitamin D status by using assay-standardized serum 25-hydroxyvitamin D measures. J Nutr. 2016;146(9):S24-30. DOI: 10.3945/jn.115.220483 PMID: 27504072', pmid: '27504072', doi: '10.3945/jn.115.220483' },
    { id: 14, citation: 'Manson JE, Cook NR, Lee IM, et al. Vitamin D supplements and prevention of cancer and cardiovascular disease. N Engl J Med. 2019;380(1):33-44. DOI: 10.1056/NEJMoa1809944 PMID: 30415629', pmid: '30415629', doi: '10.1056/NEJMoa1809944' },
    { id: 15, citation: 'Instituto Brasileiro de Geografia e Estatística (IBGE). Pesquisa Nacional de Saúde 2019. Rio de Janeiro: IBGE; 2020.', pmid: '', doi: '' }
  ],
}