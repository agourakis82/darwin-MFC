'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowLeft, Users } from 'lucide-react';
import { MatchingWizard } from '@/app/components/Community/MatchingWizard';
import type { MentorProfile, MentorshipRequest, Specialization } from '@/lib/types/community';
import { useAuth } from '@/lib/hooks/useAuth';
import {
  createMentorshipRequest,
  listMentorProfiles,
  listMyMentorshipRequests,
  type MentorListItem,
} from '@/lib/supabase/services/mentorship';

function mapSpecializations(values: string[] | null | undefined): Specialization[] {
  const allowed: Set<Specialization> = new Set([
    'family_medicine',
    'internal_medicine',
    'pediatrics',
    'obstetrics',
    'emergency',
    'mental_health',
    'geriatrics',
    'public_health',
    'nursing',
    'other',
  ]);

  const out: Specialization[] = [];
  for (const v of values ?? []) {
    const key = String(v) as Specialization;
    out.push(allowed.has(key) ? key : 'other');
  }
  return out.length > 0 ? out : ['other'];
}

function toMentorProfile(item: MentorListItem, locale: string): MentorProfile {
  const displayName = item.user.name ?? 'Mentor';
  const username = displayName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
    .slice(0, 24) || item.user.id.slice(0, 8);

  const mentorSpecializations = mapSpecializations(item.profile.specializations);
  const specialization = mentorSpecializations[0];

  return {
    id: item.user.id,
    username,
    displayName,
    avatarUrl: item.user.avatar_url ?? undefined,
    locale,
    countryCode: item.user.country ?? undefined,
    specialization,
    experienceLevel: 'mid_career',
    isMentor: true,
    isVerified: item.user.role !== 'user',
    joinedAt: item.user.created_at,
    postCount: 0,
    replyCount: 0,
    reputation: 0,
    badges: [],

    mentorBio: item.profile.mentor_bio ?? '',
    mentorSpecializations,
    mentorLanguages: (item.profile.languages ?? []).filter(Boolean) as string[],
    mentorAvailability: item.profile.availability,
    menteeCount: item.menteeCount,
    maxMentees: item.profile.max_mentees,
    mentorRating: item.ratingAvg ?? undefined,
    mentorReviews: [],
  };
}

function toRequestVM(r: any): MentorshipRequest {
  return {
    id: String(r.id),
    mentorId: String(r.mentor_id),
    menteeId: String(r.mentee_id),
    message: String(r.message ?? ''),
    status: String(r.status) as any,
    specialization: (String(r.specialization ?? 'other') as any),
    createdAt: String(r.created_at),
    respondedAt: r.responded_at ? String(r.responded_at) : undefined,
  };
}

export default function MentorshipPage() {
  const t = useTranslations('community.mentorship');
  const tAny = useTranslations();
  const locale = useLocale();
  const { isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mentors, setMentors] = useState<MentorProfile[]>([]);
  const [requests, setRequests] = useState<MentorshipRequest[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);

      const [m, r] = await Promise.all([
        listMentorProfiles({ limit: 100 }),
        isAuthenticated ? listMyMentorshipRequests() : Promise.resolve({ data: [], error: null }),
      ]);

      if (!mounted) return;

      if (m.error) setError(m.error);
      setMentors((m.data ?? []).map((x) => toMentorProfile(x, locale)));
      setRequests((r.data ?? []).map(toRequestVM));
      setLoading(false);
    })();

    return () => { mounted = false; };
  }, [isAuthenticated, locale]);

  const userLocale = locale;

  const existingRequests = useMemo(() => requests, [requests]);

  return (
    <div className="min-h-screen bg-phosphate">
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <Link
          href="/community"
          className="inline-flex items-center gap-2 text-sm text-carbon-600 dark:text-carbon-400 hover:text-adenine-teal dark:hover:text-cytosine-cyan apple-transition-fast mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {tAny('common.back') ?? 'Back'}
        </Link>

        <div className="flex items-start justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-adenine-teal/10 dark:bg-cytosine-cyan/10 text-adenine-teal dark:text-cytosine-cyan text-sm font-semibold mb-3">
              <Users className="w-4 h-4" />
              {t('title') ?? 'Mentoria'}
            </div>
            <h1 className="text-3xl font-bold text-helix-navy dark:text-white mb-2">
              {t('title') ?? 'Mentoria'}
            </h1>
            <p className="text-carbon-600 dark:text-carbon-400">
              {t('subtitle') ?? 'Encontre mentores e peça orientação clínica com responsabilidade.'}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="card-darwin p-6 text-carbon-600 dark:text-carbon-400">
            {tAny('common.loading') ?? 'Loading...'}
          </div>
        ) : error ? (
          <div className="card-darwin p-6 text-critical-red-700 dark:text-critical-red-300">
            {error}
          </div>
        ) : (
          <div className="card-darwin p-6 lg:p-8">
            <MatchingWizard
              availableMentors={mentors}
              userLocale={userLocale}
              onRequestMentor={async (mentorId, message) => {
                const res = await createMentorshipRequest({
                  mentorId,
                  message,
                  specialization: null,
                });
                if (res.error) throw new Error(res.error);

                // Refresh requests to keep wizard exclusions correct.
                const next = await listMyMentorshipRequests();
                if (next.data) setRequests(next.data.map(toRequestVM));
              }}
              existingRequests={existingRequests}
            />
          </div>
        )}
      </div>
    </div>
  );
}

