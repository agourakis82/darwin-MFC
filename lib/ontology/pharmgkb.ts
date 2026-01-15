/**
 * DARWIN-MFC PHARMGKB DATA MODULE
 * ================================
 *
 * Comprehensive PharmGKB pharmacogenomics data for clinically relevant genes
 * affecting drug metabolism and response in Primary Health Care settings.
 *
 * Key pharmacogenes covered:
 * - CYP2D6 (codeine, tramadol, antidepressants)
 * - CYP2C19 (clopidogrel, omeprazole, antidepressants)
 * - CYP2C9 (warfarin, phenytoin)
 * - TPMT (azathioprine, 6-mercaptopurine)
 * - DPYD (fluorouracil, capecitabine)
 * - VKORC1 (warfarin)
 * - HLA-B*5701 (abacavir)
 * - HLA-B*1502 (carbamazepine)
 *
 * Reference: https://www.pharmgkb.org
 * CPIC Guidelines: https://cpicpgx.org
 */

// =============================================================================
// INTERFACES
// =============================================================================

/**
 * Evidence level for gene-drug associations
 * Based on CPIC classification
 */
export type EvidenceLevel = 'A' | 'B' | 'C' | 'D';

/**
 * Metabolizer phenotype
 */
export type MetabolizerPhenotype =
  | 'Ultrarapid Metabolizer'
  | 'Rapid Metabolizer'
  | 'Normal Metabolizer'
  | 'Intermediate Metabolizer'
  | 'Poor Metabolizer'
  | 'Indeterminate';

/**
 * Phenotype definition with clinical implications
 */
export interface PhenotypeDefinition {
  /** Phenotype name */
  name: MetabolizerPhenotype;
  /** Phenotype abbreviation */
  abbreviation: 'UM' | 'RM' | 'NM' | 'IM' | 'PM' | 'IND';
  /** Description of metabolizer status */
  description: string;
  /** Clinical implication of this phenotype */
  clinicalImplication: string;
  /** Activity score range (if applicable) */
  activityScoreRange?: { min: number; max?: number };
}

/**
 * Drug affected by a pharmacogene
 */
export interface AffectedDrug {
  /** Drug name (generic) */
  drugName: string;
  /** Drug class */
  drugClass: string;
  /** Clinical recommendation */
  recommendation: string;
  /** Evidence level */
  evidenceLevel: EvidenceLevel;
  /** Interaction type */
  interactionType: 'Dosing' | 'Efficacy' | 'Toxicity/ADR' | 'Metabolism';
  /** Source guideline */
  source: 'CPIC' | 'DPWG' | 'FDA' | 'Other';
  /** PMID reference */
  pmid?: string;
  /** Additional clinical notes */
  clinicalNotes?: string;
}

/**
 * Star allele definition
 */
export interface StarAllele {
  /** Allele name (e.g., "*1", "*2", "*4") */
  name: string;
  /** rsID if applicable */
  rsid?: string;
  /** Allele function */
  function: 'Normal Function' | 'Decreased Function' | 'No Function' | 'Increased Function' | 'Uncertain';
  /** Activity score */
  activityScore?: number;
  /** Population frequency (if known) */
  frequency?: {
    caucasian?: number;
    african?: number;
    asian?: number;
    hispanic?: number;
  };
  /** Clinical significance */
  clinicalSignificance?: string;
}

/**
 * PharmGKB gene with full pharmacogenomics data
 */
export interface PharmGKBGene {
  /** Gene symbol (e.g., "CYP2D6") */
  gene: string;
  /** Full gene name */
  fullName: string;
  /** PharmGKB accession ID */
  pharmgkbId: string;
  /** HGNC ID */
  hgncId: string;
  /** Chromosome location */
  chromosome: string;
  /** Gene description/function */
  description: string;
  /** Main reference SNP ID */
  rsid?: string;
  /** Metabolizer phenotypes */
  phenotypes: PhenotypeDefinition[];
  /** Drugs affected by this gene */
  affectedDrugs: AffectedDrug[];
  /** Star alleles (if applicable) */
  starAlleles?: StarAllele[];
  /** Has CPIC guideline */
  hasCpicGuideline: boolean;
  /** Clinical testing recommendation */
  testingRecommendation?: string;
  /** Brazilian SUS relevance notes */
  susRelevance?: string;
}

// =============================================================================
// PHARMGKB GENE DATABASE
// =============================================================================

export const PHARMGKB_GENES: PharmGKBGene[] = [
  // ===========================================================================
  // CYP2D6 - Major drug metabolizing enzyme
  // ===========================================================================
  {
    gene: 'CYP2D6',
    fullName: 'Cytochrome P450 Family 2 Subfamily D Member 6',
    pharmgkbId: 'PA128',
    hgncId: 'HGNC:2625',
    chromosome: '22q13.2',
    description:
      'CYP2D6 metabolizes approximately 25% of clinically used drugs including many opioids (codeine, tramadol), antidepressants (TCAs, SSRIs), antipsychotics, and tamoxifen. Highly polymorphic with over 100 allelic variants.',
    hasCpicGuideline: true,
    testingRecommendation:
      'Consider testing before prescribing codeine, tramadol, tamoxifen, and tricyclic antidepressants.',
    susRelevance:
      'Codeine and tramadol are commonly used analgesics in APS. CYP2D6 testing can prevent toxicity in ultrarapid metabolizers and lack of efficacy in poor metabolizers.',
    phenotypes: [
      {
        name: 'Ultrarapid Metabolizer',
        abbreviation: 'UM',
        description: 'More than 2 copies of functional alleles',
        clinicalImplication:
          'Rapid conversion of prodrugs (codeine, tramadol) to active metabolites; risk of toxicity. May need alternative drugs.',
        activityScoreRange: { min: 2.25 },
      },
      {
        name: 'Normal Metabolizer',
        abbreviation: 'NM',
        description: 'Two functional alleles',
        clinicalImplication:
          'Normal drug metabolism. Standard dosing recommendations apply.',
        activityScoreRange: { min: 1.25, max: 2.25 },
      },
      {
        name: 'Intermediate Metabolizer',
        abbreviation: 'IM',
        description: 'One functional and one reduced/non-functional allele',
        clinicalImplication:
          'Reduced enzyme activity. May have reduced efficacy with prodrugs; consider dose adjustments.',
        activityScoreRange: { min: 0.25, max: 1.25 },
      },
      {
        name: 'Poor Metabolizer',
        abbreviation: 'PM',
        description: 'Two non-functional alleles',
        clinicalImplication:
          'No CYP2D6 function. Prodrugs (codeine, tramadol) will not be effective. Use alternative analgesics.',
        activityScoreRange: { min: 0, max: 0.25 },
      },
    ],
    affectedDrugs: [
      {
        drugName: 'Codeine',
        drugClass: 'Opioid analgesic',
        recommendation:
          'UM: Avoid codeine - use non-tramadol/non-codeine analgesic. PM: Avoid codeine - use alternative due to lack of efficacy.',
        evidenceLevel: 'A',
        interactionType: 'Metabolism',
        source: 'CPIC',
        pmid: '24458010',
        clinicalNotes:
          'Codeine is a prodrug converted to morphine by CYP2D6. UMs have rapid conversion leading to toxicity; PMs have no conversion leading to no analgesia.',
      },
      {
        drugName: 'Tramadol',
        drugClass: 'Opioid analgesic',
        recommendation:
          'UM: Avoid tramadol - use non-tramadol/non-codeine analgesic. PM: Avoid tramadol - use alternative.',
        evidenceLevel: 'A',
        interactionType: 'Metabolism',
        source: 'CPIC',
        pmid: '31844072',
        clinicalNotes:
          'Similar to codeine, tramadol requires CYP2D6 for activation to O-desmethyltramadol.',
      },
      {
        drugName: 'Ondansetron',
        drugClass: 'Antiemetic (5-HT3 antagonist)',
        recommendation:
          'UM: Select alternative antiemetic not metabolized by CYP2D6 (granisetron). PM: No initial dose adjustment needed.',
        evidenceLevel: 'A',
        interactionType: 'Efficacy',
        source: 'CPIC',
        pmid: '28002639',
      },
      {
        drugName: 'Tamoxifen',
        drugClass: 'Selective estrogen receptor modulator',
        recommendation:
          'PM/IM: Consider alternative hormonal therapy (aromatase inhibitor) or increased dose with monitoring.',
        evidenceLevel: 'A',
        interactionType: 'Efficacy',
        source: 'CPIC',
        pmid: '29385237',
        clinicalNotes:
          'Tamoxifen is converted to the active metabolite endoxifen by CYP2D6. PMs have reduced efficacy.',
      },
      {
        drugName: 'Amitriptyline',
        drugClass: 'Tricyclic antidepressant',
        recommendation:
          'UM: Avoid use; if required, consider 50% dose reduction. PM: Avoid use or reduce dose by 50% and monitor.',
        evidenceLevel: 'A',
        interactionType: 'Dosing',
        source: 'CPIC',
        pmid: '27997040',
      },
      {
        drugName: 'Nortriptyline',
        drugClass: 'Tricyclic antidepressant',
        recommendation:
          'PM: Avoid use or reduce dose by 50%. UM: Consider alternative or increase dose.',
        evidenceLevel: 'A',
        interactionType: 'Dosing',
        source: 'CPIC',
        pmid: '27997040',
      },
    ],
    starAlleles: [
      {
        name: '*1',
        function: 'Normal Function',
        activityScore: 1,
        clinicalSignificance: 'Reference/wild-type allele',
      },
      {
        name: '*2',
        rsid: 'rs16947',
        function: 'Normal Function',
        activityScore: 1,
      },
      {
        name: '*3',
        rsid: 'rs35742686',
        function: 'No Function',
        activityScore: 0,
        clinicalSignificance: 'Frameshift deletion',
        frequency: { caucasian: 0.02, african: 0.001, asian: 0.001 },
      },
      {
        name: '*4',
        rsid: 'rs3892097',
        function: 'No Function',
        activityScore: 0,
        clinicalSignificance: 'Splicing defect - most common non-functional allele in Caucasians',
        frequency: { caucasian: 0.20, african: 0.06, asian: 0.01 },
      },
      {
        name: '*5',
        function: 'No Function',
        activityScore: 0,
        clinicalSignificance: 'Gene deletion',
        frequency: { caucasian: 0.03, african: 0.06, asian: 0.06 },
      },
      {
        name: '*6',
        rsid: 'rs5030655',
        function: 'No Function',
        activityScore: 0,
        clinicalSignificance: 'Frameshift',
        frequency: { caucasian: 0.01 },
      },
      {
        name: '*9',
        rsid: 'rs5030656',
        function: 'Decreased Function',
        activityScore: 0.5,
        frequency: { caucasian: 0.02 },
      },
      {
        name: '*10',
        rsid: 'rs1065852',
        function: 'Decreased Function',
        activityScore: 0.25,
        clinicalSignificance: 'Unstable enzyme - most common decreased function allele in Asians',
        frequency: { caucasian: 0.02, african: 0.06, asian: 0.50 },
      },
      {
        name: '*17',
        rsid: 'rs28371706',
        function: 'Decreased Function',
        activityScore: 0.5,
        clinicalSignificance: 'Common in African populations',
        frequency: { african: 0.20 },
      },
      {
        name: '*41',
        rsid: 'rs28371725',
        function: 'Decreased Function',
        activityScore: 0.5,
        frequency: { caucasian: 0.09, african: 0.02, asian: 0.02 },
      },
    ],
  },

  // ===========================================================================
  // CYP2C19 - PPIs, clopidogrel, antidepressants
  // ===========================================================================
  {
    gene: 'CYP2C19',
    fullName: 'Cytochrome P450 Family 2 Subfamily C Member 19',
    pharmgkbId: 'PA124',
    hgncId: 'HGNC:2621',
    chromosome: '10q23.33',
    description:
      'CYP2C19 metabolizes proton pump inhibitors, clopidogrel (activation), SSRIs, and antifungals. Important for cardiovascular patients on dual antiplatelet therapy.',
    hasCpicGuideline: true,
    testingRecommendation:
      'Consider testing before prescribing clopidogrel for ACS/PCI patients. Also relevant for SSRI dosing.',
    susRelevance:
      'Clopidogrel is on RENAME and widely used for secondary prevention. CYP2C19 testing can guide antiplatelet selection.',
    phenotypes: [
      {
        name: 'Ultrarapid Metabolizer',
        abbreviation: 'UM',
        description: 'One or two *17 alleles (increased function)',
        clinicalImplication:
          'Increased metabolism of PPIs (may need higher doses); increased clopidogrel activation.',
        activityScoreRange: { min: 2.0 },
      },
      {
        name: 'Rapid Metabolizer',
        abbreviation: 'RM',
        description: 'One *17 allele plus one normal allele',
        clinicalImplication:
          'Slightly increased metabolism. Generally no dose adjustment needed.',
        activityScoreRange: { min: 1.5, max: 2.0 },
      },
      {
        name: 'Normal Metabolizer',
        abbreviation: 'NM',
        description: 'Two *1 (normal) alleles',
        clinicalImplication: 'Normal drug metabolism.',
        activityScoreRange: { min: 1.0, max: 1.5 },
      },
      {
        name: 'Intermediate Metabolizer',
        abbreviation: 'IM',
        description: 'One normal and one non-functional allele',
        clinicalImplication:
          'Reduced clopidogrel activation; consider alternative antiplatelet (prasugrel, ticagrelor).',
        activityScoreRange: { min: 0.5, max: 1.0 },
      },
      {
        name: 'Poor Metabolizer',
        abbreviation: 'PM',
        description: 'Two non-functional alleles (*2/*2, *2/*3, *3/*3)',
        clinicalImplication:
          'Clopidogrel contraindicated - use prasugrel or ticagrelor. PPIs may have prolonged effect.',
        activityScoreRange: { min: 0, max: 0.5 },
      },
    ],
    affectedDrugs: [
      {
        drugName: 'Clopidogrel',
        drugClass: 'Antiplatelet (P2Y12 inhibitor)',
        recommendation:
          'IM/PM: Use alternative antiplatelet therapy (prasugrel or ticagrelor if not contraindicated).',
        evidenceLevel: 'A',
        interactionType: 'Efficacy',
        source: 'CPIC',
        pmid: '23698643',
        clinicalNotes:
          'Clopidogrel is a prodrug requiring CYP2C19 for activation. PMs have significantly reduced platelet inhibition and increased cardiovascular events.',
      },
      {
        drugName: 'Omeprazole',
        drugClass: 'Proton pump inhibitor',
        recommendation:
          'UM: Consider dose increase for H. pylori eradication. PM: Standard dose likely adequate.',
        evidenceLevel: 'A',
        interactionType: 'Dosing',
        source: 'CPIC',
        clinicalNotes:
          'PPIs are inactivated by CYP2C19. UMs may have reduced efficacy; PMs may have prolonged effect.',
      },
      {
        drugName: 'Pantoprazole',
        drugClass: 'Proton pump inhibitor',
        recommendation: 'Similar to omeprazole; adjust based on phenotype for H. pylori therapy.',
        evidenceLevel: 'A',
        interactionType: 'Dosing',
        source: 'CPIC',
      },
      {
        drugName: 'Escitalopram',
        drugClass: 'SSRI antidepressant',
        recommendation:
          'PM: Consider 50% dose reduction. UM: Consider alternative SSRI or titrate to max dose if needed.',
        evidenceLevel: 'A',
        interactionType: 'Dosing',
        source: 'CPIC',
        pmid: '25974703',
      },
      {
        drugName: 'Citalopram',
        drugClass: 'SSRI antidepressant',
        recommendation: 'PM: Consider 50% dose reduction (max 20 mg/day). Monitor for adverse effects.',
        evidenceLevel: 'A',
        interactionType: 'Dosing',
        source: 'CPIC',
        pmid: '25974703',
      },
      {
        drugName: 'Sertraline',
        drugClass: 'SSRI antidepressant',
        recommendation: 'PM: Consider 50% dose reduction. UM: Standard dosing; titrate as needed.',
        evidenceLevel: 'A',
        interactionType: 'Dosing',
        source: 'CPIC',
        pmid: '25974703',
      },
      {
        drugName: 'Voriconazole',
        drugClass: 'Antifungal',
        recommendation: 'PM: Dose reduction may be needed. UM: May need increased dose.',
        evidenceLevel: 'A',
        interactionType: 'Dosing',
        source: 'CPIC',
      },
    ],
    starAlleles: [
      {
        name: '*1',
        function: 'Normal Function',
        activityScore: 1,
        clinicalSignificance: 'Reference/wild-type allele',
      },
      {
        name: '*2',
        rsid: 'rs4244285',
        function: 'No Function',
        activityScore: 0,
        clinicalSignificance: 'Splicing defect - most common loss-of-function allele',
        frequency: { caucasian: 0.15, african: 0.15, asian: 0.30 },
      },
      {
        name: '*3',
        rsid: 'rs4986893',
        function: 'No Function',
        activityScore: 0,
        clinicalSignificance: 'Premature stop codon - common in Asians',
        frequency: { caucasian: 0.004, asian: 0.05 },
      },
      {
        name: '*17',
        rsid: 'rs12248560',
        function: 'Increased Function',
        activityScore: 1.5,
        clinicalSignificance: 'Increased transcription',
        frequency: { caucasian: 0.21, african: 0.16, asian: 0.03 },
      },
    ],
  },

  // ===========================================================================
  // CYP2C9 - Warfarin, phenytoin, NSAIDs
  // ===========================================================================
  {
    gene: 'CYP2C9',
    fullName: 'Cytochrome P450 Family 2 Subfamily C Member 9',
    pharmgkbId: 'PA126',
    hgncId: 'HGNC:2623',
    chromosome: '10q23.33',
    description:
      'CYP2C9 metabolizes approximately 15% of drugs including warfarin (S-enantiomer), phenytoin, and NSAIDs. Variants associated with increased bleeding risk on warfarin.',
    hasCpicGuideline: true,
    testingRecommendation:
      'Consider testing before initiating warfarin therapy, especially in patients with high bleeding risk.',
    susRelevance:
      'Warfarin is widely used for anticoagulation in SUS. CYP2C9 + VKORC1 testing can help predict optimal dosing.',
    phenotypes: [
      {
        name: 'Normal Metabolizer',
        abbreviation: 'NM',
        description: 'Two *1 (normal) alleles',
        clinicalImplication: 'Standard warfarin dosing; normal phenytoin metabolism.',
        activityScoreRange: { min: 2.0 },
      },
      {
        name: 'Intermediate Metabolizer',
        abbreviation: 'IM',
        description: 'One *1 and one decreased function allele (*2, *3)',
        clinicalImplication: 'Reduced warfarin clearance; consider 25-50% dose reduction.',
        activityScoreRange: { min: 1.0, max: 2.0 },
      },
      {
        name: 'Poor Metabolizer',
        abbreviation: 'PM',
        description: 'Two decreased function alleles (*2/*2, *2/*3, *3/*3)',
        clinicalImplication:
          'Significantly reduced warfarin clearance; 50-70% dose reduction typically needed. High bleeding risk.',
        activityScoreRange: { min: 0, max: 1.0 },
      },
    ],
    affectedDrugs: [
      {
        drugName: 'Warfarin',
        drugClass: 'Vitamin K antagonist anticoagulant',
        recommendation:
          'IM: Consider 25-50% lower initial dose. PM: Consider 50-70% lower initial dose. Use validated dosing algorithms.',
        evidenceLevel: 'A',
        interactionType: 'Dosing',
        source: 'CPIC',
        pmid: '28198005',
        clinicalNotes:
          'CYP2C9 genotype combined with VKORC1 genotype can predict warfarin dose requirements. PMs at high risk of bleeding with standard doses.',
      },
      {
        drugName: 'Phenytoin',
        drugClass: 'Anticonvulsant',
        recommendation:
          'IM: Consider 25% reduction in maintenance dose. PM: Consider 50% reduction; monitor levels closely.',
        evidenceLevel: 'A',
        interactionType: 'Dosing',
        source: 'CPIC',
        pmid: '25099164',
        clinicalNotes:
          'Reduced clearance in IMs/PMs leads to higher drug exposure and toxicity risk.',
      },
      {
        drugName: 'Celecoxib',
        drugClass: 'COX-2 selective NSAID',
        recommendation: 'PM: Consider 50% dose reduction or use alternative NSAID.',
        evidenceLevel: 'B',
        interactionType: 'Dosing',
        source: 'CPIC',
      },
      {
        drugName: 'Losartan',
        drugClass: 'Angiotensin II receptor blocker',
        recommendation:
          'PM: May have reduced efficacy (losartan is a prodrug); consider alternative ARB.',
        evidenceLevel: 'C',
        interactionType: 'Efficacy',
        source: 'Other',
        clinicalNotes:
          'Losartan requires CYP2C9 for conversion to active metabolite. PMs may have reduced efficacy.',
      },
    ],
    starAlleles: [
      {
        name: '*1',
        function: 'Normal Function',
        activityScore: 1,
        clinicalSignificance: 'Reference/wild-type allele',
      },
      {
        name: '*2',
        rsid: 'rs1799853',
        function: 'Decreased Function',
        activityScore: 0.5,
        clinicalSignificance: 'Arg144Cys - ~30% reduced enzyme activity',
        frequency: { caucasian: 0.13, african: 0.03, asian: 0.01 },
      },
      {
        name: '*3',
        rsid: 'rs1057910',
        function: 'Decreased Function',
        activityScore: 0.5,
        clinicalSignificance: 'Ile359Leu - ~80% reduced enzyme activity',
        frequency: { caucasian: 0.07, african: 0.01, asian: 0.04 },
      },
      {
        name: '*5',
        function: 'Decreased Function',
        activityScore: 0.5,
        clinicalSignificance: 'Asp360Glu',
        frequency: { african: 0.02 },
      },
      {
        name: '*6',
        function: 'No Function',
        activityScore: 0,
        clinicalSignificance: 'Frameshift deletion',
      },
      {
        name: '*8',
        rsid: 'rs7900194',
        function: 'Decreased Function',
        activityScore: 0.5,
        clinicalSignificance: 'Common in African populations',
        frequency: { african: 0.06 },
      },
      {
        name: '*11',
        rsid: 'rs28371685',
        function: 'Decreased Function',
        activityScore: 0.5,
      },
    ],
  },

  // ===========================================================================
  // TPMT - Thiopurines (azathioprine, 6-MP, thioguanine)
  // ===========================================================================
  {
    gene: 'TPMT',
    fullName: 'Thiopurine S-Methyltransferase',
    pharmgkbId: 'PA356',
    hgncId: 'HGNC:12014',
    chromosome: '6p22.3',
    description:
      'TPMT catalyzes the S-methylation of thiopurine drugs. Deficiency leads to accumulation of active thioguanine nucleotides causing severe myelosuppression.',
    hasCpicGuideline: true,
    testingRecommendation:
      'Test BEFORE initiating thiopurine therapy (azathioprine, 6-mercaptopurine, thioguanine).',
    susRelevance:
      'Azathioprine is used for autoimmune diseases (lupus, IBD) and post-transplant. Testing can prevent life-threatening myelosuppression.',
    phenotypes: [
      {
        name: 'Normal Metabolizer',
        abbreviation: 'NM',
        description: 'Two functional alleles (*1/*1)',
        clinicalImplication: 'Normal TPMT activity. Start with standard dosing.',
      },
      {
        name: 'Intermediate Metabolizer',
        abbreviation: 'IM',
        description: 'One functional and one non-functional allele',
        clinicalImplication:
          'Moderate risk of myelosuppression. Start with 30-70% of full dose.',
      },
      {
        name: 'Poor Metabolizer',
        abbreviation: 'PM',
        description: 'Two non-functional alleles (*2/*2, *3A/*3A, etc.)',
        clinicalImplication:
          'Very high risk of severe, life-threatening myelosuppression. Consider alternative agent or use drastically reduced dose (10% of normal) with careful monitoring.',
      },
    ],
    affectedDrugs: [
      {
        drugName: 'Azathioprine',
        drugClass: 'Immunosuppressant',
        recommendation:
          'IM: Start at 30-70% of full dose. PM: Avoid or reduce to 10% of normal dose with frequent monitoring.',
        evidenceLevel: 'A',
        interactionType: 'Toxicity/ADR',
        source: 'CPIC',
        pmid: '23422873',
        clinicalNotes:
          'TPMT deficiency leads to accumulation of thioguanine nucleotides and severe myelosuppression (pancytopenia, neutropenia).',
      },
      {
        drugName: '6-Mercaptopurine',
        drugClass: 'Antimetabolite',
        recommendation:
          'IM: Start at 30-70% of full dose. PM: Avoid or reduce to 10% of normal dose.',
        evidenceLevel: 'A',
        interactionType: 'Toxicity/ADR',
        source: 'CPIC',
        pmid: '23422873',
      },
      {
        drugName: 'Thioguanine',
        drugClass: 'Antimetabolite',
        recommendation:
          'IM: Start at 30-70% of full dose. PM: Avoid or reduce to 10% of normal dose.',
        evidenceLevel: 'A',
        interactionType: 'Toxicity/ADR',
        source: 'CPIC',
        pmid: '23422873',
      },
    ],
    starAlleles: [
      {
        name: '*1',
        function: 'Normal Function',
        clinicalSignificance: 'Reference/wild-type allele',
      },
      {
        name: '*2',
        rsid: 'rs1800462',
        function: 'No Function',
        clinicalSignificance: 'Ala80Pro',
        frequency: { caucasian: 0.002 },
      },
      {
        name: '*3A',
        function: 'No Function',
        clinicalSignificance: 'Contains both rs1800460 and rs1142345 - most common variant',
        frequency: { caucasian: 0.05, african: 0.02 },
      },
      {
        name: '*3B',
        rsid: 'rs1800460',
        function: 'No Function',
        clinicalSignificance: 'Ala154Thr',
      },
      {
        name: '*3C',
        rsid: 'rs1142345',
        function: 'No Function',
        clinicalSignificance: 'Tyr240Cys',
        frequency: { asian: 0.02 },
      },
      {
        name: '*4',
        function: 'No Function',
        clinicalSignificance: 'Rare null allele',
      },
    ],
  },

  // ===========================================================================
  // DPYD - Fluoropyrimidines (5-FU, capecitabine)
  // ===========================================================================
  {
    gene: 'DPYD',
    fullName: 'Dihydropyrimidine Dehydrogenase',
    pharmgkbId: 'PA145',
    hgncId: 'HGNC:3012',
    chromosome: '1p21.3',
    description:
      'DPYD encodes the rate-limiting enzyme in pyrimidine catabolism and is critical for fluoropyrimidine (5-FU, capecitabine) metabolism. Deficiency causes severe, potentially fatal toxicity.',
    hasCpicGuideline: true,
    testingRecommendation:
      'MANDATORY testing recommended before initiating fluoropyrimidine therapy due to risk of fatal toxicity.',
    susRelevance:
      '5-FU and capecitabine are used in cancer treatment. DPYD testing is critical safety measure before chemotherapy.',
    phenotypes: [
      {
        name: 'Normal Metabolizer',
        abbreviation: 'NM',
        description: 'Activity score 2.0 (two normal function alleles)',
        clinicalImplication: 'Normal DPD activity. Use standard fluoropyrimidine dosing.',
        activityScoreRange: { min: 1.5 },
      },
      {
        name: 'Intermediate Metabolizer',
        abbreviation: 'IM',
        description: 'Activity score 1.0-1.5',
        clinicalImplication:
          'Decreased DPD activity. High risk of severe toxicity. Reduce dose by 50%.',
        activityScoreRange: { min: 1.0, max: 1.5 },
      },
      {
        name: 'Poor Metabolizer',
        abbreviation: 'PM',
        description: 'Activity score 0-0.5',
        clinicalImplication:
          'Minimal or no DPD activity. CONTRAINDICATED - use alternative chemotherapy regimen.',
        activityScoreRange: { min: 0, max: 0.5 },
      },
    ],
    affectedDrugs: [
      {
        drugName: 'Fluorouracil (5-FU)',
        drugClass: 'Antimetabolite chemotherapy',
        recommendation:
          'IM (AS 1.0-1.5): Reduce dose by 50%. PM (AS 0-0.5): AVOID - use alternative agent.',
        evidenceLevel: 'A',
        interactionType: 'Toxicity/ADR',
        source: 'CPIC',
        pmid: '29152729',
        clinicalNotes:
          'DPD deficiency can cause severe, potentially fatal toxicity including mucositis, diarrhea, neutropenia, and neurotoxicity.',
      },
      {
        drugName: 'Capecitabine',
        drugClass: 'Oral fluoropyrimidine prodrug',
        recommendation:
          'IM: Reduce dose by 50%. PM: AVOID - use alternative chemotherapy.',
        evidenceLevel: 'A',
        interactionType: 'Toxicity/ADR',
        source: 'CPIC',
        pmid: '29152729',
        clinicalNotes: 'Capecitabine is converted to 5-FU. Same precautions apply.',
      },
      {
        drugName: 'Tegafur',
        drugClass: 'Fluoropyrimidine prodrug',
        recommendation: 'Same recommendations as 5-FU based on DPYD genotype.',
        evidenceLevel: 'A',
        interactionType: 'Toxicity/ADR',
        source: 'CPIC',
      },
    ],
    starAlleles: [
      {
        name: '*1',
        function: 'Normal Function',
        activityScore: 1,
        clinicalSignificance: 'Reference/wild-type allele',
      },
      {
        name: '*2A (c.1905+1G>A)',
        rsid: 'rs3918290',
        function: 'No Function',
        activityScore: 0,
        clinicalSignificance: 'IVS14+1G>A splice site variant - most common no-function variant',
        frequency: { caucasian: 0.01 },
      },
      {
        name: '*13 (c.1679T>G)',
        rsid: 'rs55886062',
        function: 'No Function',
        activityScore: 0,
        clinicalSignificance: 'I560S - no function',
        frequency: { caucasian: 0.001 },
      },
      {
        name: 'c.2846A>T',
        rsid: 'rs67376798',
        function: 'Decreased Function',
        activityScore: 0.5,
        clinicalSignificance: 'D949V - decreased function',
        frequency: { caucasian: 0.01 },
      },
      {
        name: 'c.1129-5923C>G (HapB3)',
        rsid: 'rs75017182',
        function: 'Decreased Function',
        activityScore: 0.5,
        clinicalSignificance: 'Deep intronic variant causing partial exon skipping',
        frequency: { caucasian: 0.04 },
      },
    ],
  },

  // ===========================================================================
  // VKORC1 - Warfarin sensitivity
  // ===========================================================================
  {
    gene: 'VKORC1',
    fullName: 'Vitamin K Epoxide Reductase Complex Subunit 1',
    pharmgkbId: 'PA37182',
    hgncId: 'HGNC:23663',
    chromosome: '16p11.2',
    rsid: 'rs9923231',
    description:
      'VKORC1 is the pharmacological target of warfarin. Genetic variants affect warfarin sensitivity; some individuals require substantially lower doses.',
    hasCpicGuideline: true,
    testingRecommendation:
      'Consider testing along with CYP2C9 before initiating warfarin therapy.',
    susRelevance:
      'Combined CYP2C9 + VKORC1 genotyping can predict warfarin dose requirements, reducing bleeding and thrombosis risk.',
    phenotypes: [
      {
        name: 'Normal Metabolizer',
        abbreviation: 'NM',
        description: 'GG genotype (rs9923231)',
        clinicalImplication: 'Normal warfarin sensitivity. Standard dosing range.',
      },
      {
        name: 'Intermediate Metabolizer',
        abbreviation: 'IM',
        description: 'AG genotype (rs9923231)',
        clinicalImplication: 'Increased warfarin sensitivity. May require 25-50% lower dose.',
      },
      {
        name: 'Poor Metabolizer',
        abbreviation: 'PM',
        description: 'AA genotype (rs9923231)',
        clinicalImplication:
          'High warfarin sensitivity. Often requires 50% or lower dose. Increased bleeding risk.',
      },
    ],
    affectedDrugs: [
      {
        drugName: 'Warfarin',
        drugClass: 'Vitamin K antagonist anticoagulant',
        recommendation:
          'Use VKORC1 genotype with CYP2C9 in validated dosing algorithms. AA genotype typically needs 50% lower dose.',
        evidenceLevel: 'A',
        interactionType: 'Dosing',
        source: 'CPIC',
        pmid: '28198005',
        clinicalNotes:
          'VKORC1 -1639G>A (rs9923231) A allele associated with warfarin sensitivity. Dosing algorithms available at warfarindosing.org.',
      },
    ],
    starAlleles: [
      {
        name: '-1639G (wild-type)',
        rsid: 'rs9923231',
        function: 'Normal Function',
        clinicalSignificance: 'Normal VKORC1 expression and warfarin sensitivity',
        frequency: { caucasian: 0.37, african: 0.89, asian: 0.07 },
      },
      {
        name: '-1639A (variant)',
        rsid: 'rs9923231',
        function: 'Decreased Function',
        clinicalSignificance: 'Reduced VKORC1 expression; increased warfarin sensitivity',
        frequency: { caucasian: 0.63, african: 0.11, asian: 0.93 },
      },
    ],
  },

  // ===========================================================================
  // HLA-B*57:01 - Abacavir hypersensitivity
  // ===========================================================================
  {
    gene: 'HLA-B*57:01',
    fullName: 'Major Histocompatibility Complex, Class I, B (Allele 57:01)',
    pharmgkbId: 'PA267',
    hgncId: 'HGNC:4932',
    chromosome: '6p21.33',
    description:
      'HLA-B*57:01 is strongly associated with abacavir hypersensitivity syndrome (HSR), a potentially fatal immune-mediated reaction. Testing is mandatory before abacavir use.',
    hasCpicGuideline: true,
    testingRecommendation:
      'MANDATORY testing before initiating abacavir therapy. Do not prescribe abacavir if positive.',
    susRelevance:
      'Abacavir is part of first-line HIV treatment in Brazil. HLA-B*57:01 testing is cost-effective and prevents potentially fatal HSR.',
    phenotypes: [
      {
        name: 'Normal Metabolizer',
        abbreviation: 'NM',
        description: 'HLA-B*57:01 negative',
        clinicalImplication: 'Low risk of abacavir HSR. May use abacavir with standard monitoring.',
      },
      {
        name: 'Poor Metabolizer',
        abbreviation: 'PM',
        description: 'HLA-B*57:01 positive (one or two copies)',
        clinicalImplication:
          'HIGH risk of abacavir HSR. CONTRAINDICATED - do not prescribe abacavir under any circumstances.',
      },
    ],
    affectedDrugs: [
      {
        drugName: 'Abacavir',
        drugClass: 'Nucleoside reverse transcriptase inhibitor (NRTI)',
        recommendation:
          'HLA-B*57:01 positive: CONTRAINDICATED. Do not use abacavir. Use alternative NRTI.',
        evidenceLevel: 'A',
        interactionType: 'Toxicity/ADR',
        source: 'CPIC',
        pmid: '22378157',
        clinicalNotes:
          'Abacavir HSR presents with fever, rash, GI symptoms, and can be fatal. Rechallenge after HSR can cause death. Testing has 100% negative predictive value.',
      },
    ],
  },

  // ===========================================================================
  // HLA-B*15:02 - Carbamazepine/phenytoin SJS/TEN
  // ===========================================================================
  {
    gene: 'HLA-B*15:02',
    fullName: 'Major Histocompatibility Complex, Class I, B (Allele 15:02)',
    pharmgkbId: 'PA267',
    hgncId: 'HGNC:4932',
    chromosome: '6p21.33',
    description:
      'HLA-B*15:02 is strongly associated with carbamazepine-induced Stevens-Johnson syndrome (SJS) and toxic epidermal necrolysis (TEN), particularly in Asian populations.',
    hasCpicGuideline: true,
    testingRecommendation:
      'Test patients of Asian ancestry before initiating carbamazepine or phenytoin therapy.',
    susRelevance:
      'Carbamazepine is widely used for epilepsy and bipolar disorder. Testing is especially important in patients of Asian descent.',
    phenotypes: [
      {
        name: 'Normal Metabolizer',
        abbreviation: 'NM',
        description: 'HLA-B*15:02 negative',
        clinicalImplication:
          'Low risk of carbamazepine/phenytoin-induced SJS/TEN. May use with standard monitoring.',
      },
      {
        name: 'Poor Metabolizer',
        abbreviation: 'PM',
        description: 'HLA-B*15:02 positive',
        clinicalImplication:
          'HIGH risk of SJS/TEN with carbamazepine and phenytoin. CONTRAINDICATED - use alternative anticonvulsant.',
      },
    ],
    affectedDrugs: [
      {
        drugName: 'Carbamazepine',
        drugClass: 'Anticonvulsant',
        recommendation:
          'HLA-B*15:02 positive: CONTRAINDICATED. Use alternative anticonvulsant (levetiracetam, valproate, lamotrigine).',
        evidenceLevel: 'A',
        interactionType: 'Toxicity/ADR',
        source: 'CPIC',
        pmid: '23695185',
        clinicalNotes:
          'SJS/TEN are severe, potentially fatal cutaneous adverse reactions. Risk highest in first 3 months of therapy. HLA-B*15:02 prevalent in Southeast Asian populations.',
      },
      {
        drugName: 'Oxcarbazepine',
        drugClass: 'Anticonvulsant',
        recommendation:
          'HLA-B*15:02 positive: Avoid if possible; use with caution if alternative not available.',
        evidenceLevel: 'B',
        interactionType: 'Toxicity/ADR',
        source: 'CPIC',
        clinicalNotes: 'Cross-reactivity possible; lower risk than carbamazepine.',
      },
      {
        drugName: 'Phenytoin',
        drugClass: 'Anticonvulsant',
        recommendation:
          'HLA-B*15:02 positive: Avoid use. Consider alternative anticonvulsant.',
        evidenceLevel: 'A',
        interactionType: 'Toxicity/ADR',
        source: 'CPIC',
        pmid: '25099164',
      },
    ],
  },
];

// =============================================================================
// LOOKUP FUNCTIONS
// =============================================================================

/**
 * Find a gene by symbol
 */
export function getGeneBySymbol(symbol: string): PharmGKBGene | undefined {
  return PHARMGKB_GENES.find(
    (gene) => gene.gene.toUpperCase() === symbol.toUpperCase()
  );
}

/**
 * Get all drugs affected by a gene
 */
export function getDrugsByGene(geneSymbol: string): AffectedDrug[] {
  const gene = getGeneBySymbol(geneSymbol);
  return gene ? gene.affectedDrugs : [];
}

/**
 * Search for genes affecting a specific drug
 */
export function getGenesAffectingDrug(drugName: string): PharmGKBGene[] {
  const normalizedName = drugName.toLowerCase();
  return PHARMGKB_GENES.filter((gene) =>
    gene.affectedDrugs.some((drug) =>
      drug.drugName.toLowerCase().includes(normalizedName)
    )
  );
}

/**
 * Get all genes with CPIC guidelines
 */
export function getGenesWithCpicGuidelines(): PharmGKBGene[] {
  return PHARMGKB_GENES.filter((gene) => gene.hasCpicGuideline);
}

/**
 * Get drug recommendation for a specific gene-drug pair
 */
export function getDrugRecommendation(
  geneSymbol: string,
  drugName: string
): AffectedDrug | undefined {
  const gene = getGeneBySymbol(geneSymbol);
  if (!gene) return undefined;

  return gene.affectedDrugs.find(
    (drug) => drug.drugName.toLowerCase() === drugName.toLowerCase()
  );
}

/**
 * Get phenotype by abbreviation for a gene
 */
export function getPhenotypeByAbbreviation(
  geneSymbol: string,
  abbreviation: string
): PhenotypeDefinition | undefined {
  const gene = getGeneBySymbol(geneSymbol);
  if (!gene) return undefined;

  return gene.phenotypes.find(
    (p) => p.abbreviation.toUpperCase() === abbreviation.toUpperCase()
  );
}

/**
 * Get star allele by name for a gene
 */
export function getStarAllele(
  geneSymbol: string,
  alleleName: string
): StarAllele | undefined {
  const gene = getGeneBySymbol(geneSymbol);
  if (!gene || !gene.starAlleles) return undefined;

  return gene.starAlleles.find(
    (allele) => allele.name.toLowerCase() === alleleName.toLowerCase()
  );
}

/**
 * Get high-evidence (Level A) gene-drug pairs
 */
export function getHighEvidencePairs(): Array<{
  gene: string;
  drug: AffectedDrug;
}> {
  const pairs: Array<{ gene: string; drug: AffectedDrug }> = [];

  for (const gene of PHARMGKB_GENES) {
    for (const drug of gene.affectedDrugs) {
      if (drug.evidenceLevel === 'A') {
        pairs.push({ gene: gene.gene, drug });
      }
    }
  }

  return pairs;
}

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Evidence level descriptions
 */
export const EVIDENCE_LEVEL_DESCRIPTIONS: Record<EvidenceLevel, string> = {
  A: 'High evidence: Strong recommendation with high-quality evidence',
  B: 'Moderate evidence: Moderate recommendation with moderate-quality evidence',
  C: 'Low evidence: Optional recommendation with low-quality evidence',
  D: 'Limited evidence: Insufficient evidence for any recommendation',
};

/**
 * Phenotype colors for UI
 */
export const PHENOTYPE_COLORS: Record<
  MetabolizerPhenotype,
  { bg: string; text: string; border: string }
> = {
  'Ultrarapid Metabolizer': {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-300',
  },
  'Rapid Metabolizer': {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    border: 'border-orange-300',
  },
  'Normal Metabolizer': {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300',
  },
  'Intermediate Metabolizer': {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-300',
  },
  'Poor Metabolizer': {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-300',
  },
  Indeterminate: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-300',
  },
};

export default {
  PHARMGKB_GENES,
  EVIDENCE_LEVEL_DESCRIPTIONS,
  PHENOTYPE_COLORS,
  getGeneBySymbol,
  getDrugsByGene,
  getGenesAffectingDrug,
  getGenesWithCpicGuidelines,
  getDrugRecommendation,
  getPhenotypeByAbbreviation,
  getStarAllele,
  getHighEvidencePairs,
};
