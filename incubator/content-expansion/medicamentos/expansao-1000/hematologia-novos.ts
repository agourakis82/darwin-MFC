/**
 * HEMATOLOGIA NOVOS - DARWIN-MFC EXPANSAO 1000
 * ============================================
 * Medicamentos hematologicos: estimulantes de eritropoiese,
 * fatores de crescimento, agonistas de trombopoietina,
 * inibidores de JAK, quelantes de ferro.
 *
 * Referencias:
 * - TREAT/CREATE trials (EPO dosing)
 * - PALOMA trials (Luspatercept)
 * - HAVEN trials (Emicizumab)
 * - COMFORT trials (Ruxolitinib)
 * - JAKARTA trials (Fedratinib)
 * - EXTEND/RAISE trials (Romiplostim/Eltrombopag)
 */

import { Medicamento } from '@/lib/types/medicamento';

export const hematologiaNovos: Partial<Medicamento>[] = [
  // =============================================================================
  // ESTIMULANTES DE ERITROPOIESE
  // =============================================================================
  {
    id: 'eritropoetina-beta',
    nomeGenerico: 'Eritropoetina Beta',
    nomesComerciais: ['NeoRecormon', 'Mircera'],
    atcCode: 'B03XA01',
    rxNormCui: '197547',
    drugBankId: 'DB00016',
    snomedCT: '387228001',
    casNumber: '122312-54-3',
    classeTerapeutica: 'antianemico',
    subclasse: 'estimulante_eritropoiese',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '2.000UI', disponivelSUS: true },
      { forma: 'injetavel_sc', concentracao: '4.000UI', disponivelSUS: true },
      { forma: 'injetavel_sc', concentracao: '10.000UI', disponivelSUS: true },
    ],
    indicacoes: [
      'Anemia da doenca renal cronica',
      'Anemia induzida por quimioterapia',
      'Programa de pre-deposito autologa',
    ],
    mecanismoAcao: 'Glicoproteina recombinante identica a eritropoetina endogena. Liga-se ao receptor de eritropoetina em progenitores eritroides na medula ossea, estimulando proliferacao, diferenciacao e prevencao de apoptose. Aumenta contagem de reticulocitos em 7-10 dias e hemoglobina em 2-6 semanas.',
    posologias: [
      {
        indicacao: 'Anemia DRC',
        adultos: {
          dose: '20-50UI/kg 3x/semana SC ou 40-240UI/kg semanal',
          frequencia: '1-3x/semana',
          observacoes: 'Alvo Hb 10-12g/dL. Titular para manter Hb estavel, nao subir >1g/dL a cada 2 semanas.',
        },
      },
    ],
    contraindicacoes: [
      'Hipertensao nao controlada',
      'Aplasia pura de serie vermelha por anti-EPO',
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Monitorar PA rigorosamente',
      'Garantir estoques de ferro adequados (ferritina >200, sat >20%)',
      'Risco de eventos tromboembolicos com Hb >12',
    ],
    efeitosAdversos: {
      comuns: ['Hipertensao', 'Cefaleia', 'Artralgia', 'Sintomas gripais'],
      graves: ['Aplasia pura serie vermelha', 'Eventos tromboembolicos', 'Convulsoes'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores ECA',
        gravidade: 'moderada',
        efeito: 'Possivel reducao de resposta a EPO',
        conduta: 'Monitorar Hb; pode necessitar dose maior',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Indicacao principal - titular pela resposta de Hb' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro - molecula grande' },
    monitorizacao: [
      'Hemoglobina semanal ate estabilizar, depois mensal',
      'PA a cada aplicacao durante titulacao',
      'Ferritina e saturacao de transferrina mensais',
      'Reticulocitos se resposta inadequada',
    ],
    orientacoesPaciente: [
      'Manter acompanhamento regular',
      'Informar cefaleia intensa ou alteracao visual',
      'Suplementar ferro conforme orientacao',
    ],
    doencasRelacionadas: ['anemia-drc', 'doenca-renal-cronica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['eritropoetina', 'EPO', 'anemia', 'DRC', 'estimulante-eritropoiese'],
  },

  {
    id: 'darbepoetina-alfa',
    nomeGenerico: 'Darbepoetina Alfa',
    nomesComerciais: ['Aranesp'],
    atcCode: 'B03XA02',
    rxNormCui: '200873',
    drugBankId: 'DB00012',
    snomedCT: '386955002',
    casNumber: '11096-26-7',
    classeTerapeutica: 'antianemico',
    subclasse: 'estimulante_eritropoiese',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '25mcg', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '40mcg', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '60mcg', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '100mcg', disponivelSUS: false },
    ],
    indicacoes: [
      'Anemia da doenca renal cronica',
      'Anemia induzida por quimioterapia em tumores solidos',
    ],
    mecanismoAcao: 'EPO hiperglicosilada com duas cadeias de carboidrato adicionais. Meia-vida 3x maior que EPO convencional (25h SC vs 8h), permitindo administracao quinzenal ou mensal. Mesmo mecanismo de acao: liga-se ao receptor de EPO em progenitores eritroides.',
    posologias: [
      {
        indicacao: 'Anemia DRC',
        adultos: {
          dose: '0,45mcg/kg semanal ou 0,75mcg/kg a cada 2 semanas',
          frequencia: '1x/semana ou 1x/2 semanas',
          observacoes: 'Conversao de EPO: dividir dose semanal por 200. Ex: 10.000UI EPO/semana = 50mcg darbepoetina/semana.',
        },
      },
    ],
    contraindicacoes: [
      'Hipertensao nao controlada',
      'Hipersensibilidade',
      'Aplasia pura serie vermelha',
    ],
    precaucoes: [
      'Mesmas da EPO',
      'Monitorar PA e Hb',
      'Alvo Hb 10-12g/dL',
    ],
    efeitosAdversos: {
      comuns: ['Hipertensao', 'Edema periferico', 'Cefaleia'],
      graves: ['Eventos tromboembolicos', 'AVC', 'Aplasia pura serie vermelha'],
    },
    interacoes: [],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Indicacao principal - sem ajuste adicional' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' },
    monitorizacao: [
      'Hemoglobina quinzenal ate estabilizar',
      'PA regularmente',
      'Perfil de ferro',
    ],
    orientacoesPaciente: [
      'Vantagem: menos injecoes que EPO tradicional',
      'Manter suplementacao de ferro',
    ],
    doencasRelacionadas: ['anemia-drc', 'anemia-quimioterapia'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['darbepoetina', 'Aranesp', 'EPO-longa-acao', 'anemia', 'DRC'],
  },

  // =============================================================================
  // FATORES ESTIMULANTES DE COLONIAS (G-CSF)
  // =============================================================================
  {
    id: 'filgrastim',
    nomeGenerico: 'Filgrastim',
    nomesComerciais: ['Granulokine', 'Neupogen', 'Fiprima'],
    atcCode: 'L03AA02',
    rxNormCui: '204436',
    drugBankId: 'DB00099',
    snomedCT: '386952005',
    casNumber: '121181-53-1',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '300mcg/ml', disponivelSUS: true },
      { forma: 'injetavel_sc', concentracao: '480mcg/1,6ml', disponivelSUS: true },
    ],
    indicacoes: [
      'Neutropenia febril pos-quimioterapia',
      'Profilaxia primaria em regimes de alto risco',
      'Mobilizacao de celulas-tronco para transplante',
      'Neutropenia congenita ou idiopatica cronica',
    ],
    mecanismoAcao: 'Fator estimulante de colonias de granulocitos (G-CSF) recombinante humano. Liga-se ao receptor de G-CSF em precursores mieloides, estimulando proliferacao, diferenciacao e liberacao de neutrofilos maduros da medula. Aumenta funcao neutrofilica (fagocitose, burst oxidativo).',
    posologias: [
      {
        indicacao: 'Neutropenia pos-quimioterapia',
        adultos: {
          dose: '5mcg/kg/dia SC',
          frequencia: '1x/dia',
          observacoes: 'Iniciar 24-72h apos quimioterapia. Manter ate neutrofilos >10.000/mm3 apos nadir ou conforme protocolo.',
        },
      },
      {
        indicacao: 'Mobilizacao de celulas-tronco',
        adultos: {
          dose: '10mcg/kg/dia SC',
          frequencia: '1x/dia por 5-7 dias antes da aferese',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
      'Nao usar nas 24h antes/apos quimioterapia',
    ],
    precaucoes: [
      'Dor ossea comum (30-40%)',
      'Risco de ruptura esplenica (raro)',
      'Monitorar contagem leucocitaria',
      'Cuidado em doencas mieloides',
    ],
    efeitosAdversos: {
      comuns: ['Dor ossea', 'Dor musculoesqueletica', 'Cefaleia', 'Fadiga'],
      graves: ['Ruptura esplenica', 'SDRA', 'Sindrome de vazamento capilar', 'Leucemia mieloide (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Quimioterapicos',
        gravidade: 'grave',
        efeito: 'Mielotoxicidade sinergica se uso concomitante',
        conduta: 'Esperar 24h apos quimioterapia para iniciar',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Hemograma com diferencial 2-3x/semana',
      'Tamanho do baco se dor abdominal',
      'Acido urico (lise tumoral em doencas mieloides)',
    ],
    orientacoesPaciente: [
      'Dor ossea e lombar esperada - usar analgesico',
      'Informar dor abdominal intensa (ruptura esplenic)',
      'Armazenar refrigerado',
    ],
    doencasRelacionadas: ['neutropenia', 'neutropenia-febril', 'transplante-medula'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['filgrastim', 'G-CSF', 'neutropenia', 'mobilizacao-celulas-tronco'],
  },

  {
    id: 'pegfilgrastim',
    nomeGenerico: 'Pegfilgrastim',
    nomesComerciais: ['Neulasta', 'Neupeg'],
    atcCode: 'L03AA13',
    rxNormCui: '261585',
    drugBankId: 'DB00019',
    snomedCT: '386965009',
    casNumber: '208265-92-3',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '6mg/0,6ml', disponivelSUS: false },
    ],
    indicacoes: [
      'Profilaxia de neutropenia febril em quimioterapia mielossupressora',
      'Pacientes com tumores solidos ou neoplasias hematologicas nao mieloides',
    ],
    mecanismoAcao: 'Filgrastim conjugado com polietilenoglicol (PEG) de 20kDa. Meia-vida prolongada (15-80h vs 3-4h) por reducao do clearance renal. Dose unica por ciclo de quimioterapia. Mesmo mecanismo do filgrastim.',
    posologias: [
      {
        indicacao: 'Profilaxia neutropenia',
        adultos: {
          dose: '6mg SC dose unica',
          frequencia: '1x por ciclo de quimioterapia',
          observacoes: 'Administrar 24h apos quimioterapia. Nao usar em quimioterapia semanal ou doses densas.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao filgrastim ou pegfilgrastim',
      'Quimioterapia dose-densa (intervalos <14 dias)',
    ],
    precaucoes: [
      'Nao usar nas 14 dias entre ciclos de quimioterapia',
      'Dor ossea frequente',
      'Ruptura esplenica (raro)',
    ],
    efeitosAdversos: {
      comuns: ['Dor ossea (31%)', 'Mialgia', 'Cefaleia', 'Artralgia'],
      graves: ['Ruptura esplenica', 'SDRA', 'Sindrome de vazamento capilar', 'Glomerulonefrite'],
    },
    interacoes: [
      {
        medicamento: 'Quimioterapicos',
        gravidade: 'grave',
        efeito: 'Nao usar concomitante',
        conduta: 'Esperar 24h apos quimio; nao dar 14 dias antes',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: [
      'Hemograma antes do proximo ciclo',
      'Clinica para dor abdominal',
    ],
    orientacoesPaciente: [
      'Dose unica por ciclo - conveniencia',
      'Dor ossea esperada; usar analgesico',
      'Guardar na geladeira',
    ],
    doencasRelacionadas: ['neutropenia-febril', 'quimioterapia'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['pegfilgrastim', 'Neulasta', 'G-CSF-peguilado', 'neutropenia'],
  },

  // =============================================================================
  // AGONISTAS DO RECEPTOR DE TROMBOPOIETINA
  // =============================================================================
  {
    id: 'romiplostim',
    nomeGenerico: 'Romiplostim',
    nomesComerciais: ['Nplate'],
    atcCode: 'B02BX04',
    rxNormCui: '744815',
    drugBankId: 'DB08895',
    snomedCT: '441760006',
    casNumber: '267639-76-9',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '250mcg', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '500mcg', disponivelSUS: false },
    ],
    indicacoes: [
      'Trombocitopenia imune (PTI) cronica refrataria',
      'Pacientes que falharam a corticoides, esplenectomia ou imunoglobulina',
    ],
    mecanismoAcao: 'Peptibody (peptideo fusionado a Fc de IgG). Agonista do receptor de trombopoietina (TPO-R/c-Mpl) em megacariocitos. Estimula proliferacao e diferenciacao megacariocitica, aumentando producao de plaquetas. Nao tem homologia com TPO endogena, minimizando risco de anticorpos cruzados.',
    posologias: [
      {
        indicacao: 'PTI cronica',
        adultos: {
          dose: 'Iniciar 1mcg/kg SC semanal',
          frequencia: '1x/semana',
          doseMaxima: '10mcg/kg/semana',
          observacoes: 'Titular em incrementos de 1mcg/kg/semana para manter plaquetas 50.000-200.000. Se >400.000 por 2 semanas, suspender.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Rebote de trombocitopenia ao suspender',
      'Risco de fibrose medular (monitorar esfregaco)',
      'Eventos tromboembolicos',
      'Progressao de SMD (nao usar em SMD)',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Artralgia', 'Mialgia', 'Dor abdominal', 'Tontura'],
      graves: ['Fibrose medular', 'Eventos tromboembolicos', 'Progressao de malignidade hematologica'],
    },
    interacoes: [
      {
        medicamento: 'Anticoagulantes',
        gravidade: 'leve',
        efeito: 'Pode necessitar ajuste ao elevar plaquetas',
        conduta: 'Monitorar',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Contagem plaquetaria semanal durante titulacao, depois mensal',
      'Esfregaco periferico basal e periodico (fibrose)',
      'Funcao hepatica',
    ],
    orientacoesPaciente: [
      'Injecao semanal por profissional de saude',
      'Nao interromper abruptamente',
      'Informar sangramento ou sinais trombose',
    ],
    doencasRelacionadas: ['trombocitopenia-imune', 'pti'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['romiplostim', 'Nplate', 'TPO-agonista', 'PTI', 'trombocitopenia'],
  },

  {
    id: 'eltrombopag',
    nomeGenerico: 'Eltrombopag',
    nomesComerciais: ['Revolade', 'Promacta'],
    atcCode: 'B02BX05',
    rxNormCui: '824876',
    drugBankId: 'DB06210',
    snomedCT: '442519000',
    casNumber: '496775-61-2',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '75mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Trombocitopenia imune (PTI) cronica',
      'Anemia aplastica grave refrataria',
      'Trombocitopenia associada a hepatite C cronica',
    ],
    mecanismoAcao: 'Molecula pequena nao peptidica, agonista oral do receptor de TPO. Liga-se ao dominio transmembranico do c-Mpl (diferente do sitio de ligacao da TPO), ativando vias JAK/STAT. Estimula megacariopoiese. Tambem estimula celulas-tronco hematopoieticas (util na aplasia).',
    posologias: [
      {
        indicacao: 'PTI cronica',
        adultos: {
          dose: 'Iniciar 50mg VO 1x/dia',
          frequencia: '1x/dia em jejum (2h antes ou 4h apos refeicao)',
          doseMaxima: '75mg/dia',
          observacoes: 'Asiaticos: iniciar 25mg. Titular para plaquetas >50.000.',
        },
      },
      {
        indicacao: 'Anemia aplastica grave',
        adultos: {
          dose: 'Iniciar 50mg 1x/dia; aumentar ate 150mg/dia',
          frequencia: '1x/dia',
          observacoes: 'Usado em associacao com imunossupressao. Doses maiores permitidas.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
      'Hepatopatia grave (Child-Pugh C)',
    ],
    precaucoes: [
      'Hepatotoxicidade - monitorar TGO/TGP',
      'Quelante de cations: nao tomar com laticinios, antiacidos, suplementos de calcio/ferro',
      'Catarata (estudos pre-clinicos)',
      'Eventos tromboembolicos',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Diarreia', 'Cefaleia', 'Elevacao de transaminases'],
      graves: ['Hepatotoxicidade', 'Fibrose medular', 'Eventos tromboembolicos', 'Catarata'],
    },
    interacoes: [
      {
        medicamento: 'Antiacidos, calcio, ferro, magnesio',
        gravidade: 'grave',
        efeito: 'Quela eltrombopag reduzindo absorcao >70%',
        conduta: 'Separar por 4h antes ou 2h apos',
      },
      {
        medicamento: 'Estatinas (substratos OATP1B1)',
        gravidade: 'moderada',
        efeito: 'Eltrombopag inibe OATP1B1 - aumenta niveis de rosuvastatina',
        conduta: 'Reduzir dose da estatina',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste - metabolismo hepatico' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: [
      'TGO/TGP basal e quinzenal por 3 meses, depois mensal',
      'Contagem plaquetaria semanal durante titulacao',
      'Exame oftalmologico periodico',
      'Esfregaco periferico para morfologia',
    ],
    orientacoesPaciente: [
      'Tomar em jejum - 2h antes ou 4h apos comer',
      'Nao tomar com leite, antiacidos ou suplementos',
      'Via oral - conveniencia vs romiplostim',
    ],
    doencasRelacionadas: ['trombocitopenia-imune', 'anemia-aplastica', 'hepatite-c'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['eltrombopag', 'Revolade', 'TPO-agonista-oral', 'PTI', 'anemia-aplastica'],
  },

  {
    id: 'avatrombopag',
    nomeGenerico: 'Avatrombopag',
    nomesComerciais: ['Doptelet'],
    atcCode: 'B02BX08',
    rxNormCui: '2055432',
    drugBankId: 'DB12983',
    snomedCT: '1162641006',
    casNumber: '570406-98-3',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Trombocitopenia em doenca hepatica cronica antes de procedimento',
      'Trombocitopenia imune (PTI) cronica',
    ],
    mecanismoAcao: 'Agonista oral do receptor de TPO de segunda geracao. Liga-se ao dominio transmembranico do c-Mpl (sitio diferente da TPO). Vantagem sobre eltrombopag: pode ser tomado com alimentos e nao interage com cations. Metabolismo por CYP2C9/3A.',
    posologias: [
      {
        indicacao: 'Trombocitopenia pre-procedimento (doenca hepatica)',
        adultos: {
          dose: 'Plaq <40.000: 60mg/dia; 40-50.000: 40mg/dia',
          frequencia: '1x/dia por 5 dias',
          observacoes: 'Iniciar 10-13 dias antes do procedimento. Procedimento 5-8 dias apos ultima dose.',
        },
      },
      {
        indicacao: 'PTI cronica',
        adultos: {
          dose: 'Iniciar 20mg 1x/dia',
          frequencia: '1x/dia',
          doseMaxima: '40mg/dia',
          observacoes: 'Titular por resposta plaquetaria.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Eventos tromboembolicos (especialmente em doenca hepatica)',
      'Rebote de trombocitopenia ao suspender',
      'Monitorar funcao hepatica em PTI',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Fadiga', 'Nausea', 'Febre', 'Dor abdominal'],
      graves: ['Trombose venosa portal (doenca hepatica)', 'Eventos tromboembolicos'],
    },
    interacoes: [
      {
        medicamento: 'Indutores CYP3A4/2C9 (rifampicina)',
        gravidade: 'moderada',
        efeito: 'Reducao dos niveis de avatrombopag',
        conduta: 'Pode necessitar ajuste de dose',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Contagem plaquetaria apos tratamento pre-procedimento',
      'Sinais de trombose em doenca hepatica',
      'TGO/TGP em PTI',
    ],
    orientacoesPaciente: [
      'Pode tomar com alimentos (vantagem vs eltrombopag)',
      'Nao tem restricao com laticinios ou antiacidos',
      'Uso de curta duracao para procedimentos',
    ],
    doencasRelacionadas: ['trombocitopenia', 'cirrose', 'doenca-hepatica-cronica', 'pti'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['avatrombopag', 'Doptelet', 'TPO-agonista', 'doenca-hepatica', 'PTI'],
  },

  // =============================================================================
  // AGENTES PARA BETA-TALASSEMIA / ERITROPOIESE INEFICAZ
  // =============================================================================
  {
    id: 'luspatercept',
    nomeGenerico: 'Luspatercept-aamt',
    nomesComerciais: ['Reblozyl'],
    atcCode: 'B03XA06',
    rxNormCui: '2284596',
    drugBankId: 'DB15117',
    snomedCT: '1179313000',
    casNumber: '1351011-54-3',
    classeTerapeutica: 'antianemico',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '25mg', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '75mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Anemia em beta-talassemia dependente de transfusao',
      'Sindrome mielodisplasica de baixo risco com sideroblastos em anel',
      'Anemia em mielofibrose (aprovacao recente)',
    ],
    mecanismoAcao: 'Proteina de fusao recombinante (receptor de activina IIB modificado + dominio Fc de IgG1). Liga-se a ligantes da superfamilia TGF-beta (GDF8, GDF11, activinas). Promove maturacao eritroide tardia, melhorando eritropoiese ineficaz caracteristica de talassemia e SMD-RS.',
    posologias: [
      {
        indicacao: 'Beta-talassemia',
        adultos: {
          dose: 'Iniciar 1mg/kg SC a cada 3 semanas',
          frequencia: 'A cada 21 dias',
          doseMaxima: '1,25mg/kg a cada 3 semanas',
          observacoes: 'Titular para reducao da necessidade transfusional. Aumentar se resposta inadequada.',
        },
      },
      {
        indicacao: 'SMD de baixo risco com sideroblastos em anel',
        adultos: {
          dose: 'Iniciar 1mg/kg a cada 3 semanas',
          frequencia: 'A cada 21 dias',
          doseMaxima: '1,75mg/kg a cada 3 semanas',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Hipertensao - monitorar PA',
      'Eventos tromboembolicos',
      'Hepatotoxicidade (raro)',
      'Eventos extramedular eritropoiese em talassemia',
    ],
    efeitosAdversos: {
      comuns: ['Fadiga', 'Dor musculoesqueletica', 'Cefaleia', 'Artralgia', 'Tontura'],
      graves: ['Eventos tromboembolicos', 'Hipertensao', 'Reacoes de hipersensibilidade'],
    },
    interacoes: [],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: [
      'Hemograma antes de cada dose',
      'PA antes e periodicamente',
      'Necessidade transfusional (objetivo: reducao)',
      'Ferritina e sobrecarga de ferro',
    ],
    orientacoesPaciente: [
      'Injecao a cada 3 semanas',
      'Objetivo: reduzir necessidade de transfusao',
      'Evitar gravidez',
    ],
    doencasRelacionadas: ['beta-talassemia', 'smd', 'mielodisplasia', 'mielofibrose'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['luspatercept', 'Reblozyl', 'beta-talassemia', 'SMD', 'eritropoiese-ineficaz'],
  },

  // =============================================================================
  // TRATAMENTO DE HEMOFILIA A
  // =============================================================================
  {
    id: 'emicizumab',
    nomeGenerico: 'Emicizumab-kxwh',
    nomesComerciais: ['Hemlibra'],
    atcCode: 'B02BX06',
    rxNormCui: '2056876',
    drugBankId: 'DB13923',
    snomedCT: '769103004',
    casNumber: '1422070-90-2',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'fator_coagulacao',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '30mg/ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '150mg/ml', disponivelSUS: false },
    ],
    indicacoes: [
      'Profilaxia de sangramento em hemofilia A com inibidores',
      'Profilaxia de sangramento em hemofilia A grave sem inibidores',
    ],
    mecanismoAcao: 'Anticorpo monoclonal biespecifico humanizado. Mimetiza a funcao do fator VIII ao ligar simultaneamente FIXa (um braco) e FX (outro braco), promovendo ativacao do FX. Nao interage com inibidores de FVIII. Meia-vida ~4 semanas permite administracao semanal a mensal.',
    posologias: [
      {
        indicacao: 'Hemofilia A',
        adultos: {
          dose: 'Ataque: 3mg/kg SC 1x/semana por 4 semanas',
          frequencia: 'Semanal (ataque)',
          observacoes: 'Manutencao: 1,5mg/kg semanal ou 3mg/kg quinzenal ou 6mg/kg mensal.',
        },
        pediatrico: {
          dose: 'Mesma posologia adultos',
          frequencia: 'Conforme esquema',
          idadeMinima: 'Neonatos',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Nao usar com aPCC (FEIBA) - risco de microangiopatia trombotica',
      'Se necessario tratamento de sangramento, preferir rFVIIa',
      'Interfere com testes de coagulacao baseados em aPTT',
      'Reacoes no local de injecao',
    ],
    efeitosAdversos: {
      comuns: ['Reacao no local de injecao', 'Cefaleia', 'Artralgia'],
      graves: ['Microangiopatia trombotica (com aPCC)', 'Eventos tromboembolicos (com aPCC)'],
    },
    interacoes: [
      {
        medicamento: 'aPCC (FEIBA)',
        gravidade: 'contraindicada',
        efeito: 'Microangiopatia trombotica, trombose',
        conduta: 'Evitar. Se necessario para sangramento grave, usar doses minimas.',
      },
      {
        medicamento: 'Fator VIIa recombinante',
        gravidade: 'moderada',
        efeito: 'Pode ser usado para tratamento de sangramento',
        conduta: 'Alternativa preferida ao aPCC',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Taxa de sangramento (ABR)',
      'Atencao: aPTT nao e util (emicizumab falseia)',
      'Usar ensaios cromogenicos bovinos para monitorar FVIII se necessario',
      'Observar sinais de microangiopatia trombotica se usar agentes de bypass',
    ],
    orientacoesPaciente: [
      'Revolucao no tratamento - profilaxia subcutanea',
      'Pode ser semanal, quinzenal ou mensal',
      'Informar todos medicos sobre uso (interfere com testes)',
      'Cartao de paciente obrigatorio',
    ],
    doencasRelacionadas: ['hemofilia-a', 'hemofilia-com-inibidores'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['emicizumab', 'Hemlibra', 'hemofilia-A', 'biespecifico', 'HAVEN'],
  },

  {
    id: 'fitusirana',
    nomeGenerico: 'Fitusirana',
    nomesComerciais: ['Fitusiran (em desenvolvimento)'],
    atcCode: 'B02BX',
    rxNormCui: '2599876',
    drugBankId: 'DB15883',
    snomedCT: '1269101004',
    casNumber: '1796356-80-7',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '80mg (seringa preenchida)', disponivelSUS: false },
    ],
    indicacoes: [
      'Profilaxia de sangramento em hemofilia A ou B com ou sem inibidores',
      'Adultos e adolescentes >=12 anos',
    ],
    mecanismoAcao: 'siRNA (small interfering RNA) que silencia especificamente a producao hepatica de antitrombina (SERPINC1). Ao reduzir antitrombina em 80-90%, reequilibra a hemostasia em pacientes com deficiencia de FVIII ou FIX. Mecanismo independente do fator deficiente, eficaz mesmo com inibidores.',
    posologias: [
      {
        indicacao: 'Hemofilia A ou B',
        adultos: {
          dose: '80mg SC',
          frequencia: '1x/mes',
          observacoes: 'Dose fixa mensal. Estudos de fase 3 (ATLAS) demonstraram reducao de 90% nos sangramentos.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
      'Eventos tromboembolicos ativos',
    ],
    precaucoes: [
      'Risco de eventos tromboembolicos (antitrombina reduzida)',
      'Evitar uso concomitante com emicizumab',
      'Monitorar antitrombina',
      'Cuidado em cirurgias - risco trombotico',
    ],
    efeitosAdversos: {
      comuns: ['Reacao no local de injecao', 'Aumento de transaminases', 'Cefaleia'],
      graves: ['Eventos tromboembolicos', 'Trombose de seio venoso cerebral (relatado em estudos)'],
    },
    interacoes: [
      {
        medicamento: 'Emicizumab',
        gravidade: 'contraindicada',
        efeito: 'Risco trombotico muito elevado',
        conduta: 'Nao usar concomitante',
      },
      {
        medicamento: 'Agentes de bypass (aPCC, rFVIIa)',
        gravidade: 'grave',
        efeito: 'Risco trombotico aumentado',
        conduta: 'Usar com extrema cautela e doses minimas se necessario',
      },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: [
      'Niveis de antitrombina (alvo: 15-35% do normal)',
      'TGO/TGP',
      'Sinais de trombose',
      'Taxa de sangramento anualizada',
    ],
    orientacoesPaciente: [
      'Injecao mensal - alta conveniencia',
      'Funciona tanto para hemofilia A quanto B',
      'Funciona mesmo com inibidores',
      'Cartao de paciente obrigatorio',
    ],
    doencasRelacionadas: ['hemofilia-a', 'hemofilia-b', 'hemofilia-com-inibidores'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['fitusirana', 'siRNA', 'antitrombina', 'hemofilia', 'ATLAS'],
  },

  // =============================================================================
  // DOENCA FALCIFORME / HIDROXIUREIA
  // =============================================================================
  {
    id: 'hidroxiureia',
    nomeGenerico: 'Hidroxiureia',
    nomesComerciais: ['Hydrea', 'Siklos'],
    atcCode: 'L01XX05',
    rxNormCui: '5640',
    drugBankId: 'DB01005',
    snomedCT: '387314007',
    casNumber: '127-07-1',
    classeTerapeutica: 'antianemico',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '1000mg', disponivelSUS: true },
    ],
    indicacoes: [
      'Doenca falciforme - prevencao de crises vaso-oclusivas',
      'Leucemia mieloide cronica (LMC) - tratamento paliativo',
      'Policitemia vera',
      'Trombocitemia essencial',
    ],
    mecanismoAcao: 'Inibidor da ribonucleotideo redutase, bloqueando sintese de DNA. Na doenca falciforme: aumenta hemoglobina fetal (HbF) que inibe polimerizacao da HbS, reduz adesao de eritrocitos ao endotelio, aumenta NO e hidratacao eritrocitaria. Reducao de 50% nas crises.',
    posologias: [
      {
        indicacao: 'Doenca falciforme',
        adultos: {
          dose: 'Iniciar 15mg/kg/dia',
          frequencia: '1x/dia',
          doseMaxima: '35mg/kg/dia',
          observacoes: 'Titular a cada 8-12 semanas ate dose maxima tolerada ou HbF >20%. Monitorar hemograma a cada 2 semanas inicialmente.',
        },
        pediatrico: {
          dose: '20mg/kg/dia',
          frequencia: '1x/dia',
          idadeMinima: '2 anos',
          observacoes: 'Formulacao Siklos permite titulacao precisa em criancas.',
        },
      },
      {
        indicacao: 'Neoplasias mieloproliferativas',
        adultos: {
          dose: '15-20mg/kg/dia ou 500-2000mg/dia',
          frequencia: '1x/dia',
          observacoes: 'Ajustar para manter contagens alvo.',
        },
      },
    ],
    contraindicacoes: [
      'Mielossupressao grave',
      'Hipersensibilidade',
      'Gestacao (teratogenico)',
    ],
    precaucoes: [
      'Mielossupressao - hemograma frequente',
      'Ulceras de perna (especialmente em doenca falciforme)',
      'Macrocitose esperada (marcador de adesao)',
      'Carcinogenese potencial a longo prazo',
    ],
    efeitosAdversos: {
      comuns: ['Mielossupressao', 'Macrocitose', 'Ulceras de perna', 'Hiperpigmentacao cutanea'],
      graves: ['Leucopenia grave', 'Trombocitopenia grave', 'Neoplasias secundarias (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Antirretrovirais (didanosina, estavudina)',
        gravidade: 'grave',
        efeito: 'Risco de pancreatite e hepatotoxicidade',
        conduta: 'Evitar combinacao',
      },
      {
        medicamento: 'Outros mielossupressores',
        gravidade: 'moderada',
        efeito: 'Mielossupressao aditiva',
        conduta: 'Monitorar hemograma',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: 'Sem ajuste' },
      { tfg: '30-60', ajuste: 'Reduzir 50%' },
      { tfg: '<30', ajuste: 'Evitar ou reduzir 75%' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Excretada no leite - evitar' },
    monitorizacao: [
      'Hemograma a cada 2 semanas por 2-3 meses, depois mensal',
      'HbF a cada 3 meses (doenca falciforme)',
      'Funcao renal e hepatica',
      'Exame de pele (ulceras de perna)',
    ],
    orientacoesPaciente: [
      'Medicamento chave para prevenir crises falciformes',
      'Usar contracepcao eficaz',
      'Hemograma regular obrigatorio',
      'Informar sinais de infeccao',
    ],
    doencasRelacionadas: ['doenca-falciforme', 'anemia-falciforme', 'policitemia-vera', 'LMC'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['hidroxiureia', 'Hydrea', 'doenca-falciforme', 'HbF', 'mieloproliferativa'],
  },

  // =============================================================================
  // INIBIDORES DE JAK PARA NEOPLASIAS MIELOPROLIFERATIVAS
  // =============================================================================
  {
    id: 'ruxolitinib',
    nomeGenerico: 'Ruxolitinib',
    nomesComerciais: ['Jakavi', 'Jakafi'],
    atcCode: 'L01EJ01',
    rxNormCui: '1193326',
    drugBankId: 'DB08877',
    snomedCT: '703127006',
    casNumber: '941678-49-5',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'inibidor_jak',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '15mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Mielofibrose primaria ou secundaria (pos-PV ou pos-TE)',
      'Policitemia vera refrataria ou intolerante a hidroxiureia',
      'Doenca enxerto contra hospedeiro aguda refrataria a corticoides (DECH)',
    ],
    mecanismoAcao: 'Inibidor seletivo de JAK1 e JAK2. Na mielofibrose: bloqueia sinalizacao JAK/STAT desregulada (frequentemente por mutacao JAK2 V617F), reduzindo esplenomegalia, sintomas constitucionais e citocinas inflamatorias. Pode prolongar sobrevida. Nao erradica clone neoplasico.',
    posologias: [
      {
        indicacao: 'Mielofibrose',
        adultos: {
          dose: 'Plaq >200.000: 20mg 2x/dia; 100-200.000: 15mg 2x/dia; 50-100.000: 5mg 2x/dia',
          frequencia: '12/12h',
          observacoes: 'Titular por resposta e tolerancia. Nao suspender abruptamente (rebote de sintomas).',
        },
      },
      {
        indicacao: 'Policitemia vera',
        adultos: {
          dose: 'Iniciar 10mg 2x/dia',
          frequencia: '12/12h',
          doseMaxima: '25mg 2x/dia',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
      'Infeccoes ativas graves',
    ],
    precaucoes: [
      'Anemia e trombocitopenia dose-limitantes',
      'Risco de infeccoes (tuberculose, herpes zoster, hepatite B)',
      'Sindrome de rebote ao suspender',
      'Neoplasias secundarias (LMMC, linfomas)',
    ],
    efeitosAdversos: {
      comuns: ['Anemia', 'Trombocitopenia', 'Equimoses', 'Tontura', 'Cefaleia'],
      graves: ['Infeccoes oportunistas', 'Tuberculose', 'Herpes zoster', 'Leucoencefalopatia multifocal progressiva (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores fortes CYP3A4 (cetoconazol, ritonavir)',
        gravidade: 'grave',
        efeito: 'Aumenta niveis de ruxolitinib',
        conduta: 'Reduzir dose de ruxolitinib 50%',
      },
      {
        medicamento: 'Indutores CYP3A4 (rifampicina)',
        gravidade: 'moderada',
        efeito: 'Reduz eficacia',
        conduta: 'Pode necessitar aumento de dose',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: 'Sem ajuste' },
      { tfg: '15-60', ajuste: 'Iniciar com dose menor se plaquetas <100.000' },
      { tfg: '<15', ajuste: 'Reduzir dose; dialise: dose apos dialise' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: [
      'Hemograma a cada 2-4 semanas inicialmente',
      'Triagem para TB latente antes de iniciar',
      'Funcao hepatica',
      'Sinais de infeccao',
      'Avaliacao de baco (reducao esperada)',
    ],
    orientacoesPaciente: [
      'Nao suspender abruptamente - risco de rebote',
      'Informar febre, calafrios ou sinais de infeccao',
      'Vacina herpes zoster antes de iniciar se possivel',
    ],
    doencasRelacionadas: ['mielofibrose', 'policitemia-vera', 'DECH'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['ruxolitinib', 'Jakavi', 'JAK-inibidor', 'mielofibrose', 'policitemia-vera', 'COMFORT'],
  },

  {
    id: 'fedratinib',
    nomeGenerico: 'Fedratinib',
    nomesComerciais: ['Inrebic'],
    atcCode: 'L01EJ02',
    rxNormCui: '2262078',
    drugBankId: 'DB12519',
    snomedCT: '1156212008',
    casNumber: '936091-26-8',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'inibidor_jak',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Mielofibrose de risco intermediario-2 ou alto',
      'Pacientes naive ou previamente tratados com ruxolitinib',
    ],
    mecanismoAcao: 'Inibidor seletivo de JAK2 e FLT3. Maior seletividade para JAK2 vs JAK1 comparado ao ruxolitinib. Eficaz em pacientes que progrediram apos ruxolitinib. Tambem inibe BRD4. Estudos JAKARTA demonstraram reducao de esplenomegalia e sintomas.',
    posologias: [
      {
        indicacao: 'Mielofibrose',
        adultos: {
          dose: '400mg',
          frequencia: '1x/dia com alimentos',
          observacoes: 'Dose fixa. Ajustar para 300mg ou 200mg conforme toxicidade.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
      'Uso concomitante com inibidores fortes CYP3A4',
    ],
    precaucoes: [
      'Encefalopatia de Wernicke (deficiencia tiamina) - suplementar B1',
      'Anemia e trombocitopenia',
      'Diarreia e nausea frequentes',
      'Elevacao de amilase/lipase',
    ],
    efeitosAdversos: {
      comuns: ['Diarreia (67%)', 'Nausea', 'Anemia', 'Vomitos', 'Fadiga'],
      graves: ['Encefalopatia de Wernicke', 'Anemia grave', 'Sangramento'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores fortes CYP3A4',
        gravidade: 'contraindicada',
        efeito: 'Aumento significativo dos niveis',
        conduta: 'Contraindicado',
      },
      {
        medicamento: 'Indutores fortes CYP3A4',
        gravidade: 'grave',
        efeito: 'Reducao significativa dos niveis',
        conduta: 'Evitar',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Evitar - dados insuficientes' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: [
      'Hemograma frequente',
      'Niveis de tiamina basal e periodico',
      'Amilase e lipase',
      'Sintomas neurologicos (encefalopatia)',
    ],
    orientacoesPaciente: [
      'Tomar com alimentos',
      'Suplementar tiamina (vitamina B1) conforme prescrito',
      'Informar confusao mental, alteracao de marcha ou visao',
    ],
    doencasRelacionadas: ['mielofibrose'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['fedratinib', 'Inrebic', 'JAK2-inibidor', 'mielofibrose', 'JAKARTA'],
  },

  // =============================================================================
  // QUELANTES DE FERRO
  // =============================================================================
  {
    id: 'deferasirox',
    nomeGenerico: 'Deferasirox',
    nomesComerciais: ['Exjade', 'Jadenu'],
    atcCode: 'V03AC03',
    rxNormCui: '613391',
    drugBankId: 'DB01609',
    snomedCT: '418098009',
    casNumber: '201530-41-8',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido_dispersivel', concentracao: '125mg', disponivelSUS: false },
      { forma: 'comprimido_dispersivel', concentracao: '250mg', disponivelSUS: false },
      { forma: 'comprimido_dispersivel', concentracao: '500mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '90mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '180mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '360mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Sobrecarga de ferro transfusional cronica',
      'Beta-talassemia major',
      'Doenca falciforme',
      'Outras anemias dependentes de transfusao',
      'Sindromes mielodisplasicas',
    ],
    mecanismoAcao: 'Quelante oral tridentado seletivo para ferro (Fe3+). Liga-se na proporcao 2:1 (2 moleculas para cada atomo de ferro). Promove excrecao fecal de ferro. Meia-vida de 8-16h permite dose unica diaria. Formulacao Jadenu (revestido) pode ser tomada com alimentos.',
    posologias: [
      {
        indicacao: 'Sobrecarga de ferro',
        adultos: {
          dose: 'Exjade dispersivel: 20mg/kg/dia; Jadenu revestido: 14mg/kg/dia',
          frequencia: '1x/dia',
          doseMaxima: 'Exjade 40mg/kg; Jadenu 28mg/kg',
          observacoes: 'Exjade: em jejum 30min antes de refeicao. Jadenu: com ou sem alimentos.',
        },
        pediatrico: {
          dose: 'Mesma dose adultos (mg/kg)',
          frequencia: '1x/dia',
          idadeMinima: '2 anos',
        },
      },
    ],
    contraindicacoes: [
      'ClCr <40ml/min',
      'Hipersensibilidade',
      'Cirrose ou insuficiencia hepatica grave',
      'Citopenias de alto risco',
    ],
    precaucoes: [
      'Nefrotoxicidade - monitorar creatinina semanalmente no 1o mes',
      'Hepatotoxicidade',
      'Hemorragia GI (ulceras)',
      'Citopenia (agranulocitose, trombocitopenia)',
      'Toxicidade auditiva e ocular',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Vomitos', 'Diarreia', 'Dor abdominal', 'Rash', 'Aumento de creatinina'],
      graves: ['Insuficiencia renal', 'Insuficiencia hepatica', 'Hemorragia GI', 'Agranulocitose'],
    },
    interacoes: [
      {
        medicamento: 'Antiacidos com aluminio',
        gravidade: 'moderada',
        efeito: 'Reduz absorcao de deferasirox',
        conduta: 'Evitar combinacao',
      },
      {
        medicamento: 'Substratos de UGT1A1 (paracetamol)',
        gravidade: 'moderada',
        efeito: 'Deferasirox induz UGT1A1',
        conduta: 'Monitorar eficacia',
      },
      {
        medicamento: 'Agentes nefrotoxicos',
        gravidade: 'grave',
        efeito: 'Risco aditivo de lesao renal',
        conduta: 'Evitar ou monitorar rigorosamente',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: 'Sem ajuste' },
      { tfg: '40-60', ajuste: 'Reduzir 50% da dose inicial' },
      { tfg: '<40', ajuste: 'Contraindicado' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: [
      'Creatinina semanalmente no 1o mes, depois mensal',
      'TGO/TGP mensal',
      'Ferritina mensal (alvo: 500-1000ng/ml)',
      'Audiometria e exame oftalmologico anual',
      'Hemograma mensal',
    ],
    orientacoesPaciente: [
      'Exjade: disperser em agua ou suco, tomar em jejum',
      'Jadenu: pode tomar com alimentos',
      'Hidratacao adequada',
      'Objetivo: reduzir ferritina gradualmente',
    ],
    doencasRelacionadas: ['sobrecarga-ferro', 'talassemia', 'doenca-falciforme', 'SMD'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['deferasirox', 'Exjade', 'Jadenu', 'quelante-ferro', 'sobrecarga-ferro'],
  },

  {
    id: 'deferoxamina',
    nomeGenerico: 'Deferoxamina',
    nomesComerciais: ['Desferal'],
    atcCode: 'V03AC01',
    rxNormCui: '3229',
    drugBankId: 'DB00746',
    snomedCT: '372680004',
    casNumber: '70-51-9',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: true,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '500mg', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '2g', disponivelSUS: true },
    ],
    indicacoes: [
      'Sobrecarga de ferro transfusional cronica',
      'Intoxicacao aguda por ferro',
      'Hemocromatose primaria quando flebotomia contraindicada',
      'Sobrecarga de ferro na doenca renal cronica',
    ],
    mecanismoAcao: 'Quelante hexadentado que se liga ao Fe3+ na proporcao 1:1 formando ferrioxamina, excretada na urina (vermelho-alaranjado) e fezes. Quelante original, usado ha decadas. Requer administracao parenteral prolongada (8-12h) por bomba de infusao devido a meia-vida curta (20min).',
    posologias: [
      {
        indicacao: 'Sobrecarga cronica de ferro',
        adultos: {
          dose: '20-60mg/kg/dia',
          frequencia: 'Infusao SC lenta por 8-12h, 5-7 dias/semana',
          doseMaxima: '6g/dia ou 60mg/kg',
          observacoes: 'Via SC com bomba de infusao. Pode ser IV em hospitalizados. Associar vitamina C 200mg/dia (melhora excrecao).',
        },
        pediatrico: {
          dose: '20-40mg/kg/dia',
          frequencia: 'Infusao SC 8-12h',
          idadeMinima: '3 anos',
          observacoes: 'Indice terapeutico: dose diaria media (mg/kg) / ferritina (ng/ml) deve ser <0,025',
        },
      },
      {
        indicacao: 'Intoxicacao aguda por ferro',
        adultos: {
          dose: '15mg/kg/h IV (max 6g/dia)',
          frequencia: 'Infusao continua',
          observacoes: 'Ate urina voltar a cor normal ou ferritina/ferro serico normalizarem.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
      'Insuficiencia renal grave (exceto intoxicacao aguda)',
    ],
    precaucoes: [
      'Toxicidade ocular e auditiva (doses altas)',
      'Infeccoes por Yersinia e Mucor (quelacao aumenta disponibilidade de ferro para microorganismos)',
      'Nao usar doses excessivas em criancas (retardo crescimento)',
      'Hipotensao com infusao rapida',
    ],
    efeitosAdversos: {
      comuns: ['Reacao no local de infusao', 'Urina vermelho-alaranjada', 'Artralgia'],
      graves: ['Toxicidade retiniana', 'Surdez neurossensorial', 'Infeccoes por Yersinia/Mucor', 'SDRA (doses muito altas)'],
    },
    interacoes: [
      {
        medicamento: 'Vitamina C',
        gravidade: 'leve',
        efeito: 'Aumenta excrecao de ferro (benefico)',
        conduta: 'Adicionar 200mg/dia (nao exceder - cardiotoxicidade)',
      },
      {
        medicamento: 'Proclorperazina',
        gravidade: 'grave',
        efeito: 'Risco de coma prolongado',
        conduta: 'Evitar combinacao',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Ferrioxamina e dializada - usar com cautela em DRC' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Ferritina serica a cada 3 meses',
      'Funcao auditiva e visual anual',
      'Funcao renal',
      'Monitorar para infeccoes (especialmente GI)',
      'Crescimento em criancas',
    ],
    orientacoesPaciente: [
      'Infusao com bomba por 8-12h a noite (permite vida diurna normal)',
      'Urina alaranjada e normal',
      'Informar dor abdominal, febre, diarreia (infeccao)',
      'Exames de visao e audicao regulares',
    ],
    doencasRelacionadas: ['sobrecarga-ferro', 'talassemia', 'intoxicacao-ferro', 'hemocromatose'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['deferoxamina', 'Desferal', 'quelante-ferro', 'sobrecarga-ferro', 'intoxicacao-ferro'],
  },
];
