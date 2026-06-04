/**
 * CRITÉRIOS DE ENCAMINHAMENTO ECG - DARWIN-MFC
 * =============================================
 *
 * Critérios abrangentes para orientar médicos não-cardiologistas
 * sobre quando encaminhar pacientes com base em achados de ECG.
 *
 * Baseado em diretrizes da SBC, AHA, ESC e literatura atual.
 */

// =============================================================================
// INTERFACES
// =============================================================================

export type CategoriaUrgencia = 'emergencia' | 'urgente' | 'rotina' | 'nao_necessario';

export type EspecialidadeDestino =
  | 'cardiologia'
  | 'eletrofisiologia'
  | 'hemodinamica'
  | 'uti_cardiologica'
  | 'emergencia'
  | 'cirurgia_cardiaca';

export interface ECGReferralCriteria {
  id: string;
  achado: string;
  descricao: string;
  categoria: CategoriaUrgencia;
  tempo: string; // "imediato", "24h", "7 dias", "eletivo"
  justificativa: string;
  oqueFazerEnquantoAguarda: string[];
  examesComplementares?: string[];
  especialidadeDestino: EspecialidadeDestino;
  criteriosAdicionais?: string[];
  tags: string[];
}

export interface ReferralRecommendation {
  shouldRefer: boolean;
  priority: CategoriaUrgencia;
  timing: string;
  destination: EspecialidadeDestino;
  criteria: ECGReferralCriteria;
  additionalActions: string[];
}

export interface ContextSpecificReferral {
  contexto: 'aps' | 'emergencia' | 'uti' | 'preoperatorio';
  titulo: string;
  descricao: string;
  criterios: string[];
  acoes: string[];
}

// =============================================================================
// ENCAMINHAMENTOS DE EMERGÊNCIA (minutos)
// =============================================================================

export const emergencyReferrals: ECGReferralCriteria[] = [
  {
    id: 'iamcsst',
    achado: 'IAMCSST - Infarto Agudo do Miocárdio com Supradesnível de ST',
    descricao: 'Elevação de ST ≥1mm em duas derivações contíguas com clínica sugestiva de SCA',
    categoria: 'emergencia',
    tempo: 'imediato',
    justificativa: 'Tempo porta-balão é crítico. Cada minuto de atraso aumenta mortalidade. Meta: ICP em até 90 minutos.',
    oqueFazerEnquantoAguarda: [
      'AAS 300mg mastigar (se não contraindicado)',
      'Clopidogrel 300-600mg (ou Ticagrelor 180mg)',
      'Heparina não fracionada 60-70 UI/kg (máx 5000 UI) em bolus',
      'Morfina 2-4mg IV se dor intensa',
      'Oxigênio se SpO2 <90%',
      'Nitroglicerina SL se PAS >90 mmHg',
      'Acesso venoso calibroso + monitorização contínua',
      'Preparar para transferência imediata'
    ],
    examesComplementares: [
      'Troponina seriada (mas NÃO aguardar resultado para tratar)',
      'ECG seriado a cada 15-30 minutos',
      'Hemograma, função renal, eletrólitos',
      'Coagulograma'
    ],
    especialidadeDestino: 'hemodinamica',
    criteriosAdicionais: [
      'Considerar fibrinólise se ICP não disponível em 120 minutos',
      'Em IAMCSST de parede inferior: pesquisar envolvimento de VD (V3R, V4R)',
      'Contra-checar derivações espelho'
    ],
    tags: ['iamcsst', 'supradesnivel-st', 'infarto', 'emergencia-cardiologica']
  },
  {
    id: 'tv-sustentada',
    achado: 'Taquicardia Ventricular Sustentada',
    descricao: 'TV com duração >30 segundos ou causando instabilidade hemodinâmica',
    categoria: 'emergencia',
    tempo: 'imediato',
    justificativa: 'Alto risco de degeneração para fibrilação ventricular e morte súbita. Requer tratamento imediato e investigação de causa.',
    oqueFazerEnquantoAguarda: [
      'Se INSTÁVEL: Cardioversão elétrica sincronizada 100-200J',
      'Se ESTÁVEL: Amiodarona 150mg IV em 10 min, seguido de 1mg/min por 6h',
      'Monitorização contínua',
      'Desfibrilador à beira do leito',
      'Corrigir distúrbios eletrolíticos (K+, Mg++)',
      'Identificar e tratar causas reversíveis (isquemia, intoxicação)'
    ],
    examesComplementares: [
      'ECG de 12 derivações durante e após episódio',
      'Troponina',
      'Eletrólitos (K+, Mg++, Ca++)',
      'Função renal',
      'Screening toxicológico se suspeita'
    ],
    especialidadeDestino: 'uti_cardiologica',
    criteriosAdicionais: [
      'Investigar cardiopatia estrutural com ecocardiograma',
      'Avaliar indicação de CDI após estabilização',
      'Se TV polimórfica: pesquisar QT longo, isquemia'
    ],
    tags: ['tv', 'taquicardia-ventricular', 'arritmia', 'emergencia']
  },
  {
    id: 'bav-3-grau',
    achado: 'Bloqueio Atrioventricular de 3º Grau (BAVT)',
    descricao: 'Dissociação AV completa com frequência ventricular geralmente <40-50 bpm',
    categoria: 'emergencia',
    tempo: 'imediato',
    justificativa: 'Risco de assistolia e morte súbita. Necessita de marca-passo urgente na maioria dos casos.',
    oqueFazerEnquantoAguarda: [
      'Atropina 0,5-1mg IV (pode repetir até 3mg) - frequentemente ineficaz',
      'Se não responder: iniciar transcutâneo ou transvenoso provisório',
      'Dopamina 2-10 mcg/kg/min ou Epinefrina 2-10 mcg/min se bradicardia sintomática',
      'Monitorização contínua',
      'Identificar causa reversível (IAM inferior, medicamentos, hipercalemia)',
      'Material de marca-passo transcutâneo pronto'
    ],
    examesComplementares: [
      'ECG de 12 derivações',
      'Eletrólitos (K+)',
      'Troponina (descartar IAM)',
      'Função tireoidiana',
      'Revisão de medicamentos (betabloqueadores, BCC, digoxina)'
    ],
    especialidadeDestino: 'uti_cardiologica',
    criteriosAdicionais: [
      'BAVT em IAM inferior pode ser transitório - monitorizar',
      'BAVT em IAM anterior geralmente indica grande área de necrose - pior prognóstico',
      'Se causa reversível identificada: tratar antes de indicar MP definitivo'
    ],
    tags: ['bavt', 'bloqueio-av', 'bradicardia', 'marcapasso', 'emergencia']
  },
  {
    id: 'fv',
    achado: 'Fibrilação Ventricular',
    descricao: 'Ritmo caótico ventricular sem débito cardíaco efetivo',
    categoria: 'emergencia',
    tempo: 'imediato',
    justificativa: 'Parada cardíaca em ritmo chocável. Desfibrilação imediata é a única terapia efetiva.',
    oqueFazerEnquantoAguarda: [
      'DESFIBRILAÇÃO IMEDIATA: 200J bifásico (360J monofásico)',
      'Iniciar RCP de alta qualidade',
      'Após 2 minutos: checar ritmo, se FV persistir: novo choque',
      'Epinefrina 1mg IV a cada 3-5 minutos',
      'Amiodarona 300mg IV após 3º choque (depois 150mg)',
      'Identificar e tratar causas reversíveis (5H e 5T)'
    ],
    especialidadeDestino: 'emergencia',
    criteriosAdicionais: [
      'Seguir protocolo ACLS',
      'Não interromper compressões para checar ritmo/pulso',
      'Se RCE: cuidados pós-PCR, hipotermia terapêutica se indicado'
    ],
    tags: ['fv', 'fibrilacao-ventricular', 'pcrr', 'desfibrilacao', 'emergencia']
  },
  {
    id: 'torsades',
    achado: 'Torsades de Pointes',
    descricao: 'TV polimórfica com QRS "girando" em torno da linha de base, associada a QT longo',
    categoria: 'emergencia',
    tempo: 'imediato',
    justificativa: 'Alto risco de FV. Tratamento específico diferente de outras TV.',
    oqueFazerEnquantoAguarda: [
      'Se INSTÁVEL: Desfibrilação (não cardioversão sincronizada)',
      'Sulfato de magnésio 2g IV em 1-2 minutos (mesmo com Mg normal)',
      'Suspender TODOS os medicamentos que prolongam QT',
      'Corrigir K+ para >4,0 mEq/L',
      'Se bradicardia associada: aumentar FC com isoproterenol ou marcapasso',
      'Evitar antiarrítmicos classe IA, IC e III'
    ],
    examesComplementares: [
      'ECG com QTc medido',
      'K+, Mg++, Ca++',
      'Revisão de TODOS os medicamentos em uso',
      'Considerar síndrome do QT longo congênito'
    ],
    especialidadeDestino: 'uti_cardiologica',
    criteriosAdicionais: [
      'Causas comuns: antiarrítmicos, antipsicóticos, antibióticos (macrolídeos, fluoroquinolonas)',
      'Hipocalemia e hipomagnesemia predispõem',
      'QT longo congênito: história familiar de morte súbita'
    ],
    tags: ['torsades', 'qt-longo', 'tv-polimorfica', 'emergencia']
  },
  {
    id: 'wpw-fa',
    achado: 'WPW com Fibrilação Atrial',
    descricao: 'FA pré-excitada com condução anterógrada pela via acessória - QRS largo e irregular',
    categoria: 'emergencia',
    tempo: 'imediato',
    justificativa: 'Risco de degeneração para FV se tratado incorretamente. Medicamentos bloqueadores do NAV são CONTRAINDICADOS.',
    oqueFazerEnquantoAguarda: [
      'NÃO usar: Adenosina, Verapamil, Diltiazem, Digoxina, Betabloqueadores',
      'Se INSTÁVEL: Cardioversão elétrica',
      'Se ESTÁVEL: Procainamida 15-17 mg/kg IV em 30-60 min',
      'Alternativa: Ibutilida ou Amiodarona (com cautela)',
      'Monitorização contínua'
    ],
    examesComplementares: [
      'ECG de 12 derivações',
      'Ecocardiograma após estabilização'
    ],
    especialidadeDestino: 'eletrofisiologia',
    criteriosAdicionais: [
      'Ablação por radiofrequência é curativa',
      'Encaminhamento eletrofisiológico após estabilização é mandatório'
    ],
    tags: ['wpw', 'pre-excitacao', 'fa', 'emergencia']
  },
  {
    id: 'assistolia',
    achado: 'Assistolia',
    descricao: 'Ausência de atividade elétrica ventricular',
    categoria: 'emergencia',
    tempo: 'imediato',
    justificativa: 'Parada cardíaca em ritmo não chocável. RCP e tratamento de causas reversíveis.',
    oqueFazerEnquantoAguarda: [
      'RCP de alta qualidade imediata',
      'Epinefrina 1mg IV a cada 3-5 minutos',
      'NÃO desfibrilar',
      'Checar cabos e derivações (confirmar assistolia em 2 derivações)',
      'Identificar e tratar causas reversíveis (5H e 5T)',
      'Considerar atropina apenas se suspeita de tônus vagal excessivo'
    ],
    especialidadeDestino: 'emergencia',
    criteriosAdicionais: [
      'Verificar em múltiplas derivações para descartar FV fina',
      'Prognóstico reservado - considerar tempo de PCR'
    ],
    tags: ['assistolia', 'pcr', 'emergencia']
  },
  {
    id: 'atividade-eletrica-sem-pulso',
    achado: 'Atividade Elétrica Sem Pulso (AESP)',
    descricao: 'Atividade elétrica organizada no ECG sem pulso palpável',
    categoria: 'emergencia',
    tempo: 'imediato',
    justificativa: 'Parada cardíaca com causa potencialmente reversível. Foco deve ser na identificação da causa.',
    oqueFazerEnquantoAguarda: [
      'RCP de alta qualidade imediata',
      'Epinefrina 1mg IV a cada 3-5 minutos',
      'NÃO desfibrilar',
      'Buscar ativamente causas reversíveis:',
      '5H: Hipovolemia, Hipóxia, H+ (acidose), Hipo/Hipercalemia, Hipotermia',
      '5T: Tensão (pneumotórax), Tamponamento, Toxinas, TEP, Trombose coronariana',
      'USG point-of-care se disponível'
    ],
    especialidadeDestino: 'emergencia',
    tags: ['aesp', 'pcr', 'emergencia']
  }
];

// =============================================================================
// ENCAMINHAMENTOS URGENTES (horas a 24h)
// =============================================================================

export const urgentReferrals: ECGReferralCriteria[] = [
  {
    id: 'iamsst-alto-risco',
    achado: 'IAMSST de Alto Risco',
    descricao: 'SCA sem supra de ST com critérios de alto risco (GRACE >140, troponina positiva, alterações dinâmicas ST)',
    categoria: 'urgente',
    tempo: '24h',
    justificativa: 'Benefício de estratégia invasiva precoce em pacientes de alto risco. Risco de evolução para IAMCSST.',
    oqueFazerEnquantoAguarda: [
      'Dupla antiagregação (AAS + inibidor P2Y12)',
      'Anticoagulação (Enoxaparina 1mg/kg 12/12h ou HNF)',
      'Betabloqueador se não contraindicado',
      'Estatina de alta intensidade',
      'Nitrato se dor persistente',
      'Monitorização contínua em unidade coronariana'
    ],
    examesComplementares: [
      'Troponina seriada (0h, 3h, 6h)',
      'ECG seriado',
      'Ecocardiograma',
      'Função renal, eletrólitos'
    ],
    especialidadeDestino: 'cardiologia',
    criteriosAdicionais: [
      'Calcular escore GRACE',
      'Estratificação invasiva em 24h se alto risco',
      'Risco intermediário: pode aguardar até 72h'
    ],
    tags: ['iamsst', 'sca', 'urgente', 'troponina']
  },
  {
    id: 'fa-inicio-recente-sintomatica',
    achado: 'FA de Início Recente (<48h) Sintomática',
    descricao: 'Fibrilação atrial de início definido <48h com sintomas significativos',
    categoria: 'urgente',
    tempo: '24h',
    justificativa: 'Janela para cardioversão sem anticoagulação prolongada. Controle de sintomas.',
    oqueFazerEnquantoAguarda: [
      'Controle de frequência: Metoprolol 5mg IV ou Diltiazem 0,25mg/kg IV',
      'Se <48h e baixo risco tromboembólico: pode cardioverter após anticoagulação aguda',
      'Heparina ou DOAC antes da cardioversão',
      'Avaliar causas reversíveis (hipertireoidismo, sepse, álcool)'
    ],
    examesComplementares: [
      'ECG confirmando FA',
      'TSH',
      'Eletrólitos, função renal',
      'Ecocardiograma (avaliar função VE e valvopatias)',
      'Considerar eco transesofágico se duração incerta'
    ],
    especialidadeDestino: 'cardiologia',
    criteriosAdicionais: [
      'Se >48h ou duração incerta: anticoagulação por 3 semanas antes de cardioverter',
      'Calcular CHA2DS2-VASc e HAS-BLED',
      'Tratar causa de base'
    ],
    tags: ['fa', 'fibrilacao-atrial', 'cardioversao', 'urgente']
  },
  {
    id: 'brugada-tipo1',
    achado: 'Padrão de Brugada Tipo 1',
    descricao: 'Elevação de ST em abóbada (coved) ≥2mm em V1-V2 com inversão de T',
    categoria: 'urgente',
    tempo: '24h',
    justificativa: 'Síndrome de Brugada com alto risco de morte súbita. Necessita estratificação de risco.',
    oqueFazerEnquantoAguarda: [
      'Evitar febre (antitérmicos se febril)',
      'Suspender drogas que exacerbam padrão (lista em brugadadrugs.org)',
      'Evitar refeições copiosas e álcool',
      'ECG seriado',
      'Orientar sobre sintomas de alerta (síncope, palpitações noturnas)'
    ],
    examesComplementares: [
      'ECG com V1-V2 no 2º, 3º e 4º EIC',
      'Histórico familiar de morte súbita',
      'Considerar teste genético',
      'Estudo eletrofisiológico conforme indicação'
    ],
    especialidadeDestino: 'eletrofisiologia',
    criteriosAdicionais: [
      'Alto risco se: síncope prévia, história familiar de morte súbita, TV/FV documentada',
      'Indicação de CDI em pacientes de alto risco',
      'Padrões tipos 2 e 3 requerem teste com ajmalina/flecainida para confirmação'
    ],
    tags: ['brugada', 'morte-subita', 'canalopatia', 'eletrofisiologia']
  },
  {
    id: 'qt-prolongado-marcado',
    achado: 'QT Prolongado Marcado (QTc >500ms)',
    descricao: 'Intervalo QTc >500ms com risco significativo de Torsades de Pointes',
    categoria: 'urgente',
    tempo: '24h',
    justificativa: 'QTc >500ms confere alto risco de arritmias ventriculares malignas.',
    oqueFazerEnquantoAguarda: [
      'Suspender TODOS os medicamentos que prolongam QT',
      'Corrigir distúrbios eletrolíticos (K+ >4,0, Mg++ >2,0)',
      'Monitorização contínua',
      'Evitar bradicardia',
      'Sulfato de magnésio 2g IV se Torsades ou QTc >550ms'
    ],
    examesComplementares: [
      'ECG seriado com medição de QTc',
      'K+, Mg++, Ca++',
      'Revisão completa de medicamentos',
      'Considerar QT longo congênito: história familiar, ECG de familiares'
    ],
    especialidadeDestino: 'cardiologia',
    criteriosAdicionais: [
      'QTc >550ms: risco muito alto',
      'Se sintomático (síncope) ou QT longo congênito: eletrofisiologia',
      'Lista de medicamentos em crediblemeds.org'
    ],
    tags: ['qt-longo', 'torsades', 'arritmia', 'urgente']
  },
  {
    id: 'sincope-ecg-anormal',
    achado: 'Síncope com ECG Anormal',
    descricao: 'Síncope de causa indeterminada com qualquer anormalidade no ECG',
    categoria: 'urgente',
    tempo: '24h',
    justificativa: 'ECG anormal em paciente com síncope sugere causa cardíaca - alto risco de morte súbita.',
    oqueFazerEnquantoAguarda: [
      'Monitorização contínua',
      'Avaliar necessidade de internação',
      'História detalhada da síncope',
      'Exame neurológico completo',
      'Evitar dirigir até esclarecimento'
    ],
    examesComplementares: [
      'Ecocardiograma',
      'Holter 24h',
      'Troponina se suspeita de isquemia',
      'Considerar estudo eletrofisiológico'
    ],
    especialidadeDestino: 'cardiologia',
    criteriosAdicionais: [
      'Alterações de alto risco: BAV, bloqueios bifasciculares, Brugada, WPW, QT longo, isquemia',
      'Síncope durante exercício ou deitado = alto risco',
      'Calcular escore EGSYS'
    ],
    tags: ['sincope', 'morte-subita', 'urgente']
  },
  {
    id: 'bloqueio-alternante',
    achado: 'Bloqueio de Ramo Alternante',
    descricao: 'Alternância entre BRD e BRE ou entre diferentes padrões de bloqueio',
    categoria: 'urgente',
    tempo: '24h',
    justificativa: 'Indica doença do sistema de condução avançada. Alto risco de BAVT.',
    oqueFazerEnquantoAguarda: [
      'Monitorização contínua',
      'Material de marca-passo transcutâneo disponível',
      'Evitar medicamentos que deprimem condução AV',
      'Avaliar sintomas (síncope, pré-síncope)'
    ],
    examesComplementares: [
      'ECG seriado',
      'Ecocardiograma',
      'Considerar internação para monitorização'
    ],
    especialidadeDestino: 'eletrofisiologia',
    criteriosAdicionais: [
      'Indicação de marca-passo é provável',
      'Se sintomático: marca-passo urgente'
    ],
    tags: ['bloqueio-ramo', 'bavt', 'marcapasso', 'urgente']
  },
  {
    id: 'bav-2-mobitz-ii',
    achado: 'BAV 2º Grau Mobitz II',
    descricao: 'Bloqueio AV com PR constante antes do bloqueio, geralmente infra-hissiano',
    categoria: 'urgente',
    tempo: '24h',
    justificativa: 'Alto risco de progressão para BAVT. Geralmente requer marca-passo.',
    oqueFazerEnquantoAguarda: [
      'Monitorização contínua',
      'Atropina geralmente ineficaz',
      'Material de marca-passo transcutâneo pronto',
      'Avaliar sintomas (síncope, pré-síncope, fadiga)'
    ],
    examesComplementares: [
      'ECG de 12 derivações',
      'Ecocardiograma',
      'Avaliar causas reversíveis'
    ],
    especialidadeDestino: 'eletrofisiologia',
    criteriosAdicionais: [
      'Se sintomático: marca-passo urgente',
      'Diferencia de Mobitz I pelo PR constante'
    ],
    tags: ['bav', 'bloqueio-av', 'marcapasso', 'mobitz']
  },
  {
    id: 'tsvp-refrataria',
    achado: 'TSVP Refratária ou Recorrente',
    descricao: 'Taquicardia supraventricular paroxística não responsiva a manobras vagais ou adenosina',
    categoria: 'urgente',
    tempo: '24h',
    justificativa: 'Necessita de cardioversão ou antiarrítmicos. Avaliação para ablação.',
    oqueFazerEnquantoAguarda: [
      'Manobras vagais (Valsalva modificada)',
      'Adenosina 6mg IV rápido, pode repetir 12mg',
      'Se falha: Verapamil 5-10mg IV ou Metoprolol 5mg IV',
      'Se instável: Cardioversão sincronizada',
      'Monitorização'
    ],
    examesComplementares: [
      'ECG durante e após episódio',
      'Ecocardiograma',
      'TSH'
    ],
    especialidadeDestino: 'cardiologia',
    criteriosAdicionais: [
      'Encaminhar para eletrofisiologia se recorrente',
      'Ablação é curativa em >95% dos casos'
    ],
    tags: ['tsvp', 'taquicardia', 'ablacao']
  }
];

// =============================================================================
// ENCAMINHAMENTOS DE ROTINA (dias a semanas)
// =============================================================================

export const routineReferrals: ECGReferralCriteria[] = [
  {
    id: 'hve-marcada',
    achado: 'Hipertrofia Ventricular Esquerda Marcada',
    descricao: 'HVE com critérios de voltagem significativos (Sokolow-Lyon ≥35mm ou Cornell >28mm homens, >20mm mulheres)',
    categoria: 'rotina',
    tempo: '7 dias',
    justificativa: 'HVE é fator de risco cardiovascular independente. Necessita investigação de causa e otimização do tratamento.',
    oqueFazerEnquantoAguarda: [
      'Otimizar controle de PA',
      'Verificar adesão ao tratamento anti-hipertensivo',
      'Orientar restrição de sódio e MEV',
      'Avaliar outros fatores de risco CV'
    ],
    examesComplementares: [
      'Ecocardiograma (confirmar HVE, avaliar função)',
      'Fundoscopia (retinopatia hipertensiva)',
      'Função renal, microalbuminúria',
      'Perfil lipídico, glicemia'
    ],
    especialidadeDestino: 'cardiologia',
    criteriosAdicionais: [
      'Se HVE com strain pattern: maior risco',
      'Investigar causas secundárias de HAS se idade <40 anos ou HAS resistente',
      'Considerar cardiomiopatia hipertrófica se história familiar ou achados atípicos'
    ],
    tags: ['hve', 'hipertrofia', 'hipertensao', 'rotina']
  },
  {
    id: 'brd-novo-assintomatico',
    achado: 'Bloqueio de Ramo Direito Novo Assintomático',
    descricao: 'BRD novo em paciente sem sintomas cardíacos, sem ECG prévio para comparação',
    categoria: 'rotina',
    tempo: '7 dias',
    justificativa: 'BRD pode ser benigno ou indicar cardiopatia estrutural. Necessita ecocardiograma para avaliação.',
    oqueFazerEnquantoAguarda: [
      'Avaliar fatores de risco CV',
      'Perguntar sobre sintomas cardíacos',
      'Verificar comorbidades pulmonares'
    ],
    examesComplementares: [
      'Ecocardiograma',
      'Radiografia de tórax',
      'Considerar função pulmonar se sintomas respiratórios'
    ],
    especialidadeDestino: 'cardiologia',
    criteriosAdicionais: [
      'BRD isolado em jovem saudável pode ser variante normal',
      'BRD + BDAS = bloqueio bifascicular: maior risco',
      'Pesquisar doença de Chagas em áreas endêmicas'
    ],
    tags: ['brd', 'bloqueio-ramo', 'rotina']
  },
  {
    id: 'bre-novo-assintomatico',
    achado: 'Bloqueio de Ramo Esquerdo Novo Assintomático',
    descricao: 'BRE novo em paciente sem sintomas cardíacos',
    categoria: 'rotina',
    tempo: '7 dias',
    justificativa: 'BRE é mais frequentemente associado a cardiopatia estrutural que BRD. Requer investigação.',
    oqueFazerEnquantoAguarda: [
      'Avaliar sintomas de IC (dispneia, edema, fadiga)',
      'Verificar PA e fatores de risco CV',
      'Avaliar história de DAC'
    ],
    examesComplementares: [
      'Ecocardiograma (obrigatório)',
      'Considerar cintilografia ou RM se suspeita de DAC',
      'BNP se sintomas de IC'
    ],
    especialidadeDestino: 'cardiologia',
    criteriosAdicionais: [
      'BRE novo + dor torácica: considerar IAM - encaminhar urgente',
      'BRE + IC: avaliar indicação de TRC',
      'BRE pode dificultar diagnóstico de isquemia no ECG'
    ],
    tags: ['bre', 'bloqueio-ramo', 'rotina']
  },
  {
    id: 'fa-cronica-controle',
    achado: 'FA Crônica para Otimização de Controle',
    descricao: 'FA permanente ou persistente de longa data para otimização terapêutica',
    categoria: 'rotina',
    tempo: '7 dias',
    justificativa: 'Otimização de anticoagulação e controle de frequência. Avaliação de candidatos a ablação.',
    oqueFazerEnquantoAguarda: [
      'Verificar adesão à anticoagulação',
      'Monitorar FC de repouso',
      'Avaliar sintomas (EHRA score)',
      'Checar INR se varfarina'
    ],
    examesComplementares: [
      'Ecocardiograma',
      'TSH',
      'Função renal (ajuste de DOAC)',
      'INR se varfarina'
    ],
    especialidadeDestino: 'cardiologia',
    criteriosAdicionais: [
      'Recalcular CHA2DS2-VASc periodicamente',
      'Avaliar necessidade de controle de ritmo vs frequência',
      'Candidatos a ablação: FA sintomática refratária'
    ],
    tags: ['fa', 'fibrilacao-atrial', 'anticoagulacao', 'rotina']
  },
  {
    id: 'alteracoes-st-t-inespecificas',
    achado: 'Alterações de ST-T Inespecíficas',
    descricao: 'Alterações de repolarização não diagnósticas de isquemia',
    categoria: 'rotina',
    tempo: '7 dias',
    justificativa: 'Podem representar desde variantes normais até isquemia subclínica. Contextualizar clinicamente.',
    oqueFazerEnquantoAguarda: [
      'Avaliar fatores de risco cardiovascular',
      'Perguntar sobre sintomas anginosos',
      'Comparar com ECG prévio se disponível',
      'Verificar medicamentos que alteram ST-T'
    ],
    examesComplementares: [
      'ECG prévio para comparação',
      'Ecocardiograma',
      'Teste ergométrico ou funcional se suspeita de DAC',
      'Perfil lipídico, glicemia'
    ],
    especialidadeDestino: 'cardiologia',
    criteriosAdicionais: [
      'Se paciente de alto risco CV: teste funcional para estratificação',
      'Muitas causas: HVE, medicamentos, distúrbios eletrolíticos',
      'Alterações dinâmicas: encaminhamento mais urgente'
    ],
    tags: ['st-t', 'repolarizacao', 'rotina']
  },
  {
    id: 'ev-frequentes',
    achado: 'Extrassístoles Ventriculares Frequentes',
    descricao: '>10% do total de batimentos ou sintomas significativos',
    categoria: 'rotina',
    tempo: '7 dias',
    justificativa: 'EV muito frequentes podem causar cardiomiopatia induzida por taquicardia. Necessita investigação.',
    oqueFazerEnquantoAguarda: [
      'Reduzir cafeína e estimulantes',
      'Avaliar ansiedade e estresse',
      'Verificar eletrólitos e função tireoidiana',
      'Orientar sobre benignidade se coração estruturalmente normal'
    ],
    examesComplementares: [
      'Holter 24h (quantificar carga de EV)',
      'Ecocardiograma',
      'TSH',
      'Eletrólitos'
    ],
    especialidadeDestino: 'cardiologia',
    criteriosAdicionais: [
      'Carga >20% ou disfunção de VE: considerar ablação',
      'EV monomórficas de via de saída: bom prognóstico',
      'EV polimórficas ou em cardiopatia estrutural: maior risco'
    ],
    tags: ['ev', 'extrassistole', 'arritmia', 'rotina']
  },
  {
    id: 'bav-1-grau-marcado',
    achado: 'BAV 1º Grau Marcado (PR >300ms)',
    descricao: 'Intervalo PR >300ms ou progressivo',
    categoria: 'rotina',
    tempo: '7 dias',
    justificativa: 'PR muito longo pode indicar doença de condução progressiva ou uso de medicamentos.',
    oqueFazerEnquantoAguarda: [
      'Revisar medicamentos (betabloqueadores, BCC, digoxina)',
      'Avaliar sintomas de baixo débito',
      'Comparar com ECG prévio'
    ],
    examesComplementares: [
      'ECG seriado',
      'Ecocardiograma',
      'Considerar Holter se sintomático'
    ],
    especialidadeDestino: 'cardiologia',
    criteriosAdicionais: [
      'BAV 1º isolado assintomático: geralmente benigno',
      'Se PR progressivamente aumentando: risco de progressão',
      'Associação com bloqueio de ramo: maior risco'
    ],
    tags: ['bav', 'bloqueio-av', 'rotina']
  },
  {
    id: 'hvd',
    achado: 'Hipertrofia Ventricular Direita',
    descricao: 'Critérios de HVD no ECG (desvio de eixo para direita, R/S >1 em V1)',
    categoria: 'rotina',
    tempo: '7 dias',
    justificativa: 'HVD sugere doença pulmonar ou cardiopatia congênita. Necessita investigação.',
    oqueFazerEnquantoAguarda: [
      'Avaliar sintomas respiratórios',
      'Perguntar sobre dispneia, hemoptise',
      'Avaliar história de cardiopatia congênita'
    ],
    examesComplementares: [
      'Ecocardiograma com estimativa de PSAP',
      'Radiografia de tórax',
      'Função pulmonar',
      'Considerar angioTC de tórax se suspeita de TEP crônico'
    ],
    especialidadeDestino: 'cardiologia',
    criteriosAdicionais: [
      'Investigar hipertensão pulmonar',
      'Causas: DPOC, TEP crônico, cardiopatias congênitas, HAP',
      'Pode necessitar cateterismo direito'
    ],
    tags: ['hvd', 'hipertrofia', 'hipertensao-pulmonar', 'rotina']
  }
];

// =============================================================================
// NÃO NECESSITA ENCAMINHAMENTO
// =============================================================================

export const noReferralNeeded: ECGReferralCriteria[] = [
  {
    id: 'ecg-normal',
    achado: 'ECG Normal',
    descricao: 'ECG sem alterações, todos os parâmetros dentro da normalidade',
    categoria: 'nao_necessario',
    tempo: 'N/A',
    justificativa: 'Não há indicação de patologia cardíaca no ECG.',
    oqueFazerEnquantoAguarda: [
      'Seguimento de rotina na APS',
      'Manter prevenção primária conforme risco CV'
    ],
    especialidadeDestino: 'cardiologia',
    tags: ['normal', 'nao-encaminhar']
  },
  {
    id: 'repolarizacao-precoce-benigna',
    achado: 'Repolarização Precoce Benigna',
    descricao: 'Elevação côncava de ST com entalhe em J em derivações precordiais em jovem saudável',
    categoria: 'nao_necessario',
    tempo: 'N/A',
    justificativa: 'Variante normal comum em jovens, especialmente atletas. Não requer investigação se assintomático.',
    oqueFazerEnquantoAguarda: [
      'Documentar no prontuário como variante normal',
      'Orientar paciente',
      'Sem necessidade de restrição de atividade física'
    ],
    especialidadeDestino: 'cardiologia',
    criteriosAdicionais: [
      'Atenção: repolarização precoce em derivações inferiores pode ter prognóstico diferente',
      'Se síncope ou história familiar de morte súbita: investigar'
    ],
    tags: ['repolarizacao-precoce', 'variante-normal', 'nao-encaminhar']
  },
  {
    id: 'bradicardia-sinusal-atleta',
    achado: 'Bradicardia Sinusal Assintomática em Atleta',
    descricao: 'FC <60 bpm em repouso em indivíduo com treinamento físico regular, assintomático',
    categoria: 'nao_necessario',
    tempo: 'N/A',
    justificativa: 'Adaptação fisiológica ao treinamento. O tônus vagal aumentado é esperado.',
    oqueFazerEnquantoAguarda: [
      'Documentar nível de atividade física',
      'Confirmar ausência de sintomas (síncope, tontura, fadiga)',
      'Orientar que é achado normal em atletas'
    ],
    especialidadeDestino: 'cardiologia',
    criteriosAdicionais: [
      'Se sintomático: investigar',
      'Pausas >3 segundos no Holter: avaliar',
      'Bradicardia severa (<40 bpm) ou FC que não aumenta com exercício: investigar'
    ],
    tags: ['bradicardia', 'atleta', 'variante-normal', 'nao-encaminhar']
  },
  {
    id: 'arritmia-sinusal-respiratoria',
    achado: 'Arritmia Sinusal Respiratória',
    descricao: 'Variação do intervalo RR com a respiração, mais pronunciada em jovens',
    categoria: 'nao_necessario',
    tempo: 'N/A',
    justificativa: 'Variante fisiológica normal, especialmente em jovens. Indica bom tônus vagal.',
    oqueFazerEnquantoAguarda: [
      'Documentar como achado normal',
      'Orientar paciente'
    ],
    especialidadeDestino: 'cardiologia',
    tags: ['arritmia-sinusal', 'variante-normal', 'nao-encaminhar']
  },
  {
    id: 'alteracoes-estaveis-avaliadas',
    achado: 'Alterações Estáveis Previamente Avaliadas',
    descricao: 'Alterações de ECG já investigadas por cardiologista e consideradas estáveis',
    categoria: 'nao_necessario',
    tempo: 'N/A',
    justificativa: 'Não há necessidade de reencaminhamento se alteração já foi investigada e paciente mantém-se estável.',
    oqueFazerEnquantoAguarda: [
      'Manter seguimento conforme orientação prévia do cardiologista',
      'Comparar com ECG anterior - verificar estabilidade',
      'Reencaminhar apenas se mudança ou novos sintomas'
    ],
    especialidadeDestino: 'cardiologia',
    criteriosAdicionais: [
      'Mudança no padrão do ECG: reencaminhar',
      'Novos sintomas: reencaminhar',
      'Manter acompanhamento periódico conforme indicação prévia'
    ],
    tags: ['estavel', 'seguimento', 'nao-encaminhar']
  },
  {
    id: 'ev-ocasionais-benignas',
    achado: 'Extrassístoles Ventriculares Ocasionais Benignas',
    descricao: 'EV raras (<1% dos batimentos) em coração estruturalmente normal',
    categoria: 'nao_necessario',
    tempo: 'N/A',
    justificativa: 'EV ocasionais são extremamente comuns e não aumentam risco cardiovascular em coração normal.',
    oqueFazerEnquantoAguarda: [
      'Orientar sobre benignidade',
      'Reduzir cafeína e estimulantes se sintomático',
      'Tranquilizar paciente'
    ],
    especialidadeDestino: 'cardiologia',
    criteriosAdicionais: [
      'Se >10% dos batimentos ou sintomático: considerar Holter e eco',
      'EV polimórficas ou em salvas: investigar'
    ],
    tags: ['ev', 'benigno', 'nao-encaminhar']
  },
  {
    id: 'baixa-voltagem-magro',
    achado: 'Baixa Voltagem em Paciente Magro',
    descricao: 'Voltagem reduzida em todas as derivações em paciente com baixo IMC',
    categoria: 'nao_necessario',
    tempo: 'N/A',
    justificativa: 'Pode ser variante normal relacionada ao biotipo. Avaliar causas patológicas se outros achados.',
    oqueFazerEnquantoAguarda: [
      'Verificar se há derrame pericárdico, hipotireoidismo ou amiloidose na história',
      'Se suspeita clínica: investigar'
    ],
    especialidadeDestino: 'cardiologia',
    criteriosAdicionais: [
      'Se dispneia, edema ou outros sintomas: investigar com eco',
      'Baixa voltagem + espessamento de parede no eco: suspeitar de amiloidose'
    ],
    tags: ['baixa-voltagem', 'variante', 'nao-encaminhar']
  }
];

// =============================================================================
// ENCAMINHAMENTOS ESPECÍFICOS POR CONTEXTO
// =============================================================================

export const contextSpecificReferrals: ContextSpecificReferral[] = [
  {
    contexto: 'aps',
    titulo: 'Quando Encaminhar da APS',
    descricao: 'Critérios de encaminhamento para médico de família/generalista',
    criterios: [
      'Qualquer alteração nova não explicada por condição conhecida',
      'Alterações sugestivas de isquemia (sintomático ou assintomático)',
      'Arritmias não controladas',
      'Bloqueios de ramo novos',
      'HVE com strain pattern',
      'Alterações que diferem significativamente de ECG prévio',
      'Síncope com ECG anormal'
    ],
    acoes: [
      'Comparar SEMPRE com ECG prévio quando disponível',
      'Contextualizar achados com clínica do paciente',
      'Para achados novos assintomáticos: encaminhamento eletivo em 7-30 dias',
      'Para sintomas + ECG anormal: encaminhamento urgente em 24-72h',
      'Para suspeita de SCA: encaminhar para emergência imediatamente'
    ]
  },
  {
    contexto: 'emergencia',
    titulo: 'Quando Chamar Cardiologista na Emergência',
    descricao: 'Indicações de parecer cardiológico urgente no PS',
    criterios: [
      'IAMCSST - ativar hemodinâmica',
      'IAMSST de alto risco',
      'Arritmias instáveis ou refratárias',
      'BAV de alto grau',
      'Síndrome coronariana aguda',
      'IC descompensada com arritmia ou choque',
      'Síncope de alto risco',
      'Tamponamento cardíaco',
      'Dissecção de aorta com envolvimento coronariano'
    ],
    acoes: [
      'Estabilizar paciente antes de transferir',
      'Não atrasar tratamento aguardando parecer se emergência',
      'Documentar ECG e evolução temporal',
      'Comunicar achados relevantes diretamente (não apenas no sistema)'
    ]
  },
  {
    contexto: 'uti',
    titulo: 'Quando Pedir Parecer de Cardiologia na UTI',
    descricao: 'Indicações de avaliação cardiológica em paciente crítico',
    criterios: [
      'Arritmias novas ou refratárias ao tratamento',
      'Elevação de troponina sem causa clara',
      'Instabilidade hemodinâmica de causa cardíaca',
      'Necessidade de cardioversão ou antiarrítmicos IV',
      'Avaliação para marca-passo temporário',
      'IC aguda ou choque cardiogênico',
      'Alterações isquêmicas em paciente crítico',
      'Síndrome de Takotsubo suspeitada'
    ],
    acoes: [
      'Manter monitorização contínua',
      'Obter ECG de 12 derivações (não confiar apenas no monitor)',
      'Documentar resposta a intervenções',
      'Ter desfibrilador e marca-passo transcutâneo disponíveis'
    ]
  },
  {
    contexto: 'preoperatorio',
    titulo: 'Critérios de Avaliação Cardiológica Pré-operatória',
    descricao: 'Quando solicitar avaliação de risco cardiovascular',
    criterios: [
      'Cirurgia de alto risco + ECG anormal',
      'Alterações isquêmicas novas',
      'Arritmias não avaliadas previamente',
      'Bloqueios de ramo novos ou bifasciculares',
      'QT prolongado (risco de arritmia perioperatória)',
      'Evidência de cardiopatia estrutural não conhecida',
      'Capacidade funcional <4 METs com ECG anormal'
    ],
    acoes: [
      'Não adiar cirurgia de emergência para avaliação cardiológica',
      'Calcular risco cirúrgico (RCRI, P-POSSUM)',
      'Avaliar capacidade funcional',
      'Se ECG normal e boa capacidade funcional: pode prosseguir na maioria dos casos',
      'Suspender anticoagulantes conforme protocolo'
    ]
  }
];

// =============================================================================
// CONSOLIDAÇÃO DE TODOS OS CRITÉRIOS
// =============================================================================

export const allReferralCriteria: ECGReferralCriteria[] = [
  ...emergencyReferrals,
  ...urgentReferrals,
  ...routineReferrals,
  ...noReferralNeeded
];

// =============================================================================
// FUNÇÕES DE SUPORTE À DECISÃO
// =============================================================================

function normalizeReferralTerm(term: string): string {
  return term
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function expandReferralTerms(finding: string): string[] {
  const normalized = normalizeReferralTerm(finding);
  const terms = new Set<string>([normalized]);

  const stemiAliases = [
    'stemi',
    'iamcsst',
    'iam-com-supra',
    'iam-com-supradesnivel',
    'supradesnivel-st',
    'supradesnivel-de-st',
    'supradesnivelamento-st',
    'supra-st',
    'elevacao-st',
    'elevacao-de-st',
    'infarto-com-supra',
  ];

  if (stemiAliases.some((alias) => normalized.includes(alias))) {
    for (const alias of stemiAliases) terms.add(alias);
  }

  const nstemiAliases = [
    'nstemi',
    'iamsst',
    'iam-sem-supra',
    'sca-sem-supra',
    'infarto-sem-supra',
  ];

  if (nstemiAliases.some((alias) => normalized.includes(alias))) {
    for (const alias of nstemiAliases) terms.add(alias);
  }

  return [...terms].filter(Boolean);
}

function matchesReferralCriteria(finding: string, criteria: ECGReferralCriteria): boolean {
  const findingTerms = expandReferralTerms(finding);
  const criteriaTerms = [
    criteria.id,
    criteria.achado,
    criteria.descricao,
    ...criteria.tags,
  ].map(normalizeReferralTerm);

  return findingTerms.some((findingTerm) =>
    criteriaTerms.some((criteriaTerm) =>
      criteriaTerm.includes(findingTerm) || findingTerm.includes(criteriaTerm)
    )
  );
}

/**
 * Determina se um achado de ECG requer encaminhamento
 */
export function shouldRefer(ecgFindings: string[]): ReferralRecommendation[] {
  const recommendations: ReferralRecommendation[] = [];

  for (const finding of ecgFindings) {
    const matchedCriteria = allReferralCriteria.find(criteria =>
      matchesReferralCriteria(finding, criteria)
    );

    if (matchedCriteria) {
      recommendations.push({
        shouldRefer: matchedCriteria.categoria !== 'nao_necessario',
        priority: matchedCriteria.categoria,
        timing: matchedCriteria.tempo,
        destination: matchedCriteria.especialidadeDestino,
        criteria: matchedCriteria,
        additionalActions: matchedCriteria.oqueFazerEnquantoAguarda
      });
    }
  }

  // Ordenar por prioridade (emergência primeiro)
  const priorityOrder: Record<CategoriaUrgencia, number> = {
    'emergencia': 0,
    'urgente': 1,
    'rotina': 2,
    'nao_necessario': 3
  };

  recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return recommendations;
}

/**
 * Retorna a prioridade de encaminhamento para um achado específico
 */
export function getReferralPriority(finding: string): CategoriaUrgencia {
  // Verificar emergências primeiro
  for (const criteria of emergencyReferrals) {
    if (matchesReferralCriteria(finding, criteria)) {
      return 'emergencia';
    }
  }

  // Verificar urgentes
  for (const criteria of urgentReferrals) {
    if (matchesReferralCriteria(finding, criteria)) {
      return 'urgente';
    }
  }

  // Verificar rotina
  for (const criteria of routineReferrals) {
    if (matchesReferralCriteria(finding, criteria)) {
      return 'rotina';
    }
  }

  // Verificar se não necessita
  for (const criteria of noReferralNeeded) {
    if (matchesReferralCriteria(finding, criteria)) {
      return 'nao_necessario';
    }
  }

  // Default: rotina (na dúvida, encaminhar)
  return 'rotina';
}

/**
 * Retorna os exames a solicitar antes do encaminhamento
 */
export function getPreReferralWorkup(finding: string): string[] {
  const matchedCriteria = allReferralCriteria.find(criteria =>
    matchesReferralCriteria(finding, criteria)
  );

  if (matchedCriteria?.examesComplementares) {
    return matchedCriteria.examesComplementares;
  }

  // Workup padrão se não encontrar critério específico
  return [
    'ECG de 12 derivações',
    'Comparar com ECG prévio se disponível',
    'Hemograma básico',
    'Eletrólitos',
    'Função renal',
    'Avaliar necessidade de ecocardiograma'
  ];
}

/**
 * Busca critérios de encaminhamento por ID
 */
export function getReferralCriteriaById(id: string): ECGReferralCriteria | undefined {
  return allReferralCriteria.find(c => c.id === id);
}

/**
 * Busca critérios de encaminhamento por categoria
 */
export function getReferralCriteriaByCategory(categoria: CategoriaUrgencia): ECGReferralCriteria[] {
  return allReferralCriteria.filter(c => c.categoria === categoria);
}

/**
 * Busca critérios de encaminhamento por especialidade destino
 */
export function getReferralCriteriaByDestination(destino: EspecialidadeDestino): ECGReferralCriteria[] {
  return allReferralCriteria.filter(c => c.especialidadeDestino === destino);
}

/**
 * Busca critérios de encaminhamento por tag
 */
export function searchReferralCriteriaByTag(tag: string): ECGReferralCriteria[] {
  const normalizedTag = tag.toLowerCase().trim();
  return allReferralCriteria.filter(c =>
    c.tags.some(t => t.toLowerCase().includes(normalizedTag))
  );
}

/**
 * Retorna guia de encaminhamento específico por contexto clínico
 */
export function getContextSpecificGuidance(contexto: 'aps' | 'emergencia' | 'uti' | 'preoperatorio'): ContextSpecificReferral | undefined {
  return contextSpecificReferrals.find(c => c.contexto === contexto);
}

/**
 * Gera resumo de ações para múltiplos achados
 */
export function generateActionSummary(findings: string[]): {
  highestPriority: CategoriaUrgencia;
  immediateActions: string[];
  workup: string[];
  destination: EspecialidadeDestino;
} {
  const recommendations = shouldRefer(findings);

  if (recommendations.length === 0) {
    return {
      highestPriority: 'nao_necessario',
      immediateActions: ['Seguimento de rotina'],
      workup: [],
      destination: 'cardiologia'
    };
  }

  // Pegar a maior prioridade
  const highestPriority = recommendations[0].priority;

  // Consolidar ações imediatas (sem duplicatas)
  const immediateActions = Array.from(new Set(
    recommendations.flatMap(r => r.additionalActions)
  ));

  // Consolidar exames
  const workup = Array.from(new Set(
    recommendations
      .filter(r => r.criteria.examesComplementares)
      .flatMap(r => r.criteria.examesComplementares!)
  ));

  // Determinar destino (priorizar hemodinâmica/UTI se emergência)
  let destination: EspecialidadeDestino = 'cardiologia';
  for (const rec of recommendations) {
    if (rec.destination === 'hemodinamica' || rec.destination === 'uti_cardiologica') {
      destination = rec.destination;
      break;
    }
    if (rec.destination === 'eletrofisiologia') {
      destination = rec.destination;
    }
  }

  return {
    highestPriority,
    immediateActions,
    workup,
    destination
  };
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  emergencyReferrals,
  urgentReferrals,
  routineReferrals,
  noReferralNeeded,
  contextSpecificReferrals,
  allReferralCriteria,
  shouldRefer,
  getReferralPriority,
  getPreReferralWorkup,
  getReferralCriteriaById,
  getReferralCriteriaByCategory,
  getReferralCriteriaByDestination,
  searchReferralCriteriaByTag,
  getContextSpecificGuidance,
  generateActionSummary
};
