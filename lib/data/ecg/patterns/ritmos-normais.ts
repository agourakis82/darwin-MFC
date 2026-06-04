/**
 * RITMOS NORMAIS - ECG PATTERNS MODULE - DARWIN-MFC
 * ==================================================
 *
 * Padrões eletrocardiográficos normais e variantes fisiológicas
 * Dados com rigor acadêmico Q1 (Nature/Cell level)
 *
 * Referências principais:
 * - AHA/ACC/HRS Guidelines for ECG Interpretation
 * - Braunwald's Heart Disease
 * - Goldberger's Clinical Electrocardiography
 *
 * @module lib/data/ecg/patterns/ritmos-normais
 * @version 1.0.0
 * @lastUpdate 2025-01
 */

import type { Citation } from '../../../types/references';
import type { GradeEvidenceLevel, StudyType } from '../../../types/evidence';

// =============================================================================
// TIPOS E INTERFACES
// =============================================================================

/**
 * Categoria do padrão ECG
 */
export type CategoriaECG =
  | 'normal'
  | 'arritmia_supraventricular'
  | 'arritmia_ventricular'
  | 'disturbio_conducao'
  | 'isquemia'
  | 'sobrecarga'
  | 'outros';

/**
 * Regularidade do ritmo
 */
export type RegularidadeRitmo =
  | 'regular'
  | 'regularmente_irregular'
  | 'irregularmente_irregular';

/**
 * Morfologia da onda P
 */
export interface MorfologiaOndaP {
  presente: boolean;
  morfologia: string;
  eixo?: string;
  duracao?: string;
  amplitude?: string;
  relacaoComQRS?: string;
}

/**
 * Características do complexo QRS
 */
export interface CaracteristicasQRS {
  duracao: string;
  morfologia: string;
  eixo?: string;
  amplitude?: string;
}

/**
 * Características completas do ECG
 */
export interface CaracteristicasECG {
  frequencia: {
    minima?: number;
    maxima?: number;
    tipica?: string;
    descricao: string;
  };
  ritmo: RegularidadeRitmo;
  ondaP: MorfologiaOndaP;
  intervaloPR: {
    duracao: string;
    constante: boolean;
    descricao?: string;
  };
  complexoQRS: CaracteristicasQRS;
  intervaloQT?: {
    duracao: string;
    QTc?: string;
    descricao?: string;
  };
  segmentoST?: {
    caracteristica: string;
    descricao?: string;
  };
  ondaT?: {
    morfologia: string;
    eixo?: string;
    descricao?: string;
  };
}

/**
 * Red flag - sinal de alerta mesmo em ritmos "normais"
 */
export interface RedFlag {
  condicao: string;
  significado: string;
  conduta: string;
  urgencia: 'baixa' | 'moderada' | 'alta' | 'emergencia';
}

/**
 * Citação acadêmica para padrão ECG
 */
export interface ECGCitation extends Citation {
  evidenceLevel?: GradeEvidenceLevel;
  studyType?: StudyType;
}

/**
 * Interface principal para padrão de ritmo ECG
 */
export interface PadraoRitmoECG {
  /** Identificador único */
  id: string;

  /** Nome em português */
  nome: string;

  /** Nome internacional (inglês) */
  nomeInternacional: string;

  /** Sigla comum (se houver) */
  sigla?: string;

  /** Código SNOMED-CT */
  snomedCT?: string;

  /** Código ICD-11 */
  icd11?: string;

  /** Categoria do padrão */
  categoria: CategoriaECG;

  /** Definição/descrição detalhada */
  descricao: string;

  /** Critérios diagnósticos para identificação no ECG */
  criterios: string[];

  /** Características eletrocardiográficas detalhadas */
  caracteristicas: CaracteristicasECG;

  /** Causas fisiológicas (normais) */
  causasFisiologicas: string[];

  /** Causas patológicas (quando aplicável) */
  causasPatologicas?: string[];

  /** Significado clínico */
  significadoClinico: {
    resumo: string;
    detalhes: string[];
    prognostico?: string;
  };

  /** Conduta recomendada */
  conduta: {
    geral: string;
    investigacaoAdicional?: string[];
    tratamento?: string[];
    encaminhamento?: string;
  };

  /** Sinais de alerta - quando se preocupar mesmo em ritmo "normal" */
  redFlags: RedFlag[];

  /** Implicações para não-especialistas */
  implicacoesParaNaoEspecialista: {
    reconhecimento: string;
    acaoImediata: string;
    quandoEncaminhar: string[];
    errosComuns: string[];
  };

  /** Diagnóstico diferencial */
  diagnosticoDiferencial?: string[];

  /** Prevalência na população geral */
  prevalencia?: string;

  /** Imagem de referência (path) */
  imagemReferencia?: string;

  /** Tags para busca */
  tags: string[];

  /** Citações e referências */
  citations: ECGCitation[];

  /** Data da última atualização */
  lastUpdate: string;
}

// =============================================================================
// DADOS DOS RITMOS NORMAIS
// =============================================================================

export const ritmosNormais: PadraoRitmoECG[] = [
  // =========================================================================
  // 1. RITMO SINUSAL NORMAL
  // =========================================================================
  {
    id: 'ritmo-sinusal-normal',
    nome: 'Ritmo Sinusal Normal',
    nomeInternacional: 'Normal Sinus Rhythm',
    sigla: 'RSN',
    snomedCT: '426783006',
    icd11: 'BC80',
    categoria: 'normal',

    descricao: `O ritmo sinusal normal é o ritmo cardíaco fisiológico originado no nó sinusal (nó sinoatrial),
    localizado na junção entre a veia cava superior e o átrio direito. É caracterizado por ondas P positivas
    nas derivações inferiores (DII, DIII, aVF) e negativas em aVR, seguidas de complexos QRS estreitos com
    intervalo PR constante. Representa a ativação elétrica cardíaca normal, iniciando-se no nó sinusal,
    despolarizando os átrios (onda P), passando pelo nó atrioventricular com atraso fisiológico (intervalo PR),
    e então despolarizando os ventrículos através do sistema His-Purkinje (complexo QRS).`,

    criterios: [
      'Frequência cardíaca entre 60-100 bpm',
      'Onda P positiva em DII, DIII e aVF',
      'Onda P negativa em aVR',
      'Onda P de morfologia constante (monomorfica)',
      'Uma onda P precedendo cada complexo QRS',
      'Intervalo PR entre 120-200 ms (0,12-0,20s), constante',
      'Complexo QRS < 120 ms (< 0,12s)',
      'Ritmo regular (variação RR < 10%)',
    ],

    caracteristicas: {
      frequencia: {
        minima: 60,
        maxima: 100,
        tipica: '60-100 bpm',
        descricao: 'Frequência cardíaca dentro da faixa normal de repouso para adultos',
      },
      ritmo: 'regular',
      ondaP: {
        presente: true,
        morfologia: 'Arredondada, de baixa amplitude, monofásica ou bifásica',
        eixo: '0° a +75° (positiva em DI, DII, aVF; negativa em aVR)',
        duracao: '< 120 ms (< 0,12s)',
        amplitude: '< 2,5 mm em DII',
        relacaoComQRS: '1:1 - cada onda P é seguida por um complexo QRS',
      },
      intervaloPR: {
        duracao: '120-200 ms (0,12-0,20s)',
        constante: true,
        descricao: 'Representa o tempo de condução atrioventricular normal',
      },
      complexoQRS: {
        duracao: '< 120 ms (< 0,12s)',
        morfologia: 'Estreito, com progressão normal de R nas derivações precordiais',
        eixo: '-30° a +90° (normal)',
        amplitude: 'Variável conforme derivação e biótipo',
      },
      intervaloQT: {
        duracao: 'QT < 440-450 ms',
        QTc: 'QTc < 440 ms (homens), < 460 ms (mulheres)',
        descricao: 'Corrigido pela frequência cardíaca (fórmula de Bazett)',
      },
      segmentoST: {
        caracteristica: 'Isoelétrico',
        descricao: 'No mesmo nível da linha de base (segmento TP)',
      },
      ondaT: {
        morfologia: 'Assimétrica, com ramo ascendente mais lento',
        eixo: 'Geralmente concordante com QRS',
        descricao: 'Positiva na maioria das derivações, exceto aVR',
      },
    },

    causasFisiologicas: [
      'Estado basal de repouso em indivíduo saudável',
      'Automatismo normal do nó sinusal',
      'Balanço autonômico (simpático/parassimpático) equilibrado',
      'Modulação fisiológica pela respiração (variação RR normal)',
    ],

    significadoClinico: {
      resumo: 'Padrão eletrocardiográfico normal, indicando função elétrica cardíaca adequada',
      detalhes: [
        'Indica integridade do sistema de condução cardíaco',
        'Nó sinusal funcionando como marca-passo dominante',
        'Condução atrioventricular preservada',
        'Despolarização ventricular normal',
        'Não exclui doença cardíaca estrutural',
      ],
      prognostico: 'Excelente quando isolado, sem alterações estruturais associadas',
    },

    conduta: {
      geral: 'Achado normal - não requer intervenção específica',
      investigacaoAdicional: [
        'Considerar ecocardiograma se sintomas cardíacos presentes',
        'Avaliar fatores de risco cardiovascular',
        'Monitorização ambulatorial se palpitações intermitentes',
      ],
    },

    redFlags: [
      {
        condicao: 'Síncope ou pré-síncope com ECG normal',
        significado: 'Pode indicar arritmia paroxística ou outra causa não detectada no ECG de repouso',
        conduta: 'Holter 24h ou monitor de eventos, considerar tilt test',
        urgencia: 'moderada',
      },
      {
        condicao: 'Dor torácica típica com ECG normal',
        significado: 'Não exclui síndrome coronariana aguda - ECG pode ser normal em até 6% dos casos',
        conduta: 'Seriação de troponina, observação, considerar teste de estresse',
        urgencia: 'alta',
      },
      {
        condicao: 'Dispneia inexplicada com ECG normal',
        significado: 'Investigar causas cardíacas estruturais (IC diastólica, valvopatias)',
        conduta: 'Ecocardiograma, BNP/NT-proBNP',
        urgencia: 'moderada',
      },
      {
        condicao: 'História familiar de morte súbita com ECG aparentemente normal',
        significado: 'Pode haver canalopatias ou cardiomiopatias não detectáveis no ECG basal',
        conduta: 'Encaminhamento para cardiologia/arritmologia, considerar teste genético',
        urgencia: 'moderada',
      },
    ],

    implicacoesParaNaoEspecialista: {
      reconhecimento: 'Identificar ritmo regular com ondas P antes de cada QRS, FC 60-100 bpm',
      acaoImediata: 'Documentar e incluir no prontuário como achado normal',
      quandoEncaminhar: [
        'Sintomas cardiovasculares persistentes apesar de ECG normal',
        'História familiar de cardiopatia ou morte súbita',
        'Alterações sutis que geram dúvida na interpretação',
        'Necessidade de estratificação de risco pré-operatório em pacientes de alto risco',
      ],
      errosComuns: [
        'Assumir que ECG normal exclui toda doença cardíaca',
        'Não correlacionar com o quadro clínico do paciente',
        'Ignorar alterações sutis do segmento ST ou onda T',
        'Não considerar variação normal relacionada à idade e biótipo',
      ],
    },

    diagnosticoDiferencial: [
      'Ritmo atrial ectópico (onda P de morfologia diferente)',
      'Ritmo juncional acelerado (sem onda P ou P retrógrada)',
      'Bradicardia sinusal (se FC < 60)',
      'Taquicardia sinusal (se FC > 100)',
    ],

    prevalencia: 'Encontrado em >90% dos indivíduos saudáveis em repouso',

    tags: [
      'normal',
      'sinusal',
      'fisiológico',
      'baseline',
      'referência',
      'nó sinoatrial',
    ],

    citations: [
      {
        refId: 'ecg-aha-2009',
        authors: ['Kligfield P', 'Gettes LS', 'Bailey JJ', 'et al.'],
        title: 'Recommendations for the Standardization and Interpretation of the Electrocardiogram: Part I',
        journal: 'Circulation',
        year: 2007,
        volume: '115',
        pages: '1306-1324',
        doi: '10.1161/CIRCULATIONAHA.106.180200',
        pmid: '17322457',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
      {
        refId: 'ecg-braunwald-2018',
        authors: ['Zipes DP', 'Libby P', 'Bonow RO', 'Mann DL', 'Tomaselli GF'],
        title: 'Braunwald\'s Heart Disease: A Textbook of Cardiovascular Medicine',
        journal: 'Elsevier',
        year: 2018,
        volume: '11th Edition',
        pages: 'Chapter 35',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
      {
        refId: 'ecg-goldberger-2017',
        authors: ['Goldberger AL', 'Goldberger ZD', 'Shvilkin A'],
        title: 'Goldberger\'s Clinical Electrocardiography: A Simplified Approach',
        journal: 'Elsevier',
        year: 2017,
        volume: '9th Edition',
        evidenceLevel: 'B',
        studyType: 'Guideline',
      },
    ],

    lastUpdate: '2025-01',
  },

  // =========================================================================
  // 2. BRADICARDIA SINUSAL
  // =========================================================================
  {
    id: 'bradicardia-sinusal',
    nome: 'Bradicardia Sinusal',
    nomeInternacional: 'Sinus Bradycardia',
    sigla: 'BS',
    snomedCT: '49710005',
    icd11: 'BC81.0',
    categoria: 'normal',

    descricao: `A bradicardia sinusal é definida como ritmo sinusal com frequência cardíaca inferior a 60 batimentos
    por minuto. Representa uma variante fisiológica extremamente comum, especialmente em indivíduos com bom
    condicionamento físico, durante o sono, ou sob influência de tônus vagal aumentado. Mantém todas as
    características do ritmo sinusal normal (ondas P sinusais, intervalo PR constante, QRS estreito),
    diferindo apenas pela frequência reduzida. É o resultado da diminuição da taxa de despolarização
    espontânea do nó sinusal, seja por aumento do tônus parassimpático, diminuição do tônus simpático,
    ou doença intrínseca do nó sinusal.`,

    criterios: [
      'Frequência cardíaca < 60 bpm',
      'Todos os critérios de ritmo sinusal presentes',
      'Onda P positiva em DII, DIII, aVF e negativa em aVR',
      'Onda P de morfologia constante',
      'Uma onda P precedendo cada complexo QRS',
      'Intervalo PR entre 120-200 ms, constante',
      'Complexo QRS < 120 ms',
      'Ritmo regular',
    ],

    caracteristicas: {
      frequencia: {
        minima: 30,
        maxima: 59,
        tipica: '40-59 bpm',
        descricao: 'Frequência abaixo do limite inferior normal, podendo chegar a 30-40 bpm em atletas',
      },
      ritmo: 'regular',
      ondaP: {
        presente: true,
        morfologia: 'Sinusal normal - arredondada, monofásica',
        eixo: '0° a +75°',
        duracao: '< 120 ms',
        amplitude: '< 2,5 mm em DII',
        relacaoComQRS: '1:1',
      },
      intervaloPR: {
        duracao: '120-200 ms (pode ser ligeiramente mais longo no limite superior)',
        constante: true,
        descricao: 'Condução AV preservada',
      },
      complexoQRS: {
        duracao: '< 120 ms',
        morfologia: 'Normal, estreito',
        eixo: 'Normal (-30° a +90°)',
      },
      intervaloQT: {
        duracao: 'QT absoluto aumentado proporcionalmente à bradicardia',
        QTc: 'QTc deve permanecer normal após correção',
        descricao: 'Usar fórmula de correção apropriada (Bazett tem limitações em bradicardia)',
      },
      segmentoST: {
        caracteristica: 'Isoelétrico',
      },
      ondaT: {
        morfologia: 'Normal',
      },
    },

    causasFisiologicas: [
      'Condicionamento físico/atletas (bradicardia de treinamento)',
      'Sono (aumento do tônus vagal noturno)',
      'Tônus vagal aumentado constitucional',
      'Manobras vagais (Valsalva, massagem do seio carotídeo)',
      'Reflexo oculocardíaco',
      'Hipotermia leve fisiológica',
      'Jovens saudáveis em repouso',
    ],

    causasPatologicas: [
      'Doença do nó sinusal (síndrome bradi-taqui)',
      'Hipotireoidismo',
      'Hipotermia patológica',
      'Hipertensão intracraniana (reflexo de Cushing)',
      'Infarto agudo do miocárdio (especialmente inferior)',
      'Miocardite',
      'Drogas: betabloqueadores, bloqueadores de canal de cálcio, digoxina, amiodarona',
      'Distúrbios eletrolíticos (hipercalemia)',
      'Icterícia obstrutiva (sais biliares)',
      'Apneia obstrutiva do sono',
    ],

    significadoClinico: {
      resumo: 'Frequentemente benigna em assintomáticos; investigar causa se sintomática',
      detalhes: [
        'Em atletas: adaptação fisiológica ao treinamento, sem significado patológico',
        'Durante o sono: variação circadiana normal do tônus autonômico',
        'Se sintomática: pode indicar doença do nó sinusal ou causa secundária',
        'Avaliar sempre o contexto clínico e uso de medicamentos',
        'Bradicardia extrema (< 40 bpm) em não-atletas merece investigação',
      ],
      prognostico: 'Excelente se assintomática e sem cardiopatia estrutural',
    },

    conduta: {
      geral: 'Assintomática: observação, sem necessidade de tratamento',
      investigacaoAdicional: [
        'TSH se suspeita de hipotireoidismo',
        'Holter 24h se sintomas intermitentes',
        'Revisar lista de medicamentos',
        'Ecocardiograma se suspeita de cardiopatia estrutural',
        'Teste ergométrico para avaliar resposta cronotrópica',
      ],
      tratamento: [
        'Suspender/ajustar medicamentos bradicardizantes se aplicável',
        'Tratar causa base (ex: reposição hormonal no hipotireoidismo)',
        'Atropina IV em bradicardia sintomática aguda',
        'Marca-passo temporário em casos refratários',
        'Marca-passo definitivo se doença do nó sinusal sintomática',
      ],
      encaminhamento: 'Cardiologia se sintomática, refratária ou associada a pausas',
    },

    redFlags: [
      {
        condicao: 'Bradicardia com síncope ou pré-síncope',
        significado: 'Pode indicar pausas sinusais prolongadas ou bloqueio AV associado',
        conduta: 'Internação, monitorização contínua, Holter, avaliação para marca-passo',
        urgencia: 'alta',
      },
      {
        condicao: 'FC < 40 bpm com sintomas (tontura, fadiga, dispneia)',
        significado: 'Baixo débito cardíaco secundário à bradicardia',
        conduta: 'Atropina, considerar marca-passo temporário',
        urgencia: 'alta',
      },
      {
        condicao: 'Bradicardia com pausas > 3 segundos',
        significado: 'Doença do nó sinusal avançada',
        conduta: 'Indicação de marca-passo definitivo',
        urgencia: 'alta',
      },
      {
        condicao: 'Bradicardia no contexto de IAM inferior',
        significado: 'Isquemia do nó sinusal ou reflexo de Bezold-Jarisch',
        conduta: 'Monitorização em UTI coronariana, atropina se sintomática',
        urgencia: 'emergencia',
      },
      {
        condicao: 'Incompetência cronotrópica ao esforço',
        significado: 'Incapacidade de aumentar FC adequadamente, limitação funcional',
        conduta: 'Teste ergométrico, considerar marca-passo com sensor de atividade',
        urgencia: 'moderada',
      },
    ],

    implicacoesParaNaoEspecialista: {
      reconhecimento: 'Ritmo sinusal com FC < 60 bpm; verificar se paciente está assintomático',
      acaoImediata: 'Correlacionar com quadro clínico; verificar medicamentos em uso',
      quandoEncaminhar: [
        'Síncope ou pré-síncope',
        'FC < 40 bpm em não-atletas',
        'Sintomas de baixo débito (fadiga, dispneia aos esforços)',
        'Pausas sinusais documentadas',
        'Incompetência cronotrópica limitando atividades',
      ],
      errosComuns: [
        'Tratar bradicardia assintomática em atletas',
        'Não revisar medicamentos antes de investigar causas',
        'Ignorar sintomas associados à bradicardia',
        'Não reconhecer incompetência cronotrópica',
        'Usar fórmula de Bazett para QTc em bradicardia (superestima)',
      ],
    },

    diagnosticoDiferencial: [
      'Ritmo juncional (ondas P ausentes ou retrógradas)',
      'Bloqueio sinoatrial (pausas múltiplas do ciclo PP)',
      'Ritmo de escape ventricular (QRS alargado)',
      'Bloqueio AV de alto grau com escape juncional',
    ],

    prevalencia: '15-25% da população geral; até 50-85% em atletas de elite',

    tags: [
      'bradicardia',
      'sinusal',
      'atletas',
      'vagal',
      'fisiológico',
      'marca-passo',
    ],

    citations: [
      {
        refId: 'bradicardia-esc-2021',
        authors: ['Glikson M', 'Nielsen JC', 'Kronborg MB', 'et al.'],
        title: '2021 ESC Guidelines on cardiac pacing and cardiac resynchronization therapy',
        journal: 'European Heart Journal',
        year: 2021,
        volume: '42',
        pages: '3427-3520',
        doi: '10.1093/eurheartj/ehab364',
        pmid: '34455430',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
      {
        refId: 'bradicardia-athletes-2017',
        authors: ['Sharma S', 'Drezner JA', 'Baggish A', 'et al.'],
        title: 'International recommendations for electrocardiographic interpretation in athletes',
        journal: 'European Heart Journal',
        year: 2018,
        volume: '39',
        pages: '1466-1480',
        doi: '10.1093/eurheartj/ehw631',
        pmid: '28329355',
        evidenceLevel: 'A',
        studyType: 'Consensus',
      },
      {
        refId: 'bradicardia-prevalence-2019',
        authors: ['Spodick DH', 'Raju P', 'Bishop RL', 'Rifkin RD'],
        title: 'Operational definition of normal sinus heart rate',
        journal: 'American Journal of Cardiology',
        year: 1992,
        volume: '69',
        pages: '1245-1246',
        doi: '10.1016/0002-9149(92)90947-w',
        pmid: '1575201',
        evidenceLevel: 'B',
        studyType: 'Observational',
      },
    ],

    lastUpdate: '2025-01',
  },

  // =========================================================================
  // 3. TAQUICARDIA SINUSAL
  // =========================================================================
  {
    id: 'taquicardia-sinusal',
    nome: 'Taquicardia Sinusal',
    nomeInternacional: 'Sinus Tachycardia',
    sigla: 'TS',
    snomedCT: '11092001',
    icd11: 'BC81.1',
    categoria: 'normal',

    descricao: `A taquicardia sinusal é definida como ritmo sinusal com frequência cardíaca superior a 100 batimentos
    por minuto em adultos. Representa uma resposta fisiológica apropriada a diversos estímulos, incluindo exercício,
    estresse, febre, dor, ansiedade, hipovolemia, anemia e hipertireoidismo. Mantém todas as características
    do ritmo sinusal (ondas P de morfologia sinusal precedendo cada QRS), diferindo apenas pela frequência elevada.
    A taquicardia sinusal é mediada pelo aumento da atividade simpática e/ou diminuição do tônus parassimpático,
    resultando em aumento da taxa de despolarização espontânea do nó sinusal. Deve-se sempre buscar e tratar
    a causa subjacente, não a taquicardia em si.`,

    criterios: [
      'Frequência cardíaca > 100 bpm (geralmente até 150-180 bpm)',
      'Todos os critérios de ritmo sinusal presentes',
      'Onda P positiva em DII, DIII, aVF e negativa em aVR',
      'Onda P de morfologia constante',
      'Uma onda P precedendo cada complexo QRS',
      'Intervalo PR entre 120-200 ms (pode encurtar ligeiramente)',
      'Complexo QRS < 120 ms',
      'Ritmo regular',
      'Início e término graduais (não paroxísticos)',
    ],

    caracteristicas: {
      frequencia: {
        minima: 101,
        maxima: 180,
        tipica: '100-150 bpm',
        descricao: 'FC máxima teórica: 220 - idade; TS raramente excede 90% da FC máxima',
      },
      ritmo: 'regular',
      ondaP: {
        presente: true,
        morfologia: 'Sinusal, pode ter amplitude aumentada com a taquicardia',
        eixo: '0° a +75°',
        duracao: '< 120 ms',
        amplitude: 'Pode estar aumentada devido ao tônus simpático',
        relacaoComQRS: '1:1',
      },
      intervaloPR: {
        duracao: '120-200 ms (pode encurtar para 100-120 ms em taquicardias mais rápidas)',
        constante: true,
        descricao: 'Encurtamento proporcional à FC devido à condução AV acelerada',
      },
      complexoQRS: {
        duracao: '< 120 ms',
        morfologia: 'Normal, estreito',
        eixo: 'Normal',
      },
      intervaloQT: {
        duracao: 'QT absoluto encurtado',
        QTc: 'QTc deve permanecer normal após correção',
        descricao: 'Encurtamento fisiológico proporcional à frequência',
      },
      segmentoST: {
        caracteristica: 'Geralmente isoelétrico; pode haver infradesnível ascendente ("de esforço")',
        descricao: 'Infradesnível descendente ou horizontal sugere isquemia',
      },
      ondaT: {
        morfologia: 'Pode ter amplitude aumentada',
        descricao: 'Avaliar com cautela no contexto de possível isquemia',
      },
    },

    causasFisiologicas: [
      'Exercício físico',
      'Estresse emocional/ansiedade',
      'Dor',
      'Cafeína, estimulantes',
      'Gravidez (aumento do volume plasmático)',
      'Período pós-prandial',
      'Posição ortostática em alguns indivíduos',
    ],

    causasPatologicas: [
      'Febre/infecção',
      'Hipovolemia/desidratação',
      'Anemia',
      'Hipertireoidismo',
      'Hipóxia',
      'Insuficiência cardíaca',
      'Embolia pulmonar',
      'Síndrome coronariana aguda',
      'Sepse',
      'Drogas: simpatomiméticos, anticolinérgicos, abstinência de betabloqueadores',
      'Feocromocitoma',
      'Síndrome de taquicardia postural ortostática (POTS)',
      'Taquicardia sinusal inapropriada (diagnóstico de exclusão)',
    ],

    significadoClinico: {
      resumo: 'Resposta fisiológica apropriada; sempre investigar e tratar causa subjacente',
      detalhes: [
        'É um sinal de alerta, não uma doença primária',
        'Pode ser o primeiro indício de condição grave (sepse, EP, IAM)',
        'Taquicardia persistente pode levar à cardiomiopatia induzida por taquicardia',
        'Em IC, correlaciona-se com pior prognóstico',
        'Taquicardia sinusal inapropriada: diagnóstico de exclusão, frequência desproporcional',
      ],
      prognostico: 'Depende da causa subjacente; geralmente favorável se causa tratável',
    },

    conduta: {
      geral: 'Identificar e tratar a causa subjacente; não tratar a taquicardia isoladamente',
      investigacaoAdicional: [
        'Hemograma completo (anemia)',
        'TSH (hipertireoidismo)',
        'Eletrólitos e função renal',
        'Gasometria arterial se hipóxia suspeitada',
        'D-dímero/angiotomografia se suspeita de EP',
        'Troponina se suspeita de SCA',
        'Ecocardiograma se IC suspeitada',
        'Lactato se suspeita de sepse',
      ],
      tratamento: [
        'Tratar causa base (febre: antipiréticos; hipovolemia: hidratação)',
        'Betabloqueadores apenas se indicação específica (ex: hipertireoidismo, IC)',
        'Evitar bloqueadores AV em taquicardia compensatória',
        'Em POTS: medidas conservadoras, midodrina, fludrocortisona',
        'Em taquicardia sinusal inapropriada: ivabradina off-label',
      ],
      encaminhamento: 'Cardiologia se persistente sem causa aparente ou taquicardia sinusal inapropriada',
    },

    redFlags: [
      {
        condicao: 'Taquicardia com hipotensão',
        significado: 'Choque (séptico, hipovolêmico, cardiogênico, obstrutivo)',
        conduta: 'Ressuscitação volêmica, vasopressores, identificar causa',
        urgencia: 'emergencia',
      },
      {
        condicao: 'Taquicardia + dispneia + dor torácica pleurítica',
        significado: 'Alta probabilidade de embolia pulmonar',
        conduta: 'Angiotomografia, anticoagulação se confirmada',
        urgencia: 'emergencia',
      },
      {
        condicao: 'Taquicardia + febre + hipotensão + alteração do sensório',
        significado: 'Sepse/choque séptico',
        conduta: 'Protocolo de sepse: culturas, antibióticos, ressuscitação',
        urgencia: 'emergencia',
      },
      {
        condicao: 'Taquicardia desproporcional à febre',
        significado: 'Pode indicar complicação (abscesso, endocardite) ou causa adicional',
        conduta: 'Investigação ampliada, ecocardiograma se indicado',
        urgencia: 'alta',
      },
      {
        condicao: 'Taquicardia persistente em repouso sem causa identificável',
        significado: 'Taquicardia sinusal inapropriada, POTS, ou condição oculta',
        conduta: 'Investigação completa, Holter, tilt test, avaliação especializada',
        urgencia: 'moderada',
      },
    ],

    implicacoesParaNaoEspecialista: {
      reconhecimento: 'Ritmo sinusal regular com FC > 100 bpm; P antes de cada QRS',
      acaoImediata: 'Buscar causa subjacente; avaliar estabilidade hemodinâmica',
      quandoEncaminhar: [
        'Instabilidade hemodinâmica (UTI/emergência)',
        'Suspeita de causa cardíaca (SCA, IC, EP)',
        'Taquicardia persistente sem causa identificável',
        'Sintomas debilitantes associados',
      ],
      errosComuns: [
        'Tratar a taquicardia sem buscar a causa',
        'Usar betabloqueadores em taquicardia compensatória',
        'Confundir com flutter atrial 2:1 (ondas F em vez de P)',
        'Não considerar embolia pulmonar no diagnóstico diferencial',
        'Não reconhecer taquicardia como sinal de gravidade em sepse',
      ],
    },

    diagnosticoDiferencial: [
      'Flutter atrial com condução 2:1 (FC ~150 bpm, ondas F em "dente de serra")',
      'Taquicardia atrial (P de morfologia não-sinusal)',
      'Taquicardia por reentrada nodal (TRNAV - início e término súbitos)',
      'Taquicardia por via acessória (síndrome de WPW)',
      'Taquicardia juncional (sem onda P ou P retrógrada)',
    ],

    prevalencia: 'Extremamente comum; causa mais frequente de taquicardia em adultos',

    tags: [
      'taquicardia',
      'sinusal',
      'fisiológica',
      'febre',
      'ansiedade',
      'sepse',
      'embolia',
    ],

    citations: [
      {
        refId: 'taquicardia-acc-2015',
        authors: ['Page RL', 'Joglar JA', 'Caldwell MA', 'et al.'],
        title: '2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia',
        journal: 'Circulation',
        year: 2016,
        volume: '133',
        pages: 'e506-e574',
        doi: '10.1161/CIR.0000000000000311',
        pmid: '26399663',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
      {
        refId: 'taquicardia-sheldon-2015',
        authors: ['Sheldon RS', 'Grubb BP', 'Olshansky B', 'et al.'],
        title: '2015 Heart Rhythm Society Expert Consensus Statement on the Diagnosis and Treatment of Postural Tachycardia Syndrome',
        journal: 'Heart Rhythm',
        year: 2015,
        volume: '12',
        pages: 'e41-e63',
        doi: '10.1016/j.hrthm.2015.03.029',
        pmid: '25980576',
        evidenceLevel: 'B',
        studyType: 'Consensus',
      },
      {
        refId: 'taquicardia-still-2020',
        authors: ['Still AM', 'Raatikainen P', 'Ylitalo A', 'et al.'],
        title: 'Prevalence, characteristics and natural course of inappropriate sinus tachycardia',
        journal: 'Europace',
        year: 2005,
        volume: '7',
        pages: '104-112',
        doi: '10.1016/j.eupc.2004.12.007',
        pmid: '15763524',
        evidenceLevel: 'B',
        studyType: 'Observational',
      },
    ],

    lastUpdate: '2025-01',
  },

  // =========================================================================
  // 4. ARRITMIA SINUSAL RESPIRATÓRIA
  // =========================================================================
  {
    id: 'arritmia-sinusal-respiratoria',
    nome: 'Arritmia Sinusal Respiratória',
    nomeInternacional: 'Respiratory Sinus Arrhythmia',
    sigla: 'ASR',
    snomedCT: '61277005',
    icd11: 'BC81.Y',
    categoria: 'normal',

    descricao: `A arritmia sinusal respiratória é uma variação fisiológica normal da frequência cardíaca
    sincronizada com o ciclo respiratório. Durante a inspiração, a frequência cardíaca aumenta, e durante
    a expiração, diminui. Este fenômeno é mediado pela modulação autonômica cardíaca, especificamente
    pela variação do tônus vagal que acompanha a respiração. O estiramento dos receptores pulmonares
    durante a inspiração inibe o centro vagal, causando aumento da FC; na expiração, o tônus vagal
    é restaurado, reduzindo a FC. É mais proeminente em crianças e adultos jovens, e sua presença
    indica boa modulação autonômica cardíaca. A diminuição ou ausência da ASR pode indicar
    disfunção autonômica ou neuropatia.`,

    criterios: [
      'Variação da frequência cardíaca > 10% ou > 0,12s entre intervalos RR',
      'Variação cíclica correlacionada com a respiração',
      'Aumento da FC durante inspiração, diminuição durante expiração',
      'Todas as ondas P de morfologia sinusal',
      'Intervalo PR constante',
      'Complexo QRS normal',
      'Onda P precedendo cada complexo QRS',
    ],

    caracteristicas: {
      frequencia: {
        minima: 50,
        maxima: 100,
        tipica: '60-90 bpm com variação de 10-20%',
        descricao: 'FC média normal, mas com variação fásica respiratória',
      },
      ritmo: 'regularmente_irregular',
      ondaP: {
        presente: true,
        morfologia: 'Sinusal, constante em todos os batimentos',
        eixo: '0° a +75°',
        duracao: '< 120 ms',
        amplitude: 'Normal, < 2,5 mm',
        relacaoComQRS: '1:1 em todos os batimentos',
      },
      intervaloPR: {
        duracao: '120-200 ms',
        constante: true,
        descricao: 'PR constante apesar da variação do intervalo RR',
      },
      complexoQRS: {
        duracao: '< 120 ms',
        morfologia: 'Normal, estreito',
        eixo: 'Normal',
      },
      intervaloQT: {
        duracao: 'Varia ligeiramente com a FC',
        QTc: 'Normal quando corrigido',
      },
      segmentoST: {
        caracteristica: 'Isoelétrico',
      },
      ondaT: {
        morfologia: 'Normal',
      },
    },

    causasFisiologicas: [
      'Modulação autonômica cardíaca normal (acoplamento cardiorrespiratório)',
      'Reflexo de Bainbridge (aumento do retorno venoso na inspiração)',
      'Inibição vagal reflexa durante inspiração (receptores de estiramento pulmonar)',
      'Variação da pressão intratorácica com a respiração',
      'Mais pronunciada em crianças, adolescentes e adultos jovens',
      'Acentuada durante o sono e em estados de relaxamento',
      'Preservada em atletas (indica boa modulação autonômica)',
    ],

    causasPatologicas: [
      'A arritmia sinusal respiratória em si não é patológica',
      'Sua AUSÊNCIA pode indicar: neuropatia autonômica diabética, insuficiência cardíaca, envelhecimento, pós-infarto, uso de atropina/anticolinérgicos',
    ],

    significadoClinico: {
      resumo: 'Variante normal indicativa de boa modulação autonômica cardíaca; sua ausência pode ser patológica',
      detalhes: [
        'Sinal de integridade do sistema nervoso autonômico',
        'Mais proeminente em jovens - diminui com a idade',
        'Redução da variabilidade da FC é marcador de risco cardiovascular',
        'Ausência em diabéticos sugere neuropatia autonômica',
        'Preservação em atletas indica boa adaptação cardiovascular',
        'Pode ser confundida com outras arritmias por não-especialistas',
      ],
      prognostico: 'Excelente; sua presença é um bom sinal prognóstico',
    },

    conduta: {
      geral: 'Nenhum tratamento necessário - achado normal benigno',
      investigacaoAdicional: [
        'Nenhuma investigação necessária para a ASR em si',
        'Se AUSENTE em jovens ou diabéticos: avaliar neuropatia autonômica',
        'Testes de variabilidade da FC se indicado clinicamente',
      ],
      tratamento: [
        'Não requer tratamento',
        'Não usar medicamentos para "regularizar" o ritmo',
      ],
    },

    redFlags: [
      {
        condicao: 'Ausência de ASR em jovem saudável',
        significado: 'Pode indicar disfunção autonômica precoce',
        conduta: 'Avaliação cardiológica se outros sintomas autonômicos',
        urgencia: 'baixa',
      },
      {
        condicao: 'Ausência de ASR em diabético',
        significado: 'Sugere neuropatia autonômica cardíaca',
        conduta: 'Avaliação com testes autonômicos, controle glicêmico intensivo',
        urgencia: 'moderada',
      },
      {
        condicao: 'Variação RR muito acentuada com pausas > 2 segundos',
        significado: 'Pode não ser apenas ASR - considerar doença do nó sinusal',
        conduta: 'Holter 24h para caracterização',
        urgencia: 'moderada',
      },
      {
        condicao: 'Irregularidade não correlacionada com respiração',
        significado: 'Não é ASR - considerar outras arritmias (FA, extrassístoles)',
        conduta: 'Revisão diagnóstica, Holter se necessário',
        urgencia: 'moderada',
      },
    ],

    implicacoesParaNaoEspecialista: {
      reconhecimento: 'Ritmo "irregularmente regular" com ondas P sinusais; variação da FC com respiração',
      acaoImediata: 'Reconhecer como variante normal; tranquilizar o paciente',
      quandoEncaminhar: [
        'Dúvida diagnóstica (diferenciar de FA ou extrassístoles múltiplas)',
        'Variação extrema com pausas prolongadas',
        'Ausência de variabilidade da FC em contexto clínico relevante',
        'Sintomas associados (síncope, palpitações)',
      ],
      errosComuns: [
        'Confundir ASR com fibrilação atrial (FA é irregularmente irregular sem padrão)',
        'Confundir com extrassístoles atriais frequentes',
        'Tratar a "irregularidade" desnecessariamente',
        'Não reconhecer como achado normal em crianças/jovens',
        'Solicitar exames desnecessários',
      ],
    },

    diagnosticoDiferencial: [
      'Fibrilação atrial (ausência de ondas P, irregularidade sem padrão respiratório)',
      'Extrassístoles atriais frequentes (ondas P prematuras de morfologia diferente)',
      'Arritmia sinusal não-respiratória (sem correlação com ciclo respiratório)',
      'Marcapasso atrial migratório (mudança progressiva da morfologia da onda P)',
      'Bloqueio sinoatrial de segundo grau tipo I (Wenckebach)',
    ],

    prevalencia: 'Universal em crianças; presente em 90%+ dos jovens saudáveis; diminui com a idade',

    tags: [
      'arritmia',
      'sinusal',
      'respiratória',
      'fisiológica',
      'variabilidade',
      'autonômico',
      'benigna',
    ],

    citations: [
      {
        refId: 'asr-yasuma-2004',
        authors: ['Yasuma F', 'Hayano J'],
        title: 'Respiratory sinus arrhythmia: why does the heartbeat synchronize with respiratory rhythm?',
        journal: 'Chest',
        year: 2004,
        volume: '125',
        pages: '683-690',
        doi: '10.1378/chest.125.2.683',
        pmid: '14769752',
        evidenceLevel: 'B',
        studyType: 'SystematicReview',
      },
      {
        refId: 'asr-hrv-taskforce-1996',
        authors: ['Task Force of the European Society of Cardiology and the North American Society of Pacing and Electrophysiology'],
        title: 'Heart rate variability: standards of measurement, physiological interpretation and clinical use',
        journal: 'Circulation',
        year: 1996,
        volume: '93',
        pages: '1043-1065',
        doi: '10.1161/01.CIR.93.5.1043',
        pmid: '8598068',
        evidenceLevel: 'A',
        studyType: 'Consensus',
      },
      {
        refId: 'asr-diabetes-vinik-2003',
        authors: ['Vinik AI', 'Maser RE', 'Mitchell BD', 'Freeman R'],
        title: 'Diabetic autonomic neuropathy',
        journal: 'Diabetes Care',
        year: 2003,
        volume: '26',
        pages: '1553-1579',
        doi: '10.2337/diacare.26.5.1553',
        pmid: '12716821',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
    ],

    lastUpdate: '2025-01',
  },

  // =========================================================================
  // 5. RITMO SINUSAL COM PAUSA SINUSAL
  // =========================================================================
  {
    id: 'pausa-sinusal',
    nome: 'Ritmo Sinusal com Pausa Sinusal',
    nomeInternacional: 'Sinus Rhythm with Sinus Pause',
    sigla: 'PS',
    snomedCT: '251166008',
    icd11: 'BC81.2',
    categoria: 'normal',

    descricao: `A pausa sinusal (ou parada sinusal) é uma falha transitória do nó sinusal em gerar um impulso elétrico,
    resultando em uma pausa no ritmo cardíaco. Diferentemente do bloqueio sinoatrial (onde o impulso é gerado mas não
    conduzido), na pausa sinusal o nó sinusal simplesmente não dispara. Caracteriza-se por uma pausa no ECG que não é
    múltiplo do intervalo PP básico. Pausas curtas (< 2-3 segundos) podem ser fisiológicas, especialmente durante o
    sono ou em atletas com tônus vagal aumentado. Pausas mais prolongadas ou sintomáticas podem indicar doença do
    nó sinusal. O ritmo pode ser retomado pelo nó sinusal ou por um batimento de escape (juncional ou ventricular).`,

    criterios: [
      'Ritmo sinusal básico com todas as características normais',
      'Interrupção súbita com ausência de onda P e complexo QRS',
      'Duração da pausa NÃO é múltiplo do intervalo PP básico',
      'Retomada do ritmo sinusal ou batimento de escape após a pausa',
      'Se presente batimento de escape: QRS pode ser estreito (juncional) ou largo (ventricular)',
      'Ondas P após retomada mantêm morfologia sinusal',
    ],

    caracteristicas: {
      frequencia: {
        tipica: 'Variável - normal entre pausas',
        descricao: 'FC basal normal (60-100) com interrupções ocasionais',
      },
      ritmo: 'regularmente_irregular',
      ondaP: {
        presente: true,
        morfologia: 'Sinusal quando presente; AUSENTE durante a pausa',
        eixo: '0° a +75° (quando presente)',
        duracao: '< 120 ms',
        amplitude: 'Normal',
        relacaoComQRS: '1:1 exceto durante a pausa',
      },
      intervaloPR: {
        duracao: '120-200 ms (quando presente)',
        constante: true,
        descricao: 'Normal nos batimentos sinusais',
      },
      complexoQRS: {
        duracao: 'Sinusal: < 120 ms; Escape juncional: < 120 ms; Escape ventricular: > 120 ms',
        morfologia: 'Variável conforme origem do escape',
        eixo: 'Normal em batimentos sinusais',
      },
      intervaloQT: {
        duracao: 'Normal',
        QTc: 'Normal',
      },
      segmentoST: {
        caracteristica: 'Isoelétrico',
      },
      ondaT: {
        morfologia: 'Normal',
      },
    },

    causasFisiologicas: [
      'Tônus vagal aumentado (atletas, sono)',
      'Manobras vagais intensas (massagem do seio carotídeo, Valsalva)',
      'Reflexo vasovagal (síncope neurocardiogênica)',
      'Apneia do sono (pausas noturnas)',
      'Reação vagotônica a estímulos (intubação, sucção traqueal)',
    ],

    causasPatologicas: [
      'Doença do nó sinusal (síndrome bradi-taqui)',
      'Infarto agudo do miocárdio (especialmente inferior)',
      'Miocardite',
      'Drogas: betabloqueadores, bloqueadores de canal de cálcio, digoxina, amiodarona',
      'Hipercalemia grave',
      'Hipotireoidismo grave',
      'Hipertensão intracraniana',
      'Hipóxia',
      'Degeneração fibrótica do nó sinusal (idosos)',
    ],

    significadoClinico: {
      resumo: 'Pausas < 3s podem ser fisiológicas; pausas > 3s ou sintomáticas requerem investigação',
      detalhes: [
        'Pausas < 2 segundos: frequentemente benignas, especialmente durante sono',
        'Pausas 2-3 segundos: zona cinzenta - avaliar contexto e sintomas',
        'Pausas > 3 segundos: geralmente patológicas, indicam doença do nó sinusal',
        'Pausas sintomáticas (síncope, pré-síncope): sempre patológicas independente da duração',
        'Em atletas: pausas até 2-2,5 segundos durante sono podem ser aceitáveis',
        'Ausência de escape adequado aumenta risco de sintomas',
      ],
      prognostico: 'Depende da causa; doença do nó sinusal pode progredir e necessitar marca-passo',
    },

    conduta: {
      geral: 'Correlacionar duração das pausas com sintomas; pausas breves assintomáticas geralmente benignas',
      investigacaoAdicional: [
        'Holter 24-48h ou 7 dias para documentar pausas e correlacionar com sintomas',
        'Monitor de eventos ou loop recorder implantável se sintomas esporádicos',
        'Revisar medicamentos em uso',
        'TSH (hipotireoidismo)',
        'Eletrólitos (hipercalemia)',
        'Estudo eletrofisiológico se dúvida diagnóstica',
        'Ecocardiograma para avaliar cardiopatia estrutural',
      ],
      tratamento: [
        'Suspender/ajustar medicamentos bradicardizantes',
        'Tratar causa base (hipotireoidismo, distúrbios eletrolíticos)',
        'Atropina IV em pausas sintomáticas agudas',
        'Marca-passo temporário em pausas prolongadas sintomáticas',
        'Marca-passo definitivo se doença do nó sinusal sintomática',
      ],
      encaminhamento: 'Cardiologia/arritmologia se pausas > 3s ou sintomáticas',
    },

    redFlags: [
      {
        condicao: 'Pausa > 3 segundos documentada',
        significado: 'Doença do nó sinusal significativa',
        conduta: 'Avaliação para marca-passo definitivo',
        urgencia: 'alta',
      },
      {
        condicao: 'Pausa associada a síncope',
        significado: 'Pausa cardioinibitória causando hipoperfusão cerebral',
        conduta: 'Internação, monitorização, avaliação para marca-passo',
        urgencia: 'alta',
      },
      {
        condicao: 'Pausas recorrentes com pré-síncope',
        significado: 'Doença do nó sinusal sintomática',
        conduta: 'Holter prolongado, considerar marca-passo',
        urgencia: 'alta',
      },
      {
        condicao: 'Ausência de escape juncional/ventricular durante pausa prolongada',
        significado: 'Disfunção dos marca-passos subsidiários, maior risco de assistolia',
        conduta: 'Avaliação urgente, provável indicação de marca-passo',
        urgencia: 'emergencia',
      },
      {
        condicao: 'Pausa no contexto de IAM inferior',
        significado: 'Isquemia do nó sinusal ou alto tônus vagal',
        conduta: 'Monitorização em UTI, atropina disponível, considerar marca-passo temporário',
        urgencia: 'emergencia',
      },
    ],

    implicacoesParaNaoEspecialista: {
      reconhecimento: 'Ritmo sinusal com "buracos" - ausência de P e QRS por período; intervalo da pausa não é múltiplo do PP basal',
      acaoImediata: 'Medir duração da pausa; correlacionar com sintomas; verificar medicamentos',
      quandoEncaminhar: [
        'Qualquer pausa > 3 segundos',
        'Pausas associadas a síncope ou pré-síncope',
        'Pausas frequentes mesmo se curtas',
        'Pausas durante vigília (não apenas durante sono)',
        'Paciente sintomático com pausas documentadas',
      ],
      errosComuns: [
        'Confundir pausa sinusal com bloqueio sinoatrial (na pausa, intervalo não é múltiplo do PP)',
        'Confundir com artefato (fio solto) - verificar outras derivações',
        'Ignorar pausas noturnas em pacientes com apneia do sono',
        'Não correlacionar pausas com diário de sintomas do Holter',
        'Não considerar medicamentos como causa',
      ],
    },

    diagnosticoDiferencial: [
      'Bloqueio sinoatrial tipo II (pausa é múltiplo exato do PP basal)',
      'Extrassístole atrial bloqueada (onda P prematura sem QRS)',
      'Artefato técnico (verificar outras derivações)',
      'Bloqueio AV total com pausa ventricular (ondas P presentes dissociadas)',
      'Bradicardia sinusal extrema (sem pausa verdadeira, apenas FC muito baixa)',
    ],

    prevalencia: 'Pausas < 2s são comuns durante sono (até 30-50% em Holter); pausas > 3s são raras (<1%)',

    tags: [
      'pausa',
      'sinusal',
      'doença do nó sinusal',
      'marca-passo',
      'síncope',
      'bradiarritmia',
    ],

    citations: [
      {
        refId: 'pausa-esc-2021',
        authors: ['Glikson M', 'Nielsen JC', 'Kronborg MB', 'et al.'],
        title: '2021 ESC Guidelines on cardiac pacing and cardiac resynchronization therapy',
        journal: 'European Heart Journal',
        year: 2021,
        volume: '42',
        pages: '3427-3520',
        doi: '10.1093/eurheartj/ehab364',
        pmid: '34455430',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
      {
        refId: 'pausa-snd-2014',
        authors: ['Semelka M', 'Gera J', 'Usman S'],
        title: 'Sick sinus syndrome: a review',
        journal: 'American Family Physician',
        year: 2013,
        volume: '87',
        pages: '691-696',
        pmid: '23939447',
        evidenceLevel: 'B',
        studyType: 'SystematicReview',
      },
      {
        refId: 'pausa-holter-2017',
        authors: ['Mond HG', 'Proclemer A'],
        title: 'The 11th world survey of cardiac pacing and implantable cardioverter-defibrillators',
        journal: 'Pacing and Clinical Electrophysiology',
        year: 2011,
        volume: '34',
        pages: '1013-1027',
        doi: '10.1111/j.1540-8159.2011.03150.x',
        pmid: '21707667',
        evidenceLevel: 'B',
        studyType: 'Observational',
      },
      {
        refId: 'pausa-athletes-2016',
        authors: ['Northcote RJ', 'Canning GP', 'Ballantyne D'],
        title: 'Electrocardiographic findings in male veteran endurance athletes',
        journal: 'British Heart Journal',
        year: 1989,
        volume: '61',
        pages: '155-160',
        doi: '10.1136/hrt.61.2.155',
        pmid: '2923752',
        evidenceLevel: 'B',
        studyType: 'Observational',
      },
    ],

    lastUpdate: '2025-01',
  },
];

// =============================================================================
// FUNÇÕES AUXILIARES
// =============================================================================

/**
 * Busca padrão de ritmo por ID
 */
export function getRitmoById(id: string): PadraoRitmoECG | undefined {
  return ritmosNormais.find((r) => r.id === id);
}

/**
 * Busca padrões por categoria
 */
export function getRitmosByCategoria(categoria: CategoriaECG): PadraoRitmoECG[] {
  return ritmosNormais.filter((r) => r.categoria === categoria);
}

/**
 * Busca padrões por tag
 */
export function getRitmosByTag(tag: string): PadraoRitmoECG[] {
  return ritmosNormais.filter((r) => r.tags.includes(tag.toLowerCase()));
}

/**
 * Retorna todos os red flags de urgência alta ou emergência
 */
export function getRedFlagsUrgentes(): Array<{ ritmoId: string; ritmoNome: string; redFlag: RedFlag }> {
  const urgentes: Array<{ ritmoId: string; ritmoNome: string; redFlag: RedFlag }> = [];

  for (const ritmo of ritmosNormais) {
    for (const rf of ritmo.redFlags) {
      if (rf.urgencia === 'alta' || rf.urgencia === 'emergencia') {
        urgentes.push({
          ritmoId: ritmo.id,
          ritmoNome: ritmo.nome,
          redFlag: rf,
        });
      }
    }
  }

  return urgentes;
}

/**
 * Busca padrões por texto (nome, descrição, tags)
 */
export function searchRitmos(query: string): PadraoRitmoECG[] {
  const lowerQuery = query.toLowerCase();

  return ritmosNormais.filter((r) =>
    r.nome.toLowerCase().includes(lowerQuery) ||
    r.nomeInternacional.toLowerCase().includes(lowerQuery) ||
    r.descricao.toLowerCase().includes(lowerQuery) ||
    r.tags.some((t) => t.includes(lowerQuery)) ||
    r.criterios.some((c) => c.toLowerCase().includes(lowerQuery))
  );
}
