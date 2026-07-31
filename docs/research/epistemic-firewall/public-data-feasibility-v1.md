# Public respiratory data feasibility v1

Reviewed: 2026-07-30

## Decision

No open patient-level APS/SUS cohort identified in the reviewed official sources has all of the following: pediatric age, the frozen 12 observations, a nine-condition reference standard, index-encounter timing, treatment, and outcomes.

This is an inference from the official public-access descriptions reviewed on the date above, not a claim that no such dataset can exist. SISAB and SIAPS public products are described as aggregate reports, while more detailed access is restricted to authorized health managers. The target-domain gap therefore remains real.

Public data cannot promote the firewall. It can support engineering, external safety analysis, transportability analysis, and study design while `apsCalibrationAuthorized=false` and the product remains `REFUSE`.

## Source portfolio

| Source | Useful signal | Valid role | Blocking mismatch |
| --- | --- | --- | --- |
| SIVEP-Gripe SRAG | Age, fever report, cough, sore throat, dyspnea, SpO2 below 95%, ICU, ventilation, outcome, virology | Severity and red-flag stress testing | Hospitalized SRAG and deaths create severe spectrum bias; the SpO2 threshold differs from the frozen APS definition |
| e-SUS Notifica SG | Age, positive symptom mentions, symptom onset, COVID tests and outcome | Syndromic adapter and missingness development | Suspected COVID-19 surveillance is not all-cause APS; non-selection is not explicit symptom absence |
| NAMCS 2018 office visits | Age in days, reasons for visit, temperature, up to five diagnoses and 30 medications | Ambulatory adapter, treatment-pattern audit, international transportability | United States 2018 practice is not SUS; observed prescribing is not recommended care; labels are not double adjudicated |
| NAMCS Health Center 2024 | 503,799 encounters, age and up to 30 ICD-10-CM diagnoses | Diagnosis-code and age transportability audit | Public file does not expose the frozen symptom vector or medications |
| SINAN pertussis TabNet | Age, place and time aggregates for notified pertussis | Epidemiologic context and rare-event stress scenarios | Aggregate incidence cannot label encounters or estimate a prior among symptomatic APS visits |

## Canonical mapping policy

1. Unknown remains `-1` and is never converted to absent.
2. A symptom listed as a reason for visit may establish presence, but its omission does not establish absence.
3. A proxy with an incompatible threshold remains unknown in the canonical vector. In particular, SIVEP `SATURACAO` means SpO2 below 95%, while the frozen Darwin definition requires room-air SpO2 below 92%.
4. Billing or provider diagnosis codes are development labels only. They do not satisfy the frozen double-adjudication reference standard.
5. Population incidence is not a symptomatic-encounter prior.
6. Medication associations describe observed practice. They cannot generate or authorize prescriptions.

## Executable first phase

The public-data lane should run five analyses before any request for institutional data:

1. SIVEP pediatric sensitivity analysis for ICU, ventilation and death, stratified by age, calendar time and geography.
2. NAMCS 2018 extraction feasibility for fever, cough, coryza, sore throat, dyspnea and wheeze using positive-only reason-for-visit mappings, with medication associations kept descriptive.
3. NAMCS 2024 diagnosis-code transportability audit for the eight named respiratory conditions, preserving survey weights and site clustering.
4. e-SUS Notifica availability and missingness audit. No row extraction begins until the current public endpoint and disclosure controls are reverified.
5. SINAN pertussis age-by-year aggregate audit. Confirmed notifications remain epidemiologic context and never become a symptomatic-encounter prior.

All analyses must produce versioned data dictionaries, source hashes, inclusion counts, missingness tables and non-patient receipts. No source rows, identifiers or public endpoint credentials belong in this repository.

## Promotion boundary

These public datasets can falsify unsafe behavior and expose transportability failure. They cannot establish APS/SUS calibration because none jointly represents the target encounter population, frozen predictors and adjudicated outcomes.

A future calibrated certificate still requires either an approved target-domain retrospective cohort or a prospectively collected silent APS cohort, plus the frozen SAP, independent review, distribution fingerprint, validity interval and production signature.

## Executed public audit

The frozen 2025 SIVEP-Gripe snapshot was re-executed on 2026-07-30 with age, final-classification and outcome stratification. All 336,260 rows, 381,900,544 bytes and the frozen SHA-256 reconciled. A disclosure threshold of 30 left six of 24 age-classification rows publishable, with 17 primary and one complementary suppression. The method, non-patient aggregates and refusal boundary are recorded in [SIVEP-Gripe pediatric stratified safety audit v2](./sivep-srag-stratified-safety-v2.md).

The NAMCS 2018 ambulatory adapter was executed on 2026-07-30. It reconciled all 9,953 source visits and the weighted total documented by CDC, while retaining `PATWT`, `CSTRATM` and `CPSUM`. The reproducible mapping, hashes, aggregate results and reliability boundary are recorded in [NAMCS 2018 pediatric respiratory ambulatory audit v1](./namcs2018-ambulatory-audit-v1.md). A second independent executor gate subsequently established numeric parity for 21 design-based estimates and standard errors; see [NAMCS 2018 complex-survey parity v1](./namcs2018-complex-survey-parity-v1.md).

The NAMCS Health Center 2024 audit was executed on 2026-07-30. It reconciled all 503,799 public encounters, 107 centers, eight strata and the CDC weighted total. Node and R `survey` 4.5 matched 54 age and diagnosis-code estimates within `1e-9`; 10 unreliable or small metrics were suppressed. See [NAMCS Health Center 2024 pediatric diagnosis transportability audit v1](./namcs-hc-2024-transportability-audit-v1.md).

The e-SUS Notifica 2024 publication was revalidated on 2026-07-30. The official catalog exposed 31 active resources, including 28 state-partitioned CSV entries, but every published CSV endpoint returned HTTP 403 to an unauthenticated range request. No response body or patient row was read or persisted. Extraction remains blocked; see [e-SUS Notifica 2024 public availability audit v1](./esus-notifica-2024-availability-audit-v1.md).

The SINAN pertussis TabNet audit was executed on 2026-07-30. It reconciled a national age-by-symptom-year matrix across all 20 notification files and 18 completed symptom years. The 2024 table contained 7,748 confirmed notifications, 4.95 times the 2019 count but below the 8,498 recorded for 2014. Age bands, revision status, suppression and the prohibition on deriving a symptomatic APS prior are documented in [SINAN pertussis TabNet epidemiologic stress audit v1](./sinan-pertussis-tabnet-audit-v1.md).

This execution does not close the target-domain gap. It provides a transportability and observed-practice stress test only; the firewall remains `REFUSE`.

## Official sources

- Brazilian Ministry of Health, [SIVEP-Gripe SRAG open dataset](https://dadosabertos.saude.gov.br/dataset/srag-2019-a-2026).
- Brazilian Ministry of Health, [e-SUS Notifica mild and moderate influenza-like illness 2024](https://dadosabertos.saude.gov.br/dataset/notificacoes-de-sindrome-gripal-leve-2024).
- DATASUS, [e-SUS Notifica data dictionary](https://datasus.saude.gov.br/wp-content/uploads/2023/04/Dicionario-de-dados_API-E-SUS-Notifica_13_12_22-1.pdf).
- Brazilian Ministry of Health, [SISAB public-access FAQ](https://sisab.saude.gov.br/paginas/acessoPublico/faq/IndexFaq.xhtml).
- Brazilian Ministry of Health, [SIAPS system description](https://sisaps.saude.gov.br/sistemas/siaps/).
- DATASUS, [SINAN diseases and conditions from 2007 onward](https://datasus.saude.gov.br/acesso-a-informacao/doencas-e-agravos-de-notificacao-de-2007-em-diante-sinan/).
- DATASUS, [SINAN pertussis national TabNet form](https://tabnet.datasus.gov.br/cgi/deftohtm.exe?sinannet/cnv/coquebr.def).
- DATASUS, [TabNet usage and export instructions](https://tabnet.datasus.gov.br/tabnet/tabdescr.htm).
- CDC/NCHS, [NAMCS overview](https://www.cdc.gov/nchs/namcs/about/).
- CDC/NCHS, [NAMCS questionnaires, datasets and documentation](https://www.cdc.gov/nchs/namcs/documentation/index.html).
- CDC/NCHS, [NAMCS 2018-2019 public-use catalog entry](https://data.cdc.gov/National-Center-for-Health-Statistics/National-Ambulatory-Medical-Care-Survey-2018-2019-/nf35-ec5c).
- CDC/NCHS, [NAMCS Health Center Component 2022-2024 public-use catalog entry](https://data.cdc.gov/National-Center-for-Health-Statistics/National-Ambulatory-Medical-Care-Survey-Health-Cente/wj2j-rzx9).
