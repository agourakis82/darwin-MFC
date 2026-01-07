/**
 * PROTOCOLOS COM FLUXOGRAMAS - DARWIN-MFC
 * ========================================
 * Protocolos clínicos com fluxogramas interativos para React Flow
 */

import { Protocolo, ProtocolNode, ProtocolEdge } from '@/lib/types/protocolo';

// =============================================================================
// PROTOCOLO: HIPERTENSÃO ARTERIAL SISTÊMICA
// =============================================================================

const hasNodes: ProtocolNode[] = [
  {
    id: 'has-start',
    type: 'custom',
    position: { x: 400, y: 0 },
    data: {
      label: 'Início',
      description: 'Paciente com suspeita de HAS',
      nodeType: 'start',
      ciap2: 'K85',
      cid10: 'I10',
    },
  },
  {
    id: 'has-medir-pa',
    type: 'custom',
    position: { x: 400, y: 100 },
    data: {
      label: 'Medir PA',
      description: 'Técnica correta, repouso 5min',
      nodeType: 'assessment',
      details: [
        'Paciente sentado, pés no chão',
        'Braço na altura do coração',
        'Manguito adequado',
        'Duas medidas com 1min intervalo',
      ],
      exams: ['PA em consultório'],
    },
  },
  {
    id: 'has-pa-elevada',
    type: 'custom',
    position: { x: 400, y: 220 },
    data: {
      label: 'PA ≥ 140/90?',
      nodeType: 'decision',
    },
  },
  {
    id: 'has-pa-normal',
    type: 'custom',
    position: { x: 150, y: 320 },
    data: {
      label: 'PA Normal',
      description: 'Orientar MEV e reavaliar',
      nodeType: 'info',
      details: ['Orientar estilo de vida saudável', 'Reavaliar em 1-2 anos'],
    },
  },
  {
    id: 'has-confirmar',
    type: 'custom',
    position: { x: 400, y: 340 },
    data: {
      label: 'Confirmar Diagnóstico',
      description: 'MRPA ou MAPA',
      nodeType: 'assessment',
      details: [
        'MRPA: 2 medidas manhã e noite por 5-7 dias',
        'MAPA: monitorização 24h',
        'Média ≥130/80 = HAS confirmada',
      ],
      exams: ['MRPA', 'MAPA'],
    },
  },
  {
    id: 'has-confirmado',
    type: 'custom',
    position: { x: 400, y: 460 },
    data: {
      label: 'HAS Confirmada?',
      nodeType: 'decision',
    },
  },
  {
    id: 'has-estratificar',
    type: 'custom',
    position: { x: 400, y: 580 },
    data: {
      label: 'Estratificar Risco CV',
      description: 'Avaliar LOA e FRCV',
      nodeType: 'assessment',
      details: [
        'Fatores de risco CV',
        'Lesões em órgãos-alvo',
        'Doenças CV estabelecidas',
        'Calculadora de risco',
      ],
      exams: ['Creatinina', 'EAS', 'Potássio', 'Glicemia', 'Colesterol', 'ECG'],
      calculadoras: ['risco-cv', 'ckdepi'],
    },
  },
  {
    id: 'has-estagio1',
    type: 'custom',
    position: { x: 150, y: 700 },
    data: {
      label: 'Estágio 1 + Baixo Risco',
      description: 'PA 140-159/90-99',
      nodeType: 'info',
    },
  },
  {
    id: 'has-mev',
    type: 'custom',
    position: { x: 150, y: 820 },
    data: {
      label: 'MEV 3-6 meses',
      description: 'Mudanças de estilo de vida',
      nodeType: 'action',
      details: [
        'Reduzir sal (<5g/dia)',
        'Dieta DASH',
        'Atividade física 150min/sem',
        'Perda de peso se obeso',
        'Cessar tabagismo',
        'Moderar álcool',
      ],
    },
  },
  {
    id: 'has-estagio2-3',
    type: 'custom',
    position: { x: 400, y: 700 },
    data: {
      label: 'Estágio 2-3 ou Alto Risco',
      description: 'PA ≥160/100 ou risco elevado',
      nodeType: 'alert',
      alertLevel: 'high',
    },
  },
  {
    id: 'has-iniciar-tto',
    type: 'custom',
    position: { x: 400, y: 820 },
    data: {
      label: 'Iniciar Tratamento',
      description: 'MEV + Farmacológico',
      nodeType: 'treatment',
      medications: ['Losartana', 'Enalapril', 'Anlodipino', 'HCTZ'],
      details: [
        'Estágio 2: Iniciar com 2 drogas',
        'Preferir combinações sinérgicas',
        'IECA/BRA + Diurético ou BCC',
      ],
    },
  },
  {
    id: 'has-meta',
    type: 'custom',
    position: { x: 400, y: 940 },
    data: {
      label: 'Meta Atingida?',
      description: 'PA <140/90 (ou <130/80 se alto risco)',
      nodeType: 'decision',
    },
  },
  {
    id: 'has-manter',
    type: 'custom',
    position: { x: 150, y: 1040 },
    data: {
      label: 'Manter Tratamento',
      description: 'Acompanhamento regular',
      nodeType: 'action',
      details: [
        'Consultas a cada 3-6 meses',
        'Exames anuais',
        'Reforçar MEV',
        'Avaliar adesão',
      ],
    },
  },
  {
    id: 'has-intensificar',
    type: 'custom',
    position: { x: 400, y: 1040 },
    data: {
      label: 'Intensificar',
      description: 'Adicionar 3ª droga',
      nodeType: 'treatment',
      medications: ['Espironolactona', 'Betabloqueador', 'Hidralazina'],
      details: [
        'Verificar adesão primeiro',
        'Espironolactona se HAS resistente',
        'Considerar causas secundárias',
      ],
    },
  },
  {
    id: 'has-resistente',
    type: 'custom',
    position: { x: 650, y: 1040 },
    data: {
      label: 'HAS Resistente?',
      description: '3 drogas em dose plena + diurético',
      nodeType: 'decision',
    },
  },
  {
    id: 'has-encaminhar',
    type: 'custom',
    position: { x: 650, y: 1160 },
    data: {
      label: 'Encaminhar',
      description: 'Especialista / Cardiologia',
      nodeType: 'referral',
      referTo: 'Cardiologia',
      details: [
        'Investigar HAS secundária',
        'Hiperaldosteronismo',
        'Estenose de artéria renal',
        'Feocromocitoma',
      ],
    },
  },
  {
    id: 'has-end',
    type: 'custom',
    position: { x: 150, y: 1160 },
    data: {
      label: 'Controle Mantido',
      description: 'Acompanhamento longitudinal',
      nodeType: 'end',
    },
  },
];

const hasEdges: ProtocolEdge[] = [
  { id: 'e-has-1', source: 'has-start', target: 'has-medir-pa' },
  { id: 'e-has-2', source: 'has-medir-pa', target: 'has-pa-elevada' },
  { id: 'e-has-3', source: 'has-pa-elevada', target: 'has-pa-normal', sourceHandle: 'no', label: 'Não' },
  { id: 'e-has-4', source: 'has-pa-elevada', target: 'has-confirmar', sourceHandle: 'yes', label: 'Sim' },
  { id: 'e-has-5', source: 'has-confirmar', target: 'has-confirmado' },
  { id: 'e-has-6', source: 'has-confirmado', target: 'has-pa-normal', sourceHandle: 'no', label: 'Não' },
  { id: 'e-has-7', source: 'has-confirmado', target: 'has-estratificar', sourceHandle: 'yes', label: 'Sim' },
  { id: 'e-has-8', source: 'has-estratificar', target: 'has-estagio1' },
  { id: 'e-has-9', source: 'has-estratificar', target: 'has-estagio2-3' },
  { id: 'e-has-10', source: 'has-estagio1', target: 'has-mev' },
  { id: 'e-has-11', source: 'has-mev', target: 'has-meta' },
  { id: 'e-has-12', source: 'has-estagio2-3', target: 'has-iniciar-tto' },
  { id: 'e-has-13', source: 'has-iniciar-tto', target: 'has-meta' },
  { id: 'e-has-14', source: 'has-meta', target: 'has-manter', sourceHandle: 'yes', label: 'Sim' },
  { id: 'e-has-15', source: 'has-meta', target: 'has-intensificar', sourceHandle: 'no', label: 'Não' },
  { id: 'e-has-16', source: 'has-intensificar', target: 'has-resistente' },
  { id: 'e-has-17', source: 'has-resistente', target: 'has-meta', sourceHandle: 'no', label: 'Não' },
  { id: 'e-has-18', source: 'has-resistente', target: 'has-encaminhar', sourceHandle: 'yes', label: 'Sim' },
  { id: 'e-has-19', source: 'has-manter', target: 'has-end' },
];

export const protocoloHAS: Protocolo = {
  id: 'has',
  titulo: 'Hipertensão Arterial Sistêmica',
  subtitulo: 'Diagnóstico e Tratamento na APS',
  categoria: 'cardiovascular',
  complexidade: 'intermediario',
  versao: '2024.1',
  ultimaAtualizacao: '2024-12',
  fonte: 'Diretrizes Brasileiras de Hipertensão 2020',
  ciap2: ['K85', 'K86', 'K87'],
  cid10: ['I10', 'I11', 'I12', 'I13', 'I15'],
  descricao: 'Protocolo para diagnóstico, estratificação de risco e tratamento da hipertensão arterial sistêmica na Atenção Primária à Saúde.',
  objetivos: [
    'Confirmar diagnóstico de HAS',
    'Estratificar risco cardiovascular',
    'Iniciar tratamento adequado',
    'Atingir metas pressóricas',
    'Prevenir complicações',
  ],
  populacaoAlvo: 'Adultos ≥18 anos com suspeita ou diagnóstico de HAS',
  nodes: hasNodes,
  edges: hasEdges,
  criteriosInclusao: [
    'PA ≥140/90 mmHg em consulta',
    'História de HAS em tratamento',
    'Encaminhamento por HAS',
  ],
  sinaisAlerta: [
    'PA ≥180/120 mmHg (emergência/urgência)',
    'Sintomas de LOA aguda',
    'Cefaleia intensa, alteração visual, dispneia',
    'Dor torácica, déficit neurológico',
  ],
  encaminhamento: {
    quando: [
      'HAS resistente (3+ drogas)',
      'Suspeita de HAS secundária',
      'Crise hipertensiva com LOA',
      'HAS em jovens (<30 anos)',
    ],
    paraCQuem: 'Cardiologia / Nefrologia',
  },
  referencias: [
    'Diretrizes Brasileiras de Hipertensão Arterial 2020',
    'Cadernos de Atenção Básica nº 37 - HAS',
  ],
  doencasRelacionadas: ['hipertensao-arterial', 'doenca-renal-cronica', 'insuficiencia-cardiaca'],
  medicamentosRelacionados: ['losartana', 'enalapril', 'anlodipino', 'hidroclorotiazida'],
  calculadorasRelacionadas: ['risco-cv', 'ckdepi'],
  tags: ['hipertensao', 'has', 'cardiovascular', 'cronico', 'aps'],
};

// =============================================================================
// PROTOCOLO: DIABETES MELLITUS TIPO 2
// =============================================================================

const dm2Nodes: ProtocolNode[] = [
  {
    id: 'dm2-start',
    type: 'custom',
    position: { x: 400, y: 0 },
    data: {
      label: 'Início',
      description: 'Suspeita de DM2 ou rastreamento',
      nodeType: 'start',
      ciap2: 'T90',
      cid10: 'E11',
    },
  },
  {
    id: 'dm2-rastreio',
    type: 'custom',
    position: { x: 400, y: 100 },
    data: {
      label: 'Rastreamento',
      description: 'Quem rastrear?',
      nodeType: 'assessment',
      details: [
        'Idade ≥45 anos',
        'IMC ≥25 + fator de risco',
        'Pré-diabetes prévio',
        'História de DM gestacional',
        'HAS, dislipidemia',
      ],
    },
  },
  {
    id: 'dm2-exames',
    type: 'custom',
    position: { x: 400, y: 220 },
    data: {
      label: 'Solicitar Exames',
      nodeType: 'action',
      exams: ['Glicemia de jejum', 'HbA1c', 'TOTG 75g'],
      details: [
        'GJ: jejum 8h',
        'HbA1c: não precisa jejum',
        'TOTG: se GJ inconclusiva',
      ],
    },
  },
  {
    id: 'dm2-interpretar',
    type: 'custom',
    position: { x: 400, y: 340 },
    data: {
      label: 'Diagnóstico?',
      description: 'GJ≥126 ou HbA1c≥6,5% ou TOTG≥200',
      nodeType: 'decision',
    },
  },
  {
    id: 'dm2-pre',
    type: 'custom',
    position: { x: 150, y: 440 },
    data: {
      label: 'Pré-diabetes',
      description: 'GJ 100-125 ou HbA1c 5,7-6,4%',
      nodeType: 'info',
      details: [
        'Risco aumentado de DM',
        'MEV intensiva',
        'Considerar metformina se alto risco',
      ],
    },
  },
  {
    id: 'dm2-confirmar',
    type: 'custom',
    position: { x: 400, y: 440 },
    data: {
      label: 'DM2 Confirmado',
      description: 'Repetir exame se assintomático',
      nodeType: 'alert',
      alertLevel: 'medium',
    },
  },
  {
    id: 'dm2-avaliar',
    type: 'custom',
    position: { x: 400, y: 560 },
    data: {
      label: 'Avaliação Inicial',
      description: 'Complicações e comorbidades',
      nodeType: 'assessment',
      exams: ['Creatinina/TFG', 'EAS + microalbuminúria', 'Perfil lipídico', 'Fundo de olho', 'ECG'],
      details: [
        'Avaliar nefropatia',
        'Avaliar retinopatia',
        'Avaliar neuropatia',
        'Rastrear doença CV',
      ],
    },
  },
  {
    id: 'dm2-meta',
    type: 'custom',
    position: { x: 400, y: 680 },
    data: {
      label: 'Definir Meta HbA1c',
      nodeType: 'action',
      details: [
        'Geral: <7%',
        'Idoso frágil: <8%',
        'Jovem sem complicações: <6,5%',
        'Individualizar!',
      ],
    },
  },
  {
    id: 'dm2-hba1c',
    type: 'custom',
    position: { x: 400, y: 800 },
    data: {
      label: 'HbA1c atual?',
      nodeType: 'decision',
    },
  },
  {
    id: 'dm2-mono',
    type: 'custom',
    position: { x: 150, y: 900 },
    data: {
      label: 'HbA1c <7,5%',
      description: 'Monoterapia',
      nodeType: 'treatment',
      medications: ['Metformina'],
      details: [
        'Metformina 500-850mg',
        'Titular até 2000-2550mg/dia',
        'Associar MEV',
      ],
    },
  },
  {
    id: 'dm2-dupla',
    type: 'custom',
    position: { x: 400, y: 900 },
    data: {
      label: 'HbA1c 7,5-9%',
      description: 'Terapia Dupla',
      nodeType: 'treatment',
      medications: ['Metformina', 'Sulfonilureia', 'iSGLT2', 'GLP-1'],
      details: [
        'Metformina + 2º agente',
        'Se DCV: preferir iSGLT2 ou GLP-1',
        'Se DRC: preferir iSGLT2',
      ],
    },
  },
  {
    id: 'dm2-insulina',
    type: 'custom',
    position: { x: 650, y: 900 },
    data: {
      label: 'HbA1c >9%',
      description: 'Considerar Insulina',
      nodeType: 'treatment',
      medications: ['Insulina NPH', 'Insulina Regular', 'Metformina'],
      details: [
        'Se sintomas: iniciar insulina',
        'Insulina basal (NPH) à noite',
        'Dose inicial: 10UI ou 0,1-0,2 UI/kg',
      ],
    },
  },
  {
    id: 'dm2-reavaliar',
    type: 'custom',
    position: { x: 400, y: 1020 },
    data: {
      label: 'Reavaliar 3 meses',
      description: 'HbA1c na meta?',
      nodeType: 'decision',
    },
  },
  {
    id: 'dm2-manter',
    type: 'custom',
    position: { x: 150, y: 1120 },
    data: {
      label: 'Manter Tratamento',
      description: 'Monitorar complicações',
      nodeType: 'action',
      details: [
        'HbA1c a cada 3-6 meses',
        'Microalbuminúria anual',
        'Fundo de olho anual',
        'Exame dos pés toda consulta',
      ],
    },
  },
  {
    id: 'dm2-intensificar',
    type: 'custom',
    position: { x: 400, y: 1120 },
    data: {
      label: 'Intensificar',
      description: 'Adicionar ou ajustar medicação',
      nodeType: 'treatment',
      details: [
        'Adicionar 3º agente oral',
        'Ou iniciar/intensificar insulina',
        'Basal-bolus se necessário',
      ],
    },
  },
  {
    id: 'dm2-end',
    type: 'custom',
    position: { x: 150, y: 1240 },
    data: {
      label: 'Acompanhamento',
      description: 'Controle glicêmico mantido',
      nodeType: 'end',
    },
  },
];

const dm2Edges: ProtocolEdge[] = [
  { id: 'e-dm2-1', source: 'dm2-start', target: 'dm2-rastreio' },
  { id: 'e-dm2-2', source: 'dm2-rastreio', target: 'dm2-exames' },
  { id: 'e-dm2-3', source: 'dm2-exames', target: 'dm2-interpretar' },
  { id: 'e-dm2-4', source: 'dm2-interpretar', target: 'dm2-pre', sourceHandle: 'no', label: 'Não' },
  { id: 'e-dm2-5', source: 'dm2-interpretar', target: 'dm2-confirmar', sourceHandle: 'yes', label: 'Sim' },
  { id: 'e-dm2-6', source: 'dm2-confirmar', target: 'dm2-avaliar' },
  { id: 'e-dm2-7', source: 'dm2-avaliar', target: 'dm2-meta' },
  { id: 'e-dm2-8', source: 'dm2-meta', target: 'dm2-hba1c' },
  { id: 'e-dm2-9', source: 'dm2-hba1c', target: 'dm2-mono', label: '<7,5%' },
  { id: 'e-dm2-10', source: 'dm2-hba1c', target: 'dm2-dupla', label: '7,5-9%' },
  { id: 'e-dm2-11', source: 'dm2-hba1c', target: 'dm2-insulina', label: '>9%' },
  { id: 'e-dm2-12', source: 'dm2-mono', target: 'dm2-reavaliar' },
  { id: 'e-dm2-13', source: 'dm2-dupla', target: 'dm2-reavaliar' },
  { id: 'e-dm2-14', source: 'dm2-insulina', target: 'dm2-reavaliar' },
  { id: 'e-dm2-15', source: 'dm2-reavaliar', target: 'dm2-manter', sourceHandle: 'yes', label: 'Sim' },
  { id: 'e-dm2-16', source: 'dm2-reavaliar', target: 'dm2-intensificar', sourceHandle: 'no', label: 'Não' },
  { id: 'e-dm2-17', source: 'dm2-intensificar', target: 'dm2-reavaliar' },
  { id: 'e-dm2-18', source: 'dm2-manter', target: 'dm2-end' },
  { id: 'e-dm2-19', source: 'dm2-pre', target: 'dm2-rastreio', label: 'Reavaliar 1 ano' },
];

export const protocoloDM2: Protocolo = {
  id: 'dm2',
  titulo: 'Diabetes Mellitus Tipo 2',
  subtitulo: 'Rastreamento, Diagnóstico e Tratamento',
  categoria: 'endocrino',
  complexidade: 'intermediario',
  versao: '2024.1',
  ultimaAtualizacao: '2024-12',
  fonte: 'Diretrizes SBD 2024 / ADA 2024',
  ciap2: ['T90'],
  cid10: ['E11', 'E11.0', 'E11.9'],
  descricao: 'Protocolo para rastreamento, diagnóstico e tratamento do Diabetes Mellitus tipo 2 na Atenção Primária.',
  objetivos: [
    'Rastrear população de risco',
    'Confirmar diagnóstico',
    'Estratificar complicações',
    'Individualizar metas',
    'Tratar adequadamente',
  ],
  populacaoAlvo: 'Adultos com fatores de risco para DM ou diagnóstico estabelecido',
  nodes: dm2Nodes,
  edges: dm2Edges,
  sinaisAlerta: [
    'Cetoacidose diabética',
    'Estado hiperosmolar',
    'Hipoglicemia grave',
    'Pé diabético infectado',
  ],
  referencias: [
    'Diretrizes da Sociedade Brasileira de Diabetes 2024',
    'Standards of Care in Diabetes - ADA 2024',
  ],
  doencasRelacionadas: ['diabetes-mellitus-2', 'obesidade', 'dislipidemia'],
  medicamentosRelacionados: ['metformina', 'glibenclamida', 'insulina-nph', 'insulina-regular'],
  calculadorasRelacionadas: ['ckdepi', 'risco-cv'],
  tags: ['diabetes', 'dm2', 'endocrino', 'cronico', 'glicemia'],
};

// =============================================================================
// PROTOCOLO: DOR TORÁCICA - URGÊNCIA
// =============================================================================

const dorToracicaNodes: ProtocolNode[] = [
  {
    id: 'dt-start',
    type: 'custom',
    position: { x: 400, y: 0 },
    data: {
      label: 'Dor Torácica',
      description: 'Paciente com dor no peito',
      nodeType: 'start',
      ciap2: 'A11',
      cid10: 'R07.4',
    },
  },
  {
    id: 'dt-estavel',
    type: 'custom',
    position: { x: 400, y: 100 },
    data: {
      label: 'Estável?',
      description: 'Avaliar sinais vitais e consciência',
      nodeType: 'decision',
      details: [
        'PA, FC, FR, SatO2',
        'Nível de consciência',
        'Perfusão periférica',
      ],
    },
  },
  {
    id: 'dt-instavel',
    type: 'custom',
    position: { x: 150, y: 200 },
    data: {
      label: 'INSTÁVEL',
      description: 'Choque, hipotensão, dispneia grave',
      nodeType: 'alert',
      alertLevel: 'critical',
      details: [
        'Acesso venoso',
        'O2 suplementar',
        'Monitor cardíaco',
        'SAMU 192',
      ],
    },
  },
  {
    id: 'dt-samu',
    type: 'custom',
    position: { x: 150, y: 320 },
    data: {
      label: 'Acionar SAMU',
      description: 'Transferência imediata',
      nodeType: 'referral',
      referTo: 'SAMU 192 / Emergência',
    },
  },
  {
    id: 'dt-anamnese',
    type: 'custom',
    position: { x: 400, y: 200 },
    data: {
      label: 'Anamnese',
      description: 'Caracterizar a dor',
      nodeType: 'assessment',
      details: [
        'Localização, irradiação',
        'Caráter (aperto, pontada, queimação)',
        'Duração, início',
        'Fatores de piora/melhora',
        'Sintomas associados',
      ],
    },
  },
  {
    id: 'dt-tipica',
    type: 'custom',
    position: { x: 400, y: 320 },
    data: {
      label: 'Dor típica isquêmica?',
      description: 'Aperto retroesternal com irradiação',
      nodeType: 'decision',
    },
  },
  {
    id: 'dt-ecg',
    type: 'custom',
    position: { x: 400, y: 440 },
    data: {
      label: 'ECG em 10 min',
      description: 'Supra de ST ou BRE novo?',
      nodeType: 'assessment',
      exams: ['ECG 12 derivações'],
    },
  },
  {
    id: 'dt-iamcsst',
    type: 'custom',
    position: { x: 150, y: 540 },
    data: {
      label: 'IAM c/ supra ST',
      description: 'Tempo é músculo!',
      nodeType: 'alert',
      alertLevel: 'critical',
      medications: ['AAS 300mg', 'Clopidogrel', 'Heparina'],
      details: [
        'AAS 300mg VO mastigar',
        'Acionar hemodinâmica',
        'Transferir para ICP primária',
      ],
    },
  },
  {
    id: 'dt-scassst',
    type: 'custom',
    position: { x: 400, y: 540 },
    data: {
      label: 'SCA sem supra ST',
      description: 'Infra ST, inversão de T, ou ECG normal',
      nodeType: 'alert',
      alertLevel: 'high',
      medications: ['AAS', 'Clopidogrel', 'Enoxaparina'],
    },
  },
  {
    id: 'dt-troponina',
    type: 'custom',
    position: { x: 400, y: 660 },
    data: {
      label: 'Dosar Troponina',
      description: 'Se disponível, seriada',
      nodeType: 'action',
      exams: ['Troponina', 'CKMB'],
    },
  },
  {
    id: 'dt-estratificar',
    type: 'custom',
    position: { x: 400, y: 780 },
    data: {
      label: 'Estratificar Risco',
      description: 'HEART, TIMI ou GRACE',
      nodeType: 'assessment',
      calculadoras: ['heart-score'],
      details: [
        'HEART Score',
        'Se alto risco: internar',
        'Se baixo risco: investigar ambulatorial',
      ],
    },
  },
  {
    id: 'dt-nao-cardiaca',
    type: 'custom',
    position: { x: 650, y: 320 },
    data: {
      label: 'Dor não típica',
      description: 'Avaliar outras causas',
      nodeType: 'info',
      details: [
        'Musculoesquelética',
        'Gastrointestinal (DRGE)',
        'Pulmonar (pleurite, TEP)',
        'Psicogênica',
      ],
    },
  },
  {
    id: 'dt-gravidade',
    type: 'custom',
    position: { x: 650, y: 440 },
    data: {
      label: 'Sinais de Gravidade?',
      description: 'TEP, dissecção, pneumotórax',
      nodeType: 'decision',
    },
  },
  {
    id: 'dt-investigar',
    type: 'custom',
    position: { x: 650, y: 560 },
    data: {
      label: 'Investigar Causa',
      description: 'Exames direcionados',
      nodeType: 'action',
      exams: ['RX tórax', 'ECG', 'D-dímero'],
    },
  },
  {
    id: 'dt-end-urgencia',
    type: 'custom',
    position: { x: 150, y: 780 },
    data: {
      label: 'Transferir Urgência',
      description: 'Hospital com hemodinâmica',
      nodeType: 'end',
    },
  },
  {
    id: 'dt-end-ambulatorio',
    type: 'custom',
    position: { x: 650, y: 680 },
    data: {
      label: 'Acompanhar',
      description: 'Ambulatorial se baixo risco',
      nodeType: 'end',
    },
  },
];

const dorToracicaEdges: ProtocolEdge[] = [
  { id: 'e-dt-1', source: 'dt-start', target: 'dt-estavel' },
  { id: 'e-dt-2', source: 'dt-estavel', target: 'dt-instavel', sourceHandle: 'no', label: 'Não' },
  { id: 'e-dt-3', source: 'dt-estavel', target: 'dt-anamnese', sourceHandle: 'yes', label: 'Sim' },
  { id: 'e-dt-4', source: 'dt-instavel', target: 'dt-samu' },
  { id: 'e-dt-5', source: 'dt-anamnese', target: 'dt-tipica' },
  { id: 'e-dt-6', source: 'dt-tipica', target: 'dt-ecg', sourceHandle: 'yes', label: 'Sim' },
  { id: 'e-dt-7', source: 'dt-tipica', target: 'dt-nao-cardiaca', sourceHandle: 'no', label: 'Não' },
  { id: 'e-dt-8', source: 'dt-ecg', target: 'dt-iamcsst', label: 'Supra ST' },
  { id: 'e-dt-9', source: 'dt-ecg', target: 'dt-scassst', label: 'Alteração sem supra' },
  { id: 'e-dt-10', source: 'dt-scassst', target: 'dt-troponina' },
  { id: 'e-dt-11', source: 'dt-troponina', target: 'dt-estratificar' },
  { id: 'e-dt-12', source: 'dt-iamcsst', target: 'dt-end-urgencia' },
  { id: 'e-dt-13', source: 'dt-nao-cardiaca', target: 'dt-gravidade' },
  { id: 'e-dt-14', source: 'dt-gravidade', target: 'dt-samu', sourceHandle: 'yes', label: 'Sim' },
  { id: 'e-dt-15', source: 'dt-gravidade', target: 'dt-investigar', sourceHandle: 'no', label: 'Não' },
  { id: 'e-dt-16', source: 'dt-investigar', target: 'dt-end-ambulatorio' },
  { id: 'e-dt-17', source: 'dt-estratificar', target: 'dt-end-urgencia', label: 'Alto risco' },
  { id: 'e-dt-18', source: 'dt-estratificar', target: 'dt-end-ambulatorio', label: 'Baixo risco' },
];

export const protocoloDorToracica: Protocolo = {
  id: 'dor-toracica',
  titulo: 'Dor Torácica',
  subtitulo: 'Abordagem na APS/UPA',
  categoria: 'urgencia',
  complexidade: 'avancado',
  versao: '2024.1',
  ultimaAtualizacao: '2024-12',
  fonte: 'Diretrizes SBC - Síndrome Coronariana Aguda',
  ciap2: ['A11', 'K01', 'K02', 'K74', 'K75', 'K76'],
  cid10: ['R07.4', 'I20', 'I21', 'I22'],
  descricao: 'Protocolo de abordagem inicial da dor torácica com foco na identificação de síndromes coronarianas agudas.',
  objetivos: [
    'Identificar paciente instável',
    'Reconhecer SCA rapidamente',
    'Iniciar tratamento precoce',
    'Estratificar risco',
    'Encaminhar adequadamente',
  ],
  populacaoAlvo: 'Adultos com dor torácica aguda',
  nodes: dorToracicaNodes,
  edges: dorToracicaEdges,
  sinaisAlerta: [
    'Instabilidade hemodinâmica',
    'Supra de ST no ECG',
    'Dor típica isquêmica',
    'Dispneia, sudorese, palidez',
  ],
  referencias: [
    'V Diretriz da SBC sobre SCA 2015',
    'ESC Guidelines on ACS 2023',
  ],
  doencasRelacionadas: ['infarto-agudo-miocardio', 'angina-instavel'],
  medicamentosRelacionados: ['aas', 'clopidogrel', 'enoxaparina'],
  calculadorasRelacionadas: ['heart-score'],
  tags: ['urgencia', 'dor-toracica', 'sca', 'iam', 'emergencia'],
};

// =============================================================================
// PROTOCOLO: INFECÇÃO DO TRATO URINÁRIO
// =============================================================================

const ituNodes: ProtocolNode[] = [
  { id: 'itu-start', type: 'custom', position: { x: 400, y: 0 }, data: { label: 'Início', description: 'Suspeita de ITU', nodeType: 'start', ciap2: 'U71', cid10: 'N39.0' } },
  { id: 'itu-sintomas', type: 'custom', position: { x: 400, y: 100 }, data: { label: 'Sintomas', description: 'Disúria, polaciúria, urgência', nodeType: 'assessment', details: ['Disúria', 'Polaciúria', 'Urgência miccional', 'Dor suprapúbica'] } },
  { id: 'itu-complicada', type: 'custom', position: { x: 400, y: 220 }, data: { label: 'ITU Complicada?', description: 'Febre, homem, gestante, cateter', nodeType: 'decision' } },
  { id: 'itu-simples', type: 'custom', position: { x: 150, y: 340 }, data: { label: 'Cistite Não Complicada', nodeType: 'treatment', medications: ['Nitrofurantoína', 'Fosfomicina', 'SMX-TMP'], details: ['Nitrofurantoína 100mg 6/6h 5 dias', 'Fosfomicina 3g dose única', 'SMX-TMP 800/160mg 12/12h 3 dias'] } },
  { id: 'itu-complexa', type: 'custom', position: { x: 400, y: 340 }, data: { label: 'ITU Complicada', description: 'Exames e antibiótico por 7-14 dias', nodeType: 'alert', alertLevel: 'high', exams: ['EAS', 'Urocultura', 'Hemograma', 'Creatinina'] } },
  { id: 'itu-pielonefrite', type: 'custom', position: { x: 650, y: 340 }, data: { label: 'Pielonefrite?', description: 'Febre, dor lombar, toxemia', nodeType: 'decision' } },
  { id: 'itu-pielo-tto', type: 'custom', position: { x: 650, y: 460 }, data: { label: 'Tratamento Pielonefrite', nodeType: 'treatment', medications: ['Ciprofloxacino', 'Ceftriaxona'], details: ['Ciprofloxacino 500mg 12/12h 7 dias', 'Se grave: Ceftriaxona 1g IV e internar'] } },
  { id: 'itu-end', type: 'custom', position: { x: 150, y: 460 }, data: { label: 'Alta com Orientações', nodeType: 'end', details: ['Hidratação', 'Micção pós-coito', 'Higiene adequada'] } },
];

const ituEdges: ProtocolEdge[] = [
  { id: 'e-itu-1', source: 'itu-start', target: 'itu-sintomas' },
  { id: 'e-itu-2', source: 'itu-sintomas', target: 'itu-complicada' },
  { id: 'e-itu-3', source: 'itu-complicada', target: 'itu-simples', sourceHandle: 'no', label: 'Não' },
  { id: 'e-itu-4', source: 'itu-complicada', target: 'itu-complexa', sourceHandle: 'yes', label: 'Sim' },
  { id: 'e-itu-5', source: 'itu-complexa', target: 'itu-pielonefrite' },
  { id: 'e-itu-6', source: 'itu-pielonefrite', target: 'itu-pielo-tto', sourceHandle: 'yes', label: 'Sim' },
  { id: 'e-itu-7', source: 'itu-simples', target: 'itu-end' },
];

export const protocoloITU: Protocolo = {
  id: 'itu', titulo: 'Infecção do Trato Urinário', subtitulo: 'Cistite e Pielonefrite na APS',
  categoria: 'infeccioso', complexidade: 'basico', versao: '2024.1', ultimaAtualizacao: '2024-12',
  fonte: 'Diretrizes IDSA / Protocolo MS', ciap2: ['U71'], cid10: ['N39.0', 'N10'],
  descricao: 'Protocolo para diagnóstico e tratamento de ITU na atenção primária.',
  objetivos: ['Diferenciar cistite de pielonefrite', 'Tratar adequadamente', 'Prevenir recorrências'],
  populacaoAlvo: 'Adultos com sintomas urinários',
  nodes: ituNodes, edges: ituEdges,
  sinaisAlerta: ['Febre alta', 'Sepse', 'Obstrução urinária'],
  referencias: ['IDSA Guidelines 2011', 'Caderno AB nº 19'],
  doencasRelacionadas: ['infeccao-urinaria'], medicamentosRelacionados: ['nitrofurantoina', 'sulfametoxazol-trimetoprima'],
  calculadorasRelacionadas: ['ckdepi'], tags: ['itu', 'cistite', 'pielonefrite', 'antibiotico'],
};

// =============================================================================
// PROTOCOLO: ASMA
// =============================================================================

const asmaNodes: ProtocolNode[] = [
  { id: 'asma-start', type: 'custom', position: { x: 400, y: 0 }, data: { label: 'Início', description: 'Suspeita de Asma', nodeType: 'start', ciap2: 'R96', cid10: 'J45' } },
  { id: 'asma-dx', type: 'custom', position: { x: 400, y: 100 }, data: { label: 'Diagnóstico', description: 'Sintomas + Espirometria', nodeType: 'assessment', exams: ['Espirometria com BD'], details: ['Sibilos, dispneia, tosse', 'VEF1/CVF <0,7', 'Resposta BD ≥12% e 200mL'] } },
  { id: 'asma-controle', type: 'custom', position: { x: 400, y: 220 }, data: { label: 'Nível de Controle?', description: 'Usar questionário GINA', nodeType: 'decision' } },
  { id: 'asma-controlada', type: 'custom', position: { x: 150, y: 340 }, data: { label: 'Controlada', description: 'Manter step atual', nodeType: 'action', details: ['Sintomas <2x/semana', 'Sem despertares', 'SABA <2x/semana', 'Sem limitação atividade'] } },
  { id: 'asma-parcial', type: 'custom', position: { x: 400, y: 340 }, data: { label: 'Parcial/Não Controlada', description: 'Step up', nodeType: 'treatment', medications: ['Beclometasona', 'Budesonida', 'Salbutamol'], details: ['Step 1: SABA SOS', 'Step 2: CI dose baixa', 'Step 3: CI+LABA', 'Step 4: CI médio+LABA'] } },
  { id: 'asma-crise', type: 'custom', position: { x: 650, y: 340 }, data: { label: 'Exacerbação?', nodeType: 'decision' } },
  { id: 'asma-crise-tto', type: 'custom', position: { x: 650, y: 460 }, data: { label: 'Tratar Crise', nodeType: 'alert', alertLevel: 'high', medications: ['Salbutamol', 'Prednisona'], details: ['SABA: 4-10 jatos 20/20min', 'Corticoide oral 5-7 dias', 'O2 se SatO2<92%'] } },
  { id: 'asma-end', type: 'custom', position: { x: 400, y: 480 }, data: { label: 'Seguimento', description: 'Reavaliar em 1-3 meses', nodeType: 'end' } },
];

const asmaEdges: ProtocolEdge[] = [
  { id: 'e-asma-1', source: 'asma-start', target: 'asma-dx' },
  { id: 'e-asma-2', source: 'asma-dx', target: 'asma-controle' },
  { id: 'e-asma-3', source: 'asma-controle', target: 'asma-controlada', label: 'Controlada' },
  { id: 'e-asma-4', source: 'asma-controle', target: 'asma-parcial', label: 'Parcial/Não' },
  { id: 'e-asma-5', source: 'asma-controle', target: 'asma-crise', label: 'Crise' },
  { id: 'e-asma-6', source: 'asma-crise', target: 'asma-crise-tto', sourceHandle: 'yes', label: 'Sim' },
  { id: 'e-asma-7', source: 'asma-parcial', target: 'asma-end' },
  { id: 'e-asma-8', source: 'asma-controlada', target: 'asma-end' },
];

export const protocoloAsma: Protocolo = {
  id: 'asma', titulo: 'Asma', subtitulo: 'Diagnóstico e Tratamento',
  categoria: 'respiratorio', complexidade: 'intermediario', versao: '2024.1', ultimaAtualizacao: '2024-12',
  fonte: 'GINA 2024', ciap2: ['R96'], cid10: ['J45', 'J46'],
  descricao: 'Protocolo para manejo da asma baseado em GINA 2024.',
  objetivos: ['Confirmar diagnóstico', 'Avaliar controle', 'Escalonar tratamento'],
  populacaoAlvo: 'Pacientes com sintomas respiratórios sugestivos de asma',
  nodes: asmaNodes, edges: asmaEdges,
  sinaisAlerta: ['Crise grave', 'SatO2<90%', 'Silêncio respiratório'],
  referencias: ['GINA 2024', 'Caderno AB DPOC/Asma'],
  doencasRelacionadas: ['asma'], medicamentosRelacionados: ['salbutamol', 'beclometasona', 'prednisona'],
  calculadorasRelacionadas: [], tags: ['asma', 'respiratorio', 'broncodilatador', 'corticoide'],
};

// =============================================================================
// PROTOCOLO: LOMBALGIA
// =============================================================================

const lombalgiaNodes: ProtocolNode[] = [
  { id: 'lomb-start', type: 'custom', position: { x: 400, y: 0 }, data: { label: 'Início', description: 'Dor lombar', nodeType: 'start', ciap2: 'L03', cid10: 'M54.5' } },
  { id: 'lomb-red-flags', type: 'custom', position: { x: 400, y: 100 }, data: { label: 'Red Flags?', description: 'Sinais de alarme', nodeType: 'decision', details: ['Trauma significativo', 'Febre, perda peso', 'Déficit neurológico', 'Sd cauda equina', 'Idade >50 + história CA'] } },
  { id: 'lomb-urgente', type: 'custom', position: { x: 150, y: 200 }, data: { label: 'Investigar Urgente', nodeType: 'alert', alertLevel: 'critical', exams: ['RX coluna', 'RM', 'Hemograma', 'VHS'], details: ['Se déficit neuro: RM urgente', 'Se suspeita infecção: hemograma, VHS'] } },
  { id: 'lomb-aguda', type: 'custom', position: { x: 400, y: 220 }, data: { label: 'Duração?', nodeType: 'decision' } },
  { id: 'lomb-aguda-tto', type: 'custom', position: { x: 400, y: 340 }, data: { label: 'Lombalgia Aguda (<6 sem)', nodeType: 'treatment', medications: ['Paracetamol', 'Ibuprofeno', 'Ciclobenzaprina'], details: ['Manter atividade conforme tolerado', 'Analgesia escalonada', 'Não solicitar imagem de rotina'] } },
  { id: 'lomb-cronica', type: 'custom', position: { x: 650, y: 340 }, data: { label: 'Lombalgia Crônica (>12 sem)', nodeType: 'treatment', medications: ['Duloxetina', 'Amitriptilina'], details: ['Fisioterapia ativa', 'Exercícios', 'Analgésicos', 'Considerar psicoterapia'] } },
  { id: 'lomb-end', type: 'custom', position: { x: 400, y: 460 }, data: { label: 'Seguimento', description: 'Reavaliar em 2-4 semanas', nodeType: 'end' } },
];

const lombalgiaEdges: ProtocolEdge[] = [
  { id: 'e-lomb-1', source: 'lomb-start', target: 'lomb-red-flags' },
  { id: 'e-lomb-2', source: 'lomb-red-flags', target: 'lomb-urgente', sourceHandle: 'yes', label: 'Sim' },
  { id: 'e-lomb-3', source: 'lomb-red-flags', target: 'lomb-aguda', sourceHandle: 'no', label: 'Não' },
  { id: 'e-lomb-4', source: 'lomb-aguda', target: 'lomb-aguda-tto', label: '<12 sem' },
  { id: 'e-lomb-5', source: 'lomb-aguda', target: 'lomb-cronica', label: '>12 sem' },
  { id: 'e-lomb-6', source: 'lomb-aguda-tto', target: 'lomb-end' },
  { id: 'e-lomb-7', source: 'lomb-cronica', target: 'lomb-end' },
];

export const protocoloLombalgia: Protocolo = {
  id: 'lombalgia', titulo: 'Lombalgia', subtitulo: 'Dor Lombar na APS',
  categoria: 'musculoesqueletico', complexidade: 'basico', versao: '2024.1', ultimaAtualizacao: '2024-12',
  fonte: 'NICE Guidelines / ACP', ciap2: ['L03', 'L84', 'L86'], cid10: ['M54.5', 'M51'],
  descricao: 'Abordagem da dor lombar aguda e crônica.',
  objetivos: ['Excluir red flags', 'Tratar sintomas', 'Prevenir cronificação'],
  populacaoAlvo: 'Adultos com dor lombar',
  nodes: lombalgiaNodes, edges: lombalgiaEdges,
  sinaisAlerta: ['Síndrome cauda equina', 'Déficit motor progressivo', 'Febre'],
  referencias: ['NICE Low Back Pain 2020', 'ACP Guidelines'],
  doencasRelacionadas: ['lombalgia'], medicamentosRelacionados: ['paracetamol', 'ibuprofeno', 'amitriptilina'],
  calculadorasRelacionadas: [], tags: ['lombalgia', 'dor', 'coluna', 'musculoesqueletico'],
};

// =============================================================================
// PROTOCOLO: DEPRESSÃO
// =============================================================================

const depressaoNodes: ProtocolNode[] = [
  { id: 'dep-start', type: 'custom', position: { x: 400, y: 0 }, data: { label: 'Início', description: 'Suspeita de depressão', nodeType: 'start', ciap2: 'P76', cid10: 'F32' } },
  { id: 'dep-phq9', type: 'custom', position: { x: 400, y: 100 }, data: { label: 'Aplicar PHQ-9', description: 'Rastreamento', nodeType: 'assessment', calculadoras: ['phq-9'], details: ['0-4: Mínima', '5-9: Leve', '10-14: Moderada', '15-19: Mod-grave', '20-27: Grave'] } },
  { id: 'dep-suicidio', type: 'custom', position: { x: 400, y: 220 }, data: { label: 'Risco Suicídio?', description: 'Perguntar diretamente', nodeType: 'decision' } },
  { id: 'dep-urgencia', type: 'custom', position: { x: 150, y: 320 }, data: { label: 'Alto Risco', nodeType: 'alert', alertLevel: 'critical', referTo: 'CAPS / Emergência', details: ['Ideação estruturada', 'Tentativa prévia', 'Plano definido', 'Acesso a meios'] } },
  { id: 'dep-gravidade', type: 'custom', position: { x: 400, y: 340 }, data: { label: 'Gravidade?', nodeType: 'decision' } },
  { id: 'dep-leve', type: 'custom', position: { x: 250, y: 460 }, data: { label: 'Leve', nodeType: 'treatment', details: ['Psicoeducação', 'Atividade física', 'TCC se disponível', 'Reavalar 2-4 semanas'] } },
  { id: 'dep-moderada', type: 'custom', position: { x: 450, y: 460 }, data: { label: 'Moderada-Grave', nodeType: 'treatment', medications: ['Fluoxetina', 'Sertralina', 'Escitalopram'], details: ['ISRS 1ª linha', 'Iniciar dose baixa', 'Efeito em 2-4 semanas', 'Psicoterapia se possível'] } },
  { id: 'dep-end', type: 'custom', position: { x: 400, y: 580 }, data: { label: 'Seguimento', description: 'Reavaliar em 2-4 semanas', nodeType: 'end' } },
];

const depressaoEdges: ProtocolEdge[] = [
  { id: 'e-dep-1', source: 'dep-start', target: 'dep-phq9' },
  { id: 'e-dep-2', source: 'dep-phq9', target: 'dep-suicidio' },
  { id: 'e-dep-3', source: 'dep-suicidio', target: 'dep-urgencia', sourceHandle: 'yes', label: 'Alto' },
  { id: 'e-dep-4', source: 'dep-suicidio', target: 'dep-gravidade', sourceHandle: 'no', label: 'Baixo' },
  { id: 'e-dep-5', source: 'dep-gravidade', target: 'dep-leve', label: 'PHQ<10' },
  { id: 'e-dep-6', source: 'dep-gravidade', target: 'dep-moderada', label: 'PHQ≥10' },
  { id: 'e-dep-7', source: 'dep-leve', target: 'dep-end' },
  { id: 'e-dep-8', source: 'dep-moderada', target: 'dep-end' },
];

export const protocoloDepressao: Protocolo = {
  id: 'depressao', titulo: 'Depressão', subtitulo: 'Transtorno Depressivo na APS',
  categoria: 'saude_mental', complexidade: 'intermediario', versao: '2024.1', ultimaAtualizacao: '2024-12',
  fonte: 'CANMAT 2024 / MS Brasil', ciap2: ['P76', 'P03'], cid10: ['F32', 'F33'],
  descricao: 'Rastreamento, diagnóstico e tratamento da depressão.',
  objetivos: ['Rastrear com PHQ-9', 'Avaliar risco suicídio', 'Tratar adequadamente'],
  populacaoAlvo: 'Adultos com sintomas depressivos',
  nodes: depressaoNodes, edges: depressaoEdges,
  sinaisAlerta: ['Ideação suicida', 'Psicose', 'Mania'],
  referencias: ['CANMAT 2024', 'Caderno AB Saúde Mental'],
  doencasRelacionadas: ['depressao', 'ansiedade'], medicamentosRelacionados: ['fluoxetina', 'sertralina', 'amitriptilina'],
  calculadorasRelacionadas: ['phq9'], tags: ['depressao', 'saude-mental', 'antidepressivo', 'isrs'],
};

// =============================================================================
// PROTOCOLO: CEFALEIA
// =============================================================================

const cefaleiaNodes: ProtocolNode[] = [
  { id: 'cef-start', type: 'custom', position: { x: 400, y: 0 }, data: { label: 'Início', description: 'Cefaleia', nodeType: 'start', ciap2: 'N01', cid10: 'R51' } },
  { id: 'cef-red-flags', type: 'custom', position: { x: 400, y: 100 }, data: { label: 'Red Flags?', nodeType: 'decision', details: ['Início súbito "pior da vida"', 'Déficit neurológico', 'Febre + rigidez nuca', 'Papiledema', 'Pós-trauma', '>50 anos nova cefaleia'] } },
  { id: 'cef-urgente', type: 'custom', position: { x: 150, y: 200 }, data: { label: 'Investigar Urgente', nodeType: 'alert', alertLevel: 'critical', exams: ['TC crânio', 'Punção lombar'], referTo: 'Emergência' } },
  { id: 'cef-tipo', type: 'custom', position: { x: 400, y: 220 }, data: { label: 'Tipo de Cefaleia?', nodeType: 'decision' } },
  { id: 'cef-tensional', type: 'custom', position: { x: 250, y: 340 }, data: { label: 'Tensional', description: 'Bilateral, aperto, sem náusea', nodeType: 'treatment', medications: ['Paracetamol', 'Ibuprofeno'], details: ['Analgésico simples', 'Profilaxia: Amitriptilina 10-25mg/noite'] } },
  { id: 'cef-enxaqueca', type: 'custom', position: { x: 450, y: 340 }, data: { label: 'Enxaqueca', description: 'Unilateral, pulsátil, náusea, foto/fonofobia', nodeType: 'treatment', medications: ['Sumatriptano', 'AINEs', 'Propranolol'], details: ['Crise: Triptano ou AINE', 'Profilaxia: Propranolol, Amitriptilina, Topiramato'] } },
  { id: 'cef-cluster', type: 'custom', position: { x: 650, y: 340 }, data: { label: 'Cluster', description: 'Periorbital, intensa, rinorreia', nodeType: 'referral', referTo: 'Neurologia' } },
  { id: 'cef-end', type: 'custom', position: { x: 400, y: 460 }, data: { label: 'Seguimento', nodeType: 'end' } },
];

const cefaleiaEdges: ProtocolEdge[] = [
  { id: 'e-cef-1', source: 'cef-start', target: 'cef-red-flags' },
  { id: 'e-cef-2', source: 'cef-red-flags', target: 'cef-urgente', sourceHandle: 'yes', label: 'Sim' },
  { id: 'e-cef-3', source: 'cef-red-flags', target: 'cef-tipo', sourceHandle: 'no', label: 'Não' },
  { id: 'e-cef-4', source: 'cef-tipo', target: 'cef-tensional', label: 'Tensional' },
  { id: 'e-cef-5', source: 'cef-tipo', target: 'cef-enxaqueca', label: 'Enxaqueca' },
  { id: 'e-cef-6', source: 'cef-tipo', target: 'cef-cluster', label: 'Cluster' },
  { id: 'e-cef-7', source: 'cef-tensional', target: 'cef-end' },
  { id: 'e-cef-8', source: 'cef-enxaqueca', target: 'cef-end' },
];

export const protocoloCefaleia: Protocolo = {
  id: 'cefaleia', titulo: 'Cefaleia', subtitulo: 'Dor de Cabeça na APS',
  categoria: 'neurologico', complexidade: 'intermediario', versao: '2024.1', ultimaAtualizacao: '2024-12',
  fonte: 'IHS / SBCe', ciap2: ['N01', 'N89', 'N90'], cid10: ['R51', 'G43', 'G44'],
  descricao: 'Abordagem diagnóstica e terapêutica das cefaleias primárias.',
  objetivos: ['Excluir cefaleias secundárias', 'Classificar cefaleia primária', 'Tratar agudo e profilático'],
  populacaoAlvo: 'Pacientes com cefaleia',
  nodes: cefaleiaNodes, edges: cefaleiaEdges,
  sinaisAlerta: ['Cefaleia súbita intensa', 'Déficit neurológico', 'Febre + rigidez'],
  referencias: ['ICHD-3', 'Diretrizes SBCe'],
  doencasRelacionadas: ['cefaleia-tensional', 'enxaqueca'], medicamentosRelacionados: ['paracetamol', 'ibuprofeno', 'amitriptilina', 'propranolol'],
  calculadorasRelacionadas: [], tags: ['cefaleia', 'enxaqueca', 'neurologico', 'dor'],
};

// =============================================================================
// PROTOCOLO: IVAS
// =============================================================================

const ivasNodes: ProtocolNode[] = [
  { id: 'ivas-start', type: 'custom', position: { x: 400, y: 0 }, data: { label: 'Início', description: 'Sintomas de IVAS', nodeType: 'start', ciap2: 'R74', cid10: 'J06' } },
  { id: 'ivas-sintomas', type: 'custom', position: { x: 400, y: 100 }, data: { label: 'Avaliar', description: 'Coriza, tosse, odinofagia, febre', nodeType: 'assessment' } },
  { id: 'ivas-faringite', type: 'custom', position: { x: 400, y: 220 }, data: { label: 'Faringite?', description: 'Odinofagia predominante', nodeType: 'decision' } },
  { id: 'ivas-strep', type: 'custom', position: { x: 400, y: 340 }, data: { label: 'Critérios de Centor?', description: 'Febre, exsudato, adenomegalia, sem tosse', nodeType: 'decision', details: ['Febre >38°C', 'Exsudato amigdaliano', 'Adenomegalia cervical anterior', 'Ausência de tosse', '≥3: ATB; <3: sintomático'] } },
  { id: 'ivas-atb', type: 'custom', position: { x: 250, y: 460 }, data: { label: 'Antibiótico', nodeType: 'treatment', medications: ['Amoxicilina', 'Penicilina Benzatina'], details: ['Amoxicilina 500mg 8/8h 10 dias', 'Pen Benzatina 1.2MI IM dose única'] } },
  { id: 'ivas-viral', type: 'custom', position: { x: 450, y: 460 }, data: { label: 'Tratamento Sintomático', nodeType: 'treatment', medications: ['Paracetamol', 'Dipirona'], details: ['Analgésicos/antitérmicos', 'Hidratação', 'Umidificação ambiente', 'Repouso relativo'] } },
  { id: 'ivas-end', type: 'custom', position: { x: 400, y: 580 }, data: { label: 'Orientações', description: 'Retornar se piora', nodeType: 'end' } },
];

const ivasEdges: ProtocolEdge[] = [
  { id: 'e-ivas-1', source: 'ivas-start', target: 'ivas-sintomas' },
  { id: 'e-ivas-2', source: 'ivas-sintomas', target: 'ivas-faringite' },
  { id: 'e-ivas-3', source: 'ivas-faringite', target: 'ivas-strep', sourceHandle: 'yes', label: 'Sim' },
  { id: 'e-ivas-4', source: 'ivas-faringite', target: 'ivas-viral', sourceHandle: 'no', label: 'Não' },
  { id: 'e-ivas-5', source: 'ivas-strep', target: 'ivas-atb', label: '≥3 pontos' },
  { id: 'e-ivas-6', source: 'ivas-strep', target: 'ivas-viral', label: '<3 pontos' },
  { id: 'e-ivas-7', source: 'ivas-atb', target: 'ivas-end' },
  { id: 'e-ivas-8', source: 'ivas-viral', target: 'ivas-end' },
];

export const protocoloIVAS: Protocolo = {
  id: 'ivas', titulo: 'IVAS', subtitulo: 'Infecção de Vias Aéreas Superiores',
  categoria: 'respiratorio', complexidade: 'basico', versao: '2024.1', ultimaAtualizacao: '2024-12',
  fonte: 'Diretrizes AMFC', ciap2: ['R74', 'R76', 'R21'], cid10: ['J06', 'J02', 'J03'],
  descricao: 'Abordagem de resfriado comum, faringite e sinusite.',
  objetivos: ['Diferenciar viral de bacteriano', 'Evitar antibiótico desnecessário', 'Tratar sintomas'],
  populacaoAlvo: 'Pacientes com sintomas respiratórios altos',
  nodes: ivasNodes, edges: ivasEdges,
  sinaisAlerta: ['Dispneia', 'Toxemia', 'Estridor'],
  referencias: ['IDSA Pharyngitis Guidelines', 'Choosing Wisely'],
  doencasRelacionadas: [], medicamentosRelacionados: ['amoxicilina', 'paracetamol', 'dipirona'],
  calculadorasRelacionadas: [], tags: ['ivas', 'resfriado', 'faringite', 'antibiotico'],
};

// =============================================================================
// PROTOCOLO: DISLIPIDEMIA
// =============================================================================

const dislipidemiaNodes: ProtocolNode[] = [
  { id: 'disl-start', type: 'custom', position: { x: 400, y: 0 }, data: { label: 'Início', description: 'Avaliar perfil lipídico', nodeType: 'start', ciap2: 'T93', cid10: 'E78' } },
  { id: 'disl-exames', type: 'custom', position: { x: 400, y: 100 }, data: { label: 'Perfil Lipídico', nodeType: 'action', exams: ['CT', 'LDL', 'HDL', 'TG'], details: ['Jejum 12h opcional', 'LDL-c calculado ou direto', 'Considerar Lp(a) se histórico familiar'] } },
  { id: 'disl-risco', type: 'custom', position: { x: 400, y: 220 }, data: { label: 'Estratificar Risco CV', nodeType: 'assessment', calculadoras: ['risco-cv'], details: ['DAC/AVC prévio: Muito alto', 'DM + LOA: Muito alto', 'DRC: Alto', 'Calcular escore'] } },
  { id: 'disl-meta', type: 'custom', position: { x: 400, y: 340 }, data: { label: 'Meta LDL?', nodeType: 'decision', details: ['Muito alto: <50', 'Alto: <70', 'Intermediário: <100', 'Baixo: <130'] } },
  { id: 'disl-mev', type: 'custom', position: { x: 250, y: 460 }, data: { label: 'MEV', description: 'Se baixo/intermediário', nodeType: 'action', details: ['Dieta mediterrânea', 'Atividade física', 'Cessar tabagismo', 'Perda peso'] } },
  { id: 'disl-estatina', type: 'custom', position: { x: 450, y: 460 }, data: { label: 'Estatina', description: 'Se alto/muito alto', nodeType: 'treatment', medications: ['Atorvastatina', 'Rosuvastatina', 'Sinvastatina'], details: ['Alta intensidade: Atorva 40-80 ou Rosuva 20-40', 'Moderada: Atorva 10-20', 'Iniciar e titular'] } },
  { id: 'disl-end', type: 'custom', position: { x: 400, y: 580 }, data: { label: 'Seguimento', description: 'Reavaliar em 6-12 semanas', nodeType: 'end' } },
];

const dislipidemiaEdges: ProtocolEdge[] = [
  { id: 'e-disl-1', source: 'disl-start', target: 'disl-exames' },
  { id: 'e-disl-2', source: 'disl-exames', target: 'disl-risco' },
  { id: 'e-disl-3', source: 'disl-risco', target: 'disl-meta' },
  { id: 'e-disl-4', source: 'disl-meta', target: 'disl-mev', label: 'Baixo/Int' },
  { id: 'e-disl-5', source: 'disl-meta', target: 'disl-estatina', label: 'Alto/Muito alto' },
  { id: 'e-disl-6', source: 'disl-mev', target: 'disl-end' },
  { id: 'e-disl-7', source: 'disl-estatina', target: 'disl-end' },
];

export const protocoloDislipidemia: Protocolo = {
  id: 'dislipidemia', titulo: 'Dislipidemia', subtitulo: 'Manejo do Colesterol',
  categoria: 'cardiovascular', complexidade: 'intermediario', versao: '2024.1', ultimaAtualizacao: '2024-12',
  fonte: 'Diretriz Brasileira de Dislipidemia 2023', ciap2: ['T93'], cid10: ['E78', 'E78.0', 'E78.5'],
  descricao: 'Estratificação de risco e tratamento da dislipidemia.',
  objetivos: ['Estratificar risco CV', 'Definir meta LDL', 'Tratar adequadamente'],
  populacaoAlvo: 'Adultos com dislipidemia ou risco CV aumentado',
  nodes: dislipidemiaNodes, edges: dislipidemiaEdges,
  sinaisAlerta: ['Hipercolesterolemia familiar', 'LDL >190', 'Xantomas'],
  referencias: ['Diretriz Brasileira de Dislipidemia 2023', 'ACC/AHA 2018'],
  doencasRelacionadas: ['dislipidemia', 'doenca-arterial-coronariana'], medicamentosRelacionados: ['atorvastatina', 'sinvastatina', 'rosuvastatina'],
  calculadorasRelacionadas: ['risco-cv'], tags: ['dislipidemia', 'colesterol', 'estatina', 'cardiovascular'],
};

// =============================================================================
// PROTOCOLO: PRÉ-NATAL
// =============================================================================

const preNatalNodes: ProtocolNode[] = [
  { id: 'pn-start', type: 'custom', position: { x: 400, y: 0 }, data: { label: 'Início', description: 'Primeira consulta pré-natal', nodeType: 'start', ciap2: 'W78', cid10: 'Z34' } },
  { id: 'pn-anamnese', type: 'custom', position: { x: 400, y: 100 }, data: { label: 'Anamnese Completa', nodeType: 'assessment', details: ['DUM e idade gestacional', 'Antecedentes obstétricos (GPA)', 'Comorbidades', 'Medicações em uso', 'Fatores de risco'] } },
  { id: 'pn-exame', type: 'custom', position: { x: 400, y: 220 }, data: { label: 'Exame Físico', nodeType: 'action', details: ['PA, peso, altura, IMC', 'Mamas', 'Altura uterina', 'BCF (>12 sem)', 'Edema'] } },
  { id: 'pn-exames', type: 'custom', position: { x: 400, y: 340 }, data: { label: 'Exames 1º Trimestre', nodeType: 'action', exams: ['Hemograma', 'Tipagem ABO/Rh', 'Glicemia jejum', 'VDRL', 'HIV', 'HBsAg', 'Toxo IgG/IgM', 'EAS/Urocultura', 'USG obstétrico'] } },
  { id: 'pn-risco', type: 'custom', position: { x: 400, y: 460 }, data: { label: 'Alto Risco?', nodeType: 'decision', details: ['DM gestacional', 'HAS gestacional/PE', 'Gemelar', 'Idade <15 ou >35', 'Comorbidades graves'] } },
  { id: 'pn-encaminhar', type: 'custom', position: { x: 150, y: 560 }, data: { label: 'Encaminhar Pré-Natal Alto Risco', nodeType: 'referral', referTo: 'Obstetrícia', alertLevel: 'high' } },
  { id: 'pn-habitual', type: 'custom', position: { x: 400, y: 560 }, data: { label: 'Pré-Natal Habitual', description: 'Acompanhamento na APS', nodeType: 'action', details: ['Mínimo 6 consultas', 'Mensal até 28 sem', 'Quinzenal 28-36 sem', 'Semanal >36 sem'] } },
  { id: 'pn-suplemento', type: 'custom', position: { x: 400, y: 680 }, data: { label: 'Suplementação', nodeType: 'treatment', medications: ['Ácido Fólico', 'Sulfato Ferroso'], details: ['Ác. Fólico 400mcg até 12 sem', 'Ferro 40mg/dia a partir 20 sem'] } },
  { id: 'pn-vacinas', type: 'custom', position: { x: 400, y: 800 }, data: { label: 'Vacinação', nodeType: 'action', details: ['dTpa: 20 sem (cada gestação)', 'Influenza: período sazonal', 'Hepatite B: se esquema incompleto', 'COVID-19'] } },
  { id: 'pn-end', type: 'custom', position: { x: 400, y: 920 }, data: { label: 'Seguimento', description: 'Até parto e puerpério', nodeType: 'end' } },
];

const preNatalEdges: ProtocolEdge[] = [
  { id: 'e-pn-1', source: 'pn-start', target: 'pn-anamnese' },
  { id: 'e-pn-2', source: 'pn-anamnese', target: 'pn-exame' },
  { id: 'e-pn-3', source: 'pn-exame', target: 'pn-exames' },
  { id: 'e-pn-4', source: 'pn-exames', target: 'pn-risco' },
  { id: 'e-pn-5', source: 'pn-risco', target: 'pn-encaminhar', sourceHandle: 'yes', label: 'Sim' },
  { id: 'e-pn-6', source: 'pn-risco', target: 'pn-habitual', sourceHandle: 'no', label: 'Não' },
  { id: 'e-pn-7', source: 'pn-habitual', target: 'pn-suplemento' },
  { id: 'e-pn-8', source: 'pn-suplemento', target: 'pn-vacinas' },
  { id: 'e-pn-9', source: 'pn-vacinas', target: 'pn-end' },
];

export const protocoloPreNatal: Protocolo = {
  id: 'pre-natal', titulo: 'Pré-Natal', subtitulo: 'Acompanhamento na APS',
  categoria: 'materno_infantil', complexidade: 'intermediario', versao: '2024.1', ultimaAtualizacao: '2024-12',
  fonte: 'Caderno de Atenção Básica Pré-Natal', ciap2: ['W78', 'W79', 'W84'], cid10: ['Z34', 'Z35'],
  descricao: 'Protocolo de acompanhamento pré-natal de risco habitual na APS.',
  objetivos: ['Captação precoce', 'Estratificar risco', 'Suplementação adequada', 'Vacinação em dia'],
  populacaoAlvo: 'Gestantes',
  nodes: preNatalNodes, edges: preNatalEdges,
  sinaisAlerta: ['Sangramento vaginal', 'Hipertensão', 'Sinais de trabalho de parto prematuro'],
  referencias: ['Caderno AB Pré-Natal 2013', 'Manual MS 2022'],
  doencasRelacionadas: ['pre-eclampsia', 'diabetes-gestacional'], medicamentosRelacionados: ['acido-folico', 'sulfato-ferroso'],
  calculadorasRelacionadas: [], tags: ['gestacao', 'pre-natal', 'materno-infantil'],
};

// =============================================================================
// PROTOCOLO: PUERICULTURA
// =============================================================================

const puericulturaNodes: ProtocolNode[] = [
  { id: 'puer-start', type: 'custom', position: { x: 400, y: 0 }, data: { label: 'Início', description: 'Consulta de puericultura', nodeType: 'start', ciap2: 'A98', cid10: 'Z00.1' } },
  { id: 'puer-idade', type: 'custom', position: { x: 400, y: 100 }, data: { label: 'Verificar Idade', description: 'Cronograma de consultas', nodeType: 'assessment', details: ['1ª semana', '1, 2, 4, 6, 9, 12 meses', '18, 24 meses', 'Anual 2-10 anos'] } },
  { id: 'puer-peso', type: 'custom', position: { x: 400, y: 220 }, data: { label: 'Antropometria', nodeType: 'action', details: ['Peso', 'Estatura/Comprimento', 'Perímetro cefálico (<2 anos)', 'IMC', 'Plotar na curva OMS'] } },
  { id: 'puer-dnpm', type: 'custom', position: { x: 400, y: 340 }, data: { label: 'Avaliação DNPM', description: 'Desenvolvimento neuropsicomotor', nodeType: 'assessment', details: ['Marcos do desenvolvimento', 'Linguagem', 'Motor grosseiro e fino', 'Cognição', 'Socioemocional'] } },
  { id: 'puer-atraso', type: 'custom', position: { x: 400, y: 460 }, data: { label: 'Atraso DNPM?', nodeType: 'decision' } },
  { id: 'puer-estimular', type: 'custom', position: { x: 650, y: 560 }, data: { label: 'Estimulação Precoce', nodeType: 'referral', referTo: 'NASF / APAE', alertLevel: 'medium' } },
  { id: 'puer-vacinas', type: 'custom', position: { x: 400, y: 560 }, data: { label: 'Verificar Calendário Vacinal', nodeType: 'action', details: ['BCG, Hepatite B ao nascer', 'Pentavalente, VIP, Pneumo, Rotavírus', 'Tríplice viral, Varicela, Hepatite A', 'Completar esquema'] } },
  { id: 'puer-aleitamento', type: 'custom', position: { x: 400, y: 680 }, data: { label: 'Orientações', nodeType: 'action', details: ['Aleitamento exclusivo até 6 meses', 'Alimentação complementar', 'Suplementação Fe e Vit D', 'Prevenção de acidentes', 'Higiene bucal'] } },
  { id: 'puer-end', type: 'custom', position: { x: 400, y: 800 }, data: { label: 'Próxima Consulta', nodeType: 'end' } },
];

const puericulturaEdges: ProtocolEdge[] = [
  { id: 'e-puer-1', source: 'puer-start', target: 'puer-idade' },
  { id: 'e-puer-2', source: 'puer-idade', target: 'puer-peso' },
  { id: 'e-puer-3', source: 'puer-peso', target: 'puer-dnpm' },
  { id: 'e-puer-4', source: 'puer-dnpm', target: 'puer-atraso' },
  { id: 'e-puer-5', source: 'puer-atraso', target: 'puer-estimular', sourceHandle: 'yes', label: 'Sim' },
  { id: 'e-puer-6', source: 'puer-atraso', target: 'puer-vacinas', sourceHandle: 'no', label: 'Não' },
  { id: 'e-puer-7', source: 'puer-estimular', target: 'puer-vacinas' },
  { id: 'e-puer-8', source: 'puer-vacinas', target: 'puer-aleitamento' },
  { id: 'e-puer-9', source: 'puer-aleitamento', target: 'puer-end' },
];

export const protocoloPuericultura: Protocolo = {
  id: 'puericultura', titulo: 'Puericultura', subtitulo: 'Acompanhamento da Criança Saudável',
  categoria: 'materno_infantil', complexidade: 'basico', versao: '2024.1', ultimaAtualizacao: '2024-12',
  fonte: 'Caderno de Atenção Básica - Saúde da Criança', ciap2: ['A98'], cid10: ['Z00.1', 'Z00.12'],
  descricao: 'Protocolo de acompanhamento de crescimento e desenvolvimento infantil.',
  objetivos: ['Monitorar crescimento', 'Avaliar DNPM', 'Vacinação em dia', 'Orientar família'],
  populacaoAlvo: 'Crianças de 0 a 10 anos',
  nodes: puericulturaNodes, edges: puericulturaEdges,
  sinaisAlerta: ['Desnutrição/Obesidade', 'Atraso DNPM', 'Maus-tratos'],
  referencias: ['Caderno AB Saúde da Criança', 'SBP Guia de Puericultura'],
  doencasRelacionadas: [], medicamentosRelacionados: ['sulfato-ferroso', 'vitamina-d'],
  calculadorasRelacionadas: [], tags: ['puericultura', 'infantil', 'crescimento', 'desenvolvimento'],
};

// =============================================================================
// PROTOCOLO: DPOC
// =============================================================================

const dpocNodes: ProtocolNode[] = [
  { id: 'dpoc-start', type: 'custom', position: { x: 400, y: 0 }, data: { label: 'Início', description: 'Suspeita de DPOC', nodeType: 'start', ciap2: 'R95', cid10: 'J44' } },
  { id: 'dpoc-fatores', type: 'custom', position: { x: 400, y: 100 }, data: { label: 'Fatores de Risco', nodeType: 'assessment', details: ['Tabagismo >10 anos-maço', 'Exposição ocupacional', 'Idade >40 anos', 'Dispneia, tosse crônica, expectoração'] } },
  { id: 'dpoc-espiro', type: 'custom', position: { x: 400, y: 220 }, data: { label: 'Espirometria', nodeType: 'action', exams: ['Espirometria pós-BD'], details: ['VEF1/CVF <0,7 pós-BD confirma DPOC', 'Classificar gravidade pelo VEF1'] } },
  { id: 'dpoc-confirmado', type: 'custom', position: { x: 400, y: 340 }, data: { label: 'DPOC Confirmado?', nodeType: 'decision' } },
  { id: 'dpoc-nao', type: 'custom', position: { x: 150, y: 440 }, data: { label: 'Investigar Outras Causas', nodeType: 'info', details: ['Asma', 'Bronquiectasias', 'ICC', 'Fibrose pulmonar'] } },
  { id: 'dpoc-classificar', type: 'custom', position: { x: 400, y: 440 }, data: { label: 'Classificar GOLD', nodeType: 'assessment', details: ['A: Poucos sintomas, baixo risco exacerbação', 'B: Mais sintomas, baixo risco', 'E: Alto risco de exacerbação'] } },
  { id: 'dpoc-gold-a', type: 'custom', position: { x: 200, y: 560 }, data: { label: 'GOLD A', nodeType: 'treatment', medications: ['Salbutamol SOS'], details: ['Broncodilatador de curta ação SOS'] } },
  { id: 'dpoc-gold-b', type: 'custom', position: { x: 400, y: 560 }, data: { label: 'GOLD B', nodeType: 'treatment', medications: ['Tiotrópio', 'Formoterol'], details: ['LAMA ou LABA de manutenção', 'Considerar LAMA+LABA se sintomas'] } },
  { id: 'dpoc-gold-e', type: 'custom', position: { x: 600, y: 560 }, data: { label: 'GOLD E', nodeType: 'treatment', medications: ['LAMA', 'LABA', 'CI'], alertLevel: 'high', details: ['LAMA+LABA', 'Adicionar CI se eosinofilia >300', 'Reabilitação pulmonar'] } },
  { id: 'dpoc-geral', type: 'custom', position: { x: 400, y: 680 }, data: { label: 'Medidas Gerais', nodeType: 'action', details: ['CESSAÇÃO TABÁGICA (prioridade)', 'Vacinação (Influenza, Pneumo)', 'Oxigenoterapia se PaO2<55', 'Atividade física'] } },
  { id: 'dpoc-end', type: 'custom', position: { x: 400, y: 800 }, data: { label: 'Seguimento', description: 'Reavaliar exacerbações e função pulmonar', nodeType: 'end' } },
];

const dpocEdges: ProtocolEdge[] = [
  { id: 'e-dpoc-1', source: 'dpoc-start', target: 'dpoc-fatores' },
  { id: 'e-dpoc-2', source: 'dpoc-fatores', target: 'dpoc-espiro' },
  { id: 'e-dpoc-3', source: 'dpoc-espiro', target: 'dpoc-confirmado' },
  { id: 'e-dpoc-4', source: 'dpoc-confirmado', target: 'dpoc-nao', sourceHandle: 'no', label: 'Não' },
  { id: 'e-dpoc-5', source: 'dpoc-confirmado', target: 'dpoc-classificar', sourceHandle: 'yes', label: 'Sim' },
  { id: 'e-dpoc-6', source: 'dpoc-classificar', target: 'dpoc-gold-a', label: 'A' },
  { id: 'e-dpoc-7', source: 'dpoc-classificar', target: 'dpoc-gold-b', label: 'B' },
  { id: 'e-dpoc-8', source: 'dpoc-classificar', target: 'dpoc-gold-e', label: 'E' },
  { id: 'e-dpoc-9', source: 'dpoc-gold-a', target: 'dpoc-geral' },
  { id: 'e-dpoc-10', source: 'dpoc-gold-b', target: 'dpoc-geral' },
  { id: 'e-dpoc-11', source: 'dpoc-gold-e', target: 'dpoc-geral' },
  { id: 'e-dpoc-12', source: 'dpoc-geral', target: 'dpoc-end' },
];

export const protocoloDPOC: Protocolo = {
  id: 'dpoc', titulo: 'DPOC', subtitulo: 'Doença Pulmonar Obstrutiva Crônica',
  categoria: 'respiratorio', complexidade: 'intermediario', versao: '2024.1', ultimaAtualizacao: '2024-12',
  fonte: 'GOLD 2024', ciap2: ['R95'], cid10: ['J44', 'J44.0', 'J44.1'],
  descricao: 'Diagnóstico e manejo da DPOC baseado em GOLD 2024.',
  objetivos: ['Confirmar diagnóstico com espirometria', 'Classificar gravidade', 'Tratar adequadamente', 'Prevenir exacerbações'],
  populacaoAlvo: 'Adultos >40 anos com fatores de risco ou sintomas respiratórios',
  nodes: dpocNodes, edges: dpocEdges,
  sinaisAlerta: ['Exacerbação grave', 'Hipoxemia', 'Cor pulmonale'],
  referencias: ['GOLD 2024', 'Caderno AB DPOC'],
  doencasRelacionadas: ['dpoc'], medicamentosRelacionados: ['salbutamol', 'beclometasona'],
  calculadorasRelacionadas: [], tags: ['dpoc', 'respiratorio', 'tabagismo', 'espirometria'],
};

// =============================================================================
// PROTOCOLO: DIABETES MELLITUS GESTACIONAL (DMG)
// =============================================================================

const dmgNodes: ProtocolNode[] = [
  { id: 'dmg-start', type: 'custom', position: { x: 400, y: 0 }, data: { label: 'Início', description: 'Gestante em acompanhamento', nodeType: 'start', ciap2: 'W84', cid10: 'O24.4' } },
  { id: 'dmg-gj', type: 'custom', position: { x: 400, y: 100 }, data: { label: 'Glicemia de Jejum', description: '1ª consulta pré-natal', nodeType: 'assessment', exams: ['Glicemia jejum'], details: ['Colher na 1ª consulta', 'Idealmente até 20 semanas'] } },
  { id: 'dmg-gj-result', type: 'custom', position: { x: 400, y: 220 }, data: { label: 'Resultado GJ?', nodeType: 'decision' } },
  { id: 'dmg-gj-normal', type: 'custom', position: { x: 150, y: 320 }, data: { label: 'GJ < 92 mg/dL', description: 'Normal - aguardar TOTG', nodeType: 'info' } },
  { id: 'dmg-totg', type: 'custom', position: { x: 150, y: 440 }, data: { label: 'TOTG 75g', description: '24-28 semanas', nodeType: 'assessment', exams: ['TOTG 75g'], details: ['Jejum ≥92 = DMG', '1h ≥180 = DMG', '2h ≥153 = DMG', 'Um valor alterado = diagnóstico'] } },
  { id: 'dmg-gj-dmg', type: 'custom', position: { x: 400, y: 320 }, data: { label: 'GJ 92-125 mg/dL', description: 'Diagnóstico de DMG', nodeType: 'alert', alertLevel: 'medium' } },
  { id: 'dmg-gj-dm', type: 'custom', position: { x: 650, y: 320 }, data: { label: 'GJ ≥126 mg/dL', description: 'DM prévio ou overt', nodeType: 'alert', alertLevel: 'high' } },
  { id: 'dmg-dieta', type: 'custom', position: { x: 400, y: 440 }, data: { label: 'Terapia Nutricional', description: '7-14 dias', nodeType: 'treatment', details: ['1800-2200 kcal/dia', '40-45% carboidratos', '3 refeições + 3 lanches', 'Evitar açúcar simples', 'Atividade física 30min/dia'] } },
  { id: 'dmg-monitor', type: 'custom', position: { x: 400, y: 560 }, data: { label: 'Monitorar Glicemia', description: 'Perfil glicêmico 7 dias', nodeType: 'assessment', details: ['Jejum: <95 mg/dL', '1h pós: <140 mg/dL', '2h pós: <120 mg/dL', 'Medir 4-7x/dia'] } },
  { id: 'dmg-metas', type: 'custom', position: { x: 400, y: 680 }, data: { label: 'Metas Atingidas?', nodeType: 'decision' } },
  { id: 'dmg-manter', type: 'custom', position: { x: 150, y: 780 }, data: { label: 'Manter Dieta', description: 'Continuar acompanhamento', nodeType: 'action', details: ['Consultas quinzenais', 'USG mensal', 'CTG semanal após 32 sem'] } },
  { id: 'dmg-insulina', type: 'custom', position: { x: 400, y: 780 }, data: { label: 'Iniciar Insulina', description: 'Dose inicial 0,5 UI/kg/dia', nodeType: 'treatment', medications: ['Insulina NPH', 'Insulina Regular'], details: ['NPH: 2/3 manhã + 1/3 noite', 'Regular: antes refeições se pós elevada', 'Ajustar a cada 1-2 semanas'] } },
  { id: 'dmg-usg', type: 'custom', position: { x: 400, y: 900 }, data: { label: 'USG 28-32 sem', description: 'Avaliar CA fetal', nodeType: 'assessment', details: ['CA ≥P75 = macrossomia', 'Iniciar insulina se CA elevada'] } },
  { id: 'dmg-parto', type: 'custom', position: { x: 400, y: 1020 }, data: { label: 'Timing do Parto', nodeType: 'action', details: ['Bom controle: 39-40 sem', 'Controle ruim/macrossomia: 37-39 sem', 'Complicações: individualizar'] } },
  { id: 'dmg-end', type: 'custom', position: { x: 400, y: 1140 }, data: { label: 'Pós-parto', description: 'Suspender insulina, TOTG 6-12 sem', nodeType: 'end' } },
];

const dmgEdges: ProtocolEdge[] = [
  { id: 'e-dmg-1', source: 'dmg-start', target: 'dmg-gj' },
  { id: 'e-dmg-2', source: 'dmg-gj', target: 'dmg-gj-result' },
  { id: 'e-dmg-3', source: 'dmg-gj-result', target: 'dmg-gj-normal', data: { label: '<92' } },
  { id: 'e-dmg-4', source: 'dmg-gj-result', target: 'dmg-gj-dmg', data: { label: '92-125' } },
  { id: 'e-dmg-5', source: 'dmg-gj-result', target: 'dmg-gj-dm', data: { label: '≥126' } },
  { id: 'e-dmg-6', source: 'dmg-gj-normal', target: 'dmg-totg' },
  { id: 'e-dmg-7', source: 'dmg-totg', target: 'dmg-dieta', data: { label: 'DMG' } },
  { id: 'e-dmg-8', source: 'dmg-gj-dmg', target: 'dmg-dieta' },
  { id: 'e-dmg-9', source: 'dmg-gj-dm', target: 'dmg-insulina' },
  { id: 'e-dmg-10', source: 'dmg-dieta', target: 'dmg-monitor' },
  { id: 'e-dmg-11', source: 'dmg-monitor', target: 'dmg-metas' },
  { id: 'e-dmg-12', source: 'dmg-metas', target: 'dmg-manter', data: { label: 'Sim' } },
  { id: 'e-dmg-13', source: 'dmg-metas', target: 'dmg-insulina', data: { label: 'Não' } },
  { id: 'e-dmg-14', source: 'dmg-manter', target: 'dmg-usg' },
  { id: 'e-dmg-15', source: 'dmg-insulina', target: 'dmg-usg' },
  { id: 'e-dmg-16', source: 'dmg-usg', target: 'dmg-parto' },
  { id: 'e-dmg-17', source: 'dmg-parto', target: 'dmg-end' },
];

export const protocoloDMG: Protocolo = {
  id: 'dmg',
  titulo: 'Diabetes Mellitus Gestacional',
  subtitulo: 'Diagnóstico e Manejo',
  categoria: 'materno_infantil',
  complexidade: 'intermediario',
  versao: '2025.1',
  ultimaAtualizacao: '2025-01',
  fonte: 'SBD 2024-2025 / ADA 2025',
  ciap2: ['W84', 'W85'],
  cid10: ['O24.4', 'O24.9'],
  descricao: 'Protocolo para diagnóstico e manejo do diabetes mellitus gestacional na APS.',
  objetivos: ['Rastrear DMG universalmente', 'Iniciar tratamento nutricional', 'Indicar insulina quando necessário', 'Prevenir complicações materno-fetais'],
  populacaoAlvo: 'Gestantes',
  nodes: dmgNodes,
  edges: dmgEdges,
  sinaisAlerta: ['Glicemia persistentemente elevada', 'Macrossomia fetal', 'Polidrâmnio', 'Pré-eclâmpsia associada'],
  encaminhamento: { quando: ['DM prévio/overt', 'Controle inadequado após 2 semanas de insulina', 'Complicações'], paraCQuem: 'Pré-natal de Alto Risco' },
  referencias: ['SBD Diretrizes 2024-2025', 'ADA Standards of Care 2025', 'HAPO Study 2008'],
  doencasRelacionadas: ['diabetes-gestacional', 'pre-eclampsia'],
  medicamentosRelacionados: ['insulina-nph', 'insulina-regular', 'metformina'],
  calculadorasRelacionadas: [],
  tags: ['gestacao', 'diabetes', 'alto-risco', 'insulina'],
};

// =============================================================================
// PROTOCOLO: EMERGÊNCIA HIPERTENSIVA NA GESTAÇÃO (PRÉ-ECLÂMPSIA)
// =============================================================================

const preEclampsiaNodes: ProtocolNode[] = [
  { id: 'pe-start', type: 'custom', position: { x: 400, y: 0 }, data: { label: 'Início', description: 'Gestante com PA elevada', nodeType: 'start', ciap2: 'W81', cid10: 'O14' } },
  { id: 'pe-medir', type: 'custom', position: { x: 400, y: 100 }, data: { label: 'Medir PA', description: 'Técnica correta', nodeType: 'assessment', details: ['Repouso 5 minutos', 'Braço na altura do coração', 'Duas medidas'] } },
  { id: 'pe-pa-nivel', type: 'custom', position: { x: 400, y: 220 }, data: { label: 'Nível da PA?', nodeType: 'decision' } },
  { id: 'pe-grave', type: 'custom', position: { x: 650, y: 320 }, data: { label: 'PA ≥160/110', description: 'EMERGÊNCIA', nodeType: 'alert', alertLevel: 'critical' } },
  { id: 'pe-mgso4', type: 'custom', position: { x: 650, y: 440 }, data: { label: 'Sulfato de Magnésio', description: 'Profilaxia de eclâmpsia', nodeType: 'treatment', medications: ['Sulfato de Magnésio'], details: ['Ataque: 4g IV em 20min', 'Manutenção: 1-2g/h IV', 'OU Pritchard: 4g IV + 10g IM', 'Monitorar reflexo patelar, FR, diurese'] } },
  { id: 'pe-antihta', type: 'custom', position: { x: 650, y: 580 }, data: { label: 'Anti-hipertensivo', description: 'Reduzir PA em 15-25%', nodeType: 'treatment', medications: ['Hidralazina', 'Nifedipina', 'Labetalol'], details: ['Hidralazina 5mg IV a cada 20min', 'OU Nifedipina 10mg VO', 'Meta: <160/110 mmHg', 'Não reduzir >25%'] } },
  { id: 'pe-leve', type: 'custom', position: { x: 150, y: 320 }, data: { label: 'PA 140-159/90-109', description: 'PE sem sinais de gravidade', nodeType: 'alert', alertLevel: 'medium' } },
  { id: 'pe-exames', type: 'custom', position: { x: 400, y: 440 }, data: { label: 'Exames Laboratoriais', nodeType: 'assessment', exams: ['Hemograma + plaquetas', 'Creatinina', 'TGO/TGP', 'DHL', 'Bilirrubinas', 'Proteinúria 24h ou P/C'], details: ['Plaquetas <100.000 = gravidade', 'TGO/TGP >70 = gravidade', 'Creatinina >1.1 = gravidade'] } },
  { id: 'pe-hellp', type: 'custom', position: { x: 400, y: 580 }, data: { label: 'Sinais de HELLP?', nodeType: 'decision', details: ['Hemólise (DHL >600)', 'Elevated Liver (TGO/TGP >70)', 'Low Platelets (<100.000)'] } },
  { id: 'pe-internar', type: 'custom', position: { x: 400, y: 700 }, data: { label: 'Internar', description: 'Monitorização intensiva', nodeType: 'action', details: ['PA 6/6h', 'Proteinúria diária', 'Labs 12-24h', 'CTG diária', 'Avaliação fetal'] } },
  { id: 'pe-cortico', type: 'custom', position: { x: 400, y: 820 }, data: { label: 'Corticoide', description: 'Se IG <34 semanas', nodeType: 'treatment', medications: ['Betametasona', 'Dexametasona'], details: ['Betametasona 12mg IM 2 doses 24/24h', 'OU Dexametasona 6mg IM 4 doses 12/12h', 'Maturação pulmonar fetal'] } },
  { id: 'pe-parto', type: 'custom', position: { x: 400, y: 940 }, data: { label: 'Definir Parto', nodeType: 'action', details: ['<34 sem: considerar expectante se estável', '34-37 sem: parto em 24-48h', '≥37 sem: parto imediato', 'HELLP/eclâmpsia: parto em 24h'] } },
  { id: 'pe-end', type: 'custom', position: { x: 400, y: 1060 }, data: { label: 'Pós-parto', description: 'MgSO4 por 24h, monitorar PA', nodeType: 'end' } },
];

const preEclampsiaEdges: ProtocolEdge[] = [
  { id: 'e-pe-1', source: 'pe-start', target: 'pe-medir' },
  { id: 'e-pe-2', source: 'pe-medir', target: 'pe-pa-nivel' },
  { id: 'e-pe-3', source: 'pe-pa-nivel', target: 'pe-grave', data: { label: '≥160/110' } },
  { id: 'e-pe-4', source: 'pe-pa-nivel', target: 'pe-leve', data: { label: '140-159' } },
  { id: 'e-pe-5', source: 'pe-grave', target: 'pe-mgso4' },
  { id: 'e-pe-6', source: 'pe-mgso4', target: 'pe-antihta' },
  { id: 'e-pe-7', source: 'pe-antihta', target: 'pe-exames' },
  { id: 'e-pe-8', source: 'pe-leve', target: 'pe-exames' },
  { id: 'e-pe-9', source: 'pe-exames', target: 'pe-hellp' },
  { id: 'e-pe-10', source: 'pe-hellp', target: 'pe-internar' },
  { id: 'e-pe-11', source: 'pe-internar', target: 'pe-cortico' },
  { id: 'e-pe-12', source: 'pe-cortico', target: 'pe-parto' },
  { id: 'e-pe-13', source: 'pe-parto', target: 'pe-end' },
];

export const protocoloPreEclampsia: Protocolo = {
  id: 'pre-eclampsia',
  titulo: 'Pré-eclâmpsia e Emergência Hipertensiva',
  subtitulo: 'Manejo na Urgência',
  categoria: 'materno_infantil',
  complexidade: 'avancado',
  versao: '2025.1',
  ultimaAtualizacao: '2025-01',
  fonte: 'ACOG 2020 / RBEHG 2023 / MS 2022',
  ciap2: ['W81'],
  cid10: ['O14.0', 'O14.1', 'O14.2', 'O15.0'],
  descricao: 'Protocolo para manejo de pré-eclâmpsia e emergência hipertensiva gestacional.',
  objetivos: ['Identificar sinais de gravidade', 'Prevenir eclâmpsia com MgSO4', 'Controlar PA', 'Definir momento do parto'],
  populacaoAlvo: 'Gestantes com hipertensão',
  nodes: preEclampsiaNodes,
  edges: preEclampsiaEdges,
  sinaisAlerta: ['PA ≥160/110 mmHg', 'Cefaleia refratária', 'Escotomas', 'Epigastralgia', 'Plaquetas <100.000', 'Creatinina >1.1'],
  encaminhamento: { quando: ['Sempre - emergência obstétrica'], paraCQuem: 'Maternidade de referência' },
  referencias: ['ACOG Practice Bulletin 222 (2020)', 'RBEHG Protocolo 2023', 'MS Manual Gestação Alto Risco 2022'],
  doencasRelacionadas: ['pre-eclampsia-eclampsia', 'hipertensao-cronica-gestacao'],
  medicamentosRelacionados: ['sulfato-magnesio', 'hidralazina', 'nifedipina'],
  calculadorasRelacionadas: [],
  tags: ['gestacao', 'emergencia', 'hipertensao', 'alto-risco'],
};

// =============================================================================
// PROTOCOLO: PREVENÇÃO DA TRANSMISSÃO VERTICAL DO HIV
// =============================================================================

const hivGestacaoNodes: ProtocolNode[] = [
  { id: 'hiv-start', type: 'custom', position: { x: 400, y: 0 }, data: { label: 'Início', description: 'Gestante na 1ª consulta', nodeType: 'start', ciap2: 'B90', cid10: 'O98.7' } },
  { id: 'hiv-teste', type: 'custom', position: { x: 400, y: 100 }, data: { label: 'Teste Rápido HIV', description: 'Na 1ª consulta', nodeType: 'assessment', exams: ['Teste rápido HIV'], details: ['Oferecer a toda gestante', 'Repetir no 3º trimestre', 'Repetir no parto se não testada'] } },
  { id: 'hiv-result', type: 'custom', position: { x: 400, y: 220 }, data: { label: 'Resultado?', nodeType: 'decision' } },
  { id: 'hiv-neg', type: 'custom', position: { x: 150, y: 320 }, data: { label: 'HIV Negativo', description: 'Repetir 3º tri + parto', nodeType: 'info' } },
  { id: 'hiv-pos', type: 'custom', position: { x: 400, y: 320 }, data: { label: 'HIV Positivo', description: 'Confirmar e iniciar TARV', nodeType: 'alert', alertLevel: 'high' } },
  { id: 'hiv-confirmar', type: 'custom', position: { x: 400, y: 440 }, data: { label: 'Confirmar Diagnóstico', description: '2º teste rápido diferente', nodeType: 'assessment', details: ['Coletar CV e CD4', 'Genotipagem se disponível', 'Sorologias: VDRL, HBV, HCV, Toxo'] } },
  { id: 'hiv-tarv', type: 'custom', position: { x: 400, y: 560 }, data: { label: 'Iniciar TARV', description: 'Imediatamente', nodeType: 'treatment', medications: ['Dolutegravir', 'Tenofovir', 'Lamivudina'], details: ['TDF + 3TC + DTG', 'Independente de CD4 ou CV', 'Não suspender na gestação'] } },
  { id: 'hiv-cv', type: 'custom', position: { x: 400, y: 680 }, data: { label: 'Monitorar CV', description: 'A cada 4-8 semanas', nodeType: 'assessment', details: ['Meta: CV indetectável', 'CV 34 sem define via de parto', 'CV <1000: vaginal possível', 'CV ≥1000: cesariana eletiva'] } },
  { id: 'hiv-parto', type: 'custom', position: { x: 400, y: 800 }, data: { label: 'Definir Via de Parto', nodeType: 'decision', details: ['CV <1000 após 34 sem: vaginal', 'CV ≥1000 ou desconhecida: cesariana', 'AZT IV intraparto sempre'] } },
  { id: 'hiv-vaginal', type: 'custom', position: { x: 150, y: 920 }, data: { label: 'Parto Vaginal', description: 'Se CV <1000', nodeType: 'action', details: ['AZT IV no TP', 'Evitar procedimentos invasivos', 'Clampeamento precoce do cordão'] } },
  { id: 'hiv-cesarea', type: 'custom', position: { x: 400, y: 920 }, data: { label: 'Cesariana Eletiva', description: 'Se CV ≥1000', nodeType: 'action', details: ['AZT IV 3h antes', 'Bolsa íntegra', '38 semanas'] } },
  { id: 'hiv-rn', type: 'custom', position: { x: 400, y: 1040 }, data: { label: 'Profilaxia RN', description: 'AZT + 3TC ± NVP', nodeType: 'treatment', medications: ['Zidovudina xarope', 'Lamivudina', 'Nevirapina'], details: ['Baixo risco: AZT 4 sem', 'Alto risco: AZT+3TC 4 sem + NVP', 'Contraindicar aleitamento', 'Inibir lactação'] } },
  { id: 'hiv-end', type: 'custom', position: { x: 400, y: 1160 }, data: { label: 'Seguimento RN', description: 'CV 2 sem, 6 sem, 4 meses', nodeType: 'end' } },
];

const hivGestacaoEdges: ProtocolEdge[] = [
  { id: 'e-hiv-1', source: 'hiv-start', target: 'hiv-teste' },
  { id: 'e-hiv-2', source: 'hiv-teste', target: 'hiv-result' },
  { id: 'e-hiv-3', source: 'hiv-result', target: 'hiv-neg', data: { label: 'Negativo' } },
  { id: 'e-hiv-4', source: 'hiv-result', target: 'hiv-pos', data: { label: 'Positivo' } },
  { id: 'e-hiv-5', source: 'hiv-pos', target: 'hiv-confirmar' },
  { id: 'e-hiv-6', source: 'hiv-confirmar', target: 'hiv-tarv' },
  { id: 'e-hiv-7', source: 'hiv-tarv', target: 'hiv-cv' },
  { id: 'e-hiv-8', source: 'hiv-cv', target: 'hiv-parto' },
  { id: 'e-hiv-9', source: 'hiv-parto', target: 'hiv-vaginal', data: { label: 'CV <1000' } },
  { id: 'e-hiv-10', source: 'hiv-parto', target: 'hiv-cesarea', data: { label: 'CV ≥1000' } },
  { id: 'e-hiv-11', source: 'hiv-vaginal', target: 'hiv-rn' },
  { id: 'e-hiv-12', source: 'hiv-cesarea', target: 'hiv-rn' },
  { id: 'e-hiv-13', source: 'hiv-rn', target: 'hiv-end' },
];

export const protocoloHIVGestacao: Protocolo = {
  id: 'hiv-gestacao',
  titulo: 'HIV na Gestação',
  subtitulo: 'Prevenção da Transmissão Vertical',
  categoria: 'materno_infantil',
  complexidade: 'avancado',
  versao: '2025.1',
  ultimaAtualizacao: '2025-01',
  fonte: 'PCDT MS 2022 / OMS 2024',
  ciap2: ['B90', 'W78'],
  cid10: ['O98.7', 'B20', 'Z21'],
  descricao: 'Protocolo para prevenção da transmissão vertical do HIV.',
  objetivos: ['Diagnóstico precoce na gestação', 'TARV universal', 'Definir via de parto segura', 'Profilaxia do RN'],
  populacaoAlvo: 'Gestantes vivendo com HIV',
  nodes: hivGestacaoNodes,
  edges: hivGestacaoEdges,
  sinaisAlerta: ['CV elevada próximo ao parto', 'Má adesão à TARV', 'Coinfecção HBV/HCV', 'Resistência documentada'],
  encaminhamento: { quando: ['Sempre - acompanhamento compartilhado'], paraCQuem: 'SAE / Pré-natal de Alto Risco' },
  referencias: ['PCDT Transmissão Vertical MS 2022', 'OMS Guidelines 2024'],
  doencasRelacionadas: ['hiv-gestacao'],
  medicamentosRelacionados: ['dolutegravir', 'tenofovir', 'lamivudina', 'zidovudina'],
  calculadorasRelacionadas: [],
  tags: ['gestacao', 'hiv', 'transmissao-vertical', 'alto-risco'],
};

// =============================================================================
// PROTOCOLO: SÍFILIS NA GESTAÇÃO
// =============================================================================

const sifilisGestacaoNodes: ProtocolNode[] = [
  { id: 'sif-start', type: 'custom', position: { x: 400, y: 0 }, data: { label: 'Início', description: 'Gestante na 1ª consulta', nodeType: 'start', ciap2: 'W70', cid10: 'O98.1' } },
  { id: 'sif-teste', type: 'custom', position: { x: 400, y: 100 }, data: { label: 'Teste Rápido Sífilis', description: 'VDRL + Teste treponêmico', nodeType: 'assessment', exams: ['Teste rápido treponêmico', 'VDRL'], details: ['1ª consulta', '3º trimestre', 'Parto', 'Parceiro(s) também'] } },
  { id: 'sif-result', type: 'custom', position: { x: 400, y: 220 }, data: { label: 'Resultado?', nodeType: 'decision' } },
  { id: 'sif-neg', type: 'custom', position: { x: 150, y: 320 }, data: { label: 'Negativo', description: 'Repetir 3º tri + parto', nodeType: 'info' } },
  { id: 'sif-pos', type: 'custom', position: { x: 400, y: 320 }, data: { label: 'Positivo', description: 'Estadiar e tratar', nodeType: 'alert', alertLevel: 'high' } },
  { id: 'sif-estadio', type: 'custom', position: { x: 400, y: 440 }, data: { label: 'Estadiamento', nodeType: 'assessment', details: ['Primária: cancro duro', 'Secundária: lesões cutâneas', 'Latente recente: <1 ano', 'Latente tardia: >1 ano', 'Terciária: gomas, cardio, neuro'] } },
  { id: 'sif-tipo', type: 'custom', position: { x: 400, y: 560 }, data: { label: 'Tipo de Sífilis?', nodeType: 'decision' } },
  { id: 'sif-recente', type: 'custom', position: { x: 150, y: 680 }, data: { label: 'Recente', description: 'Primária, secundária, latente <1 ano', nodeType: 'info' } },
  { id: 'sif-tardia', type: 'custom', position: { x: 400, y: 680 }, data: { label: 'Tardia', description: 'Latente >1 ano ou duração ignorada', nodeType: 'info' } },
  { id: 'sif-tto-recente', type: 'custom', position: { x: 150, y: 800 }, data: { label: 'Penicilina Benzatina', description: '2,4 milhões UI IM dose única', nodeType: 'treatment', medications: ['Penicilina G Benzatina'] } },
  { id: 'sif-tto-tardia', type: 'custom', position: { x: 400, y: 800 }, data: { label: 'Penicilina Benzatina', description: '2,4 milhões UI IM 3 doses', nodeType: 'treatment', medications: ['Penicilina G Benzatina'], details: ['1 dose por semana', 'Por 3 semanas consecutivas', 'Se perder dose: reiniciar'] } },
  { id: 'sif-parceiro', type: 'custom', position: { x: 400, y: 920 }, data: { label: 'Tratar Parceiro(s)', description: 'Mesmo esquema', nodeType: 'action', alertLevel: 'medium', details: ['Testar e tratar parceiro', 'Notificar', 'Orientar uso de preservativo'] } },
  { id: 'sif-controle', type: 'custom', position: { x: 400, y: 1040 }, data: { label: 'Controle de Cura', description: 'VDRL mensal', nodeType: 'assessment', details: ['VDRL mensal até o parto', 'Queda 2 diluições em 3 meses = cura', 'Se aumentar: retratar'] } },
  { id: 'sif-end', type: 'custom', position: { x: 400, y: 1160 }, data: { label: 'Parto + RN', description: 'Avaliar necessidade de tratamento RN', nodeType: 'end' } },
];

const sifilisGestacaoEdges: ProtocolEdge[] = [
  { id: 'e-sif-1', source: 'sif-start', target: 'sif-teste' },
  { id: 'e-sif-2', source: 'sif-teste', target: 'sif-result' },
  { id: 'e-sif-3', source: 'sif-result', target: 'sif-neg', data: { label: 'Negativo' } },
  { id: 'e-sif-4', source: 'sif-result', target: 'sif-pos', data: { label: 'Positivo' } },
  { id: 'e-sif-5', source: 'sif-pos', target: 'sif-estadio' },
  { id: 'e-sif-6', source: 'sif-estadio', target: 'sif-tipo' },
  { id: 'e-sif-7', source: 'sif-tipo', target: 'sif-recente', data: { label: 'Recente' } },
  { id: 'e-sif-8', source: 'sif-tipo', target: 'sif-tardia', data: { label: 'Tardia' } },
  { id: 'e-sif-9', source: 'sif-recente', target: 'sif-tto-recente' },
  { id: 'e-sif-10', source: 'sif-tardia', target: 'sif-tto-tardia' },
  { id: 'e-sif-11', source: 'sif-tto-recente', target: 'sif-parceiro' },
  { id: 'e-sif-12', source: 'sif-tto-tardia', target: 'sif-parceiro' },
  { id: 'e-sif-13', source: 'sif-parceiro', target: 'sif-controle' },
  { id: 'e-sif-14', source: 'sif-controle', target: 'sif-end' },
];

export const protocoloSifilisGestacao: Protocolo = {
  id: 'sifilis-gestacao',
  titulo: 'Sífilis na Gestação',
  subtitulo: 'Diagnóstico e Tratamento',
  categoria: 'materno_infantil',
  complexidade: 'intermediario',
  versao: '2025.1',
  ultimaAtualizacao: '2025-01',
  fonte: 'PCDT MS 2022',
  ciap2: ['W70'],
  cid10: ['O98.1', 'A51', 'A52', 'A53'],
  descricao: 'Protocolo para diagnóstico e tratamento de sífilis na gestação.',
  objetivos: ['Diagnóstico precoce', 'Tratamento adequado e oportuno', 'Tratar parceiro', 'Prevenir sífilis congênita'],
  populacaoAlvo: 'Gestantes',
  nodes: sifilisGestacaoNodes,
  edges: sifilisGestacaoEdges,
  sinaisAlerta: ['Tratamento incompleto', 'Reinfecção', 'VDRL em ascensão', 'Parto antes de 30 dias do tratamento'],
  encaminhamento: { quando: ['Alergia à penicilina (dessensibilização)', 'Neurossífilis'], paraCQuem: 'Referência em IST / Infectologia' },
  referencias: ['PCDT Transmissão Vertical MS 2022', 'Caderno AB IST 2020'],
  doencasRelacionadas: ['sifilis-gestacao'],
  medicamentosRelacionados: ['penicilina-benzatina'],
  calculadorasRelacionadas: [],
  tags: ['gestacao', 'sifilis', 'ist', 'alto-risco'],
};

// =============================================================================
// PROTOCOLO: ESTRATIFICAÇÃO DE RISCO GESTACIONAL
// =============================================================================

const estratificacaoRiscoNodes: ProtocolNode[] = [
  {
    id: 'erg-start',
    type: 'custom',
    position: { x: 400, y: 0 },
    data: {
      label: 'Primeira Consulta Pré-Natal',
      description: 'Estratificação de Risco Gestacional',
      nodeType: 'start',
      ciap2: 'W78',
      cid10: 'Z34.0',
    },
  },
  {
    id: 'erg-anamnese',
    type: 'custom',
    position: { x: 400, y: 100 },
    data: {
      label: 'Anamnese Completa',
      description: 'Avaliar história pessoal, obstétrica e condições prévias',
      nodeType: 'assessment',
      details: [
        'Idade (<15 ou >35 anos)',
        'IMC (<18,5 ou >30 kg/m²)',
        'História obstétrica prévia',
        'Condições clínicas pré-existentes',
        'Uso de álcool, tabaco ou drogas',
        'Situação socioeconômica',
      ],
      exams: ['βHCG', 'USG 1º trimestre'],
    },
  },
  {
    id: 'erg-fatores-pessoais',
    type: 'custom',
    position: { x: 400, y: 240 },
    data: {
      label: 'Fatores Pessoais de Risco?',
      description: 'Idade extrema, IMC, tabagismo, drogas',
      nodeType: 'decision',
      details: [
        'Idade <15 ou >35 anos',
        'IMC <18,5 ou ≥30 kg/m²',
        'Altura <1,45m',
        'Tabagismo, etilismo, drogas',
        'Dependência química',
        'Situação de rua ou vulnerabilidade',
      ],
    },
  },
  {
    id: 'erg-risco-pessoal',
    type: 'custom',
    position: { x: 650, y: 320 },
    data: {
      label: 'Risco Identificado',
      description: 'Fator pessoal de risco presente',
      nodeType: 'alert',
      alertLevel: 'medium',
    },
  },
  {
    id: 'erg-historia-obstetrica',
    type: 'custom',
    position: { x: 400, y: 380 },
    data: {
      label: 'História Obstétrica de Risco?',
      description: 'Avaliar gestações anteriores',
      nodeType: 'decision',
      details: [
        'Morte perinatal ou natimorto prévio',
        'Pré-eclâmpsia/Eclâmpsia prévia',
        'Prematuridade prévia (<34 sem)',
        'CIUR/PIG prévio',
        'Abortamentos de repetição (≥3)',
        'Isoimunização Rh',
        'Malformação fetal prévia',
        'Cesáreas anteriores (≥2)',
        'Intervalo interpartal <2 anos',
      ],
    },
  },
  {
    id: 'erg-risco-obstetrico',
    type: 'custom',
    position: { x: 650, y: 460 },
    data: {
      label: 'Risco Obstétrico Alto',
      description: 'História obstétrica de risco',
      nodeType: 'alert',
      alertLevel: 'high',
    },
  },
  {
    id: 'erg-condicoes-previas',
    type: 'custom',
    position: { x: 400, y: 520 },
    data: {
      label: 'Condições Clínicas Prévias?',
      description: 'Doenças pré-existentes',
      nodeType: 'decision',
      details: [
        'Hipertensão arterial crônica',
        'Diabetes mellitus (DM1 ou DM2)',
        'Cardiopatias',
        'Nefropatias',
        'Tireopatias',
        'Doenças autoimunes (LES, SAF)',
        'Epilepsia',
        'HIV/AIDS',
        'Hepatites B/C',
        'Doenças psiquiátricas graves',
        'Trombofilia conhecida',
        'Anemia falciforme',
        'Neoplasias',
      ],
    },
  },
  {
    id: 'erg-alto-risco-clinico',
    type: 'custom',
    position: { x: 650, y: 600 },
    data: {
      label: 'Alto Risco - Doença Prévia',
      description: 'Condição clínica de alto risco',
      nodeType: 'alert',
      alertLevel: 'high',
    },
  },
  {
    id: 'erg-exames-iniciais',
    type: 'custom',
    position: { x: 400, y: 660 },
    data: {
      label: 'Exames Iniciais',
      description: 'Rastreamento laboratorial',
      nodeType: 'assessment',
      exams: [
        'Hemograma',
        'Tipagem ABO/Rh',
        'Coombs indireto',
        'Glicemia jejum',
        'EAS + Urocultura',
        'VDRL/RPR',
        'HIV',
        'HBsAg',
        'Toxoplasmose IgG/IgM',
        'TSH',
      ],
      details: [
        'Se glicemia jejum ≥92 mg/dL = DMG',
        'Se Coombs indireto + = Isoimunização',
        'Se TSH alterado = avaliar tireoide',
      ],
    },
  },
  {
    id: 'erg-alteracao-exames',
    type: 'custom',
    position: { x: 400, y: 800 },
    data: {
      label: 'Alteração nos Exames?',
      description: 'Resultados anormais',
      nodeType: 'decision',
    },
  },
  {
    id: 'erg-risco-laboratorial',
    type: 'custom',
    position: { x: 650, y: 880 },
    data: {
      label: 'Risco por Exame Alterado',
      description: 'DMG, sífilis, HIV ou outras',
      nodeType: 'alert',
      alertLevel: 'high',
      details: [
        'DMG: Glicemia jejum ≥92 mg/dL',
        'Sífilis: VDRL+ → tratar imediato',
        'HIV: Confirmar e iniciar TARV',
        'Isoimunização: Coombs+ → referência',
      ],
    },
  },
  {
    id: 'erg-classificacao',
    type: 'custom',
    position: { x: 400, y: 960 },
    data: {
      label: 'Classificação Final',
      description: 'Definir nível de risco',
      nodeType: 'assessment',
    },
  },
  {
    id: 'erg-baixo-risco',
    type: 'custom',
    position: { x: 150, y: 1080 },
    data: {
      label: 'Baixo Risco (Risco Habitual)',
      description: 'Pré-natal na UBS',
      nodeType: 'info',
      details: [
        'Gestação sem fatores de risco identificados',
        'Mínimo 6 consultas',
        'Acompanhamento na APS',
        'Parto em maternidade de referência',
      ],
    },
  },
  {
    id: 'erg-risco-intermediario',
    type: 'custom',
    position: { x: 400, y: 1080 },
    data: {
      label: 'Risco Intermediário',
      description: 'Vigilância aumentada na UBS',
      nodeType: 'alert',
      alertLevel: 'medium',
      details: [
        'Fatores de risco modificáveis',
        'Idade extrema isolada',
        'Obesidade grau I sem complicações',
        'Acompanhamento mais frequente',
        'Possível matriciamento com especialista',
      ],
    },
  },
  {
    id: 'erg-alto-risco',
    type: 'custom',
    position: { x: 650, y: 1080 },
    data: {
      label: 'Alto Risco Gestacional',
      description: 'Encaminhar para referência',
      nodeType: 'referral',
      referTo: 'Pré-natal de Alto Risco',
      details: [
        'Condição clínica grave prévia',
        'História obstétrica de risco',
        'DMG ou hipertensão gestacional',
        'Exame alterado significativo',
        'Gestação múltipla',
      ],
    },
  },
  {
    id: 'erg-follow-baixo',
    type: 'custom',
    position: { x: 150, y: 1200 },
    data: {
      label: 'Seguimento Baixo Risco',
      description: 'Cronograma padrão',
      nodeType: 'action',
      details: [
        'Mensal até 28 semanas',
        'Quinzenal de 28-36 semanas',
        'Semanal de 36-40 semanas',
        'Total: mínimo 6 consultas',
      ],
    },
  },
  {
    id: 'erg-follow-intermediario',
    type: 'custom',
    position: { x: 400, y: 1200 },
    data: {
      label: 'Seguimento Intermediário',
      description: 'Vigilância intensificada',
      nodeType: 'action',
      details: [
        'Consultas a cada 2-3 semanas',
        'USG seriada se necessário',
        'Matriciamento com especialista',
        'Reavaliar risco a cada consulta',
      ],
    },
  },
  {
    id: 'erg-follow-alto',
    type: 'custom',
    position: { x: 650, y: 1200 },
    data: {
      label: 'Pré-Natal Alto Risco',
      description: 'Centro de Referência',
      nodeType: 'action',
      details: [
        'Compartilhado com APS',
        'Consultas semanais/quinzenais',
        'Exames especializados',
        'Vitalidade fetal seriada',
        'Planejamento do parto',
      ],
    },
  },
  {
    id: 'erg-end-baixo',
    type: 'custom',
    position: { x: 150, y: 1320 },
    data: {
      label: 'Parto Maternidade',
      description: 'Via de parto conforme indicação obstétrica',
      nodeType: 'end',
    },
  },
  {
    id: 'erg-end-alto',
    type: 'custom',
    position: { x: 650, y: 1320 },
    data: {
      label: 'Parto em Referência',
      description: 'Hospital com UTI neonatal/materna',
      nodeType: 'end',
    },
  },
];

const estratificacaoRiscoEdges: ProtocolEdge[] = [
  { id: 'e-erg-1', source: 'erg-start', target: 'erg-anamnese' },
  { id: 'e-erg-2', source: 'erg-anamnese', target: 'erg-fatores-pessoais' },
  { id: 'e-erg-3', source: 'erg-fatores-pessoais', target: 'erg-risco-pessoal', sourceHandle: 'yes', label: 'Sim' },
  { id: 'e-erg-4', source: 'erg-fatores-pessoais', target: 'erg-historia-obstetrica', sourceHandle: 'no', label: 'Não' },
  { id: 'e-erg-5', source: 'erg-risco-pessoal', target: 'erg-historia-obstetrica' },
  { id: 'e-erg-6', source: 'erg-historia-obstetrica', target: 'erg-risco-obstetrico', sourceHandle: 'yes', label: 'Sim' },
  { id: 'e-erg-7', source: 'erg-historia-obstetrica', target: 'erg-condicoes-previas', sourceHandle: 'no', label: 'Não' },
  { id: 'e-erg-8', source: 'erg-risco-obstetrico', target: 'erg-condicoes-previas' },
  { id: 'e-erg-9', source: 'erg-condicoes-previas', target: 'erg-alto-risco-clinico', sourceHandle: 'yes', label: 'Sim' },
  { id: 'e-erg-10', source: 'erg-condicoes-previas', target: 'erg-exames-iniciais', sourceHandle: 'no', label: 'Não' },
  { id: 'e-erg-11', source: 'erg-alto-risco-clinico', target: 'erg-exames-iniciais' },
  { id: 'e-erg-12', source: 'erg-exames-iniciais', target: 'erg-alteracao-exames' },
  { id: 'e-erg-13', source: 'erg-alteracao-exames', target: 'erg-risco-laboratorial', sourceHandle: 'yes', label: 'Sim' },
  { id: 'e-erg-14', source: 'erg-alteracao-exames', target: 'erg-classificacao', sourceHandle: 'no', label: 'Não' },
  { id: 'e-erg-15', source: 'erg-risco-laboratorial', target: 'erg-classificacao' },
  { id: 'e-erg-16', source: 'erg-classificacao', target: 'erg-baixo-risco', label: 'Sem fatores' },
  { id: 'e-erg-17', source: 'erg-classificacao', target: 'erg-risco-intermediario', label: 'Fatores isolados' },
  { id: 'e-erg-18', source: 'erg-classificacao', target: 'erg-alto-risco', label: 'Múltiplos fatores' },
  { id: 'e-erg-19', source: 'erg-baixo-risco', target: 'erg-follow-baixo' },
  { id: 'e-erg-20', source: 'erg-risco-intermediario', target: 'erg-follow-intermediario' },
  { id: 'e-erg-21', source: 'erg-alto-risco', target: 'erg-follow-alto' },
  { id: 'e-erg-22', source: 'erg-follow-baixo', target: 'erg-end-baixo' },
  { id: 'e-erg-23', source: 'erg-follow-intermediario', target: 'erg-end-baixo' },
  { id: 'e-erg-24', source: 'erg-follow-alto', target: 'erg-end-alto' },
];

export const protocoloEstratificacaoRisco: Protocolo = {
  id: 'estratificacao-risco-gestacional',
  titulo: 'Estratificação de Risco Gestacional',
  subtitulo: 'Triagem e Classificação na Primeira Consulta',
  categoria: 'materno_infantil',
  complexidade: 'basico',
  versao: '2025.1',
  ultimaAtualizacao: '2025-01',
  fonte: 'Manual de Gestação de Alto Risco MS 2022',
  ciap2: ['W78', 'W79', 'W84'],
  cid10: ['Z34.0', 'O09', 'Z35'],
  descricao: 'Protocolo para estratificação de risco gestacional na primeira consulta de pré-natal, identificando gestantes de baixo, intermediário e alto risco.',
  objetivos: [
    'Identificar fatores de risco gestacional',
    'Classificar gestante por nível de risco',
    'Direcionar para acompanhamento adequado',
    'Prevenir complicações materno-fetais',
    'Garantir acesso ao nível de cuidado necessário',
  ],
  populacaoAlvo: 'Gestantes em primeira consulta de pré-natal',
  nodes: estratificacaoRiscoNodes,
  edges: estratificacaoRiscoEdges,
  criteriosInclusao: [
    'Toda gestante na primeira consulta pré-natal',
    'Gestante sem estratificação prévia',
    'Transferência de outra unidade',
  ],
  sinaisAlerta: [
    'Sangramento vaginal',
    'Dor abdominal intensa',
    'Cefaleia intensa com alteração visual',
    'PA ≥140/90 mmHg',
    'Movimentação fetal reduzida (>28 sem)',
    'Febre alta (≥38°C)',
  ],
  encaminhamento: {
    quando: [
      'Condição clínica grave prévia',
      'História obstétrica de alto risco',
      'Exame alterado significativo',
      'Gestação múltipla',
      'Malformação fetal diagnosticada',
    ],
    paraCQuem: 'Pré-natal de Alto Risco / Centro de Referência',
  },
  referencias: [
    'Manual de Gestação de Alto Risco MS 2022',
    'Caderno de Atenção Básica nº32 - Pré-Natal',
    'FEBRASGO - Manual de Pré-Natal 2024',
  ],
  doencasRelacionadas: ['classificacao-risco-gestacional', 'diabetes-gestacional', 'pre-eclampsia-eclampsia', 'hipertensao-cronica-gestacao'],
  medicamentosRelacionados: ['acido-folico-gestacao', 'sulfato-ferroso-gestacao'],
  calculadorasRelacionadas: ['idade-gestacional', 'dpp'],
  tags: ['gestacao', 'prenatal', 'estratificacao', 'triagem', 'alto-risco'],
};

// =============================================================================
// TODOS OS PROTOCOLOS
// =============================================================================

export const todosProtocolosFlowchart: Protocolo[] = [
  protocoloHAS,
  protocoloDM2,
  protocoloDorToracica,
  protocoloITU,
  protocoloAsma,
  protocoloLombalgia,
  protocoloDepressao,
  protocoloCefaleia,
  protocoloIVAS,
  protocoloDislipidemia,
  protocoloPreNatal,
  protocoloPuericultura,
  protocoloDPOC,
  // Protocolos de Alto Risco Gestacional
  protocoloDMG,
  protocoloPreEclampsia,
  protocoloHIVGestacao,
  protocoloSifilisGestacao,
  protocoloEstratificacaoRisco,
];

// Função para buscar protocolo por ID
export function getProtocoloById(id: string): Protocolo | undefined {
  return todosProtocolosFlowchart.find(p => p.id === id);
}

// Função para buscar protocolos por categoria
export function getProtocolosByCategoria(categoria: string): Protocolo[] {
  return todosProtocolosFlowchart.filter(p => p.categoria === categoria);
}

// Estatísticas
export function getProtocolosStats() {
  return {
    total: todosProtocolosFlowchart.length,
    porCategoria: todosProtocolosFlowchart.reduce((acc, p) => {
      acc[p.categoria] = (acc[p.categoria] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    porComplexidade: todosProtocolosFlowchart.reduce((acc, p) => {
      acc[p.complexidade] = (acc[p.complexidade] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };
}

