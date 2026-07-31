import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { generateDifferentialDiagnosis } from '../lib/utils/differential-diagnosis';

type ComparatorConfig = {
  schemaVersion: 'darwin.sounio.current-aps-comparator.v1';
  comparatorVersion: string;
  scoreScale: string;
  probabilityNormalization: string;
  featureLabels: Record<string, string>;
  primarySymptomPriority: string[];
  conditionAliases: Record<string, string[]>;
};

const comparatorConfig = JSON.parse(readFileSync(
  resolve(process.cwd(), 'clinical/epistemic-firewall/current-aps-comparator.json'),
  'utf8',
)) as ComparatorConfig;
if (comparatorConfig.schemaVersion !== 'darwin.sounio.current-aps-comparator.v1') {
  throw new Error('Unsupported current APS comparator configuration.');
}
const { featureLabels, primarySymptomPriority, conditionAliases } = comparatorConfig;

type ComparatorInput = {
  schemaVersion: 'darwin.sounio.comparator-input.v1';
  features: Array<{ id: string }>;
  conditions: Array<{ id: string }>;
  records: Array<{ ageDays: number; features: number[] }>;
};

const input = JSON.parse(readFileSync(0, 'utf8')) as ComparatorInput;
if (input.schemaVersion !== 'darwin.sounio.comparator-input.v1') {
  throw new Error('Unsupported comparator input schema.');
}
if (!Array.isArray(input.features) || input.features.length !== 12) {
  throw new Error('Comparator requires the 12-feature clinical ABI.');
}
if (!Array.isArray(input.conditions) || input.conditions.length !== 9) {
  throw new Error('Comparator requires the nine-condition clinical ABI.');
}

const featureIndex = new Map(input.features.map((feature, index) => [feature.id, index]));
const comparatorRecords = input.records.map((record, recordIndex) => {
  if (
    !Number.isInteger(record.ageDays)
    || record.ageDays < 0
    || !Array.isArray(record.features)
    || record.features.length !== input.features.length
    || record.features.some(value => ![-1, 0, 1].includes(value))
  ) {
    throw new Error(`Invalid comparator record ${recordIndex}.`);
  }

  const presentFeatureIds = primarySymptomPriority.filter(id => {
    const index = featureIndex.get(id);
    return index !== undefined && record.features[index] === 1;
  });
  const absentSymptoms = primarySymptomPriority
    .filter(id => {
      const index = featureIndex.get(id);
      return index !== undefined && record.features[index] === 0;
    })
    .map(id => featureLabels[id]);
  const rawScores = new Array(input.conditions.length).fill(0);
  const mappedDiagnoses: Array<{ diseaseId: string; conditionId: string; score: number }> = [];

  if (presentFeatureIds.length > 0) {
    const [primaryFeatureId, ...secondaryFeatureIds] = presentFeatureIds;
    const differential = generateDifferentialDiagnosis(
      featureLabels[primaryFeatureId],
      secondaryFeatureIds.map(id => featureLabels[id]),
      absentSymptoms,
      { ageValue: record.ageDays, ageUnit: 'dias' },
    );

    for (const diagnosis of differential.diagnosticosDiferenciais) {
      const diseaseId = diagnosis.doenca.id;
      if (!diseaseId) continue;
      const conditionPosition = input.conditions.findIndex(condition => (
        conditionAliases[condition.id]?.includes(diseaseId)
      ));
      if (conditionPosition < 0) continue;
      rawScores[conditionPosition] = Math.max(rawScores[conditionPosition], diagnosis.score);
      mappedDiagnoses.push({
        diseaseId,
        conditionId: input.conditions[conditionPosition].id,
        score: diagnosis.score,
      });
    }
  }

  return {
    index: recordIndex,
    rawScores,
    mappedDiagnoses,
  };
});

process.stdout.write(JSON.stringify({
  schemaVersion: 'darwin.sounio.comparator-scores.v1',
  comparatorVersion: comparatorConfig.comparatorVersion,
  scoreScale: comparatorConfig.scoreScale,
  probabilityNormalization: comparatorConfig.probabilityNormalization,
  primarySymptomPolicy: primarySymptomPriority,
  records: comparatorRecords,
}));
