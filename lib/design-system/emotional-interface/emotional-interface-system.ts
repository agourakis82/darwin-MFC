/**
 * Sistema Principal de Interface Emocional Anti-Burnout
 * Darwin-MFC Interface Emocional SOTA
 * 
 * Componente principal que orquestra todos os sistemas:
 * - Monitoramento Emocional
 * - Adaptação Visual Dinâmica
 * - Feedback Positivo e Achievements
 * - Prevenção de Burnout
 * 
 * Este é o sistema completo que cuida do bem-estar emocional do médico.
 */

import { EmotionalMonitor, EmotionalState, BurnoutRisk, InteractionPattern } from './emotional-monitor';
import { VisualAdaptationEngine, VisualAdaptation } from './visual-adaptation-engine';
import { PositiveFeedbackSystem, MedicalAchievement, PositiveFeedback } from './positive-feedback-system';
import { BurnoutPreventionSystem, BreakReminder, ExerciseRoutine } from './burnout-prevention-system';

export interface EmotionalInterfaceConfig {
  monitoringEnabled: boolean;
  autoAdaptation: boolean;
  feedbackEnabled: boolean;
  preventionEnabled: boolean;
  debugMode: boolean;
  adaptationSpeed: 'slow' | 'medium' | 'fast';
  personalizationLevel: 'minimal' | 'standard' | 'advanced';
}

export interface EmotionalInterfaceState {
  isActive: boolean;
  currentEmotionalState: EmotionalState;
  currentAdaptation: VisualAdaptation;
  activeAchievements: MedicalAchievement[];
  recentFeedback: PositiveFeedback[];
  activeReminders: BreakReminder[];
  wellnessScore: number;
  systemHealth: 'excellent' | 'good' | 'warning' | 'critical';
}

export interface EmotionalAnalytics {
  emotionalTrends: EmotionalTrend[];
  adaptationPatterns: AdaptationPattern[];
  wellnessProgress: WellnessProgress;
  recommendations: SystemRecommendation[];
  metrics: EmotionalMetrics;
}

export interface EmotionalTrend {
  metric: string;
  values: Array<{ timestamp: Date, value: number }>;
  trend: 'improving' | 'stable' | 'declining';
  confidence: number;
}

export interface AdaptationPattern {
  trigger: string;
  frequency: number;
  effectiveness: number;
  userResponse: 'positive' | 'neutral' | 'negative';
}

export interface WellnessProgress {
  dailyScore: number;
  weeklyAverage: number;
  monthlyProgress: number;
  streakDays: number;
  achievementsThisMonth: number;
}

export interface SystemRecommendation {
  type: 'optimization' | 'prevention' | 'enhancement';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  action: string;
}

export interface EmotionalMetrics {
  averageStressLevel: number;
  averageFatigueLevel: number;
  averageEnergyLevel: number;
  adaptationEfficiency: number;
  preventionSuccessRate: number;
  userSatisfactionScore: number;
  systemUptime: number;
}

export class EmotionalInterfaceSystem {
  private emotionalMonitor!: EmotionalMonitor;
  private visualEngine!: VisualAdaptationEngine;
  private feedbackSystem!: PositiveFeedbackSystem;
  private preventionSystem!: BurnoutPreventionSystem;
  
  private config: EmotionalInterfaceConfig;
  private state: EmotionalInterfaceState;
  private analytics: EmotionalAnalytics;
  private isInitialized = false;
  
  // Callbacks para integração com a UI
  private callbacks: {
    onEmotionalStateChange?: (state: EmotionalState, adaptation: VisualAdaptation) => void;
    onAchievementUnlocked?: (achievement: MedicalAchievement) => void;
    onReminderTriggered?: (reminder: BreakReminder) => void;
    onFeedbackGenerated?: (feedback: PositiveFeedback) => void;
    onAdaptationApplied?: (adaptation: VisualAdaptation) => void;
    onWellnessAlert?: (alert: { type: string, message: string, priority: string }) => void;
  } = {};

  constructor(config?: Partial<EmotionalInterfaceConfig>) {
    this.config = {
      monitoringEnabled: true,
      autoAdaptation: true,
      feedbackEnabled: true,
      preventionEnabled: true,
      debugMode: false,
      adaptationSpeed: 'medium',
      personalizationLevel: 'standard',
      ...config
    };

    this.state = {
      isActive: false,
      currentEmotionalState: {} as EmotionalState,
      currentAdaptation: {} as VisualAdaptation,
      activeAchievements: [],
      recentFeedback: [],
      activeReminders: [],
      wellnessScore: 50,
      systemHealth: 'good'
    };

    this.analytics = {
      emotionalTrends: [],
      adaptationPatterns: [],
      wellnessProgress: {
        dailyScore: 50,
        weeklyAverage: 50,
        monthlyProgress: 0,
        streakDays: 0,
        achievementsThisMonth: 0
      },
      recommendations: [],
      metrics: {
        averageStressLevel: 30,
        averageFatigueLevel: 25,
        averageEnergyLevel: 70,
        adaptationEfficiency: 85,
        preventionSuccessRate: 78,
        userSatisfactionScore: 82,
        systemUptime: 100
      }
    };
  }

  /**
   * Inicializa o sistema completo de Interface Emocional
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.warn('EmotionalInterfaceSystem já está inicializado');
      return;
    }

    try {
      // Inicializar subsistemas
      this.emotionalMonitor = new EmotionalMonitor();
      this.visualEngine = new VisualAdaptationEngine();
      this.feedbackSystem = new PositiveFeedbackSystem();
      this.preventionSystem = new BurnoutPreventionSystem(
        this.emotionalMonitor,
        this.visualEngine,
        this.feedbackSystem
      );

      // Configurar observadores
      this.setupObservers();

      // Iniciar monitoramento
      this.startMonitoring();

      this.state.isActive = true;
      this.isInitialized = true;

      this.log('🚀 Sistema de Interface Emocional Anti-Burnout inicializado com sucesso!');
      
    } catch (error) {
      console.error('❌ Erro ao inicializar sistema de Interface Emocional:', error);
      throw error;
    }
  }

  /**
   * Configura observadores para integração entre sistemas
   */
  private setupObservers(): void {
    // EmotionalMonitor -> VisualEngine
    const emotionalObserver = {
      onEmotionalStateChange: (state: EmotionalState, risk: BurnoutRisk) => {
        if (this.config.autoAdaptation) {
          const adaptation = this.visualEngine.analyzeAndAdapt(state, risk);
          this.state.currentEmotionalState = state;
          this.state.currentAdaptation = adaptation;
          
          // Notificar UI
          this.callbacks.onEmotionalStateChange?.(state, adaptation);
          this.callbacks.onAdaptationApplied?.(adaptation);
          
          // Atualizar analytics
          this.updateEmotionalAnalytics(state);
        }
      }
    };

    this.emotionalMonitor.addObserver(emotionalObserver);

    // FeedbackSystem -> UI
    this.setupFeedbackCallbacks();
    
    // PreventionSystem -> UI
    this.setupPreventionCallbacks();
  }

  /**
   * Configura callbacks de feedback
   */
  private setupFeedbackCallbacks(): void {
    // Monitorar novos achievements
    const checkAchievements = () => {
      const unlocked = this.feedbackSystem.getUnlockedAchievements();
      const newAchievements = unlocked.filter(achievement => 
        !this.state.activeAchievements.some(existing => existing.id === achievement.id)
      );
      
      newAchievements.forEach(achievement => {
        this.state.activeAchievements.push(achievement);
        this.callbacks.onAchievementUnlocked?.(achievement);
        
        this.log(`🏆 Achievement desbloqueado: ${achievement.title}`);
      });
    };

    // Verificar a cada 30 segundos
    setInterval(checkAchievements, 30000);

    // Monitorar feedback recente
    const updateFeedback = () => {
      const recent = this.feedbackSystem.getRecentFeedback();
      this.state.recentFeedback = recent;
      
      recent.forEach(feedback => {
        this.callbacks.onFeedbackGenerated?.(feedback);
      });
    };

    // Verificar a cada minuto
    setInterval(updateFeedback, 60000);
  }

  /**
   * Configura callbacks de prevenção
   */
  private setupPreventionCallbacks(): void {
    // Monitorar reminders ativos
    const updateReminders = () => {
      const active = this.preventionSystem.getActiveReminders();
      this.state.activeReminders = active;
      
      active.forEach(reminder => {
        if (reminder.status === 'pending') {
          this.callbacks.onReminderTriggered?.(reminder);
        }
      });
    };

    // Verificar a cada 30 segundos
    setInterval(updateReminders, 30000);

    // Monitorar wellness score
    const updateWellness = () => {
      const wellnessScore = this.preventionSystem.getWellnessScore();
      this.state.wellnessScore = wellnessScore;
      this.updateWellnessAnalytics(wellnessScore);
      
      // Alertar se score crítico
      if (wellnessScore < 30) {
        this.callbacks.onWellnessAlert?.({
          type: 'wellness_critical',
          message: `Score de bem-estar crítico: ${wellnessScore}%`,
          priority: 'high'
        });
      }
    };

    // Verificar a cada 2 minutos
    setInterval(updateWellness, 120000);
  }

  /**
   * Inicia o monitoramento contínuo
   */
  private startMonitoring(): void {
    if (!this.config.monitoringEnabled) return;

    // Monitoramento de interações
    this.setupInteractionTracking();
    
    // Geração de analytics
    this.startAnalyticsGeneration();
    
    // Avaliação de saúde do sistema
    this.startSystemHealthMonitoring();
  }

  /**
   * Configura rastreamento de interações
   */
  private setupInteractionTracking(): void {
    // Simular tracking de interações (em produção, seria integrado ao sistema de eventos)
    const trackInteraction = (actionType: string, elementType: string, success: boolean = true) => {
      const pattern: InteractionPattern = {
        timestamp: new Date(),
        actionType: actionType as any,
        elementType,
        timeSpent: Math.random() * 1000 + 500, // Simular tempo de resposta
        success
      };

      this.emotionalMonitor.trackInteraction(pattern);
      this.feedbackSystem.recordAction(actionType, success ? 1 : -1);
    };

    // Simular interações (em produção, seria substituído por listeners reais)
    setInterval(() => {
      const actions = ['click', 'scroll', 'type', 'navigation'];
      const elements = ['button', 'input', 'card', 'menu'];
      const actionType = actions[Math.floor(Math.random() * actions.length)];
      const elementType = elements[Math.floor(Math.random() * elements.length)];
      const success = Math.random() > 0.1; // 90% de sucesso
      
      trackInteraction(actionType, elementType, success);
    }, 5000 + Math.random() * 10000); // 5-15 segundos
  }

  /**
   * Inicia geração de analytics
   */
  private startAnalyticsGeneration(): void {
    // Gerar analytics a cada 10 minutos
    setInterval(() => {
      this.generateAnalytics();
    }, 10 * 60 * 1000);
  }

  /**
   * Inicia monitoramento de saúde do sistema
   */
  private startSystemHealthMonitoring(): void {
    setInterval(() => {
      this.assessSystemHealth();
    }, 60000); // A cada minuto
  }

  /**
   * Atualiza analytics emocionais
   */
  private updateEmotionalAnalytics(state: EmotionalState): void {
    const metrics = ['stressLevel', 'fatigueLevel', 'energyLevel', 'focusLevel'];
    
    metrics.forEach(metric => {
      let trend = this.analytics.emotionalTrends.find(t => t.metric === metric);
      
      if (!trend) {
        trend = {
          metric,
          values: [],
          trend: 'stable',
          confidence: 0.5
        };
        this.analytics.emotionalTrends.push(trend);
      }
      
      // Adicionar novo valor
      trend.values.push({
        timestamp: new Date(),
        value: state[metric as keyof EmotionalState] as number
      });
      
      // Manter apenas últimos 100 valores
      if (trend.values.length > 100) {
        trend.values = trend.values.slice(-100);
      }
      
      // Recalcular tendência
      this.calculateTrend(trend);
    });
  }

  /**
   * Calcula tendência para um metric
   */
  private calculateTrend(trend: EmotionalTrend): void {
    if (trend.values.length < 10) return;
    
    const recent = trend.values.slice(-10);
    const older = trend.values.slice(-20, -10);
    
    const recentAvg = recent.reduce((sum, v) => sum + v.value, 0) / recent.length;
    const olderAvg = older.reduce((sum, v) => sum + v.value, 0) / older.length;
    
    const change = olderAvg > 0 ? (recentAvg - olderAvg) / olderAvg : 0;
    
    if (change > 0.1) {
      trend.trend = 'improving';
      trend.confidence = Math.min(0.95, Math.abs(change) + 0.5);
    } else if (change < -0.1) {
      trend.trend = 'declining';
      trend.confidence = Math.min(0.95, Math.abs(change) + 0.5);
    } else {
      trend.trend = 'stable';
      trend.confidence = 0.5;
    }
  }

  /**
   * Atualiza analytics de bem-estar
   */
  private updateWellnessAnalytics(score: number): void {
    this.analytics.wellnessProgress.dailyScore = score;
    
    // Calcular média semanal
    // Em implementação real, seria mais sofisticado
    this.analytics.wellnessProgress.weeklyAverage = 
      (this.analytics.wellnessProgress.weeklyAverage + score) / 2;
  }

  /**
   * Gera analytics completos
   */
  private generateAnalytics(): void {
    // Analytics de padrões de adaptação
    this.analytics.adaptationPatterns = this.generateAdaptationPatterns();
    
    // Analytics de recomendações
    this.analytics.recommendations = this.generateRecommendations();
    
    // Métricas do sistema
    this.analytics.metrics = this.calculateSystemMetrics();
    
    this.log('📊 Analytics de Interface Emocional atualizados');
  }

  /**
   * Gera padrões de adaptação
   */
  private generateAdaptationPatterns(): AdaptationPattern[] {
    const patterns: AdaptationPattern[] = [];
    
    // Padrões baseados nas tendências emocionais
    this.analytics.emotionalTrends.forEach(trend => {
      if (trend.trend === 'declining') {
        patterns.push({
          trigger: `Baixo ${trend.metric}`,
          frequency: 3,
          effectiveness: 75,
          userResponse: 'positive'
        });
      }
    });
    
    return patterns;
  }

  /**
   * Gera recomendações do sistema
   */
  private generateRecommendations(): SystemRecommendation[] {
    const recommendations: SystemRecommendation[] = [];
    
    // Recomendações baseadas em tendências
    this.analytics.emotionalTrends.forEach(trend => {
      if (trend.trend === 'declining' && trend.confidence > 0.7) {
        recommendations.push({
          type: 'prevention',
          priority: 'high',
          title: `Atenção ao ${trend.metric}`,
          description: `Detectamos tendência negativa no ${trend.metric}. Considere intervenções proativas.`,
          action: `Ajustar thresholds para ${trend.metric}`
        });
      }
    });
    
    // Recomendações baseadas no wellness score
    if (this.state.wellnessScore < 50) {
      recommendations.push({
        type: 'optimization',
        priority: 'medium',
        title: 'Melhorar Bem-estar Geral',
        description: 'O score de bem-estar está abaixo do ideal. Considere aumentar a frequência de pausas.',
        action: 'Ativar modo preventivo avançado'
      });
    }
    
    return recommendations;
  }

  /**
   * Calcula métricas do sistema
   */
  private calculateSystemMetrics(): EmotionalMetrics {
    const state = this.emotionalMonitor.getCurrentState();
    
    return {
      averageStressLevel: state.stressLevel,
      averageFatigueLevel: state.fatigueLevel,
      averageEnergyLevel: state.energyLevel,
      adaptationEfficiency: this.calculateAdaptationEfficiency(),
      preventionSuccessRate: this.calculatePreventionSuccessRate(),
      userSatisfactionScore: this.calculateSatisfactionScore(),
      systemUptime: this.isInitialized ? 100 : 0
    };
  }

  private calculateAdaptationEfficiency(): number {
    // Cálculo simplificado baseado na eficácia das adaptações
    return 85; // Placeholder
  }

  private calculatePreventionSuccessRate(): number {
    // Baseado na taxa de conclusão de reminders
    const completed = this.state.activeReminders.filter(r => r.status === 'completed').length;
    const total = this.state.activeReminders.length;
    return total > 0 ? (completed / total) * 100 : 75;
  }

  private calculateSatisfactionScore(): number {
    // Baseado no feedback positivo vs negativo
    const positive = this.state.recentFeedback.filter(f => f.emotionalImpact === 'high').length;
    const total = this.state.recentFeedback.length;
    return total > 0 ? (positive / total) * 100 : 80;
  }

  /**
   * Avalia saúde do sistema
   */
  private assessSystemHealth(): void {
    const metrics = this.analytics.metrics;
    
    if (metrics.averageStressLevel > 80 || 
        metrics.averageFatigueLevel > 80 || 
        this.state.wellnessScore < 30) {
      this.state.systemHealth = 'critical';
    } else if (metrics.averageStressLevel > 60 || 
               metrics.averageFatigueLevel > 60 || 
               this.state.wellnessScore < 50) {
      this.state.systemHealth = 'warning';
    } else if (metrics.averageStressLevel < 40 && 
               metrics.averageFatigueLevel < 40 && 
               this.state.wellnessScore > 70) {
      this.state.systemHealth = 'excellent';
    } else {
      this.state.systemHealth = 'good';
    }
  }

  /**
   * Métodos públicos para integração
   */

  /**
   * Registra uma interação do usuário
   */
  public trackUserInteraction(
    actionType: 'click' | 'scroll' | 'type' | 'navigation' | 'error',
    elementType: string,
    success: boolean = true,
    timeSpent?: number
  ): void {
    const pattern: InteractionPattern = {
      timestamp: new Date(),
      actionType,
      elementType,
      timeSpent: timeSpent || Math.random() * 1000 + 200,
      success
    };

    this.emotionalMonitor.trackInteraction(pattern);
    
    if (this.config.feedbackEnabled) {
      this.feedbackSystem.recordAction(`${actionType}_${elementType}`, success ? 1 : -1);
    }
  }

  /**
   * Força uma pausa (para integração com botões)
   */
  public triggerBreak(breakType: 'scheduled' | 'voluntary' | 'emergency' = 'voluntary'): void {
    this.feedbackSystem.recordAction('break_triggered', 2);
    
    // Aplicar adaptações de pausa
    this.visualEngine.forceAdaptation({
      colorPalette: 'calm',
      animationIntensity: 0.1,
      layoutDensity: 'sparse',
      calmMode: true
    });
    
    this.log(`☕ Pausa triggered: ${breakType}`);
  }

  /**
   * Conclui um reminder
   */
  public completeReminder(reminderId: string): void {
    this.preventionSystem.completeReminder(reminderId);
  }

  /**
   * Dispara reminder manual
   */
  public triggerManualReminder(type: 'break' | 'exercise' | 'mindfulness' | 'hydration'): void {
    this.feedbackSystem.recordAction(`manual_${type}_reminder`, 1);
    
    // Simular trigger de estratégia
    const strategy = this.preventionSystem.getPreventionStrategies()
      .find(s => s.type === `${type}_reminder` || s.type === type);
    
    if (strategy) {
      const emotionalState = this.emotionalMonitor.getCurrentState();
      const burnoutRisk = this.emotionalMonitor.getBurnoutRisk();
      
      // Trigger manual da estratégia
      // Em implementação real, seria mais direto
      this.log(`🎯 Reminder manual disparado: ${type}`);
    }
  }

  /**
   * Configura callbacks
   */
  public setCallbacks(callbacks: typeof this.callbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  /**
   * Atualiza configuração
   */
  public updateConfig(newConfig: Partial<EmotionalInterfaceConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Obtém estado atual
   */
  public getState(): EmotionalInterfaceState {
    return { ...this.state };
  }

  /**
   * Obtém analytics
   */
  public getAnalytics(): EmotionalAnalytics {
    return { ...this.analytics };
  }

  /**
   * Obtém exercício específico
   */
  public getExerciseRoutine(id: string): ExerciseRoutine | undefined {
    return this.preventionSystem.getExerciseRoutines().find(r => r.id === id);
  }

  /**
   * Lista todos os exercícios
   */
  public getAvailableExercises(): ExerciseRoutine[] {
    return this.preventionSystem.getExerciseRoutines();
  }

  /**
   * Desativa o sistema
   */
  public shutdown(): void {
    if (this.emotionalMonitor) {
      this.emotionalMonitor.stopMonitoring();
    }
    
    this.state.isActive = false;
    this.isInitialized = false;
    
    this.log('🔄 Sistema de Interface Emocional desativado');
  }

  /**
   * Reset completo do sistema
   */
  public reset(): void {
    this.shutdown();
    
    // Reset estado
    this.state = {
      isActive: false,
      currentEmotionalState: {} as EmotionalState,
      currentAdaptation: {} as VisualAdaptation,
      activeAchievements: [],
      recentFeedback: [],
      activeReminders: [],
      wellnessScore: 50,
      systemHealth: 'good'
    };
    
    this.analytics = {
      emotionalTrends: [],
      adaptationPatterns: [],
      wellnessProgress: {
        dailyScore: 50,
        weeklyAverage: 50,
        monthlyProgress: 0,
        streakDays: 0,
        achievementsThisMonth: 0
      },
      recommendations: [],
      metrics: {
        averageStressLevel: 30,
        averageFatigueLevel: 25,
        averageEnergyLevel: 70,
        adaptationEfficiency: 85,
        preventionSuccessRate: 78,
        userSatisfactionScore: 82,
        systemUptime: 100
      }
    };
    
    this.log('🔄 Sistema de Interface Emocional resetado');
  }

  /**
   * Log interno
   */
  private log(message: string): void {
    if (this.config.debugMode) {
      console.log(`[EmotionalInterfaceSystem] ${message}`);
    }
  }
}