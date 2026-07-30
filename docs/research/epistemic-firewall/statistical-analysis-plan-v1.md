# Frozen Statistical Analysis Plan v1.0.0

## Administrative Status

Frozen: 2026-07-30, before cohort access or outcome inspection.

Clinical status: research only. No clinical promotion is permitted by this plan. Amendments must state the reason, date, affected endpoints, and whether any data were inspected. An amended plan receives a new version and invalidates earlier analysis hashes.

## Study Objective

Evaluate calibration, uncertainty coverage, diagnostic ranking, and potential clinical utility of the locked Darwin-Sounio pediatric respiratory kernel in at least two Brazilian APS services.

## Design

Retrospective multicenter cohort with exactly one index encounter per patient. Patients are ordered by index-encounter date and split 60/20/20 into development, calibration, and evaluation partitions. Patient identifiers may not cross partitions. The evaluation partition remains untouched until model and class-conditional conformal thresholds are fixed.

The first dataset must contain at least two independently governed services. Site counts and outcome prevalence will be reported separately. Pooling across sites does not erase site identity in reporting. A future external-site or leave-one-site-out analysis requires a prespecified v2 amendment because it is not implemented by pipeline v1.

## Population

Inclusion:

- age 0 through 6,574 days;
- APS/SUS index encounter for an acute respiratory presentation;
- all 12 observation states mappable as present, absent, or unknown;
- one of nine reference-condition classes assigned by double chart adjudication;
- valid data-use approval and deidentification attestation.

Exclusion:

- repeated patient episode under cohort contract v1;
- direct identifiers, dates of birth, full addresses, record numbers, or free text in the analytic file;
- synthetic or single-review adjudication in a clinical cohort;
- records whose reference class cannot be resolved after adjudication;
- unsupported care setting or age.

## Locked Predictors And Outcomes

Predictors are the 12 ordered trivalent observations in `clinical/epistemic-firewall/multicenter/data-dictionary.v1.json`. Values are `-1` unknown, `0` explicitly absent, and `1` present. Unknown is a modeled state and will not be imputed. Predictor definitions, windows, and transformations are frozen before extraction.

The primary reference outcome is the double-adjudicated condition class among the nine locked classes. The secondary safety outcome is the prespecified severity/red-flag outcome. Adjudicators must be blinded to kernel output and comparator scores.

## Locked Model And Comparator

No likelihood, prior, feature order, condition order, smoothing rule, or comparator alias may be changed after cohort access. `conformal-calibration.sio` is the sole mathematical authority for posterior probabilities, comparator normalization, nonconformity, finite-sample quantiles, prediction-set membership, Brier scores, expected calibration error, Wilson bounds, and decision-curve net benefit. TypeScript may validate, map, and parse but may not recalculate those quantities.

The frozen comparator is `current-aps-comparator.json`. It emits only raw 0-100 scores. Sounio applies add-one normalization before the comparator Brier calculation.

## Primary Endpoint

Class-conditional split-conformal prediction-set coverage in the untouched evaluation partition, with target coverage at least 0.95 for every condition.

## Secondary Endpoints

- marginal coverage and its lower 95% Wilson bound;
- mean prediction-set size;
- multiclass Brier score;
- relative Brier improvement against the frozen APS comparator;
- five-bin expected calibration error;
- pneumonia top-three recall;
- invariant red-flag severity sensitivity;
- pneumonia decision-curve net benefit at a frozen 10% threshold;
- conditional coverage by age group: 0-1, 2-5, and 6-17 years.

Site-level counts, prevalence, missingness, and all endpoint estimates will be reported. No underpowered subgroup will be silently pooled or omitted.

## Promotion Gates

All of the following are necessary but not sufficient:

- ECE at most 0.05;
- relative Brier improvement at least 0.10;
- pneumonia top-three recall at least 0.95;
- red-flag severity sensitivity at least 0.95;
- marginal, class-conditional, and age-conditional coverage at least 0.95;
- marginal lower 95% Wilson bound at least 0.95;
- all nine classes represented in calibration and evaluation;
- at least two sites and double review for every clinical record;
- coverage precision targets calculated from anticipated prevalence and performance, without a fixed events-per-variable rule.

Sample size will target precision of calibration, discrimination, classification metrics, and net benefit using population-specific assumptions. The current Wilson calculation addresses coverage only and cannot replace the broader calculations described by [Riley et al.](https://www.bmj.com/content/384/bmj-2023-074821).

## Missing Data And Multiplicity

Unknown predictor state is preserved as `-1`; no single or multiple imputation is planned in v1. Missingness frequency is reported overall, by site, class, and age subgroup. A complete-case sensitivity analysis is permitted only if prespecified before evaluation output is inspected.

There is one primary endpoint family. Secondary endpoints are interpreted with confidence intervals and exact denominators; they are not used for opportunistic model selection. Failed gates remain failed regardless of other favorable metrics.

## Bias, Fairness, And Applicability

Applicability and risk of bias will be assessed with PROBAST+AI. Reporting uses TRIPOD+AI and supplemental STARD-AI. Sex, race/skin-color, comorbidity, immunization, site, and missingness audits are required where lawfully available and sufficiently powered. Protected variables are never added to the kernel without a new protocol and ethics review.

## Reproducibility And Receipt Boundary

The analysis report binds cohort partitions, schemas, data dictionary, site mapping, SAP, model, comparator, Sounio sources, compiler source receipt, compiler binary, native output, and analysis code by SHA-256. Any changed hash invalidates comparison with an earlier report. Synthetic fixtures remain permanently ineligible for promotion.

Clinical activation additionally requires a distribution reference, drift monitor with delayed labels, independent statistical review, prospective silent evaluation, and an external production signature. Passing this SAP never changes the firewall from `REFUSE` by itself.
