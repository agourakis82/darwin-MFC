/**
 * Content Components - Nature/Elsevier Scientific Journal Style
 *
 * These components provide a clean, academic presentation layer
 * for medical content. Design inspired by Nature Medicine, NEJM,
 * and Elsevier journal articles.
 *
 * Design principles:
 * - Generous white space
 * - Serif body text (Source Serif 4)
 * - Minimal color palette (accent colors for meaning only)
 * - Hairline dividers and borders
 * - Small caps section headers
 * - High information density
 */

// Alert boxes
export { DrugAlert, Box } from './DrugAlert';
export type { DrugAlertProps, AlertType, AlertSeverity, BoxProps } from './DrugAlert';

// Key points and abstracts
export { KeyPoints, Abstract, TakeHome } from './KeyPoints';
export type { KeyPointsProps, AbstractProps, TakeHomeProps } from './KeyPoints';

// Drug interactions
export { InteractionWarning, InteractionTable } from './InteractionWarning';
export type {
  InteractionWarningProps,
  InteractionSeverity,
  DrugInteraction,
  InteractionTableProps,
} from './InteractionWarning';
