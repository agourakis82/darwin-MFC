import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = resolve(dirname(scriptPath), '..');
const parentPath = resolve(
  repoRoot,
  'docs/research/normative-holonomy/formal/sounio/normative_holonomy_v0_9.sio',
);
const outputPath = resolve(
  repoRoot,
  'docs/research/normative-gauge/formal/sounio/normative_gauge_v1_0.sio',
);
const mainMarker = '\nfn main() -> i64 with Mut, Div {';

export const normativeGaugeExtension = `

// Darwin Normative Gauge v1.0.
// A local Boolean gauge uses bits A=1, B=2, C=4. Edge maps transform by
// conjugation: T'_uv(x') = g_v XOR T_uv(g_u XOR x').

fn ng_xor(left: i64, right: i64) -> i64 {
    if left == right { return 0 }
    return 1
}

fn ng_gauge_bit(gauge: i64, vertex: i64) -> i64 {
    if (gauge & vertex) == vertex { return 1 }
    return 0
}

fn ng_transform_map(map_code: i64, source_flip: i64, target_flip: i64) -> i64 with Div {
    let output_zero = ng_xor(target_flip,
        nhy_apply_map(map_code, ng_xor(0, source_flip)))
    let output_one = ng_xor(target_flip,
        nhy_apply_map(map_code, ng_xor(1, source_flip)))
    return output_zero + output_one * 2
}

fn ng_transform_map_ab(map_code: i64, gauge: i64) -> i64 with Div {
    return ng_transform_map(map_code, ng_gauge_bit(gauge, 1), ng_gauge_bit(gauge, 2))
}

fn ng_transform_map_bc(map_code: i64, gauge: i64) -> i64 with Div {
    return ng_transform_map(map_code, ng_gauge_bit(gauge, 2), ng_gauge_bit(gauge, 4))
}

fn ng_transform_map_ca(map_code: i64, gauge: i64) -> i64 with Div {
    return ng_transform_map(map_code, ng_gauge_bit(gauge, 4), ng_gauge_bit(gauge, 1))
}

fn ng_encode_maps(map_ab: i64, map_bc: i64, map_ca: i64) -> i64 {
    return map_ab * 16 + map_bc * 4 + map_ca
}

fn ng_transformed_encoding(
    map_ab: i64, map_bc: i64, map_ca: i64, gauge: i64
) -> i64 with Div {
    return ng_encode_maps(
        ng_transform_map_ab(map_ab, gauge),
        ng_transform_map_bc(map_bc, gauge),
        ng_transform_map_ca(map_ca, gauge)
    )
}

fn ng_minimum(left: i64, right: i64) -> i64 {
    if left < right { return left }
    return right
}

fn ng_canonical_representative(
    map_ab: i64, map_bc: i64, map_ca: i64
) -> i64 with Div {
    var best: i64 = ng_transformed_encoding(map_ab, map_bc, map_ca, 0)
    best = ng_minimum(best, ng_transformed_encoding(map_ab, map_bc, map_ca, 1))
    best = ng_minimum(best, ng_transformed_encoding(map_ab, map_bc, map_ca, 2))
    best = ng_minimum(best, ng_transformed_encoding(map_ab, map_bc, map_ca, 3))
    best = ng_minimum(best, ng_transformed_encoding(map_ab, map_bc, map_ca, 4))
    best = ng_minimum(best, ng_transformed_encoding(map_ab, map_bc, map_ca, 5))
    best = ng_minimum(best, ng_transformed_encoding(map_ab, map_bc, map_ca, 6))
    best = ng_minimum(best, ng_transformed_encoding(map_ab, map_bc, map_ca, 7))
    return best
}

fn ng_seen_before(
    encoding: i64, gauge: i64,
    map_ab: i64, map_bc: i64, map_ca: i64
) -> i64 with Div {
    if gauge <= 0 { return 0 }
    let previous = gauge - 1
    if encoding == ng_transformed_encoding(map_ab, map_bc, map_ca, previous) {
        return 1
    }
    return ng_seen_before(encoding, previous, map_ab, map_bc, map_ca)
}

fn ng_orbit_cardinality_walk(
    gauge: i64, map_ab: i64, map_bc: i64, map_ca: i64
) -> i64 with Div {
    if gauge >= 8 { return 0 }
    let encoding = ng_transformed_encoding(map_ab, map_bc, map_ca, gauge)
    var contribution: i64 = 1
    if ng_seen_before(encoding, gauge, map_ab, map_bc, map_ca) == 1 {
        contribution = 0
    }
    return contribution + ng_orbit_cardinality_walk(
        gauge + 1, map_ab, map_bc, map_ca
    )
}

fn ng_orbit_cardinality(map_ab: i64, map_bc: i64, map_ca: i64) -> i64 with Div {
    return ng_orbit_cardinality_walk(0, map_ab, map_bc, map_ca)
}

fn ng_analyzer_diff_at_gauge(
    declared: i64, bound: i64,
    map_ab: i64, map_bc: i64, map_ca: i64, gauge: i64
) -> i64 with Div {
    let baseline = nhy_analyze(declared, bound, map_ab, map_bc, map_ca)
    let transformed = nhy_analyze(
        declared, bound,
        ng_transform_map_ab(map_ab, gauge),
        ng_transform_map_bc(map_bc, gauge),
        ng_transform_map_ca(map_ca, gauge)
    )
    if baseline == transformed { return 0 }
    return 1
}

fn ng_repair_diff_at_gauge(
    declared: i64, bound: i64,
    map_ab: i64, map_bc: i64, map_ca: i64, gauge: i64
) -> i64 with Div {
    let baseline = nhy_repair_cut(declared, bound, map_ab, map_bc, map_ca)
    let transformed = nhy_repair_cut(
        declared, bound,
        ng_transform_map_ab(map_ab, gauge),
        ng_transform_map_bc(map_bc, gauge),
        ng_transform_map_ca(map_ca, gauge)
    )
    if baseline == transformed { return 0 }
    return 1
}

fn ng_certificate_diff_at_gauge(
    map_ab: i64, map_bc: i64, map_ca: i64, gauge: i64
) -> i64 with Div {
    let transformed_ab = ng_transform_map_ab(map_ab, gauge)
    let transformed_bc = ng_transform_map_bc(map_bc, gauge)
    let transformed_ca = ng_transform_map_ca(map_ca, gauge)
    if ng_canonical_representative(map_ab, map_bc, map_ca) !=
       ng_canonical_representative(transformed_ab, transformed_bc, transformed_ca) {
        return 1
    }
    if ng_orbit_cardinality(map_ab, map_bc, map_ca) !=
       ng_orbit_cardinality(transformed_ab, transformed_bc, transformed_ca) {
        return 1
    }
    return 0
}

fn ng_analyzer_anomaly_mask(
    declared: i64, bound: i64,
    map_ab: i64, map_bc: i64, map_ca: i64
) -> i64 with Div {
    if nhy_abi_valid(declared, bound, map_ab, map_bc, map_ca) == 0 { return 0 }
    return
        ng_analyzer_diff_at_gauge(declared, bound, map_ab, map_bc, map_ca, 1) +
        ng_analyzer_diff_at_gauge(declared, bound, map_ab, map_bc, map_ca, 2) * 2 +
        ng_analyzer_diff_at_gauge(declared, bound, map_ab, map_bc, map_ca, 3) * 4 +
        ng_analyzer_diff_at_gauge(declared, bound, map_ab, map_bc, map_ca, 4) * 8 +
        ng_analyzer_diff_at_gauge(declared, bound, map_ab, map_bc, map_ca, 5) * 16 +
        ng_analyzer_diff_at_gauge(declared, bound, map_ab, map_bc, map_ca, 6) * 32 +
        ng_analyzer_diff_at_gauge(declared, bound, map_ab, map_bc, map_ca, 7) * 64
}

fn ng_repair_anomaly_mask(
    declared: i64, bound: i64,
    map_ab: i64, map_bc: i64, map_ca: i64
) -> i64 with Div {
    if nhy_abi_valid(declared, bound, map_ab, map_bc, map_ca) == 0 { return 0 }
    return
        ng_repair_diff_at_gauge(declared, bound, map_ab, map_bc, map_ca, 1) +
        ng_repair_diff_at_gauge(declared, bound, map_ab, map_bc, map_ca, 2) * 2 +
        ng_repair_diff_at_gauge(declared, bound, map_ab, map_bc, map_ca, 3) * 4 +
        ng_repair_diff_at_gauge(declared, bound, map_ab, map_bc, map_ca, 4) * 8 +
        ng_repair_diff_at_gauge(declared, bound, map_ab, map_bc, map_ca, 5) * 16 +
        ng_repair_diff_at_gauge(declared, bound, map_ab, map_bc, map_ca, 6) * 32 +
        ng_repair_diff_at_gauge(declared, bound, map_ab, map_bc, map_ca, 7) * 64
}

fn ng_certificate_anomaly_mask(
    map_ab: i64, map_bc: i64, map_ca: i64
) -> i64 with Div {
    return
        ng_certificate_diff_at_gauge(map_ab, map_bc, map_ca, 1) +
        ng_certificate_diff_at_gauge(map_ab, map_bc, map_ca, 2) * 2 +
        ng_certificate_diff_at_gauge(map_ab, map_bc, map_ca, 3) * 4 +
        ng_certificate_diff_at_gauge(map_ab, map_bc, map_ca, 4) * 8 +
        ng_certificate_diff_at_gauge(map_ab, map_bc, map_ca, 5) * 16 +
        ng_certificate_diff_at_gauge(map_ab, map_bc, map_ca, 6) * 32 +
        ng_certificate_diff_at_gauge(map_ab, map_bc, map_ca, 7) * 64
}

fn ng_pack(
    disposition: i64, inherited: i64, canonical: i64, orbit: i64,
    analyzer_anomaly: i64, repair_anomaly: i64, certificate_anomaly: i64
) -> i64 {
    return disposition + inherited * 8 + canonical * 2048 + orbit * 131072 +
        analyzer_anomaly * 2097152 + repair_anomaly * 268435456 +
        certificate_anomaly * 34359738368
}

fn ng_analyze(
    declared: i64, bound: i64,
    map_ab: i64, map_bc: i64, map_ca: i64
) -> i64 with Div {
    if nhy_abi_valid(declared, bound, map_ab, map_bc, map_ca) == 0 { return 0 }
    let inherited = nhy_analyze(declared, bound, map_ab, map_bc, map_ca)
    let canonical = ng_canonical_representative(map_ab, map_bc, map_ca)
    let orbit = ng_orbit_cardinality(map_ab, map_bc, map_ca)
    let analyzer_anomaly = ng_analyzer_anomaly_mask(
        declared, bound, map_ab, map_bc, map_ca
    )
    let repair_anomaly = ng_repair_anomaly_mask(
        declared, bound, map_ab, map_bc, map_ca
    )
    let certificate_anomaly = ng_certificate_anomaly_mask(map_ab, map_bc, map_ca)
    var disposition: i64 = inherited % 8
    if analyzer_anomaly != 0 || repair_anomaly != 0 || certificate_anomaly != 0 {
        disposition = 6
    }
    return ng_pack(
        disposition, inherited, canonical, orbit,
        analyzer_anomaly, repair_anomaly, certificate_anomaly
    )
}

// Six deliberately coordinate-sensitive analyzers. They are not production
// alternatives; they are falsifiers that the gauge suite must detect.
fn ng_mutant_output(
    mutant: i64, declared: i64, bound: i64,
    map_ab: i64, map_bc: i64, map_ca: i64
) -> i64 with Div {
    let inherited = nhy_analyze(declared, bound, map_ab, map_bc, map_ca)
    if mutant == 1 { return inherited * 4 + map_ab }
    if mutant == 2 { return inherited * 4 + map_bc }
    if mutant == 3 { return inherited * 4 + map_ca }
    if mutant == 4 { return inherited * 64 + ng_encode_maps(map_ab, map_bc, map_ca) }
    if mutant == 5 { return inherited * 2 + nhy_apply_map(map_ab, 0) }
    if mutant == 6 {
        return inherited * 2 +
            nhy_assignment_satisfies(declared, map_ab, map_bc, map_ca, 0)
    }
    return inherited
}

fn ng_mutant_diff_at_gauge(
    mutant: i64, declared: i64, bound: i64,
    map_ab: i64, map_bc: i64, map_ca: i64, gauge: i64
) -> i64 with Div {
    let baseline = ng_mutant_output(
        mutant, declared, bound, map_ab, map_bc, map_ca
    )
    let transformed = ng_mutant_output(
        mutant, declared, bound,
        ng_transform_map_ab(map_ab, gauge),
        ng_transform_map_bc(map_bc, gauge),
        ng_transform_map_ca(map_ca, gauge)
    )
    if baseline == transformed { return 0 }
    return 1
}

fn ng_mutant_anomaly_mask(
    mutant: i64, declared: i64, bound: i64,
    map_ab: i64, map_bc: i64, map_ca: i64
) -> i64 with Div {
    return
        ng_mutant_diff_at_gauge(mutant, declared, bound, map_ab, map_bc, map_ca, 1) +
        ng_mutant_diff_at_gauge(mutant, declared, bound, map_ab, map_bc, map_ca, 2) * 2 +
        ng_mutant_diff_at_gauge(mutant, declared, bound, map_ab, map_bc, map_ca, 3) * 4 +
        ng_mutant_diff_at_gauge(mutant, declared, bound, map_ab, map_bc, map_ca, 4) * 8 +
        ng_mutant_diff_at_gauge(mutant, declared, bound, map_ab, map_bc, map_ca, 5) * 16 +
        ng_mutant_diff_at_gauge(mutant, declared, bound, map_ab, map_bc, map_ca, 6) * 32 +
        ng_mutant_diff_at_gauge(mutant, declared, bound, map_ab, map_bc, map_ca, 7) * 64
}

fn ng_verify_index(index: i64) -> i64 with Div {
    let map_ca = index % 4
    let map_bc = (index / 4) % 4
    let map_ab = (index / 16) % 4
    let bound = (index / 64) % 8
    let declared = (index / 512) % 8
    var failures: i64 = 0
    failures = failures + nhy_verify_case(
        ng_analyzer_anomaly_mask(declared, bound, map_ab, map_bc, map_ca), 0
    )
    failures = failures + nhy_verify_case(
        ng_repair_anomaly_mask(declared, bound, map_ab, map_bc, map_ca), 0
    )
    failures = failures + nhy_verify_case(
        ng_certificate_anomaly_mask(map_ab, map_bc, map_ca), 0
    )
    let rich = ng_analyze(declared, bound, map_ab, map_bc, map_ca)
    if nhy_abi_valid(declared, bound, map_ab, map_bc, map_ca) == 0 {
        failures = failures + nhy_verify_case(rich, 0)
    } else {
        failures = failures + nhy_verify_case(
            (rich / 8) % 256,
            nhy_analyze(declared, bound, map_ab, map_bc, map_ca)
        )
        failures = failures + nhy_verify_case(rich % 8,
            nhy_analyze(declared, bound, map_ab, map_bc, map_ca) % 8)
    }
    return failures
}

fn ng_exhaustive_walk(start: i64, finish: i64) -> i64 with Div {
    if finish - start == 1 { return ng_verify_index(start) }
    let midpoint = (start + finish) / 2
    return ng_exhaustive_walk(start, midpoint) + ng_exhaustive_walk(midpoint, finish)
}

fn ng_exhaustive_self_check() -> i64 with Div {
    return ng_exhaustive_walk(0, 4096)
}

fn ng_mutant_detected_walk(
    mutant: i64, start: i64, finish: i64
) -> i64 with Div {
    if finish - start == 1 {
        let map_ca = start % 4
        let map_bc = (start / 4) % 4
        let map_ab = (start / 16) % 4
        let bound = (start / 64) % 8
        let declared = (start / 512) % 8
        if ng_mutant_anomaly_mask(
            mutant, declared, bound, map_ab, map_bc, map_ca
        ) != 0 { return 1 }
        return 0
    }
    let midpoint = (start + finish) / 2
    if ng_mutant_detected_walk(mutant, start, midpoint) == 1 { return 1 }
    return ng_mutant_detected_walk(mutant, midpoint, finish)
}

fn ng_mutant_suite_self_check() -> i64 with Div {
    var failures: i64 = 0
    failures = failures + nhy_verify_case(ng_mutant_detected_walk(1, 0, 4096), 1)
    failures = failures + nhy_verify_case(ng_mutant_detected_walk(2, 0, 4096), 1)
    failures = failures + nhy_verify_case(ng_mutant_detected_walk(3, 0, 4096), 1)
    failures = failures + nhy_verify_case(ng_mutant_detected_walk(4, 0, 4096), 1)
    failures = failures + nhy_verify_case(ng_mutant_detected_walk(5, 0, 4096), 1)
    failures = failures + nhy_verify_case(ng_mutant_detected_walk(6, 0, 4096), 1)
    return failures
}

fn main() -> i64 with Mut, Div {
    var failures: i64 = nhy_exhaustive_self_check()
    failures = failures + ng_exhaustive_self_check()
    failures = failures + ng_mutant_suite_self_check()
    if failures == 0 { return 110 }
    return 1
}
`;

export const buildNormativeGaugeSource = (parentSource) => {
  const mainOffset = parentSource.lastIndexOf(mainMarker);
  if (mainOffset < 0) throw new Error('parent Sounio main marker not found');
  return `${parentSource.slice(0, mainOffset)}${normativeGaugeExtension}`;
};

if (resolve(process.argv[1] ?? '') === scriptPath) {
  const parentSource = readFileSync(parentPath, 'utf8');
  mkdirSync(dirname(outputPath), {recursive: true});
  writeFileSync(outputPath, buildNormativeGaugeSource(parentSource));
  process.stdout.write(`${outputPath}\n`);
}
