# Darwin Rx Medication Envelope Safety Case v1

Status: `OPEN / PRE-CLINICAL / SYNTHETIC ONLY`

## Top claim

The current build can demonstrate the engineering integrity of a proof-carrying medication-envelope pipeline on synthetic data. It cannot establish clinical safety, efficacy, or authorization.

## Assurance claims and evidence

| Claim | Evidence | Current state |
|---|---|---|
| Evidence artifacts are content-addressed and acyclic | Merkle graph receipt, cycle and tamper tests | PASS |
| A changed source invalidates descendants | `MedicationChangeImpactReportV1` fixture and tests | PASS |
| Clinical disposition is owned by Sounio | Sounio source, import-free WASM, loader with no TypeScript calculation | PASS for gate semantics |
| Native and browser execution agree | Exact native/WASM parity over fixed vectors | PASS |
| Catastrophic state invariants are formally checked | cvc5 1.3.3 safe mode, CPC checked by Ethos 0.2.3, Z3 5.0.0, Lean 4.32.1 | PASS |
| Candidate knowledge cannot enter clinical use | Empty signing-key registry, unsigned artifacts, fail-closed loader | PASS |
| Patient context is not persisted | Discrete telemetry contract and database constraints | PASS by design; staging execution pending |
| Clinical constraints are correct and sufficiently complete | Independent physician/pharmacist review and adjudication | NOT ESTABLISHED |
| Real-world benefit exceeds risk | Prospective institutional study | NOT STARTED |

## Hazard controls

| Hazard | Primary control | Residual boundary |
|---|---|---|
| Stale evidence | Descendant invalidation and immediate `REFUSE` | Source update detection remains operational work |
| Unit or dimension mismatch | Exact quantity contracts and `REFUSE` | Clinical constraints are not yet populated |
| Overflow | Signed-i64 envelope gate and negative fixture | Constraint-specific arithmetic requires reviewed artifacts |
| Automation complacency | No word “safe”, no substitute dose, counterexample-first explanation | Human-factors study pending |
| Alert fatigue | Single inline rail and four dispositions | Crossover measurement pending |
| Credential misuse | Ed25519 contract, subject/scope/expiry binding, separate pilot registry | No credential is currently issued |
| PHI leakage | Local context, redacted telemetry schema, no free-text event payload | Deployment and observability audit pending |
| Generative AI contamination | Isolated authoring-only runs, exact locators, candidate-only output | Provider-backed red-team execution pending |

## Standards map

- Risk management structure is inspired by [ISO 14971:2019](https://www.iso.org/standard/72704.html); no conformity claim is made.
- Software lifecycle evidence is organized toward IEC 62304.
- Usability hazards and the crossover protocol are organized toward IEC 62366-1.
- Brazilian regulatory analysis must explicitly address [RDC 657/2022](https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2022/anvisa-aprova-nova-norma-para-software-como-dispositivo-medico).
- Medication hazards prioritize the [WHO Medication Without Harm](https://www.who.int/initiatives/medication-without-harm) challenge and the [Brazilian medication safety protocol](https://www.gov.br/saude/pt-br/composicao/saes/seguranca-do-paciente/publicacoes/protocolos-de-seguranca-do-paciente/protocolo-seguraca-na-prescricao-uso-e-administracao-de-medicamentos.pdf/view).

## Release rule

The current safety case supports only a synthetic engineering benchmark. Any missing clinical evidence, independent consensus, valid proof, artifact signature, pilot credential, or current source keeps the system in `REFUSE`.
