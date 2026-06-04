/**
 * Sistema de Aprendizado Adaptativo State-of-the-Art para Educação Médica
 * Integra IA, LLMs e algoritmos avançados de personalização
 */

import { EventEmitter } from 'events';

interface KnowledgeState {
  topicId: string;
  masteryLevel: number; // 0-1
  confidence: number;
  lastReview: Date;
  difficulty: number;
  neuralPlasticity: number;
  crossTopicCorrelation: Map<string, number>;
  decayRate: number;
  retrievalStrength: number;
}

interface StudentProfile {
  id: string;
  name: string;
  specialty: MedicalSpecialty;
  currentLevel: StudentLevel;
  learningStyle: LearningStyle;
  preferredPace: 'slow' | 'normal' | 'fast';
  attentionSpan: number; // minutes
  technologyComfort: number; // 0-1
  strengths: string[];
  weaknesses: string[];
  studyHabits: StudyHabits;
  performanceHistory: PerformanceData[];
}

interface LearningPath {
  id: string;
  studentId: string;
  totalDuration: number; // days
  dailyStudyTime: number; // minutes
  modules: LearningModule[];
  adaptiveFactors: AdaptiveFactors;
  predictedCompletion: Date;
  difficultyProgression: number[];
  masteryMilestones: Milestone[];
}

interface LearningModule {
  id: string;
  type: ModuleType;
  topic: string;
  contentId: string;
  difficulty: number;
  estimatedTime: number; // minutes
  prerequisites: string[];
  learningObjectives: string[];
  assessmentItems: AssessmentItem[];
  adaptiveParameters: AdaptiveParameters;
}

interface AssessmentItem {
  id: string;
  type: 'question' | 'case' | 'simulation' | 'procedure';
  difficulty: number;
  discrimination: number;
  contentArea: string;
  cognitiveLevel: BloomLevel;
  timeLimit?: number;
  hintAvailable: boolean;
  explanationDepth: 'brief' | 'detailed' | 'comprehensive';
}

interface PerformanceData {
  timestamp: Date;
  moduleId: string;
  itemId: string;
  response: any;
  accuracy: number;
  responseTime: number;
  confidence: number;
  difficulty: number;
  hintUsed: boolean;
  attempts: number;
  context: LearningContext;
}

interface LearningContext {
  sessionDuration: number;
  timeOfDay: TimeSlot;
  environment: 'home' | 'library' | 'hospital' | 'mobile';
  energyLevel: number; // 0-1
  stressLevel: number; // 0-1
  interruptions: number;
  previousTopics: string[];
}

/**
 * Engine de Diagnóstico de Lacunas de Conhecimento com IA
 */
class KnowledgeGapDiagnosticEngine extends EventEmitter {
  private llm: LargeLanguageModel;
  private knowledgeGraph: MedicalKnowledgeGraph;
  private bayesianNetwork: BayesianKnowledgeNetwork;
  private performanceAnalyzer: PerformanceAnalyzer;

  constructor() {
    super();
    this.initializeComponents();
  }

  private async initializeComponents() {
    // Inicializar LLM especializado em educação médica
    this.llm = await LargeLanguageModel.initialize({
      model: 'gpt-4-turbo-medical',
      specialization: 'brazilian_medical_education',
      fineTuning: 'enamed_patterns_2025',
      context: 'medical_curriculum_brazil'
    });

    // Inicializar grafo de conhecimento médico
    this.knowledgeGraph = new MedicalKnowledgeGraph({
      curriculum: 'BNCC_medicina',
      guidelines: ['CFM', 'SBC', 'SBEM', 'SBA'],
      specialties: Object.values(MedicalSpecialty)
    });

    // Inicializar rede Bayesiana para inferência probabilística
    this.bayesianNetwork = new BayesianKnowledgeNetwork({
      nodes: await this.knowledgeGraph.getAllTopics(),
      edges: await this.knowledgeGraph.getTopicDependencies(),
      priors: this.loadKnowledgePriors()
    });

    this.performanceAnalyzer = new PerformanceAnalyzer();
  }

  async diagnoseKnowledgeGaps(
    studentProfile: StudentProfile,
    recentPerformance: PerformanceData[],
    historicalTrends: PerformanceData[]
  ): Promise<KnowledgeGapAnalysis> {

    // 1. Análise de padrões de performance
    const performancePatterns = await this.performanceAnalyzer.analyzePatterns({
      recent: recentPerformance,
      historical: historicalTrends,
      timeframe: '6_months'
    });

    // 2. Modelagem Bayesiana de conhecimento
    const knowledgeEstimates = await this.bayesianNetwork.inferKnowledgeStates({
      studentProfile,
      performanceData: performancePatterns
    });

    // 3. Análise com LLM para contexto médico
    const llmAnalysis = await this.performLLMAnalysis({
      studentProfile,
      performancePatterns,
      knowledgeEstimates
    });

    // 4. Identificação de lacunas críticas
    const criticalGaps = await this.identifyCriticalGaps({
      knowledgeEstimates,
      llmAnalysis,
      examRequirements: this.getExamRequirements(studentProfile.specialty),
      urgency: 'high'
    });

    // 5. Priorização inteligente
    const prioritizedGaps = await this.prioritizeKnowledgeGaps({
      gaps: criticalGaps,
      studentProfile,
      timeToExam: this.calculateTimeToExam(studentProfile),
      learningEfficiency: performancePatterns.learningEfficiency
    });

    return {
      studentId: studentProfile.id,
      diagnosisDate: new Date(),
      overallReadiness: this.calculateOverallReadiness(knowledgeEstimates),
      criticalGaps: prioritizedGaps.critical,
      moderateGaps: prioritizedGaps.moderate,
      strengthAreas: prioritizedGaps.strengths,
      recommendedFocus: prioritizedGaps.recommendedFocus,
      confidence: knowledgeEstimates.confidence,
      predictiveInsights: llmAnalysis.predictiveInsights
    };
  }

  private async performLLMAnalysis(context: any): Promise<LLMAnalysis> {
    const prompt = this.buildDiagnosticPrompt(context);

    const analysis = await this.llm.generate(prompt, {
      temperature: 0.3,
      maxTokens: 2000,
      responseFormat: 'json'
    });

    return {
      identifiedPatterns: analysis.patterns,
      predictiveInsights: analysis.predictiveInsights,
      recommendedStrategies: analysis.strategies,
      riskFactors: analysis.riskFactors,
      learningOpportunities: analysis.opportunities
    };
  }

  private buildDiagnosticPrompt(context: any): string {
    return `
      Analise o perfil do estudante de medicina e identifique padrões de aprendizagem:

      Perfil: ${JSON.stringify(context.studentProfile, null, 2)}
      Padrões de Performance: ${JSON.stringify(context.performancePatterns, null, 2)}
      Estimativas de Conhecimento: ${JSON.stringify(context.knowledgeEstimates, null, 2)}

      Contexto Médico Brasileiro:
      - Especialidade: ${context.studentProfile.specialty}
      - Nível: ${context.studentProfile.currentLevel}
      - Estilo de Aprendizagem: ${context.studentProfile.learningStyle}

      Identifique:
      1. Padrões únicos de aprendizagem
      2. Fatores de risco para sucesso
      3. Oportunidades de otimização
      4. Estratégias personalizadas
      5. Insights preditivos

      Retorne análise estruturada em JSON.
    `;
  }
}

/**
 * Engine de Aprendizado Adaptativo com Deep Learning
 */
class AdaptiveLearningEngine extends EventEmitter {
  private dkt: DeepKnowledgeTracer;
  private contentSelector: AdaptiveContentSelector;
  private difficultyAdjuster: DifficultyAdjuster;
  private spacedRepetition: AdvancedSpacedRepetition;
  private reinforcementLearning: EducationReinforcementLearning;

  constructor() {
    super();
    this.initializeComponents();
  }

  private async initializeComponents() {
    // Deep Knowledge Tracing para modelagem de conhecimento
    this.dkt = new DeepKnowledgeTracer({
      hiddenLayers: [128, 64, 32],
      dropoutRate: 0.2,
      learningRate: 0.001,
      regularization: 'l2'
    });

    // Seletor adaptativo de conteúdo
    this.contentSelector = new AdaptiveContentSelector({
      algorithm: 'multi_armed_bandit',
      explorationRate: 0.1,
      adaptationSpeed: 'medium',
      personalizationLevel: 'high'
    });

    // Ajustador de dificuldade em tempo real
    this.difficultyAdjuster = new DifficultyAdjuster({
      adjustmentFrequency: 'real_time',
      smoothingWindow: 5,
      adaptationRate: 0.05,
      boundsCheck: true
    });

    // Sistema de repetição espaçada avançado
    this.spacedRepetition = new AdvancedSpacedRepetition({
      algorithm: 'superMemo17',
      neuralFactors: true,
      crossTopicCorrelation: true,
      personalFactors: true
    });

    // Aprendizado por reforço para otimização educacional
    this.reinforcementLearning = new EducationReinforcementLearning({
      algorithm: 'deep_q_network',
      rewardFunction: 'learning_efficiency',
      explorationStrategy: 'epsilon_greedy',
      learningRate: 0.0001
    });
  }

  async generatePersonalizedLearningPath(
    studentProfile: StudentProfile,
    knowledgeGaps: KnowledgeGapAnalysis,
    constraints: LearningConstraints
  ): Promise<LearningPath> {

    // 1. Calcular caminho otimizado com Deep Learning
    const optimalPath = await this.calculateOptimalLearningPath({
      studentProfile,
      knowledgeGaps,
      constraints,
      algorithm: 'deep_reinforcement_learning'
    });

    // 2. Selecionar conteúdo com Multi-Armed Bandit
    const selectedContent = await this.contentSelector.selectContent({
      path: optimalPath,
      availableContent: await this.getAvailableContent(studentProfile.specialty),
      studentPreferences: studentProfile.studyHabits
    });

    // 3. Configurar repetição espaçada personalizada
    const spacedRepetitionConfig = await this.spacedRepetition.configurePersonalizedSchedule({
      studentProfile,
      contentItems: selectedContent,
      targetCompletion: constraints.targetCompletionDate
    });

    // 4. Definir checkpoints adaptativos
    const milestones = await this.defineAdaptiveMilestones({
      path: optimalPath,
      studentProfile,
      spacedRepetitionConfig
    });

    // 5. Gerar predições de performance
    const performancePredictions = await this.predictLearningOutcomes({
      path: optimalPath,
      studentProfile,
      content: selectedContent
    });

    return {
      id: this.generateId(),
      studentId: studentProfile.id,
      totalDuration: this.calculateTotalDuration(selectedContent),
      dailyStudyTime: constraints.dailyStudyTime,
      modules: this.convertToModules(selectedContent),
      adaptiveFactors: {
        difficultyProgression: optimalPath.difficultyCurve,
        contentRecommendations: selectedContent.recommendations,
        spacedRepetitionParameters: spacedRepetitionConfig,
        predictedPerformance: performancePredictions
      },
      predictedCompletion: constraints.targetCompletionDate,
      difficultyProgression: optimalPath.difficultyCurve,
      masteryMilestones: milestones
    };
  }

  async updateLearningPath(
    learningPath: LearningPath,
    recentPerformance: PerformanceData[]
  ): Promise<LearningPathUpdate> {

    // 1. Atualizar modelo de conhecimento com DKT
    const updatedKnowledgeState = await this.dkt.updateKnowledgeState({
      previousPath: learningPath,
      newPerformance: recentPerformance
    });

    // 2. Recalcular dificuldade com base em performance
    const newDifficultyProgression = await this.difficultyAdjuster.adjustDifficulty({
      currentPath: learningPath,
      performance: recentPerformance,
      knowledgeState: updatedKnowledgeState
    });

    // 3. Otimizar conteúdo com Multi-Armed Bandit
    const optimizedContent = await this.contentSelector.optimizeSelection({
      currentPath: learningPath,
      performance: recentPerformance,
      updatedDifficulty: newDifficultyProgression
    });

    // 4. Atualizar repetição espaçada
    const updatedSchedule = await this.spacedRepetition.updateSchedule({
      currentSchedule: learningPath.adaptiveFactors.spacedRepetitionParameters,
      performance: recentPerformance
    });

    return {
      updatedPath: {
        ...learningPath,
        difficultyProgression: newDifficultyProgression,
        adaptiveFactors: {
          ...learningPath.adaptiveFactors,
          contentRecommendations: optimizedContent,
          spacedRepetitionParameters: updatedSchedule
        }
      },
      changes: this.calculateChanges(learningPath, {
        difficultyProgression: newDifficultyProgression,
        contentRecommendations: optimizedContent
      }),
      predictions: await this.predictImpact(recentPerformance, optimizedContent)
    };
  }

  private async calculateOptimalLearningPath(params: any): Promise<OptimalPath> {
    // Implementação do algoritmo de caminho ótimo
    // usando Deep Reinforcement Learning
    return this.reinforcementLearning.findOptimalPath(params);
  }
}

/**
 * Engine de Repetição Espaçada Avançado
 */
class AdvancedSpacedRepetition extends EventEmitter {
  private superMemo: SuperMemo17;
  private neuralFactors: NeuralPlasticityModel;
  private crossTopicCorrelator: CrossTopicCorrelator;

  constructor(config: SpacedRepetitionConfig) {
    super();
    this.initializeComponents(config);
  }

  private initializeComponents(config: SpacedRepetitionConfig) {
    this.superMemo = new SuperMemo17({
      baseEaseFactor: 2.5,
      minEaseFactor: 1.3,
      maxEaseFactor: 2.8,
      ...config
    });

    this.neuralFactors = new NeuralPlasticityModel({
      decayRate: 0.693, // Half-life
      consolidationFactor: 1.3,
      interferenceFactor: 0.8
    });

    this.crossTopicCorrelator = new CrossTopicCorrelator({
      correlationThreshold: 0.6,
      decayRate: 0.5,
      strengtheningRate: 1.1
    });
  }

  async calculateOptimalReviewTime(
    item: RepetitionItem,
    performance: ReviewPerformance,
    context: LearningContext
  ): Promise<ReviewSchedule> {

    // 1. Calcular fator de facilidade baseado em performance
    let easeFactor = this.calculateEaseFactor(item.easeFactor, performance);

    // 2. Aplicar fatores neurais
    const neuralDecay = this.neuralFactors.calculateDecay({
      itemAge: this.getItemAge(item),
      performance: performance,
      context: context
    });

    // 3. Considerar correlação entre tópicos
    const crossTopicEffect = await this.crossTopicCorrelator.calculateEffect({
      item: item,
      recentTopics: context.previousTopics,
      performance: performance
    });

    // 4. Calcular intervalo otimizado
    const optimalInterval = this.calculateOptimalInterval({
      item: item,
      performance: performance,
      easeFactor: easeFactor,
      neuralDecay: neuralDecay,
      crossTopicEffect: crossTopicEffect,
      context: context
    });

    // 5. Determinar próximo review
    const nextReviewDate = this.calculateNextReviewDate(optimalInterval);

    return {
      itemId: item.id,
      nextReviewDate: nextReviewDate,
      interval: optimalInterval,
      easeFactor: easeFactor,
      confidence: this.calculateConfidence(performance, context),
      priority: this.calculatePriority(item, performance),
      recommendations: this.generateRecommendations(item, performance)
    };
  }

  private calculateEaseFactor(currentEase: number, performance: ReviewPerformance): number {
    let newEase = currentEase;

    if (performance.wasCorrect) {
      if (performance.confidenceLevel > 0.8) {
        newEase = Math.min(2.8, currentEase + 0.15);
      } else {
        newEase = currentEase + 0.05;
      }
    } else {
      newEase = Math.max(1.3, currentEase - 0.2);
    }

    return newEase;
  }

  private calculateOptimalInterval(params: any): number {
    const { item, performance, easeFactor, neuralDecay, crossTopicEffect } = params;

    let interval: number;

    if (item.repetitions === 0) {
      interval = 1;
    } else if (item.repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(
        item.interval *
        easeFactor *
        neuralDecay *
        crossTopicEffect *
        this.getDifficultyMultiplier(item.difficulty) *
        this.getPerformanceMultiplier(performance)
      );
    }

    return Math.max(1, Math.min(365, interval));
  }

  private getDifficultyMultiplier(difficulty: number): number {
    // Conteúdo mais difícil = intervalos menores
    return Math.max(0.5, 1.2 - (difficulty * 0.7));
  }

  private getPerformanceMultiplier(performance: ReviewPerformance): number {
    if (performance.responseTime < 2000) return 1.1; // Resposta rápida
    if (performance.responseTime < 5000) return 1.0; // Tempo normal
    if (performance.responseTime < 10000) return 0.9; // Resposta lenta
    return 0.8; // Muito lento
  }
}

/**
 * Seletor Adaptativo de Conteúdo com Multi-Armed Bandit
 */
class AdaptiveContentSelector {
  private bandit: MultiArmedBandit;
  private contentRepository: ContentRepository;
  private personalizationEngine: PersonalizationEngine;

  constructor(config: ContentSelectorConfig) {
    this.bandit = new MultiArmedBandit({
      algorithm: config.algorithm,
      explorationRate: config.explorationRate,
      adaptationSpeed: config.adaptationSpeed
    });
    this.contentRepository = new ContentRepository();
    this.personalizationEngine = new PersonalizationEngine();
  }

  async selectContent(params: ContentSelectionParams): Promise<SelectedContent[]> {
    const { path, availableContent, studentPreferences } = params;

    const selectedContent: SelectedContent[] = [];
    const banditContext = this.buildBanditContext(studentPreferences);

    for (const module of path.modules) {
      // Obter conteúdo candidatos para este módulo
      const candidates = await this.contentRepository.getCandidates({
        topic: module.topic,
        difficulty: module.difficulty,
        type: module.type,
        studentPreferences: studentPreferences
      });

      // Selecionar melhor conteúdo usando Multi-Armed Bandit
      const selected = await this.bandit.select({
        candidates: candidates,
        context: banditContext,
        constraints: {
          maxItems: 3,
          diversityThreshold: 0.7,
          noveltyPreference: 0.3
        }
      });

      // Personalizar conteúdo selecionado
      const personalized = await this.personalizationEngine.personalize({
        content: selected,
        studentProfile: studentPreferences
      });

      selectedContent.push(...personalized);
    }

    return selectedContent;
  }

  private buildBanditContext(preferences: any): BanditContext {
    return {
      learningStyle: preferences.learningStyle,
      preferredDifficulty: preferences.preferredDifficulty,
      contentTypePreference: preferences.contentTypePreference,
      timeConstraints: preferences.timeConstraints,
      engagementHistory: preferences.engagementHistory
    };
  }
}

/**
 * Sistema Principal de Aprendizado Adaptativo
 */
export class MedicalAdaptiveLearningSystem extends EventEmitter {
  private diagnosticEngine: KnowledgeGapDiagnosticEngine;
  private adaptiveEngine: AdaptiveLearningEngine;
  private analytics: LearningAnalyticsEngine;
  private database: AdaptiveLearningDatabase;

  constructor() {
    super();
    this.initializeSystem();
  }

  private async initializeSystem() {
    this.diagnosticEngine = new KnowledgeGapDiagnosticEngine();
    this.adaptiveEngine = new AdaptiveLearningEngine();
    this.analytics = new LearningAnalyticsEngine();
    this.database = new AdaptiveLearningDatabase();

    // Configurar event listeners
    this.setupEventListeners();
  }

  async initializeStudent(
    studentProfile: StudentProfile,
    initialAssessment?: InitialAssessment
  ): Promise<StudentInitializationResult> {

    try {
      // 1. Carregar dados históricos se existirem
      const historicalData = await this.database.getStudentHistory(studentProfile.id);

      // 2. Executar assessment inicial se necessário
      const assessment = initialAssessment || await this.runInitialAssessment(studentProfile);

      // 3. Diagnosticar lacunas de conhecimento
      const knowledgeGaps = await this.diagnosticEngine.diagnoseKnowledgeGaps(
        studentProfile,
        assessment.recentPerformance,
        historicalData.performanceHistory
      );

      // 4. Gerar caminho de aprendizado personalizado
      const learningPath = await this.adaptiveEngine.generatePersonalizedLearningPath(
        studentProfile,
        knowledgeGaps,
        this.getDefaultConstraints()
      );

      // 5. Salvar no banco de dados
      await this.database.saveStudentData({
        profile: studentProfile,
        knowledgeGaps: knowledgeGaps,
        learningPath: learningPath,
        assessment: assessment
      });

      return {
        studentId: studentProfile.id,
        knowledgeGaps: knowledgeGaps,
        learningPath: learningPath,
        recommendations: this.generateInitialRecommendations(knowledgeGaps),
        nextSteps: this.defineNextSteps(learningPath)
      };

    } catch (error) {
      console.error('Erro na inicialização do estudante:', error);
      throw new Error(`Falha na inicialização: ${error.message}`);
    }
  }

  async processLearningSession(
    sessionData: LearningSession
  ): Promise<SessionProcessingResult> {

    try {
      // 1. Validar e processar dados da sessão
      const validatedSession = await this.validateSessionData(sessionData);

      // 2. Analisar performance em tempo real
      const performanceAnalysis = await this.analytics.analyzeSessionPerformance(validatedSession);

      // 3. Ajustar dificuldade em tempo real
      const difficultyAdjustment = await this.adaptiveEngine.difficultyAdjuster.adjustRealTime({
        sessionData: validatedSession,
        performanceAnalysis: performanceAnalysis
      });

      // 4. Atualizar modelo de conhecimento
      const knowledgeUpdate = await this.adaptiveEngine.dkt.updateWithSession(validatedSession);

      // 5. Gerar feedback personalizado
      const personalizedFeedback = await this.generatePersonalizedFeedback({
        session: validatedSession,
        performance: performanceAnalysis,
        knowledgeUpdate: knowledgeUpdate
      });

      // 6. Salvar dados processados
      await this.database.saveSessionData(validatedSession, performanceAnalysis);

      // 7. Verificar se caminho de aprendizado precisa de atualização
      const needsPathUpdate = await this.assessPathUpdateNeed(performanceAnalysis, knowledgeUpdate);

      let pathUpdate: LearningPathUpdate | null = null;
      if (needsPathUpdate) {
        pathUpdate = await this.adaptiveEngine.updateLearningPath(
          await this.database.getLearningPath(sessionData.studentId),
          performanceAnalysis.detailedPerformance
        );
        await this.database.updateLearningPath(pathUpdate.updatedPath);
      }

      return {
        sessionId: sessionData.id,
        feedback: personalizedFeedback,
        difficultyAdjustment: difficultyAdjustment,
        knowledgeUpdate: knowledgeUpdate,
        pathUpdate: pathUpdate,
        nextRecommendations: personalizedFeedback.nextSteps
      };

    } catch (error) {
      console.error('Erro no processamento da sessão:', error);
      throw new Error(`Falha no processamento: ${error.message}`);
    }
  }

  async getStudentProgress(studentId: string): Promise<StudentProgressReport> {
    const studentData = await this.database.getStudentData(studentId);
    const recentSessions = await this.database.getRecentSessions(studentId, 30); // Last 30 days

    const progress = await this.analytics.generateProgressReport({
      studentData: studentData,
      recentSessions: recentSessions,
      timeframe: '30_days'
    });

    return {
      studentId: studentId,
      reportDate: new Date(),
      overallProgress: progress.overallProgress,
      knowledgeMastery: progress.knowledgeMastery,
      skillDevelopment: progress.skillDevelopment,
      performanceTrends: progress.performanceTrends,
      predictions: progress.predictions,
      recommendations: progress.recommendations
    };
  }

  private setupEventListeners() {
    this.diagnosticEngine.on('knowledgeGapIdentified', (data) => {
      this.emit('knowledgeGapIdentified', data);
    });

    this.adaptiveEngine.on('learningPathUpdated', (update) => {
      this.emit('learningPathUpdated', update);
    });

    this.analytics.on('significantImprovement', (data) => {
      this.emit('significantImprovement', data);
    });
  }
}

// Export principal
export default MedicalAdaptiveLearningSystem;

// Tipos e interfaces auxiliares
export type {
  KnowledgeState,
  StudentProfile,
  LearningPath,
  LearningModule,
  PerformanceData,
  KnowledgeGapAnalysis
};

// Enums
enum MedicalSpecialty {
  CARDIOLOGIA = 'cardiologia',
  NEUROLOGIA = 'neurologia',
  PEDIATRIA = 'pediatria',
  GINECOLOGIA = 'ginecologia',
  CLINICA_GERAL = 'clinica_geral',
  EMERGENCIA = 'emergencia'
}

enum StudentLevel {
  INICIANTE = 'iniciante',
  INTERMEDIARIO = 'intermediario',
  AVANCADO = 'avancado',
  ESPECIALIZANDO = 'especializando'
}

enum LearningStyle {
  VISUAL = 'visual',
  AUDITORY = 'auditory',
  KINESTHETIC = 'kinesthetic',
  READING_WRITING = 'reading_writing'
}

enum ModuleType {
  THEORETICAL = 'theoretical',
  CLINICAL_CASE = 'clinical_case',
  SIMULATION = 'simulation',
  ASSESSMENT = 'assessment',
  REVIEW = 'review'
}

enum BloomLevel {
  REMEMBER = 'remember',
  UNDERSTAND = 'understand',
  APPLY = 'apply',
  ANALYZE = 'analyze',
  EVALUATE = 'evaluate',
  CREATE = 'create'
}

enum TimeSlot {
  EARLY_MORNING = 'early_morning',
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  EVENING = 'evening',
  NIGHT = 'night'
}
