/**
 * DARWIN EDUCATION TYPES
 * ======================
 *
 * Type definitions for the Darwin Education module.
 * Focused on ENAMED, ENARE, and medical residency exam preparation.
 *
 * Extends existing learning.ts types with exam-specific structures.
 */

import type { Difficulty, QuizQuestion, QuizOption } from './learning';

// =============================================================================
// IRT (ITEM RESPONSE THEORY) PARAMETERS
// =============================================================================

/**
 * Item Response Theory parameters from ENAMED microdata.
 * Used for TRI (Teoria de Resposta ao Item) scoring.
 */
export interface IRTParameters {
  /** Item identifier (NU_ITEM_PROVA) */
  itemId: string;
  /** Alternate item identifier for form 2 */
  itemIdForm2?: string;
  /** Whether item was retained in calibration (1 = kept, 0 = excluded) */
  retained: boolean;
  /** Difficulty parameter (b) on logit scale, typically -4 to +4 */
  difficulty: number;
  /** Point-biserial correlation (discrimination proxy) */
  discrimination: number;
  /** Infit mean square - model fit statistic (ideal: 0.7-1.3) */
  infit?: number;
  /** Outfit mean square - model fit statistic (ideal: 0.7-1.3) */
  outfit?: number;
  /** Guessing parameter (c) - default 0.25 for 4 options */
  guessing: number;
}

/**
 * TRI (Teoria de Resposta ao Item) score result.
 */
export interface TRIScore {
  /** Ability estimate (theta) on logit scale (-4 to +4) */
  theta: number;
  /** Standard error of theta estimate */
  standardError: number;
  /** Score on 0-100 scale (ENAMED standard) */
  score: number;
  /** Whether score >= 60 (proficient threshold) */
  isProficient: boolean;
  /** Score breakdown by area */
  areaScores: AreaScore[];
  /** Number of correct answers */
  correctCount: number;
  /** Total number of questions */
  totalQuestions: number;
  /** Information function value at theta */
  information: number;
}

export interface AreaScore {
  areaId: string;
  areaName: string;
  theta: number;
  score: number;
  correctCount: number;
  totalQuestions: number;
}

// =============================================================================
// ENAMED EXAM STRUCTURE
// =============================================================================

/**
 * ENAMED exam types and related exams.
 */
export type ExamType = 'enamed' | 'enare' | 'residencia';

/**
 * ENAMED examination configuration.
 * Based on official ENAMED format: 100 objective questions, 5 areas.
 */
export interface ENAMEDExam {
  id: string;
  title: string;
  description: string;
  type: ExamType;
  year: number;
  /** Total duration in minutes (typically 300 for ENAMED) */
  duration: number;
  /** Total number of questions (100 for ENAMED) */
  questionCount: number;
  /** Questions with IRT parameters */
  questions: ENAMEDQuestion[];
  /** Exam areas covered */
  areas: ExamArea[];
  /** Bank/institution source */
  bank: ExamBank;
  /** Whether this is an official past exam or simulated */
  isOfficial: boolean;
  /** IRT calibration metadata */
  calibration?: ExamCalibration;
  createdAt: string;
  updatedAt: string;
}

/**
 * Exam calibration metadata for TRI scoring.
 */
export interface ExamCalibration {
  /** Mean theta of reference population */
  populationMean: number;
  /** Standard deviation of reference population */
  populationSd: number;
  /** Reliability coefficient */
  reliability: number;
  /** Calibration date */
  calibratedAt: string;
  /** Sample size used for calibration */
  sampleSize: number;
}

// =============================================================================
// QUESTION TYPES
// =============================================================================

/**
 * ENAMED question with IRT parameters.
 * Extends base QuizQuestion with exam-specific metadata.
 */
export interface ENAMEDQuestion {
  id: string;
  /** Question stem/content */
  stem: string;
  /** Question stem in markdown (for rich formatting) */
  stemMarkdown?: string;
  /** Answer options (A, B, C, D for ENAMED) */
  options: ENAMEDOption[];
  /** Correct answer ID */
  correctOptionId: string;
  /** Detailed explanation of correct answer */
  explanation: string;
  /** Explanation with citations/references */
  explanationMarkdown?: string;
  /** IRT parameters for this item */
  irt: IRTParameters;
  /** Knowledge area(s) covered */
  areaIds: string[];
  /** Specific topic tags */
  tags: string[];
  /** Difficulty level (derived from IRT b parameter) */
  difficulty: Difficulty;
  /** Expert comments/insights */
  expertComments?: ExpertComment[];
  /** Related Darwin-MFC entities */
  relatedDiseases?: string[];
  relatedMedications?: string[];
  relatedProtocols?: string[];
  /** Source metadata */
  source: QuestionSource;
  /** Statistics from user attempts */
  statistics?: QuestionStatistics;
}

export interface ENAMEDOption {
  id: string;
  /** Option label (A, B, C, D, E) */
  label: string;
  /** Option text content */
  text: string;
  /** Why this option is correct/incorrect */
  feedback?: string;
}

export interface ExpertComment {
  id: string;
  authorName: string;
  authorTitle?: string;
  content: string;
  createdAt: string;
  rating?: number;
  ratingCount?: number;
}

export interface QuestionSource {
  /** Exam type this question originated from */
  examType: ExamType;
  /** Year of the original exam */
  year?: number;
  /** Institution/bank name */
  bankId: string;
  /** Original question number */
  originalNumber?: number;
  /** Whether AI-generated or authentic */
  isAIGenerated: boolean;
}

export interface QuestionStatistics {
  /** Total number of attempts */
  attemptCount: number;
  /** Percentage of correct answers */
  correctRate: number;
  /** Average time spent (seconds) */
  averageTime: number;
  /** Distribution of chosen options */
  optionDistribution: Record<string, number>;
}

// =============================================================================
// EXAM BANKS & ONTOLOGY
// =============================================================================

/**
 * Exam bank (banca de provas).
 */
export interface ExamBank {
  id: string;
  name: string;
  /** Full institution name */
  institutionName?: string;
  type: ExamType;
  /** Specialties covered (for residency exams) */
  specialties?: string[];
  /** Years available */
  availableYears: number[];
  /** Visual styling */
  icon?: string;
  color?: string;
  /** Whether currently active */
  isActive: boolean;
  description?: string;
  /** Estimated question count */
  questionCount: number;
  /** Website/reference URL */
  url?: string;
}

/**
 * Knowledge area in the ontology hierarchy.
 * Based on ENAMED matrix: 5 main areas with sub-areas.
 */
export interface ExamArea {
  id: string;
  name: string;
  /** i18n key for localized name */
  nameKey?: string;
  /** Parent area ID for hierarchy */
  parentId?: string;
  /** Hierarchy level (1-5, 1 = top level) */
  level: number;
  /** Description of knowledge covered */
  description?: string;
  /** Visual styling */
  icon?: string;
  color?: string;
  /** Weight for question distribution */
  weight: number;
  /** Estimated questions in bank */
  questionCount: number;
  /** Topic tags */
  tags: string[];
  /** Child area IDs */
  childIds?: string[];
}

/**
 * ENAMED 5 main areas (Matriz de Referência Comum).
 */
export type ENAMEDAreaCode =
  | 'saude_coletiva'          // Saúde Coletiva
  | 'clinica_medica'          // Clínica Médica
  | 'cirurgia'                // Cirurgia
  | 'pediatria'               // Pediatria
  | 'ginecologia_obstetricia'; // Ginecologia e Obstetrícia

// =============================================================================
// EXAM ATTEMPTS & PROGRESS
// =============================================================================

/**
 * User's exam attempt/session.
 */
export interface ExamAttempt {
  id: string;
  examId: string;
  userId: string;
  /** Current status */
  status: ExamAttemptStatus;
  /** Start time */
  startedAt: string;
  /** Completion time */
  completedAt?: string;
  /** Time spent in seconds */
  timeSpent: number;
  /** Remaining time in seconds (for paused exams) */
  remainingTime?: number;
  /** User's answers */
  answers: ExamAnswer[];
  /** Questions marked for review */
  markedForReview: string[];
  /** Current question index (for resuming) */
  currentQuestionIndex: number;
  /** Final TRI score (after completion) */
  score?: TRIScore;
  /** Performance analytics */
  analytics?: ExamAnalytics;
  createdAt: string;
  updatedAt: string;
}

export type ExamAttemptStatus =
  | 'not_started'
  | 'in_progress'
  | 'paused'
  | 'completed'
  | 'abandoned';

export interface ExamAnswer {
  questionId: string;
  selectedOptionId: string | null;
  isCorrect?: boolean;
  timeSpent: number;
  answeredAt: string;
  /** Flag for marked/flagged questions */
  isFlagged: boolean;
}

export interface ExamAnalytics {
  /** Time per question (seconds) */
  timePerQuestion: Record<string, number>;
  /** Performance by area */
  performanceByArea: Record<string, AreaPerformance>;
  /** Question difficulty vs correctness */
  difficultyAnalysis: DifficultyAnalysis;
  /** Comparison with other users */
  percentile?: number;
}

export interface AreaPerformance {
  areaId: string;
  correctCount: number;
  totalCount: number;
  percentage: number;
  averageTime: number;
}

export interface DifficultyAnalysis {
  easy: { correct: number; total: number };
  medium: { correct: number; total: number };
  hard: { correct: number; total: number };
}

// =============================================================================
// CUSTOM EXAM BUILDER
// =============================================================================

/**
 * Custom exam configuration for exam builder.
 */
export interface CustomExamConfig {
  id: string;
  userId: string;
  title: string;
  description?: string;
  /** Target exam type(s) */
  targetExams: ExamType[];
  /** Selected bank IDs */
  selectedBanks: string[];
  /** Selected area IDs from ontology */
  selectedAreas: string[];
  /** Difficulty distribution */
  difficulty: DifficultyDistribution;
  /** Number of questions */
  questionCount: number;
  /** Duration in minutes */
  duration: number;
  /** Whether to use AI for question generation */
  useAIGeneration: boolean;
  /** Whether exam is public (shareable) */
  isPublic: boolean;
  /** Tags for categorization */
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DifficultyDistribution {
  easy: number;   // 0-100 percentage
  medium: number;
  hard: number;
}

/**
 * Shared exam in community library.
 */
export interface SharedExam {
  id: string;
  examConfigId: string;
  sharedBy: string;
  sharedByName: string;
  sharedAt: string;
  /** Number of times accessed */
  accessCount: number;
  /** Average rating (1-5) */
  rating: number;
  ratingCount: number;
  /** User reviews */
  reviews: ExamReview[];
}

export interface ExamReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

// =============================================================================
// STUDY PATHS & RECOMMENDATIONS
// =============================================================================

/**
 * AI-generated study path for exam preparation.
 */
export interface StudyPath {
  id: string;
  userId: string;
  title: string;
  description: string;
  /** Target exam */
  targetExam: ExamType;
  /** Target specialty (for residency) */
  targetSpecialty?: string;
  /** Study deadline */
  examDate?: string;
  /** Weekly study hours available */
  weeklyHours: number;
  /** Current skill level */
  currentLevel: Difficulty;
  /** Areas needing improvement */
  weakAreas: string[];
  /** Recommended study modules */
  modules: StudyModule[];
  /** Overall progress (0-100) */
  progress: number;
  /** Predicted exam score */
  predictedScore?: number;
  /** Confidence interval for prediction */
  predictionConfidence?: [number, number];
  createdAt: string;
  updatedAt: string;
}

export interface StudyModule {
  id: string;
  title: string;
  description: string;
  type: StudyModuleType;
  /** Target area */
  areaId: string;
  /** Estimated time in minutes */
  estimatedMinutes: number;
  /** Order in path */
  order: number;
  /** Required score to complete */
  passingScore?: number;
  /** Current status */
  status: StudyModuleStatus;
  /** Content reference */
  contentRef?: string;
}

export type StudyModuleType =
  | 'content'      // Read content
  | 'video'        // Video lesson
  | 'quiz'         // Practice quiz
  | 'flashcards'   // Spaced repetition
  | 'case_study'   // Clinical case
  | 'exam_sim';    // Mini exam simulation

export type StudyModuleStatus =
  | 'locked'
  | 'available'
  | 'in_progress'
  | 'completed';

// =============================================================================
// GAMIFICATION
// =============================================================================

/**
 * Education-specific achievements/badges.
 */
export interface EducationBadge {
  id: string;
  name: string;
  nameKey: string;
  description: string;
  descriptionKey: string;
  icon: string;
  category: BadgeCategory;
  /** Requirements to earn */
  requirements: BadgeRequirement[];
  /** XP awarded */
  xpReward: number;
  /** Rarity tier */
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export type BadgeCategory =
  | 'exams'        // Exam-related achievements
  | 'study'        // Study consistency
  | 'mastery'      // Topic mastery
  | 'community'    // Social/sharing
  | 'streak';      // Daily streaks

export interface BadgeRequirement {
  type: RequirementType;
  target: number;
  current?: number;
}

export type RequirementType =
  | 'exams_completed'
  | 'questions_answered'
  | 'streak_days'
  | 'score_above'
  | 'flashcards_reviewed'
  | 'exams_shared'
  | 'hours_studied';

/**
 * User's education progress and stats.
 */
export interface EducationProgress {
  userId: string;
  /** Total XP earned */
  totalXp: number;
  /** Current level */
  level: number;
  /** XP needed for next level */
  xpToNextLevel: number;
  /** Current streak (days) */
  currentStreak: number;
  /** Longest streak ever */
  longestStreak: number;
  /** Last activity date */
  lastActivityDate: string;
  /** Earned badge IDs */
  earnedBadges: string[];
  /** Exam history */
  examHistory: string[];
  /** Study path progress */
  studyPaths: Record<string, number>;
  /** Weak areas identified */
  weakAreas: string[];
  /** Strong areas identified */
  strongAreas: string[];
  /** Predicted ENAMED score */
  predictedScore?: number;
  /** Total questions answered */
  totalQuestionsAnswered: number;
  /** Overall correct rate */
  overallCorrectRate: number;
  /** Total study time (minutes) */
  totalStudyMinutes: number;
  createdAt: string;
  updatedAt: string;
}

// =============================================================================
// LEADERBOARD
// =============================================================================

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  userAvatar?: string;
  score: number;
  /** Metric type (xp, exams, streak, etc.) */
  metric: LeaderboardMetric;
  /** Change from previous period */
  change?: number;
}

export type LeaderboardMetric =
  | 'xp_weekly'
  | 'xp_monthly'
  | 'xp_alltime'
  | 'exams_completed'
  | 'highest_score'
  | 'current_streak'
  | 'questions_answered';

// =============================================================================
// AI INTEGRATION
// =============================================================================

/**
 * AI-generated question request.
 */
export interface AIQuestionGenerationRequest {
  /** Target areas */
  areaIds: string[];
  /** Target banks (style to emulate) */
  bankIds: string[];
  /** Number of questions */
  count: number;
  /** Difficulty distribution */
  difficulty: DifficultyDistribution;
  /** Specific topics to cover */
  topics?: string[];
  /** Related Darwin-MFC entities to reference */
  relatedEntities?: {
    diseases?: string[];
    medications?: string[];
    protocols?: string[];
  };
}

/**
 * AI-generated study path request.
 */
export interface AIStudyPathRequest {
  /** Target exam */
  targetExam: ExamType;
  /** Target specialty */
  targetSpecialty?: string;
  /** Current performance data */
  currentPerformance: {
    overallScore?: number;
    areaScores: Record<string, number>;
    weakAreas: string[];
  };
  /** Available time */
  weeklyHours: number;
  /** Exam date */
  examDate?: string;
  /** Learning preferences */
  preferences?: {
    preferredModuleTypes?: StudyModuleType[];
    sessionLengthMinutes?: number;
  };
}

// =============================================================================
// FLASHCARD EXTENSIONS
// =============================================================================

/**
 * Education-specific flashcard deck.
 */
export interface EducationFlashcardDeck {
  id: string;
  title: string;
  description?: string;
  /** Related area */
  areaId?: string;
  /** Related exam type */
  examType?: ExamType;
  /** Cards in deck */
  cards: EducationFlashcard[];
  /** Whether generated from exam questions */
  generatedFromQuestions: boolean;
  /** Source question IDs if generated */
  sourceQuestionIds?: string[];
  /** Is public/shareable */
  isPublic: boolean;
  /** User who created */
  createdBy: string;
  /** Access count */
  accessCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface EducationFlashcard {
  id: string;
  front: string;
  back: string;
  /** Markdown version */
  frontMarkdown?: string;
  backMarkdown?: string;
  /** Related area */
  areaId?: string;
  /** Tags */
  tags: string[];
  /** Source question if generated */
  sourceQuestionId?: string;
}
