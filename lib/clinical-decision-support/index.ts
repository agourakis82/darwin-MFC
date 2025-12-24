/**
 * CLINICAL DECISION SUPPORT MODULE - EXPORTS
 * ===========================================
 *
 * Complete clinical decision support system for Darwin-MFC
 * Calculators, drug interactions, protocols, evidence, and decision trees
 *
 * @example
 * ```tsx
 * import {
 *   // Calculators
 *   Calculator,
 *   BMICalculator,
 *   CrClCalculator,
 *   CHADS2VAScCalculator,
 *
 *   // Drug Interactions
 *   DrugInteractionChecker,
 *
 *   // Protocols
 *   ProtocolRecommendationEngine,
 *
 *   // Evidence
 *   EvidenceBadge,
 *   GRADEIndicator,
 *   USPSTFBadge,
 *   EvidencePyramid,
 *
 *   // Decision Trees
 *   DecisionTree,
 *   chestPainTree,
 *
 *   // Alerts
 *   AlertBanner,
 *   AlertsContainer,
 *
 *   // Store
 *   useCDSStore,
 * } from '@/lib/clinical-decision-support';
 * ```
 */

// ============================================================================
// CALCULATORS
// ============================================================================

export * from './calculators/framework';
export * from './calculators/common-calculators';

// ============================================================================
// DRUG INTERACTIONS
// ============================================================================

export * from './drug-interactions/advanced-checker';

// ============================================================================
// PROTOCOLS
// ============================================================================

export * from './protocols/recommendation-engine';

// ============================================================================
// EVIDENCE
// ============================================================================

export * from './evidence/strength-indicators';

// ============================================================================
// DECISION TREES
// ============================================================================

export * from './decision-trees/interactive-tree';

// ============================================================================
// ALERTS
// ============================================================================

export * from './alerts/clinical-alerts';

// ============================================================================
// STORE
// ============================================================================

export * from './store/cds-store';
