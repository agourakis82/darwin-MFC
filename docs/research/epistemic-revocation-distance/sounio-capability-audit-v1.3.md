# Sounio capability audit for v1.3

Audit source: official `Sounio-lang/Sounio` main at
`8ef762a99d9b88678c4fb5f38617daf91d826f8c`, inspected 2026-08-03. Repository
claims were checked against focused execution in the Linux `souc-linux` Lima
environment. This matrix records the boundary used by Darwin; it is not a
general certification of Sounio.

| Capability | Repository status | Focused observation | v1.3 decision |
|---|---|---|---|
| `Knowledge[T]` and GUM propagation | `validated_research` | Named conformance fixtures and implementation exist. | Deferred. Revocation distance is exact combinatorics; adding numeric confidence would change the theorem. |
| Algebraic effects | stable bounded slices | `IO`, `Mut`, `Div`, and effect diagnostics have named gates. | The pure profile declares only the effects it needs. |
| `Observe` / `Unobserved<T>` | `validated_research` claim surface | The current `observe_contraction.sio` focused check reported four `E137` undeclared-variable diagnostics. | Not used as lifecycle authority. Explicit epoch and receipt verification remain mandatory. |
| Linear structs | implemented but not closed broadly | Simple double-use and implicit-drop fixtures reject. Branch asymmetry, early return, field flow, and capture fixtures were accepted by the focused checker. | No global no-replay claim. A future closed profile must reject every named counterexample. |
| Affine structs | declared | `affine_double_use.sio` was accepted by the current checker. | Unavailable for authority. |
| Borrowing | `validated_research` | Source checker and named borrowing gates exist. | Used only for ordinary implementation discipline, not theorem identity. |
| Refinement types | prototype | Complex predicates may fall back to runtime assertions. | Not used to claim static probability or epoch bounds. |
| Units of measure | prototype | Fixture-backed surface exists. | Irrelevant to this dimensionless finite theorem. |
| Non-associative algebra | `validated_research` for bounded algebra lanes | Exact associator machinery and rebracketing authority exist for named domains. | No octonionic or non-associative construction is introduced without an intrinsic operation law. |
| E-graph rebracketing authority | bounded compiler transaction | Current authority covers exact bitwise operators and named CFG shapes. | Evidence transitions are treated as barriers; no optimizer-wide preservation claim is made. |
| Native Linux and WASM | native stable; WASM bounded research | v1.2 source-fresh native/WASM artifacts are deterministic and receipt-bound. | Both backends are required for v1.3 acceptance. |
| Lean artifacts | external proof boundary | Existing Darwin proofs compile under Lean 4.30.0-rc2. | Used for the general restoration theorem; emitted WASM semantics remain unmechanized. |
| D10 revocable authority | bounded nominal typestate | The official contract explicitly excludes affine consumption, stale-alias invalidation, and live revocation. | Treated as close internal prior work, not inherited proof. |
| D11 authority attenuation | bounded nominal trace | Copied stale continuations remain possible. | Does not discharge v1.3 replay or epoch obligations. |

## Required language gate before a stronger claim

The future Sounio authority type must close all of the following in one
source-fresh compiler receipt:

1. exact-once consumption across branches, early returns, loops, fields, calls,
   captures, imports, native, and WASM;
2. epoch-indexed invalidation of every descendant singular receipt;
3. an `Observe` transition that cannot be bypassed or moved by optimization;
4. native/WASM parity for accepted and rejected programs;
5. a negative corpus proving stale aliases and copied continuations cannot emit
   authority.

Until then, v1.3 remains a mathematical and executable research artifact with
explicit runtime receipts, not a compiler-enforced clinical capability.
