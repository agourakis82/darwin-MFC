/**
 * Extração de Sintomas do Texto SOAP
 * Usa NLP para identificar sintomas mencionados
 */

export interface ExtractedSymptom {
  nome: string;
  categoria?: 'geral' | 'respiratorio' | 'cardiovascular' | 'gastrointestinal' | 'neurologico' | 'dermatologico' | 'urologico' | 'ginecologico';
  confianca: number;
  contexto?: string; // Frase onde foi encontrado
}

/**
 * Lista de sintomas comuns e suas categorias
 */
const SYMPTOM_CATEGORIES: Record<string, ExtractedSymptom['categoria']> = {
  // Respiratórios
  'tosse': 'respiratorio',
  'dispneia': 'respiratorio',
  'falta de ar': 'respiratorio',
  'sibilancia': 'respiratorio',
  'coriza': 'respiratorio',
  'espirros': 'respiratorio',
  'dor de garganta': 'respiratorio',
  
  // Cardiovasculares
  'dor no peito': 'cardiovascular',
  'palpitacao': 'cardiovascular',
  'taquicardia': 'cardiovascular',
  'bradicardia': 'cardiovascular',
  'edema': 'cardiovascular',
  
  // Gastrointestinais
  'dor abdominal': 'gastrointestinal',
  'nausea': 'gastrointestinal',
  'vomito': 'gastrointestinal',
  'diarreia': 'gastrointestinal',
  'constipacao': 'gastrointestinal',
  'azia': 'gastrointestinal',
  'pirose': 'gastrointestinal',
  'regurgitacao': 'gastrointestinal',
  
  // Neurológicos
  'cefaleia': 'neurologico',
  'dor de cabeca': 'neurologico',
  'tontura': 'neurologico',
  'vertigem': 'neurologico',
  'convulsao': 'neurologico',
  'confusao': 'neurologico',
  
  // Dermatológicos
  'prurido': 'dermatologico',
  'rash': 'dermatologico',
  'lesao': 'dermatologico',
  'eritema': 'dermatologico',
  
  // Urogenitais
  'disuria': 'urologico',
  'poliuria': 'urologico',
  'incontinencia': 'urologico',
  'hematuria': 'urologico',
  
  // Ginecológicos
  'corrimento': 'ginecologico',
  'dismenorreia': 'ginecologico',
  'amenorreia': 'ginecologico',
  
  // Gerais
  'febre': 'geral',
  'calafrio': 'geral',
  'astenia': 'geral',
  'mal estar': 'geral',
  'perda de peso': 'geral',
  'ganho de peso': 'geral',
};

/**
 * Extrai sintoma principal do texto SOAP
 */
export function extractMainSymptom(soapText: string): string {
  if (!soapText || soapText.trim().length < 10) return '';

  const normalized = soapText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  // Procura por sintomas comuns
  for (const [sintoma, categoria] of Object.entries(SYMPTOM_CATEGORIES)) {
    const sintomaNormalizado = sintoma.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (normalized.includes(sintomaNormalizado)) {
      return sintoma;
    }
  }

  // Tenta extrair primeira frase
  const primeiraFrase = soapText.split(/[.!?]/)[0].trim();
  if (primeiraFrase.length > 0 && primeiraFrase.length < 100) {
    return primeiraFrase;
  }

  return '';
}

/**
 * Extrai todos os sintomas do texto SOAP
 */
export function extractAllSymptoms(soapText: string): ExtractedSymptom[] {
  if (!soapText || soapText.trim().length < 10) return [];

  const symptoms: ExtractedSymptom[] = [];
  const seen = new Set<string>();

  // Busca sintomas conhecidos no texto
  const normalized = soapText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  Object.entries(SYMPTOM_CATEGORIES).forEach(([sintoma, categoria]) => {
    const sintomaNormalizado = sintoma.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (normalized.includes(sintomaNormalizado) && !seen.has(sintoma)) {
      seen.add(sintoma);
      symptoms.push({
        nome: sintoma,
        categoria,
        confianca: 0.8,
      });
    }
  });

  return symptoms.sort((a, b) => b.confianca - a.confianca);
}

/**
 * Extrai sintoma principal e secundários de um SOAP completo
 */
export function extractSymptomsFromSOAP(soapData: {
  subjetivo?: string;
  objetivo?: {
    exameFisico?: string;
  };
}): {
  principal: string;
  secundarios: string[];
} {
  const fullText = [
    soapData.subjetivo || '',
    soapData.objetivo?.exameFisico || '',
  ].join(' ');

  const allSymptoms = extractAllSymptoms(fullText);
  
  if (allSymptoms.length === 0) {
    return {
      principal: extractMainSymptom(soapData.subjetivo || ''),
      secundarios: [],
    };
  }

  // Primeiro sintoma é o principal
  const principal = allSymptoms[0].nome;
  const secundarios = allSymptoms.slice(1).map(s => s.nome);

  return {
    principal,
    secundarios,
  };
}

