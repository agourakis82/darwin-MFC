/**
 * Sistema de Prevenção de Burnout e Lembretes Inteligentes
 * Darwin-MFC Interface Emocional SOTA
 * 
 * Sistema que combina monitoramento emocional, feedback positivo e adaptações visuais
 * para prevenir proativamente o burnout médico através de intervenções inteligentes.
 */

import { EmotionalMonitor, EmotionalState, BurnoutRisk } from './emotional-monitor';
import { VisualAdaptationEngine } from './visual-adaptation-engine';
import { PositiveFeedbackSystem } from './positive-feedback-system';

export interface PreventionStrategy {
  id: string;
  type: 'break_reminder' | 'exercise' | 'mindfulness' | 'hydration' | 'eye_rest' | 'posture' | 'ergonomic';
  trigger: TriggerCondition;
  intervention: Intervention;
  priority: 'low' | 'medium' | 'high' | 'critical';
  effectiveness: number; // 0-100
}

export interface TriggerCondition {
  type: 'time_based' | 'behavioral' | 'emotional' | 'physiological';
  threshold: number;
  window: number; // em minutos
  conditions: Array<{
    metric: string;
    operator: '>' | '<' | '>=' | '<=' | '==';
    value: number | string;
  }>;
}

export interface Intervention {
  title: string;
  description: string;
  instructions: string[];
  duration: number; // em minutos
  type: 'passive' | 'active' | 'interactive';
  animation?: string;
  sound?: boolean;
  visualCue?: string;
}

export interface BreakReminder {
  id: string;
  scheduledAt: Date;
  type: 'scheduled' | 'adaptive' | 'emergency';
  status: 'pending' | 'active' | 'completed' | 'dismissed';
  intervention: Intervention;
  emotionalContext: EmotionalContext;
}

export interface EmotionalContext {
  stressLevel: number;
  fatigueLevel: number;
  energyLevel: number;
  focusLevel: number;
  burnoutRisk: number;
  recommendedIntervention: PreventionStrategy;
}

export interface ExerciseRoutine {
  id: string;
  name: string;
  category: 'eye' | 'neck' | 'back' | 'wrist' | 'breathing' | 'full_body';
  duration: number; // em minutos
  difficulty: 'easy' | 'medium' | 'advanced';
  steps: ExerciseStep[];
  benefits: string[];
  contraindications: string[];
}

export interface ExerciseStep {
  instruction: string;
  duration: number; // em segundos
  visual: string;
  audio?: string;
  breathingPattern?: string;
}

export class BurnoutPreventionSystem {
  private emotionalMonitor: EmotionalMonitor;
  private visualEngine: VisualAdaptationEngine;
  private feedbackSystem: PositiveFeedbackSystem;
  
  private preventionStrategies: PreventionStrategy[] = [];
  private activeReminders: Map<string, BreakReminder> = new Map();
  private exerciseRoutines: ExerciseRoutine[] = [];
  private userPreferences: UserPreferences;
  private interventionHistory: Array<{
    strategy: PreventionStrategy;
    timestamp: Date;
    effectiveness: number;
    userResponse: 'accepted' | 'dismissed' | 'completed';
  }> = [];

  // Thresholds para diferentes tipos de prevenção
  private readonly PREVENTION_THRESHOLDS = {
    STRESS_HIGH: 70,
    FATIGUE_HIGH: 75,
    FOCUS_LOW: 35,
    ENERGY_LOW: 30,
    SESSION_LONG: 90, // minutos
    NO_BREAK: 120, // minutos sem pausa
    ERROR_RATE_HIGH: 0.15,
    TYPING_FAST: 200, // chars por minuto (stress)
    TYPING_SLOW: 30 // chars por minuto (fadiga)
  };

  constructor(
    emotionalMonitor: EmotionalMonitor,
    visualEngine: VisualAdaptationEngine,
    feedbackSystem: PositiveFeedbackSystem
  ) {
    this.emotionalMonitor = emotionalMonitor;
    this.visualEngine = visualEngine;
    this.feedbackSystem = feedbackSystem;
    
    this.userPreferences = this.loadUserPreferences();
    this.initializePreventionStrategies();
    this.initializeExerciseRoutines();
    this.startPreventionMonitoring();
  }

  /**
   * Inicia o monitoramento preventivo contínuo
   */
  private startPreventionMonitoring(): void {
    // Verificar a cada 30 segundos
    setInterval(() => {
      this.checkPreventionTriggers();
      this.manageActiveReminders();
      this.assessInterventionEffectiveness();
    }, 30000);

    // Verificação mais profunda a cada 5 minutos
    setInterval(() => {
      this.comprehensiveWellnessCheck();
    }, 5 * 60 * 1000);
  }

  /**
   * Verifica triggers de prevenção
   */
  private checkPreventionTriggers(): void {
    const emotionalState = this.emotionalMonitor.getCurrentState();
    const burnoutRisk = this.emotionalMonitor.getBurnoutRisk();

    // Verificar cada estratégia de prevenção
    this.preventionStrategies.forEach(strategy => {
      if (this.shouldTriggerStrategy(strategy, emotionalState, burnoutRisk)) {
        this.triggerIntervention(strategy, emotionalState, burnoutRisk);
      }
    });
  }

  /**
   * Determina se uma estratégia deve ser acionada
   */
  private shouldTriggerStrategy(
    strategy: PreventionStrategy,
    emotionalState: EmotionalState,
    burnoutRisk: BurnoutRisk
  ): boolean {
    // Verificar se já existe um reminder similar ativo
    const existingReminder = Array.from(this.activeReminders.values()).find(reminder => 
      reminder.intervention.title === strategy.intervention.title && 
      reminder.status === 'active'
    );
    
    if (existingReminder) return false;

    // Avaliar condições baseadas no tipo de trigger
    switch (strategy.trigger.type) {
      case 'time_based':
        return this.checkTimeBasedTrigger(strategy);
      
      case 'behavioral':
        return this.checkBehavioralTrigger(strategy, emotionalState);
      
      case 'emotional':
        return this.checkEmotionalTrigger(strategy, emotionalState, burnoutRisk);
      
      case 'physiological':
        return this.checkPhysiologicalTrigger(strategy, emotionalState);
      
      default:
        return false;
    }
  }

  /**
   * Verifica triggers baseados em tempo
   */
  private checkTimeBasedTrigger(strategy: PreventionStrategy): boolean {
    // Implementação simplificada - em produção seria mais sofisticada
    const now = new Date();
    const timeSinceLastBreak = this.getTimeSinceLastBreak();
    
    switch (strategy.id) {
      case 'regular_break':
        return timeSinceLastBreak > this.PREVENTION_THRESHOLDS.NO_BREAK;
      case 'eye_rest_20':
        return timeSinceLastBreak > 20;
      case 'hydration_hourly':
        return now.getMinutes() === 0; // A cada hora
      default:
        return false;
    }
  }

  /**
   * Verifica triggers comportamentais
   */
  private checkBehavioralTrigger(strategy: PreventionStrategy, emotionalState: EmotionalState): boolean {
    switch (strategy.id) {
      case 'typing_fast_stress':
        return emotionalState.typingSpeed > this.PREVENTION_THRESHOLDS.TYPING_FAST &&
               emotionalState.stressLevel > this.PREVENTION_THRESHOLDS.STRESS_HIGH;
      
      case 'typing_slow_fatigue':
        return emotionalState.typingSpeed < this.PREVENTION_THRESHOLDS.TYPING_SLOW &&
               emotionalState.fatigueLevel > this.PREVENTION_THRESHOLDS.FATIGUE_HIGH;
      
      case 'high_error_rate':
        return emotionalState.errorRate > this.PREVENTION_THRESHOLDS.ERROR_RATE_HIGH;
      
      default:
        return false;
    }
  }

  /**
   * Verifica triggers emocionais
   */
  private checkEmotionalTrigger(
    strategy: PreventionStrategy,
    emotionalState: EmotionalState,
    burnoutRisk: BurnoutRisk
  ): boolean {
    switch (strategy.id) {
      case 'stress_management':
        return emotionalState.stressLevel > this.PREVENTION_THRESHOLDS.STRESS_HIGH;
      
      case 'fatigue_recovery':
        return emotionalState.fatigueLevel > this.PREVENTION_THRESHOLDS.FATIGUE_HIGH;
      
      case 'energy_boost':
        return emotionalState.energyLevel < this.PREVENTION_THRESHOLDS.ENERGY_LOW;
      
      case 'focus_enhancement':
        return emotionalState.focusLevel < this.PREVENTION_THRESHOLDS.FOCUS_LOW;
      
      case 'burnout_prevention':
        return burnoutRisk.current > 70;
      
      default:
        return false;
    }
  }

  /**
   * Verifica triggers fisiológicos
   */
  private checkPhysiologicalTrigger(strategy: PreventionStrategy, emotionalState: EmotionalState): boolean {
    // Em uma implementação real, isso poderia incluir dados de wearables
    // Por enquanto, usamos proxies dos dados emocionais
    switch (strategy.id) {
      case 'posture_correction':
        return emotionalState.sessionDuration > 60; // Mais de 1 hora
      
      case 'eye_strain_relief':
        return emotionalState.sessionDuration > 45; // Mais de 45 minutos
      
      default:
        return false;
    }
  }

  /**
   * Dispara uma intervenção
   */
  private triggerIntervention(
    strategy: PreventionStrategy,
    emotionalState: EmotionalState,
    burnoutRisk: BurnoutRisk
  ): void {
    const reminder: BreakReminder = {
      id: `reminder_${Date.now()}`,
      scheduledAt: new Date(),
      type: this.determineReminderType(strategy, emotionalState),
      status: 'pending',
      intervention: strategy.intervention,
      emotionalContext: {
        stressLevel: emotionalState.stressLevel,
        fatigueLevel: emotionalState.fatigueLevel,
        energyLevel: emotionalState.energyLevel,
        focusLevel: emotionalState.focusLevel,
        burnoutRisk: burnoutRisk.current,
        recommendedIntervention: strategy
      }
    };

    this.activeReminders.set(reminder.id, reminder);
    
    // Notificar o usuário
    this.presentReminder(reminder);
    
    // Registrar a ação
    this.feedbackSystem.recordAction(`intervention_${strategy.type}`, strategy.priority === 'critical' ? 3 : 1);
  }

  /**
   * Determina o tipo de reminder baseado no contexto
   */
  private determineReminderType(strategy: PreventionStrategy, emotionalState: EmotionalState): BreakReminder['type'] {
    if (strategy.priority === 'critical' || emotionalState.stressLevel > 85) {
      return 'emergency';
    }
    
    if (strategy.trigger.type === 'time_based') {
      return 'scheduled';
    }
    
    return 'adaptive';
  }

  /**
   * Apresenta o reminder ao usuário
   */
  private presentReminder(reminder: BreakReminder): void {
    // Em uma implementação real, isso integraria com o sistema de notificações
    // Por enquanto, registramos e deixamos que o sistema visual se adapte
    
    console.log('🔔 Burnout Prevention Reminder:', {
      title: reminder.intervention.title,
      description: reminder.intervention.description,
      priority: reminder.emotionalContext.recommendedIntervention.priority,
      stressLevel: reminder.emotionalContext.stressLevel
    });

    // Aplicar adaptações visuais baseadas no reminder
    this.applyReminderVisualAdaptations(reminder);
  }

  /**
   * Aplica adaptações visuais baseadas no reminder
   */
  private applyReminderVisualAdaptations(reminder: BreakReminder): void {
    const { emotionalContext } = reminder;
    
    // Ajustar a interface baseado no nível de estresse
    if (emotionalContext.stressLevel > 75) {
      this.visualEngine.forceAdaptation({
        colorPalette: 'calm',
        animationIntensity: 0.2,
        layoutDensity: 'sparse',
        calmMode: true
      });
    }

    if (emotionalContext.energyLevel < 30) {
      this.visualEngine.forceAdaptation({
        colorPalette: 'energizing',
        animationIntensity: 0.7,
        energyBoostMode: true
      });
    }

    if (emotionalContext.burnoutRisk > 70) {
      this.visualEngine.forceAdaptation({
        colorPalette: 'calm',
        typographyScale: 1.2,
        layoutDensity: 'sparse',
        calmMode: true
      });
    }
  }

  /**
   * Gerencia reminders ativos
   */
  private manageActiveReminders(): void {
    const now = new Date();
    
    this.activeReminders.forEach((reminder, id) => {
      // Remover reminders expirados
      if (reminder.status === 'pending') {
        const timeSinceScheduled = now.getTime() - reminder.scheduledAt.getTime();
        if (timeSinceScheduled > 5 * 60 * 1000) { // 5 minutos
          reminder.status = 'dismissed';
          this.activeReminders.delete(id);
        }
      }
    });
  }

  /**
   * Avalia a eficácia das intervenções
   */
  private assessInterventionEffectiveness(): void {
    // Implementação simplificada - em produção seria mais sofisticada
    this.interventionHistory.forEach(intervention => {
      if (intervention.userResponse === 'completed') {
        // Aumentar effectiveness se foi bem-sucedida
        intervention.effectiveness = Math.min(100, intervention.effectiveness + 5);
      } else if (intervention.userResponse === 'dismissed') {
        // Diminuir effectiveness se foi rejeitada
        intervention.effectiveness = Math.max(0, intervention.effectiveness - 10);
      }
    });
  }

  /**
   * Verificação abrangente de bem-estar
   */
  private comprehensiveWellnessCheck(): void {
    const emotionalState = this.emotionalMonitor.getCurrentState();
    const burnoutRisk = this.emotionalMonitor.getBurnoutRisk();
    
    // Gerar insights mensais se for hora
    const insights = this.feedbackSystem.generateMonthlyInsights();
    
    // Ajustar estratégias baseadas nos insights
    this.adaptStrategiesBasedOnInsights(insights);
    
    // Verificar se precisa de intervention de emergência
    if (this.requiresEmergencyIntervention(emotionalState, burnoutRisk)) {
      this.triggerEmergencyIntervention();
    }
  }

  /**
   * Determina se precisa de intervenção de emergência
   */
  private requiresEmergencyIntervention(
    emotionalState: EmotionalState,
    burnoutRisk: BurnoutRisk
  ): boolean {
    return (
      emotionalState.stressLevel > 90 ||
      emotionalState.fatigueLevel > 90 ||
      emotionalState.energyLevel < 15 ||
      burnoutRisk.current > 85 ||
      (emotionalState.errorRate > 0.2 && emotionalState.sessionDuration > 180)
    );
  }

  /**
   * Dispara intervenção de emergência
   */
  private triggerEmergencyIntervention(): void {
    const emergencyStrategy: PreventionStrategy = {
      id: 'emergency_recovery',
      type: 'mindfulness',
      trigger: {
        type: 'emotional',
        threshold: 90,
        window: 5,
        conditions: []
      },
      intervention: {
        title: 'PARE! Moment de Recuperação de Emergência',
        description: 'Detectamos sinais críticos de sobrecarga. É hora de uma pausa imediata.',
        instructions: [
          '1. Feche os olhos por 30 segundos',
          '2. Respire profundamente 5 vezes',
          '3. Beba um copo de água',
          '4. Faça alongamentos suaves',
          '5. Considere fazer uma pausa de 10-15 minutos'
        ],
        duration: 5,
        type: 'active',
        visualCue: 'urgent-pulse'
      },
      priority: 'critical',
      effectiveness: 85
    };

    const emotionalState = this.emotionalMonitor.getCurrentState();
    const burnoutRisk = this.emotionalMonitor.getBurnoutRisk();
    
    this.triggerIntervention(emergencyStrategy, emotionalState, burnoutRisk);
  }

  /**
   * Inicializa estratégias de prevenção
   */
  private initializePreventionStrategies(): void {
    this.preventionStrategies = [
      {
        id: 'regular_break',
        type: 'break_reminder',
        trigger: {
          type: 'time_based',
          threshold: this.PREVENTION_THRESHOLDS.NO_BREAK,
          window: 30,
          conditions: []
        },
        intervention: {
          title: 'Hora da Pausa! ☕',
          description: 'Você está trabalhando há muito tempo. Uma pausa rápida pode melhorar sua eficiência.',
          instructions: [
            '1. Afaste-se da tela por alguns minutos',
            '2. Faça alguns alongamentos suaves',
            '3. Olhe para algo distante para relaxar os olhos',
            '4. Beba água'
          ],
          duration: 5,
          type: 'passive'
        },
        priority: 'medium',
        effectiveness: 78
      },
      {
        id: 'stress_management',
        type: 'mindfulness',
        trigger: {
          type: 'emotional',
          threshold: this.PREVENTION_THRESHOLDS.STRESS_HIGH,
          window: 10,
          conditions: [
            { metric: 'stressLevel', operator: '>', value: this.PREVENTION_THRESHOLDS.STRESS_HIGH }
          ]
        },
        intervention: {
          title: 'Respire e Relaxe 🧘‍♀️',
          description: 'Vamos fazer alguns exercícios de respiração para reduzir o estresse.',
          instructions: [
            '1. Sente-se confortavelmente',
            '2. Inspire profundamente pelo nariz (4 segundos)',
            '3. Segure a respiração (4 segundos)',
            '4. Expire pela boca (6 segundos)',
            '5. Repita 5 vezes'
          ],
          duration: 3,
          type: 'active',
          animation: 'breathing-guide'
        },
        priority: 'high',
        effectiveness: 85
      },
      {
        id: 'eye_rest_20',
        type: 'eye_rest',
        trigger: {
          type: 'time_based',
          threshold: 20,
          window: 5,
          conditions: []
        },
        intervention: {
          title: 'Descanso Visual 👀',
          description: 'Regra 20-20-20: A cada 20 minutos, olhe algo a 20 pés por 20 segundos.',
          instructions: [
            '1. Olhe para algo distante (pela janela)',
            '2. Pisque várias vezes',
            '3. Massageie levemente as têmporas',
            '4. Ajuste a posição da tela se necessário'
          ],
          duration: 1,
          type: 'passive'
        },
        priority: 'medium',
        effectiveness: 72
      },
      {
        id: 'energy_boost',
        type: 'exercise',
        trigger: {
          type: 'emotional',
          threshold: this.PREVENTION_THRESHOLDS.ENERGY_LOW,
          window: 15,
          conditions: [
            { metric: 'energyLevel', operator: '<', value: this.PREVENTION_THRESHOLDS.ENERGY_LOW }
          ]
        },
        intervention: {
          title: 'Energize-se! ⚡',
          description: 'Alguns exercícios rápidos podem aumentar sua energia e disposição.',
          instructions: [
            '1. Levante-se da cadeira',
            '2. Gire os ombros para trás 5 vezes',
            '3. Estique os braços para cima',
            '4. Gire o pescoço delicadamente',
            '5. Caminhe por 1 minuto'
          ],
          duration: 2,
          type: 'active'
        },
        priority: 'high',
        effectiveness: 80
      },
      {
        id: 'hydration_hourly',
        type: 'hydration',
        trigger: {
          type: 'time_based',
          threshold: 60,
          window: 5,
          conditions: []
        },
        intervention: {
          title: 'Hidratação 💧',
          description: 'Beba água regularmente para manter o foco e a energia.',
          instructions: [
            '1. Beba um copo de água',
            '2. Mantenha uma garrafa por perto',
            '3. Estabeleça lembretes regulares',
            '4. Evite excesso de cafeína'
          ],
          duration: 1,
          type: 'passive'
        },
        priority: 'low',
        effectiveness: 65
      }
    ];
  }

  /**
   * Inicializa rotinas de exercício
   */
  private initializeExerciseRoutines(): void {
    this.exerciseRoutines = [
      {
        id: 'eye_relief_routine',
        name: 'Rotina de Alívio Visual',
        category: 'eye',
        duration: 3,
        difficulty: 'easy',
        steps: [
          {
            instruction: 'Feche os olhos e relaxe',
            duration: 30,
            visual: 'eyes-closed',
            breathingPattern: 'deep'
          },
          {
            instruction: 'Pisque rapidamente 10 vezes',
            duration: 15,
            visual: 'blinking',
          },
          {
            instruction: 'Mova os olhos lentamente em círculos',
            duration: 30,
            visual: 'eye-movement',
          },
          {
            instruction: 'Olhe para algo distante',
            duration: 45,
            visual: 'distant-focus',
          }
        ],
        benefits: ['Reduz fadiga visual', 'Previne síndrome do computador', 'Melhora foco'],
        contraindications: ['Problemas oculares graves']
      },
      {
        id: 'neck_stretch_routine',
        name: 'Alongamento do Pescoço',
        category: 'neck',
        duration: 5,
        difficulty: 'easy',
        steps: [
          {
            instruction: 'Incline a cabeça para a direita',
            duration: 20,
            visual: 'head-tilt-right',
          },
          {
            instruction: 'Incline a cabeça para a esquerda',
            duration: 20,
            visual: 'head-tilt-left',
          },
          {
            instruction: 'Mova a cabeça para frente e para trás',
            duration: 20,
            visual: 'head-nod',
          },
          {
            instruction: 'Gire a cabeça lentamente',
            duration: 30,
            visual: 'head-rotation',
          }
        ],
        benefits: ['Reduz tensão no pescoço', 'Previne dores de cabeça', 'Melhora postura'],
        contraindications: ['Lesões no pescoço']
      },
      {
        id: 'breathing_exercise',
        name: 'Exercício Respiratório 4-7-8',
        category: 'breathing',
        duration: 8,
        difficulty: 'medium',
        steps: [
          {
            instruction: 'Inspire pelo nariz contando até 4',
            duration: 4,
            visual: 'inhale-4-count',
            breathingPattern: 'inhale-4'
          },
          {
            instruction: 'Segure a respiração contando até 7',
            duration: 7,
            visual: 'hold-7-count',
            breathingPattern: 'hold-7'
          },
          {
            instruction: 'Expire pela boca contando até 8',
            duration: 8,
            visual: 'exhale-8-count',
            breathingPattern: 'exhale-8'
          }
        ],
        benefits: ['Reduz ansiedade', 'Melhora concentração', 'Promove relaxamento'],
        contraindications: ['Problemas respiratórios graves']
      }
    ];
  }

  /**
   * Adapta estratégias baseadas em insights
   */
  private adaptStrategiesBasedOnInsights(insights: any[]): void {
    insights.forEach(insight => {
      // Ajustar thresholds baseado nos padrões identificados
      if (insight.trend === 'declining') {
        this.adjustThresholdsForDecliningTrend(insight);
      } else if (insight.trend === 'improving') {
        this.adjustThresholdsForImprovingTrend(insight);
      }
    });
  }

  /**
   * Ajusta thresholds para tendências negativas
   */
  private adjustThresholdsForDecliningTrend(insight: any): void {
    // Tornar mais agressivo na prevenção
    switch (insight.metric) {
      case 'pausas_por_dia':
        this.PREVENTION_THRESHOLDS.NO_BREAK = Math.max(60, this.PREVENTION_THRESHOLDS.NO_BREAK - 15);
        break;
      case 'tempo_medio_por_caso':
        this.PREVENTION_THRESHOLDS.ERROR_RATE_HIGH = Math.max(0.1, this.PREVENTION_THRESHOLDS.ERROR_RATE_HIGH - 0.02);
        break;
    }
  }

  /**
   * Ajusta thresholds para tendências positivas
   */
  private adjustThresholdsForImprovingTrend(insight: any): void {
    // Permitir mais flexibilidade
    switch (insight.metric) {
      case 'tempo_medio_por_caso':
        this.PREVENTION_THRESHOLDS.NO_BREAK = Math.min(150, this.PREVENTION_THRESHOLDS.NO_BREAK + 10);
        break;
    }
  }

  /**
   * Carrega preferências do usuário
   */
  private loadUserPreferences(): UserPreferences {
    // Em produção, isso seria carregado do backend/localStorage
    return {
      reminderFrequency: 'adaptive',
      breakDuration: 5,
      exercisePreference: 'gentle',
      soundEnabled: true,
      visualCues: true,
      emergencyInterventions: true,
      personalizationLevel: 'high'
    };
  }

  /**
   * Métodos auxiliares
   */
  private getTimeSinceLastBreak(): number {
    // Implementação simplificada
    const emotionalState = this.emotionalMonitor.getCurrentState();
    return emotionalState.sessionDuration;
  }

  // Getters públicos

  public getActiveReminders(): BreakReminder[] {
    return Array.from(this.activeReminders.values());
  }

  public getExerciseRoutines(): ExerciseRoutine[] {
    return [...this.exerciseRoutines];
  }

  public getPreventionStrategies(): PreventionStrategy[] {
    return [...this.preventionStrategies];
  }

  public dismissReminder(reminderId: string): void {
    const reminder = this.activeReminders.get(reminderId);
    if (reminder) {
      reminder.status = 'dismissed';
      this.activeReminders.delete(reminderId);
    }
  }

  public completeReminder(reminderId: string): void {
    const reminder = this.activeReminders.get(reminderId);
    if (reminder) {
      reminder.status = 'completed';
      this.activeReminders.delete(reminderId);
      
      // Registrar sucesso
      this.feedbackSystem.recordAction('intervention_completed', 2);
    }
  }

  public updateUserPreferences(preferences: Partial<UserPreferences>): void {
    this.userPreferences = { ...this.userPreferences, ...preferences };
  }

  public getInterventionHistory(): typeof this.interventionHistory {
    return [...this.interventionHistory];
  }

  public getWellnessScore(): number {
    return this.feedbackSystem.getWellnessScore();
  }
}

interface UserPreferences {
  reminderFrequency: 'minimal' | 'normal' | 'adaptive' | 'frequent';
  breakDuration: number;
  exercisePreference: 'gentle' | 'moderate' | 'intense';
  soundEnabled: boolean;
  visualCues: boolean;
  emergencyInterventions: boolean;
  personalizationLevel: 'low' | 'medium' | 'high';
}