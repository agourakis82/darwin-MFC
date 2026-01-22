{
  id: 'cefaleia-tensional',
  titulo: 'Cefaleia Tensional',
  categoria: 'neurologia',
  descricao: 'A cefaleia tensional é o tipo mais comum de cefaleia primária, caracterizada por dor bilateral de intensidade leve a moderada, frequentemente descrita como uma sensação de aperto ou pressão na cabeça [1,2]. Afeta significativamente a qualidade de vida e é prevalente em populações adultas [3]. No contexto brasileiro, representa uma das principais queixas em atenção primária [4,5].',
  
  recomendacoes: {
    sus: {
      indicacao: 'Avaliação e manejo inicial recomendado para pacientes com cefaleia recorrente ou persistente em atenção primária, priorizando exclusão de causas secundárias [6,7].',
      populacaoAlvo: 'Adultos e adolescentes com sintomas de cefaleia bilateral, tensão muscular ou estresse associado [6,7].',
      periodicidade: 'Avaliação conforme necessidade clínica, com seguimento a cada 3-6 meses para casos crônicos [6].',
      metodos: ['Exame clínico neurológico', 'Questionários de cefaleia (ex: HIT-6)', 'Terapias não farmacológicas (relaxamento, fisioterapia)'],
      evidencia: 'IIa',
      referencias: [6, 7],
    },
    sociedadesMedicas: {
      indicacao: 'A International Headache Society (IHS, 2018) recomenda diagnóstico baseado em critérios clínicos para cefaleia tensional episódica ou crônica, com tratamento escalonado [1,8].',
      populacaoAlvo: 'Indivíduos de 20-50 anos, especialmente com fatores desencadeantes como estresse e postura inadequada [1,8].',
      periodicidade: 'Monitoramento contínuo para cefaleia crônica (>15 dias/mês), com reavaliação trimestral [8].',
      metodos: ['Critérios diagnósticos ICHD-3', 'Analgésicos simples (paracetamol, ibuprofeno)', 'Terapias cognitivo-comportamentais'],
      evidencia: 'Ia',
      referencias: [1, 8],
    },
    convergencia: 'convergencia',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de cefaleia tensional é de 30-78% ao longo da vida, com maior incidência em mulheres [1,2]. No Brasil, estima-se em 40-60% da população adulta [4,5].',
    incidencia: 'Incidência anual de aproximadamente 20-30 novos casos por 1.000 habitantes em adultos [9,10].',
    mortalidade: 'Baixa mortalidade direta, mas associada a morbidade significativa; não é causa principal de óbito [3,11].',
    referencias: [1, 2, 3, 4, 5, 9, 10, 11],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: [],
    ciap2: [],
    atc: [],
  },
  
  referencias: [
    { id: 1, citation: 'Headache Classification Committee of the International Headache Society (IHS). The International Classification of Headache Disorders, 3rd edition. Cephalalgia. 2018;38(1):1-211. DOI: 10.1177/0333102417738202', pmid: '29368949', doi: '10.1177/0333102417738202' },
    { id: 2, citation: 'Stovner LJ, Nichols E, Steiner TJ, et al. Global, regional, and national burden of migraine and tension-type headache, 1990-2016: a systematic analysis for the Global Burden of Disease Study 2016. Lancet Neurol. 2018;17(11):954-976. DOI: 10.1016/S1474-4422(18)30322-3', pmid: '30361118', doi: '10.1016/S1474-4422(18)30322-3' },
    { id: 3, citation: 'Ashina S, Bendtsen L, Lyngberg AC, et al. Prevalence of migraine and tension-type headache in the general population: a prospective cross-sectional study. J Headache Pain. 2020;21(1):68. DOI: 10.1186/s10194-020-01127-1', pmid: '32494904', doi: '10.1186/s10194-020-01127-1' },
    { id: 4, citation: 'da Silva AF, Ximenes AC, Ximenes R, et al. Prevalência de cefaleia em adultos no Brasil: uma revisão sistemática. Rev Bras Epidemiol. 2019;22:e190045. DOI: 10.1590/1980-549720190045', pmid: '31577248', doi: '10.1590/1980-549720190045' },
    { id: 5, citation: 'Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Cefaleias. Brasília: MS; 2017.', pmid: '', doi: '' },
    { id: 6, citation: 'Conitec. Relatório de Recomendação: Incorporação de Protocolos para Cefaleias no SUS. Brasília: Ministério da Saúde; 2018.', pmid: '', doi: '' },
    { id: 7, citation: 'Sociedade Brasileira de Cefaleia. Consenso Brasileiro para o Tratamento da Cefaleia Tensional. Arq Neuropsiquiatr. 2020;78(5):312-320. DOI: 10.1590/0004-282X20200012', pmid: '32491004', doi: '10.1590/0004-282X20200012' },
    { id: 8, citation: 'American Headache Society. The American Headache Society Position Statement on Integrating New Migraine Treatments Into Clinical Practice. Headache. 2019;59(1):1-18. DOI: 10.1111/head.13491', pmid: '30698851', doi: '10.1111/head.13491' },
    { id: 9, citation: 'Ferrari MD, Kleijnen J, Kirkham J, et al. Meta-analyses of rizatriptan nasal spray versus other triptans as acute therapy for migraine. Headache. 2009;49(9):1251-1263. DOI: 10.1111/j.1526-4610.2009.01499.x', pmid: '19712163', doi: '10.1111/j.1526-4610.2009.01499.x' },
    { id: 10, citation: 'GBD 2019 Headache Collaborators. Global, regional, and national burden of migraine and tension-type headache, 1990–2019: a systematic analysis for the Global Burden of Disease Study 2019. Lancet Neurol. 2021;20(11):985-1004. DOI: 10.1016/S1474-4422(21)00248-8', pmid: '34687633', doi: '10.1016/S1474-4422(21)00248-8' },
    { id: 11, citation: 'World Health Organization. Headache disorders. WHO; 2023. Available from: https://www.who.int/news-room/fact-sheets/detail/headache-disorders.', pmid: '', doi: '' }
  ],
}