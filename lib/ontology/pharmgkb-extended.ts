/**
 * DARWIN-MFC PHARMGKB EXTENDED MODULE
 * ====================================
 *
 * Extended pharmacogenomics data with additional clinically relevant genes
 * and a genotype-based dosing recommendation system.
 *
 * Additional genes covered:
 * - SLCO1B1 (statins - myopathy risk)
 * - UGT1A1 (irinotecan, atazanavir)
 * - CYP3A4/CYP3A5 (tacrolimus, cyclosporine, many drugs)
 * - CYP1A2 (theophylline, caffeine, clozapine)
 * - NAT2 (isoniazid, hydralazine, sulfonamides)
 * - G6PD (antimalarials, sulfonamides, nitrofurantoin)
 * - NUDT15 (thiopurines - especially relevant in Asian populations)
 * - IFNL3/IL28B (peginterferon - hepatitis C)
 *
 * Reference: https://www.pharmgkb.org
 * CPIC Guidelines: https://cpicpgx.org
 */

import type { LanguageCode } from '@/lib/ontology/types/ontology';
import {
  type PharmGKBGene,
  type AffectedDrug,
  type PhenotypeDefinition,
  type StarAllele,
  type EvidenceLevel,
  type MetabolizerPhenotype,
  PHARMGKB_GENES,
  getGeneBySymbol,
} from './pharmgkb';

// =============================================================================
// ADDITIONAL INTERFACES
// =============================================================================

/**
 * Dosing recommendation based on genotype
 */
export interface DosingRecommendation {
  geneSymbol: string;
  drugName: string;
  phenotype: MetabolizerPhenotype;
  standardDose: string;
  adjustedDose: string;
  adjustmentPercent?: number;
  alternativeDrug?: string;
  monitoringRequired: string[];
  warningLevel: 'info' | 'caution' | 'warning' | 'contraindicated';
  clinicalPearl: Partial<Record<LanguageCode, string>>;
  references: string[];
}

/**
 * Activity score calculation result
 */
export interface ActivityScoreResult {
  gene: string;
  allele1: string;
  allele2: string;
  activityScore: number;
  phenotype: MetabolizerPhenotype;
  confidence: 'high' | 'moderate' | 'low';
}

/**
 * Drug-gene interaction summary
 */
export interface DrugGeneInteraction {
  drugName: string;
  drugClass: string;
  genes: Array<{
    gene: string;
    interactionType: string;
    clinicalSignificance: 'high' | 'moderate' | 'low';
    actionRequired: boolean;
  }>;
  overallRiskLevel: 'minimal' | 'low' | 'moderate' | 'high' | 'very_high';
}

// =============================================================================
// EXTENDED GENE DATABASE
// =============================================================================

export const EXTENDED_PHARMGKB_GENES: PharmGKBGene[] = [
  // ===========================================================================
  // SLCO1B1 - Statin myopathy risk
  // ===========================================================================
  {
    gene: 'SLCO1B1',
    fullName: 'Solute Carrier Organic Anion Transporter Family Member 1B1',
    pharmgkbId: 'PA134865839',
    hgncId: 'HGNC:10959',
    chromosome: '12p12.1',
    rsid: 'rs4149056',
    description:
      'SLCO1B1 encodes OATP1B1, a hepatic uptake transporter. The *5 variant (rs4149056 C allele) reduces statin hepatic uptake, increasing plasma concentrations and myopathy risk.',
    hasCpicGuideline: true,
    testingRecommendation:
      'Consider testing before initiating simvastatin, especially at high doses. Also relevant for rosuvastatin, atorvastatin, and pravastatin.',
    susRelevance:
      'Simvastatin is on RENAME and widely used. SLCO1B1 testing can guide statin selection and dosing to prevent myopathy.',
    phenotypes: [
      {
        name: 'Normal Metabolizer',
        abbreviation: 'NM',
        description: 'TT genotype (rs4149056) - normal OATP1B1 function',
        clinicalImplication: 'Normal statin hepatic uptake. Standard dosing.',
        activityScoreRange: { min: 2.0 },
      },
      {
        name: 'Intermediate Metabolizer',
        abbreviation: 'IM',
        description: 'TC genotype (rs4149056) - decreased function',
        clinicalImplication:
          'Reduced hepatic uptake. Consider lower simvastatin doses or alternative statin.',
        activityScoreRange: { min: 1.0, max: 2.0 },
      },
      {
        name: 'Poor Metabolizer',
        abbreviation: 'PM',
        description: 'CC genotype (rs4149056) - poor function',
        clinicalImplication:
          'Significantly reduced hepatic uptake. Avoid simvastatin >20mg. Consider pravastatin or rosuvastatin.',
        activityScoreRange: { min: 0, max: 1.0 },
      },
    ],
    affectedDrugs: [
      {
        drugName: 'Simvastatin',
        drugClass: 'HMG-CoA reductase inhibitor (statin)',
        recommendation:
          'TC: Prescribe ≤20mg or use alternative statin. CC: Avoid simvastatin or use ≤20mg with close monitoring. Consider pravastatin or rosuvastatin.',
        evidenceLevel: 'A',
        interactionType: 'Toxicity/ADR',
        source: 'CPIC',
        pmid: '24918167',
        clinicalNotes:
          'SLCO1B1*5 (rs4149056 C) increases simvastatin AUC 3-fold. Risk of myopathy ~17-fold higher in CC vs TT.',
      },
      {
        drugName: 'Atorvastatin',
        drugClass: 'HMG-CoA reductase inhibitor (statin)',
        recommendation:
          'CC: Consider lower starting dose or alternative statin. Less affected than simvastatin.',
        evidenceLevel: 'B',
        interactionType: 'Metabolism',
        source: 'CPIC',
        clinicalNotes:
          'SLCO1B1*5 increases atorvastatin AUC ~1.5-fold. Lower myopathy risk than simvastatin.',
      },
      {
        drugName: 'Rosuvastatin',
        drugClass: 'HMG-CoA reductase inhibitor (statin)',
        recommendation:
          'CC: Consider ≤20mg starting dose. Rosuvastatin is a reasonable alternative to simvastatin.',
        evidenceLevel: 'B',
        interactionType: 'Metabolism',
        source: 'CPIC',
        clinicalNotes:
          'SLCO1B1*5 increases rosuvastatin AUC ~2-fold but myopathy risk lower than simvastatin.',
      },
      {
        drugName: 'Pravastatin',
        drugClass: 'HMG-CoA reductase inhibitor (statin)',
        recommendation:
          'May be preferred in SLCO1B1 poor function carriers due to lower myopathy risk overall.',
        evidenceLevel: 'B',
        interactionType: 'Metabolism',
        source: 'CPIC',
        clinicalNotes:
          'Pravastatin is hydrophilic and has lower myopathy risk. Good alternative for SLCO1B1 variant carriers.',
      },
    ],
    starAlleles: [
      {
        name: '*1',
        function: 'Normal Function',
        activityScore: 1,
        clinicalSignificance: 'Reference/wild-type allele (T allele)',
      },
      {
        name: '*5',
        rsid: 'rs4149056',
        function: 'Decreased Function',
        activityScore: 0,
        clinicalSignificance: 'Val174Ala - major variant for statin myopathy',
        frequency: { caucasian: 0.15, african: 0.02, asian: 0.12 },
      },
      {
        name: '*15',
        function: 'Decreased Function',
        activityScore: 0,
        clinicalSignificance: 'Contains *5 variant plus additional SNPs',
      },
    ],
  },

  // ===========================================================================
  // UGT1A1 - Irinotecan, atazanavir
  // ===========================================================================
  {
    gene: 'UGT1A1',
    fullName: 'UDP Glucuronosyltransferase Family 1 Member A1',
    pharmgkbId: 'PA420',
    hgncId: 'HGNC:12530',
    chromosome: '2q37.1',
    description:
      'UGT1A1 is the primary enzyme for bilirubin glucuronidation and metabolism of irinotecan active metabolite SN-38. *28 allele (TA7) causes reduced enzyme activity.',
    hasCpicGuideline: true,
    testingRecommendation:
      'Test before irinotecan therapy. Also relevant for atazanavir (hyperbilirubinemia).',
    susRelevance:
      'Irinotecan is used in colorectal and other cancers. UGT1A1 testing can prevent severe neutropenia and diarrhea.',
    phenotypes: [
      {
        name: 'Normal Metabolizer',
        abbreviation: 'NM',
        description: '*1/*1 (TA6/TA6)',
        clinicalImplication: 'Normal UGT1A1 activity. Standard irinotecan dosing.',
      },
      {
        name: 'Intermediate Metabolizer',
        abbreviation: 'IM',
        description: '*1/*28 (TA6/TA7)',
        clinicalImplication:
          'Reduced UGT1A1 activity. Standard dose acceptable but monitor closely.',
      },
      {
        name: 'Poor Metabolizer',
        abbreviation: 'PM',
        description: '*28/*28 (TA7/TA7) - Gilbert syndrome',
        clinicalImplication:
          'Significantly reduced activity. Reduce irinotecan dose by 30% or more. High toxicity risk.',
      },
    ],
    affectedDrugs: [
      {
        drugName: 'Irinotecan',
        drugClass: 'Topoisomerase I inhibitor (chemotherapy)',
        recommendation:
          '*28/*28: Reduce starting dose by at least 30%. Monitor closely for neutropenia and diarrhea.',
        evidenceLevel: 'A',
        interactionType: 'Toxicity/ADR',
        source: 'CPIC',
        pmid: '31792466',
        clinicalNotes:
          'SN-38 (active metabolite) is inactivated by UGT1A1. *28/*28 carriers have 3-4x higher SN-38 exposure.',
      },
      {
        drugName: 'Atazanavir',
        drugClass: 'HIV protease inhibitor',
        recommendation:
          '*28/*28: Expect hyperbilirubinemia. Usually benign but cosmetically concerning. No dose change needed.',
        evidenceLevel: 'A',
        interactionType: 'Toxicity/ADR',
        source: 'CPIC',
        clinicalNotes:
          'Atazanavir inhibits UGT1A1. *28/*28 carriers have >80% risk of hyperbilirubinemia. Reassure patient.',
      },
    ],
    starAlleles: [
      {
        name: '*1',
        function: 'Normal Function',
        clinicalSignificance: 'TA6 repeat (6 TA repeats in promoter)',
        frequency: { caucasian: 0.65, african: 0.54, asian: 0.85 },
      },
      {
        name: '*28',
        function: 'Decreased Function',
        clinicalSignificance: 'TA7 repeat (7 TA repeats) - Gilbert syndrome allele',
        frequency: { caucasian: 0.35, african: 0.46, asian: 0.15 },
      },
      {
        name: '*6',
        rsid: 'rs4148323',
        function: 'Decreased Function',
        clinicalSignificance: 'Gly71Arg - common in Asian populations',
        frequency: { asian: 0.15 },
      },
      {
        name: '*37',
        function: 'Decreased Function',
        clinicalSignificance: 'TA8 repeat (rare)',
      },
    ],
  },

  // ===========================================================================
  // CYP3A5 - Tacrolimus dosing
  // ===========================================================================
  {
    gene: 'CYP3A5',
    fullName: 'Cytochrome P450 Family 3 Subfamily A Member 5',
    pharmgkbId: 'PA131',
    hgncId: 'HGNC:2638',
    chromosome: '7q22.1',
    rsid: 'rs776746',
    description:
      'CYP3A5 metabolizes tacrolimus and other immunosuppressants. Most Caucasians are non-expressers (*3/*3) while most Africans express CYP3A5.',
    hasCpicGuideline: true,
    testingRecommendation:
      'Consider testing before transplant to guide tacrolimus starting dose.',
    susRelevance:
      'Tacrolimus is critical for transplant patients in SUS. CYP3A5 genotype can guide initial dosing to achieve therapeutic levels faster.',
    phenotypes: [
      {
        name: 'Normal Metabolizer',
        abbreviation: 'NM',
        description: 'CYP3A5 expresser (*1/*1)',
        clinicalImplication:
          'High CYP3A5 activity. May need 1.5-2x higher tacrolimus dose to achieve target levels.',
        activityScoreRange: { min: 2.0 },
      },
      {
        name: 'Intermediate Metabolizer',
        abbreviation: 'IM',
        description: 'CYP3A5 heterozygous expresser (*1/*3)',
        clinicalImplication:
          'Intermediate activity. May need 25-50% higher tacrolimus dose.',
        activityScoreRange: { min: 1.0, max: 2.0 },
      },
      {
        name: 'Poor Metabolizer',
        abbreviation: 'PM',
        description: 'CYP3A5 non-expresser (*3/*3)',
        clinicalImplication:
          'No CYP3A5 expression. Standard tacrolimus dosing usually adequate.',
        activityScoreRange: { min: 0, max: 1.0 },
      },
    ],
    affectedDrugs: [
      {
        drugName: 'Tacrolimus',
        drugClass: 'Calcineurin inhibitor immunosuppressant',
        recommendation:
          '*1/*1: Increase starting dose 1.5-2x standard. *1/*3: Increase by 25-50%. *3/*3: Standard dosing.',
        evidenceLevel: 'A',
        interactionType: 'Dosing',
        source: 'CPIC',
        pmid: '25801146',
        clinicalNotes:
          'CYP3A5 expressers require higher doses to achieve therapeutic levels. Monitoring trough levels is essential.',
      },
    ],
    starAlleles: [
      {
        name: '*1',
        function: 'Normal Function',
        activityScore: 1,
        clinicalSignificance: 'Functional/expresser allele',
        frequency: { caucasian: 0.07, african: 0.70, asian: 0.30 },
      },
      {
        name: '*3',
        rsid: 'rs776746',
        function: 'No Function',
        activityScore: 0,
        clinicalSignificance: 'Splice defect - non-expresser (most common)',
        frequency: { caucasian: 0.93, african: 0.30, asian: 0.70 },
      },
      {
        name: '*6',
        rsid: 'rs10264272',
        function: 'No Function',
        activityScore: 0,
        clinicalSignificance: 'Splice defect - non-expresser',
        frequency: { african: 0.15 },
      },
      {
        name: '*7',
        function: 'No Function',
        activityScore: 0,
        clinicalSignificance: 'Frameshift - non-expresser',
      },
    ],
  },

  // ===========================================================================
  // CYP1A2 - Theophylline, clozapine, caffeine
  // ===========================================================================
  {
    gene: 'CYP1A2',
    fullName: 'Cytochrome P450 Family 1 Subfamily A Member 2',
    pharmgkbId: 'PA122',
    hgncId: 'HGNC:2596',
    chromosome: '15q24.1',
    description:
      'CYP1A2 metabolizes caffeine, theophylline, and clozapine. Activity is highly variable due to genetic and environmental factors (smoking, dietary).',
    hasCpicGuideline: false,
    testingRecommendation:
      'Consider for clozapine dosing in non-smokers or when smoking status changes.',
    susRelevance:
      'Clozapine and theophylline are used in SUS. CYP1A2 activity affects drug levels significantly.',
    phenotypes: [
      {
        name: 'Ultrarapid Metabolizer',
        abbreviation: 'UM',
        description: '*1F/*1F (enhanced induction)',
        clinicalImplication:
          'Very high CYP1A2 activity, especially in smokers. May need higher clozapine doses.',
      },
      {
        name: 'Normal Metabolizer',
        abbreviation: 'NM',
        description: '*1/*1 or *1/*1F',
        clinicalImplication: 'Normal metabolism. Standard dosing with monitoring.',
      },
      {
        name: 'Poor Metabolizer',
        abbreviation: 'PM',
        description: '*1/*1C or homozygous decreased function',
        clinicalImplication:
          'Reduced metabolism. May need lower doses of theophylline and clozapine.',
      },
    ],
    affectedDrugs: [
      {
        drugName: 'Clozapine',
        drugClass: 'Atypical antipsychotic',
        recommendation:
          'Smokers may need 50-100% higher doses. Monitor levels closely when smoking status changes.',
        evidenceLevel: 'B',
        interactionType: 'Dosing',
        source: 'Other',
        clinicalNotes:
          'Smoking induces CYP1A2. Stopping smoking can cause toxic clozapine levels within days.',
      },
      {
        drugName: 'Theophylline',
        drugClass: 'Methylxanthine bronchodilator',
        recommendation:
          'Poor metabolizers may need 50% lower doses. Monitor serum levels.',
        evidenceLevel: 'B',
        interactionType: 'Dosing',
        source: 'Other',
        clinicalNotes:
          'Theophylline has a narrow therapeutic index. CYP1A2 activity significantly affects levels.',
      },
      {
        drugName: 'Olanzapine',
        drugClass: 'Atypical antipsychotic',
        recommendation:
          'Similar to clozapine. Smokers may need higher doses.',
        evidenceLevel: 'C',
        interactionType: 'Dosing',
        source: 'Other',
      },
    ],
    starAlleles: [
      {
        name: '*1',
        function: 'Normal Function',
        clinicalSignificance: 'Reference allele',
      },
      {
        name: '*1C',
        rsid: 'rs2069514',
        function: 'Decreased Function',
        clinicalSignificance: 'Reduced promoter activity',
        frequency: { asian: 0.25 },
      },
      {
        name: '*1F',
        rsid: 'rs762551',
        function: 'Increased Function',
        clinicalSignificance: 'Enhanced inducibility by smoking',
        frequency: { caucasian: 0.45 },
      },
    ],
  },

  // ===========================================================================
  // NAT2 - Isoniazid, hydralazine
  // ===========================================================================
  {
    gene: 'NAT2',
    fullName: 'N-Acetyltransferase 2',
    pharmgkbId: 'PA18',
    hgncId: 'HGNC:7646',
    chromosome: '8p22',
    description:
      'NAT2 acetylates isoniazid, hydralazine, and sulfonamides. Slow acetylators have higher drug exposure and increased risk of drug-induced lupus and hepatotoxicity.',
    hasCpicGuideline: true,
    testingRecommendation:
      'Consider testing before isoniazid therapy, especially for latent TB treatment.',
    susRelevance:
      'Isoniazid is essential for TB treatment in SUS. NAT2 genotyping can guide dosing and prevent hepatotoxicity.',
    phenotypes: [
      {
        name: 'Rapid Metabolizer',
        abbreviation: 'RM',
        description: 'Two rapid acetylator alleles',
        clinicalImplication:
          'Rapid isoniazid clearance. Standard or higher doses may be needed.',
      },
      {
        name: 'Intermediate Metabolizer',
        abbreviation: 'IM',
        description: 'One rapid and one slow acetylator allele',
        clinicalImplication:
          'Intermediate acetylation. Standard dosing usually appropriate.',
      },
      {
        name: 'Poor Metabolizer',
        abbreviation: 'PM',
        description: 'Two slow acetylator alleles',
        clinicalImplication:
          'Slow acetylation. Higher isoniazid levels - increased efficacy but also hepatotoxicity risk.',
      },
    ],
    affectedDrugs: [
      {
        drugName: 'Isoniazid',
        drugClass: 'Antituberculosis agent',
        recommendation:
          'Slow acetylators: Consider dose reduction (3-4 mg/kg) and closer hepatic monitoring. Rapid acetylators: Standard dosing (5 mg/kg).',
        evidenceLevel: 'A',
        interactionType: 'Dosing',
        source: 'CPIC',
        pmid: '26708860',
        clinicalNotes:
          'Slow acetylators have 2-4x higher isoniazid AUC. Risk of peripheral neuropathy and hepatotoxicity increased.',
      },
      {
        drugName: 'Hydralazine',
        drugClass: 'Antihypertensive (vasodilator)',
        recommendation:
          'Slow acetylators at higher risk of drug-induced lupus. Monitor for lupus-like symptoms.',
        evidenceLevel: 'B',
        interactionType: 'Toxicity/ADR',
        source: 'Other',
        clinicalNotes:
          'Drug-induced lupus more common in slow acetylators, especially at doses >200mg/day.',
      },
      {
        drugName: 'Sulfasalazine',
        drugClass: 'Disease-modifying antirheumatic drug',
        recommendation:
          'Slow acetylators may have more GI side effects. Monitor and adjust as needed.',
        evidenceLevel: 'C',
        interactionType: 'Toxicity/ADR',
        source: 'Other',
      },
    ],
    starAlleles: [
      {
        name: '*4 (Rapid)',
        function: 'Normal Function',
        clinicalSignificance: 'Wild-type rapid acetylator',
        frequency: { caucasian: 0.25, african: 0.40, asian: 0.55 },
      },
      {
        name: '*5 (Slow)',
        rsid: 'rs1801280',
        function: 'Decreased Function',
        clinicalSignificance: 'Ile114Thr - most common slow allele in Caucasians',
        frequency: { caucasian: 0.45, african: 0.30, asian: 0.10 },
      },
      {
        name: '*6 (Slow)',
        rsid: 'rs1799930',
        function: 'Decreased Function',
        clinicalSignificance: 'Arg197Gln',
        frequency: { caucasian: 0.30, african: 0.25, asian: 0.30 },
      },
      {
        name: '*7 (Slow)',
        rsid: 'rs1799931',
        function: 'Decreased Function',
        clinicalSignificance: 'Gly286Glu - common in Asian populations',
        frequency: { asian: 0.15 },
      },
    ],
  },

  // ===========================================================================
  // G6PD - Antimalarials, sulfonamides
  // ===========================================================================
  {
    gene: 'G6PD',
    fullName: 'Glucose-6-Phosphate Dehydrogenase',
    pharmgkbId: 'PA28469',
    hgncId: 'HGNC:4057',
    chromosome: 'Xq28',
    description:
      'G6PD deficiency is the most common enzymopathy, affecting ~400 million people. X-linked. Deficiency causes oxidative hemolysis with certain drugs.',
    hasCpicGuideline: true,
    testingRecommendation:
      'Test before prescribing rasburicase, primaquine, dapsone. Consider in endemic areas before antimalarials.',
    susRelevance:
      'G6PD deficiency is common in Brazil, especially in African-descended populations. Critical for malaria treatment and sulfonamide use.',
    phenotypes: [
      {
        name: 'Normal Metabolizer',
        abbreviation: 'NM',
        description: 'Normal G6PD activity (Class IV)',
        clinicalImplication: 'Normal enzyme activity. Standard drug dosing.',
      },
      {
        name: 'Intermediate Metabolizer',
        abbreviation: 'IM',
        description: 'Moderate deficiency (Class III, 10-60% activity)',
        clinicalImplication:
          'Mild to moderate deficiency. Avoid high-risk drugs; use alternatives when possible.',
      },
      {
        name: 'Poor Metabolizer',
        abbreviation: 'PM',
        description: 'Severe deficiency (Class I-II, <10% activity)',
        clinicalImplication:
          'Severe deficiency. CONTRAINDICATED for many oxidative drugs. High hemolysis risk.',
      },
    ],
    affectedDrugs: [
      {
        drugName: 'Rasburicase',
        drugClass: 'Recombinant urate oxidase',
        recommendation:
          'G6PD deficient: CONTRAINDICATED. Hemolysis and methemoglobinemia risk. Use allopurinol instead.',
        evidenceLevel: 'A',
        interactionType: 'Toxicity/ADR',
        source: 'CPIC',
        pmid: '24787449',
        clinicalNotes:
          'Rasburicase produces hydrogen peroxide which causes severe hemolysis in G6PD deficiency.',
      },
      {
        drugName: 'Primaquine',
        drugClass: 'Antimalarial (8-aminoquinoline)',
        recommendation:
          'Severe deficiency: CONTRAINDICATED. Moderate deficiency: Consider reduced dose (0.5mg/kg) with monitoring.',
        evidenceLevel: 'A',
        interactionType: 'Toxicity/ADR',
        source: 'CPIC',
        pmid: '24787449',
        clinicalNotes:
          'Primaquine is the only drug for P. vivax liver stages. Weekly dosing may be safer in mild deficiency.',
      },
      {
        drugName: 'Dapsone',
        drugClass: 'Sulfone antibiotic',
        recommendation:
          'G6PD deficient: Avoid if possible. If essential, use lowest effective dose with monitoring.',
        evidenceLevel: 'A',
        interactionType: 'Toxicity/ADR',
        source: 'CPIC',
        clinicalNotes:
          'Dapsone causes dose-dependent hemolysis even in normal individuals. Risk amplified in G6PD deficiency.',
      },
      {
        drugName: 'Nitrofurantoin',
        drugClass: 'Urinary antiseptic',
        recommendation:
          'G6PD deficient: Consider alternative (trimethoprim, fosfomycin). If essential, monitor for hemolysis.',
        evidenceLevel: 'B',
        interactionType: 'Toxicity/ADR',
        source: 'Other',
      },
      {
        drugName: 'Sulfamethoxazole',
        drugClass: 'Sulfonamide antibiotic',
        recommendation:
          'G6PD deficient: Use with caution. Consider alternative antibiotics when possible.',
        evidenceLevel: 'B',
        interactionType: 'Toxicity/ADR',
        source: 'Other',
        clinicalNotes: 'Part of trimethoprim-sulfamethoxazole (Bactrim). Lower hemolysis risk than dapsone.',
      },
      {
        drugName: 'Methylene blue',
        drugClass: 'Antidote (methemoglobinemia)',
        recommendation:
          'G6PD deficient: CONTRAINDICATED as methemoglobinemia treatment. Use ascorbic acid or exchange transfusion.',
        evidenceLevel: 'A',
        interactionType: 'Toxicity/ADR',
        source: 'CPIC',
        clinicalNotes: 'Methylene blue requires G6PD for its antidote mechanism. Causes hemolysis in deficiency.',
      },
    ],
    starAlleles: [
      {
        name: 'B (Wild-type)',
        function: 'Normal Function',
        clinicalSignificance: 'Normal enzyme activity',
      },
      {
        name: 'A+ (African)',
        rsid: 'rs1050828',
        function: 'Normal Function',
        clinicalSignificance: 'Asn126Asp - normal activity polymorphism',
        frequency: { african: 0.20 },
      },
      {
        name: 'A- (African)',
        function: 'Decreased Function',
        clinicalSignificance: 'Asn126Asp + Val68Met - 10-20% activity (Class III)',
        frequency: { african: 0.15 },
      },
      {
        name: 'Mediterranean',
        rsid: 'rs5030868',
        function: 'No Function',
        clinicalSignificance: 'Ser188Phe - <10% activity (Class II)',
        frequency: { caucasian: 0.02 },
      },
      {
        name: 'Canton',
        function: 'Decreased Function',
        clinicalSignificance: 'Arg459Leu - common in Southeast Asia',
        frequency: { asian: 0.05 },
      },
    ],
  },

  // ===========================================================================
  // NUDT15 - Thiopurines (especially relevant in Asian populations)
  // ===========================================================================
  {
    gene: 'NUDT15',
    fullName: 'Nudix Hydrolase 15',
    pharmgkbId: 'PA38759',
    hgncId: 'HGNC:23063',
    chromosome: '13q14.11',
    rsid: 'rs116855232',
    description:
      'NUDT15 deficiency causes accumulation of thioguanine nucleotides, similar to TPMT. Especially common in Asian populations where TPMT variants are rare.',
    hasCpicGuideline: true,
    testingRecommendation:
      'Test along with TPMT before thiopurine therapy, especially in Asian patients.',
    susRelevance:
      'NUDT15 testing is critical for Asian and Hispanic patients starting azathioprine or 6-MP. More common than TPMT deficiency in these populations.',
    phenotypes: [
      {
        name: 'Normal Metabolizer',
        abbreviation: 'NM',
        description: '*1/*1 (wild-type)',
        clinicalImplication: 'Normal NUDT15 activity. Standard thiopurine dosing.',
      },
      {
        name: 'Intermediate Metabolizer',
        abbreviation: 'IM',
        description: '*1/*3 or *1/*2',
        clinicalImplication:
          'Reduced activity. Start with 30-80% of full dose depending on diplotype.',
      },
      {
        name: 'Poor Metabolizer',
        abbreviation: 'PM',
        description: '*3/*3, *2/*3, or other homozygous/compound heterozygous',
        clinicalImplication:
          'Very high myelosuppression risk. Consider alternative or drastically reduce dose (10%).',
      },
    ],
    affectedDrugs: [
      {
        drugName: 'Azathioprine',
        drugClass: 'Immunosuppressant',
        recommendation:
          'IM: Start at 30-80% dose. PM: Avoid or use 10% dose with close monitoring.',
        evidenceLevel: 'A',
        interactionType: 'Toxicity/ADR',
        source: 'CPIC',
        pmid: '30447069',
        clinicalNotes:
          'NUDT15 deficiency causes similar toxicity to TPMT but more common in Asians. Test both genes.',
      },
      {
        drugName: '6-Mercaptopurine',
        drugClass: 'Antimetabolite',
        recommendation: 'Same as azathioprine. Adjust based on NUDT15 diplotype.',
        evidenceLevel: 'A',
        interactionType: 'Toxicity/ADR',
        source: 'CPIC',
        pmid: '30447069',
      },
      {
        drugName: 'Thioguanine',
        drugClass: 'Antimetabolite',
        recommendation: 'Same as azathioprine. Use combined TPMT + NUDT15 guidance.',
        evidenceLevel: 'A',
        interactionType: 'Toxicity/ADR',
        source: 'CPIC',
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
        rsid: 'rs746071566',
        function: 'Decreased Function',
        clinicalSignificance: 'p.Arg139His',
        frequency: { asian: 0.002 },
      },
      {
        name: '*3',
        rsid: 'rs116855232',
        function: 'No Function',
        clinicalSignificance: 'p.Arg139Cys - most common risk allele',
        frequency: { caucasian: 0.002, asian: 0.10, hispanic: 0.05 },
      },
      {
        name: '*4',
        function: 'Decreased Function',
        clinicalSignificance: 'p.Val18Ile',
      },
      {
        name: '*5',
        function: 'Decreased Function',
        clinicalSignificance: 'p.Val18_Val19insGlyVal',
        frequency: { asian: 0.02 },
      },
    ],
  },

  // ===========================================================================
  // HLA-A*31:01 - Carbamazepine hypersensitivity (non-Asian)
  // ===========================================================================
  {
    gene: 'HLA-A*31:01',
    fullName: 'Major Histocompatibility Complex, Class I, A (Allele 31:01)',
    pharmgkbId: 'PA35056',
    hgncId: 'HGNC:4931',
    chromosome: '6p21.33',
    description:
      'HLA-A*31:01 is associated with carbamazepine-induced hypersensitivity reactions (SJS/TEN, DRESS, MPE) across multiple populations, unlike HLA-B*15:02 which is specific to Asians.',
    hasCpicGuideline: true,
    testingRecommendation:
      'Consider testing in non-Asian patients before initiating carbamazepine therapy.',
    susRelevance:
      'Complementary to HLA-B*15:02 testing. Important for non-Asian patients starting carbamazepine.',
    phenotypes: [
      {
        name: 'Normal Metabolizer',
        abbreviation: 'NM',
        description: 'HLA-A*31:01 negative',
        clinicalImplication: 'Reduced risk of carbamazepine hypersensitivity. May use with standard monitoring.',
      },
      {
        name: 'Poor Metabolizer',
        abbreviation: 'PM',
        description: 'HLA-A*31:01 positive',
        clinicalImplication:
          'Increased risk of carbamazepine-induced hypersensitivity (SJS/TEN, DRESS). Consider alternative anticonvulsant.',
      },
    ],
    affectedDrugs: [
      {
        drugName: 'Carbamazepine',
        drugClass: 'Anticonvulsant',
        recommendation:
          'HLA-A*31:01 positive: Weigh benefits/risks carefully. If used, counsel patient on early symptoms and monitor closely.',
        evidenceLevel: 'A',
        interactionType: 'Toxicity/ADR',
        source: 'CPIC',
        pmid: '28002678',
        clinicalNotes:
          'HLA-A*31:01 associated with all types of carbamazepine hypersensitivity (SJS/TEN, DRESS, MPE). Risk lower than HLA-B*15:02 but present.',
      },
    ],
  },
];

// =============================================================================
// COMBINED GENE DATABASE
// =============================================================================

/**
 * All PharmGKB genes (original + extended)
 */
export const ALL_PHARMGKB_GENES: PharmGKBGene[] = [
  ...PHARMGKB_GENES,
  ...EXTENDED_PHARMGKB_GENES,
];

// =============================================================================
// DOSING RECOMMENDATION SYSTEM
// =============================================================================

/**
 * Predefined dosing recommendations for common gene-drug pairs
 */
export const DOSING_RECOMMENDATIONS: DosingRecommendation[] = [
  // CYP2D6 - Codeine
  {
    geneSymbol: 'CYP2D6',
    drugName: 'Codeine',
    phenotype: 'Ultrarapid Metabolizer',
    standardDose: '15-60 mg every 4-6 hours',
    adjustedDose: 'AVOID - use morphine with careful titration or non-opioid',
    warningLevel: 'contraindicated',
    monitoringRequired: ['Respiratory depression', 'Sedation'],
    clinicalPearl: {
      en: 'Ultrarapid metabolizers convert codeine to morphine too quickly, risking fatal respiratory depression. Several pediatric deaths reported.',
      pt: 'Metabolizadores ultrarrápidos convertem codeína em morfina muito rapidamente, com risco de depressão respiratória fatal. Várias mortes pediátricas reportadas.',
    },
    references: ['PMID:24458010', 'FDA Black Box Warning'],
  },
  {
    geneSymbol: 'CYP2D6',
    drugName: 'Codeine',
    phenotype: 'Poor Metabolizer',
    standardDose: '15-60 mg every 4-6 hours',
    adjustedDose: 'AVOID - use morphine or non-codeine analgesic',
    warningLevel: 'warning',
    monitoringRequired: ['Pain control assessment'],
    clinicalPearl: {
      en: 'Poor metabolizers cannot convert codeine to morphine. No analgesic effect will be achieved.',
      pt: 'Metabolizadores pobres não conseguem converter codeína em morfina. Nenhum efeito analgésico será alcançado.',
    },
    references: ['PMID:24458010'],
  },

  // CYP2C19 - Clopidogrel
  {
    geneSymbol: 'CYP2C19',
    drugName: 'Clopidogrel',
    phenotype: 'Poor Metabolizer',
    standardDose: '75 mg daily',
    adjustedDose: 'Use prasugrel 10 mg or ticagrelor 90 mg twice daily',
    alternativeDrug: 'Prasugrel or Ticagrelor',
    warningLevel: 'contraindicated',
    monitoringRequired: ['Platelet function testing', 'Cardiovascular events'],
    clinicalPearl: {
      en: 'CYP2C19 poor metabolizers have ~30% higher risk of cardiovascular events on clopidogrel. Prasugrel or ticagrelor are not affected by CYP2C19.',
      pt: 'Metabolizadores pobres de CYP2C19 têm ~30% maior risco de eventos cardiovasculares com clopidogrel. Prasugrel ou ticagrelor não são afetados pelo CYP2C19.',
    },
    references: ['PMID:23698643', 'FDA Box Warning'],
  },

  // CYP2C9/VKORC1 - Warfarin
  {
    geneSymbol: 'CYP2C9',
    drugName: 'Warfarin',
    phenotype: 'Poor Metabolizer',
    standardDose: '5 mg daily (initiation)',
    adjustedDose: '1.5-2.5 mg daily (50-70% reduction)',
    adjustmentPercent: -60,
    warningLevel: 'warning',
    monitoringRequired: ['INR', 'Bleeding signs', 'Time in therapeutic range'],
    clinicalPearl: {
      en: 'CYP2C9 PMs have 2-3x higher warfarin exposure. Combined with VKORC1 genotype in dosing algorithms (warfarindosing.org).',
      pt: 'PMs de CYP2C9 têm 2-3x maior exposição à varfarina. Combinar com genótipo VKORC1 em algoritmos de dosagem.',
    },
    references: ['PMID:28198005'],
  },

  // SLCO1B1 - Simvastatin
  {
    geneSymbol: 'SLCO1B1',
    drugName: 'Simvastatin',
    phenotype: 'Poor Metabolizer',
    standardDose: '40-80 mg daily',
    adjustedDose: '≤20 mg daily or alternative statin (pravastatin, rosuvastatin)',
    alternativeDrug: 'Pravastatin or Rosuvastatin',
    warningLevel: 'warning',
    monitoringRequired: ['Muscle pain', 'CK levels', 'Rhabdomyolysis symptoms'],
    clinicalPearl: {
      en: 'SLCO1B1*5 CC homozygotes have 17-fold higher myopathy risk on simvastatin. Pravastatin is the safest alternative.',
      pt: 'Homozigotos CC para SLCO1B1*5 têm risco 17 vezes maior de miopatia com sinvastatina. Pravastatina é a alternativa mais segura.',
    },
    references: ['PMID:24918167'],
  },

  // TPMT - Azathioprine
  {
    geneSymbol: 'TPMT',
    drugName: 'Azathioprine',
    phenotype: 'Poor Metabolizer',
    standardDose: '2-3 mg/kg/day',
    adjustedDose: '0.2-0.3 mg/kg/day (10% of standard) with weekly CBC',
    adjustmentPercent: -90,
    warningLevel: 'contraindicated',
    monitoringRequired: ['CBC weekly for 8 weeks', 'WBC', 'Platelet count', 'Infection signs'],
    clinicalPearl: {
      en: 'TPMT PMs accumulate toxic thioguanine nucleotides. Life-threatening pancytopenia can occur. Also test NUDT15 in Asian patients.',
      pt: 'PMs de TPMT acumulam nucleotídeos de tioguanina tóxicos. Pancitopenia potencialmente fatal pode ocorrer. Testar também NUDT15 em asiáticos.',
    },
    references: ['PMID:23422873'],
  },

  // G6PD - Primaquine
  {
    geneSymbol: 'G6PD',
    drugName: 'Primaquine',
    phenotype: 'Poor Metabolizer',
    standardDose: '30 mg daily for 14 days',
    adjustedDose: 'CONTRAINDICATED - use alternative or 0.75 mg/kg weekly x8 weeks if essential',
    warningLevel: 'contraindicated',
    monitoringRequired: ['Hemoglobin', 'Reticulocytes', 'Dark urine', 'Jaundice'],
    clinicalPearl: {
      en: 'Severe G6PD deficiency causes acute hemolysis with primaquine. For P. vivax radical cure in mild deficiency, weekly dosing may be safer.',
      pt: 'Deficiência grave de G6PD causa hemólise aguda com primaquina. Para cura radical de P. vivax em deficiência leve, dose semanal pode ser mais segura.',
    },
    references: ['PMID:24787449', 'WHO Guidelines'],
  },

  // HLA-B*57:01 - Abacavir
  {
    geneSymbol: 'HLA-B*57:01',
    drugName: 'Abacavir',
    phenotype: 'Poor Metabolizer',
    standardDose: '600 mg daily (or 300 mg twice daily)',
    adjustedDose: 'CONTRAINDICATED - use alternative NRTI (tenofovir)',
    alternativeDrug: 'Tenofovir or Emtricitabine',
    warningLevel: 'contraindicated',
    monitoringRequired: [],
    clinicalPearl: {
      en: 'HLA-B*57:01 positive patients have 50% risk of abacavir hypersensitivity. Rechallenge after HSR can be fatal. Testing has 100% negative predictive value.',
      pt: 'Pacientes HLA-B*57:01 positivos têm 50% de risco de hipersensibilidade ao abacavir. Re-exposição após HSR pode ser fatal. Teste tem 100% de valor preditivo negativo.',
    },
    references: ['PMID:22378157', 'FDA Label'],
  },

  // DPYD - 5-FU
  {
    geneSymbol: 'DPYD',
    drugName: 'Fluorouracil (5-FU)',
    phenotype: 'Poor Metabolizer',
    standardDose: 'Per protocol',
    adjustedDose: 'CONTRAINDICATED - use alternative chemotherapy regimen',
    warningLevel: 'contraindicated',
    monitoringRequired: [],
    clinicalPearl: {
      en: 'DPD deficiency can cause fatal 5-FU toxicity. Testing is now recommended before all fluoropyrimidine therapy in many countries.',
      pt: 'Deficiência de DPD pode causar toxicidade fatal por 5-FU. Teste agora é recomendado antes de toda terapia com fluoropirimidinas em muitos países.',
    },
    references: ['PMID:29152729', 'EMA Recommendation'],
  },
  {
    geneSymbol: 'DPYD',
    drugName: 'Fluorouracil (5-FU)',
    phenotype: 'Intermediate Metabolizer',
    standardDose: 'Per protocol',
    adjustedDose: 'Reduce starting dose by 50%',
    adjustmentPercent: -50,
    warningLevel: 'warning',
    monitoringRequired: ['Mucositis', 'Diarrhea', 'Neutropenia', 'Hand-foot syndrome'],
    clinicalPearl: {
      en: 'Intermediate metabolizers tolerate 50% dose with monitoring. Dose escalation possible if tolerated well.',
      pt: 'Metabolizadores intermediários toleram 50% da dose com monitoramento. Escalonamento de dose possível se bem tolerado.',
    },
    references: ['PMID:29152729'],
  },
];

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get all genes from combined database
 */
export function getAllGenes(): PharmGKBGene[] {
  return ALL_PHARMGKB_GENES;
}

/**
 * Get gene by symbol from combined database
 */
export function getExtendedGeneBySymbol(symbol: string): PharmGKBGene | undefined {
  return ALL_PHARMGKB_GENES.find(
    (gene) => gene.gene.toUpperCase() === symbol.toUpperCase()
  );
}

/**
 * Get dosing recommendation for a gene-drug-phenotype combination
 */
export function getDosingRecommendation(
  geneSymbol: string,
  drugName: string,
  phenotype: MetabolizerPhenotype
): DosingRecommendation | undefined {
  return DOSING_RECOMMENDATIONS.find(
    (rec) =>
      rec.geneSymbol.toUpperCase() === geneSymbol.toUpperCase() &&
      rec.drugName.toLowerCase() === drugName.toLowerCase() &&
      rec.phenotype === phenotype
  );
}

/**
 * Get all dosing recommendations for a drug
 */
export function getDosingRecommendationsForDrug(drugName: string): DosingRecommendation[] {
  const normalizedName = drugName.toLowerCase();
  return DOSING_RECOMMENDATIONS.filter(
    (rec) => rec.drugName.toLowerCase().includes(normalizedName)
  );
}

/**
 * Get all dosing recommendations for a gene
 */
export function getDosingRecommendationsForGene(geneSymbol: string): DosingRecommendation[] {
  return DOSING_RECOMMENDATIONS.filter(
    (rec) => rec.geneSymbol.toUpperCase() === geneSymbol.toUpperCase()
  );
}

/**
 * Calculate activity score from diplotype
 */
export function calculateActivityScore(
  geneSymbol: string,
  allele1: string,
  allele2: string
): ActivityScoreResult | undefined {
  const gene = getExtendedGeneBySymbol(geneSymbol);
  if (!gene || !gene.starAlleles) return undefined;

  const starAllele1 = gene.starAlleles.find(
    (a) => a.name.toLowerCase() === allele1.toLowerCase()
  );
  const starAllele2 = gene.starAlleles.find(
    (a) => a.name.toLowerCase() === allele2.toLowerCase()
  );

  if (!starAllele1 || !starAllele2) return undefined;

  const score1 = starAllele1.activityScore ?? 1;
  const score2 = starAllele2.activityScore ?? 1;
  const totalScore = score1 + score2;

  // Determine phenotype based on score
  let phenotype: MetabolizerPhenotype = 'Indeterminate';
  let confidence: 'high' | 'moderate' | 'low' = 'moderate';

  for (const pheno of gene.phenotypes) {
    if (pheno.activityScoreRange) {
      const { min, max } = pheno.activityScoreRange;
      if (
        totalScore >= min &&
        (max === undefined || totalScore < max)
      ) {
        phenotype = pheno.name;
        confidence = 'high';
        break;
      }
    }
  }

  return {
    gene: geneSymbol,
    allele1,
    allele2,
    activityScore: totalScore,
    phenotype,
    confidence,
  };
}

/**
 * Get drug-gene interaction summary
 */
export function getDrugInteractionSummary(drugName: string): DrugGeneInteraction | undefined {
  const genes = ALL_PHARMGKB_GENES.filter((gene) =>
    gene.affectedDrugs.some((drug) =>
      drug.drugName.toLowerCase().includes(drugName.toLowerCase())
    )
  );

  if (genes.length === 0) return undefined;

  const geneInteractions = genes.map((gene) => {
    const drug = gene.affectedDrugs.find((d) =>
      d.drugName.toLowerCase().includes(drugName.toLowerCase())
    )!;

    return {
      gene: gene.gene,
      interactionType: drug.interactionType,
      clinicalSignificance:
        drug.evidenceLevel === 'A'
          ? 'high' as const
          : drug.evidenceLevel === 'B'
            ? 'moderate' as const
            : 'low' as const,
      actionRequired: drug.evidenceLevel === 'A',
    };
  });

  const highCount = geneInteractions.filter((g) => g.clinicalSignificance === 'high').length;
  const overallRisk =
    highCount >= 2
      ? 'very_high' as const
      : highCount === 1
        ? 'high' as const
        : geneInteractions.length > 1
          ? 'moderate' as const
          : 'low' as const;

  const firstDrug = genes[0].affectedDrugs.find((d) =>
    d.drugName.toLowerCase().includes(drugName.toLowerCase())
  )!;

  return {
    drugName: firstDrug.drugName,
    drugClass: firstDrug.drugClass,
    genes: geneInteractions,
    overallRiskLevel: overallRisk,
  };
}

/**
 * Search for genes by phenotype concern
 */
export function searchGenesByPhenotypeConcern(
  concern: 'toxicity' | 'efficacy' | 'dosing'
): PharmGKBGene[] {
  return ALL_PHARMGKB_GENES.filter((gene) =>
    gene.affectedDrugs.some((drug) => {
      if (concern === 'toxicity') {
        return drug.interactionType === 'Toxicity/ADR';
      } else if (concern === 'efficacy') {
        return drug.interactionType === 'Efficacy';
      } else {
        return drug.interactionType === 'Dosing';
      }
    })
  );
}

/**
 * Get genes relevant for a specific population
 */
export function getGenesRelevantForPopulation(
  population: 'caucasian' | 'african' | 'asian' | 'hispanic'
): Array<{ gene: PharmGKBGene; relevance: string }> {
  const relevant: Array<{ gene: PharmGKBGene; relevance: string }> = [];

  for (const gene of ALL_PHARMGKB_GENES) {
    if (!gene.starAlleles) continue;

    for (const allele of gene.starAlleles) {
      if (allele.frequency && allele.frequency[population]) {
        const freq = allele.frequency[population]!;
        if (freq > 0.05) {
          relevant.push({
            gene,
            relevance: `${allele.name}: ${(freq * 100).toFixed(1)}% frequency`,
          });
          break; // Only add gene once
        }
      }
    }
  }

  return relevant;
}

/**
 * Get all contraindicated drug-gene pairs
 */
export function getContraindicatedPairs(): DosingRecommendation[] {
  return DOSING_RECOMMENDATIONS.filter(
    (rec) => rec.warningLevel === 'contraindicated'
  );
}

/**
 * Get pharmacogenomic panel recommendation for a patient
 */
export function getRecommendedPanel(
  plannedDrugs: string[]
): { genes: string[]; priority: 'essential' | 'recommended' | 'optional' }[] {
  const geneMap = new Map<string, 'essential' | 'recommended' | 'optional'>();

  for (const drugName of plannedDrugs) {
    for (const gene of ALL_PHARMGKB_GENES) {
      for (const drug of gene.affectedDrugs) {
        if (drug.drugName.toLowerCase().includes(drugName.toLowerCase())) {
          const currentPriority = geneMap.get(gene.gene);
          const newPriority =
            drug.evidenceLevel === 'A'
              ? 'essential'
              : drug.evidenceLevel === 'B'
                ? 'recommended'
                : 'optional';

          if (
            !currentPriority ||
            (newPriority === 'essential' && currentPriority !== 'essential') ||
            (newPriority === 'recommended' && currentPriority === 'optional')
          ) {
            geneMap.set(gene.gene, newPriority);
          }
        }
      }
    }
  }

  const essentialGenes = Array.from(geneMap.entries())
    .filter(([, p]) => p === 'essential')
    .map(([g]) => g);
  const recommendedGenes = Array.from(geneMap.entries())
    .filter(([, p]) => p === 'recommended')
    .map(([g]) => g);
  const optionalGenes = Array.from(geneMap.entries())
    .filter(([, p]) => p === 'optional')
    .map(([g]) => g);

  const result = [];
  if (essentialGenes.length > 0) {
    result.push({ genes: essentialGenes, priority: 'essential' as const });
  }
  if (recommendedGenes.length > 0) {
    result.push({ genes: recommendedGenes, priority: 'recommended' as const });
  }
  if (optionalGenes.length > 0) {
    result.push({ genes: optionalGenes, priority: 'optional' as const });
  }

  return result;
}

// =============================================================================
// STATISTICS
// =============================================================================

/**
 * Get pharmacogenomics database statistics
 */
export function getPharmGKBStats(): {
  totalGenes: number;
  totalDrugs: number;
  totalInteractions: number;
  highEvidencePairs: number;
  genesWithCPIC: number;
  dosingRecommendations: number;
} {
  const allDrugs = new Set<string>();
  let totalInteractions = 0;
  let highEvidencePairs = 0;
  let genesWithCPIC = 0;

  for (const gene of ALL_PHARMGKB_GENES) {
    if (gene.hasCpicGuideline) genesWithCPIC++;

    for (const drug of gene.affectedDrugs) {
      allDrugs.add(drug.drugName.toLowerCase());
      totalInteractions++;
      if (drug.evidenceLevel === 'A') highEvidencePairs++;
    }
  }

  return {
    totalGenes: ALL_PHARMGKB_GENES.length,
    totalDrugs: allDrugs.size,
    totalInteractions,
    highEvidencePairs,
    genesWithCPIC,
    dosingRecommendations: DOSING_RECOMMENDATIONS.length,
  };
}

export default {
  ALL_PHARMGKB_GENES,
  EXTENDED_PHARMGKB_GENES,
  DOSING_RECOMMENDATIONS,
  getAllGenes,
  getExtendedGeneBySymbol,
  getDosingRecommendation,
  getDosingRecommendationsForDrug,
  getDosingRecommendationsForGene,
  calculateActivityScore,
  getDrugInteractionSummary,
  searchGenesByPhenotypeConcern,
  getGenesRelevantForPopulation,
  getContraindicatedPairs,
  getRecommendedPanel,
  getPharmGKBStats,
};
