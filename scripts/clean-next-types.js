// Keep `pnpm run type-check` stable even when `.next/types` is stale from a previous build.
// Next generates route validators that can reference removed routes; deleting them avoids false negatives.

const fs = require('fs');
const path = require('path');

function rmIfExists(p) {
  try {
    fs.rmSync(p, { recursive: true, force: true });
  } catch {
    // ignore
  }
}

rmIfExists(path.join(process.cwd(), '.next', 'types'));
rmIfExists(path.join(process.cwd(), '.next', 'dev', 'types'));

