import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = resolve(dirname(scriptPath), '..');
const canonicalPath = resolve(
  repoRoot,
  'docs/research/no-hidden-gauge-fixing/formal/sounio/no_hidden_gauge_fixing_v1_1.sio',
);
const outputPath = resolve(
  repoRoot,
  'docs/research/no-hidden-gauge-fixing/formal/sounio/no_hidden_gauge_fixing_mutants_v1_1.sio',
);
const mainMarker = '\nfn main() -> i64 with Div {';

export const mutantSuffix = `

// Adversarial test module only. These functions intentionally manufacture a
// singular witness using hidden order, seed, or raw representation. They are
// excluded from the canonical source and canonical WASM export surface.
fn nhgfm_toggle_assignment_bit(assignment: i64, bit: i64) -> i64 {
    if nhgf_contains(assignment, bit) == 1 { return assignment - bit }
    return assignment + bit
}

fn nhgfm_transform_assignment(assignment: i64, gauge: i64) -> i64 {
    var transformed: i64 = assignment
    if nhgf_contains(gauge, 1) == 1 {
        transformed = nhgfm_toggle_assignment_bit(transformed, 1)
    }
    if nhgf_contains(gauge, 2) == 1 {
        transformed = nhgfm_toggle_assignment_bit(transformed, 2)
    }
    if nhgf_contains(gauge, 4) == 1 {
        transformed = nhgfm_toggle_assignment_bit(transformed, 4)
    }
    return transformed
}

fn nhgfm_assignment_mask_bit(assignment: i64) -> i64 {
    if assignment == 0 { return 1 }
    if assignment == 1 { return 2 }
    if assignment == 2 { return 4 }
    if assignment == 3 { return 8 }
    if assignment == 4 { return 16 }
    if assignment == 5 { return 32 }
    if assignment == 6 { return 64 }
    if assignment == 7 { return 128 }
    return 0
}

fn nhgfm_first_solution_from(
    solution_mask: i64, start: i64, offset: i64
) -> i64 with Div {
    if offset >= 8 { return -1 }
    let candidate = (start + offset) % 8
    if nhgf_contains(solution_mask, nhgfm_assignment_mask_bit(candidate)) == 1 {
        return candidate
    }
    return nhgfm_first_solution_from(solution_mask, start, offset + 1)
}

fn nhgfm_selector(
    kind: i64, declared: i64,
    map_ab: i64, map_bc: i64, map_ca: i64
) -> i64 with Div {
    let solutions = nhgf_solution_mask(declared, map_ab, map_bc, map_ca)
    if solutions == 0 { return -1 }
    if kind == 0 { return nhgfm_first_solution_from(solutions, 0, 0) }
    if kind == 1 {
        if nhgf_contains(solutions, 128) == 1 { return 7 }
        if nhgf_contains(solutions, 64) == 1 { return 6 }
        if nhgf_contains(solutions, 32) == 1 { return 5 }
        if nhgf_contains(solutions, 16) == 1 { return 4 }
        if nhgf_contains(solutions, 8) == 1 { return 3 }
        if nhgf_contains(solutions, 4) == 1 { return 2 }
        if nhgf_contains(solutions, 2) == 1 { return 1 }
        return 0
    }
    if kind == 2 { return nhgfm_first_solution_from(solutions, 5, 0) }
    let raw_start = (map_ab + map_bc * 2 + map_ca * 4) % 8
    return nhgfm_first_solution_from(solutions, raw_start, 0)
}

fn nhgfm_diff_at_gauge(
    kind: i64, declared: i64, anchors: i64,
    map_ab: i64, map_bc: i64, map_ca: i64, gauge: i64
) -> i64 with Div {
    if nhgf_gauge_respects_anchors(gauge, anchors) == 0 { return 0 }
    let baseline = nhgfm_selector(kind, declared, map_ab, map_bc, map_ca)
    let transformed = nhgfm_selector(kind, declared,
        nhgf_transform_map_ab(map_ab, gauge),
        nhgf_transform_map_bc(map_bc, gauge),
        nhgf_transform_map_ca(map_ca, gauge))
    if baseline < 0 || transformed < 0 {
        if baseline == transformed { return 0 }
        return 1
    }
    if transformed == nhgfm_transform_assignment(baseline, gauge) { return 0 }
    return 1
}

fn nhgfm_anomaly_mask(
    kind: i64, declared: i64, anchors: i64,
    map_ab: i64, map_bc: i64, map_ca: i64
) -> i64 with Div {
    return
        nhgfm_diff_at_gauge(kind, declared, anchors,
            map_ab, map_bc, map_ca, 1) +
        nhgfm_diff_at_gauge(kind, declared, anchors,
            map_ab, map_bc, map_ca, 2) * 2 +
        nhgfm_diff_at_gauge(kind, declared, anchors,
            map_ab, map_bc, map_ca, 3) * 4 +
        nhgfm_diff_at_gauge(kind, declared, anchors,
            map_ab, map_bc, map_ca, 4) * 8 +
        nhgfm_diff_at_gauge(kind, declared, anchors,
            map_ab, map_bc, map_ca, 5) * 16 +
        nhgfm_diff_at_gauge(kind, declared, anchors,
            map_ab, map_bc, map_ca, 6) * 32 +
        nhgfm_diff_at_gauge(kind, declared, anchors,
            map_ab, map_bc, map_ca, 7) * 64
}

fn main() -> i64 with Div {
    if nhgfm_anomaly_mask(0, 7, 0, 2, 2, 2) == 0 { return 612 }
    if nhgfm_anomaly_mask(1, 7, 0, 2, 2, 2) == 0 { return 613 }
    if nhgfm_anomaly_mask(2, 7, 0, 2, 2, 2) == 0 { return 614 }
    if nhgfm_anomaly_mask(3, 7, 0, 2, 2, 2) == 0 { return 615 }
    return 112
}
`;

export const buildMutantSource = (canonicalSource) => {
  const mainOffset = canonicalSource.lastIndexOf(mainMarker);
  if (mainOffset < 0) throw new Error('canonical Sounio main marker not found');
  return `${canonicalSource.slice(0, mainOffset)}${mutantSuffix}`;
};

if (resolve(process.argv[1] ?? '') === scriptPath) {
  const canonicalSource = readFileSync(canonicalPath, 'utf8');
  mkdirSync(dirname(outputPath), {recursive: true});
  writeFileSync(outputPath, buildMutantSource(canonicalSource));
  process.stdout.write(`${outputPath}\n`);
}
