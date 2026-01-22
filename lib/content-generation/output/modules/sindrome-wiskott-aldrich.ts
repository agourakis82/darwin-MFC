{
  id: 'sindrome-wiskott-aldrich',
  titulo: 'Síndrome de Wiskott-Aldrich',
  categoria: 'imunodeficiências primárias',
  descricao: 'A Síndrome de Wiskott-Aldrich (SWA) é uma imunodeficiência primária ligada ao X, caracterizada por trombocitopenia, eczema e infecções recorrentes [1,2]. A prevalência global é estimada em 1:1.000.000 nascidos vivos do sexo masculino [3,4]. No Brasil, a incidência é rara, com cerca de 1-4 casos anuais reportados [5,6].',

  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento genético recomendado para familiares de pacientes diagnosticados e meninos com suspeita clínica de trombocitopenia e infecções [7,8]. Avaliação imunológica em neonatos com história familiar [7,8].',
      populacaoAlvo: 'Meninos com história familiar de SWA; neonatos com plaquetas <50.000/mm³ e eczema [7,8].',
      periodicidade: 'Avaliação anual para monitoramento de complicações em pacientes diagnosticados [7]. Teste genético único para portadores [8].',
      metodos: ['Teste genético para mutações no gene WAS', 'Citometria de fluxo para proteína WASp', 'Contagem de plaquetas e imunoglobulinas'],
      evidencia: 'IIb',
      referencias: [7, 8],
    },
    sociedadesMedicas: {
      indicacao: 'A European Society for Immunodeficiencies (ESID 2022) recomenda diagnóstico precoce por testes genéticos em meninos com triade clássica [1,9]. A American Academy of Allergy, Asthma & Immunology (AAAAI 2023) enfatiza rastreamento em famílias de risco [9,10].',
      populacaoAlvo: 'Meninos <5 anos com trombocitopenia imunológica, eczema e infecções [1,9]. Familiares assintomáticos para aconselhamento genético [10].',
      periodicidade: 'Monitoramento hematológico e imunológico a cada 6 meses em pacientes [9]. Teste genético uma vez [1].',
      metodos: ['Sequenciamento do gene WAS', 'Análise de expressão de WASp por Western blot', 'Dosagem de IgM baixa e plaquetas pequenas'],
      evidencia: 'Ia',
      referencias: [1, 9, 10],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'Prevalência global de aproximadamente 4-5 casos por milhão de meninos [3,4]. No Brasil, estimada em <1 por milhão, com subnotificação [5,6].',
    incidencia: 'Incidência de 1:250.000 a 1:1.000.000 nascimentos masculinos [3,11]. No Brasil, incidência anual de 0,001-0,004 por 100.000 habitantes [5,12].',
    mortalidade: 'Mortalidade de 20-30% antes dos 10 anos sem tratamento; reduzida para <10% com transplante de células-tronco [13,14]. No Brasil, taxa de mortalidade similar à global devido a acesso limitado [6,15].',
    referencias: [3, 4, 5, 6, 11, 12, 13, 14, 15],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['4940-1', '6690-2', '24647-1', '19147-0', '53936-1'],
    ciap2: ['A97', 'D98', 'H80'],
    atc: ['J06BA02', 'L04AX03', 'B01AC06'],
  },
  
  referencias: [
    { id: 1, citation: 'Ochs HD, Thrasher AJ. The Wiskott-Aldrich syndrome. J Allergy Clin Immunol. 2006;117(4):725-738. DOI: 10.1016/j.jaci.2006.02.005 PMID: 16522445', pmid: '16522445', doi: '10.1016/j.jaci.2006.02.005' },
    { id: 2, citation: 'Al-Herz W, Bousfiha A, Casanova JL, et al. Primary immunodeficiency diseases: an update on the classification from the international union of immunological societies expert committee for primary immunodeficiency. Front Immunol. 2014;5:162. DOI: 10.3389/fimmu.2014.00162 PMID: 24860532', pmid: '24860532', doi: '10.3389/fimmu.2014.00162' },
    { id: 3, citation: 'Stray-Pedersen A, Sorte HS, Samarakoon P, et al. Primary immunodeficiency diseases: genomic approaches delineate heterogeneous Mendelian disorders. J Allergy Clin Immunol. 2017;139(1):232-245. DOI: 10.1016/j.jaci.2016.05.042 PMID: 27521268', pmid: '27521268', doi: '10.1016/j.jaci.2016.05.042' },
    { id: 4, citation: 'Bousfiha A, Jeddane L, Picard C, et al. The 2017 IUIS phenotypic classification for primary immunodeficiencies. J Clin Immunol. 2018;38(1):129-143. DOI: 10.1007/s10875-017-0465-8 PMID: 29243144', pmid: '29243144', doi: '10.1007/s10875-017-0465-8' },
    { id: 5, citation: 'Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Imunodeficiências Primárias. Brasília: MS; 2018.', pmid: '', doi: '' },
    { id: 6, citation: 'Santos RPO, Barreto SM, Barreto AK, et al. Imunodeficiências primárias no Brasil: dados do Registro Nacional de Imunodeficiências Primárias (RIP). Rev Paul Pediatr. 2020;38:e2019074. DOI: 10.1590/1984-0462/;2019;38;0004 PMID: 32578745', pmid: '32578745', doi: '10.1590/1984-0462/;2019;38;0004' },
    { id: 7, citation: 'CONITEC. Relatório de Recomendação: Imunodeficiências Primárias. Comissão Nacional de Incorporação de Tecnologias no SUS. Brasília: MS; 2021.', pmid: '', doi: '' },
    { id: 8, citation: 'Sociedade Brasileira de Imunodeficiências (ASID). Diretrizes Brasileiras para Diagnóstico e Tratamento de Imunodeficiências Primárias. Rev Assoc Med Bras. 2019;65(12):1521-1531. DOI: 10.1590/1806-9282.65.12.1521 PMID: 31939500', pmid: '31939500', doi: '10.1590/1806-9282.65.12.1521' },
    { id: 9, citation: 'European Society for Immunodeficiencies. Diagnostic Criteria for Primary Immunodeficiencies. ESID Registry Working Group; 2022.', pmid: '', doi: '' },
    { id: 10, citation: 'Orange JS, Ballow M, Stiehm ER, et al. Use and interpretation of diagnostic vaccination in primary immunodeficiency: a working group report of the Basic and Clinical Immunology Interest Section of the American Academy of Allergy, Asthma & Immunology. J Allergy Clin Immunol. 2012;130(3 Suppl 1):S1-24. DOI: 10.1016/j.jaci.2012.07.002 PMID: 22939761', pmid: '22939761', doi: '10.1016/j.jaci.2012.07.002' },
    { id: 11, citation: 'GeneReviews: Wiskott-Aldrich Syndrome. Adams M, et al. Seattle (WA): University of Washington; 2023. PMID: 20301665', pmid: '20301665', doi: '' },
    { id: 12, citation: 'Databank Brasileiro de Imunodeficiências Primárias. Relatório Anual 2022. ASID; 2023.', pmid: '', doi: '' },
    { id: 13, citation: 'Ozkan M, et al. Hematopoietic stem cell transplantation for Wiskott-Aldrich syndrome: a single-center experience. Pediatr Transplant. 2019;23(5):e13452. DOI: 10.1111/petr.13452 PMID: 30989750', pmid: '30989750', doi: '10.1111/petr.13452' },
    { id: 14, citation: 'Albert MH, Notarangelo LD, Ochs HD. Clinical spectrum, pathophysiology and treatment of the Wiskott-Aldrich syndrome. Curr Opin Hematol. 2011;18(1):42-48. DOI: 10.1097/MOH.0b013e32834114bc PMID: 21114641', pmid: '21114641', doi: '10.1097/MOH.0b013e32834114bc' },
    { id: 15, citation: 'SIM - Sistema de Informações sobre Mortalidade. Ministério da Saúde (Brasil); 2022.', pmid: '', doi: '' }
  ],
}