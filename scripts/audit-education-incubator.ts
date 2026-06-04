import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

type OutputFormat = 'json' | 'summary';

interface ClaimHit {
  file: string;
  line: number;
  text: string;
  pattern: string;
}

interface ManifestSummary {
  file: string;
  exists: boolean;
  name?: string;
  version?: string;
  scripts?: string[];
  dependencies?: number;
  devDependencies?: number;
  duplicateKeys?: string[];
}

const root = process.cwd();

const incubatorPredicates = [
  (file: string) => file.startsWith('medical-education-sota/'),
  (file: string) => file.startsWith('incubator/education-sota/'),
  (file: string) => file.startsWith('lib/medical-education/'),
  (file: string) => file.startsWith('lib/medical-education-sota/'),
  (file: string) => file.startsWith('app/[locale]/learn/diagnosis/'),
  (file: string) => file.startsWith('app/components/SOTA/'),
  (file: string) => file.startsWith('lib/api/sota-'),
  (file: string) => file === 'lib/simple-question-system.ts',
  (file: string) => file === 'lib/store/sotaStore.ts',
  (file: string) => file === 'lib/hooks/useSotaWebSocket.ts',
  (file: string) => file === 'lib/types/sota.ts',
  (file: string) => file === 'lib/types/medical-residency.ts',
  (file: string) => file.startsWith('scripts/dados-exemplo-questoes'),
  (file: string) => file.startsWith('scripts/demo-gerador-questoes'),
  (file: string) => file.startsWith('scripts/simple-question-generator'),
  (file: string) => file === 'public/demo-data.json',
  (file: string) => file === 'public/demo-questoes-medicas.html',
  (file: string) => file === 'github-qti-medical-search.png',
  (file: string) => file === 'qti-ims-global-main.png',
];

const sourceFiles = [
  'incubator/education-sota/app-routes/learn-diagnosis/page.tsx',
  'incubator/education-sota/app-routes/learn-diagnosis/DiagnosisClient.tsx',
  'incubator/education-sota/app-components/SOTA',
  'incubator/education-sota/lib/api/sota-client.ts',
  'incubator/education-sota/lib/api/sota-endpoints.ts',
  'incubator/education-sota/lib/api/sota-transformers.ts',
  'incubator/education-sota/lib/api/sota-websocket.ts',
  'incubator/education-sota/lib/hooks/useSotaWebSocket.ts',
  'incubator/education-sota/lib/store/sotaStore.ts',
  'incubator/education-sota/lib/types/sota.ts',
  'incubator/education-sota/lib/types/medical-residency.ts',
  'incubator/education-sota/lib/medical-education',
  'incubator/education-sota/lib/medical-education-sota',
  'incubator/education-sota/scripts/dados-exemplo-questoes.ts',
  'incubator/education-sota/scripts/demo-gerador-questoes.ts',
  'incubator/education-sota/scripts/simple-question-generator.ts',
  'incubator/education-sota/scripts/simple-question-generator.js',
  'incubator/education-sota/public/demo-data.json',
  'incubator/education-sota/public/demo-questoes-medicas.html',
  'incubator/education-sota/assets/github-qti-medical-search.png',
  'incubator/education-sota/assets/qti-ims-global-main.png',
  'incubator/education-sota/packages/medical-education-sota',
];

const claimPatterns = [
  /mais avancad[ao]/i,
  /mais avançad[ao]/i,
  /state-of-the-art/i,
  /\bSOTA\b/,
  /revolucion/i,
  /GPT-?4/i,
  /GPT-?5/i,
  /Claude-?4/i,
  /blockchain/i,
  /VR\/AR/i,
  /federated learning/i,
  /aprendizado federado/i,
  /LGPD\/GDPR.*total/i,
  /conformidade.*total/i,
  /validacao medica automatica/i,
  /validação médica automática/i,
];

function run(command: string): string {
  return execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trimEnd();
}

function normalize(file: string): string {
  return file.split(path.sep).join('/');
}

function listFiles(target: string): string[] {
  const absolute = path.join(root, target);
  if (!fs.existsSync(absolute)) return [];

  const stat = fs.statSync(absolute);
  if (stat.isFile()) return [target];

  return fs
    .readdirSync(absolute, { withFileTypes: true })
    .flatMap((entry) => {
      const child = normalize(path.join(target, entry.name));
      if (entry.isDirectory()) return listFiles(child);
      return child;
    })
    .filter((file) => !file.includes('/node_modules/') && !file.includes('/dist/'));
}

function parseArgs(args: string[]): OutputFormat {
  const formatArg = args.find((arg) => arg.startsWith('--format='));
  if (!formatArg) return 'json';

  const format = formatArg.slice('--format='.length);
  if (format === 'json' || format === 'summary') return format;
  throw new Error(`Unsupported format: ${format}`);
}

function getChangedIncubatorFiles(): string[] {
  const status = run('git status --porcelain -uall');
  if (!status.trim()) return [];

  return status
    .split('\n')
    .map((line) => line.slice(3))
    .map((file) => (file.includes(' -> ') ? file.split(' -> ').at(-1)! : file))
    .map(normalize)
    .filter((file) => incubatorPredicates.some((predicate) => predicate(file)))
    .sort();
}

function findDuplicateObjectKeys(filePath: string, key: 'dependencies' | 'devDependencies'): string[] {
  const absolute = path.join(root, filePath);
  if (!fs.existsSync(absolute)) return [];

  const lines = fs.readFileSync(absolute, 'utf8').split('\n');
  const start = lines.findIndex((line) => line.includes(`"${key}"`) && line.includes('{'));
  if (start === -1) return [];

  const seen = new Set<string>();
  const duplicates = new Set<string>();
  let depth = 0;

  for (let index = start; index < lines.length; index++) {
    const line = lines[index];
    for (const char of line) {
      if (char === '{') depth++;
      if (char === '}') depth--;
    }

    const match = line.match(/^\s*"([^"]+)":/);
    if (match && index !== start) {
      const dependency = match[1];
      if (seen.has(dependency)) duplicates.add(dependency);
      seen.add(dependency);
    }

    if (index > start && depth <= 0) break;
  }

  return [...duplicates].sort();
}

function summarizeManifest(file: string): ManifestSummary {
  const absolute = path.join(root, file);
  if (!fs.existsSync(absolute)) return { file, exists: false };

  const parsed = JSON.parse(fs.readFileSync(absolute, 'utf8')) as {
    name?: string;
    version?: string;
    scripts?: Record<string, string>;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };

  return {
    file,
    exists: true,
    name: parsed.name,
    version: parsed.version,
    scripts: Object.keys(parsed.scripts || {}).sort(),
    dependencies: Object.keys(parsed.dependencies || {}).length,
    devDependencies: Object.keys(parsed.devDependencies || {}).length,
    duplicateKeys: [
      ...findDuplicateObjectKeys(file, 'dependencies'),
      ...findDuplicateObjectKeys(file, 'devDependencies'),
    ],
  };
}

function readIfExists(file: string): string {
  const absolute = path.join(root, file);
  return fs.existsSync(absolute) ? fs.readFileSync(absolute, 'utf8') : '';
}

function collectClaimHits(files: string[]): ClaimHit[] {
  const textExtensions = new Set(['.ts', '.tsx', '.js', '.json', '.md', '.html', '.yml', '.yaml', '.env', '']);

  return files.flatMap((file) => {
    const ext = path.extname(file);
    if (!textExtensions.has(ext)) return [];

    const absolute = path.join(root, file);
    if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) return [];

    return fs
      .readFileSync(absolute, 'utf8')
      .split('\n')
      .flatMap((line, index) =>
        claimPatterns
          .filter((pattern) => pattern.test(line))
          .map((pattern) => ({
            file,
            line: index + 1,
            text: line.trim().slice(0, 220),
            pattern: pattern.source,
          }))
      );
  });
}

const format = parseArgs(process.argv.slice(2));
const changedFiles = getChangedIncubatorFiles();
const allIncubatorFiles = [...new Set(sourceFiles.flatMap(listFiles))].sort();
const packageManifests = [
  'incubator/education-sota/packages/medical-education-sota/package.json',
  'incubator/education-sota/packages/medical-education-sota/backend/package.json',
  'incubator/education-sota/packages/medical-education-sota/frontend/package.json',
].map(summarizeManifest);

const endpointsSource = readIfExists('incubator/education-sota/lib/api/sota-endpoints.ts');
const diagnosisSource = readIfExists('incubator/education-sota/app-routes/learn-diagnosis/DiagnosisClient.tsx');
const tsconfigSource = readIfExists('tsconfig.json');
const mainPackageSource = readIfExists('package.json');
const translationLocales = fs.existsSync(path.join(root, 'messages'))
  ? fs.readdirSync(path.join(root, 'messages')).filter((entry) =>
      fs.existsSync(path.join(root, 'messages', entry, 'common.json'))
    )
  : [];

const commonTranslationsWithSota = translationLocales.filter((locale) => {
  const file = path.join(root, 'messages', locale, 'common.json');
  const parsed = JSON.parse(fs.readFileSync(file, 'utf8')) as Record<string, unknown>;
  return Boolean(parsed.sota);
});

const routeFiles = [
  'incubator/education-sota/app-routes/learn-diagnosis/page.tsx',
  'incubator/education-sota/app-routes/learn-diagnosis/DiagnosisClient.tsx',
].filter((file) => fs.existsSync(path.join(root, file)));

const routeDirectoryExists = fs.existsSync(path.join(root, 'app/[locale]/learn/diagnosis'));
const incubatedRouteDirectoryExists = fs.existsSync(
  path.join(root, 'incubator/education-sota/app-routes/learn-diagnosis')
);

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    changedFiles: changedFiles.length,
    sourceFiles: allIncubatorFiles.length,
    routeFiles: routeFiles.length,
    packageManifests: packageManifests.filter((manifest) => manifest.exists).length,
    promotionalClaimHits: collectClaimHits(allIncubatorFiles).length,
  },
  boundaries: {
    separatePackagePresent: fs.existsSync(
      path.join(root, 'incubator/education-sota/packages/medical-education-sota/package.json')
    ),
    excludedFromRootTypecheck:
      tsconfigSource.includes('"incubator"') &&
      !fs.existsSync(path.join(root, 'medical-education-sota')) &&
      !fs.existsSync(path.join(root, 'lib/medical-education')) &&
      !fs.existsSync(path.join(root, 'lib/medical-education-sota')),
    rootPackageDependsOnIncubatorWorkspace: mainPackageSource.includes('"workspaces"') &&
      mainPackageSource.includes('medical-education-sota'),
    staticExportCompatibleByDefault:
      endpointsSource.includes("process.env.NEXT_PUBLIC_SOTA_ENABLED === 'true'") &&
      !endpointsSource.includes("SOTA_ENABLED = true"),
  },
  backendContract: {
    usesFeatureFlag: endpointsSource.includes('NEXT_PUBLIC_SOTA_ENABLED'),
    apiUrlEnv: endpointsSource.includes('NEXT_PUBLIC_SOTA_API_URL'),
    wsUrlEnv: endpointsSource.includes('NEXT_PUBLIC_SOTA_WS_URL'),
    apiDefault: endpointsSource.match(/SOTA_API_BASE_URL = [^;]+/)?.[0] || null,
    wsDefault: endpointsSource.match(/SOTA_WS_URL = [^;]+/)?.[0] || null,
    singleOriginForApiAndWs: endpointsSource.includes('NEXT_PUBLIC_SOTA_API_URL') &&
      !endpointsSource.includes('NEXT_PUBLIC_SOTA_WS_URL'),
  },
  appSurface: {
    routeFiles,
    routeDirectoryExists,
    incubatedRouteDirectoryExists,
    participatesInStaticExportWhenPresent: routeDirectoryExists,
    commonTranslationLocales: translationLocales.sort(),
    commonTranslationsWithSota: commonTranslationsWithSota.sort(),
    hasMockDarwinToken: diagnosisSource.includes('demo-darwin-token'),
    pushesUnlocalizedAdaptiveRoute: diagnosisSource.includes("router.push('/learn/adaptive')"),
    linksUnlocalizedLearnRoute: diagnosisSource.includes('href="/learn"'),
  },
  packageManifests,
  claims: collectClaimHits(allIncubatorFiles).slice(0, 80),
  changedFiles,
  recommendation: {
    stagingCut: 'Corte 5 - Education/SOTA Incubator quarantine',
    promoteToClinicalApp: false,
    rationale: [
      'The code is an education/adaptive-learning product surface, not a clinical calculator surface.',
      'The backend contract is optional by feature flag, but currently uses independent API and WebSocket origins.',
      'The app route still contains a demo token and education framing, so it should remain out of the clinical app core.',
      'Claims should be rewritten as experimental/incubator claims before any external publication.',
    ],
  },
};

if (format === 'summary') {
  console.log(`changed files: ${report.summary.changedFiles}`);
  console.log(`source files: ${report.summary.sourceFiles}`);
  console.log(`route files: ${report.summary.routeFiles}`);
  console.log(`package manifests: ${report.summary.packageManifests}`);
  console.log(`promotional claim hits: ${report.summary.promotionalClaimHits}`);
  console.log(`separate package present: ${report.boundaries.separatePackagePresent}`);
  console.log(`excluded from root type-check: ${report.boundaries.excludedFromRootTypecheck}`);
  console.log(`root package depends on incubator workspace: ${report.boundaries.rootPackageDependsOnIncubatorWorkspace}`);
  console.log(`static export compatible by default: ${report.boundaries.staticExportCompatibleByDefault}`);
  console.log(`single API/WS origin: ${report.backendContract.singleOriginForApiAndWs}`);
  console.log(`has mock token in app route: ${report.appSurface.hasMockDarwinToken}`);
  console.log(`unlocalized adaptive route push: ${report.appSurface.pushesUnlocalizedAdaptiveRoute}`);
  console.log(`unlocalized learn link: ${report.appSurface.linksUnlocalizedLearnRoute}`);
  console.log(`route physically present in App Router: ${report.appSurface.routeDirectoryExists}`);
  console.log(`route archived outside App Router: ${report.appSurface.incubatedRouteDirectoryExists}`);
  console.log(`participates in local static export when present: ${report.appSurface.participatesInStaticExportWhenPresent}`);
  for (const manifest of report.packageManifests) {
    const duplicates = manifest.duplicateKeys?.length ? manifest.duplicateKeys.join(', ') : 'none';
    console.log(`manifest ${manifest.file}: exists=${manifest.exists} duplicateKeys=${duplicates}`);
  }
} else {
  console.log(JSON.stringify(report, null, 2));
}
