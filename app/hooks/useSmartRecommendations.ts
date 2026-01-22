'use client';

import { useState, useCallback, useMemo } from 'react';
import { Recommendation } from '@/app/components/intelligence';

export interface UseSmartRecommendationsOptions {
  currentDiagnosis?: string;
  recentlyViewed?: string[];
  userSpecialty?: string;
  recentSearches?: string[];
}

export function useSmartRecommendations(options: UseSmartRecommendationsOptions = {}) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  // Mock content for demo
  const mockContent = useMemo(
    () => [
      { id: 'hypertension-guide', title: 'Hypertension Management Guide 2025', category: 'Cardiovascular' },
      { id: 'diabetes-protocols', title: 'Diabetes Care Protocols', category: 'Endocrinology' },
      { id: 'heart-failure', title: 'Heart Failure Treatment', category: 'Cardiology' },
      { id: 'copd-management', title: 'COPD Management Guidelines', category: 'Respiratory' },
      { id: 'stroke-prevention', title: 'Stroke Prevention Strategies', category: 'Neurology' },
      { id: 'pneumonia-treatment', title: 'Community-Acquired Pneumonia', category: 'Infectious Diseases' },
    ],
    []
  );

  const recommendations = useMemo(() => {
    // Filter related content
    const related = mockContent
      .filter(
        (content) =>
          options.currentDiagnosis &&
          content.title.toLowerCase().includes(options.currentDiagnosis.toLowerCase()) &&
          content.id !== options.currentDiagnosis
      )
      .map((content) => ({
        id: `related-${content.id}`,
        title: content.title,
        description: `Related to ${options.currentDiagnosis}`,
        category: content.category,
        relevanceScore: 0.85,
        type: 'related' as const,
      }));

    // Add trending
    const trendingTopics = [
      'COVID-19 Vaccination Updates',
      'Hypertension Management 2025',
      'New Diabetes Guidelines',
      'Antibiotic Resistance',
      'Mental Health Screening',
    ];

    const trending = trendingTopics.map((topic: string, idx: number) => ({
      id: `trending-${idx}`,
      title: topic,
      description: 'Trending in medical literature',
      category: 'Trending',
      relevanceScore: 0.6,
      type: 'trending' as const,
    }));

    // Personalized based on specialty
    const personalized =
      options.userSpecialty && mockContent.length > 0
        ? mockContent
            .filter((content: any) =>
              content.category.toLowerCase().includes(options.userSpecialty!.toLowerCase())
            )
            .slice(0, 2)
            .map((content: any) => ({
              id: `specialty-${content.id}`,
              title: content.title,
              description: `Relevant to ${options.userSpecialty}`,
              category: content.category,
              relevanceScore: 0.75,
              type: 'personalized' as const,
            }))
        : [];

    return [...related, ...trending, ...personalized].filter((r) => !dismissed.has(r.id));
  }, [options, mockContent, dismissed]);

  const handleDismiss = useCallback((id: string) => {
    setDismissed((prev) => new Set([...prev, id]));
  }, []);

  const handleResetDismissed = useCallback(() => {
    setDismissed(new Set());
  }, []);

  return {
    recommendations,
    onDismiss: handleDismiss,
    onReset: handleResetDismissed,
  };
}

export default useSmartRecommendations;
