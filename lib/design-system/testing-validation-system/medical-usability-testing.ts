/**
 * TESTES DE USABILIDADE MÉDICA
 * ============================
 * 
 * Sistema avançado de testes de usabilidade para validar
 * a eficácia das inovações UI/UX em cenários médicos reais.
 */

export interface MedicalUsabilityTest {
  id: string;
  name: string;
  specialty: MedicalSpecialty;
  scenario: string;
  tasks: UsabilityTask[];
  participants: TestParticipant[];
  metrics: UsabilityMetric[];
  results: TestResult[];
  timestamp: Date;
}

export interface MedicalSpecialty {
  id: string;
  name: string;
  code: string;
  icon: string;
  color: string;
}

export interface UsabilityTask {
  id: string;
  name: string;
  description: string;
  expectedOutcome: string;
  timeLimit?: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Critical';
  successCriteria: string[];
}

export interface TestParticipant {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  certificationLevel: 'Junior' | 'Senior' | 'Specialist' | 'Expert';
  hospital: string;
  deviceUsed: string;
}

export interface UsabilityMetric {
  taskCompletionRate: number;
  averageTime: number;
  errorRate: number;
  satisfactionScore: number;
  mentalWorkload: number; // NASA-TLX
  systemUsabilityScale: number; // SUS Score
}

export interface TestResult {
  participantId: string;
  taskId: string;
  completed: boolean;
  timeSpent: number;
  errors: UsabilityError[];
  satisfactionRating: number;
  feedback: string;
  sessionData: SessionData;
}

export interface UsabilityError {
  type: 'Navigation' | 'Interface' | 'Workflow' | 'Critical';
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  impactOnTask: boolean;
}

export interface SessionData {
  clicks: number;
  path: string[];
  abandonedSteps: number;
  helpRequests: number;
  backtracks: number;
  featuresUsed: string[];
}

export class MedicalUsabilityTester {
  private tests: Map<string, MedicalUsabilityTest> = new Map();
  private activeTest: MedicalUsabilityTest | null = null;

  constructor() {
    this.initializeTestScenarios();
  }

  private initializeTestScenarios(): void {
    // Escenários críticos por especialidade médica
    const emergencyScenario: MedicalUsabilityTest = {
      id: 'emergency-critical-care',
      name: 'Atendimento de Emergência Crítica',
      specialty: {
        id: 'emergency',
        name: 'Medicina de Emergência',
        code: 'EMERG',
        icon: '🚨',
        color: '#DC2626'
      },
      scenario: 'Paciente llega com sinais vitais instáveis após acidente. Tempo crítico: 15 minutos para diagnóstico inicial.',
      tasks: [
        {
          id: 'vital-signs-entry',
          name: 'Registro de Sinais Vitais',
          description: 'Registrar pressão arterial, frequência cardíaca, temperatura e saturação de O2',
          expectedOutcome: 'Sinais vitais registrados com precisão em <30 segundos',
          difficulty: 'Critical',
          successCriteria: [
            'Todos os sinais vitais registrados',
            'Tempo < 30 segundos',
            'Sem erros de digitação',
            'Alertas automáticos funcionais'
          ]
        },
        {
          id: 'drug-allergy-check',
          name: 'Verificação de Alergias',
          description: 'Verificar alergias antes de prescrever medicação de emergência',
          expectedOutcome: 'Alergias identificadas e medicamentos seguros prescritos',
          difficulty: 'Critical',
          successCriteria: [
            'Sistema de alergias consultado',
            'Medicamentos seguros prescritos',
            'Alertas de alergia funcionando'
          ]
        },
        {
          id: 'emergency-protocol',
          name: 'Acesso a Protocolo de Emergência',
          description: 'Localizar e aplicar protocolo específico para choque hemorrágico',
          expectedOutcome: 'Protocolo encontrado e aplicado corretamente',
          difficulty: 'Hard',
          successCriteria: [
            'Protocolo encontrado < 2 minutos',
            'Etapas seguidas corretamente',
            'Tempo total < 5 minutos'
          ]
        }
      ],
      participants: [],
      metrics: [],
      results: [],
      timestamp: new Date()
    };

    const cardiologyScenario: MedicalUsabilityTest = {
      id: 'cardiology-stemi',
      name: 'Diagnóstico de STEMI',
      specialty: {
        id: 'cardiology',
        name: 'Cardiologia',
        code: 'CARDIO',
        icon: '❤️',
        color: '#DC2626'
      },
      scenario: 'Paciente com dor torácica, ECG com elevação do segmento ST. Clock de ouro: 90 minutos para intervenção.',
      tasks: [
        {
          id: 'ecg-interpretation',
          name: 'Interpretação de ECG',
          description: 'Interpretar ECG e identificar alterações sugestivas de STEMI',
          expectedOutcome: 'STEMI identificado corretamente',
          difficulty: 'Critical',
          successCriteria: [
            'Alterações identificadas corretamente',
            'Região do infarto determinada',
            'Decisão de intervenção tomada',
            'Tempo < 3 minutos'
          ]
        },
        {
          id: 'cath-lab-notification',
          name: 'Notificação do Laboratório de Cateterismo',
          description: 'Ativar equipe de cateterismo e preparar paciente',
          expectedOutcome: 'Equipe ativada e paciente preparado',
          difficulty: 'Hard',
          successCriteria: [
            'Equipe contatada',
            'Checklist de preparação completo',
            'Tempo total < 10 minutos'
          ]
        }
      ],
      participants: [],
      metrics: [],
      results: [],
      timestamp: new Date()
    };

    this.tests.set(emergencyScenario.id, emergencyScenario);
    this.tests.set(cardiologyScenario.id, cardiologyScenario);
  }

  async runUsabilityTest(testId: string, participant: TestParticipant): Promise<TestResult> {
    const test = this.tests.get(testId);
    if (!test) {
      throw new Error(`Test ${testId} not found`);
    }

    this.activeTest = test;
    test.participants.push(participant);

    const results: TestResult[] = [];

    for (const task of test.tasks) {
      const result = await this.executeTask(task, participant);
      results.push(result);
    }

    test.results.push(...results);

    // Calcular métricas
    this.calculateTestMetrics(test);

    this.activeTest = null;
    return results[results.length - 1]; // Return last result
  }

  private async executeTask(task: UsabilityTask, participant: TestParticipant): Promise<TestResult> {
    const startTime = Date.now();
    
    // Simular execução do teste
    // Em implementação real, seria integrado com ferramentas como UserTesting, Maze, etc.
    
    const sessionData: SessionData = {
      clicks: Math.floor(Math.random() * 20) + 5,
      path: this.generateNavigationPath(),
      abandonedSteps: Math.floor(Math.random() * 3),
      helpRequests: Math.floor(Math.random() * 2),
      backtracks: Math.floor(Math.random() * 5),
      featuresUsed: this.generateFeaturesUsed()
    };

    const timeSpent = Date.now() - startTime;
    
    // Simular taxa de sucesso baseada na experiência do participante
    const successRate = this.calculateSuccessRate(participant.experience, task.difficulty);
    const completed = Math.random() < successRate;

    return {
      participantId: participant.id,
      taskId: task.id,
      completed,
      timeSpent,
      errors: completed ? [] : this.generateErrors(task.difficulty),
      satisfactionRating: this.generateSatisfactionRating(participant.experience, completed),
      feedback: this.generateFeedback(participant.experience, task, completed),
      sessionData
    };
  }

  private generateNavigationPath(): string[] {
    const paths = [
      ['dashboard', 'vitals', 'patient-profile', 'complete'],
      ['dashboard', 'search', 'patient-list', 'patient-profile', 'vitals', 'complete'],
      ['dashboard', 'emergency', 'protocols', 'vitals', 'complete'],
      ['dashboard', 'medications', 'allergies', 'vitals', 'complete']
    ];
    
    return paths[Math.floor(Math.random() * paths.length)];
  }

  private generateFeaturesUsed(): string[] {
    const features = [
      'quick-vitals-entry',
      'voice-input',
      'smart-suggestions',
      'alert-system',
      'recent-patients',
      'emergency-protocols',
      'medication-database',
      'allergy-checker'
    ];
    
    return features.slice(0, Math.floor(Math.random() * 4) + 2);
  }

  private calculateSuccessRate(experience: number, difficulty: string): number {
    let baseRate = 0.7; // 70% base success rate
    
    // Ajustar por experiência
    if (experience > 10) baseRate += 0.15;
    else if (experience > 5) baseRate += 0.1;
    else if (experience > 2) baseRate += 0.05;
    
    // Ajustar por dificuldade
    switch (difficulty) {
      case 'Easy': baseRate += 0.2; break;
      case 'Medium': baseRate += 0.1; break;
      case 'Hard': baseRate -= 0.1; break;
      case 'Critical': baseRate -= 0.2; break;
    }
    
    return Math.min(baseRate, 0.95);
  }

  private generateErrors(difficulty: string): UsabilityError[] {
    const errorTypes = ['Navigation', 'Interface', 'Workflow'] as const;
    const errorCount = Math.floor(Math.random() * 3);
    
    return Array.from({ length: errorCount }, (_, i) => ({
      type: errorTypes[Math.floor(Math.random() * errorTypes.length)],
      description: `Error ${i + 1} related to ${difficulty.toLowerCase()} task`,
      severity: difficulty === 'Critical' ? 'High' : 'Medium',
      impactOnTask: Math.random() > 0.7
    }));
  }

  private generateSatisfactionRating(experience: number, completed: boolean): number {
    let base = completed ? 4.0 : 2.5;
    base += experience * 0.1; // Mais experiência = mais tolerante
    return Math.max(1, Math.min(5, base + (Math.random() - 0.5)));
  }

  private generateFeedback(experience: number, task: UsabilityTask, completed: boolean): string {
    if (completed) {
      const positiveFeedback = [
        'Interface intuitiva e rápida',
        'Sistema muito responsivo',
        'Recursos de ajuda muito úteis',
        'Workflow bem estruturado',
        'Excelente para casos de emergência'
      ];
      return positiveFeedback[Math.floor(Math.random() * positiveFeedback.length)];
    } else {
      const improvementSuggestions = [
        'Poderia ser mais intuitivo em alguns pontos',
        'Tempo de resposta pode melhorar',
        'Alguns alertas poderiam ser mais claros',
        'Protocolos precisam ser mais acessíveis',
        'Interface pode confundir iniciantes'
      ];
      return improvementSuggestions[Math.floor(Math.random() * improvementSuggestions.length)];
    }
  }

  private calculateTestMetrics(test: MedicalUsabilityTest): void {
    const participants = test.participants.length;
    if (participants === 0) return;

    const totalTasks = test.tasks.length;
    let completedTasks = 0;
    let totalTime = 0;
    let totalErrors = 0;
    let totalSatisfaction = 0;

    test.results.forEach(result => {
      if (result.completed) {
        completedTasks++;
        totalTime += result.timeSpent;
        totalSatisfaction += result.satisfactionRating;
      }
      totalErrors += result.errors.length;
    });

    const metrics: UsabilityMetric = {
      taskCompletionRate: (completedTasks / (participants * totalTasks)) * 100,
      averageTime: participants > 0 ? totalTime / completedTasks : 0,
      errorRate: (totalErrors / (participants * totalTasks)) * 100,
      satisfactionScore: participants > 0 ? totalSatisfaction / completedTasks : 0,
      mentalWorkload: this.calculateMentalWorkload(test.results),
      systemUsabilityScale: this.calculateSUS(test.results)
    };

    test.metrics.push(metrics);
  }

  private calculateMentalWorkload(results: TestResult[]): number {
    // Implementação simplificada do NASA-TLX
    const avgComplexity = results.reduce((sum, r) => sum + r.errors.length, 0) / results.length;
    return Math.min(100, avgComplexity * 20);
  }

  private calculateSUS(results: TestResult[]): number {
    // Sistema Usability Scale simplificado
    const avgSatisfaction = results.reduce((sum, r) => sum + r.satisfactionRating, 0) / results.length;
    return (avgSatisfaction / 5) * 100; // Normalizar para 0-100
  }

  getTestResults(testId: string): MedicalUsabilityTest | null {
    return this.tests.get(testId) || null;
  }

  getAllTests(): MedicalUsabilityTest[] {
    return Array.from(this.tests.values());
  }

  getTestMetrics(testId: string): UsabilityMetric[] {
    const test = this.tests.get(testId);
    return test?.metrics || [];
  }

  generateTestReport(testId: string): TestReport {
    const test = this.tests.get(testId);
    if (!test) {
      throw new Error(`Test ${testId} not found`);
    }

    const latestMetrics = test.metrics[test.metrics.length - 1];
    
    return {
      testId,
      testName: test.name,
      specialty: test.specialty.name,
      participants: test.participants.length,
      completionRate: latestMetrics?.taskCompletionRate || 0,
      avgTime: latestMetrics?.averageTime || 0,
      errorRate: latestMetrics?.errorRate || 0,
      satisfaction: latestMetrics?.satisfactionScore || 0,
      susScore: latestMetrics?.systemUsabilityScale || 0,
      mentalWorkload: latestMetrics?.mentalWorkload || 0,
      status: this.getTestStatus(latestMetrics),
      recommendations: this.generateRecommendations(latestMetrics),
      timestamp: new Date()
    };
  }

  private getTestStatus(metrics: UsabilityMetric | undefined): string {
    if (!metrics) return 'No Data';
    
    if (metrics.taskCompletionRate >= 90 && metrics.satisfactionScore >= 4.5) {
      return 'Excellent';
    } else if (metrics.taskCompletionRate >= 80 && metrics.satisfactionScore >= 4.0) {
      return 'Good';
    } else if (metrics.taskCompletionRate >= 70 && metrics.satisfactionScore >= 3.5) {
      return 'Acceptable';
    } else {
      return 'Needs Improvement';
    }
  }

  private generateRecommendations(metrics: UsabilityMetric | undefined): string[] {
    if (!metrics) return ['Insufficient data for recommendations'];
    
    const recommendations: string[] = [];
    
    if (metrics.taskCompletionRate < 80) {
      recommendations.push('Improve task flow and navigation clarity');
    }
    
    if (metrics.errorRate > 10) {
      recommendations.push('Reduce interface complexity and add more validation');
    }
    
    if (metrics.satisfactionScore < 4.0) {
      recommendations.push('Enhance user experience and interface design');
    }
    
    if (metrics.mentalWorkload > 60) {
      recommendations.push('Simplify workflows and reduce cognitive load');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('System performing well, continue monitoring');
    }
    
    return recommendations;
  }
}

export interface TestReport {
  testId: string;
  testName: string;
  specialty: string;
  participants: number;
  completionRate: number;
  avgTime: number;
  errorRate: number;
  satisfaction: number;
  susScore: number;
  mentalWorkload: number;
  status: string;
  recommendations: string[];
  timestamp: Date;
}