# Coverage Precision And Sample-Size Method Note

## Decision

The fixed product rules of 1,000 total patients and 200 evaluation patients were removed from the executable calibration pipeline. They were not tied to prevalence, class balance, calibration, discrimination, or clinical thresholds and therefore could not justify validation adequacy.

The replacement is intentionally narrower: an executable precision calculation for conformal coverage. It is not presented as a complete external-validation sample-size calculation.

## Implemented Calculation

The Sounio oracle prespecifies:

- anticipated class-conditional coverage `p* = 0.98`;
- target lower confidence bound `L = 0.95`;
- two-sided confidence level `0.95`, using `z = 1.959963984540054`;
- Wilson score lower bound for a binomial proportion.

For each integer `n` from 1 through 100,000, Sounio evaluates the Wilson lower bound at `p*` and returns the first `n` for which the lower bound reaches `L`. The current result is 203 evaluation patients per condition.

The overall evaluation projection uses the development-set class mix:

`max_c ceil(203 / prevalence_c)`

For the balanced synthetic fixture, every condition has prevalence `1/9`, producing 1,827 evaluation patients. A real cohort will produce a different requirement. A class absent from development returns `-1` and blocks promotion.

For 95% split conformal calibration, at least 19 calibration observations per class are required before `ceil((n + 1) * 0.95)` stops exceeding `n`. This prevents the finite-sample quantile from being forced to the maximum score, but it does not guarantee precise threshold estimation.

## Interpretation Boundary

The calculation answers only this question: under the anticipated coverage assumption, how many independent patients are needed for the Wilson lower bound to reach the target?

It does not establish adequate precision for:

- calibration intercept or slope;
- discrimination;
- multiclass Brier skill difference;
- net benefit across clinical thresholds;
- rare-condition or intersectional subgroup performance;
- repeated encounters or site clustering;
- distribution-shift monitoring.

Version 1 therefore accepts one index encounter per patient. A future cluster-aware analysis must be implemented before repeated episodes are allowed.

## Evidence Basis

Riley and colleagues show that external-validation sample size should target precision for model-specific performance measures and depend on anticipated prevalence, prediction distribution, calibration, and clinical thresholds, rather than blanket event-count rules ([Statistics in Medicine, 2021](https://doi.org/10.1002/sim.9025)). Their worked example also shows that the governing requirement may come from calibration slope rather than a simpler measure.

Simulation work found model-specific calculations more reliable than common rules of thumb for calibration, discrimination, and clinical utility ([Journal of Clinical Epidemiology, 2021](https://doi.org/10.1016/j.jclinepi.2021.02.011)). The accompanying clinical-methods tutorial likewise recommends tailoring external-validation sizing to the model and setting ([BMJ, 2024](https://www.bmj.com/content/384/bmj-2023-074821)).

Brier score remains an overall probabilistic accuracy measure, not a substitute for clinical utility; decision-curve analysis remains separately required ([Journal of Clinical Epidemiology, 2019](https://pmc.ncbi.nlm.nih.gov/articles/PMC6460786/)).

## Required Next Statistical Work

Before a real protocol lock, an independent statistician must prespecify:

1. multiclass calibration and discrimination estimands;
2. uncertainty for paired Brier skill against the frozen APS comparator;
3. condition prevalence and site effects;
4. net-benefit thresholds and desired precision;
5. subgroup multiplicity and minimum reporting rules;
6. handling of missing observations and delayed labels.

Until that work and a real cohort are bound to the receipt, the calibration certificate remains `not-calibrated`.
