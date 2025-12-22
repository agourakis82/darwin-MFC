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
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'limited':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const canConnect = mentor.mentorAvailability !== 'unavailable' && mentor.menteeCount < mentor.maxMentees;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
            {mentor.displayName?.charAt(0).toUpperCase() || 'M'}
          </div>
          {mentor.isVerified && (
            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {mentor.displayName}
            </h3>
            {mentor.mentorRating && (
              <div className="flex items-center gap-0.5 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">{mentor.mentorRating.toFixed(1)}</span>
              </div>
            )}
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {mentor.mentorBio}
          </p>

          {/* Specializations */}
          <div className="flex flex-wrap gap-1 mt-2">
            {mentor.mentorSpecializations.slice(0, 3).map((spec) => (
              <span
                key={spec}
                className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full"
              >
                {getSpecializationLabel(spec)}
              </span>
            ))}
            {mentor.mentorSpecializations.length > 3 && (
              <span className="px-2 py-0.5 text-gray-500 text-xs">
                +{mentor.mentorSpecializations.length - 3}
              </span>
            )}
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-500 dark:text-gray-400">
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
          className={`
            w-full mt-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors
            ${canConnect
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-100 text-gray-400 dark:bg-gray-700 cursor-not-allowed'
            }
          `}
        >
          <MessageCircle className="w-4 h-4" />
          {canConnect ? t('connect') : t('unavailable')}
        </button>
      )}
    </div>
  );
}

export default MentorCard;
