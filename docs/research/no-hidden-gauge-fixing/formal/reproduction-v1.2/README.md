# Blind reproduction protocol v1.2

This package is an implementation-reproduction challenge for the abstract No
Hidden Gauge Fixing model. It has no clinical semantics and cannot authorize
clinical use.

1. Record the repository commit, clean tree, operating system, architecture,
   Rust compiler identity and SHA-256 of every input.
2. Inspect and compile the standalone Rust source without adding dependencies.
3. Run `graph-transcript` against `blind-inputs.v1.2.txt`.
4. Record the exact stdout bytes and SHA-256 before reading any local evidence.
5. Compare that digest with `expectedCommitment.sha256` in the manifest.
6. Sign an attestation containing all recorded hashes and whether they match.

The committed local run is cross-language and implementation-independent, but
not author-independent. `externalHumanReproductionComplete` remains false until
an unrelated third party returns a signed attestation.
