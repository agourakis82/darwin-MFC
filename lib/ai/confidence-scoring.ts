/**
 * Sistema de Confiança para Entidades e Diagnósticos
 * Darwin-MFC - Módulo de IA Clínica
 */

import { MedicalEntity } from './extraction';

// =============================================================================
// TIPOS DE CONFIANÇA
// =============================================================================

/**
 * Nível de confiança para uma entidade.
 */
export type ConfidenceLevel = 
  | 'very-high'     // 0.90-1.00
  | 'high'         // 0.80-0.89
  | 'medium'       // 0.60-0.79
  | 'low'          // 0.40-0.59
  | 'very-low';     // 0.00-0.39

/**
 * Contexto para cálculo de confiança.
 */
export interface EntityContext {
  /** Lista de outros sintomas presentes */
  symptomPresence: string[];
  /** Lista de outras medicações presentes */
  medicationPresence: string[];
  /** Lista de outros exames presentes */
  examPresence: string[];
  /** Se é uma seção subjetiva */
  isSubjectiveSection: boolean;
  /** Se é uma seção objetiva */
  isObjectiveSection: boolean;
  /** Se é uma seção de avaliação */
  isAssessmentSection: boolean;
  /** Seção atual */
  currentSection: string;
  /** Comprimento da nota */
  noteLength: number;
  /** Densidade de entidades */
  entityDensity: number;
}

/**
 * Resultado de confiança para uma entidade.
 */
export interface EntityConfidence {
  /** Entidade original */
  entity: MedicalEntity;
  /** Nível de confiança */
  level: ConfidenceLevel;
  /** Valor numérico de confiança */
  score: number;
  /** Fatores que contribuem para confiança */
  contributingFactors: string[];
  /** Fatores que reduzem confiança */
  limitingFactors: string[];
}

/**
 * Resultado de confiança para diagnóstico diferencial.
 */
export interface DiagnosisConfidence {
  /** Condição médica */
  condition: string;
  /** Probabilidade estimada */
  probability: number;
  /** Nível de confiança */
  level: ConfidenceLevel;
  /** Fatores de suporte */
  supportingFactors: string[];
  /** Fatores limitantes */
  limitingFactors: string[];
  /** Score de confiança (0-100) */
  confidenceScore: number;
}

// =============================================================================
// CONFIGURAÇÕES DE CONFIANÇA
// =============================================================================

/**
 * Pesos para diferentes tipos de entidades.
 */
const ENTITY_WEIGHTS = {
  MEDICATION: 0.85,
  EXAM: 0.85,
  VITAL_SIGN: 0.90,
  DOSAGE: 0.80,
  SYMPTOM: 0.75,
  DIAGNOSIS: 0.65,
  PROCEDURE: 0.70
};

/**
 * Fatores que influenciam a confiança por tipo de seção.
 */
const SECTION_FACTORS = {
  SUBJECTIVE: {
    symptoms: { weight: 0.8, threshold: 2 },
    medications: { weight: 0.7, threshold: 3 },
    dosages: { weight: 0.6, threshold: 2 }
  },
  OBJECTIVE: {
    vitalSigns: { weight: 1.0, threshold: 2 },
    exams: { weight: 0.9, threshold: 1 },
    medications: { weight: 0.8, threshold: 2 }
  },
  ASSESSMENT: {
    diagnoses: { weight: 0.9, threshold: 1 },
    symptoms: { weight: 0.8, threshold: 1 },
    medications: { weight: 0.7, threshold: 1 }
  },
  PLAN: {
    medications: { weight: 0.9, threshold: 1 },
    dosages: { weight: 0.8, threshold: 1 },
    procedures: { weight: 0.8, threshold: 1 }
  }
};

/**
 * Fatores adicionais para diagnósticos diferenciais.
 */
const DIAGNOSIS_FACTORS = {
  SYMPTOM_MATCH: { weight: 0.4, threshold: 3 },
  MEDICATION_MATCH: { weight: 0.3, threshold: 2 },
  EXAM_MATCH: { weight: 0.2, threshold: 1 },
  SECTION_DIVERSITY: { weight: 0.1, threshold: 3 }
};

// =============================================================================
// FUNÇÕES DE CÁLCULO DE CONFIANÇA
// =============================================================================

/**
 * Calcula o nível de confiança para uma entidade com base no contexto.
 */
export function calculateEntityConfidence(
  entity: MedicalEntity,
  context: EntityContext
): EntityConfidence {
  const baseScore = entity.confidence || 0.5;
  const entityType = entity.type.toString();
  
  // Obter peso base para o tipo de entidade
  const baseWeight = ENTITY_WEIGHTS[entityType as keyof typeof ENTITY_WEIGHTS] || 0.5;
  
  // Fatores de seção baseados no tipo de entidade
  const sectionFactors = getSectionFactors(entityType, context.currentSection);
  
  // Fatores contextuais
  const contextualFactors = getContextualFactors(entity, context);
  
  // Combinar todos os fatores
  const adjustedScore = baseScore * baseWeight * sectionFactors * contextualFactors.multiplier;
  
  // Limitar ao intervalo 0-1
  const finalScore = Math.min(1.0, Math.max(0.0, adjustedScore));
  
  // Converter para nível de confiança
  const level = scoreToLevel(finalScore);
  
  return {
    entity,
    level,
    score: finalScore,
    contributingFactors: contextualFactors.factors,
    limitingFactors: contextualFactors.limitations
  };
}

/**
 * Calcula o nível de confiança para um diagnóstico diferencial.
 */
export function calculateDiagnosisConfidence(
  condition: string,
  symptoms: string[],
  medications: string[],
  exams: string[],
  sections: string[]
): DiagnosisConfidence {
  // Fatores de correspondência
  const symptomMatch = calculateSymptomMatch(condition, symptoms);
  const medicationMatch = calculateMedicationMatch(condition, medications);
  const examMatch = calculateExamMatch(condition, exams);
  
  // Diversidade de seções (mais seções = maior confiança)
  const sectionDiversity = calculateSectionDiversity(sections);
  
  // Calcular probabilidade combinada (0-1)
  const probability = (
    symptomMatch.score * DIAGNOSIS_FACTORS.SYMPTOM_MATCH.weight +
    medicationMatch.score * DIAGNOSIS_FACTORS.MEDICATION_MATCH.weight +
    examMatch.score * DIAGNOSIS_FACTORS.EXAM_MATCH.weight +
    sectionDiversity.score * DIAGNOSIS_FACTORS.SECTION_DIVERSITY.weight
  );
  
  // Fatores de suporte e limitação
  const supportingFactors = [
    ...symptomMatch.matchedTerms,
    ...medicationMatch.matchedTerms,
    ...examMatch.matchedTerms,
    `Diverse evidence (${sections.length} sections)`
  ];
  
  const limitingFactors = [
    ...symptomMatch.unmatchedTerms,
    ...medicationMatch.unmatchedTerms,
    ...examMatch.unmatchedTerms
  ];
  
  // Calcular score de confiança baseado na diversidade de evidências
  const confidenceScore = Math.min(100, Math.max(0, 
    100 * (probability * sectionDiversity.score)
  ));
  
  return {
    condition,
    probability,
    level: scoreToLevel(confidenceScore / 100),
    supportingFactors,
    limitingFactors,
    confidenceScore
  };
}

// =============================================================================
// FUNÇÕES AUXILIARES
// =============================================================================

/**
 * Converte um valor numérico para um nível de confiança.
 */
function scoreToLevel(score: number): ConfidenceLevel {
  if (score >= 0.90) return 'very-high';
  if (score >= 0.80) return 'high';
  if (score >= 0.60) return 'medium';
  if (score >= 0.40) return 'low';
  return 'very-low';
}

/**
 * Obtém fatores baseados na seção para o tipo de entidade.
 */
function getSectionFactors(entityType: string, section: string): number {
  const sectionKey = section.toUpperCase() as keyof typeof SECTION_FACTORS;
  
  // Se a seção existe nos fatores de confiança
  if (SECTION_FACTORS[sectionKey]) {
    const sectionFactor = SECTION_FACTORS[sectionKey];
    
    // Mapear tipo de entidade para fator de seção
    const entityKey = entityType.toLowerCase() as keyof typeof sectionFactor;
    
    if (sectionFactor[entityKey]) {
      return sectionFactor[entityKey].weight;
    }
  }
  
  // Valor padrão se não encontrar correspondência
  return 0.7;
}

/**
 * Calcula fatores contextuais para uma entidade.
 */
function getContextualFactors(
  entity: MedicalEntity,
  context: EntityContext
): { multiplier: number; factors: string[]; limitations: string[] } {
  const factors: string[] = [];
  const limitations: string[] = [];
  let multiplier = 1.0;
  
  // Verificar se entidades similares estão presentes (aumenta confiança)
  const entityType = entity.type.toString();
  
  switch (entityType) {
    case 'SYMPTOM':
      if (context.symptomPresence.length > 1) {
        multiplier *= 1.1;
        factors.push(`Multiple symptoms present (${context.symptomPresence.length})`);
      }
      if (context.currentSection === 'ASSESSMENT') {
        multiplier *= 1.05;
        factors.push('Directly in assessment section');
      }
      break;
      
    case 'MEDICATION':
      if (context.medicationPresence.length > 1) {
        multiplier *= 1.08;
        factors.push(`Multiple medications (${context.medicationPresence.length})`);
      }
      if (context.medicationPresence.includes(entity.text)) {
        multiplier *= 1.05;
        factors.push('Already mentioned in medications');
      }
      break;
      
    case 'EXAM':
      if (context.examPresence.length > 0) {
        multiplier *= 1.1;
        factors.push(`Additional tests present`);
      }
      if (context.currentSection === 'OBJECTIVE') {
        multiplier *= 1.05;
        factors.push('Directly in objective section');
      }
      break;
      
    case 'VITAL_SIGN':
      if (context.currentSection === 'OBJECTIVE') {
        multiplier *= 1.15;
        factors.push('Vital signs in objective section');
      }
      break;
      
    case 'DOSAGE':
      const hasMedication = context.medicationPresence.length > 0;
      if (hasMedication) {
        multiplier *= 1.1;
        factors.push('Dosage mentioned with medication');
      } else {
        limitations.push('No medication context found for dosage');
        multiplier *= 0.9;
      }
      break;
  }
  
  // Fator geral de densidade de entidades
  if (context.entityDensity > 5) {
    multiplier *= 1.05;
    factors.push('High entity density (clear context)');
  } else if (context.entityDensity < 2) {
    multiplier *= 0.95;
    limitations.push('Low entity density (limited context)');
  }
  
  // Fator de comprimento da nota
  if (context.noteLength > 500) {
    multiplier *= 1.05;
    factors.push('Detailed note (rich context)');
  }
  
  return { multiplier, factors, limitations };
}

/**
 * Calcula correspondência de sintomas para um diagnóstico.
 */
function calculateSymptomMatch(
  condition: string,
  symptoms: string[]
): { score: number; matchedTerms: string[]; unmatchedTerms: string[] } {
  // Esta é uma implementação simplificada
  // Em produção, seria usado um mapeamento real de sintomas para condições
  
  const symptomDatabase = {
    'Infecção Respiratória': ['tosse', 'febre', 'falta de ar', 'dor no peito', 'cefaleia'],
    'Pneumonia': ['tosse', 'febre', 'falta de ar', 'dor no peito'],
    'Gastroenterite': ['náusea', 'vômito', 'diarreia', 'dor abdominal'],
    'Insuficiência Cardíaca': ['edema', 'falta de ar', 'fadiga', 'palpitações'],
    'Diabetes Mellitus': ['poliúria', 'polidipsia', 'perda de peso', 'fadiga'],
    'Artrite Reumatoide': ['dor nas articulações', 'rigidez', 'fadiga']
  };
  
  const conditionSymptoms = symptomDatabase[condition as keyof typeof symptomDatabase] || [];
  
  // Calcular correspondência
  const matchedTerms: string[] = [];
  const unmatchedTerms: string[] = [];
  
  let matchScore = 0;
  
  // Verificar correspondência de sintomas
  for (const symptom of symptoms) {
    if (conditionSymptoms.some(cs => symptom.toLowerCase().includes(cs.toLowerCase()))) {
      matchedTerms.push(symptom);
      matchScore += 1;
    } else {
      unmatchedTerms.push(symptom);
    }
  }
  
  // Normalizar score
  const maxPossible = Math.max(conditionSymptoms.length, symptoms.length);
  const normalizedScore = maxPossible > 0 ? matchScore / maxPossible : 0;
  
  return {
    score: normalizedScore,
    matchedTerms,
    unmatchedTerms
  };
}

/**
 * Calcula correspondência de medicamentos para um diagnóstico.
 */
function calculateMedicationMatch(
  condition: string,
  medications: string[]
): { score: number; matchedTerms: string[]; unmatchedTerms: string[] } {
  // Implementação simplificada
  const medicationDatabase = {
    'Infecção Respiratória': ['amoxicilina', 'azitromicina', 'paracetamol', 'ibuprofeno'],
    'Pneumonia': ['amoxicilina', 'azitromicina', 'levofloxacino'],
    'Gastroenterite': ['domperidona', 'metoclopramida', 'loperamida'],
    'Insuficiência Cardíaca': ['furosemida', 'carvedilol', 'enalapril'],
    'Diabetes Mellitus': ['metformina', 'glibenclamida', 'insulina'],
    'Artrite Reumatoide': ['prednisolona', 'metotrexato', 'ibuprofeno']
  };
  
  const conditionMedications = medicationDatabase[condition as keyof typeof medicationDatabase] || [];
  
  const matchedTerms: string[] = [];
  const unmatchedTerms: string[] = [];
  
  let matchScore = 0;
  
  for (const medication of medications) {
    if (conditionMedications.some(cm => medication.toLowerCase().includes(cm.toLowerCase()))) {
      matchedTerms.push(medication);
      matchScore += 1;
    } else {
      unmatchedTerms.push(medication);
    }
  }
  
  const maxPossible = Math.max(conditionMedications.length, medications.length);
  const normalizedScore = maxPossible > 0 ? matchScore / maxPossible : 0;
  
  return {
    score: normalizedScore,
    matchedTerms,
    unmatchedTerms
  };
}

/**
 * Calcula correspondência de exames para um diagnóstico.
 */
function calculateExamMatch(
  condition: string,
  exams: string[]
): { score: number; matchedTerms: string[]; unmatchedTerms: string[] } {
  // Implementação simplificada
  const examDatabase = {
    'Infecção Respiratória': ['raio x', 'tomografia', 'hemograma'],
    'Pneumonia': ['raio x', 'tomografia', 'hemograma', 'glicemia'],
    'Gastroenterite': ['hemograma', 'glicemia', 'urina'],
    'Insuficiência Cardíaca': ['ecocardiograma', 'ecg', 'dosagem de peptideo'],
    'Diabetes Mellitus': ['glicemia', 'hemoglobina glicada', 'urina'],
    'Artrite Reumatoide': ['hemograma', 'velocidade de hemossedimentação', 'fator reumatoide']
  };
  
  const conditionExams = examDatabase[condition as keyof typeof examDatabase] || [];
  
  const matchedTerms: string[] = [];
  const unmatchedTerms: string[] = [];
  
  let matchScore = 0;
  
  for (const exam of exams) {
    if (conditionExams.some(ce => exam.toLowerCase().includes(ce.toLowerCase()))) {
      matchedTerms.push(exam);
      matchScore += 1;
    } else {
      unmatchedTerms.push(exam);
    }
  }
  
  const maxPossible = Math.max(conditionExams.length, exams.length);
  const normalizedScore = maxPossible > 0 ? matchScore / maxPossible : 0;
  
  return {
    score: normalizedScore,
    matchedTerms,
    unmatchedTerms
  };
}

/**
 * Calcula diversidade de seções.
 */
function calculateSectionDiversity(sections: string[]): { score: number; factor: number } {
  // Score baseado na diversidade de seções presentes
  const uniqueSections = new Set(sections);
  const diversityFactor = uniqueSections.size / 4; // Máximo de 4 seções

  return {
    score: Math.min(1, diversityFactor),
    factor: diversityFactor
  };
}
