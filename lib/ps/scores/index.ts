import { EmergencyScore } from '../types';
import { neuroScores } from './neuro-scores';
import { cardioScores } from './cardio-scores';
import { supplementalEmergencyScores } from './critical-supplemental-scores';

export const emergencyScores: EmergencyScore[] = [...neuroScores, ...cardioScores, ...supplementalEmergencyScores];

const emergencyScoreAliasMap: Record<string, string> = {
  grim: 'grace',
  rts: 'rts',
  heart: 'heart-score',
  heartscore: 'heart-score',
  pcr: 'cpr',
  troponin: 'timi-stemi',
  qsofa: 'qsofa',
};

function normalizeScoreAlias(raw: string): string {
  return (raw ?? '').trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
}

export const emergencyScoresByCategory = emergencyScores.reduce(
  (acc, score) => {
    const list = acc.get(score.category) ?? [];
    list.push(score);
    acc.set(score.category, list);
    return acc;
  },
  new Map<string, EmergencyScore[]>()
);

export function getEmergencyScoreById(id: string): EmergencyScore | undefined {
  const normalizedId = normalizeScoreAlias(id);
  if (!normalizedId) {
    return undefined;
  }

  const aliasId = emergencyScoreAliasMap[normalizedId] ?? normalizedId;

  return emergencyScores.find((score) => score.id === aliasId);
}

export function getAllEmergencyScoreCategories(): string[] {
  return Array.from(emergencyScoresByCategory.keys());
}
