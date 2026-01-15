/**
 * PROTOCOLS INDEX - DARWIN-MFC
 * ============================
 *
 * Central export for all protocol-related modules:
 * - USPSTF recommendations
 * - NHS/NICE recommendations
 * - Comparison engine
 */

// Protocol data
export * from '@/lib/data/protocols/uspstf';
export * from '@/lib/data/protocols/nhs';

// Comparison engine
export * from './comparison-engine';
