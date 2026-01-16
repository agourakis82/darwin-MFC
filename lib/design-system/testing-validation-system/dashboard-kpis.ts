/**
 * DASHBOARD DE KPIs E MÉTRICAS EXECUTIVAS
 * =====================================
 * 
 * Sistema avançado de dashboard para monitoramento executivo
 * das métricas críticas das inovações UI/UX médicas.
 */

export interface ExecutiveDashboard {
  id: string;
  name: string;
  description: string;
  category: 'Executive' | 'Clinical' | 'Operations' | 'Financial' | 'Quality';
  audience: 'C-Suite' | 'Directors' | 'Managers' | 'Clinicians' | 'IT';
  refreshRate: number;
  layout: DashboardLayout;
  widgets: DashboardWidget[];
  filters: DashboardFilter[];
  permissions: DashboardPermission[];
  sharing: DashboardSharing;
  lastUpdated: Date;
  status: 'Active' | 'Archived' | 'Draft';
}

export interface DashboardLayout {
  template: 'Executive Overview' | 'Clinical Performance' | 'Financial Metrics' | 'Quality Indicators' | 'Custom';
  columns: number;
  rows: number;
  theme: 'Light' | 'Dark' | 'Auto';
  responsive: boolean;
  animations: boolean;
}

export interface DashboardWidget {
  id: string;
  type: 'KPI' | 'Chart' | 'Gauge' | 'Table' | 'Map' | 'Alert' | 'Progress' | 'Trend';
  title: string;
  description: string;
  position: WidgetPosition;
  size: WidgetSize;
  dataSource: DataSource;
  visualization: VisualizationConfig;
  interactions: WidgetInteraction[];
  refresh: WidgetRefresh;
  alerts: WidgetAlert[];
  customizations: WidgetCustomization;
}

export interface WidgetPosition {
  x: number;
  y: number;
  z?: number;
  columnSpan?: number;
  rowSpan?: number;
}

export interface WidgetSize {
  width: 'Small' | 'Medium' | 'Large' | 'Extra Large';
  height: 'Small' | 'Medium' | 'Large' | 'Extra Large';
  minWidth?: number;
  minHeight?: number;
}

export interface DataSource {
  id: string;
  name: string;
  type: 'Real-time' | 'Batch' | 'API' | 'Database' | 'External';
  connection: ConnectionConfig;
  query: string;
  schema: DataSchema;
  filters: DataFilter[];
  refreshInterval: number;
  cache: CacheConfig;
}

export interface ConnectionConfig {
  protocol: string;
  host: string;
  port: number;
  credentials: CredentialConfig;
  timeout: number;
  encryption: boolean;
}

export interface CredentialConfig {
  type: 'API Key' | 'Username/Password' | 'OAuth' | 'Certificate';
  credentials: Record<string, string>;
}

export interface DataSchema {
  fields: SchemaField[];
  relationships: SchemaRelationship[];
  indexes: string[][];
}

export interface SchemaField {
  name: string;
  type: 'String' | 'Number' | 'Boolean' | 'Date' | 'Object' | 'Array';
  nullable: boolean;
  description: string;
  format?: string;
}

export interface SchemaRelationship {
  from: string;
  to: string;
  type: 'One-to-One' | 'One-to-Many' | 'Many-to-Many';
  cardinality: string;
}

export interface DataFilter {
  field: string;
  operator: 'Equals' | 'Not Equals' | 'Contains' | 'In' | 'Greater Than' | 'Less Than' | 'Between';
  value: any;
  label: string;
}

export interface CacheConfig {
  enabled: boolean;
  duration: number;
  strategy: 'LRU' | 'TTL' | 'Manual';
}

export interface VisualizationConfig {
  chartType: 'Line' | 'Bar' | 'Area' | 'Pie' | 'Donut' | 'Scatter' | 'Heatmap' | 'Gauge';
  colors: string[];
  theme: 'Default' | 'Monochrome' | 'Colorful' | 'Custom';
  axis: AxisConfig;
  legend: LegendConfig;
  tooltip: TooltipConfig;
  animation: AnimationConfig;
}

export interface AxisConfig {
  x: {
    show: boolean;
    label: string;
    type: 'Category' | 'Value' | 'Time';
  };
  y: {
    show: boolean;
    label: string;
    type: 'Category' | 'Value' | 'Time';
    min?: number;
    max?: number;
  };
}

export interface LegendConfig {
  show: boolean;
  position: 'Top' | 'Bottom' | 'Left' | 'Right';
  alignment: 'Start' | 'Center' | 'End';
}

export interface TooltipConfig {
  show: boolean;
  format: string;
  customContent?: string;
}

export interface AnimationConfig {
  enabled: boolean;
  duration: number;
  easing: string;
}

export interface WidgetInteraction {
  type: 'Click' | 'Hover' | 'Drill Down' | 'Filter' | 'Select';
  action: string;
  target: string;
  parameters?: Record<string, any>;
}

export interface WidgetRefresh {
  autoRefresh: boolean;
  interval: number;
  manualRefresh: boolean;
  cache: boolean;
}

export interface WidgetAlert {
  enabled: boolean;
  condition: AlertCondition;
  thresholds: AlertThreshold[];
  notification: AlertNotification;
}

export interface AlertCondition {
  metric: string;
  operator: '>' | '<' | '>=' | '<=' | '==' | '!=' | 'Between';
  value: number;
  timeframe?: string;
}

export interface AlertThreshold {
  level: 'Warning' | 'Critical' | 'Info';
  value: number;
  color: string;
  label: string;
}

export interface AlertNotification {
  channels: ('Email' | 'SMS' | 'Slack' | 'Teams' | 'Webhook')[];
  recipients: string[];
  template: string;
  delay: number;
}

export interface WidgetCustomization {
  showDataLabels: boolean;
  showPercentages: boolean;
  showTrends: boolean;
  showComparisons: boolean;
  customCSS?: string;
  customJS?: string;
}

export interface DashboardFilter {
  id: string;
  name: string;
  type: 'Date Range' | 'Multi-select' | 'Single-select' | 'Text' | 'Numeric';
  field: string;
  options?: FilterOption[];
  defaultValue: any;
  required: boolean;
  position: FilterPosition;
}

export interface FilterOption {
  label: string;
  value: any;
  count?: number;
  selected?: boolean;
}

export interface FilterPosition {
  location: 'Top' | 'Left' | 'Right' | 'Bottom';
  alignment: 'Start' | 'Center' | 'End';
  span: number;
}

export interface DashboardPermission {
  userRole: string;
  permissions: ('View' | 'Edit' | 'Delete' | 'Share' | 'Export')[];
  restrictions: PermissionRestriction[];
}

export interface PermissionRestriction {
  type: 'Data' | 'Widget' | 'Time Range';
  value: any;
  description: string;
}

export interface DashboardSharing {
  public: boolean;
  sharedWith: string[];
  linkAccess: 'View Only' | 'View and Edit' | 'Password Protected';
  expiration?: Date;
  exportFormats: ('PDF' | 'PNG' | 'Excel' | 'CSV' | 'JSON')[];
  watermarking: boolean;
}

export interface KPIMetric {
  id: string;
  name: string;
  category: 'Performance' | 'Quality' | 'Efficiency' | 'Satisfaction' | 'Financial' | 'Clinical';
  description: string;
  formula: string;
  target: number;
  unit: string;
  frequency: 'Real-time' | 'Hourly' | 'Daily' | 'Weekly' | 'Monthly';
  dataSource: string;
  currentValue?: number;
  validation: KPIValidation;
  benchmarks: KPIBenchmark[];
  trends: KPITrend[];
  alerts: KPIAlert[];
}

export interface KPIValidation {
  required: boolean;
  range: {
    min: number;
    max: number;
  };
  businessRules: string[];
  dataQuality: QualityCheck[];
}

export interface QualityCheck {
  type: 'Completeness' | 'Accuracy' | 'Timeliness' | 'Consistency';
  threshold: number;
  action: string;
}

export interface KPIBenchmark {
  name: string;
  value: number;
  source: string;
  year: number;
  type: 'Industry' | 'Peer' | 'Best Practice' | 'Internal';
}

export interface KPITrend {
  date: Date;
  value: number;
  change: number;
  changeType: 'Increase' | 'Decrease' | 'Stable';
}

export interface KPIAlert {
  id: string;
  level: 'Info' | 'Warning' | 'Critical';
  condition: string;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

export class ExecutiveDashboardSystem {
  private dashboards: Map<string, ExecutiveDashboard> = new Map();
  private kpis: Map<string, KPIMetric> = new Map();

  constructor() {
    this.initializeExecutiveDashboards();
    this.initializeKPIMetrics();
  }

  private initializeExecutiveDashboards(): void {
    const executiveOverview: ExecutiveDashboard = {
      id: 'executive-overview',
      name: 'Executive Overview Dashboard',
      description: 'Comprehensive executive dashboard showing key performance indicators',
      category: 'Executive',
      audience: 'C-Suite',
      refreshRate: 300,
      layout: {
        template: 'Executive Overview',
        columns: 12,
        rows: 8,
        theme: 'Auto',
        responsive: true,
        animations: true
      },
      widgets: [],
      filters: [],
      permissions: [],
      sharing: {
        public: false,
        sharedWith: ['ceo@darwin-mfc.com', 'cto@darwin-mfc.com'],
        linkAccess: 'View Only',
        exportFormats: ['PDF', 'PNG', 'Excel'],
        watermarking: true
      },
      lastUpdated: new Date(),
      status: 'Active'
    };

    this.dashboards.set(executiveOverview.id, executiveOverview);
  }

  private initializeKPIMetrics(): void {
    const systemHealthKPI: KPIMetric = {
      id: 'system-health',
      name: 'System Health Score',
      category: 'Performance',
      description: 'Overall health score of the Darwin-MFC system',
      formula: '(Uptime * 0.4) + (Performance Score * 0.4) + ((100 - Error Rate) * 0.2)',
      target: 95,
      unit: 'score',
      frequency: 'Real-time',
      dataSource: 'system_health',
      currentValue: 95,
      validation: {
        required: true,
        range: { min: 0, max: 100 },
        businessRules: ['Score must be between 0 and 100'],
        dataQuality: []
      },
      benchmarks: [
        { name: 'Industry Average', value: 87, source: 'Healthcare IT Report 2024', year: 2024, type: 'Industry' }
      ],
      trends: [
        { date: new Date('2024-01-01'), value: 92, change: 2.5, changeType: 'Increase' }
      ],
      alerts: []
    };

    const userSatisfactionKPI: KPIMetric = {
      id: 'user-satisfaction',
      name: 'User Satisfaction Score',
      category: 'Quality',
      description: 'Average satisfaction score from user surveys',
      formula: 'SUM(satisfaction_ratings) / COUNT(total_responses)',
      target: 8.5,
      unit: 'score',
      frequency: 'Daily',
      dataSource: 'user_feedback',
      currentValue: 8.6,
      validation: {
        required: true,
        range: { min: 1, max: 10 },
        businessRules: ['Score must be between 1 and 10'],
        dataQuality: []
      },
      benchmarks: [
        { name: 'Industry Average', value: 7.2, source: 'Healthcare UX Study 2024', year: 2024, type: 'Industry' }
      ],
      trends: [
        { date: new Date('2024-01-01'), value: 8.1, change: 3.2, changeType: 'Increase' }
      ],
      alerts: []
    };

    this.kpis.set(systemHealthKPI.id, systemHealthKPI);
    this.kpis.set(userSatisfactionKPI.id, userSatisfactionKPI);
  }

  async getDashboard(dashboardId: string): Promise<ExecutiveDashboard | null> {
    return this.dashboards.get(dashboardId) || null;
  }

  async getAllDashboards(): Promise<ExecutiveDashboard[]> {
    return Array.from(this.dashboards.values());
  }

  async getKPIMetrics(): Promise<KPIMetric[]> {
    return Array.from(this.kpis.values());
  }

  async generateExecutiveReport(): Promise<string> {
    const dashboards = await this.getAllDashboards();
    const kpis = await this.getKPIMetrics();
    
    const systemHealth = kpis.find(kpi => kpi.id === 'system-health');
    const userSatisfaction = kpis.find(kpi => kpi.id === 'user-satisfaction');
    
    return `
# RELATÓRIO EXECUTIVO - DARWIN-MFC UI/UX SOTA
## Dashboard de Métricas e KPIs

### Resumo do Sistema
- **Dashboards Ativos:** ${dashboards.length}
- **Métricas Monitoradas:** ${kpis.length}
- **Última Atualização:** ${new Date().toLocaleString()}

### Métricas Críticas

#### Saúde do Sistema
- **Pontuação Atual:** ${systemHealth?.currentValue || 95}/100
- **Meta:** ${systemHealth?.target}/100
- **Tendência:** ${systemHealth?.trends[systemHealth.trends.length - 1]?.changeType || 'Estável'}
- **Benchmark da Indústria:** ${systemHealth?.benchmarks.find(b => b.type === 'Industry')?.value || 87}/100

#### Satisfação do Usuário
- **Pontuação Atual:** ${userSatisfaction?.currentValue || 8.6}/10
- **Meta:** ${userSatisfaction?.target}/10
- **Tendência:** ${userSatisfaction?.trends[userSatisfaction.trends.length - 1]?.changeType || 'Aumentando'}
- **Benchmark da Indústria:** ${userSatisfaction?.benchmarks.find(b => b.type === 'Industry')?.value || 7.2}/10

### Próximas Ações Recomendadas
1. Continuar monitoramento em tempo real das métricas críticas
2. Revisar benchmarks trimestralmente
3. Otimizar dashboards baseados no feedback executivo

Gerado em: ${new Date().toISOString()}
    `.trim();
  }
}