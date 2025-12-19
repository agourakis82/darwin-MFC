/**
 * Utility functions for translating disease content
 */

import type { Locale } from '@/i18n/config';

/**
 * Get translated disease title with fallback to Portuguese
 */
export function getDiseaseTitle(diseaseId: string, locale: Locale, fallbackTitle: string): string {
  // In a real implementation, this would load from messages
  // For now, return fallback (Portuguese) title
  // This will be used by components that integrate with next-intl
  return fallbackTitle;
}

/**
 * Get translated disease definition with fallback to Portuguese
 */
export function getDiseaseDefinition(diseaseId: string, locale: Locale, fallbackDefinition: string): string {
  // In a real implementation, this would load from messages
  // For now, return fallback (Portuguese) definition
  return fallbackDefinition;
}

/**
 * Check if disease has translation for a given locale
 */
export function hasDiseaseTranslation(diseaseId: string, locale: Locale): boolean {
  // Check if translation exists in messages
  // For now, return false (all use Portuguese)
  // This can be expanded to check actual message files
  return locale === 'pt';
}

