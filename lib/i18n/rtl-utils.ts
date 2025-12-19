/**
 * RTL Utilities
 * Helper functions for RTL (Right-to-Left) layout support
 */

import { useLocale } from 'next-intl';
import { isRTL } from '@/i18n/config';
import type { Locale } from '@/i18n/config';

/**
 * Hook to get RTL class name conditionally
 * @returns CSS class name for RTL adjustments if needed
 */
export function useRTLClassName(): string {
  const locale = useLocale() as Locale;
  return isRTL(locale) ? 'rtl' : '';
}

/**
 * Get flex direction class based on locale
 * @param locale - Current locale
 * @returns Tailwind class for flex direction
 */
export function getFlexDirectionClass(locale: Locale): string {
  return isRTL(locale) ? 'flex-row-reverse' : 'flex-row';
}

/**
 * Get margin/padding class based on locale (left vs right)
 * @param locale - Current locale
 * @param side - 'left' or 'right'
 * @param size - Tailwind size (e.g., '4', '2', 'auto')
 * @returns Tailwind class for margin/padding
 */
export function getSpacingClass(
  locale: Locale,
  type: 'margin' | 'padding',
  side: 'left' | 'right',
  size: string
): string {
  if (!isRTL(locale)) {
    return type === 'margin' ? `m${side[0]}-${size}` : `p${side[0]}-${size}`;
  }
  // Flip left/right for RTL
  const flippedSide = side === 'left' ? 'right' : 'left';
  return type === 'margin' ? `m${flippedSide[0]}-${size}` : `p${flippedSide[0]}-${size}`;
}

/**
 * Get text alignment class based on locale
 * @param locale - Current locale
 * @returns Tailwind class for text alignment
 */
export function getTextAlignClass(locale: Locale): string {
  return isRTL(locale) ? 'text-right' : 'text-left';
}

