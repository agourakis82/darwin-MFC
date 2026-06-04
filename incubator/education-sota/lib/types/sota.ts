/**
 * DARWIN-MFC SOTA INTEGRATION TYPES
 * =================================
 *
 * Type definitions for integrating the Medical-Education-SOTA backend
 * with the Darwin-MFC frontend. Bridges backend Prisma models with
 * existing frontend types.
 */

import {
  MedicalSpecialty as DarwinMedicalSpecialty,
  KnowledgeNode,
  AdaptiveLearningProfile,
  PerformanceRecord,
  QuestionDifficulty,
  LearningAnalytics as DarwinLearningAnalytics
} from './medical-residency';
import { LearningPath, LearningModule } from './learning';

// =============================================================================
// SOTA BACKEND ENUMS (mapped from Prisma)
// =============================================================================

export type SOTAUserType = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN' | 'INSTITUTION';

export type SOTAStudentLevel =
  | 'FIRST_YEAR'
  | 'SECOND_YEAR'
  | 'THIRD_YEAR'
  | 'FOURTH_YEAR'
  | 'FIFTH_YEAR'
  | 'SIXTH_YEAR'
  | 'INTERNSHIP'
  | 'RESIDENCY'
  | 'SPECIALIZATION';

export type SOTAMedicalSpecialty =
  | 'ANATOMIA'
  | 'FISIOLOGIA'
  | 'FARMACOLOGIA'
  | 'PATOLOGIA'
  | 'MICROBIOLOGIA'
  | 'IMUNOLOGIA'
  | 'BIOQUIMICA'
  | 'GENETICA'
  | 'CARDIOLOGIA'
  | 'PNEUMOLOGIA'
  | 'GASTROENTEROLOGIA'
  | 'NEFROLOGIA'
  | 'ENDOCRINOLOGIA'
  | 'HEMATOLOGIA'
  | 'ONCOLOGIA'
  | 'NEUROLOGIA'
  | 'PSIQUIATRIA'
  | 'PEDIATRIA'
  | 'GINECOLOGIA'
  | 'OBSTETRICIA'
  | 'DERMATOLOGIA'
  | 'OFTALMOLOGIA'
  | 'OTORRINOLARINGOLOGIA'
  | 'UROLOGIA'
  | 'ORTOPEDIA'
  | 'CIRURGIA_GERAL'
  | 'ANESTESIOLOGIA'
  | 'RADIOLOGIA'
  | 'MEDICINA_ESPORTIVA'
  | 'MEDICINA_TROPICAL'
  | 'SAUDE_PUBLICA'
  | 'MEDICINA_FAMILIAR'
  | 'EMERGENCIA'
  | 'INTENSIVISMO';

export type SOTALearningStyle =
  | 'VISUAL'
  | 'AUDITORY'
  | 'KINESTHETIC'
  | 'READING_WRITING'
  | 'MULTIMODAL';

export type SOTALearningPace = 'SLOW' | 'NORMAL' | 'FAST' | 'ACCELERATED';

export type SOTAExamType =
  | 'ENAMED'
  | 'RESIDENCIA'
  | 'PROVA_PRATICA'
  | 'AVALIACAO_UNIVERSITARIA'
  | 'ESPECIALIZACAO'
  | 'CERTIFICACAO';

// =============================================================================
// SOTA STUDENT PROFILE (mapped from backend StudentProfile)
// =============================================================================

export interface SOTAStudentProfile {
  id: string;
  userId: string;
  medicalId: string;
  currentLevel: SOTAStudentLevel;
  specialty: SOTAMedicalSpecialty;
  yearOfStudy: number;
  gpa?: number;
  university: string;
  institutionId?: string;

  // Learning profile
  learningStyle: SOTALearningStyle;
  preferredPace: SOTALearningPace;
  attentionSpan: number; // minutes
  technologyComfort: number; // 0-1

  // Goals
  targetExam: SOTAExamType;
  targetCompletionDate?: string;

  // Progress
  totalStudyTime: number; // minutes
  coursesCompleted: number;
  competenciesAchieved: number;

  // Analysis
  strengthAreas: string[];
  weaknessAreas: string[];
  lastPerformanceUpdate?: string;

  createdAt: string;
  updatedAt: string;
}

// =============================================================================
// SOTA KNOWLEDGE STATE (mapped from backend KnowledgeState)
// =============================================================================

export interface SOTAKnowledgeState {
  id: string;
  studentId: string;
  knowledgeAreaId: string;

  // Mastery levels (0.0 - 1.0)
  masteryLevel: number;
  confidence: number;
  lastAccessed?: string;
  lastAssessment?: string;
  totalTimeSpent: number; // minutes

  // Predictive analysis
  predictedMastery?: number;
  retentionRate?: number;
  difficultyFactor: number;
  easeFactor: number; // SM-2 algorithm

  // Spaced repetition
  interval: number; // days
  repetitionCount: number;
  lastReview?: string;
  nextReview?: string;

  // Neural factors
  neuralPlasticity: number;
  cognitiveLoad: number;
  fatigueLevel: number;

  createdAt: string;
  updatedAt: string;
}

// =============================================================================
// SOTA PERFORMANCE DATA
// =============================================================================

export interface SOTAPerformanceData {
  id: string;
  studentId: string;
  sessionId?: string;

  // Performance metrics
  accuracy: number; // 0-1
  wasCorrect: boolean;
  difficulty: number; // 1-5
  timeSpent: number; // seconds

  // Session data
  sessionDuration: number; // minutes
  sessionBreaks: number;
  interactionCount: number;

  // Context
  knowledgeAreaId: string;
  questionId?: string;
  assessmentId?: string;

  createdAt: string;
}

// =============================================================================
// KNOWLEDGE GAP ANALYSIS (AI diagnostic result)
// =============================================================================

export interface SOTAKnowledgeGapAnalysis {
  studentId: string;
  analysisDate: string;

  // Gaps identified
  criticalGaps: KnowledgeGap[];
  moderateGaps: KnowledgeGap[];
  strengths: KnowledgeGap[];

  // Recommendations
  recommendations: SOTARecommendation[];

  // AI confidence
  confidence: number; // 0-1
  methodology: 'AI_HYBRID_ANALYSIS' | 'STATISTICAL' | 'BAYESIAN' | 'LLM';

  // Predictions
  predictions: SOTAPredictiveInsights;

  // Reasoning
  reasoning: string;
}

export interface KnowledgeGap {
  areaId: string;
  areaName: string;
  masteryLevel: number; // 0-100
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedTimeToMastery: number; // hours
  relatedAreas: string[];
}

export interface SOTARecommendation {
  id: string;
  type: 'study_focus' | 'practice' | 'review' | 'assessment' | 'break';
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  targetAreaId?: string;
  estimatedDuration: number; // minutes
  resources?: SOTAResource[];
}

export interface SOTAResource {
  id: string;
  type: 'content' | 'video' | 'quiz' | 'case' | 'flashcards';
  title: string;
  url?: string;
  estimatedDuration: number;
}

// =============================================================================
// PREDICTIVE INSIGHTS
// =============================================================================

export interface SOTAPredictiveInsights {
  predictedImprovementRate: number; // 0-1
  timeToMasteryMonths: number;
  successProbability: number; // 0-1

  // Detailed predictions
  examSuccessRate?: number;
  retentionForecast?: RetentionForecast[];

  // Risk factors
  riskFactors: SOTARiskFactor[];

  // Recommendations
  accelerationStrategies: string[];
}

export interface RetentionForecast {
  areaId: string;
  currentRetention: number;
  projectedRetention: number;
  daysUntilReviewNeeded: number;
}

export interface SOTARiskFactor {
  factor: string;
  probability: number;
  impact: 'low' | 'medium' | 'high';
  mitigation: string;
}

// =============================================================================
// AI INSIGHTS
// =============================================================================

export interface SOTAAIInsights {
  id: string;
  sessionId: string;
  type: SOTAInsightType;
  confidence: number;

  // Insight data
  data: Record<string, unknown>;
  recommendation?: string;
  reasoning?: string;

  // Model info
  modelUsed?: string; // GPT-4, Claude-4, etc.
  processingTime?: number; // ms
  tokenCount?: number;

  // Actions
  actionTaken?: string;
  impactScore?: number;

  createdAt: string;
}

export type SOTAInsightType =
  | 'PERFORMANCE_ANALYSIS'
  | 'LEARNING_RECOMMENDATION'
  | 'DIFFICULTY_ADJUSTMENT'
  | 'CONTENT_SUGGESTION'
  | 'STUDY_SCHEDULE'
  | 'MOTIVATION_FEEDBACK'
  | 'ENGAGEMENT_INSIGHT'
  | 'PREDICTION';

// =============================================================================
// LEARNING SESSION
// =============================================================================

export interface SOTALearningSession {
  id: string;
  studentId: string;
  contentId?: string;
  sessionType: SOTASessionType;
  status: SOTASessionStatus;

  // Timing
  startedAt: string;
  endedAt?: string;
  duration?: number; // minutes

  // Performance
  accuracy?: number;
  engagementScore?: number;
  completionRate?: number;

  // Real-time metrics
  attentionSpan?: number;
  breakFrequency?: number;
  interactionCount: number;

  // Feedback
  feedback?: string;
  rating?: number;
  difficultyRating?: number;

  // AI insights generated during session
  insights: SOTAAIInsights[];
}

export type SOTASessionType =
  | 'STUDY_SESSION'
  | 'ASSESSMENT_SESSION'
  | 'REVIEW_SESSION'
  | 'COLLABORATION_SESSION'
  | 'AI_TUTORING_SESSION'
  | 'VR_PRACTICE'
  | 'CASE_DISCUSSION';

export type SOTASessionStatus = 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'ABANDONED' | 'EXPIRED';

// =============================================================================
// ADAPTIVE LEARNING PATH (AI-generated)
// =============================================================================

export interface SOTAAdaptiveLearningPath {
  id: string;
  studentId: string;

  // Path info
  title: string;
  description: string;
  specialty: SOTAMedicalSpecialty;

  // Structure
  modules: SOTAAdaptiveModule[];
  totalEstimatedHours: number;

  // Adaptive parameters
  adaptiveFactors: AdaptiveFactors;

  // Progress
  currentModuleIndex: number;
  completionPercentage: number;
  lastUpdated: string;

  // Predictions
  predictedCompletionDate: string;
  successProbability: number;

  generatedAt: string;
  generatedBy: 'AI_DIAGNOSTIC' | 'USER_PREFERENCE' | 'HYBRID';
}

export interface SOTAAdaptiveModule {
  id: string;
  order: number;
  title: string;
  description: string;
  type: 'content' | 'quiz' | 'case' | 'review' | 'practice';

  // Adaptive properties
  difficulty: number; // 1-5
  estimatedMinutes: number;
  priority: 'critical' | 'high' | 'medium' | 'low';

  // Content reference
  contentId?: string;
  knowledgeAreaId: string;

  // Completion
  isCompleted: boolean;
  completedAt?: string;
  score?: number;

  // AI adjustments
  difficultyAdjusted: boolean;
  originalDifficulty?: number;
}

export interface AdaptiveFactors {
  learningVelocity: number; // 0-2 (1 = normal)
  retentionRate: number; // 0-1
  preferredDifficulty: number; // 1-5
  sessionOptimalLength: number; // minutes
  breakOptimalFrequency: number; // minutes
  bestTimeOfDay: string[];
}

// =============================================================================
// REAL-TIME WEBSOCKET EVENTS
// =============================================================================

export interface SOTAWebSocketEvent {
  type: SOTAWebSocketEventType;
  timestamp: string;
  data: unknown;
}

export type SOTAWebSocketEventType =
  | 'session_start'
  | 'session_end'
  | 'learning_progress'
  | 'adaptive_feedback'
  | 'difficulty_adjustment'
  | 'engagement_alert'
  | 'break_suggestion'
  | 'achievement_unlocked'
  | 'sync_complete';

export interface SOTAAdaptiveFeedback {
  type: 'difficulty_adjustment' | 'content_suggestion' | 'pace_adjustment' | 'break_suggestion';
  message: string;
  newDifficulty?: number;
  suggestedContent?: string;
  suggestedBreakDuration?: number;
  confidence: number;
}

export interface SOTAProgressUpdate {
  sessionId: string;
  moduleId?: string;
  progress: number; // 0-100
  accuracy?: number;
  timeSpent: number; // seconds
  estimatedRemaining: number; // seconds
}

// =============================================================================
// API REQUEST/RESPONSE TYPES
// =============================================================================

export interface SOTADiagnosticRequest {
  studentProfile: SOTAStudentProfile;
  performanceData: SOTAPerformanceData[];
  knowledgeStates: SOTAKnowledgeState[];
}

export interface SOTADiagnosticResponse {
  success: boolean;
  data: SOTAKnowledgeGapAnalysis;
  metadata: {
    processingTime: number;
    modelsUsed: string[];
    confidence: number;
  };
}

export interface SOTALearningPathRequest {
  studentId: string;
  knowledgeGaps: SOTAKnowledgeGapAnalysis;
  constraints: LearningConstraints;
}

export interface LearningConstraints {
  targetCompletionDate?: string;
  dailyStudyTime: number; // minutes
  preferredDifficulty?: number;
  focusAreas?: string[];
  excludeAreas?: string[];
}

export interface SOTALearningPathResponse {
  success: boolean;
  data: SOTAAdaptiveLearningPath;
  metadata: {
    generationTime: number;
    alternatives?: number;
  };
}

export interface SOTASessionRequest {
  studentId: string;
  sessionType: SOTASessionType;
  moduleId?: string;
  contentId?: string;
}

export interface SOTASessionResponse {
  success: boolean;
  data: SOTALearningSession;
  websocketToken?: string;
}

// =============================================================================
// AUTH TYPES
// =============================================================================

export interface SOTAAuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // seconds
  tokenType: 'Bearer';
}

export interface SOTAAuthContext {
  isAuthenticated: boolean;
  token: SOTAAuthToken | null;
  studentProfile: SOTAStudentProfile | null;
  lastSync: string | null;
}

// =============================================================================
// TYPE MAPPING UTILITIES
// =============================================================================

/**
 * Maps SOTA specialty to Darwin-MFC specialty
 */
export const specialtyMapping: Record<SOTAMedicalSpecialty, DarwinMedicalSpecialty | null> = {
  ANATOMIA: null,
  FISIOLOGIA: null,
  FARMACOLOGIA: null,
  PATOLOGIA: 'patologia',
  MICROBIOLOGIA: null,
  IMUNOLOGIA: null,
  BIOQUIMICA: null,
  GENETICA: null,
  CARDIOLOGIA: 'cardiologia',
  PNEUMOLOGIA: null,
  GASTROENTEROLOGIA: null,
  NEFROLOGIA: null,
  ENDOCRINOLOGIA: null,
  HEMATOLOGIA: null,
  ONCOLOGIA: 'oncologia',
  NEUROLOGIA: 'neurologia',
  PSIQUIATRIA: 'psiquiatria',
  PEDIATRIA: 'pediatria',
  GINECOLOGIA: 'ginecologia_obstetricia',
  OBSTETRICIA: 'ginecologia_obstetricia',
  DERMATOLOGIA: 'dermatologia',
  OFTALMOLOGIA: 'oftalmologia',
  OTORRINOLARINGOLOGIA: 'otorrinolaringologia',
  UROLOGIA: 'urologia',
  ORTOPEDIA: 'ortopedia_traumatologia',
  CIRURGIA_GERAL: 'cirurgia_geral',
  ANESTESIOLOGIA: 'anestesiologia',
  RADIOLOGIA: 'radiologia_diagnostica',
  MEDICINA_ESPORTIVA: null,
  MEDICINA_TROPICAL: null,
  SAUDE_PUBLICA: 'medicina_preventiva',
  MEDICINA_FAMILIAR: null,
  EMERGENCIA: 'medicina_emergencia',
  INTENSIVISMO: null,
};

/**
 * Maps SOTA learning style to Darwin-MFC learning style
 */
export const learningStyleMapping: Record<SOTALearningStyle, 'visual' | 'auditory' | 'kinesthetic' | 'reading' | 'mixed'> = {
  VISUAL: 'visual',
  AUDITORY: 'auditory',
  KINESTHETIC: 'kinesthetic',
  READING_WRITING: 'reading',
  MULTIMODAL: 'mixed',
};

/**
 * Maps SOTA difficulty to Darwin-MFC difficulty
 */
export function mapSOTADifficulty(difficulty: number): QuestionDifficulty {
  if (difficulty <= 1.5) return 'easy';
  if (difficulty <= 2.5) return 'medium';
  if (difficulty <= 3.5) return 'hard';
  return 'very_hard';
}

/**
 * Maps Darwin-MFC difficulty to SOTA difficulty
 */
export function mapDarwinDifficulty(difficulty: QuestionDifficulty): number {
  switch (difficulty) {
    case 'easy': return 1;
    case 'medium': return 2;
    case 'hard': return 3;
    case 'very_hard': return 4;
  }
}

// =============================================================================
// CONNECTION STATUS
// =============================================================================

export interface SOTAConnectionStatus {
  isConnected: boolean;
  isWebSocketConnected: boolean;
  lastApiCall: string | null;
  lastWebSocketMessage: string | null;
  error: string | null;
  latency: number | null;
}

// =============================================================================
// STORE EXTENSION TYPES
// =============================================================================

export interface SOTAIntegrationState {
  // Connection
  connectionStatus: SOTAConnectionStatus;
  authContext: SOTAAuthContext;

  // Student data
  studentProfile: SOTAStudentProfile | null;
  knowledgeStates: SOTAKnowledgeState[];

  // Diagnostic
  knowledgeGapAnalysis: SOTAKnowledgeGapAnalysis | null;
  lastDiagnosticDate: string | null;

  // Learning path
  adaptiveLearningPath: SOTAAdaptiveLearningPath | null;
  currentSession: SOTALearningSession | null;

  // Real-time
  realtimeFeedback: SOTAAdaptiveFeedback[];
  pendingSync: boolean;

  // UI state
  isLoading: boolean;
  error: string | null;
}

export interface SOTAIntegrationActions {
  // Auth
  authenticate: (darwinToken: string) => Promise<boolean>;
  logout: () => void;

  // Student
  initializeStudent: () => Promise<void>;
  syncStudentProfile: () => Promise<void>;

  // Diagnostic
  runDiagnosis: () => Promise<SOTAKnowledgeGapAnalysis>;
  refreshDiagnosis: () => Promise<void>;

  // Learning
  generateAdaptivePath: (constraints: LearningConstraints) => Promise<SOTAAdaptiveLearningPath>;
  startSession: (request: SOTASessionRequest) => Promise<SOTALearningSession>;
  endSession: (sessionId: string) => Promise<void>;
  recordProgress: (progress: SOTAProgressUpdate) => void;

  // Real-time
  connectWebSocket: () => void;
  disconnectWebSocket: () => void;

  // Sync
  syncAll: () => Promise<void>;
  clearError: () => void;
}
