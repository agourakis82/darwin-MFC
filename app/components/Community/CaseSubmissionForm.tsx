'use client';

/**
 * CASE SUBMISSION FORM COMPONENT
 * ==============================
 *
 * Form for submitting new clinical cases with real-time
 * anonymization preview and PII detection.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import {
  FileText,
  User,
  Calendar,
  Stethoscope,
  AlertTriangle,
  CheckCircle2,
  Eye,
  EyeOff,
  Shield,
  Loader2,
  Info,
  Tag,
  XCircle,
} from 'lucide-react';
import type {
  ClinicalCaseData,
  CaseType,
  AgeRange,
} from '@/lib/types/community';
import { detectPII, anonymize, type PIIMatch } from '@/lib/utils/anonymization';

// =============================================================================
// PROPS
// =============================================================================

interface CaseSubmissionFormProps {
  onSubmit: (data: ClinicalCaseData, title: string) => Promise<void>;
  onCancel?: () => void;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const AGE_RANGES: AgeRange[] = [
  '0-1', '1-5', '5-12', '12-18', '18-30', '30-40',
  '40-50', '50-60', '60-70', '70-80', '80+',
];

const CASE_TYPES: CaseType[] = [
  'diagnostic_challenge',
  'treatment_decision',
  'management_dilemma',
  'ethical_question',
  'educational',
];

const DIFFICULTY_LEVELS = ['straightforward', 'moderate', 'complex'] as const;

// =============================================================================
// COMPONENT
// =============================================================================

export function CaseSubmissionForm({
  onSubmit,
  onCancel,
}: CaseSubmissionFormProps) {
  const t = useTranslations('community.cases');

  // Form state
  const [title, setTitle] = useState('');
  const [ageRange, setAgeRange] = useState<AgeRange>('30-40');
  const [sex, setSex] = useState<'M' | 'F' | 'other'>('M');
  const [occupation, setOccupation] = useState('');
  const [caseType, setCaseType] = useState<CaseType>('diagnostic_challenge');
  const [difficulty, setDifficulty] = useState<'straightforward' | 'moderate' | 'complex'>('moderate');
  const [presentation, setPresentation] = useState('');
  const [history, setHistory] = useState('');
  const [physicalExam, setPhysicalExam] = useState('');
  const [labResults, setLabResults] = useState('');
  const [imaging, setImaging] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [newCode, setNewCode] = useState('');

  // UI state
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Anonymization state
  const [piiWarnings, setPiiWarnings] = useState<PIIMatch[]>([]);
  const [isCheckingPII, setIsCheckingPII] = useState(false);

  // Debounced PII check
  const checkForPII = useCallback(() => {
    setIsCheckingPII(true);
    const allText = [presentation, history, physicalExam, labResults, imaging].join(' ');
    const detected = detectPII(allText);
    setPiiWarnings(detected);
    setIsCheckingPII(false);
  }, [presentation, history, physicalExam, labResults, imaging]);

  useEffect(() => {
    const timer = setTimeout(checkForPII, 500);
    return () => clearTimeout(timer);
  }, [checkForPII]);

  // Add diagnosis code
  const addCode = () => {
    const code = newCode.trim().toUpperCase();
    if (code && !diagnosisCodes.includes(code)) {
      setDiagnosisCodes([...diagnosisCodes, code]);
      setNewCode('');
    }
  };

  const removeCode = (code: string) => {
    setDiagnosisCodes(diagnosisCodes.filter((c) => c !== code));
  };

  // Validation
  const isStep1Valid = title.length >= 10 && ageRange && sex && caseType && difficulty;
  const isStep2Valid = presentation.length >= 50;
  const isStep3Valid = piiWarnings.length === 0;

  const canSubmit = isStep1Valid && isStep2Valid && isStep3Valid && !isSubmitting;

  // Handle submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) {
      setError(t('error_validation'));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const caseData: ClinicalCaseData = {
        ageRange,
        sex,
        occupation: occupation || undefined,
        presentation: anonymize(presentation).text,
        history: anonymize(history).text,
        physicalExam: physicalExam ? anonymize(physicalExam).text : undefined,
        labResults: labResults ? anonymize(labResults).text : undefined,
        imaging: imaging ? anonymize(imaging).text : undefined,
        diagnosisCodes,
        type: caseType,
        difficulty,
      };

      await onSubmit(caseData, title);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('error_generic'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preview content
  const getAnonymizedPreview = (text: string) => {
    if (!text) return '';
    const result = anonymize(text);
    return result.text;
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3].map((step) => (
          <React.Fragment key={step}>
            <button
              type="button"
              onClick={() => setCurrentStep(step)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                currentStep === step
                  ? 'bg-blue-600 text-white'
                  : step < currentStep
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              {step < currentStep ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                step
              )}
            </button>
            {step < 3 && (
              <div
                className={`w-16 h-1 rounded ${
                  step < currentStep
                    ? 'bg-green-600'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('step1_title')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {t('step1_desc')}
            </p>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('field_title')} *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('placeholder_title')}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              minLength={10}
              maxLength={200}
            />
            <p className="text-xs text-gray-500 mt-1">
              {title.length}/200 {t('characters')}
            </p>
          </div>

          {/* Patient Demographics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Age Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                {t('field_age_range')} *
              </label>
              <select
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value as AgeRange)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {AGE_RANGES.map((range) => (
                  <option key={range} value={range}>
                    {range} {t('years')}
                  </option>
                ))}
              </select>
            </div>

            {/* Sex */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                {t('field_sex')} *
              </label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value as 'M' | 'F' | 'other')}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="M">{t('male')}</option>
                <option value="F">{t('female')}</option>
                <option value="other">{t('other')}</option>
              </select>
            </div>

            {/* Occupation (optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('field_occupation')}
              </label>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder={t('placeholder_occupation')}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                maxLength={50}
              />
            </div>
          </div>

          {/* Case Type & Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Case Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FileText className="w-4 h-4 inline mr-1" />
                {t('field_case_type')} *
              </label>
              <select
                value={caseType}
                onChange={(e) => setCaseType(e.target.value as CaseType)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {CASE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {t(`type.${type}`)}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Stethoscope className="w-4 h-4 inline mr-1" />
                {t('field_difficulty')} *
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as typeof difficulty)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {DIFFICULTY_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {t(`difficulty.${level}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              disabled={!isStep1Valid}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {t('next')}
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Clinical Content */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('step2_title')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {t('step2_desc')}
            </p>
          </div>

          {/* PII Warning Banner */}
          {piiWarnings.length > 0 && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800 dark:text-red-300">
                    {t('pii_warning_title')}
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                    {t('pii_warning_desc')}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {piiWarnings.slice(0, 5).map((warning, i) => (
                      <li key={i} className="text-sm text-red-600 dark:text-red-400">
                        • {t(`pii_type.${warning.type}`)}: &quot;{warning.match.substring(0, 30)}...&quot;
                      </li>
                    ))}
                    {piiWarnings.length > 5 && (
                      <li className="text-sm text-red-600 dark:text-red-400">
                        +{piiWarnings.length - 5} {t('more_issues')}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Presentation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('field_presentation')} *
            </label>
            <textarea
              value={presentation}
              onChange={(e) => setPresentation(e.target.value)}
              placeholder={t('placeholder_presentation')}
              rows={4}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              minLength={50}
            />
            <p className="text-xs text-gray-500 mt-1">
              {presentation.length} {t('characters')} ({t('min_50')})
            </p>
          </div>

          {/* History */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('field_history')}
            </label>
            <textarea
              value={history}
              onChange={(e) => setHistory(e.target.value)}
              placeholder={t('placeholder_history')}
              rows={3}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            />
          </div>

          {/* Physical Exam */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('field_physical_exam')}
            </label>
            <textarea
              value={physicalExam}
              onChange={(e) => setPhysicalExam(e.target.value)}
              placeholder={t('placeholder_physical_exam')}
              rows={3}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            />
          </div>

          {/* Lab Results */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('field_lab_results')}
            </label>
            <textarea
              value={labResults}
              onChange={(e) => setLabResults(e.target.value)}
              placeholder={t('placeholder_lab_results')}
              rows={3}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            />
          </div>

          {/* Imaging */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('field_imaging')}
            </label>
            <textarea
              value={imaging}
              onChange={(e) => setImaging(e.target.value)}
              placeholder={t('placeholder_imaging')}
              rows={2}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            />
          </div>

          {/* Diagnosis Codes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Tag className="w-4 h-4 inline mr-1" />
              {t('field_diagnosis_codes')}
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCode())}
                placeholder={t('placeholder_code')}
                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <button
                type="button"
                onClick={addCode}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                {t('add')}
              </button>
            </div>
            {diagnosisCodes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {diagnosisCodes.map((code) => (
                  <span
                    key={code}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-sm"
                  >
                    {code}
                    <button
                      type="button"
                      onClick={() => removeCode(code)}
                      className="hover:text-blue-900 dark:hover:text-blue-100"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {t('back')}
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              disabled={!isStep2Valid}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {t('next')}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review & Submit */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('step3_title')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {t('step3_desc')}
            </p>
          </div>

          {/* Anonymization Status */}
          <div className={`p-4 rounded-lg border ${
            piiWarnings.length === 0
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
          }`}>
            <div className="flex items-center gap-3">
              {piiWarnings.length === 0 ? (
                <>
                  <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <div>
                    <h4 className="font-medium text-green-800 dark:text-green-300">
                      {t('anonymization_passed')}
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      {t('anonymization_passed_desc')}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  <div>
                    <h4 className="font-medium text-red-800 dark:text-red-300">
                      {t('anonymization_failed')}
                    </h4>
                    <p className="text-sm text-red-700 dark:text-red-400">
                      {t('anonymization_failed_desc', { count: piiWarnings.length })}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Preview Toggle */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {t('preview_title')}
            </h3>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
            >
              {showPreview ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  {t('hide_preview')}
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  {t('show_preview')}
                </>
              )}
            </button>
          </div>

          {/* Case Preview */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h4>

            <div className="flex flex-wrap gap-3 text-sm">
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                {t(`type.${caseType}`)}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {ageRange} {t('years')} | {sex === 'M' ? t('male') : sex === 'F' ? t('female') : t('other')}
              </span>
              <span className={`${
                difficulty === 'straightforward' ? 'text-green-600' :
                difficulty === 'moderate' ? 'text-amber-600' : 'text-red-600'
              }`}>
                {t(`difficulty.${difficulty}`)}
              </span>
            </div>

            {showPreview ? (
              <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {t('field_presentation')}
                  </h5>
                  <p className="text-gray-900 dark:text-white">
                    {getAnonymizedPreview(presentation)}
                  </p>
                </div>

                {history && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      {t('field_history')}
                    </h5>
                    <p className="text-gray-900 dark:text-white">
                      {getAnonymizedPreview(history)}
                    </p>
                  </div>
                )}

                {physicalExam && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      {t('field_physical_exam')}
                    </h5>
                    <p className="text-gray-900 dark:text-white">
                      {getAnonymizedPreview(physicalExam)}
                    </p>
                  </div>
                )}

                {diagnosisCodes.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      {t('field_diagnosis_codes')}
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {diagnosisCodes.map((code) => (
                        <span
                          key={code}
                          className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm"
                        >
                          {code}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                {t('preview_hidden')}
              </p>
            )}
          </div>

          {/* Info Notice */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {t('review_notice')}
                </p>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {t('back')}
            </button>
            <div className="flex gap-3">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={isSubmitting}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {t('cancel')}
                </button>
              )}
              <button
                type="submit"
                disabled={!canSubmit}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t('submitting')}
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    {t('submit_case')}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default CaseSubmissionForm;
