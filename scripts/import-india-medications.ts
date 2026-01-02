#!/usr/bin/env npx tsx
/**
 * India Medication Data Importer - Darwin-MFC
 * ============================================
 *
 * Imports medication data from the Indian Medicine Dataset (GitHub)
 * and cross-references with NLEM 2022 essential medicines list.
 *
 * Data Sources:
 * - Primary: https://github.com/junioralive/Indian-Medicine-Dataset
 * - Cross-reference: NLEM 2022 (hardcoded essential medicines list)
 *
 * Usage:
 *   npx tsx scripts/import-india-medications.ts [--dry-run] [--limit=5000]
 *
 * Options:
 *   --dry-run       Preview changes without writing files
 *   --limit=N       Limit to first N medications (default: 5000)
 *
 * Output:
 *   lib/data/regions/india/medications.ts - Regional medication overlays
 */

import * as fs from 'fs';
import * as path from 'path';

// =============================================================================
// CONFIGURATION
// =============================================================================

const INDIAN_MEDICINES_URL =
  'https://raw.githubusercontent.com/junioralive/Indian-Medicine-Dataset/main/DATA/indian_medicine_data.json';

const OUTPUT_DIR = path.join(process.cwd(), 'lib/data/regions/india');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'medications.ts');

const DEFAULT_LIMIT = 5000;

// =============================================================================
// TYPES
// =============================================================================

/**
 * Raw medicine data structure from GitHub Indian Medicine Dataset
 */
interface IndianMedicineRaw {
  id?: number;
  name: string;
  'price(Rs.)'?: number;
  Is_discontinued?: string;
  manufacturer_name?: string;
  type?: string;
  pack_size_label?: string;
  short_composition1?: string;
  short_composition2?: string;
  // Additional fields from newer dataset versions
  use?: string | string[];
  therapeutic_class?: string;
  side_effects?: string | string[];
  substitute?: string | string[];
}

/**
 * Mapped India regional overlay structure for Darwin-MFC
 */
interface IndiaRegionalMedicationOverlay {
  medicationId: string;
  region: 'IN';
  localGenericName: string;
  commercialNames: string[];
  approvalStatus: 'approved' | 'restricted' | 'not_available';
  availableInPublicSystem: boolean;
  publicSystemName?: string;
  presentations: Array<{
    forma: string;
    concentracao: string;
    quantidade?: string;
    disponivelSistemaPublico: boolean;
    precoReferencia?: {
      min: number;
      max: number;
      currency: string;
    };
  }>;
  registrationNumber?: string;
  prescribingRestrictions?: string[];
  localTherapeuticClass?: string;
  lastUpdate?: string;
  // India-specific fields
  nlemIncluded: boolean;
  nlemCategory?: string;
  janAushadhiAvailable: boolean;
  // Additional metadata
  manufacturer?: string;
  composition?: string[];
  indications?: string[];
  tags?: string[];
  priceINR?: number;
  isDiscontinued?: boolean;
}

/**
 * Therapeutic class mapping type
 */
type ClasseTerapeutica =
  | 'gastrointestinal'
  | 'anticoagulante'
  | 'anti_hipertensivo'
  | 'hormonio'
  | 'antibiotico'
  | 'imunossupressor'
  | 'anti_inflamatorio'
  | 'analgesico'
  | 'antiparasitario'
  | 'broncodilatador'
  | 'antidiabetico'
  | 'antifungico'
  | 'antiviral'
  | 'diuretico'
  | 'antidepressivo'
  | 'ansiolitico'
  | 'antipsicotico'
  | 'anticonvulsivante'
  | 'vitamina'
  | 'anti_histaminico'
  | 'corticoide'
  | 'outros';

// =============================================================================
// NLEM 2022 ESSENTIAL MEDICINES LIST (Hardcoded)
// =============================================================================

/**
 * NLEM 2022 - National List of Essential Medicines of India
 * 384 medicines across 27 therapeutic categories
 * Healthcare Levels: P (Primary), S (Secondary), T (Tertiary)
 *
 * Source: Ministry of Health & Family Welfare, Government of India
 * https://cdsco.gov.in/opencms/resources/UploadCDSCOWeb/2018/UploadConsumer/nlem2022.pdf
 */
const NLEM_2022_MEDICINES: Record<string, { category: string; level: string }> = {
  // Analgesics, Antipyretics, NSAIDs
  'paracetamol': { category: 'Analgesics/Antipyretics', level: 'P' },
  'acetylsalicylic acid': { category: 'Analgesics/Antipyretics', level: 'P' },
  'aspirin': { category: 'Analgesics/Antipyretics', level: 'P' },
  'ibuprofen': { category: 'Analgesics/Antipyretics', level: 'P' },
  'diclofenac': { category: 'NSAIDs', level: 'P' },
  'morphine': { category: 'Opioid Analgesics', level: 'S' },
  'tramadol': { category: 'Opioid Analgesics', level: 'S' },
  'fentanyl': { category: 'Opioid Analgesics', level: 'T' },

  // Antiallergics and Antihistamines
  'cetirizine': { category: 'Antihistamines', level: 'P' },
  'chlorpheniramine': { category: 'Antihistamines', level: 'P' },
  'loratadine': { category: 'Antihistamines', level: 'P' },
  'promethazine': { category: 'Antihistamines', level: 'S' },
  'epinephrine': { category: 'Antiallergics', level: 'P' },
  'adrenaline': { category: 'Antiallergics', level: 'P' },
  'hydrocortisone': { category: 'Corticosteroids', level: 'P' },
  'dexamethasone': { category: 'Corticosteroids', level: 'P' },
  'prednisolone': { category: 'Corticosteroids', level: 'P' },

  // Antidotes
  'atropine': { category: 'Antidotes', level: 'P' },
  'naloxone': { category: 'Antidotes', level: 'S' },
  'activated charcoal': { category: 'Antidotes', level: 'P' },
  'pralidoxime': { category: 'Antidotes', level: 'S' },

  // Anticonvulsants/Antiepileptics
  'phenytoin': { category: 'Anticonvulsants', level: 'P' },
  'phenobarbital': { category: 'Anticonvulsants', level: 'P' },
  'carbamazepine': { category: 'Anticonvulsants', level: 'P' },
  'valproic acid': { category: 'Anticonvulsants', level: 'P' },
  'sodium valproate': { category: 'Anticonvulsants', level: 'P' },
  'levetiracetam': { category: 'Anticonvulsants', level: 'S' },
  'diazepam': { category: 'Anticonvulsants', level: 'P' },
  'lorazepam': { category: 'Anticonvulsants', level: 'S' },
  'magnesium sulfate': { category: 'Anticonvulsants', level: 'P' },

  // Anti-infective Medicines - Antibacterials
  'amoxicillin': { category: 'Antibiotics', level: 'P' },
  'ampicillin': { category: 'Antibiotics', level: 'P' },
  'benzylpenicillin': { category: 'Antibiotics', level: 'P' },
  'penicillin': { category: 'Antibiotics', level: 'P' },
  'cloxacillin': { category: 'Antibiotics', level: 'P' },
  'amoxicillin + clavulanic acid': { category: 'Antibiotics', level: 'S' },
  'amoxyclav': { category: 'Antibiotics', level: 'S' },
  'cefixime': { category: 'Antibiotics', level: 'P' },
  'ceftriaxone': { category: 'Antibiotics', level: 'S' },
  'cefotaxime': { category: 'Antibiotics', level: 'S' },
  'cefuroxime': { category: 'Antibiotics', level: 'S' },
  'cephalexin': { category: 'Antibiotics', level: 'P' },
  'azithromycin': { category: 'Antibiotics', level: 'P' },
  'erythromycin': { category: 'Antibiotics', level: 'P' },
  'clarithromycin': { category: 'Antibiotics', level: 'S' },
  'ciprofloxacin': { category: 'Antibiotics', level: 'P' },
  'ofloxacin': { category: 'Antibiotics', level: 'P' },
  'levofloxacin': { category: 'Antibiotics', level: 'S' },
  'norfloxacin': { category: 'Antibiotics', level: 'P' },
  'gentamicin': { category: 'Antibiotics', level: 'S' },
  'amikacin': { category: 'Antibiotics', level: 'S' },
  'doxycycline': { category: 'Antibiotics', level: 'P' },
  'tetracycline': { category: 'Antibiotics', level: 'P' },
  'metronidazole': { category: 'Antibiotics', level: 'P' },
  'tinidazole': { category: 'Antibiotics', level: 'P' },
  'nitrofurantoin': { category: 'Antibiotics', level: 'P' },
  'cotrimoxazole': { category: 'Antibiotics', level: 'P' },
  'trimethoprim': { category: 'Antibiotics', level: 'P' },
  'sulfamethoxazole': { category: 'Antibiotics', level: 'P' },
  'chloramphenicol': { category: 'Antibiotics', level: 'S' },
  'clindamycin': { category: 'Antibiotics', level: 'S' },
  'vancomycin': { category: 'Antibiotics', level: 'T' },
  'linezolid': { category: 'Antibiotics', level: 'T' },
  'meropenem': { category: 'Antibiotics', level: 'T' },
  'imipenem': { category: 'Antibiotics', level: 'T' },
  'piperacillin': { category: 'Antibiotics', level: 'T' },
  'colistin': { category: 'Antibiotics', level: 'T' },

  // Anti-TB Medicines
  'isoniazid': { category: 'Anti-TB', level: 'P' },
  'rifampicin': { category: 'Anti-TB', level: 'P' },
  'pyrazinamide': { category: 'Anti-TB', level: 'P' },
  'ethambutol': { category: 'Anti-TB', level: 'P' },
  'streptomycin': { category: 'Anti-TB', level: 'S' },

  // Antifungals
  'fluconazole': { category: 'Antifungals', level: 'P' },
  'clotrimazole': { category: 'Antifungals', level: 'P' },
  'miconazole': { category: 'Antifungals', level: 'P' },
  'nystatin': { category: 'Antifungals', level: 'P' },
  'ketoconazole': { category: 'Antifungals', level: 'S' },
  'itraconazole': { category: 'Antifungals', level: 'S' },
  'amphotericin b': { category: 'Antifungals', level: 'T' },
  'terbinafine': { category: 'Antifungals', level: 'P' },

  // Antivirals
  'acyclovir': { category: 'Antivirals', level: 'P' },
  'oseltamivir': { category: 'Antivirals', level: 'S' },
  'zidovudine': { category: 'Antivirals', level: 'T' },
  'lamivudine': { category: 'Antivirals', level: 'T' },
  'tenofovir': { category: 'Antivirals', level: 'T' },
  'efavirenz': { category: 'Antivirals', level: 'T' },
  'nevirapine': { category: 'Antivirals', level: 'T' },
  'lopinavir': { category: 'Antivirals', level: 'T' },
  'ritonavir': { category: 'Antivirals', level: 'T' },

  // Antimalarials
  'chloroquine': { category: 'Antimalarials', level: 'P' },
  'primaquine': { category: 'Antimalarials', level: 'P' },
  'artesunate': { category: 'Antimalarials', level: 'S' },
  'artemether': { category: 'Antimalarials', level: 'S' },
  'lumefantrine': { category: 'Antimalarials', level: 'S' },
  'quinine': { category: 'Antimalarials', level: 'S' },
  'mefloquine': { category: 'Antimalarials', level: 'S' },

  // Antiparasitics
  'albendazole': { category: 'Antiparasitics', level: 'P' },
  'mebendazole': { category: 'Antiparasitics', level: 'P' },
  'ivermectin': { category: 'Antiparasitics', level: 'P' },
  'praziquantel': { category: 'Antiparasitics', level: 'S' },
  'pyrantel': { category: 'Antiparasitics', level: 'P' },
  'permethrin': { category: 'Antiparasitics', level: 'P' },
  'benzyl benzoate': { category: 'Antiparasitics', level: 'P' },

  // Cardiovascular Medicines
  'amlodipine': { category: 'Antihypertensives', level: 'P' },
  'atenolol': { category: 'Antihypertensives', level: 'P' },
  'metoprolol': { category: 'Antihypertensives', level: 'P' },
  'propranolol': { category: 'Antihypertensives', level: 'P' },
  'bisoprolol': { category: 'Antihypertensives', level: 'S' },
  'carvedilol': { category: 'Antihypertensives', level: 'S' },
  'enalapril': { category: 'Antihypertensives', level: 'P' },
  'lisinopril': { category: 'Antihypertensives', level: 'P' },
  'ramipril': { category: 'Antihypertensives', level: 'S' },
  'losartan': { category: 'Antihypertensives', level: 'P' },
  'telmisartan': { category: 'Antihypertensives', level: 'S' },
  'valsartan': { category: 'Antihypertensives', level: 'S' },
  'nifedipine': { category: 'Antihypertensives', level: 'P' },
  'diltiazem': { category: 'Antihypertensives', level: 'S' },
  'verapamil': { category: 'Antihypertensives', level: 'S' },
  'hydrochlorothiazide': { category: 'Diuretics', level: 'P' },
  'furosemide': { category: 'Diuretics', level: 'P' },
  'spironolactone': { category: 'Diuretics', level: 'S' },
  'mannitol': { category: 'Diuretics', level: 'S' },
  'digoxin': { category: 'Cardiac Glycosides', level: 'S' },
  'amiodarone': { category: 'Antiarrhythmics', level: 'S' },
  'lidocaine': { category: 'Antiarrhythmics', level: 'S' },
  'isosorbide dinitrate': { category: 'Antianginals', level: 'P' },
  'glyceryl trinitrate': { category: 'Antianginals', level: 'S' },
  'nitroglycerin': { category: 'Antianginals', level: 'S' },
  'atorvastatin': { category: 'Lipid-lowering', level: 'P' },
  'simvastatin': { category: 'Lipid-lowering', level: 'P' },
  'rosuvastatin': { category: 'Lipid-lowering', level: 'S' },
  'heparin': { category: 'Anticoagulants', level: 'S' },
  'enoxaparin': { category: 'Anticoagulants', level: 'S' },
  'warfarin': { category: 'Anticoagulants', level: 'S' },
  'clopidogrel': { category: 'Antiplatelets', level: 'S' },
  'streptokinase': { category: 'Thrombolytics', level: 'T' },
  'alteplase': { category: 'Thrombolytics', level: 'T' },

  // Antidiabetics
  'metformin': { category: 'Antidiabetics', level: 'P' },
  'glimepiride': { category: 'Antidiabetics', level: 'P' },
  'glibenclamide': { category: 'Antidiabetics', level: 'P' },
  'gliclazide': { category: 'Antidiabetics', level: 'P' },
  'glipizide': { category: 'Antidiabetics', level: 'P' },
  'insulin regular': { category: 'Antidiabetics', level: 'P' },
  'insulin human': { category: 'Antidiabetics', level: 'P' },
  'insulin nph': { category: 'Antidiabetics', level: 'P' },
  'insulin glargine': { category: 'Antidiabetics', level: 'T' },
  'sitagliptin': { category: 'Antidiabetics', level: 'S' },

  // Gastrointestinal Medicines
  'omeprazole': { category: 'GI Medicines', level: 'P' },
  'pantoprazole': { category: 'GI Medicines', level: 'P' },
  'ranitidine': { category: 'GI Medicines', level: 'P' },
  'famotidine': { category: 'GI Medicines', level: 'P' },
  'sucralfate': { category: 'GI Medicines', level: 'P' },
  'antacid': { category: 'GI Medicines', level: 'P' },
  'aluminium hydroxide': { category: 'GI Medicines', level: 'P' },
  'magnesium hydroxide': { category: 'GI Medicines', level: 'P' },
  'ondansetron': { category: 'Antiemetics', level: 'S' },
  'metoclopramide': { category: 'Antiemetics', level: 'P' },
  'domperidone': { category: 'Antiemetics', level: 'P' },
  'oral rehydration salts': { category: 'Antidiarrhoeals', level: 'P' },
  'ors': { category: 'Antidiarrhoeals', level: 'P' },
  'zinc': { category: 'Antidiarrhoeals', level: 'P' },
  'loperamide': { category: 'Antidiarrhoeals', level: 'P' },
  'lactulose': { category: 'Laxatives', level: 'P' },
  'bisacodyl': { category: 'Laxatives', level: 'P' },
  'ispaghula': { category: 'Laxatives', level: 'P' },

  // Respiratory Medicines
  'salbutamol': { category: 'Bronchodilators', level: 'P' },
  'ipratropium': { category: 'Bronchodilators', level: 'P' },
  'aminophylline': { category: 'Bronchodilators', level: 'S' },
  'theophylline': { category: 'Bronchodilators', level: 'P' },
  'budesonide': { category: 'Inhaled Corticosteroids', level: 'P' },
  'beclomethasone': { category: 'Inhaled Corticosteroids', level: 'P' },
  'fluticasone': { category: 'Inhaled Corticosteroids', level: 'S' },
  'montelukast': { category: 'Antiasthmatics', level: 'S' },
  'codeine': { category: 'Antitussives', level: 'S' },
  'dextromethorphan': { category: 'Antitussives', level: 'P' },

  // Psychotropic Medicines
  'amitriptyline': { category: 'Antidepressants', level: 'P' },
  'fluoxetine': { category: 'Antidepressants', level: 'P' },
  'sertraline': { category: 'Antidepressants', level: 'S' },
  'escitalopram': { category: 'Antidepressants', level: 'S' },
  'imipramine': { category: 'Antidepressants', level: 'P' },
  'haloperidol': { category: 'Antipsychotics', level: 'P' },
  'chlorpromazine': { category: 'Antipsychotics', level: 'P' },
  'risperidone': { category: 'Antipsychotics', level: 'S' },
  'olanzapine': { category: 'Antipsychotics', level: 'S' },
  'clozapine': { category: 'Antipsychotics', level: 'T' },
  'lithium': { category: 'Mood Stabilizers', level: 'S' },
  'clonazepam': { category: 'Anxiolytics', level: 'S' },
  'alprazolam': { category: 'Anxiolytics', level: 'S' },

  // Thyroid Medicines
  'levothyroxine': { category: 'Thyroid', level: 'P' },
  'thyroxine': { category: 'Thyroid', level: 'P' },
  'carbimazole': { category: 'Thyroid', level: 'S' },
  'propylthiouracil': { category: 'Thyroid', level: 'S' },

  // Vitamins and Minerals
  'vitamin a': { category: 'Vitamins', level: 'P' },
  'vitamin b complex': { category: 'Vitamins', level: 'P' },
  'vitamin b12': { category: 'Vitamins', level: 'P' },
  'vitamin c': { category: 'Vitamins', level: 'P' },
  'vitamin d': { category: 'Vitamins', level: 'P' },
  'cholecalciferol': { category: 'Vitamins', level: 'P' },
  'folic acid': { category: 'Vitamins', level: 'P' },
  'iron': { category: 'Minerals', level: 'P' },
  'ferrous sulfate': { category: 'Minerals', level: 'P' },
  'ferrous fumarate': { category: 'Minerals', level: 'P' },
  'calcium': { category: 'Minerals', level: 'P' },
  'calcium carbonate': { category: 'Minerals', level: 'P' },
  'calcium gluconate': { category: 'Minerals', level: 'S' },
  'potassium chloride': { category: 'Minerals', level: 'P' },
  'sodium chloride': { category: 'Minerals', level: 'P' },

  // Ophthalmological Preparations
  'timolol': { category: 'Ophthalmic', level: 'S' },
  'pilocarpine': { category: 'Ophthalmic', level: 'S' },
  'tetracaine': { category: 'Ophthalmic', level: 'P' },
  'fluorescein': { category: 'Ophthalmic', level: 'P' },

  // Dermatological Preparations
  'calamine': { category: 'Dermatological', level: 'P' },
  'silver sulfadiazine': { category: 'Dermatological', level: 'S' },
  'gentian violet': { category: 'Dermatological', level: 'P' },
  'neomycin': { category: 'Dermatological', level: 'P' },
  'betamethasone': { category: 'Dermatological', level: 'P' },
  'mometasone': { category: 'Dermatological', level: 'S' },

  // Oxytocics and Antioxytocics
  'oxytocin': { category: 'Oxytocics', level: 'P' },
  'misoprostol': { category: 'Oxytocics', level: 'P' },
  'methylergometrine': { category: 'Oxytocics', level: 'P' },
  // nifedipine already listed under Antihypertensives (also used as antioxytocic)

  // Contraceptives
  'ethinylestradiol': { category: 'Contraceptives', level: 'P' },
  'levonorgestrel': { category: 'Contraceptives', level: 'P' },
  'medroxyprogesterone': { category: 'Contraceptives', level: 'P' },
  'copper iud': { category: 'Contraceptives', level: 'P' },

  // Others
  'dopamine': { category: 'Emergency', level: 'S' },
  'dobutamine': { category: 'Emergency', level: 'T' },
  'norepinephrine': { category: 'Emergency', level: 'T' },
  'sodium bicarbonate': { category: 'Emergency', level: 'S' },
  'glucose': { category: 'Emergency', level: 'P' },
  'dextrose': { category: 'Emergency', level: 'P' },
  'ringers lactate': { category: 'IV Fluids', level: 'P' },
  'normal saline': { category: 'IV Fluids', level: 'P' },
  'ketamine': { category: 'Anaesthetics', level: 'S' },
  'propofol': { category: 'Anaesthetics', level: 'T' },
  'midazolam': { category: 'Anaesthetics', level: 'S' },
  'bupivacaine': { category: 'Local Anaesthetics', level: 'S' },
  'lignocaine': { category: 'Local Anaesthetics', level: 'P' },
};

/**
 * Jan Aushadhi common generic medicines list
 * These medicines are commonly available at Jan Aushadhi Kendras
 */
const JAN_AUSHADHI_COMMON = new Set([
  'paracetamol', 'ibuprofen', 'diclofenac', 'metformin', 'glimepiride',
  'amlodipine', 'atenolol', 'losartan', 'enalapril', 'hydrochlorothiazide',
  'omeprazole', 'pantoprazole', 'ranitidine', 'amoxicillin', 'azithromycin',
  'ciprofloxacin', 'metronidazole', 'doxycycline', 'cetirizine', 'loratadine',
  'salbutamol', 'montelukast', 'fluoxetine', 'amitriptyline', 'atorvastatin',
  'aspirin', 'clopidogrel', 'furosemide', 'vitamin b complex', 'folic acid',
  'iron', 'calcium', 'albendazole', 'fluconazole', 'acyclovir', 'levothyroxine',
  'prednisolone', 'dexamethasone', 'insulin human', 'oral rehydration salts',
  'zinc', 'vitamin d', 'vitamin c', 'multivitamin', 'ferrous sulfate',
  'calcium carbonate', 'acetylcysteine', 'domperidone', 'ondansetron',
  'loperamide', 'lactulose', 'bisacodyl', 'sodium chloride', 'glucose',
]);

// =============================================================================
// THERAPEUTIC CLASS MAPPING
// =============================================================================

/**
 * Keywords to therapeutic class mapping
 */
const THERAPEUTIC_KEYWORDS: Record<string, ClasseTerapeutica> = {
  // Cardiovascular
  'antihypertensive': 'anti_hipertensivo',
  'hypertension': 'anti_hipertensivo',
  'blood pressure': 'anti_hipertensivo',
  'beta blocker': 'anti_hipertensivo',
  'calcium channel': 'anti_hipertensivo',
  'ace inhibitor': 'anti_hipertensivo',
  'arb': 'anti_hipertensivo',
  'angiotensin': 'anti_hipertensivo',
  'cardiac': 'anti_hipertensivo',
  'heart': 'anti_hipertensivo',

  // Anticoagulants
  'anticoagulant': 'anticoagulante',
  'blood thinner': 'anticoagulante',
  'antiplatelet': 'anticoagulante',
  'thrombosis': 'anticoagulante',

  // Diuretics
  'diuretic': 'diuretico',
  'edema': 'diuretico',

  // Diabetes
  'diabetes': 'antidiabetico',
  'antidiabetic': 'antidiabetico',
  'hypoglycemic': 'antidiabetico',
  'insulin': 'antidiabetico',
  'metformin': 'antidiabetico',
  'blood sugar': 'antidiabetico',

  // Antibiotics
  'antibiotic': 'antibiotico',
  'antibacterial': 'antibiotico',
  'infection': 'antibiotico',
  'bacterial': 'antibiotico',
  'penicillin': 'antibiotico',
  'cephalosporin': 'antibiotico',
  'quinolone': 'antibiotico',
  'macrolide': 'antibiotico',
  'aminoglycoside': 'antibiotico',

  // Antifungals
  'antifungal': 'antifungico',
  'fungal': 'antifungico',
  'candida': 'antifungico',
  'azole': 'antifungico',

  // Antivirals
  'antiviral': 'antiviral',
  'viral': 'antiviral',
  'hiv': 'antiviral',
  'hepatitis': 'antiviral',
  'herpes': 'antiviral',

  // Antiparasitics
  'antiparasitic': 'antiparasitario',
  'anthelmintic': 'antiparasitario',
  'antimalarial': 'antiparasitario',
  'worm': 'antiparasitario',
  'malaria': 'antiparasitario',
  'parasit': 'antiparasitario',

  // GI
  'gastric': 'gastrointestinal',
  'stomach': 'gastrointestinal',
  'antacid': 'gastrointestinal',
  'proton pump': 'gastrointestinal',
  'ulcer': 'gastrointestinal',
  'reflux': 'gastrointestinal',
  'gerd': 'gastrointestinal',
  'digestive': 'gastrointestinal',
  'diarrhea': 'gastrointestinal',
  'constipation': 'gastrointestinal',
  'laxative': 'gastrointestinal',
  'antiemetic': 'gastrointestinal',
  'vomiting': 'gastrointestinal',
  'nausea': 'gastrointestinal',

  // Respiratory
  'respiratory': 'broncodilatador',
  'bronchodilator': 'broncodilatador',
  'asthma': 'broncodilatador',
  'copd': 'broncodilatador',
  'inhaler': 'broncodilatador',
  'lung': 'broncodilatador',
  'cough': 'broncodilatador',

  // Pain/Anti-inflammatory
  'pain': 'analgesico',
  'analgesic': 'analgesico',
  'painkiller': 'analgesico',
  'opioid': 'analgesico',
  'nsaid': 'anti_inflamatorio',
  'anti-inflammatory': 'anti_inflamatorio',
  'antiinflammatory': 'anti_inflamatorio',
  'arthritis': 'anti_inflamatorio',

  // Allergy
  'antihistamine': 'anti_histaminico',
  'allergy': 'anti_histaminico',
  'allergic': 'anti_histaminico',
  'histamine': 'anti_histaminico',

  // Steroids
  'corticosteroid': 'corticoide',
  'steroid': 'corticoide',
  'cortisone': 'corticoide',

  // Psychiatric
  'antidepressant': 'antidepressivo',
  'depression': 'antidepressivo',
  'ssri': 'antidepressivo',
  'anxiety': 'ansiolitico',
  'anxiolytic': 'ansiolitico',
  'benzodiazepine': 'ansiolitico',
  'antipsychotic': 'antipsicotico',
  'psychosis': 'antipsicotico',
  'schizophrenia': 'antipsicotico',
  'bipolar': 'antipsicotico',
  'anticonvulsant': 'anticonvulsivante',
  'epilepsy': 'anticonvulsivante',
  'seizure': 'anticonvulsivante',

  // Vitamins
  'vitamin': 'vitamina',
  'supplement': 'vitamina',
  'mineral': 'vitamina',
  'iron': 'vitamina',
  'calcium': 'vitamina',
  'folic acid': 'vitamina',

  // Hormones
  'hormone': 'hormonio',
  'thyroid': 'hormonio',
  'contraceptive': 'hormonio',
  'estrogen': 'hormonio',
  'progesterone': 'hormonio',

  // Immunosuppressants
  'immunosuppressant': 'imunossupressor',
  'transplant': 'imunossupressor',
  'autoimmune': 'imunossupressor',
};

/**
 * Direct drug name to therapeutic class mapping
 * Maps common drug active ingredients to their therapeutic classes
 */
const DRUG_NAME_TO_CLASS: Record<string, ClasseTerapeutica> = {
  // Analgesics/NSAIDs
  'paracetamol': 'analgesico',
  'acetaminophen': 'analgesico',
  'ibuprofen': 'anti_inflamatorio',
  'diclofenac': 'anti_inflamatorio',
  'aceclofenac': 'anti_inflamatorio',
  'naproxen': 'anti_inflamatorio',
  'piroxicam': 'anti_inflamatorio',
  'meloxicam': 'anti_inflamatorio',
  'etoricoxib': 'anti_inflamatorio',
  'celecoxib': 'anti_inflamatorio',
  'aspirin': 'anti_inflamatorio',
  'tramadol': 'analgesico',
  'morphine': 'analgesico',
  'codeine': 'analgesico',
  'fentanyl': 'analgesico',
  'nimesulide': 'anti_inflamatorio',
  'indomethacin': 'anti_inflamatorio',
  'ketorolac': 'anti_inflamatorio',

  // Antibiotics
  'amoxicillin': 'antibiotico',
  'amoxyclav': 'antibiotico',
  'ampicillin': 'antibiotico',
  'azithromycin': 'antibiotico',
  'erythromycin': 'antibiotico',
  'clarithromycin': 'antibiotico',
  'ciprofloxacin': 'antibiotico',
  'ofloxacin': 'antibiotico',
  'levofloxacin': 'antibiotico',
  'norfloxacin': 'antibiotico',
  'moxifloxacin': 'antibiotico',
  'metronidazole': 'antibiotico',
  'tinidazole': 'antibiotico',
  'doxycycline': 'antibiotico',
  'tetracycline': 'antibiotico',
  'cefixime': 'antibiotico',
  'ceftriaxone': 'antibiotico',
  'cefotaxime': 'antibiotico',
  'cefuroxime': 'antibiotico',
  'cephalexin': 'antibiotico',
  'cefpodoxime': 'antibiotico',
  'cefadroxil': 'antibiotico',
  'gentamicin': 'antibiotico',
  'amikacin': 'antibiotico',
  'vancomycin': 'antibiotico',
  'linezolid': 'antibiotico',
  'clindamycin': 'antibiotico',
  'nitrofurantoin': 'antibiotico',
  'cotrimoxazole': 'antibiotico',
  'sulfamethoxazole': 'antibiotico',
  'trimethoprim': 'antibiotico',
  'rifampicin': 'antibiotico',
  'isoniazid': 'antibiotico',
  'pyrazinamide': 'antibiotico',
  'ethambutol': 'antibiotico',
  'ornidazole': 'antibiotico',
  'secnidazole': 'antibiotico',
  'roxithromycin': 'antibiotico',
  'penicillin': 'antibiotico',
  'cloxacillin': 'antibiotico',
  'piperacillin': 'antibiotico',
  'meropenem': 'antibiotico',
  'imipenem': 'antibiotico',
  'colistin': 'antibiotico',

  // Antifungals
  'fluconazole': 'antifungico',
  'itraconazole': 'antifungico',
  'ketoconazole': 'antifungico',
  'clotrimazole': 'antifungico',
  'miconazole': 'antifungico',
  'terbinafine': 'antifungico',
  'nystatin': 'antifungico',
  'amphotericin': 'antifungico',
  'voriconazole': 'antifungico',

  // Antivirals
  'acyclovir': 'antiviral',
  'valacyclovir': 'antiviral',
  'oseltamivir': 'antiviral',
  'lamivudine': 'antiviral',
  'tenofovir': 'antiviral',
  'efavirenz': 'antiviral',
  'nevirapine': 'antiviral',
  'zidovudine': 'antiviral',
  'ribavirin': 'antiviral',
  'sofosbuvir': 'antiviral',

  // Antiparasitics
  'albendazole': 'antiparasitario',
  'mebendazole': 'antiparasitario',
  'ivermectin': 'antiparasitario',
  'praziquantel': 'antiparasitario',
  'pyrantel': 'antiparasitario',
  'chloroquine': 'antiparasitario',
  'primaquine': 'antiparasitario',
  'artemether': 'antiparasitario',
  'artesunate': 'antiparasitario',
  'hydroxychloroquine': 'antiparasitario',
  'quinine': 'antiparasitario',

  // Antihypertensives
  'amlodipine': 'anti_hipertensivo',
  'atenolol': 'anti_hipertensivo',
  'metoprolol': 'anti_hipertensivo',
  'propranolol': 'anti_hipertensivo',
  'bisoprolol': 'anti_hipertensivo',
  'carvedilol': 'anti_hipertensivo',
  'nebivolol': 'anti_hipertensivo',
  'enalapril': 'anti_hipertensivo',
  'lisinopril': 'anti_hipertensivo',
  'ramipril': 'anti_hipertensivo',
  'losartan': 'anti_hipertensivo',
  'telmisartan': 'anti_hipertensivo',
  'valsartan': 'anti_hipertensivo',
  'olmesartan': 'anti_hipertensivo',
  'nifedipine': 'anti_hipertensivo',
  'diltiazem': 'anti_hipertensivo',
  'verapamil': 'anti_hipertensivo',
  'prazosin': 'anti_hipertensivo',
  'clonidine': 'anti_hipertensivo',

  // Diuretics
  'hydrochlorothiazide': 'diuretico',
  'furosemide': 'diuretico',
  'spironolactone': 'diuretico',
  'torsemide': 'diuretico',
  'chlorthalidone': 'diuretico',
  'indapamide': 'diuretico',
  'mannitol': 'diuretico',
  'metolazone': 'diuretico',

  // Antidiabetics
  'metformin': 'antidiabetico',
  'glimepiride': 'antidiabetico',
  'glibenclamide': 'antidiabetico',
  'gliclazide': 'antidiabetico',
  'glipizide': 'antidiabetico',
  'pioglitazone': 'antidiabetico',
  'sitagliptin': 'antidiabetico',
  'vildagliptin': 'antidiabetico',
  'linagliptin': 'antidiabetico',
  'teneligliptin': 'antidiabetico',
  'empagliflozin': 'antidiabetico',
  'dapagliflozin': 'antidiabetico',
  'canagliflozin': 'antidiabetico',
  'insulin': 'antidiabetico',
  'voglibose': 'antidiabetico',
  'acarbose': 'antidiabetico',
  'repaglinide': 'antidiabetico',

  // GI medicines
  'omeprazole': 'gastrointestinal',
  'pantoprazole': 'gastrointestinal',
  'esomeprazole': 'gastrointestinal',
  'rabeprazole': 'gastrointestinal',
  'lansoprazole': 'gastrointestinal',
  'ranitidine': 'gastrointestinal',
  'famotidine': 'gastrointestinal',
  'domperidone': 'gastrointestinal',
  'ondansetron': 'gastrointestinal',
  'metoclopramide': 'gastrointestinal',
  'sucralfate': 'gastrointestinal',
  'dicyclomine': 'gastrointestinal',
  'hyoscine': 'gastrointestinal',
  'loperamide': 'gastrointestinal',
  'lactulose': 'gastrointestinal',
  'bisacodyl': 'gastrointestinal',
  'ispaghula': 'gastrointestinal',
  'ursodeoxycholic': 'gastrointestinal',

  // Respiratory
  'salbutamol': 'broncodilatador',
  'ipratropium': 'broncodilatador',
  'tiotropium': 'broncodilatador',
  'theophylline': 'broncodilatador',
  'aminophylline': 'broncodilatador',
  'montelukast': 'broncodilatador',
  'budesonide': 'broncodilatador',
  'fluticasone': 'broncodilatador',
  'beclomethasone': 'broncodilatador',
  'formoterol': 'broncodilatador',
  'salmeterol': 'broncodilatador',
  'levosalbutamol': 'broncodilatador',
  'dextromethorphan': 'broncodilatador',
  'ambroxol': 'broncodilatador',
  'acetylcysteine': 'broncodilatador',
  'acebrophylline': 'broncodilatador',
  'terbutaline': 'broncodilatador',

  // Antihistamines
  'cetirizine': 'anti_histaminico',
  'levocetirizine': 'anti_histaminico',
  'loratadine': 'anti_histaminico',
  'desloratadine': 'anti_histaminico',
  'fexofenadine': 'anti_histaminico',
  'chlorpheniramine': 'anti_histaminico',
  'promethazine': 'anti_histaminico',
  'hydroxyzine': 'anti_histaminico',
  'diphenhydramine': 'anti_histaminico',
  'pheniramine': 'anti_histaminico',
  'bilastine': 'anti_histaminico',

  // Corticosteroids
  'prednisolone': 'corticoide',
  'prednisone': 'corticoide',
  'dexamethasone': 'corticoide',
  'hydrocortisone': 'corticoide',
  'methylprednisolone': 'corticoide',
  'betamethasone': 'corticoide',
  'triamcinolone': 'corticoide',
  'mometasone': 'corticoide',
  'clobetasol': 'corticoide',
  'deflazacort': 'corticoide',

  // Antidepressants
  'fluoxetine': 'antidepressivo',
  'sertraline': 'antidepressivo',
  'escitalopram': 'antidepressivo',
  'citalopram': 'antidepressivo',
  'paroxetine': 'antidepressivo',
  'amitriptyline': 'antidepressivo',
  'imipramine': 'antidepressivo',
  'nortriptyline': 'antidepressivo',
  'venlafaxine': 'antidepressivo',
  'duloxetine': 'antidepressivo',
  'mirtazapine': 'antidepressivo',
  'bupropion': 'antidepressivo',
  'trazodone': 'antidepressivo',

  // Anxiolytics/Sedatives
  'diazepam': 'ansiolitico',
  'lorazepam': 'ansiolitico',
  'alprazolam': 'ansiolitico',
  'clonazepam': 'ansiolitico',
  'bromazepam': 'ansiolitico',
  'chlordiazepoxide': 'ansiolitico',
  'clobazam': 'ansiolitico',
  'zolpidem': 'ansiolitico',
  'zopiclone': 'ansiolitico',
  'midazolam': 'ansiolitico',
  'buspirone': 'ansiolitico',

  // Antipsychotics
  'haloperidol': 'antipsicotico',
  'chlorpromazine': 'antipsicotico',
  'risperidone': 'antipsicotico',
  'olanzapine': 'antipsicotico',
  'quetiapine': 'antipsicotico',
  'aripiprazole': 'antipsicotico',
  'clozapine': 'antipsicotico',
  'amisulpride': 'antipsicotico',
  'paliperidone': 'antipsicotico',
  'ziprasidone': 'antipsicotico',

  // Anticonvulsants
  'phenytoin': 'anticonvulsivante',
  'carbamazepine': 'anticonvulsivante',
  'valproate': 'anticonvulsivante',
  'sodium valproate': 'anticonvulsivante',
  'valproic acid': 'anticonvulsivante',
  'levetiracetam': 'anticonvulsivante',
  'lamotrigine': 'anticonvulsivante',
  'topiramate': 'anticonvulsivante',
  'gabapentin': 'anticonvulsivante',
  'pregabalin': 'anticonvulsivante',
  'phenobarbital': 'anticonvulsivante',
  'oxcarbazepine': 'anticonvulsivante',
  'lacosamide': 'anticonvulsivante',

  // Vitamins/Supplements
  'vitamin': 'vitamina',
  'multivitamin': 'vitamina',
  'folic acid': 'vitamina',
  'methylcobalamin': 'vitamina',
  'cyanocobalamin': 'vitamina',
  'thiamine': 'vitamina',
  'riboflavin': 'vitamina',
  'pyridoxine': 'vitamina',
  'niacinamide': 'vitamina',
  'cholecalciferol': 'vitamina',
  'calcitriol': 'vitamina',
  'calcium': 'vitamina',
  'ferrous': 'vitamina',
  'iron': 'vitamina',
  'zinc': 'vitamina',
  'ascorbic acid': 'vitamina',

  // Anticoagulants/Antiplatelets
  'warfarin': 'anticoagulante',
  'heparin': 'anticoagulante',
  'enoxaparin': 'anticoagulante',
  'clopidogrel': 'anticoagulante',
  'ticagrelor': 'anticoagulante',
  'prasugrel': 'anticoagulante',
  'rivaroxaban': 'anticoagulante',
  'apixaban': 'anticoagulante',
  'dabigatran': 'anticoagulante',
  // aspirin already listed under anti_inflamatorio (also used as antiplatelet)

  // Lipid lowering
  'atorvastatin': 'anti_hipertensivo',
  'rosuvastatin': 'anti_hipertensivo',
  'simvastatin': 'anti_hipertensivo',
  'pravastatin': 'anti_hipertensivo',
  'fenofibrate': 'anti_hipertensivo',
  'ezetimibe': 'anti_hipertensivo',

  // Thyroid
  'levothyroxine': 'hormonio',
  'thyroxine': 'hormonio',
  'carbimazole': 'hormonio',
  'propylthiouracil': 'hormonio',
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Generates a URL-safe medication ID
 */
function generateMedicationId(name: string, index: number): string {
  const sanitized = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
  return `in-${sanitized}-${index}`;
}

/**
 * Normalizes medicine name for NLEM matching
 */
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s+]/g, '')
    .replace(/\d+\s*(mg|ml|mcg|iu|g|%)/gi, '')
    .trim();
}

/**
 * Extracts active ingredient from medicine name
 */
function extractActiveIngredient(name: string): string {
  // Common patterns: "Brand Name (Generic)" or "Generic 500mg"
  const parenMatch = name.match(/\(([^)]+)\)/);
  if (parenMatch) {
    return normalizeName(parenMatch[1]);
  }

  // Remove dosage info
  const cleaned = name
    .replace(/\d+(\.\d+)?\s*(mg|ml|mcg|iu|g|%|tablet|capsule|syrup|injection)/gi, '')
    .trim();

  return normalizeName(cleaned);
}

/**
 * Checks if medicine is in NLEM 2022
 */
function checkNLEMStatus(name: string, composition: string[]): { included: boolean; category?: string } {
  const normalizedName = normalizeName(name);
  const activeIngredient = extractActiveIngredient(name);

  // Check direct name match
  if (NLEM_2022_MEDICINES[normalizedName]) {
    return { included: true, category: NLEM_2022_MEDICINES[normalizedName].category };
  }

  // Check active ingredient
  if (NLEM_2022_MEDICINES[activeIngredient]) {
    return { included: true, category: NLEM_2022_MEDICINES[activeIngredient].category };
  }

  // Check composition components
  for (const comp of composition) {
    const normalizedComp = normalizeName(comp);
    if (NLEM_2022_MEDICINES[normalizedComp]) {
      return { included: true, category: NLEM_2022_MEDICINES[normalizedComp].category };
    }
  }

  return { included: false };
}

/**
 * Checks if medicine is available in Jan Aushadhi
 */
function checkJanAushadhiAvailability(name: string, composition: string[]): boolean {
  const normalizedName = normalizeName(name);
  const activeIngredient = extractActiveIngredient(name);

  if (JAN_AUSHADHI_COMMON.has(normalizedName) || JAN_AUSHADHI_COMMON.has(activeIngredient)) {
    return true;
  }

  for (const comp of composition) {
    if (JAN_AUSHADHI_COMMON.has(normalizeName(comp))) {
      return true;
    }
  }

  return false;
}

/**
 * Derives therapeutic class from available data
 */
function deriveTherapeuticClass(
  name: string,
  therapeuticClass?: string,
  use?: string | string[],
  composition?: string[]
): ClasseTerapeutica {
  // Check explicit therapeutic class first
  if (therapeuticClass) {
    const classLower = therapeuticClass.toLowerCase();
    for (const [keyword, classe] of Object.entries(THERAPEUTIC_KEYWORDS)) {
      if (classLower.includes(keyword)) {
        return classe;
      }
    }
  }

  // Check composition against direct drug name mapping (most reliable)
  if (composition && composition.length > 0) {
    for (const comp of composition) {
      // Extract just the drug name without dosage
      const drugName = comp.toLowerCase()
        .replace(/\s*\([^)]*\)/g, '') // Remove (100mg) etc
        .replace(/\d+(\.\d+)?\s*(mg|ml|mcg|iu|g|%)/gi, '')
        .trim();

      // Check direct mapping
      for (const [drug, classe] of Object.entries(DRUG_NAME_TO_CLASS)) {
        if (drugName.includes(drug) || drug.includes(drugName)) {
          return classe;
        }
      }
    }
  }

  // Check name against direct drug name mapping
  const nameLower = name.toLowerCase();
  for (const [drug, classe] of Object.entries(DRUG_NAME_TO_CLASS)) {
    if (nameLower.includes(drug)) {
      return classe;
    }
  }

  // Check use/indication
  const useText = Array.isArray(use) ? use.join(' ') : (use || '');
  if (useText) {
    const useLower = useText.toLowerCase();
    for (const [keyword, classe] of Object.entries(THERAPEUTIC_KEYWORDS)) {
      if (useLower.includes(keyword)) {
        return classe;
      }
    }
  }

  // Check name and composition against keywords
  const searchText = [
    name,
    ...(composition || []),
  ].join(' ').toLowerCase();

  for (const [keyword, classe] of Object.entries(THERAPEUTIC_KEYWORDS)) {
    if (searchText.includes(keyword)) {
      return classe;
    }
  }

  return 'outros';
}

/**
 * Parses pack size label to extract presentation info
 */
function parsePackSize(packSizeLabel?: string): { forma: string; quantidade?: string } {
  if (!packSizeLabel) {
    return { forma: 'outros' };
  }

  const label = packSizeLabel.toLowerCase();

  // Common pharmaceutical forms
  if (label.includes('tablet') || label.includes('tab')) {
    return { forma: 'comprimido', quantidade: packSizeLabel };
  }
  if (label.includes('capsule') || label.includes('cap')) {
    return { forma: 'capsula', quantidade: packSizeLabel };
  }
  if (label.includes('syrup') || label.includes('syr')) {
    return { forma: 'xarope', quantidade: packSizeLabel };
  }
  if (label.includes('injection') || label.includes('inj') || label.includes('vial')) {
    return { forma: 'injetavel', quantidade: packSizeLabel };
  }
  if (label.includes('cream') || label.includes('crm')) {
    return { forma: 'creme', quantidade: packSizeLabel };
  }
  if (label.includes('ointment') || label.includes('oint')) {
    return { forma: 'pomada', quantidade: packSizeLabel };
  }
  if (label.includes('gel')) {
    return { forma: 'gel', quantidade: packSizeLabel };
  }
  if (label.includes('drop') || label.includes('eye')) {
    return { forma: 'colirio', quantidade: packSizeLabel };
  }
  if (label.includes('inhaler') || label.includes('rotacap')) {
    return { forma: 'inalatorio', quantidade: packSizeLabel };
  }
  if (label.includes('suspension') || label.includes('susp')) {
    return { forma: 'suspensao_oral', quantidade: packSizeLabel };
  }
  if (label.includes('solution') || label.includes('soln')) {
    return { forma: 'solucao_oral', quantidade: packSizeLabel };
  }
  if (label.includes('powder') || label.includes('sachet')) {
    return { forma: 'po_oral', quantidade: packSizeLabel };
  }
  if (label.includes('spray')) {
    return { forma: 'spray_nasal', quantidade: packSizeLabel };
  }
  if (label.includes('lotion')) {
    return { forma: 'locao', quantidade: packSizeLabel };
  }
  if (label.includes('suppository')) {
    return { forma: 'supositorio', quantidade: packSizeLabel };
  }

  return { forma: 'outros', quantidade: packSizeLabel };
}

/**
 * Extracts tags from medicine data
 */
function extractTags(
  name: string,
  composition: string[],
  therapeuticClass?: string,
  use?: string | string[]
): string[] {
  const tags = new Set<string>();

  // Add therapeutic class as tag
  if (therapeuticClass) {
    tags.add(therapeuticClass.toLowerCase());
  }

  // Add use keywords
  const useText = Array.isArray(use) ? use : (use ? [use] : []);
  for (const u of useText) {
    const words = u.toLowerCase().split(/\s+/);
    for (const word of words) {
      if (word.length > 3 && !['with', 'and', 'for', 'the', 'used'].includes(word)) {
        tags.add(word);
      }
    }
  }

  // Add composition as tags
  for (const comp of composition) {
    tags.add(comp.toLowerCase());
  }

  return Array.from(tags).slice(0, 10); // Limit to 10 tags
}

/**
 * Formats date to ISO string
 */
function formatDate(): string {
  return new Date().toISOString().split('T')[0];
}

// =============================================================================
// MAIN TRANSFORMATION
// =============================================================================

/**
 * Transforms Indian medicine data to Darwin-MFC RegionalMedicationOverlay
 */
function transformToOverlay(medicine: IndianMedicineRaw, index: number): IndiaRegionalMedicationOverlay {
  const composition = [
    medicine.short_composition1,
    medicine.short_composition2,
  ].filter((c): c is string => Boolean(c && c.trim()));

  const nlemStatus = checkNLEMStatus(medicine.name, composition);
  const janAushadhiAvailable = checkJanAushadhiAvailability(medicine.name, composition);
  const therapeuticClass = deriveTherapeuticClass(
    medicine.name,
    medicine.therapeutic_class,
    medicine.use,
    composition
  );
  const presentation = parsePackSize(medicine.pack_size_label);
  const tags = extractTags(medicine.name, composition, medicine.therapeutic_class, medicine.use);

  // Parse use/indication
  const indications = Array.isArray(medicine.use)
    ? medicine.use
    : (medicine.use ? [medicine.use] : []);

  // Create overlay
  const overlay: IndiaRegionalMedicationOverlay = {
    medicationId: generateMedicationId(medicine.name, index),
    region: 'IN',
    localGenericName: extractActiveIngredient(medicine.name) || normalizeName(medicine.name),
    commercialNames: [medicine.name],
    approvalStatus: medicine.Is_discontinued === 'True' ? 'not_available' : 'approved',
    availableInPublicSystem: nlemStatus.included || janAushadhiAvailable,
    publicSystemName: janAushadhiAvailable ? 'Jan Aushadhi' : (nlemStatus.included ? 'NLEM' : undefined),
    presentations: [
      {
        forma: presentation.forma,
        concentracao: composition.join(' + ') || 'N/A',
        quantidade: presentation.quantidade,
        disponivelSistemaPublico: nlemStatus.included || janAushadhiAvailable,
        ...(medicine['price(Rs.)'] ? {
          precoReferencia: {
            min: medicine['price(Rs.)'],
            max: medicine['price(Rs.)'],
            currency: 'INR',
          },
        } : {}),
      },
    ],
    localTherapeuticClass: therapeuticClass,
    lastUpdate: formatDate(),
    // India-specific fields
    nlemIncluded: nlemStatus.included,
    nlemCategory: nlemStatus.category,
    janAushadhiAvailable,
    // Additional metadata
    manufacturer: medicine.manufacturer_name,
    composition,
    indications: indications.length > 0 ? indications : undefined,
    tags: tags.length > 0 ? tags : undefined,
    priceINR: medicine['price(Rs.)'],
    isDiscontinued: medicine.Is_discontinued === 'True',
  };

  return overlay;
}

// =============================================================================
// DATA FETCHING
// =============================================================================

/**
 * Fetches Indian medicines data from GitHub dataset
 */
async function fetchIndiaMedicines(): Promise<IndianMedicineRaw[]> {
  console.log('Fetching Indian medicines data from GitHub...');
  console.log(`  URL: ${INDIAN_MEDICINES_URL}`);

  const response = await fetch(INDIAN_MEDICINES_URL, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'Darwin-MFC/1.0 (https://mfc.agourakis.med.br; medical-education)',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as IndianMedicineRaw[];
  console.log(`  Received ${data.length} total records`);

  return data;
}

// =============================================================================
// FILE GENERATION
// =============================================================================

/**
 * Generates TypeScript file content for the overlays
 */
function generateTypeScriptContent(overlays: IndiaRegionalMedicationOverlay[]): string {
  const header = `/**
 * INDIA REGIONAL MEDICATION OVERLAYS - DARWIN-MFC
 * ================================================
 *
 * Auto-generated from Indian Medicine Dataset (GitHub)
 * Source: ${INDIAN_MEDICINES_URL}
 * Generated: ${new Date().toISOString()}
 *
 * Total medications: ${overlays.length}
 * NLEM 2022 medicines: ${overlays.filter((o) => o.nlemIncluded).length}
 * Jan Aushadhi available: ${overlays.filter((o) => o.janAushadhiAvailable).length}
 *
 * DO NOT EDIT MANUALLY - Regenerate using:
 *   npx tsx scripts/import-india-medications.ts
 */

import type { RegionalMedicationOverlay } from '@/lib/types/region';

// =============================================================================
// INDIA-SPECIFIC EXTENDED TYPE
// =============================================================================

/**
 * Extended overlay type with India-specific fields
 */
export interface IndiaRegionalMedicationOverlay extends RegionalMedicationOverlay {
  /** Included in NLEM 2022 (National List of Essential Medicines) */
  nlemIncluded: boolean;
  /** NLEM therapeutic category */
  nlemCategory?: string;
  /** Available through Jan Aushadhi/PMBJP generic program */
  janAushadhiAvailable: boolean;
  /** Manufacturer name */
  manufacturer?: string;
  /** Active ingredients/composition */
  composition?: string[];
  /** Therapeutic indications */
  indications?: string[];
  /** Search tags */
  tags?: string[];
  /** Price in Indian Rupees */
  priceINR?: number;
  /** Whether medication is discontinued */
  isDiscontinued?: boolean;
}

`;

  const exportStatement = `export const indiaMedicationOverlays: IndiaRegionalMedicationOverlay[] = `;

  // Format the overlays array
  const overlaysJson = JSON.stringify(overlays, null, 2);

  const helperFunctions = `

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get overlay by medication ID
 */
export function getIndiaOverlayById(medicationId: string): IndiaRegionalMedicationOverlay | undefined {
  return indiaMedicationOverlays.find((o) => o.medicationId === medicationId);
}

/**
 * Get NLEM 2022 medicines only
 */
export function getNLEMMedicines(): IndiaRegionalMedicationOverlay[] {
  return indiaMedicationOverlays.filter((o) => o.nlemIncluded);
}

/**
 * Get Jan Aushadhi available medicines
 */
export function getJanAushadhiMedicines(): IndiaRegionalMedicationOverlay[] {
  return indiaMedicationOverlays.filter((o) => o.janAushadhiAvailable);
}

/**
 * Get overlays by therapeutic class
 */
export function getIndiaOverlaysByClass(therapeuticClass: string): IndiaRegionalMedicationOverlay[] {
  return indiaMedicationOverlays.filter((o) => o.localTherapeuticClass === therapeuticClass);
}

/**
 * Get overlays by NLEM category
 */
export function getIndiaOverlaysByNLEMCategory(category: string): IndiaRegionalMedicationOverlay[] {
  return indiaMedicationOverlays.filter((o) => o.nlemCategory === category);
}

/**
 * Search overlays by generic name, commercial name, or composition
 */
export function searchIndiaOverlays(query: string): IndiaRegionalMedicationOverlay[] {
  const normalizedQuery = query.toLowerCase().trim();
  return indiaMedicationOverlays.filter(
    (o) =>
      o.localGenericName.toLowerCase().includes(normalizedQuery) ||
      o.commercialNames.some((name) => name.toLowerCase().includes(normalizedQuery)) ||
      o.composition?.some((comp) => comp.toLowerCase().includes(normalizedQuery)) ||
      o.tags?.some((tag) => tag.includes(normalizedQuery))
  );
}

/**
 * Get medicines by manufacturer
 */
export function getIndiaOverlaysByManufacturer(manufacturer: string): IndiaRegionalMedicationOverlay[] {
  const normalizedMfr = manufacturer.toLowerCase().trim();
  return indiaMedicationOverlays.filter(
    (o) => o.manufacturer?.toLowerCase().includes(normalizedMfr)
  );
}

/**
 * Get overlay statistics
 */
export function getIndiaOverlayStats(): {
  total: number;
  nlemCount: number;
  janAushadhiCount: number;
  discontinuedCount: number;
  byClass: Record<string, number>;
  byNLEMCategory: Record<string, number>;
  avgPriceINR: number;
} {
  const stats = {
    total: indiaMedicationOverlays.length,
    nlemCount: 0,
    janAushadhiCount: 0,
    discontinuedCount: 0,
    byClass: {} as Record<string, number>,
    byNLEMCategory: {} as Record<string, number>,
    avgPriceINR: 0,
  };

  let totalPrice = 0;
  let priceCount = 0;

  for (const overlay of indiaMedicationOverlays) {
    if (overlay.nlemIncluded) stats.nlemCount++;
    if (overlay.janAushadhiAvailable) stats.janAushadhiCount++;
    if (overlay.isDiscontinued) stats.discontinuedCount++;

    const cls = overlay.localTherapeuticClass || 'outros';
    stats.byClass[cls] = (stats.byClass[cls] || 0) + 1;

    if (overlay.nlemCategory) {
      stats.byNLEMCategory[overlay.nlemCategory] = (stats.byNLEMCategory[overlay.nlemCategory] || 0) + 1;
    }

    if (overlay.priceINR) {
      totalPrice += overlay.priceINR;
      priceCount++;
    }
  }

  stats.avgPriceINR = priceCount > 0 ? Math.round(totalPrice / priceCount) : 0;

  return stats;
}

/**
 * Get price range for a therapeutic class
 */
export function getPriceRangeByClass(therapeuticClass: string): { min: number; max: number; avg: number } | null {
  const medicines = getIndiaOverlaysByClass(therapeuticClass).filter((o) => o.priceINR);
  if (medicines.length === 0) return null;

  const prices = medicines.map((o) => o.priceINR!);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    avg: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
  };
}
`;

  return header + exportStatement + overlaysJson + ';\n' + helperFunctions;
}

// =============================================================================
// MAIN SCRIPT
// =============================================================================

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');

  // Parse limit argument
  let limit = DEFAULT_LIMIT;
  const limitArg = args.find((arg) => arg.startsWith('--limit='));
  if (limitArg) {
    const parsedLimit = parseInt(limitArg.split('=')[1], 10);
    if (!isNaN(parsedLimit) && parsedLimit > 0) {
      limit = parsedLimit;
    }
  }

  console.log('='.repeat(70));
  console.log('India Medication Data Importer - Darwin-MFC');
  console.log('='.repeat(70));

  if (isDryRun) {
    console.log('\n[DRY RUN MODE] No files will be written\n');
  }
  console.log(`Limit: ${limit} medications\n`);

  try {
    // Step 1: Fetch India medicines data
    const indiaMedicines = await fetchIndiaMedicines();

    // Step 2: Filter out discontinued medicines (optional, keep for reference)
    const activeMedicines = indiaMedicines.filter(
      (med) => med.Is_discontinued !== 'True'
    );
    console.log(`\nFiltered to ${activeMedicines.length} active medicines`);

    // Step 3: Filter by type (allopathy only for now)
    const allopathyMedicines = activeMedicines.filter(
      (med) => !med.type || med.type.toLowerCase() === 'allopathy'
    );
    console.log(`Filtered to ${allopathyMedicines.length} allopathy medicines`);

    // Step 4: Apply limit
    const limitedMedicines = allopathyMedicines.slice(0, limit);
    console.log(`Applied limit: ${limitedMedicines.length} medicines`);

    // Step 5: Transform to overlays
    console.log('\nTransforming to regional overlays...');
    const overlays = limitedMedicines.map((med, index) => {
      if ((index + 1) % 1000 === 0) {
        console.log(`  Processed ${index + 1}/${limitedMedicines.length}`);
      }
      return transformToOverlay(med, index);
    });

    // Step 6: Deduplicate by generic name (keep first occurrence with most data)
    const deduplicatedMap = new Map<string, IndiaRegionalMedicationOverlay>();
    for (const overlay of overlays) {
      const key = overlay.localGenericName.toLowerCase();
      const existing = deduplicatedMap.get(key);

      if (!existing) {
        deduplicatedMap.set(key, overlay);
      } else {
        // Merge commercial names
        const mergedNames = [...new Set([...existing.commercialNames, ...overlay.commercialNames])];

        // Keep the one with more data (NLEM > Jan Aushadhi > neither)
        const existingScore =
          (existing.nlemIncluded ? 2 : 0) +
          (existing.janAushadhiAvailable ? 1 : 0) +
          (existing.composition?.length || 0);
        const newScore =
          (overlay.nlemIncluded ? 2 : 0) +
          (overlay.janAushadhiAvailable ? 1 : 0) +
          (overlay.composition?.length || 0);

        if (newScore > existingScore) {
          deduplicatedMap.set(key, {
            ...overlay,
            commercialNames: mergedNames.slice(0, 10), // Limit commercial names
          });
        } else {
          deduplicatedMap.set(key, {
            ...existing,
            commercialNames: mergedNames.slice(0, 10),
          });
        }
      }
    }

    const deduplicatedOverlays = Array.from(deduplicatedMap.values());
    console.log(`\nDeduplicated to ${deduplicatedOverlays.length} unique generic medicines`);

    // Step 7: Sort alphabetically by generic name
    deduplicatedOverlays.sort((a, b) => a.localGenericName.localeCompare(b.localGenericName));

    // Step 8: Generate statistics
    const stats = {
      total: deduplicatedOverlays.length,
      nlemCount: deduplicatedOverlays.filter((o) => o.nlemIncluded).length,
      janAushadhiCount: deduplicatedOverlays.filter((o) => o.janAushadhiAvailable).length,
      byClass: {} as Record<string, number>,
    };
    for (const overlay of deduplicatedOverlays) {
      const cls = overlay.localTherapeuticClass || 'outros';
      stats.byClass[cls] = (stats.byClass[cls] || 0) + 1;
    }

    console.log('\nStatistics:');
    console.log(`  Total unique medicines: ${stats.total}`);
    console.log(`  NLEM 2022 medicines: ${stats.nlemCount}`);
    console.log(`  Jan Aushadhi available: ${stats.janAushadhiCount}`);
    console.log('  By therapeutic class:');
    Object.entries(stats.byClass)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .forEach(([cls, count]) => {
        console.log(`    ${cls}: ${count}`);
      });

    // Step 9: Generate TypeScript content
    const tsContent = generateTypeScriptContent(deduplicatedOverlays);

    // Step 10: Write file (or preview in dry run)
    if (isDryRun) {
      console.log('\n[DRY RUN] Would write to:', OUTPUT_FILE);
      console.log('[DRY RUN] File size:', (tsContent.length / 1024).toFixed(2), 'KB');
      console.log('\n[DRY RUN] Preview (first 3000 chars):');
      console.log('-'.repeat(50));
      console.log(tsContent.substring(0, 3000));
      console.log('...');
      console.log('-'.repeat(50));

      // Show sample entries
      console.log('\n[DRY RUN] Sample NLEM medicines:');
      deduplicatedOverlays
        .filter((o) => o.nlemIncluded)
        .slice(0, 5)
        .forEach((o) => {
          console.log(`  - ${o.localGenericName} (${o.nlemCategory})`);
        });
    } else {
      // Ensure output directory exists
      if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        console.log(`\nCreated directory: ${OUTPUT_DIR}`);
      }

      // Write the file
      fs.writeFileSync(OUTPUT_FILE, tsContent, 'utf-8');
      console.log(`\nWritten to: ${OUTPUT_FILE}`);
      console.log(`File size: ${(tsContent.length / 1024).toFixed(2)} KB`);
    }

    console.log('\n' + '='.repeat(70));
    console.log('Import completed successfully!');
    console.log('='.repeat(70));
  } catch (error) {
    console.error('\nError during import:');
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run the script
main();
