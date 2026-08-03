import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = resolve(dirname(scriptPath), '..');
const sourcePath = resolve(
  repoRoot,
  'docs/research/normative-hermeticity/formal/sounio/normative_hermeticity_v0_8.sio',
);
const outputPath = resolve(
  repoRoot,
  'docs/research/normative-hermeticity/formal/transcript/normative_hermeticity_transcript_v0_8.sio',
);
const mainMarker = '\nfn main() -> i64 with Mut, Div {';
export const hermeticityTranscriptMain = `

fn nh_emit_transcript_record(index: i64) with IO, Mut, Div {
    let label2 = (index % 2) + 1
    let label1 = ((index / 2) % 2) + 1
    let label0 = ((index / 4) % 2) + 1
    let resolutions2 = (index / 8) % 8
    let resolutions1 = (index / 64) % 8
    let resolutions0 = (index / 512) % 8
    let bound = (index / 4096) % 8
    let declared = (index / 32768) % 8
    let certificate = nh_certificate(
        declared, bound, resolutions0, resolutions1, resolutions2,
        label0, label1, label2
    )
    let cut = nh_minimal_semantic_cut(
        declared, resolutions0, resolutions1, resolutions2,
        label0, label1, label2
    )
    print_int(index)
    print("|")
    print_int(certificate)
    print("|")
    print_int(cut)
    print("\\n")
}

fn nh_emit_transcript_walk(start: i64, finish: i64) with IO, Mut, Div {
    if start < finish {
        if finish - start == 1 {
            nh_emit_transcript_record(start)
        } else {
            let midpoint = (start + finish) / 2
            nh_emit_transcript_walk(start, midpoint)
            nh_emit_transcript_walk(midpoint, finish)
        }
    }
}

fn main() -> i64 with IO, Mut, Div {
    nh_emit_transcript_walk(0, 262144)
    return 0
}
`;

export const buildTranscriptSource = (source) => {
  const mainOffset = source.lastIndexOf(mainMarker);
  if (mainOffset < 0) {
    throw new Error('canonical Sounio main marker not found');
  }
  return `${source.slice(0, mainOffset)}${hermeticityTranscriptMain}`;
};

if (resolve(process.argv[1] ?? '') === scriptPath) {
  const source = readFileSync(sourcePath, 'utf8');
  mkdirSync(dirname(outputPath), {recursive: true});
  writeFileSync(outputPath, buildTranscriptSource(source));
  process.stdout.write(`${outputPath}\n`);
}
