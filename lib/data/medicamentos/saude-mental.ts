/**
 * MEDICAMENTOS SAUDE MENTAL - DARWIN-MFC
 * =======================================
 * Antidepressivos, Ansioliticos, Estabilizadores de Humor, Antipsicoticos
 * Baseado na RENAME 2024 e bulas ANVISA
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosSaudeMental: Medicamento[] = [
  // =====================================================================
  // ANTIDEPRESSIVOS - ISRS
  // =====================================================================
  {
    id: 'sertralina',
    nomeGenerico: 'Cloridrato de sertralina',
    nomesComerciais: ['Zoloft', 'Assert', 'Tolrest', 'Sertralina'],
    atcCode: 'N06AB06',
    rxNormCui: '36437',
    drugBankId: 'DB01104',
    snomedCT: '372594008',
    casNumber: '79617-96-2',
    dcbCode: '08195',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'isrs',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
    ],
    indicacoes: [
      'Transtorno depressivo maior',
      'Transtorno de panico',
      'Transtorno obsessivo-compulsivo (TOC)',
      'Transtorno de estresse pos-traumatico (TEPT)',
      'Transtorno de ansiedade social (fobia social)',
      'Transtorno disfórico pre-menstrual',
    ],
    mecanismoAcao: 'Inibidor seletivo da recaptacao de serotonina (ISRS). Aumenta a disponibilidade de serotonina na fenda sinaptica por bloqueio do transportador de serotonina (SERT).',
    posologias: [
      {
        indicacao: 'Depressao e Ansiedade',
        adultos: {
          dose: '50mg/dia, aumentar a cada 1-2 semanas',
          frequencia: '1x/dia (manha ou noite)',
          doseMaxima: '200mg/dia',
          observacoes: 'Efeito terapeutico em 2-4 semanas',
        },
        pediatrico: {
          dose: 'TOC: 6-12 anos: 25mg/dia; 13-17 anos: 50mg/dia',
          frequencia: '1x/dia',
          idadeMinima: '6 anos',
          doseMaxima: '200mg/dia',
          observacoes: 'Apenas TOC aprovado em pediatria',
        },
        idosos: {
          dose: 'Iniciar com 25mg',
          observacoes: 'Titular com cautela',
        },
      },
    ],
    contraindicacoes: [
      'Uso concomitante de IMAO (aguardar 14 dias)',
      'Uso de pimozida',
      'Hipersensibilidade a sertralina',
    ],
    precaucoes: [
      'Risco de suicidio (monitorar no inicio, especialmente jovens)',
      'Transtorno bipolar (pode induzir mania)',
      'Epilepsia',
      'Insuficiencia hepatica',
      'Sangramento (uso com anticoagulantes/AINEs)',
      'Hiponatremia (idosos)',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Diarreia', 'Cefaleia', 'Insonia', 'Tontura', 'Disfuncao sexual', 'Boca seca'],
      graves: ['Sindrome serotoninergica', 'Sangramento', 'Hiponatremia', 'Mania/hipomania', 'Ideacao suicida', 'Sindrome de descontinuacao'],
    },
    interacoes: [
      {
        medicamento: 'IMAO',
        gravidade: 'contraindicada',
        efeito: 'Sindrome serotoninergica grave, potencialmente fatal',
        conduta: 'Contraindicado. Intervalo de 14 dias',
      },
      {
        medicamento: 'Tramadol',
        gravidade: 'grave',
        efeito: 'Risco de sindrome serotoninergica e convulsoes',
        conduta: 'Usar com extrema cautela ou evitar',
      },
      {
        medicamento: 'Varfarina',
        gravidade: 'moderada',
        efeito: 'Aumento do risco de sangramento',
        conduta: 'Monitorar INR',
      },
      {
        medicamento: 'Pimozida',
        gravidade: 'contraindicada',
        efeito: 'Aumento do intervalo QT',
        conduta: 'Contraindicado',
      },
      {
        medicamento: 'Litio',
        gravidade: 'moderada',
        efeito: 'Pode aumentar efeitos serotoninergicos',
        conduta: 'Monitorar litemia e sintomas serotoninergicos',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Usar com cautela, dados limitados' },
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: true,
      observacao: 'Compativel. Baixos niveis no leite. Preferido entre ISRS para lactantes',
    },
    consideracoesEspeciais: {
      idosos: 'Maior risco de hiponatremia. Iniciar com dose baixa',
      hepatopatas: 'Usar doses menores ou intervalos maiores',
      pediatrico: 'Apenas TOC aprovado. Monitorar ideacao suicida',
    },
    monitorizacao: [
      'Sintomas depressivos e suicidabilidade',
      'Funcao hepatica',
      'Sodio serico (idosos)',
      'Sintomas de mania',
    ],
    orientacoesPaciente: [
      'Efeito leva 2-4 semanas para aparecer',
      'Nao suspender abruptamente',
      'Relatar pensamentos de autolesao',
      'Evitar alcool',
    ],
    doencasRelacionadas: ['depressao', 'ansiedade', 'toc', 'panico', 'tept'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['antidepressivo', 'ISRS', 'depressao', 'ansiedade', 'TOC'],
  },

  {
    id: 'fluoxetina',
    nomeGenerico: 'Cloridrato de fluoxetina',
    nomesComerciais: ['Prozac', 'Daforin', 'Fluoxetina'],
    atcCode: 'N06AB03',
    rxNormCui: '4493',
    drugBankId: 'DB00472',
    snomedCT: '372767007',
    casNumber: '54910-89-3',
    dcbCode: '04229',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'isrs',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '10mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '20mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '20mg/5mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Transtorno depressivo maior',
      'Transtorno obsessivo-compulsivo',
      'Bulimia nervosa',
      'Transtorno de panico',
      'Transtorno disfórico pre-menstrual',
    ],
    mecanismoAcao: 'ISRS com meia-vida longa (1-4 dias do farmaco; 4-16 dias do metabolito norfluoxetina). Inibe recaptacao de serotonina.',
    posologias: [
      {
        indicacao: 'Depressao',
        adultos: {
          dose: '20mg/dia, aumentar apos 4-6 semanas se necessario',
          frequencia: '1x/dia pela manha',
          doseMaxima: '80mg/dia',
          observacoes: 'Meia-vida longa permite dose unica diaria',
        },
        pediatrico: {
          dose: 'Depressao: >=8 anos: iniciar 10-20mg/dia. TOC: >=7 anos: 10mg/dia',
          frequencia: '1x/dia',
          idadeMinima: '7 anos (TOC), 8 anos (depressao)',
          doseMaxima: '60mg/dia',
        },
        idosos: {
          dose: 'Iniciar com 10-20mg',
          observacoes: 'Meia-vida ainda mais longa',
        },
      },
    ],
    contraindicacoes: [
      'Uso de IMAO (intervalo de 14 dias antes e 5 semanas apos fluoxetina)',
      'Uso de pimozida ou tioridazina',
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Risco de suicidio',
      'Transtorno bipolar',
      'Epilepsia',
      'Diabetes (pode alterar glicemia)',
      'Glaucoma de angulo fechado',
      'Sangramento',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Cefaleia', 'Insonia', 'Ansiedade', 'Anorexia', 'Disfuncao sexual', 'Tremor'],
      graves: ['Sindrome serotoninergica', 'Mania', 'Convulsoes', 'Sindrome de descontinuacao', 'SIADH'],
    },
    interacoes: [
      {
        medicamento: 'IMAO',
        gravidade: 'contraindicada',
        efeito: 'Sindrome serotoninergica',
        conduta: 'Aguardar 14 dias antes e 5 semanas apos fluoxetina',
      },
      {
        medicamento: 'Tamoxifeno',
        gravidade: 'grave',
        efeito: 'Reducao da conversao em endoxifeno (inibicao CYP2D6)',
        conduta: 'Evitar. Usar outro ISRS (ex: citalopram, sertralina)',
      },
      {
        medicamento: 'Antipsicóticos',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis por inibicao CYP2D6',
        conduta: 'Monitorar efeitos adversos, considerar reducao de dose',
      },
      {
        medicamento: 'Carbamazepina',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de carbamazepina',
        conduta: 'Monitorar toxicidade',
      },
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: true,
      observacao: 'Preferir sertralina. Fluoxetina aceitavel com monitoracao',
    },
    consideracoesEspeciais: {
      idosos: 'Meia-vida prolongada. Maior risco de hiponatremia e sangramento',
      hepatopatas: 'Usar doses menores e aumentar intervalo',
    },
    monitorizacao: [
      'Sintomas depressivos',
      'Peso',
      'Glicemia (diabeticos)',
      'Sodio (idosos)',
    ],
    orientacoesPaciente: [
      'Tomar pela manha (pode causar insonia)',
      'Efeito em 2-4 semanas',
      'Nao interromper abruptamente (embora meia-vida longa)',
    ],
    doencasRelacionadas: ['depressao', 'toc', 'bulimia', 'panico'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['antidepressivo', 'ISRS', 'depressao', 'TOC', 'bulimia'],
  },

  {
    id: 'escitalopram',
    nomeGenerico: 'Oxalato de escitalopram',
    nomesComerciais: ['Lexapro', 'Reconter', 'Exodus'],
    atcCode: 'N06AB10',
    rxNormCui: '321988',
    drugBankId: 'DB01175',
    snomedCT: '400447003',
    casNumber: '128196-01-0',
    dcbCode: '03709',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'isrs',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '15mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
      { forma: 'gotas', concentracao: '20mg/mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Transtorno depressivo maior',
      'Transtorno de ansiedade generalizada',
      'Transtorno de panico',
      'Transtorno obsessivo-compulsivo',
      'Transtorno de ansiedade social',
    ],
    mecanismoAcao: 'Enantiomero S do citalopram. ISRS com alta seletividade para o transportador de serotonina. Considerado o ISRS mais seletivo.',
    posologias: [
      {
        indicacao: 'Depressao e TAG',
        adultos: {
          dose: '10mg/dia, aumentar para 20mg apos 1-2 semanas se necessario',
          frequencia: '1x/dia (manha ou noite)',
          doseMaxima: '20mg/dia',
        },
        idosos: {
          dose: '5mg/dia, maximo 10mg/dia',
          observacoes: 'Risco de prolongamento QT',
        },
      },
    ],
    contraindicacoes: [
      'Uso de IMAO',
      'Prolongamento QT ou sindrome do QT longo congenita',
      'Uso de medicamentos que prolongam QT',
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Risco de suicidio',
      'Bipolaridade',
      'Epilepsia',
      'Disturbios eletrolíticos (hipocalemia, hipomagnesemia)',
      'Insuficiencia hepatica',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Cefaleia', 'Sonolencia ou insonia', 'Disfuncao sexual', 'Sudorese', 'Fadiga'],
      graves: ['Prolongamento QT', 'Sindrome serotoninergica', 'Sangramento', 'Hiponatremia'],
    },
    interacoes: [
      {
        medicamento: 'IMAO',
        gravidade: 'contraindicada',
        efeito: 'Sindrome serotoninergica',
        conduta: 'Intervalo de 14 dias',
      },
      {
        medicamento: 'Medicamentos que prolongam QT',
        gravidade: 'grave',
        efeito: 'Torsades de pointes',
        conduta: 'Evitar combinacao ou monitorar ECG',
      },
      {
        medicamento: 'Omeprazol',
        gravidade: 'moderada',
        efeito: 'Aumento moderado dos niveis de escitalopram',
        conduta: 'Geralmente sem significado clinico',
      },
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: true,
      observacao: 'Aceitavel com monitoracao',
    },
    consideracoesEspeciais: {
      idosos: 'Dose maxima 10mg devido risco de QT',
      hepatopatas: 'Dose maxima 10mg',
    },
    monitorizacao: [
      'ECG (se fatores de risco para QT)',
      'Eletrólitos',
      'Sintomas depressivos',
    ],
    orientacoesPaciente: [
      'Pode ser tomado com ou sem alimentos',
      'Efeito em 2-4 semanas',
      'Relatar palpitacoes ou sincope',
    ],
    doencasRelacionadas: ['depressao', 'ansiedade', 'tag', 'panico'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['antidepressivo', 'ISRS', 'depressao', 'ansiedade'],
  },

  // =====================================================================
  // ANTIDEPRESSIVOS - IRSN
  // =====================================================================
  {
    id: 'venlafaxina',
    nomeGenerico: 'Cloridrato de venlafaxina',
    nomesComerciais: ['Efexor XR', 'Venlift', 'Alenthus XR'],
    atcCode: 'N06AX16',
    rxNormCui: '39786',
    drugBankId: 'DB00285',
    snomedCT: '372490001',
    casNumber: '93413-69-5',
    dcbCode: '09587',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'irsn',
    rename: false,
    apresentacoes: [
      { forma: 'capsula_xr', concentracao: '37,5mg', disponivelSUS: false },
      { forma: 'capsula_xr', concentracao: '75mg', disponivelSUS: false },
      { forma: 'capsula_xr', concentracao: '150mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '37,5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '75mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Transtorno depressivo maior',
      'Transtorno de ansiedade generalizada',
      'Transtorno de ansiedade social',
      'Transtorno de panico',
      'Dor neuropatica (off-label)',
      'Profilaxia de enxaqueca (off-label)',
    ],
    mecanismoAcao: 'Inibidor da recaptacao de serotonina e noradrenalina (IRSN). Em doses baixas, predomina efeito serotoninergico; em doses altas (>=150mg), adiciona efeito noradrenergico.',
    posologias: [
      {
        indicacao: 'Depressao e Ansiedade',
        adultos: {
          dose: '37,5-75mg/dia, aumentar a cada 1-2 semanas',
          frequencia: '1x/dia (XR) ou 2-3x/dia (liberacao imediata)',
          doseMaxima: '375mg/dia (depressao), 225mg/dia (ansiedade)',
          observacoes: 'XR preferido por melhor tolerabilidade',
        },
        idosos: {
          dose: 'Iniciar com 37,5mg',
          observacoes: 'Titular lentamente. Monitorar PA',
        },
      },
    ],
    contraindicacoes: [
      'Uso de IMAO (intervalo 14 dias)',
      'Hipersensibilidade',
      'Hipertensao nao controlada (cuidado)',
    ],
    precaucoes: [
      'Hipertensao arterial',
      'Cardiopatia',
      'Glaucoma de angulo fechado',
      'Risco de suicidio',
      'Epilepsia',
      'Insuficiencia renal ou hepatica',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Cefaleia', 'Tontura', 'Insonia', 'Sudorese', 'Boca seca', 'Constipacao'],
      graves: ['Hipertensao', 'Sindrome serotoninergica', 'Sindrome de descontinuacao grave', 'Ideacao suicida', 'Sangramento'],
    },
    interacoes: [
      {
        medicamento: 'IMAO',
        gravidade: 'contraindicada',
        efeito: 'Sindrome serotoninergica',
        conduta: 'Intervalo de 14 dias',
      },
      {
        medicamento: 'Tramadol',
        gravidade: 'grave',
        efeito: 'Sindrome serotoninergica e convulsoes',
        conduta: 'Evitar ou usar com extrema cautela',
      },
      {
        medicamento: 'Anticoagulantes',
        gravidade: 'moderada',
        efeito: 'Aumento do risco de sangramento',
        conduta: 'Monitorar',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '10-70', ajuste: 'Reduzir dose em 25-50%' },
      { tfg: '<10', ajuste: 'Reduzir dose em 50%' },
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: true,
      observacao: 'Com cautela. Monitorar o lactente',
    },
    consideracoesEspeciais: {
      idosos: 'Monitorar PA. Risco de hiponatremia',
      hepatopatas: 'Reduzir dose em 50% na insuficiencia moderada',
    },
    monitorizacao: [
      'Pressao arterial (especialmente em doses altas)',
      'Frequencia cardiaca',
      'Sintomas depressivos',
      'Funcao renal',
    ],
    orientacoesPaciente: [
      'Nao interromper abruptamente (sindrome de descontinuacao grave)',
      'Tomar com alimentos',
      'Relatar aumento de PA',
    ],
    doencasRelacionadas: ['depressao', 'ansiedade', 'tag', 'panico', 'dor-neuropatica'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['antidepressivo', 'IRSN', 'depressao', 'ansiedade', 'dor'],
  },

  // =====================================================================
  // ANTIDEPRESSIVOS - OUTROS
  // =====================================================================
  {
    id: 'bupropiona',
    nomeGenerico: 'Cloridrato de bupropiona',
    nomesComerciais: ['Wellbutrin', 'Bup', 'Zetron', 'Zyban'],
    atcCode: 'N06AX12',
    rxNormCui: '42347',
    drugBankId: 'DB01156',
    snomedCT: '387564004',
    casNumber: '31677-93-7',
    dcbCode: '01593',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'atipico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido_xr', concentracao: '150mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '300mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '150mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Transtorno depressivo maior',
      'Transtorno afetivo sazonal',
      'Cessacao do tabagismo',
      'TDAH (off-label)',
      'Disfuncao sexual induzida por ISRS (adjuvante, off-label)',
    ],
    mecanismoAcao: 'Inibidor da recaptacao de dopamina e noradrenalina (IRDN). Nao afeta a serotonina, por isso nao causa disfuncao sexual e tem efeito ativador.',
    posologias: [
      {
        indicacao: 'Depressao',
        adultos: {
          dose: '150mg 1x/dia por 4 dias, depois 150mg 2x/dia ou 300mg XL 1x/dia',
          frequencia: '1x/dia (XL) ou 2x/dia (SR)',
          doseMaxima: '450mg/dia',
          observacoes: 'Manter 8h entre doses (SR). Nao exceder 150mg por dose',
        },
      },
      {
        indicacao: 'Cessacao tabagismo',
        adultos: {
          dose: '150mg/dia por 3 dias, depois 150mg 2x/dia',
          frequencia: '2x/dia',
          doseMaxima: '300mg/dia',
          observacoes: 'Iniciar 1-2 semanas antes de parar de fumar. Usar por 7-12 semanas',
        },
      },
    ],
    contraindicacoes: [
      'Epilepsia ou historia de convulsoes',
      'Transtornos alimentares (anorexia, bulimia)',
      'Uso de IMAO',
      'Descontinuacao abrupta de alcool ou sedativos',
      'Uso de outros medicamentos com bupropiona',
    ],
    precaucoes: [
      'Fatores de risco para convulsao',
      'Hipertensao',
      'Psicose ou mania',
      'Insuficiencia hepatica',
      'Insuficiencia renal',
    ],
    efeitosAdversos: {
      comuns: ['Insonia', 'Cefaleia', 'Boca seca', 'Nausea', 'Agitacao', 'Tremor', 'Constipacao'],
      graves: ['Convulsoes (dose-dependente)', 'Psicose', 'Mania', 'Reacoes de hipersensibilidade'],
    },
    interacoes: [
      {
        medicamento: 'IMAO',
        gravidade: 'contraindicada',
        efeito: 'Crise hipertensiva',
        conduta: 'Intervalo de 14 dias',
      },
      {
        medicamento: 'Medicamentos que reduzem limiar convulsivo',
        gravidade: 'grave',
        efeito: 'Aumento do risco de convulsoes',
        conduta: 'Avaliar risco-beneficio',
      },
      {
        medicamento: 'Substratos CYP2D6 (tamoxifeno, codeina)',
        gravidade: 'moderada',
        efeito: 'Inibicao do metabolismo',
        conduta: 'Codeina pode ter efeito reduzido',
      },
      {
        medicamento: 'Alcool',
        gravidade: 'grave',
        efeito: 'Aumento do risco de convulsoes',
        conduta: 'Minimizar consumo de alcool',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: '150mg/dia (em dias alternados ou 1x/dia)', observacao: 'Metabolitos acumulam' },
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: true,
      observacao: 'Usar com cautela, excretado no leite',
    },
    consideracoesEspeciais: {
      idosos: 'Maior risco de acumulacao. Usar doses menores',
      hepatopatas: 'Maximo 150mg/dia na insuficiencia moderada. Evitar na grave',
    },
    monitorizacao: [
      'Pressao arterial',
      'Sintomas depressivos',
      'Sinais de convulsao',
    ],
    orientacoesPaciente: [
      'Tomar pela manha para evitar insonia',
      'Nao mastigar comprimidos XR',
      'Evitar alcool excessivo',
      'Nao usar para perda de peso',
    ],
    doencasRelacionadas: ['depressao', 'tabagismo', 'tdah'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['antidepressivo', 'atipico', 'tabagismo', 'dopamina', 'noradrenalina'],
  },

  // =====================================================================
  // BENZODIAZEPINICOS
  // =====================================================================
  {
    id: 'clonazepam',
    nomeGenerico: 'Clonazepam',
    nomesComerciais: ['Rivotril', 'Clonotril', 'Clonazepam'],
    atcCode: 'N03AE01',
    rxNormCui: '2598',
    drugBankId: 'DB01068',
    snomedCT: '387383007',
    casNumber: '1622-61-3',
    dcbCode: '02370',
    classeTerapeutica: 'ansiolitico',
    subclasse: 'benzodiazepínico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '2,5mg/mL', disponivelSUS: true },
    ],
    indicacoes: [
      'Transtorno de panico',
      'Epilepsia (crises mioclonicas, ausencias, Lennox-Gastaut)',
      'Transtorno de ansiedade generalizada',
      'Transtorno de ansiedade social',
      'Sindrome das pernas inquietas (off-label)',
    ],
    mecanismoAcao: 'Benzodiazepínico de alta potencia e meia-vida intermediaria. Potencializa a acao do GABA no receptor GABA-A, aumentando a abertura de canais de cloro.',
    posologias: [
      {
        indicacao: 'Ansiedade e Panico',
        adultos: {
          dose: '0,25-0,5mg 2x/dia, aumentar a cada 3 dias',
          frequencia: '2-3x/dia',
          doseMaxima: '4mg/dia',
          observacoes: 'Usar menor dose eficaz pelo menor tempo',
        },
        idosos: {
          dose: '0,25mg 1-2x/dia',
          observacoes: 'Maior sensibilidade. Risco de quedas e confusao',
        },
      },
      {
        indicacao: 'Epilepsia',
        adultos: {
          dose: '1,5mg/dia em 3 doses, aumentar 0,5-1mg a cada 3 dias',
          frequencia: '3x/dia',
          doseMaxima: '20mg/dia',
        },
        pediatrico: {
          dose: '0,01-0,03 mg/kg/dia dividido em 2-3 doses',
          frequencia: '2-3x/dia',
          doseMaxima: '0,2 mg/kg/dia',
        },
      },
    ],
    contraindicacoes: [
      'Miastenia gravis',
      'Insuficiencia respiratória grave',
      'Apneia do sono nao tratada',
      'Insuficiencia hepatica grave',
      'Glaucoma de angulo fechado agudo',
    ],
    precaucoes: [
      'Dependencia e tolerancia',
      'Historia de abuso de substancias',
      'Depressao (pode agravar)',
      'Idosos',
      'Insuficiencia renal ou hepatica',
      'Uso de opioides',
    ],
    efeitosAdversos: {
      comuns: ['Sonolencia', 'Tontura', 'Ataxia', 'Fadiga', 'Alteracoes de memoria'],
      graves: ['Depressao respiratoria', 'Dependencia', 'Reacao paradoxal (agitacao)', 'Depressao', 'Ideacao suicida'],
    },
    interacoes: [
      {
        medicamento: 'Opioides',
        gravidade: 'grave',
        efeito: 'Depressao respiratoria, coma, morte',
        conduta: 'Evitar. Se necessario, usar menores doses e monitorar',
      },
      {
        medicamento: 'Alcool',
        gravidade: 'grave',
        efeito: 'Depressao SNC aditiva',
        conduta: 'Evitar alcool',
      },
      {
        medicamento: 'Antidepressivos',
        gravidade: 'moderada',
        efeito: 'Sedacao aumentada',
        conduta: 'Monitorar',
      },
      {
        medicamento: 'Cetoconazol',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de clonazepam',
        conduta: 'Considerar reducao de dose',
      },
    ],
    gestacao: 'D',
    amamentacao: {
      compativel: false,
      observacao: 'Evitar. Excretado no leite, pode causar sedacao no lactente',
    },
    consideracoesEspeciais: {
      idosos: 'Maior risco de quedas, confusao, sedacao excessiva. Evitar se possivel',
    },
    monitorizacao: [
      'Sinais de dependencia',
      'Nivel de sedacao',
      'Funcao respiratoria (se uso de opioides)',
    ],
    orientacoesPaciente: [
      'Pode causar dependencia - usar pelo menor tempo',
      'Nao dirigir ou operar maquinas',
      'Nao suspender abruptamente',
      'Evitar alcool',
    ],
    doencasRelacionadas: ['ansiedade', 'panico', 'epilepsia'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['benzodiazepínico', 'ansiolitico', 'anticonvulsivante', 'panico'],
  },

  {
    id: 'alprazolam',
    nomeGenerico: 'Alprazolam',
    nomesComerciais: ['Frontal', 'Apraz', 'Tranquinal'],
    atcCode: 'N05BA12',
    rxNormCui: '596',
    drugBankId: 'DB00404',
    snomedCT: '386983007',
    casNumber: '28981-97-7',
    dcbCode: '00456',
    classeTerapeutica: 'ansiolitico',
    subclasse: 'benzodiazepínico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,25mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '0,5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '0,5mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '1mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Transtorno de panico',
      'Transtorno de ansiedade generalizada',
      'Ansiedade associada a depressao',
    ],
    mecanismoAcao: 'Benzodiazepínico triazolobenzodiazepínico de alta potencia e curta duracao. Ligacao ao receptor GABA-A.',
    posologias: [
      {
        indicacao: 'Ansiedade',
        adultos: {
          dose: '0,25-0,5mg 3x/dia',
          frequencia: '3x/dia',
          doseMaxima: '4mg/dia',
          observacoes: 'Meia-vida curta pode requerer doses frequentes',
        },
        idosos: {
          dose: '0,25mg 2-3x/dia',
          observacoes: 'Maior sensibilidade',
        },
      },
      {
        indicacao: 'Panico',
        adultos: {
          dose: '0,5mg 3x/dia, aumentar a cada 3-4 dias',
          frequencia: '3x/dia ou XR 1x/dia',
          doseMaxima: '10mg/dia',
        },
      },
    ],
    contraindicacoes: [
      'Glaucoma de angulo fechado agudo',
      'Miastenia gravis grave',
      'Insuficiencia respiratória grave',
      'Uso de itraconazol ou cetoconazol',
    ],
    precaucoes: [
      'Alto potencial de dependencia',
      'Historia de abuso de substancias',
      'Depressao',
      'Idosos',
      'Insuficiencia hepatica',
    ],
    efeitosAdversos: {
      comuns: ['Sonolencia', 'Sedacao', 'Ataxia', 'Alteracao de memoria', 'Fadiga'],
      graves: ['Depressao respiratoria', 'Dependencia', 'Abstinencia grave (convulsoes)', 'Reacao paradoxal'],
    },
    interacoes: [
      {
        medicamento: 'Cetoconazol/Itraconazol',
        gravidade: 'contraindicada',
        efeito: 'Aumento drastico dos niveis de alprazolam',
        conduta: 'Contraindicado',
      },
      {
        medicamento: 'Opioides',
        gravidade: 'grave',
        efeito: 'Depressao respiratoria e SNC',
        conduta: 'Evitar. Black box FDA',
      },
      {
        medicamento: 'Alcool',
        gravidade: 'grave',
        efeito: 'Sedacao excessiva',
        conduta: 'Evitar',
      },
      {
        medicamento: 'Fluoxetina',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de alprazolam',
        conduta: 'Reduzir dose de alprazolam',
      },
    ],
    gestacao: 'D',
    amamentacao: {
      compativel: false,
      observacao: 'Evitar',
    },
    consideracoesEspeciais: {
      idosos: 'Alto risco. Preferir outros tratamentos',
      hepatopatas: 'Iniciar com doses menores',
    },
    monitorizacao: [
      'Sinais de abuso e dependencia',
      'Sedacao',
      'Funcao respiratoria',
    ],
    orientacoesPaciente: [
      'Altamente viciante - usar pelo menor tempo possivel',
      'Nao suspender abruptamente (risco de convulsoes)',
      'Nao dirigir',
      'Evitar alcool',
    ],
    doencasRelacionadas: ['ansiedade', 'panico'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['benzodiazepínico', 'ansiolitico', 'panico', 'dependencia'],
  },

  // =====================================================================
  // ESTABILIZADORES DE HUMOR
  // =====================================================================
  {
    id: 'litio',
    nomeGenerico: 'Carbonato de litio',
    nomesComerciais: ['Carbolitium', 'Litiocar', 'Neurolithium'],
    atcCode: 'N05AN01',
    rxNormCui: '6448',
    drugBankId: 'DB01356',
    snomedCT: '387480006',
    casNumber: '554-13-2',
    dcbCode: '01754',
    classeTerapeutica: 'estabilizador_humor',
    subclasse: 'sal_litio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '300mg', disponivelSUS: true },
      { forma: 'comprimido_cr', concentracao: '450mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Transtorno bipolar (episodios maniacos e depressivos)',
      'Profilaxia de episodios bipolares',
      'Depressao maior recorrente (adjuvante)',
      'Transtorno esquizoafetivo',
      'Cefaleia em salvas (off-label)',
    ],
    mecanismoAcao: 'Mecanismo nao completamente elucidado. Modula neurotransmissao, inibe inositol monofosfatase, afeta sistema de segundo mensageiro. Efeitos neuroprotetores.',
    posologias: [
      {
        indicacao: 'Transtorno bipolar',
        adultos: {
          dose: '300mg 2-3x/dia, titular pela litemia',
          frequencia: '2-3x/dia',
          doseMaxima: 'Guiar pela litemia (0,6-1,2 mEq/L)',
          observacoes: 'Litemia terapeutica: 0,6-1,0 mEq/L (manutencao), 1,0-1,2 mEq/L (mania aguda)',
        },
        idosos: {
          dose: 'Iniciar com doses menores',
          observacoes: 'Maior sensibilidade. Monitorar funcao renal e litemia mais frequentemente',
        },
      },
    ],
    contraindicacoes: [
      'Insuficiencia renal grave',
      'Deplecao de sodio grave',
      'Doenca cardiovascular grave',
      'Sindrome de Brugada',
      'Adicao/Doenca de Addison nao tratada',
    ],
    precaucoes: [
      'Hipotireoidismo',
      'Doenca renal',
      'Doenca cardiovascular',
      'Desidratacao',
      'Dieta hipossodica',
      'Uso de diureticos, IECA, AINEs',
      'Idosos',
      'Epilepsia',
    ],
    efeitosAdversos: {
      comuns: ['Tremor fino', 'Poliuria', 'Polidipsia', 'Ganho de peso', 'Nausea', 'Diarreia', 'Hipotireoidismo'],
      graves: ['Intoxicacao por litio', 'Diabetes insipidus nefrogenico', 'Arritmias', 'Encefalopatia', 'Sindrome serotoninergica (com ISRS)'],
    },
    interacoes: [
      {
        medicamento: 'AINEs',
        gravidade: 'grave',
        efeito: 'Aumento da litemia (reducao de excrecao renal)',
        conduta: 'Monitorar litemia. Evitar uso prolongado',
      },
      {
        medicamento: 'Diureticos tiazidicos',
        gravidade: 'grave',
        efeito: 'Aumento da litemia',
        conduta: 'Reduzir dose de litio em 25-50%. Monitorar',
      },
      {
        medicamento: 'IECA/BRA',
        gravidade: 'moderada',
        efeito: 'Aumento da litemia',
        conduta: 'Monitorar litemia ao iniciar ou alterar dose',
      },
      {
        medicamento: 'ISRS',
        gravidade: 'moderada',
        efeito: 'Risco de sindrome serotoninergica',
        conduta: 'Monitorar sintomas. Combinacao comum na pratica',
      },
      {
        medicamento: 'Metronidazol',
        gravidade: 'moderada',
        efeito: 'Aumento da litemia',
        conduta: 'Monitorar',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '50-89', ajuste: '75% da dose' },
      { tfg: '10-50', ajuste: '50-75% da dose' },
      { tfg: '<10', ajuste: '25-50% da dose. Considerar evitar' },
    ],
    gestacao: 'D',
    amamentacao: {
      compativel: false,
      observacao: 'Evitar. Excretado no leite, risco de toxicidade no lactente',
    },
    consideracoesEspeciais: {
      idosos: 'Funcao renal reduzida aumenta risco de toxicidade. Usar doses menores',
      hepatopatas: 'Sem necessidade de ajuste (excrecao renal)',
    },
    monitorizacao: [
      'Litemia (a cada 5-7 dias no inicio, depois mensal, depois trimestral)',
      'Funcao renal (creatinina, ureia)',
      'Funcao tireoideana (TSH)',
      'Calcio serico',
      'ECG (se cardiopatia)',
      'Peso',
    ],
    orientacoesPaciente: [
      'Manter ingesta hidrica adequada',
      'Manter ingesta regular de sodio',
      'Evitar AINEs sem orientacao medica',
      'Relatar tremor intenso, vomitos, confusao (sinais de intoxicacao)',
      'Fazer exames de sangue regularmente',
    ],
    doencasRelacionadas: ['transtorno-bipolar', 'depressao'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['estabilizador-humor', 'bipolar', 'mania', 'litio'],
  },

  {
    id: 'valproato',
    nomeGenerico: 'Valproato de sodio / Acido valproico',
    nomesComerciais: ['Depakene', 'Depakote', 'Valpakine', 'Torval'],
    atcCode: 'N03AG01',
    rxNormCui: '10808',
    drugBankId: 'DB00313',
    snomedCT: '387080000',
    casNumber: '99-66-1',
    dcbCode: '00095',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'acido_valproico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido_cr', concentracao: '300mg', disponivelSUS: false },
      { forma: 'comprimido_cr', concentracao: '500mg', disponivelSUS: false },
      { forma: 'xarope', concentracao: '250mg/5mL', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '100mg/mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Epilepsia (todos os tipos de crises)',
      'Transtorno bipolar (mania aguda e manutencao)',
      'Profilaxia de enxaqueca',
    ],
    mecanismoAcao: 'Multiplos mecanismos: aumento de GABA, bloqueio de canais de sodio e calcio, modulacao de HDAC. Amplo espectro anticonvulsivante.',
    posologias: [
      {
        indicacao: 'Transtorno bipolar',
        adultos: {
          dose: '750mg/dia em doses divididas, aumentar rapidamente',
          frequencia: '2-3x/dia',
          doseMaxima: '60mg/kg/dia',
          observacoes: 'Nivel serico: 50-125 mcg/mL',
        },
      },
      {
        indicacao: 'Epilepsia',
        adultos: {
          dose: '10-15 mg/kg/dia, aumentar 5-10mg/kg/semana',
          frequencia: '2-3x/dia',
          doseMaxima: '60mg/kg/dia',
        },
        pediatrico: {
          dose: '10-15 mg/kg/dia',
          frequencia: '2-3x/dia',
          doseMaxima: '60mg/kg/dia',
          observacoes: 'Maior risco de hepatotoxicidade em <2 anos',
        },
      },
    ],
    contraindicacoes: [
      'Doenca hepatica ativa ou significativa',
      'Disfuncao mitocondrial conhecida',
      'Gestacao (especialmente 1o trimestre) - teratogenicidade',
      'Porfiria',
      'Disturbio do ciclo da ureia',
    ],
    precaucoes: [
      'Mulheres em idade fertil (teratogenicidade)',
      'Historia de pancreatite',
      'Trombocitopenia',
      'Insuficiencia renal',
      'Crianças <2 anos (hepatotoxicidade)',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Ganho de peso', 'Alopecia', 'Tremor', 'Sonolencia', 'Trombocitopenia'],
      graves: ['Hepatotoxicidade fulminante', 'Pancreatite', 'Teratogenicidade (defeitos do tubo neural)', 'Encefalopatia hiperamonemica', 'Sindrome de ovarios policisticos'],
    },
    interacoes: [
      {
        medicamento: 'Carbamazepina',
        gravidade: 'moderada',
        efeito: 'Reducao dos niveis de valproato; aumento de metabolitos toxicos da CBZ',
        conduta: 'Monitorar niveis e toxicidade',
      },
      {
        medicamento: 'Lamotrigina',
        gravidade: 'grave',
        efeito: 'Aumento dos niveis de lamotrigina (risco de rash grave)',
        conduta: 'Reduzir dose de lamotrigina pela metade',
      },
      {
        medicamento: 'Fenitoina',
        gravidade: 'moderada',
        efeito: 'Interacao complexa bilateral',
        conduta: 'Monitorar niveis de ambos',
      },
      {
        medicamento: 'Topiramato',
        gravidade: 'moderada',
        efeito: 'Aumento do risco de hiperamonemia e encefalopatia',
        conduta: 'Monitorar amonia se sintomas de confusao',
      },
    ],
    gestacao: 'X',
    amamentacao: {
      compativel: true,
      observacao: 'Provavelmente compativel, baixos niveis no leite',
    },
    consideracoesEspeciais: {
      idosos: 'Maior risco de sedacao e trombocitopenia',
      hepatopatas: 'Contraindicado na doenca hepatica ativa',
      pediatrico: 'Alto risco de hepatotoxicidade em <2 anos com politerapia',
    },
    monitorizacao: [
      'Nivel serico (50-125 mcg/mL para bipolar)',
      'Funcao hepatica',
      'Hemograma com plaquetas',
      'Amonia (se sintomas)',
      'Peso',
    ],
    orientacoesPaciente: [
      'Usar contracepcao eficaz (mulheres)',
      'Tomar com alimentos para reduzir nausea',
      'Relatar dor abdominal, ictericia, sangramento',
      'Nao suspender abruptamente',
    ],
    doencasRelacionadas: ['transtorno-bipolar', 'epilepsia', 'enxaqueca'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['estabilizador-humor', 'anticonvulsivante', 'bipolar', 'epilepsia'],
  },

  // =====================================================================
  // ANTIPSICOTICOS
  // =====================================================================
  {
    id: 'risperidona',
    nomeGenerico: 'Risperidona',
    nomesComerciais: ['Risperdal', 'Zargus', 'Risperidon'],
    atcCode: 'N05AX08',
    rxNormCui: '35636',
    drugBankId: 'DB00734',
    snomedCT: '386840002',
    casNumber: '106266-06-2',
    dcbCode: '08092',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'antipsicotico_atipico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '3mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '1mg/mL', disponivelSUS: true },
      { forma: 'injetavel_longa_acao', concentracao: '25mg', disponivelSUS: false },
      { forma: 'injetavel_longa_acao', concentracao: '37,5mg', disponivelSUS: false },
      { forma: 'injetavel_longa_acao', concentracao: '50mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Esquizofrenia',
      'Transtorno bipolar (mania aguda)',
      'Irritabilidade associada ao autismo',
      'Transtorno de conduta em criancas (adjuvante)',
    ],
    mecanismoAcao: 'Antipsicotico atipico benzisoxazolico. Antagonista D2 e 5-HT2A com alta afinidade. Bloqueio alfa-1 e H1. Menor bloqueio muscarinico.',
    posologias: [
      {
        indicacao: 'Esquizofrenia',
        adultos: {
          dose: '2mg/dia em 1-2 doses, aumentar 1-2mg/dia a cada 24h',
          frequencia: '1-2x/dia',
          doseMaxima: '16mg/dia (maioria: 4-8mg)',
          observacoes: 'Efeitos extrapiramidais dose-dependentes',
        },
        idosos: {
          dose: '0,5mg 2x/dia, aumentar lentamente',
          observacoes: 'Maior risco de AVC em demencia',
        },
      },
      {
        indicacao: 'Irritabilidade no autismo',
        adultos: {
          dose: '0,5-2mg/dia',
          frequencia: '1-2x/dia',
          doseMaxima: '4mg/dia',
        },
        pediatrico: {
          dose: '<20kg: 0,25mg/dia; >=20kg: 0,5mg/dia',
          frequencia: '1x/dia',
          idadeMinima: '5 anos',
          doseMaxima: '<20kg: 1mg/dia; >=20kg: 2,5mg/dia',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a risperidona ou paliperidona',
    ],
    precaucoes: [
      'Idosos com demencia (aumento de mortalidade - BLACK BOX)',
      'Doenca cardiovascular',
      'Diabetes ou fatores de risco',
      'Epilepsia',
      'Doenca de Parkinson',
      'Hiperprolactinemia',
    ],
    efeitosAdversos: {
      comuns: ['Sintomas extrapiramidais', 'Sonolencia', 'Ganho de peso', 'Hiperprolactinemia', 'Hipotensao ortostatica'],
      graves: ['Sindrome neuroleptica maligna', 'Discinesia tardia', 'AVC (em idosos com demencia)', 'Cetoacidose diabetica', 'Prolongamento QT'],
    },
    interacoes: [
      {
        medicamento: 'Carbamazepina',
        gravidade: 'moderada',
        efeito: 'Reducao dos niveis de risperidona',
        conduta: 'Aumentar dose de risperidona',
      },
      {
        medicamento: 'Fluoxetina',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de risperidona (inibicao CYP2D6)',
        conduta: 'Considerar reducao de dose',
      },
      {
        medicamento: 'Levodopa',
        gravidade: 'grave',
        efeito: 'Antagonismo dopaminergico',
        conduta: 'Evitar em Parkinson. Usar quetiapina ou clozapina se necessario',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: 'Iniciar 0,5mg 2x/dia. Aumentar lentamente. Max 4mg/dia' },
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Evitar. Excretado no leite',
    },
    consideracoesEspeciais: {
      idosos: 'BLACK BOX: Aumento de mortalidade em demencia. Sintomas extrapiramidais frequentes',
      hepatopatas: 'Iniciar com 0,5mg 2x/dia, aumentar lentamente',
    },
    monitorizacao: [
      'Glicemia e HbA1c',
      'Perfil lipidico',
      'Peso e IMC',
      'Prolactina (se sintomas)',
      'Sintomas extrapiramidais',
      'ECG',
    ],
    orientacoesPaciente: [
      'Pode causar ganho de peso',
      'Relatar rigidez muscular, tremor, febre',
      'Levantar-se lentamente',
      'Mulheres: relatar alteracoes menstruais ou galactorreia',
    ],
    doencasRelacionadas: ['esquizofrenia', 'transtorno-bipolar', 'autismo'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['antipsicotico', 'atipico', 'esquizofrenia', 'bipolar', 'autismo'],
  },
];
