'use client';

/**
 * MATCHING WIZARD COMPONENT
 * =========================
 *
 * Multi-step wizard for finding and requesting mentorship.
 * Matches based on specialization, language, and experience level.
 */

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  Users,
  Search,
  Filter,
  ChevronRight,
  ChevronLeft,
  Star,
  Globe,
  BookOpen,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';
import type {
  MentorProfile,
  Specialization,
  ExperienceLevel,
  MentorshipRequest,
} from '@/lib/types/community';
import { localeNames } from '@/i18n/config';

// =============================================================================
// PROPS
// =============================================================================

interface MatchingWizardProps {
  availableMentors: MentorProfile[];
  userLocale: string;
  userSpecialization?: Specialization;
  onRequestMentor: (mentorId: string, message: string) => Promise<void>;
  onClose?: () => void;
  existingRequests?: MentorshipRequest[];
}

// =============================================================================
// CONSTANTS
// =============================================================================

const SPECIALIZATIONS: Specialization[] = [
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
];

const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  'student',
  'resident',
  'early_career',
  'mid_career',
  'senior',
];

// =============================================================================
// COMPONENT
// =============================================================================

export function MatchingWizard({
  availableMentors,
  userLocale,
  userSpecialization,
  onRequestMentor,
  onClose,
  existingRequests = [],
}: MatchingWizardProps) {
  const t = useTranslations('community.mentorship');

  // Wizard state
  const [step, setStep] = useState(1);
  const [selectedSpecialization, setSelectedSpecialization] = useState<Specialization | null>(
    userSpecialization || null
  );
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([userLocale]);
  const [experienceFilter, setExperienceFilter] = useState<ExperienceLevel | null>(null);

  // Results state
  const [matchedMentors, setMatchedMentors] = useState<MentorProfile[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile | null>(null);
  const [requestMessage, setRequestMessage] = useState('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Filter and sort mentors
  useEffect(() => {
    let filtered = availableMentors.filter((m) => m.mentorAvailability !== 'unavailable');

    // Filter by specialization
    if (selectedSpecialization) {
      filtered = filtered.filter((m) =>
        m.mentorSpecializations.includes(selectedSpecialization)
      );
    }

    // Filter by languages
    if (selectedLanguages.length > 0) {
      filtered = filtered.filter((m) =>
        m.mentorLanguages.some((lang) => selectedLanguages.includes(lang))
      );
    }

    // Filter by experience
    if (experienceFilter) {
      filtered = filtered.filter((m) => m.experienceLevel === experienceFilter);
    }

    // Exclude mentors already requested
    const requestedIds = existingRequests
      .filter((r) => r.status === 'pending' || r.status === 'accepted')
      .map((r) => r.mentorId);
    filtered = filtered.filter((m) => !requestedIds.includes(m.id));

    // Sort by availability, rating, and language match
    filtered.sort((a, b) => {
      // Prioritize available over limited
      if (a.mentorAvailability !== b.mentorAvailability) {
        return a.mentorAvailability === 'available' ? -1 : 1;
      }
      // Then by rating
      const ratingA = a.mentorRating || 0;
      const ratingB = b.mentorRating || 0;
      if (ratingA !== ratingB) return ratingB - ratingA;
      // Then by locale match
      const localeMatchA = a.mentorLanguages.includes(userLocale) ? 1 : 0;
      const localeMatchB = b.mentorLanguages.includes(userLocale) ? 1 : 0;
      return localeMatchB - localeMatchA;
    });

    setMatchedMentors(filtered);
  }, [availableMentors, selectedSpecialization, selectedLanguages, experienceFilter, existingRequests, userLocale]);

  // Language toggle
  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang)
        ? prev.filter((l) => l !== lang)
        : [...prev, lang]
    );
  };

  // Get unique languages from all mentors
  const availableLanguages = Array.from(
    new Set(availableMentors.flatMap((m) => m.mentorLanguages))
  ).sort();

  // Handle submission
  const handleSubmit = async () => {
    if (!selectedMentor || !requestMessage.trim()) {
      setError(t('error_missing_fields'));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onRequestMentor(selectedMentor.id, requestMessage.trim());
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('error_generic'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success view
  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {t('request_sent')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {t('request_sent_desc', { mentor: selectedMentor?.displayName || '' })}
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          {t('done')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                step === s
                  ? 'bg-purple-600 text-white'
                  : s < step
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
            </div>
            {s < 3 && (
              <div
                className={`w-16 h-1 rounded ${
                  s < step ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Preferences */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('step1_title')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {t('step1_desc')}
            </p>
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <BookOpen className="w-4 h-4 inline mr-1" />
              {t('field_specialization')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SPECIALIZATIONS.map((spec) => (
                <button
                  key={spec}
                  type="button"
                  onClick={() =>
                    setSelectedSpecialization(selectedSpecialization === spec ? null : spec)
                  }
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                    selectedSpecialization === spec
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {t(`specialization.${spec}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <Globe className="w-4 h-4 inline mr-1" />
              {t('field_languages')}
            </label>
            <div className="flex flex-wrap gap-2">
              {availableLanguages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggleLanguage(lang)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedLanguages.includes(lang)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {localeNames[lang as keyof typeof localeNames] || lang}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Filter (optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <Users className="w-4 h-4 inline mr-1" />
              {t('field_experience')}
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setExperienceFilter(null)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  experienceFilter === null
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {t('any')}
              </button>
              {EXPERIENCE_LEVELS.slice(2).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() =>
                    setExperienceFilter(experienceFilter === level ? null : level)
                  }
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    experienceFilter === level
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {t(`experience.${level}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {t('cancel')}
              </button>
            )}
            <button
              type="button"
              onClick={() => setStep(2)}
              className="ml-auto flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              {t('find_mentors')}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Browse Mentors */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('step2_title')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {t('step2_desc', { count: matchedMentors.length })}
            </p>
          </div>

          {/* Results */}
          {matchedMentors.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('no_mentors_found')}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {t('no_mentors_found_desc')}
              </p>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="mt-4 px-4 py-2 text-purple-600 dark:text-purple-400 hover:underline"
              >
                {t('adjust_filters')}
              </button>
            </div>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {matchedMentors.map((mentor) => (
                <button
                  key={mentor.id}
                  type="button"
                  onClick={() => setSelectedMentor(mentor)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedMentor?.id === mentor.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 ring-2 ring-purple-500'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {mentor.displayName.charAt(0).toUpperCase()}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {mentor.displayName}
                        </h4>
                        {mentor.mentorAvailability === 'available' ? (
                          <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                            {t('available')}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs rounded-full">
                            {t('limited')}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {mentor.mentorSpecializations
                          .map((s) => t(`specialization.${s}`))
                          .join(', ')}
                      </p>

                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {mentor.mentorRating && (
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            {mentor.mentorRating.toFixed(1)}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {mentor.menteeCount}/{mentor.maxMentees}
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          {mentor.mentorLanguages.length}
                        </span>
                      </div>
                    </div>

                    {/* Check */}
                    {selectedMentor?.id === mentor.id && (
                      <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0" />
                    )}
                  </div>

                  {mentor.mentorBio && (
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {mentor.mentorBio}
                    </p>
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-2 px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <ChevronLeft className="w-4 h-4" />
              {t('back')}
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              disabled={!selectedMentor}
              className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {t('continue')}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Send Request */}
      {step === 3 && selectedMentor && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('step3_title')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {t('step3_desc')}
            </p>
          </div>

          {/* Selected Mentor Card */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-2xl font-bold">
                {selectedMentor.displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  {selectedMentor.displayName}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedMentor.mentorSpecializations
                    .map((s) => t(`specialization.${s}`))
                    .join(', ')}
                </p>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <Globe className="w-4 h-4" />
                  {selectedMentor.mentorLanguages
                    .map((l) => localeNames[l as keyof typeof localeNames] || l)
                    .join(', ')}
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-1" />
              {t('field_message')} *
            </label>
            <textarea
              value={requestMessage}
              onChange={(e) => setRequestMessage(e.target.value)}
              placeholder={t('placeholder_message')}
              rows={5}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-purple-500"
              maxLength={1000}
            />
            <p className="text-xs text-gray-500 mt-1">
              {requestMessage.length}/1000 {t('characters')}
            </p>
          </div>

          {/* Info */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {t('response_time_notice')}
              </p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <p className="text-red-700 dark:text-red-400">{error}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <ChevronLeft className="w-4 h-4" />
              {t('back')}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!requestMessage.trim() || isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t('sending')}
                </>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4" />
                  {t('send_request')}
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchingWizard;
