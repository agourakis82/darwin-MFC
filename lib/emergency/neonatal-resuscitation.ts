/**
 * NEONATAL RESUSCITATION PROGRAM (NRP) PROTOCOL
 *
 * Evidence-based algorithm for newborn resuscitation
 * Designed for delivery room and resource-limited settings
 *
 * Key Principle: Most newborns need only warmth, drying, and stimulation
 * ~10% need some assistance to breathe
 * ~1% need chest compressions
 * <0.1% need epinephrine
 *
 * References:
 * - NRP 8th Edition (2021)
 * - WHO Guidelines on Basic Newborn Resuscitation (2012)
 * - ILCOR Neonatal Resuscitation 2020
 */

export interface NeonatalAssessment {
  gestationalAge: number; // weeks
  birthWeight?: number; // grams
  apgarScores: { oneMinute: number; fiveMinute: number; tenMinute?: number };
  initialAssessment: {
    term: boolean;
    goodTone: boolean;
    breathingOrCrying: boolean;
  };
  interventionsRequired: string[];
  outcome: 'routine_care' | 'resuscitation' | 'ongoing_support' | 'nicu_transfer';
}

export interface ApgarScore {
  appearance: 0 | 1 | 2; // Color
  pulse: 0 | 1 | 2; // Heart rate
  grimace: 0 | 1 | 2; // Reflex irritability
  activity: 0 | 1 | 2; // Muscle tone
  respiration: 0 | 1 | 2; // Breathing
  total: number;
}

// ============================================================
// NRP ALGORITHM
// ============================================================

export const NRP_ALGORITHM = {
  id: 'nrp-algorithm',
  name: 'Neonatal Resuscitation Program (NRP) Algorithm',
  version: '8th Edition (2021)',

  prebirthPreparation: {
    questions: [
      'Expected gestational age?',
      'Clear amniotic fluid?',
      'How many babies?',
      'Additional risk factors?'
    ],
    equipment: [
      'Radiant warmer (or warm towels)',
      'Suction equipment (bulb syringe, suction catheter)',
      'Bag-mask device (240-750 mL bag)',
      'Face masks (preterm and term sizes)',
      'Oxygen source with blender if available',
      'Stethoscope',
      'Pulse oximeter and probe',
      'Laryngoscope with size 0 and 1 blades',
      'ETT (sizes 2.5, 3.0, 3.5)',
      'Umbilical catheter supplies',
      'Epinephrine (1:10,000)',
      'Normal saline for volume',
      'Cord clamp'
    ],
    teamBriefing: 'Assign roles: Leader, Airway, Chest compressions, Medications, Documentation'
  },

  initialSteps: {
    duration: '30 seconds (Golden Minute)',
    description: 'Initial Steps for ALL newborns',
    steps: [
      {
        step: 1,
        action: 'Receive baby on warm surface',
        details: 'Place on radiant warmer or skin-to-skin with mother',
        rationale: 'Prevent hypothermia - hypothermia increases mortality'
      },
      {
        step: 2,
        action: 'Dry thoroughly',
        details: 'Dry with warm towel, remove wet towel, cover with dry towel',
        rationale: 'Evaporative heat loss is significant'
      },
      {
        step: 3,
        action: 'Position airway',
        details: 'Sniffing position (neck slightly extended, not hyperextended)',
        tip: 'Use shoulder roll if needed for large occiput'
      },
      {
        step: 4,
        action: 'Clear airway (if needed)',
        details: 'Suction mouth then nose (only if secretions obstruct airway)',
        warning: 'Routine suctioning is NOT recommended'
      },
      {
        step: 5,
        action: 'Stimulate',
        details: 'Rub back, flick soles of feet',
        tip: 'Brief stimulation only - move to PPV if no response'
      }
    ]
  },

  assessmentDecisionPoints: [
    {
      time: '30 seconds',
      assess: ['Term gestation?', 'Good muscle tone?', 'Breathing or crying?'],
      ifAllYes: 'Routine care: Dry, clear airway, skin-to-skin, ongoing assessment',
      ifAnyNo: 'Initial steps under radiant warmer: Warm, position, clear airway, dry, stimulate'
    },
    {
      time: '60 seconds',
      assess: ['Breathing or crying?', 'Heart rate ≥100?'],
      ifYes: 'Continue position and monitoring',
      ifNo: 'Begin PPV (positive pressure ventilation)'
    },
    {
      time: '30 seconds of effective PPV',
      assess: ['Heart rate ≥100?'],
      ifYes: 'Continue PPV until spontaneous breathing, then CPAP or free-flow O2',
      ifNo: 'Continue PPV, check technique, consider intubation'
    },
    {
      time: '60 seconds of effective PPV',
      assess: ['Heart rate ≥60?'],
      ifYes: 'Continue PPV',
      ifNo: 'Begin chest compressions with PPV (3:1 ratio)'
    },
    {
      time: '60 seconds of compressions + PPV',
      assess: ['Heart rate ≥60?'],
      ifYes: 'Stop compressions, continue PPV',
      ifNo: 'Epinephrine, consider UVC, volume if hypovolemic'
    }
  ],

  positivePressureVentilation: {
    indications: ['Apnea', 'Gasping', 'Heart rate <100 bpm'],
    technique: {
      rate: '40-60 breaths/min (squeeze...two...three)',
      pressure: '20-25 cmH2O initial (30-40 for first few breaths if needed)',
      tidalVolume: 'Visible chest rise (not excessive)',
      fio2: {
        term: 'Start 21% (room air), titrate to SpO2 targets',
        preterm: 'Start 21-30%, titrate to SpO2 targets'
      }
    },
    mrSopa: {
      description: 'Corrective steps if chest not rising (MR SOPA)',
      steps: [
        { letter: 'M', action: 'Mask adjustment - reposition to get good seal' },
        { letter: 'R', action: 'Reposition airway - sniffing position' },
        { letter: 'S', action: 'Suction mouth then nose' },
        { letter: 'O', action: 'Open mouth slightly' },
        { letter: 'P', action: 'Pressure increase (up to 30-40 cmH2O)' },
        { letter: 'A', action: 'Alternative airway (LMA, ETT)' }
      ]
    },
    spo2Targets: {
      description: 'Target SpO2 by time after birth',
      targets: [
        { time: '1 min', target: '60-65%' },
        { time: '2 min', target: '65-70%' },
        { time: '3 min', target: '70-75%' },
        { time: '4 min', target: '75-80%' },
        { time: '5 min', target: '80-85%' },
        { time: '10 min', target: '85-95%' }
      ],
      note: 'Pre-ductal SpO2 (right hand/wrist)'
    }
  },

  chestCompressions: {
    indication: 'Heart rate <60 bpm despite 30 seconds of effective PPV',
    technique: {
      method: 'Two-thumb encircling hands technique (preferred)',
      alternative: 'Two-finger technique (if access to umbilicus needed)',
      location: 'Lower third of sternum (just below nipple line)',
      depth: 'One-third of AP diameter of chest (~1.5-2 cm)',
      rate: '90 compressions + 30 breaths per minute (3:1 ratio)',
      coordination: '"One-and-two-and-three-and-breathe"'
    },
    oxygenDuringCompressions: 'Increase to 100% FiO2 during compressions',
    stopCriteria: 'Heart rate ≥60 bpm'
  },

  medications: {
    epinephrine: {
      indication: 'Heart rate <60 bpm despite 60 seconds of effective compressions + PPV',
      ivIoRoute: {
        dose: '0.01-0.03 mg/kg (0.1-0.3 mL/kg of 1:10,000)',
        route: 'IV (preferably UVC) or IO',
        preparation: '1:10,000 concentration',
        repeat: 'Every 3-5 minutes if heart rate remains <60'
      },
      etRoute: {
        dose: '0.05-0.1 mg/kg (0.5-1 mL/kg of 1:10,000)',
        route: 'Endotracheal',
        note: 'Less reliable absorption - IV/IO preferred'
      },
      caution: 'Do NOT give IV dose via ET route (too little) or ET dose IV (too much)'
    },
    volumeExpansion: {
      indication: 'Suspected hypovolemia (pale, weak pulses, poor response to resuscitation)',
      dose: '10 mL/kg',
      fluid: 'Normal saline or O-negative blood (uncrossmatched)',
      route: 'UVC or IO',
      rate: 'Over 5-10 minutes',
      repeat: 'May repeat if no improvement'
    },
    dextrose: {
      indication: 'Documented hypoglycemia (<40 mg/dL)',
      dose: 'D10W 2 mL/kg IV',
      note: 'Routine glucose not checked during resuscitation'
    }
  },

  umbilicalVenousCatheter: {
    indication: 'Need for IV access during resuscitation',
    insertion: {
      location: 'Umbilical vein (single thin-walled vessel at 12 o\'clock)',
      depth: 'Insert until blood return, usually 2-4 cm (just past skin)',
      caution: 'Do not advance too far - risk of hepatic injury'
    },
    emergencyPlacement: 'Can be placed quickly even by non-expert in emergency'
  },

  specialSituations: {
    pretermInfant: {
      considerations: [
        'Plastic wrap or bag (head exposed) to prevent heat loss',
        'Gentle ventilation to prevent lung injury',
        'Consider CPAP instead of intubation',
        'Lower FiO2 start (21-30%)',
        'Temperature-controlled environment',
        'Consider delayed cord clamping if vigorous'
      ]
    },
    meconiumStainedFluid: {
      current: 'Do NOT routinely suction trachea',
      action: 'Initial steps as normal. If baby is vigorous (good tone, crying, HR >100): routine care',
      ifNotVigorous: 'Begin PPV. Only intubate for suctioning if airway obstruction suspected'
    },
    congenitalDiaphragmaticHernia: {
      suspicion: 'Scaphoid abdomen, respiratory distress, bowel sounds in chest',
      action: 'Intubate immediately (do NOT bag-mask ventilate - inflates stomach)',
      decompression: 'NG tube to decompress stomach'
    }
  },

  postResuscitationCare: {
    monitoring: [
      'Heart rate (continuous)',
      'Oxygen saturation',
      'Temperature (goal 36.5-37.5°C)',
      'Blood glucose',
      'Respiratory effort',
      'Color and perfusion'
    ],
    documentation: [
      'Time of birth and cord clamping',
      'Apgar scores at 1, 5, (10) minutes',
      'Interventions and timing',
      'Medications given',
      'Response to interventions'
    ],
    whenToTransfer: [
      'Required prolonged PPV',
      'Required chest compressions',
      'Required medications',
      'Preterm (<34 weeks)',
      'Ongoing respiratory support needed',
      'Abnormal neurological status'
    ]
  }
};

// ============================================================
// APGAR SCORING
// ============================================================

export const APGAR_SCORING = {
  name: 'APGAR Score',
  timing: 'Assessed at 1 and 5 minutes; continue every 5 min if score <7',
  components: [
    {
      component: 'Appearance (Color)',
      score0: 'Blue, pale all over',
      score1: 'Body pink, extremities blue (acrocyanosis)',
      score2: 'Completely pink'
    },
    {
      component: 'Pulse (Heart Rate)',
      score0: 'Absent',
      score1: '<100 bpm',
      score2: '≥100 bpm'
    },
    {
      component: 'Grimace (Reflex Irritability)',
      score0: 'No response to stimulation',
      score1: 'Grimace/weak cry on stimulation',
      score2: 'Cry, cough, sneeze, active withdrawal'
    },
    {
      component: 'Activity (Muscle Tone)',
      score0: 'Limp, no movement',
      score1: 'Some flexion of extremities',
      score2: 'Active motion, good flexion'
    },
    {
      component: 'Respiration',
      score0: 'Absent',
      score1: 'Slow, irregular, weak cry',
      score2: 'Good, strong cry'
    }
  ],
  interpretation: {
    '7-10': 'Normal - reassuring',
    '4-6': 'Moderately depressed - needs intervention',
    '0-3': 'Severely depressed - needs resuscitation'
  },
  note: 'APGAR score should NOT delay resuscitation. Assign score retrospectively if needed.'
};

// ============================================================
// RESOURCE-LIMITED ADAPTATION
// ============================================================

export const NRP_RESOURCE_LIMITED = {
  id: 'nrp-resource-limited',
  name: 'Neonatal Resuscitation - Resource-Limited Settings',
  principles: [
    'Warmth is critical - skin-to-skin if no warmer',
    'Room air (21% O2) is effective for most resuscitation',
    'Self-inflating bag can work without oxygen source',
    'Mouth-to-mouth-and-nose if no bag-mask available'
  ],
  minimumEquipment: [
    'Clean towels for drying and warmth',
    'Suction: bulb syringe or DeLee trap',
    'Self-inflating bag (240 mL) with mask',
    'Clock or watch for timing',
    'Stethoscope (or assess pulse at umbilicus)'
  ],
  alternativeTechniques: {
    warmth: 'Skin-to-skin contact, warm room, plastic bag for preterm',
    suction: 'Wipe mouth/nose with cloth if no suction available',
    ventilation: 'Mouth-to-mouth-and-nose if no bag',
    compressions: 'Standard technique - does not require equipment',
    medications: 'May not be available - focus on airway and breathing'
  },
  helpingBabiesBreathe: {
    description: 'WHO/AAP simplified algorithm for low-resource settings',
    keyActions: [
      'Dry the baby thoroughly',
      'Keep warm',
      'Clear airway (position, suction if needed)',
      'Stimulate breathing',
      'Ventilate with bag and mask if not breathing',
      'Achieve "Golden Minute" - baby breathing by 1 minute of life'
    ],
    url: 'https://www.aap.org/en-us/advocacy-and-policy/aap-health-initiatives/helping-babies-survive'
  }
};

// ============================================================
// QUICK REFERENCE CARD
// ============================================================

export const NRP_QUICK_CARD = `
╔════════════════════════════════════════════════════════════════════════════╗
║                NEONATAL RESUSCITATION (NRP) QUICK REFERENCE                ║
╠════════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║  AT BIRTH: Ask 3 Questions                                                 ║
║  ✓ Term gestation?                                                         ║
║  ✓ Good muscle tone?                                                       ║
║  ✓ Breathing or crying?                                                    ║
║                                                                            ║
║  ALL YES → Routine care (dry, skin-to-skin, observe)                       ║
║  ANY NO → Initial steps under warmer                                        ║
║                                                                            ║
╠════════════════════════════════════════════════════════════════════════════╣
║  GOLDEN MINUTE - Initial Steps (30 seconds):                               ║
║  1. WARM - radiant warmer or skin-to-skin                                  ║
║  2. DRY - dry thoroughly, remove wet towels                                ║
║  3. POSITION - sniffing position                                           ║
║  4. CLEAR AIRWAY - suction only if secretions obstruct                     ║
║  5. STIMULATE - rub back, flick soles                                      ║
║                                                                            ║
╠════════════════════════════════════════════════════════════════════════════╣
║  ASSESS: Breathing? HR ≥100?                                               ║
║  NO → START PPV (positive pressure ventilation)                            ║
║       Rate: 40-60/min ("squeeze-two-three")                                ║
║       FiO2: 21% (room air) for term, 21-30% for preterm                    ║
║                                                                            ║
║  If chest not rising → MR SOPA:                                            ║
║  M = Mask adjustment                                                       ║
║  R = Reposition airway                                                     ║
║  S = Suction mouth then nose                                               ║
║  O = Open mouth slightly                                                   ║
║  P = Pressure increase                                                     ║
║  A = Alternative airway (ETT, LMA)                                         ║
║                                                                            ║
╠════════════════════════════════════════════════════════════════════════════╣
║  AFTER 30s PPV: HR ≥60?                                                    ║
║  NO → START COMPRESSIONS + PPV                                             ║
║       3:1 ratio (90 compressions + 30 breaths/min)                         ║
║       "One-and-two-and-three-and-breathe"                                  ║
║       Increase to 100% O2                                                  ║
║                                                                            ║
╠════════════════════════════════════════════════════════════════════════════╣
║  AFTER 60s COMPRESSIONS: HR ≥60?                                           ║
║  NO → EPINEPHRINE                                                          ║
║       IV/UVC: 0.1-0.3 mL/kg of 1:10,000                                    ║
║       (0.01-0.03 mg/kg)                                                    ║
║       Repeat every 3-5 min                                                 ║
║                                                                            ║
║       Consider volume: 10 mL/kg NS if suspected blood loss                 ║
║                                                                            ║
╠════════════════════════════════════════════════════════════════════════════╣
║  TARGET SpO2 (preductal - right hand):                                     ║
║  1 min: 60-65%  │  3 min: 70-75%  │  5 min: 80-85%  │  10 min: 85-95%     ║
║                                                                            ║
╠════════════════════════════════════════════════════════════════════════════╣
║  APGAR SCORE (at 1 and 5 minutes):                                         ║
║  A - Appearance (color): 0/1/2                                             ║
║  P - Pulse (HR): 0/<100/≥100                                              ║
║  G - Grimace (reflex): 0/1/2                                               ║
║  A - Activity (tone): 0/1/2                                                ║
║  R - Respiration: 0/1/2                                                    ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝
`;

export default {
  NRP_ALGORITHM,
  APGAR_SCORING,
  NRP_RESOURCE_LIMITED,
  NRP_QUICK_CARD
};
