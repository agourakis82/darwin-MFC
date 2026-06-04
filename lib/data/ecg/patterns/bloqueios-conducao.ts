/**
 * BLOQUEIOS DE CONDUCAO - ECG PATTERNS MODULE - DARWIN-MFC
 * =========================================================
 *
 * Padroes eletrocardiograficos de disturbios de conducao cardiaca
 * incluindo bloqueios AV e bloqueios de ramo.
 * Dados com rigor academico Q1 (Nature/Cell level)
 *
 * Referencias principais:
 * - 2018 ACC/AHA/HRS Bradycardia and Cardiac Conduction Delay Guidelines
 * - ESC Guidelines on Cardiac Pacing and Cardiac Resynchronization Therapy
 * - Braunwald's Heart Disease
 * - Goldberger's Clinical Electrocardiography
 *
 * @module lib/data/ecg/patterns/bloqueios-conducao
 * @version 1.0.0
 * @lastUpdate 2026-01
 */

import type { Citation } from '../../../types/references';

// =============================================================================
// TIPOS E INTERFACES
// =============================================================================

/**
 * Nivel de urgencia para padroes ECG de conducao
 * 1 = Emergencia (risco imediato de vida)
 * 2 = Urgente (necessita avaliacao em horas)
 * 3 = Alerta (necessita avaliacao em dias)
 * 4 = Rotina (avaliacao eletiva)
 */
export type NivelUrgencia = 1 | 2 | 3 | 4;

/**
 * Categoria do bloqueio de conducao
 */
export type CategoriaBloqueio =
  | 'bloqueio_av'           // Bloqueios atrioventriculares
  | 'bloqueio_ramo'         // Bloqueios de ramo
  | 'bloqueio_fascicular'   // Bloqueios fasciculares (hemibloqueios)
  | 'bloqueio_combinado';   // Bloqueios combinados (bifascicular, trifascicular)

/**
 * Caracteristicas ECG especificas para bloqueios de conducao
 */
export interface CaracteristicasBloqueioECG {
  frequencia: string;
  ritmo: string;
  ondaP: string;
  intervaloPR: string;
  complexoQRS: string;
  eixoQRS?: string;
  outrasCaracteristicas?: string[];
}

/**
 * Fator de risco associado ao bloqueio
 */
export interface FatorRisco {
  fator: string;
  mecanismo?: string;
  reversivel: boolean;
}

/**
 * Interface principal para padroes de bloqueio de conducao
 */
export interface ECGPattern {
  /** Identificador unico */
  id: string;

  /** Nome em portugues */
  nome: string;

  /** Nome em ingles */
  nomeEN: string;

  /** Sigla comum */
  sigla?: string;

  /** Codigo CID-11 */
  cid11?: string;

  /** Categoria do bloqueio */
  categoria: 'bloqueio_conducao';

  /** Subcategoria especifica */
  subcategoria: CategoriaBloqueio;

  /** Descricao detalhada */
  descricao: string;

  /** Criterios diagnosticos ECG */
  criteriosECG: string[];

  /** Caracteristicas eletrocardiograficas */
  caracteristicas: CaracteristicasBloqueioECG;

  /** Causas e fatores de risco */
  causas: string[];

  /** Fatores de risco detalhados */
  fatoresRisco?: FatorRisco[];

  /** Significado clinico */
  significadoClinico: string;

  /** Nivel de urgencia (1-4) */
  urgencia: NivelUrgencia;

  /** Descricao da urgencia */
  urgenciaDescricao: string;

  /** Conduta geral */
  conduta: string;

  /** Tratamento agudo - passos */
  tratamentoAgudo: string[];

  /** Criterios para encaminhamento */
  criteriosEncaminhamento: string[];

  /** Red flags - sinais de alarme */
  redFlags: string[];

  /** Dicas para nao-especialistas */
  dicasParaNaoEspecialista: string[];

  /** Diagnosticos diferenciais */
  diagnosticoDiferencial?: string[];

  /** Prognostico */
  prognostico?: string;

  /** Indicacao de marcapasso */
  indicacaoMarcapasso?: {
    indicado: boolean;
    classe?: 'I' | 'IIa' | 'IIb' | 'III';
    detalhes: string;
  };

  /** Tags para busca */
  tags?: string[];

  /** Citacoes academicas */
  citations: Citation[];
}

// =============================================================================
// DADOS: BLOQUEIOS DE CONDUCAO
// =============================================================================

export const bloqueiosConducao: ECGPattern[] = [
  // ============================================================================
  // 1. BLOQUEIO AV DE 1o GRAU
  // ============================================================================
  {
    id: 'bav-1-grau',
    nome: 'Bloqueio Atrioventricular de 1o Grau',
    nomeEN: 'First-Degree Atrioventricular Block',
    sigla: 'BAV 1o',
    cid11: 'BC81.0',
    categoria: 'bloqueio_conducao',
    subcategoria: 'bloqueio_av',
    descricao: 'Atraso na conducao do impulso eletrico do atrio para o ventriculo atraves do no AV, resultando em prolongamento do intervalo PR alem de 200 ms. Todos os impulsos atriais sao conduzidos aos ventriculos, porem com atraso. E o bloqueio AV mais comum e frequentemente benigno, mas pode progredir para bloqueios de maior grau em determinadas condicoes.',

    criteriosECG: [
      'Intervalo PR prolongado > 200 ms (> 0,20 segundos)',
      'Intervalo PR constante batimento a batimento',
      'Cada onda P e seguida de um complexo QRS (relacao P:QRS = 1:1)',
      'Ritmo sinusal mantido',
      'Complexo QRS geralmente normal (< 120 ms), a menos que haja bloqueio de ramo associado',
      'O prolongamento do PR pode ser sutil (200-300 ms) ou acentuado (> 300 ms)',
      'Intervalo PR pode chegar a 400-500 ms em casos extremos, com possivel sobreposicao de P na onda T anterior'
    ],

    caracteristicas: {
      frequencia: 'Normal (60-100 bpm), determinada pelo no sinusal',
      ritmo: 'Regular, sinusal',
      ondaP: 'Normal em morfologia, presente antes de cada QRS',
      intervaloPR: '> 200 ms, constante; pode variar de 200 ms a > 400 ms',
      complexoQRS: 'Geralmente estreito (< 120 ms); pode ser largo se bloqueio de ramo associado',
      eixoQRS: 'Normal (-30 a +90 graus), a menos que haja hemibloqueio',
      outrasCaracteristicas: [
        'PR muito prolongado pode causar sintomas por perda da sincronia AV',
        'PR > 300 ms pode resultar em "pseudo-sindrome do marcapasso"',
        'Pode coexistir com outros disturbios de conducao'
      ]
    },

    causas: [
      'Tono vagal aumentado (atletas, jovens saudaveis) - causa mais comum em jovens',
      'Medicamentos: betabloqueadores, bloqueadores de canais de calcio, digoxina, amiodarona',
      'Doenca degenerativa do sistema de conducao (Lenegre-Lev)',
      'Cardiopatia isquemica (especialmente IAM inferior)',
      'Miocardite e cardiomiopatias',
      'Febre reumatica aguda',
      'Doenca de Chagas',
      'Cardiopatias congenitas (comunicacao interatrial, anomalia de Ebstein)',
      'Doencas infiltrativas (sarcoidose, amiloidose)',
      'Hipercalemia',
      'Pos-cirurgia cardiaca ou ablacao',
      'Doenca de Lyme (borreliose)',
      'Hipotireoidismo'
    ],

    fatoresRisco: [
      { fator: 'Uso de betabloqueadores', mecanismo: 'Reducao da conducao nodal AV', reversivel: true },
      { fator: 'Uso de digoxina', mecanismo: 'Aumento do tono vagal e efeito direto no no AV', reversivel: true },
      { fator: 'Idade avancada', mecanismo: 'Fibrose e degeneracao do sistema de conducao', reversivel: false },
      { fator: 'Cardiopatia estrutural', mecanismo: 'Lesao do sistema de conducao', reversivel: false }
    ],

    significadoClinico: 'Frequentemente benigno e assintomatico, especialmente em jovens e atletas. Pode ser achado incidental em ECG de rotina. Em idosos ou pacientes com cardiopatia, pode representar doenca do sistema de conducao com potencial de progressao. PR muito prolongado (> 300 ms) pode causar sintomas semelhantes a sindrome do marcapasso (fadiga, dispneia) por perda da sincronia AV otima.',

    urgencia: 4,
    urgenciaDescricao: 'Rotina - avaliacao eletiva, exceto se sintomatico ou associado a outras anormalidades',

    conduta: 'Geralmente nao requer tratamento. Avaliar e tratar causas reversiveis (ajustar medicamentos, corrigir disturbios eletroliticos). Monitorar periodicamente para progressao. Investigar cardiomiopatia se PR muito prolongado ou sintomatico.',

    tratamentoAgudo: [
      '1. Na maioria dos casos, nenhum tratamento agudo e necessario',
      '2. Revisar lista de medicamentos e suspender/reduzir farmacos que prolongam conducao AV se possivel',
      '3. Corrigir disturbios eletroliticos (K+, Mg2+, Ca2+)',
      '4. Se bradicardia sintomatica associada: Atropina 0,5-1 mg IV',
      '5. Se PR extremamente prolongado (> 400 ms) com sintomas: avaliar marcapasso provisorio',
      '6. Investigar causa de base: ecocardiograma, enzimas cardiacas se suspeita de isquemia',
      '7. Em contexto de IAM inferior: monitorar evolucao para BAV de maior grau',
      '8. Holter 24h se sintomas intermitentes'
    ],

    criteriosEncaminhamento: [
      'BAV 1o grau sintomatico (fadiga, dispneia de esforco, tontura)',
      'PR extremamente prolongado (> 300 ms)',
      'Progressao documentada para BAV de maior grau',
      'Associacao com bloqueio de ramo (bloqueio bifascicular ou trifascicular)',
      'Presenca de cardiopatia estrutural subjacente',
      'BAV 1o grau novo em paciente com doenca de Lyme',
      'Sincope de causa indeterminada',
      'Necessidade de medicamentos que prolongam PR em paciente ja com BAV 1o'
    ],

    redFlags: [
      'Progressao para BAV de 2o ou 3o grau durante observacao',
      'Sincope ou pre-sincope',
      'BAV 1o + bloqueio de ramo = bloqueio bifascicular ou trifascicular',
      'PR progressivamente mais longo em ECGs seriados',
      'BAV 1o no contexto de IAM - pode evoluir rapidamente',
      'Sintomas de baixo debito (fadiga, dispneia) com PR muito prolongado',
      'Bradicardia sintomatica associada',
      'QRS largo associado (> 120 ms)'
    ],

    dicasParaNaoEspecialista: [
      'BAV 1o grau isolado em jovem saudavel e assintomatico geralmente e benigno - tranquilize o paciente',
      'Sempre meca o PR com cuidado: normal e 120-200 ms; > 200 ms e prolongado',
      'Revise os medicamentos do paciente - muitos prolongam o PR',
      'PR > 300 ms merece investigacao mesmo que assintomatico',
      'Se BAV 1o + QRS largo, encaminhe para cardiologista - pode ser trifascicular',
      'Em atletas, BAV 1o isolado e variante normal por tono vagal elevado',
      'No IAM inferior, BAV 1o pode progredir - monitore de perto',
      'Nao confunda onda U com onda P - pode parecer PR prolongado falsamente'
    ],

    diagnosticoDiferencial: [
      'Ritmo juncional com conducao retrograda (P apos QRS)',
      'Ritmo atrial ectopico baixo (P de morfologia diferente)',
      'Onda U proeminente confundida com P',
      'Bloqueio de ramo isolado (QRS largo, mas PR normal)'
    ],

    prognostico: 'Excelente quando isolado e assintomatico. Pacientes com BAV 1o isolado tem prognostico similar a populacao geral. Risco de progressao para BAV de maior grau e baixo (< 2% ao ano), mas aumenta se PR muito prolongado, QRS largo associado, ou cardiopatia subjacente.',

    indicacaoMarcapasso: {
      indicado: false,
      classe: 'III',
      detalhes: 'Marcapasso NAO e indicado para BAV 1o grau assintomatico. Em casos raros de BAV 1o grau com PR extremamente prolongado (> 300-400 ms) causando sintomas tipo sindrome do marcapasso documentados, pode-se considerar marcapasso (Classe IIa).'
    },

    tags: ['bloqueio', 'AV', 'conducao', 'PR prolongado', 'benigno'],

    citations: [
      {
        refId: 'kusumoto-bradycardia-2019',
        authors: ['Kusumoto FM', 'Schoenfeld MH', 'Barrett C', 'et al.'],
        title: '2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia and Cardiac Conduction Delay',
        journal: 'Circulation',
        year: 2019,
        volume: '140',
        pages: 'e506-e522',
        doi: '10.1161/CIR.0000000000000628',
        pmid: '30586772'
      },
      {
        refId: 'esc-pacing-2021',
        authors: ['Glikson M', 'Nielsen JC', 'Kronborg MB', 'et al.'],
        title: '2021 ESC Guidelines on cardiac pacing and cardiac resynchronization therapy',
        journal: 'European Heart Journal',
        year: 2021,
        volume: '42',
        pages: '3427-3520',
        doi: '10.1093/eurheartj/ehab364',
        pmid: '34455430'
      },
      {
        refId: 'cheng-bav1-2009',
        authors: ['Cheng S', 'Keyes MJ', 'Larson MG', 'et al.'],
        title: 'Long-term Outcomes in Individuals With Prolonged PR Interval or First-Degree Atrioventricular Block',
        journal: 'JAMA',
        year: 2009,
        volume: '301',
        pages: '2571-2577',
        doi: '10.1001/jama.2009.888',
        pmid: '19549974'
      }
    ]
  },

  // ============================================================================
  // 2. BLOQUEIO AV DE 2o GRAU MOBITZ I (WENCKEBACH)
  // ============================================================================
  {
    id: 'bav-2-grau-mobitz-i',
    nome: 'Bloqueio Atrioventricular de 2o Grau Mobitz I (Wenckebach)',
    nomeEN: 'Second-Degree Atrioventricular Block Mobitz Type I (Wenckebach)',
    sigla: 'BAV 2o Mobitz I',
    cid11: 'BC81.1',
    categoria: 'bloqueio_conducao',
    subcategoria: 'bloqueio_av',
    descricao: 'Bloqueio AV caracterizado por prolongamento progressivo do intervalo PR ate que uma onda P nao seja conduzida (batimento bloqueado). O padrao se repete ciclicamente. O bloqueio geralmente ocorre ao nivel do no AV (suprahissiano), resultando em prognostico mais favoravel. E o tipo mais comum de BAV 2o grau e frequentemente e benigno, especialmente em jovens.',

    criteriosECG: [
      'Prolongamento progressivo do intervalo PR a cada batimento ate que uma onda P seja bloqueada',
      'Maior incremento do PR ocorre entre o 1o e 2o batimento do ciclo',
      'Intervalo R-R progressivamente mais curto ate a pausa',
      'Pausa apos o batimento bloqueado e menor que o dobro do menor intervalo R-R',
      'Complexo QRS geralmente estreito (< 120 ms) - indica bloqueio nodal AV',
      'A pausa permite "recuperacao" do no AV, reiniciando o ciclo com PR mais curto',
      'Padrao de agrupamento (group beating) e caracteristico'
    ],

    caracteristicas: {
      frequencia: 'Variavel; frequencia ventricular menor que atrial devido aos batimentos bloqueados',
      ritmo: 'Regularmente irregular (padrao ciclico de Wenckebach)',
      ondaP: 'Normal em morfologia; algumas ondas P nao sao seguidas de QRS (bloqueadas)',
      intervaloPR: 'Progressivamente mais longo ate o batimento bloqueado; reinicia mais curto apos a pausa',
      complexoQRS: 'Geralmente estreito (< 120 ms); QRS largo sugere bloqueio infranodal e pior prognostico',
      eixoQRS: 'Normal, a menos que haja bloqueio de ramo associado',
      outrasCaracteristicas: [
        'Razao de conducao AV tipica: 3:2, 4:3, 5:4, etc.',
        'O incremento do PR diminui a cada batimento (maior entre 1o e 2o)',
        'Encurtamento progressivo do R-R e patognomonico',
        'Padrao de "group beating" (batimentos agrupados)'
      ]
    },

    causas: [
      'Tono vagal aumentado (atletas, sono, estimulacao vagal) - causa mais comum em jovens',
      'Medicamentos: betabloqueadores, bloqueadores de canal de calcio, digoxina, amiodarona',
      'Infarto agudo do miocardio inferior (arteria coronaria direita irriga no AV)',
      'Miocardite aguda',
      'Pos-cirurgia cardiaca (especialmente valvar)',
      'Doenca degenerativa do sistema de conducao (idosos)',
      'Febre reumatica',
      'Doenca de Lyme (borreliose)',
      'Hipercalemia',
      'Cardiopatias congenitas',
      'Endocardite infecciosa (abscesso anelar)',
      'Variante normal em jovens durante o sono'
    ],

    fatoresRisco: [
      { fator: 'Idade avancada', mecanismo: 'Degeneracao do sistema de conducao', reversivel: false },
      { fator: 'Uso de medicamentos cronototropicos negativos', mecanismo: 'Depressao da conducao nodal', reversivel: true },
      { fator: 'IAM inferior', mecanismo: 'Isquemia do no AV (irrigado pela ACD)', reversivel: true },
      { fator: 'Tono vagal elevado', mecanismo: 'Efeito parassimpatico no no AV', reversivel: true }
    ],

    significadoClinico: 'Geralmente benigno quando ocorre ao nivel do no AV (QRS estreito). Comum em atletas durante repouso ou sono como variante fisiologica. No contexto de IAM inferior, geralmente e transitorio e autolimitado. QRS largo sugere bloqueio infranodal com maior risco de progressao. Raramente causa sintomas significativos devido a bradicardia leve.',

    urgencia: 3,
    urgenciaDescricao: 'Alerta - necessita avaliacao em dias; monitorar para progressao; urgente se sintomatico ou no contexto de IAM',

    conduta: 'Geralmente observacao e monitoramento. Revisar e ajustar medicamentos. No IAM inferior, monitorar evolucao - maioria resolve espontaneamente. Marcapasso provisorio raramente necessario. Investigar causa de base.',

    tratamentoAgudo: [
      '1. Na maioria dos casos, apenas observacao',
      '2. Monitoracao cardiaca continua se contexto de IAM ou sintomas',
      '3. Revisar medicamentos e suspender/ajustar farmacos que deprimem conducao AV',
      '4. Se bradicardia sintomatica: Atropina 0,5-1 mg IV (eficaz pois bloqueio e nodal)',
      '5. Se refratario a atropina: Isoproterenol IV ou marcapasso transcutaneo',
      '6. No IAM inferior: maioria resolve em 48-72h; marcapasso provisorio se sintomatico',
      '7. Corrigir disturbios eletroliticos (K+, Mg2+)',
      '8. Evitar manobras que aumentem tono vagal',
      '9. Se QRS largo: tratar como Mobitz II (maior risco de progressao)'
    ],

    criteriosEncaminhamento: [
      'BAV Mobitz I sintomatico (sincope, pre-sincope, fadiga significativa)',
      'QRS largo associado (sugere bloqueio infranodal)',
      'Nao resolucao apos ajuste de medicamentos',
      'Progressao para BAV de maior grau',
      'Bradicardia sintomatica recorrente',
      'Necessidade de medicamentos que deprimem conducao AV',
      'Associacao com bloqueio de ramo ou hemibloqueio',
      'Avaliacao para marcapasso definitivo se sintomatico recorrente'
    ],

    redFlags: [
      'Progressao para BAV 2o grau Mobitz II ou BAV completo',
      'QRS largo (> 120 ms) - sugere bloqueio infranodal com maior risco',
      'Sincope ou pre-sincope',
      'Pausas prolongadas (> 3 segundos)',
      'Sintomas de baixo debito cardiaco',
      'Mobitz I no contexto de IAM anterior (pior prognostico que IAM inferior)',
      'Frequencia ventricular < 40 bpm',
      'Instabilidade hemodinamica'
    ],

    dicasParaNaoEspecialista: [
      'Mobitz I = PR progressivamente mais longo ate "pular" um batimento, depois reinicia',
      'Procure o padrao de "agrupamento" de batimentos - e caracteristico',
      'Em atletas jovens durante repouso, Mobitz I pode ser normal',
      'Atropina FUNCIONA no Mobitz I porque o bloqueio e no no AV',
      'QRS estreito = bloqueio no no AV = prognostico bom',
      'QRS largo = bloqueio abaixo do no AV = tratar como Mobitz II',
      'No IAM inferior, espere resolucao espontanea em 48-72h na maioria',
      'Se diferenciar de Mobitz II: no Mobitz I o PR muda; no Mobitz II o PR e fixo'
    ],

    diagnosticoDiferencial: [
      'BAV 2o grau Mobitz II (PR fixo antes do bloqueio)',
      'BAV 2:1 (pode ser Mobitz I ou II - dificil diferenciar)',
      'Extrassistoles atriais bloqueadas',
      'Bloqueio sinoatrial de 2o grau',
      'Pausas sinusais'
    ],

    prognostico: 'Excelente quando QRS estreito. Progressao para BAV completo e rara (< 5%). No IAM inferior, geralmente resolve em dias sem necessidade de marcapasso definitivo. QRS largo indica bloqueio infranodal com prognostico menos favoravel.',

    indicacaoMarcapasso: {
      indicado: false,
      classe: 'III',
      detalhes: 'Marcapasso definitivo NAO e indicado para BAV Mobitz I assintomatico com QRS estreito. Se sintomatico com documentacao de correlacao sintoma-arritmia, pode ser indicado (Classe I). BAV Mobitz I com QRS largo deve ser tratado como Mobitz II.'
    },

    tags: ['bloqueio', 'AV', 'Wenckebach', 'Mobitz I', 'PR progressivo', 'nodal'],

    citations: [
      {
        refId: 'kusumoto-bradycardia-2019',
        authors: ['Kusumoto FM', 'Schoenfeld MH', 'Barrett C', 'et al.'],
        title: '2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia and Cardiac Conduction Delay',
        journal: 'Circulation',
        year: 2019,
        volume: '140',
        pages: 'e506-e522',
        doi: '10.1161/CIR.0000000000000628',
        pmid: '30586772'
      },
      {
        refId: 'esc-pacing-2021',
        authors: ['Glikson M', 'Nielsen JC', 'Kronborg MB', 'et al.'],
        title: '2021 ESC Guidelines on cardiac pacing and cardiac resynchronization therapy',
        journal: 'European Heart Journal',
        year: 2021,
        volume: '42',
        pages: '3427-3520',
        doi: '10.1093/eurheartj/ehab364',
        pmid: '34455430'
      },
      {
        refId: 'barold-mobitz-2001',
        authors: ['Barold SS', 'Hayes DL'],
        title: 'Second-Degree Atrioventricular Block: A Reappraisal',
        journal: 'Mayo Clinic Proceedings',
        year: 2001,
        volume: '76',
        pages: '44-57',
        doi: '10.4065/76.1.44',
        pmid: '11155412'
      }
    ]
  },

  // ============================================================================
  // 3. BLOQUEIO AV DE 2o GRAU MOBITZ II
  // ============================================================================
  {
    id: 'bav-2-grau-mobitz-ii',
    nome: 'Bloqueio Atrioventricular de 2o Grau Mobitz II',
    nomeEN: 'Second-Degree Atrioventricular Block Mobitz Type II',
    sigla: 'BAV 2o Mobitz II',
    cid11: 'BC81.1',
    categoria: 'bloqueio_conducao',
    subcategoria: 'bloqueio_av',
    descricao: 'Bloqueio AV caracterizado por falha subita e intermitente da conducao AV, com batimentos bloqueados ocorrendo de forma imprevisivel, SEM prolongamento progressivo do PR precedente. O intervalo PR permanece constante nos batimentos conduzidos. O bloqueio geralmente ocorre abaixo do no AV (infrahissiano - feixe de His ou ramos), indicando doenca mais grave do sistema de conducao com alto risco de progressao para bloqueio completo.',

    criteriosECG: [
      'Intervalo PR CONSTANTE nos batimentos conduzidos (antes e depois do bloqueio)',
      'Ondas P bloqueadas de forma subita e intermitente (sem QRS associado)',
      'Ausencia de prolongamento progressivo do PR antes do batimento bloqueado',
      'Pausa do batimento bloqueado e multiplo exato do intervalo P-P',
      'Complexo QRS frequentemente LARGO (> 120 ms) - indica bloqueio infranodal',
      'Razao de conducao AV pode ser 2:1, 3:1, 4:1 ou variavel',
      'Pode progredir subitamente para BAV completo'
    ],

    caracteristicas: {
      frequencia: 'Variavel; frequencia ventricular depende da razao de conducao AV',
      ritmo: 'Irregular devido aos batimentos bloqueados de forma imprevisivel',
      ondaP: 'Normal em morfologia; ritmo atrial regular; algumas ondas P nao conduzem',
      intervaloPR: 'CONSTANTE e FIXO nos batimentos conduzidos; pode ser normal ou prolongado',
      complexoQRS: 'Frequentemente largo (> 120 ms) por bloqueio de ramo; QRS estreito e menos comum',
      eixoQRS: 'Pode haver desvio de eixo se hemibloqueio associado',
      outrasCaracteristicas: [
        'A pausa e multiplo exato do intervalo P-P (diferente de Mobitz I)',
        'O PR do batimento pos-pausa e IGUAL ao pre-pausa',
        'Pode progredir abruptamente para BAV completo',
        'Frequentemente associado a bloqueio de ramo'
      ]
    },

    causas: [
      'Doenca degenerativa do sistema de conducao (doenca de Lenegre-Lev)',
      'Infarto agudo do miocardio anterior (indica infarto extenso com necrose septal)',
      'Cardiopatia isquemica cronica',
      'Miocardiopatia dilatada ou hipertrofica',
      'Doenca de Chagas',
      'Estenose aortica calcificada com extensao para septo',
      'Pos-cirurgia cardiaca (especialmente valvar aortica ou mitral)',
      'Pos-ablacao do septo',
      'Endocardite com abscesso anelar aortico',
      'Sarcoidose cardiaca',
      'Amiloidose cardiaca',
      'Distrofia miotonica',
      'Miocardite (viral, Lyme, reumatica)',
      'Calcificacao do anel mitral-aortico'
    ],

    fatoresRisco: [
      { fator: 'IAM anterior', mecanismo: 'Necrose do septo interventricular e feixe de His', reversivel: false },
      { fator: 'Cirurgia valvar', mecanismo: 'Lesao iatrogênica do sistema de conducao', reversivel: false },
      { fator: 'Doenca de Chagas', mecanismo: 'Fibrose do sistema de conducao', reversivel: false },
      { fator: 'Idade avancada', mecanismo: 'Degeneracao esclerodegenerativa', reversivel: false }
    ],

    significadoClinico: 'ALTO RISCO - indica doenca grave do sistema de conducao infranodal. Progressao para BAV completo pode ocorrer de forma subita e imprevisivel, potencialmente resultando em assistolia ou bradicardia extrema. Ritmo de escape ventricular e lento e instavel. Marcapasso permanente e frequentemente necessario. No IAM anterior, indica infarto extenso com pior prognostico.',

    urgencia: 2,
    urgenciaDescricao: 'URGENTE - necessita internacao e avaliacao imediata para marcapasso; alto risco de progressao para BAV completo',

    conduta: 'Internacao hospitalar para monitoracao continua. Preparar marcapasso transcutaneo a beira do leito. Considerar marcapasso provisorio transvenoso. Evitar drogas que deprimam conducao. Avaliacao para marcapasso definitivo na maioria dos casos.',

    tratamentoAgudo: [
      '1. INTERNACAO HOSPITALAR - monitoracao cardiaca continua em UTI/UCO',
      '2. Ter marcapasso transcutaneo externo PRONTO a beira do leito',
      '3. Acesso venoso calibroso; material de ressuscitacao disponivel',
      '4. Se bradicardia sintomatica ou instabilidade hemodinamica:',
      '   - Atropina 0,5-1 mg IV (eficacia LIMITADA pois bloqueio e infranodal)',
      '   - Se refratario: Marcapasso transcutaneo IMEDIATO',
      '   - Marcapasso provisorio transvenoso se instavel ou MP transcutaneo ineficaz',
      '5. Evitar betabloqueadores, bloqueadores de canal de calcio, digoxina',
      '6. Dopamina ou epinefrina em infusao se hipotenso e MP nao disponivel',
      '7. Investigar causa de base (troponina, ecocardiograma)',
      '8. Avaliacao eletrofisiologica se indicado',
      '9. MARCAPASSO DEFINITIVO na maioria dos casos'
    ],

    criteriosEncaminhamento: [
      'TODO paciente com Mobitz II deve ser internado e avaliado por cardiologista',
      'Indicacao de marcapasso definitivo na maioria dos casos',
      'Estudo eletrofisiologico para confirmar nivel do bloqueio se duvida',
      'Investigacao de cardiopatia estrutural subjacente',
      'Avaliacao para ressincronizacao cardiaca se FEVE reduzida',
      'Encaminhamento URGENTE se sintomatico ou hemodinamicamente instavel'
    ],

    redFlags: [
      'Progressao para BAV completo - pode ser SUBITA e sem aviso',
      'Sincope ou pre-sincope (indica ritmo de escape inadequado)',
      'Pausas prolongadas (> 3 segundos)',
      'QRS muito largo (> 140 ms) - indica doenca mais distal',
      'Instabilidade hemodinamica',
      'No contexto de IAM anterior - indica infarto extenso, alto risco de morte',
      'Mobitz II com bloqueio de ramo alternante (BBRD e BBRE)',
      'Ausencia de ritmo de escape adequado durante bloqueio'
    ],

    dicasParaNaoEspecialista: [
      'Mobitz II e EMERGENCIA potencial - NUNCA subestime',
      'A diferenca chave: no Mobitz I o PR muda; no Mobitz II o PR e FIXO',
      'QRS LARGO = bloqueio infranodal = Mobitz II ate prova em contrario',
      'Atropina geralmente NAO funciona bem porque o bloqueio e abaixo do no AV',
      'Tenha SEMPRE marcapasso transcutaneo disponivel a beira do leito',
      'Pode progredir para BAV completo de forma SUBITA - monitore de perto',
      'Nao use betabloqueadores ou bloqueadores de canal de calcio',
      'Se em duvida entre Mobitz I e II, trate como Mobitz II (pior cenario)'
    ],

    diagnosticoDiferencial: [
      'BAV 2o grau Mobitz I com QRS largo (medir se PR varia)',
      'BAV 2:1 (dificil diferenciar Mobitz I de II; tratar como II se QRS largo)',
      'BAV completo com escape juncional (ritmo ventricular e completamente regular)',
      'Extrassistoles atriais bloqueadas'
    ],

    prognostico: 'Reservado sem tratamento. Alta taxa de progressao para BAV completo (ate 30-40% em alguns estudos). Ritmo de escape infranodal e lento (20-40 bpm) e instavel. Risco significativo de morte subita por assistolia. Com marcapasso permanente, prognostico depende da cardiopatia de base.',

    indicacaoMarcapasso: {
      indicado: true,
      classe: 'I',
      detalhes: 'Marcapasso permanente e INDICADO (Classe I) para BAV Mobitz II, independente de sintomas, devido ao alto risco de progressao para BAV completo. Tipo de dispositivo (uni ou bicameral) depende da funcao sinusal e da presenca de FA.'
    },

    tags: ['bloqueio', 'AV', 'Mobitz II', 'infranodal', 'marcapasso', 'urgente'],

    citations: [
      {
        refId: 'kusumoto-bradycardia-2019',
        authors: ['Kusumoto FM', 'Schoenfeld MH', 'Barrett C', 'et al.'],
        title: '2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia and Cardiac Conduction Delay',
        journal: 'Circulation',
        year: 2019,
        volume: '140',
        pages: 'e506-e522',
        doi: '10.1161/CIR.0000000000000628',
        pmid: '30586772'
      },
      {
        refId: 'esc-pacing-2021',
        authors: ['Glikson M', 'Nielsen JC', 'Kronborg MB', 'et al.'],
        title: '2021 ESC Guidelines on cardiac pacing and cardiac resynchronization therapy',
        journal: 'European Heart Journal',
        year: 2021,
        volume: '42',
        pages: '3427-3520',
        doi: '10.1093/eurheartj/ehab364',
        pmid: '34455430'
      },
      {
        refId: 'dhingra-mobitz-1974',
        authors: ['Dhingra RC', 'Denes P', 'Wu D', 'et al.'],
        title: 'The Significance of Second Degree Atrioventricular Block and Bundle Branch Block',
        journal: 'Circulation',
        year: 1974,
        volume: '49',
        pages: '638-646',
        doi: '10.1161/01.CIR.49.4.638',
        pmid: '4817703'
      }
    ]
  },

  // ============================================================================
  // 4. BLOQUEIO AV DE 3o GRAU (BAVT)
  // ============================================================================
  {
    id: 'bav-3-grau',
    nome: 'Bloqueio Atrioventricular de 3o Grau (Completo)',
    nomeEN: 'Third-Degree (Complete) Atrioventricular Block',
    sigla: 'BAVT',
    cid11: 'BC81.2',
    categoria: 'bloqueio_conducao',
    subcategoria: 'bloqueio_av',
    descricao: 'Ausencia completa de conducao eletrica entre atrios e ventriculos. Nenhum impulso atrial e conduzido aos ventriculos, resultando em DISSOCIACAO AV completa: atrios e ventriculos batem de forma completamente independente. A frequencia ventricular depende de um foco de escape (juncional ou ventricular) e e mais lenta que a atrial. Condicao potencialmente fatal que frequentemente requer marcapasso.',

    criteriosECG: [
      'DISSOCIACAO AV completa: ondas P e complexos QRS sem relacao temporal',
      'Ritmo atrial regular (ondas P com frequencia propria, geralmente 60-100 bpm)',
      'Ritmo ventricular regular (QRS com frequencia propria, mais lenta)',
      'Frequencia ventricular SEMPRE menor que a atrial',
      'Intervalo P-P regular; intervalo R-R regular; mas P-R variavel (aleatorio)',
      'Ondas P "caminham" atraves do ciclo cardiaco sem relacao com QRS',
      'QRS estreito (escape juncional, 40-60 bpm) ou largo (escape ventricular, 20-40 bpm)'
    ],

    caracteristicas: {
      frequencia: 'Atrial: 60-100 bpm (ritmo sinusal); Ventricular: 40-60 bpm (escape juncional) ou 20-40 bpm (escape ventricular)',
      ritmo: 'Atrial regular + ventricular regular, porem DISSOCIADOS (independentes)',
      ondaP: 'Normal em morfologia; ritmo regular; sem relacao com QRS; "caminham" pelo ciclo',
      intervaloPR: 'VARIAVEL e ALEATORIO - nao ha conducao AV; cada P tem distancia diferente do QRS',
      complexoQRS: 'Estreito (< 120 ms) se escape juncional; largo (> 120 ms) se escape ventricular ou bloqueio de ramo',
      eixoQRS: 'Variavel conforme origem do escape',
      outrasCaracteristicas: [
        'Batimentos de fusao podem ocorrer (parcial coincidencia de conducao)',
        'Batimentos de captura sao RAROS (ocasional conducao quando timing e perfeito)',
        'Escape juncional: QRS estreito, FC 40-60, mais estavel',
        'Escape ventricular: QRS largo, FC 20-40, menos estavel e mais grave',
        'FC ventricular nao varia com exercicio ou manobras (nao responde a atropina)'
      ]
    },

    causas: [
      'Doenca degenerativa do sistema de conducao (Lenegre-Lev) - causa mais comum em idosos',
      'Infarto agudo do miocardio: inferior (nodal, melhor prognostico) ou anterior (infranodal, pior)',
      'Pos-cirurgia cardiaca (especialmente valvar)',
      'Medicamentos em dose toxica: betabloqueadores, bloqueadores de canal de calcio, digoxina',
      'Cardiomiopatias (dilatada, hipertrofica, restritiva)',
      'Miocardite (viral, doenca de Lyme, reumatica)',
      'Doenca de Chagas (causa comum na America Latina)',
      'Endocardite infecciosa com abscesso anelar',
      'Sarcoidose cardiaca',
      'Amiloidose cardiaca',
      'Hipercalemia grave',
      'Congenito (raro, associado a lupus materno)',
      'Distrofias musculares',
      'Ablacao por cateter (complicacao)'
    ],

    fatoresRisco: [
      { fator: 'IAM inferior', mecanismo: 'Isquemia do no AV; geralmente transitorio', reversivel: true },
      { fator: 'IAM anterior', mecanismo: 'Necrose do feixe de His; geralmente permanente', reversivel: false },
      { fator: 'Cirurgia valvar aortica', mecanismo: 'Lesao do feixe de His adjacente', reversivel: false },
      { fator: 'Doenca de Lyme', mecanismo: 'Inflamacao do sistema de conducao', reversivel: true }
    ],

    significadoClinico: 'EMERGENCIA CARDIACA. Frequencia ventricular dependente de escape instavel. Sintomas comuns: sincope (Stokes-Adams), tontura, dispneia, fadiga, insuficiencia cardiaca. Risco de assistolia se escape falhar. Mortalidade alta sem tratamento. Maioria dos pacientes necessita marcapasso permanente. No IAM inferior pode ser transitorio; no anterior geralmente e permanente.',

    urgencia: 1,
    urgenciaDescricao: 'EMERGENCIA - risco imediato de vida; necessita marcapasso provisorio de emergencia; alto risco de assistolia',

    conduta: 'EMERGENCIA - internacao imediata em UTI. Marcapasso transcutaneo imediato se instavel. Marcapasso provisorio transvenoso assim que possivel. Marcapasso permanente na maioria dos casos nao reversiveis. No IAM inferior, pode esperar 5-7 dias pela resolucao espontanea.',

    tratamentoAgudo: [
      '1. EMERGENCIA - UTI/UCO com monitoracao continua; equipe pronta para RCP',
      '2. Acesso venoso calibroso; material de ressuscitacao a beira do leito',
      '3. Se INSTAVEL ou sintomatico: MARCAPASSO TRANSCUTANEO IMEDIATO',
      '   - Frequencia de estimulacao: 60-80 bpm',
      '   - Aumentar corrente ate captura (geralmente 50-100 mA)',
      '   - Analgesia/sedacao se paciente consciente (estimulacao e dolorosa)',
      '4. Atropina 0,5-1 mg IV (pode ajudar se bloqueio nodal; pouco efeito se infranodal)',
      '5. Dopamina 5-20 mcg/kg/min ou epinefrina 2-10 mcg/min se hipotenso',
      '6. Isoproterenol 2-10 mcg/min (aumenta frequencia do escape; evitar em isquemia)',
      '7. Marcapasso PROVISORIO TRANSVENOSO assim que possivel (mais estavel e menos doloroso)',
      '8. Investigar causa: troponina, eletrólitos, ecocardiograma, funcao renal',
      '9. Suspender todos os medicamentos que deprimem conducao',
      '10. MARCAPASSO PERMANENTE se nao reversiveis (maioria dos casos)'
    ],

    criteriosEncaminhamento: [
      'TODO paciente com BAVT deve ser internado em UTI/UCO',
      'Avaliacao cardiologica e eletrofisiologica URGENTE',
      'Marcapasso permanente indicado na maioria dos casos',
      'Excecao: BAVT no IAM inferior pode aguardar 5-7 dias; 50% resolve espontaneamente',
      'Investigar cardiopatia estrutural antes do implante de marcapasso definitivo',
      'Considerar TRC-D se FEVE reduzida e indicacao de marcapasso'
    ],

    redFlags: [
      'Assistolia ou pausas > 5 segundos - RCP imediata',
      'Sincope recorrente (crises de Stokes-Adams)',
      'Instabilidade hemodinamica (PAS < 90, sinais de hipoperfusao)',
      'Escape ventricular muito lento (< 30 bpm) ou ausente',
      'QRS muito largo (> 140 ms) - escape de origem muito distal, menos estavel',
      'Insuficiencia cardiaca aguda',
      'BAVT no contexto de IAM anterior - geralmente permanente e de pior prognostico',
      'BAVT apos cirurgia cardiaca - pode ser permanente; avaliar marcapasso',
      'Ausencia de resposta ao marcapasso transcutaneo (captura inadequada)'
    ],

    dicasParaNaoEspecialista: [
      'BAVT e EMERGENCIA - chame ajuda e prepare marcapasso transcutaneo imediatamente',
      'Procure dissociacao AV: P regular + QRS regular, mas P nao "segue" o QRS',
      'Conte as frequencias: ventricular SEMPRE menor que atrial no BAVT',
      'Atropina pode nao funcionar - nao perca tempo, use marcapasso',
      'Marcapasso transcutaneo: comece com FC 60-80 e aumente a corrente ate captura',
      'Captura = espiculas seguidas de QRS largo + pulso palpavel',
      'BAVT no IAM inferior costuma resolver; no anterior geralmente precisa de MP permanente',
      'Se paciente estavel e acordado, o marcapasso transcutaneo doi - use sedacao'
    ],

    diagnosticoDiferencial: [
      'BAV 2o grau de alto grau (alguma conducao ainda ocorre)',
      'Dissociacao AV isorritmica (frequencias atrial e ventricular semelhantes)',
      'Ritmo juncional acelerado com bloqueio retrogrado',
      'Bradicardia sinusal extrema com escape juncional (mas P e QRS relacionados)'
    ],

    prognostico: 'Grave sem tratamento - mortalidade alta por assistolia ou insuficiencia cardiaca. Com marcapasso permanente, prognostico depende da cardiopatia de base. BAVT no IAM inferior: 50% resolve em 5-7 dias. BAVT no IAM anterior: geralmente permanente, pior prognostico do IAM. BAVT congenito: pode ser bem tolerado por anos.',

    indicacaoMarcapasso: {
      indicado: true,
      classe: 'I',
      detalhes: 'Marcapasso permanente e INDICADO (Classe I) para BAVT sintomatico ou com escape < 40 bpm ou com QRS largo. No IAM inferior, aguardar 5-7 dias pela resolucao espontanea antes de indicar MP definitivo. Escolher dispositivo bicameral se ritmo sinusal; unicameral se FA permanente.'
    },

    tags: ['bloqueio', 'AV', 'BAVT', 'completo', 'dissociacao', 'emergencia', 'marcapasso'],

    citations: [
      {
        refId: 'kusumoto-bradycardia-2019',
        authors: ['Kusumoto FM', 'Schoenfeld MH', 'Barrett C', 'et al.'],
        title: '2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia and Cardiac Conduction Delay',
        journal: 'Circulation',
        year: 2019,
        volume: '140',
        pages: 'e506-e522',
        doi: '10.1161/CIR.0000000000000628',
        pmid: '30586772'
      },
      {
        refId: 'esc-pacing-2021',
        authors: ['Glikson M', 'Nielsen JC', 'Kronborg MB', 'et al.'],
        title: '2021 ESC Guidelines on cardiac pacing and cardiac resynchronization therapy',
        journal: 'European Heart Journal',
        year: 2021,
        volume: '42',
        pages: '3427-3520',
        doi: '10.1093/eurheartj/ehab364',
        pmid: '34455430'
      },
      {
        refId: 'strauss-chb-2011',
        authors: ['Strauss DG', 'Selvester RH', 'Wagner GS'],
        title: 'Defining Left Bundle Branch Block in the Era of Cardiac Resynchronization Therapy',
        journal: 'American Journal of Cardiology',
        year: 2011,
        volume: '107',
        pages: '927-934',
        doi: '10.1016/j.amjcard.2010.11.010',
        pmid: '21376930'
      }
    ]
  },

  // ============================================================================
  // 5. BLOQUEIO DE RAMO DIREITO (BRD)
  // ============================================================================
  {
    id: 'bloqueio-ramo-direito',
    nome: 'Bloqueio de Ramo Direito',
    nomeEN: 'Right Bundle Branch Block',
    sigla: 'BRD',
    cid11: 'BC82.0',
    categoria: 'bloqueio_conducao',
    subcategoria: 'bloqueio_ramo',
    descricao: 'Disturbio da conducao intraventricular por bloqueio no ramo direito do feixe de His. O ventriculo esquerdo e ativado normalmente, enquanto o ventriculo direito e ativado tardiamente via conducao muscular, resultando em alargamento do QRS e padrao caracteristico "rSR\'" em V1 (orelhas de coelho). Pode ser achado incidental em coracoes normais ou indicar cardiopatia subjacente.',

    criteriosECG: [
      'Duracao do QRS >= 120 ms (BRD completo; 110-120 ms = BRD incompleto)',
      'Padrao rSR\' ou rsR\' em V1-V2 ("orelhas de coelho") - morfologia M',
      'Onda S larga e empastada em DI, aVL, V5-V6',
      'Onda R terminal larga (R\') em V1, representando ativacao tardia do VD',
      'Onda T geralmente invertida em V1-V3 (alteracao secundaria da repolarizacao)',
      'Eixo QRS geralmente normal ou com leve desvio para direita',
      'Tempo de ativacao ventricular (TAV) prolongado em V1 (> 50 ms)'
    ],

    caracteristicas: {
      frequencia: 'Normal; determinada pelo ritmo de base',
      ritmo: 'Determinado pelo ritmo de base (sinusal, FA, etc.)',
      ondaP: 'Normal; nao afetada pelo bloqueio de ramo',
      intervaloPR: 'Normal (120-200 ms); pode estar prolongado se BAV 1o associado',
      complexoQRS: '>= 120 ms; padrao rSR\' em V1-V2; S larga em DI, aVL, V5-V6',
      eixoQRS: 'Geralmente normal (-30 a +90 graus); pode ter desvio para direita (> +90)',
      outrasCaracteristicas: [
        'A r inicial em V1 representa ativacao septal normal (E para D)',
        'A R\' terminal em V1 representa ativacao tardia do VD',
        'A S empastada em V5-V6 representa a mesma ativacao tardia do VD',
        'Alteracoes de ST-T sao secundarias - nao significam isquemia',
        'BRD incompleto: mesmo padrao com QRS 110-120 ms'
      ]
    },

    causas: [
      'Variante normal em ate 2% da populacao (especialmente jovens)',
      'Cardiopatias congenitas: CIA (causa classica), Ebstein, Fallot',
      'Cor pulmonale e hipertensao pulmonar (sobrecarga VD)',
      'Tromboembolismo pulmonar agudo (BRD novo pode ser sinal)',
      'Cardiopatia isquemica (especialmente infarto septal)',
      'Cardiomiopatia do VD (DAVD)',
      'Miocardite',
      'Doenca de Chagas',
      'Doenca degenerativa do sistema de conducao',
      'Pos-cirurgia cardiaca (especialmente de CIA)',
      'Pos-cateterismo cardiaco direito (lesao mecanica)',
      'Doenca valvar pulmonar ou tricuspide',
      'Idiopatico em pacientes com coracao estruturalmente normal'
    ],

    fatoresRisco: [
      { fator: 'Comunicacao interatrial (CIA)', mecanismo: 'Dilatacao e sobrecarga cronica do VD', reversivel: true },
      { fator: 'Hipertensao pulmonar', mecanismo: 'Sobrecarga de pressao do VD', reversivel: false },
      { fator: 'TEP agudo', mecanismo: 'Dilatacao aguda e isquemia do VD', reversivel: true },
      { fator: 'Idade avancada', mecanismo: 'Degeneracao fibrotica do sistema de conducao', reversivel: false }
    ],

    significadoClinico: 'Significado variavel dependendo do contexto. Em jovens sem cardiopatia, frequentemente e achado incidental benigno. Em idosos ou com cardiopatia, pode indicar doenca estrutural ou do sistema de conducao. BRD NOVO em paciente com dor toracica ou dispneia deve levantar suspeita de TEP. BRD + bloqueio fascicular = bloqueio bifascicular com risco de progressao.',

    urgencia: 4,
    urgenciaDescricao: 'Rotina - exceto se BRD NOVO com sintomas (TEP, IAM) ou se associado a hemibloqueio (bifascicular)',

    conduta: 'Em BRD isolado e assintomatico em paciente jovem: tranquilizacao, nenhuma investigacao adicional rotineira. Em BRD novo ou sintomatico: investigar causa (ecocardiograma, angiotomografia se suspeita de TEP). Se bifascicular ou trifascicular: avaliacao cardiologica para risco de progressao.',

    tratamentoAgudo: [
      '1. BRD isolado cronico e assintomatico: nao requer tratamento agudo',
      '2. BRD NOVO com dispneia ou dor toracica:',
      '   - Considerar TEP: D-dimero, angiotomografia de torax',
      '   - Considerar IAM: troponina, ECG seriado',
      '   - Internacao para investigacao',
      '3. BRD + sintomas cardiovasculares: investigacao cardiaca completa',
      '   - Ecocardiograma (sobrecarga VD, cardiopatia estrutural)',
      '   - Funcao ventricular',
      '4. BRD + hemibloqueio (bifascicular):',
      '   - Avaliacao cardiologica',
      '   - Considerar Holter para BAV paroxistico',
      '   - Considerar estudo eletrofisiologico se sincope',
      '5. Tratar a causa de base quando identificada'
    ],

    criteriosEncaminhamento: [
      'BRD novo sem causa aparente - investigar cardiopatia estrutural',
      'BRD + hemibloqueio anterior ou posterior (bloqueio bifascicular)',
      'BRD + BAV 1o grau (bloqueio trifascicular)',
      'Sincope ou pre-sincope em paciente com BRD',
      'BRD em paciente com sintomas cardiacos (dispneia, dor, palpitacoes)',
      'BRD + evidencia de cardiopatia estrutural no ecocardiograma',
      'BRD progressivo ou intermitente (varia entre ECGs)',
      'Suspeita de Chagas ou outras causas especificas'
    ],

    redFlags: [
      'BRD NOVO com dispneia subita - pensar em TEP (emergencia)',
      'BRD + dor toracica - pode indicar IAM septal ou TEP',
      'BRD + sincope - risco de BAV intermitente ou taquiarritmias',
      'Progressao de BRD incompleto para completo',
      'BRD + hemibloqueio + BAV 1o = trifascicular (alto risco de BAVT)',
      'BRD novo no pos-operatorio de cirurgia cardiaca',
      'BRD alternante (BRD alternando com BRE) - muito grave, indica doenca difusa'
    ],

    dicasParaNaoEspecialista: [
      'O padrao classico e "orelhas de coelho" (rSR\') em V1 + S larga em V5-V6',
      'BRD isolado em jovem saudavel geralmente e benigno',
      'BRD NOVO com dispneia = TEP ate prova em contrario',
      'Nao confunda inversao de T em V1-V3 com isquemia - e secundaria ao BRD',
      'Se BRD + desvio de eixo para esquerda = bifascicular (BRD + HBAE)',
      'Se BRD + desvio de eixo para direita extremo = pode ser BRD + HBPE',
      'BRD nao contraindica uso de betabloqueadores ou outras drogas',
      'BRD dificulta analise de isquemia no ECG - considerar outros metodos'
    ],

    diagnosticoDiferencial: [
      'Padrao de Brugada (elevacao de ST "em sela" em V1-V3)',
      'Hipertrofia de VD (pode ter R\' em V1 mas QRS nao tao largo)',
      'Pre-excitacao ventricular (WPW) com via posterosseptal',
      'Taquicardia ventricular com origem no VE',
      'Artefato de registro'
    ],

    prognostico: 'Excelente em BRD isolado sem cardiopatia estrutural. Quando associado a cardiopatia (IC, DAC, cardiomiopatia), reflete a gravidade da doenca de base. Progressao para BAVT e rara em BRD isolado, mas risco aumenta se associado a hemibloqueio ou BAV 1o.',

    indicacaoMarcapasso: {
      indicado: false,
      classe: 'III',
      detalhes: 'Marcapasso NAO e indicado para BRD isolado assintomatico. Se BRD + sincope inexplicada + estudo eletrofisiologico com intervalo HV >= 70 ms, considerar marcapasso (Classe IIa). BRD + hemibloqueio + sincope pode indicar marcapasso apos investigacao.'
    },

    tags: ['bloqueio', 'ramo', 'direito', 'BRD', 'QRS largo', 'V1'],

    citations: [
      {
        refId: 'kusumoto-bradycardia-2019',
        authors: ['Kusumoto FM', 'Schoenfeld MH', 'Barrett C', 'et al.'],
        title: '2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia and Cardiac Conduction Delay',
        journal: 'Circulation',
        year: 2019,
        volume: '140',
        pages: 'e506-e522',
        doi: '10.1161/CIR.0000000000000628',
        pmid: '30586772'
      },
      {
        refId: 'surawicz-ecg-2009',
        authors: ['Surawicz B', 'Childers R', 'Deal BJ', 'et al.'],
        title: 'AHA/ACCF/HRS Recommendations for the Standardization and Interpretation of the Electrocardiogram: Part III',
        journal: 'Circulation',
        year: 2009,
        volume: '119',
        pages: 'e235-e240',
        doi: '10.1161/CIRCULATIONAHA.108.191095',
        pmid: '19228822'
      },
      {
        refId: 'eriksson-rbbb-2006',
        authors: ['Eriksson P', 'Hansson PO', 'Eriksson H', 'Dellborg M'],
        title: 'Bundle-branch block in a general male population: the study of men born 1913',
        journal: 'Circulation',
        year: 2006,
        volume: '98',
        pages: '2494-2500',
        doi: '10.1161/01.CIR.98.22.2494',
        pmid: '9832497'
      }
    ]
  },

  // ============================================================================
  // 6. BLOQUEIO DE RAMO ESQUERDO (BRE)
  // ============================================================================
  {
    id: 'bloqueio-ramo-esquerdo',
    nome: 'Bloqueio de Ramo Esquerdo',
    nomeEN: 'Left Bundle Branch Block',
    sigla: 'BRE',
    cid11: 'BC82.1',
    categoria: 'bloqueio_conducao',
    subcategoria: 'bloqueio_ramo',
    descricao: 'Disturbio da conducao intraventricular por bloqueio no ramo esquerdo do feixe de His. O ventriculo direito e ativado normalmente enquanto o VE e ativado tardiamente via conducao muscular do VD para VE (direita para esquerda), resultando em QRS alargado e alteracao profunda da morfologia. Geralmente indica cardiopatia estrutural subjacente e esta associado a pior prognostico cardiovascular.',

    criteriosECG: [
      'Duracao do QRS >= 120 ms (BRE completo; 110-120 ms = BRE incompleto)',
      'Onda R larga, entalhada ou em "plateau" em DI, aVL, V5-V6',
      'Ausencia de onda Q em DI, V5-V6 (septal ativado da D para E)',
      'Onda QS ou rS em V1-V3 (onda S larga e profunda)',
      'Tempo de ativacao ventricular (TAV/pico de R) > 60 ms em V5-V6',
      'Alteracoes secundarias de ST-T: inversao de T em DI, aVL, V5-V6',
      'Elevacao de ST em V1-V3 (discordancia apropriada)',
      'Eixo QRS geralmente normal ou desviado para esquerda'
    ],

    caracteristicas: {
      frequencia: 'Normal; determinada pelo ritmo de base',
      ritmo: 'Determinado pelo ritmo de base',
      ondaP: 'Normal; nao afetada pelo bloqueio de ramo',
      intervaloPR: 'Normal (pode estar prolongado se BAV 1o associado)',
      complexoQRS: '>= 120 ms; R larga em DI, aVL, V5-V6; QS ou rS em V1-V3',
      eixoQRS: 'Geralmente normal ou com desvio para esquerda (-30 a -90 graus)',
      outrasCaracteristicas: [
        'Ausencia de q septal em DI e V6 (despolarizacao septal invertida)',
        'Entalhe ou "notch" no ramo ascendente da R em V5-V6',
        'Discordancia de ST-T: ST-T em direcao oposta ao QRS',
        'BRE mascara completamente sinais de IAM - dificil diagnostico',
        'BRE pode indicar necessidade de ressincronizacao cardiaca'
      ]
    },

    causas: [
      'Cardiopatia hipertensiva (causa mais comum)',
      'Cardiomiopatia dilatada',
      'Cardiopatia isquemica e doenca arterial coronariana',
      'Estenose aortica (degenerativa ou congenita)',
      'Miocardiopatia hipertrofica',
      'Miocardite',
      'Doenca degenerativa do sistema de conducao (Lenegre-Lev)',
      'Doenca de Chagas',
      'Pos-cirurgia cardiaca (especialmente valvar aortica)',
      'Cardiomiopatia por taquicardia',
      'Sarcoidose cardiaca',
      'BRE isolado em coracao normal e RARO (< 10% dos casos)'
    ],

    fatoresRisco: [
      { fator: 'Hipertensao arterial', mecanismo: 'Hipertrofia e fibrose do VE', reversivel: false },
      { fator: 'Cardiopatia isquemica', mecanismo: 'Fibrose miocardica', reversivel: false },
      { fator: 'Estenose aortica', mecanismo: 'Extensao da calcificacao para o sistema de conducao', reversivel: false },
      { fator: 'Idade avancada', mecanismo: 'Degeneracao fibrotica', reversivel: false }
    ],

    significadoClinico: 'Geralmente indica CARDIOPATIA ESTRUTURAL subjacente, diferente do BRD que pode ser benigno. BRE NOVO em paciente com dor toracica deve ser tratado como IAMCSST (criterio de ativacao de hemodinamica). BRE cronico em pacientes com IC e FEVE reduzida pode se beneficiar de TRC. BRE mascara completamente a analise de isquemia no ECG.',

    urgencia: 3,
    urgenciaDescricao: 'Alerta - BRE geralmente indica cardiopatia; BRE NOVO com dor toracica = EMERGENCIA (tratar como IAM)',

    conduta: 'BRE NOVO com dor toracica: tratar como IAM - ativar protocolo de reperfusao. BRE cronico: investigar cardiopatia estrutural com ecocardiograma. Avaliar funcao ventricular para indicacao de TRC se IC. Se BRE + IC + FEVE <= 35%: considerar TRC-D.',

    tratamentoAgudo: [
      '1. BRE NOVO + DOR TORACICA = tratar como IAM:',
      '   - AAS, anticoagulacao, encaminhar para cateterismo de emergencia',
      '   - Criterios de Sgarbossa modificados ajudam mas nao sao definitivos',
      '   - Baixo limiar para cateterismo se alta suspeita clinica',
      '2. BRE cronico e assintomatico:',
      '   - Ecocardiograma para avaliar funcao VE e cardiopatia estrutural',
      '   - Nao requer tratamento do BRE em si',
      '3. BRE + IC com FEVE reduzida (<= 35%):',
      '   - Otimizar terapia de IC',
      '   - Avaliar indicacao de TRC (ressincronizacao cardiaca)',
      '   - TRC melhora sintomas e mortalidade em BRE verdadeiro',
      '4. Investigar causas tratáveis:',
      '   - Isquemia coronaria',
      '   - Doenca valvar',
      '   - Disturbios eletroliticos',
      '5. Se BRE + BAV avancado: avaliar necessidade de marcapasso'
    ],

    criteriosEncaminhamento: [
      'TODO paciente com BRE deve ter investigacao cardiaca (ecocardiograma minimo)',
      'BRE NOVO: encaminhar urgente para exclusao de IAM e investigacao de causa',
      'BRE + IC: avaliacao para TRC',
      'BRE + sincope: estudo eletrofisiologico, avaliar indicacao de marcapasso/CDI',
      'BRE + angina ou equivalentes: investigar doenca coronariana (teste de esforco nao serve)',
      'BRE + BAV de qualquer grau: avaliacao para marcapasso',
      'BRE em paciente jovem: investigar cardiomiopatia'
    ],

    redFlags: [
      'BRE NOVO com dor toracica = IAMCSST ate prova em contrario (emergencia)',
      'BRE + sincope - risco de BAV ou taquiarritmias ventriculares',
      'BRE + FEVE reduzida + sintomas de IC - considerar TRC',
      'BRE + BAV = bloqueio trifascicular (risco de BAVT)',
      'BRE em paciente jovem sem causa aparente - investigar cardiomiopatia',
      'Progressao de BRE incompleto para completo',
      'BRE alternante (BRE e BRD alternando) - indica doenca grave e difusa',
      'BRE + QT prolongado - risco de torsades de pointes'
    ],

    dicasParaNaoEspecialista: [
      'BRE = quase sempre ha cardiopatia estrutural; nao e normal como BRD pode ser',
      'BRE NOVO + dor toracica = ativar protocolo de IAM imediatamente',
      'BRE torna impossivel diagnosticar IAM pelo ECG - usar troponina e clinica',
      'Criterios de Sgarbossa: ST concordante > 1mm, ST depressao > 1mm em V1-V3, ST > 5mm discordante',
      'BRE mascara teste ergometrico - usar cintilografia ou eco de estresse',
      'Inversao de T em V5-V6 no BRE e SECUNDARIA, nao e isquemia',
      'BRE + IC + QRS > 150ms = forte candidato a TRC',
      'Nao deixe de encaminhar BRE para ecocardiograma - precisa investigar'
    ],

    diagnosticoDiferencial: [
      'Ritmo de marcapasso VD (morfologia semelhante ao BRE)',
      'Pre-excitacao ventricular (WPW) anterosseptal',
      'Taquicardia ventricular com origem no VD',
      'Hipercalemia grave (QRS largo)',
      'Sindrome de Brugada (mas afeta V1-V3)'
    ],

    prognostico: 'Pior que BRD. BRE esta associado a maior mortalidade cardiovascular, mesmo apos ajuste para fatores de risco. Em pacientes com IC e FEVE reduzida, TRC melhora sintomas e sobrevida. BRE isolado em coracao aparentemente normal ainda requer monitoramento por risco de cardiopatia oculta.',

    indicacaoMarcapasso: {
      indicado: false,
      classe: 'III',
      detalhes: 'Marcapasso convencional NAO e indicado para BRE isolado assintomatico. TRC (terapia de ressincronizacao cardiaca) e indicada (Classe I) para BRE + FEVE <= 35% + NYHA II-IV ambulatorial + QRS >= 150 ms em ritmo sinusal. TRC pode ser considerada para QRS 120-150 ms (Classe IIa).'
    },

    tags: ['bloqueio', 'ramo', 'esquerdo', 'BRE', 'QRS largo', 'cardiopatia', 'TRC'],

    citations: [
      {
        refId: 'strauss-lbbb-2011',
        authors: ['Strauss DG', 'Selvester RH', 'Wagner GS'],
        title: 'Defining Left Bundle Branch Block in the Era of Cardiac Resynchronization Therapy',
        journal: 'American Journal of Cardiology',
        year: 2011,
        volume: '107',
        pages: '927-934',
        doi: '10.1016/j.amjcard.2010.11.010',
        pmid: '21376930'
      },
      {
        refId: 'sgarbossa-lbbb-1996',
        authors: ['Sgarbossa EB', 'Pinski SL', 'Barbagelata A', 'et al.'],
        title: 'Electrocardiographic Diagnosis of Evolving Acute Myocardial Infarction in the Presence of Left Bundle-Branch Block',
        journal: 'New England Journal of Medicine',
        year: 1996,
        volume: '334',
        pages: '481-487',
        doi: '10.1056/NEJM199602223340801',
        pmid: '8559200'
      },
      {
        refId: 'cleland-crt-2005',
        authors: ['Cleland JGF', 'Daubert JC', 'Erdmann E', 'et al.'],
        title: 'The Effect of Cardiac Resynchronization on Morbidity and Mortality in Heart Failure',
        journal: 'New England Journal of Medicine',
        year: 2005,
        volume: '352',
        pages: '1539-1549',
        doi: '10.1056/NEJMoa050496',
        pmid: '15753115'
      }
    ]
  },

  // ============================================================================
  // 7. HEMIBLOQUEIO ANTERIOR ESQUERDO (HBAE)
  // ============================================================================
  {
    id: 'hemibloqueio-anterior-esquerdo',
    nome: 'Hemibloqueio Anterior Esquerdo',
    nomeEN: 'Left Anterior Fascicular Block',
    sigla: 'HBAE',
    cid11: 'BC82.2',
    categoria: 'bloqueio_conducao',
    subcategoria: 'bloqueio_fascicular',
    descricao: 'Bloqueio de conducao no fasciculo anterior do ramo esquerdo do feixe de His. O fasciculo anterior e mais vulneravel por ser mais longo e fino e ter irrigacao por um unico vaso. Resulta em desvio do eixo QRS para a esquerda (alem de -45 graus) com QRS estreito ou minimamente alargado. E o disturbio de conducao fascicular mais comum.',

    criteriosECG: [
      'Desvio do eixo QRS para ESQUERDA: entre -45 e -90 graus',
      'Padrao rS em DII, DIII, aVF (S > R nestas derivacoes)',
      'Padrao qR em DI e aVL (pequena q seguida de R proeminente)',
      'Duracao do QRS < 120 ms (ou apenas minimamente prolongado, 100-120 ms)',
      'Tempo de ativacao ventricular (TAV) prolongado em aVL (> 45 ms)',
      'Ausencia de outras causas de desvio de eixo para esquerda (HVE, IAM inferior)',
      'Pode haver onda S terminal em V5-V6'
    ],

    caracteristicas: {
      frequencia: 'Normal; determinada pelo ritmo de base',
      ritmo: 'Determinado pelo ritmo de base',
      ondaP: 'Normal',
      intervaloPR: 'Normal (pode estar prolongado se BAV 1o associado)',
      complexoQRS: 'Duracao normal ou pouco prolongado (< 120 ms)',
      eixoQRS: 'Desviado para ESQUERDA: -45 a -90 graus (mais negativo que -45)',
      outrasCaracteristicas: [
        'Ativacao ventricular inicia pelo fasciculo posterior (inferior -> superior)',
        'Vetor inicial aponta para baixo e direita (pequena r em inferiores, q em DI)',
        'Vetor tardio aponta para cima e esquerda (S em inferiores, R em DI)',
        'Onda q em DI e aVL NAO e patologica (faz parte do padrao)',
        'HBAE + BRD = bloqueio bifascicular'
      ]
    },

    causas: [
      'Cardiopatia hipertensiva (causa mais comum)',
      'Doenca arterial coronariana / cardiopatia isquemica',
      'Doenca degenerativa do sistema de conducao (Lenegre-Lev)',
      'Cardiomiopatia dilatada',
      'Estenose aortica',
      'Miocardite',
      'Doenca de Chagas',
      'Cardiopatias congenitas',
      'Fibrose do septo interventricular',
      'Idade avancada (processo degenerativo)',
      'Pode ser variante normal em pacientes magros e jovens (raro)',
      'Pos-cirurgia cardiaca (lesao do fasciculo)'
    ],

    fatoresRisco: [
      { fator: 'Hipertensao arterial', mecanismo: 'Fibrose e remodelamento do VE', reversivel: false },
      { fator: 'Idade avancada', mecanismo: 'Degeneracao fibrotica do sistema de conducao', reversivel: false },
      { fator: 'Cardiopatia isquemica', mecanismo: 'Fibrose septal por isquemia', reversivel: false },
      { fator: 'Fasciculo anterior mais vulneravel', mecanismo: 'Mais longo, fino, irrigacao unica (DA)', reversivel: false }
    ],

    significadoClinico: 'O mais comum dos bloqueios fasciculares. Isolado, geralmente tem significado clinico limitado, mas indica processo patologico do sistema de conducao. Quando associado a BRD (bloqueio bifascicular), aumenta o risco de progressao para BAV completo. Nao requer tratamento especifico em si, mas merece investigacao de cardiopatia subjacente.',

    urgencia: 4,
    urgenciaDescricao: 'Rotina - HBAE isolado geralmente nao e urgente; urgente se associado a BRD (bifascicular) ou sintomas',

    conduta: 'HBAE isolado: geralmente apenas observacao. Investigar cardiopatia estrutural em pacientes com fatores de risco. Se HBAE + BRD (bifascicular): monitorar para progressao, considerar Holter. Se bifascicular + sincope: estudo eletrofisiologico.',

    tratamentoAgudo: [
      '1. HBAE isolado geralmente nao requer tratamento agudo',
      '2. Investigar causa de base:',
      '   - Ecocardiograma para funcao VE e cardiopatia estrutural',
      '   - Avaliar fatores de risco cardiovascular',
      '3. Se HBAE + BRD (bifascicular):',
      '   - Avaliacao cardiologica',
      '   - Holter 24h para BAV paroxistico',
      '   - Considerar estudo eletrofisiologico se sincope',
      '4. Se bifascicular + BAV 1o (trifascicular):',
      '   - Alto risco de BAVT',
      '   - Avaliacao para marcapasso profilatico',
      '5. Nao ha medicamentos que tratem ou revertam HBAE',
      '6. Tratar cardiopatia de base quando presente'
    ],

    criteriosEncaminhamento: [
      'HBAE + BRD (bloqueio bifascicular) - acompanhamento cardiologico',
      'HBAE + BRD + BAV 1o (bloqueio trifascicular) - avaliacao para marcapasso',
      'Sincope ou pre-sincope em paciente com HBAE',
      'HBAE novo sem causa aparente',
      'HBAE progressivo (eixo cada vez mais negativo)',
      'HBAE + sintomas cardiovasculares',
      'HBAE em paciente jovem sem causa identificada'
    ],

    redFlags: [
      'HBAE + BRD + BAV 1o = bloqueio trifascicular (alto risco de BAVT subito)',
      'HBAE + BRD + sincope = considerar marcapasso',
      'HBAE novo apos IAM inferior - pode indicar envolvimento do septo',
      'Progressao rapida do desvio de eixo',
      'HBAE alternante (desvio de eixo que varia) - indica instabilidade',
      'HBAE + disfuncao ventricular esquerda'
    ],

    dicasParaNaoEspecialista: [
      'HBAE = desvio de eixo para esquerda + QRS estreito + rS em DII, DIII, aVF',
      'O eixo deve ser MAIS negativo que -45 graus (nao basta ser negativo)',
      'qR em DI e aVL faz parte do padrao - nao confunda com IAM lateral',
      'HBAE isolado e relativamente comum e geralmente benigno',
      'Preocupe-se mais se HBAE + BRD (bifascicular) ou + sintomas',
      'O fasciculo anterior e o primeiro a "falhar" por ser mais vulneravel',
      'Se desvio de eixo para esquerda + QRS LARGO = nao e HBAE puro (e BRE)',
      'Sempre exclua outras causas de eixo para esquerda: HVE, IAM inferior'
    ],

    diagnosticoDiferencial: [
      'Hipertrofia ventricular esquerda (QRS pode ser mais largo, indice de Sokolow)',
      'IAM inferior (ondas Q em inferiores, mas historia clinica e diferente)',
      'Variante normal em biotipo longilíneo',
      'Sindrome de WPW com via posterosseptal (PR curto, delta wave)',
      'BRE (QRS largo, morfologia diferente)'
    ],

    prognostico: 'Excelente para HBAE isolado. Risco de progressao para BAVT e muito baixo (< 1% ao ano). Quando associado a BRD, o risco aumenta (bloqueio bifascicular), mas ainda e baixo (1-2% ao ano). Se bifascicular + sincope, o risco e significativo e justifica intervencao.',

    indicacaoMarcapasso: {
      indicado: false,
      classe: 'III',
      detalhes: 'Marcapasso NAO e indicado para HBAE isolado. Quando HBAE + BRD (bifascicular) + sincope inexplicada, considerar marcapasso apos estudo eletrofisiologico mostrando HV >= 70 ms ou bloqueio infra-His (Classe I). Bifascicular + BAV intermitente documentado = marcapasso indicado.'
    },

    tags: ['hemibloqueio', 'fascicular', 'anterior', 'esquerdo', 'HBAE', 'eixo esquerdo'],

    citations: [
      {
        refId: 'kusumoto-bradycardia-2019',
        authors: ['Kusumoto FM', 'Schoenfeld MH', 'Barrett C', 'et al.'],
        title: '2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia and Cardiac Conduction Delay',
        journal: 'Circulation',
        year: 2019,
        volume: '140',
        pages: 'e506-e522',
        doi: '10.1161/CIR.0000000000000628',
        pmid: '30586772'
      },
      {
        refId: 'surawicz-ecg-2009',
        authors: ['Surawicz B', 'Childers R', 'Deal BJ', 'et al.'],
        title: 'AHA/ACCF/HRS Recommendations for the Standardization and Interpretation of the Electrocardiogram: Part III',
        journal: 'Circulation',
        year: 2009,
        volume: '119',
        pages: 'e235-e240',
        doi: '10.1161/CIRCULATIONAHA.108.191095',
        pmid: '19228822'
      },
      {
        refId: 'elizari-fascicular-2007',
        authors: ['Elizari MV', 'Acunzo RS', 'Ferreiro M'],
        title: 'Hemiblocks Revisited',
        journal: 'Circulation',
        year: 2007,
        volume: '115',
        pages: '1154-1163',
        doi: '10.1161/CIRCULATIONAHA.106.637389',
        pmid: '17339568'
      }
    ]
  },

  // ============================================================================
  // 8. HEMIBLOQUEIO POSTERIOR ESQUERDO (HBPE)
  // ============================================================================
  {
    id: 'hemibloqueio-posterior-esquerdo',
    nome: 'Hemibloqueio Posterior Esquerdo',
    nomeEN: 'Left Posterior Fascicular Block',
    sigla: 'HBPE',
    cid11: 'BC82.3',
    categoria: 'bloqueio_conducao',
    subcategoria: 'bloqueio_fascicular',
    descricao: 'Bloqueio de conducao no fasciculo posterior do ramo esquerdo do feixe de His. E muito mais raro que o HBAE porque o fasciculo posterior e mais curto, mais espesso e tem dupla irrigacao sanguinea (coronaria direita e descendente anterior). Resulta em desvio do eixo QRS para a DIREITA. Quando presente, geralmente indica doenca cardiaca significativa.',

    criteriosECG: [
      'Desvio do eixo QRS para DIREITA: > +90 graus (geralmente +90 a +180 graus)',
      'Padrao rS em DI e aVL (S > R nestas derivacoes)',
      'Padrao qR em DII, DIII, aVF (pequena q seguida de R proeminente)',
      'Duracao do QRS < 120 ms (estreito ou minimamente alargado)',
      'Ausencia de hipertrofia ventricular direita (excluir por eco ou clinica)',
      'Ausencia de outras causas de eixo para direita (DPOC, TEP, coracao verticalizado)',
      'SIQIIITIII pode estar presente (S em DI, Q em DIII, T invertida em DIII)'
    ],

    caracteristicas: {
      frequencia: 'Normal; determinada pelo ritmo de base',
      ritmo: 'Determinado pelo ritmo de base',
      ondaP: 'Normal',
      intervaloPR: 'Normal (pode estar prolongado se BAV 1o associado)',
      complexoQRS: 'Duracao normal ou pouco prolongado (< 120 ms)',
      eixoQRS: 'Desviado para DIREITA: > +90 graus (frequentemente +110 a +180 graus)',
      outrasCaracteristicas: [
        'Ativacao ventricular inicia pelo fasciculo anterior (superior -> inferior)',
        'Vetor tardio aponta para baixo e direita (R em inferiores, S em DI)',
        'Onda q em inferiores NAO e patologica (faz parte do padrao)',
        'HBPE e diagnostico de EXCLUSAO - descartar outras causas de eixo direito',
        'HBPE + BRD = bloqueio bifascicular (variante menos comum)'
      ]
    },

    causas: [
      'Cardiopatia isquemica (causa mais comum; indica doenca extensa)',
      'Infarto inferior ou posterolateral extenso',
      'Cardiomiopatia dilatada',
      'Doenca degenerativa do sistema de conducao',
      'Estenose aortica',
      'Cardiomiopatia hipertrofica',
      'Miocardite',
      'Doenca de Chagas',
      'Hipercalemia grave (deve ser excluida)',
      'Pos-cirurgia cardiaca',
      'E muito mais raro que HBAE - sempre indica doenca mais extensa'
    ],

    fatoresRisco: [
      { fator: 'Cardiopatia isquemica extensa', mecanismo: 'Necessaria lesao extensa para afetar fasciculo posterior robusto', reversivel: false },
      { fator: 'IAM inferior extenso', mecanismo: 'Necrose da regiao do fasciculo posterior', reversivel: false },
      { fator: 'Doenca difusa do sistema de conducao', mecanismo: 'Fibrose do fasciculo posterior', reversivel: false },
      { fator: 'Fasciculo posterior mais protegido', mecanismo: 'Mais curto, espesso, dupla irrigacao', reversivel: false }
    ],

    significadoClinico: 'Muito mais raro e clinicamente mais significativo que HBAE. Por ser dificil de lesar o fasciculo posterior, sua presenca geralmente indica doenca cardiaca extensa ou grave. Associacao com BRD (bloqueio bifascicular) tem maior risco de progressao para BAVT que a combinacao BRD + HBAE. Sempre investigue cardiopatia subjacente.',

    urgencia: 3,
    urgenciaDescricao: 'Alerta - HBPE e raro e geralmente indica doenca cardiaca significativa; requer investigacao',

    conduta: 'Sempre investigar cardiopatia estrutural (o fasciculo posterior e resistente - precisa doenca extensa para lesionar). Descartar outras causas de eixo para direita antes de diagnosticar HBPE. Se HBPE + BRD: alto risco de progressao para BAVT - monitorar de perto.',

    tratamentoAgudo: [
      '1. HBPE e diagnostico de exclusao - primeiro descarte outras causas de eixo para direita:',
      '   - Excluir hipertrofia de VD (ecocardiograma)',
      '   - Excluir DPOC/cor pulmonale (historia clinica, radiografia)',
      '   - Excluir TEP (D-dimero, angiotomografia se suspeita)',
      '   - Excluir coracao verticalizado (biotipo)',
      '   - Excluir hipercalemia (potassio serico)',
      '2. Investigar cardiopatia de base:',
      '   - Ecocardiograma (funcao VE, cardiopatia estrutural)',
      '   - Investigar doenca coronariana (HBPE frequentemente indica DAC extensa)',
      '3. Se HBPE + BRD (bifascicular):',
      '   - Alto risco de progressao para BAVT',
      '   - Holter para BAV paroxistico',
      '   - Considerar estudo eletrofisiologico',
      '   - Avaliacao para marcapasso profilatico',
      '4. Se HBPE + BRD + BAV 1o (trifascicular):',
      '   - Risco muito alto de BAVT',
      '   - Considerar marcapasso definitivo'
    ],

    criteriosEncaminhamento: [
      'TODO paciente com HBPE deve ser investigado (e raro e indica doenca significativa)',
      'HBPE + BRD: acompanhamento cardiologico proximo',
      'HBPE + BRD + BAV 1o: avaliacao urgente para marcapasso',
      'Sincope em paciente com HBPE: avaliacao para marcapasso/CDI',
      'HBPE novo: investigar doenca coronariana e cardiopatia estrutural',
      'HBPE + sintomas cardiovasculares'
    ],

    redFlags: [
      'HBPE em si ja e red flag - indica doenca cardiaca significativa',
      'HBPE + BRD = bloqueio bifascicular de maior risco que BRD + HBAE',
      'HBPE + BRD + BAV 1o = trifascicular (risco muito alto de BAVT subito)',
      'HBPE + sincope - avaliar urgentemente para marcapasso',
      'HBPE novo apos IAM - indica infarto extenso',
      'HBPE + disfuncao ventricular esquerda',
      'Eixo extremamente para direita (> +150) - pode indicar doenca muito extensa'
    ],

    dicasParaNaoEspecialista: [
      'HBPE e MUITO mais raro que HBAE - sempre investigue',
      'HBPE = desvio de eixo para DIREITA + QRS estreito + rS em DI + qR em inferiores',
      'Antes de diagnosticar HBPE, EXCLUA outras causas de eixo para direita',
      'As outras causas sao mais comuns: HVD, DPOC, TEP, biotipo longilíneo, hipercalemia',
      'Se encontrar HBPE verdadeiro, o paciente provavelmente tem doenca cardiaca seria',
      'HBPE + BRD e combinacao de maior risco que BRD + HBAE',
      'Ondas q em DII, DIII, aVF no HBPE NAO indicam infarto - fazem parte do padrao',
      'Sempre faca ecocardiograma em paciente com HBPE'
    ],

    diagnosticoDiferencial: [
      'Hipertrofia ventricular direita (sinais de sobrecarga de VD no eco)',
      'DPOC com cor pulmonale (historia clinica, enfisema)',
      'Tromboembolismo pulmonar (contexto clinico, D-dimero)',
      'Coracao verticalizado em longilineos',
      'Hipercalemia (ondas T apiculadas, outras alteracoes)',
      'Dextrocardia',
      'Variante normal em biotipo longilíneo jovem'
    ],

    prognostico: 'Reservado em relacao ao HBAE porque HBPE geralmente indica doenca cardiaca mais extensa. Risco de progressao para BAVT e maior quando associado a BRD (3-5% ao ano vs 1-2% para BRD + HBAE). O prognostico e determinado principalmente pela cardiopatia de base.',

    indicacaoMarcapasso: {
      indicado: false,
      classe: 'III',
      detalhes: 'Marcapasso NAO e indicado para HBPE isolado assintomatico. Quando HBPE + BRD (bifascicular) + sincope inexplicada, o risco e considerado alto, e marcapasso pode ser indicado mesmo sem estudo eletrofisiologico positivo (Classe IIa). HBPE + BRD + BAV intermitente documentado = marcapasso indicado (Classe I).'
    },

    tags: ['hemibloqueio', 'fascicular', 'posterior', 'esquerdo', 'HBPE', 'eixo direito', 'raro'],

    citations: [
      {
        refId: 'kusumoto-bradycardia-2019',
        authors: ['Kusumoto FM', 'Schoenfeld MH', 'Barrett C', 'et al.'],
        title: '2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia and Cardiac Conduction Delay',
        journal: 'Circulation',
        year: 2019,
        volume: '140',
        pages: 'e506-e522',
        doi: '10.1161/CIR.0000000000000628',
        pmid: '30586772'
      },
      {
        refId: 'surawicz-ecg-2009',
        authors: ['Surawicz B', 'Childers R', 'Deal BJ', 'et al.'],
        title: 'AHA/ACCF/HRS Recommendations for the Standardization and Interpretation of the Electrocardiogram: Part III',
        journal: 'Circulation',
        year: 2009,
        volume: '119',
        pages: 'e235-e240',
        doi: '10.1161/CIRCULATIONAHA.108.191095',
        pmid: '19228822'
      },
      {
        refId: 'elizari-fascicular-2007',
        authors: ['Elizari MV', 'Acunzo RS', 'Ferreiro M'],
        title: 'Hemiblocks Revisited',
        journal: 'Circulation',
        year: 2007,
        volume: '115',
        pages: '1154-1163',
        doi: '10.1161/CIRCULATIONAHA.106.637389',
        pmid: '17339568'
      },
      {
        refId: 'demoulin-lpfb-1972',
        authors: ['Demoulin JC', 'Kulbertus HE'],
        title: 'Histopathological Examination of Concept of Left Hemiblock',
        journal: 'British Heart Journal',
        year: 1972,
        volume: '34',
        pages: '807-814',
        doi: '10.1136/hrt.34.8.807',
        pmid: '5070112'
      }
    ]
  }
];

// =============================================================================
// FUNCOES AUXILIARES
// =============================================================================

/**
 * Obter padrao de bloqueio por ID
 */
export function getBloqueioById(id: string): ECGPattern | undefined {
  return bloqueiosConducao.find(b => b.id === id);
}

/**
 * Obter bloqueios por subcategoria
 */
export function getBloqueiosBySubcategoria(subcategoria: CategoriaBloqueio): ECGPattern[] {
  return bloqueiosConducao.filter(b => b.subcategoria === subcategoria);
}

/**
 * Obter bloqueios por nivel de urgencia
 */
export function getBloqueiosByUrgencia(urgencia: NivelUrgencia): ECGPattern[] {
  return bloqueiosConducao.filter(b => b.urgencia === urgencia);
}

/**
 * Obter bloqueios que requerem marcapasso
 */
export function getBloqueiosComIndicacaoMarcapasso(): ECGPattern[] {
  return bloqueiosConducao.filter(b => b.indicacaoMarcapasso?.indicado === true);
}

/**
 * Verificar se bloqueio e emergencia (urgencia 1)
 */
export function isEmergencia(pattern: ECGPattern): boolean {
  return pattern.urgencia === 1;
}

/**
 * Verificar se bloqueio e urgente (urgencia 1 ou 2)
 */
export function isUrgente(pattern: ECGPattern): boolean {
  return pattern.urgencia <= 2;
}

// =============================================================================
// EXPORTACAO DEFAULT
// =============================================================================

export default bloqueiosConducao;
