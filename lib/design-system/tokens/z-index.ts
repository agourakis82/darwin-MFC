/**
 * DESIGN SYSTEM - Z-INDEX TOKENS
 * ==============================
 *
 * Unified z-index scale for consistent layering across components.
 * Use these values instead of hardcoded z-index numbers.
 *
 * Usage:
 *   import { zIndex } from '@/lib/design-system/tokens';
 *   className={`z-[${zIndex.modal}]`}
 *   // Or with Tailwind classes: z-40 for modal, z-50 for popover, etc.
 */

export const zIndex = {
  /** Base layer - default content */
  base: 0,

  /** Dropdowns and select menus */
  dropdown: 10,

  /** Sticky elements like headers */
  sticky: 20,

  /** Page overlays and backdrops */
  overlay: 30,

  /** Modal dialogs */
  modal: 40,

  /** Side drawers (slightly above modals for nested cases) */
  drawer: 45,

  /** Popovers and tooltips */
  popover: 50,

  /** Toast notifications (above everything except emergency) */
  toast: 60,

  /** Command palette (highest interactive element) */
  commandPalette: 70,

  /** Skip link (accessibility - must be above everything) */
  skipLink: 80,

  /** Emergency override - use sparingly */
  max: 100,
} as const;

export type ZIndexLevel = keyof typeof zIndex;
export type ZIndexValue = (typeof zIndex)[ZIndexLevel];

/**
 * Helper to get Tailwind z-index class
 */
export function getZIndexClass(level: ZIndexLevel): string {
  const value = zIndex[level];
  if (value === 0) return 'z-0';
  if (value === 10) return 'z-10';
  if (value === 20) return 'z-20';
  if (value === 30) return 'z-30';
  if (value === 40) return 'z-40';
  if (value === 50) return 'z-50';
  // For non-standard values, use arbitrary value
  return `z-[${value}]`;
}

/**
 * Z-Index scale reference:
 *
 * z-0   (0)   - Base content
 * z-10  (10)  - Dropdowns
 * z-20  (20)  - Sticky headers
 * z-30  (30)  - Overlays/backdrops
 * z-40  (40)  - Modals
 * z-[45]      - Drawers
 * z-50  (50)  - Popovers/tooltips
 * z-[60]      - Toasts
 * z-[70]      - Command palette
 * z-[80]      - Skip link
 * z-[100]     - Emergency max
 */
