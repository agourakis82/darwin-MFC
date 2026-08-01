import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { MedicationReviewSeedV1 } from '../lib/medication-safety/review-types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required to seed the review queue.');
}

const seed = JSON.parse(
  readFileSync(resolve(process.cwd(), 'public/medication-safety/medication-review-seed.json'), 'utf8'),
) as MedicationReviewSeedV1;
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const rows = [...seed.tasks, ...seed.doseReviewTasks].map(task => ({
  id: task.id,
  schema_version: task.schemaVersion,
  bundle_version: task.bundleVersion,
  bundle_sha256: task.bundleSha256,
  target_type: task.targetType,
  target_id: task.targetId,
  target_digest: task.targetDigest,
  category: task.category,
  risk: task.risk,
  status: task.status,
  required_reviewer_roles: task.requiredReviewerRoles,
  title: task.title,
  summary: task.summary,
  source_status: task.sourceStatus,
  task_payload: task,
}));

for (let index = 0; index < rows.length; index += 50) {
  const { error } = await supabase
    .from('medication_review_tasks')
    .upsert(rows.slice(index, index + 50), { onConflict: 'id', ignoreDuplicates: true });
  if (error) throw error;
}

for (const task of [...seed.tasks, ...seed.doseReviewTasks]) {
  const { error } = await supabase
    .from('medication_review_tasks')
    .update({ status: 'SUPERSEDED', superseded_by: task.id })
    .eq('target_type', task.targetType)
    .eq('target_id', task.targetId)
    .neq('bundle_sha256', seed.identityBundleSha256)
    .neq('status', 'SUPERSEDED');
  if (error) throw error;
}

const { count, error: countError } = await supabase
  .from('medication_review_tasks')
  .select('*', { count: 'exact', head: true })
  .eq('bundle_sha256', seed.identityBundleSha256)
  .in('target_type', ['identity-conflict', 'interaction-pair'])
  .neq('status', 'SUPERSEDED');
if (countError) throw countError;
if (count !== 177) throw new Error(`review-queue-count-mismatch:${count}`);
const { count: doseCount, error: doseCountError } = await supabase
  .from('medication_review_tasks')
  .select('*', { count: 'exact', head: true })
  .eq('bundle_sha256', seed.identityBundleSha256)
  .eq('target_type', 'dose-rule')
  .neq('status', 'SUPERSEDED');
if (doseCountError) throw doseCountError;
if (doseCount !== 5) throw new Error(`dose-review-queue-count-mismatch:${doseCount}`);

console.log(JSON.stringify({
  seeded: count,
  seededDoseCandidates: doseCount,
  bundleVersion: seed.bundleVersion,
  bundleSha256: seed.identityBundleSha256,
  productionAuthorized: false,
}, null, 2));
