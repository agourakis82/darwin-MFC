import { createHash } from 'node:crypto';
import {
  createWriteStream,
  readFileSync,
  readdirSync,
  readlinkSync,
  realpathSync,
} from 'node:fs';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const libraryPath = join(root, '.clinical-kernel-build/r-library');
const receiptPath = join(root, '.clinical-kernel-build/public-data/namcs2018-survey-oracle-runtime.json');
const surveyVersion = '4.5';
const sourceUrls = [
  `https://cran.r-project.org/src/contrib/survey_${surveyVersion}.tar.gz`,
  `https://cran.r-project.org/src/contrib/Archive/survey/survey_${surveyVersion}.tar.gz`,
];
const expectedSourceSha256 = '8a2ab01759f9acf6000274255edf00e342dfbf320a39fb76d42594e4d262b519';
const sha256 = value => createHash('sha256').update(value).digest('hex');
const rscriptLookup = spawnSync('which', ['Rscript'], { encoding: 'utf8' });
if (rscriptLookup.status !== 0 || !rscriptLookup.stdout.trim()) throw new Error('rscript-executable-missing');
const rscriptPath = realpathSync(rscriptLookup.stdout.trim());
const rscriptSha256 = sha256(readFileSync(rscriptPath));

function directorySha256(directory) {
  const hash = createHash('sha256');
  const walk = (current, relative) => {
    const entries = readdirSync(current, { withFileTypes: true })
      .sort((left, right) => (left.name < right.name ? -1 : Number(left.name > right.name)));
    for (const entry of entries) {
      const entryRelative = relative ? `${relative}/${entry.name}` : entry.name;
      const entryPath = join(current, entry.name);
      if (entry.isDirectory()) {
        hash.update(`directory\0${entryRelative}\0`);
        walk(entryPath, entryRelative);
      } else if (entry.isSymbolicLink()) {
        hash.update(`symlink\0${entryRelative}\0${readlinkSync(entryPath)}\0`);
      } else {
        hash.update(`file\0${entryRelative}\0`);
        hash.update(readFileSync(entryPath));
      }
    }
  };
  walk(directory, '');
  return hash.digest('hex');
}

async function download(url, destination) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'Darwin-MFC-NAMCS-survey-oracle-bootstrap/1.0' },
    redirect: 'follow',
    signal: AbortSignal.timeout(5 * 60 * 1000),
  });
  if (!response.ok || !response.body) throw new Error(`survey-oracle-source-unreachable:${response.status}`);
  const hash = createHash('sha256');
  let bytes = 0;
  const hashingStream = new Transform({
    transform(chunk, _encoding, callback) {
      hash.update(chunk);
      bytes += chunk.length;
      callback(null, chunk);
    },
  });
  await pipeline(Readable.fromWeb(response.body), hashingStream, createWriteStream(destination));
  return { finalUrl: response.url, bytes, sha256: hash.digest('hex') };
}

function runR(args, label) {
  const result = spawnSync(rscriptPath, args, {
    cwd: root,
    encoding: 'utf8',
    timeout: 15 * 60 * 1000,
  });
  if (result.status !== 0) {
    throw new Error(`${label}:${result.stderr || result.stdout || result.error?.message || result.status}`);
  }
  return result.stdout.trim();
}

const installProgram = String.raw`
args <- commandArgs(trailingOnly=TRUE)
lib <- normalizePath(args[[1]], mustWork=FALSE)
archive <- normalizePath(args[[2]], mustWork=TRUE)
dir.create(lib, recursive=TRUE, showWarnings=FALSE)
.libPaths(c(lib, .libPaths()))
target <- "4.5"
dependencies <- c("minqa", "numDeriv", "mitools", "Rcpp", "RcppArmadillo")
missing <- dependencies[!vapply(dependencies, requireNamespace, logical(1), quietly=TRUE)]
if (length(missing) > 0) {
  install.packages(missing, repos="https://cloud.r-project.org", lib=lib,
                   dependencies=c("Depends", "Imports", "LinkingTo"), type="source")
}
install.packages(archive, repos=NULL, lib=lib, dependencies=FALSE, type="source")
installed <- as.character(packageVersion("survey", lib.loc=lib))
if (!identical(installed, target)) stop(sprintf("survey-version-mismatch:%s", installed))
cat("SURVEY_ORACLE_BOOTSTRAP_VALID\n")
`;

const inventoryProgram = String.raw`
args <- commandArgs(trailingOnly=TRUE)
lib <- normalizePath(args[[1]], mustWork=TRUE)
.libPaths(c(lib, .libPaths()))
packages <- c("survey", "Matrix", "survival", "minqa", "numDeriv", "mitools", "Rcpp", "RcppArmadillo")
cat(paste("R", R.version.string, sep="\t"), "\n", sep="")
for (package in packages) {
  version <- as.character(packageVersion(package))
  path <- normalizePath(find.package(package), mustWork=TRUE)
  cat(paste(package, version, path, sep="\t"), "\n", sep="")
}
`;

await rm(receiptPath, { force: true });
const temporaryDirectory = await mkdtemp(join(tmpdir(), 'darwin-survey-oracle-'));
try {
  await mkdir(libraryPath, { recursive: true });
  const archivePath = join(temporaryDirectory, `survey_${surveyVersion}.tar.gz`);
  let source = null;
  let sourceUrl = null;
  for (const candidate of sourceUrls) {
    try {
      source = await download(candidate, archivePath);
      sourceUrl = candidate;
      break;
    } catch (error) {
      if (candidate === sourceUrls.at(-1)) throw error;
    }
  }
  if (!source || !sourceUrl) throw new Error('survey-oracle-source-unavailable');
  if (source.sha256 !== expectedSourceSha256) {
    throw new Error(`survey-oracle-source-hash-mismatch:${source.sha256}`);
  }
  const installOutput = runR(['-e', installProgram, libraryPath, archivePath], 'survey-oracle-install-failed');
  if (!installOutput.includes('SURVEY_ORACLE_BOOTSTRAP_VALID')) {
    throw new Error('survey-oracle-bootstrap-marker-missing');
  }
  const inventory = runR(['-e', inventoryProgram, libraryPath], 'survey-oracle-inventory-failed')
    .split(/\r?\n/)
    .filter(Boolean);
  const [runtimeLine, ...packageLines] = inventory;
  const packages = packageLines.map(line => {
    const [name, version, path] = line.split('\t');
    return {
      name,
      version,
      path,
      ...(name === 'survey' ? { treeSha256: directorySha256(path) } : {}),
    };
  });
  if (!packages.some(pkg => pkg.name === 'survey' && pkg.version === surveyVersion)) {
    throw new Error('survey-oracle-inventory-version-mismatch');
  }
  const scriptBytes = readFileSync(fileURLToPath(import.meta.url));
  const receipt = {
    schemaVersion: 'darwin.sounio.namcs2018-survey-oracle-runtime.v1',
    status: 'pinned-oracle-ready',
    generatedAt: new Date().toISOString(),
    runtime: {
      version: runtimeLine?.split('\t').slice(1).join('\t') ?? null,
      rscriptPath,
      rscriptSha256,
    },
    libraryPath,
    source: {
      package: 'survey',
      version: surveyVersion,
      canonicalUrl: sourceUrl,
      candidateUrls: sourceUrls,
      resolvedUrl: source.finalUrl,
      bytes: source.bytes,
      sha256: source.sha256,
    },
    installedPackages: packages,
    bootstrapScriptSha256: sha256(scriptBytes),
    installProgramSha256: sha256(Buffer.from(installProgram)),
  };
  await mkdir(dirname(receiptPath), { recursive: true });
  await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
  const persisted = await readFile(receiptPath);
  console.log(JSON.stringify({ ...receipt, receiptSha256: sha256(persisted) }, null, 2));
  console.log('NAMCS2018_SURVEY_ORACLE_BOOTSTRAP_VALID');
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}
