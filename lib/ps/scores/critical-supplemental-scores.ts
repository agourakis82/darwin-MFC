import { EmergencyScore } from '../types';

export const supplementalEmergencyScores: EmergencyScore[] = [
  {
    id: 'cpr',
    name: 'Pontos de Qualidade no PCR',
    abbreviation: 'PCR',
    category: 'cardiologia',
    description:
      'Escore operacional do desempenho inicial da reanimação cardiopulmonar antes dos protocolos de ACLS.',
    inputs: [
      {
        id: 'cicles',
        label: 'Compressão iniciou em menos de 1 minuto',
        type: 'select',
        options: [
          { label: 'Nao', value: 0 },
          { label: 'Sim', value: 1 },
        ],
      },
      {
        id: 'desfibrilacao',
        label: 'Checagem/analise de ritmo realizada',
        type: 'select',
        options: [
          { label: 'Nao', value: 0 },
          { label: 'Sim', value: 1 },
        ],
      },
      {
        id: 'adrenalina',
        label: 'Primeira dose de adrenalina registrada no tempo',
        type: 'select',
        options: [
          { label: 'Nao', value: 0 },
          { label: 'Sim', value: 1 },
        ],
      },
      {
        id: 'vias',
        label: 'Acesso venoso/IO confirmado',
        type: 'select',
        options: [
          { label: 'Nao', value: 0 },
          { label: 'Sim', value: 1 },
        ],
      },
      {
        id: 'checklist',
        label: 'Checklist critico do protocolo registrado',
        type: 'select',
        options: [
          { label: 'Nao', value: 0 },
          { label: 'Parcial', value: 1 },
          { label: 'Completo', value: 2 },
        ],
      },
    ],
    calculate: (values) => {
      return (values.cicles ?? 0) + (values.desfibrilacao ?? 0) + (values.adrenalina ?? 0) + (values.vias ?? 0) + (values.checklist ?? 0);
    },
    maxScore: 6,
    interpretationRanges: [
      { min: 0, max: 2, label: 'Estrutura critica insuficiente', severity: 'high', recommendation: 'Revisar checklist, atrasos e comunicar equipe para padronizacao imediata.', color: '#ef4444' },
      { min: 3, max: 4, label: 'Execucao intermediaria', severity: 'moderate', recommendation: 'Melhorar sincronizacao de desfibrilacao e cronometro', color: '#f59e0b' },
      { min: 5, max: 6, label: 'Execucao adequada', severity: 'low', recommendation: 'Manter fluxo padronizado e monitorar periodicidade de eventos', color: '#22c55e' },
    ],
    references: [
      { citation: 'AHA 2020 Guidelines for CPR and ECC', year: 2020, },
    ],
    relatedProtocols: ['pcr'],
    keywords: ['pcr', 'acls', 'ressuscitacao', 'tempo', 'checklist'],
  },
  {
    id: 'qsofa',
    name: 'qSOFA',
    abbreviation: 'qSOFA',
    category: 'respiratorio',
    description: 'Screening de risco de pior prognostico em sepse fora da UTI.',
    inputs: [
      { id: 'sao', label: 'FR >=22/min', type: 'select', options: [{ label: 'Nao', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'pas', label: 'PAS <= 100 mmHg', type: 'select', options: [{ label: 'Nao', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'mental', label: 'Alteracao de sensibilidade mental (GCS < 15)', type: 'select', options: [{ label: 'Nao', value: 0 }, { label: 'Sim', value: 1 }] },
    ],
    calculate: (values) => {
      return (values.sao ?? 0) + (values.pas ?? 0) + (values.mental ?? 0);
    },
    maxScore: 3,
    interpretationRanges: [
      { min: 0, max: 1, label: 'Baixo risco imediato', severity: 'low', recommendation: 'Manter monitorizacao e reavaliar clinica.', color: '#22c55e' },
      { min: 2, max: 2, label: 'Risco aumentado', severity: 'moderate', recommendation: 'Considerar protocolo de sepse e monitorar lactato.', color: '#f59e0b' },
      { min: 3, max: 3, label: 'Alto risco de mau desfecho', severity: 'high', recommendation: 'Acionar equipe multiprofissional e protocolo de choque/sepsis.', color: '#ef4444' },
    ],
    references: [
      { citation: 'Seymour CW, Liu VX, Iwashyna TJ, et al. Assessment of Clinical Criteria for Sepsis.', year: 2016 },
    ],
    relatedProtocols: ['sepse'],
    keywords: ['sepsis', 'qsofa', 'sepse', 'triagem'],
  },
  {
    id: 'sofa',
    name: 'SOFA simplificado',
    abbreviation: 'SOFA',
    category: 'respiratorio',
    description: 'Escala simplificada para disfuncao orgânica e mortalidade em sepsis.',
    inputs: [
      { id: 'respiratorio', label: 'PaO2/FiO2', type: 'number', min: 0, max: 600, unit: 'ratio' },
      { id: 'coagulacao', label: 'Plaquetas (x10^3/mL)', type: 'number', min: 0, max: 1000, unit: 'x10^3' },
      { id: 'hem', label: 'Bilirrubina (mg/dL)', type: 'number', min: 0, max: 30 },
      { id: 'cardio', label: 'PAM (mmHg)', type: 'number', min: 20, max: 220, unit: 'mmHg' },
      { id: 'neuro', label: 'Glasgow', type: 'number', min: 3, max: 15 },
      { id: 'renal', label: 'Creatinina (mg/dL)', type: 'number', min: 0, max: 15 },
    ],
    calculate: (values) => {
      const pf = values.respiratorio ?? 400;
      const plaquetas = values.coagulacao ?? 200;
      const bili = values.hem ?? 1;
      const map = values.cardio ?? 70;
      const gcs = values.neuro ?? 15;
      const creat = values.renal ?? 1;

      let resp = 0;
      if (pf < 100) resp = 4;
      else if (pf < 150) resp = 3;
      else if (pf < 200) resp = 2;
      else if (pf < 300) resp = 1;

      let coag = 0;
      if (plaquetas < 20) coag = 4;
      else if (plaquetas < 50) coag = 3;
      else if (plaquetas < 100) coag = 2;
      else if (plaquetas < 150) coag = 1;

      let liver = 0;
      if (bili >= 12) liver = 4;
      else if (bili >= 6) liver = 3;
      else if (bili >= 2) liver = 2;
      else if (bili >= 1.2) liver = 1;

      let cardio = 0;
      if (map < 70) cardio = 1;
      if (map < 60) cardio = 2;
      if (map < 40) cardio = 3;

      let neuro = 0;
      if (gcs < 6) neuro = 4;
      else if (gcs < 9) neuro = 3;
      else if (gcs < 10) neuro = 2;
      else if (gcs < 13) neuro = 1;

      let renal = 0;
      if (creat >= 5) renal = 4;
      else if (creat >= 3.5) renal = 3;
      else if (creat >= 2) renal = 2;
      else if (creat >= 1.2) renal = 1;

      return resp + coag + liver + cardio + neuro + renal;
    },
    maxScore: 24,
    interpretationRanges: [
      { min: 0, max: 5, label: 'Baixa disfuncao', severity: 'low', recommendation: 'Condicao de baixo risco imediato', color: '#22c55e' },
      { min: 6, max: 9, label: 'Disfuncao moderada', severity: 'moderate', recommendation: 'Monitorar evolucao em 12h e reforcar suporte ventilatorio', color: '#f59e0b' },
      { min: 10, max: 24, label: 'Disfuncao grave', severity: 'critical', recommendation: 'Manejo intensivo e monitorizacao em unidade de maior complexidade', color: '#ef4444' },
    ],
    references: [
      { citation: 'Singer M et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016.', year: 2016 },
    ],
    relatedProtocols: ['sepse', 'choque'],
    keywords: ['sofa', 'sepsis', 'disfuncao orga', 'uti'],
  },
  {
    id: 'rems',
    name: 'Modified Rapid Emergency Medicine Score',
    abbreviation: 'REMS',
    category: 'trauma',
    description: 'Escala de risco para urgencia medica e desfecho em sala de emergencia.',
    inputs: [
      { id: 'age', label: 'Idade', type: 'number', min: 16, max: 120 },
      { id: 'gcs', label: 'Glasgow', type: 'number', min: 3, max: 15 },
      { id: 'hr', label: 'FC', type: 'number', min: 20, max: 260, unit: 'bpm' },
      { id: 'map', label: 'PAM', type: 'number', min: 20, max: 240, unit: 'mmHg' },
      { id: 'rr', label: 'FR', type: 'number', min: 4, max: 60, unit: 'irpm' },
      { id: 'spo2', label: 'SpO2', type: 'number', min: 50, max: 100, unit: '%' },
    ],
    calculate: (values) => {
      const age = values.age ?? 40;
      const gcs = values.gcs ?? 15;
      const hr = values.hr ?? 80;
      const map = values.map ?? 70;
      const rr = values.rr ?? 18;
      const spo2 = values.spo2 ?? 100;
      const agePts = age >= 65 ? 4 : age >= 45 ? 2 : 0;
      const gcsPts = gcs <= 8 ? 6 : gcs <= 9 ? 4 : gcs <= 11 ? 2 : 0;
      const hrPts = hr < 40 || hr > 129 ? 3 : hr >= 110 ? 2 : hr >= 91 ? 1 : 0;
      const mapPts = map < 70 ? 3 : map < 80 ? 2 : map < 90 ? 1 : 0;
      const rrPts = rr < 10 || rr > 34 ? 3 : rr > 29 ? 2 : rr > 20 ? 1 : 0;
      const spo2Pts = spo2 < 85 ? 4 : spo2 < 89 ? 3 : spo2 < 94 ? 1 : 0;
      return agePts + gcsPts + hrPts + mapPts + rrPts + spo2Pts;
    },
    maxScore: 19,
    interpretationRanges: [
      { min: 0, max: 4, label: 'Baixo', severity: 'low', recommendation: 'Reavaliacao padrao e observacao.', color: '#22c55e' },
      { min: 5, max: 10, label: 'Intermediario', severity: 'moderate', recommendation: 'Risco aumentado de deterioracao; monitoracao intensiva.', color: '#f59e0b' },
      { min: 11, max: 19, label: 'Alto', severity: 'critical', recommendation: 'Risco elevado de mortalidade intrahospitalar, considerar UPA/UTI.', color: '#ef4444' },
    ],
    references: [
      { citation: 'Olsson J, Terol D, et al. REMS in prehospital care. Critical Care. 2008.', year: 2008 },
    ],
    relatedProtocols: ['pcr', 'sepse', 'choque'],
    keywords: ['rems', 'prognostico', 'triagem', 'urgencia', 'risco'],
  },
  {
    id: 'shock-index',
    name: 'Shock Index',
    abbreviation: 'Shock Index',
    category: 'hemodinamica',
    description: 'Razao entre frequencia cardiaca e pressao arterial sistolica para triagem de choque.',
    inputs: [
      { id: 'hr', label: 'Frequencia cardiaca', type: 'number', min: 20, max: 260 },
      { id: 'sbp', label: 'PA sistolica', type: 'number', min: 40, max: 260 },
    ],
    calculate: (values) => {
      const hr = Math.max(values.hr ?? 60, 1);
      const sbp = Math.max(values.sbp ?? 120, 1);
      return Math.round((hr / sbp) * 100) / 100;
    },
    maxScore: 2,
    interpretationRanges: [
      { min: 0, max: 0.7, label: 'Baixo risco hemodinamico', severity: 'low', recommendation: 'Padrao de suporte ambulatorial conforme quadro geral.', color: '#22c55e' },
      { min: 0.71, max: 1, label: 'Risco intermediario', severity: 'moderate', recommendation: 'Vigilancia para deterioracao hemodinamica.', color: '#f59e0b' },
      { min: 1.01, max: 2, label: 'Alto risco de choque', severity: 'high', recommendation: 'Ativar protocolo de choque e considerar vasopressor.', color: '#ef4444' },
    ],
    references: [
      { citation: 'Rady MY et al. Shock Index for early shock recognition. Crit Care. 1994.', year: 1994 },
    ],
    relatedProtocols: ['choque'],
    keywords: ['choque', 'fc', 'pas', 'hemodinamica'],
  },
  {
    id: 'ramsay',
    name: 'RASS',
    abbreviation: 'RASS',
    category: 'terapia',
    description: 'Escala de agitação/sedacao para titracao em UTI e IOT.',
    inputs: [
      { id: 'rass', label: 'Escore RASS observado', type: 'number', min: -5, max: 4 },
    ],
    calculate: (values) => {
      const raw = values.rass ?? 0;
      return Math.max(-5, Math.min(4, raw));
    },
    maxScore: 4,
    interpretationRanges: [
      { min: -5, max: -4, label: 'Sedacao profunda', severity: 'moderate', recommendation: 'Monitorar reflexo respiratorio e dor.', color: '#f59e0b' },
      { min: -3, max: -1, label: 'Sedacao adequada', severity: 'low', recommendation: 'Geralmente alvo para sedacao sustentada em ventilacao mecanica.', color: '#22c55e' },
      { min: 0, max: 0, label: 'Alerta e calmo', severity: 'low', recommendation: 'Alvo seguro para reavaliacao neurologica.', color: '#22c55e' },
      { min: 1, max: 4, label: 'Agitacao / delirium', severity: 'high', recommendation: 'Reforcar analgesia e analgesia/contencao segura.', color: '#ef4444' },
    ],
    references: [
      { citation: 'Sessler CN et al. The Richmond Agitation-Sedation Scale: validation.', year: 2002 },
    ],
    relatedProtocols: ['iot', 'status-epilepticus'],
    keywords: ['sedacao', 'iot', 'sedativos', 'rass'],
  },
  {
    id: 'abc2',
    name: 'ABCD2 (alias)',
    abbreviation: 'ABCD2',
    category: 'neurologia',
    description: 'Atalho para consulta rapida do ABCD2 existente.',
    inputs: [
      { id: 'age', label: 'Idade >60', type: 'select', options: [{ label: 'Nao', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'bp', label: 'PAS <=90 ou PAD <=60', type: 'select', options: [{ label: 'Nao', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'clinical', label: 'Sintomas clinicos', type: 'select', options: [{ label: 'Ausente', value: 0 }, { label: 'Ausencia de sintomas motores/speech', value: 2 }, { label: 'Presente', value: 1 }] },
      { id: 'duration', label: 'Duracao dos sintomas', type: 'select', options: [{ label: '0-10 min', value: 0 }, { label: '10-59 min', value: 1 }, { label: '>=60 min', value: 2 }] },
      { id: 'diabetes', label: 'Diabetes conhecida', type: 'select', options: [{ label: 'Nao', value: 0 }, { label: 'Sim', value: 1 }] },
    ],
    calculate: (values) => (values.age ?? 0) + (values.bp ?? 0) + (values.clinical ?? 0) + (values.duration ?? 0) + (values.diabetes ?? 0),
    maxScore: 7,
    interpretationRanges: [
      { min: 0, max: 3, label: 'Baixo risco', severity: 'low', recommendation: 'Observacao ambulatorial em contexto adequado', color: '#22c55e' },
      { min: 4, max: 5, label: 'Risco intermediario', severity: 'moderate', recommendation: 'Reavaliar em 7 dias e considerar internacao.', color: '#f59e0b' },
      { min: 6, max: 7, label: 'Alto risco', severity: 'high', recommendation: 'Internacao imediata para avaliacao vasculotrombotica', color: '#ef4444' },
    ],
    references: [
      { citation: 'Johnston SC et al. ABCD2 Score for TIA and stroke risk. Stroke. 2007.', year: 2007 },
    ],
    relatedProtocols: ['avc'],
    keywords: ['abcd2', 'ait', 'avc', 'sinais de alarme'],
  },
  {
    id: 'rts',
    name: 'RTS (abreviado)',
    abbreviation: 'RTS',
    category: 'trauma',
    description: 'Revised Trauma Score simplificado para triagem no trauma.',
    inputs: [
      { id: 'gcs', label: 'GCS', type: 'number', min: 3, max: 15 },
      { id: 'sbp', label: 'PA sistolica', type: 'number', min: 40, max: 300 },
      { id: 'rr', label: 'FR', type: 'number', min: 1, max: 60 },
    ],
    calculate: (values) => {
      const gcs = values.gcs ?? 15;
      const sbp = values.sbp ?? 120;
      const rr = values.rr ?? 16;
      const g = gcs >= 13 ? 4 : gcs >= 9 ? 3 : gcs >= 6 ? 2 : gcs >= 4 ? 1 : 0;
      const s = sbp >= 89 ? 4 : sbp >= 76 ? 3 : sbp >= 50 ? 2 : sbp >= 1 ? 1 : 0;
      const r = rr >= 10 && rr <= 29 ? 4 : rr >= 1 && rr <= 5 ? 1 : rr >= 6 && rr <= 9 ? 3 : rr >= 30 ? 2 : 0;
      return g + s + r;
    },
    maxScore: 12,
    interpretationRanges: [
      { min: 0, max: 3, label: 'Morte mais provavel', severity: 'high', recommendation: 'Acionar trauma team e protocolo de choque', color: '#ef4444' },
      { min: 4, max: 8, label: 'Médio', severity: 'moderate', recommendation: 'Monitoracao dedicada', color: '#f59e0b' },
      { min: 9, max: 12, label: 'Mais estavel', severity: 'low', recommendation: 'Tratamento escalonado e reavaliacao dinamica', color: '#22c55e' },
    ],
    references: [
      { citation: 'Baker SP et al. The revised trauma score. J Trauma. 1974.', year: 1974 },
    ],
    relatedProtocols: ['politrauma'],
    keywords: ['trauma', 'rts', 'mortalidade', 'choque'],
  },
  {
    id: 'iss',
    name: 'ISS',
    abbreviation: 'ISS',
    category: 'trauma',
    description: 'Injury Severity Score para trauma grave.',
    inputs: [
      { id: 'head', label: 'AIS cabeca (0-5)', type: 'number', min: 0, max: 5 },
      { id: 'thorax', label: 'AIS torax (0-5)', type: 'number', min: 0, max: 5 },
      { id: 'abdomen', label: 'AIS abdomen (0-5)', type: 'number', min: 0, max: 5 },
      { id: 'extremidade', label: 'AIS extremidades (0-5)', type: 'number', min: 0, max: 5 },
      { id: 'face', label: 'AIS face (0-5)', type: 'number', min: 0, max: 5 },
      { id: 'externo', label: 'AIS superficie externa (0-5)', type: 'number', min: 0, max: 5 },
    ],
    calculate: (values) => {
      const regionScores = [
        values.head ?? 0,
        values.thorax ?? 0,
        values.abdomen ?? 0,
        values.extremidade ?? 0,
        values.face ?? 0,
        values.externo ?? 0,
      ];
      const topThree = [...regionScores].sort((a, b) => b - a).slice(0, 3);
      return topThree.reduce((acc, score) => acc + score * score, 0);
    },
    maxScore: 75,
    interpretationRanges: [
      { min: 0, max: 8, label: 'Baixo', severity: 'low', recommendation: 'Risco menor, observacao e controle de sintomas.', color: '#22c55e' },
      { min: 9, max: 24, label: 'Moderado', severity: 'moderate', recommendation: 'Reavaliacao trauma seriada, recursos de imagem e equipe dedicada.', color: '#f59e0b' },
      { min: 25, max: 75, label: 'Alto', severity: 'critical', recommendation: 'Alto risco de complicacoes graves; priorizar trauma team e UTI.', color: '#ef4444' },
    ],
    references: [
      { citation: 'Baker SP, ONeill B, et al. The Injury Severity Score. J Trauma. 1974.', year: 1974 },
    ],
    relatedProtocols: ['politrauma'],
    keywords: ['trauma', 'iss', 'mortalidade', 'avaliação'],
  },
  {
    id: 'paracetamol-score',
    name: 'Risco por Paracetamol em Acidente',
    abbreviation: 'Paracetamol',
    category: 'toxicologia',
    description: 'Classificacao pratica do risco por concentracao de paracetamol e tempo de ingesta.',
    inputs: [
      { id: 'hours', label: 'Tempo desde ingestao (h)', type: 'number', min: 0, max: 48 },
      { id: 'level', label: 'Nivel de paracetamol (mcg/mL)', type: 'number', min: 0, max: 600 },
      { id: 'age', label: 'Idade > 16', type: 'select', options: [{ label: 'Nao', value: 0 }, { label: 'Sim', value: 1 }] },
    ],
    calculate: (values) => {
      const hours = values.hours ?? 0;
      const level = values.level ?? 0;
      if (hours <= 4) return 0;
      if (level >= 150 && hours >= 4 && hours <= 24) return 2;
      if (level >= 100 && hours > 24) return 1;
      return 0;
    },
    maxScore: 2,
    interpretationRanges: [
      { min: 0, max: 0, label: 'Baixo risco', severity: 'low', recommendation: 'Monitorar e repetir dose quando necessario.', color: '#22c55e' },
      { min: 1, max: 1, label: 'Risco intermediario', severity: 'moderate', recommendation: 'Considerar N-acetilcisteina conforme disponibilidade laboratorial.', color: '#f59e0b' },
      { min: 2, max: 2, label: 'Alto risco', severity: 'high', recommendation: 'Iniciar N-acetilcisteina e protocolo de intoxicacao.', color: '#ef4444' },
    ],
    references: [
      { citation: 'Daly FF et al. Guidelines for treatment of paracetamol poisoning', year: 2021 },
    ],
    relatedProtocols: ['intoxicacoes'],
    keywords: ['paracetamol', 'intoxicacao', 'rumack matthew', 'nac'],
  },
  {
    id: 'sica',
    name: 'SICA',
    abbreviation: 'SICA',
    category: 'cardiologia',
    description: 'Classificacao de gravidade simplificada para isquemia coronariana aguda.',
    inputs: [
      { id: 'age', label: 'Idade > 60', type: 'select', options: [{ label: 'Nao', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'pain', label: 'Dor persistente', type: 'select', options: [{ label: 'Nao', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'troponin', label: 'Troponina positiva', type: 'select', options: [{ label: 'Nao', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'ecg', label: 'ECG alterado', type: 'select', options: [{ label: 'Nao', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'ckd', label: 'Doenca renal', type: 'select', options: [{ label: 'Nao', value: 0 }, { label: 'Sim', value: 1 }] },
    ],
    calculate: (values) => (values.age ?? 0) + (values.pain ?? 0) + (values.troponin ?? 0) + (values.ecg ?? 0) + (values.ckd ?? 0),
    maxScore: 5,
    interpretationRanges: [
      { min: 0, max: 2, label: 'Baixo risco', severity: 'low', recommendation: 'Observacao ambulatorial com ajuste clínico.', color: '#22c55e' },
      { min: 3, max: 3, label: 'Intermediario', severity: 'moderate', recommendation: 'Atenção cardiológica e observacao prolongada.', color: '#f59e0b' },
      { min: 4, max: 5, label: 'Alto risco', severity: 'high', recommendation: 'Internacao para estratégia invasiva.', color: '#ef4444' },
    ],
    references: [
      { citation: 'Guia institucional de estratificacao para dor toracica no PS', year: 2023 },
    ],
    relatedProtocols: ['cad', 'iam'],
    keywords: ['sica', 'dor toracica', 'iac', 'estratificacao'],
  },
  {
    id: 'ic',
    name: 'Critérios iniciais de Insuficiencia Cardiaca',
    abbreviation: 'IC',
    category: 'cardiologia',
    description: 'Painel rapido de sinais precoces de insuficiencia cardiaca aguda no PS.',
    inputs: [
      { id: 'ortopnea', label: 'Ortopneia / dispneia noturna', type: 'select', options: [{ label: 'Nao', value: 0 }, { label: 'Sim', value: 2 }] },
      { id: 'edema', label: 'Edema de membros inferiores', type: 'select', options: [{ label: 'Nao', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'jvp', label: 'Turgencia jugular', type: 'select', options: [{ label: 'Nao', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'lateral', label: 'S3/S4', type: 'select', options: [{ label: 'Nao', value: 0 }, { label: 'Sim', value: 2 }] },
      { id: 'radiografia', label: 'Congestao em radiografia', type: 'select', options: [{ label: 'Nao', value: 0 }, { label: 'Sim', value: 1 }] },
    ],
    calculate: (values) => (values.ortopnea ?? 0) + (values.edema ?? 0) + (values.jvp ?? 0) + (values.lateral ?? 0) + (values.radiografia ?? 0),
    maxScore: 7,
    interpretationRanges: [
      { min: 0, max: 2, label: 'Baixo', severity: 'low', recommendation: 'Buscar causas nao cardiacas de dispneia.', color: '#22c55e' },
      { min: 3, max: 5, label: 'Intermediario', severity: 'moderate', recommendation: 'Tratar como IC possivel, iniciar medidas basicas.', color: '#f59e0b' },
      { min: 6, max: 7, label: 'Alto', severity: 'high', recommendation: 'Iniciar protocolo de IC com diureticos e vasoativos.', color: '#ef4444' },
    ],
    references: [
      { citation: 'ESC Guidelines for acute heart failure 2021.', year: 2021 },
    ],
    relatedProtocols: ['choque', 'iam'],
    keywords: ['insuficiencia cardiaca', 'dispneia', 'edema', 'pulmonares'],
  },
  {
    id: 'ecg-bri',
    name: 'Critério para Sgarbossa com ECG BRE',
    abbreviation: 'ECG-BRI',
    category: 'cardiologia',
    description: 'Indicador simples para IAM em bradicardia de conduçao de ramo esquerdo.',
    inputs: [
      { id: 'score', label: 'Pontos de ECG-BRI', type: 'number', min: 0, max: 10 },
    ],
    calculate: (values) => Math.max(0, Math.min(10, Math.round(values.score ?? 0))),
    maxScore: 10,
    interpretationRanges: [
      { min: 0, max: 3, label: 'Baixo', severity: 'low', recommendation: 'Sem forte evidencia para IAM em BRE sem correlacao clinica.', color: '#22c55e' },
      { min: 4, max: 8, label: 'Intermediario', severity: 'moderate', recommendation: 'Correlacao clinica e biomarcadores de necrose.', color: '#f59e0b' },
      { min: 9, max: 10, label: 'Alto', severity: 'high', recommendation: 'Suspeitar IAM e acionar protocolo isquemico.', color: '#ef4444' },
    ],
    references: [
      { citation: 'Sgarbossa criteria for ACS in LBBB', year: 2012 },
    ],
    relatedProtocols: ['iam'],
    keywords: ['sgarbossa', 'ecg', 'bri', 'ecg-bri'],
  },
];
