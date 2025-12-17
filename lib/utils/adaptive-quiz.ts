/**
 * ADAPTIVE QUIZ SYSTEM
 * ====================
 * 
 * Sistema de quiz adaptativo que ajusta dificuldade dinamicamente
 * baseado no desempenho do usuário
 */

import { QuizQuestion, QuizResposta, QuizAttempt } from '../types/study-mode';

export type Difficulty = 'facil' | 'medio' | 'dificil';

export interface AdaptiveQuizState {
  currentDifficulty: Difficulty;
  correctStreak: number; // Sequência de acertos
  incorrectStreak: number; // Sequência de erros
  totalQuestions: number;
  correctAnswers: number;
  averageTime: number; // Tempo médio de resposta em segundos
  difficultyHistory: Difficulty[]; // Histórico de dificuldades usadas
}

/**
 * Calcula a dificuldade inicial baseada no nível do usuário ou quiz
 */
export function getInitialDifficulty(
  quizDifficulty: Difficulty,
  userLevel?: 'iniciante' | 'intermediario' | 'avancado'
): Difficulty {
  if (userLevel === 'iniciante') {
    return 'facil';
  }
  if (userLevel === 'avancado') {
    return 'dificil';
  }
  return quizDifficulty;
}

/**
 * Ajusta a dificuldade baseada no desempenho
 */
export function adjustDifficulty(
  currentState: AdaptiveQuizState,
  wasCorrect: boolean,
  timeSpent: number // em segundos
): Difficulty {
  let newDifficulty = currentState.currentDifficulty;
  let newCorrectStreak = wasCorrect ? currentState.correctStreak + 1 : 0;
  let newIncorrectStreak = wasCorrect ? 0 : currentState.incorrectStreak + 1;

  // Aumentar dificuldade se acertou várias seguidas e rápido
  if (wasCorrect) {
    if (newCorrectStreak >= 3 && currentState.currentDifficulty !== 'dificil') {
      if (currentState.currentDifficulty === 'facil') {
        newDifficulty = 'medio';
      } else {
        newDifficulty = 'dificil';
      }
    } else if (timeSpent < currentState.averageTime * 0.7 && newCorrectStreak >= 2) {
      // Acertou rápido e já tem 2 acertos seguidos
      if (currentState.currentDifficulty === 'facil') {
        newDifficulty = 'medio';
      } else if (currentState.currentDifficulty === 'medio') {
        newDifficulty = 'dificil';
      }
    }
  } else {
    // Diminuir dificuldade se errou várias seguidas ou muito devagar
    if (newIncorrectStreak >= 2 && currentState.currentDifficulty !== 'facil') {
      if (currentState.currentDifficulty === 'dificil') {
        newDifficulty = 'medio';
      } else {
        newDifficulty = 'facil';
      }
    } else if (timeSpent > currentState.averageTime * 2 && !wasCorrect) {
      // Errou e demorou muito (mesmo que não seja streak)
      if (currentState.currentDifficulty === 'dificil') {
        newDifficulty = 'medio';
      } else if (currentState.currentDifficulty === 'medio') {
        newDifficulty = 'facil';
      }
    }
  }

  return newDifficulty;
}

/**
 * Filtra questões baseadas na dificuldade desejada
 */
export function filterQuestionsByDifficulty(
  questions: QuizQuestion[],
  difficulty: Difficulty
): QuizQuestion[] {
  return questions.filter(q => q.pontos >= getMinPointsForDifficulty(difficulty));
}

/**
 * Retorna pontos mínimos para cada dificuldade
 */
function getMinPointsForDifficulty(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'facil':
      return 1; // Qualquer questão
    case 'medio':
      return 5; // Questões de 5+ pontos
    case 'dificil':
      return 10; // Questões de 10+ pontos
  }
}

/**
 * Seleciona próxima questão baseada no estado adaptativo
 */
export function selectNextQuestion(
  remainingQuestions: QuizQuestion[],
  state: AdaptiveQuizState
): QuizQuestion | null {
  if (remainingQuestions.length === 0) return null;

  // Filtrar por dificuldade atual
  const filtered = filterQuestionsByDifficulty(remainingQuestions, state.currentDifficulty);
  
  // Se não há questões na dificuldade atual, usar todas
  const candidates = filtered.length > 0 ? filtered : remainingQuestions;

  // Se múltiplas questões, priorizar:
  // 1. Questões não respondidas
  // 2. Questões com pontos similares à média do desempenho atual
  
  // Por enquanto, seleção aleatória entre candidatos
  // TODO: Implementar seleção mais inteligente baseada em histórico
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
}

/**
 * Atualiza o estado adaptativo após uma resposta
 */
export function updateAdaptiveState(
  currentState: AdaptiveQuizState,
  wasCorrect: boolean,
  timeSpent: number
): AdaptiveQuizState {
  const newDifficulty = adjustDifficulty(currentState, wasCorrect, timeSpent);
  const newCorrectStreak = wasCorrect ? currentState.correctStreak + 1 : 0;
  const newIncorrectStreak = wasCorrect ? 0 : currentState.incorrectStreak + 1;
  const newTotalQuestions = currentState.totalQuestions + 1;
  const newCorrectAnswers = wasCorrect ? currentState.correctAnswers + 1 : currentState.correctAnswers;
  
  // Média móvel do tempo (peso maior para tempo atual)
  const alpha = 0.3; // Fator de suavização
  const newAverageTime = currentState.averageTime === 0
    ? timeSpent
    : alpha * timeSpent + (1 - alpha) * currentState.averageTime;

  return {
    currentDifficulty: newDifficulty,
    correctStreak: newCorrectStreak,
    incorrectStreak: newIncorrectStreak,
    totalQuestions: newTotalQuestions,
    correctAnswers: newCorrectAnswers,
    averageTime: newAverageTime,
    difficultyHistory: [...currentState.difficultyHistory, newDifficulty],
  };
}

/**
 * Inicializa estado adaptativo
 */
export function initializeAdaptiveState(
  initialDifficulty: Difficulty = 'medio'
): AdaptiveQuizState {
  return {
    currentDifficulty: initialDifficulty,
    correctStreak: 0,
    incorrectStreak: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    averageTime: 0,
    difficultyHistory: [initialDifficulty],
  };
}

/**
 * Calcula score de performance (0-100)
 */
export function calculatePerformanceScore(state: AdaptiveQuizState): number {
  if (state.totalQuestions === 0) return 0;
  const accuracy = (state.correctAnswers / state.totalQuestions) * 100;
  
  // Bonus por manter dificuldade alta
  let difficultyBonus = 0;
  const recentDifficulties = state.difficultyHistory.slice(-5);
  const hardCount = recentDifficulties.filter(d => d === 'dificil').length;
  if (hardCount >= 3) {
    difficultyBonus = 10; // Bonus por lidar bem com questões difíceis
  }
  
  return Math.min(100, accuracy + difficultyBonus);
}

/**
 * Retorna feedback baseado no desempenho
 */
export function getPerformanceFeedback(state: AdaptiveQuizState): string {
  const score = calculatePerformanceScore(state);
  const accuracy = state.totalQuestions > 0 ? (state.correctAnswers / state.totalQuestions) * 100 : 0;

  if (score >= 90) {
    return 'Excelente desempenho! Continue assim!';
  } else if (score >= 75) {
    return 'Bom desempenho. Mantenha o foco!';
  } else if (score >= 60) {
    return 'Desempenho adequado. Continue praticando!';
  } else {
    return 'Considere revisar os conceitos antes de continuar.';
  }
}

