import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = resolve(dirname(scriptPath), '..');
const sourcePath = resolve(
  repoRoot,
  'docs/research/normative-gauge/formal/sounio/normative_gauge_v1_0.sio',
);
const outputPath = resolve(
  repoRoot,
  'docs/research/normative-gauge/formal/transcripts/normative_gauge_transcript_v1_0.sio',
);
const mainMarker = '\nfn main() -> i64 with Mut, Div {';

export const normativeGaugeTranscriptMain = `

fn ng_emit_transcript_record(index: i64) with IO, Mut, Div {
    let map_ca = index % 4
    let map_bc = (index / 4) % 4
    let map_ab = (index / 16) % 4
    let bound = (index / 64) % 8
    let declared = (index / 512) % 8
    let rich = ng_analyze(declared, bound, map_ab, map_bc, map_ca)
    let repair = nhy_repair_cut(declared, bound, map_ab, map_bc, map_ca)
    let canonical = ng_canonical_representative(map_ab, map_bc, map_ca)
    let orbit = ng_orbit_cardinality(map_ab, map_bc, map_ca)
    print_int(index)
    print("|")
    print_int(rich)
    print("|")
    print_int(repair)
    print("|")
    print_int(canonical)
    print("|")
    print_int(orbit)
    print("\\n")
}

fn ng_emit_transcript_walk(start: i64, finish: i64) with IO, Mut, Div {
    if start < finish {
        if finish - start == 1 {
            ng_emit_transcript_record(start)
        } else {
            let midpoint = (start + finish) / 2
            ng_emit_transcript_walk(start, midpoint)
            ng_emit_transcript_walk(midpoint, finish)
        }
    }
}

fn main() -> i64 with IO, Mut, Div {
    ng_emit_transcript_walk(0, 4096)
    return 0
}
`;

export const buildTranscriptSource = (source) => {
  const mainOffset = source.lastIndexOf(mainMarker);
  if (mainOffset < 0) throw new Error('canonical Sounio main marker not found');
  return `${source.slice(0, mainOffset)}${normativeGaugeTranscriptMain}`;
};

if (resolve(process.argv[1] ?? '') === scriptPath) {
  const source = readFileSync(sourcePath, 'utf8');
  mkdirSync(dirname(outputPath), {recursive: true});
  writeFileSync(outputPath, buildTranscriptSource(source));
  process.stdout.write(`${outputPath}\n`);
}
