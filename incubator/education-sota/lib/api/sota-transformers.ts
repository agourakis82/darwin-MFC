/**
 * DARWIN-MFC SOTA TRANSFORMERS
 * ============================
 *
 * Transform data between SOTA backend types and Darwin-MFC frontend types.
 * Handles enum mappings, date formats, and nested structure conversion.
 */

import {
  KnowledgeNode,
  AdaptiveLearningProfile,
  PerformanceRecord,
  QuestionDifficulty,
  LearningStyle as DarwinLearningStyle,
  MedicalSpecialty as DarwinMedicalSpecialty,
} from '../types/medical-residency';

import {
  SOTAStudentProfile,
  SOTAKnowledgeState,
  SOTAPerformanceData,
  SOTAKnowledgeGapAnalysis,
  SOTAAdaptiveLearningPath,
  SOTALearningSession,
  SOTAMedicalSpecialty,
  SOTALearningStyle,
  SOTAStudentLevel,
  SOTALearningPace,
  KnowledgeGap,
  specialtyMapping,
  learningStyleMapping,
  mapSOTADifficulty,
  mapDarwinDifficulty,
} from '../types/sota';

// =============================================================================
// SPECIALTY TRANSFORMERS
// =============================================================================

/**
 * Convert SOTA specialty to Darwin-MFC specialty
 */
export function transformSOTASpecialty(sotaSpecialty: SOTAMedicalSpecialty): DarwinMedicalSpecialty | null {
  return specialtyMapping[sotaSpecialty] || null;
}

/**
 * Convert Darwin-MFC specialty to SOTA specialty
 */
export function transformDarwinSpecialty(darwinSpecialty: DarwinMedicalSpecialty): SOTAMedicalSpecialty {
  // Reverse mapping
  const reverseMap: Record<string, SOTAMedicalSpecialty> = {
    'medicina_interna': 'CARDIOLOGIA',
    'cirurgia_geral': 'CIRURGIA_GERAL',
    'pediatria': 'PEDIATRIA',
    'ginecologia_obstetricia': 'GINECOLOGIA',
    'medicina_emergencia': 'EMERGENCIA',
    'psiquiatria': 'PSIQUIATRIA',
    'neurologia': 'NEUROLOGIA',
    'cardiologia': 'CARDIOLOGIA',
    'oncologia': 'ONCOLOGIA',
    'infectologia': 'MICROBIOLOGIA',
    'dermatologia': 'DERMATOLOGIA',
    'oftalmologia': 'OFTALMOLOGIA',
    'otorrinolaringologia': 'OTORRINOLARINGOLOGIA',
    'urologia': 'UROLOGIA',
    'ortopedia_traumatologia': 'ORTOPEDIA',
    'anestesiologia': 'ANESTESIOLOGIA',
    'radiologia_diagnostica': 'RADIOLOGIA',
    'patologia': 'PATOLOGIA',
    'medicina_preventiva': 'SAUDE_PUBLICA',
    'medicina_reabilitacao': 'MEDICINA_ESPORTIVA',
  };

  return reverseMap[darwinSpecialty] || 'CARDIOLOGIA';
}

// =============================================================================
// LEARNING STYLE TRANSFORMERS
// =============================================================================

/**
 * Convert SOTA learning style to Darwin-MFC learning style type
 */
export function transformSOTALearningStyle(sotaStyle: SOTALearningStyle): DarwinLearningStyle['type'] {
  return learningStyleMapping[sotaStyle];
}

/**
 * Convert Darwin-MFC learning style to SOTA learning style
 */
export function transformDarwinLearningStyle(darwinStyle: DarwinLearningStyle['type']): SOTALearningStyle {
  const reverseMap: Record<string, SOTALearningStyle> = {
    'visual': 'VISUAL',
    'auditory': 'AUDITORY',
    'kinesthetic': 'KINESTHETIC',
    'reading': 'READING_WRITING',
    'mixed': 'MULTIMODAL',
  };

  return reverseMap[darwinStyle] || 'MULTIMODAL';
}

// =============================================================================
// KNOWLEDGE STATE TRANSFORMERS
// =============================================================================

/**
 * Transform SOTA KnowledgeState to Darwin-MFC KnowledgeNode
 */
export function transformSOTAKnowledgeStateToNode(sotaState: SOTAKnowledgeState): KnowledgeNode {
  return {
    topicId: sotaState.knowledgeAreaId,
    topicName: sotaState.knowledgeAreaId, // Will be enriched with actual name
    masteryLevel: Math.round(sotaState.masteryLevel * 100),
    confidence: Math.round(sotaState.confidence * 100),
    lastReviewed: sotaState.lastReview || sotaState.updatedAt,
    nextReview: sotaState.nextReview || calculateNextReview(sotaState),
    difficulty: mapSOTADifficulty(sotaState.difficultyFactor),
    connections: [], // Will be enriched from SOTA backend
  };
}

/**
 * Transform Darwin-MFC KnowledgeNode to SOTA KnowledgeState
 */
export function transformDarwinNodeToSOTAState(
  node: KnowledgeNode,
  studentId: string
): Partial<SOTAKnowledgeState> {
  return {
    studentId,
    knowledgeAreaId: node.topicId,
    masteryLevel: node.masteryLevel / 100,
    confidence: node.confidence / 100,
    difficultyFactor: mapDarwinDifficulty(node.difficulty),
    lastReview: node.lastReviewed,
    nextReview: node.nextReview,
  };
}

/**
 * Calculate next review date based on spaced repetition
 */
function calculateNextReview(state: SOTAKnowledgeState): string {
  const lastReview = state.lastReview ? new Date(state.lastReview) : new Date();
  const intervalDays = state.interval || 1;
  const nextReview = new Date(lastReview);
  nextReview.setDate(nextReview.getDate() + intervalDays);
  return nextReview.toISOString();
}

// =============================================================================
// PERFORMANCE DATA TRANSFORMERS
// =============================================================================

/**
 * Transform Darwin-MFC PerformanceRecord to SOTA PerformanceData
 */
export function transformDarwinPerformanceToSOTA(
  record: PerformanceRecord,
  studentId: string
): Partial<SOTAPerformanceData> {
  return {
    studentId,
    accuracy: record.correct / record.questions,
    wasCorrect: record.correct > record.questions / 2,
    difficulty: mapDarwinDifficulty(record.difficulty),
    timeSpent: record.timeSpent * 60, // Convert minutes to seconds
    sessionDuration: record.timeSpent,
    createdAt: record.date,
  };
}

/**
 * Transform SOTA PerformanceData to Darwin-MFC PerformanceRecord
 */
export function transformSOTAPerformanceToDarwin(sotaData: SOTAPerformanceData): PerformanceRecord {
  return {
    date: sotaData.createdAt,
    questions: 1, // Single question
    correct: sotaData.wasCorrect ? 1 : 0,
    timeSpent: Math.round(sotaData.sessionDuration),
    difficulty: mapSOTADifficulty(sotaData.difficulty),
    topics: [sotaData.knowledgeAreaId],
    score: sotaData.accuracy * 100,
    improvement: 0, // Calculated separately
  };
}

// =============================================================================
// STUDENT PROFILE TRANSFORMERS
// =============================================================================

/**
 * Transform SOTA StudentProfile to Darwin-MFC AdaptiveLearningProfile
 */
export function transformSOTAProfileToDarwin(
  sotaProfile: SOTAStudentProfile,
  knowledgeNodes: KnowledgeNode[]
): AdaptiveLearningProfile {
  const specialty = transformSOTASpecialty(sotaProfile.specialty);

  return {
    userId: sotaProfile.userId,
    specialty: specialty || 'medicina_interna',
    currentLevel: mapStudentLevelToNumber(sotaProfile.currentLevel),
    knowledgeMap: knowledgeNodes,
    learningStyle: {
      type: transformSOTALearningStyle(sotaProfile.learningStyle),
      preferences: {
        studyDuration: sotaProfile.attentionSpan,
        breakFrequency: Math.round(sotaProfile.attentionSpan * 0.8),
        questionFormat: ['multiple_choice', 'case_based'],
        multimediaPreference: sotaProfile.learningStyle === 'VISUAL',
        socialLearning: false,
      },
    },
    performanceHistory: [],
    strengths: sotaProfile.strengthAreas,
    weaknesses: sotaProfile.weaknessAreas,
    preferredTopics: [],
    studyPreferences: {
      studyTime: [],
      weeklyHours: Math.round(sotaProfile.totalStudyTime / 60),
      preferredDifficulty: 'medium',
      questionCount: 20,
      sessionDuration: sotaProfile.attentionSpan,
      breakLength: 10,
    },
    predictedSuccess: {
      probability: 70,
      timeframe: 12,
      confidence: 60,
      factors: [],
      recommendations: [],
    },
    lastUpdated: sotaProfile.updatedAt,
  };
}

/**
 * Transform Darwin-MFC profile data to SOTA StudentProfile request
 */
export function transformDarwinProfileToSOTA(
  darwinProfile: AdaptiveLearningProfile
): Partial<SOTAStudentProfile> {
  return {
    userId: darwinProfile.userId,
    specialty: transformDarwinSpecialty(darwinProfile.specialty),
    currentLevel: mapNumberToStudentLevel(darwinProfile.currentLevel),
    learningStyle: transformDarwinLearningStyle(darwinProfile.learningStyle.type),
    preferredPace: mapStudyDurationToPace(darwinProfile.studyPreferences.sessionDuration),
    attentionSpan: darwinProfile.learningStyle.preferences.studyDuration,
    strengthAreas: darwinProfile.strengths,
    weaknessAreas: darwinProfile.weaknesses,
  };
}

// =============================================================================
// KNOWLEDGE GAP TRANSFORMERS
// =============================================================================

/**
 * Transform SOTA KnowledgeGapAnalysis for frontend display
 */
export function transformSOTAGapAnalysisForDisplay(analysis: SOTAKnowledgeGapAnalysis): {
  criticalGaps: Array<{ id: string; name: string; level: number; priority: string }>;
  moderateGaps: Array<{ id: string; name: string; level: number; priority: string }>;
  strengths: Array<{ id: string; name: string; level: number; priority: string }>;
  confidence: number;
  successPrediction: number;
  recommendations: string[];
} {
  const mapGap = (gap: KnowledgeGap) => ({
    id: gap.areaId,
    name: gap.areaName,
    level: gap.masteryLevel,
    priority: gap.priority,
  });

  return {
    criticalGaps: analysis.criticalGaps.map(mapGap),
    moderateGaps: analysis.moderateGaps.map(mapGap),
    strengths: analysis.strengths.map(mapGap),
    confidence: Math.round(analysis.confidence * 100),
    successPrediction: Math.round(analysis.predictions.successProbability * 100),
    recommendations: analysis.recommendations.map(r => r.description),
  };
}

// =============================================================================
// LEARNING PATH TRANSFORMERS
// =============================================================================

/**
 * Transform SOTA AdaptiveLearningPath for frontend display
 */
export function transformSOTAPathForDisplay(path: SOTAAdaptiveLearningPath): {
  id: string;
  title: string;
  description: string;
  totalModules: number;
  completedModules: number;
  progress: number;
  estimatedHours: number;
  modules: Array<{
    id: string;
    title: string;
    type: string;
    difficulty: number;
    estimatedMinutes: number;
    isCompleted: boolean;
    priority: string;
  }>;
  predictedCompletionDate: string;
  successProbability: number;
} {
  const completedModules = path.modules.filter(m => m.isCompleted).length;

  return {
    id: path.id,
    title: path.title,
    description: path.description,
    totalModules: path.modules.length,
    completedModules,
    progress: path.completionPercentage,
    estimatedHours: path.totalEstimatedHours,
    modules: path.modules.map(m => ({
      id: m.id,
      title: m.title,
      type: m.type,
      difficulty: m.difficulty,
      estimatedMinutes: m.estimatedMinutes,
      isCompleted: m.isCompleted,
      priority: m.priority,
    })),
    predictedCompletionDate: path.predictedCompletionDate,
    successProbability: Math.round(path.successProbability * 100),
  };
}

// =============================================================================
// SESSION TRANSFORMERS
// =============================================================================

/**
 * Transform SOTA LearningSession for frontend display
 */
export function transformSOTASessionForDisplay(session: SOTALearningSession): {
  id: string;
  type: string;
  status: string;
  duration: number;
  accuracy: number;
  engagementScore: number;
  interactionCount: number;
  startedAt: string;
  endedAt: string | null;
} {
  return {
    id: session.id,
    type: session.sessionType,
    status: session.status,
    duration: session.duration || 0,
    accuracy: Math.round((session.accuracy || 0) * 100),
    engagementScore: Math.round((session.engagementScore || 0) * 100),
    interactionCount: session.interactionCount,
    startedAt: session.startedAt,
    endedAt: session.endedAt || null,
  };
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Map SOTA StudentLevel to numeric level (1-10)
 */
function mapStudentLevelToNumber(level: SOTAStudentLevel): number {
  const levelMap: Record<SOTAStudentLevel, number> = {
    'FIRST_YEAR': 1,
    'SECOND_YEAR': 2,
    'THIRD_YEAR': 3,
    'FOURTH_YEAR': 4,
    'FIFTH_YEAR': 5,
    'SIXTH_YEAR': 6,
    'INTERNSHIP': 7,
    'RESIDENCY': 8,
    'SPECIALIZATION': 9,
  };
  return levelMap[level] || 5;
}

/**
 * Map numeric level to SOTA StudentLevel
 */
function mapNumberToStudentLevel(level: number): SOTAStudentLevel {
  const levels: SOTAStudentLevel[] = [
    'FIRST_YEAR',
    'SECOND_YEAR',
    'THIRD_YEAR',
    'FOURTH_YEAR',
    'FIFTH_YEAR',
    'SIXTH_YEAR',
    'INTERNSHIP',
    'RESIDENCY',
    'SPECIALIZATION',
  ];
  return levels[Math.min(level - 1, levels.length - 1)] || 'FIFTH_YEAR';
}

/**
 * Map study duration to learning pace
 */
function mapStudyDurationToPace(duration: number): SOTALearningPace {
  if (duration < 30) return 'SLOW';
  if (duration < 60) return 'NORMAL';
  if (duration < 90) return 'FAST';
  return 'ACCELERATED';
}

// =============================================================================
// BATCH TRANSFORMERS
// =============================================================================

/**
 * Transform multiple SOTA knowledge states to Darwin nodes
 */
export function transformSOTAKnowledgeStatesToNodes(
  states: SOTAKnowledgeState[]
): KnowledgeNode[] {
  return states.map(transformSOTAKnowledgeStateToNode);
}

/**
 * Transform multiple Darwin performance records to SOTA format
 */
export function transformDarwinPerformanceRecordsToSOTA(
  records: PerformanceRecord[],
  studentId: string
): Partial<SOTAPerformanceData>[] {
  return records.map(r => transformDarwinPerformanceToSOTA(r, studentId));
}
