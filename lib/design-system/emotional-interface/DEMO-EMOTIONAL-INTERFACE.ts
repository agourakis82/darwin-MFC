/**
 * DEMONSTRAÇÃO: Interface Emocional Anti-Burnout
 * Darwin-MFC SOTA - Sistema Completo
 * 
 * Este arquivo demonstra como usar o sistema de Interface Emocional
 * implementado para prevenir burnout médico.
 */

import { EmotionalInterfaceSystem, DEFAULT_EMOTIONAL_CONFIG } from './index';

/**
 * DEMONSTRAÇÃO 1: Uso Básico com React
 */
export async function demoBasicReactUsage() {
  console.log('🚀 DEMO: Uso Básico com React');
  
  // Criar instância do sistema
  const emotionalSystem = new EmotionalInterfaceSystem({
    ...DEFAULT_EMOTIONAL_CONFIG,
    personalizationLevel: 'advanced',
    debugMode: true
  });

  // Inicializar sistema
  await emotionalSystem.initialize();

  // Configurar callbacks
  emotionalSystem.setCallbacks({
    onEmotionalStateChange: (state, adaptation) => {
      console.log('📊 Estado emocional mudou:', {
        stress: state.stressLevel,
        fatigue: state.fatigueLevel,
        energy: state.energyLevel,
        focus: state.focusLevel
      });

      // Aplicar adaptações visuais na UI
      if (adaptation.colorPalette === 'calm') {
        console.log('🌊 Aplicando modo calmo - cores suaves, texto maior');
      }
    },

    onAchievementUnlocked: (achievement) => {
      console.log('🏆 Achievement desbloqueado!', {
        title: achievement.title,
        description: achievement.description,
        points: achievement.points,
        rarity: achievement.rarity
      });
    },

    onReminderTriggered: (reminder) => {
      console.log('🔔 Lembrete disparado:', {
        title: reminder.intervention.title,
        description: reminder.intervention.description,
        type: reminder.type,
        priority: reminder.emotionalContext.recommendedIntervention.priority
      });
    },

    onWellnessAlert: (alert) => {
      console.warn('⚠️ Alerta de bem-estar:', {
        type: alert.type,
        message: alert.message,
        priority: alert.priority
      });
    }
  });

  return emotionalSystem;
}

/**
 * DEMONSTRAÇÃO 2: Simulação de Uso Intensivo
 */
export async function demoIntensiveUsage() {
  console.log('🔥 DEMO: Simulação de Uso Intensivo');
  
  const system = await demoBasicReactUsage();
  
  // Simular interações intensas (como um plantão médico)
  const intensiveActions = [
    { action: 'click', element: 'emergency-button', success: true },
    { action: 'type', element: 'prescription-input', success: true },
    { action: 'click', element: 'diagnosis-card', success: false }, // Erro intencional
    { action: 'scroll', element: 'patient-list', success: true },
    { action: 'navigation', element: 'medication-database', success: true },
    { action: 'click', element: 'drug-interaction-check', success: true },
    { action: 'type', element: 'clinical-notes', success: true },
    { action: 'click', element: 'save-patient-record', success: false }, // Outro erro
    { action: 'navigation', element: 'protocols', success: true },
    { action: 'click', element: 'urgent-case', success: true }
  ];

  let actionIndex = 0;
  const simulateIntensiveWork = setInterval(() => {
    if (actionIndex >= intensiveActions.length) {
      clearInterval(simulateIntensiveWork);
      console.log('✅ Simulação de uso intensivo concluída');
      return;
    }

    const action = intensiveActions[actionIndex];
    system.trackUserInteraction(
      action.action as any,
      action.element,
      action.success
    );

    console.log(`👨‍⚕️ Ação ${actionIndex + 1}: ${action.action} em ${action.element} - ${action.success ? 'sucesso' : 'erro'}`);
    
    actionIndex++;
  }, 2000); // A cada 2 segundos

  return system;
}

/**
 * DEMONSTRAÇÃO 3: Cenário de Burnout Crítico
 */
export async function demoCriticalBurnoutScenario() {
  console.log('🚨 DEMO: Cenário de Burnout Crítico');
  
  const system = await demoBasicReactUsage();
  
  // Configurar para modo de emergência
  system.updateConfig({
    adaptationSpeed: 'fast',
    personalizationLevel: 'advanced'
  });

  // Simular sinais críticos de burnout
  const criticalActions = [
    // Múltiplos erros consecutivos (sinal de fadiga)
    { action: 'click', element: 'medication-dosage', success: false },
    { action: 'type', element: 'patient-data', success: false },
    { action: 'click', element: 'lab-results', success: false },
    { action: 'navigation', element: 'emergency-protocol', success: false },
    
    // Navegação errática (estresse)
    { action: 'navigation', element: 'settings', success: true },
    { action: 'navigation', element: 'help', success: true },
    { action: 'navigation', element: 'back', success: true },
    { action: 'navigation', element: 'forward', success: true },
    { action: 'navigation', element: 'patient-list', success: true },
    
    // Sessão muito longa (sobrecarga)
    // O sistema detectará automaticamente
  ];

  let actionIndex = 0;
  const simulateCriticalBurnout = setInterval(() => {
    if (actionIndex >= criticalActions.length) {
      clearInterval(simulateCriticalBurnout);
      console.log('⚠️ Simulação de burnout crítico - aguardando resposta do sistema...');
      return;
    }

    const action = criticalActions[actionIndex];
    system.trackUserInteraction(
      action.action as any,
      action.element,
      action.success
    );

    console.log(`⚠️ Ação crítica ${actionIndex + 1}: ${action.action} - ${action.success ? 'OK' : 'ERRO'}`);
    
    actionIndex++;
  }, 1500); // Ações mais rápidas (estresse)

  return system;
}

/**
 * DEMONSTRAÇÃO 4: Exercícios de Bem-estar
 */
export async function demoWellnessExercises() {
  console.log('🧘‍♀️ DEMO: Exercícios de Bem-estar');
  
  const system = await demoBasicReactUsage();
  
  // Listar exercícios disponíveis
  const exercises = system.getAvailableExercises();
  console.log('💪 Exercícios disponíveis:', exercises.map(ex => ({
    id: ex.id,
    name: ex.name,
    category: ex.category,
    duration: ex.duration,
    difficulty: ex.difficulty
  })));

  // Simular usuário disparando exercícios
  setTimeout(() => {
    console.log('🎯 Disparando exercício de respiração...');
    system.triggerManualReminder('mindfulness');
  }, 3000);

  setTimeout(() => {
    console.log('💪 Disparando exercício de energia...');
    system.triggerManualReminder('exercise');
  }, 6000);

  setTimeout(() => {
    console.log('💧 Disparando lembrete de hidratação...');
    system.triggerManualReminder('hydration');
  }, 9000);

  return system;
}

/**
 * DEMONSTRAÇÃO 5: Analytics e Monitoramento
 */
export async function demoAnalytics() {
  console.log('📊 DEMO: Analytics e Monitoramento');
  
  const system = await demoBasicReactUsage();
  
  // Monitorar estado em tempo real
  const monitorState = setInterval(() => {
    const state = system.getState();
    const analytics = system.getAnalytics();
    
    console.log('📈 Estado atual:', {
      wellnessScore: state.wellnessScore,
      systemHealth: state.systemHealth,
      activeReminders: state.activeReminders.length,
      achievements: state.activeAchievements.length
    });

    console.log('📊 Analytics:', {
      stressLevel: analytics.metrics.averageStressLevel,
      fatigueLevel: analytics.metrics.averageFatigueLevel,
      energyLevel: analytics.metrics.averageEnergyLevel,
      adaptationEfficiency: analytics.metrics.adaptationEfficiency,
      preventionSuccessRate: analytics.metrics.preventionSuccessRate
    });

    // Verificar recomendações
    if (analytics.recommendations.length > 0) {
      console.log('💡 Recomendações:', analytics.recommendations.map(rec => ({
        type: rec.type,
        priority: rec.priority,
        title: rec.title,
        description: rec.description
      })));
    }
  }, 10000); // A cada 10 segundos

  // Parar monitoramento após 2 minutos
  setTimeout(() => {
    clearInterval(monitorState);
    console.log('✅ Monitoramento de analytics concluído');
  }, 120000);

  return system;
}

/**
 * DEMONSTRAÇÃO 6: Uso Completo Integrado
 */
export async function demoFullIntegration() {
  console.log('🎯 DEMO: Sistema Completo Integrado');
  
  const system = await demoBasicReactUsage();
  
  // Simular um turno completo de trabalho
  const workShift = [
    // Início do turno (alta energia)
    { time: 0, action: 'login', element: 'system', success: true },
    { time: 2000, action: 'click', element: 'patient-list', success: true },
    { time: 4000, action: 'click', element: 'first-patient', success: true },
    
    // Trabalho normal
    { time: 6000, action: 'type', element: 'diagnosis', success: true },
    { time: 8000, action: 'click', element: 'prescribe-medication', success: true },
    { time: 10000, action: 'navigation', element: 'lab-orders', success: true },
    
    // Desenvolvimento de fadiga (após 30 min)
    { time: 32000, action: 'click', element: 'patient-record', success: false },
    { time: 34000, action: 'click', element: 'patient-record', success: false },
    { time: 36000, action: 'navigation', element: 'search', success: true },
    
    // Primeira pausa recomendada pelo sistema
    { time: 38000, action: 'break', element: 'pause-button', success: true },
    
    // Retorno ao trabalho
    { time: 42000, action: 'click', element: 'urgent-case', success: true },
    { time: 44000, action: 'type', element: 'emergency-notes', success: true },
    
    // Sintomas de estresse crescente
    { time: 50000, action: 'click', element: 'medication-database', success: false },
    { time: 52000, action: 'navigation', element: 'protocols', success: true },
    { time: 54000, action: 'click', element: 'drug-check', success: false },
    
    // Sistema ativa modo calmo automaticamente
    // O usuário pode não notar, mas a interface está se adaptando
    
    // Segunda pausa
    { time: 58000, action: 'break', element: 'pause-button', success: true },
    
    // Exercício de respiração
    { time: 60000, action: 'mindfulness', element: 'breathing-exercise', success: true },
    
    // Final do turno
    { time: 65000, action: 'logout', element: 'system', success: true }
  ];

  workShift.forEach(event => {
    setTimeout(() => {
      if (event.action === 'break' || event.action === 'mindfulness') {
        system.triggerManualReminder(event.action as any);
      } else {
        system.trackUserInteraction(
          event.action as any,
          event.element,
          event.success
        );
      }
      
      const state = system.getState();
      console.log(`⏰ ${event.time/1000}s - ${event.action}: ${event.success ? '✅' : '❌'} | Wellness: ${state.wellnessScore}%`);
    }, event.time);
  });

  return system;
}

/**
 * FUNÇÃO PRINCIPAL PARA EXECUTAR TODAS AS DEMONSTRAÇÕES
 */
export async function runAllDemos() {
  console.log('🎬 INICIANDO DEMONSTRAÇÕES DA INTERFACE EMOCIONAL ANTI-BURNOUT');
  console.log('='.repeat(70));
  
  try {
    // Demo 1: Uso básico
    await demoBasicReactUsage();
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Demo 2: Uso intensivo
    await demoIntensiveUsage();
    await new Promise(resolve => setTimeout(resolve, 15000));
    
    // Demo 3: Burnout crítico
    await demoCriticalBurnoutScenario();
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Demo 4: Exercícios
    await demoWellnessExercises();
    await new Promise(resolve => setTimeout(resolve, 12000));
    
    // Demo 5: Analytics
    await demoAnalytics();
    await new Promise(resolve => setTimeout(resolve, 15000));
    
    // Demo 6: Integração completa
    await demoFullIntegration();
    await new Promise(resolve => setTimeout(resolve, 70000));
    
    console.log('🎉 TODAS AS DEMONSTRAÇÕES CONCLUÍDAS COM SUCESSO!');
    console.log('='.repeat(70));
    console.log('✨ Sistema de Interface Emocional Anti-Burnout implementado!');
    console.log('🎯 Funcionalidades implementadas:');
    console.log('   ✅ Monitoramento emocional em tempo real');
    console.log('   ✅ Adaptação visual dinâmica');
    console.log('   ✅ Sistema de feedback positivo');
    console.log('   ✅ Prevenção proativa de burnout');
    console.log('   ✅ Lembretes inteligentes');
    console.log('   ✅ Exercícios de bem-estar');
    console.log('   ✅ Achievements médicos');
    console.log('   ✅ Analytics e insights');
    console.log('');
    console.log('🏥 Pronto para cuidar do bem-estar dos médicos!');
    
  } catch (error) {
    console.error('❌ Erro durante as demonstrações:', error);
  }
}

/**
 * EXEMPLO DE USO EM PRODUÇÃO
 */
export const productionUsageExample = `
// Exemplo de como usar em uma aplicação real

import { EmotionalInterfaceSystem } from '@/lib/design-system/emotional-interface';

function MedicalApp() {
  const [emotionalSystem, setEmotionalSystem] = useState(null);
  const [wellnessData, setWellnessData] = useState({});

  useEffect(() => {
    // Inicializar sistema emocional
    const system = new EmotionalInterfaceSystem({
      monitoringEnabled: true,
      autoAdaptation: true,
      feedbackEnabled: true,
      preventionEnabled: true,
      personalizationLevel: 'advanced'
    });

    // Configurar callbacks
    system.setCallbacks({
      onEmotionalStateChange: (state, adaptation) => {
        // Aplicar adaptações visuais
        applyVisualAdaptations(adaptation);
        
        // Atualizar dados de bem-estar
        setWellnessData({
          stressLevel: state.stressLevel,
          energyLevel: state.energyLevel,
          focusLevel: state.focusLevel
        });
      },

      onReminderTriggered: (reminder) => {
        // Mostrar lembrete ao usuário
        showWellnessReminder(reminder);
      },

      onAchievementUnlocked: (achievement) => {
        // Celebrar conquista
        celebrateAchievement(achievement);
      },

      onWellnessAlert: (alert) => {
        // Alerta crítico de bem-estar
        if (alert.priority === 'high') {
          showEmergencyIntervention(alert);
        }
      }
    });

    // Inicializar
    system.initialize().then(() => {
      setEmotionalSystem(system);
    });

    // Cleanup
    return () => system.shutdown();
  }, []);

  const trackMedicalAction = (action, element, success) => {
    emotionalSystem?.trackUserInteraction(action, element, success);
  };

  const triggerBreak = () => {
    emotionalSystem?.triggerBreak('voluntary');
  };

  return (
    <MedicalInterface 
      onAction={trackMedicalAction}
      onBreak={triggerBreak}
      wellnessData={wellnessData}
    />
  );
}
`;

console.log('📚 Interface Emocional Anti-Burnout - Sistema Completo');
console.log('💡 Use runAllDemos() para ver todas as funcionalidades em ação!');
console.log('🔧 Veja productionUsageExample para implementação em produção');