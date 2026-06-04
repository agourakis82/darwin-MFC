/**
 * ARRITMIAS SUPRAVENTRICULARES - PADRÕES ECG
 * ==========================================
 * Darwin-MFC - Academic Q1 Standard Data
 *
 * Padrões eletrocardiográficos de arritmias supraventriculares
 * com dados clínicos completos para uso em APS e emergência.
 *
 * Referências:
 * - AHA/ACC/HRS 2023 Guidelines for SVT Management
 * - ESC 2020 Guidelines for Atrial Fibrillation
 * - Sociedade Brasileira de Cardiologia
 */

import { Citation } from '../../../types/references';

export type UrgenciaECG = 'rotina' | 'urgente' | 'emergencia';

export interface CaracteristicasECG {
  frequencia: string;
  ritmo: string;
  ondaP: string;
  intervaloPR: string;
  complexoQRS: string;
  outrasCaracteristicas?: string[];
}

export interface PadraoArritmiaSupraventricular {
  id: string;
  nome: string;
  nomeInternacional: string;
  categoria: 'arritmia_supraventricular';
  descricao: string;
  criteriosECG: string[];
  caracteristicas: CaracteristicasECG;
  causas: string[];
  significadoClinico: string;
  urgencia: UrgenciaECG;
  conduta: string;
  tratamentoAgudo: string[];
  criteriosEncaminhamento: string[];
  redFlags: string[];
  dicasParaNaoEspecialista: string[];
  citations: Citation[];
}

export const arritmiasSupra: PadraoArritmiaSupraventricular[] = [
  // ============================================================================
  // 1. FIBRILAÇÃO ATRIAL (FA)
  // ============================================================================
  {
    id: 'fibrilacao-atrial',
    nome: 'Fibrilação Atrial',
    nomeInternacional: 'Atrial Fibrillation (AF)',
    categoria: 'arritmia_supraventricular',
    descricao: 'Arritmia sustentada mais comum, caracterizada por ativação atrial caótica e desorganizada com frequências atriais de 350-600 bpm, resultando em resposta ventricular irregularmente irregular. Principal causa de AVC cardioembólico e associada a aumento de mortalidade cardiovascular.',
    criteriosECG: [
      'Ausência de ondas P definidas - substituídas por ondas f (fibrilatórias)',
      'Ondas f: pequenas, irregulares, amplitude variável (0,1-0,5 mV)',
      'Frequência das ondas f: 350-600/min',
      'Intervalos R-R absolutamente irregulares ("irregularmente irregular")',
      'Linha de base instável/ondulante entre os complexos QRS',
      'Complexos QRS geralmente estreitos (<120 ms), exceto se bloqueio de ramo associado',
      'Sem intervalo PR mensurável'
    ],
    caracteristicas: {
      frequencia: 'Ventricular variável: 100-180 bpm (não controlada), 60-100 bpm (controlada)',
      ritmo: 'Irregularmente irregular - característica patognomônica',
      ondaP: 'Ausentes - substituídas por ondas f fibrilatórias caóticas',
      intervaloPR: 'Não mensurável/não aplicável',
      complexoQRS: 'Geralmente estreito (<120 ms); pode ser largo se bloqueio de ramo, WPW ou aberrância',
      outrasCaracteristicas: [
        'Variabilidade de amplitude dos complexos QRS (fenômeno de Ashman)',
        'Possível alternância elétrica se derrame pericárdico associado',
        'FA de alta resposta ventricular pode mimetizar taquicardia ventricular'
      ]
    },
    causas: [
      'Hipertensão arterial sistêmica (causa mais comum)',
      'Doença valvar mitral (estenose/insuficiência)',
      'Insuficiência cardíaca',
      'Doença arterial coronariana',
      'Cardiomiopatia dilatada ou hipertrófica',
      'Hipertireoidismo',
      'Síndrome do nó sinusal (taqui-bradi)',
      'Pericardite/miocardite',
      'Pós-operatório de cirurgia cardíaca/torácica',
      'Apneia obstrutiva do sono',
      'Etilismo agudo ou crônico ("holiday heart")',
      'Obesidade',
      'FA solitária (lone AF) em pacientes jovens sem cardiopatia estrutural'
    ],
    significadoClinico: 'Aumenta risco de AVC em 5x (principal complicação). Associada a 20-30% dos AVCs isquêmicos. Aumenta mortalidade em 1,5-2x. Pode causar taquicardiomiopatia se FC elevada sustentada. CHA2DS2-VASc score define necessidade de anticoagulação. HAS-BLED score avalia risco de sangramento.',
    urgencia: 'urgente',
    conduta: 'Avaliar estabilidade hemodinâmica. FA instável (hipotensão, dor torácica, dispneia grave, IC descompensada): cardioversão elétrica sincronizada imediata. FA estável: controle de frequência inicial com betabloqueador ou bloqueador de canal de cálcio, seguido de decisão sobre controle de ritmo vs frequência e anticoagulação.',
    tratamentoAgudo: [
      '1. Avaliar estabilidade hemodinâmica (PA, perfusão, sintomas)',
      '2. Se instável: Cardioversão elétrica sincronizada 120-200J bifásico',
      '3. Se estável - Controle de FC: Metoprolol 5mg IV (repetir até 15mg) ou Diltiazem 0,25mg/kg IV',
      '4. Alvo de FC: <110 bpm em repouso (estratégia leniente) ou <80 bpm (estratégia estrita)',
      '5. Avaliar duração da FA: <48h permite cardioversão; >48h ou duração desconhecida requer anticoagulação 3 semanas pré ou ETE para excluir trombo',
      '6. Se FA <48h e baixo risco: cardioversão química com Amiodarona 150mg IV em 10min',
      '7. Iniciar anticoagulação conforme CHA2DS2-VASc: ≥2 (homens) ou ≥3 (mulheres) = anticoagular',
      '8. DOACs preferidos sobre Varfarina na maioria dos casos (exceto válvula mecânica ou estenose mitral moderada/grave)',
      '9. Investigar causas reversíveis: TSH, eletrólitos, ecocardiograma'
    ],
    criteriosEncaminhamento: [
      'FA de início recente (<1 ano) para avaliação de controle de ritmo',
      'Candidato a ablação por cateter (FA paroxística sintomática refratária a antiarrítmico)',
      'FA em paciente jovem (<65 anos) sem cardiopatia estrutural',
      'Dificuldade no controle de frequência apesar de terapia otimizada',
      'Suspeita de taquicardiomiopatia',
      'FA com WPW (Wolff-Parkinson-White) - NUNCA usar bloqueadores do nó AV',
      'Contraindicação à anticoagulação - avaliar oclusão de apêndice atrial esquerdo',
      'FA valvar (estenose mitral moderada/grave ou prótese mecânica)',
      'Falha de cardioversão ou recorrência precoce'
    ],
    redFlags: [
      'Instabilidade hemodinâmica (PAS <90 mmHg, síncope, choque)',
      'FA com resposta ventricular muito rápida (>150 bpm) com QRS largo - pode ser FA pré-excitada (WPW)',
      'Dor torácica sugestiva de isquemia miocárdica',
      'Dispneia grave com sinais de congestão pulmonar',
      'Déficit neurológico focal (AVC em curso)',
      'FC <40 bpm após controle - pode indicar doença do nó sinusal',
      'FA com bloqueio AV completo (ritmo regular e lento)'
    ],
    dicasParaNaoEspecialista: [
      'Irregularidade absoluta do ritmo no pulso é altamente sugestiva de FA - confirme com ECG',
      'Sempre calcule CHA2DS2-VASc antes de decidir sobre anticoagulação',
      'Não há necessidade de controle estrito de FC na maioria dos pacientes - alvo <110 bpm é aceitável',
      'DOACs são mais seguros e eficazes que Varfarina na FA não valvar',
      'NUNCA use Digoxina ou Verapamil/Diltiazem isoladamente em FA com WPW - pode acelerar condução e causar FV',
      'FA com QRS largo e muito rápida = assume WPW até prova em contrário',
      'Amiodarona é a droga mais segura se função ventricular reduzida (FEVE <40%)',
      'Controle de fatores de risco (HAS, obesidade, apneia do sono, álcool) reduz recorrência'
    ],
    citations: [
      {
        refId: 'esc-af-2020',
        authors: ['Hindricks G', 'Potpara T', 'Dagres N', 'et al.'],
        title: '2020 ESC Guidelines for the diagnosis and management of atrial fibrillation',
        journal: 'European Heart Journal',
        year: 2020,
        volume: '42',
        pages: '373-498',
        doi: '10.1093/eurheartj/ehaa612',
        pmid: '32860505'
      },
      {
        refId: 'acc-aha-af-2023',
        authors: ['Joglar JA', 'Chung MK', 'Armbruster AL', 'et al.'],
        title: '2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation',
        journal: 'Circulation',
        year: 2024,
        volume: '149',
        pages: 'e1-e156',
        doi: '10.1161/CIR.0000000000001193',
        pmid: '38033089'
      },
      {
        refId: 'sbc-fa-2022',
        authors: ['Sociedade Brasileira de Cardiologia'],
        title: 'Diretriz Brasileira de Fibrilação Atrial',
        journal: 'Arquivos Brasileiros de Cardiologia',
        year: 2022,
        volume: '119',
        pages: '1-96',
        doi: '10.36660/abc.20220891'
      }
    ]
  },

  // ============================================================================
  // 2. FLUTTER ATRIAL
  // ============================================================================
  {
    id: 'flutter-atrial',
    nome: 'Flutter Atrial',
    nomeInternacional: 'Atrial Flutter (AFL)',
    categoria: 'arritmia_supraventricular',
    descricao: 'Arritmia supraventricular macro-reentrante, tipicamente envolvendo o istmo cavotricuspídeo (flutter típico). Caracterizada por atividade atrial organizada em padrão "dentes de serra" com frequência atrial de 250-350 bpm e resposta ventricular dependente do grau de bloqueio AV.',
    criteriosECG: [
      'Ondas F (flutter) regulares em padrão "dentes de serra" (saw-tooth)',
      'Frequência atrial: 250-350/min (tipicamente ~300/min)',
      'Ondas F mais visíveis em DII, DIII, aVF e V1',
      'Condução AV geralmente fixa (2:1, 3:1, 4:1) ou variável',
      'Com bloqueio 2:1: FC ventricular ~150 bpm (300÷2)',
      'Flutter típico (anti-horário): ondas F negativas em derivações inferiores',
      'Flutter atípico (horário): ondas F positivas em derivações inferiores',
      'Linha isoelétrica ausente entre ondas F'
    ],
    caracteristicas: {
      frequencia: 'Atrial: 250-350 bpm; Ventricular: depende do bloqueio AV (75-150 bpm com bloqueio 2:1 a 4:1)',
      ritmo: 'Regular se bloqueio AV fixo; irregular se bloqueio variável',
      ondaP: 'Substituídas por ondas F em "dentes de serra", contínuas, sem linha isoelétrica',
      intervaloPR: 'Não aplicável - ondas F não permitem medir PR convencional',
      complexoQRS: 'Geralmente estreito (<120 ms); pode ser largo se bloqueio de ramo ou condução aberrante',
      outrasCaracteristicas: [
        'Flutter 2:1 com FC ~150 bpm é a apresentação mais comum',
        'Manobras vagais ou adenosina aumentam transitoriamente o bloqueio AV, revelando ondas F',
        'Flutter 1:1 (raro) pode ocorrer com antiarrítmicos classe IC ou em WPW - emergência!'
      ]
    },
    causas: [
      'Doença cardíaca estrutural (cardiopatia isquêmica, valvar)',
      'Hipertensão arterial',
      'Insuficiência cardíaca',
      'Pós-operatório de cirurgia cardíaca',
      'DPOC e cor pulmonale',
      'Tromboembolismo pulmonar',
      'Hipertireoidismo',
      'Pericardite',
      'Ablação incompleta de FA',
      'Uso de antiarrítmicos classe IC sem bloqueador de nó AV',
      'Cardiopatias congênitas corrigidas (comunicação interatrial)',
      'Dilatação atrial direita'
    ],
    significadoClinico: 'Risco tromboembólico similar à FA - anticoagulação conforme CHA2DS2-VASc. Frequentemente coexiste ou evolui para FA. Mais fácil de cardioverter que FA, mas tende a recorrer sem ablação. Flutter 1:1 é emergência (FC >200 bpm). Ablação do istmo cavotricuspídeo tem taxa de sucesso >95%.',
    urgencia: 'urgente',
    conduta: 'Avaliar estabilidade hemodinâmica. Flutter instável: cardioversão elétrica sincronizada (menor energia que FA - 50-100J). Flutter estável: controle de frequência difícil (bloqueio AV tende a ser "tudo ou nada"); considerar cardioversão precoce. Anticoagulação mesma indicação que FA.',
    tratamentoAgudo: [
      '1. Avaliar estabilidade hemodinâmica',
      '2. Se instável: Cardioversão elétrica sincronizada 50-100J bifásico (menor energia que FA)',
      '3. Se estável - Controle de FC: Bloqueadores do nó AV (Metoprolol, Diltiazem) - resposta geralmente parcial',
      '4. Flutter tende a ter controle de FC "tudo ou nada" - considerar cardioversão precoce',
      '5. Cardioversão química: Ibutilida IV é altamente eficaz (cuidado: prolonga QT, risco de TdP)',
      '6. Avaliar anticoagulação igual à FA - CHA2DS2-VASc se aplica',
      '7. Se duração >48h ou desconhecida: anticoagular 3 semanas antes de cardioversão ou ETE',
      '8. Overdrive pacing atrial: opção em pós-operatório com eletrodos epicárdicos'
    ],
    criteriosEncaminhamento: [
      'Todos os pacientes com flutter atrial devem ser avaliados para ablação',
      'Ablação do istmo cavotricuspídeo é curativa em >95% dos casos de flutter típico',
      'Flutter atípico requer mapeamento eletrofisiológico para ablação',
      'Refratariedade ao controle de frequência',
      'Flutter com FA concomitante - ablação de FA pode ser necessária',
      'Flutter 1:1 conduzido - emergência, encaminhar imediatamente após estabilização'
    ],
    redFlags: [
      'Flutter 1:1 com FC >200 bpm - emergência, pode degenerar para FV',
      'Flutter com QRS largo - pode ser condução anterógrada por via acessória (WPW)',
      'Instabilidade hemodinâmica',
      'Dor torácica ou dispneia grave',
      'Uso de antiarrítmico classe IC sem betabloqueador pode causar flutter 1:1',
      'Síncope ou pré-síncope',
      'Flutter em paciente com WPW - evitar bloqueadores do nó AV'
    ],
    dicasParaNaoEspecialista: [
      'Taquicardia regular com FC ~150 bpm = sempre pensar em flutter 2:1',
      'Manobra vagal ou adenosina ajuda a revelar ondas F sem interromper a arritmia',
      'Flutter é mais difícil de controlar FC que FA - cardioversão precoce é estratégia válida',
      'Anticoagulação segue as mesmas regras da FA (CHA2DS2-VASc)',
      'Flutter típico é altamente curável com ablação - encaminhe precocemente',
      'NUNCA use antiarrítmicos classe IC (propafenona, flecainida) sem betabloqueador - risco de flutter 1:1',
      'Energia de cardioversão para flutter é menor que para FA (50-100J vs 120-200J)'
    ],
    citations: [
      {
        refId: 'page-svt-2015',
        authors: ['Page RL', 'Joglar JA', 'Caldwell MA', 'et al.'],
        title: '2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia',
        journal: 'Circulation',
        year: 2016,
        volume: '133',
        pages: 'e506-e574',
        doi: '10.1161/CIR.0000000000000311',
        pmid: '26399663'
      },
      {
        refId: 'granada-flutter-2000',
        authors: ['Granada J', 'Uribe W', 'Chyou PH', 'et al.'],
        title: 'Incidence and predictors of atrial flutter in the general population',
        journal: 'Journal of the American College of Cardiology',
        year: 2000,
        volume: '36',
        pages: '2242-2246',
        doi: '10.1016/S0735-1097(00)00982-7',
        pmid: '11127467'
      }
    ]
  },

  // ============================================================================
  // 3. TAQUICARDIA ATRIAL MULTIFOCAL (TAM)
  // ============================================================================
  {
    id: 'taquicardia-atrial-multifocal',
    nome: 'Taquicardia Atrial Multifocal',
    nomeInternacional: 'Multifocal Atrial Tachycardia (MAT)',
    categoria: 'arritmia_supraventricular',
    descricao: 'Taquiarritmia atrial irregular caracterizada por múltiplos focos atriais ectópicos disparando de forma desorganizada. Fortemente associada a doença pulmonar grave (DPOC exacerbada), distúrbios eletrolíticos e estados de alta catecolamina. Frequentemente confundida com FA.',
    criteriosECG: [
      'Frequência cardíaca >100 bpm (geralmente 100-150 bpm)',
      'Pelo menos 3 morfologias distintas de onda P na mesma derivação',
      'Intervalos P-P, P-R e R-R variáveis',
      'Linha isoelétrica presente entre ondas P (diferente de FA/flutter)',
      'Cada onda P é seguida de QRS (condução AV 1:1, exceto se bloqueio)',
      'Ritmo irregular, mas ondas P claramente visíveis',
      'Intervalos PR variáveis (0,12-0,20s dependendo do foco)'
    ],
    caracteristicas: {
      frequencia: '100-150 bpm (definição requer >100 bpm; <100 bpm = ritmo atrial multifocal/wandering pacemaker)',
      ritmo: 'Irregular (intervalos R-R variáveis)',
      ondaP: 'Presentes, ≥3 morfologias diferentes na mesma derivação, claramente visíveis',
      intervaloPR: 'Variável (0,12-0,20s), dependendo da localização do foco ectópico',
      complexoQRS: 'Geralmente estreito (<120 ms)',
      outrasCaracteristicas: [
        'Diferencia-se da FA pela presença de ondas P discretas com linha isoelétrica',
        'Variação gradual da morfologia de P pode ocorrer',
        'Pode coexistir com extrassístoles atriais frequentes'
      ]
    },
    causas: [
      'Doença pulmonar obstrutiva crônica (DPOC) - causa mais comum (>60%)',
      'Exacerbação aguda de DPOC com hipoxemia',
      'Insuficiência respiratória aguda',
      'Cor pulmonale',
      'Distúrbios eletrolíticos (hipocalemia, hipomagnesemia)',
      'Insuficiência cardíaca descompensada',
      'Sepse e estados hipermetabólicos',
      'Uso de teofilina (toxicidade)',
      'Uso de beta-agonistas (albuterol, fenoterol)',
      'Intoxicação digitálica',
      'Pós-operatório',
      'Diabetes mellitus descompensado'
    ],
    significadoClinico: 'Marcador de doença de base grave, especialmente pulmonar. Mortalidade relacionada à gravidade da doença subjacente, não à arritmia em si. Conversão espontânea frequente com tratamento da causa. Anticoagulação geralmente não necessária (baixo risco embólico). Refratária a cardioversão elétrica.',
    urgencia: 'urgente',
    conduta: 'Tratar a causa de base é fundamental - TAM geralmente reflete doença sistêmica grave. Corrigir hipoxemia, distúrbios eletrolíticos, suspender teofilina/beta-agonistas se possível. Controle de frequência se sintomático. Não responde à cardioversão elétrica.',
    tratamentoAgudo: [
      '1. Identificar e tratar causa de base (prioridade absoluta)',
      '2. Corrigir hipoxemia: O2 suplementar, alvo SatO2 88-92% em DPOC',
      '3. Corrigir distúrbios eletrolíticos: Magnésio (2g IV) mesmo se Mg sérico normal',
      '4. Suspender ou reduzir teofilina e beta-agonistas se possível',
      '5. Controle de FC se necessário: Metoprolol (com cautela em DPOC) ou Diltiazem/Verapamil',
      '6. Magnésio IV (1-2g) pode ser eficaz mesmo sem hipomagnesemia',
      '7. Cardioversão elétrica NÃO é eficaz - não indicar',
      '8. Amiodarona raramente necessária, mas pode ser usada em casos refratários',
      '9. Tratar insuficiência cardíaca se presente'
    ],
    criteriosEncaminhamento: [
      'TAM persistente após correção de fatores desencadeantes',
      'Necessidade de avaliação de doença pulmonar de base',
      'Falha no controle de frequência',
      'Dúvida diagnóstica entre TAM e FA',
      'TAM em paciente sem causa identificável',
      'Considerar ablação por cateter em casos refratários (raro)'
    ],
    redFlags: [
      'Hipoxemia grave (SatO2 <88%) não responsiva a O2',
      'Instabilidade hemodinâmica',
      'Acidose respiratória grave',
      'TAM com FC muito elevada (>150 bpm) - pode indicar causa grave não tratada',
      'Sinais de intoxicação por teofilina (convulsões, náuseas, arritmias)',
      'Hipocalemia grave (<3,0 mEq/L)',
      'Sinais de sepse associada'
    ],
    dicasParaNaoEspecialista: [
      'TAM ≠ FA: na TAM você vê ondas P claras com morfologias diferentes; na FA não há ondas P',
      'Sempre pense em DPOC exacerbada quando ver TAM',
      'Corrija magnésio empiricamente - frequentemente subnormal mesmo com Mg sérico normal',
      'Cardioversão elétrica não funciona para TAM - é uma arritmia de mecanismo diferente',
      'Betabloqueadores devem ser usados com cautela em DPOC - preferir diltiazem se broncoespasmo',
      'Não há necessidade de anticoagulação rotineira na TAM',
      'A TAM geralmente resolve quando a causa de base é tratada'
    ],
    citations: [
      {
        refId: 'kastor-mat-1990',
        authors: ['Kastor JA'],
        title: 'Multifocal atrial tachycardia',
        journal: 'New England Journal of Medicine',
        year: 1990,
        volume: '322',
        pages: '1713-1717',
        doi: '10.1056/NEJM199006143222405',
        pmid: '2188131'
      },
      {
        refId: 'mccord-mat-1998',
        authors: ['McCord J', 'Borzak S'],
        title: 'Multifocal atrial tachycardia',
        journal: 'Chest',
        year: 1998,
        volume: '113',
        pages: '203-209',
        doi: '10.1378/chest.113.1.203',
        pmid: '9440591'
      }
    ]
  },

  // ============================================================================
  // 4. TAQUICARDIA SUPRAVENTRICULAR PAROXÍSTICA (TSVP/TRNAV)
  // ============================================================================
  {
    id: 'taquicardia-supraventricular-paroxistica',
    nome: 'Taquicardia Supraventricular Paroxística (TSVP/TRNAV)',
    nomeInternacional: 'Paroxysmal Supraventricular Tachycardia / AV Nodal Reentrant Tachycardia (PSVT/AVNRT)',
    categoria: 'arritmia_supraventricular',
    descricao: 'Taquicardia de início e término abruptos por mecanismo de reentrada. A Taquicardia por Reentrada Nodal AV (TRNAV) é a forma mais comum (~60%), utilizando vias lenta e rápida dentro ou próximo ao nó AV. Afeta tipicamente mulheres jovens e apresenta-se com palpitações regulares de início súbito.',
    criteriosECG: [
      'Taquicardia regular com FC 150-250 bpm (tipicamente 180-200 bpm)',
      'Início e término abruptos (documentado em Holter ou pelo paciente)',
      'QRS estreito (<120 ms) na maioria dos casos',
      'Ondas P geralmente não visíveis (ocultas no QRS) na TRNAV típica',
      'Pseudo-r\' em V1 e pseudo-s em derivações inferiores (onda P retrógrada)',
      'Intervalo RP curto (<70 ms) - P retrógrada logo após QRS',
      'Alternância elétrica do QRS pode ocorrer em FC muito altas'
    ],
    caracteristicas: {
      frequencia: '150-250 bpm (mais comumente 180-200 bpm)',
      ritmo: 'Regular como "relógio" - característica marcante',
      ondaP: 'TRNAV típica: P oculta no QRS ou imediatamente após (pseudo-r\' em V1); TRNAV atípica: P retrógrada mais evidente com RP longo',
      intervaloPR: 'Durante taquicardia: RP muito curto (<70-90 ms) na forma típica',
      complexoQRS: 'Estreito (<120 ms) na maioria; pode ser largo se bloqueio de ramo funcional ou preexistente',
      outrasCaracteristicas: [
        'Resposta "tudo ou nada" à adenosina - termina abruptamente',
        'Pode iniciar após extrassístole atrial',
        'Fenômeno de "warm-up" ausente (diferente de taquicardia atrial)',
        'Poliúria pós-taquicardia comum (liberação de peptídeo natriurético)'
      ]
    },
    causas: [
      'Via dupla nodal AV congênita (substrato anatômico)',
      'Gatilho: extrassístoles atriais ou ventriculares',
      'Estresse emocional e físico',
      'Cafeína, álcool, estimulantes',
      'Privação de sono',
      'Exercício físico',
      'Alterações hormonais (gravidez, ciclo menstrual)',
      'Hipertireoidismo',
      'Drogas simpaticomiméticas (descongestionantes, beta-agonistas)',
      'Geralmente sem cardiopatia estrutural associada'
    ],
    significadoClinico: 'Benigna na maioria dos casos, mas pode causar sintomas significativos e impacto na qualidade de vida. Raramente causa instabilidade hemodinâmica em corações normais. Síncope pode ocorrer especialmente em idosos ou se FC muito elevada. Ablação por cateter é curativa em >95% dos casos.',
    urgencia: 'urgente',
    conduta: 'Manobras vagais primeiro (Valsalva modificado, massagem do seio carotídeo). Se falhar: Adenosina IV push. Se refratária ou instável: cardioversão sincronizada. Após reversão: avaliar indicação de ablação (sintomas recorrentes, impacto na qualidade de vida).',
    tratamentoAgudo: [
      '1. Manobras vagais (primeira linha - eficácia 20-25%):',
      '   - Valsalva modificado: soprar seringa por 15s, deitar e elevar pernas 45° por 15s',
      '   - Massagem do seio carotídeo (evitar se sopro carotídeo, AVC prévio, >60 anos sem US)',
      '   - Reflexo de mergulho: gelo na face por 15s',
      '2. Adenosina 6mg IV push rápido em veia proximal + flush 20mL SF (eficácia ~90%)',
      '3. Se falhar: Adenosina 12mg IV (pode repetir 1x)',
      '4. Se adenosina contraindicada ou falhar: Verapamil 5mg IV em 2-3min ou Metoprolol 5mg IV',
      '5. Se instável: Cardioversão sincronizada 50-100J bifásico',
      '6. Após reversão: observar recorrência, ECG de base para excluir WPW',
      '7. Profilaxia se recorrente: Betabloqueador, Verapamil ou "pill-in-the-pocket"'
    ],
    criteriosEncaminhamento: [
      'Todos os pacientes com TSVP documentada devem ser avaliados por cardiologista/eletrofisiologista',
      'Indicação de ablação: episódios frequentes (>3/ano) ou intolerância/falha da profilaxia medicamentosa',
      'Ablação deve ser considerada como primeira linha em pacientes jovens que desejam evitar medicação crônica',
      'Suspeita de via acessória (WPW) - delta wave no ECG de base',
      'TSVP em profissionais com atividades de risco (pilotos, motoristas)',
      'TSVP durante gravidez - manejo especializado',
      'Sintomas graves ou síncope durante episódios'
    ],
    redFlags: [
      'Instabilidade hemodinâmica (raro, mas possível)',
      'QRS largo durante taquicardia - pode ser TV ou TSVP com aberrância/WPW',
      'Pré-excitação no ECG de base (delta wave) - indica WPW, evitar adenosina/bloqueadores do nó AV',
      'Síncope recorrente',
      'Frequência cardíaca >220 bpm - avaliar se é realmente TSVP ou via acessória',
      'TSVP em paciente com cardiopatia estrutural grave',
      'Dor torácica durante episódio'
    ],
    dicasParaNaoEspecialista: [
      'TSVP é caracterizada por ser "regular como relógio" - irregular exclui TRNAV',
      'Valsalva modificado (posição de elevação de pernas) é mais eficaz que Valsalva tradicional',
      'Adenosina é segura e diagnóstica/terapêutica - se terminar a taquicardia, confirma mecanismo supraventricular',
      'SEMPRE verifique ECG de base após reversão para excluir pré-excitação (WPW)',
      'Se o paciente já teve episódios: pergunte o que funcionou antes (manobras, medicamentos)',
      'Ablação tem taxa de sucesso >95% e baixo risco - ofereça como opção',
      'Estratégia "pill-in-the-pocket": Verapamil 80-120mg ou Propranolol 80mg ao início dos sintomas'
    ],
    citations: [
      {
        refId: 'page-svt-2015-2',
        authors: ['Page RL', 'Joglar JA', 'Caldwell MA', 'et al.'],
        title: '2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia',
        journal: 'Circulation',
        year: 2016,
        volume: '133',
        pages: 'e506-e574',
        doi: '10.1161/CIR.0000000000000311',
        pmid: '26399663'
      },
      {
        refId: 'appelboam-valsalva-2015',
        authors: ['Appelboam A', 'Reuben A', 'Mann C', 'et al.'],
        title: 'Postural modification to the standard Valsalva manoeuvre for emergency treatment of supraventricular tachycardias (REVERT): a randomised controlled trial',
        journal: 'Lancet',
        year: 2015,
        volume: '386',
        pages: '1747-1753',
        doi: '10.1016/S0140-6736(15)61485-4',
        pmid: '26314489'
      },
      {
        refId: 'brugada-svt-1991',
        authors: ['Brugada P', 'Brugada J', 'Mont L', 'et al.'],
        title: 'A new approach to the differential diagnosis of a regular tachycardia with a wide QRS complex',
        journal: 'Circulation',
        year: 1991,
        volume: '83',
        pages: '1649-1659',
        doi: '10.1161/01.CIR.83.5.1649',
        pmid: '2022022'
      }
    ]
  },

  // ============================================================================
  // 5. TAQUICARDIA ATRIAL FOCAL
  // ============================================================================
  {
    id: 'taquicardia-atrial-focal',
    nome: 'Taquicardia Atrial Focal',
    nomeInternacional: 'Focal Atrial Tachycardia (FAT)',
    categoria: 'arritmia_supraventricular',
    descricao: 'Taquicardia originada de um único foco ectópico atrial fora do nó sinusal, com mecanismo de automatismo aumentado, atividade deflagrada ou micro-reentrada. Representa ~10% das taquicardias supraventriculares. A morfologia da onda P indica a localização do foco.',
    criteriosECG: [
      'Frequência atrial 100-250 bpm (geralmente 150-200 bpm)',
      'Ondas P claramente visíveis, morfologia diferente do ritmo sinusal',
      'Intervalo P-P regular (ou com leve "warm-up" inicial)',
      'Relação P:QRS geralmente 1:1, pode haver bloqueio AV',
      'Intervalo PR dependente da localização do foco',
      'QRS estreito (a menos que bloqueio de ramo)',
      'Morfologia da P indica origem: positiva em V1 = AD; negativa em V1 = AE',
      'P negativa em aVL = origem septal; positiva = lateral'
    ],
    caracteristicas: {
      frequencia: '100-250 bpm (mais comumente 150-200 bpm)',
      ritmo: 'Regular na maioria dos casos; pode ter variação se automatismo',
      ondaP: 'Presente e visível, morfologia diferente da P sinusal; uma única morfologia (diferente de TAM)',
      intervaloPR: 'Variável conforme localização do foco: pode ser normal, curto ou longo',
      complexoQRS: 'Estreito (<120 ms) se condução normal',
      outrasCaracteristicas: [
        'Fenômeno de "warm-up": aceleração gradual no início (sugere automatismo)',
        'Fenômeno de "cool-down": desaceleração gradual antes de terminar',
        'Pode ocorrer com bloqueio AV variável (exclui TRNAV e via acessória)',
        'Adenosina: pode terminar, reduzir FC ou não ter efeito (diferente de TRNAV)'
      ]
    },
    causas: [
      'Cardiopatia estrutural (cardiomiopatia, pós-IAM)',
      'Intoxicação digitálica (taquicardia atrial com bloqueio AV)',
      'Distúrbios eletrolíticos (hipocalemia)',
      'DPOC e cor pulmonale',
      'Pós-ablação de FA (taquicardia atrial iatrogênica)',
      'Cardiopatias congênitas',
      'Miocardite',
      'Álcool e drogas estimulantes',
      'Pode ser idiopática (especialmente em jovens)',
      'Crista terminalis e veias pulmonares são sítios comuns'
    ],
    significadoClinico: 'Incessante pode causar taquicardiomiopatia (disfunção reversível do VE). Refratária a medicamentos em muitos casos. Resposta variável à adenosina (não "tudo ou nada" como TRNAV). Ablação tem sucesso menor que TRNAV (~80-90%) devido a múltiplas localizações possíveis.',
    urgencia: 'urgente',
    conduta: 'Controle de frequência se hemodinamicamente estável. Betabloqueadores são primeira linha. Adenosina pode terminar ou ajudar diagnóstico. Cardioversão elétrica raramente eficaz (automatismo). Encaminhar para ablação se refratária ou taquicardiomiopatia.',
    tratamentoAgudo: [
      '1. Avaliar estabilidade hemodinâmica',
      '2. Se estável - Controle de FC: Metoprolol 5mg IV ou Diltiazem 0,25mg/kg IV',
      '3. Adenosina 6-12mg IV: pode terminar (se micro-reentrada), reduzir FC ou não ter efeito',
      '4. Se adenosina não terminar mas houver bloqueio AV transitório = confirma taquicardia atrial (não TRNAV)',
      '5. Cardioversão elétrica: baixa eficácia se mecanismo for automatismo; pode tentar se refratária',
      '6. Amiodarona pode ser eficaz: 150mg IV em 10min',
      '7. Corrigir distúrbios eletrolíticos (K+, Mg2+)',
      '8. Se intoxicação digitálica suspeita: suspender digital, corrigir K+, considerar anticorpo anti-digoxina',
      '9. Avaliar função ventricular (ecocardiograma) para taquicardiomiopatia'
    ],
    criteriosEncaminhamento: [
      'Taquicardia atrial persistente ou frequentemente recorrente',
      'Suspeita de taquicardiomiopatia (FEVE reduzida)',
      'Refratariedade a controle medicamentoso',
      'Taquicardia atrial pós-ablação de FA',
      'Necessidade de definir localização do foco para ablação',
      'Taquicardia atrial em paciente com cardiopatia estrutural',
      'Dúvida diagnóstica com outras taquicardias supraventriculares'
    ],
    redFlags: [
      'Taquicardia atrial incessante - risco de taquicardiomiopatia',
      'Sinais de insuficiência cardíaca (disfunção VE)',
      'Taquicardia atrial com bloqueio AV 2:1 ou maior - pensar em intoxicação digitálica',
      'FC muito elevada (>200 bpm) com QRS largo - pode ser outra arritmia',
      'Instabilidade hemodinâmica',
      'Síncope ou pré-síncope'
    ],
    dicasParaNaoEspecialista: [
      'Diferente da TRNAV, taquicardia atrial pode ter bloqueio AV variável - isso ajuda no diagnóstico',
      'Se adenosina causa bloqueio AV mas a taquicardia continua = é taquicardia atrial, não TRNAV',
      'Warm-up (aceleração gradual no início) sugere automatismo',
      'Taquicardia atrial persistente pode causar cardiomiopatia reversível - avalie função VE',
      'A morfologia da onda P indica de onde vem o foco (útil para ablação)',
      'Taquicardia atrial com bloqueio AV é clássica de intoxicação digitálica',
      'Ablação é mais difícil que em TRNAV, mas ainda tem bom sucesso (~80-90%)'
    ],
    citations: [
      {
        refId: 'saoudi-fat-2001',
        authors: ['Saoudi N', 'Cosío F', 'Waldo A', 'et al.'],
        title: 'A classification of atrial flutter and regular atrial tachycardia according to electrophysiological mechanisms and anatomical bases',
        journal: 'European Heart Journal',
        year: 2001,
        volume: '22',
        pages: '1162-1182',
        doi: '10.1053/euhj.2001.2658',
        pmid: '11440492'
      },
      {
        refId: 'medi-at-2009',
        authors: ['Medi C', 'Kalman JM', 'Haqqani H', 'et al.'],
        title: 'Tachycardia-mediated cardiomyopathy secondary to focal atrial tachycardia: long-term outcome after catheter ablation',
        journal: 'Journal of the American College of Cardiology',
        year: 2009,
        volume: '53',
        pages: '1791-1797',
        doi: '10.1016/j.jacc.2009.02.014',
        pmid: '19422989'
      }
    ]
  },

  // ============================================================================
  // 6. EXTRASSÍSTOLE ATRIAL (EAP)
  // ============================================================================
  {
    id: 'extrassistole-atrial',
    nome: 'Extrassístole Atrial',
    nomeInternacional: 'Premature Atrial Complex (PAC) / Atrial Ectopic Beat',
    categoria: 'arritmia_supraventricular',
    descricao: 'Batimento atrial prematuro originado de foco ectópico fora do nó sinusal. Extremamente comum na população geral (>95% dos adultos têm EAPs em Holter de 24h). Geralmente benignas, mas carga elevada (>10.000/24h ou >10% dos batimentos) pode estar associada a FA e taquicardiomiopatia.',
    criteriosECG: [
      'Onda P prematura (antes do esperado pelo ritmo de base)',
      'Morfologia da onda P diferente da P sinusal',
      'Intervalo P-P\' (do batimento sinusal anterior ao EAP) < P-P basal',
      'Intervalo PR pode ser normal, curto ou longo (dependendo da origem)',
      'Pausa compensatória geralmente incompleta (soma P-P\' + P\'-P < 2x P-P basal)',
      'QRS geralmente estreito e igual ao de base',
      'EAP muito precoce pode ter QRS aberrante (condução com aberrância) ou ser bloqueada',
      'EAP bloqueada: apenas onda P\' sem QRS (pode mimetizar pausa sinusal)'
    ],
    caracteristicas: {
      frequencia: 'Variável - isoladas ou frequentes; carga elevada se >10% dos batimentos ou >10.000/24h',
      ritmo: 'Ritmo de base interrompido por batimentos prematuros',
      ondaP: 'Prematura com morfologia diferente da sinusal; pode ser positiva, negativa ou bifásica',
      intervaloPR: 'Geralmente normal ou levemente prolongado; pode ser curto se origem baixa no átrio',
      complexoQRS: 'Geralmente idêntico ao basal (estreito); pode ser aberrante se muito precoce',
      outrasCaracteristicas: [
        'Pausa compensatória incompleta (característica)',
        'Bigeminismo atrial: alternância sinusal-EAP',
        'Trigeminismo atrial: 2 sinusais + 1 EAP',
        'EAP interpolada: sem pausa (raro)',
        'EAP bloqueada: P\' sem QRS - parece pausa'
      ]
    },
    causas: [
      'Variante normal (achado incidental em pessoa saudável)',
      'Cafeína, álcool, tabaco',
      'Estresse e ansiedade',
      'Privação de sono',
      'Exercício físico intenso',
      'Distúrbios eletrolíticos (hipocalemia, hipomagnesemia)',
      'Hipertireoidismo',
      'Doença cardíaca estrutural',
      'Pós-cirurgia cardíaca',
      'Medicamentos (teofilina, simpaticomiméticos)',
      'Apneia obstrutiva do sono',
      'Dilatação atrial por qualquer causa'
    ],
    significadoClinico: 'Isoladas são benignas na maioria. Carga elevada de EAPs (>10.000/24h ou >10%) associada a maior risco de FA e possível taquicardiomiopatia. EAPs frequentes podem ser gatilho para FA. Geralmente não requerem tratamento, exceto se muito sintomáticas.',
    urgencia: 'rotina',
    conduta: 'Tranquilização na maioria dos casos. Reduzir fatores desencadeantes (cafeína, álcool, estresse). Investigar apenas se muito frequentes (>10%/24h), sintomáticas ou associadas a arritmias sustentadas. Tratamento medicamentoso raramente necessário.',
    tratamentoAgudo: [
      '1. EAPs isoladas geralmente não requerem tratamento',
      '2. Tranquilizar o paciente sobre a benignidade',
      '3. Orientar redução de fatores desencadeantes:',
      '   - Reduzir ou eliminar cafeína',
      '   - Moderar consumo de álcool',
      '   - Cessação do tabagismo',
      '   - Higiene do sono adequada',
      '   - Manejo do estresse',
      '4. Corrigir distúrbios eletrolíticos se presentes',
      '5. Se muito sintomáticas: Betabloqueador em baixa dose (Propranolol 10-20mg 2-3x/dia)',
      '6. Se refratárias e muito sintomáticas: considerar ablação do foco',
      '7. Investigar com Holter 24h se sintomas frequentes ou suspeita de alta carga'
    ],
    criteriosEncaminhamento: [
      'Carga de EAPs >10% em Holter 24h',
      'Sintomas incapacitantes apesar de medidas gerais',
      'Disfunção ventricular associada (suspeita de taquicardiomiopatia)',
      'EAPs desencadeando FA ou outras taquiarritmias sustentadas',
      'Dúvida diagnóstica com extrassístoles ventriculares',
      'Paciente com cardiopatia estrutural',
      'Considerar ablação se muito sintomáticas e refratárias'
    ],
    redFlags: [
      'Carga muito elevada de EAPs com disfunção VE - pode haver taquicardiomiopatia',
      'EAPs desencadeando taquiarritmias sustentadas (FA, flutter, TSVP)',
      'EAPs com QRS largo - diferenciar de extrassístoles ventriculares',
      'EAPs frequentes em paciente com cardiopatia estrutural',
      'Síncope ou pré-síncope associada (raro)',
      'Aumento progressivo da carga de EAPs'
    ],
    dicasParaNaoEspecialista: [
      'EAPs são extremamente comuns e quase sempre benignas - tranquilize o paciente',
      'A pausa após a EAP pode ser percebida como "falha" do coração - é normal',
      'EAP bloqueada parece pausa sinusal no ECG - procure a onda P\' escondida',
      'Alta carga de EAPs (>10%) merece investigação adicional com Holter',
      'Betabloqueadores em baixa dose são eficazes se sintomas persistentes',
      'Cafeína é o gatilho mais comum - pergunte sobre consumo',
      'Se EAPs têm QRS diferente do basal (largo), considere que podem ser ventriculares'
    ],
    citations: [
      {
        refId: 'himmelreich-pac-2019',
        authors: ['Himmelreich JCL', 'Lucassen WAM', 'Hof AWJ', 'et al.'],
        title: 'Diagnostic Accuracy of a Smartphone-Operated, Single-Lead Electrocardiography Device for Detection of Rhythm and Conduction Abnormalities in Primary Care',
        journal: 'Annals of Family Medicine',
        year: 2019,
        volume: '17',
        pages: '403-411',
        doi: '10.1370/afm.2438',
        pmid: '31501201'
      },
      {
        refId: 'binici-pac-2010',
        authors: ['Binici Z', 'Intzilakis T', 'Nielsen OW', 'et al.'],
        title: 'Excessive supraventricular ectopic activity and increased risk of atrial fibrillation and stroke',
        journal: 'Circulation',
        year: 2010,
        volume: '121',
        pages: '1904-1911',
        doi: '10.1161/CIRCULATIONAHA.109.874982',
        pmid: '20404258'
      }
    ]
  },

  // ============================================================================
  // 7. SÍNDROME DE WOLFF-PARKINSON-WHITE (WPW)
  // ============================================================================
  {
    id: 'wolff-parkinson-white',
    nome: 'Síndrome de Wolff-Parkinson-White',
    nomeInternacional: 'Wolff-Parkinson-White Syndrome (WPW)',
    categoria: 'arritmia_supraventricular',
    descricao: 'Síndrome de pré-excitação ventricular por via acessória congênita (feixe de Kent) que conecta átrios e ventrículos, bypassando o nó AV. Caracterizada por PR curto, delta wave e QRS alargado no ECG basal. Risco de morte súbita se FA conduzir rapidamente pela via acessória.',
    criteriosECG: [
      'Intervalo PR curto (<120 ms)',
      'Delta wave: empastamento inicial do QRS (pré-excitação)',
      'QRS alargado (>120 ms) devido à fusão de condução normal + via acessória',
      'Alterações secundárias de ST-T (discordantes da delta wave)',
      'Padrão tipo A (delta e QRS positivos em V1): via posterosseptal ou lateral esquerda',
      'Padrão tipo B (delta e QRS negativos em V1): via lateral direita',
      'Padrão de pseudo-infarto: ondas Q em derivações inferiores ou delta negativa podem mimetizar IAM',
      'Durante taquicardia ortodrômica: QRS estreito, P retrógrada após QRS'
    ],
    caracteristicas: {
      frequencia: 'ECG basal: normal; durante taquicardia: 150-250 bpm; FA pré-excitada: pode exceder 300 bpm',
      ritmo: 'Basal: sinusal com pré-excitação; pode ter episódios de TRAV ou FA',
      ondaP: 'Normal no ritmo sinusal; durante TRAV ortodrômica: P retrógrada após QRS',
      intervaloPR: '<120 ms (curto) devido ao bypass do nó AV pela via acessória',
      complexoQRS: '>120 ms com delta wave no basal; estreito durante TRAV ortodrômica',
      outrasCaracteristicas: [
        'Discordância de ST-T com polaridade oposta à delta wave',
        'Pode haver mais de uma via acessória (5-10%)',
        'Pré-excitação pode ser intermitente',
        'Localização da via pode ser inferida pelo padrão da delta wave'
      ]
    },
    causas: [
      'Congênita: falha no isolamento fibroso atrioventricular durante desenvolvimento',
      'Associação com anomalia de Ebstein (via acessória direita)',
      'Cardiomiopatia hipertrófica (maior prevalência)',
      'Transposição corrigida das grandes artérias',
      'Maioria sem cardiopatia estrutural associada',
      'Herança autossômica dominante em alguns casos (mutação PRKAG2)',
      'Pode ser achado incidental ou manifestar-se com arritmias'
    ],
    significadoClinico: 'Risco de morte súbita: 0,15-0,39% ao ano em pacientes sintomáticos. FA pré-excitada pode degenerar em fibrilação ventricular. Via acessória com período refratário curto (<250 ms) indica alto risco. Ablação é curativa em >95% dos casos e indicada especialmente em sintomáticos ou alto risco.',
    urgencia: 'urgente',
    conduta: 'WPW assintomático: estratificação de risco (estudo eletrofisiológico em profissões de risco ou atletas). WPW com taquicardia ortodrômica: adenosina pode ser usada. WPW com FA pré-excitada: NUNCA usar bloqueadores do nó AV; procainamida ou cardioversão. Ablação é tratamento definitivo.',
    tratamentoAgudo: [
      '1. Identificar o tipo de arritmia associada:',
      '',
      'A) TRAV ortodrômica (QRS estreito):',
      '   - Manobras vagais',
      '   - Adenosina 6-12mg IV pode ser usada com cautela',
      '   - Procainamida 15-17mg/kg IV como alternativa',
      '   - Cardioversão sincronizada se instável',
      '',
      'B) FA/Flutter pré-excitada (QRS largo, irregular, muito rápida) - EMERGÊNCIA:',
      '   - NUNCA usar adenosina, digoxina, betabloqueador, verapamil ou diltiazem',
      '   - Esses agentes bloqueiam o nó AV e aceleram condução pela via acessória',
      '   - Procainamida 15-17mg/kg IV (prolonga período refratário da via)',
      '   - Ibutilida IV como alternativa',
      '   - Cardioversão sincronizada 120-200J se instável ou FC muito alta (>200 bpm)',
      '',
      'C) TRAV antidrômica (QRS largo, regular):',
      '   - Tratar como FA pré-excitada (mesmo risco se degeneração)',
      '',
      '2. Após estabilização: encaminhar para ablação'
    ],
    criteriosEncaminhamento: [
      'TODO paciente com WPW deve ser avaliado por eletrofisiologista',
      'Ablação indicada se:',
      '   - Sintomático com arritmias (TRAV, FA)',
      '   - Profissão de risco (piloto, atleta profissional)',
      '   - Período refratário anterógrado da via <250 ms (alto risco)',
      '   - Via acessória septal (sucesso de ablação menor, mas necessária)',
      'WPW assintomático: discutir riscos/benefícios da ablação vs observação',
      'FA pré-excitada: ablação é mandatória após estabilização',
      'Paciente com síncope ou morte súbita abortada'
    ],
    redFlags: [
      'FA/Flutter pré-excitada: FC pode exceder 300 bpm - risco de FV e morte súbita',
      'QRS largo, irregular e muito rápido = NUNCA usar bloqueadores do nó AV',
      'Síncope em paciente com WPW - indica alto risco',
      'Morte súbita abortada',
      'FC >250 bpm durante arritmia',
      'Múltiplas vias acessórias',
      'WPW + cardiopatia estrutural (anomalia de Ebstein)'
    ],
    dicasParaNaoEspecialista: [
      'PR curto + delta wave + QRS largo = WPW até prova em contrário',
      'WPW pode mimetizar IAM no ECG - ondas Q falsas pelas delta waves negativas',
      'NUNCA dê adenosina, verapamil, diltiazem ou digoxina se FC irregular + QRS largo',
      'Taquicardia regular com QRS estreito em WPW (ortodrômica) = adenosina pode ser usada',
      'Taquicardia irregular com QRS largo e muito rápida = FA pré-excitada = procainamida ou cardioversão',
      'Se em dúvida, cardioversão elétrica é sempre segura',
      'Todo paciente com WPW deve ser encaminhado para eletrofisiologista - ablação é curativa'
    ],
    citations: [
      {
        refId: 'cohen-wpw-2012',
        authors: ['Cohen MI', 'Triedman JK', 'Cannon BC', 'et al.'],
        title: 'PACES/HRS Expert Consensus Statement on the Management of the Asymptomatic Young Patient with a Wolff-Parkinson-White Electrocardiographic Pattern',
        journal: 'Heart Rhythm',
        year: 2012,
        volume: '9',
        pages: '1006-1024',
        doi: '10.1016/j.hrthm.2012.03.050',
        pmid: '22579340'
      },
      {
        refId: 'al-khatib-wpw-2018',
        authors: ['Al-Khatib SM', 'Stevenson WG', 'Ackerman MJ', 'et al.'],
        title: '2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias and the Prevention of Sudden Cardiac Death',
        journal: 'Circulation',
        year: 2018,
        volume: '138',
        pages: 'e272-e391',
        doi: '10.1161/CIR.0000000000000549',
        pmid: '29084731'
      },
      {
        refId: 'pappone-wpw-2014',
        authors: ['Pappone C', 'Vicedomini G', 'Manguso F', 'et al.'],
        title: 'Wolff-Parkinson-White Syndrome in the Era of Catheter Ablation',
        journal: 'Circulation',
        year: 2014,
        volume: '130',
        pages: '811-819',
        doi: '10.1161/CIRCULATIONAHA.114.011154',
        pmid: '25052405'
      }
    ]
  },

  // ============================================================================
  // 8. RITMO JUNCIONAL
  // ============================================================================
  {
    id: 'ritmo-juncional',
    nome: 'Ritmo Juncional',
    nomeInternacional: 'Junctional Rhythm / Junctional Escape Rhythm',
    categoria: 'arritmia_supraventricular',
    descricao: 'Ritmo de escape ou acelerado originado na junção AV (nó AV ou feixe de His proximal). O ritmo juncional de escape ocorre quando o nó sinusal falha ou há bloqueio AV completo. O ritmo juncional acelerado indica automatismo aumentado da junção.',
    criteriosECG: [
      'Frequência: 40-60 bpm (escape) ou 60-100 bpm (acelerado) ou >100 bpm (taquicardia juncional)',
      'Ritmo regular',
      'QRS estreito (condução normal) ou largo (se bloqueio de ramo)',
      'Ondas P podem estar: ausentes, antes do QRS (PR<120ms), ou após o QRS (P retrógrada)',
      'Quando visível, onda P é negativa em DII, DIII, aVF (ativação atrial retrógrada)',
      'Dissociação AV pode ocorrer (P sinusais independentes do ritmo juncional)',
      'Intervalo R-R regular'
    ],
    caracteristicas: {
      frequencia: 'Escape: 40-60 bpm; Acelerado: 60-100 bpm; Taquicardia juncional: >100 bpm',
      ritmo: 'Regular',
      ondaP: 'Ausente, ou retrógrada (negativa em inferiores) antes ou após QRS; pode haver dissociação AV',
      intervaloPR: 'Se P presente antes do QRS: <120 ms; se P após QRS: não se aplica',
      complexoQRS: 'Geralmente estreito (<120 ms); pode ser largo se bloqueio de ramo',
      outrasCaracteristicas: [
        'Dissociação AV: ondas P sinusais com frequência diferente do QRS juncional',
        'Captura ocasional: batimento sinusal conduzido em meio ao ritmo juncional',
        'Fusão: complexo híbrido entre condução sinusal e juncional'
      ]
    },
    causas: [
      'Ritmo Juncional de ESCAPE (frequência baixa):',
      '  - Disfunção do nó sinusal (doença do nó sinusal)',
      '  - Bloqueio AV de alto grau ou completo',
      '  - Pós-cirurgia cardíaca',
      '  - Cardiopatias congênitas',
      '',
      'Ritmo Juncional ACELERADO (frequência aumentada):',
      '  - Intoxicação digitálica (causa clássica)',
      '  - Pós-operatório de cirurgia cardíaca',
      '  - Infarto inferior agudo',
      '  - Miocardite',
      '  - Hipercalemia',
      '  - Febre reumática aguda',
      '  - Teofilina',
      '',
      'Taquicardia Juncional (>100 bpm):',
      '  - Intoxicação digitálica',
      '  - Pós-operatório (especialmente pediátrico)',
      '  - Congênita (JET - Junctional Ectopic Tachycardia)'
    ],
    significadoClinico: 'Ritmo de escape: protetor - não suprimir! Indica falha do marcapasso sinusal. Ritmo juncional acelerado: pode indicar intoxicação digitálica ou isquemia. Taquicardia juncional pós-operatória (especialmente em crianças) é emergência.',
    urgencia: 'urgente',
    conduta: 'Ritmo juncional de escape: NÃO suprimir - é mecanismo de proteção; investigar causa do silêncio sinusal e avaliar necessidade de marcapasso. Ritmo juncional acelerado: investigar intoxicação digitálica, isquemia. Taquicardia juncional ectópica: resfriamento, amiodarona.',
    tratamentoAgudo: [
      '1. Ritmo Juncional de ESCAPE:',
      '   - NÃO usar antiarrítmicos - é ritmo de proteção',
      '   - Investigar causa: disfunção sinusal, bloqueio AV, medicamentos',
      '   - Atropina 0,5-1mg IV pode acelerar ritmo sinusal',
      '   - Marcapasso transcutâneo se bradicardia sintomática',
      '   - Avaliar necessidade de marcapasso definitivo',
      '',
      '2. Ritmo Juncional ACELERADO:',
      '   - Investigar intoxicação digitálica (nível sérico, K+)',
      '   - Se intoxicação digitálica: suspender digital, corrigir K+, Mg2+',
      '   - Anticorpo anti-digoxina (Fab) se intoxicação grave',
      '   - Investigar isquemia miocárdica (IAM inferior)',
      '   - Geralmente autolimitado com tratamento da causa',
      '',
      '3. Taquicardia Juncional Ectópica (JET):',
      '   - Comum em pós-operatório pediátrico - emergência',
      '   - Resfriamento corporal (34-35°C)',
      '   - Amiodarona IV',
      '   - Overdrive pacing atrial se eletrodos disponíveis',
      '   - Evitar catecolaminas'
    ],
    criteriosEncaminhamento: [
      'Ritmo juncional de escape: avaliar necessidade de marcapasso definitivo',
      'Disfunção sinusal com escapes juncionais - estudo eletrofisiológico',
      'Bloqueio AV de alto grau com escape juncional',
      'Taquicardia juncional ectópica persistente',
      'Suspeita de síndrome taqui-bradi',
      'Síncope associada',
      'Ritmo juncional em paciente com cardiopatia congênita'
    ],
    redFlags: [
      'Ritmo juncional muito lento (<40 bpm) com sintomas - risco de assistolia',
      'Taquicardia juncional ectópica em pós-operatório pediátrico - emergência',
      'Dissociação AV completa - pode indicar bloqueio AV completo',
      'Sinais de intoxicação digitálica (náuseas, visão amarelada, arritmias múltiplas)',
      'Síncope ou pré-síncope',
      'Pausa >3 segundos ao tentar suprimir arritmia (indica ausência de escape)'
    ],
    dicasParaNaoEspecialista: [
      'Ritmo juncional de escape = NUNCA suprimir - é mecanismo de proteção contra assistolia',
      'QRS estreito + ritmo regular + sem onda P visível ou P negativa em inferiores = juncional',
      'Ritmo juncional acelerado + outros sinais (náuseas, visão amarela) = pensar em digital',
      'Se o paciente usa digoxina e tem arritmia, sempre verifique nível sérico e potássio',
      'Atropina pode ajudar a "desmascarar" ritmo sinusal em escape juncional',
      'FC 40-60 regular com QRS estreito e sem P = escape juncional, não BAVT',
      'Taquicardia juncional pós-operatória em criança é emergência - precisa de UTI'
    ],
    citations: [
      {
        refId: 'hafeez-junctional-2023',
        authors: ['Hafeez Y', 'Grossman SA'],
        title: 'Junctional Rhythm',
        journal: 'StatPearls [Internet]',
        year: 2023,
        pages: 'NBK507715',
        pmid: '29939545'
      },
      {
        refId: 'dodge-khatami-jet-2002',
        authors: ['Dodge-Khatami A', 'Miller OI', 'Anderson RH', 'et al.'],
        title: 'Impact of junctional ectopic tachycardia on postoperative morbidity following repair of congenital heart defects',
        journal: 'European Journal of Cardio-Thoracic Surgery',
        year: 2002,
        volume: '21',
        pages: '255-259',
        doi: '10.1016/S1010-7940(01)01123-1',
        pmid: '11825732'
      },
      {
        refId: 'curr-emergency-cardiac-2021',
        authors: ['Surawicz B', 'Knilans TK'],
        title: 'Chou\'s Electrocardiography in Clinical Practice',
        journal: 'Elsevier',
        year: 2021,
        volume: '7th edition',
        pages: '287-312'
      }
    ]
  }
];

export default arritmiasSupra;
