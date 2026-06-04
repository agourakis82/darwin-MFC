/**
 * ENDOCRINOLOGIA NOVOS - DARWIN-MFC EXPANSÃO 1000
 * ===============================================
 * Medicamentos endocrinológicos: tireoide, corticosteroides,
 * hormônios hipofisários e metabolismo ósseo
 *
 * Referências principais:
 * - ATA Guidelines (American Thyroid Association)
 * - Endocrine Society Clinical Practice Guidelines
 * - Bulas ANVISA / FDA labels
 * - UpToDate Drug Information
 */

import { Medicamento } from '@/lib/types/medicamento';

export const endocrinologiaNovos: Partial<Medicamento>[] = [
  // =============================================================================
  // HORMÔNIOS TIREOIDIANOS
  // =============================================================================
  {
    id: 'levotiroxina',
    nomeGenerico: 'Levotiroxina sódica',
    nomesComerciais: ['Puran T4', 'Synthroid', 'Euthyrox', 'Levoid'],
    atcCode: 'H03AA01',
    rxNormCui: '10582',
    drugBankId: 'DB00451',
    snomedCT: '710809001',
    classeTerapeutica: 'hormonio_tireoide',
    subclasse: 'tireoidiano',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '75mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '88mcg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '100mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '112mcg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '125mcg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '150mcg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '175mcg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '200mcg', disponivelSUS: false },
      { forma: 'solucao_oral', concentracao: '13mcg/ml', disponivelSUS: false },
    ],
    indicacoes: [
      'Hipotireoidismo primário e secundário',
      'Supressão de TSH em câncer de tireoide',
      'Coma mixedematoso (IV)',
      'Teste diagnóstico de função tireoidiana',
    ],
    mecanismoAcao: 'Forma sintética do hormônio tiroxina (T4). Convertido perifericamente em T3, o hormônio ativo. Regula metabolismo basal, termogênese, síntese proteica, desenvolvimento neural e crescimento.',
    posologias: [
      {
        indicacao: 'Hipotireoidismo em adultos',
        adultos: {
          dose: 'Iniciar 1,6mcg/kg/dia (adultos jovens sem cardiopatia)',
          frequencia: '1x/dia, em jejum, 30-60min antes do café',
          doseMaxima: '200-300mcg/dia',
          observacoes: 'Idosos/cardiopatas: iniciar 12,5-25mcg/dia, titular lentamente a cada 4-6 semanas',
        },
        idosos: {
          dose: '12,5-25mcg/dia inicial, aumentar 12,5-25mcg a cada 4-6 semanas',
          observacoes: 'Risco de arritmias e isquemia; titular cuidadosamente',
        },
        pediatrico: {
          dose: 'Neonatos: 10-15mcg/kg/dia; Crianças: 4-6mcg/kg/dia',
          frequencia: '1x/dia',
          idadeMinima: 'Recém-nascido',
          observacoes: 'Fundamental para desenvolvimento neurológico; não atrasar tratamento',
        },
      },
      {
        indicacao: 'Supressão TSH pós-tireoidectomia por câncer',
        adultos: {
          dose: '2-2,5mcg/kg/dia (dose suprafisiológica)',
          frequencia: '1x/dia',
          observacoes: 'Alvo TSH <0,1 mU/L em alto risco; 0,1-0,5 em risco intermediário',
        },
      },
    ],
    contraindicacoes: [
      'Tireotoxicose não tratada',
      'Insuficiência adrenal não tratada (tratar primeiro com corticoide)',
      'IAM agudo',
      'Hipersensibilidade ao princípio ativo',
    ],
    precaucoes: [
      'Doença cardiovascular (iniciar com doses baixas)',
      'Insuficiência adrenal (repor corticoide antes)',
      'Diabetes mellitus (pode aumentar necessidade de insulina)',
      'Osteoporose (evitar doses supressoras desnecessárias)',
    ],
    efeitosAdversos: {
      comuns: [
        'Em doses adequadas: praticamente nenhum',
        'Perda de peso inicial',
        'Melhora do humor e energia',
      ],
      graves: [
        'Taquicardia/arritmias (dose excessiva)',
        'Angina/IAM (cardiopatas)',
        'Osteoporose (doses supressoras crônicas)',
        'Crise tireotóxica (overdose)',
        'Convulsões em crianças (início rápido)',
      ],
    },
    interacoes: [
      {
        medicamento: 'Carbonato de cálcio / Antiácidos',
        gravidade: 'moderada',
        efeito: 'Redução da absorção de levotiroxina',
        conduta: 'Administrar com intervalo mínimo de 4 horas',
      },
      {
        medicamento: 'Omeprazol / IBPs',
        gravidade: 'moderada',
        efeito: 'Redução da absorção',
        conduta: 'Monitorar TSH; pode necessitar aumento de dose',
      },
      {
        medicamento: 'Sulfato ferroso',
        gravidade: 'moderada',
        efeito: 'Quelação e redução de absorção',
        conduta: 'Separar administração em pelo menos 4 horas',
      },
      {
        medicamento: 'Colestiramina / Resinas',
        gravidade: 'grave',
        efeito: 'Redução significativa da absorção',
        conduta: 'Administrar levotiroxina 4-6h antes da resina',
      },
      {
        medicamento: 'Warfarina',
        gravidade: 'moderada',
        efeito: 'Aumento do efeito anticoagulante',
        conduta: 'Monitorar INR; pode necessitar redução de warfarina',
      },
      {
        medicamento: 'Carbamazepina / Fenitoína',
        gravidade: 'moderada',
        efeito: 'Aumento do metabolismo de T4',
        conduta: 'Pode necessitar aumento de dose de levotiroxina',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessário' },
      { tfg: '<30', ajuste: 'Sem ajuste; monitorar função tireoidiana' },
    ],
    gestacao: 'A',
    amamentacao: {
      compativel: true,
      observacao: 'Seguro na amamentação; quantidades mínimas no leite materno. Manter tratamento é essencial.',
    },
    consideracoesEspeciais: {
      idosos: 'Iniciar com doses baixas (12,5-25mcg); titular lentamente; maior risco cardiovascular',
      hepatopatas: 'Sem ajuste específico necessário',
      pediatrico: 'Dose por kg maior que adultos; crucial para desenvolvimento neurológico',
    },
    monitorizacao: [
      'TSH 6-8 semanas após início ou ajuste de dose',
      'Após estabilização: TSH anual',
      'T4 livre se suspeita de má adesão ou absorção',
      'Em gestantes: TSH a cada trimestre',
    ],
    orientacoesPaciente: [
      'Tomar em jejum, 30-60 minutos antes do café da manhã',
      'Consistência no horário é fundamental',
      'Não suspender sem orientação médica',
      'Separar de suplementos de cálcio, ferro e antiácidos',
      'Informar ao médico sobre outros medicamentos',
    ],
    doencasRelacionadas: ['hipotireoidismo', 'cancer-tireoide', 'tireoidite-hashimoto'],
    calculadoras: ['tsh-alvo'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['levotiroxina', 'T4', 'hipotireoidismo', 'tireoide', 'RENAME'],
  },

  // =============================================================================
  // ANTITIREOIDIANOS
  // =============================================================================
  {
    id: 'metimazol',
    nomeGenerico: 'Metimazol',
    nomesComerciais: ['Tapazol', 'Thyrozol'],
    atcCode: 'H03BB02',
    rxNormCui: '6835',
    drugBankId: 'DB00763',
    snomedCT: '387501005',
    classeTerapeutica: 'antitireoidiano',
    subclasse: 'tionamida',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Hipertireoidismo por Doença de Graves',
      'Preparo para tireoidectomia ou iodo radioativo',
      'Bócio multinodular tóxico',
      'Crise tireotóxica (tempestade tireoidiana)',
    ],
    mecanismoAcao: 'Inibe a peroxidase tireoidiana, bloqueando a iodação da tiroglobulina e o acoplamento de iodotirosinas. Reduz síntese de T3 e T4. Meia-vida mais longa que PTU, permitindo dose única diária.',
    posologias: [
      {
        indicacao: 'Hipertireoidismo',
        adultos: {
          dose: 'Leve: 10-15mg/dia; Moderado: 20-30mg/dia; Grave: 30-40mg/dia',
          frequencia: '1x/dia ou dividido em 2-3 doses na fase inicial',
          doseMaxima: '60mg/dia',
          observacoes: 'Reduzir para dose de manutenção (5-10mg/dia) após eutireoidismo',
        },
        pediatrico: {
          dose: '0,4mg/kg/dia inicial',
          frequencia: 'Dividido em 3 doses',
          idadeMinima: '3 anos',
          doseMaxima: '30mg/dia',
          observacoes: 'Titular conforme resposta; manutenção 1/3 a 1/2 da dose inicial',
        },
      },
      {
        indicacao: 'Crise tireotóxica',
        adultos: {
          dose: '60-80mg/dia',
          frequencia: 'Dividido em 4 doses (ou via sonda nasogástrica)',
          observacoes: 'Associar betabloqueador, corticoide e iodeto',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao metimazol ou tionamidas',
      'Agranulocitose prévia com metimazol',
      'Primeiro trimestre de gestação (preferir PTU)',
    ],
    precaucoes: [
      'Monitorar hemograma (risco de agranulocitose)',
      'Hepatotoxicidade (raro, mas grave)',
      'Evitar no primeiro trimestre da gestação',
    ],
    efeitosAdversos: {
      comuns: [
        'Rash cutâneo (3-5%)',
        'Prurido',
        'Artralgia',
        'Sintomas GI (náuseas, epigastralgia)',
        'Cefaleia',
      ],
      graves: [
        'Agranulocitose (0,2-0,5%) - mais comum nas primeiras 12 semanas',
        'Hepatotoxicidade colestática',
        'Vasculite ANCA-positiva',
        'Síndrome lúpus-like',
        'Aplasia medular',
      ],
    },
    interacoes: [
      {
        medicamento: 'Anticoagulantes cumarínicos',
        gravidade: 'moderada',
        efeito: 'Redução do efeito anticoagulante ao atingir eutireoidismo',
        conduta: 'Monitorar INR frequentemente durante tratamento',
      },
      {
        medicamento: 'Betabloqueadores',
        gravidade: 'leve',
        efeito: 'Sinergia benéfica no controle de sintomas',
        conduta: 'Uso combinado é rotina; reduzir beta após eutireoidismo',
      },
      {
        medicamento: 'Digitálicos',
        gravidade: 'moderada',
        efeito: 'Níveis de digoxina aumentam ao normalizar função tireoidiana',
        conduta: 'Monitorar níveis de digoxina',
      },
    ],
    gestacao: 'D',
    amamentacao: {
      compativel: true,
      observacao: 'Doses até 20-30mg/dia são compatíveis. Monitorar função tireoidiana do lactente.',
    },
    consideracoesEspeciais: {
      idosos: 'Mesma dose; maior risco de complicações cardiovasculares do hipertireoidismo',
      hepatopatas: 'Evitar ou usar com cautela; monitorar enzimas hepáticas',
      pediatrico: 'Preferido em crianças >3 anos; eficaz e bem tolerado',
    },
    monitorizacao: [
      'Hemograma completo antes de iniciar e se febre/odinofagia',
      'T4 livre e TSH a cada 4-6 semanas até estabilização',
      'Função hepática basal e se sintomas',
      'Orientar sobre sinais de agranulocitose (febre, infecção)',
    ],
    orientacoesPaciente: [
      'Se febre, dor de garganta ou úlceras orais: suspender e procurar atendimento URGENTE',
      'Pode levar 4-8 semanas para atingir eutireoidismo',
      'Não interromper sem orientação médica',
      'Evitar gestação durante tratamento',
    ],
    doencasRelacionadas: ['hipertireoidismo', 'doenca-graves', 'bocio-toxico'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['metimazol', 'antitireoidiano', 'tionamida', 'Graves', 'RENAME'],
  },

  {
    id: 'propiltiouracil',
    nomeGenerico: 'Propiltiouracil',
    nomesComerciais: ['PTU', 'Propiltiouracila'],
    atcCode: 'H03BA02',
    rxNormCui: '8794',
    drugBankId: 'DB00550',
    snomedCT: '387257003',
    classeTerapeutica: 'antitireoidiano',
    subclasse: 'tionamida',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
    ],
    indicacoes: [
      'Hipertireoidismo no 1º trimestre da gestação (preferido)',
      'Crise tireotóxica (bloqueia conversão T4→T3)',
      'Alergia ao metimazol',
      'Hipertireoidismo em geral (segunda linha)',
    ],
    mecanismoAcao: 'Inibe a peroxidase tireoidiana (como metimazol) E bloqueia a conversão periférica de T4 em T3. Esta última ação é vantagem única na crise tireotóxica. Meia-vida curta requer múltiplas doses diárias.',
    posologias: [
      {
        indicacao: 'Hipertireoidismo',
        adultos: {
          dose: '100-150mg 3x/dia (300-450mg/dia)',
          frequencia: '3x/dia (a cada 8h)',
          doseMaxima: '1200mg/dia (crise tireotóxica)',
          observacoes: 'Manutenção: 50-150mg/dia após eutireoidismo',
        },
        pediatrico: {
          dose: '5-7mg/kg/dia dividido em 3 doses',
          frequencia: '3x/dia',
          idadeMinima: '6 anos',
          observacoes: 'Manutenção: 1/3 a 1/2 da dose inicial',
        },
      },
      {
        indicacao: '1º trimestre gestação com hipertireoidismo',
        adultos: {
          dose: '50-150mg 3x/dia',
          frequencia: '3x/dia',
          observacoes: 'Trocar para metimazol no 2º trimestre (menor hepatotoxicidade)',
        },
      },
      {
        indicacao: 'Crise tireotóxica',
        adultos: {
          dose: '200-400mg a cada 4-6h (800-1200mg/dia)',
          frequencia: 'A cada 4-6h VO ou via sonda',
          observacoes: 'Preferido pela inibição da conversão T4→T3',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
      'Hepatotoxicidade prévia com PTU',
      'Agranulocitose prévia com tionamidas',
    ],
    precaucoes: [
      'Hepatotoxicidade grave (maior que metimazol)',
      'Agranulocitose (monitorar)',
      'Gestação: usar apenas no 1º trimestre',
    ],
    efeitosAdversos: {
      comuns: [
        'Rash (5%)',
        'Prurido',
        'Artralgia',
        'Náuseas',
        'Alteração do paladar',
      ],
      graves: [
        'Hepatotoxicidade fulminante (risco 10x maior que metimazol)',
        'Agranulocitose (0,2-0,5%)',
        'Vasculite ANCA-positiva',
        'Síndrome lúpus-like',
        'Aplasia medular',
      ],
    },
    interacoes: [
      {
        medicamento: 'Anticoagulantes',
        gravidade: 'moderada',
        efeito: 'Variação no efeito anticoagulante',
        conduta: 'Monitorar INR',
      },
    ],
    gestacao: 'D',
    amamentacao: {
      compativel: true,
      observacao: 'Compatível em doses até 300mg/dia; monitorar tireoide do lactente',
    },
    consideracoesEspeciais: {
      hepatopatas: 'CONTRAINDICADO - risco de hepatite fulminante',
    },
    monitorizacao: [
      'Função hepática basal e mensal nos primeiros 6 meses',
      'Hemograma se febre ou sinais de infecção',
      'T4 livre e TSH a cada 4-6 semanas',
    ],
    orientacoesPaciente: [
      'Tomar 3x/dia devido meia-vida curta',
      'Se febre, dor de garganta, icterícia: PARAR e procurar emergência',
      'Principal indicação: primeiro trimestre da gestação',
    ],
    doencasRelacionadas: ['hipertireoidismo', 'crise-tireotoxica', 'gravidez-hipertireoidismo'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['PTU', 'propiltiouracil', 'antitireoidiano', 'gestação', 'crise-tireotóxica', 'RENAME'],
  },

  // =============================================================================
  // CORTICOSTEROIDES SISTÊMICOS
  // =============================================================================
  {
    id: 'hidrocortisona-sistemica',
    nomeGenerico: 'Hidrocortisona',
    nomesComerciais: ['Cortef', 'Hidrocortisona', 'Solu-Cortef'],
    atcCode: 'H02AB09',
    rxNormCui: '5492',
    drugBankId: 'DB00741',
    snomedCT: '396458002',
    classeTerapeutica: 'corticoide',
    subclasse: 'glicocorticoide',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '100mg', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '500mg', disponivelSUS: true },
    ],
    indicacoes: [
      'Insuficiência adrenal primária e secundária',
      'Crise adrenal (emergência)',
      'Reposição fisiológica em hiperplasia adrenal congênita',
      'Desmame de corticoide crônico',
      'Anti-inflamatório (menos usado que outros)',
    ],
    mecanismoAcao: 'Glicocorticoide idêntico ao cortisol endógeno. Atividade glicocorticoide e mineralocorticoide balanceada. Liga-se ao receptor de glicocorticoide, modulando transcrição gênica. Ação anti-inflamatória, imunossupressora e metabólica.',
    posologias: [
      {
        indicacao: 'Insuficiência adrenal (reposição)',
        adultos: {
          dose: '15-25mg/dia dividido em 2-3 doses',
          frequencia: '2/3 manhã, 1/3 tarde (ou 10mg + 5mg + 5mg)',
          doseMaxima: '30mg/dia em reposição',
          observacoes: 'Mimetizar ritmo circadiano: maior dose matinal',
        },
        pediatrico: {
          dose: '8-10mg/m²/dia',
          frequencia: 'Dividido em 3 doses',
          observacoes: 'Ajustar para crescimento adequado',
        },
      },
      {
        indicacao: 'Crise adrenal',
        adultos: {
          dose: '100mg IV bolus, depois 50-100mg IV 6/6h ou infusão contínua 200mg/24h',
          frequencia: 'Bolus seguido de doses regulares',
          observacoes: 'Associar reposição volêmica agressiva; tratar causa precipitante',
        },
        pediatrico: {
          dose: '50-100mg/m² bolus IV, depois 50-100mg/m²/dia dividido',
          frequencia: 'Cada 6-8h IV',
        },
      },
      {
        indicacao: 'Stress dose (cirurgia, doença grave)',
        adultos: {
          dose: 'Cirurgia menor: 25mg; Moderada: 50-75mg; Major: 100-150mg/dia',
          frequencia: 'No dia, depois desmame em 1-2 dias',
          observacoes: 'Dobrar/triplicar dose habitual em intercorrências',
        },
      },
    ],
    contraindicacoes: [
      'Infecções fúngicas sistêmicas (exceto se reposição)',
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Diabetes mellitus (hiperglicemia)',
      'Hipertensão',
      'Osteoporose',
      'Glaucoma',
      'Úlcera péptica',
      'Infecções ativas',
    ],
    efeitosAdversos: {
      comuns: [
        'Em doses de reposição: mínimos',
        'Retenção hídrica (efeito mineralocorticoide)',
        'Hiperglicemia leve',
      ],
      graves: [
        'Supressão adrenal (uso prolongado em doses suprafisiológicas)',
        'Osteoporose',
        'Cushing iatrogênico',
        'Catarata/Glaucoma',
        'Necrose avascular',
      ],
    },
    interacoes: [
      {
        medicamento: 'Rifampicina',
        gravidade: 'grave',
        efeito: 'Acelera metabolismo; pode precipitar crise adrenal',
        conduta: 'Dobrar ou triplicar dose de hidrocortisona',
      },
      {
        medicamento: 'Fenitoína / Carbamazepina',
        gravidade: 'moderada',
        efeito: 'Aumenta metabolismo de corticoides',
        conduta: 'Pode necessitar aumento de dose',
      },
      {
        medicamento: 'Hipoglicemiantes',
        gravidade: 'moderada',
        efeito: 'Antagonismo ao efeito hipoglicemiante',
        conduta: 'Monitorar glicemia; ajustar doses',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Sem ajuste específico; monitorar eletrólitos' },
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: true,
      observacao: 'Compatível em doses de reposição; evitar amamentar logo após dose alta',
    },
    consideracoesEspeciais: {
      idosos: 'Maior risco de osteoporose; monitorar PA e glicemia',
      hepatopatas: 'Metabolismo pode estar alterado; monitorar',
    },
    monitorizacao: [
      'Eletrólitos (K+, Na+)',
      'Glicemia',
      'Pressão arterial',
      'Densitometria óssea se uso prolongado',
      'Sintomas de insuficiência ou excesso',
    ],
    orientacoesPaciente: [
      'NUNCA suspender abruptamente',
      'Cartão de identificação de usuário de corticoide',
      'Dobrar dose em caso de febre, infecção ou estresse',
      'Procurar emergência se vômitos/incapacidade de tomar via oral',
    ],
    doencasRelacionadas: ['insuficiencia-adrenal', 'doenca-addison', 'hiperplasia-adrenal-congenita'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['hidrocortisona', 'cortisol', 'insuficiência adrenal', 'Addison', 'RENAME'],
  },

  {
    id: 'prednisona',
    nomeGenerico: 'Prednisona',
    nomesComerciais: ['Meticorten', 'Predicorten', 'Prednisona'],
    atcCode: 'H02AB07',
    rxNormCui: '8640',
    drugBankId: 'DB00635',
    snomedCT: '116602009',
    classeTerapeutica: 'corticoide',
    subclasse: 'glicocorticoide',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Doenças autoimunes (LES, artrite reumatoide, vasculites)',
      'Doenças pulmonares (asma grave, DPOC exacerbada)',
      'Transplantes (imunossupressão)',
      'Doenças hematológicas (PTI, anemia hemolítica)',
      'Neoplasias (linfomas, mieloma)',
      'Reações alérgicas graves',
    ],
    mecanismoAcao: 'Pró-droga convertida em prednisolona no fígado. Glicocorticoide de potência intermediária (4x hidrocortisona). Ação anti-inflamatória e imunossupressora. Mínima atividade mineralocorticoide.',
    posologias: [
      {
        indicacao: 'Anti-inflamatório geral',
        adultos: {
          dose: '5-60mg/dia conforme gravidade',
          frequencia: '1x/dia pela manhã ou dividido',
          doseMaxima: '80-100mg/dia em pulsos',
          observacoes: 'Usar menor dose eficaz pelo menor tempo possível',
        },
        pediatrico: {
          dose: '0,5-2mg/kg/dia',
          frequencia: '1x/dia ou dividido',
          doseMaxima: '60mg/dia',
        },
      },
      {
        indicacao: 'Pulsoterapia (crises autoimunes)',
        adultos: {
          dose: '1mg/kg/dia (ou metilprednisolona IV)',
          frequencia: '1x/dia por 3-5 dias, depois desmame',
        },
      },
      {
        indicacao: 'DPOC exacerbada',
        adultos: {
          dose: '40mg/dia por 5 dias',
          frequencia: '1x/dia',
          observacoes: 'Não requer desmame se uso <2 semanas',
        },
      },
    ],
    contraindicacoes: [
      'Infecções fúngicas sistêmicas não tratadas',
      'Herpes zoster ativo extenso',
      'Vacinas vivas em doses imunossupressoras',
    ],
    precaucoes: [
      'Diabetes (hiperglicemia)',
      'Hipertensão',
      'Osteoporose (suplementar cálcio/vit D)',
      'Glaucoma',
      'Úlcera péptica (associar IBP se risco)',
      'Insuficiência adrenal latente',
      'Infecções crônicas (TB, hepatite)',
    ],
    efeitosAdversos: {
      comuns: [
        'Ganho de peso',
        'Fácies cushingoide',
        'Hiperglicemia',
        'Insônia',
        'Alterações de humor',
        'Dispepsia',
        'Retenção hídrica',
      ],
      graves: [
        'Osteoporose/Fraturas',
        'Necrose avascular (quadril)',
        'Imunossupressão/Infecções oportunistas',
        'Supressão eixo HPA',
        'Miopatia',
        'Psicose corticosteroidea',
        'Catarata/Glaucoma',
      ],
    },
    interacoes: [
      {
        medicamento: 'AINEs',
        gravidade: 'moderada',
        efeito: 'Aumento do risco de úlcera/sangramento GI',
        conduta: 'Evitar combinação; se necessário, associar IBP',
      },
      {
        medicamento: 'Antidiabéticos',
        gravidade: 'moderada',
        efeito: 'Hiperglicemia',
        conduta: 'Monitorar glicemia; ajustar doses',
      },
      {
        medicamento: 'Rifampicina / Fenitoína',
        gravidade: 'moderada',
        efeito: 'Redução dos níveis de prednisona',
        conduta: 'Pode necessitar aumento de dose',
      },
      {
        medicamento: 'Vacinas vivas',
        gravidade: 'grave',
        efeito: 'Risco de infecção disseminada',
        conduta: 'Contraindicadas em doses >20mg/dia por >2 semanas',
      },
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: true,
      observacao: 'Doses <40mg/dia compatíveis; amamentar 4h após a dose',
    },
    consideracoesEspeciais: {
      idosos: 'Maior risco de osteoporose, hiperglicemia, HAS; usar menor dose possível',
      hepatopatas: 'Conversão a prednisolona pode estar reduzida; considerar prednisolona direta',
    },
    monitorizacao: [
      'Glicemia',
      'Pressão arterial',
      'Potássio',
      'Densitometria óssea se uso >3 meses',
      'Avaliação oftalmológica anual se uso crônico',
    ],
    orientacoesPaciente: [
      'Tomar de preferência pela manhã com alimentos',
      'Não suspender abruptamente se uso >2-3 semanas',
      'Desmame gradual conforme orientação médica',
      'Informar uso antes de procedimentos ou vacinas',
    ],
    doencasRelacionadas: ['lupus', 'artrite-reumatoide', 'asma', 'dpoc', 'vasculite'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['prednisona', 'corticoide', 'imunossupressor', 'anti-inflamatório', 'RENAME'],
  },

  {
    id: 'dexametasona',
    nomeGenerico: 'Dexametasona',
    nomesComerciais: ['Decadron', 'Dexametasona'],
    atcCode: 'H02AB02',
    rxNormCui: '3264',
    drugBankId: 'DB01234',
    snomedCT: '372584003',
    classeTerapeutica: 'corticoide',
    subclasse: 'glicocorticoide',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '0,75mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '4mg/ml', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '10mg/ml', disponivelSUS: false },
      { forma: 'solucao_oral', concentracao: '0,5mg/5ml', disponivelSUS: true },
    ],
    indicacoes: [
      'Edema cerebral (tumores, TCE)',
      'Teste de supressão para Cushing',
      'Maturação pulmonar fetal',
      'Náuseas/vômitos por quimioterapia',
      'COVID-19 grave (RECOVERY)',
      'Crise asmática grave',
      'Meningite bacteriana',
    ],
    mecanismoAcao: 'Glicocorticoide de alta potência (25x hidrocortisona) e longa duração (36-72h). Praticamente sem ação mineralocorticoide. Atravessa barreira hematoencefálica. Forte ação anti-inflamatória e anti-edema.',
    posologias: [
      {
        indicacao: 'Edema cerebral',
        adultos: {
          dose: '10mg IV inicial, depois 4mg IV 6/6h',
          frequencia: '4x/dia',
          observacoes: 'Desmame gradual após melhora; duração conforme causa',
        },
      },
      {
        indicacao: 'COVID-19 (oxigenioterapia ou ventilação)',
        adultos: {
          dose: '6mg 1x/dia VO ou IV',
          frequencia: '1x/dia por 10 dias',
          observacoes: 'Estudo RECOVERY: redução de mortalidade',
        },
      },
      {
        indicacao: 'Antiemético (quimioterapia)',
        adultos: {
          dose: '8-20mg antes da quimioterapia',
          frequencia: 'Dose única pré-QT, pode repetir 12h depois',
        },
      },
      {
        indicacao: 'Maturação pulmonar fetal',
        adultos: {
          dose: '6mg IM 12/12h, 4 doses',
          frequencia: 'Total 24mg em 48h',
          observacoes: 'Entre 24-34 semanas de gestação com risco de parto prematuro',
        },
      },
      {
        indicacao: 'Teste de supressão noturna (rastreio Cushing)',
        adultos: {
          dose: '1mg às 23h',
          frequencia: 'Dose única; cortisol às 8h seguinte',
          observacoes: 'Cortisol <1,8mcg/dL exclui Cushing',
        },
      },
    ],
    contraindicacoes: [
      'Infecções fúngicas sistêmicas',
      'Malária cerebral (aumenta mortalidade)',
    ],
    precaucoes: [
      'Supressão adrenal prolongada',
      'Hiperglicemia intensa',
      'Psicose corticosteroidea',
      'Perfuração GI em diverticulite',
    ],
    efeitosAdversos: {
      comuns: [
        'Hiperglicemia',
        'Insônia',
        'Agitação',
        'Dispepsia',
        'Aumento do apetite',
      ],
      graves: [
        'Supressão adrenal prolongada',
        'Psicose/delirium',
        'Miopatia proximal',
        'Osteoporose',
        'Perfuração GI',
        'Reativação de TB/infecções',
      ],
    },
    interacoes: [
      {
        medicamento: 'Itraconazol / Cetoconazol',
        gravidade: 'moderada',
        efeito: 'Aumento dos níveis de dexametasona',
        conduta: 'Monitorar efeitos adversos',
      },
      {
        medicamento: 'Fenitoína',
        gravidade: 'moderada',
        efeito: 'Redução da eficácia da dexametasona',
        conduta: 'Pode necessitar aumento de dose',
      },
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: true,
      observacao: 'Uso de curta duração compatível; doses altas/crônicas evitar',
    },
    consideracoesEspeciais: {
      idosos: 'Maior risco de efeitos adversos; usar menor dose e duração',
      hepatopatas: 'Sem ajuste específico',
    },
    monitorizacao: [
      'Glicemia (frequentemente causa hiperglicemia)',
      'Eletrólitos',
      'Sinais de infecção',
      'Função adrenal após uso prolongado',
    ],
    orientacoesPaciente: [
      'Corticoide muito potente - usar conforme prescrito',
      'Pode causar insônia - preferir dose matinal',
      'Monitorar glicemia se diabético',
      'Desmame necessário se uso >7-10 dias',
    ],
    doencasRelacionadas: ['edema-cerebral', 'covid-19', 'quimioterapia', 'prematuridade'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['dexametasona', 'corticoide', 'edema cerebral', 'COVID-19', 'RECOVERY', 'RENAME'],
  },

  {
    id: 'fludrocortisona',
    nomeGenerico: 'Fludrocortisona',
    nomesComerciais: ['Florinef', 'Florinefe'],
    atcCode: 'H02AA02',
    rxNormCui: '4196',
    drugBankId: 'DB00687',
    snomedCT: '116586007',
    classeTerapeutica: 'corticoide',
    subclasse: 'mineralocorticoide',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,1mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Insuficiência adrenal primária (Addison) - componente mineralocorticoide',
      'Hiperplasia adrenal congênita (formas perdedoras de sal)',
      'Hipotensão ortostática refratária',
      'Síndrome de hipersensibilidade do seio carotídeo',
    ],
    mecanismoAcao: 'Mineralocorticoide sintético com alta afinidade pelo receptor mineralocorticoide. Promove retenção de sódio e excreção de potássio nos túbulos renais. Expansão do volume plasmático. Também tem atividade glicocorticoide leve.',
    posologias: [
      {
        indicacao: 'Insuficiência adrenal primária',
        adultos: {
          dose: '0,05-0,2mg/dia',
          frequencia: '1x/dia pela manhã',
          doseMaxima: '0,2mg/dia',
          observacoes: 'Associar a hidrocortisona para reposição completa',
        },
        pediatrico: {
          dose: '0,05-0,1mg/dia',
          frequencia: '1x/dia',
          observacoes: 'Lactentes podem necessitar doses relativamente maiores',
        },
      },
      {
        indicacao: 'Hipotensão ortostática',
        adultos: {
          dose: '0,1-0,3mg/dia',
          frequencia: '1x/dia',
          doseMaxima: '0,4mg/dia',
          observacoes: 'Associar aumento de ingesta de sódio e líquidos',
        },
      },
    ],
    contraindicacoes: [
      'Hipertensão não controlada',
      'Insuficiência cardíaca descompensada',
      'Edema grave',
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Monitorar PA e edema',
      'Hipocalemia',
      'IC/Cardiopatia',
      'DRC (retenção de sódio)',
    ],
    efeitosAdversos: {
      comuns: [
        'Edema',
        'Hipertensão',
        'Hipocalemia',
        'Cefaleia',
        'Ganho de peso',
      ],
      graves: [
        'Insuficiência cardíaca',
        'Arritmias por hipocalemia',
        'Hipertensão grave',
        'Miopatia hipocalêmica',
      ],
    },
    interacoes: [
      {
        medicamento: 'Diuréticos de alça/tiazídicos',
        gravidade: 'moderada',
        efeito: 'Potencialização da hipocalemia',
        conduta: 'Monitorar potássio; suplementar se necessário',
      },
      {
        medicamento: 'Anti-hipertensivos',
        gravidade: 'moderada',
        efeito: 'Antagonismo ao efeito hipotensor',
        conduta: 'Monitorar PA; ajustar doses',
      },
      {
        medicamento: 'Digitálicos',
        gravidade: 'grave',
        efeito: 'Hipocalemia aumenta toxicidade digitálica',
        conduta: 'Monitorar potássio rigorosamente',
      },
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: true,
      observacao: 'Provavelmente seguro; monitorar lactente',
    },
    monitorizacao: [
      'Pressão arterial regularmente',
      'Potássio sérico',
      'Sódio sérico',
      'Peso corporal (edema)',
      'Sinais de IC',
    ],
    orientacoesPaciente: [
      'Tomar pela manhã',
      'Monitorar PA em casa se possível',
      'Relatar edema em membros ou ganho de peso rápido',
      'Manter ingesta adequada de potássio (frutas, vegetais)',
    ],
    doencasRelacionadas: ['doenca-addison', 'hiperplasia-adrenal-congenita', 'hipotensao-ortostatica'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['fludrocortisona', 'mineralocorticoide', 'Addison', 'aldosterona'],
  },

  // =============================================================================
  // AGONISTAS DOPAMINÉRGICOS (PROLACTINOMAS)
  // =============================================================================
  {
    id: 'cabergolina',
    nomeGenerico: 'Cabergolina',
    nomesComerciais: ['Dostinex', 'Cabergolina'],
    atcCode: 'G02CB03',
    rxNormCui: '8331',
    drugBankId: 'DB00248',
    snomedCT: '386977004',
    classeTerapeutica: 'hormonio',
    subclasse: 'agonista_dopamina',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,5mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Prolactinomas (micro e macroprolactinomas)',
      'Hiperprolactinemia idiopática',
      'Inibição da lactação',
      'Acromegalia (adjuvante)',
      'Doença de Parkinson (menos usado)',
    ],
    mecanismoAcao: 'Agonista dopaminérgico D2 de longa duração. Inibe secreção de prolactina pelos lactotrofos hipofisários. Em prolactinomas, reduz tanto os níveis de prolactina quanto o tamanho tumoral. Meia-vida longa (65h) permite dose semanal.',
    posologias: [
      {
        indicacao: 'Hiperprolactinemia/Prolactinoma',
        adultos: {
          dose: 'Iniciar 0,25mg 2x/semana ou 0,5mg 1x/semana',
          frequencia: '1-2x/semana',
          doseMaxima: '1mg 2x/semana (2mg/semana)',
          observacoes: 'Aumentar 0,25mg/dose a cada mês conforme resposta; alvo: prolactina normal',
        },
      },
      {
        indicacao: 'Inibição da lactação',
        adultos: {
          dose: '1mg dose única',
          frequencia: 'Dose única nas primeiras 24h pós-parto',
          observacoes: 'Ou 0,25mg 12/12h por 2 dias para supressão estabelecida',
        },
      },
      {
        indicacao: 'Acromegalia (adjuvante)',
        adultos: {
          dose: '0,5-2mg/semana',
          frequencia: 'Dividido em 2 doses/semana',
          observacoes: 'Associar a análogos de somatostatina ou após cirurgia',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a ergotamínicos',
      'Hipertensão não controlada',
      'Doença valvar cardíaca',
      'Fibrose pulmonar, retroperitoneal ou cardíaca prévia',
      'Psicose ou história de psicose puerperal',
    ],
    precaucoes: [
      'Valvopatia (ecocardiograma basal e periódico)',
      'Hipotensão ortostática',
      'Sonolência/ataques de sono',
      'Distúrbios do controle de impulsos',
    ],
    efeitosAdversos: {
      comuns: [
        'Náuseas (28%)',
        'Cefaleia (26%)',
        'Tontura (15%)',
        'Constipação',
        'Astenia',
        'Hipotensão ortostática',
      ],
      graves: [
        'Fibrose valvar cardíaca (doses altas prolongadas)',
        'Fibrose pulmonar/retroperitoneal',
        'Psicose/alucinações',
        'Ataques de sono súbitos',
        'Distúrbios do controle de impulsos (jogo patológico)',
      ],
    },
    interacoes: [
      {
        medicamento: 'Antipsicóticos',
        gravidade: 'grave',
        efeito: 'Antagonismo ao efeito dopaminérgico',
        conduta: 'Evitar combinação; antipsicóticos causam hiperprolactinemia',
      },
      {
        medicamento: 'Macrolídeos (eritromicina)',
        gravidade: 'moderada',
        efeito: 'Aumento dos níveis de cabergolina',
        conduta: 'Usar com cautela; monitorar efeitos adversos',
      },
      {
        medicamento: 'Metoclopramida',
        gravidade: 'moderada',
        efeito: 'Antagonismo; metoclopramida é anti-dopaminérgico',
        conduta: 'Evitar combinação',
      },
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: false,
      observacao: 'Inibe lactação; contraindicado se deseja amamentar',
    },
    monitorizacao: [
      'Prolactina sérica a cada 3-6 meses até normalização, depois anual',
      'RM de sela túrcica (avaliar tamanho tumoral)',
      'Ecocardiograma basal e a cada 6-12 meses se doses >2mg/semana',
      'Sintomas de fibrose',
    ],
    orientacoesPaciente: [
      'Tomar com alimentos para reduzir náuseas',
      'Levantar-se devagar (hipotensão ortostática)',
      'Cuidado ao dirigir (sonolência/ataques de sono)',
      'Informar médico se dor torácica, dispneia ou edema',
      'Pode restaurar fertilidade - usar contracepção se não deseja gestação',
    ],
    doencasRelacionadas: ['prolactinoma', 'hiperprolactinemia', 'acromegalia'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['cabergolina', 'prolactinoma', 'agonista dopaminérgico', 'Dostinex', 'hiperprolactinemia'],
  },

  {
    id: 'bromocriptina',
    nomeGenerico: 'Bromocriptina',
    nomesComerciais: ['Parlodel', 'Bagren'],
    atcCode: 'G02CB01',
    rxNormCui: '1819',
    drugBankId: 'DB01200',
    snomedCT: '387039007',
    classeTerapeutica: 'hormonio',
    subclasse: 'agonista_dopamina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2,5mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '2,5mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '5mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Hiperprolactinemia e prolactinomas',
      'Acromegalia',
      'Doença de Parkinson',
      'Supressão da lactação',
      'DM2 (Cycloset - formulação específica)',
    ],
    mecanismoAcao: 'Agonista dopaminérgico D2 derivado do ergot. Inibe secreção de prolactina e, em menor grau, GH. Na doença de Parkinson, atua como agonista dopaminérgico central. Meia-vida mais curta que cabergolina (6h), requerendo doses diárias.',
    posologias: [
      {
        indicacao: 'Hiperprolactinemia',
        adultos: {
          dose: 'Iniciar 1,25mg à noite, aumentar para 2,5mg 2-3x/dia',
          frequencia: '2-3x/dia com alimentos',
          doseMaxima: '30mg/dia',
          observacoes: 'Titular lentamente a cada semana para minimizar efeitos adversos',
        },
      },
      {
        indicacao: 'Acromegalia',
        adultos: {
          dose: '1,25-2,5mg à noite inicial, aumentar até 20-30mg/dia',
          frequencia: 'Dividido em 3-4 doses',
          observacoes: 'Eficácia inferior a análogos de somatostatina',
        },
      },
      {
        indicacao: 'Parkinson',
        adultos: {
          dose: 'Iniciar 1,25mg 2x/dia, aumentar gradualmente',
          frequencia: '2-3x/dia',
          doseMaxima: '100mg/dia (geralmente 30-90mg/dia)',
          observacoes: 'Associar a levodopa; permite redução de dose de L-dopa',
        },
      },
    ],
    contraindicacoes: [
      'Hipertensão não controlada',
      'Coronariopatia grave',
      'Doença vascular periférica',
      'Gestação (contraindicação relativa)',
      'Hipersensibilidade a ergotamínicos',
    ],
    precaucoes: [
      'Fibrose valvar (ecocardiograma)',
      'Hipotensão grave',
      'Doença psiquiátrica',
      'Úlcera péptica',
    ],
    efeitosAdversos: {
      comuns: [
        'Náuseas/vômitos (50%)',
        'Cefaleia',
        'Tontura',
        'Hipotensão ortostática',
        'Constipação',
        'Congestão nasal',
      ],
      graves: [
        'Fibrose retroperitoneal/pulmonar/cardíaca',
        'Vasoespasmo digital',
        'Psicose',
        'Convulsões',
        'AVC/IAM (raro)',
      ],
    },
    interacoes: [
      {
        medicamento: 'Antipsicóticos',
        gravidade: 'grave',
        efeito: 'Antagonismo mútuo',
        conduta: 'Evitar combinação',
      },
      {
        medicamento: 'Eritromicina',
        gravidade: 'moderada',
        efeito: 'Aumento dos níveis de bromocriptina',
        conduta: 'Monitorar efeitos adversos',
      },
      {
        medicamento: 'Álcool',
        gravidade: 'moderada',
        efeito: 'Reação tipo dissulfiram (rubor, taquicardia)',
        conduta: 'Evitar álcool',
      },
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: false,
      observacao: 'Inibe lactação',
    },
    monitorizacao: [
      'Prolactina sérica',
      'Ecocardiograma se uso prolongado',
      'Função pulmonar se sintomas respiratórios',
    ],
    orientacoesPaciente: [
      'Tomar com alimentos para reduzir náuseas',
      'Iniciar à noite (hipotensão ortostática)',
      'Evitar álcool',
      'Levantar-se devagar',
    ],
    doencasRelacionadas: ['prolactinoma', 'acromegalia', 'parkinson', 'hiperprolactinemia'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['bromocriptina', 'Parlodel', 'prolactinoma', 'Parkinson', 'agonista dopaminérgico', 'RENAME'],
  },

  // =============================================================================
  // ANÁLOGOS DE SOMATOSTATINA
  // =============================================================================
  {
    id: 'octreotida',
    nomeGenerico: 'Octreotida',
    nomesComerciais: ['Sandostatin', 'Sandostatin LAR'],
    atcCode: 'H01CB02',
    rxNormCui: '7626',
    drugBankId: 'DB00104',
    snomedCT: '109053000',
    classeTerapeutica: 'hormonio',
    subclasse: 'analogo_somatostatina',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '0,05mg/ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '0,1mg/ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '0,5mg/ml', disponivelSUS: false },
      { forma: 'injetavel_im', concentracao: '10mg LAR', disponivelSUS: false },
      { forma: 'injetavel_im', concentracao: '20mg LAR', disponivelSUS: false },
      { forma: 'injetavel_im', concentracao: '30mg LAR', disponivelSUS: false },
    ],
    indicacoes: [
      'Acromegalia',
      'Tumores neuroendócrinos (carcinoides, VIPomas, glucagonomas)',
      'Hemorragia varicosa aguda',
      'Fístulas pancreáticas/enterocutâneas',
      'Diarreia refratária (AIDS, pós-ressecção)',
    ],
    mecanismoAcao: 'Análogo sintético da somatostatina com meia-vida mais longa. Liga-se aos receptores de somatostatina (especialmente SSTR2 e SSTR5), inibindo secreção de GH, insulina, glucagon, gastrina e outros hormônios. Reduz fluxo esplâncnico.',
    posologias: [
      {
        indicacao: 'Acromegalia',
        adultos: {
          dose: 'Iniciar 50-100mcg SC 3x/dia; LAR: 20mg IM a cada 4 semanas',
          frequencia: 'SC: 3x/dia; LAR: mensal',
          doseMaxima: 'SC: 500mcg 3x/dia; LAR: 40mg/mês',
          observacoes: 'Usar SC para titulação inicial, depois converter para LAR',
        },
      },
      {
        indicacao: 'Tumores neuroendócrinos',
        adultos: {
          dose: '100-600mcg/dia SC dividido ou LAR 20-30mg/mês',
          frequencia: 'SC: 2-4x/dia; LAR: mensal',
          observacoes: 'Doses mais altas em tumores carcinoides',
        },
      },
      {
        indicacao: 'Hemorragia varicosa',
        adultos: {
          dose: '25-50mcg/hora IV contínuo ou 50mcg IV bolus + 25-50mcg/hora',
          frequencia: 'Infusão contínua por 2-5 dias',
          observacoes: 'Associar ligadura elástica/escleroterapia',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a octreotida',
    ],
    precaucoes: [
      'Colelitíase (20-30% em uso prolongado)',
      'Hipoglicemia ou hiperglicemia',
      'Hipotireoidismo',
      'Bradicardia',
    ],
    efeitosAdversos: {
      comuns: [
        'Dor no local da injeção (8%)',
        'Diarreia/Esteatorreia (30-60%)',
        'Náuseas (6%)',
        'Dor abdominal (15%)',
        'Colelitíase (20-30% em uso crônico)',
        'Bradicardia sinusal',
      ],
      graves: [
        'Colecistite/Colangite',
        'Pancreatite',
        'Hipoglicemia grave',
        'Hipotireoidismo',
        'Bradicardia sintomática',
      ],
    },
    interacoes: [
      {
        medicamento: 'Insulina/Antidiabéticos',
        gravidade: 'moderada',
        efeito: 'Alteração dos níveis glicêmicos',
        conduta: 'Monitorar glicemia; ajustar doses de antidiabéticos',
      },
      {
        medicamento: 'Ciclosporina',
        gravidade: 'moderada',
        efeito: 'Redução da absorção de ciclosporina',
        conduta: 'Monitorar níveis de ciclosporina',
      },
      {
        medicamento: 'Betabloqueadores/Antiarrítmicos',
        gravidade: 'moderada',
        efeito: 'Bradicardia aditiva',
        conduta: 'Monitorar frequência cardíaca',
      },
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes; evitar ou suspender amamentação',
    },
    monitorizacao: [
      'Glicemia (inicial e periódica)',
      'Função tireoidiana',
      'Ultrassonografia de vesícula biliar a cada 6-12 meses',
      'IGF-1 e GH (acromegalia)',
      'Cromogranina A (tumores neuroendócrinos)',
    ],
    orientacoesPaciente: [
      'Aplicação SC: rodar locais de injeção',
      'LAR: aplicação IM por profissional de saúde a cada 4 semanas',
      'Refrigerar; deixar atingir temperatura ambiente antes de aplicar',
      'Informar sintomas de cálculos biliares (dor abdominal, náuseas)',
    ],
    doencasRelacionadas: ['acromegalia', 'tumor-neuroendocrino', 'hemorragia-varicosa'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['octreotida', 'Sandostatin', 'somatostatina', 'acromegalia', 'carcinoide'],
  },

  {
    id: 'lanreotida',
    nomeGenerico: 'Lanreotida',
    nomesComerciais: ['Somatuline Autogel'],
    atcCode: 'H01CB03',
    rxNormCui: '48291',
    drugBankId: 'DB00451',
    snomedCT: '108794009',
    classeTerapeutica: 'hormonio',
    subclasse: 'analogo_somatostatina',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '60mg seringa preenchida', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '90mg seringa preenchida', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '120mg seringa preenchida', disponivelSUS: false },
    ],
    indicacoes: [
      'Acromegalia',
      'Tumores neuroendócrinos gastroenteropancreáticos (GEP-NETs)',
      'Tumores carcinoides',
      'Síndrome carcinoide',
    ],
    mecanismoAcao: 'Análogo de somatostatina de longa duração. Liga-se aos receptores SSTR2, SSTR3 e SSTR5. Formulação Autogel permite aplicação SC profunda mensal com liberação lenta. Inibe GH, IGF-1 e hormônios gastrointestinais.',
    posologias: [
      {
        indicacao: 'Acromegalia',
        adultos: {
          dose: '60-120mg a cada 4 semanas',
          frequencia: 'SC profunda a cada 28 dias',
          observacoes: 'Iniciar 90mg; ajustar conforme IGF-1 e GH',
        },
      },
      {
        indicacao: 'GEP-NETs',
        adultos: {
          dose: '120mg a cada 4 semanas',
          frequencia: 'SC profunda mensal',
          observacoes: 'Estudo CLARINET: controle tumoral em NETs bem diferenciados',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Colelitíase',
      'Diabetes mellitus',
      'Hipotireoidismo',
      'Bradicardia',
    ],
    efeitosAdversos: {
      comuns: [
        'Diarreia (37-43%)',
        'Dor abdominal (14-19%)',
        'Colelitíase (14-25%)',
        'Reações no local de injeção',
        'Náuseas',
      ],
      graves: [
        'Colecistite',
        'Bradicardia sinusal',
        'Hiperglicemia ou hipoglicemia',
        'Hipotireoidismo',
      ],
    },
    interacoes: [
      {
        medicamento: 'Ciclosporina',
        gravidade: 'moderada',
        efeito: 'Redução de absorção',
        conduta: 'Monitorar níveis',
      },
      {
        medicamento: 'Antidiabéticos',
        gravidade: 'moderada',
        efeito: 'Alteração glicêmica',
        conduta: 'Monitorar glicemia',
      },
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Evitar; dados insuficientes',
    },
    monitorizacao: [
      'IGF-1 e GH (acromegalia)',
      'USG vesícula biliar periódica',
      'Glicemia',
      'Função tireoidiana',
    ],
    orientacoesPaciente: [
      'Aplicação SC profunda no quadrante superior externo da nádega',
      'Pode ser autoadministrado após treinamento',
      'Armazenar refrigerado; deixar 30min em temperatura ambiente antes de aplicar',
    ],
    doencasRelacionadas: ['acromegalia', 'tumor-neuroendocrino'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['lanreotida', 'Somatuline', 'somatostatina', 'acromegalia', 'NETs'],
  },

  {
    id: 'pasireotida',
    nomeGenerico: 'Pasireotida',
    nomesComerciais: ['Signifor', 'Signifor LAR'],
    atcCode: 'H01CB05',
    rxNormCui: '1311580',
    drugBankId: 'DB06663',
    snomedCT: '703398003',
    classeTerapeutica: 'hormonio',
    subclasse: 'analogo_somatostatina',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '0,3mg/ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '0,6mg/ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '0,9mg/ml', disponivelSUS: false },
      { forma: 'injetavel_im', concentracao: '20mg LAR', disponivelSUS: false },
      { forma: 'injetavel_im', concentracao: '40mg LAR', disponivelSUS: false },
      { forma: 'injetavel_im', concentracao: '60mg LAR', disponivelSUS: false },
    ],
    indicacoes: [
      'Doença de Cushing (adenoma hipofisário secretor de ACTH)',
      'Acromegalia (refratária a outros análogos)',
    ],
    mecanismoAcao: 'Análogo de somatostatina de segunda geração com afinidade 40x maior para SSTR5 (predominante em corticotropinomas). Suprime ACTH em adenomas hipofisários. Também atua em SSTR1, 2 e 3. Única droga aprovada especificamente para Doença de Cushing.',
    posologias: [
      {
        indicacao: 'Doença de Cushing (SC)',
        adultos: {
          dose: 'Iniciar 0,6mg SC 2x/dia, titular até 0,9mg 2x/dia',
          frequencia: '2x/dia SC',
          doseMaxima: '0,9mg 2x/dia',
          observacoes: 'Monitorar cortisol urinário 24h para titulação',
        },
      },
      {
        indicacao: 'Acromegalia (LAR)',
        adultos: {
          dose: 'Iniciar 40mg IM a cada 4 semanas, pode aumentar para 60mg',
          frequencia: 'IM a cada 28 dias',
          doseMaxima: '60mg/mês',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
      'Diabetes mellitus não controlado (causa hiperglicemia importante)',
      'Doença hepática grave',
    ],
    precaucoes: [
      'Hiperglicemia (muito frequente - monitorização intensiva)',
      'Colelitíase',
      'Bradicardia e prolongamento de QT',
      'Hipocortisolismo (desmame gradual)',
      'Função hepática',
    ],
    efeitosAdversos: {
      comuns: [
        'Hiperglicemia (73%) - pode ser grave',
        'Diarreia (58%)',
        'Colelitíase (30%)',
        'Náuseas (52%)',
        'Dor abdominal (24%)',
        'Fadiga',
      ],
      graves: [
        'Diabetes mellitus de novo ou descompensação',
        'Cetoacidose diabética',
        'Insuficiência adrenal',
        'Prolongamento QT',
        'Colecistite',
        'Hepatotoxicidade',
      ],
    },
    interacoes: [
      {
        medicamento: 'Drogas que prolongam QT',
        gravidade: 'grave',
        efeito: 'Risco de arritmias',
        conduta: 'Monitorar ECG; evitar associações',
      },
      {
        medicamento: 'Antidiabéticos',
        gravidade: 'moderada',
        efeito: 'Necessidade de aumento importante das doses',
        conduta: 'Monitorar glicemia intensivamente; ajustar tratamento',
      },
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Contraindicado',
    },
    monitorizacao: [
      'Glicemia de jejum e HbA1c (antes de iniciar e regularmente)',
      'Cortisol urinário 24h',
      'Função hepática',
      'ECG (QT)',
      'USG vesícula biliar',
    ],
    orientacoesPaciente: [
      'Monitorar glicemia diariamente (risco alto de hiperglicemia)',
      'Sintomas de hipocortisolismo: fadiga, náuseas, hipotensão',
      'Não suspender abruptamente',
    ],
    doencasRelacionadas: ['doenca-cushing', 'acromegalia'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['pasireotida', 'Signifor', 'Cushing', 'somatostatina', 'ACTH'],
  },

  // =============================================================================
  // ANTAGONISTA DO RECEPTOR DE GH
  // =============================================================================
  {
    id: 'pegvisomanto',
    nomeGenerico: 'Pegvisomanto',
    nomesComerciais: ['Somavert'],
    atcCode: 'H01AX01',
    rxNormCui: '274125',
    drugBankId: 'DB00082',
    snomedCT: '385527009',
    classeTerapeutica: 'hormonio',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '10mg', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '15mg', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '20mg', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '25mg', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '30mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Acromegalia - refratária ou intolerante a análogos de somatostatina',
      'Normalização de IGF-1 quando análogos não são eficazes',
    ],
    mecanismoAcao: 'Antagonista do receptor de GH. Análogo de GH peguilado que se liga ao receptor mas não o ativa. Bloqueia a ação do GH endógeno, reduzindo produção hepática de IGF-1. Não reduz tamanho tumoral (diferente dos análogos de somatostatina).',
    posologias: [
      {
        indicacao: 'Acromegalia',
        adultos: {
          dose: 'Loading: 40mg SC; Manutenção: 10mg/dia, titular conforme IGF-1',
          frequencia: '1x/dia SC',
          doseMaxima: '30mg/dia',
          observacoes: 'Titular 5mg a cada 4-6 semanas até normalizar IGF-1',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
      'Alergia a látex (tampa contém)',
    ],
    precaucoes: [
      'Hepatotoxicidade (monitorar função hepática)',
      'Possível crescimento tumoral (não inibe secreção de GH)',
      'Diabetes mellitus (pode melhorar; ajustar antidiabéticos)',
      'Lipodistrofia no local de injeção',
    ],
    efeitosAdversos: {
      comuns: [
        'Reações no local de injeção (11%)',
        'Dor (8%)',
        'Diarreia (6%)',
        'Náuseas (5%)',
        'Elevação de transaminases (5-10%)',
        'Sintomas gripais',
      ],
      graves: [
        'Hepatotoxicidade (hepatite, elevação importante de ALT/AST)',
        'Crescimento do adenoma hipofisário',
        'Lipohipertrofia nos locais de injeção',
      ],
    },
    interacoes: [
      {
        medicamento: 'Insulina/Antidiabéticos',
        gravidade: 'moderada',
        efeito: 'Aumento da sensibilidade à insulina; risco de hipoglicemia',
        conduta: 'Monitorar glicemia; pode necessitar redução dos antidiabéticos',
      },
      {
        medicamento: 'Opioides',
        gravidade: 'leve',
        efeito: 'Pode ser necessário aumento da dose de pegvisomanto',
        conduta: 'Monitorar IGF-1',
      },
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes; evitar',
    },
    monitorizacao: [
      'IGF-1 a cada 4-6 semanas durante titulação, depois a cada 6 meses',
      'Função hepática (ALT/AST) mensal por 6 meses, depois semestral',
      'RM de sela túrcica anual (monitorar tamanho tumoral)',
      'Glicemia em diabéticos',
    ],
    orientacoesPaciente: [
      'Injeção diária SC - rodar locais de aplicação',
      'Armazenar refrigerado; deixar 30min em temperatura ambiente antes de aplicar',
      'Relatar dor no quadrante superior direito (hepatotoxicidade)',
      'Relatar cefaleia, distúrbios visuais (crescimento tumoral)',
    ],
    doencasRelacionadas: ['acromegalia'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['pegvisomanto', 'Somavert', 'acromegalia', 'antagonista GH', 'IGF-1'],
  },

  // =============================================================================
  // METABOLISMO ÓSSEO
  // =============================================================================
  {
    id: 'teriparatida',
    nomeGenerico: 'Teriparatida',
    nomesComerciais: ['Forteo', 'Teribone'],
    atcCode: 'H05AA02',
    rxNormCui: '337525',
    drugBankId: 'DB06285',
    snomedCT: '428043003',
    classeTerapeutica: 'anti_osteoporose',
    subclasse: 'analogo_pth',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '250mcg/ml (caneta 2,4ml = 28 doses de 20mcg)', disponivelSUS: false },
    ],
    indicacoes: [
      'Osteoporose grave com alto risco de fratura',
      'Falha ou intolerância a outros antirreabsortivos',
      'Osteoporose induzida por glicocorticoides',
      'Múltiplas fraturas vertebrais',
      'Osteoporose em homens',
    ],
    mecanismoAcao: 'Fragmento 1-34 do PTH humano recombinante. Em administração intermitente (1x/dia), tem efeito anabólico ósseo, estimulando osteoblastos mais que osteoclastos. Aumenta formação óssea, massa óssea e resistência do osso. Diferente de antirreabsortivos.',
    posologias: [
      {
        indicacao: 'Osteoporose grave',
        adultos: {
          dose: '20mcg SC 1x/dia',
          frequencia: '1x/dia SC na coxa ou abdome',
          doseMaxima: '20mcg/dia',
          observacoes: 'Duração máxima: 24 meses. Seguir com bisfosfonato para manter ganho ósseo.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
      'Hipercalcemia pré-existente',
      'Hiperparatireoidismo primário',
      'Doença de Paget do osso',
      'Neoplasia óssea ou metástases ósseas',
      'Radioterapia esquelética prévia',
      'Elevação inexplicada de fosfatase alcalina',
      'Epífises abertas (crianças/adolescentes)',
    ],
    precaucoes: [
      'Urolitíase ativa ou recente',
      'Insuficiência renal moderada/grave',
      'Limite de 24 meses de uso (risco teórico de osteossarcoma)',
      'Hipotensão ortostática (primeiras doses)',
    ],
    efeitosAdversos: {
      comuns: [
        'Náuseas (8-18%)',
        'Tontura (9%)',
        'Cefaleia (8%)',
        'Dor em membros (10%)',
        'Hipercalcemia transitória',
        'Cãibras',
        'Reações no local de injeção',
      ],
      graves: [
        'Hipercalcemia sintomática',
        'Hipotensão ortostática (primeiras doses)',
        'Osteossarcoma (risco teórico; não comprovado em humanos)',
      ],
    },
    interacoes: [
      {
        medicamento: 'Digoxina',
        gravidade: 'leve',
        efeito: 'Hipercalcemia pode aumentar toxicidade digitálica',
        conduta: 'Monitorar cálcio',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Não recomendado; clearance reduzido' },
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Não há dados; evitar',
    },
    monitorizacao: [
      'Cálcio sérico (pode elevar transitoriamente)',
      'Densitometria óssea anual',
      'Função renal basal',
      'Fosfatase alcalina (marcador de formação óssea)',
    ],
    orientacoesPaciente: [
      'Injeção SC diária na coxa ou abdome',
      'Aplicar na mesma hora todos os dias (preferir mesmo horário)',
      'Armazenar refrigerado; descartar 28 dias após primeiro uso',
      'Sentar ou deitar após aplicação (primeiras doses - tontura)',
      'Tratamento máximo de 24 meses',
      'Suplementar cálcio e vitamina D se ingesta inadequada',
    ],
    doencasRelacionadas: ['osteoporose', 'fratura-vertebral'],
    calculadoras: ['frax'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['teriparatida', 'Forteo', 'PTH', 'osteoporose', 'anabólico ósseo'],
  },

  {
    id: 'denosumabe',
    nomeGenerico: 'Denosumabe',
    nomesComerciais: ['Prolia', 'Xgeva'],
    atcCode: 'M05BX04',
    rxNormCui: '855337',
    drugBankId: 'DB06643',
    snomedCT: '703126005',
    classeTerapeutica: 'anti_osteoporose',
    subclasse: 'anticorpo_rankl',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '60mg/ml (Prolia)', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '120mg/1,7ml (Xgeva)', disponivelSUS: false },
    ],
    indicacoes: [
      'Osteoporose pós-menopausa com alto risco de fratura (Prolia)',
      'Osteoporose em homens (Prolia)',
      'Osteoporose induzida por glicocorticoides (Prolia)',
      'Metástases ósseas de tumores sólidos (Xgeva)',
      'Mieloma múltiplo (Xgeva)',
      'Tumor de células gigantes do osso (Xgeva)',
    ],
    mecanismoAcao: 'Anticorpo monoclonal humano IgG2 que se liga ao RANKL (ligante do receptor ativador do NF-kB), impedindo sua interação com RANK nos osteoclastos. Inibe diferenciação, ativação e sobrevida dos osteoclastos, reduzindo reabsorção óssea.',
    posologias: [
      {
        indicacao: 'Osteoporose (Prolia)',
        adultos: {
          dose: '60mg SC a cada 6 meses',
          frequencia: 'A cada 6 meses',
          observacoes: 'Não atrasar doses; risco de fraturas vertebrais múltiplas ao descontinuar',
        },
      },
      {
        indicacao: 'Metástases ósseas (Xgeva)',
        adultos: {
          dose: '120mg SC a cada 4 semanas',
          frequencia: 'Mensal',
          observacoes: 'Dose de ataque adicional nos dias 8 e 15 do primeiro mês em alguns protocolos',
        },
      },
    ],
    contraindicacoes: [
      'Hipocalcemia não corrigida',
      'Hipersensibilidade',
      'Gestação',
    ],
    precaucoes: [
      'Corrigir hipocalcemia antes de iniciar',
      'Osteonecrose de mandíbula (especialmente com Xgeva)',
      'Fraturas atípicas de fêmur',
      'Infecções de pele (celulite)',
      'Descontinuação: risco de fraturas vertebrais múltiplas (efeito rebote)',
    ],
    efeitosAdversos: {
      comuns: [
        'Dor musculoesquelética (7%)',
        'Dor nos membros',
        'Hipocalcemia (especialmente em DRC)',
        'Eczema/Dermatite',
        'Infecções respiratórias',
      ],
      graves: [
        'Osteonecrose de mandíbula (0,7-1,9% com Xgeva)',
        'Fratura atípica de fêmur',
        'Hipocalcemia grave (especialmente em DRC)',
        'Infecções de pele graves (celulite)',
        'Fraturas vertebrais múltiplas após descontinuação',
      ],
    },
    interacoes: [
      {
        medicamento: 'Outros antirreabsortivos',
        gravidade: 'leve',
        efeito: 'Efeito aditivo teórico; não há benefício comprovado',
        conduta: 'Geralmente não combinar; transição de bisfosfonato é aceitável',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste; monitorar cálcio' },
      { tfg: '<30', ajuste: 'Maior risco de hipocalcemia; monitorar cálcio intensivamente' },
    ],
    gestacao: 'X',
    amamentacao: {
      compativel: false,
      observacao: 'Contraindicado; não há dados',
    },
    consideracoesEspeciais: {
      idosos: 'Sem ajuste; monitorar cálcio',
    },
    monitorizacao: [
      'Cálcio sérico antes de cada dose (especialmente em DRC)',
      'Densitometria óssea a cada 1-2 anos',
      'Exame bucal antes de iniciar e orientar sobre higiene oral',
      'Sintomas de fratura atípica (dor em coxa)',
    ],
    orientacoesPaciente: [
      'Injeção a cada 6 meses por profissional de saúde',
      'Suplementar cálcio 1000mg + vitamina D 800-1000UI diariamente',
      'Manter boa higiene bucal; informar dentista sobre uso',
      'Adiar procedimentos dentários invasivos se possível',
      'NÃO atrasar doses - risco de fraturas ao parar',
      'Se necessário parar, transicionar para bisfosfonato',
    ],
    doencasRelacionadas: ['osteoporose', 'metastase-ossea', 'mieloma'],
    calculadoras: ['frax'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['denosumabe', 'Prolia', 'Xgeva', 'RANKL', 'osteoporose', 'metástase óssea'],
  },
];
