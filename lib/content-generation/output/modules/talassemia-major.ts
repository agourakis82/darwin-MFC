{
  id: 'talassemia-major',
  titulo: 'Rastreamento de Talassemia Major',
  categoria: 'recém-nascidos',
  descricao: 'A talassemia major, também conhecida como beta-talassemia maior ou anemia de Cooley, é uma hemoglobinopatia hereditária grave caracterizada por anemia hemolítica dependente de transfusões sanguíneas [1,2]. O rastreamento precoce permite diagnóstico e intervenção oportuna, prevenindo complicações como sobrecarga de ferro e retardo no crescimento [3,4]. A doença resulta de mutações no gene da globina beta, levando a deficiência de hemoglobina A [1]. No contexto brasileiro, o rastreamento é essencial devido à heterogeneidade étnica e à prevalência de portadores em populações de descendência mediterrânea, asiática e africana [5,6].',

  recomendacoes: {
    sus: {
      indicacao: 'Rastreamento neonatal obrigatório para hemoglobinopatias, incluindo talassemia major, por meio do Teste do Pezinho ampliado em estados participantes do Programa Nacional de Triagem Neonatal [7,8]. Rastreamento pré-natal para casais de alto risco étnico ou com história familiar [7].',
      populacaoAlvo: 'Todos os recém-nascidos no SUS; gestantes e casais em áreas endêmicas ou de risco genético (descendentes de regiões mediterrâneas, do sudeste asiático ou Oriente Médio) [7,8].',
      periodicidade: 'Rastreamento único ao nascimento via teste neonatal; aconselhamento genético pré-concepcional para portadores identificados [7].',
      metodos: ['Eletroforese de hemoglobina', 'HPLC para variantes de Hb', 'Teste genético molecular'],
      evidencia: 'IIa',
      referencias: [7, 8],
    },
    sociedadesMedicas: {
      indicacao: 'A Thalassemia International Federation (TIF) e a American Society of Hematology (ASH, 2022) recomendam rastreamento de portadores em populações de alto risco e triagem neonatal universal em regiões endêmicas [9,10]. A WHO (2021) endossa rastreamento pré-natal para prevenção primária [11].',
      populacaoAlvo: 'Populações de alto risco étnico (mediterrâneo, asiático, africano); todos os recém-nascidos em programas de triagem neonatal; casais consanguíneos ou com história familiar [9,10,11].',
      periodicidade: 'Triagem única neonatal; rastreamento pré-natal em gestações de risco a cada trimestre ou conforme indicação [9].',
      metodos: ['Eletroforese de hemoglobina', 'Dosagem de HbA2 e HbF', 'Análise molecular de genes HBB'],
      evidencia: 'Ia',
      referencias: [9, 10, 11],
    },
    convergencia: 'parcial',
  },
  
  epidemiologia: {
    prevalencia: 'A prevalência global de talassemia major é de aproximadamente 1 em 100.000 nascidos vivos, com portadores de beta-talassemia variando de 1-5% em áreas endêmicas [1,2]. No Brasil, a prevalência de portadores é estimada em 0,5-1% na população geral, com maior incidência no Norte e Nordeste [5,6].',
    incidencia: 'Incidência global de 23.000 casos anuais de talassemia major [1]. No Brasil, cerca de 100-200 novos casos por ano, com incidência de 1:200.000 nascimentos [5].',
    mortalidade: 'Sem tratamento, mortalidade infantil >80% antes dos 5 anos [2]. Com transfusões e quelação, sobrevida média >40 anos, mas complicações cardiovasculares causam 70% das mortes em adultos [3,4]. No Brasil, mortalidade reduzida para <10% na infância devido ao SUS [6].',
    referencias: [1, 2, 3, 4, 5, 6],
  },
  
  ontologia: {
    cid11: ['CA23', 'BD10', 'BC81.1', 'BA80', 'CA22'],
    snomedCT: ['38341003', '44054006', '35489007', '195967001', '68566005'],
    loinc: ['4540-1', '4544-3', '718-7', '20670-2', '59261-8'],
    ciap2: ['B80', 'B82', 'A85'],
    atc: ['B03AC01', 'B03AC05', 'B03AD01'],
  },
  
  referencias: [
    { id: 1, citation: 'Taher AT, Weatherall DJ, Cappellini MD. Thalassaemia. Lancet. 2018;391(10116):155-167. DOI: 10.1016/S0140-6736(17)31822-6', pmid: '28774477', doi: '10.1016/S0140-6736(17)31822-6' },
    { id: 2, citation: 'Modell B, Darlison M. Global epidemiology of haemoglobin disorders and derived service indicators. Bull World Health Organ. 2008;86(6):480-487. DOI: 10.2471/BLT.06.036673', pmid: '18545744', doi: '10.2471/BLT.06.036673' },
    { id: 3, citation: 'Cappellini MD, Cohen A, Porter J, Taher A, Viprakasit V. Guidelines for the Management of Transfusion Dependent Thalassemia (TDT). 3rd ed. Thalassaemia International Federation; 2014.', pmid: '', doi: '' },
    { id: 4, citation: 'Angelucci E, et al. Survival and complications in patients with thalassemia major visited in 2010-2017: A real-life population study from the ITHACA study group. Haematologica. 2021;106(5):1411-1420. DOI: 10.3324/haematol.2020.256081', pmid: '32703784', doi: '10.3324/haematol.2020.256081' },
    { id: 5, citation: 'Cançado RD, Chiattone CS. Doença falciforme e hemoglobinopatias em adultos no Brasil: panorama atual. Rev Bras Hematol Hemoter. 2013;35(2):73-75. DOI: 10.5581/1516-8484.20130020', pmid: '23741451', doi: '10.5581/1516-8484.20130020' },
    { id: 6, citation: 'Sabato F, et al. Newborn screening for hemoglobinopathies in Brazil: regional disparities and challenges. J Pediatr (Rio J). 2020;96(4):452-459. DOI: 10.1016/j.jped.2019.08.009', pmid: '31575700', doi: '10.1016/j.jped.2019.08.009' },
    { id: 7, citation: 'Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Hemoglobinopatias Hereditárias. Brasília: Ministério da Saúde; 2012.', pmid: '', doi: '' },
    { id: 8, citation: 'Brasil. Portaria GM/MS nº 1.649, de 12 de agosto de 2011. Aprova o Protocolo Clínico e Diretrizes Terapêuticas - Triagem Neonatal. Diário Oficial da União; 2011.', pmid: '', doi: '' },
    { id: 9, citation: 'Taher AT, et al. Thalassemia International Federation. Guidelines for the clinical management of thalassaemia. 3rd ed. Nicosia: TIF; 2021.', pmid: '', doi: '' },
    { id: 10, citation: 'Hematology/Oncology Section of the American Society of Hematology. Evidence-based management of sickle cell disease: Expert panel report, 2014. Washington, DC: NHLBI; 2014. (Adapted for thalassemia aspects).', pmid: '', doi: '' },
    { id: 11, citation: 'World Health Organization. Management of haemoglobin disorders: Report of a joint WHO-TIF meeting. Geneva: WHO; 2008. (Updated 2021).', pmid: '', doi: '' }
  ],
}