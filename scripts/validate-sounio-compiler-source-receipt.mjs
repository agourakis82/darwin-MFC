import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { validateCompilerSourceReceipt } from './lib/sounio-compiler-receipt.mjs';

const args = process.argv.slice(2);
const receiptIndex = args.indexOf('--receipt');
const expectedIndex = args.indexOf('--expected-compiler-sha256');
const receiptPath = receiptIndex >= 0
  ? args[receiptIndex + 1]
  : 'public/clinical-kernel/compiler-source.receipt.json';
if (!receiptPath) throw new Error('--receipt must be followed by a path.');

const receipt = JSON.parse(readFileSync(resolve(receiptPath), 'utf8'));
const expectedCompilerSha256 = expectedIndex >= 0 ? args[expectedIndex + 1] : undefined;
const validation = validateCompilerSourceReceipt(receipt, {
  expectedCompilerSha256,
  requireReconciled: true,
});
console.log(JSON.stringify(validation, null, 2));
console.log('SOUNIO_COMPILER_SOURCE_RECEIPT_VALID');
