/**
 * BROSELOW PEDIATRIC EMERGENCY TAPE - Digital Implementation
 *
 * Color-coded weight-based dosing for pediatric emergencies
 * Based on Broselow-Luten Pediatric Emergency Tape
 *
 * For use when:
 * - Actual weight unknown
 * - Emergency situation requiring rapid dosing
 * - Resource-limited settings
 *
 * References:
 * - Broselow Pediatric Emergency Tape
 * - PALS (Pediatric Advanced Life Support) 2020
 * - WHO Emergency Triage Assessment and Treatment (ETAT)
 */

export type BroselowColor = 'gray' | 'pink' | 'red' | 'purple' | 'yellow' | 'white' | 'blue' | 'orange' | 'green';

export interface BroselowZone {
  color: BroselowColor;
  lengthRange: { min: number; max: number }; // cm
  estimatedWeight: number; // kg
  ageRange: string;
  equipment: EquipmentSizes;
  medications: PediatricMedications;
  fluidBolus: number; // mL for 20 mL/kg
  defibrillation: number; // Joules (2 J/kg)
  cardioversion: number; // Joules (0.5-1 J/kg)
}

export interface EquipmentSizes {
  ettSize: number; // Endotracheal tube (internal diameter mm)
  ettDepth: number; // cm at lip
  laryngoscopeBlade: string;
  bvm: string; // Bag-valve-mask size
  oralAirway: string; // mm
  nasalAirway: string; // mm
  suctionCatheter: string; // French
  ngTube: string; // French
  urinaryCatheter: string; // French
  chestTube: string; // French
  ivCatheter: string; // Gauge
  ioCatheter: string;
  bpCuff: string;
}

export interface PediatricMedications {
  epinephrine: { dose: string; volume: string };
  atropine: { dose: string; volume: string };
  adenosine: { firstDose: string; secondDose: string };
  amiodarone: { dose: string };
  lidocaine: { dose: string };
  dextrose: { dose: string; volume: string };
  naloxone: { dose: string };
  lorazepam: { dose: string };
  diazepam: { dose: string };
  fentanyl: { dose: string };
  ketamine: { dose: string };
  rocuronium: { dose: string };
  succinylcholine: { dose: string };
  ceftriaxone: { dose: string };
  acetaminophen: { dose: string };
  ibuprofen: { dose: string };
}

// ============================================================
// BROSELOW COLOR ZONES
// ============================================================

export const BROSELOW_ZONES: BroselowZone[] = [
  {
    color: 'gray',
    lengthRange: { min: 46, max: 54 },
    estimatedWeight: 3,
    ageRange: 'Newborn (0-1 month)',
    equipment: {
      ettSize: 3.0,
      ettDepth: 9,
      laryngoscopeBlade: 'Miller 0',
      bvm: 'Infant',
      oralAirway: '40',
      nasalAirway: '12F',
      suctionCatheter: '6-8F',
      ngTube: '5F',
      urinaryCatheter: '5F feeding',
      chestTube: '10-12F',
      ivCatheter: '24G',
      ioCatheter: '15mm',
      bpCuff: 'Newborn'
    },
    medications: {
      epinephrine: { dose: '0.03 mg', volume: '0.3 mL of 1:10,000' },
      atropine: { dose: '0.1 mg', volume: '1 mL of 0.1 mg/mL' },
      adenosine: { firstDose: '0.3 mg', secondDose: '0.6 mg' },
      amiodarone: { dose: '15 mg' },
      lidocaine: { dose: '3 mg' },
      dextrose: { dose: '1.5 g', volume: '15 mL of D10W' },
      naloxone: { dose: '0.3 mg' },
      lorazepam: { dose: '0.15 mg' },
      diazepam: { dose: '0.75 mg' },
      fentanyl: { dose: '3 mcg' },
      ketamine: { dose: '6 mg' },
      rocuronium: { dose: '3 mg' },
      succinylcholine: { dose: '6 mg' },
      ceftriaxone: { dose: '150 mg' },
      acetaminophen: { dose: '45 mg' },
      ibuprofen: { dose: 'Not recommended <6 months' }
    },
    fluidBolus: 60,
    defibrillation: 6,
    cardioversion: 2
  },
  {
    color: 'pink',
    lengthRange: { min: 55, max: 66 },
    estimatedWeight: 6,
    ageRange: '3-5 months',
    equipment: {
      ettSize: 3.5,
      ettDepth: 10,
      laryngoscopeBlade: 'Miller 1',
      bvm: 'Infant',
      oralAirway: '50',
      nasalAirway: '14F',
      suctionCatheter: '8F',
      ngTube: '8F',
      urinaryCatheter: '6F',
      chestTube: '14-20F',
      ivCatheter: '22-24G',
      ioCatheter: '15mm',
      bpCuff: 'Infant'
    },
    medications: {
      epinephrine: { dose: '0.06 mg', volume: '0.6 mL of 1:10,000' },
      atropine: { dose: '0.12 mg', volume: '1.2 mL of 0.1 mg/mL' },
      adenosine: { firstDose: '0.6 mg', secondDose: '1.2 mg' },
      amiodarone: { dose: '30 mg' },
      lidocaine: { dose: '6 mg' },
      dextrose: { dose: '3 g', volume: '30 mL of D10W' },
      naloxone: { dose: '0.6 mg' },
      lorazepam: { dose: '0.3 mg' },
      diazepam: { dose: '1.5 mg' },
      fentanyl: { dose: '6 mcg' },
      ketamine: { dose: '12 mg' },
      rocuronium: { dose: '6 mg' },
      succinylcholine: { dose: '12 mg' },
      ceftriaxone: { dose: '300 mg' },
      acetaminophen: { dose: '90 mg' },
      ibuprofen: { dose: '60 mg' }
    },
    fluidBolus: 120,
    defibrillation: 12,
    cardioversion: 4
  },
  {
    color: 'red',
    lengthRange: { min: 67, max: 74 },
    estimatedWeight: 8,
    ageRange: '6-9 months',
    equipment: {
      ettSize: 3.5,
      ettDepth: 11,
      laryngoscopeBlade: 'Miller 1',
      bvm: 'Infant',
      oralAirway: '50',
      nasalAirway: '16F',
      suctionCatheter: '8F',
      ngTube: '8F',
      urinaryCatheter: '8F',
      chestTube: '16-22F',
      ivCatheter: '22-24G',
      ioCatheter: '15mm',
      bpCuff: 'Infant'
    },
    medications: {
      epinephrine: { dose: '0.08 mg', volume: '0.8 mL of 1:10,000' },
      atropine: { dose: '0.16 mg', volume: '1.6 mL of 0.1 mg/mL' },
      adenosine: { firstDose: '0.8 mg', secondDose: '1.6 mg' },
      amiodarone: { dose: '40 mg' },
      lidocaine: { dose: '8 mg' },
      dextrose: { dose: '4 g', volume: '16 mL of D25W' },
      naloxone: { dose: '0.8 mg' },
      lorazepam: { dose: '0.4 mg' },
      diazepam: { dose: '2 mg' },
      fentanyl: { dose: '8 mcg' },
      ketamine: { dose: '16 mg' },
      rocuronium: { dose: '8 mg' },
      succinylcholine: { dose: '16 mg' },
      ceftriaxone: { dose: '400 mg' },
      acetaminophen: { dose: '120 mg' },
      ibuprofen: { dose: '80 mg' }
    },
    fluidBolus: 160,
    defibrillation: 16,
    cardioversion: 5
  },
  {
    color: 'purple',
    lengthRange: { min: 75, max: 84 },
    estimatedWeight: 10,
    ageRange: '10-12 months',
    equipment: {
      ettSize: 4.0,
      ettDepth: 12,
      laryngoscopeBlade: 'Miller 1 or Mac 1',
      bvm: 'Infant/Child',
      oralAirway: '60',
      nasalAirway: '18F',
      suctionCatheter: '8-10F',
      ngTube: '10F',
      urinaryCatheter: '8F',
      chestTube: '20-24F',
      ivCatheter: '22G',
      ioCatheter: '15mm',
      bpCuff: 'Infant/Child'
    },
    medications: {
      epinephrine: { dose: '0.1 mg', volume: '1 mL of 1:10,000' },
      atropine: { dose: '0.2 mg', volume: '2 mL of 0.1 mg/mL' },
      adenosine: { firstDose: '1 mg', secondDose: '2 mg' },
      amiodarone: { dose: '50 mg' },
      lidocaine: { dose: '10 mg' },
      dextrose: { dose: '5 g', volume: '20 mL of D25W' },
      naloxone: { dose: '1 mg' },
      lorazepam: { dose: '0.5 mg' },
      diazepam: { dose: '2.5 mg' },
      fentanyl: { dose: '10 mcg' },
      ketamine: { dose: '20 mg' },
      rocuronium: { dose: '10 mg' },
      succinylcholine: { dose: '20 mg' },
      ceftriaxone: { dose: '500 mg' },
      acetaminophen: { dose: '150 mg' },
      ibuprofen: { dose: '100 mg' }
    },
    fluidBolus: 200,
    defibrillation: 20,
    cardioversion: 6
  },
  {
    color: 'yellow',
    lengthRange: { min: 85, max: 96 },
    estimatedWeight: 12,
    ageRange: '1-2 years',
    equipment: {
      ettSize: 4.0,
      ettDepth: 13,
      laryngoscopeBlade: 'Miller 1 or Mac 1',
      bvm: 'Child',
      oralAirway: '60',
      nasalAirway: '20F',
      suctionCatheter: '10F',
      ngTube: '10F',
      urinaryCatheter: '8F',
      chestTube: '20-28F',
      ivCatheter: '22G',
      ioCatheter: '15-25mm',
      bpCuff: 'Child'
    },
    medications: {
      epinephrine: { dose: '0.12 mg', volume: '1.2 mL of 1:10,000' },
      atropine: { dose: '0.24 mg', volume: '2.4 mL of 0.1 mg/mL' },
      adenosine: { firstDose: '1.2 mg', secondDose: '2.4 mg' },
      amiodarone: { dose: '60 mg' },
      lidocaine: { dose: '12 mg' },
      dextrose: { dose: '6 g', volume: '24 mL of D25W' },
      naloxone: { dose: '1.2 mg' },
      lorazepam: { dose: '0.6 mg' },
      diazepam: { dose: '3 mg' },
      fentanyl: { dose: '12 mcg' },
      ketamine: { dose: '24 mg' },
      rocuronium: { dose: '12 mg' },
      succinylcholine: { dose: '24 mg' },
      ceftriaxone: { dose: '600 mg' },
      acetaminophen: { dose: '180 mg' },
      ibuprofen: { dose: '120 mg' }
    },
    fluidBolus: 240,
    defibrillation: 24,
    cardioversion: 8
  },
  {
    color: 'white',
    lengthRange: { min: 97, max: 110 },
    estimatedWeight: 15,
    ageRange: '2-4 years',
    equipment: {
      ettSize: 4.5,
      ettDepth: 14,
      laryngoscopeBlade: 'Miller 2 or Mac 2',
      bvm: 'Child',
      oralAirway: '70',
      nasalAirway: '22F',
      suctionCatheter: '10F',
      ngTube: '10-12F',
      urinaryCatheter: '10F',
      chestTube: '24-32F',
      ivCatheter: '20-22G',
      ioCatheter: '25mm',
      bpCuff: 'Child'
    },
    medications: {
      epinephrine: { dose: '0.15 mg', volume: '1.5 mL of 1:10,000' },
      atropine: { dose: '0.3 mg', volume: '3 mL of 0.1 mg/mL' },
      adenosine: { firstDose: '1.5 mg', secondDose: '3 mg' },
      amiodarone: { dose: '75 mg' },
      lidocaine: { dose: '15 mg' },
      dextrose: { dose: '7.5 g', volume: '30 mL of D25W' },
      naloxone: { dose: '1.5 mg' },
      lorazepam: { dose: '0.75 mg' },
      diazepam: { dose: '3.75 mg' },
      fentanyl: { dose: '15 mcg' },
      ketamine: { dose: '30 mg' },
      rocuronium: { dose: '15 mg' },
      succinylcholine: { dose: '30 mg' },
      ceftriaxone: { dose: '750 mg' },
      acetaminophen: { dose: '225 mg' },
      ibuprofen: { dose: '150 mg' }
    },
    fluidBolus: 300,
    defibrillation: 30,
    cardioversion: 10
  },
  {
    color: 'blue',
    lengthRange: { min: 111, max: 122 },
    estimatedWeight: 19,
    ageRange: '4-6 years',
    equipment: {
      ettSize: 5.0,
      ettDepth: 15,
      laryngoscopeBlade: 'Miller 2 or Mac 2',
      bvm: 'Child',
      oralAirway: '80',
      nasalAirway: '24F',
      suctionCatheter: '10F',
      ngTube: '12F',
      urinaryCatheter: '10F',
      chestTube: '28-32F',
      ivCatheter: '20-22G',
      ioCatheter: '25mm',
      bpCuff: 'Child'
    },
    medications: {
      epinephrine: { dose: '0.19 mg', volume: '1.9 mL of 1:10,000' },
      atropine: { dose: '0.38 mg', volume: '3.8 mL of 0.1 mg/mL' },
      adenosine: { firstDose: '1.9 mg', secondDose: '3.8 mg' },
      amiodarone: { dose: '95 mg' },
      lidocaine: { dose: '19 mg' },
      dextrose: { dose: '9.5 g', volume: '38 mL of D25W' },
      naloxone: { dose: '1.9 mg' },
      lorazepam: { dose: '0.95 mg' },
      diazepam: { dose: '4.75 mg' },
      fentanyl: { dose: '19 mcg' },
      ketamine: { dose: '38 mg' },
      rocuronium: { dose: '19 mg' },
      succinylcholine: { dose: '38 mg' },
      ceftriaxone: { dose: '950 mg' },
      acetaminophen: { dose: '285 mg' },
      ibuprofen: { dose: '190 mg' }
    },
    fluidBolus: 380,
    defibrillation: 38,
    cardioversion: 12
  },
  {
    color: 'orange',
    lengthRange: { min: 123, max: 136 },
    estimatedWeight: 25,
    ageRange: '6-8 years',
    equipment: {
      ettSize: 5.5,
      ettDepth: 17,
      laryngoscopeBlade: 'Mac 2',
      bvm: 'Child/Adult',
      oralAirway: '80',
      nasalAirway: '26F',
      suctionCatheter: '12F',
      ngTube: '12F',
      urinaryCatheter: '10-12F',
      chestTube: '28-36F',
      ivCatheter: '18-20G',
      ioCatheter: '25mm',
      bpCuff: 'Child/Small Adult'
    },
    medications: {
      epinephrine: { dose: '0.25 mg', volume: '2.5 mL of 1:10,000' },
      atropine: { dose: '0.5 mg', volume: '5 mL of 0.1 mg/mL' },
      adenosine: { firstDose: '2.5 mg', secondDose: '5 mg' },
      amiodarone: { dose: '125 mg' },
      lidocaine: { dose: '25 mg' },
      dextrose: { dose: '12.5 g', volume: '50 mL of D25W' },
      naloxone: { dose: '2 mg' },
      lorazepam: { dose: '1.25 mg' },
      diazepam: { dose: '6.25 mg' },
      fentanyl: { dose: '25 mcg' },
      ketamine: { dose: '50 mg' },
      rocuronium: { dose: '25 mg' },
      succinylcholine: { dose: '50 mg' },
      ceftriaxone: { dose: '1250 mg' },
      acetaminophen: { dose: '375 mg' },
      ibuprofen: { dose: '250 mg' }
    },
    fluidBolus: 500,
    defibrillation: 50,
    cardioversion: 16
  },
  {
    color: 'green',
    lengthRange: { min: 137, max: 150 },
    estimatedWeight: 32,
    ageRange: '8-11 years',
    equipment: {
      ettSize: 6.0,
      ettDepth: 18,
      laryngoscopeBlade: 'Mac 2-3',
      bvm: 'Adult',
      oralAirway: '90',
      nasalAirway: '28F',
      suctionCatheter: '12F',
      ngTube: '14F',
      urinaryCatheter: '12F',
      chestTube: '32-40F',
      ivCatheter: '18-20G',
      ioCatheter: '25mm',
      bpCuff: 'Small Adult'
    },
    medications: {
      epinephrine: { dose: '0.32 mg', volume: '3.2 mL of 1:10,000' },
      atropine: { dose: '0.5 mg (min dose)', volume: '5 mL of 0.1 mg/mL' },
      adenosine: { firstDose: '3.2 mg', secondDose: '6 mg (max first dose)' },
      amiodarone: { dose: '160 mg' },
      lidocaine: { dose: '32 mg' },
      dextrose: { dose: '16 g', volume: '32 mL of D50W' },
      naloxone: { dose: '2 mg' },
      lorazepam: { dose: '1.6 mg' },
      diazepam: { dose: '8 mg' },
      fentanyl: { dose: '32 mcg' },
      ketamine: { dose: '64 mg' },
      rocuronium: { dose: '32 mg' },
      succinylcholine: { dose: '64 mg' },
      ceftriaxone: { dose: '1600 mg' },
      acetaminophen: { dose: '480 mg' },
      ibuprofen: { dose: '320 mg' }
    },
    fluidBolus: 640,
    defibrillation: 64,
    cardioversion: 20
  }
];

// ============================================================
// FUNCTIONS
// ============================================================

/**
 * Get Broselow zone by child's length in cm
 */
export function getBroselowZoneByLength(lengthCm: number): BroselowZone | null {
  return BROSELOW_ZONES.find(zone =>
    lengthCm >= zone.lengthRange.min && lengthCm <= zone.lengthRange.max
  ) || null;
}

/**
 * Get Broselow zone by estimated weight in kg
 */
export function getBroselowZoneByWeight(weightKg: number): BroselowZone | null {
  // Find closest match
  let closestZone = BROSELOW_ZONES[0];
  let closestDiff = Math.abs(weightKg - closestZone.estimatedWeight);

  for (const zone of BROSELOW_ZONES) {
    const diff = Math.abs(weightKg - zone.estimatedWeight);
    if (diff < closestDiff) {
      closestDiff = diff;
      closestZone = zone;
    }
  }

  return closestZone;
}

/**
 * Get Broselow zone by color
 */
export function getBroselowZoneByColor(color: BroselowColor): BroselowZone | null {
  return BROSELOW_ZONES.find(zone => zone.color === color) || null;
}

/**
 * Estimate weight from age using standard formulas
 */
export function estimateWeightFromAge(ageMonths: number): number {
  if (ageMonths < 12) {
    // Infant: (age in months + 9) / 2
    return (ageMonths + 9) / 2;
  } else if (ageMonths < 60) {
    // 1-5 years: 2 * (age in years + 5)
    return 2 * (ageMonths / 12 + 5);
  } else {
    // >5 years: 4 * age in years
    return 4 * (ageMonths / 12);
  }
}

/**
 * Calculate medication dose by weight
 */
export function calculateDose(
  drugName: keyof PediatricMedications,
  weightKg: number,
  dosePerKg: number,
  maxDose?: number
): { dose: number; displayDose: string } {
  let dose = weightKg * dosePerKg;
  if (maxDose && dose > maxDose) {
    dose = maxDose;
  }
  return {
    dose,
    displayDose: `${dose.toFixed(2)} ${getDoseUnit(drugName)}`
  };
}

function getDoseUnit(drugName: string): string {
  const mcgDrugs = ['fentanyl'];
  if (mcgDrugs.includes(drugName.toLowerCase())) {
    return 'mcg';
  }
  return 'mg';
}

// ============================================================
// QUICK REFERENCE
// ============================================================

export const BROSELOW_QUICK_REFERENCE = `
╔════════════════════════════════════════════════════════════════════════════╗
║                    BROSELOW PEDIATRIC TAPE QUICK REFERENCE                 ║
╠════════════════════════════════════════════════════════════════════════════╣
║ COLOR   │ LENGTH (cm) │ WEIGHT │ AGE        │ ETT SIZE │ DEFIB (J)        ║
╠═════════╪═════════════╪════════╪════════════╪══════════╪══════════════════╣
║ GRAY    │ 46-54       │ 3 kg   │ Newborn    │ 3.0      │ 6 J              ║
║ PINK    │ 55-66       │ 6 kg   │ 3-5 mo     │ 3.5      │ 12 J             ║
║ RED     │ 67-74       │ 8 kg   │ 6-9 mo     │ 3.5      │ 16 J             ║
║ PURPLE  │ 75-84       │ 10 kg  │ 10-12 mo   │ 4.0      │ 20 J             ║
║ YELLOW  │ 85-96       │ 12 kg  │ 1-2 yr     │ 4.0      │ 24 J             ║
║ WHITE   │ 97-110      │ 15 kg  │ 2-4 yr     │ 4.5      │ 30 J             ║
║ BLUE    │ 111-122     │ 19 kg  │ 4-6 yr     │ 5.0      │ 38 J             ║
║ ORANGE  │ 123-136     │ 25 kg  │ 6-8 yr     │ 5.5      │ 50 J             ║
║ GREEN   │ 137-150     │ 32 kg  │ 8-11 yr    │ 6.0      │ 64 J             ║
╠════════════════════════════════════════════════════════════════════════════╣
║ UNIVERSAL PEDIATRIC DOSES (dose/kg):                                       ║
║ • Epinephrine: 0.01 mg/kg IV/IO (max 1 mg)                                ║
║ • Atropine: 0.02 mg/kg (min 0.1 mg, max 0.5 mg)                           ║
║ • Adenosine: 0.1 mg/kg (max 6 mg) first dose, 0.2 mg/kg (max 12 mg) 2nd  ║
║ • Amiodarone: 5 mg/kg IV/IO (max 300 mg)                                  ║
║ • Dextrose: 0.5-1 g/kg (D10W 5-10 mL/kg or D25W 2-4 mL/kg)               ║
║ • Fluid bolus: 20 mL/kg NS or LR                                          ║
║ • Defibrillation: 2-4 J/kg                                                ║
║ • Cardioversion: 0.5-1 J/kg                                               ║
╚════════════════════════════════════════════════════════════════════════════╝
`;

export default {
  BROSELOW_ZONES,
  getBroselowZoneByLength,
  getBroselowZoneByWeight,
  getBroselowZoneByColor,
  estimateWeightFromAge,
  calculateDose,
  BROSELOW_QUICK_REFERENCE
};
