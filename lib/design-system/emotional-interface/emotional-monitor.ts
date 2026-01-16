/**
 * Sistema de Monitoramento Emocional Anti-Burnout
 * Darwin-MFC Interface Emocional SOTA
 * 
 * Monitora padrões de uso, fadiga, estresse e bem-estar do médico
 * para adaptar proativamente a interface e prevenir burnout.
 */

export interface EmotionalState {
  stressLevel: number; // 0-100
  fatigueLevel: number; // 0-100
  focusLevel: number; // 0-100
  energyLevel: number; // 0-100
  lastActivity: Date;
  sessionDuration: number; // minutos
  interactionPatterns: InteractionPattern[];
  errorRate: number; // erros por minuto
  typingSpeed: number; // caracteres por minuto
  pauseFrequency: number; // pausas por hora
}

export interface InteractionPattern {
  timestamp: Date;
  actionType: 'click' | 'scroll' | 'type' | 'navigation' | 'error';
  elementType: string;
  timeSpent: number; // ms
  success: boolean;
}

export interface BurnoutRisk {
  current: number; // 0-100
  trend: 'increasing' | 'stable' | 'decreasing';
  factors: BurnoutFactor[];
  recommendations: string[];
}

export interface BurnoutFactor {
  type: 'fatigue' | 'stress' | 'overwork' | 'monotony' | 'isolation';
  severity: 'low' | 'medium' | 'high';
  weight: number; // 0-1
}

export class EmotionalMonitor {
  private currentState: EmotionalState;
  private observers: EmotionalObserver[] = [];
  private monitoringInterval: NodeJS.Timeout | null = null;
  private readonly THRESHOLDS = {
    STRESS_HIGH: 75,
    FATIGUE_HIGH: 80,
    FOCUS_LOW: 30,
    ENERGY_LOW: 25,
    ERROR_RATE_HIGH: 0.1, // 10% de erro
    PAUSE_FREQUENCY_LOW: 2, // menos de 2 pausas por hora
    SESSION_DURATION_MAX: 120 // 2 horas sem pausa
  };

  constructor() {
    this.currentState = {
      stressLevel: 0,
      fatigueLevel: 0,
      focusLevel: 100,
      energyLevel: 100,
      lastActivity: new Date(),
      sessionDuration: 0,
      interactionPatterns: [],
      errorRate: 0,
      typingSpeed: 0,
      pauseFrequency: 0
    };

    this.startMonitoring();
  }

  /**
   * Inicia o monitoramento contínuo do estado emocional
   */
  private startMonitoring(): void {
    this.monitoringInterval = setInterval(() => {
      this.analyzePatterns();
      this.calculateRisk();
      this.notifyObservers();
    }, 30000); // A cada 30 segundos
  }

  /**
   * Registra interação do usuário para análise de padrões
   */
  public trackInteraction(pattern: InteractionPattern): void {
    this.currentState.interactionPatterns.push(pattern);
    this.currentState.lastActivity = new Date();

    // Manter apenas as últimas 100 interações
    if (this.currentState.interactionPatterns.length > 100) {
      this.currentState.interactionPatterns = this.currentState.interactionPatterns.slice(-100);
    }

    // Atualizar métricas em tempo real
    this.updateRealTimeMetrics(pattern);
  }

  /**
   * Atualiza métricas em tempo real baseadas na interação
   */
  private updateRealTimeMetrics(pattern: InteractionPattern): void {
    const now = new Date();
    const timeDiff = now.getTime() - this.currentState.lastActivity.getTime();
    
    // Calcular duração da sessão
    if (this.currentState.sessionDuration === 0) {
      this.currentState.sessionDuration = timeDiff / (1000 * 60); // minutos
    } else {
      this.currentState.sessionDuration += timeDiff / (1000 * 60);
    }

    // Atualizar taxa de erro
    if (pattern.actionType === 'error' || !pattern.success) {
      const recentPatterns = this.currentState.interactionPatterns.slice(-20);
      const errorCount = recentPatterns.filter(p => !p.success).length;
      this.currentState.errorRate = errorCount / recentPatterns.length;
    }

    // Calcular velocidade de digitação
    if (pattern.actionType === 'type') {
      const typingPatterns = this.currentState.interactionPatterns
        .filter(p => p.actionType === 'type')
        .slice(-10);
      
      if (typingPatterns.length > 1) {
        const timeSpan = typingPatterns[typingPatterns.length - 1].timestamp.getTime() - 
                        typingPatterns[0].timestamp.getTime();
        const totalChars = typingPatterns.reduce((sum, p) => sum + p.timeSpent, 0);
        this.currentState.typingSpeed = (totalChars / timeSpan) * 60; // chars por minuto
      }
    }
  }

  /**
   * Analisa padrões de interação para detectar fadiga e estresse
   */
  private analyzePatterns(): void {
    const patterns = this.currentState.interactionPatterns;
    if (patterns.length < 10) return;

    // Análise de padrões recentes (últimos 10 minutos)
    const recentPatterns = patterns.filter(p => 
      new Date().getTime() - p.timestamp.getTime() < 10 * 60 * 1000
    );

    // Detectar padrão de fadiga: cliques mais lentos, mais erros
    this.currentState.fatigueLevel = this.calculateFatigueLevel(recentPatterns);

    // Detectar nível de estresse: erros frequentes, navegação errática
    this.currentState.stressLevel = this.calculateStressLevel(recentPatterns);

    // Calcular nível de foco: consistência nos padrões
    this.currentState.focusLevel = this.calculateFocusLevel(recentPatterns);

    // Calcular energia: velocidade de resposta e precisão
    this.currentState.energyLevel = this.calculateEnergyLevel(recentPatterns);

    // Calcular frequência de pausa
    this.calculatePauseFrequency();
  }

  private calculateFatigueLevel(patterns: InteractionPattern[]): number {
    if (patterns.length === 0) return 0;

    // Fatores de fadiga:
    // 1. Tempo de resposta aumentando
    const avgResponseTime = patterns.reduce((sum, p) => sum + p.timeSpent, 0) / patterns.length;
    const slowResponses = patterns.filter(p => p.timeSpent > avgResponseTime * 1.5).length;
    
    // 2. Erros aumentando
    const errorRate = patterns.filter(p => !p.success).length / patterns.length;
    
    // 3. Navegação errática
    const navigationPatterns = patterns.filter(p => p.actionType === 'navigation');
    const erraticNavigation = navigationPatterns.length > 5 ? 1 : 0;

    return Math.min(100, (slowResponses / patterns.length * 40) + 
                          (errorRate * 100 * 40) + 
                          (erraticNavigation * 20));
  }

  private calculateStressLevel(patterns: InteractionPattern[]): number {
    if (patterns.length === 0) return 0;

    // Fatores de estresse:
    // 1. Alta taxa de erro
    const errorRate = patterns.filter(p => !p.success).length / patterns.length;
    
    // 2. Cliques múltiplos (frustração)
    const doubleClicks = this.detectDoubleClicks(patterns);
    
    // 3. Navegação rápida e errática
    const rapidNavigation = this.detectRapidNavigation(patterns);

    return Math.min(100, (errorRate * 100 * 50) + 
                          (doubleClicks * 30) + 
                          (rapidNavigation * 20));
  }

  private calculateFocusLevel(patterns: InteractionPattern[]): number {
    if (patterns.length === 0) return 100;

    // Indicadores de bom foco:
    // 1. Poucos erros
    const successRate = patterns.filter(p => p.success).length / patterns.length;
    
    // 2. Padrões consistentes
    const consistency = this.calculateConsistency(patterns);
    
    // 3. Navegação deliberada
    const deliberateNavigation = patterns.filter(p => 
      p.actionType === 'navigation' && p.timeSpent > 1000
    ).length / patterns.length;

    return Math.max(0, (successRate * 40) + (consistency * 30) + (deliberateNavigation * 30));
  }

  private calculateEnergyLevel(patterns: InteractionPattern[]): number {
    if (patterns.length === 0) return 100;

    // Fatores de energia:
    // 1. Velocidade de resposta
    const avgResponseTime = patterns.reduce((sum, p) => sum + p.timeSpent, 0) / patterns.length;
    const responseScore = Math.max(0, 100 - (avgResponseTime / 50)); // Normalizado
    
    // 2. Baixa taxa de erro
    const successRate = patterns.filter(p => p.success).length / patterns.length;
    
    // 3. Interação ativa
    const activityScore = Math.min(100, patterns.length * 5);

    return Math.min(100, (responseScore * 0.4) + (successRate * 100 * 0.4) + (activityScore * 0.2));
  }

  private calculatePauseFrequency(): void {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    // Assumir que pausas são períodos de inatividade > 2 minutos
    const patterns = this.currentState.interactionPatterns.filter(p => 
      p.timestamp > oneHourAgo
    );

    const inactivityPeriods = this.detectInactivityPeriods(patterns);
    this.currentState.pauseFrequency = inactivityPeriods.length;
  }

  private detectDoubleClicks(patterns: InteractionPattern[]): number {
    let doubleClicks = 0;
    for (let i = 1; i < patterns.length; i++) {
      const prev = patterns[i - 1];
      const curr = patterns[i];
      
      if (prev.actionType === 'click' && 
          curr.actionType === 'click' &&
          curr.timestamp.getTime() - prev.timestamp.getTime() < 500) {
        doubleClicks++;
      }
    }
    return doubleClicks / patterns.length;
  }

  private detectRapidNavigation(patterns: InteractionPattern[]): number {
    const navigations = patterns.filter(p => p.actionType === 'navigation');
    if (navigations.length < 3) return 0;

    let rapidCount = 0;
    for (let i = 1; i < navigations.length; i++) {
      const timeDiff = navigations[i].timestamp.getTime() - navigations[i-1].timestamp.getTime();
      if (timeDiff < 2000) rapidCount++; // Menos de 2 segundos entre navegações
    }
    return rapidCount / navigations.length;
  }

  private calculateConsistency(patterns: InteractionPattern[]): number {
    // Medir consistência pelo desvio padrão dos tempos de resposta
    const responseTimes = patterns.map(p => p.timeSpent);
    const mean = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;
    const variance = responseTimes.reduce((sum, time) => sum + Math.pow(time - mean, 2), 0) / responseTimes.length;
    const stdDev = Math.sqrt(variance);
    
    // Normalizar: menor desvio = maior consistência = melhor foco
    return Math.max(0, 100 - (stdDev / mean * 100));
  }

  private detectInactivityPeriods(patterns: InteractionPattern[]): Date[] {
    const inactivityPeriods: Date[] = [];
    const THRESHOLD = 2 * 60 * 1000; // 2 minutos

    for (let i = 1; i < patterns.length; i++) {
      const timeDiff = patterns[i].timestamp.getTime() - patterns[i-1].timestamp.getTime();
      if (timeDiff > THRESHOLD) {
        inactivityPeriods.push(patterns[i].timestamp);
      }
    }

    return inactivityPeriods;
  }

  /**
   * Calcula o risco de burnout baseado no estado atual
   */
  private calculateRisk(): BurnoutRisk {
    const factors: BurnoutFactor[] = [];

    // Fator fadiga
    if (this.currentState.fatigueLevel > this.THRESHOLDS.FATIGUE_HIGH) {
      factors.push({
        type: 'fatigue',
        severity: this.currentState.fatigueLevel > 90 ? 'high' : 'medium',
        weight: this.currentState.fatigueLevel / 100
      });
    }

    // Fator estresse
    if (this.currentState.stressLevel > this.THRESHOLDS.STRESS_HIGH) {
      factors.push({
        type: 'stress',
        severity: this.currentState.stressLevel > 85 ? 'high' : 'medium',
        weight: this.currentState.stressLevel / 100
      });
    }

    // Fator sobrecarga de trabalho
    if (this.currentState.sessionDuration > this.THRESHOLDS.SESSION_DURATION_MAX) {
      factors.push({
        type: 'overwork',
        severity: this.currentState.sessionDuration > 180 ? 'high' : 'medium',
        weight: Math.min(1, this.currentState.sessionDuration / 240) // 4 horas max
      });
    }

    // Fator monotonia (baixa frequência de pausa)
    if (this.currentState.pauseFrequency < this.THRESHOLDS.PAUSE_FREQUENCY_LOW) {
      factors.push({
        type: 'monotony',
        severity: this.currentState.pauseFrequency === 0 ? 'high' : 'medium',
        weight: (this.THRESHOLDS.PAUSE_FREQUENCY_LOW - this.currentState.pauseFrequency) / this.THRESHOLDS.PAUSE_FREQUENCY_LOW
      });
    }

    // Calcular risco atual
    const currentRisk = factors.reduce((sum, factor) => sum + (factor.weight * 100), 0) / factors.length;

    // Determinar tendência (simplificado)
    const trend: 'increasing' | 'stable' | 'decreasing' = 
      currentRisk > 60 ? 'increasing' : 
      currentRisk < 30 ? 'decreasing' : 'stable';

    // Gerar recomendações
    const recommendations = this.generateRecommendations(factors);

    return {
      current: Math.min(100, currentRisk),
      trend,
      factors,
      recommendations
    };
  }

  private generateRecommendations(factors: BurnoutFactor[]): string[] {
    const recommendations: string[] = [];

    factors.forEach(factor => {
      switch (factor.type) {
        case 'fatigue':
          recommendations.push('Recomendamos uma pausa de 10-15 minutos para descanso visual');
          recommendations.push('Considere exercícios de respiração profunda');
          break;
        case 'stress':
          recommendations.push('Modo calm ativado: interface simplificada para reduzir sobrecarga');
          recommendations.push('Aumente o tamanho do texto para facilitar a leitura');
          break;
        case 'overwork':
          recommendations.push('Hora de uma pausa! Você está trabalhando há muito tempo');
          recommendations.push('Recomendamos alongamentos e hidratação');
          break;
        case 'monotony':
          recommendations.push('Que tal uma pausa para quebrar a monotonia?');
          recommendations.push('Faça alguns exercícios rápidos de mobilização');
          break;
      }
    });

    return recommendations;
  }

  /**
   * Obtém o estado emocional atual
   */
  public getCurrentState(): EmotionalState {
    return { ...this.currentState };
  }

  /**
   * Obtém o risco de burnout atual
   */
  public getBurnoutRisk(): BurnoutRisk {
    return this.calculateRisk();
  }

  /**
   * Adiciona um observador para mudanças no estado emocional
   */
  public addObserver(observer: EmotionalObserver): void {
    this.observers.push(observer);
  }

  /**
   * Remove um observador
   */
  public removeObserver(observer: EmotionalObserver): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  /**
   * Notifica todos os observadores sobre mudanças no estado
   */
  private notifyObservers(): void {
    const state = this.getCurrentState();
    const risk = this.getBurnoutRisk();
    
    this.observers.forEach(observer => {
      observer.onEmotionalStateChange(state, risk);
    });
  }

  /**
   * Para o monitoramento
   */
  public stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
  }
}

export interface EmotionalObserver {
  onEmotionalStateChange(state: EmotionalState, risk: BurnoutRisk): void;
}