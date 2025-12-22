/**
 * DARWIN-MFC LEARNING TYPES
 * =========================
 *
 * Type definitions for the learning platform.
 * Structured learning paths with progress tracking.
 */

// =============================================================================
// LEARNING PATH TYPES
// =============================================================================

export interface LearningPath {
  id: string;
  titleKey: string; // i18n key
  descriptionKey: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind color class
  category: LearningCategory;
  difficulty: Difficulty;
  estimatedHours: number;
  modules: LearningModule[];
  prerequisites?: string[]; // Other learning path IDs
  certification?: CertificationConfig;
  tags: string[];
  isPublished: boolean;
  version: string;
  createdAt: string;
  updatedAt: string;
}

export type LearningCategory =
  | 'primary_care'
  | 'medications'
  | 'emergency'
  | 'mental_health'
  | 'pediatrics'
  | 'geriatrics'
  | 'maternal_health'
  | 'chronic_diseases'
  | 'clinical_skills';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

// =============================================================================
// MODULE TYPES
// =============================================================================

export interface LearningModule {
  id: string;
  titleKey: string;
  descriptionKey: string;
  type: ModuleType;
  order: number;
  estimatedMinutes: number;
  content: ModuleContent;
  prerequisites?: string[]; // Module IDs within the path
  passingScore?: number; // For quiz modules (0-100)
}

export type ModuleType =
  | 'content' // Read content from disease/protocol
  | 'video' // Video lesson
  | 'quiz' // Assessment quiz
  | 'case_study' // Interactive clinical case
  | 'flashcards' // Spaced repetition cards
  | 'interactive'; // Interactive exercise

export type ModuleContent =
  | ContentModuleContent
  | VideoModuleContent
  | QuizModuleContent
  | CaseStudyModuleContent
  | FlashcardsModuleContent
  | InteractiveModuleContent;

export interface ContentModuleContent {
  type: 'content';
  contentRef?: string; // Reference to disease/protocol/medication ID (optional for custom content)
  contentType: 'disease' | 'protocol' | 'medication' | 'custom';
  sections?: string[]; // Specific sections to show
  customContent?: string; // Custom markdown content
}

export interface VideoModuleContent {
  type: 'video';
  videoUrl: string;
  duration: number; // seconds
  transcript?: string;
  markers?: VideoMarker[];
}

export interface VideoMarker {
  time: number;
  titleKey: string;
}

export interface QuizModuleContent {
  type: 'quiz';
  questions: QuizQuestion[];
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  showFeedback: boolean;
  allowRetry: boolean;
  maxAttempts?: number;
}

export interface QuizQuestion {
  id: string;
  questionKey: string; // i18n key or markdown
  type: 'single' | 'multiple' | 'true_false' | 'matching';
  options: QuizOption[];
  explanationKey?: string;
  difficulty: Difficulty;
  points: number;
  tags?: string[];
}

export interface QuizOption {
  id: string;
  textKey: string;
  isCorrect: boolean;
  feedbackKey?: string;
}

export interface CaseStudyModuleContent {
  type: 'case_study';
  case: ClinicalCaseStudy;
}

export interface ClinicalCaseStudy {
  id: string;
  presentationKey: string; // Initial presentation
  patientInfo: {
    ageRange: string;
    sex: 'M' | 'F' | 'other';
    occupation?: string;
  };
  stages: CaseStage[];
  learningObjectives: string[];
  relatedDiseases: string[];
}

export interface CaseStage {
  id: string;
  titleKey: string;
  contentKey: string;
  decision?: CaseDecision;
  feedback?: string;
}

export interface CaseDecision {
  questionKey: string;
  options: CaseDecisionOption[];
}

export interface CaseDecisionOption {
  id: string;
  textKey: string;
  isOptimal: boolean;
  consequenceKey: string;
  nextStage?: string;
}

export interface FlashcardsModuleContent {
  type: 'flashcards';
  cards: Flashcard[];
  algorithm: 'sm2' | 'simple'; // Spaced repetition algorithm
}

export interface Flashcard {
  id: string;
  frontKey: string;
  backKey: string;
  tags?: string[];
  difficulty?: Difficulty;
}

export interface InteractiveModuleContent {
  type: 'interactive';
  exerciseType: 'drag_drop' | 'fill_blank' | 'labeling' | 'ordering';
  data: Record<string, unknown>;
}

// =============================================================================
// CERTIFICATION TYPES
// =============================================================================

export interface CertificationConfig {
  enabled: boolean;
  titleKey: string;
  descriptionKey: string;
  minimumScore: number; // 0-100
  validityMonths?: number; // null = no expiry
  accreditation?: AccreditationInfo;
}

export interface AccreditationInfo {
  organization: string;
  accreditationNumber?: string;
  cmeCredits?: number;
  disclaimer: string;
}

export interface Certificate {
  id: string;
  learningPathId: string;
  userId: string;
  userName: string;
  issuedAt: string;
  expiresAt?: string;
  score: number;
  verificationCode: string;
  pdfUrl?: string;
}

// =============================================================================
// PROGRESS TYPES
// =============================================================================

export interface UserLearningProgress {
  id: string; // `${userId}_${learningPathId}`
  userId: string;
  learningPathId: string;
  status: ProgressStatus;
  startedAt: string;
  lastAccessedAt: string;
  completedAt?: string;
  moduleProgress: ModuleProgress[];
  overallScore?: number;
  certificateId?: string;
}

export type ProgressStatus = 'not_started' | 'in_progress' | 'completed' | 'certified';

export interface ModuleProgress {
  moduleId: string;
  status: ModuleProgressStatus;
  startedAt?: string;
  completedAt?: string;
  score?: number;
  attempts: number;
  timeSpentMinutes: number;
  lastPosition?: number; // For video/content - where they left off
}

export type ModuleProgressStatus = 'locked' | 'available' | 'in_progress' | 'completed' | 'failed';

// =============================================================================
// SPACED REPETITION (SM-2 ALGORITHM)
// =============================================================================

export interface SM2CardState {
  cardId: string;
  easeFactor: number; // Default 2.5
  interval: number; // Days until next review
  repetitions: number;
  nextReviewDate: string;
  lastReviewDate?: string;
}

export type SM2Quality = 0 | 1 | 2 | 3 | 4 | 5;
// 0: Complete blackout
// 1: Incorrect, remembered upon seeing answer
// 2: Incorrect, easily remembered
// 3: Correct with serious difficulty
// 4: Correct with some hesitation
// 5: Perfect response

// =============================================================================
// ANALYTICS TYPES
// =============================================================================

export interface LearningAnalytics {
  userId: string;
  pathId: string;
  totalTimeMinutes: number;
  averageScore: number;
  completionRate: number;
  strongAreas: string[];
  weakAreas: string[];
  streakDays: number;
  lastActivityDate: string;
}

// =============================================================================
// UI HELPER TYPES
// =============================================================================

export interface LearningPathCard {
  path: LearningPath;
  progress?: UserLearningProgress;
  isLocked: boolean;
  completedModules: number;
  totalModules: number;
}

export interface ModuleNavigationItem {
  module: LearningModule;
  progress?: ModuleProgress;
  isLocked: boolean;
  isCurrent: boolean;
}
