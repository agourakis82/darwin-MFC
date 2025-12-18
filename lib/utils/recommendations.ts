/**
 * Sistema de Recomendações Personalizado
 * Baseado em histórico de consultas e padrões clínicos
 */

import type { SOAPData } from '@/app/components/Export/SOAPExport';
import { todasDoencas } from '@/lib/data/doencas/index';
import { todosMedicamentos } from '@/lib/data/medicamentos/index';
import type { Doenca } from '@/lib/types/doenca';
import type { Medicamento } from '@/lib/types/medicamento';
import { analyzeFullSOAP } from './nlp-soap';

export interface ConsultationHistory {
  id: string;
  date: string;
  soapData: SOAPData;
  tags?: string[];
}

export interface Recommendation {
  type: 'diagnosis' | 'medication' | 'protocol' | 'exam' | 'followup';
  title: string;
  description: string;
  confidence: number; // 0-1
  reason: string; // Por que foi sugerido
  action?: {
    label: string;
    onClick?: () => void;
  };
  metadata?: {
    doencaId?: string;
    medicamentoId?: string;
    cid10?: string[];
    ciap2?: string[];
  };
}

export interface PersonalizedRecommendations {
  basedOnHistory: Recommendation[];
  basedOnPatterns: Recommendation[];
  basedOnCurrentSOAP: Recommendation[];
  all: Recommendation[];
}

const STORAGE_KEY = 'darwin-mfc-consultation-history';

/**
 * Salva consulta no histórico
 */
export function saveConsultationToHistory(soapData: SOAPData): string {
  const history = getConsultationHistory();
  const newId = `consult-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const consultation: ConsultationHistory = {
    id: newId,
    date: new Date().toISOString(),
    soapData,
    tags: extractTagsFromSOAP(soapData),
  };
  
  history.unshift(consultation); // Adiciona no início
  
  // Mantém apenas últimas 100 consultas
  const limitedHistory = history.slice(0, 100);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedHistory));
  } catch (error) {
    console.error('Erro ao salvar histórico:', error);
  }
  
  return newId;
}

/**
 * Recupera histórico de consultas
 */
export function getConsultationHistory(): ConsultationHistory[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const history = JSON.parse(stored) as ConsultationHistory[];
    // Validar estrutura básica
    return history.filter(h => h.id && h.date && h.soapData);
  } catch (error) {
    console.error('Erro ao recuperar histórico:', error);
    return [];
  }
}

/**
 * Remove consulta do histórico
 */
export function removeConsultationFromHistory(id: string): void {
  const history = getConsultationHistory();
  const filtered = history.filter(h => h.id !== id);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Erro ao remover consulta:', error);
  }
}

/**
 * Extrai tags relevantes do SOAP para categorização
 */
function extractTagsFromSOAP(soapData: SOAPData): string[] {
  const tags: string[] = [];
  
  // Extrai códigos
  if (soapData.avaliacao?.cid10) {
    tags.push(...soapData.avaliacao.cid10.map(c => `cid10:${c}`));
  }
  if (soapData.avaliacao?.ciap2) {
    tags.push(...soapData.avaliacao.ciap2.map(c => `ciap2:${c}`));
  }
  
  // Extrai categorias de hipóteses (usando NLP)
  if (soapData.subjetivo || soapData.objetivo?.exameFisico) {
    const fullText = [
      soapData.subjetivo || '',
      soapData.objetivo?.exameFisico || '',
      soapData.avaliacao?.hipoteses?.join(' ') || '',
    ].join(' ');
    
    if (fullText.trim().length > 10) {
      const analysis = analyzeFullSOAP({
        subjetivo: soapData.subjetivo || '',
        objetivo: soapData.objetivo?.exameFisico || '',
        avaliacao: soapData.avaliacao?.hipoteses?.join(' ') || '',
      });
      
      analysis.suggestedDiagnoses.slice(0, 3).forEach(item => {
        if (item.doenca.id) {
          tags.push(`diagnosis:${item.doenca.id}`);
          if (item.doenca.categoria) {
            tags.push(`category:${item.doenca.categoria}`);
          }
        }
      });
    }
  }
  
  return [...new Set(tags)];
}

/**
 * Analisa padrões no histórico de consultas
 */
function analyzeHistoryPatterns(history: ConsultationHistory[]): {
  frequentDiagnoses: Map<string, number>;
  frequentMedications: Map<string, number>;
  frequentCategories: Map<string, number>;
  coOccurrences: Map<string, Map<string, number>>; // diagnosis -> medication -> count
} {
  const frequentDiagnoses = new Map<string, number>();
  const frequentMedications = new Map<string, number>();
  const frequentCategories = new Map<string, number>();
  const coOccurrences = new Map<string, Map<string, number>>();
  
  history.forEach(consultation => {
    // Analisa diagnósticos
    const tags = consultation.tags || [];
    tags.forEach(tag => {
      if (tag.startsWith('diagnosis:')) {
        const diagnosisId = tag.replace('diagnosis:', '');
        frequentDiagnoses.set(diagnosisId, (frequentDiagnoses.get(diagnosisId) || 0) + 1);
      }
      if (tag.startsWith('category:')) {
        const category = tag.replace('category:', '');
        frequentCategories.set(category, (frequentCategories.get(category) || 0) + 1);
      }
    });
    
    // Analisa medicamentos prescritos
    consultation.soapData.plano?.prescricoes?.forEach(presc => {
      const medId = findMedicationIdByName(presc.medicamento);
      if (medId) {
        frequentMedications.set(medId, (frequentMedications.get(medId) || 0) + 1);
        
        // Co-ocorrências com diagnósticos
        tags.forEach(tag => {
          if (tag.startsWith('diagnosis:')) {
            const diagnosisId = tag.replace('diagnosis:', '');
            if (!coOccurrences.has(diagnosisId)) {
              coOccurrences.set(diagnosisId, new Map());
            }
            const medMap = coOccurrences.get(diagnosisId)!;
            medMap.set(medId, (medMap.get(medId) || 0) + 1);
          }
        });
      }
    });
  });
  
  return {
    frequentDiagnoses,
    frequentMedications,
    frequentCategories,
    coOccurrences,
  };
}

/**
 * Encontra ID de medicamento pelo nome
 */
function findMedicationIdByName(name: string): string | null {
  const normalized = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  for (const med of todosMedicamentos) {
    if (med.nomeGenerico.toLowerCase().includes(normalized) || 
        med.nomeGenerico.toLowerCase() === normalized) {
      return med.id;
    }
    if (med.nomesComerciais?.some(nc => nc.toLowerCase().includes(normalized))) {
      return med.id;
    }
  }
  
  return null;
}

/**
 * Gera recomendações baseadas no histórico
 */
function generateHistoryBasedRecommendations(
  history: ConsultationHistory[],
  currentSOAP?: Partial<SOAPData>
): Recommendation[] {
  if (history.length === 0) return [];
  
  const recommendations: Recommendation[] = [];
  const patterns = analyzeHistoryPatterns(history);
  
  // Top 5 diagnósticos mais frequentes
  const topDiagnoses = Array.from(patterns.frequentDiagnoses.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  topDiagnoses.forEach(([diagnosisId, count]) => {
    const doenca = todasDoencas.find(d => d.id === diagnosisId);
    if (doenca && doenca.titulo) {
      const frequency = count / history.length;
      if (frequency > 0.1) { // Pelo menos 10% das consultas
        recommendations.push({
          type: 'diagnosis',
          title: doenca.titulo,
          description: `Diagnóstico frequente em ${Math.round(frequency * 100)}% das consultas anteriores`,
          confidence: Math.min(frequency * 2, 0.9), // Normaliza para 0-0.9
          reason: `Apareceu em ${count} de ${history.length} consultas anteriores`,
          metadata: {
            doencaId: diagnosisId,
            cid10: doenca.cid10,
            ciap2: doenca.ciap2,
          },
        });
      }
    }
  });
  
  // Medicamentos frequentemente prescritos
  const topMedications = Array.from(patterns.frequentMedications.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  topMedications.forEach(([medId, count]) => {
    const medicamento = todosMedicamentos.find(m => m.id === medId);
    if (medicamento) {
      const frequency = count / history.length;
      if (frequency > 0.15) { // Pelo menos 15% das consultas
        recommendations.push({
          type: 'medication',
          title: medicamento.nomeGenerico,
          description: `Frequentemente prescrito (${Math.round(frequency * 100)}% das consultas)`,
          confidence: Math.min(frequency * 2, 0.85),
          reason: `Prescrito em ${count} de ${history.length} consultas anteriores`,
          metadata: {
            medicamentoId: medId,
          },
        });
      }
    }
  });
  
  return recommendations;
}

/**
 * Gera recomendações baseadas em padrões clínicos
 */
function generatePatternBasedRecommendations(
  currentSOAP: Partial<SOAPData>,
  history: ConsultationHistory[]
): Recommendation[] {
  const recommendations: Recommendation[] = [];
  
  if (!currentSOAP.avaliacao?.hipoteses || currentSOAP.avaliacao.hipoteses.length === 0) {
    return recommendations;
  }
  
  // Analisa co-ocorrências: quais medicamentos são frequentemente prescritos para este diagnóstico?
  const patterns = analyzeHistoryPatterns(history);
  const currentDiagnoses = new Set(
    currentSOAP.avaliacao.hipoteses
      .map(h => {
        const doenca = todasDoencas.find(d => d.titulo === h || d.id === h);
        return doenca?.id;
      })
      .filter(Boolean) as string[]
  );
  
  currentDiagnoses.forEach(diagnosisId => {
    const medMap = patterns.coOccurrences.get(diagnosisId);
    if (medMap) {
      const topMedications = Array.from(medMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
      
      topMedications.forEach(([medId, count]) => {
        const medicamento = todosMedicamentos.find(m => m.id === medId);
        const doenca = todasDoencas.find(d => d.id === diagnosisId);
        
        if (medicamento && doenca) {
          // Verifica se já está prescrito
          const alreadyPrescribed = currentSOAP.plano?.prescricoes?.some(
            p => findMedicationIdByName(p.medicamento) === medId
          );
          
          if (!alreadyPrescribed) {
            recommendations.push({
              type: 'medication',
              title: medicamento.nomeGenerico,
              description: `Frequentemente prescrito junto com ${doenca.titulo || diagnosisId}`,
              confidence: Math.min(count / Math.max(history.length * 0.1, 1), 0.8),
              reason: `Co-ocorre com ${doenca.titulo || diagnosisId} em ${count} consultas anteriores`,
              metadata: {
                medicamentoId: medId,
                doencaId: diagnosisId,
              },
            });
          }
        }
      });
    }
  });
  
  return recommendations;
}

/**
 * Gera recomendações baseadas na análise NLP do SOAP atual
 */
function generateNLPBasedRecommendations(currentSOAP: Partial<SOAPData>): Recommendation[] {
  const recommendations: Recommendation[] = [];
  
  if (!currentSOAP.subjetivo && !currentSOAP.objetivo?.exameFisico) {
    return recommendations;
  }
  
  const analysis = analyzeFullSOAP({
    subjetivo: currentSOAP.subjetivo || '',
    objetivo: currentSOAP.objetivo?.exameFisico || '',
    avaliacao: currentSOAP.avaliacao?.hipoteses?.join(' ') || '',
  });
  
  // Sugere exames baseado em diagnósticos
  analysis.suggestedDiagnoses.slice(0, 5).forEach(item => {
    if (item.doenca.id && item.confidence > 0.5) {
      // Verifica se já está nas hipóteses
      const alreadyInHypotheses = currentSOAP.avaliacao?.hipoteses?.some(
        h => h === item.doenca.titulo || h === item.doenca.id
      );
      
      if (!alreadyInHypotheses) {
        recommendations.push({
          type: 'diagnosis',
          title: item.doenca.titulo || item.doenca.id || 'Diagnóstico sugerido',
          description: `Sugerido com base em sintomas mencionados${item.matchedTerms && item.matchedTerms.length > 0 ? ` (${item.matchedTerms.slice(0, 2).join(', ')})` : ''}`,
          confidence: item.confidence,
          reason: item.matchedTerms && item.matchedTerms.length > 0 ? `Mencionado: ${item.matchedTerms.join(', ')}` : 'Análise NLP do texto',
          metadata: {
            doencaId: item.doenca.id,
            cid10: item.doenca.cid10,
            ciap2: item.doenca.ciap2,
          },
        });
      }
    }
  });
  
  // TODO: Sugere exames baseado em diagnósticos
  // (isso pode ser expandido com lógica específica por doença)
  
  return recommendations;
}

/**
 * Gera recomendações de retorno baseadas em padrões
 */
function generateFollowupRecommendations(
  currentSOAP: Partial<SOAPData>,
  history: ConsultationHistory[]
): Recommendation[] {
  const recommendations: Recommendation[] = [];
  
  if (!currentSOAP.avaliacao?.hipoteses || currentSOAP.avaliacao.hipoteses.length === 0) {
    return recommendations;
  }
  
  // Sugere retorno baseado em diagnósticos crônicos
  const chronicDiseases = currentSOAP.avaliacao.hipoteses
    .map(h => todasDoencas.find(d => d.titulo === h || d.id === h))
    .filter(d => d && isChronicDisease(d));
  
  chronicDiseases.forEach(doenca => {
    if (doenca?.id) {
      recommendations.push({
        type: 'followup',
        title: `Retorno para ${doenca.titulo || doenca.id}`,
        description: 'Condição crônica requer acompanhamento regular',
        confidence: 0.8,
        reason: 'Doença crônica identificada',
        metadata: {
          doencaId: doenca.id,
        },
      });
    }
  });
  
  return recommendations;
}

/**
 * Verifica se doença é crônica (heurística simples)
 */
function isChronicDisease(doenca: Partial<Doenca> | undefined): boolean {
  if (!doenca) return false;
  const chronicKeywords = ['crônico', 'crônica', 'diabetes', 'hipertensão', 'asma', 'dpoc', 'artrite', 'obesidade'];
  const title = (doenca.titulo || '').toLowerCase();
  const tags = (doenca.tags || []).map(t => t.toLowerCase());
  
  return chronicKeywords.some(keyword => 
    title.includes(keyword) || tags.some(t => t.includes(keyword))
  );
}

/**
 * Gera todas as recomendações personalizadas
 */
export function generatePersonalizedRecommendations(
  currentSOAP?: Partial<SOAPData>
): PersonalizedRecommendations {
  const history = getConsultationHistory();
  
  const basedOnHistory = currentSOAP 
    ? generateHistoryBasedRecommendations(history, currentSOAP)
    : [];
  
  const basedOnPatterns = currentSOAP
    ? generatePatternBasedRecommendations(currentSOAP, history)
    : [];
  
  const basedOnCurrentSOAP = currentSOAP
    ? generateNLPBasedRecommendations(currentSOAP)
    : [];
  
  const followupRecommendations = currentSOAP
    ? generateFollowupRecommendations(currentSOAP, history)
    : [];
  
  // Consolida e ordena todas as recomendações por confiança
  const all = [
    ...basedOnHistory,
    ...basedOnPatterns,
    ...basedOnCurrentSOAP,
    ...followupRecommendations,
  ]
    .filter((rec, index, self) => 
      // Remove duplicatas (mesmo tipo e título)
      index === self.findIndex(r => r.type === rec.type && r.title === rec.title)
    )
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 15); // Limita a 15 recomendações
  
  return {
    basedOnHistory: basedOnHistory.slice(0, 5),
    basedOnPatterns: basedOnPatterns.slice(0, 5),
    basedOnCurrentSOAP: basedOnCurrentSOAP.slice(0, 5),
    all,
  };
}

/**
 * Obtém estatísticas do histórico
 */
export function getHistoryStatistics(): {
  totalConsultations: number;
  uniqueDiagnoses: number;
  uniqueMedications: number;
  mostFrequentCategory: string | null;
  dateRange: { first: string; last: string } | null;
} {
  const history = getConsultationHistory();
  
  if (history.length === 0) {
    return {
      totalConsultations: 0,
      uniqueDiagnoses: 0,
      uniqueMedications: 0,
      mostFrequentCategory: null,
      dateRange: null,
    };
  }
  
  const diagnoses = new Set<string>();
  const medications = new Set<string>();
  const categories = new Map<string, number>();
  const dates = history.map(h => h.date).sort();
  
  history.forEach(consultation => {
    consultation.tags?.forEach(tag => {
      if (tag.startsWith('diagnosis:')) {
        diagnoses.add(tag.replace('diagnosis:', ''));
      }
      if (tag.startsWith('category:')) {
        const category = tag.replace('category:', '');
        categories.set(category, (categories.get(category) || 0) + 1);
      }
    });
    
    consultation.soapData.plano?.prescricoes?.forEach(presc => {
      const medId = findMedicationIdByName(presc.medicamento);
      if (medId) medications.add(medId);
    });
  });
  
  const mostFrequentCategory = Array.from(categories.entries())
    .sort((a, b) => b[1] - a[1])[0]?.[0] || null;
  
  return {
    totalConsultations: history.length,
    uniqueDiagnoses: diagnoses.size,
    uniqueMedications: medications.size,
    mostFrequentCategory,
    dateRange: dates.length > 0 ? {
      first: dates[0],
      last: dates[dates.length - 1],
    } : null,
  };
}

