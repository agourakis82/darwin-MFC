/**
 * Darwin-MFC clinical intelligence integration.
 *
 * The main app is statically exported, so authenticated AI/proxy calls must point
 * to an external backend origin rather than a Next.js API route.
 */

export const CLINICAL_INTELLIGENCE_URL =
  process.env.NEXT_PUBLIC_CLINICAL_INTELLIGENCE_URL || '';

export const CLINICAL_INTELLIGENCE_ENABLED =
  process.env.NEXT_PUBLIC_CLINICAL_INTELLIGENCE_ENABLED === 'true' &&
  CLINICAL_INTELLIGENCE_URL.length > 0;

export function isClinicalIntelligenceAvailable(): boolean {
  return CLINICAL_INTELLIGENCE_ENABLED;
}
