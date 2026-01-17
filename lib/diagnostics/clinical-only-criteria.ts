/**
 * Clinical-Only Diagnostic Criteria
 * Diagnosis based purely on history and physical examination
 * For use when laboratory tests, imaging, or advanced diagnostics are unavailable
 *
 * References:
 * - WHO Pocket Book of Hospital Care for Children (2013)
 * - WHO Clinical Management Guidelines
 * - MSF Clinical Guidelines (2020)
 * - ICRC War Surgery Manual
 *
 * Target audience: Healthcare workers in resource-limited, crisis, or conflict settings
 */

export interface ClinicalDiagnosis {
  id: string;
  name: string;
  category: DiagnosticCategory;
  clinicalCriteria: ClinicalCriteria;
  differentialDiagnosis: string[];
  redFlags: string[];
  treatmentWithoutLab: TreatmentProtocol;
  confidence: 'high' | 'moderate' | 'low';
  notes: string;
}

export interface ClinicalCriteria {
  required: string[];
  supportive: string[];
  minSupportiveRequired: number;
  exclusions: string[];
}

export interface TreatmentProtocol {
  immediate: string[];
  ongoing: string[];
  whenToRefer: string[];
  monitoringWithoutLab: string[];
}

export type DiagnosticCategory =
  | 'respiratory'
  | 'gastrointestinal'
  | 'infectious'
  | 'cardiovascular'
  | 'neurological'
  | 'musculoskeletal'
  | 'dermatological'
  | 'obstetric'
  | 'pediatric'
  | 'surgical';

/**
 * PNEUMONIA - Clinical Diagnosis (without X-ray)
 */
export const PNEUMONIA_CLINICAL: ClinicalDiagnosis = {
  id: 'pneumonia-clinical',
  name: 'Pneumonia (Clinical Diagnosis)',
  category: 'respiratory',
  clinicalCriteria: {
    required: [
      'Cough AND/OR difficulty breathing',
      'Fast breathing for age (≥60/min if <2mo, ≥50/min if 2-11mo, ≥40/min if 1-5y, ≥30/min if >5y)'
    ],
    supportive: [
      'Fever (may be absent in elderly, immunocompromised)',
      'Chest indrawing (severe pneumonia)',
      'Crackles/rales on auscultation',
      'Decreased breath sounds',
      'Nasal flaring',
      'Grunting',
      'Cyanosis'
    ],
    minSupportiveRequired: 1,
    exclusions: [
      'Wheezing only without fast breathing (more likely asthma/bronchiolitis)',
      'Upper respiratory symptoms only (rhinorrhea, sore throat) without fast breathing'
    ]
  },
  differentialDiagnosis: [
    'Bronchiolitis (if <2 years with wheeze)',
    'Asthma exacerbation',
    'Heart failure (hepatomegaly, edema)',
    'Tuberculosis (chronic cough >2 weeks, weight loss)',
    'Foreign body aspiration (sudden onset, unilateral wheeze)'
  ],
  redFlags: [
    'Unable to drink/breastfeed',
    'Convulsions',
    'Abnormally sleepy/difficult to wake',
    'Stridor at rest',
    'Central cyanosis',
    'Severe chest indrawing',
    'SpO2 <90% if available'
  ],
  treatmentWithoutLab: {
    immediate: [
      'Position: semi-upright if tolerated',
      'Oxygen if available and cyanotic or severe distress',
      'If NO danger signs (outpatient): Amoxicillin 40-50mg/kg/day in 2-3 doses x 5 days',
      'If danger signs (inpatient): Ampicillin 50mg/kg IV/IM q6h + Gentamicin 7.5mg/kg IV/IM daily'
    ],
    ongoing: [
      'Continue antibiotics for 5 days minimum',
      'Ensure adequate hydration',
      'Continue feeding (small frequent meals)',
      'Antipyretics for fever >38.5°C'
    ],
    whenToRefer: [
      'Any danger sign present',
      'No improvement after 48-72 hours of antibiotics',
      'Worsening despite treatment',
      'Suspected TB (chronic cough, weight loss)'
    ],
    monitoringWithoutLab: [
      'Respiratory rate every 4-6 hours',
      'Temperature every 6 hours',
      'Feeding/hydration status',
      'Level of consciousness',
      'Color (cyanosis)',
      'Chest indrawing severity'
    ]
  },
  confidence: 'high',
  notes: 'Fast breathing alone with cough is sufficient for clinical pneumonia diagnosis. Auscultation findings are less reliable in children.'
};

/**
 * MALARIA - Clinical Diagnosis (without RDT/microscopy)
 */
export const MALARIA_CLINICAL: ClinicalDiagnosis = {
  id: 'malaria-clinical',
  name: 'Malaria (Clinical Diagnosis - Endemic Area)',
  category: 'infectious',
  clinicalCriteria: {
    required: [
      'Fever (current or within past 48 hours)',
      'Living in or travel to malaria-endemic area in past 4 weeks'
    ],
    supportive: [
      'Headache',
      'Chills/rigors',
      'Myalgia/body aches',
      'Nausea/vomiting',
      'Splenomegaly on palpation',
      'Pallor (anemia)',
      'Jaundice (mild)',
      'Dark urine'
    ],
    minSupportiveRequired: 2,
    exclusions: [
      'Clear alternative diagnosis (pneumonia, UTI, meningitis)',
      'No endemic exposure'
    ]
  },
  differentialDiagnosis: [
    'Typhoid fever (stepladder fever, rose spots, hepatosplenomegaly)',
    'Dengue (rash, hemorrhagic signs, thrombocytopenia history)',
    'Viral syndrome (rhinorrhea, pharyngitis)',
    'Urinary tract infection (dysuria, frequency)',
    'Pneumonia (cough, fast breathing)'
  ],
  redFlags: [
    'Altered consciousness/coma',
    'Convulsions',
    'Prostration (unable to sit/stand)',
    'Respiratory distress',
    'Severe anemia (severe pallor)',
    'Jaundice (deep yellow)',
    'Hypoglycemia symptoms (sweating, confusion)',
    'Shock (cold extremities, weak pulse)',
    'Persistent vomiting',
    'No urine output'
  ],
  treatmentWithoutLab: {
    immediate: [
      'In endemic area with fever and no other clear cause: TREAT AS MALARIA',
      'Uncomplicated: Artemether-Lumefantrine (Coartem) per weight:',
      '  5-14kg: 1 tab twice daily x 3 days',
      '  15-24kg: 2 tabs twice daily x 3 days',
      '  25-34kg: 3 tabs twice daily x 3 days',
      '  ≥35kg: 4 tabs twice daily x 3 days',
      'Severe (any red flag): Artesunate 2.4mg/kg IV/IM at 0, 12, 24h then daily'
    ],
    ongoing: [
      'Complete full 3-day course even if improving',
      'Paracetamol for fever',
      'Oral fluids/ORS',
      'Monitor for danger signs'
    ],
    whenToRefer: [
      'Any sign of severe malaria',
      'Pregnant woman with malaria',
      'No improvement after 48 hours of treatment',
      'Unable to take oral medications'
    ],
    monitoringWithoutLab: [
      'Temperature every 6 hours',
      'Level of consciousness',
      'Ability to eat and drink',
      'Urine output',
      'Pallor (proxy for anemia)',
      'Respiratory rate'
    ]
  },
  confidence: 'moderate',
  notes: 'In endemic areas without diagnostic testing, presumptive treatment for malaria is recommended for fever without clear alternative cause. Overtreatment is preferable to missing malaria.'
};

/**
 * DEHYDRATION - Clinical Diagnosis
 */
export const DEHYDRATION_CLINICAL: ClinicalDiagnosis = {
  id: 'dehydration-clinical',
  name: 'Dehydration (Clinical Assessment)',
  category: 'gastrointestinal',
  clinicalCriteria: {
    required: [
      'History of fluid loss (diarrhea, vomiting, reduced intake, fever)',
    ],
    supportive: [
      'Sunken eyes',
      'Dry mucous membranes',
      'Decreased skin turgor (skin pinch slow to return)',
      'Increased thirst',
      'Decreased urine output',
      'Altered mental status (irritable or lethargic)',
      'Tachycardia',
      'Sunken fontanelle (infants)',
      'Absence of tears when crying'
    ],
    minSupportiveRequired: 2,
    exclusions: []
  },
  differentialDiagnosis: [
    'Sepsis (may have similar signs)',
    'Diabetic ketoacidosis (fruity breath, Kussmaul breathing)',
    'Malnutrition (chronic, edema may mask dehydration)'
  ],
  redFlags: [
    'Shock signs: cold extremities, weak/absent pulse, capillary refill >3 sec',
    'Altered consciousness',
    'Unable to drink',
    'Sunken eyes that do not improve with rehydration'
  ],
  treatmentWithoutLab: {
    immediate: [
      'MILD/MODERATE DEHYDRATION (Plan A/B):',
      '  ORS solution: 75ml/kg over 4 hours',
      '  Reassess every 1-2 hours',
      '',
      'SEVERE DEHYDRATION (Plan C):',
      '  IV access: Ringer\'s Lactate or Normal Saline',
      '  <12 months: 30ml/kg over 1 hour, then 70ml/kg over 5 hours',
      '  >12 months: 30ml/kg over 30 min, then 70ml/kg over 2.5 hours',
      '  If no IV: NG tube ORS 20ml/kg/hour for 6 hours'
    ],
    ongoing: [
      'Continue ORS to replace ongoing losses',
      'Zinc supplementation for diarrhea (10mg <6mo, 20mg ≥6mo) x 10-14 days',
      'Continue feeding',
      'Breastfeed frequently if applicable'
    ],
    whenToRefer: [
      'Severe dehydration not responding to treatment',
      'Altered consciousness',
      'Unable to establish IV and NG not possible',
      'Bloody diarrhea with systemic signs'
    ],
    monitoringWithoutLab: [
      'Urine output (count wet diapers or ask about urination)',
      'Mental status/alertness',
      'Skin turgor',
      'Mucous membrane moisture',
      'Tears when crying',
      'Fontanelle (infants)',
      'Pulse rate and strength',
      'Weight if scale available'
    ]
  },
  confidence: 'high',
  notes: 'Clinical assessment of dehydration is reliable. Skin turgor less reliable in malnourished children. Weight change is most objective measure if baseline available.'
};

/**
 * MENINGITIS - Clinical Diagnosis
 */
export const MENINGITIS_CLINICAL: ClinicalDiagnosis = {
  id: 'meningitis-clinical',
  name: 'Meningitis (Clinical Suspicion)',
  category: 'neurological',
  clinicalCriteria: {
    required: [
      'Fever',
      'At least ONE of: headache, stiff neck, altered consciousness'
    ],
    supportive: [
      'Neck stiffness (Brudzinski sign: passive neck flexion causes hip flexion)',
      'Kernig sign (pain on leg extension with hip flexed)',
      'Photophobia',
      'Severe headache',
      'Vomiting',
      'Petechial/purpuric rash (meningococcal)',
      'Bulging fontanelle (infants)',
      'High-pitched cry (infants)',
      'Irritability or lethargy',
      'Seizures'
    ],
    minSupportiveRequired: 2,
    exclusions: [
      'Clear alternative diagnosis for neck stiffness (cervical spine injury, tetanus)'
    ]
  },
  differentialDiagnosis: [
    'Cerebral malaria (endemic area)',
    'Encephalitis (more altered consciousness, less meningeal signs)',
    'Brain abscess (focal neurological signs)',
    'Tetanus (trismus, muscle rigidity)',
    'Subarachnoid hemorrhage (sudden severe headache)'
  ],
  redFlags: [
    'Coma (GCS <8)',
    'Seizures',
    'Focal neurological signs (may indicate abscess or raised ICP)',
    'Petechial/purpuric rash (meningococcemia)',
    'Shock',
    'Respiratory failure'
  ],
  treatmentWithoutLab: {
    immediate: [
      'START ANTIBIOTICS IMMEDIATELY - do not delay for LP or imaging',
      'Ceftriaxone 50mg/kg IV/IM (max 2g) STAT, then q12h',
      '  OR Ampicillin 50mg/kg IV q6h + Chloramphenicol 25mg/kg IV q6h',
      'Dexamethasone 0.15mg/kg IV q6h x 4 days (give before or with first antibiotic)',
      'If concern for TB meningitis: add anti-TB treatment'
    ],
    ongoing: [
      'Continue antibiotics minimum 7-14 days depending on suspected organism',
      'IV fluids: maintain hydration but avoid overhydration (risk of cerebral edema)',
      'Seizure precautions',
      'Treat fever with paracetamol',
      'Elevate head of bed 30 degrees if possible'
    ],
    whenToRefer: [
      'ALL suspected meningitis should be referred if possible',
      'If cannot refer: treat aggressively and monitor closely',
      'Deteriorating consciousness',
      'Focal signs developing',
      'Not responding to treatment'
    ],
    monitoringWithoutLab: [
      'Glasgow Coma Scale every 2-4 hours',
      'Pupil size and reactivity',
      'Vital signs every 2-4 hours',
      'Seizure activity',
      'Neck stiffness improvement',
      'Urine output',
      'Signs of raised ICP (Cushing reflex: bradycardia + hypertension)'
    ]
  },
  confidence: 'moderate',
  notes: 'In resource-limited settings, clinical meningitis with fever + neck stiffness + altered consciousness warrants empiric treatment. Lumbar puncture if available but NEVER delay antibiotics.'
};

/**
 * APPENDICITIS - Clinical Diagnosis
 */
export const APPENDICITIS_CLINICAL: ClinicalDiagnosis = {
  id: 'appendicitis-clinical',
  name: 'Appendicitis (Clinical Diagnosis)',
  category: 'surgical',
  clinicalCriteria: {
    required: [
      'Right lower quadrant abdominal pain',
      'Abdominal tenderness (especially at McBurney\'s point)'
    ],
    supportive: [
      'Pain migration: periumbilical → RLQ',
      'Anorexia',
      'Nausea/vomiting (usually after pain onset)',
      'Low-grade fever (typically <38.5°C initially)',
      'Rebound tenderness (release worse than pressure)',
      'Rovsing sign (RLQ pain with LLQ palpation)',
      'Psoas sign (RLQ pain with right hip extension)',
      'Obturator sign (RLQ pain with internal rotation of flexed right hip)'
    ],
    minSupportiveRequired: 3,
    exclusions: [
      'Pain for >72 hours without worsening (less likely appendicitis)',
      'Diarrhea as primary symptom (more likely gastroenteritis)'
    ]
  },
  differentialDiagnosis: [
    'Mesenteric lymphadenitis (children, often with URTI)',
    'Gastroenteritis (diarrhea more prominent)',
    'Ovarian pathology (women: torsion, cyst, PID)',
    'Ectopic pregnancy (reproductive age women)',
    'Urinary tract infection (dysuria, frequency)',
    'Kidney stone (colicky pain, hematuria history)'
  ],
  redFlags: [
    'Rigid abdomen (peritonitis)',
    'Diffuse tenderness (perforation)',
    'High fever >39°C (perforation)',
    'Palpable mass (abscess)',
    'Shock signs',
    'Symptoms >48-72 hours (higher perforation risk)'
  ],
  treatmentWithoutLab: {
    immediate: [
      'NPO (nothing by mouth)',
      'IV access and fluids',
      'Pain management: Morphine 0.1mg/kg IV (analgesia does NOT mask peritonitis)',
      'Antibiotics pre-operatively:',
      '  Ceftriaxone 1-2g IV + Metronidazole 500mg IV',
      '  OR Ampicillin-Sulbactam 3g IV',
      'SURGICAL CONSULTATION - appendectomy is definitive treatment'
    ],
    ongoing: [
      'If surgery not available: antibiotics may temporize',
      '  Ceftriaxone 1g daily + Metronidazole 500mg q8h x 7-10 days',
      '  Close monitoring for perforation',
      'Serial abdominal exams',
      'Nasogastric tube if vomiting'
    ],
    whenToRefer: [
      'ALL suspected appendicitis needs surgical evaluation',
      'If surgery unavailable: antibiotics and close monitoring',
      'Signs of perforation: urgent referral',
      'No improvement with conservative management'
    ],
    monitoringWithoutLab: [
      'Serial abdominal exams every 4-6 hours',
      'Vital signs (fever, tachycardia)',
      'Pain location and character',
      'Bowel sounds',
      'Abdominal distension',
      'Peritoneal signs progression'
    ]
  },
  confidence: 'moderate',
  notes: 'Clinical diagnosis accuracy ~80% with experienced examiner. When in doubt in resource-limited settings, err on side of appendicitis to avoid perforation. Alvarado score can assist clinical decision-making.'
};

/**
 * TYPHOID FEVER - Clinical Diagnosis
 */
export const TYPHOID_CLINICAL: ClinicalDiagnosis = {
  id: 'typhoid-clinical',
  name: 'Typhoid Fever (Clinical Suspicion)',
  category: 'infectious',
  clinicalCriteria: {
    required: [
      'Fever for ≥3 days',
      'No clear localizing source'
    ],
    supportive: [
      'Stepladder fever pattern (rising over days)',
      'Relative bradycardia (pulse not elevated proportional to fever)',
      'Headache',
      'Abdominal discomfort/tenderness',
      'Hepatomegaly',
      'Splenomegaly',
      'Rose spots (faint pink macules on trunk - rare but specific)',
      'Constipation (early) or diarrhea (late)',
      'Coated tongue',
      'Malaise, anorexia'
    ],
    minSupportiveRequired: 3,
    exclusions: [
      'Localizing signs of infection (pneumonia, UTI, etc.)'
    ]
  },
  differentialDiagnosis: [
    'Malaria (more acute, rigors)',
    'Dengue (rash, hemorrhagic signs)',
    'Brucellosis (undulant fever, joint pain)',
    'Tuberculosis (chronic, respiratory symptoms)',
    'Viral hepatitis (jaundice, dark urine)',
    'Leptospirosis (conjunctival suffusion, muscle tenderness)'
  ],
  redFlags: [
    'Altered consciousness (typhoid encephalopathy)',
    'GI bleeding (melena)',
    'Abdominal rigidity (perforation)',
    'Shock',
    'Respiratory distress'
  ],
  treatmentWithoutLab: {
    immediate: [
      'Ciprofloxacin 500mg PO twice daily x 7-14 days (first-line if susceptibility unknown)',
      '  OR Azithromycin 500mg PO daily x 7 days',
      '  OR Ceftriaxone 2g IV daily x 14 days (if unable to take oral)',
      'Paracetamol for fever (avoid NSAIDs)',
      'Adequate hydration'
    ],
    ongoing: [
      'Complete antibiotic course',
      'Bed rest during acute phase',
      'Soft diet, avoid high-fiber foods (intestinal perforation risk)',
      'Monitor for complications'
    ],
    whenToRefer: [
      'Suspected GI bleeding or perforation',
      'Altered consciousness',
      'Not responding to antibiotics after 5-7 days',
      'Unable to maintain hydration orally'
    ],
    monitoringWithoutLab: [
      'Temperature curve (should defervesce by day 5-7 of treatment)',
      'Abdominal exam daily (distension, tenderness)',
      'Stool color (blood)',
      'Level of consciousness',
      'Pulse and blood pressure',
      'Hepatosplenomegaly regression'
    ]
  },
  confidence: 'moderate',
  notes: 'Clinical diagnosis of typhoid is challenging. In endemic areas with prolonged fever and no clear source, empiric treatment is reasonable. Watch for complications in week 2-3.'
};

/**
 * PRE-ECLAMPSIA - Clinical Diagnosis
 */
export const PREECLAMPSIA_CLINICAL: ClinicalDiagnosis = {
  id: 'preeclampsia-clinical',
  name: 'Pre-eclampsia (Clinical Diagnosis)',
  category: 'obstetric',
  clinicalCriteria: {
    required: [
      'Pregnancy ≥20 weeks gestation',
      'Elevated blood pressure (≥140/90 mmHg on two occasions 4 hours apart)',
    ],
    supportive: [
      'Proteinuria (if dipstick available: ≥1+)',
      'Edema (especially facial, hands)',
      'Headache (severe, persistent)',
      'Visual disturbances (blurred vision, scotomata)',
      'Epigastric/RUQ pain (liver involvement)',
      'Nausea/vomiting',
      'Hyperreflexia',
      'Oliguria'
    ],
    minSupportiveRequired: 1,
    exclusions: [
      'Chronic hypertension diagnosed before 20 weeks',
      'Gestational hypertension without other features (BP elevated but no proteinuria/symptoms)'
    ]
  },
  differentialDiagnosis: [
    'Gestational hypertension (no proteinuria/symptoms)',
    'Chronic hypertension with superimposed pre-eclampsia',
    'HELLP syndrome (more severe)',
    'Acute fatty liver of pregnancy (jaundice, hypoglycemia)'
  ],
  redFlags: [
    'BP ≥160/110 (SEVERE pre-eclampsia)',
    'Severe headache not relieved by paracetamol',
    'Visual disturbances',
    'Epigastric/RUQ pain',
    'Eclampsia (seizures)',
    'Pulmonary edema (dyspnea)',
    'Oliguria (<500ml/24h)',
    'Fetal distress'
  ],
  treatmentWithoutLab: {
    immediate: [
      'SEVERE PRE-ECLAMPSIA (BP ≥160/110 or symptoms):',
      '  Magnesium sulfate loading: 4g IV over 20 min + 5g IM each buttock',
      '  Maintenance: 1g/hour IV OR 5g IM every 4 hours',
      '  Antihypertensive: Labetalol 200-800mg PO OR Nifedipine 10-20mg PO',
      '  Target: BP <160/110',
      '',
      'MILD PRE-ECLAMPSIA:',
      '  Bed rest, left lateral position',
      '  Monitor BP every 4 hours',
      '  Watch for progression to severe features'
    ],
    ongoing: [
      'Continue MgSO4 for 24 hours after delivery or last seizure',
      'Monitor for MgSO4 toxicity: urine output >25ml/hr, respiratory rate >12, reflexes present',
      'Antidote for MgSO4 toxicity: Calcium gluconate 1g IV over 5-10 min',
      'DEFINITIVE TREATMENT IS DELIVERY',
      'If ≥37 weeks or severe: plan delivery',
      'If <37 weeks and stable: may temporize with close monitoring'
    ],
    whenToRefer: [
      'ALL pre-eclampsia should be managed at facility with cesarean capability',
      'Severe features: urgent referral',
      'Eclampsia (seizures): stabilize with MgSO4 and refer',
      'HELLP syndrome suspected (abdominal pain + hemolysis signs)'
    ],
    monitoringWithoutLab: [
      'Blood pressure every 4 hours (every 15-30 min if severe)',
      'Urine output (catheterize if severe)',
      'Deep tendon reflexes',
      'Respiratory rate',
      'Level of consciousness',
      'Fetal heart rate',
      'Headache, visual changes, epigastric pain'
    ]
  },
  confidence: 'high',
  notes: 'Pre-eclampsia can be diagnosed clinically with hypertension + proteinuria OR hypertension + symptoms (headache, visual changes, RUQ pain). Absence of proteinuria does not exclude diagnosis if other criteria met.'
};

/**
 * HEART FAILURE - Clinical Diagnosis
 */
export const HEART_FAILURE_CLINICAL: ClinicalDiagnosis = {
  id: 'heart-failure-clinical',
  name: 'Heart Failure (Clinical Diagnosis)',
  category: 'cardiovascular',
  clinicalCriteria: {
    required: [
      'Dyspnea (on exertion or at rest)',
      'At least 2 of: raised JVP, peripheral edema, pulmonary crackles, hepatomegaly'
    ],
    supportive: [
      'Orthopnea (dyspnea when lying flat)',
      'Paroxysmal nocturnal dyspnea',
      'Peripheral edema (bilateral)',
      'Elevated JVP',
      'Hepatomegaly (tender)',
      'Pulmonary crackles (bilateral, basal)',
      'Third heart sound (S3 gallop)',
      'Tachycardia',
      'Cardiomegaly (displaced apex beat)',
      'Fatigue'
    ],
    minSupportiveRequired: 3,
    exclusions: [
      'Primary pulmonary disease explaining symptoms (COPD)',
      'Nephrotic syndrome (edema but no JVP elevation)',
      'Hepatic cirrhosis (ascites, spider nevi)'
    ]
  },
  differentialDiagnosis: [
    'COPD exacerbation (wheezing, smoking history)',
    'Pneumonia (fever, productive cough)',
    'Pulmonary embolism (sudden onset, pleuritic chest pain)',
    'Renal failure (uremic signs)',
    'Anemia (pallor, tachycardia)'
  ],
  redFlags: [
    'Cardiogenic shock (hypotension, cold peripheries)',
    'Acute pulmonary edema (severe dyspnea, pink frothy sputum)',
    'New onset rapid atrial fibrillation',
    'Acute MI (chest pain, diaphoresis)'
  ],
  treatmentWithoutLab: {
    immediate: [
      'Position: sitting upright',
      'Oxygen if available',
      'Furosemide 40-80mg IV (or PO if stable)',
      'If acute pulmonary edema: Morphine 2-4mg IV cautiously',
      'Restrict fluid intake (<1.5L/day)'
    ],
    ongoing: [
      'Daily furosemide (adjust to achieve dry weight)',
      'ACE inhibitor if BP tolerates: Enalapril 2.5-10mg twice daily',
      'Beta-blocker once stable: Carvedilol 3.125mg twice daily or Bisoprolol 1.25mg daily',
      'Low-salt diet',
      'Daily weights if scale available'
    ],
    whenToRefer: [
      'Cardiogenic shock',
      'Acute pulmonary edema not responding to treatment',
      'New onset heart failure (needs workup)',
      'Suspected acute coronary syndrome'
    ],
    monitoringWithoutLab: [
      'Daily weight (1-2kg gain suggests fluid retention)',
      'Peripheral edema assessment',
      'JVP estimation',
      'Respiratory rate and effort',
      'Urine output',
      'Blood pressure',
      'Heart rate and rhythm'
    ]
  },
  confidence: 'moderate',
  notes: 'Framingham criteria can guide clinical diagnosis. Major criteria: PND, JVP elevation, crackles, cardiomegaly, S3 gallop, acute pulmonary edema. Minor criteria: ankle edema, night cough, dyspnea on exertion, hepatomegaly, tachycardia >120.'
};

/**
 * Collection of all clinical-only diagnoses
 */
export const CLINICAL_DIAGNOSES: ClinicalDiagnosis[] = [
  PNEUMONIA_CLINICAL,
  MALARIA_CLINICAL,
  DEHYDRATION_CLINICAL,
  MENINGITIS_CLINICAL,
  APPENDICITIS_CLINICAL,
  TYPHOID_CLINICAL,
  PREECLAMPSIA_CLINICAL,
  HEART_FAILURE_CLINICAL
];

/**
 * Get diagnosis by ID
 */
export function getClinicalDiagnosis(id: string): ClinicalDiagnosis | undefined {
  return CLINICAL_DIAGNOSES.find(d => d.id === id);
}

/**
 * Get diagnoses by category
 */
export function getDiagnosesByCategory(category: DiagnosticCategory): ClinicalDiagnosis[] {
  return CLINICAL_DIAGNOSES.filter(d => d.category === category);
}

/**
 * Evaluate if clinical criteria are met
 */
export function evaluateClinicalCriteria(
  diagnosis: ClinicalDiagnosis,
  requiredMet: boolean[],
  supportiveMet: boolean[]
): {
  criteriaMet: boolean;
  confidence: 'high' | 'moderate' | 'low';
  message: string;
} {
  const allRequiredMet = requiredMet.every(Boolean);
  const supportiveCount = supportiveMet.filter(Boolean).length;
  const meetsMinSupportive = supportiveCount >= diagnosis.clinicalCriteria.minSupportiveRequired;

  if (allRequiredMet && meetsMinSupportive) {
    return {
      criteriaMet: true,
      confidence: supportiveCount >= 4 ? 'high' : 'moderate',
      message: `Clinical criteria met for ${diagnosis.name}. ${supportiveCount} supportive criteria present.`
    };
  }

  if (allRequiredMet && !meetsMinSupportive) {
    return {
      criteriaMet: false,
      confidence: 'low',
      message: `Required criteria met but only ${supportiveCount}/${diagnosis.clinicalCriteria.minSupportiveRequired} supportive criteria present. Consider other diagnoses.`
    };
  }

  return {
    criteriaMet: false,
    confidence: 'low',
    message: `Clinical criteria NOT met for ${diagnosis.name}. Consider alternative diagnoses.`
  };
}

/**
 * Quick reference ASCII card
 */
export const CLINICAL_DIAGNOSIS_QUICK_REFERENCE = `
╔════════════════════════════════════════════════════════════════════════╗
║          CLINICAL-ONLY DIAGNOSTIC CRITERIA (No Lab Required)           ║
╠════════════════════════════════════════════════════════════════════════╣
║                                                                        ║
║ PNEUMONIA (Clinical):                                                  ║
║   Required: Cough/difficulty breathing + Fast breathing for age        ║
║   Fast breathing: <2mo ≥60, 2-11mo ≥50, 1-5y ≥40, >5y ≥30 breaths/min ║
║   Severe if: chest indrawing, stridor, danger signs                    ║
║                                                                        ║
║ MALARIA (Endemic area):                                                ║
║   Required: Fever + endemic exposure                                   ║
║   Support: headache, chills, myalgia, splenomegaly, pallor            ║
║   Action: Treat presumptively if no clear alternative cause            ║
║                                                                        ║
║ DEHYDRATION:                                                           ║
║   Assess: eyes, thirst, skin pinch, mental status                      ║
║   Severe (2+): lethargic, sunken eyes, unable to drink, very slow pinch║
║   Some (2+): restless, sunken eyes, drinks eagerly, slow pinch         ║
║                                                                        ║
║ MENINGITIS:                                                            ║
║   Required: Fever + (headache OR stiff neck OR altered consciousness)  ║
║   Signs: Brudzinski, Kernig, photophobia, bulging fontanelle          ║
║   ACTION: Antibiotics IMMEDIATELY - do not delay!                      ║
║                                                                        ║
║ APPENDICITIS:                                                          ║
║   Required: RLQ pain + tenderness                                      ║
║   Classic: pain migration periumbilical→RLQ, anorexia, low fever      ║
║   Signs: McBurney, Rovsing, psoas, obturator                          ║
║                                                                        ║
║ TYPHOID:                                                               ║
║   Required: Fever ≥3 days + no localizing source                       ║
║   Support: stepladder fever, relative bradycardia, hepatosplenomegaly  ║
║   Rose spots (trunk): rare but specific                                ║
║                                                                        ║
║ PRE-ECLAMPSIA:                                                         ║
║   Required: Pregnancy ≥20wk + BP ≥140/90                               ║
║   Severe if: BP ≥160/110, headache, visual changes, RUQ pain          ║
║   ACTION: MgSO4 loading if severe features                             ║
║                                                                        ║
║ HEART FAILURE:                                                         ║
║   Required: Dyspnea + (JVP elevation OR edema OR crackles OR hepato)   ║
║   Support: orthopnea, PND, S3 gallop, tachycardia                     ║
║   ACTION: Sit upright, furosemide, fluid restrict                      ║
║                                                                        ║
╚════════════════════════════════════════════════════════════════════════╝
`;

export default {
  CLINICAL_DIAGNOSES,
  getClinicalDiagnosis,
  getDiagnosesByCategory,
  evaluateClinicalCriteria,
  CLINICAL_DIAGNOSIS_QUICK_REFERENCE
};
