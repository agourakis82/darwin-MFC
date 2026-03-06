'use client';

/**
 * MENTOR CARD COMPONENT
 * =====================
 *
 * Display a mentor profile card.
 */

import React from 'react';
import { useTranslations } from 'next-intl';
import {
  Star,
  MessageCircle,
  Users,
  CheckCircle2,
  Globe,
  Clock,
} from 'lucide-react';
import type { MentorProfile, Specialization } from '@/lib/types/community';

// =============================================================================
// PROPS
// =============================================================================

interface MentorCardProps {
  mentor: MentorProfile;
  onConnect?: (mentorId: string) => void;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function MentorCard({ mentor, onConnect }: MentorCardProps) {
  const t = useTranslations('community.mentorship');

  const getSpecializationLabel = (spec: Specialization) => {
    return t(`specializations.${spec}`);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-guanine-green/10 dark:bg-guanine-green/15 text-guanine-green';
      case 'limited':
        return 'bg-thymine-gold/10 dark:bg-thymine-gold/15 text-thymine-gold';
      default:
        return 'bg-carbon-200/60 text-carbon-700 dark:bg-carbon-800/60 dark:text-carbon-200';
    }
  };

  const canConnect = mentor.mentorAvailability !== 'unavailable' && mentor.menteeCount < mentor.maxMentees;

  return (
    <div className="card-darwin p-5">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-primary-600 to-brand-secondary-600 flex items-center justify-center text-white text-xl font-bold">
            {mentor.displayName?.charAt(0).toUpperCase() || 'M'}
          </div>
          {mentor.isVerified && (
            <div className="absolute -bottom-1 -right-1 bg-brand-primary-600 rounded-full p-0.5">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-carbon-900 dark:text-carbon-100 truncate">
              {mentor.displayName}
            </h3>
            {mentor.mentorRating && (
              <div className="flex items-center gap-0.5 text-thymine-gold">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">{mentor.mentorRating.toFixed(1)}</span>
              </div>
            )}
          </div>

          <p className="text-sm text-carbon-700 dark:text-carbon-300 mt-1 line-clamp-2">
            {mentor.mentorBio}
          </p>

          {/* Specializations */}
          <div className="flex flex-wrap gap-1 mt-2">
            {mentor.mentorSpecializations.slice(0, 3).map((spec) => (
              <span
                key={spec}
                className="px-2 py-0.5 bg-brand-secondary-50 dark:bg-brand-secondary-900/20 text-brand-secondary-700 dark:text-brand-secondary-300 text-xs rounded-full"
              >
                {getSpecializationLabel(spec)}
              </span>
            ))}
            {mentor.mentorSpecializations.length > 3 && (
              <span className="px-2 py-0.5 text-carbon-500 dark:text-carbon-400 text-xs">
                +{mentor.mentorSpecializations.length - 3}
              </span>
            )}
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-carbon-600 dark:text-carbon-400">
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {mentor.mentorLanguages.join(', ')}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {mentor.menteeCount}/{mentor.maxMentees} {t('mentees')}
            </span>
            <span className={`px-2 py-0.5 rounded-full ${getAvailabilityColor(mentor.mentorAvailability)}`}>
              {t(`availability.${mentor.mentorAvailability}`)}
            </span>
          </div>
        </div>
      </div>

      {/* Action button */}
      {onConnect && (
        <button
          onClick={() => onConnect(mentor.id)}
          disabled={!canConnect}
          className={[
            'w-full mt-4 py-2 rounded-xl font-semibold flex items-center justify-center gap-2 apple-transition-fast',
            canConnect ? 'btn-darwin-primary justify-center' : 'bg-carbon-100 dark:bg-carbon-900 text-carbon-400 dark:text-carbon-500 border border-carbon-200 dark:border-carbon-800 cursor-not-allowed',
          ].join(' ')}
        >
          <MessageCircle className="w-4 h-4" />
          {canConnect ? t('connect') : t('unavailable')}
        </button>
      )}
    </div>
  );
}

export default MentorCard;
