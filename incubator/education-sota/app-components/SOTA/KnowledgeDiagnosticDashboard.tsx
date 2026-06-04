'use client';

/**
 * KNOWLEDGE DIAGNOSTIC DASHBOARD
 * ==============================
 *
 * Main dashboard component for displaying AI-powered knowledge gap analysis.
 * Shows critical gaps, strengths, and recommendations.
 */

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Brain,
  RefreshCw,
  ChevronRight,
  Loader2,
  Target,
  Clock,
  Award,
} from 'lucide-react';
import { useSotaStore, selectKnowledgeGapAnalysis, selectIsLoading } from '../../lib/store/sotaStore';
import { KnowledgeGapChart } from './KnowledgeGapChart';
import { SOTAConnectionStatus } from './SOTAConnectionStatus';

// =============================================================================
// TYPES
// =============================================================================

interface KnowledgeDiagnosticDashboardProps {
  onStartPath?: () => void;
  onViewRecommendations?: () => void;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function KnowledgeDiagnosticDashboard({
  onStartPath,
  onViewRecommendations,
}: KnowledgeDiagnosticDashboardProps) {
  const t = useTranslations('sota.diagnosis');
  const [isRunningDiagnosis, setIsRunningDiagnosis] = useState(false);

  const runDiagnosis = useSotaStore((state) => state.runDiagnosis);
  const analysis = useSotaStore(selectKnowledgeGapAnalysis);
  const isLoading = useSotaStore(selectIsLoading);
  const error = useSotaStore((state) => state.error);
  const lastDiagnosticDate = useSotaStore((state) => state.lastDiagnosticDate);

  const handleRunDiagnosis = async () => {
    setIsRunningDiagnosis(true);
    try {
      await runDiagnosis();
    } finally {
      setIsRunningDiagnosis(false);
    }
  };

  // Run diagnosis on mount if no analysis exists
  useEffect(() => {
    if (!analysis && !isLoading && !error) {
      handleRunDiagnosis();
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            {t('title')}
          </h2>
          <p className="text-muted-foreground mt-1">
            {t('subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SOTAConnectionStatus />
          <button
            onClick={handleRunDiagnosis}
            disabled={isRunningDiagnosis}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isRunningDiagnosis ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            {isRunningDiagnosis ? t('analyzing') : t('runDiagnosis')}
          </button>
        </div>
      </div>

      {/* Last Analysis Date */}
      {lastDiagnosticDate && (
        <p className="text-sm text-muted-foreground">
          {t('lastAnalysis')}: {new Date(lastDiagnosticDate).toLocaleString()}
        </p>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-destructive">{t('error')}</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isRunningDiagnosis && !analysis && (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="relative">
            <Brain className="h-16 w-16 text-primary animate-pulse" />
            <div className="absolute -bottom-1 -right-1">
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
            </div>
          </div>
          <p className="text-lg font-medium">{t('analyzing')}</p>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            {t('analyzingDescription')}
          </p>
        </div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">{t('knowledgeMap')}</h3>
            <KnowledgeGapChart
              criticalGaps={analysis.criticalGaps}
              moderateGaps={analysis.moderateGaps}
              strengths={analysis.strengths}
            />
          </div>

          {/* Stats Summary */}
          <div className="space-y-4">
            {/* Confidence Score */}
            <div className="bg-card border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-primary" />
                <span className="font-medium">{t('confidence')}</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-primary">{analysis.confidence}%</span>
                <span className="text-sm text-muted-foreground mb-1">{t('aiConfidence')}</span>
              </div>
            </div>

            {/* Success Prediction */}
            <div className="bg-card border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-green-500" />
                <span className="font-medium">{t('successPrediction')}</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-green-500">
                  {analysis.successPrediction}%
                </span>
                <span className="text-sm text-muted-foreground mb-1">
                  {t('predictedSuccess')}
                </span>
              </div>
            </div>

            {/* Gap Summary */}
            <div className="bg-card border rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-sm">{t('criticalGaps')}</span>
                  </div>
                  <span className="font-bold text-red-500">{analysis.criticalGaps.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="text-sm">{t('moderateGaps')}</span>
                  </div>
                  <span className="font-bold text-yellow-500">{analysis.moderateGaps.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm">{t('strengths')}</span>
                  </div>
                  <span className="font-bold text-green-500">{analysis.strengths.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Critical Gaps List */}
      {analysis && analysis.criticalGaps.length > 0 && (
        <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h3 className="text-lg font-semibold text-red-500">{t('criticalGapsTitle')}</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {analysis.criticalGaps.map((gap) => (
              <div
                key={gap.id}
                className="bg-card border rounded-lg p-3 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{gap.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {t('masteryLevel')}: {gap.level}%
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-red-500/10 text-red-500 rounded">
                    {gap.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strengths List */}
      {analysis && analysis.strengths.length > 0 && (
        <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-semibold text-green-500">{t('strengthsTitle')}</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {analysis.strengths.map((strength) => (
              <div
                key={strength.id}
                className="bg-card border rounded-lg p-3 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{strength.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {t('masteryLevel')}: {strength.level}%
                  </p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {analysis && analysis.recommendations.length > 0 && (
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">{t('recommendations')}</h3>
            </div>
            {onViewRecommendations && (
              <button
                onClick={onViewRecommendations}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                {t('viewAll')}
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
          <ul className="space-y-2">
            {analysis.recommendations.slice(0, 5).map((rec, index) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs text-primary font-medium">
                  {index + 1}
                </span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      {analysis && onStartPath && (
        <div className="flex justify-center">
          <button
            onClick={onStartPath}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <TrendingUp className="h-5 w-5" />
            {t('generatePath')}
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default KnowledgeDiagnosticDashboard;
