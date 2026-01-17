/**
 * Quick Reference Cards
 * One-page visual reference cards for crisis healthcare workers
 * Designed for offline use, printable, and ASCII-compatible
 *
 * These cards cover the most critical emergency protocols
 * in a format that can be quickly referenced during emergencies
 */

export interface QuickReferenceCard {
  id: string;
  title: string;
  category: CardCategory;
  content: string;
  translations: Record<string, string>;
  printable: boolean;
}

export type CardCategory =
  | 'resuscitation'
  | 'trauma'
  | 'pediatric'
  | 'obstetric'
  | 'medical'
  | 'triage'
  | 'drugs';

// ============================================================================
// RESUSCITATION CARDS
// ============================================================================

export const CPR_QUICK_CARD: QuickReferenceCard = {
  id: 'cpr-adult',
  title: 'Adult CPR',
  category: 'resuscitation',
  printable: true,
  translations: {},
  content: `
╔══════════════════════════════════════════════════════════════════════════╗
║                    ADULT CPR QUICK REFERENCE                             ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  CHECK RESPONSE → CALL FOR HELP → START CPR                              ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                         COMPRESSIONS                                     ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  RATE:     100-120 per minute (push fast!)                          │ ║
║  │  DEPTH:    5-6 cm (2-2.4 inches)                                    │ ║
║  │  LOCATION: Center of chest, lower half of sternum                   │ ║
║  │  RECOIL:   Allow FULL chest recoil between compressions             │ ║
║  │  MINIMIZE: Interruptions - keep hands on chest!                     │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                         VENTILATIONS                                     ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  RATIO:    30 compressions : 2 breaths                              │ ║
║  │  TILT:     Head tilt - chin lift (if no spine injury)               │ ║
║  │  SEAL:     Pinch nose, seal mouth                                   │ ║
║  │  BREATHE:  1 second per breath, watch chest rise                    │ ║
║  │  NO BAG?:  Compression-only CPR is acceptable                       │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                         DEFIBRILLATION                                   ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  AED:      Turn on, follow prompts                                  │ ║
║  │  PADS:     Right clavicle, left axilla (apex)                       │ ║
║  │  SHOCK:    Stand clear, deliver shock, resume CPR immediately       │ ║
║  │  MANUAL:   Biphasic 200J, Monophasic 360J                           │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                         DRUGS (ADVANCED)                                 ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  EPINEPHRINE:  1mg IV every 3-5 minutes                             │ ║
║  │  AMIODARONE:   300mg IV first dose, 150mg second                    │ ║
║  │  (for VF/pVT)                                                       │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║  SHOCKABLE: VF/pVT → Shock + CPR + Epi q3-5min + Amio                   ║
║  NON-SHOCK: Asystole/PEA → CPR + Epi q3-5min + Treat cause (H's & T's)  ║
╚══════════════════════════════════════════════════════════════════════════╝
`
};

export const PEDIATRIC_CPR_CARD: QuickReferenceCard = {
  id: 'cpr-pediatric',
  title: 'Pediatric CPR',
  category: 'pediatric',
  printable: true,
  translations: {},
  content: `
╔══════════════════════════════════════════════════════════════════════════╗
║                   PEDIATRIC CPR QUICK REFERENCE                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  AGE DEFINITIONS:                                                        ║
║  • INFANT: <1 year                                                       ║
║  • CHILD: 1 year to puberty                                              ║
║                                                                          ║
╠════════════════════════════════╦═════════════════════════════════════════╣
║         INFANT (<1 yr)         ║           CHILD (1yr-puberty)           ║
╠════════════════════════════════╬═════════════════════════════════════════╣
║                                ║                                         ║
║  COMPRESSIONS:                 ║  COMPRESSIONS:                          ║
║  • 2 fingers OR 2 thumbs       ║  • 1 hand (small child) OR              ║
║    encircling chest            ║    2 hands (larger child)               ║
║  • Lower 1/3 of sternum        ║  • Lower half of sternum                ║
║  • DEPTH: 4 cm (1.5 inches)    ║  • DEPTH: 5 cm (2 inches)               ║
║  • RATE: 100-120/min           ║  • RATE: 100-120/min                    ║
║                                ║                                         ║
║  RATIO:                        ║  RATIO:                                 ║
║  • 1 rescuer: 30:2             ║  • 1 rescuer: 30:2                      ║
║  • 2 rescuers: 15:2            ║  • 2 rescuers: 15:2                     ║
║                                ║                                         ║
║  AED:                          ║  AED:                                   ║
║  • Pediatric pads if available ║  • Adult pads OK (front-back if small) ║
║  • Adult pads OK if no peds    ║  • Reduce energy if manual              ║
║                                ║                                         ║
╠════════════════════════════════╩═════════════════════════════════════════╣
║                                                                          ║
║  VENTILATIONS:                                                           ║
║  • Cover mouth AND nose (infant) or mouth only (child)                   ║
║  • GENTLE breaths - just enough to see chest rise                        ║
║  • 1 breath every 2-3 seconds during CPR                                 ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                         DRUGS (ADVANCED)                                 ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  EPINEPHRINE:  0.01 mg/kg (0.1 ml/kg of 1:10,000) IV/IO             │ ║
║  │                Max single dose: 1mg                                  │ ║
║  │  AMIODARONE:   5 mg/kg IV/IO (max 300mg)                            │ ║
║  │  ATROPINE:     0.02 mg/kg IV (min 0.1mg, max 0.5mg child/1mg teen)  │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║  ⚠️  MOST PEDIATRIC ARRESTS ARE RESPIRATORY → Ventilation is KEY!       ║
╚══════════════════════════════════════════════════════════════════════════╝
`
};

export const NRP_QUICK_CARD: QuickReferenceCard = {
  id: 'nrp-newborn',
  title: 'Newborn Resuscitation (NRP)',
  category: 'pediatric',
  printable: true,
  translations: {},
  content: `
╔══════════════════════════════════════════════════════════════════════════╗
║              NEWBORN RESUSCITATION (NRP) QUICK REFERENCE                 ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  GOLDEN MINUTE: Complete initial steps within 60 seconds                 ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                      INITIAL STEPS (30 seconds)                          ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  W - Warm: Dry, remove wet linen, radiant warmer/skin-to-skin       │ ║
║  │  A - Airway: Position head neutral/"sniffing", clear if needed      │ ║
║  │  D - Dry: Stimulate by drying                                       │ ║
║  │  S - Stimulate: Flick soles, rub back                               │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
║  ASSESS: Breathing? Heart rate? (count for 6 sec x 10)                   ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                   PPV (if HR <100 or apnea/gasping)                      ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  RATE: 40-60 breaths/min (squeeze-release-release)                  │ ║
║  │  PRESSURE: Start 20-25 cmH2O, may need 30-40                        │ ║
║  │  O2: Start with 21% (room air) for term, 21-30% for preterm         │ ║
║  │                                                                     │ ║
║  │  MR SOPA (if not improving):                                        │ ║
║  │    M - Mask adjustment (seal)                                       │ ║
║  │    R - Reposition head (neutral)                                    │ ║
║  │    S - Suction mouth then nose                                      │ ║
║  │    O - Open mouth (jaw thrust)                                      │ ║
║  │    P - Pressure increase                                            │ ║
║  │    A - Alternative airway (LMA, ETT)                                │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║            CHEST COMPRESSIONS (if HR <60 despite PPV with O2)            ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  TECHNIQUE: 2 thumbs encircling, lower 1/3 sternum                  │ ║
║  │  DEPTH: 1/3 AP diameter of chest                                    │ ║
║  │  RATIO: 3 compressions : 1 breath (90:30 per minute)                │ ║
║  │  INCREASE O2: 100% during compressions                              │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║              EPINEPHRINE (if HR <60 despite compressions)                ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  IV/UVC: 0.01-0.03 mg/kg (1:10,000) = 0.1-0.3 ml/kg                 │ ║
║  │  ETT:    0.05-0.1 mg/kg (1:10,000) = 0.5-1 ml/kg (less preferred)   │ ║
║  │  REPEAT: Every 3-5 minutes if HR remains <60                        │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║  SpO2 TARGETS (preductal - right hand):                                  ║
║  1 min: 60-65%  │  3 min: 70-75%  │  5 min: 80-85%  │  10 min: 85-95%   ║
╚══════════════════════════════════════════════════════════════════════════╝
`
};

// ============================================================================
// TRAUMA CARDS
// ============================================================================

export const TRAUMA_QUICK_CARD: QuickReferenceCard = {
  id: 'trauma-primary',
  title: 'Trauma Primary Survey',
  category: 'trauma',
  printable: true,
  translations: {},
  content: `
╔══════════════════════════════════════════════════════════════════════════╗
║                    TRAUMA PRIMARY SURVEY (ABCDE)                         ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  A - AIRWAY (with C-spine protection)                                    ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  • Talk to patient - if responds clearly, airway open               │ ║
║  │  • Look for obstruction (blood, vomit, teeth, foreign body)         │ ║
║  │  • Listen for stridor, gurgling                                     │ ║
║  │  • Jaw thrust if unconscious (maintain C-spine)                     │ ║
║  │  • Suction if needed                                                │ ║
║  │  • Consider definitive airway if GCS ≤8                             │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
║  B - BREATHING                                                           ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  • Expose chest completely                                          │ ║
║  │  • Look: symmetry, wounds, paradoxical movement                     │ ║
║  │  • Listen: bilateral breath sounds                                  │ ║
║  │  • Feel: trachea midline, crepitus, tenderness                      │ ║
║  │                                                                     │ ║
║  │  TREAT IMMEDIATELY:                                                 │ ║
║  │  • Tension pneumo → Needle decompress 2nd ICS MCL                   │ ║
║  │  • Open pneumo → 3-sided occlusive dressing                         │ ║
║  │  • Massive hemothorax → Chest tube                                  │ ║
║  │  • Flail chest → Supportive, pain control                           │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
║  C - CIRCULATION (hemorrhage control)                                    ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  • Control obvious external bleeding (pressure, tourniquet)         │ ║
║  │  • Assess: pulse rate/quality, skin color, cap refill               │ ║
║  │  • 2 large bore IV, warmed fluids                                   │ ║
║  │  • Pelvic binder if suspected pelvic fracture                       │ ║
║  │  • TXA 1g IV if within 3 hours                                      │ ║
║  │  • Permissive hypotension: target SBP 90 (100 if TBI)               │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
║  D - DISABILITY                                                          ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  • GCS (Eyes + Verbal + Motor)                                      │ ║
║  │  • Pupils: size, symmetry, reactivity                               │ ║
║  │  • Gross motor function all 4 limbs                                 │ ║
║  │  • Blood glucose                                                    │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
║  E - EXPOSURE / ENVIRONMENT                                              ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  • Remove all clothing for complete exam                            │ ║
║  │  • Log roll - examine back                                          │ ║
║  │  • PREVENT HYPOTHERMIA - warm blankets, warm room, warm fluids      │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
`
};

export const HEMORRHAGE_CONTROL_CARD: QuickReferenceCard = {
  id: 'hemorrhage-control',
  title: 'Hemorrhage Control',
  category: 'trauma',
  printable: true,
  translations: {},
  content: `
╔══════════════════════════════════════════════════════════════════════════╗
║                     HEMORRHAGE CONTROL QUICK CARD                        ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  TCCC/MARCH: M-assive hemorrhage first!                                  ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                         EXTREMITY BLEEDING                               ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  1. DIRECT PRESSURE (if controllable)                               │ ║
║  │  2. TOURNIQUET (if life-threatening):                               │ ║
║  │     • Apply 2-3 inches ABOVE wound                                  │ ║
║  │     • Tighten until bleeding STOPS                                  │ ║
║  │     • Note TIME of application                                      │ ║
║  │     • Do NOT cover - must remain visible                            │ ║
║  │     • Second tourniquet if first doesn't control                    │ ║
║  │  3. Safe time: <2 hours, extended: up to 6 hours                    │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                     JUNCTIONAL/TRUNCAL BLEEDING                          ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  WOUND PACKING:                                                     │ ║
║  │  1. Expose wound completely                                         │ ║
║  │  2. Pack gauze (hemostatic if available) DEEP into wound            │ ║
║  │  3. Pack TIGHTLY, fill entire cavity                                │ ║
║  │  4. Apply direct pressure 3+ minutes                                │ ║
║  │  5. Apply pressure dressing                                         │ ║
║  │  6. Do NOT remove to check - if saturated, pack more on top         │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                        INTERNAL BLEEDING                                 ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  CHEST: Chest tube for hemothorax (>1500ml = thoracotomy)           │ ║
║  │  ABDOMEN: Surgical emergency - cannot control externally            │ ║
║  │  PELVIS: Pelvic binder - apply at level of greater trochanters     │ ║
║  │  LONG BONES: Splint, traction splint for femur                      │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                            RESUSCITATION                                 ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  TXA: 1g IV within 3 hours (reduces mortality 30%)                  │ ║
║  │  FLUIDS: Permissive hypotension - target SBP 90                     │ ║
║  │          (SBP 100-110 if TBI suspected)                             │ ║
║  │  BLOOD: Whole blood or 1:1:1 (RBC:FFP:Platelets) if available       │ ║
║  │  WARM: All fluids warmed, prevent hypothermia                       │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║  LETHAL TRIAD: Hypothermia + Acidosis + Coagulopathy → Prevent!         ║
╚══════════════════════════════════════════════════════════════════════════╝
`
};

// ============================================================================
// OBSTETRIC CARDS
// ============================================================================

export const PPH_QUICK_CARD: QuickReferenceCard = {
  id: 'pph-emergency',
  title: 'Postpartum Hemorrhage',
  category: 'obstetric',
  printable: true,
  translations: {},
  content: `
╔══════════════════════════════════════════════════════════════════════════╗
║                 POSTPARTUM HEMORRHAGE (PPH) QUICK CARD                   ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  DEFINITION: Blood loss >500ml vaginal / >1000ml cesarean               ║
║  SEVERE: >1000ml OR signs of shock                                       ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                        4 T's - FIND THE CAUSE                            ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  T - TONE (70%)     → Uterine atony - boggy uterus                  │ ║
║  │  T - TRAUMA (20%)   → Lacerations, hematoma, uterine rupture        │ ║
║  │  T - TISSUE (10%)   → Retained placenta/membranes                   │ ║
║  │  T - THROMBIN (<1%) → Coagulopathy (DIC, inherited)                 │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                      IMMEDIATE MANAGEMENT                                ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  CALL FOR HELP - this is an emergency!                              │ ║
║  │  ABC: Airway, Breathing, Circulation                                │ ║
║  │  2 LARGE BORE IV - fluids wide open                                 │ ║
║  │  FUNDAL MASSAGE - rub the fundus vigorously                         │ ║
║  │  EMPTY BLADDER - catheterize                                        │ ║
║  │  EXAMINE: Check for tears, retained tissue                          │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                      UTEROTONICS LADDER                                  ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  1. OXYTOCIN: 10 IU IM or 20 IU in 1L at 250ml/hr                   │ ║
║  │  2. ERGOMETRINE: 0.5mg IM (NOT if hypertensive)                     │ ║
║  │  3. CARBOPROST: 0.25mg IM q15min (max 8 doses, NOT if asthma)       │ ║
║  │  4. MISOPROSTOL: 800-1000mcg SL/PR                                  │ ║
║  │  5. TXA: 1g IV (within 3 hours of delivery)                         │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                      MECHANICAL INTERVENTIONS                            ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  • BIMANUAL COMPRESSION: One hand in vagina, one on abdomen         │ ║
║  │  • AORTIC COMPRESSION: Fist above umbilicus, compress to spine      │ ║
║  │  • BALLOON TAMPONADE: Foley or condom catheter inflated in uterus   │ ║
║  │  • UTERINE PACKING: If balloon unavailable                          │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                      SURGICAL (if above fails)                           ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  • B-Lynch suture                                                   │ ║
║  │  • Uterine artery ligation                                          │ ║
║  │  • Internal iliac artery ligation                                   │ ║
║  │  • Hysterectomy (last resort)                                       │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
`
};

export const ECLAMPSIA_QUICK_CARD: QuickReferenceCard = {
  id: 'eclampsia-emergency',
  title: 'Eclampsia Management',
  category: 'obstetric',
  printable: true,
  translations: {},
  content: `
╔══════════════════════════════════════════════════════════════════════════╗
║                    ECLAMPSIA EMERGENCY QUICK CARD                        ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  ECLAMPSIA = Seizures in pregnancy with pre-eclampsia features          ║
║  (or within 7 days postpartum)                                           ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                       DURING SEIZURE                                     ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  • CALL FOR HELP                                                    │ ║
║  │  • LEFT LATERAL position (protect airway, improve placental flow)   │ ║
║  │  • Protect from injury - do NOT restrain                            │ ║
║  │  • Suction if needed after seizure                                  │ ║
║  │  • Time the seizure                                                 │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                   MAGNESIUM SULFATE PROTOCOL                             ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  LOADING DOSE:                                                      │ ║
║  │    • 4g IV over 15-20 minutes (20ml of 20% or 8ml of 50%)           │ ║
║  │    • PLUS 5g IM in each buttock (10g total IM)                      │ ║
║  │                                                                     │ ║
║  │  MAINTENANCE:                                                       │ ║
║  │    • 1g/hour IV continuous infusion                                 │ ║
║  │    • OR 5g IM every 4 hours (alternating buttocks)                  │ ║
║  │                                                                     │ ║
║  │  CONTINUE: For 24 hours after delivery or last seizure              │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                   MgSO4 TOXICITY MONITORING                              ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  CHECK BEFORE EACH DOSE:                                            │ ║
║  │  1. Respiratory rate >12/min     ✓                                  │ ║
║  │  2. Urine output >25ml/hour      ✓                                  │ ║
║  │  3. Patellar reflexes present    ✓                                  │ ║
║  │                                                                     │ ║
║  │  If ANY absent → HOLD MgSO4 and reassess                            │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                        MgSO4 TOXICITY                                    ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  SIGNS: Loss of reflexes → Respiratory depression → Cardiac arrest  │ ║
║  │                                                                     │ ║
║  │  ANTIDOTE: CALCIUM GLUCONATE                                        │ ║
║  │    • 1g (10ml of 10%) IV over 5-10 minutes                          │ ║
║  │    • Keep at bedside!                                               │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                   BLOOD PRESSURE CONTROL                                 ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  TARGET: <160/110 mmHg (avoid rapid drops)                          │ ║
║  │                                                                     │ ║
║  │  LABETALOL: 20mg IV, then 40mg, then 80mg q10min (max 300mg)        │ ║
║  │  HYDRALAZINE: 5mg IV q15-20min (max 20mg)                           │ ║
║  │  NIFEDIPINE: 10-20mg PO q30min (if no IV access)                    │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║  ⚠️  DEFINITIVE TREATMENT = DELIVERY (stabilize, then deliver)          ║
╚══════════════════════════════════════════════════════════════════════════╝
`
};

// ============================================================================
// MEDICAL EMERGENCIES
// ============================================================================

export const ANAPHYLAXIS_QUICK_CARD: QuickReferenceCard = {
  id: 'anaphylaxis',
  title: 'Anaphylaxis',
  category: 'medical',
  printable: true,
  translations: {},
  content: `
╔══════════════════════════════════════════════════════════════════════════╗
║                    ANAPHYLAXIS QUICK REFERENCE                           ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  DIAGNOSIS: Acute onset (minutes to hours) with skin involvement         ║
║  PLUS respiratory compromise OR hypotension OR GI symptoms               ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                    EPINEPHRINE - FIRST LINE                              ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │                                                                     │ ║
║  │  ROUTE: INTRAMUSCULAR - Lateral thigh (anterolateral)               │ ║
║  │                                                                     │ ║
║  │  DOSE (1:1000 = 1mg/ml):                                            │ ║
║  │  ┌─────────────────────────────────────────────────────────────┐   │ ║
║  │  │  ADULT:        0.5 mg IM (0.5 ml)                           │   │ ║
║  │  │  CHILD >12yr:  0.5 mg IM (0.5 ml)                           │   │ ║
║  │  │  CHILD 6-12yr: 0.3 mg IM (0.3 ml)                           │   │ ║
║  │  │  CHILD <6yr:   0.15 mg IM (0.15 ml)                         │   │ ║
║  │  └─────────────────────────────────────────────────────────────┘   │ ║
║  │                                                                     │ ║
║  │  REPEAT: Every 5-15 minutes if no improvement                       │ ║
║  │                                                                     │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                      SUPPORTIVE MEASURES                                 ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  POSITION:                                                          │ ║
║  │    • Hypotensive → Supine with legs elevated                        │ ║
║  │    • Dyspneic → Sitting up                                          │ ║
║  │    • Unconscious → Recovery position                                │ ║
║  │                                                                     │ ║
║  │  AIRWAY:                                                            │ ║
║  │    • High-flow oxygen                                               │ ║
║  │    • Prepare for intubation if stridor/swelling                     │ ║
║  │    • Early intubation if airway compromise                          │ ║
║  │                                                                     │ ║
║  │  CIRCULATION:                                                       │ ║
║  │    • IV access - large bore                                         │ ║
║  │    • Fluid bolus: 20ml/kg crystalloid (repeat PRN)                  │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                      ADJUNCT MEDICATIONS                                 ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │  ANTIHISTAMINE (H1): Diphenhydramine 25-50mg IV/IM                  │ ║
║  │  ANTIHISTAMINE (H2): Ranitidine 50mg IV (optional)                  │ ║
║  │  STEROID: Hydrocortisone 200mg IV (prevents biphasic reaction)      │ ║
║  │  BRONCHODILATOR: Salbutamol nebulized if wheeze                     │ ║
║  │                                                                     │ ║
║  │  ⚠️ These are ADJUNCTS - DO NOT delay epinephrine!                  │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║  REFRACTORY: Epinephrine infusion 1-10 mcg/min (ICU if possible)        ║
║  OBSERVE: Minimum 6-8 hours (up to 24h if severe) - biphasic reaction   ║
╚══════════════════════════════════════════════════════════════════════════╝
`
};

// ============================================================================
// TRIAGE CARDS
// ============================================================================

export const START_TRIAGE_CARD: QuickReferenceCard = {
  id: 'start-triage',
  title: 'START Triage',
  category: 'triage',
  printable: true,
  translations: {},
  content: `
╔══════════════════════════════════════════════════════════════════════════╗
║                      START TRIAGE ALGORITHM                              ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║                    ┌─────────────────────┐                               ║
║                    │   CAN THEY WALK?    │                               ║
║                    └─────────┬───────────┘                               ║
║                              │                                           ║
║              ┌───────────────┴───────────────┐                           ║
║              │YES                            │NO                         ║
║              ▼                               ▼                           ║
║       ┌──────────┐              ┌────────────────────┐                   ║
║       │  MINOR   │              │   ARE THEY        │                   ║
║       │  GREEN   │              │   BREATHING?      │                   ║
║       └──────────┘              └─────────┬──────────┘                   ║
║                                           │                              ║
║                          ┌────────────────┴────────────────┐             ║
║                          │NO                               │YES          ║
║                          ▼                                 ▼             ║
║              ┌──────────────────────┐         ┌────────────────────┐     ║
║              │   OPEN AIRWAY        │         │   RESPIRATORY      │     ║
║              │   (head tilt/chin)   │         │   RATE?            │     ║
║              └──────────┬───────────┘         └─────────┬──────────┘     ║
║                         │                               │                ║
║         ┌───────────────┴───────────┐        ┌──────────┴──────────┐     ║
║         │NO                         │YES     │>30/min              │<30  ║
║         ▼                           ▼        ▼                     ▼     ║
║   ┌──────────┐              ┌──────────┐ ┌──────────┐    ┌─────────────┐ ║
║   │EXPECTANT │              │IMMEDIATE │ │IMMEDIATE │    │ PERFUSION?  │ ║
║   │  BLACK   │              │   RED    │ │   RED    │    │(radial pulse│ ║
║   └──────────┘              └──────────┘ └──────────┘    │/cap refill) │ ║
║                                                          └──────┬──────┘ ║
║                                                                 │        ║
║                                            ┌────────────────────┴────┐   ║
║                                            │NO radial/              │YES ║
║                                            │cap refill >2sec        │    ║
║                                            ▼                        ▼    ║
║                                     ┌──────────┐          ┌───────────┐  ║
║                                     │IMMEDIATE │          │ FOLLOWS   │  ║
║                                     │   RED    │          │ COMMANDS? │  ║
║                                     └──────────┘          └─────┬─────┘  ║
║                                                                 │        ║
║                                              ┌──────────────────┴────┐   ║
║                                              │NO                     │YES║
║                                              ▼                       ▼   ║
║                                       ┌──────────┐           ┌──────────┐║
║                                       │IMMEDIATE │           │ DELAYED  │║
║                                       │   RED    │           │  YELLOW  │║
║                                       └──────────┘           └──────────┘║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║  RED (Immediate): Life-threatening, needs immediate intervention         ║
║  YELLOW (Delayed): Serious but can wait 1-2 hours                        ║
║  GREEN (Minor): Walking wounded, can wait hours                          ║
║  BLACK (Expectant): Unlikely to survive / Dead                           ║
╚══════════════════════════════════════════════════════════════════════════╝
`
};

// ============================================================================
// DRUG REFERENCE CARDS
// ============================================================================

export const EMERGENCY_DRUGS_CARD: QuickReferenceCard = {
  id: 'emergency-drugs',
  title: 'Emergency Drug Doses',
  category: 'drugs',
  printable: true,
  translations: {},
  content: `
╔══════════════════════════════════════════════════════════════════════════╗
║                     EMERGENCY DRUG QUICK REFERENCE                       ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  DRUG              │ ADULT DOSE           │ PEDIATRIC DOSE               ║
╠════════════════════╪══════════════════════╪══════════════════════════════╣
║                    │                      │                              ║
║  EPINEPHRINE       │                      │                              ║
║   Anaphylaxis      │ 0.5mg IM (1:1000)    │ 0.01mg/kg IM (max 0.5mg)     ║
║   Cardiac arrest   │ 1mg IV q3-5min       │ 0.01mg/kg IV q3-5min         ║
║                    │                      │                              ║
║  ATROPINE          │ 0.5mg IV q3-5min     │ 0.02mg/kg IV (min 0.1mg)     ║
║   (bradycardia)    │ (max 3mg)            │ (max 0.5mg child, 1mg teen)  ║
║                    │                      │                              ║
║  AMIODARONE        │ 300mg IV (VF/pVT)    │ 5mg/kg IV (max 300mg)        ║
║   (cardiac arrest) │ then 150mg           │                              ║
║                    │                      │                              ║
║  ADENOSINE         │ 6mg rapid IV push    │ 0.1mg/kg (max 6mg first)     ║
║   (SVT)            │ then 12mg x 2        │ 0.2mg/kg (max 12mg second)   ║
║                    │                      │                              ║
║  NALOXONE          │ 0.4-2mg IV/IM/IN     │ 0.1mg/kg IV/IM/IN            ║
║   (opioid OD)      │ q2-3min PRN          │ (max 2mg)                    ║
║                    │                      │                              ║
║  DEXTROSE 50%      │ 25-50ml IV           │ D10W: 2-4ml/kg IV            ║
║   (hypoglycemia)   │ (=12.5-25g)          │ Neonate: 2ml/kg              ║
║                    │                      │                              ║
║  CALCIUM GLUCONATE │ 10ml of 10% IV       │ 0.5ml/kg of 10% IV           ║
║   (hyperK, Mg tox) │ over 5-10min         │ (max 10ml)                   ║
║                    │                      │                              ║
║  MAGNESIUM SULFATE │ 4g IV load           │ 25-50mg/kg IV                ║
║   (eclampsia)      │ + 1g/hr maintenance  │ (max 2g)                     ║
║   (torsades)       │ 2g IV over 5-20min   │                              ║
║                    │                      │                              ║
║  HYDROCORTISONE    │ 200mg IV             │ 2-4mg/kg IV                  ║
║   (adrenal crisis) │ q6h                  │ (max 100mg)                  ║
║                    │                      │                              ║
║  OXYTOCIN          │ 10 IU IM or          │ N/A                          ║
║   (PPH)            │ 20 IU in 1L IV       │                              ║
║                    │                      │                              ║
║  TXA               │ 1g IV over 10min     │ 15mg/kg IV                   ║
║   (trauma <3hr)    │ +1g over 8hrs        │ (max 1g)                     ║
║                    │                      │                              ║
║  KETAMINE          │ 1-2mg/kg IV (induc)  │ 1-2mg/kg IV                  ║
║   (sedation)       │ 0.5mg/kg (analgesia) │ 3-5mg/kg IM                  ║
║                    │                      │                              ║
╚══════════════════════════════════════════════════════════════════════════╝
`
};

// ============================================================================
// COLLECTION OF ALL CARDS
// ============================================================================

export const QUICK_REFERENCE_CARDS: QuickReferenceCard[] = [
  CPR_QUICK_CARD,
  PEDIATRIC_CPR_CARD,
  NRP_QUICK_CARD,
  TRAUMA_QUICK_CARD,
  HEMORRHAGE_CONTROL_CARD,
  PPH_QUICK_CARD,
  ECLAMPSIA_QUICK_CARD,
  ANAPHYLAXIS_QUICK_CARD,
  START_TRIAGE_CARD,
  EMERGENCY_DRUGS_CARD
];

export function getCardById(id: string): QuickReferenceCard | undefined {
  return QUICK_REFERENCE_CARDS.find(card => card.id === id);
}

export function getCardsByCategory(category: CardCategory): QuickReferenceCard[] {
  return QUICK_REFERENCE_CARDS.filter(card => card.category === category);
}

export default {
  QUICK_REFERENCE_CARDS,
  getCardById,
  getCardsByCategory
};
