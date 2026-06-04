/**
 * ECG INTERPRETATION CHECKLIST - DARWIN-MFC
 * ==========================================
 *
 * Systematic 6-step ECG interpretation checklist for non-cardiologist physicians.
 * Designed for general practitioners, emergency physicians, and intensivists
 * to follow a systematic approach to ECG interpretation.
 *
 * The 6-step approach:
 * 1. RITMO (Rhythm) - Regular vs irregular, P waves, P:QRS relationship
 * 2. FREQUENCIA (Rate) - Normal, tachycardia, bradycardia, calculation methods
 * 3. EIXO (Axis) - Normal, LAD, RAD, quick lead I/aVF method
 * 4. INTERVALOS (Intervals) - PR, QRS, QT/QTc
 * 5. MORFOLOGIA (Morphology) - P waves, QRS, ST segment, T waves
 * 6. RED FLAGS - Critical findings requiring immediate action
 *
 * References:
 * - AHA/ACC/HRS Guidelines for ECG Interpretation 2022-2024
 * - ESC Guidelines 2022-2024
 * - Braunwald's Heart Disease, 12th Edition
 * - Goldberger's Clinical Electrocardiography, 10th Edition
 * - Sociedade Brasileira de Cardiologia 2024
 *
 * @module lib/data/ecg/clinical-support/interpretation-checklist
 * @version 1.0.0
 * @lastUpdate 2025-01
 */

// =============================================================================
// INTERFACES
// =============================================================================

/**
 * Individual item within a checklist step
 */
export interface ChecklistItem {
  /** Unique identifier for this item */
  id: string;
  /** Question to ask during interpretation */
  pergunta: string;
  /** Expected/normal responses */
  respostasEsperadas: string[];
  /** How to evaluate this parameter */
  comoAvaliar: string;
  /** What to look for in the ECG */
  oqueProcurar: string[];
  /** Alerts/warnings for abnormal findings */
  alertas: string[];
}

/**
 * A single step in the ECG interpretation checklist
 */
export interface ChecklistStep {
  /** Unique identifier */
  id: string;
  /** Order in the systematic approach (1-6) */
  ordem: number;
  /** Step name in Portuguese */
  nome: string;
  /** Step name in English */
  nomeEN: string;
  /** Description of what this step evaluates */
  descricao: string;
  /** Individual items to check in this step */
  items: ChecklistItem[];
  /** Normal values for parameters in this step */
  normalValues: Record<string, string>;
  /** Red flags specific to this step */
  redFlags: string[];
  /** Quick tips for non-specialists */
  dicasRapidas: string[];
}

/**
 * User responses to checklist items
 */
export interface ChecklistResponse {
  itemId: string;
  resposta: string;
  isNormal: boolean;
  notas?: string;
}

/**
 * Complete checklist report with all responses
 */
export interface ChecklistReport {
  timestamp: Date;
  stepResponses: Record<string, ChecklistResponse[]>;
  redFlagsIdentified: string[];
  overallAssessment: 'normal' | 'anormal_nao_urgente' | 'anormal_urgente' | 'emergencia';
  recommendations: string[];
  summary: string;
}

/**
 * Rate calculation method
 */
export interface RateCalculationMethod {
  id: string;
  nome: string;
  descricao: string;
  formula: string;
  quando_usar: string;
  exemplo: string;
}

/**
 * Axis determination quadrant
 */
export interface AxisQuadrant {
  leadI: 'positivo' | 'negativo' | 'isoeletrico';
  leadAVF: 'positivo' | 'negativo' | 'isoeletrico';
  eixo: string;
  significado: string;
  causasComuns: string[];
}

// =============================================================================
// STEP 1: RITMO (RHYTHM)
// =============================================================================

const stepRitmo: ChecklistStep = {
  id: 'ritmo',
  ordem: 1,
  nome: 'Ritmo',
  nomeEN: 'Rhythm',
  descricao: 'Avaliacao da regularidade do ritmo, presenca de ondas P e relacao P:QRS. Este e o primeiro passo fundamental na interpretacao do ECG.',

  items: [
    {
      id: 'ritmo-regularidade',
      pergunta: 'O ritmo e regular ou irregular?',
      respostasEsperadas: [
        'Regular (intervalos RR constantes)',
        'Regularmente irregular (padrao previsivel)',
        'Irregularmente irregular (sem padrao)'
      ],
      comoAvaliar: 'Utilize um compasso ou papel para marcar os intervalos RR. Compare a distancia entre complexos QRS consecutivos. Variacao menor que 10% e considerada regular.',
      oqueProcurar: [
        'Distancia entre complexos QRS (intervalo RR)',
        'Padrao de variacao se irregular',
        'Pausas ou batimentos precoces'
      ],
      alertas: [
        'Irregularmente irregular = considerar FA',
        'Pausas > 3 segundos = considerar doenca do no sinusal ou BAV',
        'Batimentos precoces frequentes = extrassistoles (investigar se > 10%)'
      ]
    },
    {
      id: 'ritmo-onda-p',
      pergunta: 'Existem ondas P visiveis?',
      respostasEsperadas: [
        'Sim, ondas P presentes antes de cada QRS',
        'Ondas P ausentes',
        'Ondas P presentes mas dissociadas do QRS'
      ],
      comoAvaliar: 'Procure por deflexoes arredondadas antes de cada complexo QRS, especialmente em DII. A onda P normal e positiva em DII, DIII, aVF e negativa em aVR.',
      oqueProcurar: [
        'Presenca de onda P antes de cada QRS',
        'Morfologia da onda P (arredondada, bifida, pontiaguda)',
        'Eixo da onda P (positiva em DII normal)',
        'Ondas F (flutter) ou f (fibrilacao)'
      ],
      alertas: [
        'Ausencia de ondas P = FA, ritmo juncional, ou ritmo ventricular',
        'Ondas P negativas em DII = ritmo atrial ectopico ou juncional com conducao retrograda',
        'Mais ondas P que QRS = BAV de 2 ou 3 grau',
        'Ondas F em "dente de serra" = flutter atrial'
      ]
    },
    {
      id: 'ritmo-relacao-p-qrs',
      pergunta: 'Qual a relacao entre ondas P e complexos QRS?',
      respostasEsperadas: [
        '1:1 - cada P seguida de um QRS',
        '2:1, 3:1, 4:1 - conducao variavel',
        'Dissociacao AV - P e QRS independentes'
      ],
      comoAvaliar: 'Para cada onda P identificada, verifique se ha um QRS correspondente. Conte o numero de ondas P entre dois QRS consecutivos.',
      oqueProcurar: [
        'Cada P e seguida de QRS?',
        'PR constante ou variavel?',
        'Ondas P bloqueadas (sem QRS)?',
        'P e QRS marcham independentes?'
      ],
      alertas: [
        'Relacao P:QRS variavel = BAV de 2 grau ou flutter com conducao variavel',
        'Dissociacao AV = BAVT (emergencia!)',
        'P bloqueadas intermitentes = BAV 2 grau',
        'PR progressivamente maior ate bloquear = Mobitz I (Wenckebach)'
      ]
    },
    {
      id: 'ritmo-origem',
      pergunta: 'Qual a provavel origem do ritmo?',
      respostasEsperadas: [
        'Sinusal (onda P sinusal, PR normal)',
        'Atrial (onda P nao-sinusal)',
        'Juncional (sem P ou P retrograda)',
        'Ventricular (QRS alargado, sem P)'
      ],
      comoAvaliar: 'Avalie a morfologia da onda P e a duracao do QRS. Ritmo sinusal: P positiva em DII, negativa em aVR. Ritmo juncional: sem P ou P invertida proxima ao QRS. Ritmo ventricular: QRS largo.',
      oqueProcurar: [
        'Morfologia e eixo da onda P',
        'Duracao do complexo QRS',
        'Frequencia cardiaca',
        'Presenca de atividade de fusao ou captura'
      ],
      alertas: [
        'Ritmo ventricular (QRS largo) = TV ate prova em contrario',
        'Ritmo juncional com FC baixa = pode indicar DNS ou BAV',
        'Ritmo atrial ectopico = avaliar P mitrale ou P pulmonale'
      ]
    }
  ],

  normalValues: {
    'regularidade': 'Regular (variacao RR < 10%)',
    'onda_p': 'Presente, positiva em DII/DIII/aVF, negativa em aVR',
    'relacao_p_qrs': '1:1',
    'origem': 'Sinusal'
  },

  redFlags: [
    'Dissociacao AV completa (ondas P marchando independentes do QRS)',
    'Ausencia total de ondas P com QRS largo e regular = TV',
    'Ritmo irregularmente irregular com QRS largo muito rapido = FA pre-excitada (WPW)',
    'Pausa > 3 segundos sem escape',
    'Ritmo regular muito rapido (>150 bpm) com QRS largo'
  ],

  dicasRapidas: [
    'Comece SEMPRE olhando DII - e a melhor derivacao para ver ondas P',
    'Use um papel ou compasso para medir intervalos RR',
    'Se nao ve ondas P e o ritmo e irregular = provavelmente FA',
    'Se ve ondas P "marchando" no seu proprio ritmo = BAVT',
    'Ritmo regular de QRS largo = TV ate prova em contrario'
  ]
};

// =============================================================================
// STEP 2: FREQUENCIA (RATE)
// =============================================================================

const stepFrequencia: ChecklistStep = {
  id: 'frequencia',
  ordem: 2,
  nome: 'Frequencia',
  nomeEN: 'Rate',
  descricao: 'Calculo da frequencia cardiaca e classificacao em normal, taquicardia ou bradicardia. Inclui metodos de calculo rapido e interpretacao clinica.',

  items: [
    {
      id: 'freq-valor',
      pergunta: 'Qual a frequencia cardiaca calculada?',
      respostasEsperadas: [
        'Bradicardia: < 60 bpm',
        'Normal: 60-100 bpm',
        'Taquicardia: > 100 bpm'
      ],
      comoAvaliar: 'Use a regra dos 300: divida 300 pelo numero de quadrados grandes entre dois QRS. Para ritmos irregulares, conte QRS em 6 segundos e multiplique por 10.',
      oqueProcurar: [
        'Numero de quadrados grandes entre dois QRS',
        'Para ritmos irregulares: numero de QRS em 6 segundos (30 quadrados grandes)',
        'Frequencia atrial vs ventricular se diferentes'
      ],
      alertas: [
        'FC < 40 bpm = bradicardia severa, avaliar escape e sintomas',
        'FC > 150 bpm = avaliar se supraventricular ou ventricular',
        'FC fixa em ~150 bpm = considerar flutter atrial 2:1',
        'Discrepancia FC atrial/ventricular = BAV'
      ]
    },
    {
      id: 'freq-metodo-calculo',
      pergunta: 'Qual metodo de calculo foi utilizado?',
      respostasEsperadas: [
        'Regra dos 300 (para ritmos regulares)',
        'Regra dos 1500 (mais preciso para regulares)',
        'Contagem em 6 segundos (para irregulares)'
      ],
      comoAvaliar: 'Para ritmo regular: 300/quadrados grandes entre RR, ou 1500/quadrados pequenos entre RR. Para irregular: conte QRS em 6 segundos x 10.',
      oqueProcurar: [
        'Regularidade do ritmo (determina metodo)',
        'Numero de quadrados grandes ou pequenos',
        'Marcadores de tempo no papel de ECG'
      ],
      alertas: [
        'Nao use regra dos 300 para ritmos irregulares - use metodo dos 6 segundos',
        'Velocidade do papel pode variar (25 mm/s padrao, mas pode ser 50 mm/s)',
        'Em bradicardia extrema, conte quadrados com cuidado'
      ]
    },
    {
      id: 'freq-contexto',
      pergunta: 'A frequencia e apropriada para o contexto clinico?',
      respostasEsperadas: [
        'Sim, FC esperada para o estado clinico',
        'Nao, FC inapropriadamente alta',
        'Nao, FC inapropriadamente baixa'
      ],
      comoAvaliar: 'Considere febre, dor, ansiedade, exercicio (aumentam FC); sono, atletas, medicamentos (diminuem FC). FC inadequada ao contexto pode indicar patologia.',
      oqueProcurar: [
        'Contexto clinico do paciente',
        'Medicamentos em uso (betabloqueadores, digitais)',
        'Nivel de atividade, estado emocional',
        'Febre, infeccao, desidratacao'
      ],
      alertas: [
        'Bradicardia com hipotensao = instabilidade hemodinamica',
        'Taquicardia desproporcional a febre = investigar outras causas (PE, sepse)',
        'Bradicardia em atleta assintomatico = geralmente normal',
        'Incompetencia cronotropica (FC nao aumenta com esforco) = DNS'
      ]
    }
  ],

  normalValues: {
    'frequencia_adulto': '60-100 bpm',
    'frequencia_crianca': '70-130 bpm (varia com idade)',
    'frequencia_atleta': '40-60 bpm (normal em repouso)',
    'taquicardia_sinusal_maxima': '220 - idade (bpm)'
  },

  redFlags: [
    'FC < 40 bpm sintomatica (tonturas, sincope, hipotensao)',
    'FC > 150 bpm com QRS largo = provavel TV',
    'FC fixa ~150 bpm = suspeitar flutter atrial 2:1',
    'Bradicardia + hipotensao + alteracao do nivel de consciencia',
    'Taquicardia + dor toracica + dispneia = SCA ou PE'
  ],

  dicasRapidas: [
    'Memorize: 300-150-100-75-60-50 (para 1-2-3-4-5-6 quadrados grandes)',
    'Para ritmo irregular, conte SEMPRE em 6 segundos e multiplique por 10',
    'FC ~150 bpm fixa = pense em flutter 2:1 primeiro',
    'Bradicardia em atleta assintomatico = normal, nao precisa tratar',
    'Em emergencia, aproximar FC rapidamente e suficiente'
  ]
};

// =============================================================================
// STEP 3: EIXO (AXIS)
// =============================================================================

const stepEixo: ChecklistStep = {
  id: 'eixo',
  ordem: 3,
  nome: 'Eixo',
  nomeEN: 'Axis',
  descricao: 'Determinacao do eixo eletrico cardiaco no plano frontal usando o metodo rapido de DI e aVF. Identifica desvios para esquerda ou direita.',

  items: [
    {
      id: 'eixo-di',
      pergunta: 'O QRS em DI e predominantemente positivo ou negativo?',
      respostasEsperadas: [
        'Positivo (R > S)',
        'Negativo (S > R)',
        'Isoeletrico (R = S)'
      ],
      comoAvaliar: 'Olhe para a derivacao DI e determine se a deflexao predominante e para cima (positiva) ou para baixo (negativa). Compare altura de R com profundidade de S.',
      oqueProcurar: [
        'Altura da onda R',
        'Profundidade da onda S',
        'Qual deflexao predomina (soma algebraica)'
      ],
      alertas: [
        'QRS negativo em DI = eixo desviado para a direita ou extremo',
        'QRS isoeletrico em DI = eixo perpendicular a DI (proximo de +90 ou -90)'
      ]
    },
    {
      id: 'eixo-avf',
      pergunta: 'O QRS em aVF e predominantemente positivo ou negativo?',
      respostasEsperadas: [
        'Positivo (R > S)',
        'Negativo (S > R)',
        'Isoeletrico (R = S)'
      ],
      comoAvaliar: 'Olhe para a derivacao aVF e determine se a deflexao predominante e para cima (positiva) ou para baixo (negativa).',
      oqueProcurar: [
        'Altura da onda R',
        'Profundidade da onda S',
        'Qual deflexao predomina'
      ],
      alertas: [
        'QRS negativo em aVF = eixo acima de 0 graus',
        'QRS muito negativo em aVF + positivo em DI = DAE significativo'
      ]
    },
    {
      id: 'eixo-determinacao',
      pergunta: 'Qual o eixo eletrico determinado?',
      respostasEsperadas: [
        'Normal (-30 a +90 graus): DI positivo, aVF positivo ou levemente negativo',
        'DAE (-30 a -90): DI positivo, aVF negativo',
        'DAD (+90 a +180): DI negativo, aVF positivo',
        'Extremo/Indeterminado (-90 a -180): DI e aVF negativos'
      ],
      comoAvaliar: 'Use a tabela do quadrante: DI+ e aVF+ = normal; DI+ e aVF- = DAE; DI- e aVF+ = DAD; DI- e aVF- = extremo.',
      oqueProcurar: [
        'Combinacao de DI e aVF',
        'Para refinar: olhar DII, DIII, aVL',
        'Procurar derivacao isoeletrica (eixo perpendicular)'
      ],
      alertas: [
        'DAE significativo (< -45) = BDAS ou HVE',
        'DAD significativo (> +110) = BDPI, HVD, ou IAM lateral',
        'Eixo extremo = verificar posicionamento de eletrodos ou TV'
      ]
    },
    {
      id: 'eixo-significado',
      pergunta: 'O desvio de eixo tem significado clinico?',
      respostasEsperadas: [
        'Eixo normal - sem significado patologico',
        'DAE - pode indicar BDAS, HVE, IAM inferior',
        'DAD - pode indicar HVD, embolia pulmonar, BDPI'
      ],
      comoAvaliar: 'Correlacionar desvio de eixo com outros achados do ECG (bloqueios, hipertrofias) e contexto clinico do paciente.',
      oqueProcurar: [
        'Sinais de bloqueio fascicular (BDAS: DAE + qR em aVL)',
        'Sinais de hipertrofia (voltagem, alteracoes ST-T)',
        'Contexto clinico (doenca pulmonar, cardiopatia)'
      ],
      alertas: [
        'Novo desvio de eixo = mudanca clinica significativa',
        'DAD agudo + taquicardia + dispneia = considerar PE',
        'DAE novo + BRD = bloqueio bifascicular (risco de BAVT)',
        'Eixo extremo em TV = concordante negativo (alta especificidade para TV)'
      ]
    }
  ],

  normalValues: {
    'eixo_normal': '-30 a +90 graus',
    'eixo_normal_crianca': '+30 a +105 graus',
    'eixo_normal_idoso': '-30 a +30 graus (mais horizontal)'
  },

  redFlags: [
    'Novo DAD agudo em paciente com dispneia = suspeitar embolia pulmonar',
    'DAE + BRD = bloqueio bifascicular com risco de progressao para BAVT',
    'Mudanca aguda do eixo em comparacao com ECG previo',
    'Eixo extremo ("no mans land") = TV ate prova em contrario',
    'DAE significativo (< -45) com ondas Q inferiores = IAM inferior antigo'
  ],

  dicasRapidas: [
    'Memorize: DI+ e aVF+ = normal (apontando para "canto inferior esquerdo")',
    'Use a regra do polegar: DI+ = aponta para esquerda; aVF+ = aponta para baixo',
    'DAE = "deixou a esquerda" - olhe para causas cardiacas esquerdas (HVE, BDAS)',
    'DAD = "deu a direita" - olhe para causas pulmonares (HVD, PE)',
    'Na duvida, o eixo isoeletrico aponta perpendicular a derivacao isoeletrica'
  ]
};

// =============================================================================
// STEP 4: INTERVALOS (INTERVALS)
// =============================================================================

const stepIntervalos: ChecklistStep = {
  id: 'intervalos',
  ordem: 4,
  nome: 'Intervalos',
  nomeEN: 'Intervals',
  descricao: 'Medicao e interpretacao dos intervalos PR, QRS e QT/QTc. Identifica bloqueios de conducao e risco de arritmias.',

  items: [
    {
      id: 'intervalo-pr',
      pergunta: 'Qual a duracao do intervalo PR?',
      respostasEsperadas: [
        'Normal: 120-200 ms (3-5 quadrados pequenos)',
        'Curto: < 120 ms',
        'Prolongado: > 200 ms'
      ],
      comoAvaliar: 'Meca do inicio da onda P ate o inicio do complexo QRS. Use a derivacao DII ou V1. Cada quadrado pequeno = 40 ms.',
      oqueProcurar: [
        'Inicio da onda P',
        'Inicio do QRS (primeira deflexao)',
        'Consistencia do PR em todos os batimentos'
      ],
      alertas: [
        'PR curto + onda delta = WPW (risco de FA pre-excitada)',
        'PR curto sem delta = conducao AV acelerada ou ritmo juncional',
        'PR prolongado = BAV 1 grau (investigar causas)',
        'PR progressivamente maior = Wenckebach (Mobitz I)',
        'PR variavel sem padrao = BAV 2 grau ou FA'
      ]
    },
    {
      id: 'intervalo-qrs',
      pergunta: 'Qual a duracao do complexo QRS?',
      respostasEsperadas: [
        'Normal: < 120 ms (< 3 quadrados pequenos)',
        'Alargado: >= 120 ms (bloqueio de ramo ou ritmo ventricular)'
      ],
      comoAvaliar: 'Meca do inicio da primeira deflexao ate o final da ultima deflexao do QRS. Use a derivacao onde o QRS parece mais largo.',
      oqueProcurar: [
        'Inicio da primeira deflexao (Q ou R)',
        'Final do QRS (retorno a linha de base antes de ST)',
        'Morfologia em V1 e V6 para diferenciar BRD de BRE'
      ],
      alertas: [
        'QRS >= 120 ms = bloqueio de ramo ou ritmo ventricular',
        'QRS >= 140 ms = bloqueio completo de ramo',
        'QRS novo em paciente com dor toracica = IAM ou arritmia',
        'QRS largo + taquicardia = TV ate prova em contrario',
        'BRD: rSR em V1 ("orelhas de coelho")',
        'BRE: R largo entalhado em V6, ausencia de Q septal'
      ]
    },
    {
      id: 'intervalo-qt',
      pergunta: 'Qual a duracao do intervalo QT e QTc?',
      respostasEsperadas: [
        'QT normal varia com FC (geralmente < 440 ms)',
        'QTc normal: homens < 450 ms, mulheres < 460 ms',
        'QTc prolongado: > 450 ms (H) ou > 460 ms (M)',
        'QTc muito prolongado: > 500 ms (alto risco de Torsades)'
      ],
      comoAvaliar: 'Meca do inicio do QRS ate o final da onda T. Calcule QTc pela formula de Bazett: QTc = QT / raiz(RR em segundos). Use DII ou V5.',
      oqueProcurar: [
        'Inicio do QRS',
        'Final da onda T (onde retorna a linha de base)',
        'Intervalo RR para correcao',
        'Nao inclua ondas U na medicao'
      ],
      alertas: [
        'QTc > 500 ms = ALTO risco de Torsades de Pointes',
        'QTc > 550 ms = MUITO ALTO risco - urgencia',
        'Revisar TODOS os medicamentos que prolongam QT',
        'Corrigir K+ e Mg++ se QT prolongado',
        'Sindrome do QT longo congenito: historia familiar de morte subita',
        'QT curto (< 340 ms) = sindrome do QT curto (raro, risco de arritmia)'
      ]
    },
    {
      id: 'intervalo-constancia',
      pergunta: 'Os intervalos sao constantes ao longo do tracado?',
      respostasEsperadas: [
        'Sim, intervalos constantes',
        'Nao, PR variavel',
        'Nao, QRS variavel',
        'Nao, RR variavel'
      ],
      comoAvaliar: 'Compare os intervalos em diferentes partes do tracado. Variacoes podem indicar bloqueios ou arritmias.',
      oqueProcurar: [
        'Variacao progressiva do PR (Wenckebach)',
        'Alternancia de morfologia QRS (bloqueio alternante)',
        'Variacao do RR (arritmia sinusal, FA, extrassistoles)'
      ],
      alertas: [
        'PR progressivamente maior = Mobitz I (Wenckebach)',
        'PR constante com batimentos bloqueados = Mobitz II (mais grave)',
        'Bloqueio de ramo alternante (BRD/BRE) = muito alto risco de BAVT'
      ]
    }
  ],

  normalValues: {
    'intervalo_pr': '120-200 ms (3-5 quadrados pequenos)',
    'duracao_qrs': '< 120 ms (< 3 quadrados pequenos)',
    'qtc_homens': '< 450 ms',
    'qtc_mulheres': '< 460 ms',
    'qt_pratico': 'QT < 50% do intervalo RR anterior'
  },

  redFlags: [
    'QTc > 500 ms = alto risco de Torsades - suspender drogas que prolongam QT',
    'PR curto + onda delta = WPW - NAO usar adenosina/digoxina/verapamil em FA',
    'QRS novo >= 120 ms + dor toracica = pode ser IAM (BRE novo = equivalente IAMCSST)',
    'Bloqueio de ramo alternante = indicacao de marcapasso',
    'QRS largo + taquicardia = TV ate prova em contrario - preparar desfibrilador'
  ],

  dicasRapidas: [
    'Cada quadrado pequeno = 40 ms; cada grande = 200 ms',
    'Regra rapida QT: QT normal < metade do RR (a "olho nu")',
    'Para QTc, use calculadora - formula de Bazett tem limitacoes em bradicardia',
    'BRD vs BRE: olhe V1 - BRD tem padrao rSR ("coelho"), BRE tem S profundo',
    'PR > 200 ms = BAV 1 grau - verifique se paciente usa betabloqueador ou digital'
  ]
};

// =============================================================================
// STEP 5: MORFOLOGIA (MORPHOLOGY)
// =============================================================================

const stepMorfologia: ChecklistStep = {
  id: 'morfologia',
  ordem: 5,
  nome: 'Morfologia',
  nomeEN: 'Morphology',
  descricao: 'Avaliacao detalhada da morfologia das ondas P, complexo QRS, segmento ST e ondas T. Identifica hipertrofias, isquemia e outras alteracoes.',

  items: [
    {
      id: 'morf-onda-p',
      pergunta: 'A morfologia da onda P esta normal?',
      respostasEsperadas: [
        'Normal: arredondada, positiva em DII, < 120 ms, < 2.5 mm',
        'P mitrale: bifida em DII, larga > 120 ms',
        'P pulmonale: pontiaguda, > 2.5 mm em DII'
      ],
      comoAvaliar: 'Avalie altura (amplitude) e largura (duracao) da onda P em DII. Verifique se ha entalhe ou morfologia bifasica em V1.',
      oqueProcurar: [
        'Amplitude em DII (normal < 2.5 mm)',
        'Duracao em DII (normal < 120 ms)',
        'Morfologia em V1 (componente negativo terminal)',
        'Entalhe ou bipartida em DII'
      ],
      alertas: [
        'P mitrale (larga, bifida) = sobrecarga atrial esquerda (valvopatia mitral, HVE)',
        'P pulmonale (alta, pontiaguda) = sobrecarga atrial direita (DPOC, HAP)',
        'Onda P ausente ou de baixa amplitude = doenca atrial ou FA',
        'Componente negativo profundo em V1 = SAE significativo'
      ]
    },
    {
      id: 'morf-qrs',
      pergunta: 'A morfologia do complexo QRS esta normal?',
      respostasEsperadas: [
        'Normal: progressao de R nas precordiais (R cresce de V1 a V6)',
        'Ondas Q patologicas presentes',
        'Baixa voltagem',
        'Alta voltagem (criterios de hipertrofia)'
      ],
      comoAvaliar: 'Avalie a progressao de R nas precordiais (zona de transicao normal V3-V4). Procure ondas Q patologicas (> 40 ms ou > 25% do QRS). Verifique criterios de voltagem para hipertrofias.',
      oqueProcurar: [
        'Progressao de R em V1-V6 (R deve crescer)',
        'Ondas Q patologicas (> 1 quadrado pequeno de largura)',
        'Perda de R em derivacoes anteriores',
        'Criterios de Sokolow-Lyon para HVE (S V1 + R V5/V6 > 35 mm)'
      ],
      alertas: [
        'Ondas Q novas = podem indicar IAM (antigo ou recente)',
        'Perda de progressao de R = pode indicar IAM anterior',
        'HVE com strain pattern = alto risco CV',
        'Baixa voltagem difusa = derrame pericardico, DPOC, obesidade, hipotireoidismo',
        'R alta em V1 (R > S) = HVD, BRD, IAM posterior, WPW'
      ]
    },
    {
      id: 'morf-st',
      pergunta: 'O segmento ST esta no nivel da linha de base (isoeletrico)?',
      respostasEsperadas: [
        'Isoeletrico (normal)',
        'Supradesnivelamento',
        'Infradesnivelamento'
      ],
      comoAvaliar: 'Compare o nivel do ST com o segmento TP (entre T e P). O ponto J (juncao QRS-ST) deve estar no mesmo nivel. Desvio >= 1 mm e significativo.',
      oqueProcurar: [
        'Nivel do ponto J em relacao ao segmento TP',
        'Morfologia do supra (convexo = IAM, concavo = pericardite)',
        'Infradesnivelamento (horizontal = isquemia, descendente = digital)',
        'Derivacoes contuguas afetadas (territorio arterial)'
      ],
      alertas: [
        'Supra de ST >= 1 mm em 2 derivacoes contiguas = IAMCSST ate prova em contrario',
        'Supra de ST concavo difuso = pericardite (tambem olhar infra em aVR)',
        'Infra de ST horizontal ou descendente = isquemia subendocardica',
        'Infra difuso + supra em aVR = obstrucao de tronco ou 3 vasos',
        'Supra em espelho (reciproco) confirma IAM',
        'Infra em V1-V3 pode ser espelho de IAM posterior'
      ]
    },
    {
      id: 'morf-t',
      pergunta: 'A morfologia das ondas T esta normal?',
      respostasEsperadas: [
        'Normal: assinetrica, concordante com QRS, positiva na maioria das derivacoes',
        'Ondas T invertidas',
        'Ondas T hiperagudas',
        'Ondas T aplanadas'
      ],
      comoAvaliar: 'Ondas T normais sao assimetricas (subida mais lenta que descida) e geralmente concordantes com a direcao do QRS. Inversoes profundas e simetricas sao patologicas.',
      oqueProcurar: [
        'Polaridade (positiva ou negativa)',
        'Simetria (normal = assimetrica)',
        'Amplitude (T hiperagudas = inicio de IAM)',
        'Concordancia com QRS'
      ],
      alertas: [
        'T hiperagudas (altas, pontiagudas, simetricas) = IAM hiperagudo ou hipercalemia',
        'T invertidas profundas e simetricas em V1-V4 = Wellens (lesao critica de DA)',
        'T invertidas em multiplas derivacoes = isquemia, TEP, cardiomiopatia',
        'T aplanadas = pode ser normal ou indicar isquemia, disturbio eletrolitico',
        'T discordante em bloqueio de ramo = esperado (normal secundario)'
      ]
    }
  ],

  normalValues: {
    'onda_p': 'Positiva em DII, < 2.5 mm altura, < 120 ms largura',
    'qrs_voltagem': 'R + S precordiais variavel por biotipo',
    'segmento_st': 'Isoeletrico (mesmo nivel do segmento TP)',
    'onda_t': 'Positiva em I, II, V3-V6; negativa em aVR; variavel em III, aVL, aVF, V1-V2'
  },

  redFlags: [
    'Supra de ST >= 1 mm em derivacoes contiguas = IAMCSST - ativar protocolo',
    'Padrao de Wellens (T invertida profunda V2-V3) = lesao critica de DA - CAT < 24h',
    'Supra de ST + infra reciproco = confirma IAM',
    'Infra difuso + supra em aVR = obstrucao de tronco/3 vasos - emergencia',
    'Ondas Q novas + sintomas = IAM em evolucao',
    'Baixa voltagem + taquicardia + hipotensao = considerar tamponamento'
  ],

  dicasRapidas: [
    'Compare SEMPRE ST com o segmento TP (linha de base verdadeira)',
    'Supra convexo ("barriga para cima") = IAM; concavo = pericardite/repolarizacao precoce',
    'Padrao de Wellens = emergencia mesmo sem supra de ST',
    'Em bloqueio de ramo, alteracoes de ST-T sao secundarias (esperadas)',
    'T hiperaguda = muito precoce no IAM, antes do supra de ST'
  ]
};

// =============================================================================
// STEP 6: RED FLAGS
// =============================================================================

const stepRedFlags: ChecklistStep = {
  id: 'red-flags',
  ordem: 6,
  nome: 'Red Flags',
  nomeEN: 'Red Flags',
  descricao: 'Revisao final para identificar achados criticos que requerem acao imediata. Checklist de seguranca para nao deixar passar emergencias.',

  items: [
    {
      id: 'rf-isquemia',
      pergunta: 'Ha sinais de isquemia aguda ou IAM?',
      respostasEsperadas: [
        'Nao - sem alteracoes isquemicas',
        'Sim - supra de ST',
        'Sim - infra de ST',
        'Sim - inversao de T sugestiva'
      ],
      comoAvaliar: 'Revise todas as derivacoes para supra ou infra de ST >= 1 mm, ondas T hiperagudas, inversao de T profunda e simetrica, ondas Q patologicas novas.',
      oqueProcurar: [
        'Supra de ST >= 1 mm em derivacoes contiguas',
        'Infra de ST horizontal ou descendente >= 0.5 mm',
        'Ondas T hiperagudas ou inversao profunda',
        'Ondas Q patologicas novas',
        'Mudancas dinamicas em ECGs seriados'
      ],
      alertas: [
        'QUALQUER supra de ST com dor toracica = IAMCSST ate prova em contrario',
        'BRE novo + dor toracica = equivalente de IAMCSST',
        'Infra difuso + supra em aVR = tronco ou multiarterial - EMERGENCIA',
        'Nao esperar troponina para tratar IAMCSST'
      ]
    },
    {
      id: 'rf-arritmia',
      pergunta: 'Ha arritmia potencialmente letal?',
      respostasEsperadas: [
        'Nao - ritmo estavel',
        'Sim - TV',
        'Sim - FV',
        'Sim - BAVT',
        'Sim - FA rapida com instabilidade'
      ],
      comoAvaliar: 'Verifique se ha taquicardia de QRS largo, ritmo caotico (FV), dissociacao AV (BAVT), pausas > 3 segundos, ou FA com FC > 150 bpm.',
      oqueProcurar: [
        'Taquicardia com QRS largo = TV ate prova em contrario',
        'Ritmo caotico sem complexos identificaveis = FV',
        'Ondas P dissociadas do QRS = BAVT',
        'Pausas > 3 segundos = DNS ou BAV',
        'FA pre-excitada (QRS largo irregular muito rapido) = emergencia'
      ],
      alertas: [
        'TV sustentada = desfibrilador pronto, amiodarona ou cardioversao',
        'FV = desfibrilacao imediata + RCP',
        'BAVT = atropina e preparo para marcapasso transcutaneo',
        'FA pre-excitada = NAO USAR adenosina, digoxina, verapamil - pode causar FV'
      ]
    },
    {
      id: 'rf-conducao',
      pergunta: 'Ha disturbio grave de conducao?',
      respostasEsperadas: [
        'Nao - conducao normal',
        'Sim - BAVT',
        'Sim - BAV 2 grau Mobitz II',
        'Sim - bloqueio bifascicular ou trifascicular',
        'Sim - bloqueio de ramo alternante'
      ],
      comoAvaliar: 'Verifique a relacao P:QRS, constancia do PR, presenca de ondas P bloqueadas, combinacao de bloqueios.',
      oqueProcurar: [
        'Dissociacao AV completa (BAVT)',
        'BAV 2 grau com PR constante antes do bloqueio (Mobitz II)',
        'BRD + BDAS ou BDPI (bloqueio bifascicular)',
        'BRD ou BRE + BAV 1 grau (bloqueio trifascicular)',
        'Alternancia entre BRD e BRE'
      ],
      alertas: [
        'BAVT = marcapasso urgente na maioria dos casos',
        'Mobitz II = alto risco de progressao para BAVT - monitorizar',
        'Bloqueio de ramo alternante = indicacao de marcapasso',
        'Bloqueio trifascicular com sincope = marcapasso'
      ]
    },
    {
      id: 'rf-qt',
      pergunta: 'O QTc esta perigosamente prolongado?',
      respostasEsperadas: [
        'Nao - QTc normal (< 450/460 ms)',
        'Sim - QTc moderadamente prolongado (450-500 ms)',
        'Sim - QTc muito prolongado (> 500 ms)'
      ],
      comoAvaliar: 'Calcule o QTc usando a formula de Bazett ou calculadora. QTc > 500 ms confere alto risco de Torsades de Pointes.',
      oqueProcurar: [
        'QTc calculado',
        'Medicamentos em uso que prolongam QT',
        'Disturbios eletroliticos (hipoK, hipoMg)',
        'Alternancia de T (sinal de risco iminente)'
      ],
      alertas: [
        'QTc > 500 ms = SUSPENDER TODOS os medicamentos que prolongam QT',
        'Dar sulfato de magnesio 2g IV mesmo com Mg normal',
        'Corrigir K+ para > 4.5 mEq/L',
        'Se Torsades: desfibrilacao se instavel, Mg se estavel'
      ]
    },
    {
      id: 'rf-pre-excitacao',
      pergunta: 'Ha padrao de pre-excitacao (WPW)?',
      respostasEsperadas: [
        'Nao - sem pre-excitacao',
        'Sim - PR curto + onda delta'
      ],
      comoAvaliar: 'Verifique se ha PR curto (< 120 ms) com onda delta (empastamento inicial do QRS) e QRS ligeiramente alargado.',
      oqueProcurar: [
        'PR curto (< 120 ms ou 3 quadrados pequenos)',
        'Onda delta (slurring inicial do QRS)',
        'QRS ligeiramente largo',
        'Alteracoes secundarias de ST-T'
      ],
      alertas: [
        'WPW com FA = EMERGENCIA - risco de FV',
        'NAO usar: adenosina, digoxina, verapamil, diltiazem, betabloqueador em FA pre-excitada',
        'Usar procainamida ou cardioversao eletrica',
        'Encaminhar para ablacao apos estabilizacao'
      ]
    },
    {
      id: 'rf-brugada',
      pergunta: 'Ha padrao de Brugada?',
      respostasEsperadas: [
        'Nao - sem padrao de Brugada',
        'Sim - padrao tipo 1 (coved)',
        'Possivel - padrao tipo 2 ou 3 (saddleback)'
      ],
      comoAvaliar: 'Verifique V1 e V2 para supra de ST com morfologia em abobada (tipo 1) ou sela (tipo 2/3). O tipo 1 e diagnostico; tipos 2/3 precisam de teste provocativo.',
      oqueProcurar: [
        'Supra de ST >= 2 mm em V1-V2',
        'Morfologia em abobada (coved) descendo para T negativa = tipo 1',
        'Morfologia em sela (saddleback) com T positiva = tipo 2/3'
      ],
      alertas: [
        'Brugada tipo 1 = risco de morte subita',
        'Febre pode desmascarar o padrao - tratar febre agressivamente',
        'Evitar drogas que pioram Brugada (lista em brugadadrugs.org)',
        'Encaminhar para eletrofisiologista para estratificacao de risco'
      ]
    },
    {
      id: 'rf-outros',
      pergunta: 'Ha outros achados criticos?',
      respostasEsperadas: [
        'Nao - sem outros achados criticos',
        'Sim - hipertensao pulmonar aguda (S1Q3T3)',
        'Sim - hipercalemia (T pontiagudas, QRS largo)',
        'Sim - tamponamento (baixa voltagem + taquicardia)'
      ],
      comoAvaliar: 'Revise o ECG como um todo buscando padroes especificos de emergencias nao-cardiacas que afetam o ECG.',
      oqueProcurar: [
        'S1Q3T3 + taquicardia + dispneia = embolia pulmonar',
        'T pontiagudas simetricas + QRS largo + bradicardia = hipercalemia',
        'Baixa voltagem + alternancia eletrica = derrame pericardico/tamponamento',
        'Alteracoes difusas e inespecificas = intoxicacao, disturbio metabolico'
      ],
      alertas: [
        'S1Q3T3 em paciente com dispneia subita = PE ate prova em contrario',
        'Hipercalemia grave = emergencia - tratar antes de investigar causa',
        'Tamponamento = pericardiocentese de emergencia se instavel',
        'Baixa voltagem + hipotensao + taquicardia = tamponamento ate prova em contrario'
      ]
    }
  ],

  normalValues: {
    'isquemia': 'Nenhum sinal de isquemia aguda',
    'arritmia': 'Sem arritmias potencialmente letais',
    'conducao': 'Sem bloqueios de alto grau',
    'qtc': '< 450 ms (H) ou < 460 ms (M)',
    'pre_excitacao': 'Ausente',
    'brugada': 'Ausente',
    'outros': 'Sem outros achados criticos'
  },

  redFlags: [
    'Supra de ST >= 1 mm em derivacoes contiguas = IAMCSST',
    'BRE novo + dor toracica = equivalente de IAMCSST',
    'TV sustentada ou FV',
    'BAVT ou BAV 2 grau Mobitz II',
    'QTc > 500 ms',
    'FA pre-excitada (WPW + FA)',
    'Brugada tipo 1',
    'Hipercalemia grave (QRS > 120 ms com T pontiagudas)',
    'S1Q3T3 com dispneia = PE',
    'Baixa voltagem com taquicardia e hipotensao = tamponamento'
  ],

  dicasRapidas: [
    'SEMPRE termine com este passo - nao deixe passar emergencias',
    'Na duvida sobre TV vs TSV com aberrancia, trate como TV',
    'BRE novo + dor toracica = IAMCSST ate prova em contrario',
    'QTc > 500 ms = revisar TODOS os medicamentos',
    'Compare com ECG anterior SEMPRE que possivel'
  ]
};

// =============================================================================
// CONSOLIDATION: COMPLETE CHECKLIST
// =============================================================================

/**
 * Complete 6-step ECG interpretation checklist
 */
export const ecgInterpretationChecklist: ChecklistStep[] = [
  stepRitmo,
  stepFrequencia,
  stepEixo,
  stepIntervalos,
  stepMorfologia,
  stepRedFlags
];

// =============================================================================
// RATE CALCULATION METHODS
// =============================================================================

/**
 * Methods for calculating heart rate from ECG
 */
export const rateCalculationMethods: RateCalculationMethod[] = [
  {
    id: 'regra-300',
    nome: 'Regra dos 300',
    descricao: 'Metodo rapido para ritmos regulares usando quadrados grandes',
    formula: 'FC = 300 / (numero de quadrados grandes entre dois QRS)',
    quando_usar: 'Ritmos regulares - metodo mais rapido',
    exemplo: '3 quadrados grandes entre QRS = 300/3 = 100 bpm'
  },
  {
    id: 'regra-1500',
    nome: 'Regra dos 1500',
    descricao: 'Metodo mais preciso para ritmos regulares usando quadrados pequenos',
    formula: 'FC = 1500 / (numero de quadrados pequenos entre dois QRS)',
    quando_usar: 'Ritmos regulares quando se necessita maior precisao',
    exemplo: '20 quadrados pequenos entre QRS = 1500/20 = 75 bpm'
  },
  {
    id: 'metodo-6-segundos',
    nome: 'Metodo dos 6 Segundos',
    descricao: 'Metodo para ritmos irregulares',
    formula: 'FC = (numero de QRS em 6 segundos) x 10',
    quando_usar: 'Ritmos irregulares (FA, extrassistoles frequentes)',
    exemplo: '7 QRS em 6 segundos = 7 x 10 = 70 bpm (media)'
  },
  {
    id: 'sequencia-300',
    nome: 'Sequencia Memorizada',
    descricao: 'Sequencia para leitura rapida: 300-150-100-75-60-50',
    formula: 'Para 1-2-3-4-5-6 quadrados grandes: FC = 300, 150, 100, 75, 60, 50 bpm',
    quando_usar: 'Leitura rapida de ritmos regulares',
    exemplo: '4 quadrados grandes = 75 bpm, 5 quadrados = 60 bpm'
  }
];

// =============================================================================
// AXIS QUADRANT DETERMINATION
// =============================================================================

/**
 * Quadrant determination for quick axis assessment
 */
export const axisQuadrants: AxisQuadrant[] = [
  {
    leadI: 'positivo',
    leadAVF: 'positivo',
    eixo: 'Normal (0 a +90 graus)',
    significado: 'Eixo eletrico normal - aponta para baixo e esquerda',
    causasComuns: ['Normal', 'Variante anatomica']
  },
  {
    leadI: 'positivo',
    leadAVF: 'negativo',
    eixo: 'Desvio para Esquerda (-30 a -90 graus)',
    significado: 'Eixo desviado para cima e esquerda',
    causasComuns: [
      'BDAS (bloqueio divisional anterossuperior)',
      'HVE (hipertrofia ventricular esquerda)',
      'IAM inferior antigo',
      'Variante anatomica em obesos ou gestantes'
    ]
  },
  {
    leadI: 'negativo',
    leadAVF: 'positivo',
    eixo: 'Desvio para Direita (+90 a +180 graus)',
    significado: 'Eixo desviado para baixo e direita',
    causasComuns: [
      'HVD (hipertrofia ventricular direita)',
      'BDPI (bloqueio divisional posteroinferior)',
      'Embolia pulmonar',
      'DPOC',
      'CIA (comunicacao interatrial)',
      'Dextrocardia'
    ]
  },
  {
    leadI: 'negativo',
    leadAVF: 'negativo',
    eixo: 'Eixo Extremo / Indeterminado (-90 a -180 graus)',
    significado: 'Eixo aponta para cima e direita - "terra de ninguem"',
    causasComuns: [
      'Taquicardia ventricular',
      'Ritmo de marcapasso ventricular',
      'Hipercalemia grave',
      'Erro de posicionamento de eletrodos',
      'Dextrocardia',
      'Casos raros de HVE ou HAE extremos'
    ]
  }
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get a specific checklist step by ID
 * @param stepId ID of the step to retrieve
 * @returns The checklist step or undefined if not found
 */
export function getChecklistByStep(stepId: string): ChecklistStep | undefined {
  return ecgInterpretationChecklist.find(step => step.id === stepId);
}

/**
 * Get all red flags from the checklist
 * @returns Array of all red flags across all steps
 */
export function getRedFlagsFromChecklist(): { stepId: string; stepName: string; redFlags: string[] }[] {
  return ecgInterpretationChecklist.map(step => ({
    stepId: step.id,
    stepName: step.nome,
    redFlags: step.redFlags
  }));
}

/**
 * Get all red flags as a flat array
 * @returns Flat array of all red flag strings
 */
export function getAllRedFlagsFlat(): string[] {
  return ecgInterpretationChecklist.flatMap(step => step.redFlags);
}

/**
 * Generate a checklist report based on user responses
 * @param responses User responses to checklist items
 * @returns Complete checklist report with assessment and recommendations
 */
export function generateChecklistReport(responses: Record<string, ChecklistResponse[]>): ChecklistReport {
  const redFlagsIdentified: string[] = [];
  let hasEmergency = false;
  let hasUrgent = false;
  const recommendations: string[] = [];

  // Analyze responses for each step
  for (const stepId of Object.keys(responses)) {
    const stepResponses = responses[stepId];
    const step = getChecklistByStep(stepId);

    if (!step) continue;

    for (const response of stepResponses) {
      if (!response.isNormal) {
        // Find the corresponding item to get alerts
        const item = step.items.find(i => i.id === response.itemId);
        if (item) {
          // Add relevant alerts based on the abnormal response
          for (const alerta of item.alertas) {
            // Check if the alert is relevant to the response
            const alertaLower = alerta.toLowerCase();
            const respostaLower = response.resposta.toLowerCase();

            // Simple keyword matching to determine relevance
            if (
              alertaLower.includes('emergencia') ||
              alertaLower.includes('imediato') ||
              alertaLower.includes('iamcsst') ||
              alertaLower.includes('tv') ||
              alertaLower.includes('fv') ||
              alertaLower.includes('bavt')
            ) {
              hasEmergency = true;
              if (!redFlagsIdentified.includes(alerta)) {
                redFlagsIdentified.push(alerta);
              }
            } else if (
              alertaLower.includes('urgente') ||
              alertaLower.includes('urgencia') ||
              alertaLower.includes('risco') ||
              alertaLower.includes('alto risco')
            ) {
              hasUrgent = true;
              if (!redFlagsIdentified.includes(alerta)) {
                redFlagsIdentified.push(alerta);
              }
            }
          }
        }
      }
    }
  }

  // Determine overall assessment
  let overallAssessment: 'normal' | 'anormal_nao_urgente' | 'anormal_urgente' | 'emergencia';

  if (hasEmergency) {
    overallAssessment = 'emergencia';
    recommendations.push('ACAO IMEDIATA NECESSARIA - Ativar protocolo de emergencia');
    recommendations.push('Chamar equipe de emergencia/cardiologia');
    recommendations.push('Monitorização continua');
    recommendations.push('Preparar material de reanimacao');
  } else if (hasUrgent) {
    overallAssessment = 'anormal_urgente';
    recommendations.push('Encaminhamento urgente para cardiologia (24-48h)');
    recommendations.push('Monitorização do paciente');
    recommendations.push('Coletar exames complementares');
    recommendations.push('Documentar e comparar com ECG anterior se disponivel');
  } else if (redFlagsIdentified.length > 0) {
    overallAssessment = 'anormal_nao_urgente';
    recommendations.push('Encaminhamento eletivo para cardiologia (7-30 dias)');
    recommendations.push('Solicitar ecocardiograma');
    recommendations.push('Acompanhamento ambulatorial');
  } else {
    overallAssessment = 'normal';
    recommendations.push('ECG dentro dos parametros normais');
    recommendations.push('Manter acompanhamento de rotina');
    recommendations.push('Orientar sobre sintomas de alerta');
  }

  // Generate summary
  let summary = '';
  switch (overallAssessment) {
    case 'emergencia':
      summary = `ECG com alteracoes EMERGENCIAIS identificadas (${redFlagsIdentified.length} red flags). Requer acao imediata e ativacao de protocolo de emergencia.`;
      break;
    case 'anormal_urgente':
      summary = `ECG com alteracoes URGENTES identificadas (${redFlagsIdentified.length} red flags). Requer encaminhamento cardiologico em 24-48h e monitorização.`;
      break;
    case 'anormal_nao_urgente':
      summary = `ECG com alteracoes que requerem investigacao (${redFlagsIdentified.length} achados anormais). Encaminhamento eletivo recomendado.`;
      break;
    case 'normal':
      summary = 'ECG sem alteracoes significativas. Seguimento de rotina recomendado.';
      break;
  }

  return {
    timestamp: new Date(),
    stepResponses: responses,
    redFlagsIdentified,
    overallAssessment,
    recommendations,
    summary
  };
}

/**
 * Get checklist item by ID across all steps
 * @param itemId ID of the item to find
 * @returns The item and its parent step, or undefined
 */
export function getChecklistItem(itemId: string): { step: ChecklistStep; item: ChecklistItem } | undefined {
  for (const step of ecgInterpretationChecklist) {
    const item = step.items.find(i => i.id === itemId);
    if (item) {
      return { step, item };
    }
  }
  return undefined;
}

/**
 * Get normal values for a specific step
 * @param stepId ID of the step
 * @returns Record of normal values for that step
 */
export function getNormalValuesByStep(stepId: string): Record<string, string> {
  const step = getChecklistByStep(stepId);
  return step?.normalValues || {};
}

/**
 * Get quick tips for a specific step
 * @param stepId ID of the step
 * @returns Array of quick tips for that step
 */
export function getQuickTipsByStep(stepId: string): string[] {
  const step = getChecklistByStep(stepId);
  return step?.dicasRapidas || [];
}

/**
 * Search checklist for items matching a query
 * @param query Search query
 * @returns Array of matching items with their parent step
 */
export function searchChecklist(query: string): Array<{ step: ChecklistStep; item: ChecklistItem }> {
  const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const results: Array<{ step: ChecklistStep; item: ChecklistItem }> = [];

  for (const step of ecgInterpretationChecklist) {
    for (const item of step.items) {
      const searchableText = [
        item.pergunta,
        item.comoAvaliar,
        ...item.oqueProcurar,
        ...item.alertas,
        ...item.respostasEsperadas
      ].join(' ').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      if (searchableText.includes(normalizedQuery)) {
        results.push({ step, item });
      }
    }
  }

  return results;
}

/**
 * Get axis interpretation based on leads I and aVF
 * @param leadI Polarity of lead I
 * @param leadAVF Polarity of lead aVF
 * @returns Axis quadrant information
 */
export function getAxisInterpretation(
  leadI: 'positivo' | 'negativo' | 'isoeletrico',
  leadAVF: 'positivo' | 'negativo' | 'isoeletrico'
): AxisQuadrant | undefined {
  // Handle isoelectric cases by defaulting to the nearest quadrant
  const effectiveLeadI = leadI === 'isoeletrico' ? 'positivo' : leadI;
  const effectiveLeadAVF = leadAVF === 'isoeletrico' ? 'positivo' : leadAVF;

  return axisQuadrants.find(q =>
    q.leadI === effectiveLeadI && q.leadAVF === effectiveLeadAVF
  );
}

/**
 * Calculate QTc using Bazett's formula
 * @param qtMs QT interval in milliseconds
 * @param rrMs RR interval in milliseconds
 * @returns QTc in milliseconds
 */
export function calculateQTcBazett(qtMs: number, rrMs: number): number {
  const rrSeconds = rrMs / 1000;
  return Math.round(qtMs / Math.sqrt(rrSeconds));
}

/**
 * Calculate QTc using Fridericia's formula (better for bradycardia/tachycardia)
 * @param qtMs QT interval in milliseconds
 * @param rrMs RR interval in milliseconds
 * @returns QTc in milliseconds
 */
export function calculateQTcFridericia(qtMs: number, rrMs: number): number {
  const rrSeconds = rrMs / 1000;
  return Math.round(qtMs / Math.cbrt(rrSeconds));
}

/**
 * Determine if QTc is prolonged based on sex
 * @param qtcMs QTc in milliseconds
 * @param sex 'M' for male, 'F' for female
 * @returns Assessment of QTc status
 */
export function assessQTc(
  qtcMs: number,
  sex: 'M' | 'F'
): { status: 'normal' | 'borderline' | 'prolongado' | 'muito_prolongado'; risk: string } {
  const normalLimit = sex === 'M' ? 450 : 460;
  const borderlineLimit = sex === 'M' ? 470 : 480;

  if (qtcMs <= normalLimit) {
    return { status: 'normal', risk: 'Baixo risco de arritmia' };
  } else if (qtcMs <= borderlineLimit) {
    return { status: 'borderline', risk: 'Revisar medicamentos que prolongam QT' };
  } else if (qtcMs <= 500) {
    return { status: 'prolongado', risk: 'Risco aumentado de Torsades - monitorizar' };
  } else {
    return { status: 'muito_prolongado', risk: 'ALTO RISCO de Torsades de Pointes - acao urgente' };
  }
}

/**
 * Get statistics about the checklist
 * @returns Statistics about steps, items, and red flags
 */
export function getChecklistStats(): {
  totalSteps: number;
  totalItems: number;
  totalRedFlags: number;
  itemsByStep: Record<string, number>;
  redFlagsByStep: Record<string, number>;
} {
  const itemsByStep: Record<string, number> = {};
  const redFlagsByStep: Record<string, number> = {};

  let totalItems = 0;
  let totalRedFlags = 0;

  for (const step of ecgInterpretationChecklist) {
    itemsByStep[step.id] = step.items.length;
    redFlagsByStep[step.id] = step.redFlags.length;
    totalItems += step.items.length;
    totalRedFlags += step.redFlags.length;
  }

  return {
    totalSteps: ecgInterpretationChecklist.length,
    totalItems,
    totalRedFlags,
    itemsByStep,
    redFlagsByStep
  };
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  ecgInterpretationChecklist,
  rateCalculationMethods,
  axisQuadrants,
  getChecklistByStep,
  getRedFlagsFromChecklist,
  getAllRedFlagsFlat,
  generateChecklistReport,
  getChecklistItem,
  getNormalValuesByStep,
  getQuickTipsByStep,
  searchChecklist,
  getAxisInterpretation,
  calculateQTcBazett,
  calculateQTcFridericia,
  assessQTc,
  getChecklistStats
};
