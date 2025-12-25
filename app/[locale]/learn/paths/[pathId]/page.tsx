/**
 * LEARNING PATH DETAIL PAGE
 * =========================
 *
 * Server component wrapper for learning path pages.
 * Generates static params for SSG.
 */

import { learningPaths } from '@/lib/data/learning-paths';
import LearningPathClient from './LearningPathClient';

// =============================================================================
// STATIC PARAMS (for SSG export)
// =============================================================================

export function generateStaticParams() {
  return learningPaths.map((path) => ({
    pathId: path.id,
  }));
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

interface PageProps {
  params: Promise<{ pathId: string }>;
}

export default async function LearningPathPage({ params }: PageProps) {
  const { pathId } = await params;
  return <LearningPathClient pathId={pathId} />;
}
