'use client';

/**
 * PROFILE CARD COMPONENT
 * ======================
 *
 * Displays user profile information with avatar and stats.
 */

import React from 'react';
import { useTranslations } from 'next-intl';
import {
  User,
  Mail,
  Globe,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Heart,
  Edit2,
  Shield,
} from 'lucide-react';
import { useUserStore } from '@/lib/store/userStore';
import { localeNames } from '@/i18n/config';

interface ProfileCardProps {
  onEdit?: () => void;
  showStats?: boolean;
}

export default function ProfileCard({ onEdit, showStats = true }: ProfileCardProps) {
  const t = useTranslations('profile');
  const { user, isOffline, daysRemainingOffline } = useUserStore();

  if (!user) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      {/* Header with gradient */}
      <div className="h-24 bg-gradient-to-r from-blue-600 to-purple-600" />

      {/* Avatar and Info */}
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="absolute -top-12 left-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-white dark:border-gray-800 shadow-lg">
            {user.username.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Edit Button */}
        {onEdit && (
          <button
            onClick={onEdit}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}

        {/* User Info */}
        <div className="pt-14">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.username}
            </h2>
            {user.isMentor && (
              <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full">
                {t('mentor_badge')}
              </span>
            )}
          </div>

          {user.specialization && (
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {user.specialization}
            </p>
          )}

          {/* Details */}
          <div className="mt-4 space-y-2">
            {user.email && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Globe className="w-4 h-4" />
              <span>{localeNames[user.locale as keyof typeof localeNames] || user.locale}</span>
            </div>

            {user.countryCode && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{user.countryCode}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{t('member_since', { date: formatDate(user.createdAt) })}</span>
            </div>
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {user.bio}
            </p>
          )}

          {/* Offline Status */}
          {isOffline && daysRemainingOffline > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400 text-sm">
                <Shield className="w-4 h-4" />
                <span>{t('offline_valid', { days: daysRemainingOffline })}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      {showStats && (
        <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400">
                <BookOpen className="w-4 h-4" />
                <span className="text-xl font-bold">0</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t('stats.courses')}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-yellow-600 dark:text-yellow-400">
                <Award className="w-4 h-4" />
                <span className="text-xl font-bold">0</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t('stats.certificates')}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-red-600 dark:text-red-400">
                <Heart className="w-4 h-4" />
                <span className="text-xl font-bold">0</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t('stats.favorites')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
