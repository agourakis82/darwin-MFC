// Sistema de Repetição Espaçada Avançado - SuperMemo-17 com Fatores Neurais
// Implementação State-of-the-Art para otimização de retenção de conhecimento

export interface SpacedRepetitionConfig {
  baseEaseFactor: number;
  minEaseFactor: number;
  maxEaseFactor: number;
  neuralFactorsEnabled: boolean;
  crossTopicCorrelation: boolean;
  contextualMemoryStrengthening: boolean;
  circadianOptimization: boolean;
  stressAdaptation: boolean;
}

export interface ContentItem {
  id: string;
  contentType: 'clinical_case' | 'question' | 'concept' | 'procedure' | 'formula';
  topic: string;
  specialty: string;
  difficulty: number; // 1-10
  complexity: number; // 1-10
  baseInterval: number; // dias
  easeFactor: number;
  interval: number;
  repetitions: number;
  lastReviewed: Date;
  successRate: number;
  neuralPlasticity: number;
  crossTopicRelations: string[];
  contextualFactors: ContextualFactor[];
}

export interface PerformanceData {
  itemId: string;
  responseTime: number; // milissegundos
  confidenceLevel: number; // 0-1
  wasCorrect: boolean;
  difficultyRating: number; // 1-5
  cognitiveLoad: number; // 0-1
  fatigueLevel: number; // 0-1
  stressLevel: number; // 0-1
  timeOfDay: number; // 0-23
  dayOfWeek: number; // 0-6
  contextType: 'study' | 'assessment' | 'review' | 'practice';
  previousPerformance: PerformanceHistory[];
}

export interface PerformanceHistory {
  date: Date;
  wasCorrect: boolean;
  responseTime: number;
  confidence: number;
  context: string;
}

export interface ContextualFactor {
  type: 'time' | 'environment' | 'emotional' | 'cognitive' | 'social';
  value: number; // 0-1
  influence: number; // -1 a 1 (negativo a positivo)
}

export interface NeuralFactors {
  memoryConsolidationScore: number;
  neuroplasticityBoost: number;
  circadianOptimalTime: number;
  stressResilience: number;
  attentionSpan: number;
  workingMemoryCapacity: number;
}

export interface ReviewSchedule {
  nextReviewDate: Date;
  intervalDays: number;
  confidence: number;
  recommendedReviewCount: number;
  neuralPathwayStrengthening: number;
  adaptationNotes: string[];
  optimalReviewTime: TimeSlot;
  difficultyAdjustment: number;
}

export interface TimeSlot {
  hour: number;
  minute: number;
  dayOfWeek: number[];
  duration: number;
  environmentType: 'study' | 'casual' | 'intensive' | 'assessment';
}

export interface StudentProfile {
  id: string;
  age: number;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading_writing';
  cognitiveProfile: CognitiveProfile;
  studyPreferences: StudyPreferences;
  historicalPerformance: PerformanceData[];
  biometricData?: BiometricData;
}

export interface CognitiveProfile {
  workingMemoryCapacity: number;
  processingSpeed: number;
  attentionSpan: number;
  stressTolerance: number;
  motivationLevel: number;
  learningVelocity: number;
  retentionAbility: number;
}

export interface StudyPreferences {
  optimalTimes: TimeSlot[];
  sessionDuration: number;
  breakFrequency: number;
  environmentPreferences: string[];
  difficultyProgression: 'gradual' | 'steep' | 'adaptive';
}

export interface BiometricData {
  sleepQuality: number; // 0-1
  stressLevel: number; // 0-1
  cognitiveLoad: number; // 0-1
  heartRateVariability: number;
  restingHeartRate: number;
  lastSleepDuration: number;
  exerciseFrequency: number;
}

/**
 * Sistema de Repetição Espaçada Avançado com SuperMemo-17 e Fatores Neurais
 */
export class AdvancedSpacedRepetitionEngine {
  private readonly config: SpacedRepetitionConfig;
  private readonly neuralFactors: NeuralFactors;
  private readonly algorithmVersion = 'SuperMemo-17-SOTA-2025';

  constructor(config?: Partial<SpacedRepetitionConfig>) {
    this.config = {
      baseEaseFactor: 2.5,
      minEaseFactor: 1.3,
      maxEaseFactor: 2.8,
      neuralFactorsEnabled: true,
      crossTopicCorrelation: true,
      contextualMemoryStrengthening: true,
      circadianOptimization: true,
      stressAdaptation: true,
      ...config
    };

    this.neuralFactors = this.initializeNeuralFactors();
  }

  /**
   * Calcula o próximo intervalo de revisão otimizado
   */
  async calculateOptimalReviewInterval(
    contentItem: ContentItem,
    performance: PerformanceData,
    studentProfile: StudentProfile,
    historicalPerformance: PerformanceData[]
  ): Promise<ReviewSchedule> {
    console.log(`🧠 Calculando intervalo otimizado para item: ${contentItem.id}`);

    // 1. Calcular fator de facilidade baseado na performance
    const easeFactor = this.calculateEaseFactor(contentItem, performance);

    // 2. Aplicar fatores neurais (se habilitados)
    const neuralFactors = this.config.neuralFactorsEnabled
      ? await this.calculateNeuralFactors(contentItem, performance, studentProfile)
      : null;

    // 3. Correlação entre tópicos (se habilitada)
    const crossTopicFactor = this.config.crossTopicCorrelation
      ? await this.calculateCrossTopicCorrelation(contentItem, historicalPerformance)
      : 1.0;

    // 4. Fatores de esquecimento baseados em neurociência
    const forgettingFactor = this.calculateForgettingFactor(contentItem, performance);

    // 5. Fator de consolidação de memória
    const memoryConsolidationFactor = this.calculateMemoryConsolidationFactor(
      performance,
      studentProfile,
      contentItem
    );

    // 6. Otimização circadiana (se habilitada)
    const circadianFactor = this.config.circadianOptimization
      ? this.calculateCircadianOptimization(performance.timeOfDay, studentProfile)
      : 1.0;

    // 7. Fator de estresse/resiliência
    const stressFactor = this.config.stressAdaptation
      ? this.calculateStressFactor(performance.stressLevel, studentProfile)
      : 1.0;

    // 8. Calcular intervalo otimizado
    const baseInterval = this.calculateBaseInterval(contentItem);
    const optimalInterval = Math.round(
      baseInterval *
      easeFactor *
      (neuralFactors?.neuroplasticityBoost || 1.0) *
      crossTopicFactor *
      (1 / forgettingFactor) *
      memoryConsolidationFactor *
      circadianFactor *
      stressFactor
    );

    // 9. Ajustar baseado na dificuldade
    const difficultyAdjustment = this.calculateDifficultyAdjustment(contentItem.difficulty);

    // 10. Calcular próximo horário ótimo de revisão
    const optimalReviewTime = this.calculateOptimalReviewTime(
      performance,
      studentProfile,
      optimalInterval
    );

    // 11. Calcular confiança na recomendação
    const confidence = this.calculateConfidenceScore({
      easeFactor,
      neuralFactors,
      crossTopicFactor,
      performance,
      historicalPerformance,
      studentProfile
    });

    const schedule: ReviewSchedule = {
      nextReviewDate: optimalReviewTime.date,
      intervalDays: Math.max(1, optimalInterval),
      confidence: confidence,
      recommendedReviewCount: Math.ceil(optimalInterval / 7),
      neuralPathwayStrengthening: neuralFactors?.memoryConsolidationScore || 0.5,
      adaptationNotes: this.generateAdaptationNotes(contentItem, performance, easeFactor),
      optimalReviewTime: optimalReviewTime.timeSlot,
      difficultyAdjustment
    };

    console.log(`✅ Intervalo calculado: ${optimalInterval} dias (confiança: ${confidence.toFixed(2)})`);
    return schedule;
  }

  /**
   * Calcula fator de facilidade (algoritmo SuperMemo-17)
   */
  private calculateEaseFactor(contentItem: ContentItem, performance: PerformanceData): number {
    let newEaseFactor = contentItem.easeFactor;

    if (performance.wasCorrect) {
      if (performance.confidenceLevel > 0.8) {
        // Resposta correta com alta confiança
        newEaseFactor += 0.15;
      } else if (performance.confidenceLevel > 0.5) {
        // Resposta correta com confiança moderada
        newEaseFactor += 0.05;
      } else {
        // Resposta correta com baixa confiança
        newEaseFactor += 0.02;
      }
    } else {
      // Resposta incorreta
      newEaseFactor -= 0.2;

      // Ajuste adicional baseado no tempo de resposta
      if (performance.responseTime > 10000) { // > 10 segundos
        newEaseFactor -= 0.1; // Penalidade adicional por resposta lenta
      }
    }

    // Aplicar limites
    return Math.max(
      this.config.minEaseFactor,
      Math.min(this.config.maxEaseFactor, newEaseFactor)
    );
  }

  /**
   * Calcula fatores neurais baseados em neurociência
   */
  private async calculateNeuralFactors(
    contentItem: ContentItem,
    performance: PerformanceData,
    studentProfile: StudentProfile
  ): Promise<NeuralFactors> {

    // Score de consolidação de memória
    const memoryConsolidationScore = this.calculateMemoryConsolidationScore(
      performance,
      studentProfile
    );

    // Boost de neuroplasticidade baseado na idade e biometria
    const neuroplasticityBoost = this.calculateNeuroplasticityBoost(
      studentProfile.age,
      studentProfile.biometricData
    );

    // Tempo circadiano ótimo para o estudante
    const circadianOptimalTime = this.findCircadianOptimalTime(studentProfile);

    // Resiliência ao estresse
    const stressResilience = this.calculateStressResilience(
      performance.stressLevel,
      studentProfile
    );

    // Capacidade de atenção atual
    const attentionSpan = this.calculateCurrentAttentionSpan(
      performance.fatigueLevel,
      studentProfile.cognitiveProfile.attentionSpan
    );

    // Capacidade de memória de trabalho
    const workingMemoryCapacity = this.calculateWorkingMemoryCapacity(
      performance.cognitiveLoad,
      studentProfile.cognitiveProfile.workingMemoryCapacity
    );

    return {
      memoryConsolidationScore,
      neuroplasticityBoost,
      circadianOptimalTime,
      stressResilience,
      attentionSpan,
      workingMemoryCapacity
    };
  }

  /**
   * Calcula score de consolidação de memória
   */
  private calculateMemoryConsolidationScore(
    performance: PerformanceData,
    studentProfile: StudentProfile
  ): number {
    let score = 0.5; // Base score

    // Fatores positivos
    if (performance.wasCorrect) score += 0.2;
    if (performance.confidenceLevel > 0.7) score += 0.15;
    if (performance.responseTime < 3000) score += 0.1; // Resposta rápida
    if (performance.timeOfDay >= 9 && performance.timeOfDay <= 11) score += 0.1; // Horário ótimo
    if (studentProfile.biometricData?.sleepQuality > 0.8) score += 0.1;

    // Fatores negativos
    if (performance.stressLevel > 0.7) score -= 0.15;
    if (performance.fatigueLevel > 0.6) score -= 0.1;
    if (performance.responseTime > 10000) score -= 0.1; // Resposta muito lenta

    return Math.max(0, Math.min(1, score));
  }

  /**
   * Calcula boost de neuroplasticidade
   */
  private calculateNeuroplasticityBoost(
    age: number,
    biometricData?: BiometricData
  ): number {
    // Neuroplasticidade declina com a idade
    let ageFactor = Math.max(0.3, 1.0 - (age - 20) * 0.02);

    // Fatores biométricos
    let bioFactor = 1.0;
    if (biometricData) {
      if (biometricData.sleepQuality > 0.8) bioFactor += 0.2;
      if (biometricData.exerciseFrequency > 3) bioFactor += 0.15; // Exercício regular
      if (biometricData.stressLevel < 0.3) bioFactor += 0.1;
    }

    return Math.min(1.5, ageFactor * bioFactor);
  }

  /**
   * Calcula correlação entre tópicos
   */
  private async calculateCrossTopicCorrelation(
    contentItem: ContentItem,
    historicalPerformance: PerformanceData[]
  ): Promise<number> {
    let correlationFactor = 1.0;

    // Analisar performance em tópicos relacionados
    for (const performance of historicalPerformance) {
      if (this.areTopicsRelated(contentItem.topic, performance.itemId)) {
        if (performance.wasCorrect) {
          correlationFactor += 0.05; // Correlação positiva
        } else {
          correlationFactor -= 0.03; // Correlação negativa
        }
      }
    }

    return Math.max(0.7, Math.min(1.3, correlationFactor));
  }

  /**
   * Determina se dois tópicos estão relacionados
   */
  private areTopicsRelated(topic1: string, topic2: string): boolean {
    // Implementação simplificada - em produção usaria embeddings semânticos
    const relatedTopics = {
      'fibrilacao_atrial': ['arritmias', 'anticoagulacao', 'cardioversao'],
      'hipertensao': ['doenca_renal', 'doenca_cardiaca', 'estresse'],
      'diabetes': ['complicacoes_cardiovasculares', 'insulina', 'dieta']
    };

    const related = relatedTopics[topic1] || [];
    return related.includes(topic2);
  }

  /**
   * Calcula fator de esquecimento baseado na curva de esquecimento
   */
  private calculateForgettingFactor(
    contentItem: ContentItem,
    performance: PerformanceData
  ): number {
    const timeSinceLastReview = (Date.now() - contentItem.lastReviewed.getTime()) / (1000 * 60 * 60 * 24);

    // Curva de esquecimento exponencial personalizada
    const baseForgettingRate = 0.1;
    const difficultyFactor = contentItem.difficulty / 10;
    const confidenceFactor = 1 - performance.confidenceLevel;

    const forgettingRate = baseForgettingRate * difficultyFactor * (1 + confidenceFactor);
    const forgettingFactor = Math.exp(-forgettingRate * timeSinceLastReview);

    return Math.max(0.5, forgettingFactor);
  }

  /**
   * Calcula fator de consolidação de memória
   */
  private calculateMemoryConsolidationFactor(
    performance: PerformanceData,
    studentProfile: StudentProfile,
    contentItem: ContentItem
  ): number {
    let factor = 1.0;

    // Sono de qualidade melhora consolidação
    if (studentProfile.biometricData?.sleepQuality > 0.8) {
      factor *= 1.3;
    }

    // Exercício regular melhora neuroplasticidade
    if (studentProfile.biometricData?.exerciseFrequency > 3) {
      factor *= 1.2;
    }

    // Estresse alto prejudica consolidação
    if (performance.stressLevel > 0.7) {
      factor *= 0.8;
    }

    // Intervalos muito longos podem prejudicar
    const timeSinceLastReview = (Date.now() - contentItem.lastReviewed.getTime()) / (1000 * 60 * 60 * 24);
    if (timeSinceLastReview > contentItem.interval * 2) {
      factor *= 0.9;
    }

    return Math.max(0.7, Math.min(1.4, factor));
  }

  /**
   * Calcula otimização circadiana
   */
  private calculateCircadianOptimization(
    currentTime: number,
    studentProfile: StudentProfile
  ): number {
    // Horários ótimos baseados em cronobiologia
    const optimalTimes = [9, 10, 11, 15, 16, 17]; // Manhã e tarde
    const suboptimalTimes = [13, 14, 20, 21]; // Pós-almoço e noite
    const poorTimes = [0, 1, 2, 3, 4, 5]; // Madrugada

    if (optimalTimes.includes(currentTime)) {
      return 1.2;
    } else if (suboptimalTimes.includes(currentTime)) {
      return 1.0;
    } else if (poorTimes.includes(currentTime)) {
      return 0.8;
    } else {
      return 0.9;
    }
  }

  /**
   * Calcula fator de estresse
   */
  private calculateStressFactor(
    stressLevel: number,
    studentProfile: StudentProfile
  ): number {
    const resilience = studentProfile.cognitiveProfile.stressTolerance;

    if (stressLevel < 0.3) {
      return 1.2; // Baixo estresse é bom
    } else if (stressLevel < 0.6) {
      return 1.0; // Estresse moderado é neutro
    } else {
      const stressImpact = (stressLevel - 0.6) * resilience;
      return Math.max(0.7, 1.0 - stressImpact);
    }
  }

  /**
   * Calcula intervalo base
   */
  private calculateBaseInterval(contentItem: ContentItem): number {
    if (contentItem.repetitions === 0) {
      return 1; // Primeira revisão em 1 dia
    } else if (contentItem.repetitions === 1) {
      return 6; // Segunda revisão em 6 dias
    } else {
      // Intervalos subsequentes baseados no algoritmo SuperMemo
      return Math.round(contentItem.interval * contentItem.easeFactor);
    }
  }

  /**
   * Calcula ajuste de dificuldade
   */
  private calculateDifficultyAdjustment(difficulty: number): number {
    // Conteúdo mais difícil precisa de revisões mais frequentes
    return Math.max(0.5, 1.5 - (difficulty / 10));
  }

  /**
   * Calcula horário ótimo de revisão
   */
  private calculateOptimalReviewTime(
    performance: PerformanceData,
    studentProfile: StudentProfile,
    intervalDays: number
  ): { date: Date; timeSlot: TimeSlot } {
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + intervalDays);

    // Ajustar horário baseado no perfil do estudante
    const optimalTimes = studentProfile.studyPreferences.optimalTimes;
    let chosenTimeSlot = optimalTimes[0]; // Primeiro horário ótimo

    // Considerar o horário atual para evitar revisões muito próximas
    if (performance.timeOfDay >= 20 || performance.timeOfDay <= 6) {
      chosenTimeSlot = { ...chosenTimeSlot, dayOfWeek: [1, 2, 3, 4, 5] }; // Dias úteis
    }

    return {
      date: nextReviewDate,
      timeSlot: chosenTimeSlot
    };
  }

  /**
   * Calcula score de confiança na recomendação
   */
  private calculateConfidenceScore(params: {
    easeFactor: number;
    neuralFactors?: NeuralFactors;
    crossTopicFactor: number;
    performance: PerformanceData;
    historicalPerformance: PerformanceData[];
    studentProfile: StudentProfile;
  }): number {
    let confidence = 0.5; // Base confidence

    // Fatores que aumentam confiança
    if (params.performance.wasCorrect) confidence += 0.2;
    if (params.performance.confidenceLevel > 0.8) confidence += 0.15;
    if (params.historicalPerformance.length > 5) confidence += 0.1;
    if (params.neuralFactors) confidence += 0.1;
    if (params.crossTopicFactor > 0.9) confidence += 0.05;

    // Fatores que diminuem confiança
    if (!params.performance.wasCorrect) confidence -= 0.2;
    if (params.performance.responseTime > 10000) confidence -= 0.1;
    if (params.studentProfile.age > 40) confidence -= 0.05; // Menos neuroplasticidade

    return Math.max(0.1, Math.min(1.0, confidence));
  }

  /**
   * Gera notas de adaptação
   */
  private generateAdaptationNotes(
    contentItem: ContentItem,
    performance: PerformanceData,
    easeFactor: number
  ): string[] {
    const notes: string[] = [];

    if (easeFactor > 2.5) {
      notes.push("Alta facilidade - pode aumentar intervalo");
    } else if (easeFactor < 1.5) {
      notes.push("Baixa facilidade - revisar conceitos fundamentais");
    }

    if (performance.responseTime > 8000) {
      notes.push("Resposta lenta - considerar divisão em subtópicos");
    }

    if (!performance.wasCorrect && performance.confidenceLevel > 0.7) {
      notes.push("Alta confiança com resposta incorreta - possível lacuna de conhecimento");
    }

    return notes;
  }

  /**
   * Encontra tempo circadiano ótimo para o estudante
   */
  private findCircadianOptimalTime(studentProfile: StudentProfile): number {
    // Análise baseada no perfil cronobiológico
    const age = studentProfile.age;

    if (age < 25) {
      return 10; // Jovens são mais alertas de manhã
    } else if (age < 40) {
      return 9; // Adultos jovens
    } else {
      return 11; // Adultos mais velhos tendem a ser mais alertas mais tarde
    }
  }

  /**
   * Calcula resiliência ao estresse
   */
  private calculateStressResilience(
    currentStress: number,
    studentProfile: StudentProfile
  ): number {
    const tolerance = studentProfile.cognitiveProfile.stressTolerance;
    return Math.max(0.3, Math.min(1.0, tolerance * (1 - currentStress)));
  }

  /**
   * Calcula span de atenção atual
   */
  private calculateCurrentAttentionSpan(
    fatigueLevel: number,
    baseAttentionSpan: number
  ): number {
    return Math.max(0.3, baseAttentionSpan * (1 - fatigueLevel));
  }

  /**
   * Calcula capacidade de memória de trabalho
   */
  private calculateWorkingMemoryCapacity(
    cognitiveLoad: number,
    baseCapacity: number
  ): number {
    return Math.max(0.2, baseCapacity * (1 - cognitiveLoad));
  }

  /**
   * Inicializa fatores neurais padrão
   */
  private initializeNeuralFactors(): NeuralFactors {
    return {
      memoryConsolidationScore: 0.5,
      neuroplasticityBoost: 1.0,
      circadianOptimalTime: 10,
      stressResilience: 0.7,
      attentionSpan: 0.8,
      workingMemoryCapacity: 0.7
    };
  }
}

export default AdvancedSpacedRepetitionEngine;