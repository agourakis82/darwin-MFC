import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = resolve(dirname(scriptPath), '..');
const sourcePath = resolve(
  repoRoot,
  'docs/research/no-hidden-gauge-fixing/formal/sounio/no_hidden_gauge_fixing_v1_1.sio',
);
const outputPath = resolve(
  repoRoot,
  'docs/research/no-hidden-gauge-fixing/formal/transcripts/no_hidden_gauge_fixing_transcript_v1_1.sio',
);
const mainMarker = '\nfn main() -> i64 with Div {';

export const transcriptMain = `

fn nhgf_emit_transcript_record(index: i64) with IO, Mut, Div {
    let map_ca = index % 4
    let map_bc = (index / 4) % 4
    let map_ab = (index / 16) % 4
    let anchors = (index / 64) % 8
    let declared = (index / 512) % 8
    let packed = nhgf_analyze(declared, anchors, map_ab, map_bc, map_ca)
    let stabilizer = nhgf_stabilizer_mask(
        declared, anchors, map_ab, map_bc, map_ca)
    let additional_anchor = nhgf_minimal_additional_anchor(
        declared, anchors, map_ab, map_bc, map_ca)
    let solutions = nhgf_popcount8(
        nhgf_solution_mask(declared, map_ab, map_bc, map_ca))
    let stabilizer_order = nhgf_popcount8(stabilizer)
    print_int(index)
    print("|")
    print_int(packed)
    print("|")
    print_int(stabilizer)
    print("|")
    print_int(additional_anchor)
    print("|")
    print_int(solutions)
    print("|")
    print_int(stabilizer_order)
    print("\\n")
}

fn nhgf_emit_transcript_walk(start: i64, finish: i64) with IO, Mut, Div {
    if start < finish {
        if finish - start == 1 {
            nhgf_emit_transcript_record(start)
        } else {
            let midpoint = (start + finish) / 2
            nhgf_emit_transcript_walk(start, midpoint)
            nhgf_emit_transcript_walk(midpoint, finish)
        }
    }
}

fn main() -> i64 with IO, Mut, Div {
    nhgf_emit_transcript_walk(0, 4096)
    return 0
}
`;

export const buildTranscriptSource = (source) => {
  const mainOffset = source.lastIndexOf(mainMarker);
  if (mainOffset < 0) throw new Error('canonical Sounio main marker not found');
  return `${source.slice(0, mainOffset)}${transcriptMain}`;
};

if (resolve(process.argv[1] ?? '') === scriptPath) {
  const source = readFileSync(sourcePath, 'utf8');
  mkdirSync(dirname(outputPath), {recursive: true});
  writeFileSync(outputPath, buildTranscriptSource(source));
  process.stdout.write(`${outputPath}\n`);
}
