/**
 * Sistema de Feedback Positivo e Reconhecimento Médico
 * Darwin-MFC Interface Emocional SOTA
 * 
 * Sistema que reconhece achievements médicos, fornece feedback positivo
 * e reforça comportamentos saudáveis para prevenir burnout.
 */

import { EmotionalState, BurnoutRisk } from './emotional-monitor';

export interface MedicalAchievement {
  id: string;
  type: 'clinical' | 'safety' | 'efficiency' | 'wellness' | 'learning';
  title: string;
  description: string;
  icon: string;
  points: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  unlockedAt: Date;
  category: string;
  impact: {
    patientCare: number;
    efficiency: number;
    learning: number;
    wellness: number;
  };
}

export interface PositiveFeedback {
  id: string;
  type: 'achievement' | 'milestone' | 'streak' | 'improvement' | 'recognition';
  title: string;
  message: string;
  icon: string;
  animation: string;
  emotionalImpact: 'low' | 'medium' | 'high';
  generatedAt: Date;
  relatedAchievement?: string;
}

export interface WellnessMetrics {
  dailyGoals: DailyGoal[];
  weeklyProgress: WeeklyProgress;
  monthlyInsights: MonthlyInsight[];
  streaks: StreakRecord[];
}

export interface DailyGoal {
  id: string;
  type: 'pause' | 'hydration' | 'exercise' | 'mindfulness' | 'case_review';
  target: number;
  current: number;
  completed: boolean;
  points: number;
  description: string;
}

export interface WeeklyProgress {
  totalPoints: number;
  achievements: MedicalAchievement[];
  improvements: string[];
  focusAreas: string[];
  wellnessScore: number; // 0-100
}

export interface MonthlyInsight {
  pattern: string;
  trend: 'improving' | 'stable' | 'declining';
  recommendation: string;
  metric: string;
  value: number;
}

export interface StreakRecord {
  type: 'daily_breaks' | 'case_excellence' | 'learning_streak' | 'wellness_focus';
  current: number;
  best: number;
  startedAt: Date;
  lastUpdated: Date;
}

export class PositiveFeedbackSystem {
  private achievements: Map<string, MedicalAchievement> = new Map();
  private unlockedAchievements: Set<string> = new Set();
  private feedbackHistory: PositiveFeedback[] = [];
  private wellnessMetrics: WellnessMetrics;
  private recentActions: Array<{action: string, timestamp: Date, emotionalImpact: number}> = [];
  
  // Thresholds para achievements
  private readonly ACHIEVEMENT_THRESHOLDS = {
    cases_reviewed: [10, 50, 100, 250, 500],
    error_free_sessions: [5, 15, 30, 60, 100],
    learning_modules: [1, 5, 15, 30, 60],
    wellness_days: [3, 7, 14, 30, 60],
    efficiency_improvements: [5, 15, 30, 50, 100]
  };

  constructor() {
    this.wellnessMetrics = {
      dailyGoals: this.initializeDailyGoals(),
      weeklyProgress: {
        totalPoints: 0,
        achievements: [],
        improvements: [],
        focusAreas: [],
        wellnessScore: 50
      },
      monthlyInsights: [],
      streaks: this.initializeStreaks()
    };

    this.loadPredefinedAchievements();
  }

  /**
   * Registra ação do médico e gera feedback apropriado
   */
  public recordAction(action: string, emotionalImpact: number = 1): void {
    const actionRecord = {
      action,
      timestamp: new Date(),
      emotionalImpact
    };

    this.recentActions.push(actionRecord);
    this.recentActions = this.recentActions.filter(a => 
      Date.now() - a.timestamp.getTime() < 24 * 60 * 60 * 1000 // Últimas 24h
    );

    // Verificar novos achievements
    this.checkForNewAchievements(action);

    // Gerar feedback baseado na ação
    this.generateFeedbackForAction(action, emotionalImpact);

    // Atualizar métricas de bem-estar
    this.updateWellnessMetrics(action);
  }

  /**
   * Verifica se novos achievements foram desbloqueados
   */
  private checkForNewAchievements(action: string): void {
    const actionCounts = this.countRecentActions();
    
    Object.entries(this.ACHIEVEMENT_THRESHOLDS).forEach(([category, thresholds]) => {
      const count = actionCounts[category] || 0;
      
      thresholds.forEach((threshold, index) => {
        if (count >= threshold && !this.hasAchievement(category, threshold)) {
          this.unlockAchievement(category, threshold, index);
        }
      });
    });

    // Verificar streaks
    this.updateStreaks(action);
  }

  /**
   * Desbloqueia um achievement
   */
  private unlockAchievement(category: string, threshold: number, index: number): void {
    const rarityLevels = ['common', 'uncommon', 'rare', 'epic', 'legendary'] as const;
    const rarity = rarityLevels[index] || 'common';
    
    const achievement: MedicalAchievement = {
      id: `${category}_${threshold}`,
      type: this.mapCategoryToType(category),
      title: this.generateAchievementTitle(category, threshold),
      description: this.generateAchievementDescription(category, threshold),
      icon: this.getAchievementIcon(category),
      points: this.calculatePoints(threshold, rarity),
      rarity,
      unlockedAt: new Date(),
      category,
      impact: this.calculateImpact(category, threshold)
    };

    this.achievements.set(achievement.id, achievement);
    this.unlockedAchievements.add(achievement.id);
    
    // Gerar feedback especial para achievements
    this.generateAchievementFeedback(achievement);
  }

  /**
   * Gera feedback para uma ação específica
   */
  private generateFeedbackForAction(action: string, emotionalImpact: number): void {
    const feedback = this.createActionFeedback(action, emotionalImpact);
    if (feedback) {
      this.feedbackHistory.push(feedback);
      
      // Manter apenas os últimos 50 feedbacks
      if (this.feedbackHistory.length > 50) {
        this.feedbackHistory = this.feedbackHistory.slice(-50);
      }
    }
  }

  /**
   * Cria feedback baseado na ação
   */
  private createActionFeedback(action: string, emotionalImpact: number): PositiveFeedback | null {
    const now = new Date();
    
    // Feedback baseado em padrões de ação
    if (this.isFirstActionOfDay()) {
      return {
        id: `first_action_${now.getTime()}`,
        type: 'milestone',
        title: 'Excelente início do dia! 🌅',
        message: 'Você está começando o dia com propósito. Que tal fazer uma pausa para respirar profundamente?',
        icon: '🌅',
        animation: 'gentle-bounce',
        emotionalImpact: 'medium',
        generatedAt: now
      };
    }

    if (this.hasTakenRecentBreak()) {
      return {
        id: `break_taken_${now.getTime()}`,
        type: 'recognition',
        title: 'Ótima pausa! ✅',
        message: 'Você está cuidando do seu bem-estar. Pausas regulares são essenciais para manter a excelência.',
        icon: '☕',
        animation: 'heart-pulse',
        emotionalImpact: 'medium',
        generatedAt: now
      };
    }

    if (this.detectedEfficiencyImprovement()) {
      return {
        id: `efficiency_${now.getTime()}`,
        type: 'improvement',
        title: 'Eficiência em alta! 🚀',
        message: 'Sua prática está mais fluida hoje. Continue assim!',
        icon: '⚡',
        animation: 'sparkle',
        emotionalImpact: 'high',
        generatedAt: now
      };
    }

    return null;
  }

  /**
   * Gera feedback especial para achievements
   */
  private generateAchievementFeedback(achievement: MedicalAchievement): void {
    const feedback: PositiveFeedback = {
      id: `achievement_${achievement.id}_${Date.now()}`,
      type: 'achievement',
      title: `Achievement Desbloqueado! ${achievement.icon}`,
      message: `${achievement.title}\n\n${achievement.description}\n\n+${achievement.points} pontos de bem-estar`,
      icon: achievement.icon,
      animation: 'celebration-burst',
      emotionalImpact: achievement.rarity === 'epic' || achievement.rarity === 'legendary' ? 'high' : 'medium',
      generatedAt: new Date(),
      relatedAchievement: achievement.id
    };

    this.feedbackHistory.push(feedback);
  }

  /**
   * Atualiza métricas de bem-estar
   */
  private updateWellnessMetrics(action: string): void {
    // Atualizar goals diários
    this.wellnessMetrics.dailyGoals.forEach(goal => {
      if (this.actionContributesToGoal(action, goal)) {
        if (!goal.completed && goal.current >= goal.target) {
          goal.completed = true;
          this.wellnessMetrics.weeklyProgress.totalPoints += goal.points;
          
          // Feedback para goal completado
          this.generateGoalCompletionFeedback(goal);
        }
      }
    });

    // Calcular wellness score
    this.calculateWellnessScore();
  }

  /**
   * Calcula o score de bem-estar geral
   */
  private calculateWellnessScore(): void {
    const breakFrequency = this.calculateBreakFrequency();
    const errorRate = this.calculateErrorRate();
    const efficiencyScore = this.calculateEfficiencyScore();
    const learningProgress = this.calculateLearningProgress();
    const streakBonus = this.calculateStreakBonus();

    const factors = [breakFrequency, errorRate, efficiencyScore, learningProgress, streakBonus];
    const weights = [0.25, 0.25, 0.2, 0.15, 0.15];
    
    const weightedSum = factors.reduce((sum, factor, index) => 
      sum + factor * weights[index], 0
    );

    this.wellnessMetrics.weeklyProgress.wellnessScore = Math.round(weightedSum);
  }

  /**
   * Gera insights mensais
   */
  public generateMonthlyInsights(): MonthlyInsight[] {
    const insights: MonthlyInsight[] = [];
    
    // Análise de padrões de trabalho
    const breakPattern = this.analyzeBreakPatterns();
    if (breakPattern.trend === 'declining') {
      insights.push({
        pattern: 'Frequência de pausas diminuindo',
        trend: 'declining',
        recommendation: 'Considere definir lembretes automáticos para pausas regulares',
        metric: 'pausas_por_dia',
        value: breakPattern.average
      });
    }

    // Análise de eficiência
    const efficiencyTrend = this.analyzeEfficiencyTrend();
    if (efficiencyTrend.improving) {
      insights.push({
        pattern: 'Melhora consistente na eficiência',
        trend: 'improving',
        recommendation: 'Continue seguindo as práticas que estão funcionando bem',
        metric: 'tempo_medio_por_caso',
        value: efficiencyTrend.improvement
      });
    }

    // Análise de aprendizado
    const learningPattern = this.analyzeLearningPattern();
    if (learningPattern.active) {
      insights.push({
        pattern: 'Excelente engajamento com conteúdo educativo',
        trend: 'improving',
        recommendation: 'Você está investindo no seu desenvolvimento profissional',
        metric: 'modulos_concluidos',
        value: learningPattern.count
      });
    }

    this.wellnessMetrics.monthlyInsights = insights;
    return insights;
  }

  /**
   * Obtém feedback ativo baseado no estado emocional
   */
  public getContextualFeedback(emotionalState: EmotionalState, burnoutRisk: BurnoutRisk): PositiveFeedback[] {
    const relevantFeedback = this.feedbackHistory.filter(feedback => {
      const timeDiff = Date.now() - feedback.generatedAt.getTime();
      return timeDiff < 2 * 60 * 60 * 1000; // Últimas 2 horas
    });

    // Priorizar feedback baseado no estado emocional
    if (burnoutRisk.current > 70) {
      return this.prioritizeEncouragingFeedback(relevantFeedback);
    }

    if (emotionalState.stressLevel > 75) {
      return this.prioritizeCalmingFeedback(relevantFeedback);
    }

    if (emotionalState.energyLevel < 30) {
      return this.prioritizeEnergizingFeedback(relevantFeedback);
    }

    return relevantFeedback.slice(0, 3); // Últimos 3 feedbacks
  }

  /**
   * Prioriza feedback encorajador para momentos críticos
   */
  private prioritizeEncouragingFeedback(feedback: PositiveFeedback[]): PositiveFeedback[] {
    const encouraging = feedback.filter(f => 
      f.emotionalImpact === 'high' || f.type === 'achievement'
    );
    
    const encouragingMessages: PositiveFeedback[] = [
      {
        id: 'encouragement_1',
        type: 'recognition',
        title: 'Você está fazendo um trabalho incrível! 💪',
        message: 'Lembre-se: cuidar de si mesmo é cuidar dos seus pacientes. Você merece uma pausa.',
        icon: '💪',
        animation: 'gentle-shine',
        emotionalImpact: 'high',
        generatedAt: new Date()
      },
      {
        id: 'encouragement_2',
        type: 'recognition',
        title: 'Seu esforço faz a diferença 🌟',
        message: 'Cada decisão que você toma melhora a vida de alguém. Você é apreciado.',
        icon: '🌟',
        animation: 'star-twinkle',
        emotionalImpact: 'high',
        generatedAt: new Date()
      }
    ];

    return [...encouraging, ...encouragingMessages].slice(0, 5);
  }

  /**
   * Prioriza feedback calmante
   */
  private prioritizeCalmingFeedback(feedback: PositiveFeedback[]): PositiveFeedback[] {
    const calmingMessages: PositiveFeedback[] = [
      {
        id: 'calming_1',
        type: 'recognition',
        title: 'Respire fundo... 🌊',
        message: 'Tudo bem slows down. Você está fazendo o seu melhor. Que tal uma pausa de 2 minutos para respirar?',
        icon: '🌊',
        animation: 'gentle-wave',
        emotionalImpact: 'medium',
        generatedAt: new Date()
      }
    ];

    return [...calmingMessages, ...feedback].slice(0, 3);
  }

  /**
   * Prioriza feedback energizante
   */
  private prioritizeEnergizingFeedback(feedback: PositiveFeedback[]): PositiveFeedback[] {
    const energizingMessages: PositiveFeedback[] = [
      {
        id: 'energizing_1',
        type: 'recognition',
        title: 'Energize-se! ⚡',
        message: 'Que tal uma caminhada rápida ou alguns exercícios de alongamento? Seu corpo agradecerá!',
        icon: '⚡',
        animation: 'energy-pulse',
        emotionalImpact: 'high',
        generatedAt: new Date()
      }
    ];

    return [...energizingMessages, ...feedback].slice(0, 3);
  }

  // Métodos auxiliares

  private loadPredefinedAchievements(): void {
    // Achievement templates
    const templates = [
      {
        category: 'cases_reviewed',
        titles: ['Primeiros Passos', 'Dedicado', 'Profissional', 'Expert', 'Mestre'],
        descriptions: [
          'Você revisou seus primeiros 10 casos hoje!',
          '50 casos revisados com atenção ao detalhe',
          '100 casos - Sua experiência está brilhando!',
          '250 casos - Você é um verdadeiro especialista',
          '500 casos - Sua dedicação é inspiradora!'
        ]
      }
      // Adicionar mais templates...
    ];
  }

  private initializeDailyGoals(): DailyGoal[] {
    return [
      {
        id: 'pause_breaks',
        type: 'pause',
        target: 4, // 4 pausas por dia
        current: 0,
        completed: false,
        points: 10,
        description: 'Fazer 4 pausas durante o dia'
      },
      {
        id: 'hydration',
        type: 'hydration',
        target: 8, // 8 copos de água
        current: 0,
        completed: false,
        points: 5,
        description: 'Manter-se hidratado'
      },
      {
        id: 'mindfulness',
        type: 'mindfulness',
        target: 2, // 2 momentos de mindfulness
        current: 0,
        completed: false,
        points: 15,
        description: 'Momentos de consciência plena'
      }
    ];
  }

  private initializeStreaks(): StreakRecord[] {
    return [
      {
        type: 'daily_breaks',
        current: 0,
        best: 0,
        startedAt: new Date(),
        lastUpdated: new Date()
      },
      {
        type: 'case_excellence',
        current: 0,
        best: 0,
        startedAt: new Date(),
        lastUpdated: new Date()
      }
    ];
  }

  private countRecentActions(): Record<string, number> {
    const counts: Record<string, number> = {};
    
    this.recentActions.forEach(action => {
      counts[action.action] = (counts[action.action] || 0) + 1;
    });

    return counts;
  }

  private hasAchievement(category: string, threshold: number): boolean {
    return this.unlockedAchievements.has(`${category}_${threshold}`);
  }

  private mapCategoryToType(category: string): MedicalAchievement['type'] {
    const mapping: Record<string, MedicalAchievement['type']> = {
      cases_reviewed: 'clinical',
      error_free_sessions: 'safety',
      efficiency_improvements: 'efficiency',
      wellness_days: 'wellness',
      learning_modules: 'learning'
    };
    return mapping[category] || 'clinical';
  }

  private generateAchievementTitle(category: string, threshold: number): string {
    return `Conquistador ${category.replace('_', ' ')}: ${threshold}`;
  }

  private generateAchievementDescription(category: string, threshold: number): string {
    return `Você atingiu ${threshold} ${category.replace('_', ' ')} - incrível dedicação!`;
  }

  private getAchievementIcon(category: string): string {
    const icons: Record<string, string> = {
      cases_reviewed: '📋',
      error_free_sessions: '🛡️',
      efficiency_improvements: '⚡',
      wellness_days: '🌟',
      learning_modules: '📚'
    };
    return icons[category] || '🏆';
  }

  private calculatePoints(threshold: number, rarity: string): number {
    const basePoints = threshold;
    const rarityMultipliers = {
      common: 1,
      uncommon: 1.5,
      rare: 2,
      epic: 3,
      legendary: 5
    };
    return Math.round(basePoints * (rarityMultipliers[rarity as keyof typeof rarityMultipliers] || 1));
  }

  private calculateImpact(category: string, threshold: number): MedicalAchievement['impact'] {
    // Calcular impacto baseado no tipo de achievement
    return {
      patientCare: Math.min(100, threshold * 2),
      efficiency: Math.min(100, threshold * 1.5),
      learning: Math.min(100, threshold * 2.5),
      wellness: Math.min(100, threshold * 3)
    };
  }

  private isFirstActionOfDay(): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return this.recentActions.every(action => 
      action.timestamp < today
    );
  }

  private hasTakenRecentBreak(): boolean {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    return this.recentActions.some(action => 
      action.action === 'break' && action.timestamp > oneHourAgo
    );
  }

  private detectedEfficiencyImprovement(): boolean {
    // Lógica para detectar melhoria na eficiência
    const recentActions = this.recentActions.filter(a => 
      Date.now() - a.timestamp.getTime() < 30 * 60 * 1000 // Últimos 30 min
    );
    
    return recentActions.length > 5; // Muitas ações rápidas
  }

  private updateStreaks(action: string): void {
    this.wellnessMetrics.streaks.forEach(streak => {
      if (this.actionContributesToStreak(action, streak.type)) {
        if (this.isConsecutiveDay(streak.lastUpdated)) {
          streak.current++;
          if (streak.current > streak.best) {
            streak.best = streak.current;
          }
        } else {
          streak.current = 1; // Reset streak
        }
        streak.lastUpdated = new Date();
      }
    });
  }

  private actionContributesToGoal(action: string, goal: DailyGoal): boolean {
    const actionMapping: Record<string, string[]> = {
      pause: ['break', 'rest'],
      hydration: ['water', 'drink'],
      exercise: ['stretch', 'walk'],
      mindfulness: ['meditate', 'breathe'],
      case_review: ['case', 'review']
    };
    
    return actionMapping[goal.type]?.some(mapping => 
      action.toLowerCase().includes(mapping)
    ) || false;
  }

  private actionContributesToStreak(action: string, streakType: StreakRecord['type']): boolean {
    const mappings = {
      daily_breaks: ['break'],
      case_excellence: ['case', 'review'],
      learning_streak: ['learn', 'study'],
      wellness_focus: ['wellness', 'health']
    };
    
    return mappings[streakType]?.some(mapping => 
      action.toLowerCase().includes(mapping)
    ) || false;
  }

  private isConsecutiveDay(lastDate: Date): boolean {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const lastUpdateDate = new Date(lastDate);
    lastUpdateDate.setHours(0, 0, 0, 0);
    
    const todayDate = new Date(today);
    todayDate.setHours(0, 0, 0, 0);
    
    return lastUpdateDate.getTime() === todayDate.getTime() || 
           lastUpdateDate.getTime() === yesterday.getTime();
  }

  private generateGoalCompletionFeedback(goal: DailyGoal): void {
    const feedback: PositiveFeedback = {
      id: `goal_${goal.id}_${Date.now()}`,
      type: 'milestone',
      title: `Meta Atingida! ${goal.points} pontos 🎯`,
      message: goal.description,
      icon: '🎯',
      animation: 'target-achieved',
      emotionalImpact: 'medium',
      generatedAt: new Date()
    };
    
    this.feedbackHistory.push(feedback);
  }

  private calculateBreakFrequency(): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayActions = this.recentActions.filter(action => 
      action.timestamp >= today
    );
    
    const breaks = todayActions.filter(action => 
      action.action === 'break'
    ).length;
    
    return Math.min(100, (breaks / 8) * 100); // Normalizado para 8 pausas ideais
  }

  private calculateErrorRate(): number {
    // Invertido: menos erros = maior score
    const errorActions = this.recentActions.filter(action => 
      action.action.includes('error')
    ).length;
    
    return Math.max(0, 100 - (errorActions * 20));
  }

  private calculateEfficiencyScore(): number {
    const efficiencyTrend = this.calculateEfficiencyTrend();
    // Retornar apenas o valor numérico
    return Math.min(100, 50 + efficiencyTrend.improvement);
  }

  private calculateLearningProgress(): number {
    const learningActions = this.recentActions.filter(action => 
      action.action.includes('learn') || action.action.includes('study')
    ).length;
    
    return Math.min(100, learningActions * 25);
  }

  private calculateStreakBonus(): number {
    const totalStreak = this.wellnessMetrics.streaks.reduce((sum, streak) => 
      sum + (streak.current / streak.best) * 25, 0
    );
    
    return Math.min(100, totalStreak);
  }

  private analyzeBreakPatterns(): {trend: string, average: number} {
    // Implementação simplificada
    return {
      trend: 'stable',
      average: 3.5
    };
  }

  private analyzeEfficiencyTrend(): {improving: boolean, improvement: number} {
    return this.calculateEfficiencyTrend();
  }

  private analyzeLearningPattern(): {active: boolean, count: number} {
    const learningActions = this.recentActions.filter(action => 
      action.action.includes('learn')
    ).length;
    
    return {
      active: learningActions > 0,
      count: learningActions
    };
  }

  private calculateEfficiencyTrend(): {improving: boolean, improvement: number} {
    // Análise simplificada da tendência de eficiência
    const recent = this.recentActions.slice(-10);
    const older = this.recentActions.slice(-20, -10);
    
    const recentAvg = recent.length > 0 ? recent.reduce((sum, a) => sum + a.emotionalImpact, 0) / recent.length : 0;
    const olderAvg = older.length > 0 ? older.reduce((sum, a) => sum + a.emotionalImpact, 0) / older.length : 0;
    
    const improvement = olderAvg > 0 ? ((recentAvg - olderAvg) / olderAvg) * 100 : 0;
    
    return {
      improving: improvement > 10,
      improvement: Math.abs(improvement)
    };
  }

  // Getters públicos

  public getAchievements(): MedicalAchievement[] {
    return Array.from(this.achievements.values());
  }

  public getUnlockedAchievements(): MedicalAchievement[] {
    return Array.from(this.achievements.values()).filter(achievement => 
      this.unlockedAchievements.has(achievement.id)
    );
  }

  public getRecentFeedback(): PositiveFeedback[] {
    return [...this.feedbackHistory].slice(-10);
  }

  public getWellnessMetrics(): WellnessMetrics {
    return { ...this.wellnessMetrics };
  }

  public getTotalPoints(): number {
    return this.wellnessMetrics.weeklyProgress.totalPoints;
  }

  public getWellnessScore(): number {
    return this.wellnessMetrics.weeklyProgress.wellnessScore;
  }
}