# Multicenter Extraction And Deidentification Checklist

## Governance Before Extraction

- [ ] Data-use approval and ethics determination are documented for each site.
- [ ] The intended-use statement, SAP, data dictionary, and site mapping are version-locked before outcome inspection.
- [ ] A site data steward and two independent clinical adjudicators are named outside the repository.
- [ ] The analytic purpose, retention period, access list, incident process, and destruction procedure are approved.
- [ ] The site confirms the lawful basis for processing sensitive health data under applicable Brazilian governance and the LGPD.

## Source Mapping

- [ ] Every one of the 12 observation IDs maps to explicit source fields and a deterministic transformation.
- [ ] Units, value sets, extraction window, and precedence rules are documented.
- [ ] Unknown, absent, not measured, and not documented are not collapsed.
- [ ] The nine reference classes use double chart adjudication; billing codes alone are insufficient.
- [ ] Adjudicators are blinded to Sounio and comparator output.
- [ ] Exactly one index encounter is selected per patient for cohort contract v1.

## Prohibited Data

- [ ] No name, social name, CPF, CNS, telephone, email, record number, or account number is exported.
- [ ] No date of birth, full address, precise geolocation, photograph, biometric, or device identifier is exported.
- [ ] No free-text note, attachment, imaging file, audio, or genomic sequence is exported.
- [ ] Encounter date is limited to the index date required for temporal splitting and is protected under the approved environment.
- [ ] Age is exported only as integer days at the index encounter.

## Pseudonymization

- [ ] Patient, encounter, and site identifiers are HMAC-SHA-256 pseudonyms, not unsalted hashes of source identifiers.
- [ ] Site-held secrets never leave the source institution and are not reused across unrelated projects.
- [ ] The linkage table remains at the source site under separate access control.
- [ ] Collision, null, duplicate, and one-patient-one-encounter checks pass before transfer.

Pseudonymization is not anonymization. A documented re-identification risk assessment and contractual controls remain necessary.

## Transfer And Storage

- [ ] Only the JSON cohort contract is transferred through an approved encrypted channel.
- [ ] The repository, issue tracker, chat, logs, and screenshots contain no patient-level records.
- [ ] The approved analysis environment uses least privilege, audit logging, encryption at rest, and an expiry date.
- [ ] Raw exports and patient-level derivatives are excluded from Git and routine application backups.
- [ ] Hashes and aggregate receipts may be retained; patient-level files follow the approved destruction schedule.

## Pre-Analysis Gate

- [ ] `pnpm validate:multicenter-package` passes.
- [ ] `node scripts/calibrate-epistemic-firewall.mjs --cohort /secure/path/cohort.json --validate-only` passes.
- [ ] There is zero patient leakage across temporal partitions.
- [ ] At least two sites and all nine classes are represented as required.
- [ ] Any mapping deviation is resolved by a versioned amendment before analysis, never by an undocumented runtime rule.
