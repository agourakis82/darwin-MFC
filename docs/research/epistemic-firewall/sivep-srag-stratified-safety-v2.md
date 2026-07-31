# SIVEP-Gripe pediatric stratified safety audit v2

Executed: 2026-07-30

## Purpose

This audit tests age-stratified severity and outcome invariants in the frozen 2025 SIVEP-Gripe SRAG public snapshot. It is a hospitalized-surveillance safety and transportability analysis, not a primary-care cohort and not a source of APS/SUS diagnostic priors.

The analysis does not estimate probabilities, treatment effects or recommended prescriptions. Its final firewall disposition `REFUSE` is an invariant.

## Reproducible execution

Run:

```bash
pnpm test:public-sivep-stratification
pnpm analyze:public-sivep-srag:full
```

The full command streams the official CSV without persisting source rows or identifiers. It writes only a non-patient aggregate receipt to `.clinical-kernel-build/public-data/sivep-srag-feasibility.json`; `patientRowsPersisted=false` and `recordIdentifiersPersisted=false`.

The deterministic self-test covers age boundaries expressed in days, months and years; official classification and outcome codes; primary and complementary suppression; and clinical refusal.

## Frozen definitions

- Age bands: under 2, 2-4, 5-11 and 12-17 years. `TP_IDADE` codes 1, 2 and 3 mean days, months and years.
- Final classification: influenza, other respiratory virus, other etiologic agent, unspecified SRAG, COVID-19 or unknown.
- Outcome: recovered, SRAG death, death from another cause or unknown.
- Severity: ICU admission and invasive or non-invasive ventilatory support, each retaining an explicit unknown state.

`FEBRE` is reported fever. `SATURACAO` means SpO2 below 95 percent and cannot populate Darwin's canonical room-air SpO2-below-92 observation.

## Snapshot identity

- Frozen source: `INFLUD25-27-07-2026.csv`.
- Source rows: 336,260.
- Source bytes: 381,900,544.
- SHA-256: `b5def80ae35092c5f64b4766d6d2e5785bdd63978a9aae51cc90521a91a6aaaa`.
- Pediatric records: 195,021.

Every age, classification, outcome and severity partition reconciled to its source margin. The row count, byte count, content hash and HTTP content length also reconciled.

## Pediatric margins

| Dimension | Records |
| --- | ---: |
| Under 2 years | 119,556 |
| 2-4 years | 35,203 |
| 5-11 years | 33,559 |
| 12-17 years | 6,703 |
| Other respiratory virus | 90,782 |
| Unspecified SRAG | 74,471 |
| Influenza | 18,124 |
| COVID-19 | 4,913 |
| Other etiologic agent | 2,041 |
| Unknown classification | 4,690 |
| Recovered | 180,511 |
| SRAG death | 1,964 |
| Death from another cause | 926 |
| Unknown outcome | 11,620 |

These are surveillance counts, not prevalence estimates for children presenting to APS.

## Disclosure control

The minimum cell threshold is 30 records. A complete age-classification row is primarily suppressed when its total or any nonzero outcome cell is below 30. Zero cells may be published.

Complementary suppression iterates whenever an age or classification margin would otherwise have exactly one hidden row, protecting against simple marginal subtraction. This is a deterministic engineering control, not a formal disclosure-risk certification.

Of 24 age-classification rows, 17 were primary-suppressed, one was complementary-suppressed and six were published. Published rows were:

| Age band | Final classification | Records |
| --- | --- | ---: |
| Under 2 | Other respiratory virus | 65,216 |
| Under 2 | Unspecified SRAG | 39,022 |
| 2-4 | Other respiratory virus | 14,077 |
| 2-4 | Unspecified SRAG | 15,364 |
| 5-11 | Unspecified SRAG | 16,642 |
| 12-17 | Unspecified SRAG | 3,443 |

No suppressed row retains a count in the receipt. All ICU and ventilatory-support cells by age exceeded the threshold, so those eight metric rows were published without suppression.

## Scientific boundary

SIVEP-Gripe selects hospitalized SRAG cases and deaths. Its spectrum, verification process and thresholds differ materially from first-contact APS. Final-classification fields are surveillance closures rather than the frozen double-adjudicated nine-condition reference standard.

The receipt therefore fixes `probabilitiesEstimated=false`, `treatmentEffectsEstimated=false`, `apsCalibrationAuthorized=false`, `prescriptionRecommendationAuthorized=false` and `clinicalActivationAuthorized=false`. It can reveal unsafe severity behavior or transportability failure; it cannot activate the clinical kernel.

## Official sources

- Brazilian Ministry of Health, [SIVEP-Gripe SRAG open dataset](https://dadosabertos.saude.gov.br/dataset/srag-2019-a-2026).
- Brazilian Ministry of Health, [SIVEP-Gripe data dictionary 2019-2025](https://s3.sa-east-1.amazonaws.com/ckan.saude.gov.br/SRAG/dicionario-de-dados-2019-a-2025.pdf).
