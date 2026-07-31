# e-SUS Notifica 2024 public availability audit v1

## Question

Can the official 2024 e-SUS Notifica publication be used for a governed pediatric respiratory prevalidation extraction without credentials or an access-control workaround?

## Official publication

- Dataset: [Notificacoes de Sindrome Gripal - 2024](https://dadosabertos.saude.gov.br/dataset/notificacoes-de-sindrome-gripal-leve-2024).
- Data dictionary: [API e-SUS Notifica data dictionary](https://datasus.saude.gov.br/wp-content/uploads/2023/04/Dicionario-de-dados_API-E-SUS-Notifica_13_12_22-1.pdf).
- Package ID: `1cafa064-b37d-4867-90ff-1e7eb71206ef`.
- Catalog metadata last modified: `2025-12-21T19:01:15.196745`.
- Resource label date: `20/12`, interpreted only as publication metadata and not as an independently verified row cutoff.

The source represents notifications of suspected mild or moderate COVID-era influenza-like illness. It is not a representative APS/SUS encounter cohort and does not contain the frozen 12-observation vector with adjudicated nine-class outcomes.

## Executable method

`pnpm audit:public-esus-notifica-2024` performs a metadata-first availability audit:

1. Fetch the official dataset page without cookies, credentials or authorization headers.
2. Isolate and parse the structured `__NEXT_DATA__` JSON object.
3. Require the frozen package identity, active public state and exactly 31 resources.
4. Require three PDF resources and 28 active CSV resources covering all 27 federative units plus `NI`.
5. Require every CSV URL to use the official HTTPS S3 host and `/SGL/2024/uf=XX/lote=1/` path, with no user information, query token or fragment.
6. Issue one unauthenticated `Range: bytes=0-4095` request per CSV with redirects disabled.
7. Record response headers and cancel the response stream without consuming any body.

The receipt binds the registry, audit script, dataset HTML, embedded JSON and normalized resource manifest by SHA-256. It is written to the ignored `.clinical-kernel-build/public-data/` directory.

## Result on 2026-07-30

The catalog returned HTTP 200 and contained 31 of 31 expected resources. All 28 state partitions were present in metadata. However, 28 of 28 published CSV resources returned HTTP 403 with `application/xml`; no content range, ETag or last-modified header was available for a data object.

Therefore:

- `directCsvAccessible=false`
- `headersVerified=false`
- `responseBodiesRead=false`
- `patientRowsRead=false`
- `patientRowsPersisted=false`
- `extractionAuthorized=false`
- `unknownNeverCoercedToAbsent=true`
- `probabilitiesEstimated=false`
- `prescriptionRecommendationAuthorized=false`
- `apsCalibrationAuthorized=false`
- `clinicalActivationAuthorized=false`
- firewall disposition `REFUSE`

No private or signed URL was requested, no credential was supplied, and no alternative path was used to bypass the published access state.

## Re-entry rule

An HTTP 200 or 206 response in a later audit changes the state only to `header-review-required`. It does not authorize extraction. Before any row stream is opened, the public object identity, content length, CSV header, delimiter, encoding and required fields must be reconciled against the official dictionary and a new frozen receipt. Positive symptom codes may map only to present; non-selection and missingness remain unknown, never absent.

Even after access is restored, this source remains restricted to syndromic development, missingness analysis and temporal transportability work. It cannot calibrate APS priors, estimate treatment effects, generate prescriptions or activate the clinical kernel.
