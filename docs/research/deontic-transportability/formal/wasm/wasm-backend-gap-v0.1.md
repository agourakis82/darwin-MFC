# WASM Backend Gap: Madaros Modular Driver

Date: 2026-08-02  
Status: observed, not repaired  
Clinical disposition: `REFUSE`

## Observed Boundary

The public `souc build` path reaches `bin/madaros`. Its build-option parser
accepts only `native` and `gpu`; `--backend wasm` exits with code 2 before the
compiler receives the source.

The raw Madaros source advertises `-t wasm`, and the repository contains a WASM
lowerer and encoder. The currently selected modular driver nevertheless returns
failure explicitly in
`self-hosted/compiler/module_native_driver.sio::compile_multimodule_native_with_ir`:

```text
WASM backend is not yet split into module_native_driver
```

The older `module_loader.sio` contains a WASM dispatch path, but current
`compiler/main.sio` imports `module_native_driver`. Re-enabling the older path
without source-fresh rebuilding and parity gates would silently cross compiler
ownership boundaries and is not acceptable evidence.

## Smallest Honest Implementation Frontier

1. Add `wasm` to the public `bin/madaros` build contract, preferably as
   `--backend wasm` with a `.wasm` artifact check.
2. Split or import the current WASM lowering/write path into
   `module_native_driver.sio`, operating on the already preloaded `IrModule`.
3. Rebuild Madaros from the exact source tree and pass fixed-point/self-hosting
   gates before calling the compiler source-fresh.
4. Validate the output with an independent WASM validator and runtime.
5. Require exact native/WASM agreement for the integer finite-family vectors.

Until all five steps close, `nativeWasmParityEstablished=false` and no browser
clinical integration is authorized.
