# Scientific, Human-Factors, and Regulatory Gates

Status: PRECLINICAL / SILENT / REFUSED

## Gate 0: prior art and intended use

- Complete the open prior-art protocol with patent-family expansion, CPC/IPC searching, citation chaining, and two independent reviewers.
- Freeze the intended-use statement before cohort extraction.
- Obtain a documented Brazilian SaMD classification assessment under RDC 657/2022.
- Map the lifecycle to IMDRF SaMD clinical evaluation and the CFM 2.454/2026 governance requirements.

## Gate 1: retrospective calibration

- Patient-level temporal split with no patient leakage.
- At least one geographically or institutionally external evaluation site.
- Prespecified outcomes and adjudication procedure.
- Split conformal calibration with class-conditional and subgroup reporting.
- Report Brier score, log loss, ECE, prediction-set coverage and size, top-3 recall, severity sensitivity, selective risk-coverage curves, and decision-curve net benefit.

Promotion requires all of the following:

- Marginal and class-conditional lower confidence bounds meet the declared coverage target.
- Pneumonia appears in the top three in at least 95% of adjudicated pneumonia cases.
- Sensitivity for prespecified severity outcomes is at least 95%.
- Brier score improves by at least 10% over the frozen heuristic baseline.
- ECE is at most 0.05.
- Net benefit is non-inferior to the best clinically relevant default strategy over the prespecified threshold range.
- No audited subgroup fails its declared coverage target.

## Gate 2: prospective silent evaluation

- Follow DECIDE-AI principles with no visible probabilities or treatment automation.
- Capture clinician decisions before revealing any model output.
- Measure counterfactual errors, alert burden, deferral rate, time-to-decision, and potential under-treatment.
- Report the prediction model study using TRIPOD+AI.

## Gate 3: human-factors evaluation

- Randomize at least three refusal presentations: silent removal, generic abstention, and structured `known / unknown / safest next action`.
- Primary endpoints: diagnostic error, omission error, inappropriate treatment, time, and calibrated clinician trust.
- Test pediatric, high-acuity, low-literacy, and high-workload scenarios.

## Gate 4: production authorization

- Rebuild and reconcile the default Sounio compiler artifact.
- Re-run native/WASM parity and policy-oracle generation.
- Sign the calibration certificate and firewall receipt with a managed production key.
- Verify signatures in the browser, not merely presence of a signature field.
- Activate drift monitoring, revocation, audit logging, patient disclosure, and structured chart documentation.

## Primary governance sources

- [FUTURE-AI international consensus](https://www.bmj.com/content/388/bmj-2024-081554)
- [TRIPOD+AI](https://www.bmj.com/content/385/bmj-2023-078378)
- [DECIDE-AI](https://www.nature.com/articles/s41591-022-01772-9)
- [IMDRF SaMD clinical evaluation](https://www.imdrf.org/documents/software-medical-device-samd-clinical-evaluation)
- [CFM Resolution 2.454/2026 overview](https://portal.cfm.org.br/noticias/cfm-normatiza-uso-da-ia-na-medicina/)
- [Anvisa RDC 657/2022 SaMD questions and answers](https://www.gov.br/anvisa/pt-br/centraisdeconteudo/publicacoes/produtos-para-a-saude/manuais/software-como-dispositivo-medico-perguntas-e-respostas/view)
