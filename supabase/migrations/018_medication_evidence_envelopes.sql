-- Darwin Rx Evidence-to-Envelope Compiler.
-- This migration is staging-only until the assurance receipt is signed.

CREATE TABLE IF NOT EXISTS public.medication_evidence_graph_releases (
  id TEXT PRIMARY KEY,
  schema_version TEXT NOT NULL DEFAULT 'darwin.medication-evidence-graph-release.v1'
    CHECK (schema_version = 'darwin.medication-evidence-graph-release.v1'),
  graph_sha256 CHAR(64) NOT NULL CHECK (graph_sha256 ~ '^[0-9a-f]{64}$'),
  merkle_root_sha256 CHAR(64) NOT NULL CHECK (merkle_root_sha256 ~ '^[0-9a-f]{64}$'),
  artifact_bundle_sha256 CHAR(64) NOT NULL CHECK (artifact_bundle_sha256 ~ '^[0-9a-f]{64}$'),
  assurance_receipt_sha256 CHAR(64) NOT NULL CHECK (assurance_receipt_sha256 ~ '^[0-9a-f]{64}$'),
  status TEXT NOT NULL CHECK (status IN ('CANDIDATE', 'STALE', 'REVOKED')),
  pilot_authorized BOOLEAN NOT NULL DEFAULT FALSE CHECK (pilot_authorized = FALSE),
  production_authorized BOOLEAN NOT NULL DEFAULT FALSE CHECK (production_authorized = FALSE),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (graph_sha256, artifact_bundle_sha256)
);

CREATE TABLE IF NOT EXISTS public.medication_evidence_ai_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schema_version TEXT NOT NULL DEFAULT 'darwin.adversarial-evidence-run.v1'
    CHECK (schema_version = 'darwin.adversarial-evidence-run.v1'),
  source_node_id TEXT NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('extractor', 'falsifier')),
  provider TEXT NOT NULL CHECK (char_length(provider) BETWEEN 2 AND 120),
  model TEXT NOT NULL CHECK (char_length(model) BETWEEN 2 AND 160),
  prompt_sha256 CHAR(64) NOT NULL CHECK (prompt_sha256 ~ '^[0-9a-f]{64}$'),
  source_sha256 CHAR(64) NOT NULL CHECK (source_sha256 ~ '^[0-9a-f]{64}$'),
  response_sha256 CHAR(64) NOT NULL CHECK (response_sha256 ~ '^[0-9a-f]{64}$'),
  tool_access BOOLEAN NOT NULL DEFAULT FALSE CHECK (tool_access = FALSE),
  network_access BOOLEAN NOT NULL DEFAULT FALSE CHECK (network_access = FALSE),
  candidate_output JSONB NOT NULL,
  promotion_status TEXT NOT NULL DEFAULT 'CANDIDATE_ONLY' CHECK (promotion_status = 'CANDIDATE_ONLY'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (mode, provider, model, source_sha256, prompt_sha256, response_sha256)
);

CREATE TABLE IF NOT EXISTS public.medication_pilot_credentials (
  credential_id TEXT PRIMARY KEY,
  schema_version TEXT NOT NULL DEFAULT 'darwin.medication-pilot-credential.v1'
    CHECK (schema_version = 'darwin.medication-pilot-credential.v1'),
  subject_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  reviewer_role TEXT NOT NULL CHECK (reviewer_role IN ('physician_reviewer', 'pharmacist_reviewer', 'clinical_admin')),
  pilot_id TEXT NOT NULL,
  scopes TEXT[] NOT NULL CHECK (scopes <@ ARRAY['synthetic-envelope-evaluate', 'synthetic-fhir-export']::TEXT[]),
  environment TEXT NOT NULL DEFAULT 'staging-synthetic-only' CHECK (environment = 'staging-synthetic-only'),
  issuer_key_id TEXT NOT NULL,
  signature_sha256 CHAR(64) NOT NULL CHECK (signature_sha256 ~ '^[0-9a-f]{64}$'),
  valid_from TIMESTAMPTZ NOT NULL,
  valid_until TIMESTAMPTZ NOT NULL CHECK (valid_until > valid_from),
  status TEXT NOT NULL CHECK (status IN ('pending', 'active', 'expired', 'revoked')),
  issued_by UUID REFERENCES public.users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (status <> 'active' OR issued_by IS NOT NULL)
);

CREATE TABLE IF NOT EXISTS public.medication_pilot_credential_events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  credential_id TEXT NOT NULL REFERENCES public.medication_pilot_credentials(credential_id) ON DELETE RESTRICT,
  status TEXT NOT NULL CHECK (status IN ('active', 'expired', 'revoked')),
  reason_code TEXT NOT NULL CHECK (reason_code ~ '^[A-Z0-9._:-]{1,96}$'),
  actor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  event_sha256 CHAR(64) NOT NULL CHECK (event_sha256 ~ '^[0-9a-f]{64}$'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.medication_envelope_events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  schema_version TEXT NOT NULL DEFAULT 'darwin.medication-envelope-telemetry.v1'
    CHECK (schema_version = 'darwin.medication-envelope-telemetry.v1'),
  subject_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  credential_id TEXT NOT NULL REFERENCES public.medication_pilot_credentials(credential_id) ON DELETE RESTRICT,
  artifact_id TEXT NOT NULL CHECK (artifact_id ~ '^rxenv-[a-z0-9-]+$'),
  disposition TEXT NOT NULL CHECK (disposition IN ('REFUSE', 'BLOCK', 'REVIEW', 'WITHIN_REVIEWED_ENVELOPE')),
  constraint_codes TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  elapsed_milliseconds INTEGER NOT NULL CHECK (elapsed_milliseconds BETWEEN 0 AND 3600000),
  decision_category TEXT NOT NULL CHECK (decision_category IN ('accepted', 'acknowledged-review', 'saved-legacy-unverified', 'abandoned')),
  assurance_receipt_sha256 CHAR(64) NOT NULL CHECK (assurance_receipt_sha256 ~ '^[0-9a-f]{64}$'),
  synthetic_only BOOLEAN NOT NULL DEFAULT TRUE CHECK (synthetic_only = TRUE),
  patient_context_persisted BOOLEAN NOT NULL DEFAULT FALSE CHECK (patient_context_persisted = FALSE),
  proposed_values_persisted BOOLEAN NOT NULL DEFAULT FALSE CHECK (proposed_values_persisted = FALSE),
  occurred_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (cardinality(constraint_codes) <= 64)
);

CREATE INDEX IF NOT EXISTS idx_medication_graph_release_status
  ON public.medication_evidence_graph_releases(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_medication_ai_run_source
  ON public.medication_evidence_ai_runs(source_node_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_medication_pilot_credential_subject
  ON public.medication_pilot_credentials(subject_user_id, status, valid_until);
CREATE INDEX IF NOT EXISTS idx_medication_pilot_credential_event
  ON public.medication_pilot_credential_events(credential_id, id DESC);
CREATE INDEX IF NOT EXISTS idx_medication_envelope_event_artifact
  ON public.medication_envelope_events(artifact_id, disposition, created_at DESC);

CREATE OR REPLACE FUNCTION public.medication_envelope_reject_mutation()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  RAISE EXCEPTION 'medication-envelope-records-are-append-only';
END;
$$;

DROP TRIGGER IF EXISTS medication_graph_release_append_only ON public.medication_evidence_graph_releases;
CREATE TRIGGER medication_graph_release_append_only
  BEFORE UPDATE OR DELETE ON public.medication_evidence_graph_releases
  FOR EACH ROW EXECUTE FUNCTION public.medication_envelope_reject_mutation();

DROP TRIGGER IF EXISTS medication_ai_run_append_only ON public.medication_evidence_ai_runs;
CREATE TRIGGER medication_ai_run_append_only
  BEFORE UPDATE OR DELETE ON public.medication_evidence_ai_runs
  FOR EACH ROW EXECUTE FUNCTION public.medication_envelope_reject_mutation();

DROP TRIGGER IF EXISTS medication_pilot_credential_append_only ON public.medication_pilot_credentials;
CREATE TRIGGER medication_pilot_credential_append_only
  BEFORE UPDATE OR DELETE ON public.medication_pilot_credentials
  FOR EACH ROW EXECUTE FUNCTION public.medication_envelope_reject_mutation();

DROP TRIGGER IF EXISTS medication_pilot_credential_event_append_only ON public.medication_pilot_credential_events;
CREATE TRIGGER medication_pilot_credential_event_append_only
  BEFORE UPDATE OR DELETE ON public.medication_pilot_credential_events
  FOR EACH ROW EXECUTE FUNCTION public.medication_envelope_reject_mutation();

DROP TRIGGER IF EXISTS medication_envelope_event_append_only ON public.medication_envelope_events;
CREATE TRIGGER medication_envelope_event_append_only
  BEFORE UPDATE OR DELETE ON public.medication_envelope_events
  FOR EACH ROW EXECUTE FUNCTION public.medication_envelope_reject_mutation();

CREATE OR REPLACE FUNCTION public.record_synthetic_medication_envelope_event(
  p_credential_id TEXT,
  p_artifact_id TEXT,
  p_disposition TEXT,
  p_constraint_codes TEXT[],
  p_elapsed_milliseconds INTEGER,
  p_decision_category TEXT,
  p_assurance_receipt_sha256 TEXT,
  p_occurred_at TIMESTAMPTZ
)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  current_user_id UUID := auth.uid();
  credential public.medication_pilot_credentials;
  inserted_id BIGINT;
  code TEXT;
BEGIN
  IF current_user_id IS NULL THEN RAISE EXCEPTION 'authentication-required'; END IF;
  SELECT * INTO credential
  FROM public.medication_pilot_credentials credential_row
  WHERE credential_row.credential_id = p_credential_id
    AND credential_row.subject_user_id = current_user_id
    AND credential_row.status = 'active'
    AND credential_row.environment = 'staging-synthetic-only'
    AND NOW() >= credential_row.valid_from
    AND NOW() < credential_row.valid_until
    AND 'synthetic-envelope-evaluate' = ANY(credential_row.scopes)
    AND COALESCE((
      SELECT event.status
      FROM public.medication_pilot_credential_events event
      WHERE event.credential_id = credential_row.credential_id
      ORDER BY event.id DESC
      LIMIT 1
    ), credential_row.status) = 'active';
  IF NOT FOUND THEN RAISE EXCEPTION 'active-synthetic-pilot-credential-required'; END IF;
  IF p_disposition NOT IN ('REFUSE', 'BLOCK', 'REVIEW', 'WITHIN_REVIEWED_ENVELOPE') THEN RAISE EXCEPTION 'invalid-envelope-disposition'; END IF;
  IF p_artifact_id !~ '^rxenv-[a-z0-9-]+$' THEN RAISE EXCEPTION 'invalid-envelope-artifact'; END IF;
  IF p_elapsed_milliseconds < 0 OR p_elapsed_milliseconds > 3600000 THEN RAISE EXCEPTION 'invalid-envelope-elapsed-time'; END IF;
  IF p_assurance_receipt_sha256 !~ '^[0-9a-f]{64}$' THEN RAISE EXCEPTION 'invalid-envelope-receipt'; END IF;
  IF cardinality(COALESCE(p_constraint_codes, ARRAY[]::TEXT[])) > 64 THEN RAISE EXCEPTION 'too-many-constraint-codes'; END IF;
  FOREACH code IN ARRAY COALESCE(p_constraint_codes, ARRAY[]::TEXT[]) LOOP
    IF code !~ '^[A-Z0-9._:-]{1,96}$' THEN RAISE EXCEPTION 'invalid-constraint-code'; END IF;
  END LOOP;

  INSERT INTO public.medication_envelope_events (
    subject_user_id, credential_id, artifact_id, disposition, constraint_codes,
    elapsed_milliseconds, decision_category, assurance_receipt_sha256, occurred_at
  ) VALUES (
    current_user_id, p_credential_id, p_artifact_id, p_disposition,
    COALESCE(p_constraint_codes, ARRAY[]::TEXT[]), p_elapsed_milliseconds,
    p_decision_category, p_assurance_receipt_sha256, p_occurred_at
  ) RETURNING id INTO inserted_id;
  RETURN inserted_id;
END;
$$;

ALTER TABLE public.medication_evidence_graph_releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_evidence_ai_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_pilot_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_pilot_credential_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_envelope_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Read candidate graph release metadata" ON public.medication_evidence_graph_releases;
CREATE POLICY "Read candidate graph release metadata"
  ON public.medication_evidence_graph_releases FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Subjects read own pilot credential metadata" ON public.medication_pilot_credentials;
CREATE POLICY "Subjects read own pilot credential metadata"
  ON public.medication_pilot_credentials FOR SELECT
  USING (auth.uid() = subject_user_id);

DROP POLICY IF EXISTS "Subjects read own pilot credential events" ON public.medication_pilot_credential_events;
CREATE POLICY "Subjects read own pilot credential events"
  ON public.medication_pilot_credential_events FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.medication_pilot_credentials credential
    WHERE credential.credential_id = medication_pilot_credential_events.credential_id
      AND credential.subject_user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Subjects read own envelope events" ON public.medication_envelope_events;
CREATE POLICY "Subjects read own envelope events"
  ON public.medication_envelope_events FOR SELECT
  USING (auth.uid() = subject_user_id);

REVOKE ALL ON public.medication_evidence_graph_releases FROM anon, authenticated;
REVOKE ALL ON public.medication_evidence_ai_runs FROM anon, authenticated;
REVOKE ALL ON public.medication_pilot_credentials FROM anon, authenticated;
REVOKE ALL ON public.medication_pilot_credential_events FROM anon, authenticated;
REVOKE ALL ON public.medication_envelope_events FROM anon, authenticated;
GRANT SELECT ON public.medication_evidence_graph_releases TO authenticated;
GRANT SELECT ON public.medication_pilot_credentials TO authenticated;
GRANT SELECT ON public.medication_pilot_credential_events TO authenticated;
GRANT SELECT ON public.medication_envelope_events TO authenticated;
GRANT EXECUTE ON FUNCTION public.record_synthetic_medication_envelope_event(TEXT, TEXT, TEXT, TEXT[], INTEGER, TEXT, TEXT, TIMESTAMPTZ) TO authenticated;
