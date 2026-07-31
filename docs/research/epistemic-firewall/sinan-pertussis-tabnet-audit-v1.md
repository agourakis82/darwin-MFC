# SINAN pertussis TabNet epidemiologic stress audit v1

Reviewed and executed: 2026-07-30

## Question

What age and temporal context can the official national SINAN pertussis aggregates provide without converting population surveillance into a diagnostic prior for symptomatic APS encounters?

## Official sources

- DATASUS, [Diseases and conditions notified from 2007 onward](https://datasus.saude.gov.br/acesso-a-informacao/doencas-e-agravos-de-notificacao-de-2007-em-diante-sinan/).
- DATASUS, [national pertussis TabNet form](https://tabnet.datasus.gov.br/cgi/deftohtm.exe?sinannet/cnv/coquebr.def).
- DATASUS, [TabNet usage and export instructions](https://tabnet.datasus.gov.br/tabnet/tabdescr.htm).

The form identifies the measure as confirmed pertussis cases notified to SINAN Net. It states that notification files correspond to notification years and recommends including later files when tabulating a symptom-onset year so delayed notifications are captured. It also marks 2023 and 2024 as subject to revision, 2025 as subject to revision and 2026 as partial.

## Frozen query

`pnpm analyze:public-sinan-pertussis` performs the following query over HTTPS:

- line: `Faixa Etaria`;
- column: `Ano 1o Sintoma(s)`;
- measure: confirmed cases;
- notification files: 2007 through 2026;
- symptom-onset years: 2007 through 2024;
- output: semicolon-delimited preformatted aggregate table.

Symptom years 2025 and 2026 are intentionally excluded. Their notification files remain selected only to capture delayed notifications for earlier symptom years, following the official note.

The script parses the legacy Windows-1252 form and result with structured HTML and CSV parsers. It requires all 20 notification files, all 18 symptom-year columns, the declared age bands, exact row totals, exact column totals and the grand total. The form manifest, query body and canonical matrix are pinned by SHA-256. A changed table is a source revision that requires review, not a silent update.

## Aggregate result

The matrix contained 44,878 confirmed notifications with symptom onset from 2007 through 2024. Selected national totals were:

| Symptom year | Confirmed notifications |
| --- | ---: |
| 2014 | 8,498 |
| 2019 | 1,566 |
| 2020 | 232 |
| 2021 | 159 |
| 2022 | 238 |
| 2023 | 222 |
| 2024 | 7,748 |

The 2024 count was 4.9476 times the 2019 count, but remained below the 2014 total. This is a comparison of notified confirmed counts, not an incidence ratio and not evidence of a diagnostic probability among symptomatic patients.

For 2024, the published age aggregates were:

| Age aggregate | Count | Share of 2024 notifications |
| --- | ---: | ---: |
| Infants under 1 | 1,401 | 18.08% |
| Exact under 5 | 2,215 | 28.59% |
| Exact under 15 | 4,522 | 58.36% |
| Cross-boundary 15-19 | 1,050 | 13.55% |
| Age 20 and older | 2,176 | 28.08% |

The `15-19` band crosses the frozen Darwin pediatric boundary. It is preserved as a separate aggregate and is never relabeled as under 18. Therefore `exactUnder18AgeBandAvailable=false`.

## Disclosure and provenance

Only derived counts of at least 30 are retained in the receipt. Smaller derived cells have `count=null`; the raw TabNet matrix and suppressed values are not persisted. This is a conservative project control, not formal DATASUS disclosure certification.

The live receipt binds:

- the public-dataset registry and audit script;
- the HTTPS transport executor binary and version;
- the official landing page and TabNet form;
- the parsed form manifest and exact POST body;
- the raw aggregate response and canonical reconciled matrix.

No patient-level record, identifier, credential or row-level file is available to or stored by this audit.

## Clinical boundary

These counts depend on notification, investigation, confirmation practice, access to testing and delayed reporting. The audit has no denominator of all children, all APS visits or all symptomatic respiratory encounters, and does not estimate an age-specific population rate.

The following remain invariant:

- `symptomaticEncounterDenominatorAvailable=false`
- `symptomaticEncounterPriorEstimated=false`
- `incidenceRateEstimated=false`
- `likelihoodRatiosEstimated=false`
- `probabilitiesEstimated=false`
- `prescriptionRecommendationAuthorized=false`
- `clinicalDecisionInputAuthorized=false`
- `apsCalibrationAuthorized=false`
- `clinicalActivationAuthorized=false`
- firewall disposition `REFUSE`

The valid use is epidemiologic context and construction of rare-condition stress scenarios that test whether the clinical interface asks appropriate age, vaccination, exposure, cough-pattern and red-flag questions. The aggregate count itself is never an input to the clinical posterior.
