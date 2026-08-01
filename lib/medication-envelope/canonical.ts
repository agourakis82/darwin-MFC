export function canonicalize(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`;
  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([, nested]) => nested !== undefined)
    .sort(([left], [right]) => left.localeCompare(right));
  return `{${entries.map(([key, nested]) => `${JSON.stringify(key)}:${canonicalize(nested)}`).join(',')}}`;
}

export function parsePositiveInteger(value: string): bigint {
  if (!/^[1-9][0-9]*$/.test(value)) throw new Error('exact-positive-integer-required');
  return BigInt(value);
}

export function parseInteger(value: string): bigint {
  if (!/^-?(0|[1-9][0-9]*)$/.test(value)) throw new Error('exact-integer-required');
  return BigInt(value);
}

export function assertExactRational(value: { numerator: string; denominator: string }): void {
  parseInteger(value.numerator);
  parsePositiveInteger(value.denominator);
}
