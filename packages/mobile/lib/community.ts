/**
 * Darwin MFC Mobile - Community (Supabase)
 * Read is public; write requires auth.
 */
import { isSupabaseConfigured, supabase } from './supabase';

async function getUserId(): Promise<string | null> {
  if (!supabase) return null;
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user?.id ?? null;
}

export async function listPublishedCases(input: {
  limit?: number;
} = {}): Promise<{ data: any[]; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) return { data: [], error: null };

  try {
    let q = supabase
      .from('shared_cases')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (input.limit) q = q.limit(input.limit);

    const { data, error } = await q;
    return { data: data ?? [], error: error?.message ?? null };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err.message : 'Failed to list cases' };
  }
}

export async function getCaseById(caseId: string): Promise<{ data: any | null; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) return { data: null, error: null };
  if (!caseId) return { data: null, error: 'Missing case id' };

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

export async function listCaseComments(caseId: string): Promise<{ data: any[]; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) return { data: [], error: null };
  if (!caseId) return { data: [], error: 'Missing case id' };

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
}): Promise<{ data: any | null; error: string | null }> {
  const userId = await getUserId();
  if (!userId) return { data: null, error: 'Not authenticated' };
  if (!isSupabaseConfigured || !supabase) return { data: null, error: 'Supabase not configured' };

  try {
    const { data, error } = await supabase
      .from('case_comments')
      .insert({
        case_id: input.caseId,
        user_id: userId,
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

export async function getMyCaseVote(caseId: string): Promise<{ vote: -1 | 0 | 1; error: string | null }> {
  const userId = await getUserId();
  if (!userId) return { vote: 0, error: null };
  if (!isSupabaseConfigured || !supabase) return { vote: 0, error: null };

  try {
    const { data, error } = await supabase
      .from('case_votes')
      .select('vote')
      .eq('case_id', caseId)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) return { vote: 0, error: error.message };
    const v = data?.vote;
    return { vote: v === -1 ? -1 : v === 1 ? 1 : 0, error: null };
  } catch (err) {
    return { vote: 0, error: err instanceof Error ? err.message : 'Failed to fetch vote' };
  }
}

export async function voteCase(caseId: string, vote: -1 | 0 | 1): Promise<{ error: string | null }> {
  const userId = await getUserId();
  if (!userId) return { error: 'Not authenticated' };
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

