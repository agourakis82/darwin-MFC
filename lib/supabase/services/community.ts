/**
 * SUPABASE COMMUNITY SERVICE
 * ==========================
 *
 * Shared cases + comments + votes (forum is added separately).
 * Build-safe: returns empty data if Supabase is not configured.
 */

import { isSupabaseConfigured, supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';

type SharedCaseRow = Database['public']['Tables']['shared_cases']['Row'];
type CaseCommentRow = Database['public']['Tables']['case_comments']['Row'];

export type CaseDifficulty = NonNullable<SharedCaseRow['difficulty']>;

export interface ListCasesOptions {
  limit?: number;
  tag?: string;
  difficulty?: CaseDifficulty;
}

async function getAuthClient(): Promise<{ userId: string } | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id;
  if (!userId) return null;
  return { userId };
}

export async function listPublishedCases(
  options: ListCasesOptions = {}
): Promise<{ data: SharedCaseRow[]; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) return { data: [], error: null };

  try {
    let q = supabase
      .from('shared_cases')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (options.difficulty) q = q.eq('difficulty', options.difficulty);
    if (options.tag) q = q.contains('tags', [options.tag]);
    if (options.limit) q = q.limit(options.limit);

    const { data, error } = await q;
    return { data: data ?? [], error: error?.message ?? null };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err.message : 'Failed to list cases' };
  }
}

export async function getCaseById(
  caseId: string
): Promise<{ data: SharedCaseRow | null; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) return { data: null, error: null };

  try {
    const { data, error } = await supabase
      .from('shared_cases')
      .select('*')
      .eq('id', caseId)
      .single();

    return { data: data ?? null, error: error?.message ?? null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to fetch case' };
  }
}

export interface CreateCaseInput {
  title: string;
  specialty?: string | null;
  difficulty?: CaseDifficulty | null;
  tags?: string[];
  anonymized?: boolean;
  caseData: unknown;
}

export async function createCase(
  input: CreateCaseInput
): Promise<{ data: SharedCaseRow | null; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: null, error: 'Not authenticated' };
  if (!isSupabaseConfigured || !supabase) return { data: null, error: 'Supabase not configured' };

  try {
    const { data, error } = await supabase
      .from('shared_cases')
      .insert({
        user_id: auth.userId,
        title: input.title,
        specialty: input.specialty ?? null,
        difficulty: input.difficulty ?? null,
        case_data: input.caseData as any,
        anonymized: input.anonymized ?? true,
        published: false,
        verified: false,
        tags: input.tags ?? [],
      })
      .select('*')
      .single();

    return { data: data ?? null, error: error?.message ?? null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to create case' };
  }
}

export async function listCaseComments(
  caseId: string
): Promise<{ data: CaseCommentRow[]; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) return { data: [], error: null };

  try {
    const { data, error } = await supabase
      .from('case_comments')
      .select('*')
      .eq('case_id', caseId)
      .order('created_at', { ascending: true });

    return { data: data ?? [], error: error?.message ?? null };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err.message : 'Failed to list comments' };
  }
}

export async function addCaseComment(input: {
  caseId: string;
  content: string;
  parentId?: string | null;
}): Promise<{ data: CaseCommentRow | null; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: null, error: 'Not authenticated' };
  if (!isSupabaseConfigured || !supabase) return { data: null, error: 'Supabase not configured' };

  try {
    const { data, error } = await supabase
      .from('case_comments')
      .insert({
        case_id: input.caseId,
        user_id: auth.userId,
        parent_id: input.parentId ?? null,
        content: input.content,
      })
      .select('*')
      .single();

    return { data: data ?? null, error: error?.message ?? null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to add comment' };
  }
}

export async function voteCase(caseId: string, vote: -1 | 0 | 1): Promise<{ error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { error: 'Not authenticated' };
  if (!isSupabaseConfigured || !supabase) return { error: 'Supabase not configured' };

  try {
    const { error } = await supabase.rpc('vote_case' as never, {
      p_case_id: caseId,
      p_vote: vote,
    } as never);
    return { error: (error as any)?.message ?? null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to vote' };
  }
}

export async function voteComment(commentId: string, vote: -1 | 0 | 1): Promise<{ error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { error: 'Not authenticated' };
  if (!isSupabaseConfigured || !supabase) return { error: 'Supabase not configured' };

  try {
    const { error } = await supabase.rpc('vote_comment' as never, {
      p_comment_id: commentId,
      p_vote: vote,
    } as never);
    return { error: (error as any)?.message ?? null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to vote' };
  }
}

export async function incrementCaseView(caseId: string): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured || !supabase) return { error: null };
  if (!caseId) return { error: null };

  try {
    const { error } = await supabase.rpc('increment_case_view' as never, {
      p_case_id: caseId,
    } as never);
    return { error: (error as any)?.message ?? null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to increment view' };
  }
}
