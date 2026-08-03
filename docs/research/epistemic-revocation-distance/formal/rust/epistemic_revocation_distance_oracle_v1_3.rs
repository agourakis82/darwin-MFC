// Independent no-crate oracle for Darwin Epistemic Revocation Distance v1.3.
//
// It emits the complete abstract-domain transcript. It deliberately does not
// parse the Sounio source, load the WASM module, or expose a selected result.

const IDENTIFIED: i64 = 278_537;
const MODEL_LOSS: i64 = 294_913;
const SYMMETRY_LOSS: i64 = 540_673;
const JOINT_LOSS: i64 = 557_059;

fn subset(left: i64, right: i64) -> bool {
    left & right == left
}

fn population(mask: i64) -> i64 {
    i64::from(mask & 1 != 0) + i64::from(mask & 2 != 0) + i64::from(mask & 4 != 0)
}

fn disposition(state: i64) -> i64 {
    state % 8
}

fn section_count(state: i64) -> i64 {
    state / 16_384 % 16
}

fn residual_order(state: i64) -> i64 {
    state / 262_144 % 16
}

fn identified(state: i64) -> bool {
    state > 0 && disposition(state) == 1 && section_count(state) == 1 && residual_order(state) == 1
}

fn loses(state: i64, mode: i64) -> bool {
    if state <= 0 {
        return true;
    }
    let loses_model = section_count(state) != 1;
    let loses_symmetry = residual_order(state) != 1;
    match mode {
        1 => loses_model,
        2 => loses_symmetry,
        _ => disposition(state) != 1 || loses_model || loses_symmetry,
    }
}

fn valid(active: i64, states: &[i64; 8]) -> bool {
    if !(0..=7).contains(&active) {
        return false;
    }
    states.iter().enumerate().all(|(cut, state)| {
        if subset(cut as i64, active) {
            *state > 0
        } else {
            *state == -1
        }
    })
}

fn distance(active: i64, states: &[i64; 8], mode: i64) -> i64 {
    let mut answer = 4;
    for cut in 0..8 {
        if subset(cut, active) && loses(states[cut as usize], mode) {
            answer = answer.min(population(cut));
        }
    }
    answer
}

fn minimum_family(active: i64, states: &[i64; 8], minimum: i64) -> i64 {
    if minimum >= 4 {
        return 0;
    }
    let mut family = 0;
    for cut in 0..8 {
        if subset(cut, active) && population(cut) == minimum && loses(states[cut as usize], 0) {
            family |= 1 << cut;
        }
    }
    family
}

fn critical_union(family: i64) -> i64 {
    let mut answer = 0;
    for cut in 1..8 {
        if family & (1 << cut) != 0 {
            answer |= cut;
        }
    }
    answer
}

fn pack(disposition: i64, joint: i64, model: i64, symmetry: i64, family: i64,
        critical: i64, active: i64) -> i64 {
    disposition + joint * 8 + model * 64 + symmetry * 512 + family * 4_096
        + critical * 1_048_576 + active * 8_388_608
}

fn analyze(active: i64, states: &[i64; 8]) -> i64 {
    if !valid(active, states) {
        return 0;
    }
    if !identified(states[0]) {
        return pack(3, 0, 0, 0, 1, 0, active);
    }
    let joint = distance(active, states, 0);
    let model = distance(active, states, 1);
    let symmetry = distance(active, states, 2);
    let family = minimum_family(active, states, joint);
    let outcome = if joint >= 4 { 2 } else { 1 };
    pack(outcome, joint, model, symmetry, family, critical_union(family), active)
}

fn profile_count(active: i64) -> i64 {
    match population(active) {
        0 => 4,
        1 => 16,
        2 => 256,
        _ => 65_536,
    }
}

fn profile_states(active: i64, code: i64) -> [i64; 8] {
    let classes = [IDENTIFIED, MODEL_LOSS, SYMMETRY_LOSS, JOINT_LOSS];
    let mut states = [-1; 8];
    let mut remainder = code;
    for cut in 0..8 {
        if !subset(cut, active) {
            continue;
        }
        states[cut as usize] = classes[(remainder % 4) as usize];
        remainder /= 4;
    }
    states
}

fn main() {
    let mut ordinal: i64 = 0;
    for active in 0..8 {
        for profile in 0..profile_count(active) {
            let states = profile_states(active, profile);
            println!("{ordinal}|{active}|{profile}|{}", analyze(active, &states));
            ordinal += 1;
        }
    }
    assert_eq!(ordinal, 66_356);
}
