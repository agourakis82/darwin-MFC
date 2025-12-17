/**
 * SPACED REPETITION - ALGORITMO SM-2 (ANKI)
 * ==========================================
 * 
 * Implementação do algoritmo SM-2 usado pelo Anki para repetição espaçada.
 * Baseado em: SuperMemo 2 Algorithm
 * 
 * Referências:
 * - SuperMemo 2 Algorithm: https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
 * - Anki Manual: https://docs.ankiweb.net/#/studying?id=cards
 */

export interface ReviewSchedule {
  cardId: string;
  nextReview: Date;
  interval: number; // dias até próxima revisão
  easeFactor: number; // fator de facilidade (padrão: 2.5)
  repetitions: number; // número de repetições consecutivas corretas
  quality: number; // qualidade da resposta (0-5, Anki scale)
  lastReviewed?: Date;
}

export interface ReviewResult {
  schedule: ReviewSchedule;
  isNew: boolean; // se é a primeira revisão do card
}

/**
 * Escala de qualidade (Anki):
 * 0 = Incorreta / Muito difícil (esquecido completamente)
 * 1 = Muito difícil (lembrou com muito esforço)
 * 2 = Difícil (lembrou com esforço)
 * 3 = Bom (lembrou com algum esforço)
 * 4 = Fácil (lembrou facilmente)
 * 5 = Muito fácil (lembrou instantaneamente, muito fácil)
 */
export type Quality = 0 | 1 | 2 | 3 | 4 | 5;

const DEFAULT_EASE_FACTOR = 2.5;
const MIN_EASE_FACTOR = 1.3;

/**
 * Calcula o próximo intervalo baseado na qualidade da resposta
 */
export function calculateNextInterval(
  currentSchedule: ReviewSchedule | null,
  quality: Quality
): ReviewSchedule {
  const isNew = !currentSchedule || currentSchedule.repetitions === 0;
  
  if (isNew) {
    // Primeira revisão do card
    return {
      cardId: currentSchedule?.cardId || '',
      nextReview: new Date(),
      interval: 1, // Revisar no próximo dia
      easeFactor: DEFAULT_EASE_FACTOR,
      repetitions: quality >= 3 ? 1 : 0, // Se passou, conta como 1 repetição
      quality,
      lastReviewed: new Date(),
    };
  }

  // Atualizar ease factor baseado na qualidade
  let newEaseFactor = currentSchedule.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  newEaseFactor = Math.max(newEaseFactor, MIN_EASE_FACTOR);
  newEaseFactor = Math.round(newEaseFactor * 100) / 100; // Arredondar para 2 casas decimais

  let newRepetitions: number;
  let newInterval: number;

  if (quality < 3) {
    // Resposta incorreta ou difícil - reiniciar
    newRepetitions = 0;
    newInterval = 1; // Revisar no próximo dia
  } else {
    // Resposta correta (qualidade >= 3)
    newRepetitions = currentSchedule.repetitions + 1;

    if (newRepetitions === 1) {
      newInterval = 1;
    } else if (newRepetitions === 2) {
      newInterval = 6;
    } else {
      // Intervalo = intervalo anterior * ease factor
      newInterval = Math.round(currentSchedule.interval * newEaseFactor);
    }
  }

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + newInterval);

  return {
    cardId: currentSchedule.cardId,
    nextReview,
    interval: newInterval,
    easeFactor: newEaseFactor,
    repetitions: newRepetitions,
    quality,
    lastReviewed: new Date(),
  };
}

/**
 * Filtra cards que precisam ser revisados hoje
 */
export function getCardsDueToday(
  schedules: ReviewSchedule[],
  today: Date = new Date()
): ReviewSchedule[] {
  const todayStart = new Date(today);
  todayStart.setHours(0, 0, 0, 0);
  
  const todayEnd = new Date(today);
  todayEnd.setHours(23, 59, 59, 999);

  return schedules.filter(schedule => {
    const reviewDate = new Date(schedule.nextReview);
    return reviewDate >= todayStart && reviewDate <= todayEnd;
  });
}

/**
 * Filtra cards que estão atrasados (deveriam ter sido revisados antes de hoje)
 */
export function getOverdueCards(
  schedules: ReviewSchedule[],
  today: Date = new Date()
): ReviewSchedule[] {
  const todayStart = new Date(today);
  todayStart.setHours(0, 0, 0, 0);

  return schedules.filter(schedule => {
    const reviewDate = new Date(schedule.nextReview);
    return reviewDate < todayStart;
  });
}

/**
 * Filtra cards novos (nunca revisados)
 */
export function getNewCards(schedules: ReviewSchedule[]): ReviewSchedule[] {
  return schedules.filter(schedule => 
    !schedule.lastReviewed || schedule.repetitions === 0
  );
}

/**
 * Calcula estatísticas de revisão
 */
export interface ReviewStats {
  total: number;
  new: number;
  dueToday: number;
  overdue: number;
  mastered: number; // Cards com intervalo >= 30 dias (considerados dominados)
}

export function calculateReviewStats(
  schedules: ReviewSchedule[],
  today: Date = new Date()
): ReviewStats {
  const newCards = getNewCards(schedules);
  const dueToday = getCardsDueToday(schedules, today);
  const overdue = getOverdueCards(schedules, today);
  const mastered = schedules.filter(s => s.interval >= 30).length;

  return {
    total: schedules.length,
    new: newCards.length,
    dueToday: dueToday.length,
    overdue: overdue.length,
    mastered,
  };
}

/**
 * Inicializa um schedule para um card novo
 */
export function initializeSchedule(cardId: string): ReviewSchedule {
  return {
    cardId,
    nextReview: new Date(), // Revisar hoje
    interval: 0,
    easeFactor: DEFAULT_EASE_FACTOR,
    repetitions: 0,
    quality: 0,
  };
}

