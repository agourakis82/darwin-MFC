/**
 * MEDICAMENTOS GERIATRIA - DARWIN-MFC
 * ====================================
 * Medicamentos frequentemente utilizados em idosos
 * Demência, Parkinson, Osteoporose
 * Baseado na RENAME 2024 e bulas ANVISA
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosGeriatria: Medicamento[] = [
  // =====================================================================
  // ANTIDEMENCIAIS - DOENCA DE ALZHEIMER
  // =====================================================================
  {
    id: 'memantina',
    nomeGenerico: 'Cloridrato de memantina',
    nomesComerciais: ['Ebix', 'Alois', 'Heimer'],
    atcCode: 'N06DX01',
    rxNormCui: '358262',
    drugBankId: 'DB01043',
    snomedCT: '386847004',
    casNumber: '19982-08-2',
    dcbCode: '05758',
    classeTerapeutica: 'antidemencia',
    subclasse: 'antagonista_nmda',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '10mg/mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Doenca de Alzheimer moderada a grave',
      'Demencia mista moderada a grave',
    ],
    mecanismoAcao: 'Antagonista nao competitivo de baixa afinidade do receptor NMDA. Modula a neurotransmissao glutamatergica excessiva associada a neurotoxicidade.',
    posologias: [
      {
        indicacao: 'Alzheimer moderado a grave',
        adultos: {
          dose: '5mg iniciando, aumentar 5mg/semana ate 20mg',
          frequencia: '1x/dia ou 2x/dia se 20mg',
          doseMaxima: '20mg/dia',
          observacoes: 'Titular lentamente para minimizar efeitos adversos',
        },
        idosos: {
          dose: 'Mesma posologia adulto, titular com cautela',
          observacoes: 'Monitorar funcao renal',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a memantina',
      'Epilepsia nao controlada',
    ],
    precaucoes: [
      'Insuficiencia renal moderada a grave (ajustar dose)',
      'Historia de convulsoes',
      'Infarto do miocardio recente',
      'ICC nao compensada',
      'Hipertensao nao controlada',
    ],
    efeitosAdversos: {
      comuns: ['Tontura', 'Cefaleia', 'Constipacao', 'Sonolencia', 'Hipertensao'],
      graves: ['Convulsoes', 'Alucinacoes', 'Confusao mental'],
    },
    interacoes: [
      {
        medicamento: 'Amantadina',
        gravidade: 'moderada',
        efeito: 'Potencializacao de efeitos adversos (ambos antagonistas NMDA)',
        conduta: 'Evitar uso concomitante',
      },
      {
        medicamento: 'Dextrometorfano',
        gravidade: 'moderada',
        efeito: 'Risco de sindrome serotoninergica-like',
        conduta: 'Monitorar sintomas de SNC',
      },
      {
        medicamento: 'Ranitidina',
        gravidade: 'leve',
        efeito: 'Aumento dos niveis de memantina',
        conduta: 'Monitorar efeitos adversos',
      },
      {
        medicamento: 'Bicarbonato de sodio',
        gravidade: 'moderada',
        efeito: 'Reducao da excrecao de memantina por alcalinizacao urinaria',
        conduta: 'Monitorar niveis se uso prolongado',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '5-29', ajuste: '10mg/dia (dose maxima)' },
      { tfg: '<5', ajuste: 'Nao recomendado' },
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes, evitar',
    },
    consideracoesEspeciais: {
      idosos: 'Populacao alvo. Monitorar funcao renal e cognitiva',
      hepatopatas: 'Sem ajuste necessario em insuficiencia leve a moderada',
    },
    monitorizacao: [
      'Funcao cognitiva (MEEM)',
      'Funcao renal',
      'Pressao arterial',
    ],
    orientacoesPaciente: [
      'Pode ser tomado com ou sem alimentos',
      'Nao suspender abruptamente',
      'Relatar confusao ou alucinacoes',
    ],
    doencasRelacionadas: ['alzheimer', 'demencia'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['demencia', 'alzheimer', 'geriatria', 'NMDA'],
  },

  {
    id: 'donepezila',
    nomeGenerico: 'Cloridrato de donepezila',
    nomesComerciais: ['Eranz', 'Donila', 'Aricept'],
    atcCode: 'N06DA02',
    rxNormCui: '135447',
    drugBankId: 'DB00843',
    snomedCT: '386855001',
    casNumber: '120014-06-4',
    dcbCode: '03149',
    classeTerapeutica: 'antidemencia',
    subclasse: 'inibidor_colinesterase',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido_orodispersivel', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido_orodispersivel', concentracao: '10mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Doenca de Alzheimer leve a moderada',
      'Doenca de Alzheimer grave (off-label em associacao)',
      'Demencia por corpos de Lewy',
    ],
    mecanismoAcao: 'Inibidor reversivel e seletivo da acetilcolinesterase. Aumenta a disponibilidade de acetilcolina nas sinapses corticais.',
    posologias: [
      {
        indicacao: 'Alzheimer leve a moderado',
        adultos: {
          dose: '5mg por 4-6 semanas, depois 10mg',
          frequencia: '1x/dia a noite',
          doseMaxima: '10mg/dia',
          observacoes: 'Aumentar dose apos 4-6 semanas se tolerado',
        },
        idosos: {
          dose: 'Mesma posologia',
          observacoes: 'Iniciar com 5mg e avaliar tolerabilidade',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a piperidinas',
      'Doenca do no sinusal',
      'Bloqueio AV de 2o ou 3o grau sem marcapasso',
    ],
    precaucoes: [
      'Asma ou DPOC',
      'Ulcera peptica ativa ou historia',
      'Convulsoes',
      'Bradicardia sintomatica',
      'Retencao urinaria',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Diarreia', 'Insonia', 'Caibras musculares', 'Fadiga', 'Anorexia'],
      graves: ['Bradicardia', 'Sincope', 'Convulsoes', 'Hemorragia GI'],
    },
    interacoes: [
      {
        medicamento: 'Anticolinergicos',
        gravidade: 'moderada',
        efeito: 'Antagonismo do efeito da donepezila',
        conduta: 'Evitar anticolinergicos quando possivel',
      },
      {
        medicamento: 'Betabloqueadores',
        gravidade: 'moderada',
        efeito: 'Risco de bradicardia aditiva',
        conduta: 'Monitorar FC',
      },
      {
        medicamento: 'Succinilcolina',
        gravidade: 'grave',
        efeito: 'Prolongamento do bloqueio neuromuscular',
        conduta: 'Alertar anestesista',
      },
      {
        medicamento: 'Cetoconazol',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de donepezila (inibicao CYP3A4)',
        conduta: 'Monitorar efeitos colinergicos',
      },
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes, evitar',
    },
    consideracoesEspeciais: {
      idosos: 'Populacao alvo. Avaliar risco-beneficio em cardiopatas',
      hepatopatas: 'Usar com cautela em insuficiencia hepatica moderada',
    },
    monitorizacao: [
      'Funcao cognitiva (MEEM)',
      'Frequencia cardiaca',
      'Peso e estado nutricional',
      'Sintomas GI',
    ],
    orientacoesPaciente: [
      'Tomar a noite, antes de dormir',
      'Pode ser tomado com ou sem alimentos',
      'Relatar nauseas, diarreia ou perda de peso',
    ],
    doencasRelacionadas: ['alzheimer', 'demencia'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['demencia', 'alzheimer', 'geriatria', 'anticolinesterasico'],
  },

  {
    id: 'rivastigmina',
    nomeGenerico: 'Rivastigmina',
    nomesComerciais: ['Exelon', 'Prometax', 'Rivastigmina'],
    atcCode: 'N06DA03',
    rxNormCui: '183379',
    drugBankId: 'DB00989',
    snomedCT: '395868005',
    casNumber: '123441-03-2',
    dcbCode: '08090',
    classeTerapeutica: 'antidemencia',
    subclasse: 'inibidor_colinesterase',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '1,5mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '3mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '4,5mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '6mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '2mg/mL', disponivelSUS: true },
      { forma: 'adesivo', concentracao: '4,6mg/24h', disponivelSUS: false },
      { forma: 'adesivo', concentracao: '9,5mg/24h', disponivelSUS: false },
      { forma: 'adesivo', concentracao: '13,3mg/24h', disponivelSUS: false },
    ],
    indicacoes: [
      'Doenca de Alzheimer leve a moderadamente grave',
      'Demencia associada a doenca de Parkinson',
      'Demencia por corpos de Lewy',
    ],
    mecanismoAcao: 'Inibidor pseudo-irreversivel da acetilcolinesterase e butirilcolinesterase. Aumenta a neurotransmissao colinergica central.',
    posologias: [
      {
        indicacao: 'Alzheimer / Demencia Parkinson',
        adultos: {
          dose: '1,5mg 2x/dia, aumentar 1,5mg a cada 2 semanas',
          frequencia: '2x/dia com refeicoes',
          doseMaxima: '6mg 2x/dia (12mg/dia)',
          observacoes: 'Titular lentamente. Adesivo: iniciar 4,6mg/24h',
        },
        idosos: {
          dose: 'Mesma posologia, titular com cautela',
          observacoes: 'Adesivo preferido para melhor tolerabilidade GI',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a rivastigmina ou derivados do carbamato',
      'Doenca do no sinusal',
      'Bloqueio AV sem marcapasso',
    ],
    precaucoes: [
      'Ulcera peptica ativa',
      'Asma ou DPOC graves',
      'Bradicardia ou bloqueio de conducao',
      'Retencao urinaria',
      'Epilepsia',
      'Peso corporal baixo',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Vomitos', 'Anorexia', 'Diarreia', 'Tontura', 'Cefaleia', 'Perda de peso'],
      graves: ['Bradicardia grave', 'Sincope', 'Convulsoes', 'Pancreatite', 'Dermatite de aplicacao (adesivo)'],
    },
    interacoes: [
      {
        medicamento: 'Anticolinergicos',
        gravidade: 'moderada',
        efeito: 'Antagonismo farmacologico',
        conduta: 'Evitar anticolinergicos',
      },
      {
        medicamento: 'Bloqueadores neuromusculares',
        gravidade: 'grave',
        efeito: 'Prolongamento do bloqueio',
        conduta: 'Alertar anestesista antes de cirurgias',
      },
      {
        medicamento: 'Betabloqueadores',
        gravidade: 'moderada',
        efeito: 'Bradicardia aditiva',
        conduta: 'Monitorar FC',
      },
      {
        medicamento: 'Metoclopramida',
        gravidade: 'moderada',
        efeito: 'Sintomas extrapiramidais aumentados',
        conduta: 'Usar com cautela',
      },
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: false,
      observacao: 'Excretada no leite em animais, evitar',
    },
    consideracoesEspeciais: {
      idosos: 'Adesivo transdermal preferido por menor incidencia de nauseas e vomitos',
      hepatopatas: 'Usar com cautela em insuficiencia hepatica',
    },
    monitorizacao: [
      'Funcao cognitiva',
      'Peso corporal',
      'Frequencia cardiaca',
      'Sintomas GI',
      'Pele (se adesivo)',
    ],
    orientacoesPaciente: [
      'Tomar com refeicoes para reduzir nausea',
      'Trocar local do adesivo diariamente',
      'Nao aplicar adesivo em pele irritada',
      'Relatar perda de peso significativa',
    ],
    doencasRelacionadas: ['alzheimer', 'demencia', 'doenca-parkinson'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['demencia', 'alzheimer', 'parkinson', 'geriatria', 'anticolinesterasico'],
  },

  // =====================================================================
  // ANTIPSICOTICOS - USO EM DEMENCIA
  // =====================================================================
  {
    id: 'quetiapina',
    nomeGenerico: 'Fumarato de quetiapina',
    nomesComerciais: ['Seroquel', 'Queropax', 'Quetiel'],
    atcCode: 'N05AH04',
    rxNormCui: '51272',
    drugBankId: 'DB01224',
    snomedCT: '386850006',
    casNumber: '111974-69-7',
    dcbCode: '07650',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'antipsicotico_atipico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '300mg', disponivelSUS: true },
      { forma: 'comprimido_xr', concentracao: '50mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '200mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '300mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Esquizofrenia',
      'Transtorno bipolar (episodios maniacos e depressivos)',
      'Depressao unipolar (adjuvante)',
      'Sintomas comportamentais em demencia (uso criterioso)',
      'Insonia refrataria (off-label, doses baixas)',
    ],
    mecanismoAcao: 'Antagonista de multiplos receptores: D1, D2, 5-HT2A, 5-HT2C, H1, alfa1 e alfa2 adrenergicos. Baixa afinidade por D2 reduz sintomas extrapiramidais.',
    posologias: [
      {
        indicacao: 'Sintomas comportamentais em demencia',
        adultos: {
          dose: '12,5-25mg a noite, aumentar lentamente',
          frequencia: '1-2x/dia',
          doseMaxima: '100-150mg/dia em idosos',
          observacoes: 'Usar menor dose eficaz pelo menor tempo possivel',
        },
        idosos: {
          dose: '12,5-25mg iniciais',
          observacoes: 'Titular muito lentamente. Aumenta mortalidade em demencia (black box)',
        },
      },
      {
        indicacao: 'Esquizofrenia',
        adultos: {
          dose: '25mg 2x/dia, aumentar 50mg/dia',
          frequencia: '2x/dia ou 1x/noite (XR)',
          doseMaxima: '800mg/dia',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a quetiapina',
      'Uso concomitante de inibidores potentes de CYP3A4',
    ],
    precaucoes: [
      'Idosos com demencia (aumento de mortalidade - black box FDA)',
      'Diabetes ou fatores de risco',
      'Doenca cardiovascular',
      'Hipotensao ortostatica',
      'Epilepsia',
      'Catarata ou risco de',
      'Prolongamento QT',
    ],
    efeitosAdversos: {
      comuns: ['Sonolencia', 'Tontura', 'Boca seca', 'Ganho de peso', 'Constipacao', 'Hipotensao ortostatica'],
      graves: ['Sindrome metabolica', 'Discinesia tardia', 'Sindrome neuroleptica maligna', 'Prolongamento QT', 'Cetoacidose diabetica', 'Agranulocitose'],
    },
    interacoes: [
      {
        medicamento: 'Carbamazepina',
        gravidade: 'grave',
        efeito: 'Reducao drastica dos niveis de quetiapina (indutor CYP3A4)',
        conduta: 'Aumentar dose de quetiapina ate 5x se necessario',
      },
      {
        medicamento: 'Cetoconazol',
        gravidade: 'grave',
        efeito: 'Aumento dos niveis de quetiapina',
        conduta: 'Reduzir dose de quetiapina em 1/6',
      },
      {
        medicamento: 'Depressores SNC',
        gravidade: 'moderada',
        efeito: 'Sedacao excessiva',
        conduta: 'Usar com cautela',
      },
      {
        medicamento: 'Medicamentos que prolongam QT',
        gravidade: 'grave',
        efeito: 'Risco de arritmia',
        conduta: 'Evitar combinacao ou monitorar ECG',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Usar com cautela' },
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Excretada no leite, nao recomendada',
    },
    consideracoesEspeciais: {
      idosos: 'BLACK BOX: Aumento de mortalidade em idosos com demencia. Usar apenas se beneficio superar risco',
      hepatopatas: 'Iniciar com dose menor em insuficiencia hepatica',
    },
    monitorizacao: [
      'Glicemia e HbA1c',
      'Perfil lipidico',
      'Peso e IMC',
      'Pressao arterial',
      'ECG (QTc)',
      'Funcao hepatica',
    ],
    orientacoesPaciente: [
      'Pode causar sonolencia intensa',
      'Levantar-se lentamente para evitar tontura',
      'Nao dirigir ate conhecer os efeitos',
      'Relatar sede excessiva ou poliuria',
    ],
    doencasRelacionadas: ['esquizofrenia', 'transtorno-bipolar', 'demencia', 'alzheimer'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['antipsicotico', 'atipico', 'demencia', 'bipolar', 'geriatria'],
  },

  // =====================================================================
  // ANTIPARKINSONIANOS
  // =====================================================================
  {
    id: 'levodopa-carbidopa',
    nomeGenerico: 'Levodopa + Carbidopa',
    nomesComerciais: ['Sinemet', 'Cronomet', 'Duodopa', 'Prolopa (com benserazida)'],
    atcCode: 'N04BA02',
    rxNormCui: '6208',
    drugBankId: 'DB01235',
    snomedCT: '387131009',
    casNumber: '59-92-7',
    dcbCode: '05380',
    classeTerapeutica: 'antiparkinsoniano',
    subclasse: 'precursor_dopamina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg/25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg/25mg', disponivelSUS: true },
      { forma: 'comprimido_cr', concentracao: '200mg/50mg', disponivelSUS: false },
      { forma: 'comprimido_dispersivel', concentracao: '100mg/25mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Doenca de Parkinson idiopatica',
      'Parkinsonismo pos-encefalitico',
      'Parkinsonismo sintomatico (exceto induzido por medicamentos)',
      'Sindrome das pernas inquietas (off-label)',
    ],
    mecanismoAcao: 'Levodopa e convertida em dopamina no SNC. Carbidopa inibe a dopa-descarboxilase periferica, aumentando a disponibilidade de levodopa central e reduzindo efeitos perifericos.',
    posologias: [
      {
        indicacao: 'Doenca de Parkinson',
        adultos: {
          dose: '100/25mg 3x/dia, titular conforme resposta',
          frequencia: '3-4x/dia',
          doseMaxima: '2000mg de levodopa/dia',
          observacoes: 'Iniciar com doses baixas e aumentar gradualmente. Evitar pico-dose',
        },
        idosos: {
          dose: 'Iniciar com doses menores',
          observacoes: 'Maior susceptibilidade a efeitos adversos. Titular lentamente',
        },
      },
    ],
    contraindicacoes: [
      'Uso de IMAO nao seletivos (suspender 14 dias antes)',
      'Glaucoma de angulo fechado',
      'Melanoma maligno ou lesoes cutaneas suspeitas',
      'Hipersensibilidade aos componentes',
    ],
    precaucoes: [
      'Doenca cardiovascular grave',
      'Doenca pulmonar grave',
      'Ulcera peptica ativa',
      'Psicose',
      'Glaucoma de angulo aberto',
      'Insuficiencia hepatica ou renal grave',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Discinesias', 'Hipotensao ortostatica', 'Insonia', 'Alucinacoes', 'Sonolencia'],
      graves: ['Sindrome neuroleptica maligna (descontinuacao abrupta)', 'Psicose', 'Discinesias incapacitantes', 'Melanoma'],
    },
    interacoes: [
      {
        medicamento: 'IMAO nao seletivos',
        gravidade: 'contraindicada',
        efeito: 'Crise hipertensiva grave',
        conduta: 'Contraindicado. Aguardar 14 dias',
      },
      {
        medicamento: 'Antipsicóticos tipicos',
        gravidade: 'grave',
        efeito: 'Antagonismo do efeito antiparkinsoniano',
        conduta: 'Evitar ou usar antipsicoticos atipicos (quetiapina, clozapina)',
      },
      {
        medicamento: 'Ferro',
        gravidade: 'moderada',
        efeito: 'Reducao da absorcao de levodopa',
        conduta: 'Separar administracao por 2 horas',
      },
      {
        medicamento: 'Proteinas',
        gravidade: 'leve',
        efeito: 'Competicao por absorcao',
        conduta: 'Tomar longe das refeicoes proteicas',
      },
      {
        medicamento: 'Metoclopramida',
        gravidade: 'moderada',
        efeito: 'Antagonismo dopaminergico',
        conduta: 'Preferir domperidona',
      },
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Inibe lactacao. Evitar',
    },
    consideracoesEspeciais: {
      idosos: 'Iniciar com doses baixas. Maior risco de hipotensao ortostatica e confusao mental',
      hepatopatas: 'Usar com cautela',
    },
    monitorizacao: [
      'Resposta motora (escala UPDRS)',
      'Discinesias',
      'Pressao arterial (ortostatica)',
      'Sintomas neuropsiquiatricos',
      'Funcao hepatica',
    ],
    orientacoesPaciente: [
      'Nao suspender abruptamente',
      'Tomar longe de refeicoes ricas em proteinas',
      'Relatar movimentos involuntarios',
      'Levantar-se lentamente',
    ],
    doencasRelacionadas: ['doenca-parkinson'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['parkinson', 'geriatria', 'levodopa', 'dopamina'],
  },

  {
    id: 'pramipexol',
    nomeGenerico: 'Dicloridrato de pramipexol',
    nomesComerciais: ['Sifrol', 'Pramipexol', 'Mirapex'],
    atcCode: 'N04BC05',
    rxNormCui: '32937',
    drugBankId: 'DB00413',
    snomedCT: '395917002',
    casNumber: '104632-26-0',
    dcbCode: '07360',
    classeTerapeutica: 'antiparkinsoniano',
    subclasse: 'agonista_dopaminergico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,125mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '0,25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: true },
      { forma: 'comprimido_xr', concentracao: '0,375mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '1,5mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '3mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Doenca de Parkinson (monoterapia ou adjuvante)',
      'Sindrome das pernas inquietas moderada a grave',
    ],
    mecanismoAcao: 'Agonista dopaminergico nao ergotico com alta afinidade pelos receptores D3 e D2. Estimula diretamente os receptores dopaminergicos no estriado.',
    posologias: [
      {
        indicacao: 'Doenca de Parkinson',
        adultos: {
          dose: '0,125mg 3x/dia, aumentar a cada 5-7 dias',
          frequencia: '3x/dia (liberacao imediata) ou 1x/dia (XR)',
          doseMaxima: '4,5mg/dia (liberacao imediata) ou 4,5mg/dia (XR)',
          observacoes: 'Titular lentamente para minimizar nauseas e hipotensao',
        },
        idosos: {
          dose: 'Mesmo esquema, titular com mais cautela',
          observacoes: 'Maior risco de alucinacoes e confusao',
        },
      },
      {
        indicacao: 'Sindrome das pernas inquietas',
        adultos: {
          dose: '0,125mg 2-3h antes de dormir',
          frequencia: '1x/dia a noite',
          doseMaxima: '0,75mg/dia',
          observacoes: 'Aumentar a cada 4-7 dias se necessario',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao pramipexol',
    ],
    precaucoes: [
      'Disturbios psicoticos',
      'Insuficiencia renal',
      'Doenca cardiovascular grave',
      'Hipotensao',
      'Problemas de controle de impulsos',
      'Sonolencia diurna excessiva',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Tontura', 'Sonolencia', 'Hipotensao ortostatica', 'Constipacao', 'Edema periferico'],
      graves: ['Ataques de sono subitos', 'Alucinacoes', 'Transtorno do controle de impulsos (jogo patologico, hipersexualidade)', 'Sindrome de desregulacao dopaminergica'],
    },
    interacoes: [
      {
        medicamento: 'Cimetidina',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de pramipexol',
        conduta: 'Considerar reducao de dose',
      },
      {
        medicamento: 'Antipsicóticos',
        gravidade: 'grave',
        efeito: 'Antagonismo do efeito antiparkinsoniano',
        conduta: 'Evitar ou usar atipicos com cautela',
      },
      {
        medicamento: 'Depressores do SNC',
        gravidade: 'moderada',
        efeito: 'Sonolencia aditiva',
        conduta: 'Orientar sobre risco ao dirigir',
      },
      {
        medicamento: 'Amantadina',
        gravidade: 'leve',
        efeito: 'Aumento dos niveis de ambos (competicao renal)',
        conduta: 'Monitorar efeitos adversos',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Sem ajuste' },
      { tfg: '35-50', ajuste: 'Iniciar 0,125mg 2x/dia. Max 1,5mg/dia' },
      { tfg: '15-34', ajuste: 'Iniciar 0,125mg 1x/dia. Max 0,75mg/dia' },
      { tfg: '<15', ajuste: 'Nao estudado, usar com extrema cautela' },
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Inibe prolactina, contraindica amamentacao',
    },
    consideracoesEspeciais: {
      idosos: 'Risco aumentado de alucinacoes e confusao. Avaliar direcao veicular',
    },
    monitorizacao: [
      'Resposta motora',
      'Sonolencia diurna',
      'Comportamento impulsivo',
      'Pressao arterial',
      'Funcao renal',
    ],
    orientacoesPaciente: [
      'Nao dirigir se tiver ataques de sono',
      'Relatar comportamentos impulsivos (jogo, compras)',
      'Nao suspender abruptamente',
      'Pode causar sonolencia intensa',
    ],
    doencasRelacionadas: ['doenca-parkinson', 'sindrome-pernas-inquietas'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['parkinson', 'geriatria', 'agonista-dopaminergico', 'pernas-inquietas'],
  },

  // =====================================================================
  // ANTI-OSTEOPOROSE
  // =====================================================================
  {
    id: 'risedronato',
    nomeGenerico: 'Risedronato sodico',
    nomesComerciais: ['Actonel', 'Osteofar', 'Risedross'],
    atcCode: 'M05BA07',
    rxNormCui: '77492',
    drugBankId: 'DB00884',
    snomedCT: '395871002',
    casNumber: '105462-24-6',
    dcbCode: '08093',
    classeTerapeutica: 'anti_osteoporose',
    subclasse: 'bisfosfonato',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '35mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '150mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Osteoporose pos-menopausa (prevencao e tratamento)',
      'Osteoporose em homens',
      'Osteoporose induzida por glicocorticoides',
      'Doenca de Paget',
    ],
    mecanismoAcao: 'Bifosfonato que inibe a reabsorcao ossea mediada por osteoclastos. Liga-se a hidroxiapatita ossea e induz apoptose de osteoclastos.',
    posologias: [
      {
        indicacao: 'Osteoporose',
        adultos: {
          dose: '35mg semanal ou 150mg mensal ou 5mg diario',
          frequencia: 'Semanal (preferido) ou mensal',
          observacoes: 'Tomar em jejum com copo cheio de agua. Permanecer ereto 30 min',
        },
        idosos: {
          dose: 'Mesma posologia',
          observacoes: 'Avaliar capacidade de permanecer ereto. Verificar funcao renal',
        },
      },
    ],
    contraindicacoes: [
      'Hipocalcemia nao corrigida',
      'Incapacidade de permanecer ereto por 30 minutos',
      'Esofagopatias que retardam esvaziamento',
      'Clearance de creatinina <30 mL/min',
    ],
    precaucoes: [
      'Doenca GI alta (esofagite, ulcera, gastrite)',
      'Deficiencia de vitamina D ou calcio',
      'Insuficiencia renal moderada',
      'Uso prolongado (>5 anos) - avaliar necessidade',
    ],
    efeitosAdversos: {
      comuns: ['Dor abdominal', 'Nausea', 'Diarreia', 'Constipacao', 'Cefaleia', 'Artralgia'],
      graves: ['Osteonecrose de mandibula', 'Fratura atipica de femur', 'Esofagite erosiva', 'Fibrilacao atrial', 'Sindrome flu-like'],
    },
    interacoes: [
      {
        medicamento: 'Antiácidos e suplementos de calcio',
        gravidade: 'moderada',
        efeito: 'Reducao da absorcao de risedronato',
        conduta: 'Tomar risedronato 30 min antes ou 2h apos',
      },
      {
        medicamento: 'AINEs',
        gravidade: 'moderada',
        efeito: 'Aumento do risco de ulceracao GI',
        conduta: 'Usar com cautela',
      },
      {
        medicamento: 'Alimentos e bebidas (exceto agua)',
        gravidade: 'moderada',
        efeito: 'Reducao significativa da absorcao',
        conduta: 'Tomar em jejum absoluto com agua pura',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Contraindicado' },
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Nao recomendado, dados insuficientes',
    },
    consideracoesEspeciais: {
      idosos: 'Principal populacao alvo. Verificar capacidade de deglutir e permanecer ereto',
    },
    monitorizacao: [
      'Densitometria ossea (a cada 1-2 anos)',
      'Calcio e vitamina D sericos',
      'Funcao renal',
      'Sintomas esofagicos',
      'Saude dental antes de iniciar',
    ],
    orientacoesPaciente: [
      'Tomar em jejum com copo cheio de agua (pelo menos 180mL)',
      'Nao deitar ou comer por 30 minutos apos tomar',
      'Nao mastigar ou chupar o comprimido',
      'Suplementar calcio e vitamina D',
      'Informar dentista sobre uso',
    ],
    doencasRelacionadas: ['osteoporose'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['osteoporose', 'bisfosfonato', 'geriatria', 'osso'],
  },

  {
    id: 'teriparatida',
    nomeGenerico: 'Teriparatida (rhPTH 1-34)',
    nomesComerciais: ['Forteo', 'Teribone'],
    atcCode: 'H05AA02',
    rxNormCui: '199912',
    drugBankId: 'DB06285',
    snomedCT: '420568003',
    casNumber: '52232-67-4',
    dcbCode: '08785',
    classeTerapeutica: 'anti_osteoporose',
    subclasse: 'analogo_pth',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '20mcg/dose (caneta 28 doses)', disponivelSUS: false },
    ],
    indicacoes: [
      'Osteoporose grave com alto risco de fratura',
      'Osteoporose pos-menopausa com fraturas previas',
      'Osteoporose em homens com alto risco',
      'Osteoporose induzida por glicocorticoides',
      'Falha ou intolerancia a bifosfonatos',
    ],
    mecanismoAcao: 'Analogo recombinante do fragmento 1-34 do PTH humano. Quando administrado de forma intermitente, estimula predominantemente a formacao ossea sobre a reabsorcao.',
    posologias: [
      {
        indicacao: 'Osteoporose grave',
        adultos: {
          dose: '20mcg',
          frequencia: '1x/dia via subcutanea',
          doseMaxima: '20mcg/dia',
          observacoes: 'Duracao maxima de tratamento: 2 anos ao longo da vida',
        },
        idosos: {
          dose: 'Mesma posologia',
          observacoes: 'Monitorar hipotensao ortostatica',
        },
      },
    ],
    contraindicacoes: [
      'Hipercalcemia pre-existente',
      'Hiperparatireoidismo',
      'Doenca de Paget',
      'Elevacao inexplicada de fosfatase alcalina',
      'Radioterapia ossea previa',
      'Neoplasia ossea ou metastases osseas',
      'Criancas e adolescentes com epifises abertas',
    ],
    precaucoes: [
      'Urolitiase ativa ou recente',
      'Intoxicacao digitalica',
      'Insuficiencia renal moderada a grave',
      'Hipotensao ortostatica',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Cefaleia', 'Tontura', 'Artralgia', 'Caibras', 'Hipercalcemia transitoria'],
      graves: ['Hipercalcemia persistente', 'Hipotensao ortostatica', 'Osteossarcoma (risco teorico em roedores, nao confirmado em humanos)'],
    },
    interacoes: [
      {
        medicamento: 'Digitalicos',
        gravidade: 'moderada',
        efeito: 'Hipercalcemia pode predispor a intoxicacao digitalica',
        conduta: 'Monitorar calcio e sinais de intoxicacao',
      },
      {
        medicamento: 'Diureticos tiazidicos',
        gravidade: 'leve',
        efeito: 'Potencializacao da hipercalcemia',
        conduta: 'Monitorar calcio serico',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Usar com cautela, dados limitados' },
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Nao recomendado',
    },
    consideracoesEspeciais: {
      idosos: 'Indicado especialmente para idosos com osteoporose grave e fraturas',
    },
    monitorizacao: [
      'Calcio serico (hipercalcemia)',
      'Densitometria ossea',
      'Marcadores de remodelacao ossea',
      'Funcao renal',
    ],
    orientacoesPaciente: [
      'Aplicar na coxa ou abdome, alternando locais',
      'Armazenar caneta refrigerada',
      'Sentar ou deitar nas primeiras doses (risco de tontura)',
      'Tratamento limitado a 2 anos',
      'Continuar calcio e vitamina D',
    ],
    doencasRelacionadas: ['osteoporose'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['osteoporose', 'anabolico', 'PTH', 'geriatria', 'fratura'],
  },
];
