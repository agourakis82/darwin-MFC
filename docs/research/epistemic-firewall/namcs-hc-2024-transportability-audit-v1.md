# NAMCS Health Center 2024 pediatric diagnosis transportability audit v1

Executed: 2026-07-30

## Purpose

This audit tests whether the frozen Darwin pediatric respiratory diagnosis-code mappings can be reproduced in the 2024 National Ambulatory Medical Care Survey Health Center Component public-use file while preserving its complex survey design.

It does not estimate diagnostic probabilities, treatment effects or recommended prescriptions. United States health-center encounters are not Brazilian APS/SUS encounters, and diagnosis codes are not a double-adjudicated reference standard. The final firewall disposition is `REFUSE`.

## Official design

The public-use file is a 5 percent sample of visits submitted by 107 responding health centers. The unweighted response rate was 27.9 percent. The public file contains 503,799 encounters and represents 123,817,677 visits after applying `VISWT`.

The audit follows the published design variables:

- visit weight: `VISWT`;
- sampling stratum: `STRATUM_S`;
- primary sampling unit: `HCID_S`;
- variance: Taylor series linearization;
- domain analysis: retain every source row and represent pediatric age bands with indicators.

The eight strata and 107 sampled centers yield 99 design degrees of freedom. No stratum contains a single center.

## Reproducible execution

Run:

```bash
pnpm test:public-namcs-hc-2024-adapter
pnpm analyze:public-namcs-hc-2024
```

The full command downloads the official RDS into a temporary directory and verifies its byte count and SHA-256 before execution. R exports only age, design markers, weight and `DX1`-`DX30` to a temporary TSV. Node maps the diagnosis codes independently and calculates Taylor-linearized estimates from center totals. A separate R `survey` 4.5 path maps the original RDS independently and acts as the statistical oracle.

The temporary RDS and derived encounter rows are deleted. The durable receipt contains aggregates only: `patientRowsPersisted=false`, `recordIdentifiersPersisted=false` and `temporaryDerivedRowsDeleted=true`.

## Frozen source identity

- File: `namcshc2024_R.rds`.
- Bytes: 14,135,511.
- SHA-256: `66dd4cfefb95a7938b735ecb0da9dadc78ff72825175296e6a7f9aa4e577533c`.
- Source encounters: 503,799.
- Pediatric encounters: 100,730.
- Weighted total: 123,817,677.106 visits.
- Weighted pediatric total: 23,825,240.294 visits.

The total design-adjusted standard error reconciled to the CDC value of 19,593,238 visits.

## Independent-executor gate

Node and R compared 54 totals and ratios. They matched all unweighted numerators, denominators and degrees of freedom.

- Maximum relative point-estimate error: `1.97e-12`.
- Maximum relative standard-error error: `3.59e-15`.
- Required tolerance: `1e-9`.
- Degrees of freedom: 99 in both executors.

The receipt binds the RDS, registry, Node analyzer, R oracle, linearization module, pinned `survey` package tree and `Rscript` executable by SHA-256.

## Descriptive code shares

The values below are shares of pediatric health-center encounters containing at least one matching code in `DX1`-`DX30`. They are not disease prevalence among children and cannot be interpreted as diagnostic accuracy.

| Code group | Unweighted encounters | Weighted share | Exploratory 95% interval |
| --- | ---: | ---: | ---: |
| Asthma (`J45`) | 4,004 | 4.06% | 3.05%-5.08% |
| IVAS (`J00`, `J06`) | 3,917 | 3.92% | 3.14%-4.70% |
| Pharyngitis/tonsillitis (`J02`, `J03`) | 3,213 | 2.97% | 2.28%-3.66% |
| Influenza/COVID (`J09`-`J11`, `U07.1`) | 1,393 | 1.37% | 0.90%-1.85% |
| Pneumonia (`J12`-`J18`) | 477 | 0.47% | 0.29%-0.66% |
| Bronchiolitis (`J21`) | 434 | 0.39% | 0.22%-0.56% |
| Croup (`J05`) | 153 | 0.15% | 0.11%-0.20% |
| Pertussis (`A37`) | suppressed | suppressed | suppressed |

The code groups can overlap within one encounter and do not form a mutually exclusive nine-condition outcome. An absent matching code means only "not coded in the 30 public diagnosis fields"; it does not establish clinical absence.

## Age transportability signals

Age-specific estimates remain descriptive. Examples that passed the exploratory display gate include:

- bronchiolitis code share under age 2: 1.18% (95% interval 0.78%-1.58%);
- asthma code share at ages 5-11: 5.15% (3.75%-6.56%);
- asthma code share at ages 12-17: 4.96% (3.67%-6.25%);
- pharyngitis/tonsillitis code share at ages 5-11: 4.25% (3.19%-5.31%).

These patterns can stress-test transportability assumptions. They cannot set APS/SUS priors or produce a differential diagnosis.

## Disclosure and reliability boundary

The exploratory gate requires at least 30 unweighted numerator encounters, at least 8 design degrees of freedom and relative standard error no greater than 30 percent. Weighted counts are rounded to the nearest thousand.

Of 54 metrics, 44 were published and 10 were suppressed without retaining counts or estimates. All pertussis metrics were suppressed. The remaining suppressed cells were pneumonia under age 2, bronchiolitis at ages 5-11 and 12-17, and croup at ages 12-17.

This conservative gate is not formal NCHS publication certification. The normal/Wald intervals are exploratory and must not be used as clinical thresholds.

The authorization boundary is invariant: `probabilitiesEstimated=false`, `treatmentEffectsEstimated=false`, `apsCalibrationAuthorized=false`, `prescriptionRecommendationAuthorized=false`, `clinicalActivationAuthorized=false` and firewall disposition `REFUSE`.

## Official sources

- CDC/NCHS, [2024 NAMCS questionnaires, datasets and documentation](https://www.cdc.gov/nchs/namcs/documentation/about-the-data-2024.html).
- CDC/NCHS, [2024 NAMCS Health Center Component technical documentation](https://www.cdc.gov/nchs/data/namcs/2024-health-center-component/2024-NAMCS-HC-Component-Technical-Documentation2.pdf).
- CDC/NCHS, [2024 NAMCS Health Center Component codebook](https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Dataset_Documentation/NAMCS/2024/2024-NAMCS-HC-Component-Codebook.pdf).
- CDC/NCHS, [NAMCS Health Center Component public-use catalog](https://data.cdc.gov/National-Center-for-Health-Statistics/National-Ambulatory-Medical-Care-Survey-Health-Cente/wj2j-rzx9).
