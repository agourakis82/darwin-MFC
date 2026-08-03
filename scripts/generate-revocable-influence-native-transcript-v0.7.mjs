import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = resolve(dirname(scriptPath), '..');
const sourcePath = resolve(
  repoRoot,
  'docs/research/revocable-normative-influence/formal/sounio/revocable_influence_v0_7.sio',
);
const outputPath = resolve(
  repoRoot,
  'docs/research/revocable-normative-influence/formal/transcript/revocable_influence_transcript_v0_7.sio',
);
const mainMarker = '\nfn main() -> i64 with Mut, Div {';
export const transcriptMain = `

fn ri_emit_transcript_record(index: i64) with IO, Mut, Div {
    let recommendation2 = (index % 2) + 1
    let recommendation1 = ((index / 2) % 2) + 1
    let recommendation0 = ((index / 4) % 2) + 1
    let answers2 = (index / 8) % 8
    let answers1 = (index / 64) % 8
    let answers0 = (index / 512) % 8
    let current = (index / 4096) % 8
    let prior = (index / 32768) % 8
    let certificate = ri_certificate(
        prior, current, answers0, answers1, answers2,
        recommendation0, recommendation1, recommendation2
    )
    let cut = ri_minimal_revocation_cut(
        prior, answers0, answers1, answers2,
        recommendation0, recommendation1, recommendation2
    )
    print_int(index)
    print("|")
    print_int(certificate)
    print("|")
    print_int(cut)
    print("\\n")
}

fn ri_emit_transcript_walk(start: i64, finish: i64) with IO, Mut, Div {
    if start < finish {
        if finish - start == 1 {
            ri_emit_transcript_record(start)
        } else {
            let midpoint = (start + finish) / 2
            ri_emit_transcript_walk(start, midpoint)
            ri_emit_transcript_walk(midpoint, finish)
        }
    }
}

fn main() -> i64 with IO, Mut, Div {
    ri_emit_transcript_walk(0, 262144)
    return 0
}
`;

export const buildTranscriptSource = (source) => {
  const mainOffset = source.lastIndexOf(mainMarker);
  if (mainOffset < 0) {
    throw new Error('canonical Sounio main marker not found');
  }
  return `${source.slice(0, mainOffset)}${transcriptMain}`;
};

if (resolve(process.argv[1] ?? '') === scriptPath) {
  const source = readFileSync(sourcePath, 'utf8');
  mkdirSync(dirname(outputPath), {recursive: true});
  writeFileSync(outputPath, buildTranscriptSource(source));
  process.stdout.write(`${outputPath}\n`);
}
