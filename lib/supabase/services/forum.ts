/**
 * SUPABASE FORUM SERVICE
 * ======================
 *
 * Forum categories + posts + replies + votes.
 * Build-safe: returns empty data if Supabase is not configured.
 */

import { isSupabaseConfigured, supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';

type ForumCategoryRow = Database['public']['Tables']['forum_categories']['Row'];
type ForumPostRow = Database['public']['Tables']['forum_posts']['Row'];
type ForumReplyRow = Database['public']['Tables']['forum_replies']['Row'];

async function getAuthClient(): Promise<{ userId: string } | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id;
  if (!userId) return null;
  return { userId };
}

export async function listForumCategories(): Promise<{ data: ForumCategoryRow[]; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) return { data: [], error: null };

  try {
    const { data, error } = await supabase
      .from('forum_categories')
      .select('*')
      .order('order', { ascending: true });

    return { data: data ?? [], error: error?.message ?? null };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err.message : 'Failed to list categories' };
  }
}

export async function listForumPosts(input: {
  categoryId: string;
  limit?: number;
}): Promise<{ data: ForumPostRow[]; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) return { data: [], error: null };

  try {
    let q = supabase
      .from('forum_posts')
      .select('*')
      .eq('category_id', input.categoryId)
      .order('is_pinned', { ascending: false })
      .order('updated_at', { ascending: false });

    if (input.limit) q = q.limit(input.limit);

    const { data, error } = await q;
    return { data: data ?? [], error: error?.message ?? null };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err.message : 'Failed to list posts' };
  }
}

export async function getForumPostById(postId: string): Promise<{ data: ForumPostRow | null; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) return { data: null, error: null };

  try {
    const { data, error } = await supabase
      .from('forum_posts')
      .select('*')
      .eq('id', postId)
      .single();

    return { data: data ?? null, error: error?.message ?? null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to fetch post' };
  }
}

export async function listForumReplies(postId: string): Promise<{ data: ForumReplyRow[]; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) return { data: [], error: null };

  try {
    const { data, error } = await supabase
      .from('forum_replies')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    return { data: data ?? [], error: error?.message ?? null };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err.message : 'Failed to list replies' };
  }
}

export async function createForumPost(input: {
  categoryId: string;
  locale?: string;
  title: string;
  content: string;
  tags?: string[];
}): Promise<{ data: ForumPostRow | null; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: null, error: 'Not authenticated' };
  if (!isSupabaseConfigured || !supabase) return { data: null, error: 'Supabase not configured' };

  try {
    const { data, error } = await supabase
      .from('forum_posts')
      .insert({
        user_id: auth.userId,
        category_id: input.categoryId,
        locale: input.locale ?? 'pt',
        title: input.title,
        content: input.content,
        tags: input.tags ?? [],
      })
      .select('*')
      .single();

    return { data: data ?? null, error: error?.message ?? null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to create post' };
  }
}

export async function addForumReply(input: {
  postId: string;
  content: string;
  parentId?: string | null;
}): Promise<{ data: ForumReplyRow | null; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: null, error: 'Not authenticated' };
  if (!isSupabaseConfigured || !supabase) return { data: null, error: 'Supabase not configured' };

  try {
    const { data, error } = await supabase
      .from('forum_replies')
      .insert({
        post_id: input.postId,
        user_id: auth.userId,
        parent_id: input.parentId ?? null,
        content: input.content,
      })
      .select('*')
      .single();

    return { data: data ?? null, error: error?.message ?? null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to add reply' };
  }
}

export async function votePost(postId: string, vote: -1 | 0 | 1): Promise<{ error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { error: 'Not authenticated' };
  if (!isSupabaseConfigured || !supabase) return { error: 'Supabase not configured' };

  try {
    const { error } = await supabase.rpc('vote_post' as never, {
      p_post_id: postId,
      p_vote: vote,
    } as never);
    return { error: (error as any)?.message ?? null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to vote' };
  }
}

export async function voteReply(replyId: string, vote: -1 | 0 | 1): Promise<{ error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { error: 'Not authenticated' };
  if (!isSupabaseConfigured || !supabase) return { error: 'Supabase not configured' };

  try {
    const { error } = await supabase.rpc('vote_reply' as never, {
      p_reply_id: replyId,
      p_vote: vote,
    } as never);
    return { error: (error as any)?.message ?? null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to vote' };
  }
}

export async function incrementPostView(postId: string): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured || !supabase) return { error: null };
  if (!postId) return { error: null };

  try {
    const { error } = await supabase.rpc('increment_post_view' as never, {
      p_post_id: postId,
    } as never);
    return { error: (error as any)?.message ?? null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to increment view' };
  }
}
