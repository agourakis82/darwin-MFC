{
  id: 'osteoporose',
  titulo: 'Diagnóstico e Tratamento da Osteoporose',
  categoria: 'mulheres pós-menopausa',
  descricao: 'A osteoporose é uma doença metabólica óssea caracterizada por baixa massa óssea, deterioração da microarquitetura óssea e aumento do risco de fraturas [1,2,3]. A introdução da dual-energy X-ray absorptiometry (DXA) revolucionou o diagnóstico e manejo da osteoporose desde os anos 1980 [1]. No Brasil, a osteoporose é considerada um problema de saúde pública, com alta incidência de fraturas em mulheres pós-menopausa [12,13]. O diagnóstico baseia-se em T-score ≤ -2,5 pela DXA, além de avaliação de risco de fraturas [2,3,11].',

  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento por DXA recomendado para mulheres pós-menopausa ≥65 anos ou com fatores de risco como fratura prévia, uso de glicocorticoides ou baixa massa óssea [13,14]. Tratamento com bifosfonatos ou denosumabe para T-score ≤ -2,5 ou fratura osteoporótica [13,14].',
      populacaoAlvo: 'Mulheres pós-menopausa ≥65 anos; mulheres <65 anos com fatores de risco (fratura, raquitismo, hipogonadismo) [13,14].',
      periodicidade: 'DXA a cada 1-2 anos em pacientes de alto risco; monitoramento anual para tratamento com denosumabe [14].',
      metodos: ['DXA para densitometria óssea', 'Avaliação de FRAX para risco de fratura', 'Denosumabe subcutâneo'],
      evidencia: 'IIa',
      referencias: [13, 14],
    },
    sociedadesMedicas: {
      indicacao: 'A AACE/ACE (2020) recomenda DXA para mulheres ≥65 anos e homens ≥70 anos; tratamento farmacológico para T-score ≤ -2,5 ou fratura de fragilidade [11]. Diretrizes Brasileiras (2021) enfatizam screening em mulheres pós-menopausa com risco [12]. Austrian Society (2024) atualiza para inclusão de REMS como alternativa não-ionizante [3,8].',
      populacaoAlvo: 'Mulheres ≥65 anos pós-menopausa; homens ≥70 anos; indivíduos com fraturas ou fatores de risco (ex.: corticoides, tabagismo) [3,11,12].',
      periodicidade: 'Repetir DXA a cada 2 anos ou conforme risco; monitoramento anual para terapia anti-reabsortiva [11,12].',
      metodos: ['DXA', 'REMS para avaliação de força óssea', 'FRAX tool', 'Teriparatida ou denosumabe para casos graves'],
      evidencia: 'Ia',
      referencias: [3, 8, 11, 12],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de osteoporose em mulheres >50 anos é de cerca de 18-23%, com maior incidência em países desenvolvidos [3,5,11]. No Brasil, estima-se em 10-15% em mulheres pós-menopausa [12,13].',
    incidencia: 'Incidência de fraturas osteoporóticas é de 1-2 por 100 mulheres/ano >50 anos globalmente [1,3,5]. No Brasil, fraturas vertebrais afetam 20% das mulheres >65 anos [12,13].',
    mortalidade: 'Fraturas de quadril associadas a 20% de mortalidade em 1 ano [3,11,12]. No Brasil, osteoporose contribui para 5-10% das mortes por DCNT em idosos [13].',
    referencias: [1, 3, 5, 11, 12, 13],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['6954-4', '14836-4', '14837-2', '20107-5', 'F15950-8'],
    ciap2: [],
    atc: ['M05BA01', 'M05BB05', 'M05BX03', 'H05AA02', 'G03CC05'],
  },
  
  referencias: [
    { id: 1, citation: 'Authors. Updated practice guideline for dual-energy X-ray absorptiometry (DXA). European journal of nuclear medicine and molecular imaging. 2025. DOI: 10.1007/s00259-024-06912-6 PMID: 39316095', pmid: '39316095', doi: '10.1007/s00259-024-06912-6' },
    { id: 2, citation: 'Authors. Diagnosis of osteoporosis. Revue medicale de Liege. 2023. PMID: 37830325', pmid: '37830325', doi: '' },
    { id: 3, citation: 'Authors. Osteoporosis-Definition, risk assessment, diagnosis, prevention and treatment (update 2024): Guidelines of the Austrian Society for Bone and Mineral Research. Wiener klinische Wochenschrift. 2024. DOI: 10.1007/s00508-024-02441-2 PMID: 39356323', pmid: '39356323', doi: '10.1007/s00508-024-02441-2' },
    { id: 4, citation: 'Authors. No title. Journal of obstetrics and gynaecology Canada: JOGC. 2022. DOI: 10.1016/j.jogc.2022.03.004 PMID: 35577425', pmid: '35577425', doi: '10.1016/j.jogc.2022.03.004' },
    { id: 5, citation: 'Authors. Consensus Development Conference. Prevention and treatment of osteoporosis. Nordisk medicin. 1991. PMID: 2047235', pmid: '2047235', doi: '' },
    { id: 6, citation: 'Authors. Radiofrequency ablation of thyroid nodules: "Good Clinical Practice Recommendations" for Austria. Wiener medizinische Wochenschrift (1946). 2020. DOI: 10.1007/s10354-019-0682-2 PMID: 30725443', pmid: '30725443', doi: '10.1007/s10354-019-0682-2' },
    { id: 7, citation: 'Author. Revision consensus osteoporosis. Nederlands tijdschrift voor geneeskunde. 1992. PMID: 1614568', pmid: '1614568', doi: '' },
    { id: 8, citation: 'Authors. Radiofrequency echographic multi-spectrometry for the in-vivo assessment of bone strength: state of the art-outcomes of an expert consensus meeting organized by the European Society for Clinical and Economic Aspects of Osteoporosis, Osteoarthritis and Musculoskeletal Diseases (ESCEO). Aging clinical and experimental research. 2019. DOI: 10.1007/s40520-019-01294-4 PMID: 31422565', pmid: '31422565', doi: '10.1007/s40520-019-01294-4' },
    { id: 9, citation: 'Authors. Fertility preservation, contraception and menopause hormone therapy in women treated for rare ovarian tumors: Guidelines from the French national network dedicated to rare gynaecological cancer. Bulletin du cancer. 2018. DOI: 10.1016/j.bulcan.2017.10.032 PMID: 29397916', pmid: '29397916', doi: '10.1016/j.bulcan.2017.10.032' },
    { id: 10, citation: 'Authors. Guidelines of the Brazilian Society of Rheumatology for the diagnosis and treatment of osteoporosis in men. Revista brasileira de reumatologia. 2017. DOI: 10.1016/j.rbre.2017.07.003 PMID: 28800970', pmid: '28800970', doi: '10.1016/j.rbre.2017.07.003' },
    { id: 11, citation: 'American Association of Clinical Endocrinologists. AACE/ACE Clinical Practice Guidelines for the Diagnosis and Treatment of Postmenopausal Osteoporosis. 2020. URL: https://www.aace.com/disease-and-conditions/bone-and-parathyroid/osteoporosis', pmid: '', doi: '' },
    { id: 12, citation: 'Sociedade Brasileira de Endocrinologia e Metabologia. Diretrizes Brasileiras para o Diagnóstico e Tratamento da Osteoporose em Mulheres na Pós-menopausa. 2021. URL: https://www.sbem.org.br/', pmid: '', doi: '' },
    { id: 13, citation: 'Ministério da Saúde (Brazil). PCDT - Osteoporose. 2014. URL: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2014/pcdt_osteoporose.pdf', pmid: '', doi: '' },
    { id: 14, citation: 'CONITEC - Comissão Nacional de Incorporação de Tecnologias. Protocolo de Uso - Denosumabe para Osteoporose. 2022. URL: https://www.gov.br/conitec/pt-br', pmid: '', doi: '' }
  ],
}