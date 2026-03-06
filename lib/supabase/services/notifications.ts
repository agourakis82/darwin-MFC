/**
 * SUPABASE NOTIFICATIONS SERVICE
 * ==============================
 *
 * In-app notifications (MVP).
 * Build-safe: returns empty data if Supabase is not configured.
 */

import { isSupabaseConfigured, supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';

type NotificationRow = Database['public']['Tables']['notifications']['Row'];

async function getAuthClient(): Promise<{ userId: string } | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id;
  if (!userId) return null;
  return { userId };
}

export async function listNotifications(input: {
  limit?: number;
  unreadOnly?: boolean;
} = {}): Promise<{ data: NotificationRow[]; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: [], error: 'Not authenticated' };
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

export async function countUnreadNotifications(): Promise<{ count: number; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { count: 0, error: null };
  if (!isSupabaseConfigured || !supabase) return { count: 0, error: null };

  try {
    const { count, error } = await supabase
      .from('notifications')
      .select('id', { head: true, count: 'exact' })
      .eq('user_id', auth.userId)
      .is('read_at', null);

    return { count: count ?? 0, error: error?.message ?? null };
  } catch (err) {
    return { count: 0, error: err instanceof Error ? err.message : 'Failed to count unread notifications' };
  }
}

export async function markNotificationRead(notificationId: string): Promise<{ error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { error: 'Not authenticated' };
  if (!isSupabaseConfigured || !supabase) return { error: null };
  if (!notificationId) return { error: null };

  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read_at: new Date().toISOString() })
      .eq('id', notificationId);

    return { error: error?.message ?? null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to mark read' };
  }
}

export async function markAllNotificationsRead(): Promise<{ error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { error: 'Not authenticated' };
  if (!isSupabaseConfigured || !supabase) return { error: null };

  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read_at: new Date().toISOString() })
      .eq('user_id', auth.userId)
      .is('read_at', null);

    return { error: error?.message ?? null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to mark all read' };
  }
}
