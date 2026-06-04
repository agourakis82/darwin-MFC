/**
 * ANTIDIABÉTICOS NOVOS - DARWIN-MFC EXPANSÃO 1000
 * ===============================================
 * Novos agentes para diabetes mellitus tipo 2
 * Inclui agonistas GLP-1, inibidores SGLT2, e insulinas de nova geração
 *
 * Referências principais:
 * - ADA Standards of Care in Diabetes 2024
 * - EASD Guidelines
 * - Bulas ANVISA / FDA labels
 * - Estudos CVOT: SURPASS, PIONEER, SUSTAIN, VERTIS-CV, SOLOIST
 */

import { Medicamento } from '@/lib/types/medicamento';

export const antidiabeticosNovos: Partial<Medicamento>[] = [
  // =============================================================================
  // AGONISTAS DUPLOS GIP/GLP-1
  // =============================================================================
  {
    id: 'tirzepatida',
    nomeGenerico: 'Tirzepatida',
    nomesComerciais: ['Mounjaro', 'Zepbound'],
    atcCode: 'A10BX16',
    rxNormCui: '2601723',
    drugBankId: 'DB16051',
    snomedCT: '1232344007',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'dual_glp1_gip',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '2,5mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '5mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '7,5mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '10mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '12,5mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '15mg/0,5ml', disponivelSUS: false },
    ],
    indicacoes: [
      'DM2 como adjuvante a dieta e exercício',
      'Obesidade/Sobrepeso com comorbidades (IMC ≥27 com comorbidade ou ≥30)',
      'Redução de risco cardiovascular em DM2',
    ],
    mecanismoAcao: 'Agonista duplo dos receptores GIP (polipeptídeo insulinotrópico dependente de glicose) e GLP-1 (peptídeo semelhante ao glucagon-1). Estimula secreção de insulina glicose-dependente, suprime glucagon, retarda esvaziamento gástrico e promove saciedade. Superioridade vs semaglutida demonstrada no estudo SURPASS-2.',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: {
          dose: 'Iniciar 2,5mg SC 1x/semana por 4 semanas, depois 5mg',
          frequencia: '1x/semana, mesmo dia, independente das refeições',
          doseMaxima: '15mg/semana',
          observacoes: 'Titular a cada 4 semanas: 2,5 → 5 → 7,5 → 10 → 12,5 → 15mg conforme resposta',
        },
        idosos: {
          dose: 'Mesma dose, sem ajuste necessário',
          observacoes: 'Experiência limitada em >75 anos',
        },
      },
      {
        indicacao: 'Obesidade (Zepbound)',
        adultos: {
          dose: 'Iniciar 2,5mg/semana, titular até dose de manutenção',
          frequencia: '1x/semana',
          doseMaxima: '15mg/semana',
          observacoes: 'Perda de peso média de 20-25% nos estudos SURMOUNT',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a tirzepatida',
      'História pessoal ou familiar de carcinoma medular de tireoide (CMT)',
      'Neoplasia endócrina múltipla tipo 2 (NEM2)',
      'Gravidez',
    ],
    precaucoes: [
      'Pancreatite aguda ou crônica',
      'Gastroparesia ou outras condições que retardam esvaziamento gástrico',
      'Retinopatia diabética (monitorar)',
      'Doença da vesícula biliar',
      'Ideação suicida (monitorar)',
    ],
    efeitosAdversos: {
      comuns: [
        'Náuseas (12-33%)',
        'Diarreia (12-21%)',
        'Vômitos (5-12%)',
        'Constipação (6-11%)',
        'Dispepsia (8%)',
        'Dor abdominal (5-6%)',
        'Diminuição do apetite',
        'Reações no local da injeção (2-4%)',
      ],
      graves: [
        'Pancreatite aguda',
        'Colecistite e colelitíase',
        'Hipoglicemia (quando associada a insulina/sulfoniluréias)',
        'Reações de hipersensibilidade graves (anafilaxia, angioedema)',
        'Lesão renal aguda (desidratação)',
        'Tumores de células C da tireoide (risco teórico em roedores)',
        'Ideação suicida (investigação FDA em andamento)',
      ],
    },
    interacoes: [
      {
        medicamento: 'Insulina',
        gravidade: 'moderada',
        efeito: 'Aumento do risco de hipoglicemia',
        conduta: 'Reduzir dose de insulina em 20-50% ao iniciar; monitorar glicemia',
      },
      {
        medicamento: 'Sulfoniluréias',
        gravidade: 'moderada',
        efeito: 'Hipoglicemia',
        conduta: 'Considerar reduzir dose de sulfoniluréia ao iniciar',
      },
      {
        medicamento: 'Contraceptivos orais',
        gravidade: 'leve',
        efeito: 'Possível redução de absorção (retardo esvaziamento gástrico)',
        conduta: 'Trocar para contraceptivo não oral ou usar método de barreira adicional',
      },
      {
        medicamento: 'Medicamentos orais de janela terapêutica estreita',
        gravidade: 'moderada',
        efeito: 'Alteração na absorção',
        conduta: 'Monitorar níveis; considerar administrar 1h antes da tirzepatida',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessário' },
      { tfg: '15-30', ajuste: 'Usar com cautela; sem ajuste de dose' },
      { tfg: '<15', ajuste: 'Experiência limitada; evitar' },
    ],
    gestacao: 'X',
    amamentacao: {
      compativel: false,
      observacao: 'Descontinuar pelo menos 2 meses antes de engravidar; dados insuficientes na lactação',
    },
    consideracoesEspeciais: {
      idosos: 'Sem ajuste necessário; maior risco de desidratação',
      hepatopatas: 'Sem ajuste necessário em hepatopatia leve a moderada',
      pediatrico: 'Não aprovado para <18 anos',
    },
    monitorizacao: [
      'HbA1c a cada 3 meses',
      'Sintomas de pancreatite',
      'Sintomas de colecistopatia',
      'Alterações na retina (em pacientes com retinopatia prévia)',
      'Peso corporal',
      'Hidratação adequada',
    ],
    orientacoesPaciente: [
      'Aplicar 1x/semana, no mesmo dia, SC em abdome, coxa ou braço',
      'Pode ser aplicado com ou sem refeições',
      'Se esquecer uma dose, aplicar assim que lembrar se <4 dias; se ≥4 dias, pular e aplicar na próxima data',
      'Armazenar refrigerado (2-8°C); após primeira aplicação pode manter em temperatura ambiente até 21 dias',
      'Náuseas tendem a diminuir com o tempo; comer refeições menores pode ajudar',
      'Evitar desidratação; beber líquidos adequadamente',
      'Informar médico se dor abdominal intensa, vômitos persistentes ou icterícia',
    ],
    doencasRelacionadas: ['diabetes-mellitus-2', 'obesidade', 'sindrome-metabolica'],
    calculadoras: ['ckd-epi', 'imc'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['tirzepatida', 'GIP', 'GLP-1', 'incretina', 'obesidade', 'DM2', 'SURPASS', 'Mounjaro', 'Zepbound'],
  },

  // =============================================================================
  // AGONISTAS GLP-1 ORAIS
  // =============================================================================
  {
    id: 'semaglutida-oral',
    nomeGenerico: 'Semaglutida (oral)',
    nomesComerciais: ['Rybelsus'],
    atcCode: 'A10BJ06',
    rxNormCui: '2200644',
    drugBankId: 'DB13928',
    snomedCT: '1179434009',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'glp1',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '3mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '7mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '14mg', disponivelSUS: false },
    ],
    indicacoes: [
      'DM2 como adjuvante a dieta e exercício',
      'Primeiro agonista GLP-1 oral disponível',
    ],
    mecanismoAcao: 'Agonista do receptor GLP-1 humano formulado com SNAC (salcaprozato de sódio) para absorção oral. Estimula secreção de insulina glicose-dependente, suprime glucagon, retarda esvaziamento gástrico e aumenta saciedade. Estudo PIONEER demonstrou eficácia comparável à semaglutida SC.',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: {
          dose: 'Iniciar 3mg 1x/dia por 30 dias, depois 7mg 1x/dia',
          frequencia: '1x/dia, em jejum, com até 120ml de água',
          doseMaxima: '14mg/dia',
          observacoes: 'Tomar em jejum ≥30 minutos antes da primeira refeição/bebida/medicamento. Se controle glicêmico insuficiente com 7mg após ≥30 dias, aumentar para 14mg.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a semaglutida',
      'História pessoal ou familiar de CMT',
      'NEM2',
      'Gravidez',
    ],
    precaucoes: [
      'Pancreatite',
      'Retinopatia diabética',
      'Gastroparesia',
      'Doença biliar',
    ],
    efeitosAdversos: {
      comuns: [
        'Náuseas (11-20%)',
        'Diarreia (5-10%)',
        'Vômitos (4-8%)',
        'Constipação (3-5%)',
        'Dor abdominal (5-11%)',
        'Diminuição do apetite',
      ],
      graves: [
        'Pancreatite aguda',
        'Hipoglicemia (com insulina/sulfoniluréias)',
        'Reações de hipersensibilidade',
        'Piora da retinopatia diabética',
        'Lesão renal aguda',
      ],
    },
    interacoes: [
      {
        medicamento: 'Levotiroxina',
        gravidade: 'moderada',
        efeito: 'Aumento da absorção de levotiroxina (↑Cmax 33%)',
        conduta: 'Monitorar função tireoidiana',
      },
      {
        medicamento: 'Insulina/Sulfoniluréias',
        gravidade: 'moderada',
        efeito: 'Hipoglicemia',
        conduta: 'Reduzir dose de insulina/sulfoniluréia ao iniciar',
      },
      {
        medicamento: 'Warfarina',
        gravidade: 'leve',
        efeito: 'Pode aumentar INR',
        conduta: 'Monitorar INR com mais frequência no início',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>15', ajuste: 'Sem ajuste necessário' },
      { tfg: '<15', ajuste: 'Dados limitados; usar com cautela' },
    ],
    gestacao: 'X',
    amamentacao: {
      compativel: false,
      observacao: 'Descontinuar ≥2 meses antes de tentar engravidar',
    },
    monitorizacao: [
      'HbA1c a cada 3 meses',
      'Sintomas GI',
      'Sintomas de pancreatite',
      'Avaliação oftalmológica em pacientes com retinopatia',
    ],
    orientacoesPaciente: [
      'FUNDAMENTAL: Tomar em jejum absoluto com NO MÁXIMO 120ml de água pura',
      'Esperar ≥30 minutos antes de comer, beber ou tomar outros medicamentos',
      'Não partir, mastigar ou esmagar o comprimido',
      'Se esquecer uma dose, pular e tomar a próxima no dia seguinte',
      'Náuseas diminuem com o tempo; comer porções menores ajuda',
    ],
    doencasRelacionadas: ['diabetes-mellitus-2'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['semaglutida', 'oral', 'GLP-1', 'Rybelsus', 'incretina', 'PIONEER'],
  },

  // =============================================================================
  // SEMAGLUTIDA SC PARA DIABETES E OBESIDADE
  // =============================================================================
  {
    id: 'semaglutida-sc-diabetes',
    nomeGenerico: 'Semaglutida (subcutânea para diabetes)',
    nomesComerciais: ['Ozempic'],
    atcCode: 'A10BJ06',
    rxNormCui: '1991302',
    drugBankId: 'DB13928',
    snomedCT: '1179434009',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'glp1',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '0,25mg/dose (caneta 2mg/1,5ml)', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '0,5mg/dose (caneta 2mg/1,5ml)', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '1mg/dose (caneta 4mg/3ml)', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '2mg/dose (caneta 8mg/3ml)', disponivelSUS: false },
    ],
    indicacoes: [
      'DM2 como adjuvante a dieta e exercício',
      'Redução de risco cardiovascular em DM2 com doença CV estabelecida',
    ],
    mecanismoAcao: 'Agonista do receptor GLP-1 de ação prolongada (meia-vida ~1 semana). Estimula secreção de insulina glicose-dependente, suprime glucagon, retarda esvaziamento gástrico, aumenta saciedade. Estudo SUSTAIN-6 demonstrou redução de eventos CV.',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: {
          dose: 'Iniciar 0,25mg SC 1x/semana por 4 semanas, depois 0,5mg',
          frequencia: '1x/semana, mesmo dia',
          doseMaxima: '2mg/semana',
          observacoes: 'Se necessário, aumentar para 1mg após ≥4 semanas; se necessário, aumentar para 2mg após mais ≥4 semanas',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
      'CMT pessoal ou familiar',
      'NEM2',
      'Gravidez',
    ],
    precaucoes: [
      'Pancreatite',
      'Retinopatia diabética (monitorar)',
      'Gastroparesia grave',
      'Doença biliar',
    ],
    efeitosAdversos: {
      comuns: [
        'Náuseas (15-20%)',
        'Vômitos (5-9%)',
        'Diarreia (8-9%)',
        'Constipação (5%)',
        'Dor abdominal (7-8%)',
        'Reação no local da injeção (0,5-1%)',
      ],
      graves: [
        'Pancreatite aguda',
        'Piora da retinopatia diabética (SUSTAIN-6)',
        'Colelitíase',
        'Hipoglicemia grave (com insulina/SU)',
        'Lesão renal aguda',
      ],
    },
    interacoes: [
      {
        medicamento: 'Insulina',
        gravidade: 'moderada',
        efeito: 'Hipoglicemia',
        conduta: 'Reduzir dose de insulina ao iniciar',
      },
      {
        medicamento: 'Sulfoniluréias',
        gravidade: 'moderada',
        efeito: 'Hipoglicemia',
        conduta: 'Considerar reduzir dose',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>15', ajuste: 'Sem ajuste' },
      { tfg: '<15', ajuste: 'Experiência limitada' },
    ],
    gestacao: 'X',
    amamentacao: {
      compativel: false,
      observacao: 'Descontinuar ≥2 meses antes de tentar engravidar',
    },
    monitorizacao: [
      'HbA1c',
      'Sintomas de pancreatite',
      'Avaliação oftalmológica em pacientes com retinopatia',
    ],
    orientacoesPaciente: [
      'Aplicar SC no abdome, coxa ou braço 1x/semana',
      'Mesmo dia da semana, a qualquer hora',
      'Refrigerar; após primeiro uso pode manter temperatura ambiente até 56 dias',
      'Se esquecer, aplicar dentro de 5 dias; se >5 dias, pular e aplicar na próxima',
    ],
    doencasRelacionadas: ['diabetes-mellitus-2', 'doenca-cardiovascular'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['semaglutida', 'GLP-1', 'Ozempic', 'SUSTAIN', 'cardioproteção'],
  },

  {
    id: 'semaglutida-sc-obesidade',
    nomeGenerico: 'Semaglutida (subcutânea para obesidade)',
    nomesComerciais: ['Wegovy'],
    atcCode: 'A10BJ06',
    rxNormCui: '2469244',
    drugBankId: 'DB13928',
    snomedCT: '1179434009',
    classeTerapeutica: 'antiobesidade',
    subclasse: 'glp1',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '0,25mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '0,5mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '1mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '1,7mg/0,75ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '2,4mg/0,75ml', disponivelSUS: false },
    ],
    indicacoes: [
      'Tratamento crônico da obesidade (IMC ≥30) ou sobrepeso (IMC ≥27) com pelo menos uma comorbidade',
      'Redução de risco cardiovascular em adultos com sobrepeso/obesidade e DCV estabelecida (SELECT)',
    ],
    mecanismoAcao: 'Agonista GLP-1 em dose mais alta que a indicação para diabetes. Atua em centros hipotalâmicos de saciedade, retarda esvaziamento gástrico e reduz apetite. Estudo STEP demonstrou perda de peso média de 15-17%.',
    posologias: [
      {
        indicacao: 'Obesidade',
        adultos: {
          dose: 'Titulação obrigatória: 0,25mg (sem 1-4) → 0,5mg (sem 5-8) → 1mg (sem 9-12) → 1,7mg (sem 13-16) → 2,4mg (manutenção)',
          frequencia: '1x/semana SC',
          doseMaxima: '2,4mg/semana',
          observacoes: 'Se intolerância, retardar escalonamento; se não tolera 2,4mg, pode manter 1,7mg',
        },
      },
    ],
    contraindicacoes: [
      'CMT pessoal ou familiar',
      'NEM2',
      'Gravidez e lactação',
      'Não usar com outros agonistas GLP-1',
    ],
    efeitosAdversos: {
      comuns: [
        'Náuseas (44%)',
        'Diarreia (30%)',
        'Vômitos (24%)',
        'Constipação (24%)',
        'Cefaleia (14%)',
        'Dispepsia (9%)',
        'Fadiga (11%)',
      ],
      graves: [
        'Pancreatite',
        'Colelitíase',
        'Hipoglicemia (com antidiabéticos)',
        'Ideação suicida (sob investigação)',
        'Lesão renal aguda',
      ],
    },
    interacoes: [
      {
        medicamento: 'Insulina/Sulfoniluréias',
        gravidade: 'grave',
        efeito: 'Hipoglicemia',
        conduta: 'Reduzir ou suspender; esta indicação é para não diabéticos',
      },
      {
        medicamento: 'Contraceptivos orais',
        gravidade: 'leve',
        efeito: 'Possível alteração de absorção',
        conduta: 'Considerar método alternativo ou de barreira adicional',
      },
    ],
    gestacao: 'X',
    amamentacao: {
      compativel: false,
      observacao: 'Não usar; suspender ≥2 meses antes de tentar engravidar',
    },
    monitorizacao: [
      'Peso mensal',
      'Sintomas de pancreatite e colecistopatia',
      'Frequência cardíaca (aumento transitório 1-4bpm)',
      'Tolerabilidade GI',
    ],
    doencasRelacionadas: ['obesidade', 'sindrome-metabolica', 'doenca-cardiovascular'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['semaglutida', 'Wegovy', 'obesidade', 'perda de peso', 'STEP', 'SELECT'],
  },

  // =============================================================================
  // OUTROS AGONISTAS GLP-1
  // =============================================================================
  {
    id: 'lixisenatida',
    nomeGenerico: 'Lixisenatida',
    nomesComerciais: ['Lyxumia'],
    atcCode: 'A10BJ04',
    rxNormCui: '1440048',
    drugBankId: 'DB09265',
    snomedCT: '708195009',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'glp1',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '10mcg/dose (caneta inicial)', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '20mcg/dose (caneta manutenção)', disponivelSUS: false },
    ],
    indicacoes: [
      'DM2 em associação a antidiabéticos orais ou insulina basal',
      'Particularmente útil para controle de glicemia pós-prandial',
    ],
    mecanismoAcao: 'Agonista GLP-1 de ação curta (meia-vida ~3h), derivado da exendina-4. Principal efeito é retardo do esvaziamento gástrico, ideal para controle pós-prandial. Estudo ELIXA: segurança CV neutra.',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: {
          dose: 'Iniciar 10mcg 1x/dia por 14 dias, depois 20mcg 1x/dia',
          frequencia: '1x/dia, 1h antes de qualquer refeição (mesma refeição diariamente)',
          doseMaxima: '20mcg/dia',
          observacoes: 'Pode ser combinada com insulina basal (associação favorável)',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
      'CMT ou NEM2',
    ],
    precaucoes: [
      'Pancreatite',
      'DRC avançada',
      'Gastroparesia',
    ],
    efeitosAdversos: {
      comuns: [
        'Náuseas (26%)',
        'Vômitos (10%)',
        'Diarreia (8%)',
        'Cefaleia (9%)',
        'Hipoglicemia com insulina (28%)',
      ],
      graves: [
        'Pancreatite aguda',
        'Reações de hipersensibilidade',
        'Anafilaxia',
      ],
    },
    interacoes: [
      {
        medicamento: 'Insulina',
        gravidade: 'moderada',
        efeito: 'Hipoglicemia',
        conduta: 'Reduzir dose de insulina ao iniciar',
      },
      {
        medicamento: 'Paracetamol e outros medicamentos',
        gravidade: 'leve',
        efeito: 'Retardo na absorção',
        conduta: 'Administrar medicamentos 1h antes ou 11h após lixisenatida para medicamentos que requerem absorção rápida',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Sem ajuste' },
      { tfg: '30-50', ajuste: 'Sem ajuste; monitorar' },
      { tfg: '15-30', ajuste: 'Cautela; experiência limitada' },
      { tfg: '<15', ajuste: 'Não recomendado' },
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes',
    },
    doencasRelacionadas: ['diabetes-mellitus-2'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['lixisenatida', 'GLP-1', 'Lyxumia', 'ELIXA', 'pós-prandial'],
  },

  {
    id: 'albiglutida',
    nomeGenerico: 'Albiglutida',
    nomesComerciais: ['Tanzeum', 'Eperzan'],
    atcCode: 'A10BJ04',
    rxNormCui: '1534763',
    drugBankId: 'DB09043',
    snomedCT: '714061000',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'glp1',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '30mg', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '50mg', disponivelSUS: false },
    ],
    indicacoes: [
      'DM2 (descontinuado globalmente em 2018 por razões comerciais)',
      'Histórico: demonstrou benefício CV no estudo HARMONY',
    ],
    mecanismoAcao: 'Agonista GLP-1 semanal fundido com albumina humana (meia-vida ~5 dias). O estudo HARMONY Outcomes demonstrou redução de 22% em eventos CV maiores. Descontinuado por baixa adesão de mercado, não por questões de segurança.',
    posologias: [
      {
        indicacao: 'DM2 (histórico)',
        adultos: {
          dose: '30-50mg',
          frequencia: '1x/semana SC',
          doseMaxima: '50mg/semana',
          observacoes: 'Produto descontinuado; mantido para referência histórica',
        },
      },
    ],
    contraindicacoes: [
      'CMT ou NEM2',
      'Hipersensibilidade',
    ],
    efeitosAdversos: {
      comuns: [
        'Reações no local da injeção (15%)',
        'Diarreia (13%)',
        'Náuseas (11%)',
        'Pneumonia (2%)',
      ],
      graves: [
        'Pancreatite',
        'Reações de hipersensibilidade',
      ],
    },
    interacoes: [
      {
        medicamento: 'Insulina/Sulfoniluréias',
        gravidade: 'moderada',
        efeito: 'Hipoglicemia',
        conduta: 'Reduzir dose ao iniciar',
      },
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Produto descontinuado',
    },
    doencasRelacionadas: ['diabetes-mellitus-2'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['albiglutida', 'GLP-1', 'descontinuado', 'HARMONY', 'histórico'],
  },

  // =============================================================================
  // INIBIDORES SGLT2 NOVOS
  // =============================================================================
  {
    id: 'ertugliflozina',
    nomeGenerico: 'Ertugliflozina',
    nomesComerciais: ['Steglatro'],
    atcCode: 'A10BK04',
    rxNormCui: '1992681',
    drugBankId: 'DB12039',
    snomedCT: '1149217002',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'isglt2',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '15mg', disponivelSUS: false },
    ],
    indicacoes: [
      'DM2 como adjuvante a dieta e exercício',
      'Pode ser usado em combinação com metformina, sitagliptina ou insulina',
    ],
    mecanismoAcao: 'Inibidor seletivo SGLT2 no túbulo proximal renal. Aumenta excreção urinária de glicose (~70g/dia), reduzindo glicemia e promovendo perda calórica. Também reduz peso e PA. Estudo VERTIS-CV: segurança CV neutra, benefício em IC.',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: {
          dose: '5mg 1x/dia',
          frequencia: 'Pela manhã, com ou sem alimentos',
          doseMaxima: '15mg/dia',
          observacoes: 'Se controle inadequado com 5mg, pode aumentar para 15mg',
        },
      },
    ],
    contraindicacoes: [
      'DM1',
      'Cetoacidose diabética',
      'Diálise',
      'TFG <30 para início (manter se já em uso com TFG 30-45)',
    ],
    precaucoes: [
      'Risco de amputação (classe)',
      'Cetoacidose euglicêmica',
      'Gangrena de Fournier',
      'Infecções genitais',
      'Hipotensão em idosos/pacientes em diuréticos',
    ],
    efeitosAdversos: {
      comuns: [
        'Candidíase genital feminina (9-12%)',
        'Candidíase genital masculina (3-4%)',
        'ITU (4%)',
        'Poliúria/Polaciúria (2%)',
        'Sede (2%)',
      ],
      graves: [
        'Cetoacidose euglicêmica',
        'Gangrena de Fournier (raro)',
        'Amputações de membros inferiores',
        'Lesão renal aguda',
        'Hipotensão sintomática',
      ],
    },
    interacoes: [
      {
        medicamento: 'Diuréticos de alça/tiazídicos',
        gravidade: 'moderada',
        efeito: 'Hipotensão e desidratação',
        conduta: 'Avaliar volemia antes de iniciar; considerar reduzir diurético',
      },
      {
        medicamento: 'Insulina/Sulfoniluréias',
        gravidade: 'moderada',
        efeito: 'Hipoglicemia',
        conduta: 'Considerar reduzir dose do secretagogo',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '≥45', ajuste: 'Sem ajuste' },
      { tfg: '30-45', ajuste: 'Não iniciar; pode continuar se já em uso para controle glicêmico' },
      { tfg: '<30', ajuste: 'Contraindicado para início; eficácia glicêmica reduzida' },
    ],
    gestacao: 'D',
    amamentacao: {
      compativel: false,
      observacao: 'Pode causar lesão renal no lactente; evitar',
    },
    monitorizacao: [
      'Função renal antes e periodicamente',
      'Sinais de cetoacidose',
      'Infecções genitais e urinárias',
      'Lesões nos pés',
      'PA e volemia',
    ],
    orientacoesPaciente: [
      'Manter hidratação adequada',
      'Suspender temporariamente em cirurgias, jejum prolongado ou doenças agudas',
      'Informar ao médico sintomas como náuseas, vômitos, dor abdominal, fadiga, dificuldade respiratória (cetoacidose)',
      'Examinar os pés regularmente',
      'Higiene genital adequada para prevenir infecções',
    ],
    doencasRelacionadas: ['diabetes-mellitus-2'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['ertugliflozina', 'SGLT2', 'Steglatro', 'VERTIS-CV', 'iSGLT2'],
  },

  {
    id: 'sotagliflozina',
    nomeGenerico: 'Sotagliflozina',
    nomesComerciais: ['Inpefa', 'Zynquista'],
    atcCode: 'A10BK06',
    rxNormCui: '2121518',
    drugBankId: 'DB12221',
    snomedCT: '1172697002',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'isglt2',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Insuficiência cardíaca (redução de eventos CV em IC)',
      'DM2 com IC ou alto risco de IC',
      'DM1 (aprovado na Europa, não nos EUA)',
      'Único inibidor SGLT1/SGLT2 dual aprovado',
    ],
    mecanismoAcao: 'Inibidor dual SGLT1 (intestinal) e SGLT2 (renal). Reduz absorção intestinal de glicose (SGLT1), retardando pico pós-prandial e estimulando GLP-1 endógeno. Também aumenta glicosúria renal (SGLT2). Estudos SCORED e SOLOIST demonstraram redução de hospitalizações por IC.',
    posologias: [
      {
        indicacao: 'Insuficiência cardíaca',
        adultos: {
          dose: '200mg 1x/dia antes do café',
          frequencia: '1x/dia, antes da primeira refeição',
          doseMaxima: '400mg/dia',
          observacoes: 'Pode aumentar para 400mg se tolerado e se necessário maior controle',
        },
      },
      {
        indicacao: 'DM2 com IC',
        adultos: {
          dose: '200-400mg 1x/dia antes do café',
          frequencia: '1x/dia antes da primeira refeição',
          observacoes: 'Dual action: controle glicêmico + benefício cardíaco',
        },
      },
    ],
    contraindicacoes: [
      'DM1 (exceto Europa)',
      'Cetoacidose',
      'Insuficiência renal grave com necessidade de diálise',
    ],
    precaucoes: [
      'Cetoacidose euglicêmica (especialmente em DM1)',
      'Diarreia significativa (efeito SGLT1)',
      'Hipotensão',
      'Gangrena de Fournier',
    ],
    efeitosAdversos: {
      comuns: [
        'Diarreia (8-21% - mais comum que outros iSGLT2 pelo efeito SGLT1)',
        'ITU (5%)',
        'Candidíase genital (5%)',
        'Hipotensão (3%)',
        'Hipoglicemia com insulina',
      ],
      graves: [
        'Cetoacidose diabética',
        'Gangrena de Fournier',
        'Lesão renal aguda',
        'Desidratação grave',
      ],
    },
    interacoes: [
      {
        medicamento: 'Insulina',
        gravidade: 'grave',
        efeito: 'Hipoglicemia e risco aumentado de cetoacidose',
        conduta: 'Reduzir insulina em 20%; monitorar cetonas',
      },
      {
        medicamento: 'Diuréticos',
        gravidade: 'moderada',
        efeito: 'Hipotensão e desidratação',
        conduta: 'Avaliar volemia; considerar reduzir diurético',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '≥25', ajuste: 'Sem ajuste (benefício CV mantido)' },
      { tfg: '<25', ajuste: 'Evitar início; dados limitados' },
    ],
    gestacao: 'D',
    amamentacao: {
      compativel: false,
      observacao: 'Evitar; pode afetar desenvolvimento renal do lactente',
    },
    monitorizacao: [
      'Cetonas em pacientes com DM',
      'Função renal',
      'PA e volemia',
      'Sintomas GI (diarreia)',
    ],
    doencasRelacionadas: ['diabetes-mellitus-2', 'insuficiencia-cardiaca'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['sotagliflozina', 'SGLT1', 'SGLT2', 'dual', 'IC', 'SCORED', 'SOLOIST', 'Inpefa'],
  },

  // =============================================================================
  // INSULINAS DE NOVA GERAÇÃO
  // =============================================================================
  {
    id: 'insulina-degludeca',
    nomeGenerico: 'Insulina degludeca',
    nomesComerciais: ['Tresiba'],
    atcCode: 'A10AE06',
    rxNormCui: '1372741',
    drugBankId: 'DB09564',
    snomedCT: '710290009',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'insulina_ultralonga',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '100U/ml (FlexTouch 3ml)', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '200U/ml (FlexTouch 3ml)', disponivelSUS: false },
    ],
    indicacoes: [
      'DM1 e DM2 em adultos e crianças ≥1 ano',
      'Insulina basal com perfil ultralongo (>42h)',
      'Ideal para pacientes com hipoglicemia noturna recorrente',
    ],
    mecanismoAcao: 'Análogo de insulina de ação ultrarronga. Forma multi-hexâmeros solúveis no tecido subcutâneo que liberam monômeros lentamente. Meia-vida ~25h, duração >42h, permitindo flexibilidade de horário. Estudo DEVOTE: segurança CV comprovada, menor hipoglicemia noturna vs glargina.',
    posologias: [
      {
        indicacao: 'DM2 insulina-naive',
        adultos: {
          dose: '10U 1x/dia, titular conforme glicemia de jejum',
          frequencia: '1x/dia, qualquer hora, mesmo horário',
          observacoes: 'Titular 2U a cada 3-4 dias até GJ alvo (80-130mg/dL)',
        },
      },
      {
        indicacao: 'Transição de outra insulina basal',
        adultos: {
          dose: 'Mesma dose unitária de glargina U100 ou NPH 1x/dia',
          frequencia: '1x/dia',
          observacoes: 'NPH 2x/dia: reduzir dose total em 20% ao converter',
        },
      },
      {
        indicacao: 'DM1',
        adultos: {
          dose: '1/3 a 1/2 da dose total de insulina diária como basal',
          frequencia: '1x/dia, complementar com insulina prandial',
        },
        pediatrico: {
          dose: 'Conforme necessidade (≥1 ano aprovado)',
          frequencia: '1x/dia',
          idadeMinima: '1 ano',
        },
      },
    ],
    contraindicacoes: [
      'Hipoglicemia',
      'Hipersensibilidade a insulina degludeca',
    ],
    precaucoes: [
      'Ajustar dose em insuficiência renal/hepática',
      'Não diluir ou misturar com outras insulinas na mesma seringa',
      'Hipocalemia pode ocorrer',
    ],
    efeitosAdversos: {
      comuns: [
        'Hipoglicemia (menos noturna que comparadores)',
        'Reações no local da injeção (1-2%)',
        'Ganho de peso',
        'Lipodistrofia',
      ],
      graves: [
        'Hipoglicemia grave',
        'Reações alérgicas sistêmicas (raro)',
        'Hipocalemia',
      ],
    },
    interacoes: [
      {
        medicamento: 'Tiazolidinedionas (pioglitazona)',
        gravidade: 'moderada',
        efeito: 'Aumento de retenção hídrica e IC',
        conduta: 'Monitorar sinais de IC; considerar reduzir TZD',
      },
      {
        medicamento: 'Betabloqueadores',
        gravidade: 'moderada',
        efeito: 'Mascaram sintomas de hipoglicemia',
        conduta: 'Orientar paciente sobre sintomas neurogênicos',
      },
      {
        medicamento: 'iSGLT2',
        gravidade: 'moderada',
        efeito: 'Aumento risco de cetoacidose',
        conduta: 'Reduzir insulina em 10-20% ao iniciar iSGLT2',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Sem ajuste específico' },
      { tfg: '30-50', ajuste: 'Monitorar; pode haver necessidade de redução' },
      { tfg: '<30', ajuste: 'Monitorar rigorosamente; redução provável' },
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: true,
      observacao: 'Insulina não passa significativamente para o leite; compatível',
    },
    consideracoesEspeciais: {
      idosos: 'Titular cuidadosamente; alvo glicêmico menos rigoroso',
      hepatopatas: 'Necessidade de insulina pode diminuir; monitorar',
      pediatrico: 'Aprovado ≥1 ano; mesmas apresentações',
    },
    monitorizacao: [
      'Glicemia de jejum (para titulação)',
      'HbA1c a cada 3 meses',
      'Sintomas de hipoglicemia',
      'Potássio sérico (se risco)',
    ],
    orientacoesPaciente: [
      'Aplicar SC 1x/dia, qualquer hora, de preferência mesmo horário',
      'Se esquecer uma dose, aplicar assim que lembrar e retomar horário habitual',
      'Pode variar horário até 8h sem perda de controle',
      'U200 tem o dobro da concentração; não converter doses mentalmente',
      'Armazenar refrigerado; após aberto até 56 dias em temperatura ambiente',
    ],
    doencasRelacionadas: ['diabetes-mellitus-1', 'diabetes-mellitus-2'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['insulina', 'degludeca', 'Tresiba', 'ultralonga', 'basal', 'DEVOTE'],
  },

  {
    id: 'insulina-glargina-u300',
    nomeGenerico: 'Insulina glargina U300 (concentrada)',
    nomesComerciais: ['Toujeo', 'Toujeo SoloStar'],
    atcCode: 'A10AE04',
    rxNormCui: '1670007',
    drugBankId: 'DB00047',
    snomedCT: '411529005',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'insulina_ultralonga',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '300U/ml (caneta SoloStar 1,5ml = 450U)', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '300U/ml (caneta Max SoloStar 3ml = 900U)', disponivelSUS: false },
    ],
    indicacoes: [
      'DM1 e DM2 em adultos',
      'Alternativa para pacientes com doses altas de insulina basal',
      'Pacientes com hipoglicemia recorrente com glargina U100',
    ],
    mecanismoAcao: 'Insulina glargina concentrada (300U/ml vs 100U/ml padrão). A maior concentração resulta em área de precipitação menor, liberação mais lenta e duração mais prolongada (>24h). Perfil mais plano que glargina U100, com menor variabilidade e menos hipoglicemia noturna.',
    posologias: [
      {
        indicacao: 'Transição de glargina U100',
        adultos: {
          dose: 'Mesma dose em unidades (pode necessitar 10-18% mais)',
          frequencia: '1x/dia, mesmo horário',
          observacoes: 'Alguns pacientes podem requerer dose ~10-18% maior que U100 para mesma eficácia',
        },
      },
      {
        indicacao: 'DM2 insulina-naive',
        adultos: {
          dose: '0,2U/kg/dia ou 10U/dia',
          frequencia: '1x/dia',
          doseMaxima: 'Conforme necessidade; caneta Max permite até 160U/aplicação',
          observacoes: 'Titular 2-4U a cada 3-4 dias conforme GJ',
        },
      },
    ],
    contraindicacoes: [
      'Hipoglicemia',
      'Hipersensibilidade',
      'Não usar IV (apenas SC)',
    ],
    precaucoes: [
      'NÃO é bioequivalente unidade-por-unidade com Lantus (U100)',
      'Não diluir ou misturar',
      'Não usar em bombas de insulina',
    ],
    efeitosAdversos: {
      comuns: [
        'Hipoglicemia (menos que U100 em estudos)',
        'Reações no local (1-2%)',
        'Ganho de peso',
      ],
      graves: [
        'Hipoglicemia grave',
        'Reações alérgicas graves (raro)',
      ],
    },
    interacoes: [
      {
        medicamento: 'Outros antidiabéticos',
        gravidade: 'moderada',
        efeito: 'Hipoglicemia aditiva',
        conduta: 'Titular doses; monitorar',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '<60', ajuste: 'Monitorar; necessidade pode diminuir' },
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: true,
      observacao: 'Compatível; ajustar dose conforme necessidade',
    },
    orientacoesPaciente: [
      'Concentração 3x maior que Lantus; 1 unidade de Toujeo = 1 unidade de insulina',
      'NÃO converter doses multiplicando por 3 - usar mesma dose em unidades',
      'Aplicar SC 1x/dia, mesmo horário',
      'Menor volume injetado que U100 para mesma dose',
      'Armazenar refrigerado; após aberto até 56 dias temperatura ambiente',
    ],
    doencasRelacionadas: ['diabetes-mellitus-1', 'diabetes-mellitus-2'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['insulina', 'glargina', 'U300', 'concentrada', 'Toujeo', 'basal'],
  },

  {
    id: 'insulina-icodec',
    nomeGenerico: 'Insulina icodec',
    nomesComerciais: ['Awiqli'],
    atcCode: 'A10AE07',
    rxNormCui: '2812500',
    drugBankId: 'DB16770',
    snomedCT: '1268892005',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'insulina_ultralonga',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '700U/ml (caneta FlexTouch 1,5ml)', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '700U/ml (caneta FlexTouch 3ml)', disponivelSUS: false },
    ],
    indicacoes: [
      'DM1 e DM2 em adultos',
      'Primeira insulina basal de aplicação semanal',
      'Ideal para pacientes com baixa adesão a injeções diárias',
    ],
    mecanismoAcao: 'Análogo de insulina de ação ultralonga com meia-vida de ~1 semana. Modificações na molécula permitem ligação reversível à albumina, criando um reservatório circulante. Estudos ONWARDS demonstraram não inferioridade vs glargina U100, com controle glicêmico similar e conveniência de aplicação semanal.',
    posologias: [
      {
        indicacao: 'DM2 insulina-naive',
        adultos: {
          dose: '70U SC 1x/semana',
          frequencia: '1x/semana, mesmo dia',
          observacoes: 'Titular 20U/semana a cada 4 semanas conforme GJ média (alvo 80-130mg/dL)',
        },
      },
      {
        indicacao: 'Transição de insulina basal diária',
        adultos: {
          dose: 'Dose semanal = dose diária atual x 7 (primeira semana pode usar loading dose 50% maior)',
          frequencia: '1x/semana',
          observacoes: 'Na primeira semana, pode aplicar dose 1,5x a dose calculada para atingir steady-state mais rápido',
        },
      },
      {
        indicacao: 'DM1',
        adultos: {
          dose: 'Dose semanal = dose basal diária x 7; manter insulina prandial',
          frequencia: '1x/semana',
          observacoes: 'Pode requerer ajuste da insulina prandial; monitorar intensivamente na transição',
        },
      },
    ],
    contraindicacoes: [
      'Hipoglicemia',
      'Hipersensibilidade',
      '<18 anos (dados limitados)',
    ],
    precaucoes: [
      'Meia-vida longa = efeitos de ajuste de dose demoram a estabilizar',
      'Hipoglicemia pode ser prolongada',
      'Não usar em situações que requerem ajustes rápidos (cetoacidose, cirurgias)',
    ],
    efeitosAdversos: {
      comuns: [
        'Hipoglicemia (similar a glargina em estudos)',
        'Reações no local de injeção (2%)',
        'Ganho de peso',
      ],
      graves: [
        'Hipoglicemia grave (pode ser prolongada pela meia-vida longa)',
        'Reações alérgicas',
      ],
    },
    interacoes: [
      {
        medicamento: 'GLP-1 agonistas',
        gravidade: 'leve',
        efeito: 'Redução de necessidade de insulina',
        conduta: 'Monitorar e ajustar dose de icodec',
      },
      {
        medicamento: 'iSGLT2',
        gravidade: 'moderada',
        efeito: 'Risco de cetoacidose',
        conduta: 'Não reduzir insulina excessivamente ao iniciar iSGLT2',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: 'Monitorar; necessidade pode diminuir significativamente' },
    ],
    gestacao: 'N',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes; preferir insulinas de ação mais curta com mais dados',
    },
    consideracoesEspeciais: {
      idosos: 'Cautela; efeitos demoram a reverter se hipoglicemia',
      hepatopatas: 'Monitorar; necessidade pode variar',
    },
    monitorizacao: [
      'Glicemia de jejum diária durante titulação',
      'HbA1c a cada 3 meses',
      'Ajustes de dose têm efeito pleno após 3-4 semanas',
    ],
    orientacoesPaciente: [
      'Primeira insulina de aplicação SEMANAL',
      'Aplicar no mesmo dia da semana, qualquer hora',
      'Se esquecer, aplicar assim que lembrar se <3 dias; se >3 dias, pular e aplicar na próxima data',
      'Efeitos de mudança de dose demoram 3-4 semanas para estabilizar',
      'Se hipoglicemia persistente, procurar atendimento (efeito prolongado)',
      'Armazenar refrigerado; após aberto até 12 semanas',
    ],
    doencasRelacionadas: ['diabetes-mellitus-1', 'diabetes-mellitus-2'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['insulina', 'icodec', 'semanal', 'Awiqli', 'ONWARDS', 'ultralonga', 'inovação'],
  },

  // =============================================================================
  // INIBIDORES DPP-4 ADICIONAIS
  // =============================================================================
  {
    id: 'linagliptina-completo',
    nomeGenerico: 'Linagliptina',
    nomesComerciais: ['Trayenta', 'Trajenta'],
    atcCode: 'A10BH05',
    rxNormCui: '1100699',
    drugBankId: 'DB08882',
    snomedCT: '703127001',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'idpp4',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
    ],
    indicacoes: [
      'DM2 como adjuvante a dieta e exercício',
      'Pode ser usado em monoterapia ou associação',
      'ÚNICO iDPP4 que não requer ajuste renal (excreção biliar)',
      'Ideal para pacientes com DRC',
    ],
    mecanismoAcao: 'Inibidor seletivo e reversível da DPP-4, aumentando níveis de incretinas ativas (GLP-1, GIP). Exclusivamente excretado por via biliar (85%), sem necessidade de ajuste renal. Estudo CARMELINA: segurança CV e renal neutra.',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: {
          dose: '5mg 1x/dia',
          frequencia: '1x/dia, com ou sem alimentos',
          doseMaxima: '5mg/dia',
          observacoes: 'Mesma dose para TODOS os estágios de DRC, incluindo diálise',
        },
        idosos: {
          dose: '5mg 1x/dia',
          observacoes: 'Sem ajuste; experiência ampla em idosos',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade à linagliptina',
      'História de pancreatite',
    ],
    precaucoes: [
      'Pancreatite',
      'Penfigoide bolhoso',
      'Artralgia intensa',
      'IC (cautela; classe tem dado misto)',
    ],
    efeitosAdversos: {
      comuns: [
        'Nasofaringite (7%)',
        'Hipoglicemia quando com sulfoniluréia/insulina (8-23%)',
        'Tosse (2%)',
      ],
      graves: [
        'Pancreatite aguda',
        'Reações de hipersensibilidade (angioedema, urticária, broncoespasmo)',
        'Penfigoide bolhoso',
        'Artralgia grave',
      ],
    },
    interacoes: [
      {
        medicamento: 'Rifampicina',
        gravidade: 'moderada',
        efeito: 'Reduz níveis de linagliptina em ~40%',
        conduta: 'Eficácia pode ser reduzida; considerar alternativa ou monitorar',
      },
      {
        medicamento: 'Sulfoniluréias/Insulina',
        gravidade: 'moderada',
        efeito: 'Hipoglicemia',
        conduta: 'Considerar reduzir dose do secretagogo',
      },
      {
        medicamento: 'Inibidores P-gp potentes (ritonavir)',
        gravidade: 'leve',
        efeito: 'Aumento modesto dos níveis',
        conduta: 'Não requer ajuste; monitorar',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: 'Sem ajuste' },
      { tfg: '30-60', ajuste: 'Sem ajuste' },
      { tfg: '15-30', ajuste: 'Sem ajuste' },
      { tfg: '<15', ajuste: 'Sem ajuste (inclusive em diálise)' },
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: false,
      observacao: 'Dados limitados; preferir outras opções',
    },
    consideracoesEspeciais: {
      idosos: 'Sem ajuste; bem tolerado',
      hepatopatas: 'Sem ajuste em hepatopatia leve-moderada; cautela em grave',
    },
    monitorizacao: [
      'HbA1c a cada 3 meses',
      'Sintomas de pancreatite',
      'Lesões de pele (penfigoide)',
    ],
    orientacoesPaciente: [
      'Único antidiabético oral desta classe que não precisa ajuste para rim',
      'Tomar 1x/dia, qualquer horário, com ou sem comida',
      'Se esquecer, tomar assim que lembrar (se não próximo da próxima dose)',
      'Informar médico se dor abdominal intensa ou lesões de pele',
    ],
    doencasRelacionadas: ['diabetes-mellitus-2', 'drc'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['linagliptina', 'DPP4', 'iDPP4', 'Trayenta', 'DRC', 'sem ajuste renal', 'CARMELINA'],
  },
];
