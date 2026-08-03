import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  canonicalRepresentative,
  decodeGaugeResult,
  gaugeAnalyze,
  orbitCardinality,
  repairCut,
} from './normative-gauge-oracle.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = resolve(
  repoRoot,
  'docs/research/normative-gauge/formal/vectors/normative-gauge-vectors.v1.0.json',
);

const cases = [
  ['invalid-bound-not-subset', [1, 2, 2, 2, 2]],
  ['empty-network', [0, 0, 2, 2, 2]],
  ['single-edge-bound', [1, 1, 2, 2, 2]],
  ['single-edge-needs-binding', [1, 0, 2, 2, 2]],
  ['local-nonbijection', [1, 1, 0, 2, 2]],
  ['flat-identity-triangle', [7, 7, 2, 2, 2]],
  ['flat-partially-bound-triangle', [7, 1, 2, 2, 2]],
  ['odd-flip-holonomy', [7, 7, 1, 2, 2]],
  ['three-flip-holonomy', [7, 7, 1, 1, 1]],
  ['nonbijective-orbit-eight', [0, 0, 0, 0, 0]],
  ['mixed-coordinate-orbit-eight', [3, 1, 0, 3, 2]],
  ['even-flip-flat-triangle', [7, 7, 1, 1, 2]],
];

const vectors = cases.map(([id, input]) => {
  const expectedRich = gaugeAnalyze(input);
  const decoded = decodeGaugeResult(expectedRich);
  return {
    id,
    input,
    expectedRich,
    expectedRepairCut: repairCut(input),
    expectedDisposition: decoded.disposition,
    expectedCanonicalRepresentative: expectedRich === 0
      ? null
      : canonicalRepresentative(input.slice(2)),
    expectedOrbitCardinality: expectedRich === 0
      ? null
      : orbitCardinality(input.slice(2)),
  };
});

const result = {
  schema: 'darwin.normative-gauge-vectors.v1.0',
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  productionAuthorized: false,
  noveltyEstablished: false,
  vectors,
};

mkdirSync(dirname(outputPath), {recursive: true});
writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
process.stdout.write(`${outputPath}\n`);
