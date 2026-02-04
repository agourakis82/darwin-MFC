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

// GRADE Evidence Badge (new)
export {
  EvidenceBadge,
  EvidenceStrengthBadge as GradeEvidenceStrengthBadge,
  type EvidenceBadgeProps,
} from './EvidenceBadge';

// GRADE Recommendation Card (new)
export {
  RecommendationCard,
  RecommendationList,
  type RecommendationCardProps,
} from './RecommendationCard';

// Citation Popover with evidence metadata (new)
export {
  CitationPopover,
  InlineCitationGroup,
  type CitationPopoverProps,
} from './CitationPopover';
