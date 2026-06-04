/**
 * PSIQUIATRIA NOVOS - DARWIN-MFC EXPANSAO 1000
 * ============================================
 * Novos psicotropicos e neuromoduladores
 *
 * Referencias:
 * - TRANSFORM trials (Esketamina)
 * - FORWARD studies (Vortioxetina)
 * - DAZZLE (Lumateperona)
 * - SUNRISE (Lemborexant)
 * - INGREZZA trials (Valbenazina)
 * - ARM-TD (Deutetrabenazina)
 * - FDA Black Box Warnings
 * - PharmGKB CYP450 interactions
 */

import { Medicamento } from '@/lib/types/medicamento';

export const psiquiatriaNovos: Partial<Medicamento>[] = [
  // =============================================================================
  // ANTIDEPRESSIVOS NOVOS
  // =============================================================================
  {
    id: 'esketamina-nasal',
    nomeGenerico: 'Esketamina (spray nasal)',
    nomesComerciais: ['Spravato'],
    atcCode: 'N06AX27',
    rxNormCui: '2284670',
    drugBankId: 'DB01221',
    snomedCT: '1156248006',
    casNumber: '33643-46-8',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'antagonista_nmda',
    rename: false,
    apresentacoes: [
      { forma: 'spray_nasal', concentracao: '28mg/dispositivo', disponivelSUS: false },
    ],
    indicacoes: [
      'Depressao resistente ao tratamento (TRD) - em adultos',
      'Depressao maior com ideacao suicida aguda ou comportamento suicida (MDSI)',
      'Adjuvante a antidepressivo oral',
    ],
    mecanismoAcao: 'Enantiomero S da cetamina. Antagonista nao competitivo do receptor NMDA (glutamato). Promove rapido aumento de BDNF e sinaptogenese no cortex pre-frontal e hipocampo, resultando em efeito antidepressivo rapido (horas a dias vs semanas dos antidepressivos convencionais). Tambem atua em receptores opioides e monoaminergicos.',
    posologias: [
      {
        indicacao: 'Depressao resistente (TRD)',
        adultos: {
          dose: 'Semanas 1-4: 56mg ou 84mg 2x/semana; Semanas 5-8: 56mg ou 84mg 1x/semana; Apos semana 9: 56mg ou 84mg a cada 1-2 semanas',
          frequencia: 'Conforme fase do tratamento',
          doseMaxima: '84mg/sessao',
          observacoes: 'Administrar sob supervisao em ambiente certificado (REMS). Monitorar por 2h apos cada dose. Nao comer 2h antes, nao beber 30min antes.',
        },
        idosos: {
          dose: 'Iniciar com 28mg; titular conforme tolerancia',
          observacoes: 'Maior sensibilidade a efeitos adversos',
        },
      },
    ],
    contraindicacoes: [
      'Doenca vascular aneurismatica (aorta, arteria cerebral, periferica)',
      'Malformacao arteriovenosa',
      'Historia de hemorragia intracerebral',
      'Hipertensao nao controlada',
      'Hipersensibilidade a esketamina ou cetamina',
    ],
    precaucoes: [
      'BLACK BOX: Sedacao, dissociacao, abuso e uso indevido, ideacao suicida',
      'Disponivel apenas atraves de programa REMS - administracao supervisionada obrigatoria',
      'Nao dirigir no dia da administracao',
      'Risco de aumento da PA - monitorar antes e apos',
      'Psicose ou mania - evitar em transtorno bipolar nao estabilizado',
      'Doenca hepatica - dose reduzida',
    ],
    efeitosAdversos: {
      comuns: ['Dissociacao (41%)', 'Tontura (29%)', 'Nausea (28%)', 'Sedacao (23%)', 'Cefaleia', 'Disgeusia', 'Hipoestesia oral', 'Aumento da PA'],
      graves: ['Ideacao suicida', 'Dissociacao grave', 'Crise hipertensiva', 'Depressao respiratoria (raro)', 'Cistite intersticial (uso prolongado)'],
    },
    interacoes: [
      {
        medicamento: 'Depressores do SNC (benzodiazepinicos, opioides, alcool)',
        gravidade: 'grave',
        efeito: 'Potencializacao da sedacao e depressao respiratoria',
        mecanismo: 'Efeito aditivo no SNC',
        conduta: 'Monitoramento rigoroso; evitar opioides no dia',
      },
      {
        medicamento: 'Psicoestimulantes (anfetaminas, metilfenidato)',
        gravidade: 'moderada',
        efeito: 'Aumento de PA e FC',
        mecanismo: 'Efeitos cardiovasculares aditivos',
        conduta: 'Monitorar PA cuidadosamente',
      },
      {
        medicamento: 'IMAO',
        gravidade: 'moderada',
        efeito: 'Possivel potencializacao de efeitos',
        conduta: 'Usar com cautela',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Pode necessitar menor frequencia - monitorar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Nao recomendado - passa para leite; efeitos no lactente desconhecidos' },
    monitorizacao: [
      'PA antes e apos cada sessao (a cada 40min por 2h)',
      'Nivel de consciencia e sedacao',
      'Sintomas dissociativos',
      'Ideacao suicida',
      'Sintomas urinarios (uso cronico)',
    ],
    orientacoesPaciente: [
      'Administracao apenas em clinica certificada sob supervisao',
      'Permanecer 2 horas em observacao apos cada dose',
      'Nao dirigir ou operar maquinas no dia do tratamento',
      'Nao comer 2h antes, nao beber liquidos 30min antes',
      'Relatar pensamentos suicidas ou comportamento incomum',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de confusao, hipotensao, quedas; iniciar dose menor',
      hepatopatas: 'Child-Pugh B: monitorar mais tempo; Child-Pugh C: nao recomendado',
    },
    doencasRelacionadas: ['depressao-resistente', 'depressao-maior', 'trd', 'ideacao-suicida'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['esketamina', 'Spravato', 'TRD', 'NMDA', 'cetamina', 'depressao-resistente', 'REMS', 'TRANSFORM'],
  },

  {
    id: 'vilazodona',
    nomeGenerico: 'Vilazodona',
    nomesComerciais: ['Viibryd'],
    atcCode: 'N06AX24',
    rxNormCui: '1040030',
    drugBankId: 'DB06684',
    snomedCT: '698810007',
    casNumber: '163521-12-8',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'isrs',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Transtorno depressivo maior (TDM)',
    ],
    mecanismoAcao: 'Mecanismo duplo: Inibidor seletivo da recaptacao de serotonina (ISRS) + Agonista parcial de receptores 5-HT1A. A combinacao pode resultar em inicio de acao mais rapido e menor disfuncao sexual comparado a ISRS puros. A ativacao de 5-HT1A aumenta liberacao de serotonina no cortex pre-frontal.',
    posologias: [
      {
        indicacao: 'Depressao maior',
        adultos: {
          dose: 'Iniciar 10mg/dia x 7 dias, depois 20mg/dia x 7 dias, depois 40mg/dia',
          frequencia: '1x/dia com alimentos (obrigatorio)',
          doseMaxima: '40mg/dia',
          observacoes: 'DEVE ser tomado com alimentos (aumenta absorcao em 50%). Titulacao gradual obrigatoria.',
        },
      },
    ],
    contraindicacoes: [
      'Uso de IMAO (ou dentro de 14 dias)',
      'Uso concomitante com linezolida ou azul de metileno IV',
      'Hipersensibilidade',
    ],
    precaucoes: [
      'BLACK BOX: Risco aumentado de ideacao e comportamento suicida em criancas, adolescentes e adultos jovens',
      'Sindrome serotoninergica - especialmente com outros serotoninergicos',
      'Sangramento - cautela com anticoagulantes/AINEs',
      'Ativacao de mania/hipomania',
      'Hiponatremia (SIADH) - especialmente em idosos',
      'Glaucoma de angulo fechado',
    ],
    efeitosAdversos: {
      comuns: ['Diarreia (28%)', 'Nauseas (23%)', 'Cefaleia', 'Tontura', 'Insonia', 'Xerostomia', 'Vomitos'],
      graves: ['Sindrome serotoninergica', 'Sindrome de descontinuacao', 'Sangramento GI', 'Hiponatremia', 'Ideacao suicida'],
    },
    interacoes: [
      {
        medicamento: 'IMAO',
        gravidade: 'contraindicada',
        efeito: 'Sindrome serotoninergica grave',
        mecanismo: 'Acumulo excessivo de serotonina',
        conduta: 'Aguardar 14 dias apos IMAO; aguardar 14 dias apos vilazodona para iniciar IMAO',
      },
      {
        medicamento: 'Inibidores fortes de CYP3A4 (cetoconazol, itraconazol, claritromicina)',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de vilazodona',
        mecanismo: 'Inibicao do metabolismo hepatico',
        conduta: 'Reduzir dose de vilazodona para 20mg/dia',
      },
      {
        medicamento: 'Indutores fortes de CYP3A4 (rifampicina, carbamazepina)',
        gravidade: 'moderada',
        efeito: 'Reducao dos niveis de vilazodona',
        mecanismo: 'Aumento do metabolismo',
        conduta: 'Pode necessitar aumento de dose (ate 80mg com cautela)',
      },
      {
        medicamento: 'Anticoagulantes, AINEs, aspirina',
        gravidade: 'moderada',
        efeito: 'Aumento do risco de sangramento',
        mecanismo: 'ISRS reduzem agregacao plaquetaria',
        conduta: 'Monitorar sangramento',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes - excrecao no leite desconhecida' },
    monitorizacao: [
      'Humor e ideacao suicida (especialmente inicio do tratamento)',
      'Sintomas de mania/hipomania',
      'Sodio serico em idosos',
      'Sintomas GI',
    ],
    orientacoesPaciente: [
      'SEMPRE tomar com alimentos - absorcao depende disso',
      'Nao parar abruptamente - risco de sindrome de descontinuacao',
      'Relatar pensamentos suicidas ou mudancas de humor',
      'Pode levar 2-4 semanas para efeito completo',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de hiponatremia; monitorar sodio',
      hepatopatas: 'Sem necessidade de ajuste em hepatopatia leve/moderada',
    },
    doencasRelacionadas: ['depressao', 'transtorno-depressivo-maior'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['vilazodona', 'Viibryd', 'ISRS', '5-HT1A', 'depressao', 'SPARI'],
  },

  {
    id: 'vortioxetina',
    nomeGenerico: 'Vortioxetina',
    nomesComerciais: ['Brintellix', 'Trintellix'],
    atcCode: 'N06AX26',
    rxNormCui: '1455099',
    drugBankId: 'DB09068',
    snomedCT: '710806002',
    casNumber: '508233-74-7',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'multimodal',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Transtorno depressivo maior (TDM)',
      'Disfuncao cognitiva associada a depressao',
    ],
    mecanismoAcao: 'Antidepressivo multimodal com multiplas acoes: Inibicao da recaptacao de serotonina (SERT) + Agonismo de receptores 5-HT1A + Antagonismo de receptores 5-HT3, 5-HT1D e 5-HT7 + Agonismo parcial de 5-HT1B. Esta combinacao resulta em aumento de neurotransmissao serotoninergica, noradrenergica, dopaminergica, histaminergica e colinergica, com beneficios cognitivos demonstrados.',
    posologias: [
      {
        indicacao: 'Depressao maior',
        adultos: {
          dose: 'Iniciar 10mg/dia; pode aumentar para 20mg/dia',
          frequencia: '1x/dia com ou sem alimentos',
          doseMaxima: '20mg/dia',
          observacoes: 'Se intolerancia, pode reduzir para 5mg/dia. Com inibidores fortes de CYP2D6: maximo 10mg/dia.',
        },
        idosos: {
          dose: 'Iniciar 5mg/dia',
          observacoes: 'Mesma dose maxima (20mg); titular com cautela',
        },
      },
    ],
    contraindicacoes: [
      'Uso de IMAO (ou dentro de 14 dias)',
      'Hipersensibilidade a vortioxetina',
    ],
    precaucoes: [
      'BLACK BOX: Risco aumentado de ideacao e comportamento suicida em criancas, adolescentes e adultos jovens',
      'Sindrome serotoninergica',
      'Sangramento aumentado (especialmente com anticoagulantes)',
      'Ativacao de mania',
      'Hiponatremia',
      'Glaucoma de angulo fechado',
    ],
    efeitosAdversos: {
      comuns: ['Nauseas (21-32%, dose-dependente)', 'Constipacao', 'Vomitos', 'Tontura', 'Xerostomia', 'Diarreia', 'Prurido'],
      graves: ['Sindrome serotoninergica', 'Sangramento anormal', 'Hiponatremia', 'Ideacao suicida'],
    },
    interacoes: [
      {
        medicamento: 'IMAO',
        gravidade: 'contraindicada',
        efeito: 'Sindrome serotoninergica',
        conduta: 'Aguardar 14 dias entre medicacoes',
      },
      {
        medicamento: 'Inibidores fortes de CYP2D6 (bupropiona, fluoxetina, paroxetina, quinidina)',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de vortioxetina',
        mecanismo: 'CYP2D6 e principal via metabolica',
        conduta: 'Reduzir dose de vortioxetina pela metade (maximo 10mg)',
      },
      {
        medicamento: 'Indutores fortes de CYP (rifampicina, carbamazepina, fenitoina)',
        gravidade: 'moderada',
        efeito: 'Reducao dos niveis de vortioxetina',
        conduta: 'Considerar aumento de dose se uso prolongado (>14 dias)',
      },
      {
        medicamento: 'Anticoagulantes, AINEs',
        gravidade: 'moderada',
        efeito: 'Risco aumentado de sangramento',
        conduta: 'Cautela; monitorar',
      },
    ],
    pharmgkb: [
      {
        gene: 'CYP2D6',
        phenotype: 'poor_metabolizer',
        implications: ['Niveis plasmaticos elevados de vortioxetina'],
        dosageRecommendations: ['Considerar dose maxima de 10mg/dia em metabolizadores lentos'],
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados limitados - excreta no leite em animais' },
    monitorizacao: [
      'Humor e ideacao suicida',
      'Funcao cognitiva (beneficio especifico)',
      'Sintomas GI',
      'Sodio em pacientes de risco',
    ],
    orientacoesPaciente: [
      'Pode ser tomado com ou sem alimentos',
      'Nausea geralmente melhora apos primeira semana',
      'Pode haver beneficio cognitivo (atencao, memoria)',
      'Nao parar abruptamente',
    ],
    consideracoesEspeciais: {
      idosos: 'Boa opcao devido aos efeitos pro-cognitivos; iniciar com 5mg',
      hepatopatas: 'Sem ajuste necessario em hepatopatia leve/moderada',
    },
    doencasRelacionadas: ['depressao', 'transtorno-depressivo-maior', 'disfuncao-cognitiva'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['vortioxetina', 'Brintellix', 'Trintellix', 'multimodal', 'cognicao', 'depressao', 'FORWARD'],
  },

  {
    id: 'brexanolona',
    nomeGenerico: 'Brexanolona',
    nomesComerciais: ['Zulresso'],
    atcCode: 'N05CM21',
    rxNormCui: '2182320',
    drugBankId: 'DB14651',
    snomedCT: '1149002007',
    casNumber: '516-54-1',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '100mg/20mL (5mg/mL)', disponivelSUS: false },
    ],
    indicacoes: [
      'Depressao pos-parto (DPP) moderada a grave em adultas',
    ],
    mecanismoAcao: 'Analogo sintetico da alopregnanolona, um neurosteroide endogeno. Modulador alosterico positivo dos receptores GABA-A, incluindo subtipos sinapticos e extra-sinapticos. A reducao abrupta de alopregnanolona apos o parto esta implicada na fisiopatologia da DPP. Brexanolona restaura a neurotransmissao GABAergica, com efeito antidepressivo rapido (24-48h).',
    posologias: [
      {
        indicacao: 'Depressao pos-parto',
        adultos: {
          dose: 'Infusao continua de 60 horas total: 0-4h: 30mcg/kg/h; 4-24h: 60mcg/kg/h; 24-52h: 90mcg/kg/h; 52-56h: 60mcg/kg/h; 56-60h: 30mcg/kg/h',
          frequencia: 'Infusao unica de 60 horas',
          observacoes: 'Administrar exclusivamente em ambiente certificado (REMS). Paciente deve estar acompanhada durante todo o periodo.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a brexanolona ou alopregnanolona',
    ],
    precaucoes: [
      'BLACK BOX: Sedacao excessiva ou perda subita de consciencia - programa REMS obrigatorio',
      'Oximetria de pulso continua',
      'Paciente deve estar com acompanhante durante toda infusao',
      'Nao amamentar durante e ate 24h apos a infusao',
      'Doenca renal terminal (DRT) - acumulo de excipiente beta-ciclodextrina',
    ],
    efeitosAdversos: {
      comuns: ['Sonolencia/sedacao (21%)', 'Xerostomia', 'Rubor', 'Perda de consciencia transitoria'],
      graves: ['Perda subita de consciencia (5%)', 'Sedacao excessiva', 'Ideacao suicida (pre-existente pode piorar transitoriamente)'],
    },
    interacoes: [
      {
        medicamento: 'Depressores do SNC (benzodiazepinicos, opioides)',
        gravidade: 'grave',
        efeito: 'Potencializacao da sedacao',
        conduta: 'Avaliar necessidade; monitorar rigorosamente',
      },
      {
        medicamento: 'Alcool',
        gravidade: 'grave',
        efeito: 'Sedacao excessiva',
        conduta: 'Evitar durante tratamento',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Cautela - acumulo de beta-ciclodextrina' },
    ],
    gestacao: 'N',
    amamentacao: { compativel: false, observacao: 'Nao amamentar durante e ate 24h apos infusao (sedacao no lactente)' },
    monitorizacao: [
      'Oximetria de pulso continua durante toda infusao',
      'Nivel de consciencia',
      'Sedacao excessiva',
      'Humor e ideacao suicida',
    ],
    orientacoesPaciente: [
      'Tratamento em ambiente hospitalar certificado apenas',
      'Acompanhante obrigatorio durante toda infusao',
      'Nao amamentar durante e por 24h apos',
      'Efeito antidepressivo pode ser rapido (24-48h)',
    ],
    consideracoesEspeciais: {
      hepatopatas: 'Hepatopatia leve/moderada: sem ajuste; grave: nao estudado',
    },
    doencasRelacionadas: ['depressao-pos-parto', 'dpp', 'depressao-perinatal'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['brexanolona', 'Zulresso', 'depressao-pos-parto', 'DPP', 'GABA', 'neurosteroide', 'REMS'],
  },

  // =============================================================================
  // ANTIPSICOTICOS NOVOS
  // =============================================================================
  {
    id: 'brexpiprazol',
    nomeGenerico: 'Brexpiprazol',
    nomesComerciais: ['Rexulti'],
    atcCode: 'N05AX16',
    rxNormCui: '1658305',
    drugBankId: 'DB09128',
    snomedCT: '713397000',
    casNumber: '913611-97-9',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'antipsicotico_atipico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,25mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '0,5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '3mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Esquizofrenia',
      'Adjuvante a antidepressivo no TDM',
      'Agitacao associada a demencia de Alzheimer',
    ],
    mecanismoAcao: 'Antipsicotico atipico de 3a geracao. Agonista parcial de receptores D2 e 5-HT1A + Antagonista de receptores 5-HT2A. Comparado ao aripiprazol, tem menor atividade intrinseca no D2 (menos acatisia) e maior afinidade por 5-HT1A e 5-HT2A (melhor perfil de tolerabilidade). Perfil receptor-serotonina-dopamina estabilizador.',
    posologias: [
      {
        indicacao: 'Esquizofrenia',
        adultos: {
          dose: 'Iniciar 1mg/dia x 4 dias, depois 2mg/dia x 3 dias, depois 2-4mg/dia',
          frequencia: '1x/dia',
          doseMaxima: '4mg/dia',
          observacoes: 'Com inibidores fortes de CYP2D6: maximo 2mg/dia; com inibidores fortes de CYP3A4: maximo 2mg/dia; com ambos: maximo 1mg/dia',
        },
      },
      {
        indicacao: 'Adjuvante em TDM',
        adultos: {
          dose: 'Iniciar 0,5-1mg/dia; titular ate 2-3mg/dia',
          frequencia: '1x/dia',
          doseMaxima: '3mg/dia',
        },
      },
      {
        indicacao: 'Agitacao na demencia de Alzheimer',
        adultos: {
          dose: 'Iniciar 0,5mg/dia x 7 dias; titular para 1mg/dia, depois 2mg/dia',
          frequencia: '1x/dia',
          doseMaxima: '2mg/dia',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao brexpiprazol',
    ],
    precaucoes: [
      'BLACK BOX: Aumento da mortalidade em idosos com psicose relacionada a demencia (exceto Alzheimer aprovado)',
      'BLACK BOX: Ideacao e comportamento suicida em jovens (quando usado para TDM)',
      'Sindrome neuroleptica maligna',
      'Discinesia tardia',
      'Alteracoes metabolicas (peso, glicose, lipideos)',
      'Leucopenia/neutropenia',
      'Hipotensao ortostatica',
      'Convulsoes',
    ],
    efeitosAdversos: {
      comuns: ['Ganho de peso', 'Acatisia', 'Cefaleia', 'Sonolencia', 'Nasofaringite', 'Tremor'],
      graves: ['Sindrome neuroleptica maligna', 'Discinesia tardia', 'Hiperglicemia', 'AVC em idosos'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores fortes de CYP2D6 (paroxetina, fluoxetina, quinidina)',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de brexpiprazol',
        mecanismo: 'CYP2D6 e principal via metabolica',
        conduta: 'Reduzir dose para metade',
      },
      {
        medicamento: 'Inibidores fortes de CYP3A4 (itraconazol, claritromicina)',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de brexpiprazol',
        conduta: 'Reduzir dose para metade',
      },
      {
        medicamento: 'Indutores fortes de CYP3A4 (rifampicina)',
        gravidade: 'moderada',
        efeito: 'Reducao dos niveis',
        conduta: 'Dobrar a dose de brexpiprazol ao longo de 1-2 semanas',
      },
    ],
    pharmgkb: [
      {
        gene: 'CYP2D6',
        phenotype: 'poor_metabolizer',
        implications: ['Aumento da exposicao ao brexpiprazol'],
        dosageRecommendations: ['Metabolizadores lentos de CYP2D6: usar metade da dose usual'],
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes - evitar' },
    monitorizacao: [
      'Peso e IMC',
      'Glicemia e HbA1c',
      'Perfil lipidico',
      'Sintomas extrapiramidais',
      'Sinais de discinesia tardia',
      'PA e FC',
    ],
    orientacoesPaciente: [
      'Tomar 1x ao dia, com ou sem alimentos',
      'Monitorar peso regularmente',
      'Informar sobre movimentos involuntarios',
      'Levantar-se lentamente',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior sensibilidade; risco aumentado de AVC em demencia nao-Alzheimer',
      hepatopatas: 'Hepatopatia moderada: maximo 3mg em esquizofrenia, 2mg em TDM; grave: maximo 2mg/1mg',
    },
    doencasRelacionadas: ['esquizofrenia', 'depressao', 'agitacao-demencia', 'alzheimer'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['brexpiprazol', 'Rexulti', 'antipsicotico', 'D2-parcial', 'TDM-adjuvante', 'Alzheimer'],
  },

  {
    id: 'cariprazina',
    nomeGenerico: 'Cariprazina',
    nomesComerciais: ['Vraylar', 'Reagila'],
    atcCode: 'N05AX15',
    rxNormCui: '1658311',
    drugBankId: 'DB09107',
    snomedCT: '713398005',
    casNumber: '839712-12-8',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'antipsicotico_atipico',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '1,5mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '3mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '4,5mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '6mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Esquizofrenia',
      'Mania aguda ou episodios mistos (transtorno bipolar I)',
      'Depressao bipolar (transtorno bipolar I)',
    ],
    mecanismoAcao: 'Antipsicotico atipico com alta afinidade por receptores D3. Agonista parcial de receptores D2 e D3 + Agonista parcial de 5-HT1A + Antagonista de 5-HT2A e 5-HT2B. A preferencia por D3 sobre D2 (10x maior afinidade) pode contribuir para efeitos pro-cognitivos e menor efeito em sintomas negativos. Meia-vida muito longa (metabolito ativo: 1-3 semanas).',
    posologias: [
      {
        indicacao: 'Esquizofrenia',
        adultos: {
          dose: 'Iniciar 1,5mg/dia; aumentar para 3mg dia 2; faixa 1,5-6mg/dia',
          frequencia: '1x/dia',
          doseMaxima: '6mg/dia',
          observacoes: 'Meia-vida longa - efeito completo pode levar semanas; ajustes de dose nao refletem imediatamente',
        },
      },
      {
        indicacao: 'Mania/Episodio misto bipolar I',
        adultos: {
          dose: 'Iniciar 1,5mg/dia; aumentar conforme resposta ate 3-6mg/dia',
          frequencia: '1x/dia',
          doseMaxima: '6mg/dia',
        },
      },
      {
        indicacao: 'Depressao bipolar I',
        adultos: {
          dose: 'Iniciar 1,5mg/dia; faixa 1,5-3mg/dia',
          frequencia: '1x/dia',
          doseMaxima: '3mg/dia',
          observacoes: 'Dose maxima menor que para esquizofrenia/mania',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a cariprazina',
    ],
    precaucoes: [
      'BLACK BOX: Aumento da mortalidade em idosos com psicose relacionada a demencia',
      'BLACK BOX: Ideacao suicida em jovens (uso em depressao bipolar)',
      'Sindrome neuroleptica maligna',
      'Discinesia tardia',
      'Efeitos metabolicos (peso, glicose, lipideos)',
      'Leucopenia/neutropenia',
      'Meia-vida muito longa - efeitos adversos podem persistir por semanas apos descontinuacao',
    ],
    efeitosAdversos: {
      comuns: ['Acatisia (muito comum)', 'Sintomas extrapiramidais', 'Insonia', 'Nauseas', 'Constipacao', 'Sedacao', 'Tontura', 'Ganho de peso'],
      graves: ['Sindrome neuroleptica maligna', 'Discinesia tardia', 'Prolongamento QT (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores fortes de CYP3A4 (itraconazol, cetoconazol, claritromicina, ritonavir)',
        gravidade: 'grave',
        efeito: 'Aumento significativo dos niveis',
        conduta: 'Reduzir dose de cariprazina pela metade se ja em uso; se iniciando inibidor, pode necessitar reducao maior',
      },
      {
        medicamento: 'Indutores fortes de CYP3A4 (rifampicina, carbamazepina)',
        gravidade: 'moderada',
        efeito: 'Reducao dos niveis de cariprazina',
        conduta: 'Uso concomitante nao recomendado',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes - evitar' },
    monitorizacao: [
      'Sintomas extrapiramidais e acatisia',
      'Peso e metabolismo (glicose, lipideos)',
      'Sinais de discinesia tardia',
      'Hemograma (se historia de leucopenia)',
    ],
    orientacoesPaciente: [
      'Pode levar semanas para efeito completo (meia-vida longa)',
      'Acatisia (inquietacao) e comum no inicio',
      'Nao parar abruptamente',
      'Monitorar peso',
    ],
    consideracoesEspeciais: {
      idosos: 'Nao usar para psicose de demencia (Black Box)',
      hepatopatas: 'Hepatopatia grave: nao recomendado',
    },
    doencasRelacionadas: ['esquizofrenia', 'transtorno-bipolar', 'mania', 'depressao-bipolar'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['cariprazina', 'Vraylar', 'D3', 'antipsicotico', 'bipolar', 'esquizofrenia', 'depressao-bipolar'],
  },

  {
    id: 'lumateperona',
    nomeGenerico: 'Lumateperona',
    nomesComerciais: ['Caplyta'],
    atcCode: 'N05AX17',
    rxNormCui: '2281323',
    drugBankId: 'DB14977',
    snomedCT: '1156236007',
    casNumber: '1180183-61-4',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'antipsicotico_atipico',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '42mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Esquizofrenia',
      'Depressao bipolar I e II (monoterapia ou adjuvante a litio/valproato)',
    ],
    mecanismoAcao: 'Antipsicotico atipico com mecanismo unico. Antagonista pos-sinaptico de receptores 5-HT2A + Agonista pre-sinaptico parcial de receptores D2 (reduz liberacao de dopamina) e antagonista pos-sinaptico de D2 + Inibidor da recaptacao de serotonina. Modulacao glutamatergica via receptor D1. Perfil de ligacao pre vs pos-sinaptica pode explicar menor SEP e efeitos metabolicos.',
    posologias: [
      {
        indicacao: 'Esquizofrenia',
        adultos: {
          dose: '42mg',
          frequencia: '1x/dia a noite com alimentos',
          doseMaxima: '42mg/dia',
          observacoes: 'Nao requer titulacao. Dose unica.',
        },
      },
      {
        indicacao: 'Depressao bipolar I/II',
        adultos: {
          dose: '42mg',
          frequencia: '1x/dia a noite',
          doseMaxima: '42mg/dia',
          observacoes: 'Pode ser monoterapia ou adjuvante a litio ou valproato',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a lumateperona',
      'Uso concomitante com inibidores fortes de CYP3A4',
    ],
    precaucoes: [
      'BLACK BOX: Aumento da mortalidade em idosos com psicose relacionada a demencia',
      'Sindrome neuroleptica maligna',
      'Discinesia tardia',
      'Alteracoes metabolicas (menores que outros antipsicoticos)',
      'Quedas (especialmente em idosos)',
      'Leucopenia/neutropenia',
    ],
    efeitosAdversos: {
      comuns: ['Sonolencia/sedacao (24%)', 'Nausea', 'Xerostomia', 'Tontura', 'Fadiga'],
      graves: ['Sindrome neuroleptica maligna', 'Discinesia tardia', 'AVC em idosos com demencia'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores fortes de CYP3A4 (cetoconazol, itraconazol, claritromicina)',
        gravidade: 'contraindicada',
        efeito: 'Aumento significativo dos niveis de lumateperona',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Inibidores moderados de CYP3A4 (diltiazem, eritromicina, fluconazol)',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis',
        conduta: 'Evitar se possivel; se necessario, monitorar',
      },
      {
        medicamento: 'Indutores de CYP3A4 (rifampicina, carbamazepina, fenitoina)',
        gravidade: 'grave',
        efeito: 'Reducao dos niveis de lumateperona',
        conduta: 'Uso concomitante nao recomendado',
      },
      {
        medicamento: 'Substratos de UGT (valproato)',
        gravidade: 'leve',
        efeito: 'Lumateperona induz UGT - pode reduzir niveis de valproato',
        conduta: 'Monitorar nivel de valproato se indicado',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Peso e metabolismo (embora perfil favoravel)',
      'Sintomas extrapiramidais',
      'Sinais de discinesia tardia',
      'Nivel de consciencia (sedacao)',
    ],
    orientacoesPaciente: [
      'Tomar a noite com alimentos',
      'Dose unica diaria - nao requer titulacao',
      'Sonolencia e comum - tomar antes de dormir',
      'Menores efeitos no peso comparado a outros antipsicoticos',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de quedas e sedacao; nao usar para psicose de demencia',
      hepatopatas: 'Hepatopatia moderada/grave: nao recomendado',
    },
    doencasRelacionadas: ['esquizofrenia', 'depressao-bipolar', 'transtorno-bipolar'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['lumateperona', 'Caplyta', 'antipsicotico', 'depressao-bipolar', 'esquizofrenia', 'DAZZLE'],
  },

  {
    id: 'pimavanserin',
    nomeGenerico: 'Pimavanserina',
    nomesComerciais: ['Nuplazid'],
    atcCode: 'N05AX17',
    rxNormCui: '1729121',
    drugBankId: 'DB09237',
    snomedCT: '713799000',
    casNumber: '706779-91-1',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'antipsicotico_atipico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '34mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Psicose associada a doenca de Parkinson',
      'Alucinacoes e delirios em pacientes com Parkinson',
    ],
    mecanismoAcao: 'Antipsicotico atipico sem atividade em receptores dopaminergicos. Agonista inverso e antagonista seletivo de receptores 5-HT2A + Antagonista de 5-HT2C. Nao bloqueia D2, portanto nao piora sintomas motores do Parkinson. Unico antipsicotico aprovado especificamente para psicose de Parkinson.',
    posologias: [
      {
        indicacao: 'Psicose de Parkinson',
        adultos: {
          dose: '34mg (ou 2 comprimidos de 10mg + 1 de 10mg)',
          frequencia: '1x/dia',
          doseMaxima: '34mg/dia',
          observacoes: 'Nao requer titulacao. Com inibidores fortes de CYP3A4: 10mg 1x/dia',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a pimavanserin',
    ],
    precaucoes: [
      'BLACK BOX: Aumento da mortalidade em idosos com psicose relacionada a demencia (mas esta e a indicacao aprovada em Parkinson)',
      'Prolongamento do intervalo QT - evitar em QTc >500ms',
      'Nao usar com outros prolongadores de QT',
      'Monitorar para piora de sintomas parkinsonianos (raro, mas possivel)',
    ],
    efeitosAdversos: {
      comuns: ['Edema periferico', 'Nausea', 'Constipacao', 'Alucinacoes (paradoxal)', 'Confusao', 'Alteracao da marcha'],
      graves: ['Prolongamento QT', 'Aumento de mortalidade em demencia'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores fortes de CYP3A4 (cetoconazol, itraconazol)',
        gravidade: 'grave',
        efeito: 'Aumento dos niveis de pimavanserin (3x)',
        conduta: 'Reduzir dose para 10mg/dia',
      },
      {
        medicamento: 'Indutores fortes de CYP3A4 (rifampicina)',
        gravidade: 'moderada',
        efeito: 'Reducao dos niveis',
        conduta: 'Pode necessitar aumento de dose ou evitar combinacao',
      },
      {
        medicamento: 'Medicamentos que prolongam QT',
        gravidade: 'grave',
        efeito: 'Risco aditivo de arritmia',
        mecanismo: 'Efeito aditivo no QT',
        conduta: 'Evitar combinacoes; se necessario, ECG frequente',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Nao recomendado - dados insuficientes' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'ECG antes de iniciar e periodicamente (QTc)',
      'Sintomas parkinsonianos',
      'Cognicao e confusao',
      'Quedas',
    ],
    orientacoesPaciente: [
      'Tomar 1x ao dia com ou sem alimentos',
      'Nao piora os sintomas motores do Parkinson',
      'Pode levar algumas semanas para efeito completo',
      'Informar todos os medicamentos em uso (interacoes)',
    ],
    consideracoesEspeciais: {
      idosos: 'Populacao-alvo, mas com Black Box para mortalidade em demencia',
      hepatopatas: 'Hepatopatia grave: nao recomendado',
    },
    doencasRelacionadas: ['psicose-parkinson', 'doenca-de-parkinson', 'alucinacoes'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['pimavanserin', 'Nuplazid', 'Parkinson', 'psicose', '5-HT2A', 'sem-D2'],
  },

  // =============================================================================
  // ANSIOLITICOS/HIPNOTICOS - ANTAGONISTAS OREXINA
  // =============================================================================
  {
    id: 'lemborexant',
    nomeGenerico: 'Lemborexante',
    nomesComerciais: ['Dayvigo'],
    atcCode: 'N05CX07',
    rxNormCui: '2281324',
    drugBankId: 'DB14978',
    snomedCT: '1156237003',
    casNumber: '1369764-02-2',
    classeTerapeutica: 'hipnotico',
    subclasse: 'antagonista_orexina',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Insonia caracterizada por dificuldade de iniciar e/ou manter o sono',
    ],
    mecanismoAcao: 'Antagonista dual de receptores de orexina (DORA). Bloqueia receptores de orexina 1 (OX1R) e orexina 2 (OX2R), inibindo o sistema de promocao de vigilia mediado por orexinas/hipocretinas. Diferente de benzodiazepinicos (nao atua em GABA). Promove sono mais fisiologico, preservando arquitetura do sono.',
    posologias: [
      {
        indicacao: 'Insonia',
        adultos: {
          dose: 'Iniciar 5mg; pode aumentar para 10mg',
          frequencia: 'Imediatamente antes de dormir',
          doseMaxima: '10mg/dia',
          observacoes: 'Tomar apenas se tiver 7+ horas para dormir. Com inibidores moderados de CYP3A4: maximo 5mg.',
        },
        idosos: {
          dose: '5mg',
          observacoes: 'Geralmente nao precisa aumentar',
        },
      },
    ],
    contraindicacoes: [
      'Narcolepsia',
      'Uso concomitante com inibidores fortes de CYP3A4',
    ],
    precaucoes: [
      'Sonolencia residual diurna - especialmente em doses mais altas',
      'Paralisia do sono, alucinacoes hipnagogicas/hipnopompicas',
      'Cataplexia-like (fraqueza subita)',
      'Comprometimento da conducao na manha seguinte',
      'Comportamentos complexos durante o sono',
      'Depressao - piora ou ideacao suicida',
      'Dependencia potencial (menor que benzodiazepinicos)',
    ],
    efeitosAdversos: {
      comuns: ['Sonolencia', 'Cefaleia', 'Fadiga', 'Pesadelos'],
      graves: ['Paralisia do sono', 'Alucinacoes hipnagogicas', 'Comportamento complexo durante sono', 'Ideacao suicida'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores fortes de CYP3A4 (cetoconazol, itraconazol, claritromicina)',
        gravidade: 'contraindicada',
        efeito: 'Aumento significativo dos niveis de lemborexant',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Inibidores moderados de CYP3A4 (fluconazol, verapamil, diltiazem)',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de lemborexant',
        conduta: 'Maximo 5mg/dia',
      },
      {
        medicamento: 'Indutores fortes/moderados de CYP3A4 (rifampicina, efavirenz)',
        gravidade: 'moderada',
        efeito: 'Reducao dos niveis e eficacia',
        conduta: 'Evitar uso concomitante',
      },
      {
        medicamento: 'Depressores do SNC (alcool, opioides, benzodiazepinicos)',
        gravidade: 'moderada',
        efeito: 'Efeitos sedativos aditivos',
        conduta: 'Evitar alcool; usar com cautela outros depressores',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes - evitar' },
    monitorizacao: [
      'Sonolencia diurna',
      'Comportamentos noturnos incomuns',
      'Humor (especialmente depressao)',
      'Qualidade do sono',
    ],
    orientacoesPaciente: [
      'Tomar imediatamente antes de deitar',
      'Assegurar 7+ horas para dormir',
      'Nao dirigir na manha seguinte se sonolento',
      'Evitar alcool',
      'Relatar comportamentos estranhos durante o sono',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de sonolencia e quedas; iniciar com 5mg',
      hepatopatas: 'Hepatopatia moderada: maximo 5mg; grave: evitar',
    },
    doencasRelacionadas: ['insonia', 'disturbio-do-sono'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['lemborexant', 'Dayvigo', 'orexina', 'DORA', 'insonia', 'hipnotico', 'SUNRISE'],
  },

  {
    id: 'suvorexant',
    nomeGenerico: 'Suvorexanto',
    nomesComerciais: ['Belsomra'],
    atcCode: 'N05CX06',
    rxNormCui: '1535494',
    drugBankId: 'DB09034',
    snomedCT: '710803005',
    casNumber: '1030377-33-3',
    classeTerapeutica: 'hipnotico',
    subclasse: 'antagonista_orexina',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '15mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Insonia caracterizada por dificuldade de iniciar e/ou manter o sono',
    ],
    mecanismoAcao: 'Primeiro antagonista dual de receptores de orexina (DORA) aprovado. Bloqueia OX1R e OX2R no hipotalamo lateral, suprimindo o sistema de promocao de vigilia. Nao atua em receptores GABA, histamina ou outros classicos de hipnoticos. Preserva arquitetura do sono REM e NREM de forma mais fisiologica.',
    posologias: [
      {
        indicacao: 'Insonia',
        adultos: {
          dose: 'Iniciar 10mg; pode aumentar para 15-20mg',
          frequencia: '30 minutos antes de dormir',
          doseMaxima: '20mg/dia',
          observacoes: 'Mulheres e obesos podem ter niveis mais altos - considerar iniciar com dose menor. Tomar 7+ horas antes de dirigir.',
        },
      },
    ],
    contraindicacoes: [
      'Narcolepsia',
    ],
    precaucoes: [
      'Sonolencia residual (especialmente em doses maiores)',
      'Comprometimento da conducao no dia seguinte',
      'Paralisia do sono e alucinacoes hipnagogicas',
      'Comportamentos complexos durante o sono (andar, comer, dirigir)',
      'Piora de depressao e ideacao suicida',
      'Potencial para abuso (Schedule IV nos EUA)',
    ],
    efeitosAdversos: {
      comuns: ['Sonolencia (7%)', 'Cefaleia', 'Tontura', 'Sonhos anormais', 'Xerostomia'],
      graves: ['Paralisia do sono', 'Alucinacoes hipnagogicas', 'Comportamento complexo durante sono', 'Ideacao suicida'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores fortes de CYP3A4 (cetoconazol, itraconazol, ritonavir)',
        gravidade: 'grave',
        efeito: 'Aumento significativo (>3x) dos niveis de suvorexant',
        conduta: 'Nao recomendado uso concomitante',
      },
      {
        medicamento: 'Inibidores moderados de CYP3A4 (diltiazem, verapamil)',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de suvorexant',
        conduta: 'Maximo 10mg/dia',
      },
      {
        medicamento: 'Indutores fortes de CYP3A4 (rifampicina, carbamazepina)',
        gravidade: 'moderada',
        efeito: 'Reducao substancial da eficacia',
        conduta: 'Nao recomendado uso concomitante',
      },
      {
        medicamento: 'Depressores do SNC, alcool',
        gravidade: 'moderada',
        efeito: 'Sedacao aditiva',
        conduta: 'Evitar alcool; cautela com outros sedativos',
      },
      {
        medicamento: 'Digoxina',
        gravidade: 'leve',
        efeito: 'Aumento leve dos niveis de digoxina',
        conduta: 'Monitorar',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Sonolencia diurna',
      'Comportamentos complexos durante o sono',
      'Sintomas depressivos',
      'Sinais de abuso/dependencia',
    ],
    orientacoesPaciente: [
      'Tomar 30 minutos antes de dormir',
      'Nao tomar com ou logo apos refeicao pesada (atrasa efeito)',
      'Garantir 7+ horas para dormir antes de dirigir',
      'Evitar alcool',
      'Relatar comportamentos incomuns durante o sono',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico; monitorar sonolencia e quedas',
      hepatopatas: 'Hepatopatia grave: evitar',
    },
    doencasRelacionadas: ['insonia', 'disturbio-do-sono'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['suvorexant', 'Belsomra', 'orexina', 'DORA', 'insonia', 'hipnotico'],
  },

  {
    id: 'daridorexant',
    nomeGenerico: 'Daridorexante',
    nomesComerciais: ['Quviviq'],
    atcCode: 'N05CX08',
    rxNormCui: '2551878',
    drugBankId: 'DB16642',
    snomedCT: '1255571001',
    casNumber: '1505484-82-1',
    classeTerapeutica: 'hipnotico',
    subclasse: 'antagonista_orexina',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Insonia em adultos',
    ],
    mecanismoAcao: 'Antagonista dual de receptores de orexina (DORA) de terceira geracao. Bloqueia OX1R e OX2R com alta afinidade. Perfil farmacocinetico otimizado: meia-vida de 8 horas permite duracao de efeito adequada durante a noite com minimo carryover matinal. Estudos demonstraram melhora sustentada em sono e funcao diurna.',
    posologias: [
      {
        indicacao: 'Insonia',
        adultos: {
          dose: 'Recomendado 50mg; alguns podem usar 25mg',
          frequencia: '30 minutos antes de dormir',
          doseMaxima: '50mg/dia',
          observacoes: 'Com inibidores moderados de CYP3A4: maximo 25mg/dia. Nao tomar com refeicao rica em gordura.',
        },
      },
    ],
    contraindicacoes: [
      'Narcolepsia',
      'Uso concomitante com inibidores fortes de CYP3A4',
    ],
    precaucoes: [
      'Sonolencia diurna residual',
      'Paralisia do sono e alucinacoes',
      'Comportamentos complexos durante o sono',
      'Comprometimento da conducao',
      'Piora de depressao/ideacao suicida',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Sonolencia', 'Fadiga', 'Tontura', 'Nausea'],
      graves: ['Paralisia do sono', 'Alucinacoes', 'Comportamento complexo durante sono'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores fortes de CYP3A4 (cetoconazol, itraconazol, claritromicina, ritonavir)',
        gravidade: 'contraindicada',
        efeito: 'Aumento significativo dos niveis',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Inibidores moderados de CYP3A4 (eritromicina, diltiazem, verapamil, fluconazol)',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de daridorexant',
        conduta: 'Maximo 25mg/dia',
      },
      {
        medicamento: 'Indutores fortes de CYP3A4 (rifampicina)',
        gravidade: 'grave',
        efeito: 'Reducao significativa da eficacia',
        conduta: 'Uso concomitante nao recomendado',
      },
      {
        medicamento: 'Depressores do SNC',
        gravidade: 'moderada',
        efeito: 'Sedacao aditiva',
        conduta: 'Cautela; evitar alcool',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Sonolencia diurna',
      'Comportamentos durante o sono',
      'Funcao diurna',
      'Humor',
    ],
    orientacoesPaciente: [
      'Tomar 30 minutos antes de dormir',
      'Evitar refeicoes gordurosas perto da dose',
      'Garantir tempo suficiente para dormir',
      'Evitar alcool',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico; meia-vida mais curta pode ser vantajosa',
      hepatopatas: 'Hepatopatia grave: nao recomendado',
    },
    doencasRelacionadas: ['insonia', 'disturbio-do-sono'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['daridorexant', 'Quviviq', 'orexina', 'DORA', 'insonia', 'hipnotico'],
  },

  // =============================================================================
  // TDAH - NAO ESTIMULANTES NOVOS
  // =============================================================================
  {
    id: 'viloxazina-er',
    nomeGenerico: 'Viloxazina ER',
    nomesComerciais: ['Qelbree'],
    atcCode: 'N06BA13',
    rxNormCui: '2475089',
    drugBankId: 'DB00541',
    snomedCT: '387561003',
    casNumber: '46817-91-8',
    classeTerapeutica: 'psicoestimulante',
    subclasse: 'inibidor_recaptacao_noradrenalina',
    rename: false,
    apresentacoes: [
      { forma: 'capsula_xr', concentracao: '100mg', disponivelSUS: false },
      { forma: 'capsula_xr', concentracao: '150mg', disponivelSUS: false },
      { forma: 'capsula_xr', concentracao: '200mg', disponivelSUS: false },
    ],
    indicacoes: [
      'TDAH em criancas (6-17 anos)',
      'TDAH em adultos',
    ],
    mecanismoAcao: 'Inibidor seletivo da recaptacao de noradrenalina (NRI) com atividade serotoninergica adicional (antagonismo 5-HT2B, 5-HT2C e agonismo 5-HT7). Reformulacao de viloxazina (antidepressivo antigo na Europa) com liberacao prolongada. Nao e estimulante - sem potencial de abuso significativo.',
    posologias: [
      {
        indicacao: 'TDAH pediatrico (6-11 anos)',
        adultos: {
          dose: 'Ver posologia pediatrica',
          frequencia: '1x/dia pela manha',
        },
        pediatrico: {
          dose: 'Iniciar 100mg/dia; titular semanalmente: 100 -> 200 -> 300 -> 400mg',
          frequencia: '1x/dia pela manha',
          idadeMinima: '6 anos',
          doseMaxima: '400mg/dia',
        },
      },
      {
        indicacao: 'TDAH adolescentes (12-17 anos)',
        adultos: {
          dose: 'Ver posologia pediatrica',
          frequencia: '1x/dia pela manha',
        },
        pediatrico: {
          dose: 'Iniciar 200mg/dia; titular semanalmente ate 400mg/dia',
          frequencia: '1x/dia pela manha',
          idadeMinima: '12 anos',
          doseMaxima: '400mg/dia',
        },
      },
      {
        indicacao: 'TDAH adultos',
        adultos: {
          dose: 'Iniciar 200mg/dia; pode titular para 400-600mg/dia',
          frequencia: '1x/dia pela manha',
          doseMaxima: '600mg/dia',
          observacoes: 'Pode abrir capsula e polvilhar sobre alimentos macios',
        },
      },
    ],
    contraindicacoes: [
      'Uso de IMAO (ou dentro de 14 dias)',
      'Hipersensibilidade a viloxazina',
    ],
    precaucoes: [
      'BLACK BOX: Ideacao e comportamento suicida em criancas/adolescentes',
      'Aumento de PA e FC',
      'Ativacao de mania/hipomania',
      'Nao e substancia controlada (diferente de estimulantes)',
    ],
    efeitosAdversos: {
      comuns: ['Sonolencia', 'Reducao do apetite', 'Cefaleia', 'Fadiga', 'Nausea', 'Vomitos', 'Irritabilidade', 'Insonia'],
      graves: ['Ideacao suicida', 'Mania', 'Hipertensao'],
    },
    interacoes: [
      {
        medicamento: 'IMAO',
        gravidade: 'contraindicada',
        efeito: 'Crise hipertensiva potencial',
        conduta: 'Aguardar 14 dias entre medicacoes',
      },
      {
        medicamento: 'Substratos de CYP1A2 (teofilina, duloxetina, asenapina)',
        gravidade: 'moderada',
        efeito: 'Viloxazina inibe CYP1A2 - aumenta niveis dos substratos',
        mecanismo: 'Inibicao de CYP1A2',
        conduta: 'Reduzir dose do substrato conforme necessario',
      },
      {
        medicamento: 'Drogas serotoninergicas',
        gravidade: 'moderada',
        efeito: 'Risco de sindrome serotoninergica',
        conduta: 'Monitorar',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'PA e FC (especialmente no inicio e titulacao)',
      'Humor e ideacao suicida',
      'Apetite e peso',
      'Sintomas de mania',
    ],
    orientacoesPaciente: [
      'Tomar pela manha com ou sem alimentos',
      'Pode abrir capsula e misturar com alimentos macios se dificuldade de engolir',
      'Nao e "droga controlada" como estimulantes',
      'Relatar mudancas de humor ou pensamentos suicidas',
    ],
    consideracoesEspeciais: {
      pediatrico: 'Aprovado a partir de 6 anos; monitorar crescimento e ideacao suicida',
      hepatopatas: 'Hepatopatia grave: reduzir dose em 50%',
    },
    doencasRelacionadas: ['tdah'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['viloxazina', 'Qelbree', 'TDAH', 'nao-estimulante', 'NRI', 'pediatrico'],
  },

  {
    id: 'solriamfetol',
    nomeGenerico: 'Solriamfetol',
    nomesComerciais: ['Sunosi'],
    atcCode: 'N06BA14',
    rxNormCui: '2182309',
    drugBankId: 'DB14649',
    snomedCT: '1149001000',
    casNumber: '178429-62-0',
    classeTerapeutica: 'psicoestimulante',
    subclasse: 'inibidor_recaptacao_da_ne',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '75mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '150mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Sonolencia diurna excessiva em narcolepsia',
      'Sonolencia diurna excessiva em apneia obstrutiva do sono (SAOS) - adjuvante',
    ],
    mecanismoAcao: 'Inibidor da recaptacao de dopamina e noradrenalina (DNRI). Diferente de anfetaminas, nao promove liberacao de catecolaminas. Mecanismo similar ao modafinila mas com perfil farmacodinamico distinto. Promove vigilia sem efeitos euforicos significativos.',
    posologias: [
      {
        indicacao: 'Narcolepsia',
        adultos: {
          dose: 'Iniciar 75mg/dia; pode titular para 150mg/dia',
          frequencia: '1x/dia ao acordar',
          doseMaxima: '150mg/dia',
          observacoes: 'Nao tomar a menos de 9 horas antes de dormir',
        },
      },
      {
        indicacao: 'SAOS',
        adultos: {
          dose: 'Iniciar 37,5mg/dia; titular ate 150mg/dia',
          frequencia: '1x/dia ao acordar',
          doseMaxima: '150mg/dia',
          observacoes: 'Uso adjuvante - manter CPAP/tratamento primario da SAOS',
        },
      },
    ],
    contraindicacoes: [
      'Uso de IMAO (ou dentro de 14 dias)',
      'Hipertensao nao controlada',
      'Doenca cardiaca grave',
    ],
    precaucoes: [
      'Aumento de PA e FC - evitar em HAS descontrolada ou doenca CV',
      'Sintomas psiquiatricos (ansiedade, insonia, irritabilidade)',
      'Potencial de abuso (Schedule IV nos EUA)',
      'Nao substitui tratamento primario da SAOS (CPAP)',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Nausea', 'Reducao do apetite', 'Ansiedade', 'Insonia', 'Nasofaringite'],
      graves: ['Hipertensao', 'Taquicardia', 'Sintomas psiquiatricos'],
    },
    interacoes: [
      {
        medicamento: 'IMAO',
        gravidade: 'contraindicada',
        efeito: 'Risco de crise hipertensiva',
        conduta: 'Nao usar concomitantemente; aguardar 14 dias',
      },
      {
        medicamento: 'Agentes dopaminergicos',
        gravidade: 'moderada',
        efeito: 'Efeitos aditivos no sistema dopaminergico',
        conduta: 'Monitorar',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '60-89', ajuste: 'Sem ajuste' },
      { tfg: '30-59', ajuste: 'Maximo 75mg/dia' },
      { tfg: '15-29', ajuste: 'Maximo 37,5mg/dia' },
      { tfg: '<15', ajuste: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'PA e FC antes de iniciar e periodicamente',
      'Sintomas psiquiatricos',
      'Sinais de abuso',
    ],
    orientacoesPaciente: [
      'Tomar ao acordar',
      'Evitar tomar a menos de 9h antes de dormir',
      'Nao substitui CPAP em apneia do sono',
      'Monitorar PA regularmente',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco cardiovascular; monitorar PA',
    },
    doencasRelacionadas: ['narcolepsia', 'apneia-do-sono', 'sonolencia-excessiva'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['solriamfetol', 'Sunosi', 'narcolepsia', 'SAOS', 'sonolencia', 'DNRI'],
  },

  // =============================================================================
  // TRATAMENTO DE DISCINESIA TARDIA
  // =============================================================================
  {
    id: 'deutetrabenazina',
    nomeGenerico: 'Deutetrabenazina',
    nomesComerciais: ['Austedo'],
    atcCode: 'N07XX12',
    rxNormCui: '1876762',
    drugBankId: 'DB12342',
    snomedCT: '735082001',
    casNumber: '1392826-25-3',
    classeTerapeutica: 'antiparkinsoniano',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '6mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '9mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '12mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Discinesia tardia em adultos',
      'Coreia associada a doenca de Huntington',
    ],
    mecanismoAcao: 'Inibidor reversivel do transportador vesicular de monoaminas 2 (VMAT2). Forma deuterada da tetrabenazina (substituicao de hidrogenio por deuterio) com meia-vida mais longa, permitindo administracao 2x/dia com menores flutuacoes plasmaticas. Depleta dopamina pre-sinaptica, reduzindo movimentos involuntarios hipercinéticos.',
    posologias: [
      {
        indicacao: 'Discinesia tardia',
        adultos: {
          dose: 'Iniciar 12mg/dia (6mg 2x/dia); titular semanalmente em incrementos de 6mg/dia',
          frequencia: '2x/dia com alimentos',
          doseMaxima: '48mg/dia',
          observacoes: 'Com inibidores fortes de CYP2D6: maximo 36mg/dia. Metabolizadores lentos CYP2D6: maximo 36mg/dia.',
        },
      },
      {
        indicacao: 'Coreia de Huntington',
        adultos: {
          dose: 'Iniciar 6mg/dia; titular semanalmente',
          frequencia: '1x ou 2x/dia',
          doseMaxima: '48mg/dia',
        },
      },
    ],
    contraindicacoes: [
      'Hepatopatia grave',
      'Uso de IMAO (ou dentro de 14 dias)',
      'Uso de reserpina (ou dentro de 20 dias)',
      'Depressao nao tratada ou mal controlada',
      'Ideacao ou comportamento suicida',
    ],
    precaucoes: [
      'BLACK BOX: Risco aumentado de depressao e suicidalidade - nao usar se depressao nao tratada',
      'Prolongamento do QT (evitar em QTc >500ms)',
      'Sindrome neuroleptica maligna',
      'Parkinsonismo (efeito de depleção dopaminergica)',
      'Disfagia - monitorar em Huntington',
    ],
    efeitosAdversos: {
      comuns: ['Sonolencia', 'Diarreia', 'Xerostomia', 'Fadiga', 'Nasofaringite'],
      graves: ['Depressao', 'Suicidalidade', 'Prolongamento QT', 'Parkinsonismo', 'Sindrome neuroleptica maligna'],
    },
    interacoes: [
      {
        medicamento: 'IMAO',
        gravidade: 'contraindicada',
        efeito: 'Crise hipertensiva',
        conduta: 'Aguardar 14 dias entre medicacoes',
      },
      {
        medicamento: 'Reserpina',
        gravidade: 'contraindicada',
        efeito: 'Depleção excessiva de monoaminas',
        conduta: 'Aguardar 20 dias apos reserpina',
      },
      {
        medicamento: 'Inibidores fortes de CYP2D6 (paroxetina, fluoxetina, quinidina)',
        gravidade: 'moderada',
        efeito: 'Aumento dos metabolitos ativos',
        mecanismo: 'CYP2D6 metaboliza deutetrabenazina',
        conduta: 'Maximo 36mg/dia',
      },
      {
        medicamento: 'Medicamentos que prolongam QT',
        gravidade: 'grave',
        efeito: 'Risco aditivo de arritmia',
        conduta: 'Evitar combinacoes; monitorar ECG',
      },
      {
        medicamento: 'Tetrabenazina ou valbenazina',
        gravidade: 'grave',
        efeito: 'Sobreposicao de mecanismo',
        conduta: 'Nao combinar inibidores de VMAT2',
      },
    ],
    pharmgkb: [
      {
        gene: 'CYP2D6',
        phenotype: 'poor_metabolizer',
        implications: ['Aumento da exposicao aos metabolitos ativos'],
        dosageRecommendations: ['Metabolizadores lentos: maximo 36mg/dia'],
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes - evitar' },
    monitorizacao: [
      'Humor - depressao e suicidalidade (OBRIGATORIO)',
      'Sintomas de discinesia/coreia',
      'Parkinsonismo emergente',
      'ECG se fatores de risco para QT',
      'Disfagia em Huntington',
    ],
    orientacoesPaciente: [
      'Tomar com alimentos',
      'Informar imediatamente se tristeza, pensamentos suicidas',
      'Pode levar semanas para efeito maximo',
      'Nao parar abruptamente',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico; maior vigilancia para depressao e parkinsonismo',
      hepatopatas: 'Hepatopatia grave: contraindicado',
    },
    doencasRelacionadas: ['discinesia-tardia', 'huntington', 'coreia'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['deutetrabenazina', 'Austedo', 'VMAT2', 'discinesia-tardia', 'Huntington', 'ARM-TD'],
  },

  {
    id: 'valbenazina',
    nomeGenerico: 'Valbenazina',
    nomesComerciais: ['Ingrezza'],
    atcCode: 'N07XX11',
    rxNormCui: '1876769',
    drugBankId: 'DB12093',
    snomedCT: '735083006',
    casNumber: '1025504-59-9',
    classeTerapeutica: 'antiparkinsoniano',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '40mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '60mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '80mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Discinesia tardia em adultos',
    ],
    mecanismoAcao: 'Inibidor seletivo e reversivel do transportador vesicular de monoaminas 2 (VMAT2). Pro-droga convertida em metabolito ativo (+)-alfa-dihidrotetrabenazina. Reduz recaptacao vesicular de dopamina, diminuindo sua disponibilidade sinaptica e consequentemente os movimentos involuntarios da discinesia tardia. Primeiro medicamento aprovado especificamente para discinesia tardia.',
    posologias: [
      {
        indicacao: 'Discinesia tardia',
        adultos: {
          dose: 'Iniciar 40mg/dia; apos 1 semana aumentar para 80mg/dia',
          frequencia: '1x/dia',
          doseMaxima: '80mg/dia',
          observacoes: 'Com inibidores fortes de CYP2D6: considerar 40mg/dia. Metabolizadores lentos de CYP2D6: considerar reducao de dose se efeitos adversos.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a valbenazina',
    ],
    precaucoes: [
      'Prolongamento do QT - evitar em sindrome do QT longo ou com outros prolongadores',
      'Sonolencia - cuidado ao dirigir',
      'Parkinsonismo (pode emergir devido ao mecanismo)',
      'Depressao e suicidalidade (classe VMAT2)',
      'Nao interromper abruptamente o antipsicotico causador',
    ],
    efeitosAdversos: {
      comuns: ['Sonolencia (10%)', 'Disturbio de equilibrio', 'Cefaleia', 'Acatisia (paradoxal)', 'Fadiga', 'Constipacao'],
      graves: ['Prolongamento QT', 'Parkinsonismo', 'Reacoes de hipersensibilidade'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores fortes de CYP2D6 (paroxetina, fluoxetina, quinidina)',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis do metabolito ativo',
        conduta: 'Considerar reducao para 40mg/dia',
      },
      {
        medicamento: 'Inibidores fortes de CYP3A4 (cetoconazol, itraconazol)',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de valbenazina',
        conduta: 'Considerar reducao de dose',
      },
      {
        medicamento: 'Indutores fortes de CYP3A4 (rifampicina, carbamazepina)',
        gravidade: 'moderada',
        efeito: 'Reducao da eficacia de valbenazina',
        conduta: 'Evitar combinacao',
      },
      {
        medicamento: 'Medicamentos que prolongam QT',
        gravidade: 'grave',
        efeito: 'Risco aditivo de arritmia',
        conduta: 'Evitar se possivel; ECG se necessario combinar',
      },
      {
        medicamento: 'IMAO',
        gravidade: 'grave',
        efeito: 'Potencial para interacoes graves',
        conduta: 'Evitar uso concomitante',
      },
      {
        medicamento: 'Digoxina',
        gravidade: 'moderada',
        efeito: 'Valbenazina pode aumentar niveis de digoxina',
        mecanismo: 'Inibicao de glicoproteina-P',
        conduta: 'Monitorar niveis de digoxina',
      },
    ],
    pharmgkb: [
      {
        gene: 'CYP2D6',
        phenotype: 'poor_metabolizer',
        implications: ['Exposicao aumentada ao metabolito ativo'],
        dosageRecommendations: ['Considerar 40mg/dia em metabolizadores lentos se efeitos adversos'],
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Escores de discinesia (AIMS)',
      'Sinais de parkinsonismo emergente',
      'Humor - depressao',
      'ECG se uso com outros prolongadores de QT',
      'Sonolencia',
    ],
    orientacoesPaciente: [
      'Tomar 1x ao dia com ou sem alimentos',
      'Pode levar algumas semanas para efeito completo',
      'Informar sonolencia excessiva',
      'Nao parar antipsicotico atual sem orientacao medica',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico; maior vigilancia para QT',
      hepatopatas: 'Hepatopatia moderada/grave: maximo 40mg/dia',
    },
    doencasRelacionadas: ['discinesia-tardia', 'discinesia-induzida-por-antipsicotico'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['valbenazina', 'Ingrezza', 'VMAT2', 'discinesia-tardia', 'KINECT'],
  },
];
