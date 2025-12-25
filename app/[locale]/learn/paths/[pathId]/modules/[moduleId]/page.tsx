/**
 * MODULE PLAYER PAGE
 * ==================
 *
 * Server component wrapper for module player pages.
 * Generates static params for SSG.
 */

import { learningPaths } from '@/lib/data/learning-paths';
import ModulePlayerClient from './ModulePlayerClient';

// =============================================================================
// STATIC PARAMS (for SSG export)
// =============================================================================

export function generateStaticParams() {
  const params: { pathId: string; moduleId: string }[] = [];

  learningPaths.forEach((path) => {
    path.modules.forEach((module) => {
      params.push({
        pathId: path.id,
        moduleId: module.id,
      });
    });
  });

  return params;
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

interface PageProps {
  params: Promise<{ pathId: string; moduleId: string }>;
}

export default async function ModulePlayerPage({ params }: PageProps) {
  const { pathId, moduleId } = await params;
  return <ModulePlayerClient pathId={pathId} moduleId={moduleId} />;
}
