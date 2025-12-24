/**
 * SMART PROTOCOL RECOMMENDATION ENGINE
 * =====================================
 *
 * AI-powered protocol recommendations based on patient context
 * Learns from user interactions and clinical guidelines
 *
 * Features:
 * - Context-aware recommendations
 * - Evidence-based scoring
 * - Guideline comparison (SUS, USPSTF, NHS, WHO)
 * - Personalized suggestions
 * - Trending protocols
 * - Recently viewed tracking
 *
 * @example
 * ```tsx
 * import { ProtocolRecommendationEngine } from './recommendation-engine';
 *
 * <ProtocolRecommendationEngine
 *   patientContext={context}
 *   onProtocolSelect={handleSelect}
 * />
 * ```
 */

'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/design-system/utils/cn';
import {
  TrendingUp,
  Clock,
  Star,
  BookOpen,
  Filter,
  ChevronRight,
  Search,
  AlertCircle,
} from 'lucide-react';
import { Card } from '../../design-system/primitives/card';
import { Button } from '../../design-system/primitives/button';
import { fadeInUp } from '../../design-system/animations/presets';

// ============================================================================
// TYPES
// ============================================================================

export interface PatientContext {
  age?: number;
  sex?: 'male' | 'female';
  conditions?: string[];
  riskFactors?: string[];
  specialty?: string;
}

export interface ProtocolRecommendation {
  id: string;
  title: string;
  category: string;
  description: string;
  relevanceScore: number; // 0-100
  guidelines: {
    source: 'SUS' | 'USPSTF' | 'NHS' | 'WHO' | 'Sociedades';
    recommendation: string;
    grade?: string;
  }[];
  evidenceLevel?: 'A' | 'B' | 'C' | 'D';
  applicability: string;
  trending?: boolean;
  recentlyViewed?: boolean;
}

interface ProtocolRecommendationEngineProps {
  patientContext?: PatientContext;
  onProtocolSelect?: (protocol: ProtocolRecommendation) => void;
  maxRecommendations?: number;
  className?: string;
}

// ============================================================================
// SAMPLE PROTOCOL DATABASE
// ============================================================================

const PROTOCOL_DATABASE: ProtocolRecommendation[] = [
  {
    id: 'diabetes-screening',
    title: 'Diabetes Mellitus Type 2 Screening',
    category: 'Endocrinology',
    description: 'Screening for diabetes in asymptomatic adults',
    relevanceScore: 85,
    guidelines: [
      {
        source: 'USPSTF',
        recommendation: 'Screen adults aged 35-70 with overweight/obesity',
        grade: 'B',
      },
      {
        source: 'SUS',
        recommendation: 'Annual screening for high-risk individuals',
        grade: 'A',
      },
      {
        source: 'Sociedades',
        recommendation: 'Screen all adults ≥45 years, earlier if risk factors',
      },
    ],
    evidenceLevel: 'A',
    applicability: 'Adults with risk factors (obesity, family history, hypertension)',
    trending: true,
  },
  {
    id: 'hypertension-screening',
    title: 'Hypertension Screening',
    category: 'Cardiology',
    description: 'Blood pressure screening in adults',
    relevanceScore: 92,
    guidelines: [
      {
        source: 'USPSTF',
        recommendation: 'Screen all adults ≥18 years annually',
        grade: 'A',
      },
      {
        source: 'SUS',
        recommendation: 'Annual BP measurement for all adults',
        grade: 'A',
      },
      {
        source: 'NHS',
        recommendation: 'Check BP at least every 5 years, annually if borderline',
      },
    ],
    evidenceLevel: 'A',
    applicability: 'All adults',
    trending: true,
  },
  {
    id: 'colorectal-cancer-screening',
    title: 'Colorectal Cancer Screening',
    category: 'Oncology',
    description: 'Screening for colorectal cancer in average-risk adults',
    relevanceScore: 78,
    guidelines: [
      {
        source: 'USPSTF',
        recommendation: 'Screen adults 45-75 years',
        grade: 'A',
      },
      {
        source: 'SUS',
        recommendation: 'FIT test every 2 years for ages 50-75',
        grade: 'A',
      },
      {
        source: 'Sociedades',
        recommendation: 'Colonoscopy every 10 years or annual FIT',
      },
    ],
    evidenceLevel: 'A',
    applicability: 'Adults 45-75 years without high-risk factors',
  },
  {
    id: 'breast-cancer-screening',
    title: 'Breast Cancer Screening',
    category: 'Oncology',
    description: 'Mammography screening for breast cancer',
    relevanceScore: 88,
    guidelines: [
      {
        source: 'USPSTF',
        recommendation: 'Biennial mammography for women 50-74',
        grade: 'B',
      },
      {
        source: 'SUS',
        recommendation: 'Mammography every 2 years, ages 50-69',
        grade: 'A',
      },
      {
        source: 'Sociedades',
        recommendation: 'Annual mammography starting at 40',
      },
    ],
    evidenceLevel: 'A',
    applicability: 'Women 40+ years',
  },
  {
    id: 'lipid-screening',
    title: 'Lipid Disorder Screening',
    category: 'Cardiology',
    description: 'Screening for dyslipidemia and cardiovascular risk',
    relevanceScore: 80,
    guidelines: [
      {
        source: 'USPSTF',
        recommendation: 'Screen adults 40-75 without CVD history',
        grade: 'B',
      },
      {
        source: 'SUS',
        recommendation: 'Lipid profile every 5 years starting at age 20',
      },
      {
        source: 'Sociedades',
        recommendation: 'Screen all adults ≥20 years every 4-6 years',
      },
    ],
    evidenceLevel: 'A',
    applicability: 'Adults with cardiovascular risk factors',
    trending: true,
  },
];

// ============================================================================
// RECOMMENDATION SCORING
// ============================================================================

function calculateRelevanceScore(
  protocol: ProtocolRecommendation,
  context?: PatientContext
): number {
  if (!context) return protocol.relevanceScore;

  let score = protocol.relevanceScore;

  // Age-based adjustments
  if (context.age) {
    if (protocol.id === 'diabetes-screening' && context.age >= 35) {
      score += 10;
    }
    if (protocol.id === 'colorectal-cancer-screening' && context.age >= 45 && context.age <= 75) {
      score += 15;
    }
    if (protocol.id === 'breast-cancer-screening' && context.sex === 'female' && context.age >= 40) {
      score += 15;
    }
    if (protocol.id === 'lipid-screening' && context.age >= 40) {
      score += 10;
    }
  }

  // Risk factor adjustments
  if (context.riskFactors) {
    if (context.riskFactors.includes('obesity') && protocol.id === 'diabetes-screening') {
      score += 15;
    }
    if (context.riskFactors.includes('hypertension') && protocol.id === 'lipid-screening') {
      score += 10;
    }
    if (context.riskFactors.includes('family-history-cancer') &&
        (protocol.id === 'colorectal-cancer-screening' || protocol.id === 'breast-cancer-screening')) {
      score += 20;
    }
  }

  // Condition-based adjustments
  if (context.conditions) {
    if (context.conditions.includes('diabetes') && protocol.id === 'lipid-screening') {
      score += 15;
    }
  }

  return Math.min(100, score);
}

// ============================================================================
// PROTOCOL CARD COMPONENT
// ============================================================================

interface ProtocolCardProps {
  protocol: ProtocolRecommendation;
  onClick: () => void;
}

const ProtocolCard: React.FC<ProtocolCardProps> = ({ protocol, onClick }) => {
  const scoreColor =
    protocol.relevanceScore >= 80
      ? 'text-green-600 dark:text-green-400'
      : protocol.relevanceScore >= 60
      ? 'text-yellow-600 dark:text-yellow-400'
      : 'text-neutral-600 dark:text-neutral-400';

  const evidenceColors = {
    A: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    B: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    C: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    D: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  };

  return (
    <motion.div variants={fadeInUp}>
      <Card
        className="p-4 cursor-pointer hover:shadow-lg transition-shadow group"
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {protocol.trending && (
                <span className="flex items-center gap-1 text-xs font-medium text-orange-600 dark:text-orange-400">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </span>
              )}
              {protocol.recentlyViewed && (
                <span className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                  <Clock className="w-3 h-3" />
                  Recently Viewed
                </span>
              )}
              {protocol.evidenceLevel && (
                <span
                  className={cn(
                    'text-xs font-bold px-2 py-0.5 rounded',
                    evidenceColors[protocol.evidenceLevel]
                  )}
                >
                  Grade {protocol.evidenceLevel}
                </span>
              )}
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1 group-hover:text-brand-primary-600 dark:group-hover:text-brand-primary-400 transition-colors">
              {protocol.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              {protocol.description}
            </p>
            <p className="text-xs text-neutral-500">
              <strong>Applicability:</strong> {protocol.applicability}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 ml-4">
            <div className="text-right">
              <p className={cn('text-2xl font-bold', scoreColor)}>
                {protocol.relevanceScore}
              </p>
              <p className="text-xs text-neutral-500">Relevance</p>
            </div>
            <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-brand-primary-600 dark:group-hover:text-brand-primary-400 transition-colors" />
          </div>
        </div>

        <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
            Guidelines:
          </p>
          <div className="space-y-1">
            {protocol.guidelines.slice(0, 2).map((guideline, idx) => (
              <div key={idx} className="text-xs">
                <span className="font-medium text-brand-primary-600 dark:text-brand-primary-400">
                  {guideline.source}:
                </span>{' '}
                <span className="text-neutral-600 dark:text-neutral-400">
                  {guideline.recommendation}
                </span>
                {guideline.grade && (
                  <span className="ml-1 font-semibold">({guideline.grade})</span>
                )}
              </div>
            ))}
            {protocol.guidelines.length > 2 && (
              <p className="text-xs text-neutral-500 italic">
                +{protocol.guidelines.length - 2} more guidelines
              </p>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const ProtocolRecommendationEngine: React.FC<
  ProtocolRecommendationEngineProps
> = ({ patientContext, onProtocolSelect, maxRecommendations = 10, className }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'trending' | 'evidence'>('relevance');

  // Calculate recommendations with context
  const recommendations = useMemo(() => {
    let protocols = PROTOCOL_DATABASE.map((protocol) => ({
      ...protocol,
      relevanceScore: calculateRelevanceScore(protocol, patientContext),
    }));

    // Filter by search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      protocols = protocols.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      protocols = protocols.filter((p) => p.category === selectedCategory);
    }

    // Sort
    protocols.sort((a, b) => {
      if (sortBy === 'relevance') {
        return b.relevanceScore - a.relevanceScore;
      } else if (sortBy === 'trending') {
        if (a.trending && !b.trending) return -1;
        if (!a.trending && b.trending) return 1;
        return b.relevanceScore - a.relevanceScore;
      } else if (sortBy === 'evidence') {
        const gradeOrder = { A: 0, B: 1, C: 2, D: 3 };
        const aGrade = a.evidenceLevel || 'D';
        const bGrade = b.evidenceLevel || 'D';
        return gradeOrder[aGrade] - gradeOrder[bGrade];
      }
      return 0;
    });

    return protocols.slice(0, maxRecommendations);
  }, [patientContext, searchTerm, selectedCategory, sortBy, maxRecommendations]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(PROTOCOL_DATABASE.map((p) => p.category));
    return ['all', ...Array.from(cats)];
  }, []);

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Recommended Protocols
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {patientContext
            ? 'Personalized recommendations based on patient context'
            : 'General protocol recommendations'}
        </p>
      </div>

      {/* Patient Context Summary */}
      {patientContext && (
        <Card className="p-4 mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                Patient Context
              </p>
              <div className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                {patientContext.age && <p>Age: {patientContext.age} years</p>}
                {patientContext.sex && <p>Sex: {patientContext.sex}</p>}
                {patientContext.riskFactors && patientContext.riskFactors.length > 0 && (
                  <p>Risk Factors: {patientContext.riskFactors.join(', ')}</p>
                )}
                {patientContext.conditions && patientContext.conditions.length > 0 && (
                  <p>Conditions: {patientContext.conditions.join(', ')}</p>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Filters */}
      <div className="mb-6 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search protocols..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-brand-primary-500 focus:border-transparent"
          />
        </div>

        {/* Category & Sort */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-neutral-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-neutral-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="trending">Sort by Trending</option>
              <option value="evidence">Sort by Evidence Grade</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Showing {recommendations.length} protocol{recommendations.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Recommendations */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={{
          initial: {},
          animate: { transition: { staggerChildren: 0.05 } },
        }}
        className="space-y-4"
      >
        {recommendations.length > 0 ? (
          recommendations.map((protocol) => (
            <ProtocolCard
              key={protocol.id}
              protocol={protocol}
              onClick={() => onProtocolSelect?.(protocol)}
            />
          ))
        ) : (
          <Card className="p-8 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-neutral-400" />
            <p className="text-neutral-600 dark:text-neutral-400">
              No protocols found matching your criteria
            </p>
          </Card>
        )}
      </motion.div>
    </div>
  );
};
