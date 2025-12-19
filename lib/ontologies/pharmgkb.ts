/**
 * PharmGKB (Pharmacogenomics Knowledge Base)
 * Integration for pharmacogenomics data
 */

export type Phenotype =
  | 'poor_metabolizer'
  | 'intermediate_metabolizer'
  | 'extensive_metabolizer'
  | 'ultra_rapid_metabolizer';

export interface PharmacogenomicsData {
  gene: string; // Gene name (e.g., "CYP2D6")
  variant?: string; // Specific variant/allele
  phenotype?: Phenotype; // Metabolic phenotype
  implications: string[]; // Clinical implications
  dosageRecommendations: string[]; // Dosage recommendations
  evidenceLevel?: 'high' | 'moderate' | 'low'; // Evidence level
  pharmgkbId?: string; // PharmGKB variant ID (e.g., "PA166153750")
}

/**
 * Major pharmacogenomics genes and their implications
 */
export const PHARMACOGENOMICS_GENES: Record<string, {
  name: string;
  description: string;
  commonVariants: Array<{
    variant: string;
    phenotype: Phenotype;
    frequency: string; // Population frequency
    implications: string[];
  }>;
}> = {
  CYP2D6: {
    name: 'CYP2D6',
    description: 'Cytochrome P450 2D6 - metabolizes ~25% of drugs',
    commonVariants: [
      {
        variant: '*1/*1, *1/*2, *2/*2',
        phenotype: 'extensive_metabolizer',
        frequency: '75-85%',
        implications: ['Normal drug metabolism', 'Standard dosing appropriate'],
      },
      {
        variant: '*4/*4, *4/*5, *5/*5',
        phenotype: 'poor_metabolizer',
        frequency: '5-10%',
        implications: [
          'Reduced drug metabolism',
          'Increased drug levels and toxicity risk',
          'Consider dose reduction or alternative drug',
        ],
      },
      {
        variant: '*1/*4, *2/*4',
        phenotype: 'intermediate_metabolizer',
        frequency: '10-15%',
        implications: [
          'Moderately reduced metabolism',
          'May need dose adjustment',
        ],
      },
      {
        variant: '*1/*1xN, *2/*2xN',
        phenotype: 'ultra_rapid_metabolizer',
        frequency: '1-5%',
        implications: [
          'Rapid drug metabolism',
          'Reduced drug efficacy',
          'May need increased dose or alternative drug',
        ],
      },
    ],
  },
  CYP2C19: {
    name: 'CYP2C19',
    description: 'Cytochrome P450 2C19 - metabolizes proton pump inhibitors, clopidogrel',
    commonVariants: [
      {
        variant: '*1/*1, *1/*17',
        phenotype: 'extensive_metabolizer',
        frequency: '70-80%',
        implications: ['Normal metabolism', 'Standard dosing'],
      },
      {
        variant: '*2/*2, *3/*3',
        phenotype: 'poor_metabolizer',
        frequency: '2-15%',
        implications: [
          'Reduced clopidogrel activation',
          'Consider prasugrel or ticagrelor instead',
          'PPI dose reduction may be needed',
        ],
      },
      {
        variant: '*17/*17',
        phenotype: 'ultra_rapid_metabolizer',
        frequency: '18-27%',
        implications: [
          'Increased clopidogrel activation',
          'Increased bleeding risk',
          'Monitor for bleeding',
        ],
      },
    ],
  },
  CYP2C9: {
    name: 'CYP2C9',
    description: 'Cytochrome P450 2C9 - metabolizes warfarin, phenytoin, NSAIDs',
    commonVariants: [
      {
        variant: '*1/*1',
        phenotype: 'extensive_metabolizer',
        frequency: '70-80%',
        implications: ['Normal warfarin metabolism', 'Standard dosing'],
      },
      {
        variant: '*2/*2, *3/*3, *2/*3',
        phenotype: 'poor_metabolizer',
        frequency: '1-3%',
        implications: [
          'Reduced warfarin metabolism',
          'Lower warfarin dose required',
          'Increased bleeding risk',
        ],
      },
    ],
  },
  TPMT: {
    name: 'TPMT',
    description: 'Thiopurine S-methyltransferase - metabolizes thiopurines (azathioprine, mercaptopurine)',
    commonVariants: [
      {
        variant: '*1/*1',
        phenotype: 'extensive_metabolizer',
        frequency: '86-97%',
        implications: ['Normal metabolism', 'Standard thiopurine dosing'],
      },
      {
        variant: '*1/*3A, *1/*3C',
        phenotype: 'intermediate_metabolizer',
        frequency: '3-11%',
        implications: [
          'Moderately reduced activity',
          'Reduce thiopurine dose by 30-50%',
          'Monitor for myelosuppression',
        ],
      },
      {
        variant: '*3A/*3A, *3C/*3C, *3A/*3C',
        phenotype: 'poor_metabolizer',
        frequency: '0.3-0.6%',
        implications: [
          'Severely reduced activity',
          'Use 10% of standard dose OR avoid thiopurines',
          'High risk of severe myelosuppression',
        ],
      },
    ],
  },
  DPYD: {
    name: 'DPYD',
    description: 'Dihydropyrimidine dehydrogenase - metabolizes 5-fluorouracil, capecitabine',
    commonVariants: [
      {
        variant: '*1/*1',
        phenotype: 'extensive_metabolizer',
        frequency: '93-97%',
        implications: ['Normal metabolism', 'Standard 5-FU/capecitabine dosing'],
      },
      {
        variant: '*2A/*1, *13/*1',
        phenotype: 'poor_metabolizer',
        frequency: '0.5-2%',
        implications: [
          'Severely reduced metabolism',
          'AVOID 5-FU/capecitabine OR reduce dose by 50%',
          'High risk of severe toxicity',
        ],
      },
      {
        variant: '*1/*2A',
        phenotype: 'intermediate_metabolizer',
        frequency: '3-5%',
        implications: [
          'Moderately reduced activity',
          'Reduce 5-FU/capecitabine dose by 50%',
          'Monitor closely for toxicity',
        ],
      },
    ],
  },
  UGT1A1: {
    name: 'UGT1A1',
    description: 'UDP-glucuronosyltransferase 1A1 - metabolizes irinotecan',
    commonVariants: [
      {
        variant: '*1/*1',
        phenotype: 'extensive_metabolizer',
        frequency: '50-70%',
        implications: ['Normal metabolism', 'Standard irinotecan dosing'],
      },
      {
        variant: '*28/*28',
        phenotype: 'poor_metabolizer',
        frequency: '10-15%',
        implications: [
          'Reduced glucuronidation',
          'Reduce irinotecan starting dose',
          'Increased risk of neutropenia and diarrhea',
        ],
      },
    ],
  },
  SLCO1B1: {
    name: 'SLCO1B1',
    description: 'Solute carrier organic anion transporter 1B1 - transports statins',
    commonVariants: [
      {
        variant: '*1/*1',
        phenotype: 'extensive_metabolizer',
        frequency: '50-60%',
        implications: ['Normal function', 'Standard statin dosing'],
      },
      {
        variant: '*1/*5, *1/*15',
        phenotype: 'intermediate_metabolizer',
        frequency: '30-40%',
        implications: [
          'Reduced transport',
          'Increased statin levels',
          'Consider lower dose or alternative statin',
          'Monitor for myopathy',
        ],
      },
      {
        variant: '*5/*5, *15/*15',
        phenotype: 'poor_metabolizer',
        frequency: '2-5%',
        implications: [
          'Severely reduced transport',
          'Significantly increased statin levels',
          'Use lower dose or avoid simvastatin/atorvastatin',
          'High risk of myopathy',
        ],
      },
    ],
  },
};

/**
 * Medication to gene mapping (which medications are affected by which genes)
 */
export const MEDICATION_GENE_MAP: Record<string, string[]> = {
  // Medications metabolized by CYP2D6
  'codeina': ['CYP2D6'],
  'tramadol': ['CYP2D6'],
  'metoprolol': ['CYP2D6'],
  'carvedilol': ['CYP2D6'],
  'amitriptilina': ['CYP2D6'],
  'nortriptilina': ['CYP2D6'],
  'paroxetina': ['CYP2D6'],
  'fluoxetina': ['CYP2D6'],
  'haloperidol': ['CYP2D6'],
  'risperidona': ['CYP2D6'],
  'ondansetrona': ['CYP2D6'],
  'tamoxifeno': ['CYP2D6'],

  // Medications metabolized by CYP2C19
  'omeprazol': ['CYP2C19'],
  'pantoprazol': ['CYP2C19'],
  'lansoprazol': ['CYP2C19'],
  'clopidogrel': ['CYP2C19'],
  'sertralina': ['CYP2C19'],
  'citalopram': ['CYP2C19'],
  'escitalopram': ['CYP2C19'],

  // Medications metabolized by CYP2C9
  'warfarina': ['CYP2C9'],
  'fenitoina': ['CYP2C9'],
  'fenobarbital': ['CYP2C9'],
  'diclofenaco': ['CYP2C9'],
  'ibuprofeno': ['CYP2C9'],
  'naproxeno': ['CYP2C9'],
  'losartana': ['CYP2C9'],
  'irbesartana': ['CYP2C9'],

  // Medications metabolized by TPMT
  'azatioprina': ['TPMT'],
  'mercaptopurina': ['TPMT'],

  // Medications metabolized by DPYD
  'fluorouracila': ['DPYD'],
  'capecitabina': ['DPYD'],

  // Medications metabolized by UGT1A1
  'irinotecano': ['UGT1A1'],

  // Medications affected by SLCO1B1
  'simvastatina': ['SLCO1B1'],
  'atorvastatina': ['SLCO1B1'],
  'rosuvastatina': ['SLCO1B1'],
  'pravastatina': ['SLCO1B1'],
};

/**
 * Get pharmacogenomics data for a medication
 */
export function getPharmacogenomicsForMedication(
  medicationName: string
): PharmacogenomicsData[] {
  const normalizedName = medicationName.toLowerCase().trim();
  const genes = MEDICATION_GENE_MAP[normalizedName] || [];
  
  const results: PharmacogenomicsData[] = [];
  
  for (const gene of genes) {
    const geneData = PHARMACOGENOMICS_GENES[gene];
    if (geneData) {
      // For each common variant, create a PharmacogenomicsData entry
      for (const variant of geneData.commonVariants) {
        results.push({
          gene: gene,
          variant: variant.variant,
          phenotype: variant.phenotype,
          implications: variant.implications,
          dosageRecommendations: getDosageRecommendations(
            medicationName,
            gene,
            variant.phenotype
          ),
        });
      }
    }
  }
  
  return results;
}

/**
 * Get dosage recommendations based on medication, gene, and phenotype
 */
function getDosageRecommendations(
  medication: string,
  gene: string,
  phenotype: Phenotype
): string[] {
  const recommendations: string[] = [];
  const medLower = medication.toLowerCase();

  if (gene === 'CYP2D6') {
    if (phenotype === 'poor_metabolizer') {
      if (medLower.includes('codeina') || medLower.includes('codeína')) {
        recommendations.push('Avoid codeine - poor conversion to morphine');
        recommendations.push('Use alternative: tramadol or other opioid');
      }
      if (medLower.includes('tramadol')) {
        recommendations.push('Reduce tramadol dose by 25-50%');
        recommendations.push('Monitor for reduced efficacy');
      }
    }
    if (phenotype === 'ultra_rapid_metabolizer') {
      if (medLower.includes('codeina') || medLower.includes('codeína')) {
        recommendations.push('Avoid codeine - risk of toxicity');
        recommendations.push('Use alternative opioid');
      }
    }
  }

  if (gene === 'CYP2C19') {
    if (phenotype === 'poor_metabolizer') {
      if (medLower.includes('clopidogrel')) {
        recommendations.push('Consider prasugrel or ticagrelor instead');
        recommendations.push('OR increase clopidogrel dose');
      }
    }
  }

  if (gene === 'CYP2C9') {
    if (phenotype === 'poor_metabolizer') {
      if (medLower.includes('warfarin')) {
        recommendations.push('Reduce warfarin starting dose by 30-50%');
        recommendations.push('More frequent INR monitoring required');
      }
    }
  }

  if (gene === 'TPMT') {
    if (phenotype === 'poor_metabolizer') {
      recommendations.push('Use 10% of standard dose OR avoid thiopurines');
      recommendations.push('Consider alternative immunosuppressant');
    }
    if (phenotype === 'intermediate_metabolizer') {
      recommendations.push('Reduce dose by 30-50%');
      recommendations.push('Monitor for myelosuppression');
    }
  }

  if (gene === 'SLCO1B1') {
    if (phenotype === 'poor_metabolizer') {
      recommendations.push('Use lower dose OR avoid simvastatin/atorvastatin');
      recommendations.push('Consider pravastatin or rosuvastatin');
      recommendations.push('Monitor for myopathy');
    }
    if (phenotype === 'intermediate_metabolizer') {
      recommendations.push('Consider lower dose');
      recommendations.push('Monitor for myopathy');
    }
  }

  return recommendations.length > 0
    ? recommendations
    : ['Standard dosing appropriate'];
}

/**
 * Get gene information by gene name
 */
export function getGeneInfo(gene: string) {
  return PHARMACOGENOMICS_GENES[gene];
}

