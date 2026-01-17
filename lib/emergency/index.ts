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

// Respiratory emergencies
export * from './respiratory-emergencies';

// Toxicology and overdose
export * from './toxicology-overdose';

// Pediatric emergencies (expanded)
export * from './pediatric-emergencies';

// Airway management
export * from './airway-management';

// Mass casualty incident management
export * from './mass-casualty';

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

export type {
  RespiratoryProtocol,
  DiagnosticCriteria,
  VitalCriteria,
  TreatmentStep,
  MedicationDose,
  RespiratoryMonitoringParameter
} from './respiratory-emergencies';

export type {
  ToxicologyProtocol,
  Toxidrome,
  DecontaminationStrategy,
  Antidote
} from './toxicology-overdose';

export type {
  PediatricProtocol,
  AgeGroup,
  VitalRanges,
  TreatmentByAge,
  PediatricMedication,
  PediatricMonitoringParameter
} from './pediatric-emergencies';

export type {
  AirwayProtocol,
  EquipmentItem,
  ProcedureStep,
  TroubleshootingItem,
  AirwayAssessment,
  DifficultyFactor
} from './airway-management';

export type {
  MCIProtocol,
  PersonnelRole,
  MCIProcedure,
  ResourcePlan,
  CommunicationPlan,
  MCIScenario
} from './mass-casualty';

/**
 * Quick access to all emergency protocols by category
 */
export const EMERGENCY_PROTOCOL_CATEGORIES = {
  resuscitation: ['cardiac-arrest', 'neonatal-resuscitation'],
  airway: ['head-tilt-chin-lift', 'jaw-thrust', 'opa', 'npa', 'bvm', 'lma', 'ett-intubation', 'cricothyrotomy'],
  trauma: ['trauma-primary', 'ballistic-trauma', 'blast-lung'],
  shock: ['anaphylactic-shock', 'cardiogenic-shock', 'hypovolemic-shock', 'septic-shock'],
  neurological: ['stroke-acute', 'status-epilepticus'],
  respiratory: ['asthma-severe', 'copd-exacerbation', 'ards', 'pulmonary-embolism', 'tension-pneumothorax', 'airway-obstruction'],
  obstetric: ['pph', 'eclampsia', 'shoulder-dystocia', 'cord-prolapse'],
  pediatric: ['pediatric-shock', 'pediatric-sepsis', 'pediatric-seizure', 'pediatric-respiratory', 'pediatric-dehydration'],
  toxicology: ['opioid-overdose', 'benzodiazepine-overdose', 'acetaminophen-overdose', 'tca-overdose', 'beta-blocker-overdose', 'ccb-overdose', 'organophosphate-poisoning'],
  triage: ['start-triage', 'salt-triage', 'jumpstart-triage'],
  massCasualty: ['mci-management', 'hospital-surge', 'incident-command']
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
    'blast-lung',
    'ards',
    'pulmonary-embolism',
    'airway-obstruction',
    'pediatric-shock',
    'organophosphate-poisoning',
    'tca-overdose'
  ],
  emergent: [
    'stroke-acute',
    'septic-shock',
    'pph',
    'status-epilepticus',
    'asthma-severe',
    'copd-exacerbation',
    'pediatric-sepsis',
    'pediatric-seizure',
    'opioid-overdose',
    'beta-blocker-overdose',
    'ccb-overdose',
    'acetaminophen-overdose'
  ],
  urgent: [
    'pneumonia',
    'dehydration-moderate',
    'febrile-seizure',
    'pediatric-respiratory',
    'pediatric-dehydration',
    'benzodiazepine-overdose'
  ]
} as const;
