/**
 * Symptom-to-Urgency Triage System
 * Rapid triage classification based on presenting symptoms
 *
 * References:
 * - WHO ETAT (Emergency Triage Assessment and Treatment)
 * - Manchester Triage System
 * - ESI (Emergency Severity Index)
 * - Canadian Triage and Acuity Scale (CTAS)
 *
 * For healthcare workers in resource-limited settings
 */

// ============================================================================
// CORE TYPES
// ============================================================================

export type UrgencyLevel = 'immediate' | 'emergent' | 'urgent' | 'less_urgent' | 'non_urgent';

export interface SymptomTriageEntry {
  symptom: string;
  modifiers: SymptomModifier[];
  defaultUrgency: UrgencyLevel;
  ageConsiderations?: AgeConsideration[];
}

export interface SymptomModifier {
  finding: string;
  upgradeTo: UrgencyLevel;
  rationale: string;
}

export interface AgeConsideration {
  ageGroup: 'neonate' | 'infant' | 'child' | 'adult' | 'elderly';
  urgencyAdjustment: 'upgrade' | 'same';
  notes: string;
}

export interface TriageAssessmentResult {
  urgencyLevel: UrgencyLevel;
  urgencyColor: string;
  maxWaitTime: string;
  disposition: string;
  redFlags: string[];
  immediateActions: string[];
}

export interface UrgencyCategory {
  level: UrgencyLevel;
  color: string;
  description: string;
  maxWaitTime: string;
  examples: string[];
}

// ============================================================================
// URGENCY LEVEL DEFINITIONS
// ============================================================================

export const URGENCY_CATEGORIES: UrgencyCategory[] = [
  {
    level: 'immediate',
    color: 'RED',
    description: 'Life-threatening - requires immediate intervention',
    maxWaitTime: '0 minutes (seen immediately)',
    examples: [
      'Cardiac arrest',
      'Respiratory arrest',
      'Severe respiratory distress',
      'Shock',
      'Active major hemorrhage',
      'Unresponsive/unconscious'
    ]
  },
  {
    level: 'emergent',
    color: 'ORANGE',
    description: 'Potentially life-threatening - needs rapid assessment',
    maxWaitTime: '10-15 minutes',
    examples: [
      'Chest pain with cardiac features',
      'Stroke symptoms',
      'Severe pain (9-10/10)',
      'High fever with toxic appearance',
      'Significant trauma',
      'Acute abdomen with peritoneal signs'
    ]
  },
  {
    level: 'urgent',
    color: 'YELLOW',
    description: 'Serious but stable - needs timely care',
    maxWaitTime: '30-60 minutes',
    examples: [
      'Moderate pain (7-8/10)',
      'Fever without danger signs',
      'Vomiting with mild dehydration',
      'Lacerations requiring sutures',
      'Asthma not in severe distress'
    ]
  },
  {
    level: 'less_urgent',
    color: 'GREEN',
    description: 'Minor illness/injury - can wait safely',
    maxWaitTime: '1-2 hours',
    examples: [
      'Minor pain (4-6/10)',
      'Cold/flu symptoms',
      'Minor injuries',
      'Chronic complaints, stable',
      'Prescription refills'
    ]
  },
  {
    level: 'non_urgent',
    color: 'BLUE',
    description: 'Non-acute - could be seen in outpatient clinic',
    maxWaitTime: '2-4 hours (or redirect to clinic)',
    examples: [
      'Minor complaints >1 week',
      'Follow-up visits',
      'Administrative requests',
      'Chronic stable conditions'
    ]
  }
];

// ============================================================================
// SYMPTOM TRIAGE DATABASE
// ============================================================================

export const SYMPTOM_TRIAGE_DATABASE: SymptomTriageEntry[] = [
  // RESPIRATORY SYMPTOMS
  {
    symptom: 'Difficulty breathing / Shortness of breath',
    defaultUrgency: 'urgent',
    modifiers: [
      { finding: 'Cannot speak/cyanosis/altered consciousness', upgradeTo: 'immediate', rationale: 'Respiratory failure' },
      { finding: 'Stridor', upgradeTo: 'immediate', rationale: 'Upper airway obstruction' },
      { finding: 'Severe respiratory distress (accessory muscles, tripoding)', upgradeTo: 'emergent', rationale: 'Impending respiratory failure' },
      { finding: 'New onset with chest pain', upgradeTo: 'emergent', rationale: 'PE, MI, pneumothorax' },
      { finding: 'SpO2 <90% (if available)', upgradeTo: 'emergent', rationale: 'Significant hypoxia' },
      { finding: 'Wheezing responding to bronchodilator', upgradeTo: 'urgent', rationale: 'Treatable bronchospasm' },
      { finding: 'Gradual onset, mild, no distress', upgradeTo: 'less_urgent', rationale: 'Likely non-emergent cause' }
    ],
    ageConsiderations: [
      { ageGroup: 'infant', urgencyAdjustment: 'upgrade', notes: 'Infants decompensate rapidly' },
      { ageGroup: 'elderly', urgencyAdjustment: 'upgrade', notes: 'May have minimal symptoms despite serious illness' }
    ]
  },
  {
    symptom: 'Cough',
    defaultUrgency: 'less_urgent',
    modifiers: [
      { finding: 'With respiratory distress', upgradeTo: 'emergent', rationale: 'Significant respiratory compromise' },
      { finding: 'Coughing blood (hemoptysis)', upgradeTo: 'emergent', rationale: 'Pulmonary hemorrhage' },
      { finding: 'With high fever and toxic appearance', upgradeTo: 'emergent', rationale: 'Severe pneumonia/sepsis' },
      { finding: 'Barking cough in child (stridor)', upgradeTo: 'urgent', rationale: 'Croup with airway concern' },
      { finding: 'With fever and productive sputum', upgradeTo: 'urgent', rationale: 'Pneumonia' },
      { finding: '>3 weeks duration', upgradeTo: 'urgent', rationale: 'TB workup needed' },
      { finding: 'Dry cough, no fever, no distress', upgradeTo: 'non_urgent', rationale: 'Likely viral URI' }
    ]
  },

  // CHEST PAIN
  {
    symptom: 'Chest pain',
    defaultUrgency: 'emergent',
    modifiers: [
      { finding: 'With shock (hypotension, altered consciousness)', upgradeTo: 'immediate', rationale: 'Cardiogenic shock, massive PE' },
      { finding: 'Tearing pain to back', upgradeTo: 'immediate', rationale: 'Aortic dissection' },
      { finding: 'Absent breath sounds unilaterally', upgradeTo: 'immediate', rationale: 'Tension pneumothorax' },
      { finding: 'Cardiac features (diaphoresis, radiation to arm/jaw)', upgradeTo: 'emergent', rationale: 'Acute MI' },
      { finding: 'Pleuritic with fever', upgradeTo: 'urgent', rationale: 'Pneumonia, pleuritis' },
      { finding: 'Reproducible with palpation, no risk factors', upgradeTo: 'less_urgent', rationale: 'Musculoskeletal' },
      { finding: 'Heartburn pattern, food-related', upgradeTo: 'less_urgent', rationale: 'GERD' }
    ],
    ageConsiderations: [
      { ageGroup: 'elderly', urgencyAdjustment: 'upgrade', notes: 'Higher risk of cardiac cause' }
    ]
  },

  // ABDOMINAL PAIN
  {
    symptom: 'Abdominal pain',
    defaultUrgency: 'urgent',
    modifiers: [
      { finding: 'Rigid abdomen / peritoneal signs', upgradeTo: 'immediate', rationale: 'Peritonitis, surgical emergency' },
      { finding: 'With shock signs', upgradeTo: 'immediate', rationale: 'Ruptured AAA, ectopic, GI bleed' },
      { finding: 'Positive pregnancy test', upgradeTo: 'emergent', rationale: 'Ectopic pregnancy concern' },
      { finding: 'GI bleeding (hematemesis, melena)', upgradeTo: 'emergent', rationale: 'Upper GI hemorrhage' },
      { finding: 'Severe pain (9-10/10)', upgradeTo: 'emergent', rationale: 'May indicate serious pathology' },
      { finding: 'With high fever', upgradeTo: 'emergent', rationale: 'Intra-abdominal infection' },
      { finding: 'Mild cramping with diarrhea', upgradeTo: 'less_urgent', rationale: 'Gastroenteritis' },
      { finding: 'Chronic, unchanged from baseline', upgradeTo: 'less_urgent', rationale: 'Non-acute condition' }
    ],
    ageConsiderations: [
      { ageGroup: 'infant', urgencyAdjustment: 'upgrade', notes: 'Limited ability to localize, consider intussusception' },
      { ageGroup: 'elderly', urgencyAdjustment: 'upgrade', notes: 'Blunted symptoms, higher mortality' }
    ]
  },

  // HEADACHE
  {
    symptom: 'Headache',
    defaultUrgency: 'less_urgent',
    modifiers: [
      { finding: 'Sudden severe onset (thunderclap)', upgradeTo: 'immediate', rationale: 'Subarachnoid hemorrhage' },
      { finding: 'With altered consciousness', upgradeTo: 'immediate', rationale: 'Intracranial emergency' },
      { finding: 'With fever and neck stiffness', upgradeTo: 'immediate', rationale: 'Meningitis' },
      { finding: 'With new neurological deficits', upgradeTo: 'emergent', rationale: 'Stroke, mass lesion' },
      { finding: 'Worst headache of life', upgradeTo: 'emergent', rationale: 'SAH until proven otherwise' },
      { finding: 'With papilledema', upgradeTo: 'emergent', rationale: 'Raised ICP' },
      { finding: 'Post-trauma', upgradeTo: 'urgent', rationale: 'Intracranial hemorrhage concern' },
      { finding: 'Typical migraine pattern', upgradeTo: 'less_urgent', rationale: 'Primary headache disorder' },
      { finding: 'Tension-type, chronic stable', upgradeTo: 'non_urgent', rationale: 'Non-emergent headache' }
    ],
    ageConsiderations: [
      { ageGroup: 'elderly', urgencyAdjustment: 'upgrade', notes: 'Consider GCA, subdural, tumor' }
    ]
  },

  // FEVER
  {
    symptom: 'Fever',
    defaultUrgency: 'urgent',
    modifiers: [
      { finding: 'With shock/toxic appearance', upgradeTo: 'immediate', rationale: 'Sepsis' },
      { finding: 'With non-blanching rash', upgradeTo: 'immediate', rationale: 'Meningococcemia' },
      { finding: 'With meningeal signs', upgradeTo: 'immediate', rationale: 'Meningitis' },
      { finding: 'Immunocompromised patient', upgradeTo: 'emergent', rationale: 'High risk for serious infection' },
      { finding: 'In infant <3 months', upgradeTo: 'emergent', rationale: 'High risk of serious bacterial infection' },
      { finding: 'With localizing source (UTI, pharyngitis)', upgradeTo: 'urgent', rationale: 'Identifiable infection' },
      { finding: 'Low-grade, brief duration, well-appearing', upgradeTo: 'less_urgent', rationale: 'Likely viral' }
    ],
    ageConsiderations: [
      { ageGroup: 'neonate', urgencyAdjustment: 'upgrade', notes: 'All febrile neonates are emergent' },
      { ageGroup: 'infant', urgencyAdjustment: 'upgrade', notes: 'Higher risk of SBI' },
      { ageGroup: 'elderly', urgencyAdjustment: 'upgrade', notes: 'May be afebrile despite serious infection' }
    ]
  },

  // ALTERED CONSCIOUSNESS
  {
    symptom: 'Altered level of consciousness / Confusion',
    defaultUrgency: 'emergent',
    modifiers: [
      { finding: 'Unresponsive', upgradeTo: 'immediate', rationale: 'Coma/near-death' },
      { finding: 'With trauma', upgradeTo: 'immediate', rationale: 'Intracranial injury' },
      { finding: 'With suspected overdose/poisoning', upgradeTo: 'immediate', rationale: 'Toxic emergency' },
      { finding: 'With hypoglycemia (known diabetic)', upgradeTo: 'immediate', rationale: 'Treatable emergency' },
      { finding: 'With fever', upgradeTo: 'immediate', rationale: 'Meningitis/encephalitis, sepsis' },
      { finding: 'Sudden onset with focal deficits', upgradeTo: 'immediate', rationale: 'Stroke' },
      { finding: 'New onset in elderly', upgradeTo: 'emergent', rationale: 'Multiple serious etiologies' },
      { finding: 'Chronic baseline dementia, unchanged', upgradeTo: 'less_urgent', rationale: 'Not acute change' }
    ],
    ageConsiderations: [
      { ageGroup: 'elderly', urgencyAdjustment: 'upgrade', notes: 'Delirium often indicates serious illness' }
    ]
  },

  // SEIZURE
  {
    symptom: 'Seizure',
    defaultUrgency: 'emergent',
    modifiers: [
      { finding: 'Ongoing (status epilepticus)', upgradeTo: 'immediate', rationale: 'Neurological emergency' },
      { finding: 'Post-ictal and not waking up', upgradeTo: 'immediate', rationale: 'Prolonged post-ictal or ongoing seizure' },
      { finding: 'First seizure ever', upgradeTo: 'emergent', rationale: 'Needs workup' },
      { finding: 'Seizure with trauma', upgradeTo: 'emergent', rationale: 'Head injury' },
      { finding: 'Pregnant', upgradeTo: 'emergent', rationale: 'Eclampsia' },
      { finding: 'Known epilepsy, typical seizure, now awake', upgradeTo: 'urgent', rationale: 'Breakthrough seizure' }
    ],
    ageConsiderations: [
      { ageGroup: 'infant', urgencyAdjustment: 'upgrade', notes: 'Higher risk of serious underlying cause' }
    ]
  },

  // TRAUMA
  {
    symptom: 'Trauma / Injury',
    defaultUrgency: 'urgent',
    modifiers: [
      { finding: 'Unconscious or altered', upgradeTo: 'immediate', rationale: 'Severe head/body injury' },
      { finding: 'Obvious major hemorrhage', upgradeTo: 'immediate', rationale: 'Exsanguination risk' },
      { finding: 'Suspected spinal injury', upgradeTo: 'immediate', rationale: 'Cord injury risk' },
      { finding: 'Penetrating trauma to chest/abdomen', upgradeTo: 'immediate', rationale: 'Internal injury' },
      { finding: 'Obvious deformity (fracture)', upgradeTo: 'emergent', rationale: 'Fracture care needed' },
      { finding: 'Moderate bleeding requiring sutures', upgradeTo: 'urgent', rationale: 'Wound repair needed' },
      { finding: 'Minor contusion, no bleeding', upgradeTo: 'less_urgent', rationale: 'Minor injury' }
    ]
  },

  // ALLERGIC REACTION
  {
    symptom: 'Allergic reaction / Rash',
    defaultUrgency: 'urgent',
    modifiers: [
      { finding: 'Anaphylaxis (airway/breathing/BP compromise)', upgradeTo: 'immediate', rationale: 'Life-threatening allergic reaction' },
      { finding: 'Facial/tongue swelling', upgradeTo: 'immediate', rationale: 'Airway compromise imminent' },
      { finding: 'Wheezing or stridor', upgradeTo: 'immediate', rationale: 'Airway involvement' },
      { finding: 'Widespread urticaria with distress', upgradeTo: 'emergent', rationale: 'Severe allergic reaction' },
      { finding: 'Localized hives, itching', upgradeTo: 'urgent', rationale: 'Allergic reaction' },
      { finding: 'Chronic rash, no acute symptoms', upgradeTo: 'less_urgent', rationale: 'Non-emergent dermatology' }
    ]
  },

  // BLEEDING
  {
    symptom: 'Bleeding (non-traumatic)',
    defaultUrgency: 'urgent',
    modifiers: [
      { finding: 'With shock signs', upgradeTo: 'immediate', rationale: 'Hemorrhagic shock' },
      { finding: 'Large volume hematemesis or rectal bleeding', upgradeTo: 'immediate', rationale: 'Major GI bleed' },
      { finding: 'Pregnant with vaginal bleeding', upgradeTo: 'emergent', rationale: 'Pregnancy complication' },
      { finding: 'Heavy epistaxis not stopping', upgradeTo: 'emergent', rationale: 'May need packing' },
      { finding: 'On anticoagulation', upgradeTo: 'emergent', rationale: 'Higher bleeding risk' },
      { finding: 'Minor nosebleed, now stopped', upgradeTo: 'less_urgent', rationale: 'Self-limited' },
      { finding: 'Spotting, menstrual variation', upgradeTo: 'less_urgent', rationale: 'Common, non-emergent' }
    ],
    ageConsiderations: [
      { ageGroup: 'elderly', urgencyAdjustment: 'upgrade', notes: 'Often on anticoagulants, less reserve' }
    ]
  },

  // VOMITING/DIARRHEA
  {
    symptom: 'Vomiting and/or Diarrhea',
    defaultUrgency: 'less_urgent',
    modifiers: [
      { finding: 'With severe dehydration/shock', upgradeTo: 'immediate', rationale: 'Hypovolemic shock' },
      { finding: 'Bilious vomiting in infant', upgradeTo: 'immediate', rationale: 'Malrotation/volvulus' },
      { finding: 'Blood in vomit or stool', upgradeTo: 'emergent', rationale: 'GI bleeding' },
      { finding: 'Unable to keep down fluids', upgradeTo: 'urgent', rationale: 'Dehydration risk' },
      { finding: 'With severe abdominal pain', upgradeTo: 'urgent', rationale: 'Surgical cause possible' },
      { finding: 'Mild symptoms, tolerating fluids', upgradeTo: 'less_urgent', rationale: 'Gastroenteritis' }
    ],
    ageConsiderations: [
      { ageGroup: 'infant', urgencyAdjustment: 'upgrade', notes: 'Dehydrate quickly' },
      { ageGroup: 'elderly', urgencyAdjustment: 'upgrade', notes: 'Lower physiologic reserve' }
    ]
  },

  // EYE PROBLEMS
  {
    symptom: 'Eye pain / Vision changes',
    defaultUrgency: 'urgent',
    modifiers: [
      { finding: 'Sudden vision loss', upgradeTo: 'immediate', rationale: 'Central retinal artery occlusion, AION' },
      { finding: 'Chemical exposure', upgradeTo: 'immediate', rationale: 'Ocular burn - irrigate NOW' },
      { finding: 'Severe pain with nausea (acute glaucoma)', upgradeTo: 'emergent', rationale: 'Angle closure glaucoma' },
      { finding: 'Penetrating eye injury', upgradeTo: 'emergent', rationale: 'Globe rupture' },
      { finding: 'Red eye with photophobia and decreased vision', upgradeTo: 'emergent', rationale: 'Uveitis, keratitis' },
      { finding: 'Flashing lights and floaters', upgradeTo: 'urgent', rationale: 'Retinal detachment prodrome' },
      { finding: 'Conjunctivitis, minimal discomfort', upgradeTo: 'less_urgent', rationale: 'Common, non-emergent' }
    ]
  },

  // BACK PAIN
  {
    symptom: 'Back pain',
    defaultUrgency: 'less_urgent',
    modifiers: [
      { finding: 'With saddle anesthesia or bladder dysfunction', upgradeTo: 'immediate', rationale: 'Cauda equina syndrome' },
      { finding: 'With progressive leg weakness', upgradeTo: 'emergent', rationale: 'Cord compression' },
      { finding: 'With fever', upgradeTo: 'emergent', rationale: 'Epidural abscess, osteomyelitis' },
      { finding: 'History of cancer', upgradeTo: 'emergent', rationale: 'Metastatic cord compression' },
      { finding: 'Post-trauma with severe pain', upgradeTo: 'urgent', rationale: 'Fracture' },
      { finding: 'Chronic, unchanged, no red flags', upgradeTo: 'non_urgent', rationale: 'Mechanical back pain' }
    ]
  },

  // PREGNANCY
  {
    symptom: 'Pregnancy-related complaint',
    defaultUrgency: 'urgent',
    modifiers: [
      { finding: 'Active labor/imminent delivery', upgradeTo: 'immediate', rationale: 'Delivery imminent' },
      { finding: 'Cord prolapse', upgradeTo: 'immediate', rationale: 'Fetal emergency' },
      { finding: 'Eclamptic seizure', upgradeTo: 'immediate', rationale: 'Life-threatening' },
      { finding: 'Heavy vaginal bleeding', upgradeTo: 'immediate', rationale: 'Placenta previa/abruption' },
      { finding: 'Severe headache/visual changes/epigastric pain', upgradeTo: 'emergent', rationale: 'Pre-eclampsia/HELLP' },
      { finding: 'Decreased fetal movement', upgradeTo: 'emergent', rationale: 'Fetal distress' },
      { finding: 'Abdominal pain with positive pregnancy test', upgradeTo: 'emergent', rationale: 'Ectopic pregnancy' },
      { finding: 'Regular contractions, not yet in active labor', upgradeTo: 'urgent', rationale: 'Early labor' },
      { finding: 'Routine prenatal question', upgradeTo: 'non_urgent', rationale: 'Not acute' }
    ]
  }
];

// ============================================================================
// TRIAGE FUNCTIONS
// ============================================================================

export function triageSymptom(
  symptom: string,
  findings: string[],
  ageGroup?: 'neonate' | 'infant' | 'child' | 'adult' | 'elderly'
): TriageAssessmentResult {
  // Find the symptom entry
  const entry = SYMPTOM_TRIAGE_DATABASE.find(e =>
    symptom.toLowerCase().includes(e.symptom.toLowerCase()) ||
    e.symptom.toLowerCase().includes(symptom.toLowerCase())
  );

  if (!entry) {
    return {
      urgencyLevel: 'urgent',
      urgencyColor: 'YELLOW',
      maxWaitTime: '30-60 minutes',
      disposition: 'Assess and determine urgency',
      redFlags: [],
      immediateActions: ['Perform full assessment', 'Check vital signs']
    };
  }

  let currentUrgency = entry.defaultUrgency;
  const triggeredRedFlags: string[] = [];
  const actions: string[] = [];

  // Check for modifiers that upgrade urgency
  for (const modifier of entry.modifiers) {
    const findingPresent = findings.some(f =>
      f.toLowerCase().includes(modifier.finding.toLowerCase()) ||
      modifier.finding.toLowerCase().includes(f.toLowerCase())
    );

    if (findingPresent) {
      const urgencyOrder: UrgencyLevel[] = ['immediate', 'emergent', 'urgent', 'less_urgent', 'non_urgent'];
      const currentIndex = urgencyOrder.indexOf(currentUrgency);
      const newIndex = urgencyOrder.indexOf(modifier.upgradeTo);

      if (newIndex < currentIndex) {
        currentUrgency = modifier.upgradeTo;
        triggeredRedFlags.push(`${modifier.finding} (${modifier.rationale})`);
      }
    }
  }

  // Check age considerations
  if (ageGroup && entry.ageConsiderations) {
    const ageMod = entry.ageConsiderations.find(ac => ac.ageGroup === ageGroup);
    if (ageMod && ageMod.urgencyAdjustment === 'upgrade') {
      const urgencyOrder: UrgencyLevel[] = ['immediate', 'emergent', 'urgent', 'less_urgent', 'non_urgent'];
      const currentIndex = urgencyOrder.indexOf(currentUrgency);
      if (currentIndex > 0) {
        currentUrgency = urgencyOrder[currentIndex - 1];
        triggeredRedFlags.push(`Age consideration: ${ageMod.notes}`);
      }
    }
  }

  // Get category details
  const category = URGENCY_CATEGORIES.find(c => c.level === currentUrgency)!;

  // Determine immediate actions based on urgency
  if (currentUrgency === 'immediate') {
    actions.push('Bring to resuscitation area immediately');
    actions.push('Alert senior clinician');
    actions.push('Prepare resuscitation equipment');
  } else if (currentUrgency === 'emergent') {
    actions.push('Move to high-acuity area');
    actions.push('Obtain IV access');
    actions.push('Continuous monitoring');
  } else if (currentUrgency === 'urgent') {
    actions.push('Place in examination area');
    actions.push('Perform focused assessment');
  }

  return {
    urgencyLevel: currentUrgency,
    urgencyColor: category.color,
    maxWaitTime: category.maxWaitTime,
    disposition: category.description,
    redFlags: triggeredRedFlags,
    immediateActions: actions
  };
}

export function getAllSymptomsForUrgency(level: UrgencyLevel): string[] {
  return SYMPTOM_TRIAGE_DATABASE
    .filter(e => e.defaultUrgency === level)
    .map(e => e.symptom);
}

export function getRedFlagsForSymptom(symptomKeyword: string): SymptomModifier[] {
  const entry = SYMPTOM_TRIAGE_DATABASE.find(e =>
    e.symptom.toLowerCase().includes(symptomKeyword.toLowerCase())
  );

  if (!entry) return [];

  return entry.modifiers.filter(m =>
    m.upgradeTo === 'immediate' || m.upgradeTo === 'emergent'
  );
}

// ============================================================================
// QUICK REFERENCE
// ============================================================================

export const URGENCY_TRIAGE_QUICK_REFERENCE = `
╔════════════════════════════════════════════════════════════════════════════╗
║                    URGENCY TRIAGE QUICK REFERENCE                          ║
╠════════════════════════════════════════════════════════════════════════════╣
║ RED - IMMEDIATE (0 min wait) - Life-threatening:                           ║
║ • Cardiac/respiratory arrest                                               ║
║ • Severe respiratory distress/stridor                                      ║
║ • Unresponsive/unconscious                                                 ║
║ • Shock (hypotension, altered consciousness, poor perfusion)               ║
║ • Major hemorrhage                                                         ║
║ • Anaphylaxis with airway/breathing compromise                             ║
╠════════════════════════════════════════════════════════════════════════════╣
║ ORANGE - EMERGENT (10-15 min) - Potentially life-threatening:              ║
║ • Chest pain with cardiac features                                         ║
║ • Stroke symptoms (sudden weakness, speech, facial droop)                  ║
║ • Severe pain (9-10/10)                                                    ║
║ • High fever with toxic appearance                                         ║
║ • Significant trauma                                                       ║
║ • GI bleeding (hematemesis, melena)                                        ║
║ • Seizure (ongoing or first-time)                                          ║
╠════════════════════════════════════════════════════════════════════════════╣
║ YELLOW - URGENT (30-60 min) - Serious but stable:                          ║
║ • Moderate pain (7-8/10)                                                   ║
║ • Fever with localizing source                                             ║
║ • Vomiting/diarrhea with mild dehydration                                  ║
║ • Lacerations needing sutures                                              ║
║ • Asthma (moderate, responding to treatment)                               ║
║ • Fractures (no neurovascular compromise)                                  ║
╠════════════════════════════════════════════════════════════════════════════╣
║ GREEN - LESS URGENT (1-2 hrs) - Minor:                                     ║
║ • Minor pain (4-6/10)                                                      ║
║ • Cold/flu symptoms, well-appearing                                        ║
║ • Minor injuries, small lacerations                                        ║
║ • Stable chronic complaints                                                ║
╠════════════════════════════════════════════════════════════════════════════╣
║ BLUE - NON-URGENT (2-4 hrs) - Could be outpatient:                        ║
║ • Complaints >1 week, unchanged                                            ║
║ • Follow-up visits                                                         ║
║ • Minor chronic issues                                                     ║
║ • Prescription refills                                                     ║
╠════════════════════════════════════════════════════════════════════════════╣
║ SPECIAL POPULATIONS - UPGRADE URGENCY:                                      ║
║ • Neonates: Any fever is EMERGENT                                          ║
║ • Infants: Lower threshold for respiratory/GI symptoms                     ║
║ • Elderly: May have blunted symptoms despite serious illness               ║
║ • Immunocompromised: Fever/infection is EMERGENT                           ║
║ • Pregnant: Abdominal pain, bleeding, headache are EMERGENT                ║
╚════════════════════════════════════════════════════════════════════════════╝
`;
