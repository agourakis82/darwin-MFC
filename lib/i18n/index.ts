/**
 * MEDICAL DOMAIN LOCALIZATION - DARWIN MFC
 * =========================================
 *
 * This module handles MEDICAL KNOWLEDGE localization (codes, protocols, practices).
 * It is SEPARATE from next-intl which handles UI STRING translations.
 *
 * Architecture:
 * ┌─────────────────────────────────────────────────────────────┐
 * │  next-intl (messages/{locale}/*.json)                      │
 * │  └─ UI strings: buttons, labels, titles, messages          │
 * │  └─ Usage: useTranslations('namespace')                    │
 * ├─────────────────────────────────────────────────────────────┤
 * │  lib/i18n/ (this module)                                   │
 * │  └─ Medical ontology mappings (CID-10 ↔ ICD-10-CM)        │
 * │  └─ Disease code mappings per locale                       │
 * │  └─ Country-specific clinical practices                    │
 * │  └─ Medication name localizations                          │
 * │  └─ Healthcare system configurations (SUS, NHS, etc.)      │
 * └─────────────────────────────────────────────────────────────┘
 *
 * These systems are COMPLEMENTARY, not duplicative.
 */

// Medical localization system (country-specific health systems)
export * from './medical-localization';

// Medication name mappings across countries
export * from './medication-mappings';

// Disease code mappings (CID-10, ICD-10-CM, SNOMED, etc.)
export * from './disease-code-mappings';

// Country-specific clinical practices and guidelines
export * from './clinical-practices';
