/**
 * Emergency Protocols Index
 * Consolidated exports for all emergency medicine modules
 *
 * Darwin-MFC Crisis Medicine System
 * For healthcare workers in resource-limited, dangerous, or catastrophic settings
 */

// Core emergency protocols
export * from './emergency-protocols';

// Triage and mass casualty
export * from './triage-start';

// Shock protocols
export * from './shock-protocols';

// Neurological emergencies
export * from './neuro-stroke';

// Neonatal resuscitation
export * from './neonatal-resuscitation';

// Obstetric emergencies
export * from './obstetric-emergencies';

// Conflict zone protocols - types
export type {
  ConflictZoneProtocol,
  ConflictZoneStep,
  ConflictZoneMedication,
  BlastInjuryAssessment,
  BlastMechanism,
  PrimaryBlastInjury,
  SecondaryBlastInjury,
  TertiaryBlastInjury,
  QuaternaryBlastInjury,
  PFAAssessment,
  BasicNeeds,
  DistressLevel
} from './conflict-zone-protocols';

// Conflict zone protocols - values
export {
  BLAST_LUNG_PROTOCOL,
  BALLISTIC_TRAUMA_PROTOCOL,
  TOURNIQUET_PROTOCOL,
  WOUND_PACKING_PROTOCOL,
  PSYCHOLOGICAL_FIRST_AID_PROTOCOL,
  SALT_TRIAGE_CONFLICT,
  FIELD_AMPUTATION_PROTOCOL,
  CONFLICT_ZONE_QUICK_REFERENCE,
  BLAST_INJURY_QUICK_REFERENCE,
  CONFLICT_ZONE_ADAPTATIONS
} from './conflict-zone-protocols';

// Critical emergency drugs
export * from './drugs/critical-drugs';

// Re-export commonly used types
export type {
  EmergencyProtocol,
  EmergencyStep,
  EmergencyMedication
} from './emergency-protocols';

export type {
  TriageCategory,
  TriageAssessment,
  MassCasualtyIncident
} from './triage-start';

export type {
  ShockAssessment,
  ShockClinicalSigns
} from './shock-protocols';

export type {
  StrokeAssessment,
  StrokeSymptoms,
  FASTScore
} from './neuro-stroke';

export type {
  ApgarScore,
  NeonatalAssessment
} from './neonatal-resuscitation';

export type {
  PPHCause,
  PPHAssessment
} from './obstetric-emergencies';

// Note: BlastMechanism, ConflictZoneProtocol, PFAAssessment already exported above

export type {
  CriticalDrug,
  DoseRegimen
} from './drugs/critical-drugs';

/**
 * Quick access to all emergency protocols by category
 */
export const EMERGENCY_PROTOCOL_CATEGORIES = {
  resuscitation: ['cardiac-arrest', 'neonatal-resuscitation'],
  trauma: ['trauma-primary', 'ballistic-trauma', 'blast-lung'],
  shock: ['anaphylactic-shock', 'cardiogenic-shock', 'hypovolemic-shock', 'septic-shock'],
  neurological: ['stroke-acute'],
  obstetric: ['pph', 'eclampsia', 'shoulder-dystocia', 'cord-prolapse'],
  pediatric: ['pediatric-emergency', 'pediatric-dehydration'],
  triage: ['start-triage', 'salt-triage', 'jumpstart-triage']
} as const;

/**
 * Quick access to protocols by severity
 */
export const PROTOCOLS_BY_SEVERITY = {
  critical: [
    'cardiac-arrest',
    'tension-pneumothorax',
    'anaphylactic-shock',
    'massive-hemorrhage',
    'eclampsia',
    'blast-lung'
  ],
  emergent: [
    'stroke-acute',
    'septic-shock',
    'pph',
    'status-epilepticus'
  ],
  urgent: [
    'pneumonia',
    'dehydration-moderate',
    'febrile-seizure'
  ]
} as const;
