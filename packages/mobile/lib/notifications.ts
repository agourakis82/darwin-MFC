/**
 * Darwin MFC Mobile - Notifications (Supabase)
 * In-app inbox. Read/update requires auth.
 */
import { isSupabaseConfigured, supabase } from './supabase';

async function requireUserId(): Promise<string | null> {
  if (!supabase) return null;
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user?.id ?? null;
}

export async function listNotifications(input: {
  limit?: number;
  unreadOnly?: boolean;
} = {}): Promise<{ data: any[]; error: string | null }> {
  const userId = await requireUserId();
  if (!userId) return { data: [], error: 'Not authenticated' };
  if (!isSupabaseConfigured || !supabase) return { data: [], error: null };

  try {
    let q = supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false });

    if (input.unreadOnly) q = q.is('read_at', null);
    if (input.limit) q = q.limit(input.limit);

    const { data, error } = await q;
    return { data: data ?? [], error: error?.message ?? null };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err.message : 'Failed to list notifications' };
  }
}

export async function markNotificationRead(id: string): Promise<{ error: string | null }> {
  const userId = await requireUserId();
  if (!userId) return { error: 'Not authenticated' };
  if (!isSupabaseConfigured || !supabase) return { error: null };
  if (!id) return { error: null };

  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read_at: new Date().toISOString() })
      .eq('id', id);

    return { error: error?.message ?? null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to mark read' };
  }
}

export async function markAllRead(): Promise<{ error: string | null }> {
  const userId = await requireUserId();
  if (!userId) return { error: 'Not authenticated' };
  if (!isSupabaseConfigured || !supabase) return { error: null };

  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read_at: new Date().toISOString() })
      .eq('user_id', userId)
      .is('read_at', null);

    return { error: error?.message ?? null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to mark all read' };
  }
}

