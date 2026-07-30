# Multicenter APS Site Onboarding Runbook

Status: operational research template. This is not legal advice, ethics approval, a data-use agreement, or clinical authorization.

No locked mapping authorizes calibration or clinical use. A locked mapping only proves that a site-specific extraction contract was complete and unchanged when validated.

## Regulatory boundary

Each participating service must retain its own source documents and local responsibilities. The repository stores only schemas, templates, code, and synthetic tests. It must never contain patient records, direct identifiers, linkage tables, site-held HMAC secrets, named reviewer signatures, ethics submissions, or copies of legal agreements.

The onboarding fields are designed around the following sources:

- [LGPD, including article 13 for public-health research](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm)
- [ANPD guidance for academic studies and research](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-tratamento-de-dados-pessoais-para-fins-academicos-e-para-a-realizacao-de-estudos-e-pesquisas)
- [CNS Resolution 738/2025 for research databases](https://bvsms.saude.gov.br/bvs/saudelegis/cns/2025/res_0738_22_01_2025.html)
- [INAEP 2026 guidance on single ethical review for multicenter research](https://www.gov.br/saude/pt-br/composicao/orgaos-colegiados/inaep/faq/faq/analise-unica/como-funciona-a-analise-unica)
- [STANDING Together dataset diversity and transparency recommendations](https://www.datadiversity.org/recommendations)
- [WHO guidance on sharing and reuse of health-related data](https://www.who.int/publications/i/item/9789240044968)

The institutional legal, privacy, and ethics teams remain authoritative for each site. A document identifier in the mapping is a reference to an off-repository record, not proof that the record is sufficient.

## Required roles

Use nonidentifying role IDs in the JSON mapping. Named appointments and signatures stay in the institution's controlled document system.

- coordinating principal investigator;
- local principal investigator;
- clinical reviewer;
- data steward or controller delegate;
- privacy or data-protection reviewer;
- two independent clinical adjudicators plus a prespecified disagreement resolver.

## Before mapping

1. Freeze one multicenter protocol and identify the coordinating center.
2. Record the applicable ethics-review model and approval identifier.
3. Obtain authorization from the controller of every source database.
4. Record each local data-use agreement and the common multicenter data-use approval that will be bound to the cohort.
5. Record the legal-basis assessment, RIPD or documented risk decision, retention plan, secure-environment review, and incident-response plan.
6. Confirm local responsibility even when a single coordinating CEP opinion applies.
7. Document the source population, coverage period, inclusion rules, missingness semantics, and availability of equity-audit variables.

## Create a site draft

Start from `clinical/epistemic-firewall/multicenter/site-mapping.template.json`. Use a nonidentifying `siteCode`. Do not put institution names, people, emails, credentials, paths containing patient identifiers, or document contents in the mapping.

Every observation must identify its source fields and deterministic transformation. Absence and lack of documentation are different states: undocumented remains `-1`, not `0`.

The representation section records whether sex at birth, race/skin color, comorbidity, immunization, geography, and socioeconomic proxy are lawfully available. A variable marked `unavailable-source` or `not-approved` must not name source fields. These variables remain audit-only and never enter the Sounio kernel without a new protocol and ethics review.

## Lock one mapping

Real mappings must be written outside the Git checkout:

```bash
pnpm lock:multicenter-site --input /secure/site-a.draft.json --output /secure/site-a.locked.json
```

The command:

- derives `siteHash` as domain-separated SHA-256 from the nonidentifying study site code, while patient and encounter pseudonyms remain site-held HMAC-SHA-256 values;
- changes the state from `draft` to `locked`;
- binds the lock date, review deadline, role attestations, transformations, governance references, and privacy declarations;
- computes a canonical SHA-256 with `approval.mappingSha256` treated as null during hashing;
- refuses placeholders, expired approvals, incomplete observations, or output inside the repository.

It does not sign on behalf of a person or institution and does not inspect the referenced legal documents.

## Validate two sites

```bash
pnpm validate:multicenter-package -- \
  --mapping /secure/site-a.locked.json \
  --mapping /secure/site-b.locked.json \
  --require-locked
```

Both mappings must use the same research protocol, coordinating center, and multicenter data-use approval; have distinct site codes and hashes; and remain inside their review periods. The resulting receipt may set `mappingGateReady=true`, but always records `governanceDocumentsVerified=false` and `calibrationAuthorized=false`. Human institutional review remains external to the executable gate.

## Bind a clinical cohort

The calibrator adds a stricter exact-set check:

```bash
SOUNIO_COMPILER_PATH=/verified/souc \
SOUNIO_COMPILER_RECEIPT_PATH=/verified/compiler-source.receipt.json \
node scripts/calibrate-epistemic-firewall.mjs \
  --cohort /secure/cohort.json \
  --site-mapping /secure/site-a.locked.json \
  --site-mapping /secure/site-b.locked.json
```

Every `siteHash` in the cohort must match exactly one approved mapping, every approved site must be represented, and the cohort data-use approval must match one referenced agreement. Unknown sites, extra mappings, duplicate sites, expired reviews, altered mappings, synthetic mappings, or missing approvals are refused before calibration.

## What remains red

- no clinical cohort is bundled or approved by this repository;
- no ethics or legal document is verified by software;
- no site mapping is accepted merely because it parses;
- no calibration report can sign or activate the browser firewall;
- no probability is clinically authorized until retrospective and prospective gates are independently satisfied.
