/**
 * Red Flags Database - Danger Sign Detection by Symptom
 * Systematic approach to identifying high-risk patients
 *
 * References:
 * - WHO IMAI Guidelines
 * - British Medical Journal "Red Flags" Series
 * - American College of Emergency Physicians Guidelines
 * - MSF Clinical Guidelines
 *
 * For healthcare workers in resource-limited settings
 */

export interface RedFlagCategory {
  symptom: string;
  description: string;
  redFlags: RedFlag[];
  immediateActions: string[];
  whenToRefer: string[];
}

export interface RedFlag {
  finding: string;
  concernFor: string[];
  urgency: 'immediate' | 'urgent' | 'soon';
  action: string;
  clinicalRationale: string;
}

// ============================================================================
// HEADACHE RED FLAGS
// ============================================================================

export const HEADACHE_RED_FLAGS: RedFlagCategory = {
  symptom: 'Headache',
  description: 'Warning signs that a headache may indicate serious pathology',

  redFlags: [
    {
      finding: 'Sudden severe onset ("thunderclap") - worst headache of life',
      concernFor: ['Subarachnoid hemorrhage', 'Intracranial hemorrhage', 'Cerebral venous thrombosis'],
      urgency: 'immediate',
      action: 'Immediate referral for CT and LP. Do not discharge.',
      clinicalRationale: 'SAH mortality is 50%; early intervention saves lives'
    },
    {
      finding: 'Fever with neck stiffness (meningismus)',
      concernFor: ['Bacterial meningitis', 'Viral meningitis', 'Encephalitis'],
      urgency: 'immediate',
      action: 'Start antibiotics (ceftriaxone) BEFORE any tests or transfer',
      clinicalRationale: 'Every hour delay in antibiotics increases mortality'
    },
    {
      finding: 'Papilledema on fundoscopy',
      concernFor: ['Raised intracranial pressure', 'Brain tumor', 'Idiopathic intracranial hypertension'],
      urgency: 'urgent',
      action: 'Urgent neuroimaging. Do not perform LP without imaging first.',
      clinicalRationale: 'LP in raised ICP can cause herniation'
    },
    {
      finding: 'New neurological deficits (weakness, numbness, visual changes)',
      concernFor: ['Stroke', 'Brain tumor', 'Mass lesion', 'Complicated migraine'],
      urgency: 'urgent',
      action: 'Urgent neuroimaging and neurology referral',
      clinicalRationale: 'Focal deficits indicate structural pathology'
    },
    {
      finding: 'New onset after age 50',
      concernFor: ['Giant cell arteritis', 'Brain tumor', 'Subdural hematoma'],
      urgency: 'urgent',
      action: 'Check ESR/CRP if available, consider temporal artery biopsy',
      clinicalRationale: 'GCA can cause irreversible blindness'
    },
    {
      finding: 'Headache worse with coughing, bending, or Valsalva',
      concernFor: ['Raised intracranial pressure', 'Chiari malformation', 'Posterior fossa lesion'],
      urgency: 'urgent',
      action: 'Neuroimaging needed',
      clinicalRationale: 'Position-dependent headache suggests structural cause'
    },
    {
      finding: 'Progressive worsening over days to weeks',
      concernFor: ['Brain tumor', 'Subdural hematoma', 'Chronic meningitis'],
      urgency: 'urgent',
      action: 'Neuroimaging and workup for underlying cause',
      clinicalRationale: 'Progressive headaches need explanation'
    },
    {
      finding: 'Immunocompromised patient (HIV, cancer, transplant)',
      concernFor: ['Opportunistic infections', 'CNS lymphoma', 'Cryptococcal meningitis'],
      urgency: 'urgent',
      action: 'LP for CSF analysis, consider empiric treatment',
      clinicalRationale: 'Immunocompromised patients have different etiologies'
    },
    {
      finding: 'History of cancer (any type)',
      concernFor: ['Brain metastases', 'Leptomeningeal carcinomatosis'],
      urgency: 'urgent',
      action: 'Neuroimaging with contrast',
      clinicalRationale: 'Up to 30% of cancer patients develop brain mets'
    },
    {
      finding: 'Recent head trauma (within 3 months)',
      concernFor: ['Subdural hematoma', 'Epidural hematoma', 'Post-concussion syndrome'],
      urgency: 'urgent',
      action: 'CT head, especially if on anticoagulation or elderly',
      clinicalRationale: 'Delayed subdural can present weeks after injury'
    }
  ],

  immediateActions: [
    'Check vital signs including BP (hypertensive emergency?)',
    'Neurological exam: consciousness, pupils, focal deficits',
    'Fundoscopy if available (papilledema)',
    'Assess for meningeal signs'
  ],

  whenToRefer: [
    'Any "thunderclap" headache',
    'Fever with meningeal signs',
    'New neurological deficits',
    'Papilledema',
    'Progressive or changing headache pattern',
    'Immunocompromised patient'
  ]
};

// ============================================================================
// CHEST PAIN RED FLAGS
// ============================================================================

export const CHEST_PAIN_RED_FLAGS: RedFlagCategory = {
  symptom: 'Chest Pain',
  description: 'Warning signs that chest pain may indicate life-threatening pathology',

  redFlags: [
    {
      finding: 'Hemodynamic instability (hypotension, shock signs)',
      concernFor: ['Massive PE', 'Acute MI with cardiogenic shock', 'Aortic dissection', 'Tension pneumothorax', 'Cardiac tamponade'],
      urgency: 'immediate',
      action: 'Resuscitation, IV access, immediate transfer. Give aspirin.',
      clinicalRationale: 'Unstable chest pain = life-threatening until proven otherwise'
    },
    {
      finding: 'Tearing/ripping pain radiating to back',
      concernFor: ['Aortic dissection'],
      urgency: 'immediate',
      action: 'BP control (target SBP <120), urgent transfer for CT angiography',
      clinicalRationale: 'Type A dissection has 1-2% mortality per hour without surgery'
    },
    {
      finding: 'Absent breath sounds unilaterally with hypoxia',
      concernFor: ['Tension pneumothorax'],
      urgency: 'immediate',
      action: 'Needle decompression (2nd ICS midclavicular) if tension suspected',
      clinicalRationale: 'Tension pneumothorax is rapidly fatal'
    },
    {
      finding: 'Muffled heart sounds + JVD + hypotension (Beck triad)',
      concernFor: ['Cardiac tamponade'],
      urgency: 'immediate',
      action: 'Pericardiocentesis if available, urgent transfer',
      clinicalRationale: 'Tamponade prevents cardiac filling'
    },
    {
      finding: 'Diaphoresis with chest pain',
      concernFor: ['Acute MI', 'PE', 'Aortic dissection'],
      urgency: 'immediate',
      action: 'Aspirin, ECG if available, prepare for transfer',
      clinicalRationale: 'Diaphoresis is a sign of autonomic activation from severe stress'
    },
    {
      finding: 'Pain radiating to jaw, left arm, or both arms',
      concernFor: ['Acute MI'],
      urgency: 'urgent',
      action: 'Aspirin 300mg, nitroglycerin if BP >90, urgent transfer',
      clinicalRationale: 'Classic anginal radiation patterns'
    },
    {
      finding: 'Associated dyspnea at rest',
      concernFor: ['PE', 'Acute MI', 'Heart failure', 'Pneumothorax'],
      urgency: 'urgent',
      action: 'Assess oxygenation, ECG if available, prepare for workup',
      clinicalRationale: 'Dyspnea suggests cardiac or pulmonary pathology'
    },
    {
      finding: 'Recent immobilization, surgery, or long travel + pleuritic pain',
      concernFor: ['Pulmonary embolism'],
      urgency: 'urgent',
      action: 'Consider anticoagulation, urgent imaging',
      clinicalRationale: 'VTE risk factors with compatible symptoms = high probability PE'
    },
    {
      finding: 'History of cocaine or stimulant use',
      concernFor: ['Coronary vasospasm', 'Acute MI', 'Aortic dissection'],
      urgency: 'urgent',
      action: 'Benzodiazepines for anxiety/HTN, avoid beta-blockers, ECG',
      clinicalRationale: 'Cocaine causes coronary vasoconstriction'
    },
    {
      finding: 'Syncope with chest pain',
      concernFor: ['PE', 'Acute MI', 'Aortic dissection', 'Arrhythmia'],
      urgency: 'urgent',
      action: 'Keep patient supine, continuous monitoring, urgent transfer',
      clinicalRationale: 'Syncope suggests hemodynamic compromise'
    }
  ],

  immediateActions: [
    'Assess ABCs and vital signs',
    'IV access',
    'Aspirin 300mg chewed (unless contraindicated)',
    'ECG if available',
    'Oxygen if hypoxic',
    'Position of comfort'
  ],

  whenToRefer: [
    'Any hemodynamically unstable patient',
    'New chest pain with cardiac risk factors',
    'Suspected aortic dissection',
    'Suspected PE',
    'Syncope with chest pain'
  ]
};

// ============================================================================
// ABDOMINAL PAIN RED FLAGS
// ============================================================================

export const ABDOMINAL_PAIN_RED_FLAGS: RedFlagCategory = {
  symptom: 'Abdominal Pain',
  description: 'Warning signs that abdominal pain may require urgent intervention',

  redFlags: [
    {
      finding: 'Board-like rigidity (involuntary guarding)',
      concernFor: ['Peritonitis', 'Perforated viscus', 'Bowel ischemia'],
      urgency: 'immediate',
      action: 'NPO, IV fluids, antibiotics, immediate surgical consultation',
      clinicalRationale: 'Involuntary guarding indicates peritoneal irritation'
    },
    {
      finding: 'Signs of shock (hypotension, tachycardia, cool extremities)',
      concernFor: ['Ruptured AAA', 'Ruptured ectopic', 'Massive GI bleed', 'Sepsis'],
      urgency: 'immediate',
      action: 'Aggressive fluid resuscitation, urgent surgical evaluation',
      clinicalRationale: 'Shock indicates massive internal bleeding or sepsis'
    },
    {
      finding: 'Complete obstipation (no flatus or stool)',
      concernFor: ['Complete bowel obstruction', 'Volvulus'],
      urgency: 'immediate',
      action: 'NPO, NG tube, IV fluids, surgical consultation',
      clinicalRationale: 'Complete obstruction can lead to bowel necrosis'
    },
    {
      finding: 'Hematemesis or melena',
      concernFor: ['Upper GI bleed', 'Perforated ulcer', 'Variceal bleeding'],
      urgency: 'immediate',
      action: 'Two large-bore IVs, fluid resuscitation, PPI, urgent endoscopy referral',
      clinicalRationale: 'GI bleeding can be rapidly fatal'
    },
    {
      finding: 'Pulsatile abdominal mass in patient >50',
      concernFor: ['Abdominal aortic aneurysm (potentially ruptured)'],
      urgency: 'immediate',
      action: 'Do NOT palpate repeatedly. IV access, urgent vascular surgery',
      clinicalRationale: 'Ruptured AAA mortality approaches 90%'
    },
    {
      finding: 'Positive pregnancy test + pelvic pain',
      concernFor: ['Ectopic pregnancy (potentially ruptured)'],
      urgency: 'urgent',
      action: 'IV access, type and screen, urgent ultrasound/surgery',
      clinicalRationale: 'Ectopic is leading cause of first trimester maternal death'
    },
    {
      finding: 'Fever >38.5°C with abdominal pain',
      concernFor: ['Appendicitis', 'Cholecystitis', 'Diverticulitis', 'Pyelonephritis', 'PID'],
      urgency: 'urgent',
      action: 'Labs if available, antibiotics, imaging/surgical consultation',
      clinicalRationale: 'Fever suggests infectious/inflammatory process'
    },
    {
      finding: 'Pain out of proportion to exam findings',
      concernFor: ['Mesenteric ischemia', 'Early bowel obstruction', 'Early pancreatitis'],
      urgency: 'urgent',
      action: 'High suspicion for mesenteric ischemia especially in elderly with AF',
      clinicalRationale: 'Mesenteric ischemia has minimal early findings but high mortality'
    },
    {
      finding: 'Jaundice + fever + RUQ pain (Charcot triad)',
      concernFor: ['Ascending cholangitis'],
      urgency: 'urgent',
      action: 'IV antibiotics, urgent ERCP referral',
      clinicalRationale: 'Cholangitis is a biliary sepsis emergency'
    },
    {
      finding: 'Recent abdominal surgery or procedure',
      concernFor: ['Anastomotic leak', 'Abscess', 'Bowel injury'],
      urgency: 'urgent',
      action: 'Contact surgery team, imaging',
      clinicalRationale: 'Post-operative complications need prompt recognition'
    }
  ],

  immediateActions: [
    'Vital signs including HR, BP, temperature',
    'Inspect: distension, scars, visible peristalsis',
    'Auscultate: bowel sounds',
    'Palpate: tenderness, guarding, masses',
    'Check for peritoneal signs (rebound, rigidity)',
    'Pregnancy test in reproductive-age women'
  ],

  whenToRefer: [
    'Peritoneal signs',
    'Signs of obstruction',
    'GI bleeding',
    'Suspected ectopic pregnancy',
    'Fever with localized findings',
    'Pain not improving with conservative measures'
  ]
};

// ============================================================================
// FEVER RED FLAGS
// ============================================================================

export const FEVER_RED_FLAGS: RedFlagCategory = {
  symptom: 'Fever',
  description: 'Warning signs that fever may indicate serious infection',

  redFlags: [
    {
      finding: 'Toxic appearance / altered mental status',
      concernFor: ['Sepsis', 'Meningitis', 'Severe malaria'],
      urgency: 'immediate',
      action: 'IV fluids, broad-spectrum antibiotics, source control',
      clinicalRationale: 'Altered mental status = end-organ dysfunction'
    },
    {
      finding: 'Non-blanching (petechial/purpuric) rash',
      concernFor: ['Meningococcemia', 'DIC', 'Rocky Mountain spotted fever'],
      urgency: 'immediate',
      action: 'Ceftriaxone immediately, even before transfer',
      clinicalRationale: 'Meningococcemia can kill within hours'
    },
    {
      finding: 'Neck stiffness + photophobia',
      concernFor: ['Bacterial meningitis', 'Viral meningitis', 'SAH'],
      urgency: 'immediate',
      action: 'Antibiotics before any testing or transfer',
      clinicalRationale: 'Meningitis mortality increases with antibiotic delay'
    },
    {
      finding: 'Hypotension (SBP <90) or signs of shock',
      concernFor: ['Septic shock'],
      urgency: 'immediate',
      action: '30mL/kg fluid bolus, antibiotics, vasopressors if needed',
      clinicalRationale: 'Septic shock has high mortality without aggressive treatment'
    },
    {
      finding: 'Severe headache + altered consciousness (in endemic area)',
      concernFor: ['Cerebral malaria'],
      urgency: 'immediate',
      action: 'IV artesunate, check/treat hypoglycemia',
      clinicalRationale: 'Cerebral malaria mortality is high without treatment'
    },
    {
      finding: 'Immunocompromised patient',
      concernFor: ['Opportunistic infections', 'Atypical pathogens', 'Rapid progression'],
      urgency: 'urgent',
      action: 'Lower threshold for empiric treatment and hospitalization',
      clinicalRationale: 'Immunocompromised patients decompensate quickly'
    },
    {
      finding: 'Heart murmur + prolonged fever',
      concernFor: ['Infective endocarditis'],
      urgency: 'urgent',
      action: 'Blood cultures if available, echocardiography',
      clinicalRationale: 'Endocarditis destroys valves and causes emboli'
    },
    {
      finding: 'Recent travel to endemic area',
      concernFor: ['Malaria', 'Typhoid', 'Dengue', 'Viral hemorrhagic fevers'],
      urgency: 'urgent',
      action: 'Test for malaria, consider isolation if VHF possible',
      clinicalRationale: 'Travel-related infections have different etiologies'
    },
    {
      finding: 'Fever >14 days without diagnosis',
      concernFor: ['TB', 'Endocarditis', 'Abscess', 'Malignancy', 'HIV'],
      urgency: 'urgent',
      action: 'Systematic workup: imaging, cultures, HIV test',
      clinicalRationale: 'Prolonged fever needs explanation'
    },
    {
      finding: 'Fever after recent hospitalization/procedure',
      concernFor: ['Healthcare-associated infection', 'Surgical site infection', 'Line infection'],
      urgency: 'urgent',
      action: 'Examine all lines/wounds, cultures, consider removal of devices',
      clinicalRationale: 'Nosocomial infections often involve resistant organisms'
    }
  ],

  immediateActions: [
    'Check temperature, HR, BP, RR',
    'Assess mental status',
    'Full skin exam (rash, petechiae)',
    'Check for meningeal signs',
    'Source identification: HEENT, lungs, abdomen, skin, urine'
  ],

  whenToRefer: [
    'Signs of sepsis or shock',
    'Meningeal signs',
    'Petechial rash',
    'Immunocompromised with fever',
    'Prolonged fever without source',
    'Suspected malaria with danger signs'
  ]
};

// ============================================================================
// PEDIATRIC RED FLAGS
// ============================================================================

export const PEDIATRIC_RED_FLAGS: RedFlagCategory = {
  symptom: 'Pediatric Illness (General)',
  description: 'Warning signs in children that indicate serious illness',

  redFlags: [
    {
      finding: 'Bulging fontanelle in infant',
      concernFor: ['Meningitis', 'Raised ICP', 'Hydrocephalus'],
      urgency: 'immediate',
      action: 'Antibiotics for presumed meningitis, urgent referral',
      clinicalRationale: 'Bulging fontanelle indicates increased intracranial pressure'
    },
    {
      finding: 'Inconsolable crying / high-pitched cry',
      concernFor: ['Meningitis', 'Intussusception', 'Testicular torsion', 'Abuse'],
      urgency: 'immediate',
      action: 'Full examination including genitalia, consider LP/imaging',
      clinicalRationale: 'Persistent abnormal cry is a non-specific but serious sign'
    },
    {
      finding: 'Grunting respirations',
      concernFor: ['Severe pneumonia', 'Respiratory failure', 'Sepsis'],
      urgency: 'immediate',
      action: 'Oxygen, prepare for respiratory support, antibiotics',
      clinicalRationale: 'Grunting creates auto-PEEP to maintain oxygenation'
    },
    {
      finding: 'Severe dehydration signs (sunken fontanelle, no tears, no urine >6h)',
      concernFor: ['Severe dehydration from any cause'],
      urgency: 'immediate',
      action: 'IV/IO fluids 20mL/kg bolus, identify cause',
      clinicalRationale: 'Children have less physiologic reserve for dehydration'
    },
    {
      finding: 'Mottled/gray skin color',
      concernFor: ['Sepsis', 'Shock', 'Severe illness'],
      urgency: 'immediate',
      action: 'Fluid resuscitation, antibiotics, urgent transfer',
      clinicalRationale: 'Mottling indicates poor perfusion'
    },
    {
      finding: 'Blue color of lips or tongue (central cyanosis)',
      concernFor: ['Severe hypoxia', 'Congenital heart disease', 'Respiratory failure'],
      urgency: 'immediate',
      action: 'Oxygen, assess airway, prepare for respiratory support',
      clinicalRationale: 'Central cyanosis indicates severe desaturation'
    },
    {
      finding: 'Non-blanching rash (petechiae/purpura)',
      concernFor: ['Meningococcemia', 'Leukemia', 'ITP', 'DIC'],
      urgency: 'immediate',
      action: 'Ceftriaxone immediately if febrile',
      clinicalRationale: 'Meningococcemia progresses within hours'
    },
    {
      finding: 'Bile-stained (green) vomiting in infant',
      concernFor: ['Intestinal obstruction', 'Malrotation with volvulus'],
      urgency: 'immediate',
      action: 'NPO, NG tube, urgent surgical evaluation',
      clinicalRationale: 'Volvulus leads to bowel necrosis within hours'
    },
    {
      finding: 'Weak/high-pitched cry + poor feeding + lethargy',
      concernFor: ['Sepsis', 'Meningitis', 'Serious bacterial infection'],
      urgency: 'urgent',
      action: 'Full sepsis workup, empiric antibiotics',
      clinicalRationale: 'Subtle signs in young infants can indicate serious infection'
    },
    {
      finding: 'Decreased activity/not playing',
      concernFor: ['Serious illness of any kind'],
      urgency: 'urgent',
      action: 'Full evaluation, low threshold for workup and hospitalization',
      clinicalRationale: 'Sick children stop playing - this is a reliable sign'
    }
  ],

  immediateActions: [
    'Assess: responsiveness, respiratory effort, color',
    'Check: HR, RR, temperature, capillary refill',
    'Fontanelle in infants',
    'Hydration status',
    'Full skin exam'
  ],

  whenToRefer: [
    'Any infant <3 months with fever',
    'Signs of respiratory distress',
    'Signs of dehydration not responding to ORS',
    'Altered consciousness',
    'Non-blanching rash with fever',
    'Bilious vomiting in infant'
  ]
};

// ============================================================================
// BACK PAIN RED FLAGS
// ============================================================================

export const BACK_PAIN_RED_FLAGS: RedFlagCategory = {
  symptom: 'Back Pain',
  description: 'Warning signs that back pain may indicate serious pathology',

  redFlags: [
    {
      finding: 'Saddle anesthesia (numbness in perianal area)',
      concernFor: ['Cauda equina syndrome'],
      urgency: 'immediate',
      action: 'Urgent MRI and neurosurgery consultation (surgical emergency)',
      clinicalRationale: 'CES requires decompression within 24-48 hours to prevent permanent deficits'
    },
    {
      finding: 'Urinary retention or incontinence (new onset)',
      concernFor: ['Cauda equina syndrome', 'Spinal cord compression'],
      urgency: 'immediate',
      action: 'Bladder scan, urgent MRI',
      clinicalRationale: 'Bladder dysfunction indicates severe nerve compromise'
    },
    {
      finding: 'Progressive motor weakness in legs',
      concernFor: ['Cauda equina syndrome', 'Spinal cord compression', 'Epidural abscess'],
      urgency: 'immediate',
      action: 'Urgent MRI and neurosurgery consultation',
      clinicalRationale: 'Progressive weakness requires emergent imaging'
    },
    {
      finding: 'Fever with back pain',
      concernFor: ['Spinal epidural abscess', 'Vertebral osteomyelitis', 'Discitis'],
      urgency: 'urgent',
      action: 'MRI, blood cultures, IV antibiotics',
      clinicalRationale: 'Spinal infections can lead to paralysis'
    },
    {
      finding: 'History of IV drug use + back pain',
      concernFor: ['Epidural abscess', 'Endocarditis with septic emboli'],
      urgency: 'urgent',
      action: 'MRI spine, blood cultures, echocardiography',
      clinicalRationale: 'IVDU patients at high risk for spinal infections'
    },
    {
      finding: 'History of cancer + new back pain',
      concernFor: ['Metastatic spinal cord compression'],
      urgency: 'urgent',
      action: 'MRI spine, steroids if compression confirmed, radiation oncology',
      clinicalRationale: 'Spinal mets can cause paralysis without treatment'
    },
    {
      finding: 'Significant trauma + back pain',
      concernFor: ['Vertebral fracture', 'Spinal cord injury'],
      urgency: 'urgent',
      action: 'Spinal immobilization, imaging',
      clinicalRationale: 'Unstable fractures can cause cord damage with movement'
    },
    {
      finding: 'Age >50 with new onset back pain + unexplained weight loss',
      concernFor: ['Malignancy', 'Myeloma', 'Metastatic cancer'],
      urgency: 'urgent',
      action: 'Imaging, lab workup including protein electrophoresis',
      clinicalRationale: 'New back pain in older adults may indicate cancer'
    },
    {
      finding: 'Night pain that doesn\'t improve with rest',
      concernFor: ['Malignancy', 'Infection'],
      urgency: 'urgent',
      action: 'Imaging and workup',
      clinicalRationale: 'Mechanical pain improves with rest; pathologic pain does not'
    },
    {
      finding: 'Long-term steroid use + back pain',
      concernFor: ['Vertebral compression fracture'],
      urgency: 'soon',
      action: 'Spinal imaging',
      clinicalRationale: 'Steroids cause osteoporosis and pathologic fractures'
    }
  ],

  immediateActions: [
    'Detailed neurological exam of lower extremities',
    'Check sensation in saddle area',
    'Assess sphincter tone if indicated',
    'Check for urinary retention (bladder scan or post-void residual)'
  ],

  whenToRefer: [
    'Any signs of cauda equina syndrome (EMERGENCY)',
    'Progressive neurological deficit',
    'Fever with back pain',
    'History of cancer with new back pain',
    'Significant trauma'
  ]
};

// ============================================================================
// EXPORTS AND UTILITIES
// ============================================================================

export const ALL_RED_FLAGS: RedFlagCategory[] = [
  HEADACHE_RED_FLAGS,
  CHEST_PAIN_RED_FLAGS,
  ABDOMINAL_PAIN_RED_FLAGS,
  FEVER_RED_FLAGS,
  PEDIATRIC_RED_FLAGS,
  BACK_PAIN_RED_FLAGS
];

export function getRedFlagsBySymptom(symptom: string): RedFlagCategory | undefined {
  return ALL_RED_FLAGS.find(
    category => category.symptom.toLowerCase().includes(symptom.toLowerCase())
  );
}

export function getImmediateRedFlags(symptom: string): RedFlag[] {
  const category = getRedFlagsBySymptom(symptom);
  if (!category) return [];
  return category.redFlags.filter(flag => flag.urgency === 'immediate');
}

export function getAllImmediateRedFlags(): RedFlag[] {
  return ALL_RED_FLAGS.flatMap(category =>
    category.redFlags.filter(flag => flag.urgency === 'immediate')
  );
}

// Quick reference
export const RED_FLAGS_QUICK_REFERENCE = `
╔════════════════════════════════════════════════════════════════════════════╗
║                         RED FLAGS QUICK REFERENCE                          ║
║                    "Don't Miss" Diagnoses by Symptom                       ║
╠════════════════════════════════════════════════════════════════════════════╣
║ HEADACHE - IMMEDIATE:                                                      ║
║ • Thunderclap (sudden severe)        → SAH until proven otherwise          ║
║ • Fever + neck stiffness             → Meningitis - give antibiotics NOW   ║
║ • Papilledema                        → Raised ICP - do NOT LP without CT   ║
║ • New neuro deficits                 → Stroke/mass - urgent imaging        ║
╠════════════════════════════════════════════════════════════════════════════╣
║ CHEST PAIN - IMMEDIATE:                                                    ║
║ • Shock / hypotension                → MI, PE, dissection, tamponade       ║
║ • Tearing to back                    → Aortic dissection                   ║
║ • Absent breath sounds + distress    → Tension pneumothorax                ║
║ • Muffled heart + JVD + hypotension  → Tamponade                          ║
╠════════════════════════════════════════════════════════════════════════════╣
║ ABDOMINAL PAIN - IMMEDIATE:                                                ║
║ • Board-like rigidity                → Peritonitis - surgery NOW           ║
║ • Shock                              → Ruptured AAA, ectopic, GI bleed     ║
║ • Complete obstipation               → Bowel obstruction/volvulus          ║
║ • Hematemesis/melena                 → Upper GI bleed                      ║
║ • Positive pregnancy + pain          → Ectopic until proven otherwise      ║
╠════════════════════════════════════════════════════════════════════════════╣
║ FEVER - IMMEDIATE:                                                         ║
║ • Toxic appearance                   → Sepsis - fluids + antibiotics       ║
║ • Non-blanching rash                 → Meningococcemia - antibiotics NOW   ║
║ • Neck stiffness                     → Meningitis - antibiotics NOW        ║
║ • Hypotension                        → Septic shock                        ║
╠════════════════════════════════════════════════════════════════════════════╣
║ PEDIATRIC - IMMEDIATE:                                                     ║
║ • Bulging fontanelle                 → Meningitis/raised ICP               ║
║ • Grunting respirations              → Severe pneumonia/sepsis             ║
║ • Mottled/gray skin                  → Shock                               ║
║ • Central cyanosis                   → Severe hypoxia                      ║
║ • Bilious vomiting (infant)          → Volvulus - surgery STAT             ║
║ • Non-blanching rash + fever         → Meningococcemia - antibiotics NOW   ║
╠════════════════════════════════════════════════════════════════════════════╣
║ BACK PAIN - IMMEDIATE:                                                     ║
║ • Saddle anesthesia                  → Cauda equina - surgery within 24h   ║
║ • Urinary retention/incontinence     → Cauda equina                        ║
║ • Progressive leg weakness           → Cord compression                    ║
║ • Fever                              → Epidural abscess                    ║
║ • Cancer history                     → Metastatic cord compression         ║
╚════════════════════════════════════════════════════════════════════════════╝

GENERAL PRINCIPLE: If you see a red flag, act on it immediately.
Better to over-refer than to miss a time-critical diagnosis.
`;
