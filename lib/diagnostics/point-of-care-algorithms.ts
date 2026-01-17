/**
 * Point-of-Care Clinical Decision Trees
 * Diagnostic algorithms for resource-limited settings WITHOUT labs or imaging
 *
 * References:
 * - WHO IMAI Guidelines (Integrated Management of Adult Illness)
 * - WHO ETAT (Emergency Triage Assessment and Treatment)
 * - MSF Clinical Guidelines (Médecins Sans Frontières)
 * - Primary Care International Clinical Protocols
 *
 * For healthcare workers in settings without access to:
 * - Laboratory tests (CBC, chemistry, troponin, etc.)
 * - Imaging (X-ray, CT, ultrasound)
 * - Advanced diagnostics (ECG, echocardiography)
 */

// ============================================================================
// CORE TYPES
// ============================================================================

export interface DecisionNode {
  id: string;
  question: string;
  finding: string;
  yesNode?: string;
  noNode?: string;
  outcome?: DiagnosticOutcome;
  clinicalTip?: string;
}

export interface DiagnosticOutcome {
  diagnosis: string;
  severity: 'emergency' | 'urgent' | 'non-urgent';
  disposition: 'immediate_referral' | 'urgent_referral' | 'treat_and_observe' | 'outpatient';
  differentials: string[];
  treatmentPrinciples: string[];
  redFlags: string[];
  whenToRefer: string[];
}

export interface ClinicalAlgorithm {
  id: string;
  name: string;
  chiefComplaint: string;
  applicableTo: 'adult' | 'pediatric' | 'all';
  initialAssessment: string[];
  vitalSignsToCheck: string[];
  physicalExamFocus: string[];
  decisionTree: DecisionNode[];
  quickReference: string;
}

// ============================================================================
// CHEST PAIN ALGORITHM (Without ECG/Troponin)
// ============================================================================

export const CHEST_PAIN_ALGORITHM: ClinicalAlgorithm = {
  id: 'chest-pain-clinical',
  name: 'Chest Pain Clinical Assessment',
  chiefComplaint: 'Chest pain, chest discomfort, chest tightness',
  applicableTo: 'adult',

  initialAssessment: [
    'ABCs - Airway, Breathing, Circulation',
    'Level of consciousness',
    'Respiratory distress?',
    'Shock signs (pale, cold, sweaty, weak pulse)?',
    'Ability to speak in full sentences'
  ],

  vitalSignsToCheck: [
    'Heart rate (manual pulse - note regularity)',
    'Blood pressure (if available)',
    'Respiratory rate',
    'Temperature',
    'Oxygen saturation (if pulse ox available)'
  ],

  physicalExamFocus: [
    'Inspection: diaphoresis, pallor, cyanosis, JVD, respiratory effort',
    'Palpation: chest wall tenderness (reproducible?), pulse quality',
    'Auscultation: heart sounds (murmurs, rubs), lung sounds (crackles)',
    'Abdomen: epigastric tenderness, liver size',
    'Extremities: edema, pulse symmetry, capillary refill'
  ],

  decisionTree: [
    {
      id: 'cp-1',
      question: 'Is the patient in shock or respiratory distress?',
      finding: 'Shock signs: HR >100, weak pulse, cold/clammy, confused, SBP <90',
      yesNode: 'cp-emergency',
      noNode: 'cp-2',
      clinicalTip: 'Shock + chest pain = assume life-threatening cause (MI, PE, tamponade, aortic dissection)'
    },
    {
      id: 'cp-emergency',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Possible acute coronary syndrome, pulmonary embolism, or other life-threatening cause',
        severity: 'emergency',
        disposition: 'immediate_referral',
        differentials: ['Acute MI', 'Pulmonary embolism', 'Aortic dissection', 'Tension pneumothorax', 'Cardiac tamponade'],
        treatmentPrinciples: [
          'IV access if possible',
          'Aspirin 300mg chewed (if not contraindicated)',
          'Oxygen if available and SpO2 <94%',
          'Position of comfort (usually sitting up)',
          'IMMEDIATE transfer to higher level care'
        ],
        redFlags: ['Shock', 'Severe respiratory distress', 'Altered consciousness'],
        whenToRefer: ['Immediately - do not delay for any workup']
      }
    },
    {
      id: 'cp-2',
      question: 'Is the pain REPRODUCIBLE with chest wall palpation?',
      finding: 'Pressing on the painful area reproduces the exact pain',
      yesNode: 'cp-musculoskeletal',
      noNode: 'cp-3',
      clinicalTip: 'Reproducible = more likely musculoskeletal, but does NOT rule out cardiac cause in high-risk patients'
    },
    {
      id: 'cp-musculoskeletal',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Likely musculoskeletal chest pain (costochondritis, muscle strain)',
        severity: 'non-urgent',
        disposition: 'outpatient',
        differentials: ['Costochondritis', 'Muscle strain', 'Rib injury', 'Herpes zoster (pre-rash)'],
        treatmentPrinciples: [
          'NSAIDs (ibuprofen 400mg TID) or paracetamol',
          'Local heat application',
          'Avoid aggravating activities',
          'Reassurance'
        ],
        redFlags: ['New cardiac risk factors', 'Pain persists despite treatment', 'Development of other symptoms'],
        whenToRefer: ['If symptoms worsen', 'If cardiac risk factors present', 'If pain persists >2 weeks']
      }
    },
    {
      id: 'cp-3',
      question: 'Does the patient have HIGH cardiac risk factors?',
      finding: 'Age >55M or >65F, diabetes, hypertension, smoking, known heart disease, family history of early MI',
      yesNode: 'cp-high-risk',
      noNode: 'cp-4',
      clinicalTip: 'Multiple risk factors dramatically increase likelihood of ACS'
    },
    {
      id: 'cp-high-risk',
      question: 'Is the pain typical of angina?',
      finding: 'Substernal, pressure/squeezing, radiating to arm/jaw/back, with exertion, relieved by rest',
      yesNode: 'cp-probable-acs',
      noNode: 'cp-atypical-acs',
      clinicalTip: 'Women and diabetics often have atypical presentations'
    },
    {
      id: 'cp-probable-acs',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Probable acute coronary syndrome',
        severity: 'urgent',
        disposition: 'urgent_referral',
        differentials: ['Unstable angina', 'NSTEMI', 'STEMI'],
        treatmentPrinciples: [
          'Aspirin 300mg chewed',
          'Nitroglycerin if available and BP >90 systolic',
          'Rest',
          'Transfer for ECG and troponin as soon as possible'
        ],
        redFlags: ['Ongoing pain', 'Diaphoresis', 'Nausea/vomiting', 'Dyspnea'],
        whenToRefer: ['Same day - urgent transfer for workup']
      }
    },
    {
      id: 'cp-atypical-acs',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Possible atypical ACS presentation - cannot exclude cardiac cause',
        severity: 'urgent',
        disposition: 'urgent_referral',
        differentials: ['Atypical ACS', 'Stable angina', 'Non-cardiac cause'],
        treatmentPrinciples: [
          'Aspirin 300mg chewed as precaution',
          'Rest',
          'Monitor closely',
          'Refer for definitive workup'
        ],
        redFlags: ['Any deterioration', 'New symptoms'],
        whenToRefer: ['Same day for ECG/troponin workup']
      }
    },
    {
      id: 'cp-4',
      question: 'Is the pain PLEURITIC (sharp, worse with breathing)?',
      finding: 'Sharp stabbing pain that worsens with deep breath or cough',
      yesNode: 'cp-pleuritic',
      noNode: 'cp-5',
      clinicalTip: 'Pleuritic pain suggests pleural/pericardial inflammation or PE'
    },
    {
      id: 'cp-pleuritic',
      question: 'Is there fever OR respiratory symptoms OR recent immobilization?',
      finding: 'Fever, cough, sputum OR recent surgery, travel, leg swelling',
      yesNode: 'cp-pleuritic-workup',
      noNode: 'cp-viral-pleurisy',
      clinicalTip: 'PE should be considered in immobilized patients with pleuritic pain'
    },
    {
      id: 'cp-pleuritic-workup',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Pleuritic chest pain requiring evaluation (pneumonia vs PE vs pericarditis)',
        severity: 'urgent',
        disposition: 'urgent_referral',
        differentials: ['Pneumonia', 'Pulmonary embolism', 'Pericarditis', 'Pleuritis'],
        treatmentPrinciples: [
          'If pneumonia suspected: start antibiotics (amoxicillin 1g TID)',
          'If PE suspected: anticoagulation if available and no contraindication',
          'Monitor respiratory status',
          'Refer for imaging if available'
        ],
        redFlags: ['Hypoxia', 'Tachycardia', 'Hypotension', 'Hemoptysis'],
        whenToRefer: ['Same day for chest X-ray and further workup']
      }
    },
    {
      id: 'cp-viral-pleurisy',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Probable viral pleurisy or benign cause',
        severity: 'non-urgent',
        disposition: 'treat_and_observe',
        differentials: ['Viral pleurisy', 'Muscle strain', 'Costochondritis'],
        treatmentPrinciples: [
          'NSAIDs for pain/inflammation',
          'Rest',
          'Monitor for worsening'
        ],
        redFlags: ['Fever develops', 'Dyspnea worsens', 'Pain persists >1 week'],
        whenToRefer: ['If symptoms worsen or persist']
      }
    },
    {
      id: 'cp-5',
      question: 'Is there heartburn, acid taste, or food-related symptoms?',
      finding: 'Burning quality, worse after meals, acid regurgitation, food triggers',
      yesNode: 'cp-gerd',
      noNode: 'cp-6',
      clinicalTip: 'GERD is common but should be a diagnosis of exclusion in cardiac risk patients'
    },
    {
      id: 'cp-gerd',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Probable GERD/esophageal cause',
        severity: 'non-urgent',
        disposition: 'outpatient',
        differentials: ['GERD', 'Esophagitis', 'Peptic ulcer disease', 'Esophageal spasm'],
        treatmentPrinciples: [
          'PPI (omeprazole 20mg daily) or H2 blocker',
          'Dietary modifications (avoid triggers, smaller meals)',
          'Elevate head of bed',
          'Avoid lying down after meals',
          'Antacids for breakthrough symptoms'
        ],
        redFlags: ['Dysphagia', 'Weight loss', 'GI bleeding', 'No response to treatment'],
        whenToRefer: ['If alarm symptoms present', 'If no improvement in 4-8 weeks']
      }
    },
    {
      id: 'cp-6',
      question: 'Is there anxiety, hyperventilation, or psychosocial stress?',
      finding: 'Stressful life events, anxiety symptoms, tingling in hands/face, rapid breathing',
      yesNode: 'cp-anxiety',
      noNode: 'cp-undifferentiated',
      clinicalTip: 'Panic attacks can mimic cardiac symptoms - but cardiac causes must be excluded first'
    },
    {
      id: 'cp-anxiety',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Probable anxiety-related chest pain (diagnosis of exclusion)',
        severity: 'non-urgent',
        disposition: 'outpatient',
        differentials: ['Panic disorder', 'Generalized anxiety', 'Hyperventilation syndrome'],
        treatmentPrinciples: [
          'Reassurance after appropriate workup',
          'Breathing exercises',
          'Address underlying stressors',
          'Consider anxiolytic if severe (short-term)',
          'Mental health referral if persistent'
        ],
        redFlags: ['Cardiac risk factors present', 'Symptoms at rest (not just anxiety episodes)'],
        whenToRefer: ['If any cardiac concern', 'For mental health support']
      }
    },
    {
      id: 'cp-undifferentiated',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Undifferentiated chest pain - requires monitoring',
        severity: 'urgent',
        disposition: 'treat_and_observe',
        differentials: ['Multiple possible causes - cannot differentiate without further testing'],
        treatmentPrinciples: [
          'Close observation for 4-6 hours minimum',
          'Serial vital signs',
          'Aspirin if cardiac cannot be excluded',
          'Pain management',
          'Consider referral for definitive workup'
        ],
        redFlags: ['Any hemodynamic change', 'Worsening pain', 'New symptoms'],
        whenToRefer: ['If any concern for serious cause', 'If no clear benign diagnosis']
      }
    }
  ],

  quickReference: `
╔════════════════════════════════════════════════════════════════════════════╗
║                    CHEST PAIN - CLINICAL DECISION TREE                     ║
║                    (Without ECG/Troponin/Imaging)                          ║
╠════════════════════════════════════════════════════════════════════════════╣
║ IMMEDIATE EMERGENCY (TRANSFER NOW):                                        ║
║ • Shock (cold, sweaty, weak pulse, low BP)                                ║
║ • Severe respiratory distress                                              ║
║ • Altered consciousness                                                    ║
║ → Aspirin 300mg chewed + O2 if available → IMMEDIATE TRANSFER              ║
╠════════════════════════════════════════════════════════════════════════════╣
║ HIGH-RISK FEATURES (Same-day referral):                                    ║
║ • Age >55M, >65F with new chest pain                                       ║
║ • Diabetes, hypertension, smoking, known CAD                               ║
║ • Substernal pressure/squeezing                                            ║
║ • Radiation to arm, jaw, back                                              ║
║ • Associated with exertion or rest                                         ║
║ • Diaphoresis, nausea, dyspnea                                            ║
║ → Aspirin + Urgent transfer for ECG/troponin                               ║
╠════════════════════════════════════════════════════════════════════════════╣
║ LIKELY BENIGN (Outpatient management):                                     ║
║ • Reproducible with palpation (costochondritis)                            ║
║ • Sharp, pleuritic, no fever (viral pleurisy)                             ║
║ • Burning, food-related (GERD)                                             ║
║ • Anxiety-related with clear trigger                                       ║
╠════════════════════════════════════════════════════════════════════════════╣
║ CLINICAL PEARL: In resource-limited settings, when in doubt, give          ║
║ aspirin and refer. The cost of missing an MI >> cost of overreferral.     ║
╚════════════════════════════════════════════════════════════════════════════╝
`
};

// ============================================================================
// DYSPNEA ALGORITHM (Without SpO2/CXR)
// ============================================================================

export const DYSPNEA_ALGORITHM: ClinicalAlgorithm = {
  id: 'dyspnea-clinical',
  name: 'Dyspnea Clinical Assessment',
  chiefComplaint: 'Shortness of breath, difficulty breathing, can\'t get enough air',
  applicableTo: 'all',

  initialAssessment: [
    'Can patient speak in full sentences?',
    'Respiratory rate (count for 30 seconds)',
    'Use of accessory muscles?',
    'Tripod positioning?',
    'Cyanosis (lips, fingernails)?',
    'Level of consciousness'
  ],

  vitalSignsToCheck: [
    'Respiratory rate (most important)',
    'Heart rate',
    'Blood pressure',
    'Temperature',
    'SpO2 if available (not essential)'
  ],

  physicalExamFocus: [
    'Inspection: chest symmetry, respiratory effort, nasal flaring, retractions',
    'Auscultation: breath sounds (wheezes, crackles, stridor, absent), heart sounds',
    'Palpation: tracheal position, chest wall tenderness',
    'Percussion: hyperresonance (pneumothorax) vs dullness (effusion/consolidation)',
    'JVD, peripheral edema (heart failure)',
    'Leg swelling asymmetry (PE)'
  ],

  decisionTree: [
    {
      id: 'dy-1',
      question: 'Is the patient in respiratory failure?',
      finding: 'Cannot speak, RR >40, severe accessory muscle use, cyanosis, exhaustion, altered mental status',
      yesNode: 'dy-emergency',
      noNode: 'dy-2',
      clinicalTip: 'Exhaustion in dyspneic patient = imminent arrest, act immediately'
    },
    {
      id: 'dy-emergency',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Respiratory failure - life-threatening',
        severity: 'emergency',
        disposition: 'immediate_referral',
        differentials: ['Severe asthma', 'Severe pneumonia', 'Tension pneumothorax', 'Massive PE', 'Severe heart failure'],
        treatmentPrinciples: [
          'Position upright if possible',
          'Bag-mask ventilation if available and trained',
          'Bronchodilator if wheezing (salbutamol nebulized)',
          'IV access',
          'IMMEDIATE TRANSFER',
          'Needle decompression if tension pneumothorax suspected (absent breath sounds, tracheal deviation)'
        ],
        redFlags: ['Impending arrest'],
        whenToRefer: ['Immediately - prepare for transfer while treating']
      }
    },
    {
      id: 'dy-2',
      question: 'Is there STRIDOR (inspiratory noise)?',
      finding: 'High-pitched inspiratory sound, suggests upper airway obstruction',
      yesNode: 'dy-stridor',
      noNode: 'dy-3',
      clinicalTip: 'Stridor in adults = serious upper airway problem until proven otherwise'
    },
    {
      id: 'dy-stridor',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Upper airway obstruction - potential emergency',
        severity: 'emergency',
        disposition: 'immediate_referral',
        differentials: ['Foreign body', 'Epiglottitis', 'Anaphylaxis', 'Angioedema', 'Tumor', 'Abscess'],
        treatmentPrinciples: [
          'Keep patient calm and in position of comfort',
          'If anaphylaxis: epinephrine 0.5mg IM',
          'Do NOT examine throat if epiglottitis suspected',
          'Prepare for emergent airway',
          'TRANSFER IMMEDIATELY'
        ],
        redFlags: ['Drooling', 'Cannot swallow', 'Sitting forward'],
        whenToRefer: ['Immediately']
      }
    },
    {
      id: 'dy-3',
      question: 'Is there WHEEZING with prolonged expiration?',
      finding: 'Expiratory wheeze, prolonged expiratory phase, suggests bronchospasm',
      yesNode: 'dy-wheeze',
      noNode: 'dy-4',
      clinicalTip: 'Silent chest in known asthmatic = severe obstruction (no air movement)'
    },
    {
      id: 'dy-wheeze',
      question: 'Is the patient able to speak and not exhausted?',
      finding: 'Can speak phrases or sentences, alert, using accessory muscles but not exhausted',
      yesNode: 'dy-asthma-moderate',
      noNode: 'dy-asthma-severe',
      clinicalTip: 'Assess severity by speech: sentences=mild, phrases=moderate, words=severe'
    },
    {
      id: 'dy-asthma-moderate',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Moderate asthma/COPD exacerbation',
        severity: 'urgent',
        disposition: 'treat_and_observe',
        differentials: ['Asthma exacerbation', 'COPD exacerbation', 'Bronchitis'],
        treatmentPrinciples: [
          'Salbutamol 4-8 puffs via spacer, or nebulized 2.5-5mg, repeat every 20 min x3',
          'Ipratropium if available (especially COPD)',
          'Prednisolone 40-60mg PO (or IV methylprednisolone)',
          'Observe 1-2 hours after treatment',
          'Discharge with steroid taper if improving'
        ],
        redFlags: ['Not improving after 3 nebulizers', 'Worsening fatigue', 'Decreasing alertness'],
        whenToRefer: ['If no improvement in 1-2 hours', 'If severe exacerbation']
      }
    },
    {
      id: 'dy-asthma-severe',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Severe asthma/COPD exacerbation',
        severity: 'emergency',
        disposition: 'immediate_referral',
        differentials: ['Severe asthma', 'Severe COPD', 'Status asthmaticus'],
        treatmentPrinciples: [
          'Continuous nebulized salbutamol',
          'IV steroids (methylprednisolone 125mg)',
          'Magnesium sulfate 2g IV over 20 min if not improving',
          'IV access',
          'Prepare for intubation',
          'TRANSFER to ICU level care'
        ],
        redFlags: ['Silent chest', 'Confusion', 'Bradycardia'],
        whenToRefer: ['Immediately with ongoing treatment']
      }
    },
    {
      id: 'dy-4',
      question: 'Are there CRACKLES on auscultation?',
      finding: 'Fine or coarse crackles, may be unilateral or bilateral',
      yesNode: 'dy-crackles',
      noNode: 'dy-5',
      clinicalTip: 'Bilateral crackles = heart failure or bilateral pneumonia; unilateral = pneumonia likely'
    },
    {
      id: 'dy-crackles',
      question: 'Is there FEVER and/or productive cough?',
      finding: 'Temperature >38°C, purulent sputum, cough',
      yesNode: 'dy-pneumonia',
      noNode: 'dy-heart-failure',
      clinicalTip: 'Heart failure: JVD, edema, orthopnea. Pneumonia: fever, purulent sputum'
    },
    {
      id: 'dy-pneumonia',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Probable community-acquired pneumonia',
        severity: 'urgent',
        disposition: 'treat_and_observe',
        differentials: ['Bacterial pneumonia', 'Viral pneumonia', 'TB (if endemic)', 'COVID-19'],
        treatmentPrinciples: [
          'Antibiotics: Amoxicillin 1g TID + Azithromycin 500mg daily, OR',
          'Amoxicillin-clavulanate 875mg BID if severe',
          'Paracetamol for fever',
          'Hydration',
          'Monitor respiratory rate and mental status'
        ],
        redFlags: ['RR >30', 'Confusion', 'Hypotension', 'Severe hypoxia'],
        whenToRefer: ['CURB-65 ≥2: Confusion, Urea >7 (if known), RR >30, BP <90, Age ≥65']
      }
    },
    {
      id: 'dy-heart-failure',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Probable acute heart failure/pulmonary edema',
        severity: 'urgent',
        disposition: 'urgent_referral',
        differentials: ['Acute heart failure', 'Flash pulmonary edema', 'COPD with right heart failure'],
        treatmentPrinciples: [
          'Sit patient upright',
          'Furosemide 40-80mg IV/PO',
          'Sublingual nitroglycerin if BP >100 systolic',
          'Restrict fluids',
          'Morphine 2-4mg IV if severe (caution)',
          'Refer for cardiac workup'
        ],
        redFlags: ['Severe hypotension', 'Cardiogenic shock', 'Not responding to diuretics'],
        whenToRefer: ['Same day for cardiac evaluation and monitoring']
      }
    },
    {
      id: 'dy-5',
      question: 'Is there sudden onset with pleuritic pain or leg swelling?',
      finding: 'Acute onset dyspnea with sharp chest pain, OR asymmetric leg swelling, OR recent immobilization',
      yesNode: 'dy-pe-possible',
      noNode: 'dy-6',
      clinicalTip: 'PE is easily missed without CT - maintain high index of suspicion'
    },
    {
      id: 'dy-pe-possible',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Possible pulmonary embolism - requires urgent evaluation',
        severity: 'urgent',
        disposition: 'urgent_referral',
        differentials: ['Pulmonary embolism', 'Pleurisy', 'Pneumothorax', 'Pericarditis'],
        treatmentPrinciples: [
          'If high suspicion and no contraindication: anticoagulation (LMWH or UFH)',
          'Supportive care',
          'URGENT transfer for CT pulmonary angiography',
          'If massive PE with shock: consider thrombolytics if available'
        ],
        redFlags: ['Shock', 'Syncope', 'Severe hypoxia'],
        whenToRefer: ['Immediately if hemodynamically unstable', 'Same day otherwise']
      }
    },
    {
      id: 'dy-6',
      question: 'Is there anxiety, hyperventilation, or clear psychosocial trigger?',
      finding: 'Rapid breathing with tingling, anxiety symptoms, stressful situation, normal exam',
      yesNode: 'dy-anxiety',
      noNode: 'dy-undifferentiated',
      clinicalTip: 'Hyperventilation syndrome is a diagnosis of exclusion - ensure no organic cause'
    },
    {
      id: 'dy-anxiety',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Probable hyperventilation/anxiety-related dyspnea',
        severity: 'non-urgent',
        disposition: 'outpatient',
        differentials: ['Panic attack', 'Hyperventilation syndrome', 'Generalized anxiety'],
        treatmentPrinciples: [
          'Calm reassurance',
          'Controlled breathing exercises',
          'Address underlying anxiety',
          'Consider short-term anxiolytic if severe'
        ],
        redFlags: ['Abnormal vital signs', 'Abnormal physical exam findings'],
        whenToRefer: ['If any organic cause suspected', 'For mental health support']
      }
    },
    {
      id: 'dy-undifferentiated',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Undifferentiated dyspnea - requires observation and possible referral',
        severity: 'urgent',
        disposition: 'treat_and_observe',
        differentials: ['Multiple possible causes'],
        treatmentPrinciples: [
          'Monitor vital signs closely',
          'Supportive care',
          'Treat empirically based on most likely cause',
          'Low threshold to refer'
        ],
        redFlags: ['Any deterioration', 'Failure to improve'],
        whenToRefer: ['If cause unclear and patient not improving']
      }
    }
  ],

  quickReference: `
╔════════════════════════════════════════════════════════════════════════════╗
║                    DYSPNEA - CLINICAL DECISION TREE                        ║
║                    (Without SpO2/CXR)                                      ║
╠════════════════════════════════════════════════════════════════════════════╣
║ ASSESS SEVERITY BY SPEECH:                                                 ║
║ • Full sentences = Mild                                                    ║
║ • Phrases = Moderate                                                       ║
║ • Words only = Severe                                                      ║
║ • Cannot speak = Respiratory failure → EMERGENCY                           ║
╠════════════════════════════════════════════════════════════════════════════╣
║ KEY AUSCULTATION FINDINGS:                                                 ║
║ • STRIDOR → Upper airway obstruction → EMERGENCY                          ║
║ • WHEEZE → Asthma/COPD → Bronchodilators + Steroids                       ║
║ • CRACKLES + Fever → Pneumonia → Antibiotics                              ║
║ • CRACKLES + JVD/Edema → Heart failure → Diuretics                        ║
║ • ABSENT breath sounds → Pneumothorax → Needle decompression?             ║
╠════════════════════════════════════════════════════════════════════════════╣
║ RESPIRATORY RATE IS YOUR BEST TOOL:                                        ║
║ • Adult: >24 = concern, >30 = severe                                      ║
║ • Child <5yr: >40 = concern, >50 = severe                                 ║
║ • Child <2mo: >60 = concern                                               ║
╚════════════════════════════════════════════════════════════════════════════╝
`
};

// ============================================================================
// FEVER ALGORITHM (Without CBC/Cultures)
// ============================================================================

export const FEVER_ALGORITHM: ClinicalAlgorithm = {
  id: 'fever-clinical',
  name: 'Fever Clinical Assessment',
  chiefComplaint: 'Fever, feeling hot, chills, rigors',
  applicableTo: 'all',

  initialAssessment: [
    'Level of consciousness/alertness',
    'Ability to drink fluids',
    'Signs of dehydration',
    'Toxic appearance (ill-looking, pale, mottled)?',
    'Rash present?',
    'Duration of fever'
  ],

  vitalSignsToCheck: [
    'Temperature (confirm fever)',
    'Heart rate',
    'Respiratory rate',
    'Blood pressure (if available)',
    'Capillary refill time'
  ],

  physicalExamFocus: [
    'HEENT: pharynx, ears, sinuses, neck stiffness',
    'Respiratory: breath sounds, respiratory effort',
    'Cardiac: heart rate, murmurs (new = endocarditis)',
    'Abdominal: tenderness, hepatomegaly, splenomegaly',
    'Skin: rash (petechial, maculopapular, vesicular), cellulitis',
    'Lymph nodes: cervical, axillary, inguinal',
    'Joints: swelling, warmth',
    'Neurological: meningismus, focal deficits'
  ],

  decisionTree: [
    {
      id: 'fe-1',
      question: 'Does the patient appear TOXIC or have signs of shock?',
      finding: 'Altered mental status, poor perfusion, mottled skin, hypotension, looks very ill',
      yesNode: 'fe-sepsis',
      noNode: 'fe-2',
      clinicalTip: 'Trust your instincts - if patient "looks sick", treat aggressively'
    },
    {
      id: 'fe-sepsis',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Probable sepsis - life-threatening infection',
        severity: 'emergency',
        disposition: 'immediate_referral',
        differentials: ['Sepsis from any source', 'Meningitis', 'Severe malaria (endemic areas)'],
        treatmentPrinciples: [
          'IV access - large bore',
          'Fluid bolus 30 mL/kg crystalloid rapidly',
          'Broad-spectrum antibiotics IMMEDIATELY (ceftriaxone 2g IV + amikacin or gentamicin)',
          'If malaria endemic: artesunate IV or artemether IM',
          'URGENT TRANSFER'
        ],
        redFlags: ['All findings are red flags in this situation'],
        whenToRefer: ['Immediately with treatment started']
      }
    },
    {
      id: 'fe-2',
      question: 'Is there NECK STIFFNESS, severe headache, or photophobia?',
      finding: 'Meningeal signs: cannot flex chin to chest, Kernig/Brudzinski positive, photophobia',
      yesNode: 'fe-meningitis',
      noNode: 'fe-3',
      clinicalTip: 'In young children: irritability, bulging fontanelle, inconsolable crying'
    },
    {
      id: 'fe-meningitis',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Suspected meningitis/encephalitis',
        severity: 'emergency',
        disposition: 'immediate_referral',
        differentials: ['Bacterial meningitis', 'Viral meningitis', 'Encephalitis', 'Cerebral malaria'],
        treatmentPrinciples: [
          'DO NOT DELAY ANTIBIOTICS for any testing',
          'Ceftriaxone 2g IV (adult) / 100mg/kg IV (child)',
          'Dexamethasone 0.15mg/kg IV if bacterial suspected (give before or with first antibiotic dose)',
          'IV fluids',
          'IMMEDIATE TRANSFER'
        ],
        redFlags: ['Seizures', 'Altered consciousness', 'Purpuric rash'],
        whenToRefer: ['Immediately - do not wait']
      }
    },
    {
      id: 'fe-3',
      question: 'Is there PETECHIAL or PURPURIC rash?',
      finding: 'Non-blanching rash (doesn\'t disappear with pressure)',
      yesNode: 'fe-meningococcemia',
      noNode: 'fe-4',
      clinicalTip: 'Non-blanching rash + fever = meningococcemia until proven otherwise'
    },
    {
      id: 'fe-meningococcemia',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Suspected meningococcemia - life-threatening',
        severity: 'emergency',
        disposition: 'immediate_referral',
        differentials: ['Meningococcemia', 'Other bacterial sepsis with DIC', 'Rocky Mountain spotted fever'],
        treatmentPrinciples: [
          'Ceftriaxone 2g IV IMMEDIATELY',
          'IV fluid resuscitation',
          'Monitor for shock',
          'IMMEDIATE TRANSFER',
          'Prophylaxis for close contacts (ciprofloxacin or rifampin)'
        ],
        redFlags: ['Rapidly spreading rash', 'Shock'],
        whenToRefer: ['Immediately']
      }
    },
    {
      id: 'fe-4',
      question: 'In MALARIA ENDEMIC area: Is malaria possible?',
      finding: 'Fever in endemic area, especially with periodicity, chills, rigors, recent travel',
      yesNode: 'fe-malaria',
      noNode: 'fe-5',
      clinicalTip: 'Any fever in malaria endemic area should be tested if possible'
    },
    {
      id: 'fe-malaria',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Suspected malaria - treat empirically in endemic areas',
        severity: 'urgent',
        disposition: 'treat_and_observe',
        differentials: ['Plasmodium falciparum', 'Other plasmodium species', 'Concurrent bacterial infection'],
        treatmentPrinciples: [
          'If RDT available: test first',
          'If no testing: treat empirically for falciparum in endemic areas',
          'Uncomplicated: ACT (artemether-lumefantrine) for 3 days',
          'Severe (cerebral, shock, renal failure): IV artesunate 2.4mg/kg at 0, 12, 24h, then daily',
          'Paracetamol for fever'
        ],
        redFlags: ['Altered consciousness', 'Severe anemia', 'Respiratory distress', 'Hypoglycemia', 'Repeated vomiting'],
        whenToRefer: ['If any sign of severe malaria', 'If not improving in 48-72h']
      }
    },
    {
      id: 'fe-5',
      question: 'Is there clear RESPIRATORY focus (cough, dyspnea, abnormal breath sounds)?',
      finding: 'Productive cough, abnormal breath sounds (crackles, bronchial breathing), tachypnea',
      yesNode: 'fe-respiratory',
      noNode: 'fe-6',
      clinicalTip: 'Most common cause of fever is respiratory infection'
    },
    {
      id: 'fe-respiratory',
      question: 'Is there evidence of PNEUMONIA (crackles, respiratory distress)?',
      finding: 'Focal crackles, bronchial breathing, increased respiratory rate/effort',
      yesNode: 'fe-pneumonia',
      noNode: 'fe-urti',
      clinicalTip: 'WHO: Fast breathing = pneumonia in children (see IMCI rates)'
    },
    {
      id: 'fe-pneumonia',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Clinical pneumonia',
        severity: 'urgent',
        disposition: 'treat_and_observe',
        differentials: ['Bacterial pneumonia', 'Viral pneumonia', 'TB'],
        treatmentPrinciples: [
          'Amoxicillin 1g TID x 5-7 days (adult) or 80-90mg/kg/day divided TID (child)',
          'Add macrolide (azithromycin) if atypical suspected',
          'Paracetamol for fever',
          'Hydration',
          'Monitor respiratory rate'
        ],
        redFlags: ['Severe respiratory distress', 'Hypoxia', 'Confusion', 'Not improving in 48-72h'],
        whenToRefer: ['Severe pneumonia', 'No improvement in 48-72h', 'TB suspected']
      }
    },
    {
      id: 'fe-urti',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Upper respiratory tract infection (viral illness)',
        severity: 'non-urgent',
        disposition: 'outpatient',
        differentials: ['Viral URI', 'Pharyngitis', 'Sinusitis', 'Otitis media'],
        treatmentPrinciples: [
          'Supportive care: rest, fluids',
          'Paracetamol or ibuprofen for fever/pain',
          'Antibiotics NOT indicated for viral URI',
          'If strep pharyngitis (exudate, tender nodes): penicillin V or amoxicillin'
        ],
        redFlags: ['Persistent fever >5 days', 'Worsening symptoms', 'Difficulty breathing'],
        whenToRefer: ['If complications develop', 'Peritonsillar abscess (trismus, deviated uvula)']
      }
    },
    {
      id: 'fe-6',
      question: 'Is there URINARY focus (dysuria, frequency, flank pain)?',
      finding: 'Painful urination, frequency, urgency, suprapubic or flank tenderness',
      yesNode: 'fe-uti',
      noNode: 'fe-7',
      clinicalTip: 'Flank pain with fever = pyelonephritis, needs aggressive treatment'
    },
    {
      id: 'fe-uti',
      question: 'Is there FLANK PAIN or systemic symptoms?',
      finding: 'Costovertebral angle tenderness, nausea, vomiting, high fever',
      yesNode: 'fe-pyelonephritis',
      noNode: 'fe-cystitis',
      clinicalTip: 'Pyelonephritis in pregnancy is a medical emergency'
    },
    {
      id: 'fe-pyelonephritis',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Acute pyelonephritis',
        severity: 'urgent',
        disposition: 'treat_and_observe',
        differentials: ['Pyelonephritis', 'Perinephric abscess', 'Renal calculus with infection'],
        treatmentPrinciples: [
          'If can tolerate PO: Ciprofloxacin 500mg BID x 7-14 days',
          'If vomiting: Ceftriaxone 1-2g IV daily',
          'Hydration',
          'Paracetamol for fever',
          'Monitor for sepsis'
        ],
        redFlags: ['Sepsis signs', 'Not improving in 48-72h', 'Pregnant'],
        whenToRefer: ['Sepsis', 'Pregnancy', 'Suspected obstruction', 'No improvement']
      }
    },
    {
      id: 'fe-cystitis',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Uncomplicated cystitis (lower UTI)',
        severity: 'non-urgent',
        disposition: 'outpatient',
        differentials: ['Bacterial cystitis', 'Urethritis', 'Vaginitis'],
        treatmentPrinciples: [
          'Nitrofurantoin 100mg BID x 5 days, OR',
          'TMP-SMX 160/800mg BID x 3 days, OR',
          'Fosfomycin 3g single dose',
          'Increased fluid intake'
        ],
        redFlags: ['Fever develops', 'Flank pain', 'Not improving'],
        whenToRefer: ['If symptoms persist', 'Recurrent UTIs', 'Male patient (atypical)']
      }
    },
    {
      id: 'fe-7',
      question: 'Is there SKIN/SOFT TISSUE focus (cellulitis, abscess, wound)?',
      finding: 'Localized redness, warmth, swelling, fluctuance, wound infection',
      yesNode: 'fe-skin',
      noNode: 'fe-8',
      clinicalTip: 'Mark borders of cellulitis to monitor for spread'
    },
    {
      id: 'fe-skin',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Skin/soft tissue infection',
        severity: 'urgent',
        disposition: 'treat_and_observe',
        differentials: ['Cellulitis', 'Abscess', 'Necrotizing fasciitis'],
        treatmentPrinciples: [
          'If abscess: incision and drainage is primary treatment',
          'Cellulitis: Amoxicillin-clavulanate 875mg BID OR Cephalexin 500mg QID',
          'Mark borders to monitor spread',
          'Elevate affected area'
        ],
        redFlags: ['Rapid spread', 'Crepitus (gas)', 'Severe pain out of proportion', 'Systemic toxicity'],
        whenToRefer: ['Suspected necrotizing fasciitis (EMERGENCY)', 'Not responding to oral antibiotics']
      }
    },
    {
      id: 'fe-8',
      question: 'Has fever persisted >7 days without clear source?',
      finding: 'Prolonged fever despite evaluation, no localizing signs',
      yesNode: 'fe-puo',
      noNode: 'fe-viral',
      clinicalTip: 'Prolonged fever needs systematic evaluation for TB, HIV, malignancy'
    },
    {
      id: 'fe-puo',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Fever of unknown origin - requires investigation',
        severity: 'urgent',
        disposition: 'urgent_referral',
        differentials: ['Tuberculosis', 'HIV', 'Endocarditis', 'Occult abscess', 'Malignancy', 'Autoimmune'],
        treatmentPrinciples: [
          'Detailed history (exposures, travel, animals, TB contacts)',
          'Complete physical exam (heart murmur, lymph nodes, spleen)',
          'Refer for investigation',
          'TB evaluation (sputum, chest X-ray if available)'
        ],
        redFlags: ['Weight loss', 'Night sweats', 'New heart murmur'],
        whenToRefer: ['For systematic investigation']
      }
    },
    {
      id: 'fe-viral',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Likely viral illness',
        severity: 'non-urgent',
        disposition: 'outpatient',
        differentials: ['Viral syndrome', 'Early bacterial infection'],
        treatmentPrinciples: [
          'Supportive care',
          'Paracetamol for fever',
          'Hydration',
          'Return if worsening or no improvement in 3-5 days'
        ],
        redFlags: ['Fever persisting >5-7 days', 'New symptoms develop', 'Clinical deterioration'],
        whenToRefer: ['If red flags develop', 'If fever persists']
      }
    }
  ],

  quickReference: `
╔════════════════════════════════════════════════════════════════════════════╗
║                      FEVER - CLINICAL DECISION TREE                        ║
║                      (Without CBC/Cultures)                                ║
╠════════════════════════════════════════════════════════════════════════════╣
║ EMERGENCY (IMMEDIATE ACTION):                                              ║
║ • Toxic/shocked appearance → IV fluids + antibiotics → TRANSFER           ║
║ • Neck stiffness → Meningitis → Ceftriaxone + Dexamethasone → TRANSFER    ║
║ • Non-blanching rash → Meningococcemia → Ceftriaxone → TRANSFER           ║
║ • Severe malaria signs → IV artesunate → TRANSFER                         ║
╠════════════════════════════════════════════════════════════════════════════╣
║ FIND THE SOURCE - SYSTEMATIC APPROACH:                                     ║
║ 1. Head/ENT: Pharyngitis, otitis, sinusitis                               ║
║ 2. Respiratory: Pneumonia, bronchitis                                      ║
║ 3. Urinary: UTI, pyelonephritis                                           ║
║ 4. Abdominal: Gastroenteritis, appendicitis, hepatitis                    ║
║ 5. Skin: Cellulitis, abscess, wound infection                             ║
║ 6. Joints: Septic arthritis                                               ║
╠════════════════════════════════════════════════════════════════════════════╣
║ IN ENDEMIC AREAS ALWAYS CONSIDER:                                          ║
║ • Malaria (any fever = test or treat empirically)                         ║
║ • Typhoid (prolonged fever, relative bradycardia, rose spots)             ║
║ • Dengue (fever, rash, body aches, thrombocytopenia risk)                 ║
║ • TB (prolonged fever, cough, weight loss, night sweats)                  ║
╚════════════════════════════════════════════════════════════════════════════╝
`
};

// ============================================================================
// ABDOMINAL PAIN ALGORITHM (Without Labs/Imaging)
// ============================================================================

export const ABDOMINAL_PAIN_ALGORITHM: ClinicalAlgorithm = {
  id: 'abdominal-pain-clinical',
  name: 'Abdominal Pain Clinical Assessment',
  chiefComplaint: 'Abdominal pain, stomach ache, belly pain',
  applicableTo: 'all',

  initialAssessment: [
    'Level of distress',
    'Position of comfort (still vs writhing)',
    'Ability to walk',
    'Presence of vomiting, diarrhea',
    'Last bowel movement'
  ],

  vitalSignsToCheck: [
    'Heart rate (tachycardia = concerning)',
    'Blood pressure',
    'Temperature',
    'Respiratory rate'
  ],

  physicalExamFocus: [
    'Inspection: distension, visible peristalsis, scars, hernias',
    'Auscultation: bowel sounds (absent, hyperactive, normal)',
    'Palpation: tenderness location, guarding, rigidity, rebound, masses',
    'Percussion: tympany (gas) vs dullness (fluid/mass)',
    'Special: Murphy sign, McBurney point, Rovsing sign, psoas sign',
    'Rectal exam if indicated (blood, tenderness)',
    'Pelvic exam in women if indicated'
  ],

  decisionTree: [
    {
      id: 'ab-1',
      question: 'Is there PERITONITIS (rigid abdomen, board-like)?',
      finding: 'Diffuse rigidity, involuntary guarding, rebound tenderness, motionless patient',
      yesNode: 'ab-peritonitis',
      noNode: 'ab-2',
      clinicalTip: 'Peritonitis = surgical emergency. Patient lies still because movement hurts.'
    },
    {
      id: 'ab-peritonitis',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Peritonitis - surgical emergency',
        severity: 'emergency',
        disposition: 'immediate_referral',
        differentials: ['Perforated viscus', 'Ruptured appendix', 'Perforated ulcer', 'Bowel ischemia'],
        treatmentPrinciples: [
          'NPO (nothing by mouth)',
          'IV fluids - aggressive resuscitation',
          'Broad-spectrum antibiotics (ceftriaxone + metronidazole)',
          'NG tube if distended',
          'Pain control (morphine)',
          'IMMEDIATE SURGICAL REFERRAL'
        ],
        redFlags: ['All findings indicate emergency'],
        whenToRefer: ['Immediately for surgery']
      }
    },
    {
      id: 'ab-2',
      question: 'Is there complete BOWEL OBSTRUCTION (no flatus, no stool, distension)?',
      finding: 'Vomiting (may be feculent), no passing gas or stool, abdominal distension, high-pitched bowel sounds → absent',
      yesNode: 'ab-obstruction',
      noNode: 'ab-3',
      clinicalTip: 'Obstipation (no gas or stool) is the hallmark of complete obstruction'
    },
    {
      id: 'ab-obstruction',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Probable bowel obstruction',
        severity: 'emergency',
        disposition: 'immediate_referral',
        differentials: ['Small bowel obstruction (adhesions, hernia)', 'Large bowel obstruction (cancer, volvulus)'],
        treatmentPrinciples: [
          'NPO',
          'NG tube for decompression',
          'IV fluids',
          'Foley catheter to monitor output',
          'Surgical consultation',
          'TRANSFER'
        ],
        redFlags: ['Fever (suggests strangulation)', 'Peritoneal signs', 'Hemodynamic instability'],
        whenToRefer: ['Immediately for surgical evaluation']
      }
    },
    {
      id: 'ab-3',
      question: 'Is there RLQ pain with classical appendicitis features?',
      finding: 'Pain migrating from periumbilical to RLQ, McBurney point tenderness, Rovsing sign, fever',
      yesNode: 'ab-appendicitis',
      noNode: 'ab-4',
      clinicalTip: 'Classic presentation in <50% of cases. Atypical in young, old, pregnant, retrocecal'
    },
    {
      id: 'ab-appendicitis',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Probable appendicitis',
        severity: 'urgent',
        disposition: 'urgent_referral',
        differentials: ['Appendicitis', 'Mesenteric adenitis', 'Ovarian pathology (women)', 'Ileitis'],
        treatmentPrinciples: [
          'NPO',
          'IV fluids',
          'IV antibiotics (ceftriaxone + metronidazole) if perforation suspected',
          'Pain control',
          'Surgical consultation for appendectomy'
        ],
        redFlags: ['Diffuse peritonitis', 'Fever >38.5°C', 'Mass (abscess)'],
        whenToRefer: ['Same day for surgical evaluation']
      }
    },
    {
      id: 'ab-4',
      question: 'In WOMEN of reproductive age: Could this be gynecological?',
      finding: 'Lower abdominal pain, vaginal discharge/bleeding, missed period, sexually active',
      yesNode: 'ab-gyn',
      noNode: 'ab-5',
      clinicalTip: 'Always consider ectopic pregnancy - can be life-threatening'
    },
    {
      id: 'ab-gyn',
      question: 'Is there hemodynamic instability or severe pain?',
      finding: 'Hypotension, tachycardia, severe unilateral pain, syncope, positive pregnancy',
      yesNode: 'ab-ectopic',
      noNode: 'ab-gyn-stable',
      clinicalTip: 'Ruptured ectopic = surgical emergency'
    },
    {
      id: 'ab-ectopic',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Possible ruptured ectopic pregnancy - surgical emergency',
        severity: 'emergency',
        disposition: 'immediate_referral',
        differentials: ['Ruptured ectopic', 'Ruptured ovarian cyst', 'Ovarian torsion'],
        treatmentPrinciples: [
          'Large bore IV access',
          'Aggressive fluid resuscitation',
          'Type and crossmatch if possible',
          'IMMEDIATE SURGICAL REFERRAL',
          'Do NOT delay for pregnancy test if highly suspicious'
        ],
        redFlags: ['Shock', 'Cullen sign (periumbilical bruising)'],
        whenToRefer: ['Immediately']
      }
    },
    {
      id: 'ab-gyn-stable',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Gynecological cause requiring evaluation',
        severity: 'urgent',
        disposition: 'urgent_referral',
        differentials: ['Ovarian cyst', 'PID', 'Ectopic pregnancy', 'Ovarian torsion', 'Endometriosis'],
        treatmentPrinciples: [
          'Pregnancy test if available',
          'If PID suspected: Ceftriaxone 250mg IM + Doxycycline 100mg BID x 14 days',
          'Pain control',
          'Pelvic exam if trained and indicated'
        ],
        redFlags: ['Severe unilateral pain (torsion)', 'Hemodynamic changes', 'Fever with PID'],
        whenToRefer: ['Same day for ultrasound and definitive diagnosis']
      }
    },
    {
      id: 'ab-5',
      question: 'Is there EPIGASTRIC pain with burning/dyspepsia?',
      finding: 'Burning epigastric pain, worse or better with food, antacid response',
      yesNode: 'ab-peptic',
      noNode: 'ab-6',
      clinicalTip: 'Red flags for GI bleed: melena, hematemesis, syncope'
    },
    {
      id: 'ab-peptic',
      question: 'Are there signs of GI BLEEDING or perforation?',
      finding: 'Melena, hematemesis, peritoneal signs, hypotension',
      yesNode: 'ab-gi-bleed',
      noNode: 'ab-peptic-stable',
      clinicalTip: 'Perforated ulcer presents with sudden severe pain and peritonitis'
    },
    {
      id: 'ab-gi-bleed',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Upper GI bleeding or perforated peptic ulcer',
        severity: 'emergency',
        disposition: 'immediate_referral',
        differentials: ['Peptic ulcer with bleeding', 'Perforated ulcer', 'Variceal bleeding', 'Mallory-Weiss'],
        treatmentPrinciples: [
          'Two large-bore IVs',
          'Aggressive fluid resuscitation',
          'PPI IV if available (omeprazole 80mg bolus)',
          'NPO',
          'NG tube if indicated',
          'TRANSFER for endoscopy/surgery'
        ],
        redFlags: ['Active bleeding', 'Shock', 'Peritonitis'],
        whenToRefer: ['Immediately']
      }
    },
    {
      id: 'ab-peptic-stable',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Probable peptic ulcer disease or gastritis',
        severity: 'non-urgent',
        disposition: 'treat_and_observe',
        differentials: ['Peptic ulcer', 'Gastritis', 'GERD', 'Functional dyspepsia'],
        treatmentPrinciples: [
          'PPI (omeprazole 20-40mg daily) for 4-8 weeks',
          'H. pylori eradication if endemic (PPI + amoxicillin + clarithromycin)',
          'Avoid NSAIDs, alcohol, smoking',
          'Small frequent meals'
        ],
        redFlags: ['GI bleeding', 'Weight loss', 'Dysphagia', 'Age >55 with new symptoms'],
        whenToRefer: ['If red flags present', 'No response to treatment', 'Age >55 for endoscopy']
      }
    },
    {
      id: 'ab-6',
      question: 'Is there RUQ pain with Murphy sign?',
      finding: 'RUQ tenderness, positive Murphy sign (inspiratory arrest with RUQ palpation), fever',
      yesNode: 'ab-biliary',
      noNode: 'ab-7',
      clinicalTip: 'Murphy sign has high specificity for acute cholecystitis'
    },
    {
      id: 'ab-biliary',
      question: 'Is there fever or signs of sepsis?',
      finding: 'Fever, rigors, jaundice (Charcot triad = cholangitis)',
      yesNode: 'ab-cholangitis',
      noNode: 'ab-cholecystitis',
      clinicalTip: 'Charcot triad (RUQ pain, fever, jaundice) = ascending cholangitis = emergency'
    },
    {
      id: 'ab-cholangitis',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Probable cholangitis - biliary sepsis',
        severity: 'emergency',
        disposition: 'immediate_referral',
        differentials: ['Ascending cholangitis', 'Gallstone pancreatitis', 'Septic cholecystitis'],
        treatmentPrinciples: [
          'IV fluids',
          'Broad-spectrum antibiotics (ceftriaxone + metronidazole or piperacillin-tazobactam)',
          'NPO',
          'URGENT ERCP needed',
          'TRANSFER'
        ],
        redFlags: ['Septic shock', 'Altered mental status (Reynolds pentad)'],
        whenToRefer: ['Immediately']
      }
    },
    {
      id: 'ab-cholecystitis',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Probable acute cholecystitis',
        severity: 'urgent',
        disposition: 'urgent_referral',
        differentials: ['Acute cholecystitis', 'Biliary colic', 'Hepatitis'],
        treatmentPrinciples: [
          'NPO',
          'IV fluids',
          'Pain control',
          'Antibiotics if infection suspected (ceftriaxone + metronidazole)',
          'Surgical consultation for cholecystectomy'
        ],
        redFlags: ['Fever worsening', 'Peritonitis develops', 'Jaundice'],
        whenToRefer: ['Same day for imaging and surgical evaluation']
      }
    },
    {
      id: 'ab-7',
      question: 'Is there COLICKY pain with diarrhea?',
      finding: 'Crampy, intermittent pain, watery diarrhea, with or without vomiting',
      yesNode: 'ab-gastroenteritis',
      noNode: 'ab-8',
      clinicalTip: 'Assess for dehydration - most important complication of gastroenteritis'
    },
    {
      id: 'ab-gastroenteritis',
      question: 'Is there significant DEHYDRATION?',
      finding: 'Dry mucous membranes, decreased skin turgor, sunken eyes, tachycardia, reduced urine',
      yesNode: 'ab-ge-severe',
      noNode: 'ab-ge-mild',
      clinicalTip: 'Children and elderly are at highest risk for dehydration'
    },
    {
      id: 'ab-ge-severe',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Gastroenteritis with significant dehydration',
        severity: 'urgent',
        disposition: 'treat_and_observe',
        differentials: ['Viral gastroenteritis', 'Bacterial gastroenteritis', 'Food poisoning'],
        treatmentPrinciples: [
          'Oral rehydration (ORS) if tolerating',
          'IV fluids if unable to tolerate oral or severely dehydrated',
          'Antibiotics only if: bloody diarrhea, high fever, immunocompromised, severe',
          'If antibiotics needed: ciprofloxacin 500mg BID or azithromycin 500mg daily x 3 days',
          'Antiemetics (ondansetron)'
        ],
        redFlags: ['Bloody diarrhea', 'High fever', 'Severe abdominal pain', 'No improvement in 48h'],
        whenToRefer: ['If severe dehydration not responding', 'Suspected surgical cause']
      }
    },
    {
      id: 'ab-ge-mild',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Acute gastroenteritis - mild',
        severity: 'non-urgent',
        disposition: 'outpatient',
        differentials: ['Viral gastroenteritis', 'Food poisoning'],
        treatmentPrinciples: [
          'Oral rehydration (ORS, clear fluids)',
          'BRAT diet as tolerated',
          'No routine antibiotics',
          'Antiemetics if needed'
        ],
        redFlags: ['Bloody diarrhea', 'High fever', 'Severe dehydration', 'Elderly/immunocompromised'],
        whenToRefer: ['If red flags develop', 'If symptoms persist >5-7 days']
      }
    },
    {
      id: 'ab-8',
      question: '',
      finding: '',
      outcome: {
        diagnosis: 'Undifferentiated abdominal pain - requires observation',
        severity: 'urgent',
        disposition: 'treat_and_observe',
        differentials: ['Multiple possible causes'],
        treatmentPrinciples: [
          'Serial abdominal exams (every 2-4 hours)',
          'Pain management (but exam first)',
          'Keep NPO until diagnosis clearer',
          'IV fluids',
          'Low threshold to refer'
        ],
        redFlags: ['Peritoneal signs develop', 'Hemodynamic instability', 'Worsening pain'],
        whenToRefer: ['If diagnosis unclear and not improving', 'If any red flags']
      }
    }
  ],

  quickReference: `
╔════════════════════════════════════════════════════════════════════════════╗
║                  ABDOMINAL PAIN - CLINICAL DECISION TREE                   ║
║                  (Without Labs/Imaging)                                    ║
╠════════════════════════════════════════════════════════════════════════════╣
║ SURGICAL EMERGENCIES (Transfer immediately):                               ║
║ • PERITONITIS: Rigid, board-like abdomen, rebound                         ║
║ • OBSTRUCTION: No flatus/stool, distension, vomiting                      ║
║ • RUPTURED ECTOPIC: Severe pain, shock, +/- pregnancy                     ║
║ • GI BLEED: Melena, hematemesis, shock                                    ║
║ • CHOLANGITIS: RUQ pain + fever + jaundice                                ║
╠════════════════════════════════════════════════════════════════════════════╣
║ LOCALIZATION GUIDE:                                                        ║
║ • RUQ: Biliary (cholecystitis), hepatitis, pneumonia (referred)           ║
║ • LUQ: Splenic, pancreatitis, gastric                                     ║
║ • RLQ: Appendicitis, ovarian, ileitis                                     ║
║ • LLQ: Diverticulitis, ovarian, constipation                              ║
║ • Epigastric: Peptic ulcer, pancreatitis, GERD, MI                        ║
║ • Periumbilical: Early appendicitis, small bowel, aortic aneurysm         ║
║ • Suprapubic: UTI, gynecological, bladder                                 ║
╠════════════════════════════════════════════════════════════════════════════╣
║ KEY PHYSICAL EXAM FINDINGS:                                                ║
║ • Murphy sign: RUQ pain with inspiration → Cholecystitis                  ║
║ • McBurney point: RLQ 1/3 distance ASIS to umbilicus → Appendicitis       ║
║ • Rovsing sign: RLQ pain with LLQ pressure → Appendicitis                 ║
║ • Psoas sign: RLQ pain with hip extension → Retrocecal appendicitis       ║
║ • Rebound: Pain worse when releasing pressure → Peritoneal irritation     ║
║ • Guarding: Voluntary (soft) vs Involuntary (rigid) = surgical            ║
╚════════════════════════════════════════════════════════════════════════════╝
`
};

// ============================================================================
// EXPORTS & UTILITIES
// ============================================================================

export const ALL_POC_ALGORITHMS: ClinicalAlgorithm[] = [
  CHEST_PAIN_ALGORITHM,
  DYSPNEA_ALGORITHM,
  FEVER_ALGORITHM,
  ABDOMINAL_PAIN_ALGORITHM
];

export function getAlgorithmById(id: string): ClinicalAlgorithm | undefined {
  return ALL_POC_ALGORITHMS.find(alg => alg.id === id);
}

export function getDecisionNode(algorithm: ClinicalAlgorithm, nodeId: string): DecisionNode | undefined {
  return algorithm.decisionTree.find(node => node.id === nodeId);
}

export function navigateTree(
  algorithm: ClinicalAlgorithm,
  nodeId: string,
  answer: 'yes' | 'no'
): DecisionNode | undefined {
  const currentNode = getDecisionNode(algorithm, nodeId);
  if (!currentNode) return undefined;

  const nextNodeId = answer === 'yes' ? currentNode.yesNode : currentNode.noNode;
  if (!nextNodeId) return undefined;

  return getDecisionNode(algorithm, nextNodeId);
}

// Quick reference card combining all algorithms
export const POC_ALGORITHMS_QUICK_REFERENCE = `
╔════════════════════════════════════════════════════════════════════════════╗
║           POINT-OF-CARE CLINICAL DECISION SUPPORT                          ║
║           For Resource-Limited Settings (No Labs/Imaging)                  ║
╠════════════════════════════════════════════════════════════════════════════╣
║ GENERAL PRINCIPLES:                                                        ║
║ 1. Trust your clinical gestalt - if patient "looks sick," act accordingly ║
║ 2. Vital signs are your most valuable diagnostic tool                     ║
║ 3. Serial exams are more valuable than single snapshots                   ║
║ 4. When in doubt, treat and refer                                         ║
║ 5. Document your findings and reasoning                                   ║
╠════════════════════════════════════════════════════════════════════════════╣
║ UNIVERSAL DANGER SIGNS (Any chief complaint):                              ║
║ • Altered mental status                                                   ║
║ • Hypotension (SBP <90) or shock signs                                    ║
║ • Severe respiratory distress                                             ║
║ • Inability to drink/eat                                                  ║
║ • Persistent vomiting                                                     ║
║ • Severe pain not responding to analgesia                                 ║
╠════════════════════════════════════════════════════════════════════════════╣
║ AVAILABLE ALGORITHMS:                                                      ║
║ • Chest Pain - Without ECG/Troponin                                       ║
║ • Dyspnea - Without SpO2/CXR                                              ║
║ • Fever - Without CBC/Cultures                                            ║
║ • Abdominal Pain - Without Labs/Imaging                                   ║
╚════════════════════════════════════════════════════════════════════════════╝
`;
