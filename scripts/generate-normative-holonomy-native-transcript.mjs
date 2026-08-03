import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = resolve(dirname(scriptPath), '..');
const sourcePath = resolve(
  repoRoot,
  'docs/research/normative-holonomy/formal/sounio/normative_holonomy_v0_9.sio',
);
const outputPath = resolve(
  repoRoot,
  'docs/research/normative-holonomy/formal/transcripts/normative_holonomy_transcript_v0_9.sio',
);
const mainMarker = '\nfn main() -> i64 with Mut, Div {';

export const normativeHolonomyTranscriptMain = `

fn nhy_emit_transcript_record(index: i64) with IO, Mut, Div {
    let map_ca = index % 4
    let map_bc = (index / 4) % 4
    let map_ab = (index / 16) % 4
    let bound = (index / 64) % 8
    let declared = (index / 512) % 8
    let packed = nhy_analyze(declared, bound, map_ab, map_bc, map_ca)
    let repair = nhy_repair_cut(declared, bound, map_ab, map_bc, map_ca)
    print_int(index)
    print("|")
    print_int(packed)
    print("|")
    print_int(repair)
    print("\\n")
}

fn nhy_emit_transcript_walk(start: i64, finish: i64) with IO, Mut, Div {
    if start < finish {
        if finish - start == 1 {
            nhy_emit_transcript_record(start)
        } else {
            let midpoint = (start + finish) / 2
            nhy_emit_transcript_walk(start, midpoint)
            nhy_emit_transcript_walk(midpoint, finish)
        }
    }
}

fn main() -> i64 with IO, Mut, Div {
    nhy_emit_transcript_walk(0, 4096)
    return 0
}
`;

export const buildTranscriptSource = (source) => {
  const mainOffset = source.lastIndexOf(mainMarker);
  if (mainOffset < 0) throw new Error('canonical Sounio main marker not found');
  return `${source.slice(0, mainOffset)}${normativeHolonomyTranscriptMain}`;
};

if (resolve(process.argv[1] ?? '') === scriptPath) {
  const source = readFileSync(sourcePath, 'utf8');
  mkdirSync(dirname(outputPath), {recursive: true});
  writeFileSync(outputPath, buildTranscriptSource(source));
  process.stdout.write(`${outputPath}\n`);
}
