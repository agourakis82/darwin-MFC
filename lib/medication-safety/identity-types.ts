export type MedicationIdentityStatus =
  | 'source-confirmed'
  | 'candidate'
  | 'review-required'
  | 'conflict';

export interface CanonicalIngredientV1 {
  id: string;
  preferredName: string;
  normalizedName: string;
  dcbCode: string | null;
  dcbClassification: string | null;
  dcbSourceId: string;
  status: MedicationIdentityStatus;
}

export interface CanonicalMedicationConceptV1 {
  id: string;
  preferredName: string;
  ingredientIds: string[];
  compositionKey: string;
  primaryLegacyId: string;
  legacyAliasIds: string[];
  productIds: string[];
  atcCodes: string[];
  therapeuticClasses: string[];
  rename: boolean;
  status: MedicationIdentityStatus;
}

export interface NormalizedMedicationStrengthV1 {
  numeratorValue: number;
  numeratorUnit: 'microgram' | 'milligram' | 'gram' | 'unit';
  denominatorValue: number | null;
  denominatorUnit: 'milliliter' | 'dose' | 'gram' | null;
}

export interface CanonicalMedicationProductV1 {
  id: string;
  conceptId: string;
  sourceLegacyId: string;
  sourcePresentationIndex: number;
  form: string;
  route: string | null;
  concentrationText: string;
  strength: NormalizedMedicationStrengthV1 | null;
  packageText: string | null;
  availableInSus: boolean;
  status: 'resolved' | 'incomplete' | 'review-required' | 'conflict';
}

export interface MedicationLegacyAliasV1 {
  id: string;
  displayName: string;
  normalizedName: string;
  conceptId: string;
  relation:
    | 'preferred'
    | 'exact-alias'
    | 'formulation-alias'
    | 'route-alias'
    | 'association-distinct'
    | 'unresolved';
  legacyAtcCode: string | null;
  commercialNames: string[];
}

export interface MedicationIdentityConflictV1 {
  id: string;
  type:
    | 'alias-collision'
    | 'dcb-ambiguous'
    | 'atc-inconsistent'
    | 'composition-ambiguous'
    | 'presentation-ambiguous'
    | 'interaction-severity-conflict';
  legacyIds: string[];
  message: string;
  resolution: 'review-required';
}

export interface MedicationDuplicateAtcGroupV1 {
  atcCode: string;
  legacyIds: string[];
  conceptIds: string[];
  classification:
    | 'exact-alias'
    | 'product-by-formulation'
    | 'product-by-route'
    | 'association-distinct'
    | 'conflict';
}

export interface MedicationInteractionEndpointV1 {
  kind: 'medication-concept' | 'exposure' | 'unresolved';
  id: string;
  label: string;
}

export interface CanonicalMedicationInteractionPairV1 {
  id: string;
  endpoints: [MedicationInteractionEndpointV1, MedicationInteractionEndpointV1];
  legacyRuleIds: string[];
  severities: string[];
  severityConflict: boolean;
  sourceStatus: 'located' | 'source-unverifiable';
  observations: Array<{
    severity: string;
    effect: string;
    management: string;
    source: string;
  }>;
  promotionStatus: 'not-promoted';
}

export interface MedicationIdentityBundleV1 {
  schemaVersion: 'darwin.medication-identity-bundle.v1';
  bundleVersion: string;
  generatedAt: string;
  sources: Array<{
    id: string;
    title: string;
    authority: string;
    url: string;
    localPath: string;
    mediaType: string;
    bytes: number;
    sha256: string;
    transport: 'official' | 'mirror-of-official';
    usage: 'identity' | 'formulary' | 'regulatory-query' | 'classification-metadata';
  }>;
  ingredients: CanonicalIngredientV1[];
  concepts: CanonicalMedicationConceptV1[];
  products: CanonicalMedicationProductV1[];
  aliases: MedicationLegacyAliasV1[];
  duplicateAtcGroups: MedicationDuplicateAtcGroupV1[];
  conflicts: MedicationIdentityConflictV1[];
  interactions: CanonicalMedicationInteractionPairV1[];
  audit: {
    legacyRecordCount: 717;
    uniqueAliasCount: 717;
    legacyPresentationCount: 1415;
    resolvedPresentationCount: number;
    incompletePresentationCount: number;
    reviewRequiredPresentationCount: number;
    conflictedPresentationCount: number;
    duplicateAtcGroupCount: 78;
    duplicateAtcLegacyRecordCount: 171;
    legacyInteractionCount: 176;
    uniqueInteractionPairCount: 152;
    duplicateInteractionGroupCount: 23;
    interactionSeverityConflictCount: 7;
    clinicalRulesPromoted: 0;
  };
}

export interface MedicationIdentityReceiptV1 {
  schemaVersion: 'darwin.medication-identity-receipt.v1';
  bundleVersion: string;
  generatedAt: string;
  hashes: {
    identityBundleSha256: string;
    compactSearchIndexSha256: string;
    sourceManifestSha256: string;
    reconciliationOverridesSha256: string;
    parserSourceSha256: string;
  };
  sourceHashes: Record<string, string>;
  gates: {
    exactLegacyAliases: boolean;
    allAliasesResolveExactlyOnce: boolean;
    presentationsFullyPartitioned: boolean;
    duplicateAtcGroupsAccounted: boolean;
    interactionsFullyReconciled: boolean;
    severityConflictsNotPromoted: boolean;
    supabaseClinicalOverridesForbidden: boolean;
    doseRulesEmpty: boolean;
    productionAuthorized: false;
  };
  signature: null;
}

export interface MedicationSearchIndexEntryV1 {
  conceptId: string;
  preferredName: string;
  primaryLegacyId: string;
  aliasIds: string[];
  aliases: string[];
  commercialNames: string[];
  atcCodes: string[];
  dcbCodes: string[];
  normalizedSearchText: string;
}

export interface MedicationEditorialOverlayV1 {
  schemaVersion: 'darwin.medication-editorial-overlay.v1';
  legacyId: string;
  commercialNames?: string[];
  editorialSummary?: string;
  editorialTags?: string[];
  reviewedAt?: string;
  source: 'supabase';
}
