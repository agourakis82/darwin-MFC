# NAMCS 2018 pediatric respiratory ambulatory audit v1

Executed: 2026-07-30

## Purpose

This audit tests whether the frozen Darwin respiratory mappings can be applied reproducibly to a public ambulatory dataset. It does not estimate APS/SUS priors, diagnostic probabilities, treatment effects or recommended prescriptions.

The source is the CDC/NCHS 2018 NAMCS public-use visit file. Its target population is United States office-based physician visits, not Brazilian primary care. Diagnosis fields are provider or billing proxies and medication fields describe observed practice.

## Reproducible execution

Run:

```bash
pnpm test:public-namcs2018-adapter
pnpm analyze:public-namcs2018
```

The full command downloads the official archive into a temporary directory, extracts and parses the SAS file, writes only aggregate results to `.clinical-kernel-build/public-data/namcs2018-ambulatory-audit.json`, and deletes the temporary source files.

The parser is `@irbisadm/statfmt@0.1.1`, a pure TypeScript port of ReadStat. The receipt binds the parser version, archive hash, extracted SAS hash, CDC value-format hash, registry hash and analysis-script hash.

## Frozen mappings

- Age under 2: valid `AGE` equal to 0 or 1. `AGEDAYS` is populated only below 1 year and must not be required for a 1-year-old child.
- Measured fever: `TEMPTAKE=1` and `TEMPF>=1004`; the source has an implied decimal, so 1004 means 100.4 degrees Fahrenheit.
- Cough: RFV 14400.
- Coryza or obstruction: RFV 14000.
- Sore throat: RFV 14551 or 14552.
- Dyspnea: RFV 14150 or 14200.
- Wheeze: RFV 14250.
- Rapid breathing: RFV 14302 is retained only as a noncanonical proxy.
- Stridor: diagnosis R06.1 is retained only as a noncanonical proxy.
- Conditions: frozen ICD-10-CM prefix rules for IVAS, pneumonia, bronchiolitis, asthma, croup, pertussis, influenza and pharyngitis.

RFV omission always remains unknown. It never becomes an absent symptom.

## Snapshot receipt

- Archive: 1,783,840 bytes; SHA-256 `da0bdfdecd9a1827de33a225b023339e61ec6fe56d3c6dfff4baaaeff736c416`.
- Extracted SAS: 57,147,392 bytes; SHA-256 `6fe398a46b430fb124fba6d430c0a849216aa53d7125bd94ac3984382837e7a5`.
- CDC value formats: 942,742 bytes; SHA-256 `b824fecbc0d15294f901b190bd413db9168342235a3523189850e63f9871cd8c`.
- Source rows: 9,953 visits and 1,038 variables.
- Weighted total: 860,385,638.653 visits, agreeing within one visit with the rounded CDC total of 860,385,639.
- Design markers: 60 masked strata and 496 sampled-provider clusters; no single-cluster stratum in this snapshot.

## Pediatric audit results

- Pediatric sample: 1,252 visits; weighted point estimate 128,781,463.194.
- Respiratory development subset: 262 visits; weighted point estimate 36,443,506.803.
- Positive cough mentions: 115.
- Positive nasal-congestion mentions: 96.
- Positive sore-throat mentions: 63.
- Measured fever at or above 100.4 degrees Fahrenheit: 15.
- Dyspnea mentions: 8; wheeze mentions: 12.

Only medication codes appearing in at least 30 sampled visits are emitted. In the respiratory development subset, amoxicillin, albuterol and acetaminophen passed that descriptive threshold. These are medication mentions, not comparative effectiveness evidence or clinical recommendations.

## Statistical boundary

Point estimates use `PATWT`. The receipt preserves `CSTRATM` and `CPSUM`, but version 1 does not calculate complex-survey standard errors or confidence intervals. Weighted shares therefore remain descriptive point estimates.

A separate opt-in gate now validates Taylor-linearized standard errors against R `survey` 4.5 without changing this v1 receipt or its clinical authorization boundary. See [NAMCS 2018 complex-survey parity v1](./namcs2018-complex-survey-parity-v1.md).

Condition-specific cells for pneumonia, bronchiolitis, asthma, croup, pertussis and influenza are below the display threshold. They cannot support condition-level medication conclusions. Even larger cells remain diagnosis-code proxies without independent adjudication.

The final state is invariant: `apsCalibrationAuthorized=false`, `prescriptionRecommendationAuthorized=false`, `clinicalActivationAuthorized=false` and firewall disposition `REFUSE`.

## Official sources

- CDC/NCHS, [2018 NAMCS public-use catalog](https://data.cdc.gov/National-Center-for-Health-Statistics/National-Ambulatory-Medical-Care-Survey-2018-2019-/nf35-ec5c).
- CDC/NCHS, [2018 NAMCS micro-data documentation](https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Dataset_Documentation/NAMCS/2018/doc2018-508.pdf).
- CDC/NCHS, [2018 NAMCS SAS archive](https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Dataset_Documentation/NAMCS/2018/namcs2018_sas.zip).
- CDC/NCHS, [2018 NAMCS SAS value formats](https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Dataset_Documentation/NAMCS/2018/nam18for.txt).
