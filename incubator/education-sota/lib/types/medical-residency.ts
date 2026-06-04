/**
 * DARWIN-MFC MEDICAL RESIDENCY TYPES
 * =================================
 *
 * Type definitions for Brazilian medical residency training platform.
 * Comprehensive system with adaptive learning, AI prediction, and social features.
 */

import { Citation } from './references';

// =============================================================================
// MEDICAL SPECIALTIES AND RESIDENCY PROGRAMS
// =============================================================================

export type MedicalSpecialty =
  | 'medicina_interna'
  | 'cirurgia_geral'
  | 'pediatria'
  | 'ginecologia_obstetricia'
  | 'medicina_emergencia'
  | 'psiquiatria'
  | 'neurologia'
  | 'cardiologia'
  | 'oncologia'
  | 'infectologia'
  | 'dermatologia'
  | 'oftalmologia'
  | 'otorrinolaringologia'
  | 'urologia'
  | 'ortopedia_traumatologia'
  | 'anestesiologia'
  | 'radiologia_diagnostica'
  | 'patologia'
  | 'medicina_preventiva'
  | 'medicina_reabilitacao';

export interface MedicalSpecialtyInfo {
  id: MedicalSpecialty;
  name: string;
  description: string;
  duration: number; // months
  prerequisites: string[];
  competitiveLevel: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
  averageSalary: number;
  jobMarket: 'poor' | 'fair' | 'good' | 'excellent';
  subspecialties: string[];
  examFormat: ResidencyExamFormat;
  studyHours: number; // recommended weekly hours
}

// =============================================================================
// RESIDENCY EXAM STRUCTURE
// =============================================================================

export interface ResidencyExamFormat {
  totalQuestions: number;
  timeLimit: number; // minutes
  sections: ExamSection[];
  passingScore: number;
  negativeMarking: boolean;
  negativeMarkingValue?: number; // points deducted per wrong answer
}

export interface ExamSection {
  name: string;
  questionCount: number;
  timeLimit: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  topics: string[];
}

// =============================================================================
// QUESTION BANK SYSTEM
// =============================================================================

export interface ResidencyQuestion {
  id: string;
  specialty: MedicalSpecialty;
  questionText: string;
  questionType: QuestionType;
  options: ResidencyOption[];
  correctAnswers: number[]; // Index of correct options
  explanation: string;
  rationale: string;
  difficulty: QuestionDifficulty;
  cognitiveLevel: CognitiveLevel;
  tags: string[];
  keywords: string[];
  clinicalContext?: ClinicalContext;
  multimedia?: MultimediaContent;
  references: Citation[];
  year: number;
  source: QuestionSource;
  usage: QuestionUsage;
  performance: QuestionPerformance;
}

export type QuestionType =
  | 'multiple_choice'
  | 'multiple_select'
  | 'true_false'
  | 'matching'
  | 'fill_blank'
  | 'drag_drop'
  | 'image_based'
  | 'case_based';

export type QuestionDifficulty =
  | 'easy'
  | 'medium'
  | 'hard'
  | 'very_hard';

export type CognitiveLevel =
  | 'remember'     // Remember facts, terms, concepts
  | 'understand'   // Explain ideas, summarize
  | 'apply'        // Use information in new situations
  | 'analyze'      // Break down concepts, examine relationships
  | 'evaluate'     // Justify decisions, make judgments
  | 'create';      // Produce new ideas, combine concepts;

export interface QuestionPerformance {
  averageAccuracy: number;
  averageTime: number;
  difficultyRating: number;
  usageCount: number;
  successRate: number;
  recentPerformance: PerformanceSnapshot[];
}

export interface PerformanceSnapshot {
  date: string;
  accuracy: number;
  timeSpent: number;
  difficulty: QuestionDifficulty;
}

export interface ResidencyOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback?: string;
  difficulty?: QuestionDifficulty;
}

export interface ClinicalContext {
  setting: 'hospital' | 'clinic' | 'emergency' | 'icu' | 'ambulatory' | 'community';
  patientProfile: {
    age: number;
    sex: 'male' | 'female';
    occupation?: string;
    comorbidities: string[];
  };
  scenario: string;
}

export interface MultimediaContent {
  images?: ImageContent[];
  videos?: VideoContent[];
  audio?: AudioContent[];
}

export interface ImageContent {
  id: string;
  url: string;
  description: string;
  type: 'xray' | 'ct' | 'mri' | 'ecg' | 'photo' | 'diagram';
  attribution?: string;
}

export interface VideoContent {
  id: string;
  url: string;
  duration: number;
  description: string;
  type: 'procedure' | 'examination' | 'case' | 'animation';
}

export interface AudioContent {
  id: string;
  url: string;
  duration: number;
  description: string;
  type: 'heart_sounds' | 'lung_sounds' | 'speech';
}

export type QuestionSource =
  | 'official_exam'
  | 'medical_school'
  | 'question_bank'
  | 'practice_test'
  | 'ai_generated'
  | 'expert_created';

export interface QuestionUsage {
  totalAttempts: number;
  correctAttempts: number;
  averageTime: number; // seconds
  commonWrongOptions: number[]; // Option indices commonly chosen incorrectly
  difficultyFeedback: DifficultyFeedback[];
}

export interface DifficultyFeedback {
  userRating: number; // 1-5 user rating
  actualDifficulty: number; // Based on performance
  timestamp: string;
}

// =============================================================================
// ADAPTIVE LEARNING SYSTEM
// =============================================================================

export interface AdaptiveLearningProfile {
  userId: string;
  specialty: MedicalSpecialty;
  currentLevel: number; // 1-10
  knowledgeMap: KnowledgeNode[];
  learningStyle: LearningStyle;
  performanceHistory: PerformanceRecord[];
  strengths: string[];
  weaknesses: string[];
  preferredTopics: string[];
  studyPreferences: StudyPreferences;
  predictedSuccess: SuccessPrediction;
  lastUpdated: string;
}

export interface KnowledgeNode {
  topicId: string;
  topicName: string;
  masteryLevel: number; // 0-100
  confidence: number; // 0-100
  lastReviewed: string;
  nextReview: string;
  difficulty: QuestionDifficulty;
  connections: string[]; // Related topic IDs
}

export interface LearningStyle {
  type: 'visual' | 'auditory' | 'kinesthetic' | 'reading' | 'mixed';
  preferences: {
    studyDuration: number; // minutes
    breakFrequency: number; // minutes
    questionFormat: QuestionType[];
    multimediaPreference: boolean;
    socialLearning: boolean;
  };
}

export interface PerformanceRecord {
  date: string;
  questions: number;
  correct: number;
  timeSpent: number; // minutes
  difficulty: QuestionDifficulty;
  topics: string[];
  score: number;
  improvement: number; // % improvement from previous
}

export interface StudyPreferences {
  studyTime: string[]; // Preferred study times
  weeklyHours: number;
  preferredDifficulty: QuestionDifficulty;
  questionCount: number;
  sessionDuration: number; // minutes
  breakLength: number; // minutes
}

export interface SuccessPrediction {
  probability: number; // 0-100 probability of success
  timeframe: number; // months to achieve target
  confidence: number; // 0-100 confidence in prediction
  factors: PredictionFactor[];
  recommendations: string[];
}

export interface PredictionFactor {
  factor: string;
  impact: 'positive' | 'negative' | 'neutral';
  weight: number; // 0-1
  description: string;
}

// =============================================================================
// EXAM SIMULATION SYSTEM
// =============================================================================

export interface ExamSimulation {
  id: string;
  userId: string;
  specialty: MedicalSpecialty;
  type: SimulationType;
  config: SimulationConfig;
  status: SimulationStatus;
  startedAt?: string;
  completedAt?: string;
  results?: SimulationResults;
  questions: SimulationQuestion[];
}

export type SimulationType =
  | 'official_practice'
  | 'adaptive_practice'
  | 'topic_focused'
  | 'weakness_targeted'
  | 'full_mock'
  | 'speed_training'
  | 'endurance_test';

export interface SimulationConfig {
  questionCount: number;
  timeLimit: number; // minutes
  difficulty: QuestionDifficulty | 'mixed';
  topics: string[];
  negativeMarking: boolean;
  adaptiveMode: boolean;
  allowReview: boolean;
  showResults: 'immediate' | 'after_complete' | 'never';
}

export type SimulationStatus =
  | 'not_started'
  | 'in_progress'
  | 'paused'
  | 'completed'
  | 'abandoned';

export interface SimulationQuestion {
  questionId: string;
  specialty: MedicalSpecialty;
  answered: boolean;
  correctAnswer?: boolean;
  selectedOptions: number[];
  timeSpent: number; // seconds
  confidence: number; // 1-5
  reviewLater: boolean;
  flagged: boolean;
}

export interface SimulationResults {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  percentage: number;
  timeSpent: number; // minutes
  averageTimePerQuestion: number;
  difficultyBreakdown: DifficultyBreakdown;
  topicBreakdown: TopicBreakdown;
  weakAreas: string[];
  strongAreas: string[];
  recommendations: string[];
  improvement: number; // % improvement from last simulation
  percentile: number; // User's percentile among peers
  predictedResidencyScore: number; // Predicted score in actual exam
}

export interface DifficultyBreakdown {
  easy: { total: number; correct: number; percentage: number; };
  medium: { total: number; correct: number; percentage: number; };
  hard: { total: number; correct: number; percentage: number; };
  very_hard: { total: number; correct: number; percentage: number; };
}

export interface TopicBreakdown {
  [topic: string]: {
    total: number;
    correct: number;
    percentage: number;
    averageTime: number;
  };
}

// =============================================================================
// INTELLIGENT ANALYTICS SYSTEM
// =============================================================================

export interface LearningAnalytics {
  userId: string;
  specialty: MedicalSpecialty;
  overview: AnalyticsOverview;
  detailedStats: DetailedStats;
  patterns: LearningPatterns;
  predictions: PerformancePrediction;
  recommendations: PersonalizedRecommendation[];
  generatedAt: string;
}

export interface AnalyticsOverview {
  totalQuestions: number;
  totalCorrect: number;
  overallAccuracy: number;
  totalTimeSpent: number; // minutes
  studyStreak: number; // days
  lastActivity: string;
  weakAreasCount: number;
  strongAreasCount: number;
  predictedExamScore: number;
  readinessLevel: 'not_ready' | 'somewhat_ready' | 'ready' | 'very_ready';
}

export interface DetailedStats {
  performanceByDifficulty: Record<QuestionDifficulty, PerformanceMetric>;
  performanceByTopic: Record<string, PerformanceMetric>;
  performanceByTimeOfDay: Record<string, PerformanceMetric>;
  performanceTrend: PerformanceTrend[];
  questionTypePerformance: Record<QuestionType, PerformanceMetric>;
  cognitiveLevelPerformance: Record<CognitiveLevel, PerformanceMetric>;
}

export interface PerformanceMetric {
  questions: number;
  correct: number;
  accuracy: number;
  averageTime: number;
  improvement: number; // % from start
}

export interface PerformanceTrend {
  date: string;
  score: number;
  questions: number;
  accuracy: number;
  topics: string[];
}

export interface LearningPatterns {
  peakPerformanceHours: string[];
  optimalStudyDuration: number;
  bestQuestionTypes: QuestionType[];
  retentionRate: number;
  forgettingCurve: ForgettingCurveData[];
  spacedRepetitionOptimal: number;
}

export interface ForgettingCurveData {
  topic: string;
  daysAfterLearning: number;
  retention: number; // 0-100
}

export interface PerformancePrediction {
  nextWeekForecast: ForecastData;
  monthlyProjection: ForecastData;
  examReadiness: ReadinessPrediction;
  riskFactors: RiskFactor[];
  successProbability: number;
}

export interface ForecastData {
  predictedScore: number;
  confidence: number;
  improvementRate: number;
  recommendedHours: number;
}

export interface ReadinessPrediction {
  timeframe: number; // weeks
  probability: number; // 0-100
  criticalGaps: string[];
  accelerationStrategies: string[];
}

export interface RiskFactor {
  factor: string;
  probability: number;
  impact: 'low' | 'medium' | 'high';
  mitigation: string;
}

export interface PersonalizedRecommendation {
  type: 'study_time' | 'content_review' | 'practice_focus' | 'strategy_change';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  actionItems: string[];
  expectedImpact: string;
  deadline?: string;
}

// =============================================================================
// SOCIAL LEARNING SYSTEM
// =============================================================================

export interface SocialLearningProfile {
  userId: string;
  username: string;
  specialty: MedicalSpecialty;
  level: number;
  achievements: Achievement[];
  studyGroups: StudyGroupMembership[];
  mentors: MentorshipRelation[];
  mentees: MentorshipRelation[];
  reputation: ReputationMetrics;
  lastActive: string;
  preferences: SocialPreferences;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  earnedAt: string;
  progress?: number; // For ongoing achievements
}

export interface StudyGroupMembership {
  groupId: string;
  groupName: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: string;
  participation: GroupParticipation;
  statistics: GroupStatistics;
}

export interface GroupParticipation {
  messagesPosted: number;
  discussionsJoined: number;
  questionsAnswered: number;
  helpGiven: number;
  helpReceived: number;
  lastActive: string;
}

export interface GroupStatistics {
  accuracy: number;
  questionsAnswered: number;
  helpfulVotes: number;
  reputationScore: number;
  consistency: number; // Regular participation
}

export interface MentorshipRelation {
  userId: string;
  userName: string;
  relationship: 'mentor' | 'mentee';
  specialty: MedicalSpecialty;
  startedAt: string;
  status: 'active' | 'paused' | 'completed';
  sessions: MentorshipSession[];
  feedback: MentorshipFeedback[];
}

export interface MentorshipSession {
  id: string;
  date: string;
  duration: number; // minutes
  type: 'video_call' | 'chat' | 'study_session' | 'exam_review';
  topic: string;
  notes: string;
  rating: number; // 1-5
}

export interface MentorshipFeedback {
  fromUserId: string;
  rating: number; // 1-5
  comment: string;
  category: 'knowledge' | 'communication' | 'reliability' | 'helpfulness';
  date: string;
}

export interface ReputationMetrics {
  score: number;
  level: number;
  badges: Badge[];
  peerRatings: PeerRating[];
  expertise: ExpertiseArea[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface PeerRating {
  fromUserId: string;
  category: 'knowledge' | 'helpfulness' | 'communication' | 'reliability';
  rating: number; // 1-5
  comment?: string;
  date: string;
}

export interface ExpertiseArea {
  specialty: MedicalSpecialty;
  topic: string;
  level: number; // 1-10
  verified: boolean;
  endorsements: number;
}

export interface SocialPreferences {
  visibility: 'public' | 'friends' | 'private';
  studyGroupNotifications: boolean;
  mentorshipRequests: boolean;
  achievementSharing: boolean;
  peerComparison: boolean;
}

// =============================================================================
// STUDY GROUP SYSTEM
// =============================================================================

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  specialty: MedicalSpecialty;
  creatorId: string;
  members: StudyGroupMember[];
  settings: GroupSettings;
  activities: GroupActivity[];
  statistics: GroupStatistics;
  createdAt: string;
  isPublic: boolean;
  maxMembers: number;
}

export interface StudyGroupMember {
  userId: string;
  username: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: string;
  statistics: GroupStatistics;
  isActive: boolean;
}

export interface GroupSettings {
  autoApprove: boolean;
  allowFileSharing: boolean;
  allowVoiceChat: boolean;
  studySchedule: GroupStudySchedule;
  difficultyLevel: QuestionDifficulty;
  topics: string[];
}

export interface GroupStudySchedule {
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  duration: number; // minutes
  preferredTimes: string[];
  timezone: string;
}

export interface GroupActivity {
  id: string;
  type: 'discussion' | 'study_session' | 'quiz' | 'resource_share' | 'achievement';
  userId: string;
  title: string;
  description: string;
  timestamp: string;
  engagement: ActivityEngagement;
}

export interface ActivityEngagement {
  views: number;
  likes: number;
  comments: number;
  shares: number;
}

// =============================================================================
// OFFLINE AND MOBILE SUPPORT
// =============================================================================

export interface OfflineContent {
  questionPacks: OfflineQuestionPack[];
  studyMaterials: OfflineStudyMaterial[];
  lastSync: string;
  storageUsed: number; // bytes
  availableSpace: number; // bytes
}

export interface OfflineQuestionPack {
  id: string;
  name: string;
  specialty: MedicalSpecialty;
  questionCount: number;
  size: number; // bytes
  downloadDate: string;
  expiryDate: string;
  questions: ResidencyQuestion[];
}

export interface OfflineStudyMaterial {
  id: string;
  type: 'video' | 'audio' | 'pdf' | 'image';
  title: string;
  specialty: MedicalSpecialty;
  size: number; // bytes
  downloadDate: string;
  lastAccessed: string;
}

export interface MobileSyncState {
  isOnline: boolean;
  lastSync: string;
  pendingUpdates: SyncUpdate[];
  conflicts: SyncConflict[];
  autoSyncEnabled: boolean;
}

export interface SyncUpdate {
  type: 'answer' | 'progress' | 'preference' | 'achievement';
  data: any;
  timestamp: string;
  synced: boolean;
}

export interface SyncConflict {
  localData: any;
  serverData: any;
  resolution: 'keep_local' | 'keep_server' | 'merge' | 'manual';
  userDecision?: string;
}

// =============================================================================
// EXPORT AND UTILITY TYPES
// =============================================================================

export interface ExportRequest {
  userId: string;
  specialty: MedicalSpecialty;
  format: 'pdf' | 'excel' | 'csv' | 'json';
  dataTypes: ('questions' | 'performance' | 'analytics' | 'certificate')[];
  dateRange: {
    start: string;
    end: string;
  };
  options: ExportOptions;
}

export interface ExportOptions {
  includeExplanations: boolean;
  includeReferences: boolean;
  anonymize: boolean;
  compress: boolean;
}

export interface SystemMetrics {
  totalUsers: number;
  activeUsers: number;
  totalQuestions: number;
  totalSessions: number;
  averageScore: number;
  specialtyStats: Record<MedicalSpecialty, SpecialtyStats>;
}

export interface SpecialtyStats {
  activeUsers: number;
  averageScore: number;
  passRate: number;
  mostDifficultTopics: string[];
  popularStudyGroups: number;
}