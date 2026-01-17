/**
 * Procedural Tutorials
 * Step-by-step guides for essential medical procedures
 * Designed for healthcare workers in resource-limited settings
 *
 * Each procedure includes:
 * - Indications and contraindications
 * - Equipment list (with improvisation options)
 * - Step-by-step instructions
 * - Troubleshooting tips
 * - Complications and management
 */

export interface ProceduralTutorial {
  id: string;
  name: string;
  category: ProcedureCategory;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  description: string;
  indications: string[];
  contraindications: string[];
  equipment: EquipmentItem[];
  steps: ProcedureStep[];
  troubleshooting: TroubleshootingTip[];
  complications: Complication[];
  postProcedure: string[];
  quickReference: string;
}

export interface EquipmentItem {
  name: string;
  essential: boolean;
  alternatives?: string[];
}

export interface ProcedureStep {
  number: number;
  title: string;
  description: string;
  tips?: string[];
  warnings?: string[];
  image?: string; // ASCII diagram
}

export interface TroubleshootingTip {
  problem: string;
  solutions: string[];
}

export interface Complication {
  name: string;
  frequency: 'common' | 'uncommon' | 'rare';
  prevention: string;
  management: string;
}

export type ProcedureCategory =
  | 'airway'
  | 'vascular_access'
  | 'wound_care'
  | 'obstetric'
  | 'emergency'
  | 'diagnostic';

// ============================================================================
// IV ACCESS TUTORIAL
// ============================================================================

export const IV_ACCESS_TUTORIAL: ProceduralTutorial = {
  id: 'iv-access-peripheral',
  name: 'Peripheral IV Access',
  category: 'vascular_access',
  difficulty: 'basic',
  estimatedMinutes: 10,
  description: 'Peripheral intravenous catheter insertion for fluid and medication administration',

  indications: [
    'Fluid resuscitation',
    'IV medication administration',
    'Blood product transfusion',
    'Contrast administration',
    'Keeping a vein open (KVO)'
  ],

  contraindications: [
    'Infection at insertion site',
    'Phlebitis in target vein',
    'AV fistula in that arm (dialysis patients)',
    'Lymphedema in that arm',
    'Prior mastectomy on that side (relative)'
  ],

  equipment: [
    { name: 'IV catheter (18-22G)', essential: true, alternatives: ['Butterfly needle for short-term'] },
    { name: 'Tourniquet', essential: true, alternatives: ['Glove tied as tourniquet', 'Blood pressure cuff inflated'] },
    { name: 'Alcohol swab', essential: true, alternatives: ['Chlorhexidine', 'Iodine', 'Clean water if nothing else'] },
    { name: 'Tape or transparent dressing', essential: true, alternatives: ['Bandage wrap'] },
    { name: 'Gloves', essential: true },
    { name: 'Saline flush', essential: false },
    { name: 'IV tubing and fluid bag', essential: false }
  ],

  steps: [
    {
      number: 1,
      title: 'Site Selection',
      description: 'Choose a vein. Best sites: dorsum of hand, forearm (cephalic, basilic veins), antecubital fossa (for large bore/emergency).',
      tips: [
        'Start distally and work proximally',
        'Avoid joints if possible',
        'In shock: antecubital or external jugular',
        'Warm the arm or hang it down to dilate veins'
      ],
      image: `
       FOREARM VEINS:
       ===============
           Cephalic v.
              \\
               \\    Antecubital
                \\   fossa
                 \\_____
                 |     |
         Basilic |     | Cephalic
              v. |     | v.
                 |     |
                 |_____|
                   |
             Dorsal hand
              veins
      `
    },
    {
      number: 2,
      title: 'Apply Tourniquet',
      description: 'Apply tourniquet 10-15 cm above insertion site. Tight enough to occlude venous return but not arterial flow.',
      tips: [
        'You should still feel a pulse distal to tourniquet',
        'Have patient make a fist to engorge veins',
        'Tap over vein to help dilate it',
        'Maximum tourniquet time: 2 minutes'
      ],
      warnings: [
        'Release tourniquet before blood draw in children (prevents hemolysis)',
        'Don\'t leave tourniquet on >2 minutes'
      ]
    },
    {
      number: 3,
      title: 'Clean Site',
      description: 'Clean insertion site with alcohol/antiseptic. Allow to dry. Do not touch the cleaned area.',
      tips: [
        'Circular motion from center outward',
        'Let alcohol dry completely (30 seconds)',
        'If repalpating vein, clean your finger too'
      ]
    },
    {
      number: 4,
      title: 'Insert Catheter',
      description: 'Anchor vein by pulling skin taut distally. Insert needle at 15-30° angle, bevel up. Watch for flashback.',
      tips: [
        'Enter 0.5-1 cm distal to where you want catheter tip',
        'Low angle (15°) for superficial veins',
        'Higher angle (30°) for deeper veins',
        'Once flashback seen, lower angle and advance 1-2mm more'
      ],
      warnings: [
        'Do NOT advance needle once flashback is seen - advance catheter only'
      ],
      image: `
       INSERTION ANGLE:
       ================

       15-30° angle, bevel UP

           ___________
          /           \\
         /  Catheter   \\
        /_______________\\
       ========>        ============ SKIN
                   ~~~~~~~~~~~ VEIN
      `
    },
    {
      number: 5,
      title: 'Advance Catheter',
      description: 'Once flashback is seen, advance the plastic catheter off the needle into the vein while withdrawing the needle.',
      tips: [
        'Stabilize the needle hub with one hand',
        'Slide catheter forward with other hand',
        'Advance until hub reaches skin',
        'Smooth, gentle motion'
      ],
      warnings: [
        'NEVER reinsert needle into catheter (risk of catheter shearing)',
        'If you miss, withdraw completely and try new site'
      ]
    },
    {
      number: 6,
      title: 'Release Tourniquet & Connect',
      description: 'Release tourniquet. Apply pressure proximal to catheter tip. Remove needle. Connect IV tubing or cap.',
      tips: [
        'Release tourniquet BEFORE removing needle',
        'Press over vein above catheter to prevent blood drip',
        'Dispose of needle in sharps immediately'
      ]
    },
    {
      number: 7,
      title: 'Secure and Flush',
      description: 'Secure catheter with tape or transparent dressing. Flush with saline to confirm patency.',
      tips: [
        'Flush should flow freely with no swelling',
        'Document date, time, gauge, and location',
        'If pain or swelling with flush, remove and restart'
      ]
    }
  ],

  troubleshooting: [
    {
      problem: 'Can\'t find a vein',
      solutions: [
        'Warm the arm (warm towels, warm water)',
        'Hang arm down for 1-2 minutes',
        'Use tighter tourniquet (but not arterial occlusion)',
        'Try blood pressure cuff inflated to between SBP and DBP',
        'Use ultrasound if available',
        'Consider external jugular or intraosseous'
      ]
    },
    {
      problem: 'Flash but can\'t advance catheter',
      solutions: [
        'Lower angle more before advancing',
        'Try advancing needle 1-2mm more into vein',
        'Ensure vein is anchored (may have rolled)',
        'May have gone through the vein - withdraw and redirect'
      ]
    },
    {
      problem: 'Swelling during flush',
      solutions: [
        'Catheter is not in vein (infiltration)',
        'Remove immediately',
        'Apply pressure and elevate',
        'Restart at new site'
      ]
    }
  ],

  complications: [
    {
      name: 'Infiltration',
      frequency: 'common',
      prevention: 'Proper insertion technique, secure fixation',
      management: 'Remove catheter, elevate limb, warm compress'
    },
    {
      name: 'Phlebitis',
      frequency: 'common',
      prevention: 'Aseptic technique, proper catheter size, rotate sites every 72-96h',
      management: 'Remove catheter, warm compress, antibiotics if septic'
    },
    {
      name: 'Hematoma',
      frequency: 'common',
      prevention: 'Apply pressure after failed attempts',
      management: 'Pressure, ice, elevation'
    },
    {
      name: 'Air embolism',
      frequency: 'rare',
      prevention: 'Prime tubing, check connections',
      management: 'Left lateral decubitus, 100% O2, supportive care'
    }
  ],

  postProcedure: [
    'Document: date, time, site, gauge, number of attempts',
    'Flush every 8-12 hours if not in continuous use',
    'Monitor for phlebitis signs (pain, redness, swelling)',
    'Remove and replace every 72-96 hours per protocol',
    'Remove immediately if signs of infection or infiltration'
  ],

  quickReference: `
╔══════════════════════════════════════════════════════════╗
║              IV ACCESS QUICK REFERENCE                   ║
╠══════════════════════════════════════════════════════════╣
║ 1. Site: hand/forearm (antecubital for emergency)        ║
║ 2. Tourniquet 10-15cm above site                         ║
║ 3. Clean with alcohol, let dry                           ║
║ 4. Insert 15-30°, bevel UP                               ║
║ 5. Flashback → advance CATHETER (not needle)             ║
║ 6. Release tourniquet → remove needle → connect          ║
║ 7. Secure → flush → document                             ║
╠══════════════════════════════════════════════════════════╣
║ TIPS:                                                    ║
║ • Warm arm to dilate veins                               ║
║ • Never reinsert needle into catheter                    ║
║ • Swelling = infiltration → remove                       ║
╚══════════════════════════════════════════════════════════╝
`
};

// ============================================================================
// NEEDLE DECOMPRESSION TUTORIAL
// ============================================================================

export const NEEDLE_DECOMPRESSION_TUTORIAL: ProceduralTutorial = {
  id: 'needle-decompression',
  name: 'Needle Thoracostomy (Decompression)',
  category: 'emergency',
  difficulty: 'intermediate',
  estimatedMinutes: 5,
  description: 'Emergency decompression of tension pneumothorax',

  indications: [
    'Clinical tension pneumothorax:',
    '  - Severe respiratory distress',
    '  - Hypotension',
    '  - Tracheal deviation (away from affected side)',
    '  - Absent breath sounds on affected side',
    '  - Distended neck veins (may be absent if hypovolemic)',
    'Trauma patient with above signs',
    'Do NOT wait for X-ray confirmation'
  ],

  contraindications: [
    'No absolute contraindications in true tension pneumothorax',
    'Relative: simple pneumothorax without tension (may convert to open)'
  ],

  equipment: [
    { name: '14G needle (3.5 inch / 8cm minimum)', essential: true, alternatives: ['16G needle', 'Large bore angiocath'] },
    { name: 'Alcohol swab', essential: true },
    { name: 'Gloves', essential: true },
    { name: 'Chest tube tray (for definitive management)', essential: false }
  ],

  steps: [
    {
      number: 1,
      title: 'Identify Side',
      description: 'Determine affected side: absent breath sounds, hyperresonance, tracheal deviation AWAY from affected side.',
      tips: [
        'Tension = mediastinal shift AWAY from affected side',
        'In trauma, penetrating wound gives clue to side',
        'If uncertain, decompress the side with absent breath sounds'
      ],
      warnings: [
        'This is a CLINICAL diagnosis - do not delay for X-ray in unstable patient'
      ]
    },
    {
      number: 2,
      title: 'Position and Site Selection',
      description: 'Two acceptable sites: 2nd intercostal space (ICS), midclavicular line (MCL) OR 5th ICS, anterior axillary line (AAL).',
      tips: [
        '5th ICS AAL preferred in TCCC (less muscle, higher success)',
        '2nd ICS MCL is traditional teaching',
        'Feel for 2nd rib at sternal angle (Angle of Louis)'
      ],
      image: `
       DECOMPRESSION SITES:
       ====================

            2nd ICS MCL
                 |
                 v
             *---+---*
            /|   |   |\\
           / |   |   | \\
          *  |   |   |  *
             +---+---+
             |       |
             |   5th ICS AAL
             |       * <----
             |       |
      `
    },
    {
      number: 3,
      title: 'Clean Site',
      description: 'Rapidly clean the insertion site with alcohol or available antiseptic.',
      tips: [
        'In extremis, don\'t delay - needle can go through clothing if needed',
        'Sterility is secondary to saving life'
      ]
    },
    {
      number: 4,
      title: 'Insert Needle',
      description: 'Insert needle perpendicular to chest wall, OVER the top of the rib (to avoid neurovascular bundle).',
      tips: [
        'Neurovascular bundle runs under each rib',
        'Go OVER the rib, not under',
        'Insert needle perpendicular (90°) to chest wall',
        'Advance until rush of air is heard/felt'
      ],
      warnings: [
        'NEVER go UNDER the rib (vessels and nerve there)'
      ],
      image: `
       NEEDLE INSERTION:
       =================

       CORRECT (over rib):

       Needle → \\
                 \\    ← Pleural space
       ============\\=========
       ~~~~RIB~~~~~↓~~~~~~~~~
       ~~~~~~~~~~~~↓~~~~~~~~~
       ~~~~RIB~~~~~~~~~~~~~~~

       Intercostal vessels run UNDER the rib
      `
    },
    {
      number: 5,
      title: 'Confirm Decompression',
      description: 'Listen/feel for rush of air. Patient should improve rapidly. Leave catheter in place.',
      tips: [
        'Rush of air confirms tension pneumothorax',
        'Remove needle, leave catheter',
        'Vitals should improve within seconds to minutes',
        'If no improvement, consider wrong side or other diagnosis'
      ]
    },
    {
      number: 6,
      title: 'Prepare for Chest Tube',
      description: 'Needle decompression is TEMPORIZING. Definitive management is chest tube.',
      tips: [
        'Catheter may kink or clog',
        'Chest tube should be placed ASAP',
        'If no chest tube capability, may need repeat needle decompression'
      ]
    }
  ],

  troubleshooting: [
    {
      problem: 'No rush of air',
      solutions: [
        'May not have been tension pneumothorax',
        'Needle may be too short (especially obese patient)',
        'Try alternative site (5th ICS AAL)',
        'Ensure needle is through chest wall into pleural space'
      ]
    },
    {
      problem: 'Patient doesn\'t improve',
      solutions: [
        'Consider wrong side - decompress other side',
        'Consider other diagnosis (pericardial tamponade, massive hemothorax)',
        'May need longer needle or chest tube'
      ]
    },
    {
      problem: 'Recurrence of tension',
      solutions: [
        'Catheter may be kinked or clogged',
        'Repeat needle decompression',
        'Place chest tube as soon as possible'
      ]
    }
  ],

  complications: [
    {
      name: 'Lung laceration',
      frequency: 'rare',
      prevention: 'Don\'t advance too far once air escapes',
      management: 'Usually self-limited, may need chest tube'
    },
    {
      name: 'Vascular injury',
      frequency: 'rare',
      prevention: 'Insert OVER the rib, not under',
      management: 'Chest tube, possible thoracotomy if massive'
    },
    {
      name: 'Failure (needle too short)',
      frequency: 'common',
      prevention: 'Use at least 8cm (3.5 inch) needle',
      management: 'Try longer needle or alternate site'
    }
  ],

  postProcedure: [
    'Monitor respiratory status continuously',
    'Prepare for chest tube placement',
    'Get chest X-ray when patient stable',
    'Document procedure'
  ],

  quickReference: `
╔══════════════════════════════════════════════════════════╗
║        NEEDLE DECOMPRESSION QUICK REFERENCE              ║
╠══════════════════════════════════════════════════════════╣
║ INDICATIONS: Tension pneumothorax (clinical diagnosis)   ║
║   - Respiratory distress + hypotension                   ║
║   - Absent breath sounds + hyperresonance on one side    ║
║   - Tracheal deviation AWAY from affected side           ║
║   - Distended neck veins                                 ║
╠══════════════════════════════════════════════════════════╣
║ SITES:                                                   ║
║   • 2nd ICS, midclavicular line (traditional)            ║
║   • 5th ICS, anterior axillary line (TCCC preferred)     ║
╠══════════════════════════════════════════════════════════╣
║ TECHNIQUE:                                               ║
║   1. Identify affected side (absent breath sounds)       ║
║   2. Insert 14G needle (8cm+) perpendicular to chest     ║
║   3. Go OVER the rib (not under)                         ║
║   4. Listen for rush of air                              ║
║   5. Leave catheter, remove needle                       ║
║   6. FOLLOW WITH CHEST TUBE                              ║
╠══════════════════════════════════════════════════════════╣
║ ⚠️  This is TEMPORIZING - chest tube is definitive       ║
╚══════════════════════════════════════════════════════════╝
`
};

// ============================================================================
// WOUND SUTURING TUTORIAL
// ============================================================================

export const WOUND_SUTURING_TUTORIAL: ProceduralTutorial = {
  id: 'wound-suturing-basic',
  name: 'Basic Wound Suturing',
  category: 'wound_care',
  difficulty: 'intermediate',
  estimatedMinutes: 20,
  description: 'Primary closure of simple lacerations with sutures',

  indications: [
    'Clean lacerations <6-8 hours old (up to 24h on face)',
    'Wounds that benefit from closure (cosmetic, functional)',
    'Wounds with edges that can be approximated'
  ],

  contraindications: [
    'Heavily contaminated wounds (should irrigate, may delay closure)',
    'Animal bites to hand (usually left open)',
    'Puncture wounds (cannot irrigate adequately)',
    'Wounds >24 hours old (except face)',
    'Signs of infection (delayed closure)',
    'Wounds over joints with full thickness involvement'
  ],

  equipment: [
    { name: 'Suture material (appropriate size)', essential: true },
    { name: 'Needle holder', essential: true, alternatives: ['Hemostats in emergency'] },
    { name: 'Forceps (toothed)', essential: true },
    { name: 'Scissors', essential: true },
    { name: 'Saline for irrigation', essential: true },
    { name: 'Syringe for irrigation', essential: true },
    { name: 'Local anesthetic (Lidocaine)', essential: true },
    { name: 'Sterile gloves', essential: true },
    { name: 'Sterile drape', essential: false }
  ],

  steps: [
    {
      number: 1,
      title: 'Wound Assessment',
      description: 'Examine wound for depth, involvement of underlying structures, foreign bodies, and suitability for closure.',
      tips: [
        'Check neurovascular status distally',
        'Test tendon function if extremity wound',
        'Explore for foreign bodies',
        'Consider X-ray if glass or metal suspected'
      ],
      warnings: [
        'Do not close if tendon or nerve injury suspected (needs OR)',
        'Do not close heavily contaminated wounds primarily'
      ]
    },
    {
      number: 2,
      title: 'Anesthesia',
      description: 'Inject local anesthetic (Lidocaine 1-2%) around wound edges.',
      tips: [
        'Inject through wound edges (less painful than through intact skin)',
        'Wait 2-3 minutes for full effect',
        'Max Lidocaine dose: 4mg/kg (7mg/kg with epinephrine)',
        'Never use epinephrine on digits, nose, ears, penis'
      ]
    },
    {
      number: 3,
      title: 'Irrigation',
      description: 'Copiously irrigate wound with saline using pressure irrigation.',
      tips: [
        'Use 100-200ml per cm of wound',
        'High-pressure irrigation (18-19G needle on syringe)',
        '"The solution to pollution is dilution"',
        'Most important step for preventing infection'
      ]
    },
    {
      number: 4,
      title: 'Debridement',
      description: 'Remove any devitalized tissue, foreign material, or ragged edges.',
      tips: [
        'Only remove clearly necrotic tissue',
        'Trim jagged edges to create smooth wound margins',
        'Conservative debridement on face'
      ]
    },
    {
      number: 5,
      title: 'Suture Selection',
      description: 'Choose appropriate suture based on location and tension.',
      tips: [
        'Face: 5-0 or 6-0 non-absorbable, remove in 5 days',
        'Scalp: 3-0 or 4-0, remove in 7-10 days',
        'Trunk: 4-0, remove in 10-14 days',
        'Extremity: 4-0, remove in 10-14 days',
        'High tension (joints): 3-0 or 4-0'
      ]
    },
    {
      number: 6,
      title: 'Simple Interrupted Suture',
      description: 'Standard technique for most lacerations.',
      tips: [
        'Enter skin perpendicular (90°)',
        'Take equal bites on each side (3-5mm from edge)',
        'Exit perpendicular on other side',
        'Tie square knots (3-4 throws)',
        'Space sutures 3-5mm apart',
        'Evert wound edges slightly'
      ],
      image: `
       SIMPLE INTERRUPTED SUTURE:
       ==========================

       1. Enter 90°    2. Cross wound    3. Exit 90°

           |                |               |
           v                v               v
       ====*====        ====*====       ====*====
           |        -->     \\___/           |
           |                  ^             |
                              |
                        4. Tie knot

       EVERSION (cross-section):

       Good: skin edges    Bad: inverted
       slightly elevated   edges

           /\\                \\/
          /  \\              /  \\
      `
    },
    {
      number: 7,
      title: 'Tying the Knot',
      description: 'Use instrument tie (square knots) to secure suture.',
      tips: [
        'First throw: wrap suture around needle holder, grab short end, pull through',
        'Second throw: opposite direction wrap',
        'Alternate directions for each throw (square knot)',
        '3-4 throws total',
        'Tighten just enough to approximate edges (not strangulate)'
      ],
      warnings: [
        'Too tight = tissue ischemia and necrosis',
        'Too loose = wound dehiscence'
      ]
    },
    {
      number: 8,
      title: 'Wound Dressing',
      description: 'Apply antibiotic ointment (optional) and sterile dressing.',
      tips: [
        'Keep wound covered for 24-48 hours',
        'After 48 hours, can leave open or use light dressing',
        'Patient can shower after 24-48 hours',
        'No submerging in water until sutures removed'
      ]
    }
  ],

  troubleshooting: [
    {
      problem: 'Wound edges don\'t come together',
      solutions: [
        'Undermine edges (dissect subcutaneous tissue away from skin)',
        'Use deep (buried) sutures to reduce tension',
        'Consider different closure method (delayed primary, secondary intention)'
      ]
    },
    {
      problem: 'Bleeding during closure',
      solutions: [
        'Direct pressure for 5 minutes',
        'Lidocaine with epinephrine (if not contraindicated)',
        'Cautery if available',
        'Figure-of-eight suture around vessel'
      ]
    },
    {
      problem: 'Patient can still feel pain',
      solutions: [
        'Wait longer for anesthetic to work',
        'Add more local anesthetic (within dose limits)',
        'Consider nerve block for larger area',
        'Topical anesthetic (LET gel) as adjunct'
      ]
    }
  ],

  complications: [
    {
      name: 'Infection',
      frequency: 'common',
      prevention: 'Copious irrigation, tetanus prophylaxis, proper technique',
      management: 'Remove sutures, drain pus, antibiotics, secondary closure'
    },
    {
      name: 'Dehiscence',
      frequency: 'uncommon',
      prevention: 'Proper tension, adequate suture spacing',
      management: 'Re-suture if clean, secondary intention if infected'
    },
    {
      name: 'Scar widening',
      frequency: 'common',
      prevention: 'Evert edges, appropriate suture removal timing, steri-strips after removal',
      management: 'Scar revision if cosmetically important'
    },
    {
      name: 'Suture marks ("railroad tracks")',
      frequency: 'common',
      prevention: 'Timely suture removal, small suture size on face',
      management: 'Usually fade, may need scar revision'
    }
  ],

  postProcedure: [
    'Tetanus prophylaxis if indicated',
    'Written wound care instructions',
    'Signs of infection to watch for (redness, warmth, pus, fever)',
    'Suture removal appointment',
    'Activity restrictions if over joint'
  ],

  quickReference: `
╔══════════════════════════════════════════════════════════╗
║          WOUND SUTURING QUICK REFERENCE                  ║
╠══════════════════════════════════════════════════════════╣
║ SUTURE SIZE BY LOCATION:                                 ║
║   Face:       5-0 or 6-0    (remove 5 days)              ║
║   Scalp:      3-0 or 4-0    (remove 7-10 days)           ║
║   Trunk:      4-0           (remove 10-14 days)          ║
║   Extremity:  4-0           (remove 10-14 days)          ║
║   High tension: 3-0 or 4-0                               ║
╠══════════════════════════════════════════════════════════╣
║ SIMPLE INTERRUPTED TECHNIQUE:                            ║
║   1. Enter perpendicular (90°)                           ║
║   2. Equal bites (3-5mm from edge)                       ║
║   3. Exit perpendicular                                  ║
║   4. Square knot (3-4 throws)                            ║
║   5. Space sutures 3-5mm apart                           ║
║   6. EVERT wound edges                                   ║
╠══════════════════════════════════════════════════════════╣
║ MAX LIDOCAINE DOSE:                                      ║
║   Without epi: 4mg/kg                                    ║
║   With epi: 7mg/kg                                       ║
║   1% Lidocaine = 10mg/ml                                 ║
║   NO EPI on digits, nose, ears, penis                    ║
╚══════════════════════════════════════════════════════════╝
`
};

// ============================================================================
// COLLECTION OF TUTORIALS
// ============================================================================

export const PROCEDURAL_TUTORIALS: ProceduralTutorial[] = [
  IV_ACCESS_TUTORIAL,
  NEEDLE_DECOMPRESSION_TUTORIAL,
  WOUND_SUTURING_TUTORIAL
];

export function getTutorialById(id: string): ProceduralTutorial | undefined {
  return PROCEDURAL_TUTORIALS.find(t => t.id === id);
}

export function getTutorialsByCategory(category: ProcedureCategory): ProceduralTutorial[] {
  return PROCEDURAL_TUTORIALS.filter(t => t.category === category);
}

export default {
  PROCEDURAL_TUTORIALS,
  getTutorialById,
  getTutorialsByCategory
};
