/**
 * DARWIN-MFC LEARNING PATHS
 * =========================
 *
 * Central export for all learning paths.
 */

import type { LearningPath } from '@/lib/types/learning';
import { apsEssentialsPath } from './aps-essentials';
import { medicationSafetyPath } from './medication-safety';

// =============================================================================
// ALL LEARNING PATHS
// =============================================================================

export const learningPaths: LearningPath[] = [
  apsEssentialsPath,
  medicationSafetyPath,
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get a learning path by ID
 */
export function getLearningPathById(id: string): LearningPath | undefined {
  return learningPaths.find((path) => path.id === id);
}

/**
 * Get learning paths by category
 */
export function getLearningPathsByCategory(category: string): LearningPath[] {
  return learningPaths.filter((path) => path.category === category);
}

/**
 * Get published learning paths only
 */
export function getPublishedLearningPaths(): LearningPath[] {
  return learningPaths.filter((path) => path.isPublished);
}

/**
 * Get learning paths by difficulty
 */
export function getLearningPathsByDifficulty(difficulty: string): LearningPath[] {
  return learningPaths.filter((path) => path.difficulty === difficulty);
}

/**
 * Search learning paths by tag
 */
export function searchLearningPathsByTag(tag: string): LearningPath[] {
  return learningPaths.filter((path) =>
    path.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
  );
}

/**
 * Get a module from a learning path
 */
export function getModuleById(pathId: string, moduleId: string) {
  const path = getLearningPathById(pathId);
  return path?.modules.find((m) => m.id === moduleId);
}

/**
 * Get total modules count
 */
export function getTotalModulesCount(): number {
  return learningPaths.reduce((acc, path) => acc + path.modules.length, 0);
}

/**
 * Get total estimated hours
 */
export function getTotalEstimatedHours(): number {
  return learningPaths.reduce((acc, path) => acc + path.estimatedHours, 0);
}

// =============================================================================
// EXPORTS
// =============================================================================

export { apsEssentialsPath, medicationSafetyPath };
export type { LearningPath };
