'use client';

import { useState, useCallback, useMemo } from 'react';
import { Brain, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SupportLevel = 'critical' | 'warning' | 'info' | 'success';

export interface ClinicalDecision {
  id: string;
  level: SupportLevel;
  title: string;
  description: string;
  evidence: string;
  recommendation: string;
  references?: string[];
  actions?: Array<{
    label: string;
    onClick: () => void;
  }>;
}

export interface ClinicalDecisionSupportProps {
  decisions: ClinicalDecision[];
  context?: {
    diagnosis?: string;
    medications?: string[];
    vitals?: Record<string, string | number>;
  };
  onActionClick?: (actionId: string) => void;
  density?: 'comfortable' | 'compact' | 'clinical';
  className?: string;
}

const levelConfig: Record<SupportLevel, { icon: React.ReactNode; bgColor: string; borderColor: string; textColor: string }> = {
  critical: {
    icon: <AlertCircle className="w-5 h-5" />,
    bgColor: 'bg-red-50 dark:bg-red-950/30',
    borderColor: 'border-l-red-500',
    textColor: 'text-red-900 dark:text-red-200',
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5" />,
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    borderColor: 'border-l-amber-500',
    textColor: 'text-amber-900 dark:text-amber-200',
  },
  info: {
    icon: <Brain className="w-5 h-5" />,
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-l-blue-500',
    textColor: 'text-blue-900 dark:text-blue-200',
  },
  success: {
    icon: <CheckCircle className="w-5 h-5" />,
    bgColor: 'bg-green-50 dark:bg-green-950/30',
    borderColor: 'border-l-green-500',
    textColor: 'text-green-900 dark:text-green-200',
  },
};

export function ClinicalDecisionSupport({
  decisions,
  context,
  onActionClick,
  density = 'comfortable',
  className,
}: ClinicalDecisionSupportProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(decisions.length > 0 ? [decisions[0].id] : []));

  const toggleExpanded = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Prioritize decisions
  const sortedDecisions = useMemo(
    () =>
      [...decisions].sort((a, b) => {
        const priority: Record<SupportLevel, number> = { critical: 1, warning: 2, info: 3, success: 4 };
        return priority[a.level] - priority[b.level];
      }),
    [decisions]
  );

  const paddingClass = {
    comfortable: 'p-6',
    compact: 'p-4',
    clinical: 'p-3',
  }[density];

  return (
    <div className={cn('clinical-card dark:clinical-card-dark', paddingClass, className)}>
      {/* Header */}
      <div className="mb-6">
        <h3 className={cn(
          'font-bold text-gray-900 dark:text-white flex items-center gap-2',
          density === 'comfortable' && 'text-lg mb-2',
          density === 'compact' && 'text-base mb-1',
          density === 'clinical' && 'text-sm'
        )}>
          <Brain className="w-5 h-5 text-purple-600" />
          Clinical Decision Support
        </h3>

        {/* Context Summary */}
        {context && (
          <div className={cn(density === 'clinical' ? 'text-xs' : 'text-sm', 'text-gray-600 dark:text-gray-400')}>
            {context.diagnosis && (
              <p className="mt-1">
                <span className="font-medium">Diagnosis:</span> {context.diagnosis}
              </p>
            )}
            {context.medications && context.medications.length > 0 && (
              <p className="mt-1">
                <span className="font-medium">Medications:</span> {context.medications.join(', ')}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Decisions List */}
      <div className="space-y-3">
        {sortedDecisions.map((decision) => {
          const config = levelConfig[decision.level];
          const isExpanded = expandedIds.has(decision.id);

          return (
            <div
              key={decision.id}
              className={cn(
                'border-l-4 rounded-lg p-4 transition-all',
                config.bgColor,
                config.borderColor
              )}
            >
              {/* Header - Always Visible */}
              <button
                onClick={() => toggleExpanded(decision.id)}
                className="w-full flex items-start justify-between gap-3 text-left hover:opacity-75 transition-opacity"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex-shrink-0 mt-0.5 text-gray-700 dark:text-gray-300">
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={cn(
                      'font-semibold truncate',
                      density === 'clinical' && 'text-sm'
                    )}>
                      {decision.title}
                    </h4>
                    <p className={cn(
                      'text-gray-700 dark:text-gray-300 line-clamp-1',
                      density === 'clinical' && 'text-xs'
                    )}>
                      {decision.description}
                    </p>
                  </div>
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="mt-3 space-y-3 border-t border-current border-opacity-20 pt-3">
                  {/* Evidence */}
                  <div>
                    <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                      Evidence
                    </p>
                    <p className={cn(
                      'text-gray-700 dark:text-gray-300 leading-relaxed',
                      density === 'clinical' && 'text-xs'
                    )}>
                      {decision.evidence}
                    </p>
                  </div>

                  {/* Recommendation */}
                  <div className="p-3 bg-black/5 dark:bg-white/5 rounded border border-current border-opacity-20">
                    <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                      Recommendation
                    </p>
                    <p className={cn(
                      'font-medium text-gray-900 dark:text-white',
                      density === 'clinical' && 'text-sm'
                    )}>
                      {decision.recommendation}
                    </p>
                  </div>

                  {/* References */}
                  {decision.references && decision.references.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                        References
                      </p>
                      <ul className="space-y-1">
                        {decision.references.map((ref, idx) => (
                          <li key={idx} className={cn(
                            'text-gray-700 dark:text-gray-300',
                            density === 'clinical' && 'text-xs'
                          )}>
                            <span className="text-blue-600 dark:text-blue-400">[{idx + 1}]</span> {ref}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Actions */}
                  {decision.actions && decision.actions.length > 0 && (
                    <div className="flex gap-2 pt-2 border-t border-current border-opacity-20">
                      {decision.actions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => onActionClick?.(`${decision.id}-${idx}`)}
                          className={cn(
                            'flex-1 px-3 py-2 rounded-lg font-medium transition-colors',
                            'bg-blue-600 hover:bg-blue-700 text-white',
                            density === 'clinical' && 'text-xs py-1'
                          )}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {decisions.length === 0 && (
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
          <p className="text-sm">No clinical decisions available</p>
        </div>
      )}
    </div>
  );
}

export default ClinicalDecisionSupport;
