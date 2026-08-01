import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCompilerSourceReceipt } from './lib/sounio-compiler-receipt.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = join(root, 'clinical/medication-envelope');
const publicDir = join(root, 'public/medication-envelope');
const buildDir = join(root, '.clinical-kernel-build/medication-envelope');
const medicationSafetyDir = join(root, 'public/medication-safety');
const cachedSounioRoot = join(root, '.clinical-kernel-build/sounio-source');
const sounioRoot = process.env.SOUNIO_ROOT
  || (existsSync(join(cachedSounioRoot, 'bin/souc-linux-x86_64'))
    ? cachedSounioRoot
    : '/workspace/sounio');
const compiler = resolve(
  process.env.SOUNIO_COMPILER_PATH
    || (existsSync(join(sounioRoot, 'bin/souc-linux-x86_64'))
      ? join(sounioRoot, 'bin/souc-linux-x86_64')
      : join(sounioRoot, 'artifacts/self-hosted/souc-self-hosted-x86_64')),
);
const compilerReceiptPath = resolve(
  process.env.SOUNIO_COMPILER_RECEIPT_PATH
    || join(root, 'public/clinical-kernel/compiler-source.receipt.json'),
);
const sourcePath = join(sourceDir, 'medication-envelope-kernel.sio');
const codegenPath = join(sourceDir, 'medication-envelope-kernel-codegen.sio');
const vectorsPath = join(sourceDir, 'test-vectors.v1.json');
const formalManifestPath = join(sourceDir, 'formal-toolchain.v1.json');
const trustedPilotKeysPath = join(sourceDir, 'trusted-pilot-keys.v1.json');
const leanProofPath = join(sourceDir, 'EnvelopeSemantics.lean');
const smtProofPath = join(sourceDir, 'envelope-gates.smt2');
const identityBundlePath = join(medicationSafetyDir, 'medication-identity-bundle.json');
const identityReceiptPath = join(medicationSafetyDir, 'medication-identity.receipt.json');
const reviewSeedPath = join(medicationSafetyDir, 'medication-review-seed.json');

mkdirSync(publicDir, { recursive: true });
mkdirSync(buildDir, { recursive: true });

const sha256 = value => createHash('sha256').update(value).digest('hex');
const canonicalize = value => {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`;
  return `{${Object.entries(value)
    .filter(([, nested]) => nested !== undefined)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, nested]) => `${JSON.stringify(key)}:${canonicalize(nested)}`)
    .join(',')}}`;
};
const jsonBytes = value => `${JSON.stringify(value, null, 2)}\n`;
const readJson = path => JSON.parse(readFileSync(path, 'utf8'));

if (!existsSync(compiler)) throw new Error(`source-fresh-sounio-compiler-missing:${compiler}`);
if (!existsSync(compilerReceiptPath)) throw new Error(`source-fresh-compiler-receipt-missing:${compilerReceiptPath}`);

const compilerBytes = readFileSync(compiler);
const compilerSha256 = sha256(compilerBytes);
const compilerReceipt = loadCompilerSourceReceipt(compilerReceiptPath, {
  expectedCompilerSha256: compilerSha256,
  requireReconciled: true,
});
const identityBundleBytes = readFileSync(identityBundlePath);
const identityReceiptBytes = readFileSync(identityReceiptPath);
const reviewSeedBytes = readFileSync(reviewSeedPath);
const identityBundle = JSON.parse(identityBundleBytes);
const identityReceipt = JSON.parse(identityReceiptBytes);
const reviewSeed = JSON.parse(reviewSeedBytes);
const sourceBytes = readFileSync(sourcePath);
const codegenBytes = readFileSync(codegenPath);
const vectorBytes = readFileSync(vectorsPath);
const vectors = JSON.parse(vectorBytes);
const formalManifestBytes = readFileSync(formalManifestPath);
const formalManifest = JSON.parse(formalManifestBytes);
const trustedPilotKeysBytes = readFileSync(trustedPilotKeysPath);
const trustedPilotKeys = JSON.parse(trustedPilotKeysBytes);

if (identityBundle.schemaVersion !== 'darwin.medication-identity-bundle.v1') throw new Error('identity-bundle-v1-required');
if (identityReceipt.hashes.identityBundleSha256 !== sha256(identityBundleBytes)) throw new Error('identity-receipt-hash-mismatch');
if (reviewSeed.identityBundleSha256 !== sha256(identityBundleBytes)) throw new Error('review-seed-identity-hash-mismatch');
if (vectors.inputCount !== 16 || vectors.outputCount !== 8) throw new Error('medication-envelope-abi-mismatch');
if (trustedPilotKeys.keys.length !== 0) throw new Error('pilot-key-registry-must-start-empty');

const aliasesByLegacyId = new Map(identityBundle.aliases.map(alias => [alias.id, alias]));
const interactionConflicts = reviewSeed.tasks.filter(task => task.metadata.severityConflict === true);
if (interactionConflicts.length !== 7) throw new Error(`expected-seven-interaction-conflicts:${interactionConflicts.length}`);
if (reviewSeed.doseRuleCandidates.length !== 5) throw new Error('expected-five-pediatric-dose-candidates');

const sentinelDefinitions = [
  {
    id: 'rxenv-high-risk-insulin-regular',
    legacyId: 'insulina-regular',
    label: 'Insulina humana regular',
    constraints: [
      ['REQUIRED_CONTEXT', 'concentration-unit-per-milliliter', 'Concentração em unidade/mL obrigatória'],
      ['REQUIRED_CONTEXT', 'activity-international-unit', 'Quantidade em unidades obrigatória'],
    ],
  },
  {
    id: 'rxenv-high-risk-methotrexate-weekly',
    legacyId: 'metotrexato',
    label: 'Metotrexato oral semanal',
    constraints: [
      ['EXACT_FREQUENCY', 'frequency-per-day', 'Frequência precisa de reconciliação formal'],
      ['REQUIRED_MONITORING', 'CBC_RENAL_HEPATIC', 'Monitoramento obrigatório precisa ser delimitado'],
    ],
  },
  {
    id: 'rxenv-high-risk-warfarin',
    legacyId: 'varfarina',
    label: 'Varfarina',
    constraints: [
      ['REQUIRED_MONITORING', 'INR', 'INR e plano de monitoramento obrigatórios'],
      ['REQUIRED_CONTEXT', 'dose-titration-plan', 'Plano de titulação obrigatório'],
    ],
  },
  {
    id: 'rxenv-high-risk-lithium',
    legacyId: 'carbonato-litio',
    label: 'Carbonato de lítio',
    constraints: [
      ['REQUIRED_CONTEXT', 'egfr-milliliter-per-minute-per-1.73m2', 'Função renal obrigatória'],
      ['REQUIRED_MONITORING', 'LITHIUM_LEVEL', 'Nível sérico e tempo de coleta obrigatórios'],
    ],
  },
  {
    id: 'rxenv-high-risk-digoxin',
    legacyId: 'digoxina',
    label: 'Digoxina',
    constraints: [
      ['REQUIRED_CONTEXT', 'age-day', 'Idade obrigatória'],
      ['REQUIRED_CONTEXT', 'egfr-milliliter-per-minute-per-1.73m2', 'Função renal obrigatória'],
    ],
  },
];

function resolveConceptId(legacyId, label) {
  const exact = aliasesByLegacyId.get(legacyId);
  if (exact?.conceptId) return exact.conceptId;
  const normalized = label.toLocaleLowerCase('pt-BR');
  const match = identityBundle.aliases.find(alias => alias.displayName.toLocaleLowerCase('pt-BR') === normalized);
  if (!match?.conceptId) throw new Error(`sentinel-concept-not-resolved:${legacyId}`);
  return match.conceptId;
}

const definitions = [
  ...interactionConflicts.map(task => ({
    id: `rxenv-${task.targetId}`,
    wave: 'interaction-conflict',
    label: task.title,
    medicationConceptIds: task.metadata.canonicalIds,
    indicationId: null,
    population: 'current legacy pair; population requires review',
    source: { taskId: task.id, targetDigest: task.targetDigest, legacyValues: task.legacyValues },
    constraints: [{
      kind: 'FORBIDDEN_PAIR',
      label: 'Par com conflito crítico legado; delimitação clínica pendente',
      severity: 'BLOCK',
      leftConceptId: task.metadata.canonicalIds[0] ?? 'unresolved-left',
      rightConceptId: task.metadata.canonicalIds[1] ?? task.targetId,
    }],
  })),
  ...reviewSeed.doseRuleCandidates.map(candidate => ({
    id: `rxenv-${candidate.id}`,
    wave: 'pediatric-respiratory',
    label: candidate.indicationLabel,
    medicationConceptIds: candidate.medicationConceptId ? [candidate.medicationConceptId] : [],
    indicationId: candidate.indicationId,
    population: candidate.populationLabel,
    source: {
      candidateId: candidate.id,
      sourceStatus: candidate.sourceStatus,
      warning: 'No legacy posology text was parsed or promoted.',
    },
    constraints: [
      { kind: 'REQUIRED_CONTEXT', label: 'Idade deve ser informada e revisada', severity: 'REVIEW', variable: 'age-day' },
      { kind: 'REQUIRED_CONTEXT', label: 'Peso deve ser informado quando a regra revisada exigir', severity: 'REVIEW', variable: 'body-mass-gram' },
      { kind: 'REQUIRED_CONTEXT', label: 'Via e apresentação devem ser selecionadas', severity: 'REVIEW', variable: 'route-and-presentation' },
    ],
  })),
  ...sentinelDefinitions.map(definition => ({
    id: definition.id,
    wave: 'high-risk-sentinel',
    label: definition.label,
    medicationConceptIds: [resolveConceptId(definition.legacyId, definition.label)],
    indicationId: null,
    population: 'population and indication require independent review',
    source: {
      legacyId: definition.legacyId,
      hazardClassOnly: true,
      warning: 'Structural hazard sentinel; no clinical boundary is promoted.',
    },
    constraints: definition.constraints.map(([kind, variable, label]) => ({
      kind,
      label,
      severity: 'REVIEW',
      ...(kind === 'REQUIRED_MONITORING' ? { observationCode: variable } : { variable }),
    })),
  })),
];

if (definitions.length !== 17) throw new Error(`expected-seventeen-artifacts:${definitions.length}`);
if (new Set(definitions.map(definition => definition.id)).size !== 17) throw new Error('duplicate-envelope-artifact-id');

const nodes = [];
const edges = [];
const artifactNodeIds = new Map();
const constraintEvidenceIds = new Map();

function addNode(kind, payload, parentIds = []) {
  const normalizedParents = [...new Set(parentIds)].sort();
  const payloadSha256 = sha256(canonicalize(payload));
  const nodeSha256 = sha256(canonicalize({ kind, payloadSha256, parentIds: normalizedParents }));
  const node = {
    schemaVersion: 'darwin.medication-evidence-node.v1',
    id: `rxeg-${nodeSha256}`,
    kind,
    status: 'CURRENT',
    payload,
    payloadSha256,
    parentIds: normalizedParents,
    nodeSha256,
  };
  if (nodes.some(existing => existing.id === node.id)) throw new Error(`evidence-node-collision:${node.id}`);
  nodes.push(node);
  return node;
}

for (const definition of definitions) {
  const source = addNode('source', {
    artifactId: definition.id,
    source: definition.source,
    trustBoundary: 'unreviewed-input-data',
  });
  const claim = addNode('claim', {
    artifactId: definition.id,
    statement: definition.label,
    locator: definition.source.taskId || definition.source.candidateId || definition.source.legacyId,
    extraction: 'deterministic-existing-bundle',
  }, [source.id]);
  edges.push({ from: source.id, to: claim.id, kind: 'supports' });

  const constraintIds = [];
  const evidenceIds = [];
  definition.constraints.forEach((constraint, index) => {
    const interpretation = addNode('interpretation', {
      artifactId: definition.id,
      constraintIndex: index,
      reviewStatus: 'EVIDENCE_REQUIRED',
      statement: constraint.label,
    }, [claim.id]);
    edges.push({ from: claim.id, to: interpretation.id, kind: 'derives' });
    const constraintNode = addNode('constraint', {
      artifactId: definition.id,
      constraintIndex: index,
      candidate: constraint,
      executable: false,
    }, [interpretation.id]);
    edges.push({ from: interpretation.id, to: constraintNode.id, kind: 'derives' });
    constraintIds.push(constraintNode.id);
    evidenceIds.push(source.id, claim.id, interpretation.id, constraintNode.id);
  });
  const artifactNode = addNode('artifact', {
    artifactId: definition.id,
    wave: definition.wave,
    reviewStatus: 'EVIDENCE_REQUIRED',
    pilotAuthorized: false,
    productionAuthorized: false,
  }, constraintIds);
  constraintIds.forEach(id => edges.push({ from: id, to: artifactNode.id, kind: 'compiles-to' }));
  artifactNodeIds.set(definition.id, artifactNode.id);
  constraintEvidenceIds.set(definition.id, evidenceIds);
}

function topologicalOrder() {
  const ids = new Set(nodes.map(node => node.id));
  const indegree = new Map([...ids].map(id => [id, 0]));
  const children = new Map([...ids].map(id => [id, []]));
  edges.forEach(edge => {
    if (!ids.has(edge.from) || !ids.has(edge.to)) throw new Error('evidence-edge-node-missing');
    indegree.set(edge.to, indegree.get(edge.to) + 1);
    children.get(edge.from).push(edge.to);
  });
  const queue = [...ids].filter(id => indegree.get(id) === 0).sort();
  const ordered = [];
  while (queue.length > 0) {
    const id = queue.shift();
    ordered.push(id);
    children.get(id).sort().forEach(child => {
      indegree.set(child, indegree.get(child) - 1);
      if (indegree.get(child) === 0) queue.push(child);
    });
    queue.sort();
  }
  if (ordered.length !== nodes.length) throw new Error('evidence-graph-cycle');
  return ordered;
}

topologicalOrder();
const outgoingIds = new Set(edges.map(edge => edge.from));
const roots = nodes.filter(node => !outgoingIds.has(node.id)).map(node => node.id).sort();
const merkleRootSha256 = sha256(canonicalize(roots.map(id => nodes.find(node => node.id === id).nodeSha256)));
const evidenceGraph = {
  schemaVersion: 'darwin.medication-evidence-graph.v1',
  generatedAt: identityBundle.generatedAt,
  intendedUse: 'Trace reviewed medication claims into executable constraints without inferring treatment.',
  nodes: nodes.sort((left, right) => left.id.localeCompare(right.id)),
  edges: edges.sort((left, right) => canonicalize(left).localeCompare(canonicalize(right))),
  roots,
  merkleRootSha256,
  audit: {
    nodeCount: nodes.length,
    edgeCount: edges.length,
    staleNodeCount: 0,
    cycleFree: true,
    contentAddressed: true,
  },
};

const artifactBundle = {
  schemaVersion: 'darwin.medication-envelope-artifact-bundle.v1',
  generatedAt: identityBundle.generatedAt,
  intendedUse: 'Validate a professional-created medication action against reviewed and delimited constraints.',
  artifacts: definitions.map(definition => {
    const graphNodeIds = [...constraintEvidenceIds.get(definition.id), artifactNodeIds.get(definition.id)].sort();
    const constraints = definition.constraints.map((constraint, index) => ({
      id: `${definition.id}-constraint-${String(index + 1).padStart(2, '0')}`,
      kind: constraint.kind,
      label: constraint.label,
      severity: constraint.severity,
      evidenceNodeIds: constraintEvidenceIds.get(definition.id),
      unknownBehavior: 'REVIEW',
      ...(constraint.kind === 'FORBIDDEN_PAIR' ? {
        leftConceptId: constraint.leftConceptId,
        rightConceptId: constraint.rightConceptId,
      } : {}),
      ...(constraint.kind === 'REQUIRED_CONTEXT' ? { variable: constraint.variable } : {}),
      ...(constraint.kind === 'REQUIRED_MONITORING' ? { observationCode: constraint.observationCode } : {}),
      ...(constraint.kind === 'EXACT_FREQUENCY' ? {
        variable: constraint.variable,
        expected: { numerator: '0', denominator: '1', dimension: 'frequency-per-day' },
      } : {}),
    }));
    const unsigned = {
      schemaVersion: 'darwin.clinical-constraint-ir.v1',
      artifactId: definition.id,
      artifactVersion: 'candidate-v1',
      medicationConceptIds: definition.medicationConceptIds,
      indicationId: definition.indicationId,
      population: definition.population,
      reviewStatus: 'EVIDENCE_REQUIRED',
      constraints,
      graphNodeIds,
      graphMerkleRootSha256: merkleRootSha256,
    };
    return { ...unsigned, irSha256: sha256(canonicalize(unsigned)) };
  }),
  pilotAuthorized: false,
  productionAuthorized: false,
  signature: null,
};

function engineeringOutput(input) {
  let refusal = 0;
  const refusalFlags = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];
  refusalFlags.forEach((bit, index) => { if (input[index] !== 1) refusal |= bit; });
  if (input[14] !== 0) refusal |= 2048;
  if (input[15] !== 1) refusal |= 4096;
  if (input[11] < 0 || input[11] > 64) refusal |= 8192;
  if (input[12] < 0 || input[13] < 0) refusal |= 16384;
  const blockers = input[12];
  let reviews = input[13];
  if (input[11] > 0) reviews |= 1;
  const disposition = refusal !== 0 ? 0 : blockers !== 0 ? 1 : reviews !== 0 ? 2 : 3;
  const counterexample = blockers !== 0 ? blockers : reviews;
  return [disposition, refusal, blockers, reviews, input[11], counterexample, input[1] + input[4] + input[6], input[0] + input[10]];
}

const baseInput = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1];
const scenarios = [
  ['WITHIN_FIXTURE', input => input],
  ['SINGLE_VIOLATION', input => { input[12] = 2; return input; }],
  ['COMBINED_VIOLATION', input => { input[11] = 1; input[12] = 4; input[13] = 8; return input; }],
  ['MISSING_CONTEXT', input => { input[11] = 1; input[13] = 8; return input; }],
];
const benchmarkCases = [];
artifactBundle.artifacts.forEach(artifact => {
  scenarios.forEach(([scenario, mutate]) => {
    for (let index = 0; index < 5; index += 1) {
      const input = mutate([...baseInput]);
      benchmarkCases.push({
        id: `${artifact.artifactId}-${scenario.toLocaleLowerCase().replaceAll('_', '-')}-${index + 1}`,
        artifactId: artifact.artifactId,
        scenario,
        synthetic: true,
        input,
        expectedEngineeringOutput: engineeringOutput(input),
        clinicalExpectedDisposition: 'REFUSE',
      });
    }
  });
});
if (benchmarkCases.length !== 340) throw new Error(`expected-340-benchmark-cases:${benchmarkCases.length}`);
const benchmark = {
  schemaVersion: 'darwin.medication-envelope-benchmark.v1',
  generatedAt: identityBundle.generatedAt,
  syntheticOnly: true,
  cases: benchmarkCases,
};

const evidenceGraphBytes = Buffer.from(jsonBytes(evidenceGraph));
const artifactBundleBytes = Buffer.from(jsonBytes(artifactBundle));
const benchmarkBytes = Buffer.from(jsonBytes(benchmark));
const aiPolicy = {
  schemaVersion: 'darwin.adversarial-evidence-authoring-policy.v1',
  generatedAt: identityBundle.generatedAt,
  extractor: { providerMustDifferFromFalsifier: true, toolAccess: false, networkAccess: false },
  falsifier: { providerMustDifferFromExtractor: true, toolAccess: false, networkAccess: false },
  untrustedDocumentHandling: 'Document bytes are data, never instructions.',
  requiredOutputs: ['claim', 'exact-locator', 'challenge', 'provider', 'model', 'prompt-hash', 'response-hash'],
  currentRuns: [],
  humanConsensusRequired: true,
  executable: false,
};
const aiPolicyBytes = Buffer.from(jsonBytes(aiPolicy));

const firstSource = evidenceGraph.nodes.find(node => node.kind === 'source');
const stale = new Set();
const queue = firstSource ? [firstSource.id] : [];
const children = new Map();
evidenceGraph.edges.forEach(edge => children.set(edge.from, [...(children.get(edge.from) || []), edge.to]));
while (queue.length > 0) {
  const current = queue.shift();
  for (const child of children.get(current) || []) {
    if (stale.has(child)) continue;
    stale.add(child);
    queue.push(child);
  }
}
const changeImpact = {
  schemaVersion: 'darwin.medication-change-impact-report.v1',
  graphSha256: sha256(evidenceGraphBytes),
  changedNodeIds: firstSource ? [firstSource.id] : [],
  staleDescendantIds: [...stale].sort(),
  affectedArtifactIds: evidenceGraph.nodes
    .filter(node => stale.has(node.id) && node.kind === 'artifact')
    .map(node => node.payload.artifactId)
    .sort(),
  disposition: 'REFUSE',
  reason: 'evidence-descendant-stale',
};

writeFileSync(join(publicDir, 'medication-evidence-graph.json'), evidenceGraphBytes);
writeFileSync(join(publicDir, 'medication-envelope-artifacts.json'), artifactBundleBytes);
writeFileSync(join(publicDir, 'medication-envelope-benchmark.json'), benchmarkBytes);
writeFileSync(join(publicDir, 'adversarial-ai-policy.json'), aiPolicyBytes);
writeFileSync(join(publicDir, 'change-impact.fixture.json'), jsonBytes(changeImpact));
writeFileSync(join(publicDir, 'trusted-pilot-keys.v1.json'), trustedPilotKeysBytes);

let generatedOracle = `${sourceBytes.toString('utf8')}\n`;
vectors.vectors.forEach((vector, vectorIndex) => {
  generatedOracle += `\nfn load_vector_${vectorIndex}() with Mut, Panic {\n`;
  vector.input.forEach((value, inputIndex) => {
    generatedOracle += `    ORACLE_INPUT[${inputIndex} as usize] = ${value}\n`;
  });
  generatedOracle += '}\n';
});
generatedOracle += `
fn print_result(vector_index: i64) with IO, Mut, Panic {
    evaluate_oracle()
    print("R ")
    print_int(vector_index)
    var output_index: i64 = 0
    while output_index < OUTPUT_COUNT {
        print(" ")
        print_int(ORACLE_OUTPUT[output_index as usize])
        output_index = output_index + 1
    }
    println("")
}

fn main() -> i64 with IO, Mut, Panic {
`;
vectors.vectors.forEach((_, vectorIndex) => {
  generatedOracle += `    load_vector_${vectorIndex}()\n    print_result(${vectorIndex})\n`;
});
generatedOracle += '    println("SOUNIO_MEDICATION_ENVELOPE_ORACLE_OK")\n    0\n}\n';
const generatedOraclePath = join(buildDir, 'medication-envelope-kernel.generated.sio');
writeFileSync(generatedOraclePath, generatedOracle);

const shellQuote = value => `'${String(value).replaceAll("'", "'\\''")}'`;
const runLinux = command => execFileSync(
  'limactl',
  ['shell', 'souc-linux', '/bin/bash', '-lc', command],
  { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 32 * 1024 * 1024 },
);
const copyToGuest = (hostPath, guestPath) => execFileSync(
  'limactl',
  ['copy', '--backend=scp', hostPath, `souc-linux:${guestPath}`],
  { cwd: root, stdio: 'pipe' },
);
const copyFromGuest = (guestPath, hostPath) => execFileSync(
  'limactl',
  ['copy', '--backend=scp', `souc-linux:${guestPath}`, hostPath],
  { cwd: root, stdio: 'pipe' },
);
const compile = (hostSource, guestSource, guestOutput, hostOutput) => {
  copyToGuest(hostSource, guestSource);
  runLinux(
    `export SOUNIO_STDLIB_PATH=${shellQuote(join(sounioRoot, 'stdlib'))}; `
      + `${shellQuote(compiler)} ${shellQuote(guestSource)} ${shellQuote(guestOutput)} && chmod +x ${shellQuote(guestOutput)}`,
  );
  copyFromGuest(guestOutput, hostOutput);
};

execFileSync('limactl', ['start', 'souc-linux'], { stdio: 'ignore' });
const codegenElf = join(buildDir, 'medication-envelope-codegen.elf');
const oracleElf = join(buildDir, 'medication-envelope-oracle.elf');
const wasmPath = join(publicDir, 'medication-envelope-kernel.wasm');
compile(codegenPath, '/tmp/darwin-medication-envelope-codegen.sio', '/tmp/darwin-medication-envelope-codegen.elf', codegenElf);
runLinux(`${shellQuote('/tmp/darwin-medication-envelope-codegen.elf')} ${shellQuote('/tmp/darwin-medication-envelope-kernel.wasm')} || test -s ${shellQuote('/tmp/darwin-medication-envelope-kernel.wasm')}`);
copyFromGuest('/tmp/darwin-medication-envelope-kernel.wasm', wasmPath);
compile(generatedOraclePath, '/tmp/darwin-medication-envelope-oracle.sio', '/tmp/darwin-medication-envelope-oracle.elf', oracleElf);
const oracleOutput = runLinux(shellQuote('/tmp/darwin-medication-envelope-oracle.elf'));
if (!oracleOutput.includes('SOUNIO_MEDICATION_ENVELOPE_ORACLE_OK')) throw new Error(`sounio-envelope-oracle-failed:\n${oracleOutput}`);

const nativeResults = new Map();
const nativeNumbers = [...oracleOutput.matchAll(/-?\d+/g)].map(match => Number(match[0]));
for (let offset = 0; offset < nativeNumbers.length; offset += vectors.outputCount + 1) {
  const vectorIndex = nativeNumbers[offset];
  nativeResults.set(vectorIndex, nativeNumbers.slice(offset + 1, offset + 1 + vectors.outputCount));
}
const wasmBytes = readFileSync(wasmPath);
if (!WebAssembly.validate(wasmBytes)) throw new Error('sounio-envelope-wasm-invalid');
const module = new WebAssembly.Module(wasmBytes);
if (WebAssembly.Module.imports(module).length !== 0) throw new Error('sounio-envelope-wasm-imports-forbidden');
const instance = new WebAssembly.Instance(module);
const { memory, evaluate } = instance.exports;
if (!(memory instanceof WebAssembly.Memory) || typeof evaluate !== 'function') throw new Error('sounio-envelope-wasm-abi-incomplete');
const view = new DataView(memory.buffer);
const inputOffset = 0;
const outputOffset = 512;
const testResults = [];
vectors.vectors.forEach((vector, vectorIndex) => {
  vector.input.forEach((value, inputIndex) => view.setBigInt64(inputOffset + inputIndex * 8, BigInt(value), true));
  const returnCode = evaluate(inputOffset, outputOffset);
  if (returnCode !== 0) throw new Error(`sounio-envelope-wasm-return-code:${vector.id}:${returnCode}`);
  const output = Array.from({ length: vectors.outputCount }, (_, index) => Number(view.getBigInt64(outputOffset + index * 8, true)));
  if (JSON.stringify(output) !== JSON.stringify(nativeResults.get(vectorIndex))) throw new Error(`sounio-envelope-native-wasm-parity:${vector.id}`);
  if (JSON.stringify(output) !== JSON.stringify(vector.expected)) throw new Error(`sounio-envelope-expected-vector:${vector.id}`);
  testResults.push({ id: vector.id, output, exactParity: true });
});

function toolVersion(command, args = ['--version']) {
  const probe = spawnSync(command, args, { encoding: 'utf8' });
  return probe.status === 0 ? `${probe.stdout}${probe.stderr}`.trim() : null;
}

const formalToolsRoot = process.env.DARWIN_FORMAL_TOOLS_ROOT
  || join(root, '.clinical-kernel-build/formal-tools');
const formalToolPaths = {
  cvc5: process.env.CVC5_PATH
    || join(formalToolsRoot, 'cvc5/cvc5-macOS-arm64-static/bin/cvc5'),
  ethos: process.env.ETHOS_PATH
    || join(formalToolsRoot, 'ethos/ethos'),
  z3: process.env.Z3_PATH
    || join(formalToolsRoot, 'z3/z3-5.0.0-arm64-osx-13.3/bin/z3'),
  lean: process.env.LEAN_PATH
    || join(formalToolsRoot, 'lean/lean-4.32.1-darwin_aarch64/bin/lean'),
};
const cpcDefinitionPath = process.env.CVC5_CPC_DEFINITION_PATH
  || join(formalToolsRoot, 'cvc5-source/proofs/eo/cpc/Cpc.eo');
const installedVersions = {
  cvc5: toolVersion(formalToolPaths.cvc5),
  ethos: toolVersion(formalToolPaths.ethos, ['--show-config']),
  z3: toolVersion(formalToolPaths.z3),
  lean: toolVersion(formalToolPaths.lean),
};
const versionMatches = Object.fromEntries(formalManifest.tools.map(tool => [
  tool.name,
  Boolean(installedVersions[tool.name]?.includes(tool.requiredVersion)),
]));
let cvc5ProofBytes = null;
let ethosCheckReceiptBytes = null;
let z3ReportBytes = null;
let leanReceiptBytes = null;

if (versionMatches.cvc5 && versionMatches.ethos && existsSync(cpcDefinitionPath)) {
  const proof = spawnSync(
    formalToolPaths.cvc5,
    ['--safe-mode=safe', '--produce-proofs', '--check-proofs', smtProofPath],
    { encoding: 'utf8' },
  );
  if (proof.status === 0 && proof.stdout.startsWith('unsat\n')) {
    const proofLines = proof.stdout.trimEnd().split('\n').slice(1);
    if (proofLines[0]?.trim() === '(' && proofLines.at(-1)?.trim() === ')') {
      cvc5ProofBytes = Buffer.from(`${proofLines.slice(1, -1).join('\n')}\n`);
      const proofPath = join(buildDir, 'cvc5-proof.cpc');
      writeFileSync(proofPath, cvc5ProofBytes);
      const ethos = spawnSync(
        formalToolPaths.ethos,
        [`--include=${cpcDefinitionPath}`, proofPath],
        { encoding: 'utf8' },
      );
      if (ethos.status === 0 && ethos.stdout.trim() === 'correct') {
        ethosCheckReceiptBytes = Buffer.from(jsonBytes({
          schemaVersion: 'darwin.ethos-cpc-check-receipt.v1',
          ethosVersion: installedVersions.ethos,
          cvc5Version: installedVersions.cvc5,
          cpcDefinitionCommit: '8ff882e3e42f046867d2ac2e33e92b3d026144ae',
          cpcDefinitionSha256: sha256(readFileSync(cpcDefinitionPath)),
          proofSha256: sha256(cvc5ProofBytes),
          result: 'correct',
        }));
      }
    }
  }
}
if (versionMatches.z3) {
  const countermodel = spawnSync(formalToolPaths.z3, [smtProofPath], { encoding: 'utf8' });
  if (countermodel.status === 0 && countermodel.stdout.startsWith('unsat')) z3ReportBytes = Buffer.from(countermodel.stdout);
}
if (versionMatches.lean) {
  const lean = spawnSync(formalToolPaths.lean, [leanProofPath], { encoding: 'utf8' });
  if (lean.status === 0) leanReceiptBytes = Buffer.from(JSON.stringify({ version: installedVersions.lean, output: lean.stdout }));
}
if (cvc5ProofBytes) writeFileSync(join(buildDir, 'cvc5-proof.cpc'), cvc5ProofBytes);
if (ethosCheckReceiptBytes) writeFileSync(join(buildDir, 'ethos-check.receipt.json'), ethosCheckReceiptBytes);
if (z3ReportBytes) writeFileSync(join(buildDir, 'z3-countermodel-report.txt'), z3ReportBytes);
if (leanReceiptBytes) writeFileSync(join(buildDir, 'lean-proof.receipt.json'), leanReceiptBytes);

const ethosProofVerified = ethosCheckReceiptBytes !== null;
const cvc5ProofVerified = cvc5ProofBytes !== null && ethosProofVerified;
const z3CountermodelAgreement = z3ReportBytes !== null;
const leanSemanticsVerified = leanReceiptBytes !== null;
const solverAgreement = cvc5ProofVerified && z3CountermodelAgreement;
const pilotCredentialKeyAvailable = trustedPilotKeys.keys.some(key => key.status === 'active');
const pilotAuthorized = artifactBundle.artifacts.every(artifact => artifact.reviewStatus === 'PILOT_APPROVED')
  && solverAgreement
  && leanSemanticsVerified
  && pilotCredentialKeyAvailable;
if (pilotAuthorized) throw new Error('unsigned-candidate-build-must-not-authorize-pilot');

const oracleBytes = readFileSync(oracleElf);
const receipt = {
  schemaVersion: 'darwin.sounio.medication-assurance-receipt.v1',
  receiptId: `darwin-rx-envelope-${sha256(wasmBytes).slice(0, 12)}-${merkleRootSha256.slice(0, 12)}`,
  generatedAt: identityBundle.generatedAt,
  intendedUse: artifactBundle.intendedUse,
  hashes: {
    evidenceGraphSha256: sha256(evidenceGraphBytes),
    evidenceGraphMerkleRootSha256: merkleRootSha256,
    artifactBundleSha256: sha256(artifactBundleBytes),
    benchmarkSha256: sha256(benchmarkBytes),
    buildScriptSha256: sha256(readFileSync(fileURLToPath(import.meta.url))),
    identityBundleSha256: sha256(identityBundleBytes),
    reviewSeedSha256: sha256(reviewSeedBytes),
    adversarialAiPolicySha256: sha256(aiPolicyBytes),
    testVectorsSha256: sha256(vectorBytes),
    sounioSourceSha256: sha256(sourceBytes),
    sounioCodegenSha256: sha256(codegenBytes),
    compilerSourceReceiptSha256: sha256(compilerReceipt.bytes),
    compilerSha256,
    wasmSha256: sha256(wasmBytes),
    nativeOracleSha256: sha256(oracleBytes),
    formalToolchainManifestSha256: sha256(formalManifestBytes),
    smtInvariantSha256: sha256(readFileSync(smtProofPath)),
    leanSemanticsSourceSha256: sha256(readFileSync(leanProofPath)),
    cvc5BinarySha256: existsSync(formalToolPaths.cvc5) ? sha256(readFileSync(formalToolPaths.cvc5)) : null,
    ethosBinarySha256: existsSync(formalToolPaths.ethos) ? sha256(readFileSync(formalToolPaths.ethos)) : null,
    z3BinarySha256: existsSync(formalToolPaths.z3) ? sha256(readFileSync(formalToolPaths.z3)) : null,
    leanBinarySha256: existsSync(formalToolPaths.lean) ? sha256(readFileSync(formalToolPaths.lean)) : null,
    cpcDefinitionSha256: existsSync(cpcDefinitionPath) ? sha256(readFileSync(cpcDefinitionPath)) : null,
    cvc5ProofSha256: cvc5ProofBytes ? sha256(cvc5ProofBytes) : null,
    ethosCheckReceiptSha256: ethosCheckReceiptBytes ? sha256(ethosCheckReceiptBytes) : null,
    z3CountermodelReportSha256: z3ReportBytes ? sha256(z3ReportBytes) : null,
    leanProofReceiptSha256: leanReceiptBytes ? sha256(leanReceiptBytes) : null,
    trustedPilotKeysSha256: sha256(trustedPilotKeysBytes),
  },
  abi: {
    inputCount: 16,
    outputCount: 8,
    integerRepresentation: 'signed-i64-little-endian',
    imports: [],
    exports: ['memory', 'evaluate'],
  },
  gates: {
    graphIntegrity: true,
    graphCycleFree: true,
    allEvidenceCurrent: true,
    exactArtifactCount: artifactBundle.artifacts.length === 17,
    exactBenchmarkCount: benchmark.cases.length === 340,
    compilerReconciled: compilerReceipt.validation.compilerReconciled,
    nativeOracleExecuted: true,
    wasmInstantiated: true,
    nativeWasmExactParity: true,
    cvc5ProofVerified,
    ethosProofVerified,
    z3CountermodelAgreement,
    leanSemanticsVerified,
    solverAgreement,
    pilotCredentialKeyAvailable,
    pilotAuthorized,
    productionAuthorized: false,
  },
  testResults,
  installedFormalToolVersions: installedVersions,
  refusalReasons: [
    ...(!cvc5ProofVerified ? ['cvc5-cpc-ethos-proof-unverified'] : []),
    ...(!z3CountermodelAgreement ? ['z3-countermodel-oracle-unavailable'] : []),
    ...(!leanSemanticsVerified ? ['lean-ir-semantics-unverified'] : []),
    ...(!pilotCredentialKeyAvailable ? ['pilot-signing-key-absent'] : []),
    'seventeen-artifacts-evidence-required',
    'independent-human-consensus-absent',
    'pilot-signature-absent',
    'production-authorization-forbidden',
  ],
  signature: null,
};

writeFileSync(join(publicDir, 'medication-assurance.receipt.json'), jsonBytes(receipt));
writeFileSync(join(publicDir, 'compiler-source.receipt.json'), compilerReceipt.bytes);

console.log('SOUNIO_MEDICATION_ENVELOPE_BUILD_VALID');
console.log(JSON.stringify({
  graphNodes: evidenceGraph.nodes.length,
  merkleRootSha256,
  artifacts: artifactBundle.artifacts.length,
  benchmarkCases: benchmark.cases.length,
  nativeWasmExactParity: true,
  pilotAuthorized: false,
  productionAuthorized: false,
  refusalReasons: receipt.refusalReasons,
}, null, 2));
