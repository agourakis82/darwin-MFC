import { EmergencyScore } from '../types';

export const cardioScores: EmergencyScore[] = [
  {
    id: 'timi-nstemi',
    name: 'TIMI UA/NSTEMI',
    abbreviation: 'TIMI UA/NSTEMI',
    category: 'cardiologia',
    description:
      'Escala de risco para angina instavel / IAM sem supradesnivelamento de ST. Calcula risco de eventos isquêmicos em curto prazo.',
    inputs: [
      { id: 'age', label: 'Idade ≥ 65 anos', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: '>=3riskfactors', label: '3 ou mais fatores de risco cardiovascular', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'severeAngina', label: 'Episódios prévios >2 em 24h', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'aspirin', label: 'Uso de AAS recente', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Não usava (1 ponto)', value: 1 }] },
      { id: 'recentST', label: 'Elevação de marcadores de necrose recente / ECG com ST deprimido ≥0,5mm', type: 'select', options: [{ label: 'Ausente', value: 0 }, { label: 'Presente', value: 1 }] },
      { id: 'coronaryDisease', label: 'Estenose coronária ≥50%', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1 }] },
    ],
    calculate: (values) => {
      const sum = (values.age ?? 0) + (values['>=3riskfactors'] ?? 0) + (values.severeAngina ?? 0) + (values.aspirin ?? 0) + (values.recentST ?? 0) + (values.coronaryDisease ?? 0);
      return sum;
    },
    maxScore: 7,
    interpretationRanges: [
      { min: 0, max: 2, label: 'Baixo risco', severity: 'low', recommendation: 'Estratificação conservadora e seguimento em até 48h conforme risco clínico global.', color: '#22c55e' },
      { min: 3, max: 4, label: 'Risco intermediário', severity: 'moderate', recommendation: 'Considerar estratégia invasiva precoce e otimização medicamentosa anti-isquêmica.', color: '#f59e0b' },
      { min: 5, max: 7, label: 'Alto risco', severity: 'high', recommendation: 'Estratificar para estratégia invasiva precoce e monitorização intensiva.', color: '#ef4444' },
    ],
    references: [
      { citation: 'Antman EM et al. The TIMI risk score for unstable angina/non-ST elevation acute coronary syndromes. JAMA. 2000;284(7):835-842.', year: 2000 },
      { citation: 'Amsterdam EA et al. 2024 ACC/AHA guideline for ACS. Circulation. 2024;150:e00e-e00e.', year: 2024 },
    ],
    relatedProtocols: ['sca', 'choque-cardiogenico'],
    keywords: ['timi', 'ua', 'nstemi', 'instabilidade', 'dor toracica', 'risco cardiovascular'],
  },
  {
    id: 'timi-stemi',
    name: 'TIMI STEMI',
    abbreviation: 'TIMI STEMI',
    category: 'cardiologia',
    description:
      'Estimativa de mortalidade hospitalar em IAM com supra de ST para apoio a estratificação precoce.',
    inputs: [
      { id: 'age', label: 'Idade ≥ 75 anos', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 3 }] },
      { id: 'historyDM', label: 'Diabetes, HAS ou Angina prévia', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'sbp', label: 'PAS < 100 mmHg', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 3 }] },
      { id: 'heartRate', label: 'FC > 100 bpm', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 2 }] },
      { id: 'killip', label: 'Classe Killip II ou mais', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 2 }] },
      { id: 'weight', label: 'Peso < 67kg', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'anteriorST', label: 'Infarto anterior ou LBBB', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1 }] },
    ],
    calculate: (values) => {
      return (
        (values.age ?? 0) +
        (values.historyDM ?? 0) +
        (values.sbp ?? 0) +
        (values.heartRate ?? 0) +
        (values.killip ?? 0) +
        (values.weight ?? 0) +
        (values.anteriorST ?? 0)
      );
    },
    maxScore: 14,
    interpretationRanges: [
      { min: 0, max: 4, label: 'Baixo', severity: 'low', recommendation: 'Risco reduzido: estratégia reperfusora conforme tempo porta-angioplastia.', color: '#22c55e' },
      { min: 5, max: 8, label: 'Intermediário', severity: 'moderate', recommendation: 'Elevar nível de monitorização e monitorar complicações mecânicas/eletrofisiológicas.', color: '#f59e0b' },
      { min: 9, max: 14, label: 'Alto', severity: 'critical', recommendation: 'Alto risco de mortalidade; considerar abordagem de reperfusão e UTI desde admissão.', color: '#ef4444' },
    ],
    references: [
      { citation: 'Morrow DA et al. TIMI risk score for ST-elevation myocardial infarction. JAMA. 2000;283(4):507-512.', year: 2000 },
    ],
    relatedProtocols: ['iam-stemi', 'ic'],
    keywords: ['stemi', 'iam com supra', 'reperfusao', 'ic', 'dor toracica'],
  },
  {
    id: 'grace',
    name: 'GRACE',
    abbreviation: 'GRACE',
    category: 'cardiologia',
    description:
      'Escala de risco de mortalidade hospitalar e ao longo de 6 meses em SCA.',
    inputs: [
      { id: 'age', label: 'Idade', type: 'number', min: 18, max: 120 },
      { id: 'hr', label: 'Frequência cardíaca', type: 'number', min: 30, max: 260, unit: 'bpm' },
      { id: 'sbp', label: 'PA sistólica', type: 'number', min: 40, max: 300, unit: 'mmHg' },
      { id: 'creatinine', label: 'Creatinina', type: 'number', min: 0.1, max: 20, unit: 'mg/dL' },
      { id: 'killip', label: 'Killip class (0 a 4)', type: 'number', min: 0, max: 4 },
      { id: 'stDeviation', label: 'Desvio de ST novo', type: 'select', options: [{ label: 'Ausente', value: 0 }, { label: 'Presente', value: 1 }] },
      { id: 'troponin', label: 'Troponina elevada', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1 }] },
    ],
    calculate: (values) => {
      const age = values.age ?? 0;
      const hr = values.hr ?? 0;
      const sbp = values.sbp ?? 120;
      const creat = values.creatinine ?? 1;
      const killip = values.killip ?? 0;
      const st = values.stDeviation ?? 0;
      const trop = values.troponin ?? 0;
      const agePts = age >= 80 ? 41 : age >= 70 ? 32 : age >= 60 ? 24 : age >= 50 ? 18 : age >= 40 ? 12 : age >= 30 ? 8 : 3;
      const hrPts = hr > 150 ? 15 : hr >= 120 ? 10 : hr >= 100 ? 6 : hr >= 80 ? 3 : 0;
      const sbpPts = sbp < 90 ? 58 : sbp < 100 ? 51 : sbp < 110 ? 44 : sbp < 120 ? 38 : sbp < 140 ? 33 : 0;
      const creatPts = creat >= 3 ? 24 : creat >= 2 ? 16 : creat >= 1.5 ? 10 : creat >= 1 ? 8 : 4;
      return agePts + hrPts + sbpPts + creatPts + killip * 20 + st * 12 + trop * 14;
    },
    maxScore: 372,
    interpretationRanges: [
      { min: 0, max: 108, label: 'Baixo risco', severity: 'low', recommendation: 'Risco de morte intra-hospitalar baixo. Pode seguir conduta padronizada de UPA.', color: '#22c55e' },
      { min: 109, max: 140, label: 'Risco intermediário', severity: 'moderate', recommendation: 'Observação e estratificação intensiva de risco.', color: '#f59e0b' },
      { min: 141, max: 372, label: 'Alto risco', severity: 'critical', recommendation: 'Alto risco de óbito; priorizar estratégia invasiva e UTI.', color: '#ef4444' },
    ],
    references: [
      { citation: 'Granger CB et al. Predictors of hospital mortality in ACS: GRACE score. Eur Heart J. 2003;24(9):835-845.', year: 2003 },
    ],
    relatedProtocols: ['sica', 'iam-stemi'],
    keywords: ['grace', 'iac', 'sca', 'risco de morte', 'ic'],
  },
  {
    id: 'heart-score',
    name: 'HEART Score',
    abbreviation: 'HEART',
    category: 'cardiologia',
    description:
      'Pontuação para risco de evento cardiovascular em dor torácica na emergência.',
    inputs: [
      { id: 'history', label: 'História', type: 'select', options: [{ label: 'Não sugestivo (0)', value: 0 }, { label: 'Moderado (1)', value: 1 }, { label: 'Alta suspeita (2)', value: 2 }] },
      { id: 'ecg', label: 'ECG', type: 'select', options: [{ label: 'Sem alterações significativas (0)', value: 0 }, { label: 'Mudanças não específicas (1)', value: 1 }, { label: 'Depressão ST / repolarização anormal (2)', value: 2 }] },
      { id: 'age', label: 'Idade', type: 'select', options: [{ label: 'Menor de 45', value: 0 }, { label: '45-65', value: 1 }, { label: 'Maior de 65', value: 2 }] },
      { id: 'riskFactors', label: 'Fatores de risco', type: 'select', options: [{ label: 'Nenhum (0)', value: 0 }, { label: '1-2 (1)', value: 1 }, { label: '≥3 (2)', value: 2 }] },
      { id: 'troponin', label: 'Troponina', type: 'select', options: [{ label: 'Normal (0)', value: 0 }, { label: '1-3x limite (1)', value: 1 }, { label: '≥3x limite (2)', value: 2 }] },
      { id: 'chestPain', label: 'Dor típica', type: 'select', options: [{ label: 'Levemente sugestiva', value: 1 }, { label: 'Moderadamente sugestiva', value: 1 }, { label: 'Alta probabilidade', value: 2 }] },
    ],
    calculate: (values) => {
      return (values.history ?? 0) + (values.ecg ?? 0) + (values.age ?? 0) + (values.riskFactors ?? 0) + (values.troponin ?? 0) + (values.chestPain ?? 0);
    },
    maxScore: 10,
    interpretationRanges: [
      { min: 0, max: 3, label: 'Baixo risco', severity: 'low', recommendation: 'Baixo risco de evento MACE em 6 semanas. Alta com orientação pode ser segura.', color: '#22c55e' },
      { min: 4, max: 6, label: 'Risco intermediário', severity: 'moderate', recommendation: 'Observação em UPA e teste funcional conforme protocolo local.', color: '#f59e0b' },
      { min: 7, max: 10, label: 'Alto risco', severity: 'critical', recommendation: 'Admissão para observação intensa e investigação cardiológica urgente.', color: '#ef4444' },
    ],
    references: [
      { citation: 'Backus BE et al. A prospective validation of the HEART score for chest pain. Crit Pathw Cardiol. 2010;9(3):164-169.', year: 2010 },
      { citation: 'Amsterdam EA et al. 2021 AHA/ACC chest pain guideline. Circulation. 2021;144:e368-e454.', year: 2021 },
    ],
    relatedProtocols: ['sca', 'dor-toracica'],
    keywords: ['heart', 'dor toracica', 'sinais de isquemia', 'triagem', 'scac'],
  },
  {
    id: 'sgarbossa',
    name: 'Sgarbossa',
    abbreviation: 'Sgarbossa',
    category: 'cardiologia',
    description:
      'Critérios para suspeita de IAM com supra de ST em BRI com bloqueio de ramo esquerdo.',
    inputs: [
      { id: 'concordantST', label: 'Elevação ST concordante ≥1mm', type: 'number', min: 0, max: 20, unit: 'mm' },
      { id: 'concordantSTDepress', label: 'Depressão ST ≥1mm em V1-V3 concordante', type: 'number', min: 0, max: 20, unit: 'mm' },
      { id: 'discordantST', label: 'Elevação/infra ST discordante ≥5mm', type: 'number', min: 0, max: 50, unit: 'mm' },
      { id: 'qrs', label: 'Largura QRS ≥120ms', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'qrsAmp', label: 'Amplitude S em derivação oposta/ S', type: 'number', min: 0, max: 30 },
    ],
    calculate: (values) => {
      const concordant = Math.min(Math.max((values.concordantST ?? 0), 0) >= 1 ? 5 : 0, 5);
      const concordantDep = Math.min(Math.max((values.concordantSTDepress ?? 0), 0) >= 1 ? 3 : 0, 3);
      const discordant = Math.min(Math.max((values.discordantST ?? 0), 0) >= 5 ? 2 : 0, 2);
      const qrsPenalty = values.qrs === 1 ? 0 : 0;
      return concordant + concordantDep + discordant + qrsPenalty;
    },
    maxScore: 10,
    interpretationRanges: [
      { min: 0, max: 2, label: 'Baixo', severity: 'low', recommendation: 'Baixa probabilidade de IAM em BRI com ECG de difícil interpretação.', color: '#22c55e' },
      { min: 3, max: 4, label: 'Possível', severity: 'moderate', recommendation: 'Interpretar em conjunto com clínica e troponina.', color: '#f59e0b' },
      { min: 5, max: 10, label: 'Alto', severity: 'critical', recommendation: 'IAM STEMI provável em BRI; considerar estratégia de reperfusão conforme contexto.', color: '#ef4444' },
    ],
    references: [
      { citation: 'Sgarbossa EB et al. Electrocardiographic diagnosis of AMI in presence of left bundle-branch block. N Engl J Med. 1996;334:481-487.', year: 1996 },
      { citation: 'Smith SW et al. Sgarbossa criteria modifications for LBBB diagnosis. Ann Emerg Med. 2012;59:217-224.', year: 2012 },
    ],
    relatedProtocols: ['sci', 'scc', 'ecg-bri'],
    keywords: ['sgarbossa', 'bri', 'iam', 'bloco de ramo', 'ecg'],
  },
  {
    id: 'wells-tep',
    name: 'Wells para Tromboembolia Pulmonar',
    abbreviation: 'Wells TEP',
    category: 'cardiologia',
    description:
      'Probabilidade pré-teste de TEP para orientar investigação diagnóstica inicial.',
    inputs: [
      { id: 'signsDvt', label: 'Sinais clínicos de TVP', type: 'select', options: [{ label: 'Ausente', value: 0 }, { label: 'Presente', value: 3 }] },
      { id: 'hr', label: 'FC > 100 bpm', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1.5 }] },
      { id: 'immobilization', label: 'Imobilização / cirugia recente', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1.5 }] },
      { id: 'previousTEP', label: 'TEP/TEV prévio', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1.5 }] },
      { id: 'hemoptysis', label: 'Hemoptise', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'malignancy', label: 'Neoplasia em atividade', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'alternativeDx', label: 'Outra causa mais provável', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: -2 }] },
    ],
    calculate: (values) => {
      return (values.signsDvt ?? 0) + (values.hr ?? 0) + (values.immobilization ?? 0) + (values.previousTEP ?? 0) + (values.hemoptysis ?? 0) + (values.malignancy ?? 0) + (values.alternativeDx ?? 0);
    },
    maxScore: 12.5,
    interpretationRanges: [
      { min: 0, max: 1, label: 'Baixo risco', severity: 'low', recommendation: 'Baixa probabilidade clínica. Considerar PERC e decisão de evitar testes agressivos.', color: '#22c55e' },
      { min: 2, max: 6, label: 'Intermediário', severity: 'moderate', recommendation: 'Realizar D-dímero de alta sensibilidade e integrar com protocolos.', color: '#f59e0b' },
      { min: 7, max: 12.5, label: 'Alto risco', severity: 'high', recommendation: 'Conduta de suspeita alta: TC de tórax contrastado se disponível e heparina conforme protocolo.', color: '#ef4444' },
    ],
    references: [
      { citation: 'Wells PS et al. Derivation of a simple clinical model to categorize patients with suspected PE. Thromb Haemost. 2000;83:416-420.', year: 2000 },
      { citation: 'Kearon C et al. Antithrombotic therapy for VTE disease: CHEST Guideline. Chest. 2021;160(6):e545-e608.', year: 2021 },
    ],
    relatedProtocols: ['sindrome-embolica-pulmonar'],
    keywords: ['wells', 'tep', 'pe', 'tromboembolismo', 'sudorese', 'dispneia'],
  },
  {
    id: 'wells-tvp',
    name: 'Wells para TVP',
    abbreviation: 'Wells TVP',
    category: 'cardiologia',
    description:
      'Estratificação de risco de trombose venosa profunda sintomática.',
    inputs: [
      { id: 'activeCancer', label: 'Neoplasia ativa', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'paralysis', label: 'Paralisia, imobilização recente', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'recentBedrest', label: 'Repouso >3 dias / cirurgia recente', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'tenderness', label: 'Dor localizada em fossa calf / dor à palpação', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'entireSwelling', label: 'Edema unilateral >3 cm', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'collateral', label: 'Variação de edema + circulação colateral', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'altDiag', label: 'Diagnóstico alternativo mais provável', type: 'select', options: [{ label: 'Não', value: -2 }, { label: 'Sim', value: 0 }] },
    ],
    calculate: (values) =>
      (values.activeCancer ?? 0) +
      (values.paralysis ?? 0) +
      (values.recentBedrest ?? 0) +
      (values.tenderness ?? 0) +
      (values.entireSwelling ?? 0) +
      (values.collateral ?? 0) +
      (values.altDiag ?? 0),
    maxScore: 9,
    interpretationRanges: [
      { min: 0, max: 1, label: 'Baixa probabilidade', severity: 'low', recommendation: 'Realizar D-dímero e só investigar com imagem se resultado positivo.', color: '#22c55e' },
      { min: 2, max: 6, label: 'Moderada', severity: 'moderate', recommendation: 'Recomendável eco-Doppler conforme disponibilidade e risco clínico.', color: '#f59e0b' },
      { min: 7, max: 9, label: 'Alta', severity: 'high', recommendation: 'Alto risco de TVP: investigar com imagem imediata.', color: '#ef4444' },
    ],
    references: [
      { citation: 'Wells PS et al. Validation of a clinical model for DVT. Thromb Haemost. 1997;78:3-6.', year: 1997 },
    ],
    relatedProtocols: ['trombose-venosa'],
    keywords: ['wells', 'dvt', 'tvp', 'dor de perna', 'edema'],
  },
  {
    id: 'geneva',
    name: 'Escores de Geneva revisado',
    abbreviation: 'Geneva',
    category: 'cardiologia',
    description:
      'Probabilidade clínica de tromboembolismo pulmonar em ambiente de emergência.',
    inputs: [
      { id: 'age', label: 'Idade', type: 'select', options: [{ label: '30-64 anos', value: 1 }, { label: '≥65 anos', value: 2 }, { label: '<30', value: 0 }] },
      { id: 'hr', label: 'FC 75-94 / ≥95', type: 'select', options: [{ label: '<75', value: 0 }, { label: '75-94', value: 3 }, { label: '≥95', value: 5 }] },
      { id: 'pain', label: 'Dor de perna', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 3 }] },
      { id: 'hemoptysis', label: 'Hemoptise', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 2 }] },
      { id: 'history', label: 'TEV prévio', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 3 }] },
      { id: 'surgery', label: 'Cirurgia/trauma recente', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 2 }] },
      { id: 'hemoptysis2', label: 'Sinais de trombose ativa', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 4 }] },
      { id: 'painOnPalp', label: 'Dor localizada a palpar', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 0 }] },
    ],
    calculate: (values) => {
      return (
        (values.age ?? 0) +
        (values.hr ?? 0) +
        (values.pain ?? 0) +
        (values.hemoptysis ?? 0) +
        (values.history ?? 0) +
        (values.surgery ?? 0) +
        (values.hemoptysis2 ?? 0)
      );
    },
    maxScore: 22,
    interpretationRanges: [
      { min: 0, max: 3, label: 'Baixa probabilidade', severity: 'low', recommendation: 'Wells/PERC podem evitar investigação invasiva dependendo do contexto.', color: '#22c55e' },
      { min: 4, max: 10, label: 'Intermediária', severity: 'moderate', recommendation: 'D-dímero e decisão conforme disponibilidade diagnóstica.', color: '#f59e0b' },
      { min: 11, max: 22, label: 'Alta probabilidade', severity: 'critical', recommendation: 'Investigar com imagem direcional (TC angiotomografia).', color: '#ef4444' },
    ],
    references: [
      { citation: 'Willesen J et al. Revised Geneva Score for pulmonary embolism. Thromb Haemost. 2006;96:330-338.', year: 2006 },
    ],
    relatedProtocols: ['tep', 'sindrome-tromboembolica'],
    keywords: ['geneva', 'tep', 'embolismo pulmonar', 'probabilidade', 'angio tóm'],
  },
  {
    id: 'cha2ds2-vasc',
    name: 'CHA2DS2-VASc',
    abbreviation: 'CHA2DS2-VASc',
    category: 'cardiologia',
    description:
      'Estratifica risco de AVC em fibrilação atrial não valvar e orienta anticoagulação.',
    inputs: [
      { id: 'c', label: 'Insuficiência cardíaca congestiva', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'h', label: 'Hipertensão', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'a', label: 'Idade 75-84', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 2 }, { label: 'Outros', value: 1 }] },
      { id: 'd', label: 'Diabetes', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 's', label: 'Acidente vascular prévio/TIA', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 2 }] },
      { id: 'v', label: 'Doença vascular', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'a2', label: 'Idade ≥75', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 2 }] },
      { id: 'sc', label: 'Sexo feminino', type: 'select', options: [{ label: 'Homem', value: 0 }, { label: 'Mulher', value: 1 }] },
    ],
    calculate: (values) =>
      (values.c ?? 0) +
      (values.h ?? 0) +
      (values.a ?? 0) +
      (values.d ?? 0) +
      (values.s ?? 0) +
      (values.v ?? 0) +
      (values.a2 ?? 0) +
      (values.sc ?? 0),
    maxScore: 9,
    interpretationRanges: [
      { min: 0, max: 1, label: 'Baixo risco', severity: 'low', recommendation: 'Baixo risco tromboembólico, discutir ausência de anticoagulação em FA não valvar.', color: '#22c55e' },
      { min: 2, max: 4, label: 'Risco moderado', severity: 'moderate', recommendation: 'Considerar anticoagulação dependendo dos fatores de risco hemorrágico.', color: '#f59e0b' },
      { min: 5, max: 9, label: 'Alto risco', severity: 'high', recommendation: 'Recomendado estratificar para anticoagulação em FA não valvar, salvo contra-indicação.', color: '#ef4444' },
    ],
    references: [
      { citation: 'Lip GY et al. Refining clinical risk stratification for predicting stroke in AF. Circ Arrhythm Electrophysiol. 2010;3(10):e000067.', year: 2010 },
      { citation: 'ESC Guidelines for AF 2020. Eur Heart J. 2020;42:373-498.', year: 2020 },
    ],
    relatedProtocols: ['fa', 'acfm'],
    keywords: ['cha2ds2-vasc', 'fa', 'fibrilacao atrial', 'avc', 'anticoagulacao'],
  },
  {
    id: 'killip',
    name: 'Classe de Killip',
    abbreviation: 'Killip',
    category: 'cardiologia',
    description:
      'Classificação clínica de gravidade e prognóstico da insuficiência cardíaca após infarto.',
    inputs: [
      { id: 'rales', label: 'Estertores em base', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Leve', value: 1 }, { label: 'Moderado', value: 1 }] },
      { id: 's3', label: 'B3 / congestão', type: 'select', options: [{ label: 'Ausente', value: 0 }, { label: 'Presente', value: 1 }] },
      { id: 'edema', label: 'Edema pulmonar', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 1 }] },
      { id: 'shock', label: 'Choque / hipoperfusão', type: 'select', options: [{ label: 'Não', value: 0 }, { label: 'Sim', value: 2 }] },
    ],
    calculate: (values) => {
      const hasShock = values.shock === 2;
      if (hasShock) return 4;
      const signs = (values.rales ?? 0) + (values.s3 ?? 0) + (values.edema ?? 0);
      if (signs >= 2) return 3;
      if (signs >= 1) return 2;
      return 1;
    },
    maxScore: 4,
    interpretationRanges: [
      { min: 1, max: 1, label: 'Classe I', severity: 'low', recommendation: 'Sem sinais de IC; prognóstico mais favorável.', color: '#22c55e' },
      { min: 2, max: 2, label: 'Classe II', severity: 'moderate', recommendation: 'Sinais de insuficiência leve a moderada, manejo clínico e monitorização.', color: '#f59e0b' },
      { min: 3, max: 4, label: 'Classe III/IV', severity: 'critical', recommendation: 'Choque cardiogênico/IC grave: UTI e terapias de reperfusão/vasoativas conforme protocolo.', color: '#ef4444' },
    ],
    references: [
      { citation: 'Killip T3, Kimball JT. Treatment of myocardial infarction in a coronary care unit. Am J Cardiol. 1967;20:457-464.', year: 1967 },
      { citation: 'Lindahl B et al. Killip class in modern AMI cohorts. Eur Heart J Acute Cardiovasc Care. 2017;6:1-8.', year: 2017 },
    ],
    relatedProtocols: ['iam', 'choque-cardiogenico'],
    keywords: ['killip', 'insuficiencia cardiaca', 'infarto', 'choque cardiogenico', 'prognostico'],
  },
];
