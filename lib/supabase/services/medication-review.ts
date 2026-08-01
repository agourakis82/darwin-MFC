import type { SupabaseClient, User } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '@/lib/supabase/client';
import type {
  MedicationEvidenceSubmissionV1,
  MedicationReviewDecisionV1,
  MedicationReviewRole,
  MedicationReviewTaskV1,
} from '@/lib/medication-safety/review-types';

type ReviewClient = SupabaseClient<any>;

export interface ClinicalReviewerProfile {
  userId: string;
  roles: MedicationReviewRole[];
  status: 'pending' | 'verified' | 'suspended' | 'revoked';
  credentialDigest: string | null;
}

export interface MedicationReviewSession {
  configured: boolean;
  user: User | null;
  profile: ClinicalReviewerProfile | null;
}

function client(): ReviewClient | null {
  return supabase as ReviewClient | null;
}

export async function getMedicationReviewSession(): Promise<MedicationReviewSession> {
  const reviewClient = client();
  if (!isSupabaseConfigured || !reviewClient) return { configured: false, user: null, profile: null };
  const { data: { session } } = await reviewClient.auth.getSession();
  if (!session?.user) return { configured: true, user: null, profile: null };
  const { data } = await reviewClient
    .from('clinical_reviewer_profiles')
    .select('user_id,roles,status,credential_digest')
    .eq('user_id', session.user.id)
    .maybeSingle();
  return {
    configured: true,
    user: session.user,
    profile: data ? {
      userId: data.user_id,
      roles: data.roles as MedicationReviewRole[],
      status: data.status,
      credentialDigest: data.credential_digest,
    } : null,
  };
}

export async function loadMedicationReviewTasks(): Promise<{
  tasks: MedicationReviewTaskV1[];
  source: 'supabase' | 'bundle';
  error: string | null;
}> {
  const reviewClient = client();
  if (!isSupabaseConfigured || !reviewClient) return { tasks: [], source: 'bundle', error: null };
  const { data, error } = await reviewClient
    .from('medication_review_tasks')
    .select('status,task_payload')
    .neq('status', 'SUPERSEDED')
    .order('risk', { ascending: true })
    .order('title', { ascending: true });
  if (error) return { tasks: [], source: 'bundle', error: error.message };
  return {
    tasks: (data ?? []).map(row => ({
      ...(row.task_payload as unknown as MedicationReviewTaskV1),
      status: row.status as MedicationReviewTaskV1['status'],
    })),
    source: 'supabase',
    error: null,
  };
}

export async function submitClinicalReviewerApplication(input: {
  requestedRoles: MedicationReviewRole[];
  councilType: string;
  councilNumber: string;
  councilRegion: string;
  evidenceUrl: string;
  statement: string;
}): Promise<{ id: string | null; error: string | null }> {
  const reviewClient = client();
  if (!reviewClient) return { id: null, error: 'supabase-not-configured' };
  const { data: { session } } = await reviewClient.auth.getSession();
  if (!session?.user) return { id: null, error: 'authentication-required' };
  const { data, error } = await reviewClient
    .from('clinical_reviewer_applications')
    .insert({
      applicant_id: session.user.id,
      requested_roles: input.requestedRoles,
      council_type: input.councilType || null,
      council_number: input.councilNumber || null,
      council_region: input.councilRegion || null,
      evidence_url: input.evidenceUrl || null,
      statement: input.statement,
      status: 'pending',
    })
    .select('id')
    .single();
  return { id: data?.id ?? null, error: error?.message ?? null };
}

export async function submitMedicationEvidence(input: {
  taskId: string;
  sourceUrl: string;
  sourceTitle: string;
  authority: string;
  pageLocator: string;
  claim: string;
  proposedPatch: Record<string, unknown>;
  sourceSha256?: string;
}): Promise<{ submission: MedicationEvidenceSubmissionV1 | null; error: string | null }> {
  const reviewClient = client();
  if (!reviewClient) return { submission: null, error: 'supabase-not-configured' };
  const { data: { session } } = await reviewClient.auth.getSession();
  if (!session?.user) return { submission: null, error: 'authentication-required' };
  const { data, error } = await reviewClient
    .from('medication_evidence_submissions')
    .insert({
      task_id: input.taskId,
      contributor_id: session.user.id,
      source_url: input.sourceUrl,
      source_title: input.sourceTitle,
      authority: input.authority,
      page_locator: input.pageLocator,
      claim: input.claim,
      proposed_patch: input.proposedPatch,
      source_sha256: input.sourceSha256 || null,
    })
    .select('*')
    .single();
  return {
    submission: data ? {
      schemaVersion: 'darwin.medication-evidence-submission.v1',
      id: data.id,
      taskId: data.task_id,
      contributorId: data.contributor_id,
      sourceUrl: data.source_url,
      sourceTitle: data.source_title,
      authority: data.authority,
      pageLocator: data.page_locator,
      claim: data.claim,
      proposedPatch: data.proposed_patch as Record<string, unknown>,
      sourceSha256: data.source_sha256,
      submittedAt: data.created_at,
      status: data.status,
    } : null,
    error: error?.message ?? null,
  };
}

export async function loadMedicationEvidence(taskId: string): Promise<{
  evidence: MedicationEvidenceSubmissionV1[];
  error: string | null;
}> {
  const reviewClient = client();
  if (!isSupabaseConfigured || !reviewClient) return { evidence: [], error: null };
  const { data, error } = await reviewClient
    .from('medication_evidence_submissions')
    .select('*')
    .eq('task_id', taskId)
    .order('created_at', { ascending: false });
  if (error) return { evidence: [], error: error.message };
  return {
    evidence: (data ?? []).map(row => ({
      schemaVersion: 'darwin.medication-evidence-submission.v1',
      id: row.id,
      taskId: row.task_id,
      contributorId: row.contributor_id,
      sourceUrl: row.source_url,
      sourceTitle: row.source_title,
      authority: row.authority,
      pageLocator: row.page_locator,
      claim: row.claim,
      proposedPatch: row.proposed_patch as Record<string, unknown>,
      sourceSha256: row.source_sha256,
      submittedAt: row.created_at,
      status: row.status,
    })),
    error: null,
  };
}

export async function claimMedicationReviewTask(taskId: string, role: MedicationReviewRole): Promise<string | null> {
  const reviewClient = client();
  if (!reviewClient) return 'supabase-not-configured';
  const { error } = await reviewClient.rpc('claim_medication_review_task', {
    p_task_id: taskId,
    p_reviewer_role: role,
  });
  return error?.message ?? null;
}

export async function submitMedicationReviewDecision(input: {
  taskId: string;
  reviewerRole: MedicationReviewRole;
  taskDigest: string;
  decision: MedicationReviewDecisionV1['decision'];
  proposedPatch: Record<string, unknown>;
  rationale: string;
}): Promise<string | null> {
  const reviewClient = client();
  if (!reviewClient) return 'supabase-not-configured';
  const { error } = await reviewClient.rpc('submit_medication_review_decision', {
    p_task_id: input.taskId,
    p_reviewer_role: input.reviewerRole,
    p_task_digest: input.taskDigest,
    p_decision: input.decision,
    p_proposed_patch: input.proposedPatch,
    p_rationale: input.rationale,
  });
  return error?.message ?? null;
}
