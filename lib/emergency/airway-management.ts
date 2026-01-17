/**
 * Airway Management Protocols
 * From basic to advanced airway techniques for emergency settings
 *
 * Darwin-MFC Emergency System
 * For healthcare workers in resource-limited settings
 */

// ============================================================================
// TYPES
// ============================================================================

export interface AirwayProtocol {
  id: string;
  name: string;
  level: 'basic' | 'intermediate' | 'advanced';
  indications: string[];
  contraindications: string[];
  equipment: EquipmentItem[];
  steps: ProcedureStep[];
  troubleshooting: TroubleshootingItem[];
  complications: string[];
  postProcedure: string[];
}

export interface EquipmentItem {
  item: string;
  size?: string;
  alternatives?: string[];
  required: boolean;
}

export interface ProcedureStep {
  number: number;
  action: string;
  details: string;
  tips?: string;
  warnings?: string[];
}

export interface TroubleshootingItem {
  problem: string;
  causes: string[];
  solutions: string[];
}

export interface AirwayAssessment {
  difficulty: 'easy' | 'moderate' | 'difficult' | 'impossible';
  factors: DifficultyFactor[];
  plan: string[];
  backup: string[];
}

export interface DifficultyFactor {
  factor: string;
  finding: string;
  impact: string;
}

// ============================================================================
// DIFFICULT AIRWAY PREDICTION
// ============================================================================

export const LEMON_ASSESSMENT = {
  name: 'LEMON Difficult Airway Assessment',
  factors: [
    {
      letter: 'L',
      factor: 'Look Externally',
      assess: [
        'Facial trauma/blood',
        'Large incisors',
        'Beard or mustache',
        'Large tongue'
      ],
      abnormal: 'Any significant facial abnormality'
    },
    {
      letter: 'E',
      factor: 'Evaluate 3-3-2',
      assess: [
        '3 fingers between incisors (mouth opening)',
        '3 fingers from chin to hyoid',
        '2 fingers from hyoid to thyroid notch'
      ],
      abnormal: '<3 finger mouth opening, <3 finger thyromental, <2 finger hyothyroid'
    },
    {
      letter: 'M',
      factor: 'Mallampati Score',
      assess: [
        'Class I: Soft palate, uvula, fauces, pillars visible',
        'Class II: Soft palate, uvula, fauces visible',
        'Class III: Soft palate, base of uvula visible',
        'Class IV: Hard palate only visible'
      ],
      abnormal: 'Mallampati III or IV'
    },
    {
      letter: 'O',
      factor: 'Obstruction',
      assess: [
        'Stridor',
        'Foreign body',
        'Tumor',
        'Epiglottitis',
        'Peritonsillar abscess',
        'Angioedema'
      ],
      abnormal: 'Any upper airway obstruction'
    },
    {
      letter: 'N',
      factor: 'Neck Mobility',
      assess: [
        'Cervical spine immobilization',
        'Arthritis',
        'Previous neck surgery/radiation',
        'Obesity'
      ],
      abnormal: 'Limited neck extension (<35 degrees)'
    }
  ],
  interpretation: 'Any positive finding increases difficulty. Multiple findings = very difficult/failed airway risk.'
};

export const MOANS_ASSESSMENT = {
  name: 'MOANS - Difficult Bag-Mask Ventilation',
  factors: [
    { letter: 'M', factor: 'Mask seal', finding: 'Beard, facial trauma, edentulous' },
    { letter: 'O', factor: 'Obstruction/Obesity', finding: 'Obesity, OSA, upper airway obstruction' },
    { letter: 'A', factor: 'Age', finding: '>55 years (decreased tissue elasticity)' },
    { letter: 'N', factor: 'No teeth', finding: 'Edentulous (mask seal difficult)' },
    { letter: 'S', factor: 'Stiff lungs/spine', finding: 'COPD, asthma, fibrosis, C-spine immobilization' }
  ]
};

export const RODS_ASSESSMENT = {
  name: 'RODS - Difficult Supraglottic Device',
  factors: [
    { letter: 'R', factor: 'Restricted mouth opening', finding: '<2.5cm opening' },
    { letter: 'O', factor: 'Obstruction', finding: 'Laryngeal pathology, peritonsillar abscess' },
    { letter: 'D', factor: 'Distorted anatomy', finding: 'Tumor, radiation changes, abscess' },
    { letter: 'S', factor: 'Stiff lungs', finding: 'High airway pressures required' }
  ]
};

export const SHORT_ASSESSMENT = {
  name: 'SHORT - Difficult Cricothyrotomy',
  factors: [
    { letter: 'S', factor: 'Surgery/scarring', finding: 'Previous neck surgery, radiation' },
    { letter: 'H', factor: 'Hematoma', finding: 'Neck hematoma, coagulopathy' },
    { letter: 'O', factor: 'Obesity', finding: 'Obscured landmarks' },
    { letter: 'R', factor: 'Radiation', finding: 'Tissue changes, difficult anatomy' },
    { letter: 'T', factor: 'Tumor', finding: 'Distorted anatomy, tracheal deviation' }
  ]
};

// ============================================================================
// BASIC AIRWAY MANEUVERS
// ============================================================================

export const HEAD_TILT_CHIN_LIFT: AirwayProtocol = {
  id: 'head-tilt-chin-lift',
  name: 'Head Tilt - Chin Lift',
  level: 'basic',

  indications: [
    'Unconscious patient',
    'Snoring/obstructed airway sounds',
    'No suspected cervical spine injury'
  ],

  contraindications: [
    'Suspected cervical spine injury (use jaw thrust instead)',
    'Facial trauma preventing maneuver'
  ],

  equipment: [
    { item: 'None required', required: false }
  ],

  steps: [
    {
      number: 1,
      action: 'Position yourself',
      details: 'Stand or kneel at the side of the patient\'s head',
      tips: 'Ensure patient is supine on a firm surface'
    },
    {
      number: 2,
      action: 'Place hand on forehead',
      details: 'Put the palm of one hand on the patient\'s forehead',
      tips: 'Apply firm, gentle pressure'
    },
    {
      number: 3,
      action: 'Tilt head back',
      details: 'Apply backward pressure with palm to tilt head back',
      tips: 'Extend the neck to open airway'
    },
    {
      number: 4,
      action: 'Lift chin',
      details: 'Place fingertips under bony part of chin and lift upward',
      warnings: ['Do not press on soft tissue under chin (compresses airway)']
    },
    {
      number: 5,
      action: 'Maintain position',
      details: 'Hold position while assessing breathing',
      tips: 'Look, listen, feel for breathing'
    }
  ],

  troubleshooting: [
    {
      problem: 'Still obstructed after maneuver',
      causes: ['Tongue still blocking', 'Foreign body', 'Tissue swelling'],
      solutions: ['Check for visible obstruction', 'Suction if available', 'Try jaw thrust', 'Consider OPA/NPA']
    }
  ],

  complications: [
    'Cervical spine injury if trauma not recognized',
    'Inadequate airway opening'
  ],

  postProcedure: [
    'Maintain position until definitive airway established',
    'Reassess frequently',
    'Prepare for escalation if needed'
  ]
};

export const JAW_THRUST: AirwayProtocol = {
  id: 'jaw-thrust',
  name: 'Jaw Thrust Maneuver',
  level: 'basic',

  indications: [
    'Unconscious patient with suspected cervical spine injury',
    'Trauma patient requiring airway opening',
    'Head tilt-chin lift ineffective'
  ],

  contraindications: [
    'None (this is the safest maneuver for trauma)'
  ],

  equipment: [
    { item: 'None required', required: false }
  ],

  steps: [
    {
      number: 1,
      action: 'Position yourself',
      details: 'Stand or kneel at the head of the bed, facing patient\'s feet',
      tips: 'Ensure cervical spine is maintained in neutral alignment'
    },
    {
      number: 2,
      action: 'Place hands on jaw',
      details: 'Place fingers behind the angle of the mandible (jaw) on both sides',
      tips: 'Index and middle fingers work best'
    },
    {
      number: 3,
      action: 'Thrust jaw forward',
      details: 'Lift the mandible upward and forward (anteriorly)',
      tips: 'This moves the tongue away from the posterior pharynx'
    },
    {
      number: 4,
      action: 'Use thumbs for mouth',
      details: 'Use thumbs to open the mouth slightly by pulling down on chin',
      warnings: ['Keep thumbs off the teeth to avoid injury']
    },
    {
      number: 5,
      action: 'Maintain position',
      details: 'Hold while assessing breathing and preparing next steps',
      tips: 'This is a temporary measure - plan for definitive airway'
    }
  ],

  troubleshooting: [
    {
      problem: 'Cannot generate enough lift',
      causes: ['Improper hand positioning', 'Weak grip', 'Trismus'],
      solutions: ['Reposition fingers deeper behind mandible', 'Use forearm strength', 'Consider NPA']
    }
  ],

  complications: [
    'Inadequate airway opening',
    'Fatigue in rescuer (difficult to maintain)',
    'Cervical movement if technique poor'
  ],

  postProcedure: [
    'Maintain in-line cervical stabilization',
    'Apply cervical collar if not already done',
    'Prepare for definitive airway'
  ]
};

// ============================================================================
// AIRWAY ADJUNCTS
// ============================================================================

export const OROPHARYNGEAL_AIRWAY: AirwayProtocol = {
  id: 'opa',
  name: 'Oropharyngeal Airway (OPA)',
  level: 'basic',

  indications: [
    'Unconscious patient without gag reflex',
    'Adjunct to bag-mask ventilation',
    'Maintaining airway in deeply unconscious patient'
  ],

  contraindications: [
    'Intact gag reflex (will cause vomiting)',
    'Significant oral/facial trauma',
    'Cannot open mouth'
  ],

  equipment: [
    { item: 'OPA of correct size', size: 'Corner of mouth to angle of jaw', required: true },
    { item: 'Suction', required: false, alternatives: ['Finger sweep if visible obstruction'] },
    { item: 'Tongue depressor', required: false }
  ],

  steps: [
    {
      number: 1,
      action: 'Select correct size',
      details: 'Measure from corner of mouth to angle of mandible (or earlobe)',
      tips: 'Too small = ineffective, Too large = pushes tongue back',
      warnings: ['Wrong size is worse than no OPA']
    },
    {
      number: 2,
      action: 'Open mouth',
      details: 'Use cross-finger technique or tongue depressor',
      tips: 'Scissor technique: thumb on lower teeth, index on upper teeth'
    },
    {
      number: 3,
      action: 'Insert OPA',
      details: 'Insert with tip pointing toward hard palate (upside down)',
      tips: 'Adult technique: insert upside down, rotate 180° as it passes soft palate'
    },
    {
      number: 4,
      action: 'Rotate into position',
      details: 'Rotate 180° so the curve follows tongue contour',
      tips: 'Pediatric: insert right-side up using tongue depressor to avoid palate injury'
    },
    {
      number: 5,
      action: 'Verify position',
      details: 'Flange should rest on lips, tip should be in posterior pharynx',
      warnings: ['If gagging occurs, remove immediately']
    }
  ],

  troubleshooting: [
    {
      problem: 'Patient gags/vomits',
      causes: ['Gag reflex present', 'Wrong size', 'Improper insertion'],
      solutions: ['Remove immediately', 'Suction', 'Consider NPA instead']
    },
    {
      problem: 'Airway still obstructed',
      causes: ['Wrong size', 'Tongue pushed back', 'Additional obstruction'],
      solutions: ['Try different size', 'Reposition', 'Suction', 'Escalate to advanced airway']
    }
  ],

  complications: [
    'Vomiting and aspiration',
    'Dental trauma',
    'Airway obstruction if wrong size',
    'Soft tissue injury'
  ],

  postProcedure: [
    'Maintain head positioning',
    'Monitor for return of gag reflex',
    'Prepare for definitive airway if needed',
    'Suction as needed'
  ]
};

export const NASOPHARYNGEAL_AIRWAY: AirwayProtocol = {
  id: 'npa',
  name: 'Nasopharyngeal Airway (NPA)',
  level: 'basic',

  indications: [
    'Semiconscious patient with intact gag reflex',
    'Trismus (cannot open mouth)',
    'When OPA is not tolerated',
    'Seizure patient'
  ],

  contraindications: [
    'Severe facial trauma (relative)',
    'Basilar skull fracture (relative - CSF leak, raccoon eyes, Battle sign)',
    'Coagulopathy (relative)',
    'Nasal obstruction'
  ],

  equipment: [
    { item: 'NPA of correct size', size: 'Tip of nose to tragus of ear', required: true },
    { item: 'Water-soluble lubricant', required: true, alternatives: ['Saline if no lubricant'] },
    { item: 'Suction', required: false }
  ],

  steps: [
    {
      number: 1,
      action: 'Select correct size',
      details: 'Measure from tip of nose to tragus of ear. Use largest that fits.',
      tips: 'Diameter should approximate patient\'s little finger'
    },
    {
      number: 2,
      action: 'Lubricate generously',
      details: 'Apply water-soluble lubricant to entire length',
      tips: 'Lidocaine jelly provides anesthesia and lubrication'
    },
    {
      number: 3,
      action: 'Choose nostril',
      details: 'Use right nostril first (bevel faces septum)',
      tips: 'Right nostril preferred due to bevel orientation'
    },
    {
      number: 4,
      action: 'Insert gently',
      details: 'Insert along floor of nose, perpendicular to face (not upward)',
      tips: 'Direct posteriorly (toward occiput), not superiorly',
      warnings: ['STOP if significant resistance - try other nostril']
    },
    {
      number: 5,
      action: 'Advance to flange',
      details: 'Continue until flange rests against nostril',
      tips: 'Should pass easily with gentle pressure'
    }
  ],

  troubleshooting: [
    {
      problem: 'Resistance encountered',
      causes: ['Deviated septum', 'Nasal obstruction', 'Wrong angle'],
      solutions: ['Try other nostril', 'Try smaller size', 'Ensure correct angle (along floor)']
    },
    {
      problem: 'Bleeding',
      causes: ['Trauma to mucosa', 'Coagulopathy', 'Forceful insertion'],
      solutions: ['Apply pressure', 'Consider removing', 'Suction blood', 'May need to accept and monitor']
    }
  ],

  complications: [
    'Epistaxis',
    'Intracranial placement (basilar skull fracture)',
    'Vomiting',
    'Laryngospasm'
  ],

  postProcedure: [
    'Verify improved air movement',
    'Monitor for bleeding',
    'May use bilaterally if needed',
    'Secure with tape if prolonged use'
  ]
};

// ============================================================================
// BAG-MASK VENTILATION
// ============================================================================

export const BAG_MASK_VENTILATION: AirwayProtocol = {
  id: 'bvm',
  name: 'Bag-Mask Ventilation (BVM)',
  level: 'intermediate',

  indications: [
    'Apnea',
    'Inadequate spontaneous ventilation',
    'Pre-oxygenation before intubation',
    'Bridge while preparing definitive airway'
  ],

  contraindications: [
    'None absolute (life-saving procedure)',
    'Relative: Complete upper airway obstruction'
  ],

  equipment: [
    { item: 'Self-inflating bag (adult 1500ml, peds 450-750ml)', required: true },
    { item: 'Face mask (proper size)', size: 'Covers nose and mouth, seals on face', required: true },
    { item: 'Oxygen source and tubing', required: true, alternatives: ['Room air if no O2'] },
    { item: 'Reservoir bag', required: false },
    { item: 'PEEP valve', required: false },
    { item: 'OPA/NPA', required: false }
  ],

  steps: [
    {
      number: 1,
      action: 'Position patient',
      details: 'Sniffing position (ear aligned with sternal notch)',
      tips: 'Towel under occiput for adults, under shoulders for infants'
    },
    {
      number: 2,
      action: 'Select and apply mask',
      details: 'Choose size that covers nose to chin, apex on bridge of nose',
      tips: 'Mask should create seal without pressing on eyes'
    },
    {
      number: 3,
      action: 'Create seal with C-E grip',
      details: 'C = thumb and index finger on mask, E = fingers 3-5 under mandible',
      tips: 'Lift mandible into mask, don\'t push mask into face',
      warnings: ['Avoid pressure on soft tissue under chin']
    },
    {
      number: 4,
      action: 'Connect oxygen',
      details: 'Attach O2 at 15 L/min with reservoir (delivers >90% FiO2)',
      tips: 'Without reservoir: ~40-60% FiO2'
    },
    {
      number: 5,
      action: 'Ventilate',
      details: 'Squeeze bag over 1 second, deliver enough to see chest rise',
      tips: 'Adult: ~500-600ml, Child: until chest rises',
      warnings: ['Avoid excessive tidal volumes (gastric insufflation)']
    },
    {
      number: 6,
      action: 'Maintain rate',
      details: 'Adult: 10-12 breaths/min, Child: 12-20/min, Infant: 20/min',
      warnings: ['Avoid hyperventilation - causes hypotension, increased ICP']
    }
  ],

  troubleshooting: [
    {
      problem: 'Air leak around mask',
      causes: ['Wrong size mask', 'Poor technique', 'Facial hair', 'No teeth'],
      solutions: ['Try different mask size', 'Two-person technique', 'Pack gauze in cheeks', 'Leave dentures in']
    },
    {
      problem: 'Difficult to ventilate',
      causes: ['Obstruction', 'Poor positioning', 'High airway resistance'],
      solutions: ['Reposition head', 'Add OPA/NPA', 'Two-person technique', 'Consider supraglottic airway']
    },
    {
      problem: 'Gastric distension',
      causes: ['Excessive tidal volume', 'High airway pressure', 'Rapid insufflation'],
      solutions: ['Reduce tidal volume', 'Slower squeeze', 'Apply cricoid pressure', 'Consider NG tube']
    }
  ],

  complications: [
    'Gastric insufflation and aspiration',
    'Hypo/hyperventilation',
    'Barotrauma',
    'Air in eyes (mask positioned too high)',
    'Fatigue in rescuer'
  ],

  postProcedure: [
    'Monitor SpO2 and ETCO2 if available',
    'Prepare for definitive airway',
    'Decompress stomach with NG tube if distended',
    'Document estimated tidal volumes and rate'
  ]
};

// ============================================================================
// SUPRAGLOTTIC AIRWAYS
// ============================================================================

export const LMA_INSERTION: AirwayProtocol = {
  id: 'lma',
  name: 'Laryngeal Mask Airway (LMA)',
  level: 'intermediate',

  indications: [
    'Failed intubation',
    'Difficult bag-mask ventilation',
    'Cannot intubate, cannot oxygenate situation',
    'Cardiac arrest airway',
    'Bridge to definitive airway'
  ],

  contraindications: [
    'Intact gag reflex (relative)',
    'High aspiration risk (full stomach, pregnancy) - relative',
    'Upper airway obstruction at/below larynx',
    'Severe oropharyngeal pathology'
  ],

  equipment: [
    { item: 'LMA of appropriate size', size: 'Size 3: 30-50kg, Size 4: 50-70kg, Size 5: >70kg', required: true },
    { item: 'Water-soluble lubricant', required: true },
    { item: 'Syringe for cuff inflation', required: true },
    { item: 'Suction', required: false }
  ],

  steps: [
    {
      number: 1,
      action: 'Select and prepare LMA',
      details: 'Size by weight. Deflate cuff completely, lubricate posterior surface.',
      tips: 'Cuff should form smooth wedge shape when deflated'
    },
    {
      number: 2,
      action: 'Position patient',
      details: 'Sniffing position with mouth open',
      tips: 'Can be inserted in any position in emergency'
    },
    {
      number: 3,
      action: 'Hold LMA like a pen',
      details: 'Hold at junction of tube and mask, index finger at junction',
      tips: 'Aperture of mask facing anteriorly (toward tongue)'
    },
    {
      number: 4,
      action: 'Insert along hard palate',
      details: 'Press tip against hard palate and slide posteriorly',
      tips: 'Keep mask pressed against palate throughout insertion',
      warnings: ['Do not use force - if resistance, remove and try again']
    },
    {
      number: 5,
      action: 'Advance until resistance',
      details: 'Continue advancing until definite resistance felt (hypopharynx)',
      tips: 'The tube should exit mouth with slight curve toward chin'
    },
    {
      number: 6,
      action: 'Inflate cuff',
      details: 'Inflate to recommended volume (varies by size, usually 20-30ml)',
      tips: 'Tube should rise slightly with inflation',
      warnings: ['Do not overinflate - causes leak and mucosal injury']
    },
    {
      number: 7,
      action: 'Confirm placement',
      details: 'Ventilate and observe chest rise, auscultate, check ETCO2',
      tips: 'No gastric insufflation, symmetrical chest rise'
    }
  ],

  troubleshooting: [
    {
      problem: 'Air leak during ventilation',
      causes: ['Wrong size', 'Underinflated cuff', 'Poor position'],
      solutions: ['Try larger size', 'Add air to cuff', 'Reposition', 'Try second generation device']
    },
    {
      problem: 'Cannot advance device',
      causes: ['Not following palate', 'Cuff catching on tongue', 'Obstruction'],
      solutions: ['Start over with tip against palate', 'Push tongue down with finger', 'Ensure cuff fully deflated']
    },
    {
      problem: 'Gastric insufflation',
      causes: ['Tip not sealing over glottis', 'Too small device', 'High pressures'],
      solutions: ['Reposition', 'Try larger size', 'Consider intubation']
    }
  ],

  complications: [
    'Aspiration (does not protect against)',
    'Laryngospasm',
    'Sore throat',
    'Nerve injury (prolonged use)',
    'Failure to ventilate'
  ],

  postProcedure: [
    'Secure device with tape',
    'Insert bite block to prevent biting tube',
    'Continuous ETCO2 monitoring',
    'Consider gastric decompression',
    'Plan transition to definitive airway if needed'
  ]
};

// ============================================================================
// ENDOTRACHEAL INTUBATION
// ============================================================================

export const ENDOTRACHEAL_INTUBATION: AirwayProtocol = {
  id: 'ett-intubation',
  name: 'Endotracheal Intubation',
  level: 'advanced',

  indications: [
    'Failure to maintain or protect airway',
    'Failure to oxygenate or ventilate',
    'Expected clinical course (impending deterioration)',
    'Prolonged ventilatory support needed'
  ],

  contraindications: [
    'None absolute in emergency',
    'Relative: Severe facial trauma, airway disruption (consider surgical airway)'
  ],

  equipment: [
    { item: 'Laryngoscope with blade', size: 'Mac 3-4 adult, Miller 1-2 pediatric', required: true },
    { item: 'ETT of appropriate size', size: 'Adult F: 7.0-7.5, M: 7.5-8.0; Peds: (age/4)+4 uncuffed', required: true },
    { item: '10ml syringe for cuff', required: true },
    { item: 'Stylet', required: true },
    { item: 'Suction', required: true },
    { item: 'ETCO2 detector', required: true },
    { item: 'Bag-mask ventilation setup', required: true },
    { item: 'Tape or tube holder', required: true },
    { item: 'Backup equipment (bougie, LMA)', required: true }
  ],

  steps: [
    {
      number: 1,
      action: 'Prepare and check equipment',
      details: 'Check laryngoscope light, inflate/deflate ETT cuff, shape stylet',
      tips: 'Stylet tip should not extend past end of ETT'
    },
    {
      number: 2,
      action: 'Position patient',
      details: 'Sniffing position (align ear to sternal notch)',
      tips: 'Ramp obese patients; towel under shoulders for pediatrics'
    },
    {
      number: 3,
      action: 'Pre-oxygenate',
      details: 'BVM with 100% O2 for 3-5 minutes if possible',
      tips: 'Goal: maximize oxygen reserve before attempt'
    },
    {
      number: 4,
      action: 'Hold laryngoscope',
      details: 'Left hand holds laryngoscope handle',
      tips: 'Right hand opens mouth, scissors technique'
    },
    {
      number: 5,
      action: 'Insert blade',
      details: 'Insert blade into right side of mouth, sweep tongue to left',
      tips: 'Follow natural curve of blade, advance to epiglottis'
    },
    {
      number: 6,
      action: 'Visualize glottis',
      details: 'Mac: tip in vallecula, lift anteriorly. Miller: lift epiglottis directly.',
      tips: 'Lift at 45° toward ceiling, DO NOT lever on teeth',
      warnings: ['Never use teeth as fulcrum']
    },
    {
      number: 7,
      action: 'Pass ETT through cords',
      details: 'Visualize tube passing through vocal cords',
      tips: 'Stop when cuff just passes cords (21-23cm at teeth for adult)'
    },
    {
      number: 8,
      action: 'Inflate cuff and confirm',
      details: 'Inflate cuff, ventilate, check ETCO2, auscultate bilaterally',
      tips: '5-point auscultation: epigastric, bilateral axillae, bilateral chest',
      warnings: ['If any doubt about placement, REMOVE and re-oxygenate']
    },
    {
      number: 9,
      action: 'Secure tube',
      details: 'Secure with tape or commercial holder, note depth at teeth',
      tips: 'Typical depth: Adult 21-23cm, confirm with CXR'
    }
  ],

  troubleshooting: [
    {
      problem: 'Cannot visualize cords',
      causes: ['Poor positioning', 'Blood/secretions', 'Difficult anatomy'],
      solutions: ['Optimize position', 'Suction', 'External laryngeal manipulation (BURP)', 'Try bougie', 'Try video laryngoscope']
    },
    {
      problem: 'Esophageal intubation',
      causes: ['Tube placed in esophagus'],
      solutions: ['No ETCO2, gastric sounds = REMOVE IMMEDIATELY', 'Re-oxygenate', 'Attempt again with better visualization']
    },
    {
      problem: 'Right mainstem intubation',
      causes: ['Tube too deep'],
      solutions: ['Unilateral breath sounds = withdraw tube 1-2cm', 'Reconfirm bilateral sounds', 'CXR']
    },
    {
      problem: 'Cannot pass tube',
      causes: ['Cord spasm', 'Obstruction', 'Wrong angle'],
      solutions: ['Rotate tube 90°', 'Smaller tube', 'Use bougie', 'Consider cricothyrotomy']
    }
  ],

  complications: [
    'Esophageal intubation',
    'Right mainstem intubation',
    'Dental trauma',
    'Aspiration',
    'Hypoxia during attempt',
    'Airway trauma',
    'Cardiovascular collapse (sedation, hypoxia)'
  ],

  postProcedure: [
    'Confirm with ETCO2 (gold standard)',
    'Secure tube thoroughly',
    'Order CXR for tube position',
    'Set ventilator appropriately',
    'Document attempt, view obtained, confirmation methods'
  ]
};

// ============================================================================
// CRICOTHYROTOMY
// ============================================================================

export const SURGICAL_CRICOTHYROTOMY: AirwayProtocol = {
  id: 'cricothyrotomy',
  name: 'Surgical Cricothyrotomy',
  level: 'advanced',

  indications: [
    'Cannot intubate, cannot oxygenate (CICO)',
    'Complete upper airway obstruction',
    'Severe facial/oral trauma preventing oral/nasal airway',
    'Failed supraglottic airway rescue'
  ],

  contraindications: [
    'Ability to secure airway by other means',
    'Children <8-10 years (relative - needle cricothyrotomy preferred)',
    'Tracheal transection below cricoid (relative)'
  ],

  equipment: [
    { item: 'Scalpel (#10 or #20 blade)', required: true },
    { item: 'Bougie or tracheal hook', required: true, alternatives: ['Finger or hemostat'] },
    { item: 'Cuffed tracheostomy tube or ETT 6.0', required: true },
    { item: 'Syringe for cuff', required: true },
    { item: 'Bag-mask ventilation setup', required: true },
    { item: 'Suction', required: true }
  ],

  steps: [
    {
      number: 1,
      action: 'Position and palpate',
      details: 'Extend neck (if no C-spine concern). Palpate cricothyroid membrane.',
      tips: 'Membrane is between thyroid cartilage (superior) and cricoid (inferior)'
    },
    {
      number: 2,
      action: 'Stabilize larynx',
      details: 'Non-dominant hand stabilizes thyroid cartilage from above',
      tips: 'Do not let go until tube is in place'
    },
    {
      number: 3,
      action: 'Make vertical skin incision',
      details: '3-4cm vertical incision over membrane',
      tips: 'Vertical safer (less bleeding from vessels that run horizontally)',
      warnings: ['Control any bleeding as you go']
    },
    {
      number: 4,
      action: 'Horizontal membrane incision',
      details: 'Palpate membrane through incision, make horizontal stab',
      tips: 'Stab through membrane with scalpel held horizontally',
      warnings: ['Keep blade parallel to ground to avoid posterior tracheal injury']
    },
    {
      number: 5,
      action: 'Dilate opening',
      details: 'Rotate scalpel handle or use hemostat to dilate opening',
      tips: 'Insert finger to confirm tracheal entry (air, rings)'
    },
    {
      number: 6,
      action: 'Insert tube',
      details: 'Insert 6.0 ETT or tracheostomy tube, cuff down',
      tips: 'Use bougie as guide if available',
      warnings: ['Do not advance too far - can create false passage']
    },
    {
      number: 7,
      action: 'Confirm and secure',
      details: 'Inflate cuff, ventilate, confirm with ETCO2, secure tube',
      tips: 'Standard confirmation methods apply'
    }
  ],

  troubleshooting: [
    {
      problem: 'Cannot identify landmarks',
      causes: ['Obesity', 'Swelling', 'Anatomy distortion'],
      solutions: ['Vertical incision allows exploration', 'Palpate inside incision', 'Feel for tracheal rings']
    },
    {
      problem: 'Significant bleeding',
      causes: ['Vessel injury', 'Thyroid injury'],
      solutions: ['Direct pressure', 'Complete procedure rapidly', 'Secure airway then address bleeding']
    },
    {
      problem: 'False passage',
      causes: ['Tube placed pretracheal or posterior'],
      solutions: ['Remove and reinsert', 'Use finger to guide', 'Use bougie']
    }
  ],

  complications: [
    'Hemorrhage',
    'False passage',
    'Posterior tracheal wall injury',
    'Subglottic stenosis (long-term)',
    'Infection',
    'Subcutaneous emphysema'
  ],

  postProcedure: [
    'Confirm with ETCO2 and auscultation',
    'Secure tube with sutures or ties',
    'CXR to confirm position',
    'Plan for conversion to formal tracheostomy within 24-72h',
    'Document indication, procedure, and confirmation'
  ]
};

// ============================================================================
// QUICK REFERENCE CARDS
// ============================================================================

export const AIRWAY_QUICK_REFERENCE = {
  basic: {
    head_tilt_chin_lift: 'No trauma: palm on forehead, tilt back, lift chin',
    jaw_thrust: 'Trauma: fingers behind mandible, thrust jaw forward',
    opa: 'Unconscious, no gag: size corner-mouth to angle of jaw, insert upside down and rotate',
    npa: 'Semiconscious: size nose to tragus, lubricate, insert along floor of nose'
  },
  intermediate: {
    bvm: 'C-E grip: C on mask, E lift mandible; rate 10-12/min adult; avoid gastric distension',
    lma: 'Deflate cuff, lubricate, slide along palate until resistance, inflate cuff'
  },
  advanced: {
    intubation: 'Pre-oxygenate → Position → Blade in right sweep left → Visualize → Pass tube → Confirm ETCO2',
    cricothyrotomy: 'Stabilize larynx → Vertical skin incision → Horizontal membrane stab → Dilate → Insert tube'
  },
  difficult_airway: {
    lemon: 'Look, Evaluate 3-3-2, Mallampati, Obstruction, Neck mobility',
    moans: 'Mask seal, Obstruction/Obesity, Age, No teeth, Stiff lungs',
    rods: 'Restricted opening, Obstruction, Distorted anatomy, Stiff lungs'
  },
  sizes: {
    ett_adult_female: '7.0-7.5',
    ett_adult_male: '7.5-8.0',
    ett_pediatric: '(age/4) + 4 uncuffed or (age/4) + 3.5 cuffed',
    ett_depth_adult: '21-23cm at teeth',
    lma_sizes: 'Size 3: 30-50kg, Size 4: 50-70kg, Size 5: >70kg'
  }
};

// ============================================================================
// EXPORTS
// ============================================================================

export const AIRWAY_PROTOCOLS = [
  HEAD_TILT_CHIN_LIFT,
  JAW_THRUST,
  OROPHARYNGEAL_AIRWAY,
  NASOPHARYNGEAL_AIRWAY,
  BAG_MASK_VENTILATION,
  LMA_INSERTION,
  ENDOTRACHEAL_INTUBATION,
  SURGICAL_CRICOTHYROTOMY
] as const;

export const AIRWAY_ASSESSMENTS = {
  LEMON_ASSESSMENT,
  MOANS_ASSESSMENT,
  RODS_ASSESSMENT,
  SHORT_ASSESSMENT
} as const;

export function getAirwayProtocol(id: string): AirwayProtocol | undefined {
  return AIRWAY_PROTOCOLS.find(p => p.id === id);
}

export function getProtocolsByLevel(level: AirwayProtocol['level']): AirwayProtocol[] {
  return AIRWAY_PROTOCOLS.filter(p => p.level === level);
}
