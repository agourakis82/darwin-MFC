'use client';

/**
 * DARWIN-MFC INDIVIDUAL CALCULATOR PAGE
 * ======================================
 *
 * Dynamic page for individual clinical calculators.
 * Displays calculator form, results, and citations.
 */

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Calculator,
  ChevronLeft,
  Star,
  Share2,
  FileText,
  Info,
  ExternalLink,
  BookOpen,
  Clock,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { showSuccessToast } from '@/app/components/ui/Toast';

// Calculator imports
import {
  getCalculator,
  type CalculatorInputValues,
  type ScoreInterpretation,
  canCalculateClinically,
  categoryLabels,
  categoryIcons,
  clinicalUseLabels,
  evidenceLevelLabels,
  evidenceLevelStyles,
  getCalculatorClinicalDisclaimer,
  getCalculatorEvidenceLevel,
} from '@/lib/calculators';
import { CalculatorForm, CalculatorResult } from '@/app/components/Calculators';

// =============================================================================
// CATEGORY COLORS
// =============================================================================

const categoryGradients: Record<string, string> = {
  'critical-care': 'from-red-500 to-orange-500',
  cardiology: 'from-rose-500 to-pink-500',
  pulmonology: 'from-sky-500 to-blue-500',
  hepatology: 'from-amber-500 to-yellow-500',
  nephrology: 'from-purple-500 to-violet-500',
  neurology: 'from-indigo-500 to-blue-500',
  psychiatry: 'from-violet-500 to-purple-500',
  'infectious-disease': 'from-lime-500 to-green-500',
  hematology: 'from-pink-500 to-rose-500',
  emergency: 'from-orange-500 to-red-500',
  obstetrics: 'from-fuchsia-500 to-pink-500',
  pediatrics: 'from-cyan-500 to-teal-500',
  orthopedics: 'from-stone-500 to-gray-500',
  anesthesia: 'from-teal-500 to-emerald-500',
  general: 'from-gray-500 to-slate-500',
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function CalculatorDetailPage() {
  const params = useParams();
  const locale = useLocale();
  const calculatorId = params?.id as string | undefined;
  const calculator = useMemo(
    () => (calculatorId ? getCalculator(calculatorId) ?? null : null),
    [calculatorId]
  );

  // State
  const [result, setResult] = useState<{
    score: number;
    interpretation: ScoreInterpretation;
    values: CalculatorInputValues;
  } | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showCitations, setShowCitations] = useState(false);

  // Load favorite status
  useEffect(() => {
    if (!calculatorId) return;
    const stored = localStorage.getItem('darwin-calculator-favorites');
    if (stored) {
      try {
        const favorites = new Set(JSON.parse(stored));
        setIsFavorite(favorites.has(calculatorId));
      } catch {
        // Ignore parse errors
      }
    }
  }, [calculatorId]);

  // Toggle favorite
  const toggleFavorite = () => {
    if (!calculatorId) return;
    const stored = localStorage.getItem('darwin-calculator-favorites');
    let favorites: Set<string>;
    try {
      favorites = new Set(stored ? JSON.parse(stored) : []);
    } catch {
      favorites = new Set();
    }

    if (favorites.has(calculatorId)) {
      favorites.delete(calculatorId);
      setIsFavorite(false);
    } else {
      favorites.add(calculatorId);
      setIsFavorite(true);
    }

    localStorage.setItem('darwin-calculator-favorites', JSON.stringify([...favorites]));
  };

  // Handle calculation
  const handleCalculate = (values: CalculatorInputValues) => {
    if (!calculator) return;
    if (!canCalculateClinically(calculator)) return;

    const score = calculator.calculate(values);
    const interpretation = calculator.interpret(score, values);

    setResult({
      score,
      interpretation,
      values,
    });
  };

  // Share functionality
  const handleShare = async () => {
    if (!calculator) return;

    const url = window.location.href;
    const text = `${calculator.abbreviation} - ${calculator.name}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: text, url });
      } catch {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(url);
      showSuccessToast('Link copiado!', 'O link foi copiado para a área de transferência');
    }
  };

  // Loading state
  if (!calculator) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center py-16">
          <Calculator className="w-16 h-16 mx-auto mb-4 text-neutral-300 dark:text-neutral-700 animate-pulse" />
          <p className="text-neutral-500">Loading calculator...</p>
        </div>
      </div>
    );
  }

  const gradient = categoryGradients[calculator.category] || 'from-gray-500 to-slate-500';
  const evidenceLevel = getCalculatorEvidenceLevel(calculator);
  const canCalculate = canCalculateClinically(calculator);
  const clinicalDisclaimer = getCalculatorClinicalDisclaimer(calculator);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Navigation */}
      <nav className="mb-6">
        <Link
          href="/calculadoras"
          locale={locale}
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-[#0071E3] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Calculators
        </Link>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                'w-16 h-16 rounded-2xl flex items-center justify-center text-2xl',
                'bg-gradient-to-br text-white shadow-lg',
                gradient
              )}
            >
              {categoryIcons[calculator.category]}
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                  {calculator.abbreviation}
                </h1>
                <span
                  className={cn(
                    'px-3 py-1 rounded-full text-sm font-medium',
                    'bg-gradient-to-r text-white',
                    gradient
                  )}
                >
                  {categoryLabels[calculator.category]}
                </span>
                <span className={cn('px-3 py-1 rounded-full text-sm font-medium', evidenceLevelStyles[evidenceLevel])}>
                  {evidenceLevelLabels[evidenceLevel]}
                </span>
                {calculator.clinicalUse && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300">
                    {clinicalUseLabels[calculator.clinicalUse]}
                  </span>
                )}
                {calculator.versionYear && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                    Clinical Intelligence {calculator.versionYear}
                  </span>
                )}
                {calculator.requiresBackend && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                    Backend required
                  </span>
                )}
              </div>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-1">
                {calculator.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleFavorite}
              className={cn(
                'p-2.5 rounded-xl transition-colors',
                isFavorite
                  ? 'bg-yellow-100 dark:bg-yellow-900/30'
                  : 'bg-neutral-100 dark:bg-neutral-800'
              )}
            >
              <Star
                className={cn(
                  'w-5 h-5',
                  isFavorite
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-neutral-400'
                )}
              />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-3xl">
          {calculator.description}
        </p>

        {/* Clinical disclaimer */}
        <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Clinical Disclaimer:</strong> {clinicalDisclaimer}
          </p>
        </div>
        {!canCalculate && (
          <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-200">
              The clinical intelligence backend is not configured. This calculator is shown for review,
              but calculation is unavailable and no mock clinical result will be generated.
            </p>
          </div>
        )}
      </motion.div>

      {/* Main content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calculator Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="w-5 h-5 text-[#0071E3]" />
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Calculator Input
            </h2>
          </div>
          {canCalculate ? (
            <CalculatorForm
              calculator={calculator}
              onCalculate={handleCalculate}
            />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[320px] text-center rounded-xl border border-dashed border-blue-200 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-950/20 p-6">
              <AlertTriangle className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-3" />
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                Clinical intelligence backend required
              </h3>
              <p className="mt-2 text-sm text-blue-800 dark:text-blue-200 max-w-sm">
                This tool depends on the external Darwin-MFC clinical intelligence service.
                Configure the backend before enabling calculations.
              </p>
            </div>
          )}
        </motion.div>

        {/* Result */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700 shadow-lg"
        >
          {result ? (
            <CalculatorResult
              score={result.score}
              interpretation={result.interpretation}
              calculatorName={calculator.abbreviation}
              ranges={calculator.interpretationRanges}
              citations={calculator.citations}
              showRanges={true}
              showCitations={true}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
              <div className={cn('w-20 h-20 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br opacity-20', gradient)}>
                <Calculator className="w-10 h-10 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-600 dark:text-neutral-400">
                Ready to Calculate
              </h3>
              <p className="text-sm text-neutral-500 mt-1 max-w-xs">
                Fill in the parameters on the left and click Calculate to see your result
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Additional Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {/* Purpose */}
        <div className="p-5 rounded-xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-[#0071E3]" />
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Purpose</h3>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {calculator.purpose}
          </p>
        </div>

        {/* Indications */}
        {calculator.indications && calculator.indications.length > 0 && (
          <div className="p-5 rounded-xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Indications</h3>
            </div>
            <ul className="space-y-1">
              {calculator.indications.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <span className="text-emerald-500 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contraindications */}
        {calculator.contraindications && calculator.contraindications.length > 0 && (
          <div className="p-5 rounded-xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Contraindications</h3>
            </div>
            <ul className="space-y-1">
              {calculator.contraindications.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <span className="text-amber-500 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Validation */}
        {calculator.validationStudy && (
          <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-semibold text-emerald-800 dark:text-emerald-200">Validation Study</h3>
            </div>
            <p className="text-sm text-emerald-700 dark:text-emerald-300">
              {calculator.validationStudy}
            </p>
          </div>
        )}

        {/* Last Updated */}
        {calculator.lastUpdated && (
          <div className="p-5 rounded-xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-[#0071E3]" />
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Last Updated</h3>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {calculator.lastUpdated}
            </p>
          </div>
        )}

        {/* Notes */}
        {calculator.notes && calculator.notes.length > 0 && (
          <div className="p-5 rounded-xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-[#0071E3]" />
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Notes</h3>
            </div>
            <ul className="space-y-1">
              {calculator.notes.map((note, i) => (
                <li key={i} className="text-sm text-neutral-600 dark:text-neutral-400">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>

      {/* Full Citations */}
      {calculator.citations && calculator.citations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <button
            onClick={() => setShowCitations(!showCitations)}
            className="flex items-center gap-2 text-sm font-medium text-[#0071E3] hover:underline"
          >
            <FileText className="w-4 h-4" />
            {showCitations ? 'Hide' : 'Show'} Full References ({calculator.citations.length})
          </button>

          {showCitations && (
            <div className="mt-4 p-5 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700">
              <div className="space-y-4">
                {calculator.citations.map((citation, index) => (
                  <div key={index} className="text-sm">
                    <div className="text-neutral-900 dark:text-neutral-100">
                      [{index + 1}] {citation.authors} ({citation.year}). {citation.title}.{' '}
                      <em className="text-neutral-600 dark:text-neutral-400">
                        {citation.journal}
                      </em>
                      {citation.volume && `, ${citation.volume}`}.
                    </div>
                    {(citation.doi || citation.pmid) && (
                      <div className="mt-1 flex gap-3 text-xs">
                        {citation.doi && (
                          <a
                            href={`https://doi.org/${citation.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[#0071E3] hover:underline"
                          >
                            DOI <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {citation.pmid && (
                          <a
                            href={`https://pubmed.ncbi.nlm.nih.gov/${citation.pmid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[#0071E3] hover:underline"
                          >
                            PubMed <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
