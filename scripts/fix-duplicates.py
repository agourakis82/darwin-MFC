#!/usr/bin/env python3
"""Remove duplicate reference blocks from references.ts.
rastreamentos.ts was already fixed by a prior run.
"""

filepath = 'lib/data/references.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

total_before = len(lines)
print(f"references.ts: {total_before} lines before fix")

# Exact duplicate ranges to remove (1-indexed, inclusive).
# Sorted in REVERSE order so removing higher lines doesn't shift lower ones.
ranges = [
    (11284, 11379),  # batch 3 dup: diabetes-mellitus-2-ref-1..ref-12
    (11228, 11283),  # batch 3 dup: diabetes-mellitus-1-ref-1..ref-7
    (11116, 11227),  # batch 3 dup: deficiencia-vitamina-b12-ref-1..ref-14
    (7159,  7254),   # batch 2 dup: diabetes-mellitus-2-ref-1..ref-12
]

for start_1, end_1 in ranges:
    count = end_1 - start_1 + 1
    del lines[start_1 - 1 : end_1]
    print(f"  Removed lines {start_1}-{end_1} ({count} lines)")

total_after = len(lines)
print(f"references.ts: {total_after} lines after fix (removed {total_before - total_after})")

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("Done! Run: npm run type-check 2>&1 | grep 'error TS'")
