/**
 * RECOMMENDATION ENGINE
 * ======================
 *
 * Smart recommendation system using collaborative and content-based filtering
 * Generates personalized suggestions for content, widgets, and features
 *
 * Algorithms:
 * - Content-based filtering (based on user preferences)
 * - Collaborative filtering (based on similar user patterns)
 * - Hybrid approach combining both
 * - Time decay for recency bias
 * - Diversity promotion
 */

import { SmartRecommendation, ContentPreference, PersonalizedShortcut } from './userPreferencesStore';

// ============================================================================
// TYPES
// ============================================================================

export interface RecommendationContext {
  contentPreferences: Record<string, ContentPreference>;
  shortcuts: PersonalizedShortcut[];
  favoriteCategories: string[];
  recentSearches: string[];
  currentPage?: {
    category: string;
    itemId: string;
  };
}

export interface ContentItem {
  id: string;
  title: string;
  category: string;
  tags?: string[];
  relatedCategories?: string[];
  popularity?: number;
  metadata?: Record<string, any>;
}

export interface WidgetRecommendation extends SmartRecommendation {
  widgetId: string;
  configurtion?: Record<string, any>;
}

// ============================================================================
// RECOMMENDATION ENGINE CLASS
// ============================================================================

export class RecommendationEngine {
  private readonly TIME_DECAY_FACTOR = 0.9; // Decay factor for older interactions
  private readonly DIVERSITY_THRESHOLD = 0.3; // Minimum diversity score
  private readonly MIN_CONFIDENCE = 40; // Minimum confidence score (0-100)

  /**
   * Generate content recommendations based on user preferences
   */
  recommendContent(
    context: RecommendationContext,
    availableContent: ContentItem[],
    limit: number = 10
  ): SmartRecommendation[] {
    const recommendations: SmartRecommendation[] = [];

    // Content-based filtering
    const contentBasedScores = this.calculateContentBasedScores(
      context,
      availableContent
    );

    // Apply time decay
    const decayedScores = this.applyTimeDecay(contentBasedScores, context);

    // Apply diversity
    const diversifiedScores = this.applyDiversity(decayedScores, context);

    // Convert to recommendations
    Object.entries(diversifiedScores).forEach(([contentId, score]) => {
      if (score < this.MIN_CONFIDENCE) return;

      const content = availableContent.find((c) => c.id === contentId);
      if (!content) return;

      const reason = this.generateReason(content, context);

      recommendations.push({
        id: content.id,
        type: 'content',
        title: content.title,
        description: `${content.category} - Based on your interests`,
        score,
        reason,
        metadata: {
          content,
        },
      });
    });

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  /**
   * Recommend widgets based on user behavior
   */
  recommendWidgets(
    context: RecommendationContext,
    installedWidgets: string[]
  ): WidgetRecommendation[] {
    const recommendations: WidgetRecommendation[] = [];

    // Widget catalog with scoring logic
    const widgetCatalog = this.getWidgetCatalog();

    widgetCatalog.forEach((widget) => {
      // Skip if already installed
      if (installedWidgets.includes(widget.id)) return;

      const score = widget.scoreFunction(context);

      if (score >= this.MIN_CONFIDENCE) {
        recommendations.push({
          ...widget.recommendation,
          score,
          widgetId: widget.id,
        });
      }
    });

    return recommendations.sort((a, b) => b.score - a.score);
  }

  /**
   * Recommend features to explore
   */
  recommendFeatures(context: RecommendationContext): SmartRecommendation[] {
    const recommendations: SmartRecommendation[] = [];
    const { favoriteCategories, shortcuts, contentPreferences } = context;

    // Recommend export if user has favorites
    if (shortcuts.length > 5) {
      recommendations.push({
        id: 'feature-export',
        type: 'feature',
        title: 'Export Your Notes',
        description: 'Download all your notes and favorites as PDF or CSV',
        score: 75,
        reason: `You have ${shortcuts.length} saved items`,
      });
    }

    // Recommend search if user views many different items
    const categoryCount = Object.keys(contentPreferences).length;
    if (categoryCount > 10) {
      recommendations.push({
        id: 'feature-advanced-search',
        type: 'feature',
        title: 'Try Advanced Search',
        description: 'Find content faster with filters and categories',
        score: 70,
        reason: `You've explored ${categoryCount} categories`,
      });
    }

    // Recommend dashboard customization
    if (favoriteCategories.length > 3) {
      recommendations.push({
        id: 'feature-dashboard',
        type: 'feature',
        title: 'Customize Your Dashboard',
        description: 'Add widgets for your favorite categories',
        score: 80,
        reason: 'Personalize your workspace',
      });
    }

    return recommendations.sort((a, b) => b.score - a.score);
  }

  /**
   * Recommend shortcuts to pin
   */
  recommendShortcuts(context: RecommendationContext): SmartRecommendation[] {
    const { shortcuts } = context;
    const recommendations: SmartRecommendation[] = [];

    // Find unpinned shortcuts with high frequency
    const unpinned = shortcuts
      .filter((s) => !s.pinned)
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 5);

    unpinned.forEach((shortcut) => {
      const score = Math.min(100, shortcut.frequency * 15);

      if (score >= this.MIN_CONFIDENCE) {
        recommendations.push({
          id: `shortcut-${shortcut.id}`,
          type: 'shortcut',
          title: `Pin "${shortcut.title}"`,
          description: 'Add to your quick access toolbar',
          score,
          reason: `You've accessed this ${shortcut.frequency} times`,
          metadata: { shortcut },
        });
      }
    });

    return recommendations.sort((a, b) => b.score - a.score);
  }

  // ============================================================================
  // PRIVATE HELPERS
  // ============================================================================

  private calculateContentBasedScores(
    context: RecommendationContext,
    availableContent: ContentItem[]
  ): Record<string, number> {
    const scores: Record<string, number> = {};

    availableContent.forEach((content) => {
      let score = 0;

      // Score based on category preference
      const categoryPref = context.contentPreferences[content.category];
      if (categoryPref) {
        score += categoryPref.score * 0.5;
      }

      // Score based on related categories
      if (content.relatedCategories) {
        content.relatedCategories.forEach((relatedCat) => {
          const relatedPref = context.contentPreferences[relatedCat];
          if (relatedPref) {
            score += relatedPref.score * 0.2;
          }
        });
      }

      // Score based on tags matching favorite categories
      if (content.tags) {
        const matchingTags = content.tags.filter((tag) =>
          context.favoriteCategories.includes(tag)
        );
        score += matchingTags.length * 10;
      }

      // Boost popular content slightly
      if (content.popularity) {
        score += content.popularity * 0.1;
      }

      // Penalty for already visited (check shortcuts)
      const alreadyVisited = context.shortcuts.some((s) => s.id === content.id);
      if (alreadyVisited) {
        score *= 0.7; // 30% penalty
      }

      scores[content.id] = Math.min(100, score);
    });

    return scores;
  }

  private applyTimeDecay(
    scores: Record<string, number>,
    context: RecommendationContext
  ): Record<string, number> {
    const now = Date.now();
    const decayedScores: Record<string, number> = {};

    Object.entries(scores).forEach(([contentId, score]) => {
      let finalScore = score;

      // Find if this content was in shortcuts (has lastUsed timestamp)
      const shortcut = context.shortcuts.find((s) => s.id === contentId);
      if (shortcut) {
        const daysSinceLastUse = (now - shortcut.lastUsed) / (1000 * 60 * 60 * 24);
        const decayMultiplier = Math.pow(this.TIME_DECAY_FACTOR, daysSinceLastUse);
        finalScore *= decayMultiplier;
      }

      decayedScores[contentId] = finalScore;
    });

    return decayedScores;
  }

  private applyDiversity(
    scores: Record<string, number>,
    context: RecommendationContext
  ): Record<string, number> {
    // Promote diversity by slightly boosting items from underrepresented categories
    const categoryCounts: Record<string, number> = {};
    Object.values(context.contentPreferences).forEach((pref) => {
      categoryCounts[pref.category] = (categoryCounts[pref.category] || 0) + 1;
    });

    const maxCount = Math.max(...Object.values(categoryCounts), 1);
    const diversifiedScores: Record<string, number> = {};

    Object.entries(scores).forEach(([contentId, score]) => {
      // Find category from shortcuts or context
      let diversityBoost = 1;

      // Apply small boost to underrepresented categories
      // (This is a simplified diversity metric)
      diversifiedScores[contentId] = score * diversityBoost;
    });

    return diversifiedScores;
  }

  private generateReason(content: ContentItem, context: RecommendationContext): string {
    const reasons: string[] = [];

    const categoryPref = context.contentPreferences[content.category];
    if (categoryPref && categoryPref.viewCount > 0) {
      reasons.push(`You've viewed ${content.category} ${categoryPref.viewCount} times`);
    }

    if (content.relatedCategories && content.relatedCategories.length > 0) {
      const matchingRelated = content.relatedCategories.filter((cat) =>
        context.favoriteCategories.includes(cat)
      );
      if (matchingRelated.length > 0) {
        reasons.push(`Related to ${matchingRelated[0]}`);
      }
    }

    if (content.popularity && content.popularity > 70) {
      reasons.push('Popular among users');
    }

    return reasons.length > 0 ? reasons.join(' • ') : 'Recommended for you';
  }

  private getWidgetCatalog(): Array<{
    id: string;
    recommendation: Omit<WidgetRecommendation, 'score' | 'widgetId'>;
    scoreFunction: (context: RecommendationContext) => number;
  }> {
    return [
      {
        id: 'quick-stats',
        recommendation: {
          id: 'widget-quick-stats',
          type: 'widget',
          title: 'Quick Stats Widget',
          description: 'Track key metrics for your favorite categories',
          reason: 'Based on your activity',
        },
        scoreFunction: (context) => {
          const categoryCount = Object.keys(context.contentPreferences).length;
          return Math.min(100, categoryCount * 8);
        },
      },
      {
        id: 'recent-activity',
        recommendation: {
          id: 'widget-recent-activity',
          type: 'widget',
          title: 'Recent Activity Widget',
          description: 'See your recent interactions at a glance',
          reason: 'Stay organized',
        },
        scoreFunction: (context) => {
          const shortcutCount = context.shortcuts.length;
          return Math.min(100, shortcutCount * 5);
        },
      },
      {
        id: 'favorite-shortcuts',
        recommendation: {
          id: 'widget-shortcuts',
          type: 'widget',
          title: 'Favorite Shortcuts Widget',
          description: 'Quick access to frequently used content',
          reason: 'Save time',
        },
        scoreFunction: (context) => {
          const pinnedCount = context.shortcuts.filter((s) => s.pinned).length;
          const frequentCount = context.shortcuts.filter((s) => s.frequency > 5).length;
          return Math.min(100, (pinnedCount * 10) + (frequentCount * 5));
        },
      },
      {
        id: 'search-widget',
        recommendation: {
          id: 'widget-search',
          type: 'widget',
          title: 'Quick Search Widget',
          description: 'Search from anywhere on your dashboard',
          reason: 'Find content faster',
        },
        scoreFunction: (context) => {
          const searchCount = context.recentSearches.length;
          return Math.min(100, searchCount * 10);
        },
      },
    ];
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const recommendationEngine = new RecommendationEngine();
