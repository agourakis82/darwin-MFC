/**
 * SPACED REPETITION SYSTEM (SM-2 ALGORITHM) - DARWIN-MFC
 * ======================================================
 *
 * Implementation of the SM-2 (SuperMemo 2) algorithm for spaced repetition
 * learning in the Darwin Medical Foundation Cluster platform.
 *
 * The SM-2 algorithm was developed by Piotr Wozniak and is the foundation
 * of modern spaced repetition systems. It optimizes review intervals based
 * on the difficulty of each item for the learner.
 *
 * @see https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
 *
 * References:
 * - Wozniak, P. (1990). Optimization of repetition spacing in the practice of learning.
 * - Wozniak, P., & Gorzelanczyk, E. J. (1994). Optimization of repetition spacing.
 */

import type { Doenca } from '../types/doenca';
import type { Medicamento } from '../types/medicamento';

// =============================================================================
// CORE INTERFACES
// =============================================================================

/**
 * Represents a study card in the spaced repetition system.
 * Contains all necessary data for the SM-2 algorithm calculations.
 */
export interface StudyCard {
  /** Unique identifier for the card */
  id: string;

  /** Type of content this card represents */
  type: 'disease' | 'medication' | 'calculator' | 'protocol';

  /** Front side of the card (question/prompt) */
  front: string;

  /** Back side of the card (answer/explanation) */
  back: string;

  /**
   * Ease Factor (EF) - reflects the easiness of memorizing and retaining
   * a given item in memory. Initially set to 2.5.
   * Range: 1.3 (minimum) to no maximum, but typically stays below 4.0
   */
  easeFactor: number;

  /**
   * Inter-repetition interval in days.
   * Determines how many days until the next review.
   */
  interval: number;

  /**
   * Number of times the card has been successfully reviewed
   * (quality >= 3). Resets to 0 when quality < 3.
   */
  repetitions: number;

  /** Date when the card is due for review */
  nextReviewDate: Date;

  /** Date of the last review (undefined if never reviewed) */
  lastReviewDate?: Date;

  /** Source ID linking to the original content (disease, medication, etc.) */
  sourceId?: string;

  /** Additional tags for categorization and filtering */
  tags?: string[];

  /** Creation timestamp */
  createdAt?: Date;
}

/**
 * Response quality rating (0-5) as defined in SM-2.
 *
 * 0 - Complete blackout, total failure to recall
 * 1 - Incorrect response, but correct answer remembered upon seeing it
 * 2 - Incorrect response, but correct answer seemed easy to recall
 * 3 - Correct response with serious difficulty
 * 4 - Correct response after hesitation
 * 5 - Perfect response with no hesitation
 */
export type ResponseQuality = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * User-friendly response options that map to SM-2 quality values.
 * This provides a simpler 4-button interface while maintaining SM-2 compatibility.
 */
export type UserResponse = 'again' | 'hard' | 'good' | 'easy';

/**
 * Statistics for a study session.
 */
export interface StudySession {
  /** Total number of cards reviewed in this session */
  cardsReviewed: number;

  /** Number of cards answered correctly (quality >= 3) */
  correctCount: number;

  /** Number of cards answered incorrectly (quality < 3) */
  incorrectCount: number;

  /** Average ease factor across all reviewed cards */
  averageEaseFactor: number;

  /** Total session duration in milliseconds */
  sessionDuration: number;

  /** Session start timestamp */
  startedAt?: Date;

  /** Session end timestamp */
  endedAt?: Date;
}

/**
 * Aggregated statistics across all study cards.
 */
export interface StudyStats {
  /** Total number of cards in the system */
  totalCards: number;

  /** Cards due for review today or earlier */
  dueCards: number;

  /** Cards that will be due tomorrow */
  dueTomorrow: number;

  /** Cards due in the next 7 days */
  dueThisWeek: number;

  /** Cards that have never been reviewed */
  newCards: number;

  /** Cards with at least one successful review */
  learningCards: number;

  /** Cards with consistent correct answers (repetitions >= 3) */
  matureCards: number;

  /** Average ease factor across all cards */
  averageEaseFactor: number;

  /** Average interval in days for mature cards */
  averageInterval: number;

  /** Cards mastered (long intervals, high ease factor) */
  masteredCards: number;

  /** Retention rate (percentage of correct responses) */
  retentionRate: number;

  /** Distribution of cards by type */
  cardsByType: Record<StudyCard['type'], number>;

  /** Total study time in milliseconds (from all sessions) */
  totalStudyTime: number;

  /** Current study streak in days */
  studyStreak: number;

  /** Last study date */
  lastStudyDate?: Date;
}

/**
 * Serializable format for localStorage/IndexedDB storage.
 * Dates are stored as ISO strings for JSON compatibility.
 */
export interface SerializedStudyCard {
  id: string;
  type: StudyCard['type'];
  front: string;
  back: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReviewDate: string; // ISO date string
  lastReviewDate?: string; // ISO date string
  sourceId?: string;
  tags?: string[];
  createdAt?: string; // ISO date string
}

/**
 * Storage format for the entire spaced repetition state.
 */
export interface SpacedRepetitionStorage {
  version: number;
  cards: SerializedStudyCard[];
  sessions: StudySession[];
  lastUpdated: string; // ISO date string
  studyStreak: number;
  lastStudyDate?: string; // ISO date string
}

// =============================================================================
// CONSTANTS
// =============================================================================

/** Default ease factor for new cards (as per SM-2 specification) */
export const DEFAULT_EASE_FACTOR = 2.5;

/** Minimum ease factor to prevent intervals from becoming too short */
export const MIN_EASE_FACTOR = 1.3;

/** Initial interval for the first successful review (1 day) */
export const INITIAL_INTERVAL = 1;

/** Interval for the second successful review (6 days) */
export const SECOND_INTERVAL = 6;

/** Current storage format version for migrations */
export const STORAGE_VERSION = 1;

/** Storage key for localStorage */
export const STORAGE_KEY = 'darwin-mfc-spaced-repetition';

// =============================================================================
// SM-2 ALGORITHM IMPLEMENTATION
// =============================================================================

/**
 * Maps user-friendly response options to SM-2 quality values.
 *
 * @param response - User's response (again, hard, good, easy)
 * @returns Corresponding SM-2 quality value (0-5)
 *
 * @example
 * ```typescript
 * const quality = mapUserResponseToQuality('good'); // Returns 4
 * ```
 */
export function mapUserResponseToQuality(response: UserResponse): ResponseQuality {
  switch (response) {
    case 'again':
      return 0;
    case 'hard':
      return 2;
    case 'good':
      return 4;
    case 'easy':
      return 5;
  }
}

/**
 * Calculates the new ease factor based on the response quality.
 *
 * The SM-2 formula for EF modification:
 * EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
 *
 * Where:
 * - EF = current ease factor
 * - q = quality of response (0-5)
 * - EF' = new ease factor
 *
 * The result is clamped to a minimum of 1.3 to prevent intervals
 * from becoming too short.
 *
 * @param currentEaseFactor - Current ease factor of the card
 * @param quality - Response quality (0-5)
 * @returns New ease factor (minimum 1.3)
 *
 * @example
 * ```typescript
 * const newEF = calculateNewEaseFactor(2.5, 4); // Returns ~2.5
 * const reducedEF = calculateNewEaseFactor(2.5, 2); // Returns ~2.18
 * ```
 */
export function calculateNewEaseFactor(
  currentEaseFactor: number,
  quality: ResponseQuality
): number {
  // SM-2 ease factor modification formula
  const newEF = currentEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  // Ensure EF doesn't go below the minimum threshold
  return Math.max(MIN_EASE_FACTOR, newEF);
}

/**
 * Calculates the next inter-repetition interval based on SM-2 algorithm.
 *
 * The interval calculation follows these rules:
 * - If quality < 3 (failure): Reset to beginning, interval = 1
 * - First successful review (n=1): interval = 1 day
 * - Second successful review (n=2): interval = 6 days
 * - Subsequent reviews (n>2): interval = previous_interval * ease_factor
 *
 * @param repetitions - Number of successful repetitions
 * @param previousInterval - Previous interval in days
 * @param easeFactor - Current ease factor
 * @param quality - Response quality (0-5)
 * @returns New interval in days (rounded to nearest integer)
 *
 * @example
 * ```typescript
 * // First successful review
 * const interval1 = calculateNextInterval(1, 0, 2.5, 4); // Returns 1
 *
 * // Second successful review
 * const interval2 = calculateNextInterval(2, 1, 2.5, 4); // Returns 6
 *
 * // Third successful review
 * const interval3 = calculateNextInterval(3, 6, 2.5, 4); // Returns 15
 * ```
 */
export function calculateNextInterval(
  repetitions: number,
  previousInterval: number,
  easeFactor: number,
  quality: ResponseQuality
): number {
  // If response was incorrect (quality < 3), reset the interval
  if (quality < 3) {
    return INITIAL_INTERVAL;
  }

  // Calculate interval based on repetition number
  if (repetitions === 1) {
    return INITIAL_INTERVAL;
  } else if (repetitions === 2) {
    return SECOND_INTERVAL;
  } else {
    // For n > 2: I(n) = I(n-1) * EF
    return Math.round(previousInterval * easeFactor);
  }
}

/**
 * Processes a card review and returns the updated card with new SM-2 parameters.
 *
 * This is the main function for updating a card after a review. It:
 * 1. Calculates the new ease factor based on response quality
 * 2. Updates the repetition count (increments or resets)
 * 3. Calculates the new interval
 * 4. Sets the next review date
 *
 * @param card - The card being reviewed
 * @param quality - Response quality (0-5)
 * @param reviewDate - Optional review date (defaults to now)
 * @returns Updated card with new spaced repetition parameters
 *
 * @example
 * ```typescript
 * const card = createCardFromDisease(disease);
 *
 * // User answers correctly with good confidence
 * const updatedCard = calculateNextReview(card, 4);
 *
 * console.log(updatedCard.nextReviewDate); // Tomorrow
 * console.log(updatedCard.repetitions); // 1
 * ```
 */
export function calculateNextReview(
  card: StudyCard,
  quality: ResponseQuality,
  reviewDate: Date = new Date()
): StudyCard {
  // Calculate new ease factor
  const newEaseFactor = calculateNewEaseFactor(card.easeFactor, quality);

  // Update repetitions based on quality
  // If quality < 3, reset repetitions to 0 (failure)
  // Otherwise, increment repetitions
  const newRepetitions = quality < 3 ? 0 : card.repetitions + 1;

  // Calculate new interval
  const newInterval = calculateNextInterval(
    newRepetitions,
    card.interval,
    newEaseFactor,
    quality
  );

  // Calculate next review date
  const nextReviewDate = new Date(reviewDate);
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);
  nextReviewDate.setHours(0, 0, 0, 0); // Normalize to start of day

  return {
    ...card,
    easeFactor: newEaseFactor,
    interval: newInterval,
    repetitions: newRepetitions,
    nextReviewDate,
    lastReviewDate: reviewDate,
  };
}

/**
 * Convenience function to process a review using user-friendly response options.
 *
 * @param card - The card being reviewed
 * @param response - User response (again, hard, good, easy)
 * @param reviewDate - Optional review date (defaults to now)
 * @returns Updated card with new spaced repetition parameters
 *
 * @example
 * ```typescript
 * const updatedCard = processReview(card, 'good');
 * ```
 */
export function processReview(
  card: StudyCard,
  response: UserResponse,
  reviewDate: Date = new Date()
): StudyCard {
  const quality = mapUserResponseToQuality(response);
  return calculateNextReview(card, quality, reviewDate);
}

// =============================================================================
// CARD RETRIEVAL FUNCTIONS
// =============================================================================

/**
 * Filters and returns cards that are due for review on or before the specified date.
 *
 * Cards are sorted by priority:
 * 1. Overdue cards (oldest first)
 * 2. Due today (lowest ease factor first - harder cards prioritized)
 *
 * @param cards - Array of all study cards
 * @param date - Reference date (defaults to today)
 * @returns Array of cards due for review, sorted by priority
 *
 * @example
 * ```typescript
 * const dueCards = getDueCards(allCards);
 * console.log(`You have ${dueCards.length} cards to review today`);
 * ```
 */
export function getDueCards(cards: StudyCard[], date: Date = new Date()): StudyCard[] {
  const today = new Date(date);
  today.setHours(23, 59, 59, 999); // End of day

  return cards
    .filter((card) => card.nextReviewDate <= today)
    .sort((a, b) => {
      // First sort by date (oldest first)
      const dateCompare = a.nextReviewDate.getTime() - b.nextReviewDate.getTime();
      if (dateCompare !== 0) return dateCompare;

      // Then by ease factor (harder cards first)
      return a.easeFactor - b.easeFactor;
    });
}

/**
 * Returns cards that have never been reviewed (new cards).
 *
 * @param cards - Array of all study cards
 * @returns Array of cards that have never been reviewed
 *
 * @example
 * ```typescript
 * const newCards = getNewCards(allCards);
 * console.log(`You have ${newCards.length} new cards to learn`);
 * ```
 */
export function getNewCards(cards: StudyCard[]): StudyCard[] {
  return cards.filter((card) => card.repetitions === 0 && !card.lastReviewDate);
}

/**
 * Returns cards that are currently in the learning phase (1-2 repetitions).
 *
 * @param cards - Array of all study cards
 * @returns Array of cards in the learning phase
 */
export function getLearningCards(cards: StudyCard[]): StudyCard[] {
  return cards.filter((card) => card.repetitions > 0 && card.repetitions < 3);
}

/**
 * Returns mature cards (3 or more successful repetitions).
 *
 * @param cards - Array of all study cards
 * @returns Array of mature cards
 */
export function getMatureCards(cards: StudyCard[]): StudyCard[] {
  return cards.filter((card) => card.repetitions >= 3);
}

/**
 * Returns cards considered "mastered" (high interval and ease factor).
 * A card is considered mastered when:
 * - Interval is 21 days or more
 * - Ease factor is 2.5 or higher
 *
 * @param cards - Array of all study cards
 * @returns Array of mastered cards
 */
export function getMasteredCards(cards: StudyCard[]): StudyCard[] {
  return cards.filter(
    (card) => card.interval >= 21 && card.easeFactor >= DEFAULT_EASE_FACTOR
  );
}

// =============================================================================
// STATISTICS FUNCTIONS
// =============================================================================

/**
 * Calculates comprehensive statistics for the study card collection.
 *
 * @param cards - Array of all study cards
 * @param sessions - Array of past study sessions (optional)
 * @param studyStreak - Current study streak in days (optional)
 * @param lastStudyDate - Last study date (optional)
 * @returns Comprehensive study statistics
 *
 * @example
 * ```typescript
 * const stats = getStudyStats(allCards);
 * console.log(`Due today: ${stats.dueCards}`);
 * console.log(`Retention rate: ${stats.retentionRate}%`);
 * ```
 */
export function getStudyStats(
  cards: StudyCard[],
  sessions: StudySession[] = [],
  studyStreak: number = 0,
  lastStudyDate?: Date
): StudyStats {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  // Count cards by status
  const newCards = getNewCards(cards);
  const learningCards = getLearningCards(cards);
  const matureCards = getMatureCards(cards);
  const masteredCards = getMasteredCards(cards);
  const dueCards = getDueCards(cards, today);

  // Calculate due tomorrow and this week
  const dueTomorrow = cards.filter((card) => {
    const reviewDate = new Date(card.nextReviewDate);
    reviewDate.setHours(0, 0, 0, 0);
    return reviewDate.getTime() === tomorrow.getTime();
  }).length;

  const dueThisWeek = cards.filter((card) => {
    const reviewDate = new Date(card.nextReviewDate);
    reviewDate.setHours(0, 0, 0, 0);
    return reviewDate <= nextWeek;
  }).length;

  // Calculate averages
  const reviewedCards = cards.filter((card) => card.lastReviewDate);
  const averageEaseFactor = reviewedCards.length > 0
    ? reviewedCards.reduce((sum, card) => sum + card.easeFactor, 0) / reviewedCards.length
    : DEFAULT_EASE_FACTOR;

  const averageInterval = matureCards.length > 0
    ? matureCards.reduce((sum, card) => sum + card.interval, 0) / matureCards.length
    : 0;

  // Calculate retention rate from sessions
  const totalCorrect = sessions.reduce((sum, s) => sum + s.correctCount, 0);
  const totalReviewed = sessions.reduce((sum, s) => sum + s.cardsReviewed, 0);
  const retentionRate = totalReviewed > 0
    ? Math.round((totalCorrect / totalReviewed) * 100)
    : 0;

  // Count cards by type
  const cardsByType: Record<StudyCard['type'], number> = {
    disease: 0,
    medication: 0,
    calculator: 0,
    protocol: 0,
  };

  cards.forEach((card) => {
    cardsByType[card.type]++;
  });

  // Total study time
  const totalStudyTime = sessions.reduce((sum, s) => sum + s.sessionDuration, 0);

  return {
    totalCards: cards.length,
    dueCards: dueCards.length,
    dueTomorrow,
    dueThisWeek,
    newCards: newCards.length,
    learningCards: learningCards.length,
    matureCards: matureCards.length,
    averageEaseFactor: Math.round(averageEaseFactor * 100) / 100,
    averageInterval: Math.round(averageInterval * 10) / 10,
    masteredCards: masteredCards.length,
    retentionRate,
    cardsByType,
    totalStudyTime,
    studyStreak,
    lastStudyDate,
  };
}

/**
 * Creates a new study session record.
 *
 * @param cards - Cards reviewed in this session
 * @param startTime - Session start time
 * @param endTime - Session end time (defaults to now)
 * @returns StudySession object
 */
export function createStudySession(
  cards: Array<{ card: StudyCard; quality: ResponseQuality }>,
  startTime: Date,
  endTime: Date = new Date()
): StudySession {
  const correctCount = cards.filter((c) => c.quality >= 3).length;
  const incorrectCount = cards.filter((c) => c.quality < 3).length;

  const averageEaseFactor = cards.length > 0
    ? cards.reduce((sum, c) => sum + c.card.easeFactor, 0) / cards.length
    : DEFAULT_EASE_FACTOR;

  return {
    cardsReviewed: cards.length,
    correctCount,
    incorrectCount,
    averageEaseFactor: Math.round(averageEaseFactor * 100) / 100,
    sessionDuration: endTime.getTime() - startTime.getTime(),
    startedAt: startTime,
    endedAt: endTime,
  };
}

// =============================================================================
// CARD CREATION FUNCTIONS
// =============================================================================

/**
 * Creates a new study card with default SM-2 parameters.
 *
 * @param id - Unique identifier for the card
 * @param type - Type of content
 * @param front - Front side (question)
 * @param back - Back side (answer)
 * @param sourceId - Optional source ID
 * @param tags - Optional tags
 * @returns New study card ready for review
 *
 * @example
 * ```typescript
 * const card = createStudyCard(
 *   'card-1',
 *   'disease',
 *   'What is the first-line treatment for hypertension?',
 *   'ACE inhibitors or ARBs for patients with diabetes or CKD...'
 * );
 * ```
 */
export function createStudyCard(
  id: string,
  type: StudyCard['type'],
  front: string,
  back: string,
  sourceId?: string,
  tags?: string[]
): StudyCard {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return {
    id,
    type,
    front,
    back,
    easeFactor: DEFAULT_EASE_FACTOR,
    interval: 0,
    repetitions: 0,
    nextReviewDate: now, // Due immediately for new cards
    sourceId,
    tags,
    createdAt: new Date(),
  };
}

/**
 * Creates study cards from a disease (Doenca) object.
 *
 * Generates multiple cards covering:
 * - Definition and key concepts
 * - Diagnostic criteria
 * - First-line treatment
 * - Red flags
 *
 * @param disease - Doenca object from the data layer
 * @returns Array of study cards for the disease
 *
 * @example
 * ```typescript
 * import { doencas } from '@/lib/data/doencas';
 *
 * const diabetes = doencas.find(d => d.id === 'diabetes-mellitus-tipo-2');
 * const cards = createCardFromDisease(diabetes);
 * // Returns 4 cards covering different aspects of diabetes
 * ```
 */
export function createCardFromDisease(disease: Doenca): StudyCard[] {
  const cards: StudyCard[] = [];
  const baseId = `disease-${disease.id}`;
  const baseTags = [disease.categoria, ...(disease.tags || [])];

  // Card 1: Definition
  cards.push(createStudyCard(
    `${baseId}-definition`,
    'disease',
    `O que e ${disease.titulo}?`,
    disease.quickView.definicao,
    disease.id,
    [...baseTags, 'definicao']
  ));

  // Card 2: Diagnostic criteria
  if (disease.quickView.criteriosDiagnosticos.length > 0) {
    cards.push(createStudyCard(
      `${baseId}-diagnosis`,
      'disease',
      `Quais sao os criterios diagnosticos de ${disease.titulo}?`,
      disease.quickView.criteriosDiagnosticos.map((c, i) => `${i + 1}. ${c}`).join('\n'),
      disease.id,
      [...baseTags, 'diagnostico']
    ));
  }

  // Card 3: First-line treatment
  const tratamento = disease.quickView.tratamentoPrimeiraLinha;
  if (tratamento.farmacologico.length > 0 || tratamento.naoFarmacologico.length > 0) {
    const treatmentText = [
      tratamento.naoFarmacologico.length > 0
        ? `Nao farmacologico:\n${tratamento.naoFarmacologico.map(t => `- ${t}`).join('\n')}`
        : '',
      tratamento.farmacologico.length > 0
        ? `Farmacologico:\n${tratamento.farmacologico.map(t => `- ${t}`).join('\n')}`
        : '',
    ].filter(Boolean).join('\n\n');

    cards.push(createStudyCard(
      `${baseId}-treatment`,
      'disease',
      `Qual o tratamento de primeira linha para ${disease.titulo}?`,
      treatmentText,
      disease.id,
      [...baseTags, 'tratamento']
    ));
  }

  // Card 4: Red flags
  if (disease.quickView.redFlags.length > 0) {
    cards.push(createStudyCard(
      `${baseId}-redflags`,
      'disease',
      `Quais sao os sinais de alerta (red flags) em ${disease.titulo}?`,
      disease.quickView.redFlags.map((r, i) => `${i + 1}. ${r}`).join('\n'),
      disease.id,
      [...baseTags, 'redflags', 'emergencia']
    ));
  }

  // Card 5: Initial exams (if available)
  if (disease.quickView.examesIniciais && disease.quickView.examesIniciais.length > 0) {
    cards.push(createStudyCard(
      `${baseId}-exams`,
      'disease',
      `Quais exames iniciais solicitar para ${disease.titulo}?`,
      disease.quickView.examesIniciais.map((e, i) => `${i + 1}. ${e}`).join('\n'),
      disease.id,
      [...baseTags, 'exames']
    ));
  }

  return cards;
}

/**
 * Creates study cards from a medication (Medicamento) object.
 *
 * Generates multiple cards covering:
 * - Mechanism of action
 * - Main indications
 * - Contraindications
 * - Common adverse effects
 * - Drug interactions (if severe ones exist)
 *
 * @param medication - Medicamento object from the data layer
 * @returns Array of study cards for the medication
 *
 * @example
 * ```typescript
 * import { medicamentos } from '@/lib/data/medicamentos';
 *
 * const metformin = medicamentos.find(m => m.id === 'metformina');
 * const cards = createCardFromMedication(metformin);
 * // Returns 4-5 cards covering different aspects of metformin
 * ```
 */
export function createCardFromMedication(medication: Medicamento): StudyCard[] {
  const cards: StudyCard[] = [];
  const baseId = `medication-${medication.id}`;
  const baseTags = [medication.classeTerapeutica, ...(medication.tags || [])];

  // Card 1: Mechanism of action
  cards.push(createStudyCard(
    `${baseId}-mechanism`,
    'medication',
    `Qual o mecanismo de acao de ${medication.nomeGenerico}?`,
    medication.mecanismoAcao,
    medication.id,
    [...baseTags, 'mecanismo']
  ));

  // Card 2: Main indications
  if (medication.indicacoes.length > 0) {
    cards.push(createStudyCard(
      `${baseId}-indications`,
      'medication',
      `Quais as principais indicacoes de ${medication.nomeGenerico}?`,
      medication.indicacoes.map((ind, i) => `${i + 1}. ${ind}`).join('\n'),
      medication.id,
      [...baseTags, 'indicacoes']
    ));
  }

  // Card 3: Contraindications
  if (medication.contraindicacoes.length > 0) {
    cards.push(createStudyCard(
      `${baseId}-contraindications`,
      'medication',
      `Quais as contraindicacoes de ${medication.nomeGenerico}?`,
      medication.contraindicacoes.map((c, i) => `${i + 1}. ${c}`).join('\n'),
      medication.id,
      [...baseTags, 'contraindicacoes']
    ));
  }

  // Card 4: Adverse effects
  if (medication.efeitosAdversos.comuns.length > 0) {
    let adverseText = `Comuns:\n${medication.efeitosAdversos.comuns.map(e => `- ${e}`).join('\n')}`;
    if (medication.efeitosAdversos.graves && medication.efeitosAdversos.graves.length > 0) {
      adverseText += `\n\nGraves:\n${medication.efeitosAdversos.graves.map(e => `- ${e}`).join('\n')}`;
    }

    cards.push(createStudyCard(
      `${baseId}-adverse`,
      'medication',
      `Quais os principais efeitos adversos de ${medication.nomeGenerico}?`,
      adverseText,
      medication.id,
      [...baseTags, 'efeitos-adversos']
    ));
  }

  // Card 5: Severe drug interactions (only if there are grave/contraindicada interactions)
  const severeInteractions = medication.interacoes.filter(
    (int) => int.gravidade === 'grave' || int.gravidade === 'contraindicada'
  );

  if (severeInteractions.length > 0) {
    const interactionText = severeInteractions
      .map((int) => `${int.medicamento} (${int.gravidade}): ${int.efeito}`)
      .join('\n\n');

    cards.push(createStudyCard(
      `${baseId}-interactions`,
      'medication',
      `Quais as interacoes medicamentosas graves de ${medication.nomeGenerico}?`,
      interactionText,
      medication.id,
      [...baseTags, 'interacoes']
    ));
  }

  // Card 6: Pregnancy classification
  if (medication.gestacao && medication.gestacao !== 'N') {
    const pregnancyDescriptions: Record<string, string> = {
      A: 'Categoria A - Estudos controlados nao demonstraram risco fetal',
      B: 'Categoria B - Estudos em animais nao demonstraram risco, sem estudos em humanos',
      C: 'Categoria C - Risco nao pode ser descartado, usar se beneficio justificar',
      D: 'Categoria D - Evidencia de risco fetal, pode ser necessario em situacoes graves',
      X: 'Categoria X - Contraindicado na gestacao - risco supera beneficio',
    };

    cards.push(createStudyCard(
      `${baseId}-pregnancy`,
      'medication',
      `Qual a classificacao de ${medication.nomeGenerico} na gestacao?`,
      pregnancyDescriptions[medication.gestacao] || `Categoria ${medication.gestacao}`,
      medication.id,
      [...baseTags, 'gestacao']
    ));
  }

  return cards;
}

// =============================================================================
// SERIALIZATION FUNCTIONS
// =============================================================================

/**
 * Serializes a study card for storage (converts Dates to ISO strings).
 *
 * @param card - Study card to serialize
 * @returns Serialized card with ISO date strings
 */
export function serializeCard(card: StudyCard): SerializedStudyCard {
  return {
    id: card.id,
    type: card.type,
    front: card.front,
    back: card.back,
    easeFactor: card.easeFactor,
    interval: card.interval,
    repetitions: card.repetitions,
    nextReviewDate: card.nextReviewDate.toISOString(),
    lastReviewDate: card.lastReviewDate?.toISOString(),
    sourceId: card.sourceId,
    tags: card.tags,
    createdAt: card.createdAt?.toISOString(),
  };
}

/**
 * Deserializes a stored card back to a StudyCard (converts ISO strings to Dates).
 *
 * @param serialized - Serialized card from storage
 * @returns Study card with proper Date objects
 */
export function deserializeCard(serialized: SerializedStudyCard): StudyCard {
  return {
    id: serialized.id,
    type: serialized.type,
    front: serialized.front,
    back: serialized.back,
    easeFactor: serialized.easeFactor,
    interval: serialized.interval,
    repetitions: serialized.repetitions,
    nextReviewDate: new Date(serialized.nextReviewDate),
    lastReviewDate: serialized.lastReviewDate ? new Date(serialized.lastReviewDate) : undefined,
    sourceId: serialized.sourceId,
    tags: serialized.tags,
    createdAt: serialized.createdAt ? new Date(serialized.createdAt) : undefined,
  };
}

/**
 * Saves the spaced repetition state to localStorage.
 *
 * @param cards - Array of study cards
 * @param sessions - Array of study sessions
 * @param studyStreak - Current study streak
 * @param lastStudyDate - Last study date
 *
 * @example
 * ```typescript
 * saveToStorage(cards, sessions, 5, new Date());
 * ```
 */
export function saveToStorage(
  cards: StudyCard[],
  sessions: StudySession[] = [],
  studyStreak: number = 0,
  lastStudyDate?: Date
): void {
  if (typeof window === 'undefined') return;

  const storage: SpacedRepetitionStorage = {
    version: STORAGE_VERSION,
    cards: cards.map(serializeCard),
    sessions,
    lastUpdated: new Date().toISOString(),
    studyStreak,
    lastStudyDate: lastStudyDate?.toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  } catch (error) {
    console.error('Failed to save spaced repetition data to localStorage:', error);
  }
}

/**
 * Loads the spaced repetition state from localStorage.
 *
 * @returns Storage object with cards, sessions, and metadata, or null if not found
 *
 * @example
 * ```typescript
 * const data = loadFromStorage();
 * if (data) {
 *   const cards = data.cards;
 *   const streak = data.studyStreak;
 * }
 * ```
 */
export function loadFromStorage(): {
  cards: StudyCard[];
  sessions: StudySession[];
  studyStreak: number;
  lastStudyDate?: Date;
} | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const data: SpacedRepetitionStorage = JSON.parse(stored);

    // Handle version migrations if needed in the future
    if (data.version !== STORAGE_VERSION) {
      console.warn(`Storage version mismatch: ${data.version} vs ${STORAGE_VERSION}`);
      // Future: Add migration logic here
    }

    return {
      cards: data.cards.map(deserializeCard),
      sessions: data.sessions,
      studyStreak: data.studyStreak,
      lastStudyDate: data.lastStudyDate ? new Date(data.lastStudyDate) : undefined,
    };
  } catch (error) {
    console.error('Failed to load spaced repetition data from localStorage:', error);
    return null;
  }
}

/**
 * Clears all spaced repetition data from localStorage.
 */
export function clearStorage(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear spaced repetition data from localStorage:', error);
  }
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Updates the study streak based on the last study date.
 *
 * @param currentStreak - Current streak count
 * @param lastStudyDate - Last study date
 * @param today - Current date (defaults to now)
 * @returns Updated streak count
 */
export function updateStudyStreak(
  currentStreak: number,
  lastStudyDate: Date | undefined,
  today: Date = new Date()
): number {
  if (!lastStudyDate) {
    return 1; // First study session
  }

  const todayStart = new Date(today);
  todayStart.setHours(0, 0, 0, 0);

  const lastStudyStart = new Date(lastStudyDate);
  lastStudyStart.setHours(0, 0, 0, 0);

  const daysDiff = Math.floor(
    (todayStart.getTime() - lastStudyStart.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysDiff === 0) {
    // Same day, streak unchanged
    return currentStreak;
  } else if (daysDiff === 1) {
    // Consecutive day, increment streak
    return currentStreak + 1;
  } else {
    // Streak broken, start over
    return 1;
  }
}

/**
 * Estimates the time needed to complete a review session.
 *
 * @param cardCount - Number of cards to review
 * @param avgSecondsPerCard - Average seconds per card (defaults to 30)
 * @returns Estimated time in minutes
 */
export function estimateSessionTime(
  cardCount: number,
  avgSecondsPerCard: number = 30
): number {
  return Math.ceil((cardCount * avgSecondsPerCard) / 60);
}

/**
 * Generates a forecast of upcoming reviews for the next N days.
 *
 * @param cards - Array of all study cards
 * @param days - Number of days to forecast (defaults to 7)
 * @returns Array of objects with date and card count
 */
export function getForecast(
  cards: StudyCard[],
  days: number = 7
): Array<{ date: Date; count: number }> {
  const forecast: Array<{ date: Date; count: number }> = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < days; i++) {
    const forecastDate = new Date(today);
    forecastDate.setDate(forecastDate.getDate() + i);

    const count = cards.filter((card) => {
      const reviewDate = new Date(card.nextReviewDate);
      reviewDate.setHours(0, 0, 0, 0);
      return reviewDate.getTime() === forecastDate.getTime();
    }).length;

    forecast.push({ date: forecastDate, count });
  }

  return forecast;
}

/**
 * Filters cards by type.
 *
 * @param cards - Array of all study cards
 * @param type - Card type to filter by
 * @returns Filtered array of cards
 */
export function getCardsByType(
  cards: StudyCard[],
  type: StudyCard['type']
): StudyCard[] {
  return cards.filter((card) => card.type === type);
}

/**
 * Filters cards by tag.
 *
 * @param cards - Array of all study cards
 * @param tag - Tag to filter by
 * @returns Filtered array of cards
 */
export function getCardsByTag(cards: StudyCard[], tag: string): StudyCard[] {
  return cards.filter((card) => card.tags?.includes(tag));
}

/**
 * Finds a card by its ID.
 *
 * @param cards - Array of all study cards
 * @param id - Card ID to find
 * @returns The card if found, undefined otherwise
 */
export function findCardById(cards: StudyCard[], id: string): StudyCard | undefined {
  return cards.find((card) => card.id === id);
}

/**
 * Removes a card from the collection by ID.
 *
 * @param cards - Array of all study cards
 * @param id - Card ID to remove
 * @returns New array without the specified card
 */
export function removeCard(cards: StudyCard[], id: string): StudyCard[] {
  return cards.filter((card) => card.id !== id);
}

/**
 * Updates a card in the collection.
 *
 * @param cards - Array of all study cards
 * @param updatedCard - Updated card data
 * @returns New array with the updated card
 */
export function updateCard(cards: StudyCard[], updatedCard: StudyCard): StudyCard[] {
  return cards.map((card) => (card.id === updatedCard.id ? updatedCard : card));
}

/**
 * Merges new cards into existing collection, avoiding duplicates.
 *
 * @param existingCards - Current card collection
 * @param newCards - Cards to add
 * @returns Merged array without duplicates
 */
export function mergeCards(
  existingCards: StudyCard[],
  newCards: StudyCard[]
): StudyCard[] {
  const existingIds = new Set(existingCards.map((card) => card.id));
  const uniqueNewCards = newCards.filter((card) => !existingIds.has(card.id));
  return [...existingCards, ...uniqueNewCards];
}
