#![forbid(unsafe_code)]

use std::env;
use std::fs::File;
use std::io::{self, BufRead, BufReader, Write};

const CANDIDATE_ORDER: [i64; 8] = [0, 1, 2, 4, 3, 5, 6, 7];
const EDGE_PAIRS: [(usize, usize); 15] = [
    (0, 1), (0, 2), (0, 3), (0, 4), (0, 5),
    (1, 2), (1, 3), (1, 4), (1, 5),
    (2, 3), (2, 4), (2, 5),
    (3, 4), (3, 5),
    (4, 5),
];

fn valid_mask(mask: i64) -> bool {
    (0..=7).contains(&mask)
}

fn valid_map(map: i64) -> bool {
    (0..=3).contains(&map)
}

fn apply_map(map: i64, input: i64) -> i64 {
    (map >> input) & 1
}

fn transform_map(map: i64, source_flip: i64, target_flip: i64) -> i64 {
    let at_zero = target_flip ^ apply_map(map, source_flip);
    let at_one = target_flip ^ apply_map(map, 1 ^ source_flip);
    at_zero + at_one * 2
}

fn triangle_valid(input: [i64; 6]) -> bool {
    let [declared, anchors, anchor_values, ab, bc, ca] = input;
    valid_mask(declared) && valid_mask(anchors) && valid_mask(anchor_values) &&
        (anchor_values & anchors) == anchor_values &&
        valid_map(ab) && valid_map(bc) && valid_map(ca)
}

fn local_issue(declared: i64, maps: [i64; 3]) -> i64 {
    maps.iter().enumerate().fold(0, |issue, (index, map)| {
        let edge = 1_i64 << index;
        if declared & edge != 0 && *map != 1 && *map != 2 {
            issue | edge
        } else {
            issue
        }
    })
}

fn triangle_assignment_satisfies(input: [i64; 6], assignment: i64) -> bool {
    let [declared, anchors, anchor_values, ab, bc, ca] = input;
    if assignment & anchors != anchor_values {
        return false;
    }
    let a = assignment & 1;
    let b = (assignment >> 1) & 1;
    let c = (assignment >> 2) & 1;
    (declared & 1 == 0 || b == apply_map(ab, a)) &&
        (declared & 2 == 0 || c == apply_map(bc, b)) &&
        (declared & 4 == 0 || a == apply_map(ca, c))
}

fn triangle_solution_count(input: [i64; 6]) -> i64 {
    (0..8).filter(|assignment| triangle_assignment_satisfies(input, *assignment)).count() as i64
}

fn gauge_bit(gauge: i64, vertex_bit: i64) -> i64 {
    if gauge & vertex_bit == 0 { 0 } else { 1 }
}

fn triangle_gauge_stabilizes(input: [i64; 6], gauge: i64) -> bool {
    let [declared, anchors, _, ab, bc, ca] = input;
    if gauge & anchors != 0 {
        return false;
    }
    let transformed = [
        transform_map(ab, gauge_bit(gauge, 1), gauge_bit(gauge, 2)),
        transform_map(bc, gauge_bit(gauge, 2), gauge_bit(gauge, 4)),
        transform_map(ca, gauge_bit(gauge, 4), gauge_bit(gauge, 1)),
    ];
    let maps = [ab, bc, ca];
    maps.iter().enumerate().all(|(index, map)| {
        declared & (1_i64 << index) == 0 || transformed[index] == *map
    })
}

fn triangle_stabilizer_mask(input: [i64; 6]) -> i64 {
    (0..8).filter(|gauge| triangle_gauge_stabilizes(input, *gauge))
        .fold(0, |mask, gauge| mask | (1_i64 << gauge))
}

fn minimum_additional_anchor(input: [i64; 6]) -> i64 {
    let [declared, anchors, anchor_values, ab, bc, ca] = input;
    let available = 7 & !anchors;
    for candidate in CANDIDATE_ORDER {
        if candidate & available != candidate {
            continue;
        }
        let augmented = [declared, anchors | candidate, anchor_values, ab, bc, ca];
        if triangle_stabilizer_mask(augmented) == 1 {
            return candidate;
        }
    }
    -1
}

fn pack_triangle(disposition: i64, stabilizer: i64, additional_anchor: i64,
    solution_count: i64, stabilizer_order: i64, local_issue: i64) -> i64 {
    disposition + stabilizer * 8 + additional_anchor * 2048 +
        solution_count * 16384 + stabilizer_order * 262144 +
        local_issue * 4194304
}

fn analyze_triangle(input: [i64; 6]) -> i64 {
    if !triangle_valid(input) {
        return 0;
    }
    let [declared, _, _, ab, bc, ca] = input;
    let issue = local_issue(declared, [ab, bc, ca]);
    if issue != 0 {
        return pack_triangle(4, 0, 0, 0, 0, issue);
    }
    let solutions = triangle_solution_count(input);
    let stabilizer = triangle_stabilizer_mask(input);
    let stabilizer_order = stabilizer.count_ones() as i64;
    let additional_anchor = minimum_additional_anchor(input);
    if additional_anchor < 0 {
        return pack_triangle(6, stabilizer, 0, solutions, stabilizer_order, 0);
    }
    if solutions == 0 {
        return pack_triangle(5, stabilizer, additional_anchor, 0, stabilizer_order, 0);
    }
    if stabilizer_order > 1 {
        return pack_triangle(3, stabilizer, additional_anchor, solutions, stabilizer_order, 0);
    }
    pack_triangle(if solutions == 1 { 1 } else { 2 }, stabilizer,
        additional_anchor, solutions, stabilizer_order, 0)
}

fn triangle_input_from_index(index: i64) -> [i64; 6] {
    [
        (index / 4096) % 8,
        (index / 512) % 8,
        (index / 64) % 8,
        (index / 16) % 4,
        (index / 4) % 4,
        index % 4,
    ]
}

fn write_triangle_transcript(mut output: impl Write) -> io::Result<()> {
    for index in 0..32768 {
        let input = triangle_input_from_index(index);
        let packed = analyze_triangle(input);
        if !triangle_valid(input) {
            writeln!(output, "{index}|0|{packed}|0|0|0")?;
            continue;
        }
        let stabilizer = triangle_stabilizer_mask(input);
        let minimum = minimum_additional_anchor(input);
        let solutions = triangle_solution_count(input);
        writeln!(output, "{index}|1|{packed}|{stabilizer}|{minimum}|{solutions}")?;
    }
    Ok(())
}

fn graph_allowed_edges(vertex_count: i64) -> i64 {
    EDGE_PAIRS.iter().enumerate().fold(0, |mask, (index, (left, right))| {
        if *left < vertex_count as usize && *right < vertex_count as usize {
            mask | (1_i64 << index)
        } else {
            mask
        }
    })
}

fn graph_valid(input: [i64; 5]) -> bool {
    let [vertices, edges, parity, anchors, anchor_values] = input;
    if !(1..=6).contains(&vertices) {
        return false;
    }
    let vertex_mask = (1_i64 << vertices) - 1;
    edges >= 0 && edges & graph_allowed_edges(vertices) == edges &&
        parity >= 0 && parity & edges == parity &&
        anchors >= 0 && anchors & vertex_mask == anchors &&
        anchor_values >= 0 && anchor_values & anchors == anchor_values
}

fn graph_assignment_satisfies(input: [i64; 5], assignment: i64) -> bool {
    let [_, edges, parity, anchors, anchor_values] = input;
    if assignment & anchors != anchor_values {
        return false;
    }
    EDGE_PAIRS.iter().enumerate().all(|(index, (left, right))| {
        edges & (1_i64 << index) == 0 ||
            (((assignment >> left) & 1) ^ ((assignment >> right) & 1)) ==
                ((parity >> index) & 1)
    })
}

fn graph_solution_count(input: [i64; 5]) -> i64 {
    let limit = 1_i64 << input[0];
    (0..limit).filter(|assignment| graph_assignment_satisfies(input, *assignment)).count() as i64
}

fn graph_gauge_stabilizes(input: [i64; 5], gauge: i64) -> bool {
    let [_, edges, _, anchors, _] = input;
    gauge & anchors == 0 && EDGE_PAIRS.iter().enumerate().all(|(index, (left, right))| {
        edges & (1_i64 << index) == 0 ||
            ((gauge >> left) & 1) == ((gauge >> right) & 1)
    })
}

fn graph_stabilizer_order(input: [i64; 5]) -> i64 {
    let limit = 1_i64 << input[0];
    (0..limit).filter(|gauge| graph_gauge_stabilizes(input, *gauge)).count() as i64
}

fn analyze_graph(input: [i64; 5]) -> i64 {
    if !graph_valid(input) {
        return 0;
    }
    let solutions = graph_solution_count(input);
    let stabilizers = graph_stabilizer_order(input);
    let disposition = if solutions == 0 {
        5
    } else if stabilizers > 1 {
        3
    } else if solutions == 1 {
        1
    } else {
        2
    };
    disposition + solutions * 8 + stabilizers * 1024
}

fn parse_graph_input(value: &str) -> Result<[i64; 5], String> {
    let values: Result<Vec<i64>, _> = value.split(',').map(str::parse::<i64>).collect();
    let values = values.map_err(|error| error.to_string())?;
    if values.len() != 5 {
        return Err(format!("expected five integers, observed {}", values.len()));
    }
    Ok([values[0], values[1], values[2], values[3], values[4]])
}

fn write_graph_transcript(path: &str, mut output: impl Write) -> Result<(), String> {
    let file = File::open(path).map_err(|error| error.to_string())?;
    for line in BufReader::new(file).lines() {
        let line = line.map_err(|error| error.to_string())?;
        if line.is_empty() || line.starts_with('#') {
            continue;
        }
        let mut fields = line.split('|');
        let id = fields.next().ok_or("missing id")?;
        let input_text = fields.next().ok_or("missing input")?;
        if fields.next().is_some() {
            return Err(format!("unexpected field in {id}"));
        }
        let input = parse_graph_input(input_text)?;
        let packed = analyze_graph(input);
        let solutions = if graph_valid(input) { graph_solution_count(input) } else { 0 };
        let stabilizers = if graph_valid(input) { graph_stabilizer_order(input) } else { 0 };
        writeln!(output, "{id}|{packed}|{solutions}|{stabilizers}")
            .map_err(|error| error.to_string())?;
    }
    Ok(())
}

fn self_check() -> bool {
    analyze_triangle([7, 0, 0, 2, 2, 2]) == 560139 &&
        analyze_triangle([7, 1, 0, 2, 2, 2]) == 278537 &&
        analyze_triangle([7, 0, 1, 2, 2, 2]) == 0 &&
        analyze_graph([3, 33, 0, 0, 0]) == 2067 &&
        analyze_graph([3, 35, 1, 0, 0]) == 2053
}

fn main() {
    let arguments: Vec<String> = env::args().collect();
    if !self_check() {
        eprintln!("self-check failed");
        std::process::exit(1);
    }
    let result = match arguments.get(1).map(String::as_str) {
        Some("triangle-transcript") => write_triangle_transcript(io::stdout())
            .map_err(|error| error.to_string()),
        Some("graph-transcript") => match arguments.get(2) {
            Some(path) => write_graph_transcript(path, io::stdout()),
            None => Err("graph-transcript requires an input path".to_string()),
        },
        Some("self-check") | None => {
            println!("131");
            Ok(())
        }
        Some(command) => Err(format!("unknown command: {command}")),
    };
    if let Err(error) = result {
        eprintln!("{error}");
        std::process::exit(2);
    }
}
