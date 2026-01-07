/**
 * Bibliography Components
 *
 * Academic citation system for Darwin-MFC platform.
 * Supports Vancouver-style formatting, PubMed/DOI linking,
 * and copy-to-clipboard functionality.
 */

// Main citation components
export { default as InlineCitation, CitationProvider, QuickCitation, MultiCitation } from './InlineCitation';
export { default as CitationTooltip } from './CitationTooltip';
export { default as ReferenceList } from './ReferenceList';
export { default as FootnoteSystem, FootnoteRef } from './FootnoteSystem';
export { default as ReferenceValidator } from './ReferenceValidator';

// Evidence components
export { EvidenceBadge, EvidenceTooltip } from './EvidenceBadge';
