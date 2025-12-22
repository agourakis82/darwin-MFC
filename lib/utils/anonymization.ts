/**
 * DARWIN-MFC ANONYMIZATION UTILITIES
 * ===================================
 *
 * Utilities for anonymizing clinical case content.
 * Detects and removes potentially identifiable information (PII).
 *
 * IMPORTANT: This is a first-pass filter. All cases should still
 * undergo human review before publication.
 */

import type { AgeRange } from '@/lib/types/community';

// =============================================================================
// TYPES
// =============================================================================

export interface AnonymizationResult {
  text: string;
  piiDetected: PIIMatch[];
  isClean: boolean;
  score: number; // 0-100, higher = cleaner
}

export interface PIIMatch {
  type: PIIType;
  match: string;
  index: number;
  suggestion?: string;
}

export type PIIType =
  | 'name'
  | 'date'
  | 'location'
  | 'phone'
  | 'email'
  | 'id_number'
  | 'address'
  | 'institution';

// =============================================================================
// PATTERNS
// =============================================================================

const PII_PATTERNS: Record<PIIType, RegExp[]> = {
  name: [
    // Common name prefixes in Portuguese, English, Spanish
    /\b(Sr\.|Sra\.|Dr\.|Dra\.|Mr\.|Mrs\.|Ms\.|Miss)\s+[A-ZÁÉÍÓÚÀÂÊÎÔÛÃÕÇ][a-záéíóúàâêîôûãõç]+/gi,
    // Names after common introduction phrases
    /\b(paciente|patient|chamado|named|chama-se)\s+[A-ZÁÉÍÓÚÀÂÊÎÔÛÃÕÇ][a-záéíóúàâêîôûãõç]+/gi,
    // Full names (First Last pattern)
    /\b[A-ZÁÉÍÓÚÀÂÊÎÔÛÃÕÇ][a-záéíóúàâêîôûãõç]+\s+[A-ZÁÉÍÓÚÀÂÊÎÔÛÃÕÇ][a-záéíóúàâêîôûãõç]+(?:\s+[A-ZÁÉÍÓÚÀÂÊÎÔÛÃÕÇ][a-záéíóúàâêîôûãõç]+)?\b/g,
  ],
  date: [
    // DD/MM/YYYY or MM/DD/YYYY
    /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/g,
    // Month names with dates
    /\b\d{1,2}\s+de\s+(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\s+de\s+\d{4}/gi,
    /\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2},?\s+\d{4}/gi,
  ],
  location: [
    // Street addresses in Portuguese
    /\b(rua|av\.|avenida|praça|travessa|alameda)\s+[A-ZÁÉÍÓÚÀÂÊÎÔÛÃÕÇ][^,\n]+,?\s*\d*/gi,
    // City/State patterns
    /\b[A-ZÁÉÍÓÚÀÂÊÎÔÛÃÕÇ][a-záéíóúàâêîôûãõç]+\s*[-\/]\s*[A-Z]{2}\b/g,
    // CEP (Brazilian ZIP)
    /\b\d{5}-?\d{3}\b/g,
    // ZIP codes (US)
    /\b\d{5}(-\d{4})?\b/g,
  ],
  phone: [
    // Brazilian phone numbers
    /\b\(?\d{2}\)?\s*\d{4,5}[-\s]?\d{4}\b/g,
    // International format
    /\b\+\d{1,3}\s*\(?\d{2,3}\)?\s*\d{4,5}[-\s]?\d{4}\b/g,
  ],
  email: [
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  ],
  id_number: [
    // Brazilian CPF
    /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g,
    // Brazilian RG
    /\b\d{1,2}\.\d{3}\.\d{3}[-\s]?\d?\b/g,
    // Generic ID patterns
    /\b(cpf|rg|id|registro|prontuário|prontuario)[:;]?\s*\d[\d\.\-\/]+\b/gi,
  ],
  address: [
    // Full address patterns
    /\b(endereço|endereco|address|mora em|residente em|reside em)[:;]?\s*[^\.]+/gi,
  ],
  institution: [
    // Hospital/clinic names
    /\b(hospital|clínica|clinica|ubs|upa|caps|ama|posto de saúde)\s+[A-ZÁÉÍÓÚÀÂÊÎÔÛÃÕÇ][^,\.\n]+/gi,
    // University/institution names
    /\b(universidade|faculdade|university|college)\s+[A-ZÁÉÍÓÚÀÂÊÎÔÛÃÕÇ][^,\.\n]+/gi,
  ],
};

// =============================================================================
// AGE CONVERSION
// =============================================================================

/**
 * Convert exact age to age range for anonymization
 */
export function ageToRange(age: number): AgeRange {
  if (age < 1) return '0-1';
  if (age < 5) return '1-5';
  if (age < 12) return '5-12';
  if (age < 18) return '12-18';
  if (age < 30) return '18-30';
  if (age < 40) return '30-40';
  if (age < 50) return '40-50';
  if (age < 60) return '50-60';
  if (age < 70) return '60-70';
  if (age < 80) return '70-80';
  return '80+';
}

/**
 * Extract age from text and convert to range
 */
export function extractAndAnonymizeAge(text: string): { range: AgeRange | null; anonymizedText: string } {
  const agePatterns = [
    /\b(\d{1,3})\s*(anos|years|a\.?o\.?|yo)\b/gi,
    /\b(idade|age)[:;]?\s*(\d{1,3})\b/gi,
    /\bpaciente de (\d{1,3})\b/gi,
  ];

  let result = text;
  let extractedAge: number | null = null;

  for (const pattern of agePatterns) {
    const match = pattern.exec(text);
    if (match) {
      const ageIndex = match[0].match(/\d+/);
      if (ageIndex) {
        extractedAge = parseInt(ageIndex[0], 10);
        const range = ageToRange(extractedAge);
        result = result.replace(pattern, `[${range} anos]`);
        break;
      }
    }
  }

  return {
    range: extractedAge ? ageToRange(extractedAge) : null,
    anonymizedText: result,
  };
}

// =============================================================================
// MAIN ANONYMIZATION FUNCTION
// =============================================================================

/**
 * Detect and flag PII in text
 */
export function detectPII(text: string): PIIMatch[] {
  const matches: PIIMatch[] = [];

  for (const [type, patterns] of Object.entries(PII_PATTERNS) as [PIIType, RegExp[]][]) {
    for (const pattern of patterns) {
      // Reset regex state
      pattern.lastIndex = 0;
      let match;

      while ((match = pattern.exec(text)) !== null) {
        // Avoid duplicate matches at same position
        const exists = matches.some(
          (m) => m.index === match!.index && m.match === match![0]
        );

        if (!exists) {
          matches.push({
            type,
            match: match[0],
            index: match.index,
            suggestion: getSuggestion(type, match[0]),
          });
        }
      }
    }
  }

  // Sort by position
  return matches.sort((a, b) => a.index - b.index);
}

/**
 * Get replacement suggestion for PII
 */
function getSuggestion(type: PIIType, match: string): string {
  switch (type) {
    case 'name':
      return '[Nome removido]';
    case 'date':
      return '[Data removida]';
    case 'location':
      return '[Local removido]';
    case 'phone':
      return '[Telefone removido]';
    case 'email':
      return '[Email removido]';
    case 'id_number':
      return '[ID removido]';
    case 'address':
      return '[Endereço removido]';
    case 'institution':
      return '[Instituição removida]';
    default:
      return '[Removido]';
  }
}

/**
 * Anonymize text by replacing detected PII
 */
export function anonymize(text: string): AnonymizationResult {
  const piiDetected = detectPII(text);

  if (piiDetected.length === 0) {
    return {
      text,
      piiDetected: [],
      isClean: true,
      score: 100,
    };
  }

  // Replace PII with suggestions (from end to start to preserve indices)
  let anonymizedText = text;
  const sortedMatches = [...piiDetected].sort((a, b) => b.index - a.index);

  for (const match of sortedMatches) {
    anonymizedText =
      anonymizedText.substring(0, match.index) +
      (match.suggestion || '[Removido]') +
      anonymizedText.substring(match.index + match.match.length);
  }

  // Calculate score based on amount of PII found
  const piiCharCount = piiDetected.reduce((sum, m) => sum + m.match.length, 0);
  const score = Math.max(0, Math.round(100 - (piiCharCount / text.length) * 200));

  return {
    text: anonymizedText,
    piiDetected,
    isClean: false,
    score,
  };
}

/**
 * Quick check if text likely contains PII
 */
export function containsPII(text: string): boolean {
  for (const patterns of Object.values(PII_PATTERNS)) {
    for (const pattern of patterns) {
      pattern.lastIndex = 0;
      if (pattern.test(text)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Validate that clinical case data is properly anonymized
 */
export function validateCaseAnonymization(caseData: {
  presentation: string;
  history?: string;
  physicalExam?: string;
  labResults?: string;
  imaging?: string;
}): {
  isValid: boolean;
  issues: Array<{ field: string; matches: PIIMatch[] }>;
} {
  const issues: Array<{ field: string; matches: PIIMatch[] }> = [];

  const fieldsToCheck: Array<{ name: string; value: string | undefined }> = [
    { name: 'presentation', value: caseData.presentation },
    { name: 'history', value: caseData.history },
    { name: 'physicalExam', value: caseData.physicalExam },
    { name: 'labResults', value: caseData.labResults },
    { name: 'imaging', value: caseData.imaging },
  ];

  for (const field of fieldsToCheck) {
    if (field.value) {
      const matches = detectPII(field.value);
      if (matches.length > 0) {
        issues.push({ field: field.name, matches });
      }
    }
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}
