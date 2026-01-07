/**
 * SAMPLE DATA POPULATION - DARWIN-MFC KNOWLEDGE GRAPH
 * =====================================================
 *
 * Populates the knowledge graph with sample medical data
 * from 10 representative diseases and their relationships.
 *
 * Diseases included:
 * 1. Diabetes Mellitus Type 2
 * 2. Hypertension (Arterial Hypertension)
 * 3. Heart Failure
 * 4. Atrial Fibrillation
 * 5. Coronary Artery Disease
 * 6. Hypothyroidism
 * 7. Chronic Obstructive Pulmonary Disease (COPD)
 * 8. Depression (Major Depressive Disorder)
 * 9. Chronic Kidney Disease
 * 10. Dyslipidemia
 */

import {
  KnowledgeGraphService,
  createDiseaseNodeFromDoenca,
  createMedicationNodeFromMedicamento,
} from './graph-service';
import type {
  DiseaseNode,
  SymptomNode,
  MedicationNode,
  ExaminationNode,
  PathwayNode,
  TreatmentEdge,
  SymptomEdge,
  DiagnosticEdge,
  InteractionEdge,
  ProgressionEdge,
  ComorbidityEdge,
  CreateNodeInput,
  InteractionSeverity,
} from './types';

// =============================================================================
// SAMPLE DISEASES
// =============================================================================

const sampleDiseases: CreateNodeInput<DiseaseNode>[] = [
  {
    type: 'Disease',
    label: 'Diabetes Mellitus Type 2',
    synonyms: ['DM2', 'Type 2 Diabetes', 'Non-insulin-dependent diabetes mellitus'],
    ontologies: {
      doid: 'DOID:9352',
      icd10: ['E11', 'E11.9'],
      icd11: ['5A11'],
      snomedCT: '44054006',
      meshId: 'D003924',
      umlsCui: 'C0011860',
      ciap2: ['T90'],
    },
    category: 'metabolico',
    chronic: true,
    epidemiology: {
      prevalence: '7-10% of adult population',
      incidence: '400-500 new cases per 100,000/year',
      ageGroups: ['adults', 'elderly'],
    },
  },
  {
    type: 'Disease',
    label: 'Arterial Hypertension',
    synonyms: ['HAS', 'High Blood Pressure', 'Essential Hypertension'],
    ontologies: {
      doid: 'DOID:10763',
      icd10: ['I10', 'I11', 'I15'],
      icd11: ['BA00'],
      snomedCT: '38341003',
      meshId: 'D006973',
      umlsCui: 'C0020538',
      ciap2: ['K86', 'K87'],
    },
    category: 'cardiovascular',
    chronic: true,
    epidemiology: {
      prevalence: '25-30% of adult population',
      incidence: '1-2% per year in adults',
      ageGroups: ['adults', 'elderly'],
    },
  },
  {
    type: 'Disease',
    label: 'Heart Failure',
    synonyms: ['IC', 'ICC', 'Congestive Heart Failure', 'CHF'],
    ontologies: {
      doid: 'DOID:6000',
      icd10: ['I50', 'I50.0', 'I50.1', 'I50.9'],
      icd11: ['BD10'],
      snomedCT: '84114007',
      meshId: 'D006333',
      umlsCui: 'C0018801',
      ciap2: ['K77'],
    },
    category: 'cardiovascular',
    chronic: true,
    severity: 'severe',
  },
  {
    type: 'Disease',
    label: 'Atrial Fibrillation',
    synonyms: ['FA', 'AFib', 'Auricular fibrillation'],
    ontologies: {
      doid: 'DOID:0060224',
      icd10: ['I48', 'I48.0', 'I48.1', 'I48.9'],
      icd11: ['BC81.1'],
      snomedCT: '49436004',
      meshId: 'D001281',
      umlsCui: 'C0004238',
      ciap2: ['K78'],
    },
    category: 'cardiovascular',
    chronic: true,
  },
  {
    type: 'Disease',
    label: 'Stable Coronary Artery Disease',
    synonyms: ['DAC', 'Stable Angina', 'Chronic Ischemic Heart Disease'],
    ontologies: {
      doid: 'DOID:3393',
      icd10: ['I25', 'I25.1', 'I25.9', 'I20.8'],
      icd11: ['BA80'],
      snomedCT: '53741008',
      meshId: 'D003324',
      umlsCui: 'C0010054',
      ciap2: ['K74', 'K76'],
    },
    category: 'cardiovascular',
    chronic: true,
  },
  {
    type: 'Disease',
    label: 'Hypothyroidism',
    synonyms: ['Hashimoto Thyroiditis', 'Myxedema', 'Underactive thyroid'],
    ontologies: {
      doid: 'DOID:1459',
      icd10: ['E03', 'E03.9', 'E06.3'],
      icd11: ['5A00'],
      snomedCT: '40930008',
      meshId: 'D007037',
      umlsCui: 'C0020676',
      ciap2: ['T86'],
    },
    category: 'endocrino',
    chronic: true,
  },
  {
    type: 'Disease',
    label: 'Chronic Obstructive Pulmonary Disease',
    synonyms: ['COPD', 'DPOC', 'Chronic Bronchitis', 'Emphysema'],
    ontologies: {
      doid: 'DOID:3083',
      icd10: ['J44', 'J44.0', 'J44.1', 'J44.9'],
      icd11: ['CA22'],
      snomedCT: '13645005',
      meshId: 'D029424',
      umlsCui: 'C0024117',
      ciap2: ['R95'],
    },
    category: 'respiratorio',
    chronic: true,
    severity: 'moderate',
  },
  {
    type: 'Disease',
    label: 'Major Depressive Disorder',
    synonyms: ['Depression', 'MDD', 'Clinical Depression', 'Unipolar Depression'],
    ontologies: {
      doid: 'DOID:1470',
      icd10: ['F32', 'F32.0', 'F32.1', 'F32.2', 'F33'],
      icd11: ['6A70', '6A71'],
      snomedCT: '35489007',
      meshId: 'D003865',
      umlsCui: 'C0011570',
      ciap2: ['P76'],
    },
    category: 'saude_mental',
    chronic: true,
  },
  {
    type: 'Disease',
    label: 'Chronic Kidney Disease',
    synonyms: ['CKD', 'DRC', 'Chronic Renal Failure', 'Chronic Renal Insufficiency'],
    ontologies: {
      doid: 'DOID:784',
      icd10: ['N18', 'N18.1', 'N18.2', 'N18.3', 'N18.4', 'N18.5'],
      icd11: ['GB61'],
      snomedCT: '709044004',
      meshId: 'D051436',
      umlsCui: 'C1561643',
      ciap2: ['U99'],
    },
    category: 'urologico',
    chronic: true,
    severity: 'moderate',
  },
  {
    type: 'Disease',
    label: 'Dyslipidemia',
    synonyms: ['Hyperlipidemia', 'Hypercholesterolemia', 'High Cholesterol'],
    ontologies: {
      doid: 'DOID:1168',
      icd10: ['E78', 'E78.0', 'E78.1', 'E78.2', 'E78.5'],
      icd11: ['5C80'],
      snomedCT: '370992007',
      meshId: 'D050171',
      umlsCui: 'C0242339',
      ciap2: ['T93'],
    },
    category: 'metabolico',
    chronic: true,
  },
];

// =============================================================================
// SAMPLE SYMPTOMS
// =============================================================================

const sampleSymptoms: CreateNodeInput<SymptomNode>[] = [
  {
    type: 'Symptom',
    label: 'Dyspnea',
    synonyms: ['Shortness of breath', 'Difficulty breathing', 'Breathlessness'],
    ontologies: { snomedCT: '267036007', hpo: 'HP:0002094' },
    bodyLocation: 'respiratory',
  },
  {
    type: 'Symptom',
    label: 'Fatigue',
    synonyms: ['Tiredness', 'Exhaustion', 'Lack of energy'],
    ontologies: { snomedCT: '84229001', hpo: 'HP:0012378' },
    specificity: 'nonspecific',
  },
  {
    type: 'Symptom',
    label: 'Peripheral Edema',
    synonyms: ['Leg swelling', 'Ankle edema', 'Lower extremity edema'],
    ontologies: { snomedCT: '267038008', hpo: 'HP:0001780' },
    bodyLocation: 'extremities',
  },
  {
    type: 'Symptom',
    label: 'Chest Pain',
    synonyms: ['Angina', 'Chest discomfort', 'Thoracic pain'],
    ontologies: { snomedCT: '29857009', hpo: 'HP:0100749' },
    bodyLocation: 'chest',
  },
  {
    type: 'Symptom',
    label: 'Palpitations',
    synonyms: ['Heart racing', 'Irregular heartbeat', 'Heart fluttering'],
    ontologies: { snomedCT: '80313002', hpo: 'HP:0001962' },
    bodyLocation: 'chest',
  },
  {
    type: 'Symptom',
    label: 'Polyuria',
    synonyms: ['Excessive urination', 'Frequent urination', 'Increased urine output'],
    ontologies: { snomedCT: '28442001', hpo: 'HP:0000103' },
    bodyLocation: 'urinary',
  },
  {
    type: 'Symptom',
    label: 'Polydipsia',
    synonyms: ['Excessive thirst', 'Increased thirst'],
    ontologies: { snomedCT: '17173007', hpo: 'HP:0001959' },
  },
  {
    type: 'Symptom',
    label: 'Weight Gain',
    synonyms: ['Increased weight', 'Obesity'],
    ontologies: { snomedCT: '8943002', hpo: 'HP:0004324' },
    specificity: 'nonspecific',
  },
  {
    type: 'Symptom',
    label: 'Cold Intolerance',
    synonyms: ['Sensitivity to cold', 'Feeling cold'],
    ontologies: { snomedCT: '29857009', hpo: 'HP:0002046' },
    specificity: 'moderately_specific',
  },
  {
    type: 'Symptom',
    label: 'Productive Cough',
    synonyms: ['Cough with sputum', 'Wet cough'],
    ontologies: { snomedCT: '28743005', hpo: 'HP:0031245' },
    bodyLocation: 'respiratory',
  },
  {
    type: 'Symptom',
    label: 'Depressed Mood',
    synonyms: ['Sadness', 'Low mood', 'Feeling down'],
    ontologies: { snomedCT: '366979004', hpo: 'HP:0000716' },
    bodyLocation: 'mental',
  },
  {
    type: 'Symptom',
    label: 'Anhedonia',
    synonyms: ['Loss of interest', 'Loss of pleasure', 'Apathy'],
    ontologies: { snomedCT: '37077001', hpo: 'HP:0000764' },
    bodyLocation: 'mental',
    specificity: 'highly_specific',
  },
  {
    type: 'Symptom',
    label: 'Headache',
    synonyms: ['Cephalalgia', 'Head pain'],
    ontologies: { snomedCT: '25064002', hpo: 'HP:0002315' },
    bodyLocation: 'head',
    specificity: 'nonspecific',
  },
];

// =============================================================================
// SAMPLE MEDICATIONS
// =============================================================================

const sampleMedications: CreateNodeInput<MedicationNode>[] = [
  {
    type: 'Medication',
    label: 'Metformin',
    genericName: 'Metformin',
    brandNames: ['Glucophage', 'Glifage'],
    ontologies: {
      atcCode: 'A10BA02',
      rxNormCui: '6809',
      snomedCT: '109081006',
      drugBankId: 'DB00331',
    },
    therapeuticClass: 'antidiabetico',
    mechanismOfAction: 'Biguanide that reduces hepatic glucose production and improves insulin sensitivity',
    rename: true,
    pregnancyCategory: 'B',
  },
  {
    type: 'Medication',
    label: 'Losartan',
    genericName: 'Losartan',
    brandNames: ['Cozaar', 'Losartec'],
    ontologies: {
      atcCode: 'C09CA01',
      rxNormCui: '52175',
      snomedCT: '373567002',
      drugBankId: 'DB00678',
    },
    therapeuticClass: 'anti_hipertensivo',
    mechanismOfAction: 'Angiotensin II receptor blocker (ARB)',
    rename: true,
    pregnancyCategory: 'D',
  },
  {
    type: 'Medication',
    label: 'Enalapril',
    genericName: 'Enalapril',
    brandNames: ['Vasotec', 'Renitec'],
    ontologies: {
      atcCode: 'C09AA02',
      rxNormCui: '3827',
      snomedCT: '372658000',
      drugBankId: 'DB00584',
    },
    therapeuticClass: 'anti_hipertensivo',
    mechanismOfAction: 'ACE inhibitor that reduces angiotensin II and aldosterone',
    rename: true,
    pregnancyCategory: 'D',
    pharmacogenomics: [
      {
        gene: 'ACE',
        phenotype: 'variable_response',
        implications: 'ACE I/D polymorphism affects response',
      },
    ],
  },
  {
    type: 'Medication',
    label: 'Carvedilol',
    genericName: 'Carvedilol',
    brandNames: ['Coreg', 'Dilatrend'],
    ontologies: {
      atcCode: 'C07AG02',
      rxNormCui: '20352',
      snomedCT: '386870007',
      drugBankId: 'DB01136',
    },
    therapeuticClass: 'anti_hipertensivo',
    mechanismOfAction: 'Non-selective beta-blocker with alpha-1 blocking activity',
    rename: true,
    pregnancyCategory: 'C',
    pharmacogenomics: [
      {
        gene: 'CYP2D6',
        phenotype: 'poor_metabolizer',
        implications: 'Poor metabolizers may have increased drug levels',
      },
    ],
  },
  {
    type: 'Medication',
    label: 'Furosemide',
    genericName: 'Furosemide',
    brandNames: ['Lasix'],
    ontologies: {
      atcCode: 'C03CA01',
      rxNormCui: '4603',
      snomedCT: '387475002',
      drugBankId: 'DB00695',
    },
    therapeuticClass: 'diuretico',
    mechanismOfAction: 'Loop diuretic that inhibits Na-K-2Cl cotransporter in loop of Henle',
    rename: true,
    pregnancyCategory: 'C',
  },
  {
    type: 'Medication',
    label: 'Warfarin',
    genericName: 'Warfarin',
    brandNames: ['Coumadin', 'Marevan'],
    ontologies: {
      atcCode: 'B01AA03',
      rxNormCui: '11289',
      snomedCT: '372756006',
      drugBankId: 'DB00682',
    },
    therapeuticClass: 'anticoagulante',
    mechanismOfAction: 'Vitamin K antagonist that inhibits clotting factor synthesis',
    rename: true,
    pregnancyCategory: 'X',
    pharmacogenomics: [
      {
        gene: 'CYP2C9',
        variant: '*2, *3',
        phenotype: 'poor_metabolizer',
        implications: 'Reduced dose required for poor metabolizers',
      },
      {
        gene: 'VKORC1',
        variant: '-1639G>A',
        phenotype: 'sensitive',
        implications: 'A allele carriers require lower doses',
      },
    ],
  },
  {
    type: 'Medication',
    label: 'Atorvastatin',
    genericName: 'Atorvastatin',
    brandNames: ['Lipitor', 'Citalor'],
    ontologies: {
      atcCode: 'C10AA05',
      rxNormCui: '83367',
      snomedCT: '373444002',
      drugBankId: 'DB01076',
    },
    therapeuticClass: 'hipolipemiante',
    mechanismOfAction: 'HMG-CoA reductase inhibitor (statin)',
    rename: true,
    pregnancyCategory: 'X',
  },
  {
    type: 'Medication',
    label: 'Levothyroxine',
    genericName: 'Levothyroxine',
    brandNames: ['Synthroid', 'Puran T4', 'Euthyrox'],
    ontologies: {
      atcCode: 'H03AA01',
      rxNormCui: '10582',
      snomedCT: '387509007',
      drugBankId: 'DB00451',
    },
    therapeuticClass: 'hormonio_tireoide',
    mechanismOfAction: 'Synthetic T4 (thyroxine) hormone replacement',
    rename: true,
    pregnancyCategory: 'A',
  },
  {
    type: 'Medication',
    label: 'Salbutamol',
    genericName: 'Salbutamol',
    brandNames: ['Ventolin', 'Aerolin'],
    ontologies: {
      atcCode: 'R03AC02',
      rxNormCui: '435',
      snomedCT: '372897005',
      drugBankId: 'DB01001',
    },
    therapeuticClass: 'broncodilatador',
    mechanismOfAction: 'Short-acting beta-2 agonist (SABA) bronchodilator',
    rename: true,
    pregnancyCategory: 'C',
  },
  {
    type: 'Medication',
    label: 'Sertraline',
    genericName: 'Sertraline',
    brandNames: ['Zoloft', 'Tolrest'],
    ontologies: {
      atcCode: 'N06AB06',
      rxNormCui: '36437',
      snomedCT: '372840008',
      drugBankId: 'DB01104',
    },
    therapeuticClass: 'antidepressivo',
    mechanismOfAction: 'Selective serotonin reuptake inhibitor (SSRI)',
    rename: true,
    pregnancyCategory: 'C',
    pharmacogenomics: [
      {
        gene: 'CYP2C19',
        phenotype: 'poor_metabolizer',
        implications: 'Consider 50% dose reduction in poor metabolizers',
      },
    ],
  },
  {
    type: 'Medication',
    label: 'Aspirin',
    genericName: 'Acetylsalicylic Acid',
    brandNames: ['AAS', 'Aspirina'],
    ontologies: {
      atcCode: 'B01AC06',
      rxNormCui: '1191',
      snomedCT: '387458008',
      drugBankId: 'DB00945',
    },
    therapeuticClass: 'antiagregante',
    mechanismOfAction: 'Irreversible COX-1 inhibitor that prevents platelet aggregation',
    rename: true,
    pregnancyCategory: 'D',
  },
];

// =============================================================================
// SAMPLE EXAMINATIONS
// =============================================================================

const sampleExaminations: CreateNodeInput<ExaminationNode>[] = [
  {
    type: 'Examination',
    label: 'Fasting Glucose',
    synonyms: ['Fasting Blood Glucose', 'FBG', 'Glycemia'],
    ontologies: { loinc: '1558-6', snomedCT: '33747003' },
    examType: 'laboratory',
    sampleType: 'Serum/Plasma',
    referenceRange: { low: 70, high: 100, unit: 'mg/dL' },
  },
  {
    type: 'Examination',
    label: 'HbA1c',
    synonyms: ['Glycated Hemoglobin', 'Hemoglobin A1c'],
    ontologies: { loinc: '4548-4', snomedCT: '43396009' },
    examType: 'laboratory',
    sampleType: 'Whole Blood',
    referenceRange: { high: 5.7, unit: '%' },
  },
  {
    type: 'Examination',
    label: 'Creatinine',
    synonyms: ['Serum Creatinine', 'Cr'],
    ontologies: { loinc: '2160-0', snomedCT: '113075003' },
    examType: 'laboratory',
    sampleType: 'Serum/Plasma',
    referenceRange: { low: 0.7, high: 1.3, unit: 'mg/dL' },
  },
  {
    type: 'Examination',
    label: 'BNP',
    synonyms: ['B-type Natriuretic Peptide', 'Brain Natriuretic Peptide'],
    ontologies: { loinc: '30934-4', snomedCT: '390917007' },
    examType: 'laboratory',
    sampleType: 'Plasma',
    referenceRange: { high: 100, unit: 'pg/mL' },
  },
  {
    type: 'Examination',
    label: 'NT-proBNP',
    synonyms: ['N-terminal pro-BNP'],
    ontologies: { loinc: '33762-6', snomedCT: '390917007' },
    examType: 'laboratory',
    sampleType: 'Serum/Plasma',
    referenceRange: { high: 300, unit: 'pg/mL' },
  },
  {
    type: 'Examination',
    label: 'TSH',
    synonyms: ['Thyroid Stimulating Hormone', 'Thyrotropin'],
    ontologies: { loinc: '3016-3', snomedCT: '61167004' },
    examType: 'laboratory',
    sampleType: 'Serum',
    referenceRange: { low: 0.4, high: 4.0, unit: 'mIU/L' },
  },
  {
    type: 'Examination',
    label: 'Free T4',
    synonyms: ['Free Thyroxine', 'FT4'],
    ontologies: { loinc: '3024-7', snomedCT: '104810007' },
    examType: 'laboratory',
    sampleType: 'Serum',
    referenceRange: { low: 0.8, high: 1.8, unit: 'ng/dL' },
  },
  {
    type: 'Examination',
    label: 'Total Cholesterol',
    synonyms: ['Cholesterol', 'TC'],
    ontologies: { loinc: '2093-3', snomedCT: '77068002' },
    examType: 'laboratory',
    sampleType: 'Serum',
    referenceRange: { high: 200, unit: 'mg/dL' },
  },
  {
    type: 'Examination',
    label: 'LDL Cholesterol',
    synonyms: ['LDL-C', 'Low-density lipoprotein'],
    ontologies: { loinc: '2089-1', snomedCT: '113079009' },
    examType: 'laboratory',
    sampleType: 'Serum',
    referenceRange: { high: 100, unit: 'mg/dL' },
  },
  {
    type: 'Examination',
    label: 'Electrocardiogram',
    synonyms: ['ECG', 'EKG', '12-lead ECG'],
    ontologies: { loinc: '34534-8', snomedCT: '29303009' },
    examType: 'functional',
  },
  {
    type: 'Examination',
    label: 'Echocardiogram',
    synonyms: ['Echo', 'Cardiac Ultrasound', 'TTE'],
    ontologies: { loinc: '34552-0', snomedCT: '40701008' },
    examType: 'imaging',
  },
  {
    type: 'Examination',
    label: 'Spirometry',
    synonyms: ['Pulmonary Function Test', 'PFT'],
    ontologies: { loinc: '19926-5', snomedCT: '127783003' },
    examType: 'functional',
  },
  {
    type: 'Examination',
    label: 'eGFR',
    synonyms: ['Estimated GFR', 'Glomerular Filtration Rate'],
    ontologies: { loinc: '62238-1', snomedCT: '80274001' },
    examType: 'laboratory',
    referenceRange: { low: 90, unit: 'mL/min/1.73m2' },
  },
  {
    type: 'Examination',
    label: 'INR',
    synonyms: ['International Normalized Ratio', 'Prothrombin Time INR'],
    ontologies: { loinc: '6301-6', snomedCT: '165581004' },
    examType: 'laboratory',
    sampleType: 'Plasma',
  },
];

// =============================================================================
// SAMPLE PATHWAYS
// =============================================================================

const samplePathways: CreateNodeInput<PathwayNode>[] = [
  {
    type: 'Pathway',
    label: 'Renin-Angiotensin-Aldosterone System',
    synonyms: ['RAAS', 'RAS'],
    ontologies: { kegg: 'hsa04614', reactome: 'R-HSA-2022377' },
    pathwayType: 'signaling',
    keyMolecules: ['Renin', 'Angiotensin I', 'Angiotensin II', 'ACE', 'Aldosterone'],
  },
  {
    type: 'Pathway',
    label: 'Insulin Signaling Pathway',
    synonyms: ['Insulin pathway'],
    ontologies: { kegg: 'hsa04910', reactome: 'R-HSA-74751' },
    pathwayType: 'metabolic',
    keyMolecules: ['Insulin', 'Insulin Receptor', 'IRS-1', 'PI3K', 'Akt', 'GLUT4'],
  },
  {
    type: 'Pathway',
    label: 'Cardiac Remodeling',
    synonyms: ['Ventricular remodeling'],
    ontologies: { reactome: 'R-HSA-5578775' },
    pathwayType: 'signaling',
    keyMolecules: ['Angiotensin II', 'TGF-beta', 'Collagen', 'MMPs'],
  },
  {
    type: 'Pathway',
    label: 'Coagulation Cascade',
    synonyms: ['Blood coagulation', 'Clotting cascade'],
    ontologies: { kegg: 'hsa04610', reactome: 'R-HSA-140877' },
    pathwayType: 'signaling',
    keyMolecules: ['Factor X', 'Thrombin', 'Fibrinogen', 'Vitamin K'],
  },
  {
    type: 'Pathway',
    label: 'Cholesterol Biosynthesis',
    synonyms: ['Mevalonate pathway'],
    ontologies: { kegg: 'hsa00900', reactome: 'R-HSA-191273' },
    pathwayType: 'metabolic',
    keyMolecules: ['HMG-CoA', 'HMG-CoA Reductase', 'Mevalonate', 'Squalene'],
  },
  {
    type: 'Pathway',
    label: 'Thyroid Hormone Synthesis',
    synonyms: ['T3/T4 synthesis'],
    ontologies: { kegg: 'hsa04918' },
    pathwayType: 'metabolic',
    keyMolecules: ['Thyroglobulin', 'TPO', 'Iodine', 'T4', 'T3'],
  },
  {
    type: 'Pathway',
    label: 'Serotonin Signaling',
    synonyms: ['5-HT signaling'],
    ontologies: { kegg: 'hsa04726', reactome: 'R-HSA-390666' },
    pathwayType: 'signaling',
    keyMolecules: ['Serotonin', '5-HT receptors', 'SERT'],
  },
];

// =============================================================================
// PRENATAL HIGH-RISK CONDITIONS
// =============================================================================

const prenatalDiseases: CreateNodeInput<DiseaseNode>[] = [
  {
    type: 'Disease',
    label: 'Gestational Diabetes Mellitus',
    synonyms: ['DMG', 'GDM', 'Diabetes Gestacional'],
    ontologies: {
      doid: 'DOID:11714',
      icd10: ['O24.4', 'O24.9'],
      icd11: ['JA63'],
      snomedCT: '11687002',
      ciap2: ['W84'],
    },
    category: 'obstetrico',
    chronic: false,
    epidemiology: {
      prevalence: '7-18% of pregnancies',
      incidence: '7-10% per pregnancy',
      ageGroups: ['adults'],
    },
  },
  {
    type: 'Disease',
    label: 'Preeclampsia',
    synonyms: ['PE', 'Pré-eclâmpsia', 'Pregnancy-induced hypertension', 'PIH'],
    ontologies: {
      doid: 'DOID:10591',
      icd10: ['O14', 'O14.0', 'O14.1', 'O14.9'],
      icd11: ['JA24'],
      snomedCT: '398254007',
      ciap2: ['W81'],
    },
    category: 'obstetrico',
    chronic: false,
    epidemiology: {
      prevalence: '3-8% of pregnancies',
      incidence: '5-7% per pregnancy',
      ageGroups: ['adults'],
    },
  },
  {
    type: 'Disease',
    label: 'HELLP Syndrome',
    synonyms: ['HELLP', 'Hemolysis Elevated Liver enzymes Low Platelets'],
    ontologies: {
      doid: 'DOID:13566',
      icd10: ['O14.2'],
      icd11: ['JA24.1'],
      snomedCT: '95605009',
      ciap2: ['W81'],
    },
    category: 'obstetrico',
    chronic: false,
    epidemiology: {
      prevalence: '0.5-0.9% of pregnancies',
      incidence: '10-20% of severe preeclampsia',
      ageGroups: ['adults'],
    },
  },
  {
    type: 'Disease',
    label: 'Gestational HIV',
    synonyms: ['HIV na Gestação', 'HIV in Pregnancy', 'Maternal HIV'],
    ontologies: {
      doid: 'DOID:526',
      icd10: ['O98.7', 'B20'],
      icd11: ['1C62'],
      snomedCT: '86406008',
      ciap2: ['W78'],
    },
    category: 'obstetrico',
    chronic: true,
    epidemiology: {
      prevalence: '0.3-0.5% of pregnancies in Brazil',
      ageGroups: ['adults'],
    },
  },
  {
    type: 'Disease',
    label: 'Gestational Syphilis',
    synonyms: ['Sífilis na Gestação', 'Syphilis in Pregnancy', 'Maternal Syphilis'],
    ontologies: {
      doid: 'DOID:4166',
      icd10: ['O98.1', 'A50', 'A51', 'A52'],
      icd11: ['1A60'],
      snomedCT: '76272004',
      ciap2: ['W78'],
    },
    category: 'obstetrico',
    chronic: false,
    epidemiology: {
      prevalence: '1.5-2% of pregnancies in Brazil',
      ageGroups: ['adults'],
    },
  },
  {
    type: 'Disease',
    label: 'Chronic Hypertension in Pregnancy',
    synonyms: ['HAS Crônica na Gestação', 'Pre-existing Hypertension in Pregnancy'],
    ontologies: {
      icd10: ['O10', 'O10.0', 'O10.9'],
      icd11: ['JA20'],
      snomedCT: '48194001',
      ciap2: ['W81'],
    },
    category: 'obstetrico',
    chronic: true,
    epidemiology: {
      prevalence: '1-5% of pregnancies',
      ageGroups: ['adults'],
    },
  },
];

const prenatalMedications: CreateNodeInput<MedicationNode>[] = [
  {
    type: 'Medication',
    label: 'Insulin NPH',
    genericName: 'Insulin NPH',
    synonyms: ['NPH Insulin', 'Isophane Insulin', 'Insulina NPH'],
    ontologies: {
      atcCode: 'A10AC01',
      rxNormCui: '5856',
      drugBankId: 'DB00046',
    },
    therapeuticClass: 'Insulin',
    rename: true,
    pregnancyCategory: 'B',
  },
  {
    type: 'Medication',
    label: 'Insulin Regular',
    genericName: 'Insulin Regular',
    synonyms: ['Regular Insulin', 'Short-acting Insulin', 'Insulina Regular'],
    ontologies: {
      atcCode: 'A10AB01',
      rxNormCui: '5856',
      drugBankId: 'DB00030',
    },
    therapeuticClass: 'Insulin',
    rename: true,
    pregnancyCategory: 'B',
  },
  {
    type: 'Medication',
    label: 'Magnesium Sulfate',
    genericName: 'Magnesium Sulfate',
    synonyms: ['MgSO4', 'Sulfato de Magnésio'],
    ontologies: {
      atcCode: 'A12CC02',
      rxNormCui: '6585',
      drugBankId: 'DB00653',
    },
    therapeuticClass: 'Anticonvulsant',
    rename: true,
    pregnancyCategory: 'A',
  },
  {
    type: 'Medication',
    label: 'Methyldopa',
    genericName: 'Methyldopa',
    synonyms: ['Metildopa', 'Aldomet'],
    ontologies: {
      atcCode: 'C02AB01',
      rxNormCui: '6876',
      drugBankId: 'DB00968',
    },
    therapeuticClass: 'Antihypertensive',
    rename: true,
    pregnancyCategory: 'B',
  },
  {
    type: 'Medication',
    label: 'Nifedipine',
    genericName: 'Nifedipine',
    synonyms: ['Nifedipina', 'Adalat'],
    ontologies: {
      atcCode: 'C08CA05',
      rxNormCui: '7417',
      drugBankId: 'DB01115',
    },
    therapeuticClass: 'Calcium Channel Blocker',
    rename: true,
    pregnancyCategory: 'C',
  },
  {
    type: 'Medication',
    label: 'Hydralazine',
    genericName: 'Hydralazine',
    synonyms: ['Hidralazina', 'Apresolina'],
    ontologies: {
      atcCode: 'C02DB02',
      rxNormCui: '5470',
      drugBankId: 'DB01275',
    },
    therapeuticClass: 'Vasodilator',
    rename: true,
    pregnancyCategory: 'C',
  },
  {
    type: 'Medication',
    label: 'Benzathine Penicillin G',
    genericName: 'Benzathine Penicillin G',
    synonyms: ['Penicilina Benzatina', 'Benzetacil'],
    ontologies: {
      atcCode: 'J01CE08',
      rxNormCui: '7980',
      drugBankId: 'DB01053',
    },
    therapeuticClass: 'Antibiotic',
    rename: true,
    pregnancyCategory: 'B',
  },
  {
    type: 'Medication',
    label: 'Dolutegravir',
    genericName: 'Dolutegravir',
    synonyms: ['DTG', 'Tivicay'],
    ontologies: {
      atcCode: 'J05AJ03',
      rxNormCui: '1433868',
      drugBankId: 'DB08930',
    },
    therapeuticClass: 'Integrase Inhibitor',
    rename: false,
    pregnancyCategory: 'B',
  },
  {
    type: 'Medication',
    label: 'Tenofovir/Lamivudine',
    genericName: 'Tenofovir/Lamivudine',
    synonyms: ['TDF/3TC', 'Tenofovir + Lamivudina'],
    ontologies: {
      atcCode: 'J05AR13',
    },
    therapeuticClass: 'Nucleoside Reverse Transcriptase Inhibitor',
    rename: false,
    pregnancyCategory: 'B',
  },
  {
    type: 'Medication',
    label: 'Aspirin Low-Dose',
    genericName: 'Aspirin Low-Dose',
    synonyms: ['AAS 100mg', 'Low-dose Aspirin', 'Aspirina Baixa Dose'],
    ontologies: {
      atcCode: 'B01AC06',
      rxNormCui: '1191',
      drugBankId: 'DB00945',
    },
    therapeuticClass: 'Antiplatelet',
    rename: true,
    pregnancyCategory: 'C',
  },
];

// Prenatal contraindicated medications (for CONTRAINDICATED_IN edges)
const prenatalContraindications = [
  { drug: 'Enalapril', condition: 'Pregnancy', reason: 'Teratogenic - fetal renal dysgenesis' },
  { drug: 'Losartan', condition: 'Pregnancy', reason: 'Teratogenic - oligohydramnios, fetal death' },
  { drug: 'Warfarin', condition: 'Pregnancy', reason: 'Teratogenic - warfarin embryopathy' },
  { drug: 'Atorvastatin', condition: 'Pregnancy', reason: 'Contraindicated - potential fetal harm' },
  { drug: 'Metformin', condition: 'Gestational Diabetes Mellitus', reason: 'Prefer insulin, metformin only if insulin refused' },
];

// =============================================================================
// POPULATION FUNCTION
// =============================================================================

/**
 * Populate the knowledge graph with sample medical data
 */
export function populateSampleData(service: KnowledgeGraphService): void {
  // Add all diseases
  sampleDiseases.forEach((disease) => {
    service.addNode(disease);
  });

  // Add prenatal diseases
  prenatalDiseases.forEach((disease) => {
    service.addNode(disease);
  });

  // Add all symptoms
  sampleSymptoms.forEach((symptom) => {
    service.addNode(symptom);
  });

  // Add all medications
  sampleMedications.forEach((medication) => {
    service.addNode(medication);
  });

  // Add prenatal medications
  prenatalMedications.forEach((medication) => {
    service.addNode(medication);
  });

  // Add all examinations
  sampleExaminations.forEach((exam) => {
    service.addNode(exam);
  });

  // Add all pathways
  samplePathways.forEach((pathway) => {
    service.addNode(pathway);
  });

  // Add relationships

  // Disease -> Symptom relationships
  const symptomRelations: { disease: string; symptom: string; frequency: string; presenting?: boolean }[] = [
    // Diabetes
    { disease: 'Diabetes Mellitus Type 2', symptom: 'Polyuria', frequency: 'common', presenting: true },
    { disease: 'Diabetes Mellitus Type 2', symptom: 'Polydipsia', frequency: 'common', presenting: true },
    { disease: 'Diabetes Mellitus Type 2', symptom: 'Fatigue', frequency: 'common' },
    { disease: 'Diabetes Mellitus Type 2', symptom: 'Weight Gain', frequency: 'occasional' },
    // Hypertension
    { disease: 'Arterial Hypertension', symptom: 'Headache', frequency: 'occasional' },
    { disease: 'Arterial Hypertension', symptom: 'Fatigue', frequency: 'occasional' },
    // Heart Failure
    { disease: 'Heart Failure', symptom: 'Dyspnea', frequency: 'very_common', presenting: true },
    { disease: 'Heart Failure', symptom: 'Fatigue', frequency: 'very_common', presenting: true },
    { disease: 'Heart Failure', symptom: 'Peripheral Edema', frequency: 'very_common', presenting: true },
    // Atrial Fibrillation
    { disease: 'Atrial Fibrillation', symptom: 'Palpitations', frequency: 'very_common', presenting: true },
    { disease: 'Atrial Fibrillation', symptom: 'Dyspnea', frequency: 'common' },
    { disease: 'Atrial Fibrillation', symptom: 'Fatigue', frequency: 'common' },
    // CAD
    { disease: 'Stable Coronary Artery Disease', symptom: 'Chest Pain', frequency: 'very_common', presenting: true },
    { disease: 'Stable Coronary Artery Disease', symptom: 'Dyspnea', frequency: 'common' },
    // Hypothyroidism
    { disease: 'Hypothyroidism', symptom: 'Fatigue', frequency: 'very_common', presenting: true },
    { disease: 'Hypothyroidism', symptom: 'Weight Gain', frequency: 'common', presenting: true },
    { disease: 'Hypothyroidism', symptom: 'Cold Intolerance', frequency: 'common', presenting: true },
    // COPD
    { disease: 'Chronic Obstructive Pulmonary Disease', symptom: 'Dyspnea', frequency: 'very_common', presenting: true },
    { disease: 'Chronic Obstructive Pulmonary Disease', symptom: 'Productive Cough', frequency: 'very_common', presenting: true },
    // Depression
    { disease: 'Major Depressive Disorder', symptom: 'Depressed Mood', frequency: 'always', presenting: true },
    { disease: 'Major Depressive Disorder', symptom: 'Anhedonia', frequency: 'very_common', presenting: true },
    { disease: 'Major Depressive Disorder', symptom: 'Fatigue', frequency: 'common' },
    // CKD
    { disease: 'Chronic Kidney Disease', symptom: 'Fatigue', frequency: 'common' },
    { disease: 'Chronic Kidney Disease', symptom: 'Peripheral Edema', frequency: 'occasional' },
  ];

  symptomRelations.forEach((rel) => {
    const diseaseNode = service.getNodesByType('Disease').find((n) => n.label === rel.disease);
    const symptomNode = service.getNodesByType('Symptom').find((n) => n.label === rel.symptom);

    if (diseaseNode && symptomNode) {
      service.addEdge<SymptomEdge>({
        source: diseaseNode.id,
        target: symptomNode.id,
        type: 'MANIFESTS_AS',
        weight: rel.frequency === 'always' ? 1.0 : rel.frequency === 'very_common' ? 0.9 : rel.frequency === 'common' ? 0.7 : 0.4,
        properties: {
          frequency: rel.frequency as 'always' | 'very_common' | 'common' | 'occasional' | 'rare',
          presenting: rel.presenting,
        },
      });
    }
  });

  // Medication -> Disease (TREATS) relationships
  const treatmentRelations: { medication: string; disease: string; lineOfTherapy: string }[] = [
    // Diabetes treatments
    { medication: 'Metformin', disease: 'Diabetes Mellitus Type 2', lineOfTherapy: 'first' },
    // Hypertension treatments
    { medication: 'Losartan', disease: 'Arterial Hypertension', lineOfTherapy: 'first' },
    { medication: 'Enalapril', disease: 'Arterial Hypertension', lineOfTherapy: 'first' },
    // Heart failure treatments
    { medication: 'Enalapril', disease: 'Heart Failure', lineOfTherapy: 'first' },
    { medication: 'Carvedilol', disease: 'Heart Failure', lineOfTherapy: 'first' },
    { medication: 'Furosemide', disease: 'Heart Failure', lineOfTherapy: 'first' },
    { medication: 'Losartan', disease: 'Heart Failure', lineOfTherapy: 'second' },
    // Atrial fibrillation
    { medication: 'Warfarin', disease: 'Atrial Fibrillation', lineOfTherapy: 'first' },
    { medication: 'Carvedilol', disease: 'Atrial Fibrillation', lineOfTherapy: 'first' },
    // CAD
    { medication: 'Aspirin', disease: 'Stable Coronary Artery Disease', lineOfTherapy: 'first' },
    { medication: 'Atorvastatin', disease: 'Stable Coronary Artery Disease', lineOfTherapy: 'first' },
    // Hypothyroidism
    { medication: 'Levothyroxine', disease: 'Hypothyroidism', lineOfTherapy: 'first' },
    // COPD
    { medication: 'Salbutamol', disease: 'Chronic Obstructive Pulmonary Disease', lineOfTherapy: 'first' },
    // Depression
    { medication: 'Sertraline', disease: 'Major Depressive Disorder', lineOfTherapy: 'first' },
    // CKD - secondary prevention
    { medication: 'Enalapril', disease: 'Chronic Kidney Disease', lineOfTherapy: 'first' },
    { medication: 'Losartan', disease: 'Chronic Kidney Disease', lineOfTherapy: 'first' },
    // Dyslipidemia
    { medication: 'Atorvastatin', disease: 'Dyslipidemia', lineOfTherapy: 'first' },
  ];

  treatmentRelations.forEach((rel) => {
    const medNode = service.getNodesByType('Medication').find((n) => n.label === rel.medication);
    const diseaseNode = service.getNodesByType('Disease').find((n) => n.label === rel.disease);

    if (medNode && diseaseNode) {
      const edgeType = rel.lineOfTherapy === 'first' ? 'FIRST_LINE_FOR' : 'SECOND_LINE_FOR';
      service.addEdge<TreatmentEdge>({
        source: medNode.id,
        target: diseaseNode.id,
        type: edgeType,
        weight: rel.lineOfTherapy === 'first' ? 1.0 : 0.8,
        properties: {},
      });
    }
  });

  // Examination -> Disease (DIAGNOSED_BY) relationships
  const diagnosticRelations: { exam: string; disease: string; sensitivity?: number; specificity?: number }[] = [
    // Diabetes
    { exam: 'Fasting Glucose', disease: 'Diabetes Mellitus Type 2', sensitivity: 0.85, specificity: 0.95 },
    { exam: 'HbA1c', disease: 'Diabetes Mellitus Type 2', sensitivity: 0.90, specificity: 0.98 },
    // Heart Failure
    { exam: 'BNP', disease: 'Heart Failure', sensitivity: 0.95, specificity: 0.75 },
    { exam: 'NT-proBNP', disease: 'Heart Failure', sensitivity: 0.95, specificity: 0.78 },
    { exam: 'Echocardiogram', disease: 'Heart Failure', sensitivity: 0.95, specificity: 0.90 },
    // Atrial Fibrillation
    { exam: 'Electrocardiogram', disease: 'Atrial Fibrillation', sensitivity: 0.99, specificity: 0.99 },
    // Hypothyroidism
    { exam: 'TSH', disease: 'Hypothyroidism', sensitivity: 0.98, specificity: 0.92 },
    { exam: 'Free T4', disease: 'Hypothyroidism', sensitivity: 0.85, specificity: 0.90 },
    // COPD
    { exam: 'Spirometry', disease: 'Chronic Obstructive Pulmonary Disease', sensitivity: 0.95, specificity: 0.85 },
    // CKD
    { exam: 'Creatinine', disease: 'Chronic Kidney Disease', sensitivity: 0.80, specificity: 0.90 },
    { exam: 'eGFR', disease: 'Chronic Kidney Disease', sensitivity: 0.95, specificity: 0.95 },
    // Dyslipidemia
    { exam: 'Total Cholesterol', disease: 'Dyslipidemia', sensitivity: 0.85, specificity: 0.85 },
    { exam: 'LDL Cholesterol', disease: 'Dyslipidemia', sensitivity: 0.90, specificity: 0.90 },
    // Warfarin monitoring
    { exam: 'INR', disease: 'Atrial Fibrillation' },
  ];

  diagnosticRelations.forEach((rel) => {
    const examNode = service.getNodesByType('Examination').find((n) => n.label === rel.exam);
    const diseaseNode = service.getNodesByType('Disease').find((n) => n.label === rel.disease);

    if (examNode && diseaseNode) {
      service.addEdge<DiagnosticEdge>({
        source: examNode.id,
        target: diseaseNode.id,
        type: 'DIAGNOSED_BY',
        weight: rel.sensitivity || 0.8,
        properties: {
          sensitivity: rel.sensitivity,
          specificity: rel.specificity,
        },
      });
    }
  });

  // Drug interactions
  const interactions: { drug1: string; drug2: string; severity: InteractionSeverity; effect: string; mechanism: string }[] = [
    {
      drug1: 'Warfarin',
      drug2: 'Aspirin',
      severity: 'severe',
      effect: 'Increased bleeding risk',
      mechanism: 'Additive anticoagulant/antiplatelet effects',
    },
    {
      drug1: 'Enalapril',
      drug2: 'Losartan',
      severity: 'moderate',
      effect: 'Hyperkalemia, hypotension, renal impairment',
      mechanism: 'Dual RAAS blockade',
    },
    {
      drug1: 'Metformin',
      drug2: 'Furosemide',
      severity: 'moderate',
      effect: 'Increased lactic acidosis risk',
      mechanism: 'Furosemide may impair renal function affecting metformin clearance',
    },
    {
      drug1: 'Sertraline',
      drug2: 'Warfarin',
      severity: 'moderate',
      effect: 'Increased INR and bleeding risk',
      mechanism: 'SSRI inhibition of platelet function and possible CYP2C9 inhibition',
    },
    {
      drug1: 'Atorvastatin',
      drug2: 'Warfarin',
      severity: 'moderate',
      effect: 'Increased INR',
      mechanism: 'CYP2C9 competition',
    },
  ];

  interactions.forEach((rel) => {
    const drug1Node = service.getNodesByType('Medication').find((n) => n.label === rel.drug1);
    const drug2Node = service.getNodesByType('Medication').find((n) => n.label === rel.drug2);

    if (drug1Node && drug2Node) {
      service.addEdge<InteractionEdge>({
        source: drug1Node.id,
        target: drug2Node.id,
        type: 'INTERACTS_WITH',
        weight: rel.severity === 'contraindicated' ? 1.0 : rel.severity === 'severe' ? 0.9 : rel.severity === 'moderate' ? 0.6 : 0.3,
        properties: {
          severity: rel.severity,
          effect: rel.effect,
          mechanism: rel.mechanism,
          recommendation: rel.severity === 'severe' ? 'Avoid combination or monitor closely' : 'Monitor therapy',
          bidirectional: true,
        },
      });
    }
  });

  // Disease progressions/complications
  const progressions: { from: string; to: string; probability?: number; timeframe?: string }[] = [
    { from: 'Diabetes Mellitus Type 2', to: 'Chronic Kidney Disease', probability: 0.3, timeframe: '10-20 years' },
    { from: 'Arterial Hypertension', to: 'Heart Failure', probability: 0.2, timeframe: '10-20 years' },
    { from: 'Arterial Hypertension', to: 'Chronic Kidney Disease', probability: 0.15, timeframe: '10-20 years' },
    { from: 'Atrial Fibrillation', to: 'Heart Failure', probability: 0.25, timeframe: '5-10 years' },
    { from: 'Stable Coronary Artery Disease', to: 'Heart Failure', probability: 0.2, timeframe: '5-15 years' },
    { from: 'Dyslipidemia', to: 'Stable Coronary Artery Disease', probability: 0.3, timeframe: '10-30 years' },
  ];

  progressions.forEach((rel) => {
    const fromNode = service.getNodesByType('Disease').find((n) => n.label === rel.from);
    const toNode = service.getNodesByType('Disease').find((n) => n.label === rel.to);

    if (fromNode && toNode) {
      service.addEdge<ProgressionEdge>({
        source: fromNode.id,
        target: toNode.id,
        type: 'PROGRESSES_TO',
        weight: rel.probability || 0.2,
        properties: {
          probability: rel.probability,
          timeframe: rel.timeframe,
          preventable: true,
        },
      });
    }
  });

  // Comorbidities (bidirectional associations)
  const comorbidities: { disease1: string; disease2: string; frequency?: number }[] = [
    { disease1: 'Diabetes Mellitus Type 2', disease2: 'Arterial Hypertension', frequency: 0.6 },
    { disease1: 'Diabetes Mellitus Type 2', disease2: 'Dyslipidemia', frequency: 0.7 },
    { disease1: 'Arterial Hypertension', disease2: 'Dyslipidemia', frequency: 0.5 },
    { disease1: 'Atrial Fibrillation', disease2: 'Heart Failure', frequency: 0.4 },
    { disease1: 'Major Depressive Disorder', disease2: 'Diabetes Mellitus Type 2', frequency: 0.15 },
    { disease1: 'Chronic Kidney Disease', disease2: 'Arterial Hypertension', frequency: 0.8 },
    { disease1: 'Heart Failure', disease2: 'Chronic Kidney Disease', frequency: 0.4 },
  ];

  comorbidities.forEach((rel) => {
    const disease1Node = service.getNodesByType('Disease').find((n) => n.label === rel.disease1);
    const disease2Node = service.getNodesByType('Disease').find((n) => n.label === rel.disease2);

    if (disease1Node && disease2Node) {
      service.addEdge<ComorbidityEdge>({
        source: disease1Node.id,
        target: disease2Node.id,
        type: 'COMORBID_WITH',
        weight: rel.frequency || 0.3,
        properties: {
          frequency: rel.frequency,
        },
      });
    }
  });

  // Disease -> Pathway relationships
  const pathwayRelations: { disease: string; pathway: string }[] = [
    { disease: 'Diabetes Mellitus Type 2', pathway: 'Insulin Signaling Pathway' },
    { disease: 'Arterial Hypertension', pathway: 'Renin-Angiotensin-Aldosterone System' },
    { disease: 'Heart Failure', pathway: 'Renin-Angiotensin-Aldosterone System' },
    { disease: 'Heart Failure', pathway: 'Cardiac Remodeling' },
    { disease: 'Atrial Fibrillation', pathway: 'Coagulation Cascade' },
    { disease: 'Dyslipidemia', pathway: 'Cholesterol Biosynthesis' },
    { disease: 'Hypothyroidism', pathway: 'Thyroid Hormone Synthesis' },
    { disease: 'Major Depressive Disorder', pathway: 'Serotonin Signaling' },
  ];

  pathwayRelations.forEach((rel) => {
    const diseaseNode = service.getNodesByType('Disease').find((n) => n.label === rel.disease);
    const pathwayNode = service.getNodesByType('Pathway').find((n) => n.label === rel.pathway);

    if (diseaseNode && pathwayNode) {
      service.addEdge({
        source: diseaseNode.id,
        target: pathwayNode.id,
        type: 'INVOLVES_PATHWAY',
        weight: 0.9,
      });
    }
  });

  // Medication -> Pathway (TARGETS_PATHWAY)
  const medPathwayRelations: { medication: string; pathway: string }[] = [
    { medication: 'Metformin', pathway: 'Insulin Signaling Pathway' },
    { medication: 'Enalapril', pathway: 'Renin-Angiotensin-Aldosterone System' },
    { medication: 'Losartan', pathway: 'Renin-Angiotensin-Aldosterone System' },
    { medication: 'Warfarin', pathway: 'Coagulation Cascade' },
    { medication: 'Atorvastatin', pathway: 'Cholesterol Biosynthesis' },
    { medication: 'Levothyroxine', pathway: 'Thyroid Hormone Synthesis' },
    { medication: 'Sertraline', pathway: 'Serotonin Signaling' },
  ];

  medPathwayRelations.forEach((rel) => {
    const medNode = service.getNodesByType('Medication').find((n) => n.label === rel.medication);
    const pathwayNode = service.getNodesByType('Pathway').find((n) => n.label === rel.pathway);

    if (medNode && pathwayNode) {
      service.addEdge({
        source: medNode.id,
        target: pathwayNode.id,
        type: 'TARGETS_PATHWAY',
        weight: 0.95,
      });
    }
  });

  // =============================================================================
  // PRENATAL RELATIONSHIPS
  // =============================================================================

  // Prenatal Disease -> Medication (TREATS / FIRST_LINE_FOR)
  const prenatalTreatments: { disease: string; medication: string; firstLine?: boolean }[] = [
    // Gestational Diabetes
    { disease: 'Gestational Diabetes Mellitus', medication: 'Insulin NPH', firstLine: true },
    { disease: 'Gestational Diabetes Mellitus', medication: 'Insulin Regular', firstLine: true },
    // Preeclampsia
    { disease: 'Preeclampsia', medication: 'Magnesium Sulfate', firstLine: true },
    { disease: 'Preeclampsia', medication: 'Methyldopa' },
    { disease: 'Preeclampsia', medication: 'Nifedipine' },
    { disease: 'Preeclampsia', medication: 'Hydralazine' },
    { disease: 'Preeclampsia', medication: 'Aspirin Low-Dose' },
    // HELLP
    { disease: 'HELLP Syndrome', medication: 'Magnesium Sulfate', firstLine: true },
    // Chronic HTN in Pregnancy
    { disease: 'Chronic Hypertension in Pregnancy', medication: 'Methyldopa', firstLine: true },
    { disease: 'Chronic Hypertension in Pregnancy', medication: 'Nifedipine' },
    // HIV
    { disease: 'Gestational HIV', medication: 'Dolutegravir', firstLine: true },
    { disease: 'Gestational HIV', medication: 'Tenofovir/Lamivudine', firstLine: true },
    // Syphilis
    { disease: 'Gestational Syphilis', medication: 'Benzathine Penicillin G', firstLine: true },
  ];

  prenatalTreatments.forEach((rel) => {
    const diseaseNode = service.getNodesByType('Disease').find((n) => n.label === rel.disease);
    const medNode = service.getNodesByType('Medication').find((n) => n.label === rel.medication);

    if (diseaseNode && medNode) {
      service.addEdge({
        source: medNode.id,
        target: diseaseNode.id,
        type: rel.firstLine ? 'FIRST_LINE_FOR' : 'TREATS',
        weight: rel.firstLine ? 1.0 : 0.85,
      });
    }
  });

  // Progression: Preeclampsia -> HELLP
  const preeclNode = service.getNodesByType('Disease').find((n) => n.label === 'Preeclampsia');
  const hellpNode = service.getNodesByType('Disease').find((n) => n.label === 'HELLP Syndrome');
  if (preeclNode && hellpNode) {
    service.addEdge({
      source: preeclNode.id,
      target: hellpNode.id,
      type: 'PROGRESSES_TO',
      weight: 0.15,
    });
  }

  console.log(`Knowledge Graph populated with ${service.getStats().totalNodes} nodes and ${service.getStats().totalEdges} edges`);
}

/**
 * Create and return a pre-populated knowledge graph service
 */
export function createPopulatedKnowledgeGraph(): KnowledgeGraphService {
  const service = new KnowledgeGraphService();
  populateSampleData(service);
  return service;
}

// Export sample data for testing
export {
  sampleDiseases,
  sampleSymptoms,
  sampleMedications,
  sampleExaminations,
  samplePathways,
  prenatalDiseases,
  prenatalMedications,
};
