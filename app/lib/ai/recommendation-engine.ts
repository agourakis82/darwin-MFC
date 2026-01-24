/**
 * Recommendation Engine - Personalized medical content suggestions
 * Phase 2: Intelligence Layer
 */

export interface RecommendationContext {
  recentlyViewed?: string[];
  currentDiagnosis?: string;
  userSpecialty?: string;
  recentSearches?: string[];
  visitHistory?: string[];
}

export interface RecommendationResult {
  id: string;
  title: string;
  description: string;
  category: string;
  relevanceScore: number;
  type: 'related' | 'trending' | 'personalized' | 'alert';
}

/**
 * Generate personalized recommendations based on user context
 */
export function generateRecommendations(
  context: RecommendationContext,
  availableContent: { id: string; title: string; category: string }[]
): RecommendationResult[] {
  const recommendations: RecommendationResult[] = [];

  // Related content based on recent view
  if (context.currentDiagnosis) {
    const related = availableContent.filter(
      (content) =>
        content.title.toLowerCase().includes(context.currentDiagnosis!.toLowerCase()) &&
        content.id !== context.currentDiagnosis
    );

    related.forEach((content) => {
      recommendations.push({
        id: `related-${content.id}`,
        title: content.title,
        description: `Related to ${context.currentDiagnosis}`,
        category: content.category,
        relevanceScore: 0.85,
        type: 'related',
      });
    });
  }

  // Personalized based on specialty
  if (context.userSpecialty) {
    const specialty = availableContent.filter((content) =>
      content.category.toLowerCase().includes(context.userSpecialty!.toLowerCase())
    );

    specialty.slice(0, 3).forEach((content) => {
      recommendations.push({
        id: `specialty-${content.id}`,
        title: content.title,
        description: `Relevant to ${context.userSpecialty}`,
        category: content.category,
        relevanceScore: 0.75,
        type: 'personalized',
      });
    });
  }

  return recommendations.slice(0, 5);
}

/**
 * Get trending topics based on aggregate data
 */
export function getTrendingTopics(): string[] {
  // In production, this would pull from analytics
  return [
    'COVID-19 Vaccination Updates',
    'Hypertension Management 2025',
    'New Diabetes Guidelines',
    'Antibiotic Resistance',
    'Mental Health Screening',
  ];
}

/**
 * Find semantically related topics
 */
export function findRelatedTopics(query: string): string[] {
  const relationMap: Record<string, string[]> = {
    diabetes: ['hypertension', 'kidney disease', 'neuropathy', 'retinopathy'],
    hypertension: ['diabetes', 'heart disease', 'stroke', 'kidney disease'],
    'heart disease': ['hypertension', 'diabetes', 'cholesterol', 'arrhythmia'],
    depression: ['anxiety', 'bipolar disorder', 'trauma', 'substance abuse'],
    anxiety: ['depression', 'panic disorder', 'ocd', 'ptsd'],
  };

  const lower = query.toLowerCase();
  for (const [key, related] of Object.entries(relationMap)) {
    if (lower.includes(key)) {
      return related;
    }
  }

  return [];
}

export default {
  generateRecommendations,
  getTrendingTopics,
  findRelatedTopics,
};
