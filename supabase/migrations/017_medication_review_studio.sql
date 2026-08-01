-- =====================================================
-- DARWIN RX EVIDENCE REVIEW STUDIO
-- =====================================================
-- Open evidence contribution, credentialed independent review, append-only
-- provenance, and an editorial-only Supabase overlay. Clinical bundles remain
-- immutable and production authorization remains outside this database.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.clinical_reviewer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  requested_roles TEXT[] NOT NULL,
  council_type TEXT,
  council_number TEXT,
  council_region TEXT,
  evidence_url TEXT,
  statement TEXT NOT NULL CHECK (char_length(statement) BETWEEN 20 AND 4000),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected', 'withdrawn')),
  reviewed_by UUID REFERENCES public.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (requested_roles <@ ARRAY['contributor', 'physician_reviewer', 'pharmacist_reviewer', 'terminology_steward']::TEXT[]),
  CHECK (cardinality(requested_roles) BETWEEN 1 AND 4)
);

CREATE TABLE IF NOT EXISTS public.clinical_reviewer_profiles (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  roles TEXT[] NOT NULL DEFAULT ARRAY['contributor']::TEXT[],
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'suspended', 'revoked')),
  credential_digest CHAR(64),
  verified_by UUID REFERENCES public.users(id),
  verified_at TIMESTAMPTZ,
  suspended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (roles <@ ARRAY['contributor', 'physician_reviewer', 'pharmacist_reviewer', 'terminology_steward', 'clinical_admin']::TEXT[]),
  CHECK (credential_digest IS NULL OR credential_digest ~ '^[0-9a-f]{64}$')
);

CREATE TABLE IF NOT EXISTS public.medication_review_tasks (
  id TEXT PRIMARY KEY,
  schema_version TEXT NOT NULL CHECK (schema_version = 'darwin.medication-review-task.v1'),
  bundle_version TEXT NOT NULL,
  bundle_sha256 CHAR(64) NOT NULL CHECK (bundle_sha256 ~ '^[0-9a-f]{64}$'),
  target_type TEXT NOT NULL CHECK (target_type IN ('identity-conflict', 'interaction-pair', 'presentation', 'dose-rule')),
  target_id TEXT NOT NULL,
  target_digest CHAR(64) NOT NULL CHECK (target_digest ~ '^[0-9a-f]{64}$'),
  category TEXT NOT NULL CHECK (category IN ('identity', 'interaction', 'presentation', 'dose')),
  risk TEXT NOT NULL CHECK (risk IN ('critical', 'high', 'routine')),
  status TEXT NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'CLAIMED', 'IN_REVIEW', 'AWAITING_SECOND_REVIEW', 'CONSENSUS', 'DISPUTED', 'ADJUDICATION', 'CLOSED', 'SUPERSEDED')),
  required_reviewer_roles TEXT[] NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  source_status TEXT NOT NULL CHECK (source_status IN ('located', 'source-unverifiable', 'evidence-required')),
  task_payload JSONB NOT NULL,
  superseded_by TEXT REFERENCES public.medication_review_tasks(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (bundle_sha256, target_type, target_id),
  CHECK (required_reviewer_roles <@ ARRAY['physician_reviewer', 'pharmacist_reviewer', 'terminology_steward']::TEXT[]),
  CHECK (cardinality(required_reviewer_roles) = 2)
);

CREATE TABLE IF NOT EXISTS public.medication_review_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id TEXT NOT NULL REFERENCES public.medication_review_tasks(id) ON DELETE RESTRICT,
  reviewer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  reviewer_role TEXT NOT NULL CHECK (reviewer_role IN ('physician_reviewer', 'pharmacist_reviewer', 'terminology_steward')),
  assignment_kind TEXT NOT NULL DEFAULT 'primary' CHECK (assignment_kind IN ('primary', 'adjudicator')),
  state TEXT NOT NULL DEFAULT 'accepted' CHECK (state IN ('accepted', 'submitted', 'released')),
  assigned_by UUID REFERENCES public.users(id),
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submitted_at TIMESTAMPTZ,
  UNIQUE (task_id, reviewer_id, assignment_kind)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_medication_review_primary_role
  ON public.medication_review_assignments(task_id, reviewer_role)
  WHERE assignment_kind = 'primary' AND state <> 'released';

CREATE TABLE IF NOT EXISTS public.medication_evidence_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schema_version TEXT NOT NULL DEFAULT 'darwin.medication-evidence-submission.v1' CHECK (schema_version = 'darwin.medication-evidence-submission.v1'),
  task_id TEXT NOT NULL REFERENCES public.medication_review_tasks(id) ON DELETE RESTRICT,
  contributor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  source_url TEXT NOT NULL CHECK (source_url ~ '^https://'),
  source_title TEXT NOT NULL CHECK (char_length(source_title) BETWEEN 3 AND 500),
  authority TEXT NOT NULL CHECK (char_length(authority) BETWEEN 2 AND 300),
  page_locator TEXT NOT NULL CHECK (char_length(page_locator) BETWEEN 2 AND 500),
  claim TEXT NOT NULL CHECK (char_length(claim) BETWEEN 20 AND 8000),
  proposed_patch JSONB NOT NULL DEFAULT '{}'::JSONB,
  source_sha256 CHAR(64),
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'withdrawn')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (source_sha256 IS NULL OR source_sha256 ~ '^[0-9a-f]{64}$')
);

CREATE TABLE IF NOT EXISTS public.medication_review_decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schema_version TEXT NOT NULL DEFAULT 'darwin.medication-review-decision.v1' CHECK (schema_version = 'darwin.medication-review-decision.v1'),
  task_id TEXT NOT NULL REFERENCES public.medication_review_tasks(id) ON DELETE RESTRICT,
  reviewer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  reviewer_role TEXT NOT NULL CHECK (reviewer_role IN ('physician_reviewer', 'pharmacist_reviewer', 'terminology_steward')),
  assignment_kind TEXT NOT NULL DEFAULT 'primary' CHECK (assignment_kind IN ('primary', 'adjudicator')),
  task_digest CHAR(64) NOT NULL CHECK (task_digest ~ '^[0-9a-f]{64}$'),
  decision TEXT NOT NULL CHECK (decision IN ('approve', 'reject', 'request_changes')),
  proposed_patch JSONB NOT NULL DEFAULT '{}'::JSONB,
  patch_digest CHAR(64) NOT NULL CHECK (patch_digest ~ '^[0-9a-f]{64}$'),
  rationale TEXT NOT NULL CHECK (char_length(rationale) BETWEEN 20 AND 8000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (task_id, reviewer_id, assignment_kind)
);

CREATE TABLE IF NOT EXISTS public.medication_review_consensus (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schema_version TEXT NOT NULL DEFAULT 'darwin.medication-review-consensus.v1' CHECK (schema_version = 'darwin.medication-review-consensus.v1'),
  task_id TEXT NOT NULL REFERENCES public.medication_review_tasks(id) ON DELETE RESTRICT,
  revision INTEGER NOT NULL CHECK (revision > 0),
  bundle_sha256 CHAR(64) NOT NULL CHECK (bundle_sha256 ~ '^[0-9a-f]{64}$'),
  target_digest CHAR(64) NOT NULL CHECK (target_digest ~ '^[0-9a-f]{64}$'),
  decision_ids UUID[] NOT NULL,
  result TEXT NOT NULL CHECK (result IN ('approved', 'rejected', 'disputed', 'adjudicated')),
  disposition TEXT NOT NULL CHECK (disposition IN ('reviewed-candidate', 'editorial-applied', 'no-change')),
  final_patch JSONB NOT NULL DEFAULT '{}'::JSONB,
  receipt_digest CHAR(64) NOT NULL CHECK (receipt_digest ~ '^[0-9a-f]{64}$'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (task_id, revision)
);

CREATE TABLE IF NOT EXISTS public.medication_review_events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  task_id TEXT REFERENCES public.medication_review_tasks(id) ON DELETE RESTRICT,
  actor_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  event_payload JSONB NOT NULL DEFAULT '{}'::JSONB,
  previous_event_digest CHAR(64),
  event_digest CHAR(64) NOT NULL CHECK (event_digest ~ '^[0-9a-f]{64}$'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (previous_event_digest IS NULL OR previous_event_digest ~ '^[0-9a-f]{64}$')
);

CREATE TABLE IF NOT EXISTS public.medication_editorial_overlays_v2 (
  legacy_id TEXT PRIMARY KEY,
  schema_version TEXT NOT NULL DEFAULT 'darwin.medication-editorial-overlay.v2' CHECK (schema_version = 'darwin.medication-editorial-overlay.v2'),
  commercial_aliases TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  search_synonyms TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  editorial_summary TEXT,
  patient_counseling_notes TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  editorial_references JSONB NOT NULL DEFAULT '[]'::JSONB,
  translations JSONB NOT NULL DEFAULT '{}'::JSONB,
  consensus_receipt_digest CHAR(64) NOT NULL CHECK (consensus_receipt_digest ~ '^[0-9a-f]{64}$'),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_medication_review_tasks_queue ON public.medication_review_tasks(status, risk, category);
CREATE INDEX IF NOT EXISTS idx_medication_review_tasks_target ON public.medication_review_tasks(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_medication_evidence_task ON public.medication_evidence_submissions(task_id, created_at);
CREATE INDEX IF NOT EXISTS idx_medication_decisions_task ON public.medication_review_decisions(task_id, created_at);
CREATE INDEX IF NOT EXISTS idx_medication_consensus_task ON public.medication_review_consensus(task_id, revision DESC);
CREATE INDEX IF NOT EXISTS idx_reviewer_application_user ON public.clinical_reviewer_applications(applicant_id, created_at DESC);

CREATE OR REPLACE FUNCTION public.medication_review_has_role(p_role TEXT, p_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.clinical_reviewer_profiles profile
    WHERE profile.user_id = p_user_id
      AND profile.status = 'verified'
      AND p_role = ANY(profile.roles)
  );
$$;

CREATE OR REPLACE FUNCTION public.medication_review_append_event(
  p_task_id TEXT,
  p_actor_id UUID,
  p_event_type TEXT,
  p_payload JSONB DEFAULT '{}'::JSONB
)
RETURNS CHAR(64)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  previous_digest CHAR(64);
  next_digest CHAR(64);
BEGIN
  SELECT event_digest INTO previous_digest
  FROM public.medication_review_events
  WHERE task_id IS NOT DISTINCT FROM p_task_id
  ORDER BY id DESC
  LIMIT 1;

  next_digest := encode(digest(
    COALESCE(previous_digest::TEXT, '') || '|' || COALESCE(p_task_id, '') || '|' ||
    COALESCE(p_actor_id::TEXT, '') || '|' || p_event_type || '|' || p_payload::TEXT || '|' || clock_timestamp()::TEXT,
    'sha256'
  ), 'hex');

  INSERT INTO public.medication_review_events (
    task_id, actor_id, event_type, event_payload, previous_event_digest, event_digest
  ) VALUES (
    p_task_id, p_actor_id, p_event_type, p_payload, previous_digest, next_digest
  );
  RETURN next_digest;
END;
$$;

CREATE OR REPLACE FUNCTION public.medication_review_protect_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
DECLARE
  jwt_role TEXT := COALESCE(current_setting('request.jwt.claim.role', TRUE), '');
BEGIN
  IF jwt_role <> 'service_role' THEN
    IF TG_OP = 'INSERT' THEN
      NEW.role := 'user';
    ELSIF NEW.role IS DISTINCT FROM OLD.role THEN
      RAISE EXCEPTION 'public-users-role-is-not-a-clinical-credential';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS protect_public_users_role ON public.users;
CREATE TRIGGER protect_public_users_role
  BEFORE INSERT OR UPDATE OF role ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.medication_review_protect_user_role();

DROP POLICY IF EXISTS "Users can insert own data" ON public.users;
CREATE POLICY "Users can insert own data"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id AND role = 'user');

CREATE OR REPLACE FUNCTION public.claim_medication_review_task(p_task_id TEXT, p_reviewer_role TEXT)
RETURNS public.medication_review_assignments
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  current_user_id UUID := auth.uid();
  task_record public.medication_review_tasks;
  assignment_record public.medication_review_assignments;
BEGIN
  IF current_user_id IS NULL THEN RAISE EXCEPTION 'authentication-required'; END IF;
  IF NOT public.medication_review_has_role(p_reviewer_role, current_user_id) THEN RAISE EXCEPTION 'verified-clinical-role-required'; END IF;

  SELECT * INTO task_record FROM public.medication_review_tasks WHERE id = p_task_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'review-task-not-found'; END IF;
  IF task_record.status NOT IN ('OPEN', 'CLAIMED', 'IN_REVIEW', 'AWAITING_SECOND_REVIEW') THEN RAISE EXCEPTION 'review-task-not-claimable'; END IF;
  IF NOT p_reviewer_role = ANY(task_record.required_reviewer_roles) THEN RAISE EXCEPTION 'reviewer-role-not-required'; END IF;
  IF EXISTS (SELECT 1 FROM public.medication_review_assignments WHERE task_id = p_task_id AND reviewer_id = current_user_id AND state <> 'released') THEN
    RAISE EXCEPTION 'independent-reviewer-required';
  END IF;

  INSERT INTO public.medication_review_assignments (task_id, reviewer_id, reviewer_role, assignment_kind, assigned_by)
  VALUES (p_task_id, current_user_id, p_reviewer_role, 'primary', current_user_id)
  RETURNING * INTO assignment_record;

  UPDATE public.medication_review_tasks
  SET status = CASE
    WHEN (SELECT COUNT(*) FROM public.medication_review_assignments WHERE task_id = p_task_id AND assignment_kind = 'primary' AND state <> 'released') >= 2 THEN 'IN_REVIEW'
    ELSE 'CLAIMED'
  END,
  updated_at = NOW()
  WHERE id = p_task_id;

  PERFORM public.medication_review_append_event(p_task_id, current_user_id, 'task-claimed', jsonb_build_object('reviewerRole', p_reviewer_role));
  RETURN assignment_record;
END;
$$;

CREATE OR REPLACE FUNCTION public.submit_medication_review_decision(
  p_task_id TEXT,
  p_reviewer_role TEXT,
  p_task_digest TEXT,
  p_decision TEXT,
  p_proposed_patch JSONB,
  p_rationale TEXT
)
RETURNS public.medication_review_decisions
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  current_user_id UUID := auth.uid();
  task_record public.medication_review_tasks;
  decision_record public.medication_review_decisions;
  decision_count INTEGER;
  distinct_decisions INTEGER;
  distinct_patches INTEGER;
  common_decision TEXT;
  consensus_result TEXT;
  consensus_disposition TEXT;
  decision_ids UUID[];
  receipt_digest CHAR(64);
BEGIN
  IF current_user_id IS NULL THEN RAISE EXCEPTION 'authentication-required'; END IF;
  IF p_decision NOT IN ('approve', 'reject', 'request_changes') THEN RAISE EXCEPTION 'invalid-review-decision'; END IF;
  IF char_length(p_rationale) < 20 THEN RAISE EXCEPTION 'review-rationale-too-short'; END IF;
  IF NOT public.medication_review_has_role(p_reviewer_role, current_user_id) THEN RAISE EXCEPTION 'verified-clinical-role-required'; END IF;

  SELECT * INTO task_record FROM public.medication_review_tasks WHERE id = p_task_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'review-task-not-found'; END IF;
  IF task_record.status NOT IN ('CLAIMED', 'IN_REVIEW', 'AWAITING_SECOND_REVIEW') THEN RAISE EXCEPTION 'review-task-not-open-for-decision'; END IF;
  IF task_record.target_digest <> p_task_digest THEN RAISE EXCEPTION 'stale-review-target'; END IF;
  IF NOT EXISTS (
    SELECT 1 FROM public.medication_review_assignments
    WHERE task_id = p_task_id AND reviewer_id = current_user_id
      AND reviewer_role = p_reviewer_role AND assignment_kind = 'primary' AND state = 'accepted'
  ) THEN RAISE EXCEPTION 'active-review-assignment-required'; END IF;

  INSERT INTO public.medication_review_decisions (
    task_id, reviewer_id, reviewer_role, assignment_kind, task_digest,
    decision, proposed_patch, patch_digest, rationale
  ) VALUES (
    p_task_id, current_user_id, p_reviewer_role, 'primary', p_task_digest,
    p_decision, COALESCE(p_proposed_patch, '{}'::JSONB),
    encode(digest(COALESCE(p_proposed_patch, '{}'::JSONB)::TEXT, 'sha256'), 'hex'), p_rationale
  ) RETURNING * INTO decision_record;

  UPDATE public.medication_review_assignments
  SET state = 'submitted', submitted_at = NOW()
  WHERE task_id = p_task_id AND reviewer_id = current_user_id AND assignment_kind = 'primary';

  SELECT COUNT(*), COUNT(DISTINCT decision), COUNT(DISTINCT patch_digest), MIN(decision), ARRAY_AGG(id ORDER BY created_at)
  INTO decision_count, distinct_decisions, distinct_patches, common_decision, decision_ids
  FROM public.medication_review_decisions
  WHERE task_id = p_task_id AND assignment_kind = 'primary';

  IF decision_count < cardinality(task_record.required_reviewer_roles) THEN
    UPDATE public.medication_review_tasks SET status = 'AWAITING_SECOND_REVIEW', updated_at = NOW() WHERE id = p_task_id;
  ELSE
    IF distinct_decisions = 1 AND distinct_patches = 1 AND common_decision = 'approve' THEN
      consensus_result := 'approved';
      consensus_disposition := 'reviewed-candidate';
    ELSIF distinct_decisions = 1 AND common_decision = 'reject' THEN
      consensus_result := 'rejected';
      consensus_disposition := 'no-change';
    ELSE
      consensus_result := 'disputed';
      consensus_disposition := 'no-change';
    END IF;

    receipt_digest := encode(digest(
      task_record.bundle_sha256::TEXT || '|' || task_record.target_digest::TEXT || '|' ||
      array_to_string(decision_ids, ',') || '|' || consensus_result,
      'sha256'
    ), 'hex');

    INSERT INTO public.medication_review_consensus (
      task_id, revision, bundle_sha256, target_digest, decision_ids,
      result, disposition, final_patch, receipt_digest
    ) VALUES (
      p_task_id, 1, task_record.bundle_sha256, task_record.target_digest, decision_ids,
      consensus_result, consensus_disposition,
      CASE WHEN consensus_result = 'approved' THEN COALESCE(p_proposed_patch, '{}'::JSONB) ELSE '{}'::JSONB END,
      receipt_digest
    );

    UPDATE public.medication_review_tasks
    SET status = CASE WHEN consensus_result = 'disputed' THEN 'DISPUTED' ELSE 'CONSENSUS' END,
        updated_at = NOW()
    WHERE id = p_task_id;
  END IF;

  PERFORM public.medication_review_append_event(p_task_id, current_user_id, 'review-decision-submitted', jsonb_build_object('reviewerRole', p_reviewer_role, 'decisionId', decision_record.id));
  RETURN decision_record;
END;
$$;

CREATE OR REPLACE FUNCTION public.assign_medication_review_adjudicator(
  p_task_id TEXT,
  p_reviewer_id UUID,
  p_reviewer_role TEXT
)
RETURNS public.medication_review_assignments
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  current_user_id UUID := auth.uid();
  assignment_record public.medication_review_assignments;
BEGIN
  IF NOT public.medication_review_has_role('clinical_admin', current_user_id) THEN RAISE EXCEPTION 'clinical-admin-required'; END IF;
  IF NOT public.medication_review_has_role(p_reviewer_role, p_reviewer_id) THEN RAISE EXCEPTION 'verified-adjudicator-role-required'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.medication_review_tasks WHERE id = p_task_id AND status = 'DISPUTED') THEN RAISE EXCEPTION 'disputed-task-required'; END IF;
  IF EXISTS (SELECT 1 FROM public.medication_review_assignments WHERE task_id = p_task_id AND reviewer_id = p_reviewer_id) THEN RAISE EXCEPTION 'independent-adjudicator-required'; END IF;

  INSERT INTO public.medication_review_assignments (task_id, reviewer_id, reviewer_role, assignment_kind, assigned_by)
  VALUES (p_task_id, p_reviewer_id, p_reviewer_role, 'adjudicator', current_user_id)
  RETURNING * INTO assignment_record;
  UPDATE public.medication_review_tasks SET status = 'ADJUDICATION', updated_at = NOW() WHERE id = p_task_id;
  PERFORM public.medication_review_append_event(p_task_id, current_user_id, 'adjudicator-assigned', jsonb_build_object('reviewerId', p_reviewer_id, 'reviewerRole', p_reviewer_role));
  RETURN assignment_record;
END;
$$;

CREATE OR REPLACE FUNCTION public.adjudicate_medication_review_task(
  p_task_id TEXT,
  p_reviewer_role TEXT,
  p_task_digest TEXT,
  p_decision TEXT,
  p_proposed_patch JSONB,
  p_rationale TEXT
)
RETURNS public.medication_review_decisions
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  current_user_id UUID := auth.uid();
  task_record public.medication_review_tasks;
  decision_record public.medication_review_decisions;
  all_decision_ids UUID[];
  receipt_digest CHAR(64);
BEGIN
  IF p_decision NOT IN ('approve', 'reject', 'request_changes') THEN RAISE EXCEPTION 'invalid-adjudication-decision'; END IF;
  IF char_length(p_rationale) < 20 THEN RAISE EXCEPTION 'adjudication-rationale-too-short'; END IF;
  SELECT * INTO task_record FROM public.medication_review_tasks WHERE id = p_task_id FOR UPDATE;
  IF NOT FOUND OR task_record.status <> 'ADJUDICATION' THEN RAISE EXCEPTION 'task-not-in-adjudication'; END IF;
  IF task_record.target_digest <> p_task_digest THEN RAISE EXCEPTION 'stale-review-target'; END IF;
  IF NOT EXISTS (
    SELECT 1 FROM public.medication_review_assignments
    WHERE task_id = p_task_id AND reviewer_id = current_user_id AND reviewer_role = p_reviewer_role
      AND assignment_kind = 'adjudicator' AND state = 'accepted'
  ) THEN RAISE EXCEPTION 'adjudicator-assignment-required'; END IF;

  INSERT INTO public.medication_review_decisions (
    task_id, reviewer_id, reviewer_role, assignment_kind, task_digest,
    decision, proposed_patch, patch_digest, rationale
  ) VALUES (
    p_task_id, current_user_id, p_reviewer_role, 'adjudicator', p_task_digest,
    p_decision, COALESCE(p_proposed_patch, '{}'::JSONB),
    encode(digest(COALESCE(p_proposed_patch, '{}'::JSONB)::TEXT, 'sha256'), 'hex'), p_rationale
  ) RETURNING * INTO decision_record;

  SELECT ARRAY_AGG(id ORDER BY created_at) INTO all_decision_ids FROM public.medication_review_decisions WHERE task_id = p_task_id;
  receipt_digest := encode(digest(
    task_record.bundle_sha256::TEXT || '|' || task_record.target_digest::TEXT || '|' ||
    array_to_string(all_decision_ids, ',') || '|adjudicated|' || p_decision,
    'sha256'
  ), 'hex');

  INSERT INTO public.medication_review_consensus (
    task_id, revision, bundle_sha256, target_digest, decision_ids,
    result, disposition, final_patch, receipt_digest
  ) VALUES (
    p_task_id, 2, task_record.bundle_sha256, task_record.target_digest, all_decision_ids,
    'adjudicated', CASE WHEN p_decision = 'approve' THEN 'reviewed-candidate' ELSE 'no-change' END,
    CASE WHEN p_decision = 'approve' THEN COALESCE(p_proposed_patch, '{}'::JSONB) ELSE '{}'::JSONB END,
    receipt_digest
  );

  UPDATE public.medication_review_assignments SET state = 'submitted', submitted_at = NOW()
  WHERE task_id = p_task_id AND reviewer_id = current_user_id AND assignment_kind = 'adjudicator';
  UPDATE public.medication_review_tasks SET status = 'CONSENSUS', updated_at = NOW() WHERE id = p_task_id;
  PERFORM public.medication_review_append_event(p_task_id, current_user_id, 'task-adjudicated', jsonb_build_object('decisionId', decision_record.id, 'decision', p_decision));
  RETURN decision_record;
END;
$$;

CREATE OR REPLACE FUNCTION public.medication_editorial_patch_allowed(p_patch JSONB)
RETURNS BOOLEAN
LANGUAGE SQL
IMMUTABLE
AS $$
  SELECT jsonb_typeof(p_patch) = 'object'
    AND NOT EXISTS (
      SELECT 1 FROM jsonb_object_keys(p_patch) AS key
      WHERE key NOT IN (
        'commercialAliases', 'searchSynonyms', 'editorialSummary',
        'patientCounselingNotes', 'editorialReferences', 'translations'
      )
    );
$$;

CREATE OR REPLACE FUNCTION public.apply_medication_editorial_consensus(
  p_consensus_id UUID,
  p_legacy_id TEXT,
  p_patch JSONB
)
RETURNS public.medication_editorial_overlays_v2
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  current_user_id UUID := auth.uid();
  consensus_record public.medication_review_consensus;
  overlay_record public.medication_editorial_overlays_v2;
BEGIN
  IF NOT public.medication_review_has_role('clinical_admin', current_user_id) THEN RAISE EXCEPTION 'clinical-admin-required'; END IF;
  SELECT * INTO consensus_record FROM public.medication_review_consensus WHERE id = p_consensus_id;
  IF NOT FOUND OR consensus_record.result NOT IN ('approved', 'adjudicated') THEN RAISE EXCEPTION 'approved-consensus-required'; END IF;
  IF NOT public.medication_editorial_patch_allowed(p_patch) THEN RAISE EXCEPTION 'clinical-field-overlay-forbidden'; END IF;

  INSERT INTO public.medication_editorial_overlays_v2 (
    legacy_id, commercial_aliases, search_synonyms, editorial_summary,
    patient_counseling_notes, editorial_references, translations, consensus_receipt_digest
  ) VALUES (
    p_legacy_id,
    ARRAY(SELECT jsonb_array_elements_text(COALESCE(p_patch->'commercialAliases', '[]'::JSONB))),
    ARRAY(SELECT jsonb_array_elements_text(COALESCE(p_patch->'searchSynonyms', '[]'::JSONB))),
    p_patch->>'editorialSummary',
    ARRAY(SELECT jsonb_array_elements_text(COALESCE(p_patch->'patientCounselingNotes', '[]'::JSONB))),
    COALESCE(p_patch->'editorialReferences', '[]'::JSONB),
    COALESCE(p_patch->'translations', '{}'::JSONB),
    consensus_record.receipt_digest
  )
  ON CONFLICT (legacy_id) DO UPDATE SET
    commercial_aliases = EXCLUDED.commercial_aliases,
    search_synonyms = EXCLUDED.search_synonyms,
    editorial_summary = EXCLUDED.editorial_summary,
    patient_counseling_notes = EXCLUDED.patient_counseling_notes,
    editorial_references = EXCLUDED.editorial_references,
    translations = EXCLUDED.translations,
    consensus_receipt_digest = EXCLUDED.consensus_receipt_digest,
    updated_at = NOW()
  RETURNING * INTO overlay_record;

  PERFORM public.medication_review_append_event(consensus_record.task_id, current_user_id, 'editorial-overlay-applied', jsonb_build_object('legacyId', p_legacy_id, 'consensusId', p_consensus_id));
  RETURN overlay_record;
END;
$$;

CREATE OR REPLACE FUNCTION public.verify_clinical_reviewer_application(
  p_application_id UUID,
  p_approved_roles TEXT[],
  p_credential_digest TEXT
)
RETURNS public.clinical_reviewer_profiles
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  current_user_id UUID := auth.uid();
  application_record public.clinical_reviewer_applications;
  profile_record public.clinical_reviewer_profiles;
BEGIN
  IF NOT public.medication_review_has_role('clinical_admin', current_user_id) THEN RAISE EXCEPTION 'clinical-admin-required'; END IF;
  IF p_credential_digest !~ '^[0-9a-f]{64}$' THEN RAISE EXCEPTION 'invalid-credential-digest'; END IF;
  IF NOT p_approved_roles <@ ARRAY['contributor', 'physician_reviewer', 'pharmacist_reviewer', 'terminology_steward']::TEXT[] THEN RAISE EXCEPTION 'invalid-clinical-role'; END IF;

  SELECT * INTO application_record FROM public.clinical_reviewer_applications WHERE id = p_application_id FOR UPDATE;
  IF NOT FOUND OR application_record.status <> 'pending' THEN RAISE EXCEPTION 'pending-application-required'; END IF;
  IF NOT p_approved_roles <@ application_record.requested_roles THEN RAISE EXCEPTION 'role-not-requested'; END IF;

  UPDATE public.clinical_reviewer_applications
  SET status = 'verified', reviewed_by = current_user_id, reviewed_at = NOW()
  WHERE id = p_application_id;

  INSERT INTO public.clinical_reviewer_profiles (user_id, roles, status, credential_digest, verified_by, verified_at)
  VALUES (application_record.applicant_id, p_approved_roles, 'verified', p_credential_digest, current_user_id, NOW())
  ON CONFLICT (user_id) DO UPDATE SET
    roles = EXCLUDED.roles,
    status = 'verified',
    credential_digest = EXCLUDED.credential_digest,
    verified_by = EXCLUDED.verified_by,
    verified_at = EXCLUDED.verified_at,
    updated_at = NOW()
  RETURNING * INTO profile_record;
  RETURN profile_record;
END;
$$;

ALTER TABLE public.clinical_reviewer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_reviewer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_review_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_review_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_evidence_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_review_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_review_consensus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_review_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_editorial_overlays_v2 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Applicants can create own clinical application" ON public.clinical_reviewer_applications
  FOR INSERT WITH CHECK (auth.uid() = applicant_id AND status = 'pending');
CREATE POLICY "Applicants can read own clinical application" ON public.clinical_reviewer_applications
  FOR SELECT USING (auth.uid() = applicant_id OR public.medication_review_has_role('clinical_admin'));
CREATE POLICY "Clinical admins can update applications" ON public.clinical_reviewer_applications
  FOR UPDATE USING (public.medication_review_has_role('clinical_admin'))
  WITH CHECK (public.medication_review_has_role('clinical_admin'));

CREATE POLICY "Reviewers can read own clinical profile" ON public.clinical_reviewer_profiles
  FOR SELECT USING (auth.uid() = user_id OR public.medication_review_has_role('clinical_admin'));
CREATE POLICY "Clinical admins manage clinical profiles" ON public.clinical_reviewer_profiles
  FOR ALL USING (public.medication_review_has_role('clinical_admin'))
  WITH CHECK (public.medication_review_has_role('clinical_admin'));

CREATE POLICY "Review queue is transparently readable" ON public.medication_review_tasks
  FOR SELECT USING (TRUE);
CREATE POLICY "Reviewers read own assignments" ON public.medication_review_assignments
  FOR SELECT USING (auth.uid() = reviewer_id OR public.medication_review_has_role('clinical_admin'));

CREATE POLICY "Contributors submit evidence under own identity" ON public.medication_evidence_submissions
  FOR INSERT WITH CHECK (
    auth.uid() = contributor_id
    AND status = 'submitted'
    AND (
      public.medication_review_has_role('contributor')
      OR EXISTS (
        SELECT 1 FROM public.clinical_reviewer_applications application
        WHERE application.applicant_id = auth.uid() AND application.status IN ('pending', 'verified')
      )
    )
  );
CREATE POLICY "Evidence visible to owner and verified reviewers" ON public.medication_evidence_submissions
  FOR SELECT USING (
    auth.uid() = contributor_id
    OR public.medication_review_has_role('physician_reviewer')
    OR public.medication_review_has_role('pharmacist_reviewer')
    OR public.medication_review_has_role('terminology_steward')
    OR public.medication_review_has_role('clinical_admin')
  );

CREATE POLICY "Decisions remain blinded until consensus" ON public.medication_review_decisions
  FOR SELECT USING (
    auth.uid() = reviewer_id
    OR public.medication_review_has_role('clinical_admin')
    OR EXISTS (SELECT 1 FROM public.medication_review_consensus consensus WHERE consensus.task_id = medication_review_decisions.task_id)
  );
CREATE POLICY "Consensus is transparently readable" ON public.medication_review_consensus
  FOR SELECT USING (TRUE);
CREATE POLICY "Review event owners and admins can audit" ON public.medication_review_events
  FOR SELECT USING (auth.uid() = actor_id OR public.medication_review_has_role('clinical_admin'));
CREATE POLICY "Editorial overlays are readable" ON public.medication_editorial_overlays_v2
  FOR SELECT USING (TRUE);

REVOKE ALL ON FUNCTION public.medication_review_append_event(TEXT, UUID, TEXT, JSONB) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.verify_clinical_reviewer_application(UUID, TEXT[], TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.verify_clinical_reviewer_application(UUID, TEXT[], TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.claim_medication_review_task(TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.submit_medication_review_decision(TEXT, TEXT, TEXT, TEXT, JSONB, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.assign_medication_review_adjudicator(TEXT, UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.adjudicate_medication_review_task(TEXT, TEXT, TEXT, TEXT, JSONB, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.apply_medication_editorial_consensus(UUID, TEXT, JSONB) TO authenticated;

COMMENT ON TABLE public.medication_review_tasks IS 'Hash-bound Darwin Rx review queue. It never authorizes clinical runtime behavior.';
COMMENT ON TABLE public.medication_review_decisions IS 'Append-only independent reviewer decisions. Direct insert/update/delete is denied by RLS.';
COMMENT ON TABLE public.medication_editorial_overlays_v2 IS 'Allowlisted editorial overlay only; clinical identity and rules are not representable.';
