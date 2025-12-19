/**
 * GRADE (Grading of Recommendations Assessment, Development and Evaluation)
 * System for grading quality of evidence and strength of recommendations
 */

/**
 * Quality of evidence rating
 */
export type EvidenceQuality = 'high' | 'moderate' | 'low' | 'very_low';

/**
 * Strength of recommendation
 */
export type RecommendationStrength = 'strong' | 'weak' | 'conditional';

/**
 * GRADE domains for quality assessment
 */
export interface GRADEDomains {
  riskOfBias: -2 | -1 | 0 | 1 | 2; // -2: very serious, -1: serious, 0: no limitations, +1: large effect, +2: very large effect
  inconsistency: -1 | 0 | 1; // -1: serious inconsistency, 0: no important inconsistency, +1: all plausible confounders
  indirectness: -1 | 0 | 1; // -1: serious indirectness, 0: no serious indirectness, +1: dose-response gradient
  imprecision: -1 | 0 | 1; // -1: serious imprecision, 0: no serious imprecision, +1: all plausible confounders
  publicationBias: -1 | 0 | 1; // -1: likely publication bias, 0: undetected, +1: large effect
}

/**
 * GRADE assessment result
 */
export interface GRADEResult {
  quality: EvidenceQuality;
  strength: RecommendationStrength;
  domains: GRADEDomains;
  rationale: string[];
  downgrades: string[]; // Reasons for downgrading
  upgrades: string[]; // Reasons for upgrading
}

/**
 * Initial quality based on study type
 */
export function getInitialQuality(studyType: string): EvidenceQuality {
  switch (studyType.toLowerCase()) {
    case 'rct':
    case 'metaanalysis':
    case 'systematicreview':
      return 'high'; // Start with high for RCTs and systematic reviews
    case 'cohort':
    case 'casecontrol':
      return 'moderate'; // Start with moderate for observational studies
    case 'caseseries':
    case 'casereport':
    case 'expertopinion':
    case 'observational':
    default:
      return 'low'; // Start with low for other types
  }
}

/**
 * Calculate GRADE quality from domains
 */
export function calculateGRADEQuality(
  initialQuality: EvidenceQuality,
  domains: GRADEDomains
): GRADEResult {
  const downgrades: string[] = [];
  const upgrades: string[] = [];
  const rationale: string[] = [];

  // Count downgrades (negative values)
  let downgradeCount = 0;
  if (domains.riskOfBias < 0) {
    downgradeCount += Math.abs(domains.riskOfBias);
    if (domains.riskOfBias === -2) {
      downgrades.push('Risco de viés muito sério');
    } else if (domains.riskOfBias === -1) {
      downgrades.push('Risco de viés sério');
    }
  }
  if (domains.inconsistency < 0) {
    downgradeCount++;
    downgrades.push('Inconsistência importante');
  }
  if (domains.indirectness < 0) {
    downgradeCount++;
    downgrades.push('Indireção séria');
  }
  if (domains.imprecision < 0) {
    downgradeCount++;
    downgrades.push('Imprecisão séria');
  }
  if (domains.publicationBias < 0) {
    downgradeCount++;
    downgrades.push('Viés de publicação provável');
  }

  // Count upgrades (positive values indicating large effects)
  let upgradeCount = 0;
  if (domains.riskOfBias > 0) {
    upgradeCount += domains.riskOfBias;
    if (domains.riskOfBias === 2) {
      upgrades.push('Efeito muito grande');
    } else if (domains.riskOfBias === 1) {
      upgrades.push('Efeito grande');
    }
  }
  if (domains.inconsistency > 0) {
    upgradeCount++;
    upgrades.push('Todos os confundidores plausíveis considerados');
  }
  if (domains.indirectness > 0) {
    upgradeCount++;
    upgrades.push('Gradiente dose-resposta');
  }

  // Calculate final quality
  let quality: EvidenceQuality = initialQuality;

  // Apply downgrades
  if (downgradeCount >= 3) {
    // Downgrade by 2 levels
    quality = downgradeQuality(downgradeQuality(quality));
  } else if (downgradeCount === 2) {
    // Downgrade by 1 level
    quality = downgradeQuality(quality);
  } else if (downgradeCount === 1 && initialQuality === 'high') {
    // Single downgrade from high becomes moderate
    quality = 'moderate';
  }

  // Apply upgrades (can upgrade observational studies by 1-2 levels, max to "moderate")
  if (upgradeCount >= 2 && (initialQuality === 'low' || initialQuality === 'very_low')) {
    quality = 'moderate';
  } else if (upgradeCount === 1 && initialQuality === 'very_low') {
    quality = 'low';
  }

  // Build rationale
  rationale.push(`Qualidade inicial: ${getQualityLabel(initialQuality)}`);
  if (downgradeCount > 0) {
    rationale.push(`Rebaixado ${downgradeCount} nível(is) devido a: ${downgrades.join(', ')}`);
  }
  if (upgradeCount > 0) {
    rationale.push(`Elevado ${upgradeCount} nível(is) devido a: ${upgrades.join(', ')}`);
  }

  // Determine strength of recommendation
  // Strong: high/moderate quality evidence, benefits clearly outweigh harms
  // Weak/Conditional: low/very low quality, or benefits and harms closely balanced
  const strength: RecommendationStrength =
    quality === 'high' || quality === 'moderate'
      ? 'strong'
      : 'weak';

  return {
    quality,
    strength,
    domains,
    rationale,
    downgrades,
    upgrades,
  };
}

/**
 * Downgrade quality by one level
 */
function downgradeQuality(quality: EvidenceQuality): EvidenceQuality {
  switch (quality) {
    case 'high':
      return 'moderate';
    case 'moderate':
      return 'low';
    case 'low':
      return 'very_low';
    case 'very_low':
      return 'very_low'; // Can't go lower
  }
}

/**
 * Get quality label in Portuguese
 */
export function getQualityLabel(quality: EvidenceQuality): string {
  const labels: Record<EvidenceQuality, string> = {
    high: 'Alta',
    moderate: 'Moderada',
    low: 'Baixa',
    very_low: 'Muito baixa',
  };
  return labels[quality];
}

/**
 * Get strength label in Portuguese
 */
export function getStrengthLabel(strength: RecommendationStrength): string {
  const labels: Record<RecommendationStrength, string> = {
    strong: 'Forte',
    weak: 'Fraca',
    conditional: 'Condicional',
  };
  return labels[strength];
}

/**
 * Get quality description
 */
export function getQualityDescription(quality: EvidenceQuality): string {
  const descriptions: Record<EvidenceQuality, string> = {
    high: 'Temos muita confiança de que o efeito verdadeiro está próximo do efeito estimado',
    moderate: 'Temos confiança moderada de que o efeito verdadeiro está próximo do efeito estimado',
    low: 'Nossa confiança no efeito estimado é limitada: o efeito verdadeiro pode ser substancialmente diferente do efeito estimado',
    very_low: 'Temos muito pouca confiança no efeito estimado: o efeito verdadeiro provavelmente é substancialmente diferente do efeito estimado',
  };
  return descriptions[quality];
}

/**
 * Get strength description
 */
export function getStrengthDescription(strength: RecommendationStrength): string {
  const descriptions: Record<RecommendationStrength, string> = {
    strong: 'A maioria das pessoas nesta situação desejaria a intervenção recomendada, e apenas uma pequena proporção não',
    weak: 'A maioria das pessoas nesta situação desejaria a intervenção recomendada, mas muitos não',
    conditional: 'Diferentes escolhas serão apropriadas para diferentes pacientes, e os profissionais de saúde devem ajudar os pacientes a tomar decisões consistentes com seus valores e preferências',
  };
  return descriptions[strength];
}

