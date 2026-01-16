/**
 * Interface Emocional Anti-Burnout - Darwin-MFC SOTA
 * ==================================================
 * 
 * Sistema completo de Interface Emocional que monitora o bem-estar do médico
 * e se adapta proativamente para prevenir burnout médico.
 */

// Exportar sistema principal
export { EmotionalInterfaceSystem } from './emotional-interface-system';

// Exportar sistema de monitoramento emocional
export { EmotionalMonitor } from './emotional-monitor';

// Exportar engine de adaptação visual
export { VisualAdaptationEngine } from './visual-adaptation-engine';

// Exportar sistema de feedback positivo
export { PositiveFeedbackSystem } from './positive-feedback-system';

// Exportar sistema de prevenção de burnout
export { BurnoutPreventionSystem } from './burnout-prevention-system';

// Re-exportar tipos principais de cada módulo
export type {
  EmotionalInterfaceConfig,
  EmotionalInterfaceState,
  EmotionalAnalytics
} from './emotional-interface-system';

export type {
  EmotionalState,
  BurnoutRisk
} from './emotional-monitor';

export type {
  VisualAdaptation
} from './visual-adaptation-engine';

export type {
  MedicalAchievement,
  PositiveFeedback
} from './positive-feedback-system';

export type {
  PreventionStrategy,
  BreakReminder,
  ExerciseRoutine
} from './burnout-prevention-system';

// Configurações predefinidas
export const DEFAULT_EMOTIONAL_CONFIG = {
  monitoringEnabled: true,
  autoAdaptation: true,
  feedbackEnabled: true,
  preventionEnabled: true,
  debugMode: false,
  adaptationSpeed: 'medium',
  personalizationLevel: 'standard'
} as const;

export const EMERGENCY_EMOTIONAL_CONFIG = {
  monitoringEnabled: true,
  autoAdaptation: true,
  feedbackEnabled: true,
  preventionEnabled: true,
  debugMode: false,
  adaptationSpeed: 'fast',
  personalizationLevel: 'advanced'
};

export const DEBUG_EMOTIONAL_CONFIG = {
  monitoringEnabled: true,
  autoAdaptation: true,
  feedbackEnabled: true,
  preventionEnabled: true,
  debugMode: true,
  adaptationSpeed: 'fast',
  personalizationLevel: 'advanced'
};

// Utilitários
export const createEmotionalInterface = async (config?: any) => {
  const { EmotionalInterfaceSystem } = await import('./emotional-interface-system');
  const system = new EmotionalInterfaceSystem(config);
  await system.initialize();
  return system;
};

export const getDefaultConfig = () => ({ ...DEFAULT_EMOTIONAL_CONFIG });
export const getEmergencyConfig = () => ({ ...EMERGENCY_EMOTIONAL_CONFIG });
export const getDebugConfig = () => ({ ...DEBUG_EMOTIONAL_CONFIG });

// Eventos do sistema
export const EMOTIONAL_INTERFACE_EVENTS = {
  SYSTEM_INITIALIZED: 'emotional:system:initialized',
  SYSTEM_SHUTDOWN: 'emotional:system:shutdown',
  EMOTIONAL_STATE_CHANGED: 'emotional:state:changed',
  VISUAL_ADAPTATION_APPLIED: 'emotional:adaptation:applied',
  ACHIEVEMENT_UNLOCKED: 'emotional:achievement:unlocked',
  FEEDBACK_GENERATED: 'emotional:feedback:generated',
  REMINDER_TRIGGERED: 'emotional:reminder:triggered',
  REMINDER_COMPLETED: 'emotional:reminder:completed',
  EXERCISE_STARTED: 'emotional:exercise:started',
  WELLNESS_ALERT: 'emotional:alert:wellness',
  BURNOUT_RISK_HIGH: 'emotional:alert:burnout-risk',
  EMERGENCY_INTERVENTION: 'emotional:emergency:intervention'
} as const;

// Validação de configuração
export function validateEmotionalConfig(config: any) {
  const validatedConfig = { ...DEFAULT_EMOTIONAL_CONFIG, ...config };
  
  if (validatedConfig.adaptationSpeed && !['slow', 'medium', 'fast'].includes(validatedConfig.adaptationSpeed)) {
    validatedConfig.adaptationSpeed = 'medium';
  }
  
  if (validatedConfig.personalizationLevel && !['minimal', 'standard', 'advanced'].includes(validatedConfig.personalizationLevel)) {
    validatedConfig.personalizationLevel = 'standard';
  }
  
  return validatedConfig;
}

// Exportação principal (default)
export { EmotionalInterfaceSystem as default } from './emotional-interface-system';