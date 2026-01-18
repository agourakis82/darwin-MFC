/**
 * QUIZ GENERATOR - DARWIN-MFC
 * ===========================
 *
 * Generates quiz questions from diseases and medications data
 */

import { QuizQuestion, OpcaoQuiz, Quiz } from '../types/study-mode';
import { Doenca } from '../types/doenca';
import { Medicamento } from '../types/medicamento';

export type QuizCategory = 'diseases' | 'medications' | 'mixed';
export type QuizDifficulty = 'easy' | 'medium' | 'hard' | 'mixed';

export interface QuizConfig {
  numQuestions: 10 | 20 | 30;
  category: QuizCategory;
  difficulty: QuizDifficulty;
  timed?: boolean;
  timePerQuestion?: number; // in seconds
}

export interface GeneratedQuestion extends QuizQuestion {
  sourceType: 'disease' | 'medication';
  sourceId: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Difficulty multipliers for points
const DIFFICULTY_POINTS: Record<'easy' | 'medium' | 'hard', number> = {
  easy: 5,
  medium: 10,
  hard: 15,
};

// Time estimates per difficulty
const DIFFICULTY_TIME: Record<'easy' | 'medium' | 'hard', number> = {
  easy: 20,
  medium: 40,
  hard: 60,
};

/**
 * Generates quiz questions from disease data
 */
export function generateDiseaseQuestions(
  diseases: Partial<Doenca>[],
  difficulty: QuizDifficulty,
  count: number
): GeneratedQuestion[] {
  const questions: GeneratedQuestion[] = [];
  const validDiseases = diseases.filter(d =>
    d.id && d.titulo && d.quickView && d.categoria
  );

  if (validDiseases.length === 0) return [];

  // Question templates by difficulty
  const templates = {
    easy: [
      generateDiseaseDefinitionQuestion,
      generateDiseaseCategoryQuestion,
      generateDiseaseRedFlagQuestion,
    ],
    medium: [
      generateDiseaseCriteriaQuestion,
      generateDiseaseTreatmentQuestion,
      generateDiseaseExamQuestion,
    ],
    hard: [
      generateDiseaseCodeQuestion,
      generateDiseaseDifferentialQuestion,
      generateDiseaseComplexTreatmentQuestion,
    ],
  };

  const shuffledDiseases = shuffleArray([...validDiseases]);
  let diseaseIndex = 0;

  while (questions.length < count && diseaseIndex < shuffledDiseases.length * 3) {
    const disease = shuffledDiseases[diseaseIndex % shuffledDiseases.length];
    const selectedDifficulty = difficulty === 'mixed'
      ? (['easy', 'medium', 'hard'] as const)[Math.floor(Math.random() * 3)]
      : difficulty;

    const templateList = templates[selectedDifficulty];
    const template = templateList[Math.floor(Math.random() * templateList.length)];

    try {
      const question = template(disease as Doenca, validDiseases as Doenca[], selectedDifficulty);
      if (question && !questions.some(q => q.enunciado === question.enunciado)) {
        questions.push(question);
      }
    } catch {
      // Skip if template fails for this disease
    }

    diseaseIndex++;
  }

  return questions.slice(0, count);
}

/**
 * Generates quiz questions from medication data
 */
export function generateMedicationQuestions(
  medications: Medicamento[],
  difficulty: QuizDifficulty,
  count: number
): GeneratedQuestion[] {
  const questions: GeneratedQuestion[] = [];
  const validMeds = medications.filter(m =>
    m.id && m.nomeGenerico && m.classeTerapeutica && m.indicacoes?.length > 0
  );

  if (validMeds.length === 0) return [];

  // Question templates by difficulty
  const templates = {
    easy: [
      generateMedClassQuestion,
      generateMedIndicationQuestion,
      generateMedPregnancyQuestion,
    ],
    medium: [
      generateMedMechanismQuestion,
      generateMedContraindicationQuestion,
      generateMedAdverseEffectQuestion,
    ],
    hard: [
      generateMedInteractionQuestion,
      generateMedRenalAdjustmentQuestion,
      generateMedDosageQuestion,
    ],
  };

  const shuffledMeds = shuffleArray([...validMeds]);
  let medIndex = 0;

  while (questions.length < count && medIndex < shuffledMeds.length * 3) {
    const med = shuffledMeds[medIndex % shuffledMeds.length];
    const selectedDifficulty = difficulty === 'mixed'
      ? (['easy', 'medium', 'hard'] as const)[Math.floor(Math.random() * 3)]
      : difficulty;

    const templateList = templates[selectedDifficulty];
    const template = templateList[Math.floor(Math.random() * templateList.length)];

    try {
      const question = template(med, validMeds, selectedDifficulty);
      if (question && !questions.some(q => q.enunciado === question.enunciado)) {
        questions.push(question);
      }
    } catch {
      // Skip if template fails for this medication
    }

    medIndex++;
  }

  return questions.slice(0, count);
}

/**
 * Generates a complete quiz based on configuration
 */
export function generateQuiz(
  config: QuizConfig,
  diseases: Partial<Doenca>[],
  medications: Medicamento[]
): Quiz {
  let questions: GeneratedQuestion[] = [];

  if (config.category === 'diseases') {
    questions = generateDiseaseQuestions(diseases, config.difficulty, config.numQuestions);
  } else if (config.category === 'medications') {
    questions = generateMedicationQuestions(medications, config.difficulty, config.numQuestions);
  } else {
    // Mixed: half diseases, half medications
    const halfCount = Math.ceil(config.numQuestions / 2);
    const diseaseQuestions = generateDiseaseQuestions(diseases, config.difficulty, halfCount);
    const medQuestions = generateMedicationQuestions(medications, config.difficulty, config.numQuestions - diseaseQuestions.length);
    questions = shuffleArray([...diseaseQuestions, ...medQuestions]);
  }

  // Map difficulty string to Portuguese
  const difficultyMap: Record<QuizDifficulty, 'facil' | 'medio' | 'dificil'> = {
    easy: 'facil',
    medium: 'medio',
    hard: 'dificil',
    mixed: 'medio',
  };

  const categoryMap: Record<QuizCategory, Quiz['categoria']> = {
    diseases: 'doencas',
    medications: 'medicamentos',
    mixed: 'geral',
  };

  return {
    id: `quiz-${Date.now()}`,
    titulo: getQuizTitle(config),
    descricao: getQuizDescription(config),
    questoes: questions,
    categoria: categoryMap[config.category],
    dificuldade: difficultyMap[config.difficulty],
    tempoTotal: config.timed ? Math.ceil(questions.reduce((acc, q) => acc + (q.tempoEstimado || 30), 0) / 60) : undefined,
    pontuacaoMaxima: questions.reduce((acc, q) => acc + q.pontos, 0),
  };
}

// ============================================================================
// DISEASE QUESTION GENERATORS
// ============================================================================

function generateDiseaseDefinitionQuestion(
  disease: Doenca,
  allDiseases: Doenca[],
  difficulty: 'easy' | 'medium' | 'hard'
): GeneratedQuestion | null {
  if (!disease.quickView?.definicao) return null;

  const otherDiseases = allDiseases
    .filter(d => d.id !== disease.id && d.quickView?.definicao)
    .slice(0, 3);

  if (otherDiseases.length < 3) return null;

  const options: OpcaoQuiz[] = shuffleArray([
    { id: 'a', texto: truncateText(disease.quickView.definicao, 100), correta: true },
    ...otherDiseases.map((d, i) => ({
      id: String.fromCharCode(98 + i),
      texto: truncateText(d.quickView!.definicao, 100),
      correta: false,
    })),
  ]);

  return {
    id: `disease-def-${disease.id}-${Date.now()}`,
    tipo: 'multipla_escolha',
    enunciado: `Qual das seguintes definicoes corresponde a ${disease.titulo}?`,
    opcoes: options,
    respostaCorreta: options.find(o => o.correta)!.id,
    explicacao: disease.quickView.definicao,
    pontos: DIFFICULTY_POINTS[difficulty],
    categoria: 'doencas',
    tags: [disease.categoria, 'definicao'],
    tempoEstimado: DIFFICULTY_TIME[difficulty],
    sourceType: 'disease',
    sourceId: disease.id,
    difficulty,
  };
}

function generateDiseaseCategoryQuestion(
  disease: Doenca,
  allDiseases: Doenca[],
  difficulty: 'easy' | 'medium' | 'hard'
): GeneratedQuestion | null {
  const categories = [...new Set(allDiseases.map(d => d.categoria))].filter(Boolean);
  if (categories.length < 4) return null;

  const wrongCategories = categories
    .filter(c => c !== disease.categoria)
    .slice(0, 3);

  const options: OpcaoQuiz[] = shuffleArray([
    { id: 'a', texto: formatCategory(disease.categoria), correta: true },
    ...wrongCategories.map((c, i) => ({
      id: String.fromCharCode(98 + i),
      texto: formatCategory(c),
      correta: false,
    })),
  ]);

  return {
    id: `disease-cat-${disease.id}-${Date.now()}`,
    tipo: 'multipla_escolha',
    enunciado: `A qual categoria pertence a doenca "${disease.titulo}"?`,
    opcoes: options,
    respostaCorreta: options.find(o => o.correta)!.id,
    explicacao: `${disease.titulo} pertence a categoria ${formatCategory(disease.categoria)}.`,
    pontos: DIFFICULTY_POINTS[difficulty],
    categoria: 'doencas',
    tags: [disease.categoria, 'categoria'],
    tempoEstimado: DIFFICULTY_TIME[difficulty],
    sourceType: 'disease',
    sourceId: disease.id,
    difficulty,
  };
}

function generateDiseaseRedFlagQuestion(
  disease: Doenca,
  _allDiseases: Doenca[],
  difficulty: 'easy' | 'medium' | 'hard'
): GeneratedQuestion | null {
  const redFlags = disease.quickView?.redFlags;
  if (!redFlags || redFlags.length < 1) return null;

  const correctFlag = redFlags[0];
  const wrongOptions = [
    'Melhora gradual dos sintomas ao longo de semanas',
    'Apetite preservado e ganho de peso adequado',
    'Sono tranquilo e reparador',
  ];

  const options: OpcaoQuiz[] = shuffleArray([
    { id: 'a', texto: correctFlag, correta: true },
    ...wrongOptions.map((text, i) => ({
      id: String.fromCharCode(98 + i),
      texto: text,
      correta: false,
    })),
  ]);

  return {
    id: `disease-rf-${disease.id}-${Date.now()}`,
    tipo: 'multipla_escolha',
    enunciado: `Qual e um sinal de alerta (red flag) para ${disease.titulo}?`,
    opcoes: options,
    respostaCorreta: options.find(o => o.correta)!.id,
    explicacao: `Sinais de alerta para ${disease.titulo} incluem: ${redFlags.slice(0, 3).join(', ')}.`,
    pontos: DIFFICULTY_POINTS[difficulty],
    categoria: 'doencas',
    tags: [disease.categoria, 'red_flags'],
    tempoEstimado: DIFFICULTY_TIME[difficulty],
    sourceType: 'disease',
    sourceId: disease.id,
    difficulty,
  };
}

function generateDiseaseCriteriaQuestion(
  disease: Doenca,
  _allDiseases: Doenca[],
  difficulty: 'easy' | 'medium' | 'hard'
): GeneratedQuestion | null {
  const criteria = disease.quickView?.criteriosDiagnosticos;
  if (!criteria || criteria.length < 2) return null;

  const correctCriterion = criteria[0];
  const wrongOptions = [
    'Ausencia completa de sintomas por mais de 6 meses',
    'Resultado negativo em todos os exames complementares',
    'Melhora espontanea sem tratamento',
  ];

  const options: OpcaoQuiz[] = shuffleArray([
    { id: 'a', texto: truncateText(correctCriterion, 80), correta: true },
    ...wrongOptions.map((text, i) => ({
      id: String.fromCharCode(98 + i),
      texto: text,
      correta: false,
    })),
  ]);

  return {
    id: `disease-crit-${disease.id}-${Date.now()}`,
    tipo: 'multipla_escolha',
    enunciado: `Qual e um criterio diagnostico para ${disease.titulo}?`,
    opcoes: options,
    respostaCorreta: options.find(o => o.correta)!.id,
    explicacao: `Criterios diagnosticos para ${disease.titulo}: ${criteria.slice(0, 2).join('; ')}.`,
    pontos: DIFFICULTY_POINTS[difficulty],
    categoria: 'doencas',
    tags: [disease.categoria, 'diagnostico'],
    tempoEstimado: DIFFICULTY_TIME[difficulty],
    sourceType: 'disease',
    sourceId: disease.id,
    difficulty,
  };
}

function generateDiseaseTreatmentQuestion(
  disease: Doenca,
  _allDiseases: Doenca[],
  difficulty: 'easy' | 'medium' | 'hard'
): GeneratedQuestion | null {
  const farmaco = disease.quickView?.tratamentoPrimeiraLinha?.farmacologico;
  if (!farmaco || farmaco.length < 1) return null;

  const correctTreatment = farmaco[0];
  const wrongOptions = [
    'Apenas observacao clinica sem intervencao',
    'Uso exclusivo de medicina alternativa',
    'Cirurgia de emergencia em todos os casos',
  ];

  const options: OpcaoQuiz[] = shuffleArray([
    { id: 'a', texto: truncateText(correctTreatment, 80), correta: true },
    ...wrongOptions.map((text, i) => ({
      id: String.fromCharCode(98 + i),
      texto: text,
      correta: false,
    })),
  ]);

  return {
    id: `disease-trat-${disease.id}-${Date.now()}`,
    tipo: 'multipla_escolha',
    enunciado: `Qual e uma opcao de tratamento farmacologico de primeira linha para ${disease.titulo}?`,
    opcoes: options,
    respostaCorreta: options.find(o => o.correta)!.id,
    explicacao: `Tratamento farmacologico de primeira linha para ${disease.titulo}: ${farmaco.slice(0, 2).join('; ')}.`,
    pontos: DIFFICULTY_POINTS[difficulty],
    categoria: 'doencas',
    tags: [disease.categoria, 'tratamento'],
    tempoEstimado: DIFFICULTY_TIME[difficulty],
    sourceType: 'disease',
    sourceId: disease.id,
    difficulty,
  };
}

function generateDiseaseExamQuestion(
  disease: Doenca,
  _allDiseases: Doenca[],
  difficulty: 'easy' | 'medium' | 'hard'
): GeneratedQuestion | null {
  const exams = disease.quickView?.examesIniciais;
  if (!exams || exams.length < 1) return null;

  const correctExam = exams[0];
  const wrongOptions = [
    'Ressonancia magnetica de corpo inteiro',
    'PET-CT de rotina',
    'Biopsia de medula ossea',
  ];

  const options: OpcaoQuiz[] = shuffleArray([
    { id: 'a', texto: correctExam, correta: true },
    ...wrongOptions.map((text, i) => ({
      id: String.fromCharCode(98 + i),
      texto: text,
      correta: false,
    })),
  ]);

  return {
    id: `disease-exam-${disease.id}-${Date.now()}`,
    tipo: 'multipla_escolha',
    enunciado: `Qual exame e indicado na avaliacao inicial de ${disease.titulo}?`,
    opcoes: options,
    respostaCorreta: options.find(o => o.correta)!.id,
    explicacao: `Exames iniciais para ${disease.titulo}: ${exams.slice(0, 3).join(', ')}.`,
    pontos: DIFFICULTY_POINTS[difficulty],
    categoria: 'doencas',
    tags: [disease.categoria, 'exames'],
    tempoEstimado: DIFFICULTY_TIME[difficulty],
    sourceType: 'disease',
    sourceId: disease.id,
    difficulty,
  };
}

function generateDiseaseCodeQuestion(
  disease: Doenca,
  _allDiseases: Doenca[],
  difficulty: 'easy' | 'medium' | 'hard'
): GeneratedQuestion | null {
  if (!disease.cid10 || disease.cid10.length === 0) return null;

  const correctCode = disease.cid10[0];
  const wrongCodes = ['Z99.9', 'M99.0', 'R69', 'F99'];

  const options: OpcaoQuiz[] = shuffleArray([
    { id: 'a', texto: correctCode, correta: true },
    ...wrongCodes.slice(0, 3).map((code, i) => ({
      id: String.fromCharCode(98 + i),
      texto: code,
      correta: false,
    })),
  ]);

  return {
    id: `disease-code-${disease.id}-${Date.now()}`,
    tipo: 'multipla_escolha',
    enunciado: `Qual e o codigo CID-10 principal para ${disease.titulo}?`,
    opcoes: options,
    respostaCorreta: options.find(o => o.correta)!.id,
    explicacao: `O codigo CID-10 para ${disease.titulo} e ${correctCode}.`,
    pontos: DIFFICULTY_POINTS[difficulty],
    categoria: 'doencas',
    tags: [disease.categoria, 'codigos', 'cid10'],
    tempoEstimado: DIFFICULTY_TIME[difficulty],
    sourceType: 'disease',
    sourceId: disease.id,
    difficulty,
  };
}

function generateDiseaseDifferentialQuestion(
  disease: Doenca,
  _allDiseases: Doenca[],
  difficulty: 'easy' | 'medium' | 'hard'
): GeneratedQuestion | null {
  const differentials = disease.fullContent?.diagnostico?.diagnosticoDiferencial;
  if (!differentials || differentials.length < 1) return null;

  const correctDiff = differentials[0];
  const wrongOptions = [
    'Gravidez ectopica (em paciente masculino)',
    'Sindrome de Munchausen',
    'Intoxicacao por metais pesados',
  ];

  const options: OpcaoQuiz[] = shuffleArray([
    { id: 'a', texto: correctDiff, correta: true },
    ...wrongOptions.map((text, i) => ({
      id: String.fromCharCode(98 + i),
      texto: text,
      correta: false,
    })),
  ]);

  return {
    id: `disease-diff-${disease.id}-${Date.now()}`,
    tipo: 'multipla_escolha',
    enunciado: `Qual e um diagnostico diferencial importante de ${disease.titulo}?`,
    opcoes: options,
    respostaCorreta: options.find(o => o.correta)!.id,
    explicacao: `Diagnosticos diferenciais de ${disease.titulo}: ${differentials.slice(0, 3).join(', ')}.`,
    pontos: DIFFICULTY_POINTS[difficulty],
    categoria: 'doencas',
    tags: [disease.categoria, 'diagnostico_diferencial'],
    tempoEstimado: DIFFICULTY_TIME[difficulty],
    sourceType: 'disease',
    sourceId: disease.id,
    difficulty,
  };
}

function generateDiseaseComplexTreatmentQuestion(
  disease: Doenca,
  _allDiseases: Doenca[],
  difficulty: 'easy' | 'medium' | 'hard'
): GeneratedQuestion | null {
  const firstLine = disease.fullContent?.tratamento?.farmacologico?.primeiraLinha;
  if (!firstLine || firstLine.length === 0) return null;

  const correctClass = firstLine[0].classe;
  const wrongClasses = [
    'Quimioterapicos antineoplasicos',
    'Imunossupressores sistemicos',
    'Antivirais de amplo espectro',
  ];

  const options: OpcaoQuiz[] = shuffleArray([
    { id: 'a', texto: correctClass, correta: true },
    ...wrongClasses.map((text, i) => ({
      id: String.fromCharCode(98 + i),
      texto: text,
      correta: false,
    })),
  ]);

  return {
    id: `disease-complex-${disease.id}-${Date.now()}`,
    tipo: 'multipla_escolha',
    enunciado: `Qual classe de medicamentos e primeira linha no tratamento de ${disease.titulo}?`,
    opcoes: options,
    respostaCorreta: options.find(o => o.correta)!.id,
    explicacao: `Tratamento de primeira linha para ${disease.titulo} inclui ${correctClass}: ${firstLine[0].medicamentos?.join(', ')}.`,
    pontos: DIFFICULTY_POINTS[difficulty],
    categoria: 'doencas',
    tags: [disease.categoria, 'tratamento_avancado'],
    tempoEstimado: DIFFICULTY_TIME[difficulty],
    sourceType: 'disease',
    sourceId: disease.id,
    difficulty,
  };
}

// ============================================================================
// MEDICATION QUESTION GENERATORS
// ============================================================================

function generateMedClassQuestion(
  med: Medicamento,
  allMeds: Medicamento[],
  difficulty: 'easy' | 'medium' | 'hard'
): GeneratedQuestion | null {
  const classes = [...new Set(allMeds.map(m => m.classeTerapeutica))].filter(Boolean);
  if (classes.length < 4) return null;

  const wrongClasses = classes
    .filter(c => c !== med.classeTerapeutica)
    .slice(0, 3);

  const options: OpcaoQuiz[] = shuffleArray([
    { id: 'a', texto: formatMedClass(med.classeTerapeutica), correta: true },
    ...wrongClasses.map((c, i) => ({
      id: String.fromCharCode(98 + i),
      texto: formatMedClass(c),
      correta: false,
    })),
  ]);

  return {
    id: `med-class-${med.id}-${Date.now()}`,
    tipo: 'multipla_escolha',
    enunciado: `A qual classe terapeutica pertence ${med.nomeGenerico}?`,
    opcoes: options,
    respostaCorreta: options.find(o => o.correta)!.id,
    explicacao: `${med.nomeGenerico} pertence a classe ${formatMedClass(med.classeTerapeutica)}.`,
    pontos: DIFFICULTY_POINTS[difficulty],
    categoria: 'medicamentos',
    tags: [med.classeTerapeutica, 'classe'],
    tempoEstimado: DIFFICULTY_TIME[difficulty],
    sourceType: 'medication',
    sourceId: med.id,
    difficulty,
  };
}

function generateMedIndicationQuestion(
  med: Medicamento,
  _allMeds: Medicamento[],
  difficulty: 'easy' | 'medium' | 'hard'
): GeneratedQuestion | null {
  if (!med.indicacoes || med.indicacoes.length < 1) return null;

  const correctIndication = med.indicacoes[0];
  const wrongIndications = [
    'Tratamento de infeccoes fungicas sistemicas',
    'Prevencao de rejeicao de transplante',
    'Manejo de crise convulsiva aguda',
  ];

  const options: OpcaoQuiz[] = shuffleArray([
    { id: 'a', texto: truncateText(correctIndication, 80), correta: true },
    ...wrongIndications.map((text, i) => ({
      id: String.fromCharCode(98 + i),
      texto: text,
      correta: false,
    })),
  ]);

  return {
    id: `med-ind-${med.id}-${Date.now()}`,
    tipo: 'multipla_escolha',
    enunciado: `Qual e uma indicacao aprovada para ${med.nomeGenerico}?`,
    opcoes: options,
    respostaCorreta: options.find(o => o.correta)!.id,
    explicacao: `Indicacoes de ${med.nomeGenerico}: ${med.indicacoes.slice(0, 3).join(', ')}.`,
    pontos: DIFFICULTY_POINTS[difficulty],
    categoria: 'medicamentos',
    tags: [med.classeTerapeutica, 'indicacao'],
    tempoEstimado: DIFFICULTY_TIME[difficulty],
    sourceType: 'medication',
    sourceId: med.id,
    difficulty,
  };
}

function generateMedPregnancyQuestion(
  med: Medicamento,
  allMeds: Medicamento[],
  difficulty: 'easy' | 'medium' | 'hard'
): GeneratedQuestion | null {
  const pregnancyCategories = ['A', 'B', 'C', 'D', 'X'];
  const wrongCategories = pregnancyCategories.filter(c => c !== med.gestacao).slice(0, 3);

  const categoryDescriptions: Record<string, string> = {
    A: 'Categoria A - Estudos controlados nao demonstraram risco',
    B: 'Categoria B - Sem evidencia de risco em humanos',
    C: 'Categoria C - Risco nao pode ser descartado',
    D: 'Categoria D - Evidencia positiva de risco',
    X: 'Categoria X - Contraindicado na gestacao',
    N: 'Nao classificado',
  };

  const options: OpcaoQuiz[] = shuffleArray([
    { id: 'a', texto: categoryDescriptions[med.gestacao] || `Categoria ${med.gestacao}`, correta: true },
    ...wrongCategories.map((c, i) => ({
      id: String.fromCharCode(98 + i),
      texto: categoryDescriptions[c],
      correta: false,
    })),
  ]);

  return {
    id: `med-preg-${med.id}-${Date.now()}`,
    tipo: 'multipla_escolha',
    enunciado: `Qual e a classificacao de ${med.nomeGenerico} na gestacao?`,
    opcoes: options,
    respostaCorreta: options.find(o => o.correta)!.id,
    explicacao: `${med.nomeGenerico} e classificado como ${categoryDescriptions[med.gestacao] || `Categoria ${med.gestacao}`}.`,
    pontos: DIFFICULTY_POINTS[difficulty],
    categoria: 'medicamentos',
    tags: [med.classeTerapeutica, 'gestacao'],
    tempoEstimado: DIFFICULTY_TIME[difficulty],
    sourceType: 'medication',
    sourceId: med.id,
    difficulty,
  };
}

function generateMedMechanismQuestion(
  med: Medicamento,
  _allMeds: Medicamento[],
  difficulty: 'easy' | 'medium' | 'hard'
): GeneratedQuestion | null {
  if (!med.mecanismoAcao) return null;

  const wrongMechanisms = [
    'Bloqueio dos canais de calcio tipo L no coracao',
    'Inibicao irreversivel da enzima ciclooxigenase',
    'Antagonismo competitivo de receptores GABA-A',
  ];

  const options: OpcaoQuiz[] = shuffleArray([
    { id: 'a', texto: truncateText(med.mecanismoAcao, 80), correta: true },
    ...wrongMechanisms.map((text, i) => ({
      id: String.fromCharCode(98 + i),
      texto: text,
      correta: false,
    })),
  ]);

  return {
    id: `med-mech-${med.id}-${Date.now()}`,
    tipo: 'multipla_escolha',
    enunciado: `Qual e o mecanismo de acao de ${med.nomeGenerico}?`,
    opcoes: options,
    respostaCorreta: options.find(o => o.correta)!.id,
    explicacao: `Mecanismo de acao de ${med.nomeGenerico}: ${med.mecanismoAcao}.`,
    pontos: DIFFICULTY_POINTS[difficulty],
    categoria: 'medicamentos',
    tags: [med.classeTerapeutica, 'mecanismo'],
    tempoEstimado: DIFFICULTY_TIME[difficulty],
    sourceType: 'medication',
    sourceId: med.id,
    difficulty,
  };
}

function generateMedContraindicationQuestion(
  med: Medicamento,
  _allMeds: Medicamento[],
  difficulty: 'easy' | 'medium' | 'hard'
): GeneratedQuestion | null {
  if (!med.contraindicacoes || med.contraindicacoes.length < 1) return null;

  const correctContra = med.contraindicacoes[0];
  const wrongContras = [
    'Uso em pacientes com funcao renal normal',
    'Administracao apos refeicoes',
    'Associacao com vitaminas do complexo B',
  ];

  const options: OpcaoQuiz[] = shuffleArray([
    { id: 'a', texto: truncateText(correctContra, 80), correta: true },
    ...wrongContras.map((text, i) => ({
      id: String.fromCharCode(98 + i),
      texto: text,
      correta: false,
    })),
  ]);

  return {
    id: `med-contra-${med.id}-${Date.now()}`,
    tipo: 'multipla_escolha',
    enunciado: `Qual e uma contraindicacao de ${med.nomeGenerico}?`,
    opcoes: options,
    respostaCorreta: options.find(o => o.correta)!.id,
    explicacao: `Contraindicacoes de ${med.nomeGenerico}: ${med.contraindicacoes.slice(0, 3).join(', ')}.`,
    pontos: DIFFICULTY_POINTS[difficulty],
    categoria: 'medicamentos',
    tags: [med.classeTerapeutica, 'contraindicacao'],
    tempoEstimado: DIFFICULTY_TIME[difficulty],
    sourceType: 'medication',
    sourceId: med.id,
    difficulty,
  };
}

function generateMedAdverseEffectQuestion(
  med: Medicamento,
  _allMeds: Medicamento[],
  difficulty: 'easy' | 'medium' | 'hard'
): GeneratedQuestion | null {
  const effects = med.efeitosAdversos?.comuns;
  if (!effects || effects.length < 1) return null;

  const correctEffect = effects[0];
  const wrongEffects = [
    'Aumento de peso significativo',
    'Hipertricose generalizada',
    'Coloracao azulada da pele',
  ];

  const options: OpcaoQuiz[] = shuffleArray([
    { id: 'a', texto: correctEffect, correta: true },
    ...wrongEffects.map((text, i) => ({
      id: String.fromCharCode(98 + i),
      texto: text,
      correta: false,
    })),
  ]);

  return {
    id: `med-adverse-${med.id}-${Date.now()}`,
    tipo: 'multipla_escolha',
    enunciado: `Qual e um efeito adverso comum de ${med.nomeGenerico}?`,
    opcoes: options,
    respostaCorreta: options.find(o => o.correta)!.id,
    explicacao: `Efeitos adversos comuns de ${med.nomeGenerico}: ${effects.slice(0, 3).join(', ')}.`,
    pontos: DIFFICULTY_POINTS[difficulty],
    categoria: 'medicamentos',
    tags: [med.classeTerapeutica, 'efeitos_adversos'],
    tempoEstimado: DIFFICULTY_TIME[difficulty],
    sourceType: 'medication',
    sourceId: med.id,
    difficulty,
  };
}

function generateMedInteractionQuestion(
  med: Medicamento,
  _allMeds: Medicamento[],
  difficulty: 'easy' | 'medium' | 'hard'
): GeneratedQuestion | null {
  const interactions = med.interacoes;
  if (!interactions || interactions.length < 1) return null;

  const correctInteraction = `${interactions[0].medicamento} - ${interactions[0].efeito}`;
  const wrongInteractions = [
    'Vitamina C - Nenhuma interacao conhecida',
    'Agua - Aumenta absorcao',
    'Paracetamol - Interacao sinergica benefica',
  ];

  const options: OpcaoQuiz[] = shuffleArray([
    { id: 'a', texto: truncateText(correctInteraction, 80), correta: true },
    ...wrongInteractions.map((text, i) => ({
      id: String.fromCharCode(98 + i),
      texto: text,
      correta: false,
    })),
  ]);

  return {
    id: `med-inter-${med.id}-${Date.now()}`,
    tipo: 'multipla_escolha',
    enunciado: `Qual e uma interacao medicamentosa importante de ${med.nomeGenerico}?`,
    opcoes: options,
    respostaCorreta: options.find(o => o.correta)!.id,
    explicacao: `Interacao: ${interactions[0].medicamento} - ${interactions[0].efeito}. Conduta: ${interactions[0].conduta}.`,
    pontos: DIFFICULTY_POINTS[difficulty],
    categoria: 'medicamentos',
    tags: [med.classeTerapeutica, 'interacoes'],
    tempoEstimado: DIFFICULTY_TIME[difficulty],
    sourceType: 'medication',
    sourceId: med.id,
    difficulty,
  };
}

function generateMedRenalAdjustmentQuestion(
  med: Medicamento,
  _allMeds: Medicamento[],
  difficulty: 'easy' | 'medium' | 'hard'
): GeneratedQuestion | null {
  const adjustments = med.ajusteDoseRenal;
  if (!adjustments || adjustments.length < 1) return null;

  const adj = adjustments[0];
  const correctAnswer = `TFG ${adj.tfg}: ${adj.ajuste}`;
  const wrongAnswers = [
    'Nao requer ajuste em nenhum grau de DRC',
    'Aumentar dose em 50% na DRC',
    'Usar apenas em dialise',
  ];

  const options: OpcaoQuiz[] = shuffleArray([
    { id: 'a', texto: truncateText(correctAnswer, 80), correta: true },
    ...wrongAnswers.map((text, i) => ({
      id: String.fromCharCode(98 + i),
      texto: text,
      correta: false,
    })),
  ]);

  return {
    id: `med-renal-${med.id}-${Date.now()}`,
    tipo: 'multipla_escolha',
    enunciado: `Qual e o ajuste de dose de ${med.nomeGenerico} na insuficiencia renal?`,
    opcoes: options,
    respostaCorreta: options.find(o => o.correta)!.id,
    explicacao: `Ajuste renal de ${med.nomeGenerico}: TFG ${adj.tfg} - ${adj.ajuste}${adj.observacao ? `. ${adj.observacao}` : ''}.`,
    pontos: DIFFICULTY_POINTS[difficulty],
    categoria: 'medicamentos',
    tags: [med.classeTerapeutica, 'ajuste_renal'],
    tempoEstimado: DIFFICULTY_TIME[difficulty],
    sourceType: 'medication',
    sourceId: med.id,
    difficulty,
  };
}

function generateMedDosageQuestion(
  med: Medicamento,
  _allMeds: Medicamento[],
  difficulty: 'easy' | 'medium' | 'hard'
): GeneratedQuestion | null {
  const posology = med.posologias?.[0];
  if (!posology?.adultos) return null;

  const correctDose = `${posology.adultos.dose} - ${posology.adultos.frequencia}`;
  const wrongDoses = [
    '1mg/kg/dia em dose unica',
    '500mg a cada 2 horas',
    '10mg sublingual PRN',
  ];

  const options: OpcaoQuiz[] = shuffleArray([
    { id: 'a', texto: truncateText(correctDose, 80), correta: true },
    ...wrongDoses.map((text, i) => ({
      id: String.fromCharCode(98 + i),
      texto: text,
      correta: false,
    })),
  ]);

  return {
    id: `med-dose-${med.id}-${Date.now()}`,
    tipo: 'multipla_escolha',
    enunciado: `Qual e a posologia habitual de ${med.nomeGenerico} para adultos (${posology.indicacao})?`,
    opcoes: options,
    respostaCorreta: options.find(o => o.correta)!.id,
    explicacao: `Posologia de ${med.nomeGenerico} para ${posology.indicacao}: ${posology.adultos.dose}, ${posology.adultos.frequencia}${posology.adultos.doseMaxima ? `. Dose maxima: ${posology.adultos.doseMaxima}` : ''}.`,
    pontos: DIFFICULTY_POINTS[difficulty],
    categoria: 'medicamentos',
    tags: [med.classeTerapeutica, 'posologia'],
    tempoEstimado: DIFFICULTY_TIME[difficulty],
    sourceType: 'medication',
    sourceId: med.id,
    difficulty,
  };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

function formatCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    cardiovascular: 'Cardiovascular',
    metabolico: 'Metabolico',
    respiratorio: 'Respiratorio',
    musculoesqueletico: 'Musculoesqueletico',
    saude_mental: 'Saude Mental',
    infecciosas: 'Infecciosas',
    dermatologico: 'Dermatologico',
    gastrointestinal: 'Gastrointestinal',
    neurologico: 'Neurologico',
    endocrino: 'Endocrino',
    hematologico: 'Hematologico',
    urologico: 'Urologico',
    ginecologico: 'Ginecologico',
    pediatrico: 'Pediatrico',
    geriatrico: 'Geriatrico',
    outros: 'Outros',
  };
  return categoryMap[category] || category;
}

function formatMedClass(classeTerapeutica: string): string {
  return classeTerapeutica
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getQuizTitle(config: QuizConfig): string {
  const categoryNames: Record<QuizCategory, string> = {
    diseases: 'Doencas',
    medications: 'Medicamentos',
    mixed: 'Conhecimentos Gerais',
  };

  const difficultyNames: Record<QuizDifficulty, string> = {
    easy: 'Facil',
    medium: 'Intermediario',
    hard: 'Avancado',
    mixed: 'Misto',
  };

  return `Quiz de ${categoryNames[config.category]} - ${difficultyNames[config.difficulty]}`;
}

function getQuizDescription(config: QuizConfig): string {
  return `${config.numQuestions} questoes sobre ${config.category === 'diseases' ? 'doencas' : config.category === 'medications' ? 'medicamentos' : 'doencas e medicamentos'} da Atencao Primaria.`;
}

// ============================================================================
// QUIZ HISTORY MANAGEMENT
// ============================================================================

export interface QuizHistoryEntry {
  quizId: string;
  timestamp: number;
  config: QuizConfig;
  score: number;
  maxScore: number;
  percentage: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number; // in seconds
  categoryBreakdown: {
    category: string;
    correct: number;
    total: number;
  }[];
  incorrectQuestions: {
    questionId: string;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
  }[];
}

export function saveQuizHistory(entry: QuizHistoryEntry): void {
  if (typeof window === 'undefined') return;

  const history = getQuizHistory();
  history.unshift(entry);

  // Keep only last 50 entries
  const trimmedHistory = history.slice(0, 50);

  localStorage.setItem('darwin-quiz-history', JSON.stringify(trimmedHistory));
}

export function getQuizHistory(): QuizHistoryEntry[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem('darwin-quiz-history');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function getHighScores(category?: QuizCategory, limit: number = 10): QuizHistoryEntry[] {
  const history = getQuizHistory();

  let filtered = history;
  if (category) {
    filtered = history.filter(h => h.config.category === category);
  }

  return filtered
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, limit);
}

export function clearQuizHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('darwin-quiz-history');
}
