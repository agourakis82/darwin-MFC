// @ts-nocheck
/**
 * INTERFACE PARA SITUAÇÕES EXTREMAS
 * Interface simplificada para zonas de guerra e áreas remotas
 * Otimizada para uso com luvas, baixa visibilidade e situações críticas
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Activity, 
  AlertTriangle, 
  Phone, 
  Calculator,
  MapPin,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Settings,
  Shield,
  Zap
} from 'lucide-react';

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

export interface ExtremeInterfaceConfig {
  mode: 'normal' | 'emergency' | 'war' | 'night';
  touchSize: 'normal' | 'large' | 'extra_large';
  contrast: 'normal' | 'high' | 'maximum';
  sound: 'enabled' | 'vibration_only' | 'silent';
  voiceCommands: boolean;
  gestureControl: boolean;
  offlineMode: boolean;
}

export interface EmergencyButton {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'medical' | 'communication' | 'navigation' | 'tools';
  shortcut?: string;
  vibrationPattern?: number[];
}

export interface VoiceCommand {
  phrase: string;
  action: () => void;
  category: string;
  confidence: number;
}

// ============================================================================
// CONFIGURAÇÃO DE CORES PARA ALTA CONTRASTE
// ============================================================================

export const EXTREME_COLORS = {
  // Modo normal (boa visibilidade)
  normal: {
    background: 'bg-white dark:bg-gray-900',
    text: 'text-gray-900 dark:text-white',
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600',
    warning: 'bg-yellow-500 hover:bg-yellow-600',
    danger: 'bg-red-600 hover:bg-red-700',
    success: 'bg-green-600 hover:bg-green-700',
    border: 'border-gray-300 dark:border-gray-600'
  },
  
  // Alto contraste (baixa visibilidade)
  high: {
    background: 'bg-white',
    text: 'text-black',
    primary: 'bg-blue-700 hover:bg-blue-800 text-white',
    secondary: 'bg-gray-400 hover:bg-gray-500 text-black',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    danger: 'bg-red-700 hover:bg-red-800 text-white',
    success: 'bg-green-700 hover:bg-green-800 text-white',
    border: 'border-black border-2'
  },
  
  // Contraste máximo (emergência/ Guerra)
  maximum: {
    background: 'bg-black',
    text: 'text-white',
    primary: 'bg-blue-500 hover:bg-blue-400 text-white border-2 border-blue-300',
    secondary: 'bg-gray-300 hover:bg-gray-200 text-black border-2 border-gray-100',
    warning: 'bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-yellow-200',
    danger: 'bg-red-500 hover:bg-red-400 text-white border-2 border-red-300',
    success: 'bg-green-500 hover:bg-green-400 text-white border-2 border-green-300',
    border: 'border-white border-2'
  }
};

// ============================================================================
// CONFIGURAÇÕES PADRÃO
// ============================================================================

export const DEFAULT_EXTREME_CONFIG: ExtremeInterfaceConfig = {
  mode: 'normal',
  touchSize: 'normal',
  contrast: 'normal',
  sound: 'enabled',
  voiceCommands: false,
  gestureControl: false,
  offlineMode: false
};

// ============================================================================
// BOTÕES DE EMERGÊNCIA PRÉ-CONFIGURADOS
// ============================================================================

export const EMERGENCY_BUTTONS: EmergencyButton[] = [
  // Categoria Médica
  {
    id: 'cardiac-arrest',
    label: 'PCR',
    icon: <Heart className="w-8 h-8" />,
    action: () => window.location.href = '/emergency/cardiac',
    priority: 'critical',
    category: 'medical',
    vibrationPattern: [200, 100, 200, 100, 200]
  },
  {
    id: 'trauma',
    label: 'Trauma',
    icon: <Shield className="w-8 h-8" />,
    action: () => window.location.href = '/emergency/trauma',
    priority: 'critical',
    category: 'medical',
    vibrationPattern: [300, 100, 300]
  },
  {
    id: 'sepsis',
    label: 'Sepse',
    icon: <Zap className="w-8 h-8" />,
    action: () => window.location.href = '/emergency/sepsis',
    priority: 'high',
    category: 'medical',
    vibrationPattern: [200, 50, 200]
  },
  
  // Categoria Comunicação
  {
    id: 'call-help',
    label: 'Chamar',
    icon: <Phone className="w-8 h-8" />,
    action: () => window.location.href = '/emergency/call',
    priority: 'critical',
    category: 'communication',
    vibrationPattern: [500]
  },
  {
    id: 'location',
    label: 'Local',
    icon: <MapPin className="w-8 h-8" />,
    action: () => window.location.href = '/emergency/location',
    priority: 'medium',
    category: 'communication'
  },
  
  // Categoria Ferramentas
  {
    id: 'calculator',
    label: 'Calc',
    icon: <Calculator className="w-8 h-8" />,
    action: () => window.location.href = '/emergency/calculator',
    priority: 'high',
    category: 'tools'
  },
  {
    id: 'vitals',
    label: 'Sinais',
    icon: <Activity className="w-8 h-8" />,
    action: () => window.location.href = '/emergency/vitals',
    priority: 'high',
    category: 'tools'
  }
];

// ============================================================================
// COMANDOS DE VOZ
// ============================================================================

export const VOICE_COMMANDS: VoiceCommand[] = [
  {
    phrase: 'parada cardíaca',
    action: () => window.location.href = '/emergency/cardiac',
    category: 'medical',
    confidence: 0.9
  },
  {
    phrase: 'trauma',
    action: () => window.location.href = '/emergency/trauma',
    category: 'medical',
    confidence: 0.9
  },
  {
    phrase: 'sepse',
    action: () => window.location.href = '/emergency/sepsis',
    category: 'medical',
    confidence: 0.85
  },
  {
    phrase: 'chamar ajuda',
    action: () => window.location.href = '/emergency/call',
    category: 'communication',
    confidence: 0.95
  },
  {
    phrase: 'calculadora',
    action: () => window.location.href = '/emergency/calculator',
    category: 'tools',
    confidence: 0.8
  },
  {
    phrase: 'modo noturno',
    action: () => toggleNightMode(),
    category: 'interface',
    confidence: 0.85
  },
  {
    phrase: 'modo guerra',
    action: () => toggleWarMode(),
    category: 'interface',
    confidence: 0.8
  }
];

// ============================================================================
// CONTEXTO DA INTERFACE
// ============================================================================

export interface ExtremeInterfaceContextType {
  config: ExtremeInterfaceConfig;
  updateConfig: (updates: Partial<ExtremeInterfaceConfig>) => void;
  isOnline: boolean;
  batteryLevel: number;
  vibrationSupported: boolean;
  executeButtonAction: (buttonId: string) => void;
  triggerVibration: (pattern: number[]) => void;
}

// ============================================================================
// HOOK PERSONALIZADO PARA INTERFACE EXTREMA
// ============================================================================

export function useExtremeInterface(config: ExtremeInterfaceConfig = DEFAULT_EXTREME_CONFIG) {
  const [interfaceConfig, setInterfaceConfig] = useState<ExtremeInterfaceConfig>(config);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [vibrationSupported] = useState('vibrate' in navigator);

  // Atualizar configuração
  const updateConfig = useCallback((updates: Partial<ExtremeInterfaceConfig>) => {
    setInterfaceConfig(prev => ({ ...prev, ...updates }));
  }, []);

  // Executar ação de botão
  const executeButtonAction = useCallback((buttonId: string) => {
    const button = EMERGENCY_BUTTONS.find(b => b.id === buttonId);
    if (button) {
      // Feedback tátil
      triggerVibration(button.vibrationPattern || [100]);
      
      // Executar ação
      button.action();
    }
  }, []);

  // Trigger de vibração
  const triggerVibration = useCallback((pattern: number[]) => {
    if (vibrationSupported && interfaceConfig.sound !== 'silent') {
      navigator.vibrate(pattern);
    }
  }, [vibrationSupported, interfaceConfig.sound]);

  // Listeners de conectividade
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Monitor de bateria (se suportado)
  useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setBatteryLevel(battery.level * 100);
        
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(battery.level * 100);
        });
      });
    }
  }, []);

  // Configuração de voz (se habilitada)
  useEffect(() => {
    if (interfaceConfig.voiceCommands && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'pt-BR';
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        
        const command = VOICE_COMMANDS.find(cmd => 
          transcript.includes(cmd.phrase) && cmd.confidence > 0.7
        );
        
        if (command) {
          triggerVibration([200]);
          command.action();
        }
      };
      
      recognition.start();
      
      return () => recognition.stop();
    }
  }, [interfaceConfig.voiceCommands, triggerVibration]);

  return {
    config: interfaceConfig,
    updateConfig,
    isOnline,
    batteryLevel,
    vibrationSupported,
    executeButtonAction,
    triggerVibration
  };
}

// ============================================================================
// BOTÃO DE EMERGÊNCIA
// ============================================================================

export interface ExtremeEmergencyButtonProps {
  button: EmergencyButton;
  config: ExtremeInterfaceConfig;
  onAction: (buttonId: string) => void;
}

export const ExtremeEmergencyButton: React.FC<ExtremeEmergencyButtonProps> = ({
  button,
  config,
  onAction
}) => {
  const colors = EXTREME_COLORS[config.contrast];
  const sizeClasses = {
    normal: 'w-16 h-16 text-sm',
    large: 'w-20 h-20 text-base',
    extra_large: 'w-24 h-24 text-lg'
  };

  const priorityColors = {
    low: colors.secondary,
    medium: colors.primary,
    high: colors.warning,
    critical: colors.danger
  };

  const priorityBorders = {
    low: '',
    medium: 'border-2',
    high: 'border-2 border-yellow-400',
    critical: 'border-2 border-red-400 animate-pulse'
  };

  return (
    <motion.button
      className={`
        ${priorityColors[button.priority]}
        ${sizeClasses[config.touchSize]}
        ${priorityBorders[button.priority]}
        ${colors.text}
        ${colors.border}
        rounded-lg
        font-bold
        flex flex-col items-center justify-center
        gap-1
        transition-all duration-200
        active:scale-95
        select-none
        shadow-lg
      `}
      onClick={() => onAction(button.id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex-shrink-0">
        {button.icon}
      </div>
      <span className="font-black text-xs leading-tight">
        {button.label}
      </span>
      {button.priority === 'critical' && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
      )}
    </motion.button>
  );
};

// ============================================================================
// BARRA DE STATUS PARA SITUAÇÕES EXTREMAS
// ============================================================================

export interface ExtremeStatusBarProps {
  config: ExtremeInterfaceConfig;
  isOnline: boolean;
  batteryLevel: number | null;
  lastSync: Date | null;
}

export const ExtremeStatusBar: React.FC<ExtremeStatusBarProps> = ({
  config,
  isOnline,
  batteryLevel,
  lastSync
}) => {
  const colors = EXTREME_COLORS[config.contrast];

  return (
    <div className={`
      ${colors.background}
      ${colors.text}
      ${colors.border}
      border-b
      px-4
      py-2
      flex items-center justify-between
      text-xs
      font-bold
    `}>
      <div className="flex items-center gap-4">
        {/* Status de Conectividade */}
        <div className="flex items-center gap-1">
          {isOnline ? (
            <Wifi className="w-4 h-4 text-green-500" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-500" />
          )}
          <span>{isOnline ? 'Online' : 'Offline'}</span>
        </div>

        {/* Nível de Bateria */}
        {batteryLevel !== null && (
          <div className="flex items-center gap-1">
            <div className={`
              w-6 h-3 border ${colors.border}
              ${batteryLevel > 20 ? 'bg-green-500' : 'bg-red-500'}
            `}>
              <div 
                className="h-full bg-current transition-all duration-300"
                style={{ width: `${batteryLevel}%` }}
              />
            </div>
            <span>{Math.round(batteryLevel)}%</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Modo Atual */}
        <div className="flex items-center gap-1">
          {config.mode === 'night' ? (
            <Moon className="w-4 h-4" />
          ) : config.mode === 'war' ? (
            <Shield className="w-4 h-4 text-red-500" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
          <span className="uppercase">{config.mode}</span>
        </div>

        {/* Última Sincronização */}
        {lastSync && (
          <span>
            Sync: {lastSync.toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// PAINEL DE CONFIGURAÇÃO RÁPIDA
// ============================================================================

export interface ExtremeQuickSettingsProps {
  config: ExtremeInterfaceConfig;
  onUpdate: (updates: Partial<ExtremeInterfaceConfig>) => void;
  onClose: () => void;
}

export const ExtremeQuickSettings: React.FC<ExtremeQuickSettingsProps> = ({
  config,
  onUpdate,
  onClose
}) => {
  const colors = EXTREME_COLORS[config.contrast];

  const quickSettings = [
    {
      label: 'Modo Noturno',
      action: () => onUpdate({ 
        mode: config.mode === 'night' ? 'normal' : 'night',
        contrast: config.mode === 'night' ? 'normal' : 'high'
      }),
      active: config.mode === 'night',
      icon: <Moon className="w-5 h-5" />
    },
    {
      label: 'Modo Guerra',
      action: () => onUpdate({ 
        mode: config.mode === 'war' ? 'normal' : 'war',
        contrast: config.mode === 'war' ? 'normal' : 'maximum',
        touchSize: config.mode === 'war' ? 'normal' : 'large'
      }),
      active: config.mode === 'war',
      icon: <Shield className="w-5 h-5" />
    },
    {
      label: 'Alto Contraste',
      action: () => onUpdate({ 
        contrast: config.contrast === 'high' ? 'normal' : 'high'
      }),
      active: config.contrast === 'high',
      icon: <Settings className="w-5 h-5" />
    },
    {
      label: 'Comandos Voz',
      action: () => onUpdate({ 
        voiceCommands: !config.voiceCommands
      }),
      active: config.voiceCommands,
      icon: config.voiceCommands ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />
    }
  ];

  return (
    <motion.div
      className={`
        ${colors.background}
        ${colors.border}
        border-2
        rounded-lg
        p-4
        shadow-2xl
      `}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={`${colors.text} font-bold text-lg`}>Configurações Rápidas</h3>
        <button
          className={`
            ${colors.secondary}
            ${colors.text}
            px-3 py-1 rounded font-bold
          `}
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {quickSettings.map((setting, index) => (
          <button
            key={index}
            className={`
              ${setting.active ? colors.primary : colors.secondary}
              ${colors.text}
              p-3 rounded-lg
              font-bold
              flex flex-col items-center gap-2
              transition-all duration-200
              active:scale-95
            `}
            onClick={setting.action}
          >
            {setting.icon}
            <span className="text-xs">{setting.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

// ============================================================================
// DASHBOARD PRINCIPAL PARA EMERGÊNCIA
// ============================================================================

export interface ExtremeEmergencyDashboardProps {
  config: ExtremeInterfaceConfig;
  onConfigChange: (updates: Partial<ExtremeInterfaceConfig>) => void;
  isOnline: boolean;
  batteryLevel: number | null;
  lastSync: Date | null;
}

export const ExtremeEmergencyDashboard: React.FC<ExtremeEmergencyDashboardProps> = ({
  config,
  onConfigChange,
  isOnline,
  batteryLevel,
  lastSync
}) => {
  const { executeButtonAction } = useExtremeInterface(config);

  const [showSettings, setShowSettings] = useState(false);

  // Filtrar botões por prioridade e categoria
  const criticalButtons = EMERGENCY_BUTTONS.filter(b => b.priority === 'critical');
  const highPriorityButtons = EMERGENCY_BUTTONS.filter(b => b.priority === 'high');
  const otherButtons = EMERGENCY_BUTTONS.filter(b => !['critical', 'high'].includes(b.priority));

  return (
    <div className="min-h-screen bg-black">
      {/* Barra de Status */}
      <ExtremeStatusBar
        config={config}
        isOnline={isOnline}
        batteryLevel={batteryLevel}
        lastSync={lastSync}
      />

      {/* Conteúdo Principal */}
      <div className="p-4">
        {/* Botões Críticos */}
        <div className="mb-6">
          <h2 className="text-white font-bold text-lg mb-3 uppercase tracking-wide">
            Emergência Crítica
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {criticalButtons.map((button) => (
              <ExtremeEmergencyButton
                key={button.id}
                button={button}
                config={config}
                onAction={executeButtonAction}
              />
            ))}
          </div>
        </div>

        {/* Botões de Alta Prioridade */}
        {highPriorityButtons.length > 0 && (
          <div className="mb-6">
            <h2 className="text-white font-bold text-lg mb-3 uppercase tracking-wide">
              Alta Prioridade
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {highPriorityButtons.map((button) => (
                <ExtremeEmergencyButton
                  key={button.id}
                  button={button}
                  config={config}
                  onAction={executeButtonAction}
                />
              ))}
            </div>
          </div>
        )}

        {/* Outros Botões */}
        {otherButtons.length > 0 && (
          <div className="mb-6">
            <h2 className="text-white font-bold text-lg mb-3 uppercase tracking-wide">
              Ferramentas
            </h2>
            <div className="grid grid-cols-4 gap-2">
              {otherButtons.map((button) => (
                <ExtremeEmergencyButton
                  key={button.id}
                  button={button}
                  config={config}
                  onAction={executeButtonAction}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Botão de Configurações Flutuante */}
      <button
        className={`
          fixed bottom-6 right-6
          ${config.contrast === 'maximum' ? 'bg-blue-500 border-2 border-blue-300' : 'bg-blue-600'}
          text-white
          w-14 h-14
          rounded-full
          shadow-2xl
          flex items-center justify-center
          font-bold
          transition-all duration-200
          active:scale-95
          z-50
        `}
        onClick={() => setShowSettings(true)}
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Painel de Configurações */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center p-4 z-50">
            <ExtremeQuickSettings
              config={config}
              onUpdate={onConfigChange}
              onClose={() => setShowSettings(false)}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

function toggleNightMode() {
  // Implementação simplificada
  console.log('Ativando modo noturno');
}

function toggleWarMode() {
  // Implementação simplificada
  console.log('Ativando modo guerra');
}

// ============================================================================
// EXPORTS
// ============================================================================

// Components are exported inline above

// Export para compatibilidade
export default {
  useExtremeInterface,
  ExtremeEmergencyButton,
  ExtremeStatusBar,
  ExtremeQuickSettings,
  ExtremeEmergencyDashboard,
  EXTREME_COLORS,
  EMERGENCY_BUTTONS,
  VOICE_COMMANDS,
  DEFAULT_EXTREME_CONFIG
};