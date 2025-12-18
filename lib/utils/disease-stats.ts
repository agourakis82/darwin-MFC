/**
 * Estatísticas e Agregações de Doenças
 * Para uso em gráficos e dashboards
 */

import type { Doenca } from '@/lib/types/doenca';
import { doencasConsolidadas } from '@/lib/data/doencas/index';

export interface DiseaseCategoryStats {
  category: string;
  count: number;
  percentage: number;
  diseases: Partial<Doenca>[];
}

export interface DiseasePrevalenceData {
  diseaseId: string;
  diseaseName: string;
  category: string;
  prevalence?: string; // String formatada (ex: "2.5%", "1 em 1000")
  estimatedPrevalence?: number; // Número para cálculos (0-1 ou porcentagem)
}

export interface DiseaseTrendData {
  year: number;
  diseaseId: string;
  diseaseName: string;
  incidence?: number;
  prevalence?: number;
  mortality?: number;
}

/**
 * Calcula estatísticas por categoria
 */
export function getDiseaseCategoryStats(diseases: Partial<Doenca>[] = doencasConsolidadas): DiseaseCategoryStats[] {
  const categoryMap = new Map<string, Partial<Doenca>[]>();

  diseases.forEach(disease => {
    if (disease.categoria) {
      const current = categoryMap.get(disease.categoria) || [];
      current.push(disease);
      categoryMap.set(disease.categoria, current);
    }
  });

  const total = diseases.length;
  const stats: DiseaseCategoryStats[] = [];

  categoryMap.forEach((diseases, category) => {
    stats.push({
      category,
      count: diseases.length,
      percentage: total > 0 ? (diseases.length / total) * 100 : 0,
      diseases,
    });
  });

  return stats.sort((a, b) => b.count - a.count);
}

/**
 * Extrai dados de prevalência de doenças (quando disponível)
 */
export function extractPrevalenceData(diseases: Partial<Doenca>[]): DiseasePrevalenceData[] {
  const data: DiseasePrevalenceData[] = [];

  diseases.forEach(disease => {
    if (disease.fullContent?.epidemiologia?.prevalencia) {
      // Tenta extrair número da string de prevalência
      const prevalenceText = disease.fullContent.epidemiologia.prevalencia;
      const numberMatch = prevalenceText.match(/([\d,\.]+)/);
      let estimatedPrevalence: number | undefined;

      if (numberMatch) {
        const number = parseFloat(numberMatch[1].replace(',', '.'));
        if (prevalenceText.includes('%')) {
          estimatedPrevalence = number; // Já é porcentagem
        } else if (prevalenceText.includes('em') || prevalenceText.includes('/')) {
          // Formato "1 em 1000" ou "1/1000"
          const parts = prevalenceText.match(/(\d+)\s*(?:em|\/)\s*(\d+)/);
          if (parts) {
            estimatedPrevalence = (parseFloat(parts[1]) / parseFloat(parts[2])) * 100;
          }
        } else {
          estimatedPrevalence = number; // Assume porcentagem
        }
      }

      data.push({
        diseaseId: disease.id || '',
        diseaseName: disease.titulo || disease.id || '',
        category: disease.categoria || '',
        prevalence: prevalenceText,
        estimatedPrevalence,
      });
    }
  });

  return data.sort((a, b) => (b.estimatedPrevalence || 0) - (a.estimatedPrevalence || 0));
}

/**
 * Agrupa doenças por CID-10 (primeiro nível)
 */
export function groupDiseasesByCID10FirstLevel(diseases: Partial<Doenca>[]): Map<string, Partial<Doenca>[]> {
  const groups = new Map<string, Partial<Doenca>[]>();

  diseases.forEach(disease => {
    if (disease.cid10 && disease.cid10.length > 0) {
      disease.cid10.forEach(cid => {
        // Primeira letra do CID-10 (ex: "A" de "A00-B99")
        const firstLetter = cid.charAt(0).toUpperCase();
        const current = groups.get(firstLetter) || [];
        current.push(disease);
        groups.set(firstLetter, current);
      });
    }
  });

  return groups;
}

/**
 * Mapeamento de letras CID-10 para categorias
 */
export const CID10_CATEGORIES: Record<string, string> = {
  'A': 'Doenças Infecciosas e Parasitárias',
  'B': 'Algumas Doenças Infecciosas e Parasitárias',
  'C': 'Neoplasias (Tumores)',
  'D': 'Doenças do Sangue e Órgãos Hematopoéticos',
  'E': 'Doenças Endócrinas, Nutricionais e Metabólicas',
  'F': 'Transtornos Mentais e Comportamentais',
  'G': 'Doenças do Sistema Nervoso',
  'H': 'Doenças do Olho e Anexos / Ouvido',
  'I': 'Doenças do Aparelho Circulatório',
  'J': 'Doenças do Aparelho Respiratório',
  'K': 'Doenças do Aparelho Digestivo',
  'L': 'Doenças da Pele e Tecido Subcutâneo',
  'M': 'Doenças do Sistema Osteomuscular',
  'N': 'Doenças do Aparelho Geniturinário',
  'O': 'Gravidez, Parto e Puerpério',
  'P': 'Algumas Afecções Originadas no Período Perinatal',
  'Q': 'Malformações Congênitas',
  'R': 'Sintomas, Sinais e Achados Anormais',
  'S': 'Lesões e Envenenamentos',
  'T': 'Lesões e Envenenamentos (continuidade)',
  'U': 'Códigos para Situações Especiais',
  'V': 'Causas Externas de Morbidade',
  'W': 'Causas Externas de Morbidade (continuidade)',
  'X': 'Causas Externas de Morbidade (continuidade)',
  'Y': 'Causas Externas de Morbidade (continuidade)',
  'Z': 'Fatores que Influenciam o Estado de Saúde',
};

/**
 * Calcula distribuição por CID-10 (primeiro nível)
 */
export function getCID10Distribution(diseases: Partial<Doenca>[]): Array<{
  category: string;
  categoryName: string;
  count: number;
  percentage: number;
}> {
  const groups = groupDiseasesByCID10FirstLevel(diseases);
  const total = diseases.length;
  const distribution: Array<{
    category: string;
    categoryName: string;
    count: number;
    percentage: number;
  }> = [];

  groups.forEach((diseaseList, letter) => {
    // Remove duplicatas (mesma doença pode ter múltiplos CID-10)
    const uniqueDiseases = Array.from(
      new Map(diseaseList.map(d => [d.id, d])).values()
    );

    distribution.push({
      category: letter,
      categoryName: CID10_CATEGORIES[letter] || `Categoria ${letter}`,
      count: uniqueDiseases.length,
      percentage: total > 0 ? (uniqueDiseases.length / total) * 100 : 0,
    });
  });

  return distribution.sort((a, b) => b.count - a.count);
}

/**
 * Top N doenças por categoria
 */
export function getTopDiseasesByCategory(
  category: string,
  limit: number = 10,
  diseases: Partial<Doenca>[] = doencasConsolidadas
): Partial<Doenca>[] {
  return diseases
    .filter(d => d.categoria === category)
    .slice(0, limit);
}

/**
 * Doenças mais comuns (baseado em prevalência estimada quando disponível)
 */
export function getMostCommonDiseases(
  limit: number = 10,
  diseases: Partial<Doenca>[] = doencasConsolidadas
): DiseasePrevalenceData[] {
  const prevalenceData = extractPrevalenceData(diseases);
  return prevalenceData.slice(0, limit);
}

/**
 * Estatísticas gerais
 */
export function getDiseaseStatistics(diseases: Partial<Doenca>[] = doencasConsolidadas): {
  total: number;
  byCategory: DiseaseCategoryStats[];
  byCID10: Array<{ category: string; categoryName: string; count: number; percentage: number }>;
  withPrevalence: number;
  withCID10: number;
  withCIAP2: number;
} {
  const byCategory = getDiseaseCategoryStats(diseases);
  const byCID10 = getCID10Distribution(diseases);
  const prevalenceData = extractPrevalenceData(diseases);
  
  const withCID10 = diseases.filter(d => d.cid10 && d.cid10.length > 0).length;
  const withCIAP2 = diseases.filter(d => d.ciap2 && d.ciap2.length > 0).length;

  return {
    total: diseases.length,
    byCategory,
    byCID10,
    withPrevalence: prevalenceData.length,
    withCID10,
    withCIAP2,
  };
}

