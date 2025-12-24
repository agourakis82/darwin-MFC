/**
 * USER PREFERENCES STORE
 * =======================
 *
 * Zustand store for user preferences and personalization data
 * Tracks behavior, learns patterns, and adapts the UI
 *
 * Features:
 * - Preference learning from user interactions
 * - Usage pattern tracking
 * - Content recommendations
 * - Personalized shortcuts
 * - Analytics data collection
 * - Privacy-first (100% local storage)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ============================================================================
// TYPES
// ============================================================================

export interface UserInteraction {
  type: 'view' | 'click' | 'search' | 'favorite' | 'note' | 'navigate';
  category: string;
  itemId: string;
  itemTitle?: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface ContentPreference {
  category: string;
  score: number; // 0-100, higher = more interested
  viewCount: number;
  lastViewed: number;
  avgTimeSpent?: number; // seconds
}

export interface PersonalizedShortcut {
  id: string;
  type: 'disease' | 'medication' | 'protocol' | 'calculator' | 'screening';
  title: string;
  url: string;
  category: string;
  frequency: number;
  lastUsed: number;
  pinned?: boolean;
}

export interface UsagePattern {
  mostActiveHours: number[]; // Hours of day (0-23)
  mostActiveWeekdays: number[]; // Days of week (0-6)
  averageSessionDuration: number; // minutes
  totalSessions: number;
  favoriteCategories: string[];
  searchQueries: string[];
}

export interface SmartRecommendation {
  id: string;
  type: 'content' | 'widget' | 'feature' | 'shortcut';
  title: string;
  description: string;
  score: number; // 0-100, confidence score
  reason: string;
  metadata?: Record<string, any>;
}

interface UserPreferencesState {
  // Interaction tracking
  interactions: UserInteraction[];
  maxInteractions: number;

  // Content preferences (learned from behavior)
  contentPreferences: Record<string, ContentPreference>;

  // Personalized shortcuts
  shortcuts: PersonalizedShortcut[];
  maxShortcuts: number;

  // Usage patterns
  usagePattern: UsagePattern;

  // UI preferences
  preferredLayout: 'clinical' | 'analytics' | 'minimal' | 'custom';
  preferredWidgets: string[];
  hiddenCategories: string[];

  // Learning settings
  learningEnabled: boolean;
  recommendationsEnabled: boolean;

  // Actions
  trackInteraction: (interaction: Omit<UserInteraction, 'timestamp'>) => void;
  updateContentPreference: (category: string, viewed: boolean, timeSpent?: number) => void;
  addShortcut: (shortcut: Omit<PersonalizedShortcut, 'frequency' | 'lastUsed'>) => void;
  removeShortcut: (id: string) => void;
  pinShortcut: (id: string, pinned: boolean) => void;
  updateUsagePattern: () => void;
  setPreferredLayout: (layout: UserPreferencesState['preferredLayout']) => void;
  toggleCategory: (category: string) => void;
  getRecommendations: () => SmartRecommendation[];
  getTopShortcuts: (limit?: number) => PersonalizedShortcut[];
  clearAllData: () => void;
  toggleLearning: (enabled: boolean) => void;
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState = {
  interactions: [],
  maxInteractions: 1000,
  contentPreferences: {},
  shortcuts: [],
  maxShortcuts: 20,
  usagePattern: {
    mostActiveHours: [],
    mostActiveWeekdays: [],
    averageSessionDuration: 0,
    totalSessions: 0,
    favoriteCategories: [],
    searchQueries: [],
  },
  preferredLayout: 'clinical' as const,
  preferredWidgets: [],
  hiddenCategories: [],
  learningEnabled: true,
  recommendationsEnabled: true,
};

// ============================================================================
// STORE
// ============================================================================

export const useUserPreferences = create<UserPreferencesState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Track user interaction
      trackInteraction: (interaction) => {
        const state = get();
        if (!state.learningEnabled) return;

        const newInteraction: UserInteraction = {
          ...interaction,
          timestamp: Date.now(),
        };

        set((state) => ({
          interactions: [
            newInteraction,
            ...state.interactions.slice(0, state.maxInteractions - 1),
          ],
        }));

        // Auto-update shortcuts for click/view interactions
        if (
          interaction.type === 'click' ||
          interaction.type === 'view' ||
          interaction.type === 'navigate'
        ) {
          get().addShortcut({
            id: interaction.itemId,
            type: interaction.category as any,
            title: interaction.itemTitle || interaction.itemId,
            url: interaction.metadata?.url || `/${interaction.category}/${interaction.itemId}`,
            category: interaction.category,
          });
        }
      },

      // Update content preference
      updateContentPreference: (category, viewed, timeSpent) => {
        set((state) => {
          const existing = state.contentPreferences[category];

          if (existing) {
            const newViewCount = viewed ? existing.viewCount + 1 : existing.viewCount;
            const newScore = Math.min(
              100,
              existing.score + (viewed ? 5 : 0) + (timeSpent && timeSpent > 30 ? 10 : 0)
            );

            return {
              contentPreferences: {
                ...state.contentPreferences,
                [category]: {
                  ...existing,
                  score: newScore,
                  viewCount: newViewCount,
                  lastViewed: Date.now(),
                  avgTimeSpent: timeSpent
                    ? (existing.avgTimeSpent || 0) * 0.7 + timeSpent * 0.3
                    : existing.avgTimeSpent,
                },
              },
            };
          } else {
            return {
              contentPreferences: {
                ...state.contentPreferences,
                [category]: {
                  category,
                  score: viewed ? 5 : 0,
                  viewCount: viewed ? 1 : 0,
                  lastViewed: Date.now(),
                  avgTimeSpent: timeSpent,
                },
              },
            };
          }
        });
      },

      // Add or update shortcut
      addShortcut: (shortcut) => {
        set((state) => {
          const existing = state.shortcuts.find((s) => s.id === shortcut.id);

          if (existing) {
            // Update frequency and lastUsed
            return {
              shortcuts: state.shortcuts.map((s) =>
                s.id === shortcut.id
                  ? { ...s, frequency: s.frequency + 1, lastUsed: Date.now() }
                  : s
              ),
            };
          } else {
            // Add new shortcut
            const newShortcut: PersonalizedShortcut = {
              ...shortcut,
              frequency: 1,
              lastUsed: Date.now(),
            };

            const updatedShortcuts = [newShortcut, ...state.shortcuts];

            // Keep only top shortcuts by frequency
            const sorted = updatedShortcuts
              .sort((a, b) => {
                if (a.pinned && !b.pinned) return -1;
                if (!a.pinned && b.pinned) return 1;
                return b.frequency - a.frequency;
              })
              .slice(0, state.maxShortcuts);

            return { shortcuts: sorted };
          }
        });
      },

      // Remove shortcut
      removeShortcut: (id) => {
        set((state) => ({
          shortcuts: state.shortcuts.filter((s) => s.id !== id),
        }));
      },

      // Pin/unpin shortcut
      pinShortcut: (id, pinned) => {
        set((state) => ({
          shortcuts: state.shortcuts.map((s) =>
            s.id === id ? { ...s, pinned } : s
          ),
        }));
      },

      // Update usage pattern
      updateUsagePattern: () => {
        const state = get();
        const now = new Date();
        const hour = now.getHours();
        const weekday = now.getDay();

        // Calculate most active hours
        const hourCounts: Record<number, number> = {};
        state.interactions.forEach((interaction) => {
          const interactionHour = new Date(interaction.timestamp).getHours();
          hourCounts[interactionHour] = (hourCounts[interactionHour] || 0) + 1;
        });

        const mostActiveHours = Object.entries(hourCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([hour]) => parseInt(hour));

        // Calculate most active weekdays
        const weekdayCounts: Record<number, number> = {};
        state.interactions.forEach((interaction) => {
          const interactionWeekday = new Date(interaction.timestamp).getDay();
          weekdayCounts[interactionWeekday] = (weekdayCounts[interactionWeekday] || 0) + 1;
        });

        const mostActiveWeekdays = Object.entries(weekdayCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([day]) => parseInt(day));

        // Calculate favorite categories
        const categoryCounts: Record<string, number> = {};
        state.interactions.forEach((interaction) => {
          categoryCounts[interaction.category] =
            (categoryCounts[interaction.category] || 0) + 1;
        });

        const favoriteCategories = Object.entries(categoryCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([category]) => category);

        // Extract search queries
        const searchQueries = state.interactions
          .filter((i) => i.type === 'search')
          .map((i) => i.itemTitle || i.itemId)
          .filter((q): q is string => !!q)
          .slice(0, 20);

        set({
          usagePattern: {
            mostActiveHours,
            mostActiveWeekdays,
            averageSessionDuration: state.usagePattern.averageSessionDuration,
            totalSessions: state.usagePattern.totalSessions + 1,
            favoriteCategories,
            searchQueries,
          },
        });
      },

      // Set preferred layout
      setPreferredLayout: (layout) => {
        set({ preferredLayout: layout });
      },

      // Toggle category visibility
      toggleCategory: (category) => {
        set((state) => {
          const hidden = state.hiddenCategories.includes(category);
          return {
            hiddenCategories: hidden
              ? state.hiddenCategories.filter((c) => c !== category)
              : [...state.hiddenCategories, category],
          };
        });
      },

      // Get smart recommendations
      getRecommendations: () => {
        const state = get();
        if (!state.recommendationsEnabled) return [];

        const recommendations: SmartRecommendation[] = [];

        // Recommend based on content preferences
        const topPreferences = Object.values(state.contentPreferences)
          .sort((a, b) => b.score - a.score)
          .slice(0, 5);

        topPreferences.forEach((pref) => {
          recommendations.push({
            id: `content-${pref.category}`,
            type: 'content',
            title: `Explore more ${pref.category}`,
            description: `You've shown interest in ${pref.category}`,
            score: pref.score,
            reason: `Viewed ${pref.viewCount} times`,
            metadata: { category: pref.category },
          });
        });

        // Recommend widgets based on usage
        if (state.usagePattern.favoriteCategories.length > 0) {
          recommendations.push({
            id: 'widget-quick-stats',
            type: 'widget',
            title: 'Add Quick Stats Widget',
            description: 'Track key metrics for your favorite categories',
            score: 80,
            reason: 'Based on your frequent category visits',
          });
        }

        // Recommend shortcuts
        const recentShortcuts = state.shortcuts
          .filter((s) => !s.pinned)
          .slice(0, 3);

        recentShortcuts.forEach((shortcut) => {
          recommendations.push({
            id: `shortcut-${shortcut.id}`,
            type: 'shortcut',
            title: `Pin "${shortcut.title}"`,
            description: 'Quick access to frequently used content',
            score: Math.min(100, shortcut.frequency * 10),
            reason: `Used ${shortcut.frequency} times`,
            metadata: { shortcut },
          });
        });

        return recommendations.sort((a, b) => b.score - a.score).slice(0, 10);
      },

      // Get top shortcuts
      getTopShortcuts: (limit = 5) => {
        const state = get();
        return state.shortcuts
          .sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return b.frequency - a.frequency;
          })
          .slice(0, limit);
      },

      // Clear all data
      clearAllData: () => {
        set(initialState);
      },

      // Toggle learning
      toggleLearning: (enabled) => {
        set({ learningEnabled: enabled });
      },
    }),
    {
      name: 'darwin-mfc-user-preferences',
      version: 1,
    }
  )
);

// ============================================================================
// HELPER HOOKS
// ============================================================================

export function useTrackPageView(category: string, itemId: string, itemTitle?: string) {
  const trackInteraction = useUserPreferences((state) => state.trackInteraction);
  const updateContentPreference = useUserPreferences(
    (state) => state.updateContentPreference
  );

  React.useEffect(() => {
    trackInteraction({
      type: 'view',
      category,
      itemId,
      itemTitle,
    });

    updateContentPreference(category, true);
  }, [category, itemId, itemTitle, trackInteraction, updateContentPreference]);
}

// Export for convenience
import React from 'react';
