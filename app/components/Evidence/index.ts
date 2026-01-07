// Evidence Strength Badge and related components
export {
  EvidenceStrengthBadge,
  EvidenceIndicator,
  EvidenceLegend,
  type EvidenceLevel,
  type EvidenceStrengthBadgeProps,
} from './EvidenceStrengthBadge';

// Evidence Strength Card with GRADE methodology
export {
  EvidenceStrengthCard,
  type EvidenceStrengthCardProps,
  type StudyDesign,
  type RecommendationStrength,
  type GradeFactors,
  type ConfidenceInterval,
} from './EvidenceStrengthCard';

// Evidence Source Chips
export {
  EvidenceSourceChip,
  EvidenceSourceGroup,
  type EvidenceSource,
  type EvidenceSourceChipProps,
} from './EvidenceSourceChip';

// Evidence Confidence Bar
export {
  EvidenceConfidenceBar,
  ConfidenceIndicator,
  ConfidenceComparison,
  type EvidenceConfidenceBarProps,
  type ConfidenceLevel,
} from './EvidenceConfidenceBar';

// GRADE Evidence Badge - Complete GRADE methodology components
export {
  GradeEvidenceBadge,
  GradeEvidenceCard,
  GradeIndicator,
  GradeEvidenceLegend,
  type GradeEvidenceBadgeProps,
  type GradeEvidenceCardProps,
  type GradeIndicatorProps,
} from './GradeEvidenceBadge';

// Re-export GRADE types from evidence module for convenience
export type {
  GradeEvidenceLevel,
  GradeQualityOfEvidence,
  GradeRecommendationStrength,
  GradeAssessment,
  GradeAssessmentSimple,
  GradeDowngradingFactors,
  GradeUpgradingFactors,
  GradeRiskOfBias,
  GradeInconsistency,
  GradeIndirectness,
  GradeImprecision,
  GradePublicationBias,
} from '@/lib/types/evidence';
