/**
 * SUPABASE MENTORSHIP SERVICE
 * ===========================
 *
 * Mentor profiles + mentorship requests (MVP).
 * Build-safe: returns empty data if Supabase is not configured.
 */

import { isSupabaseConfigured, supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';

type UserRow = Database['public']['Tables']['users']['Row'];
type MentorProfileRow = Database['public']['Tables']['mentor_profiles']['Row'];
type MentorshipRequestRow = Database['public']['Tables']['mentorship_requests']['Row'];

async function getAuthClient(): Promise<{ userId: string } | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id;
  if (!userId) return null;
  return { userId };
}

export interface MentorListItem {
  user: Pick<UserRow, 'id' | 'name' | 'specialty' | 'country' | 'institution' | 'role' | 'avatar_url' | 'bio' | 'created_at'>;
  profile: MentorProfileRow;
  ratingAvg: number | null;
  menteeCount: number;
}

export async function listMentorProfiles(input: {
  specialization?: string;
  language?: string;
  limit?: number;
} = {}): Promise<{ data: MentorListItem[]; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) return { data: [], error: null };

  try {
    let q = supabase
      .from('mentor_profiles')
      .select('*')
      .neq('availability', 'unavailable')
      .order('updated_at', { ascending: false });

    if (input.specialization) q = q.contains('specializations', [input.specialization]);
    if (input.language) q = q.contains('languages', [input.language]);
    if (input.limit) q = q.limit(input.limit);

    const { data: profiles, error } = await q;
    if (error) return { data: [], error: error.message };
    const profileRows = profiles ?? [];

    if (profileRows.length === 0) return { data: [], error: null };

    const userIds = profileRows.map((p) => p.user_id);
    const { data: users, error: usersErr } = await supabase
      .from('users')
      .select('id, name, specialty, country, institution, role, avatar_url, bio, created_at')
      .in('id', userIds);
    if (usersErr) return { data: [], error: usersErr.message };

    // Compute mentee counts (pending+accepted) in one query.
    const { data: reqs, error: reqErr } = await supabase
      .from('mentorship_requests')
      .select('mentor_id, status')
      .in('mentor_id', userIds)
      .in('status', ['pending', 'accepted']);
    if (reqErr) return { data: [], error: reqErr.message };

    const menteeCountByMentor = new Map<string, number>();
    for (const r of reqs ?? []) {
      const cur = menteeCountByMentor.get(r.mentor_id) ?? 0;
      menteeCountByMentor.set(r.mentor_id, cur + 1);
    }

    // Compute rating average.
    const { data: reviews, error: reviewErr } = await supabase
      .from('mentor_reviews')
      .select('mentor_id, rating')
      .in('mentor_id', userIds);
    if (reviewErr) return { data: [], error: reviewErr.message };

    const ratingAgg = new Map<string, { sum: number; count: number }>();
    for (const r of reviews ?? []) {
      const cur = ratingAgg.get(r.mentor_id) ?? { sum: 0, count: 0 };
      ratingAgg.set(r.mentor_id, { sum: cur.sum + (r.rating ?? 0), count: cur.count + 1 });
    }

    const userById = new Map<string, any>((users ?? []).map((u) => [u.id, u]));

    const out: MentorListItem[] = profileRows
      .map((p) => {
        const u = userById.get(p.user_id);
        if (!u) return null;
        const agg = ratingAgg.get(p.user_id);
        const avg = agg && agg.count > 0 ? agg.sum / agg.count : null;
        return {
          user: u,
          profile: p,
          ratingAvg: avg,
          menteeCount: menteeCountByMentor.get(p.user_id) ?? 0,
        } as MentorListItem;
      })
      .filter(Boolean) as MentorListItem[];

    return { data: out, error: null };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err.message : 'Failed to list mentors' };
  }
}

export async function upsertMentorProfile(input: {
  mentorBio?: string | null;
  specializations?: string[] | null;
  languages?: string[] | null;
  availability?: MentorProfileRow['availability'];
  maxMentees?: number;
}): Promise<{ data: MentorProfileRow | null; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: null, error: 'Not authenticated' };
  if (!isSupabaseConfigured || !supabase) return { data: null, error: null };

  try {
    const payload: Database['public']['Tables']['mentor_profiles']['Insert'] = {
      user_id: auth.userId,
      mentor_bio: input.mentorBio ?? null,
      specializations: input.specializations ?? null,
      languages: input.languages ?? null,
      availability: input.availability ?? 'limited',
      max_mentees: input.maxMentees ?? 3,
    };

    const { data, error } = await supabase
      .from('mentor_profiles')
      .upsert(payload, { onConflict: 'user_id' })
      .select('*')
      .single();

    return { data: data ?? null, error: error?.message ?? null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to upsert mentor profile' };
  }
}

export async function createMentorshipRequest(input: {
  mentorId: string;
  message: string;
  specialization?: string | null;
}): Promise<{ data: MentorshipRequestRow | null; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: null, error: 'Not authenticated' };
  if (!isSupabaseConfigured || !supabase) return { data: null, error: null };

  try {
    const { data, error } = await supabase
      .from('mentorship_requests')
      .insert({
        mentor_id: input.mentorId,
        mentee_id: auth.userId,
        message: input.message,
        specialization: input.specialization ?? null,
        status: 'pending',
      })
      .select('*')
      .single();

    return { data: data ?? null, error: error?.message ?? null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to create request' };
  }
}

export async function listMyMentorshipRequests(): Promise<{ data: MentorshipRequestRow[]; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: [], error: 'Not authenticated' };
  if (!isSupabaseConfigured || !supabase) return { data: [], error: null };

  try {
    const { data, error } = await supabase
      .from('mentorship_requests')
      .select('*')
      .or(`mentor_id.eq.${auth.userId},mentee_id.eq.${auth.userId}`)
      .order('created_at', { ascending: false });

    return { data: data ?? [], error: error?.message ?? null };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err.message : 'Failed to list requests' };
  }
}

export async function updateMentorshipRequestStatus(
  requestId: string,
  status: MentorshipRequestRow['status']
): Promise<{ error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { error: 'Not authenticated' };
  if (!isSupabaseConfigured || !supabase) return { error: null };
  if (!requestId) return { error: null };

  try {
    const respondedAt = status === 'pending' ? null : new Date().toISOString();
    const { error } = await supabase
      .from('mentorship_requests')
      .update({ status, responded_at: respondedAt })
      .eq('id', requestId);

    return { error: error?.message ?? null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to update request' };
  }
}

