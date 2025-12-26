'use client';

/**
 * CASE CARD COMPONENT
 * ===================
 *
 * Display a clinical case in a card format.
 * Shows anonymized patient info and diagnostic codes.
 */

import React from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import {
  FileText,
  User,
  Calendar,
  MessageSquare,
  Eye,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Tag,
} from 'lucide-react';
import type { ClinicalCasePost, CaseType, AgeRange } from '@/lib/types/community';

// =============================================================================
// PROPS
// =============================================================================

interface CaseCardProps {
  casePost: ClinicalCasePost;
  compact?: boolean;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function CaseCard({ casePost, compact = false }: CaseCardProps) {
  const t = useTranslations('community.cases');

  const getCaseTypeColor = (type: CaseType) => {
    switch (type) {
      case 'diagnostic_challenge':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'treatment_decision':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'management_dilemma':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      case 'ethical_question':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      case 'educational':
        return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'straightforward':
        return 'text-green-600 dark:text-green-400';
      case 'moderate':
        return 'text-amber-600 dark:text-amber-400';
      case 'complex':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getAnonymizationBadge = () => {
    switch (casePost.anonymizationStatus) {
      case 'peer_reviewed':
      case 'published':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            {t('status.verified')}
          </span>
        );
      case 'pending':
      case 'auto_anonymized':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs rounded-full">
            <Clock className="w-3 h-3" />
            {t('status.pending_review')}
          </span>
        );
      default:
        return null;
    }
  };

  const formatAgeRange = (age: AgeRange) => {
    return age.includes('+') ? `${age} ${t('years')}` : `${age} ${t('years')}`;
  };

  const caseData = casePost.caseData;

  if (compact) {
    return (
      <Link
        href={`/community/cases/${casePost.id}`}
        className="block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-green-300 dark:hover:border-green-600 transition-all hover:shadow-md"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 dark:text-white truncate">
              {casePost.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
              <span>{formatAgeRange(caseData.ageRange)}</span>
              <span>•</span>
              <span>{caseData.sex === 'M' ? t('male') : caseData.sex === 'F' ? t('female') : t('other')}</span>
              <span>•</span>
              <span className={getDifficultyColor(caseData.difficulty)}>
                {t(`difficulty.${caseData.difficulty}`)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/community/cases/${casePost.id}`}
      className="block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-green-300 dark:hover:border-green-600 transition-all hover:shadow-lg"
    >
      {/* Header */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getCaseTypeColor(caseData.type)}`}>
                {t(`type.${caseData.type}`)}
              </span>
              {getAnonymizationBadge()}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {casePost.title}
            </h3>
          </div>
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
            <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      {/* Patient Info */}
      <div className="p-5 bg-gray-50 dark:bg-gray-800/50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-xs">{t('age')}</span>
            </div>
            <p className="font-medium text-gray-900 dark:text-white">
              {formatAgeRange(caseData.ageRange)}
            </p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 mb-1">
              <User className="w-4 h-4" />
              <span className="text-xs">{t('sex')}</span>
            </div>
            <p className="font-medium text-gray-900 dark:text-white">
              {caseData.sex === 'M' ? t('male') : caseData.sex === 'F' ? t('female') : t('other')}
            </p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs">{t('difficulty_label')}</span>
            </div>
            <p className={`font-medium ${getDifficultyColor(caseData.difficulty)}`}>
              {t(`difficulty.${caseData.difficulty}`)}
            </p>
          </div>
        </div>
      </div>

      {/* Presentation Preview */}
      <div className="p-5">
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {caseData.presentation}
        </p>

        {/* Diagnosis Codes */}
        {caseData.diagnosisCodes.length > 0 && (
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <Tag className="w-4 h-4 text-gray-400" />
            {caseData.diagnosisCodes.slice(0, 3).map((code) => (
              <span
                key={code}
                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded"
              >
                {code}
              </span>
            ))}
            {caseData.diagnosisCodes.length > 3 && (
              <span className="text-xs text-gray-500">
                +{caseData.diagnosisCodes.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            {casePost.replyCount}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {casePost.viewCount}
          </span>
        </div>
        <span className="text-xs">
          {casePost.author.displayName || casePost.author.username}
        </span>
      </div>
    </Link>
  );
}

export default CaseCard;
