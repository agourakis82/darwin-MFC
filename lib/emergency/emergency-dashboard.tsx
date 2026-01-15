// @ts-nocheck
/**
 * DASHBOARD CONTEXTUAL DE EMERGÊNCIA
 * Sistema de dashboard inteligente para medicina de emergência
 * Adapta-se automaticamente ao contexto e localização
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Activity,
  AlertTriangle,
  MapPin,
  Phone,
  Calculator,
  Clock,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  Wifi,
  WifiOff,
  Battery,
  Volume2,
  Navigation,
  Settings,
  Filter,
  Search,
  RefreshCw,
  Plus
} from 'lucide-react';

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

export interface EmergencyDashboardContext {
  location: {
    country: string;
    region: string;
    city: string;
    coordinates?: { lat: number; lng: number };
    timeZone: string;
  };
  medicalContext: {
    facilityType: 'hospital' | 'clinic' | 'ambulance' | 'field' | 'remote';
    specialty: 'general' | 'emergency' | 'pediatric' | 'obstetric' | 'trauma';
    resources: {
      available: string[];
      limited: string[];
      unavailable: string[];
    };
    staffLevel: 'resident' | 'specialist' | 'consultant' | 'general_practitioner';
  };
  situation: {
    type: 'routine' | 'busy' | 'overwhelmed' | 'disaster' | 'mass_casualty';
    severity: 'low' | 'medium' | 'high' | 'critical';
    activeCases: number;
    waitingTime: number; // minutos
  };
  systemStatus: {
    isOnline: boolean;
    batteryLevel: number;
    lastSync: Date | null;
    pendingUpdates: number;
    performance: 'excellent' | 'good' | 'fair' | 'poor';
  };
}

export interface DashboardWidget {
  id: string;
  type: 'alert' | 'protocol' | 'calculator' | 'contact' | 'resource' | 'status' | 'activity';
  title: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
  content: any;
  actions: DashboardAction[];
  configurable: boolean;
  collapsible: boolean;
}

export interface DashboardAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  primary: boolean;
  variant: 'primary' | 'secondary' | 'danger' | 'success';
}

export interface QuickAccessItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  route: string;
  category: 'emergency' | 'routine' | 'reference' | 'tools';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  regional?: string[];
  timeBased?: boolean;
}

// ============================================================================
// CONTEXTO INICIAL
// ============================================================================

const DEFAULT_CONTEXT: EmergencyDashboardContext = {
  location: {
    country: 'Brasil',
    region: 'São Paulo',
    city: 'São Paulo',
    timeZone: 'America/Sao_Paulo'
  },
  medicalContext: {
    facilityType: 'hospital',
    specialty: 'emergency',
    resources: {
      available: ['ecg', 'laboratory', 'radiology'],
      limited: ['icu', 'specialist'],
      unavailable: ['helicopter', 'neurosurgery']
    },
    staffLevel: 'resident'
  },
  situation: {
    type: 'routine',
    severity: 'low',
    activeCases: 5,
    waitingTime: 15
  },
  systemStatus: {
    isOnline: true,
    batteryLevel: 85,
    lastSync: new Date(),
    pendingUpdates: 0,
    performance: 'excellent'
  }
};

// ============================================================================
// WIDGETS DO DASHBOARD
// ============================================================================

const DASHBOARD_WIDGETS: Omit<DashboardWidget, 'content' | 'position'>[] = [
  {
    id: 'critical-alerts',
    type: 'alert',
    title: 'Alertas Críticos',
    priority: 'critical',
    size: 'medium',
    actions: [
      {
        id: 'view-all',
        label: 'Ver Todos',
        icon: <AlertTriangle className="w-4 h-4" />,
        action: () => {},
        primary: true,
        variant: 'danger'
      }
    ],
    configurable: true,
    collapsible: true
  },
  {
    id: 'active-protocols',
    type: 'protocol',
    title: 'Protocolos Ativos',
    priority: 'high',
    size: 'large',
    actions: [
      {
        id: 'new-protocol',
        label: 'Novo Protocolo',
        icon: <Plus className="w-4 h-4" />,
        action: () => {},
        primary: true,
        variant: 'primary'
      }
    ],
    configurable: true,
    collapsible: true
  },
  {
    id: 'emergency-contacts',
    type: 'contact',
    title: 'Contatos de Emergência',
    priority: 'high',
    size: 'small',
    actions: [],
    configurable: true,
    collapsible: true
  },
  {
    id: 'resource-status',
    type: 'status',
    title: 'Status dos Recursos',
    priority: 'medium',
    size: 'medium',
    actions: [
      {
        id: 'refresh',
        label: 'Atualizar',
        icon: <RefreshCw className="w-4 h-4" />,
        action: () => {},
        primary: false,
        variant: 'secondary'
      }
    ],
    configurable: true,
    collapsible: true
  },
  {
    id: 'recent-activity',
    type: 'activity',
    title: 'Atividade Recente',
    priority: 'medium',
    size: 'large',
    actions: [],
    configurable: true,
    collapsible: true
  },
  {
    id: 'quick-calculator',
    type: 'calculator',
    title: 'Calculadora Rápida',
    priority: 'high',
    size: 'small',
    actions: [
      {
        id: 'open-calculator',
        label: 'Abrir',
        icon: <Calculator className="w-4 h-4" />,
        action: () => {},
        primary: true,
        variant: 'primary'
      }
    ],
    configurable: true,
    collapsible: true
  }
];

// ============================================================================
// ITENS DE ACESSO RÁPIDO
// ============================================================================

const QUICK_ACCESS_ITEMS: QuickAccessItem[] = [
  // Emergência
  {
    id: 'cardiac-arrest',
    label: 'PCR',
    icon: <Heart className="w-5 h-5" />,
    route: '/emergency/cardiac',
    category: 'emergency',
    urgency: 'critical',
    regional: ['brasil', 'grecia', 'haiti', 'syria']
  },
  {
    id: 'trauma',
    label: 'Trauma',
    icon: <AlertTriangle className="w-5 h-5" />,
    route: '/emergency/trauma',
    category: 'emergency',
    urgency: 'critical',
    regional: ['brasil', 'grecia', 'haiti', 'syria']
  },
  {
    id: 'sepsis',
    label: 'Sepse',
    icon: <Activity className="w-5 h-5" />,
    route: '/emergency/sepsis',
    category: 'emergency',
    urgency: 'critical',
    regional: ['brasil', 'grecia', 'haiti', 'syria']
  },
  {
    id: 'call-help',
    label: 'Chamar Ajuda',
    icon: <Phone className="w-5 h-5" />,
    route: '/emergency/call',
    category: 'emergency',
    urgency: 'critical',
    regional: ['brasil', 'grecia', 'haiti', 'syria']
  },
  
  // Rotina
  {
    id: 'prenatal',
    label: 'Pré-natal',
    icon: <Users className="w-5 h-5" />,
    route: '/routine/prenatal',
    category: 'routine',
    urgency: 'medium',
    regional: ['brasil', 'grecia']
  },
  {
    id: 'pediatric',
    label: 'Pediátrico',
    icon: <Users className="w-5 h-5" />,
    route: '/routine/pediatric',
    category: 'routine',
    urgency: 'medium',
    regional: ['brasil', 'grecia', 'haiti', 'syria']
  },
  
  // Referência
  {
    id: 'medications',
    label: 'Medicamentos',
    icon: <Filter className="w-5 h-5" />,
    route: '/reference/medications',
    category: 'reference',
    urgency: 'low',
    regional: ['brasil', 'grecia', 'haiti', 'syria']
  },
  {
    id: 'guidelines',
    label: 'Diretrizes',
    icon: <Settings className="w-5 h-5" />,
    route: '/reference/guidelines',
    category: 'reference',
    urgency: 'low',
    regional: ['brasil', 'grecia', 'haiti', 'syria']
  },
  
  // Ferramentas
  {
    id: 'calculator',
    label: 'Calculadoras',
    icon: <Calculator className="w-5 h-5" />,
    route: '/tools/calculator',
    category: 'tools',
    urgency: 'medium',
    regional: ['brasil', 'grecia', 'haiti', 'syria']
  },
  {
    id: 'location',
    label: 'Localização',
    icon: <MapPin className="w-5 h-5" />,
    route: '/tools/location',
    category: 'tools',
    urgency: 'medium',
    regional: ['brasil', 'grecia', 'haiti', 'syria']
  }
];

// ============================================================================
// HOOK PARA CONTEXTO DO DASHBOARD
// ============================================================================

function useEmergencyDashboardContext(initialContext: EmergencyDashboardContext = DEFAULT_CONTEXT) {
  const [context, setContext] = useState<EmergencyDashboardContext>(initialContext);
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);
  const [quickAccessItems, setQuickAccessItems] = useState<QuickAccessItem[]>([]);

  // Atualizar contexto
  const updateContext = (updates: Partial<EmergencyDashboardContext>) => {
    setContext(prev => ({ ...prev, ...updates }));
  };

  // Detectar localização automaticamente
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setContext(prev => ({
            ...prev,
            location: {
              ...prev.location,
              coordinates: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            }
          }));
        },
        (error) => {
          console.warn('Não foi possível obter localização:', error);
        }
      );
    }
  }, []);

  // Configurar widgets baseado no contexto
  useEffect(() => {
    const configuredWidgets: DashboardWidget[] = DASHBOARD_WIDGETS.map(widget => ({
      ...widget,
      content: getWidgetContent(widget.id, context),
      position: getWidgetPosition(widget.id)
    }));

    setWidgets(configuredWidgets);
  }, [context]);

  // Filtrar itens de acesso rápido
  const filteredQuickAccess = useMemo(() => {
    return QUICK_ACCESS_ITEMS.filter(item => {
      // Filtrar por região
      if (item.regional && !item.regional.includes(context.location.country.toLowerCase())) {
        return false;
      }
      
      // Filtrar por tipo de situação
      if (context.situation.type === 'disaster' && item.urgency === 'low') {
        return false;
      }
      
      return true;
    });
  }, [context]);

  useEffect(() => {
    setQuickAccessItems(filteredQuickAccess);
  }, [filteredQuickAccess]);

  return {
    context,
    updateContext,
    widgets,
    quickAccessItems,
    filteredQuickAccess
  };
}

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

function getWidgetContent(widgetId: string, context: EmergencyDashboardContext): any {
  switch (widgetId) {
    case 'critical-alerts':
      return {
        alerts: [
          {
            id: '1',
            message: 'PCR em andamento - Sala 3',
            severity: 'critical',
            timestamp: new Date(),
            action: () => {}
          },
          {
            id: '2',
            message: 'Sepse confirmada - Paciente ID 12345',
            severity: 'high',
            timestamp: new Date(),
            action: () => {}
          }
        ]
      };
    
    case 'active-protocols':
      return {
        protocols: [
          {
            id: '1',
            name: 'RCP Adulto',
            status: 'active',
            startTime: new Date(),
            steps: 5,
            completedSteps: 2
          }
        ]
      };
    
    case 'emergency-contacts':
      return {
        contacts: getEmergencyContacts(context.location.country)
      };
    
    case 'resource-status':
      return {
        resources: context.medicalContext.resources,
        systemStatus: context.systemStatus
      };
    
    case 'recent-activity':
      return {
        activities: [
          {
            id: '1',
            action: 'Protocolo RCP iniciado',
            timestamp: new Date(),
            user: 'Dr. Silva'
          }
        ]
      };
    
    default:
      return {};
  }
}

function getEmergencyContacts(country: string): any[] {
  const contacts: Record<string, any[]> = {
    brasil: [
      { service: 'SAMU', number: '192', description: 'Emergências médicas' },
      { service: 'Bombeiros', number: '193', description: 'Incêndios e resgates' },
      { service: 'Polícia', number: '190', description: 'Emergências policiais' }
    ],
    grecia: [
      { service: 'EKAB', number: '166', description: 'Serviços médicos de emergência' },
      { service: 'Fire Service', number: '199', description: 'Bombeiros' }
    ],
    haiti: [
      { service: 'Police', number: '118', description: 'Serviços policiais' },
      { service: 'UN Peacekeeping', number: '9999', description: 'Casos específicos' }
    ],
    syria: [
      { service: 'Civil Defence', number: '110', description: 'Defesa civil' },
      { service: 'Red Crescent', number: '114', description: 'Cruz Vermelha' }
    ]
  };

  return contacts[country.toLowerCase()] || [];
}

function getWidgetPosition(widgetId: string): { x: number; y: number } {
  const positions: Record<string, { x: number; y: number }> = {
    'critical-alerts': { x: 0, y: 0 },
    'active-protocols': { x: 1, y: 0 },
    'emergency-contacts': { x: 2, y: 0 },
    'resource-status': { x: 0, y: 1 },
    'recent-activity': { x: 1, y: 1 },
    'quick-calculator': { x: 2, y: 1 }
  };

  return positions[widgetId] || { x: 0, y: 0 };
}

// ============================================================================
// WIDGETS DO DASHBOARD
// ============================================================================

interface CriticalAlertsWidgetProps {
  content: any;
  onAction: (actionId: string) => void;
}

const CriticalAlertsWidget: React.FC<CriticalAlertsWidgetProps> = ({ content, onAction }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-red-900 font-bold text-lg">Alertas Críticos</h3>
        <AlertTriangle className="w-6 h-6 text-red-600" />
      </div>
      
      <div className="space-y-2">
        {content.alerts.map((alert: any) => (
          <div key={alert.id} className="bg-white rounded p-3 border border-red-200">
            <div className="flex items-start justify-between">
              <p className="text-sm text-gray-900">{alert.message}</p>
              <span className={`
                px-2 py-1 text-xs rounded font-bold
                ${alert.severity === 'critical' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'}
              `}>
                {alert.severity.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {alert.timestamp.toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
      
      <button
        onClick={() => onAction('view-all')}
        className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-bold text-sm transition-colors"
      >
        Ver Todos os Alertas
      </button>
    </div>
  );
};

interface ActiveProtocolsWidgetProps {
  content: any;
  onAction: (actionId: string) => void;
}

const ActiveProtocolsWidget: React.FC<ActiveProtocolsWidgetProps> = ({ content, onAction }) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-blue-900 font-bold text-lg">Protocolos Ativos</h3>
        <Activity className="w-6 h-6 text-blue-600" />
      </div>
      
      <div className="space-y-3">
        {content.protocols.map((protocol: any) => (
          <div key={protocol.id} className="bg-white rounded p-3 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-sm text-gray-900">{protocol.name}</h4>
              <span className="bg-green-600 text-white px-2 py-1 text-xs rounded font-bold">
                ATIVO
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Iniciado: {protocol.startTime.toLocaleTimeString()}</span>
              <span>{protocol.completedSteps}/{protocol.steps} passos</span>
            </div>
            
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(protocol.completedSteps / protocol.steps) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={() => onAction('new-protocol')}
        className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-bold text-sm transition-colors"
      >
        Novo Protocolo
      </button>
    </div>
  );
};

interface EmergencyContactsWidgetProps {
  content: any;
}

const EmergencyContactsWidget: React.FC<EmergencyContactsWidgetProps> = ({ content }) => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-green-900 font-bold text-lg">Contatos</h3>
        <Phone className="w-6 h-6 text-green-600" />
      </div>
      
      <div className="space-y-2">
        {content.contacts.map((contact: any, index: number) => (
          <div key={index} className="bg-white rounded p-2 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-gray-900">{contact.service}</p>
                <p className="text-xs text-gray-600">{contact.description}</p>
              </div>
              <a
                href={`tel:${contact.number}`}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded font-bold text-sm transition-colors"
              >
                {contact.number}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface ResourceStatusWidgetProps {
  content: any;
  onAction: (actionId: string) => void;
}

const ResourceStatusWidget: React.FC<ResourceStatusWidgetProps> = ({ content, onAction }) => {
  const { resources, systemStatus } = content;

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-purple-900 font-bold text-lg">Status</h3>
        <div className="flex items-center gap-2">
          {systemStatus.isOnline ? (
            <Wifi className="w-5 h-5 text-green-600" />
          ) : (
            <WifiOff className="w-5 h-5 text-red-600" />
          )}
          <Battery className="w-5 h-5 text-green-600" />
          <span className="text-sm font-bold">{systemStatus.batteryLevel}%</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <h4 className="font-bold text-sm text-gray-900 mb-2">Recursos Disponíveis</h4>
          <div className="flex flex-wrap gap-1">
            {resources.available.map((resource: string, index: number) => (
              <span key={index} className="bg-green-600 text-white px-2 py-1 text-xs rounded font-bold">
                {resource}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-sm text-gray-900 mb-2">Recursos Limitados</h4>
          <div className="flex flex-wrap gap-1">
            {resources.limited.map((resource: string, index: number) => (
              <span key={index} className="bg-yellow-600 text-white px-2 py-1 text-xs rounded font-bold">
                {resource}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <button
        onClick={() => onAction('refresh')}
        className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded font-bold text-sm transition-colors flex items-center justify-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Atualizar
      </button>
    </div>
  );
};

// ============================================================================
// COMPONENTE PRINCIPAL DO DASHBOARD
// ============================================================================

export interface EmergencyDashboardProps {
  context?: EmergencyDashboardContext;
  onContextUpdate?: (updates: Partial<EmergencyDashboardContext>) => void;
  onWidgetAction?: (widgetId: string, actionId: string) => void;
  onQuickAccess?: (itemId: string) => void;
  showQuickAccess?: boolean;
  showStatusBar?: boolean;
}

export const EmergencyDashboard: React.FC<EmergencyDashboardProps> = ({
  context: initialContext,
  onContextUpdate,
  onWidgetAction,
  onQuickAccess,
  showQuickAccess = true,
  showStatusBar = true
}) => {
  const { context, updateContext, widgets, quickAccessItems } = useEmergencyDashboardContext(initialContext);

  // Atualizar contexto externo quando mudar
  useEffect(() => {
    if (onContextUpdate) {
      onContextUpdate(context);
    }
  }, [context, onContextUpdate]);

  const handleWidgetAction = (widgetId: string, actionId: string) => {
    if (onWidgetAction) {
      onWidgetAction(widgetId, actionId);
    }
  };

  const handleQuickAccess = (itemId: string) => {
    if (onQuickAccess) {
      onQuickAccess(itemId);
    } else {
      const item = quickAccessItems.find(i => i.id === itemId);
      if (item) {
        window.location.href = item.route;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra de Status */}
      {showStatusBar && (
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-600" />
                <span className="font-bold text-sm">
                  {context.location.city}, {context.location.country}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-gray-600" />
                <span className="font-bold text-sm">
                  {context.medicalContext.facilityType} - {context.situation.severity}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {context.systemStatus.isOnline ? (
                  <Wifi className="w-5 h-5 text-green-600" />
                ) : (
                  <WifiOff className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div className="text-sm text-gray-600">
                {context.situation.activeCases} casos ativos
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-4">
        {/* Acesso Rápido */}
        {showQuickAccess && (
          <div className="mb-6">
            <h2 className="text-gray-900 font-bold text-lg mb-3">Acesso Rápido</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {quickAccessItems.map((item) => {
                const urgencyColors = {
                  critical: 'bg-red-600 hover:bg-red-700 border-red-700',
                  high: 'bg-orange-600 hover:bg-orange-700 border-orange-700',
                  medium: 'bg-blue-600 hover:bg-blue-700 border-blue-700',
                  low: 'bg-gray-600 hover:bg-gray-700 border-gray-700'
                };

                return (
                  <button
                    key={item.id}
                    onClick={() => handleQuickAccess(item.id)}
                    className={`
                      ${urgencyColors[item.urgency]}
                      text-white p-3 rounded-lg border-2
                      flex flex-col items-center gap-2
                      transition-all duration-200
                      active:scale-95
                      shadow-lg
                    `}
                  >
                    <div className="flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="font-bold text-xs leading-tight text-center">
                      {item.label}
                    </span>
                    {item.urgency === 'critical' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Widgets do Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {widgets.map((widget) => (
            <div key={widget.id} className="col-span-1">
              {widget.type === 'alert' && (
                <CriticalAlertsWidget 
                  content={widget.content} 
                  onAction={(actionId) => handleWidgetAction(widget.id, actionId)}
                />
              )}
              {widget.type === 'protocol' && (
                <ActiveProtocolsWidget 
                  content={widget.content}
                  onAction={(actionId) => handleWidgetAction(widget.id, actionId)}
                />
              )}
              {widget.type === 'contact' && (
                <EmergencyContactsWidget content={widget.content} />
              )}
              {widget.type === 'status' && (
                <ResourceStatusWidget 
                  content={widget.content}
                  onAction={(actionId) => handleWidgetAction(widget.id, actionId)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Export para compatibilidade
export default {
  useEmergencyDashboardContext,
  EmergencyDashboard,
  CriticalAlertsWidget,
  ActiveProtocolsWidget,
  EmergencyContactsWidget,
  ResourceStatusWidget
};