/**
 * SUPABASE REPORTS SERVICE
 * ========================
 *
 * Content reports for moderation workflows.
 * Build-safe: returns empty data if Supabase is not configured.
 */

import { isSupabaseConfigured, supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';

type ContentReportRow = Database['public']['Tables']['content_reports']['Row'];
type ContentReportInsert = Database['public']['Tables']['content_reports']['Insert'];

export type ReportEntityType = ContentReportInsert['entity_type'];
export type ReportStatus = ContentReportInsert['status'];

async function getUserId(): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user?.id ?? null;
}

export async function createReport(input: {
  entityType: ReportEntityType;
  entityId: string;
  reason: string;
  details?: string;
}): Promise<{ data: ContentReportRow | null; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) return { data: null, error: null };

  try {
    const userId = await getUserId();
    const payload: ContentReportInsert = {
      reporter_user_id: userId,
      entity_type: input.entityType,
      entity_id: input.entityId as any,
      reason: input.reason,
      details: input.details ?? null,
      status: 'open',
    };

    const { data, error } = await supabase
      .from('content_reports')
      .insert(payload)
      .select('*')
      .single();

    return { data: data ?? null, error: error?.message ?? null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to create report' };
  }
}

export async function listMyReports(input: {
  limit?: number;
} = {}): Promise<{ data: ContentReportRow[]; error: string | null }> {
  const userId = await getUserId();
  if (!userId) return { data: [], error: 'Not authenticated' };
  if (!isSupabaseConfigured || !supabase) return { data: [], error: null };

  try {
    let q = supabase
      .from('content_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (input.limit) q = q.limit(input.limit);

    const { data, error } = await q;
    return { data: data ?? [], error: error?.message ?? null };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err.message : 'Failed to list reports' };
  }
}

export async function listOpenReports(input: {
  limit?: number;
} = {}): Promise<{ data: ContentReportRow[]; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) return { data: [], error: null };

  try {
    let q = supabase
      .from('content_reports')
      .select('*')
      .in('status', ['open', 'reviewing'])
      .order('created_at', { ascending: false });

    if (input.limit) q = q.limit(input.limit);

    const { data, error } = await q;
    return { data: data ?? [], error: error?.message ?? null };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err.message : 'Failed to list open reports' };
  }
}

export async function updateReportStatus(reportId: string, status: ReportStatus): Promise<{ error: string | null }> {
  const userId = await getUserId();
  if (!userId) return { error: 'Not authenticated' };
  if (!isSupabaseConfigured || !supabase) return { error: null };
  if (!reportId) return { error: null };

  try {
    const { error } = await supabase
      .from('content_reports')
      .update({ status })
      .eq('id', reportId);

    return { error: error?.message ?? null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to update report' };
  }
}

