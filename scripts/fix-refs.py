#!/usr/bin/env python3
filepath = "lib/data/references.ts"
with open(filepath, "r") as f:
    lines = f.readlines()
total_before = len(lines)
print(f"Before: {total_before} lines")
ranges = [(11284,11379),(11228,11283),(11116,11227),(7159,7254)]
for s,e in ranges:
    del lines[s-1:e]
    print(f"Removed {s}-{e}")
print(f"After: {len(lines)} lines")
with open(filepath, "w") as f:
    f.writelines(lines)
print("Done")
