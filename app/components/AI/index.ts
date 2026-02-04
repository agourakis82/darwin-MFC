/**
 * AI Components for Darwin-MFC
 * Clinical AI assistants for diagnosis and SOAP note analysis
 */

// Existing components
export { DiagnosisAssistant } from './DiagnosisAssistant';
export { SOAPAnalyzer } from './SOAPAnalyzer';
export { AIChatButton } from './AIChatButton';
export { AIChatInterface } from './AIChatInterface';

// Entity Highlighting
export {
  EntityHighlighter,
  EntityLegend,
  ENTITY_TYPE_CONFIG,
  type EntityHighlighterProps,
  type EntityLegendProps,
  type HighlightedSegment,
} from './EntityHighlighter';

// NER Confidence Indicators
export {
  NERConfidenceIndicator,
  SourceBadge,
  getConfidenceLevel,
  CONFIDENCE_LEVELS,
  SOURCE_CONFIG,
  type NERConfidenceIndicatorProps,
  type SourceBadgeProps,
  type ConfidenceSource,
  type ConfidenceLevel,
} from './NERConfidenceIndicator';

// SOAP Section Parsing
export {
  SOAPSectionParser,
  SOAPEditor,
  SOAPPreview,
  parseSOAPText,
  formatSOAPText,
  SECTION_CONFIG,
  type SOAPSectionParserProps,
  type SOAPEditorProps,
  type SOAPPreviewProps,
  type SOAPSection,
  type SOAPSectionType,
  type ParsedSOAP,
} from './SOAPSectionParser';

// Entity Correction
export {
  EntityCorrectionModal,
  QuickFeedbackButtons,
  CorrectionSummary,
  type EntityCorrectionModalProps,
  type QuickFeedbackButtonsProps,
  type CorrectionSummaryProps,
  type EntityCorrection,
  type CorrectionEntity,
  type FeedbackType,
} from './EntityCorrectionModal';

// Clinical Alert Display
export {
  ClinicalAlertDisplay,
  generateAlertsFromEntities,
  type ClinicalAlertDisplayProps,
  type ClinicalAlert,
  type AlertSeverity,
  type AlertCategory,
} from './ClinicalAlertDisplay';
