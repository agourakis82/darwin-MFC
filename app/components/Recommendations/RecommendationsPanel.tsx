'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, TrendingUp, FileText, Pill, Stethoscope, Calendar, BarChart3, X } from 'lucide-react';
import {
  generatePersonalizedRecommendations,
  getHistoryStatistics,
  getConsultationHistory,
  removeConsultationFromHistory,
  type Recommendation,
  type PersonalizedRecommendations,
} from '@/lib/utils/recommendations';
import type { SOAPData } from '@/app/components/Export/SOAPExport';
import { Link } from '@/i18n/routing';

interface RecommendationsPanelProps {
  currentSOAP?: Partial<SOAPData>;
  onSelectRecommendation?: (recommendation: Recommendation) => void;
  showStatistics?: boolean;
  maxRecommendations?: number;
}

export default function RecommendationsPanel({
  currentSOAP,
  onSelectRecommendation,
  showStatistics = true,
  maxRecommendations = 10,
}: RecommendationsPanelProps) {
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendations | null>(null);
  const [statistics, setStatistics] = useState(getHistoryStatistics());
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'history' | 'patterns' | 'nlp'>('all');
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const recs = generatePersonalizedRecommendations(currentSOAP);
    setRecommendations(recs);
    setStatistics(getHistoryStatistics());
  }, [currentSOAP]);

  const getRecommendationsToShow = (): Recommendation[] => {
    if (!recommendations) return [];
    
    switch (selectedCategory) {
      case 'history':
        return recommendations.basedOnHistory;
      case 'patterns':
        return recommendations.basedOnPatterns;
      case 'nlp':
        return recommendations.basedOnCurrentSOAP;
      default:
        return recommendations.all;
    }
  };

  const getIconForType = (type: Recommendation['type']) => {
    switch (type) {
      case 'diagnosis':
        return Stethoscope;
      case 'medication':
        return Pill;
      case 'protocol':
        return FileText;
      case 'exam':
        return FileText;
      case 'followup':
        return Calendar;
      default:
        return Sparkles;
    }
  };

  const getColorForType = (type: Recommendation['type']) => {
    switch (type) {
      case 'diagnosis':
        return 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300';
      case 'medication':
        return 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300';
      case 'protocol':
        return 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300';
      case 'exam':
        return 'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-300';
      case 'followup':
        return 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300';
      default:
        return 'bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700';
    }
  };

  const recsToShow = getRecommendationsToShow().slice(0, maxRecommendations);

  if (!recommendations || recsToShow.length === 0) {
    return (
      <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
          <Sparkles className="w-5 h-5" />
          <span className="text-sm">Nenhuma recomendação disponível ainda</span>
        </div>
        {statistics.totalConsultations === 0 && (
          <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-500">
            Complete algumas consultas para receber recomendações personalizadas
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-bold text-lg text-neutral-900 dark:text-white">
            Recomendações Inteligentes
          </h3>
          <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
            {recsToShow.length}
          </span>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded"
        >
          {expanded ? <X className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <>
          {/* Estatísticas */}
          {showStatistics && statistics.totalConsultations > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
              <div className="text-center">
                <div className="text-lg font-bold text-neutral-900 dark:text-white">
                  {statistics.totalConsultations}
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">Consultas</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-neutral-900 dark:text-white">
                  {statistics.uniqueDiagnoses}
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">Diagnósticos</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-neutral-900 dark:text-white">
                  {statistics.uniqueMedications}
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">Medicamentos</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-neutral-900 dark:text-white">
                  {statistics.mostFrequentCategory?.slice(0, 10) || '-'}
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">Categoria</div>
              </div>
            </div>
          )}

          {/* Filtros */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              Todas ({recommendations.all.length})
            </button>
            <button
              onClick={() => setSelectedCategory('history')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'history'
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              <Clock className="w-3 h-3 inline mr-1" />
              Histórico ({recommendations.basedOnHistory.length})
            </button>
            <button
              onClick={() => setSelectedCategory('patterns')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'patterns'
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              <TrendingUp className="w-3 h-3 inline mr-1" />
              Padrões ({recommendations.basedOnPatterns.length})
            </button>
            <button
              onClick={() => setSelectedCategory('nlp')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'nlp'
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              <Sparkles className="w-3 h-3 inline mr-1" />
              NLP ({recommendations.basedOnCurrentSOAP.length})
            </button>
          </div>

          {/* Lista de Recomendações */}
          <div className="space-y-2">
            {recsToShow.map((rec, index) => {
              const Icon = getIconForType(rec.type);
              const colorClass = getColorForType(rec.type);
              
              return (
                <button
                  key={index}
                  onClick={() => onSelectRecommendation?.(rec)}
                  className={`w-full text-left p-4 rounded-lg border-2 hover:shadow-md transition-all ${colorClass}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4" />
                        <span className="font-semibold text-sm">{rec.title}</span>
                        <span className="text-xs px-1.5 py-0.5 bg-white/50 dark:bg-black/20 rounded">
                          {Math.round(rec.confidence * 100)}%
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                        {rec.description}
                      </p>
                      <p className="text-xs italic text-neutral-500 dark:text-neutral-500">
                        {rec.reason}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Componente compacto para exibir recomendações inline
 */
export function RecommendationsInline({
  currentSOAP,
  onSelectRecommendation,
  maxItems = 3,
}: {
  currentSOAP?: Partial<SOAPData>;
  onSelectRecommendation?: (recommendation: Recommendation) => void;
  maxItems?: number;
}) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  React.useEffect(() => {
    const recs = generatePersonalizedRecommendations(currentSOAP);
    setRecommendations(recs.all.slice(0, maxItems));
  }, [currentSOAP, maxItems]);

  if (recommendations.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {recommendations.map((rec, index) => {
        const Icon = getIconForType(rec.type);
        
        return (
          <button
            key={index}
            onClick={() => onSelectRecommendation?.(rec)}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
          >
            <Icon className="w-3 h-3" />
            {rec.title}
          </button>
        );
      })}
    </div>
  );
}

function getIconForType(type: Recommendation['type']) {
  switch (type) {
    case 'diagnosis':
      return Stethoscope;
    case 'medication':
      return Pill;
    case 'protocol':
      return FileText;
    case 'exam':
      return FileText;
    case 'followup':
      return Calendar;
    default:
      return Sparkles;
  }
}

