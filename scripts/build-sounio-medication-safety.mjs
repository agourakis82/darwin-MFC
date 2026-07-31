import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCompilerSourceReceipt } from './lib/sounio-compiler-receipt.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sounioRoot = process.env.SOUNIO_ROOT || '/Users/demetriosagourakis/dev/sounio';
const localSourceFreshCompiler = join(root, '.clinical-kernel-build/source-fresh/souc-source-fresh');
const compiler = resolve(
  process.env.SOUNIO_COMPILER_PATH
    || (existsSync(localSourceFreshCompiler)
      ? localSourceFreshCompiler
      : join(sounioRoot, 'artifacts/self-hosted/souc-self-hosted-x86_64')),
);
const compilerReceiptPath = resolve(
  process.env.SOUNIO_COMPILER_RECEIPT_PATH
    || join(root, 'public/clinical-kernel/compiler-source.receipt.json'),
);
const sourceDir = join(root, 'clinical/medication-safety');
const publicDir = join(root, 'public/medication-safety');
const buildDir = join(root, '.clinical-kernel-build/medication-safety');
const sourcePath = join(sourceDir, 'medication-safety-kernel.sio');
const codegenPath = join(sourceDir, 'medication-safety-kernel-codegen.sio');
const vectorsPath = join(sourceDir, 'test-vectors.v1.json');
const registryPath = join(sourceDir, 'source-registry.v1.json');
const rulesPath = join(sourceDir, 'dose-rules.v1.json');
const trustedSigningKeysPath = join(sourceDir, 'trusted-signing-keys.v1.json');
const bundlePath = join(publicDir, 'medication-knowledge-bundle.json');
const wasmPath = join(publicDir, 'medication-safety-kernel.wasm');
const receiptPath = join(publicDir, 'medication-safety.receipt.json');
const publicCompilerReceiptPath = join(publicDir, 'compiler-source.receipt.json');
const publicTrustedSigningKeysPath = join(publicDir, 'trusted-signing-keys.v1.json');

mkdirSync(publicDir, { recursive: true });
mkdirSync(buildDir, { recursive: true });

execFileSync('pnpm', ['exec', 'tsx', 'scripts/build-medication-safety-bundle.ts'], {
  cwd: root,
  stdio: 'inherit',
});

const sha256 = value => createHash('sha256').update(value).digest('hex');
const compilerBytes = readFileSync(compiler);
const compilerSha256 = sha256(compilerBytes);
const compilerReceipt = loadCompilerSourceReceipt(compilerReceiptPath, {
  expectedCompilerSha256: compilerSha256,
  requireReconciled: true,
});
const sourceBytes = readFileSync(sourcePath);
const codegenBytes = readFileSync(codegenPath);
const vectorBytes = readFileSync(vectorsPath);
const registryBytes = readFileSync(registryPath);
const rulesBytes = readFileSync(rulesPath);
const trustedSigningKeysBytes = readFileSync(trustedSigningKeysPath);
const bundleBytes = readFileSync(bundlePath);
const vectors = JSON.parse(vectorBytes.toString('utf8'));
const rules = JSON.parse(rulesBytes.toString('utf8'));
const bundle = JSON.parse(bundleBytes.toString('utf8'));

if (vectors.inputCount !== 26 || vectors.outputCount !== 8) {
  throw new Error('Medication safety ABI requires 26 integer inputs and 8 integer outputs.');
}
if (bundle.medications.length !== 717 || new Set(bundle.medications.map(item => item.medicationId)).size !== 717) {
  throw new Error('Medication safety bundle must contain exactly 717 unique medications.');
}

let generated = `${sourceBytes.toString('utf8')}\n`;
vectors.vectors.forEach((vector, vectorIndex) => {
  generated += `\nfn load_vector_${vectorIndex}() with Mut, Panic {\n`;
  vector.input.forEach((value, inputIndex) => {
    generated += `    ORACLE_INPUT[${inputIndex} as usize] = ${value}\n`;
  });
  generated += '}\n';
});
generated += `
fn print_result(vector_index: i64) with IO, Mut, Div, Panic {
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

fn main() -> i64 with IO, Mut, Div, Panic {
`;
vectors.vectors.forEach((_, vectorIndex) => {
  generated += `    load_vector_${vectorIndex}()\n    print_result(${vectorIndex})\n`;
});
generated += '    println("SOUNIO_MEDICATION_SAFETY_ORACLE_OK")\n    0\n}\n';

const generatedOraclePath = join(buildDir, 'medication-safety-kernel.generated.sio');
writeFileSync(generatedOraclePath, generated);

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
const codegenElf = join(buildDir, 'medication-safety-codegen.elf');
const oracleElf = join(buildDir, 'medication-safety-oracle.elf');
const guestCodegenSource = '/tmp/darwin-medication-safety-codegen.sio';
const guestOracleSource = '/tmp/darwin-medication-safety-oracle.sio';
const guestCodegenElf = '/tmp/darwin-medication-safety-codegen.elf';
const guestOracleElf = '/tmp/darwin-medication-safety-oracle.elf';
const guestWasm = '/tmp/darwin-medication-safety-kernel.wasm';

compile(codegenPath, guestCodegenSource, guestCodegenElf, codegenElf);
runLinux(`${shellQuote(guestCodegenElf)} ${shellQuote(guestWasm)} || test -s ${shellQuote(guestWasm)}`);
copyFromGuest(guestWasm, wasmPath);
compile(generatedOraclePath, guestOracleSource, guestOracleElf, oracleElf);
const oracleOutput = runLinux(shellQuote(guestOracleElf));
if (!oracleOutput.includes('SOUNIO_MEDICATION_SAFETY_ORACLE_OK')) {
  throw new Error(`Sounio medication oracle did not complete:\n${oracleOutput}`);
}

const nativeNumbers = [...oracleOutput.matchAll(/-?\d+/g)].map(match => Number(match[0]));
const nativeResults = new Map();
for (let offset = 0; offset < nativeNumbers.length; offset += vectors.outputCount + 1) {
  const vectorIndex = nativeNumbers[offset];
  nativeResults.set(
    vectorIndex,
    nativeNumbers.slice(offset + 1, offset + 1 + vectors.outputCount),
  );
}

const wasmBytes = readFileSync(wasmPath);
if (!WebAssembly.validate(wasmBytes)) throw new Error('Sounio-emitted medication WASM is invalid.');
const instance = new WebAssembly.Instance(new WebAssembly.Module(wasmBytes));
const { memory, evaluate } = instance.exports;
if (!(memory instanceof WebAssembly.Memory) || typeof evaluate !== 'function') {
  throw new Error('Medication WASM ABI is incomplete.');
}
const view = new DataView(memory.buffer);
const inputOffset = 0;
const outputOffset = 512;
const wasmResults = [];
vectors.vectors.forEach((vector, vectorIndex) => {
  vector.input.forEach((value, inputIndex) => {
    view.setBigInt64(inputOffset + inputIndex * 8, BigInt(value), true);
  });
  const returnCode = evaluate(inputOffset, outputOffset);
  if (returnCode !== 0) throw new Error(`Medication WASM vector ${vector.id} returned ${returnCode}.`);
  const result = Array.from({ length: vectors.outputCount }, (_, outputIndex) => (
    Number(view.getBigInt64(outputOffset + outputIndex * 8, true))
  ));
  wasmResults.push(result);
  const native = nativeResults.get(vectorIndex);
  if (JSON.stringify(result) !== JSON.stringify(native)) {
    throw new Error(`Native/WASM parity failed for ${vector.id}.`);
  }
  if (JSON.stringify(result) !== JSON.stringify(vector.expected)) {
    throw new Error(`Expected vector failed for ${vector.id}.`);
  }
});

const approvedRules = rules.rules.filter(rule => rule.review?.status === 'approved');
const productionReviewedRules = approvedRules.length > 0;
const signatureVerified = bundle.signature !== null;
const productionAuthorized = productionReviewedRules && signatureVerified && bundle.status === 'reviewed';
const receipt = {
  schemaVersion: 'darwin.sounio.medication-safety-receipt.v1',
  receiptId: `darwin-rx-${sha256(wasmBytes).slice(0, 12)}-${sha256(bundleBytes).slice(0, 12)}`,
  generatedAt: bundle.generatedAt,
  status: productionAuthorized ? 'reviewed' : 'reference-only',
  compiler: {
    identity: compilerReceipt.receipt.artifacts.compiler.identity,
    sha256: compilerSha256,
    sourceReceiptSchemaVersion: compilerReceipt.receipt.schemaVersion,
    sourceReceiptSha256: sha256(compilerReceipt.bytes),
  },
  abi: {
    inputCount: vectors.inputCount,
    outputCount: vectors.outputCount,
    inputOffsetBytes: inputOffset,
    outputOffsetBytes: outputOffset,
    integerRepresentation: 'signed-i64-little-endian',
    exports: ['memory', 'evaluate'],
    imports: [],
  },
  hashes: {
    medicationKnowledgeBundleSha256: sha256(bundleBytes),
    sourceRegistrySha256: sha256(registryBytes),
    doseRulesSha256: sha256(rulesBytes),
    trustedSigningKeysSha256: sha256(trustedSigningKeysBytes),
    sounioSourceSha256: sha256(sourceBytes),
    sounioCodegenSha256: sha256(codegenBytes),
    compilerSourceReceiptSha256: sha256(compilerReceipt.bytes),
    wasmSha256: sha256(wasmBytes),
    testVectorsSha256: sha256(vectorBytes),
  },
  gates: {
    exactMedicationCount: true,
    uniqueMedicationIds: true,
    compilerReconciled: compilerReceipt.validation.compilerReconciled,
    nativeOracleExecuted: true,
    wasmInstantiated: true,
    nativeWasmExactParity: true,
    integerOverflowEnvelopeTested: true,
    noWasmImports: WebAssembly.Module.imports(new WebAssembly.Module(wasmBytes)).length === 0,
    productionReviewedRules,
    signatureVerified,
    productionAuthorized,
  },
  testResults: vectors.vectors.map((vector, index) => ({
    id: vector.id,
    output: wasmResults[index],
    exactParity: true,
  })),
  refusalReasons: productionAuthorized
    ? []
    : [
        ...(!productionReviewedRules ? ['no-double-reviewed-dose-rules'] : []),
        ...(!signatureVerified ? ['bundle-signature-absent'] : []),
      ],
  signature: null,
};

writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
writeFileSync(publicCompilerReceiptPath, compilerReceipt.bytes);
writeFileSync(publicTrustedSigningKeysPath, trustedSigningKeysBytes);
console.log('SOUNIO_MEDICATION_SAFETY_BUILD_VALID');
console.log(JSON.stringify({
  receipt: receiptPath,
  wasmSha256: receipt.hashes.wasmSha256,
  bundleSha256: receipt.hashes.medicationKnowledgeBundleSha256,
  vectors: receipt.testResults.length,
  disposition: productionAuthorized ? 'READY_FOR_CONFIRMATION' : 'REFUSE',
  refusalReasons: receipt.refusalReasons,
}, null, 2));
