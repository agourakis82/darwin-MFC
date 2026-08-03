import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  analyze,
  decodeResult,
  mutantAnomalyMask,
  solutionMask,
  stabilizerElements,
} from './no-hidden-gauge-fixing-oracle.mjs';

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = resolve(dirname(scriptPath), '..');
const outputPath = resolve(
  repoRoot,
  'docs/research/no-hidden-gauge-fixing/formal/vectors/no-hidden-gauge-fixing-vectors.v1.1.json',
);

const cases = [
  ['identity-triangle-unanchored', [7, 0, 2, 2, 2]],
  ['identity-triangle-anchor-a', [7, 1, 2, 2, 2]],
  ['identity-triangle-all-anchors', [7, 7, 2, 2, 2]],
  ['no-edges-unanchored', [0, 0, 0, 3, 0]],
  ['no-edges-anchors-ab', [0, 3, 0, 3, 0]],
  ['nontrivial-holonomy', [7, 0, 2, 2, 1]],
  ['declared-nonbijective-map', [1, 0, 0, 2, 2]],
  ['single-edge-identity', [1, 0, 2, 0, 3]],
  ['single-edge-with-source-anchor', [1, 1, 2, 0, 3]],
  ['invalid-declared-mask', [-1, 0, 2, 2, 2]],
];

const vectors = cases.map(([id, input]) => {
  const packed = analyze(input);
  const decoded = decodeResult(packed);
  const [declared, , ...maps] = input;
  return {
    id,
    input,
    expectedPacked: packed,
    expectedDisposition: decoded.disposition,
    expectedStabilizerMask: decoded.stabilizerMask,
    expectedMinimumAdditionalAnchorMask: decoded.minimumAdditionalAnchorMask,
    expectedSolutionCount: decoded.solutionCount,
    expectedStabilizerOrder: decoded.stabilizerOrder,
    expectedLocalIssueMask: decoded.localIssueMask,
    expectedSolutionMask: packed === 0 || decoded.localIssueMask !== 0
      ? null
      : solutionMask(declared, maps),
    expectedStabilizerElements: packed === 0 || decoded.localIssueMask !== 0
      ? []
      : stabilizerElements(input),
    mutantAnomalyMasks: packed === 0
      ? []
      : Array.from({length: 4}, (_, kind) => mutantAnomalyMask(kind, input)),
  };
});

const document = {
  schema: 'darwin.no-hidden-gauge-fixing-vectors.v1.1',
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  abi: ['declaredEdgeMask', 'anchorVertexMask', 'mapAB', 'mapBC', 'mapCA'],
  vectors,
};

mkdirSync(dirname(outputPath), {recursive: true});
writeFileSync(outputPath, `${JSON.stringify(document, null, 2)}\n`);
process.stdout.write(`${outputPath}\n`);
