/**
 * HEPATOLOGIA NOVOS - DARWIN-MFC EXPANSAO 1000
 * =============================================
 * Medicamentos hepatologicos: acidos biliares, vasoativos, tratamento EH, hipertensao portal
 *
 * Referencias:
 * - POISE trials (OCA)
 * - MAESTRO-NASH (Elafibranor)
 * - ENHANCE trials (Seladelpar)
 * - CONFIRM trial (Terlipressin)
 * - ANSWER trial (Albumin + Terlipressin)
 * - Rifaximin meta-analyses (EH)
 * - Lactulose guidelines (AASLD/EASL)
 * - LOLA clinical trials
 * - Beta-blocker guidelines (Baveno VII)
 * - Midodrine trials (HRS)
 */

import { Medicamento } from '@/lib/types/medicamento';

export const hepatologiaNovos: Partial<Medicamento>[] = [
  // =============================================================================
  // ACIDOS BILIARES / MODIFICADORES METABOLICOS
  // =============================================================================
  {
    id: 'ursodeoxycholic-acid-hepato',
    nomeGenerico: 'Acido Ursodesoxicolico (UDCA)',
    nomesComerciais: ['Ursacol', 'Ursofalk', 'Actigall', 'Urso'],
    atcCode: 'A05AA02',
    rxNormCui: '11095',
    drugBankId: 'DB01586',
    snomedCT: '387092000',
    casNumber: '128-13-2',
    classeTerapeutica: 'hepatobiliar',
    subclasse: 'acido_biliar',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '150mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '300mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: false },
      { forma: 'suspensao_oral', concentracao: '50mg/mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Colangite biliar primaria (CBP) - primeira linha',
      'Colangite esclerosante primaria (PSC) - controverso',
      'Dissolucao de calculos biliares de colesterol',
      'Colestase intra-hepatica da gravidez',
      'Fibrose cistica com envolvimento hepatico',
      'Colestase induzida por medicamentos',
      'Atresia biliar (pos-Kasai)',
    ],
    mecanismoAcao: 'Acido biliar hidrofilico que substitui acidos biliares toxicos no pool entero-hepatico. Estabiliza membranas de hepatocitos, aumenta secrecao biliar de bicarbonato, possui efeitos imunomoduladores e citoprotetores. Na CBP, retarda progressao da doenca e melhora sobrevida livre de transplante.',
    posologias: [
      {
        indicacao: 'Colangite biliar primaria',
        adultos: {
          dose: '13-15mg/kg/dia',
          frequencia: 'Em 2-4 tomadas com alimentos',
          observacoes: 'Tratamento cronico indefinido. Resposta bioquimica em 12 meses prediz prognostico.',
        },
      },
      {
        indicacao: 'Dissolucao de calculos',
        adultos: {
          dose: '8-10mg/kg/dia',
          frequencia: 'Em 2-3 doses com alimentos',
          observacoes: 'Calculos radiotransparentes <15-20mm. Tratamento 6-24 meses.',
        },
      },
      {
        indicacao: 'Colestase da gravidez',
        adultos: {
          dose: '10-15mg/kg/dia',
          frequencia: 'Em doses divididas',
          observacoes: 'Ate o parto. Monitorar acidos biliares sericos.',
        },
      },
    ],
    contraindicacoes: [
      'Calculos calcificados ou radiopcos',
      'Obstrucao biliar completa',
      'Colecistite aguda ou colangite',
      'Vesicula nao funcionante',
    ],
    precaucoes: [
      'Diarreia dose-dependente',
      'Monitorar enzimas hepaticas',
      'Cirrose descompensada: cautela',
    ],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Nausea', 'Dor abdominal', 'Prurido transitorio'],
      graves: ['Calcificacao de calculos', 'Descompensacao em cirrose avancada'],
    },
    interacoes: [
      {
        medicamento: 'Colestiramina, colestipol',
        gravidade: 'moderada',
        efeito: 'Reducao da absorcao de UDCA',
        conduta: 'Separar administracao em 2-4 horas',
      },
      {
        medicamento: 'Antiacidos com aluminio',
        gravidade: 'moderada',
        efeito: 'Reducao da absorcao',
        conduta: 'Separar administracao',
      },
      {
        medicamento: 'Ciclosporina',
        gravidade: 'moderada',
        efeito: 'Pode aumentar absorcao de ciclosporina',
        conduta: 'Monitorar niveis de ciclosporina',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario (excrecao biliar)' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Quantidades minimas no leite; seguro' },
    monitorizacao: [
      'FA, GGT, bilirrubinas a cada 3-6 meses',
      'Ultrassom de vesicula (dissolucao de calculos)',
      'Resposta bioquimica em 12 meses na CBP',
    ],
    orientacoesPaciente: [
      'Tomar com alimentos',
      'Tratamento prolongado para CBP',
      'Prurido pode piorar inicialmente',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico',
      hepatopatas: 'Cirrose Child-Pugh C: beneficio incerto',
      pediatrico: 'Usado em atresia biliar e fibrose cistica',
    },
    doencasRelacionadas: ['colangite-biliar-primaria', 'colelitiase', 'colestase-gravidez'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['UDCA', 'ursodesoxicolico', 'CBP', 'colestase', 'acido-biliar', 'hepatoprotetor'],
  },

  {
    id: 'obeticholic-acid',
    nomeGenerico: 'Acido Obeticolico',
    nomesComerciais: ['Ocaliva'],
    atcCode: 'A05AA04',
    rxNormCui: '1721081',
    drugBankId: 'DB09040',
    snomedCT: '718852000',
    casNumber: '459789-99-2',
    classeTerapeutica: 'hepatobiliar',
    subclasse: 'acido_biliar',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Colangite biliar primaria (CBP) - resposta inadequada ou intolerancia a UDCA',
      'Combinacao com UDCA na CBP',
      'NASH com fibrose avancada (indicacao removida pela FDA em 2023)',
    ],
    mecanismoAcao: 'Agonista seletivo do receptor nuclear farnesoide X (FXR). Regula homeostase de acidos biliares, reduz sintese hepatica, aumenta excrecao intestinal. Efeitos anti-inflamatorios e antifibroticos. Na CBP, reduz FA e pode retardar progressao histologica. Aprovacao acelerada; monitoramento de seguranca em andamento.',
    posologias: [
      {
        indicacao: 'CBP (resposta inadequada a UDCA)',
        adultos: {
          dose: 'Iniciar 5mg 1x/dia',
          frequencia: '1x/dia',
          doseMaxima: '10mg/dia',
          observacoes: 'Apos 3 meses, se FA/bilirrubina nao normalizarem e tolerancia OK, aumentar para 10mg.',
        },
      },
      {
        indicacao: 'CBP com Child-Pugh B/C ou evento de descompensacao',
        adultos: {
          dose: '5mg 1x/semana',
          frequencia: 'Semanal',
          doseMaxima: '10mg 2x/semana (maximo)',
          observacoes: 'Ajuste obrigatorio em cirrose. Aumentar com intervalo de 3 meses.',
        },
      },
    ],
    contraindicacoes: [
      'Obstrucao biliar completa',
      'Cirrose descompensada (uso nao recomendado em Child-Pugh B/C sem ajuste)',
      'Hipersensibilidade ao obeticholic acid',
    ],
    precaucoes: [
      'PRURIDO INTENSO - efeito adverso principal e dose-limitante',
      'Risco de descompensacao hepatica em cirrose',
      'Monitoramento hepatico rigoroso',
      'Reavaliacao periodica do beneficio-risco',
    ],
    efeitosAdversos: {
      comuns: ['Prurido (70%)', 'Fadiga', 'Dor abdominal', 'Artralgia', 'Diarreia'],
      graves: ['Descompensacao hepatica', 'Prurido incapacitante', 'Piora da funcao hepatica'],
    },
    interacoes: [
      {
        medicamento: 'Varfarina',
        gravidade: 'moderada',
        efeito: 'Pode reduzir INR',
        conduta: 'Monitorar INR ao iniciar/ajustar OCA',
      },
      {
        medicamento: 'Sequestrantes de acidos biliares (colestiramina)',
        gravidade: 'moderada',
        efeito: 'Reducao da absorcao de OCA',
        conduta: 'Administrar OCA pelo menos 4h antes ou 4h apos',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes; evitar' },
    monitorizacao: [
      'FA, bilirrubinas, albumina, INR mensalmente nos primeiros 3 meses',
      'Funcao hepatica a cada 1-3 meses',
      'Sinais de descompensacao (ascite, EH, varizes)',
      'Intensidade do prurido',
    ],
    orientacoesPaciente: [
      'Prurido e muito comum - informar medico se intenso',
      'NAO usar sem acompanhamento medico rigoroso',
      'Tomar com ou sem alimentos',
      'Nao interromper abruptamente sem orientacao',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico; monitorar funcao hepatica',
      hepatopatas: 'Child-Pugh B/C: dose semanal obrigatoria; risco aumentado de descompensacao',
    },
    doencasRelacionadas: ['colangite-biliar-primaria', 'nash', 'fibrose-hepatica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['obeticholic-acid', 'OCA', 'FXR', 'CBP', 'POISE', 'Ocaliva', 'colestase'],
  },

  {
    id: 'elafibranor',
    nomeGenerico: 'Elafibranor',
    nomesComerciais: ['Iqirvo'],
    atcCode: 'A05AX05',
    rxNormCui: '2648501',
    drugBankId: 'DB12153',
    snomedCT: '1231046000',
    casNumber: '923978-27-2',
    classeTerapeutica: 'hepatobiliar',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '80mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Colangite biliar primaria (CBP) - em combinacao com UDCA ou monoterapia se intolerancia a UDCA',
      'Resposta inadequada a UDCA',
    ],
    mecanismoAcao: 'Agonista duplo PPAR alfa/delta. Ativa receptores nucleares envolvidos no metabolismo lipidico, inflamacao e fibrose. Melhora homeostase de acidos biliares, reduz inflamacao hepatica e tem efeitos antifibroticos. Aprovado em 2024 para CBP com base nos resultados do ELATIVE trial.',
    posologias: [
      {
        indicacao: 'Colangite biliar primaria',
        adultos: {
          dose: '80mg',
          frequencia: '1x/dia',
          observacoes: 'Pode ser usado com ou sem UDCA. Tomar com alimentos.',
        },
      },
    ],
    contraindicacoes: [
      'Cirrose descompensada (Child-Pugh B ou C)',
      'Hipersensibilidade ao elafibranor',
    ],
    precaucoes: [
      'Monitorar funcao hepatica',
      'Aumento de creatinina observado (geralmente estavel)',
      'Mialgia (menos frequente que com fibratos)',
    ],
    efeitosAdversos: {
      comuns: ['Dor abdominal', 'Diarreia', 'Nausea', 'Aumento de creatinina'],
      graves: ['Hepatotoxicidade', 'Miopatia'],
    },
    interacoes: [
      {
        medicamento: 'Estatinas',
        gravidade: 'moderada',
        efeito: 'Pode aumentar niveis de estatinas',
        conduta: 'Monitorar sintomas de miopatia; considerar reducao da estatina',
      },
      {
        medicamento: 'Substratos de OATP1B1/OATP1B3',
        gravidade: 'moderada',
        efeito: 'Elafibranor inibe esses transportadores',
        conduta: 'Monitorar drogas transportadas (estatinas, repaglinida)',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Dados limitados; usar com cautela' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Nao recomendado' },
    monitorizacao: [
      'FA, GGT, bilirrubinas',
      'Creatinina',
      'Funcao hepatica periodicamente',
      'Sintomas de miopatia',
    ],
    orientacoesPaciente: [
      'Tomar com alimentos',
      'Informar medico sobre dor muscular',
      'Acompanhamento regular necessario',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico',
      hepatopatas: 'Cirrose compensada: usar com cautela; descompensada: contraindicado',
    },
    doencasRelacionadas: ['colangite-biliar-primaria'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['elafibranor', 'PPAR', 'CBP', 'ELATIVE', 'Iqirvo', 'colestase'],
  },

  {
    id: 'seladelpar',
    nomeGenerico: 'Seladelpar',
    nomesComerciais: ['Livdelzi'],
    atcCode: 'A05AX06',
    rxNormCui: '2652001',
    drugBankId: 'DB15084',
    snomedCT: '1231098000',
    casNumber: '223257-75-4',
    classeTerapeutica: 'hepatobiliar',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '5mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '10mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Colangite biliar primaria (CBP) - resposta inadequada ou intolerancia a UDCA',
      'Monoterapia ou em combinacao com UDCA',
    ],
    mecanismoAcao: 'Agonista potente e seletivo do receptor PPAR-delta. Regula metabolismo de acidos biliares, inflamacao e fibrose. Demonstrou reducao de FA e melhora do prurido no ENHANCE trial. Perfil de seguranca favoravel com menor incidencia de prurido que OCA.',
    posologias: [
      {
        indicacao: 'Colangite biliar primaria',
        adultos: {
          dose: '10mg',
          frequencia: '1x/dia',
          observacoes: 'Pode ser com ou sem alimentos. Manter UDCA se tolerado.',
        },
      },
    ],
    contraindicacoes: [
      'Cirrose descompensada (Child-Pugh B ou C)',
      'Hipersensibilidade ao seladelpar',
    ],
    precaucoes: [
      'Monitorar funcao hepatica',
      'Dados limitados em cirrose compensada',
    ],
    efeitosAdversos: {
      comuns: ['Dor abdominal', 'Nausea', 'Cefaleia', 'Prurido (menos que OCA)'],
      graves: ['Hepatotoxicidade'],
    },
    interacoes: [
      {
        medicamento: 'Sequestrantes de acidos biliares',
        gravidade: 'moderada',
        efeito: 'Podem reduzir absorcao',
        conduta: 'Administrar com intervalo de pelo menos 4 horas',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Dados limitados' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'FA, GGT, bilirrubinas',
      'TGO, TGP',
      'Prurido',
    ],
    orientacoesPaciente: [
      'Pode tomar com ou sem alimentos',
      'Menos prurido que alternativas',
      'Acompanhamento medico regular',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico',
      hepatopatas: 'Cirrose compensada: usar com cautela',
    },
    doencasRelacionadas: ['colangite-biliar-primaria'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['seladelpar', 'PPAR-delta', 'CBP', 'ENHANCE', 'Livdelzi', 'colestase'],
  },

  // =============================================================================
  // VASOATIVOS / TRATAMENTO DE HIPERTENSAO PORTAL
  // =============================================================================
  {
    id: 'terlipressin',
    nomeGenerico: 'Terlipressina',
    nomesComerciais: ['Glypressin', 'Terlivaz'],
    atcCode: 'H01BA04',
    rxNormCui: '2537753',
    drugBankId: 'DB06770',
    snomedCT: '420003007',
    casNumber: '14636-12-5',
    classeTerapeutica: 'hormonio',
    subclasse: 'vasopressor',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '0,5mg', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '1mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Sindrome hepatorrenal tipo 1 (HRS-AKI) - em combinacao com albumina',
      'Sangramento varicoso agudo (off-label em alguns paises)',
      'Sangramento gastrointestinal relacionado a hipertensao portal',
    ],
    mecanismoAcao: 'Pro-droga da lisina-vasopressina. Agonista dos receptores V1 da vasopressina, causando vasoconstrição esplancnica seletiva. Reduz fluxo sanguineo portal, diminui pressao portal e melhora perfusao renal na sindrome hepatorrenal. Meia-vida mais longa que vasopressina permite doses intermitentes.',
    posologias: [
      {
        indicacao: 'Sindrome hepatorrenal (HRS-AKI)',
        adultos: {
          dose: '0,5-1mg IV a cada 4-6h OU infusao continua 2mg/24h',
          frequencia: 'A cada 4-6h ou infusao continua',
          doseMaxima: '12mg/dia (bolus) ou 8mg/dia (infusao)',
          observacoes: 'SEMPRE com albumina (1g/kg no D1, depois 20-40g/dia). Ajustar dose conforme resposta de creatinina. Pode aumentar para 2mg a cada 4h se sem resposta em 3 dias.',
        },
      },
      {
        indicacao: 'Sangramento varicoso agudo',
        adultos: {
          dose: '2mg IV bolus, seguido de 1-2mg a cada 4-6h',
          frequencia: 'Por 2-5 dias',
          observacoes: 'Em combinacao com tratamento endoscopico.',
        },
      },
    ],
    contraindicacoes: [
      'Doenca cardiaca isquemica grave ou instavel',
      'Arritmias graves',
      'Doenca vascular periferica grave',
      'Hipertensao nao controlada',
      'Gestacao (exceto sangramento com risco de vida)',
    ],
    precaucoes: [
      'MONITORAMENTO INTENSIVO obrigatorio',
      'Isquemia (cardiaca, mesenterica, periferica, cutanea)',
      'Hiponatremia grave',
      'Sobrecarga de volume com albumina',
      'Insuficiencia respiratoria em pacientes com ascite tensa',
    ],
    efeitosAdversos: {
      comuns: ['Dor abdominal', 'Diarreia', 'Nausea', 'Bradicardia', 'Palidez', 'Cefaleia'],
      graves: ['Isquemia cardiaca', 'Isquemia mesenterica', 'Necrose cutanea', 'Arritmias', 'Edema pulmonar', 'Hiponatremia grave'],
    },
    interacoes: [
      {
        medicamento: 'Betabloqueadores',
        gravidade: 'moderada',
        efeito: 'Bradicardia aditiva',
        conduta: 'Monitorar frequencia cardiaca',
      },
      {
        medicamento: 'Drogas que prolongam QT',
        gravidade: 'grave',
        efeito: 'Risco de arritmias',
        conduta: 'Evitar ou monitorar ECG rigorosamente',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'E o tratamento da sindrome hepatorrenal - usado independente da TFG' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar; dados insuficientes' },
    monitorizacao: [
      'Creatinina diariamente',
      'Sodio serico (risco de hiponatremia)',
      'ECG (arritmias, isquemia)',
      'Sinais de isquemia periferica (extremidades)',
      'Saturacao de oxigenio',
      'Balanco hidrico',
    ],
    orientacoesPaciente: [
      'Tratamento intensivo hospitalar',
      'Informar dor no peito, abdominal intensa, ou alteracao de cor dos dedos',
      'Monitoramento continuo necessario',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de eventos isquemicos; uso com extrema cautela',
      hepatopatas: 'Indicado especificamente para complicacoes da cirrose',
    },
    doencasRelacionadas: ['sindrome-hepatorrenal', 'hipertensao-portal', 'varizes-esofagicas'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['terlipressina', 'vasopressina', 'HRS', 'hepatorrenal', 'varizes', 'CONFIRM', 'hipertensao-portal'],
  },

  // =============================================================================
  // TRATAMENTO DE ENCEFALOPATIA HEPATICA
  // =============================================================================
  {
    id: 'rifaximin-hepato',
    nomeGenerico: 'Rifaximina',
    nomesComerciais: ['Xifaxan', 'Flonorm'],
    atcCode: 'A07AA11',
    rxNormCui: '337540',
    drugBankId: 'DB01220',
    snomedCT: '420756003',
    casNumber: '80621-81-4',
    classeTerapeutica: 'antibiotico',
    subclasse: 'rifamicina',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '550mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Encefalopatia hepatica (EH) - prevencao de recorrencia',
      'Encefalopatia hepatica - tratamento agudo (em combinacao com lactulose)',
      'Reducao de episodios de EH em pacientes com historico',
    ],
    mecanismoAcao: 'Derivado da rifamicina com absorcao intestinal minima (<0,4%). Inibe RNA polimerase bacteriana. Reduz producao de amonia por bacterias intestinais produtoras de urease. Modula microbiota sem erradicacao significativa. Sinergismo com lactulose: lactulose acidifica o colon e rifaximina reduz bacterias.',
    posologias: [
      {
        indicacao: 'Prevencao de recorrencia de EH',
        adultos: {
          dose: '550mg',
          frequencia: '2x/dia',
          observacoes: 'Uso cronico. SEMPRE em combinacao com lactulose. Reduz recorrencia em ~58% (estudo pivotal).',
        },
      },
      {
        indicacao: 'EH aguda (adjuvante)',
        adultos: {
          dose: '400mg',
          frequencia: '3x/dia',
          observacoes: 'Em combinacao com lactulose. Pode acelerar resolucao.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a rifaximina ou rifamicinas',
    ],
    precaucoes: [
      'Hepatopatia grave (Child-Pugh C): exposicao sistemica aumentada, mas indicacao principal requer uso',
      'Superinfeccao por C. difficile (raro)',
    ],
    efeitosAdversos: {
      comuns: ['Edema periferico', 'Nausea', 'Fadiga', 'Ascite', 'Cefaleia'],
      graves: ['C. difficile (raro)', 'Angioedema (muito raro)'],
    },
    interacoes: [
      {
        medicamento: 'Ciclosporina, outros substratos de P-gp',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de rifaximina',
        conduta: 'Geralmente sem ajuste necessario; monitorar',
      },
      {
        medicamento: 'Varfarina',
        gravidade: 'leve',
        efeito: 'Efeito sistemico minimo, mas monitorar',
        conduta: 'Monitorar INR',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste (absorcao sistemica minima)' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorcao minima; provavelmente seguro' },
    monitorizacao: [
      'Frequencia e gravidade de episodios de EH',
      'Escala de West Haven',
      'Amonia (valor limitado)',
      'Funcao hepatica',
    ],
    orientacoesPaciente: [
      'Uso CONTINUO para prevencao',
      'NAO suspender sem orientacao medica',
      'Manter lactulose conforme prescrito',
      'Pode tomar com ou sem alimentos',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico',
      hepatopatas: 'Child-Pugh C: exposicao aumentada, mas indicado para EH',
    },
    doencasRelacionadas: ['encefalopatia-hepatica', 'cirrose'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['rifaximina', 'encefalopatia-hepatica', 'EH', 'cirrose', 'amonia', 'microbiota'],
  },

  {
    id: 'lactulose',
    nomeGenerico: 'Lactulose',
    nomesComerciais: ['Lactulona', 'Duphalac', 'Enulose', 'Kristalose'],
    atcCode: 'A06AD11',
    rxNormCui: '6155',
    drugBankId: 'DB00581',
    snomedCT: '387040009',
    casNumber: '4618-18-2',
    classeTerapeutica: 'laxante',
    subclasse: 'osmotico',
    rename: true,
    apresentacoes: [
      { forma: 'solucao_oral', concentracao: '667mg/mL (xarope)', disponivelSUS: true },
      { forma: 'po_oral', concentracao: '10g/sache', disponivelSUS: false },
      { forma: 'solucao_retal', concentracao: '300mL enema', disponivelSUS: false },
    ],
    indicacoes: [
      'Encefalopatia hepatica - tratamento e prevencao (PRIMEIRA LINHA)',
      'Encefalopatia hepatica aguda',
      'Constipacao cronica',
    ],
    mecanismoAcao: 'Dissacarideo sintetico nao absorvido. Fermentado por bacterias colonicas em acidos graxos de cadeia curta, acidificando o conteudo colico. A acidificacao converte amonia (NH3) em amonio (NH4+), que nao e absorvido. Tambem acelera transito intestinal, reduzindo tempo para absorcao de amonia. Efeito osmotico causa laxacao.',
    posologias: [
      {
        indicacao: 'Encefalopatia hepatica - tratamento agudo',
        adultos: {
          dose: '30-45mL (20-30g)',
          frequencia: 'A cada 1-2h ate evacuacao',
          observacoes: 'Objetivo: 2-3 evacuacoes pastosas/dia. Pode usar enema se via oral impossivel (300mL em 700mL de agua, reter por 30-60min).',
        },
      },
      {
        indicacao: 'Encefalopatia hepatica - manutencao',
        adultos: {
          dose: '15-45mL (10-30g)',
          frequencia: '2-4x/dia',
          observacoes: 'Titular para 2-3 evacuacoes pastosas/dia. Ajustar dose individualmente.',
        },
      },
      {
        indicacao: 'Constipacao cronica',
        adultos: {
          dose: '15-30mL',
          frequencia: '1x/dia',
          observacoes: 'Ajustar para evacuacao diaria.',
        },
      },
    ],
    contraindicacoes: [
      'Galactosemia',
      'Obstrucao intestinal',
    ],
    precaucoes: [
      'Disturbios eletroliticos em uso prolongado ou diarreia excessiva',
      'Diabeticos: contem galactose e lactose (pequenas quantidades absorvidas)',
      'Flatulencia e distensao abdominal comuns no inicio',
    ],
    efeitosAdversos: {
      comuns: ['Flatulencia', 'Distensao abdominal', 'Colicas', 'Diarreia', 'Nausea'],
      graves: ['Desidratacao', 'Hipernatremia (em diarreia excessiva)', 'Hipocalemia'],
    },
    interacoes: [
      {
        medicamento: 'Antiacidos (contendo aluminio/magnesio)',
        gravidade: 'leve',
        efeito: 'Podem reduzir acidificacao colica',
        conduta: 'Evitar uso concomitante excessivo',
      },
      {
        medicamento: 'Neomicina (uso concomitante)',
        gravidade: 'leve',
        efeito: 'Pode reduzir eficacia da lactulose por alterar microbiota',
        conduta: 'Monitorar resposta; rifaximina preferida',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste (nao absorvida)' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Seguro; nao absorvida sistemicamente' },
    monitorizacao: [
      'Numero e consistencia das evacuacoes',
      'Estado mental (escala de West Haven)',
      'Eletrolitos (especialmente potassio e sodio) em uso prolongado',
      'Sinais de desidratacao',
    ],
    orientacoesPaciente: [
      'Objetivo: 2-3 evacuacoes PASTOSAS por dia',
      'Diarreia excessiva: reduzir dose',
      'Pode misturar com agua ou suco',
      'Flatulencia melhora com o tempo',
      'NAO suspender sem orientacao medica em EH',
    ],
    consideracoesEspeciais: {
      idosos: 'Monitorar hidratacao e eletrolitos',
      hepatopatas: 'Pilar do tratamento da encefalopatia hepatica',
      pediatrico: 'Pode ser usado; ajustar dose por peso',
    },
    doencasRelacionadas: ['encefalopatia-hepatica', 'cirrose', 'constipacao'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['lactulose', 'encefalopatia-hepatica', 'EH', 'laxante', 'amonia', 'primeira-linha'],
  },

  {
    id: 'l-ornithine-l-aspartate',
    nomeGenerico: 'L-Ornitina L-Aspartato (LOLA)',
    nomesComerciais: ['Hepa-Merz', 'Ornicetil'],
    atcCode: 'A05BA06',
    rxNormCui: '860239',
    drugBankId: 'DB11638',
    snomedCT: '421311003',
    casNumber: '3230-94-2',
    classeTerapeutica: 'hepatobiliar',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'granulado', concentracao: '3g/sache', disponivelSUS: false },
      { forma: 'granulado', concentracao: '5g/sache', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '5g/10mL ampola', disponivelSUS: false },
    ],
    indicacoes: [
      'Encefalopatia hepatica - adjuvante ao tratamento padrao',
      'Hiperamonemia associada a hepatopatia cronica',
      'Encefalopatia hepatica minima',
    ],
    mecanismoAcao: 'Fornece substratos para o ciclo da ureia. L-ornitina e substrato direto da ornitina transcarbamilase no ciclo da ureia hepatica. L-aspartato fornece nitrogenio para sintese de ureia e glutamina. Estimula detoxificacao de amonia em hepatocitos e musculo esqueletico. Evidencia clinica mista; pode ser util como adjuvante.',
    posologias: [
      {
        indicacao: 'Encefalopatia hepatica (oral)',
        adultos: {
          dose: '3-6g',
          frequencia: '3x/dia',
          observacoes: 'Dissolver em agua ou suco. Uso como adjuvante a lactulose.',
        },
      },
      {
        indicacao: 'Encefalopatia hepatica aguda (IV)',
        adultos: {
          dose: '20-40g/dia',
          frequencia: 'Infusao IV lenta (max 5g/h)',
          observacoes: 'Em solucao salina ou glicosada. Velocidade maxima 5g/h para evitar nausea/vomito.',
        },
      },
    ],
    contraindicacoes: [
      'Insuficiencia renal grave (creatinina >3mg/dL)',
      'Hipersensibilidade aos componentes',
    ],
    precaucoes: [
      'Insuficiencia renal: pode acumular',
      'Nausea e vomito se infusao IV muito rapida',
      'Evidencia clinica heterogenea',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Vomito (especialmente IV rapido)', 'Diarreia', 'Dor abdominal'],
      graves: ['Nenhum grave significativo relatado'],
    },
    interacoes: [],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Evitar ou usar com cautela (pode acumular)' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Aminoacidos naturais; provavelmente seguro' },
    monitorizacao: [
      'Estado mental',
      'Amonia serica (valor limitado mas util para tendencia)',
      'Tolerancia gastrointestinal',
    ],
    orientacoesPaciente: [
      'Usar como complemento ao tratamento padrao',
      'Dissolver bem em liquido',
      'Pode ter gosto desagradavel',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico',
      hepatopatas: 'Indicado para complicacoes da cirrose',
    },
    doencasRelacionadas: ['encefalopatia-hepatica', 'cirrose', 'hiperamonemia'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['LOLA', 'ornitina', 'aspartato', 'encefalopatia-hepatica', 'amonia', 'hepatoprotetor'],
  },

  // =============================================================================
  // BETABLOQUEADORES PARA HIPERTENSAO PORTAL
  // =============================================================================
  {
    id: 'carvedilol-portal',
    nomeGenerico: 'Carvedilol',
    nomesComerciais: ['Coreg', 'Divelol', 'Cardilol'],
    atcCode: 'C07AG02',
    rxNormCui: '20352',
    drugBankId: 'DB01136',
    snomedCT: '386870007',
    casNumber: '72956-09-3',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'betabloqueador',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '3,125mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '6,25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '12,5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
    ],
    indicacoes: [
      'Profilaxia primaria de sangramento varicoso',
      'Profilaxia secundaria de sangramento varicoso',
      'Hipertensao portal clinicamente significativa (HPCS)',
      'Reducao de gradiente de pressao portal',
    ],
    mecanismoAcao: 'Bloqueador beta-1 e beta-2 nao seletivo com atividade alfa-1 bloqueadora adicional. A acao alfa-1 causa vasodilatacao arterial esplancnica, reduzindo resistencia intra-hepatica. Efeito sinergico na reducao da pressao portal comparado a betabloqueadores nao seletivos tradicionais. Pode ser superior ao propranolol na reducao de HVPG.',
    posologias: [
      {
        indicacao: 'Profilaxia de sangramento varicoso',
        adultos: {
          dose: 'Iniciar 6,25mg 2x/dia',
          frequencia: '2x/dia',
          doseMaxima: '12,5mg 2x/dia',
          observacoes: 'Titular semanalmente conforme tolerancia. Meta: FC 55-60bpm ou dose maxima tolerada. NAO usar se PAS <90mmHg.',
        },
      },
    ],
    contraindicacoes: [
      'Hipotensao (PAS <90mmHg)',
      'Bradicardia grave (<50bpm)',
      'Ascite refrataria',
      'Peritonite bacteriana espontanea',
      'Lesao renal aguda',
      'Choque cardiogenico',
      'Bloqueio AV de 2-3 grau sem marcapasso',
      'Asma grave',
    ],
    precaucoes: [
      'Titular lentamente',
      'Cirrose descompensada: maior risco de hipotensao',
      'Monitorar PA e FC',
      'Suspender em infeccoes agudas ou sangramento ativo',
    ],
    efeitosAdversos: {
      comuns: ['Tontura', 'Fadiga', 'Bradicardia', 'Hipotensao', 'Diarreia'],
      graves: ['Hipotensao grave', 'Bradicardia sintomatica', 'Broncoespasmo'],
    },
    interacoes: [
      {
        medicamento: 'Verapamil, diltiazem',
        gravidade: 'grave',
        efeito: 'Bradicardia grave e hipotensao',
        conduta: 'Evitar combinacao',
      },
      {
        medicamento: 'Digoxina',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de digoxina',
        conduta: 'Monitorar niveis de digoxina',
      },
      {
        medicamento: 'Insulina, antidiabeticos',
        gravidade: 'moderada',
        efeito: 'Mascara sintomas de hipoglicemia',
        conduta: 'Monitorar glicemia',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste especifico para funcao renal' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar; excretado no leite' },
    monitorizacao: [
      'Frequencia cardiaca (meta 55-60bpm)',
      'Pressao arterial',
      'Sinais de descompensacao hepatica',
      'Tolerancia clinica',
    ],
    orientacoesPaciente: [
      'Tomar com alimentos',
      'NAO parar abruptamente',
      'Levantar devagar para evitar tontura',
      'Informar medico se tontura intensa ou desmaios',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior sensibilidade; iniciar com dose baixa',
      hepatopatas: 'Metabolismo hepatico; usar com cautela em Child-Pugh C',
    },
    doencasRelacionadas: ['hipertensao-portal', 'varizes-esofagicas', 'cirrose'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['carvedilol', 'betabloqueador', 'hipertensao-portal', 'varizes', 'profilaxia', 'NSBB'],
  },

  {
    id: 'propranolol-varizes',
    nomeGenerico: 'Propranolol',
    nomesComerciais: ['Inderal', 'Rebaten'],
    atcCode: 'C07AA05',
    rxNormCui: '8787',
    drugBankId: 'DB00571',
    snomedCT: '372772003',
    casNumber: '525-66-6',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'betabloqueador',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '80mg', disponivelSUS: true },
    ],
    indicacoes: [
      'Profilaxia primaria de sangramento varicoso',
      'Profilaxia secundaria de sangramento varicoso (com ligadura)',
      'Hipertensao portal',
    ],
    mecanismoAcao: 'Betabloqueador nao seletivo (beta-1 e beta-2). Bloqueio beta-1 reduz debito cardiaco, beta-2 causa vasoconstrição esplancnica. Resultado: reducao do fluxo portal e pressao portal. Tratamento classico para profilaxia de sangramento varicoso, com decadas de evidencia.',
    posologias: [
      {
        indicacao: 'Profilaxia de varizes',
        adultos: {
          dose: 'Iniciar 20-40mg 2x/dia',
          frequencia: '2x/dia',
          doseMaxima: '320mg/dia',
          observacoes: 'Titular a cada 2-3 dias. Meta: FC 55-60bpm ou reducao de 25% da basal. Dose maxima tolerada.',
        },
      },
    ],
    contraindicacoes: [
      'Bradicardia sinusal (<50bpm)',
      'Hipotensao (PAS <90mmHg)',
      'Asma bronquica',
      'DPOC grave',
      'Bloqueio AV de 2-3 grau',
      'ICC descompensada',
      'Feocromocitoma nao tratado',
    ],
    precaucoes: [
      'Doenca vascular periferica',
      'Diabetes (mascara hipoglicemia)',
      'Depressao',
      'Cirrose avancada: maior sensibilidade',
    ],
    efeitosAdversos: {
      comuns: ['Fadiga', 'Bradicardia', 'Extremidades frias', 'Hipotensao', 'Disturbios de sono', 'Broncoespasmo leve'],
      graves: ['Broncoespasmo grave', 'Bradicardia sintomatica', 'ICC', 'Hipotensao grave'],
    },
    interacoes: [
      {
        medicamento: 'Verapamil',
        gravidade: 'grave',
        efeito: 'Bradicardia grave, bloqueio AV',
        conduta: 'Evitar combinacao',
      },
      {
        medicamento: 'Clonidina',
        gravidade: 'grave',
        efeito: 'Hipertensao rebote se clonidina suspensa',
        conduta: 'Suspender propranolol dias antes de suspender clonidina',
      },
      {
        medicamento: 'Cimetidina',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de propranolol',
        conduta: 'Monitorar; considerar reducao de dose',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Pequenas quantidades no leite; monitorar bebe' },
    monitorizacao: [
      'Frequencia cardiaca',
      'Pressao arterial',
      'Sintomas de broncoespasmo',
      'Tolerancia geral',
    ],
    orientacoesPaciente: [
      'NAO suspender abruptamente',
      'Informar sintomas de bradicardia ou dispneia',
      'Pode causar extremidades frias',
    ],
    consideracoesEspeciais: {
      idosos: 'Iniciar com dose baixa; maior sensibilidade',
      hepatopatas: 'Metabolismo hepatico aumenta exposicao; titular cuidadosamente',
    },
    doencasRelacionadas: ['hipertensao-portal', 'varizes-esofagicas', 'cirrose'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['propranolol', 'betabloqueador', 'varizes', 'hipertensao-portal', 'NSBB'],
  },

  {
    id: 'nadolol-varizes',
    nomeGenerico: 'Nadolol',
    nomesComerciais: ['Corgard'],
    atcCode: 'C07AA12',
    rxNormCui: '7226',
    drugBankId: 'DB01203',
    snomedCT: '387480006',
    casNumber: '42200-33-9',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'betabloqueador',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '80mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Profilaxia primaria de sangramento varicoso',
      'Profilaxia secundaria de sangramento varicoso',
      'Hipertensao portal',
    ],
    mecanismoAcao: 'Betabloqueador nao seletivo de longa acao. Nao sofre metabolismo de primeira passagem hepatico significativo, conferindo farmacocinetica mais previsivel em cirroticos. Dose unica diaria melhora adesao. Mecanismo similar ao propranolol na reducao de pressao portal.',
    posologias: [
      {
        indicacao: 'Profilaxia de varizes',
        adultos: {
          dose: 'Iniciar 40mg 1x/dia',
          frequencia: '1x/dia',
          doseMaxima: '160mg/dia',
          observacoes: 'Aumentar a cada 3-7 dias. Meta: FC 55-60bpm. Vantagem: dose unica diaria.',
        },
      },
    ],
    contraindicacoes: [
      'Bradicardia (<50bpm)',
      'Hipotensao',
      'Asma ou DPOC grave',
      'Bloqueio AV de 2-3 grau',
      'ICC descompensada',
    ],
    precaucoes: [
      'Insuficiencia renal: ajuste necessario',
      'Diabetes: mascara hipoglicemia',
      'Cirrose avancada',
    ],
    efeitosAdversos: {
      comuns: ['Bradicardia', 'Fadiga', 'Tontura', 'Extremidades frias'],
      graves: ['Broncoespasmo', 'ICC', 'Bradicardia grave'],
    },
    interacoes: [
      {
        medicamento: 'Verapamil, diltiazem',
        gravidade: 'grave',
        efeito: 'Bradicardia, bloqueio AV',
        conduta: 'Evitar',
      },
      {
        medicamento: 'Clonidina',
        gravidade: 'grave',
        efeito: 'Hipertensao rebote',
        conduta: 'Cautela na suspensao',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Sem ajuste' },
      { tfg: '30-50', ajuste: 'Intervalo a cada 24-36h' },
      { tfg: '10-30', ajuste: 'Intervalo a cada 24-48h' },
      { tfg: '<10', ajuste: 'Intervalo a cada 40-60h' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Pequenas quantidades; monitorar bebe' },
    monitorizacao: [
      'Frequencia cardiaca',
      'Pressao arterial',
      'Funcao renal',
    ],
    orientacoesPaciente: [
      'Dose unica diaria',
      'NAO suspender abruptamente',
      'Informar tontura ou bradicardia',
    ],
    consideracoesEspeciais: {
      idosos: 'Ajustar para funcao renal',
      hepatopatas: 'Farmacocinetica mais previsivel que propranolol em cirroticos',
    },
    doencasRelacionadas: ['hipertensao-portal', 'varizes-esofagicas', 'cirrose'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['nadolol', 'betabloqueador', 'varizes', 'hipertensao-portal', 'NSBB', 'longa-acao'],
  },

  // =============================================================================
  // TRATAMENTO DA SINDROME HEPATORRENAL
  // =============================================================================
  {
    id: 'midodrine-hrs',
    nomeGenerico: 'Midodrina',
    nomesComerciais: ['ProAmatine', 'Gutron'],
    atcCode: 'C01CA17',
    rxNormCui: '6922',
    drugBankId: 'DB00211',
    snomedCT: '372504006',
    casNumber: '42794-76-3',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'vasopressor',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2,5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Sindrome hepatorrenal (HRS) - em combinacao com octreotide e albumina',
      'Alternativa oral quando terlipressina nao disponivel',
      'Hipotensao ortostatica na cirrose',
    ],
    mecanismoAcao: 'Pro-droga do desglimidodrina, agonista alfa-1 adrenergico. Causa vasoconstrição arterial e venosa. Na sindrome hepatorrenal, contrabalanca a vasodilatacao esplancnica, melhorando perfusao renal. Usado em combinacao com octreotide (reduz fluxo esplancnico) e albumina (expansao de volume efetivo).',
    posologias: [
      {
        indicacao: 'Sindrome hepatorrenal (tripla terapia)',
        adultos: {
          dose: '7,5-12,5mg',
          frequencia: '3x/dia (oral)',
          doseMaxima: '15mg 3x/dia',
          observacoes: 'SEMPRE com octreotide 100-200mcg SC 3x/dia + albumina 20-40g/dia. Iniciar 7,5mg 3x/dia, aumentar a cada 48h conforme tolerancia e resposta.',
        },
      },
    ],
    contraindicacoes: [
      'Hipertensao grave',
      'Doenca cardiaca grave',
      'Retencao urinaria',
      'Feocromocitoma',
      'Tireotoxicose',
    ],
    precaucoes: [
      'Monitorar PA (risco de hipertensao supina)',
      'Nao usar a noite (hipertensao ao deitar)',
      'Bradicardia reflexa',
    ],
    efeitosAdversos: {
      comuns: ['Piloereccao', 'Prurido no couro cabeludo', 'Parestesias', 'Retencao urinaria', 'Hipertensao supina'],
      graves: ['Hipertensao grave', 'Bradicardia', 'Isquemia'],
    },
    interacoes: [
      {
        medicamento: 'Alfa-bloqueadores',
        gravidade: 'moderada',
        efeito: 'Antagonismo do efeito',
        conduta: 'Evitar combinacao',
      },
      {
        medicamento: 'Betabloqueadores',
        gravidade: 'moderada',
        efeito: 'Bradicardia aditiva',
        conduta: 'Pode ser necessario suspender NSBB durante tratamento de HRS',
      },
      {
        medicamento: 'Digoxina',
        gravidade: 'moderada',
        efeito: 'Bradicardia aditiva',
        conduta: 'Monitorar FC',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'E usado para tratar complicacao da cirrose - ajustar conforme resposta' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Pressao arterial (incluindo supina)',
      'Creatinina diariamente',
      'Debito urinario',
      'Frequencia cardiaca',
    ],
    orientacoesPaciente: [
      'Tomar 3x/dia durante o dia, NAO a noite',
      'Deitar com cabeceira elevada',
      'Informar dor de cabeca intensa (hipertensao)',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior sensibilidade; iniciar com dose baixa',
      hepatopatas: 'Indicado para HRS; metabolismo hepatico pode estar alterado',
    },
    doencasRelacionadas: ['sindrome-hepatorrenal', 'cirrose', 'hipotensao'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['midodrina', 'vasopressor', 'HRS', 'hepatorrenal', 'alfa-agonista', 'tripla-terapia'],
  },
];
