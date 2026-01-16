/**
 * SISTEMA DE TESTES E VALIDAÇÃO DARWIN-MFC UI/UX SOTA
 * ====================================================
 *
 * Sistema completo de testes e validação científica para comprovar
 * a superiority mundial das inovações UI/UX médicas implementadas.
 *
 * FUNCIONALIDADES:
 * - Testes de usabilidade médica com cenários reais
 * - Validação com médicos especialistas
 * - Métricas de performance em tempo real
 * - Sistema de A/B testing vs concorrentes
 * - Dashboard de métricas e KPIs
 * - Testes de acessibilidade médica completa
 * - Validação de redução de burnout
 * - Testes de eficácia das micro-interações
 *
 * BENCHMARKS ALVO:
 * - 70% redução tempo diagnóstico vs concorrência
 * - 90% redução erros medicação
 * - 95% satisfação médica
 * - 80% redução burnout
 *
 * NOTA: Para evitar conflitos de nomes duplicados entre módulos,
 * exportamos apenas as classes principais. Para tipos específicos
 * de cada módulo, importe diretamente do arquivo correspondente.
 */

// Classes principais de cada módulo
export { MedicalUsabilityTester } from './medical-usability-testing';
export { CompetitiveBenchmarkingSystem } from './competitive-benchmarking';
export { ABTestingSystem } from './ab-testing-system';
export { BurnoutValidationSystem } from './burnout-validation';
export { MicroInteractionsTestingSystem } from './micro-interactions-testing';
export { RealTimeMetricsCollector } from './real-time-metrics';
export { ScientificValidationSystem } from './scientific-validation';
export { ExecutiveDashboardSystem } from './dashboard-kpis';
export { RegulatoryComplianceSystem } from './regulatory-compliance';
export { TestingProtocolSystem } from './testing-protocols';

// Re-export tipos únicos e importantes de cada módulo
// Para outros tipos, importe diretamente do módulo específico

// medical-usability-testing
export type {
  MedicalUsabilityTest,
  TestResult
} from './medical-usability-testing';

// competitive-benchmarking
export type {
  CompetitorSystem,
  CompetitorFeature
} from './competitive-benchmarking';

// ab-testing-system
export type {
  ABTestConfiguration,
  ABTestVariant
} from './ab-testing-system';

// burnout-validation
export type {
  BurnoutValidationStudy,
  BurnoutAssessment
} from './burnout-validation';

// micro-interactions-testing
export type {
  MicroInteractionTest,
  InteractionTestResults
} from './micro-interactions-testing';

// real-time-metrics
export type {
  RealTimeMetricsSystem,
  MetricDefinition
} from './real-time-metrics';

// scientific-validation
export type {
  ScientificValidationStudy,
  ScientificMethodology
} from './scientific-validation';

// dashboard-kpis
export type {
  ExecutiveDashboard,
  KPIMetric
} from './dashboard-kpis';

// regulatory-compliance
export type {
  RegulatoryComplianceFramework,
  RegulatoryRequirement
} from './regulatory-compliance';

// testing-protocols
export type {
  TestProtocol,
  TestMethodology
} from './testing-protocols';
