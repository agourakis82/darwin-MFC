/**
 * NLP Client-Side para Análise de Notas SOAP
 * Extração de entidades médicas e sugestões inteligentes
 */

import { todasDoencas } from '@/lib/data/doencas/index';
import { todosMedicamentos } from '@/lib/data/medicamentos/index';
import type { Doenca } from '@/lib/types/doenca';
import type { Medicamento } from '@/lib/types/medicamento';

export interface ExtractedEntity {
  type: 'doenca' | 'medicamento' | 'sintoma' | 'exame' | 'cid10' | 'ciap2';
  text: string;
  value?: string; // ID ou código quando disponível
  confidence: number; // 0-1
  metadata?: {
    cid10?: string[];
    ciap2?: string[];
    sinonimos?: string[];
  };
}

export interface SOAPAnalysis {
  entities: ExtractedEntity[];
  suggestedDiagnoses: Array<{
    doenca: Partial<Doenca>;
    confidence: number;
    matchedTerms: string[];
  }>;
  suggestedMedications: Array<{
    medicamento: Medicamento;
    confidence: number;
    matchedTerms: string[];
  }>;
  suggestedCodes: {
    cid10: string[];
    ciap2: string[];
  };
  keywords: string[];
}

// Padrões regex para identificação de entidades
const PATTERNS = {
  cid10: /\b([A-Z]\d{2}(?:\.\d)?)\b/gi,
  ciap2: /\b([A-Z]\d{2,3})\b/gi,
  medicamento: /\b(?:medicamento|medicação|med|uso de|prescrição de)\s+([A-Za-záàâãéêíóôõúç]+(?:\s+[A-Za-záàâãéêíóôõúç]+)*)/gi,
  sintomasComuns: /\b(dor|febre|tosse|coriza|mal\s+estar|náusea|vômito|diarreia|constipação|tontura|cansaço|fadiga|sonolência|insônia|prurido|rash|lesão|ferida)\b/gi,
  examesComuns: /\b(hemograma|glicemia|glicose|colesterol|triglicerídeos|urina|urocultura|raios?\s+x|ultrassom|ecografia|eletrocardiograma|ecg|teste|exame\s+de)\b/gi,
};

// Dicionário de sintomas -> doenças (peso de confiança)
const SYMPTOM_DISEASE_MAP: Record<string, string[]> = {
  // Respiratórios
  'tosse': ['gripe', 'resfriado', 'pneumonia', 'asma', 'dpoc', 'bronquite'],
  'coriza': ['gripe', 'resfriado', 'rinite-alergica'],
  'dor de garganta': ['faringite', 'amigdalite', 'gripe'],
  'febre': ['gripe', 'pneumonia', 'infeccao', 'amigdalite'],
  'falta de ar': ['asma', 'dpoc', 'pneumonia', 'insuficiencia-cardiaca'],
  
  // Gastrointestinais
  'dor abdominal': ['gastrite', 'doenca-refluxo-gastroesofagico', 'apendicite', 'sindrome-intestino-irritavel'],
  'náusea': ['gastrite', 'doenca-refluxo-gastroesofagico', 'gripe'],
  'vômito': ['gastrite', 'gastroenterite-viral'],
  'diarreia': ['gastroenterite-viral', 'sindrome-intestino-irritavel'],
  'constipação': ['sindrome-intestino-irritavel', 'constipacao'],
  'azia': ['doenca-refluxo-gastroesofagico', 'gastrite'],
  
  // Neurológicos
  'cefaleia': ['migranea', 'cefaleia-tensional', 'hipertensao-arterial'],
  'tontura': ['labirintite', 'hipertensao-arterial', 'hipotensao'],
  'convulsão': ['epilepsia'],
  
  // Dermatológicos
  'prurido': ['urticaria', 'dermatite', 'alergia'],
  'rash': ['urticaria', 'dermatite', 'alergia'],
  'lesão': ['impetigo', 'dermatite'],
  
  // Endócrinos/Metabólicos
  'poliúria': ['diabetes-mellitus-tipo-2', 'itu'],
  'polifagia': ['diabetes-mellitus-tipo-2'],
  'polidipsia': ['diabetes-mellitus-tipo-2'],
  'perda de peso': ['diabetes-mellitus-tipo-2', 'hipertiroidismo'],
  'ganho de peso': ['hipotireoidismo', 'obesidade'],
  
  // Cardiovasculares
  'dor no peito': ['angina', 'infarto', 'dor-toracica'],
  'palpitação': ['arritmia', 'ansiedade'],
  'edema': ['insuficiencia-cardiaca', 'doenca-renal-cronica'],
  
  // Urogenitais
  'disúria': ['itu', 'cistite'],
  'incontinência': ['incontinencia-urinaria'],
  'corrimento': ['candidiase', 'vaginose'],
};

/**
 * Normaliza texto para busca (remove acentos, lowercase, etc)
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Calcula similaridade entre dois textos (Jaccard similarity simplificado)
 */
function calculateSimilarity(text1: string, text2: string): number {
  const normalized1 = normalizeText(text1);
  const normalized2 = normalizeText(text2);
  
  if (normalized1 === normalized2) return 1.0;
  
  const words1 = new Set(normalized1.split(/\s+/));
  const words2 = new Set(normalized2.split(/\s+/));
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
}

/**
 * Busca doenças por termos no texto
 */
function findDiseasesByText(text: string, minConfidence = 0.3): Array<{ doenca: Partial<Doenca>; confidence: number; matchedTerms: string[] }> {
  const normalizedText = normalizeText(text);
  const words = normalizedText.split(/\s+/);
  const results: Array<{ doenca: Partial<Doenca>; confidence: number; matchedTerms: string[] }> = [];
  
  // Busca por ID, título e sinônimos
  todasDoencas.forEach((doenca) => {
    if (!doenca.id || !doenca.titulo) return;
    
    const matchedTerms: string[] = [];
    let maxSimilarity = 0;
    
    // Verifica título
    const titleSimilarity = calculateSimilarity(text, doenca.titulo);
    if (titleSimilarity > minConfidence) {
      matchedTerms.push(doenca.titulo);
      maxSimilarity = Math.max(maxSimilarity, titleSimilarity);
    }
    
    // Verifica sinônimos
    if (doenca.sinonimos) {
      doenca.sinonimos.forEach(sinonimo => {
        const similarity = calculateSimilarity(text, sinonimo);
        if (similarity > minConfidence) {
          matchedTerms.push(sinonimo);
          maxSimilarity = Math.max(maxSimilarity, similarity);
        }
      });
    }
    
    // Verifica ID
    if (normalizedText.includes(normalizeText(doenca.id))) {
      matchedTerms.push(doenca.id);
      maxSimilarity = Math.max(maxSimilarity, 0.8);
    }
    
    // Verifica se palavras-chave do texto aparecem na doença
    words.forEach(word => {
      if (word.length > 3 && (doenca.titulo?.toLowerCase().includes(word) || doenca.id?.includes(word))) {
        matchedTerms.push(word);
        maxSimilarity = Math.max(maxSimilarity, 0.6);
      }
    });
    
    if (maxSimilarity > minConfidence) {
      results.push({
        doenca,
        confidence: Math.min(maxSimilarity, 1.0),
        matchedTerms: [...new Set(matchedTerms)],
      });
    }
  });
  
  // Ordena por confiança e retorna top 10
  return results
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 10);
}

/**
 * Busca medicamentos por termos no texto
 */
function findMedicationsByText(text: string, minConfidence = 0.3): Array<{ medicamento: Medicamento; confidence: number; matchedTerms: string[] }> {
  const normalizedText = normalizeText(text);
  const words = normalizedText.split(/\s+/);
  const results: Array<{ medicamento: Medicamento; confidence: number; matchedTerms: string[] }> = [];
  
  todosMedicamentos.forEach((medicamento) => {
    const matchedTerms: string[] = [];
    let maxSimilarity = 0;
    
    // Verifica nome genérico
    const genericSimilarity = calculateSimilarity(text, medicamento.nomeGenerico);
    if (genericSimilarity > minConfidence) {
      matchedTerms.push(medicamento.nomeGenerico);
      maxSimilarity = Math.max(maxSimilarity, genericSimilarity);
    }
    
    // Verifica nomes comerciais
    if (medicamento.nomesComerciais) {
      medicamento.nomesComerciais.forEach(nomeComercial => {
        const similarity = calculateSimilarity(text, nomeComercial);
        if (similarity > minConfidence) {
          matchedTerms.push(nomeComercial);
          maxSimilarity = Math.max(maxSimilarity, similarity * 0.9); // Ligeiramente menor peso
        }
      });
    }
    
    // Verifica ID
    if (normalizedText.includes(normalizeText(medicamento.id))) {
      matchedTerms.push(medicamento.id);
      maxSimilarity = Math.max(maxSimilarity, 0.8);
    }
    
    // Verifica palavras-chave
    words.forEach(word => {
      if (word.length > 3 && (medicamento.nomeGenerico.toLowerCase().includes(word))) {
        matchedTerms.push(word);
        maxSimilarity = Math.max(maxSimilarity, 0.6);
      }
    });
    
    if (maxSimilarity > minConfidence) {
      results.push({
        medicamento,
        confidence: Math.min(maxSimilarity, 1.0),
        matchedTerms: [...new Set(matchedTerms)],
      });
    }
  });
  
  return results
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 10);
}

/**
 * Extrai códigos CID-10 e CIAP-2 do texto
 */
function extractCodesFromText(text: string): { cid10: string[]; ciap2: string[] } {
  const cid10Matches = text.match(PATTERNS.cid10) || [];
  const ciap2Matches = text.match(PATTERNS.ciap2) || [];
  
  return {
    cid10: [...new Set(cid10Matches.map(code => code.toUpperCase()))],
    ciap2: [...new Set(ciap2Matches.map(code => code.toUpperCase()))],
  };
}

/**
 * Sugere diagnósticos baseado em sintomas mencionados
 */
function suggestDiagnosesBySymptoms(text: string): Array<{ doenca: Partial<Doenca>; confidence: number; matchedTerms: string[] }> {
  const normalizedText = normalizeText(text);
  const suggestions: Map<string, { doenca: Partial<Doenca>; confidence: number; matchedTerms: string[] }> = new Map();
  
  // Procura sintomas no texto e mapeia para doenças
  Object.entries(SYMPTOM_DISEASE_MAP).forEach(([sintoma, doencaIds]) => {
    if (normalizedText.includes(normalizeText(sintoma))) {
      doencaIds.forEach(doencaId => {
        const doenca = todasDoencas.find(d => d.id === doencaId);
        if (doenca) {
          const existing = suggestions.get(doencaId);
          const confidence = 0.5; // Confiança base para sugestão por sintoma
          
          if (existing) {
            existing.confidence = Math.min(existing.confidence + 0.2, 0.9);
            existing.matchedTerms.push(sintoma);
          } else {
            suggestions.set(doencaId, {
              doenca,
              confidence,
              matchedTerms: [sintoma],
            });
          }
        }
      });
    }
  });
  
  return Array.from(suggestions.values())
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 5);
}

/**
 * Analisa texto SOAP e extrai entidades médicas
 */
export function analyzeSOAPText(
  text: string,
  options: {
    extractDiseases?: boolean;
    extractMedications?: boolean;
    extractCodes?: boolean;
    suggestDiagnoses?: boolean;
    minConfidence?: number;
  } = {}
): SOAPAnalysis {
  const {
    extractDiseases = true,
    extractMedications = true,
    extractCodes = true,
    suggestDiagnoses = true,
    minConfidence = 0.3,
  } = options;
  
  const entities: ExtractedEntity[] = [];
  const keywords: string[] = [];
  
  // Extrai códigos
  let suggestedCodes = { cid10: [] as string[], ciap2: [] as string[] };
  if (extractCodes) {
    suggestedCodes = extractCodesFromText(text);
    suggestedCodes.cid10.forEach(code => {
      entities.push({
        type: 'cid10',
        text: code,
        value: code,
        confidence: 1.0,
      });
    });
    suggestedCodes.ciap2.forEach(code => {
      entities.push({
        type: 'ciap2',
        text: code,
        value: code,
        confidence: 1.0,
      });
    });
  }
  
  // Busca doenças
  let suggestedDiagnoses: Array<{ doenca: Partial<Doenca>; confidence: number; matchedTerms: string[] }> = [];
  if (extractDiseases || suggestDiagnoses) {
    if (extractDiseases) {
      suggestedDiagnoses = findDiseasesByText(text, minConfidence);
    }
    
    if (suggestDiagnoses) {
      const symptomBased = suggestDiagnosesBySymptoms(text);
      // Merge e remove duplicatas
      const merged = new Map<string, { doenca: Partial<Doenca>; confidence: number; matchedTerms: string[] }>();
      
      [...suggestedDiagnoses, ...symptomBased].forEach(item => {
        if (!item.doenca.id) return;
        const existing = merged.get(item.doenca.id);
        if (existing) {
          existing.confidence = Math.max(existing.confidence, item.confidence);
          existing.matchedTerms = [...new Set([...existing.matchedTerms, ...item.matchedTerms])];
        } else {
          merged.set(item.doenca.id, item);
        }
      });
      
      suggestedDiagnoses = Array.from(merged.values())
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 10);
    }
    
    // Adiciona como entidades
    suggestedDiagnoses.forEach(item => {
      if (!item.doenca.id) return;
      entities.push({
        type: 'doenca',
        text: item.doenca.titulo || item.doenca.id || '',
        value: item.doenca.id,
        confidence: item.confidence,
        metadata: {
          cid10: item.doenca.cid10,
          ciap2: item.doenca.ciap2,
        },
      });
    });
  }
  
  // Busca medicamentos
  let suggestedMedications: Array<{ medicamento: Medicamento; confidence: number; matchedTerms: string[] }> = [];
  if (extractMedications) {
    suggestedMedications = findMedicationsByText(text, minConfidence);
    
    // Adiciona como entidades
    suggestedMedications.forEach(item => {
      entities.push({
        type: 'medicamento',
        text: item.medicamento.nomeGenerico,
        value: item.medicamento.id,
        confidence: item.confidence,
      });
    });
  }
  
  // Extrai keywords (sintomas, exames comuns)
  const sintomasMatch = text.match(PATTERNS.sintomasComuns);
  const examesMatch = text.match(PATTERNS.examesComuns);
  
  if (sintomasMatch) {
    keywords.push(...sintomasMatch.map(s => s.toLowerCase()));
    sintomasMatch.forEach(sintoma => {
      entities.push({
        type: 'sintoma',
        text: sintoma,
        confidence: 0.7,
      });
    });
  }
  
  if (examesMatch) {
    keywords.push(...examesMatch.map(e => e.toLowerCase()));
    examesMatch.forEach(exame => {
      entities.push({
        type: 'exame',
        text: exame,
        confidence: 0.7,
      });
    });
  }
  
  return {
    entities,
    suggestedDiagnoses,
    suggestedMedications,
    suggestedCodes,
    keywords: [...new Set(keywords)],
  };
}

/**
 * Analisa múltiplos campos SOAP e retorna análise consolidada
 */
export function analyzeFullSOAP(soapData: {
  subjetivo?: string;
  objetivo?: string;
  avaliacao?: string;
  plano?: string;
}): SOAPAnalysis {
  const fullText = [
    soapData.subjetivo || '',
    soapData.objetivo || '',
    soapData.avaliacao || '',
    soapData.plano || '',
  ].join(' ').trim();
  
  return analyzeSOAPText(fullText, {
    extractDiseases: true,
    extractMedications: true,
    extractCodes: true,
    suggestDiagnoses: true,
  });
}

/**
 * Sugere códigos CID-10 e CIAP-2 baseado em diagnóstico
 */
export function suggestCodesForDiagnosis(doencaId: string): { cid10: string[]; ciap2: string[] } {
  const doenca = todasDoencas.find(d => d.id === doencaId);
  if (!doenca) return { cid10: [], ciap2: [] };
  
  return {
    cid10: doenca.cid10 || [],
    ciap2: doenca.ciap2 || [],
  };
}

