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
        return 'bg-clinical-info-base/10 text-clinical-info-base';
      case 'treatment_decision':
        return 'bg-clinical-safe-base/10 text-clinical-safe-base';
      case 'management_dilemma':
        return 'bg-clinical-warning-base/10 text-clinical-warning-base';
      case 'ethical_question':
        return 'bg-brand-secondary-50/80 dark:bg-brand-secondary-900/15 text-brand-secondary-700 dark:text-brand-secondary-200';
      case 'educational':
        return 'bg-brand-primary-50/80 dark:bg-brand-primary-900/15 text-brand-primary-700 dark:text-brand-primary-200';
      default:
        return 'bg-carbon-100 dark:bg-carbon-900/40 text-carbon-700 dark:text-carbon-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'straightforward':
        return 'text-clinical-safe-base';
      case 'moderate':
        return 'text-clinical-warning-base';
      case 'complex':
        return 'text-clinical-critical-base';
      default:
        return 'text-carbon-600 dark:text-carbon-400';
    }
  };

  const getAnonymizationBadge = () => {
    switch (casePost.anonymizationStatus) {
      case 'peer_reviewed':
      case 'published':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-clinical-safe-base/10 text-clinical-safe-base text-xs rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            {t('status.verified')}
          </span>
        );
      case 'pending':
      case 'auto_anonymized':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-clinical-warning-base/10 text-clinical-warning-base text-xs rounded-full">
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
        href={`/community/cases?id=${encodeURIComponent(casePost.id)}`}
        className="block card-darwin p-4 hover:border-clinical-safe-base apple-transition"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 bg-guanine-green/10 rounded-lg">
            <FileText className="w-5 h-5 text-guanine-green" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-carbon-900 dark:text-carbon-100 truncate">
              {casePost.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-carbon-500 dark:text-carbon-400">
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
      href={`/community/cases?id=${encodeURIComponent(casePost.id)}`}
      className="block card-darwin rounded-2xl overflow-hidden hover:border-clinical-safe-base apple-transition"
    >
      {/* Header */}
      <div className="p-5 border-b border-carbon-200 dark:border-carbon-800">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getCaseTypeColor(caseData.type)}`}>
                {t(`type.${caseData.type}`)}
              </span>
              {getAnonymizationBadge()}
            </div>
            <h3 className="text-lg font-semibold text-carbon-900 dark:text-carbon-100">
              {casePost.title}
            </h3>
          </div>
          <div className="p-3 bg-guanine-green/10 rounded-xl">
            <FileText className="w-6 h-6 text-guanine-green" />
          </div>
        </div>
      </div>

      {/* Patient Info */}
      <div className="p-5 bg-carbon-50/70 dark:bg-carbon-900/30">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-carbon-500 dark:text-carbon-400 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-xs">{t('age')}</span>
            </div>
            <p className="font-medium text-carbon-900 dark:text-carbon-100">
              {formatAgeRange(caseData.ageRange)}
            </p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-carbon-500 dark:text-carbon-400 mb-1">
              <User className="w-4 h-4" />
              <span className="text-xs">{t('sex')}</span>
            </div>
            <p className="font-medium text-carbon-900 dark:text-carbon-100">
              {caseData.sex === 'M' ? t('male') : caseData.sex === 'F' ? t('female') : t('other')}
            </p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-carbon-500 dark:text-carbon-400 mb-1">
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
        <p className="text-sm text-carbon-600 dark:text-carbon-400 line-clamp-3">
          {caseData.presentation}
        </p>

        {/* Diagnosis Codes */}
        {caseData.diagnosisCodes.length > 0 && (
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <Tag className="w-4 h-4 text-carbon-400" />
            {caseData.diagnosisCodes.slice(0, 3).map((code) => (
              <span
                key={code}
                className="px-2 py-0.5 bg-carbon-100 dark:bg-carbon-800/60 text-carbon-600 dark:text-carbon-300 text-xs rounded"
              >
                {code}
              </span>
            ))}
            {caseData.diagnosisCodes.length > 3 && (
              <span className="text-xs text-carbon-500">
                +{caseData.diagnosisCodes.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-carbon-200 dark:border-carbon-800 flex items-center justify-between text-sm text-carbon-500 dark:text-carbon-400">
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
