# NAMCS 2018 complex-survey parity v1

Executed: 2026-07-30

## Purpose

This gate validates design-based totals, ratios and standard errors for the public 2018 NAMCS snapshot. It is a statistical implementation check, not diagnostic calibration, causal inference or APS/SUS evidence.

The Node implementation uses Taylor linearization for a stratified with-replacement ultimate-cluster design. The independent oracle uses R `survey` 4.5 with `PATWT` as the visit weight, `CSTRATM` as the masked stratum and `CPSUM` as the sampled-provider cluster. These variables and the equivalent survey setup are specified in the official CDC micro-data documentation.

## Reproducible execution

Run:

```bash
pnpm test:public-namcs2018-variance
pnpm bootstrap:public-namcs2018-survey-oracle
pnpm verify:public-namcs2018-survey-parity
```

The bootstrap downloads the exact CRAN `survey` 4.5 source archive and requires SHA-256 `8a2ab01759f9acf6000274255edf00e342dfbf320a39fb76d42594e4d262b519`. It rebuilds into `.clinical-kernel-build/r-library`, never into the global R library. The runtime receipt records R, package and dependency versions, the real `Rscript` path and executable hash, and a canonical hash of the installed `survey` tree. A new run invalidates the prior receipt before rebuilding it.

The parity command downloads and verifies the official NAMCS snapshot, derives only binary audit variables plus the three public-use design fields, and writes them to a temporary TSV. Both the TSV and R output are deleted before the aggregate receipt is emitted. No source row or record identifier is persisted.

## Methods

For each stratum `h` and sampled provider `i`, the Node executor first aggregates weighted variable totals by provider. Total variance is:

```text
V(T) = sum_h [n_h / (n_h - 1)] * sum_i (t_hi - mean_h)^2
```

For a ratio `R = T_y / T_x`, provider residual totals are `z_hi = T_yhi - R*T_xhi`; their stratified variance is divided by `T_x^2`. The oracle independently evaluates the same estimands through `survey::svytotal` and `survey::svyratio`.

The gate compares 21 point estimates and standard errors at a maximum relative error of `1e-9`. Normal/Wald 95% intervals are emitted only for totals and ratios with at least 30 positive sampled visits. Smaller cells retain estimate/SE parity evidence but their intervals are suppressed.

## Parity result

- Source visits: 9,953.
- Masked strata: 60.
- Sampled-provider clusters: 496.
- Design degrees of freedom: 436.
- Metrics compared: 21.
- Maximum point-estimate relative error: `1.7356334705669986e-15`.
- Maximum standard-error relative error: `2.0550521625440616e-15`.
- Degrees of freedom matched for every metric.

Selected aggregate results:

| Metric | Estimate | Standard error | 95% descriptive interval |
|---|---:|---:|---:|
| Pediatric visit total | 128,781,463.19 | 15,408,352.21 | 98,581,092.86 to 158,981,833.53 |
| Respiratory audit-domain total | 36,443,506.80 | 7,123,528.47 | 22,481,391.01 to 50,405,622.60 |
| Cough mention share among pediatric visits | 0.14144 | 0.02366 | 0.09505 to 0.18782 |
| IVAS diagnosis-proxy share among pediatric visits | 0.08141 | 0.01993 | 0.04234 to 0.12049 |
| Amoxicillin mention share in respiratory audit domain | 0.15347 | 0.02713 | 0.10029 to 0.20664 |
| Albuterol mention share in respiratory audit domain | 0.13930 | 0.01884 | 0.10237 to 0.17622 |
| Acetaminophen mention share in respiratory audit domain | 0.11419 | 0.04912 | 0.01792 to 0.21046 |

Medication estimates are observed 2018 US practice patterns. They are not efficacy estimates or prescription recommendations. Diagnosis fields remain provider or billing proxies without independent adjudication.

## Authorization boundary

Successful variance parity changes only the statistical state to `design-variance-parity-valid`. It does not make the public source transportable to Brazilian primary care and cannot promote the clinical kernel.

The receipt remains invariant at `apsCalibrationAuthorized=false`, `prescriptionRecommendationAuthorized=false`, `clinicalActivationAuthorized=false` and firewall disposition `REFUSE`.

## Official sources

- CDC/NCHS, [2018 NAMCS micro-data documentation](https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Dataset_Documentation/NAMCS/2018/doc2018-508.pdf).
- CDC/NCHS, [2018 NAMCS public-use catalog](https://data.cdc.gov/National-Center-for-Health-Statistics/National-Ambulatory-Medical-Care-Survey-2018-2019-/nf35-ec5c).
- CRAN, [`survey` package](https://CRAN.R-project.org/package=survey).
