/**
 * Training Modules Index
 * Consolidated exports for all training and education content
 *
 * Darwin-MFC Training System
 * For healthcare workers in resource-limited, dangerous, or catastrophic settings
 */

// Quick reference cards
export * from './quick-reference-cards';

// Clinical simulations
export * from './clinical-simulations';

// Procedural tutorials
export * from './procedural-tutorials';

// Clinical pearls, mnemonics, and SBAR
export * from './clinical-pearls';

// Team communication protocols (SBAR, I-PASS, CRM)
export * from './team-communication';

// Re-export commonly used types
export type {
  QuickReferenceCard,
  CardCategory
} from './quick-reference-cards';

export type {
  ClinicalSimulation,
  SimulationStep,
  SimulationOption,
  SimulationCategory
} from './clinical-simulations';

export type {
  ProceduralTutorial,
  ProcedureStep,
  ProcedureCategory
} from './procedural-tutorials';

export type {
  ClinicalPearl,
  Mnemonic,
  SBARTemplate,
  PearlCategory,
  MnemonicCategory
} from './clinical-pearls';

export type {
  CommunicationTemplate,
  HandoffChecklist,
  CRMPrinciple,
  DebriefTemplate
} from './team-communication';

/**
 * Training content categories
 */
export const TRAINING_CATEGORIES = {
  quickReference: [
    'cpr-adult',
    'cpr-pediatric',
    'nrp-newborn',
    'trauma-primary',
    'hemorrhage-control',
    'pph-emergency',
    'eclampsia-emergency',
    'anaphylaxis',
    'start-triage',
    'emergency-drugs'
  ],
  simulations: [
    'mci-bus-accident',
    'pph-rural-clinic',
    'pediatric-seizure-febrile'
  ],
  procedures: [
    'iv-access-peripheral',
    'needle-decompression',
    'wound-suturing-basic'
  ]
} as const;

/**
 * Training content by difficulty level
 */
export const TRAINING_BY_DIFFICULTY = {
  beginner: [
    'cpr-adult',
    'pediatric-seizure-febrile',
    'iv-access-peripheral'
  ],
  intermediate: [
    'trauma-primary',
    'pph-rural-clinic',
    'needle-decompression',
    'wound-suturing-basic'
  ],
  advanced: [
    'mci-bus-accident',
    'nrp-newborn',
    'eclampsia-emergency'
  ]
} as const;

/**
 * Essential mnemonics for crisis care
 */
export const ESSENTIAL_MNEMONICS = [
  'MARCH',      // Tactical trauma
  'SAMPLE',     // Patient history
  'OPQRST',     // Pain assessment
  'FAST',       // Stroke recognition
  'H\'s and T\'s', // Reversible causes of arrest
  'MR SOPA',    // NRP corrective steps
  'HELPERR'     // Shoulder dystocia
] as const;
