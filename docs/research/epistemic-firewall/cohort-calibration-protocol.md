# Retrospective Cohort And Calibration Protocol

## Status

Protocol version: `0.2.0`

Clinical status: research infrastructure only. No patient cohort has been bound to the active certificate, and no result from the synthetic fixture may be used to support clinical performance claims.

## Objective

Estimate and audit the uncertainty of the pediatric respiratory differential kernel in Brazilian APS/SUS care. The first endpoint is coverage of a class-conditional split-conformal prediction set. Secondary endpoints are prediction-set size, multiclass Brier score and Brier skill against the frozen APS comparator, five-bin expected calibration error, pneumonia top-3 recall, invariant red-flag sensitivity, and pneumonia decision-curve net benefit at a prespecified 10% threshold.

## Cohort Contract

Input must conform to `clinical/epistemic-firewall/schemas/retrospective-cohort.schema.json`.

- Only SHA-256 pseudonyms cross the analysis boundary for patient, encounter, and site.
- Direct-identifier and unknown keys are rejected.
- Age is represented as integer days from 0 through 6,574; date of birth is prohibited.
- The 12 observations use `-1` for unknown, `0` for absent, and `1` for present.
- The reference condition must be adjudicated and map to one of the nine evidence-bundle conditions.
- Version 1 accepts exactly one index encounter per patient. Repeated episodes are rejected until cluster-aware uncertainty estimation is implemented.
- Clinical cohorts require a data-use approval identifier and may not contain synthetic adjudication.
- The deterministic fixture uses synthetic adjudication and is permanently ineligible for promotion.

This contract reduces accidental identifier handling but is not, by itself, a complete privacy or re-identification risk assessment.

## Temporal Split

Patients are ordered by their index encounter date and assigned to development, calibration, and evaluation partitions in a 60/20/20 ratio. The receipt records partition hashes, date ranges, counts, and an explicit zero-leakage check. The one-encounter-per-patient v1 contract keeps the unit of analysis aligned with the Wilson and Brier calculations.

The development partition is reserved for future model fitting. The current candidate likelihood model is not refit by this pipeline. Calibration derives class-conditional nonconformity thresholds from `1 - posterior(true class)`. Evaluation is untouched until thresholds have been fixed.

## Mathematical Authority

All posterior probabilities, comparator normalization, nonconformity scores, finite-sample conformal ranks, prediction-set membership, coverage, Brier metrics, Wilson interval, and decision-curve metric are calculated by `conformal-calibration.sio`. Node.js performs schema validation, partition governance, source generation, compilation, receipt hashing, and parsing only.

For class `c` with `n_c` calibration observations, the one-based order statistic is:

`min(n_c, ceil((n_c + 1) * 0.95))`

The implementation uses exact integer arithmetic for this rank. Empty calibration classes are reported and block promotion.

## Frozen APS Comparator

The comparator is versioned in `clinical/epistemic-firewall/current-aps-comparator.json` and validated against `schemas/current-aps-comparator.schema.json`. The adapter executes the current product heuristic and returns only its raw 0-100 scores for the nine target conditions. It does not convert them into probabilities.

The Sounio oracle adds a prespecified smoothing constant of one to every raw score, normalizes the nine values to sum to one, calculates multiclass Brier score, and reports Brier skill as:

`(Brier_APS - Brier_Sounio) / Brier_APS`

The receipt binds the comparator configuration, adapter, mapped disease and symptom source set, raw output, Sounio source, and compiler by SHA-256. Changing any of these inputs invalidates comparability with an earlier report.

## Subgroups

The first mandatory subgroup audit is age:

- 0-1 years: less than 730 days;
- 2-5 years: 730 through 2,189 days;
- 6-17 years: 2,190 through 6,574 days.

Before a real analysis is frozen, the statistical analysis plan must prespecify sex, race/skin-color, site, comorbidity, immunization, and data-missingness audits where lawful, available, and sufficiently powered. Sparse subgroups must be reported rather than pooled silently.

## Precision And Governance Gates

The earlier fixed requirements of 1,000 total patients and 200 evaluation patients have been removed. The Sounio oracle now performs a prespecified coverage-precision calculation: assuming true coverage of 0.98, it finds the smallest class-specific evaluation sample for which the lower 95% Wilson bound reaches 0.95. It then projects an overall evaluation requirement from the observed development-set class mix. For the balanced engineering fixture this yields 203 evaluation patients per condition and 1,827 overall.

At least 19 calibration observations per class are required before the 95% conformal order statistic is no longer forced to the maximum observed nonconformity score. This is a finite-sample conformal support boundary, not proof that 19 observations estimate the threshold precisely.

Governance independently requires two sites, all nine conditions in calibration and evaluation, and double chart review for every clinical record. A synthetic fixture can never satisfy the clinical adjudication gate.

This Wilson calculation addresses coverage precision only. It does not size calibration slope, discrimination, subgroup analyses, or net benefit. Full protocol lock must therefore add model- and setting-specific calculations using anticipated prevalence, prediction distribution, calibration, and clinical thresholds, following Riley and colleagues rather than a blanket events rule ([Statistics in Medicine, 2021](https://onlinelibrary.wiley.com/doi/full/10.1002/sim.9025); [BMJ, 2024](https://www.bmj.com/content/384/bmj-2023-074821)).

The current scientific gates are:

- marginal and age-group coverage at least 95%;
- all class-conditional coverage values at least 95%;
- lower 95% Wilson bound for marginal coverage at least 95%;
- pneumonia in the top three at least 95%;
- red-flag severity sensitivity at least 95%.
- expected calibration error at most 0.05;
- Brier score at least 10% better than a prespecified comparator.

The comparator, version, symptom priority, disease aliases, smoothing rule, and output contract are now frozen before any real evaluation. Fixture Brier skill demonstrates executable comparison only and carries no clinical interpretation.

Passing these gates does not activate the kernel. Distribution-reference construction, delayed-label monitoring, independent statistical review, prospective silent evaluation, and an external production signature remain mandatory.

## Reproducibility

Run the non-clinical engineering fixture:

```bash
pnpm calibrate:epistemic-firewall:fixture
```

Validate only the input and split contract:

```bash
node scripts/calibrate-epistemic-firewall.mjs --fixture --validate-only
```

Analyze an approved cohort without copying it into the repository:

```bash
node scripts/calibrate-epistemic-firewall.mjs --cohort /secure/path/cohort.json
```

The report is written under the ignored `.clinical-kernel-build/calibration/` directory. Never commit clinical cohort files or patient-level derivatives.

## Reporting Boundary

Retrospective development and validation will be reported against [TRIPOD+AI](https://www.bmj.com/content/385/bmj.q902). The later prospective silent phase will follow [DECIDE-AI](https://www.nature.com/articles/s41591-022-01772-9). Conformal risk control is treated as prior methodological art, not as a Darwin novelty claim ([ICLR 2024](https://proceedings.iclr.cc/paper_files/paper/2024/hash/f3549ef9b5ff520a7e41ff3cc306ab2b-Abstract-Conference.html)).
