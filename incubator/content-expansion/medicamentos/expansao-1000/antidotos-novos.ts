/**
 * ANTIDOTOS E QUELANTES - DARWIN-MFC EXPANSAO 1000
 * ================================================
 * Antidotos e agentes de reversao com abordagem ontology-first
 *
 * Ontologias incluidas:
 * - ATC (Anatomical Therapeutic Chemical) - OMS
 * - RxNorm CUI - NIH
 * - DrugBank ID
 * - SNOMED-CT
 *
 * Referencias:
 * - UpToDate Drug Information
 * - Micromedex
 * - EXTRIP Workgroup Recommendations
 * - Poison Control Guidelines
 */

import { Medicamento } from '@/lib/types/medicamento';

export const antidotosNovos: Partial<Medicamento>[] = [
  // =============================================================================
  // ACETILCISTEINA - ANTIDOTO PARACETAMOL
  // =============================================================================
  {
    id: 'acetilcisteina-antidoto',
    nomeGenerico: 'Acetilcisteina',
    nomesComerciais: ['Fluimucil', 'Acetadote', 'NAC'],
    atcCode: 'V03AB23',
    rxNormCui: '161',
    drugBankId: 'DB06151',
    snomedCT: '387440002',
    casNumber: '616-91-1',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '200mg/mL (30mL)', disponivelSUS: true },
      { forma: 'granulado', concentracao: '200mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '40mg/mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Intoxicacao por paracetamol (acetaminofeno)',
      'Hepatotoxicidade por paracetamol',
      'Mucolitico (uso alternativo)',
    ],
    mecanismoAcao: 'Precursor de glutationa. Restaura os estoques hepaticos de glutationa depletados pelo metabolito toxico do paracetamol (NAPQI). Tambem pode atuar diretamente como substrato para conjugacao do NAPQI.',
    posologias: [
      {
        indicacao: 'Intoxicacao por paracetamol (protocolo IV 21h)',
        adultos: {
          dose: '150mg/kg em 200mL SG5% em 1h, depois 50mg/kg em 500mL SG5% em 4h, depois 100mg/kg em 1000mL SG5% em 16h',
          frequencia: 'Protocolo 21h (Prescott modificado)',
          observacoes: 'Iniciar ate 8h da ingestao para maxima eficacia. Eficaz ate 24h. Estender se ALT elevada.',
        },
        pediatrico: {
          dose: 'Mesmas doses por kg; ajustar volume de diluicao conforme peso',
          frequencia: 'Protocolo 21h',
          observacoes: 'Peso <40kg: reduzir volume de diluicao proporcionalmente',
        },
      },
      {
        indicacao: 'Intoxicacao por paracetamol (protocolo oral 72h)',
        adultos: {
          dose: '140mg/kg VO (ataque), depois 70mg/kg 4/4h (17 doses)',
          frequencia: 'Total 72h',
          observacoes: 'Usar se IV indisponivel. Nausea comum - antiemetico antes.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade conhecida (anafilaxia previa)',
    ],
    precaucoes: [
      'Reacoes anafilactoides em 10-20% (flush, broncoespasmo)',
      'Se reacao: pausar infusao, tratar, reiniciar em velocidade menor',
      'Asmaticos tem maior risco de broncoespasmo',
      'Nao atrasar tratamento aguardando nivel de paracetamol',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Vomito', 'Flush', 'Prurido', 'Rash'],
      graves: ['Reacao anafilactoide', 'Broncoespasmo grave', 'Angioedema'],
    },
    interacoes: [
      {
        medicamento: 'Carvao ativado',
        gravidade: 'moderada',
        efeito: 'Adsorve NAC oral',
        mecanismo: 'Adsorcao fisica',
        conduta: 'Se carvao necessario, usar NAC IV ou dar NAC 2h apos carvao',
      },
      {
        medicamento: 'Nitroglicerina',
        gravidade: 'moderada',
        efeito: 'Potencializacao de hipotensao e cefaleia',
        conduta: 'Monitorar PA',
      },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Seguro; tratamento essencial' },
    monitorizacao: [
      'Transaminases (ALT, AST)',
      'INR',
      'Creatinina',
      'Nivel de paracetamol (se disponivel)',
      'Sinais de reacao anafilactoide',
    ],
    orientacoesPaciente: [
      'Tratamento essencial para prevenir insuficiencia hepatica',
      'Reacoes leves sao comuns e manejáveis',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste necessario',
      hepatopatas: 'Indicado justamente para hepatotoxicidade',
      pediatrico: 'Ajustar volume de diluicao',
    },
    doencasRelacionadas: ['intoxicacao-paracetamol', 'hepatotoxicidade', 'insuficiencia-hepatica-aguda'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['acetilcisteina', 'NAC', 'antidoto', 'paracetamol', 'acetaminofeno', 'hepatotoxicidade'],
  },

  // =============================================================================
  // FOMEPIZOL - ANTIDOTO METANOL/ETILENOGLICOL
  // =============================================================================
  {
    id: 'fomepizol-antidoto',
    nomeGenerico: 'Fomepizol',
    nomesComerciais: ['Antizol', 'Fomepizole'],
    atcCode: 'V03AB34',
    rxNormCui: '42355',
    drugBankId: 'DB01213',
    snomedCT: '391734009',
    casNumber: '7554-65-6',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '1g/mL (1,5mL)', disponivelSUS: false },
    ],
    indicacoes: [
      'Intoxicacao por metanol',
      'Intoxicacao por etilenoglicol',
      'Intoxicacao por dietilenoglicol',
      'Prevencao de nefrotoxicidade em intoxicacoes por alcool toxico',
    ],
    mecanismoAcao: 'Inibidor competitivo da alcool desidrogenase (ADH). Impede a conversao de metanol em acido formico e de etilenoglicol em acido glicolico/oxalico, prevenindo toxicidade sistemica.',
    posologias: [
      {
        indicacao: 'Intoxicacao por metanol ou etilenoglicol',
        adultos: {
          dose: '15mg/kg IV (ataque), depois 10mg/kg 12/12h (4 doses), depois 15mg/kg 12/12h ate nivel indetectavel',
          frequencia: 'Infundir em 30 minutos',
          observacoes: 'Se em hemodialise: aumentar frequencia para 4/4h. Continuar ate nivel de alcool toxico <20mg/dL.',
        },
        pediatrico: {
          dose: 'Mesmas doses por kg que adultos',
          frequencia: 'Mesma',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade conhecida',
      'Hipersensibilidade a pirazois',
    ],
    precaucoes: [
      'Ajustar dose durante hemodialise (clearance aumentado)',
      'Pode causar reacoes no local de infusao',
      'Preferido sobre etanol por perfil mais seguro',
      'Alto custo - etanol e alternativa se indisponivel',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Nausea', 'Tontura', 'Reacao no local de infusao'],
      graves: ['Bradicardia', 'Hipotensao', 'Convulsoes (raro)', 'Reacao anafilatica (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Etanol',
        gravidade: 'leve',
        efeito: 'Mesma via de metabolismo - ambos inibem ADH',
        conduta: 'Nao usar concomitantemente',
      },
      {
        medicamento: 'Fenitoina',
        gravidade: 'moderada',
        efeito: 'Fomepizol induz CYP2C9 apos doses multiplas',
        conduta: 'Monitorar niveis de fenitoina',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: 'Hemodialise indicada para remocao do alcool toxico; ajustar frequencia de fomepizol' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes; evitar se possivel' },
    monitorizacao: [
      'Nivel de metanol/etilenoglicol',
      'Gasometria arterial (gap anionico, pH)',
      'Osmolaridade serica (gap osmolar)',
      'Funcao renal',
      'Eletrolitos',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico',
      hepatopatas: 'Cautela; monitorar funcao hepatica',
    },
    doencasRelacionadas: ['intoxicacao-metanol', 'intoxicacao-etilenoglicol', 'acidose-metabolica-grave'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['fomepizol', 'antidoto', 'metanol', 'etilenoglicol', 'alcool-toxico', 'ADH'],
  },

  // =============================================================================
  // PRALIDOXIMA - ANTIDOTO ORGANOFOSFORADOS
  // =============================================================================
  {
    id: 'pralidoxima-antidoto',
    nomeGenerico: 'Pralidoxima (Cloreto)',
    nomesComerciais: ['Contrathion', 'Protopam', '2-PAM'],
    atcCode: 'V03AB04',
    rxNormCui: '8540',
    drugBankId: 'DB00733',
    snomedCT: '373779001',
    casNumber: '51-15-0',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: true,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '200mg (frasco)', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '50mg/mL (20mL)', disponivelSUS: false },
    ],
    indicacoes: [
      'Intoxicacao por organofosforados',
      'Intoxicacao por carbamatos (controverso)',
      'Intoxicacao por agentes nervosos (sarin, soman, VX)',
    ],
    mecanismoAcao: 'Reativador da acetilcolinesterase. Liga-se ao organofosforado e libera a enzima antes do "envelhecimento" (aging). A reativacao restaura a capacidade de hidrolisar acetilcolina. Eficacia depende do tempo desde exposicao.',
    posologias: [
      {
        indicacao: 'Intoxicacao por organofosforado',
        adultos: {
          dose: '1-2g IV em 15-30 minutos (ataque), seguido de 500mg/h em infusao continua OU 1g 4/4h',
          frequencia: 'Continuar por 24-48h ou ate melhora clinica',
          observacoes: 'Iniciar JUNTO com atropina. Mais eficaz se iniciado nas primeiras 24-48h. Apos "envelhecimento" da enzima, eficacia reduzida.',
        },
        pediatrico: {
          dose: '25-50mg/kg IV (max 1g ataque), seguido de 10-20mg/kg/h',
          frequencia: 'Infusao continua',
        },
      },
    ],
    contraindicacoes: [
      'Intoxicacao por carbamatos (relativa - controverso)',
      'Hipersensibilidade',
    ],
    precaucoes: [
      'SEMPRE usar junto com atropina (atropina primeiro)',
      'Infusao rapida pode causar rigidez muscular e parada respiratoria',
      'Eficacia variavel dependendo do organofosforado',
      'Pode piorar intoxicacao por carbaril',
      'Iniciar precocemente - "aging" torna enzima irrecuperavel',
    ],
    efeitosAdversos: {
      comuns: ['Tontura', 'Diplopia', 'Cefaleia', 'Nausea', 'Taquicardia'],
      graves: ['Rigidez muscular', 'Laringoespasmo', 'Parada respiratoria (infusao rapida)', 'Hipertensao'],
    },
    interacoes: [
      {
        medicamento: 'Atropina',
        gravidade: 'leve',
        efeito: 'Sinergismo terapeutico',
        conduta: 'Uso obrigatorio em conjunto',
      },
      {
        medicamento: 'Succinilcolina',
        gravidade: 'moderada',
        efeito: 'Bloqueio prolongado (colinesterase inibida)',
        conduta: 'Evitar succinilcolina em intoxicados',
      },
      {
        medicamento: 'Aminofilina/Teofilina',
        gravidade: 'moderada',
        efeito: 'Reducao da eficacia da pralidoxima',
        conduta: 'Evitar se possivel',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '<50', ajuste: 'Reduzir dose em 50%' },
      { tfg: '<10', ajuste: 'Reduzir dose em 75%; considerar dialise do toxico' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso de emergencia justificado' },
    monitorizacao: [
      'Atividade de colinesterase plasmatica/eritrocitaria',
      'Sinais colinergicos (SLUDGE/DUMBELS)',
      'Forca muscular',
      'Frequencia cardiaca',
      'Funcao respiratoria',
    ],
    orientacoesPaciente: [
      'Tratamento de emergencia para intoxicacao grave',
      'Seguimento prolongado necessario',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de efeitos adversos cardiovasculares',
      pediatrico: 'Doses por peso; mesma urgencia que adultos',
    },
    doencasRelacionadas: ['intoxicacao-organofosforado', 'intoxicacao-inseticida', 'sindrome-colinergica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['pralidoxima', '2-PAM', 'antidoto', 'organofosforado', 'colinesterase', 'inseticida'],
  },

  // =============================================================================
  // HIDROXOCOBALAMINA - ANTIDOTO CIANETO
  // =============================================================================
  {
    id: 'hidroxocobalamina-antidoto',
    nomeGenerico: 'Hidroxocobalamina',
    nomesComerciais: ['Cyanokit', 'Hidroxocobalamina'],
    atcCode: 'V03AB33',
    rxNormCui: '5475',
    drugBankId: 'DB00200',
    snomedCT: '387186001',
    casNumber: '13422-51-0',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '5g (frasco)', disponivelSUS: false },
    ],
    indicacoes: [
      'Intoxicacao por cianeto confirmada ou suspeita',
      'Inalacao de fumaca em incendios (suspeita de cianeto)',
      'Exposicao ocupacional a cianeto',
    ],
    mecanismoAcao: 'Quelante de cianeto. O cobalto da hidroxocobalamina liga-se ao cianeto formando cianocobalamina (vitamina B12), que e atoxica e excretada pelos rins. Nao interfere no transporte de oxigenio.',
    posologias: [
      {
        indicacao: 'Intoxicacao por cianeto',
        adultos: {
          dose: '5g IV em 15 minutos',
          frequencia: 'Segunda dose de 5g pode ser dada se resposta insuficiente',
          doseMaxima: '10g total',
          observacoes: 'Nao atrasar tratamento para confirmacao laboratorial. Compativel com oxigenoterapia e ressuscitacao.',
        },
        pediatrico: {
          dose: '70mg/kg IV (max 5g)',
          frequencia: 'Segunda dose se necessario',
        },
      },
    ],
    contraindicacoes: [
      'Nenhuma contraindicacao absoluta em emergencia',
      'Hipersensibilidade conhecida a hidroxocobalamina ou cobalaminas',
    ],
    precaucoes: [
      'Causa coloracao vermelha da pele, mucosas e urina (ate 2 semanas)',
      'Interfere em exames laboratoriais colorimetricos',
      'Pode causar hipertensao transitoria',
      'Evitar tiossulfato na mesma via (precipitacao)',
    ],
    efeitosAdversos: {
      comuns: ['Cromaturia (urina vermelha)', 'Eritema cutaneo', 'Cefaleia', 'Nausea', 'Hipertensao transitoria'],
      graves: ['Reacao alergica', 'Edema pulmonar (raro)', 'Hipertensao grave (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Tiossulfato de sodio',
        gravidade: 'moderada',
        efeito: 'Precipitacao se na mesma via',
        conduta: 'Usar vias IV separadas',
      },
      {
        medicamento: 'Nitrito de sodio',
        gravidade: 'leve',
        efeito: 'Pode ser usado em sequencia se necessario',
        conduta: 'Hidroxocobalamina e preferida por nao formar metahemoglobina',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso de emergencia essencial' },
    monitorizacao: [
      'Nivel de lactato (marcador indireto)',
      'Gasometria (acidose)',
      'Pressao arterial',
      'Nivel de cianeto (se disponivel, nao aguardar)',
      'ECG',
    ],
    orientacoesPaciente: [
      'Coloracao vermelha da pele e urina e esperada e temporaria',
      'Seguimento necessario para avaliar sequelas',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste; eficacia mantida',
      pediatrico: 'Dose por peso; urgencia em inalacao de fumaca',
    },
    doencasRelacionadas: ['intoxicacao-cianeto', 'inalacao-fumaca', 'queimaduras'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['hidroxocobalamina', 'cyanokit', 'antidoto', 'cianeto', 'fumaca', 'incendio'],
  },

  // =============================================================================
  // DEFERIPRONE - QUELANTE DE FERRO
  // =============================================================================
  {
    id: 'deferiprone-quelante',
    nomeGenerico: 'Deferiprone',
    nomesComerciais: ['Ferriprox', 'Kelfer'],
    atcCode: 'V03AC02',
    rxNormCui: '72666',
    drugBankId: 'DB08826',
    snomedCT: '395903004',
    casNumber: '30652-11-0',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: false },
      { forma: 'solucao_oral', concentracao: '100mg/mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Sobrecarga de ferro transfusional (talassemia major)',
      'Sobrecarga de ferro em sindromes mielodisplasicas',
      'Quelacao de ferro quando deferoxamina contraindicada ou inadequada',
      'Sobrecarga de ferro cardiaca (penetra bem no miocardio)',
    ],
    mecanismoAcao: 'Quelante oral de ferro. Liga-se ao ferro ferrico (Fe3+) formando complexo 3:1 neutro e estavel, excretado na urina. Boa penetracao no miocardio, eficaz para sideroses cardiaca.',
    posologias: [
      {
        indicacao: 'Sobrecarga de ferro transfusional',
        adultos: {
          dose: '25mg/kg VO 3x/dia (75mg/kg/dia)',
          frequencia: '8/8h com alimentacao',
          doseMaxima: '100mg/kg/dia',
          observacoes: 'Titular conforme ferritina serica. Associar a deferoxamina para quelacao intensificada se necessario.',
        },
        pediatrico: {
          dose: '25mg/kg 3x/dia',
          frequencia: '8/8h',
          idadeMinima: '6 anos',
          doseMaxima: '100mg/kg/dia',
        },
      },
    ],
    contraindicacoes: [
      'Neutropenia (<1500 neutrofilos/mm3)',
      'Historia de agranulocitose',
      'Hipersensibilidade',
      'Gestacao (teratogenico)',
    ],
    precaucoes: [
      'RISCO DE AGRANULOCITOSE - monitorar hemograma semanal',
      'Suspender se neutrofilos <1500',
      'Sintomas de infeccao requerem hemograma urgente',
      'Hepatotoxicidade - monitorar ALT',
      'Artropatia pode ocorrer',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Vomito', 'Dor abdominal', 'Artralgia', 'Cromaturia (urina marrom-avermelhada)'],
      graves: ['Agranulocitose', 'Neutropenia', 'Hepatotoxicidade', 'Fibrose hepatica'],
    },
    interacoes: [
      {
        medicamento: 'Antiácidos com aluminio',
        gravidade: 'moderada',
        efeito: 'Reducao da absorcao de deferiprone',
        conduta: 'Separar administracao em 4h',
      },
      {
        medicamento: 'Suplementos de ferro',
        gravidade: 'leve',
        efeito: 'Quelacao do ferro oral',
        conduta: 'Nao faz sentido usar juntos',
      },
      {
        medicamento: 'Vitamina C',
        gravidade: 'moderada',
        efeito: 'Pode aumentar quelacao mas tambem toxicidade',
        conduta: 'Usar com cautela; doses baixas de vitamina C',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: 'Dados limitados; usar com cautela' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado; potencial toxicidade' },
    monitorizacao: [
      'Hemograma semanal (neutrofilos)',
      'Ferritina serica mensal',
      'ALT/AST mensal',
      'Ferro serico',
      'Ressonancia cardiaca T2* (se disponivel)',
    ],
    orientacoesPaciente: [
      'Tomar com alimentacao para reduzir nausea',
      'Urina pode ficar marrom-avermelhada (normal)',
      'Relatar imediatamente febre, dor de garganta ou sinais de infeccao',
      'Nao engravidar durante tratamento',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior vigilancia hematologica',
      pediatrico: 'Aprovado >6 anos; crescimento deve ser monitorado',
    },
    doencasRelacionadas: ['talassemia', 'sobrecarga-ferro', 'hemocromatose-secundaria', 'sindrome-mielodisplasica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['deferiprone', 'quelante', 'ferro', 'talassemia', 'siderose', 'agranulocitose'],
  },
];
