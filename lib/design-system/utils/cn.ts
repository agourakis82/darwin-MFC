/**
 * CLASS NAME UTILITY (cn)
 * =======================
 *
 * Merges Tailwind CSS classes intelligently
 * Handles conflicts and ensures proper precedence
 *
 * Uses:
 * - clsx: For conditional class names
 * - tailwind-merge: For Tailwind-specific conflict resolution
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with Tailwind CSS conflict resolution
 *
 * @example
 * ```tsx
 * cn('px-2 py-1', 'px-4') // => 'py-1 px-4' (px-4 wins)
 * cn('text-red-500', condition && 'text-blue-500') // Conditional classes
 * cn('bg-white', dark && 'dark:bg-black') // Dark mode support
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
